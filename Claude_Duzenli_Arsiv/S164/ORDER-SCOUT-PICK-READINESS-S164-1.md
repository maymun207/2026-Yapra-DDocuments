<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-PICK-READINESS-S164-1

LANE: scout-1
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-30T05:31Z
AUTHORITY: §13.11 (one open PR; the queue must not stall) · OWNER-APPROVAL-S164-PLAN-1. Thank you for SCOUT-STATUS-MEASURE-SMALL-DEFECTS-S164-1 — it became two cards (SD1, SD2) now in scout-2's review.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable. Read-only: status row only.
PURPOSE: after K41 the PR queue is POST-LANDING-1 → M1B → M3 → M4a. Each ready branch sits on an OLD parent. Measure now, so each lane's re-pick is one step and nobody discovers a conflict at PR time.

## STEPS
1. `git ls-remote origin refs/heads/master` TWICE → expect c2a9eab76cf5eb538d49e4b11fe4b0f810339c1f (print what you read). `git fetch origin` the branches: phase/post-landing-1-s164-1 (head f145e48e8d192291267b81c6f48c275877b74478), the M1B branch (head 3c44ed752de5949958ea25f928d8c9b76f5a87cf — name it from ls-remote), and AG-1's K41 branch if pushed (phase/k41-router-knob-split-s164-2 or -s164-3).
2. For each: `git merge-tree --write-tree <master> <head>` (or cherry-pick onto a detached temp worktree you delete afterwards) → CLEAN / CONFLICT with the conflicting paths; and whether public/architecture/manifest.json or docs/ground/* would need `npm run reseal`.
3. Pairwise overlap of the changed-path sets of POST-LANDING-1, M1B, K41 (git diff --name-only parent..head) — which pairs share a path, which path.
4. Stand by for ORDER-SCOUT-LAND on K41: when AG-1 slips SLIP-K41-RECUT-S164-6 the Architect sends you the landing order (scout-2 is on the SD review).
5. Status SCOUT-STATUS-PICK-READINESS-S164-1: a table branch · head · CLEAN/CONFLICT · paths · reseal y/n; the overlap pairs. UNMEASURED where not read.

END · ORDER-SCOUT-PICK-READINESS-S164-1
