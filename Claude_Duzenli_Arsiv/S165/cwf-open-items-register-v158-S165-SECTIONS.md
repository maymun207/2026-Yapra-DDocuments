## S165 · HEADER FOR v158 (this version)
cwf-open-items-register-v158 — S165 sections. v158 = v157 bytes (docs/cwf-open-items-register-v157.md, unchanged, including its END line) + THIS file, concatenated by SCRIPT, never retyped. Cut 2026-09-30T17:3xZ at owner turn 17, UNATTENDED: the owner's Mac (bridge + all lane windows) has been unreachable since ~16:18Z, so the session may not reach turn 20; if it continues, this set is re-cut. The concatenation could not run at the cut (the v157 bytes live on the bridge and in the project box; the bridge was offline) — the NEXT actor with the bridge runs it: `cat S164/cwf-open-items-register-v157.md S165/cwf-open-items-register-v158-S165-SECTIONS.md > S165/cwf-open-items-register-v158.md` and prints both md5s. ANCHOR at cut: master fb28343ea332e98aa588bf73acc0762c84e1d9dc (PR 648), read by `git ls-remote https://github.com/maymun207/cwf_yaprak` from the Architect container at 17:20Z; Vercel production at it UNMEASURED at the cut. Open PRs: 649 only (head 72b912f74495484a3da5c4a6f54d2eeebd544bac, mergeable_state blocked). Every line not re-measured in S165 stays CARRIED UNVERIFIED.

## S165 · CLOSED / SUPERSEDED (by evidence)
144 CLOSED @ PR 646 merge 763a54bc551572137276afa6cc55446e80c934cc (2026-09-30T06:57:06Z; POST-LANDING-1).
152 CLOSED @ PR 647 merge 64f5d5c77e70b1da03b0ea333c760e9ceb2f13d8 (07:34:09Z; M1B isError readers).
153 CLOSED @ PR 648 merge fb28343ea332e98aa588bf73acc0762c84e1d9dc (14:40:08Z; M4a) + migration 20260930050000_health_memory_daily applied by the Operator and verified (anon false / authenticated false / service_role true; function ran, 0 rows; FN-EXEC anon → 42501; 94 gates passed; version recorded — owner-relayed Operator output). The Memory-tab series witness in production is UNMEASURED. PR 648 did NOT auto-merge although armed and clean from 14:28Z; the owner disabled auto-merge and merged by hand (row 169).
NOTICE-M3-CI-RED-ENTITYLAYERS-RACE-S165-1 (AG-3) SUPERSEDED-BY NOTICE-M3-RACE-FIX-REASSIGN-S165-1 (AG-1, bus 16:17:03Z) — its proof demanded 20× a parallel full suite before and after (A-REC-S165-1, row 173). NOTICE-M3-RACE-FIX-SUPERSEDED-S165-1 tells AG-3 (plain push is the lock).
CARD-VECTORLANE-FAKE-TIMERS-S165-1 v1 SUPERSEDED-BY v2 (scout-1 review delta).

## S165 · CORRECTIONS TO CARRIED ROWS
154 (M3) → PR 649 open, head 72b912f74495484a3da5c4a6f54d2eeebd544bac; Build and Test failed at step 11 "Run tests" (1 of 775 files: src/components/admin/__tests__/entityLayersSection.test.tsx:132, reload-count asserted synchronously after `entitylayers-written`; hypothesis RACE, UNMEASURED); later steps SKIPPED (silent, not passing). scout-2 reviewed the diff GREEN, posted no status. Fix at AG-1 (unconsumed at cut — Mac offline). Migration 20260930060000_learning_snapshots_human_evidence is OPERATOR-PENDING: prompt in Claude_Duzenli_Arsiv/S165/SCOUT-STATUS-PREREVIEW-M3-S165-1 §8; dry run must show exactly one pending. → row 163.
155 (SD1) → carried onto master as phase/sd1-numeric-grouping-exempt-s165-1 = ab6e77f725f572975c6ad58c9b65532111d4faad (parent fb28343e; AG-1 slip: 9 files 188 pass, gates green locally; CI UNMEASURED, no PR). → row 166.
156 (SD2) → carried onto master as phase/sd2-brake-notice-grouped-count-s165-1 = 2bea820041c6ccd02d722c5cc47cd7499ef7d1b0 (parent fb28343e; AG-4 slip: every burstBrakeMessage importer 76/76, gates green locally; CI UNMEASURED, no PR). → row 164.
157 (K41 flip) → the owner flipped in the Rules UI (System agent params) router.matrixReplace 0 / router.keywordArmAllPaths 1 and re-asked; measured turn 4399a286 (15:10Z): knobs source 'param', basis 'union', matchedCategories andon+production+material, offeredCount 58, keywordArmAdded [] ; before (turn a39df592, 09-29): basis 'frame', material only, 34 offered. getCookedStockAndon called in both; same answer; grounding ok. The row's witness criterion (keywordArmAdded contains andon) was NOT met — andon arrived via union categories. The owner reverted to 1/0 at 15:21–15:22Z (v3). Stays OPEN → row 167. 131 stays OPEN with it.
107 → doc repo local commits bfea1ea, 5e0e80c, 244ab90 (S165) ahead of origin/main; two notices (NOTICE-M3-RACE-FIX-REASSIGN/-SUPERSEDED) written to the project box but NOT to the doc repo (bridge offline 16:18Z) — write + commit when the bridge returns; push = lane job.
159 (scout liveness) gains: scouts judged alive only by their scout_reply rows (they do not stamp consumed_at on READ); pooler log cannot attribute a connection to a window — every lane shares the cwf_lane role (F-S165-POOLER-LENS-SHARED-ROLE-1 → row 171).
160 (M4b ⚡ MEMORY-1 bar), 161 (register 60), 158, 146, 147, 149, 133, 119, 135, E1-d: not started in S165 (turn budget: landings + two outages); carried.

