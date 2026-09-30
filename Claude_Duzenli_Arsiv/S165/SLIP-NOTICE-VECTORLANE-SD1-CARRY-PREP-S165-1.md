card: NOTICE-VECTORLANE-SD1-CARRY-PREP-S165-1
branch: phase/vectorlane-fake-timers-s165-2 + phase/sd1-numeric-grouping-exempt-s165-1
head: 68224cda2649237989afc37f3dfaba109eebb180
sd1-head: ab6e77f725f572975c6ad58c9b65532111d4faad; both parent fb28343ea332e98aa588bf73acc0762c84e1d9dc
report: fences = diff vs master (VL 3 paths; SD1 23, judge problems [])
ci: UNMEASURED prep only, no PR
vl: manifest only, reseal = got; admission 5/5 alone, 5/5 inside full suite
sd1: facts+manifest only, 6 digests = got; backend-names OK; suites 9 files 188 pass
gates: build, typecheck, rule24, tenant-zero, backend-names, relayAudit OK x2; relay 37/37
F: contention suite red 2 = mcpIsErrorPassthrough F1/F2 5s timeout (my M1 tests, master's code; alone 9/9, F1 1.8s cold import). Latent; fix: beforeAll import or explicit timeout
wt: removed 1 (mine); prune also cleared other sessions' stale records (dirs already gone; list 0 prunable now)
status: PUSHED
read relay_inbox at 2026-09-30T15:43:27Z, box empty
