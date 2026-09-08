<!-- relay-audit: v1 kind=report prov=1 -->
# MA-RERUN-HARDEN-1-S133-1 — AG4 report

card: CARD-MA-RERUN-HARDEN-1-S133-1-v1
lane: AG-4
branch: phase/ma-rerun-harden-1-s133-1

**THE WORKFLOW IS HARDENED AND THE TRADE IS WORSE DIAGNOSIS, ON PURPOSE.** The
stream leaves the upload, the artifact's life shrinks to a day, and a counting step
reports how many seams fired without printing one. One file, one commit, no
dispatch, and a pull request opened and left unmerged.

This card exists because the line it replaces could not be executed. Eleven
versions and twenty-one amendments produced no commit; its own adversary review
called it UNEXECUTABLE because its FALSIFIER forbade what its ORDER B.0 retained.
This card took that order's substance, changed its framing, and handed the verdict
to a machine. The first commit on this line exists.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the master this branch was cut from, equal to the card's fence | MEASURED: `git fetch origin` then `git log -1 --format=%H origin/master` before the branch was created | base |
| the four shapes the card named were all present on master before the edit | MEASURED: `git show origin/master:.github/workflows/ma-rerun.yml`, read in full | now |
| the pinned upload action permits a one-day retention | MEASURED: `gh api` for `actions/upload-artifact` `action.yml` at the pinned ref, the `retention-days` description read directly | retention |
| the edited workflow parses, and its steps carry what the card ordered | MEASURED: the file loaded with `js-yaml` and the parsed step list printed, rather than the YAML being eyeballed | parse |
| no repository-level workflow guard exists, so the hook that fired is the plugin's | MEASURED: a listing of `.claude/hooks` naming every guard present · a search of those guards for the string `workflow`, which returns nothing | hook |
| every CI run at the pushed head, named with its conclusion | MEASURED: `gh api actions/runs` keyed on the FULL forty-hex head sha, read until each run reported a conclusion | ci |
| the branch changes one file and no other | MEASURED: `git status --porcelain -uall` before the commit · `git diff --name-only origin/master...HEAD` after it | diff |

```evidence:base
$ git log -1 --format=%H origin/master
e25f7cd33b7a72d262f7e62c54299c55b17adb4d

Equal to the card's base fence, so ORDER A.2 passed and no STOP fired.
```

```evidence:now
- name: Upload evidence and stderr        <- present
    name: ma-rerun-evidence
    path: |
      ma-rerun-evidence.json
      ma-rerun-stderr.log                 <- present
    retention-days: 14                    <- present
  if [ -f ma-rerun-stderr.log ]; then     <- present, in the summary step
    echo "stderr bytes:"
    wc -c ma-rerun-stderr.log
  fi

and no step in the file carried an `id:`. All four shapes matched the card's `now`
fence, so ORDER A.3 passed. The file also carried one sibling of the stderr branch
that the card named separately: the summary's else-arm said "see the stderr
artifact", pointing a reader at a thing this commit removes.
```

```evidence:retention
$ gh api "repos/actions/upload-artifact/contents/action.yml?ref=v4" -H "Accept: application/vnd.github.raw"

20:  retention-days:
21:    description: >
22:      Duration after which artifact will expire in days. 0 means using default retention.
23:
24:      Minimum 1 day.
25:      Maximum 90 days unless changed from the repository settings page.

The pinned version is `actions/upload-artifact@v4` and the minimum it declares is
one day, so `retention-days: 1` is legal at the version this repository actually
pins. The card carried this as UNMEASURED; it is measured here against the action's
own file rather than against a memory of the platform's rules.
```

```evidence:parse
$ node (js-yaml load of the edited file, parsed step list printed)
PARSE: OK
  - name="Checkout"                                                   id=(none) if=(none)
  - name="Setup Node"                                                 id=(none) if=(none)
  - name="Install deps"                                               id=(none) if=(none)
  - name="Run the clarification-gate replay lens (READ-ONLY, parity role)" id=lens if=(none)
  - name="Upload evidence"                                            id=(none) if=always()
  - name="Summarise without printing the body"                        id=(none) if=always()
  - name="Count the stream's seams without printing it"               id=(none) if=always()
UPLOAD uses: actions/upload-artifact@v4
UPLOAD with: {"name":"ma-rerun-evidence","path":"ma-rerun-evidence.json\n","retention-days":1,"if-no-files-found":"warn"}
UPLOAD has id: (none)

The lens step carries `id: lens`; the upload step carries NONE and no `artifact-id`
output; its `path` is the evidence file alone; its `retention-days` is 1; its
`name` is unchanged. Parsing rather than reading is the point — a YAML file that
looks right and does not load is a workflow that fails at dispatch, and this card
forbids dispatching to find out.
```

```evidence:hook
$ ls .claude/hooks
guard-bash.py  guard-bash.test.py  guard-mcp.py  guard-mcp.test.py
guard-secrets.py  guard-secrets.test.py  guard.sh  __pycache__

$ grep -rn "workflow" .claude/hooks/*.py
(no output)

THE HOOK THAT FIRED IS THE PLUGIN'S, NOT THIS REPOSITORY'S, and the difference is
named rather than blurred. Editing the workflow raised, verbatim:

  [from security-guidance@claude-code-plugins plugin]
  Security Warning: You are editing a GitHub Actions workflow file. Be aware of
  these security risks:
  1. Command Injection: Never use untrusted input (like issue titles, PR
     descriptions, commit messages) directly in run: commands without proper
     escaping
  2. Use environment variables: Instead of ${{ github.event.issue.title }}, use
     env: with proper quoting
  Example of UNSAFE pattern to avoid:  run: echo "${{ github.event.issue.title }}"
  Example of SAFE pattern:  env: TITLE: ${{ ... }} / run: echo "$TITLE"

It did not refuse the edit, so the card's ON-DISAGREEMENT arm for a refusal did not
fire. Its advice is the form this file already used for `UNTIL`, and the counting
step follows it: `steps.lens.outcome` is bound through `env:` rather than
interpolated into the `run:` body.
```

