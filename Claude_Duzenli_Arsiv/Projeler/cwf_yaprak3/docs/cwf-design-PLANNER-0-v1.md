# CWF — Design Note · PLANNER-0 (2F.4) · v1

<!-- cwf-design-PLANNER-0-v1 · 2026-08-09 · S89 · Architect: Claude (Opus 5).
     RECON GROUND (D-1, all read THIS session): fresh clone @ origin/master
     19e84206eb84a8fc3e4b25a2e0a5afb6d8179cff · live Supabase reads (routing_hint
     row v4 verbatim; af5dbe5f telemetry chain) · rollout v2_4 §2F.4 mandatory
     inputs (a)–(d) · advisor note CS329A v2 (K-ratified) · architecture research
     S82 v1 §4. Nothing here is asserted from memory; every code claim carries a
     file:line from the clone above. -->

## §0 · WHAT PLANNER-0 IS — one sentence

**A deterministic decision layer that binds the already-extracted frame to a
per-turn PLAN the model must answer against, with a re-plan gate that fires when
the executed trajectory abandons the frame** — plan-first + re-plan, never a
rigid upfront plan (S82 research §4), consuming the memory tiers (routine →
plan seed) rather than planning from a blank page.

It is the ZEROTH iteration on purpose: **no new LLM call, no second planner**.
The plan's STRUCTURE is deterministic code over the armored frame; the plan's
TEXT is governed rows over a tenant-zero code floor (DB-first/code-floor); the
model keeps ReAct freedom INSIDE steps. A23's ⑤/⑥ will later EXTEND this organ
— one planner law, recorded in §7.

## §1 · THE HEAD WITNESS, NOW AT BYTE LEVEL (F-S88-4 · trace `af5dbe5f`)

Read live from `telemetry_events` this session (2026-08-09 02:16–02:17Z,
conversation `74643a1b`):

- `ir_frame` row: `{action:QUERY_METRIC, object:FACTORY, metrics:[oee],
  entity_ref:["Granit fabrikası"], time:{surface:"son 8 günün"},
  confidence:HIGH}` — drops 0/0/0. **The frame was PERFECT.**
- 12 `tool_call ok` rows on `supersetArmes`, then
  `burst_guard_turn_tokens {limit:300000, totalTokens:316552}` —
  the brake's first natural production stop held (fence witnessed ✓).
- `turn_done`: `toolCalls:12 · efficiency:{distinctTools:2, repeatedCalls:10,
  resultChars:17315, storedResults:0} · historyWindowN:6(db) ·
  maxToolRounds:16(db)`. `llm_call`: `cachedInputTokens:217232`.
- `funnel:{frame:present, discovery:hit, tools:ok, grounding:ok, render:n/a}` —
  **all green while the answer chased the PREVIOUS turn's doğalgaz subject.**

Three diagnoses fall out, each one a design pin:

1. **Nothing compares the trajectory to the frame.** The funnel measures each
   stage's own health; subject displacement is invisible to it. → the re-plan
   gate (§4).
2. **The token weight was HISTORY, not results.** 17,315 result chars vs
   316,552 total tokens, 217,232 cached: the prior turn's rendered content
   (charts + an 865-row table live in assistant `content`,
   `stagesModel.ts:228-243` maps history verbatim) is the gravity well the
   model fell into. → history hygiene (§5).
3. **The model had zero forward guidance.** `procedureRulesRetrieved:0`, no
   routine matched, no plan existed; ReAct at N≫3 produced 10 repeated calls —
   textbook (S82 research §4). → the plan block (§3).

## §2 · WHAT ALREADY EXISTS (recon; the planner builds ON these, duplicating none)

| Seam | Location (clone) | Fact |
|---|---|---|
| Frame extraction | `routing/irFrame.ts` · set in `stageTools.ts:550` | Armored `IrFrame` available PRE-stream; steers only routine+dossier match today (`frameRouting` dark, code floor 0) |
| Routine offer | `memoryRetrieve.ts:293` `selectRoutine` | Exact `(action, object)` key; ONE routine; v≥3 floor; success-only by two gates |
| Per-turn blocks | `memoryRetrieve.ts:553-557` → `stagesModel.ts:226-243` | episodic → routine → dossier blocks ride the USER message (cache-prefix law); empty ⇒ zero bytes |
| Tool loop | `llm/gateway.ts:255-300` | ONE `streamText`; `stopWhen:[stepCountIs, tokenCeiling]`; **no `prepareStep` today** — ai `^6.0.184` (package.json:45) |
| Gateway repair | `gatewayProtocol.ts` `recover-from-validation-error` (P6.7-A) + P6.8 | QUERY-CANDIDATE-1 CLOSED-BY-RECON stands; planner does NOT touch it |
| Search-behavior hint | live row `superset.routing_hint/energy-synonym-search` v4 | Verbatim payload read this session: single-core-token search, TR→EN fan (doğalgaz→gas→energy), entity filtering client-side, ARMES fallback probes |
| domainYield | `landingSignals.ts:220` | Walks `persistRaw`; gateway-inner counts only `reach='data'` (declared tags, `gatewayPolicy.ts:210-225`) — W-028's two branches (§8) |

