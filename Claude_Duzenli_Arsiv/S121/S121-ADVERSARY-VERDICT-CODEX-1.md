# S121 · ADVERSARY VERDICT — CODEX-1

Verdict: **REFUTED**.

Standard applied: where the document asserts a fact, conclusion, authority boundary, or plan consequence without showing the measurement that supports it, I treat it as unproven. Where a conclusion rests on one lens, I treat it as refuted until a second lens with different assumptions checks it.

Target: `S121-OPEN-MEASUREMENT-v1.md`.

---

## 1. Claims Asserted Without A Measurement Behind Them

Line 3-5: "Fresh clone ... live database ... connected archive folder" and "Nothing below was carried from memory; every line names how it was taken."
Attack: this is a global self-certification, not a measurement. The document does not attach the clone command, clone remote, archive path, DB query transcript, or per-claim evidence map. One measured table later does not prove "every line".

Line 7-8: fresh clone/live database "win" over any carrier.
Attack: this is a rule of precedence, not a measured result. The document does not prove the clone, database, and archive are mutually consistent worlds or that the database is authoritative for each disputed class.

Line 14: "Restated verbatim from `docs/laws/constitution/SOTA-1.md` at `cd8261ef`."
Attack: no hash, command output, file line reference, or diff proves verbatim copying. The quotation may be correct, but the document makes the reader trust the author.

Line 27-28: `enforcement: ADVISORY` and owner-held source wording.
Attack: asserted metadata without a shown read of the law record or owner-held source.

Line 36-41: anchor table.
Attack: these rows name commands but do not show outputs. The table is better than naked assertion, but it is still a summary of measurements, not the measurements. The "gates 47 of 47" claim is especially compressed: it names two suites but not the command, commit, exit code, or log excerpt.

Line 43-47: "whole local suite" and "trunk is green under a lens 347x wider."
Attack: no command line, no exit code, no test runner log, no expected-fail identities. The multiplier also depends on treating "anchor's two files" as the denominator, while 695 / 2 = 347.5, not exactly 347.

Line 49-52: `architect:open` fields and GitHub proxy gate.
Attack: this reports failures and a 403, but does not show the requested fields, command/API path, response body, or why "repository not enabled for this session" proves a proxy gate rather than auth/session configuration.

Line 58: "Every one is a claim that was true when written, went stale or was refuted, and kept being obeyed."
Attack: no measurement proves the claims were true when written, that they were obeyed, or that obedience continued after staleness.

Line 62-65: bootstrap quotation.
Attack: the quote has no path, hash, or line anchor for the bootstrap file being quoted.

Line 67-78: "Both are refuted by measurements..." and the three supporting bullets.
Attack: the bullets cite other reports and their conclusions, but do not reproduce the measurements. The public endpoint, public repository, implemented adversary modes, "five dials," and "three files" are all second-hand in this document.

Line 79-81: "two of the three exist" and the deterministic scorer does not.
Attack: conclusion asserted from cited reports, not measured here. The document does not inspect the current repo tree or public endpoint for the two existing parts, nor the codebase for absence of a scorer.

Line 83-86: "worst possible carrier," "minted last," and "would have rebuilt a harness that exists."
Attack: rhetorical conclusion and counterfactual. No measurement shows a card would have been cut or a harness rebuilt.

Line 90-91: bootstrap/session close "state the factory is shut down."
Attack: no line anchors or quoted close document. The attacked carrier is not independently measurable from this report.

Line 102-105: no death-certificate database half exists; mode row means "factory is open and fully staffed."
Attack: the table supports current row values, but not the larger death-certificate model. The cited memory seed section is not quoted or measured. "Fully staffed" is an interpretation of five stale/non-stale lane rows, not a measured operational fact.

Line 107-109: "Any window opened now will claim."
Attack: prediction from `producer.md` plus DB state, with no dry run, source line, or check of the claim path's current code. The existing dead nonce could change the behavior.

Line 113-118: seed says the cure is a phase; phase landed; function exists.
Attack: `pg_proc` existence proves a named function exists, not that the phase landed completely or that the remedy works.

Line 120-122: function behavior and "deadlock is remedied."
Attack: behavior is asserted without showing function definition, permissions, RLS interaction, or an execution probe. Existence is not a behavioral measurement.

Line 126-128: handover census and bootstrap stop-card claims.
Attack: quoted/cited without file hashes or line anchors.

Line 135-136: AG-1 will read READY/work card/no stand-down if continued.
Attack: this is a future path claim. It is not measured unless an AG-1 continuation or exact producer read sequence is shown.

