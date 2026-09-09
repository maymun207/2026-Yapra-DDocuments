<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-LAND-MA-HARDEN-1-S134-1 · v4 — land the harden branch; the ma-rerun run at that head is NOT a gate on it, and this card says why with bytes
lane: AG-5
report: docs/relay/LAND-MA-HARDEN-1-S134-1-AG5-report.md
fanout: personalized

THIS SUPERSEDES v3, WHOSE FENCE WENT STALE SIXTEEN MINUTES AFTER IT WAS CUT. AG-4 committed the MA-RERUN measurement record onto this same branch at 18:31:51Z, so the branch now carries THREE commits and FOUR files instead of two and two. v3 would have STOPped you at ORDER A.3 and that stop would have been correct. The fence below is the new one, measured. THE PATH FENCE WIDENED AND IS RULED ON HERE RATHER THAN QUIETLY: the added files are one measurement artefact and one lane report — DOCUMENTS, no code — produced by the same MA line the owner approved landing. The single code file is still `.github/workflows/ma-rerun.yml`. Recorded, and told to the owner in the same turn (§5).

v3 SUPERSEDED v2. You held correctly under v2 and this card does not overrule your judgement — it removes ONE gate by name and leaves every other one standing. Your stated reason for holding was that landing "would put a workflow on master that has never been observed to complete". Half of that is measured false and is corrected here: `ma-rerun.yml` IS ALREADY ON MASTER. This branch HARDENS an existing `workflow_dispatch`-only workflow; it introduces nothing.

AUTHORITY: `OWNER-APPROVAL-S134-MA-HARDEN-MERGE-1`, still unspent, still naming exactly ONE landing. Plus `OWNER-RULING-S134-LANDING-FIRST-1`, given in the owner's own words this turn — "once inis sonra olcumun onerimi" — ordering the landing ahead of the measurement's repair.

THE ADVERSARY GATE IS LIFTED FOR THIS CARD, NAMED AND NOT SILENT, citing `OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1`.

## WHY ma-rerun DOES NOT GATE THIS LANDING, in four measured parts
1. It is `workflow_dispatch`-only. It was NOT triggered by either commit on this branch; AG-4 dispatched it by hand on the branch ref for a measurement.
2. It judges the CORPUS, not the code. It replays recorded frames through the clarification gate and reports rates.
3. Its non-success is a PLATFORM CEILING KILL, not a defect. It ran five hours and fifty-nine minutes of real work and was cut at the six-hour ceiling the workflow file deliberately leaves in place. Anchor `ceiling`.
4. The three checks that DO judge this code — `Build and Test`, `Relay corpus`, `report-schema` — were all read green at this head. `report-schema` is the one v2 said must be present because the second commit adds a report; it fired and it passed. Anchor `gates`.

NOTHING ELSE IS RELAXED. If any of those three is not success at the head you read, you STOP, and the owner's approval does not override it.

## PREMISE
- MEASURED: 2026-09-08T18:33Z over the bridge — the harden branch is THREE commits ahead of `origin/master` and ZERO behind, and its whole diff is `.github/workflows/ma-rerun.yml`, `docs/relay/MA-RERUN-HARDEN-1-S133-1-AG4-report.md`, `docs/relay/MA-RERUN-RUN-1-S133-1-AG4-report.md` and `docs/replay/ma-gate-rerun3-S133-v1.md`. Every head at full length is in the `branch` fence. Anchor `branch`.
- MEASURED: `gh api "repos/maymun207/cwf_yaprak/actions/runs?head_sha=<the full forty hex>"` run by YOU and relayed at 15:20Z — four runs at that head, three success, the fourth `ma-rerun` in progress. Anchor `gates`.
- MEASURED: Supabase `edge_logs` split by `request.cf.asOrganization` and `request.sb.apikey.apikey.prefix`, read by the Architect at 18:17Z and 18:29Z — the GitHub runner's traffic ran unbroken at about three hundred requests a minute from 12:24:15Z and stopped dead inside the 18:23 minute. Anchor `ceiling`.
- MEASURED: `git cat-file -p origin/master:.github/workflows/ma-rerun.yml` — the file EXISTS on master today and triggers on `workflow_dispatch` only, so this landing modifies it rather than introducing it. Anchor `already`.
- UNMEASURED: whether `origin/master` or the branch head moved since 12:48Z, and what CI reads at the head NOW. ORDER A and ORDER B settle both, and every sha you act on is COMPUTED, never copied out of this card.
- ON-DISAGREEMENT: master or the branch head differs from the `branch` fence → STOP and print both. Any of the three named checks not success at the head → STOP and name it. `total_count` zero → STOP: CI never ran at this head. `ma-rerun` showing anything at all, including failure or cancellation, is NOT a stop under this card and is recorded rather than acted on.
- DECAYS the moment `origin/master` moves, or when a v5 appears.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the branch head, the master it lands onto, the distance and the whole diff | MEASURED: `git rev-parse origin/master origin/phase/ma-rerun-harden-1-s133-1` at 2026-09-08T18:33Z · MEASURED: `git log --format=%H origin/master..origin/phase/ma-rerun-harden-1-s133-1` and `git diff --name-only origin/master...origin/phase/ma-rerun-harden-1-s133-1` at the same instant | branch |
| the three code-judging checks were green at that head | MEASURED: `gh api actions/runs?head_sha=<full forty hex>` run by AG-5 and relayed 15:20Z | gates |
| the ma-rerun run worked for six hours and was killed by the ceiling | MEASURED: Supabase `edge_logs` per-minute counts filtered to the runner's AS organisation · MEASURED: the same source filtered to distinct query strings, showing six distinct reads repeated thousands of times | ceiling |
| ma-rerun.yml is already on master | MEASURED: `git cat-file -p origin/master:.github/workflows/ma-rerun.yml` read at its `on:` block | already |
| what CI reads at the head NOW | NOT-READ | ORDER B |

