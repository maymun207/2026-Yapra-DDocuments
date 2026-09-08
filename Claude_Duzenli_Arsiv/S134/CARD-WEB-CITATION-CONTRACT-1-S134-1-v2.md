<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-WEB-CITATION-CONTRACT-1-S134-1 · v2 — build the citation signal the valve's contract has never had, against a labelled fixture corpus
lane: AG-4
report: docs/relay/WEB-CITATION-CONTRACT-1-S134-1-AG4-report.md
fanout: personalized

THIS CARD DOES NOT REPAIR A DEFECT IN LANDED CODE. It builds a signal that has never existed. Twelve versions of `CARD-WEB-VALVE-1-S132-1` and their amendments 26 through 43 argued about a marker's wording; the marker was never written, and the argument was about a design, not a product. That is the S133 lesson applied forward rather than repeated (A-REC-S133-6).

THE DESIGN CHANGE THAT DISSOLVES THE ARGUMENT, and it is this card's whole point: THE TURN'S OWN TOOL LEDGER ALREADY CARRIES THE EXACT STRINGS THE ANSWER MUST CITE. `web_fetch` returns `url` and `fetchedAt` as literal values. The signal therefore matches THOSE LITERALS out of the meta, and never a date grammar, a month name, or a language marker. The English words "smart" and "Walmart" cannot fire it, because nothing resembling a marker is searched for at all. AMENDMENT 43's bug is not fixed here — it is made unbuildable.

THE ADVERSARY GATE IS LIFTED FOR THIS CARD, NAMED AND NOT SILENT, citing `OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1`. v1 of this card held itself behind a review round nobody had scheduled. The owner's instruction is that this factory's focus is CODE COMPLETION and moving master forward, and product code parked behind an unscheduled gate is exactly the loop that ruling stops wherever it is seen. The judge here is the fixture corpus and CI, not a scout's prose. There is no RELEASE row to wait for: begin at ORDER A.

NO MASTER PUSH IS ASKED FOR AND NONE MAY BE TAKEN. You branch, you commit, you open a pull request, and you leave it open.

## PREMISE
- MEASURED: 2026-09-08T12:52Z — `uncited_external` does not occur on `origin/master` nor on any remote-tracking ref in the owner's clone. Second lens, differing in ASSUMPTION rather than mechanism: the bare word `uncited`, case-insensitive, over the whole tree, returns five files and every one of them is the SCOPE-HONEST-1 procedure-kind chip, an unrelated subject. Anchor `absence`.
- MEASURED: 2026-09-08T12:55Z — `api/cwf/_lib/turn/landingSignals.ts` exports `LandingSignals` and `deriveLandingSignals({ finalText, persistRaw, reachClasses })`, and its two existing gates already carry the four-member and three-member silence vocabularies this card reuses. Anchor `home`.
- MEASURED: 2026-09-08T12:47Z — `api/cwf/_lib/webTools.ts` on master returns `url`, `finalUrl`, `fetchedAt`, `bodySha256`, `truncated`, `verified` and `source` on the success shape, and its tool description instructs the model to cite `url` and `fetchedAt`. That instruction is the WHOLE of the contract today: nothing verifies it. Anchor `meta`.
- MEASURED: 2026-09-08T12:55Z — a labelled fixture corpus is an existing shape in this repository, not an invention of this card: `api/cwf/__tests__/fixtures/harness-honesty/corpus.ts`. Anchor `precedent`.
- MEASURED: 2026-09-08T11:28Z — the valve is CLOSED on master: `web.enabled` declares value 0, min 0, max 1, sessionTweakable false. This card does not open it and no order below requires a live fetch. Anchor `valve`.
- UNMEASURED: how many shapes of lawful citation a real Turkish or English answer takes. The fixture corpus is the instrument that answers it, and the corpus is this card's product.
- ON-DISAGREEMENT: if any fixture you write to be LAWFUL raises the signal, STOP. A signal that fires on a lawful turn is worse than no signal, and the repair is the signal's rule, never the fixture. Quote the fixture and the rule unanchored and open the pull request with the failing test present and named.
- DECAYS when the report this card asks for is pushed, or when a v3 of this card appears.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| no citation signal exists in the repository, read by two lenses that differ in assumption | MEASURED: `git grep -I "uncited_external"` over master and every remote-tracking ref · MEASURED: `git grep -I -i "uncited"` over the whole tree with each of the five hits read to its subject | absence |
| the module the signal belongs in, and the vocabularies it reuses | MEASURED: `git cat-file -p origin/master:api/cwf/_lib/turn/landingSignals.ts` read at the interface and the derive function | home |
| the literal fields the meta carries, and that the contract today is prose only | MEASURED: `git cat-file -p origin/master:api/cwf/_lib/webTools.ts` read at the success shape and the tool description | meta |
| a labelled fixture corpus is an existing repository shape | MEASURED: `git cat-file -p origin/master:api/cwf/__tests__/fixtures/harness-honesty/corpus.ts` | precedent |
| the valve is closed and no order here opens it | MEASURED: the landing record of pull request 517 read on master · MEASURED: the `web.enabled` parameter declaration read on master | valve |
| the signal's behaviour on any real turn | NOT-READ | ORDER C |

