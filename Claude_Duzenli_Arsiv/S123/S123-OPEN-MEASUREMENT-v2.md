# S123 · OPEN MEASUREMENT — v2
SUPERSEDES v1 under `S37-1`: v1 stands as issued and this is the correction. v2 does three things and nothing else — it CORRECTS `F-S123-2`, which was wrong in my own hand; it adds the findings the session produced after v1 was written; and it adds the Architect defect record. Every v1 sentence not named here is unchanged.
Originally minted 2026-08-28T10:05Z, at the open of S123, from a fresh clone and a live database.
Every line below is a MEASUREMENT taken this session, not a value carried from `CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v122`. Where a bootstrap sentence and a measurement disagree, the measurement is recorded as the finding and the bootstrap sentence is named as the carrier that was wrong.

## 1 · POSITIVE CONTROL (S66-1)

`SOTA-1` was re-read verbatim from its canonical home, `docs/laws/constitution/SOTA-1.md`, in the fresh clone — not from the project box mirror. It is restated in full in the session's first message. The mirror in `CLAUDE-PROJECT-INSTRUCTIONS-v5_8` §1 and the canonical record agree on the operative sentence.

## 2 · THE ANCHOR — VERIFIED

```evidence:anchor
$ git ls-remote origin refs/heads/master
b86850250cb3d845ff5be5edc425e3304e0dc72f
$ git clone && git rev-parse HEAD
b86850250cb3d845ff5be5edc425e3304e0dc72f
$ git log -1
b86850250cb3d845ff5be5edc425e3304e0dc72f 2026-08-28 09:42:32 +0300
Merge pull request #476 from maymun207/phase/go-landing-s122-1
```

The bootstrap's anchor claim is TRUE. The clone HEAD, the wire and the bootstrap agree.

## 3 · THE LAW CORPUS — VERIFIED, BOTH COUNTS

```evidence:corpus
$ ls docs/laws/constitution | wc -l   -> 16
$ ls docs/laws/rules        | wc -l   -> 59
constitution records, by name:
AGNOSTIC-1 · DERIVED-NEVER-SOURCE · FULL-TRACE · FULLEST-ATTESTED · GOLDEN-LEDGER ·
PLATINUM · S102-YASA-1 · S102-YASA-2 · S102-YASA-3 · S103-YASA-1 · S103-YASA-2 ·
S103-YASA-3 · S112-YASA-1 · S61-2 · SOTA-1 · TOTAL-45
```

`CLAUDE-PROJECT-INSTRUCTIONS-v5_8` §1 claims sixteen constitutional records and §3 claims fifty-nine rule files. Both are TRUE at this master.

## 4 · `npm run architect:open` — ELEVEN FIELDS, TWO UNMEASURED FOR DECLARED REASONS

```evidence:open
branches      total 108 · lane claims 5 · phase 100 · other 2
docs/laws     rules 59 · constitution 16
facts.json    ANCESTRAL, stamped in HEAD's history
census        STALE — live truth 4689 min old against a 60 min bound
orphans       4, ANCESTRAL
open-items    65 items
open PRs      UNMEASURED (spawnSync gh ENOENT)
gates         UNMEASURED (spawnSync gh ENOENT) — build-test, eval-canary, budget-fence, nightly-compat
factory       UNMEASURED (env SUPABASE_ACCESS_TOKEN is not set)
verdict       OK — 11 fields printed, no CONTRACT v1 violation in docs/ground/
```

The factory field was read by a second instrument instead — see §5. The gate and pull-request fields were NOT: the Architect container has no `gh`, the lane is the referee, and no reading of CI state is claimed anywhere in this session.

## 5 · THE FACTORY IS NOT STOPPED. IT IS OPEN, READY, AND IDLE.

```evidence:factory
read 2026-08-28T09:50Z, public.factory_state, live
factory mode  READY            changed 2026-08-27T10:31:57Z by AG-5
AG-1  WORKING   heartbeat  1m51s old
AG-2  WORKING   heartbeat    14s old
AG-3  WORKING   heartbeat  1m13s old
AG-4  WORKING   heartbeat    20s old
AG-5  CLAIMED   heartbeat  1m46s old
operator CLOSED  heartbeat null
scout    CLOSED  heartbeat null
lane refs on the wire: lane/AG-1 lane/AG-2 lane/AG-3 lane/AG-4 lane/AG-5 — five, not zero
```

READ IT UNDER THE LIVENESS LAW, NOT AGAINST IT. The `state` column is hand-written and goes fossil — every producer row was last changed on 2026-08-27 — so `WORKING` is not evidence of work. The heartbeat is ANTI-correlated with production: it goes quiet while a lane works and fresh while it idles. Five fresh heartbeats therefore read as FIVE PRODUCER WINDOWS ALIVE AND IDLE, which is the good case and the actionable one.

The `scout` and `operator` rows are `CLOSED` with a null heartbeat, and that is NOT evidence that no scout window is open: `scout` is a BOX address that is readable and never claimable, so a scout window writes no heartbeat by design. Scout liveness is UNMEASURED at this open and only output can settle it.

