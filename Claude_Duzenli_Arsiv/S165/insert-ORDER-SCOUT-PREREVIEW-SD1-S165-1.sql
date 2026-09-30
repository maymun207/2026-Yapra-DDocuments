with b as (select $b$<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-PREREVIEW-SD1-S165-1

LANE: scout-1 (the scout-1 window ONLY; scout-2 prints "NOT MINE: scout-1 order" and stops). Thank you for landing PR 646 (merge 763a54bc551572137276afa6cc55446e80c934cc) — and a correction on the Architect's side: the S165 opening wrongly called your window "dropped"; you were running the order.
fanout: personalized (one lane, one body)
FROM: Architect, S165, 2026-09-30T07:06Z
PRECONDITION: branch phase/sd1-numeric-grouping-exempt-s164-1 on origin at c7378c169e81f559bf87cbcd022eb6693dd0e294 (AG-1, parent 61e7f368604ffdd86b8841d9063e540641d42efc). If it differs, STOP and report both shas.
WHY: SD1 (register 155; registers 106, 59) is built on CARD-SD1-NUMERIC-GROUPING-EXEMPT-S164-1-v2 (full text doc repo S164/). Its PR slot comes after 647 (M1B), M3 and M4a. A pre-review NOW — like scout-2's M4a pre-review — turns any red into a fix before the slot, so the slot costs zero rework. PRE-REVIEW ONLY: no status, no landing.
AUTHORITY: OWNER-APPROVAL-S165-PLAN-1 ("plani onayliyorum", 2026-09-30 09:35 TSİ) — SD1 is plan item 5 · §12.1 · §12.8.
NO CRON TASK. GRAFT: graft first, then git grep for instance calls. SECURITY: never print, echo, printenv or cat any environment variable.

## STEPS
1. `git fetch origin phase/sd1-numeric-grouping-exempt-s164-1 master`; print both heads (40-hex).
2. vs CURRENT master (763a54bc551572137276afa6cc55446e80c934cc or later): `git merge-tree --write-tree <master> c7378c169e81f559bf87cbcd022eb6693dd0e294` → name every conflicted path; say whether a reseal is needed at the PR slot.
3. CARD FIDELITY: read CARD-SD1-NUMERIC-GROUPING-EXEMPT-S164-1-v2 and SCOUT-STATUS-REVIEW-CARD-SD-S164-1 (scout-2's Δ1–Δ9, doc repo S164/). For each delta that concerns SD1, say GREEN or RED at the head with file:line.
4. The report docs/relay/SD1-NUMERIC-GROUPING-EXEMPT-S164-1-AG1-report.md: EXACTLY ONE `FILE-FENCE:` line + `- <path>` lines equal to the diff vs its parent (merge-base scripts/mergeGuard.mjs: quote blocks, problems, diff-not-fence, fence-not-diff). No bare 7–39 hex in prose.
5. In a SCRATCH worktree at the head: the touched suites + typecheck:api; quote summary lines. PLANT the card's named fault if it names one (otherwise the obvious one: remove the exemption) → the guarding test goes red; revert; quote both.
6. CI-only gates that will judge the PR (Build and Test, Relay corpus, report-schema, rule26; eval-canary SKIPPED): name any the branch will predictably trip (e.g. a bare hex band in the report, a backend literal).
7. scout_reply (p_from 'scout-1') as SCOUT-STATUS-PREREVIEW-SD1-S165-1, first line `PREREVIEW-VERDICT: GREEN|RED branch=phase/sd1-numeric-grouping-exempt-s164-1 head=c7378c169e81f559bf87cbcd022eb6693dd0e294`, each RED delta paste-ready (file, line, the exact change). Same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S165/SCOUT-STATUS-PREREVIEW-SD1-S165-1.md". Back to `node scripts/mail-wait.mjs scout-1 --budget-min 480`.
FORBIDDEN: no status posted, no edit, push, merge, re-run, dispatch, cron, migration apply; never print an environment value.

END · ORDER-SCOUT-PREREVIEW-SD1-S165-1
$b$ as t)
insert into public.relay_inbox (direction, lane_addr, artifact_name, body)
select 'to_lane','scout-1','ORDER-SCOUT-PREREVIEW-SD1-S165-1', b.t from b where md5(b.t)='014ae5dfe694739a87a3f6b44a91c1a9' and encode(sha256(convert_to(b.t,'UTF8')),'hex')='2b71c265ebbd3cad4cb07241831f6c96e56080380bb57684ac89c9ca220b92e2'
returning id, artifact_name, created_at, md5(body);
