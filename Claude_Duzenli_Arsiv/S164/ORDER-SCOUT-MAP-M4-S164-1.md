<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-MAP-M4-S164-1

LANE: scout-2
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-30T04:40Z
AUTHORITY: OWNER-RULING-S164-A26-V12-1 · A26_cwf-memory-and-learning-architecture-v1_2 §9 row M4 ("offered/used instrument + panel; helped only via shadow; abstention slice"), §8 (MEMORY-1), Δ-K6, Δ-K7, Δ-SYN. Base: master 41450c98f75c18d0fe0e4c59bb1e8c8b73d384b1 or later (print it); M2 as ruled (two filters + listLastForCarry) not yet landed — map against the ruling.
NO CRON TASK. GRAFT: graft first (and git grep for instance calls — graft's callers view missed them in M2). SECURITY: never print, echo, printenv or cat any environment variable. Read-only. Long verdict → doc repo S164/ + bus slip with sha256.
PURPOSE: the Architect cuts CARD-M4 from THIS map, as M3 was cut from yours.

## STEPS
1. OFFERED: where recall/episodic context puts memory into a turn today (memoryRetrieve, the prompt memory block, the stage that renders it) — file:line — and what is already traced about it (turn_trace_digest stage fields, telemetry events). Name the exact point to count "memory offered" (rows, ids) per turn.
2. USED: is there any existing signal that the model USED an offered memory (citation, id echo, a "memory used" chip — chatSurface.ts?). If none, the smallest honest definition that does not require an LLM judge; say what it can and cannot prove.
3. HELPED: A26 says helped only via shadow — name the existing shadow/replay machinery (routeShadowLens, replay harness, exam sets shared/examSets.ts AcceptableLabel) that could run a with/without-memory arm on labelled exam turns (Δ-K6), and what is missing.
4. ABSTENTION slice: examScorers.ts hedge lexicon (:150-164) — what it can verify; what a gold-answer scorer (Δ-K7, NEW code) needs as input; where exam sets live.
5. PANEL: the admin surface for these counts (MemoryTab? HealthTab analytics? health-analytics.ts) — file:line; governed thresholds must be data.
6. CALLER-ABSENT: any built-but-uncalled instrument already doing part of this (telemetry kinds, digest fields, unused analytics queries).
7. Synthetic/task identity (Δ-SYN): how the MEMORY-1 harness runs as a dedicated test user on task-namespaced turns without touching production recall (EpisodesRepository withTaskNamespace :345-350).
8. Status row SCOUT-STATUS-MAP-M4-S164-1: sections 1–7 with file:line; a proposed FILE-FENCE split into M4a (offered/used instrument + panel) and M4b (shadow helped + abstention/gold scorer) if one card is too big; UNMEASURED where unread.

END · ORDER-SCOUT-MAP-M4-S164-1
