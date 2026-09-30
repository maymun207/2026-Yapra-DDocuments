with b as (select $b$<!-- relay-audit: v1 kind=notice -->
NOTICE-M1B-CARRY-PR-S165-1

LANE: AG-1 (the AG-1 window ONLY; any other window prints "NOT MINE: AG-1 notice" and stops). Thank you for SLIP-CARD-SD1-NUMERIC-S164-1 and SLIP-PUSH-DOC-REPO-S164-3 — both read.
fanout: personalized (one lane, one body)
FROM: Architect, S165, 2026-09-30T07:00Z
PRECONDITION: branch phase/m1b-iserror-readers-s164-1 on origin at 3c44ed752de5949958ea25f928d8c9b76f5a87cf (ONE commit by AG-4, parent 41450c98f75c18d0fe0e4c59bb1e8c8b73d384b1 = the PR 641 merge). Read it with ls-remote; if it differs, STOP and report both shas.
WHY: M1B (register 152) is finished and was measured by scout-1 as a manifest-only conflict against current master. It is the NEXT landing after PR 646 (POST-LANDING-1). AG-4 is busy on NOTICE-M4A-N1-N2-S165-1, so you carry it. Register 145: every PR comes from a branch cut from CURRENT master. §13.11: one open PR at a time, so this PR opens only after 646 is merged.
AUTHORITY: OWNER-APPROVAL-S165-PLAN-1 ("plani onayliyorum", 2026-09-30 09:35 TSİ) item 1 (M1B) · register 145, 152 · §12.8 · §13.11.
NO CRON TASK. GRAFT: graft first, then git grep for instance calls. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER
1. NAMED WAIT for the slot: read `git ls-remote origin refs/heads/master` every 60 s, at most 20 reads. TARGET: master is no longer 61e7f368604ffdd86b8841d9063e540641d42efc AND `gh pr view 646 --json state,mergeCommit` says MERGED with that merge commit = the new master. Print every read. If the 20 reads end without it, write the slip with status WAITING-FOR-646, print the last read, and go back to mail-wait (do NOT open a PR while 646 is open).
2. Fresh branch: `git fetch origin master` and `git switch -c phase/m1b-iserror-readers-s165-1 origin/master`. Print the base sha (40-hex).
3. `git cherry-pick 3c44ed752de5949958ea25f928d8c9b76f5a87cf`. The expected conflict is public/architecture/manifest.json ONLY. Resolve it the house way: take master's manifest (`git checkout --theirs` is WRONG here — take the base: `git checkout HEAD -- public/architecture/manifest.json`), then `npm run reseal`. Any conflict in a file OTHER than the manifest → `git cherry-pick --abort`, STOP, report the file list.
4. Verify the reseal the measured way: the re-derived digests match the ones the gate reports, and `git diff --stat origin/master` shows exactly the twelve M1B paths (the eleven code/test/report paths plus public/architecture/manifest.json). The report docs/relay/M1B-ISERROR-READERS-S164-1-AG4-report.md is AG-4's file: you do NOT edit it (§12.12). Its single `FILE-FENCE:` line + `- <path>` lines must equal the diff; check it with the merge-base's scripts/mergeGuard.mjs and quote `blocks`, `problems`, `diff-not-fence`, `fence-not-diff`. If the fence does not equal the diff, STOP and report — the author repairs its own file.
5. GATES (local): `npm run build` · typecheck:api · check:rule24 · check:tenant-zero · check:backend-names · relayAudit over docs/relay/ · the M1B suites (gatewayEnumerate, mcpIsErrorPassthrough, recordToolCall, entityDiscoverySync, examScorers) — quote summary lines. CI-ONLY gates that will judge the PR: Build and Test, Relay corpus, report-schema, rule26; eval-canary expected SKIPPED and named as SKIPPED.
6. `git cherry-pick --continue` with the ORIGINAL message plus one line: "Carried by AG-1 onto master <new-master-40-hex> (register 145); manifest resealed." (message via a FILE and -F). ONE commit, parent = the new master. Plain push; ls-remote; print the head.
7. Open the PR (non-draft, title starting "AG-4: M1B —", body names the carry and the original sha 3c44ed752de5949958ea25f928d8c9b76f5a87cf). Do NOT merge; the scout lands it.
8. Slip SLIP-NOTICE-M1B-CARRY-PR-S165-1 to the bus (first line `pr=<n> branch=phase/m1b-iserror-readers-s165-1 head=<40-hex> base=<40-hex>`), same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S165/SLIP-NOTICE-M1B-CARRY-PR-S165-1.md". Back to `node scripts/mail-wait.mjs AG-1 --budget-min 480`.

FORBIDDEN: opening the PR while 646 is open; editing AG-4's report or any M1B source beyond the cherry-pick; a rebase; --force; merging; re-running CI; cron; printing an environment value.

END · NOTICE-M1B-CARRY-PR-S165-1
$b$ as t)
insert into public.relay_inbox (direction, lane_addr, artifact_name, body)
select 'to_lane','AG-1','NOTICE-M1B-CARRY-PR-S165-1', b.t from b where md5(b.t)='297e242dc333fe36e4a55a0689dfa408' and encode(sha256(convert_to(b.t,'UTF8')),'hex')='c51b58f7dcfc21e1fbbe59e24eba1bf2e831d8d69d252ba7acaea168cd910720'
returning id, artifact_name, created_at, md5(body);