## 6 · THE BUS

```evidence:bus
unconsumed rows by address, read 2026-08-28T09:52Z
AG-1 to_lane 98   newest 2026-08-26T02:42Z
AG-2 to_lane 105  newest 2026-08-26T01:22Z
AG-3 to_lane 125  newest 2026-08-26T01:22Z
AG-4 to_lane 100  newest 2026-08-25T12:43Z
AG-5 to_lane 34   newest 2026-08-25T14:28Z
scout to_lane 16  newest 2026-08-27T19:59Z · scout from_lane 36 newest 2026-08-27T20:04Z
operator to_lane 7 · operator from_lane 93
```

`consumed_at is null` IS NOT A DISPATCH SIGNAL AND THE COUNTS ABOVE MUST NOT BE READ AS PENDING WORK. The column is RETIRED as a freshness signal — `cardPreflight` CP-7 refuses any instruction conditioned on it — and `mail-wait` keys its read on a WATERMARK floor. The honest statement is the one the newest timestamps support: nothing has been dispatched to any producer since 2026-08-26, and the bootstrap's "nothing is in flight" is TRUE in substance while its sentence "no unconsumed card sits on the bus for any producer" is FALSE as literally written.

## 7 · FINDINGS

`F-S123-1 · THE BOOTSTRAP CALLS A RUNNING FACTORY STOPPED.` v122 §3 says "the factory is stopped clean, not stalled" and "all five producer lanes are IDLE". Measured, the mode is READY and five lane windows are alive. IDLE is right; STOPPED is wrong, and the difference decides whether this session opens with a boot or with a card. Same class as the finding v122 §6 names: a sentence carried between carriers without being re-derived.

`F-S123-2 · CORRECTED IN v2, AND THE CORRECTION IS THE ARCHITECT'S OWN DEFECT.` v1 said the newest memory seed is `v2`. **MEASURED from the project box's own document list: the newest is `cwf-memory-seed-CWF5-v3`, written at the S117 close on 2026-08-25.** So `CLAUDE-PROJECT-INSTRUCTIONS-v5_8` §0, which orders `v1` read first, points **two versions** behind, not one — and v1 of this document, having searched once and stopped, committed the very class it was written to record. **Listing before claiming an absence is the rule that would have caught it, and it is written in v3 itself, §12 item 7.**

What v3 carries that this session acted without, named because the cost is real: `#29`'s status CHANGED at S117 — it now has a deterministic live repro, `F-S117-CLARIFY-CHILD-LAYER-FALSE-EMPTY-1` · the `factory_claim` deadlock after a legitimate reclaim · that `architect:open` fields 4, 10 and 11 are ALWAYS UNMEASURED in this container by shape rather than by fault · that the Architect cannot push, so releasing a ref is always lane work · and sixteen S117 disciplines, of which item 7 is the one above.

The §0 remedy is a one-line edit and is NOT taken this session: the P-6 observation window forbids governance changes, so it is logged and left for GATE-1.

`F-S123-3 · docs/ground/census.latest.json IS STALE BY A LARGE MULTIPLE.` Live truth is 4689 minutes old against a 60-minute bound. Any card that makes a premise of the census must re-run it first.

`F-S123-4 · GI-009's LAW-CORPUS FIGURE IS STALE IN THE LEDGER.` The item's line says "fifty-five numbered rules and fifteen constitutional records"; measured, 59 and 16. This confirms the sweep candidate's own reading and is one of the things the sweep exists to surface.

`F-S123-5 · THE CARD GRAMMAR'S FENCE SCANNER CANNOT CARRY A NESTED FENCE, AND THIS COST A CARD.` `relayAudit.ts` parses fences with a naive open/close toggle over a line regex. Embedding a card that has its own evidence fences flips the parity: the inner opening line is read as the outer fence's CLOSE, the inner fence's own id is never registered as an anchor, and the content between the flipped delimiters lands in unfenced prose. The first cut of `SCOUT-CARD-REVIEW-10` was refused on exactly those two rules — R-ANCHOR and R-TRIP-HEX — and the refusal was correct. The remedy used here is a reversible line quote plus both digests. This is a grammar finding, reported and not fixed, under the P-6 window and under the candidate's own instruction to report rather than repair.

## 7b · WHAT THE REST OF THE SESSION ADDED — findings v1 could not have carried

`F-S123-6 · A CARD CANNOT QUOTE A CARD.` The grammar's fence scanner is a naive open/close toggle, so a nested evidence fence flips the parity and throws the inner card's own anchor sha into unfenced prose. Measured by being refused on two rules. The remedy used all session is a reversible line quote plus both digests, and it works.

`F-S123-7 · A TRANSCRIPT LINE BEGINNING WITH A PIPE IS READ AS A CLAIMS ROW.` Quoting a TypeScript union member inside an `evidence:` fence reds `R-CLAIM-ROW`, because the claims scanner reaches into fenced lines within the CLAIMS section. Measured on the A23 build card and worked around by rewording, not by weakening anything.

