# CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v134

Written WHOLE (A-REC-S101-7), minted LAST at S133 close (F-S119 rule). Supersedes v133. Every line marked [CARRIED-UNVERIFIED] was inherited without re-measurement at close — the S134 Architect verifies it against the live DB, the owner's clone and Vercel before quoting it as fact. **Rewriting a carried claim as settled fact is a new defect committed at open**, and S133 committed exactly that defect in the other direction: it quoted a lane's local green as a CI verdict. See A-REC-S133-7.

## READ FIRST, IN THIS ORDER

1. `cwf-memory-seed-CWF5-v3` (NOT v1 — the box's §0 was stale until v5_9; F-S123-2).
2. this bootstrap — anchor, first jobs, standing rulings.
3. `cwf-open-items-register-v123` — THE ledger's live carrier; §2 is the CWF gate set, §3 the ADF-frozen set, §5 the carriers themselves.
4. `CWF-SESSION-GRAPH-KB-v133` — learned edges; do not re-derive them as insight.
5. `CWF-S133-SESSION-CLOSE-v1` — what landed, what went wrong, state at close.
6. `CWF-S133-FINDINGS-v1` and `CWF-S133-FINDINGS-v2-ADDENDUM` — the S133 findings by name.
7. On demand: `A-REC-S133-4` · `A-REC-S133-5` · `A-REC-S133-6` · `A-REC-S133-7` · `OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1` · `OWNER-APPROVAL-S133-WEB-VALVE-MERGE-1` · `OWNER-WITNESS-S133-WEB-VALVE-LIVE-1` · `S132-CINEKOP-TODO-v2` · `ARCHITECT-CARD-TEMPLATE-v2`.

## ANCHOR (verify at open — §0)

- master `e25f7cd33b7a72d262f7e62c54299c55b17adb4d` — read from the owner's clone `refs/remotes/origin/master` at 2026-09-08T11:42:54Z. **CAVEAT, MEASURED:** the bridge VM's `git fetch` FAILS for want of a GitHub credential (`F-S133-BRIDGE-VM-HAS-NO-GITHUB-CREDENTIAL-1`), so that is a remote-tracking read the LANES refresh, never `git ls-remote`. Re-measure before any card.
- The Architect container has no GitHub credential either (`F-S126-ARCHITECT-GH-403-1`, standing), and the bridge VM cannot run any repo `tsx` script — the owner clone's `node_modules` are darwin-arm64 (`F-S133-BRIDGE-VM-CANNOT-RUN-REPO-TSX-1`). **The S133 workaround, which worked:** stage `scripts/cardPreflight.ts`, `scripts/harnessSelfTest.ts` and `scripts/relayAudit.ts` into the Architect container, `npm i -g tsx`, and run preflight there.
- Bootstrap v134. Project box instructions **v5_9** (cut at S133 close).
- SOTA scoreboards: **NOT re-measured in S133** [CARRIED-UNVERIFIED]. v122 read (B) as 0/16 (PR #506); (A) seven-key is NOT-READ and the S117 figure 6/7 is NOT to be quoted. Read `cwf-sota-definition` and `architect:open` before quoting either.
- SOTA-1 POSITIVE CONTROL — the Architect rewrites SOTA-1 verbatim in its FIRST message (S66-1).

## FIRST JOBS, in order

0. **Set the self-tick before anything else** (`send_later`, re-armed each firing). The S133 form, which is binding: every tick PRINTS the bus read's ROW COUNT and newest `created_at` even when zero (A-REC-S133-5), and its FIRST read is the PRODUCT — `git log -1 origin/master`, the relevant branch heads, and whether the file in question exists — before any card state (A-REC-S133-6 rule 1). A wait without a named timer is forbidden (S102-YASA-2).
1. **Read the MA-RERUN line's product, not its cards.** Two cards are in flight to AG-4: `CARD-MA-RERUN-HARDEN-1-S133-1-v1` (bus 11:46:58Z, md5 `b70ee2d7886c39f4fa9ebb50f89724b7`) and `CARD-MA-RERUN-RUN-1-S133-1-v1` (bus 11:49:28Z, md5 `b69809ed682d4dfbf2c2d5d503e92bfc`). Measure `git ls-remote origin refs/heads/phase/ma-rerun-harden-1-s133-1` and, if it exists, the two greps the run card names. **A lane's silence on the bus is NOT idleness** — see FIRST JOB 2. Reports arrive as BRANCHES.
2. **`F-S133-PRODUCER-HAS-NO-BUS-WRITE-PATH-1` is the first thing to internalise.** `relay_post_from_lane` is defined, granted, tested — and called by nothing; `callVerb` is module-private. A producer CANNOT post a report row. Read `scripts/busDelivery.ts` instead: it classifies a card ACTED when a name its `deliverables` block declared exists on origin. Cure owed: export a caller, or declare `busDelivery.ts` the receipt in `producer.md`. Both are boot/script edits under the ADF freeze and need the owner's named lift.
3. **The WEB-VALVE-1 follow-up card — the citation contract.** The valve landed CLOSED and the contract has never been exercised. `AMENDMENT 43` of the v12 adversary review names a real correctness bug: an unanchored marker fires on the English words "smart"/"Walmart" and would accept a wrong date. Single path: a small card against a **FIXTURE CORPUS of labelled answer strings**, never against prose clauses. This is what twelve card versions failed to settle in prose.
4. **The Architect's owed documents, in this order:** `ARCHITECT-CARD-TEMPLATE-v3` · the bug-bucket merge decision (register §5, proposed twice, still unratified) · `cwf-sota-definition-v1_6` (waits on MA-RERUN-3's report) · the S117 A3 Operator prompt (the ONLY owner-surface item a machine lane executes; unblocked since v32).
5. **Archive push:** the documents repository local `main` was 18+ commits ahead of `origin/main` at S132 [CARRIED-UNVERIFIED — not re-measured in S133]; order the push on the first AG-5 card, fenced by path+ancestry (`F-S132-ARCHIVE-PUSH-FENCES-TIP-1`).
6. Next product cards by SOTA-1's order: `F-S117-CLARIFY-CHILD-LAYER-FALSE-EMPTY-1` re-measure · `F-S132-ASK-RENDERED-TWICE-BILINGUAL-1` render seam · census `workflow_dispatch` runner (owner ruling 5.8 first) · RAG-lane finish definition → F1 baseline · B-FRONTIER-PAIRING-1 · GOLDEN-SET-REPLAYABILITY-1 · EVAL-SPLIT-LAW.

## THE FOUR MECHANICAL RULES ADOPTED IN S133 — binding on the Architect

1. **Read the work before versioning the card about it.** Branch, diff against master, test state. If the work exists and is green, the question is not "what is the next version", it is "why is this not merged". (A-REC-S133-6)
2. **A repeated unchanged measurement is a STOP, not a field.** `UNMOVED`, or any producer signal identical to the previous reading, halts the line. It is never carried forward as a premise line. (A-REC-S133-6)
3. **Every report to the owner leads with what moved in the product.** If nothing moved, the first line reads **ÜRÜNDE HİÇBİR ŞEY KIPIRDAMADI**. A list of card versions is never the lead. This is the one rule the owner can check without the Architect. (A-REC-S133-6)
4. **A branch is never called "green" in prose.** Name the gate list, the head, and whether a CI run EXISTS at that head — `gh api actions/runs?head_sha=<full forty hex>`, S101-L1. A short sha there answers `total_count: 0`, byte-identical to "CI never ran". A lane's local green is reported as "the suite and the type-check, locally, at the unsynced head". (A-REC-S133-7)

Plus the S133 standing mitigations: a proposed path NAMES THE INSTRUMENT that executes it before it is published (A-REC-S133-4); every tick prints both its reads even when empty (A-REC-S133-5); every hand-written bus insert carries the md5 AND sha256 WHERE precondition, so a mistype writes zero rows (fourteen for fourteen in S133).

## STANDING RULINGS / CONSTRAINTS IN FORCE

- **`OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1`** — the P-6 observation window COVERS the S132 adversary mechanism, AND an infinite loop is stopped WHEREVER it is seen. Under it, the adversary gate was lifted by name for three S133 cards (the reseal, the MA harden, the MA run). The mechanism itself is UNCHANGED and still under observation. **A card that lifts the gate must NAME the exemption and cite this ruling; a silent lift is a violation.**
- **Adversary rule (S132)** otherwise stands: no producer acts before the scout's review; RELEASE rows name the version; verdicts are bus rows only; amendments verbatim. Its measured cost in S133: two product lines produced ZERO commits for a whole session because no RELEASE row was ever issued.
- OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1 · OWNER-RULING-S132-CINEKOP-GATE-CWF-SCOPE-1 · OWNER-RULING-S132-ADF-SPLIT-FROM-MEASURED-DEFECTS-1 · OWNER-RULING-S132-MEASUREMENT-RUNNER-IS-CWF-1.
- OWNER-RULING-S130-SEVEN-DISAGREEMENTS-AND-HOLD-1 — Gemini is the sole migration authority; the scout takes no address; the foreman is FIXED at AG-5. OWNER-RULING-S125-SINGLE-LANE-1.
- Canary FROZEN (RULING-S121-CANARY-FROZEN-1; do not raise it). OWNER-RULING-S131-REPORT-ONLY-DRAIN-1 stands. **OWNER-RULING-S132-FOREMAN-REPORTS-STANDING-1 was used in S133** for AG-5's own report landing (PR 518) — [CARRIED-UNVERIFIED whether it had lapsed; v133 said it lapsed at S132 close and the S133 Architect did not re-ask. **This is a named debt: the S134 Architect asks the owner whether the foreman's own report PRs still land under a standing word, before any foreman report is landed.**]
- Merge authority = foreman's own (OWNER-RULING-S122-E1-E2 + E1-AMENDMENT-1); PLATINUM-BREACH-S122-1 stands until the ⑤ steel lands. In S133 the land gate classified the web valve landing `AUTHOR-SUBJECT` (author AG-4, lander AG-5) and the report-only exception was never needed — the seam works.
- **Every master push needs a NAMED owner spend approval** (§5). `OWNER-APPROVAL-S133-WEB-VALVE-MERGE-1` was given and is SPENT. A `workflow_dispatch` on a BRANCH ref is not a master push and needs none.
- Approvals go to the Architect in chat, never into lane windows (`F-S130-OWNER-WORD-IN-LANE-WINDOW-1`). Architect never writes repo files, never gives the owner terminal commands. Every reply ends "SENİN AKSİYON MADDELERİN". Strategy Turkish, artefacts English, times TSİ. One path, never a menu. Every durable document to BOTH the project box and `Claude_Duzenli_Arsiv/S<n>/` in the turn it is written; a capability gap is declared in that turn.
- Security: no lane holds a credential; the parity key lives only in CI secrets; the scout's charter forbids any repository write and any file under `~/.claude/`; no raw stderr stream is uploaded as a CI artefact (the MA harden card enforces this).

