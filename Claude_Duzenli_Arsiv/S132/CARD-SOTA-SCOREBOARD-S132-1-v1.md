<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-SOTA-SCOREBOARD-S132-1 · v1 — measure both SOTA scoreboards from the tree and the instrument, re-read the harness gap list, take the open-PR referee read, and push the archive
lane: AG-4
report: docs/relay/SOTA-SCOREBOARD-S132-1-AG4-report.md
fanout: personalized

This is the first PRODUCT card of S132 and the product return bootstrap v132 names as FIRST JOB 4. Both SOTA scoreboards — the internal seven-key readiness counter that `npm run architect:open` prints, and the external acceptance contract `cwf-sota-definition` that SOTA-1 binds v1 to — have been carried UNVERIFIED across sessions since project-instructions v5_7, and the carried figures are forbidden to quote. This card brings both back MEASURED so the next product card is chosen by SOTA-1's ordering rule rather than by memory. The acceptance contract lives ONLY in the owner's project box, which no lane can read, so its sixteen external criteria are embedded below in the `criteria` fence (D-2 ONE-RELAY) — the lane measures the TREE against that list; it does not run any benchmark, spends nothing, and writes no code. It also takes the referee read v132 FIRST JOB 2 still owes (`gh pr list`), and pushes the documents-repository archive commits the Architect cannot push (no GitHub credential over the bridge). Your consumption of this card is also the Architect's liveness diagnostic for AG-4: the last output row from your address predates S131's close.

## PREMISE
- MEASURED: 2026-09-07T05:13Z, Vercel `list_deployments` (target production, newest) — `githubCommitSha` equals the `master` fence; the commit is the PR #504 landing. The owner's clone `refs/remotes/origin/master` (fetched 2026-09-07T04:55Z) reads the same value.
- MEASURED: 2026-09-07T05:13Z, Supabase `factory_state` — your row WORKING with a heartbeat at 2026-09-07T05:06Z and NO from_lane output since S131; AG-5 CLAIMED with output at 2026-09-07T04:53Z. Liveness is read from output only.
- MEASURED: 2026-09-07T05:16Z over the bridge, documents repository (`/Users/tunckahveci/Desktop/2026 DESKTOP/2026 -YAPRA/2026 - Yapra - DDocuments`), branch `main`: local tip = `arch-tip` fence; `refs/remotes/origin/main` = `arch-origin` fence; `git rev-list --count origin/main..main` prints the count in the `scope` fence; every path in those commits lies under `Claude_Duzenli_Arsiv/S131/` or `Claude_Duzenli_Arsiv/S132/`.
- MEASURED: 2026-09-07T05:14Z, project box `cwf-sota-definition-v1_5` (BINDING) — its status table lists the sixteen external criteria in the `criteria` fence, every one ÖLÇÜLMEDİ or NOT BUILT as of its own 2026-08-04 stamp. `git ls-tree -r origin/master` shows the contract is NOT in the repository; only `docs/laws/constitution/SOTA-1.md` and the relay reports mention it.
- UNMEASURED: `npm run architect:open` — the Architect has no repository checkout that can execute `tsx`. ORDER B runs it.
- UNMEASURED: whether `origin/main` of the documents repository moved since the read above (no network over the bridge). ORDER D reads it.
- ON-DISAGREEMENT: if your `origin/master` after fetch differs from the `master` fence, STOP and report the value you read — do not proceed on a moved anchor. If the documents repository's `origin/main` differs from the `arch-origin` fence, STOP ORDER D and report; the other orders still run.
- DECAYS the moment master moves past the `master` fence, and the moment any write lands on the documents repository's `main`.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| master at mint, the tree every ORDER C lens reads | MEASURED: Vercel list_deployments production newest githubCommitSha; git for-each-ref refs/remotes/origin/master over the bridge | master |
| documents repository local `main` tip, unpushed | MEASURED: git rev-parse HEAD over the bridge after the S132 commit | arch-tip |
| documents repository `origin/main` as last read | MEASURED: git for-each-ref refs/remotes/origin/main over the bridge | arch-origin |
| the open-PR list at ORDER A | NOT-READ | the Architect has no GitHub credential; ORDER A is the referee |
| the seven-key print of architect:open | NOT-READ | the Architect cannot run tsx against a checkout; ORDER B prints it |
| the per-criterion verdicts of the external contract at this master | NOT-READ | the tree is measured by ORDER C, not carried from the contract's 2026-08-04 stamp |

