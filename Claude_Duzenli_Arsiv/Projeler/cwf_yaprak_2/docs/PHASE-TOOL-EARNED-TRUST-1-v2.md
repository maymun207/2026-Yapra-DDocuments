# PHASE-TOOL-EARNED-TRUST-1 · v2 — LANE: AG-1

<!-- PHASE-TOOL-EARNED-TRUST-1-v2 · 2026-08-06 · S82 · Architect: Claude (Opus 5).
     SUPERSEDES the combined relay's §B (v1). v1's §B0 premise — "the data layer
     is DONE, input_schema is mirrored" — was FALSE for gateway inner tools, and
     the falsifier was AG's pre-design mirror read: 22/22 superset rows carry
     {tags, annotations, parameters_hint:"request"}, zero carry 'properties'.
     The Architect owns the premise error: §B0 was written from the repository
     API's shape, not from the rows. It enters the premise ledger.
     AG's conduct is the model case: no rename-around, no hint-called-a-schema,
     no unilateral redesign, empty branch deleted. -->

**Anchor:** `origin/master` = `95d81072a54f7d98ef68c62ccfda82ac90b3cb9c` (Phase A merged).
**Branch:** `phase/tool-earned-trust-1` · S82-4 base proof · own worktree (`cwf-<phase>`
pattern — the two-lane standing rule; the main folder is no lane's cwd).
**Closes BUG-021** (7 recorded instances). ZERO migrations. Touch budget 4.

## §STEP-0 (BLOCKING, before any phase work) — push the rescue branch

`git push origin rescue/chore-mcp-supabase-ro-f75b1f9`. Third request; it now blocks the
phase. One command, then proceed.

## §0 · The corrected premise, from AG's own measurement

The gateway **never emits inner-tool argument schemas.** `search_tools` returns
name/description/annotations/tags/`parameters_hint` (21/22 literally `"request"`), the
model already sees all of it, and still guessed wrong seven times. **More of the same
information is not the missing ingredient.** Route (1) — capture real schemas at sync —
is a DEAD END until the Superset MCP server changes; §4 files that as an outbound
request, not a wait.

## §1 · Owner ruling (2026-08-06): BOTH halves, one phase — S82-6 forbids the half-organ

- **(2) alone** closes 6 measured instances at governed-data cost and cannot scale —
  the minimalist patch S82-6 exists to ban.
- **(3) alone** repairs the symptom in-turn and leaves the disclosure gap.
- **Together:** the overlay puts knowledge FIRST (right call on the first attempt for
  the tools we know); repair catches what escapes (the wasted round-trip becomes a
  corrected one); `[TurnEfficiency]` (Phase A, live) measures both with one number.

## §2 · G1 — governed `tool_doc` overlays for the measured instances

The machinery exists and is composed today (`resolveToolDocs`, F163, append/replace).
**No new machinery.** Author overlays as GOVERNED DATA (publish, no deploy) for the
tools BUG-021 actually hit — from the bucket's evidence log: `get_chart_data`
(`identifier` not `chart_id`; `form_data_override` shape), `get_chart_info`,
`list_charts` (`request.search` — the filter the model found once on `b835babd`),
`list_datasets`, plus the remaining recorded instances (enumerate them from the
BUG-021 entry; name each in the report).

- Each overlay is ≤ ~600 chars, argument-shape-first, in the description's language
  (EN — tool descriptions are EN today).
- **Mode `append`, never `replace`** — the server's own description stays; we add the
  argument contract beneath it (ADR-010: a declaration is a claim; our overlay is
  observed knowledge ABOUT it).
- Publish path: the existing gated admin flow. **The phase report lists the exact rows
  published** (key, chars) so the owner sees the data, not a summary of it.
- Red-first: with the overlay published (test seam), the composed model-facing
  description contains the argument contract; without it, byte-identical to today.
  Both directions.

## §3 · G2 — the in-turn repair path (`experimental_repairToolCall`, ai@6 — verified in
the installed types by the Architect)

Wire `repairToolCall` in `gateway.ts` beside `stopWhen`:

- **Triggers ONLY on our gateway's validation-error shape** (`Validation error in
  <tool>: … 'identifier' or 'form_data_key' must be provided` class). Any other failure:
  return null (no repair, today's behaviour byte-identical).
- The repair is **deterministic, not an LLM call**: a small rule map from the error's
  named field to the argument transposition (`chart_id` → `identifier` string-coercion is
  instance #1..#7's entire shape). No rule matches → null. **A repair that guesses is
  BUG-021 wearing a mask** — the map is closed and tested.
- Every repair is recorded: `recordBrake`-style ledger entry? **NO** — a repair is not a
  brake. New ledger field `toolRepairs: {tool, field, count}[]` on the SAME ledger,
  present-and-empty on clean turns (the `brakes: []` posture verbatim), carried on `done`
  (S82-5: parser names it; parser-entry test), rendered as a chip ("1 çağrı onarıldı —
  <tool>") — an invisible repair is a silent lie about how the sausage was made.
- Cap: max 1 repair per call (the second failure surfaces as today's error — repair must
  never loop).

## §4 · Named outbound request (not a wait)

File `SUPERSET-MCP-REQUEST-1` in the report: ask the Superset MCP maintainers to emit
inner-tool argument schemas on `search_tools` (the `parameters_hint` slot already
exists; a `parameters` object beside it closes route (1) permanently). RAG-notes
precedent: state what we observe, what we ask, and that our overlay/repair does NOT
retire their fix.

## §5 · Proofs

Unit: overlay composition both directions · repair map closed (unknown error → null,
mutation: widen the trigger → a planted foreign error must NOT repair, test red) ·
parser-entry chip test · repair cap (second failure passes through).
**Post-deploy (S63-1):** the ten-day gas question, live, third time — `get_chart_data`
called with `identifier` on the FIRST attempt (overlay working), zero validation errors;
if the model still misses, the repair chip shows the correction and the turn does not
waste the round-trip. Paste `[TurnEfficiency]` beside the 2026-08-06 baseline (8 calls,
one wasted round-trip). BUG-021 closes on this trace + the per-instance table in the
report (each of the 7 instances: which half addresses it).

## §6 · Standing rules

Report in-branch same push · `## MERGE` with the merge commit, never pre-written ·
no control chars in prose · claims cite commands or carry "taken from the brief, not
verified" · nothing under the rug · question-round-trip count (streak 5 zeros — keep it)
· list touched files (lane-conflict check is a read). **Lane note: AG-2 is inside
`src/lib/chatParser.ts`/`chartData.ts`/render — your chip work touches `toolEvidence.ts`
/`chatSurface.ts`/`cwfService.ts`/`cwfStore.ts`; those are NOT in AG-2's set (verified
against AG-2's brief §, which forbids it those files' server siblings). If you find
yourself needing a file in AG-2's list, STOP and report.**
