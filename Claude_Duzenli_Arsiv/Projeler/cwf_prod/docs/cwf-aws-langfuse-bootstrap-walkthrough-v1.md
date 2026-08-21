# CWF — AWS Langfuse Bootstrap Walkthrough
**cwf-aws-langfuse-bootstrap-walkthrough-v1 · 2026-07-05 · for MICRO-1 Sub-phase C cutover**
**Audience: Maymun (no AWS UI knowledge assumed). Every command is copy-paste; every click is named. ~15–20 min, one sitting.**

> Valid once the `micro1-C-vercel-keys-ssm` branch is merged to master (the single-fetch key step). Region is **eu-central-1 (Frankfurt)** throughout.

---

## 0. Before you start

**You need:** (a) sign-in to your AWS account, (b) admin access to the GitHub repo `maymun207/cwf_yaprak` (to add secrets + run the workflow), (c) access to your Vercel project settings.

**You will produce, in order:** an S3 state bucket + lock table → an IAM user with a scoped key → 2 GitHub secrets → one workflow run that stands up the host → 4 Vercel env vars → then you disable the key. That's it.

**Three hard safety rules:**
1. **Never paste any AWS key or Langfuse key into a chat with me (Claude) or AG.** Keys go ONLY into GitHub secrets and Vercel env. I only ever use the *names*, never the values.
2. Do everything in region **eu-central-1**. Top-right of the AWS console, make sure it says **Frankfurt (eu-central-1)**.
3. Follow the steps in order. If any command errors, **stop and tell me the error** — don't improvise (I'll give you the exact fix).

**One cost note:** Step 4 stands up a paid EC2 `t3.xlarge` + CloudFront. That's intended (the permanent Langfuse host). It runs until we deliberately tear it down.

---

## STEP 1 — Create the state bucket + lock table (AWS CloudShell)

This holds Terraform's "memory" of what it built, so the host stays manageable. Created once, by hand, because Terraform can't create its own memory store.

1. Sign in to AWS. Top-right, set the region to **Frankfurt (eu-central-1)**.
2. In the top navigation bar, click the **CloudShell** icon (a `>_` terminal icon, usually near the search bar). A black terminal opens in your browser — it's already signed in as you, nothing to install.
3. Copy-paste this whole block, press Enter, wait for it to finish:

```bash
aws s3api create-bucket --bucket cwf-langfuse-tfstate --region eu-central-1 \
  --create-bucket-configuration LocationConstraint=eu-central-1
aws s3api put-bucket-versioning --bucket cwf-langfuse-tfstate \
  --versioning-configuration Status=Enabled
aws s3api put-public-access-block --bucket cwf-langfuse-tfstate \
  --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
aws dynamodb create-table --table-name cwf-langfuse-tflock --region eu-central-1 \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH --billing-mode PAY_PER_REQUEST
```

**What you'll see:** JSON output for the bucket and the table (the table shows `"TableStatus": "CREATING"` — that's fine).

> **If the first line errors with `BucketAlreadyExists` or `BucketAlreadyOwnedByYou`:** S3 bucket names are globally unique across all of AWS, so `cwf-langfuse-tfstate` may be taken. **Stop and tell me** — it's a one-line repo change (rename the bucket in `backend.hcl` + the policy), then you re-run this step. Don't rename it yourself (three files must stay in sync).

Leave CloudShell open — you'll need it again in Step 6.

---

## STEP 2 — Create the IAM user + scoped key (AWS Console)

This is the identity the deploy uses. It can do **only** what this stack needs (region-locked, resource-scoped) — nothing else in your account.

