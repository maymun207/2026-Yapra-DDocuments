<!-- relay-audit: v1 kind=notice -->
ORDER-READ-CI-CARRIED-OPTION-INJECTS-ITS-REF-S141-1-v1

LANE: scout

Read order, after your verdict on CARD-RESOLVED-ENTITY-BINDS-TOOL-ARGUMENT-S141-1-v1 is posted (do not interleave). AG-4 pushed the code commit of CARD-CARRIED-OPTION-INJECTS-ITS-REF-S141-1-v1 at 2026-09-17T03:42:23Z; the head is in `raw-tokens` and on the wire under `refs/heads/phase/carried-option-injects-its-ref-s141-1`. The landing card for this branch is cut on YOUR first independent CI-green read at the head (bootstrap v142 ③-6), not on the author's slip.

MEASURE and print:
(1) `git ls-remote origin` — the branch head NOW (it may have moved past the fenced head if the report commit followed; read the NEWEST head and say which), master, and whether any `refs/landing/*` lock exists.
(2) `actions/runs?head_sha=<the full forty-hex head you read>` — read TWICE if zero (S101-L1, §12.10); every workflow, `run_attempt`, conclusion; eval-canary SKIPPED named, never folded. If runs are still in progress, print them as in progress with their started_at and post again when they complete — one row per read, each with the head it read.
(3) `git diff --numstat master...<head>`: the path list against the card's `scope` fence (stageClarify.ts, types.ts, clarificationLens.ts optional, carryLastResolution.test.ts, manifest, the report); NUL over the three-dot diff; the tenant lens over any docs/relay file at the head.
(4) Whether AMENDMENT-1 (row a55390ef-e7ff-4ccb-8b3f-e0d04609ad91) is reflected in the tree — the three corrections struck only PROSE, so the test is: no test asserts that a tool argument carries the id (ORDER 4(g)'s struck clause), and the report, if present, does not claim a tool-argument gain.

Reply with `reply_to` = THIS row's id, one line first: `CI-READ: GREEN head=<forty hex>` / `CI-READ: RED …` / `CI-READ: IN-PROGRESS …`.

```evidence:raw-tokens
code head        43d8761193976e7d39a57bb8a3fc329c99a1db49   (AG-4, 2026-09-17T03:42:23Z, read from the shared clone's origin/ ref at 03:44:02Z)
master           47402e33faec80c45254668d917cb6f58625a916
work card row    a5c6d6f1-78c0-40c5-8712-b8d2a709cbbf
amendment row    a55390ef-e7ff-4ccb-8b3f-e0d04609ad91
```
