# PHASE F161-FIX-1 · v1 — pagination-honesty record fix + verification-log completeness + dead-URL suppression
<!-- claude-code-PHASE-F161-FIX-1-v1 · rev 1 · 2026-07-22 · Architect: Claude · lane: AG (Author) -->
<!-- Immutable once presented (S37-1): amendments mint v1_2, never in-place. -->

**PLATINUM compliance:** pure code fix + additive scrubbed log lines; nothing to
configure, no manual runway. Self-configures on deploy; every new log line is
enum/count/name-level (no raw secret), consistent with the existing `[Route]`
and `[MCP Call]` verbosity.

## §0 · PRECONDITION (S47-1 — hard gate)
Valid ONLY while `origin/master == e8bf988ec0103375f58a1e49f59dbfc69cd036e1`
(rev 135, ENTITY-FLOOR-1 merged). On any mismatch: **STOP and report actual
state** — do not proceed. Branch: `f161-fix-1` off this master.

## §1 · WHY (diagnosis-first — the hidden trap)
ENTITY-FLOOR-1 G3 (F161) shipped but its record counter is **wrong on
envelope-wrapped gateway results**, and it mislabels complete results as
partial. Two live specimens (prod trace `bf9365d1` / `7589fcdd`, 2026-07-22):

- `[ToolResult] call_tool: records=34/1 page=1/1 paginated=true` — the result
  held **exactly 1** chart (`charts:[…1…]`, `count:1`, `total_count:1`). `34` is
  the length of the `columns_available` **metadata** array. `findRecordArray`'s
  "longest array property" heuristic picked metadata over data.
- `[ToolResult] call_tool: records=34/0 page=1/0 paginated=true` — an **empty**
  result (`charts:[]`, `count:0`, `total_count:0`) reported as 34 records AND
  labelled paginated. Empty is real-empty (empty≠zero), never a partial page.

This is F161 emitting the exact **lying field** it was born to kill (TOTAL-45 /
S59-2) — a claim (`records=34`) that isn't the world (1, or 0). It also violates
**partial≠complete**: a full single page (`has_next=false`, `total_pages<=1`) is
NOT paginated.

**Second trap — verification blindness (the log gap the owner named):** the
entity resolver stamps `ATTR_ROUTE_ENTITY_RESOLVED`/`ATTR_ROUTE_ENTITY_METHOD`
on the OTel span (`stageClarify.ts`), and the IR frame lives on the span (F157),
but NEITHER is echoed to a Vercel-lane console line. So live verification of
"did the resolver fire / what was the frame" is impossible from Vercel logs — it
forces a Langfuse round-trip, breaking the automation-first rule "tests must be
observable where Claude reads (Vercel logs)". FULL-TRACE MANDATE already puts
full scrubbed I/O in Langfuse; this adds the **Vercel-lane enum/count mirror** so
verification never needs Langfuse.

**Third — F153 dead-URL surfaced:** Superset tool results carry
`url":"http://0.0.0.0:8080/…"` (Superset `armes-reports2` deploy config); the
model echoed the dead link to the user twice. Root cause is external (Superset
config, register F153 OPEN — PARK); but CWF must not hand the user a dead link.

## §2 · CEREMONY — FULL profile, narrow surface
`toolResult.ts` is under `api/` → full ceremony, but the change is surgical.
Files in scope: `api/cwf/_lib/toolResult.ts` (G1+G3) · `api/cwf/_lib/
toolCategories.ts` (G2 frame line) · `api/cwf/_lib/turn/stageClarify.ts` (G2
resolve line) + their `__tests__`. CI-green is the merge precondition (S37-2).

## §3 · GATED SUB-PHASES

### G1 · F161 record-array correctness + complete≠paginated (`toolResult.ts`)
1. **Data-array selection, never metadata.** `findRecordArray` must stop
   returning the merely-longest array. When the value is an object, select the
   record array by this precedence: (a) first key matching a known DATA-key set
   — `records, data, items, results, rows, charts, dashboards, datasets,
   databases, elements, content, hits` (extend as needed, but NEVER
   `columns_*`); (b) if none match, the array whose length equals a detected
   `count`/`total_count`-consistent value; (c) explicitly EXCLUDE any key
   matching `^columns?(_|$)` / `*_columns` from selection. A bare-array value is
   unchanged (records = the value itself). Keep `container`/`key` semantics.
2. **Complete≠paginated.** A result is PARTIAL (→ `paginated=true`, prepend the
   truncation note) ONLY when records were actually withheld:
   `hasNext === true` OR `records.length < totalCount`. A full single page
   (`has_next=false && (total_pages<=1 || records.length>=totalCount)`) is
   COMPLETE → `paginated=false`, NO truncation note. An empty result
   (`total_count===0` / 0 records) is real-empty → NOT paginated, NOT withheld.
   `detectPagination` may still read the envelope for an accurate
   `records=<data>/<total>` line, but the partial/withheld DECISION is gated on
   actual withholding.
