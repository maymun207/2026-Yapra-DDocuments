# Claude Code — PHASE B1: Envelope Provenance
**Artifact: `claude-code-PHASE-B1-envelope-provenance-v1.md` · v1 · 2026-06-28**
*(Implements ADR-001 v2, Phase B — the envelope tier. Payload tier = B2, separate.)*

> **Read the whole prompt before writing a line.** B1 is the *cheap, unforgeable* half of provenance.
> It stamps every backend-sourced tool result with **`backendId · tool · serverName`** — values the
> **agent assigns from its own config**, which a backend cannot forge. It does **NOT** extract anything
> from inside the result body (that is payload provenance — `datasource·scope` — and it is B2, where the
> value becomes a backend *claim*). **B1 captures and surfaces provenance; it does NOT validate or route
> on it.** No answer behavior changes — the grounding checks stay byte-identical. Enforcement is Phase C.
>
> **The one trap that voids this phase (ADR-001 v2, A2):** envelope provenance must come from
> `server.backend_id` / `server.name` (the agent's own resolved config), **never** from a field read out
> of the tool result. If you find yourself parsing a `backend`/`backendId` out of `formatted`/`resultText`,
> STOP — that is a forgeable payload claim, not envelope provenance, and it defeats the entire point.

---

## 0. HARD PRE-FLIGHT GATE (do all; paste evidence; do not proceed on any failure)

1. `git rev-parse HEAD` → MUST be `531cfc5…` (A2 injection boundary). Clean tree.
2. **Confirm the chokepoint:** `sed -n '585,592p' api/cwf/chat.ts` → `toolResultMetas.push(parseToolResultMeta(toolDef.name, formatted))` (line ~589) runs inside the MCP tool `execute:` closure, where `server` (from `serverMap.get(toolDef.serverId)`) is in scope and carries `server.backend_id` + `server.name`. Quote it. This is the only place envelope provenance is assigned.
3. **Confirm the carrier:** `sed -n '/interface ToolResultMeta/,/^}/p' api/cwf/_lib/grounding/types.ts` → it has `toolName/recordCount/returnedRecords/stored/compacted/truncated/resultHandle` and **no provenance** today. This is what you extend.
4. **Confirm behavioral inertness is possible:** the three grounding checks (`checkEmptyAsZero`, `checkCountUnderstatement`, `checkFabricationRisk`) and `runGroundingCheck` read only the existing count/stored/etc. fields — none read a provenance field. So adding provenance fields cannot change a verdict. Quote the three check signatures to show they don't take/read provenance.
5. Accepted basis = **ADR-001 v2, mechanism 2 + amendment A2:** provenance is two tiers — **envelope** (`backend·tool·serverName`, agent-assigned, unforgeable, ship first) vs **payload** (`datasource·scope`, backend-claimed, role-ceilinged, B2). B1 builds the envelope tier only.

---

## 1. SCOPE (build exactly this)

### 1.1 The provenance type — extend the carrier (`api/cwf/_lib/grounding/types.ts`)
`ToolResultMeta` is the carrier the grounding validator already consumes and B/C/D will read. Add a
**nested** provenance object so the two tiers stay visibly distinct (committed recommendation — nested,
not flat, so B2's payload tier slots in without re-shaping):

```ts
/**
 * Provenance of a tool result. TWO TIERS (ADR-001 v2, A2):
 *  - envelope: assigned by the AGENT from its own resolved config (server.backend_id / .name).
 *    UNFORGEABLE by the backend. Populated here in B1.
 *  - payload (B2): datasource/scope read from INSIDE the result body — a backend CLAIM,
 *    role-ceilinged, never ground truth. NOT populated in B1 (left as a documented seam).
 */
export interface FactProvenance {
    /** envelope — agent-assigned, unforgeable. */
    backendId?: string;     // server.backend_id (the agent's config), NOT a field from the result
    tool: string;           // the tool name that produced the result
    serverName?: string;    // server.name
    // payload (B2): datasource?: string; scope?: string;  ← do NOT populate in B1
}
```
Add `provenance?: FactProvenance` to `ToolResultMeta`. Keep `toolName` as-is (don't rename; `provenance.tool`
mirrors it). If a small dedicated home reads cleaner than `grounding/types.ts`, a `_lib/provenance/types.ts`
is acceptable — but `ToolResultMeta` stays the carrier the validator consumes; don't fork the type.

### 1.2 Stamp the envelope at the chokepoint (`groundingCheck.ts` + `chat.ts`)
- Extend `parseToolResultMeta(toolName: string, formatted: string, server?: { backend_id?: string; name?: string })`
  to set `provenance = { tool: toolName, backendId: server?.backend_id, serverName: server?.name }`. The
  envelope is built from the **server argument**, never from `formatted`. (Parse `formatted` only for the
  existing count/stored/etc. fields, exactly as today.)
- At `chat.ts` ~589, pass `server`: `parseToolResultMeta(toolDef.name, formatted, server)`. `server` is
  already in scope in that closure.
- **Local tools** (the time tool, `aggregate_records`/`query_records`) are agent-local, not a backend.
  They do not currently push a `ToolResultMeta`; leave that unchanged. (If you choose to give them a meta
  for completeness, their `backendId` is **undefined** — envelope provenance describes *backend*-sourced
  facts, and a local tool has no backend. Do not invent a fake backendId.)

### 1.3 Surface it (observability only — NOT enforcement)
Provenance is captured to be *visible*, so C can later route on it and you can see it now:
- Add `backendId` to the existing `tool_call` telemetry payload (it already carries `server: server.name`)
  — e.g. `payload: { ok, server: server.name, backendId: server.backend_id }`.
- Optionally include a compact provenance summary on the `done` SSE payload next to the grounding verdict
  (envelope only). Keep it small; this is for visibility, not the UI contract.
- **Do NOT** feed provenance into `runGroundingCheck`'s logic, answer routing, or any decision. B1 is
  capture + surface. The validator's verdict must be unchanged (§2).

---

## 2. EXPLICIT CONSTRAINTS / TRAPS (violating any = phase fails review)

- **Envelope is agent-assigned, never payload-read (A2).** `backendId`/`serverName` come ONLY from the
  `server` argument (the agent's resolved config). Prove it: a grep of the diff shows no new code reading
  a `backend`/`backendId`/`datasource`/`scope` field out of `formatted`/`resultText`/the parsed result.
- **No payload tier in B1.** Do not extract `datasource`/`scope` from the result body — that is B2, and it
  is a *claim*, not envelope-grade. Leave the documented seam; populate nothing.
- **Behaviorally inert — the verdict cannot change.** The three grounding checks and `runGroundingCheck`
  stay byte-identical. Prove it with a test: `runGroundingCheck` returns the **same verdict** for inputs
  with and without `provenance` populated. And `git diff bc7…/531… -- groundingCheck.ts` shows changes
  ONLY in `parseToolResultMeta` (the helper), not in any `check*` function or `runGroundingCheck`.
- **No answer-routing on trust/provenance.** That is Phase C. B1 does not consult trust, does not decline,
  does not re-rank. The agent answers exactly as it does at `531cfc5`, now with provenance attached.
- **Frozen set:** `git diff --stat 531cfc5 -- api/cwf/_lib/llm api/cwf/_lib/prompt api/cwf/_lib/knowledge/gate
  api/cwf/_lib/backends/trustRegistry.ts` → **empty**. B1 touches only `grounding/types.ts`,
  `groundingCheck.ts` (the `parseToolResultMeta` helper), and `chat.ts` (the closure + telemetry), plus tests.
- RULE 1 (no hardcoded literals — a `LOCAL`/sentinel, if any, lives in a const); secrets via env only;
  don't touch CWF-DEMO; Superset stays a gateway.

---

## 3. TESTS (vitest) — `api/cwf/__tests__/provenance.envelope.test.ts`
- **stamps envelope from server:** `parseToolResultMeta('getDailyOeeValues', '{}', { backend_id: 'armes', name: 'ARMES' })`
  → `provenance.backendId === 'armes'`, `provenance.serverName === 'ARMES'`, `provenance.tool === 'getDailyOeeValues'`.
- **graceful without server:** `parseToolResultMeta('x', '{}')` → `provenance.tool === 'x'`, `backendId`/`serverName`
  undefined (no throw). (Local tools / missing config never crash.)
- **envelope is NOT payload-derived:** given `formatted` that *contains* a `"backendId":"superset"` field in
  its JSON body but a `server` of `{ backend_id: 'armes' }`, the stamped `provenance.backendId` is **`'armes'`**
  (from the server, not the forgeable body). This is the anti-forgery proof.
- **verdict unchanged (behaviorally inert):** `runGroundingCheck` returns an identical verdict for a meta
  array with vs without `provenance` populated (same `ok`, same `violations`).
- existing count/stored parsing still works (regression — `parseToolResultMeta` still reads recordCount etc.).

## 4. DOCS (RULE 3 — part of "done")
- `.agents/CHANGELOG.md`: Phase B1 — envelope provenance (backend·tool·serverName), agent-assigned, no
  behavioral change; payload tier deferred to B2.
- AGENTS / SKILL KB: a short note that `ToolResultMeta.provenance` now exists; envelope = unforgeable
  (agent-assigned), payload = B2 claim; the validator/router consume it in C.
- ROADMAP: add the B-line (B1 done; B2 next).

---

## 5. SELF-VERIFY CHECKLIST (the report MUST contain evidence for each)

- [ ] Pre-flight §0: HEAD `531cfc5`; quoted the chokepoint (closure with `server` in scope), the
      `ToolResultMeta` shape, and the three checks not reading provenance.
- [ ] `types.ts` diff: `FactProvenance` (two-tier comment) + `provenance?` on `ToolResultMeta`.
- [ ] `groundingCheck.ts` diff: ONLY `parseToolResultMeta` gained the `server` param + envelope stamp;
      no `check*` / `runGroundingCheck` logic changed (paste the diff).
- [ ] `chat.ts` diff: `parseToolResultMeta(..., server)` + `backendId` on the `tool_call` telemetry.
- [ ] **Anti-forgery proof:** grep of the diff shows envelope sourced from `server.*`, never from
      `formatted`/result body (paste the grep — no `backendId`/`datasource` read out of the payload).
- [ ] `provenance.envelope.test.ts` green: stamps-from-server, graceful-without-server,
      **not-payload-derived** (the anti-forgery test), verdict-unchanged, count-parsing-regression.
- [ ] **Frozen diff empty:** `git diff --stat 531cfc5 -- api/cwf/_lib/llm api/cwf/_lib/prompt
      api/cwf/_lib/knowledge/gate api/cwf/_lib/backends/trustRegistry.ts` → empty (paste).
- [ ] Confirm: B1 does NOT consult trust, route, decline, or re-rank — answers are identical to `531cfc5`
      with provenance merely attached.
- [ ] Full green: `tsc -b` · api nodenext · `vite build` · `oxlint(0)` · `vitest` (report the new total).
- [ ] CHANGELOG + AGENTS/SKILL + ROADMAP updated.
- [ ] Commit: `feat(phaseB1): envelope provenance — backend·tool·serverName on ToolResultMeta
      (agent-assigned, unforgeable); capture+surface only, no validation/routing`. Report new HEAD.

**Stop conditions (report instead of pushing through):** envelope `backendId` is read from the result
body instead of `server` (forgeable — hard stop); a grounding `check*`/`runGroundingCheck` verdict
changes; any answer-routing/decline on trust or provenance appears (that's C); any frozen file shows a diff.

---

## 6. WHERE B1 SITS (so the next step is obvious)
B1 lays the unforgeable envelope substrate. **B2** adds payload provenance — the per-backend `datasource`/
`scope` extractor driven by each backend's `scope_identity` contract (A1), carried as a role-ceilinged
*claim*. **C** is where provenance finally does work: the deterministic scope/authority validator (answer
claims "KB7…" but the producing result's payload datasource is "Granit…" → flag), billed tier-honest
(strong vs an honest backend, containment vs a forged-label liar). B1 changes no answer; it makes the
origin of every backend fact knowable.
