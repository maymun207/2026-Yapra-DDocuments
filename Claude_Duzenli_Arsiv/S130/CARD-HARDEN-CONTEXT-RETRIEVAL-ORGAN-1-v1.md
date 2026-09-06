<!-- relay-audit: v1 kind=card -->
# CARD-HARDEN-CONTEXT-RETRIEVAL-ORGAN-1 · v1 — close the scout's five organ findings (A1–A5) before the first Architect client connects; each fix arrives with the planted-fault test that was missing

AG-4 card. Second item of the owner's re-ordered queue (OWNER-RULING-S130-LAND-490-1 §2: "then the hardening cards"). The context-retrieval organ landed on master (PR phase/context-retrieval-1, S130 record 3) carrying five findings the scout named and the owner accepted as owed BEFORE first use, not before merge. No Architect client has connected and the archive has never been indexed, so the fixes are still cheaper than the incident. Five small authored edits, five new test cases, one branch, one PR; no behaviour beyond the named lines changes.

## PREMISE

MEASURED: 2026-09-04T10:03Z SCOUT-REVIEW-CONTEXT-RETRIEVAL-1-v1 (bus, scout), reconfirmed unchanged in v2 (10:34Z): A1 groundPort.ts:68 (and :81/:83, :95) — the collection-mismatch arm returns `{hits:[],corpusSize:0,belowThreshold:0}` and `get` returns null for BOTH wrong-collection and no-such-id, so "this port cannot answer for that collection" renders byte-identically to "the corpus is empty"; archiveSearch.ts:38 already gets the rule right. A2 archiveCorpus.ts:156,161 — `parseArchiveRecordId` folds an EMPTY segment to 0 (`Number("")===0`, `Number.isInteger(0)`): `"arch:fam::"` → ok ordinal=0 chunk=0; no production caller, tests only. A3 readOnlyFence.ts:42 vs :108 — lens one knows 11 WRITE_VERBS, lens two scans 3 (upsert, ensureCollection, dropCollection), so `.delete(`/`.insert(`/`.update(` pass both. A4 indexArchive.ts:115 — chunk always 0 and `familyIdOf` discards the directory, so two documents sharing a basename across archive sections get the SAME record id and groundPort's byId Map keeps the last, undetected. A5 groundMcpServer.ts:57 — a `CWF_ARCHIVE_PROVENANCE` that is valid JSON but not an array returns `[]` with NO stderr line while unparseable JSON reports one; the comment claims "reported rather than swallowed".
MEASURED: 2026-09-04T10:03Z, the test gaps the scout paired with them: groundPort.test.ts:99 (mismatch) asserts only `.hits`/`.identities` empty, never `corpusSize`; archiveCorpus.test.ts malformed-id case lacks the empty ordinal/chunk segment; indexArchive.test.ts has no duplicate-id case; no test for the A5 non-array shape; no test that lens two sees `.delete(`.
UNMEASURED: line numbers at today's master (they were read at the branch head 2026-09-04; the files may have moved with the sync — ORDER A re-measures by content, not by number); whether any other caller depends on the A1 zero shape (ORDER A greps).
DECAYS on any push to master touching the organ. ON-DISAGREEMENT: a finding you cannot reproduce at today's master → say so with the bytes, skip that item, do the rest; do NOT invent a fix for a fault you cannot plant.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the five findings and their test gaps | MEASURED: 2026-09-04T10:03Z scout v1, reconfirmed v2 | findings |
| the branch, the PR, CI | UNMEASURED — ORDER D | result |

```evidence:findings
A1 groundPort.ts    collection mismatch folded to corpusSize 0 / null   -> a third, discriminated value
A2 archiveCorpus.ts parseArchiveRecordId accepts an empty segment as 0   -> refuse a blank segment
A3 readOnlyFence.ts lens two scans 3 verbs, lens one knows 11            -> one shared list
A4 indexArchive.ts  basename collision across sections yields one id    -> duplicate-id tally, refuse or report
A5 groundMcpServer  non-array provenance JSON returns [] silently        -> report it on stderr like the parse failure
```

```evidence:result
UNMEASURED. ORDER D prints the branch tip at forty hex, the PR number, and every CI context.
```

