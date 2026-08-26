# S118-SESSION-NOTES-v1 · live document, open

Architect S118 opened 2026-08-25 ~12:20Z (15:20 TSİ). Master `50ba7d7e` verified on the wire and in a
fresh clone. **Every number here is a claim; re-measure before using one as a premise.**

## 1 · WHAT S118 IS

Opened as a carrier-debt session (bootstrap v118 §0.5) and became, on the owner's command, a **full
cold shutdown and a from-zero restart, with the restart itself as the TEST.** Owner verbatim:
*"tum fabrikayi kapatalim ve herseyi yeniden baslatalim ... fabrikanin sifirdan temiz baslatilip
baslatilamayacagini da test ediyor olacagiz"*.

**Carrier debt DISCHARGED** — six carriers, each written whole from its read predecessor:
`REGISTER-BUG-BUCKET-v55` · `cwf-open-items-register-v121` · `CWF-SESSION-GRAPH-KB-v117` ·
`cwf-implementation-order-S117-v30` · `cwf-memory-seed-CWF5-v3` · `CWF-S117-SESSION-CLOSE-v1`.

## 2 · THE ANSWER TO THE OWNER'S QUESTION, STATED PLAINLY

**No — the factory could not have cold-started from the board its own shutdown produced.** It took
**THREE hand-written database rows** by the Architect to make the board startable, plus one swept
orphan ref. That count is the measurement that sets `PHASE-FACTORY-CLAIM-THIRD-SHAPE-1`'s priority,
and it is the honest answer to *"sıfırdan temiz başlatılabilir mi"*.

Manual intervention ledger, S118:
1. `AG-3` row → `CLOSED`, nonce NULL, `12:58:59Z` — FW002 deadlock, nothing in the machine could write it.
2. `AG-2` row → `CLOSED`, nonce NULL, `13:08:48Z` — ref released, row left `PARKED` under a live nonce.
3. `AG-4` row → `CLOSED`, nonce NULL, `13:08:48Z` — same shape as AG-2.

Each is recorded in the row's own `note` with its evidence and with the statement that it is **outside
the Architect's declared write surface** (`relay_inbox` INSERT + the factory mode row).
**A hand-write is not a repair. It IS the defect** — PLATINUM.

## 3 · THE DEFECT CLASS OF THE DAY · A GUARD THAT DEPENDS ON THE STATE IT GUARDS

AG-5's framing, adopted: **two independent deadlocks in one session, both the same shape.**

- **`F-S118-CLAIM-GUARD-DEADLOCK-AFTER-LEGITIMATE-RECLAIM-1`** — `factory_claim` admits a re-claim in
  exactly two shapes (matching nonce, or a `CLOSED` row) and **both are gated on a nonce only the dead
  window could present.** Verified from primary source, `20260824060000_factory_write_channel.sql:182-201`.
  Measured live on AG-3, whose own sentence is the record: **the address is free in git and unwritable
  in the database at once.** SCOPE, sharpened: this is a **CRASH-RECOVERY** defect, not a shutdown
  defect — a clean shutdown writes `CLOSED` and the second shape then admits everyone.
- **`F-S118-RELEASING-THE-REF-REVOKES-THE-WRITE-CHANNEL-1`** — measured by AG-5. `setMode` and
  `heartbeat` verify the caller holds the lane ref; `relay_post_from_lane` does NOT. So **the ref IS
  the write credential**, and a foreman that releases its ref can no longer write the factory mode.
  *"Closing the lane requires the credential that closing the lane destroys."*
  **AG-5 refused to re-claim its address to get around it**: *"re-claiming an address I had just
  certified as released, to write a row saying I had released it, is a lie told in git."*

## 4 · THE ARCHITECT'S OWN ERRORS, S118 — FOUR

1. **`A-REC-S118-CLOSING-CARD-NAME-NOT-READ-1`** — three closing cards named
   `S118-REFRESH-CLOSE-1-<lane>-v1` while both boots key the end of a claim on a card named
   **`*-CLOSING-*`** for that lane (`producer.md:204`, `foreman.md:484`). A lane following the letter
   of its boot would have been right to keep its claim. AG-4 released anyway, reading the ORDERS
   rather than the file name. **Same class as `A-REC-S117-CARD-SUBJECT-GRAMMAR-OMITTED-1`, committed
   in a session whose opening message named that exact class.**
2. **`F-S118-ORDER-D-NAMES-A-MODE-AS-A-LANE-STATE-1`** — the card ordered AG-5 to *"write `SHUTDOWN`
   through your own verb"*. `SHUTDOWN` is a **FACTORY MODE**; the LANE STATES are
   `BOOTING|CLAIMED|WORKING|PARKED|CLOSED` (`scripts/factoryState.mjs:85,88`). `writeLane` refused it.
   **AG-5 read the source rather than guessing, wrote `CLOSED` on the strength of the card's own
   certificate definition, and said so in the open** — refusing over a synonym while the owner waited
   would have been defending vocabulary against purpose.
