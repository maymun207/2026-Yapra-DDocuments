# PHASE F190-ADR-LANDING · v1
<!-- PHASE-F190-ADR-LANDING-v1 · 2026-07-27 · S67 · Architect: Claude · Author lane: AG
     Lands ADR-005 v2, ADR-009 v1_1 and ADR-010 into docs/adr/, and adds ONE test
     that makes "binding law cited by name but absent from the repo" unshippable.
     Docs + one test. No production code, no migration, no DB contact.
     S66-2: this prompt is the WHOLE contract. Every law it needs is restated
     inline and the three ADR bodies are carried as PAYLOAD below. Do not go
     looking for design notes or Architect-side artifacts — they are not in this
     repository, which is the very defect this phase closes. -->

## §0 · The defect, verified live at the anchor (not quoted from a summary)

A fresh clone at `088b2a5e` shows `docs/adr/` holding exactly seven files:

    ADR-001-backend-trust.md          ADR-002-personal-mcp-secrets.md
    ADR-003-completion-robustness.md  ADR-004-ledger-vs-trace-separation.md
    ADR-006-agent-operating-modes.md  ADR-007-langfuse-host-trust-v1.md
    ADR-008-turn-trace-digest.md

**ADR-005, ADR-009 and ADR-010 are not in the repository.** Meanwhile 17 tracked
files cite them BY NAME as binding law — production code, tests, three applied
migrations and the agent docs:

    8  api/cwf/_lib/backends/entityDiscoverySync.ts
    8  api/cwf/_lib/backends/__tests__/entityDiscoverySync.test.ts
    5  supabase/migrations/20260726120000_entity_registry_layers.sql
    4  .agents/CHANGELOG.md
    3  supabase/migrations/20260725120000_backends_factory_param.sql
    2  supabase/migrations/20260726160000_entity_registry_orphan_cleanup.sql
    2  api/cwf/_lib/routing/resolveEntityRef.ts
    2  api/cwf/_lib/backends/entityDiscoveryParse.ts
    2  api/cwf/_lib/backends/__tests__/factoryParamHint.test.ts
    2  .agents/skills/cwf-project-kb/SKILL.md
    1  shared/grantPolicy.ts · shared/dbConstants.ts
    1  api/cwf/_lib/replay/clarificationLens.ts
    1  api/cwf/_lib/replay/__tests__/clarificationLensLayers.test.ts
    1  api/cwf/_lib/persistence/repositories/BackendToolsRepository.ts
    1  api/cwf/_lib/persistence/repositories/BackendEntityLayersRepository.ts
    1  api/cwf/_lib/backends/factoryParamHint.ts

So the Author lane has been bound, in permanent commits, to law it could not
read. This did not start with S66: `20260725120000_backends_factory_param.sql`
already cited ADR-005 and ADR-009 in S65. Damage has been avoided so far only
because each phase prompt restated the law inline.

**This phase fixes the cause, not the instance.** The three documents land, and a
test makes the next occurrence fail at author time.

## STATE PRECONDITION
- Anchor: `origin/master` = **`088b2a5e51d9969dbf5e48b30137ff07574c3431`** ·
  rev 150 · 361 test files / 3953 tests · 59 migrations · drift `[OK]`.
- If master has moved by the time you start, **report the hash you actually
  start from and proceed.** This phase touches no file any other in-flight work
  touches (two new docs paths, one new test file), so it cannot conflict.
- Before starting, run and report: `git rev-parse origin/master` · `npm run lint`
  · `npm run build` (must end `[OK]` on doc-drift) · `npm run test` (baseline
  counts, so the delta at the end is a measurement and not a memory).
- Branch: `phase/f190-adr-landing`.

## BINDING CONSTRAINTS
1. **Docs plus ONE test. Nothing else.** No production code change, no migration,
   no SQL, no seeder change, no governed-table write, no param publish, no
   dependency added. This phase never contacts a database.
2. **The three ADR bodies in §PAYLOAD are verbatim payload.** Write them
   byte-for-byte. Do **not** edit, reflow, reformat, "fix" a typo, renumber,
   translate, trim the HTML comment headers, or add an Architect preface. ADR-005
   v2 is the **owner's original document**; ADR-009 v1_1 and ADR-010 are
   owner-driven and ACCEPTED. The provenance comments at the top of each are part
   of the document and stay.
3. **Filenames are UNVERSIONED** (rationale in G1). Do not invent a different
   naming scheme.
4. **Reseal expectation, stated in advance so a surprise is a finding.** At the
   anchor, no manifest tab maps `docs/` — every tab's `codeAreas` globs are code
   paths only. Therefore adding these files must **not** change any
   `mappedContentSha`, and `npm run build` must print doc-drift `[OK]` **with no
   reseal**. **If drift reports a change, STOP and report it. Do not run
   `npm run reseal` to make it green.** An unpredicted reseal is a finding about
   the map, not a step in this phase.
