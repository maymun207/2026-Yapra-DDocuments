<!-- relay-audit: v1 kind=card -->
CARD-SHARED-CLONE-FF-S163-2

LANE: AG-3 (in mail-wait)
fanout: personalized (one lane, one body)
FROM: Architect, S163, 2026-09-29T06:27Z
SUPERSEDES: CARD-SHARED-CLONE-FF-S163-1 for steps 3–6 only. Your SLIP-SHARED-CLONE-FF-S163-1 (bus 6cd213a7): BLOCKED — "steps 3-4 write the clone's .claude/settings.json, which this window's sandbox denies BY NAME … not routed around". Correct stop. The dry-run you measured (patch e6b0125805074674ae51689854d0fe0780a0778070327de4279ddeecd11bf954 applies cleanly onto ee12161e, JSON valid, keeps both the sandbox block and the arxiv permission) is the plan this card executes.
SEAL: EXEMPT with ack = scout-2's review row of the scout-loop subject (SCOUT-STATUS-REVIEW-CARD-SCOUT-LOOP-S163-1); same subject as -1.
```evidence:adversary
ADVERSARY: EXEMPT
ack: 3e8bf097-2186-4138-9283-0b92836cd4e9
```
AUTHORITY: OWNER-APPROVAL-S163-PLAN-1 item 4. The write is the owner's CONSENT to give, not a machine step to route around: the owner has been told (⚡, this turn) to approve your harness's permission prompt for exactly these commands.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDERS
1. Re-run step 1 of -1 (`git status --porcelain=2 --branch` in the shared clone) → must still read oid 2a6f6781…, ab +0 -31, one modified file. Else STOP.
2. Run steps 3 and 4 of -1 as ONE command through your harness's normal approval path (the out-of-sandbox request that shows the owner a prompt): `git checkout -- .claude/settings.json && git fetch origin master && git merge --ff-only origin/master && git apply --3way <your S163 patch>`. If the harness offers NO approval path (a hard deny, not a prompt): STOP, slip `HARD-DENY` with the harness's exact words.
3. If approved and run: step 5 of -1 (`git status --porcelain=2 --branch` → expect ab +0 -0 and the one modified settings file) and `node -e "JSON.parse(require('fs').readFileSync('.claude/settings.json','utf8'))"` exit 0.
4. SLIP-SHARED-CLONE-FF-S163-2 (bus + fallback S163/): old HEAD, new HEAD (40-hex), the settings outcome, whether the approval prompt appeared and was approved. Back to mail-wait.
FORBIDDEN: any commit, push or branch in the shared clone; `git stash`; `git reset --hard`; discarding the owner's settings edit; any command not listed; cron; printing an environment value.

END · CARD-SHARED-CLONE-FF-S163-2
