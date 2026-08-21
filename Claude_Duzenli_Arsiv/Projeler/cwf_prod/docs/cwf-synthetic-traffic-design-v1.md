# CWF — Synthetic Traffic subsystem · design note v1
**cwf-synthetic-traffic-design-v1 · rev 1 · 2026-07-21 · Architect: Claude**
Purpose: generate the IR-1 shadow-frame data K1 needs, since organic chat traffic
is too thin (18h window = 9 real `/api/cwf/chat` turns — the window is running
empty). Owner-requested; my committed mechanism below.

> PLATINUM statement: one governed subsystem — question sets are DATA (admin-UI
> editable), the injector self-runs at a governed rate from a single click, no
> manual per-utterance work. Rate + mode are the only human levers (spend/consent).

## §1 · WHY (the real gate is DATA, not the date)
K1's §8 checklist (utterance-fit · per-field enum-drop rate · derivation
fall-through) needs a statistically meaningful sample of IR-1 shadow frames. The
~Aug 2 date was an Architect estimate; the true gate is data sufficiency, and
organic traffic isn't filling it (9 turns/18h). So we GENERATE the data —
labeled, honest, controlled.

## §2 · THE MECHANISM (my recommendation — effective, not over-sophisticated)
**A rate-limited canary injector, NOT a load-tester.** k6/Locust/Artillery
optimize THROUGHPUT — the wrong axis. Our goal is SEMANTIC COVERAGE: diverse
utterances that exercise the frame vocabulary (action × object × scope × time).
So the design optimizes for INTENT DIVERSITY at a controlled trickle, not volume.
Concretely: curated question sets → a governed rate (q/min) → the injector POSTs
each utterance to the REAL chat/router path as a LABELED synthetic turn → IR-1
frame extraction runs naturally (unchanged) → frames recorded, attributed
synthetic. Simple, reuses existing patterns (the golden-batch cron +
CRON_SECRET; L1 governed params; the real router path).

## §3 · THE CLEVER PART — two modes (cost)
§8 needs only the FRAME, and the frame is extracted in the ROUTER call
(`gemini-2.5-flash-lite`, tiny) — the main chat LLM and MCP tool execution do NOT
affect the frame. So:
- **frame-only mode (DEFAULT for K1):** run only the router/frame-extraction pass
  per utterance. ~1/100th the cost, zero MCP load, GOLDEN-FREEZE-irrelevant.
  Feeds §8 cheaply and immediately. **This is how we ratify K1 without waiting.**
- **full-turn mode (optional):** the full chat path — router → tool-selection →
  MCP execution → grounding → viz. Exercises the WHOLE pipeline and generates
  rich traces (BOARD-WALK / debug value) and "triggers the tools" as you asked —
  but costs real tokens + MCP calls. Use deliberately, at a low rate.

Rate (q/min) + mode = the spend levers. Recommendation: run **frame-only** to get
K1 data now; switch to **full-turn** when you want pipeline exercise / rich traces.

## §4 · ARCHITECTURE (determinism split respected)
- **Question sets = DATA** (governed, admin-UI editable, owner-addable — matches
  the admin-panel-UI rule for data ops). Shape: `synthetic_question_sets`
  (id · name · lang · utterances[] · intended_tool_categories[] · created_by).
  Seeded reference set + DB-extensible. NEVER a golden-gate contact.
- **Rate/mode = governed L1-style params:** `synthetic.enabled` ·
  `synthetic.ratePerMinute` · `synthetic.mode` (frame-only | full-turn) ·
  `synthetic.activeSetId`. Edited in the admin UI, stamped on each run.
- **Injector = code** (structure). Cron-driven (CRON_SECRET-gated, golden-batch
  pattern) OR a bounded start/stop server loop — cron is more robust (runs
  unattended; survives closing the tab). When enabled, it pops the next utterance
  from the active set and drives the router-frame (or full-turn) path at the
  governed rate.
