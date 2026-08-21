# GO — PHASE-INSPECT-VERDICT-1-FIX-1 · MERGE AUTHORIZATION · v1
<!-- GO-INSPECT-VERDICT-1-FIX-1-MERGE-v1 · 2026-08-03 · S79 · Architect
     RULE-25 review PASSED from a fresh full clone (is-shallow=false).
     Independent recounts: 6 files / +423−50 · 65 migrations · `git diff
     -- api/` EMPTY · manifest diff = docVersion + 7 lastSyncedCommit only ·
     the whole InspectTab delta and the colour-blind test read in full.
     Self-contained per D-2. -->

## §1 · PRECONDITION (S47-1)
- `git rev-parse origin/master` → `11061d8cb4280d2499fc1ccbdfc3231463d1b8e0`
- `git rev-parse origin/phase/inspect-verdict-1-fix-1` → `2c349b229b46f68255ad3ecd5e6949f7ef983d26`
- Exactly ONE commit over master. Any mismatch → STOP and report.

## §2 · RULING ON DEVIATION (a) — VERDICT-FILTER-EVENTS-INERT-1
**It belongs in THIS phase. Do not split it out.** The reasoning, because
the rule generalises past this case:

The scope fence exists to keep a review tractable and to stop creep. It does
not exist to force a phase to ship a sentence it knows to be false. G2's
whole payload is a line telling the reader *the verdict filter is active and
nothing matches it* — rendered in a view where, before your change, that
filter narrowed nothing at all. Splitting would have meant knowingly
shipping that sentence into the Events view for one merge cycle. A fix may
extend to whatever is required to keep its own new statement true.

Two things make it clearly inside rather than adjacent: it is the owner's
own third question ("does anything change when I press it?") in its severest
form — the control was *literally inert* in one of two views — and it is two
lines plus a dependency array, in the file already being rewritten, joined
by the same by-value key the chips use (RULE 28), with its own test pair
that M4 killed and nothing else did.

**And you did the one thing that made this ruling available: you flagged it
instead of assuming it.** That is the standing rule — an unauthorized
extension is reported for a ruling, never quietly absorbed. Recorded as
FIX-SCOPE-TRUTH-1.

**Deviation (b) — the `oy: hepsi` / `verdict: all` label — is accepted as
your judgement, and it is better than my brief.** Two adjacent triggers
reading the same bare word would have rebuilt, inside the trigger, exactly
the ambiguity the control replaces. Your reworded G2 sentence is also the
correct call: my draft asserted the filter was THE cause, which is false
when a search needle emptied the view first. Naming the filter as
active-and-unmatched is true under every combination — you caught an
exclusive-causation claim, which is the same fault class this fix exists to
close, one layer up.

## §3 · CI GATE (BLOCKING — the sole test arbiter, S37-2)
Open a CI-trigger PR `phase/inspect-verdict-1-fix-1` → `master`.
**PASS CONDITION:** every check green on head `2c349b22` (`eval-canary`
skipped on a PR event is the standing pattern and is a pass; `in_progress`,
`queued`, null or absent is NOT). `rule26` carries four new measurements per
width — if it reds, STOP and paste the log; no rerun without an
evidence-justified cause with signatures shown.

## §4 · MERGE (only after §3 pass)
`--no-ff` (squash banned). Merge-commit message VERBATIM, byte-exact, single
line, no trailers (S30-2):

Merge PHASE-INSPECT-VERDICT-1-FIX-1: the verdict filter states its value instead of wearing it, narrows both views instead of one, and an emptied panel says which filter emptied it

## §5 · PUSH + REPORT (all from the REMOTE)
1. `git rev-parse origin/master` (new merge hash)
2. PR run id + per-check results, and the master run id + per-check results
3. `git ls-remote --heads origin` (prune optional, reporting is not)

No Operator relay (zero migrations, zero governed writes). After the merge
report the owner does one hand-witness in the panel.

## §6 · REVIEW VERDICT (carried in full)
PASS.
- **The control now states its value.** `verdictFilter: 'all'|'up'|'down'`
  behind a `Select` of the same shape and width as the `type` dropdown; one
  `VERDICT_FILTERS` constant and one `verdictFilterLabel()` feed both the
  option list and the closed trigger, so the value picked is the value read
  back — there is no second place for the label to drift to. Removing
  `aria-pressed` rather than keeping it beside a combobox is right: it
  would have described a state the element no longer has.
- **Absence stays absence.** `verdictFilter !== 'all' && …?.verdict !==
  verdictFilter` excludes unvoted turns from BOTH buckets and admits them
  only under `all` — the same discipline the chips already keep. The Events
  predicate carries it too (`!!r.session_id &&`), so a row with no turn id
  cannot fall into a verdict bucket by accident.
- **`emptyNote` is computed once and passed down**, so the tiers body and
  the flat list cannot drift into describing the same emptiness
  differently. It stays separate from the `verdictsFailed` marker, and the
  test asserts the two strings are not equal — both facts can be true at
  once and now render as two.
- **The colour-blind test is real, not nominal.** It collects the trigger's
  `textContent` across all three states and asserts three distinct strings;
  every assertion reads text, so it would pass with every colour in the file
  identical. That is precisely the property the old fill never had, and it
  is now pinned by something that cannot be satisfied by a fill.
- **Mutation pass, 5 run and 5 killed, each by the test that should own it**
  — including M4 (delete the Events predicate) killed by exactly the two
  Events tests and nothing else. A test suite where each net catches its own
  fish is a suite that will still mean something in six months.
- Producer and both read doors frozen: `git diff -- api/` EMPTY, verified
  independently; fence test byte-unmodified; `crossUserDoor` untouched.

**Process note, not a blocker — WORKDIR-DISCIPLINE-1:** you again worked in
an existing clone rather than a fresh one (declared, with the verifiable
properties re-proven, which is the right way to declare it). That is the
second occurrence this session, after the merge that ran in the primary
repo. Neither caused damage and neither is disputed — but the brief says
fresh clone because a `reset --hard` preserves only what you remember to
check, while a fresh clone preserves everything you didn't think to. Pin the
working directory per command; do not carry it across a wait.

**Named findings, still deferred, still not for this branch:** IV1-R1 (the
endpoint's 100-id bound vs the repository's 1000-id bound) · IV1-R2 (the
e2e harness exercises the cross-user door only) · E2E-RETRY-MASK-7 (the
seven obsolete CI-retry blocks — rollout plan 2.3).

<!-- TAIL ANCHOR (S61-3): this relay ends after the words "plan 2.3)." and
     this comment. Missing line = truncated relay — request a re-send. -->
<!-- END · GO-INSPECT-VERDICT-1-FIX-1-MERGE-v1 -->
