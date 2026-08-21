# PHASE-SIGNAL-SOURCE-1 · v1 — LANE: AG-1

<!-- PHASE-SIGNAL-SOURCE-1-v1 · 2026-08-06 · S82 · Architect: Claude (Opus 5).
     Closes BUG-028 + BUG-029 — two defects, ONE disease: a user-facing sentence
     trusting the WRONG SIGNAL SOURCE (a counter that skips local tools; a language
     flag that follows a UI preference instead of the question). AG-2's returned
     mechanism derivations are this brief's foundation, verified at anchor.
     Own worktree · branch from current origin/master (40085d62 at authoring; S82-4:
     prove at cut) · ZERO migrations · touch budget 5 (two bugs). Each bug gets its
     OWN proof — a folded bug is still a bug. -->

## §A · BUG-028 — the header count is derived from a counter the local tools never touch

**Measured twice in production** (13 vs 14 on `90f1f5ed`; 8 vs 9 on `27f4ec93`):
`ctx.toolCallCount++` lives only in the MCP execute closure (stageTools:~783 vicinity);
the three local closures — `resolve_time_range` (:1194), `aggregate_records` (:1214),
`query_records` (:1219) — never increment anything. The evidence list renders from the
raw results; the header from the counter; every turn using a local tool disagrees with
itself.

**AG-2's returned refinement is adopted verbatim, and my earlier fix is REJECTED for the
reason AG-2 gave:** moving the header to `ledger.calls` alone yields 13==13 — two
surfaces equal and both wrong. **The fix is at the source:** the three local closures
record into the SAME ledger (`recordCall`-class entry on `ctx.toolLedger`, tool named,
success/failure honest — a throwing local tool records a failure, not nothing), and the
header count derives from `ledger.calls` (stageStream — `toolCalls:` at :232 and the
done payload's count come from the ledger, `ctx.toolCallCount` retired from surfaces or
kept only as the retry-emptiness signal at :196/:260/:266 — do NOT change retry
semantics; if retiring the counter would touch `decideRetry` inputs, keep the counter
for retry ONLY and say so in the report).

**Proofs (both directions):** scripted turn 1 local + 2 MCP → header 3 == evidence 3,
one derivation (ADR-013). Mutation: un-record one local closure → both surfaces move
together to 2/3 mismatch and the parity test reds. Positive control: MCP-only turn
byte-identical counts to today.

## §B · BUG-029 — system sentences follow a UI toggle, not the question

**AG-2's derived chain, verify at anchor then build:** side-panel button →
`currentLang` (default `'en'`) → request body `language` (chat.ts:70) → `ctx.language`
→ every system sentence (`silentFinishMessage`, brake chips' server-side text, scope
notes). The model's prose follows the QUESTION (it answers Turkish in Turkish); our
system sentences follow a display preference nobody set. That is how a Turkish question
got an English budget sentence beside Turkish labels (`90f1f5ed`).

**Ruling (owner-context, now binding): the language of every system-generated sentence
follows the TURN'S QUESTION.** Implementation:

1. New pure `api/cwf/_lib/turn/questionLanguage.ts`: `detectLanguage(text) → 'tr' |
   'en' | null`. **Closed, deterministic, no LLM:** Turkish-specific characters
   (ğüşöçıİ) and a small closed stopword set (bir, ve, için, mı/mi, nasıl…) vs English
   stopwords; ambiguous → null. Short/mixed inputs are the falsifier class — test them.
2. Precedence at ctx build: `detectLanguage(message) ?? request.language ?? 'en'`. The
   UI toggle becomes the FALLBACK it should have been, never the override. (If the
   product later wants an explicit user override, that is a governed decision, not this
   phase — note it, don't build it.)
3. Sweep: every server-authored user-facing sentence reads `ctx.language` from this
   precedence. **List each site in the report** — the sweep's completeness is a named
   claim, greppable (`silentFinishMessage`, BRAKE_CHIP server strings if any, scope
   denial notes).

**Proofs:** TR question + EN toggle → TR sentence (the production case, inverted).
EN question + TR toggle → EN. Ambiguous ("ok") → toggle wins (null path both
directions). Mutation: bypass detection → production case reds.

## §C · Standing rules

Report in-branch same push · `## MERGE` never pre-written (S82-3) · S82-4 base proof ·
S82-5: any done-payload change gets a parser-entry test (none expected — say so if
true) · no control chars in prose · claims cite commands or carry "taken from the
brief, not verified" · nothing under the rug · question-round-trip count · touched-file
list. **Lane note:** AG-2 is idle post-merge; your surface is `api/` + the two
stageStream/stageTools seams — no client files expected beyond possibly chatSurface
ADD-only. **Post-deploy (S63-1):** one live TR turn that fires any system sentence →
Turkish; header count == evidence count on a turn using resolve_time_range. Name both
traces. BUG-028 and BUG-029 close on those reads, not on the merge.
