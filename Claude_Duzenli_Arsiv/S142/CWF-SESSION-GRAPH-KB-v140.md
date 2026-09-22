# CWF-SESSION-GRAPH-KB-v140

Edges this factory learned in S140. Each is tagged with the session that measured it. An edge here is a
claim about how this system actually behaves, not a rule about how it should -- rules live in the
instructions box and the law corpus. v139 stands in full; nothing here restates it.

---

## THE CLARIFY SEAM AFTER PR 573 / 574 / 575

**[S140] Rooms and are on the live path.** `decideEntityExecution` (stageClarify.ts, PR 573) emits
`diagnosis[]` (LINK / AMBIGUOUS / NIL per mention, with `role` and `rule` 'S140-1-A1:object!=SYSTEM'),
`decisions[]` (RESOLVE / OFFER_CHOICE / NOTIFY / COMPARE) and `blocking`, all in the stage 03 span output.
An ask on the screen is the render of a `blocking: OFFER_CHOICE`, and its options are the decision's ids.

**[S140] The ask-option label falls parent -> self -> layer -> entity-id** (PR 574). Before it, a candidate
with no parent (the factory layer) was labelled by its LAYER KEY and the owner saw "1. factory 2. factory
3. factory". `labelSource` names the rung in the span. Measured on production turn c7fd2bd9... (self x3).

**[S140] The cross-turn carrier is a READ of the previous EPISODE, not a table.**
`EpisodesRepository.listRecentByConversation` ("the A23 CARRIER read") returns the last offerable episode
of the conversation; `memoryDistill.ts` already wrote `entities.canonical` (resolved ids) and `scope` there.
Until PR 575 only stage 05 (prompt recall) consumed it -- CALLER-ABSENT on the clarify path. PR 575 reads it
in the CALLER (`readCarriedResolution(conversationId, taskId, message)` inside the existing Promise.all),
hands the result as DATA to `mergeEntityRegistryResolution` and `decideEntityExecution`, and seeds both
peer sets with `carried.peerIds`. `null` read -> 'unreadable'; `[]` -> 'empty'; missing conversation id ->
'unreadable' with NO query. A carried peer never becomes a resolved ref of the current frame.

**[S140] `decision.ask` is written at distill ONLY for a RENDERED ask** (`ctx.askShown`, stamped inside
`valveOpen && rendered.kind === 'ask-ambiguous'`); a shadow decision under a shut valve writes no ask, so
a later message equal to a shadow option matches nothing. The episode of the asking turn 99ed36d8... carries
`ask: { surface 'firin', options [FIRINALT id, FIRINUST id] }` on production.

**[S140] The carrier's ACTING rungs are keyed on the FRAME'S REFS, not on the message.** On both evening
runs the reply frame carried one ref, "KB7 fabrikasi firin" (the router folded the history phrase; prefix ->
KB7), so `askOption` matched the message but `optionRefs` and `scoped` stayed empty; the tool's zone id came
from the LLM's `getFactoryLines` chain. The morning run of the SAME message carried ref ["FIRINUST", ambiguous
x3]. Frame extraction is stochastic at the ref-shape level; the narrowing rung is proven by pins only.

**[S140] Episode outcome classes seen: 'clean' (an asking turn), 'unproven' (an answered turn whose grounding
was ok but no procedure was registered).** OFFERABLE_OUTCOME_FILTER excludes only 'failed', so an asking
turn's episode IS offerable to the next turn's carrier -- the card's falsifier did not fire.

**[S140] `turn_trace_digest` is keyed `(turn_id, conversation_id, user_id, attribution, created_at, stages
jsonb, token_summary)`; stage output lives at `stages->'NN'->'spans'[*]->>'output'` as a JSON STRING** --
cast with `(s->>'output')::jsonb` to reach `refs` / `carried` / `ask`.

---

## THE FACTORY'S GATES, MEASURED ON NINE LANDINGS

