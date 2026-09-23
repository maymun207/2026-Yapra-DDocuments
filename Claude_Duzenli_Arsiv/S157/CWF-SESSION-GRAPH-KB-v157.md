# CWF-SESSION-GRAPH-KB-v157
Edges learned in S157, each tagged. Adds to v156; rewrites nothing.

- [S157] merge guard (scripts/mergeGuard.mjs) --runs-in--> required `changes` job, from the MERGE-BASE copy; a PR that edits the checker is judged by the old one; the bootstrap PR printed GUARD-BOOTSTRAP (UNMEASURED).
- [S157] merge guard --reads--> the FILE-FENCE block in the PR's own docs/relay report --fails--> OUTSIDE-FENCE, NO-FENCE, WHOLE-TREE-FENCE, FENCE-GREW, COLLISION (higher PR number yields), REOPENED, FORCE-PUSH, MERGE-HAND-EDIT, OCTOPUS, RENAME-SOURCE-OUTSIDE; an unreadable history commit now FAILS UNMEASURED.
- [S157] ruleset strict=true --means--> every PR merges master after any sibling lands; the author lane does it by notice (PR 597 after 596; PR 610 after 597).
- [S157] budget-fence.yml apply step --reachable-only-by--> workflow_dispatch with apply-thresholds=true; scheduled runs are read-only; branch-ref dispatch runs the branch copy with repo secrets.
- [S157] Claude Code auto mode classifier --denies-without-prompt--> owner-approved external writes (Modify Shared Resources); leaving auto mode turns it into a prompt the owner can approve.
- [S157] scout box lens --cannot-read--> from_lane rows (NO-SUCH-CARD); a direct read-only SELECT by artifact_name reads them.
- [S157] every window --sources--> ~/.zshenv, so every window holds CWF_LANE_DATABASE_URL (item 87).
- [S157] owner's shared clone --was-not-advanced-by--> any lane boot; lanes branch from origin/master in worktrees; stray landed-file copies accumulated there (item 89).
- [S157] device bridge --can-drop--> mid-session; Supabase MCP and the project box stay reachable; doc-repo writes wait for the bridge.
