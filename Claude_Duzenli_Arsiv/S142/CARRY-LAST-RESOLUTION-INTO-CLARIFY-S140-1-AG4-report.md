<!-- relay-audit: v1 kind=report -->
# CARRY-LAST-RESOLUTION-INTO-CLARIFY-S140-1 — AG-4

`read relay_inbox at 2026-09-16T19:12:21Z — read OK — two rows for AG-4 above the claim watermark (the sealed card v1 and AMENDMENT-1), head reached; both read digest-checked, the card's seal admitted, delivery taken at 19:12Z–19:13Z.`

**BUILT, PUSHED, NOT LANDED.** The cross-turn carrier is wired. The asking turn's episode already held
the factory it resolved; stage 05 read it for the prompt and clarify read nothing. Now the most recent
offerable episode of the conversation is read once, bounded, in the caller, and its resolved ids are
handed to the narrowing that already existed at the seam — and to ⑥'s in-scope list — as SCOPE, never
as a resolution of this frame. The question a turn SHOWS is written to its episode, and the next turn
can answer it by naming an option. Twelve cases failed first on the fork point, with (a) reproducing the
owner's second ask verbatim; the first full-suite run found one fault of this card's own (a context
with no conversation id took the stage down into its catch), which is fixed and pinned as (c″). Every
named pin is green. The PR is open; the landing is AG-5's; the acceptance is the Architect's two-turn
witness after it.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the card and its amendment were read digest-checked and taken | MEASURED: node scripts/mail-wait.mjs AG-4 --read … --take at 19:12Z (card) and 19:13Z (amendment) | card |
| DONE derived TODO: report absent on origin/master, no phase ref; master AT the fenced anchor | MEASURED: git ls-tree origin/master docs/relay/…-AG4-report.md (empty); git branch -r --list (empty); git rev-parse origin/master at 19:13Z | done |
| the precondition holds: the seam builds `resolvedPeerIds` from `merged` only; the distiller writes `entities.canonical` from `ctx.entityResolutions.canonicalIds`; nothing in clarify reads the episodes | MEASURED: the seam at stageClarify.ts (the peer loop), memoryDistill.ts (the `entities` object), grep of stageClarify.ts for `Episodes` (0 hits) at 19:14Z | premise |
| falsifier 1 cannot fire: `walkToResolvedPeer` matches `parent_entity_id` against bare ids and `entities.canonical` is written from bare `canonicalId`s — no layer join to invent | MEASURED: the walker at stageClarify.ts and the memory stamp; test (a) resolves through it with bare ids | premise |
| falsifier 2 is the seam's own law: zero survivors hand back the full set | MEASURED: `narrowAmbiguousByResolvedPeer` ORDER B.2; test (e) reaches it with a carried peer | premise |
| falsifier 3 cannot fire: an asking turn runs no tool and trips no failing signal, so `classifyTurnOutcome` gives `clean`, which the OFFERABLE filter admits | MEASURED: classifyTurnOutcome's predicate; the A3 valve-open test asserts `decision.outcome.class === 'clean'` on the asking turn's own row | premise |
| ORDER 1 / A1: the read runs in the caller, ONE `LIMIT 1` query, and crosses as data; 'ok' / 'empty' / 'unreadable' kept apart; carried ids never enter `mergedAlias` | MEASURED: git show of the commit — `readCarriedResolution`, `CarriedResolution`, the `carried` parameter; tests (a), (b), (c), (c′), (c″), (f) | orders |
| ORDER 1(c): the carried peer is not a resolved ref of this frame | MEASURED: test (f) — `canonicalIds` is the line only; the span's refs carry no factory | failing-first |
| A2: ⑥'s in-scope list is bounded by the carried peer and the line says so | MEASURED: test A2 — `[Diagnosis] … scopedBy=f-north carriedFrom=turn-prev` on a NIL carrier mention | failing-first |
| ORDER 2 / A3 / A4: `decision.ask` is written only for a SHOWN question; a message equal to a shown option resolves the ref by 'carried-option'; the match is over the shown options only | MEASURED: tests (d), (d′), A4, A3 ×2 | failing-first |
| ORDER 3: the stage-03 span carries `carried`, a carried-option ref reports its method, the narrowing line and row carry `carriedFrom`, the lens gains two causes | MEASURED: tests (a), (d); the lens's own C-SEAM pin green with the three reads and one stamp classified | orders |
| ORDER 4: every new case failed first on the fork point and passes on the head | MEASURED: vitest with the source stashed — 12 failed / 0 passed; on the head — 13 passed (the 13th is (c″), added after the first full run) | failing-first |
| the named pins stay green | MEASURED: entityScopeByResolvedPeer, entityScopeDurableEmit, stageClarify, wireDiagnosisDecision, clarifyStageSpan, clarificationLens, memoryDistill/Retrieve/SliceWiring/Procedure — 265 passed | gates |
| the full suite is green on the head | MEASURED: npm run test — 732 files, 10780 passed, 4 expected fail, 1 skipped, 0 failed | gates |
| the build gate set is green with the reseal in the same commit | MEASURED: npm run build red on check:doc-drift (five tabs); npm run reseal → the gate's own digests; npm run build green | gates |
| the tenant-zero gate is green on the branch; no live name enters the tree or this report | MEASURED: npm run check:tenant-zero — [OK] ZERO gated-vocabulary hits, 2217 files | gates |
| the touched files lint clean | MEASURED: npx oxlint over the six source/test files — no output | gates |
| the branch is on origin and the PR is open | MEASURED: git push — `* [new branch]`; gh pr create | push |
| CI at the head | NOT-READ | the slip carries every workflow by name, run_attempt and conclusion as this lane reads it |
| the two-turn witness after the landing (ORDER 5) | NOT-READ | the Architect runs the owner's two sentences in a NEW conversation once master carries this and production is READY, and reports `carried.peers` and `scopedBy` on the bus |