Line 142-143: report section is "primary, landed."
Attack: no path hash, commit, or line citation proves this source was read from trunk or that it is primary.

Line 145-154: honestbench precondition table.
Attack: imported from another report, not remeasured. "exists? no" and "owner" classifications are conclusions, not measurements, unless the underlying frozen text, backend data rows, scorer code, and governance records are read.

Line 156-158: lane sentence quoted.
Attack: quote has no line anchor or hash.

Line 160-163: four nearest blockers are Architect rulings, need no factory/window/branch/spend.
Attack: conclusion rests on the imported table. "Need no spend" is especially unmeasured: reading, ruling, review, and publication can spend time, attention, and possibly tokens.

Line 165-166: items 3-6 gate scoring, not running.
Attack: quoted from a report, not checked against scorer implementation or planned run flow.

Line 172: S121 spends itself on four rulings and does not reopen the factory.
Attack: a plan/commitment, not a measurement.

Line 174-177: satisfies the binding rule; `mcp-honestbench` is one of sixteen at 0/16; costs nothing; unblocks scorer.
Attack: no read of `cwf-sota-definition-v1_5`, no scoreboard evidence, no dependency proof, and no cost model. "Costs nothing" is false unless "cost" is narrowly defined, and that definition is absent.

Line 179-181: removes the shape of the S120 failure; no queue can form.
Attack: asserted by analogy. A queue can form around rulings, review, publication, or downstream build cards even without producers waiting in windows.

Line 183-185: one card/single address and a verified fix in seventeen minutes.
Attack: no source for the seventeen-minute precedent, no proof that this future card has comparable scope.

Line 191: factory was stopped deliberately; restarting is owner's alone.
Attack: no owner instruction, authority record, or death-certificate source is quoted.

Line 192-194: fourteen branches carry only reports; `context-retrieval-1` plus `-organ` are 26 commits / 40 code files.
Attack: branch census not shown. "Advance nothing" is a conclusion needing criteria, not a measurement.

Line 195-197: corpus gate and four exempted files are factory items; owner consented in S120.
Attack: no consent text, line anchor, or factory-item rule is shown.

Line 198-201: database death certificate is outside Architect surface, needs one-off consent, is not urgent until a window opens.
Attack: authority and urgency conclusions without source lines or risk measurement.

---

## 2. Single-Lens Conclusions And Required Second Lenses

Line 43-47: conclusion: the trunk is green under a much wider lens than the anchor.
Single lens: local test suite.
Second lens required: run or inspect the non-test operational surfaces the document relies on: live DB state, relay bus state, GitHub/session access, public endpoint reachability, and archive consistency. A green local suite does not validate those.

Line 49-52: conclusion: the 403 confirms the proxy gate.
Single lens: one direct GitHub API failure.
Second lens required: check connector/session permissions or GitHub app enablement from an independent control plane. A 403 can mean several things.

Line 79-81: conclusion: two of harness/fixture/scorer exist; only deterministic scorer is absent.
Single lens: previously landed reports.
Second lens required: inspect current repo files and public HTTPS endpoint now, then separately search the repo for scorer implementation/registration.

Line 90-105: conclusion: the factory was never shut in the database and is effectively open.
Single lens: live `factory_state`.
Second lens required: read the owner machine/window state, relay stop-card consumption path, and heartbeat freshness semantics. A database row can be stale, and an operational stop can exist outside the DB.

Line 107-109: conclusion: any new/continued window will claim.
Single lens: static interpretation of DB state plus `producer.md`.
Second lens required: execute a safe dry-run or trace the actual claim code with the current row/nonce state. The dead nonce may produce a refusal instead of a claim.

Line 115-122: conclusion: factory recovery remedied the deadlock.
Single lens: `pg_proc` function existence.
Second lens required: inspect function body and run a transaction-scoped behavioral probe proving the intended `CLAIMED -> CLAIMED` nonce swap, refusal modes, and event write.

Line 130-136: conclusion: AG-1 is uniquely dangerous because it has no stop card.
Single lens: current unconsumed `relay_inbox` rows.
Second lens required: check all instruction channels AG-1 reads, including consumed cards, local window state, producer bootstrap, and direct owner/operator messages.

Line 160-166: conclusion: four nearest blockers are Architect rulings and gate scoring only.
Single lens: `PHASE-HONESTBENCH-SCORER-DESIGN-2-AG3-report.md`.
Second lens required: read the frozen conditions directly and compare them to scorer code/acceptance tests. The report's owner labels are not self-proving.