5. **S66-1 — the new test ships with a positive control proving it can FAIL.** A
   green that could have come from "nothing was scanned" is exactly the class
   this phase exists to prevent, and it has bitten this project three times.
6. **RULE-24** — source is text; no NUL bytes.
7. **GOLDEN FREEZE is engaged** — no golden run, no `prompt.segment` publish.
   Nothing here goes near either.
8. **C1 LAW / ADR-007** — zero writes to `messages`; no secret is read, printed
   or referenced. Nothing in this phase authenticates to anything.

## G1 · Land the three ADRs

Create, with the payload from §PAYLOAD:

    docs/adr/ADR-005-supabase-apply-authority.md
    docs/adr/ADR-009-entity-topology-is-discovered.md
    docs/adr/ADR-010-earned-trust-declaration-vs-observation.md

**Why unversioned filenames** (decided, do not re-litigate): the repo convention
is unversioned — 001, 002, 003, 004, 006 and 008 carry no suffix — and the 17
citing files cite the bare id `ADR-005`. A versioned path goes stale on the next
revision and would silently break every citation the moment a v3 lands. The
version lives where it already is: inside each document's own header
(`v2 · rev 2`, `v1_1`, `v1`), with git carrying the history. ADR-007's `-v1`
suffix is the outlier, not the rule; do not copy it.

**Byte-fidelity check (run it, do not eyeball it):**

    sha256sum docs/adr/ADR-005-supabase-apply-authority.md
    sha256sum docs/adr/ADR-009-entity-topology-is-discovered.md
    sha256sum docs/adr/ADR-010-earned-trust-declaration-vs-observation.md

Expected, measured at authoring time:

    8f65998e1d177f5126cfec1a620469d7c43968bf217d56dd2fdac1f3de27f085  ADR-005  (9948 bytes)
    cb2f49dd525ef4fafe0277a55bbb580a3a7cd46e44959e33e868bdde38e20ede  ADR-009  (9721 bytes)
    0a3e3640e752e14a9cd13ddb0f7c953ba03b60d6a21205b65f0d3804d57dcfd7  ADR-010  (9142 bytes)

Each file ends with a single trailing newline (`0a`) and no other trailing
whitespace. **A mismatch of even one byte means the payload was edited in
transit — fix the file, do not explain the difference.**

## G2 · The gate that makes this class unshippable

New file: `api/cwf/__tests__/adrCitationsResolve.test.ts`

Model it on `api/cwf/__tests__/migrationFnLockdown.test.ts` — same directory,
same "fixtures copied verbatim" idiom, same style of explanatory header naming
the incident it exists for. It lives in `api/cwf/__tests__/` because
`vitest.config.ts`'s `include` is
`['src/**/__tests__/**/*.test.{ts,tsx}', 'shared/__tests__/**/*.test.ts', 'api/**/__tests__/**/*.test.ts']`
— `scripts/**` is **not** covered (grep-verified from the config at the anchor),
so a test placed next to the docs tooling would never run.

Required behaviour:

- **(a) Enumerate tracked files** with `git ls-files -z` via `execFileSync`,
  NUL-split. `scripts/docDriftCore.ts`'s `gitZ()` is the working idiom in this
  repo — follow it. Restrict to `.ts`, `.tsx`, `.sql`, `.md`, `.json`.
  Using git's own index is what keeps `node_modules` and build output out
  without a hand-maintained ignore list.
- **(b) Extract** every `ADR-\d{3}` token from those files.
- **(c) Assert resolution:** every extracted id must resolve to a file in
  `docs/adr/` whose basename begins `ADR-<id>-`. The failure message must name
  the unresolved id **and** the files that cite it, so the next occurrence is
  diagnosable from CI output alone.
- **(d) FLOOR ASSERTION — the anti-false-green.** The scan must find citations in
  **at least 12 distinct files** and at least **8 distinct ADR ids**. Below
  either floor the test FAILS with a message saying *the scan is broken*, not
  that the repo is clean. Both floors sit deliberately under today's live values
  (17 files, ids 001–010) so ordinary churn does not trip them, and both are far
  above zero so a broken glob, a bad regex or an empty `git ls-files` cannot
  produce a green.
- **(e) POSITIVE CONTROL — a separate `it()`.** Run the same extractor and the
  same resolver over an inline fixture string containing `ADR-999` and assert it
  reports exactly one unresolved id. This is the proof the resolver is able to
  fail; without it, clause (c)'s green is worth nothing (S66-1). Name the test so
  the control is visible in the reporter output.
- **(f) No exclusion list.** If a future file cites an ADR that has not landed,
  this test fails. That is the intended behaviour and the entire point of the
  phase. Do not add an allow-list "for now".

