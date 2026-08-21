# claude-code · Q-1 DOC-FLIP — applied & live-verified (unsanitized) · v1

<!-- claude-code-Q1-DOC-FLIP-applied-live-verified-v1 · rev 1 · 2026-07-09
     Docs-only status flip after the Operator's two apply runs. L1 DOC-FLIP precedent:
     honest history, never sanitize. -->

## Pre-flight
`git fetch && git rev-parse origin/master` → `54d6f9ce947161069f254fd3fefa801396710c24`
(moved → STOP). Clean tree; branch `docs/q1-flip` off the pin. Baseline 1503/152, drift `[OK]`.

## Hard constraints
- **Docs-only**: touch ONLY `.agents/CHANGELOG.md` + `.agents/skills/cwf-project-kb/SKILL.md`.
- **Applied migrations are IMMUTABLE** — the `STATUS: authored, Operator-pending` lines inside
  `20260709160000` and `20260709170000` are point-in-time authoring records and stay UNTOUCHED.
  The CHANGELOG/SKILL are the living status.
- Never sanitize: the flip text carries the FULL chain (apply → probe catch → FIX → 33/33).
- Suite count CANNOT move (docs-only rule): 1503/152 before and after. No reseal
  (both files unmapped; drift stays `[OK]`, docVersion stays rev 56).

## The flip (grep-align EVERY Q-1/Q1-FIX-1 "Operator-pending" occurrence in the two files)
Replace each status with **"applied & seeded — live-verified 2026-07-09"** carrying this
evidence chain (adapt per location; keep it one honest sentence-set, not a euphemism):

> Applied via the Operator door in two `db push` runs. Run 1 (`20260709160000` + the seed):
> table present · 5 fns present · 3 published `quota.chat*` v1 rows (10000 / 5000000 / 200000)
> — but the HARDEN-FN-PROBE-1 live gate then FAILED 5 probes (4× LEAK + 1× 23503 INCONCLUSIVE):
> the migration had revoked EXECUTE from PUBLIC only (Architect spec regression — the pre-FIX-2
> pattern), leaving Supabase's by-name `anon`/`authenticated` `pg_default_acl` grants live; the
> Operator STOPPED per fence. Same-day Q1-FIX-1 (`20260709170000`, revokes-only) applied in
> run 2: `db push` clean · dry-run "up to date" · `pg_proc.proacl` = `{postgres, service_role}`
> only on all 5 · `verifyGrants` **33/33** (the reserve probe's 23503 flipped to 42501 —
> EXECUTE now denies before the body) · ledger tamper-glance rows=0 / consumed=0 (the
> exposure-window minutes saw zero writes). The chat gate is LIVE (metered; degraded mode ended).

Locations (grep, don't assume): CHANGELOG Q-1 §3.3 status line · CHANGELOG Q-1 Verify-paragraph
"DB state:" sentence + its Operator to-do list (rewrite as done-with-evidence) · CHANGELOG
Q1-FIX-1 "Status:" line · SKILL.md Q-1 section's "both authored, Operator-pending" clause
(+ one honest parenthetical for the lockdown incident + 33/33). If grep finds any other
occurrence, align it and list it in the report.

## Self-verify + seal
1. `git diff --stat 54d6f9c..HEAD` = exactly the 2 files; paste it.
2. `grep -rn "Operator-pending" .agents/` → ONLY hits inside migration-file quotes/history
   context if any remain intentional — list every remaining hit with a one-line justification;
   zero unexplained hits.
3. Suite 1503/152 unchanged · drift `[OK]` · docVersion literal `rev 56`.
4. ONE commit → merge `--no-ff` with EXPLICIT merge message:
   `Merge docs/q1-flip: Q-1 DOC-FLIP — migration+seed+lockdown applied & live-verified (unsanitized: PUBLIC-only revoke spec regression → 5 probe fails → same-day Q1-FIX-1 → proacl clean + verifyGrants 33/33 + tamper-glance 0/0; docs-only, 2 files)`
   → push master → report merge sha + remote hash (Architect tree-checks).

<!-- END · claude-code-Q1-DOC-FLIP-applied-live-verified-v1 · rev 1 · 2026-07-09 -->