**[S140] A GitHub spending-limit stop looks like a RED that never ran:** every run four seconds, zero steps,
annotation "The job was not started because recent account payments have failed or your spending limit
needs to be increased", on pull_request AND scheduled runs alike. The runs endpoint shows them as
`completed` / `failure`. Rerunning after the limit is raised is the FIRST execution, not S55-1's chase.

**[S140] The adversary gate `relay_adversary_gate()` refuses an UNSEALED card to AG-4/AG-5 with AG002**,
and accepts the same bytes with the `evidence:adversary` seal on line 2 -- measured on every S140 card. The
seal SQL that held 5/5: split the first line, splice `ADVERSARY: GREEN` + `verdict: <row>` fence, EXISTS on
the verdict row whose `reply_to` is the ORDER-REVIEW row and whose first line names card + sha256.

**[S140] The scout's verdict rows DO carry `reply_to`; AG lanes' slips do NOT** (relay_post_from_lane has no
channel for it). Two write paths; the asymmetry is unmeasured. The scout cannot run cardPreflight in its
sandbox ("PREFLIGHT-UNMEASURED (tsx IPC EPERM)") and says so on every verdict.

**[S140] `consumed_at` on an AG lane's card is written at COMPLETION** (575: merge 20:20:34Z, slip 20:30:58Z,
consumed 20:31:11Z). The Vercel production deployment (created within 5 s of the merge push) and the shared
clone's lane-fetched `origin/master` are the earlier lenses, in that order.

**[S140] Time from a sealed landing card to master when the branch forks from CURRENT master and CI is
already green: 2 minutes** (575: sealed 20:18:23Z, merged 20:20:34Z; 574 and 573 similar). The 37-minute
§12.8 clock on 575 was spent BEFORE the card: author slip 20:04Z -> Architect card 20:10Z -> scout review
20:17Z. The landing card's trigger is the slip today; the CI-green read is available ~20 minutes earlier.

**[S140] `cardPreflight` CP-3 rejects a PREMISE line beginning `READ:`** -- the accepted forms are
`MEASURED:` / `UNMEASURED` / `SELF-INVALIDATION` / `ON-DISAGREEMENT` / `DECAYS`. A bus row read is written
`MEASURED: relay_inbox (execute_sql, <time>) -- ...`. CP-8 treats an eleven-digit run id as a short sha; name
the run, not its id.

**[S140] Two branches that both reseal `public/architecture/manifest.json` make the second one DIRTY on the
forge, and no pull_request run fires on a DIRTY pull request** (571 vs 572). A reseal over the merged tree
in the same commit clears it. 573/574/575 avoided it by forking from current master and landing alone.

---

## THE ARCHITECT'S LENSES, MEASURED

**[S140] The built-in browser can run a production witness end to end:** navigate to the app (a fresh
conversation each load), `find "How can I help"` -> textbox ref, `form_input`, click send at (722,648) on
the first turn and (756,813) on a continued one, wait ~40-50 s, read `document.body.innerText`. The
`turn_trace_digest` row for the turn is readable within seconds of the render.

**[S140] The right-hand task panel is the owner's audit surface** (his words: "sag panel sus degil"). A
panel that is a day stale reads to him as a stalled Architect regardless of what landed. The NOW line
(#34) is updated on every tick before the report is sent.

---

## WHAT S140 CONFIRMS ABOUT EARLIER EDGES

**[S139]**'s "time from sealed card to master: 3-30 min" holds; the fork-from-current-master form sits at
the 2-3 minute floor. **[S139]**'s Vercel-list lens was the first reader of 575's merge.

**[S134]**'s caller-absent class: one more instance (the episodes carrier), cured by a wiring card after
§12.6 was applied at card-cut time -- the first time the rule fired BEFORE a wrong card was cut.

**[S138]**/**[S139]**'s "liveness from output only" held for the fourth session: AG-5's slip arrived ten
minutes after its merge; the merge was read from Vercel and the clone first.

**[S134]**'s "the owner's memory is an instrument" held in the negative direction too: the owner's morning
"firin" scorecard was the acceptance test for P1-4, and it was the witness that exposed the two residual
findings.

END · CWF-SESSION-GRAPH-KB-v140
