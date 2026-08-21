# PHASE-RAG-JOIN-FINISH-1 · v1
<!-- PHASE-RAG-JOIN-FINISH-1-v1 · 2026-08-01 · S75 · Architect: Claude · Author lane: AG.
     Owner decision (S75, recorded): RAG finishes in v1; guard(a)'s five proofs are
     harvested LIVE by the Architect post-enable (owner-authorized re-reading of the
     probe-document requirement — substance kept, evidence class upgraded to observed
     behavior per S63-1/ADR-010). Board 8′ items 1/2/4/5-9 + RAG-ATTR-1. -->

## FINISH DEFINITION (S74-1, user-eye)
A production user sees `machine-knowledge-base` in the rules pulldown, asks a
real knowledge question, and receives a correct answer WITH source attribution
visible in the evidence chain (W-D). Day-one usage is measured (F207-class),
and the Architect has harvested the live guard(a) evidence (read-only surface ·
attribution · auth-by-reference).

## G0 · PRE-FLIGHT (STOP on mismatch)
Fresh clone; `git rev-parse origin/master` MUST be
`c22cdf2425e458dac58f4e63a0a77a4e56f69886`. Commands package.json-verified.
Gated live read: `backends` registry rows (expect armes + superset present,
NO machine-knowledge-base row — if it exists, STOP G1 and report);
`mcp_settings` row `machine-knowledge-base` present, enabled=false,
`apiKeyRef=ragbackend`, `backend_id` currently unset-or-armes-folded (report
its literal current value).

## BINDING CONSTRAINTS
All A5 constraints carry (gate unbypassable · no raw writes · ADR-007 · R-RUNID
· consent per S54-4/S74-2 · MCP-WARM-STALE: post-enable verdicts wait ONE 5-min
TTL or bust the cache). Plus: `tool_category` rows are authored ONLY from the
LIVE tool mirror, never guessed (RAG-ROUTE-STARVE-1: the uncategorized starve
is protective; the answer is categories, never a 0→all fallback). Genericity
law holds for any touched module.

## G1 · [AG] REGISTRY MIGRATION (the missing affordance's sanctioned channel)
1. Author ONE idempotent migration
   `supabase/migrations/<utc-ts>_backend_registry_machine_knowledge_base.sql`:
```sql
-- RAG-JOIN item 1: machine-knowledge-base joins the backends registry.
-- Backend identity is DATA (a row, never an enum). Idempotent by design.
insert into public.backends (id, display_name, tool_pattern, enabled)
values ('machine-knowledge-base', 'Makine Bilgi Tabanı', 'flat', true)
on conflict (id) do nothing;
```
   `tool_pattern='flat'`: the RAG service exposes query tools directly (the
   armes shape), not an inner-tool gateway (the superset shape).
2. Branch + push + PR for CI; STOP-FOR-REVIEW (Architect RULE-25 + GO +
   verbatim merge message follow). NOTE: the migration is NOT applied by you —
   ADR-005: `supabase db push` is the Operator's, via the Architect's fenced
   apply prompt after merge.

## G2 · [Operator, after merge — separate fenced prompt will follow] db push +
idempotence probe + verifyGrants-style read-back of the row.

## G3 · [Owner hand, admin panel — after G2 confirms the row]
1. Araç sunucuları (MCP) sekmesi → `machine-knowledge-base` satırı → EDIT →
   backend alanında dropdown'dan `machine-knowledge-base` seç → kaydet.
   (URL and apiKeyRef stay untouched; the secret value is never displayed or
   re-entered — reference only.)
2. Aynı satırı ENABLE et.
3. Saati not et — every subsequent behavior read waits one 5-min TTL from
   this moment (or the cache is busted via the admin affordance).

## G4 · [AG] CATEGORIES + [Architect] LIVE HARVEST (after G3 + 1 TTL)
1. Architect reads Vercel runtime logs (BackendHealth tick + absence of
   `[MCP Probe]` error lines = the success signature) — PROBE-1/2 harvested.
2. AG gated-read of the live tool mirror for the backend: paste the full tool
   list + input schemas. Explicitly verify ZERO write/mutating tools —
   PROBE-3 harvested; a write tool found = STOP, named finding, join blocked
   per R9.
3. AG authors `scripts/jobs/rag-tool-categories-v1.json` (ruleInstances only,
   reps:3) mapping every mirrored tool to a category — categories derived
   from the mirror's own names/schemas, listed in the report with a one-line
   rationale each. plan → STOP-FOR-REVIEW → (GO) → owner consent line →
   stage → publish (golden structurally N/A for rule-instance jobs — expect
   the seam's refusal, zero tokens; the eval gate inside publish is the
   behavioral check). Paste the `[Gate]` line.
4. One discovery-TTL after publish: pulldown visibility check (owner screen)
   + first REAL query (owner hand). The answer's attribution field is
   PROBE-4 — the make-or-break: structured source (document/section), not
   prose. Absent attribution = named finding `RAG-ATTR-1-RED`, recorded, and
   the owner decides ship-with-finding vs hold — the Architect will
   recommend on the evidence.
5. F207 day-one usage read (Architect, logs): tool-call count for the
   backend in the first live window; zero adoption = a routing/prompt
   finding by name, never silence.

## G5 · BUG TRIAGE OPENS (the owner's real goal)
Once G4.4's first query lands: the owner pastes YESTERDAY'S captured bug
list; each bug + each new observation runs the S73-1 diagnosis chain
(screen → log → local repro → Inspect → one fenced Operator read →
real-component bisect → the line — never patch above the proven layer).
Known standing entries enter the triage board by name: RAG-ROUTE-STARVE-1
(should be CLOSED by categories — verify, don't assume) · MCP-WARM-STALE-1
(ops-law honored in this brief) · RAG-ATTR-1 (resolved or RED at G4.4).

## SELF-VERIFY (literal evidence per line)
□ G0 hash + registry/mcp live-read literals
□ Migration file bytes + CI green on PR head (link)
□ G4.2 tool list pasted; zero-write verification stated with the evidence
□ Categories job bytes + per-tool rationale + [Gate] line
□ TTL discipline: timestamps showing every behavior read ≥5 min post-flip
□ Findings ledger; nothing silently fixed
Report ends with the literal line `END-OF-RAGJOIN-REPORT-v1`.

<!-- END · PHASE-RAG-JOIN-FINISH-1-v1 -->
