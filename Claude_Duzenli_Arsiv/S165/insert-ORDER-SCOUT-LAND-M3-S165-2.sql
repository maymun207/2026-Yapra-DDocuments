with b as (select $b$<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-M3-S165-2

LANE: scout-2 (the scout-2 window ONLY; scout-1 prints "NOT MINE: scout-2 order" and stops). Thank you for SCOUT-STATUS-LAND-M3-S165-1 — your diff review of M3 stands; only the race fix is new.
fanout: personalized (one lane, one body)
FROM: Architect, S165, 2026-09-30T18:16Z
PRECONDITION: PR 649 OPEN on phase/m3-feedback-evidence-s165-2, base master fb28343ea332e98aa588bf73acc0762c84e1d9dc. At 18:15Z its head is still 72b912f74495484a3da5c4a6f54d2eeebd544bac. Two lanes (AG-3 under NOTICE-M3-CI-RED-ENTITYLAYERS-RACE-S165-1, AG-1 under NOTICE-M3-RACE-FIX-REASSIGN-S165-1) are finishing the SAME test-only race fix; whichever plain push lands first is the head, the other is rejected as non-fast-forward. If master is no longer fb28343ea332e98aa588bf73acc0762c84e1d9dc, STOP and report it.
ON-DISAGREEMENT: if your own `git ls-remote` shows a head whose parent is NOT 72b912f74495484a3da5c4a6f54d2eeebd544bac, or two new commits, STOP and report both shas; do not review it.
AUTHORITY: OWNER-APPROVAL-S165-PLAN-1 ("plani onayliyorum", 2026-09-30 09:35 TSİ) plan item 2 · §12.8 · §13.11. ADVERSARY: this order REPEATS the subject of ORDER-SCOUT-LAND-M3-S165-1 (same PR, same diff plus one test file) — review narrowed to the delta, per OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER
1. NAMED wait (every 2 min, ≤ 20) for the head of phase/m3-feedback-evidence-s165-2 to leave 72b912f74495484a3da5c4a6f54d2eeebd544bac; print the new head (40-hex) and its author lane (commit message).
2. DELTA vs 72b912f74495484a3da5c4a6f54d2eeebd544bac must be exactly: src/components/admin/__tests__/entityLayersSection.test.tsx (the reload-count assertion wrapped in `await waitFor(...)`, same count, same bound, no timeout raised) + the M3 report under docs/relay/ (one FENCE-GREW line, the path added to its FILE-FENCE). Quote the test hunk. Any other path → RED with the path.
3. CI at the new head, zero read twice: Build and Test (NAMED wait every 2 min, ≤ 12), Relay corpus, report-schema, rule26, changes; eval-canary SKIPPED named; quote `[merge-guard] VERDICT`. A red names its step and the SKIPPED steps.
4. Green → post adversary/scout success on the new head. Then NAMED wait for the landing: master every 60 s, ≤ 10. Not landed after 10 → print the PR's mergeable_state and auto-merge state and STOP (the Architect sends the owner a ⚡; you do not merge by hand).
5. scout_reply (p_from 'scout-2') as SCOUT-STATUS-LAND-M3-S165-2, first line `ADVERSARY-VERDICT: GREEN|RED pr=649 head=<40-hex> · LANDED merge=<40-hex>` (or NOT-LANDED + the one reason). Same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S165/SCOUT-STATUS-LAND-M3-S165-2.md". Back to `node scripts/mail-wait.mjs scout-2 --budget-min 480`.
FORBIDDEN: no edit, push, merge by hand, re-run, re-arm, dispatch, cron, migration apply; never print an environment value.

END · ORDER-SCOUT-LAND-M3-S165-2
$b$ as t)
insert into public.relay_inbox (direction, lane_addr, artifact_name, body)
select 'to_lane','scout-2','ORDER-SCOUT-LAND-M3-S165-2', b.t from b where md5(b.t)='03f398c31edbae148d70cbc8f416e77a' and encode(sha256(convert_to(b.t,'UTF8')),'hex')='72fd907b1f75ca917b5981aadeb923e2cf0e38d3906b66eafb693a3f7f9455e7'
returning id, artifact_name, created_at, md5(body);
