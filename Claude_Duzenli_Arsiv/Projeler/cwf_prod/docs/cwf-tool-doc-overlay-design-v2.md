# CWF — TOOL-DOC-OVERLAY-1 · Design Note · v2

<!-- cwf-tool-doc-overlay-design-v2 · rev 2 · 2026-07-23 · Architect: Claude
     SUPERSEDES v1 (immutable, S37-1). v1's charter, boundaries and four-source
     model SURVIVE UNCHANGED. This version exists because a pre-authoring
     ground-truth sweep @a8ecd6d falsified THREE of v1's mechanism premises
     (§3.1 kind derivation, §3.2 "zero new reads", §3.3 synthesis call site)
     and surfaced a FOURTH, previously unnamed gap (the eval-gate catalog is
     armes-only, so v1's dead-overlay rejection would silently not fire for a
     gateway backend). TOTAL-45 / S59-2 applied to the Architect's own note.
     Grounded @ a8ecd6db9defa280a7bb6a777a6bedf09047cf0a (rev 136).
     Amendments mint v3. -->

**PLATINUM compliance:** zero manual steps to function. The overlay layer is
OPTIONAL curation on top of a fully self-configuring pipeline: absent row =
"no overlay" = today's exact behavior. The one human act it exists for (the
owner teaching the system what HE knows about a tool) is a genuine knowledge
contribution — machine-assisted (synthesis draft) and one-click published. A
NEW backend gets its `tool_doc` kind minted and provisioned with **zero code
edits and zero human steps** (§3.1) — that property is what v1 claimed and
this version actually delivers.

---

## 0 · Problem (owner-stated — unchanged from v1)

MCP servers ship tool descriptions of wildly varying quality. When a
description under-explains ("this tool also does X, Y in our plant's
context"), the model misuses or ignores the tool, and TODAY the owner has no
sanctioned way to fix it: the mirror is observation (never hand-edited —
correct), and editing the server is often not ours to do. The owner wants to
write a free-text human addendum on any tool, have the system synthesize it
into the tool's EFFECTIVE description, and have that survive syncs, audits,
and outages — "once and for all."

## 1 · The complete tool-comprehension layer (unchanged from v1)

After this phase, every tool the platform touches has exactly FOUR
information sources, each with one owner and one posture — nothing else:

| # | Source | Posture | Exists today? |
|---|--------|---------|---------------|
| 1 | Server-advertised def (name/desc/schema) | OBSERVATION — mirror (`backend_tools`), system-synced, never hand-edited | ✓ (flat + `via_gateway`) |
| 2 | Exposure classification (read/write) | GOVERNED overlay (`tool_annotation`), gate-published | ✓ (ARMES only) |
| 3 | Category/routing membership | GOVERNED data (`tool_category` + learned map) | ✓ (ARMES only) |
| 4 | **Human doc overlay** (usage knowledge) | GOVERNED overlay (`tool_doc`), gate-published | **← THIS PHASE** |

Effective model-facing description ≡ (1) + (4). Anything the model "knows"
about a tool is traceable to exactly one of these four rows — that is the
"what broke when" answer: provenance per sentence.

> **Note on the table's own honesty (new in v2):** rows 2 and 3 are
> **armes-only** in code today (`KIND_IDS.*`, and `resolveToolCategories`
> reads `['armes']` literally). v1's table implied a per-backend family that
> does not exist. Row 4 is the first member of this layer built
> backend-agnostic by construction; rows 2–3 are NOT retrofitted here (out of
> scope, §5) — but §3.1's mechanism is deliberately shaped so they CAN be,
> later, without a second invention.

## 2 · Non-negotiable boundaries (v1 §2, unchanged, + one sharpened)

1. **Mirror stays observation.** The overlay NEVER mutates `backend_tools`;
   composition happens at serve time. Sync / missing-flip untouched.
2. **Runtime is deterministic.** The served overlay text is static governed
   data. The LLM participates ONLY at draft time (synthesis assist), never in
   the serve path. Eval-gate ENGINE + STAGE ORDER + schema interpreter +
   existing backends' paths stay byte-identical (P6 scoping law); a new
   additive referential branch is legitimate and required (§3.4).
3. **Overlay is ADDITIVE by default.** Effective description = server text +
   clearly-delimited addendum. A `replace` mode exists as an explicit
   per-row flag (for hopeless server text), audited like any payload field —
   never the silent default.
4. **Anti-bloat law.** Payload ceiling ≤400 chars, Zod-enforced (schema stage
   IS the gate). **Sharpened in v2:** the ceiling is per-ROW, but the real
   bloat risk is per-LANE — 22 gateway inner tools × 400 chars ≈ 8.8k chars
   injected every turn. The capability-index lane therefore applies its OWN
   truncation (§3.3), independently of the row ceiling.
5. **Backend-agnostic by construction:** ONE family, keyed
   (backend_id, tool_name); zero per-backend code, verified by a genericity
   red-team test (`gatewaytest` pattern, `gatewayCapabilityIndex.test.ts`).
6. **Missing-tool honesty:** an overlay row whose `tool` is absent from the
   mirror is DEAD (reachability law S41-2) and must be gate-REJECTED — for
   **every** backend, flat and gateway-inner alike (§3.4 — this is the gap
   v1 did not see).

## 3 · Design (corrected mechanisms)

### 3.1 · Governed kind: `<backend>.tool_doc` — derived, not enumerated

**v1 premise (FALSE @a8ecd6d):** "Registered like tool_annotation (per-backend
id)." **Ground truth:** `api/cwf/_lib/knowledge/reference/kinds.ts` declares
kind ids as three literal maps (`KIND_IDS` armes.* · `SUPERSET_KIND_IDS`
superset.* · `SYSTEM_KIND_IDS`) and `KIND_REGISTRY` (L224–254) is a flat
literal array. **No derivation mechanism exists.** Copying `tool_annotation`
would mean two literal rows now and a code edit per future backend — a
PLATINUM violation seeded at birth.

