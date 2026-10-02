[scout-1]
ADVERSARY-VERDICT: GREEN (code, against the card's contract) pr=673 head=aa2877bee7764ca3ced97a4dbee914e1c4dfb57c · WAITING-CI: Build and Test not complete at the one read (build (24.x) success 15:56:08Z; rule26 in_progress) · no adversary/scout status posted
GRAFT: none run (graft indexes the stale local clone). The diff was read with `git diff 648c61d6…aa2877be` / `git show aa2877be:<path>`. Measured by running the head's own code from a `git archive` export of aa2877be in my scratchpad (node_modules symlinked; the shared clone untouched).
PROMPTS: none.

SCOUT-STATUS-REVIEW-LAND-673-S170-1 · reply to ORDER-SCOUT1-REVIEW-LAND-673-S170-1 (id 7e5a2252-9e14-4edc-8b3c-67d1c030fa49)
PRECONDITION: head aa2877bee7764ca3ced97a4dbee914e1c4dfb57c and master 648c61d6384942ab532444be252422ed9e37c02b both unchanged. 4 commits, 15 files.

## Code review vs CARD-A26-PII-DETECTOR-S170-1-v2 and my A1–A8
- A1 GREEN: detectPii(text, nameLexicon) / scrubPii are pure (no import beyond types). noPii = spans.length===0 && classesUnknown.length===0 (piiDetector.ts detectPii). person_name goes to classesUnknown unless source==='data' with ≥1 name. resolvePiiNameLexicon (knowledge/piiNameLexicon.ts) returns 'data' | 'absent' | 'unread' and never throws.
- A2 GREEN: system.pii_name_lexicon is SOFT; spec {lang enum, list enum first_name|surname|ambiguous_word, names string_array, note?}; one row PER LIST (keys tr.first-name, tr.surname, tr.ambiguous-word); domain 'system.pii_name_lexicon' absence-only in SEED_DOMAINS beside system.numeric_lexicon; SYSTEM_LANE_KIND_IDS.PII_NAME_LEXICON. tr-TR folding via toLocaleLowerCase('tr-TR'). No migration.
- A3/A4/A5 GREEN: ambiguous names count only with a title (usta/bey/hanım … / sayın …). The chance rate is printed (tckn 1.3%, card 8.6%) and zero-FP is claimed only for checksum-failing negatives. The grouped card shape is fenced against neighbouring digit groups (`(?<!…|\d[ -])…(?!…|[ -]\d)`). An unbroken 0-run counts as a phone only with a phone context and no order/lot context in the 40-char window.
- A6: ip_address is its own class and counts against noPii (stated in the header).
- A8: the report names memoryDistill.ts:658-660 and :674. NO production caller exists: `git grep detectPii|scrubPii|resolvePiiNameLexicon` outside tests hits only the module itself and pii/piiMeasure.ts.
- §13.1: no backend or tenant literal. tenant-zero and backend-names are green in CI. The baseline rewrite is `system` only (code 918→937, tests 845→864). facts.json moduleCount 475→480 with a MEASURED stamp at 648c61d6. kinds.test: one new kind with the earlier pins byte-equal (per the commit; CI build green).
- §13.3: the kind is SOFT on the existing Rules surface; src/components/admin/__tests__/governancePiiNameLexicon.test.tsx covers it.
- NUMBERS ARE THE CODE'S OWN: my independent run of scripts/measurePii.ts at aa2877be printed byte-identical lines to report :140-152 (84 items, 47 gold spans, every class 1.000/1.000, plant-noun subset tp 9 fp 0 fn 0, 17 checksum-failing negatives 0 FP, chance rates 1.3% / 8.6%).
- DIAGRAM-ATTEST (report :72-74): each reason is specific and TRUE. No caller exists, so no stage or edge moves (Architecture Map, Request Lifecycle), and one more SOFT kind passes the existing publish gate plus the absence-only reconciler (Governance Model). Not boilerplate.

## Findings (non-blocking for THIS card: the card sets no name bar and the detector has no caller. They MUST be fixed before A26-P1b wires scrubPii into stored text)
F1. NAME FALSE POSITIVES, measured with the seed lexicon at the head (my probe, 8 sentences, 8 FPs):
```
"Can you show the OEE for line 2?" -> person_name:Can@0.8
"Kara hat 14:00 itibarıyla durdu." -> person_name:Kara@0.6
"Bulut sunucusu yanıt vermiyor." -> person_name:Bulut@0.6
"Güneş paneli bakımı yapıldı." -> person_name:Güneş@0.6
"Koç başı arızalı, değiştirildi." -> person_name:Koç@0.6
"Gül kurusu renk sapması var." -> person_name:Gül@0.8
"Sultan tipi karo partisi sevk edildi." -> person_name:Sultan@0.8
"Onur listesi panoya asıldı." -> person_name:Onur@0.8
```
Causes: (a) a first name ALONE is flagged at 0.8 whenever capitalised, and every sentence-initial word is capitalised; (b) a plain surname alone at 0.6; (c) the lexicon's `lang` is ignored at match time, so the tr list fires on English text ("Can"); (d) several "surname" and "first_name" entries are common nouns (Kara, Bulut, Güneş, Koç; Gül, Sultan, Onur, Barış, Can, Derya), i.e. they belong in ambiguous_word. Scrubbing stored episodes with this would replace real words with [PII:person_name].
F2. The 1.000 name numbers are in-sample, which the report states honestly (:50). The corpus carries none of the F1 shapes.
Repair for the P1b card (paste-ready): "Before scrubPii is wired, a lone first name or surname counts only with a name context (a following family name, a title, or a non-sentence-initial position); `lang` is honoured; common-noun names move to ambiguous_word; the F1 eight sentences join the corpus as negatives and print their FP count."

## CI at aa2877bee7764ca3ced97a4dbee914e1c4dfb57c (read once, not watched)
build (24.x) success 15:56:08Z · changes success · relay corpus success · report-schema success · arm auto-merge success · Vercel success · rule26 IN_PROGRESS (the Build and Test workflow is not complete) · eval-canary SKIPPED.
## Next
WAITING-CI. Re-send the landing half when Build and Test completes: code GREEN → stop rule → success.
