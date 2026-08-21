# PHASE MICRO-1 — Permanent AWS Langfuse host · admin trace deep-link · stream-stage retry spans
**claude-code-PHASE-MICRO-1-aws-langfuse-deeplink-stream-spans-v1 · 2026-07-05 · one gated phase, three sub-phases**
**Author lane (AG / Claude Code 4.8 on AntiGravity). Architect (Claude) reviews every sub-phase by fresh-clone RULE-25 diff. Operator lane (Gemini) untouched here except where noted. Resume anchor: `origin/master` = `a878cae`, 747 tests (75 files), docVersion rev 33, drift `[OK]`.**

---

## 0. PRE-FLIGHT GATE (hard — do not start until ALL are literally true)

- [ ] `git rev-parse origin/master` == `a878cae556ef095b4916bf6761b48db823f179ed`. If not, STOP and report — the resume anchor moved.
- [ ] Fresh clone (not a reused worktree). `npm ci` clean.
- [ ] Full suite green **before any edit**: report the exact count (expected 747/747, 75 files).
- [ ] **Drift gate green** as a pre-flight line: `npx tsx scripts/checkDocDrift.ts` (or the wired invocation) prints `[OK]`. Report the literal line.
- [ ] Confirm the observe backbone is intact and OFF-safe: `OBSERVABILITY_ENABLED` gates `withSpan` to a hard no-op (see `api/cwf/_lib/observability/spans.ts`). You will NOT change that contract.

If any box fails, STOP and report. Do not "fix forward."

---

## 1. WHAT THIS PHASE IS (scope, corrected against code — read before touching anything)

Three co-dependent deliverables. **The register's "wrap 10 dark pipeline stages" framing is stale and WRONG per code** — do not act on it. Ground truth:

- The 9 pre-stream stages are **already** span-wrapped (`runTurnPipeline` → `withStageSpan`), plus `cwf.turn` (root), `cwf.stage.stream`, `cwf.flush`, and the `warm.*` / `mcp.*` operation spans. **Do not add spans to the pre-stream pipeline.**
- The only genuinely dark region is **inside `runStreamStage`** (`api/cwf/_lib/turn/stageStream.ts`): the OBS-3 retry loop, the grounding check, and the scope append all collapse into one opaque `cwf.stage.stream` span.
- `src/components/admin/InspectTab.tsx` already renders a **built-but-inactive** "14-stage trace tree" column (cell at ~L255 shows `—`; note at ~L264; tooltip `traceNote` at ~L147) and already surfaces `session_id` per row (~L131). The inactive note is itself stale ("parked on OA-8" — the backbone has since landed).

So the three deliverables are:

**(A) Stream-stage retry spans + deep-link activation + doc redraw — CODE ONLY, validated on the EXISTING local Docker Langfuse.** No AWS. This de-risks (b)/(c) before any host move.
**(B) AWS host IaC + GitHub deploy workflow + scoped IAM — BUILD ONLY.** No live provision. `terraform validate`/`plan` clean; no `apply`.
**(C) AWS cutover — gated on Maymun's console walkthrough (Architect provides it AFTER Sub-phase B lands).** Provision, create the Langfuse project, swap `LANGFUSE_HOST` + new `LANGFUSE_PROJECT_ID` to the CloudFront endpoint. Evidence = the RULE-27 "span visible in Langfuse UI after force-flush" criterion on the permanent host, plus a working deep-link.

**Committed topology (locked — do not substitute):** one EC2 (t3.xlarge — the compose is 6 containers incl. ClickHouse/Postgres/Redis/MinIO, memory-heavy) running the **existing** `infra/langfuse/docker-compose.yml` unchanged where possible; **CloudFront** (`*.cloudfront.net`, CF-managed TLS) in front for zero-domain HTTPS — do NOT reach for ALB+ACM (ACM will not issue a cert for `*.amazonaws.com` and there is no owned domain; this is the documented trap). gp3 EBS sized for 90-day trace retention. Deploy via **manual-dispatch** workflow only.

---

## 2. HARD CONSTRAINTS (every sub-phase)

