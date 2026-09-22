<!-- relay-audit: v1 kind=card -->
CARD-ASK-OPTIONS-NAME-THEIR-PARENT-S141-1-v4

LANE: AG-4
fanout: personalized
A PRODUCT-DEFECT card, cut on the owner's own screen (OWNER-WITNESS-S141-ASK-IS-USELESS-TO-A-HUMAN-1, his words: "gene BS gene anlamsiz stupid cevaplar"): `fırın son 7 gün duruşları` → "'fırın' adıyla eşleşen 6 kayıt var. Hangisini kastettiniz?" followed by FIRINALT · FIRINALT · FIRINALT · FIRINUST · FIRINUST. Five options, two distinct strings, six records claimed, the sixth never shown. The mechanism is correct (the surface IS ambiguous across three factories, the ask SHOULD fire) and the rendered question is unanswerable by a human. Two measured causes, two small repairs, one card — plus a third guard the owner's session exposed after v1 was cut (ORDER 1b). v4 SUPERSEDES v3 on AG-4's STOP (its from_lane slip of 11:06:46Z, artifact_name ending `-STOPPED`, id in `raw-tokens`): retiring the ladder's 'parent' rung changes THREE MORE pins in stageClarify.test.ts (:289-290 same-named lines under three plants; :372-373 DISTINCT-named cameras under two lines, where 'parent' is kept FIRST on purpose) — AG-4 proposed the narrower ORDER 1 and it is adopted: the ladder is NOT touched; only a set whose rendered labels COLLIDE gets qualified. Under that rule the :1150, :289-290 and :372-373 pins are UNCHANGED (each of those sets renders distinct labels already) and the only sites that change are the ones that render duplicates — the owner's screen. v3 SUPERSEDED v2 on two measured edits — a CP-3 grammar refusal from the bridge preflight (a parenthetical broke the `MEASURED:` prefix) and the scout's GREEN-with-shape on v2 (ORDER 1b as v2 worded it is not implementable without widening matchShownOption's return type; the scout named the smallest shape, adopted below). ADVERSARY GATE LIFTED BY NAME for v3 under §12.1 (a card that REPEATS the subject of a superseded card, the loop-breaking case) and OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1: v2's GREEN (the scout's verdict row of 10:37:14Z, id in `raw-tokens`) covers every line v3 carries except the two edits it ordered. v2 SUPERSEDED v1 on the scout's RED (discriminators 3 and 5, both adopted verbatim: the :1150 pin is named as superseded, the fixture is synthetic) and on its NOTE (2): the parent NAME at the collapsed site comes from `disambiguators` on the same load, not from `candidateById`/`parentage`, which carry ids only. This sits in your box BEHIND CARD-LAND-RULING-SEAM-S141-1-v1; seam first, then this. Search made (§12.5): the S134 peer-scoping card and S140's collapse-to-parent (PR 572) and own-name-label (PR 575) cards are the history; none of them made a label UNIQUE within its option set, and none made truncation honest.

PRECONDITION: `origin/master` at or beyond the head in `the-head`; the two sites in `the-head` read as fenced. If the lines moved, YOUR reading wins; print both.

```evidence:the-head
master           db907a3424a65345c9a9c0fdde6be3c8e3c171dc   merge of PR 578, 2026-09-17T07:48:21Z, read from the shared clone's origin ref at 09:08:30Z and re-read unchanged at 09:39Z (PR 579 may land before you start; its diff touches stageClarify.ts at other lines — rebase on whatever master is when you fork, and say which)
cause 1 (label)  api/cwf/_lib/turn/stageClarify.ts:2133 — the collapsed-ask branch labels every survivor `{ label: c.displayName, labelSource: 'self' }`; the general ladder at :258-282 (buildDisambiguators) labels a line by its PARENT alone ('parent') when the parent is resolvable, else own name, else layer key, else id — so one path shows three identical own-names and the other shows a factory name where the line is the choice. Parent NAMES are in hand at both sites without a new read — but NOT where v1 said: `EntityRegistryCandidate` (resolveEntityRef.ts:54-59) and `CandidateParentage` (:292-295) carry IDS only. The name comes from the ladder's own output: loadEntityCandidates (:717) returns `disambiguators: buildDisambiguators(rows, rows)` (:822/:902/:962, parentPool IS the loaded rows) and the collapsed branch already holds `disambiguators` in scope (:2135, the else-arm) — `disambiguators.get(id)` yields the parent display name whenever the parent row is in the load, which the collapse-to-parent path guarantees (:2128). ORDER 1 (v4, narrow) retires NO rung; the labeller needs a parent NAME only for options whose labels collide, and takes it from `disambiguators.get(id)` at the collapsed site and from `parentPool` inside the ladder (the scout's NOTE 2)
cause 2 (cap)    api/cwf/_lib/routing/askOnUnresolved.ts:572 `export const AMBIGUOUS_MAX_OPTIONS = 5;` and :911 the Turkish line `${quoted} adıyla eşleşen ${a.totalCount} kayıt var. Hangisini kastettiniz?` — totalCount 6 is printed, `options.slice(0, AMBIGUOUS_MAX_OPTIONS)` (:2233 and the collapsed path) hands the renderer 5, and nothing says so: partial ≠ complete (§2) at the one place a human is asked to choose
the live rows     the owner's screen shows six same-surface line rows under three parents (3 + 2 + 1); the names are on the bus already and stay OUT of every tracked file this card produces (the CI Tenant-zero gate scans tests and docs/relay)
cause 3 (match)   api/cwf/_lib/turn/stageClarify.ts:531-542 `matchShownOption(message, ask): { entityId, label } | null` — ONE production call site, :575 `askOption: matchShownOption(message, row.decision?.ask ?? null)` inside readCarriedResolution; consumers compare against `null` at :482 and :520. The reply is matched against the shown options by folded label and the FIRST match wins; with two identical labels the user's pick of the second is silently the first (the owner's turn 2, `FIRINUST`: optionRefs carried the first FIRINUST, the model then confabulated a "KB7 default" rule that exists nowhere in code or domain_rules — F-S141-CARRIED-OPTION-MATCH-PICKS-FIRST-OF-IDENTICAL-LABELS-1, F-S141-MODEL-CONFABULATES-A-DEFAULT-FACTORY-RULE-1)
```

## PREMISE

MEASURED: both sites by `git show` at master over the shared clone, 2026-09-17T09:08:30Z; the constant at askOnUnresolved.ts:572; the Turkish template at :911.
MEASURED: the rendered ask on the owner's screen and on the Architect's (built-in browser, 07:26Z and ~09:05Z): five lines, two distinct labels, "6 kayıt".
MEASURED: the scout's git show at master, 09:16Z — EntityRegistryCandidate and CandidateParentage carry ids only; the parent name is reachable through `disambiguators` on the same load.
MEASURED: the scout's print at 09:16Z — stageClarify.test.ts:1150 pins `1. GR & SFX Masse Hazırlık Fabrikası` on the TIED_MIRROR fixture (:1126-1131, three same-named mills under three plants); :1313/:1315 pin two DISTINCT names.
MEASURED: AG-4's slip at 11:06:46Z — :289-290 pins labels ['Masse','Masse_YK','Sir'] with labelSource 'parent'; :372-373 pins ['North Wing','South Wing'] with labelSource 'parent' (distinct cameras under two lines); both would change under a rung retirement and are UNCHANGED under the narrow ORDER 1.
SELF-INVALIDATION: dies if master moves by a commit touching buildDisambiguators, the collapsed-ask branch, or askOnUnresolved's ambiguous renderer, or if a v5 appears.

## ORDERS

ORDER 1 - NO TWO IDENTICAL LABELS IN ONE SET (narrow, AG-4's shape). One pure function, `labelAmbiguousOptions(options, parentNameOf)`, in the routing layer beside `AMBIGUOUS_MAX_OPTIONS`: given the option set for ONE surface AS THE LADDER ALREADY LABELLED IT, if every rendered label in the set is distinct, the set is returned UNCHANGED (labels, labelSource, order — byte-identical). Only when two or more options in the set carry the SAME rendered label are THOSE colliding options re-rendered `<own display name> · <parent name>` (e.g. `FIRINALT · KB7`), labelSource `'self+parent'`; a colliding option whose parent cannot be named keeps its current label and is never dropped (empty ≠ zero); if after qualification two labels are STILL identical (same name, same parent) they stay as they are — the truncation sentence and the entity ids carry the difference. The ladder at :258-282 is NOT changed: no rung retired, 'parent' stays first where it is today (the KILN-TOP purpose, :372-373). Apply the labeller at BOTH sites in `the-head` (the collapsed branch :2133, which today labels every survivor by own name and is where the owner's duplicates come from, and the ladder's consumer before the options are sliced). `parentNameOf` is fed from `disambiguators.get(id)` at the collapsed site and from `parentPool` inside buildDisambiguators — no new read on the ask path.

ORDER 1b - NO FIRST-MATCH ON IDENTICAL LABELS (the scout's shape, 10:37Z). `matchShownOption` (:531-542) KEEPS its return type `{ entityId, label } | null` and returns `null` when the reply matches TWO OR MORE shown options by folded label — no pick; the caller re-asks exactly as it does for no match (injectedRefFor :520 and carriedNothing at :482 compare against `null`; the A4 pins in carryLastResolution.test.ts stay byte-identical, their fixture has distinct labels). The REASON rides as an ADDITIVE field on CarriedResolution set at :575 — `askMatch: 'matched' | 'none' | 'ambiguous-label' | 'unread'` — computed by a sibling exported helper (`matchShownOptionDetailed(message, ask)`, which :575 alone calls and which matchShownOption wraps). Tests: identical labels + reply equal to that label → `matchShownOption` null and `askMatch 'ambiguous-label'`; distinct labels → the existing pick, byte-identical, `askMatch 'matched'`. EXPECTED FIXTURE CHANGE, named so the FALSIFIER does not stop you: the exact-equality `ctx.carried` pins in carryLastResolution.test.ts gain the one key `askMatch` (the shape PR 576 already went through) — that is the ONLY change permitted there; no expected STRING changes.

ORDER 2 - HONEST TRUNCATION. When `totalCount > AMBIGUOUS_MAX_OPTIONS`, the renderer says so in both languages — tr: `'<surface>' adıyla eşleşen <M> kayıt var; ilk <N> gösteriliyor. Hangisini kastettiniz? (Fabrika adıyla daraltabilirsiniz.)`, en equivalent — and the ask carries `truncated: true` in its payload so the trace shows it. Do NOT raise the constant to hide the case; the cap stays 5 and the sentence tells the truth. If `totalCount ≤ AMBIGUOUS_MAX_OPTIONS` the wording is unchanged byte-for-byte (existing tests pin it).

ORDER 3 - TESTS FIRST, THEN THE FIX. A failing test that encodes the SHAPE of the owner's screen with SYNTHETIC names (the SYNTH-F1 / 'Synthetic Kiln Line' convention of toolArgPolicySeed.test.ts — no live line, plant or factory name in any tracked file; the CI Tenant-zero gate scans tests and docs/relay): six line candidates, 3 + 2 + 1 same-named under three synthetic parents, no resolved factory peer → the rendered options are all distinct strings, each of the form `<name> · <parent>`, and the message names the truncation. A second test: two candidates with distinct own names → labels unchanged, no parent suffix. A third: a candidate with an unnameable parent keeps its own name and is not dropped. PINS, all UNCHANGED under the narrow ORDER 1 and this card orders you to prove it by running them: stageClarify.test.ts:289-290 (three same-named lines, three distinct parent labels — no collision), :372-373 (distinct cameras labelled by parent — no collision), :1150 (TIED_MIRROR, three distinct plant labels — no collision), :1313/:1315 (two distinct names). If ANY existing expected string must change, STOP and print it — that means the labeller touched a non-colliding set, which is the bug.

ORDER 4 - GATES. `npm run build` (five gates by name, §8) and `vitest` — each with its exit. check:doc-drift: stageClarify.ts and askOnUnresolved.ts are mapped; reseal the manifest in the SAME commit as the code (the lesson of PR 579's second red).

ORDER 5 - SHIP. Push; PR titled `PHASE-ASK-OPTIONS-NAME-THEIR-PARENT-S141-1: no two identical labels, and a truncated ask says so`; slip with the forty-hex head and CI as you read it; report `docs/relay/ASK-OPTIONS-NAME-THEIR-PARENT-S141-1-AG4-report.md` on the same branch. Thirty minutes from green to a slip (§12.8). The foreman lands it (author AG-4, lander AG-5 — the ordinary seam).

## FALSIFIER

If the parent name is NOT reachable at the collapsed-ask site through `disambiguators` on the load already in scope, STOP and print what is in scope — do not add a registry read on the ask path. If ANY existing test needs its expected STRING changed, or any carryLastResolution.test.ts pin needs more than the additive `askMatch` key, STOP and print the diff — that would be a behaviour change this card did not order. If the fixture cannot be written without a live name, STOP.

## SHARED SURFACES

```scope
- api/cwf/_lib/routing/askOnUnresolved.ts (labelAmbiguousOptions, truncation sentence, `truncated` on the ask payload)
- api/cwf/_lib/turn/stageClarify.ts (the ladder's consumer — call the labeller before the slice, rungs untouched; :2133 collapsed branch — call the labeller; :531 matchShownOption — no first-match on identical labels)
- api/cwf/_lib/routing/__tests__/askAmbiguousShape.test.ts (+ the three cases)
- api/cwf/__tests__/stageClarify.test.ts (READ and RUN; not changed)
- api/cwf/_lib/turn/__tests__/carryLastResolution.test.ts (the ORDER 1b cases; exact-equality carried pins gain `askMatch` only)
- public/architecture/manifest.json (reseal, same commit)
- docs/relay/ASK-OPTIONS-NAME-THEIR-PARENT-S141-1-AG4-report.md (new)
```

No migration, no governed row, no valve, no master push, no change to AMBIGUOUS_MAX_OPTIONS's value, no new database read on the ask path.

## DECISION RIGHTS

You choose the separator glyph and the exact English sentence; print both in the report. You may refuse on evidence this card did not anticipate.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the two sites and the constant, by line | MEASURED: git show at master over the shared clone, 2026-09-17T09:08:30Z | the-head |
| the rendered ask: five lines, two labels, six claimed | MEASURED: the owner's screen and the Architect's built-in browser, 07:26Z and ~09:05Z | the-head |
| parent names reachable at both sites without a new read | MEASURED: the scout's read of :717/:822/:902/:962/:2135 and resolveEntityRef.ts:54-59, 09:16Z | the-head |
| the :1150 pin collides; :1313 does not | MEASURED: the scout's print of stageClarify.test.ts:1112-1131, :1150, :1313-1315 | the-head |
| :289-290 and :372-373 pin parent-first labels | MEASURED: AG-4's slip, 11:06:46Z, quoting master | the-head |
| first-match at :531 | MEASURED: git show at master, 09:30Z (the Architect's read of the owner's session, turn 2) | the-head |
| :531-542 signature, the one production call site :575, the null-testing consumers :482/:520, the A4 pins | MEASURED: the scout's print at master, 10:37Z | the-head |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if master moves by a commit touching buildDisambiguators, the collapsed-ask branch, matchShownOption, or askOnUnresolved's ambiguous renderer, or if a v5 appears.

```evidence:raw-tokens
scout GREEN on v2   73f161f6-a502-4881-acb6-ad8a2b7f00f2   10:37:14Z
scout RED on v1     442ae938   09:16Z
scout GREEN on v3   abfea92f-a6af-44b8-9a69-272c3f4d7c1b   11:00:54Z
AG-4 STOP on v3     530a33f4-57af-44ec-8551-4a212ad8c1ac   11:06:46Z
v2 bytes            f498266991f7ecfcf5a4eca69492e5c8   12180 bytes
```
