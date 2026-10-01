<!-- relay-audit: v1 kind=card -->
CARD-TEST-CLEAN-TREE-S169-1-v2

LANE: AG-4 (the AG-4 window ONLY; any other window prints "NOT MINE: AG-4 card" and stops). First line of every message: `[AG-4]`. Thank you for 660 — it landed at 8d452df354e8ed98c479f6f1cdecfbc61c7ed34b and is READY in production.
SUPERSEDES CARD-TEST-CLEAN-TREE-S169-1-v1 (never sent to a lane). v2 = v1 + scout-2's amendments A1–A6 from SCOUT-STATUS-PREREVIEW-TEST-CLEAN-TREE-S169-1 (row 03e23564-45a4-4617-9cc9-1271107eb59e, verdict RED), pasted VERBATIM below; where an amendment and v1 differ, the amendment wins.
fanout: personalized (one lane, one body)
FROM: Architect, S169, 2026-10-01T03:50Z
PRECONDITION: master = your `git ls-remote origin refs/heads/master` (8d452df354e8ed98c479f6f1cdecfbc61c7ed34b). scout-2 re-measured on origin/master: api/cwf/__tests__/authorityMatrix.test.ts CONFORMANCE_DOC :83; describe 'C · conformance' :554; first it :555; measuredAt: new Date() :564; writeFileSync(CONFORMANCE_DOC, doc) :567 (inside try/catch :566-571, BEFORE the expect at :573). scripts/authorityMatrix.mjs:907-933 renderConformanceDocument.
ON-DISAGREEMENT: if the lines are not what you read, print what you found and work on that.
WHY: register 190 / F-S167-TEST-WRITES-DOCS-GROUND-1. `npx vitest run` leaves the tree dirty: docs/ground/authority-conformance.latest.md is rewritten on every run only because its measuredAt changes. Plain words: running the tests changes a committed file, so every lane's worktree looks edited after a test run and a clean-tree check can never pass.
AUTHORITY: OWNER-APPROVAL-S169-190-1 ("onay 190", 2026-10-01 06:39 TSİ).
```evidence:adversary
ADVERSARY: EXEMPT
ack: 03e23564-45a4-4617-9cc9-1271107eb59e
why: scout-2 returned RED with six amendments; v2 carries them verbatim (same subject, loop-breaking, OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1).
```
NO CRON TASK. GRAFT FIRST: graft/api/cwf/__tests__/authorityMatrix*, graft/scripts/authorityMatrix.md, graft/scripts/groundContract*, graft/.graph/wiring.json; `git grep` only for what graft does not index. SECURITY: never print, echo, printenv or cat any environment variable.
UI/UX (§13.3): none — test/instrument change only; say so in the report.

## WORK (one path; the amendments below REPLACE W1, W2 and the W3 planted fault)
W1. (replaced by A1)
W2. (replaced by A2)
W3. Proof, ONCE each: in a clean worktree run `npx vitest run api/cwf/__tests__/authorityMatrix.test.ts` twice, then `git status --porcelain -uall` — must print nothing. Planted faults per A4.
W4. Name in the report every OTHER test that writes a tracked file during `npx vitest run` (run the full suite once, then `git status --porcelain -uall`). Do not fix them in this card; list path + test name. See A5.
AMENDMENTS (scout-2, verbatim):
A1. Replace W1 with: "W1. Keep `measuredAt` the real clock time of the run (contract-literal; scripts/groundContract.ts 'Nothing is bent'). Do NOT take it from the snapshot stamp: the body already prints the snapshot's stamp on the `live half:` line, and the findings also depend on tree inputs, so the snapshot stamp is not when the comparison ran."
A2. Replace W2 with: "W2. Write only when the CANONICAL content differs: compare the rendered document and the file on disk with the frontmatter `measuredAt:` line removed from both (that one line only; the `live half:` body line stays in the comparison). Equal → do not write. Different, or the file is absent → write the full document with the fresh `measuredAt`. Keep the write BEFORE the assertion and keep the read-only-checkout catch. This is the ground contract's own rule: 'the generator REWRITES NOTHING when the canonical content is unchanged … The stamp advances exactly when a fact does.' Put the canonical function in scripts/authorityMatrix.mjs beside renderConformanceDocument (exported, pure) so the test and any later writer share one definition."
A3. Replace the fence entry with: "docs/ground/authority-conformance.latest.md — expected UNCHANGED; touch it only if the suite on master renders a different canonical content, and then say what changed."
A4. Replace W3's planted fault with: "Planted faults, in the worktree's tracked file, each reverted: (a) edit ONLY the frontmatter `measuredAt:` value → run the test → `git status --porcelain -uall` shows the file still modified with YOUR edit (proves it is not rewritten for a stamp-only difference); (b) change one byte in the findings block → run → the file is rewritten, `git diff` shows only the restored byte plus a new measuredAt (proves a fact change still lands). Then restore and show the two clean runs." Add a unit test asserting the canonical function treats docs differing only in `measuredAt:` as equal and docs differing in the `live half:` line as different — without asserting anything about the existing tests' checks.
A5. W4 add: "Separate the two writers: `npm run build` (gen:arch-facts → docs/ground/facts.json) is NOT a vitest writer; do not list it under W4. In `git status --porcelain -uall`, list ` M` (tracked, modified) entries as findings; list `??` entries separately as untracked artefacts; a test that writes then restores leaves no trace, so state W4 is ONE lens (end-state only) in the report's dark section."
A6. Add to FORBIDDEN: "changing the frontmatter key set or order of the conformance document (the missing `commit` key is reported as dark, not fixed here)."
SCOUT TRAP NOTES (scout-2, for you): a plain byte-equality write-guard does nothing while measuredAt is the clock, so W2 only works with A2's canonical compare; strip the FRONTMATTER measuredAt line only (between the first two `---`), never every measuredAt.
FENCE: api/cwf/__tests__/authorityMatrix.test.ts (incl. the A4 unit test) · scripts/authorityMatrix.mjs (the exported canonical function) · docs/ground/authority-conformance.latest.md (per A3) · docs/relay/TEST-CLEAN-TREE-S169-1-AG4-report.md.

## STEPS
1. `git ls-remote origin refs/heads/master` (twice). `git worktree add <scratch>/wt-tc -b phase/test-clean-tree-s169-1 <master sha>`.
2. W1–W2 (A1, A2) + the A4 unit test, first commit, push, `gh pr create --base master`. Print PR number + head 40-hex.
3. W3–W4 (A4, A5), report, commit (`git commit -F <file>`), push.
4. Slip SLIP-CARD-TEST-CLEAN-TREE-S169-1 (bus; first line `[AG-4]`, `GRAFT:`, `PROMPTS:`). Remove worktree. Back to `node scripts/mail-wait.mjs AG-4 --budget-min 480`.
BUDGET: first push ≤ 10 min; whole card ≤ 45 min. A refused command → write it in the slip, never route around it, never wait silently.
FORBIDDEN: --force; any path outside the fence; changing what any existing assertion checks; changing the frontmatter key set or order of the conformance document (A6); merging; migration; cron; printing an environment value.

END · CARD-TEST-CLEAN-TREE-S169-1-v2
