[scout-1]
ADVERSARY-VERDICT: GREEN pr=663 head=12da1b6f8934eba72a77ffba04dcc760188fe29e · NOT-YET-LANDED at read time: mergeStateStatus CLEAN, auto-merge armed (maymun207, 04:21:27Z); master d040e0033aa3e7dd69fa1077498df1f1d4f79d1e
GRAFT: graft ask "ciDiet test that pins build-test.yml workflow change filter" --source (located ciDiet.test.ts). graft does not index workflow YAML, so the 5 files were read with `git diff 8d452df3...12da1b6f` and `git grep <sha>` after `git fetch origin pull/663/head`.
PROMPTS: none. One guard refusal (guard-secrets GS-4) when I grepped a harness tool-results file under ~/.claude; not retried, and the same lines were read with `git grep` at the head.

SCOUT-STATUS-LAND-663-S169-1 · reply to ORDER-SCOUT1-LAND-663-S169-1 (id 8190e88a-2dbc-4fdc-8d46-15309de222a2, md5 147c6e46…, DIGEST-OK)
Head = 12da1b6f8934eba72a77ffba04dcc760188fe29e, as the card says. 5 files; every hunk read.

## Hostile review: GREEN
- A1 ALLOWLIST: build-test.yml:251 `grep -qvE '^((api|shared)/.+\.(ts|tsx|mjs|js)|docs/relay/.+)$'`, an allowlist. Any other path → full (:252). docs/ground, docs/laws, .github, configs and src are all outside it. Deletes and renames → full (:242-249, `--diff-filter=DR` against the merge-base). Test config (src/test, vitest*.config, tsconfig*, package*) → full (:255-256), which is redundant with the allowlist and harmless. `related` is emitted on exactly ONE line (:259), after every earlier exit.
- MASTER / merge_group untouched: :161 `emit true true "event=$EVENT — full suite by law"` has no 4th arg, and emit defaults to `tests=${4:-full}`.
- EVERY UNMEASURED branch → full: :166, :172, :178 and :244 carry no scope (default full). In build, merge-base failure, git diff failure, and a git grep exit >1 all call `full`. A missing JSON report exits non-zero. RAN=0 → RELATED-ZERO → `npm run test`. Nothing silent.
- A2 PATH-READING SET is computed in the job (`git grep -l -E 'readFileSync|readdirSync|existsSync|execFileSync|spawnSync|execSync|spawn\(|fork\('` over the 4 include globs), never hand-listed. My adversarial probe found no hole:
  - Second lens, async readers (`readFile(`, `readdir(`, fs/promises, createReadStream, opendir, glob) in test files → 0 hits.
  - Third lens: the 14 tests that mention docs/relay. 9 are in the set; the other 5 (backendNamesLens, busDeliveryGate, gateSilenceVisibility, landScript, canaryRepFailure) use docs/relay ONLY as string fixtures or comments. None reads the disk.
  - Residual, not blocking: a test that reaches a file through an IMPORTED reader with no read call in the test itself would be missed. Within the allowlist, only docs/relay is non-code, and no such reader exists today. The full run on master is the net.
- Build checkout has `fetch-depth: 0` (:401), so the build-side merge-base resolves.
- A3 ciDiet pins: the `tests` output; the emit default; every UNMEASURED line contains `emit true true` and not related; exactly one related line, after the PR, migrations, UI and docs-only exits; the allowlist, DR and config strings; and the scope helper is read OUT of the workflow text. {api + docs/relay} → related, {api + docs/ground} → full, {+docs/laws}, {+.github}, {+docs/relaying.md} → full. Also the "Run tests" name and heavy gate, the related invocation, and RELATED-ZERO → npm run test.
- A4: AUTO-MERGE-LANDING-v1.md +84-100, inside §(ii) (before "## (iii)"). It covers master tip by ls-remote, the newest completed push run (or first-parent ancestor), failure → post nothing except `fix-master:`, cancelled or none → UNMEASURED, and a per-POST stop.
- A5: docs/laws/log.md appends a new "## Owner rulings" section after the last line, with zero `-` lines (nothing shortened).
- Job names (`changes`, `build`) and the step name "Run tests" are unchanged.
- Report: line 1 `<!-- relay-audit: v1 kind=report -->`, `## CLAIMS` at :17, FILE-FENCE :167-172 = the 5 diff paths, `## DIFF` :174.
- Note for the record: the report's F-1 still narrates the pre-ruling contradiction; it is marked RULED.

## CI at 12da1b6f8934eba72a77ffba04dcc760188fe29e
build (24.x) success 04:56:39Z · changes (merge guard) success · relay corpus success · report-schema success · arm auto-merge success · Vercel success. SKIPPED (named): rule26, eval-canary. I did not read the merge-guard VERDICT line (the job-log host is outside the sandbox); the `changes` conclusion is success.

## A4 stop rule, applied before posting (in spirit; it binds once landed)
`git ls-remote origin refs/heads/master` → d040e0033aa3e7dd69fa1077498df1f1d4f79d1e (PR 661). Its push run "Build and Test" completed success, and Relay corpus also success. Master is green, so the post was allowed.

## Posted
adversary/scout success on 12da1b6f8934eba72a77ffba04dcc760188fe29e, status id 55332588441, 2026-10-01T05:04:52Z.

## Landing
One read right after the post: OPEN, mergeCommit null, CLEAN. The merge 40-hex is UNMEASURED by this reply (OWNER-RULING-S169-NO-CI-WATCH-1: no polling). Master at post time: d040e0033aa3e7dd69fa1077498df1f1d4f79d1e.
