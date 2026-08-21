# PHASE REPLAY-A3 — Scope/Authority Per-Stage Replay (Part A widen) · v1
<!-- rev 1 · 2026-07-09 · Author lane (AG / Claude Code on AntiGravity). Implements queue #1
     (register v28) per design note cwf-scope-authority-lens-design-v1. The THIRD per-stage
     deterministic lens (after grounding REPLAY-A1, routing REPLAY-A2): version axis =
     backendAuthority ∈ { floor | live } (preview deferred — no trust draft store; design §4).
     Code-grounded at master HEAD f77df8c (rev 53, 1285/126). SECURITY-RELEVANT (touches the
     grounding module's export surface + the trust seam + reads recorded cross-user turns) →
     FULL REVIEW, not hotfix mode. No migration (reads existing `backends` + `backend_authority`
     + `messages` only). This prompt was written by the Architect, NOT by AG — do not offer to
     redesign or re-split it. ONE clarifying design question before implementing is fine. -->

---

## 0. HARD PRE-FLIGHT GATE (do not start until ALL are literally true)

- [ ] Fresh clone of `github.com/maymun207/cwf_yaprak`; `git rev-parse origin/master` == **`f77df8c…`** (verification STARTS here, RULE 25).
- [ ] `npm ci` clean; **baseline test suite green** BEFORE any change — paste the literal count (expected **1285/1285 across 126 files**; if it differs, report the real number and STOP if lower).
- [ ] **Drift gate green** on the untouched clone: `npm run check:doc-drift` → paste the `[OK]` line. If not `[OK]`, STOP and report — do not build on a drifted tree.
- [ ] You have read the design note `cwf-scope-authority-lens-design-v1.md`: §4 (the two version axes and why `preview` is honestly omitted), **§5 (THE POLARITY TRAP — authority maps are never unioned)**, §6 (the C9 response contract incl. `authorityDiff`).
- [ ] Work on a feature branch `feat/replay-a3-scope-authority`; **push the branch the moment the phase completes** (even before merge authorization) — unpushed work is unrecoverable + unreviewable (standing rule, session-28 crash saga).

Report each as literal evidence in the final self-verification. "Build green" is NOT evidence — paste counts/lines.

---

## 1. What this is (one paragraph — read before touching code)

A NEW, read-only, **deterministic, no-LLM, token-free, un-audited** replay lens over the
SCOPE/AUTHORITY gate: re-run `checkScopeDivergence` — and ONLY that gate — over a recorded turn's
already-captured inputs, against a **version-pinned `backendAuthority` map** (`floor` = the code
reference `REFERENCE_BACKEND_TRUST`; `live` = the warmed DB trust registry), and return the
redacted verdict at-version, the `live` baseline verdict, flagged counts, and an **`authorityDiff`**
naming exactly which backend→metric grants differ between the two maps (the cause of any verdict
flip). It answers: *"which past turns' `scope_divergence` warnings does this trust grant/revoke
flip?"* — governance regression testing for the trust registry, textbook §3.3. It is NOT REPLAY-B
(no model, no rep loop, no tokens, no audit row) and it changes NOTHING in production: the
grounding engine, `runGroundingCheck`, `stageWarmTrust`, and the A1 grounding lens's own live
authority resolution all stay byte-identical.

---

## 2. HARD CONSTRAINTS (violating any = rejected review)

**2.1 — Production stays byte-identical.** `runGroundingCheck`, `checkScopeDivergence`'s body,
every other check function, `deriveVocab`, the `CODE_FLOOR`, the notice builders, `stageStream.ts`/
`stagesModel.ts`/`stageWarmTrust`, `TrustRegistry.warm()`/`getTrust()`/`isAuthoritativeFor()`, and
the existing `groundingReplay`/`routingReplay` branches must behave EXACTLY as today. The ONLY
permitted changes to existing files are: (a) one narrow **additive export** in `groundingCheck.ts`
(§3-A), (b) one **additive read method** on `TrustRegistry` (§3-B), (c) the new GET branch in
`api/admin/replay.ts` (§3-C), (d) the UI/service additions (§3-D), (e) the reseal (§3-E). All
existing grounding tests (`groundingCheck.test.ts`, `scopeDivergence.test.ts`,
`acidScaffold.containment.test.ts`, `replayEngine.test.ts`, `pairedReplay.test.ts`) MUST pass
unchanged.

**2.2 — No LLM, no writes, no REPLAY-B machinery.** The new path calls the exported pure gate and
nothing that streams a completion. It writes NOTHING to any table (pure GET read + compute, same
as the A1/A2 branches). It does NOT import `runExperiment`, `runReplayRep`, the token budget,
`perturbForRetry`, or any provider/gateway module. No OTel spans, no `initObservability`/
`forceFlushObservability` on this branch (RULE 27: a pure GET emits no spans).

**2.3 — THE POLARITY TRAP: AUTHORITY MAPS ARE NEVER UNIONED (the security core of this phase).**
In A1/A2 the floor is union-sacred because floor rules are DETECTORS — union can only strengthen.
Authority is the INVERSE: a grant SILENCES the detector (`authority[B].includes(M)` ⇒ skip).
Unioning floor∪live would hand every backend its MAXIMUM grants = the WEAKEST possible check — a
safety inversion. Therefore: `resolveBackendAuthorityMap(version)` returns each version's map
**AS-IS, never unioned, never merged, never "floored up."** The weakening direction is made
VISIBLE instead, via `authorityDiff` in the response (§3-C). A dedicated test (§4.4) pins a live
map that grants `superset` a metric the floor does not, and asserts (a) the at-`floor` evaluation
still flags, (b) the at-`live` evaluation is clean, (c) `authorityDiff` names the grant — the flip
is visible-with-cause, never silent.

**2.4 — Zero duplication of the gate (same-source lockstep).** The lens MUST evaluate through the
SAME private `checkScopeDivergence` production uses — exposed via ONE narrow wrapper export (§3-A).
Re-implementing or copying the S/M/T logic, the aliases, `requestedScope`/`requestedMetric`, or
the dedupe is exactly how a lens drifts from the gate it claims to replay (A1's §2.6 precedent:
grounding reused `pickArmesGoverned`). `METRIC_ALIASES`, `norm`, `queryHas` stay private and
untouched.

**2.5 — C9 boundary.** The response carries ONLY: `messageId`, `version`, the REDACTED verdicts
(`redactGroundingVerdict` — kind+severity only), `flagged` counts, and the `authorityDiff`
(backend ids + metric ids — configuration names, not factory data). NEVER a violation's
`detail`/`evidence` (they carry scope names from factory payloads), NEVER `raw_tool_results`
payloads, NEVER tool-result bodies. Extend the poison no-leak test to this endpoint (§4.5).

**2.6 — Gate = `REPLAY_LENS`.** The branch sits under the existing
`if (req.method === 'GET') { ensurePermission(ctx, PERMISSIONS.REPLAY_LENS, res) }` umbrella in
`api/admin/replay.ts` — the NAV-RBAC-1 gate split (GET lenses = maker-tier, token-free,
un-audited). Do NOT gate it on `REPLAY_RUN`, do NOT add an audit row, do NOT add a new permission.

**2.7 — Secrets & env.** No secret/token/key printed or added. No new env vars. No `.env` reads in
the new code.

**2.8 — Legibility gates stay green.** The `adminLegibility` and `chatLegibility` vitest gates must
end `[]`. New UI strings: no `text-[10px]`/`text-[11px]`, no raw hex, no `text-white/N`, no raw
`"admin-theme"` string — tokens + existing shadcn components only.

---

## 3. GATED SUB-PHASES (do in order; each independently green before the next)

### Sub-phase A — narrow gate export (no behavior change)
`api/cwf/_lib/grounding/groundingCheck.ts` — add ONE export; change nothing else:
```ts
/**
 * REPLAY-A3: run ONLY the scope/authority gate over a grounding input — the SAME private
 * checkScopeDivergence production composes into runGroundingCheck (same-source lockstep;
 * zero duplication). Pure: no I/O, no model call. `knowledge` absent ⇒ CODE_FLOOR vocab,
 * exactly as runGroundingCheck.
 */
export function runScopeCheck(input: GroundingInput): GroundingViolation[] {
    return checkScopeDivergence(input, deriveVocab(input.knowledge ?? CODE_FLOOR));
}
```
- `checkScopeDivergence` itself stays module-private and byte-identical. `runGroundingCheck`
  byte-identical.
- New test in `groundingCheck.test.ts`: for a fixture input that produces a `scope_divergence`
  AND at least one other violation kind, `runScopeCheck(input)` deep-equals the
  `scope_divergence` subset of `runGroundingCheck(input).violations` (proves lockstep, §4.2).

### Sub-phase B — the trust slice resolver + the additive seam read
**B1** — `api/cwf/_lib/backends/trustRegistry.ts`: add ONE additive method to `TrustRegistry`
(no change to `warm`/`getTrust`/`isAuthoritativeFor`):
```ts
/**
 * REPLAY-A3: the full backendId→authoritativeMetrics map. Warmed → every DB declaration's
 * metrics (floor-tier/undeclared rows resolve as getTrust does: []); outage/not-warmed →
 * the code reference (REFERENCE_BACKEND_TRUST). Never throws, never an empty-by-accident
 * map that would erase armes's authority.
 */
getAuthorityMap(): Record<string, string[]> { … }
```
Resolution MUST route through the same per-backend logic `getTrust` uses (outage → reference;
warmed+unverified → floor `[]`) — do not re-derive tier semantics.

**B2** — NEW `api/cwf/_lib/replay/trustSlice.ts` (sibling of `routingSlice.ts`; mirror its header
discipline incl. the honest preview-omission comment):
```ts
export type ScopeSliceVersion = 'floor' | 'live';
export const SCOPE_SLICE_VERSIONS = ['floor', 'live'] as const;

/** Resolve the version-pinned backendAuthority map. NEVER unions versions (§2.3). */
export async function resolveBackendAuthorityMap(
    version: ScopeSliceVersion,
    registry: TrustRegistry = trustRegistry,
): Promise<Record<string, string[]>>
```
- `'floor'` → built purely from `REFERENCE_BACKEND_TRUST` (`{armes:[…3], superset:[]}`).
  **ZERO DB touch — do not call `warm()`** (test asserts the source is never consulted, §4.3).
- `'live'` → `await registry.warm()` then `registry.getAuthorityMap()`.
- NEVER throws → any failure degrades to the **code-reference map** (== floor content), with a
  `console.error` naming the resolver — never a partial/empty map (mirrors both siblings'
  floor-on-failure posture).
- Header comment MUST state: `preview` intentionally NOT offered — `backends`/`backend_authority`
  have no draft store to overlay; faking one would be dishonest (the routingSlice precedent).
  AND the §2.3 polarity note: versions are evaluated AS-IS, never unioned.

### Sub-phase C — the endpoint branch
`api/admin/replay.ts` — add a GET branch alongside `groundingReplay`/`routingReplay`, under the
SAME `REPLAY_LENS` gate already asserted at the top of the GET block:
```
GET /api/admin/replay?scopeReplay=<messageId>&version=<floor|live>
```
- Validate `version` ∈ `SCOPE_SLICE_VERSIONS` (400 on bad value; default `live` if absent).
- `loadRecordedTurn(messageId)`; named-error mapping identical to the sibling branches
  (404 `ReplaySpecimenNotFoundError` / 422 `ReplayNotReplayableError` / 503 `ReplayUnavailableError`
  / 500 rest).
- Build the base `GroundingInput` EXACTLY as the `groundingReplay` branch does:
  `toolResults = turn.rawToolResults.map(r => parseToolResultMeta(r.toolName, r.raw))`,
  `answerText = turn.assistantContent`, `query = turn.userMessage`, `language: 'tr'` fallback,
  and the grounding-knowledge slice PINNED to `resolveGroundingKnowledge(DEFAULT_BACKEND_ID,'live')`
  (production posture — the knowledge axis belongs to A1; ONE axis per lens; comment this).
- Resolve `backendAuthority` at the requested version AND at `live` (baseline) via
  `resolveBackendAuthorityMap`. Run `runScopeCheck` twice — pure, deterministic, cheap.
- Redact both violation lists through `redactGroundingVerdict`-equivalent shaping
  (`{kind, severity}` only; wrap as `{ok: violations.length===0, violations}`).
- Compute `flagged = { atVersion: n, baseline: m }` and
  `authorityDiff: Record<backendId, {added: string[], removed: string[]}>` = per-backend metric
  grants present at-version but not in baseline (`added`) / in baseline but not at-version
  (`removed`); include only backends with a non-empty delta. Config NAMES only.
- Respond `200 { messageId, version, verdict, baseline, flagged, authorityDiff }`.
- **No audit row** (pure GET read + compute, write-nothing, no tokens, no OTel spans — consistent
  with the un-audited sibling GETs; comment this). RULE 27: no obs init/force-flush here.
- Honest-limit comment (from the design §6): recorded turns carry no server config → envelope
  authority absent; provenance is the B2 payload claim; a result with no payload scope never flags
  (conservative non-fabrication); a label-forging liar defeats S⊄T — containment, Phase D's problem.

### Sub-phase D — UI affordance on the SAME specimen-detail panel (existing affordances preserved)
`src/components/admin/ReplayTab.tsx` — inside the specimen detail panel, add a
**"Scope/Authority @ [floor | live]"** control directly beside the existing "Routing @" control,
mirroring its shape exactly: `ChoiceChip` per version, loader, `scopeForId` stale-guard tagging so
a stale panel never shows another specimen's result, graceful-off on 503/404/422 with an HONEST
bilingual note (503 → `t('kapsam/yetki kullanılamıyor (DB yok) — değerlendirilemedi', 'scope/authority unavailable (no DB) — could not evaluate')`),
never a fabricated verdict. Render:
- at-version verdict (ok ✓ / `scope_divergence` warning count) vs baseline verdict, compact;
- the `authorityDiff` as small name chips per backend (e.g. `live: superset +oee`), with an
  `added`-grant styled as the cause-of-flip highlight; nothing rendered when the diff is empty;
- kind+severity ONLY — the UI never expects `detail`/`evidence` fields (they don't exist, C9).

**PRESERVE (do not regress) every existing detail-panel affordance — assert in tests (§4.7):**
expand/collapse-on-click · full user message + assistant reply + tool NAMES render · the
original-trace Langfuse deep-link (TRACE-LINK-1) · the **Grounding @** control · the **Routing @**
control · the redaction note.

Bilingual `t('TR','EN')` for every new string. NOT a UI-polish phase: `.admin-theme` tokens +
existing shadcn components only; no restyling of surrounding components; no browser storage.
Add `adminService.scopeReplay(messageId, version)` + `ScopeReplayResult`/`ScopeSliceVersion` types
in `src/lib/adminService.ts`, mirroring the routing ones.

### Sub-phase E — reseal (living-doc lock-step, two-commit seal)
This phase changes MAPPED areas (`api/admin/replay.ts`, `api/cwf/_lib/replay/**`,
`api/cwf/_lib/grounding/groundingCheck.ts`, `api/cwf/_lib/backends/trustRegistry.ts`) alongside
`src/**` UI → **RESEAL, not redraw**. Bump `public/architecture/manifest.json` `docVersion`
**rev 53 → rev 54**; below-altitude reseal note on the arch tab(s) mapping the replay/trust
surface. Two-commit seal: (1) the code commit, (2) the reseal/manifest + `.agents/CHANGELOG.md`
commit. **The changelog, `public/architecture/manifest.json`, `scripts/verifyGrants.ts` (untouched
here but never forbidden), and `src/lib/adminService.ts` + the UI store are EXPLICITLY permitted in
the diff scope.** Push the branch → await Architect review → on authorization merge `--no-ff`
(squash banned) → push master. Drift gate must end `[OK]`.

---

## 4. SELF-VERIFICATION (literal evidence, not "build green")

Provide, verbatim:
1. **Baseline & final test counts** — baseline at `f77df8c` (expected 1285/126); final
   `baseline+N` stating N and naming every new test file/case.
2. **Lockstep (2.4/A):** the `runScopeCheck ≡ scope_divergence-subset-of-runGroundingCheck` test —
   paste name + result. PLUS `git diff f77df8c -- api/cwf/_lib/grounding/groundingCheck.ts` showing
   the ONLY change is the additive export block.
3. **Floor purity (B):** the test proving `resolveBackendAuthorityMap('floor')` never touches the
   registry/DB (fake registry whose `warm` throws/records → floor still returns the reference map,
   `warm` never called). Paste name + result. PLUS live-on-failure → reference-map test.
4. **POLARITY / NO-UNION (2.3, the security test):** the flip fixture — floor flags, live (grant
   `superset:[oee]`) clean, `authorityDiff.superset.added == ['oee']`; and a grep/test proving no
   code path unions/merges the two maps. Paste name + result + grep.
5. **NO-LEAK (2.5):** the extended poison test — plant a poison payload in `raw_tool_results` AND a
   poison scope string, assert BOTH absent from `JSON.stringify(response)` of the `scopeReplay`
   path, and assert no `detail`/`evidence` keys exist in the response. Paste name + result.
6. **Gate split (2.6):** `replayGateSplit.test.ts` extension — `scopeReplay` allowed with
   `REPLAY_LENS` (no `REPLAY_RUN`), denied without. Paste name + result.
7. **Detail-panel affordances preserved (D):** RTL assertions that after the change —
   (a) expand/collapse toggles, (b) message/reply/tool-names render, (c) the Langfuse anchor
   renders when configured + graceful-offs, (d) Grounding @ AND Routing @ controls still render
   beside the new Scope/Authority @ control, (e) redaction note shows. Paste names + results.
8. **UI behavior:** chips call `scopeReplay(id, version)`; stale-guard; 503/404/422 honest notes;
   the flip render (authorityDiff chips). Paste names + results.
9. **Legibility gates (2.8):** `chatLegibility` + `adminLegibility` both `[]` — paste the lines.
10. **Existing suites unchanged (2.1):** `groundingCheck`, `scopeDivergence`,
    `acidScaffold.containment`, `replayEngine`, `pairedReplay`, `replay`, `replayTab` all green —
    paste the per-file lines from raw output.
11. **Drift `[OK]`** post-reseal + **docVersion rev 54** + the two-commit seal shas.
12. **Branch pushed** (sha reported) BEFORE merge; **remote master confirmed** after authorized
    merge — `git rev-parse origin/master` reported (RULE 25: merge isn't done until pushed).
13. Independently recount 2/4/5/6/7 from raw output (do not trust the runner summary alone).

---

## 5. YOUR ACTION ITEMS (for Maymun)
- **None manual pre-build.** No migration (reads existing `backends`/`backend_authority`/`messages`),
  no env var, no Operator DB apply, no new permission row (`REPLAY_LENS` exists).
- After AG pushes the branch: I (Architect) do the fresh-clone FULL review (security-relevant —
  the grounding export surface + trust seam + recorded-turn read). Merge only on my authorization.
- Post-merge optional live check (not a build gate): open a specimen detail, run
  Scope/Authority @ floor vs live, confirm Grounding/Routing/Langfuse-link/expand affordances all
  still work.

If any step forces a manual action not listed here, STOP and surface it as a new
"YOUR ACTION ITEMS" line rather than proceeding.

<!-- END · claude-code-PHASE-REPLAY-A3-scope-authority-per-stage-v1 · rev 1 · 2026-07-09 -->
