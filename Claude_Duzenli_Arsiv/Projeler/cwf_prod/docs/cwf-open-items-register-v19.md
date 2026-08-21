# CWF — Open Items Register · v19
<!-- rev 19 · 2026-07-05 · Supersedes v18. Delta: the "üst yapı" pivot session. Shipped+verified AWS-TRUTH-1, PANEL-LEGIBILITY-1, REPLAY-UX-1, REPLAY-UX-2. Closed F3 (benign), item-4 Inspect deep-link (works; Langfuse-side sign-in), and corrected the stale v18 STOP-action line (it was already done). REPLAY-UX-3 is IN FLIGHT (AG building at session close). New: control-plane activation map is the page-by-page backlog; AWS-DENY-1 sharpened + deferred; multi-user Langfuse SSO harden-later; a replay_audit data-quality tracked-small. master HEAD e63fd0d (786 tests / 81 files / docVersion rev 37 / drift [OK]). -->

---

## ✅ CLOSED THIS SESSION
- **AWS-TRUTH-1** (`4f50e5f`→cl `b3fa7a5`) — `bootstrap-iam-policy.json` synced to the live **v3** (service-level `ec2:*`/`ssm:*` region-pinned, `cloudfront:*`, `iam:*` scoped to `cwf-langfuse-*`; disposable-key rationale + three blast-radius walls written INTO the README) + retention truth (OSS Langfuse = data **indefinite**; built-in per-project retention is **Enterprise-only**; ClickHouse-TTL/S3-lifecycle = the deferred primary lever). Security artifact, full review.
- **PANEL-LEGIBILITY-1** (`fe9bad7`→cl `6983573`) — commit-SHA badge next to "Control Plane" (env-derived `VERCEL_GIT_*`, RULE 1, GitHub commit link) + fixed the stale "awaits the AWS phase" Part A banner + Inspect "sign in to Langfuse" hint. Governance Model reseal (docVersion 36).
- **REPLAY-UX-1** (`355e8f4`→cl `10fd677`) — Part B legibility: searchable picker (id/title), selection highlight, deterministic `interpretRun` verdict banner (all-stub-miss names the missed tool + one-click honest-empty re-run), denominator-explicit empty rate, expandable per-rep rows. Frontend-only, src/** unmapped → no reseal. (AG caught my spec error: the failure string is `unrecorded call: <tool> args#…`, reformatted at `taskFn.ts:203`, not the stubTools throw — parser made robust to both.)
- **REPLAY-UX-2** (`964a4f9`→cl `e63fd0d`) — reach ANY specimen by exact id past the 20-row window: `GET /api/admin/replay?specimenId=<id>` (metadata-only via shared `mapSpecimenRow`, no `raw_tool_results` leak, REPLAY_RUN-gated, 404/422 fail-loud), browse limit 20→50. Governance Model / Agent Control Plane / Architecture Map reseal (docVersion 37).
- **F3 — replay_audit vanished row** — **CLOSED, benign.** Audit-or-alarm is correctly coded (`ReplayAuditRepository.insert` `console.error`s ALARM on failure, both modes). Operator service-role read: 14 rows (= healthy baseline), `a8798c1d%` matches NO id/run_id/message_id. No vanished row reproducible; likely a transient log fragment, never a real loss. No code change.
- **Item 4 — Inspect → Langfuse deep-link** — **CLOSED.** The CWF deep-link is correct end-to-end (verified with trace `805a…cac` == the C2 trace; `{host}/project/cwf-prod/traces/{session_id}`). The earlier "not called from admin" symptom was pre-cutover. The screenshot "You do not have access to this trace" is **Langfuse-side auth**, not our code — the browser needs a signed-in Langfuse session on the AWS host. Fix = sign in with the `LANGFUSE_INIT_USER_EMAIL`/`_PASSWORD` (in the SSM SecureString `.env`; org `cwf`, project `cwf-prod`).
- **STOP-action (v18 queue #1)** — was already DONE at v18 close (`cwf-budget-stop` role armed, STANDBY); v18's LIVE-QUEUE line was stale. Corrected here — do NOT re-raise.

---

## 🔄 IN FLIGHT (at session close)
- **REPLAY-UX-3** — AG building. Three owner-requested Part-B fixes: (1) strong chip **selected-state** (reps/miss chips; `secondary`→high-contrast token); (2) click the selected specimen → **expand full detail** (metadata + full user message + assistant content + tool NAMES; **raw_tool_results payloads stay server-side** = C9 line, no-leak tested; new `GET ?specimenDetail=<id>`); (3) **open the RUN in Langfuse** (`…/sessions/{runId}` — replay traces group by `runId`; the pre-run specimen has no stored trace id, so it's the RUN link, honest). Baseline `e63fd0d`. **First task next session: RULE-25 review of the AG report** (esp. the #2 no-payload-leak test + #3 env-derived link/graceful-off).

---

## 🔴 LIVE QUEUE (committed, ordered)
1. **REPLAY-UX-3 review** (above) — when the AG report lands.
2. **Part A / "Sayfa 2b" — per-stage replay** (the real Replay feature; deferred from Sayfa 2). "Recompose governed slice @ version X, re-run routing/scope." **Needs a scope pick** — Architect rec: **pilot with the `grounding validator` stage** (purest deterministic, inputs fully present, empty≠zero showcase), then widen to routing + scope/authority. Deserves its own design note (like OBS-3.1) before the phase prompt. Security-relevant (re-runs governed stages) → full review, keep OUT of UI-polish phases.
3. **Endpoint switcher / "Sayfa 3"** (owner item #2) — a gated admin UI to point Langfuse at AWS ↔ local Docker ↔ other endpoint. Today `/api/admin/observability` is GET-only read-only (host/projectId from env). Real feature: move the target from env to **governed config** (DB-first/code-floor) + gated write UI + target selector. **Config/secret split (recurring trap #7):** host/projectId = non-secret soft config (DB-editable, gated UI); keys = secret (env-only; UI stores env-NAME pointer, never a value).
4. **GOVERN UX/polish pass** ("toy" feel on the working GOVERN plane) — functions are real; needs Maymun's specific rough-spot list (runtime, not code-visible).
5. **P7** — Superset empty≠zero runtime validator (3rd defense layer, no fragile regex). Superset still at prompt + eval-gate only (2 vs ARMES's 3).
6. **ARMES 401** — recurring token expiration on prod `/api/cwf/chat`. **Currently working.** Only act when it recurs: Operator-lane array-aware UPDATE across all user rows of the app's Supabase `mcp_settings` table (NOT the IDE config), after a fresh token from ARDIC/ARMES (ksadmin@/baris.inanc@/tunc.kahveci@ardictech.com).

---

## 🛠 DEFERRED / HARDEN-LATER (do NOT build unprompted)
- **AWS-DENY-1** (deferred security phase — slot **before the next re-provision**, the window the bootstrap key is active): add explicit `Deny` carve-outs to the bootstrap policy for actions Terraform provably never calls — shrinks blast radius without reintroducing the enumerate-and-fail fragility (Deny wins, Allow stays broad). **Sharpened spec (verified this session):** DENY `ssm:SendCommand`, `ssm:StartSession` *(crown jewel — kills the CRIT `ssm:*`→any-instance-RCE/param-read residual; apply never calls them, cloud-init is on-box)*, `ec2:ModifySnapshotAttribute`, `ec2:ModifyImageAttribute` *(no snapshot/AMI creation)*, `iam:AttachRolePolicy` *(inlined via PutRolePolicy)*, `iam:UpdateAssumeRolePolicy`. **Do NOT deny `ec2:ModifyInstanceAttribute`** — the apply uses it (`compute.tf` `user_data_replace_on_change=true`). Validate every denied action against the real `terraform plan` action set.
- **Multi-user Langfuse SSO** — deep-links drop a not-signed-in panel user on Langfuse's cold login wall ("no access"). Fine for the single super_admin (one-time sign-in, persistent cookie); a real multi-user panel wants SSO / shared session so trace links Just Work.
- **AWS README harden-later register** (`infra/aws/langfuse/README.md`): GitHub OIDC→role (drop the stored bootstrap key), permissions-boundary on `cwf-langfuse-*`, **Elastic IP** (clean host stop/start → the stop-when-idle cost lever), CloudFront↔origin shared-secret header, MinIO media external endpoint.

---

## 🟡 TRACKED-SMALL / DOC-DEBT
- **replay_audit `outcome.status = null`** on the 3 newest CHAR-1 rows (07-04 17:35–17:40, 25/25 reps) while other completed rows read `'completed'` — a data-quality inconsistency (row + reps present, digest missing `status`), NOT correctness/safety. If/when a replay_audit panel view is built, ensure `outcomeDigest` sets `status` on every path. (Found during the F3 diagnostic.)
- **GAP-4 prose fix** — ABSENT from blueprint §07; applies to the first arch doc that has it. Carried.
- **`[ToolFilter] Learned` log dedup** — cosmetic noise. Carried.

---

## 🗺 The page-by-page backlog — `cwf-control-plane-activation-map-v1.md`
Made "üst yapı = toy" concrete. Status: **Inspect ✓** (deep-link works). **Replay** — UX-1 ✓, UX-2 ✓, UX-3 in flight, **Part A pending** (queue #2). **Endpoint switcher pending** (queue #3). **GOVERN polish pending** (queue #4). GOVERN plane (Rules/Kinds/Providers/MCP/Routing/Users) is REAL and working — the toy feel there is UX, not missing function.

## Verified anchors
- **Repo** `maymun207/cwf_yaprak` master HEAD **`e63fd0d`** — 786 tests / 81 files / docVersion **rev 37** / drift `[OK]` (fresh-clone verified, RULE 25). REPLAY-UX-3 not yet merged.
- Session commit chain: `4f50e5f`·`b3fa7a5` (AWS-TRUTH-1) → `49ed615` (mcp flake, test-only) → `fe9bad7`·`6983573` (PANEL-LEGIBILITY-1) → `355e8f4`·`10fd677` (REPLAY-UX-1) → `964a4f9`·`e63fd0d` (REPLAY-UX-2).
- **AWS host** unchanged: instance `i-030c2b4fadebfa229`, CloudFront `dl3644f5a7fnn.cloudfront.net`, project `cwf-prod`, eu-central-1. Bootstrap IAM key DEACTIVATED; `cwf-budget-stop` armed (STANDBY, $50).