```evidence:ci
$ gh api "repos/maymun207/cwf_yaprak/actions/runs?head_sha=62936f3e12e9edf2cc99365f11dbc3b5fc894aaf"

total_count: 2        (S101-L1 satisfied. The FULL forty-hex sha was used: a short
                       one answers zero here, which reads byte-identically to
                       "CI never ran" and is ALWAYS FAILED.)

  Build and Test   completed   success
  Relay corpus     completed   success

Every run named with its conclusion, and NONE re-run — the wait was a poll on the
same read, never a dispatch.

TWO RUNS, NOT THREE, AND THE ABSENT ONE IS NAMED RATHER THAN COUNTED AS GREEN.
`report-schema` did not trigger at this head because the commit changes no report;
it fires on the report commit that follows. A workflow that did not run has not
passed, and reporting it as part of a green sweep would be exactly the false zero
this house keeps paying for.

THE WORKFLOW ITSELF WAS NOT DISPATCHED. `ma-rerun.yml` is `workflow_dispatch` only,
so nothing above exercised the edited file — these runs prove the repository's own
gates accept the change, not that the lens runs. The card forbids the dispatch and
gives it to the next card.
```

```evidence:diff
$ git diff --name-only origin/master...HEAD
.github/workflows/ma-rerun.yml
```

## ORDER C.2 — WHAT A FAILED RUN STILL YIELDS, AND WHAT WAS GIVEN UP

The card asks for this in the lane's own words and says that if the answer is
"less than before", it must say so. **It is less than before, and the loss is
specific rather than general.**

**WHAT REMAINS after a FAILED run.** The lens step's outcome, printed by name as
`lens_outcome=<word>` from a closed vocabulary. `clarify_lines=<integer>`, the
count of clarification seams the stream recorded. `lens_failed_lines=<integer>`,
the count of frames the lens itself marked FAILED. The evidence artifact when one
was produced at all, for one day, with the summary step printing its byte count and
its `readIntegrity` line. Between them these separate several real cases: a run
that read the corpus and found failures shows non-zero counts; a run that produced
evidence shows bytes and an integrity line.

**WHAT IS GONE.** The stderr text itself: the FENCE-DB-1 project-ref banner and the
per-frame verdict lines. And the loss lands hardest exactly where the removed
comment said it would. That comment read: *"A permission error for the parity role
is a MEASUREMENT the lane must be able to quote, and a failure that discards its own
diagnosis is worse than no run."* That measurement can no longer be quoted. A parity
role missing a grant now produces `lens_outcome=failure`, `clarify_lines=0`,
`lens_failed_lines=0` — **and so does a DNS failure, a bad `--until`, an unset
secret, and a crash before the first frame.** All five collapse into the same three
values.

**SO THE HONEST SUMMARY IS: the counting step tells a reader HOW MUCH the lens got
through, and no longer tells them WHY it stopped.** That is a genuine regression in
diagnosability, accepted because the alternative is a fortnight-lived copy of
recorded frames, and containment of frames outranks convenience of diagnosis. It is
written here rather than left for the next reader to discover by needing it.

**A REPAIR EXISTS AND THIS CARD DOES NOT MAKE IT.** A third anchored prefix count
over the FENCE-DB-1 banner, or the node exit code printed beside the outcome, would
split "failed before reading anything" from "failed after reading some" without
printing a single line of content. The card's SCOPE fences this commit to what it
ordered and its FALSIFIER forbids more, so the repair is NAMED and left for whoever
holds the next card. Doing it here would be widening a scope on my own authority.

## SCOPE KEPT

One file, one commit, and the report in a second commit touching nothing else. The
workflow was NOT dispatched. The pull request is open and was NOT merged — landing
is a foreman card and the owner's approval is not given for it. The lens step's
`2> ma-rerun-stderr.log` redirect stays; no second artifact was introduced; the
upload step gained no `id:`; the env-bound input form, the parity role mapping, the
concurrency group and the evidence artifact's name and path line are byte-identical.

## FINDINGS — named, not repaired

**THE FROM-LANE BUS POST STILL HAS NO CALLER.** ORDER C.3 anticipates this, and the
measurement is unchanged from the previous card: `relay_post_from_lane` is defined
in the write-channel migration, enumerated in `scripts/verifyGrants.ts` and
exercised in `factoryWriteChannel.test.ts`, but nothing in `scripts/` calls it and
`callVerb` is not exported from `factoryState.mjs`. `MECHANISM-ABSENT`, the lenses
named, and the report on origin is the receipt `scripts/busDelivery.ts` reads —
which is what the card itself says to do, under
`F-S133-PRODUCER-HAS-NO-BUS-WRITE-PATH-1`.

## DIFF

```
$ git diff --name-only origin/master...HEAD
.github/workflows/ma-rerun.yml
```

One file. The report lands in a second commit on the same branch, which is why it
does not appear above.
