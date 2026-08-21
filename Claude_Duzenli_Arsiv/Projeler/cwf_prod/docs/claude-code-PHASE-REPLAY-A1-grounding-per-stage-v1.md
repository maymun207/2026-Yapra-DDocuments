# PHASE REPLAY-A1 — Grounding-Validator Per-Stage Replay (Part A pilot) · v1
<!-- rev 1 · 2026-07-05 · Author lane (AG / Claude Code on AntiGravity). Implements queue #1
     (register v20) per design note cwf-partA-per-stage-replay-design-v1. §7.1 decision = (b):
     version axis = { floor | live | preview }. Code-grounded at master HEAD 72abc57.
     SECURITY-RELEVANT (touches the grounding validator + reads recorded cross-user turns) →
     FULL REVIEW, not hotfix mode. No migration (reads existing tables only). -->

---

## 0. HARD PRE-FLIGHT GATE (do not start until ALL are literally true)

- [ ] Fresh clone of `github.com/maymun207/cwf_yaprak`; `git rev-parse origin/master` == **`72abc57…`** (verification STARTS here, RULE 25).
- [ ] `npm ci` clean; **baseline `807/807` tests green** across 81 files BEFORE any change.
- [ ] **Drift gate green** on the untouched clone (run it; paste the `[OK]` line). If drift is not `[OK]` at baseline, STOP and report — do not build on a drifted tree.
- [ ] You have read the design note `cwf-partA-per-stage-replay-design-v1.md` §1 (this replays GOVERNANCE, not the model) and §4 (the floor is sacred in the lab).

Report each as literal evidence in the final self-verification. "Build green" is NOT evidence — paste the counts/lines.

---

## 1. What this is (one paragraph — read before touching code)

A NEW, read-only, **deterministic, no-LLM** replay lens: re-run the PURE grounding validator
(`runGroundingCheck`) over a recorded turn's already-present inputs, against a **governed
blind-spot/zone slice pinned to a chosen version** (`floor` = code baseline, `live` = current
published DB slice, `preview` = live + the caller's own draft edits), and return the **redacted
verdict + a diff vs the live baseline**. It answers "what would this governance change have done to
this past answer." It is NOT REPLAY-B (that replays the model, N-rep, stochastic, spends tokens);
this stage is pure and deterministic (one evaluation is proof) and **must not import any REPLAY-B
machinery** (no rep loop, no token budget, no perturbation). The whole point rides on one sacred
invariant (§2.3): the lab can never produce a below-floor verdict — `empty≠zero` cannot be
replayed away.

---

## 2. HARD CONSTRAINTS (violating any = rejected review)

**2.1 — Production stays byte-identical.** The production grounding call site
(`api/cwf/_lib/turn/stageStream.ts:193`) passes a `GroundingInput` with NO governed-vocabulary
field. After your change, an absent `knowledge` field MUST resolve to the code-floor vocabulary and
produce a **verdict identical to today's**, on every existing grounding test. Do not modify the
production call site's arguments. Prove parity (§4 self-verification).

**2.2 — No LLM, no writes, no REPLAY-B machinery.** The new path calls `runGroundingCheck` and
nothing that streams a completion. It writes NOTHING to governed tables (C1 write-nothing, same as
`recordedTurn.ts` / `runExperiment.ts`). It does NOT import `runExperiment`, `runReplayRep`, the
token budget, or `perturbForRetry`.

**2.3 — THE FLOOR IS SACRED IN THE LAB (the security core).** The effective validator vocabulary is
ALWAYS `union(resolved_slice, code_floor)`, deduped by rule key. A resolved slice may **ADD**
zones/blind-spots; it can **never remove one below the code floor**. `pick<T>`'s existing
all-or-nothing floor is INSUFFICIENT here (a slice with *some* blind-spots but the critical one
removed would not trip `pick`'s empty-kind fallback). You must union explicitly. A dedicated test
(§4) pins a deliberately-emptied `preview` slice and asserts the `empty_as_zero` verdict STILL fires
on an "IKINCILUST fire = 0" answer. The eval-gate already forbids *publishing* a slice with "no
blind-spot safety rules remain"; `preview` (drafts) is un-gated, so the union-floor is what holds the
line there. Weakening shows up in the SLICE DIFF, never as a weakened verdict.

**2.4 — C9 boundary.** The response carries ONLY: the chosen `version`, a `RedactedGroundingVerdict`
(`{ok, violations:[{kind,severity}]}`), the live-baseline `RedactedGroundingVerdict`, and a
kinds-only `diff`. NEVER `raw_tool_results` payloads, NEVER a violation's `detail`/`evidence` (they
can carry factory data). Reuse the existing `redactGroundingVerdict` (`scorers.ts`). Extend the
no-leak test.

**2.5 — Secrets.** No secret/token/key printed or added. No `.env` reads in code. This phase adds no
env vars.

**2.6 — Same-source lockstep.** The structured blind-spot/zone pick MUST be the SAME code path the
prompt slice uses (`composeArmes`), so the prompt-slice and grounding-slice can never drift for a
given version. Extract, don't duplicate. Do NOT touch `composeSuperset` (its `pick` stays
byte-identical per its own comment).