## The card, and DONE before work

```evidence:card
$ node scripts/mail-wait.mjs AG-4 --read CARD-CARRY-LAST-RESOLUTION-INTO-CLARIFY-S140-1-v1 --take
[CARD] artifact_name=CARD-CARRY-LAST-RESOLUTION-INTO-CLARIFY-S140-1-v1 created_at=2026-09-16 19:11:25.471827+00 id=77f437e4-5f55-4f77-9a4d-4642d8bc0419 body_md5=79a0bd201b5e51b32bdf8630896a9539 length=11991
[DIGEST-OK] locally recomputed md5 matches the row's
[SEAL] admitted — sealed by 23ad53db-e206-406f-ad85-e71c43145f8a; canonical sha256 9193d971… matches the scout's
[STAMPED] consumed_at written for CARD-CARRY-LAST-RESOLUTION-INTO-CLARIFY-S140-1-v1

$ node scripts/mail-wait.mjs AG-4 --read AMENDMENT-1-CARD-CARRY-LAST-RESOLUTION-INTO-CLARIFY-S140-1-v1 --take
[CARD] artifact_name=AMENDMENT-1-CARD-CARRY-LAST-RESOLUTION-INTO-CLARIFY-S140-1-v1 created_at=2026-09-16 19:11:57.405695+00 id=3d01c9d2-357e-426d-8847-6cd0c8895d0f body_md5=0e2317d19d23d26e57ae7e16eb7f4bee length=2623
[DIGEST-OK] · [CARD-REFUSED] CP-1, CP-3, CP-4, CP-5 under CARD_GATE=REPORT (a notice, travels by shape) · [SEAL] admitted · [STAMPED]

the witness turns the card names (raw-tokens):
  asking turn   518d7393413c51080b2fa6377587e47f   (09:06:11Z)
  reply turn    5b3f26de3e9f4ae998f14dfa97e13263   (09:07:31Z)
```

```evidence:done
$ git rev-parse origin/master
4bec094ea1d14289eaf4783677d304385e4e4bc5                      (= the card's fenced anchor, the merge of PR 574)
$ git ls-tree -r --name-only origin/master docs/relay/CARRY-LAST-RESOLUTION-INTO-CLARIFY-S140-1-AG4-report.md
(empty)
$ git branch -r --list "origin/phase/carry-last*"
(empty)
-> TODO
```

## The premise, re-measured live

