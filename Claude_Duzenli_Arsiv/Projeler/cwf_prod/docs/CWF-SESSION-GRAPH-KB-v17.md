# CWF — Session Graph KB · v17
**rev 17 · 2026-07-05 · supersedes v16 (`a878cae`→`dcb114b`: MICRO-1 all build-only sub-phases shipped; AWS cutover pending)**
**End-of-session anchor:** `origin/master` = `dcb114b` · 759/759 tests (78 files) · docVersion rev 35 · drift `[OK]` · **MICRO-1 build-only COMPLETE; the AWS host is NOT yet provisioned — the cutover (walkthrough) is Maymun's next action, then Claude verifies C1/C2.**

> Claude's record of the session, not the user's. Code in `cwf_yaprak` is ground truth over this file. Read `CLAUDE-PROJECT-INSTRUCTIONS-v2.md` first, then `cwf-open-items-register-v17.md`, then this.

---

## 1. What happened this session (chronological)

A clean single-track execution session: MICRO-1 (the committed next phase) taken from register scope → corrected against code → one gated three-sub-phase phase prompt → four AG merges (A, B, C-prep, vercel-keys), each reviewed by fresh-clone RULE-25 diff, with the scoped IAM artifacts getting full security review. Plus a genuine architecture-of-record decision on cloud-infra MCP (AWS + GCP), fact-checked against live sources. No fires. MICRO-1's build-only half fully landed; the AWS cutover is teed up for Maymun.

### 1.1 Resume + the reanchor-wire-in confirmation
Verified resume from origin: HEAD `a878cae`, 759... no — `747`/75, docVersion rev 33, drift `[OK]`, `adoptedTierForAttempt` single-sourced (`tierForAttempt` lab-only) — all matched v16. Pulled prod Vercel logs myself (owner does not hand-read): **`tier=reanchor` has NOT yet fired on a natural attempt-0 empty** — expected, not a blocker (healthy traffic in the retention window, every `[LLMFinish]` `empty=false`; reactive-only means nothing to fire on). **Bonus finding:** the logs show ARMES LIVE in prod (`getFactoryList`/`getOeeValuesForZones`/etc. returning real KB7 data, no 401) — the map §6 red "ARMES token 401 / Superset-only degraded" line is STALE (doc-only correction owed).

### 1.2 MICRO-1 phase prompt — scope CORRECTED against code (RULE 25 caught a stale register)
Wrote **`claude-code-PHASE-MICRO-1-aws-langfuse-deeplink-stream-spans-v1.md`** (one gated prompt, three sub-phases). Fresh-clone code review overturned the register's framing:
- The register said (c) = "wrap the 10 dark pipeline stages." **FALSE per code** — F-obs2 already wrapped all 9 pre-stream stages (`runTurnPipeline`→`withStageSpan`) + root/stream/flush/warm/mcp. The pipeline is NOT dark.
- The "2/14 traced" was the OA-10-era snapshot. The "14" lives in the code: `InspectTab.tsx` already renders a **built-but-inactive** "14-stage trace tree" column with a note — itself STALE — saying "parked on OA-8, requires the observe backbone" (that backbone landed in F-obs1/2/3).
- The ONE genuinely dark region = **inside `runStreamStage`**: the OBS-3 retry loop + grounding collapse into a single opaque `cwf.stage.stream`. So (c) redefined: instrument the stream retry internals (one child span per attempt + a grounding span). (b) redefined: **activate** the already-present inactive column, not build one.
- Committed topology locked (with the CloudFront trap named): 1× EC2 t3.xlarge running the existing compose + **CloudFront** for zero-domain HTTPS (ALB+ACM is a dead end — ACM won't issue for `*.amazonaws.com` and there's no owned domain) + gp3 90-day retention + manual-dispatch workflow. Scoped bootstrap IAM policy embedded (Claude owns it as a security artifact).

### 1.3 Sub-phase A → ACCEPTED + merged (`3a53f92`)
`cwf.stream.attempt`(×N) + `cwf.grounding` spans, side-effect-only (the callback returns `{decision, finishReason}`; `break`/`continue` stayed in the outer loop; `ctx.*` fields persist across the callback boundary). **Conditional-accept → one required fix:** `ATTR_STREAM_EMPTY`/`ATTR_STREAM_FINISH_REASON` were set only in the `onFinish` closure, whose timing is "unordered" per the code's own comment — `withSpan` ends the span after the callback returns, so a late `onFinish` writes to an ended span (silent OTel no-op) and the two DASHBOARD-CRITICAL attributes drop. Fix: set them synchronously post-await, before `span.end`, `empty` recomputed via `isEmptyCompletion(...)`. AG delivered it (`bf20b0c`) with `stageStreamSpanAttrs.test.ts` — a `setTimeout(0)` macrotask `onFinish` deterministically reproduces the race + a faithful fake span enforcing ended→no-op; asserts the attrs still land. Stronger than a screenshot. Also A: gated non-secret `api/admin/observability.ts` (host+project-id from env at request time, keys NEVER served — `observability.test.ts` sets `*-should-not-leak` and asserts absence), InspectTab deep-link (exact-`href` asserted, graceful-off honest note), blueprint §07 redraw. docVersion rev 35, 759/759.

