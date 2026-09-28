<!-- relay-audit: v1 kind=card -->
CARD-E1C-BACKEND-NAME-GATE-S161-1-v1

LANE: AG-2 (fresh window; one card per window) — reaches AG-2 ONLY with a scout GREEN row
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-28T00:30Z (bridge clock, date -u)
OWNER APPROVAL: OWNER-APPROVAL-S161-PLAN-1 ("onay S161 planı", 2026-09-28 02:37 TSI, plan step P7, card E1-c) · OWNER-RULING-S159-A25-ADOPT-1 · OWNER-RULING-S153-NO-ARMES-HARDCODE-1 (top rule). Register rows 58 (G4), 103 E1, 116 named below.
ADVERSARY GATE: NEW SUBJECT → scout first (12.1). No exemption claimed.
BRANCH: phase/e1c-backend-name-gate-s161-1 off origin/master · PUSH early · REPORT docs/relay/E1C-BACKEND-NAME-GATE-S161-1-AG2-report.md · PR: yes, non-draft, opened in THIS card.
GRAFT: take context from graft first (scripts/checkTenantZero.ts as the gate pattern; data/backends/index.json reader shared/backendData.ts; build-test.yml gate steps). Slip and report carry a GRAFT line.
Work in your own worktree, never in the main worktree another lane uses.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time | MEASURED: GitHub API branches/master, Architect bridge, 2026-09-27T23:28Z | master |
| A25 E1 names the K-G instrument as "ARMES grep 0 — necessary, not sufficient", armed at E5 exit | READ: A25_cwf-capability-fabric-architecture-v1.html (sha256 8e8c18a8fab6141fe178f483f286ca1a2e93d8416fa5fadd6ac7bc4d9cf7866b), text extraction lines [267], [423], [427] — a paraphrase-free text extraction, not the HTML bytes | a25 |
| the build job already runs three `check:*` gates as named steps before Build; no backend-name gate exists; the tenant-zero gate is the pattern | MEASURED: GitHub contents API .github/workflows/build-test.yml + package.json at master, 2026-09-28T00:20Z | gates |
| the backend id list is data | READ: data/backends/index.json ids (S160 card evidence:schema, unchanged since — you re-read at your head) | ids |
| the S160 inventory measured 146 armes lines in code and the scout's S159 recount 50 files / 71 matches non-test, case-sensitive | READ: RULING-S160-UI-UX-AND-HARDCODED-TABLES-1; register v152 row 58 | counts |

```evidence:master
c58438b59cff4d1d403634b28e44af9b01db6dea
```

```evidence:a25
[267] K-G aleti (ARMES grep 0 — gerekli, yeterli değil); K11 üç küme + E2E N=10 gece sınavı aynen
[423] ... K-G aleti; ÜÇ SAĞLAYICI tabanı fatura maliyetiyle (önbellek durumu kaydedilir; harcama R6(d)); K25 barajı BU AŞAMADA ilan. Kod: yalnız replay/sınav/fikstür.
[427] A24 P4/P5 çıkışları + K-A/K-A′ yeşil + K-G 0.
```

```evidence:gates
c58438b59cff4d1d403634b28e44af9b01db6dea:.github/workflows/build-test.yml:413:    - name: Tenant-zero gate
c58438b59cff4d1d403634b28e44af9b01db6dea:.github/workflows/build-test.yml:415:      run: npm run check:tenant-zero
c58438b59cff4d1d403634b28e44af9b01db6dea:.github/workflows/build-test.yml:417:    - name: Build
c58438b59cff4d1d403634b28e44af9b01db6dea:package.json:14:    "check:tenant-zero": "tsx scripts/checkTenantZero.ts",
c58438b59cff4d1d403634b28e44af9b01db6dea:package.json:32:    "build": "tsc -b && npm run typecheck:api && npm run gen:arch-facts && npm run check:ground && vite build && npm run check:doc-drift",
```

```evidence:ids
READ: data/backends/index.json at 2a6f6781 (S160 card): { "ids": ["armes","superset","system","machine-knowledge-base","honestbench","mount-probe"], ... }
```

```evidence:counts
READ: register v152 row 58: "ARMES case-sensitive 50 files / 71 matches non-test (scout recount)"; RULING-S160-UI-UX-AND-HARDCODED-TABLES-1: "146 armes lines → E5 + K-G gate"
```

