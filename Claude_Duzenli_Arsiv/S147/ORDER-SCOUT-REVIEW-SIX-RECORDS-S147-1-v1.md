<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-REVIEW-SIX-RECORDS-S147-1-v1

LANE: scout
fanout: personalized (one lane, one body)
FROM: Architect, S147, 2026-09-20T09:52Z
OWNER APPROVAL: OWNER-APPROVAL-S146-LAND-FIVE-RECORDS-1 (land, not close) + NOTICE-LAND-VECTOR-CHAIN-REPORT-S146-1 (sixth PR), register item 20.
AUTHORITY FOR THE WRITES: docs/ground/AUTO-MERGE-LANDING-v1.md section (ii). One adversary/scout status POST per head you read, six at most.
Token VALUE never printed, filed or posted. NO POLL OR CRON TASK. Bekleme dongusu yok.

PRECONDITION: git ls-remote origin for each branch prints the head below. If one moved, review the NEW head and say so; if a PR is closed or merged, skip it and say so.
ON-DISAGREEMENT: if your reading differs from any value here, YOUR READING WINS: print both, review what you read, report the difference as a finding.

## PREMISE

MEASURED: 2026-09-20T09:45:43Z, AG-4 slip SLIP-LAND-FIVE-RECORDS-S146-1 on the bus: six PRs, each head CI success, auto-merge ON, only adversary/scout missing; rule26 and eval-canary SKIPPED and named; each diff is its one docs/relay file.
MEASURED: 2026-09-20T09:35Z, git for-each-ref refs/remotes/ in the owner clone: the record branches moved at 12:28 TSI (master merged in).
UNMEASURED: whether each record file is what its PR claims - that is your review.
SELF-INVALIDATION: this premise dies if any head below moves.


## ORDERS

```evidence:heads
PR 567  ec87f8456e80c4a3e24ddbc2dea7a6096c59df00
PR 556  f2aafa2a27f22520a8d1df201d62273ca6b4a33d
PR 553  84676e5bd3b6deee4ca9a14b985a555d760439d7
PR 543  4281f064a9412d6d1672aa45c725bc377f4fe728
PR 523  5ae5d99cc8e34b6b957dca918472355d4a1d1d8d
PR 589  2ee225c783d2f3f56efb67350c1ef61b89e4cbff
```

AUTH PATH: node fetch, osxkeychain token via git credential fill, NODE_USE_ENV_PROXY=1. Not gh. If npx tsx hits EPERM use node --import tsx/esm (your S147 note).

S43-2 FAST GATE, records only. Per PR:
1. git diff --name-only origin/master...<head>: exactly ONE path, under docs/relay/. Anything else = RED, name it.
2. Read the file: no secret, no live factory or line name (TENANT-ZERO), no bare control byte (12.3); relay grammar gate green in CI.
3. CI at the FULL 40-hex head: runs and conclusions; a zero is read twice (12.10); in_progress is UNMEASURED - wait at most 15 min, read at most every 60s.
4. GREEN -> POST adversary/scout state=success on that head, description "scout: SCOUT-STATUS-REVIEW-SIX-RECORDS-S147-1 PR <n> <one line>", target_url the PR url; read back the combined status. RED -> state=failure with the reason.

FORBIDDEN: no merge, no dispatch, no edit, no comment, no enable/disable. Status POSTs only.
REPLY (on the bus): SCOUT-STATUS-REVIEW-SIX-RECORDS-S147-1, first line
ADVERSARY-VERDICT: per PR n=GREEN|RED head=<40-hex> STATUS-POSTED yes|no, all six on one line.

END · ORDER-SCOUT-REVIEW-SIX-RECORDS-S147-1-v1
