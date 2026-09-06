# CWF-S129-AUTHORITY-CONFORMANCE-INVESTIGATION-1

The owner ruled, 2026-09-03: investigate the seven authority-conformance disagreements BEFORE
refreshing the snapshot or landing anything behind the expired freshness gate. This is that
investigation. Every claim below was re-measured against PRIMARY source — the live DB constraints,
the migration files, and the module code — not read from the derived conformance document (TOTAL-45:
a rendered report is a claim, not the world).

## WHAT THE GATE ACTUALLY IS, MEASURED

The repo-wide landing blocker and the seven disagreements are TWO DIFFERENT THINGS, and conflating
them would misdirect the whole investigation:

- THE BLOCKER is FRESHNESS. `build (24.x)` fails three `authorityMatrix.test.ts` assertions because
  the snapshot's own `P7D` bound expired 2026-09-02 (taken 2026-08-26T03:24:51Z). MEASURED:
  `authority-live.snapshot.json` stamp `measuredAt 2026-08-26T03:24:51Z`, `freshnessBound P7D`. A
  refresh resets that clock and unblocks the build.
- THE SEVEN DISAGREEMENTS are REPORTED, NOT GATED. The conformance doc says so in its own words:
  "every disagreement listed here already exists everywhere. Gating on it would block the only
  source that says how to close it." They do NOT fail the build. A refresh does NOT close them and
  does NOT hide them — a fresh snapshot over the same structural code still reports the same seven.

So the owner's "investigate first" is not a precondition for unblocking the build; it is a decision
to understand the seven as real work before re-stamping the world that contains them. Correct: a
re-stamp with no understanding is how seven known gaps become seven forgotten ones.

## THE SEVEN, VERIFIED AND GROUPED

### GROUP 1 — A REPRODUCIBILITY BREACH. One item. Closable alone. HIGHEST severity.

**#6 REPLY-AUTHORITY-DRIFT.** MEASURED at 2026-09-03T14:2xZ.
  LIVE (pg_constraint): `relay_inbox_reply_authority` =
    `CHECK ((direction = 'to_lane') OR (lane_addr = ANY (ARRAY['operator','scout'])))`
  MIGRATION (supabase/migrations/20260813110000_relay_inbox.sql:141):
    `check (direction = 'to_lane' or lane_addr = 'operator')`
  No later migration adds `scout` to THIS constraint.

The live bus admits `scout` as a report author; no migration declares it. The database running in
production cannot be rebuilt from the repository's migrations — the exact DERIVED-NEVER-SOURCE
failure the constitution names. This is NOT part of the authority-model redesign; it is a plain
defect on a sibling constraint. Its twin was ALREADY fixed: `20260824210000_relay_inbox_lane_addr_drift.sql`
reconciled the `lane_addr` CHECK when live had `AG-5,scout` and the migration did not. The SAME
class on `reply_authority` was left unfixed. One reconciling migration closes it, and it depends on
no design decision. THE CATCH: it needs the Operator (`supabase db push`) — an AG authors the
migration, the Operator applies it. This is the first work that genuinely needs Gemini this session.

### GROUP 2 — TWO ROSTERS FOR ONE FACT. Two items. MEDIUM. Partly a matrix error, not a code error.

**#1 SHAPE-DECIDES-CLAIMABILITY-NOT-ROLE** and **#3 CLAIMABILITY-DISAGREES (scout).**
MEASURED: `scripts/laneRoster.mjs:48` — `export const LANE_ADDR = /^AG-[0-9]+$/`, the claimability
shape, IDENTICAL to the producer shape, so claim time has no role axis. Lines 52-53 state, as
deliberate design: `scout` and `operator` "receive cards and therefore HAVE boxes; neither is
claimable and neither ever will be." The file's own header (lines 10-20) documents that `LANES` was
copied from the DB constraint once and drifted — the constraint grew `AG-5`, the copy did not, and
`mail-wait AG-5 --once` exited 2 while the constraint called AG-5 claimable. "Two rosters for one
fact, disagreeing, each confident."

HERE THE MATRIX MAY BE THE WRONG SIDE. The matrix EXPECTS scout claimable; laneRoster says scout is
deliberately, permanently NOT claimable. Before any code changes, the owner decides which is right:
is scout a claimable role (fix the code) or a box-only non-claimant (fix the matrix)? The evidence
leans toward the code — scout has never claimed an address this entire session and works fine
without one — but that is a design call, not a measurement.

