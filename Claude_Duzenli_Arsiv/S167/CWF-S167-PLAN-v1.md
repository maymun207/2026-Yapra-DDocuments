# CWF-S167-PLAN-v1
Architect, S167 open, 2026-09-30T20:30Z (23:30 TSİ). Awaiting ONE owner approval (§13.8).

## Open measurement (all MEASURED this turn)
- master a3ce7b0c1b1ba39d559d034e2c18fb938799a76c (gh.sh git/ref) = Vercel production READY (dpl_DvU2WD4v…, PR 653). Anchor of bootstrap v173 CONFIRMED.
- PR 654 (seal, AG-3) open at d4e441ec3cf9e6238c765cdd08d3814dc0e47439, auto_merge armed by maymun207. Runs at that head (total_count 4): Auto-merge landing success, report-schema success, Relay corpus success, Build and Test IN PROGRESS (since 20:07Z).
- Bus since 20:05Z: ORDER-SCOUT-LAND-SEAL-S166-1 to scout-1 UNCONSUMED (scout-1 posted its SD2/vectorLane final at 20:17Z). AG-4 consumed NOTICE-SD1-RECARRY-AFTER-SEAL at 20:10Z. AG-3 SLIP-NOTICE-PUSH-DOC-REPO-S166-2 = REFUSED.
- Mounts: DDocuments, cwf-architect-ro, cwf_yaprak — all three present (the last two after the owner connected them at 23:23 TSİ).
- Doc repo: 7 commits ahead of origin/main (not on GitHub).

## Finding F-S167-DOCREPO-OUTSIDE-LANE-DIRS-1 (why the doc push was refused)
`git -C <doc repo> push` is allowed by `Bash(git -C:*)` in .claude/settings.json, yet the auto-mode classifier refused it. Measured: .claude/settings.local.json (gitignored, defaultMode auto) lists additionalDirectories = only Claude_Duzenli_Arsiv/S160, S161, S163, S164 (plus a stale "2026 - My Active Codes" migrations path). The doc repo ROOT is not an allowed directory, and S165/S166/S167 are not either. Plain words: the lanes are allowed to write into four old session folders of the doc repo but not to act on the repo itself, so every push and every new session folder hits a wall.
Fix: add the doc repo root to additionalDirectories (one line, covers every future S<n>). Who: the Architect via the bridge (read-modify-write, backup first) on owner onay — a lane cannot self-edit (harness Self-Modification guard). When: this turn after onay. Proof: AG-3 retries the push → `git ls-remote` 40-hex = local HEAD.

## Plan (one approval covers all steps)
1. 179: scout-1 lands PR 654 when Build and Test is green (order already on bus). If scout-1 has not consumed within 5 min of green → owner ⚡ with its boot line.
2. 166: AG-4 re-carries SD1 onto the new master → PR → scout-2 lands.
3. 180: settings.local.json gains the doc repo root → NOTICE to AG-3 to retry the push → ls-remote proof.
4. 183: session-token card → scout-2 pre-review (new subject) → AG-1 builds.
5. Idle lanes, in order: 175 test-root (AG-1 if 183 waits on review) · 174 inbucket rename (AG-3) · 169 auto-merge measure (scout-2) · 167 K41 measure (scout) · 168 → scout first · 171 · 160 M4b ⚡.
6. Self-timer ≤ 3 min between bus/GitHub reads; each tick prints both reads.
7. Close set at turn 18–20.
END · CWF-S167-PLAN-v1
