# CWF-S148-RCA-MKB-UNREACHABLE-v1

Root-cause analysis: why questions answerable from the machine-knowledge-base (MKB) documents stopped being answered.
Session S148, 2026-09-20. Every line below is MEASURED from production (Supabase fjbrkimwvtpwoxhziidh, repo master 20c1651c3fb59b48490670ffefed02099d684ed9) unless marked UNMEASURED.
Owner contribution (S112-YASA-1): the owner remembered "it worked when MKB was first connected, a month ago" and asked for a generic, non-patch root cause. That memory was measured and is correct.

## 1 · What the owner saw
Production turn 3a7776b1a531177cbeb818430acf8a22 (2026-09-20T10:57Z): a question about board/executive benefits in the 9-month 2025 report. Answer: the fixed scope refusal. Zero tool calls.
Discriminator turn b50f21e01c287eef5c229deafa8e4375 (11:03Z), same question prefixed "Dokümanlarda ara:": knowledge_search WAS offered, the model still refused, zero tool calls.

## 2 · It worked before — measured
- tool_experience: knowledge_search positive_count 4, last_positive_at 2026-08-20T13:11:59Z; knowledge_lookup_machine last 2026-08-13. No MKB tool call in any turn since (turn_trace_digest from 2026-09-07: 0 calls).
- messages: Kaleseramik Faaliyet Raporu questions answered through knowledge_search on 2026-08-11 and 2026-08-12 (report date, capital ceiling, strategy, plant locations), and on 2026-08-18 12:30Z (capital ceiling, 1 tool call).

## 3 · When it broke — measured
Assistant replies per day, 2026-08-08..08-24:
- "Hangi varlığı (hat/bölge/ekipman) kastettiğinizi anlayamadım" (entity ask): 0 every day until 2026-08-17; 14 on 2026-08-18; 1, 5, 0, 3, 0, 1 after.
- "Ben yalnızca ... kapsamında" (scope refusal): 0-4/day before; 8 on 08-17; 14 on 08-18.
- Governed parameter router.frameRouting: v3 value 0 archived, v4 value 1 PUBLISHED at 2026-08-18T02:04:43Z.
- From 2026-08-18 12:32Z the company-report questions get the entity ask or the scope refusal; isolated successes remain (12:30Z, 12:59Z, 08-20 04:39Z, 08-20 07:02Z with "Dokümanlarda ara").
CORRELATION, not yet causation: the entity ask appears on the exact day frame-primary routing was switched on. UNMEASURED: the code path that produced each August ask (no turn_trace_digest before 2026-09-07).

## 4 · What did NOT change
- prompt.segment safety.b1_scope v3 published 2026-08-01T19:59Z ("SADECE Kale Seramik ve seramik üretimi ..."), unchanged since.
- machine-knowledge-base.tool_category "machine-knowledge" v1 published 2026-08-01T19:43Z, keywords bilgi/doküman/belge/sop/prosedür/.../makine, unchanged since.
- MKB pack (api/cwf/_lib/prompt/backends/machine-knowledge-base/pack.ts): an id-shape protocol only; it never says WHAT the knowledge base contains.

## 5 · The three gates a document question must pass today, and where each one fails
1. UNDERSTANDING (stage 02-03). The IR frame treats any named subject as a factory entity. "Kaleseramik", "Yönetim Kurulu" are resolved only against entity_registry (armes: factory/line/equipment). Not found -> entity ask. The coverage graph in the design scopes ENTITY resolution only, never "which backend knows this subject" (design docs: silent).
2. TOOL SELECTION (stage 07). The offered set = hand-written category rows (description + keyword list) + ALWAYS_INCLUDE {getFactoryList, getFactoryLines} (two armes tool names in code). MKB is reachable only if its row's words match. There is no guarantee that a connected backend is reachable (design docs: silent; the floor protects only armes).
3. SCOPE (prompt). The in/out-of-scope boundary is a fixed text naming one company and one domain. It is not derived from what the connected backends can answer. With the MKB tool in hand the model still refuses (turn b50f...).

## 6 · The root cause, one sentence
CWF's understanding layer, tool selection and scope are built on ONE backend's world (the MES factory graph plus hand-written rows), not on a capability map derived from ALL connected backends; so a connected backend whose subject is not "factory entities" (company documents) is unreachable by design, and the August successes were the permissive router/model letting it through by chance, which the frame-first switch of 2026-08-18 took away.

## 7 · What the owner's design says (16 docs in yapra-mimari-documents, read in full)
- The generic onboarding path exists only as Path B / IR-4 (cwf-ir-pathb-hybrid-logic-v1_3): on connect, listTools -> mirror -> canonical enrichment -> encoding -> retrieval; "MCP connect + tek Sync = saatler". Marked FUTURE-STATE. Live: vector.toolRetrievalMode = 0 (published 2026-08-20).
- Live Yol A: "Yeni tool eklemek = tabloya satır eklemek" (a human writes rows) — "backend başına günler".
- Generic law in the docs: backend identity is a row; everything amber is a row, not code; no product-conditional branching at runtime (A-9).
- The docs are SILENT on (a) a per-backend reachability guarantee, (b) a domain scope derived from backends, (c) any graph of backend capabilities.
So the ball was dropped in the design itself: the generic path was deferred, and the live path has no mechanism that makes a newly connected backend known to the understanding layer.

## 8 · Why the earlier proposed fix is withdrawn
The S148 plan (b1_scope v4 text + an alwaysOffer flag) touches gates 2 and 3 only. Gate 1 (entity ask) is untouched, and the scope text would again be a hand-written sentence naming today's backends. It is a patch. Withdrawn.

## 9 · Direction of the generic fix (for owner review; not yet a card)
One mechanism, three consumers — a BACKEND CAPABILITY MAP, derived, never hand-written:
- DERIVE at sync, for every connected backend: its tools (already mirrored), its content inventory where the backend exposes one (e.g. its own listing tool), and a short capability summary; stored as rows in the graph KB (backend -covers-> subject/corpus). Re-derived on every sync.
- UNDERSTANDING consumes it: a mention is resolved against every backend's vocabulary, not only the factory registry; an unmatched mention that a document corpus covers is not a missing factory entity, so no entity ask.
- TOOL SELECTION consumes it: candidate backends = those whose map covers the frame; every active backend keeps a derived entry-point tool in the floor (replacing the two armes names in ALWAYS_INCLUDE).
- SCOPE consumes it: in scope <=> some connected backend covers it; out-of-scope becomes the deterministic "no tool found in the connected systems" answer (ALT-C in the design), not a model judgment over a fixed sentence.
This is the Path B intent made live for the three gates. Measure first: (M1) which code path emits the entity ask for a company mention at master; (M2) what MKB's listing tool returns (the inventory is real or not); (M3) replay of the August successful questions against master with frameRouting 0 and 1.

## 10 · Open, UNMEASURED
- Model/provider of the August successful turns (not stored in messages).
- Whether frameRouting alone reproduces the entity ask (M3 decides).
END · CWF-S148-RCA-MKB-UNREACHABLE-v1
