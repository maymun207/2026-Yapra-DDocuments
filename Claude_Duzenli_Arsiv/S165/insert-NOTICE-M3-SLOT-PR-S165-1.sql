with b as (select $b$<!-- relay-audit: v1 kind=notice -->
NOTICE-M3-SLOT-PR-S165-1

LANE: AG-3 (the AG-3 window ONLY; any other window prints "NOT MINE: AG-3 notice" and stops). Thank you for SLIP-NOTICE-M3-CARRY-PREP-S165-1 — the prep made this slot a one-command step.
fanout: personalized (one lane, one body)
FROM: Architect, S165, 2026-09-30T14:43Z
PRECONDITION: master fb28343ea332e98aa588bf73acc0762c84e1d9dc (PR 648 merge, 14:40:08Z); your prep branch phase/m3-feedback-evidence-s165-1 at 0e457088d2e8245f5954778ce53ee09e479f9261 (parent 9eab2178c898868106b0b578c500a3c46b8bd409). No other PR open. If any differs, STOP and report the shas.
WHY: M3 is next in the one-PR queue (OWNER-APPROVAL-S165-PLAN-1, "plani onayliyorum", 2026-09-30 09:35 TSİ, plan item 2). §12.8: green code reaches master within thirty minutes.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER
1. `git ls-remote origin refs/heads/master` twice = fb28343ea332e98aa588bf73acc0762c84e1d9dc.
2. New branch phase/m3-feedback-evidence-s165-2 from that master; `git cherry-pick -n 0e457088d2e8245f5954778ce53ee09e479f9261`. Expected: clean (648's tree is the prep's parent tree). Generated files (facts.json, baseline, manifest) regenerated if drift; ONE commit (git commit -F <file>), parent = master.
3. Tree check: `git diff 0e457088d2e8245f5954778ce53ee09e479f9261 <new head> --stat` must be empty or generated-files only; print it.
4. GATES as the prep (npm run build with reseal on drift · typecheck:api · check:rule24 · check:tenant-zero · check:backend-names · relayAudit · M3 suites + memoryTab + adminRowDiscipline). Report FILE-FENCE = diff vs fb28343ea332e98aa588bf73acc0762c84e1d9dc.
5. Plain push; open the PR (base master, non-draft) whose body says "Migration OPERATOR-PENDING: supabase/migrations/20260930060000_learning_snapshots_human_evidence.sql". Print PR number + head (40-hex).
6. Slip SLIP-NOTICE-M3-SLOT-PR-S165-1 (bus; same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S165/SLIP-NOTICE-M3-SLOT-PR-S165-1.md"). Back to `node scripts/mail-wait.mjs AG-3 --budget-min 480`.
FORBIDDEN: merging; applying the migration (Operator only); --force; editing M4a lines; cron; printing an environment value.

END · NOTICE-M3-SLOT-PR-S165-1
$b$ as t)
insert into public.relay_inbox (direction, lane_addr, artifact_name, body)
select 'to_lane','AG-3','NOTICE-M3-SLOT-PR-S165-1', b.t from b where md5(b.t)='4db81727ad079c0620c7638490184d3c' and encode(sha256(convert_to(b.t,'UTF8')),'hex')='e83a7ea754183389f93f2b0299bd29997535d85cbdbab3fc2b2292bc588710ff'
returning id, artifact_name, created_at, md5(body);
