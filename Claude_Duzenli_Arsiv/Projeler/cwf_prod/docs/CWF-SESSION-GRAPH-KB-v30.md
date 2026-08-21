# CWF — Session Graph KB · v30

<!-- CWF-SESSION-GRAPH-KB-v30 · rev 30 · 2026-07-10 · supersedes v29.
     Session 30 window record. Companion: cwf-open-items-register-v30.md (queue/closed),
     CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v30.md (resume). -->

## 1. What Session 30 shipped (spine)

`91170b7` (S29 close) → **`261c969`** Q-1 merge (chat-quota + usage-analytics; +113 tests) →
**`54d6f9c`** Q1-FIX-1 merge (all-grantees EXECUTE lockdown + migrationFnLockdown author-gate)
→ **`24cc1ef`** Q-1 DOC-FLIP (unsanitized incident history) → **`3eb887b`** TRUST-PANEL-1
merge (+58 tests) → [TRUST-PANEL-1 DOC-FLIP, docs-only, in flight at close].
Close metrics (verified floor): **1561 tests / 156 files / docVersion rev 57 / drift [OK]**.
DB (live-verified): user_chat_quotas + 5 fns (proacl `{postgres, service_role}` only) ·
3 published `quota.chat*` v1 rows (10000 / 5000000 / 200000) · backend_trust_audit (RLS on,
0 policies) · unified probes **36/36** · both ledgers 0 rows at close.

## 2. The Q-1 lockdown incident (the window's defining event)

