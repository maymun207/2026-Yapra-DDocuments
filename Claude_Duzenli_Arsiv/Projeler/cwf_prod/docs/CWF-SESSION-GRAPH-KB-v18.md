# CWF — Session Graph KB · v18
<!-- rev 18 · 2026-07-05 · Supersedes v17. This session = the LIVE AWS Langfuse cutover. MICRO-1 CLOSED: permanent host provisioned + health-verified + C1/C2 evidence gate GREEN + budget STOP-action armed. Zero repo writes (all work AWS-side infra + Vercel config); master HEAD stays `dcb114b`. Detailed queue in cwf-open-items-register-v18.md. -->

---

## §0 One-paragraph state
MICRO-1 is **CLOSED**. The permanent Langfuse host is live on AWS: instance `i-030c2b4fadebfa229` (t3.xlarge, eu-central-1), CloudFront `E1PRI6MRV1924J` → `https://dl3644f5a7fnn.cloudfront.net`, project `cwf-prod`, zero-domain HTTPS. Prod tracing flows to it (C1/C2 verified). A budget STOP-action auto-stops the host at $50/mo. No repo changed this session — master HEAD is still `dcb114b` (759 tests, docVersion rev 35, drift OK). The one durable follow-up that touches the repo: sync `bootstrap-iam-policy.json` to the broadened v3 (AG, security-artifact).

## §1 What closed / shipped this session
- **MICRO-1 cutover executed live** (Maymun ran it; Claude verified). Build-only half (A `3a53f92`, B `fc69230`, C-prep `e7a53b8`, keys `dcb114b`) was already landed; this session provisioned the actual AWS host and cut Vercel over to it.
- **C1 GREEN** — a real prod turn (`getFactoryList` → 17 factories incl. KB7) produced a full trace on the permanent host: `cwf.turn` + all 10 `cwf.stage.*` + `cwf.stream.attempt` + `cwf.grounding` + `cwf.flush` + `cwf.mcp.*` + 2× LLM generations. Verified via the host public API (`/api/public/traces` + `/api/public/observations`), RULE 27 (host API = UI data).
- **C2 GREEN** — Vercel prod log `trace=805a61293768dc920ed41f736fe67cac` == host trace id == deep-link `{session_id}` (RULE 28). Deep-link `…/project/cwf-prod/traces/805a…cac` necessarily resolves to the `cwf.stream.attempt` waterfall. Proven by id-match, no UI click needed.
- **Env swap GREEN** — trace landed on CloudFront host (not old Docker host) + turn on redeploy `dpl_371GNMGWkCJ2wUPdg84GYiYQA28Q`.
- **Budget STOP-action armed** — `cwf-budget-stop` IAM role (trust scoped to `EAIP_Budget_1` via SourceArn confused-deputy guard; perm = stop OUR instance via SSM only, CalledVia=ssm) + budget action `RUN_SSM_DOCUMENTS` at ABSOLUTE $50 → `STOP_EC2_INSTANCES i-030…`, AUTOMATIC. Status STANDBY. (Cost data for a new account lags ~24h before it evaluates.)

