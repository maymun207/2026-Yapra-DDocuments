# PHASE-VIZ-GATEWAY-BINDING-1 · v1 — LANE: AG-2

<!-- PHASE-VIZ-GATEWAY-BINDING-1-v1 · 2026-08-06 · S82 · Architect: Claude (Opus 5).
     Closes BUG-030 (minted S82, live trace=8b2cb9bc). OWNER PRIORITY: "musteri
     grafik var mi yok mu ona bakiyor" — this is the last broken link in the
     chart pipeline and it ships TODAY. Own worktree, branch from origin/master
     75b22119, S82-4 proof. ZERO migrations. Touch budget 4. -->

## §0 · The defect, from the live turn's own log

`trace=8b2cb9bc` (2026-08-06 09:09Z, prod): the model found chart 85, the repair fixed
`chart_id`→`identifier`, `get_chart_data` returned five series rows with
`display_name: "Toplam Sarfiyat (M³)"` — **the data was in `rawToolResults`** — and the
screen showed the honest panel: *"Grafiğe dönüştürülecek araç sonucu bulunamadı
(call_tool)"*.

**Cause, read at `src/lib/toolResultSelect.ts:137/142`:** the binding filters
`r.toolName === directive.tool`. A gateway result's `toolName` is **`call_tool`**; the
model's directive names the INNER tool (`get_chart_data`). They can never be equal, so
every gateway-backed chart is structurally unrenderable — data present, binding blind.
The honest panel is doing its job; the matcher is not.

## §1 · G1 — teach the binding the gateway shape (client, small, surgical)

`RawToolResult.args` for a gateway call carries `{name: <innerTool>, arguments:{…}}` —
the inner tool name is ALREADY in the data the client holds. Fix in
`toolResultSelect.ts` only:

`effectiveToolName(r) = r.toolName === 'call_tool' && r.args?.name ? r.args.name : r.toolName`

Use it in the two scoped filters (lines 137 and 142) and NOWHERE else. `callId` binding
(line 132) is untouched — it is already correct and stronger.

- A directive naming `call_tool` itself still matches gateway results (backward
  compatible both ways; test it).
- `match` discrimination against args: for gateway results, match against
  `args.arguments` (the inner args) so `{identifier:85}` discriminates between two
  gateway calls; keep matching the outer shape too (either-or, first hit wins,
  deterministic order).
- **ProvenanceCaption** shows the effective name + inner args — the caption under the
  chart must read `get_chart_data({"identifier":85})`, not `call_tool(…)`; provenance
  that names the wrapper hides the source.

## §2 · G2 — the honest panel names what it looked for

When binding still fails, the panel's parenthetical uses the effective name. Today's
text told the user `(call_tool)` — true and useless. One line.

## §3 · Proofs (red-first, S82-5: real parse path)

1. Gateway-shaped raw result (`toolName:'call_tool', args:{name:'get_chart_data',
   arguments:{identifier:85}}`) + directive `tool:'get_chart_data'` → **binds**.
   Mutation: revert the two filter lines → panel, test red.
2. Flat-tool result byte-identical behaviour (positive control — the 141 ARMES bindings
   must not move; run the existing messageChart test suite unchanged).
3. Two gateway calls, different inner tools, one directive → only the named inner tool
   binds (no cross-bind).
4. `match:{identifier:85}` discriminates two `get_chart_data` calls.
5. Parser-entry render test: the REAL turn shape from trace=8b2cb9bc (call_tool result +
   chart-from-tool macro) renders a chart, not the panel.

## §4 · Post-deploy proof (S63-1) — THE OWNER'S ACCEPTANCE, verbatim

The same question, live, new session: *"Granit Glazür hatlarının doğalgaz sarfiyat
grafiğini son 10 gün için çizer misin?"* — **the chart RENDERS.** Bars on screen, unit
from the source (`Toplam Sarfiyat (M³)` — UNIT-TRUTH-1 is merged and reads
display_name), provenance caption naming get_chart_data. Name the trace. If it does not
render, the log names the next link and this phase reports it rather than absorbing it.

## §5 · Standing rules

Report in-branch same push · ## MERGE with the merge commit, never pre-written · S82-4
base proof · no control chars · claims cite commands or carry the label · nothing under
the rug · question-round-trip count · touched-file list. Files expected:
`toolResultSelect.ts` + tests + (one line) the panel component. If you find yourself
outside that set, STOP and report.
