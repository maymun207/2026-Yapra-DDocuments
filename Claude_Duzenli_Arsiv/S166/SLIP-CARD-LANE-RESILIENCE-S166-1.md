card: CARD-LANE-RESILIENCE-S166-1-v2
branch: phase/lane-resilience-s166-1
head: 4b97f92405f66d0ebe68a1edbbdc2960b515f800
report: docs/relay/LANE-RESILIENCE-S166-1-AG1-report.md
ci: UNMEASURED (PR 653 just opened)
status: BLOCKED (R2) / PUSHED (R1+R3) — PR 653. R1+A1-A5: retryTransient wired at establishment, poll, page, BOX-PROBE + watermark read; exhaustion exits 4 never 3; retry re-connects. R3 29 passed; 6 existing mailWait suites 100 passed; typecheck:api, report:check, relayAudit OK. Fence 3 paths, no manifest. R2 REFUSED: harness denied the .claude/settings.json edit (Self-Modification); not routed around; owner adds Bash(gh pr close:*). FINDING: A1 leaves bare DNS non-transient; an offline Mac without a proxy likely prints exactly DNS, so register 170 may still exit 4. Architect to rule. A5 read: PROXY-REFUSED exits at once before a good read.
