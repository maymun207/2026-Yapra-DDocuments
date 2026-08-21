# CWF — Scope/Authority Lens (Part A widen) · Design Note · v1

<!-- cwf-scope-authority-lens-design-v1 · rev 1 · 2026-07-09 · Architect lane.
     Code-grounded at origin/master HEAD `f77df8c` (1285 tests / 126 files / docVersion rev 53).
     The THIRD per-stage deterministic replay lens (after grounding REPLAY-A1 and routing
     REPLAY-A2). Aligns to the shipped textbook `cwf-governance-replay-explained-v1.md` §3.3.
     Phase name: REPLAY-A3. -->

---

## 1. What this lens is (one sentence)

A **pure, deterministic, no-LLM, token-free, un-audited GET** that re-runs **one** governance
gate — the scope/authority check (`scope_divergence`) — over a recorded turn's already-captured
inputs, at a **chosen `backendAuthority` configuration**, and reports which verdicts a trust
grant/revoke flips. Textbook §3.3, implemented.

## 2. Code ground (verified at `f77df8c`)

| Anchor | Where | What matters |
|---|---|---|
| The gate itself | `api/cwf/_lib/grounding/groundingCheck.ts:313` — `checkScopeDivergence(input, vocab)` (module-private) | Pure. Flags ONLY when requested scope **S**, requested metric **M**, and payload scope **T** are all known, producer **B** is **not** in `input.backendAuthority[B]` for M, and S ⊄ T. Any miss → no flag. Dedupe key `S|M|T`. Violation kind `scope_divergence`, severity `warning`. |
| The authority input | `GroundingInput.backendAuthority?: Record<string,string[]>` (`grounding/types.ts:100`) | The role-ceiling map the gate consults. **This is the lens's version axis.** |
| The trust source of truth | `api/cwf/_lib/knowledge/reference/backendTrust.ts` (code reference: armes → `[oee, fire, throughput]`, superset → `[]`, unknown → floor) + `api/cwf/_lib/backends/trustRegistry.ts` (DB-first/code-floor seam: `warm()` reads `backends` + `backend_authority`; outage → code reference; unknown/unverified → floor) | Two natural configurations already exist in code: the **code reference** and the **warmed DB registry**. No new store needed. |
| How production feeds the gate | `stageWarmTrust` → `stageStream.ts`/`stagesModel.ts` pass live-warmed authority; the grounding lens (`api/admin/replay.ts:71` `resolveBackendAuthorityFor`) also resolves **live only** | Today `backendAuthority` is ALWAYS live everywhere — nobody can ask the counterfactual "what would this turn's verdict be under the code-reference trust map, or after this grant?" That question is exactly this lens. |
| Lens wiring precedent | `api/admin/replay.ts` GET branches `?groundingReplay=` (REPLAY-A1) and `?routingReplay=` (REPLAY-A2): `REPLAY_LENS` gate, version-pinned slice, run production core twice (at-version + baseline), C9 kinds/names-only response, NO audit row, NO spans, 404/422/503 error mapping | REPLAY-A3 is the third sibling: `?scopeReplay=<messageId>&version=…`, byte-parallel structure. |
| Slice resolver precedent | `replay/groundingSlice.ts` (floor\|live\|preview, union-floored) and `replay/routingSlice.ts` (floor\|live; preview honestly omitted — no draft store; failure → floor) | New sibling `replay/trustSlice.ts` follows `routingSlice` (see §4 for why preview is omitted and §5 for the polarity trap). |
| UI precedent | `src/components/admin/ReplayTab.tsx` `runGroundingReplay`/`runRoutingReplay`: version chips, `*ForId` stale-guard, graceful-off on 503/404/422 with honest notes, never fabricates; `src/lib/adminService.ts:755/764` | Third lens block "Scope @ floor \| live", same pattern. RULE-16: no `text-[10/11px]` (the `adminLegibility` gate is live). |
| Recorded-turn inputs | `replay/recordedTurn.ts` `loadRecordedTurn` → `userMessage`, `assistantContent`, `rawToolResults[{toolName, raw}]`; `parseToolResultMeta` extracts B2 payload provenance (`scope`, `backendId`) | Server config is NOT recorded → envelope authority absent, exactly as A1/taskFn already accept. The lens judges the **payload-claim** path on the same inputs production saw. |

