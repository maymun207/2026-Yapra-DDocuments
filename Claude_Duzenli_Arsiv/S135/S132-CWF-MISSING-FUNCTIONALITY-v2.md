# S132-CWF-MISSING-FUNCTIONALITY-v2 — the same table, re-measured against master at S135, with two rows added, one row closed, and one inherited claim falsified

Written WHOLE at 2026-09-09T18:15Z (21:15 TSİ), on the owner's request to bring v1 to current state. v1 (2026-09-07T11:50Z) is NOT deleted and stays as the source of the "WHEN DONE, YOU WILL HAVE" column, which is unchanged wherever the item is unchanged — a governance artefact is written whole, never patched by string surgery (A-REC-S101-7).

WHAT MAKES v2 DIFFERENT FROM v1: v1's "state today" column was assembled largely from reports. v2's is measured against a clean worktree at master `b162d3a4b970cdbe6f20f0d64a547e505b03cee4` and against the live database, and every row names its instrument. Where v2 could not measure, it says UNMEASURED rather than carrying v1's word forward.

## THE OWNER'S QUESTION, ANSWERED FIRST

He asked: when the lanes finish what they hold, which list closes?

MEASURED ANSWER: the lanes finished while the question was being asked — pull request 524 merged into master at 2026-09-09T18:03:59Z as `b162d3a4b970cdbe6f20f0d64a547e505b03cee4` — and NO ROW OF THIS TABLE CLOSED, because the work was never a row in it.

That is the finding, not a technicality. The seam the lanes just repaired — a clarification that asks "which line?" after the user has already named the factory — was witnessed by the owner in production DURING S134, three days after this table was cut. A table written on Monday cannot contain a defect witnessed on Wednesday, and a table consulted as though it were complete is the stale-carrier class this house names as its dominant failure mode. v2 adds it as F23, already CLOSED@evidence, so the record shows both that it existed and that it is gone.

ONE ROW DID CLOSE since v1, and for a different reason: F1, the web valve, landed in S133 and the owner witnessed it live.

## THE TABLE

