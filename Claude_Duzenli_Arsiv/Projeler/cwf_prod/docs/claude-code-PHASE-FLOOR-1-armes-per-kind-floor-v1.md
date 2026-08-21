# PHASE FLOOR-1 — ARMES per-kind knowledge floor (parity with Superset)
<!-- artifact: claude-code-PHASE-FLOOR-1-armes-per-kind-floor-v1.md · rev 1 · 2026-07-01 -->

**Lane:** Author (Claude Code 4.8 / AG). **Repo:** `cwf_yaprak` (canonical). **Base:** master HEAD `8e2692f`.
**Type:** floor-integrity fix (code-only, additive). **Blast radius:** one composer + tests + docVersion. **No** admin-UI, **no** migration, **no** secret, **no** dependency.

---

## 0. Diagnosis (what is broken and why)

The ARMES always-inject knowledge slice is composed two ways that MUST agree:
- **code floor** — `renderArmesCriticalSlice()` (`api/cwf/_lib/knowledge/backends/armes/render.ts:74`) renders directly from the typed constants `ZONES / METRICS / FORMATS / BLIND_SPOTS / GLOSSARY / TOOL_GRAPH_ENTRY / SEQUENCING_RULE / ARMES_PERSONA_TEXT`.
- **DB path** — `composeArmesContext(rules)` (`api/cwf/_lib/knowledge/composeArmes.ts`) maps published `domain_rules` by kind, then renders via the SAME `renderCriticalSliceFrom(...)`.

**The bug:** `composeArmesContext` has **no per-kind floor**. For the array kinds it does `byKind(rules, …).map(payload)` with **no baseline fallback**, so a kind with zero governed rows renders **empty**. `persona` has **no fallback at all** (undefined → no persona block). Only `toolGraphEntry` / `sequencingRule` carry fallbacks, and those are **hardcoded string literals** duplicated from `toolGraph.ts` (RULE-1 drift).

`DbKnowledgeProvider.warm()` gates on the **total** published count (`rules.length === 0 → floor; else compose all`) — **not per-kind**. So any partial published state (e.g. an operator **archives** the blind-spot rules — archive is not the publish gate; `POST /api/admin/rules/[id] {action:'archive'}`) leaves ARMES DB-served with an **empty blind-spot slice**. The model then loses the always-inject IKINCILUST rule ("barkodsuz → fire ARMES'te görünmez, ASLA sıfır deme"). The static header `### KÖR NOKTALAR (CRITICAL — BOŞ ≠ SIFIR)` (`render.ts:66`) survives, but the **specific zone rules under it vanish** — the degradation.

**Superset already solves this** (`composeSuperset.ts` → `pick(rows, baseline)` per kind: governed rows override; empty → code baseline floor). This phase **mirrors that exact pattern into ARMES**. The runtime `groundingCheck` (code-sourced `BLIND_SPOTS`) is a post-stream backstop, but the prompt-layer floor is the first line and must not be emptiable by publish granularity.

**Target invariant (headline):** `composeArmesContext([]).injected === renderArmesCriticalSlice()` — byte-identical. With a full published set the output is **unchanged** (rows present → override), so the normal seeded path and every prompt snapshot are byte-identical; flooring only manifests when a kind is empty.

---

## 1. HARD PRE-FLIGHT GATE (stop if any fails; paste evidence)

1. `git rev-parse HEAD` → **must be `8e2692f`** (or a descendant you name). `git status --porcelain` → **clean**.
2. Baseline green: run the full suite once BEFORE touching anything. Record the pass count (bootstrap says **497**). If it is not green at HEAD, STOP and report — do not build on a red base.
3. Confirm the three anchor facts by reading the files (paste the lines):
   - `composeArmes.ts` array kinds have **no** baseline fallback; `persona` has **no** fallback; `toolGraphEntry`/`sequencingRule` use **hardcoded literals**.
   - `render.ts:74` `renderArmesCriticalSlice()` passes `persona: ARMES_PERSONA_TEXT` and the 5 baseline arrays + 2 singletons.
   - `composeSuperset.ts` `pick<T>(rows, baseline)` exists and is applied to all Superset array kinds (the pattern you will mirror).
4. Confirm the eval-gate coupling (this governs the one intended verdict change below):
   - `evalGate.ts` `stageBehavioral` (~line 92): the blind-spot guard is a **raw-row** check `if (blindSpots.length === 0) …fail` (operates on candidate rows, **not** the composed slice) — flooring cannot mask it.
   - `evalGate.ts` `REQUIRED_MARKERS = ['KÖR NOKTALAR','BOŞ','SIFIR','getFactoryLines','K4']`. Verify (grep `render.ts`): `KÖR NOKTALAR`,`BOŞ`,`SIFIR` are **static header text** (`render.ts:66`, unconditional); `getFactoryLines` comes from the entry fallback (always present); **`K4` is the only data-driven marker** (from a metric).

---

