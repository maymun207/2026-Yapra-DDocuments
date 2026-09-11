# ADF-ROLE-TOPOLOGY-MEASURED-S136-v1

**What this is.** The Agentic Development Factory's role topology — who exists, what each
may do, which channel carries what — VERIFIED against primary sources on 2026-09-11 (S136),
after the owner described it in his own words and asked that it be checked rather than
transcribed.

**What this is NOT.** It is not law. `docs/laws/` is canonical, the ADRs are canonical, and
the live database is canonical. This file is a MAP whose every line names the instrument
that produced it, so a future Architect can re-measure instead of inheriting. If this file
and a primary source disagree, the primary source wins and the difference is a bug.

**Why it exists.** Until S136 the Architect had no filesystem bridge to the repository and
reconstructed this topology from prose, session to session. The owner connected the code
repository and the document archive as folders in S136, and the whole topology became
readable in one session for the first time. Reconstructed-from-prose is exactly the
CIRCULAR EVIDENCE class this house is named after; this file replaces it with measurement.

**Provenance of the reading.** Owner's clone at `master 92a3f0b313c1b15d9c64e703afcf10649bf751cb`,
worktree clean apart from one modified ground file. Live database
`fjbrkimwvtpwoxhziidh` read through the Architect's own Supabase MCP.

---

## 1 · THE ROSTER — FIVE ADDRESSES PLUS TWO NON-LANES

The ceiling is a DATABASE CONSTRAINT, not a list in a document. Measured live:

```evidence:db
conname relay_inbox_lane_addr_check
CHECK (lane_addr = ANY (ARRAY['AG-1','AG-2','AG-3','AG-4','AG-5','operator','scout']))
```

`scripts/factoryState.mjs:82` agrees in the tree:
`FACTORY_ADDRESSES = ['AG-1','AG-2','AG-3','AG-4','AG-5','operator','scout']`.

**An address outside that array is not a spare lane, it is a SILENT one.** Measured in an
earlier session and recorded in `.claude/commands/claim.md`: two windows won `lane/AG-6` and
`lane/AG-7`, both pushes accepted, both refs read back carrying their own nonce — and both
polled `rows=0` forever, because the CHECK rejects the value so no card can ever be
addressed to them. An unaddressable box and an empty box are byte-identical at the poller.
Derive the ceiling with `npm run claim:roster`; never from memory.

### The role table, as DATA rather than prose

`scripts/authorityMatrix.mjs` exists so that authority is declared in ONE place and a test
compares that declaration against the live bus, the verb bodies, the roster module and the
boot prose. Its `ROLES` export, read verbatim:

| role | claim shape | holds an address? |
|---|---|---|
| `architect` | `null` | no — "Posts cards to every address and holds none. Authority flows one way." |
| `foreman` | `/^AG-5$/` | yes, FIXED at AG-5 |
| `producer` | `/^AG-(?!5$)[0-9]+$/` | yes — every AG address EXCEPT the foreman's |
| `scout` | `null` | **no** — "has a box on the bus and no ref" |
| `operator` | `null` | no — "Receives cards and is nobody's lane" |

The producer shape carries a negative lookahead on purpose: if it were `/^AG-[0-9]+$/`, AG-5
would answer to two roles and the module would manufacture a false
`ADDRESS-CLAIMED-BY-TWO-ROLES` finding out of its own spelling.

Combining the shape with the DB ceiling: **the producers are AG-1 · AG-2 · AG-3 · AG-4, and
the foreman is AG-5.** The owner's account of this is exactly right.

### These bindings were RULED, not designed by the Architect

`authorityMatrix.mjs` carries the rulings in its own header, under
`OWNER-RULING-S130-SEVEN-DISAGREEMENTS-AND-HOLD-1`. The module had reported seven
disagreements between itself and the world; **six of the seven were the module being wrong,
not the world.**

- **RULING 3** — the foreman address is FIXED and it is `AG-5`. There is no `UB-*` shape and
  never was one live. The `laneNonce('AG-5')` literal and the ordinal in
  `.claude/boot/foreman.md` ARE THE DESIGN, not defects.
- **RULING 2** — the scout takes NO address. *"Scout adres almadan devam eder."*
- The earlier S118 ruling (roles must be a matrix, not an ordinal convention) is
  **SUPERSEDED** — kept in the file rather than erased, so a reader can tell a settled
  question from one nobody ever asked.

