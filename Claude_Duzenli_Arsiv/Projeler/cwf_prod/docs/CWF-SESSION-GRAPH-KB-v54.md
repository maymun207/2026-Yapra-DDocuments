# CWF — Session Graph KB · v54

<!-- CWF-SESSION-GRAPH-KB-v54 · 2026-07-21 · Closes S55 (the FULL-TRACE session).
     Supersedes v53. Companion to cwf-open-items-register-v57 (the by-name ledger)
     and CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v54 (the boot prompt). This file is
     the NARRATIVE / decision-graph; the register is the item-level SSOT. -->

## SESSION S55 — "THE FULL-TRACE SESSION"
One theme dominated: the owner's **FULL-TRACE MANDATE** — make every pipeline
stage, every DB read, and every tool call fully visible (input AND output) in
both Langfuse and the StagesDashboard, so the system is a designed box, not "a
monkey pressing a button and wondering why the lamp lit." The session delivered
that end-to-end (OBS-TRACE-1/1b/2/3), plus the walkthrough-dozen UI phase
(BATCH-W-1) and a flake hotfix (F149).

Boot floor `e1218ba` rev 120 → close floor **`49ea01d` rev 126**.

## MERGE LINEAGE (full, this session — all `--no-ff`, RULE-25 fresh-clone verified)
```
e1218ba rev120  (S54 close — boot)
  └─ dca514c rev121  PR#84  BATCH-W-1 (walkthrough dozen W-1..W-12)
  └─ 6592a1b rev121  PR#85  HOTFIX F149 (rule26 ghost-optimizeDeps flake)  [+fbe2d05 pre-merge]
  └─ 3ef02f8 rev122  PR#86  OBS-TRACE-1 (per-stage I/O backbone + routing chain + F148)
  └─ d19ed97 rev123  PR#88  OBS-TRACE-1b (12 undefined spans closed + completeness guard)
  └─ 21ab667 rev124  PR#87  OBS-TRACE-2 (144 db reads via getServiceClient proxy + secret deny-list)
  └─ 49ea01d rev126  PR#89  OBS-TRACE-3 (turn_trace_digest mirror + StagesDashboard panel + §G0 root-span)
```
Operator migration applied this session: `20260721120000_turn_trace_digest.sql`
(Gemini, `supabase db push` on `fjbrkimwvtpwoxhziidh`, verifyGrants 52/0,
idempotence no-op).

## THE DECISION GRAPH (why each thing is the way it is)

### 1 · The FULL-TRACE MANDATE (the session's constitutional event)
The Architect initially defended NOT logging raw router output (leak surface,
determinism, "provider reasoning is a closed box"). The owner PUSHED BACK. The
correct reconciliation: that rationale is valid for the **durable ledger**
(`telemetry_events`) and **Vercel logs**, but WRONG for the **in-infra
self-hosted Langfuse** debug surface — ADR-004 designed Langfuse precisely to
hold full *scrubbed* I/O. So: category names, tool names, keywords, row counts,
DB shapes are ALL visible; only raw secrets/tokens are scrubbed. This is now a
constitutional rule beside PLATINUM and GOLDEN LEDGER.

### 2 · Why a completeness GUARD, not hand-enumeration
The Architect authored OBS-TRACE-1's G3 to cover stage WRAPPERS and MISSED the
inner `cwf.warm.*` children + stream/grounding/mcp/flush spans — the owner caught
the gap in a live trace (7 screenshots: warm.knowledge/params/prompt/provider +
stream showed `undefined`). Lesson: **do not rely on the Architect enumerating
spans correctly.** OBS-TRACE-1b's guard enumerates every span at runtime and
fails CI on any without I/O (or unclassified) — the mandate holds BY
CONSTRUCTION. This is the RULE-26 no-scroll-trap allowlist pattern ported to
observability. The Red→Green proof (guard fails on the real 12 gaps first, then
goes green) is the load-bearing acceptance artifact.

### 3 · Why WRAP the client, not weave 144 call sites (OBS-TRACE-2)
`getServiceClient()` (`persistence/client.ts:48`) is the ONE Supabase client
factory ("no other createClient in api/"). A transparent span-emitting Proxy over
it traces all 144 `.from()` reads AND every future read with zero per-site edits —
"traced by construction." 144 hand-edits were rejected (drift + the mandate leaks
by default). Mirrors the "isolate behind an interface" reuse contract. The span
opens at the terminal `.then()` (postgrest builders `return this` on chaining —
verified against postgrest-js source), re-proxying self-chaining calls.

### 4 · Why a DIGEST in our DB, not the Langfuse API (OBS-TRACE-3)
To show the trace data in OUR StagesDashboard (not just Langfuse), the Langfuse
query API was rejected (couples to Langfuse auth, async-ingestion gap → false
panel gaps). Instead: a compact `turn_trace_digest` row written at flush from the
SAME already-scrubbed span I/O (by reference, no re-serialize), read via a gated
endpoint. It is a display-only MIRROR — never a second source of truth, never
read by any governance/gate/grounding path (standing lint). ADR-008 reconciles
the resulting three-system split (LEDGER vs TRACES vs MIRROR) against ADR-004.