**Correction — the family is EXPANDED, not enumerated:**

```
{ tool: string(min 1), addendum: string(min 1, max 400),
  mode: 'append' | 'replace', lang?: 'tr' | 'en' }   // .strict()
```

- ONE shared Zod schema (`ToolDocSchema`, `CORE_SCHEMA_REFS.TOOL_DOC`) — the
  shared-spec precedent already exists (`ROUTING_HINT_SPEC` is reused by both
  the armes and superset routing_hint entries).
- `KIND_REGISTRY` gains the family via a single expansion over
  `BACKEND_IDS` (`shared/dbConstants.ts:507`), excluding `'system'` (a
  platform lane with no tools). Adding a 4th backend id to that existing
  array mints its `tool_doc` kind automatically — **zero new code**.
- `selfSeedReconciler.ts` already provisions missing `rule_kinds` rows from
  `KIND_REGISTRY` absence-only, and `api/admin/kinds.ts` is DB-first with
  `KIND_REGISTRY` as floor (`dbKinds.length ? dbKinds : KIND_REGISTRY`).
  Together: the new kinds self-provision on first reconcile — **the one-click
  PLATINUM property, obtained from machinery that already exists.**
- CORE (`isLocked: true`), `surface: RULE`. **No code floor content** — an
  absent row is simply "no overlay," the honest default. Reset = archive.
- One published row per (backend, tool); `key` = the tool name.

### 3.2 · Serve path A — flat tool definitions

**Composition point (verified):** `api/cwf/_lib/turn/stageTools.ts:381`,
inside `for (const toolDef of toolDefs)`, where `server.backend_id` is
already in hand:
`description: toolDef.description || \`MCP tool: ${toolDef.name}\``.

**v1 premise (FALSE):** "the overlay rides the same warmed slice; zero new
reads in the turn path." **Ground truth:** the stage-8 warm composes governed
rows into a **prose** slice (`DomainContext.injected`) — there is no
structured (backend, tool) map on `ctx`, and stage 7 runs BEFORE stage 8
anyway. The existing structured reader, `resolveToolCategories.ts`, reads
`getPublishedRules(['armes'])` **literally armes-scoped**; widening it would
pull other backends' categories into routing — a behavior change to a
governed surface, rejected.

