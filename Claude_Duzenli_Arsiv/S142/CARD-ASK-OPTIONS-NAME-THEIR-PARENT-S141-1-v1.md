<!-- relay-audit: v1 kind=card -->
CARD-ASK-OPTIONS-NAME-THEIR-PARENT-S141-1-v1

LANE: AG-4
fanout: personalized
A PRODUCT-DEFECT card, cut on the owner's own screen (OWNER-WITNESS-S141-ASK-IS-USELESS-TO-A-HUMAN-1, his words: "gene BS gene anlamsiz stupid cevaplar"): `fırın son 7 gün duruşları` → "'fırın' adıyla eşleşen 6 kayıt var. Hangisini kastettiniz?" followed by FIRINALT · FIRINALT · FIRINALT · FIRINUST · FIRINUST. Five options, two distinct strings, six records claimed, the sixth never shown. The mechanism is correct (the surface IS ambiguous across three factories, the ask SHOULD fire) and the rendered question is unanswerable by a human. Two measured causes, two small repairs, one card. This sits in your box BEHIND CARD-LAND-579-S141-1-v1; land first, then this. Search made (§12.5): the S134 peer-scoping card and S140's collapse-to-parent (PR 572) and own-name-label (PR 575) cards are the history; none of them made a label UNIQUE within its option set, and none made truncation honest.

PRECONDITION: `origin/master` at or beyond the head in `the-head`; the two sites in `the-head` read as fenced. If the lines moved, YOUR reading wins; print both.

```evidence:the-head
master           db907a3424a65345c9a9c0fdde6be3c8e3c171dc   merge of PR 578, 2026-09-17T07:48:21Z, read from the shared clone's origin ref at 09:08:30Z (PR 579 may land before you start; its diff touches stageClarify.ts at other lines — rebase on whatever master is when you fork, and say which)
cause 1 (label)  api/cwf/_lib/turn/stageClarify.ts:2133 — the collapsed-ask branch labels every survivor `{ label: c.displayName, labelSource: 'self' }`; the general ladder at :258-282 (buildDisambiguators) labels a line by its PARENT alone ('parent') when the parent is resolvable, else own name, else layer key, else id — so one path shows three identical own-names and the other shows a factory name where the line is the choice. Parent names ARE resolvable at both sites: buildDisambiguators has `parentPool`; the collapsed branch has `candidateById` (EntityRegistryCandidate) and `parentage` (CandidateParentage, :717) on the same load
cause 2 (cap)    api/cwf/_lib/routing/askOnUnresolved.ts:572 `export const AMBIGUOUS_MAX_OPTIONS = 5;` and :911 the Turkish line `${quoted} adıyla eşleşen ${a.totalCount} kayıt var. Hangisini kastettiniz?` — totalCount 6 is printed, `options.slice(0, AMBIGUOUS_MAX_OPTIONS)` (:2233 and the collapsed path) hands the renderer 5, and nothing says so: partial ≠ complete (§2) at the one place a human is asked to choose
the live rows     entity_registry line rows FIRINALT and FIRINUST exist under KB7 · Granit · KB3 (the S134 `rows` fence; three FIRINUST rows measured then; the owner's screen today shows 3+2+1 = 6)
```

## PREMISE

MEASURED: both sites by `git show` at master over the shared clone, 2026-09-17T09:08:30Z; the constant at askOnUnresolved.ts:572; the Turkish template at :911.
MEASURED: the rendered ask on the owner's screen and on the Architect's (built-in browser, 07:26Z and ~09:05Z): five lines, two distinct labels, "6 kayıt".
UNMEASURED: whether EntityRegistryCandidate carries parent fields directly or only through `parentage`; ORDER 1 reads it and uses whichever the load already holds — no new read.
SELF-INVALIDATION: dies if master moves by a commit touching buildDisambiguators, the collapsed-ask branch, or askOnUnresolved's ambiguous renderer, or if a v2 appears.

## ORDERS

