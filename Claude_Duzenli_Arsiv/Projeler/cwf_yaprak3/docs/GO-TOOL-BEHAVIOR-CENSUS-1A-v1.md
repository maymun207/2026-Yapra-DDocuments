# GO-TOOL-BEHAVIOR-CENSUS-1A · v1 — Architect → AG-1

**Review verdict: PASSED.** Independently verified on your head `9afc17a`:
49/49 across the three suites. `tool_behavior_census` is declared
`operational.mirror` in the same commit that creates it — ADR-014 satisfied on
its first real test, one day old.

The R1–R5 table is the best artefact in this wave. Three things I want on the
record because they are the difference between a phase and a half-organ:

- **§R3's absence is named with its live consequence**, not softened: a tool
  that was `unread` once stays `unread` until someone reconnects. And you
  shipped `probed_at` + its index NOW so 1B's staleness scan does not need a
  second migration against a table that by then holds rows. That is thinking
  one phase ahead correctly.
- **You refused to let an `error` record reach the prompt.** R3 says a first
  failure is not a permanent verdict, R3 does not exist yet, therefore
  composing "this tool refused" into every model's prompt would bake a
  possibly-transient failure in with nothing scheduled to take it back out.
  `renderCensusNote` returns null for `error`/`unread` and a mutation proves
  it. That is the correct reading of an unbuilt dependency.
- **You kept the census off the 30-minute health cron** and named why: a
  standing 25-call burst against a customer's MES every half hour is exactly
  BUG-020. R1 says *connect*; a periodic census is R3's, with its own
  staleness gate and its own budget.

## R1 · Out-of-fence edits — ACCEPTED, both
`api/admin/mcp-settings.ts` is one argument on the connect path, and without
it R1 is not shipped at all — a census that nothing calls is not a census.
You ran `test:rule26` locally (132 passed) because the admin surface was
touched, which is the standing rule. `learnBrake.test.ts` likewise disclosed.
Correct calls, correctly reported.

## R2 · The partial-catalogue fact stands as declared
Budget fence 25, ARMES publishes ~97 read-annotated tools ⇒ a large catalogue
is only PARTIALLY censused today, and the plan says so rather than implying
coverage. This is a 1B input, not a defect in 1A.

## R3 · The key does NOT turn yet — stated for the record
SOTA gate stays **1/7**. #10 closes when 1B lands (R2 ledger + R3 cron/fresh +
R4 evolution diff). 1B is next in your lane.

## STEPS AT YOUR MERGE TURN
You are LAST in this wave; the other three have merged. Current
`origin/master` head is FRAME-SHADOW-EVIDENCE-1, docVersion **rev 239**.
1. `git fetch origin` + rebase onto current `origin/master`.
2. Read `docVersion` MASTER-side, take the NEXT number (expected **240** —
   READ it, do not assume). `npm run reseal` on the REBASED worktree, bump in
   the SAME commit. A demanded REDRAW is a STOP-and-report.
3. Your migration `20260812200000_tool_behavior_census.sql` is the wave's only
   one; no restamp needed unless a later timestamp has landed on master —
   check the ledger top and restamp if so.
4. CI on the PR head: every job `completed` + `success`
   (`in_progress`/`null` is NOT a pass; `eval-canary skipped` expected).
5. Merge `--no-ff` with the VERBATIM message below. Squash banned.
6. Report merge SHA, post-merge `origin/master`, docVersion, and the ledger
   top. **Do NOT apply the migration** — the Operator relay is mine to author.

## VERBATIM MERGE MESSAGE
```
TOOL-BEHAVIOR-CENSUS-1A: what a tool DOES, beside what it says it does

A declaration is a claim. ADR-010 has said so for a while, and the field
proved it: a tool declared a required array, and an empty array turned out to
mean "all" — behaviour the schema never admitted. This lands the organ that
finds such things by trying, rather than by someone eventually noticing.

Phase 1A ships R1 and R5's write-side and nothing else, and the report states
per-rule what is owed to 1B rather than leaving the shape implied. R2's
positive-experience ledger, R3's cron re-discovery and FRESH flag, R4's
evolution diff are named, not stubbed: there is no "experience" column that
could be read as "none yet", and the census's outcome is about a PROBE, never
about a turn.

Probe families are SCHEMA-DERIVED — no required params, required array,
required identifier — so no tool name and no backend name appears anywhere in
source. Read-only selection comes from the same annotation source the catalog
mirror reads, per ADR-011, rather than from a list someone maintains. The
empty-array attempt is not a curiosity; it is the S87 finding turned into a
standing probe.

Three outcomes throughout, never two: ok, error, unread. Budget exhaustion is
unread, not a failure and not a zero, because a probe that never ran has said
nothing about the tool. An empty result is DATA — the one case this organ
exists to catch cannot be allowed to look like nothing.

The record stores PROVENANCE, not payload. An empty array and a
schema-published default are stored verbatim, both being the backend's own
declaration; a discovered entity id is stored as its SOURCE and never as its
value, because "this slot accepts an identifier" is the behavioural claim and
the id itself is tenant data that adds nothing. The sample is a value-free
structural sketch, depth- and width-capped, with truncation recorded as a node
at the place the cap fired rather than a flag over the whole.

An error record does not reach the prompt, and that is deliberate. R3 says a
first failure is not a permanent verdict; R3 does not exist yet; composing
"this tool refused" into every model's prompt would bake a possibly-transient
failure in with nothing scheduled to take it back out. The census records
every error — that is what the table is for — but does not yet get to say it
out loud.

The census is NOT on the health cron, for the same class of reason: a standing
25-call burst against a customer's MES every thirty minutes is precisely the
failure the burst guard exists to prevent. R1 says connect; a periodic census
is R3's, and it will arrive with its own staleness gate and its own budget.

R5's write-side rides the existing description-composition seam beside the
governed overlay and the factory hint, gated by toolCensus.composeEnabled at
floor 0 — so this merge changes no production prompt until the owner turns it
on. Nothing is authored per tool, per backend or per field: every word comes
from the probe's own call shape and the observed response, which is the whole
point. Connecting a backend tomorrow is meant to be the only thing anyone
does.
```

## AFTER MERGE
Stand by; the 1B prompt follows immediately.

>> BLOCK: AG-1 <<
