# CWF-S166-FINDINGS-v1
Architect, S166, 2026-09-30T20:12Z. Each finding: plain words · evidence · fix · when.

F-S166-SEAL-IS-THE-SERIALIZER-1 — Every code PR rewrites the same lines of public/architecture/manifest.json (per-tab lastSyncedCommit + mappedContentSha over broad codeAreas), so the merge guard's COLLISION rule (mergeGuard.mjs runGuard ~L494–525) makes every open code PR yield to every lower one, and after a landing the rest have a textual conflict. Evidence: PR 652 `[merge-guard] FAIL COLLISION — YIELDED-TO #650/#651 … manifest.json` (owner screenshot 22:05 TSİ); scout-1 SCOUT-STATUS-LAND-SD2-VECTORLANE-S166-1 §3. Fix: CARD-SEAL-NO-SHARED-LINES-S166-1-v2 (PR 654) — per-PR DIAGRAM-ATTEST, manifest per-PR fields removed, RULE-20 amended (OWNER-RULING-S166-RULE20-ATTEST-1). When: PR 654 landing tonight; SD1 is the first PR carried under the new rule.

F-S166-STRICT-WAS-SECONDARY-1 — The ruleset's strict "up to date" policy was ON; the owner turned it OFF. Measured: it was not the binding serializer (the seal was), but with it off, a non-manifest PR (653) went green beside 652 with no re-sync. Fix: done (owner). When: done.

F-S166-PERMISSION-PROMPT-STALL-1 — A lane window that meets a command outside .claude/settings.json allow waits silently for a human click; the bus, the pooler and GitHub cannot see it. Evidence: AG-3 wt-m2 index 18:23:20→18:49:36Z no writes (M3 carry); AG-3 wt-seal 19:22:04→19:49:56Z no writes, resumed right after the owner granted a permission. Fix: (1) Architect lints every card's commands against the allow-list before sending (from S166); (2) 5-minute watchdog on worktree mtimes → owner ⚡ the same tick; (3) the harness REFUSES a lane editing .claude/settings.json (Self-Modification, AG-1 slip) — so allow-list growth is an owner act; the S167 open collects the prompts actually met and hands the owner ONE list. When: (1)(2) live now; (3) S167.

F-S166-ARM-TOKEN-READONLY-1 — ADF_MERGE_TOKEN was created with Pull requests: Read-only; the arm job failed `GraphQL: Resource not accessible by personal access token (repository.pullRequest)` on PR 653 (both attempts at 19:35Z and 19:43Z). Fix: owner set Read and write 22:49 TSİ; PR 654 then armed with enabled_by=maymun207 (MEASURED). When: CLOSED@PR 654 arm.

F-S166-AG1-OUT-OF-LOOP-1 — AG-1 stopped reading its box after its 19:43:51Z slip (NOTICE-REARM-653-S166-1 unconsumed from 19:50:37Z). Cause UNMEASURED (not a network loss: other lanes consumed normally). Fix: one boot line when AG-1 next gets work; the new mail-wait retry (PR 653) removes the network-loss cause only. When: S167 open.

F-S166-OWNER-MISREADS-TAB-1 — Twice the owner pasted scout-2's screen as "AG-1". Fix: NOTICE-SAY-YOUR-NAME-S166-1 (standing: `[<address>]` first line of every lane message). When: live; AG-3/AG-4 consumed within 60 s.

F-S166-DNS-NOT-TRANSIENT-1 — scout-2's A1 classified DNS as non-transient; an offline Mac without a proxy prints DNS, so the retry would still exit (AG-1's finding). Fix: D1 — DNS transient only after a good read. When: landed in PR 653.
END · CWF-S166-FINDINGS-v1