```evidence:premise
$ grep -n "resolvedPeerIds\|Episodes\|listRecentByConversation" api/cwf/_lib/turn/stageClarify.ts      (at origin/master)
966:        const resolvedPeerIds = new Set<string>();
967:        for (const v of merged.values()) if (isResolvedEntity(v)) resolvedPeerIds.add(v.canonicalId);
972:            const narrowed = narrowAmbiguousByResolvedPeer(v.candidateEntityIds, parentage, resolvedPeerIds);
1646:    const resolvedPeerIds = new Set<string>();
1647:    for (const v of mergedAlias.values()) if (isResolvedEntity(v)) resolvedPeerIds.add(v.canonicalId);
-> built from `merged` / `mergedAlias` only, at BOTH consumers (the seam and ⑥'s in-scope list); no episode read anywhere in the file.

$ sed -n 489,495p api/cwf/_lib/turn/memoryDistill.ts      (at origin/master)
        entities: {
            surfaces: frame ? [...frame.entity_ref] : [],
            canonical: ctx.entityResolutions ? [...ctx.entityResolutions.canonicalIds] : [],
            frameExtracted: !!frame,
            resolverRan: !!ctx.entityResolutions,
        },
-> the carrier write, exactly as the card names it; canonical ids are the bare `canonicalId`s the seam stamped.

$ sed -n 335,352p api/cwf/_lib/turn/stageClarify.ts      (walkToResolvedPeer, at origin/master)
        const parentId = cur.parentEntityId;
        if (parentId === null) return { kind: 'out-of-scope' };
        if (resolvedPeerIds.has(parentId)) return { kind: 'in-scope', peerId: parentId };
-> the walk matches `parent_entity_id` against the peer set by BARE id — the same shape the episode carries. Falsifier 1 has no join to invent.

$ sed -n 166,187p api/cwf/_lib/turn/memoryDistill.ts      (classifyTurnOutcome, at origin/master)
    const failed = ctx.surfacedEmpty === true || ctx.silentFinish === true || answerUnbacked || groundingOk === false
        || (calls > 0 && successes === 0) || absenceWithoutEnumeration !== null || fetchedNotDrawn;
    ...
    return { class: calls > 0 ? 'unproven' : 'clean', signals };
-> an asking turn calls no tool and sets none of the failing signals (runClarificationTurn sets only finalText): class 'clean', OFFERABLE. Falsifier 3 does not fire; the A3 test asserts it on the asking turn's own distilled row.

$ sed -n 519,536p api/cwf/_lib/persistence/repositories/EpisodesRepository.ts      (at origin/master)
    async listRecentByConversation(conversationId: string, limit: number, taskId: string | null): Promise<EpisodeCandidateRow[] | null> {
        ...select(CANDIDATE_COLUMNS).eq('conversation_id', conversationId).or(OFFERABLE_OUTCOME_FILTER) ... .order('created_at', { ascending: false }).limit(limit)
        if (error) { ...; return null; }
-> null on a failed read, [] on an empty conversation, LIMIT k — the read the card names. CANDIDATE_COLUMNS carried no turn_id; ORDER 3's `carriedFrom=<turn_id>` needs it (a read-side projection column, added — the card's own clause).
```

## ORDER 1 — carried peers, as data

The read is `readCarriedResolution(conversationId, taskId, message)` in `computeTurnClarificationRecorded`,
inside the same `Promise.all` as the alias and time reads so it costs the turn no round trip in series.
Its result is a `CarriedResolution` — `read`, `turnId`, `peerIds`, `askOption` — and it crosses into
`mergeEntityRegistryResolution` and `decideEntityExecution` as a parameter (A1: neither function can reach
the turn, and their signatures still say so). The seam's peer set is seeded from `carried.peerIds` before
`merged`'s resolved ids are added; `carried.peerIds` is kept separately so the `[EntityScope]` line and
the `entity_scope_narrowed` row can say `carriedFrom=<turn_id>` when a carried peer scoped. A carried id
never enters `mergedAlias`, and the resolved stamp derives from `mergedAlias` alone — ORDER 1(c) holds by
construction, and test (f) measures it. A2 hands the same `carried` to ⑥, whose `inScopeNamesFor` now
reports which peer bounded the list so the `[Diagnosis]` line can say `scopedBy=… carriedFrom=…`.

A read with no conversation id (a replayed frame, a hand-built context) returns 'unreadable' without
querying — the first full-suite run found `conversationId.length` throwing on such a context and the
stage's own catch swallowing it into "normal generation"; that is (c″) now. The bound is ONE previous
turn, named in the seam's comment as a choice.

