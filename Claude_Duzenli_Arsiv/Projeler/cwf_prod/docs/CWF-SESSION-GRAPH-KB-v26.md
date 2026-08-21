# CWF — Session Graph KB · v26
<!-- rev 26 · 2026-07-07 · Supersedes v25. Ground truth = repo CHANGELOG at master HEAD `84f4601`.
     This window: SHIPPED + fully closed B / REPLAY-QUOTA-1 (per-user replay-run token quota, atomic
     reserve-clamp-settle) through a two-fix security saga — FIX-1 (revoke EXECUTE from PUBLIC) was insufficient,
     the Operator's LIVE read caught it, FIX-2 (revoke from public+anon+authenticated) closed it, doc-flip
     verified. Then fixed a verifyGrants false-green (its documented vite-node command silently no-op'd).
     master HEAD `84f4601` (1209/118, rev 51, drift OK). Queue: cwf-open-items-register-v26.md. -->

## §0 One-paragraph state
This window shipped the FOURTH sandbox-vs-global-adjacent phase (a cost gate, not RBAC) and closed it fully.
**B / REPLAY-QUOTA-1** — a per-user MONTHLY replay-run token quota enforced by an **atomic reserve-clamp-settle**
at the `/api/admin/replay` POST seam — went code→merged (`b6bd150`, rev 51, 1144→1205), then through a **two-fix
migration-security saga** (the enforcement RPCs are `SECURITY DEFINER`, so their EXECUTE grant is the sole gate;
locking them to service-role-only took two tries because Supabase's `pg_default_acl` grants EXECUTE to
anon/authenticated BY NAME, not only via PUBLIC), and finally **Operator-applied + live grant-verified**
(`57039c4`). A separate tooling fix (`84f4601`) closed a verifyGrants false-green: its own documented
`npx vite-node` command silently ran ZERO probes. All RULE-25 fresh-clone verified, including two independent
full-suite re-runs (1205/117, then 1209/118). B is fully closed; **next = C (User Docs) + the standing textbook
explainer**.

## §1 The governing principle (unchanged, locked)
Developer plays with EVERYTHING in their own sandbox; the ONLY gated line is GLOBAL (publish/commit) =
super_admin; promotion is a human act; CORE kind structure is code-Zod-locked for everyone. Sequence: A ✅ →
A2 ✅ → A3 ✅ → **B ✅ (cost gate; QUOTA_MANAGE super-only, an ADD gate on the checker-only `replay:run`)** → C,
scope/authority lens deferred below.

## §2 What shipped (fresh-clone RULE-25 verified)
**B / REPLAY-QUOTA-1** (`b6bd150` rev 51; + FIX-1 `a639828` + FIX-2 `537c8d5` + doc-flip `57039c4`):
- **Enforcement = atomic reserve-clamp-settle.** POST seam, after `ensurePermission(replay:run)` + validation,
  for BOTH branches: `reserve(userId, REPLAY_TOKEN_BUDGET)` → `!allowed` returns **429** (NO run, NO audit); the
  run is CLAMPED to `gate.reserved` (engine `tokenBudget?` → `min(budget, tokenBudget ?? Infinity)`, absent ⇒
  byte-identical); at settle `actual = isPersonalProviderId(resolvedId) ? 0 : <run total>` (personal → 0, still
  audited); a thrown run refunds (`settle(...,0)`) BEFORE the unchanged error-audit.
- **The atomic core is in SQL, not JS.** `replay_quota_reserve` (plpgsql, `SECURITY DEFINER`, **FOR UPDATE** row
  lock → a concurrent joint-exceeding pair yields exactly one allowed; lazy-create → period roll →
  `reserved=least(ceiling,remaining)` → deny below `min_run`) + `replay_quota_settle` (`greatest(0, consumed −
  reserved + actual)`). `quotaMath.ts` is the PURE decision spec the SQL mirrors 1:1 — and its docstring is
  HONEST that the JS "race" test MODELS the DB's serialized execution (it does not prove DB atomicity; the real
  atomicity is the FOR UPDATE, verified by inspection + the Operator's live function read).
- **`user_quotas` service-role-ONLY** (RLS-on, NO policy, REVOKE all — the mcp_secrets posture; `consumed_tokens`
  never client-mutable). `UserQuotasRepository` is fail-closed (no client / rpc error ⇒ DENIED — a spend gate
  never allows without the ledger). `QUOTA_MANAGE` super-only (not in MAKER). Endpoint counts-only + set-limit ≥
  budget footgun guard + reset, audited via `updated_by`.
- **Anti-drift root-cause fix.** verifyGrants `user_quotas` PROBES row + `verifyGrantsProbes.test.ts` (asserts
  every grant-classified table has a probe; `main()` entry-guarded so the CI import connects to nothing).
- Frozen safety artifacts byte-identical. Only `quota:manage` added. Full review PASS + independent re-run.

## §3 Key learnings (this window — the security saga)
- **Locking a SECURITY DEFINER function to service-role-only takes THREE revokes on Supabase.** A definer
  function BYPASSES RLS, so its EXECUTE grant is the SOLE gate. Postgres grants EXECUTE to PUBLIC by default AND
  Supabase's `pg_default_acl` grants EXECUTE to `anon`/`authenticated` **by name** at creation. So the correct
  lock is `REVOKE EXECUTE … FROM public, anon, authenticated` + `GRANT EXECUTE … TO service_role`. Revoking from
  PUBLIC alone (FIX-1) leaves the named grants; revoking from anon/authenticated alone (the original) leaves the
  PUBLIC grant. Either half is a live quota bypass: any authenticated user could
  `POST /rest/v1/rpc/replay_quota_settle {p_user_id:<self>, p_reserved:<own consumed>, p_actual:0}` to zero their
  quota. Empirically confirmed via the Operator's catalog read.
- **The two-gate LIVE read is what caught it — a migration is not closed on a table-only read.** The Architect
  flagged the risk at review (revoke-from-anon/authenticated ≠ locked); FIX-1 was issued; the Operator applied +
  **read the function EXECUTE grants** and found anon/authenticated still held EXECUTE. Standing rule now: any
  service-role-only FUNCTION migration's Operator confirmation MUST read the EXECUTE grants (anon/authenticated/
  PUBLIC → none; service_role → yes), not just the table's RLS/policies.
