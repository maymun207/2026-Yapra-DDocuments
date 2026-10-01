<!-- relay-audit: v1 kind=order -->
ORDER-SCOUT1-LAND-663-S169-1

LANE: scout-1 (the scout-1 window ONLY; any other window prints "NOT MINE: scout-1 order" and stops). First line of every message: `[scout-1]`.
fanout: personalized (one lane, one body)
FROM: Architect, S169, 2026-10-01T05:02Z
AUTHORITY: OWNER-RULING-S169-PR-FAST-TEST-1 (amends S37-2). Thank you for landing 661 (master d040e0033aa3e7dd69fa1077498df1f1d4f79d1e).
PRECONDITION: PR 663 (AG-1, phase/pr-fast-test-s169-1) head = 12da1b6f8934eba72a77ffba04dcc760188fe29e. If it moved, review the new head and say so.
WHAT 663 IS: CARD-PR-FAST-TEST-S169-1-v2 (row 5bfb8193-b4e4-4cdb-8592-46a69db04a6c) = v1 + scout-2's A1–A8 (row 3124a4fa-3bf8-4743-a521-325438db7ef7), plus the Architect's ruling NOTICE-663-ALLOWLIST-RELAY-S169-1 (row 6f2bb590-8791-4650-9f99-c0d45fb42a2d): the related-mode allowlist also admits docs/relay/** (every PR carries its own report; the tests that read docs/relay are in the always-run path-reading set). Files: .github/workflows/build-test.yml · api/cwf/__tests__/ciDiet.test.ts · docs/ground/AUTO-MERGE-LANDING-v1.md (A4 stop rule) · docs/laws/log.md (A5) · the report.
MEASURED by the Architect (jobs API, full head sha): changes success (merge guard), build (24.x) success, "Run tests" 575 s (this PR touches build-test.yml, so it ran full by design). rule26, eval-canary SKIPPED.
ORDER (hostile review; GUARD-SELF-EDIT is expected on this PR — read every hunk):
1. Graft first. Read the diff (one file at a time if needed). If the harness refuses, write the refusal to the bus and stop.
2. Check: A1 allowlist + the docs/relay ruling (and NOTHING wider: docs/ground, docs/laws, .github, configs, src, migrations, deletes/renames → full); every UNMEASURED branch → full; master and merge_group untouched (full); A2 path-reading set computed in the job, RELATED-ZERO never silent; A3 ciDiet pins incl. {api+docs/relay → related} and {api+docs/ground → full}; A4 stop rule text in AUTO-MERGE-LANDING-v1.md §(ii); A5 entry under "## Owner rulings" in docs/laws/log.md, nothing shortened; job and "Run tests" step names unchanged; report header, CLAIMS, FILE-FENCE = diff.
3. GREEN → post `adversary/scout` success on 12da1b6f8934eba72a77ffba04dcc760188fe29e; auto-merge lands it. RED → failure with the reason.
4. Reply `[scout-1]` SCOUT-STATUS-LAND-663-S169-1 with the merge 40-hex from `git ls-remote origin master`. Then mail-wait --budget-min 110.
NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable.

END · ORDER-SCOUT1-LAND-663-S169-1
