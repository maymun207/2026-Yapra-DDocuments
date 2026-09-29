# OWNER-WITNESS-S164-ROUTING-OBLIGATION-1

Register 141 · CLOSED@evidence below. Witness taken 2026-09-29 16:11–16:14 TSİ in the Architect's browser pane on the owner's production session (cwfyaprak.vercel.app, build 6a3824c2b5efd1764be178d05ba647feec06927c = master, PR 638 = K32). The owner pressed "Create draft" and "Publish (run gate)" himself ("bastım", 16:11 TSİ); the Architect filled the form and read the trace.

## BEFORE (MEASURED: turn_trace_digest, turn 6dcc95fa1aee0a54d35ab748d8ddf222, 2026-09-29T03:04:23Z — the S163 tour turn, before K32 landed)
```evidence:before
stage 07 spans: cwf.stage.07.resolve-mcp | cwf.stage.07.resolve-backends | cwf.stage.07.register-tools
(stages->'07')::text ilike '%obligation%' → false   (no obligation field existed)
```

## THE RULE (MEASURED: domain_rules, 2026-09-29T13:11:15Z)
```evidence:rule
kind_id armes.routing_obligation · key cooked-stock-andon · status published · version 1
rule_id 322f9505-4473-4fff-bea1-1ceffde98250
payload {"tool":"getCookedStockAndon","when_any":["pişmiş","cooked"],"note":"Pişmiş stok sorusu geldiğinde getCookedStockAndon çağrılmak zorundadır (routing obligation, K32). OWNER-WITNESS-S164-1."}
Rules UI: Published — gate passed · SCHEMA ✓ REFERENTIAL ✓ BEHAVIORAL ✓ · v1 PUBLISHED running now
```

## AFTER (MEASURED: turn_trace_digest, turn a39df592d6aaeb84ac90edb3ce51b768, 2026-09-29T13:12:37Z — "KB7 pişmiş stokta hangi işler bulunuyor?" asked from the pane)
```evidence:after
stage 07 register-tools output contains:
obligationsApplied: [{"ruleId":"322f9505-4473-4fff-bea1-1ceffde98250","tool":"getCookedStockAndon","matchedTerm":"pişmiş","outcome":"offered"}]
obligationBudget: null · obligationOverflow: "UNMEASURED-NO-BUDGET" · writeOfferedCount 0 · unclassifiedCount 12 · redirectAllowed true
irFrame: action QUERY_STATUS · object MATERIAL · entity_ref [KB7] · metricsSurface ["pişmiş stok"] · confidence HIGH
offeredToolNames includes getCookedStockAndon
```
```evidence:answer
UI: "(1 queries)" · getCookedStockAndon({"factoryId":"KB7"}) · "KB7 Pişmiş Stok İşleri — 32 satır" (orderId, lineId FIRIN ÜST/FIRIN ALT, materialDescription, nextStep PARLATMA, in/out quantities) · Kanıt / Evidence: getCookedStockAndon ×1
```

## VERDICT
The obligation door (K32) fires in production from a DATA row published through the admin UI: term "pişmiş" → getCookedStockAndon offered → the model called it → 32 real rows. The S161 answer ("iş bilgisi şu an için mevcut değildir") is replaced by the data. No code carries the term or the tool name (NO-HARDCODE holds: the rule is a domain_rules row).

## OPEN, carried by name
- obligationBudget null → obligationOverflow "UNMEASURED-NO-BUDGET": the budget knob is K41's (register 143); until K41 lands the overflow is unmeasured, not zero.
- "No registered procedure was used — advisory" footer and "3 past interaction(s) recalled" are unrelated surfaces (memory: A26 track).

END · OWNER-WITNESS-S164-ROUTING-OBLIGATION-1
