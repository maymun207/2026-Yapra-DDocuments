# cwf-open-items-register-v126

APPEND-ONLY. Items leave only by `CLOSED@evidence`, `SUPERSEDED-BY <name>`, or `MERGED-INTO <name>`.

**THIS DOCUMENT DOES NOT RESTATE `cwf-open-items-register-v125`, `v124` OR ITS ADDENDUM, AND THAT IS
DELIBERATE.** Summarising a summary is forbidden by the GOLDEN LEDGER. Those three stand in full, by name,
and every item in them that is not closed below is CARRIED UNCHANGED and UNVERIFIED unless S137 re-measured
it.

ANCHOR AT CUT: master `e95b0fdf4fdb4c53eba3f3561b0eae0ac50f81c5`.

---

## §0 · THE OPENING MEASUREMENT §11 DEMANDS, PERFORMED

`cwf-open-items-register` was at **v125** at S137 open, cut in S136 — the immediately preceding session.
NOT STALE. This is the first session in several in which that opening measurement returns clean, and it is
recorded because §11 makes the measurement mandatory whatever the answer.

---

## §1 · CLOSED THIS SESSION, EACH BY EVIDENCE

**`PR 539` — the foreman's own landing report** (v125 §2) — CLOSED@ master `52d9ba96`, the batch of ten
landing records. It landed in the sweep, addressed to a lane that did not author it, exactly as the item
required.