| # | item | WHEN DONE, YOU WILL HAVE (unchanged from v1 where the item is unchanged) | size | state at S135, with its instrument |
|---|---|---|---|---|
| F1 | **WEB-VALVE-1 · web_fetch** | An operator can paste a URL or name a page and CWF reads it, and every sentence from that page carries where and when it was read, so a customer can verify it. The valve is a switch YOU flip; off means zero reach to the internet. | M | **CLOSED@evidence.** MEASURED: `api/cwf/_lib/webTools.ts` present at master. MEASURED: `domain_rules` — `web.enabled` published at value 0, `web.maxBytes` 524288, `web.timeoutMs` 5000, all stamped 2026-09-08T11:38Z. Landed S133 (pull request 517) and witnessed live by the owner on the Vercel build. The valve has never been OPENED, and that is your decision, not missing functionality. |
| F2 | **WEB-VALVE-2 · web_search** | CWF answers "bu arıza kodu için üretici ne diyor?" without being handed a URL — it searches, reads, and cites. This is what makes DeepScholar-style research measurable end to end. | M | NOT STARTED. Depends on a provider key from you — one secret, asked once. |
| F3 | **RAG lane finish / retrieval baseline** | You can upload a plant's SOPs, manuals and quality procedures and ask questions answered FROM those documents with the passage cited. Your "KRİTİK" item; today the claim is unproven. | L | Reach-probe only. NOT RE-MEASURED at S135 — carried from v1 and marked as carried. |
| F4 | **B-FRONTIER-PAIRING-1** | You can say "CWF beats a bare model by X at equal cost" with a number rather than an argument. | M | NOT STARTED. |
| F5 | **GOLDEN-SET-REPLAYABILITY-1** | Every change is checked against the SAME questions your customers actually asked, and a regression shows up as a number before it ships. | M | PARTIAL, and better than v1 said. MEASURED: `golden_specimens` holds 20 rows, `golden_runs` 1, `golden_run_chunks` 400, and `api/cwf/_lib/replay/` carries a canary runner and lenses. What is missing is the FROZEN REPLAYABLE SET with scoring authored before results — not the machinery. |
| F6 | **OPA-POLICY-1 + FAULT-SWITCH-0** | Safety rules become a document a customer's IT can read and audit instead of code they must trust; when the policy engine is down CWF refuses rather than guesses. | L | RECON ONLY, confirmed by absence. MEASURED: a case-insensitive search for opa, open-policy-agent and rego across `api/cwf/_lib` returns nothing. Nothing is built. |
| F7 | **FAILURE-LESSON-MEMORY-1** | CWF stops repeating the same mistake for the same plant: a mis-routed name today becomes a remembered lesson tomorrow. | M | NOT STARTED. |
| F8 | **SILENT-FINISH** | A user never gets silence: every turn ends with the answer or an explicit "bunu yapamadım, çünkü…". | S | UNMEASURED. Still conditional on an evidence read; v2 did not perform it. |
| F9 | **Bilingual ask duplication** | A clean ask: one list, one language pair. Small, visible, customer-facing. | S | UNMEASURED at S135. MEASURED: no marker for it exists in the tree, so its state cannot be read from source — it needs a production repro. Note that the clarification path CHANGED under it today (F23), so the old repro may no longer reproduce. |
| F10 | **#81 BACKEND-DISCOVERY-1** | Onboarding a new factory becomes "point CWF at the backend" rather than a configuration project. | L | OPEN, untouched. Carried. |
| F11 | **A1 · long-lived host + deploy workflow for a2a/server.ts** | External benchmarks can reach CWF at all — today they cannot, because there is no reachable endpoint. | M | OPEN, confirmed by enumeration. MEASURED: master carries nine workflows — budget-fence, build-encoder-image, build-test, deploy-langfuse, ma-rerun, nightly-compat, relay-corpus, report-schema, vector-live-proof — and NONE of them deploys a2a. `Dockerfile.a2a` exists; the deploy half does not. Waits on your vendor call and spend. |
| F12 | **Reset precondition** | Runs are repeatable: a benchmark starts from a known state, so a score is a score and not a residue. | S | Capability in code; deploy half missing, because it rides F11. |
| F13 | **Census cadence runner** | The ground truth CWF cites about its own tools and backends is never older than an hour. | S | OPEN and WORSE than v1 recorded. MEASURED: `docs/ground/census.latest.json` at master carries `measuredAt 2026-08-25T03:42:15Z` — FIFTEEN DAYS stale against a SIXTY-MINUTE bound. v1 said thirteen days; the gap grows by one day per day because nothing regenerates it. |
| F14 | **MA-RERUN measurement runner** | The one internal metric CWF has ever measured can be re-measured any day by one click, with no credential in any lane. | S | **LANDING HALF DONE.** MEASURED: `.github/workflows/ma-rerun.yml` is present at master. The RUN half — dispatch, measurement, artefact — has NOT been measured as executed and stays open. |
| F15 | **honestbench publish endpoint** | The benchmark CWF authored — the only one measuring behaviour against a DISHONEST backend — is runnable by a stranger. | S | Blocked on your republish decision. Carried. |
| F16 | **BENCH-SMOKE-1 metering run** | You approve spend per round against a MEASURED number instead of a fixture estimate. | S | FIXTURE only. Carried. |
| F17 | **Kademe 4 · H9 / H10** | If CWF: every deploy proves itself after landing. If ADF: it leaves this table by ruling. | S–M | CARRIED-UNVERIFIED. Classification read still owed. |
| F18 | **#82b Design-RAG** | Engineers ask questions over drawings and specs the way F3 does over procedures. | L | PARKED by you. Unchanged. |
| F19 | **KB7 OEE false-empty** | A user never sees "no data" when there is data, on the clarification path too. | S | STILL OPEN, and now with a measured reason. MEASURED: its stated fix direction — promoting a resolved parent into the child layer's `parent_param` scope — is ABSENT from the clarification read path; `parent_param_name` appears only in `backends/entityDiscoverySync.ts`, the sync side. The production repro is still unmeasured, but the repair is measurably not there. |
| F20 | **PI-001 · artifact-name store, consumption arm** | Stored artifact names are actually USED by the turn, so the store stops being write-only. | S–M | **CONDITIONAL RESOLVED: THE ARM IS ABSENT.** MEASURED: in `api/cwf/_lib`, the only importer of the artifact-observations repository inside the turn path is `turn/artifactObservationFlush.ts` — the WRITER. The other references are the repository itself, its grants test, and four scripts (census, verifyGrants, groundContract, groundOrphans). Nothing reads it to answer a question. This is the CALLER-ABSENT class by name, and it is now a WIRING item rather than a question. |
| F21 | **VECTOR-QOS read + the QoS instrument** | A measured quality-of-service figure for vector retrieval that gates any future engine change. | S–M | OPEN, and the ordering is now measured. MEASURED: `vector.engine` is published at `qdrant`, stamped 2026-08-17T18:02:17Z, and `vector.enabled` at 1 the same minute. So the engine switch is TWENTY-THREE DAYS old and the QoS read it was supposed to follow has still not happened — the switch definitively predates any read. MEASURED: `scripts/vectorLiveProof.ts` and the `vector-live-proof` workflow exist, but a LIVENESS proof is not a QoS instrument: it shows the engine answers, not how well. |
| F22 | **Ground-doc refresh** | CWF's self-description matches the tree it runs. | S | OPEN. MEASURED: `docs/ground/facts.json` at master is stamped `generatedAt 2026-09-04T11:32:38Z` with `moduleCount 454` on a master five days newer. Whether the count itself has moved is UNMEASURED — I did not regenerate. |
| **F23** | **ENTITY-SCOPE-BY-RESOLVED-PEER — NEW ROW** | When a user names both a factory and a line, CWF stops asking "which line?" — it narrows the candidates by the parent the user already resolved, and it keeps asking only when the ambiguity is real. This is the defect the owner witnessed himself in production. | M | **CLOSED@evidence, TODAY.** MEASURED: `narrowAmbiguousByResolvedPeer` is defined at `stageClarify.ts:330` and CALLED at line 736 at master; merged as `b162d3a4b970cdbe6f20f0d64a547e505b03cee4` (pull request 524) at 2026-09-09T18:03:59Z. Added to the table and closed in the same version, because a table that never records what it missed teaches nothing. |
| **F24** | **GRAPH-KB WIRING — NEW ROW** | The containment graph CWF has already DISCOVERED (2503 live edges, each stamped with the tool that saw it) starts answering questions instead of only being collected — the same class of repair as F23, one layer deeper. | M | OPEN, CALLER-ABSENT. MEASURED: `GraphKbReader.containsAmong` and `parentsOf` exist and are the exact question the failing turn asks, and the ONLY file in `api/cwf/_lib` that mentions either is `GraphKbReader.ts` itself. The mechanism is built, granted, tested and never called. This is a WIRING card, not a build card, and the card must say so. |

