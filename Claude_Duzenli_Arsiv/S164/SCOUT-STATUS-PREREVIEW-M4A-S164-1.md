PREREVIEW-VERDICT: RED (one small blocking delta, N1) branch=phase/m4a-memory-offered-overlap-s164-2 head=b6e347be1aba2f300bee3748dd3ac836aef82fd1 parent=c2a9eab76cf5eb538d49e4b11fe4b0f810339c1f
SCOUT-STATUS-PREREVIEW-M4A-S164-1 · scout-2 → Architect · reply_to ORDER-SCOUT-PREREVIEW-M4A-S164-1 (id acf274a6-8446-4a4f-8395-a558661455d8, md5 fa1cb0bb1bdd83db7ac9af2c7d369f24 DIGEST-OK)
The PR 645 backup order is already answered as LANDED-BY-SCOUT-1, merge 61e7f368604ffdd86b8841d9063e540641d42efc (bus 7b78503c-80b0-4c71-9e57-5bb01de645a1).

1 · BRANCH vs CURRENT MASTER. `git merge-tree --write-tree 61e7f368… b6e347be…` → CONFLICT in public/architecture/manifest.json ONLY (stages 1/2/3). No source conflict with K41. Reseal needed: YES. At PR time: `git merge origin/master` + `npm run reseal` in the same commit (the house remedy), or a fresh branch from the master of that moment.
Diff vs parent: 20 files, +1134/−33.

2 · MY DELTAS, each at the head:
Δ1 migration supabase/migrations/20260930050000_health_memory_daily.sql — GREEN.
- `language sql` · `security definer` · `set search_path = public`.
- Union denominator: `e.payload->>'kind' in ('turn_done', 'clarification_asked')`, one row per session_id, `min(day)` for a turn straddling midnight.
- The all-grantee `revoke execute … from public, anon, authenticated;` + `grant execute … to service_role;`, a `comment on function`, and `notify pgrst`.
- STATUS: OPERATOR-PENDING named in the header.
- Not-measured-is-not-zero: recorded_turns vs turns, and noData in buildMemorySeries.
Δ2 memoryOffered on clarification_asked — GREEN. stageClarify.ts (+7 at the `kind: 'clarification_asked'` emit, ≈:3246-3254) adds `memoryOffered: memoryOfferedForLedger(ctx), memoryOverlap: CLARIFICATION_OVERLAP` ({status:'unknown', reason:'no-answer'}).
Δ3 SSE carries no ids — GREEN. stageStream.ts done frame `memoryOffered: memoryOfferedForClient(ctx.memoryOffered)`. memoryOverlap.ts memoryOfferedForClient returns only {count, conversationCount, userCount, routineOffered?, dossierOffered?}, the pre-card shape. Ids and blocks go only to turn_done (memoryOfferedForLedger).
Δ5 fence — GREEN. The merge-base's own mergeGuard.mjs over the report: blocks 1 (line 173), entries 20, problems [], diff-not-fence [], fence-not-diff [].
Δ6 no threshold — GREEN. health-analytics.ts `band=memory` arm: `resolveHealthPolicy()` is used only for `minN` (marks a rate unqualified, the endpoint's existing rule). No health.* param was added (agentParams.ts / resolveHealthPolicy.ts untouched).
"used": ABSENT. Node scan of every ADDED line of the diff for /\bused\b|kullan/i → 0 hits.
Unavailable never 0 — GREEN, and I PROVED it:
- memoryOverlap.ts computeMemoryOverlap `offered === null → {status:'unknown', reason:'memory-unavailable'}`; memoryOfferedForLedger `count: null` + reason; SQL `available` only when `jsonb_typeof(count)='number'`.
- PLANTED in a SCRATCH copy (repository untouched): made the null branch return measured zeros → `M4A-4 · … › unavailable memory → UNKNOWN, never 0` RED ("expected { status: 'measured', …} to deeply equal { status: 'unknown', …}"). Reverted → 14/14 green.
Suites at the head (scratch tree): memoryOverlap, healthAnalytics, chatQuotaStream, memorySliceWiring, stageClarify, memoryTab, healthAnalyticsContract, migrationFnLockdown, verifyGrantsFnProbes → "Test Files 9 passed (9) · Tests 149 passed (149)".

3 · vectorLane/__tests__/admission.test.ts ×3 at the head (scratch, isolated): run 1 14/14 · run 2 14/14 · run 3 14/14.
TIMING-DEPENDENT BY CONSTRUCTION, not order-dependent. The fake encoder sleeps on REAL `setTimeout` (:25), and the assertions compare WALL-CLOCK `Date.now()` measurements with no fake timers:
- :73-99 "query latency under sustained index load matches its latency with none": loaded p50 ≤ idle.p50 + COST×3, max ≤ idle.max + COST×4
- :123-133 slow/fast ratio > 1.8
- :146-150 elapsed < 1000 ms
It is self-contained (no shared state seen), so it passes alone and can fail under CPU contention in a full parallel suite. Nothing in M4a touches vectorLane. It is not M4a's defect and not a reason to retry. Name it as its own follow-up (fake timers or a tolerance budget).

4 · scripts/verifyGrants.ts — YES, it needs health_memory_daily, and NO gate would catch its absence:
- SERVICE_ROLE_ONLY_FUNCTIONS (verifyGrants.ts:187) lists the four sibling health functions at :211-214; FN_EXECUTE_PROBES has them at :316-319 `{ p_from: NO_WINDOW, p_to: NO_WINDOW }`.
- The CI coverage test verifyGrantsFnProbes.test.ts:26-31 only checks probes set-equal to the SSOT, and migrationFnLockdown.test.ts:68 only iterates the SSOT. Neither reads migrations, so the function ships UNPROBED and CI stays green (both suites pass at the head today).
N1 (BLOCKING, paste-ready, carried by THIS card M4a since it ships the function; fence + scripts/verifyGrants.ts): add `'health_memory_daily',` to SERVICE_ROLE_ONLY_FUNCTIONS beside :214 and `health_memory_daily: { p_from: NO_WINDOW, p_to: NO_WINDOW },` to FN_EXECUTE_PROBES beside :319. Then migrationFnLockdown enforces the all-grantee revoke and the Operator's verifyGrants run probes anon → 42501.

5 · ADVISORY (not blocking; the Architect rules):
N2 overlap blindness. memoryOverlapFromCtx → computeMemoryOverlap returns `unknown / entity-resolutions-absent` for the WHOLE turn when ctx.entityResolutions is undefined. That stamp exists only when stage 03's resolution path ran (memoryDistill.ts P-A table: "dark router.frameRouting leaves it undefined"). The TOOL lens and the ROUTINE lens need no entity stamp, so every such turn loses a measurable tool overlap. Suggest: per-lens status (entity unknown, tool/routine measured), or name in the report that overlap is measured only on entity-resolved turns.
N3 the panel's gate: `band=memory` sits behind TELEMETRY_READ_ALL (the endpoint's gate) while MemoryTab is MEMORY_MANAGE. Both are super_admin today (shared/permissions.ts:254-259), so no visible gap; recorded for a future role split.