```evidence:absence
$ git grep -n -I "uncited_external" origin/master
(no output)
$ git grep -n -I "uncited_external" <every refs/remotes/origin ref>
(no output)
$ git grep -c -I -i "uncited" origin/master
.agents/CHANGELOG.md:1
.agents/skills/cwf-project-kb/SKILL.md:1
api/cwf/__tests__/configFingerprint.test.ts:1
api/cwf/_lib/knowledge/reference/kinds.ts:1
api/cwf/_lib/observability/config.ts:1

Each read: all five are SCOPE-HONEST-1's "uncited-advice provenance chip", whose
subject is the procedure kind family and whose count is zero by construction. None
is a web citation. A single negative probe is not proof of absence; these two
lenses differ in what they ASSUME the thing is called.
```

```evidence:home
export interface LandingSignals {
    absenceWithoutEnumeration: AbsenceClaimMatch | null;
    fetchedNotDrawn: boolean;
    g2State: 'fired' | 'clean' | 'no-claim' | 'no-jurisdiction';
    g3State: 'fired' | 'clean' | 'no-jurisdiction';
}
export function deriveLandingSignals(input: {
    finalText: string | null | undefined;
    persistRaw: readonly PersistRawEntry[] | undefined;
    reachClasses: ReadonlyMap<string, GatewayReachClass> | null | undefined;
}): LandingSignals
```

```evidence:meta
        source: 'web',
    fetchedAt,
 * carries `url`, `finalUrl`, `fetchedAt` and `bodySha256` ALWAYS, and
    + 'is true. Always cite `url` and `fetchedAt` when using the content; the '
    + 'kullanırken mutlaka `url` ve `fetchedAt` alanlarını kaynak olarak belirt; '
```

```evidence:precedent
api/cwf/__tests__/fixtures/harness-honesty/compliant.ts
api/cwf/__tests__/fixtures/harness-honesty/corpus.ts
api/cwf/__tests__/fixtures/harness-honesty/emptiedInput.ts
api/cwf/__tests__/fixtures/harness-honesty/idleSpy.ts
api/cwf/__tests__/fixtures/harness-honesty/tailTruncatedRead.ts
```

```evidence:valve
web.enabled -> value 0, min 0, max 1, sessionTweakable false
paths       : 17 changed
```

## SCOPE
```scope
- one new fixture file of LABELLED ANSWER STRINGS under api/cwf/__tests__/fixtures/
- one new derived signal in api/cwf/_lib/turn/landingSignals.ts and its member on LandingSignals
- one new test file driving the signal over the corpus, every fixture labelled lawful or unlawful
- your report, on the branch
- a pull request opened and NOT merged
- no master push. No valve opened. No live fetch. No governed write. No messages row (C1 LAW)
- no change to webTools.ts, to the tool description, or to any existing gate's behaviour
```

## ORDER A — THE FLOOR
1. Read your box by `created_at`; earlier rows first.
2. `git fetch origin`; branch `phase/web-citation-contract-1-s134-1` from `origin/master` and print the full forty-hex head you cut from.
3. Re-run the two lenses of the `absence` fence yourself. If either now returns a citation signal, this card is WRONG about the world: STOP, quote what you found unanchored, and write nothing.