---

## 3. GATED SUB-PHASES (do in order; each is independently green before the next)

### Sub-phase A — extract the structured governed pick (no behavior change)
`api/cwf/_lib/knowledge/composeArmes.ts`: extract the per-kind structured selection currently inline
in `composeArmesContext` into an exported pure helper, e.g.:
```ts
export interface ArmesGovernedSlice { zones: Zone[]; blindSpots: BlindSpotRule[]; /* others as needed */ }
export function pickArmesGoverned(rules: RuleInstanceLike[]): ArmesGovernedSlice { … }  // uses the SAME pick<T>
```
`composeArmesContext` now calls `pickArmesGoverned` and renders from it. **Invariant preserved:**
`composeArmesContext([]).injected === renderArmesCriticalSlice()` (byte-identical) — the existing
invariant test MUST still pass unchanged. Do not alter `pick<T>` semantics.

### Sub-phase B — make the grounding vocabulary injectable (per-call, floor-defaulted)
`api/cwf/_lib/grounding/types.ts` + `groundingCheck.ts`:
- Add `GroundingKnowledge = { blindSpots: BlindSpotRule[]; zones: Zone[] }` and an OPTIONAL
  `GroundingInput.knowledge?: GroundingKnowledge`.
- Move ONLY the **knowledge-derived** module-level constants — `FORBIDDEN_ZONES`,
  `FORBIDDEN_PHRASES`, `MULTIWORD_FORBIDDEN`, `SCRAP_TERMS`, and `SCOPE_VOCAB` — into a per-call
  derivation `deriveVocab(knowledge)` computed inside `runGroundingCheck` from
  `input.knowledge ?? CODE_FLOOR`, where `CODE_FLOOR = { blindSpots: BLIND_SPOTS, zones: ZONES }`.
- LEAVE the **linguistic** constants static (module-level): `ZERO_LEXICON`, `COMPLIANT_MARKERS`,
  `UNDERSTATEMENT_PATTERNS`, `RECORD_CLAIM`, `METRIC_ALIASES` (keyed off `METRIC_IDS` — code, not
  governed). `FACTORY_ID` stays a code constant (part of `SCOPE_VOCAB` derivation).
- The four check functions receive the derived vocab (thread it through, or close over it inside
  `runGroundingCheck`). No signature change to `parseToolResultMeta` / `scopeDivergenceNotice`.
- **Backward-compat is the acceptance bar:** `knowledge` absent ⇒ `CODE_FLOOR` ⇒ verdict identical
  to today. (Cost: one vocab derivation per call; production calls grounding once per turn —
  negligible.)

### Sub-phase C — the version-pinned structured slice resolver (union-floored)
New file `api/cwf/_lib/replay/groundingSlice.ts`:
```ts
export type GroundingSliceVersion = 'floor' | 'live' | 'preview';
export async function resolveGroundingKnowledge(
    backend: BackendId,
    version: GroundingSliceVersion,
    opts?: { previewUserId?: string },
): Promise<GroundingKnowledge>
```
- `floor` → `{ blindSpots: BLIND_SPOTS, zones: ZONES }` (code) directly.
- `live` → `getPublishedRules([backend])` → `pickArmesGoverned(rules)` (Sub-phase A).
- `preview` → `live` PLUS overlay the caller's OWN `DRAFT` rows for the ARMES `zone` + `blind_spot`
  kinds (`created_by === previewUserId`), reusing the SAME draft-overlay logic
  `DbKnowledgeProvider.composeLabSlice` uses (published + caller-draft-by-key, read-only). Factor the
  shared fetch+overlay so `composeLabSlice` and this resolver cannot drift; if a clean shared factor
  is too invasive, replicate the overlay logic with a comment pointing at `composeLabSlice` as the
  source of truth and a test asserting they agree on a fixture.
- **ALWAYS union the code floor (§2.3):** `blindSpots = dedupeByKey([...BLIND_SPOTS, ...resolved])`,
  same for `zones`. Never throws → on any failure degrade to `floor` (never a silent empty slice).
- ARMES-only for the pilot (Superset is the widen). Unknown backend → floor.

### Sub-phase D — the endpoint sibling + C9 (`api/admin/replay.ts`)
Add a GET branch, BEFORE the `specimenDetail` branch or alongside it, gated by the SAME
`PERMISSIONS.REPLAY_RUN` already enforced at the top:
```
GET /api/admin/replay?groundingReplay=<messageId>&version=<floor|live|preview>
```
- Validate `version` ∈ the 3 literals (400 on bad value). Default `version=live` if absent.
- `loadRecordedTurn(messageId)` (server-side, full `RecordedTurn`). Named-error mapping identical to
  the `specimenDetail` branch (404/422/503/500).
