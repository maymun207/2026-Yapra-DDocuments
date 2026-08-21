# DOC-FLIP — HARDEN-GRANTS-1 applied & live-verified
**claude-code-HARDEN-GRANTS-1-DOC-FLIP-applied-live-verified · v1 · 2026-07-11 · AG-lane · docs/comment-only**

> The Operator (Gemini) applied `20260711120000_harden_grants_default_acl_sweep.sql` incident-free, all
> G-gates GREEN (Architect RULE-25-confirmed from the literal reads). Flip the docs so they stop saying
> "Operator-pending". Comment/doc-only — no executable/schema change.

## 0 · BOOTSTRAP
```
cd /tmp && rm -rf cwf_yaprak && git clone --quiet https://github.com/maymun207/cwf_yaprak && cd cwf_yaprak
git rev-parse origin/master        # MUST be cbd657a0efc2089ca4d588f0b9a2f5332a56ce52
```
Branch off master; `--no-ff`; squash BANNED.

## 1 · THE FLIP (three doc surfaces + the migration STATUS comment)
Replace every "authored, Operator-pending" posture for HARDEN-GRANTS-1 with the applied record. The
verified evidence to embed (from the Operator's literal G-gate reads, 2026-07-11):

> Applied via one clean `supabase db push` (only `20260711120000…` pending), incident-free.
> **G-a** residue GONE — `has_table_privilege('authenticated'|'anon', 'public.conversations'|'public.publish_rollouts', 'TRUNCATE'|'REFERENCES'|'TRIGGER')` = **false** (5/5).
> **G-b** must-NOT-break — `…'public.conversations','SELECT'` and `…'INSERT'` = **true** (data grants untouched).
> **G-c** defaults altered — the postgres/public TABLES default now grants anon/authenticated `arwdm`
> (no `D`/`x`/`t` = no TRUNCATE/REFERENCES/TRIGGER); the FUNCTIONS default grants EXECUTE to
> postgres+service_role ONLY (anon/authenticated/public omitted).
> **G-d** idempotent — second `db push` = "Remote database is up to date."
> One benign Operator deviation (workspace-subdir clone).

Surfaces:
- **The migration header** `supabase/migrations/20260711120000_harden_grants_default_acl_sweep.sql`:
  `STATUS: authored, Operator-pending.` → `STATUS: applied & live-verified 2026-07-11 (one clean db push;
  G-a 5/5 false · G-b SELECT+INSERT true · G-c postgres/public tables=arwdm [no D/x/t] + functions=postgres+service_role only · G-d idempotent).`
- **SKILL-KB** (`.agents/skills/cwf-project-kb/SKILL.md`): the `[AUTHORED 2026-07-11 …]` note → `[APPLIED &
  LIVE-VERIFIED 2026-07-11 …]` with the G-gate summary; and the §HARDEN-GRANTS-1 section's status line.
- **CHANGELOG** (`.agents/CHANGELOG.md`): add the apply/verify confirmation under the PHASE HARDEN-GRANTS-1
  entry (What stays; append Verify = the G-a…G-d live results).
- **AGENTS.md**: if its HARDEN-GRANTS-1 bullet said "authored/pending", flip to applied.

## 2 · SEAL / DRIFT
- These are `.agents/**` + `supabase/migrations/**` — neither maps a sealed code tab's codeAreas. Expect
  NO reseal, docVersion stays rev 68. But RUN `check:doc-drift` and CONFIRM `[OK]`; if any narrative tab
  actually moved, honor the two-commit seal (S34-1 AST-strip per S35-1) and report the rev bump.
- No vitest change (docs-only) → count stays 1975/187.

## 3 · SELF-VERIFY / REPORT
1. `git rev-parse origin/master` = `cbd657a…` at start.
2. `grep -rn "Operator-pending" supabase/migrations/20260711120000_*.sql .agents/` = EMPTY for
   HARDEN-GRANTS-1 (the flip is complete; no stale "pending" survives).
3. `check:doc-drift` `[OK]`; count 1975/187 unchanged; rev 68 (or the bump + reseal proof if a tab moved).
4. Remote HEAD after `--no-ff` merge + push (tree-identity: the merged tree == the pre-merge worktree,
   since this is docs/comment-only).

<!-- END · claude-code-HARDEN-GRANTS-1-DOC-FLIP-applied-live-verified · v1 · 2026-07-11 -->