## ORDER B — THE CORPUS FIRST, THE SIGNAL SECOND, AND THAT ORDER IS BINDING
1. Write the fixture corpus BEFORE the rule. Each fixture is an object carrying the answer text, the meta the turn's ledger holds for it, and a label that is exactly `lawful` or `unlawful`, plus one sentence saying WHY in the fixture itself.
2. The corpus must contain at least these, and you add whatever else you can make fail: an answer citing both the url and the exact `fetchedAt` instant · an answer citing the url and only the DATE PART of that instant · a Turkish answer citing both in a Turkish sentence · an answer citing the url and NO instant at all · an answer citing an instant and NO url · an answer containing the English words "smart" and "Walmart" and no citation at all · an answer whose only occurrence of the instant lies INSIDE the cited url · a turn with NO web fetch in its ledger and no citation, which is lawful because there was nothing to cite.
3. Then write the rule. It reads the LITERAL `url` and the LITERAL `fetchedAt` from the turn's own ledger entries and asks whether the answer text carries them. It may accept the instant's date part as well as the whole instant. It MUST NOT contain a month name, a date separator vocabulary, a language marker, or any pattern that could match a word of ordinary prose.
4. The signal is silent unless the ledger holds at least one successful `web_fetch`. Give it the same said-out-loud silence vocabulary the two existing gates carry, so a turn with no fetch and a turn with no admissible evidence are DIFFERENT readings and neither is a quiet `clean`.
5. Do not wire the signal into any gate, any classifier, or any panel. It lands dark and reports.

## ORDER C — THE PROOF
1. Every fixture labelled `lawful` leaves the signal silent; every fixture labelled `unlawful` raises it. A test that asserts only one direction is not a proof and this card refuses it.
2. Run `npm run build` and name ALL FIVE of its gates by their outcomes, not a subset — `tsc -b`, `gen:arch-facts`, `check:ground`, `vite build`, `check:doc-drift`. `vitest` plus `typecheck:api` is a PROPER SUBSET of that and reporting it as the whole is the defect named in `F-S133-A-SUBSET-REPORTED-AS-THE-WHOLE-1`.
3. Push, open a pull request, do NOT merge. Then read CI at your pushed head with the FULL forty-hex sha and name every run with its conclusion, and name any workflow that did not trigger rather than counting it green (S101-L1).

## ORDER D — THE REPORT
1. `docs/relay/WEB-CITATION-CONTRACT-1-S134-1-AG4-report.md`, `auditText` locally `violations: 0` before push.
2. State in your own words what the corpus taught you that the rule did not already assume — and if it taught you nothing, say that, because a corpus that only confirms its author is a fixture set that was written after the rule regardless of the order the commits claim.
3. Post one from_lane row if your channel can. If it cannot, say MECHANISM-ABSENT and name the lenses; `F-S133-PRODUCER-HAS-NO-BUS-WRITE-PATH-1` is known and your branch on origin is the receipt.

## FALSIFIER
Wrong if the rule contains any month name, weekday name, date-separator vocabulary or language marker. Wrong if any fixture labelled lawful raises the signal. Wrong if the tests assert only one direction. Wrong if the corpus was written after the rule. Wrong if the signal fires on a turn whose ledger holds no successful fetch. Wrong if `webTools.ts` or the tool description was edited. Wrong if the valve was opened or any live fetch was made. Wrong if the signal was wired into a gate, a classifier or a panel. Wrong if anything was pushed to master. Wrong if the pull request was merged. Wrong if `npm run build` was reported by a subset of its gates.

## SHARED SURFACES
cwf_yaprak: one new branch, one open pull request, master untouched. CI: the ordinary gates at the pushed head; no dispatch. Database: no read and no write. Production behaviour: UNCHANGED — the valve stays closed and the signal is dark. Secrets: none read, none printed.

## DECISION RIGHTS
Yours: the fixture corpus beyond the minimum this card names, the signal's member name, and the shape of its silence vocabulary within the two existing gates' style. Not yours: whether a fixture is lawful — the fixture's own sentence must justify the label, and a label you cannot justify in one sentence is a fixture that does not belong in the corpus.

BODIES: CARD-WEB-VALVE-1-S132-1 v6 through v12 and their reviews, CLOSED WITHOUT PRODUCT · A-REC-S133-6 · F-S133-A-SUBSET-REPORTED-AS-THE-WHOLE-1 · F-S133-PRODUCER-HAS-NO-BUS-WRITE-PATH-1 · OWNER-WITNESS-S133-WEB-VALVE-LIVE-1 · S101-L1 · C1 LAW · TOTAL-45.

```deliverables
the branch cut point, printed at full forty-hex length
the fixture corpus file, every fixture labelled lawful or unlawful with its one-sentence reason
the signal in landingSignals.ts and its member on LandingSignals
the test file proving BOTH directions over the corpus
npm run build with all five gates named by outcome
CI at the pushed head read with the full forty-hex sha, every run named with its conclusion, any absent workflow named
docs/relay/WEB-CITATION-CONTRACT-1-S134-1-AG4-report.md, auditText violations: 0
a pull request opened and NOT merged
one from_lane row, or MECHANISM-ABSENT with the lenses named
```

TAIL ANCHOR: CARD-WEB-CITATION-CONTRACT-1-S134-1-v2 ends here.
