# CWF — SR1-W3b Design Note: Context-Aware Routing + Sticky Floor + Evidence Legibility

<!-- cwf-sr1-w3b-context-route-design-v1 · rev 1 · 2026-07-17 · Architect lane -->
<!-- PLATINUM compliance: zero manual configuration. New param self-seeds via the
     F128 kind-aware reconciler; no migration, no Operator step, no golden run.
     One merge+deploy activates the whole fix. -->

## 0 · The two live failures (2026-07-17, production, deployment dpl_5Zsjuj…)

**F132 — context-blind follow-up routing → capability denial.**
Trace `e7d40549` 07:02:30Z: user follow-up "tum hatlari tek bir grafikde cizelim"
carries zero domain keywords. `routeSemantica` judged the bare utterance →
matched `[andon, production]`, `canonicalOEE=absent`, `getOeeValuesForZones`
NOT offered (32/145). The model honestly answered "mümkün değildir." The retry
succeeded only because the user had switched to the Anthropic provider, whose
cache mode is `path=all-fallback` (all 145 tools) — the router was bypassed,
not vindicated. Root cause: **the router input is the current utterance only;
`ctx.conversationHistory` exists on TurnContext but is never passed down.**

**F133 — recall miss + ungrounded negative assertion.**
Trace `731e4077` 07:15:30Z: "SIR tesisinde durum nedir" matched
`[factory, andon, production]` — NOT `[machine]`, where the alarm tools live
(verified: 06:55:40Z alarm turn matched `[machine]` alone and offered
`getFactoryAlarmStatus`). With alarm tools unreachable, gpt-4.1-mini called
`getFactoryList` + 2× Superset `search_tools("active alarms for SIR")` (its
only discovery tool — wrong backend, returns schema tools), then asserted
"SIR tesisinde aktif alarm bulunmamaktadır. Fabrika normal çalışma
durumundadır." with **zero supporting alarm query**. Two stacked defects:
(a) router recall miss on a vague query; (b) a negative operational conclusion
confabulated from absence of evidence — the exact lie-shape family ADR-001
exists to contain, currently uncovered because the deterministic empty≠zero
validator compares a claim against an ACTUAL empty tool result; here there was
no tool result to compare against.

## 1 · Root-cause layers (what structurally prevents the class)

### Layer 1 — context-aware semantic routing (F132 kill-shot)
`routeSemantica` gains optional `contextTurns: string[]` (the last N prior USER
messages). `buildRouterPrompt` composes a context block INTO the existing
`{{USER_MESSAGE}}` substitution:

```
[EARLIER USER TURNS — context only, do not route these]
KB7 nin OEE degerlerini gunluk olarak cizermisin
[CURRENT QUESTION — route THIS]
tum hatlari tek bir grafikde cizelim
```