## ORDER A — LOCATE BY CONTENT
Fresh clone or worktree at today's master (`git fetch origin`; print `git rev-parse origin/master` forty hex). `git grep -n` each finding's signature (the zero-shape literal in groundPort; `Number.isInteger` in archiveCorpus; the three-verb scan in readOnlyFence; `familyIdOf` in indexArchive; the `Array.isArray` arm in groundMcpServer). Print file:line for each at this master. Grep every caller of the A1 return shape (`corpusSize` consumers) and list them — the new value must be handled, not merely emitted.

## ORDER B — THE FIVE FIXES, MINIMAL
A1: a discriminated refusal (e.g. `{kind:'refused', reason:'collection-mismatch'}` or the organ's existing Placed/UNKNOWN idiom — reuse what archiveSearch.ts:38 does; do not invent a new idiom) on every mismatch arm, and `get` distinguishes wrong-collection from no-such-id. A2: a blank segment is a parse REFUSAL with a reason. A3: lens two iterates the SAME `WRITE_VERBS` array lens one owns — one list, exported once. A4: `indexArchive` tallies duplicate record ids and the manifest carries the tally; a duplicate is REPORTED in the summary (refuse or report — pick the organ's existing floor-under-trust direction and say which). A5: the non-array shape writes one stderr line naming the shape, then returns `[]` (direction stays safe; the comment becomes true).

## ORDER C — THE FIVE PLANTED-FAULT TESTS
One new case per finding, in the existing test file for that module, each of the shape "with the fault planted, the test FAILS; with the fix, it passes" — and prove it: run each new test once against the pre-fix code (stash-free: run at the parent commit in a second worktree) and print the failing assertion, then at the fix and print the pass. groundPort mismatch asserts the discriminated value, not empties; archiveCorpus asserts `"arch:fam::"` and `"arch:fam: :3"` are REFUSED; readOnlyFence plants `.delete(` and asserts lens two fires; indexArchive plants two same-basename docs in two sections and asserts the tally; groundMcpServer plants `{}` provenance and asserts the stderr line.

## ORDER D — BRANCH, PR, CI
Branch `phase/harden-context-retrieval-organ-1` from today's master; commits `AG-4: PHASE-HARDEN-CONTEXT-RETRIEVAL-ORGAN-1 — …` (one lane token before the first colon, every non-merge subject). `npm run gen:arch-facts` and `npm run reseal` if any generated input moved (print whether they did). Open the PR against master; CI at the tip's forty hex, every context named, eval-canary skipped named; `build (24.x)` RED → STOP with the failing tests verbatim, no re-run. Report from_lane, artifact_name `HARDEN-CONTEXT-RETRIEVAL-ORGAN-1-AG-4-report`: ORDER A file:lines and caller list, the five diffs summarised by line, the ten test runs (fail-then-pass) verbatim, tip fenced, PR number, CI table, `git status --porcelain -uall`, `git worktree list`. Do NOT land: the scout reviews first, then the foreman.

## FALSIFIER
Wrong if any of the five tests passes against the pre-fix code, if a caller of the A1 shape is left unhandled, if lens two still carries its own verb list, if any non-merge subject lacks the `AG-4:` token, or if the diff touches a file outside the five modules, their five test files, and the two generated files.

## SHARED SURFACES
One new branch, one PR. NO push to master. NO migration. NO db push. NO governed row. NO edit to land.ts or the laws.

## DECISION RIGHTS
None. ON-DISAGREEMENT stops are yours; the A4 refuse-vs-report choice follows the organ's existing floor direction and is named in the report.

BODIES: `empty ≠ zero` · `partial ≠ complete` · `TOTAL-45` · `S61-2` · `S37-2` · `S102-YASA-1` · OWNER-RULING-S130-LAND-490-1 · OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1 (product scope) · SCOUT-REVIEW-CONTEXT-RETRIEVAL-1-v1/v2 · F-S130-RESEAL-BREADCRUMB-ALWAYS-DIRTIES-1.

fanout: personalized

```deliverables
branch: phase/harden-context-retrieval-organ-1, PR open against master, CI read at the tip
report: bus row from_lane, artifact_name HARDEN-CONTEXT-RETRIEVAL-ORGAN-1-AG-4-report
```

TAIL ANCHOR: CARD-HARDEN-CONTEXT-RETRIEVAL-ORGAN-1-v1 ends here.