`F-S123-8 · THREE ITEMS CARRIED AS BLOCKED WERE MEASURED DONE, IN ONE SESSION.` The honestbench endpoint (closed at S120 and still asserted open by two carriers), the two backend rows of `A3` (both live since 2026-08-26, still carried as an Operator gate), and the deterministic scorer of `A4b` (built, tested, reported and pushed on 2026-08-27T20:13Z, still called *"the real blocker, NOT BUILT"*). **This is `F-S122-STALE-COUNT-CLASS-IS-SUBSTRATE-INDEPENDENT-1` one level up: not a number travelling between carriers unmeasured, but an ITEM.** The ledger sweep was built to catch this inside the ledger; nothing watches for it outside.

`F-S123-9 · THE PRODUCTION CLONE WAS FOURTEEN COMMITS BEHIND AND NINETEEN LANE WORKTREES HUNG OFF IT.` Measured on the owner's machine once the folder was connected: one clone at the pre-morning master, one modified file, and twenty-four worktree entries of which twenty-three pointed at directories that no longer exist. Every lane reads that tree. Repaired in place — discarded, fast-forwarded to master, pruned to one live worktree — and the branch a card in flight would have collided with is no longer checked out anywhere.

`F-S123-10 · A CREDENTIAL SITS IN PLAINTEXT IN A GOVERNED ROW.` One entry of `mcp_global_settings.servers` carries its API key as a literal inside its `args`, where every sibling uses `apiKeyRef`. Against `ADR-007`. The value is deliberately not reproduced in this document or anywhere else; the row and the field are named and that is enough to act on. The key is the owner's to rotate; the row is a lane card.

`F-S123-11 · A TEST DIRTIES A GOVERNED GROUND ARTIFACT ON EVERY RUN, AND NOTHING WOULD CATCH THE ACCIDENT.` `authorityMatrix.test.ts` rewrites `docs/ground/authority-conformance.latest.md`'s `measuredAt` whenever the suite runs. Measured in two independent working copies. `check:ground` verifies that Markdown ground artifacts have front-matter, a closure and unquoted values — it does NOT verify the stamp's interior, which is exactly `GI-014`'s open remainder. So a stamp nobody ordered can land on the trunk and no gate reds.

`A-REC-S123-1 · THE ARCHITECT RE-TYPED A MEASURED VALUE TWICE IN ONE HOUR.` Two bus rows were written whose bodies did not match the files that had been preflighted. Both times ONE value differed and both times it was a timestamp typed from memory into the insert instead of copied from the file; both times the byte count matched, so only the digest caught it. Both were withdrawn and replaced by a new version that records the defect. **The mitigation adopted is mechanical, not moral: every timestamp and sha that enters a bus row is copied from the file it came from, and no row counts as sent until its stored md5 equals the file's.** Both defects were caught by the cards' own falsifier, which is the loop working — but a loop that catches the same defect twice is measuring an author who has not changed, and the record says so.

## 8 · WHAT WAS DISPATCHED

```evidence:dispatch
row id      b66ab737-bc4c-4d01-971c-194cea910084
address     scout, to_lane, artifact SCOUT-CARD-REVIEW-10-v1
created     2026-08-28T10:02:48Z
body        26584 bytes, md5 f28429c23fa7f3a3bca25f0c053e5652
local file  26584 bytes, md5 f28429c23fa7f3a3bca25f0c053e5652
preflight   --self-test red=proven green=proven, then --check CP-1..CP-11 all OK, GREEN
```

THE PASTE WAS PROVEN, NOT ASSERTED. The body was assembled server-side from the head and the candidate, the quote prefix applied by the database rather than by hand, and the stored row's md5 compared to the md5 of the file the preflight actually read. They are equal, so the reviewed bytes, the preflighted bytes and the dispatched bytes are one object.

## 9 · WHY A SCOUT REVIEW AT ALL, WHEN THE OWNER HAD ALREADY FROZEN THE CARD

The owner froze `PHASE-LEDGER-DECAY-SWEEP-1-v3` read-only, approved its shape, and ruled that a fresh session re-measures its fence claims before sending. That re-measurement is done and all nine agree at this master. Standing ruling ② is separate and absolute: every card is scout-reviewed before it reaches a producer. v1 and v2 were each refused by three windows; v3 was cut FROM those refusals and has itself never been read by one. The owner's approval of the shape is not the second lens ② requires, and S122's receipt for skipping it is on the record. So the review runs, it costs one relay, and the sweep dispatches to a producer only on a GREEN.

## 10 · P-6 METRICS FOR THIS SESSION SO FAR

```evidence:metrics
cards preflighted        2 (the sweep candidate, and the scout review card)
cards refused by preflight 1 (SCOUT-CARD-REVIEW-10 first cut, two rules, fixed and re-measured)
cards dispatched         1 (to scout)
governance changes       0 — the P-6 window is respected
owner action items       0 at the time of writing
architect defects        1 self-caught before dispatch (the nested-fence card, F-S123-5)
```

TAIL ANCHOR: S123-OPEN-MEASUREMENT-v2 ends here.
