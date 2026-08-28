<!-- relay-audit: v1 kind=card prov=1 -->
# SCOUT-CARD-REVIEW-13 · v1 — the seventh key's build card, and its designs are refuted inside it

fanout: personalized — ONE address, scout, one copy. No sibling holds these bytes.

**THIS CARD ADVANCES NO ACCEPTANCE CRITERION AND SAYS SO.** The candidate does: it is the build card
for `#29` / `GI-101`, the A23 understanding layer, which traces to TIER A · Gaia2 and is the open
key of the internal counter. **This is the most consequential card of the session and it edits
product source — the first one this loop has reviewed that does.**

**WHAT MAKES IT UNUSUAL, AND WHY YOUR R1 MATTERS MORE THAN USUAL.** Both landed A23 design reports
name `resolveViaRegistry` as the edit site. The Architect measured on three lenses that no such
symbol has ever existed in this repository, in any ref, in any commit. The candidate therefore
carries a corrected route AND an ORDER E recording the refutation. **You are reviewing a card whose
own ground contradicts two landed reports. Check the refutation before you check anything else: if
the Architect is wrong about that, the whole card is wrong.**

The owner has approved the three product decisions the design left to him — the wording, the option
ordering and the cap — so those are settled and are not open questions for this review.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master is `b86850250cb3d845ff5be5edc425e3304e0dc72f` at the instant in PREMISE | MEASURED: git ls-remote origin refs/heads/master | delta |
| the quoted candidate hashes to sha1 `93eef83ea3571e93b808a295f549f4c29d121170` over 17217 bytes, and stripping the quote prefix recovers the card, sha1 `d2cbbb991a134f377f0cb21b48e523231f9553b6` over 16665 bytes | MEASURED: sha1sum and wc -c over both files, plus cmp of the recovered file against the built original | delta |
| the candidate passes the landed mechanical card check, and its deliverables block parses with no defect | MEASURED: cardPreflight --check over the recovered file · MEASURED: readDeliverables from relayAudit.ts over the same file, against two deliberately broken copies that each returned their planted defect | delta |
| the symbol both designs name has never existed in this repository | MEASURED: a working-tree grep · an index-based git grep · git log -S over all refs — three lenses of different kinds | refute |
| whether the candidate is sound as a work order on product source | NOT-READ | that is the deliverable and only your reading answers it |
| what the change does to the ask rate on live traffic | NOT-READ | the card orders the lane to measure or declare it; no frequency claim is made anywhere |

## EVIDENCE

```scope
- R1 · the refutation: does the named symbol really not exist, on your own lenses
- R2 · the corrected route: is the collapse really at the statement the card names
- R3 · the two mapping sites: is the parent really dropped twice, not once
- R4 · the carrier constraint: is it true that the ambiguity has nowhere to land today
- R5 · executability: can one lane obey ORDER A, B, C and D in one branch
```

```evidence:refute
The Architect's three lenses, for you to reproduce or break:
  grep over the working tree, *.ts            -> no hit
  git grep over tracked content               -> no hit
  git log -S over ALL refs, *.ts              -> no commit ever added or removed it
The symbol appears in exactly two places, both PROSE, both relay reports on master.

THE CONSEQUENCE THE CARD DRAWS FROM IT, and this is the part to attack: the design
says "AliasResolutionMap is NOT widened" and rests that on a discarded return. The
card says nothing is discarded — the carrier type has two states and an ambiguity
has nowhere to land. If you can show a third state, or a return that discards a
map, the card's ORDER B is wrong and this is a RED.
```

```evidence:delta
Re-measured 2026-08-28T11:59:38Z. git ls-remote origin refs/heads/master returned
b86850250cb3d845ff5be5edc425e3304e0dc72f.
    quoted    sha1 93eef83ea3571e93b808a295f549f4c29d121170 over 17217 bytes
    recovered sha1 d2cbbb991a134f377f0cb21b48e523231f9553b6 over 16665 bytes
    recovery  sed 's/^| //'; cmp against the built original: IDENTICAL
    preflight --self-test proven both directions earlier this session; --check over
              the recovered file: CP-1 through CP-11 all OK, GREEN
    deliverables present, both keys, no defect; two broken controls each returned
              their planted defect, so the clean parse is a reading
```

