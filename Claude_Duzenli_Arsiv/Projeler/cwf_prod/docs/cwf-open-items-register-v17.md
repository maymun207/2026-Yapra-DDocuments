# CWF — Open Items Register
**cwf-open-items-register-v17 · rev 17 · 2026-07-05 · supersedes v16 (`a878cae`→`dcb114b`: MICRO-1 all build-only sub-phases shipped; AWS cutover pending Maymun's walkthrough)**
**State anchor:** `origin/master` = `dcb114b` · 759/759 tests (78 files) · docVersion rev 35 · drift `[OK]` · **MICRO-1 build-only COMPLETE (stream-attempt/grounding spans + admin deep-link + AWS Langfuse host IaC + remote-state + single-fetch keys) — the AWS host is NOT yet provisioned; the cutover is Maymun's next action.**

---

## OPEN — committed queue (in order)
| # | Item | Owner | Notes |
|---|---|---|---|
| 1 | **MICRO-1 CUTOVER — provision the AWS host + wire Vercel + verify** | **Maymun** (one guided AWS session) → then **Claude** verifies | ALL build-only work is landed on master. Remaining = Maymun executes **`cwf-aws-langfuse-bootstrap-walkthrough-v1`** (state bucket/lock → scoped IAM key → 2 GitHub secrets → one typed-`apply` `workflow_dispatch` → 4 Vercel env vars → **disable the bootstrap key**). Then **Claude closes the C1/C2 evidence gate** (pulls it himself, owner does not): (C1) a prod span visible in the Langfuse UI on the permanent CloudFront host after force-flush; (C2) an Inspect-tab turn-row deep-link lands on that trace showing the full waterfall **incl. the per-attempt `cwf.stream.attempt` retry structure**; confirm 90-day retention; confirm the `LANGFUSE_HOST`/`PROJECT_ID` swap in Vercel prod via Vercel logs. On green → **MICRO-1 CLOSES**; then the register/KB bump records the close + the two cloud-MCP decisions below. |
| 2 | **P7 — Superset empty≠zero runtime validator** | Claude (design) | 3rd defense layer (today: prompt + eval-gate). No fragile regex bolt-on; proper design in P7. ARMES has 3 layers, Superset has 2 — close the gap. Unchanged from v16. |

## OPEN — going-forward architecture of record (Maymun CONFIRMED this session; record at MICRO-1 close)
| Item | Decision |
|---|---|
| **Cloud-infra MCP invariant (cloud-agnostic)** | Infrastructure-management MCP is selected by **where the target infra lives**, not by dev-tooling brand or preference. Shape: **MCP *authors/validates* IaC → CI *applies*.** Live-CRUDL / autonomous-agent-apply is REJECTED as a standing mechanism (re-crosses the lane boundary + the injection surface we fence). Read-only diagnostics MCP is additive (like Claude reading Vercel logs). **Near-term instantiation = AWS IAC MCP** (our infra = Supabase/AWS + Vercel + the new AWS Langfuse host). Verified facts (2026): AWS CCAPI live-CRUDL MCP **deprecated** → AWS IAC MCP (authoring/validation, cfn-lint/cfn-guard); GCP fully-managed remote MCP servers **GA** (Maps/BigQuery/GCE/GKE + DB servers), **Model Armor** (platform-level indirect-injection firewall), **Developer Knowledge MCP** (grounding vs deprecated commands). |
| **OPEN strategic question — which cloud for NEW EAIP components** | Genuinely open, not settled. GCP is a **serious candidate** for greenfield EAIP components: dev-loop is already Google (AntiGravity/Gemini native) + **Model Armor** brings platform-level indirect-injection defense that aligns with our #1 architectural obsession (the A2/ADR-001 injection boundary, which we built in deterministic code). Not a commitment — a flagged decision for when a new component is actually specced. |

## OPEN — HARDEN-LATER (AWS Langfuse host — tracked in `infra/aws/langfuse/README.md`, deliberately NOT built)
| # | Item | Why deferred |
|---|---|---|
| 1 | **GitHub OIDC → AWS role assumption** (drop the stored `AWS_LANGFUSE_BOOTSTRAP_KEY_*` secret; zero stored AWS secret) | The stored-key path is the weaker option chosen only for the first bootstrap; the one-shot + immediate-disable operational control covers the window. OIDC is the structural fix. |
| 2 | **Permissions boundary on `cwf-langfuse-*` roles** | The named privesc backstop: the bootstrap policy's `iam:PutRolePolicy`+`iam:PassRole` (role-name-scoped) can self-author an admin policy on a passable role IF the CI secret leaks in the bootstrap window. Accepted for a one-shot key (runtime role is genuinely minimal); the boundary is the clean structural close. Needs an agreed boundary policy. |
| 3 | **CloudFront ↔ origin shared-secret header** | The SG restricts ingress to the CloudFront prefix list, but any CF distribution can reach the origin. Bind this distribution with a secret custom header verified at the origin. |
| 4 | **MinIO media external endpoint** | The reused compose serves trace *media* from `:9090` (localhost) → media images won't render through the single CloudFront origin. **Non-blocking for the span waterfall** (the MICRO-1 goal); revisit only if media rendering is needed. |

## OPEN — fold into next touching phase (no standalone patches)
| Item | Fold into |
|---|---|
| **"drift gate green" mandatory pre-flight line** (standing — trivially cheap; content-hash markers killed the shallow-clone failure class). | every phase prompt henceforth |
| GAP-4 prose fix: "adding a backend = a row + a pack + one registration". | first architecture doc touched **that actually contains the stale phrasing** (confirmed ABSENT from blueprint §07 this session — still tracked, no-op there). |
| `[ToolFilter] 🧠 Learned` log lines duplicated per turn (cosmetic noise). | any future toolFilter-touching phase — dedup emit |
| Nested-I/O allow-list depth: per-key fail-closed accepted as correct default. | amend ONLY if a real attribute hits live |

## OPEN — needs owner input / awaiting decision
| Item | Detail |
|---|---|
| **F3 — vanished audit row** (`a8798c1d`, run `9d115773`) | REPLAY-B's happy-path `replay_audit` row went GONE (CHAR-1 pre-count 0 not 1). Service-role-only deletion, cause unknown. Healthy baseline to diff against: OBS-3.1 Gate B recorded `replay_audit` 11→14 across 3 live arms (one clean increment/run). Flagged for owner review; not blocking. Unchanged from v16. |

## OPEN — Maymun's desk (small)
| Item | Detail |
|---|---|
| Stale ARMES token in IDE MCP config | Fresh token initially went to the IDE ("global MCP settings") — harmless but useless there; remove it. Real fix landed in Supabase. (Carried from v13.) |
| Empty `yaprakdev`/`AgentTune` **local** Langfuse org/project | Auto-created during the login saga; zero data, safe to delete (or leave — harmless). Note: this is the LOCAL Docker Langfuse; the MICRO-1 AWS host is separate, so this is not auto-moot. |
| AG local-only leftover branches (`char-1-findings`, `obs31-prod-wirein`) | **Not on origin** (shared repo is clean — master only). AG can `git branch -d` them locally; not a shared-state concern. |

## CLOSED 2026-07-05 (do not re-raise)
- **MICRO-1 build-only — ALL sub-phases shipped** (`a878cae`→`dcb114b`). The AWS **cutover** is a separate open item (#1 above); the CODE is done and reviewed:
  - **Sub-phase A** (`3a53f92`): `cwf.stream.attempt` (×N) + `cwf.grounding` spans inside `runStreamStage` — the trace waterfall now reads `cwf.stage.stream → cwf.stream.attempt → cwf.grounding`, side-effect-only (retry `break`/`continue` byte-identical). **Required fix landed:** `empty`/`finish_reason` set synchronously BEFORE `span.end` (the `onFinish` closure is timing-unordered; setting attrs on an ended span is a silent OTel no-op) — guarded by `stageStreamSpanAttrs.test.ts` (a `setTimeout(0)` macrotask reproduces the race; real guard, fails pre-fix). InspectTab trace deep-link activated (gated non-secret `api/admin/observability.ts` endpoint, host+project-id from env at request time, keys NEVER served — asserted; graceful-off honest note). Blueprint §07 redrawn to the Gate-B placement-effect outcome. docVersion rev 35, 759/759.
  - **Sub-phase B** (`fc69230`): AWS Langfuse host IaC (`infra/aws/langfuse/`) — 1× EC2 t3.xlarge running the existing compose, **CloudFront default-cert `*.cloudfront.net` (zero-domain HTTPS, ACM trap avoided)**, gp3 100 GB, host env via SSM SecureString (nothing in repo/AMI/userdata), **runtime instance role exemplary least-priv** (SSM Session Manager + read own params + `kms:Decrypt` via-SSM; **no public SSH**). `workflow_dispatch`-only deploy (typed-`apply` guard used only in `if:` → no injection surface). **Scoped bootstrap IAM policy** — full security-reviewed: region-pinned EC2, SSM `/cwf/langfuse/*`-scoped, `PassRole` role-name-scoped (arbitrary-admin-role vector closed).
  - **Sub-phase C-prep** (`e7a53b8`): **remote S3 state backend + DynamoDB lock** (Claude's finding: local ephemeral state on the CI runner → host unmanageable-by-Terraform post-apply → defeats the declarative guarantee that justified Terraform). Scoped `Tf*` IAM (state object scoped to the exact `…/langfuse/terraform.tfstate` key; no CreateBucket/CreateTable — out-of-band; no `"*"`). Permissions-boundary moved to explicit HARDEN-LATER.
  - **Single-fetch Vercel keys** (`dcb114b`): post-apply workflow step writes ONLY the two Langfuse keys to SSM `/cwf/langfuse/vercel-keys` (masked, value via `file://`, `umask 077`+`rm`, **zero IAM change** — verified byte-identical policy) → Maymun retrieves both with one guided CloudShell command.
  - **Walkthrough delivered:** `cwf-aws-langfuse-bootstrap-walkthrough-v1` (screen-by-screen, non-AWS user).
- **Blueprint §07 DOC-DEBT — CLOSED** (redrawn in Sub-phase A to `{ none (control) · reanchor (ADOPTED) · directive (REJECTED) }` + the placement-effect finding).
- Carried-closed from v16 (still do not re-raise): OBS-3.1 A+B+C (reanchor ADOPTED, placement effect) · REPLAY-B · `replay_audit` DDL · CHAR-1 · F-obs1/PROBE-OBS/F-obs2/F-obs3 · ARMES prod (141 tools, OEE chain — reconfirmed LIVE in prod logs this session; the map §6 "401/Superset-only degraded" red line is STALE, doc-only) · Superset seed · OA-8 dev half · Playwright MCP disabled · Instructions v2.

## STANDING WATCH
- Gemini operator fence: sanctioned tasks ONLY, no self-initiated cleanup. Migrations = Operator-lane.
- **AWS host operational (NEW):** S3 bucket names are GLOBALLY unique — if `cwf-langfuse-tfstate` is taken, rename in `backend.hcl` + the 2 S3 policy ARNs together (do NOT let Maymun rename solo). Bootstrap key is one-shot → disable/delete immediately after a successful apply (privesc window control). The deploy workflow manages live paid infra — never re-run casually.
- gpt-4.1-mini `call_tool(search_tools)` self-correct in prod → future replay-lab experiment material.
- Node drift AG v26.x vs v22.x spec; green — don't touch while green.
- **F2 lab-env trap** + `@ai-sdk/google` reads `GOOGLE_GENERATIVE_AI_API_KEY` not `GEMINI_API_KEY` (a google-provider env check needs BOTH) — carry into any lab-run phase.
- **Direct-engine replay-invocation caveat** (Gate-B): engine run directly + audit write replicated; a future run validating the endpoint's RBAC+audit TRANSPORT must go through HTTP.
- **Replay grounding fidelity gap:** no server config in recording → scope-divergence AUTHORITY branch can't attribute; body-flag checks faithful; absolute scope-divergence rates from replay not trustworthy.
- claude.ai MCP servers (Gmail/Calendar/Drive/Vercel) need re-auth via connector settings if wanted back.