## PREMISE
MEASURED: the anchors above. In plain words: the top rule says no backend name may be hard-coded, and A25 makes "backend-name grep = 0" the exit test of E5 — but today nothing MEASURES that number on every push, so it can grow unnoticed while E2–E5 remove it. This card builds the INSTRUMENT and a RATCHET: a script counts, case-insensitively per id but reporting case-sensitive variants, every backend id from data/backends/index.json in the code surfaces, compares against a committed baseline, and FAILS CI if any class GROWS. The =0 gate is a declared arm (`--arm-zero`) that E5's landing card flips; until then the gate is "does not grow". Two earlier findings shape the scope: the grep was once case-insensitive and hit clearMessages (F-S154-CASE-INSENSITIVE-ARMES-GREP-HITS-CLEARMESSAGES-1) → the instrument matches WHOLE-WORD identifiers per case variant and prints each variant separately; and public/ was once outside scope (F-S154-G4-SCOPE-MISSES-PUBLIC-1) → public/ is a class of its own.
SELF-INVALIDATION: dies if a backend-name gate already exists at your head (grep scripts/ and .github/ for it first; then this is a WIRING card and you say so — 12.6).
ON-DISAGREEMENT: YOUR READING WINS: print both, continue with yours.

## FALSIFIER
At your head: (i) `npm run check:backend-names` prints the per-class, per-id, per-variant table and exits 0 against the committed baseline; (ii) PLANT: add one line `const x = 'armes';` to any file under api/ → the gate exits non-zero naming the file:line and the class; remove the plant; (iii) `npm run check:backend-names -- --arm-zero` exits non-zero today with the total (that is the E5 exit test, and it MUST be red today — a green here is a broken instrument); (iv) the CI step runs on the PR and its log shows the table.

## ORDERS
1. scripts/checkBackendNames.ts (pure, testable core in api/cwf/_lib/ground/ or beside checkTenantZero's core — follow that file's split): reads ids from data/backends/index.json (never a literal list); for each id builds the case variants (lower, Capitalised, UPPER) and matches them as whole identifiers/words (`\b` on both sides; `machine-knowledge-base` matched as the hyphenated token); counts per CLASS: `code` (api/, shared/, src/ excluding tests), `tests` (`__tests__`, *.test.ts(x), e2e/), `fixtures` (`__fixtures__`, data/ EXCLUDING data/backends/<id>/** which legitimately names itself), `public` (public/), `scripts` (scripts/), `workflows` (.github/); prints a table id × class × variant with file:line under `--verbose`, and a JSON summary.
2. Baseline: docs/ground/backend-names-baseline.json = the counts at your head (generated by the script with `--write-baseline`, committed once). The gate: any (id, class) count ABOVE baseline → exit 1 with the delta and the offending file:lines; below → exit 0 and print "ratchet down: rewrite baseline with --write-baseline" (the lowering is a deliberate commit, never automatic). `--arm-zero`: every class except `fixtures` must be 0 (fixtures may name a FIXTURE backend of their own invention; the real ids still count).
3. Wiring: package.json `"check:backend-names": "tsx scripts/checkBackendNames.ts"`; a build-job step "Backend-name ratchet gate" right after the Tenant-zero gate (build-test.yml:413-415 pattern); NOT inside `npm run build` (keep the five gates as they are — the doc-drift narrative tabs count `npm run build` steps).
4. Tests (vitest, under api/cwf/__tests__/): variant matching (armes|Armes|ARMES separately; `clearMessages` NOT matched); class assignment; ratchet up → fail, down → advisory; --arm-zero red while any real id remains.
5. UI/UX (OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1): none — factory/CI only; the report says "UI/UX: none, factory-only. REMOVALS: none."
6. Counts: print `git grep -n -E "armes|Armes|ARMES" -- api src shared scripts public e2e ':!*__tests__*'` before/after (must not grow — this card adds NO backend name in code; the script reads ids from data). The baseline JSON is the one file that legitimately contains the ids.
7. npm run build (five gates) + suite + typecheck:api; report with the FILE-FENCE in the first commit; PR non-draft; slip SLIP-E1C-BACKEND-NAME-GATE-S161-1 (branch, 40-hex head, PR, CI by full sha read twice if zero, the table, the plant result). Do not merge. Stop.

## SHARED SURFACES
```scope
- scripts/checkBackendNames.ts (new); its pure core module (new, beside checkTenantZero's core); api/cwf/__tests__/ (new test file)
- package.json (one script line); .github/workflows/build-test.yml (one step after :415)
- docs/ground/backend-names-baseline.json (new); docs/relay/E1C-BACKEND-NAME-GATE-S161-1-AG2-report.md
```

## DECISION RIGHTS
AG-2 chooses file names, the matcher implementation and the JSON shape. The Architect decided: ids from data, never a literal; whole-word case-variant matching with separate variant counts; ratchet-up fails, ratchet-down is a deliberate baseline rewrite; --arm-zero exists from day one and is red today; public/ is its own class. You may refuse on evidence this card did not anticipate.
FORBIDDEN: no backend, vendor or tenant name literal in the script or tests (the tests use invented ids through a fixture index); no change under api/cwf/_lib except the pure core; no merge; no scout post on your own head; no poll task, no cron; never print an environment value.

END · CARD-E1C-BACKEND-NAME-GATE-S161-1-v1