## PREMISE

PRECONDITION READ AT 2026-08-28T11:59:38Z: master is the sha in CLAIMS row one — MEASURED:git ls-remote origin refs/heads/master
MEASURED:both digests, both byte counts, the byte-for-byte recovery, the preflight verdict and the deliverables parse with its negative control, all from the one built file.
MEASURED:the three refutation lenses in the refute fence, from a fresh clone at that master.
UNMEASURED — whether the corrected route is right, which is the entire point of sending it.

SELF-INVALIDATION: this premise decays on the next push to master and the moment anything lands under api/cwf/_lib/turn/ or api/cwf/_lib/routing/. ON-DISAGREEMENT: if your read of the remote returns a different sha, or any line number in the candidate's collapse, types or sites fences names different code than what is written beside it, STOP and report what you read rather than adjusting anything.

## THE CHECKLIST

R1 the refutation · R2 the corrected route · R3 the two mapping sites · R4 the carrier constraint ·
R5 executability · R6 byte proof: recover the candidate and confirm both digests.

**R1 IS THE LOAD-BEARING ONE THIS ROUND.** Every other order rests on it. Run the three lenses
yourself and add a fourth if you can think of one.

**R5 HAS A NAMED TARGET.** The candidate's ORDER C turns the prose ordering constraint into a
conjunction gate and orders both segments into ONE branch. Say whether that is sufficient — a lane
that lands the carry-through without the render converts a badly-worded question into silence, and
silence is worse than the wrong words.

## ORDER A — one verdict, GREEN or RED, findings named against R1 to R6

**Do not rewrite the card.** On GREEN it dispatches to AG-3 unchanged. If your verdict is GREEN, name
the one thing you would look for in the lane's report that would prove the ask shape actually reached
a user-visible surface rather than only a type.

## ORDER B — one sentence

This card edits product source, which none of the twelve before it did. **Say in one sentence what a
review of a SOURCE-EDITING card must check that a review of a documentation card does not** — the
Architect will carry it to the owner as a proposed addition to the review checklist.

## FALSIFIER

Falsified if either digest differs from CLAIMS, or if any of the three refutation lenses fails to
reproduce from your own clone. Report that and stop.

Second arm: **a review that accepts the refutation because it is well argued has added no lens.**
Run the lenses. A landed report is not evidence about a symbol; the tree is.

## SHARED SURFACES

None. You write no file, no branch, no commit, no setting. Your reply is your only write.

## DECISION RIGHTS

The owner has settled the wording, the option ordering and the cap. The Architect is answerable for
the corrected route and for putting both segments in one branch. **The lane decides the carrier shape**
— the card leaves it open deliberately, because that is the decision both designs got wrong by
asserting it. You rule on the verdict. Nothing here spends.

## DELIVERY

Reply on the channel your boot names, addressed to this card, under the server's character ceiling.
Verdict first, R1 findings second, the ORDER B sentence last.

## THE CANDIDATE — line-quoted, both digests in CLAIMS

Recover it with `sed 's/^| //'` over the block below. The candidate's own tail anchor is inside the
quoted block and carries the pipe prefix; THIS card's tail anchor is the last line of the file.