**`BUS-REPLY-PATH-1`** (v125 §2, row 4 of the owner's list) — CLOSED@ master `0cae062c`, PR 537, under
`OWNER-AUTHORITY-S137-BUS-REPLY-PATH-MERGE-1`. The VOID and its stop are respected: what landed carries the
scout's amendments A2–A7 and the owner's binding condition, the enforced body contract shipping WITH the
address widening rather than after it.

**`TOOL-CALL-TRACE`** — CLOSED@ master `7f53f055`, PR 532, under `OWNER-AUTHORITY-S137-LAND-532-MERGE-1`.

**`REPLAY-EMITTER-AND-MERGE-S137-1`** — CLOSED@ master `8f3ddebd`, PR 529, under
`OWNER-AUTHORITY-S137-LAND-529-REPLAY-EMITTER-1`, at 18:14:14Z — **fifty-three seconds after the landing
card was delivered.** Recorded with its interval because §12.8 sets the standard at thirty minutes and this
is the first landing this factory has measured in under a minute. At master after it,
`api/cwf/_lib/replay/clarificationLens.ts:714` reads
`export const REPLAY_CTX_FIELDS = ['emit', 'frameRoutingEnabled', 'irFrame', 'networkTime'] as const;`.

**`GRAFT-WIRING-1`** — CLOSED@ master `e95b0fdf`, PR 535, 19:45Z. Unblocked from AUTHOR-UNKNOWN by
ADOPTION, not by a re-cut: one file, `docs/relay/GRAFT-WIRING-1-AG4-report.md`, signed as ADOPTER naming
session `24d72668` and the original shas. Owner ruling that authorised the shape:
`AG-4 benimsesin, ayarlara dokunmasin`. See `CWF-SESSION-GRAPH-KB-v137` EDGE S137-E2.

**THE DOCUMENTS REPOSITORY REACHES GITHUB** — CLOSED@ `origin/main` =
`4b773c1e6b7f4f573e6a7674310e5d6fc0846baa`, nine commits pushed by AG-4 at ~18:42Z. This closes the standing
exposure that every governance artefact of the last two sessions existed only on one laptop. **It reopens
below as a RECURRING item, because it is already four commits ahead again.**

**`VERCEL SILENCE AFTER A MASTER PUSH`** — CLOSED@ measurement, as NOT A DEFECT. Last production deployment
`dpl_CZiBSJN…`, READY 18:14:18Z, commit `8f3ddebd`. Subsequent master pushes were docs-only and were
CANCELED by `scripts/vercel-ignore.mjs`, by design. Raised by the owner
(*"vercel son load 23 minutes ago is this normal?"*) and answered by measurement, not by reassurance.

---

## §2 · OPEN, ADDED THIS SESSION

- **`F-S137-THE-ONLY-LANDER-IS-ALSO-A-PRODUCER-1`** — archive commit `469727f`. **THE BLOCKING ITEM AT
  CLOSE.** Three correct rules (`land.ts` author≠lander, `CLAUDE.md` §6a merge-key absence, AG-5 holding the
  only key) meet at one lane and make any product code AG-5 authors unlandable by construction. No gate
  reports this at card-cut time. `#546` is the live instance. **Needs one line of owner routing; it is the
  first order of S138.** Three shapes were put to the owner and none has been answered:
  ① `OWNER-RULING-S137-AG4-MAY-SET-THE-MERGE-KEY-FOR-546-1` — one-off §6a exemption, tonight only;
  ② `OWNER-RULING-S137-AG5-DOES-NOT-AUTHOR-PRODUCT-CODE-1` — the standing cure, and the Architect's
  recommendation; ③ a second merge key — deliberately deferred, it widens the blast radius.
- **`#546 · ASK-RENDERED-TWICE`** — branch `phase/ask-rendered-twice-s137-1`, head `ce3f785e`, PR 546 OPEN,
  MERGEABLE/CLEAN, three workflows success, drift line `no drift -- all 7 narrative tabs synced (mode=head)`.
  **GREEN AND UNLANDABLE.** Held by the item above, not by any red. A HOLD stands to AG-5 (`df516325`): no
  pushes to that branch until the landing closes. `CARD-LAND-ASK-RENDERED-TWICE-S137-1-v2` (`cb4923be`) was
  delivered to AG-4 and REFUSED on route — **and the refusal was CORRECT**, see §4.
- **`A-REC-S137-I-SENT-PRODUCT-WORK-TO-THE-ONLY-LANDER-1`** — the routing criterion the Architect used was
  "who is idle". The criterion is **WHO WILL LAND IT**. Open until a card-cut-time check exists that is
  mechanical rather than remembered.
- **`F-S137-THE-GRANT-IS-WIDER-THAN-THE-RULING`** — archive commit `4b773c1`. An authority granted for one
  landing was carried by the Architect into a shape the owner's words did not cover.
- **`THE ARCHIVE PUSH IS RECURRING, NOT ONE-OFF`** — four commits ahead of `origin/main` at close, unpushed.
  The bridge dropped before the card could be cut. **The card goes to AG-4, NOT AG-5** — see the routing
  item above; this is the same defect class in its cheapest form. Unpushed at close:
  `CWF-S137-FINDINGS-v1` (`ff67f85`), `CWF-S137-SESSION-CLOSE-v1` (`464a980`),
  `F-S137-THE-ONLY-LANDER-IS-ALSO-A-PRODUCER-1` (`469727f`), and one earlier commit, plus the three carriers
  cut at close.
- **`THE BRIDGE IS NOT CONTINUOUSLY AVAILABLE, AND ITS TWO SURFACES FAIL INDEPENDENTLY`** — measured S137:
  the Architect's link to the owner's computer dropped at 2026-09-12T20:52Z, returned 03:02–03:08Z on 09-13,
  and dropped again. Bus reachability (Supabase MCP) survived the whole outage; clone, git and gate
  reachability did not. Any plan that assumes the Architect can read the clone at an arbitrary moment is
  unsound. See `CWF-SESSION-GRAPH-KB-v137` EDGE S137-E5.
- **`BASE64 CARD TRANSPORT CORRUPTS SILENTLY ABOVE A LENGTH`** — an AG-4 notice arrived at md5 `d7541b60…`
  against expected `c1a5eaa6…`; the payload decoded cleanly, because corruption inside base64 does not
  announce itself. Mitigated in-session (760-character chunks concatenated with `||`), NOT fixed: the
  mitigation is a habit, and a habit is not a mechanism. The md5/sha256 `WHERE` precondition is what
  actually caught it.

---

## §3 · CARRIED, AND WHAT S137 DID OR DID NOT DO TO IT

- **`TWO-PREFLIGHTS-DISAGREE`** (v125 §3, §12.13) — **STILL OPEN, RE-INSTANTIATED LIVE.** Local
  `cardPreflight` returned GREEN on all eleven checks for a body the repository's own `mail-wait` refused on
  CP-1, CP-3, CP-4, CP-5. `CARD_GATE=REPORT` printed the refusal and did not enforce it. Which gate is stale
  is UNMEASURED.
- **`CALLER-ABSENT (bus)`** (v125 §3) — **THE TWO READINGS DISAGREE AND S137 RE-MEASURED NEITHER.**
  S133/S134 measured `relay_post_from_lane` as defined, granted, tested and uncalled. v125 §3 measured the
  opposite: it does have callers and files every lane report under `operator`, making the defect AUTHOR LOSS.
  Carried as an explicit disagreement rather than resolved by recency (§12.13).
- **`scout_reply` MIGRATION + NONCE** — the owner ruled it; it is UNBUILT. Panel item #3.
- **API-BANK PLAN SHAPE FOR THE COST ORGAN** — panel item #5, re-measured in S137 and RESHAPED by that
  measurement: `scripts/benchCostPreview.ts` EXISTS and is zero-spend by construction, but it prices
  FIXTURES only, and the string `API-Bank` appears in exactly ONE file tree-wide
  (`docs/relay/SOTA-SCOREBOARD-S132-1-AG4-report.md`). So the item is **"teach the cost organ the API-Bank
  plan shape"**, never "run the script". It is the prerequisite of panel item #6, **whose criterion expires
  2026-11-03**.
- **`cwf-sota-definition` IS ABSENT FROM THE TREE** — measured S137. This is the file SOTA-1 names as the
  ONLY acceptance criterion for v1. Panel item #4 is therefore a SYNC, and until it exists in the tree every
  statement about SOTA coverage is unanchored. Scoreboard (B), the sixteen external criteria, was **NOT
  re-measured in S137**; v122's `0/16` is carried UNVERIFIED. Scoreboard (A), the internal 7-key counter, is
  NOT-READ by instruction.
- **`REGISTER-BUG-BUCKET`** — **v54, NOT ADVANCED in S134, S135, S136 or S137.** By the register's own §11
  test it is STALE for the **FOURTH** consecutive session. v125 called it a pattern rather than an incident;
  S137 adds nothing but another tick, which is itself the finding: a stale marker that is noted every
  session and repaired in none is not being tracked, it is being decorated.
- **PANEL ITEM #7 — PARKED PREREQUISITES** — the owner has not answered which to unpark.
  `OWNER-RULING-S137-SYMMETRY-CLAUSE-FOUR-ROWS-PARKED-1` stands.
- **THE GRAFT'S THREE SETTINGS REMAIN OPEN BY THE OWNER'S INFORMED CHOICE.** Not a defect, not a debt:
  a decision, recorded so a future session does not "fix" it. The Architect's earlier framing of the gap as
  a breakage was withdrawn — the owner's question (*"bunu tüm dünya indiriyor ve kullanıyor bizde neden
  patlıyor?"*) was right and nothing was broken; the real `#535` blocker was AUTHOR-UNKNOWN and unrelated.
  Standing owner instruction, unchanged: **the graft never takes our code, not as-is and not as a summary.**
- **`F-S122-STALE-COUNT-CLASS-IS-SUBSTRATE-INDEPENDENT-1`** — standing.
- **`PLATINUM-BREACH-S137-1-THE-OWNER-IS-THE-OPERATORS-SCHEDULER`** — standing, unrepaired.

---

## §4 · ARCHITECT DEFECT RECORDS OPENED THIS SESSION

`A-REC-S137-I-SENT-PRODUCT-WORK-TO-THE-ONLY-LANDER-1` — routing by idleness instead of by who can land.

`A-REC-S137-I-CALLED-A-WORKING-LANE-ASLEEP-1` — the Architect told the owner AG-4 was asleep and asked him
to interrupt its window. `consumed_at` was 24 seconds after the insert and the clone fetched 8 seconds
later. The action item was withdrawn before the owner acted. §12.11(b), committed by the author of §12.11.

`A-REC-S137-I-ORDERED-A-LANE-TO-BREAK-CLAUDE-MD-6A-1` — **the most serious of the five.** The Architect
ordered AG-4 to set `ADF_LANE_ROLE` in a producer window. `CLAUDE.md` §6a states in terms that the absence
is the FEATURE and the key must not be set there. **AG-4 refused, on §7 stopping condition 5, and AG-4 was
right.** The refusal was acknowledged by name (`NOTICE-YOUR-REFUSAL-WAS-CORRECT-S137-1-v1`, consumed
03:07:07Z). The scout's earlier ruling on the same seam was also incomplete. Read §12.15's closing line
before assuming the Architect is the careful one.

`A-REC-S137-I-ASSERTED-NO-LANGUAGE-SIGNAL-EXISTS-1` — the Architect claimed no language signal reaches the
turn. `ctx.language` comes off the request body in `api/cwf/chat.ts`, typed `string | undefined`. The
single-negative-probe class, S102's second half. Corrected inside the card itself.

`A-REC-S137-I-FENCED-A-CARD-TO-A-DEAD-TIP-1` — the landing card for `#546` v1 fenced to a head superseded
three and a half minutes before the row was minted; the scout further measured that superseded head's runs
as CANCELLED, which is neither pass nor failure. v2 re-fenced to `ce3f785e`.

`A-REC-S137-I-DECAYED-MY-OWN-FENCE-WHILE-THE-SCOUT-READ-IT-1` — a ninth archive commit landed during review
of a card fenced to the count. Notified by name; nothing lost, by luck.

`A-REC-S137-I-TICKED-FOUR-TIMES-ON-AN-UNMOVED-MEASUREMENT-1` — closed by a MECHANICAL rule, not a
resolution: **two consecutive unmoved measurements are a report and a finding, never a third tick**, and
**every card insert arms its own wake in the same tool block.**

`A-REC-S137-I-SAID-BUILD-RUNS-FIVE-GATES-1` — `npm run build` runs SIX steps: `tsc -b`, `typecheck:api`,
`gen:arch-facts`, `check:ground`, `vite build`, `check:doc-drift`. Corrected by the scout.

---

## §5 · CARRIERS AND THEIR VERSIONS AT CLOSE

- CLAUDE-PROJECT-INSTRUCTIONS — **v5_10** (unchanged this session)
- CWF-S137-SESSION-CLOSE — **v1** (archive commit `464a980`)
- CWF-S137-FINDINGS — **v1** (archive commit `ff67f85`)
- CWF-SESSION-GRAPH-KB — **v137** (was v136)
- cwf-open-items-register — **v126** (this document; v125, v124 and the v124 ADDENDUM stand in full)
- CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT — **v138**, cut LAST, anchor `e95b0fdf…`
- REGISTER-BUG-BUCKET — **v54**, NOT ADVANCED in S134, S135, S136 or S137. FOURTH consecutive stale session.

---

## §6 · RULINGS AND AUTHORITIES OPENED THIS SESSION

`OWNER-AUTHORITY-S137-LAND-532-MERGE-1` ·
`OWNER-AUTHORITY-S137-BUS-REPLY-PATH-MERGE-1` ·
`OWNER-AUTHORITY-S137-LAND-529-REPLAY-EMITTER-1` ·
`OWNER-AUTHORITY-S137-LAND-ASK-RENDERED-1` (granted; **the landing it authorises has not happened**, held by
§2's routing item — the authority is live and unspent) ·
`OWNER-RULING-S137-SYMMETRY-CLAUSE-FOUR-ROWS-PARKED-1` ·
the graft adoption ruling, in the owner's words: `AG-4 benimsesin, ayarlara dokunmasin` ·
the documents-repository standing instruction, in the owner's words: everything is written to LOCAL git
first, and a LANE syncs local to GitHub — the Architect never pushes.

## §7 · STANDING RULES ADOPTED IN-SESSION, MECHANICAL

1. Two consecutive unmoved measurements are a REPORT and a FINDING, never a third tick.
2. Every card insert arms its own wake in the SAME tool block.
3. Card bytes are transported ONCE, into the bytes-for-review row; the seal is prepended IN THE DATABASE.
4. A card's route is chosen by WHO WILL LAND IT, never by who is idle.

END · cwf-open-items-register-v126
