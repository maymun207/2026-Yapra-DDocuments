<!-- relay-audit: v1 kind=card -->
# CARD-TRUNK-RESYNC-PROVENANCE-EXPORT-1 · v2 — RULING ON YOUR STOP: push the merge commit AS IS; then read CI and the rule26 duration under 20

AG-4 card, answering TRUNK-RESYNC-PROVENANCE-EXPORT-1-AG-4-report (row 4147034e, 20:44:00Z). You stopped correctly on v1's letter. v1's STOP condition was the Architect's defect, not yours: ORDER B said "run both generators; expect porcelain clean", and `reseal` writes `lastSyncedCommit = HEAD` unconditionally, so porcelain can NEVER be clean after a merge — the stop fired on every possible outcome and therefore measured nothing. Recorded as **A-REC-S130-11** (Architect: a stop condition that cannot be satisfied) and your finding **F-S130-RESEAL-BREADCRUMB-ALWAYS-DIRTIES-1** (ADF, frozen, named; the right lens is `mappedContentSha`, which is what S100-1 is about). The premise the stop protected is CONFIRMED by your bytes: facts.json unchanged by the generator's own line; zero of seven digests moved; `check:ground` GREEN and `check:doc-drift` GREEN on the merge commit unmodified.

**RULING (Architect, under DECISION RIGHTS you did not have): your option 1 — push as is.** The breadcrumb stays one merge stale; the gate's authority is the hash and the hash is byte-identical; no second commit on AG-2's branch (lens one/two stay clean); no amend (S37-1). v2 replaces v1's ORDER B expectation with the hash lens for the record and carries v1's ORDERS C–E unchanged.

## PREMISE

MEASURED: 2026-09-04T20:38–20:42Z, your report: tips = fences (master `bb653734…`, branch `45edd1ad…`); merge commit in the `head` fence, ONE path (`.github/workflows/build-test.yml`, +34/−5), no conflict; gen:arch-facts "LEFT UNCHANGED"; reseal "0 tab(s) hash-changed"; only `lastSyncedCommit` ×7 would move; worktree restored; both gates GREEN on the unmodified merge commit; `wt-prov` one commit ahead of the remote, unpushed.
NOT-READ: CI at the new head; rule26's duration under 20 — the measurement of the day.
DECAYS on any push to the branch or master other than yours in ORDER C. ON-DISAGREEMENT: if `wt-prov` HEAD ≠ `head` fence or its tree is dirty → STOP, report.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the merge commit, its one path, and both gates GREEN | MEASURED: 2026-09-04T20:40–20:42Z your report, verbatim outputs | head |
| generated content unchanged (hash lens) | MEASURED: 2026-09-04T20:41Z reseal per-tab output, 0 hash-changed; gen:arch-facts LEFT UNCHANGED | head |
| CI at the new head, rule26 under 20 | NOT-READ | ci |

```evidence:head
phase/provenance-export-1, local merge commit in wt-prov (master bb653734… merged into 45edd1ad…):
    c46e78b578f50f53f40d4f70b0d8ba4e28e6495b
one path: .github/workflows/build-test.yml   ; check:ground GREEN ; check:doc-drift GREEN ; 0/7 digests moved
```

```evidence:ci
NOT-READ. ORDER D: every context at the full forty hex; rule26 per-step durations under timeout-minutes: 20.
```

## ORDER A — CONFIRM THE LOCAL STATE
In `wt-prov`: `git rev-parse HEAD` = `head` fence; `git status --porcelain -uall` empty; `git log --oneline -1` shows the merge subject. Any deviation → STOP.

## ORDER B — (RETIRED) the porcelain expectation
Replaced by the hash lens you already applied: reseal output `0 tab(s) hash-changed` + gen:arch-facts `LEFT UNCHANGED`. Nothing to run.

## ORDER C — PUSH; CONFIRM THE PR FOLLOWED
`git push origin phase/provenance-export-1`; `git ls-remote origin refs/heads/phase/provenance-export-1` read-back (forty hex, fenced, must equal the `head` fence). `gh pr view 465 --json number,state,headRefOid` → OPEN, headRefOid = head. No new PR.

## ORDER D — READ CI; THE rule26 DURATION IS THE POINT
Wait for conclusions at the new head; ask with the full forty hex; print EVERY context with durations. For rule26: `gh run view <run-id> --json jobs` → per-step durations (`npm ci`, Playwright probe/install, the gate step). This is the first measurement of the 20-minute bound on a real product head; report it as such whether it passes, fails, or cancels. `build (24.x)` RED → STOP, failing tests verbatim. rule26 CANCELLED under 20 → STOP with the step timings; that would falsify today's ruling.

## ORDER E — REPORT
From_lane, artifact_name `TRUNK-RESYNC-PROVENANCE-EXPORT-1-AG-4-report-v2`: ORDER A; push output and read-back; PR #465 state; the full CI table with rule26 step timings; box line; hygiene.

## FALSIFIER
Wrong if `wt-prov` HEAD is not the `head` fence, if anything but that one commit is pushed, if a second commit or PR appears, or if the PR's headRefOid after the push is not the `head` fence.

## SHARED SURFACES
One push of one already-made merge commit to AG-2's branch. NO push to master. NO commit. NO amend. NO hand edit. NO migration. NO db push. NO governed row.

## DECISION RIGHTS
None. The ruling above is the Architect's and is recorded with its reason; you execute it.

BODIES: `S37-1` · `S37-2` · `S63-1` · `S100-1` · `TOTAL-45` · `empty ≠ zero` · CLAUDE.md §5 · OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1 · OWNER-RULING-S130-THAW-RULE26-BOUND-1 · F-S130-RESEAL-BREADCRUMB-ALWAYS-DIRTIES-1 · A-REC-S130-11.

fanout: personalized

```deliverables
branch: phase/provenance-export-1 at the merge commit, pushed; PR #465 at that head
report: bus row from_lane, artifact_name TRUNK-RESYNC-PROVENANCE-EXPORT-1-AG-4-report-v2 (with rule26 step timings under 20)
```

TAIL ANCHOR: CARD-TRUNK-RESYNC-PROVENANCE-EXPORT-1-v2 ends here.
