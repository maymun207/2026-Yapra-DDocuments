<!-- relay-audit: v1 kind=notice -->
NOTICE-PR632-FRESH-BRANCH-S163-1

LANE: AG-4 (PR 632 CLOSED unmerged 2026-09-28T19:17:19Z by the serial-close ruling; its branch phase/e1a-exam-sets-and-bar-s162-4 at e61fd0c6894277b690a4df1b017175d0c47daedc)
fanout: personalized (one lane, one body)
FROM: Architect, S163, 2026-09-29T02:40Z
AUTHORITY: OWNER-APPROVAL-S163-PLAN-1 (plan item 3: 632 content → fresh branch → scout → land) · OWNER-RULING-S162-GET-IT-DONE-1 (one open PR at a time) · OWNER-RULING-S153-NO-ARMES-HARDCODE-1.
MEASURED by the Architect at 2026-09-29T02:40Z: master = 1a6279e0c3eddf5ac331b38f5c028b5f17668690 (Merge PR #634; before it Merge PR #633 at 3d2f06a5). Open PRs: NONE. PR 632 = SEVEN single-parent commits off 7b54180d, in order: 1b0d7c7348bc26ab86e8daceb58fa4a7ffce780b · cc8280f401801462632a07c6e1b27b66dae7e1c8 · a90fa3822b6c42a1a5a4a1c6761806712e2c46ed · a6ca127f7f7fb70da17c363d35fd0ce4bbd68865 · 26e719f2d262c96dba8692195f6607b8d9550d82 · 4bfd1ffae9a6fb16b2c683e6c072213f31fbc3e3 · e61fd0c6894277b690a4df1b017175d0c47daedc; 33 paths; NO package.json. Master changed since 632's base (633 + 634): the ONLY overlap with 632's paths is docs/ground/facts.json and public/architecture/manifest.json — both GATE-GENERATED.
YOUR WINDOW NOW HAS A WRITE PATH: PR 634 put the proxy-aware pg transport on master. Run this card from a worktree AT master 1a6279e0 and `--take` should print [STAMPED]; quote it.
GUARD RULES (scripts/mergeGuard.mjs at master): MERGE-HAND-EDIT L260-290 rehearses only commits with >= 2 parents (L261) — a single commit with no merge is outside it; COLLISION L494-L526 — no other open PR; FENCE-GREW — the FIRST commit's report fence must already list every path, gate-mandated files included (A-REC-S162-2).
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## PRECONDITION
`git fetch origin && git ls-remote origin refs/heads/master` read twice; expected 1a6279e0c3eddf5ac331b38f5c028b5f17668690 (moved → STOP, slip the new sha). Work in a fresh worktree off origin/master (not the shared clone; name any dirty file there, do not discard it).

## ORDER
1. `git checkout -b phase/e1a-exam-sets-and-bar-s163-5 origin/master`. Carry the content as ONE commit: `git cherry-pick --no-commit` the seven commits above IN ORDER. For docs/ground/facts.json and public/architecture/manifest.json: on any conflict take master's side (`git checkout --theirs` is WRONG during cherry-pick — use `git checkout HEAD -- <file>`), then REGENERATE them with the repo's own tools (`npm run gen:arch-facts`, `npm run reseal`) — never hand-merge a seal (F-S161-RESEAL-CANNOT-PARSE-CONFLICT-MARKERS-1). Any conflict in any OTHER path → STOP and slip the path.
2. `npm run build` (five gates) · `npm run typecheck:api` · `npm run check:backend-names` · the E1-a tests. If check:backend-names fails: print the (id, class, file) rows that grew. A growth ONLY in __tests__/ or mock lines may be answered by the instrument's own baseline rewrite with the reason recorded (precedent NOTICE-PR630-BASELINE-RULING-S162-1) and data/gates/backend-names-baseline.json joins the fence; a growth in NON-TEST source is a NO-HARDCODE finding → STOP and slip, do not rewrite.
3. The report docs/relay/E1A-EXAM-SETS-AND-BAR-S161-1-AG4-report.md: its scope fence lists EVERY path of the final diff against origin/master (33 + any gate-mandated file of step 2), and ONE evidence-fenced line under landing: `FRESH-BRANCH: phase/e1a-exam-sets-and-bar-s163-5 = the seven commits of PR 632 as one commit onto master 1a6279e0c3eddf5ac331b38f5c028b5f17668690; supersedes PR 632 (closed by serial-close ruling)`. `node scripts/relayAudit.ts` on it. Then ONE commit (house subject grammar).
4. Proofs in the slip: `git log --format='%H %P' origin/master..HEAD` = ONE commit, ONE parent 1a6279e0; `git diff --name-only origin/master` vs the report fence (both differences ∅); `git diff e61fd0c6894277b690a4df1b017175d0c47daedc HEAD -- <the 31 non-generated paths>` shows only the report's FRESH-BRANCH line (anything else: name it).
5. Push, open PR (non-draft; title `AG-4: E1A-EXAM-SETS-AND-BAR-S162-1 — exam sets, acceptable labels, K25 bar, honesty metric (supersedes #632)`), auto-merge armed as before. CI by full 40-hex sha read twice; quote the `[merge-guard] VERDICT` line.
6. SLIP as SLIP-PR632-FRESH-BRANCH-S163-1 (bus; fallback file "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S163/SLIP-PR632-FRESH-BRANCH-S163-1.md" with sha256), first line `NEW-PR: #<n> head=<40-hex>`, then the [STAMPED] line of your --take, steps 2–5 evidence, GRAFT line.
7. DO NOT STOP: `node scripts/mail-wait.mjs AG-4 --budget-min 480`; 0 → --read <name> --take, execute, slip, wait again; 3 → NO MAIL, stop; 4 → READ FAILED, stop.
FORBIDDEN: a merge commit; --force; hand-editing a seal; rewriting the baseline for non-test source; merging your own PR; cron; printing an environment value. Note: supabase/migrations/20260928180000_golden_specimens_exam_set.sql is in the fence — it is NOT applied by you (Gemini operator after landing).

END · NOTICE-PR632-FRESH-BRANCH-S163-1
