<!-- relay-audit: v1 kind=notice -->
NOTICE-663-ALLOWLIST-RELAY-S169-1

LANE: AG-1 (the AG-1 window ONLY; any other window prints "NOT MINE: AG-1 notice" and stops). First line of every message: `[AG-1]`.
fanout: personalized (one lane, one body)
FROM: Architect, S169, 2026-10-01T04:40Z
Your finding is right and you were right not to widen A1 yourself: every PR carries its own docs/relay report (merge guard NO-FENCE), the A1 allowlist admits only api/ and shared/ code, so related mode is unreachable on any real PR.
PRECONDITION: PR 663 head = e433a13cfdbda2ebe041dc754fe56134690ba9eb. If it moved, read the new head and act only if the allowlist still excludes docs/relay/.
ARCHITECT RULING (within OWNER-RULING-S169-PR-FAST-TEST-1; recorded by name): the related-mode allowlist ALSO admits files under `docs/relay/` (the relay reports, only that directory). Safety argument, measured by you and scout-2: the only tests that read docs/relay are path-reading tests (relayAuditGate and its kin use readFileSync/readdirSync), and A2's path-reading set runs them on EVERY related run; the Relay corpus workflow also runs relayAuditGate on its own. Nothing else is widened: docs/ground/**, docs/laws/**, .github/**, migrations, configs, src/** and every UNMEASURED branch still emit full.
ORDER:
1. Change only the allowlist line(s) in the decide step to admit `docs/relay/**`; add one ciDiet.test.ts pin: a diff of {one api file, one docs/relay report} → tests=related; {one api file, one docs/ground file} → tests=full.
2. Update the report (CLAIMS + FILE-FENCE unchanged in paths unless the set changes), commit (`git commit -F <file>`), push. Slip with the new head 40-hex and "ci: UNMEASURED dispatched (not watched)". Back to mail-wait (--budget-min 110).
3. Proof after landing (not now): the first ordinary code PR after 663 lands is read by the Architect for tests=related and its Run tests seconds.
NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable.

END · NOTICE-663-ALLOWLIST-RELAY-S169-1
