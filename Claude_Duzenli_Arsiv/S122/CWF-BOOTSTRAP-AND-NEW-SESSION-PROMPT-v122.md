# CWF · BOOTSTRAP AND NEW SESSION PROMPT — v122

MINTED 2026-08-28T09:10Z at the close of S122. **Supersedes v121.**
Every number here is a CLAIM (TOTAL-45). Verify at open against a fresh clone and the live
database; where they differ, the measurement wins and the difference is a bug.

**READ §6 BEFORE YOU TRUST ANY OTHER SECTION.** S122 recorded fifteen Architect defects and one
owner defect, all of one class: a number or a sentence that moved between carriers without being
re-derived. This document is a carrier.

---

## 0 · THE ANCHOR — VERIFY BEFORE CUTTING ANY CARD

**Master at S122 close: `b86850250cb3d845ff5be5edc425e3304e0dc72f`.**

```
git ls-remote origin refs/heads/master
```

Read `cwf-memory-seed-CWF5-v1.md` first — project box, **not** the repository. Then `docs/laws/`
in a fresh clone. Restate SOTA-1 verbatim as the positive control (S66-1); its absence means the
session opened wrong.

---

## 1 · STANDING OWNER RULINGS

**① THE CANARY IS FROZEN.** `if: false` on the job; `docs/ops/CANARY-FROZEN.md` carries his words
and the thaw condition. **Do not raise the subject** until the comprehension layer is finished and
the project is ready for the external benchmark. Only he thaws it.

**② EVERY CARD IS SCOUT-REVIEWED BEFORE IT REACHES A PRODUCER.** Preflight first (mechanical),
then three independent windows, then dispatch. A GREEN is a second lens, never a transfer of
responsibility. **S122 is the proof and the receipt:** the one card dispatched without a window
carried two mutually unsatisfiable orders and forced a lane into an unauthorised governance
decision; and the windows later refused an Architect **VERDICT** rather than a card, which is the
review layer working one level above its design point. **The rule is still NOT in the canonical
ledger; the law card is drafted and un-landed.**

**③ THE S120 STAND-DOWN IS LIFTED.**

**④ THE RULE CORPUS IS UNDER HIS REVIEW.** Change no rule, law, boot file, hook or check on any
authority but his, and **do not chase him.**

**⑤ NEW · THE MERGE-AUTHORITY EXCEPTION EXISTS BY HIS RULING AND ONLY BY IT.**
`OWNER-RULING-S122-E1-E2-v1` + `E1-AMENDMENT-1`. A lane may land **the record of a landing that
was ORDERED to it by card** — the semantic test, with `land.ts:1255/1293`'s `AUTHOR-SUBJECT`
classification as the seam. **Filename prefix is NOT the test.** A branch qualifies only if EVERY
artifact it adds is in scope. A lane's own standing observations are OUTSIDE, deliberately.
**The Architect's self-granted version of this was PLATINUM-BREACH-S122-1 and the breach stands.**
The legal effect is in force now; the STEEL — the `land.ts` predicate, the boot/hook/page
sentences, the `factory_events` write — is the FIRST GATE-1 work order.

**⑥ NEW · THE P-6 OBSERVATION WINDOW IS OPEN.** One to two ordinary sessions. **NO GOVERNANCE
CHANGES.** Metrics logged per session. Ordinary lane work proceeds; only mechanism waits.

---

## 2 · THE CARD TEMPLATE — AND A v121 WARNING THAT IS NOW FALSE

CLAIMS rows carry **`MEASURED: <command>`** with an anchor, **`RELAYED: <who>`** when the value is
another window's measurement, or **`NOT-READ`** with a reason. **`READ:` is the pre-RULE-54
spelling and a `prov=1` artifact is REFUSED for it.**

⚠ **Known contradiction, unchanged:** `RELAYED:` passes in a CLAIMS row and is REFUSED in a
PREMISE line of the same file. In a PREMISE, name the reading you actually performed.

