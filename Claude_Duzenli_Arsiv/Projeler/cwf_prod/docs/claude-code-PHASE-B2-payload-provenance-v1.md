# Claude Code — PHASE B2: Payload Provenance (the backend's scope CLAIM)
**Artifact: `claude-code-PHASE-B2-payload-provenance-v1.md` · v1 · 2026-06-28**
*(Implements ADR-001 v2, Phase B — the payload tier. Envelope tier = B1, shipped at `97406fe`.)*

> **Read fully before writing a line.** B2 is the *backend-shaped, forgeable* half of provenance. It reads
> a **scope claim** — `datasource` / `scope` — from **inside the result body** and attaches it to
> `FactProvenance`. Unlike the B1 envelope (agent-assigned, unforgeable), this is a **CLAIM the backend
> makes about its own data**: role-ceilinged, never ground truth. B2 **captures the claim; it does NOT
> validate, compare, route, or apply the role-ceiling** — that is **Phase C**. No answer behavior changes;
> the grounding verdict stays byte-identical, exactly like B1.
>
> **Why now, with evidence (the 3-provider acceptance test):** with the P6.8 guards live, no provider
> *fabricated* KB7 — but the most capable one still **put Granit OEE values in the answer body** under a
> disclaimer (a `get_chart_data` on chart 146 `"Granit - Hat Günlük OEE Grafiği"`). The guards *contained*
> the worst case; they did not *prevent* wrong-scope oversharing — because the prompt layer is
> model-dependent. C's deterministic validator will flag "answer claims KB7 but the producing result's
> scope is Granit." **C cannot do that without the scope claim attached to each result. B2 attaches it.**
>
> **The hard rule that defines this phase (ADR-001 v2, A2):** the payload claim is **role-ceilinged and
> never raises trust**. A `reporting_mirror`'s `datasource: "Granit"` does not make it authoritative for
> anything; it is the backend's self-report, usable only to *detect divergence* (C), never to *grant
> belief*. If you find B2 code using the claim to decide, rank, trust, or filter — STOP; that is C.

---

## 0. PRE-FLIGHT GATE (do all; paste evidence; stop on any failure)

1. `git rev-parse HEAD` → `97406fe…` (B1 envelope). Clean tree.
2. **Confirm the seam B1 left:** `sed -n '/export interface FactProvenance/,/^}/p' api/cwf/_lib/grounding/types.ts`
   → envelope fields populated, `datasource?` / `scope?` present as a **commented-out** payload seam. You
   uncomment + populate these.
3. **Confirm the populate point:** `sed -n '/export function parseToolResultMeta/,/catch/p' api/cwf/_lib/grounding/groundingCheck.ts`
   → it already builds `provenance` from `server`, and already `JSON.parse(formatted)` into `o`. B2 reads
   `o` (the body) for the payload claim and merges it in. The `server` arg gives you `backend_id`.
4. **Confirm the contract that drives extraction:** `sed -n '/export interface ScopeIdentityContract/,/^}/p;/REFERENCE_BACKEND_TRUST/,/^];/p' api/cwf/_lib/knowledge/reference/backendTrust.ts`
   → `ScopeIdentityContract { scopeSource: 'zone'|'datasource'|'none', scopeFieldHint?, note? }`; armes →
   `zone`; superset → `datasource` + `scopeFieldHint: 'bound datasource_name'`. `referenceTrustFor(backendId)`
   returns it (synchronous, code reference). **This is the structural contract — it drives extraction.**
5. **Confirm the checks won't change:** the three `check*` + `runGroundingCheck` read none of
   `datasource`/`scope` — so adding the claim is behaviorally inert (paste the three signatures).

---

## 1. SCOPE (build exactly this)

### 1.1 Open the payload tier on `FactProvenance` (`grounding/types.ts`)
Uncomment + document the two payload fields with the role-ceiling stated **in the type**:
```ts
    // ── payload — backend CLAIM, read from the result body. Role-ceilinged; NEVER ground truth. ──
    /** The backend's self-reported bound datasource (e.g. Superset 'datasource_name'). A CLAIM. */
    datasource?: string;
    /** Best-available scope token the result identifies itself by (datasource / resource name). A CLAIM
     *  — used by C ONLY to DETECT scope divergence (KB7 asked vs 'Granit' produced); it raises no trust. */
    scope?: string;
```
Keep the envelope/payload split visibly commented (envelope = agent-assigned/unforgeable; payload =
backend-claimed/forgeable).

