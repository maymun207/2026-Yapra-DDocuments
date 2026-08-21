# PHASE-PROSE-RENDER-PARITY-1 · v1 — LANE: AG-2

<!-- PHASE-PROSE-RENDER-PARITY-1-v1 · 2026-08-06 · S82 · Architect: Claude (Opus 5).
     ⚡ LANE AG-2 — second job. Same surface family as UNIT-TRUTH-1 (client render),
     which is why it is yours. Build in your own worktree (cwf-prose-render-parity-1),
     branched from origin/master AT CUT TIME with the S82-4 proof — do NOT branch
     from phase/unit-truth-1; the two merge independently and I sequence them.
     CLOSES FOUR BUGS — each with its OWN proof; a folded bug is still a bug.
     BUG-023 · BUG-027 · BUG-028 · BUG-029. ZERO migrations. Touch budget 4. -->

**Lane rule reminder:** your files are client render + shared display logic. AG-1 is in
`api/cwf/_lib/llm/gateway.ts`, `stageTools.ts`, `knowledge/*` (Phase B v2). The ONE
shared-risk file is `src/lib/params/chatSurface.ts` (AG-1's repair chip may add text
there). RULE: you may ADD keys to chatSurface but not MODIFY existing ones; if you need
to modify, STOP and report. List touched files in the report as always.

---

## §0 · Four bugs, four finish lines — from the bucket entries verbatim

**BUG-023 — prose announces a chart that is not drawn.** `trace=816e5698`: text said
"aşağıdaki grafikte" / "grafikten görülebileceği gibi"; no chart rendered (the honest
truncation panel was there instead). The prose is the model's (OUTAGE-TRUTH: never
rewrite it). The defect is OURS: the render layer KNOWS no viz macro rendered, and stays
silent while the text beside it points at a ghost.
**Finish:** when prose references a visual and none rendered, the render layer says so,
inline, at the reference point — *"(grafik çizilmedi — veri tabloda)"* class, both
languages, derived from render state, never from parsing intent out of the model's head:
trigger ONLY on the closed reference-token list (grafik/chart/tablo/table + demonstrative
patterns already used in the codebase's viz-macro detection — read it, reuse it, do not
invent a parallel detector).

**BUG-027 — the scope denial beside the chip that refutes it.** A turn whose evidence
chip lists successful reads still opened with "bu sorunun kapsamı dışında" prose. Same
family: our caption machinery contradicting our own ledger.
**Finish:** when the ledger shows ≥1 successful tool call with records and the reply's
opening matches the closed denial-phrase list, the render layer appends the honest
counter-caption naming what WAS read (counts + tool names from the ledger, no payload).

**BUG-028 — the header count disagrees with its own evidence list (13 vs 14).**
Mechanism already derived (S82): `ctx.toolCallCount++` lives ONLY in the MCP execute
closure (stageTools:783-vicinity); the three local tools (resolve_time_range,
aggregate_records, query_records) never increment it. **This is the one bug of the four
whose fix is server-side** — and it is a COUNTER fix, not a narration fix: the header
count must be derived from the SAME ledger the evidence list renders from (ADR-013
DECISION-PARITY: one derivation, N surfaces). Do not add a second `++` — move the count
to the ledger length so the two surfaces CANNOT disagree again.
**Lane note:** this touches `toolOutcomes.ts`/`stageStream.ts` — AG-1's Phase B does NOT
(verified against its brief: gateway.ts + knowledge/*). If Phase B's merge lands first
and touches them, re-verify at rebase; conflict → STOP and report.

**BUG-029 — Turkish question, English system message.** Mechanism NOT yet derived —
your first task on this bug is the read: how does `silentFinishMessage` (and the other
system-sentence sites) choose language today? `completionGuard.ts` takes a language arg —
find its source, name it in the report. Fix: the language of every system-generated
sentence follows the USER'S question language (the turn's detected language field if it
exists; if it does not exist, derive from the question text via the existing i18n seam —
if none exists, that finding changes the fix and you STOP and report before building).
**Finish:** the 03:43Z-class turn (Turkish question, brake fired) renders its system
sentence in Turkish; an English question renders English; both directions tested.

## §1 · Proofs — four, separately, plus the clean path

1. BUG-023: viz-macro absent + reference token → inline note; viz rendered → note absent
   (mutation: force note off → red).
2. BUG-027: ledger successes + denial opening → counter-caption; genuine out-of-scope
   (zero successful reads) → NO caption (both directions — the honest denial must
   survive).
3. BUG-028: a scripted turn with 1 local + 2 MCP calls → header count 3 === evidence list
   3, derived from one source (delete the derivation → both surfaces change together or
   the test reds — the parity IS the assertion).
4. BUG-029: TR question → TR sentence; EN → EN.
5. Clean path: a normal turn with viz rendered, no denial, no local tools, EN question →
   byte-identical to today.

## §2 · Post-deploy (S63-1)

One live session, four traces named — each bug's finish observed in production, or
reported as not-reproduced-this-run (S81-3: a near miss is never a pass).

## §3 · Standing rules

Report in-branch same push · `## MERGE` never pre-written · S82-4 base proof · S82-5
parser-entry test for any new done/payload field · no control chars in prose · claims
cite commands or carry the label · nothing under the rug · question-round-trip count ·
touched-file list. **Merge order remains mine: UNIT-TRUTH-1 merges before this; both
after AG-1's Phase B unless I say otherwise.**
