<!-- relay-audit: v1 kind=notice -->
NOTICE-M4A-N1-N2-S165-1

LANE: AG-4 (the AG-4 window ONLY; any other window prints "NOT MINE: AG-4 notice" and stops)
fanout: personalized (one lane, one body)
FROM: Architect, S165, 2026-09-30T06:40Z
PRECONDITION: branch phase/m4a-memory-offered-overlap-s164-2 exists on origin at head b6e347be1aba2f300bee3748dd3ac836aef82fd1 (read it with git ls-remote; if the head differs, STOP and report both shas).
WHY: scout-2 pre-reviewed your M4a branch (SCOUT-STATUS-PREREVIEW-M4A-S164-1, full text doc repo S164/SCOUT-STATUS-PREREVIEW-M4A-S164-1.md). Verdict RED on ONE blocking delta (N1) plus one advisory (N2) that the Architect RULES IN, because your own card's D3 already requires it. Everything else is GREEN, including the planted fault. This notice turns the branch green BEFORE its PR slot, so the slot costs zero rework.
AUTHORITY: OWNER-APPROVAL-S165-PLAN-1 ("plani onayliyorum", 2026-09-30 09:35 TSİ) — M4a with verifyGrants is plan item 3 · CARD-M4A-MEMORY-OFFERED-OVERLAP-S164-1-v2 D3 · §12.8.
ORDERING: do this after the card you are on now (PR 646 wait or CARD-SD2-BRAKE-NOTICE-GROUPED-COUNT-S164-1-v2). It is PREP: NO PR.
NO CRON TASK. GRAFT: graft first (graft/ node cards, graft/.graph/wiring.json), then git grep for instance calls. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER
1. `git ls-remote origin refs/heads/phase/m4a-memory-offered-overlap-s164-2` TWICE; print both. Clean worktree on that branch at that head.
2. N1 (BLOCKING) in scripts/verifyGrants.ts: add `'health_memory_daily',` to SERVICE_ROLE_ONLY_FUNCTIONS beside the four sibling health functions (scout read them at :211-214) and `health_memory_daily: { p_from: NO_WINDOW, p_to: NO_WINDOW },` to FN_EXECUTE_PROBES beside its siblings (:316-319). Measure the line numbers yourself first and quote them; the scout's numbers are a premise, not a fact. Then run verifyGrantsFnProbes.test.ts and migrationFnLockdown.test.ts and quote their summary lines.
3. N2 (RULED IN — per-lens overlap status). Today computeMemoryOverlap returns `{status:'unknown', reason:'entity-resolutions-absent'}` for the WHOLE turn when ctx.entityResolutions is undefined, so the tool lens and the routine lens (which need no entity stamp) are lost on every such turn. Card D3 says overlap is per row with byKind {entity, tool, routine} and unknown only where "the evidence is unavailable". Make the status PER LENS: entity → unknown with reason entity-resolutions-absent; tool and routine → measured as usual. Unavailable memory (offered === null) stays unknown for all lenses, never 0. Keep the word "used" absent. The panel and the daily SQL series must read the per-lens shape; if the overlap rate's numerator changes meaning, the panel label says which lenses it counts.
   Tests: extend M4A-4's truth table with the case "entityResolutions undefined, tool called" → entity unknown, tool measured true. PLANT: collapse back to whole-turn unknown → that case goes red; revert; quote both.
4. Record N3 in the report as advisory only (band=memory sits behind TELEMETRY_READ_ALL while MemoryTab is MEMORY_MANAGE; both super_admin today). No code change for N3.
5. GATES (all of them, local): `npm run build` (reseal if drift) · typecheck:api · check:rule24 · check:migration-versions · check:tenant-zero · check:backend-names · relayAudit over docs/relay/ · the touched suites (memoryOverlap, healthAnalytics, chatQuotaStream, memorySliceWiring, stageClarify, memoryTab, healthAnalyticsContract, migrationFnLockdown, verifyGrantsFnProbes). CI-ONLY gates that will judge the PR later and cannot be run here: Build and Test, Relay corpus, report-schema, rule26; eval-canary is expected SKIPPED and is named as SKIPPED, never folded into green.
6. Update the report docs/relay/M4A-MEMORY-OFFERED-OVERLAP-S164-1-AG4-report.md: add N1/N2/N3 sections. The report keeps exactly ONE line that starts `FILE-FENCE:` followed by `- <path>` lines; add scripts/verifyGrants.ts and any new file to it. No bare 7–39 hex in prose: full 40-hex shas only, inside evidence fences.
7. ONE new commit on the branch (git commit -F <file>); push (plain push, no --force); ls-remote and print the new head.
8. Slip SLIP-NOTICE-M4A-N1-N2-S165-1 to the bus (first line: `branch=phase/m4a-memory-offered-overlap-s164-2 head=<40-hex>`), same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S165/SLIP-NOTICE-M4A-N1-N2-S165-1.md". Back to `node scripts/mail-wait.mjs AG-4 --budget-min 480`.

FORBIDDEN: opening a PR; merging master into the branch (the reseal happens at the PR slot); any migration other than health_memory_daily; applying any migration (Operator only); a threshold; a backend literal; the word "used"; a default 0 for unavailable; --force; cron; printing an environment value.

END · NOTICE-M4A-N1-N2-S165-1
