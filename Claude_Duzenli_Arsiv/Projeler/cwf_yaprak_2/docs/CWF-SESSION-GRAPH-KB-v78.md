# CWF — Session Graph KB · v78
<!-- CWF-SESSION-GRAPH-KB-v78 · 2026-08-03 · S79 (Claude Opus 5).
     Supersedes v77. This file carries LESSONS, not state; state lives in
     cwf-open-items-register-v82. -->

## §1 · What S79 shipped
Four merges in one session, each gated: **M1F1** (feedback producer,
`dec3ff55`) → **E2E-DEVSERVER-API-404-1** (`16a5e831`) →
**INSPECT-VERDICT-1** (`11061d8c`) → **INSPECT-VERDICT-1-FIX-1**
(`e214b7e6`). Rollout plan 1.2 and a newly-minted 1.2b are closed; the
verdict a user gives a turn is now visible where turns are already read,
in both Inspect views, with a filter that states its value.

## §2 · The lessons worth carrying

**L1 · A gate is worth exactly as much as its willingness to stay red.**
Three separate mitigations were on the table for a red CI gate — hide the
overlay, retry inside the spec, rerun the job. All three make the gate
green; none makes it sound. The one that fixes the instrument (the dev
server refusing `/api/**` instead of transforming a server module and
broadcasting the failure over HMR) removed the whole family and let the
gate pass on first attempt, twice, without spending a retry.

**L2 · "Flaky" is often one deterministic bug wearing many faces.** For
months `rule26` read as intermittent because `fullyParallel: true` meant a
different spec was mid-interaction each run. The cause was a single parse
error at a single named path. Corollary: **seven retry blocks had been
written as compensation for it** — each capable of hiding two real
failures. Compensating for a defect you have not diagnosed installs blindness.

**L3 · Ask whether your test was EXPOSED, not whether it was BLAMED.** AG's
first read ("my branch's failures are a subset of the anchor's, therefore
environmental") was correct about the root cause and wrong about the
consequence. A spec with six multi-step interactions is a wider window for
a cross-spec contaminant than a spec with two.

**L4 · A false green is a class, not an instance.** Two found by deliberate
mutation: a render suite that mocked the very function whose `throw` it
claimed to pin, and a page-level RULE-26 assertion absorbed by an ancestor's
`overflow-auto` (measuring a real thing, but not the thing it claimed).
Mutation testing found both; a green suite never would.

**L5 · FIX-SCOPE-TRUTH-1.** A fix may extend to whatever is required to keep
its own new statement true. The verdict filter was inert in the Events view;
shipping "the filter is active and nothing matches" there would have named a
cause that was not the cause. **The ruling was available only because the
extension was flagged, not absorbed.**

**L6 · A control whose only state channel is a background fill cannot be
read.** `aria-pressed` was correct and invisible. The repair — a three-valued
Select whose closed trigger shows the chosen value as TEXT — also removed an
ambiguity nobody had named: a thumbs-down BUTTON in a panel full of
thumbs-down CHIPS can be misread as "am I voting?".

**L7 · empty≠zero reaches the filter layer.** A filter that can empty a
panel owes the reader the reason it is empty. With zero `down` verdicts in
production, the old generic "Veri yok" made "I filtered" and "this panel is
broken" render as the same screen. And the sentence must not claim
EXCLUSIVE causation (a search needle may have emptied the view first) —
naming the filter as active-and-unmatched is true under every combination.

**L8 · Two empty-states are two facts.** "Your filter matched nothing" and
"the verdict lookup failed" have different remedies and can be true at once.
Test-pinned as two distinct strings.

**L9 · Absence is not a verdict.** A turn with no vote passes only under
`all`; it is swept into neither bucket, and renders no chip — never a
neutral grey zero.

**L10 · A log line proves what the DEPLOYMENT that emitted it contained.**
(PREMISE-S79-1.) Reading a tick from a pre-fix deployment and recording it
as the fix's proof is a whole class of false evidence.

**L11 · Check which side of the wire your sensor lives on.** (PREMISE-S79-3.)
A promised production log read was impossible: the log is a browser
`console.info`, and the personal read door never reaches the server at all.

**L12 · A conflicted merge is where reviewed bytes quietly change.** The
GO required proving they did not: an empty diff across the seven reviewed
code paths, plus a count that both harness stubs survived the auto-merge.

**L13 · Never hand-merge a hash.** The repo's own recorded precedent
(OBS-TRACE-2) held: take one side's manifest wholesale, re-apply the
authored note text, let `reseal` compute every hash and the docVersion. And
**two trees must never both claim the same rev** — the merge result takes
the next one (181, not a second 180).

**L14 · CI before master, even when a PR cannot compute it.** A conflicted
merge was pushed to a temporary branch, arbitrated there, and master
advanced to that exact commit — the tested bytes are the merged bytes.

## §3 · Method notes
- The two-door discovery (Inspect reads via a gated admin endpoint for
  cross-user and a browser RLS SELECT for "me") came from RECON, not from
  the phase. A brief written without it would have wired the badge to one
  door and produced a feature invisible on the default screen.
- Every Architect premise error this session (3) was self-declared before
  the owner raised it. That is the intended behaviour of D-3, not a
  concession.
- Positive controls were demanded and delivered at every zero: a zero-surface
  grep positive-controlled against directories that do carry the token; a
  fix proven able to fail before it was written; an overlay-absence assertion
  that first waits for the panel and then proves a click lands, because a
  blank page also has no overlay.
<!-- END · CWF-SESSION-GRAPH-KB-v78 -->
