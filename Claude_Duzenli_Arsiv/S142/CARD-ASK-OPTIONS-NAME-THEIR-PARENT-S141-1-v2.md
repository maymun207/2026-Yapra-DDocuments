<!-- relay-audit: v1 kind=card -->
CARD-ASK-OPTIONS-NAME-THEIR-PARENT-S141-1-v2

LANE: AG-4
fanout: personalized
A PRODUCT-DEFECT card, cut on the owner's own screen (OWNER-WITNESS-S141-ASK-IS-USELESS-TO-A-HUMAN-1, his words: "gene BS gene anlamsiz stupid cevaplar"): `fırın son 7 gün duruşları` → "'fırın' adıyla eşleşen 6 kayıt var. Hangisini kastettiniz?" followed by FIRINALT · FIRINALT · FIRINALT · FIRINUST · FIRINUST. Five options, two distinct strings, six records claimed, the sixth never shown. The mechanism is correct (the surface IS ambiguous across three factories, the ask SHOULD fire) and the rendered question is unanswerable by a human. Two measured causes, two small repairs, one card — plus a third guard the owner's session exposed after v1 was cut (ORDER 1b). v2 SUPERSEDES v1 on the scout's RED (discriminators 3 and 5, both adopted verbatim: the :1150 pin is named as superseded, the fixture is synthetic) and on its NOTE (2): the parent NAME at the collapsed site comes from `disambiguators` on the same load, not from `candidateById`/`parentage`, which carry ids only. This sits in your box BEHIND CARD-LAND-RULING-SEAM-S141-1-v1; seam first, then this. Search made (§12.5): the S134 peer-scoping card and S140's collapse-to-parent (PR 572) and own-name-label (PR 575) cards are the history; none of them made a label UNIQUE within its option set, and none made truncation honest.

PRECONDITION: `origin/master` at or beyond the head in `the-head`; the two sites in `the-head` read as fenced. If the lines moved, YOUR reading wins; print both.

```evidence:the-head
master           db907a3424a65345c9a9c0fdde6be3c8e3c171dc   merge of PR 578, 2026-09-17T07:48:21Z, read from the shared clone's origin ref at 09:08:30Z and re-read unchanged at 09:39Z (PR 579 may land before you start; its diff touches stageClarify.ts at other lines — rebase on whatever master is when you fork, and say which)
cause 1 (label)  api/cwf/_lib/turn/stageClarify.ts:2133 — the collapsed-ask branch labels every survivor `{ label: c.displayName, labelSource: 'self' }`; the general ladder at :258-282 (buildDisambiguators) labels a line by its PARENT alone ('parent') when the parent is resolvable, else own name, else layer key, else id — so one path shows three identical own-names and the other shows a factory name where the line is the choice. Parent NAMES are in hand at both sites without a new read — but NOT where v1 said: `EntityRegistryCandidate` (resolveEntityRef.ts:54-59) and `CandidateParentage` (:292-295) carry IDS only. The name comes from the ladder's own output: loadEntityCandidates (:717) returns `disambiguators: buildDisambiguators(rows, rows)` (:822/:902/:962, parentPool IS the loaded rows) and the collapsed branch already holds `disambiguators` in scope (:2135, the else-arm) — `disambiguators.get(id)` yields the parent display name whenever the parent row is in the load, which the collapse-to-parent path guarantees (:2128). Because ORDER 1 retires the 'parent' LABEL, the ladder must keep emitting the parent name as its own field (`parentName` beside `label`) or the collapsed site loses the name it needs (the scout's NOTE 2)
cause 2 (cap)    api/cwf/_lib/routing/askOnUnresolved.ts:572 `export const AMBIGUOUS_MAX_OPTIONS = 5;` and :911 the Turkish line `${quoted} adıyla eşleşen ${a.totalCount} kayıt var. Hangisini kastettiniz?` — totalCount 6 is printed, `options.slice(0, AMBIGUOUS_MAX_OPTIONS)` (:2233 and the collapsed path) hands the renderer 5, and nothing says so: partial ≠ complete (§2) at the one place a human is asked to choose
the live rows     the owner's screen shows six same-surface line rows under three parents (3 + 2 + 1); the names are on the bus already and stay OUT of every tracked file this card produces (the CI Tenant-zero gate scans tests and docs/relay)
cause 3 (match)   api/cwf/_lib/turn/stageClarify.ts:531 `matchShownOption` — the reply is matched against the shown options by folded label and the FIRST match wins; with two identical labels the user's pick of the second is silently the first (the owner's turn 2, `FIRINUST`: optionRefs carried the first FIRINUST, the model then confabulated a "KB7 default" rule that exists nowhere in code or domain_rules — F-S141-CARRIED-OPTION-MATCH-PICKS-FIRST-OF-IDENTICAL-LABELS-1, F-S141-MODEL-CONFABULATES-A-DEFAULT-FACTORY-RULE-1)
```

