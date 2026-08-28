# S123 · CWF — WHERE WE ACTUALLY ARE, AND WHAT REMAINS TO 100 % · v1
MINTED 2026-08-28, S123, at the owner's request: *"elimizde ne var onu bir masaya yatıralım, ne yapıyoruz, CWF 100% component tamamlanması için ne durumdayız ve planımız nedir."*

**READ THE TAGS BEFORE THE NUMBERS.** Every figure below is either `MEASURED` — run this session, from a fresh clone at the anchor or from the live database — or `CARRIED` — taken from an earlier document and **not** re-derived. The dominant failure mode of this factory is a number that moved between carriers without being re-measured (`F-S122-STALE-COUNT-CLASS-IS-SUBSTRATE-INDEPENDENT-1`), so the tag is part of the fact.

---

## 1 · WHAT "100 % COMPONENT" MEANS — IN THE OWNER'S OWN WORDS, NOT THE ARCHITECT'S

The definition is already on the trunk, in `docs/ops/CANARY-FROZEN.md`, recorded verbatim on 2026-08-27:

```evidence:owner-words
"CWF nin tum componentlari 100% bitene kadar CANARY PERMANETLY IPTAL!"

THE ONE THAW CONDITION:
"Anlama katmani bitti SOTA benchmark testlerine haziriz noktasina geldigimzide
 bana ancak CANARY sozunu edebilirsin."
```

So "100 %" is not a vague target. It has **two named halves**, and both come from him:

* **THE COMPREHENSION LAYER IS FINISHED** — `anlama katmanı`. In the ledger this is `GI-101` / `PI-001`, legacy `#29`, the **A23 UNDERSTANDING LAYER**, and the ledger's own line calls it *"the SOTA key"*.
* **WE STAND READY FOR THE SOTA BENCHMARK TESTS** — the harness, the host, the credentials and the spend, such that the first external criterion can actually be run.

Everything in §4 is ordered against those two halves and nothing else. An item that serves neither is not on the path to 100 %, and this document says so where it applies.

---

## 2 · THE THREE SCOREBOARDS — AND WHICH ONE THE OWNER'S QUESTION IS ABOUT

| board | what it measures | value | tag |
|---|---|---|---|
| **(B) acceptance contract** — `cwf-sota-definition-v1_5` §10 | the REAL product, sixteen external criteria | **0 / 16** | `CARRIED` from v121/v122 — the contract document itself says ÖLÇÜLMEDİ on every row and was last amended 2026-08-04 |
| **(A) internal seven-key counter** | internal readiness, NOT acceptance | **6 / 7** | `CARRIED` — open key is `#29` A23 |
| **(C) ADF exit test**, six criteria | is the factory drivable without the owner's hands | **2 / 6** | `CARRIED` from S118 |

**SOTA-1 binds acceptance to (B) alone.** Turning the seventh key does not satisfy it. But the owner's 100 % sentence is broader than (B): it names the comprehension layer — which is (A)'s open key — **and** readiness for (B). So his target is *(A) closed **and** (B) startable*, not *(B) measured*. That distinction is what makes the plan in §5 finite.

**NEITHER (A) NOR (B) WAS RE-MEASURED THIS SESSION.** Both are carried, and both should be re-derived before either is quoted in a decision. Naming that is part of the answer, not an evasion of it.

---

## 3 · WHAT IS MEASURED, RIGHT NOW, AT THIS ANCHOR

```evidence:anchor
master  b86850250cb3d845ff5be5edc425e3304e0dc72f   (verified on the wire and in a fresh clone)
```

**THE TRUNK IS GREEN. MEASURED, THIS SESSION, BY RUNNING IT.**

```evidence:trunk
npm run build        exit 0  — tsc -b, typecheck:api, gen:arch-facts, check:ground, vite build, check:doc-drift
npm run check:ground GREEN   — contract shape + ancestry over 4 artifacts, front-matter over 6,
                               regeneration identity MATCH over 131798 canonical bytes,
                               census.log.jsonl append-only intact
npm run report:check OK      — 28 reports conform to REPORT-SCHEMA-v1
check:doc-drift      OK      — 7 narrative tabs synced
vitest               STILL RUNNING at the time of writing — result reported separately, never assumed
```

This matters because the standing implementation order (`v32`, S120) opens with **"Z1 · THE TRUNK IS RED"** and makes that the item nothing lands behind. **That sentence is no longer true.** The repair landed; `phase/trunk-green-land-1`, `phase/arm-corpus-gate-1`/`-2` and the corpus repairs are on master.

