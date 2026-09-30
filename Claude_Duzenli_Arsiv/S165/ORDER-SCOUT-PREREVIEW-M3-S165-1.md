<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-PREREVIEW-M3-S165-1

LANE: scout-1 (the scout-1 window ONLY; scout-2 prints "NOT MINE: scout-1 order" and stops). Thank you for SCOUT-STATUS-PREREVIEW-SD2-S165-1 — your Δ-1 is with AG-4 as NOTICE-SD2-DELTA1-S165-1, and your trap check on the D7 ruling is recorded.
fanout: personalized (one lane, one body)
FROM: Architect, S165, 2026-09-30T07:44Z
PRECONDITION: branch phase/m3-feedback-evidence-s164-1 on origin at 8e77c2b9822471627d0d3be94c9a2aa3e8fe4992 (AG-3, parent c2a9eab76cf5eb538d49e4b11fe4b0f810339c1f). If it differs, STOP and report both shas.
WHY: M3 (register 154) is built on CARD-M3-FEEDBACK-EVIDENCE-S164-1-v2 (doc repo S164/; scout-2's card review SCOUT-STATUS-REVIEW-CARD-M3-S164-1 Δ1–Δ7 applied by the card). It ships an OPERATOR-PENDING migration supabase/migrations/20260930060000_learning_snapshots_human_evidence.sql. Its PR slot comes after PR 648 (M4a). Pre-review now so the slot costs zero rework. PRE-REVIEW ONLY: no status, no landing.
AUTHORITY: OWNER-APPROVAL-S165-PLAN-1 ("plani onayliyorum", 2026-09-30 09:35 TSİ) item 2 · OWNER-RULING-S164-FEEDBACK-EVIDENCE-1 · A26 v1_2 · §12.1 · §12.8.
NO CRON TASK. GRAFT: graft first, then git grep for instance calls. SECURITY: never print, echo, printenv or cat any environment variable.

## STEPS
1. `git fetch origin phase/m3-feedback-evidence-s164-1 master`; print both heads (40-hex). Commits on the branch past its parent (AG-3's slip says one).
2. vs CURRENT master (64f5d5c77e70b1da03b0ea333c760e9ceb2f13d8 or later; M4a PR 648 may land first — test against BOTH master and master+648's head 9eab2178c898868106b0b578c500a3c46b8bd409): `git merge-tree --write-tree` → every conflicted path. M3 and M4a both touch the memory surface (MemoryTab, EpisodesRepository, verifyGrants per AG-1's worktree read) — name every overlapping file and whether the conflict is mechanical (seal) or semantic.
3. CARD FIDELITY: each D1–D8 and each Δ1–Δ7 GREEN or RED at the head with file:line. AG-3 says T10 was not written because Δ1 removed the SQL mirror — verify that claim against the card text.
4. MIGRATION: read it fully (security/migration = full read, §4 S43-2): RLS/grants (all-grantee revoke + service_role grant pattern like health_memory_daily), absence-only, no data rewrite, version unique (check:migration-versions). Is it wired into scripts/verifyGrants.ts (the N1 lesson: no CI gate catches a missing probe)? If not, that is a paste-ready RED delta.
5. §13.3: does the card's admin UI change ship with it (the UI half)? file:line.
6. The report docs/relay/M3-FEEDBACK-EVIDENCE-S164-1-AG3-report.md: EXACTLY ONE `FILE-FENCE:` line + `- <path>` lines equal to the diff (merge-base scripts/mergeGuard.mjs). No bare 7–39 hex in prose.
7. SCRATCH worktree at the head: touched suites + typecheck:api; PLANT the card's named fault (or the obvious one: count human feedback as evidence when the evidence field is absent) → the guarding test red; revert; quote both.
8. Write the paste-ready OPERATOR PROMPT for this migration (dry-run first, fence fjbrkimwvtpwoxhziidh, verify grants read-only), as you did for M4a.
9. scout_reply (p_from 'scout-1') as SCOUT-STATUS-PREREVIEW-M3-S165-1, first line `PREREVIEW-VERDICT: GREEN|RED branch=phase/m3-feedback-evidence-s164-1 head=8e77c2b9822471627d0d3be94c9a2aa3e8fe4992`, each RED delta paste-ready. Same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S165/SCOUT-STATUS-PREREVIEW-M3-S165-1.md". Back to `node scripts/mail-wait.mjs scout-1 --budget-min 480`.
FORBIDDEN: no status posted, no edit, push, merge, re-run, dispatch, cron, migration apply; never print an environment value.

END · ORDER-SCOUT-PREREVIEW-M3-S165-1
