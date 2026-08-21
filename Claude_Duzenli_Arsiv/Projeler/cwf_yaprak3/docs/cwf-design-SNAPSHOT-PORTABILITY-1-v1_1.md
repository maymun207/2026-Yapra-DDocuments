# cwf-design-SNAPSHOT-PORTABILITY-1 · v1_1

<!-- Architect-authored · S94 · walk item #39 (owner-ratified). SUPERSEDES v1
     (S37-1: amendment = new version). Delta vs v1: §0.5 (the owner's
     two-scenario ruling made explicit), SAFETY-TAKE added to §5, §7 birth
     proof extended, §8 risk 5. Everything else carried unchanged.
     Recon base: origin/master a7600997 + live DB reads 2026-08-11 ~21:20+03
     (router.learnEnabled measured 0/published since 2026-07-29). -->

## §0 · THE OWNER RULING (S94, verbatim intent)

*"Bu asıl kritik bilgi — CWF'i bambaşka bir ortama kurduğumuzda içi boş bir
agent olacak; bunu geçmişte train edilmiş data ile yüklememiz lazım. Buna bir
çözüm oluşturmamız şart."*

## §0.5 · THE TWO SCENARIOS (owner, S94 follow-up) — mapped, not merged

**(a) Fresh installation, empty agent** → **SEED mode.** Tenant-shared learned
knowledge transports; user memory does NOT (the source's users do not exist in
the target). §1/§2 rules govern.

**(b) Same-installation corruption / unstable state (e.g. a benchmark run
poisoned learning) → roll back** → **FULL RESTORE — and it ALREADY EXISTS.**
The S93 door (`learning_restore`) is a byte-identical six-table rollback
**including `episodes`, i.e. including user memory** — correct precisely
because the installation is the same and user ids resolve. #39 adds to (b)
only what is missing: the OFF-SITE copy (a snapshot living inside the DB it
protects dies with that DB) and reversibility of the rollback itself
(SAFETY-TAKE, §5).

