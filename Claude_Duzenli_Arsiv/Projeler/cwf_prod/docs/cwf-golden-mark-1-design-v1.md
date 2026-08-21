# GOLDEN-MARK-1 — Golden-Specimen Marking Store · Design v1

<!-- cwf-golden-mark-1-design-v1 · rev 1 · 2026-07-10 · Architect-lane artifact (NOT for AG).
     Diagnosed at origin/master 6a8bce3 (verified floor: 1701 / 165 / rev 59 / drift [OK]).
     Origin: the L2 §2.7 STOP contingency (fired correctly — no DDL, no C1 hack);
     register v31 Q-L3-OPEN. This phase is the L3 EVAL-CI opener. -->

## 0. Committed decision (single path)

**A minimal SIDE TABLE (`golden_specimens`), never a column on `messages`.**

The column option fails on write-discipline grounds, not taste: `messages` is a
SERVER-WRITE-ONLY conversation-truth table with exactly ONE writer (the chat turn, at turn
time — 20260627170001 docblock). Golden marking is a post-hoc, revocable, admin-plane
CURATION act. A marker column would open an admin UPDATE path into the truth table — the same
category error the L2 STOP refused when it rejected a marker inside `raw_tool_results`, one
step removed. The `trace_id` precedent (20260705140000) does NOT license it: trace_id is
turn-produced, written by the same single writer at the same moment — curation state is
neither. C1 LAW stays absolute: **zero writes to `messages`, ever, from this phase.**

## 1. Diagnosis anchors (S30-3, HEAD `6a8bce3`)

| Anchor | Finding |
|---|---|
| `goldenRun.ts:19-28,44-47` | The STOP docblock + `listGoldenSpecimens()` returns `[]` by design — the ONE wiring point |
| `20260627170001_messages.sql` | messages = server-write-only truth; RLS select-own, NO client write policy; no metadata column |
| `20260705140000_messages_trace_id.sql` | the additive-column precedent — inapplicable (turn-produced vs post-hoc, §0) |
| `recordedTurn.ts:317-352` | `listReplayableSpecimens`: replayable = assistant role + non-null non-empty `raw_tool_results` — the marking precondition reuses this exact predicate |
| L2 publish contract (`goldenPublishContract.ts`) | `goldenSet:absent` loud-skip vs ≥1 specimen ⇒ Layer 2 MANDATORY — the flip is ALREADY coded; wiring the list IS the flip |

## 2. The table (forward migration, AG-authored → Operator-pending)

```sql
create table public.golden_specimens (
    message_id  uuid        primary key references public.messages (id) on delete cascade,
    marked_by   uuid        not null references auth.users (id),
    marked_at   timestamptz not null default now(),
    revoked_by  uuid        references auth.users (id),
    revoked_at  timestamptz,
    note        text
);
```

- **Mark = INSERT · unmark = revoke-UPDATE (set revoked_by/revoked_at) — never DELETE.**
  Audit-or-alarm satisfied by the row itself: full history survives; re-marking a revoked
  specimen clears the revoke fields (one row per message, PK-enforced — no duplicate-mark
  ambiguity, `listGoldenSpecimens` filters `revoked_at is null`).
- **RLS: enabled, ZERO policies** (deny-all to anon/authenticated — the backend_trust_audit
  posture). Service-role writes only, via the gated admin endpoint.
- **No SQL functions** — plain table ops through the service client. Probe registry impact:
  new table ⇒ **three verifyGrants table probes IN-PHASE** (anon select/insert/update deny,
  the standing rule) + coverage test rows. No SECURITY DEFINER anywhere.
- `note` is curation metadata (why this specimen is golden) — NEVER conversation content.

## 3. Capability + endpoint + UI

- **New capability `golden:curate`** (capability-not-role), granted to the super-admin bundle
  ONLY. Rationale: golden-set membership changes what GATES a publish (≥1 ⇒ Layer 2
  mandatory) — that is governance policy, the promotion-is-a-human-act tier, not sandbox
  (HC-2 parity intentionally N/A, same class as the ratified no-authority-drafts decision).
- **Endpoint**: extend the existing gated admin replay surface with mark/unmark/list ops
  (new file if `api/admin/replay.ts` is still frozen — the prompt-golden.ts precedent: the
  freeze wins, capability moves to a new file, e.g. `api/admin/golden-specimens.ts`).
  Mark validates the precondition FIRST: the message exists, `role='assistant'`,
  non-empty `raw_tool_results` (the `recordedTurn.ts:317` predicate, shared not duplicated) —
  a non-replayable golden specimen is a contradiction and is refused at the door.
- **Wire `listGoldenSpecimens()`** (`goldenRun.ts:44`): `select message_id where revoked_at
  is null`, defensively re-filtered for replayability at read (belt and braces; a specimen
  whose message lost its raw payload is skipped LOUDLY in the run digest, never silently).
- **UI**: the existing specimen picker (ReplayTab specimen-first surface) gains a
  capability-gated mark/unmark affordance + a golden filter chip. Zero new panel.

## 4. Flip semantics (no code change — by construction)

The L2 publish contract already branches on the set: wiring the reader makes the first
owner-marked specimen flip Layer 2 from `goldenSet:absent` loud-skip to MANDATORY
automatically. The ~20-specimen curation stays OWNER-OWNED (register §3) and becomes
actionable the moment this phase's DOC-FLIP lands.

## 5. Two-door + sequencing

AG build (table migration AUTHORED + endpoint + wiring + probes + tests + rev 59→60 reseal)
→ RULE-25 review → Operator `db push` with FENCE-first prompt + literal-read G-gates +
schema-read confirm + first-exercise probe run (37+ expected) → DOC-FLIP. Migration seal text:
"authored, Operator-pending" until the flip.

## 6. Non-goals

Any write to `messages` · golden auto-selection heuristics (curation is human) · retention
sweep · N-rep/threshold tuning (that is L3 EVAL-CI proper) · specimen EDITING of any kind.

<!-- END · cwf-golden-mark-1-design-v1 · rev 1 · 2026-07-10 -->
