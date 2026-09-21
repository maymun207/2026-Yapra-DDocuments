# CWF-S150-FINDINGS-v1

Findings carrier for S150 (2026-09-21, 19:10–21:15 TSI; the owner calls this chat "Session 147", archive numbering S150). Architect-authored at close. Every finding carries HOW it is fixed and WHEN (owner standing rule, 2026-09-10). Findings also live by name in cwf-open-items-register-v139 until the owner rules a bucket merge.

## A · PRODUCT

F-S150-ROUTER-IGNORES-FRAME-METRICS-1 (M-e, MEASURED 16:3xZ from the Q3/Q4 digests)
- What: in Q3 the frame carried metrics ["fire"] but the category router matched only [linestop, andon, metrics]; the scrap tools were never offered. In Q4 "quality" arrived only through conversation stickiness (stickyAdded [factory, quality]).
- In plain words: the part that picks which tools the model may use does not read the metric the user asked about. It got Q4 right by luck of the previous turn.
- FIX: the Q3/Q4 pair is the first golden case of the routing exam (A24 P1-C); the router maps frame.metrics to categories in the same card. WHEN: P1-C, cut after P1-B lands (target S151–S152).

F-S150-PROSE-NUMBERS-UNSOURCED-1 (from the S149 witness; re-measured in S150 at the code)
- What: grounding reports ok:true while prose carries numbers no tool computed; the only numeric guard is client-side and covers table cells only (src/lib/tableCellsFromBytes.ts:207).
- FIX: CARD-A24-P1A-NUMERIC-GUARD-S150-1-v3 (AG-4, bus 18:05:21Z) — a per-turn numeric ledger over the strings the model actually received, a measurement beside the verdict, and an owner-flipped STAMP mode. WHEN: in flight now; lands in S151 within thirty minutes of a green CI run; the owner re-asks Q3 as the live witness.

F-S150-Q4-NO-GROUNDING-SPAN-1 (MEASURED, cause UNMEASURED)
- What: the Q4 digest carries no cwf.grounding span.
- FIX: AG-4 reports what it finds under the P1-A card (named UNMEASURED there); a repair card follows if it is a defect. WHEN: read from the P1-A report in S151.

## B · FACTORY / LANES

F-S150-DOC-REPO-PATH-MOVED-1 — CLOSED
- What: NOTICE-PUSH-DOC-REPO-S149-2 named a path that had become an empty directory; AG-4 refused correctly (SLIP-PUSH-DOC-REPO-S149-2, 16:43:55Z).
- FIX applied: NOTICE-PUSH-DOC-REPO-S150-1 with the measured path; AG-4 PUSHED at 17:27:08Z (ls-remote 3247fce4f6c715575d78114ae43a65ac36d8527a); tracking ref updated by the Architect. CLOSED@SLIP-PUSH-DOC-REPO-S150-1.

F-S150-DEAD-FOLDER-CONNECTION-1 (OPEN)
- What: this session still mounts a third folder "2026 -YAPRA--2026 - Yapra - DDocuments" (no space before YAPRA) from the app's folder-connection record. It is a dead connection; the owner deleted the directory on disk. The Architect never writes to it.
- In plain words: the app remembers an old folder link for this chat; a new chat will not carry it.
- FIX: S151 is opened as a NEW task with exactly two folders connected — the code folder "cwf_yaprak" and "2026 - YAPRA/2026 - Yapra - DDocuments". WHEN: at S151 open (2026-09-22). The bootstrap v152 opens with this.

F-S150-LANE-PRINTED-DB-URL-1 (OPEN, secret exposure)
- What: AG-4's printenv put CWF_LANE_DATABASE_URL (with the cwf_lane password) into its transcript (reported in SLIP-PUSH-DOC-REPO-S149-2).
- FIX: (1) every lane boot text now carries "hiçbir ortam değişkeninin değerini basma" (applied S150); (2) rotate the cwf_lane password as a MACHINE task — AG-4 generates the new password locally, posts only the SCRAM verifier, the Architect runs ALTER ROLE through Supabase MCP, AG-4 writes the new URL into its own env; no human types a secret (owner approval: "lane şifre onay", S150). WHEN: card cut at S151 open, target landed 2026-09-22 (register item 46).

