# Claude Code — PHASE C: Deterministic Scope / Authority Validator (+ deterministic append)
**Artifact: `claude-code-PHASE-C-scope-authority-validator-v1.md` · v1 · 2026-06-28**
*(ADR-001 v2, Phase C — the third defense layer. The trust line's FIRST behavioral change.)*

> **Read fully before writing a line.** A1/A2/B1/B2 were all capture/boundary — behaviorally inert. **C is
> the inflection: it acts.** It is a deterministic, answer-time validator — a *sibling of the existing
> `groundingCheck`* (Mode A: validates the answer AFTER it streams, never blocks/buffers/delays the
> gateway). It does TWO things:
> 1. **Detect** (advisory violation): when the answer is built on a tool result whose **payload scope** (B2)
>    diverges from the **requested scope**, produced by a backend that is **not authoritative** for the
>    metric (trust-registry role-ceiling) → emit a `scope_divergence` grounding violation.
> 2. **Append** (deterministic, owner-approved #2): when that fires, append a **system-generated, deterministic
>    notice** to the response — it does **NOT rewrite** the model's streamed text; it appends a correction
>    after it (the same `fullText + note` pattern chat.ts already uses for the empty-response fallback).
>
> **Why the append, not telemetry-only:** the 3-provider acceptance test proved that *with the P6.8 guards
> live*, the most capable model **still surfaced Granit OEE as the answer to a KB7 question** (under a
> disclaimer). The prompt layer is model-dependent; a deterministic append is the only **model-independent**
> user-facing correction. It stays within "never rewrite the model's output" — it is additive.
>
> **Honest billing (carry it in the code + docs):** C is **STRONG vs an honest backend** (a `reporting_mirror`
> that truthfully labels its data as "Granit" is caught). It is **CONTAINMENT, not detection, vs a liar that
> forges its datasource label** to match the requested scope — that defeats the scope-match and is Phase D's
> redundancy/acid problem, not solvable here. Do not overclaim.
>
> **RULE 5 holds:** every input to the decision is deterministic — requested scope/metric from a **bounded
> vocabulary** (`ZONES` + factory id + `METRIC_IDS`), payload scope from B2 provenance, the role-ceiling from
> the trust registry. **No LLM judge, no model-emitted score, ever.**

---

## 0. HARD PRE-FLIGHT GATE (do all; paste evidence; stop on any failure)

1. `git rev-parse HEAD` → `56d8fc3…` (B2). Clean tree.
2. **Grounding wiring:** `sed -n '/export function runGroundingCheck/,/^}/p' api/cwf/_lib/grounding/groundingCheck.ts`
   → pure sync, runs the three `check*`. And `GroundingInput`/`GroundingVerdict`/`GroundingViolation` in
   `types.ts`. Quote them. The three checks (`checkEmptyAsZero`/`checkCountUnderstatement`/`checkFabricationRisk`)
   stay **byte-identical**; C adds a fourth.
3. **The post-stream call + the append pattern:** `sed -n '700,805p' api/cwf/chat.ts` → `fullText` accrues
   the stream; after it, `grounding = runGroundingCheck({ answerText: fullText, ... })`; `done` carries
   `text: fullText` + `grounding`. Note the **existing append**: the empty-response fallback sends
   `text: fullText + note`. C reuses exactly this additive shape — **no buffering before paint**.
4. **The bounded vocabulary (derive — do NOT hardcode new lists, RULE 1):**
   - `ZONES` from `api/cwf/_lib/knowledge/backends/armes/zones.ts` (the KB7 zones).
   - the factory id `KB7` (locate the canonical usage in `armes/personaText.ts`/`glossary.ts`/`render.ts`;
     if there's no single const, add ONE named `FACTORY_ID` const sourced from that usage — not a magic literal).
   - `METRIC_IDS` from `shared/dbConstants.ts` (`oee`/`fire`/`throughput`) + their query aliases from the
     ARMES glossary (e.g. ıskarta/scrap→fire, debi/K4→throughput) for metric detection.
5. **Trust registry (the role-ceiling), SYNC access:** `sed -n '50,114p' api/cwf/_lib/backends/trustRegistry.ts`
   → `warm()` async, `getTrust(id)` sync, `isAuthoritativeFor(id, metric)` sync. And `grep -n "\.warm(" api/cwf/chat.ts`
   → chat.ts warms `dbKnowledgeProvider` but **NOT** `trustRegistry`. C adds the trust warm + passes the
   resolved authority into the (pure) check.

---

## 1. SCOPE (build exactly this)

### 1.1 Types (`grounding/types.ts`)
- `GroundingViolationKind` += `'scope_divergence'`.
- `GroundingInput` += two optional fields (keep the check pure — chat.ts resolves them):
  - `query?: string` — the user message (source of the *requested* scope + metric).
  - `backendAuthority?: Record<string, string[]>` — active backendId → its `authoritativeMetrics` (from the
    warmed trust registry). The check reads this; it does NOT import the registry singleton (stays pure/testable).

### 1.2 The check (`grounding/groundingCheck.ts`) — `checkScopeDivergence`
A pure function added to `runGroundingCheck`. Deterministic + **conservative** (flag only when certain):

```
for each toolResult tr with provenance.scope = T and provenance.backendId = B:
    S = requestedScope(query)          // first ZONES/FACTORY_ID token present in the query, else none
    M = requestedMetric(query)         // first METRIC_IDS token/alias present in the query, else none
    if S is none OR M is none: continue                 // not a scoped metric question → no flag
    if T is absent: continue                            // no payload scope to compare → no flag
    authoritative = (backendAuthority[B] ?? []).includes(M)
    if authoritative: continue                          // ARMES producing its metric → never flag
    if normalize(S) ⊆ normalize(T): continue            // data IS about the requested scope → no flag
    → VIOLATION scope_divergence: severity 'warning',
         detail (language-aware): "İstenen kapsam '{S}' ({M}); ancak bu veri '{T}' kaynağından ve bu
         kaynak '{M}' için yetkili değil. Bu değerler {S} {M} değildir."
         evidence: T (bounded; evidence is NEVER sent to telemetry — existing rule)
```
- `requestedScope`/`requestedMetric` are pure helpers over the **bounded vocabulary** (§0.4), case-insensitive
  substring/word match. No free-text NLP, no model. If the query names two scopes/metrics, take the first
  recognized (deterministic order); don't try to be clever.
- Wire `checkScopeDivergence` into `runGroundingCheck` alongside the existing three (don't reorder/alter them).
- **Do NOT** touch `checkEmptyAsZero`/`checkCountUnderstatement`/`checkFabricationRisk` or `parseToolResultMeta`.

### 1.3 chat.ts — warm trust, resolve authority, pass, **append**
- After (or beside) `await dbKnowledgeProvider.warm(...)`: `await trustRegistry.warm()` (best-effort; on
  failure the registry serves the code reference — its own contract; never throw the request).
- Build `backendAuthority` for the active backends: `{ [b]: trustRegistry.getTrust(b).authoritativeMetrics }`.
- Pass `query: message` + `backendAuthority` into the existing `runGroundingCheck({...})` call.
- **Append (deterministic, additive):** if `grounding.violations` contains a `scope_divergence`, build the
  notice deterministically from that violation's `detail` (a short, system-tagged block, e.g.
  `\n\n---\n⚠️ Kapsam doğrulaması (otomatik): {detail}`), and send `done` with `text: fullText + notice`
  (and the same on the persisted `content`). **Reuse the existing `fullText + note` shape** — no buffering,
  no rewrite of the streamed text, post-stream only. When there is no `scope_divergence`, `text` is
  `fullText` unchanged.
- Keep the existing telemetry branch (violations recorded by `kind`/`severity`; **evidence never logged**).

> **Honesty about the append's limit (put it in a code comment):** the answer already streamed/painted; the
> notice appends a correction *after* it. We do not (and must not) un-paint or buffer-before-paint — that
> would block the gateway (Mode A forbids it). The append corrects the record deterministically; it does not
> prevent the model from having shown the data mid-stream. That residual is the prompt layer's job (guards)
> and, ultimately, redundancy (D).

---

## 2. CONSTRAINTS / TRAPS (any violation = fails review)

- **Deterministic only (RULE 5).** Every decision input is bounded-vocabulary / provenance / registry. No
  LLM judge, no score, no heuristic "confidence". If you can't decide deterministically → **don't flag**.
- **Conservative — no false positives.** Flag ONLY when ALL hold: recognized requested scope S, recognized
  governed metric M, payload scope T present, B not authoritative for M, and S ⊄ T. Miss any → no flag.
  An ARMES result for its own metric, a Superset discovery/non-metric query, or a scope-matching result
  must NEVER flag. Prove each no-flag case with a test.
- **Role-ceiling from the WARMED registry, not the code reference.** The governed authority (DB) is the
  truth; `backendAuthority` comes from `trustRegistry.getTrust(...)` after `warm()`. (B2's extractor used the
  code reference for the *structural* scope contract; C's *ceiling* uses the governed registry — different
  concerns, both correct.)
- **Append is additive, never a rewrite; Mode A intact.** The model's streamed text is untouched; the notice
  is appended post-stream via the existing pattern. No buffering before paint, no blocking/delaying the
  stream, no second model call.
- **Vocabulary derived, not invented (RULE 1).** `ZONES`, `METRIC_IDS`, the glossary aliases, the single
  `FACTORY_ID` const — all from existing knowledge. No new hardcoded scope/metric lists.
- **Existing checks + provenance capture frozen.** `checkEmptyAsZero`/`checkCountUnderstatement`/
  `checkFabricationRisk` byte-identical; `parseToolResultMeta` (B1/B2) untouched.
- **Frozen set empty:** `git diff --stat 56d8fc3 -- api/cwf/_lib/llm api/cwf/_lib/prompt api/cwf/_lib/knowledge/gate` → empty.
  Within `chat.ts`, ONLY the post-stream finalize block + the trust warm change (the streaming loop is
  untouched — show the diff is confined there).
- Secrets via env only; evidence never to telemetry; don't touch CWF-DEMO.

---

## 3. TESTS — `api/cwf/__tests__/scopeDivergence.test.ts`
**★ The P3 fixture (the whole reason C exists):**
- `query: 'KB7 OEE this week'`, one toolResult `{ provenance: { backendId: 'superset', scope: 'Granit - Hat Günlük OEE Grafiği' } }`,
  `backendAuthority: { superset: [] }` → a `scope_divergence` violation; `detail` names KB7, Granit, oee.

**No-flag cases (each its own test):**
- ARMES authoritative: `backendAuthority: { armes: ['oee','fire','throughput'] }`, result backendId `armes`,
  query 'KB7 OEE' → **no** violation (authoritative producer).
- Scope matches: result `scope: 'KB7 - …'`, query 'KB7 OEE' → **no** violation (S ⊆ T).
- No requested scope: query 'show me the OEE charts' (no ZONES/FACTORY_ID token) → **no** violation.
- Non-metric query: query 'list KB7 dashboards' (no METRIC_IDS token) → **no** violation.
- No payload scope: result with `provenance` but no `scope` → **no** violation.

**Invariants:**
- The three existing checks' tests still green; `runGroundingCheck` adds only the new violation kind.
- **Append decision (unit-test the helper):** given a verdict containing `scope_divergence`, the finalize
  produces `fullText + notice` (notice contains S/T/M); without it, `fullText` unchanged.
- **Mode A:** the check runs on the COMPLETE `answerText` (post-stream); nothing buffers/blocks (assert the
  finalize is post-stream — structural, mirror the A2 structural-guard style if useful).

## 4. DOCS (RULE 3)
- `.agents/CHANGELOG.md`: Phase C — deterministic scope/authority validator + deterministic append; the
  third defense layer; honest billing (strong vs honest backend, containment vs forged-label liar → D).
- `.agents/AGENTS.md` — **RULE 13** (or next free number): scope-divergence is a deterministic, advisory,
  append-only correction — NEVER an LLM judge, NEVER a block/rewrite of the streamed answer.
- SKILL KB: record the trigger (S/M from bounded vocab + B2 payload scope + warmed role-ceiling), the append,
  and the limit (post-stream correction, not prevention; forged-label = D).
- ROADMAP: C done; **D next** (lying-MCP acid + quarantine).

---

## 5. SELF-VERIFY CHECKLIST (report MUST show evidence)
- [ ] Pre-flight §0: HEAD `56d8fc3`; quoted grounding wiring, the post-stream call + the existing append
      pattern, the vocabulary sources (`ZONES`/`FACTORY_ID`/`METRIC_IDS`/glossary aliases), and the trust
      registry sync API + that chat.ts didn't warm it before.
- [ ] `types.ts`: `'scope_divergence'` kind + `query?`/`backendAuthority?` on `GroundingInput`.
- [ ] `groundingCheck.ts`: `checkScopeDivergence` (pure, conservative, bounded-vocab); wired into
      `runGroundingCheck`; the **three existing checks byte-identical** (paste that part of the diff).
- [ ] `chat.ts`: `trustRegistry.warm()` added; `backendAuthority` resolved for active backends; `query` +
      `backendAuthority` passed; **deterministic append** on `scope_divergence` via `fullText + notice`;
      streaming loop untouched (diff confined to the post-stream block — paste).
- [ ] Tests green incl. the **★ P3 fixture** flagging + the **append produces `fullText + notice`** + every
      no-flag case.
- [ ] **Frozen diff empty** (`api/cwf/_lib/llm` / `prompt` / `knowledge/gate`) — paste.
- [ ] **RULE 5 proof:** grep shows no model/LLM call, no score, in the check path; decision inputs are
      vocab/provenance/registry only.
- [ ] Full green: `tsc -b` · api nodenext · `vite build` · `oxlint(0)` · `vitest` (report new total).
- [ ] CHANGELOG + AGENTS RULE + SKILL + ROADMAP updated.
- [ ] Commit: `feat(phaseC): deterministic scope/authority validator + append — flag & correct when a
      non-authoritative backend's wrong-scope data is presented as the answer (Mode A, no rewrite)`. Report HEAD.

**Stop conditions:** any LLM/model/score in the decision path (RULE 5 — hard stop); a false-positive case
flags (ARMES-authoritative / scope-match / non-metric / no-scope); the streamed model text is rewritten or
buffered-before-paint; an existing `check*` or `parseToolResultMeta` changes; a frozen file diffs; the
ceiling is read from the code reference instead of the warmed registry.

---

## 6. WHERE C SITS (D closes the line)
After C, an honest backend's wrong-scope answer is **detected and deterministically corrected** at answer
time — the third layer the acceptance test proved necessary. What remains is the **forged-label liar**: an
MCP that stamps its Granit data with a `datasource_name` of "KB7" defeats the S⊆T scope-match → C sees no
divergence. That is not a software-detectable case from a single source (ADR-001 v2: *software contains,
redundancy reveals*). **Phase D** builds the deliberately-lying throwaway-MCP **acid test** (the deferred
`it.todo` from A2) and the deterministic **quarantine** triggers — proving the system *contains* such a
backend (unknown→floor, can't self-elevate, can't poison the KB, tool-output-as-data) even though it cannot
*detect* the single-source lie. C is the last detection layer; D is the honest statement of the limit.
