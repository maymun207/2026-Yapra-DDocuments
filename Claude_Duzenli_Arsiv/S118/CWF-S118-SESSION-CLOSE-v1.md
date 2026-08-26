# CWF-S118-SESSION-CLOSE-v1

<!-- Written WHOLE (A-REC-S101-7). Times: UTC on the wire, TSİ = UTC+3 in prose.
     Every figure was measured at close, not carried. -->

## 1 · WHAT S118 WAS

A factory session that became a product session in its last hour. It opened on a
carrier debt, spent its middle on a full cold shutdown and restart of the factory as
a deliberate test, and closed having landed the sealed ADF architecture document and
measured — for the first time — what actually stands between this system and its
first external benchmark.

**The answer to that last question is the session's finding, and it is not what
anybody expected: not code.**

## 2 · WHAT LANDED

| PR | what | master after |
|---|---|---|
| #406 | the claim walk without force (`.claude/commands/claim.md`) | — |
| #408 | `PHASE-READ-NEVER-WRITES-1` | `8e7026e1` |
| #410 | **`docs/design/ADF-ARCHITECTURE-v1.html` — the sealed architecture document** | `5f099a0e` |
| #411 | `CLAUDE.md` section 2 rewritten to the plain push | `61558f98` |
| #407 | `PHASE-FACTORY-RECOVERY-1` | `51826e6f` |

**The seal was verified independently by the Architect from a fresh clone**, reading
the blob at `origin/master` rather than trusting the lane's report:
`75ebbb8cbbfefe673ca0b31a59eeaa26`, 43145 bytes — byte-identical to the digest the
S113 payload card named as its target three weeks earlier.

**Item 5 of the S114 order, open since S113, is closed.** The ADF landing protocol
landed the document that specifies the ADF landing protocol.

## 3 · WHAT DID NOT LAND, AND WHY

**`PR #409` — a MEASURED RED at head `209e4202`.** `build (24.x) = FAILURE`. Two
defects with different owners, ruled in §6.

**`PR #404` / `#405` — the foreman's own work.** It refuses to land its own, which is
the landed rule behaving correctly.

**Seven other phase branches** remain open and are enumerated in the bootstrap.

## 4 · THE COLD RESTART — the test the owner asked for, and its measured answer

The owner escalated a routine refresh into a full shutdown and cold start, explicitly
as a test of whether the factory can start clean. The board went from five held refs
to empty and back to five.

**Result: the factory could NOT cold-start from the board its own shutdown produced.**
It took **three hand-written database rows**. The "unassisted from zero" half was
measured; the "over an empty board" half was not.

`foreman.md` section 1x ran for the first time ever and took ending 1 — it completed
the draining remnant with its own nonce.

## 5 · THE PERMISSION DIALOGS — root cause measured, one class closed

The owner's words were *"bu bash işi beni ekran başındaki monkey yaptı."* The root
cause was narrowed to the **`force` substring**, and the narrowing was proven on the
wire rather than argued: *a plain push and a force push creating the same shape of
throwaway ref were run back to back, and only the force form raised a dialog.*

Both surfaces are now on the plain push. AG-1's rewrite of `CLAUDE.md` section 2 went
beyond the order and found a hole the Architect had opened: removing the lease
introduces a **twin-nonce** failure the lease was silently covering —
`Everything up-to-date` with a zero exit is what the LOSING side of an identical
nonce looks like. Its remedy: a per-attempt unique nonce message, and a read-back
that tests the creation line AND the nonce, because *"the sha alone cannot see the
twin."*

**One class closed, not all of them.** The PIPE class is still live and was measured
the same evening. `A-REC-S118-DIALOG-CLASS-OVERCLAIMED-1` records the Architect
saying "closed" where the honest word was "the force class is closed".

## 6 · THE RULING ON `PR #409`

**(A) The C-group red is the Architect's.** The conformance test failed exactly as
designed — six named disagreements. A card that orders a deliberately red test through
a gate that requires green is **unlandable by construction**.
`A-REC-S118-ORDERED-A-RED-TEST-THROUGH-A-GREEN-GATE-1`.

*Remedy:* the comparison becomes a REPORTING instrument — prints every disagreement,
writes them to a governed document, **exits 0**. The redness lives in the FINDING, not
in the gate. A gate stops defects ENTERING; a conformance report measures a gap that
already exists everywhere, and dressing the second as the first blocks the very source
that would close it. **The falsifier survives:** the test still fails on ZERO
disagreements, and on failure to run.

**(B) The B-group red is larger and is not the hypothesis.** Two detector assertions
failed — the comparison did not fire on `BUS-ADMITS-AN-AUTHOR-THE-VERB-REFUSES` or
`REPLY-AUTHORITY-DRIFT`, both of which are anchors in the commissioning card's own
CLAIMS table. **The instrument cannot see the defect it was commissioned to see**, and
three `UNMEASURED-live-*` entries say why: it has no live-read path.

*Remedy:* NOT deletion of the assertions. Either the lane gets a live read — UNMEASURED,
establish it first — or the live side is captured into a governed SNAPSHOT whose
freshness is itself a measured field. A comparison whose live half is permanently
`UNMEASURED` is a self-portrait in the same way an internal benchmark is.

**Sequence ruling:** the v2 card was NOT cut in S118. Cutting a build card would have
re-opened a wave the owner had approved closing, and nothing is lost — the work is on
a branch and the red is measured at a named sha.

## 7 · THE §6 RECON — the session's largest finding

`PHASE-SOTA-HARNESS-RECON-1` (AG-3, branch `phase/sota-harness-recon-1` @ `b7eb7632`)
answered the acceptance contract's blocking sentence directly.

