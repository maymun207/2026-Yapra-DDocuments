<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-PR628-S161-1-v1

LANE: scout (scout-1 window; /clear first)
fanout: personalized (one lane, one body)
FROM: Architect, S161, 2026-09-28T04:15Z
OWNER APPROVAL: OWNER-APPROVAL-S161-PLAN-1 ("onay S161 planı", 2026-09-28 02:37 TSI), plan step P5 (A25 E1 cards, row 113); OWNER-RULING-S153-NO-ARMES-HARDCODE-1 ("BU SENIN CWF icin en ONELI KURALIN"); OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1.
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
GRAFT: graft first; your status carries a GRAFT line.
SECURITY: never print, echo, printenv or cat any environment variable.
WHAT: adversary landing review of PR 628 (CARD-E1C-BACKEND-NAME-GATE-S161-1-v2, bus row 134a0e90-5991-4a5b-9254-8cb89438327d, md5 bd27af879277300d18ba43d424122299, AG-2, register row 113 / E1-c) on its CURRENT head. The review is done NOW so defects surface while the branch waits; the POST is conditional (step 5).

## PREMISE
READ (Architect, GitHub API, 2026-09-28T04:10Z): PR 628 open, head c32f821bd9a3c90265cce964c86923f9bf3fa557, base master c58438b59cff4d1d403634b28e44af9b01db6dea, three commits (4964a67fc22255c836493dd224f468a704899f69 report with fence; 3d2c27a7e677c93ed4bc1ec74ec6761c1b99b527 instrument + gate; c32f821bd9a3c90265cce964c86923f9bf3fa557 report: first CI run), 11 files. actions/runs at that head (04:10Z): Auto-merge landing success; Relay corpus and report-schema in_progress; Build and Test FAILURE — job "changes" failed at step 6 "Merge guard (clean-merge + file-fence, run from the merge-base)"; jobs rule26, build, eval-canary SKIPPED. The author's own commit subject says the guard is BLOCKED on COLLISION with PR 627. Steps 7 onward at this head are UNMEASURED, not red (§12.12 reading rule).
Consequence: PR 628 cannot land before PR 627 lands (scout-2 is on that: ORDER-SCOUT-LAND-PR627-S161-1-v2). After PR 627 lands, AG-2 merges master into its branch and pushes; that new head gets its own CI run and a v2 of THIS order posts on it.
SELF-INVALIDATION: dies if PR 628's head is not c32f821bd9a3c90265cce964c86923f9bf3fa557. If the head moved, review the head you find, print both, and say so in the first line.
ON-DISAGREEMENT: YOUR READING WINS; print both.

## STEPS
1. Print git ls-remote for master and refs/pull/628/head (full 40-hex), read twice.
2. REVIEW on the PR head, quoting bytes (git diff master..HEAD; 11 paths):
   a. FENCE: quote the FILE-FENCE block from docs/relay/E1C-BACKEND-NAME-GATE-S161-1-AG2-report.md as it stands in the FIRST commit; `git diff --name-only master..HEAD` set difference both ways (a superset fence is legal; diff-minus-fence must be EMPTY).
   b. ORDER 1 (instrument): scripts/backendNamesLens.ts is a PURE core (no fs, no process) and scripts/checkBackendNames.ts is the entry; ids come from data/backends/index.json (`git grep -n -E "'armes'|\"armes\"|armes-new" -- scripts` at head must be EMPTY outside the baseline JSON — quote the grep); tokenizer splits camelCase, `_`, `__`, `-` and matches by SEGMENT EQUALITY (quote the function; a containment match like `supersetArmes` counted by substring is RED); classes code/tests/fixtures/public/scripts/workflows/other with the exemptions as the card names them (data/backends/<id>/**, data/backends/index.json, supabase/migrations/**, docs/**, root dotfiles); exits 0/1/2 and `--self-test` with planted RED, clean GREEN, REFUSED scenarios; ENROLLED_INSTRUMENTS in scripts/harnessSelfTest.ts contains the new entry (quote the line).
   c. ORDER 2 (baseline + gate): data/gates/backend-names-baseline.json exists at head (NOT under docs/ground); gate is EXACT MATCH per (id, class) both directions; `--arm-zero` reds every class except fixtures for every id not in nameGate.zeroExempt; the remedy message names `--write-baseline`. Run `npm run check:backend-names` at the head yourself in a scratch worktree and quote its JSON summary and exit code — it must be 0 at its own baseline.
   d. ORDER 3 (data): data/backends/index.json carries `nameGate.zeroExempt` + `reason`; shared/backendData.ts types it; the script READS it (quote the read).
   e. ORDER 4 (wiring): package.json script uses `node --import tsx`; .github/workflows/build-test.yml step "Backend-name gate" sits after the Tenant-zero gate WITH `if: needs.changes.outputs.heavy == 'true'`; NOT inside `npm run build` (quote package.json build line unchanged).
   f. ORDER 5 (tests): api/cwf/__tests__/backendNamesLens.test.ts uses INVENTED ids through a fixture index — for EVERY id in data/backends/index.json at head, `git grep -n -i -F "<id>" -- api/cwf/__tests__/backendNamesLens.test.ts` must be EMPTY (quote the loop and its empty output); covers per-variant segment matching, class assignment with exemptions, exact-match fail both directions, --arm-zero.
   g. ORDER 6: UI/UX none and REMOVALS none — confirm no diff under src/.
   h. ORDER 7 counts: `git grep -n -E "armes|Armes|ARMES" -- api src shared scripts public e2e ':!*__tests__*'` at master and at head — must not grow; quote both counts. The id × class table from the report, quoted.
   i. Report grammar: scripts/relayAudit.ts on the report at head — quote the result.
   j. FORBIDDEN surfaces: zero diff under api/cwf/_lib (quote `git diff --stat master..HEAD -- api/cwf/_lib`, expected empty).
3. CI at the CURRENT head by full sha, read twice: name every job and its conclusion by NAME; for the failed "changes" job quote the merge-guard line(s) that name the COLLISION and the paths that collide with PR 627 (from the job log if readable; if the log endpoint refuses, say so and quote the refusal). Steps after the failed step are reported as SKIPPED, never as passing.
4. Do not dispatch, do not re-run (S55-1), do not merge.
5. POST RULE: at THIS head the merge guard is red on collision, so do NOT post. Your status is the content verdict: `ADVERSARY-VERDICT: GREEN-CONTENT|RED pr=628 head=<40-hex> ci=BLOCKED-COLLISION-627`. If master has ALREADY moved past c58438b59cff4d1d403634b28e44af9b01db6dea when you read step 1 AND the PR head has a NEW push with a merge from master AND its CI is 4/4 success with a GREEN merge guard — then and only then post adversary/scout success on that head and print one read of master afterwards.
REPLY with scout_reply (NOT laneSlip — laneSlip refuses the scout address, measured S161) as SCOUT-STATUS-LAND-PR628-S161-1. If the bus write is refused, write the full reply to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S161/SCOUT-STATUS-LAND-PR628-S161-1.md", print its sha256 and the exact error line, stop.
FORBIDDEN: no edit, no push, no merge, no re-run, no workflow dispatch, no poll task, no cron; never print an environment value.

END · ORDER-SCOUT-LAND-PR628-S161-1-v1
