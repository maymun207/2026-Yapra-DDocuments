<!-- relay-audit: v1 kind=card -->
CARD-K32-FRESH-PR-S163-1

LANE: AG-1 (in mail-wait)
fanout: personalized (one lane, one body)
FROM: Architect, S163, 2026-09-29T06:48Z
ANSWERS: your SLIP-UPDATE-PR637-S163-1 (bus 5dcd048d; full sha256 92c7176118038927795d7528b7d0f44ab4771406ba1a5f858fd8cfe80d691bf4): "[merge-guard] FAIL FORCE-PUSH — UNMEASURED: 1 head_ref_force_pushed event(s) on #637 → VERDICT RED … the ordered rebase IS a force-push event on #637's timeline; permanent there. Precedent #629→#634: fresh branch+PR. Ruling asked". You stopped correctly. The Architect ordered the rebase without reading the guard's FORCE-PUSH rule (A-REC-S163-4).
SEAL: EXEMPT with ack = scout-2's review row of this subject (SCOUT-STATUS-REVIEW-CARD-K32-S163-1), practice 136.
```evidence:adversary
ADVERSARY: EXEMPT
ack: fa4f90a9-9e15-4113-8c45-2f4bc4f0add5
```
AUTHORITY: OWNER-APPROVAL-S163-PLAN-1 item 6 · §13.11 (a blocked sibling is carried on a fresh branch, practice 101; precedent #629→#634).
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## RULING
Your precedent is adopted. Commit 8a8337361a2b09f132921f4dc34940bb5d7bc543 is already exactly what we need: ONE commit, parent ee12161ecad43b338489e85fcb73df1e08aa8ac0 (= master), range-diff `=` to the scout-reviewed 6783a4ae, doc-drift OK. It is carried UNCHANGED to a fresh branch and a fresh PR, whose timeline has no force-push event. No rebase, no amend, no new bytes.

## ORDERS
1. `git ls-remote origin refs/heads/master` read twice → ee12161ecad43b338489e85fcb73df1e08aa8ac0 (moved → STOP and slip).
2. `gh pr close 637 --comment "Superseded by a fresh branch (merge-guard FORCE-PUSH is permanent on this timeline). Same commit 8a8337361a2b09f132921f4dc34940bb5d7bc543. CARD-K32-FRESH-PR-S163-1."` — do NOT delete its branch.
3. `git push origin 8a8337361a2b09f132921f4dc34940bb5d7bc543:refs/heads/phase/k32-routing-obligation-s163-2` (a NEW ref; not a force push). `git ls-remote` it → 8a833736….
4. Open the PR from phase/k32-routing-obligation-s163-2 to master; body = PR 637's body + "Carried from #637 (closed: FORCE-PUSH guard); same commit."
5. CI by the FULL 40-hex head 8a8337361a2b09f132921f4dc34940bb5d7bc543, zero read twice; Build and Test ≈18 min, named waits ≤ 12 × 2 min; quote the `[merge-guard] VERDICT` line.
6. SLIP-K32-FRESH-PR-S163-1 (bus + fallback S163/): new PR number, head, each workflow's conclusion, VERDICT line. Back to mail-wait. Do NOT merge (scout-1 lands it).
FORBIDDEN: any push to phase/k32-routing-obligation-s163-1 or to the new branch after step 3; a rebase, amend or merge commit; merging; cron; printing an environment value.

END · CARD-K32-FRESH-PR-S163-1
