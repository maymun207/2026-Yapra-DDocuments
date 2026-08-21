# PHASE OBS-TRACE-3 — StagesDashboard In-Panel Trace Reflection
<!-- claude-code-PHASE-OBS-TRACE-3-v1 · rev 1 · 2026-07-20 · Architect: Claude
     Program: OBS-TRACE (3 of 3, FINAL). Lane: AG-B build + Gemini Operator
     (migration). Design source: cwf-obs-trace-3-stages-inpanel-design-v1.
     ══ DEPENDENCY GATE (HARD) ══ Do NOT start until BOTH OBS-TRACE-1 AND
     OBS-TRACE-2 are MERGED. This phase mirrors THEIR scrubbed span I/O + db-read
     payloads into a digest. TREE-VERIFY on the merged tree: the span-I/O helper
     (`setSpanIO` or its real name), the `cwf.db.read` payload shape, and the flush
     site — before building.
     ANCHOR: = the OBS-TRACE-2 merge HEAD (FILL AT DISPATCH).
     PRECONDITION (S47-1): valid ONLY while origin/master == <OBS-TRACE-2-MERGE-HEAD>
     and no other obs-trace-3 branch exists. On mismatch: STOP and report.
     Ceremony: FULL profile + OPERATOR (adds a migration). CI-green on PR head =
     merge precondition (S37-2). Zero golden/prompt surface.
     PLATINUM: self-configuring — the digest writes itself every turn, the panel
     reads it automatically; no manual step. Admin-panel UI rule satisfied (viewing
     governed observability data through a gated panel affordance). -->

## §0 · PRE-FLIGHT GATE (hard)
```bash
cd <workspace> && git fetch origin && git rev-parse origin/master
# MUST equal the OBS-TRACE-2 merge HEAD the Architect pinned — else STOP, report.
git checkout -b obs-trace-3 origin/master
```
TREE-VERIFY dependencies + record real names in report:
```bash
grep -rn "setSpanIO\|cwf.db.read\|SPAN_FLUSH\|force.*flush\|ctx\." api/cwf/_lib/observability/ api/cwf/chat.ts | head
```
S32-1 commands from package.json. Push early.

## §1 · ARCHITECT DIAGNOSIS — TREE-PROVEN (build on these)
Verified on dca514c (re-confirm on merged anchor):
- The panel today only POINTS at Langfuse: `InspectTab.traceUrl()` builds
  `${host}/project/${projectId}/traces/${turnId}` (turn-level); `StagesTab.SpanChip`
  (StagesTab.tsx:134) COPIES a span NAME + opens the host or the latest turn's
  trace (F-S01-b). Self-hosted Langfuse v3.205 has NO per-span filter URL. The
  panel can read `telemetry_events` (gated `/telemetry`) but has NO way to read
  the SPAN/trace tree.
- So after OBS-TRACE-1/2 the rich per-stage I/O + routing chain + db-read spans
  exist ONLY in Langfuse. This phase brings them INTO the panel.
- **Decision (design note §2): a compact `turn_trace_digest` in OUR DB, read via
  a gated endpoint — NOT the Langfuse API.** Rejected Langfuse-API-proxy (couples
  to Langfuse auth/query, async-ingestion gap → false panel gaps). The digest is
  a MIRROR built from the SAME scrubbed span I/O (captured by reference at the
  span-I/O call site into a per-turn `ctx` accumulator, written ONCE at flush) —
  never recomputed, never a second source of truth.

## §2 · GATED SUB-PHASES (in order)

### G1 — Migration: `turn_trace_digest` (Operator-applied)
Author the migration; the Architect relays it to the Gemini Operator (FENCE-first,
project `fjbrkimwvtpwoxhziidh`, `supabase db push` only).
- Table: `turn_id` (PK, = trace id / session_id), `conversation_id`, `user_id`
  (`uuid references auth.users`, **NULL with attribution in a jsonb field for
  machine turns per S33-1** — never a string sentinel), `created_at`,
  `stages jsonb`, `token_summary jsonb`.
- RLS + grants: **service-role write only; gated admin read; all-grantees revoke**
  (revoke SELECT/INSERT/UPDATE/DELETE from public, anon, AND authenticated
  explicitly — never PUBLIC-only, FIX-2). **S30-1: cite the grant/revoke pattern
  from the LATEST fix migration in the family — `20260711120000_harden_grants_
  default_acl_sweep.sql` (HARDEN-GRANTS-1)**, NOT the original. Include a
  `verifyGrants` probe row + a CI coverage test (standing security rule).
- **Retention:** bounded — a concrete cheap policy (rolling N days or N turns/user
  or a global cap). This is DEBUG data, small windows fine. NOT the durable
  ledger. Include the cleanup mechanism in-phase.

### G2 — Digest write at flush (mirror, scrubbed by construction)
1. Add a per-turn accumulator on `ctx` that captures the ALREADY-scrubbed span
   I/O payloads (from OBS-TRACE-1's helper) + the `cwf.db.read` summaries (from
   OBS-TRACE-2) as they're produced — **by reference, do NOT re-serialize raw
   objects**. The routing chain lives inside the register-tools stage entry.
2. At flush (the existing force-flush site), write ONE `turn_trace_digest` row.
   One extra bounded DB write per turn.