Self-reference needs no special casing: the `docs/adr/*` files cite their own ids
and each other, and all of those resolve.

## G3 · Self-verify — literal evidence, pasted, not summarized

1. `ls docs/adr/` — must list **10** files.
2. The three `sha256sum` lines from G1, next to the expected values above.
3. `npm run lint` — clean.
4. `npm run typecheck:api` — clean.
5. `npm run build` — paste the doc-drift line verbatim. Expected `[OK]`, **no
   reseal**. Anything else → STOP per constraint 4.
6. `npm run test` — paste the final summary line. Expected **362 test files** and
   the previous 3953 tests plus the cases you added; report the exact numbers you
   observe rather than confirming mine.
7. Paste the new test file's own reporter block, so the positive-control case is
   visible **by name**.
8. State explicitly, in one line each: no migration written · no production code
   modified · no DB contacted · no secret read or printed.

Then push the branch and **STOP for RULE-25 review.** Do not merge. The merge
message will be issued verbatim by the Architect after a fresh-clone review, per
S30-2.

## §PAYLOAD · The three documents, verbatim

Each block below is the complete file content. Copy the text **inside** the
fences; the fence lines themselves are not part of the file.


### PAYLOAD 1 of 3 -> `docs/adr/ADR-005-supabase-apply-authority.md`