## 2. HARD CONSTRAINTS

- **Mirror Superset exactly.** Add a local `pick<T>(rows, baseline)` to `composeArmes.ts` identical in behavior to `composeSuperset.ts`'s. **Do NOT** modify `composeSuperset.ts` or extract a shared helper (keep the working Superset path byte-unchanged; a shared-helper refactor is out of scope).
- **Floor ALL kinds** so the headline byte-identity invariant holds: array kinds via `pick(...)`; `persona` via `?? ARMES_PERSONA_TEXT`; `toolGraphEntry`/`sequencingRule` fallbacks switched from the hardcoded literals to the imported `TOOL_GRAPH_ENTRY` / `SEQUENCING_RULE` constants (single-source; RULE-1).
- **No eval-gate machinery change.** Do not touch `runGate`, `GATE_STAGES`, `buildCandidate`, `stageReferential`, or the Superset stages. `stageBehavioral` calls `composeArmesContext` — that call is unchanged; only the composer it invokes gains flooring.
- **The ONE intended verdict change, and only this one:** a candidate whose **metric** kind is empty flips gate behavioral from REJECT→PASS (today the `K4` marker is absent → reject; after the fix empty metrics floor to `METRICS` → `K4` present → the marker no longer forces reject). This is **correct**: after the fix the runtime slice ALSO floors `K4` in, so empty-metrics is harmless. You must (a) confirm this is the **only** verdict change, and (b) prove the two **dangerous** cases still REJECT (§4).
- **No new dependency, no migration, no `.env` read/write, no secret in logs.** Code + tests + docVersion only.
- **Behavior-preserving on the happy path:** with a full published set every kind has rows → `pick` returns rows → output identical to today. Prove via the existing suite (prompt snapshots, evalGate, supersetGate all green).

---

## 3. THE FIX — `api/cwf/_lib/knowledge/composeArmes.ts`

Add imports (baselines are the SAME symbols `render.ts` uses):
```ts
import { ZONES, METRICS, FORMATS, BLIND_SPOTS, GLOSSARY, TOOL_GRAPH_ENTRY, SEQUENCING_RULE } from './backends/armes/index.js';
import { ARMES_PERSONA_TEXT } from './backends/armes/personaText.js';
```

Add the helper (mirror of `composeSuperset.ts`):
```ts
/** Governed rows for a kind override the baseline; empty → code baseline floor. (Mirror of composeSuperset.pick — keeps the ARMES prompt-layer floor un-emptiable by publish granularity.) */
function pick<T>(rows: RuleInstanceLike[], baseline: T[]): T[] {
    return rows.length > 0 ? rows.map((r) => r.payload as unknown as T) : baseline;
}
```

Rewrite the body of `composeArmesContext` so every kind floors:
```ts
const zones      = pick<Zone>(byKind(rules, KIND_IDS.ZONE), ZONES);
const blindSpots = pick<BlindSpotRule>(byKind(rules, KIND_IDS.BLIND_SPOT), BLIND_SPOTS);
const metrics    = pick<MetricDefinition>(byKind(rules, KIND_IDS.METRIC_DEFINITION), METRICS);
const formats    = pick<ToolFormatRule>(byKind(rules, KIND_IDS.TOOL_FORMAT_RULE), FORMATS);
const glossary   = pick<GlossaryTerm>(byKind(rules, KIND_IDS.GLOSSARY_TERM), GLOSSARY);

const entryNode = byKind(rules, KIND_IDS.TOOL_GRAPH_NODE).find((r) => (r.payload as { role?: string }).role === 'entry');
const toolGraphEntry = (entryNode?.payload as { tool?: string } | undefined)?.tool ?? TOOL_GRAPH_ENTRY;      // was: ?? 'getFactoryLines'

const seqHint = byKind(rules, KIND_IDS.ROUTING_HINT).find((r) => r.key === 'sequencing');
const sequencingRule = (seqHint?.payload as { hint?: string } | undefined)?.hint ?? SEQUENCING_RULE;          // was: ?? 'Önce getFactoryLines …'

const persona = (byKind(rules, KIND_IDS.PERSONA_FRAGMENT)[0]?.payload as { text?: string } | undefined)?.text ?? ARMES_PERSONA_TEXT; // was: no fallback
```
Leave `renderCriticalSliceFrom({ … })` and the `references` mapping structurally as-is (references already derive from `glossary` — now floored — so they match `armesReferences()` on the empty path). Keep the file header comment accurate: add one line noting per-kind floor parity with Superset.

**Why this is gate-safe** (put this reasoning in the PR body): `stageReferential` reads raw candidate rows (never calls the composer) → unaffected. `stageBehavioral`'s blind-spot guard is a raw-row count → unaffected. The only composed-slice consumer is the `REQUIRED_MARKERS` check, and of those only `K4` is data-driven → the sole verdict change is empty-metrics REJECT→PASS, which is correct (runtime floors K4 too). Poisoned **override** (non-empty poisoned kind) does NOT floor (`pick` returns the rows) → poisoned text renders → correct marker lost → still REJECT.