```evidence:orders
$ git show c7779098 --stat
 api/cwf/__tests__/carryLastResolution.test.ts             | new (13 cases)
 api/cwf/__tests__/memoryProcedure.test.ts                 | fixture gains turnId
 api/cwf/__tests__/memoryRetrieve.test.ts                  | fixture gains turnId
 api/cwf/__tests__/memorySliceWiring.test.ts               | fixture gains turnId
 api/cwf/_lib/persistence/index.ts                         | exports EpisodeAsk
 api/cwf/_lib/persistence/repositories/EpisodesRepository.ts | EpisodeDecision.ask?, EpisodeAsk, turn_id in CANDIDATE_COLUMNS / EpisodeCandidateRow.turnId
 api/cwf/_lib/replay/clarificationLens.ts                  | causes 'carried-peer' / 'carried-option'; REPLAY_CTX_FIELDS + message, resolvedConversationId, taskId; REPLAY_CTX_STAMPED_FIELDS + carried; the builder supplies '' / '' / null
 api/cwf/_lib/turn/memoryDistill.ts                        | decision.ask from ctx.askShown[0]
 api/cwf/_lib/turn/stageClarify.ts                         | CarriedResolution, readCarriedResolution, matchShownOption; the carried parameter at the seam and at ⑥; the ORDER 2 pre-seed; carriedFrom on the line and the row; askShown at the two render sites; the span's carried block
 api/cwf/_lib/turn/types.ts                                | TurnContext.askShown?, TurnContext.carried?
 public/architecture/manifest.json                         | reseal (five tabs)

$ git show c7779098 -- api/cwf/_lib/turn/stageClarify.ts        (the peer set, the hunk)
-        const resolvedPeerIds = new Set<string>();
+        const resolvedPeerIds = new Set<string>(carried.peerIds);
         for (const v of merged.values()) if (isResolvedEntity(v)) resolvedPeerIds.add(v.canonicalId);
         ...
+            const carriedFrom = carried.peerIds.has(narrowed.scopedBy) ? (carried.turnId ?? 'unknown') : null;
+            if (carriedFrom !== null) carriedScoped.set(ref, narrowed.scopedBy);
             console.log(`[EntityScope] ref=${ref} entered=${narrowed.entered} survived=${narrowed.survivors.length} ` +
-                `scopedBy=${narrowed.scopedBy}`,
+                `scopedBy=${narrowed.scopedBy}` + (carriedFrom !== null ? ` carriedFrom=${carriedFrom}` : ''),
-> `merged` is never written from `carried`; `ctx.entityResolutions` (further down, unchanged) is built from `mergedAlias` alone.

$ git show c7779098 -- api/cwf/_lib/turn/stageClarify.ts        (the two render-site stamps)
+        ctx.askShown = rendered.ambiguous.map((a) => ({ surface: a.surface, options: a.options.map((o) => ({ entityId: o.entityId, label: o.label })) }));
         return { kind: 'ask', message: askAmbiguousMessage(rendered.ambiguous) };
   ...
+        ctx.askShown = [{ surface: ref.surface, options: ref.options.map((o) => ({ entityId: o.entityId, label: o.label })) }];
         return { kind: 'ask', message: askAmbiguousMessage([ref]) };
-> both sit inside `if (valveOpen && …)`; nothing stamps `askShown` on a shut valve (A3).
```

## ORDER 2 — answering the ask by its option (A3, A4)

`matchShownOption(message, decision.ask)` folds the message (trimmed, `turkishFold`, whitespace
collapsed) and compares it with each SHOWN option's label and id, folded the same way. A match is computed
once in the caller and handed in; the seam then resolves every ref of THIS frame that folds to the matched
option — seeded into `merged` before the resolver loop, where the same guard that protects a governed
alias hit keeps the registry from re-judging it, and the loop skips the ref's own registry verdict so a
hit cannot overwrite it with a different id. ⑤ sees an EXACT link (the user typed the option verbatim), so
no "interpreted as" premise is owed; the span reports the channel as `carried-option`. A message equal to
no shown option changes nothing (test d′). The distiller writes `decision.ask` from `ctx.askShown[0]` —
the FIRST shown ambiguity when a turn showed two; a bound, named as finding 3.

## ORDER 4 — tests, failing first

