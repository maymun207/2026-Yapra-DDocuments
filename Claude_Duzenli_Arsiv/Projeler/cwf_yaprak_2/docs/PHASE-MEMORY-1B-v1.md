# PHASE MEMORY-1B · v1 — the reader: retrieval, the slice, the chip, the lens
<!-- PHASE-MEMORY-1B-v1 · 2026-07-30 · S71 · v1-path A4, phase 2 of 3 (R8).
     Binding design: cwf-memory-1-design-v1_1 §3 C2 (retrieval) · §4 (A23
     carrier contract) · U-1 (chat memory chip) · U-3 (governed params
     surface) · MEMORY-LENS pre-registration. Scope: READ side only —
     promotion + the admin Memory tab (U-2) = 1C. Author: AG. Branch:
     phase/memory-1b off master @ the anchor below. ZERO migrations. ZERO
     gated publishes by this branch (the one new agent.param self-seeds via
     the S46 reconciler — the 1A ttlDays precedent, observed live publishing
     through the gate on turn c611dc4e). DOC-FLIP RIDER: the 1A migration's
     status comments flip in this branch (§3 G6). -->

## §0 · HARD PRE-FLIGHT GATE + LIVE GROUND (S65-1)

**GATE (blocking, before ANY work):** the 1A forget tick must have run live.
Required evidence IN your pre-flight report: the first
`[MemoryForget] deleted=N scanned=M` production log line (expected around
03:40Z, expected honest values `deleted=0 scanned=≥1`), relayed by the
owner/Architect or read from Vercel if your lane can. NO tick evidence → STOP
and hand back. (1A's closure rule: retrieval does not open before both live
reads land; the [MemoryWrite] half landed on turn `c611dc4e` — first row,
`user=f4805bd1… tools=3 entities=0 importance=2`.)

- Anchor: `origin/master` = `a51d70ec9496bace8d319939d055f3ca98a75556` ·
  391 test files / 4353 tests · 61 migrations · docVersion rev 164 ·
  production `dpl_F4AwANCkfgULaNCnhVf9FTXzU8zx` READY. Episodes table LIVE
  (Operator 58/58; ≥1 real row exists).
- Seams (S30-3, verify each):
  - History compose: `turn/stagesModel.ts:205` `.slice(-ctx.params.historyWindowN)`
    — the memory slice joins THIS surface (stage-'05' family), rendered as its
    own delimited block beside the history window.
  - Done-SSE additive echo: `turn/stageStream.ts:441/:464`
    (`procedureRulesRetrieved` — the SCOPE-HONEST-1 pattern the chip reuses).
  - Replay mode seam: `api/admin/replay.ts` POST `mode` (the SR1-W3a
    precedent — a new mode value, never a new endpoint).
  - THE Turkish fold: `routing/resolveEntityRef.ts:106` `turkishFold` — the
    single source; the scorer imports it, NEVER a second fold.
  - Policy resolver: `knowledge/resolveMemoryPolicy.ts` (1A) — extend, don't
    duplicate.
  - Repository: `EpisodesRepository` (1A) — reads/updates land here only.

## §1 · PREMISE BLOCK (STOP on any red)

**P-A · REACHABILITY.** Verify: (1) the compose site above receives ctx with
resolved params BEFORE prompt build; (2) the done-SSE echo seam carries
additive fields end-to-end to the client (SCOPE-HONEST precedent); (3) the
params admin surface is DATA-DERIVED (WAVE2-IA-2 `surface` column) so the two
`agent.memory.*` decls appear without bespoke UI — verify by rendering, not
assumption; (4) replay's stage-'05' rebuild path (`stageContextSlice`) —
name where the memory slice would surface there and add the honest
live-state disclosure (a rebuilt '05' card cannot be as-of for memory; say
so on the card, never fabricate).

**P-B · PROVENANCE.** Design note v1_1 is binding. Retrieval is
MULTI-SIGNAL DETERMINISTIC, NO VECTORS in v1: keyword overlap
(turkishFold-normalized token intersection between the current message and
`asked`) + canonical-entity overlap (`entities.canonical` ∩ the turn's
resolved entities — resolver dark today, so this signal contributes 0
honestly) + recency decay + importance. Scoring WEIGHTS and the candidate
WINDOW are code-floor constants (the DL≤2 precedent: not tunables until
there is a reason); only topK is governed.