### 1.4 Sub-phase B → ACCEPTED + merged (`fc69230`) — full IAM security review
AWS host IaC, build-only (`plan`: 19 add / 0 change / 0 destroy, zero AWS contact). Verified: CloudFront default-cert zero-domain HTTPS; SG ingress ONLY from the CloudFront prefix-list, no port 22 (SSM Session Manager); host env via SSM SecureString; **runtime instance role exemplary least-priv** (SSM session + read own path-scoped params + `kms:Decrypt` gated by `kms:ViaService=ssm`). Workflow `workflow_dispatch`-only, typed-`apply` guard used only in `if:` (no shell interpolation → no injection). Bootstrap policy well-scoped (region-pinned EC2, SSM `/cwf/langfuse/*`, `PassRole` role-name-scoped). **Two findings raised → became C-prep** (§1.5).

### 1.5 Sub-phase C-prep → ACCEPTED + merged (`e7a53b8`), then vercel-keys → merged (`dcb114b`)
- **Finding 1 (required-before-C):** state was LOCAL — on an ephemeral CI runner it's discarded post-apply → the host becomes unmanageable-by-Terraform, which throws away the exact declarative-management guarantee that justified choosing Terraform over MCP-CRUDL. Fixed: remote S3 backend + DynamoDB lock; out-of-band bucket/table creation documented as a walkthrough step; **scoped `Tf*` IAM** (state object scoped to the EXACT `…/langfuse/terraform.tfstate` key, not the bucket; no CreateBucket/CreateTable; no `"*"`). Re-reviewed as a security artifact — clean.
- **Finding 2 (document + enforce):** the bootstrap policy's `iam:PutRolePolicy`+`iam:PassRole` on `cwf-langfuse-*` — `PassRole` is role-name-scoped (arbitrary-admin-role vector closed), but `PutRolePolicy` can self-author an admin policy on a passable role IF the CI secret leaks in the bootstrap window. **Accepted residual for a one-shot key** (runtime role is minimal) — NAMED, not silently waved; mitigations = immediate key-disable (now a hard walkthrough step) + permissions-boundary moved to explicit HARDEN-LATER.
- **Single-fetch keys** (`dcb114b`): Maymun can't reach the CI runner to get the two Langfuse keys for Vercel. AG added a post-apply step writing ONLY those two to SSM `/cwf/langfuse/vercel-keys` (masked, value via `file://` so it never hits `argv`, `umask 077`+`rm`, **zero IAM change** — the existing `/cwf/langfuse/*` PutParameter covers it, policy verified byte-identical). Maymun retrieves both with one CloudShell command.