---

## 2 · THE FIVE WINDOWS, ONE BY ONE

Each window is booted by a slash command that reads a boot file. The boot file does not tell
a lane which address it is; **the lane wins the address from the server.**

| command | boot file | role | address |
|---|---|---|---|
| `/wr` | `.claude/boot/producer.md` | producer (WR) | won from the server, AG-1…AG-4 |
| `/ub` | `.claude/boot/foreman.md` | foreman | AG-5, fixed |
| `/free` | `.claude/boot/free.md` | scout | **none — "a scout is not a lane"** |
| `/op` | `.claude/boot/operator.md` | Operator | `operator`, fixed |
| `/claim` | `.claude/commands/claim.md` | the address walk itself | — |
| `/durum` | `.claude/commands/durum.md` | measured state, changes nothing | — |

### 2.1 · Architect (this window — Claude)

Holds no address and appears in no `factory_state` row. Posts cards to every address;
authority flows one way. Diagnoses, proposes ONE measured path (never a menu — S112-YASA-1),
cuts one gated versioned card per phase, reviews lane reports, and reads production itself
through the Supabase and Vercel MCPs. **Writes no repository file and hands the owner no
terminal command** (S102-YASA-1).

### 2.2 · Producer / WR — AG-1 … AG-4

Authors ALL repository work: code, tests, migration FILES, its own report. Branch
`phase/<card-name>`, push early and keep pushing, report at
`docs/relay/<CARD>-AGN-report.md`, open the pull request — **and stop there.**

`.claude/boot/producer.md` §"A producer NEVER sets `ADF_LANE_ROLE`": the variable is not a
label describing who you are, it is the **merge key**, and in a producer window UNSET is the
CORRECT state. *"The absence is the feature."* Do not set it and do not "fix" it when you
notice it is unset.

### 2.3 · Foreman — AG-5

Lands work and sweeps the dead. Booted with `claude --settings .claude/settings.foreman.json`
— a separate, reviewable settings file, because the producer settings do not carry the merge
permission. Its first bash call is a POSITIVE CONTROL on the guard
(`git -C /nonexistent-gate-probe push --force origin gate-probe`; BLOCKED is the PASS,
EXECUTED means print `GATE-INERT` and STOP), because *"an inert hook looks exactly like a
well-behaved one from the inside."*

### 2.4 · Scout — `/free`, "Free scout"

First line of its boot: **"You measure. You change nothing."** It claims no address, mints no
nonce, pushes no lane ref. It has a box on the bus and files reports on the bus. Two probes
at birth instead of one — the bash gate AND the MCP fence
(`mcp__supabase-ro__execute_sql {"query":"select 1"}`, where BLOCKED is again the PASS),
because the two hooks are wired by two separate `matcher` entries and *"for an entire wave
EVERY MCP CALL WAS UNGUARDED while the bash gate proved itself green on every boot."*

Its two jobs, as the owner states them and as the artefacts confirm:

1. **Measure what the Architect cannot reach** — GitHub Actions above all, which sits behind
   a credential the Architect does not hold.
2. **Be the ADVERSARY.** A card goes to the scout BEFORE it goes to a producer; the scout
   attacks it; the Architect amends the card on what it found; the scout reviews again; only
   on its green does the card go to a WR for implementation.

The scout is a MEASURING INSTRUMENT, not a messenger. It is allowed — expected — to REFUSE:
in S134 it falsified the Architect's push-versus-pull_request framing with one run, corrected
a card that demanded three green gates by measuring that `report-schema` is path-scoped with
no push trigger and therefore CANNOT fire, refused to name a cause with no log behind it, and
caught a Vercel commit status reading `state=success` whose own description said the deploy
had been cancelled.

**Its own fence, measured:** `guard-mcp` GM-1 refuses `execute_sql` on the LAST NAME SEGMENT,
so it holds for every server offering it — including one named read-only — because whether a
SQL channel can write is a fact about the CREDENTIAL that the hook cannot see. Consequence:
**the scout cannot corroborate any `evidence:db` fence.** Database readings are the
Architect's own measurement, alone.

### 2.5 · Operator — Gemini + Supabase MCP, address `operator`

