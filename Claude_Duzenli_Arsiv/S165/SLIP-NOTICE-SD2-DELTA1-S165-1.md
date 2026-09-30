card: NOTICE-SD2-DELTA1-S165-1 (scout-1 delta-1 on SD2)
branch: phase/sd2-brake-notice-grouped-count-s164-2
head: 31e7cae39509ea771fb3e39217bac81ed56c3319
report: docs/relay/SD2-BRAKE-NOTICE-GROUPED-COUNT-S164-1-AG4-report.md (unchanged; relayAudit OK)
ci: UNMEASURED no CI read at this head (no PR, per notice). Local: burstGuardReporting+perToolCapCount 2 files 19/19; typecheck:api exit 0; doc-drift OK after reseal
status: PUSHED no PR
precondition: ls-remote x2 = 1ef841865dc786ea527331dc6adbaa6a441f5908, clean
measured: burstBrakeMessage.ts:55, burstGuardReporting.test.ts:160,:163 -> "tümü" ya da "hepsi"
reseal: mapped file moved 5 digests, each = gate got; manifest already in fence, stated not hidden
mergeGuard: CLEAN-MERGE ok, all paths in fence, FENCE-GREW ok; VERDICT RED only on UNMEASURED PR timeline/open-PR reads (no PR number)
note: box READ-FAILED 07:39Z (DNS ENOTFOUND); this card waited ~6h
read relay_inbox at 2026-09-30T13:56:12Z, box empty
