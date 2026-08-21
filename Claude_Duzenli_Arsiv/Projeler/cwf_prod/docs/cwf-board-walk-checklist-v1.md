# CWF — BOARD-WALK checklist · v1 (GATE-0 re-walk)
**cwf-board-walk-checklist-v1 · rev 1 · 2026-07-21 · Architect: Claude**
GATE-0 (v5_2) item (b): the owner re-walks the 10 Stages/BELGELER board cards not
covered in the first walk (01·02·04·05·06·08·09·10·13·14). This is a
CONTENT/LEGIBILITY pass — OBS-TRACE now renders live per-card "last turn" data, so
each card should read cleanly AND show real data where wired. Owner walks; I log
findings into a versioned list; end state = "UI clean" or a single fix phase.

## HOW TO WALK
Open admin → BELGELER/Stages tab → click each card below in order. For each, check
the 3 points. Tell me anything that reads wrong / confusing / mis-rendered; I
record it. Cards already walked (00·03·07·11·12) are skipped unless you want them.

## THE 10 CARDS (re-walk targets)

**01 · Kullanıcı Sorgusu** (`user-query`) — spans: telemetry-init, lab-overlay
- Shows: the turn opens; lab-mode session flags (Tweak overlay) enter here.
- Live: has 2 spans → per-card "last turn" I/O should render.
- Check: is the "lab flags only in your session" idea clear? Live span data legible?

**02 · Konuşma / Durum** (`conversation-state`) — span: persistence-init
- Shows: who you are, what you're authorized to see, which backends you reach;
  conversation history loads. `permissions.ts` = capability gates (code).
- Check: identity/authority/history triad clear? "yapı = kod" target read right?

**04 · Planlama / Ayrıştırma** (`planning`) — no spans
- Shows: there is NO separate planner — the model plans step-by-step inside the
  tool loop (11). A deliberately-empty stage.
- Check: does "no planner, it's in the loop" land, or does the empty card look
  broken/missing? (This is the classic "empty stage looks like a gap" risk.)

**05 · Bellek Getirme** (`memory-retrieval`) — no spans
- Shows: last few messages given to the model; NO long-term per-user memory.
  `agent.historyWindowN` (governed).
- Check: is "no long-term memory, system doesn't remember you across turns" honest
  + clear? (This is the MEMORY-1/F48 gap surfaced to the user — legibility matters.)

**06 · Bilgi / RAG** (`knowledge`) — span: cwf.warm.knowledge
- Shows: what the agent KNOWS about the factory (lines, metric defs, blind spots,
  tool-use rules) — lives in governed rules, not code, editable without deploy.
- Live: warm.knowledge span → last-turn data.
- Check: "knowledge = governed, you can edit it, no deploy" clear? Span legible?

**08 · Sıkıştırma** (`compression`) — no spans
- Shows: a big tool result (all lines of 18 factories) is bound to a handle, not
  dumped into the model; NO summarization (deliberate). `resultStore`.
- Check: "no summarization, deterministic handle" clear? Empty-span card OK?

**09 · Prompt Birleştirme** (`prompt-assembly`) — HEART ♥ — spans: assemble-prompt,
warm.prompt
- Shows: identity/attention/voice/tool-use assembled into ONE text from 20 governed
  prompt.segments — editable without deploy. The trust-critical heart card.
- Live: 2 spans → last-turn prompt fingerprint (prompt_rev).
- Check: does the "20 segments → one personality, no deploy" story read with the
  weight of the heart card? Live prompt_rev legible?

**10 · LLM Çıkarımı** (`llm-inference`) — spans: resolve-provider, stream,
warm.provider, stream.attempt, warm.params
- Shows: the model is called — provider/model/temperature all from governed rows,
  one gate, no second call site. `agent.temperature` (governed).
- Live: 5 spans (richest card) → provider/model/tokens last-turn.
- Check: "one gate, governed provider/model/temp" clear? The 5-span live data
  legible + not overwhelming?

**13 · Biçim / Sunum** (`format-render`) — client-side, NO server span
- Shows: the four render states never mix (real-0=drawn · missing=blank · no
  result="veri yok" · non-numeric=not charted); an empty answer is never a blank
  screen. `outputFormat + empty-guard`.
- Check: is the "four states, empty≠blank" idea clear? Does the "no server span,
  can't be traced" tag read as intentional (not a gap)?

**14 · Bellek Güncelleme** (`memory-update`) — span: cwf.flush
- Shows: the turn persists (conversation, messages, raw tool results) — the next
  replay specimen is born here. The ONLY thing the system learns is word→tool
  mapping; it learns no knowledge.
- Live: cwf.flush span → last-turn write.
- Check: "persists + learns only routing, not knowledge" clear? flush span legible?

## WHAT I'M LISTENING FOR (findings I'll log)
- AI-voice / robotic copy that should read as human onboarding (the S37 systemic
  diagnosis).
- Empty-span cards (04·05·08·13) that look BROKEN rather than intentionally empty.
- Live OBS-TRACE data that's illegible, overwhelming, or mis-bound to the wrong card.
- Deep-link targets (🗄️/🧱 "Kodu gör", ?tab= chips) that land wrong.
- Anything the owner finds confusing about what the stage DOES.

## END STATE
Findings → `cwf-board-walk-findings-v1` (versioned). Either "UI clean" (GATE-0
closes, BLOCK 1 opens) or a single batched fix phase (one 3-lane handoff for all
findings, per the round-batching rule).

<!-- END · cwf-board-walk-checklist-v1 · rev 1 · 2026-07-21 -->