**Correction — a sibling resolver, and an honest cost statement:**
`resolveToolDocs(backendIds)` in `api/cwf/_lib/knowledge/`, cloning
`resolveToolCategories`'s documented posture exactly:
- NEVER throws — outage / unconfigured / zero rows all degrade to an EMPTY
  map (= today's behavior; there is no third state and no floor content).
- No module-level cache; resolved fresh per turn (one small indexed
  `domain_rules` query).
- No new fingerprint field — the stage-8 warm already captures ALL published
  rows for active backends with no `kind_id` filter, so a `tool_doc` publish
  moves `knowledge_hash` by construction.
- Returns `ReadonlyMap<'<backend>:<tool>', { addendum, mode }>`.

**Cost, stated plainly:** this is **ONE additional small DB read per turn**,
not zero. It is the same shape and posture as the three readers already on
this hot path (`resolveToolCategories` / `resolveAgentParams` /
`resolvePromptSegments`). v1's "zero new reads" claim was wrong and is
withdrawn.

**Composition:** `append` → `${serverDesc}\n— İşletme notu: ${addendum}` ·
`replace` → `${addendum}` (the delimiter line is a module constant, not an
inline literal — RULE 1).

### 3.3 · Serve path B — gateway capability index

**Composition point (verified):**
`api/cwf/_lib/mcp/gatewayCapabilityIndex.ts` — `renderGatewayCapabilityIndex`
is PURE and already backend-agnostic (its genericity is red-team-proven).
`MirrorToolLike` gains an optional `addendum?: string | null`;
`loadGatewayCapabilityIndex(backendId, repo)` resolves that backend's
`tool_doc` rows and passes them through. The purity and the
zero-backend-strings property must both survive.

**Anti-bloat (boundary 4, lane half):** the module truncates server
descriptions at `MAX_DESC_LEN = 120` via `firstSentenceTruncated`. The
addendum gets the **same treatment on this lane** — a dedicated
`MAX_ADDENDUM_LEN` constant, defaulted to 120, applied by the same helper.
Full ≤400-char text serves on the flat lane only. Rationale: the index is a
map, not a manual.

**Empty≠zero posture preserved:** an unavailable mirror still OMITS the whole
section; an overlay never resurrects a section that has no active tools.

### 3.4 · The gate gap v1 missed — dead-overlay rejection must reach gateways

**Ground truth:** `evalGate.ts:294` dispatches
`isSystem ? pass : (isSuperset ? stageReferentialSuperset(candidate)
: stageReferential(candidate, catalog))`, and the catalog is supplied only
for armes publishes ("absent when the caller supplied no catalog — every
non-armes publish", L301). `stageReferential` even hardcodes the message
`catalog not synced for 'armes' — sync first` (L146).

**Consequence if v1 had shipped as written:** `armes.tool_doc` would get
dead-overlay rejection; `superset.tool_doc` would get **none** — orphan
overlays would publish silently. That is an S41-2 (reachability) breach and
an S41-1 (born-loud) breach in one.

**Correction:** the phase supplies a catalog for `tool_doc` publishes on ANY
backend, scoped by (backend_id, via_gateway):
- flat backend → `listByBackend(backendId)` (default `viaGateway:false`);
- gateway backend → the `via_gateway:true` partition (that IS where its
  inner tool names live);
- a `tool_doc` row whose `tool` is in neither ⇒ referential error
  `tool_doc references unknown tool '<t>' (not in the synced catalog)`,
  mirroring L172's existing wording.
- Catalog absent / unsynced for that backend ⇒ **REJECT with an honest
  reason**, never silent-pass (the `HARDEN-FN-PROBE-1` three-way discipline:
  no silent green).

This is additive per-backend dispatch — legitimate under the P6 scoping law.
The ENGINE, the `GATE_STAGES` order, the schema interpreter, and both
existing backends' pre-existing branches stay byte-identical.

### 3.5 · Panel affordance + **Sentezle** (synthesis assist)

Tool rows in the tool-facing admin surface gain an "İşletme notu"
affordance: free-text box + **Sentezle** button → a draft-time model call
condenses the owner's free text (+ the server's own description as context)
into a ≤400-char clean addendum **DRAFT** — never auto-published. Owner
edits/approves → normal gate publish. No new permission class (rides
rule draft/publish).

**v1 premise (UNDERSPECIFIED):** "one small completion." **Ground truth:**
there is exactly ONE `streamText` site (`api/cwf/_lib/llm/gateway.ts`,
chat-shaped, imported by `stageStream` / `retryPerturbation` / replay
`taskFn`) and NO admin-side model call anywhere. Opening a second streaming
site would breach the architecture spine.

**Correction — follow the sanctioned one-shot precedent, not the chat
gateway:** `semanticRouter.ts:244–265` already performs a non-chat, one-shot
classification via a direct `@google/genai` `ai.models.generateContent` call
with `llmProviderRegistry.routerModelId()`, `temperature: 0`, bounded
`maxOutputTokens`, wrapped in `withTimeout`, and **never throws** — every
failure resolves to a floor. Sentezle is the same species and copies that
contract exactly:
- never throws → on ANY failure the endpoint returns the owner's raw text
  unchanged with an honest `synthesized:false` flag (the owner can always
  publish what they typed; the assist is never a gate);
- bounded output; hard ≤400-char clamp applied server-side AFTER the model
  (the model is advisory, the ceiling is deterministic);
- one small completion per click, gated by the existing draft capability;
  not a `prompt.segment`, so **no golden step and no GOLDEN FREEZE
  interaction**.

### 3.6 · Observability (FULL-TRACE)

The tool-def span gains `cwf.tool.doc_overlay` (bool) on composed tools, so
"why did the model treat this tool differently today" is answerable from the
trace. **New in v2:** any new span or span attribute must satisfy the
COMPLETENESS GUARD (`api/cwf/__tests__/spanIOCompleteness.test.ts`) — an
unclassified span fails CI by construction. No new fingerprint field
(§3.2). A `[ToolDoc]` Vercel-lane log line (`backend=… composed=N mode=…`)
so verification is sealable from Vercel logs alone — the S60 automation-first
lesson, honored at birth rather than retrofitted.

## 4 · Phase plan (gated, FULL profile, ZERO migrations)

- **G0** · kind family expansion over `BACKEND_IDS` + `ToolDocSchema` +
  registry/self-seed proof (a synthetic 4th backend id mints its kind with
  zero code edits).
- **G1** · gate: catalog supply for any-backend `tool_doc` + dead-overlay
  rejection (flat + `via_gateway`) + unsynced-catalog honest reject +
  byte-identical proof for the pre-existing branches.
- **G2** · serve lanes: `resolveToolDocs` + flat composition
  (`stageTools.ts:381`) + capability-index addendum with lane truncation +
  append/replace tests + genericity red-team + span/log.
- **G3** · panel affordance + Sentezle endpoint (one-shot precedent,
  never-throws, server-side clamp) + dev-preview fixture + RULE-26 coverage.
- **G4** · self-verify: provenance test (a composed description's addendum is
  byte-traceable to its published row), do-not-touch greps, reseal,
  CHANGELOG/KB.

## 5 · Out of scope (named)

Retrofitting `tool_annotation` / `tool_category` to the derived family (§1
note) · gateway-inner exposure GATING (Path B / OPA) · auto-suggested
overlays from usage telemetry · per-user overlays (global governed only) ·
F153 root cause (external ops) · widening `resolveToolCategories`'s
armes scope.

## 6 · Premise-error record (S59-2 / TOTAL-45, applied to the Architect)

v1 shipped four unverified mechanism claims; all four were caught by a
pre-authoring grep sweep, **before** any of them reached a phase prompt or a
governed artifact:

1. §3.1 "per-backend derivation like tool_annotation" — no derivation exists.
2. §3.2 "zero new reads in the turn path" — the warm slice is prose; a new
   read is required. Cost now stated, not hidden.
3. §3.3 "one small completion" — no admin LLM call site exists; the one-shot
   precedent had to be named explicitly to avoid a second `streamText` site.
4. **Unnamed in v1:** the eval-gate catalog is armes-only, so the advertised
   dead-overlay rejection would not have fired for a gateway backend.

Arc tally after this note: **8** (S59→S61), all caught pre-ship. The lesson
the tally keeps re-teaching: a design note's PROSE about existing machinery
is a claim about the world, exactly like a log field.

<!-- END · cwf-tool-doc-overlay-design-v2 · rev 2 · 2026-07-23 -->
