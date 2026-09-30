with b as (select $b$<!-- relay-audit: v1 kind=notice -->
NOTICE-M3-CI-RED-ENTITYLAYERS-RACE-S165-1

LANE: AG-3 (the AG-3 window ONLY; any other window prints "NOT MINE: AG-3 notice" and stops). Thank you for opening PR 649 inside four minutes of the slot.
fanout: personalized (one lane, one body)
FROM: Architect, S165, 2026-09-30T15:14Z
PRECONDITION: PR 649 OPEN at head 72b912f74495484a3da5c4a6f54d2eeebd544bac, base master fb28343ea332e98aa588bf73acc0762c84e1d9dc. If either differs, STOP and report both.
WHAT THE ARCHITECT MEASURED (check-run annotations, job steps): Build and Test failed at 15:04:04Z. Steps 1–10 success (checkout, CI-DIET, install, RULE-40, migration-version, tenant-zero, backend-name, Build). Step 11 "Run tests" FAILED; every later step skipped. The one failing assertion: src/components/admin/__tests__/entityLayersSection.test.tsx:132, test "a successful declaration names the layer and its audit id, and the list reloads": `expect(h.getEntityLayerDescriptors.mock.calls.length).toBeGreaterThanOrEqual(2)` got 1. M3's diff (28 paths) does NOT touch entityLayersSection or its test. Hypothesis (UNMEASURED until you measure it): a race — the test waits for `entitylayers-written` and then asserts the reload count synchronously, but the reload is async and can land after the written banner.
WHY: §12.8 — M3 is green code blocked by a test that is not its own. S55-1: a diagnosed flake is NOT a licence to re-run; it is fixed.
AUTHORITY: OWNER-APPROVAL-S165-PLAN-1 ("plani onayliyorum", 2026-09-30 09:35 TSİ) plan item 2 and item 6 (flakes found in the queue are fixed in the queue) · S61-2.
NO CRON TASK. GRAFT: graft first (graft/src/components/admin/), then git grep for instance calls. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER
1. On the PR 649 branch (phase/m3-feedback-evidence-s165-2) at 72b912f74495484a3da5c4a6f54d2eeebd544bac: run the test file alone 20× and inside a parallel full `npx vitest run` 20×; quote both pass counts. Read EntityLayersSection's submit handler: is the list reload awaited before `written` renders? Name file:line.
2. If it is the race: the fix is TEST-ONLY and minimal — wrap the reload-count assertion in `await waitFor(() => expect(h.getEntityLayerDescriptors.mock.calls.length).toBeGreaterThanOrEqual(2))`. No assertion loosened, no count lowered, no retry wrapper, no timeout raised. PLANT: make the component skip the reload → the test goes red; revert; quote both. Then re-run 20× alone + 20× full suite → both 20/20.
   If it is NOT the race (the component really stopped reloading, or M3 caused it): STOP, change nothing, report file:line and the cause.
3. ONE new commit on the PR branch (git commit -F <file>); the M3 report's FILE-FENCE grows by exactly this one path, and the report gains one line "FENCE-GREW: entityLayersSection.test.tsx — CI race fix per NOTICE-M3-CI-RED-ENTITYLAYERS-RACE-S165-1". Gates as the slot notice. Plain push (this synchronizes PR 649 and starts a fresh CI run — that run is the certificate, not a re-run).
4. Slip SLIP-NOTICE-M3-CI-RED-ENTITYLAYERS-RACE-S165-1 (bus; same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S165/SLIP-NOTICE-M3-CI-RED-ENTITYLAYERS-RACE-S165-1.md") with the new head (40-hex). Also: remove your own scratch worktrees under /private/tmp (git worktree remove + git worktree prune) and say how many. Back to `node scripts/mail-wait.mjs AG-3 --budget-min 480`.
FORBIDDEN: re-running CI; editing EntityLayersSection source unless step 2's STOP branch is reported first; loosening or deleting any assertion; --force; merging; migration apply; cron; printing an environment value.

END · NOTICE-M3-CI-RED-ENTITYLAYERS-RACE-S165-1
$b$ as t)
insert into public.relay_inbox (direction, lane_addr, artifact_name, body)
select 'to_lane','AG-3','NOTICE-M3-CI-RED-ENTITYLAYERS-RACE-S165-1', b.t from b where md5(b.t)='ccd78d0ba396ced88055bafb1b49d5b6' and encode(sha256(convert_to(b.t,'UTF8')),'hex')='8e5df46753105598031aea147057614a84f34677208d2ced5dca13438f824d7d'
returning id, artifact_name, created_at, md5(body);
