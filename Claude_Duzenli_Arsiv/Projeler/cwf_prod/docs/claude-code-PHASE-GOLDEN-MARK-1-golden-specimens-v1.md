# PHASE GOLDEN-MARK-1 — Golden-Specimen Marking Store (side table + curate capability + wiring) · v1

<!-- claude-code-PHASE-GOLDEN-MARK-1-golden-specimens-v1 · rev 1 · 2026-07-10
     Author lane: AG (Claude Code). Design authority: cwf-golden-mark-1-design-v1 (owner-approved).
     Base: origin/master 6a8bce3 (verified floor 1701 tests / 165 files / docVersion rev 59 / drift [OK]).
     Two-door phase: the migration is AUTHORED here, Operator-applied later — do NOT db push. -->

## 0. HARD PRE-FLIGHT (abort on any mismatch — report, do not "fix")

```bash
git fetch origin && git rev-parse origin/master   # MUST print 6a8bce348eb72f240f8998928f62ac2e46d78621
git status --porcelain                             # MUST be empty
npm ci --no-audit --no-fund --silent
npx vitest run --reporter=dot 2>&1 | tail -5       # MUST report 1701 passed / 165 files
npm run check:doc-drift 2>&1 | tail -2             # MUST be [OK]
```
Branch: `git checkout -b feat/golden-mark-1`.

## 1. CONTEXT (read, do not restate)

The L2 §2.7 STOP fired correctly: golden marking needs DDL, `messages` is server-write-only
conversation truth (C1), and `listGoldenSpecimens()` returns `[]` by design (`goldenRun.ts:44`).
This phase ships the marking store as a SIDE TABLE — **zero writes to `messages`, ever** — a
super-admin-only curate capability, the gated endpoint, and the reader wiring. The L2 publish
contract already branches on the set: wiring the reader IS the Layer-2 flip (no contract change).

## 2. CONSTRAINTS (violations = phase failure)

- **C1 ABSOLUTE:** no INSERT/UPDATE/DELETE against `public.messages` anywhere in this diff —
  not in the migration, not in any code path. The side table is the ONLY write surface.
- **FROZEN (byte-identical):** `api/admin/replay.ts` (the parked authorityDiff TD does NOT
  activate — this phase must not open the file) · `api/cwf/_lib/turn/*` · evalGate engine ·
  `promptFloor.ts` · `goldenPublishContract.ts` (the flip is by construction — if you believe
  it needs a change, STOP and report) · `pairedReplay.ts` · `runExperiment.ts` ·
  `redaction.ts`. `goldenRun.ts` opens ONLY for `listGoldenSpecimens()` + its docblock.
- **Two-door:** author `supabase/migrations/20260710120000_golden_specimens.sql`; NEVER apply
  it (no `supabase db push`, no `apply_migration`). Every doc/seal reference states
  **"authored, Operator-pending"** — never pre-declares "applied".
- **No SQL functions, no SECURITY DEFINER** — plain table ops via the service client only.
  (S30-1 note: the EXECUTE-lockdown pattern therefore has NOTHING to lock here; state that
  explicitly in the migration comment rather than cargo-culting a revoke block. The
  `migrationFnLockdown.test.ts` corpus scan must stay green over the new file.)
- Capability-not-role at every gate. Merges `--no-ff`; squash banned. Coverage floor ratchets
  up only. Deviations: STOP or disclose — never silently adapt.

## 3. GATED SUB-PHASES

### G1 — Migration (authored, Operator-pending) + constants

`supabase/migrations/20260710120000_golden_specimens.sql` — model the header/comment/RLS
discipline on the family's LATEST table migration, `20260709180000_backend_trust_audit.sql`
(S30-1):

```sql
create table public.golden_specimens (
    message_id  uuid        primary key references public.messages (id) on delete cascade,
    marked_by   uuid        not null references auth.users (id),
    marked_at   timestamptz not null default now(),
    revoked_by  uuid        references auth.users (id),
    revoked_at  timestamptz,
    note        text
);
alter table public.golden_specimens enable row level security;
-- deliberately ZERO policies: anon/authenticated fully denied; service-role only.
```

Comments must state: curation metadata, never conversation content · mark=INSERT,
unmark=revoke-UPDATE, DELETE never used by the app (cascade exists only for message
hard-deletes) · re-mark clears the revoke pair · C1: this table exists so `messages` never
gains a curation write path. Add `GOLDEN_SPECIMENS: 'golden_specimens'` to `DB_TABLES`
(`shared/dbConstants.ts`).

### G2 — verifyGrants probes IN-PHASE

`scripts/verifyGrants.ts` PROBES gains (harmless column, no-match filter — the registry's
established shape at `verifyGrants.ts:33`):

```ts
// GOLDEN-MARK-1: the golden-specimen curation ledger (service-role only; RLS on / 0 policies).
[DB_TABLES.GOLDEN_SPECIMENS]: { set: { note: '__p__' }, fcol: 'message_id', fval: NO_UUID },
```

The probes coverage test (`verifyGrantsProbes.test.ts`) must pass with the new row — if its
SSOT scan needs the table registered anywhere else, follow the existing mechanism, never
exempt. `SERVICE_ROLE_ONLY_FUNCTIONS` untouched (no new functions).

### G3 — Capability

