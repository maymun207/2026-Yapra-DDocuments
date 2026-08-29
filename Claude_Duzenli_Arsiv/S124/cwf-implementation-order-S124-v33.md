# CWF IMPLEMENTATION ORDER — S124 → v33

<!-- SUPERSEDES v32 (S120). Written WHOLE (A-REC-S101-7). ⚠ DERIVED VIEW, not a second source of
     truth: the binding carriers are the open-items ledger (docs/ground/open-items.md, 65 items at
     the anchor) and cwf-sota-definition v1_5. On conflict THEY win. SOTA-1 governs: nothing
     SOTA-relevant defers without (a)+(b)+(c) in writing.
     v33 EXISTS FOR THREE REASONS: (1) the owner asked for one final pass over the whole historic
     list (v4→v15 pasted back by his hand) against the measured tree; (2) S122+S123 closed two of
     v32's headline blockers and v32 does not know it; (3) THE OWNER CAUGHT A DROPPED ITEM — the web
     valve — and the sweep it triggered found it was not alone. -->

## §0 · OWNER RULINGS THIS VERSION CARRIES (named, S112-YASA-1)

**OWNER-RULING-S124-2AG** — the factory runs at TWO AGs (one producer, one scout) until further
ruling; 5–6-lane infrastructure does not exist and is not repaired now; the whole factory-infra
debt class moves to the ADF split, to be solved there with a clean architecture.

**OWNER-CATCH-S124-WEBVALVE** — the owner asked, from his own list: *"web valfinin de yapıldığını
düşünmüyorum, onun da listede olması lazım?"* Measured: he is right on both halves. §3 finding.

## §0a · CARRY-DIFF FROM v32 — what moved, and the measurement that moved it

| v32 item | v32 said | v33 says | measurement |
|---|---|---|---|
| **A4b** deterministic scorer | "the REAL blocker, BUILD WORK, NOT BUILT" | **CLOSED@evidence** | PR #472 landed on trunk in S123 (`8a19fe8a…`); scorer + design reports in `docs/relay/` at the anchor |
| **B6** `#29` A23 ask-shape | build owed; ask shape before carry-through | **BUILD LANDED**; ledger closure OWED | PR #479 (`3aab649d…`, nine files, +1426/−47); `GI-101` still OPEN in the ledger — closing it needs one reading (#479 vs the row's sentence) + the owner's `#29` PI-001/GI-101 collision ruling |
| **Z1/Z2** red trunk + gate hole | nothing lands until repaired | **CLOSED by landing-evidence** | two trunk landings passed the build gate in S123; a red trunk cannot have admitted them |
| **A1** long-lived host | owner decision blocked on an unmeasured VM restart | **FLOOR MEASURED, vendor call OWED** | `S123-A1-RUNTIME-FLOOR-v1` cut in S123; the decision now has its number |
| internal counter | 6/7 | **6/7 + pending closure** (see B6) | ledger read at the anchor |
| external contract | 0/16, blocker moved to a named buildable item | **0/16, and the named item is now DONE — the remaining blockers are A1/A2/A3/A5, all owner-or-operator surface, none build** | §2 |

**NOTHING FROM v32 IS DELETED.** Everything not named above carries unchanged.

## §1 · THE SEVEN KEYS — enumerated once, with their turn evidence

`#2` LEARNING-SNAPSHOT-1 (S93) · `#10` TOOL-BEHAVIOR-CENSUS-1 (S96) · `#16` BENCH-BACKEND-MOUNT-1
(S98) · `#18` BENCH-A2A-1 (S99) · `#23` PB-FULL-1/PathB (S100) · `#25` GRAPH-KB-1 (motor S103, key
turned post-S103) · `#29` A23 (build LANDED S123; ledger closure pending — the honest tally is
**6/7 + pending**). Turning the seventh does not satisfy SOTA-1; the counter is readiness, not
acceptance.

## §2 · TRACK A — THE MEASUREMENT PATH (this is the CWF work, in order)

