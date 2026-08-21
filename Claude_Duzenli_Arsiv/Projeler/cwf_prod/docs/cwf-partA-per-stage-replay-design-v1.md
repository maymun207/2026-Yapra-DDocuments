# CWF — Part A / "Sayfa 2b" Per-Stage Replay — Design Note · v1
<!-- rev 1 · 2026-07-05 · Design note (NOT a phase prompt). Grounds queue #1 (register v20)
     in the real code at master HEAD 72abc57. Precedes the AG phase prompt per the standing
     "design note BEFORE the phase prompt" rule for security-relevant replay work.
     Pilot target: the grounding validator stage. Author: Architect lane. -->

## 0. Purpose (one paragraph)

Part A is the *real* Replay feature deferred out of the REPLAY-UX line: **per-stage replay** —
"recompose the governed slice @ version X, re-run a single deterministic pipeline stage against a
recorded turn." This note establishes, from the code at `72abc57`, **what Part A actually is
relative to the already-shipped REPLAY-B engine, why the `grounding validator` is the correct
pilot stage, the three concrete deliverables the pilot requires, the safety floor that must hold
inside the lab, and the open decisions to settle before a phase prompt is written.** It is not the
phase prompt; it is the artifact that lets us write a correct one.

---

## 1. The reframing: REPLAY-B replays the MODEL; Part A replays the GOVERNANCE

The single most important finding is that Part A is **not** a variant of the shipped replay engine.
They sit on orthogonal axes over the *same* recorded specimens:

| | REPLAY-B (`runExperiment.ts`, shipped) | **Part A (this note)** |
|---|---|---|
| Subject under test | the **LLM** (is it flaky / empty-prone) | the **governance** (what would this rule slice do) |
| Stage coverage | the **whole turn** (prompt → gateway → completion) | **one stage** in isolation (grounding, pilot) |
| LLM call | **yes** — one `streamChat` per rep | **none** — the stage is pure |
| Determinism | stochastic → **N-rep + Wilson-CI** required | deterministic → **one evaluation is proof** |
| Knowledge version | **current published** (warm at wall-clock now) | **pinned @ version X** (recorded / live / candidate) |
| Question answered | "is the model reliable on this input?" | "what would this governance change have done to real past answers?" |
| Cost | tokens, budget, latency | ~free, instant |

REPLAY-B holds governance fixed and varies the model to measure stochastic behavior (the empty
saga). Part A holds the recorded model output fixed and varies the *governed slice* to measure a
deterministic verdict. This is **governance regression / impact analysis**, not model reliability.
Calling it a "replay variant" would be a category error and would drag the N-rep + budget machinery
into a place that has no stochasticity to measure.

---

## 2. Why the grounding validator is the pilot (code-grounded)

`api/cwf/_lib/grounding/groundingCheck.ts` — `runGroundingCheck(input: GroundingInput): GroundingVerdict`:

- **Pure & deterministic by construction.** Its own header: "Code reading the answer text +
  tool-result metadata — NO LLM judge, NO second model call, NO network, NO vector. Side-effect-free."
  Four checks: `empty_as_zero` (critical), `count_understatement`, `fabrication_risk`,
  `scope_divergence` (all warning). This is the purest deterministic stage we have.
- **Its inputs are fully recoverable from a recorded turn** — nothing needs to be regenerated:
  - `answerText` ← the assistant `messages.content` (already surfaced in REPLAY-UX-3 detail).
  - `toolResults: ToolResultMeta[]` ← `raw_tool_results` → the production `parseToolResultMeta()`
    (already the exact path `taskFn.ts` uses to rebuild meta for the grounding scorer).
  - `query` ← the user message. `language` ← known. `activeZonesInContext` ← derivable/optional.
  - `backendAuthority` ← the warmed trust-registry role-ceiling (the same
    `resolveBackendAuthority` seam `runExperiment.ts` already builds).
- **It is the `empty≠zero` showcase.** `empty_as_zero` is the flagship critical invariant. A stage
  whose headline output is the sacred rule is the right first lens for an inspection feature.
- **Redaction already exists.** `redactGroundingVerdict()` (`scorers.ts`) strips `detail`/`evidence`
  (which "can carry factory data") down to `{kind, severity}` — the exact shape production emits to
  telemetry. The C9 client boundary for the pilot is therefore *already solved by an existing pure
  function*; Part A reuses it rather than inventing a redaction path.

Conclusion: the grounding validator is replayable **today with zero LLM involvement** — *except* for
one thing (§3), which is where the real work lives.

---

## 3. Ground-truth findings that shape the pilot

