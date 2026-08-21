# PHASE-CARD-DELIVERABLES-SLOT-1 · v1 — lane AG-4 · walk item #58 (+ one header truth fix) · Wave 7

<!-- LANE CHECK: AG-4 only. If your window is not lane AG-4, STOP, reply "wrong lane". -->

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| S100 anchor | READ: Architect fresh clone, drift gate exercised with a positive control | anchor |
| busDelivery's two pinned false-positive classes are on the record | READ: the module's own header (branch names rot after housekeeping deletion; a card QUOTING a name reads as acting on it) — #58 was minted from its first run | inline |
| busDelivery's "WHO RUNS IT" header claims the Architect's sandbox; the Architect's sandbox holds no service credential, by law | READ: module imports `getServiceClient` and throws without `SUPabase` env; Architect measured the throw path at S100 boot | inline |

```evidence:anchor · read 2026-08-14T06:52Z (Architect)
origin/master = bfd9153b90a002a1f1924a38120ac352738928dd
docVersion "rev 258 · 2026-08-14" · vitest ruler 601 · migrations 80 (live=80)
ADR 15 · drift [OK] 7/7 · phase/* unmerged 0
```

## STALE-WINDOW NOTICE
Anchors from earlier waves are VOID. Every S99 card in your box is completed
work: #54 was BORN (catalogue 54/54, panel GOOD, ledger balanced), #50 merged
with the cause-correction, #14 merged dark. Nothing in them instructs you now.
PRECONDITION: origin/master at the anchor hash (docs-only advance ≠ stop).

## STANDING LAWS: S99-1..9 · hardened CI (`head_sha`; zero runs = FAILED;
`completed`+`success` only) · merge-from-master (S99-8) · pipefail + red-to-file
(S99-9) · porcelain empty before push · one exclusive worktree.

## THE CHARTER
S99-2 made GIT the delivery proof; `busDelivery.ts` joins bus↔git with STRICT
declared-name matching and a DUMB matcher, by ratified design. Its own first
run indicted the input, not the matcher: cards declare names in free prose, so
(1) a deleted-after-merge branch makes an ACTED card regress to NO-EVIDENCE,
and (2) prose QUOTING a branch name is indistinguishable from declaring it.
#58 fixes the GRAMMAR side: cards gain a machine slot; the matcher stays dumb.

## SCOPE — numbered, closed
**R0 — the header stops lying (F-S100-BUSDELIVERY-CREDENTIAL-HOMELESS).**
`busDelivery.ts`'s "WHO RUNS IT" paragraph says the Architect's sandbox runs
it. The Architect's sandbox holds no `SUPABASE_*` service credential and must
not (ADR-007 posture); the tool throws there by its own guard. Correct the
header to the truth: it runs where the service credential legitimately exists
(an AG lane under standing consent, or any operator-provisioned runner), and
the Architect, lacking it, joins the two planes via its own read paths. A tool
homed where its precondition cannot hold is a S99-7 violation in prose.

**R1 — the DELIVERABLES slot, defined in the grammar.** Extend
`docs/relay/RELAY-AUDIT-GRAMMAR` (new version, S37-1 — the shipped file is
immutable; supersede it by name) with a required fenced block for
`kind=phase` cards:
```
```deliverables
branch: phase/<kebab-name>
report: docs/relay/PHASE-<NAME>-report.md
```
```
Exactly-one block per card; fixed key names; nothing else inside. A quotation
of a branch name OUTSIDE the block is inert by definition — the quote=action
class dies structurally, not heuristically.

**R2 — the matcher reads ONLY the slot.** `busDelivery.ts` parses the
`deliverables` block; free-prose name scanning is REMOVED. ACTED evidence
becomes: the declared branch ref exists on origin **OR the declared report
path exists on origin/master** — the second arm is what survives housekeeping
deletion (a merged branch's report outlives its ref). Cards with no block
(rulings, GOs, roll calls) remain never-ACTED, as ratified. The matcher stays
DUMB: no fuzzy matching, no inference — a malformed block is a reported CARD
defect, never repaired at read time.

**R3 — the audit gate learns the slot (S99-6, named amendment).** This card IS
the named Architect amendment: `relayAudit` gains the R-DELIVERABLES rule for
`kind=phase` (block present, exactly once, both keys). Innocent-case probes in
BOTH directions (D-5): a compliant card passes; a card quoting a branch in
prose but carrying a proper block passes; a blockless phase card fails; a
two-block card fails.

**R4 — FIRST CONSUMER, named (S98-L4).** The consumer is the Architect's boot
ritual (busDelivery per session open) and, transitively, the owner's delivery
question. Post-deploy proof (S63-1): after merge, run the tool where its
credential lives against the live bus; the report pastes one real
classification run showing an S100-format card ACTED via the report-path arm.

## FALSIFIERS (D-5)
(a) delete a declared branch ref in a fixture → card still ACTED via report
path; (b) prose-quote a branch name with no block → NO-EVIDENCE (never ACTED);
(c) POSITIVE control: a well-formed block with a live ref → ACTED (the matcher
provably matches, not just refuses); (d) malformed block → named parse defect
in output, never silent skip; (e) grammar gate: all four R3 probes.

## FENCES
Zero migrations, zero DB writes (the tool's `--lane` read path only in the
live run), zero changes to relay_inbox or its role. The three-state
ACTED/RECEIPTED/NO-EVIDENCE vocabulary is ratified — do not add a state.
Existing S99-format cards on the bus predate the grammar version: the matcher
treats a blockless OLD card exactly as today (report it as pre-grammar, no
retro-repair).

## DELIVERABLES (S91 completeness)
Branch `phase/card-deliverables-slot-1` · pushed · PR against master ·
report `docs/relay/PHASE-CARD-DELIVERABLES-SLOT-1-report.md` · hardened CI on
the head · then MAIL-WAIT for GO. **#28 OPA-POLICY-1 follows by a separate
card after this lands** — do not open it.

TAIL-ANCHOR: PHASE-CARD-DELIVERABLES-SLOT-1-v1