F-S150-SCOUT-MAILWAIT-FETCH-FAILED-1 (OPEN, joins item 30)
- What: the scout's mail-wait failed "initialize: fetch failed" inside the sandbox; the retry with NODE_USE_ENV_PROXY=1 was refused by the harness classifier; the scout read with the sandbox lifted (DIGEST-OK).
- FIX: register item 30 — the lane node scripts honour the proxy (small card). WHEN: small-card block after P1-B; S151–S152.

F-S150-SCOUT-FOUND-SIX-BLOCKERS-PREFLIGHT-FOUND-NONE-1 (MEASURED; confirms 12.1)
- What: P1-A was preflight GREEN (11/11) at v1, v2 and v3. The scout held v1 RED on R1–R4 and v2 RED on R5–R6 — six real defects, each of which would have stopped or misled AG-4 (a verdict change breaking memory classing; the wrong ledger source; a canonical form that destroyed decimals; seven tests that would fail; a stamp that never reached the live screen).
- FIX: none needed — the mechanism worked. Recorded so no future Architect ships a new subject on preflight green. Standing.

## C · ARCHITECT (A-REC class — the Architect's own errors, named)

F-S150-BRIDGE-GIT-STATUS-LEAVES-INDEX-LOCK-1 — CLOSED by practice
- What: a bridge `git status` in the code repo left .git/index.lock; the owner saw it. Removed under a delete grant.
- FIX applied: every bridge git read uses GIT_OPTIONAL_LOCKS=0; after a doc-repo commit, `rm -f .git/index.lock`. Standing in the bootstrap.

F-S150-PATH-FROM-CONNECTION-RECORD-1 — CLOSED by rule
- What: the Architect used the old "2026 -YAPRA" path, taken from the app's folder record and the S149 notices. It did not create the folder. The owner was rightly furious.
- FIX applied: that spelling is forbidden forever (owner memory rule); every path is measured from the live mount at use time. Standing.

F-S150-UNQUOTED-HEREDOC-EVALUATED-BACKTICKS-1 — CLOSED by rule
- What: while assembling the scout v2 order, an unquoted heredoc executed two backtick spans. The draft was never inserted.
- FIX applied: artefacts are written with the file tool or a quoted template; carried into card v3 as an AUTHORING NOTE (12.2). Standing.

F-S150-DEVICE-COMMIT-STALE-CONTENT-1 (MEASURED twice)
- What: device_commit_files (a) did not overwrite an existing device file, and (b) at 18:0xZ wrote an EARLIER content of a staged file (device md5 e549292e… against container md5 b7b983e2…).
- FIX applied: after every device commit, md5 the device copy against the container copy; on mismatch, apply the delta in place on the device and re-measure (done for card v3). WHEN: standing from now; the bootstrap carries it.

F-S150-CARD-MEASURED-AT-AHEAD-OF-CLOCK-1
- What: card v3 says MEASURED-AT 2026-09-21T18:10Z; it was inserted at 18:05:21Z. The stamp was written ahead of the clock.
- FIX: the MEASURED-AT line is written from a clock read at write time, never estimated. The card is immutable (S37-1); the error is recorded here and AG-4 is not affected (no measurement depends on it). WHEN: standing.

F-S150-HEX-BAND-TRIPS-ON-TIMESTAMPS-1
- What: 13-digit epoch-ms values and 32-hex turn ids trip CP-8 like short shas.
- FIX applied: placeholders `<ms>` with the excerpt labelled EDITED EXCERPT (12.4). Standing.

## D · OWNER CONTRIBUTIONS (S112-YASA-1, by name)
- The merge instruction itself: open S150 from BOTH bootstraps (v148 main line, v151 A24 line) and study A24 v1_3 without missing a detail — produced A24-V1_3-ARCHITECT-CAPTURE-S150-1-v1 and the one merged order.
- OWNER-RULING-S150-PARAMS-UI-ONLY-TODAY-1: "Today UI-only but tomorrow entire system parameters will be configurable/backup/restored through env files" — the first half closes item 42; the second half is register item 45.
- Graft in every lane boot ("hiz ve token saver") — carried into card v3 and all boot texts.
- "lane şifre onay" — approval of the machine-only cwf_lane rotation (item 46).

END · CWF-S150-FINDINGS-v1
