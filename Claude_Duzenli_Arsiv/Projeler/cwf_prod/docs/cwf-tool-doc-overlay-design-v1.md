# CWF — TOOL-DOC-OVERLAY-1 · Design Note · v1

<!-- cwf-tool-doc-overlay-design-v1 · rev 1 · 2026-07-22 · Architect: Claude
     F163, owner-ratified sequence: after BLOCK 2 closure, BEFORE BLOCK 3.
     Owner's charter: "put the tool business to rest once and for all —
     otherwise everything keeps snagging and we can't tell what broke when."
     Grounded @c0fff49 era (capability index + via_gateway mirror live).
     Industry precedent verified 2026-07-22: description override/enrichment
     is a recognized pattern (NVIDIA NeMo MCPToolOverrideConfig; AWS MCP
     tool-design guidance recommends enriching descriptions with clearer
     definitions, NL mappings, usage examples; mcp-proxy-processor).
     Amendments mint v2 (S37-1). -->

**PLATINUM compliance:** zero manual steps to function — the overlay layer is
OPTIONAL curation on top of a fully self-configuring pipeline. The one human
act it exists for (the owner teaching the system what HE knows about a tool)
is a genuine knowledge contribution, machine-assisted (synthesis drafts) and
one-click published. Nothing breaks or needs hand-work when no overlay exists.

---

## 0 · Problem (owner-stated)

MCP servers ship tool descriptions of wildly varying quality. When a
description under-explains ("this tool also does X, Y in our plant's
context"), the model misuses or ignores the tool, and TODAY the owner has no
sanctioned way to fix it: the mirror is observation (never hand-edited —
correct), and editing the server is often not ours to do. The owner wants to
write a free-text human addendum on any tool, have the system synthesize it
into the tool's EFFECTIVE description, and have that survive syncs, audits,
and outages — "once and for all."

## 1 · The complete tool-comprehension layer (what "once and for all" means)

After this phase, every tool the platform touches has exactly FOUR
information sources, each with one owner and one posture — nothing else:

| # | Source | Posture | Exists today? |
|---|--------|---------|---------------|
| 1 | Server-advertised def (name/desc/schema) | OBSERVATION — mirror (`backend_tools`), system-synced, never hand-edited | ✓ (flat + gateway-inner) |
| 2 | Exposure classification (read/write) | GOVERNED overlay (`tool_annotation` family), gate-published | ✓ (ARMES; gateway-inner = Path B gating) |
| 3 | Category/routing membership | GOVERNED data (`tool_category` + learned map) | ✓ |
| 4 | **Human doc overlay** (usage knowledge) | GOVERNED overlay (`tool_doc` family), gate-published | **← THIS PHASE** |

Effective model-facing description ≡ (1) + (4). Anything the model "knows"
about a tool is traceable to exactly one of these four rows — that is the
"what broke when" answer: provenance per sentence.

## 2 · Non-negotiable boundaries

1. **Mirror stays observation.** The overlay NEVER mutates `backend_tools`;
   composition happens at serve time. Sync/missing-flip untouched.
2. **Runtime is deterministic.** The served overlay text is static governed
   data. The LLM participates ONLY at draft time (synthesis assist), never in
   the serve path. Eval-gate machinery untouched (additive kind only).
3. **Overlay is ADDITIVE by default.** Effective description = server text +
   clearly-delimited addendum ("— İşletme notu: …"). A REPLACE mode exists as
   an explicit per-row flag (for hopeless server text), audited like any
   payload field — never the silent default.
4. **Anti-bloat law (industry-verified risk):** overlay payload carries a hard
   character ceiling (schema-enforced, e.g. 400 chars) + the gate rejects
   overflows. Enrichment must fight confusion without feeding context bloat.
5. **Backend-agnostic by construction:** ONE kind family pattern keyed
   (backend_id, tool_name); zero per-backend code. Genericity red-team test
   (the gatewaytest pattern) mandatory.
6. **Missing-tool honesty:** an overlay row whose tool_name is absent from
   the mirror is DEAD (reachability law S41-2) — the gate's existing
   catalog check extends to this kind; the panel shows the orphan honestly.

## 3 · Design

### 3.1 · Governed kind: `<backend>.tool_doc`
Registered like tool_annotation (per-backend id, CORE-locked Zod shape):
`{ tool: string, addendum: string(≤400), mode: 'append'|'replace',
   lang?: 'tr'|'en' }` — one published row per (backend, tool). DB-first,
no code floor content (an absent row is simply "no overlay" — the honest
default), reset semantics = archive.

### 3.2 · Serve paths (both existing, both one-line composition points)
- **Flat tools:** the turn-path tool-def assembly composes description =
  server_desc (+ "\n— İşletme notu: " + addendum) for offered tools.
  Warm already loads published rules for active backends — the overlay rides
  the same warmed slice; zero new reads in the turn path.
- **Gateway inner tools:** the capability index line for a tool gains the
  addendum (same truncation discipline as the index).

### 3.3 · Panel affordance + synthesis assist (stage-drafts pattern)
- MCP/Tool Matching tool rows gain an "İşletme notu" affordance: free-text
  box + **Sentezle** button → a draft-time LLM call condenses the owner's
  free text (+ the server's own description as context) into a ≤400-char
  clean addendum DRAFT (never auto-published). Owner edits/approves →
  normal gate publish. No new permission class (rides rule:draft/publish).
- The synthesis endpoint is spend-bearing-lite (one small completion) —
  gated by the existing draft-capability tier; no golden step (not a
  prompt.segment).

### 3.4 · Observability
- The configFingerprint/knowledge_hash already capture governed-slice
  changes — an overlay publish is visible as a knowledge_hash change (no new
  fingerprint field). The tool-def span (FULL-TRACE) gains
  cwf.tool.doc_overlay=true on composed tools, so "why did the model treat
  this tool differently today" is answerable from the trace.

## 4 · Phase plan (gated, FULL profile, zero migrations)
- G0 · kind registration (per-backend derivation like tool_annotation) +
  schema + gate catalog-check extension (dead-overlay rejection).
- G1 · serve-path composition (flat + capability index) + anti-bloat +
  append/replace tests + genericity red-team.
- G2 · panel affordance + Sentezle draft endpoint + dev-preview fixture +
  RULE-26 coverage.
- G3 · self-verify: provenance test (a composed description's addendum is
  byte-traceable to its published row); do-not-touch greps; reseal;
  CHANGELOG/KB.

## 5 · Out of scope (named)
Gateway-inner exposure GATING (Path B/OPA) · auto-suggested overlays from
usage telemetry (future stage-drafts extension) · per-user overlays (global
governed only) · F153 base-URL fix (external ops).

<!-- END · cwf-tool-doc-overlay-design-v1 · rev 1 · 2026-07-22 -->