*"You hold the database. Nobody else in this factory may write its schema, and you may write
nothing else."* Its address is FIXED; it runs no claim walk. Every tool call names the project
id explicitly — `fjbrkimwvtpwoxhziidh` — and the boot orders the reader to DERIVE that id
from the repository rather than trust the boot's own line, because *"a boot is a document that
can go stale; the repository is the thing it describes."* An omitted id is worse than a wrong
one: a wrong id fails loudly, an omitted id falls through to a default, and **a default is a
choice with no name.**

---

## 3 · THE CHANNELS — AND THE ONE CORRECTION THAT MATTERS

### 3.1 · Cards go OUT on the bus

`public.relay_inbox`, `direction='to_lane'`, addressed by `lane_addr`. The Architect writes
them. A lane reads its box DIRECTLY by `created_at` at window birth — a poller's high-water
anchor is set to the newest row as of the START of the run and asks for rows STRICTLY LATER,
so the row sitting AT the anchor is never returned, and a window whose card was minted moments
before it booted is told `zero new rows` for as long as it runs
(`F-S117-FOREMAN-BACKLOG-BLIND-1`). **A lane works until its box is empty.**

### 3.2 · Reports do NOT come back on the bus from an AG lane

This is the one place the spoken model and the measurement diverge, and it is worth the space.

```evidence:db
conname relay_inbox_reply_authority
CHECK ((direction = 'to_lane') OR (lane_addr = ANY (ARRAY['operator','scout'])))
```

```evidence:db
lane_addr  direction    rows   newest
AG-1       to_lane       153   2026-08-28
AG-2       to_lane       162   2026-08-28
AG-3       to_lane       152   2026-08-28
AG-4       to_lane       231   2026-09-10
AG-5       to_lane       169   2026-09-10
operator   from_lane     181   2026-09-07
operator   to_lane        12   2026-08-26
scout      from_lane     248   2026-09-11
scout      to_lane       150   2026-09-10
```

**No AG lane has ever written a `from_lane` row, and none can.** 867 cards have gone out to
the five AG addresses and ZERO replies have come back on that channel — not because the lanes
were silent, but because the database REFUSES the row. Only `operator` and `scout` may author
a bus report.

This is DESIGN, not drift, and it was ruled: `supabase/migrations/20260904073800_relay_inbox_reply_authority_drift.sql`
exists precisely to make the migration history state what the live database already enforces.
The declared constraint in `20260813110000_relay_inbox.sql` was NARROWER still —
`operator` only — and `scout` had been added to the live database directly, so a database
rebuilt from this repository's migrations would have REFUSED every report the scout files.

So the return path for a producer or the foreman is **the work itself**: a pushed branch, a
`docs/relay/<CARD>-AGN-report.md`, an opened pull request. The read side is
`scripts/busDelivery.ts`, whose three states are the point:

- **ACTED** — a name the CARD ITSELF declared exists on origin. *Work is proof of receipt,
  whatever the stamp says.*
- **RECEIPTED** — stamped, and no declared name found. If the card DID declare names, this is
  the interesting alarm: mail read, nothing produced.
- **NO-EVIDENCE** — neither plane shows anything. **This is NOT "undelivered."**

And the standing warning beside it: `consumed_at` answers *"did the consumer WRITE?"* and gets
read as *"did the card ARRIVE?"*. Those coincide only when every consumer can write, and they
do not. The Architect made exactly this error in S135
(`A-REC-S135-I-READ-AN-ABSENT-RECEIPT-AS-AN-ABSENT-ACTION`) — it read `consumed_at IS NULL` and
reported that AG-5 had not touched a card for 24 hours, while AG-5 had consumed it, built it,
pushed a branch and opened a pull request. **A branch head, a commit, a run id and a landed
file are written by the action; `consumed_at` is merely correlated with it.**

---

## 4 · THE MERGE FENCE, MEASURED END TO END

Four independent mechanisms, and knowing all four is what keeps a landing plan executable:

1. **`.claude/settings.json` (producer) carries no merge permission.** `settings.foreman.json`
   does, and it is a separate reviewable file.