```evidence:branch
origin/master                         = e25f7cd33b7a72d262f7e62c54299c55b17adb4d
origin/phase/ma-rerun-harden-1-s133-1 = ffc9b9d66ad2059cdbe3cc0c59d57d2630cb81a8
commits ahead, newest first:
  ffc9b9d66ad2059cdbe3cc0c59d57d2630cb81a8  the run was taken, the measurement did not happen, and the artefact records that
  4771b6f719cd755767783c9d407d9f961f3b5a8f  the report, and the trade stated rather than hidden
  62936f3e12e9edf2cc99365f11dbc3b5fc894aaf  stderr leaves the upload, retention drops to a day, a counting step reports seams
commits behind: none
files vs master:
  .github/workflows/ma-rerun.yml
  docs/relay/MA-RERUN-HARDEN-1-S133-1-AG4-report.md
  docs/relay/MA-RERUN-RUN-1-S133-1-AG4-report.md
  docs/replay/ma-gate-rerun3-S133-v1.md
```

```evidence:gates
total_count: 4 at the branch head
  Build and Test   completed   success
  Relay corpus     completed   success
  report-schema    completed   success
  ma-rerun         in_progress (at the time of that read)
```

```evidence:ceiling
runner traffic, requests per minute, Supabase edge_logs, AS organisation = the runner's:
  18:15 -> 310   18:16 -> 306   18:17 -> 292   18:18 -> 285
  18:19 -> 262   18:20 -> 234   18:21 -> 288   18:22 -> 274
  18:23 -> 114   18:24 onward -> no rows at all
first request 12:24:15.409Z, unbroken until the cut. Total for the run: 92296 requests.
```

```evidence:already
on:
  workflow_dispatch:
    inputs:
      until:
        required: true
```

## SCOPE
```scope
- ONE landing of phase/ma-rerun-harden-1-s133-1 onto master, through npm run land
- the pull request number COMPUTED from the head branch, never carried
- your report on a branch of your own, its pull request left open
- no dispatch of ma-rerun.yml and no re-run of anything (S55-1)
- no second master push under this approval
- no change to any file on the branch you land
- the documents repository is NOT touched
```

## ORDER A — THE FLOOR, COMPUTED
1. Read your box by `created_at`, earliest first.
2. `git fetch origin`. Print `git rev-parse origin/master`, `git rev-parse origin/phase/ma-rerun-harden-1-s133-1` at FULL forty-hex length, and `git ls-remote origin refs/heads/master`. Compare to the `branch` fence; a difference is ON-DISAGREEMENT. Every later order uses what you just printed.
3. Print `git log --format=%H origin/master..origin/phase/ma-rerun-harden-1-s133-1` and `git diff --name-only origin/master...origin/phase/ma-rerun-harden-1-s133-1` — exactly THREE commits and exactly the FOUR files the `branch` fence names. A fifth path, or a different set, is ON-DISAGREEMENT.