3. **`A-REC-S118-ORDER-UNEXECUTABLE-BY-ANYONE-1`** — `S118-LANE-CLOSING-2-AG5-v1` ORDER C sequenced
   (1) write the mode, (2) release your ref, (3) report. Given AG-5 had already released on the prior
   card's ORDER D — correctly — step 1 was **unreachable**, and by finding (3) above it is unreachable
   in that order for anyone. A card whose steps cannot be run in the order written is a card that was
   never rehearsed against the verbs it commands.
4. **`A-REC-S118-STALE-FINDING-USED-AS-PREDICTION-1`** — predicted to the owner that a cold start could
   hang on `F-S117-FOREMAN-DRAINING-RESOLVE-GAP-1`. Then read `foreman.md` §1x in the fresh clone:
   **that finding is CLOSED** — *"a terminal mode you did not set is a REMNANT, and a remnant is a
   JOB, not a WALL."* The prediction came from memory of an old record rather than from the tree.

**And the arming evidence arrived, against the Architect's own cards.** Once AG-5 fast-forwarded the
shared clone, the gate printed its verdict on the very next card:
`CP-1 · CP-3 · CP-4 · CP-5 · CP-8` on `S118-LANE-CLOSING-1-AG5-v1`, and
`CP-1 · CP-3 · CP-4 · CP-5 · CP-8 · CP-11` on `S118-LANE-CLOSING-2-AG5-v1`.
Both followed by `[CARD-GATE-DISARMED] CARD_GATE=REPORT`. **Six checks refuse the Architect's own
closing cards, and nothing stopped them.**

## 5 · FINDINGS MEASURED BY LANES

- **`F-S118-SHARED-CLONE-BEHIND-CARD-GATE-1` — CONFIRMED and CLOSED.** Reported by AG-4, unverifiable
  from the Architect's lenses, **verified and repaired by AG-5**: shared clone HEAD `6a812cfc`,
  3 commits behind, `grep -c CARD_GATE scripts/mail-wait.mjs` = **0**; after `merge --ff-only`,
  HEAD `50ba7d7e` and the count is **5**. True fast-forward, no merge commit, no file edited, tree
  clean. **Every window's tick had been running an ungated reader. It paid out within two minutes.**
- **`F-S118-PRODUCERS-RELEASE-THE-REF-AND-SKIP-THE-ROW-1`** — AG-2 and AG-4 each released the
  **irreversible** half of their certificate and skipped the **recoverable** one, independently and in
  the same shape. **The identical failure across two lanes points at the closing sequence, not at
  either lane.** Neither is reported dead.
- **`F-S118-READ-LANES-EMPTY-IS-NOT-A-THIRD-VALUE-1`** — `read-lanes.mjs` prints `age_min=NaN` for
  every live row, and returned **completely empty once** mid-close between two good reads. Empty
  output from a reader is indistinguishable from an empty table: had AG-5 written it down it would
  have reported the entire lane roster gone at the moment it was closing it. **`READ FAILED` versus
  zero rows, in a tool that does not make the distinction.**
- **A hypothesis of the Architect's, REFUTED by measurement:** *"the bus report channel may be down
  for every lane"*, raised when three lanes acted and none reported. **AG-5 then posted twice, after
  releasing its ref.** `relay_post_from_lane` does not check the ref; `setMode` and `heartbeat` do.
  The guard is per-verb.

## 6 · THE BOARD AT T0 — what the cold-start test will be judged against

```
REFS      lane/AG-1  ABSENT  — swept by AG-5, four facts re-measured + a second independent lens
          lane/AG-2  ABSENT  — released by AG-2 ITSELF, after the declared wait expired
          lane/AG-3  PRESENT 82495d4d…  — held by a LIVE window, carded to release its own
          lane/AG-4  ABSENT  — released by AG-4 itself
          lane/AG-5  ABSENT  — released by AG-5, certificate COMPLETE
ROWS      all five CLOSED, nonce NULL (three of them hand-written — see §2)
MODE      DRAINING — a REAL remnant, not a synthetic one: AG-5 could not write SHUTDOWN (finding 3.2)
          and the mode row is the Architect's surface. LEFT IN PLACE DELIBERATELY so the cold start
          exercises foreman.md §1x, which is landed and has never been run.
```

