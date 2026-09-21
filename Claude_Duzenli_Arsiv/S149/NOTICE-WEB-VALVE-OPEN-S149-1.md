<!-- relay-audit: v1 kind=notice -->
NOTICE-WEB-VALVE-OPEN-S149-1

LANE: AG-4
FROM: Architect, S149, 2026-09-21T05:05Z
AUTHORITY: OWNER-RULING-S149-WEB-VALVE-OPEN-1 — the owner's words "valf i ac" (2026-09-21 07:56 TSI), given so that CWF can run the literature step of the owner's Q4 witness question. This is a governed-parameter publish through RuleGovernanceService (eval gate inside svc.publish), NOT a master push: no spend approval is required beyond the owner's ruling (S133 addition to section 5).
NO POLL OR CRON TASK. This is the second and last notice for this window; when its slip is written, stop.
fanout: personalized (one copy, AG-4 only)
ON-DISAGREEMENT: if the `plan` read in STEP 1 shows a published value other than 0, do NOT publish; print the plan output verbatim in the slip and stop.
GATE-NOTE: the first insert of this notice was refused by relay_adversary_gate (AG007: kind=notice may not carry an ORDERS section) — carried here per 12.2; the section is STEPS.

## PREMISE
MEASURED: 2026-09-21T05:03Z, grep -n "web.enabled" api/cwf/_lib/knowledge/reference/agentParams.ts (owner clone, master at 7572c3bbfeed23656fcf8a55f6e64d93ed240c14) -> line 137 WEB_ENABLED: 'web.enabled'
MEASURED: 2026-09-21T05:03Z, sed -n 1,60p scripts/publishAgentParam.ts -> the operator seam: `plan` writes nothing; `publish` writes exactly ONE domain_rules row through createDraft -> publish; `--as <email>` REQUIRED; `--seed` NOT used here (blast radius, S68-2)
UNMEASURED: the LIVE published value of web.enabled. S133 recorded value 0, min 0, max 1, sessionTweakable false — carried unverified; STEP 1 measures it.
SELF-INVALIDATION: dies if STEP 1 prints a published value other than 0, or if the key is absent from the live registry.

## STEPS
1. READ (writes nothing): in your worktree at master, run
   `node --import tsx --env-file=.env.local scripts/publishAgentParam.ts plan --key web.enabled --as maymun207@gmail.com`
   Print its output verbatim in the slip. If the published value is not 0, STOP (ON-DISAGREEMENT).
2. DO: `node --import tsx --env-file=.env.local scripts/publishAgentParam.ts publish --key web.enabled --value 1 --reason owner-ruling-s149-web-valve-open --as maymun207@gmail.com`
   No `--seed`. If the eval gate rejects, print the stage name and the gate's own error text verbatim and stop; do not retry (S55-1).
3. READ-BACK: run the `plan` command from STEP 1 again and print it verbatim: the slip must show the new published version and value 1 from the live row, not from the publish command's echo.
4. REPLY: SLIP-WEB-VALVE-OPEN-S149-1 on the bus with: plan-before (verbatim), publish result (verbatim), plan-after (verbatim), and one line naming the rule_audit actor+reason if the script prints it. Then stop.

END · NOTICE-WEB-VALVE-OPEN-S149-1
