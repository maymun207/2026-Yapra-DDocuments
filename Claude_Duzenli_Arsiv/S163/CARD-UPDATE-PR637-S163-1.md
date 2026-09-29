<!-- relay-audit: v1 kind=card -->
CARD-UPDATE-PR637-S163-1

LANE: AG-1 (in mail-wait; PR 637 = phase/k32-routing-obligation-s163-1 at 6783a4ae6e060ae4e40eb2e0fd9249c99458dc42)
fanout: personalized (one lane, one body)
FROM: Architect, S163, 2026-09-29T06:35Z
SEAL: EXEMPT with ack = scout-2's review row of this subject (SCOUT-STATUS-REVIEW-CARD-K32-S163-1), practice 136.
```evidence:adversary
ADVERSARY: EXEMPT
ack: fa4f90a9-9e15-4113-8c45-2f4bc4f0add5
```
AUTHORITY: OWNER-APPROVAL-S163-PLAN-1 item 6 · §12.8 (thirty minutes to master).
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## WHY (measured by scout-1, SCOUT-STATUS-LAND-K32-S163-1, bus e366c8f2, 06:31Z)
"ADVERSARY-VERDICT: GREEN pr=637 head=6783a4ae6e060ae4e40eb2e0fd9249c99458dc42 · NOT-LANDED (mergeStateStatus BEHIND — branch on ed033de0, master ee12161e; ruleset requires up-to-date; update is a push, forbidden to scout)". The Architect's CARD-OPEN-PR-K32-S163-1 said no fresh branch was needed because no file overlaps — true for conflicts, wrong for the ruleset (A-REC-S163-3). The code is reviewed GREEN; only its base is stale.

## ORDERS
1. `gh pr view 637 --json headRefOid,mergeStateStatus,baseRefName` → print (expect head 6783a4ae…, BEHIND, master).
2. `gh pr update-branch 637 --rebase` (GitHub rebases the ONE commit onto master server-side; one parent, no merge commit — scripts/mergeGuard.mjs L261 never sees a merge). If the CLI lacks --rebase: `git fetch origin && git rebase origin/master` on the branch (expect no conflict: files ed033de0..ee12161e ∩ your files = EMPTY SET) and `git push --force-with-lease=phase/k32-routing-obligation-s163-1:6783a4ae6e060ae4e40eb2e0fd9249c99458dc42` — allowed for THIS branch only.
3. Print the new 40-hex head and `git range-diff ed033de062dfc869850a35e40f1b39094dd24ea3..6783a4ae6e060ae4e40eb2e0fd9249c99458dc42 ee12161ecad43b338489e85fcb73df1e08aa8ac0..<new head>` → expect `1: … = 1: …` (identical patch). Anything else: STOP and slip it.
4. If any gate regenerates a file after the rebase (run `npm run build` on the new head; doc-drift/facts/manifest), STOP and slip it — do not push a second commit without a card.
5. CI by the new FULL 40-hex head, zero read twice; Build and Test ≈18 min, named waits ≤ 12 × 2 min.
6. SLIP-UPDATE-PR637-S163-1 (bus + fallback S163/): old head, new head, range-diff line, mergeStateStatus, each workflow's conclusion. Back to mail-wait. Do NOT merge.
FORBIDDEN: a merge commit; any content change; force-push anywhere except step 2's lease on this branch; merging; cron; printing an environment value.

END · CARD-UPDATE-PR637-S163-1
