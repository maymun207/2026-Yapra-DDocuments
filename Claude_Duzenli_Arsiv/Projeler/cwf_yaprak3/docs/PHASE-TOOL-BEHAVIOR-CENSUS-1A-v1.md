# PHASE-TOOL-BEHAVIOR-CENSUS-1A · v1 — walk item #10 🔑 · lane AG-1

<!-- Architect-authored · S95 Wave 2 · SOTA gate key #2 of 7.
     Self-contained; lanes cannot see project files. The owner's algorithm is
     embedded verbatim below and is BINDING — deviation is an owner-ruling
     violation, not a design choice. -->

## PRECONDITION (S47-1)
Fresh FULL clone. `git rev-parse origin/master` MUST print
`d8e76884318bba818d910a8dc0a838d163f94b89` · docVersion **rev 236** ·
72 migrations · 14 ADRs · 541 test files. If master has moved, record the
actual base and proceed (you rebase at your merge turn regardless).

## LANE / BRANCH / REPORT / PR (S91)
Lane **AG-1** · branch **`phase/tool-behavior-census-1a`** · PUSH to origin ·
OPEN PR against master · report
**`docs/relay/PHASE-TOOL-BEHAVIOR-CENSUS-1A-report.md`** · merge only on
Architect GO, `--no-ff`, squash banned.

## WAVE-SEAL LAW (learned today — binding)
docVersion has ONE writer per merge turn, and **no lane can know from inside
itself whether it merges first**. Therefore: do NOT reseal during the build.
At your merge turn: rebase onto current origin/master → read docVersion
MASTER-side → take the NEXT number → `npm run reseal` on the REBASED worktree
→ bump in the SAME commit. A demanded REDRAW is a STOP-and-report.
`.agents/CHANGELOG.md` + KB entries are required by standing RULE 3 and are
expected to conflict across lanes; late-merge on top, keep all entries.

## WAVE CONTEXT (S88-1) — your fence
Three other lanes run in parallel. **Yours:**
`api/cwf/_lib/backends/**` (new files + surgical edits), one NEW migration,
`shared/**` ONLY if a new table's persistence class must be declared (see
ADR-014 below), your own tests. **NOT yours:** `api/cwf/_lib/replay/**`,
`src/components/admin/**`, `api/cwf/_lib/synthTraffic/**`,
`api/cwf/_lib/routing/irFrame.ts`. Report `git diff --name-only` verbatim.

## ADR-014 IS NOW LAW (landed today, `d8e7688`)
`shared/dbConstants.ts` → `TABLE_PERSISTENCE_CLASS` is a TOTAL census of 49
tables with a closed 10-class vocabulary. **A new table without a declared
class fails CI in both directions.** Your census table therefore MUST be
classified in the same commit that creates it. Ruling: the census record is
`operational.mirror` — it is an OBSERVATION of a backend, and ADR-001 says an
observation is never authority; it is re-derivable by re-probing, so it does
NOT enter the learned snapshot.

