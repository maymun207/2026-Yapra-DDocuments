<!-- relay-audit: v1 kind=card -->
# CARD-CI-RED-RELAY-HEADER-1 · v1 — govern the report file your own branch added, and turn CI green

CI on pull request 488 is RED. One test, one cause, and the gate's own message names the remedy:
your ORDER E report file carries no grammar header, so the relay auditor cannot govern it, and the
frozen exemption list correctly refuses to grow.

This is NOT a defect in the work. It is a file the build card did not order — the card's
`deliverables` named a BUS ROW and nothing else — added by house convention, which is the right
convention. The file stays. It gets governed.

## PREMISE

MEASURED: 2026-09-03T13:17:16Z, the CI run on the pull request HEAD, relayed verbatim by the owner — `relayAuditGate.test.ts` reports 36 of 37 passing, and the single failure names `docs/relay/TOOL-VISIBILITY-B-1-AG-4-report.md` as carrying no header and not being exempt.
MEASURED: 2026-09-03T13:20:59Z, `git show phase/tool-visibility-b-1:docs/relay/TOOL-VISIBILITY-B-1-AG-4-report.md | head -2` over the bridge — the first line is the H1, not a header comment. The file is still ungoverned at the branch tip.
MEASURED: 2026-09-03T13:2xZ, `grep` over `scripts/relayAudit.ts` — `RELAY_KINDS` is `prompt · report · go · phase · card`; the header pattern is at `HEADER_RE`; and `kind=report` carries a REQUIREMENT beyond the header, quoted in the `rule` fence.
MEASURED: 2026-09-03T13:2xZ, `head -1` over six existing `docs/relay/*-report.md` files — the house form is in the `precedent` fence, and one of the six omits `prov=1`, so that flag is not universal.
DECAYS on any push to the branch and on CI re-running. Re-read the file's first line and the failing test at ORDER A.
ON-DISAGREEMENT: if the file already carries a header, or CI is now green, or the failure names a DIFFERENT file — STOP and report. Do not add a header to a file the gate did not name, and do NOT touch `RELAY-AUDIT-EXEMPT-HISTORY-v1.txt` under any circumstance: the gate's own message forbids it and the list only shrinks.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| CI is red on exactly one test, and it names one file | MEASURED: 2026-09-03T13:17:16Z, the CI output relayed by the owner, 36 of 37 passing | failure |
| the file is still ungoverned at the branch tip | MEASURED: 2026-09-03T13:20:59Z, git show of its first line over the bridge | failure |
| `kind=report` requires a DIFF section as well as the header | MEASURED: 2026-09-03T13:2xZ, grep over scripts/relayAudit.ts for RELAY_KINDS, HEADER_RE and the report branch | rule |
| the house filename form is AGN-report and the branch's file uses the minority dashed form | MEASURED: 2026-09-03T13:2xZ, ls over docs/relay counted both spellings — one hundred and forty-nine against three | naming |
| whether the report body satisfies every other `kind=report` rule once governed | NOT-READ | ORDER B settles it by running the auditor, not by reading the rules |

```evidence:failure
From the CI run at 2026-09-03T13:17:16Z, relayed verbatim:

  FAIL  relayAuditGate.test.ts > every relay artifact is either GOVERNED or
        frozen-exempt — never neither
  AssertionError: these relay artifacts carry no grammar v1 header and are not in
  the FROZEN exemption list. The list is frozen: give the file a
  `<!-- relay-audit: v1 kind=... -->` header. Do NOT add it to
  docs/relay/RELAY-AUDIT-EXEMPT-HISTORY-v1.txt.
  + [ "docs/relay/TOOL-VISIBILITY-B-1-AG-4-report.md" ]

36 of 37 tests in that file PASS. Every other gate in the run is unaffected. The
three aged `authorityMatrix` failures are a separate, pre-existing matter and are
NOT this card's business.
```

```evidence:rule
From `scripts/relayAudit.ts`, read at 2026-09-03T13:2xZ:

  RELAY_KINDS = ['prompt', 'report', 'go', 'phase', 'card']
  expected: '<!-- relay-audit: v1 kind=report prov=1 -->'
  rule: 'Give a report a `## DIFF` section holding a fence that names
         `git diff --name-only`.'
  if (kind === 'report') … 'kind=report requires a `## DIFF` section'