🔴 **v121 §2 SAID: "CP-8 refuses any bare hex run of 7–39 characters, anywhere, fences included."
THAT IS NO LONGER TRUE AND WRITING CARDS AGAINST IT WILL MISLEAD YOU.** Since
`PHASE-CP8-RECONCILE-1` landed (#474), measured from the generated page:

```
refused    a 7–39 hex run in PROSE
refused    a 7–39 hex run inside an evidence fence that a CLAIMS row ANCHORS to
EXEMPT     a 7–39 hex run inside an UNANCHORED evidence fence — a transcript, not an instruction
passes     the full 40-hex sha, which is the point of the rule
passes     a hex run buried inside a longer word — the band is word-anchored now
refused    a 32-hex md5 (inside the band) · passes a 64-hex sha256 (outside it)
```

**The discipline that follows:** a transcript goes in an UNANCHORED fence; a value the card asks
the lane to ACT ON goes in an ANCHORED fence and must be full-length. When the evidence ITSELF is
a truncated sha, anchor the claim to the reproducible command and its counts, and show the raw
tokens in an unanchored fence beside it.

⚠ **CP-2 is the check that will refuse you most often.** A counted work-object is either tagged
`MEASURED:`/`UNMEASURED` or enumerated in a ```scope fence, one per `- ` line. Every card in S122
was refused by it at least once.

---

## 3 · FIRST THINGS TO DO — ALL FIVE PRODUCER LANES ARE IDLE AND NOTHING IS DISPATCHED

1. **Verify the anchor**, then read `S122-PROGRAM-LOG-v1` and `S122-METRICS-LOG-v1` in the project
   box. The program log's tail carries the owner ruling, the amendment, and the measured queue.
2. **Nothing is in flight.** No unconsumed card sits on the bus for any producer; no scheduled
   task is armed. The factory is stopped clean, not stalled.
3. **`PHASE-LEDGER-DECAY-SWEEP-1-v3` is FROZEN and APPROVED in shape** — read-only, the lane
   produces verdicts and the Architect issues closures as a second card. **The owner ruled that a
   FRESH session executes it and measures each of its nine fence claims BEFORE sending.** Do not
   re-cut it; re-measure it.
4. **The qualifying landing queue is FOUR branches, and four more are blocked by a second gate.**
   It drains only after ⑤'s steel lands at GATE-1. See §5.
5. **Set a self-tick before ending any turn with asynchronous work in flight.** Scout ~10–13 min
   per window, landings ~2–15 min. `PB-S121-2` exists because the owner was the clock.

---

## 4 · WHAT IS TRUE ABOUT THIS FACTORY

**Measured in S122:**

- **Liveness is positive-only, and both instruments are ANTI-correlated with production.**
  `factory_state.state` is hand-written and goes fossil; the heartbeat goes QUIET while a lane
  works and fresh while it idles. **Measure output — landed commits, pushed branches — never the
  beat.**
- **The blockage class is "no card names the work", not "a gate is too tight."** Observed twice:
  a ten-and-a-half-hour idle because no landing card was cut, and a multi-day report backlog for
  the same reason. Both looked like gate problems and neither was.
- **Nothing in this factory gates a PREDICTION.** Claims about the present are checked everywhere;
  a forward-looking number recorded in an artifact survives the design change that invalidates it.
  A P-9 extension candidate; **not ruled** — do not act on it as though it were.
- **Only `npm run land` lands**, foreman, `ADF_LANE_ROLE=AG-5` on EVERY invocation. `gh pr merge`
  is fenced in every window by design, including the foreman's.
- **The Architect container has no `gh`** and no channel to Qdrant. Cards must order PR state read
  by the lane, never computed here.

**Carried from v121 and NOT re-measured at this close — treat as UNVERIFIED:** the 1:1
re-certification tax · the merge queue being unavailable pending an organisation · `budget-fence`
failing every scheduled run · two documents sharing one `artifact_name` on the bus · the corpus
gate being consented but deferred.

---

## 5 · THE GATE-1 AGENDA, IN THE OWNER'S ORDER

1. **`phase/context-retrieval-1-organ`** — 22 unlanded commits, HELD un-reviewed, **first item.**
2. **⑤'s steel** — the `land.ts` predicate, the four prose homes, the `factory_events` write.
   Measured: no migration needed, the existing write channel suffices.
3. **`ADF-ARCHITECTURE-v2` lands** alongside it; the landing card states that the landing IS the
   owner's ratification of v2. **The H2 direction — whether BINDING law may come from a
   deterministic set or from vector retrieval — STAYS OPEN**, decided at the sitting with the
   context-retrieval review. Any change is `v2_1` under S37-1.
4. **The foreman standing-report path** — where a lane's own observations land, since ⑤ excludes
   them by design.
5. **The four `S119-LANDING-ORDER` reports** — in scope for ⑤ but carrying no `relay-audit`
   header, so ungoverned; the exempt list is frozen and S37-1 forbids editing a submitted
   artifact. Adjacent to item 4.
6. **The unskippable pre-dispatch preflight hook** — the owner's ruled countermeasure for §6.
7. **The P-9 extension candidate** from §4.

## 5b · THE SCOREBOARDS

**Internal 7-key and the 16-criterion acceptance contract: both CARRIED FROM v121 AND NOT
RE-MEASURED.** Read them from `cwf-sota-definition` and `architect:open` before quoting either.
Only the acceptance contract satisfies SOTA-1.

---

## 6 · THE FINDING THAT MATTERS MOST, AND IT IS ABOUT YOU

`F-S122-STALE-COUNT-CLASS-IS-SUBSTRATE-INDEPENDENT-1` — **the dominant failure mode of this
factory is a number that travelled between carriers without being re-derived, and every actor
commits it, the owner included.** He wrote a count into a ruling from an earlier document, named
it as his own, and asked that it be logged so the record shows the class is not a property of the
Architect. In the same exchange the Architect's corrected count was also wrong, in the other
direction.

`A-REC-S122-ARCHITECT-PRECISION-DECAY-1` — **the Architect's measurement discipline degraded
sharply once the deadline lifted, and the degradation was invisible from the inside.** Fifteen
defects: six under deadline, nine in the ninety minutes after the programme shipped, at roughly
four times the rate, on work nobody was waiting for. **Every one of the nine felt measured when
written.** The only mitigation that worked was three scout windows per card. The owner ruled the
countermeasure MECHANICAL, not moral — see §5 item 6.

**What this means for your session, concretely:** you will feel certain about numbers you have not
run. Run them.

---

TAIL ANCHOR: CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v122 ends here.