## PREMISE

MEASURED: both sites by `git show` at master over the shared clone, 2026-09-17T09:08:30Z; the constant at askOnUnresolved.ts:572; the Turkish template at :911.
MEASURED: the rendered ask on the owner's screen and on the Architect's (built-in browser, 07:26Z and ~09:05Z): five lines, two distinct labels, "6 kayıt".
MEASURED (by the scout, 09:16Z): EntityRegistryCandidate and CandidateParentage carry ids only; the parent name is reachable through `disambiguators` on the same load. MEASURED (by the scout): stageClarify.test.ts:1150 pins `1. GR & SFX Masse Hazırlık Fabrikası` on the TIED_MIRROR fixture (:1126-1131, three same-named mills under three plants) — a colliding-own-name case that ORDER 1 changes by construction; :1313/:1315 pin two DISTINCT names and are untouched.
SELF-INVALIDATION: dies if master moves by a commit touching buildDisambiguators, the collapsed-ask branch, or askOnUnresolved's ambiguous renderer, or if a v3 appears.

## ORDERS

ORDER 1 - UNIQUE LABELS, PARENT-QUALIFIED. One pure function, `labelAmbiguousOptions(options, parentNameOf)`, in the routing layer beside `AMBIGUOUS_MAX_OPTIONS`: given the option set for ONE surface, every option's label is its OWN display name; when two or more options in the set share the same own name, EVERY option in the set that has a resolvable parent name is rendered `<own name> · <parent name>` (e.g. `FIRINALT · KB7`), labelSource `'self+parent'`; an option whose parent cannot be named keeps its own name and the set is still emitted (never dropped — empty ≠ zero). Apply it at BOTH sites in `the-head` (the collapsed branch and buildDisambiguators' consumers), so no rendered ask ever carries two identical labels. The general ladder's 'parent'-only label for a line is RETIRED — a line is named by itself, qualified by its parent; a parentless layer (factory) stays own-name (PR 575's rule holds). The ladder KEEPS the parent name as its own field, `parentName`, on every AmbiguousOption it emits (null when unnameable), and the collapsed branch reads it from `disambiguators.get(id)` — no new read on the ask path.

ORDER 1b - NO FIRST-MATCH ON IDENTICAL LABELS. In `matchShownOption` (:531): when the reply matches TWO OR MORE shown options by folded label, the match is NOT the first — it is `undefined` with a reason `'ambiguous-label'`, and the caller re-asks with the parent-qualified labels of ORDER 1 (which makes this branch unreachable for new asks and a guard for asks rendered before this lands). A test: two options with identical labels, reply equal to that label → no pick, reason `'ambiguous-label'`; two options with distinct labels → the existing behaviour, byte-identical.

