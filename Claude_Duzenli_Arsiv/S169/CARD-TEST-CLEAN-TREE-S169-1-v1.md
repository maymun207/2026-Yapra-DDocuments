<!-- relay-audit: v1 kind=card -->
CARD-TEST-CLEAN-TREE-S169-1-v1

STATUS: DRAFT — goes to scout pre-review first (§12.1, NEW subject), then v2 to AG-4. Not sent to any lane until the owner says "onay 190".
LANE (after pre-review): AG-4 (the AG-4 window ONLY; any other window prints "NOT MINE: AG-4 card" and stops). First line of every message: `[AG-4]`. Thank you for 660 — it landed at 8d452df354e8ed98c479f6f1cdecfbc61c7ed34b.
fanout: personalized (one lane, one body)
FROM: Architect, S169, 2026-10-01T03:40Z
PRECONDITION: master = your `git ls-remote origin refs/heads/master` (8d452df354e8ed98c479f6f1cdecfbc61c7ed34b at 03:28:44Z). The Architect read a STALE local clone (d768bc2915524b7fbe5987aa86f45d8932f09508), so every line number below is a claim: re-measure on your master.
ON-DISAGREEMENT: if the write is not where named, print what you found and work on that.
WHY: register 190 / F-S167-TEST-WRITES-DOCS-GROUND-1. `npx vitest run` leaves the tree dirty: docs/ground/authority-conformance.latest.md is rewritten on every run. Plain words: running the tests changes a committed file, so every lane's worktree looks edited after a test run and a clean-tree check can never pass.
MEASURED (stale clone, re-measure): api/cwf/__tests__/authorityMatrix.test.ts, describe "C · conformance", first `it`: builds the document with `renderConformanceDocument({ findings, verdict, snapshot, measuredAt: new Date()... })` and calls `writeFileSync(CONFORMANCE_DOC, doc)` (about line 567). The clock stamp makes the bytes differ on every run even when nothing else changed.
AUTHORITY: register 190 under OWNER-APPROVAL-S167-PLAN-1 ("own card after"), owner word "onay 190" required before dispatch.
NO CRON TASK. GRAFT FIRST: graft/api/cwf/__tests__/authorityMatrix*, graft/scripts/authorityMatrix.md, graft/.graph/wiring.json; `git grep` only for what graft does not index. SECURITY: never print, echo, printenv or cat any environment variable.
UI/UX (§13.3): none — test/instrument change only; say so in the report.

## WORK (one path)
W1. Make the conformance document a PURE FUNCTION of its inputs: take `measuredAt` from the snapshot's own stamp (the snapshot already carries a full stamp; the "snapshot is present" describe asserts it), never from the clock. Same snapshot + same findings → byte-identical document.
W2. Keep the write (the document is governed and must survive a failing verdict), but write only when the rendered bytes differ from the file on disk.
W3. Proof, ONCE each: in a clean worktree run `npx vitest run api/cwf/__tests__/authorityMatrix.test.ts` twice, then `git status --porcelain -uall` — must print nothing. Planted fault: change one finding input in a scratch copy, show the file changes, revert.
W4. Name in the report every OTHER test that writes a tracked file during `npx vitest run` (run the full suite once, then `git status --porcelain -uall`). Do not fix them in this card; list path + test name.
FENCE: api/cwf/__tests__/authorityMatrix.test.ts · scripts/authorityMatrix.mjs (only if renderConformanceDocument needs the stamp passed differently) · docs/ground/authority-conformance.latest.md (regenerated once by W1) · docs/relay/TEST-CLEAN-TREE-S169-1-AG4-report.md.

## STEPS
1. `git ls-remote origin refs/heads/master` (twice). `git worktree add <scratch>/wt-tc -b phase/test-clean-tree-s169-1 <master sha>`.
2. W1–W2, first commit, push, `gh pr create --base master`. Print PR number + head 40-hex.
3. W3–W4, report, commit (`git commit -F <file>`), push.
4. Slip SLIP-CARD-TEST-CLEAN-TREE-S169-1 (bus; first line `[AG-4]`). Remove worktree. Back to `node scripts/mail-wait.mjs AG-4 --budget-min 480`.
BUDGET: first push ≤ 10 min; whole card ≤ 45 min. A refused command → write it in the slip, never route around it, never wait silently.
FORBIDDEN: --force; any path outside the fence; changing what any assertion checks; merging; migration; cron; printing an environment value.

END · CARD-TEST-CLEAN-TREE-S169-1-v1