## §3 · THE PLAN BLOCK — deterministic structure, governed text

**Derivation (code, `turn/planner.ts` NEW):** `derivePlan(frame, routine)`:
- `frame == null` ⇒ `null` ⇒ **zero bytes, byte-identical turn** (the
  memory-block precedent).
- `routine != null` ⇒ the routine IS the plan seed: steps come from the proven
  chain, the template contributes only the framing + re-plan law lines.
  (Memory tiers consumed, not bypassed — rollout v2_0 2F.4 condition.)
- else ⇒ select the governed **plan template** by `frame.action` (exact, the
  `selectRoutine` key discipline), instantiate slots from the frame:
  `{entity_ref}`, `{metrics}`, `{time.surface}`.

**Templates (data over floor):** new SOFT kind `system.plan_template`
(`kinds.ts` registry addition; `domain_rules` generic — ZERO migration), keyed
by IR action (`QUERY_METRIC`, `QUERY_STATUS`, `QUERY_EVENTS`, `QUERY_MASTER`,
`COMPARE`; `COMMAND` deliberately floor-less: ADR-011 posture). Code floor =
one template per action, **tenant-zero clean** (structure only — no Kale/KB7,
no domain nouns): e.g. QUERY_METRIC floor steps: (1) resolve time; (2) locate
the metric surface — search with ONE core token, fan across languages/synonyms
of the METRIC word only, never append entity names to the search string, filter
entities client-side over the result list; (3) fetch for the frame's entities;
(4) if the BI surface is empty, probe the flat backend's parameter tools;
(5) answer THIS frame's subject — the plan names it. DB rows may override per
key (ABSENCE-ONLY self-seed, the `routingHints.ts` precedent) and MAY carry
domain vocabulary (data, not code — the machine-v5 boundary).