- **IR-1 frame extraction = UNCHANGED** (the whole point — we feed the existing
  observe-only extractor, we don't fork it).
- **Admin UI:** a new bottom-left "Sentetik Trafik / Synthetic Traffic" nav item
  (super_admin-gated). Controls: rate (q/min) · mode toggle · question-set list
  (view/add/edit — owner curates) · start/stop · a LIVE counter (injected · frames
  extracted · enum-drop rate so far). The counter makes §8 progress visible in
  real time.

## §5 · THE QUESTION SETS — Pareto strategy (grounded in real data)
Tree-read of the real intent space (telemetry + tool catalog): the vital-few
intents are **OEE · fire/ıskarta (scrap) · üretim sayacı (counter/production) ·
line-stops · vardiya (shift) · kiln/press by hat/zone**. Real question shapes
already in prod: "hat 3 OEE dünkü vardiya ortalaması nedir" · "hat 3 dünkü fire
oranı neydi" · "K4 sayacı 24 saatte kaç adet". Every one is
`action × object × scope(hat/zone) × time` — exactly the frame IR-1 extracts.

**Pareto move:** ~30-50 curated utterances covering these high-frequency intents
(NOT one-per-141-tools), varied along the frame axes to stress the enum
vocabulary and the derivation fall-through:
- vary **scope:** hat 1..N · zone · equipment id (K4) · "tüm hatlar"
- vary **time:** dün · bu hafta · son 24 saat · vardiya · "şu an"
- vary **action:** sorgu/raporla/karşılaştır/listele
- vary **phrasing:** agglutinative suffixes ('hattının', 'haftalık', 'deki') —
  the known IR evidence class, to measure enum-drop honestly
- include **out-of-vocab probes** (intents with weak catalog coverage) to
  exercise derivation fall-through / ALT-C honesty.
I author set v1 (companion artifact, versioned); you add/edit freely in the UI.

## §6 · TRAPS (named before build)
1. **Labeling (data honesty, empty≠zero spirit):** synthetic turns carry
   `synthetic: true` + a dedicated synthetic user id. §8 metrics computed on
   `synthetic:true` frames, attributed as synthetic. Synthetic data NEVER
   masquerades as organic — no polluting real user metrics, no fabricated
   "organic" volume.
2. **Spend/consent:** every injected turn costs tokens (frame-only: tiny;
   full-turn: real). Rate + mode are consent levers; a governed
   `synthetic.dailyTokenCeiling` clamp (like the golden ceiling) hard-caps runaway
   cost. Start/stop is one click.
3. **Freeze-independence:** synthetic chat/router traffic is NOT a golden run
   (golden fires only for prompt.segment publishes). frame-only mode is entirely
   freeze-irrelevant. Full-turn touches no prompt.segment surface either. So this
   subsystem is **GOLDEN-FREEZE-independent** — buildable and runnable now.
4. **Reentry-no-loop:** the injector calls the chat/router path server-side with a
   synthetic flag; that flag must SHORT-CIRCUIT any path that could re-inject
   (no synthetic turn ever spawns another). Deterministic guard.
5. **Determinism split:** sets = data (governed/editable), injector = code,
   frame extractor = unchanged. Learning improves nothing here — this is a
   generator, not a judge.

## §7 · THE §8 / K1 PAYOFF
With frame-only mode at a modest rate, we accumulate hundreds of labeled IR-1
frames in hours (vs 9 organic turns in 18h). Then §8 is answerable WITH POWER:
per-field enum-drop rate, utterance-fit, derivation fall-through — measured on
synthetic frames, honestly labeled. **K1 ratifies on generated data → IR-3 flip
unblocks weeks early.** This is the fast path you pushed for.

## §8 · WHAT I DO NEXT (on your approval)
1. Author **synthetic question-set v1** (the ~30-50 curated utterances, versioned)
   from the real tool vocab + question patterns above.
2. Write the gated PHASE prompt (SYNTH-TRAFFIC-1): tables + params + cron injector
   + labeled turns + admin UI + a Red→Green test that a synthetic turn produces a
   labeled IR-1 frame and never loops. FULL profile (new tables/params/endpoint).
3. Operator applies the migration; then you flip `synthetic.enabled` at a chosen
   rate; I read the accumulating §8 signal via telemetry and report when K1 is
   ratifiable.

## §9 · OWNER DECISIONS
- **Mode default:** frame-only for K1 (my recommendation — cheap, immediate), with
  full-turn available as a knob? Or do you want full-turn (tool-triggering) from
  the start despite the cost?
- **Injector engine:** cron-driven (robust, unattended — my recommendation) vs
  start/stop-while-panel-open (simpler, fragile)?
- **Go:** approve this design → I author question-set v1 + the SYNTH-TRAFFIC-1
  phase in one shot.

<!-- END · cwf-synthetic-traffic-design-v1 · rev 1 · 2026-07-21 -->
