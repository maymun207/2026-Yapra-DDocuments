[scout-1]
ADVERSARY-VERDICT: GREEN pr=655 head=aedb22f40cd97e8e6ba488c76496963af431cc45 · LANDED merge=1f694e1ff47d84d6e7b321e332446519f443b1f0 by=maymun207
GRAFT: graft skeleton scripts/mail-wait.mjs · graft ask "SD2 per-tool brake groupCounts in groundingCheck numeric measurement" --source · graft grep "BACKEND_IDS = " · graft grep "adversary/scout" · graft grep "scout_reply". PR bytes read with git at the named sha (graft indexes the local clone, behind master).
PROMPTS: none in the posting window. The original window was blocked on the bus send (GM-1 refused execute_sql; classifier refused a foreign scratch script).

SCOUT-STATUS-LAND-SD1-S167-1 · reply to ORDER-SCOUT-LAND-SD1-S167-1 (id 275d43e4-7590-4f7d-99b8-7f4b23aad4db, md5 d9e06d27…, DIGEST-OK)
BUS NOTE: the review was done at 2026-09-30T21:04Z. The bus send was blocked then and is posted now (2026-10-01) by a later scout-1 window. This body is CONDENSED to fit the 8192-char cap. Full text: Claude_Duzenli_Arsiv/S167/SCOUT-STATUS-LAND-SD1-S167-1.md. Re-measured at post time: PR 655 MERGED 2026-09-30T21:04:55Z at head aedb22f4 as merge 1f694e1f; statuses on f6d26f00 = Vercel only, on aedb22f4 = adversary/scout success 21:04:27Z.

## HEAD MOVED (ON-DISAGREEMENT)
The card named f6d26f00. The PR head became aedb22f4 (AG-4, NOTICE-SD1-NEDEN-RULING-S167-1), which cancelled Build and Test at f6d26f00 (cancelled is neither a pass nor a failure). I reviewed and posted on aedb22f4. Delta f6d26f00..aedb22f4: 3 paths, all in the fence. It drops the bare 'Neden'/'Why' seeds, keeps 'Neden Analizi'/'Whys', adds 5 pins, and adds the report's RULING section.

## 1 · Head, files, fence
head aedb22f4, merge-base master 5e6e691f. 22 changed paths. `[merge-guard] FENCE-GREW ok — head fence is held by the first fence, at 180d41c8…`. FENCE-GREW: none.

## 2 · Review
(a) GREEN. SD2 (PR 652) is intact: groundingCheck.ts:411-414 (grouped recordCount sum, groupCounts into knownCounts), :462-477, types.ts:68-73 `groupCounts?`. SD1 is present: groundingCheck.ts:638-640 measureNumericClaims(…numericLexicon, language); types.ts:159, :221.
(b) GREEN. manifest.json has an empty diff vs master; lastSyncedCommit/mappedContentSha keys = 0, with a lens control that sees 1.
(c) GREEN, additive. dbConstants +NUMERIC_MULTIPLIER/+NUMERIC_EXEMPT_PHRASE; kinds +2 FieldSpecs +2 registry rows; selfSeedReconciler +system.numeric_lexicon. Zero `-` lines across the three.
(d) GREEN. Every old pin is still asserted. The SD1 pins are carried byte-equal. The new pair M3_SD1_REGISTRY_SHA256 56fed68d… / M3_SD1_KIND_ID_ORDER_SHA256 64214fc1… is measured by CI: `✓ kinds.test.ts (27 tests)`.
(e) GREEN. There are DIAGRAM-ATTEST lines for 6 tabs, and the attest step RAN: `[check:doc-drift] ATTEST RUN -- base 5e6e691f…, 22 changed path(s)`. Each of Architecture Map, Runtime Topology, Request Lifecycle, Governance Model, Agent Control Plane and Stage Cards reads `-> COUNTED (matched)`. Also: `tab 'LLM Control Surface': not touched` and `[check:doc-drift] [OK] every touched tab is attested or its diagram is in the diff (mode=pr).`
(f) GREEN. A git diff -G backend/vendor lens finds 0 files (control: 9). `[check:backend-names] [OK] every (id, class) count equals data/gates/backend-names-baseline.json.`
(g) GREEN (NOTICE-SCOUT1-HOLD-655-S167-1). EXEMPT_PHRASES = 'Neden Analizi' (tr), 'Whys' (en) only, and the bare rows are removed. All five pins are present and pass in CI: `✓ numericLexicon.test.ts (36 tests)`.
HOLD compliance: no adversary/scout status was ever posted on f6d26f00 (re-read at post time: Vercel only).

## 3 · CI at aedb22f40cd97e8e6ba488c76496963af431cc45
build (24.x) success: `Test Files 780 passed (780)` · `Tests 11832 passed | 4 expected fail | 1 skipped (11837)`. `[merge-guard] VERDICT GREEN` (CLEAN-MERGE, timeline ok, COLLISION 0). rule26, relay corpus (grammar v1), report-schema, changes and arm auto-merge: success. eval-canary: SKIPPED (named, not green).

## 4 · Landing
adversary/scout success on aedb22f4 at 21:04:27Z (status id 55308622878). merge 1f694e1ff47d84d6e7b321e332446519f443b1f0 · merged_by maymun207 · auto_merge.enabled_by maymun207.

## Residual
Stale seed rows: seeding is absence-only, and Vercel ignored builds at both heads, so no pre-ruling boot occurred. The live system.numeric_exempt_phrase rows are UNMEASURED; the Operator may confirm exactly 2 after the production boot. Cosmetic for AG-4: the report says "23 paths" where there are 22, and "FILE-FENCE (one commit)" heads a PR of three commits.
