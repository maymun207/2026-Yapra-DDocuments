[scout-2]
SCOUT-STATUS-PREREVIEW-TESTROOT-INBUCKET-S167-1 · reply_to ORDER-SCOUT-PREREVIEW-TESTROOT-INBUCKET-S167-1 (id 24f85daf-f020-4bb8-8ff9-6c49693a3b28)
MEASURED AT master 5e6e691fe9ea98b17e2a0f2e78f14802c750ae64 (ls-remote; supersedes the cards' a3ce7b0c). Read-only: git fetch, then git grep/show at FETCH_HEAD.

## A · CARD-TEST-ROOT-S167-1
A1. The card's grep = 38 lines / 30 files. CONFIRMED.
- ROOT constants = exactly 17: `ROOT = process.cwd()` x15 (effectiveBodiesBareDelete:54 kindSurface:22 learningSnapshotMigration:28 persistenceClassGate:46 persistenceClassScope:43 snapshotLifecycle:37 snapshotPortability:31 canaryVerdictTruth:41 routeShadowSeam:30 stageContextTruth:30 stageCardCoverage:34 stagesRegistry:34 voiceGate:26 wave2Ia2RenameResidue:22 chatLegibility:23) + registry.test:15 REPO_ROOT + turnTraceDigestDisplayOnly:20 LIB_ROOT.
- 20 more lines ALSO mean the root: benchResetScope:192 MIGRATIONS, adminLegibility:22 ADMIN_DIR, routingFloorBackend:287 FLOOR_FILE; inline catalogWriteLock:119 floorSync:120 mailWaitFlags:150 obsHostTrigger:170 persistenceClassBand:142 planner:336 plannerJurisdiction:218,225 routingFloorBackend:37,191,376,435 adminRowDiscipline:223 lensPartialSurvivesKill:46; PREFIX SLICES turnTraceDigestDisplayOnly:50, adminLegibility:40,57 (`file.slice(process.cwd().length+1)`; must change with the scan root).
- Non-root code uses: ZERO. The 38th line is a comment: noRuntimeApiImport:26.
- Implicit-cwd readers the grep cannot see (T4 still diverges): backendDataRegistry.test.ts:27 (git ls-files, no cwd), _lib/turn/__tests__/turnContextLog.test.ts:346 (spawnSync git, no cwd), lensPartialSurvivesKill.test.ts:58 (spawn node --import tsx, no cwd). Out of fence: _lib/replay/toolCorpusSample.ts:95 defaultBackendsRoot; which tests reach it is UNMEASURED.
A2. No test-support module that tests import exists: only src/test/setup.ts (setupFiles, never imported) and fixture data. Home: src/test/repoRoot.ts. It imports nothing from api/, so noRuntimeApiImport stays green. Not shared/ (client-bundled).
A3. (a) vitest.config.ts: jsdom, root unset, setupFiles ./src/test/setup.ts; with --root, config, setup and include resolve from root while cwd stays the shell's. THE TRAP IS THE FORM. `dirname(fileURLToPath(import.meta.url))` works at module scope (60+ test files). `new URL('<literal>', import.meta.url)` is rewritten by vite to an asset URL and throws at collection, which reads as "0 tests" (backendLifecycle.test.ts:56-58, toolCensusRefresh.test.ts:596-599). mailWaitFlags:147-149 and obsHostTrigger:167-169 justify cwd in comments; those comments are wrong for the fileURLToPath form. The card's docDriftCore.ts:30 is :38 at master.
(b) CI runs vitest only from repo root: build-test.yml:439, nightly-compat.yml:87/120, relay-corpus.yml:101. The only working-directory (deploy-langfuse.yml:68) runs no vitest. CI's measurement is unchanged.
(c) T3 misfires: it self-matches its own needle; a ROOT-NAMED regex misses the 20 inline/slice forms, so a new `resolve(process.cwd(),'x')` passes; scripts/ has zero test files and shared/__tests__ (in vitest include) is missing; comments must be stripped.
(d) Seal = public/architecture/manifest.json only (mergeGuard.mjs resealPaths). No listed file is sealed; manifest and build-test.yml:636 name some tests in prose only. No fixed guard fence was found; the fence is the PR's FILE-FENCE.
T4 trap: a fresh worktree has NO node_modules, and `--root <wt>` from the clone resolves packages up from the WORKTREE path.

ADVERSARY-VERDICT: RED card=CARD-TEST-ROOT-S167-1
- T1: "Compute REPO_ROOT as resolve(dirname(fileURLToPath(import.meta.url)), '..', '..') in src/test/repoRoot.ts; never new URL('<literal>', import.meta.url), which vite rewrites to an asset URL and which collects 0 tests. The cited pattern is scripts/docDriftCore.ts:38."
- T2: "T2 covers all 37 code lines of the grep (17 ROOT constants + 20 dir/inline/slice uses, 29 files); the three file.slice(process.cwd().length + 1) lines change with their scan root; the comments at mailWaitFlags.test.ts:147-149 and obsHostTrigger.test.ts:167-169 are rewritten; noRuntimeApiImport.test.ts:26 is a comment and stays."
- T2: "Give cwd: REPO_ROOT to the child processes at backendDataRegistry.test.ts:27, turnContextLog.test.ts:346 and lensPartialSurvivesKill.test.ts:58; name api/cwf/_lib/replay/toolCorpusSample.ts:95 in the report as out-of-fence residue."
- T3: "The guard fails on ANY process.cwd() in code (comments stripped) in *.test.ts/*.test.tsx under api/, src/, shared/, excluding its own file, with an allowlist that is empty at landing."
- T4: "Install dependencies in the worktree (npm ci) before T4 so both runs resolve the same node_modules; print both summary lines."

## B · CARD-INBUCKET-S167-1
Precondition HOLDS at 5e6e691f: supabase/config.toml:95 [inbucket], :96 enabled = true, :98 port = 54324; project_id "cwf_yaprak" (:5).
B1. `supabase --version` → 2.108.0 (homebrew node shim → @supabase/cli-darwin-arm64). The binary's own source: `WARN: config section [${z}] is deprecated. Please use [${P}] instead.` with P = z.replace(/inbucket$/,"local_smtp"). Loader: `if(!("local_smtp" in _)) _.local_smtp=_.inbucket; delete _.inbucket`, so the object MOVES WHOLE and keys are unchanged; if both exist, [local_smtp] wins. Observed verbatim on a scratch project: `WARN: config section [inbucket] is deprecated. Please use [local_smtp] instead.` After renaming to [local_smtp] it is ABSENT.
B2. `supabase status --workdir <worktree>`: it parses config (WARN), starts nothing and does not contact the remote. With no stack running, exit 1 "No such container: supabase_db_cwf_yaprak" is expected. Rejected: `services` (no parse, no WARN; may query the linked remote) and `config push` (remote). HAZARD: with the stack running, status prints local keys and the DB URL. SANDBOX: the CLI exits 1 SILENTLY inside Seatbelt; it ran only unsandboxed.
B3. `git grep -n -i inbucket` → only supabase/config.toml:95. Second lens `5432[456]|local_smtp|mailpit` → config.toml:98,100,101 (plus a timestamp false positive in a docs/relay evidence ndjson). Code readers: NONE.

ADVERSARY-VERDICT: GREEN card=CARD-INBUCKET-S167-1
- I1: "The command is `supabase status --workdir <worktree>`; exit 1 'No such container' is expected, and the measurement is the WARN line. First confirm no local stack runs (`docker ps --filter name=supabase_db_cwf_yaprak --format '{{.Names}}'` prints nothing); if one runs, STOP, because status prints local keys."
- I1: "The CLI fails silently inside the sandbox; if it cannot run unsandboxed, write that in the slip and stop."
- I2: "Rename [inbucket] to [local_smtp] with keys and comments unchanged (CLI 2.108.0 moves the object whole)."
- I4: "At 5e6e691f the only hit is supabase/config.toml:95, and no code reader exists."

GRAFT: ask "read a relay_inbox card body…", ask "print a card body…scout_reply", grep "process.cwd()", grep readBusCards, ask "vitest config setupFiles…", skeleton scripts/mergeGuard.mjs, ask "reseal: which paths are sealed", callers defaultBackendsRoot --depth 2, grep scout_reply. Node cards: none. git grep only for master-exact counts, unindexed files (toml, yaml, tsconfig) and the implicit-cwd lens.
read relay_inbox at 2026-09-30T20:54:20Z: 1 card (this one); the box is re-read after this reply.