## 3. The question the lens answers

> *Given this recorded turn, at trust configuration V, was every claim attributed to the correct
> scope, and was every authoritative claim sourced from a backend authoritative for that metric?*

Concretely it makes governance changes to the trust registry **regression-testable before they
ship**: "if we grant `superset` authority for `oee` (a `backend_authority` row), which past turns'
`scope_divergence` warnings disappear?" — deterministically, token-free, over real specimens.

## 4. Version axis — `backendAuthority` (committed: **`floor | live`**, no `preview`)

New module `api/cwf/_lib/replay/trustSlice.ts`:

- **`floor`** → the authority map built **purely** from `REFERENCE_BACKEND_TRUST`
  (`{armes:[oee,fire,throughput], superset:[]}`; anything else absent ⇒ `[]` at the gate).
  **No DB touch** — mirrors `groundingSlice 'floor'` / `routingSlice 'floor'` semantics.
- **`live`** → the warmed `TrustRegistry` map. Requires one **additive** read method on the seam
  (`TrustRegistry.getAuthorityMap(): Record<string,string[]>` returning every warmed declaration's
  `authoritativeMetrics`, or the code reference on outage/not-warmed — the seam's existing
  resolution order, no behavior change to `getTrust`). Failure → the reference map (== floor):
  never throws, never a silent empty map that would erase armes's authority.
- **`preview` intentionally NOT offered.** `backends`/`backend_authority` have **no draft store**
  to overlay (unlike the rule store's draft rows). Faking one would be dishonest — the exact
  `routingSlice` precedent, same comment discipline. DEFERRED until a trust-draft store exists.

## 5. THE HIDDEN TRAP — authority has **inverted polarity**; do NOT union-floor

In A1/A2 the floor is union-sacred because floor rules are **detectors**: more slice = more
protection, so `union(floor, slice)` can only strengthen. Authority is the **inverse**: a grant
**silences** the detector (`authority[B].includes(M)` ⇒ skip). Union-flooring the two maps would
hand every backend its **maximum** grants = the **weakest** possible check — a safety inversion.

Committed rule for A3: **each version is evaluated AS-IS, never unioned.** The safety line holds
elsewhere: (a) production runtime keeps its live registry + the unknown→floor invariant untouched;
(b) the lens is read-only; (c) the weakening **direction is made visible** in the response's
`authorityDiff` (§6) — "live grants superset:[oee] beyond floor" — so a verdict that flips clean
is always accompanied by the named grant that flipped it. This is the A3 analogue of "a weakening
shows up in the SLICE DIFF, never as a weakened verdict" — here the counterfactual verdict IS the
product, and the diff names its cause.

## 6. Endpoint contract (C9-redacted)

`GET /api/admin/replay?scopeReplay=<messageId>&version=<floor|live>` (default `live`), gate
`PERMISSIONS.REPLAY_LENS`, un-audited, no spans, no writes, no tokens (RULE 27: no obs init/flush
on a pure read path).

Evaluation: build the SAME `GroundingInput` shape A1 builds (`parseToolResultMeta` over
`rawToolResults`, `language:'tr'` fallback, `query = userMessage`) — but the pinned knob is
`backendAuthority = resolveBackendAuthorityMap(version)`. The grounding-knowledge slice is **not**
a knob here: pin it to `resolveGroundingKnowledge(DEFAULT_BACKEND_ID,'live')` (production posture;
one axis per lens — A1 owns the knowledge axis). Run the gate twice: at-version + baseline
(= `live` authority), via a new **narrow export** from `groundingCheck.ts`:

```ts
/** REPLAY-A3: run ONLY the scope/authority gate. Same private core, zero duplication. */
export function runScopeCheck(input: GroundingInput): GroundingViolation[] {
    return checkScopeDivergence(input, deriveVocab(input.knowledge ?? CODE_FLOOR));
}
```
(Reuse-production-core: `checkScopeDivergence` itself stays private and byte-identical;
`runGroundingCheck` unchanged — the eval-gate/grounding engine is untouched.)

Response (names/counts only — NEVER `detail`/`evidence`, they can carry factory data; NEVER
raw payloads):

```jsonc
{
  "messageId": "…",
  "version": "floor",
  "verdict":  { "ok": false, "violations": [{ "kind": "scope_divergence", "severity": "warning" }] },
  "baseline": { "ok": true,  "violations": [] },                  // always at 'live'
  "flagged":  { "atVersion": 1, "baseline": 0 },                  // counts (kinds-diff is degenerate: one kind)
  "authorityDiff": {                                               // config NAMES only — the cause of any flip
    "superset": { "added": ["oee"], "removed": [] }                // live vs floor grants
  }
}
```

Errors: the exact A1/A2 mapping — 400 bad version · 404 `ReplaySpecimenNotFoundError` ·
422 `ReplayNotReplayableError` · 503 `ReplayUnavailableError` · 500 rest.

**Honest limits (stated in code comments + UI copy, as A1 does):** (1) recorded turns carry no
server config → envelope authority absent; provenance is the B2 payload claim — a result with no
payload scope never flags (conservative non-fabrication: attribute-and-suppress, never assert).
(2) A liar that forges its datasource label to match S defeats S⊄T — containment-not-detection,
Phase D's redundancy problem (the `checkScopeDivergence` header already says this; the lens
inherits it verbatim).