1. In the AWS search bar (top), type **IAM**, open it.
2. Left menu → **Users** → **Create user**.
3. **User name:** `cwf-langfuse-bootstrap` → **Next**.
4. **Set permissions** page → choose **Attach policies directly** → click **Create policy** (opens a new tab).
5. In the new tab, click the **JSON** tab, delete whatever's there, and paste this **exactly**:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    { "Sid": "Ec2Provision", "Effect": "Allow",
      "Action": ["ec2:RunInstances","ec2:TerminateInstances","ec2:Describe*","ec2:CreateTags","ec2:DeleteTags","ec2:CreateSecurityGroup","ec2:AuthorizeSecurityGroupIngress","ec2:RevokeSecurityGroupIngress","ec2:AuthorizeSecurityGroupEgress","ec2:RevokeSecurityGroupEgress","ec2:DeleteSecurityGroup","ec2:ModifyInstanceAttribute"],
      "Resource": "*", "Condition": { "StringEquals": { "aws:RequestedRegion": "eu-central-1" } } },
    { "Sid": "CloudFront", "Effect": "Allow",
      "Action": ["cloudfront:CreateDistribution","cloudfront:UpdateDistribution","cloudfront:GetDistribution","cloudfront:GetDistributionConfig","cloudfront:DeleteDistribution","cloudfront:TagResource","cloudfront:ListTagsForResource"],
      "Resource": "*" },
    { "Sid": "SsmParams", "Effect": "Allow",
      "Action": ["ssm:PutParameter","ssm:GetParameter","ssm:GetParameters","ssm:DeleteParameter","ssm:AddTagsToResource","ssm:ListTagsForResource"],
      "Resource": "arn:aws:ssm:eu-central-1:*:parameter/cwf/langfuse/*" },
    { "Sid": "SsmPublicAmi", "Effect": "Allow",
      "Action": ["ssm:GetParameter","ssm:GetParameters"],
      "Resource": "arn:aws:ssm:eu-central-1::parameter/aws/service/ami-amazon-linux-latest/*" },
    { "Sid": "TfStateS3Bucket", "Effect": "Allow",
      "Action": ["s3:ListBucket"], "Resource": "arn:aws:s3:::cwf-langfuse-tfstate" },
    { "Sid": "TfStateS3Object", "Effect": "Allow",
      "Action": ["s3:GetObject","s3:PutObject","s3:DeleteObject"],
      "Resource": "arn:aws:s3:::cwf-langfuse-tfstate/langfuse/terraform.tfstate" },
    { "Sid": "TfLockDynamoDb", "Effect": "Allow",
      "Action": ["dynamodb:GetItem","dynamodb:PutItem","dynamodb:DeleteItem"],
      "Resource": "arn:aws:dynamodb:eu-central-1:*:table/cwf-langfuse-tflock" },
    { "Sid": "PassInstanceRole", "Effect": "Allow",
      "Action": ["iam:PassRole","iam:CreateRole","iam:GetRole","iam:DeleteRole","iam:PutRolePolicy","iam:GetRolePolicy","iam:DeleteRolePolicy","iam:ListRolePolicies","iam:ListAttachedRolePolicies","iam:ListInstanceProfilesForRole","iam:CreateInstanceProfile","iam:GetInstanceProfile","iam:DeleteInstanceProfile","iam:AddRoleToInstanceProfile","iam:RemoveRoleFromInstanceProfile","iam:TagRole"],
      "Resource": ["arn:aws:iam::*:role/cwf-langfuse-*","arn:aws:iam::*:instance-profile/cwf-langfuse-*"] }
  ]
}
```

6. **Next** → **Policy name:** `cwf-langfuse-bootstrap` → **Create policy**. Close this tab.
7. Back on the user tab, click the **refresh** icon next to the policy list, search `cwf-langfuse-bootstrap`, tick its checkbox → **Next** → **Create user**.
8. Open the user you just made → **Security credentials** tab → **Access keys** → **Create access key**.
9. Choose **Command Line Interface (CLI)**, tick the confirmation box → **Next** → **Create access key**.
10. You'll see **Access key** and **Secret access key**, each with a copy button. **This is the only time the secret is shown.** Keep this page open for Step 3 (or use the **Download .csv** button). Do **not** paste these anywhere except Step 3.

---

## STEP 3 — Put the key in GitHub secrets

The deploy reads the key from here at run time. It never touches your machine or any chat.

1. Go to `https://github.com/maymun207/cwf_yaprak` → **Settings** → left menu **Secrets and variables** → **Actions**.
2. **New repository secret**:
   - **Name:** `AWS_LANGFUSE_BOOTSTRAP_KEY_ID` → **Secret:** paste the **Access key** (the shorter one) → **Add secret**.