**3.1 — `blind_spot` and `zone` ARE governed CORE rule_kinds, with DB-first/code-floor compose.**
`reference/kinds.ts`: `KIND_IDS.BLIND_SPOT = 'armes.blind_spot'`, `ZONE`, both `class: CORE`,
`isLocked: true`. `composeArmes.ts` composes them DB-first with the code arrays as the floor:
`pick<BlindSpotRule>(byKind(rules, KIND_IDS.BLIND_SPOT), BLIND_SPOTS)`. So a *versioned, governed*
representation of the exact vocabulary the grounding validator cares about already exists and is
already composed the right way — **elsewhere**.

**3.2 — the runtime grounding validator BYPASSES that governed path.** `groundingCheck.ts` does
`import { BLIND_SPOTS } from '.../armes/blindSpots.js'` and `import { ZONES, FACTORY_ID } from
'.../armes/zones.js'` at module scope, then computes `FORBIDDEN_ZONES` / `FORBIDDEN_PHRASES` /
`SCRAP_TERMS` / `SCOPE_VOCAB` **once at module load** from those code constants. Consequence: the
runtime validator validates against the **code floor**, not the live/published DB slice, and has no
concept of "version." This is defensible as a *safety* default (a DB edit cannot silently weaken the
`empty≠zero` guard) — but it means the pilot's central task is not "call the validator," it is
**making the validator's governed vocabulary an injected, versionable input** while preserving that
floor. This is a refactor of a **security artifact** → full review, floor-preservation mandatory.

**3.3 — `DbKnowledgeProvider.warm(query, scope)` has no version parameter.** It reads the *published*
`domain_rules` slice and exposes a `previewKeys` read-only overlay (candidate versions), but not an
arbitrary "@ historical version X" time-travel read. `rule_versions` exists (the version ledger), so
historical composition *may* be feasible, but it is **not a first-class capability today**. The pilot
must scope its version axis to what the store actually supports (see §7.1) and not over-promise
time-travel.

---

## 4. The hidden trap: empty≠zero is sacred *inside the lab* (the determinism/safety split)

Per the durable map §7 and the standing rules ("empty≠zero is sacred incl. … the replay lab";
"per-kind compose floors (FLOOR-1)"), "replay grounding @ version X" hides a split:

- The validator **logic** is deterministic/authoritative — code, immutable, never DB-editable.
- The governed **vocabulary** (blind-spots/zones) is soft/gated — DB-editable, versioned.

