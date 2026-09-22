# CWF-S155-FINDINGS-v1

Every finding carries HOW it is fixed and WHEN (owner rule 2026-09-10).

F-S155-OPEN-LIST-TOOK-DELTA-REGISTER-ONLY-1 — the session opened its side-panel task list from register v143, which lists only the rows that CHANGED in S154; the whole list lives in v142. Fifty-plus open items were missing from the panel until the owner said so (owner contribution, S112-YASA-1). HOW: register v145/v146 are written as the WHOLE list, and bootstrap v157 makes the panel = register §2 entire. WHEN: done in this close set.

F-S155-BRIDGE-CP-BUNDLE-RAN-RELAYAUDIT-1 — the Architect's esbuild bundle of scripts/cardPreflight.ts printed only relay-audit grammar output and exited 0: bundling put two CLI main-guards in one file and relayAudit's ran. Two cards passed that "gate" and the scouts then found real CP-2 and CP-3 refusals. HOW (applied): the bridge runs `ESBUILD_BINARY_PATH=$HOME/esb/package/bin/esbuild node --import tsx scripts/cardPreflight.ts --check <file>` from a git-archive tree; a planted fault proved it looks. WHEN: done, from 15:35Z.

F-S155-CP-SYMLINK-SILENT-GREEN-1 — running the same bundle through a symlink made the main-guard false, so it printed nothing and exited 0. HOW: never invoke the gate through a symlink; the recipe names the real path. WHEN: done.

F-S150-CARD-MEASURED-AT-AHEAD-OF-CLOCK-1 RECURRED, five times in S155: MEASURED-AT and bus-clock lines were written 1-17 minutes ahead of the real clock, twice reaching the bus. HOW (mechanical): every card body is written in the same shell command that runs `date -u`, and the time is taken from that output. WHEN: from 15:39Z; carried as item 80.

F-S155-SCOUT-STATUS-POST-CLASSIFIER-DENIED-1 — the scout's POST of adversary/scout was denied twice by the Claude Code auto-mode classifier (first "Self-Approval", then "CI Bypass") with no owner prompt, so PR 594 sat green and unlanded for 44 minutes. It succeeded only after the owner took that window out of auto mode and approved the prompt. HOW: item 17's card adds a named permission rule for that one call in the scout boot, so the landing path does not depend on the window's mode. WHEN: 2026-09-23.

F-S155-MASTER-PUSH-HAS-NO-CI-RUN-1 — actions/runs at the merge sha of PR 593 returned total_count 0 on two reads. The landing evidence therefore rests on the PR head's runs plus Vercel READY, never on a master run. HOW: name it in every land order (already done for 594 and 595); if a master-push run is wanted, it is a workflow card. WHEN: S156 decides.

OWNER CONTRIBUTIONS, BY NAME (S112-YASA-1)
- 18:23 TSI: "biz merge conflict yasiyoruz dogru mu?" — forced the measurement that there was none (0 open PRs at that moment) and that the local clone was merely 51 behind.
- 18:26 TSI: caught that the side panel held 8 of the open items (F-S155-OPEN-LIST-TOOK-DELTA-REGISTER-ONLY-1).
- 18:33 TSI: ordered the GATE-1 agenda (project instructions section 9, S133) into the numbered list — items 68-73, never numbered in any register before.
- 19:22-20:17 TSI: took the scout windows out of auto mode and approved the status POST, which is what landed PR 594 and PR 595.

END · CWF-S155-FINDINGS-v1