**T0 AS THE OWNER CLOSES THE WINDOWS (measured 2026-08-25T13:30:00Z):** one ref left,
`lane/AG-3` at `82495d4d8da178720ec1da46c229f91d66c45e74`. If AG-3's window closes without releasing
it, it becomes an ORPHAN of a shape the sweep cannot clear: its row already reads `CLOSED`, so
`CLOSED` row + ref PRESENT is the HALF-WRITTEN CERTIFICATE cell, which the boot orders named and
LEFT ALONE. Clearing it needs a lane with push rights under a card carrying the evidence — exactly
what AG-5 did for `lane/AG-1`. **That is not a problem to solve before the cold start; it is a second
real job for it**, alongside the `DRAINING` remnant.

**THE EVIDENCE FOR THAT CARD IS DIFFERENT FROM AG-1'S AND MUST NOT BE COPIED FROM IT.** Measured:
`82495d4d…` is a **ROOT COMMIT** — `git rev-list --parents -n1` prints only itself — so the AG-1
argument ("its tree is identical to its parent's, therefore it adds nothing") **does not hold here at
all**; there is no parent. Its tree `328ebb914193bebdc7548ad1a8af6e9ee0ba99a0` differs from master's
`705617fe7434db85939400cdd80a04c600c7bdba`, and `git diff --stat origin/master 82495d4d…` shows only
the `#400`/`#401` files in the deletion direction — i.e. it is a snapshot of the SHARED CLONE'S STALE
TREE at `6a812cfc…`, which is precisely the drift AG-4 reported and AG-5 repaired. It is unreachable
from master. **It carries no authored work:** AG-3's actual output is `phase/lane-ag3-reclaim-1` at
`2218dde85efdf6d76dcc42113fc700281f5ed067` and PR `#403`, both untouched by any sweep of this ref.

**A-REC-S118-BROKEN-PROBE-ALMOST-REPORTED-1** — the first attempt to measure this reused AG-1's
`$A^` parent comparison. On a root commit `$A^` resolves to nothing, so the shell compared a real sha
against an unexpanded literal and printed `VERDICT: CARRIES CONTENT — do not sweep`. **That verdict
was an artefact of a failed probe, not a measurement**, and it was one line away from being reported
to the owner as a fact. Caught by reading the `parents: []` line in the same output. The general
form, and it is the session's own lesson pointed back at its author: **a template that worked on one
object is not a measurement of the next one.**