**THE FACTORY IS OPEN, NOT STOPPED.** Factory mode `READY`; five producer windows alive with fresh heartbeats; scout confirmed live by output — three windows answered three review rounds in under thirty minutes this session. `MEASURED` from `public.factory_state` and from the bus.

**THE LAW CORPUS.** `MEASURED`: 16 constitutional records, 59 numbered rules. The ledger's own `GI-009` still says "fifty-five rules and fifteen constitutional records" — stale in the ledger, correct in the tree.

**THE OPEN-ITEMS LEDGER.** `MEASURED` with the gate's own grammar: **65 items, 61 OPEN**, four sections — PARK 3 · NÖBET 5 · SAYILAN PAYDA 7 · PROJE KAPSAMI 50. The file sits **exactly** on its byte floor, zero slack.

---

## 4 · THE CORRECTION THAT CHANGES THE PICTURE: THE HARNESS IS BUILT

`cwf-sota-definition-v1_5` §6 names three items and says they **block fifteen of the sixteen criteria**. That section was written 2026-08-04. **All three landed within ten days of it, and the contract was never amended to say so.**

```evidence:harness
from docs/ground/facts.json phaseLedger, and confirmed by the files in the tree:
  2026-08-12  PHASE-BENCH-SMOKE-1            the cost-metering instrument   scripts/benchCostPreview.ts
  2026-08-13  PHASE-BENCH-RESET-1            fresh-state reset              api/admin/bench-reset.ts
                                             + benchResetScope.test.ts, benchResetEndpoint.test.ts
  2026-08-13  PHASE-BENCH-BACKEND-MOUNT-1    a backend earns its promotion  api/admin/backend-verify.ts
  2026-08-13  PHASE-HARNESS-HONESTY-GATE-1   a pass proves it could have failed
  2026-08-14  PHASE-BENCH-A2A-1              CWF becomes an A2A purple agent
  2026-08-14  PHASE-A2A-SDK-ADOPT-1          the wire is the official SDK's
  2026-08-07  PHASE-FAULT-SWITCH-0           D-OPA-3's instrument
the A2A server itself, in the tree, eight modules:
  a2a/server.ts  agentCard.ts  executor.ts  runTask.ts  config.ts
  machineAuth.ts  responseSink.ts  spendFence.ts   +  Dockerfile.a2a
```

**SO THE HONEST SENTENCE IS NOT "NOTHING IS BUILT". IT IS: THE INSTRUMENT IS BUILT AND HAS NEVER BEEN PLUGGED IN.** What separates CWF from its first external number is not code. It is a **host, two secrets, two data rows and a spend authorisation** — and of those, three are the owner's hand and one is an Operator window.

`⚠ ONE CAVEAT, NAMED:` `facts.json` was generated 2026-08-20 and is `ANCESTRAL`, so the phase ledger above is a record up to that date, not up to today. The file evidence beside each line is current; the dates are the ledger's.

---

## 5 · WHAT REMAINS, IN THE OWNER'S TWO HALVES

### HALF ONE — THE COMPREHENSION LAYER (`#29` A23), THE SEVENTH KEY

**The design is done and it landed on 2026-08-26.** `PHASE-A23-ASK-SHAPE-DESIGN-1-AG4-report.md` is on master, and it is a design only: *"No product source is edited; the repair is a separate card."* Its decisive measurement, in its own words: the tied rows are **byte-identical in every field a user can read** and differ **only in the parent they hang from** — and the parent is dropped in the clarify stage's own candidate map.

`PHASE-A23-THIRD-VALUE-DIAGNOSE-1-AG4-report.md` landed the same day and carries the other half of the diagnosis.

**WHAT IS MISSING IS THE BUILD CARD.** And the ordering constraint is hard, recorded in `v32` B6 and confirmed by the design: **the ask shape must exist before the carry-through lands**, or the repair converts a badly-worded question into silence — which is worse than today.

**This is the item that closes the owner's first half, and it is buildable now.** It advances TIER A · Gaia2 (the clarification gate), so SOTA-1 protects it from deferral.

### HALF TWO — READY FOR THE BENCHMARK TESTS

