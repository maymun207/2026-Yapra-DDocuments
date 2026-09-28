<!-- relay-audit: v1 kind=card -->
CARD-E1C-BACKEND-NAME-GATE-S161-1-v2

LANE: AG-2 (fresh window; one card per window; your OWN worktree off origin/master — the main worktree is dirty, scout item 6)
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-28T01:00Z (bridge clock, date -u)
SUPERSEDES: CARD-E1C-BACKEND-NAME-GATE-S161-1-v1 (scout-1 RED, SCOUT-STATUS-REVIEW-E1-CARDS-S161-1-v1, doc repo S161/, sha256 5a0b6330429e93a9793cf8857b226dfbdea4253caa3e0da88549ad349749ef66). v2 = v1 with the scout's complete delta C1–C8 applied where each is named; the v1 "50 files / 71 matches" premise is DROPPED (scout item 2: not reproducible in any reading). Findings credited to scout-1 (S112-YASA-1).
OWNER APPROVAL: OWNER-APPROVAL-S161-PLAN-1 ("onay S161 planı", 2026-09-28 02:37 TSI, plan step P7, card E1-c) · OWNER-RULING-S159-A25-ADOPT-1 · OWNER-RULING-S153-NO-ARMES-HARDCODE-1 (top rule). Register rows 58 (G4), 103 E1 named below.
ADVERSARY GATE: EXEMPT for this re-cut only (REFUSAL CARRIED, 12.2: the bus gate AG009 refused the first insert because `ack` must be a bus ROW id, not a file sha; the scout status was relayed to the bus and this ack names that row) — the loop-breaking case of 12.1: same subject, the scout's own complete delta and nothing else; OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1.