**P-C · SATISFIABILITY.** (1) Bounded reads ONLY (the F198 law): carrier
read `(conversation_id, created_at DESC) LIMIT k1`; user-scoped candidate
read `(user_id, created_at DESC) LIMIT window` — both explicit, both under
the PostgREST 1000 cap by construction. (2) M-MEM2 = 0 is satisfiable BY
CONSTRUCTION: the memory slice must be structurally unable to touch the
grounding vocabulary — no memory module import may reach
`grounding/` or the knowledge warm ('06'); grep-pinned + test-pinned. If you
find yourself needing such an import, STOP: the design is being violated.

## §2 · BINDING CONSTRAINTS

1. **Identity scope:** retrieval runs ONLY for a Bearer-verified real user
   (the 1A write door's mirror). Guest/synthetic/replay identity → empty
   slice, chip state `unavailable-no-identity`? NO — design U-1 has three
   states; fold identityless into `memory-unavailable` with the reason in
   the SSE payload. Never an error.
2. **Memory-down ≠ chat-down:** ANY retrieval failure (42P01 included) →
   empty slice + degraded marker on ctx (the promptDegraded posture), turn
   unaffected, one `[Memory] failed …` line. Test: throwing repository
   leaves the turn green.
3. **The slice:** its own delimited block adjacent to the history window at
   the §0 seam; contains ONLY distilled fields (asked head · entity ids ·
   tool names · created_at) — NEVER raw payloads (none exist in the store by
   1A law). Slice is observers-visible: `[Memory] offered=N conv=K user=M
   topK=T ms=…` born-loud line + additive span attrs.
4. **Reinforcement (C3):** every episode actually offered gets
   `last_retrieved_at=now, retrieval_count+=1` via ONE fire-and-forget
   repository update joining the flush allSettled — never the request's
   critical path, never blocking.
5. **Governed param:** `agent.memory.retrievalTopK` — floor 3, clamp
   **[0, 8]**, `0` = retrieval OFF (the kill-switch, the learnEnabled brake
   precedent), sessionTweakable:false, stage '05'. Resolved via the EXTENDED
   `resolveMemoryPolicy` (ONE fetch serves ttlDays + topK). RULE-1
   throughout.
6. **U-1 chip (rendered evidence required):** the done SSE frame gains
   additive `memoryOffered: { count, conversationCount, userCount } | null`
   (null = memory unavailable — empty≠zero). Chip renders three states:
   offered-N ("N geçmiş etkileşim hatırlandı") · offered-0 (real zero —
   subtle/absent per design) · unavailable (grey, honest). LIVE-TURN ONLY
   (no messages column; reloaded history carries no chip — the
   SCOPE-HONEST-1 disclosure, restated in code comment). RULE-26: all three
   states rendered @1280/@1024, zero clip, screenshots in evidence.
7. **U-3 (rendered evidence required):** both `agent.memory.*` decls visible
   on the existing data-derived params surface; screenshot. Zero bespoke UI
   expected — if bespoke work IS needed, report why before building it.
8. **MEMORY-LENS (G5):** replay `mode:'memory-ab'` — paired rebuild of
   recorded turns, arm A slice-off / arm B slice-on (live episodes,
   disclosed as live-state). Reports: M-MEM2 grounding-verdict drift
   (**pre-registered expectation: 0** on the pinned corpus — a nonzero is a
   STOP-and-report finding, not a tuning knob) · prompt-delta stats (slice
   size, token delta) · offered-rate. The lens REFUSES to compute an
   answer-quality gain (the ROUTE-SHADOW-1 refusal, same reason: the record
   cannot witness counterfactual quality). WRITE-NOTHING (routerAbLens
   posture).
9. **No grounding contact (the M-MEM2 mechanism):** grep-pinned zero imports
   from `memoryDistill`/`EpisodesRepository`/the new retrieval module inside
   `grounding/**` and the knowledge-warm path; plus a behavioral test:
   identical grounding verdict with slice on vs off on a fixture turn.
10. **Secrets:** env names only (ADR-007). **Freeze:** untouched — zero
    golden/prompt-segment surfaces. The prompt-text change (the new slice
    block) is HISTORY-side compose, not a prompt.segment — verify the
    promptRev/segment capture is unaffected (test: segment hash unchanged
    slice-on vs slice-off).
11. **Reseal budgeted** (S70 lesson): run `check:doc-drift`, reseal every
    flagged tab.

## §3 · GATES

**G1 · RETRIEVAL CORE.** `turn/memoryRetrieve.ts` (pure scorer + bounded
reads via EpisodesRepository): carrier read (k1 code-floor, same-conversation
recency — the §4 contract's read) + user-scoped scored read (window
code-floor; score = keyword∩ via turkishFold + entity∩ + recency decay +
importance; deterministic tie-break). Unit tests incl. TR-fold cases
(`dün/dun`, `KB7/kb7`) and the topK=0 kill-switch (zero reads issued —
test-pinned, not just zero results).

**G2 · SLICE + WIRING.** Compose at the §0 seam; degraded path (constraint
2); reinforcement update (constraint 4); `[Memory]` log; span attrs;
stage-context '05' disclosure line (P-A.4).

**G3 · PARAM + U-3.** Decl + resolver extension + tests (floor/publish/
clamp/kill-switch); params-surface rendered evidence.

**G4 · U-1 CHIP.** SSE additive fields + client chip, three states, RULE-26
evidence, live-turn-only disclosure.

**G5 · MEMORY-LENS.** Mode + report shape + the M-MEM2 run on the PINNED
corpus executed in-branch with the number in the self-verify (expected 0
drift over N; report N). Positive control (S66-1): a fixture where a
deliberately-poisoned slice WOULD flip a grounding verdict must be caught by
the lens's drift detector in a test — prove the zero can fail.

**G6 · DOC-FLIP RIDER + SEAL.** Flip `20260730150000_episodes.sql` header +
`grantPolicy.ts`/`dbConstants.ts` provenance comments to "applied &
live-verified 2026-07-30 (Operator G0–G5 PASS, verifyGrants 58/58)" —
comment-only, PROVEN by the standing comments-stripped byte-compare (S35-1;
SQL grep-stripped, TS AST printer). Then: suite + typecheck + doc-drift +
build green; push. NO merge — GO after the Architect's RULE-25 review.

## §4 · SELF-VERIFY (literal evidence, in order)

1. The §0 GATE evidence: the [MemoryForget] tick line VERBATIM + source.
2. HEAD + branch + merge-base.
3. P-A findings (four numbered checks, each with its grep/render evidence).
4. G1 test tail incl. kill-switch zero-reads proof.
5. G2: one composed slice block (fixture) + the degraded-path test RED-capable
   run + a real `[Memory]` line shape.
6. G3/G4 rendered evidence: params surface + all three chip states
   @1280/@1024.
7. G5: the lens report on the pinned corpus (M-MEM2 drift count + N) + the
   poisoned-fixture positive control RED then GREEN.
8. G6: comments-stripped byte-compare outputs (empty diffs) + suite totals
   vs anchor (391/4353) + doc-drift + resealed tabs.
9. Explicit: "ZERO migrations · ZERO publishes by this branch · freeze
   untouched · zero new LLM calls · grounding path untouched (grep+test)."

## §5 · STOP CONDITIONS

Missing forget-tick evidence (§0 GATE) · any need for a memory import inside
grounding/knowledge-warm (P-C.2) · M-MEM2 ≠ 0 on the pinned corpus (report,
do not tune) · unbounded read of any shape (F198) · bespoke params UI
without prior report (constraint 7) · any prompt.segment/golden surface
contact.

**Post-merge (Architect-owned):** RULE-25 → GO + merge message → live reads:
`[Memory] offered=…` on real turns · chip rendered in production · the next
day's forget tick now scanning >1 rows. 1C (promotion + U-2 admin tab + F48
closure) opens on those reads.

<!-- END · PHASE-MEMORY-1B-v1 · 2026-07-30 -->