Line 172-177: conclusion: the one path for S121 is rulings and it unblocks the scorer.
Single lens: SOTA/order interpretation.
Second lens required: dependency graph from scorer execution backward: which missing artifacts actually block a successful scored run, and whether items 3-6 are sufficient.

Line 179-185: conclusion: ruling work avoids S120 queue failure and a later single-card build is proven by a seventeen-minute precedent.
Single lens: analogy to S120 and one anecdotal delivery.
Second lens required: measure the expected ruling workload and compare historical single-address cards of similar scope, not just one success case.

Line 191-201: conclusion: not writing the DB death certificate is acceptable for now.
Single lens: Architect-surface/owner-consent authority model.
Second lens required: operational risk lens: probability and consequence of an accidental window opening while the DB still says `READY`.

---

## 3. Conclusions That Collapse If A Stated Number Is Wrong

Line 43-47: "lens 347x wider" collapses if **695 test files** or **2 anchor files** is wrong. It is also numerically imprecise as written: 695 / 2 = 347.5.

Line 37: anchor confidence in repository shape collapses if **90 remote branches** is wrong, or if the decomposition **5 lane / 82 phase / 2 probe / master** is wrong.

Line 38-39: relay-anchor confidence collapses if **289 relay markdown files** or **82 frozen exemption entries** is wrong.

Line 41: "gates 47 of 47" collapses if either component count is wrong: **37/37** relay audit tests or **10/10** archive push tests.

Line 79-81: "two of the three exist" collapses if the count **two** is wrong. If either harness or fixture is not currently reachable/implemented, the conclusion reverts to the bootstrap's warning.

Line 88-109: "factory is open and fully staffed" collapses if the count **five lane rows** is wrong, if any listed state is wrong, or if heartbeat freshness invalidates those rows.

Line 130-136: "AG-1 has no stop card" collapses if **four stop cards** is wrong or if the recipient list is wrong. One missing row in the query changes the unique-risk conclusion.

Line 145-160: "four of eight nearest blockers are Architect rulings" collapses if **eight preconditions** is wrong, or if any of items **3-6** is misclassified.

Line 174-177: "only queued item that moves the external scoreboard" collapses if **0/16** is wrong or if `mcp-honestbench` is not actually one of the sixteen zeroed criteria.

Line 179-181: "no queue to form" depends on **four rulings** being the full S121 workload. If the number of required rulings is wrong, the no-queue conclusion is unsupported.

Line 183-185: the single-card optimism collapses if the **seventeen minutes** precedent is wrong or non-comparable.

Line 192-194: the branch-freeze decision collapses if **fourteen report-only branches**, **26 commits**, or **40 code files** is wrong. Those numbers are the only apparent basis for treating the branches as a deliberate freeze rather than an unresolved merge queue.

---

## 4. What The Document Does Not Say But Readers Will Wrongly Assume

It does not say the exact commands, raw outputs, exit codes, or query texts for most measurements. Readers will assume the summarized tables are reproducible evidence.

It does not say where bootstrap v120, the session close, `S120-HANDOVER-CENSUS-v1`, `v32`, or the honestbench scorer report live, nor their hashes. Readers will assume those carriers were read correctly and cannot have drifted.

It does not say whether the fresh clone, live database, and connected archive were all from the same deployment epoch. Readers will assume one coherent world.

It does not say how the Supabase MCP surface was scoped or authorized. Readers will assume it sees the same database truth as production and is not privilege-filtered.

It does not say the SQL used for `factory_state`, `relay_inbox`, or `pg_proc`. Readers will assume the filters were complete and did not hide rows.

It does not show the body or permissions of `factory_reclaim`. Readers will assume function existence equals a working remedy.

It does not say whether the public honestbench endpoint was probed during S121. Readers will assume "public endpoint" is current live reachability, not a carried report claim.

It does not define "costs nothing." Readers will assume no money, no owner time, no token spend, no review cost, and no coordination cost.

It does not prove AG-1 lacks stop instructions outside unconsumed relay cards. Readers will assume "no stop card" means "no stop order anywhere."

It does not identify the four expected-fail tests in the whole suite. Readers will assume expected failures are irrelevant to S121's claims.

It does not quantify the risk of leaving the database death certificate unwritten. Readers will assume "not urgent" is measured rather than judged.

It does not state what would falsify the chosen S121 path. Readers will assume the conclusion is already forced by evidence, when several dependencies are imported from unverified carriers.

Final adversarial holding: the document contains useful measurement-shaped material, but its central decision -- that S121 should spend itself on four Architect rulings and not reopen/write factory state -- is not proven by the measurements shown. It is therefore **refuted** under the requested adversarial standard.