```evidence:adversary
ADVERSARY: EXEMPT
ack: 84936227-10bc-435a-863e-80f8f14ca22e
basis: project instruction 12.1 loop-breaking case + OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1; ack = SCOUT-STATUS-REVIEW-E1-CARDS-S161-1-v1 (bus row 84936227-10bc-435a-863e-80f8f14ca22e, 2026-09-28T00:49:48Z — the scout file relayed to the bus by the Architect; file sha256 5a0b6330429e93a9793cf8857b226dfbdea4253caa3e0da88549ad349749ef66), whose delta C1-C8 this body applies
```
BRANCH: phase/e1c-backend-name-gate-s161-2 off origin/master · PUSH early · REPORT docs/relay/E1C-BACKEND-NAME-GATE-S161-1-AG2-report.md · PR: yes, non-draft, opened in THIS card.
GRAFT: take context from graft first (scripts/checkTenantZero.ts + scripts/tenantZeroLens.ts as the pattern; scripts/harnessSelfTest.ts ENROLLED_INSTRUMENTS; scripts/checkGroundTruth.ts groundContract; build-test.yml changes job). Slip and report carry a GRAFT line.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time | MEASURED: GitHub API branches/master, Architect bridge, 2026-09-27T23:28Z | master |
| A25 names K-G as "backend-name grep 0 — necessary, not sufficient", armed at E5 exit | READ: A25 v1 text extraction lines [267], [423], [427] (extraction, not HTML bytes) | a25 |
| no backend-name gate exists; the tenant-zero gate is the pattern and its pure core is scripts/tenantZeroLens.ts | READ: scout-1 items 1, C8 | gates |
| whole-word `\b` matching misses the code's real spellings (camelCase, underscores); `git grep -E "\b"` is silently blind on the owner's host | READ: scout-1 item 3, C6 (armes 64 distinct tokens: ArmesServer 39, ARMES_FLOOR 32, supersetArmes 51 …; `-E "\blabels\b"` 0 vs `-P` 33) | matcher |
| `system` is an ordinary word (517 lower-case hits in code); `superset` too, but it is a real gated backend | READ: scout-1 item 2 per-id table | generic |
| a new `scripts/check*.ts` must be enrolled in harnessSelfTest (born enrolled) or harnessHonestyGate reds; docs/ground/*.json must follow CONTRACT v1 or check:ground reds; CI-DIET skips gate steps when heavy=false (docs-only diffs) | READ: scout-1 C3, C4, item 4 (harnessSelfTest.ts:192-194, :232-233; groundContract.ts:10-30; build-test.yml:174-178, :211-213, :413-415) | harness |

```evidence:master
c58438b59cff4d1d403634b28e44af9b01db6dea
```

```evidence:a25
[267] K-G aleti (ARMES grep 0 — gerekli, yeterli değil); K11 üç küme + E2E N=10 gece sınavı aynen
[423] ... K-G aleti; ... Kod: yalnız replay/sınav/fikstür.
[427] A24 P4/P5 çıkışları + K-A/K-A′ yeşil + K-G 0.
```

```evidence:gates
READ (scout-1 item 1): git grep -n -i -E "backend.?name|checkBackend|armes" <master> -- scripts .github package.json → provenance comments only; check: scripts are doc-drift, rule24, migration-versions, tenant-zero, ground.
READ (scout-1 C8): tenant-zero's pure core is scripts/tenantZeroLens.ts.
```

```evidence:matcher
READ (scout-1 item 3): tokens containing a variant that \b does not match — armes: supersetArmes 51, ArmesServer 39, armesMes 34, composeArmes 32, ARMES_FLOOR 32, ARMES_ROUTED 16, isArmes 14, MCP_ARMES_TOKEN 10, cwf__armes__governed 9, ref_armes 9; superset: SUPERSET_BACKEND_ID 49, composeSupersetContext 69.
READ (scout-1 C6): git grep -E "...\blabels\b" → 0 files; git grep -P "\blabels\b" src/lib/chartData.ts → 33.
```

```evidence:generic
READ (scout-1 item 2, code class api/shared/src non-test, whole-word): armes 74 / ARMES 64 · superset 72 / Superset 90 / SUPERSET 42 · system 517 / System 11 / SYSTEM 32 (192 files) · machine-knowledge-base 17 · honestbench 13 · mount-probe 10. Card ORDER-6 reading at master: 96 files / 267 lines / 348 occurrences (armes|Armes|ARMES, api src shared scripts public e2e, excl. __tests__).
```

```evidence:harness
READ (scout-1 C3): scripts/harnessSelfTest.ts:232-233 isInstrumentFilename = /^(check|verify)[A-Za-z0-9]*\.ts$/; :192-194 frozen debt list refuses additions ("born enrolled"); harnessHonestyGate.test.ts reds an unenrolled instrument.
READ (scout-1 C4): check:ground (inside npm run build) audits docs/ground/*.json — six-key stamp (artifact, schema, provenance MEASURED:, commit 40-hex ancestor, measuredAt, generator) and every number as {"value","state"} (groundContract.ts:10-30, findBareNumbers).
READ (scout-1 item 4): build-test.yml :211-213 docs/.claude/.agents-only diff → heavy=false; :174-178 empty diff → heavy=false; :21-23 master push paths-ignore docs/** .agents/**; :413-415 every gate step `if: needs.changes.outputs.heavy == 'true'`.
```

## PREMISE
The top rule says no backend name may be hard-coded, and A25 makes "backend-name count = 0" the exit test of E5 — but nothing MEASURES that number on every push. This card builds the INSTRUMENT and an EXACT-MATCH gate: a script counts every backend id from data/backends/index.json in the code surfaces by IDENTIFIER SEGMENT (delta C1: tokens split on camelCase, `_`, `__`, `-`; a segment equal to the id, per case variant; `clearMessages` → clear/Messages is NOT a hit, so F-S154 stays closed), compares against a committed baseline, and FAILS CI when measured ≠ baseline in either direction (delta C4: a baseline raise without matching code is red; a code reduction ships WITH its baseline rewrite in the same PR). `--arm-zero` is the E5 exit arm, red today. Generic-word ids (delta C2): which ids are ZERO-GATED is DATA — data/backends/index.json gains `"nameGate": { "zeroExempt": ["system"], "reason": "the platform's own id is an ordinary word (517 hits); it is ratcheted, never zero-gated" }`; every id is ratcheted (exact match), only non-exempt ids are zero-gated; `superset` stays zero-gated (a real backend). Matching is done in JS RegExp / a tokenizer, never `git grep -E \b` (delta C6).
SELF-INVALIDATION: dies if a backend-name gate exists at your head (grep scripts/ .github/ package.json; then wiring, say so), or if harnessSelfTest's enrollment shape differs from C3 (then STOP and print it).
ON-DISAGREEMENT: YOUR READING WINS: print both, continue with yours.

## FALSIFIER
At your head: (i) `npm run check:backend-names` prints the id × class × variant table and exits 0 against the committed baseline; (ii) PLANT: add `const x = 'armes';` under api/ → exit 1 naming file:line, class, id; then PLANT `const ARMES_FLOOR2 = 1;` and `class ArmesServer2 {}` and `const cwf__armes__x = 1;` → each exit 1 (delta C1); remove the plants; (iii) PLANT: raise one baseline number by 1 with no code change → exit 1 (delta C4); restore; (iv) `--arm-zero` exits 1 today with the non-exempt total (must be red — a green is a broken instrument) and `system` is listed as ratcheted-not-gated; (v) `--self-test` prints RED/GREEN/REFUSED scenarios and harnessHonestyGate.test.ts is green with the instrument enrolled (delta C3); (vi) the CI step ran on the PR (heavy=true) and its log shows the table.

## ORDERS
1. scripts/backendNamesLens.ts (pure core, the tenantZeroLens.ts shape; delta C8) + scripts/checkBackendNames.ts (the check entry; born enrolled — delta C3: add it to ENROLLED_INSTRUMENTS in scripts/harnessSelfTest.ts; implement `--self-test` with a planted RED, a clean GREEN and a REFUSED scenario; three exits 0 pass / 1 fail / 2 MEASUREMENT-REFUSED; corpus = `git ls-files --cached --others --exclude-standard`; plausibility floor as tenant-zero has). Ids from data/backends/index.json (never a literal). Tokenizer: split identifiers on camelCase boundaries, `_`, `__`, `-`; a token's SEGMENT equal to an id (per variant lower/Capitalised/UPPER; `machine-knowledge-base` and `mount-probe` matched as the hyphenated token AND as their segment sequence) is a hit; count per CLASS: `code` (api/, shared/, src/, non-test), `tests` (__tests__, *.test.ts(x), e2e/), `fixtures` (__fixtures__, data/ EXCLUDING data/backends/<id>/** and data/backends/index.json — the registry names itself by design), `public` (public/), `scripts` (scripts/), `workflows` (.github/), `other` (everything else tracked, minus the EXEMPT set: supabase/migrations/** as history, docs/**, root dotfiles; delta C7). Print file:line under `--verbose`; JSON summary always.
2. BASELINE: data/gates/backend-names-baseline.json (NOT docs/ground — delta C4; data/ sets heavy=true — delta item 4) = the counts at your head, written by `--write-baseline`, committed once. GATE = EXACT MATCH per (id, class): measured ≠ baseline → exit 1 with the delta and file:lines; the message names the remedy ("code changed: rewrite the baseline in this PR with --write-baseline"). `--arm-zero`: every class except `fixtures` must be 0 for every id NOT in nameGate.zeroExempt.
3. nameGate DATA (delta C2): data/backends/index.json gains `nameGate.zeroExempt` + `reason`; shared/backendData.ts types it; the script reads it.
4. Wiring: package.json `"check:backend-names": "node --import tsx scripts/checkBackendNames.ts"` (node --import tsx, register 66); build-test.yml step "Backend-name gate" after the Tenant-zero gate (:413-415) WITH `if: needs.changes.outputs.heavy == 'true'` (delta C5); NOT inside `npm run build`.
5. Tests (vitest, api/cwf/__tests__/backendNamesLens.test.ts): segment matching per variant (ARMES_FLOOR, ArmesServer, cwf__armes__x, supersetArmes hit; clearMessages, systemPrompt-as-`system`-exempt handled per data); class assignment incl. the exemptions; exact-match fail both directions; --arm-zero red while any non-exempt id remains; tests use INVENTED ids through a fixture index (no real backend name literal in tests).
6. UI/UX: none, factory/CI only. REMOVALS: none. Say both.
7. Counts: the id × class table before (master) and after (head); `git grep -n -E "armes|Armes|ARMES" -- api src shared scripts public e2e ':!*__tests__*'` before/after (must not grow — this card adds no backend name in code; the baseline JSON and index.json are the only files that legitimately carry ids).
8. npm run build (five gates) + suite + typecheck:api; report with the FILE-FENCE in the first commit; PR non-draft; slip SLIP-E1C-BACKEND-NAME-GATE-S161-1 (branch, 40-hex head, PR, CI by full sha read twice if zero, the table, all plant results). Do not merge. Stop.

## SHARED SURFACES
```scope
- scripts/backendNamesLens.ts (new); scripts/checkBackendNames.ts (new); scripts/harnessSelfTest.ts (ENROLLED_INSTRUMENTS); api/cwf/__tests__/backendNamesLens.test.ts (new)
- data/gates/backend-names-baseline.json (new); data/backends/index.json (nameGate); shared/backendData.ts (type)
- package.json (one script line); .github/workflows/build-test.yml (one gated step after :415)
- docs/relay/E1C-BACKEND-NAME-GATE-S161-1-AG2-report.md; public/architecture/manifest.json (reseal only if check:doc-drift asks)
```

## DECISION RIGHTS
AG-2 chooses the tokenizer implementation, JSON shape and test layout. The Architect decided (by the scout's measurements): ids from data; segment matching in JS; exact-match gate both directions; baseline in data/gates; zeroExempt as data with `system` the only initial entry; born-enrolled instrument with --self-test; CI step gated on heavy; --arm-zero red today. You may refuse on evidence this card did not anticipate.
FORBIDDEN: no backend, vendor or tenant name literal in scripts or tests; no change under api/cwf/_lib; no merge; no scout post on your own head; no poll task, no cron; never print an environment value.

END · CARD-E1C-BACKEND-NAME-GATE-S161-1-v2
