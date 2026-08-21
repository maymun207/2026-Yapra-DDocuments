# CWF — Open Items Register · v18
<!-- rev 18 · 2026-07-05 · Supersedes v17. Delta: MICRO-1 CLOSED via LIVE AWS cutover — permanent Langfuse host provisioned on AWS (t3.xlarge, eu-central-1), C1/C2 evidence gate GREEN (verified by Claude via host public-API + Vercel prod logs, RULE 27/28). New items surfaced during the cutover: bootstrap-IAM-policy broadening (v3) needing repo-sync; retention-mechanism correction (Langfuse built-in retention is EE-only, NOT OSS); the promised budget STOP-action (now unblocked); AWS account Free→Paid upgrade recorded. Cloud-infra-MCP decisions of record captured. No repo writes this session — all work was AWS-side infra + Vercel config. master HEAD unchanged at `dcb114b`. -->

---

## ✅ CLOSED THIS SESSION

### MICRO-1 — permanent AWS Langfuse host + admin deep-link + stage-span coverage — **CLOSED 2026-07-05**
Build-only half landed+reviewed in the prior session (A `3a53f92` stream/grounding spans + InspectTab deep-link; B `fc69230` AWS IaC; C-prep `e7a53b8` remote state; `dcb114b` single-fetch keys). **This session = the live cutover:**
- **Host provisioned:** `aws_instance` `i-030c2b4fadebfa229` (t3.xlarge, eu-central-1), CloudFront `E1PRI6MRV1924J` → `https://dl3644f5a7fnn.cloudfront.net`, project `cwf-prod`. `Apply complete! 19 resources` after 3 failed applies (see "Lessons" below).
- **Health verified:** EC2 `running/ok/ok`, SSM agent `Online`, CloudFront `Deployed`, SG ingress ONLY from CloudFront prefix-list `pl-a3a144ca:3000` (no public SSH), all 6 containers `Up` (clickhouse/postgres/redis/minio `healthy`), `cloud-init status: done`, host public health `/api/public/health` = **200**.
- **C1 GREEN:** real prod turn (`getFactoryList` → 17 factories incl. KB7) produced a full trace on the permanent host — `cwf.turn` root + all 10 `cwf.stage.*` spans + `cwf.stream.attempt` + `cwf.grounding` + `cwf.flush` + `cwf.mcp.*` + LLM generations. RULE 27 satisfied (host public-API = UI data).
- **C2 GREEN:** Vercel prod log `trace=805a61293768dc920ed41f736fe67cac` == host trace id == deep-link `{session_id}` (RULE 28, one turn id end-to-end) → InspectTab deep-link `…/project/cwf-prod/traces/805a…cac` necessarily resolves to the `cwf.stream.attempt` waterfall. Verified without a UI click.
- **Env swap GREEN:** trace landed on CloudFront host (not the old Docker host) + turn ran on redeploy `dpl_371GNMGWkCJ2wUPdg84GYiYQA28Q`.
- **Retention:** ≥90-day floor MET — OSS Langfuse stores data indefinitely (nothing deletes). Explicit 90-day auto-cleanup is EE-only → reclassified as deferred storage-hygiene (see DOC-DEBT).
- **Bootstrap access key DEACTIVATED** post-cutover (single-use, as designed).

---

## 🔴 LIVE QUEUE (committed, ordered)

