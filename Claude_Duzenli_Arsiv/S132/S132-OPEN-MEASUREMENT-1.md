# S132-OPEN-MEASUREMENT-1 — the factory opened the measured way

Written WHOLE at S132 open, 2026-09-07T05:09Z (08:09 TSİ). Every value below was read this turn; nothing is carried from v132 without a re-read. Surfaces used: Supabase MCP (project `fjbrkimwvtpwoxhziidh`, GAgent-Yaprak), Vercel MCP (`prj_0fDFCY8qXj8Kr5y7n4zmyefjHY8i`, cwf_yaprak), device bridge git reads with `GIT_OPTIONAL_LOCKS=0` on both clones.

## 0 · SOTA-1 POSITIVE CONTROL (S66-1)

Read from `docs/laws/constitution/SOTA-1.md` at `11d6da31644356efdb349f9a9cd9f258b1bdc05a` in the owner's clone (blob `3d8c4a33cd4ee732919841baa985f5949bfb3f73`), restated verbatim in the Architect's first message of S132. Not from the box, not from memory.

## 1 · ANCHOR

| fact | value | basis |
|---|---|---|
| master (production, newest) | `11d6da31644356efdb349f9a9cd9f258b1bdc05a` — PR #504 landing, 2026-09-07T04:51:47+03 | MEASURED: Vercel `list_deployments` target=production newest `githubCommitSha`; owner's clone `refs/remotes/origin/master` (fetched 04:55:23Z) reads the same value |
| v132 ANCHOR `3e1732c2…` | SUPERSEDED (#503 `610a4caa…` → #504 `11d6da31…`), as NOTICE-S131-POST-CLOSE-MEASUREMENT-1 predicted | MEASURED |
| owner's clone local `master` | `a6881c46216ac4f2ca862735948e09c4417a113e` (the gate value; behind origin, expected) | MEASURED: `git for-each-ref refs/heads/master` |
| clone dirt | `M docs/ground/authority-conformance.latest.md` — F-S130-TEST-SUITE-WRITES-GROUND-DOC-1 still open | MEASURED: `git status --porcelain` |
| preflight scripts | `eaed3a5f…` / `4f3cb6c2…` / `4c7f1b28…` — unchanged since S131 | MEASURED: `sha256sum` in the clone |
| `.git/index.lock` | absent | MEASURED |

## 2 · FACTORY STATE (db_now 2026-09-07T05:09:03Z)

| row | state | nonce | heartbeat_at | liveness verdict |
|---|---|---|---|---|
| factory | mode READY (changed 2026-09-06T03:34Z by AG-5) | — | — | — |
| AG-4 | WORKING | `53938e395aa17383bbf2b1a2ae4d33f9da51e0a5` | 05:06:21Z | heartbeat current; NO OUTPUT since S131 → liveness UNPROVEN (F-7: heartbeat proves nothing) |
| AG-5 | CLAIMED | `b798ceea7ac4d84fd62dba8ff4d3f50da19528ab` | 05:06:32Z | OUTPUT at 04:53:58Z (ARCHIVE-PUSH report row) → alive as of that instant |
| AG-1 / AG-2 / AG-3 | WORKING (stale) | S118 nonces | 2026-09-02 / 08-29 / 08-29 | dead rows, unchanged since S118 hand-writes |
| operator / scout | CLOSED | — | — | scout takes no address (SEVEN-DISAGREEMENTS) |

## 3 · BUS

- to_lane unconsumed for AG-4/AG-5: 0. `CARD-FOREMAN-REPORTS-DRAIN-1-v1` consumed 04:44:20Z; `CARD-ARCHIVE-PUSH-S131-1-v1` consumed 04:52:39Z.
- from_lane rows posted once each: `LAND-499-1-AG5-report` 04:31Z · `LAND-HOLDS-REPORTS-1-AG5-report` 04:43Z · `FOREMAN-REPORTS-DRAIN-1-AG5-report` 04:52:22Z · `ARCHIVE-PUSH-S131-1-AG5-report` 04:53:58Z.
- 22 to_lane rows addressed to `scout` (2026-09-04/05) unconsumed — decayed cards, scout CLOSED. Frozen under F-S131-SCOUT-REPLAYS-DECAYED-CARD-1; recorded, not acted on.

## 4 · FIRST JOBS — status at open

1. Open the factory the measured way — DONE (this document).
2. Drain finished — CLOSED@evidence by the #504 landing and the DRAIN report row; the `gh pr list --state open = []` referee read is still owed to a LANE (the Architect has no GitHub credential) and rides the first product card as ORDER A.
3. Archive push — CLOSED@evidence: documents repo `origin/main` = `c23763c6afaeef2c9531044c71a10929880b2fff` (bridge read of the ref after the lane's fetch; the lane's ls-remote read-back is in `ARCHIVE-PUSH-S131-1-AG5-report`). Local `main` = `17ee21fa7e834ccb8c6a07ffc23c4f9d9e1240be` (S131 post-close notice + card) is UNPUSHED and rides the first S132 push together with this file.
4. SOTA scoreboard measurement — OPEN. FIRST PRODUCT CARD, to AG-4; its consumption is also the AG-4 liveness diagnostic.
5. Frozen ADF items — carried, untouched.

## 5 · CAPABILITY GAPS DECLARED THIS TURN

- No project box in this session: the Architect cannot read CLAUDE-PROJECT-INSTRUCTIONS v5_8 and cannot write to the box. Newest box mirror in the archive is `cwf-box-snapshot-S115` (v5_7). Durable documents this session reach the archive only, until the owner supplies the box half.
- No GitHub credential (unchanged): `gh` reads are lane jobs.
- Bridge VM cannot run `tsx` (unchanged): preflight runs in the container on staged scripts.

TAIL ANCHOR: S132-OPEN-MEASUREMENT-1 ends here.
