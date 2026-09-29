<!-- relay-audit: v1 kind=notice -->
NOTICE-PR632-BASELINE-RULING-S163-1

LANE: AG-4 (in mail-wait; your uncommitted worktree on phase/e1a-exam-sets-and-bar-s163-5 at master 1a6279e0c3eddf5ac331b38f5c028b5f17668690, 7 picks staged)
fanout: personalized (one lane, one body)
FROM: Architect, S163, 2026-09-29T02:48Z
ANSWERS: your SLIP-PR632-FRESH-BRANCH-S163-1 ("RULING NEEDED"). You stopped exactly as the card ordered — correct.
AUTHORITY: OWNER-APPROVAL-S163-PLAN-1 · OWNER-RULING-S153-NO-ARMES-HARDCODE-1 (applied, not waived) · precedent NOTICE-PR630-BASELINE-RULING-S162-1.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## RULING (measured by the Architect from the primary source at e61fd0c6894277b690a4df1b017175d0c47daedc)
The five non-test cells that grew (system/code 859 → 864) are NOT backend references:
- api/cwf/_lib/knowledge/resolveExamPolicy.ts L4 and L14 — comments (`fetchSystemParamRows` read …; "the system cannot lower …");
- same file L27 `import { fetchSystemParamRows } from './resolveAgentParams.js';` and L69 `const rows = await fetchSystemParamRows(repo);` — an EXISTING helper that reads system-level agent params, not a backend id;
- api/cwf/_lib/knowledge/reference/agentParams.ts L335 — a comment ("the system cannot lower its own bar …").
No vendor backend id grew anywhere. This is the instrument counting the English word "system" and identifier fragments as the `system` backend — the precision defect already registered as 135 (F-S162-BACKEND-NAME-GATE-COUNTS-TEST-MOCKS-1), now measured in code as well as in mocks. It is NOT a NO-HARDCODE violation. The instrument's own fix is a separate small card (register 135), not your job.
Therefore: answer the gate with the instrument's OWN baseline rewrite (the same command AG-3 used for fcafd59d under NOTICE-PR630-BASELINE-RULING-S162-1 — read it from that commit or the tool's usage line; do not hand-edit the JSON). data/gates/backend-names-baseline.json JOINS THE FIRST FENCE.

## ORDER (continue your card from ORDER 2)
1. Run the instrument's baseline rewrite; `git diff data/gates/backend-names-baseline.json` must show ONLY system/code 859→864 and system/tests 787→791 plus the file attributions for resolveExamPolicy.ts, agentParams.ts and the test files — anything else (any other id, any other class): STOP and slip it.
2. `npm run check:backend-names` → OK; quote. Re-run `npm run build` (five gates) → quote the last line (the baseline may re-seal nothing; if a gate regenerates a file, that file joins the fence too).
3. Report: add data/gates/backend-names-baseline.json (and any file step 2 regenerated) to the scope fence, and ONE evidence-fenced line: `BASELINE: system/code 859→864, system/tests 787→791 rewritten by the instrument under NOTICE-PR632-BASELINE-RULING-S163-1 — English word / helper name fetchSystemParamRows, not a backend reference (register 135)`. Then continue with the card's ORDER 3 → 7 exactly (ONE commit, proofs, push, PR, CI by full sha, slip SLIP-PR632-FRESH-BRANCH-S163-2, mail-wait).
FORBIDDEN: hand-editing the baseline JSON; any change to the instrument; a merge commit; --force; cron; printing an environment value.

END · NOTICE-PR632-BASELINE-RULING-S163-1