SO THE HEADER ALONE DOES NOT CLOSE THIS. Governing the file makes the auditor JUDGE
it, and a governed report without a DIFF section trades one red for another.
```

```evidence:naming
RAW TRANSCRIPT — the header line of six existing report files, and the filename count.
Read at 2026-09-03T13:2xZ. Quoted verbatim, so the spellings below are the world's,
not this card's:

  ADF-GRAMMAR-ABSENCE-LENS-FIX-1-AG3-report.md   <!-- relay-audit: v1 kind=report prov=1 -->
  ADF-KADEME-0-AG1-report.md                     <!-- relay-audit: v1 kind=report prov=1 -->
  ADF-KADEME-0-AG2-report.md                     <!-- relay-audit: v1 kind=report prov=1 -->
  ADF-KADEME-0-AG3-LAND-report.md                <!-- relay-audit: v1 kind=report prov=1 -->
  ADF-KADEME-0-AG3-report.md                     <!-- relay-audit: v1 kind=report prov=1 -->
  ADF-KADEME-0-AG4-report.md                     <!-- relay-audit: v1 kind=report -->

Five carry `prov=1`, one does not. You decide which applies to yours by reading what
`prov=1` MEANS in the auditor, not by counting the majority.

FILENAME COUNT over the same directory, both spellings:

  ...-AG<n>-report.md   (dashed)     3
  ...-AG<n>report.md    (undashed)   149

The branch's report uses the MINORITY spelling. THAT IS A FINDING, NOT A CHORE, and
this card does NOT order a rename: the addendum already on the bus names the current
path, and renaming a file a published row points at trades one inconsistency for a
broken reference. Named under S61-2 so the debt is owed rather than forgotten.
```

## ORDER A — READ

Re-read the file's first line and re-run `relayAuditGate.test.ts` locally. Confirm the failure is
the one in the `failure` fence and names that file alone.

## ORDER B — GOVERN THE FILE

Add the header, and add whatever `kind=report` additionally requires — at minimum a `## DIFF`
section whose fence names `git diff --name-only`, per the `rule` fence. Decide `prov=1` by reading
what it means in the auditor.

Then run the auditor over the file until it passes as a GOVERNED report. Do not stop at the header:
the failing test only checks governed-or-exempt, and a SECOND test in the same file checks that
every governed artifact passes the grammar.

Do NOT touch `RELAY-AUDIT-EXEMPT-HISTORY-v1.txt`. Do NOT delete or rename the report. Do NOT change
any other file. Commit on the SAME branch and push; the pull request updates itself.

## ORDER C — PROVE IT

Run the full `relayAuditGate.test.ts` and report 37 of 37. Then report the CI verdict on the updated
pull request HEAD once it completes — and if any OTHER test is red, report it and STOP rather than
fixing it here.

## ORDER D — REPORT

File `from_lane` with artifact name `CI-RED-RELAY-HEADER-1-<your-address>-report`, carrying the
ORDER A reading, the exact header line you wrote, what else you had to add, the local test result,
and the CI verdict or the word UNREAD.

## FALSIFIER

This card is wrong if the file already carries a header, or if the red is not the one quoted, or if
governing the file cannot be done without editing the exemption list. That last one would mean the
gate has no compliant path for a new report, which is a design defect and a STOP.

## SHARED SURFACES

ONE file on the existing branch: `docs/relay/TOOL-VISIBILITY-B-1-AG-4-report.md`. One commit, one
push to the same branch. NO other file. NOT the exemption list. NO governed row. NO migration. NO
merge. NO production traffic.

## DECISION RIGHTS

You decide the header's `prov` flag and the DIFF section's contents. You decide NOTHING about the
exemption list — it is untouchable here — and NOTHING about the three aged `authorityMatrix`
failures, which are out of scope.

BODIES: `PLATINUM` · `S37-2` (the PR-head CI is the referee) · `S61-2` (this debt clears before the
landing proceeds) · `TOTAL-45`.

fanout: personalized

```deliverables
branch: phase/tool-visibility-b-1 — the existing branch, one more commit
report: bus row from_lane, artifact_name CI-RED-RELAY-HEADER-1-<your-address>-report
```

TAIL ANCHOR: CARD-CI-RED-RELAY-HEADER-1-v1 ends here.