3. **New repository secret** again:
   - **Name:** `AWS_LANGFUSE_BOOTSTRAP_KEY_SECRET` → **Secret:** paste the **Secret access key** (the longer one) → **Add secret**.

Names must be **exact** (the workflow looks them up by name). You can now close the AWS access-key page.

---

## STEP 4 — Run the deploy (GitHub Actions)

1. In the repo, top tab **Actions** → left list → **deploy-langfuse**.
2. Right side → **Run workflow** dropdown.
3. In the **confirm** box, type exactly `apply` (this is a deliberate safety guard — it won't run otherwise) → **Run workflow**.
4. Click into the running job. It takes **~10–15 minutes** (CloudFront is the slow part). Watch the steps go green. When the whole run has a green check, it's done.

> If it fails, open the failed step, copy the error, and **send it to me** — I'll give you the exact fix. Don't re-run blindly.

---

## STEP 5 — Grab the two non-secret outputs

1. On the finished run, scroll to the **Summary** (top of the run page). Under **"Langfuse host provisioned"** you'll see:
   - **LANGFUSE_HOST** — a `https://xxxxx.cloudfront.net` URL
   - **LANGFUSE_PROJECT_ID**
   - (also OTLP ingest + EC2 instance id — you don't need those)
2. Copy **LANGFUSE_HOST** and **LANGFUSE_PROJECT_ID** somewhere handy for Step 7.

---

## STEP 6 — Fetch the two Langfuse keys (one command)

Back in **CloudShell** (Step 1's tab, or reopen it), paste this single command:

```bash
aws ssm get-parameter --region eu-central-1 --name /cwf/langfuse/vercel-keys \
  --with-decryption --query Parameter.Value --output text
```

**What you'll see:** exactly two lines —
```
LANGFUSE_PUBLIC_KEY=pk-lf-…
LANGFUSE_SECRET_KEY=sk-lf-…
```
Copy both values for Step 7. (These are secrets — keep them to the CloudShell + Vercel; never a chat.)

---

## STEP 7 — Point Vercel production at the AWS host

1. Open your Vercel project → **Settings** → **Environment Variables**.
2. Add / update these **four**, all scoped to **Production**:
   - `LANGFUSE_HOST` = the CloudFront URL from Step 5
   - `LANGFUSE_PROJECT_ID` = from Step 5
   - `LANGFUSE_PUBLIC_KEY` = from Step 6
   - `LANGFUSE_SECRET_KEY` = from Step 6
3. **Redeploy production** so the new env takes effect (Vercel → Deployments → redeploy latest, or push any commit). Env changes don't apply until a redeploy.

---

## STEP 8 — Disable the bootstrap key (REQUIRED — do not skip)

The key was one-shot; leaving it live is the one real security risk. Disable it now.

1. AWS → **IAM** → **Users** → `cwf-langfuse-bootstrap` → **Security credentials**.
2. Under **Access keys**, on the key you created → **Actions** → **Deactivate** (or **Delete** — cleaner).

Done. If we ever need to re-deploy, you'll make a fresh key the same way.

---

## STEP 9 — Tell me it's done

Message me **"cutover done"**. I then verify (you don't do this — I pull it myself):
- A production span appears in the Langfuse UI on the new CloudFront host after a real turn (RULE-27 evidence, permanent host).
- Clicking a turn row in the admin **Inspect** tab lands on that turn's Langfuse trace, showing the full stage waterfall **including the per-attempt retry structure** — the "dream dashboard."
I read this from Vercel logs + the Langfuse trace and report back.

---

## Known limitation (not a problem for our goal)
Trace **media images** (if any) are served by the host's internal MinIO on a localhost port, so they won't render through the single CloudFront origin. This does **not** affect the span waterfall — our actual MICRO-1 goal — and is tracked as a later item.

## What NOT to do
- Don't paste any AWS key or Langfuse key into a chat with me or AG.
- Don't re-run the deploy workflow "to be safe" — it manages live infra; ask me first.
- Don't rename the S3 bucket yourself if it's taken — tell me (three files must stay in sync).
