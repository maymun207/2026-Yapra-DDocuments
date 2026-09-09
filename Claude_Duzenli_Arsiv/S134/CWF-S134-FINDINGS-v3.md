# CWF-S134-FINDINGS-v3 — the session's findings, whole

SUPERSEDES nothing; ADDS to CWF-S134-FINDINGS-v1 and CWF-S134-FINDINGS-v2-ADDENDUM, both of which
stand and are not restated here. Items live BY NAME. Every numeric claim below names its instrument.

## INSTRUMENTS CUT THIS SESSION

**F-S134-THE-POOLER-LOG-IS-A-POSITIVE-LIVENESS-LENS-1** — `supavisor_logs`, filtered to the lanes'
database role, is written by the INFRASTRUCTURE about the lane, from outside it, and a lane cannot
forge it. First positive liveness instrument this factory has had. Carries THREE readings, all kept:
the first named it, the second corrected "poller tick" (two connections thirty-seven seconds apart
then forty-three minutes of silence is a WAKE, not a cadence), the third named its BLIND SPOT
(short-episodes-only means only "not doing database work" — a lane running tsc or vitest is invisible
to it, and a working lane was nearly called asleep on it). Instrument: `supavisor_logs` over a named
window, episode durations computed from authenticate to terminate.

**THE ACCOUNT-LAYER DISCRIMINATOR** — a forge refusal and a code failure are separable without a log:
a refusal ends in SECONDS with `steps_count=0`, no annotation and no log blob; a real gate failure has
real duration and a populated step list. Measured against both cases in the same day, at the same
head. Instrument: `gh api actions/runs?head_sha=<forty hex>` plus the jobs endpoint's step counts.

## DEFECTS FOUND IN THE PRODUCT

**F-S134-THE-RESOLVER-NEVER-ASKS-THE-GRAPH-1** — `entity_topology_edges` is a DISCOVERED graph
(`edge_kind=contains`, `discovered_via` naming the tool that saw the edge, `first_seen`/`last_seen`/
`absent_since` so a vanished edge is STAMPED rather than deleted), carrying 2503 live edges — 1720
factory→equipment via `getEntities`, 783 factory→line via `getFactoryLines`, ZERO absent — with a
provenance classifier (`observed` / `probation` / `unclassifiable`) and an arbitration surface against
the registry's own parent column that read `conflicting: 0 / 783` on the line layer. `GraphKbReader`
already exposes `parentsOf` and `containsAmong`, the latter answering "which of these candidate
children does this parent contain", with `unreadable` distinct from `answered`-and-empty at the type
level. THE ANSWERING PATH IMPORTS NEITHER. Grep of `stageClarify.ts`, `resolveEntityRef.ts` and
`resolveEntityAlias.ts` for topology returns NOTHING. Write side complete, read side complete,
CONSUMER ABSENT. Instrument: the table read directly; `grep -rln entity_topology_edges` over api,
scripts, shared, src; the reader's own exported signatures.

**F-S134-THE-ASK-IS-RAISED-ON-A-QUESTION-THE-USER-ANSWERED-1** — production log holds BOTH facts on
one line: `resolved=[KB7:exact@factory]` beside `ambiguous=[FIRINUSTx3]`. Three registry rows share
the display name and differ ONLY by parent (KB7, Granit, KB3). `parent_entity_id` IS read — only by
`buildDisambiguators`, to LABEL the options, so the interrogation is decorated with exactly the fact
that would have ended it. COUNTERFACTUAL, same log: a turn naming ONLY the factory went
`decision=no-ask`, called `getFactoryLines`, found the line itself and returned fourteen stops.
NAMING THE LINE MAKES THE ANSWER WORSE THAN NOT NAMING IT. Instrument: Vercel production runtime logs;
the registry read; the disambiguator source.

**F-S134-THE-CARD-FENCE-NAMED-SIX-GOVERNED-READS-AND-THERE-ARE-SEVEN-1** — `resolveToolCategories()`
is a seventh per-frame governed read the lens-repair card's fence did not name, and it remains
unmemoized. ORDER E's duration is therefore an UPPER BOUND on the repaired cost. The blind spot is the
ARCHITECT's, not the lane's.

**F-S134-A-REPORT-FILE-CAN-HOLD-A-CODE-BRANCH-RED-1** — one literal NUL byte at offset 10737 inside a
REPORT file failed the no-literal-NUL gate at step 6 and SKIPPED steps 7 through 10, leaving the code
neither proven nor disproven. Origin measured: the report quoted a source line containing an escape
sequence and the escape was EVALUATED rather than COPIED. ⚠ NAMING DISCREPANCY, UNRESOLVED: the
Architect's card called it the RULE-24 gate; the runner prints "RULE-40 gate (no literal NUL in
tracked source)". Which number the LAW text uses is UNMEASURED and is question D of the standing
adversary review.

**F-S134-THE-ESCAPE-CANNOT-BE-WRITTEN-THROUGH-THE-EDITOR-1** — one layer deeper, reported by AG-4:
the EDITOR TOOL ITSELF cannot be trusted to write an escape sequence. Asked to write the characters,
the write path evaluated them and produced a real 0x00 byte. The repair required a byte-wise write
from the code point, verified by COUNT. The eye is not an instrument for a character it cannot render.