```evidence:candidate
| <!-- relay-audit: v1 kind=card -->
| # PHASE-A23-ASK-SHAPE-BUILD-1 · v1 — the seventh key: the system stops saying "I found none" when it found three
| 
| `#29` / `GI-101` is the A23 UNDERSTANDING LAYER and the ledger calls it *the SOTA key*. It traces to
| TIER A · Gaia2, the clarification gate, so `SOTA-1` protects it from deferral. Two designs landed on
| 2026-08-26 and each says in its own words that the repair is a separate card. **This is that card.**
| 
| **READ ORDER E FIRST IF YOU READ NOTHING ELSE.** Both landed designs rest on a function name that has
| never existed in this repository, measured on three lenses. Their SUBSTANCE is sound and is located
| below at real line numbers; their route sentence is not. You are being handed the corrected route and
| the correction is recorded rather than smoothed.
| 
| ## PREMISE
| 
| MEASURED: 2026-08-28T11:24:18Z from a fresh clone at the master sha in the `anchor` fence. Every line number below was opened and read in that clone, not taken from the design reports.
| MEASURED: `git ls-remote origin refs/heads/master` — the full sha sits in the `anchor` fence.
| ON-DISAGREEMENT: if your own `git ls-remote` returns a different sha, or any line number in the `collapse`, `types` or `sites` fences names different code than what is written beside it, STOP and report what you read. Do not adjust the fence and do not build against a tree this card did not measure.
| UNMEASURED: how often live traffic reaches the ambiguous outcome. The shape is correct at any frequency, so the build does not depend on it and no frequency claim is made.
| DECAYS the moment anything lands under `api/cwf/_lib/turn/` or `api/cwf/_lib/routing/`. Re-derive every reading here before you edit; ORDER E is the reason to distrust prose about this seam specifically.
| 
| ## CLAIMS
| 
| | claim | basis | anchor |
| |---|---|---|
| | master is `b86850250cb3d845ff5be5edc425e3304e0dc72f` at the instant in PREMISE | MEASURED: git ls-remote origin refs/heads/master | anchor |
| | the producer already mints a three-state verdict carrying every colliding id | MEASURED: a read of the union at resolveEntityRef.ts and of the statement that mints it | collapse |
| | the ambiguity dies at ONE statement, and the candidate ids are dropped there | MEASURED: a read of the loop in stageClarify.ts around that statement · the same collapse independently described in a landed source comment in entityDiagnosis.ts — two lenses, one written by this session and one already in the tree | collapse |
| | the carrier type has TWO states and cannot hold an ambiguity | MEASURED: a read of the type alias and of the map built on it | types |
| | the ask seam's own verdict type ALREADY has the third state, and its abstain branch cannot fire | MEASURED: a read of RefVerdict and of the branch keyed to it | types |
| | the disambiguator is dropped in TWO candidate mappings, not one | MEASURED: a read of both mapping expressions in stageClarify.ts | sites |
| | the tie is real, byte-identical in every readable field, and separable only by parent | RELAYED: the tie fence of PHASE-A23-ASK-SHAPE-DESIGN-1-AG4-report.md, read from master | tie |
| | the function both designs name as the edit site has NEVER existed in this repository | MEASURED: a working-tree grep · an index-based git grep · a history search with git log -S over all refs — three lenses of different kinds | designs |
| | whether the ambiguity should travel inside the carrier type or beside it | NOT-READ | ORDER B names the constraint and leaves the shape to you; both designs asserted an answer that their own premise cannot support |
| 
| ```evidence:anchor
| $ git ls-remote origin refs/heads/master
| b86850250cb3d845ff5be5edc425e3304e0dc72f
| ```
| 
| ```evidence:collapse
| PRODUCER — api/cwf/_lib/routing/resolveEntityRef.ts:66
|   the union's third member: kind 'ambiguous', carrying candidateEntityIds: readonly string[]
| minted at :232
|   return { kind: 'ambiguous', candidateEntityIds: ids };
| and the module's own header at :29 states the law it obeys:
|   "AMBIGUOUS IS REPORTED, NEVER GUESSED AMONG."
| 
| THE COLLAPSE — api/cwf/_lib/turn/stageClarify.ts:329
|   if (res.kind !== 'resolved') continue;
| Read the loop it sits in: at :321 every resolution is walked; at :326-327 a
| non-resolved ref is pushed into unresolvedList as a BARE SURFACE STRING; at
| :329 ambiguous and unresolved take the identical path. candidateEntityIds is
| never read. Nothing downstream can recover it.
| 
| SECOND LENS, ALREADY IN THE TREE — api/cwf/_lib/routing/entityDiagnosis.ts:36
| names the same statement as the collapse point, in a landed source comment,
| and says the abstain reason keyed to ambiguity "is a branch that cannot fire".
| This card did not discover that sentence; it reproduced it.
| ```
| 
| ```evidence:types
| CARRIER — api/cwf/_lib/routing/computeClarification.ts:52
|   export type EntityAliasLookupResult = { canonicalType: string; canonicalId: string } | 'unresolved';
|   export type AliasResolutionMap = ReadonlyMap<string, EntityAliasLookupResult>;
| TWO STATES. There is no member an ambiguity can land in.
| 
| CONSUMER — api/cwf/_lib/routing/askOnUnresolved.ts:180
|   export type RefVerdict = 'resolved' | 'unresolved' | 'ambiguous';
| THE TRIPLE, ready and unreachable. The abstain reason 'ambiguous-only' at :123
| and the test at :380-381 are a branch that cannot fire today.
| ```
| 
| ```evidence:sites
| THE DISAMBIGUATOR IS DROPPED TWICE, and the designs name only the first.
|   api/cwf/_lib/turn/stageClarify.ts:207-212   the DISCOVERED path
|       inScope.map((r) => ({ entityId, displayName, aliases, layerKey }))
|   api/cwf/_lib/turn/stageClarify.ts:256       the FLOOR degraded path
|       registryRows.map((r) => ({ entityId, displayName, layerKey }))
| Neither keeps a parent. A build that fixes only the first leaves the ask blind
| on the floor path, which is the degraded mode a user is most likely to meet.
| 
| THE PARENT EXISTS AND IS ALREADY CARRIED ELSEWHERE, so no new query is needed:
|   api/cwf/_lib/routing/entityKey.ts:76-79     parentLayerKey · parentEntityId
|   api/admin/graph-kb.ts:70 and :195           the same two, mapped from the row
| (The designs point at "RegistryCandidate in the replay lens" for this; that
| name did not resolve here and these two did. Use what you measure.)
| ```
| 
| ```evidence:tie
| RELAYED: the instrument fence of PHASE-A23-ASK-SHAPE-DESIGN-1-AG4-report.md, read
| from master at the anchor sha and NOT re-run by this card. The tied rows for the
| surface "Değirmen10", enumerated rather than counted:
|   - parent "GR & SFX Masse Hazırlık Fabrikası"
|   - parent "Yer Karosu Masse Hazırlık Fabrikası"
|   - parent "Sır Hazırlık - Çan"
| RELAYED: one distinct display_name across them; identical attrs; distance zero
| for every option.
|   "NAMING TEXT IS BYTE-IDENTICAL — no lexical ranker can separate these.
|    PARENT NAMES ARE ALL DISTINCT — the parent is sufficient to disambiguate."
| This is a real plant floor: the tenth mill exists in three preparation plants.
| IF YOU RE-RUN IT AND GET SOMETHING ELSE, that is the finding — report it.
| ```
| 
| ```evidence:designs
| THE PREMISE DEFECT, measured on three lenses of different kinds:
|   working-tree grep over *.ts        -> no hit
|   git grep over tracked content      -> no hit
|   git log -S over ALL refs, *.ts     -> no commit ever added or removed it
| 'resolveViaRegistry' exists in exactly two places in this repository, both of
| them PROSE: PHASE-A23-ASK-SHAPE-DESIGN-1-AG4-report.md:183 and
| PHASE-A23-THIRD-VALUE-DIAGNOSE-1-AG4-report.md:266.
| 
| CONSEQUENCE, and it is the one that changes the build: the ask-shape design says
| "AliasResolutionMap is NOT widened" and rests that on the discarded return of
| that function. Measured, nothing is discarded at a return — the ambiguity has
| NOWHERE TO LAND because the carrier type has two states. That sentence is
| therefore FALSE AS WRITTEN, and ORDER B replaces it with a constraint instead of
| an answer.
| ```
| 
| ## ORDER A — BUILD THE ASK, IN ONE BRANCH WITH ORDER B
| 
| Render an "I found several" ask that is distinguishable from "I found none" by a READER, not by a
| coder. The two messages are built on opposite assertions and that is what makes them tellable apart:
| **found-none asserts an absence and names no count; found-several asserts a presence and names the
| count first.**
| 
| The wording, the ordering of the options and the cap are **the owner's**, and he has been given one
| proposal for each. Build to the proposal; all three are constants and overruling any of them must not
| touch logic:
| 
| ```evidence:wording
| TR (authored — Turkish is the authored language, English is translated from it):
|   'Değirmen10' adıyla eşleşen 3 kayıt var. Hangisini kastettiniz?
|     1. GR & SFX Masse Hazırlık Fabrikası
|     2. Yer Karosu Masse Hazırlık Fabrikası
|     3. Sır Hazırlık - Çan
| 
| EN (translated):
|   There are 3 records matching 'Değirmen10'. Which one did you mean?
|     1. GR & SFX Masse Hazırlık Fabrikası
|     2. Yer Karosu Masse Hazırlık Fabrikası
|     3. Sır Hazırlık - Çan
| 
| ORDERING   by the rendered label, Turkish locale collation, ascending.
|            Deterministic and reproducible. NEVER by distance — for this tie every
|            distance is zero — and never by insertion order, which is unstable.
| CAP        five options rendered.
| THE COUNT IN THE FIRST SENTENCE IS ALWAYS THE TRUE TOTAL, never the number
| displayed. A truncated list under a truthful count is honest; a truncated count
| is the same class of lie this card exists to remove.
| ```
| 
| **The options are labelled by the DISAMBIGUATOR, never by the shared name** — labelling by the name
| renders the same string N times and asks the user to choose with nothing to choose on.
| 
| **The fallback ladder, and every rung must be reachable in code even where the substrate has not
| produced it:** (1) parent display name, `labelSource: 'parent'` — the measured case; (2) the layer
| key, `labelSource: 'layer'`; (3) the entity id with the sentence saying plainly that the records are
| otherwise identical, `labelSource: 'entity-id'`. Rung 3 is ugly and correct: a tie with no
| human-readable disambiguator is a DATA defect in the source system and the honest surface points at
| it. **Rung 2 and rung 3 are designed, not observed** — build them, and say in your report that you
| could not reach them from live data if you could not.
| 
| **On each outcome.** The user picks one: that option's `entityId` binds for the turn and the turn
| proceeds as though the reference had resolved to it — **the binding is to the id, never to the label**,
| because two plants can later be renamed to collide. The user picks none, answers something else, or
| says nothing: the turn does NOT force-fit and does NOT guess; it ends without an answer for that
| reference and records the abstention. Picking "the first" or "the nearest" is that guess wearing a
| ranking.
| 
| ## ORDER B — CARRY THE AMBIGUITY AND ITS DISAMBIGUATOR, AND THE SHAPE IS YOURS
| 
| Two things must reach the ask seam that do not reach it today. **The constraint is stated; the shape
| is your decision, because the designs' answer rests on the premise ORDER E refutes.**
| 
| **B1 · THE VERDICT.** The ambiguity minted at `resolveEntityRef.ts:232` must survive
| `stageClarify.ts:329` with its `candidateEntityIds` intact. The carrier is two-state, so exactly one
| of these is true and you decide which: the carrier gains a third state, or the ambiguity travels on a
| second channel beside it. **Whichever you choose, `computeClarification`'s counting behaviour must not
| change** — an ambiguous ref counts as not-resolvable exactly as it does today, and any change there
| would move the gate this phase is measured by.
| 
| **B2 · THE DISAMBIGUATOR.** Both candidate mappings in the `sites` fence must keep the parent. The
| parent columns are on the row already and two shapes in this repository already carry them; no new
| query and no migration.
| 
| **B3 · THE SEAM.** The ask decision gains a third kind so that found-none and found-several cannot be
| confused by a downstream reader, and the option carries the id that binds, the label that renders, and
| which rung of the ladder produced that label. The TRUE total travels with the options.
| 
| ## ORDER C — THE ORDERING CONSTRAINT IS A TEST, NOT A SENTENCE
| 
| The prose constraint is that the ask shape must exist before the carry-through lands, or the repair
| converts a badly-worded question into silence. **As a gate it is a conjunction over two facts a test
| can read:**
| 
| ```evidence:gate
| FACT A — can an ambiguous verdict reach the ask seam?
| FACT B — can the ask seam render "I found several" under an open valve?
| THE GATE: A implies B.
| ```
| 
| **Land both segments in ONE branch and assert the gate as a test.** One branch is what makes the
| constraint unviolatable by landing order; the test is what keeps it true after you leave.
| 
| ## ORDER D — THE ONE-LINE CHANGE THAT IS A FALSE ZERO IF YOU MISS IT
| 
| `askEvidenceOf` derives the shadow metric as `decision.kind === 'ask' && !valveOpen`. Adding a third
| asking kind leaves `wouldHaveAsked` FALSE for every ambiguous turn — the shadow read would under-count
| the exact class this phase creates, in the owner's own decision metric. **It must become true for BOTH
| asking kinds.** Named here because a reader skimming the type widening would not see it.
| 
| Also: `'ambiguous-only'` is NOT deleted. It remains the correct abstain reason when the valve is shut.
| Its retirement as an ASK-SUPPRESSING reason is recorded where its comment now stands, so the next
| reader learns why it changed rather than assuming nobody thought about it.
| 
| ## ORDER E — WHAT THE LANDED DESIGNS GOT WRONG, RECORDED RATHER THAN QUIETLY FIXED
| 
| ```evidence:priorerrors
| both designs  name 'resolveViaRegistry' as the edit site. MEASURED on three lenses:
|               it has never existed in this repository, in any ref, in any commit
| ask-shape     "AliasResolutionMap is NOT widened" — rests on that function's
|               discarded return. Nothing is discarded; the carrier is two-state and
|               the ambiguity has nowhere to land. FALSE AS WRITTEN
| ask-shape     names ONE candidate mapping that drops the parent. There are TWO,
|               and the second is the floor degraded path
| ask-shape     points at "RegistryCandidate in the replay lens" for the parent
|               columns; that name did not resolve. Two other shapes carry them
| ```
| 
| **IF YOU FIND ANOTHER, IT GOES IN YOUR REPORT.** The designs' substance is sound and this card is
| built on it; their route sentences are not, and you are entitled to know which is which.
| 
| ## FALSIFIER
| 
| This card is wrong if the collapse is not at the statement the `collapse` fence names. **Test that
| before you edit:** construct or find an ambiguous resolution, and show that its `candidateEntityIds`
| are unreachable at the ask seam today. If they are already reachable, STOP — the premise is dead and
| the report is the deliverable.
| 
| Second arm, and it is the one this card can cause: **a build that makes the system ask MORE often is
| not automatically a better system.** Report what your change does to the ask rate on the existing
| corpus, or say plainly that you did not measure it. An ask that fires where the old path resolved
| correctly is a regression wearing this phase's face.
| 
| ## SHARED SURFACES
| 
| `api/cwf/_lib/turn/stageClarify.ts` · `api/cwf/_lib/routing/askOnUnresolved.ts` ·
| `api/cwf/_lib/routing/computeClarification.ts` and their tests. You change no gate, no generator, no
| artifact under `docs/ground/`, no migration and no governed row. **No other lane holds these files
| today** — measured: no other branch in flight names them. If that changes, say so and stop.
| 
| ## DECISION RIGHTS
| 
| The owner decides the wording, the option ordering and the cap; one proposal for each is in the
| `wording` fence and overruling any of them changes a constant, never logic. The Architect decides that
| both segments land in one branch and that the gate is a test. **You decide the carrier shape in B1**,
| and that decision is not second-guessed here — it is the one the designs got wrong by asserting.
| 
| BODIES: `docs/laws/` · `CLAUDE.md` · `SOTA-1` (this item traces to TIER A · Gaia2) · `ADR-001`
| (grounding is deterministic code, never an LLM judge) · the two landed A23 design reports, read for
| substance and NOT for their route sentence · `TOTAL-45`.
| 
| fanout: personalized
| 
| Branch `phase/a23-ask-shape-build-1`. Push it to origin. Report to
| `docs/relay/PHASE-A23-ASK-SHAPE-BUILD-1-AG3-report.md`. Open a pull request against master so the
| checks run on the request head.
| 
| ```deliverables
| branch: phase/a23-ask-shape-build-1
| report: docs/relay/PHASE-A23-ASK-SHAPE-BUILD-1-AG3-report.md
| ```
| 
| TAIL ANCHOR: PHASE-A23-ASK-SHAPE-BUILD-1-v1 ends here.
```

TAIL ANCHOR: SCOUT-CARD-REVIEW-13-v1 ends here.