| # | item | who | state |
|---|---|---|---|
| **A1** | a long-lived public HTTPS host for the A2A agent server | **owner: decision + spend** | `CARRIED` OPEN. Code built; Vercel cannot hold this endpoint open. `v32` records that the last build attempt died when the container VM restarted underneath it and **why is UNMEASURED** |
| **A2** | the credential set — `A2A_TRIGGER_SECRET`, `A2A_ACTOR_USER_ID` (a real `auth.users` uuid), `A2A_CARD_URL` | **owner's hand** (ADR-007: env only) | `CARRIED` OPEN |
| **A3** | the Operator's two data rows — the `backends` identity and the global MCP server row in `mcp_global_settings` | Operator window | `CARRIED` UNBLOCKED since A4 closed |
| **A5** | spend authorisation — R4 stands: 2M tokens for the harness proof, $10 per measurement round, provisional | **owner** | `CARRIED` OPEN |
| **A4b** | the honestbench **deterministic scorer** | build work, a lane | `MEASURED` NOT BUILT. Two design reports landed 2026-08-26 (`SCORER-DESIGN-1`, `-2`); no scorer module exists in the tree. **This blocks TIER E only — one criterion, not fifteen** |

**A4 IS CLOSED and must not be re-asked.** The honestbench instrument is published and answering; measured twice from two networks in S120.

---

## 6 · THE THING THE OWNER SHOULD SEE MOST CLEARLY

**Since 2026-08-18, the factory has been repairing the factory.** `MEASURED`: 278 merges into master in that window; the named phases are `arm-corpus-gate`, `stand-down`, `canary-freeze`, boot repairs, card grammar, self-describing refusals, `cp8-reconcile`, landing orders. Real work, and much of it was necessary — the trunk is green because of it, and the card grammar that caught four defects in one card this morning exists because of it.

**But it is not on either half of the owner's 100 %.** The two exceptions are exactly the two design landings of 2026-08-26 — the A23 ask shape and the honestbench scorer design — and both stopped at the design boundary because that is what their cards ordered.

**THIS IS THE SOTA-1 QUESTION, PUT PLAINLY RATHER THAN SMOOTHED.** SOTA-1 forbids the Architect from deferring a SOTA-advancing item, and the only admissible objection must name (a) which criterion goes unproven, (b) by what date it becomes provable, (c) which measurement resolves it. **Nobody has written those three for the factory detour, and it is now ten days long.** Either the detour is justified and owes its (a)+(b)+(c) in writing, or it is a standing SOTA-1 breach. That is the owner's ordering call and the Architect owes him the question rather than the smoothing.

---

## 7 · THE ONE PATH — ONE PROPOSAL, NOT A MENU

**The next two work orders are build cards, and they are the two halves.**

1. **`PHASE-A23-ASK-SHAPE-BUILD-1`** — implement the ask shape the landed design specifies, ask-shape FIRST, carry-through as its own follow-on card, with the ordering constraint written into the card as a falsifier. Closes the seventh key; advances TIER A · Gaia2.
2. **`PHASE-HONESTBENCH-SCORER-BUILD-1`** — build the deterministic scorer from the **verbatim** frozen pass conditions, never a paraphrase. The contract's trap is explicit: the scoring must be authored before results are known, and the benchmark must ship with at least one adversary mode CWF currently fails. **Precondition: the frozen conditions must be located first** — `v32` records they live in a phase brief and an amendment that are cards, not files, and were not on the live bus.

**In parallel, and costing no lane time, the owner's four items:** A1 host, A2 credentials, A5 spend, and an Operator window for A3. Those four, plus item 1, are the whole of "ready for the benchmark tests".

**AND ONE HOUSEKEEPING ITEM THAT IS NOT OPTIONAL:** `cwf-sota-definition` is due a **v1_6** amendment recording that §6's three blockers landed, and the implementation order is due a **v33** recording that Z1's trunk is green. Both documents currently read as live state and are not. Under the project's own law that is a defect, not tidiness — but both are governance edits, and **the P-6 observation window is open**, so they are named here and held for the GATE-1 sitting rather than done today.

---

## 8 · WHAT THIS DOCUMENT DID NOT MEASURE, DECLARED RATHER THAN LEFT BLANK

* The internal seven-key counter and the sixteen-criterion contract — both `CARRIED`, neither re-derived. They need one card each and neither was cut this session.
* The ADF exit test at 2/6 — `CARRIED` from S118.
* Pull-request and CI state — the Architect's container has no `gh`; the lane is the referee.
* `docs/ground/census.latest.json` is **STALE by 4689 minutes against a 60-minute bound**; anything that makes a premise of the census must re-run it first.
* The vitest suite was still running when this was written. A trunk called green on four gates and an unfinished fifth is a trunk with four measurements, not five.

TAIL ANCHOR: S123-CWF-COMPONENT-STATE-v1 ends here.