2. **`guard-bash.py` GB-2** — `FOREMAN_ROLE = "foreman"` and `role = os.environ.get("ADF_LANE_ROLE")`.
   The guard's own prose: *"NOTHING sets this variable to 'foreman' … so `gh pr merge` is fenced
   in EVERY window, this one included. That is the designed state, not a gap. Merges go through:
   `npm run land`."*
3. **`guard-bash.py` GB-3** — the only legal landing form is exactly `gh pr merge <n> --auto --merge`,
   tested as a WHOLE FLAG SET rather than a blacklist. `--squash` destroys the per-commit history
   the landing verdict is written against; `--rebase` cancels the CI certificate, because a gate
   certifies a TREE.
4. **`scripts/land.ts` step B — the SELF-LAND rule.** The author lane is read from the COMMIT
   SUBJECTS (`/\bAG-\d+\b/`), never from a login — every lane pushes with one credential, so
   `author.login` was identical for every pull request and could not discriminate. The lander
   lane is the `ADF_LANE_ROLE=AG-<n>` prefix on `npm run land`. Then:

   ```
   reportOnly = paths.length > 0 && paths.every(p => p.startsWith('docs/relay/'))
   author !== lander                  -> PASS
   author === lander && reportOnly    -> PASS   (the E1 exception: a lane may land the RECORD
                                                 of a landing it was carded to do)
   author === lander && !reportOnly   -> REFUSE 'SELF-LAND'
   ```

**`scripts/land.ts` reads `process.env` in exactly ONE place, and contains no owner-ruling
hook, no break-glass flag and no exemption input.** Measured S136 by
`grep -n "process\.env\.[A-Z_]*" -o scripts/land.ts` (one match) and
`grep -n "OWNER_RULING\|SELF_LAND" scripts/land.ts` (zero matches). The operational
consequence, which cost S135 its landing: **an owner ruling that AG-5 may land its own work
cannot execute.** There is no surface for it to land on. Such a ruling AUTHORISES a narrow
lift in `land.ts`; it does not substitute for one. Name the agent that will execute a path
before publishing it (A-REC-S133-4).

And the standing prohibition that makes the whole thing necessary, from `CLAUDE.md` §5:
**"NEVER MERGE YOUR OWN WORK — that rule tracks who did the work, not who opened the PR, and
no measurement, wait or argument relaxes it."**

---

## 5 · THE MIGRATION FENCE

Owner's ruling, quoted verbatim inside the migration header:

> **"CWF migrationlarını DB'ye yazan tek bir authority var, o da GEMINI'dir, NOKTA."**
> — OWNER-RULING-S130-SEVEN-DISAGREEMENTS-AND-HOLD-1, RULING 1

`ADR-005-supabase-apply-authority` (the owner's ORIGINAL document, restored verbatim in S66 —
an Architect reconstruction written the same session was DISCARDED because its invented
rationale was materially wrong): migrations are **authored** by AG in the repository,
**applied** by the Operator lane via **`supabase db push`** and never `apply_migration`, and
**verified** by a deterministic post-apply gate (`verifyGrants` + `get_advisors`) whose output
the Architect reasons over — independent of the actor that authored the change.

`ADR-006-agent-operating-modes` generalises it into one invariant worth memorising:

| mode | repo | DB |
|---|---|---|
| Developer | write (via PR) | **read-only** |
| Operator | read-only / none | **write** |

> **No mode grants repo-write and DB-write at the same time.** Whoever is developing is DB
> read-only; the DB-write is done by the *other* agent. Mode is bound to a **connection**, not
> to a spoken instruction, and the default is always the safe side. Enforced at the Postgres
> level (`supabase_read_only_user`, `transaction_read_only=on`, DDL → SQLSTATE 25006) — *not by
> the agent believing it is read-only.*

So a migration crosses TWO doors: a producer authors the file, the Operator applies it. The
lane that wrote it does not run it.

---

## 6 · A FINDING THIS MEASUREMENT PRODUCED — THE ADVERSARY LOOP IS LAW WITH NO GATE

The scout-first rule is BINDING prose. Project instructions §12.1: *"the adversary gate may be
lifted ONLY for a card that REPEATS the subject of a superseded card — the loop-breaking case.
A card on a NEW subject GOES TO THE SCOUT, without exception, and the card says so."*