```evidence:failing-first
$ git stash push -- <the six source files>                         (tests kept, source at the fork point)
$ npm run test -- api/cwf/__tests__/carryLastResolution.test.ts
 FAIL  (a) the previous episode carries a resolved factory ⇒ ONE survivor, RESOLVE, no ask, scopedBy the CARRIED peer
   AssertionError: expected { kind: 'ask', message: { …(2) } } to be null
   + "tr": "'Kiln Line' adıyla eşleşen 3 kayıt var. Hangisini kastettiniz?\n1. East Wing\n2. North Wing\n3. South Wing"
 FAIL  (f) … expected [] to deeply equal [ 'k-north' ]
 FAIL  (b) / (c) / (c′) / (e) … ctx.carried undefined
 FAIL  (d) … expected [ 'f-north' ] to deeply equal [ 'k-north' ]      (the registry resolved the typed LABEL to the factory; the option meant the line)
 FAIL  (d′) / A4 / A3 ×2 / A2 …
      Tests  12 failed (12)
-> (a) is the owner's second ask, verbatim: the carried factory is the second option of the question it should have answered.

$ git stash pop
$ npm run test -- api/cwf/__tests__/carryLastResolution.test.ts
      Tests  12 passed (12)                                           (before (c″) was added)

$ npm run test                                                        (first full run)
 FAIL  api/cwf/__tests__/spanIOCompleteness.test.ts > … the clarify stage span carries the refs as input …
   stderr: [Clarify] resolution failed — proceeding with normal generation: Cannot read properties of undefined (reading 'length')
-> a hand-built ctx with no resolvedConversationId; `conversationId.length` threw inside the carrier read and the stage's
   catch swallowed the whole stage. Fixed (typeof guards in readCarriedResolution and matchShownOption) and pinned as (c″).

$ npm run test -- api/cwf/__tests__/carryLastResolution.test.ts api/cwf/__tests__/spanIOCompleteness.test.ts
      Tests  31 passed (31)
```

## Gates

```evidence:gates
$ npm run typecheck:api
> tsc -p tsconfig.api.json && tsc -p tsconfig.api.test.json          (no output; three memory fixtures gained turnId to satisfy the widened projection)

$ npm run test -- entityScopeByResolvedPeer entityScopeDurableEmit stageClarify wireDiagnosisDecision clarifyStageSpan clarificationLens memoryDistill memoryRetrieve memorySliceWiring memoryProcedure
 Test Files  10 passed (10)
      Tests  265 passed (265)
-> the S134 narrowing, the PR 572 collapse, the PR 573 ⑤/⑥ pins (the :358 COMPARE guardian included), the PR 574 labels, the lens's C-SEAM — all green.

$ npm run test                                                        (second full run)
 Test Files  732 passed (732)
      Tests  10780 passed | 4 expected fail | 1 skipped (10785)

$ npm run build                                                        (first run)
[FAIL] DOC DRIFT: Architecture Map … (expected 78e94b0a4c43, got 7f8653b01429)
[FAIL] DOC DRIFT: Runtime Topology … (expected 893360cdeeed, got 98919a129ec3)
[FAIL] DOC DRIFT: Request Lifecycle … (expected 23c1ceba9dfc, got 20f4fc666c94)
[FAIL] DOC DRIFT: Agent Control Plane … (expected 673340f1ce2d, got f9bed94c7fae)
[FAIL] DOC DRIFT: Stage Cards … (expected 47c32276fc37, got b1ee5bf75a28)
$ npm run reseal
[reseal] Architecture Map: 510 mapped files -> 7f8653b01429 (was 78e94b0a4c43)
[reseal] Runtime Topology: 182 mapped files -> 98919a129ec3 (was 893360cdeeed)
[reseal] Request Lifecycle: 203 mapped files -> 20f4fc666c94 (was 23c1ceba9dfc)
[reseal] Agent Control Plane: 124 mapped files -> f9bed94c7fae (was 673340f1ce2d)
[reseal] Stage Cards: 47 mapped files -> b1ee5bf75a28 (was 47c32276fc37)
-> the five re-derived digests are the five the gate reported; `git status`: manifest.json is the only other change.
$ npm run build                                                        (second run)
[check:ground] GREEN · ✓ built in 637ms · [check:doc-drift] [OK] no drift -- all 7 narrative tabs synced
$ git checkout -- docs/ground/facts.json docs/ground/authority-conformance.latest.md      (rewritten by the build; restored, never committed)

$ npm run check:tenant-zero
[check:tenant-zero] [OK] ZERO gated-vocabulary hits in scope — 2217 files scanned (floor 400)

$ npx oxlint stageClarify.ts memoryDistill.ts types.ts EpisodesRepository.ts clarificationLens.ts carryLastResolution.test.ts
(no output)
```

## ORDER 5 — the acceptance, written down, not done

