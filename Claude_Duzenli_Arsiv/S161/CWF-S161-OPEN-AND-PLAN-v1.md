CWF-S161-OPEN-AND-PLAN-v1
Cut at S161 open, 2026-09-28 02:30 TSI (2026-09-27T23:30Z). Architect. Bootstrap applied: CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v163. Register: v152.

## 1 · WHAT MOVED IN THE PRODUCT SINCE S160 CLOSE
NOTHING on master. master = c58438b59cff4d1d403634b28e44af9b01db6dea (PR 625) — MEASURED: gh.sh branches/master 23:28Z, and Vercel production list (dpl_HFX2angiyhUsXqL31zXr38vm9wyh READY, same sha). Open PRs: 0 (gh.sh pulls?state=open). Scheduled workflows on master: Nightly Compatibility SUCCESS 2026-09-27T13:25:47Z @9fbb0b9b; budget-fence SUCCESS 12:56:59Z @9fbb0b9b; nothing yet at c58438b5 (schedule fires ~13:00Z).
Doc repo: AG-1 ran NOTICE-PUSH-DOC-REPO-S160-4 — origin/main tracking ref moved to 4b9e8726354a91819ae3fb1dd7b971ebe7e1518f at 2026-09-27T23:19:25Z (reflog, lane-written); `git rev-list --count origin/main..HEAD` = 0 at open. The remote 40-hex by ls-remote is UNMEASURED from the bridge (F-S160-BRIDGE-CANNOT-SEE-DOC-REPO-REMOTE-1); the AG-1 window's ls-remote line is the proof — owner relay if he sees it. No bus slip from AG-1 (sandbox DNS, known, row 113).

## 2 · OPEN SEQUENCE, MEASURED
- SOTA-1 sent as the first MESSAGE but not the first TOOL CALL (two reads preceded it). F-S159-SOTA1-NOT-FIRST-CALL-1 third recurrence → CWF-S161-FINDINGS. Fix: project-instructions v5_11 §0 must say "first message = SOTA-1, first read = seed"; owner edit (⚡ later, not urgent).
- Mounts: "2026 - Yapra - DDocuments", "cwf_yaprak", "cwf-architect-ro" (gh.sh, gitw.sh, gh-token) all present.
- Bus after 2026-09-27T17:15:05Z: one to_lane row (NOTICE-PUSH-DOC-REPO-S160-4, 593bc2ec, AG-1, 18:12:15Z) — executed (ref moved). No from_lane rows. Nothing outstanding.
- ORDER 0 (row 112): DONE, nothing to do.
- Quiesce for row 91: pg_stat_activity cwf_lane = 0 at 23:30:05Z; role exists.
- Side-panel task list: 19 rows built from register v152 §6 + v151 §6 OPEN rows.

## 3 · PLAN FOR ONE APPROVAL (owner rule S144: one plan, one "onay")
P1 · Row 91 rotation: owner closes lanes except AG-4, pastes OPERATOR-PROMPT-S161-ITEM91-ALTER-ROLE-1 into Gemini, relays the 4-line reply → Architect cuts NOTICE-ORDER3-LANE-PASSWORD-ROTATION-S161-1 (carries the ALTER UTC time) — pasted to AG-4 by the owner, because AG-4's bus read uses the revoked credential → AG-4 runs 3a–3e of card v5 → owner full IDE quit/reopen (3d) → row 87 measured by one window's digest. Then the Architect reads supabase auth logs over [ALTER, slip] (3e).
P2 · NOTICE-PUSH-DOC-REPO-S161-1 → AG-1 (fresh window) as soon as S161 has local commits (this open record is the first); ls-remote ordered right after the push line (row 118).
P3 · Row 115: F3/F6 rulings — recommendations in §4; recorded as OWNER-RULING-S161-F3-F6-1 once the owner answers; feeds the 114 card.
P4 · Row 114: CARD-ENTRY-FLOOR-REQUIRED-S161-1-v1 (entryFloor required/fail-closed with trace field; unique e2e locator; Rules UI textarea paste fix = the UI/UX half; e2e locators named and fenced, row 116). Repeats PR 625's subject → loop-breaking adversary lift, SAID in the card → AG-4 directly.
P5 · Row 113: CARD-LANE-SANDBOX-ALLOWANCES-S161-1-v1 (pooler DNS, tracking-ref lock, tsx IPC, gh TLS; one card, one subject) → NEW subject → scout → AG-1.
P6 · Row 106: CARD-NUMERIC-SPACE-GROUP-S161-1-v1 → scout → AG-4/AG-2.
P7 · A25 E1, four cards, each NEW subject → scout first, each lands within 30 min of green: E1-a K11 three disjoint held-out sets + T1–T4 regression set + K25 bar (replay/exam code only, admin UI "Eval" tab additions); E1-b K-A fixture MCP server (finance, 30 tools from JSON) + K-A′ second vocabulary; E1-c K-G instrument (case-sensitive armes grep incl. public/, =0 gate, CI); E1-d three-provider billed baseline — each firing needs a NAMED spend approval (S102).
P8 · Close set at owner turn 18–20: SESSION-CLOSE, FINDINGS, register v153 (script concatenation), GRAPH-KB v161, bootstrap v164 last.
Outside this plan (separate yes): any destructive/replacing act, any new spend, any live-routing-path change (S102-YASA-3).

## 4 · ROW 115 — THE TWO RULINGS, ONE RECOMMENDATION EACH
F3 · stage-07 "Liste asla boş kalamaz" (the offered-tool list can never be empty). Since PR 625 the floor is data; an empty floor is a legal state. RECOMMENDATION: the assertion becomes "entryFloorSource is NAMED in the stage-07 span" — one of 'published' (rows read, possibly zero), 'unread' (store unreachable), 'unconfigured' (backend has no floor rows). Empty + 'published' = legal; empty + 'unread' = a named outage that fails closed (OWNER-RULING-S156-FAIL-CLOSED-1), never an unrelated answer. The Tool Matching tab shows the source beside the floor (UI half).
F6 · mcp-catalog under an unreadable rule store. RECOMMENDATION: fail closed — the catalog reports state 'unread' with the error CLASS (no message bytes), offers no tools from code or memory (NO-ARMES-HARDCODE), and the admin UI Tool Matching tab shows a "kural deposu okunamadı" badge with the read time; no retry storm (one read per turn). Consistent with OWNER-RULING-S156-FAIL-CLOSED-1.
Owner answer expected: "F3 onay, F6 onay" or his correction — recorded by name.

## 5 · OWNER TURN COUNT
Turn 1 of ≤20 at this cut.
END · CWF-S161-OPEN-AND-PLAN-v1