3. **Secret boundary inherited:** a deny-list-table read contributes
   `{ table, op, rowCount }` but NO sampleHead (OBS-TRACE-2's boundary flows into
   the digest). Test it.
4. **Empty≠zero:** `rowCount: 0` real; missing dbReads = stage did no reads;
   `null` = not-measured, never rendered 0. Cap the `stages` blob + per-entry
   sizes (reuse MCP result-cap discipline); on a pathological turn record a
   truncation marker HONESTLY, never silently drop.
5. **Degrade:** decide write-gating — lean: write regardless of Langfuse being
   configured (it's our DB, useful standalone), but confirm perf/secret posture.

### G3 — Gated read endpoint + adminService
A gated admin GET (`/api/admin/turn-trace-digest?turnId=…` and/or `?conversationId=…`)
returning the digest row(s); PANEL_ACCESS-gated, mirroring existing admin-endpoint
shape (e.g. `learn-aggregate.ts`). Wire `adminService.getTurnTraceDigest(...)`.

### G4 — StagesDashboard (StagesTab): per-stage live I/O
Each StageCard gains a "son turn / last turn" expandable showing THAT stage's real
digest entry: input summary → output summary, and for read-bearing stages a
db-reads table (`table · op · rowCount`, `0` shown honestly, missing = "okuma yok /
no reads"). The register-tools card shows the routing chain inline:
`query → [keywords] → matched [names] · dropped [names] → offered [N tools]` (the
grand-sequence-flow chain). Keep the existing SpanChip as the "open full tree in
Langfuse" escape hatch (now complementary). Honest tri-state: digest present →
data; absent (no recent turn / obs off) → "henüz turn yok / gözlem kapalı", never
fabricated values. TR/EN via the local `t()`.

### G5 — InspectTab: turn → full stage breakdown inline
Clicking a turn expands its digest INLINE — the ordered stage list with per-stage
I/O + db reads — the in-panel version of the grand-sequence-flow table, driven by
real data. The existing Langfuse deep-link stays for the full-fidelity tree.

## §3 · BINDING CONSTRAINTS
- **The digest is display-only — NEVER authority.** No governance / grounding /
  gate / trust path may read the digest repository. Add a test/lint that nothing
  in those paths imports it (C1-LAW spirit: those paths never touch this mirror).
- Digest write reuses ALREADY-scrubbed payloads — MUST NOT re-serialize raw
  objects (secret-leak + bloat). Scrub-then-cap (C4).
- `turn_trace_digest` ≠ `telemetry_events`: different tables, consumers,
  retention, secret posture. State the split in an ADR note (extends ADR-004
  lineage): permanent redacted LEDGER vs bounded-retention DEBUG MIRROR.
- `adminLegibility.test.ts` auto-gens 2 tests per new/changed admin `.tsx` —
  budget for StagesTab/InspectTab changes + any new component.
- Zero golden/prompt surface. Migration reseal + mapped-file reseal per S34-1.
- Operator prompt (Architect-authored, separate relay): FENCE-first, project
  `fjbrkimwvtpwoxhziidh`, `supabase db push` only (never apply_migration, ADR-005),
  literal-read G-gates, idempotence probe, `verifyGrants` confirmation.

## §4 · SELF-VERIFY CHECKLIST (evidence = literal outputs)
1. `npm test` green UNSHARDED locally AND CI green on PR head (link).
2. G1: the migration read in full (Architect FULL review) + `verifyGrants` probe +
   the all-grantees revoke lines (cite HARDEN-GRANTS-1 pattern) + retention policy.
3. G2: digest-write test — stages list == spans emitted (mirror-parity, no
   disagreement with Langfuse); the secret-deny-list-in-digest test; the
   empty≠zero (`rowCount: 0` real) + truncation-marker tests.
4. G3: endpoint gating test (PANEL_ACCESS).
5. G4/G5: StageCard "last turn" render test (tri-state: data / no-turn / obs-off,
   NO fabricated values) + the routing-chain-inline assertion; InspectTab inline
   breakdown test.
6. The display-only lint/test (no trust/gate/grounding import of the digest repo).
7. `npm run typecheck:api` + `npm run build` + `npm run check:doc-drift`.
8. Operator: migration applied via `supabase db push`, idempotence second-run
   probe clean, `verifyGrants` row confirmed. DOC-FLIP after live-verify.
9. Diff-scope sweep: `git diff --stat <anchor>..HEAD` — NO golden/prompt surface;
   paste the stat + the tree-verified dependency symbol names (from §0).

## §5 · MERGE (only after Architect GO + Operator-applied + live-verified)
Merge `--no-ff` (squash banned). Merge-commit message VERBATIM:
```
Merge PHASE OBS-TRACE-3: StagesDashboard in-panel trace reflection — turn_trace_digest mirror (scrubbed, bounded-retention, display-only) + gated read endpoint + per-stage live I/O on StageCards (routing chain inline) + InspectTab turn breakdown
```
Report: remote hash + CI link + §4 evidence + Operator apply confirmation.
Architect FULL review (migration + secret surface + new endpoint). Then the
FULL-TRACE MANDATE is delivered end-to-end: every stage / read / tool I/O visible
in BOTH Langfuse AND the StagesDashboard. Register: close OBS-TRACE program.

<!-- END · claude-code-PHASE-OBS-TRACE-3-v1 · rev 1 · 2026-07-20 -->