```evidence:master
11d6da31644356efdb349f9a9cd9f258b1bdc05a
```

```evidence:arch-tip
460caf075c5fbc65a7c0d150e97511a2a985bc93
```

```evidence:arch-origin
c23763c6afaeef2c9531044c71a10929880b2fff
```

## SCOPE
```scope
- cwf_yaprak: ONE new file, the report at the path in the header; no source, migration, seal, boot or script file is opened for writing
- cwf_yaprak: one branch phase/sota-scoreboard-s132-1, one pull request, report-only
- documents repository, branch main: three commits ahead of origin/main, every path under Claude_Duzenli_Arsiv/S131/ or Claude_Duzenli_Arsiv/S132/, one push
- bus: one from_lane row SOTA-SCOREBOARD-S132-1-AG4-report, posted once
- no benchmark is executed, no spend, no governed row written, no data row read except your own box
```

The sixteen external criteria of `cwf-sota-definition-v1_5` §3/§10, embedded so ORDER C has a list to measure against. Names are the contract's own; thresholds are omitted here on purpose — this card measures whether a MEASUREMENT exists, not whether it passes.

```criteria
A1  τ²-bench (Sierra)                        — Tier A
A2  Gaia2 (Meta)                             — Tier A
B1  MCP-Bench score                          — Tier B
B2  MCP-Bench zero-code mount                — Tier B
B3  MCP-Universe zero-code mount             — Tier B
C1  LongMemEval, abstention                  — Tier C
C2  Mem2ActBench                             — Tier C
C3  ToolComp, process score                  — Tier C
C4  API-Bank                                 — Tier C
D1  MCP-SafetyBench                          — Tier D
D2  MT-AgentRisk                             — Tier D
D3  Agent-SafetyBench                        — Tier D
F1  BrowseComp-Plus, citation accuracy       — Tier F
F2  DeepScholar-Bench, verifiability         — Tier F
E1  mcp-honestbench (CWF-authored)           — Tier E, contract status NOT BUILT
X1  B-FRONTIER baseline at equal cost        — comparison set
plus the contract's internal rows, read the same way: cost per full round (metered, BENCH-SMOKE-1) · D-OPA-2 policy parity · D-OPA-3 fail-closed
```

The contract's §6 names three harness items that block fifteen of the sixteen — BENCH-A2A-1, BENCH-RESET-1, BENCH-BACKEND-MOUNT-1 — and the AG-3 recon report `docs/relay/PHASE-SOTA-HARNESS-RECON-1-AG3-report.md` (landed 2026-08-25) closes with a seven-item list titled "WHAT THE FIRST RUN NEEDS". ORDER C re-reads that list at this master.

## ORDER A — READ FIRST, the anchor and the referee
1. Read your box directly by `created_at` before anything else; act on any earlier row first.
2. `git fetch origin` in your worktree; `git rev-parse origin/master` must equal the `master` fence — else ON-DISAGREEMENT.
3. `gh pr list --state open --json number,headRefName,headRefOid` — print the raw output verbatim into an unanchored evidence fence in the report. An empty list is `[]`, printed; a refused or failed call is printed as its error text, never as `[]`.

## ORDER B — the internal scoreboard, printed not summarised
`npm run architect:open` at the fetched master. Paste its ENTIRE stdout verbatim into an unanchored evidence fence. Every field it prints as UNMEASURED stays UNMEASURED in your report with the reason it printed; you do not fill one in from another source. State the exit code unpiped. If the run exits non-zero, that is a finding, reported with the bytes, and the remaining orders still run.

