# Claude Code — PHASE D-core: Lying-Backend Acid Test (the honest close)
**Artifact: `claude-code-PHASE-D-core-lying-backend-acid-v1.md` · v1 · 2026-06-28**
*(ADR-001 v2, Phase D — the acid half. Closes the deferred A2 `it.todo`. TEST-ONLY: no source change.)*

> **Read fully before writing a line.** D-core does NOT add runtime behavior — it **proves** what the trust
> line already built. It assembles A1 (unknown→floor) · A1.1 (grant-hardening) · the eval-gate (poison
> rejection) · A2 (tool-content-is-data) · B1/B2 (provenance) · C (scope-divergence) into ONE acid test
> against a **deliberately-hostile throwaway MCP**, and it **codifies the honest limit** — it does not try
> to paper over it.
>
> **The correct framing of the deferred `it.todo` (this is the crux):** A2 left
> `it.todo('Phase D: a lying MCP whose Granit-labelled "KB7" numbers must be FLAGGED')`. That phrasing
> conflates two different liars:
> - **Honest-label liar** — payload truthfully says `scope: 'Granit'`, but the data is presented for a KB7
>   question. **C FLAGS this** (S=KB7 ⊄ T=Granit). *Detection works.* ✅
> - **Forged-label liar** — payload is forged to `scope: 'KB7'` over Granit data. **C does NOT flag this**
>   (S=KB7 ⊆ T='KB7') — a single source cannot prove the label is false. *Detection fails; containment
>   holds.* The acid must assert **NO flag** here and prove the data is still **contained** (floor trust →
>   authoritative for nothing → never believed as authoritative). **Do NOT add a heuristic to "catch" the
>   forge — that would over-fire on honest data and break RULE 5.** The honest endgame is: *software
>   contains, redundancy reveals* — detecting the forge needs a second source (reconciliation = Phase E).
>
> **Scope discipline:** D-core is the **acid test only**. **Quarantine** (the operator deny kill-switch from
> ADR A4) is deliberately deferred — the existing `unknown→floor` already contains an undeclared liar, so
> quarantine adds operational deny, not containment; it pairs with the flagged governance-panel UI gaps
> ("deny/quarantine a backend" control) and belongs there, not bundled here. State this in the docs.

---

## 0. HARD PRE-FLIGHT GATE (do all; paste evidence; stop on any failure)

