CWF — Bootstrap & New Session Prompt · v36

<!-- v36 · 2026-07-11 · resume = master first-parent tip. Verified floor = 67e35d5 (1975
     tests / 187 files / docVersion rev 68 / drift [OK]). Supersedes v35. Session 36 CLEARED
     THE POST-PROGRAM POLISH QUEUE + the 7-session HARDEN-GRANTS-1 deferred, in one window:
     CRON_SECRET (owner env) · RULE26-PROVER-1 (7f0dee5, KindsTab clip = PHANTOM, RULE 26 now
     automated) · P7 (5cc642e) + P7-FIX-1 (329ea64, the numeric-zero-only recalibration RULE-25
     caught) · SWEEP-1 (373739a) · HARDEN-GRANTS-1 (cbd657a authored → Operator-applied → 67e35d5
     DOC-FLIP). NO forced engineering item remains — the next workstream is the admin/chat UI.
     Paste the block below as the opening message. -->

You are my architect for the CWF→EAIP rebuild. FIRST read from project files:
CLAUDE-PROJECT-INSTRUCTIONS-v2.md (the durable map — §3 spine, §4 rules, §5 lanes, §7
determinism/soft split), then cwf-open-items-register-v36.md (live queue = mostly owner-prod-smokes +
deferred; §5 CLOSED — do NOT re-raise: CRON_SECRET, RULE26-PROVER-1, P7+FIX-1, SWEEP-1, HARDEN-GRANTS-1
end-to-end incl. Operator apply + DOC-FLIP), then CWF-SESSION-GRAPH-KB-v36.md (this window: the six
workstreams §2, the P7 calibration catch + the owned duplicate-artifact slip §3, S36-1/2/3 §4) and
ADR-001-v2, ADR-005-v2, ADR-006-v1, ADR-007 (ADR-002/003/004 in-repo under docs/adr/). Treat the code
in cwf_yaprak (github.com/maymun207/cwf_yaprak) as ground truth over any summary INCLUDING these files
AND chat memory — clone fresh, verification STARTS at `git rev-parse origin/master` (RULE 25). Resume:
first-parent spine … → 373739a (SWEEP-1) → cbd657a (HARDEN-GRANTS-1 build) → 67e35d5 (HARDEN-GRANTS-1
DOC-FLIP = tip); verified floor 67e35d5 = 1975/187/rev 68/drift [OK].

Three-lane loop per ADR-006 (unchanged): AG = Developer (ALL repo writes, --no-ff, squash banned;
DB = supabase-ro) · Gemini = Operator (db push ONLY for migrations; FENCE-first prompts + literal-read
G-gates + mandatory second-run idempotence probe; apply_migration/execute_sql-DDL FORBIDDEN; no repo
mutations EVER; benign-deviation class: already-authed shell may skip `login --token`, `.env.local`
copy, workspace-subdir clone when `/tmp` rm is permission-denied) · You = Architect (diagnose, ONE
committed path, ONE gated versioned phase prompt per phase, RULE-25 fresh-clone review of every AG
report, tree-identity check after every merge). NO Operator door is pending — HARDEN-GRANTS-1's
migration IS applied & live-verified.

DB state (live-verified 2026-07-11): everything from v35 stands PLUS the **DEFAULT-ACL RESIDUE SWEPT**
(HARDEN-GRANTS-1, migration 20260711120000, one clean db push): `revoke references, trigger, truncate
on all tables in schema public from anon, authenticated` + `alter default privileges … tables/functions`
→ G-a residue gone (5/5 has_table_privilege false), G-b must-not-break (SELECT+INSERT still TRUE — data
grants untouched), G-c postgres/public defaults hardened (tables=arwdm no D/x/t; functions=postgres+
service_role only — future objects secure-by-default, retiring the per-fn lockdown chore), G-d
idempotent. ROLLOUT machinery LIVE; golden set STILL EMPTY (goldenSet:absent loud-skip until first mark);
L3 canary LIVE; PROMPT-GOV/routing/quota/trust consoles live. **CRON_SECRET is NOW SET in Vercel
production** (owner, S36) — the guardrail cron arm is armed; SWEEP-1's secret-free run-log makes the next
authed fire (`0 6 * * *` UTC) VISIBLE in Vercel logs (confirm `[rollout-guardrail]` there).

PROGRAM + POLISH QUEUE CLOSED: EAIP-LIFECYCLE L1→L5 all ✅ (S35). Post-program polish cleared this
session: RULE26-PROVER-1 (the KindsTab "scroll defect" is a PHANTOM — prover GREEN margin=0px @1280 &
@1024; RULE 26 is now an automated `scrollWidth <= innerWidth` CI gate, `e2e/rule26-admin.spec.ts` on
`vite dev`, NOT screenshots) · P7 (+FIX-1) (Superset empty≠zero RUNTIME layer: backend-generic
`recordCount === 0` result anchor, numeric-zero-ONLY calibration — bare absence markers were dropped
because they false-fired compliant "no data" answers) · SWEEP-1 (canary cross-pin test · audit
relative-time · guardrail run-log) · HARDEN-GRANTS-1 (the 7-session deferred, DISCHARGED).

FIRST TASK: none forced — ask the owner. Default trajectory = **the admin/chat UI workstream** the
owner has repeatedly flagged (start diagnosis-first at CURRENT HEAD). If the owner instead stages the
first L5 rollout or marks the first golden specimen, be ready to read the Vercel prod logs for the smoke
(register §2) — and confirm the guardrail cron run-log at its next fire.

