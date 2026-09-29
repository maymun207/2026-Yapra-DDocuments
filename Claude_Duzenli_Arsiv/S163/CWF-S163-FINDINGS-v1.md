# CWF-S163-FINDINGS-v1

Cut at S163 close, 2026-09-29. Each finding names its register row (v156).

## Architect (A-REC)
- F-S159-SOTA1-NOT-FIRST-CALL-1: 5th recurrence. The fix is written into v5_11 §0 (order: message first, then read); S164 is its first test.
- A-REC-S163-1 — scout wait budget (12 min) shorter than Build and Test (≈18 min). Every scout order now carries ≥ 12 × 2 min.
- A-REC-S163-2 — recommended a governed keyword edit without reading stage 07 (practice 100 broken). → K32/K41.
- A-REC-S163-3 — CARD-OPEN-PR-K32 said "no fresh branch needed (no file overlap)". The ruleset requires the branch to be up to date, so PR 637 sat BEHIND. → 145.
- A-REC-S163-4 — ordered `gh pr update-branch --rebase` without reading the guard's FORCE-PUSH rule. The head_ref_force_pushed event is permanent and PR 637 was lost (carried to 638). → 145.
- A-REC-S163-5 — PR 636 landed 04:29Z; the next PR was not opened until 06:11Z because dispatch waited for an owner turn (§12.8 breach). → 150 (named waits in-turn while anything is landable).
- A-REC-S163-6 — a bridge `git status` in the owner's shared clone left .git/index.lock (bridge cannot unlink); moved into .git/architect-stale-locks/. → 151.
- A-REC-S163-7 — gh.sh (cwf-architect-ro) was available and unused all session. Anchors were read from remote-tracking refs that the lanes refresh irregularly. → 150.

## Factory / gates
- F-S163-AG007-HEADING-LITERAL-1 — the adversary gate refuses a notice carrying "## ORDERS", but notices with "## ORDER" passed (NOTICE-PR632-BASELINE-RULING-S163-1, ORDER-SCOUT-LAND-PR635). The shape gate can be evaded by one letter. Not routed around: both refused rulings were re-cut as sealed cards. → 146.
- F-S163-MERGE-GUARD-FORCE-PUSH-PERMANENT-1 + F-S163-RULESET-REQUIRES-UP-TO-DATE-1 — an open PR can be neither updated (FORCE-PUSH) nor merged when behind (ruleset). → 145 (PR-opening protocol).
- F-S163-MIGRATIONS-UNAPPLIED-AFTER-LANDING-1 — PR 635's migration was unapplied from 03:09Z to 06:14Z, so production code ran without its columns. → 148.
- F-S163-SHARED-CLONE-STUCK-ON-LOCAL-SETTINGS-1 — shared clone 31 commits behind because a local .claude/settings.json edit blocks --ff-only. Lane sandboxes deny writing that file by name, and the bridge cannot unlink. Fixed once with the owner's approval prompt (AG-3). → 147.
- F-S163-SCOUT-BOOT-SINCE-REFUSED-1 (scout-2) — free.md orders `--since` on the first read; mail-wait now refuses `--since` when a watermark exists (exit 2). → 149.
- F-S163-SCOUT-STALE-MAIL-WAIT-ON-DISK-1 — scouts run mail-wait from the shared clone's disk; a stale clone runs a stale reader. → 147.

## Product — memory (scout-2 SCOUT-STATUS-MEMORY-MAP-S163-1, sha256 ae5da064a32634c8893e855be0aa93993d1d0dae52d2b89cc01b83ad8182cd56; Architect DB reads)
- F-S163-MCP-ISERROR-DROPPED-1 (F2) — mcpClient.ts:333-342 discards result.isError. Tool errors become successes in the ledger, telemetry and tool_experience. → 140 M1.
- F-S163-EMPTY-COUNTS-POSITIVE-1 (F1) — `[]` is classified `answered` (toolResultClass.ts:169-192), so tool_experience +1. → 140 M2.
- F-S163-FAILED-TURN-OFFERABLE-1 (F3) — 3 failures plus an apology grade as `unproven` (memoryDistill.ts:166-172) and are offered to later turns (EpisodesRepository.ts:378). Production classes: unproven 337 · clean 242 · failed 62 · null 145. → 140 M2.
- F-S163-MEMORY-NEVER-REACHES-ROUTING-1 — stage 07 runs before memory retrieval (pipeline.ts:22 vs :24). The only learned routing store (tool_category_cache) writes with no outcome test and is braked (router.learnEnabled=0 published). → 140 A26.
- F-S163-FEEDBACK-UNUSED-1 — turn_feedback has 10 rows ever, 0 reviewed, no reader in learning. → 140 M3.
- F-S163-NO-MEMORY-INSTRUMENT-1 — no measure of offered → used → helped; SOTA MEMORY-1 unmeasured. → 140 M4.
- F-S163-SEMANTIC-MEMORY-STALLED-1 — no write since 2026-09-25 09:14Z. Candidate cause: keys come only from the frame; UNMEASURED. → A26.
- F-S134/S147 GraphKbReader CALLER-ABSENT re-confirmed at ee12161e (no caller, not even a test). → A26.
- router_proposals — the existing review-queue shape A25 asks for; fed, never used. → A26.

## Owner (S112-YASA-1, by name)
- OWNER-APPROVAL-S163-PLAN-1 · OWNER-APPROVAL-S163-K41-1 ("onay k41") · OWNER-APPROVAL-S163-MEMORY-MAP-1 ("onay hafıza-haritası").
- OWNER-APPROVAL-S163-MEMORY-PLAN-1 ("plani onayliyorum, Track 1 ve Track 2 yani A26 Memory & Learning Architecture", 15:15 TSİ).
- OWNER-DESIGN-S163-MEMORY-FEEDBACK-1 ("should successful turns feed back into the matrix / memory / graph?").
- OWNER-DESIGN-S163-MEMORY-A26-1 ("memory needs the same from-scratch design the understanding layer got"). The Architect's blind spot that made it necessary: 25 architecture documents designed learning without measuring whether the success signal feeding it is true.
- Owner ruling: project instructions rewritten clean as v5_11.

END · CWF-S163-FINDINGS-v1