```markdown
<!-- ADR-005-supabase-apply-authority-v2 · RESTORED TO PROJECT KNOWLEDGE 2026-07-26 (S66).
     PROVENANCE: this is the OWNER'S ORIGINAL document, supplied verbatim in session S66.
     It is NOT an Architect reconstruction — an Architect draft written the same session
     (before the original surfaced) was discarded, and its invented rationale for
     `db push` was materially WRONG: the real root cause is timestamp `version`s that
     never matched file prefixes, i.e. LEDGER DRIFT uncovered by the SEC-ADVISOR
     reconcile, not an abstract reproducibility argument.
     WHY THIS FILE EXISTS: F190 found ADR-005 present in NEITHER docs/adr/ (which holds
     001-004 and 006-008) NOR project knowledge, while 15+ repo files — production code,
     tests and two applied migrations — cite it by name as binding law. This file is the
     interim home; F190 lands it in docs/adr/ where the Author lane can finally read it.
     Text below is unmodified. -->

# ADR-005 — Supabase Apply Authority & Agent DB Access
**Status: Accepted · v2 · rev 2 · 2026-07-07**
*(EAIP governance primitive. Versioned per standing rule — supersedes v1 (Proposed), never silently
overwritten.)*

> **v2 delta (read first).** v1 proposed **CI** as the apply actor. The owner selected the simpler,
> already-proven model: the **Operator lane (Gemini)** applies, restoring the pre-2026-07-07
> three-role separation immediately with zero build cost. v2 records that as the Accepted decision,
> keeps the two non-negotiable refinements (apply via `supabase db push`, not `apply_migration`; a
> deterministic closing gate), and documents **CI-apply as a zero-rework future upgrade** (same
> commands, different trigger).

> **One-line decision.** Migrations are **authored** by AG (repo, read-only live access), **applied**
> by the Operator lane (Gemini) via **`supabase db push`** only, and **verified** by a deterministic
> post-apply gate (`verifyGrants` + `get_advisors`) whose output the Architect reasons over —
> independent of the actor that authored the change.

---

## Context

On 2026-07-07 (`b1529fa`) AG was granted a read+write Supabase MCP connection and used it to author,
apply, and self-verify three migrations plus a destructive ledger rewrite. The migrations were sound
and closed a real RPC info-leak and a real production audit bug — but self-apply + self-verify by the
authoring agent collapsed two locked decisions: *"autonomous-apply rejected as a standing mechanism"*
and the Operator lane's *"no ad-hoc governed-table writes"* fence, and removed the independent
live-read gate that caught the B / REPLAY-QUOTA-1 FIX-1 grant-lockdown bug. The sharpest edge was AG
holding live write to the service-role-only **secret-value** tables (`mcp_secrets`,
`llm_provider_secrets`) and the ledger tables.

### The safety property at stake (unchanged from v1)
For governed / secret / grant-bearing schema changes, the LIVE end-state must be confirmed by an actor
or mechanism **independent of the one that produced and applied the change**, before "applied +
verified" is declared. An agent's narrative self-check is not independent (it can be wrong the same
way the change was wrong — the FIX-1 class). A deterministic probe (`verifyGrants` anon-deny;
`get_advisors` diff) is independent: it cannot be talked into a false green.

---

## Decision

### 1. Roles (restores the proven three-role separation)
- **AG — author.** Writes migration `.sql` in the repo. **Live Supabase access = READ-ONLY** —
  inspects tables/structure/grants so it authors from real live shape instead of blind (a genuine
  upgrade over the pre-2026-07-07 model), but cannot mutate the live DB. The secret-store-write edge
  is removed the moment the key is downgraded.
- **Operator (Gemini + Supabase MCP) — apply.** Applies reviewed, merged migrations to the live DB
  via **`supabase db push` ONLY**. `apply_migration` / `execute_sql`-for-DDL are **banned** going
  forward — that mixed tooling (timestamp `version`s that never matched file prefixes) was the
  ledger-drift root cause the SEC-ADVISOR reconcile uncovered. The Operator's read role (diagnostics,
  live-schema reads, independent confirmations) is unchanged. Fence otherwise intact: no repo writes,
  no ad-hoc governed-table DATA writes (rule/provider edits go through the gated admin UI), never
  echoes a secret value.
- **Deterministic gate — verify.** After apply, the Operator runs `scripts/verifyGrants.ts` (anon-deny
  probes over the real DB, incl. the new function-EXECUTE probe below) **and** `get_advisors(security)`
  and reports the **raw output**. The Architect reasons over that raw output — not the Operator's or
  AG's narrative — before "applied + verified" is declared. This replaces "read the grants and eyeball
  them" with a probe that can't forget what to check.
- **Architect — review.** Writes ONE gated phase prompt per governed/secret migration; does the
  fresh-clone RULE-25 review before merge (apply happens only after merge).

### 2. Enforcement additions (pull forward)
- **HARDEN-FN-PROBE-1 (de-deferred → NOW).** Add a function-EXECUTE anon-denied probe to
  `verifyGrants.ts` (`replay_quota_settle(NO_UUID,0,0)` as anon → error = good; no-error = LEAK). This
  is exactly the class self-verification misses (the FIX-1 leak was a function-EXECUTE grant the
  table-UPDATE probes could not catch). It becomes part of the deterministic gate.
- **Advisor floor.** `get_advisors(security)` output is checked against the allow-list of the 5
  INTENTIONAL `rls_enabled_no_policy` INFO findings + the 1 Auth toggle; any NEW finding is a fail.

### 3. Ledger discipline (the drift root-cause fix, ratified)
- **`supabase db push` ONLY** for all future apply. One-time `supabase login` + `link --project-ref
  fjbrkimwvtpwoxhziidh` is an owner prerequisite; thereafter the Operator applies via `db push`.
- **Precondition on trusting `db push`:** the `schema_migrations` reconcile (delete-all + 33-row
  re-insert) must be **independently confirmed to match the LIVE schema** (not just the files) before
  `db push` is trusted — a file marked "applied" whose objects are absent would be skipped forever.
  This is the shipped independent verification prompt
  (`cwf-operator-VERIFY-sec-advisor-ledger-reconcile-v1.md`); it must PASS before the first `db push`.

### 4. New hard invariant (carry into KB / bootstrap)
The authz helpers live in `private`, not `public`. **Every future RLS policy or migration must call
`private.is_super_admin(...)` / `private.has_backend_scope(...)`.** The `private` schema must **never**
be added to PostgREST's exposed-schema list (that re-opens the boolean-oracle RPC leak SEC-ADVISOR-2
closed); the advisor re-run catches a regression.

---

## Future upgrade — CI-apply (documented, zero-rework, NOT built now)
If the manual Operator relay ever becomes friction, apply can move into a protected GitHub Actions
workflow on merge to `master`, with a scoped token held only in Actions secrets. **This is a pure
trigger swap: the apply command (`supabase db push`) and the verify command (`verifyGrants` +
`get_advisors`) are identical to the Operator model** — so adopting the Operator model now costs no
rework later. It is the direct analogue of the locked AWS *"Terraform applies, never an MCP; CI
applies it"* decision, deferred until warranted. Not on the live queue; recorded here so the path is
known.

---

## Interim posture (until AG key is downgraded)
AG holds live read+write today. Until the key is read-only:
- No governed / secret / grant migration is declared "applied + verified" on AG's self-report — the
  deterministic gate output (Architect-reasoned) is the sole basis.
- **Downgrade AG's Supabase key to read-only as the first action** — the secret-store-write edge is
  live every day the key stays read-write, and read-only preserves 100% of AG's verification value.
- No autonomous AG apply to `mcp_secrets` / `llm_provider_secrets` / `user_quotas` / `*_audit`.

---

## Consequences
**Gains.** The proven three-role independence is restored today at zero build cost; the sharp
secret-store-write edge is removed; AG gains live read for better-informed authoring; the deterministic
verify gate is stronger than the pre-2026-07-07 eyeball step; the model is forward-compatible with
CI-apply at zero rework.

**Costs.** Per-migration manual relay of the Operator apply + verify (the checkpoint the owner
values); one-time `supabase login` / `link`; the AG key downgrade; building HARDEN-FN-PROBE-1.

**Honest limit.** The Operator apply is still an interactive-agent live apply — its independence comes
from Operator ≠ AG-author + the deterministic gate, which is sufficient for the FIX-1 class but is not
the hands-off CI end-state. That end-state is available at zero rework when wanted (above). Software
gates and contains; it does not author correctness — the Architect spec pre-review remains the layer
that catches design-level errors a probe can't express.

---

## Relationship to existing decisions
- Restores the pre-2026-07-07 Operator-lane apply role, correcting only its apply MECHANISM
  (`db push`, not `apply_migration`) and adding the deterministic closing gate.
- Keeps the locked AWS principle (*MCP authors/validates, CI applies*) as the documented future
  Supabase upgrade rather than the immediate mechanism.
- Complements ADR-001 (trust is deterministic, never a self-assessment) — the DB-apply gate is that
  same discipline applied to schema mutation.

---
*Accepted 2026-07-07 (owner decision). Open precondition: the independent ledger↔live-schema +
SEC-ADVISOR-2 end-state verification must PASS before the first `supabase db push`. On the next
doc-touch, the KB/bootstrap gain the `private`-schema invariant + the `db push`-only rule; the
register gains HARDEN-FN-PROBE-1 (promoted from DEFERRED) + the AG-key-downgrade action.*
```