## ORDER B — CI AT THE HEAD, WITH ONE NAMED EXEMPTION
1. `gh api "repos/maymun207/cwf_yaprak/actions/runs?head_sha=$(git rev-parse origin/phase/ma-rerun-harden-1-s133-1)"` — the substitution is the point. Print `total_count` FIRST; zero is a STOP.
2. Name EVERY run with its conclusion. `Build and Test`, `Relay corpus` and `report-schema` must each read success. Any of the three otherwise → STOP and name it. Any OTHER workflow that did not trigger → name it rather than counting it green.
3. `ma-rerun` at this head is EXEMPT by this card, for the four reasons in the header. Record its conclusion and its duration in your report as a measurement; do not treat it as a verdict on the code and do not re-run it.
4. Print the commit statuses at that head too, and name the Vercel one if present.

## ORDER C — THE LANDING
1. `gh pr list --state open --head phase/ma-rerun-harden-1-s133-1` — print the number and the head sha the API reports; that sha must equal what you printed in ORDER A.2. No open pull request → STOP.
2. `npm run land -- <that number>`. Print the landing record WHOLE, including its own CI read and its AUTHOR-SUBJECT classification.
3. If `land` refuses, STOP and print the refusal verbatim. Do not merge by hand, do not use admin powers, do not force. **If it refuses BECAUSE of the ma-rerun run's conclusion, that is a finding about the landing tool rather than about this branch: name it, quote it, and stop — this card exempts ma-rerun from ITS OWN gate and cannot exempt it from a check inside `land.ts`.**

## ORDER D — THE PROOF THAT MASTER MOVED
1. `git fetch origin`, then `git ls-remote origin refs/heads/master` — it must differ from ORDER A.2, and the new value at full length is the new anchor. The tool's output is not the evidence (S63-1); this read-back is.
2. `git cat-file -p origin/master:.github/workflows/ma-rerun.yml | grep -c 'clarify_lines='` and `... | grep -n 'ma-rerun-stderr.log'` — print both; the stderr name must not appear inside the upload step's `path:`.
3. Read CI at the NEW master head the same way, keyed on `$(git rev-parse origin/master)`, and name every run with its conclusion.
4. Write your report on a branch of your own, `auditText` locally `violations: 0`, push, open a pull request and LEAVE IT OPEN.
5. Post one from_lane row if your channel can; otherwise say MECHANISM-ABSENT and name the lenses.

## FALSIFIER
Wrong if the landing proceeded with `total_count` zero at the head. Wrong if any of `Build and Test`, `Relay corpus` or `report-schema` was not success and the landing happened anyway. Wrong if any CI read was keyed on a sha typed out of this card rather than computed. Wrong if anything was re-run or dispatched. Wrong if the pull request number was carried rather than computed. Wrong if the merge was by hand, with admin powers, or forced. Wrong if a second master push was taken. Wrong if master was reported moved from the tool's output rather than a read-back. Wrong if anything on the landed branch was edited. Wrong if the documents repository was touched. Wrong if your own report was landed on master.

## SHARED SURFACES
cwf_yaprak: ONE master push, plus one new branch with your report and an open pull request. CI: the gates that fire on the merge commit; nothing dispatched. Database: no governed write; your heartbeat and one bus row. Production behaviour: UNCHANGED — the landed workflow is `workflow_dispatch`-only and the web valve stays closed. Secrets: none read, none printed.

## DECISION RIGHTS
Yours: your report's wording and your branch's name. Not yours: whether the landing happens — ORDER A and ORDER B settle it, and a STOP is a lawful outcome reported rather than worked around.

BODIES: CARD-LAND-MA-HARDEN-1-S134-1-v2, superseded · OWNER-APPROVAL-S134-MA-HARDEN-MERGE-1 · OWNER-RULING-S134-LANDING-FIRST-1 · OWNER-DESIGN-S134-LOOK-AT-THE-DATABASE-LOGS-1 · OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1 · A-REC-S133-7 · A-REC-S134-1 · S101-L1 · S55-1 · S63-1.

```deliverables
origin/master and the branch head at full forty-hex, read from the wire, compared to the fence
exactly three commits and exactly the four files the fence names
total_count at the head, printed FIRST, keyed on a computed sha
Build and Test, Relay corpus and report-schema each named with its conclusion
ma-rerun named with its conclusion and duration, recorded as a measurement and NOT as a gate
any other workflow that did not trigger, named rather than counted green
the pull request number COMPUTED from the head branch
the whole landing record from npm run land
the NEW master read back from the wire at full forty-hex
the hardened workflow proven on the new master by both greps
CI at the new master head, every run named
docs/relay/LAND-MA-HARDEN-1-S134-1-AG5-report.md on your own branch, pull request open and NOT merged
one from_lane row, or MECHANISM-ABSENT with the lenses named
```

TAIL ANCHOR: CARD-LAND-MA-HARDEN-1-S134-1-v4 ends here.