## THE SESSION-TO-SESSION CARRY DISCIPLINE (the owner's order, unchanged)

A session is not closed until ALL of these exist in the box AND the archive, each written WHOLE, each carrying its carry-diff by name: `CWF-S<n>-SESSION-CLOSE-v1` · `CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v<n+1>` (minted LAST) · `cwf-open-items-register-v<k+1>` · `CWF-SESSION-GRAPH-KB-v<n>` · the findings carrier. At OPEN, the Architect's FIRST measurement is register §5: a carrier older than the previous session is a finding filed before any card is cut.

## CARRIED CORRECTIONS (act on when the work recurs)

- **S133, measured:** `cardPreflight.ts` accepts a CLAIMS basis of `MEASURED: <command>` / `READ: <command>` / `NOT-READ` and NOTHING else — "CARRIED:" is refused. Every MEASURED/READ row must anchor to a REAL `evidence:<name>` fence that exists in the file; `NOT-ANCHORED` is not a value. Every PREMISE line needs an instrument or the literal `UNMEASURED`. R-TRIP-COUNT fires on counted live-state nouns in prose ("710 test") — put the figures in an anchored evidence fence. R-TRIP-HEX fires on any bare 7–39-char commit-shaped token in prose, and a GitHub RUN ID (eleven digits) trips it — name the run instead of quoting its id.
- **S133, measured:** three cards were REFUSED by preflight before insert and every refusal was a real defect. The pre-dispatch preflight hook (GATE-1 ⓺) would have caught them without the Architect remembering to run it.
- v132/v133 carried corrections stand: card grammar per template v2; worktree/pull-ref traps; box read writes the read lane's heartbeat; the scout reads with `--read` only; `RETURNING encode(sha256(...))` on every insert; a card over ~14 KB is split with `split -b 14000 -d`.
- Bridge: `GIT_OPTIONAL_LOCKS=0` on every git call; `device_request_delete_permission` for the archive folder once per session; the bridge can drop for hours — archive debt is paid by name when it returns.
- The AG-4 window may sit with a stale heartbeat and be alive and working: under CANLILIK YALNIZ POZİTİFTİR a FRESH heartbeat means IDLE and a stale one means working. Read the output, never the beat.

