[scout-1]
ADVERSARY-VERDICT: GREEN (code, carry delta) pr=687 head=09b55f3774c0299d7ffb115164feea63074ebe58 · CI not read and no adversary/scout posted (per the order)
GRAFT: none run (graft indexes the stale local clone). Carry lens: `git range-diff 7c5a715b..e36431c2 0f2f2a44..09b55f37 -- api src`; sites via `git grep 09b55f37`; F1 re-measured by running the head's own detector from a `git archive` export in my scratchpad (node_modules symlinked; the shared clone untouched).
PROMPTS: none.

SCOUT-STATUS-REVIEW-687-S170-1 · reply to ORDER-SCOUT1-REVIEW-687-S170-1 (id b98b6df5-a6f6-4cb5-91f2-dda5f5d72c1e)
Head 09b55f3774c0299d7ffb115164feea63074ebe58 (1 commit), base 0f2f2a447d67cca641f9f86180997ce7323e4e26. Reference: #683 head e36431c24896b6cb0a9e240c41ce39654bc99123 (scout-2 GREEN), whose merge-base with master is 7c5a715bb154af13751f027c309954b28288ebca. Note: GitHub reports mergeStateStatus DIRTY against today's master 1738e65f32f5d7519ebc5ec2b7baf81a21360602, consistent with the baseline file AG-2's next commit refreshes.

## 1 · The carry delta: the code patch is byte-identical to #683's
A plain two-dot diff e36431c2..09b55f37 mixes in master's own landings (680, 682, 684), so it is not the carry. The right lens compares each PR's patch against its own base:
`git range-diff 7c5a715b..e36431c2 0f2f2a44..09b55f37 -- api src` shows ONLY (a) the commit message, (b) one CONTEXT line in src/components/admin/MemoryTab.tsx (`failures: number | null;` → `numericUnsourced: number | null;`, which is #684's field above an unchanged hunk) and (c) a hunk header for semanticMemory.ts. No added or removed line of #683's code differs. Nothing was dropped or altered beyond the three-way resolution.

## 2 · memoryDistill.ts resolved by content: both halves present
- #684 / M2B: tools carry `backendId` (:545-548, CARD-E2-K33 A4); `notSent` (:183-184, :210, :226) and `numericUnsourced` (:228, :368) are present.
- #683: `resolveLexiconBounded(… resolvePiiNameLexicon …, PII_LEXICON_TIMEOUT_MS, unreadPiiNameLexicon)` (:682-686) → `scrubEpisodeForStore(distillEpisode(...), ctx.message, lexicon, piiLang, …)` (:688-694) → `repo.insert(row)` (:696). Only the scrubbed row is inserted.
- EVERY INSERT PATH SCRUBS: the episode insert is :696 (the scrubbed `row`). The only production caller of writeSemanticMemory is memoryDistill.ts:710 (`git grep writeSemanticMemory(` outside tests), and it always passes `pii: { lexicon, lang: piiLang }` (:716), so the dossier upsert (semanticMemory.ts:454) goes through scrubDossierDeltas (:396, :410-419). No other episode or dossier writer exists.
- Non-blocking: `opts.pii` is OPTIONAL on writeSemanticMemory (semanticMemory.ts:396, an unscrubbed branch when absent). It has no production caller today, but a future caller could skip the scrub silently. Follow-up: make `pii` required, or log loudly when absent. Same as on #683; not new in the carry.

## 3 · My F1 fix still in, measured at the head
The head's detectPii with the seed lexicon, my eight F1 sentences, each with its language AND with none:
```
"Can you show the OEE for line 2?" lang=en -> none   | lang=none -> none
"Kara hat 14:00 itibarıyla durdu."  lang=tr -> none   | lang=none -> none
"Bulut sunucusu yanıt vermiyor."    lang=tr -> none   | lang=none -> none
"Güneş paneli bakımı yapıldı."      lang=tr -> none   | lang=none -> none
"Koç başı arızalı, değiştirildi."   lang=tr -> none   | lang=none -> none
"Gül kurusu renk sapması var."      lang=tr -> none   | lang=none -> none
"Sultan tipi karo partisi sevk edildi." lang=tr -> none | lang=none -> none
"Onur listesi panoya asıldı."       lang=tr -> none   | lang=none -> none
CONTROL "Vardiyayı Ahmet Yılmaz devretti." -> Ahmet Yılmaz
CONTROL "Demir Usta presi ayarladı." -> Demir
false-positive probe results: 0 of 16
```
The fix holds: 0 false positives across the 16 runs, and both positive controls still detect, so the detector did not go blind to get there. piiNameLexicon honours `lang` (rows without tr/en are skipped; a per-language `byLang` view).