1. **Secrets env-only.** Never print/commit tokens or keys. The AWS bootstrap key is created by Maymun and pasted into **GitHub Actions secrets** — never into the repo, never into a variable default, never echoed. The runtime EC2 uses an **instance role** (no long-lived key on the host). `LANGFUSE_PUBLIC_KEY` / `LANGFUSE_SECRET_KEY` stay in Vercel env. `LANGFUSE_PROJECT_ID` is a **path id, NOT a secret** — it may live in Vercel env as a plain config value (it appears in a URL).
2. **Observability floor (RULE 27).** `withSpan` stays a hard no-op when `OBSERVABILITY_ENABLED` is false; it RETHROWS the callback error untouched and never throws on its own. Every new span uses `withSpan` and inherits this. **A span must never break the retry loop, the `res` writes, the grounding check, or the flush.** Observability-down ≠ chat-down. OTLP/HTTP only (do not touch the transport).
3. **Turn identity (RULE 28).** Do NOT mint any new per-turn id. The deep-link join key is the EXISTING `session_id` (= `ctx.turnId` = OTel trace id = Langfuse trace id — see `api/cwf/_lib/observability/identity.ts`, `stagesGovernance.ts`). Use it as-is.
4. **Empty≠zero + OBS-3 invariants byte-identical.** The retry-loop control flow, `decideRetry`, the no-double-paint guard (`filterPreTokenDelta` / `ctx.committedReal`), the cross-provider ban, the give-up honest message, and the **A2 injection-boundary guard** must be byte-for-byte unchanged. The new spans are **side-effect-only observers** wrapped around existing blocks — they do not move, reorder, or gate any existing statement, and they do NOT mutate `ctx.aiMessages` / `ctx.systemPrompt` (C3). If you find yourself needing to touch A2 or `perturbForRetry`, STOP — that is out of scope and gets full security review.
5. **Span attribute safety.** Span attributes carry ONLY safe, bounded metadata: `attempt` (int), `tier` (enum `none|reanchor|directive`), `empty` (bool), `finishReason` (enum string), `decision` (enum `accept|retry|give-up`), grounding `ok` (bool) + violation `{kind,severity}` counts. **NEVER** answer text, prompt text, tool I/O free-text, `err.message`, or provider metadata. Note: span **events/status bypass** the attribute scrubber (see `spans.ts` `recordSpanError` restraint) — so put nothing sensitive there either; use `recordSpanError` (name+statusCode only) for failures.
6. **RULE 1** no hardcoded config (host/project-id/region come from env/vars, never literals). **RULE 24** source = text, no NUL. **RULE 25** verification starts at `git rev-parse origin/master`; a merge isn't done until pushed + remote hash reported. **RULE 26** any rendered evidence must not clip.
7. **Living-doc lock-step.** Sub-phase A touches a mapped doc (the blueprint) → **two-commit seal** (code commit, then doc-reconcile commit bumping `lastSyncedCommit` + `docVersion`), drift gate must end `[OK]`.
8. Merges `--no-ff`, squash banned. Branches deleted post-merge. Master only long-lived.

---

## 3. SUB-PHASE A — stream-stage retry spans + deep-link activation + blueprint §07 redraw (CODE ONLY, local-host validated)

### A1 — Per-attempt + grounding spans inside `runStreamStage`
In `api/cwf/_lib/turn/stageStream.ts`, wrap the existing blocks in `withSpan` children so the waterfall reads `cwf.stage.stream → cwf.stream.attempt (×N) → cwf.grounding`:

- **Per attempt:** wrap the body of the `for (let attempt …)` loop iteration in a `withSpan('cwf.stream.attempt', { attempt }, async (span) => { … })`. The AI SDK generation span already nests under the active span, so it will nest under this attempt span automatically — that is the point. On the attempt's `onFinish`, set late attributes on `span`: `empty`, `finishReason`. After `decideRetry`, set `decision` on the span; on a `retry` decision also set `tier` = `adoptedTierForAttempt(attempt+1)` (the tier the NEXT attempt applies — mirror the existing `[LLMRetry]` log's semantics exactly). **The loop's control flow, `break`/`continue`, and all existing statements stay byte-identical** — you are wrapping, not rewriting. Confirm the wrap does not change when `res.write` fires.
- **Grounding:** wrap the post-stream grounding block in `withSpan('cwf.grounding', {}, async (span) => { … })`; set `ok` (bool) and, when `!ok`, `violationCount` + the violation `{kind,severity}` list (kinds/count only) on the span. Keep the existing non-fatal try/catch — the span must not change the "validator bug can never break the response" behavior (`withSpan` rethrows, and the existing catch still swallows — verify both still hold).
- Add the two new span-name constants to `api/cwf/_lib/observability/config.ts` alongside the existing `SPAN_*` family (single-source the names; no string literals at the call sites).