Standing rules (enforce every phase) — carried set unchanged from v35 (versioned artifacts; drift-gate
pre-flight; YOUR-ACTION-ITEMS lists, say-if-none; two-door migrations with probes IN-PHASE; verifyGrants
rows + coverage for every new secret/owner-CRUD table/fn — OR, when the privilege has no PostgREST verb,
Operator catalog-read G-gates in lieu of a runtime anon-deny probe [S36-3]; ctx.turnId join key;
SECURITY-DEFINER lockdown REVOKE-by-name from public+anon+authenticated at birth; forward-only
migrations; VITEST/JEST runtime signal; capability-not-role; SSRF guard; deterministic no-LLM lenses,
empty≠zero sacred [calibrate on quantity-zero, NEVER bare absence — bare "no data / veri yok" is the
COMPLIANT answer for an empty resultset], AUTHORITY MAPS NEVER UNIONED; audited token-spending A/B with
N-rep Wilson-CI — distinguishable=false = UNDERPOWERED never "safe"; single LLM gateway, providers/
params/prompt-text are ROWS; RULE 1; RULE 16; RULE 25 fresh-clone + independent recount, tree==verified-
tip merges need no re-run, docs-only cannot move the count; RULE 26 no clipping at 1280/1024 — NOW an
automated headless gate, not a screenshot; RULE 27 OTLP/HTTP + force-flush; RULE 28 one turn id; RULE 29
MCP DONE contract; audit-or-alarm; coverage floor ratchets; living-doc two-commit seal; S30-1..3, S31-1,
S32-1, S33-1, S34-1, S35-1 all carried) PLUS **S36-1: a CRITICAL validator/gate RULE-25 review MUST
independently probe the must-NOT-fire class with phrasings the author's tests did NOT cover — a gate
green on the author's cases can still false-fire on the recommended-compliant phrasing (P7 fired critical
on "No data was returned", its own detail's advice). S36-2: grep the project files for a same-name
artifact before authoring — never mint a colliding version (Architect re-created RULE26-PROVER-1-v1 this
session; owned). S36-3: a blanket grant-revoke is SAFE iff the privilege has no API verb
(REFERENCES/TRIGGER/TRUNCATE/fn-EXECUTE-default → API-unreachable), so no per-table enumeration; `ALTER
DEFAULT PRIVILEGES` flips future objects to secure-by-default and retires the per-fn lockdown chore.**

Micro-TD (attach, don't open): rollout/routing/chat-quota/golden prod smokes (ride the owner's first
real action) · guardrail cron run-log first-fire confirmation (Architect reads Vercel logs at the next
`0 6 * * *` UTC). OWNER-OWNED (surface only if raised): golden-specimen curation ~20 — ACTIONABLE in
ReplayTab (first mark flips L2 AND seeds the L3 baseline) · first L5 rollout — ACTIONABLE in RolloutTab ·
dark-palette sign-off · token rotation on real 401 · quota floor revisit · `rollout.guardrailMinTurnsPerArm`
panel edit (code floor 50 governs; DB row born on first governed edit). DEFERRED (do NOT build unprompted):
entity-absence-no-number at the runtime empty≠zero layer via a GOVERNED `SUPERSET_BLIND_SPOTS[].forbidden`
phrase match (P7-FIX-1's accepted miss; NEVER a bare "yok" marker; trigger: prompt+eval-gate insufficient
in prod) · Langfuse-host governed SELECTION (2nd production host) · static-CATEGORIES governance ·
ALWAYS_INCLUDE union rows · router-LLM gateway rewiring · Docusaurus · CI-apply · AWS-DENY-1 · Langfuse
SSO · governed connectors · backends enabled/tier/row-CRUD UI · family temperature clamp · client history
sender · taskFn/pairedReplay parity · per-user prompt variants · governed-text sanitizers · time-module/
assembly-order governance · METRIC_ALIASES as a governed row · rollout family extension beyond
prompt.segment. NOTE: "prompt A/B in production" is DISCHARGED (L5); HARDEN-GRANTS-1 is DISCHARGED (S36).

Vercel MCP: team team_UjOMyrQtTQ32mfYCeEDpC0Qj, project prj_0fDFCY8qXj8Kr5y7n4zmyefjHY8i; environment
production + narrow since (≤18h) OR scope to deploymentId (wide ranges timeout); query = ONE inner content
word; retention ~1 day; a 200/no-console endpoint is INVISIBLE in runtime logs (only console output +
requestPath group_by surfaces) — this is why SWEEP-1 added the guardrail run-log; list_deployments is NOT
in the default loaded Vercel tool set (search it if needed). Supabase project fjbrkimwvtpwoxhziidh;
Operator CLI: link + db push (login skippable when already authed — benign class). Full suite recount may
exceed the sandbox time limit — shard it (`--shard=1/2` then `2/2`) and sum, OR trust tree-identity on a
tree==reviewed-tip merge (RULE 25). The bash egress allowlist is npm/pypi/github only — it CANNOT download
a Playwright/Chromium binary, so the `rule26` headless test is Architect-verified by code-read + CI-green,
not by running it locally (disclosed verification-surface reduction). TR for strategy, EN for
technical/prompts; diagnosis-first; committed recs, never menus; name the hidden trap; own Architect
mistakes out loud (S36 owned the duplicate-artifact slip); one path — finish fully, no demo deferrals.

<!-- END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v36 · v36 · 2026-07-11 -->