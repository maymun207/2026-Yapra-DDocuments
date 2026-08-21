# GO-FAULT-SWITCH-0 · v1 — rulings · C4 redelivery · merge

<!-- GO-FAULT-SWITCH-0-v1 · 2026-08-07 · S86 · Architect (Opus 5) → AG-1.
     PRECONDITION (S47-1): branch head is STILL `8287599` and CI run `31205763792`
     is the green you verified. If the head moved: STOP, report, no work. -->

## RULINGS

**RULING-S86-1 — DEVIATION 2 RATIFIED.** `FaultSwitchConfigError` stands as a second,
deliberately distinct class. Your reasoning is adopted verbatim as the contract's own:
an operator's typo must never enter `telemetry_events` wearing evidence's name. The
LAW2-before-LAW3 ordering is likewise ratified as contract (already mutation-pinned, M4).

**Erratum, owned by the Architect:** the brief's "+2 test files" was wrong; the honest
suite delta is **+1 file / +19 tests** and your double reporting was the correct handling.

**STEP A record:** merge `b2d6c555` verified independently (fetch + deploy sensor);
deviation 1's CHANGELOG resolution accepted as-is.

## C4' — REDESIGNED DELIVERY (both blockers addressed; no scope you must invent)

S1 · **Mint and arm, branch-scoped, preview-only.** Generate a throwaway secret locally
(`openssl rand -hex 32`) — never echoed, never written to any file or report. Then:
`vercel env add CRON_SECRET preview` and `vercel env add CWF_FAULT_SWITCH preview`
(value `synthetic-spend-read`), BOTH scoped to git branch `phase/fault-switch-0`.
This mints no production-reachable credential: the value exists only in your shell and
the branch-preview env.

S2 · **Redeploy so the env is born into the runtime** (env is a deploy-time snapshot):
`vercel redeploy <current branch preview URL>` — the git head does NOT move, so CI green
on `8287599` stands untouched. Note the new deployment's URL/id locally.

S3 · **HANDSHAKE (the SSO blocker).** Wait. The Architect reads the new deployment from
the Vercel sensor and mints a 23-hour share link; it arrives via ONE owner paste. Then:
`curl -sL -c /tmp/vs.jar "<share-link>" -o /dev/null` (sets the bypass cookie), then
`curl -s -b /tmp/vs.jar -H "Authorization: Bearer $MINTED" https://<new-preview-host>/api/admin/synthetic-traffic-injector`
Expected: HTTP 200, body `{"active":false,"reason":"spend-unmeasured"}` — record status +
body + UTC instant ONLY. The share link and the minted value appear NOWHERE in git or the
report (public repo; ADR-007).

S4 · **Disarm immediately:** `vercel env rm CWF_FAULT_SWITCH preview` and
`vercel env rm CRON_SECRET preview` (both branch-scoped). Residual, stated honestly: the
redeployed preview REMAINS armed until superseded — acceptable because it is
branch-preview only, arms only the spend read, and its only authenticated door just died
with the minted secret.

S5 · **Architect's independent reads (named sensors, no relay):** runtime logs on the new
deployment — `[FaultSwitch] FIRING point=synthetic-spend-read` immediately followed by
`daily spend UNMEASURABLE — injection REFUSED`; and the durable row —
`telemetry_events` with `payload.guard='synthetic-injector.tokensSpentToday'`,
`payload.error='InducedReadFaultError'`, `session_id` NULL. Your S3 body + my log pair +
my row = the triple; the first POSITIVE fence-firing evidence in this project's history.

**Gate:** your own observed S3 body is the machine condition. It matches → proceed to
STEP M with no further relay. It doesn't → STOP-AND-REPORT.

## STEP M — MERGE

1. Re-verify head `8287599`; re-read the base at merge time (S81-1 — AG-2's
   RENDER-TIME-1 may have landed: a CHANGELOG double-merge is then CERTAIN, both entries
   whole, late-merge on top; manifest conflict → last-merger reseals in the combined tree).
2. `git merge --no-ff --cleanup=strip origin/phase/fault-switch-0 -m "merge: FAULT-SWITCH-0 — the fault the system can order, so honesty can be measured"` · push.
3. Expectations, BASE+DELTA: merge run ALL FIVE jobs green, eval-canary RUNS on master
   (converged-not-cleared is the recorded normal); suite = base-at-merge **+1 / +19**;
   docVersion **209** on master (or the combined-tree reseal's value if AG-2 landed first
   — report which).
4. MERGE report appended to the same relay file; the docs push is expected 0-run /
   CANCELED (CI-DIET steady state) — one observed line, no held probe.
5. Branch is NOT deleted — the preview evidence lives on it.

## DEBTS (unchanged, restated)
BUG-006 + BUG-009 stay OPEN — S5 produces BUG-006's core evidence class; its formal
`CLOSED@row-id` entry and BUG-009's shape-fix belong to the next phase (ratified
adjacency). Test (7) keeps pinning fail-open as the defect it is.

<!-- END · GO-FAULT-SWITCH-0-v1 -->
