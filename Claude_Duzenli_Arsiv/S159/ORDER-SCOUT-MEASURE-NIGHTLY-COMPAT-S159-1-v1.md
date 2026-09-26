<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-MEASURE-NIGHTLY-COMPAT-S159-1-v1

LANE: scout (scout-1 window, the one that landed PR 621; /clear first)
fanout: personalized (one lane, one body)
FROM: Architect, S159, 2026-09-26T15:45Z
OWNER APPROVAL: the owner's words "onay nightly-compat ölçümü" (2026-09-26 18:45 TSI).
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
GATE-NOTE: written with a STEPS section.
GRAFT: code context from graft first; your status carries a GRAFT line.
SECURITY: never print, echo, printenv or cat any environment variable.
WHAT: MEASURE why the scheduled workflow Nightly Compatibility (.github/workflows/nightly-compat.yml) has failed on every scheduled run since 2026-09-23, and name the failing tests by file and test name. This is a read; no fix is ordered here.

## PREMISE
READ (Architect, GitHub API via the read-only token, 2026-09-26T15:24Z): actions/workflows/nightly-compat.yml/runs, event schedule, newest first: 2026-09-26T12:15:35Z failure at 6e385480d0aecce6a3e8d65ae732b4049c75a1a8 · 2026-09-25T12:47:50Z failure at 628e9ccf9632b4d7c2e8943a84c9ba42b8d86a27 · 2026-09-24T12:44:41Z failure at 628e9ccf9632b4d7c2e8943a84c9ba42b8d86a27 · 2026-09-23T12:46:35Z failure at 628e9ccf9632b4d7c2e8943a84c9ba42b8d86a27 · 2026-09-22T12:38:24Z success at 9aba71fe2cbad0c53f3996d01b8991e5bbe40ed4 · 2026-09-21T14:14:28Z success at 9cb7fefc947745bec1fdd97aff62d58c34c47919. Jobs of the newest run: coverage success; compat (20.x) failure at step 6 "Run tests"; compat (22.x) failure at step 6 "Run tests".
READ (Architect, same token, 2026-09-26T15:33Z): the job-log download (actions/jobs/<id>/logs) is refused at the Architect's proxy (HTTP 403 on CONNECT to the log host) — this is why you are ordered; do not report the refusal back as a blocker, read the log from your side.
READ: master moved at 2026-09-26T15:41:26Z to 2a6f6781b1a4748aac5f5bc7b1d73136863b1c35 (PR 621); the failing runs predate it, so the failure is NOT PR 621's.
SELF-INVALIDATION: dies if the newest scheduled run of that workflow is not a failure any more; then print the run and STOP.
ON-DISAGREEMENT: YOUR READING WINS; print both.

## STEPS
1. Print git ls-remote origin refs/heads/master (full 40-hex). Read the workflow file at master: quote its schedule cron, its node-version matrix, and the exact command of the step named "Run tests". Say what Build and Test (build-test.yml, build 24.x) runs that this workflow does not, or the reverse, in one line each with the quoted command.
2. Read the job logs of the newest failed run (compat 20.x AND compat 22.x): print every failing test as FILE :: TEST NAME, and for each the FIRST assertion/error line verbatim (no more than 3 lines per test). If the two node versions fail on the same tests say so; if they differ, print both lists.
3. Bisect by evidence, not by guess: the last success was at 9aba71fe2cbad0c53f3996d01b8991e5bbe40ed4 (09-22), the first failure at 628e9ccf9632b4d7c2e8943a84c9ba42b8d86a27 (09-23). Print git log --first-parent --oneline 9aba71fe..628e9ccf (full 40-hex per line). For each failing test file, print git log --oneline -3 -- <that file> between those two shas, and say whether the file changed in that window (a file that did NOT change points at a dependency or environment cause, say so).
4. Run the failing test files yourself at master on Node 22 if the sandbox allows (node --version printed; npx vitest run <files>): print pass/fail per file. If your node is not 22, say so and print what you ran instead. A local pass where CI fails is a FINDING (environment-dependent), not a contradiction to hide.
5. Name the cause class with the evidence line that proves it, one of: (a) a test that depends on the calendar date (F-S149-TODAY-IS-CALENDAR-DAY-1 class), (b) a Node-version-specific API, (c) a dependency drift (lockfile vs nightly install), (d) a test that needs an env value absent in the nightly job, (e) other, spelled out. If the evidence supports none, print UNMEASURED and what would settle it.
REPLY (on the bus, scout_reply): SCOUT-STATUS-MEASURE-NIGHTLY-COMPAT-S159-1, first line `MEASURE: <cause class letter> tests=<count>` (or `MEASURE: UNMEASURED`).
FORBIDDEN: read-only. No edit, no push, no re-run, no dispatch, no poll task, no cron. Never print an environment value.

END · ORDER-SCOUT-MEASURE-NIGHTLY-COMPAT-S159-1-v1