### 5 · The root-span nuance (§G0)
After 1b/2 landed, a fresh trace (20 screenshots) showed EVERYTHING with real
I/O except the root `cwf.turn` observation panel (`undefined`). Cause: the root
set only `TRACE_` (trace-level) I/O; Langfuse's Timeline view shows the
observation panel. §G0 (folded into OBS-TRACE-3 v1_2) stamps `OBSERVATION_INPUT/
OUTPUT` beside the existing `TRACE_`, same scrubbed payload. Now clicking the
root span itself shows query+answer (verified in Tree view, turn `4123b465`).

### 6 · The F149 episode (Architect self-correction)
rule26 flaked on master (`dca514c`). The Architect over-called it ("just rerun") —
master stayed RED after 2 reruns. Root cause: stale `@mui/@emotion`
`optimizeDeps.include` ghost deps (not in package.json, unused in src) forced a
cold-start Vite re-optimization reload that hit the longest test. Fix: remove the
ghosts + dead MUI plugin + a CI-only retry belt, validated retry-FREE 5/5.
**S55-1**: a diagnosed transient is not a license to say "just rerun"; it needs
root-cause + N-rep retry-free validation. Also corrected a false premise: the
"VSplit describe has retries:2" belief — TOOLMATCH-IA-1 (`4de6cc9`) had removed
that retry with the VSplit component; zero retries existed until F149.

### 7 · BATCH-W-1 (the walkthrough dozen) — one non-obvious correction
W-5 was registered as a suspected redaction/allowlist bug eating `payload.kind`.
Tree-verification proved that WRONG: no scrubber in the emit path; rows reach the
DB. The real fault was CLIENT-side — a permission-race dead fetch (`useEffect []
+ if(!mayCurate) return`, capabilities load async → fetch skipped forever on
deep-link arrival) + a fabricated-zero render. Fixed by re-keying effects on
`[mayCurate]`/`[mayDraft]`. This is why **F147 does not ride BATCH-W** (the emit
path needed no fix); F147 re-homed to the IR-3-era api batch. W-12's "4 gateway
tools" premise was corrected to THREE (`resolve_time_range`, `aggregate_records`,
`query_records` — the `LOCAL_TOOL_NAMES` SSOT).

## STANDING ACTOR / LANE MODEL (unchanged, reaffirmed)
- **Architect (Claude):** diagnosis, versioned design notes, gated phase prompts,
  RULE-25 fresh-clone reviews, verbatim merge messages (S30-2). Never trusts a
  report — starts every review at `git rev-parse`.
- **AG-A / AG-B (Claude Code on AntiGravity):** all repo writes; verify S47-1
  preconditions; may execute gated-service scripts on standing owner consent
  (ADR-006), never raw DB.
- **Operator (Gemini + Supabase MCP):** `supabase db push` ONLY (never
  apply_migration, ADR-005); FENCE-first (SEC-1) project `fjbrkimwvtpwoxhziidh`;
  never echoes secrets.
- **Owner (Maymun):** decisions, consent-for-spend, real-world tests, relay. The
  three-lane workflow is locked.

## KEY VERIFIED FACTS (S55, tree-proven — carry forward)
- Semantic-router classifier = **`gemini-2.5-flash-lite`** (`providers.ts`,
  id `gemini-lite`, DB-first/code-floor via `routerModelId()`); still live, not
  deprecated. Main chat = `gemini-2.5-flash`.
- Span helper: `setSpanIO(span, {input?, output?})` — hard no-op when span
  undefined. Langfuse keys `OBSERVATION_INPUT/OUTPUT` (from `@langfuse/core`);
  root uses `TRACE_INPUT/OUTPUT` + (now) `OBSERVATION_INPUT/OUTPUT`.
- Single DB chokepoint: `getServiceClient()` at `persistence/client.ts:48`
  (31 repos, 144 `.from()` reads; 11 `.rpc()` sites still untraced = F150).
- Secret tables via `DB_TABLES` enum (LLM_PROVIDER_SECRETS / MCP_SECRETS /
  LLM_PROVIDERS_PERSONAL).
- Pipeline `TURN_STAGES` (pipeline.ts): resolve-mcp, resolve-backends,
  telemetry-init, lab-overlay, persistence-init, resolve-provider, register-tools,
  assemble-prompt, warm-trust — then the stream stage (chat.ts:244) + flush.
- Grant-citation target (S30-1): `20260711120000_harden_grants_default_acl_sweep.sql`
  (HARDEN-GRANTS-1). Its obs-(c): REFERENCES/TRIGGER surviving on service_role/
  postgres for new tables = known-harmless (no DML).
- `GOLDEN_BATCH` fires ONLY for `prompt.segment` (`golden-runs.ts:68`,
  `dbConstants.ts:493`); router.prompt + agent-param publishes ride the normal
  eval gate.

## WHERE THE PROGRAM SITS
FULL-TRACE program CLOSED. Next main line = **~Aug 2 traffic-window review = K1
ratification**, then IR-3 flip → IR-4 → MEMORY-1/F48 → F83 arc → Kale-RAG →
Superset E-activation → security-cleanup → FINAL docs+arch pass. Small pending:
**F150** (OBS-TRACE-2b, `.rpc()` tracing). BOARD-WALK re-walk owed at next round
close ("ASLA unutma"). GOLDEN FREEZE still engaged (no golden runs until owner
lifts).

<!-- END · CWF-SESSION-GRAPH-KB-v54 · 2026-07-21 -->
