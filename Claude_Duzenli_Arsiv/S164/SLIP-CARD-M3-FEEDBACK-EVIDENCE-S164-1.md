card: CARD-M3-FEEDBACK-EVIDENCE-S164-1-v2
branch: phase/m3-feedback-evidence-s164-1
head: 8e77c2b9822471627d0d3be94c9a2aa3e8fe4992
parent: c2a9eab76cf5eb538d49e4b11fe4b0f810339c1f (master then; master is now 64f5d5c77e70b1da03b0ea333c760e9ceb2f13d8 - re-pick the one commit before the PR)
report: docs/relay/M3-FEEDBACK-EVIDENCE-S164-1-AG3-report.md
ci: UNMEASURED no PR (waiting for the slot notice)
status: PUSHED
Built D1-D8 + Δ1-Δ7, one commit. OPERATOR-PENDING migration 20260930060000_learning_snapshots_human_evidence.sql.
Tests green: T1-T9, T11, UI; T10 not written (Δ1 removed the SQL mirror). Gates OK: build, typecheck, rule24, migration-versions, tenant-zero, backend-names (system baseline rewritten), relayAudit; fence 1 block, 28/28 covered.
Not built (named): toolExperienceGrants-style per-table grants test; HealthTab unit test for the label link.
read relay_inbox at 2026-09-30T07:37:53Z, box empty
Bus row: id=6c2c32b9-6225-43b3-9553-95f66be0d98b (DRIFT MATCH)