## S165 · NEW ROWS
| id | item | class | fix | when | witness |
|---|---|---|---|---|---|
| 163 | M3 landing: race fix (test-only `await waitFor`) on PR 649 → fresh CI → ORDER-SCOUT-LAND-M3-S165-2 to scout-2 (10×60 s named wait; owner ⚡ if clean-but-stalled) → Operator ⚡ for 20260930060000 the SAME turn (148) | code on PR + operator step | NOTICE-M3-RACE-FIX-REASSIGN-S165-1 at AG-1 | S166 first landing | merge sha + schema_migrations row |
| 164 | SD2 landing (2bea8200 carried) | code on branch | slot notice to AG-4: re-pick onto the new master, open PR → scout lands | after 163 | merge sha |
| 165 | vectorLane admission.test fake-timers flake fix (phase/vectorlane-fake-timers-s165-2 = 68224cda2649237989afc37f3dfaba109eebb180; scout-1 PREREVIEW GREEN on the s165-1 head 4af0f6995682fb9864d880dcd246ba962d617206) | code on branch | slot → PR → scout | after 164 | merge sha + admission.test green in CI |
| 166 | SD1 landing (ab6e77f7 carried) | code on branch | slot → PR → scout | after 165 | stamp absent on "1 250 000" and "5 Neden Analizi" in production |
| 167 | K41 default decision by MEASUREMENT: run the E1-a exam set (router, 0/1 vs 1/0) and read Recall@k + offeredCount; the owner decides the default on that table, not on one question | measurement → owner ruling | scout MEASURE order (branch dispatch, no master push) | S166 | the table + owner's word |
| 168 | MODEL-TEXT GOVERNED HOME: every model-visible literal text (prompt fragments, canned advice, placeholder strings) moves to governed data with admin UI (13.3); inventory MEASURED by AG-4 (Claude_Duzenli_Arsiv/S165/MODEL-TEXT-INVENTORY-MEASURE-S165-1-AG4-full.md); includes api/cwf/_lib/toolResult.ts:307-320 neutralizeDeadSupersetUrls — a backend-named literal ('[Superset baglantisi yapilandirilmadi]', SUPERSET_PUBLIC_BASE_URL) = §13.1 violation (F-S165-SUPERSET-LITERAL-TOOLRESULT-1) | design card, NEW subject | card → scout → lane | S166 after the landing chain | CI grep: no backend name in model-text code paths |
| 169 | AUTO-MERGE ARMED + CLEAN, NOT MERGED (PR 648, 14:28Z → owner hand-merge 14:40Z): cause UNMEASURED (scout-2); only lead 6h49m from arming to the last required context vs 29m on 647 (F-S165-AUTOMERGE-ARMED-CLEAN-NOT-MERGED-1) | factory defect | scout MEASURE (auto-merge event timeline, ruleset evaluation); practice now: every land order carries a 10×60 s named wait after clean, then owner ⚡ | S166 | next landing merges within 10 min of clean |
| 170 | NETWORK LOSS KILLS THE LOOP: the Mac lost network twice (07:42Z–13:53Z; from ~16:18Z, still out at cut); mail-wait exits on READ-FAILED PROXY-REFUSED instead of retrying, so every window leaves the loop and needs a re-boot (F-S165-MAC-OFFLINE-LANES-DEAD-1) | factory design gap (PLATINUM) | card: mail-wait retries transport/DNS/proxy errors with bounded backoff inside its budget and prints the retry count; exits only on budget end (12.6: grep the consumer first) | S166, NEW subject → scout | a window survives a 10-min network drop without a boot |
| 171 | POOLER LENS PER WINDOW: all windows connect as cwf_lane; supavisor_logs cannot say WHICH window is doing DB work (F-S165-POOLER-LENS-SHARED-ROLE-1) | instrument | small card: application_name=<lane address> in the lane transport's connection string; the lens groups by it | S166 backlog | pooler query grouped by lane |
| 172 | entityLayersSection reload race (F-S165-ENTITYLAYERS-RELOAD-RACE-1) | test defect | lands inside 163 | with 163 | 20/20 alone + full suite green in CI |
| 173 | CARD PROOF BUDGET (A-REC-S165-1): a card's proof must fit the 30-minute rule — full-suite repetitions ≤ 1 unless the flake IS the subject; the Architect estimates suite time before ordering repeats | practice H | in force | now | no card proof > 30 min of suite time |
| 174 | supabase config `[inbucket]` deprecation warning (F-S165-INBUCKET-CONFIG-DEPRECATION-1) | hygiene | small card (rename per CLI message) | backlog | CLI prints no deprecation |

