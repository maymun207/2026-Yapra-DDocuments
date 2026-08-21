# claude-code-PHASE-SUPERSET-VIS-2-v1

<!-- claude-code-PHASE-SUPERSET-VIS-2-v1 · rev 1 · 2026-07-22 · Architect: Claude
     BLOCK 2 closing phase. Kills the model's blind-groping in the Superset
     gateway: (A) a mirror-derived CAPABILITY INDEX in the prompt (the model
     finally KNOWS what each inner tool does), (B) governed behavior rows
     (cross-type search discipline + value-depth), (C) OEE glossary mapping
     derived from machine evidence. Amendments mint v1_2 (S37-1). -->

## PRE-FLIGHT (hard gate)
- Valid only while `origin/master == bfa25f5c0916a726ea9a55dc70d0f0544e777ff7`
  and no other phase branch is open. On mismatch STOP and report actual state.
- Branch: `superset-vis-2`. FULL profile (api/** touched). Unsharded CI green
  on the PR head is a merge precondition. Never merge yourself.
- PLATINUM: zero manual configuration anywhere; the capability index is
  DERIVED from the mirror at compose time (self-updating with every sync);
  the one human touchpoint is the owner's glossary-mapping confirmation
  (a genuine judgment) + the final consented publish.
- Secrets: never read/print any credential. supabase-ro for reads only.

## CONTEXT (Architect-verified, live evidence — treat as given)
- SUPERSET-VIS-1 is merged (`bfa25f5`) and live: 22 inner tools mirrored as
  `backend_tools.via_gateway=true` rows (names incl. get_chart_data,
  list_charts, list_datasets, generate_explore_link, execute_sql…), 2
  `superset.routing_hint` rows PUBLISHED v1 (bi-artifacts,
  prepared-historical-aggregates).
- THREE live turns today prove the remaining behavioral gap (traces
  0ad4daa7…, a005befc…, + screenshot evidence): the model (1) searches ONE
  entity type and treats a 0-result literal search as "doesn't exist" —
  e.g. looked for the CHART "Granit - Fırın Üretim Toplamı" (known chart
  id=2, big_number_total, listed by list_charts this morning) in the DATASET
  list only; (2) stops at metadata — never calls get_chart_data/data-level
  tools for a VALUE question. Honesty floor held every time (zero
  fabrication); the defect is search discipline + depth, i.e. CONTENT +
  MISSING MAP, not code trust.
- The owner has just run (or is running) a discovery turn asking for the
  full 45 dataset names with OEE/verimlilik candidates flagged — its
  list_datasets MCP result is captured in turn_trace_digest (FULL-TRACE).

## GATES

### G0 · MACHINE EVIDENCE READ (supabase-ro, no repo work yet)
- Read the LATEST turn_trace_digest row whose MCP span I/O contains a
  list_datasets call with an empty search (the discovery turn; fall back to
  trace a005befc… from 16:16Z which also carried the full 45-row result).
- Extract and report VERBATIM: all 45 dataset table_names (+ schema), and —
  if any digest row in today's window carries the 34-row list_charts result
  — the chart slice_names too (best effort; absence is reportable, not
  blocking).
- Flag OEE/verimlilik/performans-adjacent candidates by name. REPORT this
  list prominently in your final report: the OWNER will confirm which one(s)
  are the OEE source — do NOT publish any glossary row before that
  confirmation arrives (it lands as part of the publish step's consent).

### G1 · CAPABILITY INDEX (composeSuperset, mirror-derived)
- New renderer section in the Superset domain pack: a compact index built at
  compose time from `BackendToolsRepository.listByBackend('superset',
  {viaGateway:true})` — ACTIVE rows only, sorted by tool_name, one line each:
  `tool_name — first sentence of its description` (truncate ~120 chars,
  strip newlines). Preface line states the discipline: these are NOT
  directly callable; reach them via search_tools → call_tool.
- empty≠zero: mirror empty/unavailable → the section is OMITTED entirely
  (no header, no fabricated list); compose must not throw (outage only
  disables). The read rides the SAME warm/compose data path conventions as
  the pack's other sections — no new turn-pipeline stage.
- Turn-path guard UNTOUCHED and re-asserted: extend the existing
  gatewayInnerToolsNeverOffered test to run WITH the index present and pin
  that offered tools still exclude every via_gateway row (the index is
  prose, not tools).
- Tests: index renders from a seeded mirror fixture; empty-mirror omission;
  truncation; missing-status rows excluded.

### G2 · GOVERNED BEHAVIOR ROWS (job v2, staged not run)
- New file `scripts/jobs/superset-vis-2-behavior-v1.json` (the VIS-1 job is
  immutable/spent — do not edit it). ruleInstances only:
  1. kind `superset.gateway_step`, key `cross-type-search`, payload step:
     "Bir varlık (chart/dashboard/dataset) aranıp bulunamadığında diğer İKİ
     türde de ara (list_charts + list_dashboards + list_datasets). Tek türde
     0 sonuç 'Superset'te yok' demek DEĞİLDİR; üç tür de boşsa bunu
     belirterek dürüstçe raporla."
  2. kind `superset.gateway_step`, key `value-depth`, payload step:
     "Kullanıcı bir DEĞER/metrik istiyorsa liste veya metadata cevap
     değildir: chart için get_chart_data ile gerçek veriyi çek; dataset için
     uygun veri-okuma yolunu kullan; değeri kaynak atıfıyla sun."
  3. kind `superset.glossary_term`, key `oee-source` — payload maps "OEE" to
     the owner-confirmed dataset/chart name(s) from G0. Author the row with a
     clearly-marked PLACEHOLDER value in the staged file; the publish step
     (separate, consented) substitutes the confirmed name — a placeholder
     must NEVER pass the gate, so add a test/lint asserting the staged file's
     placeholder marker is absent from any publish invocation input.
- Mirror the two step texts into the code-floor GATEWAY_STEPS reference
  (S46-SELF-SEED symmetry: floor and governed content stay in lock-step),
  byte-identical strings, so an outage still serves the discipline.
- Schema fidelity: read the existing gateway_step/glossary_term field_specs
  from kinds.ts and match payload shapes exactly.

### G3 · SELF-VERIFY + REPORT
[ ] G0 evidence: 45 names verbatim + OEE candidates flagged (+charts if
    available) — prominent in the report for the owner's confirmation.
[ ] Capability-index tests green incl. empty-mirror omission + guard re-pin.
[ ] Job v2 staged; placeholder-lint test green; floor/gov lock-step test.
[ ] Full unsharded suite + CI green; RESEAL rev 132 → 133; CHANGELOG + KB.
[ ] grep proof: no diff in eval-gate machinery, gatewayProtocol.ts rule
    content, deriveCategories, routeKeywordLayer, gatewayPreflight behavior.
[ ] Report: PR number, head SHA, CI status, origin/master unchanged, G0
    candidate list. NO merge, NO publish.

<!-- END · claude-code-PHASE-SUPERSET-VIS-2-v1 · rev 1 · 2026-07-22 -->