| surface | verdict |
|---|---|
| agent-to-agent | READY-WITH-NAMED-GAP — proven by execution in four independent falsifiers; *"nothing about it is a promise."* The gap: **it exists nowhere a stranger can reach.** |
| fresh-state reset | READY-WITH-NAMED-GAP — the catalogue is live; the documented refusal can still fire but **no longer for the documented reason** |
| foreign-backend mount | PARTIALLY PROVEN — the code-change half is **PROVEN ABSENT**; the mount half is **UNPROVEN BY EXECUTION** |
| cost instrument | READY-WITH-NAMED-GAP — **no METERED figure exists**; both figures on record are FIXTURE figures and the instrument labels them so |

**The contract's "fifteen of sixteen" sentence: *"Partly true, and stale in its
reasoning."*** Still true that nothing has been exercised end to end. **No longer true
is the implication that BUILD WORK unblocks it** — *"cutting build cards against this
list would be commissioning work that already exists."*

**Four blockers, none of them code:** a long-lived public HTTPS host for the agent · a
public endpoint for the honestbench instrument · one governed two-row Operator write · a
spend authorisation. **Three of the four are the owner's surface exclusively.**

*Consequence:* Wave 9 build and Wave 10 benchmarks sit on **different critical paths
and do not compete.** Under SOTA-1 this removes the deferral question rather than
answering it.

## 8 · ARCHITECT ERRORS — S118, and there were many

`BUS-ASSEMBLY-ASSUMED-UPDATABLE-1` · `DECAY-CLAUSE-TRIPPED-BEFORE-DELIVERY-1` ·
`DECAY-CLAUSE-FORBIDS-ITS-OWN-EXECUTOR-1` · `EXIT-CRITERION-ABSENCE-CLAIMED-FROM-ONE-PROBE-1`
· `TWO-CARDS-ONE-BOOT-FILE-1` · `ORDERED-A-RED-TEST-THROUGH-A-GREEN-GATE-1` ·
`DIALOG-CLASS-OVERCLAIMED-1` · `PARTIAL-CAUSE-SHIPPED-AS-ROOT-CAUSE-1` ·
`EVIDENCE-IN-HAND-TREATED-AS-ABSENT-1` · `CONSENT-EXTENDED-FROM-ACT-TO-CLASS-1` ·
`ORDERED-A-REPORT-THROUGH-AN-UNVERIFIED-CHANNEL-1` ·
`UNSOURCED-EXIT-CRITERION-CARRIED-FORWARD-1` · `CLOSING-CARD-NAME-NOT-READ-1` ·
`ORDER-UNEXECUTABLE-BY-ANYONE-1` · `STALE-FINDING-USED-AS-PREDICTION-1` ·
`BROKEN-PROBE-ALMOST-REPORTED-1`.

**Corrections to the Architect again outnumber corrections by the Architect.** That is
a measurement, not a courtesy — and the three sharpest came from lanes: AG-1's
twin-nonce hole, AG-4's character-versus-byte false alarm caught before it was
reported, and the foreman declining an order it could show was mechanically wrong.

## 9 · SOTA — BOTH SCOREBOARDS, because a close citing only one is incomplete

**(A) INTERNAL 7-KEY TALLY — 6/7.** Open: `#29` A23, the understanding layer. Its
measured lever is DISCOVERY, not clarify logic: entity-unresolved is 62.14 % / 76.40 %
of clarification blocks, and the long-tail theorem gives the mechanism —
`pass@k = 1 − (1 − pass@1)^k`, so **a deterministic failure class has pass@1 = 0 and
is untouched at any k.** "Sample more / bigger model" cannot move it.
**This is an internal readiness measure and it is NOT the acceptance criterion.**

**(B) ACCEPTANCE CONTRACT — 0/16.** Sixteen external criteria, sixteen UNMEASURED ·
`mcp-honestbench` NOT BUILT · D-OPA-2 / D-OPA-3 UNMEASURED · **cost UNMEASURED, and
the recon confirmed the estimate label is correct — no metered figure exists to have
been used instead.** The only measured rows are internal, and under C2 an internal,
self-run, unpublished number is a self-portrait.

**Amendment owed — v1_6:** the internal M-A row is **STALE** by its own event-based
expiry (`frameRouting=1` went live at S106); §6's blocking sentence is *partly true
and stale in its reasoning*; the cost line stays an estimate and stays correctly
labelled. **`MA-RERUN-2` is NOT the second item of the CWF return** — it maintains an
internal row that advances no external criterion, and §8's honest and free remedy is
to mark the row stale, not to re-run it.

**(C) ADF EXIT TEST — 2/6**, re-measured at S118 against S115's claimed 3+/6. Criterion
1 (zero-paste open) was a PREDICTION and it was **REFUTED** by measurement. Criterion 5
rose from NO to PARTIAL — the collector landed but has never deposited once. Criterion
6 regressed.

## 10 · DEBT CARRIED FORWARD, NAMED RATHER THAN DISCOVERED

`S118-FINDINGS-ADDENDUM-1` (21 sections) has **not** been merged into
`S118-SESSION-NOTES`, and the bug bucket, open-items register and session KB have not
been versioned for S118. **Nothing is lost** — the addendum is a complete standalone
document in the project box — but the merge is OWED and S119 must read both.

The alternative was writing thin carriers that drop names, which is exactly the defect
found in `S117-SESSION-NOTES-v3` at this session's open: it dropped nine. **A named
debt beats a silent loss**, and the ledger law is what says so.

## 11 · WHAT S119 OPENS ON

`cwf-implementation-order-S118-v31`, and the bootstrap is
`CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v119`. The first act — the factory's cold start
— **is itself the acceptance test** for the claim fix, and the owner's eyes are the
only instrument that can read it.

<!-- END · CWF-S118-SESSION-CLOSE-v1 -->