- **An applied migration is IMMUTABLE — corrections are forward migrations.** `20260707160000` was already
  applied (with FIX-1's insufficient lock), so FIX-2 was a NEW forward migration `20260707170000` — NOT an edit
  to the applied file. It is **revokes-only, no `create or replace`** (re-creating the functions would re-trigger
  `pg_default_acl` and re-grant EXECUTE to anon/authenticated).
- **The Architect owns its own reçete errors; gate on live reads before declaring "applied+verified."** FIX-1's
  "revoke from public replaces anon/authenticated" was half-right (I dropped the named revoke). AG's pushback +
  the Operator's live read corrected it. The two-gate discipline exists precisely so a wrong prescription is
  caught before "applied" is declared.
- **verifyGrants false-green: assert the REAL runtime signal, not a fabricated proxy.** The B-phase entry-guard
  (`import.meta.url === pathToFileURL(process.argv[1])`) silently no-op'd under the script's OWN documented
  command `npx vite-node scripts/verifyGrants.ts` — vite-node strips the script from `process.argv` (argv is just
  `[node, vite-node]`) and leaves `import.meta.main` undefined, so `main()` never ran → ZERO probes → a
  false-green in the grant-verify tool. Fixed with a **test-runtime guard** `shouldRunProbes(env) = !VITEST &&
  !JEST_WORKER_ID` (the only signal that survives every direct-run launcher; vitest sets VITEST → import stays
  side-effect-free — verified live). **Meta-lesson:** the argv-based fix I first prescribed would have PASSED a
  fabricated-argv unit test while the live command stayed broken — a false-green in the fix itself. The unit test
  now asserts the real env signals, and the Architect verified the live vite-node behavior directly.
- **Automate the class the human caught by hand.** The function-EXECUTE leak was caught only by the Operator's
  manual read; verifyGrants (table-UPDATE probes) couldn't. → new DEFERRED HARDEN-FN-PROBE-1 (an anon-rpc
  `settle(NO_UUID,0,0)` deny probe — no-error = LEAK).

## §4 Verified anchors + commit ledger
- master HEAD **`84f4601`** — 1209 tests / 118 files / docVersion **rev 51** / drift `[OK]`.
- From v25 close `09efc8e`: B code `62df338` → merge **`b6bd150`** (rev 51, 1144→1205) → FIX-1 **`a639828`** →
  FIX-2 **`537c8d5`** → doc-flip **`57039c4`** (Operator-applied + live grant-verified) → verifyGrants FIX
  **`84f4601`** (1205→1209).
- **B migrations APPLIED + live grant-verified** (Operator/Supabase MCP, project ref `fjbrkimwvtpwoxhziidh`):
  `user_quotas` (RLS true, 0 policies, 0 anon/authenticated DML) + FIX-2 EXECUTE lockdown (both RPCs →
  service_role/owner EXECUTE only). verifyGrants live 25/25.
- AWS unchanged: `i-030c2b4fadebfa229`, CloudFront, `cwf-prod`, eu-central-1; bootstrap key DEACTIVATED;
  `cwf-budget-stop` STANDBY. RULES current through RULE 29.

## §5 Open queue → cwf-open-items-register-v26.md
NEXT: **C — User Docs** (DOCUMENTS renderer; hosts the textbook explainer; design note first) · **Part A widen
SCOPE/AUTHORITY** · **Sayfa 3** (Langfuse selectable) · GOVERN polish · P7. DEFERRED: **HARDEN-FN-PROBE-1** (NEW —
verifyGrants function-EXECUTE anon-denied probe) · **HARDEN-GRANTS-1** (REVOKE REFERENCES/TRIGGER/TRUNCATE across
secret+owner-CRUD tables incl. user_quotas) · AWS-DENY-1 · Langfuse SSO · LM Studio / on-prem families · the
missing-interface governed connectors (Intent-LLM/LangGraph/Memory/RAG, invariant-bound). STANDING DELIVERABLE:
`cwf-governance-replay-explained-v1.md` (textbook, reps=3 Wilson-CI worked example) — produce with/before C.

<!-- END · CWF-SESSION-GRAPH-KB-v26 · rev 26 · 2026-07-07 -->