Chain: Q-1 apply run 1 succeeded (schema+seed) → HARDEN-FN-PROBE-1 live gate FAILED 5/5 new
fns (4× NO-ERROR LEAK, 1× 23503 INCONCLUSIVE — reserve reached the body and hit the zero-UUID
FK) → Operator STOPPED per fence, reported verbatim. Root cause: **Architect spec regression**
— the phase prompt cited the lockdown from the ORIGINAL replay migration
(20260707160000:188-191, PUBLIC-only) instead of its FIX-2 (20260707170000, all-grantees),
while the standing rule sat in the very bootstrap read that morning. AG executed the spec
exactly (correct executor behavior); the Architect's review then green-lit compliance against
its own wrong spec (grep 5+5 matched). **The deterministic closing gate was the only layer
that could catch it — and did.** Fix: same-day revokes-only forward migration (re-creating the
fns would re-fire pg_default_acl and undo the revoke in the same file — the FIX-2 header
lesson, cited not re-learned) + `migrationFnLockdown.test.ts`: every SERVICE_ROLE_ONLY_FUNCTIONS
entry must have an all-grantees revoke somewhere in the migrations corpus; the NEGATIVE fixture
is the verbatim faulty Q-1 lines. Exposure: minutes; tamper-glance 0/0.
→ Standing rules born: **S30-1** (cite the family's LATEST fix migration) and the class is now
author-time-unshippable. HARDEN-GRANTS-1 (ALTER DEFAULT PRIVILEGES class-fix) stays deferred.

## 3. TRUST-PANEL-1 decisions that will be probed later

- **§2 owner-RATIFIED**: authority gets NO personal-draft tier ever (polarity-inverse: a grant
  SILENCES the detector; a per-user draft = a per-user lying microscope). Parity vehicle =
  A3 lens `{floor|live}` read-preview + MANDATORY pre-commit authorityDiff modal (cause-labeled,
  consequence-labeled buttons: "Silence detector"/"Re-arm detector") + reset-to-reference.
  The one deliberate R-B narrowing in the program — recorded as ratified, not drifted-into.
- **Audit-first protocol** (no-tx honesty): INSERT audit `applied:false` → mutate → UPDATE
  `applied:true`; insert-fail aborts mutation; mutate-fail leaves an applied:false row standing
  (never deleted — the record of the attempt); flip-fail = mutation live + loud alarm
  (deliberate asymmetry). Drawer renders applied:false with a warning glyph.
- **Fail-closed by design** (contrast Q-1's fail-open): quota is a budget; authority is a
  security surface. Until the ledger existed, every trust write failed loudly at leg 1 —
  the console structurally cannot mutate authority un-audited.
- **Deviation #1 anchor lesson (→ S30-3)**: the design note claimed authorityDiff lived in
  trustSlice; it was inline in FROZEN replay.ts:332-338. The constraint set forced the only
  resolution: `shared/authorityDiff.ts` authored content-identical (Architect verified
  semantic identity line-by-line), trustSlice re-exports, replay.ts byte-untouched, a
  relocation-identity test pins trustSlice===shared. Residual: the inline copy still lives in
  replay.ts → micro-TD fold-in on next legit open (register).
- Probe exemption unified away: PROBES_COVERAGE_EXEMPT deleted; backends/backend_authority/
  backend_trust_audit are standard PROBES rows; the three were first-exercised live at the
  36/36 run.

## 4. Q-1 design decisions that will be probed later

- Chat gate seam is PRE-root-span (a denied turn emits ZERO spans; deny telemetry
  `type:'error'`, `session_id:null`); **fail-open with alarm** (root-span attr
  `cwf.quota.degraded`) — do not "harden" to fail-closed.
- The clamp leg is honestly PARTIAL: input tokens unknowable pre-stream; ceiling-reserve +
  per-attempt `maxOutputTokens = min(GEN_MAX, reserved)` + settle true-up; with seeded floors
  `minTurn(10k) > GEN_MAX(8192)` so allowed turns are never clamped below normal (test-pinned).
- Settle SKIPS on noLimit (reserve never decremented) and on degraded; sums ALL OBS-3 attempts.
- Policy rides the L1 lane, all three `sessionTweakable:false` (lab can never touch quota);
  resolveQuotaPolicy = its own pre-pipeline fetch (the honest extra roundtrip precedent).
- SSE `done` carries the RESERVE-time quota snapshot (conservative overstate until settle;
  zero extra DB reads); the personal endpoint reads the settled ledger and includes
  `defaultLimit` (the one design→prompt additive delta, disclosed).
- Analytics: SQL aggregate fns (JS-reduce over telemetry_events is a scaling trap —
  allTimeTokensByActor is NOT the precedent here); `turns = count(distinct session_id)` works
  ONLY because RULE 28 made session_id = turnId; `usage_by_fingerprint` joins llm_call→turn_done
  on session_id and leans on the ONE-turn_done-per-turn pin.
- UX invariants now test-pinned: 429 = calm QuotaLimitNotice (composer text preserved,
  duplicate-429 pulses not stacks) · indicator hidden-when-degraded ("a broken meter is worse
  than no meter") · zero-fill vs fetch-error distinction (ledger absence = real zero; failed
  fetch = retry state, NEVER fake zeros) · percentages round DOWN below 100, cap at 100.

## 5. Process lessons (Architect-side, owned)

- **S30-1/S30-2/S30-3** (register) — all three born from Architect misses this window:
  pre-FIX pattern citation; "keep the branch message" ambiguity (bare merge commit on
  Q1-FIX-1); definition-site anchoring.
- Review-verifies-spec trap: a review that greps compliance against the prompt inherits the
  prompt's errors — the independent LIVE gate (probes) is the non-inheriting layer; keep
  investing there.
- The `git pull` reflex: AG merges LOCALLY, so the owner's checkout is already current —
  never hand the owner a sync step; the Operator gets a READ-ONLY Step-0 repo gate instead
  (rev-parse + status + file-present; pull/fetch/checkout are repo WRITES and stay fenced).
- Operator paste-noise tolerance: Gemini's report windows may replay prior runs — key on the
  Step-0 HEAD hash to identify the current run.
- Shallow clones need explicit refspec to fetch feature branches
  (`+refs/heads/X:refs/remotes/origin/X`).

## 6. Verified-at-close state deltas (for the next bootstrap's trust)

New capabilities: `TRUST_MANAGE` (super-only). New params: `quota.chat*` ×3 (system lane,
published v1, sessionTweakable:false). New tables live: `user_chat_quotas`,
`backend_trust_audit`. New fns live+locked: chat_quota_reserve/settle, usage_daily_series,
usage_totals_by_user, usage_by_fingerprint. New endpoints: `/api/cwf/usage`,
`/api/admin/usage-analytics`, `/api/admin/chat-quota`, `/api/admin/backend-trust`. New GOVERN
panels: QuotaPanel Ledger|Analytics tabs + family switch; Backend Trust (nav-order pin
extended). New shared: `authorityDiff.ts`, usage format utils, `UsageBarChart`. verifyGrants:
36 gates, zero exemptions.

<!-- END · CWF-SESSION-GRAPH-KB-v30 · rev 30 · 2026-07-10 -->
