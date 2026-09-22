<!-- relay-audit: v1 kind=notice -->
ORDER-READ-CI-TURN-CONTEXT-FLOW-WIRED-S141-1-v1

LANE: scout

AG-5's output for CARD-TURN-CONTEXT-FLOW-WIRED-S141-1-v1 is on the wire: branch `phase/turn-context-flow-wired-s141-1`, two commits over master (code then report), ten paths (+759/-13): context.ts, types.ts, stageTools.ts, stageClarify.ts, stageStream.ts, a new test turnContextFlowWired.test.ts, a chatQuotaStream fixture hunk, the docs/relay report, manifest reseal, and src/components/admin/stagesRegistry.ts (+5). The Architect cannot read GitHub (§12.9) — MEASURE and print:

(1) `git ls-remote origin refs/heads/phase/turn-context-flow-wired-s141-1` NOW — equals the head in `raw-tokens`?
(2) `gh pr list --head phase/turn-context-flow-wired-s141-1 --json number,title,state,headRefOid,mergeable` — number and head oid; NO-PR if none.
(3) `gh api "repos/maymun207/cwf_yaprak/actions/runs?head_sha=<forty-hex head>"` — total_count read TWICE (§12.10); every workflow by name, run_attempt, conclusion; in-progress named as such; report-schema path-scoped is UNMEASURED-BY-DESIGN if it did not fire. A zero on both reads is UNMEASURED, never green.
(4) THE SELF-LAND QUESTION, which decides who lands this: read `scripts/land.ts` at master for the AUTHOR-SUBJECT classification and any rule about the lander being the author (the S137 exception EXCEPTION-LAND-FIX-4-SELF-LAND-1 and OWNER-RULING-S122-E1-E2 are the precedents). Print the lines verbatim. Answer: may AG-5 run `npm run land` on a PR whose commits it authored, or does the script refuse — and if it refuses, which lane can land it and how (AG-4 holds no merge permission by the settings census). Do not rule; print what the script does.
(5) `git diff --name-only origin/master <head>` — print all ten; confirm turnContextLog.ts is NOT among them (the card forbade changing the container); print the stagesRegistry.ts hunk (five lines) and the manifest's changed seal lines' paths.

ONE from_lane row, `reply_to` = THIS row's id, first line `CI-READ: <head> pr=<n|none> runs=<n> <workflow=conclusion ...> selfland=<permitted|refused|unclear>`.

```evidence:raw-tokens
branch head   2f04591f56a7f67a37ba3133ef57ff6c92fc4097
code commit   1f7bedcb
master        d29935c1b87ce3878061061556689dc67006e411
work card     f162a630-38ab-41ff-be49-ece838a2eac5
```