`shared/permissions.ts`: add `GOLDEN_CURATE: 'golden:curate'` beside `TRUST_MANAGE`
(`permissions.ts:110`) with a docblock in the same voice: golden-set membership changes what
GATES a prompt publish (≥1 specimen ⇒ Layer 2 MANDATORY) — a governance-tier write on the
promotion tier; **super_admin ONLY** (the TRUST_MANAGE/QUOTA_MANAGE precedent), lands in
ALL_PERMISSIONS via the super derivation, NOT added to MAKER_PERMISSIONS. Matrix honesty:
whatever surface renders the permission matrix must reflect it.

### G4 — Repository + gated endpoint (new file — the prompt-golden.ts precedent)

- `GoldenSpecimensRepository` (home beside the existing admin repositories): `mark(messageId,
  userId, note?)` — insert; row exists revoked ⇒ clear revoke pair + refresh marked_by/at;
  row exists active ⇒ idempotent success · `unmark(messageId, userId)` — set revoked_by/at;
  absent row ⇒ honest not-found; already revoked ⇒ idempotent success · `listActive()` —
  `revoked_at is null` message_ids + curation metadata.
- `api/admin/golden-specimens.ts` (`api/admin/replay.ts` is FROZEN — capability moves to a
  new file, the prompt-golden.ts precedent): `authed → ensurePermission(GOLDEN_CURATE)`.
  `GET` → active list JOINED with specimen metadata (reuse the `recordedTurn.ts` mapping —
  titles/preview pattern at `recordedTurn.ts:317-352` — never raw payloads). `POST
  { action: 'mark'|'unmark', messageId, note? }`. **Mark precondition at the door:** the
  message must satisfy the EXACT replayability predicate (`role='assistant'`, non-null
  non-empty `raw_tool_results`) — REUSE the recordedTurn check (export/share it if needed,
  do not duplicate the predicate); refusal is a 422 with an honest reason.
- **Zero secret/content leakage:** responses carry ids, titles, previews (the existing
  bounded preview), curation metadata — never `raw_tool_results`.

### G5 — Wire the reader + UI affordance

- `goldenRun.ts:44` `listGoldenSpecimens()`: service-client read of active rows (missing
  client ⇒ `ReplayUnavailableError`, the file family's posture; DB error ⇒ throw LOUD —
  never a silent `[]`; genuinely empty set ⇒ `[]` = the contract's loud `goldenSet:absent`
  arm, unchanged). Defensive re-filter for replayability at read; a specimen that lost its
  raw payload is EXCLUDED and surfaced in the run digest as skipped — never silent. Update
  the file's STOP docblock: resolved by GOLDEN-MARK-1, table authored Operator-pending.
- ReplayTab specimen picker: capability-gated mark/unmark affordance + a golden filter chip
  (follow the tab's existing permission-gating pattern; hidden entirely without the cap).
  RULE 26: nothing clips at 1280/1024 — rendered evidence for the new affordance.

### G6 — Docs + reseal

CHANGELOG + SKILL-KB + drifted narrative tabs note-appended as the repo's reseal flow
requires · docVersion **rev 59 → 60** · migration references say "authored, Operator-pending".

### G7 — Self-verify (evidence is literal, paste outputs)

1. Full suite green — report exact NEW totals (baseline 1701/165).
2. **C1 grep proof:** `git diff 6a8bce3..HEAD | grep -n "MESSAGES"` output pasted + an explicit
   statement that no `.insert(`/`.update(`/`.delete(` targets `DB_TABLES.MESSAGES` anywhere in
   the diff (show the grep you ran).
3. Scoped diff over every FROZEN path — MUST be empty; paste the command + empty output.
4. Probes coverage test green with the new row; `migrationFnLockdown` corpus scan green.
5. Drift `[OK]` after reseal; migration file present and NOT applied (state it).
6. RULE 26 rendered evidence for the ReplayTab affordance at 1280/1024.

## 4. MERGE (S30-2 — use this message VERBATIM)

```
Merge feat/golden-mark-1: GOLDEN-MARK-1 — golden-specimen marking store (SIDE TABLE golden_specimens [PK=message_id, mark=INSERT / unmark=revoke-UPDATE never DELETE, full curation history on the row; RLS on / ZERO policies / service-role only; AUTHORED, Operator-pending — C1: messages gains NO curation write path, zero messages writes in this diff] + GOLDEN_CURATE capability [super_admin ONLY — golden-set membership gates prompt publishes, the TRUST_MANAGE tier] + gated api/admin/golden-specimens.ts [replay.ts frozen — the prompt-golden.ts precedent; mark refuses non-replayable specimens at the door via the shared recordedTurn predicate] + listGoldenSpecimens() wired [active rows, loud on DB error, defensive replayability re-filter with skipped-specimen digest visibility; goldenSet:absent loud-skip arm unchanged — first Operator-applied mark flips Layer 2 to MANDATORY by construction, publish contract byte-untouched] + verifyGrants probe row IN-PHASE + ReplayTab curate affordance [capability-gated, RULE 26 verified]; no SQL functions; rev 59→60 reseal)
```

`--no-ff` merge to master, push, report `git rev-parse origin/master` (RULE 25).

## 5. REPORT FORMAT

Base/HEAD hashes · per-gate literal evidence (G7 list) · new test/file counts · every
deviation disclosed with rationale · explicit "migration authored, NOT applied" line ·
the remote hash.

<!-- END · claude-code-PHASE-GOLDEN-MARK-1-golden-specimens-v1 · rev 1 · 2026-07-10 -->