After the landing and production READY, the Architect runs the owner's two sentences in order in a NEW
conversation: the factory + kiln downtime sentence (expect the two-line ask, as today, and its episode
carrying `decision.ask` with the two options and `entities.canonical` with the factory), then the line's
name alone (expect NO second ask: one survivor, a tool call for the stops, stage 03 `carried.read = 'ok'`,
`carried.peers` naming the factory, `carried.scoped` naming the line ref, and `[EntityScope] …
carriedFrom=<the asking turn's id>`). If the second sentence is instead the option's LABEL, expect
`carried.askOption` and `optionRefs` and method `carried-option`. The Architect reads turn_trace_digest and
reports the fields on the bus; that reading is the acceptance. This lane does not run it and does not
quote the names.

## DIFF

```evidence:diff
$ git diff --name-only origin/master
api/cwf/__tests__/carryLastResolution.test.ts
api/cwf/__tests__/memoryProcedure.test.ts
api/cwf/__tests__/memoryRetrieve.test.ts
api/cwf/__tests__/memorySliceWiring.test.ts
api/cwf/_lib/persistence/index.ts
api/cwf/_lib/persistence/repositories/EpisodesRepository.ts
api/cwf/_lib/replay/clarificationLens.ts
api/cwf/_lib/turn/memoryDistill.ts
api/cwf/_lib/turn/stageClarify.ts
api/cwf/_lib/turn/types.ts
public/architecture/manifest.json
-> the card's `scope` fence, plus: turn/types.ts (finding 1), persistence/index.ts (the type export the
   repository change needs), and three memory test fixtures (the widened projection). No migration, no
   new table, no IR change, no change to ⑤/⑥'s modules, the render layer or memoryRetrieve.
```

## Push and PR

```evidence:push
$ git push -u origin phase/carry-last-resolution-into-clarify-s140-1
 * [new branch]        phase/carry-last-resolution-into-clarify-s140-1 -> phase/carry-last-resolution-into-clarify-s140-1
$ git rev-parse HEAD
c7779098…                                       (the code commit; the report commit follows it and never gates it)
$ gh pr create …                                 (the URL is in the slip)
```

## Findings beside the card

1. **F-S140-CARRY-TYPES-SCOPE-EXCURSION-1** — `turn/types.ts` is not in the card's `scope` fence and
   gains two optional `TurnContext` fields: `askShown` (what the distiller reads for `decision.ask`, A3)
   and `carried` (what the replay lens reads for its two causes, ORDER 3). Deriving "the ask was shown"
   inside the distiller from `askEvidence` would have duplicated `computeAskOutcome`'s render predicate —
   the label-is-not-the-computation defect — so the stamp is set at the render site instead. Additive,
   the PR 573 precedent; the Architect rules.
2. **F-S140-CARRY-CTX-NO-CONVERSATION-THROW-1** — this card's own fault, found by the first full run:
   `conversationId.length` on a context with no `resolvedConversationId` threw inside the carrier read and
   the stage's catch swallowed the WHOLE clarify stage into "normal generation". A read that cannot be
   made must be 'unreadable', never a throw. Fixed with `typeof` guards and pinned as (c″).
3. **F-S140-CARRY-ONE-ASK-PER-EPISODE-1** — `decision.ask` carries ONE shown question (the first) when a
   turn showed two ambiguities at once. The card's shape is singular; a turn that asks about two refs
   records only the first, and a reply naming the second's option falls to today's path.
4. **F-S140-CARRY-OPTION-NEEDS-A-REF-1** — the carried option resolves the refs of THIS frame that fold to
   it. A reply whose frame carries no such ref (the router extracted nothing from a bare option label)
   records `askOption` in the span but resolves nothing — the IR is not widened by this card, so no ref is
   invented. The witness's reply frame did carry the ref, and (d) covers that shape.
5. **F-S140-CARRY-COST-1** — one bounded episode query per frame-bearing turn with `router.frameRouting`
   open, concurrent with the alias/time reads. The same table stage 05 already reads once per turn; this
   is a second `LIMIT 1` read of it, not a new table.
6. **F-S140-CARRY-LENS-REPLAY-BLIND-1** — on replay the carrier reads nothing by construction (a recorded
   frame has no conversation), so the lens's two new causes are reachable only on a live context. The
   lens reports 'unreadable' there, honestly; it cannot measure the carrier from recorded frames alone.
