<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-MA-RERUN-HARDEN-1-S133-1 · v1 — the workflow changes the MA-RERUN run needs before it is safe to take, and nothing else
lane: AG-4
report: docs/relay/MA-RERUN-HARDEN-1-S133-1-AG4-report.md
fanout: personalized

THIS CARD REPLACES ORDER B.0 OF CARD-MA-RERUN-3-S132-1-v15 AND NOTHING ELSE OF IT. That card is 43465 characters, it accumulated twenty-one amendments across eleven versions, its own adversary review declared it UNEXECUTABLE because its FALSIFIER forbids what its ORDER B.0 retains, and in all that time NOT ONE commit was produced on the line. The Architect named that failure class in A-REC-S133-6 after the same thing happened to the web valve. The cure is not a v16 of a card nobody can execute: it is two small cards whose judge is a machine gate. This is the first. The run itself is the second, and it will not be cut until this one's commit exists.

THIS CARD IS NOT GATED ON A SCOUT VERDICT, and the exemption is named rather than assumed. The S132 adversary mechanism gates a producer on a RELEASE row; the MA line never received one, so you correctly built nothing for eleven versions. The owner ruled that an infinite loop is stopped wherever it is seen (OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1). This line stops here and its judge is the diff plus CI.

WHY THESE CHANGES ARE WORTH MAKING AT ALL, in one sentence, because a change nobody can justify is a change nobody should land: the lens's evidence and its stderr carry RECORDED FRAMES, the upload keeps them for a fortnight, and the run log has no way to report how many seams fired without printing frame content — so the artifact retention shrinks to a day, the stderr leaves the upload entirely, and a counting step reports statuses and integers in its place.

## PREMISE
- MEASURED: 2026-09-08T11:45Z — `git show origin/master:.github/workflows/ma-rerun.yml`, read in full: the lens step redirects stderr to `ma-rerun-stderr.log`; the upload step is named `Upload evidence and stderr`, has `retention-days: 14`, and its `path:` lists both `ma-rerun-evidence.json` and `ma-rerun-stderr.log`; the summary step has a trailing `if [ -f ma-rerun-stderr.log ]` branch printing `wc -c`; NO step in the file carries an `id:`.
- MEASURED: 2026-09-08T11:45Z — `git cat-file -e origin/master:.github/workflows/ma-rerun.yml` succeeds. The runner landed in S132 under `OWNER-APPROVAL-S132-LAND-MA-RERUN-RUNNER-1` and is dispatchable from the default branch.
- MEASURED: 2026-09-08T11:44Z — `git branch -r | grep -i ma-rerun` returns nothing, and `git log --all --oneline --grep=MA-RERUN` shows no commit newer than the S132 landing. Eleven card versions, zero commits: there is no half-done branch of yours to reconcile with, and you start from master.
- MEASURED: 2026-09-08T11:15Z — master is the hash in the `base` fence, carrying the web valve landing.
- MEASURED: 2026-09-08T11:45Z — the ORDER B.0 text of CARD-MA-RERUN-3-S132-1-v15, read from the S133 archive, excerpted in the `amendments` fence. The instructions in ORDER B below are lifted from it: this card changes their FRAMING, never their substance, and they were reviewed across many scout rounds before they got here.
- UNMEASURED: whether the pinned `actions/upload-artifact` version accepts `retention-days: 1` — the scout read its `action.yml` and reported the minimum is one day, and you confirm it against the pinned version in this repository before you rely on it.
- UNMEASURED: whether the workflow-security hook accepts the edited file; you read its output and quote it.
- ON-DISAGREEMENT: if the file on master does not match the shape in the first PREMISE line → STOP and print what you found; someone edited it and this card's diff would be built on a fiction. If the security hook refuses the edit → STOP and quote the refusal unanchored; do not work around a refusal.
- DECAYS when the commit this card asks for is pushed, or when a v2 of this card appears.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the four shapes in the workflow this card changes | MEASURED: `git show origin/master:.github/workflows/ma-rerun.yml` at 11:45Z | now |
| the base you branch from | MEASURED: `git log -1 --format=%H origin/master` at 11:15Z, owner clone, remote-tracking and not the wire | base |
| the amendment substance | MEASURED: the ORDER B.0 text of CARD-MA-RERUN-3-S132-1-v15, read from the S133 archive at 11:45Z | amendments |
| whether the security hook accepts it, and whether the pinned action allows one-day retention | NOT-READ | ORDER B |

```evidence:now
- name: Upload evidence and stderr
    name: ma-rerun-evidence
    path: |
      ma-rerun-evidence.json
      ma-rerun-stderr.log
    retention-days: 14
  if [ -f ma-rerun-stderr.log ]; then
    echo "stderr bytes:"
    wc -c ma-rerun-stderr.log
  fi
```

```evidence:amendments
(a) remove `ma-rerun-stderr.log` from the upload step entirely (no filtered substitute); the
`2> ma-rerun-stderr.log` redirect in the lens step STAYS (the file must exist for the count);
(b) add one step, `if: always()`, that prints exactly one line `clarify_lines=<integer>` ...
and, when the lens step failed, additionally the lens step's `outcome` ... and
`lens_failed_lines=<integer>` ... then deletes the stream file in the same step;
(c) remove the summary step's stderr branch ... rename the upload step ...
(d) set the evidence artifact's `retention-days` to 1 ...
(e) the lens step gains an `id:` in the same commit — a one-token addition that changes no
behaviour ... because `id:` appears on no step in ma-rerun.yml today.
```

```evidence:base
master e25f7cd33b7a72d262f7e62c54299c55b17adb4d
```