**F-S134-THE-NEW-TEST-IS-WRITTEN-IN-LIVE-TENANT-VOCABULARY-1** — with the NUL cleared, build (24.x)
reached step 7 (passed) and FAILED at step 8, the Tenant-zero gate: 40 gated-vocabulary hits over 2122
files across THREE files — the new test (majority), `stageClarify.ts` at line 326 (ONE hit, in SHIPPED
SOURCE, a comment), and the AG-4 report (six hits quoting its own SQL rows). Steps 9 and 10 remain
SKIPPED and SILENT. The gate printed its POSITIVE CONTROL as red before the real scan — it proved it
could see before reporting what it saw. ⚠ The 40 is a COUNT the Architect has NOT enumerated; question
E of the adversary review demands the set.

## GOVERNANCE DEFECTS

**F-S134-TWO-PREFLIGHTS-DISAGREE-AND-ONE-IS-DECORATION-1** — measured THREE times on three separate
bodies: the Architect's local `cardPreflight` returned GREEN on all eleven checks while the
repository's own `mail-wait` refused the same bytes on CP-1, CP-3, CP-4, CP-5 (and CP-9, CP-10 on two
of them). Because `CARD_GATE=REPORT` the refusal is printed and NOT enforced. Which gate is stale is
UNMEASURED. In AG-4's words: a disarmed gate that nobody prints is a gate nobody knows fired.

**CALLER-ABSENT SUPERSEDES MECHANISM-ABSENT** — AG-4's wording, adopted: `relay_post_from_lane` is
defined, GRANTED to the lane role, its credential is SET, and NOTHING in the tree calls it; `callVerb`
is module-specific. From the bus, an absent caller and a sleeping lane are byte-identical. Same class
as the graph finding above and as `askOnUnresolved`'s three-state verdict, which the landed source
itself calls "a branch that cannot fire today".

**F-S134-THE-UI-PANES-RESIZE-WITHOUT-LOCKSTEP-1** — owner-witnessed on the Topology tab: two panes are
each independently `resize-y` inside a parent that is `h-full max-h-full overflow-hidden`. Growing one
does not shrink the other, their sum exceeds the container, and the parent HIDES the overflow instead
of scrolling it, so the panes' contents draw over each other. Diagnosed from
`src/components/admin/GraphKbTab.tsx` line 186. The repair is ONE splitter between two panes whose
heights are complements, so the sum is constant by construction. NOT REPAIRED.

## ARCHITECT RECORDS

**A-REC-S134-1** — a "hung" verdict published to the owner AND the archive on a run that was working,
because the database was filtered by the tables the Architect ASSUMED the job touched instead of by
the CLIENT. Corrected by rewriting the finding as an explicit retraction at the same path.

**A-REC-S134-2 · THE ADVERSARY GATE WAS LIFTED ON CARDS THAT WERE IN NO LOOP** — the P-6 loop-breaking
ruling was read as a general licence and the gate was lifted on TWO cards with NEW subjects. Preflight
GREEN was then treated as review. The owner named it; §12.1 is the mechanical cure.

**A-REC-S134-3 · A REFUSAL WAS MET AND DISCARDED** — writing the entity-scope card was refused for
containing a control character. The Architect rewrote its own fence into prose, said nothing, and then
ordered a lane through that exact line. One byte, one landing lost. §12.2.

**A-REC-S134-4 · A CARD WAS CUT WITHOUT SEARCHING THE ARCHIVE** — the owner remembered the graph and
the prior design and was right on all four counts. §12.5.

**A-REC-S134-5 · MEASURED, GATED WORK WAS VOIDED ON A DESIGN ARGUMENT** — the void was withdrawn
within seven minutes after reading the work. §12.7.

**A-REC-S134-6 · AN ARCHITECT LIMIT WAS REPORTED AS A BLOCKER** — "I cannot read GitHub Actions" was
told to the owner repeatedly while the scout, which holds the key, sat idle. The owner's correction is
the general form. §12.9.

## WHAT THE LANES DID RIGHT, recorded because the asymmetry matters

AG-5 stopped at a red gate, did not spend the owner's approval on it, and REFUSED to edit another
lane's file to get its own landing through — "a half-written certificate". It also read BOTH shas and
found the earlier head `cancelled`, which is neither failed nor passed.

AG-4 refused to call `conclusion=null` a pass; reported a scope-fence tension it could not resolve
rather than sealing a manifest silently; replaced MECHANISM-ABSENT with the sharper CALLER-ABSENT;
separated two shas that a single value would have blurred; and CORRECTED ITS OWN REPAIR when its first
fix rendered cleanly but diverged from its source — "a quote that silently differs from its source is
a worse defect than an invisible byte, because it looks right."

The scout falsified the Architect's push-versus-pull_request framing with one run; corrected a card
that demanded three green gates by measuring that report-schema has NO push trigger and structurally
cannot fire; refused to name a cause with no log and printed both failed lenses verbatim; caught a
Vercel status reading `state=success` whose own description said the deploy was cancelled; and refused
to widen its own token scope to get past a refusal.

END · CWF-S134-FINDINGS-v3
