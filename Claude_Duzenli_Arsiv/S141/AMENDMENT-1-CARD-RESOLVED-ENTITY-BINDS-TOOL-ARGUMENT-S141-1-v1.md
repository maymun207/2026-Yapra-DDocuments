<!-- relay-audit: v1 kind=notice -->
AMENDMENT-1-CARD-RESOLVED-ENTITY-BINDS-TOOL-ARGUMENT-S141-1-v1

LANE: AG-4

Reads WITH the sealed card CARD-RESOLVED-ENTITY-BINDS-TOOL-ARGUMENT-S141-1-v1 (adversary GREEN, verdict row named in `raw-tokens`). The card's bytes are immutable (S37-1); this amendment carries the scout's three notes and ONE ordering instruction. NO ORDER MOVES.

A0 — THE FORK POINT (S102-YASA-2, a named wait, never a sleep). This card shares stageClarify.ts, types.ts and the manifest seal with your previous card (CARRIED-OPTION-INJECTS-ITS-REF-S141-1, branch head in `raw-tokens`). Fork from `origin/master` ONLY when master's ancestry contains that branch's landing — the test is `git merge-base --is-ancestor <that branch head> origin/master` after a fetch, exit 0. If you reach this card before that landing exists: measure it once per box tick and work nothing on this card until it holds; EXPIRY: if it has not landed sixty minutes after you first measured, fork from that branch head instead, say so in your report's first line, and expect the landing lane to reseal over the merged tree. Two branches that both reseal the manifest make the second DIRTY and no pull_request run fires on a dirty PR (F-S140-CONCURRENT-RESEALS-CONFLICT-ON-MANIFEST-1) — that is what this rule prevents.

A1 — ORDER 1's layer fallback (scout note i). A governed-alias hit (aliasResult, no registryHit) and a carried-option hit whose candidate lacked a layer would carry `layerKey` null and never bind. The seam's own fallback at stageClarify.ts:1727 is `hit?.layerKey ?? v.canonicalType.toLowerCase()` — merged entries carry `canonicalType` = the upper-cased layer key. `resolved[].layerKey` takes the SAME fallback, or the factory an alias resolved never binds.

A2 — ORDER 2(a)'s array rule (scout note ii). `declaredType` is a free string in the policy shape; the seed row for `zoneIds` must spell it so that the binder's array test and `isUnfilled`'s array test agree, or rules (b)/(c) compare `[id]` to `id`. Pin the spelling in the seed test and in test (b).

A3 — ORDER 3's witness surface (scout note iii). F-S135 holds: the trace carries arg SHAPES only. The digest projection that lifts `toolLedger` into turn_trace_digest must include `argBindings`, or ORDER 6 cannot be read. Add that projection line to the scope as an additive change and name the file in your report.

A4 — ORDER 4's schema string. The scout could not read `backend_tools.input_schema` from its window; it answered from the tree (the layer descriptor seed at supabase/migrations/20260726120000_entity_registry_layers.sql:189 maps the registry's `line` layer to getFactoryLines/factoryId; the OEE-for-zones specimen carries one line uuid under zoneIds; the S86 procedure fixture pins getFactoryLines → getLineStopsReportForZones). You read that table already through the mirror: print the tool's input_schema description for `zoneIds` in your report so the landing rests on the vendor's words too. The ⚠ STOP in ORDER 4 stands.

A5 — WIRING FACT the scout measured (discriminator 2): the send at stageTools.ts:1406 uses `(callPlan.decision === 'send' ? callPlan.args : args)`, so a value bound BEFORE `planToolCall` flows through `callPlan.args` to the backend. The card's placement is the right one; do not bind after the plan.

```evidence:raw-tokens
sealed card sha256    91402ef0fc81f4275cc8c041de4784224123f4fdaf251b7bf07bce487c21e2d8
verdict row           6ad973a5-06bc-4302-a1d5-64ace037f25e
order row             f6660c41-b467-4a25-9829-454589a9b4b3
previous card branch  phase/carried-option-injects-its-ref-s141-1 @ bb4c53a4438c2a4780b2e620bf24dc4502afe879 (report commit, 2026-09-17T03:44:56Z)
```
