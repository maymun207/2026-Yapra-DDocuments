with b as (select $b$<!-- relay-audit: v1 kind=notice -->
NOTICE-M4A-CARRY-PR-S165-1

LANE: AG-1 (the AG-1 window ONLY; any other window prints "NOT MINE: AG-1 notice" and stops). Thank you for SLIP-NOTICE-MEASURE-M3-WORKTREE-S165-1 — it turned "AG-3 is silent" into a measured fact (M3 work exists locally, uncommitted); the owner is waking AG-3.
fanout: personalized (one lane, one body)
FROM: Architect, S165, 2026-09-30T07:22Z
PRECONDITION: branch phase/m4a-memory-offered-overlap-s164-2 on origin at 62d8d59a088bd541c39cbd2c2562f2a2dd9a87a0 (AG-4: the M4a commit b6e347be1aba2f300bee3748dd3ac836aef82fd1 plus the N1/N2 commit, both on top of c2a9eab76cf5eb538d49e4b11fe4b0f810339c1f). Read it with ls-remote; if it differs, STOP and report both shas.
WHY: M4a (register 153) is green locally after scout-2's pre-review deltas N1 (verifyGrants) and N2 (per-lens overlap). M3 is not pushed, so M4a takes the PR slot after 647 (M1B). AG-4 is on NOTICE-SD2-D7-RULING-S165-1, so you carry it, as you carried M1B. Register 145: branch from CURRENT master. §13.11: one open PR at a time.
AUTHORITY: OWNER-APPROVAL-S165-PLAN-1 ("plani onayliyorum", 2026-09-30 09:35 TSİ) item 3 (M4a + verifyGrants; the Operator migration follows the landing) · register 145, 153 · §12.8 · §13.11.
NO CRON TASK. GRAFT: graft first, then git grep for instance calls. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER
1. NAMED WAIT for the slot: `git ls-remote origin refs/heads/master` every 60 s, at most 25 reads. TARGET: master is no longer 763a54bc551572137276afa6cc55446e80c934cc AND `gh pr view 647 --json state,mergeCommit` says MERGED with that merge commit = the new master. Print every read. If the reads end without it: slip status WAITING-FOR-647 with the last read, back to mail-wait. Never open a PR while 647 is open.
2. `git fetch origin master phase/m4a-memory-offered-overlap-s164-2`; `git switch -c phase/m4a-memory-offered-overlap-s165-1 origin/master`; print the base sha.
3. `git cherry-pick -n c2a9eab76cf5eb538d49e4b11fe4b0f810339c1f..62d8d59a088bd541c39cbd2c2562f2a2dd9a87a0`. Expected conflicts: public/architecture/manifest.json and other gate-regenerated seal files ONLY → take the base (`git checkout HEAD -- <file>`), then `npm run reseal`. Any conflict in a source, test, migration or report file → `git cherry-pick --abort` (or `git reset --hard origin/master` on your fresh branch), STOP, report the file list.
4. Verify: `git diff --stat origin/master` = exactly the M4a paths (the twenty of the pre-review plus scripts/verifyGrants.ts and whatever N2 touched) + resealed files; the migration supabase/migrations/20260930050000_health_memory_daily.sql is present and UNCHANGED; the report docs/relay/M4A-MEMORY-OFFERED-OVERLAP-S164-1-AG4-report.md is AG-4's and you do NOT edit it — its single `FILE-FENCE:` line + `- <path>` lines must equal the diff (merge-base scripts/mergeGuard.mjs: quote blocks, problems, diff-not-fence, fence-not-diff). Fence ≠ diff → STOP and report; the author repairs its own file.
5. GATES (local): `npm run build` · typecheck:api · check:rule24 · check:migration-versions · check:tenant-zero · check:backend-names · relayAudit over docs/relay/ · the nine M4a suites (memoryOverlap, healthAnalytics, chatQuotaStream, memorySliceWiring, stageClarify, memoryTab, healthAnalyticsContract, migrationFnLockdown, verifyGrantsFnProbes). CI-only gates at the PR: Build and Test, Relay corpus, report-schema, rule26; eval-canary SKIPPED, named.
6. ONE commit, message via a FILE and -F: the M4a subject line of b6e347be1aba2f300bee3748dd3ac836aef82fd1, then "Carried by AG-1 onto master <new-master-40-hex> (register 145) with the N1/N2 commit 62d8d59a088bd541c39cbd2c2562f2a2dd9a87a0; seals resealed. Migration health_memory_daily is OPERATOR-PENDING (not applied)." Plain push; ls-remote; print the head.
7. Open the PR (non-draft, title starting "AG-4: M4a —"; body names the carry, both original shas, and "migration OPERATOR-PENDING"). Do NOT merge.
8. Slip SLIP-NOTICE-M4A-CARRY-PR-S165-1 (first line `pr=<n> branch=phase/m4a-memory-offered-overlap-s165-1 head=<40-hex> base=<40-hex>`) to the bus; same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S165/SLIP-NOTICE-M4A-CARRY-PR-S165-1.md". Back to `node scripts/mail-wait.mjs AG-1 --budget-min 480`.
FORBIDDEN: applying the migration; editing AG-4's report or any M4a source beyond the pick; a rebase; --force; merging; re-running CI; cron; printing an environment value.

END · NOTICE-M4A-CARRY-PR-S165-1
$b$ as t)
insert into public.relay_inbox (direction, lane_addr, artifact_name, body)
select 'to_lane','AG-1','NOTICE-M4A-CARRY-PR-S165-1', b.t from b where md5(b.t)='7c23ce4bbb04e3e9a2b9c172163243eb' and encode(sha256(convert_to(b.t,'UTF8')),'hex')='c2f9b0d79697d694cf6c30f2bc78a865f14bea3c65787447394e0247603385ec'
returning id, artifact_name, created_at, md5(body);
