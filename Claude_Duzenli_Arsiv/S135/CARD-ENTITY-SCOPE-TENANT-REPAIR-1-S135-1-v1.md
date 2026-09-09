<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-ENTITY-SCOPE-TENANT-REPAIR-1-S135-1 · v1 — take the tenant vocabulary out of your own three files, by the namespace this repository already has
lane: AG-4
report: docs/relay/ENTITY-SCOPE-TENANT-REPAIR-1-S135-1-AG4-report.md
fanout: personalized

## WHAT THIS CARD IS FOR, IN ONE SENTENCE

Pull request 524 carries a complete, generic, adversary-reviewed narrowing seam and cannot land, for exactly one measured reason: three files on that branch carry real tenant identifiers, and the tenant-zero gate reds on them. You wrote all three. You repair all three. Nothing about the narrowing logic changes.

## THE SUCCESS CRITERION, STATED FIRST BECAUSE IT IS THE PART A LANE GETS WRONG

Success is NOT the gate going green. The gate is an EIGHT-TOKEN allowlist, and green is reachable while real tenant vocabulary and a real production UUID stay in the file. Success is: no real tenant identifier remains in the three files named in SCOPE — verified by the wider grep in ORDER D, which the gate cannot run for you.

## PREMISE

MEASURED: git rev-parse origin/phase/entity-scope-by-resolved-peer-1-s134-1 in the owner's clone at 2026-09-09T16:19Z — the branch head named in the evidence fence under CLAIMS, pull request 524, open.
MEASURED: git rev-parse origin/master in the same clone at the same instant — the master value named in the evidence fence under CLAIMS.
MEASURED: tsx scripts/checkTenantZero.ts run by the Architect in a clean worktree at that branch head at 2026-09-09T16:26Z — positive control RED as required, then FAIL with 40 gated-vocabulary hits over 2122 files scanned, 26 binaries skipped. The 40 is a SET and it is enumerated in CLAIMS.
MEASURED: git cat-file -e origin/master:docs/relay/ENTITY-SCOPE-BY-RESOLVED-PEER-1-S134-1-AG4-report.md — ABSENT. The report is not landed history. The same probe returns ABSENT for api/cwf/__tests__/entityScopeByResolvedPeer.test.ts.
MEASURED: sed -n 75,76p api/cwf/_lib/synthTraffic/syntheticTemplateFills.ts — the neutral namespace exists in this repository already: FactoryF followed by slot+1 for a factory, and Line followed by a letter for a line.
MEASURED: head of docs/laws/rules/RULE-40.md, quoted by the scout — the no-literal-NUL law is RULE-40; the script filename checkRule24.ts is a retired number, F-S108-RULE24-COLLISION.
UNMEASURED: whether steps 9 and 10 of build (24.x) pass at this head. They are SKIPPED behind the failing step 8 and have never spoken. Skipped is silent, not passing.

SELF-INVALIDATION: this card's premise dies if either ref in the evidence fence under CLAIMS differs from the value recorded there when you re-measure it.

ON-DISAGREEMENT: if either ref differs from the line above, STOP, write the two shas you measured into your report, and post the report. Do not rebase, do not force, do not repair the difference.

## CLAIMS

| claim | basis | anchor |
| --- | --- | --- |
| the two refs this card stands on | MEASURED: git rev-parse origin/phase/entity-scope-by-resolved-peer-1-s134-1 and origin/master | refs |
| the gate refuses this head with a set of forty hits over three files | MEASURED: npx tsx scripts/checkTenantZero.ts in a clean worktree at that head | gate |
| a wider lens finds tenant references the gate cannot see | MEASURED: grep -niE for the three ungated display names and any 36-character UUID over the three files in SCOPE | lens |
| the neutral namespace already exists in this repository | MEASURED: sed -n 73,77p api/cwf/_lib/synthTraffic/syntheticTemplateFills.ts | namespace |
| your own relay report is not landed history | MEASURED: git cat-file -e origin/master:docs/relay/ENTITY-SCOPE-BY-RESOLVED-PEER-1-S134-1-AG4-report.md | landed |
| steps 9 and 10 of build (24.x) have never spoken at this head | NOT-READ | inline |

```evidence:refs
read 2026-09-09T16:19Z, in the owner's clone
$ git rev-parse origin/phase/entity-scope-by-resolved-peer-1-s134-1
56bd73ae1c05a0306b4c59a7e8416a5ba00c93eb
$ git rev-parse origin/master
95afefed06f6edb0cea5e2caadc0a4e582af38b2
```

