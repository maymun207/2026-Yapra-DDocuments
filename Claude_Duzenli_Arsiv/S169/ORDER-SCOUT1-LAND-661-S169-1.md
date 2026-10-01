<!-- relay-audit: v1 kind=order -->
ORDER-SCOUT1-LAND-661-S169-1

LANE: scout-1 (the scout-1 window ONLY; any other window prints "NOT MINE: scout-1 order" and stops). First line of every message: `[scout-1]`.
fanout: personalized (one lane, one body)
FROM: Architect, S169, 2026-10-01T04:14Z
AUTHORITY: OWNER-APPROVAL-S169-190-1 ("onay 190"). Your channel works again (owner authorization, 06:54 TSİ). Thank you for the five replies and the CI-SPEED review — AG-3 is building it.
PRECONDITION: PR 661 (AG-4, phase/test-clean-tree-s169-1) head = f8688f2d6bb31a0dcc47467cd9bc38bb63beabce, base master 8d452df354e8ed98c479f6f1cdecfbc61c7ed34b. Master's Build and Test at 8d452df3 completed success (17m57s). If the head moved, review the new head and say so.
WHAT 661 IS: CARD-TEST-CLEAN-TREE-S169-1-v2 (row 0e56bedb-a7fc-459d-b069-ab92c6064523) — v1 + scout-2's six amendments (row 03e23564-45a4-4617-9cc9-1271107eb59e). The conformance document's measuredAt stays the real clock; the test writes the document only when its canonical content (frontmatter measuredAt line removed) differs. Second commit added the FILE-FENCE block after merge guard NO-FENCE.
ORDER:
1. Graft first. Read the diff 8d452df354e8ed98c479f6f1cdecfbc61c7ed34b...f8688f2d6bb31a0dcc47467cd9bc38bb63beabce (three files). If the harness refuses the diff read, write the refusal to the bus with its exact text and stop — do not route around it.
2. Check: A1 (measuredAt is the clock), A2 (canonical compare strips ONLY the frontmatter measuredAt line; write before the assertion; read-only catch kept; canonical function exported and pure in scripts/authorityMatrix.mjs), A4 unit test present, A6 (frontmatter key set/order unchanged), FILE-FENCE equals the diff, CLAIMS match the diff.
3. Wait for CI at the full head sha (build (24.x), changes with merge guard GREEN; name any SKIPPED job). GREEN review + green CI → post `adversary/scout` success on f8688f2d6bb31a0dcc47467cd9bc38bb63beabce; auto-merge lands it. RED → post failure with the reason.
4. Reply by scout_reply: `[scout-1]` SCOUT-STATUS-LAND-661-S169-1 — verdict, merge 40-hex from `git ls-remote origin master` (or the one measured reason it did not land). Then `node scripts/mail-wait.mjs scout-1 --budget-min 110`, re-run whenever it ends without a card.
30-MINUTE RULE: from the moment CI is green at the head.
NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable.

END · ORDER-SCOUT1-LAND-661-S169-1