## §2 The AWS bootstrap saga (chronological — the hard part)
Provisioning took **4 apply attempts**; each failure taught something. Recorded so we never re-walk it:
1. **CloudShell paste hiccup** — the big first block truncated at the heredoc; IAM user never created. Fix = re-run only the remaining IAM step (not the whole block; bucket/table already existed).
2. **IAM inline-user-policy 2048-byte cap** — `put-user-policy` rejected the policy. Fix = **managed** policy (`create-policy` + `attach-user-policy`), 6144-byte ceiling.
3. **Apply #1 failed** — `ec2:GetManagedPrefixListEntries` missing (`Describe*` doesn't cover `Get…`; the CloudFront prefix-list data source needs it). Also caught `iam:TagInstanceProfile` (default_tags tags the instance profile) proactively. Fixed as policy **v2**.
4. **Apply #2 failed on two fronts:** (a) **account is on the 2025 "Free account plan"** → `t3.xlarge` blocked ("not eligible for Free Tier"); can't downsize (ClickHouse needs ≥8GB) → **upgraded Free→Paid** (keeps signup credits, pay-as-you-go). (b) `ssm:DescribeParameters` missing (aws_ssm_parameter read-back). Decision: **stop hand-scoping a disposable bootstrap key** — broadened to policy **v3**: `ec2:*`+`ssm:*` region-pinned to eu-central-1, `cloudfront:*`, `iam:*` scoped to `cwf-langfuse-*`, s3/dynamodb exact. Rationale: region-pin + IAM-scope + key-disabled-after = safe for a one-shot key; the 24/7 host role stays tight. Also cleaned an orphaned `/cwf/langfuse/compose` param from the half-apply. vCPU quota confirmed = 5 (≥4 for t3.xlarge).
5. **Apply #3 GREEN** — `Apply complete! 19 resources`. Host booted (cloud-init `done`, 6 containers `Up`/`healthy`, `/api/public/health` = 200).
- **Post-cutover:** 4 Vercel prod env vars set (`LANGFUSE_HOST/PROJECT_ID/PUBLIC_KEY/SECRET_KEY`), redeployed, bootstrap IAM access key **DEACTIVATED**.
- **Health verification** (read-only CloudShell): EC2 running/ok/ok, SSM Online, CloudFront Deployed, SG ingress ONLY from `pl-a3a144ca:3000` (no public SSH), all containers healthy, health 200. On-instance truth via SSM Run Command (no SSH) confirmed cloud-init done + 6 containers up 2h.

## §3 Retention — corrected understanding (DOC-DEBT)
The `langfuse_retention_days` variable premise is **wrong for OSS**: Langfuse's built-in per-project data-retention is an **Enterprise-only** feature. OSS default = data stored **indefinitely** (nothing deletes). So the ≥90-day floor is over-met (data never auto-deleted on the permanent host). Explicit auto-cleanup (to cap the 100GB volume at ~90d), if ever wanted, = ClickHouse TTL or S3 lifecycle (infra-level, decoupled from Langfuse schema). Deferred — no near-term storage risk at dev volume. README + variable-desc correction owed via AG.

## §4 Decisions of record — cloud-infra MCP (Maymun confirmed)
- Infra-MCP = derivative of where the workload lives. Shape = **MCP authors/validates IaC → CI applies**. Live-CRUDL / autonomous-apply **REJECTED as standing** (lane boundary + injection). Read-only diagnostics MCP additive.
- Near-term = **AWS IAC MCP** (AWS CCAPI live-CRUDL MCP deprecated → IAC MCP). "AntiGravity is Google" = dev-tooling, not infra-location.
- **OPEN:** greenfield EAIP cloud — GCP a serious candidate (Model Armor + native dev-loop + managed remote MCP GA). Not decided.
- Do NOT re-litigate GitHub-Actions+Terraform-over-MCP (secrets-in-CI, review-before-apply, lane boundary, injection).

## §5 Verified anchors
- Repo `maymun207/cwf_yaprak` master HEAD **`dcb114b`** — UNCHANGED (no repo writes this session). 759 tests / 78 files / docVersion rev 35 / drift OK (verified at session open via fresh clone, RULE 25).
- AWS: instance `i-030c2b4fadebfa229`, CloudFront `E1PRI6MRV1924J`/`dl3644f5a7fnn.cloudfront.net`, project `cwf-prod`, region eu-central-1. State: S3 `cwf-langfuse-tfstate` + DynamoDB `cwf-langfuse-tflock`. IAM: bootstrap key DEACTIVATED; `cwf-budget-stop` role live; bootstrap policy v3 (broad, region-pinned).
- Vercel prod: 4 Langfuse env vars set + redeployed (`dpl_371GNMGWkCJ2wUPdg84GYiYQA28Q`).

## §6 Open queue → see cwf-open-items-register-v18.md
Live: (1) `bootstrap-iam-policy.json` repo-sync to v3 (AG, security-artifact, full review), (2) P7 Superset empty≠zero runtime validator, (3) ARMES 401 recurring-token refresh (Operator-lane, only when it recurs — currently working). DOC-DEBT: retention correction. HARDEN-LATER (infra README): GitHub OIDC→role, permissions-boundary, Elastic IP (for clean stop/start), CloudFront↔origin secret header, MinIO media endpoint. Owner-input: F3.
