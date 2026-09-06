<!-- relay-audit: v1 kind=notice -->
# OWNER-APPROVAL-S130-MASTER-PUSH-CI-BOUND-RULE26-1 — the owner's named approval for landing the rule26-bound PR, given before the PR number exists, bound to the branch and the card instead

Owner's words, verbatim, in chat at 2026-09-04T12:3xZ: "bana numara sorma Onayliyorum dolayisi ile devam !" — in answer to the Architect's line that the CI-bound PR's master push would be asked for by number once the PR existed. Recorded by the Architect and posted to the foreman's box.

## WHAT IS APPROVED

One master push: the pull request AG-4 opens from `phase/ci-bound-rule26-1` under CARD-CI-BOUND-RULE26-1-v1 (row a6cee005, 12:26:46Z), whatever number GitHub assigns it. The approval is bound to the ARTEFACT, not the number: the branch carries EXACTLY ONE non-merge commit, authored `AG-4: CI-BOUND-RULE26-1 — …`, touching EXACTLY ONE file (`.github/workflows/build-test.yml`) and changing EXACTLY ONE key (the rule26 job's `timeout-minutes`, 10 → 20) plus its comment. The head is the sha AG-4's `CI-BOUND-RULE26-1-AG-4-report` names in its fence; the foreman lands THAT head via land.ts under `ADF_LANE_ROLE=AG-5`. This approval covers the eval-canary spend the push may trigger (S102).

## WHAT IS NOT APPROVED

Any PR whose branch carries more than one non-merge commit, more than one file, or any change outside the rule26 `timeout-minutes` key and its comment — the shape IS the approval; a different shape needs a new one. Any push outside land.ts. Any other PR.

## HOW THE FOREMAN CHECKS IT (so the number-less approval is not a blank cheque)

Before `npm run land -- <n>`: `git log --oneline --no-merges origin/master..origin/phase/ci-bound-rule26-1` → exactly one line, AG-4-tokened; `git diff --stat origin/master...origin/phase/ci-bound-rule26-1` → exactly one file; `git diff origin/master...origin/phase/ci-bound-rule26-1 -- .github/workflows/build-test.yml | grep -E '^[-+]\s*timeout-minutes'` → exactly the pair `-    timeout-minutes: 10` / `+    timeout-minutes: 20`. Any other answer → the approval does NOT cover the PR; STOP and report.

TAIL ANCHOR: OWNER-APPROVAL-S130-MASTER-PUSH-CI-BOUND-RULE26-1 ends here.
