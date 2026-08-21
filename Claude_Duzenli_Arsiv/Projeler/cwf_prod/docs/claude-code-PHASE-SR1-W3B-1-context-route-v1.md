# PHASE SR1-W3B-1 — Context-Aware Routing + Sticky Floor + Evidence Line

<!-- claude-code-PHASE-SR1-W3B-1-context-route-v1 · rev 1 · 2026-07-17
     Design authority: cwf-sr1-w3b-context-route-design-v1.md
     Ceremony profile: FULL (api/** surface). CI (unsharded) is the sole test
     arbiter (S37-2); Architect review = FAST-GATE (S43-2).
     PLATINUM compliance: self-configuring — the new param self-seeds via the
     F128 kind-aware reconciler; no migration, no Operator step, no golden run,
     no manual configuration anywhere. -->

**PRECONDITION (S47-1):** This prompt is valid only while
`origin/master == b563046424a4c64b3b46454742db744dacadf15e` and no other open
PR touches `api/cwf/_lib/toolCategories.ts`, `api/cwf/_lib/semanticRouter.ts`,
or `api/cwf/_lib/turn/stageTools.ts`. On mismatch: STOP and report actual state.

## 0 · Mission

Two production failures on 2026-07-17 (traces `e7d40549`, `731e4077`) exposed
that the semantic router judges the bare current utterance: anaphoric
follow-ups lose their subject ("tum hatlari tek bir grafikde cizelim" →
`[andon,production]`, `canonicalOEE=absent` → the model truthfully said it
cannot draw the chart), and narrow matches leave the model tool-starved with
no honest signal to the user. You will make routing conversation-aware in two
independent layers (LLM context + deterministic sticky union), govern the
context depth, and surface a deterministic per-turn evidence line in the
client advisory strip.

## 1 · Hard pre-flight (all must pass before any edit)

```bash
cd /tmp && rm -rf cwf_yaprak && git clone -q https://github.com/maymun207/cwf_yaprak.git && cd cwf_yaprak
git rev-parse origin/master        # MUST print b563046424a4c64b3b46454742db744dacadf15e
grep -n "conversationHistory" api/cwf/_lib/turn/types.ts        # field exists
grep -n "export async function filterToolsByMessage" api/cwf/_lib/toolCategories.ts   # :677
grep -n "export async function routeSemantica" api/cwf/_lib/semanticRouter.ts         # :131
grep -rn "contextTurns" api/ shared/ src/ | wc -l               # MUST be 0 (name is free)
npm ci --no-audit --no-fund --silent && npx tsc --noEmit -p tsconfig.json
```

Create branch `phase/sr1-w3b-context-route` from origin/master.

## 2 · Binding constraints

1. **Frozen surfaces (zero-diff proof required):** eval-gate machinery
   (governance engine, stage order, schema interpreter), `gateway.ts`,
   learned-map WRITE side (F123 retirement-evidence law — `learnToolMapping`
   and its call sites byte-identical), `recordRouteProposals` semantics,
   `router_proposals` write path, all migrations (`supabase/migrations/`
   gains NOTHING — this phase is migration-free by design).
2. **Byte-identity floor:** every pre-existing call of `filterToolsByMessage`
   and `routeSemantica` WITHOUT the new optional arguments must behave
   byte-identically. Prove with an equivalence test (constraint pattern:
   SR1-W1's zero-LLM-call dark-launch test).
3. **contextTurns=0 ≡ today.** The resolved value 0 must disable BOTH layers
   (no context block, no sticky union) — one test pins this.
4. **No new LLM calls.** Layer 2 (sticky union) is pure `matchCategories`
   reuse over the prior user message — deterministic, zero-cost. The router
   still makes exactly one call per turn.
5. **No prompt.segment publish, no golden anything** (GOLDEN FREEZE). The
   context block rides the existing `{{USER_MESSAGE}}` substitution so the
   DB-published router.prompt works unchanged. Only the code-floor
   `ROUTER_PROMPT_FLOOR` wording may change.
6. **Secrets:** never printed, never logged (ADR-007). No new env vars.
7. **S41-1 born-loud:** the `[Route]` line gains `ctx_turns=N sticky=[...]`
   fields on every run (empty sticky renders `sticky=[]`, never omitted when
   the feature is active).
8. Merge `--no-ff`; CI green on the PR head is a MERGE PRECONDITION (S37-2).

## 3 · Gated sub-phases

### W1 — routeSemantica context input
- `routeSemantica(message, catalog, params, priorUserMessages?: string[])`
  (4th optional param; absent = byte-identical).
- When present and non-empty, build the composite block substituted into the
  EXISTING `{{USER_MESSAGE}}` placeholder:

  ```
  [EARLIER USER TURNS — context only, do not route these]
  <prior user messages, oldest first, one per line, each truncated to 300 chars>
  [CURRENT QUESTION — route THIS]
  <current message>
  ```

- Update `ROUTER_PROMPT_FLOOR` wording: after "Given a user question", append
  " (it may arrive with earlier conversation turns marked as context — route
  only the CURRENT question, using the context to resolve references like
  'those lines' / 'tüm hatlar')". Nothing else in the floor changes.
- Tests: composite built correctly · absent param = identical prompt bytes ·
  a DB-style template lacking any context awareness still receives the block
  through `{{USER_MESSAGE}}` (no placeholder addition anywhere).

**GATE W1:** targeted router tests green; show the composed prompt for the
07:02:30 replay shape in the report.

### W2 — deterministic sticky union in filterToolsByMessage
- Signature: 5th optional param `priorUserMessages?: string[]`.
- Active when `routerPolicy?.contextTurns` resolves > 0 AND
  `priorUserMessages` non-empty. Take ONLY the LAST prior user message for
  the union (bounded by design — no snowballing):

  ```
  stickyCats = matchCategories(lastPriorUserMessage, learnedMappings, categories)
  matchedCats = pathResult ∪ stickyCats        // semantic AND keyword paths
  ```

- The union happens AFTER the path decision and BEFORE the `[Route]` log line;
  `matched=[...]` in the log shows the FINAL set; new fields `ctx_turns=N
  sticky=[a,b]` name the union's contribution (sticky lists ONLY categories
  added by the union, not the overlap).
- Span attrs: add `cwf.route.sticky_count` alongside the existing four.
- `recordRouteProposals` input UNCHANGED (router's own proposals only — the
  sticky union never manufactures proposals).
- Tests: regression test reproducing trace e7d40549's shape — router mock
  returns `[andon,production]` for the follow-up, prior message is the OEE
  question whose keywords map to `[metrics,production,machine]`; assert final
  set contains metrics+machine and `canonicalOEE` flips present. Plus: union
  inactive at contextTurns=0 · keyword path union · sticky=[] when prior
  message matches nothing.

**GATE W2:** regression test green; equivalence test (no new args) green.

### W3 — governed param `router.contextTurns` + threading
- New `agent.param` registry entry: key `router.contextTurns`, stage '07',
  floor **2**, clamp [0, 6], integer. Self-seeding via the existing kind-aware
  reconciler (F128) — NO migration, NO seed script, NO Operator step.
- `RouterPolicy` gains optional `contextTurns?: number`;
  `resolveRouterPolicy()` resolves it db>floor exactly like the other three
  knobs. Optional field ⇒ every pre-existing RouterPolicy literal compiles
  and behaves unchanged.
- `stageTools.ts`: derive `priorUserMessages` from
  `ctx.conversationHistory` — filter `role === 'user'`, take the last
  `contextTurns` entries' content, EXCLUDING the current message if the
  client includes it in history (verify the actual client contract in
  `src/` before assuming; state what you found in the report). Pass into
  `filterToolsByMessage`, which passes the router slice into
  `routeSemantica`.
- `[Params]` log line: contextTurns is NOT added (that line is agent-lane
  params); the `[Route]` line's `ctx_turns=` field is its observability home.
- Tests: resolver db>floor>clamp · stageTools derivation (user-role filter,
  count, exclusion rule as found).

**GATE W3:** param resolves from floor with zero DB rows (fresh-env test);
full targeted suite green.

### W4 — evidence line in the client advisory strip
- `RawToolResults.tsx` (and the procedure-chip line component if separate):
  render a deterministic evidence summary from data the client ALREADY
  receives — distinct `toolName`s with counts, in call order:
  `Kanıt: getFactoryList ×1 · search_tools ×2`.
- When the turn ran ZERO tool calls, render instead:
  `⚠ Bu cevap hiçbir araç sorgusuna dayanmıyor` (styling: warning tone, same
  strip, no new panel).
- Respect the existing i18n/language pattern of the strip (match how the
  neighboring advisory text handles TR/EN; do not invent a new mechanism).
- Tests: two render tests (multi-tool enumeration · zero-tool warning). Note
  the adminLegibility auto-gen footgun does NOT apply (chat surface, not
  admin .tsx) — verify and state.

**GATE W4:** render tests green; screenshot-free proof = test assertions on
the exact strings.

### W5 — docs + reseal
- CHANGELOG entry + skill-KB note (.agents/) for the phase.
- `npm run reseal` if the doc-drift manifest flags the touched mapped files;
  docVersion bumps rev 107 → rev 108 in the same commit as the flip (or
  two-commit pattern if mixed — follow the established rule).
- Self-verify checklist (below) answered inline in the final report.

## 4 · Self-verify (answer each with evidence, not assertion)

1. `git diff --stat b563046..HEAD -- supabase/migrations` → EMPTY.
2. `git diff b563046..HEAD -- api/cwf/_lib/turn/stageStream.ts api/cwf/_lib/llm/gateway.ts` → EMPTY (gateway frozen; stream stage untouched).
3. Grep proof learned-map write side untouched: `git diff b563046..HEAD -S "learnToolMapping"` → EMPTY.
4. Equivalence: name the test file+case proving no-new-args byte-identity.
5. Regression: name the test reproducing e7d40549 and paste its assertion.
6. contextTurns=0 pin: name the test.
7. `[Route]` line sample from a test run showing `ctx_turns=` and `sticky=`.
8. Full CI (unsharded) green on the PR head — link the run.
9. Zero new env vars, zero secrets in diffs.
10. Test/file count delta stated (expected: +files for router/union/param/render tests).

## 5 · Report format

Standard phase report: branch, HEAD SHA, files touched (name-list), test
delta, gate-by-gate evidence, self-verify answers 1–10, open questions. Do
NOT merge — Architect FAST-GATE review + CI-green precede the GO.

<!-- END · claude-code-PHASE-SR1-W3B-1-context-route-v1 · rev 1 · 2026-07-17 -->