## ORDER C — the external scoreboard, measured from the tree at this master
For EACH line of the `criteria` fence, run three lenses that could see DIFFERENT evidence, and print the command and its result for every lens, hits or none:
- lens 1 — `git grep -il '<benchmark name>' origin/master -- docs/ ':!docs/relay/PHASE-SOTA-HARNESS-RECON-1-AG3-report.md'` (name as spelled in the fence; also the ASCII spelling where the name carries a non-ASCII character);
- lens 2 — `git grep -il '<benchmark name>' origin/master -- 'docs/replay/' 'docs/ground/' 'scripts/' 'api/'`;
- lens 3 — `git log origin/master --format=%H%x20%ci -i --grep='<benchmark name>' -3`.
The verdict for a criterion is MEASURED only if a lens finds an artefact carrying a value, a named runner, a date and a commit for THAT criterion; print those four from the artefact, never retyped from a summary. Otherwise the verdict is ÖLÇÜLMEDİ with all three lens results shown (a single empty lens is not the verdict — the three together are). For E1 the verdict is BUILT or NOT BUILT by reading `api/cwf/_lib/honestbench/` and `docs/honestbench-harness-0-report.md`, with the "has any mode been scored" question answered from the harness report's own scoring table.
Then re-read the seven items of the recon report's "WHAT THE FIRST RUN NEEDS" list at this master, one named lens each (the Dockerfile and any deploy config for item 1; `git grep` for `A2A_TRIGGER_SECRET` / `A2A_ACTOR_USER_ID` / `A2A_CARD_URL` in deploy, workflow and env-example files for item 3; the honestbench container recipe and any publish workflow for item 4; and so on). Items whose only lens is a governed database row (item 5) or an owner decision (item 6) are printed NOT-READ with that reason — you do not read governed tables for this card.
Print the result as ONE table — criterion · verdict · lens results · artefact/runner/date/commit or the reason — followed by a second table for the seven harness items — item · still-open / closed-by-evidence / NOT-READ · lens. Two totals close the section, both computed from the tables above them and nowhere else: external criteria MEASURED out of sixteen; internal keys turned out of seven, copied from the ORDER B print.

## ORDER D — push the archive, documents repository
1. In the documents repository: `git rev-parse HEAD` must equal the `arch-tip` fence; `git ls-remote origin refs/heads/main` must equal the `arch-origin` fence (if it already equals `arch-tip`, someone pushed — STOP this order and report); `git rev-list --count origin/main..main` must print the count in the `scope` fence; `git diff --name-only origin/main..main` printed whole, every path under `Claude_Duzenli_Arsiv/S131/` or `Claude_Duzenli_Arsiv/S132/`; `git rev-parse HEAD~3` must equal the `arch-origin` fence (the parent read that turns "should fast-forward" into a measurement).
2. `git push origin main`; then `git ls-remote origin refs/heads/main` must equal local HEAD (S63-1 — the push's own output is not the evidence).
3. Nothing in this order touches cwf_yaprak.

## ORDER E — REPORT AND DELIVER
Branch `phase/sota-scoreboard-s132-1` from the fetched master; the report at the header path is the ONLY file. Push the branch; open the pull request to master (report-only: `docs/relay/` only, author AG-4 — it lands under OWNER-RULING-S131-REPORT-ONLY-DRAIN-1 by the foreman, never by you). Post ONE from_lane row `SOTA-SCOREBOARD-S132-1-AG4-report` whose body is the report. Print `read relay_inbox at <ISO>, box empty` or the rows you found.

## FALSIFIER
Wrong if a criterion is marked MEASURED without a value, runner, date and commit copied from an artefact in the tree; wrong if any lens result is omitted for a ÖLÇÜLMEDİ verdict; wrong if either total is typed rather than computed from its table; wrong if the architect:open print is summarised instead of pasted; wrong if `origin/main` after ORDER D differs from local HEAD or any pushed path lies outside the two archive folders; wrong if any benchmark is executed or any governed row is written.

## SHARED SURFACES
cwf_yaprak: the report file only, on its own branch. Documents repository `main`: one push. Bus: one from_lane row. No governed row, no seal, no migration.

## DECISION RIGHTS
None. The choice of the next product card belongs to the Architect under SOTA-1's ordering and is made from your report, not in it. Every finding is named, not repaired.

BODIES: SOTA-1 · TOTAL-45 · S63-1 · S66-1 · OWNER-RULING-S131-REPORT-ONLY-DRAIN-1 · OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1 · OWNER-RULING-S129-ARCHIVE-FIRST-1 · OWNER-RULING-S128-ARCHIVE-AUTOPUSH-1 · ARCHITECT-CARD-TEMPLATE-v2 · S132-OPEN-MEASUREMENT-2.

```deliverables
gh pr list raw output at ORDER A, verbatim
npm run architect:open stdout, verbatim, with exit code
one table: sixteen external criteria with verdict, three lens results, artefact or reason
one table: the recon report's seven first-run items re-read at this master
two totals computed from the tables: external MEASURED of sixteen, internal keys of seven
documents repository origin/main = arch-tip, proven by ls-remote read-back
docs/relay/SOTA-SCOREBOARD-S132-1-AG4-report.md on phase/sota-scoreboard-s132-1, pull request open
bus row from_lane SOTA-SCOREBOARD-S132-1-AG4-report, posted once
```

TAIL ANCHOR: CARD-SOTA-SCOREBOARD-S132-1-v1 ends here.