## OPEN AGENDA (beyond the first jobs)

- GATE-1 ⓶ (⑤ steel) · ⓷ (ADF-ARCHITECTURE-v2 landing, H2 direction) · ⓸ (foreman report path) · ⓺ (pre-dispatch preflight hook — its value was measured three times in S133) · ⓻ — all ADF, all [CARRIED-UNVERIFIED].
- `F-S130-RULE-COST-REVIEW-OWED-1` — the owner's standing objection that the rules block progress. **S133 is evidence for it:** a well-formed mechanism with no exit condition cost a whole session's production. Not started (declared).
- The owner package A1/A2/A4/A5 — asked together, once, when the first external criterion is executable.
- The S117 holes — frozen, carried by name, not to be dropped again.

## S133 A-RECs (blind spots — do not re-derive as insight)

`A-REC-S133-4` (a path published without its instrument) · `A-REC-S133-5` (the tick that did not read; an enumeration carried wrong into four carriers; a PREMISE citing the Architect's own row as the scout's) · `A-REC-S133-6` (twenty-two hours reviewing prose about code already written and green) · `A-REC-S133-7` (a reported green that never met CI). **The pattern across all four, and it is the same one S132 named:** the Architect wrote from a DESCRIPTION of a thing instead of reading the thing — a fallback's instrument, a bus row, a branch, a CI run. The mechanical cure is to read the product first, every time, and rule 3 above makes the failure visible to the owner from the first line of any report.

TAIL ANCHOR: CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v134 ends here.
