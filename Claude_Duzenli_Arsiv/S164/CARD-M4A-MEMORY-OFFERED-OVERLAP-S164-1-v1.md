<!-- relay-audit: v1 kind=card -->
CARD-M4A-MEMORY-OFFERED-OVERLAP-S164-1-v1

LANE: AG-4 (after scout-2's review of THIS card; not inserted before GREEN)
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-30T04:45Z
SUBJECT: A26 v1_2 §9 row M4, first half (M4a): make "memory offered" DURABLE with ids, and add an honest, zero-LLM OVERLAP measure (never called "used"), with a daily series and a panel. Built from scout-2's map SCOUT-STATUS-MAP-M4-S164-1 (bus b2b48d68-fc6c-44c3-a3a4-dda824178dd4; full text doc repo S164/SCOUT-STATUS-MAP-M4-S164-1.md, sha256 2a4a40ba347372c0e507aea02dc366e51561ce60322ca843a35301dbf63cb29e), whose §1, §2, §5, §6 are this card's premises by reference. M4b (shadow helped + gold/abstention scorer) is a separate, spend-gated card that waits on the owner ratifying the MEMORY-1 bar (A26 K7).
ADVERSARY: NEW subject → scout-2 reviews this card first (§12.1).
AUTHORITY: OWNER-RULING-S164-A26-V12-1 · OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1 · §13.1 (no backend literal; thresholds are governed health.* params) · empty ≠ zero (§2).
NO CRON TASK. GRAFT: graft first, and git grep for instance calls (graft's callers view missed them in M2). SECURITY: never print, echo, printenv or cat any environment variable.

## DESIGN
D1 · OFFERED WITH IDS (map §1): at the one stamp site memoryRetrieve.ts:620, `ctx.memoryOffered` gains `ids: string[]` (episode ids in offered order) and `blocks: {episodic: boolean, routine: boolean, dossier: boolean}`; type at turn/types.ts:720. Null = unavailable (retrieval did not run / failed, the ATTR_MEMORY_UNAVAILABLE posture); `count: 0` with `ids: []` = a real zero.
D2 · DURABLE (map §1): the telemetry `turn_done` payload (stageStream.ts:853-861) gains `memoryOffered` {count, ids, blocks, unavailable} and `memoryOverlap` (D3). chatQuotaStream.test.ts:358's strict key pin is UPDATED by name. turn_trace_digest is NOT a source (display-only by law) and is not touched.
D3 · OVERLAP, NOT "USED" (map §2): a pure module beside memoryRetrieve computes, per offered row, `overlap(row)` = the turn acted on something the row carried: (a) an entity id of the row is in ctx.entityResolutions canonical ids or in a called tool's args by id; (b) a tool name of the row was called this turn; (c) routine: the plan was seeded from ctx.offeredRoutine AND its first step's tool was called. Output `{rowsWithOverlap, byKind: {entity, tool, routine}}`; unknown when the evidence is unavailable (never 0 by default). The word "used" appears nowhere in code, UI or docs; the UI label says "overlap (not causation)".
D4 · DAILY SERIES + PANEL (map §5): api/admin/health-analytics.ts gains a daily series from turn_done: turns with memory offered, mean offered count, turns with overlap, overlap rate — with "no data" (not 0) for days without memory telemetry. Rendered in MemoryTab's health block (≈:179-190) beside the existing memory band slot (memoryTick). Any warn threshold is a governed health.* param resolved like the existing ones (e.g. :496), never a literal; if no threshold is needed, none is added.
D5 · The live chip (ChatShell.tsx:539-556, chatSurface.ts:110) is NOT changed except to keep its type compiling; no prompt text, no recall filter, no learn door is touched.

## ORDERS
1. `git ls-remote origin refs/heads/master` TWICE; clean worktree; `git switch -c phase/m4a-memory-offered-overlap-s164-1 <that master>`.
2. Measure first (graft + git grep) and quote: memoryRetrieve.ts :596-671, types.ts :720, stageStream.ts :853-861 and :1140, chatQuotaStream.test.ts :358, health-analytics.ts memory lines (:195, :496, :588), MemoryTab.tsx :179-190; where ctx.entityResolutions and persistRaw args/tool names live at flush.
3. Build D1–D5. Tests (named): M4A-1 offered ids/blocks stamped in order; M4A-2 unavailable → null, real zero → 0/[]; M4A-3 turn_done carries memoryOffered + memoryOverlap (updated pin); M4A-4 overlap truth table (entity / tool / routine / none / unavailable); M4A-5 analytics series with a no-data day; M4A-6 MemoryTab renders the series and the "overlap (not causation)" label; planted fault: stamp overlap as 0 when unavailable → M4A-4 red; revert.
4. GATES: `npm run build` (reseal if drift) · typecheck:api · check:rule24 · check:migration-versions · check:tenant-zero · check:backend-names · relayAudit over docs/relay/ · touched suites + e2e locators for changed strings (practice 116). Report docs/relay/M4A-MEMORY-OFFERED-OVERLAP-S164-1-AG4-report.md with exactly ONE FILE-FENCE block; no bare 7–39 hex in prose.
5. ONE commit; push; ls-remote. No PR until the Architect's notice gives the slot. Slip SLIP-CARD-M4A-MEMORY-OFFERED-OVERLAP-S164-1 (bus + fallback S164/).
6. Back to `node scripts/mail-wait.mjs AG-4 --budget-min 480`.

FILE-FENCE (proposed; the scout confirms): memoryRetrieve.ts · turn/types.ts · stageStream.ts · the new overlap module · health-analytics.ts · src/lib/adminService.ts · src/components/admin/MemoryTab.tsx · cwfService.ts / cwfStore.ts only if the client type changes · tests (chatQuotaStream.test.ts pin + new suites + memoryTab.test.tsx) · e2e files matching changed strings · report · gate-regenerated files.
FORBIDDEN: prompt text; recall filters; learn doors; turn_trace_digest as a source; the word "used" for overlap; a default 0 for unavailable; a threshold literal; a backend literal; a migration (none is needed — if you find one is, STOP and slip); --force; cron; printing an environment value.

END · CARD-M4A-MEMORY-OFFERED-OVERLAP-S164-1-v1
