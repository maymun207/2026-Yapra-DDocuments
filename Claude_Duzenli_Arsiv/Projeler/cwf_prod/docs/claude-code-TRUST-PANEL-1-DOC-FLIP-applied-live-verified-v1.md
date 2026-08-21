# claude-code · TRUST-PANEL-1 DOC-FLIP — applied & live-verified · v1

<!-- claude-code-TRUST-PANEL-1-DOC-FLIP-applied-live-verified-v1 · rev 1 · 2026-07-10 -->

## Pre-flight
`git fetch && git rev-parse origin/master` → `3eb887b3ef65921783e394daca19a118aa8b7e79`
(moved → STOP). Clean tree; branch `docs/trust-panel-flip` off the pin. Baseline 1561/156,
drift `[OK]`, docVersion rev 57.

## Constraints
Docs-only: `.agents/CHANGELOG.md` + `.agents/skills/cwf-project-kb/SKILL.md` ONLY. The
migration file's STATUS header stays UNTOUCHED (immutable authoring record). Suite count
CANNOT move (1561/156 before/after); no reseal (docVersion stays rev 57); never sanitize —
this one is incident-FREE, say exactly that (the contrast with Q-1 is part of the honest record).

## The flip (grep-align every TRUST-PANEL-1 "Operator-pending" occurrence in the two files)
Replace with **"applied — live-verified 2026-07-10"** carrying:
> Applied via the Operator door in ONE clean `db push` run (`20260709180000`): dry-run
> "up to date" · table present, RLS enabled, **policy_count 0** (service-role-only both
> directions, by design) · unified probe run **36/36** — the three trust-table probes
> (backends · backend_authority · backend_trust_audit) all DENIED 42501 on their first live
> exercise after the exemption unification · audit ledger glance 0 rows. Incident-free
> (contrast: the Q-1 lockdown chain); the migrationFnLockdown author-time gate had nothing to
> catch because the phase shipped ZERO new SQL functions by design. The trust console is LIVE:
> every grant/revoke/reset now runs audit-first against the real ledger.

If grep finds occurrences beyond the two files' TRUST-PANEL-1 sections, align and list them.

## Self-verify + seal
1. `git diff --stat 3eb887b..HEAD` = exactly the 2 files; paste.
2. `grep -rn "Operator-pending" .agents/` — only the previously-justified historical/quote hits
   remain; list each with its standing justification; zero unexplained.
3. Suite 1561/156 unchanged · drift `[OK]` · docVersion literal `rev 57`.
4. ONE commit → merge `--no-ff` with EXPLICIT message:
   `Merge docs/trust-panel-flip: TRUST-PANEL-1 DOC-FLIP — backend_trust_audit applied & live-verified 2026-07-10 (one clean db push, RLS on / 0 policies, unified probes 36/36, audit ledger 0 rows; incident-free; docs-only, 2 files)`
   → push master → report merge sha + remote hash (Architect tree-checks).

<!-- END · claude-code-TRUST-PANEL-1-DOC-FLIP-applied-live-verified-v1 · rev 1 · 2026-07-10 -->
