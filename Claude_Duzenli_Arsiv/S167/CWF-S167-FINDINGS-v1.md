# CWF-S167-FINDINGS-v1
Every finding by name, with its register row. Cut with CWF-S167-SESSION-CLOSE-v1 (2026-09-30T21:30Z).

- F-S167-DOCREPO-OUTSIDE-LANE-DIRS-1 — `Bash(git -C:*)` was allowed, yet the doc push was refused: .claude/settings.local.json additionalDirectories listed only S160/S161/S163/S164 subfolders, not the doc repo root. Fixed 20:27Z (root added, backup taken, later removed); proven by two pushes (180a).
- F-S167-CLEAR-LEAVES-OLD-WAITER-1 (AG-4, corroborated by scout-2) — /clear rotates CLAUDE_CODE_SESSION_ID but the claude process survives, so the pre-/clear background mail-wait keeps running and sees the same cards (183a → 186).
- F-S167-BACKGROUND-WAIT-NO-WAKE-1 — scout-2's pre-/clear background waiter did not wake its idle window for a 20:29Z order; seen only from the owner's screenshot 25 min later. In the rebooted session the waiter read the order on its first poll (MERGED-INTO 186 and 185).
- F-S167-SCOUT-INVISIBLE-UNTIL-DONE-1 — mail-wait.mjs:441-447 / 1029-1044: a non-claimable address never stamps consumed_at and is acknowledged only by its final reply; owner: "her scout ve ag okumaya basladiginda karti ben okudum diyemez mi?" (185).
- F-S167-SD1-BARE-NEDEN-EXEMPT-1 (AG-4, from a push security review) — SD1 seeded bare 'Neden'/'Why' as exempt phrases, so real counts ("3 neden bulundu") bypassed the numeric guard; the armed PR 655 was held (scout-1 notice), the bare rows dropped, five pins added; landed at aedb22f4 → 1f694e1f (166).
- F-S167-CI-OVERHEAD-JSDOM-1 (AG-3) — 77% of test CPU is per-file overhead; 615 api/shared test files run under jsdom with zero DOM use; under node 103.9 s → 48.3 s with identical failed sets (184).
- F-S167-TEST-WRITES-DOCS-GROUND-1 (AG-3) — a test writes docs/ground/authority-conformance.latest.md during `vitest run` (190).
- F-S167-PROMPTS-FROM-SHAPE-1 — `node -e`, `node *`, `git *`, `npx *` are allowed, yet lanes are prompted; the cause is command shape (env reads, `||`, off-list hosts) (189).
- F-S167-INBUCKET-REPORT-HEADERLESS-1 — PR 657's report lacked the relay-audit v1 header; relayAuditGate.test.ts:335 held a correct config change red (188).
- F-S167-DEAD-WORKTREE-RECORDS-1 — 13 dead worktree records (folders gone) showed as unmerged branches in the owner's Source Control; the 8 branches were measured: 4 ancestors of master, 4 SUPERSEDED-BY carried PRs (#640, #645, #634, #635); pruned with owner-granted delete 20:55Z; nothing lost.
- F-S167-SHARED-CLONE-STAGED-SETTINGS-1 — an uncommitted staged .claude/settings.json change of unknown author sits in the shared clone (191).
- F-S167-GRAFT-OLD-1 — graft 0.18.0 installed, 0.21.1 available (192).
- F-S167-VITEST-NEW-URL-TRAP-1 (scout-2) — `new URL('<literal>', import.meta.url)` is rewritten by vite to an asset URL and collects 0 tests; the fileURLToPath form is safe (187).
- A-REC-S167-1 — the Architect told the owner scout-1 had "not consumed" the landing order while scouts never stamp consumed_at; the lens was blind by design (185).
- A-REC-S167-2 — CARD-SESSION-TOKEN v1's W3 would have killed a LIVE second window's waiter and silently resolved the very duplicate it exists to show; scout-2 caught it (ancestor-pid discriminator).
- OWNER contributions (S112-YASA-1, by name): "light run yapmamış mıydık / 18 dk çok uzun" → CI-SPEED (184); "kartı okudum diyemez mi" → SCOUT-ACK (185); "izin istemesi bizi yavaşlatıyor" → PROMPT-HYGIENE (189); "4 tane unmerged duruyor" → dead worktree records (F-S167-DEAD-WORKTREE-RECORDS-1); "AG'leri clear + graft'ı kullandıklarından emin ol" → BOOT-LANES-S167-1 + PING-GRAFT.
- OWNER-APPROVAL-S167-PLAN-1 ("onay", 23:26 TSİ) · OWNER-ORDER-S167-CLEAR-REBOOT-GRAFT-1 (23:34) · OWNER-APPROVAL-S167-CI-SPEED-1 (00:02) · OWNER-APPROVAL-S167-SCOUT-ACK-1 (00:05) · OWNER-ACT-S167-DELETE-GRANT-1 (worktree prune, 23:53).
END · CWF-S167-FINDINGS-v1
