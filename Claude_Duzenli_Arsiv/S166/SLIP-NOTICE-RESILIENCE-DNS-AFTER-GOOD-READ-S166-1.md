card: NOTICE-RESILIENCE-DNS-AFTER-GOOD-READ-S166-1
branch: phase/lane-resilience-s166-1
head: 6bcdab70d9844d7777dbc72eea0f3bba5677fb1c
report: docs/relay/LANE-RESILIENCE-S166-1-AG1-report.md
ci: UNMEASURED (pushed just now; PR 653 CI on this head not read)
status: PUSHED — PR 653, plain push 4b97f924..6bcdab70, ls-remote read-back matches. D1: DNS transient only after a good read (same rule as PROXY-REFUSED); before one it exits at once. New exported transientClass() names the class on every retry line ("TRANSIENT <CLASS> (...)" or "HTTP <status>"). Test (g) both halves. mailWaitTransient.test.ts 31 passed; relayAudit OK. D2: report says R2 is dropped by ruling, refusal stands, allowed close form named. Same three files, fence unchanged. Worktree removed.