ORDER 2 - HONEST TRUNCATION. When `totalCount > AMBIGUOUS_MAX_OPTIONS`, the renderer says so in both languages — tr: `'<surface>' adıyla eşleşen <M> kayıt var; ilk <N> gösteriliyor. Hangisini kastettiniz? (Fabrika adıyla daraltabilirsiniz.)`, en equivalent — and the ask carries `truncated: true` in its payload so the trace shows it. Do NOT raise the constant to hide the case; the cap stays 5 and the sentence tells the truth. If `totalCount ≤ AMBIGUOUS_MAX_OPTIONS` the wording is unchanged byte-for-byte (existing tests pin it).

ORDER 3 - TESTS FIRST, THEN THE FIX. A failing test that encodes the SHAPE of the owner's screen with SYNTHETIC names (the SYNTH-F1 / 'Synthetic Kiln Line' convention of toolArgPolicySeed.test.ts — no live line, plant or factory name in any tracked file; the CI Tenant-zero gate scans tests and docs/relay): six line candidates, 3 + 2 + 1 same-named under three synthetic parents, no resolved factory peer → the rendered options are all distinct strings, each of the form `<name> · <parent>`, and the message names the truncation. A second test: two candidates with distinct own names → labels unchanged, no parent suffix. A third: a candidate with an unnameable parent keeps its own name and is not dropped. PINS: stageClarify.test.ts:1313/:1315 (two distinct names, `totalCount 2`) must pass UNCHANGED. stageClarify.test.ts:1150 — `toContain('1. GR & SFX Masse Hazırlık Fabrikası')` on the TIED_MIRROR fixture, whose describe header (:1112-1113) says only the parent separates the three — is the ONE pin this card deliberately SUPERSEDES: its new expected string is `1. Değirmen10 · GR & SFX Masse Hazırlık Fabrikası` (own name, then parent), and the header sentence is updated to say so. No other expected string changes; the FALSIFIER holds for every other case.

ORDER 4 - GATES. `npm run build` (five gates by name, §8) and `vitest` — each with its exit. check:doc-drift: stageClarify.ts and askOnUnresolved.ts are mapped; reseal the manifest in the SAME commit as the code (the lesson of PR 579's second red).

ORDER 5 - SHIP. Push; PR titled `PHASE-ASK-OPTIONS-NAME-THEIR-PARENT-S141-1: no two identical labels, and a truncated ask says so`; slip with the forty-hex head and CI as you read it; report `docs/relay/ASK-OPTIONS-NAME-THEIR-PARENT-S141-1-AG4-report.md` on the same branch. Thirty minutes from green to a slip (§12.8). The foreman lands it (author AG-4, lander AG-5 — the ordinary seam).

## FALSIFIER

If the parent name is NOT reachable at the collapsed-ask site through `disambiguators` on the load already in scope, STOP and print what is in scope — do not add a registry read on the ask path. If any existing test other than stageClarify.test.ts:1150 (and its :1112-1113 header) needs its expected STRING changed, STOP and print the diff — that would be a behaviour change this card did not order. If the fixture cannot be written without a live name, STOP.

## SHARED SURFACES

```scope
- api/cwf/_lib/routing/askOnUnresolved.ts (labelAmbiguousOptions, truncation sentence, `truncated` on the ask payload)
- api/cwf/_lib/turn/stageClarify.ts (:258-282 buildDisambiguators — `parentName` field; :2133 collapsed branch — call the labeller; :531 matchShownOption — no first-match on identical labels)
- api/cwf/_lib/routing/__tests__/askAmbiguousShape.test.ts (+ the three cases)
- api/cwf/__tests__/stageClarify.test.ts (ONLY :1150's expected string and the :1112-1113 header; plus the ORDER 1b test if it lives here)
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
| first-match at :531 | MEASURED: git show at master, 09:30Z (the Architect's read of the owner's session, turn 2) | the-head |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if master moves by a commit touching buildDisambiguators, the collapsed-ask branch, matchShownOption, or askOnUnresolved's ambiguous renderer, or if a v3 appears.
