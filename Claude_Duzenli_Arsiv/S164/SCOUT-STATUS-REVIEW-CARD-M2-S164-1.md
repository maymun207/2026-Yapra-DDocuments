REVIEW-VERDICT: RED card=CARD-M2-HONEST-GRADING-S164-1-v1 md5=6dda476239a1270ec1b4ddc57e50f883

SCOUT-STATUS-REVIEW-CARD-M2-S164-1
FROM: scout-2 · reply_to ORDER-SCOUT-REVIEW-CARD-M2-S164-1 (id 0449bf12-35cc-4021-ba02-a9f3a6762c39, body_md5 84e4140f6e951a95ef091c5efb1cfa68 DIGEST-OK)
BASE: origin/master 6a3824c2b5efd1764be178d05ba647feec06927c (`git fetch origin master` → FETCH_HEAD 6a3824c2…). TOUR-HONESTY has NOT landed; toolEmpties has 0 hits at master. Per the order, the PR 640 seams were read at its head ddc28caa768e767ed31a0bf3f39e3602cf0af467 (`git fetch origin pull/640/head`). `git merge-base --is-ancestor 6a3824c2 ddc28caa` → ancestor. Every other line was read from `git archive 6a3824c2` or `git grep <sha>`.
CARD FILE md5 (printed first): 6dda476239a1270ec1b4ddc57e50f883

WHY RED. The direction is right, and the D1 truth table flips exactly one cell, the intended one. RED because four orders cannot be executed as written:
(a) D1 names a ledger field that does not exist (`toolEmpties`; the field is `empties`), and the precondition grep passes on a comment.
(b) D3c "classify once in runTurn" would compute a DIFFERENT class than distill does, because distill feeds `landing` into the classifier.
(c) D3c's `flushToolExperience(acc, { turnFailed })` passes an options object into the REPOSITORY parameter.
(d) D2's legacy arm silently drops pre-phase rows, which is the exact trap EpisodesRepository.ts:365-370 documents.
It also carries one design defect I caused. My own Δ11 (offerable = procedureEligible) over-restricts the PROMPT face: procedureEligible demands a frame and domain yield, which are procedure-TEACHING conditions. Frameless tool turns are the code-floor default, so under D2 they would never be recalled. That correction is mine, and it is stated below with the fix.

