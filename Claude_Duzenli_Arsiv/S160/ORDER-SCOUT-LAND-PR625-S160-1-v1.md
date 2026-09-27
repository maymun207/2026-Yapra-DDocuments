<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-PR625-S160-1-v1

LANE: scout (scout-2 window; /clear first)
fanout: personalized (one lane, one body)
FROM: Architect, S160, 2026-09-27T17:10Z
OWNER APPROVAL: OWNER-APPROVAL-S160-PLAN-1, the owner's words "PLani onayliyorum" (2026-09-27 08:06 TSI), plan step 3 (A25 R6(g): ALWAYS_INCLUDE + assemble.ts 'superset' arm to data); OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1 (UI additions and removals ride with the card); OWNER-RULING-S153-NO-ARMES-HARDCODE-1; OWNER-RULING-S159-A25-ADOPT-1.
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
GRAFT: code context from graft first; your status carries a GRAFT line.
SECURITY: never print, echo, printenv or cat any environment variable.
WHAT: adversary landing review of PR 625 (CARD-ALWAYS-INCLUDE-TO-DATA-S160-1-v2, AG-4, register items 83/58) on the head that will land, and the adversary/scout status on it. PR 625 SUPERSEDES PR 624 (closed, not merged) per NOTICE-PR624-FRESH-BRANCH-S160-1: same code, fresh branch off master, first commit carries the complete 77-path FILE-FENCE.

## PREMISE
READ (Architect, GitHub API, 2026-09-27T17:05Z): PR 625 head 6a4d7f763a5ab82e26cdaff02e4ce24eb1341481, base = master 9fbb0b9b4de44e192c8f5e4eb69f6d0cad6ad2c4, three commits (1743201a9241e441e614160d15d6c9d9aaea3494 report with fence; 82f5edbcd47efbe0837c424baccd2be23b98fc68 code; 6a4d7f763a5ab82e26cdaff02e4ce24eb1341481 relay-grammar fix), 77 files, +1639/-451. actions/runs at that head (first read total_count 0 at 16:49:56Z, second read 4 at 16:50:16Z; third read 17:04:52Z): Auto-merge landing success, report-schema success, Relay corpus success, Build and Test success (jobs: changes success, eval-canary SKIPPED, rule26 success, build (24.x) success). PR mergeable_state "blocked" = waiting for the adversary/scout status. Vercel commit status "success" with description "Canceled by Ignored Build Step" (preview not built; not a verdict).
READ: AG-4's window (owner relay, 19:48 TSI): fence holds locally; local guard VERDICT printed RED only because the sandbox could not perform the two GitHub-API reads (UNMEASURED); CI is the referee.
SELF-INVALIDATION: dies if PR 625's head is not 6a4d7f763a5ab82e26cdaff02e4ce24eb1341481 or master is not 9fbb0b9b4de44e192c8f5e4eb69f6d0cad6ad2c4. If master moved, write the verdict on content, print "needs master merge", do not post.
ON-DISAGREEMENT: YOUR READING WINS; print both.

## STEPS
1. Print git ls-remote for master and refs/pull/625/head (full 40-hex).
2. REVIEW on the PR head, quoting bytes (git diff master..HEAD; 77 paths):
   a. FENCE: quote the FILE-FENCE block from docs/relay/ALWAYS-INCLUDE-TO-DATA-S160-2-AG4-report.md as it stands in the FIRST commit; confirm `git diff --name-only master..HEAD` is a subset of it (print the set difference both ways; expected empty both ways); confirm e2e/rule26-admin.spec.ts is inside it (the path that grew PR 624's fence).
   b. CODE = PR 624's code: `git diff 4eb57c4a93d4701b87446877e38e6f2ff9f83f65 6a4d7f763a5ab82e26cdaff02e4ce24eb1341481 --stat -- . ':!docs/relay/'` — expected empty; print it. If not empty, list every path and treat each as unreviewed new code.
   c. ORDER 2 of the card: `git grep -n ALWAYS_INCLUDE` on the head returns nothing outside docs/ and the report (quote the count and every hit); api/cwf/_lib/toolCategories.ts no longer defines a Set of tool names; the floor is passed IN as data (name the RoutingCoreInput field and the filterToolsByMessage parameter by line).
   d. ORDER 1: api/cwf/_lib/knowledge/entryFloor.ts reads published tool_graph_node rows with role 'entry' OR floor:true and returns an honest unreadable-vs-empty result (quote the return type); coreSchemas ToolGraphNodeSchema carries `floor: z.boolean().optional()` and stays strict.
   e. ORDER 3: no self-exemption — evalGate RULE 31 and isPhantomTool do not special-case floor tools (quote the grep for "floor" in those files).
   f. ORDER 4: data/backends/index.json carries `packs` with superset → its provider; api/cwf/_lib/prompt/backends/superset/pack.ts is DELETED; assemble.ts has no `case 'superset'` literal (quote the grep); the `'machine-knowledge-base'` literal is left to item 82 and is NOT touched (quote).
   g. ORDER 5 (UI, owner ruling): RoutingTab shows the entry floor per backend from data ("Giriş araçları (veri)"), the ALWAYS_INCLUDE heading is gone, stagesRegistry's description is data-sourced, GovernanceTab has the floor checkbox "Kullanılabilirlik tabanı"; quote each by file:line. The e2e/rule26-admin.spec.ts locator change matches the new UI string exactly.
   h. ORDER 6: the new fixture api/cwf/__tests__/__fixtures__/entryFloorFixture.ts carries no tenant or backend vendor word (case-sensitive grep for armes|Armes|ARMES over ALL added lines in the PR; quote the count; expected 0 outside pre-existing test names); no test deleted (git diff --stat: deletions in __tests__ explained by the removed superset pack test only).
   i. Report grammar: run scripts/relayAudit.ts auditText on the report on the head; quote the result (expected no violations; PR 624's three R-ANCHOR/R-DIFF violations were the reason for 9bcc936c).
   j. QUOTE the merge guard VERDICT line from the Build and Test run's "changes" job at this head.
3. CI at the CURRENT head by full sha: read actions/runs?head_sha=6a4d7f763a5ab82e26cdaff02e4ce24eb1341481; a zero read twice; every SKIPPED job named by workflow/job NAME (never a run id in prose). Do not dispatch anything; do not re-run (S55-1).
4. If clean and all four PR workflows are success: post adversary/scout success on that head; then ONE read (no wait loop) of master: print whether auto-merge landed and the merge sha if it did. If any review step fails: RED with the file:line and the step letter; do not post.
REPLY with scout_reply (NOT laneSlip) as SCOUT-STATUS-LAND-PR625-S160-1, first line `ADVERSARY-VERDICT: GREEN|RED pr=625 head=<40-hex>`. If the bus write is refused, print the full reply and the exact error line and stop.
FORBIDDEN: no edit, no push, no merge, no re-run, no workflow dispatch, no poll task, no cron; never print an environment value.

END · ORDER-SCOUT-LAND-PR625-S160-1-v1
