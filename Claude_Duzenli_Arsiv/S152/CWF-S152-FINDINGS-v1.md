# CWF-S152-FINDINGS-v1

Cut at S152 close, 2026-09-21 ~21:15Z (00:15 TSI 2026-09-22). Every finding carries HOW it is fixed and WHEN (owner rule 2026-09-10).

## A · PRODUCT / SYSTEM FINDINGS

F-S152-DIGEST-SPAN-CAP-DROPS-TAIL-SILENTLY-1 — api/cwf/_lib/observability/digestBuilder.ts:160-166 keeps the first 20 spans per stage and drops the rest with no count; the tail holds the stream verdict and the grounding verdict. Closes register item 48: Q4's "missing" cwf.grounding span was cut by the ledger, grounding ran. Live: 162 digest rows, 19 stage buckets at exactly 20. Scout-2 confirmed the premise and found the client type outside the fence. FIX: CARD-DIGEST-SPAN-CAP-S152-1-v2 at AG-4 (bus 2026-09-21T20:58:20Z) — denominator + spansTruncated stamp + tail kept + admin gap marker. WHEN: AG-4 PR by 2026-09-22 morning; lands under OWNER-APPROVAL-S152-LANDINGS-1 on scout GREEN.

F-S152-LANE-WAKE-IS-THE-OWNER-1 — a Claude Code tab reads relay_inbox only while a turn runs; since the S143 poller ban the owner is the wake. Measured tonight: ORDER-SCOUT-LAND-PR590-S151-1-v1 sat unread ~2 h (19:49Z to the owner's paste at 20:44Z) while #590 was green-and-waiting; that single idle window is the measured reason nothing landed in S150–S152. FIX: CARD-LANE-BUS-WAKE-HOOK-S152-1 (Stop hook + asyncRewake + a named mail-wait mode). State: v3 RED by scout-2 (5 MUST-CHANGE written as exact edits, see F-S152-SCOUT-BUS-WRITE-BLOCKED-1). WHEN: v4 applies scout-2's edits verbatim, EXEMPT (loop-breaking), to AG-4 in S153; land 2026-09-22 evening.

F-S152-HOOK-TIMEOUTS-ARE-SECONDS-1 — scout-2 measured from the 2.1.128 binary that a hook `timeout` is SECONDS; .claude/settings.json's graft hooks carry 8000/10000/15000 (2.2–4.2 hours), written as if milliseconds. FIX: one-line small card, AG-4, after the hook card (same file). WHEN: 2026-09-22.

F-S152-ANTIGRAVITY-CC-HAS-NO-SESSION-ID-ENV-1 — Claude Code 2.1.128 (the AntiGravity extension) never sets CLAUDE_CODE_SESSION_ID for child processes; 2.1.241 (VS Code) does. Any design keyed on it fails in the lanes. FIX: none owed in product; hook v3+ reads identity from the owner's boot text in the transcript. Recorded so no future card repeats it.

F-S152-SCOUT-BUS-WRITE-BLOCKED-1 — at 00:09 TSI scout-2 could not post SCOUT-STATUS-REVIEW-CARD-LANE-BUS-WAKE-HOOK-S152-1-v3 ("relay_post_from_lane'in istediği nonce yok, execute_sql GM-1 reddediyor"), although the same window posted two statuses at 20:51Z and 20:54Z. The owner relayed the verdict from the screen (RELAYED, not MEASURED). Joins register item 17 (F-B scout status writer). FIX: item-17 small card — the scout boot obtains its posting nonce, and a failed post is printed as the third value. WHEN: S153, before the hook v4 lands (the hook reads the bus).

F-S152-BOOTSTRAP-DOC-PUSH-PREMISE-STALE-1 — bootstrap v153 §1.3 ordered a doc-repo push that AG-4 had already done at 20:04Z (after the bootstrap was cut at ~20:02Z). The bridge's "ahead 10" was a stale tracking ref (item 37). Class F-S122-STALE-COUNT. FIX: applied — update-ref after each lane push; bootstrap v154 names the tracking ref's source.

F-S152-DEVICE-COMMIT-OVERWRITE-STALE-1 — device_commit_files onto an existing path kept the OLD bytes twice in S152 (item 49 recurring). Mitigation held: write to a new temp name, mv, md5. No fix owed in the product.

## B · ARCHITECT ERRORS, BY NAME

- A-ERR-S152-PROCESS-OVER-PRODUCT — most of S152 went to two process cards (hook ×3 versions, digest ×2) while #590 and #591 sat green waiting for review. The owner's rule "when he is waiting on code, ship code" was broken. CURE (mechanical): S153 opens by reading the landing queue (green PRs without adversary status) BEFORE any card is cut, and orders the scout on them first.
- A-ERR-S152-HOOK-V1-UNRUN-WAITER — v1 wired a hook around mail-wait without running mail-wait; scout-2 found it refuses --since for every lane with a watermark. 12.6 applied to the consumer but not to the consumer's own behaviour.
- A-ERR-S152-IDENTITY-FOR-AN-UNMEASURED-RUNTIME — v2 keyed identity on an environment variable the lanes' runtime does not set.
- A-ERR-S152-ENGLISH-REPLY — one owner report went out in English (after the model switch at 00:00 TSI); corrected in the next reply.
- A-ERR-S152-STALE-LINE-NUMBERS — digest card v1 carried six line numbers drifted from a sed the Architect did not re-run; scout-2 re-anchored them.

## C · OWNER CONTRIBUTIONS, BY NAME (S112-YASA-1)

- 23:12 TSI: "Sen neden bu kartlari direct kendilerine yazmiyorsun da bana cut and paste yaptiriyorsun?" — exposed that the S143 poller ban had moved the WAKE job to the owner (F-S152-LANE-WAKE-IS-THE-OWNER-1); OWNER-RULING-S152-BUS-WAKE-HOOK-1.
- 23:36 TSI: asked whether the open windows run the new system and whether all need a re-boot — answered: no re-boot until the hook lands, then one /clear+boot each.
- 23:47 TSI: "Ama sen her merge icin benden onay mi alacaksin?" — OWNER-APPROVAL-S152-LANDINGS-1 (named list, one approval).
- 00:04 TSI: "6 saattir master a hic birsey inmedi.... iyimiyiz?" — forced the measured answer: master unmoved ~35 h; the one reason is scout review throughput with idle tabs.

## D · SCOUT-2 CONTRIBUTIONS, BY NAME

Three REDs in ~40 minutes, every defect real: the Stop-hook contract and the timeout unit read from the installed binary; mail-wait's --since refusal and inclusive predicate; the shared-clone identity defect; the missing session-id variable in 2.1.128; created_at non-uniqueness and Date truncation; the first-vs-last boot line; concurrent waiters breaking the cap; stderr/exit races; the digest card's client type outside the fence and six drifted lines.

END · CWF-S152-FINDINGS-v1
