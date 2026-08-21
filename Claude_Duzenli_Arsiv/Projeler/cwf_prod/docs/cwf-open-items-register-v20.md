# CWF — Open Items Register · v20
<!-- rev 20 · 2026-07-05 · Supersedes v19. Delta: the "pre-replay legibility" continuation of the üst-yapı pivot. Shipped+verified REPLAY-UX-3 (was in-flight in v19) and a NEW phase TRACE-LINK-1 (persist turn trace id → pre-run open-original-trace-in-Langfuse). Migration APPLIED to prod DB (Operator-confirmed) and prod deploy verified synced to master. Caught the "migration file exists ≠ migration applied" trap and the ctx.turnId-vs-ctx.traceId trap. master HEAD 72abc57 (807 tests / 81 files / docVersion rev 39 / drift [OK]). -->

---

## ✅ CLOSED THIS SESSION
- **REPLAY-UX-3** (`fbbb012`→cl `0b848ec`) — finished Part B: (1) strong chip **selected-state** (`secondary`→filled `default` token, `aria-pressed` kept); (2) click the selected specimen → **expand safe detail** (full user message + full assistant reply + tool NAMES; **raw_tool_results payloads stay server-side**, C9, proven by a no-leak test planting two poison payloads; new `GET ?specimenDetail=<id>` via a reused `loadRecordedTurnDetail` 4-field projection); (3) **open the RUN in Langfuse** (`…/sessions/{runId}`, env-derived, graceful-off). Fresh-clone RULE-25 verified. Governance Model / Agent Control Plane / Architecture Map reseal (docVersion 38). AG honestly surfaced the `manifest.json` vs `public/architecture/manifest.json` path (my §6.7 spec error, AG resealed the correct file).
- **TRACE-LINK-1** (`f47085b`→cl `72abc57`) — the pre-replay end-to-end-trace ask: persist **`ctx.turnId`** (the full 32-hex OTel trace id = `telemetry_events.session_id`, RULE 28 — the deep-link key) on the assistant `messages` row → surface as `ReplaySpecimenDetail.traceId` → render an **OTel-shape-gated** ("`/^[0-9a-f]{32}$/`") "open original trace in Langfuse" link (`…/traces/{traceId}`), **graceful-off** when absent. Exact join, **no heuristic**. Old + observability-down rows stay `trace_id` NULL → honest "no original trace recorded" note (empty≠zero at the render layer). Security-adjacent (C9 detail endpoint + persistence write path) → FULL review: migration correct, both insert sites write `ctx.turnId` (NOT the 8-char `ctx.traceId`), persist-trap test asserts `===TURN_ID && !==TRACE_ID` at success+error paths, no-leak assertions preserved+extended, `api/admin/replay.ts` UNCHANGED (verbatim passthrough), 807/807, drift `[OK]`, docVersion 39. `RecordedTurn.traceId` made a required nullable field (AG's call — a write site can't silently omit the join key; agreed).
- **TRACE-LINK-1 migration APPLIED to prod DB** (Operator lane) — `alter table public.messages add column if not exists trace_id text` executed on the LIVE DB; Operator schema-read confirmed **absent-before → applied → present-after** (`column_name=trace_id, data_type=text`), RLS unchanged. Deploy-ordering satisfied: the column existed before any trace_id-writing turn ran.
- **Deploy sync verified** — `list_deployments` shows `72abc57` (`dpl_9y5b8B3…`) is the current READY production deployment; the newer commits (UX-3, TRACE-LINK-1) all deployed. The v-close observation "prod on e63fd0d, 3 commits behind" was true ONLY at the 18:13 turn (the newer deploys hadn't been created yet); they landed in the following ~2h. **No promotion problem** — do NOT re-raise a "prod is behind" item.
- **Ordering trap did NOT fire** — no prod traffic in the migration↔deploy gap; last chat turn (18:13) ran on the pre-trace_id `e63fd0d` deploy; zero `MessageRepository`/`trace_id` insert errors in the 8h window. No persistence loss.

---

## 🔄 IN FLIGHT / PENDING OWNER VERIFY
- **TRACE-LINK-1 ③ — live end-to-end confirm** (pending a fresh factory turn). Code + DB + deploy are all in place; the only remaining step is proof-in-prod: ask the factory ONE question (the new assistant turn now writes `trace_id`), then (a) Architect scans prod logs for insert-clean + a written trace_id, (b) owner sees the working "open original trace in Langfuse" link on that new specimen's Part B detail (Langfuse-signed-in; org `cwf`/project `cwf-prod`). Old specimens correctly show the honest "no original trace recorded" note. **First task next session: run the turn (owner) → Architect log-verify.**

---

## 🔴 LIVE QUEUE (committed, ordered)
1. **Part A / "Sayfa 2b" — per-stage replay** (the real Replay feature; deferred from Sayfa 2). "Recompose governed slice @ version X, re-run routing/scope." **Architect rec: pilot with the `grounding validator` stage** (purest deterministic, inputs fully present, empty≠zero showcase), then widen to routing + scope/authority. Deserves its own design note (OBS-3.1 style) BEFORE the phase prompt. Security-relevant (re-runs governed stages) → full review, keep OUT of UI-polish phases.
2. **Endpoint switcher / "Sayfa 3"** (owner item) — gated admin UI to point Langfuse at AWS ↔ local Docker ↔ other endpoint. `/api/admin/observability` is GET-only today; move the target env→**governed config** (DB-first/code-floor) + gated write UI + selector. **Config/secret split (trap #7):** host/projectId = non-secret soft config (DB-editable, gated UI); keys = secret (env-only; UI stores env-NAME pointer, never a value).
3. **GOVERN UX/polish pass** ("toy" feel on the working GOVERN plane) — functions are real; needs owner's specific rough-spot list (runtime, not code-visible).
4. **P7** — Superset empty≠zero runtime validator (3rd defense layer, no fragile regex). Superset still at prompt + eval-gate only (2 vs ARMES's 3).
5. **ARMES 401** — recurring prod token expiration. **CONFIRMED still firing this session** (`[MCP Discover] armesMes: SSE error: Non-200 status code (401)` in prod logs; factory Superset-only degraded). Fix: Operator-lane array-aware UPDATE across all user rows of the app's Supabase `mcp_settings` (token field ONLY), after a fresh token from ARDIC/ARMES (ksadmin@/baris.inanc@/tunc.kahveci@ardictech.com). Architect verifies post-fix from Vercel logs.

---

## 🛠 DEFERRED / HARDEN-LATER (do NOT build unprompted)
- **AWS-DENY-1** (deferred security phase — slot **before the next re-provision**, the window the bootstrap key is active): add explicit `Deny` carve-outs. **Sharpened spec:** DENY `ssm:SendCommand`, `ssm:StartSession` (crown jewel), `ec2:ModifySnapshotAttribute`, `ec2:ModifyImageAttribute`, `iam:AttachRolePolicy`, `iam:UpdateAssumeRolePolicy`. **NEVER deny `ec2:ModifyInstanceAttribute`** (the apply uses it). Validate every denied action against the real `terraform plan` action set.
- **Multi-user Langfuse SSO** — deep-links drop a not-signed-in panel user on Langfuse's cold login wall. Fine for the single super_admin (one-time sign-in, persistent cookie); a real multi-user panel wants SSO / shared session.
- **AWS README harden-later register**: GitHub OIDC→role (drop stored bootstrap key), permissions-boundary on `cwf-langfuse-*`, Elastic IP (clean stop/start = the idle-cost lever), CloudFront↔origin shared-secret header, MinIO media external endpoint.

---

## 🟡 TRACKED-SMALL / DOC-DEBT
- **replay_audit `outcome.status = null`** on the 3 CHAR-1 rows (07-04) — digest data-quality, NOT correctness. Fix when a replay_audit panel view is built (`outcomeDigest` sets `status` on every path).
- **GAP-4 prose fix** — ABSENT from blueprint §07; applies to the first arch doc that has it. Carried.
- **`[ToolFilter] Learned` log dedup** — cosmetic noise. Carried.
- **`act(...)` RTL warnings** in `replayTab.test.tsx` — cosmetic test-hygiene, not a failure (808/807 all green). A later phase touching that file can wrap state updates. Carried.

---

## 🗺 The page-by-page backlog — `cwf-control-plane-activation-map-v1.md`
Status: **Inspect ✓** (deep-link works). **Replay** — UX-1 ✓, UX-2 ✓, UX-3 ✓, **TRACE-LINK-1 ✓** (pre-run original-trace link), **Part A pending** (queue #1). **Endpoint switcher pending** (queue #2). **GOVERN polish pending** (queue #3). GOVERN plane is REAL and working — the toy feel there is UX, not missing function.

## Verified anchors
- **Repo** `maymun207/cwf_yaprak` master HEAD **`72abc57`** — 807 tests / 81 files / docVersion **rev 39** / drift `[OK]` (fresh-clone verified, RULE 25; full suite re-run + independent drift gate this session).
- Session commit chain (from v19 close `e63fd0d`): `d84fe01`·`fbbb012` (REPLAY-UX-3 code) → `de64dfb`·`0b848ec` (UX-3 changelog) → `8879058`·`f47085b` (TRACE-LINK-1 code, rev 39 reseal) → `e367e66`·`72abc57` (TRACE-LINK-1 changelog).
- **Prod deploy** `72abc57` = current READY production deployment (`dpl_9y5b8B3…`, verified via `list_deployments`). Prod synced with master.
- **Prod DB** `messages.trace_id` (text, nullable) APPLIED + Operator-confirmed. RLS unchanged.
- **AWS host** unchanged: instance `i-030c2b4fadebfa229`, CloudFront `dl3644f5a7fnn.cloudfront.net`, project `cwf-prod`, eu-central-1. Bootstrap IAM key DEACTIVATED; `cwf-budget-stop` armed (STANDBY, $50).
