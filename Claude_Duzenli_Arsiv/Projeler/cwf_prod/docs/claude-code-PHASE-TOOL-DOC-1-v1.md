# PHASE TOOL-DOC-1 · v1 — Human doc overlay on tool descriptions (F163)

<!-- claude-code-PHASE-TOOL-DOC-1-v1 · rev 1 · 2026-07-23 · Architect: Claude
     Design of record: cwf-tool-doc-overlay-design-v2 (v1 SUPERSEDED — do not
     read v1; its §3.1/§3.2/§3.3 mechanisms were falsified against code).
     This file is the ENTIRE relay payload (S54-3): everything you need is
     inside it. Amendments mint v1_2. -->

**PRECONDITION (S47-1):** valid ONLY while `origin/master` ==
`a8ecd6db9defa280a7bb6a777a6bedf09047cf0a` (rev 136 · ~3606 tests / 341 files ·
56 migrations · drift OK). On mismatch: **STOP and report actual state** — do
not rebase-and-proceed on your own judgment.

**PROFILE:** FULL (multi-file · touches `api/**` + `shared/**` + eval-gate
adjacency). **MIGRATIONS: ZERO** — if you find yourself writing one, STOP; the
design is wrong and I need to know.

**PLATINUM compliance:** an absent overlay row = today's exact behavior, so
nothing needs configuring for the system to work. A NEW backend gets its
`tool_doc` kind minted and self-provisioned with **zero code edits and zero
human steps** (G0 proves this with a synthetic backend id). The single human
act — the owner writing what he knows about a tool — is a genuine knowledge
contribution, machine-drafted and one-click published.

---

## §1 · WHAT THIS PHASE IS

MCP servers ship tool descriptions of wildly varying quality. When a server's
text under-explains a tool, the model misuses or ignores it, and today there
is no sanctioned repair: the `backend_tools` mirror is OBSERVATION (never
hand-edited — that stays true) and the upstream server is often not ours.

This phase adds the **fourth and final** tool-information source, so that
every fact the model believes about a tool traces to exactly one row:

| # | Source | Posture |
|---|--------|---------|
| 1 | Server-advertised def | OBSERVATION — `backend_tools` mirror, system-synced |
| 2 | Exposure (read/write) | GOVERNED `tool_annotation` (armes-only today) |
| 3 | Category/routing | GOVERNED `tool_category` (armes-only today) |
| 4 | **Human doc overlay** | GOVERNED `tool_doc` ← **THIS PHASE** |

Effective model-facing description ≡ (1) + (4).

**Do NOT retrofit rows 2–3 to the new family.** Explicitly out of scope.

---

## §2 · BINDING CONSTRAINTS (violating any of these fails review)

1. **The mirror is never written.** No code path in this phase mutates
   `backend_tools`. Sync / missing-flip / `via_gateway` partitioning
   untouched.
2. **Runtime stays deterministic.** The model participates at DRAFT time
   only. No model call on any serve path, ever.
3. **Eval-gate scoping law (P6):** the ENGINE (`runGate` loop), the
   `GATE_STAGES` order, the schema interpreter, and **both existing backends'
   pre-existing referential branches** stay byte-identical. An ADDITIVE
   branch for the new kind is legitimate and required. `evalGate.ts` will
   have a non-empty diff — that is expected and correct; what must not change
   is the machinery above.
4. **Zero per-backend code for the new family.** No `'armes'` / `'superset'`
   string may appear in any logic you add for `tool_doc`. Proven by a
   genericity red-team test, not by assertion.
5. **Secrets:** never read, print, log, or echo a token/key. No `.env`
   contact. The synthesis endpoint reads its key exactly the way
   `semanticRouter.ts` already does and never surfaces it.
6. **C1 LAW:** zero writes to `messages`. **RULE 28:** never mint a second
   per-turn id.
7. **`resolveToolCategories.ts` keeps its literal `['armes']` scope.** Do not
   "improve" it. Widening it changes routing behavior.
8. **Anti-bloat is load-bearing**, not a nicety (§3.G2).
9. If any instruction here contradicts the code you find, **STOP and report**
   — do not silently reconcile. (The design note was itself corrected twice by
   exactly this discipline.)

---

## §3 · GATED SUB-PHASES

Complete each gate, self-verify it, and only then proceed. Report at the end
of all gates (single report), unless a gate trips a STOP.

### G0 · The kind family — derived, not enumerated

**Ground truth you will find:** `api/cwf/_lib/knowledge/reference/kinds.ts`
declares kind ids in three literal maps and `KIND_REGISTRY` (≈L224–254) is a
flat literal array. There is **no** per-backend derivation mechanism. Do not
copy `tool_annotation`'s pattern (two literal rows now, a code edit per future
backend) — that is the PLATINUM violation this gate exists to avoid.