### PAYLOAD 2 of 3 -> `docs/adr/ADR-009-entity-topology-is-discovered.md`

```markdown
# ADR-009 — Entity topology is DISCOVERED, never authored
<!-- ADR-009-entity-topology-is-discovered-v1_1 · 2026-07-25 · S65 · Architect: Claude
     Owner ruling (Maymun), verbatim: "Ne kadar oraya hardcode koyarsak, o kadar
     kötüyüz. Yani bir şeye hardcode koymak, demek ki biz bu işi bilmiyoruz,
     yapamıyoruz demektir."  Status: ACCEPTED (owner-issued law).
     Floor at issue: rev 144 (master e91ed2a). ADR numbering verified against
     docs/adr/ (001–008 taken).

     v1_1 (supersedes v1, same session): adds §"The degree test" — the owner's
     99/1-vs-40/60 question operationalized as a scaling test a reviewer can
     check in a diff. Everything else is byte-identical to v1. Companion:
     ADR-010 (earned trust), which supplies this ADR's missing half — what to do
     when a DISCOVERED declaration turns out not to match reality. -->

## Status
**ACCEPTED** — owner-issued law, S65 (2026-07-25). Binding on every phase that
touches entity resolution, registry, routing, or the understanding layer.

## Context — what forced this
An S65 Operator read of live governed state exposed an asymmetry:

| Layer | Rows | How they got there |
|---|---|---|
| Factories | **17** | `entityRegistrySync.ts` — auto-mirrored from the backend's live list |
| Zones | **4** (all KB7) | hand-authored, seeded from in-code `referenceData.ts` |
| Zone/factory aliases | **5** | hand-authored, same seed path |
| Lines | **0** | — |
| Equipment | **0** | — |

Two live consequences were already observed in production chat: `glazur3`
resolves but `glazur4` does not (no alias row exists, and there is no registry
mirror for zones at all), and `mergeFactoryRegistryResolution` only runs for
`frame.object === 'FACTORY'` — so for a MES, where most questions are about
LINES and ZONES, the clarification gate is deciding against a nearly-empty
catalog.

The immediate danger is not the gap itself but the **cheap fix**: when M-A
reports "most blocks are entity-unresolved on ZONE/LINE frames", writing an
alias row for `glazur4` will look obvious, small, and harmless. It is none of
those things — it is a vote for an architecture where a human transcribes a
factory's topology into the database by hand, forever, going stale on every
backend change, with the work landing on the owner.

## Decision
**The system discovers its own world. Entity inventory and topology are
OBSERVED from the backend, never authored by a human.**

What the system must discover for itself:
- **which** factories, lines, zones, and equipment exist,
- their **names and identifiers** as the backend states them,
- their **parent–child edges** (factory → line → zone → equipment) — i.e. the
  topology graph is a *derived observation*, not a drawn diagram.

A hardcoded entity catalog is treated as an admission of ignorance: it means we
have not learned how to observe that layer. The remedy is always to extend
discovery, never to extend the hand-written list.

## The boundary — what code legitimately still holds
This law does **not** repeal DB-first/code-floor, and it is not "no constants
anywhere". The line is between **shape** and **inventory**:

**Legitimately in code (unchanged):**
- *Shapes and schemas* — what a zone IS, what fields an entity carries.
- *Algorithms* — `resolveEntityRef`'s normalize → exact → prefix → fuzzy(DL≤2)
  tiers, Turkish folding, suffix stripping.
- *Policies and closed enums* — `IR_ACTIONS`, `IR_OBJECTS`, gate priority order.
- *The discovery mechanism itself* — the descriptor-reading sync code.

**Never in code (this ADR's subject):**
- *Inventory* — which factories/lines/zones/equipment exist, what they are
  called, how they nest.

The code-floor's three sanctioned roles (seed, reset target, outage floor)
apply to structure and policy. **They do not extend to observed inventory**,
because inventory has a better floor: the persisted mirror itself. This is
already how `entityRegistrySync.ts` behaves — a failed or empty-but-successful
sync never empties the mirror (`missing != deleted`, "outage only disables"), so
the last-known-good observation survives the outage without any in-code copy of
the factory list.

**Vocabulary is a third, distinct case.** Human synonyms ("glazur3" for
"Glazur3 Hattı") are not inventory. Under the binding architecture these are
**machine-proposed from observed misses and human-ratified** — the L5
entity-miss ledger records every NIL/AMBIGUOUS resolution, proposes an alias,
and a human plus the eval-gate publishes it. Machine-proposed + human-ratified
is compliant. Hand-authored-from-scratch inventory is not.

## The degree test — "how much hardcoding is too much", made checkable
This system is a *custom* agent; some per-integration tweaking is legitimate and
always will be. The owner's framing of the limit was a ratio — roughly, *99%
self-discovery / 1% tweak is acceptable; 60% hardcoded / 40% discovery is not.*
The intent is exactly right, but a percentage is unmeasurable in a code review
and endlessly arguable. It is therefore operationalized here as a **scaling
test**, which a RULE-25 reviewer can apply to a diff without estimating anything:

> **Does the hand-authored artifact grow with the WORLD, or with the INTEGRATION?**

- **Grows with the WORLD** — with the number of factories, lines, zones,
  equipment, or any other thing the customer's plant contains → **FORBIDDEN.**
  The world is unbounded and changes without telling us; anything scaling with it
  is stale by construction and lands the maintenance on a human.
- **Grows with the INTEGRATION** — one entry per connected backend, authored once
  at connection time → **ACCEPTED.** This is the bounded, honest meaning of
  "custom agent", and it is where the owner's 1% lives.

Worked examples:

| Artifact | Scales with | Verdict |
|---|---|---|
| `backends.entity_list_tool` (one nullable column per backend) | integration | ✅ |
| A per-backend quirk note ("this backend's factoryId is case-sensitive") | integration | ✅ |
| 17 hand-written factory rows | world | ❌ |
| One alias row per zone (`glazur3`, `glazur4`, …) | world | ❌ |
| A code branch naming a specific backend | neither — it is a genericity breach | ❌ (also fails test 1) |

The test's practical value is that it converts a philosophical limit into a
mechanical review question. If a reviewer cannot state which of the two a new
hand-authored artifact scales with, that ambiguity is itself the finding.

## Enforcement — three tests every entity-touching phase must pass
1. **Genericity (zero per-backend literals).** No module in the discovery path
   may name a specific backend, factory, line, or zone. The existing red-team
   test stands as the template: *a seeded fake backend row syncs identically to
   a real one, with nothing in the module referencing a specific backend id.*
2. **Descriptor-as-data.** Which tool to call to discover a layer is read from
   the database (today: `backends.entity_list_tool`, nullable), never from a
   code branch. Extending discovery to lines/zones/equipment must extend this
   descriptor pattern — a new per-backend code path would violate both this ADR
   and the standing "backend identity is DATA" law.
3. **Absence honesty (empty≠zero, applied to topology).** If a backend exposes
   no discovery tool, the catalog for that layer is **empty**, and the correct
   runtime behavior is for the gate to ASK (clarify) rather than guess. An empty
   catalog must never be patched with hand-authored rows to make the gate quiet.
   Silence bought with hand-written inventory is exactly the failure ADR-001
   exists to prevent: a system that appears to know something it does not.

## Consequences
- **Compliant today:** factory discovery (`entityRegistrySync.ts` +
  `factory_registry`), including its cadence (on-connect / Sync / health-tick,
  one call site, zero manual entry) and its ADR-001 status as *an observation,
  never governed authority*.
- **Violating today:** the seeded `armes.zone` rows and `armes.entity_alias`
  rows in `referenceData.ts`. These are hereby **transitional**: they stay only
  until discovery covers their layer, then they are retired rather than grown.
  Adding to them is a regression under this ADR.
- **Binding constraint on M-A (STEP 3) interpretation:** whatever the
  clarification-gate baseline reports, an entity-coverage gap is NEVER closed by
  writing alias/zone rows. The sanctioned remedy is extending discovery to that
  layer. M-A's number exists to justify and later PROVE that extension — not to
  motivate hand-patching.
- **The graph falls out for free.** `factory_registry` is a flat list today.
  Once lines, zones, and equipment are discovered with their parent edges, the
  factory→line→zone→equipment graph *emerges as a derived observation*. This is
  the correct order: the graph is grown from what the backend reports, never
  drawn first and filled in afterwards.
- **Review gate:** RULE-25 reviews of entity-touching phases check the three
  enforcement tests above. A diff that adds inventory rows to code or to a
  governed table by hand is rejected regardless of how small it is.

## Why this is worth the cost
Discovery is more work than a seed row exactly once; a hand-maintained catalog
is more work every time the plant changes and is silently wrong in between. The
owner's framing is the operative test, and it is recorded here as the decision
rule: **if we are reaching for a hardcoded entity, we have not yet learned how
to observe it — and that, not the missing row, is the actual defect to fix.**

<!-- END · ADR-009-entity-topology-is-discovered-v1 · 2026-07-25 -->
```