### 1.2 The extractor — `grounding/payloadProvenance.ts` (NEW, pure, contract-driven)
`extractPayloadClaim(backendId: string | undefined, parsedBody: Record<string, unknown>) → { datasource?: string; scope?: string }`
- Look up `referenceTrustFor(backendId).scopeIdentity` (code reference — **do NOT** reach into the DB-warmed
  trust registry; the contract is structural, not gated value).
- `scopeSource === 'datasource'` (Superset, `reporting_mirror`): pull the scope claim from the body's
  top-level identifying fields, in this honest order of preference:
  `datasource` = `datasource_name` (the structured field, when present);
  `scope` = first present of `datasource_name` → `slice_name` → `chart_name` → `table_name` → `dashboard_title`.
  Rationale (from the live test): a `get_chart_data` result carries `chart_name: "Granit - …"` (no
  structured `datasource_name`), so the resource-name token is the only scope signal there — carry it.
  For a heterogeneous multi-item list with **no single** scope, return `{}` (honest "no single scope").
- `scopeSource === 'zone'` (ARMES, `system_of_record`): minimal — `scope` = the zone if it's cheaply present
  as a top-level field in the body, else `{}`. Do NOT over-build ARMES; it's authoritative and low-divergence.
- `scopeSource === 'none'` (unknown / local meta-tools): `{}`. Never fabricate a scope.
- **Pure, total, never throws.** Missing/odd shapes → `{}`. The claim is best-effort and honest about absence.

### 1.3 Wire it into `parseToolResultMeta` (`groundingCheck.ts`)
Inside the existing `try` (where `o` is parsed and `server` is in scope), merge the claim:
`const payload = extractPayloadClaim(server?.backend_id, o); ... provenance = { ...provenance, ...payload };`
- On JSON-parse failure (`catch`): **no payload** (an unparseable body yields no claim) — envelope still
  attached, exactly as today.
- **No `check*` / `runGroundingCheck` logic touched.** `chat.ts` should need **no change** (it already
  passes `formatted` + `server`) — confirm its diff is empty.

---

## 2. CONSTRAINTS / TRAPS (any violation = fails review)

- **Claim, never truth; never raises trust.** B2 attaches the backend's self-report. It must not be read to
  trust, rank, filter, decide, or elevate anything. The role-ceiling (a `reporting_mirror` claim is
  authoritative for nothing) is **applied in C**, via the trust *registry*; B2 carries the unjudged claim.
