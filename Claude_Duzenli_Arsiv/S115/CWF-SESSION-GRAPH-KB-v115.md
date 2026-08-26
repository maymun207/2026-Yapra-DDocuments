# CWF SESSION GRAPH KB — v115 (S115 delta)
Append to v114. One line per learned edge; primary sources in repo/bus.

- Poller budget was solving a nonexistent problem; closed windows stop polling by themselves → NO-BUDGET law (boots, #361). Only guard: POLL-DEGRADED on 5 CONSECUTIVE read-fails, keeps polling.
- Harness scheduled tasks fire only while a session is idle and may never fire uninteracted → tick starvation is a substrate property; remedies: drain-in-turn (next wave), H10 dispatch, Desktop trial.
- Land order B reads authorship from subject PREFIX before first colon; merge commits excluded (--no-merges). Card-named subjects are unattributable → reseal is the lawful cure (twice proven).
- Reseal identity lens: absolute tree equality only holds if master hasn't moved mid-card; else diff-set equality (delta == the intervening landings' files exactly).
- step 2 update-branch → post-update head re-read RACES GitHub's async ref update; CI/rehearsal can certify a stale head. Guard: re-read until CHANGED, bind verdicts to that full 40-hex.
- Commit-status rollup and check-runs are DISJOINT sets here (legacy Vercel vs Actions); rollup success can coexist with a running build; cancellation wears state=success with only a description telling.
- Permission rules match by command PREFIX; an env assignment is part of the prefix → allow-rule and invocation must agree byte-for-byte (ADF_LANE_ROLE=AG-5 form).
- land.ts wants an ADDRESS in ADF_LANE_ROLE (/^AG-\d+$/); guard-bash wants the word foreman only for direct gh pr merge text — the two readers never collide on the npm run land path.
- read-only MCP transport refuses INSERT inside a SECURITY DEFINER function (25006) — transport gates fire before function gates; proving function gates needs a channel that reaches the INSERT (REST rpc did: 200/400/400).
- A publishable key + an unguessable question-row uuid is a sufficient gate for an append-only, reply-tied, size-capped function; no secret needed.
- Harness classifier: tightening a fence passes unremarked, loosening is refused — used as policy (execute_sql stays refused; named script channel instead).
- Workspace folder→workspace reopen restarts plugin windows; old-session tabs wake as zombies. Healthy zombie behavior (proven 4x): measure holder liveness, FULL STOP, touch no refs, clean own worktree only.
- launchctl setenv dies at reboot; durable recipe = zshrc value + zshrc self-refresh line launchctl setenv SUPABASE_ACCESS_TOKEN "$SUPABASE_ACCESS_TOKEN"; verify by md5 chain, never print.
- tsc -b (incremental) can miss a dead @ts-expect-error that CI's clean build reds → local verification must be byte-identical to CI's command.
- gh pr checks exit code is the honest union view (8 while pending); /status alone is categorically blind to Actions.
- git cat-file -e cannot separate missing-path from missing-ref (both 128); verify the ref first; 2>/dev/null forbidden there — the distinguishing bytes live in stderr.
- Scout charter: not a lane, never claimable, Architect-only questions, answers only via scout_reply; independence = writes nothing, not obeys nobody.