## §3 · FINDINGS CARRIED BY NAME (S165; CWF-S165-FINDINGS-v1)
A-REC-S165-1 (→ 173) · A-REC-S165-2 (lanes idle while the Architect waited; the owner caught it — "bence duruyorlar") · A-REC-S165-3 (one tick attributed AG-3's silence to the card alone before measuring the Mac outage) · F-S165-AUTOMERGE-ARMED-CLEAN-NOT-MERGED-1 (→ 169) · F-S165-MAC-OFFLINE-LANES-DEAD-1 (→ 170) · F-S165-POOLER-LENS-SHARED-ROLE-1 (→ 171) · F-S165-SCOUT-LIVENESS-LENS-1 (→ 159) · F-S165-SUPERSET-LITERAL-TOOLRESULT-1 (→ 168) · F-S165-ENTITYLAYERS-RELOAD-RACE-1 (→ 172) · F-S165-K41-UNION-KEYWORDARM-EMPTY-1 (→ 167) · F-S165-INBUCKET-CONFIG-DEPRECATION-1 (→ 174) · F-S161-HEREDOC-BASE64-CORRUPTION-1 RECURRED twice (→ 130: text by quoted heredoc + md5, never base64) · OWNER-APPROVAL-S165-PLAN-1 · OWNER-WITNESS-S165-K41-FLIP-1 · OWNER-ACT-S165-PR648-HAND-MERGE-1.
All S145–S164 findings: as carried by name above (v157 sections, byte-for-byte).

## §5 · CARRIERS (S165)
CLAUDE-PROJECT-INSTRUCTIONS v5_11 (in force) · CWF-S165-SESSION-CLOSE-v1 · CWF-S165-FINDINGS-v1 · CWF-SESSION-GRAPH-KB-v165 · register v158 (= v157 + this file) · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v170 · every S165 notice/order/card in docs/ and Claude_Duzenli_Arsiv/S165/ · SCOUT-STATUS-PREREVIEW-M3-S165-1 (§8 Operator prompt) · SCOUT-STATUS-PREREVIEW-VECTORLANE-S165-1 · MODEL-TEXT-INVENTORY-MEASURE-S165-1-AG4-full · A26 v1_2 · A25 v1 · A24 v1_3 · REGISTER-BUG-BUCKET v57 (STALE) · cwf-sota-definition v1_5.

## §6 · SIDE PANEL ↔ REGISTER (S165)
| Panel # | Panel task | Register id(s) | State at cut |
|---|---|---|---|
| 1 | PR 646 | 144 | CLOSED |
| 2 | M1B | 152 | CLOSED @ PR 647 |
| 3 | M4a + migration | 153 | CLOSED @ PR 648 + migration verified |
| 4 | M3 | 154, 163, 172 | PR 649 red on a race; fix at AG-1 |
| 5 | SD2 / vectorLane / SD1 | 164, 165, 166 | carried onto master, waiting for slots |
| 6 | K41 flip | 157, 167 | flipped, measured, reverted; exam-set decision pending |
| 7 | model-text inventory | 168 | measured; card not cut |
| 8 | M4b / register 60 | 160, 161 | not started |
| 9 | outages | 170 | Mac offline at cut |
| 10 | S165 close | — | this set (unattended cut) |

## §7 · CHAIN CARRY CHECK (S165 cut)
v158 = v157 bytes + this file, by script (pending, see header). Every row id of v157 is present by construction. Exits recorded above: 144, 152, 153 (CLOSED); NOTICE-M3-CI-RED (SUPERSEDED-BY REASSIGN); CARD-VECTORLANE v1 (SUPERSEDED-BY v2). No id left without an exit line.
END · cwf-open-items-register-v158