OPERATOR PROMPT (paste-ready; to run ONLY after M4a lands with N1; project fence fjbrkimwvtpwoxhziidh; DRY-RUN FIRST):
"Operator — apply ONE migration: supabase/migrations/20260930050000_health_memory_daily.sql (CARD-M4A, OPERATOR-PENDING).
 0. At the repo root on the master that contains it, confirm the linked project ref is fjbrkimwvtpwoxhziidh; if it is anything else, STOP.
 1. DRY RUN: `supabase db push --dry-run`. Expect EXACTLY ONE pending migration, 20260930050000_health_memory_daily. If any other migration is listed, STOP and report the list.
 2. APPLY: `supabase db push`. Quote the output.
 3. VERIFY (read-only):
   (a) `select has_function_privilege('anon', 'public.health_memory_daily(timestamptz,timestamptz)', 'execute'), has_function_privilege('authenticated', 'public.health_memory_daily(timestamptz,timestamptz)', 'execute'), has_function_privilege('service_role', 'public.health_memory_daily(timestamptz,timestamptz)', 'execute');` → false, false, true.
   (b) `select * from public.health_memory_daily(now() - interval '1 day', now());` as service_role → rows or zero rows, never an error.
   (c) `node --import tsx scripts/verifyGrants.ts` → the line `FN-EXEC anon health_memory_daily → 42501` (requires N1).
 4. Report the migration version as applied in supabase_migrations.schema_migrations and each of (a)-(c) verbatim. Never print a key or an environment value."
The CLI flags are the standard Supabase CLI ones; I did not run them here (no apply authority) — UNMEASURED against this machine's CLI version.

read relay_inbox at 2026-09-30T06:23:53Z (mail-wait exit 0) + --read of order acf274a6.
