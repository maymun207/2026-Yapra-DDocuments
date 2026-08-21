# PHASE-M1F1-FEEDBACK-PRODUCER-1 · v1
<!-- PHASE-M1F1-FEEDBACK-PRODUCER-1-v1 · 2026-08-02 · S78 · Architect: Claude.
     Master rollout plan item 1.2 (MEASURE-1 Phase F1 — the producer).
     Governing design: cwf-measure-1-design-note-v1 (OWNER-RATIFIED S78) —
     its F1 section is embedded below in full per D-2; no external reads
     needed. Lane: AG. ONE migration authored, NOT applied (ADR-005 —
     Operator lane follows the merge). Zero publishes, zero governed writes
     from this phase itself. -->

## PRECONDITION (S47-1)
`git rev-parse origin/master` must print
`af2d194edd30d68867c625d3faa564a872633366` (M1P0 merge — verified live by
the Architect this session, prod dpl_AXk6crqx49WJ7bRAsjC9VeBmC32L READY on
this sha). If not, STOP and report.

## EMBEDDED SPEC (design note §2, ratified — binding)
ONE table `turn_feedback`: trace_id (joins messages.trace_id — the ONE
turn id, RULE-28; NEVER mint a second id), conversation_id, user_id,
verdict up|down, optional bounded reason_text, created/updated timestamps,
UNIQUE(user_id, trace_id) with latest-wins upsert (a user may change their
mind). RLS: a user inserts/updates/reads OWN rows only; admin reads via
service role. Chat UI: 👍/👎 on assistant messages; 👎 opens an optional
reason field. ZERO reads from the turn pipeline — structurally enforced.
Three hard rulings apply: feedback is never a prompt input, never a
knowledge source, never a viz data source.

## ARCHITECT-COMPUTED PREMISES (fresh clone this session — your §0 re-verifies)
- `messages.trace_id` exists (migration 20260705140000_messages_trace_id) —
  its exact column TYPE is read from the migration bytes in your G0 and the
  new table's trace_id MUST match it byte-for-type.
- Zero existing `turn_feedback`/thumbs code anywhere (grep clean).
- Baseline: 417 test files / 4648 tests · 64 migrations · docVersion rev 178.

## BINDING CONSTRAINTS
1. **Migration (ONE file):** table + UNIQUE + CHECK (verdict in
   ('up','down'); reason_text length ≤ 2000) + RLS policies (owner-scoped
   insert/update/select; REVOKE from public, anon AND authenticated
   explicitly for anything beyond the owner policies — the all-grantees
   pattern) + a verifyGrants probe row + CI coverage test (standing security
   rule: every new owner-CRUD table gets both). Idempotence proven by
   double-apply on a disposable postgres:16. NOT applied — db push is the
   Operator's (ADR-005).
2. **Repository + endpoint:** feedback repository in the persistence layer;
   ONE endpoint for upsert (auth-bound; user identity from the session,
   never from the payload). Counts, if any, go through exactCountOrThrow
   (the M1P0 guard — no new `count ?? 0` may be born in this phase).
3. **Chat UI:** 👍/👎 on assistant messages; 👎 reveals an optional bounded
   reason input; upsert on click with visible state (selected/changed);
   no page reload; i18n via the existing t() convention (TR/EN).
4. **STRUCTURAL LAW, test-pinned both directions (D-5):** a test proving no
   file under the turn pipeline (api/cwf/_lib/turn/**, prompt/**) imports
   the feedback repository — POSITIVE control: the test must demonstrably
   fail when such an import is introduced in a fixture; INNOCENT case:
   admin/UI/endpoint imports are allowed and not flagged.
5. No telemetry lane, no aggregates, no dashboard in this phase — F2/F3
   territory. Scope discipline is part of the review.

## GATES
- **G0** — fresh FULL clone; precondition hash; paste: messages.trace_id
  type from migration bytes · grep proof of zero existing feedback code ·
  migration count 64.
- **G1** — migration + double-apply idempotence proof (paste both applies).
- **G2** — repository + endpoint + tests (RLS-shape unit tests; upsert
  latest-wins test; bounded-reason rejection test).
- **G3** — chat UI + the structural no-pipeline-import test (both
  directions per constraint 4).
- **G4** — full suite green (from 417/4648, growing); tsc clean; CHANGELOG
  + KB per RULE 3; reseal ONLY if a mapped file changed (check, not assume).
- **STOP-FOR-REVIEW** — push `phase/m1f1-feedback-producer-1`, NO merge.
  Report in ONE paste: G0 pastes · file list · migration filename · test
  deltas by name · suite totals · branch head sha.

## AFTER THE MERGE (sequence, for the record — not your steps)
Architect RULE-25 → GO+verbatim merge message → Operator apply prompt
(FENCE fjbrkimwvtpwoxhziidh) → live witness per S63-1: the owner clicks 👍
on one real production turn (hand-witness, D-4 class c) and the Architect
reads the row back.

TAIL ANCHOR (S61-3): this prompt ends at the line below.
— END · PHASE-M1F1-FEEDBACK-PRODUCER-1-v1 —