The danger: pin a *weakened* slice (blind-spots removed) and the replay would show "no violation,"
appearing to bless an answer the floor would flag — a lab that launders an unsafe governance edit
into a green verdict. **The pilot must enforce the floor in replay**: the effective validator
vocabulary is always `union(pinned_slice, code_floor)`. A pinned slice may **ADD** zones/phrases; it
can **never subtract below the code floor**. The `empty≠zero` guard can never be replayed away. This
mirrors what the eval-gate already enforces at publish time (`evalGate.ts`: "no blind-spot safety
rules remain (EMPTY ≠ ZERO guard removed)"); replay must honor the same floor rather than open a
side door around it. **Name this in the phase prompt as a hard constraint, with a test that pins a
deliberately-emptied slice and asserts the floor verdict still fires.**

---

## 5. Pilot scope & deliverables (grounding-validator lens)

**D1 — Parameterize the grounding vocabulary (the real work).** Introduce an injected
`GroundingKnowledge` input (blind-spots + zones + scope/metric vocabulary) so `runGroundingCheck`
derives `FORBIDDEN_*` / `SCRAP_TERMS` / `SCOPE_VOCAB` from the passed slice rather than a module-load
static import. Production wires it from the composed DB slice (DB-first) unioned with the code floor
(§4). Backward-compatible default = the code floor (so nothing regresses if the arg is absent).
Security artifact → full review; parity test that the injected-code-floor path reproduces today's
verdicts byte-for-byte (parity-by-identity, same discipline as `emptyCompletionScorer`).

**D2 — Version-pinned slice read.** A server-side "compose the grounding slice @ {version}" helper.
Scope the version axis to what the store supports (§7.1): at minimum `{ code-floor, live-published,
candidate-preview }`. Historical `rule_versions` composition only if the ledger genuinely supports
reconstructing a past slice; otherwise defer explicitly (do not fake it — a fabricated historical
slice is the same "fabricated truth" sin TRACE-LINK-1 refused).

**D3 — Deterministic per-stage harness.** Given `(messageId, version)`: load the recorded turn
(reuse `loadRecordedTurn` / the specimen path), rebuild `(answerText, toolResults, query,
backendAuthority)`, compose the slice @ version (D2), run `runGroundingCheck` once (no LLM, no rep
loop, no budget), and return the **redacted** verdict (D-reuse `redactGroundingVerdict`) plus a
**diff** vs a baseline verdict (recorded-time floor, or live). Writes NOTHING to governed tables
(same C1 write-nothing posture as `runExperiment.ts`; an audit row, if any, is the admin endpoint's
job).

**D4 — C9 client boundary (mostly already solved).** Client sees: the recorded answer text (already
exposed), tool **names** (already exposed), the **redacted** verdict `{kind, severity}[]`, and the
verdict **diff**. `raw_tool_results` payloads stay server-side; `detail`/`evidence` never cross the
boundary. Extend the existing no-leak test (poison-payload plant, assert absent from
`JSON.stringify`) to the new endpoint.

**D5 — Surface.** A read-only "run grounding @ [version selector]" affordance on the existing
specimen detail (the REPLAY-UX-3 Part B panel), showing the verdict + diff. Keep it OUT of any
UI-polish phase — this re-runs a governed stage and is security-relevant.

---

## 6. Explicitly OUT of scope for the pilot

- **Routing and scope/authority stages.** The rec is grounding-first, then *widen*. Routing replay
  (which tools would be offered @ version X) and full scope/authority replay are Phase-A-2, after the
  grounding lens proves the harness shape.
- **A hard-block / regenerate mode for grounding.** The validator is Mode-A advisory today
  (`groundingCheck.ts` header); Part A inspects, it does not change runtime enforcement.
- **Arbitrary historical time-travel** if `rule_versions` can't cleanly reconstruct a past slice
  (§7.1) — deferred, not faked.
- **Any write to governed tables.** Replay is read + compute only.

---

## 7. Open decisions to settle before the phase prompt

**7.1 — Version axis depth (the big one).** Which versions must the selector offer?
  (a) minimal: `code-floor` vs `live-published` (a 2-way "does live governance differ from the
  floor" diff) — smallest, ships fastest, still useful;
  (b) + `candidate-preview` (via the existing `previewKeys` overlay) — "what would my *staged* edit
  do to past answers" (the strongest impact-analysis story, and it reuses machinery that exists);
  (c) + arbitrary historical `rule_versions` — only if the ledger supports faithful reconstruction.
  **Architect lean: (b).** It reuses the preview overlay, delivers the real "impact of a governance
  edit" value, and avoids over-promising historical time-travel. Confirm before the phase prompt.

**7.2 — Diff baseline.** Diff the @-version verdict against (i) the recorded-time code floor, or
(ii) the live-published verdict? Lean (ii): "vs what production would say today" is the more
actionable comparison. Both are cheap; could show both.

**7.3 — Backend scope.** ARMES-only for the pilot (its blind-spots are the rich set), or include
Superset (`superset.blind_spot` exists per `kinds.ts`)? Lean ARMES-only for the pilot; Superset is a
natural widen.

**7.4 — Surface reuse.** Extend the REPLAY-UX-3 specimen-detail endpoint
(`GET ?specimenDetail=<id>`), or a new sibling endpoint? Lean: a new sibling
(`GET ?groundingReplay=<id>&version=<v>`) so the detail projection stays a pure metadata read and the
compute path is separately reviewable.

---

## 8. What this is NOT

- **Not the phase prompt.** The phase prompt follows once §7.1 (and ideally 7.2–7.4) are settled.
- **Not a REPLAY-B extension.** Orthogonal axis (§1); it must not import the N-rep / token-budget /
  perturbation machinery.
- **Not a runtime-enforcement change.** Inspection only; the live grounding validator's behavior is
  untouched except for the D1 vocabulary parameterization (which must be verdict-identical on the
  code-floor default).
- **Security posture:** D1 touches a security artifact (the grounding validator) and D3/D4 add a
  path that reads recorded turns → **full review, not hotfix mode**, with the §4 floor test and the
  §D4 no-leak test as gating evidence.

---

### Appendix — the exact recovery map (recorded turn → GroundingInput)

```
GroundingInput.answerText          ← messages.content (assistant row; recorded)
GroundingInput.toolResults[]       ← raw_tool_results → parseToolResultMeta(name, formatted, server?)
                                     (server config not recorded → envelope authority absent, as in taskFn.ts)
GroundingInput.query               ← user message (recorded)
GroundingInput.language            ← known/'tr'
GroundingInput.activeZonesInContext← optional; checker also scans answerText
GroundingInput.backendAuthority    ← trustRegistry.warm() → getTrust(b).authoritativeMetrics
                                     (the resolveBackendAuthority seam, reused)
+ INJECTED (D1, new):
GroundingKnowledge.blindSpots/zones/scopeVocab ← compose @ version (D2), unioned with code floor (§4)
```

All of the above except the injected slice is already reconstructed today inside `taskFn.ts`. The
pilot's novelty is the **injected, version-pinned, floor-guarded governed slice** — everything else
is reuse.