1. `git rev-parse HEAD` → `8e9f65d…` (C). Clean tree.
2. **The `it.todo` to close:** `grep -n "it.todo\|describe\|DEFERRED" api/cwf/__tests__/acidScaffold.containment.test.ts`
   → the four existing acids (#1 unknown→floor, #2 tool-output-is-data, #3 can't-self-elevate, #4 can't-poison)
   + `it.todo('Phase D: …')` at the bottom. You replace the `it.todo` with the real acids in place.
3. **Re-confirm each chain piece exists (you ASSERT existing behavior — change none of it):**
   - `floorTrustFor` / `referenceTrustFor` / `trustRegistry.isAuthoritativeFor` (A1) — quote signatures.
   - `grantPolicy` server-only classification (A1.1) — the manifest that proves trust tables aren't
     client-writable.
   - `runGate` poison rejection (eval-gate) — the existing test that a poisoned rule is rejected behaviorally.
   - the A2 structural guard (`injectionBoundary.test.ts`) — buildSystemPrompt never receives tool content.
   - `runGroundingCheck` + the C `scope_divergence` violation (this phase's detection lever).
4. Confirm **TEST-ONLY is possible:** every assertion targets behavior that already ships. If you find
   yourself needing to change a `_lib` file to make an acid pass, STOP — that's a real gap, surface it.

---

## 1. SCOPE (build exactly this — replace the `it.todo` in `acidScaffold.containment.test.ts`)

A "lying backend" = a throwaway hostile MCP. Model it as `EVIL = 'evil-mcp'` (undeclared → floor) for the
containment acids, and a `superset`-tier mirror for the C-interaction acids (a mirror is the realistic liar:
authoritative for nothing, free to mislabel). Replace the single `it.todo` with these acids:

**Detection works — the honest-label liar (closes the `it.todo`'s real intent):**
- `it('an honest-label wrong-scope claim IS flagged (Granit data presented for KB7)')`:
  `runGroundingCheck({ query: 'KB7 OEE this week', toolResults: [{ provenance: { backendId: 'superset', scope: 'Granit - Hat OEE' } }], backendAuthority: { superset: [] }, ... })`
  → a `scope_divergence` violation. *(This is what C added; the acid pins it as the closing of the todo.)*

**The honest limit — the forged-label liar (codify, don't paper over):**
- `it('a FORGED-label claim is NOT flagged — single-source detection cannot prove the label false')`:
  same call but `scope: 'KB7 - Yönetici Raporu'` (forged to match) → **no** `scope_divergence` (assert the
  filtered violations are empty). A comment states: this is the honest limit; detecting it needs a second
  source (Phase E reconciliation).
- `it('…but the forged-label liar is still CONTAINED — never authoritative')`:
  `trustRegistry.getTrust('evil-mcp').tier` is the floor (`unverified`) and `isAuthoritativeFor('evil-mcp', METRIC_IDS.OEE) === false`; a `reporting_mirror`'s `authoritativeMetrics` is `[]`. So even an un-flagged forged "KB7 OEE" comes from a source the system treats as **authoritative for nothing** — the role-ceiling neutralizes belief even where the scope check is defeated.

**The containment chain (re-assert end-to-end against the liar — reference the live proofs):**
- `it('unknown → floor: an undeclared lying backend is authoritative for nothing')`:
  `floorTrustFor('evil-mcp')` → `unverified`, `authoritativeMetrics: []`, `scopeIdentity.scopeSource: 'none'`;
  `referenceTrustFor('evil-mcp')` likewise. *(cite trustRegistry.test.ts / verifyBackendTrust A1.3.)*
- `it('cannot self-elevate: the trust tables are server-only (client writes revoked)')`:
  assert `grantPolicy` classifies `backends` + `backend_authority` as server-only (no `authenticated` write).
  *(cite verifyGrants 12/12 + the 42501 RLS-deny.)*
- `it('cannot poison the KB: a poisoned rule from the liar is rejected at the gate')`:
  run `runGate` on a poison draft (e.g. IKINCILUST "barcoded"/scrap-visible, or a Superset scope-neutralizing
  poison) → rejected at the behavioral stage. *(cite the existing gate poison tests.)*
- `it('tool-content is DATA not COMMAND: the liar cannot command the agent')`:
  a malicious tool description/result never reaches `buildSystemPrompt` (assert via the same structural
  property A2 proved — buildSystemPrompt takes only tool *names*). *(cite injectionBoundary.test.ts.)*

Keep the four pre-existing A2 acids (#1–#4) intact above; the new acids extend them. The file's top comment
should be updated: the deferred acid is now realized; the forged-label case is the codified limit, not a TODO.

## 2. CONSTRAINTS / TRAPS (any violation = fails review)
- **TEST-ONLY.** No `_lib`/`chat.ts`/prompt/gate change. Prove: `git diff --stat 8e9f65d -- api/cwf/_lib api/cwf/chat.ts` → **empty**. D-core asserts existing behavior; it builds no new runtime path.
- **Do NOT "fix" the forged-label limit.** The forged-label acid MUST assert **no** `scope_divergence`. Adding
  any heuristic to flag it (name-parsing "Granit" out of a forged "KB7" label, a fuzzy score, an LLM judge)
  is a hard stop — it over-fires on honest data and breaks RULE 5. The limit is the point; codify it.
- **Deterministic only (RULE 5).** Every acid asserts a deterministic property (trust floor, grant policy,
  gate verdict, structural guard, scope check). No model, no score.
- **No new quarantine/reconciliation here.** Quarantine = deferred (operator kill-switch → governance UI).
  Reconciliation = Phase E. D-core neither builds nor stubs them beyond a docs note.
- Secrets via env only; evidence never to telemetry; don't touch CWF-DEMO.

## 3. DOCS (RULE 3)
- `.agents/CHANGELOG.md`: D-core — lying-backend acid test; containment proven end-to-end; the forged-label
  **limit codified** (contained, not detected); quarantine + reconciliation explicitly deferred (UI / Phase E).
- `.agents/AGENTS.md` — a standing line (next free RULE #): *the forged-datasource liar is contained, not
  detected; single-source detection of a forged scope label is impossible — never add a heuristic that
  pretends otherwise (RULE 5). Detection requires cross-source redundancy (reconciliation).* 
- SKILL KB: record the acid + the honest endgame (software contains, redundancy reveals).
- ROADMAP: **D-core ✅** (containment acid). Next: **E — cross-source reconciliation** (the redundancy that
  detects the forged liar, gated on ARMES-on + data comparability). **Quarantine** → governance-panel UI backlog.

## 4. SELF-VERIFY CHECKLIST (report MUST show evidence)
- [ ] Pre-flight §0: HEAD `8e9f65d`; the `it.todo` + four existing acids quoted; each chain piece's anchor
      cited (trust floor / grantPolicy / runGate poison / A2 structural / C scope_divergence).
- [ ] The `it.todo` is **gone**, replaced by the real acids (honest-label flagged · forged-label not-flagged ·
      forged-label contained · the four chain acids).
- [ ] **Source-frozen:** `git diff --stat 8e9f65d -- api/cwf/_lib api/cwf/chat.ts` → empty (paste). Only the
      acid test file + docs changed.
- [ ] The forged-label acid asserts **no** `scope_divergence` (the limit) AND `isAuthoritativeFor(...) === false`
      (the containment) — both, in the same place.
- [ ] **No heuristic** added to catch the forge (grep the test for any name-parse/score/model — none).
- [ ] Full green: `tsc -b` · api nodenext · `vite build` · `oxlint(0)` · `vitest` — report the new total
      (the `+1 todo` should drop to `0 todo` since the `it.todo` is realized).
- [ ] CHANGELOG + AGENTS line + SKILL + ROADMAP updated.
- [ ] Commit: `test(phaseD-core): lying-backend acid — containment proven end-to-end; forged-label limit
      codified (contained, not detected); closes the A2 it.todo. test-only, no source change`. Report HEAD.

**Stop conditions:** a `_lib`/answer-flow file changes (D-core is test-only — a needed change means a real
gap, surface it); the forged-label acid is made to "pass" by flagging the forge (RULE 5 hard stop); any
new quarantine/reconciliation runtime code appears (out of scope).

---

## 5. WHERE D-core LEAVES THE LINE
The trust line's containment story is now **closed and proven**: an attached/hostile MCP is routed &
ceiling-capped (A1), privilege-hardened (A1.1), structurally unable to command the agent (A2), fully
traceable in origin & claimed scope (B1/B2), and its honest wrong-scope data is detected & corrected at
answer time (C) — and the **one thing software cannot do from a single source** (catch a forged scope label)
is codified as a limit, not hidden. Two honest follow-ons remain, both correctly *outside* this line:
- **Phase E — cross-source reconciliation:** the *only* way to turn the forged liar from contained to
  detected — cross-check the mirror's "KB7 OEE" against ARMES's KB7 OEE; divergence → flag. Gated on ARMES
  active + a proof the cross-source data is comparable (run an ARMES-on acceptance pass first).
- **Quarantine (operator deny):** the deterministic kill-switch for a *declared-but-suspect* backend —
  pairs with the governance-panel UI work (a "deny backend" control), not the trust line.
