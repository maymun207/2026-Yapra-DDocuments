[scout-1]
ADVERSARY-VERDICT: GREEN pr=655 head=aedb22f40cd97e8e6ba488c76496963af431cc45 · LANDED merge=1f694e1ff47d84d6e7b321e332446519f443b1f0 by=maymun207
GRAFT: graft --version (0.18.0) · graft skeleton scripts/mail-wait.mjs · graft ask "SD2 per-tool brake groupCounts in groundingCheck numeric measurement" --source · graft grep "BACKEND_IDS = " · graft grep "[merge-guard] VERDICT" (tokenised, no hit → git grep -F) · graft grep "adversary/scout" · graft grep "scout_reply". graft indexes the local clone (d768bc29, behind master), so every PR byte quoted below was read with git at the named sha. No graft/ node card or wiring.json read.

SCOUT-STATUS-LAND-SD1-S167-1 · reply to ORDER-SCOUT-LAND-SD1-S167-1 (id 275d43e4-7590-4f7d-99b8-7f4b23aad4db, md5 d9e06d27f776a1b7f6ddab2ea2b05857, DIGEST-OK)

## HEAD MOVED (ON-DISAGREEMENT)
The card named f6d26f00e1d0776e8f0daf485ab54826c9f64627. By the third CI tick the PR head was aedb22f40cd97e8e6ba488c76496963af431cc45, one commit from AG-4 under NOTICE-SD1-NEDEN-RULING-S167-1. The push cancelled Build and Test at f6d26f00 (`cancelled`, which is neither a pass nor a failure). I reviewed and posted on aedb22f4, the head I read.
- Delta f6d26f00..aedb22f4 touches 3 paths, all inside the fence: numericLexiconSeeds.ts drops the bare 'Neden' (tr) and 'Why' (en) rows and keeps 'Neden Analizi' and 'Whys'. numericLexicon.test.ts adds 5 ruling pins and changes the counts 4→2 phrases and 10→8 rows. The report gains a RULING S167 section. The change is sound.

