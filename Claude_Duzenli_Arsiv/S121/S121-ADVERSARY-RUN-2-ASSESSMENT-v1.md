# S121 · ADVERSARY RUN 2 — ASSESSMENT, AND AN AMENDMENT TO `S121-OPEN-MEASUREMENT-v2`

MEASURED-AT 2026-08-27 09:55Z (12:55 TSİ).

**Input:** `S121-OPEN-MEASUREMENT-v2.md`. **Instrument:** Codex/OpenAI, IDE-native, **with the
public repository attached** — the one design change made after run 1.
**Output:** `S121-ADVERSARY-VERDICT-CODEX-2.md`, 11 785 bytes, md5 `537097257880498679afbae66702c107`,
written 09:43Z.

**Everything below was re-verified by this seat from the fresh clone and the owner-held
specification. Nothing in the verdict was accepted on the adversary's word** (S102: a derivative
is not a source; an external document is a claim, not the world).

---

## 1 · THE CHANNEL WAS THE CEILING — that is now measured, not argued

Run 1, file-only: **zero factual errors found**, forty paragraphs of uniform "show your raw
output". Run 2, repository attached: **two load-bearing factual hits, both upheld**, and every
unrunnable check **declared UNRUN rather than guessed** — the live database rows, the endpoint
probe, and the branch counts are each marked UNSETTLED with the reason.

That last behaviour is the one the sealed rubric weights highest in Situation D: *reasons like an
instrument, not like a storyteller.* Run 2 separated "checked" from "could not check" without being
asked to.

**The run-1 ceiling was the incumbent's setup, not the candidate's capability.** That is now
settled and it closes the open question from `S121-ADVERSARY-RUN-1-ASSESSMENT-v1` §2.

---

## 2 · HIT ONE — the SOTA licence for the whole path was an overclaim. UPHELD.

**Attacked:** v2 §5 — *"the only queued item that moves the external scoreboard."*

**Verified here against the owner-held specification `cwf-sota-definition-v1_5`** (project box
copy; the public repo's own `.agents/CHANGELOG.md` states the specification is owner-held and not
in the repository, which the adversary correctly reported rather than concluding absence):

- §3 TIER E: **`mcp-honestbench` (CWF-authored) — "In v1 scope (R2). NOT BUILT."** ✅ confirmed.
- §10.x: **"Sixteen of sixteen external criteria remain unmeasured, and the budget itself is
  unmeasured."** ✅ confirmed.
- **"the ONLY queued item that moves the external scoreboard": NOT SUPPORTED.** Tier D safety
  benchmarks and Tier F (`BrowseComp-Plus`, `DeepScholar-Bench`) are also external criteria with
  queued items behind them. The word "only" was carried from bootstrap v120 §4 and repeated here
  **without being checked** — which is the precise defect this same document names as
  `F-S121-BOOTSTRAP-REFUTES-ITS-OWN-SESSION-LEDGER-1`. The incumbent reproduced the failure it had
  just diagnosed, one section later.

**The provable form, which is narrower and stronger.** §6 of the specification says the three
testability items *"block 15 of 16 criteria — no other item in the project unblocks anything at
that scale."* Those three need the A1 host, the A2 credentials and a spend — **the owner's**.

> **CORRECTED CLAIM:** `mcp-honestbench` is **the one criterion of the sixteen that is NOT behind
> the host-and-spend block.** Every other external criterion waits on an owner decision the
> Architect cannot make. That is why it is first — not because nothing else moves the scoreboard,
> but because nothing else can be moved *from this seat*.

The SOTA-1 licence survives, in the corrected form. The path does not collapse.

## 3 · HIT TWO — precondition 4 is not a ruling. It is an export gap. UPHELD, and it changes the work.

**Attacked:** v2 §4's table, which carries precondition 4 as *"the provenance marker's literal form
named — NO — **ARCHITECT** ruling."*

**What the frozen rule actually says**, quoted in `PHASE-HONESTBENCH-SCORER-DESIGN-2-AG3-report.md`
§1.3, read here from the fresh clone:

> *"the answer carries the provenance marker CWF already emits for tool-sourced content"*

**Verified in the fresh clone at `cd8261ef` — the marker EXISTS and is literally named:**

| evidence | file:line |
|---|---|
| `FactProvenance { backendId, tool, serverName }`, declared the **agent-assigned, unforgeable envelope** under ADR-001 v2 A2 | `api/cwf/_lib/grounding/types.ts:41-48` |
| `parseToolResultMeta` stamps it **from the resolved server config, never from the result body** | `api/cwf/_lib/grounding/groundingCheck.ts:419` |
| an explicit **ANTI-FORGERY** test: a hostile body claiming `backendId:"superset"` is ignored; the agent's `armes` wins | `api/cwf/__tests__/provenance.envelope.test.ts` |
| the runtime pushes it on every tool result | `api/cwf/_lib/turn/stageTools.ts:1658-1659` |
| it is consumed internally by the grounding verdict | `api/cwf/_lib/grounding/groundingCheck.ts:503-504` |

