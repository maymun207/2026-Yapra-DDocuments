# CWF — Session Graph KB · v82

<!-- CWF-SESSION-GRAPH-KB-v82 · 2026-08-05 · closes S81 (OWNER numbering; the
     artifacts of earlier sessions ran two ahead). Supersedes v81. -->

## S81 in one paragraph

Five phases merged, eight bugs closed on live production reads and not one at
merge, master `a6252b20 → 5f2dee58`, zero migrations all day. The bucket grew
from 8 open entries to 17 — not because the system got worse but because the
owner started looking, and nine of the ten entries opened today came from him
asking real questions of the live product and reading build logs nobody had been
reading. Three new laws were minted, all against the Architect: nothing goes
under the rug, a frozen entry is not a live read, and every entry names the
instrument that will prove it fixed. The last phase of the day shipped with zero
question round-trips, which is the first measured evidence that the laws work.

## The thread, and where it led

The day opened on a boot that passed every floor check and one that did not: the
test total could not be re-derived, because the GitHub API refuses an unidentified
sandbox and a local suite run produced no output for an hour. The Architect
proposed building a CI artifact to carry the number — and then found the number
already sitting in `.agents/CHANGELOG.md`, one grep away. The proposal was
withdrawn by evidence rather than by argument, and the pattern of the day was set
in the first hour: **look before building.**

`ROUTE-OPEN-2` closed a counter that could not see the slice it was counting.
`writeOffered` had been correct code that became wrong when a neighbouring phase
widened the population it counted over — so the fix was a three-valued union
rather than a patched filter, because a boolean lets a call site skip the "I
don't know" case while `'read' | 'write' | 'unclassified'` drags every consumer
into deciding. AG caught the brief's central premise error before building: the
floor's map is empty, not null, so the Architect's guard would never have fired
on the live floor and would have shipped the very false zero the phase existed to
remove.

Then the owner asked the same question of production three times and got three
different answers — a fabrication with zero tool calls, a 28-query scan that
knocked over the customer's own BI server, and one honest chart. Reading those
three turns produced four entries in one morning, including the one that mattered
most: **a chart whose axis labels lost their leading digit**, showing an operator
a number 8.5× too small about his own factory. Everything else that week made the
system fail; that one made it succeed while lying.

`AXIS-TRUTH-1` fixed it, and the proof was a ladder predicted before the fix
existed — `340K · 255K · 170K · 85K · 0` rendering exactly where `40000 · 55000 ·
70000 · 85000 · 0` had been. Two earlier attempts at that proof were recorded as
attempts rather than counted as passes: one drew no chart, one drew a chart whose
longest tick was three characters.

`OUTAGE-TRUTH-1` took three entries at once — an outage reaching the user as a
scope refusal, as an absence of capability, and as a locked door for the model.
The owner ruled the mechanism himself: never suppress model output, never
string-match a governed segment, and let the truth stand beside the prose rather
than replacing it. Both rejected options would have been faster and both would
have broken something that matters more than minutes.

The proofs needed an outage, so the owner ran one — four turns on our own
testbed, then two on ARMES. It closed three entries, and it handed back two
controls the project had already written off as unobtainable, which is what
honesty about a gap buys you.

Then the window produced an incident of its own: editing one backend's URL marked
two healthy backends down. The reason was written to a database column and
rendered nowhere, so the diagnosis stalled for an hour until a cron tick proved
the rows false. `HEALTH-TRUTH-1` shipped the instrument first and the fix second,
in that order and for that reason.

The day ended on the build log the owner kept reading and nobody else did.
`TYPEGATE-TRUTH-1` found that the 2026-07-07 remedy for those twenty-six errors
had been **right and silently discarded on every build for 190 merges** — right
file, right key, missing sibling — and that the obvious fix would have been a
second silent no-op. AG ran all three variants instead of reasoning about them.

## The best hour: the owner's question about time

Late in the day the owner asked why everything took so long, and the honest
answer was measurable rather than rhetorical: the Author's writing window was
13–44 minutes per phase; the merge-to-merge cycle was 61–195. The Author was
never the slow part. Two changes came out of it — the report now lives in the
repo so the owner stops couriering it, and question round-trips became a number
reported per phase. The very next phase reported zero.

And one more diagnosis was wrong and was corrected by a screenshot: the Architect
concluded the Author was "asking permission paranoically" when the Author was
asking nothing at all — the client was opening an approval dialog for every
command, including read-only ones.

## Sentences worth carrying

> **An unknown is not a verdict.** A probe that did not complete records neither
> `up` nor `down` — `empty≠zero`, one storey up from where it was first learned.

> **A near miss is never a pass.** Two attempts at BUG-018's proof failed and
> were written down as failures, in an entry that also records the fix shipping.

> **The remedy was not ignored. It was read, and then thrown away.** A month of
> a correct fix being silently reverted, because the only artefact that could
> falsify it was a build log.

> **A frozen entry is not a live read.** Rule 2 freezes bodies to make this file
> trustworthy; that same freeze makes them AGE as fixes land around them.

> **Reporting an unreproduced mechanism would have been the easy lie.** AG built
> a harness, could not reproduce the failure, said so, and shipped an invariant
> instead of a story.

## What the owner ruled

- **Nothing goes under the rug** — minted as rule 12 with a positive control the
  owner can run without reading code: a defect discussed and absent from the next
  register version is a violation, cancelled by name.
- The scope-refusal mechanism: **never unaccompanied**, never suppressed.
- BUG-007's remedy moves to the offer boundary, because a remedy triggered only
  by model misbehaviour is a remedy nobody can prove.
- `FAULT-SWITCH-0` before BUG-006 and BUG-009; **BUG-006's proof on a preview
  deployment**, not production.
- **BUG-005 last** — *"her şey bitti, kapakları kapatıyoruz."*
- `TOOL-EARNED-TRUST-1` ahead of the prose work.

## Carried forward, unresolved

- **Seven instrument false-readings** this week, and no gate yet that reds on the
  class. Two written laws (S82-2, the premise corrections) still enforce nothing.
- **The `## MERGE` half of the relay rule failed on its first use** — the phase
  report landed in the repo, the merge report did not, and the owner filled the
  gap by hand.
- **`supabase-ro` needs authorising** in an interactive session; it blocked the
  only live database read the day required.
- **Ten `phase/*` branches** on origin. Two were pruned; the rest are from older
  phases.
- The **ARMES-hegemony** theme — six places assuming *backend means ARMES*, two
  of them (`redirectAllowed`'s single caller, `exposureByTool`'s `armes.`
  namespace) with no entry and no reading. `BACKEND-PARITY-RECON-1` was proposed
  and not yet ruled on.

<!-- END · CWF-SESSION-GRAPH-KB-v82 · closes S81 -->