```evidence:gate
read 2026-09-09T16:26Z, clean worktree at the branch head above
$ npx tsx scripts/checkTenantZero.ts
[check:tenant-zero] positive control RED as required (planted hit detected, control file removed) - proceeding to the real scan.
[check:tenant-zero] [FAIL] 40 gated-vocabulary hit(s) in scope (2122 files scanned, 26 binaries skipped)
the hit lines, by file, transcribed WITHOUT their matched text:
api/cwf/__tests__/entityScopeByResolvedPeer.test.ts 6 7 17 29 30 32 38 39 41 42 48 51 55 59 88 89 91 92 93 114 126 127 129 130 135 138 141 142 149 150 154 155
api/cwf/_lib/turn/stageClarify.ts 326
docs/relay/ENTITY-SCOPE-BY-RESOLVED-PEER-1-S134-1-AG4-report.md 64 140 141 145 146 147 158
32 + 1 + 7 = 40
```

```evidence:lens
read 2026-09-09T16:31Z, same worktree, the Architect's lens and NOT the gate
$ grep -niE for the three ungated display names and any 36-character UUID, line numbers only
api/cwf/__tests__/entityScopeByResolvedPeer.test.ts 6 8 9 14 27 28 29 30 32 37 40 59 61 63 78 81 124 127 129 136 137 141 142
api/cwf/_lib/turn/stageClarify.ts none
docs/relay/ENTITY-SCOPE-BY-RESOLVED-PEER-1-S134-1-AG4-report.md 64 138 139 140 141 145 148 158
```

```evidence:namespace
read 2026-09-09T16:29Z, same worktree
$ sed -n 73,77p api/cwf/_lib/synthTraffic/syntheticTemplateFills.ts
/** Deterministic neutral fallback for a slot with no registry row (B-7 vocabulary). */
function fallbackToken(kind, slot) {
    if (kind === 'FACTORY' || kind === 'FACTORY_ID') return `FactoryF${slot + 1}`;
    return `Line${String.fromCharCode(65 + (slot % 26))}`;
}
```

```evidence:landed
read 2026-09-09T16:28Z, in the owner's clone
$ git cat-file -e origin/master:docs/relay/ENTITY-SCOPE-BY-RESOLVED-PEER-1-S134-1-AG4-report.md
fatal: Not a valid object name
$ git cat-file -e origin/master:api/cwf/__tests__/entityScopeByResolvedPeer.test.ts
fatal: Not a valid object name
```

The two lenses disagree about which lines carry tenant vocabulary, and that disagreement is the finding, not a tie to break. Repair the UNION of the two sets above.

## SCOPE

Exactly three files:
api/cwf/__tests__/entityScopeByResolvedPeer.test.ts
api/cwf/_lib/turn/stageClarify.ts — the comment at line 326 only
docs/relay/ENTITY-SCOPE-BY-RESOLVED-PEER-1-S134-1-AG4-report.md — your own report

Not in scope, and you do not touch them: narrowAmbiguousByResolvedPeer and every other behaviour in stageClarify.ts; scripts/checkTenantZero.ts; scripts/tenantZeroLens.ts; public/architecture/manifest.json beyond what a rebuild regenerates; every other file in the repository that carries tenant vocabulary. That last set is real and larger than this card, and it is deliberately left for a separate ruling.

## ORDER A — REUSE THE NAMESPACE, DO NOT MINT ONE

Read api/cwf/_lib/synthTraffic/syntheticTemplateFills.ts first. Its fallback vocabulary — FactoryF1, FactoryF2, FactoryF3, and LineA, LineB — is the sanctioned neutral namespace of this repository, minted by item G4 of FLOOR-TENANT-SPLIT-1, the sibling of the gate that is red at its item G7. Use that vocabulary in the rewrite.

Reuse the VOCABULARY, not the machine: G4's filler is an injection-time path for the synthetic-traffic corpora and a vitest unit test has no injector. Do not import it, do not wire it, and do not claim in your report that you reused it.

Every UUID in the rewritten test is one you mint as an obvious fixture value. Do not carry a registry UUID across.

## ORDER B — THE REWRITE, AND THE ONE CASE IT CAN SILENTLY DESTROY

Rewrite the test file and the stageClarify.ts line 326 comment so that no real factory name, no real line name and no registry UUID remains, using ORDER A's vocabulary.