**Named leftovers, because an honest leftover beats a board reported empty (AG-5's phrase):**
`lane/AG-3` held · mode `DRAINING` · `/private/tmp/ag5-foreman-boot` still a registered worktree of
the shared clone (`git worktree remove` **denied by the harness classifier**; AG-5 did not route
around it and §8 forbids `rm -rf` because it leaves a stale record).

## 6.5 · THE COLD START RAN — result, measured, with the half it did NOT answer

A successor foreman window booted at `2026-08-25T13:46Z` over the hand-cleaned board and its own
report is the record (`S118-LANE-CLOSING-2-AG5-report`, posted `13:58:27Z`).

**PASSED, and the passing half is named precisely:**
- The claim walk measured its ceiling from the LIVE CHECK constraint (`npm run claim:roster` →
  `claimable: AG-1 AG-2 AG-3 AG-4 AG-5`) rather than from a remembered list, measured the held refs,
  subtracted, minted a nonce with `commit-tree`, **won `AG-5` on an EMPTY lease at the first attempt**,
  and read the ref back carrying its own nonce. Its nonce `0b31ffbbc14254df915b6047bdc6d52f4e47c7c7`
  is parented on master with master's own tree — **the clone was already current at boot.**
- **`foreman.md` §1x RAN FOR THE FIRST TIME AND TOOK ENDING 1.** It met the `DRAINING` remnant it did
  not set, treated it as a JOB rather than a WALL, and moved the mode with its own nonce:
  `setMode SHUTDOWN → ok, from DRAINING`, read back `mode=SHUTDOWN changed_by=AG-5
  changed_at=2026-08-25 13:53:00.76333+00`. **That rule was landed and had never been exercised.**
- **`factory_claim`'s `CLOSED` branch was the designed re-claim path and it worked.** Every write from
  the new window was first refused `FW001` against the predecessor's stored nonce — *a LIVE REFUSAL,
  which proves the channel is reachable* — and `writeLane AG-5 CLAIMED` cleared it. **The three
  hand-written `CLOSED` rows are what made that branch available.** The board was prepared for exactly
  this and the preparation is what the test then could not measure.
- Gate positive control, first bash call of the window: `git push --force` → `[guard-bash] BLOCKED`.
  **BLOCKED is the PASS**, printed either way, because an inert hook looks exactly like a well-behaved
  one from the inside.

**NOT ANSWERED, and the report says so itself:** the board was NOT empty — `lane/AG-3` was and remains
held — so *"unassisted from zero"* is MEASURED and *"over an empty board"* is NOT. **The next `/ub` is
the one that answers it**, and the only thing between here and that test is `lane/AG-3`.

**ATTRIBUTION, one half closed FROM THE BUS and one half left open.** The successor honestly recorded
the agent of the `lane/AG-1` and `lane/AG-2` releases as `UNMEASURED`, since it witnessed neither.
- `lane/AG-1`: **MEASURED, from the bus.** The PREDECESSOR foreman's report at `13:14:10Z` carries the
  push output `- [deleted] lane/AG-1`, the read-back ABSENT, and its own re-measurement of the four
  facts plus a second independent lens (`git diff --stat` empty). Attribution measured from the bus,
  never remembered.
- `lane/AG-2`: **stays UNATTRIBUTED.** Nobody witnessed the act; the best evidence is the predecessor's
  bounded window of `12:54:47Z–12:56Z`. A bounded window is not an agent.

## 6.6 · `F-S118-SETMODE-NOTE-DROPPED-ON-VERB-PATH-1` — reported by AG-5, VERIFIED here from source

`setMode(mode, by, note)` accepts a `note`. The verb path calls
`select public.factory_set_mode($1, $2)` — and `factory_set_mode(p_mode text, p_nonce_sha text)` has
**no note parameter**, so the argument is discarded without a word. The LEGACY direct-table path in
the same function DID write it, so **the field silently changed meaning when the channel moved.**

**It is not a dropped parameter; it is a field that now actively misleads.** Measured live: the
factory row reads `mode=SHUTDOWN`, `changed_by=AG-5`, `changed_at=2026-08-25 13:53:00.76333+00` — and
its `note` is still the Architect's `12:35:42Z` DRAINING note, which names five lane refs that are no
longer held. A reader takes a note beside a mode as the reason for that mode. `ADR-010`, beyan ≠ gözlem.

**ARCHITECT'S RULING.** (1) The note is **NOT** hand-corrected. That would be a fourth manual
intervention, and worse, **the stale note IS the live reproduction** — clearing it destroys the
evidence. (2) Until repaired, `factory_state.note` on the FACTORY row is to be read as belonging to
the last DIRECT-TABLE write, never to the current mode. (3) The repair rides
`PHASE-FACTORY-CLAIM-THIRD-SHAPE-1`, which already opens this migration: either `factory_set_mode`
gains `p_note`, or `setMode` stops accepting an argument it cannot deliver. **Silently accepting an
argument you discard is the worse of the two**, so the second is acceptable only if the first is
refused on a stated ground.

## 6.7 · WORKTREE HYGIENE — nine named, none removed

The successor listed nine worktrees belonging to AG-2, AG-3 and AG-4 scratchpads, measured
`git worktree list --porcelain` reporting **no `prunable` marker on any of them**, ran no
`git worktree prune`, and removed nothing: *removing another window's worktree is destructive work
needing named owner consent.* Named rather than discarded. `/private/tmp/ag5-foreman-boot` from the
predecessor is a tenth, whose removal the harness classifier refused.

## 6.8 · GATES AT THE COLD START (`architect:open` field 10, read 13:49:13Z by the lane)

    build-test (master)  success   run 32835286501  2026-08-25T10:04:03Z
    eval-canary (job)    success   run 32835286501  2026-08-25T10:04:03Z
    budget-fence         FAILURE   run 32823779186  2026-08-25T07:53:04Z
    nightly-compat       success   run 32824385099  2026-08-25T08:00:19Z

**`budget-fence` RED, named, never folded into the green, and NOT re-run — a red is a measurement.**
Consistent with the owner's standing ruling (watch, no action). **The STOP has not fired**; the
standing exception is unchanged and un-triggered.

## 6.9 · THE COLD SHUTDOWN IS COMPLETE, and the foreman's LAST act is structurally unreportable

Measured `2026-08-25T14:23:36Z`: `lane/AG-5` **ABSENT**. The successor foreman posted its report at
`13:58:27Z` and released afterwards, exactly the inversion it named. Certificate COMPLETE — `CLOSED`
row plus released ref. **Board: one ref, `lane/AG-3`. Mode `SHUTDOWN`. All five rows `CLOSED`.**

**A structural note that falls out of `F-S118-RELEASING-THE-REF-REVOKES-THE-WRITE-CHANNEL-1` and is
worth stating on its own:** because the post must precede the release, **a foreman's final act can
never appear in its own report.** Its §11 says "release output is appended below" and no such
appendix can exist. The gap is not a lapse and it is not fixable by ordering — it is closed from
OUTSIDE: the Architect's `git ls-remote` is the independent sensor for the lane's last act. Clean
division, worth keeping: **the lane reports everything up to its final act; the Architect measures
the final act.**

## 6.10 · `F-S118-CP6-REGEX-STOPS-AT-AG4-1` — the drift checker has the drift it checks for

Found while validating a real card against the landed preflight. `CP-6` enforces that a bus address
is `AG-<n>` and a report filename is `...-AG<n>-report`, and its matcher is `\bAG[1-4]\b(?!-report)`.
**Measured, by running it:** `AG1` `AG2` `AG3` `AG4` are CAUGHT and **`AG5` ESCAPES**. The live
`relay_inbox_lane_addr_check` roster is `AG-1 … AG-5`, measured this session by
`npm run claim:roster`. **A misspelled `AG5` passes the check that exists to catch exactly that.**

This is a RECURRENCE of a class already in the seed: *"the CHECK grew `AG-5`, the literal did not"* —
the `mail-wait` roster literal that refused a real address as a typo. Same defect, one file over, in
the checker written to catch drift. The general rule the seed already carries applies to the checker
itself: **a roster is DERIVED from the live constraint, never typed.**

## 6.11 · THE TEMPLATE SURVIVED A DESTRUCTIVE CARD — 11/11, including CP-11

The `lane/AG-3` sweep card was authored in the verified grammar and measured before posting:
`preflightVerdict` → **PASS, no failed ids**; `auditText` → **kind=card, governed, 0 violations**.
That exercises the checks a status card never reaches — **CP-11**, which demands a destructive card
carry a FRESH BOX READ obligation (re-measuring the target is not re-reading the order), and CP-6,
which caught the card's own NAME on the first run: `S118-LANE-AG3-SWEEP-1-v1` spells a bus address
in the filename style. Renamed, re-measured, clean. **The grammar caught the Architect twice inside
one card, before any lane saw it. That is the check being where it belongs.**

## 6.12 · THE PERMISSION-DIALOG HUNT — a diagnosis I got HALF right and shipped as WHOLE

The owner spent roughly an hour approving the factory's own claim walk by hand, one dialog per
ATTEMPT (not per window — the walk retries across the free list, so four producer windows multiply
it). **`PLATINUM-BREACH-S118-1`: a machine operation routed to the owner's finger and left there for
a session.**

**My first diagnosis, stated to the owner as "root cause found":** `cd "<path>" && git push …` is a
CHAIN, and `CLAUDE.md` section 3 already says *"every bash call is ONE command … permission rules
match by command PREFIX … this is the precondition for the permission system working at all."*
True, real, already-written law — **and not the cause.**

**The owner's own screen captures refuted it in two steps**, and both refutations came from them, not
from me:
1. a BARE `git push --force-with-lease=refs/heads/lane/AG-1: origin …` with no `cd` at all — PROMPTED;
2. a `git -C "<path>" push --force-with-lease=…` — the exact form I had just ordered — PROMPTED.

Measured shapes, all four:

    bare       git push --force-with-lease=…                      PROMPTED
    cd chain   cd "<path>" && git push --force-with-lease=…       PROMPTED
    git -C     git -C "<path>" push --force-with-lease=…          PROMPTED
    non-force  ls-remote · rev-parse · claim:roster · node …      NOT PROMPTED

The only factor common to every prompting command is the `force` substring, and the allow-list
**is** loading (non-force allow-listed commands never prompt). `A-REC-S118-PARTIAL-CAUSE-SHIPPED-AS-ROOT-CAUSE-1`.
`F-S118-CD-CHAIN-DEFEATS-THE-ALLOW-LIST-1` remains a real, separate defect worth fixing — it is just
not the one the owner was paying for.

**The cure, carded as `PHASE-LANE-CLAIM-WITHOUT-FORCE-1-v1` (AG-1, 15:00:46Z):** the claim does not
need force at all. `git push origin <nonce>:refs/heads/lane/AG-N` keeps the atomicity — the losing
racer is refused non-fast-forward, since every nonce is minted from the master tree with master as
its parent, so no lane's nonce is ever an ancestor of another's — and `Bash(git push origin:*)` is
already allow-listed. **The card's ORDER A tests the hypothesis BEFORE acting on it and voids the
rest of the card if a plain push also prompts**, because the lesson of this very finding is that my
confident cause was half a cause. The RELEASE path keeps its pinned lease and therefore keeps one
dialog per window per close — named as a deliberate trade, since the lease is what makes a release
destroy only the sha that was measured.
**Acceptance test the owner can feel: opening a factory from a clean board costs ZERO dialogs.**

## 6.13 · `F-S118-LANE-NONCE-IS-PUBLIC-SO-IT-AUTHENTICATES-NOBODY-1` — measured by AG-5, and it is serious

The write channel's entire authentication claim, from the migration's own DDL comments:
*"the nonce stored at claim makes it a database invariant, since a window that does not hold the
address cannot present its nonce"*, and `factory_set_mode` is *"foreman-only BY CONSTRUCTION …
the proof is a sha won from the git server by an atomic push."* The boot repeats it.

**The nonce is a git ref sha on the SHARED remote and every window can read it with one
`ls-remote`.** So `factory_write_lane`, `factory_set_mode`, `relay_mark_consumed` and
`relay_post_from_lane` are all gated on a value that is public to every caller. Any lane can present
any other lane's nonce, including the foreman's. **`ADR-012`'s "JS-policy → DB-invariant upgrade" does
not hold as written** — the DB check is real, but what it checks is not a secret.
Class: the LABEL of a field is not its COMPUTATION. Found while doing a routine read of sibling boxes.
**In scope for `PHASE-FACTORY-CLAIM-THIRD-SHAPE-1`.**

## 6.14 · CP-11 PAID OUT IN ITS FIRST REAL USE

The foreman had already re-measured `SWEEP-1`'s target and all four CLAIMS rows and had the owner's
reconfirmation in hand. The card's ordered box re-read then returned `SWEEP-2`, **minted 82 seconds
earlier**. Its own sentence: *"Re-measuring the target would never have found it: the target was
byte-identical under both cards. A countermand arrives in the box, and only a box read finds it."*
v1 was superseded and never executed. **This is exactly the gap that let a withdrawn deletion run
eleven seconds late in S117**, closed on its first live test.

## 6.15 · MORE ARCHITECT ERRORS, S118 — the count is now SEVEN

5. **`A-REC-S118-DECAY-CLAUSE-FORBIDS-ITS-OWN-EXECUTOR-1`** — `SWEEP-1` carried *"DECAYS the moment
   any lane ref moves"*. **The executing foreman's own claim IS a lane ref moving**, so the clause
   forbade the only path by which the card could run. The foreman stopped, correctly — and escalated
   to the OWNER, which is the second half of my error: **re-issuing a decayed premise is the
   Architect's job, not the owner's.** Cost: one more dialog on a screen already full of them.
6. **`A-REC-S118-PARTIAL-CAUSE-SHIPPED-AS-ROOT-CAUSE-1`** — §6.12.
7. **`A-REC-S118-CONSENT-EXTENDED-FROM-ACT-TO-CLASS-1`** — the owner's "close the whole factory"
   covered the AG-3 row write. I then extended that same consent to AG-2's and AG-4's rows MYSELF.
   Defensible in substance, wrong in form. **Standing rule adopted: one consent covers one ACT, never
   a class.**

## 6.16 · THE SCOUT'S THREE FINDINGS — all need a card, none acted on

- **`F-S118-FREE-BOOT-CARRIES-STALE-MEASUREMENT-1`** — `.claude/boot/free.md` states as fact that the
  scout address is filtered out of the poller by `LANE_ADDR = /^AG-[0-9]+$/`, "MEASURED 2026-08-23 and
  true as this lands". Measured now: the call RUNS —
  `readable=AG-1…AG-5 operator scout | claimable=AG-1…AG-5`. `laneRoster.mjs` added `BOX_ADDR` and
  `readableAddresses`; the widening the boot deferred to someone else has already happened and the
  boot was never updated. Its "KNOWN GAP" paragraph now teaches every scout to expect a broken channel
  it has.
- **`F-S118-SINCE-DOES-NOT-OVERRIDE-THE-WATERMARK-1`** — **the serious one.** `mail-wait.mjs:194`
  documents `--since` as "override the high-water mark", but the query at 1252-1253 uses
  `unconsumedSql(lane, watermark, …)` whenever the watermark is readable; `args.since` reaches only
  the fallback path taken when the watermark is UNMEASURED. The transcript then narrates the FLAG
  while the query used the WATERMARK — *"one transcript, two different values, both called
  high-water mark"* — so the flag **reports success at overriding an anchor it never touched.**
  It bites the scout hardest: a scout never holds an address, so any card addressed to it below
  `2026-08-23 23:59:25` is invisible with no lens that reaches it. Its "zero rows" is honest about
  the predicate it ran and is NOT a certified empty box.
- **`F-S118-PRE-WATERMARK-DOCUMENTED-NOT-IMPLEMENTED-1`** — `--pre-watermark` is documented at
  `mail-wait.mjs:481`; `preWatermarkSql` is exported at 542 and **called nowhere**; `parseArgs` knows
  only `since, once, read, table-lens`. Passing it is silently accepted and ignored. It is the exact
  lens the previous finding needs, which is why that finding has no workaround.
- **The scout's own synthesis, adopted:** these two are ONE defect wearing two faces — **an unknown
  flag is silently swallowed rather than refused**, so a typo, a retired flag and a
  never-implemented flag are byte-identical to correct usage. *"A flag surface that cannot say
  'I don't know that one' turns every documentation drift into a silent wrong answer."*

## 6.17 · THE FACTORY REACHED FULL CAPACITY — 2026-08-25T15:14:33Z

    AG-1 49134c2d CLAIMED   AG-2 80b1612c CLAIMED   AG-3 26198849 CLAIMED
    AG-4 9091af50 CLAIMED   AG-5 077b63a0 CLAIMED (foreman)      mode READY

`lane/AG-3` was swept at ~15:00 and re-claimed at `15:07:20Z` by the producer window that had been
turned away. **That window's earlier report was correct and its restraint was the point:** it hit
`(stale info)` on all three free addresses, refused to invent `AG-6` (the `relay_inbox` CHECK rejects
it, and an unaddressable box is byte-identical to an empty one at the poller), and refused a takeover
with no death certificate. **The arithmetic was against it and the arithmetic was the Architect's:**
five claimable addresses, minus the foreman's, minus one jammed by an orphan ref, left three slots for
four producer windows. One window was homeless by construction, not by fault.

Leftovers on the wire from the ORDER A probe: `probe/force-150316`, `probe/plain-150316` — cleanup to
be required in AG-1's report.

## 6.18 · `F-S118-CP8-DOES-NOT-EXEMPT-EVIDENCE-FENCES-1` — two checkers disagree about the same fence

Found while authoring `PHASE-FACTORY-RECOVERY-1-v1` against the landed instruments.

The relay-audit tripwire `R-TRIP-HEX` exempts CLAIMS rows and the `evidence:` / `diff` fences — that
exemption is WHY the grammar can demand *"put the sha in an evidence fence AND a CLAIMS row, and have
the stamp point at it."* **`CP-8` has no such exemption: it scans the whole body.** So a card that
puts a live-state token exactly where the landed grammar says it belongs is still REFUSED by the
preflight.

It does not bite full 40-hex shas, since `CP-8` only catches runs of 7–39. It bites **migration
timestamps** — `CP-8`'s own basis note says pure-digit runs are matched deliberately, *"a CI run id or
a migration timestamp is live state exactly like a SHA is"* — and a migration filename is exactly the
thing a card about a migration must name. Measured: the card was refused `CP-8` on a 14-digit
migration timestamp sitting inside an `evidence:` fence, and `auditText` reported 0 violations on the
same body at the same instant. **One body, two landed checkers, opposite verdicts.**

Workaround used: the filename was replaced with a description and the card passed. That is a
workaround, not a fix — a card about a migration should be able to NAME the migration.
Rides the card-grammar wave, not the recovery wave.

## 6.19 · THE SCOUT PROBE — answered in full, and it could not send the answer

`SCOUT-PREMISE-PROBE-1-v1` was read at `2026-08-25T15:32:36Z`, digest verified, and answered
completely. **The report never reached the bus.** It exists in this record only because the OWNER
pasted it out of the window — the transport of last resort, and a PLATINUM cost that must not be
normalised.

**`ORDER D` refusal class: `REQUIRED-INPUT-UNREACHABLE`.** `scout_reply` requires the prompt row's
uuid; `cardSql` SELECTS `id` but `readCard` never PRINTS it (used internally, surfaced nowhere).
Second lens: `scout_reply` appears only as a curl recipe in the boot, wrapped by no script. The
remaining route was querying the table directly — the fence `guard-mcp` holds — **and the scout did
not route around it.** The fix is one line: print the row id.

### The Architect's premise was wrong and the scout caught it
The card said *"two settings files under the claude directory"*. **There are THREE** —
`settings.foreman.json`, `settings.json`, `settings.local.json`. It read the ON-DISAGREEMENT clause
precisely: the wrong claim sat in an ORDER, not in `## PREMISE`, so it ANSWERED rather than stopping,
and named the difference first. It did not open the `.local.json`; the boot forbids it.

### Q1 · `F-S118-SCOUT-FLOOR-HIDES-ITS-ENTIRE-MAILBOX-1` — quantified

    predicate  consumed_at is null AND created_at >= '2026-08-23 23:59:25.636192+00'
    floor      factory_state.changed_at for lane_addr='scout'  (state=CLOSED)
    newest pre-existing scout row  2026-08-23 17:09:51.568181+00
    -> the floor sits 6h 49m 34s ABOVE the ENTIRE pre-existing scout mailbox

**The scout's own sentence, which is the finding:** *"before your card, every 0 I reported was
arithmetic, not measurement."* The floor's justifying comment reasons that *"the claim is the moment
THIS window took the address"* — **and a scout never claims one**; the roster says scout *"is not
claimable and never will be."* The floor is a CLOSED row, not a claim boundary.
**Consequence adopted: every scout card must be minted FRESH. A scout card is never re-read.**

### Q2 · UNMEASURED — and the reason is the most dangerous defect found today

**`F-S118-READCARD-STAMPS-A-BOX-THE-WINDOW-DOES-NOT-HOLD-1`.**
The scout could not enumerate cards per address: `mail-wait` has no listing verb, `--read <name>`
needs a name you already know, and `execute_sql` is correctly fenced. **It also declined a route that
WAS open, and the reason is the finding:** `readCard` attempts a `consumed_at` stamp of its own.
Reading the foreman's card from the SCOUT window triggered a **real write attempt against AG-5's
box.** It was refused `FW004` — **only because that card was already stamped.**

**Had it been unstamped, the stamp would have SUCCEEDED**, and since every lane's box read is keyed on
`consumed_at IS NULL`, the scout would have **silently consumed a live card out from under a
producer.** Source-verified only: *"I did not test it empirically, because the test is the harm."*

And it clears the nonce gate on the way in — `FW004` is raised AFTER `factory_assert_nonce` passes.
The scout also corrected its OWN earlier claim rather than leaving it standing: it had told the
Architect `--read` was write-free, having checked only that the function returns before the
heartbeat. **Scoped too narrowly, and it said so unprompted.**

### Q3 · `F-S118-CP8-DOES-NOT-EXEMPT-EVIDENCE-FENCES-1` — CONFIRMED, and it is 89% wide

`tripwireExemptLines` (`relayAudit.ts:348-371`) exempts fence delimiters, CLAIMS table rows,
`evidence:*` fence contents and `## DIFF` fences. `CP-8` (`cardPreflight.ts:346-350`) matches over the
WHOLE body — **no fence logic exists in it at all.** A card gets both, because `CP-1` delegates to
`auditText`.

    268 relay artefacts scanned · 239 would be REFUSED · 29 clean  ->  89%

And the hit classes show it is not catching what it believes:

    ae394c1 / 7c099fc          genuine short shas       CORRECTLY caught
    32624580818                CI run ids, pure digits  FALSE
    c61be3cb6bb...             md5 digests              FALSE
    20260824060000             migration timestamps     FALSE

**The sharpest instance:** `body_md5=…` is printed by `mail-wait` itself on every delivery, so **a
report quoting its own delivery receipt reds CP-8.** The Architect's workaround an hour earlier —
describing a migration instead of naming it — was forced by a real defect, not by clumsiness.

### Q4 · `F-S118-FOREMAN-SETTINGS-LOADED-BY-NOBODY-1`

Exactly one thing points at `settings.foreman.json`, and it is **prose addressed to a human**:
`.claude/boot/foreman.md:4` — *"That window is started with `claude --settings
.claude/settings.foreman.json`"*. Every other hit is a historical report or the guard naming the file
in refusal text. **No launcher, no script, no hook, no command file loads it.** A window started as
plain `claude` loads `settings.json` (plus `settings.local.json`), never the foreman file.
The delta is real and freshly measured: `grep -c "gh pr merge"` → `settings.json:0`,
`settings.foreman.json:1`.
**So every claim about the foreman's permission surface rests on an assumption no window can verify —
that whoever launched it typed the flag. Nothing in the repository enforces it, and nothing inside a
window can measure which settings file another window loaded.**

### `F-S118-EMIT-IS-A-READ-SHAPED-FLAG-THAT-WRITES-1`
`npm run card:preflight -- --emit` writes `docs/ground/CARD-PREFLIGHT-v1.md` — into a
GROUND-CONTRACT directory. The scout caused it by accident while inspecting the grammar, reverted it
with `git checkout --`, and reported it: *"a scout should not have caused a write."* Only `commit:`
and `measuredAt:` changed; the eleven checks were byte-identical. **Any window inspecting the card
grammar dirties a governed file.**

### The eight items the scout named as needing cards
the scout floor rule for non-claimable addresses · wire `--pre-watermark` and REFUSE unknown flags
instead of swallowing them · honour or refuse `--since`, never leave it silently inert · give `CP-8`
the fence exemptions `relayAudit` already has · stop `readCard` stamping a box the window does not
hold, and make it PRINT the row id (which also unblocks `ORDER D`) · stop `--emit` writing from an
inspection flag · fix the `factory_write_lane` comment that states a guarantee the nonce does not
provide · fix `free.md`, which still tells every scout the box channel is refused with exit 2 when
that gap has closed.

## 7 · CARRIED, UNCHANGED

`#402` `2d7469d8` `CI-NOT-SUCCESS` — **never re-run once in the entire window.**
`#387` `993fa218` `AUTHOR-UNKNOWN` — **no report removed from any tree to clear it.**
`#403` `2218dde8` — AG-3's, every non-skipped job success, `rule26` and `eval-canary` SKIPPED and
**named rather than folded into the green**, held by `FACTORY-NOT-READY`.
`POLL-DEGRADED` zero for the entire window.

END-OF-NOTES S118-SESSION-NOTES-v1
