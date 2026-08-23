<!-- relay-audit: v1 kind=card prov=1 -->
# ADF-KADEME-2-GUARD-FIX-1-v2
The guard matches purpose, not vocabulary; lane refs do not deploy; secrets live in env; MCP writes are refused at the hook
fanout: personalized - one address, AG-4.

## PREMISE - MEASURED @2026-08-23T05:10:00Z, Architect fresh clone at the floor in evidence:floor
- MEASURED: .claude/hooks/guard-bash.py:91 matches \bgh\b[^|;&]*\bpr\b[^|;&]*\bmerge\b anywhere in the command; AG-5 measured a read-only grep whose pattern contained "gh pr merge" refused (F-S114-GUARD-TEXT-MATCH-1)
- MEASURED: scripts/vercel-ignore.mjs decides by changed paths only; every lane/<AG>-<nonce> claim push produced a Vercel preview deploy in S114 (F-S114-LANE-REF-PREVIEW-DEPLOY-1)
- MEASURED: .claude/boot/free.md names the sealed files; no boot says where a credential may live; S114 found SUPABASE_ACCESS_TOKEN in .claude/settings.local.json (F-S114-SECRET-IN-SETTINGS-LOCAL-1)
- MEASURED: free scout list_projects and list_organizations in an IDE-plugin window - a second server claude_ai_Supabase carries apply_migration, execute_sql, deploy_edge_function, create_project, pause_project and a second project ref rsiyilsgclghplpoadlf; guard-bash.py hooks Bash only, so no MCP call is guarded (F-S115-LANE-WRITE-MCP-SURFACE-1)
- UNMEASURED: whether VERCEL_GIT_COMMIT_REF is set in the ignoreCommand environment; you measure it in a preview build log before relying on it
SELF-INVALIDATION: decays on the first push to master after the floor, and on any harness upgrade the owner reports.

## FALSIFIER
A command whose first token is not gh, or whose gh pr merge appears only inside a quoted argument, still refused falsifies A; a push to lane/* that builds a preview falsifies B; a boot silent on where the token lives falsifies C; any mcp__*__apply_migration, execute_sql, deploy_edge_function, create_project, pause_project, delete_* or restore_* call reaching a server from a lane window falsifies D.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the floor is the commit in evidence:floor | MEASURED: git ls-remote origin refs/heads/master | floor |
| the guard reads vocabulary | MEASURED: guard-bash.py:91 regex on origin/master applies to the whole command string, not to its first token | inline |

```evidence:floor
$ git ls-remote origin refs/heads/master
7c099fc6a6e6534dbabc4d9d0e4e89d84ac78c62	refs/heads/master
```

## STANDING ORDERS
- consumed_at is RETIRED. You do not merge. Subjects carry exactly one AG-4 token before the first colon. package.json is closed to this wave. You open no secret-bearing file; if a value is needed, say so and stop.

## ORDERS
```scope
- A · Purpose match. guard-bash.py tokenises the command with shlex and applies the merge and push rules only when the executed program is gh or git (first token, after any env assignments); text inside quoted arguments never triggers. Red tests: grep "gh pr merge" passes, gh pr merge -s still exits 2, git push --force still exits 2.
- B · Lane refs do not deploy. vercel-ignore.mjs: when VERCEL_GIT_COMMIT_REF starts with lane/ exit SKIP; unreadable ref still exits BUILD (failure honesty unchanged). Pin the new rule in api/cwf/__tests__/vercelIgnore.test.ts.
- D · MCP write absolute. PreToolUse hook on mcp__*: exit 2 when the last name segment is apply_migration, execute_sql, deploy_edge_function, create_project, pause_project, restore_project, create_branch, merge_branch, delete_branch, reset_branch or starts with delete_; exit 2 when any argument carries a project ref other than fjbrkimwvtpwoxhziidh. Read tools pass. One red test per name; the free boot gains a second positive control against this hook.
- C · Secrets in prose. free.md, producer.md, foreman.md each gain one paragraph: credentials live in the shell environment only; a value found in any file is reported as a finding and never printed. Boot digests in the report.
```

## SHARED SURFACES
.claude/hooks/** and tests ........... AG-4 sole owner
scripts/vercel-ignore.mjs + its test .. AG-4 sole owner
.claude/boot/*.md .................... AG-4, secrets paragraph only; AG-1 owns the poll and role sections on phase/adf-kademe-3-poll-and-done - rebase onto it if it lands first
package.json ......................... CLOSED - nobody this wave

## DECISION RIGHTS
tokeniser choice ........ AG-4
MCP refusal list ........ AG-4 may widen, never narrow; execute_sql stays refused even on a read_only server
skip condition shape .... AG-4; BUILD on unreadable is the Architect's
paragraph wording ....... AG-4

## DELIVERY
- Branch phase/adf-kademe-2-guard-fix-1 from the measured floor; push early.
- Report docs/relay/ADF-KADEME-2-GUARD-FIX-1-AG4-report.md plus JSON twin; the three red tests verbatim.
- Open the pull request against master; do not merge it.
- Report opens with read relay_inbox at <ISO> - read OK - N rows since ADF-KADEME-2-GUARD-FIX-1-v2; closes with git status --porcelain -uall and git worktree list.