**Deliberate freeze-compatibility decision:** the composite rides the EXISTING
`{{USER_MESSAGE}}` placeholder, so the DB-published router.prompt v-current
(rule c1ea1cf6 lineage) works UNCHANGED — no prompt republish, no golden gate,
GOLDEN FREEZE untouched. The code-floor `ROUTER_PROMPT_FLOOR` gets a one-line
wording update ("the question may arrive with earlier turns as context; route
the CURRENT question") — code change only. A DB republish that mentions the
block explicitly is a nice-to-have queued behind the freeze.

### Layer 2 — deterministic sticky floor (defense in depth, survives router failure)
Independent of the LLM: `filterToolsByMessage` gains optional
`priorUserMessages?: string[]`. When present and `contextTurns > 0`, the final
category set becomes:

```
final = pathResult(current) ∪ matchCategories(previousUserMessage)
```

applied on BOTH semantic and keyword paths. Guarantee delivered: **a follow-up
turn can never reach FEWER tools than its immediately-preceding turn's
deterministic keyword match** — which is exactly anaphora semantics ("tüm
hatları" inherits the previous subject). In the 07:02 replay: previous turn's
learned matches (oee→metrics,production,machine — now in the map) restore
`canonicalOEE=present` even if the router misses again. Bounded to ONE prior
user turn — no category snowballing across long conversations. Topic switches
err toward a slightly wider offer, which is the safe direction (reachability
over minimalism; the model selects, it is not confused by presence).

Determinism/safety split (§7 recurring trap): both layers live on the SOFT
side — they change how the agent FINDS tools, never what it knows. The union
is deterministic code; the context judgment is the already-governed router.

### Layer 3 — governed knob: `router.contextTurns`
New `agent.param` row, stage '07', floor **2**, clamp [0, 6]. 0 = feature off
(byte-identical to today). Self-seeds via the F128 kind-aware reconciler —
zero Operator action, zero migration (PLATINUM). Threaded
`resolveRouterPolicy → RouterPolicy.contextTurns?` (optional field — every
pre-existing caller/test constructing RouterPolicy stays byte-identical, the
same pattern promptTemplate used in SR1-W2).

### Layer 4 — evidence legibility (F133 deterministic containment)
The client advisory strip (RawToolResults / procedure chip line) already holds
per-call `toolName` data. Surface a deterministic per-turn evidence line on
the chip WITHOUT expanding the panel:

> `Kanıt: getFactoryList ×1 · search_tools ×2` — or, when zero tool calls ran:
> `⚠ Bu cevap hiçbir araç sorgusuna dayanmıyor`

Pure render of data the client already receives. It does not stop the model
from writing an unsupported sentence — per ADR-001 the goal is HARMLESS, not
honest: the user SEES at a glance that "SIR'da alarm yok" was written next to
an evidence line containing no alarm query. Claim-level matching without an
LLM judge is a wall we do not pretend to climb (no fragile regex — standing
rule).

### Layer 5 — prompt-law amendment (staged behind the freeze, NOT in this phase)
Grounding segment addition (draft text, to be minted as
`cwf-grounding-negative-assertion-segment-edit-v1.md` when the publish batch
is staged):

> "Never state an operational conclusion (no alarms, no stock, running
> normally, X is fine) unless a tool result in THIS turn supports it. If the
> relevant tool was not available or you could not query, say explicitly that
> you could not check — a missing query is never evidence of absence."

prompt.segment publishes ride the golden gate → **frozen**. This draft joins
viz v3 + b1_scope v2 as staged edit #3, ships at freeze lift. Named here so
the ledger carries it (GOLDEN LEDGER).

### Layer 6 — the governed proposals loop is already the recall-quality organ
The 07:15 turn RECORDED `[durum, tesis]` proposals; earlier turns recorded
`[grafik] [oee] [kb7] [alarms] [quantities] [warehouse] [inventory]`. Accepting
these into categories via the Araç Eşleme gated panel IS the designed fix loop
for vague-query recall — no new mechanism is built for it. Owner decision
surface only (accept/reject), per S43-3.

## 2 · Explicitly rejected
- **Persisting per-turn matched categories** (schema/migration, C1-adjacent
  risk) — unnecessary: history is already in the request body.
- **Client-echoed category floor** — server-side derivation is available;
  never trust the client with routing inputs.
- **Mid-stream dynamic tool registration** (a backend-agnostic
  `find_more_tools` meta-tool that widens the live call's toolset) — the
  Vercel AI SDK fixes the tool set per streamText call; this is a real future
  architecture item (register it), not a bolt-on.
- **Runtime LLM judge for claim coverage** — ADR-001 ban stands. Offline
  advisory lens ("unsupported-negative assertions") is the sanctioned home;
  named for the register, not built.

## 3 · Ledger entries (for register v52)
- **F132** OPEN → fixed-by SR1-W3B-1 (Layers 1–3). Evidence: trace e7d40549.
- **F133** OPEN, three-part closure: Layer 4 (this phase) + Layer 5 (staged,
  freeze) + Layer 6 (owner proposal-acceptance). Evidence: trace 731e4077.
- **F134** NEW/parked: mid-turn tool-set expansion meta-tool (find_more_tools)
  — architecture item, post-1.0 candidate.
- **F135** NEW/parked: offline "unsupported-negative" replay lens (advisory
  scorer, ADR-001-compliant home for claim-coverage judgment).

## 4 · Verified code facts this design stands on (S49-1)
- `TurnContext.conversationHistory: Array<{role,content}> | undefined` —
  turn/types.ts (request-body-seeded; available at stageTools).
- `filterToolsByMessage(allTools, userMessage, categories?, routerPolicy?)` —
  toolCategories.ts:677; semantic gate at :688; ONE `[Route]` line per run.
- `routeSemantica(message, catalog, params)` — semanticRouter.ts:131; prompt
  built by `buildRouterPrompt` substituting `{{USER_MESSAGE}}`; armor floors
  on every failure.
- `RouterPolicy { enabled, timeoutMs, maxCategories, promptTemplate? }` —
  optional-field extension pattern established by promptTemplate (SR1-W2).
- Learned-map WRITE side untouched (F123 retirement-evidence law).
- Client already renders `result.toolName` (RawToolResults.tsx:71).

<!-- END · cwf-sr1-w3b-context-route-design-v1 · rev 1 · 2026-07-17 -->