ORDER 1 - UNIQUE LABELS, PARENT-QUALIFIED. One pure function, `labelAmbiguousOptions(options, parentNameOf)`, in the routing layer beside `AMBIGUOUS_MAX_OPTIONS`: given the option set for ONE surface, every option's label is its OWN display name; when two or more options in the set share the same own name, EVERY option in the set that has a resolvable parent name is rendered `<own name> · <parent name>` (e.g. `FIRINALT · KB7`), labelSource `'self+parent'`; an option whose parent cannot be named keeps its own name and the set is still emitted (never dropped — empty ≠ zero). Apply it at BOTH sites in `the-head` (the collapsed branch and buildDisambiguators' consumers), so no rendered ask ever carries two identical labels. The general ladder's 'parent'-only label for a line is RETIRED — a line is named by itself, qualified by its parent; a parentless layer (factory) stays own-name (PR 575's rule holds).

ORDER 2 - HONEST TRUNCATION. When `totalCount > AMBIGUOUS_MAX_OPTIONS`, the renderer says so in both languages — tr: `'<surface>' adıyla eşleşen <M> kayıt var; ilk <N> gösteriliyor. Hangisini kastettiniz? (Fabrika adıyla daraltabilirsiniz.)`, en equivalent — and the ask carries `truncated: true` in its payload so the trace shows it. Do NOT raise the constant to hide the case; the cap stays 5 and the sentence tells the truth. If `totalCount ≤ AMBIGUOUS_MAX_OPTIONS` the wording is unchanged byte-for-byte (existing tests pin it).

ORDER 3 - TESTS FIRST, THEN THE FIX. A failing test that encodes the owner's screen: six line candidates named FIRINALT×3 / FIRINUST×2 / one more, parents KB7 · Granit · KB3, no resolved factory peer → the rendered options are all distinct strings, each of the form `<name> · <factory>`, and the message names the truncation. A second test: two candidates with distinct own names → labels unchanged, no parent suffix (no regression on the "Değirmen10" and "Fırın ×2" pins at stageClarify.test.ts:1145/:1313 — read them, they must still pass unchanged). A third: a candidate with an unnameable parent keeps its own name and is not dropped.

ORDER 4 - GATES. `npm run build` (five gates by name, §8) and `vitest` — each with its exit. check:doc-drift: stageClarify.ts and askOnUnresolved.ts are mapped; reseal the manifest in the SAME commit as the code (the lesson of PR 579's second red).

ORDER 5 - SHIP. Push; PR titled `PHASE-ASK-OPTIONS-NAME-THEIR-PARENT-S141-1: no two identical labels, and a truncated ask says so`; slip with the forty-hex head and CI as you read it; report `docs/relay/ASK-OPTIONS-NAME-THEIR-PARENT-S141-1-AG4-report.md` on the same branch. Thirty minutes from green to a slip (§12.8). The foreman lands it (author AG-4, lander AG-5 — the ordinary seam).

## FALSIFIER

If the parent name is NOT resolvable at the collapsed-ask site from what the load already holds, STOP and print what the candidate carries — do not add a registry read on the ask path. If any existing ask-shape test needs its expected STRING changed for a non-truncated, non-colliding case, STOP and print the diff — that would be a behaviour change this card did not order.

## SHARED SURFACES

```scope
- api/cwf/_lib/routing/askOnUnresolved.ts (labelAmbiguousOptions, truncation sentence, `truncated` on the ask payload)
- api/cwf/_lib/turn/stageClarify.ts (:258-282 buildDisambiguators consumers, :2133 collapsed branch — call the labeller)
- api/cwf/_lib/routing/__tests__/askAmbiguousShape.test.ts (+ the three cases)
- api/cwf/__tests__/stageClarify.test.ts (only if a pin must be READ; not changed)
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
| parent names resolvable at both sites without a new read | MEASURED: parentPool at :258-282, `parentage` on the load at :717 | the-head |
| whether EntityRegistryCandidate carries the parent directly | NOT-READ | ORDER 1 reads it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if master moves by a commit touching buildDisambiguators, the collapsed-ask branch, or askOnUnresolved's ambiguous renderer, or if a v2 appears.