**Build:**
- `ToolDocSchema` in `reference/coreSchemas.ts`, registered under
  `CORE_SCHEMA_REFS.TOOL_DOC`:
  ```
  z.object({
    tool: z.string().min(1),
    addendum: z.string().min(1).max(400),
    mode: z.enum(['append', 'replace']),
    lang: z.enum(['tr', 'en']).optional(),
  }).strict()
  ```
  The 400 ceiling is enforced HERE — the schema stage IS the anti-bloat gate
  (same posture as `AgentParamSchema`'s min/max refine).
- In `kinds.ts`, add the family by a **single expansion** over `BACKEND_IDS`
  (`shared/dbConstants.ts:507`), excluding `'system'` (a platform lane with no
  tools). Kind id = `` `${backendId}.tool_doc` ``. All entries share the ONE
  `codeSchemaRef` — the shared-spec precedent already exists (`ROUTING_HINT_SPEC`
  is reused by both routing_hint entries). `class: CORE`, `surface: RULE`,
  `isLocked: true`, `fieldSpec` = the read-only mirror of the Zod shape.
- **No code floor content.** An absent row means "no overlay" — the honest
  default. Reset semantics = archive. Do not add anything to
  `referenceData.ts` seed instances.

**Evidence this gate must produce:**
- A test that adds a synthetic backend id to the expansion input and asserts
  its `tool_doc` kind appears in `KIND_REGISTRY` **with zero other edits** —
  this is the PLATINUM proof, not prose.
- A test that `selfSeedReconciler` provisions the new `rule_kinds` rows
  absence-only (it already reads `KIND_REGISTRY`; prove it covers these).
- `api/admin/kinds.ts` DB-first/floor behavior unchanged.

### G1 · The gate — dead-overlay rejection that actually reaches gateways

**Ground truth you will find (and the gap this gate closes):**
`evalGate.ts:294` dispatches
`isSystem ? pass : (isSuperset ? stageReferentialSuperset(candidate) :
stageReferential(candidate, catalog))`, and a catalog is supplied only for
armes publishes (see the comment at ≈L301). `stageReferential` even hardcodes
`catalog not synced for 'armes' — sync first` (≈L146). **Therefore, without
this gate, `superset.tool_doc` orphan rows would publish silently** — an
S41-2 (reachability) and S41-1 (born-loud) breach.

**Build:**
- The publish caller supplies a catalog for a `tool_doc` publish on **any**
  backend, scoped by (backend_id, via_gateway) via the ONE shared
  `BackendToolsRepository.listByBackend` seam:
  - flat backend → default (`viaGateway: false`);
  - gateway backend → `{ viaGateway: true }` (that partition is where inner
    tool names live).
  How you determine "gateway" must be **data-driven, not a backend-name
  check** — derive it from the mirror partition itself (e.g. the backend has
  `via_gateway` rows). If you cannot do this without a backend-specific
  string, STOP and report; I will amend rather than let a hardcode in.
- Additive referential branch for the kind: a row whose `tool` is in neither
  partition ⇒ error, wording mirroring the existing L172 style:
  `tool_doc references unknown tool '<t>' (not in the synced catalog)`.
- Catalog absent / unsynced for that backend ⇒ **REJECT with an honest
  reason**. Never silent-pass. (HARDEN-FN-PROBE-1 discipline: no silent
  green; an inconclusive check fails.)

**Evidence:** a byte-identity proof for the two pre-existing referential
branches (armes path and `stageReferentialSuperset`) — show the diff is pure
insertion for them; a REJECT test per backend shape (flat orphan · gateway
orphan · unsynced catalog); a PASS test for a live tool name in each
partition.

### G2 · Serve lanes

**Lane A — flat tool definitions.** Composition point is
`api/cwf/_lib/turn/stageTools.ts:381`, inside `for (const toolDef of toolDefs)`,
where `server.backend_id` is already in hand:
`description: toolDef.description || \`MCP tool: ${toolDef.name}\``.

Add `resolveToolDocs(backendIds)` in `api/cwf/_lib/knowledge/`, cloning the
**documented posture** of `resolveToolCategories.ts` (read its header comment
first — it is the contract):
- NEVER throws; outage / unconfigured / zero rows ⇒ EMPTY map (= today's
  behavior). No third state, no floor content.
- No module-level cache; one small indexed `domain_rules` query per turn.
- No new fingerprint field — the stage-8 warm already captures ALL published
  rows for active backends with no `kind_id` filter, so a publish moves
  `knowledge_hash` by construction. Do not add one.
- Returns `ReadonlyMap<'<backend>:<tool>', { addendum, mode }>`.

Composition: `append` ⇒ `` `${serverDesc}\n${DELIM}${addendum}` `` where
`DELIM` is a module constant (RULE 1) rendering as `— İşletme notu: `;
`replace` ⇒ `addendum` alone.

> This is ONE additional small DB read per turn — the same shape as the three
> resolvers already on this path. That cost is accepted and must be stated in
> your report, not hidden.

**Lane B — gateway capability index.**
`api/cwf/_lib/mcp/gatewayCapabilityIndex.ts`. `renderGatewayCapabilityIndex`
is PURE and genericity-red-teamed — both properties must survive.
`MirrorToolLike` gains `addendum?: string | null`;
`loadGatewayCapabilityIndex(backendId, repo)` resolves that backend's
`tool_doc` rows and threads them in.

**Anti-bloat, lane half (load-bearing):** the module truncates server
descriptions at `MAX_DESC_LEN = 120` via `firstSentenceTruncated`. Apply the
**same** treatment to the addendum on this lane via a new `MAX_ADDENDUM_LEN`
constant (120). Full ≤400 text serves on Lane A only. Reason: 22 inner tools ×
400 chars ≈ 8.8k chars injected every turn. The index is a map, not a manual.

**Empty≠zero preserved:** an unavailable mirror still OMITS the section
entirely; an overlay must never resurrect a section with no active tools.

**Observability (FULL-TRACE):** the tool-def span gains
`cwf.tool.doc_overlay` (bool) on composed tools, single-sourced in
`observability/config.ts` like every other attr. It MUST satisfy the
COMPLETENESS GUARD (`api/cwf/__tests__/spanIOCompleteness.test.ts`) — an
unclassified span/attr fails CI by construction. Add a Vercel-lane log line
`[ToolDoc] backend=… composed=N mode=…` so live verification is sealable from
Vercel logs alone (the S60 automation-first lesson, honored at birth).

**Evidence:** append vs replace composition tests · zero-rows ⇒ byte-identical
description · outage ⇒ byte-identical description · lane-B truncation test ·
**genericity red-team** (seed a fake `gatewaytest` backend, prove a correct
composed index with zero backend-specific references — follow the existing
pattern in `gatewayCapabilityIndex.test.ts`).

### G3 · Panel affordance + **Sentezle**

Tool rows in the tool-facing admin surface gain an "İşletme notu" affordance:
a free-text box + a **Sentezle** button. Sentezle condenses the owner's free
text (with the server's own description as context) into a ≤400-char clean
addendum **DRAFT** — never auto-published. Owner edits/approves → the normal
gate publish path. No new permission class: it rides the existing rule
draft/publish capability.

**The call site is the constraint.** There is exactly ONE `streamText` site
(`api/cwf/_lib/llm/gateway.ts`, chat-shaped) and NO admin-side model call
anywhere. **Do not open a second streaming site.** Follow the sanctioned
one-shot precedent at `api/cwf/_lib/semanticRouter.ts:244–265`:
`ai.models.generateContent` via a dynamic `@google/genai` import, model from
`llmProviderRegistry.routerModelId()`, `temperature: 0`, bounded
`maxOutputTokens`, wrapped in `withTimeout`, and **never throws**.

- On ANY failure (no key, timeout, provider error, empty/garbage response) the
  endpoint returns the owner's raw text UNCHANGED with an honest
  `synthesized: false` flag. The assist is never a gate — the owner can always
  publish what he typed.
- The ≤400 clamp is applied **server-side after** the model. The model is
  advisory; the ceiling is deterministic.
- Not a `prompt.segment` ⇒ no golden step, **no GOLDEN FREEZE interaction**.
- Dev-preview fixture + **RULE-26 coverage** (nothing clips at 1280/1024;
  `npm run test:rule26`).

### G4 · Self-verify (evidence, not assertions)

- **Provenance test:** a composed description's addendum is byte-traceable to
  its published row (the "what broke when" property, §1).
- **Do-not-touch greps**, pasted verbatim in your report:
  `resolveToolCategories.ts` unchanged · `BackendToolsRepository` write paths
  unchanged · zero `messages` writes · no new migration file · no second
  `streamText` site · no `'armes'`/`'superset'` literal in any new `tool_doc`
  logic.
- `npm run build` (this runs `typecheck:api` + `gen:arch-facts` + drift
  check) · `npm run lint` · `npm run test` · `npm run test:rule26`.
- Reseal if and only if a mapped file drifted (`npm run reseal`); report the
  `docVersion` before/after and the `check:doc-drift` verdict.
- `.agents/CHANGELOG.md` + the `cwf-project-kb` SKILL.md entry.

---

## §4 · REPORT FORMAT (what I need to review)

One report. Include: branch name · commit SHA(s) pushed · `git diff --stat`
vs `a8ecd6d` · the CI run result (CI is the SOLE test arbiter — S37-2; a local
green does not substitute) · per-gate evidence · the do-not-touch grep output ·
the stated per-turn read cost · `docVersion` before/after + drift verdict ·
anything you had to STOP on.

**Do not merge.** I run FAST-GATE review on the PR head first; the merge
instruction (with the commit message embedded in `--subject`/`--body`, per the
S60 lesson) comes back to you as a single GO block, together with branch
deletion.

<!-- END · claude-code-PHASE-TOOL-DOC-1-v1 · rev 1 · 2026-07-23 -->