### GROUP 3 — THE ORDINAL-VS-MATRIX AUTHORITY MODEL. Four items. LARGE. OWNER-RESERVED (ADF-ARCHITECTURE-v2).

**#2 ROLE-SHAPE-UNSATISFIED (foreman).** No live address matches `^UB-[0-9]+$`; the foreman role
has no address of its own shape.
**#4 ROLE-BINDING-IS-A-CODE-LITERAL.** MEASURED: `scripts/factoryState.mjs` binds the foreman to
`AG-5` by string literal (`FACTORY_ADDRESSES` array line 82; `laneNonce('AG-5')` in the setMode
path). Its own comment (595-603) names the gap: setMode is "the foreman's by CONVENTION" today, and
would be "the foreman's by INVARIANT" only once the binding is real.
**#5 BUS-ADMITS-AN-AUTHOR-THE-VERB-REFUSES.** The `reply_authority` constraint admits operator and
scout as authors; `factory_assert_nonce` refuses them (they hold no address, store no nonce). Two
things both called "the rule" disagree. It does not bite today because report-posting does not call
the nonce verb — but it is the same incoherence at the constraint layer that Group 3 is at the code
layer.
**#7 BOOT-PROSE-BINDS-ROLE-TO-ORDINAL.** `.claude/boot/foreman.md` line 1: "FOREMAN-BOOT-v1 — boot
for the foreman lane (AG-5". The boot teaches the AG-ordinal convention the matrix is meant to
replace.

These four are ONE thing: the intended authority model — roles bound to address SHAPES, foreman at
`UB-`, claimability by ROLE — is not built. The factory runs on ordinals and literals. This is
exactly the `ADF-ARCHITECTURE-v2` landing the S129 bootstrap reserves as GATE-1 item ③, whose H2
direction — is the binding law a DETERMINISTIC SET or VECTOR RETRIEVAL — is explicitly OPEN and
owner-reserved. The Architect does not decide it, and this investigation does not pre-empt it.

## WHY THE FOREMAN WORKING TODAY IS NOT EVIDENCE THE MODEL IS FINE

AG-5 is claiming and holding the foreman address and merging RIGHT NOW, correctly. That works
BECAUSE of the very defects above: the foreman borrows the AG-5 producer address (there is no UB-
one), the binding is a literal everyone happens to honour, and claimability by shape lets an AG
window take it. The factory runs on convention where it should run on invariant. It works until two
windows race for AG-5, or a producer claims it by mistake — neither of which the shape check can
refuse, because AG-5 is a producer shape.

## THE SINGLE RECOMMENDED SEQUENCE (S112-YASA-1: one path, and the decisions that are the owner's)

1. **CLOSE #6 NOW, independent of everything.** It is a live-versus-source breach, one migration,
   no design content. An AG authors the reconciling migration (`reply_authority` = operator+scout,
   matching live and the already-landed lane_addr precedent); the Operator applies it. This is the
   session's first genuine Operator task.
2. **RULE ON GROUP 2.** One owner decision — is scout claimable? — then a single card makes
   laneRoster and the DB constraint read from one source, and corrects whichever of the two the
   ruling says is wrong.
3. **SEQUENCE GROUP 3 AS ADF-ARCHITECTURE-v2, NOT NOW.** It is the reserved redesign with an open
   H2 direction. It should land deliberately, with the owner's H2 ratification, not be improvised
   under landing pressure. Until it lands, the foreman-by-convention keeps working and the risk
   above is NAMED, not hidden.
4. **THE SNAPSHOT REFRESH IS ORTHOGONAL.** It resets the freshness clock and unblocks `build (24.x)`
   for the whole repo; it neither closes nor blesses the seven. Whether to refresh now (to let #488
   and other work land while Groups 2-3 proceed) or hold it is a separate owner call — the seven do
   not require it to stay red.

## A DESIGN OBSERVATION, NAMED NOT DECIDED

A freshness gate with a `P7D` bound on a REQUIRED CI context guarantees a repo-wide landing block
every seven days, on the calendar, regardless of the diff. That is the born-barking class this
project has ruled worse than silence, one layer up in CI rather than in a card. Whether the bound
should be longer, or the freshness check demoted from required-context to warning, is worth a
decision — but it is a design change under S37-1 and it is the owner's, not this investigation's.

TAIL ANCHOR: CWF-S129-AUTHORITY-CONFORMANCE-INVESTIGATION-1 ends here.