| # | item | state | what remains |
|---|---|---|---|
| A0 | GI-101 closure reading + `#29` collision ruling | OWED | minutes of reading + one owner ruling; closes board (A) honestly |
| A1 | long-lived public host for the A2A server | FLOOR MEASURED (S123) | **owner vendor call + spend** |
| A2 | credential set (`A2A_TRIGGER_SECRET` · `A2A_ACTOR_USER_ID` real uuid · `A2A_CARD_URL`) + ARMES key ROTATION (v124 §5) | OPEN | **owner hand, env-only** |
| A3 | Operator's two rows (`backends` identity + `mcp_global_settings`) | UNBLOCKED since v32 | one Operator window |
| A4 | honestbench public endpoint | CLOSED (v32) | — |
| A4b | deterministic scorer | **CLOSED (S123, PR #472)** | — |
| A5 | spend authorisation | OPEN | **owner**; comes with BENCH-SMOKE-1's metered actuals, not an estimate |
| A6 | FIRST EXTERNAL MEASUREMENT | blocked only by A1–A5 | which criterion first is an OUTPUT of A1–A5; Tier E (honestbench) is nearest |

**Everything in Track A that is not an owner surface is DONE.** That sentence was not true in any
prior version of this document.

## §3 · THE OWNER'S SWEEP — dropped items, measured and restored

Census method: for each item of the historic walk (v4→v15), does a `docs/relay/PHASE-<name>*` report
exist at the anchor, and does code match? Results, and where each item stands now:

**BUILT since the historic lists were cut** (report + code at the anchor): `#14` ROUTE-ASK-1 · `#12`
METRIC-VOCAB-DISCOVERY-1 · `#65` MERGE-FIELD-AWARE-1 · `#66` VECTOR-ONBOARD-DRIP-1 · PLANNER-0
(+FIX-1) · `#24` LINE-RESOLUTION-DIAGNOSIS-1 · `#21` DISCOVERY-EXTEND-2 · `#22` CORPUS-LINE-FILL-1 ·
`#26` LLM-SCAN-BASELINE-1 · `#13` PACK-FROM-PROTOCOL-1 · `#17` HONESTBENCH-HARNESS-0 · `#19`
BENCH-RESET-1 · `#20` BENCH-SMOKE-1 — plus the four keys' phases and the A2A SDK adoption.

**RECON ONLY, build NOT started:** `#28` OPA-POLICY-1 (recon reports landed; the three D-OPA
criterion legs are UNBUILT) · `#34` AGENTBEATS-INTEGRATION-1 (recon reports only).

**`F-S124-SOTA-QUEUE-ITEMS-OFF-LEDGER-1` — the finding the owner's question uncovered.** The
following are SOTA-bound, have ZERO phase report and ZERO code at the anchor, **and appear in no row
of the 65-item ledger**. They fell off the carrier somewhere between the S103-era registers and the
S111 ledger rebuild, and nothing red-flagged the absence — the exact class §10's "PROJE KAPSAMI"
gates exist to prevent, one carrier over:

| item | binds to | historic id |
|---|---|---|
| **WEB-VALVE-1** | **F2 DeepScholar-Bench** (R7): "a web valve whose output cannot be verified is worse than no valve" | 2B.2 — the owner's catch |
| **B-FRONTIER-PAIRING-1** | §4 comparison set row 1; §10 has a literal B-FRONTIER row; R5 equal-cost cannot be retrofitted | `#33` |
| **GOLDEN-SET-REPLAYABILITY-1** | precondition of the first score round (K3 ruling) | `#37` |
| **EVAL-SPLIT-LAW + first measurement round** | the opening law of Block 3 | `#30` |
| **FAILURE-LESSON-MEMORY-1** | S98-L5 | `#48` |
| **RAG lane / F1 LLM-scan retrieval baseline** | **F1 BrowseComp-Plus** (R9, owner: "KRİTİK") — only a REACH-PROBE report exists; the governed baseline has never been run (v32 §4 confirms) | 2B.1 |
| SILENT-FINISH | — (defect class; may have been absorbed by turnLanguage work — UNMEASURED) | `#59` |

**Disposition:** each re-enters the ledger BY NAME at the next ledger write (a lane's work, appended,
never renumbered — S103-YASA-1). None may be re-dropped silently: they now also live in this table,
and this table names its sweep method so the next sweep is reproducible. Ordering: WEB-VALVE-1, the
F1 baseline, B-FRONTIER, GOLDEN-SET and EVAL-SPLIT are all **measurement-round furniture** — they
slot between A5 and A6, exactly where the historic lists always had them ("kapı açıldığı gün soru
yok, sıra var"). FAILURE-LESSON and SILENT-FINISH are product items behind them.

## §4 · TRACK B / CARRIED — unchanged triggers, plus the S124 harvest

`MA-RERUN-2` stays out of the queue (STALE marking rides the v1_6 amendment, which is cut when a §10
row moves by evidence, not before) · `VECTOR-QOS` before any engine switch (owner verbatim; whether
it landed first is still a measurement OWED) · `#82b` Design-RAG PARKED ("ASLA UNUTMA") · `#81`
BACKEND-DISCOVERY-1 unblocked, ordinary work · `PI-029` Yol B valve — a consent switch, not code ·
Qdrant owner surface, org repo migration, census cadence: carried · `RULE26-HARDEN-1` → v1.1 (R8) ·
budget fence: watch, no action; STANDING EXCEPTION unchanged · canary FROZEN by ruling.

**ADF/factory class (moves to the ADF split under OWNER-RULING-S124-2AG, names kept):** the S118
claim deadlock steel's exercise record · heartbeat own-address guard (F-S124) · CP-6 band [1-4] ·
CP-8/UUID collision · supersedes-fence erosion floor · producer-boot highest-version rule · the
unskippable pre-dispatch preflight hook (argued for three times in one S124 morning) · candidateNotice
note-column bug · RELAY-BUS-2 · GATE-1's ⑤ steel · the merge-queue/org items · plus the rest of the
61 OPEN ledger rows that name factory machinery.

## §5 · THE TWO SCOREBOARDS — stated once more, because every close must

**(A) internal 6/7 + pending closure** — readiness, not acceptance. **(B) external 0/16** — the only
board SOTA-1 accepts, unchanged since 2026-08-04. What v33 changes is the shape of the distance: for
the first time, **every remaining blocker of (B)'s first row is an owner surface or an Operator
window, not a build.** The order refuses, as v32 did, to schedule an ADF scoreboard, to put build in
front of measurement it does not block, to carry unmeasured numbers, or to manufacture owner-gates —
and adds one refusal: **it does not let an item leave the list by silence.** Items leave by evidence,
by supersession, or by a named owner ruling. The owner caught the web valve; the table now carries
the sweep that catches the next one.

TAIL ANCHOR: cwf-implementation-order-S124-v33 ends here.