**Composition:** `composePlanBlock` renders `[PLAN — başlangıç]…[PLAN — son]`
with the frame echo line first (`Konu: <action/object> · <entities> · <metrics>
· <time>`), then steps, then the re-plan law line ("bir adım beklenmedik
dönerse plana dön ve kalan adımları gözden geçir"). It joins the SAME
`ctx.memorySliceBlock` field as a FOURTH self-delimited block, AFTER dossier
(fixed order; each block self-framed; all-empty ⇒ '' — byte-identical). It
therefore rides the user message and never touches the cached system prefix
(`stagesModel.ts:217-226` law).

**The synonym fan generalizes here.** The hint row's content splits on the
determinism line: its STRUCTURE (single-core-token, cross-language fan of the
metric word, client-side entity filtering, flat-backend fallback) becomes the
QUERY_METRIC floor template — covering every metric class, not energy;
domain synonym SETS stay data (governed rows, the machine-v5 lineage). That is
structural retirement, not relocation: the energy-specific row DIES (§6-A1).

## §4 · THE RE-PLAN GATE — deterministic, advisory, once

Mechanics: **additive `prepareStep` on the ONE gateway call site** — absent
param ⇒ byte-identical for every other caller (the BurstGuard `stopWhen`
precedent, same shaft discipline: this is loop-shaft business).
STEP 0 of the phase verifies `prepareStep` in the INSTALLED ai@6 types (the
S82 `experimental_repairToolCall` verification pattern); if absent, the gate
degrades to observe-only via `onStepFinish` accounting (named fallback — the
nudge is then dark and the chip still reports drift).

Check (v0, honest and small): from step 2 onward, if the turn has a frame and
**zero tool calls so far carry any frame token** (entity_ref/metrics,
normalized substring over stringified args — the same normalization
`selectRoutine`'s key discipline uses for exactness), inject ONE deterministic
reminder message for the next step: the plan block's frame-echo line + "plana
dön". Governed `planner.replanNudgeMax` caps it (floor 1, clamp [0,2]).

Laws it obeys: it only ADDS text — never rewrites args, never blocks a call
(ADR-001: grounding stays deterministic code; the planner is the SOFT/advisory
layer and is labeled POLICY on its valve, ADR-012 R-1). Fail-open on any
doubt (no frame, empty args, parse anomaly ⇒ silent). Fires ⇒ visible
everywhere: `[Planner] plan=1 template=<key|routine> steps=N replan=1
reason=frame-drift` console line (ONE line, the `[Memory]` convention),
additive `planner:{plan,template,replans}` object in `turn_done` (the
STEP-EFFICIENCY additive-payload precedent), span attrs on the gateway span
(full-trace mandate).

Replay arithmetic: in `af5dbe5f`, no call's args contain `oee` or a Granit
token — the gate fires at step 2 with the frame echo naming OEE. The nudge
does not guarantee the model turns; it guarantees the drift is NAMED to the
model mid-turn and to us in the ledger — which today happens nowhere.

## §5 · HISTORY HYGIENE — the small deterministic half (in-phase)

Rollout v2_4 mandates the compression question be ADDRESSED in this design.
Ruling: the full fix (client-side history assembly persisting prose + handles
instead of rendered payloads) is a client/persistence program — **named
`HISTORY-DIET-1`, entering the queue by name (S82-6), NOT built here.** What
IS built here is the honest deterministic floor: a governed
`turn.historyCharBudgetPerMessage` (floor 24000, clamp [4000,120000]) applied
ONLY to the history slice map (`stagesModel.ts:234`), middle-truncating any
single history message over budget with an explicit marker
`[... geçmiş mesaj kırpıldı: N karakter — tam içerik ekranda ...]` — the
truncation is a disclosed context economy, never a data claim (empty≠zero
untouched: markers say "omitted", never "empty"). Current message, memory
blocks, and the system prompt are NEVER touched. `turn_done.efficiency` gains
additive `historyTrimmedChars`. In `af5dbe5f`'s shape this alone removes the
bulk of the 217k cached gravity.

## §6 · ACCEPTANCE — named, measured, owner-visible

- **A1 · HINT RETIREMENT (the S87 promise, rollout v2_4 (d)):** after merge +
  deploy, the owner archives `superset.routing_hint/energy-synonym-search` from
  the admin UI (the S87 publish flow she already used, in reverse), and the
  SAME query class ("Granit doğalgaz", fresh conversation) succeeds hint-less.
  Proof read (S63-1, Architect-run): telemetry shows `plan=1
  template=QUERY_METRIC`, funnel green, landing macro present, NO routing_hint
  in the composed knowledge (knowledgeHash changes).
- **A2 · DISPLACEMENT REPLAY:** heavy-history conversation, prior turn on a
  different subject, new on-frame question ⇒ `[Planner] replan=1
  reason=frame-drift` fires at most once and the final answer's subject is the
  frame's (dossier/routine may assist; the deterministic PASS is the chip +
  an on-frame landing signal).
- **A3 · BYTE-IDENTITY:** frameless turns compose byte-identical messages
  (test-pinned); non-turn gateway callers unchanged (absent `prepareStep`).
- **A4 · plan visibility:** Langfuse span carries the plan block I/O
  (FULL-TRACE), `turn_done.planner` present, one `[Planner]` line per turn.

## §7 · BOUNDARIES (what this phase must NOT do)

ONE planner: A23 ⑤/⑥ extends this organ later; no second decision center.
No gateway-protocol edits (P6.7/P6.8 stand). No `frameRouting` flip (stays
dark; the planner READS the frame, category routing untouched). No eval-gate
contact. No `messages` writes (C1). `COMMAND` frames get no floor template
(ADR-011 posture). W-018's gateway-side suffix retry stays a separate remedy —
the planner changes what the MODEL sends, not what the catalog matcher does.

## §8 · W-028 SHARPENED (hands to AG as its own small verification, after this phase)

`hasDomainYield` (`landingSignals.ts:220`) counts a gateway-inner call ONLY if
its declared reach class is `data` (`gatewayPolicy.ts:210-225`, tags from the
tool's own schema). Two branches, now named: **(a) policy-correct** —
`execute_sql`'s declared tags do not class it `data`, so 1 landed row honestly
yields 0 (then W-028 closes as CORRECT with the tag read as evidence); **(b)
snapshot race** — the interrupted final call's result never entered
`persistRaw` before distill read it (then the fix is ordering, not the
predicate). The verification reads the mirror row's tags first; only branch
(b) opens code.

<!-- END · cwf-design-PLANNER-0-v1 -->
