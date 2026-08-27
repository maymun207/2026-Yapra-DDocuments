# S122 · P-4 ESCALATION — WHICH FENCES CARRY INSTRUCTIONS?

**P-4's two repair attempts are spent on `PHASE-CP8-RECONCILE-1`. I am stopping rather than
editing a fourth time.** Both refusal texts are attached below, as P-4 requires. One decision
is needed. Everything else in the card is cleared by all three windows.

MEASURED 2026-08-28T00:15Z–00:20Z from a fresh clone at master
`2e1d193b5bf809228821d1934caa5bce474f3959`.

---

## 1 · WHERE IT STANDS

| version | what happened |
|---|---|
| v1 | dispatched (my process error — no scout window). All three windows refused: ORDER B and ORDER E were mechanically contradictory |
| v2 | resolved that by ruling `evidence:` fences exempt. **Repair 1.** One window found the ruling blinds the anchor fence |
| v3 | carved `evidence:anchor` out of the exemption, exact match, third control arm. **Repair 2.** Two windows refused, independently, on the same fresh hole |

The card is otherwise cleared: the anchoring change, the seam, the three falsified texts, the
landing order, and the corrected corpus figures all verified by every window.

## 2 · THE HOLE, MEASURED

My carve-out keys on a **name**. The property it protects is a **role**, and this corpus does
not use one name for that role.

```
fence-name census over docs/relay, anchor-role candidates:
  evidence:precondition   35 files      evidence:base    12 files
  evidence:anchor         24 files      evidence:head     3 files
  evidence:floor          21 files      evidence:master   0 files
```

`evidence:anchor` covers **24 of roughly 95**. And the decisive case is not a corpus statistic:

```
$ grep -c 'evidence:anchor' scripts/cardPreflight.ts
0
```

**The repository's own canonical specimen — the clean-card constant the self-test is built
from — has no `evidence:anchor` fence at all.** Its anchor lives in `evidence:floor`, and its
own PREMISE says *"ON-DISAGREEMENT: if your re-measure of the floor differs from the sha above,
STOP … and do not act on this card"* — the exact instruction-shaped use my carve-out's reasoning
invokes.

**The consequence is concrete:** a lane would plant a prefix into a newly added
`evidence:anchor` fence, see RED, and report the carve-out proven — while the specimen's real
anchor stayed exempt and untested. The control would pass and the hole would remain.

## 3 · THE DECISION — one path, recommended

> **Key the carve-out STRUCTURALLY, not by name: a fence is NOT exempt from CP-8 if a CLAIMS
> row anchors to it. Every other fence stays exempt.**

**Why this rather than a longer list of names.** The grammar already computes this mapping — its
anchor rule refuses *"names anchor 'guard', which resolves to no `evidence:guard` fence"* — so
the parse already knows which fences a card depends on. A fence a card points at from its
CLAIMS table is, by construction, a fence the card is asking the lane to rely on. A transcript
nobody anchors is a transcript. **The rule maintains itself**: a lane inventing
`evidence:whatever` next month is covered without anyone editing a list.

Checked against this card: its CLAIMS anchor to `anchor · collision · conflict · corpus ·
texts`, and `carve` is the only unanchored fence — so the worked example still lands exempt
exactly as designed, with no special case.

**The alternative, for completeness:** enumerate `{anchor, floor, base, precondition, head}` as
a named constant, exact match on each. It is explicit and reviewable, and it goes stale the
first time someone coins a sixth name — which is how this hole was born.

### The cost of my recommendation, named rather than hidden

Under the structural rule, **an anchored fence is scanned**, so a lane pasting a refusal
transcript that echoes a short sha into an *anchored* fence would be refused. The sibling card
orders exactly such pastes. The discipline that follows is coherent but must be taught: **paste
transcripts into unanchored fences; anchor only the fences whose values the card asks the lane
to act on.** The grammar permits unanchored fences today, so nothing new is needed to obey it —
but a lane will meet this and should be told, and that belongs in the same change.

**OWNER DECISION: STRUCTURAL | NAMED LIST | AMEND** ____________  date: __________

## 4 · THE TWO REFUSAL TEXTS, AS P-4 REQUIRES

**Window 3 —** *"exact is the right mechanism and your reasoning is sound … But exact-vs-prefix
is the wrong axis, because prefix matching would not close the real hole either. The hole is
that `anchor` is not the only name this corpus uses for the operative-sha fence, and the other
names don't share its prefix. … a card following the repository's own reference example of a
well-formed card, carrying a truncated sha in its `evidence:floor` fence, passes CP-8 silently
— the identical failure v3 exists to close, at the fence name the reference fixture actually
uses. … This shows up inside ORDER B itself: the third arm demands a truncated prefix in an
`evidence:anchor` fence going RED, but the clean-card constant has no `evidence:anchor` fence."*

**Window 1 —** *"ORDER A-2 carves out a name, but the property it protects is a role, and the
corpus does not use one name for it. … An exact match on `evidence:anchor` protects 28 of
roughly 70 anchor-role fences. … ORDER A-2's stated basis — 'Every card in this corpus writes
the full sha sits in the evidence:anchor fence in its PREMISE' — is false, and the consequence
is concrete: ORDER B's third arm would pass while the specimen stays vulnerable. … exact is
right to reject prefix matching … But that is an argument against prefix, not an argument for a
single literal name. Both options key on spelling; the property that matters is whether the
card's own ON-DISAGREEMENT/PREMISE clause tells the lane to act on that fence's token."*

Both windows independently concluded this is a governance ruling rather than a wording fix, and
both recommended escalation over a third edit.

## 5 · THREE SMALL THINGS THAT RIDE WITH THE RULING

Not decisions — corrections to make in whichever version carries your answer.

* ORDER G's acceptance still asks for **two** control arms while ORDER B now requires three; the
  carve-out would ship unmeasured. Add the third.
* The merge-tree note says 4 marker lines; the true count is **6** (two hunks × three markers).
* The premise still cites a labelled case set whose fence v2 removed. Trim the clause — the
  anchoring change's warrant is ORDER A's reasoning plus the corpus collapse, not that set.

## 6 · WHAT IS NOT BLOCKED

`PHASE-PRODUCER-BOOT-REPAIR-1-v3` was cleared by all three windows and dispatched to AG-4 at
2026-08-27T23:07:55Z, byte-verified. AG-2 and AG-3 are working their branches. Nothing else in
T1 waits on this ruling.

---

TAIL ANCHOR: S122-P4-ESCALATION-ANCHOR-CARVE-OUT-v1 ends here.