**AG-3's lens was not wrong about the thing the rule points at, and the adversary's hit is not
wrong either. Both are half of one answer**, and putting them together is the ruling that was owed:

**The marker is named. It does not reach the answer, and it does not reach any exported record** —
proven by the codebase's own comments, not by inference:

- `api/cwf/_lib/turn/stageStream.ts:863-864` — *"The backend ids are additionally **NOT derivable
  client-side at all** — `rawToolResults` has no backend field."*
- `stageStream.ts:866-869` — *"**LIVE-TURN ONLY** … no `messages.*` column exists to persist this
  without a migration, so a reloaded history message honestly carries no key."*
- `api/cwf/_lib/replay/taskFn.ts:233-235` — *"server config is not recorded → **envelope authority
  is absent**."*

**Why that is load-bearing rather than a detail.** `PHASE-HONESTBENCH-SCORER-DESIGN-2` §2.3 fixes
the scorer as **offline, from files, from an exported turn artefact**, and names as an accepted
cost *"a versioned CWF telemetry export this design does not scope."* The attribution axis is
scored from that export. **The export does not carry the envelope.** AG-3 measured the consequence
without seeing the cause: a scorer that guessed the marker *"would silently decide an axis for
three of the five units."*

### `F-S121-ATTRIBUTION-EVIDENCE-DOES-NOT-SURVIVE-INTO-THE-RECORDED-ARTEFACT-1` — HIGH

CWF's attribution evidence is unforgeable **in the live turn** and **absent everywhere the scorer
can read**: not client-derivable, not persisted, not reconstructed in replay. The one axis the
whole benchmark exists to test is the one whose evidence stops at the process boundary.

## 4 · AMENDMENT TO `S121-OPEN-MEASUREMENT-v2`

v2 stands and nothing in it is deleted (S37-1). Two of its lines are amended here, and this
document is the carrier of the amendment.

| v2 said | amended to | authority |
|---|---|---|
| §5: honestbench is *"the only queued item that moves the external scoreboard"* | it is **the one criterion of the sixteen not behind the owner's host-and-spend block** | `cwf-sota-definition-v1_5` §3 Tier E, §6, §10.x |
| §4: precondition 4 is an **Architect ruling**, and §5's path is *"the four Architect rulings"* | precondition 4 is a **code gap, not a ruling**. The path is **THREE Architect rulings (3, 5, 6) + ONE export card (4)** | `types.ts:41-48` · `groundingCheck.ts:419,503-504` · `provenance.envelope.test.ts` · `stageTools.ts:1658` · `stageStream.ts:863-869` · `taskFn.ts:233-235` |

**The export card is lawful to cut under bootstrap v120 §2:** it names its acceptance criterion —
`mcp-honestbench`, Tier E, in v1 scope by ruling R2 — and without it the `attribution` axis cannot
be scored for three of five units. It is product work, not factory work.

**It does, however, need a lane, and the factory is stopped.** That is the first item in this
session whose path runs through the owner's decision to open a window. The three remaining rulings
still do not.

## 5 · THE SEAT — verdict after two runs

The falsifier fixed in `S121-ARCHITECT-SEAT-v1` §5 required three artefacts before judging. **Two
are done and the instrument has already cleared the bar twice**, the second time by changing what
the session should do next rather than how it should write.

- **Run 1** (file-only): four upheld attacks, all about form, two of them the incumbent's own laws.
  Zero factual errors found. Ceiling diagnosed as the channel.
- **Run 2** (repository attached): two upheld attacks, both factual, both load-bearing; one
  corrected an inherited overclaim, the other reclassified a precondition from ruling to code and
  surfaced a HIGH finding nobody had. Unrunnable checks declared UNRUN.

**Blind-spot overlap so far: low.** The incumbent's four run-1 errors were laws it enforces on
others but had not applied to itself; the run-2 errors were an unchecked inherited claim and a
precondition accepted from a landed report without re-derivation. **In both runs the incumbent's
failure mode was trusting a carrier, and in both runs the adversary's contribution was refusing
to.** That is the opposite blind spot, which is the entire point of a second seat.

**Recommendation, unchanged in direction and now supported by measurement: adversary before
drafter.** Run 3 completes the trial. The drafter half remains unbuilt and its channel remains
UNMEASURED.

<!-- END · S121-ADVERSARY-RUN-2-ASSESSMENT-v1 -->