1. **STOP-action (budget → stop host at threshold)** — NEW, promised to Maymun. Now UNBLOCKED (host exists). Build a dedicated `cwf-budget-stop` IAM role (budgets.amazonaws.com trust + `ec2:StopInstances` scoped to `i-030c2b4fadebfa229`, eu-central-1) — NOT the host's own role — then attach the action to `EAIP_Budget_1` at Maymun's chosen threshold. Security-artifact (new IAM role) → careful build. NB: Budget Actions lag cost data by hours; single fixed t3.xlarge = ceiling ~$0.17/hr, runaway impossible.
2. **ARMES 401 prod fix** — recurring token expiration, ACTIVE on prod `/api/cwf/chat` (`[MCP Discover] armesMes: 401`, last 12:17:40). Operator-lane fix = array-aware UPDATE across all user rows of the app's Supabase `mcp_settings` table (NOT the IDE MCP config). Separate track from MICRO-1; the C1/C2 test turn worked once the token was fresh.
3. **`bootstrap-iam-policy.json` repo-sync → v3** — AG (Author lane), **security-artifact, FULL review**. The LIVE managed policy was broadened during cutover to end the round-trip cycle: `ec2:*` + `ssm:*` (both region-pinned to eu-central-1), `cloudfront:*`, `iam:*` (scoped to `cwf-langfuse-*`), s3/dynamodb exact. Repo file still holds the narrow (broken) v1. Sync so a future re-provision matches. Rationale (disposable, region-pinned, IAM-scoped, disabled-after) recorded in KB.
4. **P7 — Superset empty≠zero runtime validator** (3rd defense layer, no fragile regex) — carried from v17. Superset still defended at prompt + eval-gate layers only (2 vs ARMES's 3).

---

## 🟡 TRACKED SMALL / DOC-DEBT

- **Retention mechanism correction (DOC-DEBT, AG):** Langfuse built-in per-project data-retention is **Enterprise-only, NOT in OSS** — the `langfuse_retention_days` variable description + README "Retention & sizing" premise is wrong for our OSS deploy. Data persists indefinitely (≥90d floor met). Explicit auto-cleanup, if ever wanted, = ClickHouse TTL or S3 lifecycle (both infra-level, decoupled from Langfuse schema). Deferred — no near-term storage risk at dev trace volume on a 100 GB gp3 root.
- **AWS account:** upgraded **Free → Paid plan** this session (t3.xlarge is blocked on the new 2025 Free account plan). Signup credits (~$100–200) retained + auto-apply. Cost lever = **stop host when idle** (dev/debug host; data persists on EBS across stop/start). `EAIP_Budget_1` set (alert-only; stop-action = queue #1).
- **GAP-4 prose fix** — confirmed ABSENT from blueprint §07; applies to the first arch doc that has it. Carried.
- **`[ToolFilter] Learned` log dedup** — cosmetic log noise. Carried.

## 🛠 AWS HARDEN-LATER (tracked in `infra/aws/langfuse/README.md` — do NOT build unprompted)
- **GitHub OIDC → role assumption** — now HIGHER value: drops the stored (now-deactivated) bootstrap key entirely; re-activating a stored key for future applies is the interim path.
- **Permissions boundary on `cwf-langfuse-*` roles** — named privesc backstop for `iam:*`-scoped bootstrap grant.
- **Elastic IP** — required for clean host stop/start (CloudFront origin stays valid across restarts) → prerequisite for the stop-when-idle cost lever.
- **CloudFront↔origin shared-secret header**; **MinIO media external endpoint** (trace media images won't render through CloudFront — non-blocking for the span waterfall).

## ⚪ OWNER-INPUT PENDING
- **F3** — REPLAY-B happy-path audit row `a8798c1d` vanished (service-role-only, cause unknown). Healthy baseline = Gate-B `replay_audit` 11→14 clean.

---

## 📌 DECISIONS OF RECORD — cloud-infra MCP (Maymun confirmed; recorded at MICRO-1 close)
- Infra-MCP is a **derivative of where the workload lives**, not a preference. Shape = **MCP authors/validates IaC → CI applies**. Live-CRUDL / autonomous-apply is **REJECTED as standing** (re-crosses lane boundary + injection surface). Read-only diagnostics MCP is additive.
- Near-term instantiation = **AWS IAC MCP** (infra = Supabase/AWS + Vercel; "AntiGravity is Google" is dev-tooling, not infra-location). AWS CCAPI live-CRUDL MCP deprecated → AWS IAC MCP.
- **OPEN strategic question:** which cloud for NEW greenfield EAIP components — **GCP is a serious candidate** (native Google dev-loop + Model Armor platform-level injection defense; GCP fully-managed remote MCP GA). Not yet decided.
- **Do NOT re-litigate** the GitHub-Actions+Terraform-over-MCP choice (secrets-in-CI, review-before-apply, lane boundary, injection).

## 🧪 LESSONS — AWS bootstrap (this session)
- IAM inline **user** policy cap = 2048 bytes → use a **managed** policy for anything non-trivial.
- Hand-scoping a Terraform bootstrap policy action-by-action is a losing game: provider read-backs only surface at runtime (`ec2:GetManagedPrefixListEntries`, `iam:TagInstanceProfile`, `ssm:DescribeParameters` each failed a separate apply). For a disposable, immediately-disabled key: region-pinned service-level grants (+ IAM scoped) are the right tradeoff.
- New AWS accounts (post-2025) sign up on a **Free account plan** that blocks non-free instance types — must upgrade to Paid before any real workload.
- CloudShell's region label (`us-east-1`/`eu-north-1`) is cosmetic; every command was region-pinned to eu-central-1.

## Verified anchors
- **Repo:** `maymun207/cwf_yaprak` master HEAD **`dcb114b`** — UNCHANGED this session (no repo writes; all work was AWS infra + Vercel config).
- **AWS host:** instance `i-030c2b4fadebfa229`, CloudFront `E1PRI6MRV1924J` / `dl3644f5a7fnn.cloudfront.net`, project `cwf-prod`, region eu-central-1. State: S3 `cwf-langfuse-tfstate` + DynamoDB `cwf-langfuse-tflock`. Bootstrap IAM key: DEACTIVATED.
