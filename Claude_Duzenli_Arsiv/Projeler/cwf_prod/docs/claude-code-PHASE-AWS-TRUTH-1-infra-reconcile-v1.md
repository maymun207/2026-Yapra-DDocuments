# PHASE AWS-TRUTH-1 — Post-Cutover Infra Reconciliation
**v1 · 2026-07-05 · Author lane (AG) · Architect: Claude**
**Scope:** two documentation-of-truth corrections under `infra/aws/langfuse/` after the live MICRO-1 cutover. NO application code, NO tests, NO governed tables, NO `terraform apply`. `infra/**` is UNMAPPED → **NO reseal, do NOT bump `docVersion`.**
**Review class:** **FULL security review** (Sub-phase 1 edits a bootstrap IAM policy — a standing security artifact; full RULE-25 review even though this is a doc/sync).

---

## 0. PRE-FLIGHT GATE (hard — abort and report if any line fails)
1. Fresh clone `github.com/maymun207/cwf_yaprak`; `git rev-parse origin/master` == **`dcb114b`** (the resume anchor). If HEAD ≠ `dcb114b`, STOP and report — do not build on an unexpected base.
2. Baseline JS suite: **759/759, 78 files** green.
3. **Drift gate green:** `npm run check:doc-drift` → `[OK]` before you start.
4. Baseline infra: from `infra/aws/langfuse/`, `terraform init -backend=false && terraform validate` → `Success! The configuration is valid.`; `terraform fmt -check` clean.
5. `git grep` for secrets clean (no `AKIA…`, no secret-key literal, no 12-digit account id).

Report all five as literal command output, not "verified".

---

## 1. HARD CONSTRAINTS (violating any = reject)
- **Secrets env-only.** No key/token/account-id ever enters a committed file. `git grep` must stay clean after your edits.
- **Do NOT `terraform apply`, do NOT touch AWS.** This phase is repo text only.
- **Do NOT re-narrow / re-litigate the broadened policy.** The service-level broadening (`ec2:*`/`ssm:*` region-pinned, `cloudfront:*`, `iam:*` resource-scoped) is a **decision of record** (register v18 §Lessons). Hand-scoping a disposable bootstrap key action-by-action is a proven losing game — provider read-backs surface new required actions only at runtime (`ec2:GetManagedPrefixListEntries`, `iam:TagInstanceProfile`, `ssm:DescribeParameters` each cost a failed apply). Your job is to make the repo MATCH this decision, not to second-guess it.
- **The disposable-key rationale MUST be visible IN the artifact.** A future reader who sees `ec2:*` must, from the file/README alone, understand this is a *one-shot, region-pinned, IAM-scoped, deactivated-immediately-after* bootstrap key — so they neither panic-narrow it back to the broken form nor reuse this broad policy for a long-lived key. This is the single most important requirement of Sub-phase 1.
- **`infra/**` is UNMAPPED.** Do NOT run `reseal`, do NOT change `manifest.json`, do NOT bump `docVersion`. `check:doc-drift` must read `[OK]` because nothing mapped changed — not because you resealed.
- **No application-code or test changes.** JS suite must stay byte-identically **759/759, 78 files**.

---

## 2. SUB-PHASE 1 — `bootstrap-iam-policy.json` → v3 (security artifact)

**Why:** the live managed policy was broadened to v3 during the cutover to end a 3-failed-apply round-trip cycle; the committed file still holds the narrow (tightened) form that *cannot* complete an apply. Sync so a future re-provision (or provision-elsewhere) starts from the policy that actually works.