**Nothing enforces it.** `scripts/cardPreflight.ts` — the gate every card passes before insert —
was grepped for `adversary`, `scout` and `hasım` in S136 and returned **zero matches**. Its
eleven checks (CP-1 … CP-11) are a GRAMMAR gate: they judge the SHAPE of a card and never
whether it went to the adversary, and never whether its instructions are a trap. The project
instructions already say the second half — *"`cardPreflight` GREEN IS NOT A REVIEW … An
Architect who ships on preflight green has verified punctuation and called it judgement"* —
but the first half, that no gate asks the scout question at all, is stated here as a
measurement for the first time.

This is the house's own CALLER-ABSENT shape applied to a rule instead of a function: from the
outside, a discipline nobody enforces and a discipline nobody follows are byte-identical. It
is recorded here as a finding, not repaired — repairing it is a card, and a card is not cut in
the same breath as the measurement that motivates it.

---

## 7 · THE OWNER'S ACCOUNT AGAINST THE MEASUREMENT

Recorded by name under S112-YASA-1 · §12.14, because a record in which every insight appears
to be the Architect's teaches a future Architect to trust its own output more than it has
earned.

**VERIFIED, exactly as he stated it:**

1. WR workers take addresses AG-1 … AG-4 — confirmed by the live CHECK plus the producer
   claim shape's `(?!5$)` lookahead.
2. The Architect posts the cards, in Supabase — confirmed: `relay_inbox`, `direction='to_lane'`,
   867 rows addressed to the five AG lanes.
3. The foreman is also an AG, and it is the one that merges — confirmed: AG-5, fixed by
   RULING 3, and it is the only window whose settings carry the merge permission.
4. The scout is the adversary: cards go to it BEFORE the WR, it criticises, the card is
   rewritten, it reviews again, and only on its green does the card go to a WR — confirmed as
   binding law in the project instructions, and confirmed in traffic (150 cards to `scout`,
   248 reports from it). See §6 for what is NOT true of it.
5. Only Gemini, as Operator, writes migrations to the database — confirmed verbatim, in his
   own words, inside the migration header itself.

**CORRECTED by measurement:**

6. *"AG'ler sana Supabase'de mailbox'ına cevap yazar."* — **They cannot.** The
   `relay_inbox_reply_authority` CHECK permits `from_lane` only for `operator` and `scout`, and
   in the whole history of the bus no AG lane has written one row. An AG lane's answer is its
   BRANCH and its `docs/relay/` report, read back through `scripts/busDelivery.ts` on the
   principle *"work is proof of receipt."* (§3.2)
7. *"Scout … adı foreman."* — The scout and the foreman are two different windows. The scout's
   boot is `.claude/boot/free.md`, its command is `/free`, its role id is `scout`, and it holds
   NO address. The foreman's boot is `.claude/boot/foreman.md`, its command is `/ub`, and its
   address is AG-5. The word the scout answers to is **free**.

---

## 8 · RE-MEASURE, DO NOT INHERIT

Every claim above has a command. Run them rather than quoting this file:

| claim | command |
|---|---|
| the roster ceiling | `npm run claim:roster` · or the live `pg_get_constraintdef` on `relay_inbox_lane_addr_check` |
| the role table | read `scripts/authorityMatrix.mjs` `ROLES` |
| who may author a bus report | live `pg_get_constraintdef` on `relay_inbox_reply_authority` |
| the merge fence | `.claude/hooks/guard-bash.py` GB-2/GB-3 · `scripts/land.ts` step B |
| the migration authority | `docs/adr/ADR-005-supabase-apply-authority.md` · `ADR-006` |
| the anchor, lanes, open PRs | `/durum` — `npm run architect:open`, `git ls-remote origin 'refs/heads/lane/AG-*'`, `gh pr list` |
| the adversary gate | `grep -i "scout\|adversary" scripts/cardPreflight.ts` — expect ZERO until a card repairs it |

**And the standing caution over all of it**, which this factory has paid for more than once:
`F-S122-STALE-COUNT-CLASS-IS-SUBSTRATE-INDEPENDENT-1` — the dominant failure mode here is a
NUMBER that passes from one carrier to another without being re-derived, and every actor
commits it, the owner included. The numbers in this file are stamped 2026-09-11 and are
claims, not the world.

END · ADF-ROLE-TOPOLOGY-MEASURED-S136-v1