## 1 · Head, files, fence
- head aedb22f40cd97e8e6ba488c76496963af431cc45. merge-base = master 5e6e691fe9ea98b17e2a0f2e78f14802c750ae64. Commits: 180d41c8 (AG-1 SD1, carried), f6d26f00 (AG-4 report), aedb22f4 (AG-4 ruling).
- 22 changed paths. FILE-FENCE is in the report (not in the first commit's message). CI: `[merge-guard] FILE-FENCE (…report.md line 250)` lists the 22, then `[merge-guard] FENCE-GREW ok — head fence is held by the first fence, at 180d41c81610c3cc2bfd8968ff931b753387949e`. FENCE-GREW: none.

## 2 · Review
- (a) GREEN. SD2's PR-652 hunks are intact at head: groundingCheck.ts:411-414 `// CARD-SD2 v2 D3: a grouped result's recordCount is now the SUM …` / `for (const n of Object.values(t.groupCounts ?? {})) knownCounts.add(n);`; :462-477 `const gc = o.groupCounts;` … `...(groupCounts ? { groupCounts } : {}),`; types.ts:68-73 `groupCounts?: Record<string, number>;`. SD1 is present: groundingCheck.ts:638-640 `numeric: measureNumericClaims(input.answerText, input.query, input.numericLedger, input.numericLexicon, input.language),`; types.ts:159 `lexicon: NumericLexiconSource;` and :221 `numericLexicon?: NumericLexicon;`. The PR diff does not touch toolResult.ts, burstBrakeMessage.ts, partialRead.ts, stageTools.ts or inlineAggregates.ts (empty diff vs master).
- (b) GREEN. public/architecture/manifest.json has an empty diff vs master. Keys named `"lastSyncedCommit":` / `"mappedContentSha":`: 0. Lens control: the same pattern with `_comment` added counts 1. The 4 text hits are master's own `_comment` prose recording their retirement.
- (c) GREEN, additive only. dbConstants.ts +NUMERIC_MULTIPLIER/+NUMERIC_EXEMPT_PHRASE after FEEDBACK_REASON. kinds.ts +2 FieldSpecs, +2 KIND_REGISTRY rows after FEEDBACK_REASON. selfSeedReconciler.ts +import, +`system.numeric_lexicon` domain after `system.feedback_reason`. Zero `-` lines across the three.
- (d) GREEN. Every old pin (MASTER_*, K32_*, M3_*; registry and id order) is still asserted as a layer. SD1_REGISTRY_SHA256 ae263145… and SD1_KIND_ID_ORDER_SHA256 4732a18a… are byte-equal to AG-1's original branch phase/sd1-numeric-grouping-exempt-s164-1 (carried, not re-minted). The one new pin pair is M3_SD1_REGISTRY_SHA256 56fed68d… / M3_SD1_KIND_ID_ORDER_SHA256 64214fc1…, measured by CI: `✓ api/cwf/__tests__/kinds.test.ts (27 tests)`.
- (e) GREEN. The report carries DIAGRAM-ATTEST for 6 tabs. CI shows the attest step RAN:
  `[check:doc-drift] ATTEST RUN -- base 5e6e691fe9ea98b17e2a0f2e78f14802c750ae64, merge-base 5e6e691fe9ea98b17e2a0f2e78f14802c750ae64, 22 changed path(s)`
  `[check:doc-drift] attest …report.md:228 tab='Architecture Map' -> COUNTED (matched)` (likewise :229 Runtime Topology, :230 Request Lifecycle, :231 Governance Model, :232 Agent Control Plane, :233 Stage Cards)
  `[check:doc-drift] tab 'LLM Control Surface': not touched`
  `[check:doc-drift] [OK] every touched tab is attested or its diagram is in the diff (mode=pr).`
- (f) GREEN. Lens 1: `git diff -G` (case-insensitive) over master..head for superset|machine-knowledge-base|honestbench|mount-probe|supabase|postgres|vercel|gemini|openai|anthropic|claude|flat-backend finds 0 files. The same lens with NUMERIC_MULTIPLIER added finds 9, so the lens can see. Lens 2 (CI): `[check:backend-names] [OK] every (id, class) count equals data/gates/backend-names-baseline.json.` Only the zero-exempt `system` lane moved (code 918, tests 845).

- (g) GREEN (NOTICE-SCOUT1-HOLD-655-S167-1, id 56807958-1cd0-4afb-8b5d-8345f8fe44d5). At aedb22f4 numericLexiconSeeds.ts EXEMPT_PHRASES holds only `'Neden Analizi'` (tr) and `'Whys'` (en); the `'Neden'` and `'Why'` rows are removed lines in the delta. numericLexicon.test.ts carries all five pins: "3 neden bulundu." → unsourced 1; "Başlıca 2 neden: …" → unsourced 1; "We found 3 why answers." (en) → unsourced 1; "5 Neden Analizi uygulandı." → 0; "We ran the 5 Whys." (en) → 0. CI: `✓ api/cwf/__tests__/numericLexicon.test.ts (36 tests)`, meaning 31 + 5 with none failing.
- HOLD compliance: no adversary/scout status was ever posted on f6d26f00e1d0776e8f0daf485ab54826c9f64627. Its statuses read only Vercel (pending, then "Canceled by Ignored Build Step"). The only success is on aedb22f4, so SCOUT-STATUS-HOLD-655-S167-1 is not owed. One disclosure: the hold notice (minted 20:43:12Z) was not read before the post. My only box read before 21:04 was at 20:39:59Z. The post matched the notice's terms (new head, check (g) passes) because the head had moved, not because I had read the notice.

## 3 · CI at aedb22f40cd97e8e6ba488c76496963af431cc45 (full sha; head re-read twice, unchanged)
- Build and Test: build (24.x) success (job 110090717114, green on tick 6 at this head). Full suite `Test Files 780 passed (780)` · `Tests 11832 passed | 4 expected fail | 1 skipped (11837)`; `✓ numericLexicon.test.ts (36 tests)`.
- `[merge-guard] VERDICT GREEN` (changes job 110090629483), with `CLEAN-MERGE: no in-branch merge`, `timeline ok — 5 events, no reopen, no force-push`, `COLLISION: 0 other open PR(s) against master`.
- rule26 success · relay corpus (grammar v1) success · report-schema success · changes success · arm auto-merge success.
- eval-canary: SKIPPED (named, not counted as green).

## 4 · Landing
- adversary/scout success posted on aedb22f4 at 2026-09-30T21:04:27Z (status id 55308622878).
- First landing read: PR 655 closed, merged=true. merge sha 1f694e1ff47d84d6e7b321e332446519f443b1f0 · merged_by.login maymun207 · auto_merge.enabled_by.login maymun207. `git ls-remote origin refs/heads/master` → 1f694e1ff47d84d6e7b321e332446519f443b1f0.

## Notes for AG-4 (cosmetic, not blocking)
- The report's DIFF line reads "the 23 paths of the FILE-FENCE block above"; the block and the PR carry 22.
- The heading "FILE-FENCE (one commit)" sits on a PR of three commits.

## Residual
- Stale seed rows. Seeding is absence-only, so if an earlier head had booted the reconciler, bare 'Neden'/'Why' rows would persist after this ruling. MEASURED: Vercel reported "Canceled by Ignored Build Step" at both f6d26f00 and aedb22f4, so this branch was never deployed and never booted the reconciler. The rows themselves are UNMEASURED: guard GM-1 refuses execute_sql from this window. After the production boot at 1f694e1f, the Operator may confirm `system.numeric_exempt_phrase` holds exactly the 2 rows.
- The live effect in 'stamp' mode on production turns is NOT-READ (as the report says).

## Window notes
- An older scout-1 mail-wait from before this window's /clear (started 20:32Z) also exited on this same card. It is finished; one window acted.
- The landing wait's 60 s sleep was refused by the harness. It was not needed: the first read showed the PR landed.
- scout_reply: the lookup for its call path was refused by the harness. This file is the reply's bytes; the bus send is pending the owner.

read relay_inbox at 2026-09-30T21:07:25Z, box NOT empty. It holds 3 rows: ORDER-SCOUT-LAND-SD1-S167-1 (acted; reply blocked), NOTICE-SCOUT1-HOLD-655-S167-1 (acted, see (g)) and ORDER-SCOUT-PREREVIEW-SCOUT-ACK-S167-1. The last is not started because it orders "take this AFTER ORDER-SCOUT-LAND-SD1-S167-1 is replied".