### PAYLOAD 3 of 3 -> `docs/adr/ADR-010-earned-trust-declaration-vs-observation.md`

```markdown
# ADR-010 — Earned trust: a declaration is a claim, not a warrant
<!-- ADR-010-earned-trust-declaration-vs-observation-v1 · 2026-07-25 · S65 ·
     Architect: Claude · Owner-driven (Maymun, S65). Status: ACCEPTED as design
     law; IMPLEMENTATION NOT BUILT (see §Current state). Companion to ADR-009
     (discovery) — this ADR supplies its missing half. Floor at issue: rev 144
     (master e91ed2a). ADR numbering verified against docs/adr/ (001–009 taken). -->

## Status
**ACCEPTED as law · NOT YET IMPLEMENTED.** The signal sources, the ledger, the
two-speed enforcement split, and the per-tool granularity requirement below are
binding on any future phase that touches backend trust. Nothing here is built
today; §Current state records honestly what exists.

## Context — the owner's scenario, which the architecture must answer
Connect a backend. Philosophically — and this is the whole point of MCP — its
tools are *declarations*: "I expose this tool; it returns every zone and machine
inside a factory." You do not own that backend. You cannot verify the claim
before using it. The protocol's essence is to **accept the declaration and adapt
dynamically** — plasticity is the core concept, and ADR-009 makes that binding
for entity topology.

Then reality arrives. A user asks for a factory's zones. You walk from the root
the tool declared, request its sub-branches, and the answer that comes back is
not what the user needed — the sub-branch structure is not what was declared.

At that point the only honest conclusion available is: **this tool is
untrustable.** There is no third option. And a system that cannot reach that
conclusion has only two remaining moves, both bad: keep answering from a source
it has evidence against, or let a human quietly hardcode around it — which is
precisely the failure ADR-009 forbids.

**So ADR-009 is only half a law.** Discovery replaces authored inventory with a
declared one. But a declaration is a *claim about capability*, not a *warrant of
correctness*. Without the loop below, "we discovered it" becomes a new way to be
confidently wrong.

## Decision
**Accept declarations at the routing layer; earn trust at the answer layer.**

1. A backend's tool declaration is accepted for *reachability* — it determines
   what may be called. This preserves MCP plasticity in full.
2. A payload's fitness to be answered from is **earned by observation** and can
   be **lost** by observation. The system must be able to reach, record, and act
   on the verdict *this tool is untrustable* — deterministically, from evidence,
   without a human noticing first.
3. Trust never silently improves. Absence of evidence leaves a source at its
   declared tier; it never promotes.

This is ADR-001 carried to its conclusion: the goal is not to make a lying
backend honest, but to make it **harmless** — contained, attributed,
quarantinable. ADR-010 supplies the missing input to that machinery: the
evidence that something is worth containing.

## Mismatch signals — deterministic, never LLM-judged
Grounding in this system is deterministic code, never a model's opinion, and
trust evidence inherits that law. Only mechanically checkable signals count:

1. **Shape violation** — the declared output schema vs the returned payload's
   actual shape.
2. **Internal contradiction** — one source contradicting another: a factory
   registry reporting 17 factories while the zone tool only ever serves one; a
   parent claiming children that the child-listing tool denies.
3. **Declared-completeness violation** — a tool declaring "all X for Y" while
   returning a proper subset that a second source contradicts. **This is the
   dangerous class and it is undetectable from a single call** — it requires
   cross-evidence by construction. A design that only ever consults one source
   per question cannot see it at all.
4. **Outcome failure** — a grounding violation fired, the turn errored, or a
   downstream check rejected the answer that was built on the payload.
5. **Absence pattern** — persistent emptiness from a tool declared to return
   data. This signal MUST be read through `empty≠zero`: a genuine real-0
   (the factory truly has no zones) is a correct answer and must never be
   counted as evidence against the tool. Only *gap* and *unparseable* outcomes
   accumulate. Getting this backwards would punish honest backends and is the
   most likely way to implement this ADR wrongly.

## Granularity — trust is per-TOOL, not per-backend
The owner's scenario is one *tool* lying while the rest of the backend works
correctly. Today's trust model is per-backend, which forces an all-or-nothing
response: quarantine everything, or tolerate a known-bad tool. Both are wrong.

**Trust evidence and trust verdicts must be attributed at tool granularity**, and
a per-tool downgrade must not disable its siblings. Backend-level trust remains
the ceiling (an unverified backend's tools cannot exceed it), but the floor is
reachable per tool.

## Two-speed enforcement
The tension between "a lying backend keeps lying while a human sleeps" and "an
automated system must not silently disable a working integration" resolves into
two different mechanisms at two different speeds:

**Fast, automatic, per-turn, reversible — PAYLOAD CONTAINMENT.**
A payload failing a deterministic check (shape violation, contradiction with a
better-attributed source) is contained *for that turn*: not answered from, or
answered from only with explicit attribution and hedging. This is ADR-001's
existing containment posture, needs no human, changes no persistent state, and
carries no risk of disabling anything.

**Slow, ratified, persistent — TRUST TIER DOWNGRADE.**
Changing a source's standing authority is a **governance act**, because the tier
is a governed declaration. It therefore follows the pattern this project already
accepted for entity aliases (the L5 entity-miss ledger): **mismatches accumulate
in a ledger → the machine PROPOSES a downgrade with the evidence attached → a
human plus the eval-gate ratifies → the new tier is published.** Machine-proposed,
human-ratified. No hidden automatic demotion of a governed declaration; no
silent tolerance of accumulated evidence either, because the proposal surfaces.

## The honest limit — inconsistency, not falsehood
Discovery makes the system faithful **to the backend**, not to the world. If a
backend's zone list is simply wrong — consistently, without contradicting itself
— nothing here detects it. What this ADR makes detectable is **inconsistency**:
a source contradicting itself, another source, or its own declaration.

Detecting *falsehood* requires ground truth the system does not have, and
claiming otherwise would be the same overreach this ADR exists to prevent. The
correct target is therefore not perfect correctness but **harmlessness**: wrong
payloads are contained, attributed, and quarantinable, and when the system does
not know, it asks rather than guesses.

## Current state (verified against master @e91ed2a, rev 144)
- `knowledge/reference/backendTrust.ts` — *"the immutable CODE declaration of
  backend TRUST"*; `FLOOR_TRUST` is tier `unverified`, **authoritative for
  NOTHING**, scopeSource `none`. Known ≠ declared: even armes/superset sit at
  floor unless declared.
- `backends/trustRegistry.ts` — DB-first/code-floor read seam (Phase A1).
  Resolution: OUTAGE → code reference (DB-down never erases the authority map);
  WARMED + non-floor declared tier → the DB declaration; no row / `unverified` →
  FLOOR. Its stated invariant: *an unverified/unknown backend is never
  authoritative.*
- Enforcement is explicitly deferred: the module states it *"does NOT alter any
  answer; nothing here is imported into chat.ts's answer flow in A1 (enforcement
  is Phase C)."*

**Assessment.** The declaration side is well built, with a safe default. What
does not exist is any path from *observed behavior* back to *trust*: no mismatch
ledger, no proposal mechanism, no per-tool granularity, and no verdict of
"untrustable" that the system can reach on its own. Today that verdict is a
human noticing. This ADR names that gap; closing it is future work, sequenced
with Phase C enforcement.

## Consequences
- Any phase implementing trust enforcement (Phase C or later) must satisfy: the
  five signal definitions, `empty≠zero` in signal 5, per-tool granularity, the
  two-speed split, and machine-proposal/human-ratification for tier changes.
- No new LLM judge may be introduced for trust evidence; signals stay
  deterministic and replayable.
- The mismatch ledger is a governance/evidence ledger and inherits the existing
  separation from debug traces (ledger ≠ trace).
- **ADR-009 interaction:** when discovery produces a declaration that later fails
  these signals, the remedy is a trust action — containment, and if warranted a
  ratified downgrade — **never** a hand-authored inventory row patching around
  the bad tool. That escape hatch stays closed.

<!-- END · ADR-010-earned-trust-declaration-vs-observation-v1 · 2026-07-25 -->
```

<!-- TAIL ANCHOR (S61-3) — if you cannot see this line the relay was truncated; request the artifact again before starting.
     END · PHASE-F190-ADR-LANDING-v1 · 2026-07-27 · S67 -->