- **Two-tier source honesty (B1's anti-forgery must still hold).** Envelope (`backendId`/`serverName`) comes
  from `server`; payload (`datasource`/`scope`) comes from the body. Never source `backendId` from the body
  (B1's property) and never treat `datasource` as unforgeable. Grep proof: the only new body-reads are the
  scope fields; `backendId` is still only `server.backend_id`.
- **Behaviorally inert — verdict unchanged.** `runGroundingCheck` returns an identical verdict with vs
  without the payload claim populated (prove with a test). Same discipline as B1.
- **Contract-driven, not hardcoded per result.** Extraction is keyed off `scopeIdentity.scopeSource`
  (from `referenceTrustFor`), not an `if (toolName === 'get_chart_data')` ladder. The field-preference list
  is data; no string literals for backend ids/tiers (RULE 1).
- **Best-effort + honest absence.** No scope signal → `{}`, never a guessed/fabricated scope. Don't parse
  cleverness ("strip everything before ' - '") — carry the raw identifying token; C does the comparison.
- **Frozen set empty:** `git diff --stat 97406fe -- api/cwf/chat.ts api/cwf/_lib/llm api/cwf/_lib/prompt
  api/cwf/_lib/knowledge/gate api/cwf/_lib/backends/trustRegistry.ts` → empty. B2 touches only
  `grounding/types.ts`, `grounding/payloadProvenance.ts` (new), `grounding/groundingCheck.ts`
  (`parseToolResultMeta` only), + tests/docs.

---

## 3. TESTS — `api/cwf/__tests__/payloadProvenance.test.ts`
- **Superset structured:** body `{ datasource_name: 'Granit', slice_name: 'Granit - Hat OEE Tablosu' }`,
  backend `superset` → `datasource === 'Granit'`, `scope` carries 'Granit'.
- **★ Live-threat fixture (ties to the acceptance test):** body
  `{ chart_id: 146, chart_name: 'Granit - Hat Günlük OEE Grafiği', chart_type: 'echarts_timeseries_line' }`,
  backend `superset` → `scope` contains 'Granit' (no structured `datasource_name`, so the chart_name token
  is the claim). **This is the exact P3 case C must later flag against a 'KB7' request.**
- **No single scope:** a multi-item list body with no top-level scope → `{}` (honest).
- **ARMES minimal:** a zone-bearing body, backend `armes` → `scope` = the zone (or `{}` if absent); never throws.
- **Unknown/local → `{}`:** backend `undefined` or `'totally-unknown'` → no payload claim.
- **Claim raises nothing:** assert the extractor returns only `{datasource?,scope?}` — no tier/trust field;
  it's data, not a judgment.
- **Verdict unchanged:** `runGroundingCheck` identical with vs without payload populated.
- **Anti-forgery intact:** body says `backendId: 'superset'` but `server` is `armes` → envelope stays
  `armes` (B1 property holds; payload may carry the body's scope, but the *envelope* is untouched).

## 4. DOCS (RULE 3)
- `.agents/CHANGELOG.md`: Phase B2 — payload provenance (`datasource`/`scope` claim from the body, driven
  by `scope_identity`); role-ceilinged, never ground truth; behaviorally inert; C consumes it.
- SKILL KB / ADR note: provenance is now two-tier and complete (envelope B1 + payload B2). Record the
  claim/ceiling rule so C's author treats `datasource` as evidence-of-divergence, never as trust.
- ROADMAP: B2 done; **C next** (deterministic scope/authority validator).

---

## 5. SELF-VERIFY CHECKLIST (report MUST show evidence)
- [ ] Pre-flight §0: HEAD `97406fe`; quoted the payload seam, the `parseToolResultMeta` populate point, the
      `ScopeIdentityContract` + armes/superset declarations, and the three checks not reading scope.
- [ ] `types.ts`: payload fields opened with the role-ceiling stated in the type.
- [ ] `payloadProvenance.ts`: pure, total, contract-driven (`referenceTrustFor().scopeIdentity`); honest
      `{}` on absence; no DB/registry coupling; no literals.
- [ ] `groundingCheck.ts`: `parseToolResultMeta` merges the claim inside the `try`; `catch` yields no
      payload; **no `check*`/`runGroundingCheck` change** (paste that part of the diff).
- [ ] `chat.ts` diff **empty** (no answer-flow change) — paste `git diff --stat 97406fe -- api/cwf/chat.ts`.
- [ ] Tests green incl. the **★ live-threat fixture** (Granit chart_name → scope claim) and **verdict-unchanged**.
- [ ] **Frozen diff empty** (gateway/prompt/gate/trustRegistry) — paste.
- [ ] **Anti-forgery grep:** new body-reads are scope fields only; `backendId` still sourced from `server`
      exclusively (paste).
- [ ] Confirm B2 does NOT compare scope-to-request, apply the role-ceiling, route, decline, or re-rank — it
      only attaches the claim. Answers identical to `97406fe`.
- [ ] Full green: `tsc -b` · api nodenext · `vite build` · `oxlint(0)` · `vitest` (report new total).
- [ ] CHANGELOG + SKILL/ADR + ROADMAP updated.
- [ ] Commit: `feat(phaseB2): payload provenance — datasource/scope CLAIM from result body, driven by
      scope_identity (role-ceilinged, never ground truth); capture only, no validation/routing`. Report HEAD.

**Stop conditions:** the claim is used to trust/rank/filter/decide anything (that's C — hard stop); a
`check*`/`runGroundingCheck` verdict changes; `backendId` is read from the body (B1 anti-forgery broken);
the extractor throws on an odd body instead of returning `{}`; any frozen file diffs.

---

## 6. WHERE B2 SITS (C is the inflection)
After B2, every backend-sourced result carries both tiers: **envelope** (which backend produced it,
unforgeable) + **payload** (what scope the backend *claims* it is, forgeable). Nothing yet acts on this.
**C** is where trust finally does work: a deterministic, answer-time validator (sibling of ARMES
`groundingCheck`, Mode A advisory) that, when the answer is about scope X (e.g. KB7) but the producing
result's payload scope is Y (e.g. Granit) **and** the producing backend isn't authoritative for the metric
(trust-registry role-ceiling), **flags** it — the third defense layer the acceptance test proved is needed.
Honest billing carries forward: strong vs an honest backend; **containment, not detection,** vs one that
forges its datasource label (→ Phase D redundancy/acid).