**Determinism/no-op tests (add):** with `OBSERVABILITY_ENABLED` false, the wrapped `runStreamStage` produces byte-identical `res` writes and identical `ctx` end-state vs. an un-wrapped run (fixture/spy on `res.write`); `ctx.aiMessages`/`ctx.systemPrompt` unchanged after a reanchor retry (extend the existing C-phase `toEqual(before)` assertion to the newly-wrapped path); a thrown grounding error still yields `done` (span does not swallow-or-break).

### A2 — Activate the InspectTab trace deep-link (env-driven, graceful-off)
In `src/components/admin/InspectTab.tsx`:
- Introduce a client-readable config for `LANGFUSE_HOST` + `LANGFUSE_PROJECT_ID` (via the existing admin config/service surface — do NOT hardcode; if the client can't read process env, thread them through `adminService`/an admin config endpoint the same way other admin config reaches the panel). **Neither value is a secret.**
- Replace the inactive cell (`~L255`, the `—` under the trace column) with: **when** both envs are present AND `r.session_id` is non-null, render a link to `${LANGFUSE_HOST}/project/${LANGFUSE_PROJECT_ID}/traces/${r.session_id}` (opens in a new tab, `rel="noreferrer"`). **Otherwise** keep the honest dash + updated note (see A3). No broken links, ever.
- Same deep-link affordance on the expanded row's stage-tree box (`~L264`) — the box becomes the "open the 14-stage waterfall in Langfuse" entry point when configured, honest note when not.

### A3 — Fix the two stale InspectTab notes + tooltip
- `traceNote` (`~L147`) and the `InactiveNote` copy (`~L264`) currently say "parked on OA-8 / requires the observe backbone." The backbone landed. Rewrite (TR+EN) to reflect reality: when configured → "open this turn's trace in Langfuse (14-stage waterfall incl. per-attempt retry structure)"; when NOT configured → an honest "set `LANGFUSE_HOST` + `LANGFUSE_PROJECT_ID` to enable trace deep-links." Keep the bilingual `t(...)` pattern.

### A4 — Blueprint §07 DOC-DEBT redraw
In `public/architecture/diagrams/agent-control-plane-blueprint.html`:
- **~L430:** `variants = { baseline retry · nudge-perturbation · temp-bump }` is superseded. Replace with the shipped reality: `variants = { none (control) · reanchor (ADOPTED) · directive (REJECTED) }`.
- **~L436:** the sentence "The perturbation variants (nudge · temp-bump) remain OBS-3.1 design work" is superseded. Replace with the Gate-B outcome: OBS-3.1 SHIPPED (`a878cae`), 3-arm paired validation on specimen `07beb11f`, reanchor **0/25 → adopted**, directive **44% → rejected**, the effect is a **PLACEMENT effect** (same engage-directive; inside a re-anchored USER turn it recovers, appended to SYSTEM it backfires), live in production **reactive-only**. Keep it at blueprint/roadmap altitude (RULE 23) — one tight paragraph, not a re-derivation.
- While in an architecture doc, apply the tracked **GAP-4 prose fix** if the phrase appears: "adding a backend = a row + a pack + one registration."

### A5 — Two-commit seal
Commit 1 = code (A1–A3). Commit 2 = doc reconcile (A4) bumping the blueprint tab's `lastSyncedCommit` to commit 1's hash + `docVersion` in the manifest. Drift gate ends `[OK]`.

### A — SELF-VERIFICATION (literal evidence, not build-green)
Run against the **existing local Docker Langfuse** (`infra/langfuse/`, org `cwf`/project `cwf-dev`). Report:
1. Full suite green + exact count (≥747, must rise by the new tests) + drift `[OK]` line.
2. **A forced-empty replay/turn's trace, viewed in the local Langfuse UI, shows** `cwf.stage.stream` with child `cwf.stream.attempt` spans for **attempt 0 (empty=true)** AND **attempt 1 (tier=reanchor, recovered)**, plus a `cwf.grounding` span — report the trace id + a screenshot (RULE 26: not clipped).
3. InspectTab: with both envs set to the local host, a turn-row's trace cell renders a link that **resolves to that trace**; with `LANGFUSE_HOST` unset, the cell falls back to the honest note — **no broken link** (screenshot both states).
4. Blueprint §07 renders the reanchor/directive placement-effect text; the strings `baseline retry`, `nudge-perturbation`, `temp-bump` no longer appear in §07.
5. `git grep` proof that no span name / host / project-id is a hardcoded literal at a call site.

Push; report the remote hash. Architect reviews by fresh clone before Sub-phase B.

---

## 4. SUB-PHASE B — AWS host IaC + GitHub deploy workflow + scoped IAM (BUILD ONLY — no apply)

Author IaC (Terraform preferred) under `infra/aws/langfuse/` that provisions:
- **1× EC2 t3.xlarge**, Amazon Linux 2023, running the existing `infra/langfuse/docker-compose.yml` (via cloud-init / SSM). Reuse the compose as-is; only inject env (Langfuse public/secret keys, `NEXTAUTH_URL` = the CloudFront URL, DB creds) from a secrets mechanism (SSM Parameter Store SecureString — NOT baked into the AMI or userdata plaintext).
- **gp3 EBS** sized for 90-day trace retention (ClickHouse is the bulk — start 100 GB, justify in the plan output).
- **CloudFront distribution** → EC2 origin, forwarding **all** paths incl. `/api/public/otel` (POST) and the web UI, **caching disabled** for dynamic paths. This yields the `*.cloudfront.net` HTTPS endpoint = `LANGFUSE_HOST`. No custom domain, no Route53.
- **Security group:** ingress restricted (CloudFront prefix-list / origin only; SSH via SSM Session Manager, not a public 22). **Instance role** = least-privilege (SSM + read its own SSM params only). No long-lived key on the host.
- **90-day retention:** prefer Langfuse 3.205.0's built-in data-retention (project setting / env) if supported; else a ClickHouse TTL on the observation/trace tables. State which you used.

**Scoped bootstrap IAM policy (Architect-owned security artifact — embed VERBATIM, then TIGHTEN to exactly the resources your plan creates; report any deviation):**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    { "Sid": "Ec2Provision", "Effect": "Allow",
      "Action": ["ec2:RunInstances","ec2:TerminateInstances","ec2:Describe*","ec2:CreateTags",
                 "ec2:CreateSecurityGroup","ec2:AuthorizeSecurityGroupIngress","ec2:RevokeSecurityGroupIngress",
                 "ec2:DeleteSecurityGroup","ec2:CreateVolume","ec2:AttachVolume","ec2:ModifyInstanceAttribute"],
      "Resource": "*", "Condition": {"StringEquals": {"aws:RequestedRegion": "eu-central-1"}} },
    { "Sid": "CloudFront", "Effect": "Allow",
      "Action": ["cloudfront:CreateDistribution","cloudfront:UpdateDistribution","cloudfront:GetDistribution",
                 "cloudfront:DeleteDistribution","cloudfront:TagResource","cloudfront:CreateOriginAccessControl"],
      "Resource": "*" },
    { "Sid": "SsmParams", "Effect": "Allow",
      "Action": ["ssm:PutParameter","ssm:GetParameter","ssm:GetParameters","ssm:DeleteParameter","ssm:AddTagsToResource"],
      "Resource": "arn:aws:ssm:eu-central-1:*:parameter/cwf/langfuse/*" },
    { "Sid": "PassInstanceRole", "Effect": "Allow",
      "Action": ["iam:PassRole","iam:CreateRole","iam:GetRole","iam:PutRolePolicy","iam:CreateInstanceProfile",
                 "iam:AddRoleToInstanceProfile","iam:GetInstanceProfile","iam:TagRole"],
      "Resource": ["arn:aws:iam::*:role/cwf-langfuse-*","arn:aws:iam::*:instance-profile/cwf-langfuse-*"] }
  ]
}
```
Region pinned `eu-central-1`. If your plan needs an action not listed, **add it explicitly and justify** — do NOT widen to `"*"` actions.

**GitHub workflow** `.github/workflows/deploy-langfuse.yml`: `workflow_dispatch` ONLY (never `on: push`). Reads the bootstrap key from `secrets.AWS_LANGFUSE_BOOTSTRAP_KEY_ID` / `secrets.AWS_LANGFUSE_BOOTSTRAP_KEY_SECRET` (names fixed here so the walkthrough can reference them), runs `terraform apply` in `eu-central-1`, and **outputs the CloudFront domain**. Do not run it in this sub-phase.

**HARDEN-LATER (track, do not build):** migrate the bootstrap key to GitHub OIDC → AWS role assumption (zero stored AWS secret). Record as a register item; do not silently pick the weaker path as permanent.

### B — SELF-VERIFICATION (build-only)
1. `terraform init` + `validate` clean; `terraform plan` clean (no apply) — paste the plan summary.
2. The committed scoped IAM policy matches **exactly** the resources/actions the plan creates — list any additions vs. the embedded policy and justify each.
3. `git grep` proof: no AWS key, no account id, no secret in the repo; SSM SecureString used for host env.
4. Full suite still green; drift `[OK]`.

Push; report remote hash. **Architect then produces the screen-by-screen AWS-console + GitHub-secrets walkthrough** (`cwf-aws-langfuse-bootstrap-walkthrough-v1`) scoped to the exact policy + secret names above, and hands it to Maymun. Sub-phase C is gated on Maymun completing that walkthrough.

---

## 5. SUB-PHASE C — AWS cutover (gated on Maymun's walkthrough; AG assists, Architect verifies)

Preconditions (Maymun, via the walkthrough): IAM user + scoped policy created; bootstrap key pasted into the two GitHub secrets; `workflow_dispatch` triggered → CloudFront URL emitted; a Langfuse org/project created on the new host → `LANGFUSE_PROJECT_ID` captured; `LANGFUSE_HOST`, `LANGFUSE_PROJECT_ID`, `LANGFUSE_PUBLIC_KEY`, `LANGFUSE_SECRET_KEY` set in **Vercel production** env pointing at the AWS host.

AG: confirm the compose is healthy on the host (all 6 containers up via SSM); confirm the OTLP path answers over the CloudFront HTTPS URL. Deactivate/retire the bootstrap key after apply (one-shot; the walkthrough tells Maymun to disable it).

### C — SELF-VERIFICATION (literal, permanent host)
1. **A production span is visible in the Langfuse UI on the CloudFront host after force-flush** (the RULE-27 criterion, now on the permanent host) — trace id + screenshot.
2. Clicking an InspectTab turn-row's trace link **lands on the correct trace on the AWS host**, showing the full stage tree **including the per-attempt `cwf.stream.attempt` structure** from Sub-phase A — screenshot.
3. Vercel prod env confirmed swapped (host + project-id point at AWS; the local values are retired). Report via the Architect's Vercel-log read (Architect pulls this — not Maymun).
4. Full suite green; drift `[OK]`. Two-commit seal if any doc moved. Push; report remote hash.

---

## 6. WHAT "DONE" MEANS
- A/B/C all reviewed ACCEPTED by fresh-clone RULE-25 diff.
- The owner can click any turn row in InspectTab and land on that turn's Langfuse waterfall on a permanent AWS host, seeing every stage **including a reanchor recovery as a per-attempt span tree** — the "dream dashboard" via buy-before-build (the trace waterfall IS the dashboard; no standalone dashboard was built).
- Blueprint §07 tells the truth (reanchor adopted / directive rejected / placement effect).
- Zero AWS secret in the repo; runtime on an instance role; bootstrap key one-shot + retired; OIDC tracked as harden-later.
- Maymun's total manual surface was: AWS console (IAM user + scoped policy paste + key) → GitHub secrets paste → one workflow trigger → retention/project confirm — all walked through screen-by-screen. No hand-built tables, no hand-read logs.