**Action:** replace the entire contents of `infra/aws/langfuse/bootstrap-iam-policy.json` with EXACTLY this (verbatim — the S3/DynamoDB ARNs are carried over unchanged from the current file; ec2/ssm/cloudfront/iam are broadened to service level per the decision of record):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Ec2ProvisionRegionPinned",
      "Effect": "Allow",
      "Action": ["ec2:*"],
      "Resource": "*",
      "Condition": { "StringEquals": { "aws:RequestedRegion": "eu-central-1" } }
    },
    {
      "Sid": "CloudFrontGlobal",
      "Effect": "Allow",
      "Action": ["cloudfront:*"],
      "Resource": "*"
    },
    {
      "Sid": "SsmRegionPinned",
      "Effect": "Allow",
      "Action": ["ssm:*"],
      "Resource": "*",
      "Condition": { "StringEquals": { "aws:RequestedRegion": "eu-central-1" } }
    },
    {
      "Sid": "TfStateS3Bucket",
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": "arn:aws:s3:::cwf-langfuse-tfstate"
    },
    {
      "Sid": "TfStateS3Object",
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::cwf-langfuse-tfstate/langfuse/terraform.tfstate"
    },
    {
      "Sid": "TfLockDynamoDb",
      "Effect": "Allow",
      "Action": ["dynamodb:GetItem", "dynamodb:PutItem", "dynamodb:DeleteItem"],
      "Resource": "arn:aws:dynamodb:eu-central-1:*:table/cwf-langfuse-tflock"
    },
    {
      "Sid": "IamScopedToCwfLangfuse",
      "Effect": "Allow",
      "Action": ["iam:*"],
      "Resource": [
        "arn:aws:iam::*:role/cwf-langfuse-*",
        "arn:aws:iam::*:instance-profile/cwf-langfuse-*"
      ]
    }
  ]
}
```

**Then, in `infra/aws/langfuse/README.md`,** update the bootstrap-policy section (the delta table that documented the tightened v2) to a **v3 delta note** stating, in prose that survives without the surrounding context:

1. **This is a one-shot bootstrap key.** It is created immediately before a `terraform apply`, and its access key is **DEACTIVATED immediately after** the apply completes (register v18 / KB v18). It is NOT a standing credential.
2. **Why service-level (`ec2:*`/`ssm:*`) instead of an enumerated allow-list:** the Terraform AWS provider's read-backs surface required actions only at apply-time — `ec2:GetManagedPrefixListEntries` (the CloudFront prefix-list data source; note `Describe*` does NOT cover `Get*`), `iam:TagInstanceProfile` (default_tags on the instance profile), and `ssm:DescribeParameters` (the `aws_ssm_parameter` read-back) each failed a separate apply against the enumerated form. For a disposable, region-pinned, IAM-scoped, deactivated-after key, service-level grants are the correct trade-off.
3. **The blast radius is bounded by three walls:** (a) `ec2:*` and `ssm:*` are region-pinned to `eu-central-1` via an `aws:RequestedRegion` condition; (b) `iam:*` is resource-scoped to `cwf-langfuse-*` roles/instance-profiles only; (c) the key is deactivated after use. `cloudfront:*` carries no region condition **by design** — CloudFront is a global service and a region condition would break it.
4. **Harden-later (already tracked, do not build here):** GitHub OIDC → role assumption drops the stored key entirely; a permissions boundary on `cwf-langfuse-*` roles is the named privesc backstop for the `iam:*` grant.

Keep the README's existing HARDEN-LATER register and any unrelated sections intact.

---

## 3. SUB-PHASE 2 — retention-mechanism doc correction (DOC-DEBT)

**Why:** the docs claim Langfuse's **built-in per-project data-retention** enforces the 90-day window. That feature is **Enterprise-only — it does NOT exist in the OSS build we run.** OSS Langfuse stores data **indefinitely** (nothing auto-deletes), so the ≥90-day floor is over-met. The only real auto-cleanup lever is infra-level (ClickHouse TTL or S3 lifecycle), decoupled from the Langfuse schema.

**3a.** In `infra/aws/langfuse/variables.tf`, the `langfuse_retention_days` variable **description** (line ~40) currently asserts the value is "Enforced as Langfuse's BUILT-IN per-project data-retention setting during Sub-phase C bring-up (self-host v3 supports project data retention)." Replace that description with wording that says, accurately:
- Built-in per-project data-retention is a **Langfuse Enterprise feature and is NOT available in the OSS build** → this value is **NOT enforced by any Langfuse setting**.
- On OSS, trace/observation data persists **indefinitely** (the ≥90-day floor is over-met by default).
- The variable is retained as **advisory/documentation**: it records the intended retention window that (i) informs root-volume sizing and (ii) would parameterize a future ClickHouse-TTL or S3-lifecycle cleanup if ever applied. It drives **no Terraform resource today** (confirm this: `langfuse_retention_days` is declared but not referenced by any resource).

**3b.** In `infra/aws/langfuse/README.md`, the **"Retention & sizing"** section currently leads with "Retention: Langfuse built-in per-project data retention, 90 days … set … as a one-time project setting during Sub-phase C bring-up." Correct it to state:
- OSS Langfuse has **no built-in per-project retention** (Enterprise-only) → **data is retained indefinitely**; the ≥90-day floor is met by default, nothing to configure.
- Reclassify the ClickHouse-TTL (and add S3-lifecycle as a peer option) from "fallback" to **the** explicit auto-cleanup mechanism *if* a cap is ever wanted — **deferred**, no near-term storage risk at dev trace volume on the 100 GB gp3 root. Keep the example `ALTER TABLE … MODIFY TTL …` for reference but frame it as the primary (not fallback) lever.
- Remove any implication that Maymun performs a "retention/project confirm" step in the Langfuse UI — that step is a no-op on OSS.

**Do NOT** change `variable "root_volume_size"` sizing logic or any resource — this sub-phase is description/README text only.

---

## 4. SELF-VERIFICATION (literal evidence required — build-green is NOT evidence)
Report each as raw output:
1. `cat infra/aws/langfuse/bootstrap-iam-policy.json` → shows the exact v3 above; `python3 -c "import json,sys;json.load(open('infra/aws/langfuse/bootstrap-iam-policy.json'))"` → no error (valid JSON).
2. **No `"*"` action broadening slipped past the intended scope:** confirm every `ec2:*`/`ssm:*` statement carries the `aws:RequestedRegion: eu-central-1` condition; `iam:*` carries ONLY the two `cwf-langfuse-*` resource ARNs; `cloudfront:*` is the only conditionless service-level grant and it is global by necessity. Paste the statement-by-statement confirmation.
3. `terraform init -backend=false && terraform validate` → `Success!`; `terraform fmt -check` → clean.
4. `git grep -nE "AKIA|aws_secret|[0-9]{12}"` → no account-id/secret literal (ARNs use `*`/`::`).
5. `grep -n "Enterprise" infra/aws/langfuse/variables.tf infra/aws/langfuse/README.md` → the corrected wording is present in both.
6. `grep -rn "langfuse_retention_days" infra/aws/langfuse/*.tf` → declared only; confirm it is referenced by NO resource (paste the grep).
7. JS suite **759/759, 78 files** unchanged; `npm run check:doc-drift` → `[OK]` (NOT via a reseal — confirm `manifest.json` and `docVersion` are byte-unchanged: `git diff --stat public/architecture/manifest.json` empty).
8. `git diff --stat` shows ONLY `infra/aws/langfuse/bootstrap-iam-policy.json`, `variables.tf`, `README.md` changed — nothing else.
9. Branch, merge `--no-ff` (squash banned), push, and **report the remote HEAD hash** (`git rev-parse origin/master` after push). Merge is not done until pushed with the remote hash reported (RULE 25).

---

## 5. WHAT ARCHITECT WILL RE-VERIFY
Fresh clone + diff vs `dcb114b`: the v3 JSON byte-for-byte, each broad grant's guard-wall (region condition / resource scope), the disposable-key rationale present in README prose, the retention correction in both files, `docVersion`/`manifest.json` untouched, JS suite + drift unchanged, and the pushed remote hash. Security artifact → full review, no shortcuts.
