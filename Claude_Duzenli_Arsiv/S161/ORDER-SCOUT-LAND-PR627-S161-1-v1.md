<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-PR627-S161-1-v1

LANE: scout (scout-2 window; /clear first)
fanout: personalized (one lane, one body)
FROM: Architect, S161, 2026-09-28T00:48Z
OWNER APPROVAL: OWNER-APPROVAL-S161-PLAN-1, the owner's words "onay S161 planı" (2026-09-28 02:37 TSI), plan step P4 (row 114 small card); OWNER-RULING-S161-F3-F6-1 ("F3 onay, F6 onay"); OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1; OWNER-RULING-S153-NO-ARMES-HARDCODE-1.
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
GRAFT: code context from graft first; your status carries a GRAFT line.
SECURITY: never print, echo, printenv or cat any environment variable.
WHAT: adversary landing review of PR 627 (CARD-ENTRY-FLOOR-REQUIRED-S161-1-v1, AG-4, register rows 114/115/84/116) on the head that will land, and the adversary/scout status on it. PR 627 SUPERSEDES PR 626 (closed, not merged; its first-commit fence was not in the guard's dialect): fresh branch off the same master, tree byte-identical apart from the report.

## PREMISE
READ (Architect, GitHub API, 2026-09-28T00:42Z): PR 627 head b8b5ff07bfb31ba4e969823b975aec92dd659656, base = master c58438b59cff4d1d403634b28e44af9b01db6dea, three commits (ab09ee278cbc01f08d9c9c864e6d1db990548886 report with fence; f967202c44e54641a78d5da75213382d11552166 code; b8b5ff07bfb31ba4e969823b975aec92dd659656 relay-grammar fix, report only), 29 files, +648/-149. actions/runs at that head (read twice at 00:42Z, total_count 4 both times): Auto-merge landing success, report-schema success, Relay corpus success, Build and Test IN PROGRESS (started 00:35:02Z). PR mergeable_state "blocked". Vercel commit status "success" with description "Canceled by Ignored Build Step" (not a verdict).
READ: the PR body names one ON-DISAGREEMENT item — TS1016 (a required parameter cannot follow optional ones); AG-4 printed both readings in the report. You judge the resolution against the card's intent (no caller may omit the floor and compile).
SELF-INVALIDATION: dies if PR 627's head is not b8b5ff07bfb31ba4e969823b975aec92dd659656 or master is not c58438b59cff4d1d403634b28e44af9b01db6dea. If master moved, write the verdict on content, print "needs master merge", do not post.
ON-DISAGREEMENT: YOUR READING WINS; print both.

## STEPS
1. Print git ls-remote for master and refs/pull/627/head (full 40-hex).
2. REVIEW on the PR head, quoting bytes (git diff master..HEAD; 29 paths):
   a. FENCE: quote the FILE-FENCE block from docs/relay/ENTRY-FLOOR-REQUIRED-S161-1-AG4-report.md as it stands in the FIRST commit; confirm `git diff --name-only master..HEAD` is a subset of it (print the set difference both ways; expected empty both ways); confirm e2e/rule26-admin.spec.ts is inside it.
   b. ORDER 1 (required floor): quote filterToolsByMessage's signature at the head and how TS1016 was resolved; confirm `git grep -n "entryFloor ?? " -- api` is empty; confirm the @ts-expect-error test exists and names the omitted floor; list EVERY caller of filterToolsByMessage( at the head with file:line (expected: stageTools.ts, routeShadowLens.ts, tests).
   c. ORDER 2 (F3): `git grep -n "Liste asla" -- src public e2e` empty; stagesRegistry.ts stage 07 purpose names the floor source (data · absent · unread); stageCardCoverage.ts claim + stageTools anchor; public/docs/cwf-arac-eslemesi-v1.md sentence; quote each.
   d. ORDER 3 (F6): api/admin/mcp-catalog.ts resolves the floor ONCE; `reachability: 'measured' | 'unread' | 'not-applicable'`; on 'unread' unreachableTools is [] and NO tool name comes from code or memory (quote); tests (i)(ii)(iii) present in api/admin/__tests__/mcpCatalog.test.ts.
   e. ORDER 4 (UI): MCPSettingsTab.tsx renders the unread badge with the i18n pair and data-testid="catalog-reachability-unread"; GovernanceTab.tsx key input has data-testid="rule-key-input" and the JSON error is derived on change AND blur; quote by file:line. REMOVALS: expected none — confirm no user-visible control was removed (diff of src/components/admin).
   f. ORDER 5 (e2e): rule26-admin.spec.ts:~670 uses getByTestId('rule-key-input'); the ORDER 5 grep output is in the report.
   g. ORDER 6 counts: `git grep -n -E "armes|Armes|ARMES"` over the 29 changed paths, before (master) and after (head) — must not grow; quote both counts.
   h. Report grammar: scripts/relayAudit.ts auditText on the report at the head; quote the result (expected no violations).
   i. Any change to routing ORDER, category matching, floor RESOLUTION or the composed prompt (card FORBIDDEN): expected none; quote the diff of toolCategories.ts to show only the parameter + :1927 changed.
   j. QUOTE the merge guard VERDICT line from the Build and Test run's "changes" job at this head.
3. CI at the CURRENT head by full sha: read actions/runs?head_sha=b8b5ff07bfb31ba4e969823b975aec92dd659656; if Build and Test is still in_progress, read ONCE more after your review (no wait loop — your review takes minutes); every SKIPPED job named by workflow/job NAME (never a run id in prose). Do not dispatch anything; do not re-run (S55-1).
4. If clean and all four PR workflows are success: post adversary/scout success on that head; then ONE read (no wait loop) of master: print whether auto-merge landed and the merge sha if it did. If Build and Test is still in_progress after your second read: print "CI PENDING at <time>" with the review verdict, do NOT post, stop — the Architect re-issues a v2 for the post. If any review step fails: RED with the file:line and the step letter; do not post.
REPLY with scout_reply (NOT laneSlip — laneSlip refuses the scout address, measured S161) as SCOUT-STATUS-LAND-PR627-S161-1, first line `ADVERSARY-VERDICT: GREEN|RED pr=627 head=<40-hex>`. If the bus write is refused, write the full reply to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S161/SCOUT-STATUS-LAND-PR627-S161-1.md", print its sha256 and the exact error line, stop.
FORBIDDEN: no edit, no push, no merge, no re-run, no workflow dispatch, no poll task, no cron; never print an environment value.

END · ORDER-SCOUT-LAND-PR627-S161-1-v1