## 7. UI surface (ReplayTab, third lens block)

Mirror the Routing block one-for-one: header "Scope/Authority @", chips `floor | live`,
state `scopeVersion/scopeForId/scopeLoading/scopeError/scopeResult`, stale-guard by `forId`,
graceful-off notes (503 "trust kullanılamıyor (DB yok) — değerlendirilemedi", 404/422 as siblings),
never fabricates a verdict. Render: at-version ok/flag count vs baseline + the `authorityDiff`
as small name chips ("live: +superset→oee"). `adminService.scopeReplay(messageId, version)` +
result type in `src/lib/adminService.ts`. RULE 16/26 apply; the `adminLegibility` gate must stay
green; tokens only (no raw hex, no `text-[10/11px]`).

## 8. Test plan (indicative, AG prompt will gate literally)

- `trustSlice.test.ts`: floor = pure reference map with **zero** DB touch (fake source asserts
  no call); live via fake `TrustSource`; live-on-failure → reference map; unknown ids absent.
- `groundingCheck.test.ts` addition: `runScopeCheck(input)` ≡ the `scope_divergence` subset of
  `runGroundingCheck(input).violations` for the same input (proves zero-duplication reuse).
- `replay.test.ts`/`replayGateSplit.test.ts`: `scopeReplay` gates on `REPLAY_LENS` (not
  `REPLAY_RUN`); 400/404/422/503 mapping; response carries **no** `detail`/`evidence`/raw keys;
  a fixture where floor flags and live (with a granted metric) is clean → `flagged` +
  `authorityDiff` prove the flip.
- `replayTab.test.tsx`: chips render; click calls `scopeReplay(id, version)`; stale-guard;
  error notes; the flip render.
- Legibility gates untouched and green.

## 9. Explicit non-goals

No runtime behavior change (production `stageWarmTrust`/grounding path byte-identical) · no new
permission (rides `REPLAY_LENS`) · no migration (both trust tables exist) · no audit row (pure
GET, consistent with A1/A2) · no LLM anywhere · no `preview` axis · no union-floor of authority
maps (§5) · A1's own `backendAuthority` resolution stays as-is (live) — A3 is where the
counterfactual lives.

<!-- END · cwf-scope-authority-lens-design-v1 · rev 1 · 2026-07-09 -->