---

## 4. TESTS (evidence, not vibes)

**New file `api/cwf/__tests__/composeArmes.test.ts`:**
1. **Headline parity:** `expect(composeArmesContext([]).injected).toBe(renderArmesCriticalSlice())` — byte-identical. (Import `renderArmesCriticalSlice` from `render.ts`.)
2. **Reference parity:** `composeArmesContext([]).references` equals `armesReferences()` (same length + ids).
3. **Per-kind partial floor:** compose with ONLY a `persona_fragment` row (no blind_spot/zone/metric rows) → assert the injected slice STILL contains the IKINCILUST blind-spot text (e.g. a substring from `BLIND_SPOTS[0].forbidden`) AND a zone line AND `K4`. Proves partial publish cannot empty the floor.
4. **Override wins:** compose with a governed `blind_spot` row whose content differs from baseline → assert the governed text appears and the baseline blind-spot text does NOT (rows override, not merge — same semantic as Superset `pick`).
5. **Full-set unchanged:** compose from a representative full set (or the seed fixture) → assert output is byte-identical to the pre-fix expectation (guard the happy path).

**Extend `api/cwf/__tests__/evalGate.test.ts` (dangerous-case guards — prove verdict unchanged where it matters):**
6. Candidate with **zero blind_spot rows** → `runGate(...)` behavioral **still fails** (raw-row guard) — flooring did not mask it.
7. Candidate with a **poisoned blind_spot override** (e.g. a zone flipped `hasBarcode:true` / a blind-spot rewritten to imply zero) → behavioral **still fails**. Reuse whatever poisoned fixture the file already has; if none, construct one from the invariant at `evalGate.ts` ~line 100 (zone `hasBarcode`/`scrapVisible` true under a blind-spot).
8. If any **existing** evalGate/supersetGate test flips as a result of the fix, it can ONLY be the empty-metrics case; update it to assert PASS **with an inline comment** explaining the floor makes empty-metrics harmless — and state in the report which test changed and why. If **no** existing test flips, say so explicitly.

Run the FULL suite. All prior tests + the new ones green.

---

## 5. LIVING-DOC + SEAL

This change is **below the depicted altitude** (the architecture diagram shows DB-first/code-floor at the layer level; per-kind flooring is an implementation detail beneath it). Per the altitude rule → **manifest/docVersion bump + a review note**, **no diagram redraw**.
- Bump `docVersion` by 1 from whatever HEAD shows (bootstrap: rev 15 → **rev 16**; read the actual source of truth and bump it, don't trust this number).
- Add a manifest/CHANGELOG note: "FLOOR-1: composeArmes per-kind floor → parity with composeSuperset; `composeArmesContext([]) === renderArmesCriticalSlice()`; single verdict change (empty-metrics reject→pass, floor-justified); Superset path byte-unchanged."
- Update the in-repo KB (`.agents/skills/cwf-project-kb/SKILL.md`) if it documents the ARMES/Superset floor asymmetry — record that the asymmetry is now closed.
- **Two-commit seal:** commit 1 = code+tests (`fix(knowledge): per-kind floor for composeArmes — parity with Superset (FLOOR-1)`); commit 2 = doc/manifest/docVersion bump. Open a PR; report the PR number + both SHAs.

---

## 6. SELF-VERIFY CHECKLIST (paste evidence for each)

- [ ] Pre-flight gate all green (HEAD, clean tree, baseline 497 green, the four fact confirmations with pasted lines).
- [ ] **Headline test passes:** `composeArmesContext([]).injected === renderArmesCriticalSlice()` (paste the assertion + green result).
- [ ] Partial-floor test (persona-only) shows IKINCILUST blind-spot text + zone + K4 present (paste).
- [ ] Override test shows governed text wins, baseline dropped (paste).
- [ ] Gate dangerous-cases: empty blind_spots → REJECT; poisoned override → REJECT (paste both).
- [ ] The ONLY verdict change is empty-metrics reject→pass — named, justified; either the one existing test updated (with reason) OR confirmed none exists.
- [ ] `composeSuperset.ts` **untouched** (`git diff --stat` shows it absent). No new deps, no migration, no `.env`/secret access.
- [ ] Full suite green with the new tests; report old→new pass count.
- [ ] `git diff --stat` of the whole PR (should be: `composeArmes.ts`, `composeArmes.test.ts`, `evalGate.test.ts`, doc/manifest/docVersion — nothing else in `src/` or other backends).
- [ ] docVersion bumped; manifest note added; two-commit seal; PR number + both SHAs reported.

**Do not** claim done from a green build alone — a green build with a masked blind-spot regression is exactly the failure mode. The headline byte-identity test + the two dangerous-case gate guards are what prove correctness. Report all evidence; I review by cloning and diffing against `8e2692f`.