### 1.6 Walkthrough delivered
**`cwf-aws-langfuse-bootstrap-walkthrough-v1.md`** — screen-by-screen for a non-AWS user: state bucket/lock (CloudShell) → IAM user + verbatim scoped policy + access key (Console) → 2 GitHub secrets → one typed-`apply` trigger → 2 non-secret outputs → one-command key fetch → 4 Vercel env vars → **disable the bootstrap key** → "cutover done" → Claude verifies. Embeds the exact commands, the verbatim 8-statement policy, the bucket-global-uniqueness fallback, and the MinIO-media known-limitation note. Confirmed all 16 IaC vars have defaults (the no-`var-file` apply won't break).

---

## 2. Cloud-infra MCP — architecture of record (Maymun CONFIRMED; fact-checked)

Maymun surfaced (from another agent's research) that AWS/GCP now offer managed MCP for infra. This corrected a framing of mine — the capability is real; we chose otherwise on purpose (not a misremember on his part).

**Verified facts (web-searched this session):**
- AWS **CCAPI MCP Server** (live natural-language CRUDL) is **deprecated** → AWS steers to the **AWS IAC MCP Server** (IaC authoring + cfn-lint/cfn-guard validation + deploy troubleshooting). AWS's own vector moved from "agent applies live infra" → "agent authors IaC + validates" — the model we already picked.
- GCP: **fully-managed remote MCP servers GA** (announced Dec 10 2025; Maps/BigQuery/GCE/GKE first, DB servers Feb 2026; from Mar 17 2026 no separate enable). **GCE MCP** = autonomous infra (provision/resize). **Model Armor** = a platform-level firewall for agentic workloads defending indirect prompt injection + exfiltration. **Developer Knowledge MCP** = IDE-to-docs grounding vs deprecated commands. IAM-based + IAM deny policies + Cloud Audit Logs + Cloud Trace.

**The decisions (record at MICRO-1 close):**
1. **Cloud-agnostic invariant:** infra-MCP is a derivative of WHERE THE WORKLOAD LIVES, not a preference. Shape = **MCP authors/validates IaC → CI applies.** Live-CRUDL/autonomous-apply REJECTED as standing (re-crosses lane boundary + injection surface, even with GCP's nicer guardrails). Read-only diagnostics MCP additive. **Near-term = AWS IAC MCP** (our infra is AWS/Vercel; the "AntiGravity is Google" fact is dev-tooling, NOT infra-location — it doesn't pull hosting to GCP).
2. **OPEN strategic question:** which cloud for NEW greenfield EAIP components. **GCP is a serious candidate** (native Google dev-loop + Model Armor's platform-level injection defense aligns with our A2/ADR-001 obsession). Not settled — flagged for when a component is specced.
- **Model Armor / Apigee-as-MCP-gateway** = external prior-art references for our own injection-boundary + Superset-gateway patterns; they do NOT change our runtime posture (our chat agent reads factory data on AWS/Vercel — Model Armor wouldn't cover that path).

---

## 3. Why GitHub-Actions + Terraform, not an AWS/GCP MCP, for the host provisioning
Recorded so a future summary doesn't "simplify" it to an MCP: (1) **secrets** — an infra-MCP holds AWS creds where the MCP client runs (AG's machine); GitHub Actions keeps the credential in the CI secret store, ephemeral runner, never on AG or in a chat. (2) **review-before-apply** — Claude's evidence gate ("plan matches the embedded IAM policy exactly, I sign before apply") depends on declarative reviewable IaC. (3) **lane boundary** — AG writes repo only; live infra mutation crosses it. (4) **injection** — our system reads untrusted factory data; wiring the same agent to live apply is our own threat model. The AWS IAC MCP (authoring) MAY be used later as a dev-time aid — output is the same Terraform Claude reviews; apply stays CI.

---

## 4. Verified state at session end (`dcb114b`)
- 759/759 tests (78 files), drift `[OK]`, docVersion rev 35 (Sub-phase A's reseal; B/C-prep/vercel-keys are infra-only → unmapped → no reseal).
- Topology since v16: `a878cae` → `3a53f92` (A) → `fc69230` (B) → `e7a53b8` (C-prep remote-state) → `dcb114b` (vercel-keys). All `--no-ff`, squash-free, branches deleted post-merge, **origin has master only** (AG's `char-1-findings`/`obs31-prod-wirein` are LOCAL-only, not on origin).
- New IaC tree `infra/aws/langfuse/` + `.github/workflows/deploy-langfuse.yml` on master, all build-only (never applied). The AWS host does NOT exist yet.
- The reanchor wire-in remains UNOBSERVED-live (no natural empty in the retention window). Carry: confirm `[LLMRetry] ... tier=reanchor` when one fires.

---

## 5. Corrected stale beliefs
- Register/KB "MICRO-1 (c) = 10 dark pipeline stages" was STALE — the pre-stream pipeline was already fully spanned by F-obs2; the real dark region is inside `runStreamStage`. (§1.2)
- "2/14 traced" = OA-10-era; InspectTab's "14-stage trace tree" column was already built-but-inactive with a stale "parked on OA-8" note (the backbone had landed). Fixed in Sub-phase A.
- Map §6 red "ARMES token 401 / Superset-only degraded" — prod logs show ARMES live (141-tool OEE chain). Doc-only stale line.
- "AG manages AWS via an MCP interface" (Maymun's recollection) — the capability is real (AWS/GCP managed MCP), but we deliberately use GitHub-Actions + Terraform (secrets-in-CI, not on AG). Not a misremember; a deliberate choice (§3).
- v16 anchor was `a878cae`/747/rev 33 — now `dcb114b`/759/rev 35.

---

## 6. DECISION / RULE records set this session
- **Cloud-infra MCP invariant + open cloud question** (§2) — Maymun confirmed; to be written into the register/KB at MICRO-1 close (mid-phase version-churn avoided per versioning discipline).
- **Bootstrap-key privesc residual — named + accepted for a one-shot key**, with immediate-disable as a hard walkthrough step + permissions-boundary tracked (HARDEN-LATER #2). Security artifacts (bootstrap + runtime IAM, the workflow's secret handling) each got full review per the standing rule.
- **Remote Terraform state is a C-prerequisite, not harden-later** — local ephemeral state defeats the declarative guarantee that justified Terraform. (§1.5)
- **The dashboard-critical span attribute belongs off the `onFinish` race** — set span attrs synchronously before `span.end`; a mock that fires `onFinish` synchronously is false confidence (must reproduce the macrotask race). (§1.3)

---

## 7. Standing watch (carried + new)
- Gemini operator fence: sanctioned tasks ONLY, no self-initiated cleanup. Migrations = Operator-lane.
- **AWS host operational (NEW):** S3 bucket names globally unique (rename `backend.hcl` + 2 policy ARNs together if taken — not Maymun solo); bootstrap key one-shot → disable immediately post-apply; the deploy workflow manages live paid infra — never casual re-run.
- gpt-4.1-mini `call_tool(search_tools)` self-correct in prod → future replay-lab material.
- Node drift AG v26.x vs v22.x spec; green — don't touch.
- **F2 lab-env trap** + `@ai-sdk/google` reads `GOOGLE_GENERATIVE_AI_API_KEY` not `GEMINI_API_KEY` (check BOTH).
- **Direct-engine replay caveat** + **replay grounding fidelity gap** (carried from v16 — unchanged).
- claude.ai MCP servers (Gmail/Calendar/Drive/Vercel) need re-auth via connector settings if wanted back.