**Measured defense-in-depth context for (b)** — rollback is the net under the
nets, not the first line: C1-LAW makes synthetic/benchmark traffic
structurally unable to write user episodes (repository refuses non-user
actors, tested); `router.learnEnabled` is published **0** (brake pulled
2026-07-29, read live this session), so routing learning is currently off;
and `ctx.taskId` clean-agent mode (S93, first consumer #18/A2A) will make
benchmark runs write NOTHING global at all. The poisoning surface is already
narrow by construction.

**Honesty clause — delta loss is inherent:** restoring yesterday's snapshot
discards everything learned and written since it. SAFETY-TAKE does not
prevent that loss; it PARKS the discarded state in an automatic snapshot so a
wrong rollback is recoverable rather than terminal.

**Tool boundary:** this organ is the LEARNED-LAYER time machine only.
Conversations, governance rules, schema and telemetry live outside it;
database-level corruption is Supabase point-in-time-recovery territory. The
two instruments must never be conflated — one backs up the brain, the other
the body.

## §1 · THE HIDDEN TRAP — the six tables are not one kind of thing

The snapshot payload serializes six tables. For same-installation restore
(byte-identical, the existing door) that uniformity is correct. For a
transplant it is FALSE UNIFORMITY — the tables split three ways, and the split
must be named per-table from the schema, not assumed:

| Class (Architect's claim — recon MUST re-derive from schema) | Tables (expected) | Transplant behaviour |
|---|---|---|
| **User-private** (rows keyed to `auth.users` of the SOURCE) | `episodes` (has user ids; C1-law store) | **EXCLUDED from seed-import.** The users do not exist in the target; importing orphans private memory into a foreign installation — a privacy defect and a referential one at once. |
| **Tenant-shared learned** | `tool_category_cache` · `router_proposals` · `semantic_memory` (recon: confirm no user key) | **THE BRAIN. This is what seed mode transports.** Keyed by backend id + content, portable wherever the same backend ids are registered. |
| **Discoverable / authority** | `entity_registry` · `backend_authority` | Special, each its own ruling — §2. |

## §2 · THREE RULINGS

**R1 · `entity_registry` is RE-DISCOVERED, not transported.** ADR-009's whole
point: topology is discovered from the backend, never hand-authored — and a
transported mirror is a stale hand-off wearing a machine's clothes. The target
installation's discovery walk against its OWN live backend is strictly fresher
truth. Seed-import therefore SKIPS `entity_registry` by design and the result
report says so with a count. (Full same-installation restore keeps carrying it,
unchanged — that path stays byte-identical.)

**R2 · `backend_authority` transports ONLY with an explicit second consent.**
A grant SILENCES the scope-divergence detector (the trust console's own copy
says exactly this). A file that imports grants imports silenced detectors —
into an installation whose operator may not know what was silenced or why.
Committed shape: seed-import defaults to skipping authority rows; a separate
flag, named in the confirm sentence the operator types, includes them. Never
silent, never default.

**R3 · Backend-id matching is validated row-by-row, skip-and-count, never
silent.** Backend identity is DATA (a row in `backends`). Every imported row
naming a backend the target has not registered is SKIPPED and counted by
backend id in the result. Empty≠zero discipline: a clean import and an import
that skipped everything must be unmistakably different results. If EVERY row
would be skipped, the import REFUSES outright — seeding nothing while
reporting success is the exact lie this codebase legislates against.

## §3 · THE FILE FORMAT — boring on purpose

`*.cwf-learn.json.gz` — gzip over one JSON envelope:

```
{ "format": "cwf-learn/1",
  "exportedAt": "<iso>",
  "source": { "installation": "<supabase project ref>", "docVersion": "<rev>" },
  "snapshot": { "id": "<uuid>", "name": "<name>", "createdAt": "<iso>" },
  "manifest": { "<table>": <rows>, ... },
  "sha256": "<hex over canonical payload bytes>",
  "payload": { ...the six arrays, verbatim from learning_snapshots.payload... } }
```

Why: the payload is ALREADY lossless JSON (`to_jsonb(t.*)` →
`jsonb_populate_recordset` round-trip, columns included by name). Inventing a
binary format buys nothing and adds a parser to trust. gzip is transport
sugar. The `sha256` makes tampering and truncation detectable BEFORE anything
touches a table; `source.installation` lets import say honestly "this file is
from another installation — full restore refused, seed mode available"
(comparing against the code's own `EXPECTED_SUPABASE_PROJECT_REF`).
`format: cwf-learn/1` is the versioning seam so a v2 with more tables imports
old files knowingly instead of guessing.

Size reality (measured live): a full snapshot is ~133 kB. No streaming, no
chunking, no storage integration — a single HTTP download/upload is the whole
transport story at this scale, and building more would be ceremony.

## §4 · EXPORT — a NAMED fence relaxation, one door, audited

S93 built a deliberate wall: `learning_snapshots.payload` never crosses to a
browser (client SELECT revoked; the list endpoint returns manifests only;
the column comment states the law). **Export necessarily breaches that wall,
and the breach is designed, not discovered:**

* One new endpoint action (`export`, GET-with-id or POST — phase decides),
  gated on the same `learning:manage` permission, returning the envelope as a
  download.
* Every export writes a `memory_audit` row (new action value ⇒ the CHECK
  widens again — #39 carries its own migration; it does NOT piggyback #38's).
* The response is the ONE place payload bytes leave the DB. The list endpoint,
  the panel table, the repository reads — all stay manifest-only, pinned by
  the existing tests plus one new negative control.
* The exported file holds every user's memory verbatim. The panel says so at
  the download button, in plain language (D-12: no internal identifiers).

## §5 · IMPORT + SAFETY-TAKE — never writes tables directly, never one-way

Both modes share one invariant: **an uploaded file NEVER writes the six tables
itself.** It enters as data, and destruction/creation flows through existing
rituals:

* **Validate** (pure, server-side): gunzip → parse → format version → sha256
  over payload → manifest recomputed from payload and compared → backend-id
  census against the target's `backends` rows. Any failure names itself; a
  seal mismatch refuses with the two hashes shown.
* **Land**: the payload inserts as a NEW `learning_snapshots` row (source
  metadata into the name/audit), through a new SECURITY DEFINER
  `learning_snapshot_import`. Name collisions resolve by #38's auto-suffix —
  **this is why #39 structurally requires #38**, not just orders after it.
* **Full restore** (same installation only — refused when
  `source.installation` differs): the operator then uses the EXISTING restore
  door, typed name confirm, existing audit. Import adds zero new destructive
  paths for this mode.
* **Seed mode** (the transplant): one new SECURITY DEFINER
  `learning_seed_from_snapshot` applying §1/§2 rules — tenant-shared tables
  only, entity_registry skipped (R1), authority behind its own flag (R2),
  per-backend skip-and-count (R3). **Target must be empty:** seeding a
  non-empty learned layer REFUSES — a transplant into a brain that has already
  learned is a merge problem this phase does not pretend to solve; the error
  says so. One transaction, counts from `GET DIAGNOSTICS`, one audit row.

* **SAFETY-TAKE (S94 owner-scenario ruling — rollback stops being one-way):**
  `learning_restore` AND `learning_seed_from_snapshot` begin, inside their own
  transaction, by taking an automatic snapshot of the CURRENT state, named
  `pre-restore`/`pre-seed` + timestamp (collision → #38 auto-suffix). Only
  then do they wipe/refill. A wrong rollback is thereafter recoverable: the
  discarded present is parked, not destroyed. The auto-snapshot is `keep=false`
  (purgeable later under #38's retention) and its id is recorded in the SAME
  audit row as the act it protected. Delivery mechanics: the applied migration
  file `20260811120000` is untouchable history; SAFETY-TAKE ships as a NEW
  migration doing `CREATE OR REPLACE` on `learning_restore` — and per the
  standing F-S93 ruling, this first phase to touch those function bodies
  **opportunistically re-emits the reviewed text**, closing the known ~13-line
  applied≠reviewed divergence in the same act. Two debts, one stone.

## §6 · WHAT THIS IS NOT (expectation fences)

* Not a full-database backup. Conversations, rules, users, telemetry are
  outside the learned layer; Supabase PITR owns those.
* Not a merge tool. Seed targets an empty learned layer (v1 ruling above).
* Not a scheduler. Export is a human act; if a periodic off-site copy is later
  wanted, that is its own item with its own storage-target consent.
* Not a governance transport. `domain_rules`, prompts, params travel by the
  governed publish path, never inside this file.

## §7 · SEQUENCING + BIRTH PROOF

* **Position: #39, immediately behind #38.** Structural dependency (auto-suffix
  at import landing AND at SAFETY-TAKE naming) + shared migration family
  (`memory_audit` CHECK widens in both — serially, each phase its own file,
  applied migrations untouchable).
* **Operator involvement: yes** — one migration (functions + CHECK + any
  grants), via `supabase db push` only (ADR-005), FENCE-first review.
* **Birth proof (S93-1), within the phase, one combined live ritual (also
  discharging the owner's requested end-to-end test):** take a fresh snapshot
  through the real panel → EXPORT it, verify the seal externally → WIPE the
  layer (typed sentence — the first production `learning_wipe` audit row in
  this installation's history) → RESTORE from the fresh snapshot, byte-compare
  → observe the SAFETY-TAKE auto-snapshot that restore created → RE-IMPORT the
  exported file, auto-suffix observed, payload byte-equal. Owner is the
  browser witness; the Architect independently reads counts, audit rows and
  hashes from the DB before/after each step, and holds a hand-pulled copy of
  all six tables as the second recovery path during the destructive window.
* **The transplant HALF cannot be proven yet, and this is named, not hidden
  (SOTA-1 shape):** (a) what goes unproven — seed-import into a genuinely
  separate installation; (b) when it becomes provable — the day a second
  installation exists (tenant-#2 signal or a staging-environment decision);
  (c) the measurement — seed an empty target from a file, then a live turn on
  the target uses a transported learned routing row (witnessed in its logs).
  Until then the seed path is proven only against the wiped state of THIS
  installation, and the register carries the residual by name.

## §8 · RISK REGISTER (named now so the phase prompt inherits them)

1. **Payload schema drift**: a snapshot exported at rev N imports at rev N+k
   after a table gained a column. `jsonb_populate_recordset` tolerates missing
   columns (NULL) — acceptable — but a REMOVED column errors. format version +
   manifest comparison make it a named refusal, not a partial write.
2. **Authority laundering** (R2's threat): covered — flag + typed consent +
   audit.
3. **The wall breach** (§4): scoped to one action; every other surface
   manifest-only, negatively tested.
4. **A tampered file**: sha256 + server-side re-derivation of the manifest;
   the file's own manifest is never trusted as the count.
5. **SAFETY-TAKE recursion/starvation**: the auto-snapshot must not itself
   trigger a safety-take (it is a take, not a restore — structurally safe, but
   pin it), and a restore run repeatedly must not silently fill the table —
   auto-snapshots are `keep=false` and #38's purge is their lifecycle; the
   phase names this interaction in a test.

<!-- END · cwf-design-SNAPSHOT-PORTABILITY-1-v1_1 -->