THE MISSING ROW STAYS MISSING. At lines 124 and 136 to 137 a candidate's parent row is deliberately ABSENT from the parentage map. That absence is the only thing separating MEASURED-TOP-OF-CHAIN, where a parent id is null and the candidate may drop, from I-CANNOT-SEE-THE-PARENT, where the row is missing and the candidate must be kept. A rewrite that renames every key and helpfully completes the map deletes that case while every assertion still passes. Keep the deletion, keep its comment, and say in your report that you kept it.

Keep the structural property the defect was witnessed on: three candidates sharing one surface name, differing in exactly one column, their parent. Keep the five must-not-fire cases and the unmeasured-relation cases as they are.

The docblock loses its provenance and must say so. Replace the sentence claiming the ids are real rows read at card time with one sentence stating that the fixture is a synthetic reconstruction of a structure witnessed in the live registry, and that the witness lives in the relay report, not here.

## ORDER C — YOUR OWN REPORT

The report is NOT append-only history: it does not exist at origin/master, measured in PREMISE. The exemption rationale that covers supabase/migrations does not reach it. It is an unlanded draft of yours, and you repair it.

Repair it by REDACTION, not by substitution. A quoted SQL result whose rows are replaced with invented ones reads like a measurement and is not one — that is a worse defect than the one being fixed. Replace each tenant identifier in the quoted rows with a bracketed redaction marker of your choosing, applied consistently, and add one line above each redacted block saying that the row values are redacted and that the query and the row COUNT are unchanged. The shape of the evidence survives; the customer's vocabulary does not.

## ORDER D — PROVE IT WITH A NAMED GREP, THEN THE GATE, THEN PUSH

Run, and paste both outputs in your report:
1. Your own wider grep over exactly the three files in SCOPE, case-insensitive, for the three ungated display names that are in the file today and for any 36-character UUID. Expected: zero hits. If it is not zero, you are not done, whatever the gate says.
2. npx tsx scripts/checkTenantZero.ts. Expected: the positive control reds, then zero gated-vocabulary hits.

Then commit and push to phase/entity-scope-by-resolved-peer-1-s134-1. Do not merge and do not open a new branch. The push produces its own CI run; do not re-run a tree to chase a green.

Add no exemption, no ignore entry, no allowlist member, and no change to scripts/checkTenantZero.ts or scripts/tenantZeroLens.ts. If you believe the gate must change to let this pass, STOP and say so in your report instead.

Name RULE-40 correctly if you name it at all: the no-literal-NUL law is RULE-40 and the script that enforces it is still filed under the retired name checkRule24.ts. The tenant-zero gate has NO rule number and is cited as item G7 of PHASE FLOOR-TENANT-SPLIT-1.

## ORDER E — WHAT YOUR REPORT MUST NAME AS SILENT

Steps 9 and 10 of build (24.x), Build and Run tests, are SKIPPED at the head this card starts from and have never spoken about this seam. Your report says so in those words. Do not fold a skipped step into a green, and do not report the branch as proven until those two steps have run.

## FALSIFIER

If your wider grep in ORDER D returns a hit you cannot remove without changing the narrowing logic or weakening a gate, this card is wrong. Stop, post the report with the hit in it, and wait.

## SHARED SURFACES

api/cwf/_lib/turn/stageClarify.ts is shared with every other clarification-stage change in flight. You touch ONE comment line in it, at 326. If you find any other lane holding that file, name the collision in your report and do not resolve it yourself.

## DECISION RIGHTS

Yours: the redaction marker's spelling, the fixture ids you mint, the wording of the docblock's provenance sentence, the commit message.
NOT yours: whether the gate changes; whether any file outside SCOPE is repaired; whether pull request 524 merges. The merge is a separate card under the owner's standing approval OWNER-APPROVAL-S134-ENTITY-SCOPE-MERGE-1, which is unspent and does not override a red gate.

## ATTRIBUTION

The shape of this card is the scout's, from ORDER-S134-ADVERSARY-REVIEW-TENANT-ZERO-REPAIR-1-scout-report parts 1 to 3, and it refused the Architect's previous shape. Three of its findings are carried here by name: that the neutral namespace already exists at G4 and would have been built a third time; that gate-green is not tenant-zero because the vocabulary is an eight-token allowlist; and that a rewrite completing the parentage map would silently delete the empty-is-not-zero case. The Architect's blind spot in each case was measuring the repair against the instrument rather than against the instrument's name.