- Build `GroundingInput`: `answerText = turn.assistantContent`, `toolResults =
  turn.rawToolResults.map(r => parseToolResultMeta(r.toolName, r.formatted))` (server config not
  recorded → envelope authority absent, exactly as `taskFn.ts` does), `query = turn.userMessage`,
  `language` (derive as production does), `backendAuthority` (reuse the `resolveBackendAuthority`
  seam over `[DEFAULT_BACKEND_ID]`).
- Resolve `knowledge` at the requested version (Sub-phase C; `previewUserId = ctx.userId`) AND at
  `live` for the baseline. Run `runGroundingCheck` twice (pure — cheap).
- Respond `200 { messageId, version, verdict: redact(atVersion), baseline: redact(live), diff }`
  where `diff = { added: kinds in atVersion not in live, removed: kinds in live not in atVersion }`
  (kinds only). **No audit row** (this is a GET read + compute, write-nothing, no tokens — consistent
  with the un-audited `specimenDetail`/list GETs; it returns LESS than `specimenDetail` already
  exposes). Note this reasoning in a comment.
- RULE 27: no observability force-flush needed on a pure read path (no spans emitted); do not add
  init/flush here.

### Sub-phase E — UI affordance (`src/components/admin/ReplayTab.tsx`, minimal, functional-only)
On the existing selected-specimen detail panel (REPLAY-UX-3 Part B): a "Grounding @ [version ▾]"
control (`floor` / `live` / `preview`) that calls `?groundingReplay=…&version=…`, shows the redacted
verdict (kind + severity chips) and the diff (added/removed kinds), graceful-off on 503/404 with an
honest note (never a fabricated verdict). **This is not a UI-polish phase** — wire it plainly; no
restyling of surrounding components. Do not use browser storage.

### Sub-phase F — reseal (living-doc lock-step, two-commit seal)
This phase changes MAPPED areas (`api/cwf/_lib/grounding/**`, `api/cwf/_lib/replay/**`,
`api/admin/replay.ts`, `api/cwf/_lib/knowledge/composeArmes.ts`) alongside an UNMAPPED `src/**` UI
change → **RESEAL, not redraw**. Bump `public/architecture/manifest.json` (there is NO root
manifest.json) and `docVersion` **39 → 40**; update the arch doc(s) whose mapped areas moved
(Agent Control Plane / Governance Model — whichever map the replay/grounding surface). Two-commit
seal: (1) the code commit, (2) the reseal/manifest + `.agents/CHANGELOG.md` commit. **The changelog
and `public/architecture/manifest.json` are EXPLICITLY permitted in the diff scope** — do not forbid
them. Merge `--no-ff` (squash banned). Drift gate must end `[OK]`.

---

## 4. SELF-VERIFICATION (literal evidence, not "build green")

Provide, verbatim:
1. **Baseline & final test counts** — `807/807` at baseline; `807+N/807+N` after (state N and what
   the new tests are).
2. **Production parity (2.1/B):** the existing grounding tests pass UNCHANGED, and an explicit
   assertion/test that `runGroundingCheck({...withoutKnowledge})` equals the pre-change verdict on a
   fixture that produced each violation kind (incl. a clean pass). Paste the test name + result.
3. **Invariant (A):** `composeArmesContext([]).injected === renderArmesCriticalSlice()` still passes
   — paste the test line.
4. **FLOOR-IN-LAB (2.3, the security test):** a test that resolves a `preview` slice with the
   caller's draft REMOVING the IKINCILUST/critical blind-spot, and asserts `runGroundingCheck` STILL
   returns an `empty_as_zero` critical violation on an "IKINCILUST fire = 0" answer (union-floor
   held). Paste name + result.
5. **NO-LEAK (2.4):** the extended no-leak test — plant a poison payload in `raw_tool_results` and a
   poison string reachable via `detail`/`evidence`, assert BOTH absent from
   `JSON.stringify(response)` of the `groundingReplay` path. Paste name + result.
6. **Diff correctness:** a test where `live` and `preview` differ (a draft ADDS a zone that flips a
   clean answer to a violation) and the `diff.added` reflects it.
7. **Drift `[OK]`** post-reseal + **`docVersion 40`** + the two-commit seal shas.
8. **Remote push confirmed** — `git rev-parse origin/master` after merge, reported (RULE 25: merge
   isn't done until pushed).
9. Independently recount tests 2/4/5 from raw output (do not trust the runner summary alone).

---

## 5. YOUR ACTION ITEMS (for Maymun)
- **None manual pre-build.** No migration (reads existing tables), no env var, no Operator DB apply.
- After AG merges: I (Architect) do the fresh-clone FULL review (security-relevant). If review is
  green, the only live check is optional: open a specimen detail in the panel and try the three
  versions — but that is post-review UX confirmation, not a build gate.

If any step forces a manual action I did not list here, STOP and surface it as a new
"YOUR ACTION ITEMS" line rather than proceeding.
