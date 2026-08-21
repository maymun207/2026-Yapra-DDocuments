# ROUTE-GOV-1 — CLEAN RESET (discard the v1 sub-phase A branch, restart on v2_2)

<!-- claude-code-ROUTE-GOV-1-CLEAN-RESET-v1 · rev 1 · 2026-07-14 · Session 42.
     Executor: AG. Purpose: PR #33 implements a SUPERSEDED design (v1: code snapshot + owner as data
     transport). The owner rejected that architecture; v2_2 replaces it (catalog = system-synced
     Supabase mirror + governed annotation overlay). This prompt removes every trace of the v1
     branch, corrects your memory so no future session resurrects it, and hands off to v2_2.
     NOTHING in this prompt merges anything. -->

## WHY DISCARD INSTEAD OF SALVAGE

Three items in PR #33 ARE v2_2-compatible (the `mcpCatalogFetch` helper extraction, the
`learnToolMapping` idempotence fix, the four npm seed aliases) and one finding is load-bearing (the
stage order). We still discard the branch whole: cherry-picking risks dragging the snapshot script
and its docs along, and the three items are small enough to re-implement fresh from the v2_2 spec.
**The learning is carried forward in the v2_2 doc itself; the code is not.** Do NOT cherry-pick or
diff-apply anything from the dead branch.

## STEP 1 — CLOSE AND DELETE (no merge)

```bash
gh pr close 33 --comment "Superseded by ROUTE-GOV-1 v2_2 (owner architecture decision: catalog = system-synced Supabase mirror, not a code snapshot). Closed unmerged; branch deleted. The stage-order finding and the three v2-compatible items are carried forward in the v2_2 phase doc."
git push origin --delete route-gov-1
git branch -D route-gov-1 2>/dev/null; true
```

## STEP 2 — VERIFY CLEAN (paste every output)

```bash
git fetch --prune origin
git rev-parse origin/master                    # MUST equal the pre-phase anchor c5f58a4…
git branch -r | grep route-gov-1 || echo "REMOTE BRANCH GONE"
git status --porcelain && echo "WORKTREE CLEAN"
gh pr view 33 --json state -q .state           # MUST print CLOSED
```

If `origin/master` is NOT `c5f58a4…`: STOP and report — do not "fix" anything.

## STEP 3 — CORRECT YOUR MEMORY (this is part of DONE)

Your memory entry `route-gov-1-subphase-a-build.md` and the `MEMORY.md` line currently instruct a
future session to wait for an owner-run catalog snapshot. That guidance is now WRONG and would
resurrect a rejected design. Rewrite the entry (keep the filename) to state:

- ROUTE-GOV-1 **v1 is SUPERSEDED**; PR #33 **CLOSED UNMERGED**, branch deleted; master untouched at
  `c5f58a4`.
- The authoritative spec is `claude-code-PHASE-ROUTE-GOV-1-v2_2.md`. Architecture: `backend_tools`
  Supabase MIRROR synced by the SYSTEM (on-connect + manual button) + governed
  `armes.tool_annotation` overlay. **No code snapshot. No owner-run catalog script. Never re-ask
  the owner for the catalog.**
- CARRIED-FORWARD FACT (yours, verified at 980bdaa): the turn pipeline runs tool-selection
  (stage 7 `register-tools`) BEFORE knowledge-warm (stage 8 `assemble-prompt`
  `dbKnowledgeProvider.warm()`). v2_2 §3.C builds its own pre-stage-7 category resolve, shaped like
  `resolveAgentParams` / `resolvePromptSegments`.
- The three small items (helper extraction, learnToolMapping idempotence, npm seed aliases) are
  re-implemented fresh inside v2_2 sub-phase A — their PR #33 versions died with the branch.

Update the `MEMORY.md` index line accordingly.

## STEP 4 — EXECUTE v2_2

Start `claude-code-PHASE-ROUTE-GOV-1-v2_2.md` from its §0 pre-flight (fresh clone — your current
worktree is not the anchor proof). Branch name: `route-gov-2` (a fresh name so no tooling confuses
it with the dead branch).

<!-- END · claude-code-ROUTE-GOV-1-CLEAN-RESET-v1 · rev 1 · 2026-07-14 -->