## SCOPE
```scope
- one branch, phase/ma-rerun-harden-1-s133-1, cut from the master in the base fence
- ONE commit changing exactly one file: .github/workflows/ma-rerun.yml
- one further commit for your own report, touching nothing else
- a pull request opened and NOT merged; the landing is a foreman card and the owner's approval is not given for it
- the lens step's redirect `2> ma-rerun-stderr.log` STAYS; the file must exist for the count
- the env-bound input form, the parity role mapping, the concurrency group, the evidence artifact's path and name all stay BYTE-IDENTICAL
- no dispatch. You do not run the workflow on this card; that is the next card
```

## ORDER A — READ FIRST
1. Read your box by `created_at`; earlier rows first.
2. `git fetch origin`; `git log -1 --format=%H origin/master` — equal to the `base` fence, or ON-DISAGREEMENT.
3. `git show origin/master:.github/workflows/ma-rerun.yml` — the four shapes in the `now` fence are present, or ON-DISAGREEMENT.
4. Read the pinned `actions/upload-artifact` version's own `action.yml` for the retention minimum. Print the version and the line you read.

## ORDER B — ONE COMMIT ON THE WORKFLOW
1. Branch `phase/ma-rerun-harden-1-s133-1` from that master.
2. Remove `ma-rerun-stderr.log` from the upload step's `path:` entirely. No filtered substitute, no second artifact. Rename the step to name only what it now uploads, and rewrite its `always()` comment to state what the failure path now yields.
3. Set the evidence artifact's `retention-days` to 1.
4. Remove the summary step's stderr branch — the `if [ -f ma-rerun-stderr.log ]` block and any sibling sentence pointing a reader at a stderr artifact that no longer exists.
5. Give the lens step an `id:`. One token, no behaviour change, and without it `steps.<id>.outcome` does not exist.
6. Add ONE step, `if: always()`, that prints statuses and integers and never a line's content:
   - `clarify_lines=<integer>` — the count of lines beginning with the exact prefix `[Clarify] layerStatus=`, anchored at line start so continuation lines from an error message are refused;
   - when the lens step did NOT succeed, additionally the lens step's `outcome` from the `steps` context — the bare word success, failure, cancelled or skipped — and `lens_failed_lines=<integer>`, the count of lines beginning with `[ClarificationLens] FAILED:`;
   - then DELETE the stream file, in that same step.
7. Nothing else changes. The upload step gains NO `id:` and no `artifact-id` output; the next card takes the artifact id from the run's artifacts listing.
8. `git diff` — print it whole. Commit; push; read and quote the repository's workflow-security hook output.
9. `gh pr create --base master --head phase/ma-rerun-harden-1-s133-1`; print the number. Do NOT merge.
10. `gh api "repos/maymun207/cwf_yaprak/actions/runs?head_sha=<the pushed head, full length>"` — `total_count >= 1` (S101-L1), then every run named with its conclusion. Green or red you report it; you do not re-run it (S55-1). A short sha answers zero here and reads identically to "CI never ran".

## ORDER C — THE REPORT
1. `docs/relay/MA-RERUN-HARDEN-1-S133-1-AG4-report.md`, grammar v1, `auditText` locally `violations: 0` before push, on the same branch as a separate commit.
2. The report answers one question in its own words: with stderr no longer uploaded, what diagnostic can a future reader of a FAILED run still obtain, and what has been given up. If the answer is "less than before", say so — this card traded diagnosis for containment on purpose, and a report that hides the trade is worse than the trade.
3. Post ONE from_lane row if your channel can. If it cannot, say MECHANISM-ABSENT and name the lenses you searched — F-S133-PRODUCER-HAS-NO-BUS-WRITE-PATH-1 is known, and your report on origin is the receipt `scripts/busDelivery.ts` reads.

## FALSIFIER
Wrong if any file other than the workflow changes in the first commit; wrong if the lens step's stderr redirect was removed; wrong if a second artifact carrying stderr was introduced; wrong if the upload step gained an `id:` or an exposed `artifact-id`; wrong if the counting step prints any line's content rather than counts and statuses; wrong if the stream file survives the counting step; wrong if the env-bound input form or the parity mapping changed; wrong if the workflow was dispatched; wrong if the pull request was merged.

## SHARED SURFACES
cwf_yaprak: one branch, two commits, one open pull request; master untouched. Production behaviour: UNCHANGED — this file runs only on `workflow_dispatch`. Secrets: untouched; the parity mapping is not edited. Database: untouched.

## DECISION RIGHTS
Yours, and only inside ORDER B.6: the exact shell that counts the prefixes, provided it prints counts and statuses and never content.

BODIES: CARD-MA-RERUN-3-S132-1-v15 (ORDER B.0, the amendment source; superseded for that order only) · OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1 · OWNER-APPROVAL-S132-LAND-MA-RERUN-RUNNER-1 · A-REC-S133-6 · A-REC-S133-7 · BUG-005 · S101-L1 · S55-1 · S61-2 · TOTAL-45.

```deliverables
base equals the base fence, or STOP with both printed
the pinned upload action's retention minimum, quoted
one commit, one file, the whole diff printed
stderr out of the upload; retention one day; summary stderr branch gone; lens step has an id; the counting step added and the stream file deleted in it
workflow-security hook output quoted
pull request opened and NOT merged; number printed
every CI run at the pushed head named with its conclusion, at full sha length, none re-run
docs/relay/MA-RERUN-HARDEN-1-S133-1-AG4-report.md, auditText violations: 0, with the diagnosis-versus-containment trade stated
one from_lane row, or MECHANISM-ABSENT with the lenses named
```

TAIL ANCHOR: CARD-MA-RERUN-HARDEN-1-S133-1-v1 ends here.
