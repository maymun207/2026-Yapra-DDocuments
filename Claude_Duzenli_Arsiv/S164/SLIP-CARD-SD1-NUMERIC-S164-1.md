card: CARD-SD1-NUMERIC-GROUPING-EXEMPT-S164-1-v2
branch: phase/sd1-numeric-grouping-exempt-s164-1
head: c7378c169e81f559bf87cbcd022eb6693dd0e294
parent: 61e7f368604ffdd86b8841d9063e540641d42efc (master, read twice)
report: docs/relay/SD1-NUMERIC-GROUPING-EXEMPT-S164-1-AG1-report.md (FILE-FENCE line 215, 23 paths; judge blocks 1 problems [] uncovered [])
ci: UNMEASURED no PR by order (queue ...M4a, SD2, SD1); workflows run on pull_request
tests: SD1-1..10 31/31; SD1-8 UI 5/5; plants unread->absent x2 and Delta4 red, reverted
gates: build OK (reseal = gate got); typecheck 0; rule24/migrations/tenant-zero OK; backend-names OK after instrument rewrite (system code 866->896, tests 807->833, F-e); relay corpus 37/37; full suite 774 files 11697 passed 0 failed
findings: F-a phrases not lang-gated (D3); F-d one extra read/turn; F-f replay callers unchanged (lexicon unread)
status: PUSHED
read relay_inbox at 2026-09-30T06:49:29Z: 1 pending, NOTICE-PUSH-DOC-REPO-S164-3, acting on it next
