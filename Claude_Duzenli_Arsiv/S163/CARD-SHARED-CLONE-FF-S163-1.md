<!-- relay-audit: v1 kind=card -->
CARD-SHARED-CLONE-FF-S163-1

LANE: AG-3 (in mail-wait; last card CARD-SCOUT-LOOP-RULING-AND-PR-S163-1, landed as PR 636)
fanout: personalized (one lane, one body)
FROM: Architect, S163, 2026-09-29T06:25Z
SEAL: EXEMPT with ack = scout-2's review row of the scout-loop subject (SCOUT-STATUS-REVIEW-CARD-SCOUT-LOOP-S163-1). This card is the last step of making PR 636 live for the scout windows (same subject, not a new one; §12.1 named).
```evidence:adversary
ADVERSARY: EXEMPT
ack: 3e8bf097-2186-4138-9283-0b92836cd4e9
```
AUTHORITY: OWNER-APPROVAL-S163-PLAN-1 item 4 (two-way loop for every window) · free.md at master: "the only write there is `npm run lane:boot`'s `--ff-only` of a clean clone".
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## WHY (measured by the Architect, read-only, 06:20Z)
```evidence:clone
shared clone (the owner's cwf_yaprak main working copy): HEAD 2a6f6781b1a4748aac5f5bc7b1d73136863b1c35 on master, branch.ab +0 -31 against origin/master ee12161ecad43b338489e85fcb73df1e08aa8ac0
working tree: ONE modified tracked file, .claude/settings.json (local: + "WebFetch(domain:arxiv.org)" permission, footerLinksRegexes emptied and moved)
upstream 2a6f6781..ee12161e also changed .claude/settings.json (+ a "sandbox" block, lines 6-11) — different hunks
```
So every `--ff-only` refuses ("local changes would be overwritten") and the clone has been stuck 31 commits behind. The scout windows run scripts/mail-wait.mjs FROM THIS DISK, and the disk copy predates PR 636: it has no reply-ack clause, so a scout at its new address would be re-delivered every card it already answered. Migrations for 635/636 are APPLIED (06:14Z, Architect-verified).
Side note for your report: the Architect's own read-only `git status` from the bridge left a stale .git/index.lock in this clone at 06:17Z; it was moved into .git/architect-stale-locks/ at 06:22Z (the bridge cannot delete). Confirm `ls .git/*.lock` is empty before you start.

## ORDERS
1. In the shared clone: `git status --porcelain=2 --branch` → print. Expected branch master, oid 2a6f6781…, ab +0 -31, one modified file .claude/settings.json. Anything else (another branch, other modified files, a lock): STOP and slip what you saw — touch nothing.
2. Save the local edit as a patch OUTSIDE the clone: `git diff -- .claude/settings.json > <your scratchpad>/settings-local-S163.patch`; print its sha256.
3. `git checkout -- .claude/settings.json` · `git fetch origin master` · `git merge --ff-only origin/master` → print new HEAD (expect ee12161ecad43b338489e85fcb73df1e08aa8ac0 or later; print which).
4. Re-apply the owner's local edit: `git apply --3way <patch>`. If it applies cleanly: print `git diff --stat -- .claude/settings.json` and `node -e "JSON.parse(require('fs').readFileSync('.claude/settings.json','utf8'))"` exit 0. If it conflicts: resolve so the result keeps BOTH the upstream "sandbox" block AND the owner's "WebFetch(domain:arxiv.org)" permission, JSON valid; print the resolved diff vs HEAD. The file stays UNCOMMITTED (it is the owner's local setting).
5. `git status --porcelain=2 --branch` → print (expect ab +0 -0, the one modified file).
6. SLIP-SHARED-CLONE-FF-S163-1 (bus + fallback S163/): old HEAD, new HEAD (40-hex), patch sha256, the settings.json outcome. Back to mail-wait.
FORBIDDEN: any commit, push or branch in the shared clone; `git stash` (S61-1); `git reset --hard`; discarding the owner's settings edit; touching any other file; cron; printing an environment value.

END · CARD-SHARED-CLONE-FF-S163-1