──────── 1 · W1–W3 re-measured ────────
W1 · memoryDistill.ts:150-188 (unchanged by PR 640).
- :166-172 `failed = surfacedEmpty || silentFinish || answerUnbacked || groundingOk === false || (calls > 0 && successes === 0) || absenceWithoutEnumeration !== null || fetchedNotDrawn`.
- :179 `toolFailures: ledger?.failures ?? 0`.
- :187 `return { class: calls > 0 ? 'unproven' : 'clean', signals };`.
HOLDS.
W2 · EpisodesRepository.ts:377-378 `OUTCOME_CLASS_PATH = 'decision->outcome->>class'`; `OFFERABLE_OUTCOME_FILTER = \`${…}.is.null,${…}.neq.failed\``. Query sites :550 and :575 `.or(OFFERABLE_OUTCOME_FILTER)`. procedureEligible memoryDistill.ts:293-323. HOLDS.
W3 · toolExperienceFlush.ts:82-87 `recordToolSuccess(acc, outcome, at) { if (outcome.failed) return; … }`. Call site stageTools.ts:1779-1781 `if (callWasSent) recordToolSuccess(ctx.toolExperience, { ...toolOutcome, viaGateway: false }, …)`. observeResult runs at :2148-2150 at master (:2157-2159 at PR head). The call site PRECEDES observeResult, so the D3a order premise HOLDS. Flush runTurn.ts:303 `flushToolExperience(ctx.toolExperience)` is a sibling of :301 `distillAndWriteEpisode(ctx, …)`. HOLDS.
W4 · PR 640 at ddc28caa, toolOutcomes.ts: the ledger field is **`empties: number`** ("A SUBSET of `successes`, never subtracted from it … Leaves the ledger as `toolEmpties`"). `emptyToolLedger()` now includes `empties: 0`. `export function recordToolEmpty(ledger) { ledger.empties = (ledger.empties ?? 0) + 1; }`.
stageTools.ts (PR head, right after observeResult): `if (observation?.isEmpty === true) { ctx.toolLedger ??= emptyToolLedger(); recordToolEmpty(ctx.toolLedger); }`.
`toolEmpties` is the WIRE name only: stageStream.ts:528/:544/:903/:1039 `toolEmpties: ctx.toolLedger?.empties ?? 0`. In toolOutcomes.ts the string `toolEmpties` appears ONLY in the comment at :50.
⇒ the PRECONDITION probe `git grep -c toolEmpties origin/master -- toolOutcomes.ts ≥ 1` passes on a COMMENT (a check that defends vocabulary, not purpose), and D1's `ledger?.toolEmpties` is a type error on ToolOutcomeLedger.
Subset proof (why D1's subtraction is sound per call): toolResultClass.ts:412-413 `if (klass !== 'answered') return { …, isEmpty: false, … }`. Only an answered call can be empty, and answered ⇒ isError false ⇒ toolError false ⇒ counted in successes. Both recordToolOutcome and recordToolEmpty run once per closure invocation, on the superseding (repaired) result.
NEW DEFECT FOUND (it affects D1 and today's disjunct 5): recordToolOutcome is NOT gated on callWasSent. stageTools.ts:1738-1744 records `{ failed: toolError }` for EVERY closure run, and toolError is false when resultClass is null (not-sent). So a cap-refused, misrouted, policy-denied or arg-refused call is a ledger SUCCESS.
The test "disjunct 5 alone" (memoryDistill.test.ts, BUG-032 block) calls a brake-refused call a "FUTURE second writer … unreachable today". It is reachable today, through the one writer.
Consequence: `dataBearing = successes − empties` counts refused calls as data. A (0 data, 0 empty, 2 failed, 1 refused) turn is `unproven` today and stays `unproven` under D1.

──────── 2 · D1 truth table (d,e,f = data-bearing / empty / failed calls; every other signal at its clean value; not-sent = 0) ────────
successes = d+e, calls = d+e+f. OLD failed ⇔ answerUnbacked (f>0∧s=0) ∨ (calls>0∧s=0). NEW adds (f>0 ∧ d=0).
(0,0,0) clean → clean
(0,0,1) failed → failed   (old disjuncts 3+5 and the new one all fire; boolean OR, no double count)
(0,1,0) unproven → unproven
(0,1,1) unproven → **FAILED**   ← the only flip
(1,0,0) unproven → unproven
(1,0,1) unproven → unproven
(1,1,0) unproven → unproven
(1,1,1) unproven → unproven   (the S161 shape 1/6/2; stays unproven, as the card says)
The new disjunct is a SUPERSET of answerUnbacked on any ledger with empties ⊆ successes. It is not independent of disjunct 3, so it must get its OWN named signal, or a reader cannot tell which disjunct failed the turn (the BUG-035 independence discipline at memoryDistill.ts:159-162).
Tests that pin today's shapes and MUST be updated (all in api/cwf/__tests__/memoryDistill.test.ts at PR head):
- "the ALL-FALSE case is NOT failed": `expect(out.signals).toEqual({ surfacedEmpty…, toolFailures: 0, absenceWithoutEnumeration: null, fetchedNotDrawn: false })`. It is a strict toEqual, so new signal keys red it.
- "empty≠zero: a no-frame turn …": `expect(row.decision).toEqual({ outcome: { class: 'clean', signals: {…} } })`. Strict, so a new `offerable` key and new signals red it.
- "a user-actor row passes both doors …": pins the exact `[MemoryWrite] … outcome=clean procedure=0 semantic=0 domainYield=0` line, if D2/D5 add a field to it.
- "disjuncts 3 and 5": its comment is false (see W4). Correct the comment; the assertion stands.
Also semanticMemory.test.ts §G4 "eligibility is ONE definition with TWO callers" pins procedureEligible's truth table. It is touched by the split in finding 3.

──────── 3 · D2 — grammar, legacy arm, and the predicate choice ────────
Grammar (installed @supabase/postgrest-js 2.108.2, node_modules/@supabase/postgrest-js/dist/index.mjs:3066-3068):
`or(filters, { foreignTable, referencedTable = foreignTable } = {}) { const key = referencedTable ? \`${referencedTable}.or\` : "or"; this.url.searchParams.append(key, \`(${filters})\`); return this; }`
It is a verbatim pass-through into `or=(…)`, so nested `and(…)`/`or(…)` is PostgREST SERVER grammar (RECALLED from PostgREST docs, not measured here).
LEGACY ARM AS WRITTEN IS WRONG. `(offerable is null AND class ≠ failed)` drops rows whose class is ABSENT (pre-SUCCESS-ONLY-RECALL rows). `class.neq.failed` on a missing path is NULL, and NULL does not admit the row. That is the trap EpisodesRepository.ts:365-370 spells out ("A bare `.neq(...)` would therefore drop every legacy row silently"). Today's filter keeps them via its `is.null` arm.
Correct literal:
`decision->outcome->>offerable.eq.true,and(decision->outcome->>offerable.is.null,or(decision->outcome->>class.is.null,decision->outcome->>class.neq.failed))`
(`->>` yields text, so `.eq.true` compares the text 'true'. A written `false` is excluded by both arms.)
Consumers of decision.outcome that could break on a new key: memoryDistill.ts:569-571 (reads `.outcome` for procedureEligible), :590 (log line `outcome=${…class}`), and EpisodesRepository.ts:377 (path). api/admin/memory-episodes.ts:8 filters by importance, not by outcome JSON. No jsonb schema test was found (no grep hit for an outcome schema). The replay lens does not read episodes. So an additive key is safe; the strict toEqual tests in 2 are the only breakers.
PREDICATE CHOICE — correcting my own Δ11. procedureEligible = signal conjuncts (:298-305) ∧ `toolLedger.calls > 0` (:312) ∧ domain yield (:316-320) ∧ `irFrame != null` with action+object (:321-322). The last three are conditions for TEACHING A PROCEDURE, not for being SAFE TO RECALL.
The frame is absent by default on every turn where the filter did not run: resolveTurnFrame.ts:194-200 "`frameOnAllPaths` is 0 in code, so this is the line every gateway-only / uncovered-flat-only turn takes today … return absent(NO_COVERED_FLAT)".
So D2 as written makes every tool-bearing gateway-only turn unrecallable, whatever its honesty. An honest "no stops yesterday" answer (A25 L529: that "no" is a correct answer) is also unrecallable, because it has no domain yield.
FIX without a second predicate: split the ONE predicate into its two halves, exported from memoryDistill.ts. `outcomeHonest(outcome)` = :298-305 (not failed ∧ groundingOk===true ∧ toolFailures===0 ∧ ¬surfacedEmpty ∧ ¬silentFinish ∧ ¬answerUnbacked ∧ ¬fetchedNotDrawn ∧ absenceWithoutEnumeration===null), and `procedureEligible = outcomeHonest ∧ calls>0 ∧ yield ∧ frame` (same truth table, test-pinned). offerable = `outcome.class === 'clean' || outcomeHonest(outcome)`.
Residual to name: groundingOk must be strictly true. On a turn where grounding did not run (null), the episode is not offerable. State that, or accept `groundingOk !== false` for the prompt face.

──────── 4 · D3c — no precomputed-outcome seam; "classify once in runTurn" is not race-free, it is WRONG ────────
distillAndWriteEpisode(ctx, actor, deps) (memoryDistill.ts:541-556) takes no outcome. It calls distillEpisode (:554), which derives `landing` (:448-452 `ctx.landingSignals ?? deriveLandingSignals({ finalText, persistRaw, reachClasses })`) and THEN `classifyTurnOutcome({ ...ctx, landing })` (:453).
A bare `classifyTurnOutcome(ctx)` in runTurn.ts omits `landing`, so absenceWithoutEnumeration and fetchedNotDrawn are null/false, and it computes a different class on exactly the BUG-035 turns.
Race: ctx.toolLedger is complete at runTurn.ts:301, because the flush runs in the SPAN_FLUSH callback after the stream stage's finally. It is not racy; it is just incomplete without landing.
Also procedureEligible is ALREADY evaluated twice per turn: via distillProcedure (:457 → :405) and at :571. D2's "computed ONCE" needs the value lifted.
FIX: export `deriveTurnOutcome(ctx)` = the :448-453 pair (landing + classify) from memoryDistill.ts. runTurn.ts calls it once and passes `outcome` to `distillAndWriteEpisode(ctx, actor, { ...deps, outcome })` (a new optional DistillAndWriteDeps field; distillEpisode uses it when present) and to the flush.
flushToolExperience SIGNATURE (toolExperienceFlush.ts:118-121): `(acc: ToolExperienceAccumulator | undefined, repo: ToolExperienceRepository = new ToolExperienceRepository())`. The 2nd positional parameter is the REPOSITORY. `flushToolExperience(acc, { turnFailed })` would hand an object to `repo.batchUpsert`. The resulting TypeError is swallowed by the try/catch at :129-130 as "[ToolExperience] flush failed", so the failure is silent in production. Use a third parameter or a gate object: `flushToolExperience(acc, repo?, { turnFailed })`.

──────── 5 · D3a/b — placement ────────
PR 640 places recordToolEmpty immediately after `const observation = …observeResult(…)` (PR head :2157-2167), before setSpanIO. Move recordToolSuccess there, guarded by `if (callWasSent)`. callWasSent is in scope (declared at master :1622, same closure). `viaGateway: false` is a literal today (:1780, justified at :1752-1761) and moves unchanged. The positive then keys on `observation.klass === 'answered' && observation.isEmpty === false`.
Tests pinning the current behaviour: toolArgPolicyWiring.test.ts:134-146. ":135 a REFUSED call records NO positive" and ":141 a SENT call that answers DOES record a positive" (a mock with 2 records, which is non-empty, so it stays green). Unit tests at toolExperienceFlush.test.ts:42-169 call recordToolSuccess directly with `failed` only. D3b's new `empty` field must be OPTIONAL, or all of them need it.
No wiring test pins the LINE position. Add one: an empty answered sent call → no accumulator key.
Interaction with M1 (queued first): after M1, the mock shape of executeMCPTool changes. F3/F4 mocks must use M1's okOutcome/errOutcome helper, so M2's tests are written against M1's master.

──────── 6 · D4 — re-probe delta ────────
toolCensusRefresh.ts:311-316: P3 is skipped iff `(experience.get(tool.name) ?? 0) > 0`; `experience === null` skips P3 entirely.
ON THE FIXTURE THE DELTA IS ZERO BY CONSTRUCTION. fixtureMcpServer.ts:75 answers every known tool with `JSON.stringify({ tool, arguments })`, a non-empty body, so observeResult never yields isEmpty (toolResultClass.ts:416-419). No fixture tool has "only empty positives". The ordered measurement is vacuous on that backend.
The meaningful number is production: tools whose tool_experience positives came only from empty answers. That needs the DB, which is the Operator's read and not a lane's. State it as UNMEASURED in the slip, with the query to hand to the Operator.
Second "has ANY positive" gate: censusToolDoc.ts:137 `if (experience && experience.positiveCount > 0 && parts.length > 0)` renders the model-facing "worked for us" sentence in the tool note (behind toolCensus.composeEnabled, A25 K40 brake). Fewer positives means fewer such sentences, which is the safe direction. Nothing else is gated on a positive.

──────── 7 · D5 — the Memory tab today ────────
src/components/admin/MemoryTab.tsx HAS an episode list: table headers :243-249, rows :261-271, detail dialog :278-315. CandidateMemorySection.tsx is a different surface (Stages tab card 14, StagesTab.tsx:416) and renders no episodes.
Class chip: none. The row badge at :268 renders `importanceLabel(ep.importance, t)`, and :69-72 is `>=3 corrected · ===2 tools · else 'zero-tool'`.
EXISTING MISLABEL: MEMORY_IMPORTANCE.FAILED scores BELOW ZERO_TOOL=1 (memoryDistill.ts:90-96), so every FAILED episode is badged "araçsız / zero-tool" today. The "Sonuç sınıfı / Outcome class" filter (:211-216) offers importance 3/2/1 only, so failed rows cannot be filtered.
Detail :305-306 "Karar/Decision" shows routeBasis · matchedCategories only, with no outcome.
i18n: there is NO i18n table. The tab uses inline `t('TR', 'EN')` pairs throughout (e.g. :70-72, :211-216, :243-249). The card's "strings via the i18n table the tab already uses (no inline literals)" contradicts the file. The house pattern here IS the inline t() pair; a table would be a second mechanism in one file.
Badge location for D5: beside :268 (row) and a new dt/dd after :306 (detail).

──────── 8 · §12.6 and fences ────────
- Offerable: wire the ONE predicate by splitting it (3). No second predicate.
- Experience gate: the positive keys on the observation that already exists (observeResult); no new emptiness logic.
- Outcome-once: lift the existing :448-453 pair; do not re-derive landing in runTurn.
- NOT M2's (A26-P1 owns): trace_label, the correction detector/lexicon (memoryDistill.ts:483 `userCorrection = null` stays), K23, and examScorers.readResult's verdict lift (M1b).
- NOT M2's (toolOutcomes owner): the not-sent-counted-as-success defect (W4). Name it in the report and cut a follow-up that adds a `notSent` subset on the ledger, the way `empties` was added, so dataBearing can exclude it.
- NO-HARDCODE: the D5 badge strings go through t() pairs in MemoryTab.tsx; no backend/tool literal. The existing ctx builders (memoryDistill.test.ts `getDowntime`, `'b1'`) are fixture strings; new tests use the fixture vocabulary.

──────── PASTE-READY DELTAS ────────
Δ1 PRECONDITION: replace the grep → "`git grep -n 'export function recordToolEmpty' origin/master -- api/cwf/_lib/turn/toolOutcomes.ts` prints one line AND `git grep -n '    empties: number;' origin/master -- api/cwf/_lib/turn/toolOutcomes.ts` prints one line." (The current probe passes on the comment at :50.)
Δ2 D1: `ledger?.toolEmpties` → `ledger?.empties`. Record signals `empties` and `dataBearingSuccesses`, plus a boolean `emptyOnlyWithFailures` naming the new disjunct.
Δ3 D1 append: "KNOWN CONTAMINATION, named: not-sent calls are counted as successes (stageTools.ts:1738-1744, recordToolOutcome is not gated on callWasSent), so dataBearing includes refused calls. Out of fence (toolOutcomes.ts); follow-up card adds a `notSent` ledger subset. The comment on memoryDistill.test.ts 'disjunct 5 alone' ('unreachable today') is corrected."
Δ4 D2 predicate: replace "`outcome.class === 'clean' || procedureEligible(ctx, outcome)`" → "`outcome.class === 'clean' || outcomeHonest(outcome)`, where outcomeHonest is the signal half (:298-305) SPLIT out of procedureEligible, and procedureEligible = outcomeHonest ∧ calls>0 ∧ yield ∧ frame (one predicate, two exported halves; semanticMemory.test.ts §G4 re-pinned)." Rationale line: "frame and yield are procedure-teaching conditions; the frame is absent by default on gateway-only turns (resolveTurnFrame.ts:194-200)."
Δ5 D2 filter literal: replace → "`decision->outcome->>offerable.eq.true,and(decision->outcome->>offerable.is.null,or(decision->outcome->>class.is.null,decision->outcome->>class.neq.failed))` — the legacy arm keeps class-absent rows (EpisodesRepository.ts:365-370)."
Δ6 D3c replace: "memoryDistill.ts exports `deriveTurnOutcome(ctx)` = the :448-453 landing+classify pair. runTurn.ts calls it ONCE and passes it to distillAndWriteEpisode via a new optional `DistillAndWriteDeps.outcome` and to `flushToolExperience(acc, undefined, { turnFailed })`. The flush's 2nd positional parameter is the repository (toolExperienceFlush.ts:118-121)."
Δ7 D3a/b append: "`empty` is OPTIONAL on recordToolSuccess's outcome type (toolExperienceFlush.test.ts calls it without). New wiring test: sent + answered + empty → no accumulator key. toolArgPolicyWiring.test.ts:141-146 stays green."
Δ8 D4 replace the fixture measurement: "On the fixture the delta is 0 by construction (fixtureMcpServer.ts:75 echoes a non-empty body). The slip prints `re-probe delta: UNMEASURED on production — Operator query: count tools per backend whose tool_experience positives would be zero after excluding empty answers`, and a unit case on selectRefreshTargets proving a tool losing its only positive enters P3."
Δ9 D5 replace "strings via the i18n table the tab already uses (no inline literals)" → "strings as inline `t('TR','EN')` pairs, the tab's existing pattern (MemoryTab.tsx:70-72, :211-216)". Add: "FIX the existing mislabel: the row badge (:268) renders the OUTCOME CLASS from `decision.outcome.class` (failed/unproven/clean/legacy), not importanceLabel, because FAILED importance < ZERO_TOOL badges every failed episode 'zero-tool' today (:69-72). Add a 'failed' option to the class filter (:211-216). Detail (:306) gains Outcome · offerable · data/empty/failed."
Δ10 F1: "(0 data, 3 empty, 2 failed) → failed" holds (cell (0,1,1)). ADD F1b: "(0 data, 0 empty, 2 failed, 1 cap-refused) → documents today's contamination: class unproven, the report names it."
Δ11 F3 add: "a gateway-only frameless honest turn (groundingOk true, 0 failures) → offerable TRUE under outcomeHonest (would be FALSE under procedureEligible; the regression this delta prevents)."
Δ12 F5 add: "legacy row with NO outcome key at all → still recalled (class.is.null arm)."
Δ13 Tests to update, named: memoryDistill.test.ts 'the ALL-FALSE case' (signals toEqual), 'empty≠zero: a no-frame turn' (decision toEqual), the '[MemoryWrite]' line test if the line gains a field; semanticMemory.test.ts §G4 (split predicate).
Δ14 QUEUE: M2's tests are written against M1's master (the executeMCPTool mock shape changes in M1).

read relay_inbox at 2026-09-30 03:04:32Z (mail-wait exit 0, one row) and --read of card 0449bf12.
