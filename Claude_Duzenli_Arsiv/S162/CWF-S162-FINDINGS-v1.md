# CWF-S162-FINDINGS-v1

Cut 2026-09-28T19:2xZ, owner turn 20. Each finding: what, plain words, FIX, DATE. Technical artefact (EN).

F-S159-SOTA1-NOT-FIRST-CALL-1 (4th recurrence) — three reads preceded the SOTA-1 message. FIX: owner edit of project instructions v5_11 §0 ("first tool call = SendUserMessage(SOTA-1)"). DATE: owner, any time; ⚡ given at S162 close.

A-REC-S162-1 — NOTICE-PR629-MERGE-MASTER-S162-1 ordered a hand-resolved package.json union inside a merge commit; the guard rejects that by design (MERGE-HAND-EDIT, mergeGuard.mjs L260-290) and practice 101 already said so. Plain: I told a lane to do the one thing the gate forbids. FIX: every landing notice quotes the guard rule it depends on, by line (12.5 applied to gates). DATE: in force from this close (bootstrap v167 §5).

A-REC-S162-2 — NOTICE-PR630-BACKEND-NAME-GATE-S162-1 said "FENCE-GREW is allowed when the head fence holds"; the guard allows NO growth. Plain: same class as A-REC-S162-1, one hour later. FIX: same as above; and the gate-mandated files (baseline) go into the FIRST fence of any new branch. DATE: in force.

A-REC-S162-3 — the Architect's "onay serial-close" request (turn 16, final-text channel) did not reach the owner verbatim; at turn 18 the Architect wrote that the stop was "his decision". Plain: I put my communication failure on him. FIX: every owner decision request goes through the verbatim ⚡ channel ONLY (already the standing rule; it was not followed), and a stop is never attributed to the owner unless the ⚡ is on record. DATE: in force.

F-S162-GUARD-TRIPLE-LOCK-1 — measured across 629→631 and 630: (1) a hand-resolved merge commit is RED; (2) a fresh branch takes a higher PR number and yields to every lower colliding PR (L504/L521); (3) a fence cannot grow after the first fence. Together: any re-cut loses its queue place, and gate-mandated files added after the first commit are RED. Plain: three sensible rules, combined, freeze every set of PRs that touch package.json. FIX: (a) tonight — one open PR at a time on fresh branches (OWNER-RULING-S162-GET-IT-DONE-1); (b) card CARD-MERGE-GUARD-PRIORITY-AND-FENCE-S163-1: a superseding PR inherits its predecessor's priority (declared `supersedes: #n` in the report), and gate-mandated files (data/gates/*) may enter the fence in a later commit when the gate names them. DATE: (a) tonight; (b) S163 first card → scout → AG.

F-S162-MAIL-WAIT-STALE-ROWS-STOP-LANES-1 — 128 reproduced on AG-1 (6 rows), AG-4 (6), scout (485): mail-wait returns exit 0 on delivered-but-unstamped rows; lanes refuse to loop (correct). Plain: old unstamped mail looks like new mail. FIX: ruling in S162 stamped the AG rows by name; the scout cannot stamp (its read path is read-only, postgres 25006) → card CARD-MAIL-WAIT-ACK-S163-1: `--read` stamps for lanes that can write; scouts get a per-window watermark file or a scout-writable ack verb (12.6: grep consumers first). DATE: S163 (after 631's transport lands so every window can write).

F-S162-GITHUB-BILLING-QUEUE-DELAY-1 — PR 631's jobs queued 18 minutes with "recent account payments have failed or your spending limit needs to be increased". FIX: owner fixed billing (21:11 TSİ). DATE: done; watch the next runs' queue time.

F-S162-BACKEND-NAME-GATE-COUNTS-TEST-MOCKS-1 — the E1-c gate counted `vi.mock('../knowledge/systemActor.js')` + `resolveSystemActor` as two `system` code cells. Plain: a test double of a module whose name contains a backend id is counted as a backend reference. FIX: tonight, baseline rewritten by the instrument with the reason recorded; later, a card to class `__tests__`/mocks separately (E1-c follow-up). DATE: S163 backlog (small card).

F-S162-SCOUT-VERDICT-ADDRESSED-TO-SCOUT-1 — the scout's review verdict is a from_lane row on the `scout` address; a lane gated on `mail-wait <lane> --read <verdict>` never sees it (AG-4 waited 40 minutes for a row that existed). FIX: gates on scout verdicts are removed from cards (v4 pattern: the Architect applies the delta and re-cuts); or the verdict is re-posted to the lane by the Architect. DATE: in force (v4).

OWNER-DESIGN-S162-1 — the owner remembered a GitHub-Actions lane-communication design; measured TRUE: ADF-HEADLESS-LANE-1 (S114-H1, ruled "şimdi değil"). Credited by name (S112-YASA-1).

END · CWF-S162-FINDINGS-v1
