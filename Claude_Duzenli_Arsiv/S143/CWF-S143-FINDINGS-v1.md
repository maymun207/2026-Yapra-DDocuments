CWF-S143-FINDINGS-v1

S143 · cut 2026-09-20T03:30Z. Each finding lives here AND by name in cwf-open-items-register-v133 until the
owner rules a bucket merge. Every cure is MECHANICAL (A-REC-S122-ARCHITECT-PRECISION-DECAY-1).

## A · PRODUCT

F-S143-OPEN-ITEMS-LIST-HAD-NO-PRODUCT-AXIS-1 — the S143 open list was derived from register v132, which
carries the whole product architecture as one compressed line; not one room of the turn pipeline appeared by
name. Surfaced by the OWNER pasting the S140 architecture table (S112-YASA-1, recorded by name). CURE:
register v133 §6 PRODUCT SEAMS, one row per room with live status and the measuring command; the next list is
derived from that section.

F-S143-BENCH-ITEMS-WERE-BUILT-NOT-UNCARDED-1 — S142/S143 carried "BENCH-A2A-1 / RESET-1 / MOUNT-1 have no
card". Measured: A2A arm built (S99 + SDK), bench-reset endpoint built (api/admin/bench-reset.ts),
backend mount built (b0d81740). The gap is a real RUN, not construction (CWF-S143-ITEM2-A2A-GAP-TABLE-v1).
Class: §12.6 in reverse — a stale carrier line said ABSENT for a thing that EXISTS.

F-S143-A2A-ARM-ANSWERS-UNDER-THE-KALE-PROMPT-1 — the A2A arm runs the chat turn pipeline and therefore the
chat system prompt (`identity`, `safety.b1_scope`: Kale-only scope, standard refusal). A third-party benchmark
task is out of scope by construction. `a2a/runTask.ts:146-153` `language: 'en'` is a detector tie-break
only. Carded as CARD-A2A-BENCH-PERSONA-S143-1-v3 — FROZEN (item 27).

F-S143-MKB-QUESTIONS-ROUTED-TO-ARMES-1 — OWNER-REPORTED (OWNER-RULING-S143-PENALTY-SCOPE-1, his words:
"machineknowledge base kullanilarak cozulecek sorulari su anda cozemiyor herseyi armes back end ile cozmeye
calisiyor"). UNMEASURED by the Architect. Recorded by name as the owner's design-source lead (§12.14).
First measurement in S144: one known MKB question, the tool the turn selects, the retrieval scores that chose
it (Path A table / Path B valve state — pathB.enabled=0 and vector.toolRetrievalMode=0 at 2026-09-19T19:56Z,
and the vector line is unreachable, both CARRIED). Hypothesis NOT to be written as fact: with Path B closed
and vector unreachable, tool choice falls to a path that favours ARMES. Item 28.

## B · FACTORY

F-S143-CARRIERS-STALE-ON-THE-CONTAINMENT-1 — register v132 carried NOTICE-CONTAIN-MERGE-ON-OPEN as
unconsumed/unconfirmed; at S143 open auto-merge.yml read `disabled_manually`, i.e. the containment had been
done. CURE: every carried OPEN item that names a live switch is re-read before it is repeated.

F-S143-PLAN-STATE-CHANGED-BETWEEN-TWO-READS-1 — scout 403 at 17:56Z, 200 at 19:24Z. A reading describes its
instant. CURE: a plan/gate reading older than the current turn is re-read before it becomes a premise.

F-S143-HALF-TAKEOVER-LEAVES-A-DEAD-NONCE-1 — `lane:boot --confirm-takeover` left AG-4's row on a dead nonce
(FW001). Cured in the moment by `factory_reclaim`. The takeover ordering fix is item 15.

F-S143-LANE-CANNOT-UPDATE-DOC-REPO-TRACKING-REF-1 — the lane's push lands (ls-remote proves it) but
`refs/remotes/origin/main` cannot be locked (sandbox EPERM). The Architect sets it with `git update-ref`
after each push. CURE owed: none in the product; recorded so a future reader does not read the stale local
ref as "not pushed".

F-S143-TSX-IPC-EPERM-IN-LANE-WINDOWS-1 — tsx cannot bind its IPC socket in the lane/scout windows; the scout
ran cardPreflight under plain node with a resolver hook. Item 19.

F-S143-REPO-CARD-GATE-FALSE-POSITIVE-CP4-1 — the scout's v2 review: CP-4 flagged a card whose decay trigger
was present in full (gate defect, not card defect). Part of the two-gates-disagree class (§12.13).

F-S143-RULESET-DRIFT-USES-GH-1 — ruleset:drift shells out to gh, absent in lane windows. Item 16.

## C · ARCHITECT ERRORS, BY NAME

- A-ERR-S143-G6-FALSE-ABSENCE-FROM-A-TRUNCATED-QUERY — G6 v1 (empty≠zero / partial≠complete). Corrected v2.
- A-ERR-S143-ESTIMATED-TIMESTAMPS — instants written from estimate; card v1 carried measurement times after
  its own minting. CURE: every instant from `date -u` in the same tool call.
- A-ERR-S143-ASKED-OWNER-TO-PASTE-LANE-SCREENS — violates S102-YASA-1; the bus is the channel.
- A-ERR-S143-ACTED-AHEAD-OF-APPROVAL — corrected by OWNER-RULING-S143-COORDINATE-1.
- A-ERR-S143-CARD-V2-SHIPPED-WITHOUT-DECISION-RIGHTS-AND-WITH-BARE-HEX — the scout's D1/D2. CURE: run the
  REPOSITORY's gate via the scout before calling a card ready (§12.1, §12.13).
- A-ERR-S143-CARD-V2-ROTATED-THE-CHAT-PROMPT-REV — adding ids to SEGMENT_IDS would have moved every chat
  turn's promptRev, configFingerprint and guardrail baseline. v3 redesigned (overlay after the chain).
- A-ERR-S143-LONG-SESSION-TOKEN-BURN — the owner set the 10-turn cap.

## D · OWNER CONTRIBUTIONS, BY NAME (S112-YASA-1, §12.14)

- The S140 architecture table pasted back — exposed the missing product axis.
- "github pro acik olmali" — right; the state had changed.
- "AG sana supabase de ne yaptigini raporluyordu sen oradan okumuyormusun?" — right; the bus holds the slips.
- The operating model (no pollers, "kartını oku", 3-minute timer, 10 turns).
- The MKB-vs-ARMES backend/tool-selection report (item 28).
- The freeze of the bench items behind product stability.

END · CWF-S143-FINDINGS-v1
