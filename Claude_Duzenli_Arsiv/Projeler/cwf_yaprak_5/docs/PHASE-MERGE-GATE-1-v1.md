# PHASE-MERGE-GATE-1 · v1 (S108)
<!-- Self-contained relay artifact (S54-3). Lane: AG-1. One phase, one gated prompt. -->

## PRECONDITION (S47-1)
Fresh clone. `git rev-parse origin/master` MUST equal `15db33a48a2f3c5f3c77d93e311f7383e1998816`
(anchor measured live at S108 open). If it differs, STOP and report the measured sha — do not adapt.
`git ls-remote --heads origin` must show master only, open PRs 0. Any deviation: STOP + report (RULE-25).

## WHY (measured, not asserted)
- Three S107 merges landed via raw `git push origin HEAD:master` and were ACCEPTED — master is
  measurably unprotected. Every safety property we claim about merging is currently ceremonial.
- CI already runs on PR heads (`build-test.yml` has `pull_request: branches: [master]`) but NOTHING
  requires it: a red PR can land exactly like a green one. AUDIT-OR-ALARM: claimed enforcement
  without a WIRED gate is not enforcement.
- Four owner-supplied SOTA references and GitHub's own docs converge on the same integration layer:
  protected default branch + required status checks + merge queue. This card wires it.

## SCOPE
Repo settings via `gh api` + one repo file change (CI job naming stability if needed) + report.
NO turn-pipeline code. NO migrations. NO seal (identity is DERIVED — any bump instruction is stale).

## WORK ITEMS
**W1 · Probe permissions first.** `gh auth status` then a READ of
`gh api repos/maymun207/cwf_yaprak/branches/master/protection` (404 = unprotected, expected).
A 403 on the READ or later WRITEs = token lacks admin — STOP, report exact status; the card then
returns to Architect for a single named owner consent (token scope upgrade). Never ask the owner
to click UI menus while an API path is untested (S102-YASA-1).

**W2 · Branch protection on master** via
`gh api -X PUT repos/maymun207/cwf_yaprak/branches/master/protection` with:
- required_status_checks: strict=true, checks = [`build (24.x)`] — the EXACT check name as it
  appears on a recent PR head (read it from the live check-run list first; do not trust this card's
  spelling — COMPUTED-NOT-ASSERTED).
- enforce_admins=true · allow_force_pushes=false · allow_deletions=false
- required_pull_request_reviews: OMIT for now (lanes cannot approve; Architect review lives in
  RULE-25, not in GitHub review objects). Record this omission in the report as a named decision.
- ⚠ rule26 and coverage are DELIBERATELY not required yet: rule26 is a chronically flaky job
  (F-BW01, headroom 1.29×) and a flaky required check jams the queue. They become required in a
  follow-up card AFTER RULE26-DEBIAN-DETOX-1 lands. This is a NAMED deferral — write it into the
  report verbatim. (Process infra, not a SOTA criterion; SOTA-1 does not bind here, named anyway.)

**W3 · Merge queue.** Enable auto-merge for the repo
(`gh api -X PATCH repos/maymun207/cwf_yaprak -f allow_auto_merge=true`). Then attempt merge-queue
enablement on master (GraphQL `updateBranchProtectionRule` / rules API — discover the live API shape,
do not hand-author it from memory). If merge queue proper is unavailable on this plan/repo type,
FALL BACK to: required checks + `gh pr merge --auto --merge` per PR — serialization then comes from
strict=true (branch must be up to date), which forces the post-merge rebase the queue would have done.
Report WHICH of the two shapes landed, by name.

**W4 · Positive/negative controls (D-5, both directions):**
- NEGATIVE: from a worktree, attempt a direct `git push origin HEAD:master` with a trivial
  whitespace commit — it MUST be rejected by the server. Paste the rejection line.
- POSITIVE: open a tiny PR (docs line under `docs/relay/`), let checks go green, enable auto-merge,
  TOUCH NOTHING, confirm it lands merged by GitHub. Paste the merge event + final sha.
- CLEANUP: revert artifacts of both probes (the whitespace commit never lands; the docs PR line may
  stay — it is the report itself if you stage it so).

**W5 · Lane duty change (write into the report, Architect promotes to boots/laws):**
- Lanes STOP at: branch → push → PR → enable auto-merge. The merge idiom
  (`checkout --detach` → `merge --no-ff` → `push HEAD:master`) is RETIRED from lane duties.
- Card precondition template gains: `git merge-base --is-ancestor origin/master HEAD` rc must be 0
  before opening a PR; if rc=1, rebase first and report the new base sha.
- Overlap pre-check before PR: `git diff origin/master...HEAD --name-only | sort` vs the other
  live lane's branch, `comm -12`; a non-empty intersection is REPORTED before the PR is opened.
- Dependency-adding changes (package.json/lockfile) are single-lane per wave.

## GATES (each `$?` read unpiped, per gate)
Full local gate set on the final tree (vitest · typecheck · build). Settings changes are not in the
tree — their proof is W4's two controls, pasted verbatim.

## DELIVERY (S91)
Branch `phase/merge-gate-1` · push to origin · report `docs/relay/PHASE-MERGE-GATE-1-report.md` ·
PR to master · enable auto-merge on your own PR — this card's own landing is its third proof.
TAIL ANCHOR: report ends with `git rev-parse origin/master` measured AFTER your PR lands.

## CONSENT
Settings writes (W2/W3) are governance-plane, not data-plane: proceed without a separate token.
If and only if W1 hits 403, the card pauses for owner consent by name: ONAY-MERGE-GATE-TOKEN-1.
<!-- END PHASE-MERGE-GATE-1-v1 -->