## THE OWNER'S ALGORITHM (verbatim, binding — R1–R5)
**R1 — Connect-time behaviour census.** When a backend connects the system:
(a) reads each tool's DEFINITION (schema mirror — `catalogSync` already does
this), (b) **TRIES each tool one by one** (behaviour probe — does not exist
yet) and (c) produces a **verification record per tool**. Probes run on READ
tools only (ADR-011: all 44 write-annotated tools are structurally excluded)
and under a budget fence. Probe families are SCHEMA-DERIVED: no required
params → zero-arg · required array → **empty-array attempt** (live S87
lesson: for `getEmployeeShiftBetween` an empty array meant "all"; the
declaration said required while behaviour said otherwise — ADR-010 in the
field) · required identifier → a known specimen from the entity mirror
(adapt `entityDiscoverySync`'s fan-out pattern). The record captures:
observed call shape, response FIELD NAMES, sample shape, empty/error
behaviour.
**R2 — Runtime positive-experience ledger.** Successful use of a tool by the
WEAK model in production turns is recorded per tool; a tool WITHOUT positive
experience is never held at the same status as one with it — it stays
distinguishable.
**R3 — Cron re-discovery + FRESH flag.** Discovery is not one-shot: a
periodic cron re-runs the census. Rule: **every tool without positive
experience is marked "fresh" and RE-PROBED** — a first probe's failure is
not a permanent verdict.
**R4 — Backend evolution is caught.** The provider may add a NEW API or fix a
BROKEN one. The cron diffs the mirror against the live definition set: new
tool → full probe; changed schema → re-probe; previously-failed tool → already
in the fresh cycle by R3. A fixed API rises to "works" by itself — nobody
touches anything by hand.
**R5 — Output is consumed AUTOMATICALLY; zero hand rules.** The census record
flows to EVERY model through the existing ToolDoc composition channel
(`[ToolDoc] composed=N mode=append` — the seam is live today). When a new
backend is connected tomorrow, the user's only action is to connect it;
entering a hint/rule/category word is a VIOLATION of this design.

## SCOPE OF **THIS** PHASE (1A) — the probe engine + the record
This item is too large for one phase. **1A ships R1 + the record + R5's
write-side, and NOTHING else.** R2 (ledger), R3 (cron/fresh), R4 (evolution
diff) are phase 1B, already named. Do not build them; do not stub them in a
way that implies they exist. If 1B's absence makes a 1A surface dishonest,
say so in the report rather than papering over it.

1. **Probe planner (pure, no I/O):** given a tool's declared schema, emit the
   ordered probe family per R1. Read-only selection is ADR-011-derived from
   the SAME annotation source `catalogSync` reads — **not a hand list of tool
   names** (ADR-009: zero tenant literals; a tool name in your source is a
   defect). Budget fence: max probes per run, max total calls, hard stop.
2. **Probe runner:** executes planned probes through the existing MCP call
   seam. Every outcome is one of THREE states — `ok` / `error` / `unread`
   (transport failed, budget exhausted, skipped) — never two.
   MEASURE-READ-HONESTY-1: "no data" and "could not read" are different
   verdicts, and `empty ≠ zero` (an empty array result is DATA, and is
   precisely the S87 finding the census exists to catch).
3. **The record + migration:** one new table for the per-tool verification
   record (observed call shape, response field names, sample shape,
   empty/error behaviour, probe family, timestamp, backend id). Backend
   identity is DATA (a row, never an enum). Persistence class declared in the
   same commit. Grants: revoke from `public`, `anon` AND `authenticated`
   explicitly; add a `verifyGrants` probe row + CI coverage test.
4. **R5 write-side:** the record composes into the existing ToolDoc channel.
   Behaviour change must be OFF by default behind a governed flag, so this
   merge changes no production prompt until the owner turns it on. State the
   flag name in the report.
5. **S87 birth cases (BINDING):** the phase's own probe MUST re-derive, by
   probing and not by hand, (i) the empty-array-means-all behaviour of a
   required-array read tool, and (ii) response field names for a tool whose
   declaration under-describes them. If the live backend cannot be reached
   from your lane, build the probe against a recorded fixture of that shape
   AND say plainly in the report that the live re-derivation is owed as the
   named post-merge proof read (S63-1).

## BIRTH PROOF (S93-1)
Every gate seen to fail before trusted, both directions: (a) a write-annotated
tool reaching the probe planner → RED; (b) budget exhaustion → recorded as
`unread`, never as `ok` or as a zero; (c) an empty-array success recorded as
DATA, not as failure; (d) S66-1 positive control: clean run prints
`tools=<n> probed=<p> ok=<a> error=<b> unread=<c>` and the counts sum.

## REPORT MUST CONTAIN
The R1–R5 coverage table stating explicitly what 1A ships and what 1B owes ·
probe-family derivation table · the record schema + its persistence class ·
grant proof · birth-proof transcripts · full diff name-list · computed test
deltas · drift output · `>> BLOCK: AG-1 <<` with head SHA.

## DO-NOT
No hand-written tool/backend names anywhere in source · no reseal during build
· no touching other lanes' fences · no Vercel CLI in clones · no Operator
instructions from your lane (the Architect authors the apply relay) · absolute
paths in scratch writes.

<!-- END · PHASE-TOOL-BEHAVIOR-CENSUS-1A-v1 -->