## ONE INHERITED CLAIM, FALSIFIED — reported rather than quietly dropped

The v135 bootstrap's section 5 lists **A23-COLLAPSE** as open, quoting `if (res.kind !== 'resolved') continue;` in `stageClarify.ts` as the line that destroys `candidateEntityIds`.

MEASURED: that line does not exist at master. It was repaired on 2026-08-28 by AG-3 in commit `03f5a7de`, "PHASE-A23-ASK-SHAPE-BUILD-1 AG-3: the system stops saying I found none when it found three", and the source now carries an explicit comment at line 681 reading "THE COLLAPSE ENDS HERE", with the ambiguity written into the shared map under governed-alias precedence.

So the bootstrap carried a claim about a line that had been dead for twelve days. It is the same class as F13's growing staleness and as the "21 untracked" count this session already had falsified by the scout: A NUMBER OR A QUOTE THAT PASSES BETWEEN CARRIERS WITHOUT BEING RE-DERIVED. It is recorded here so the next bootstrap does not carry it a thirteenth day.

## WHAT THE ARCHITECT PROPOSES NOW — one order, and it changed because of what was measured

1. **F24 GRAPH-KB WIRING.** It is the direct neighbour of what just landed, the mechanism already exists, and it is the cheapest remaining product improvement per unit of effort. A wiring card, and the card says so.
2. **F13 + F22 ground-truth cadence.** Small, and the reason has hardened: the census is fifteen days stale against a sixty-minute bound and gets worse daily. Every card built on it inherits the staleness.
3. **F14 run half.** The workflow is on master; running it costs one dispatch on a branch ref, which is not a master push and needs no second approval from you.
4. **F5 GOLDEN-SET.** More of it exists than v1 believed; what is missing is the frozen set with scoring authored first. Everything later is proven against it.
5. **F3 RAG finish.** The commercial claim, and the largest value per effort once F5 exists.
6. **F2 WEB-VALVE-2**, once you place the provider key — F1 is closed, so its dependency is satisfied.
7. **F11 + F12 + F16** — the benchmark reach, reset and metered cost, which unblock the external criteria and wait on your vendor package, asked once.
8. **F6 OPA** — the safety leadership claim; large; after the round's plumbing exists.
9. **F7, F10** — learning and discovery.
10. **F19, F20** — both moved out of "conditional" this session and are now named gaps with measured absences; small enough to ride alongside anything above.
11. **F8, F9, F17, F21** — evidence reads first; each becomes a card only if the read says so. F21's read is the oldest debt on this list.
12. **F15** on your republish decision; **F18** on your word.

TAIL ANCHOR: S132-CWF-MISSING-FUNCTIONALITY-v2 ends here.