3. **Log line truth.** `[ToolResult] … records=<dataRecordCount>/<totalCount>
   page=<p>/<totalPages> paginated=<bool>` where `dataRecordCount` = the DATA
   array length (post-fix), and `paginated` reflects the G1.2 decision.
4. **Tests (both live specimens, verbatim shapes):**
   - list_charts 1-of-1 (`charts:[{…}]`, `count:1`, `total_count:1`,
     `columns_available:[…34…]`) ⇒ records=1/1, paginated=false, no note.
   - list_charts empty (`charts:[]`, `count:0`, `total_count:0`,
     `columns_available:[…]`) ⇒ records=0/0, paginated=false, no note (empty≠zero).
   - a genuinely paginated case (`has_next:true` OR records<total) ⇒
     paginated=true + note present (guard the note path still works).
   - a bare-array ARMES result (e.g. getFactoryList 17) ⇒ elements=17 path
     unchanged (regression guard — the flat/non-envelope path must NOT change).

### G2 · verification-log completeness (Vercel-lane scrubbed mirror)
1. **`[Frame]` line** — at the frame-routing decision site where `frame` +
   `basis` are in scope (`toolCategories.ts`, beside the existing `[Route]`
   line): emit
   `[Frame] action=<ActionId> object=<ObjectId> entity_ref=[<surface…>]
   metrics=[<MetricId…>] conf=<HIGH|AMBIGUOUS> basis=<frame|union|keyword>`.
   Enum/name-level only (action/object/metrics are closed enums; entity_ref
   surface forms are factory-name strings already visible in `[MCP Call]` args —
   safe, no secret). Emit whenever a frame exists (basis=frame|union), skip
   cleanly on keyword-only turns.
2. **`[EntityResolve]` line** — in `stageClarify.ts`'s registry-resolution loop
   (where `ATTR_ROUTE_ENTITY_RESOLVED`/`_METHOD` are set): after the loop, emit
   `[EntityResolve] refs=[<entity_ref…>] resolved=[<factoryId:method…>]
   unresolved=[<ref…>] suppressedClarification=<bool>`. `method ∈
   exact|prefix|fuzzy`. This makes "resolver fired, on what, and did it suppress
   the clarification" sealable from Vercel logs alone. Do NOT remove the span
   attrs (Langfuse stays the SSOT; this is the mirror).
3. Consistency note: these are the Vercel-lane enum/count mirror of what
   Langfuse already carries — FULL-TRACE MANDATE unchanged (Langfuse = full
   scrubbed I/O; Vercel = enum/count/name). No raw tool payloads on these lines.

### G3 · F153 dead-URL suppression (deterministic, at result ingestion)
1. In the tool-result path (`toolResult.ts`), before the result reaches the
   model: rewrite/neutralize a `http://0.0.0.0:8080` (and `http://0.0.0.0` any
   port) base URL. If env `SUPERSET_PUBLIC_BASE_URL` is set (RULE-1: no
   hardcode; nullable), rewrite the base to it; else STRIP the dead URL to a
   non-link placeholder (e.g. `[Superset bağlantısı yapılandırılmadı]`) so the
   model never emits a dead `0.0.0.0` link. Deterministic string op, not an LLM
   ask. Test: a result carrying `http://0.0.0.0:8080/superset/dashboard/8/` ⇒
   model-facing text contains no `0.0.0.0`.
2. Root cause (Superset `armes-reports2` returning `0.0.0.0` base) stays
   **external ops / PARK** — register F153 remains OPEN; this G only stops CWF
   surfacing the dead link.

## §4 · BYTE-FROZEN (do-not-touch — zero diff)
`evalGate.ts` (engine/stage-order/interpreter) · `gateway.ts` ·
`_lib/trust/**` · `deriveCategories.ts` derivation table/enums · the governed
`router.frameRouting` param · `entityRegistrySync.ts` · the migration set. This
phase touches NO DB, NO migration, NO gate, NO governed row.

## §5 · SELF-VERIFY (evidence gates — literal, no claim without proof)
- [ ] `npx vitest run` full suite GREEN (report N tests / M files); the 4 G1
      specimens + G3 URL test + G2 (if unit-testable) present and passing.
- [ ] `git diff` on every §4 frozen file = EMPTY (paste the name-filtered
      `git diff --stat` proving zero).
- [ ] typecheck:api clean.
- [ ] doc-drift reseal if any mapped file drifted (comment-only → AST byte-compare).
- [ ] Report the merged-tree behavior expectation in the PR body: after deploy,
      a Superset paginated call logs `records=<dataN>/<total>` with the DATA
      count (not metadata), complete pages show `paginated=false`, and a factory
      turn logs `[Frame]` + `[EntityResolve]`. (Architect seals these live from
      Vercel logs post-merge — do not fabricate log output in the report.)

## §6 · HANDOFF
Push branch `f161-fix-1`, open PR, let CI run. Report: branch head SHA, PR #,
test count delta, frozen-diff proof. Do NOT merge (Architect RULE-25/FAST-GATE
review + verbatim merge message follow).

<!-- END · claude-code-PHASE-F161-FIX-1-v1 · rev 1 · 2026-07-22 -->
