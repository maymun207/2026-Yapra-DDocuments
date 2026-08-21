# PHASE `ROUTE-SCRAP-1` — a tool the agent knows about can never again be unreachable; a silent turn can never again look like an answer

<!-- claude-code-PHASE-ROUTE-SCRAP-1-v1 · rev 1 · 2026-07-13 · Session 40.
     Author: Architect. Executor: AG (Claude Code / AntiGravity).
     Code floor: origin/master e93906c · 2123 tests / 208 files · rev 70 · drift [OK].
       (If WAVE2-IA-1 has merged by the time you start, the floor is that merge — 2127/209.
        Re-derive the numbers at pre-flight; do not trust these.)
     Ceremony: FULL. TOUCHES api/** ⇒ the reseal budget MAY return — check the manifest (§2.3).
     Live evidence (production logs + a counterfactual run, 2026-07-13): §1. -->

---

## 0 · PRE-FLIGHT GATE

```bash
cd /tmp && rm -rf cwf_yaprak && git clone --quiet https://github.com/maymun207/cwf_yaprak.git
cd cwf_yaprak && git rev-parse origin/master     # RECORD it — it is your anchor
npm ci --no-audit --no-fund --silent
npx tsc -b                                        # clean
npx tsx scripts/checkDocDrift.ts                  # [OK] — RECORD the rev
npx vitest run --reporter=dot                     # RECORD count/files
```

Record the four numbers; every claim in your report is measured against them.

---

## 1 · THE EVIDENCE (this is not a hypothesis — it is a measured production defect)

The owner asked, in production: *"KB7 ikincilalt hattı bugünkü fire listesi."* The agent replied that
it could not, because `getDailyManualScrap` **"şu anda mevcut değil"** — and then fell back to
`getScrapBarcodeList`, which needs a shift and an order-plan ID, which it asked the **user** for.

The runtime logs say exactly why:

```
[ToolFilter] ✅ Matched categories: [factory, metrics, quality, linestop, production, machine] → 53/141 tools
[ToolRoute]  provider=gemini bypass=off path=keyword offered=57/145 gateway=4 canonicalOEE=present
```

`getDailyManualScrap` was **not among the 53**. It is not in the offered set because it is not in
**any** category in `toolCategories.ts` — grep it: the file names `getScrapBarcodeList`, and never
names `getDailyManualScrap`. And the learned map cannot save it: `matchCategories()` maps a keyword
to **category names**, and `getToolsForCategories()` draws tools **only** from the static
`CATEGORIES`. **A tool in no category is unreachable by construction** — no governed rule, no cache
clear, no learning can offer it.

**The counterfactual, run live:** with the session `routingBypass` flag on (the filter skipped, the
full set offered), the same question produced `resolve_time_range → getFactoryLines →
getDailyManualScrap` → a real 24-row scrap list. So: the tool **exists**, it **works**, it needs
neither shift nor `orderPlanId`, and the governed rule teaching the agent to prefer it **already
works**. The one and only failure was **availability**.

> **The class of defect:** the ARMES domain pack *declares* four tools it depends on
> (`ARMES_REFERENCED_TOOLS`) and a tool graph that *sequences* them. Nothing checks that those tools
> can actually be **offered**. The knowledge layer and the routing layer disagreed silently for
> months. That is the hole to close — the missing category line is merely today's symptom.

**A second, independent defect on the same evidence.** The heavy A3 request died as
`finishReason=error, output=0, input=43085` **after** several tool calls, and the user saw the raw
client string `'No response generated.'` — no honest message, no diagnosis. `completionGuard.ts`
cannot help: `isEmptyCompletion()` requires `toolCallCount === 0`. So the "an empty answer is never
a blank screen" floor **has a hole exactly where the turn did work and then died**.

**Out of scope (ARMES-side, the owner is raising it with their team):** `getScrapBarcodeList`
returns `Zone not found` for the IKINCILALT zone, and its own output violates its own `outputSchema`
(`required property 'orderPlanId' not found`). **Do not work around these. Do not add retries or
shims for them.**

---

## 2 · BINDING CONSTRAINTS

1. **S39-2 — master ONLY via a reviewed PR.** Branch → PR (fires CI) → the Architect's verbatim
   merge message. Never push to master.
2. **No eval-gate machinery change.** The staging ENGINE, the STAGE ORDER, the schema interpreter,
   and the existing backend path stay byte-identical.
3. **No new lever, no new endpoint, no migration, no schema change.** This phase is a category line,
   a guard test, and an honest message.
4. **`ALWAYS_INCLUDE` does not change.** The availability floor is a safety property; do not "fix"
   reachability by dumping tools into the floor — that widens every request's offered set.
5. **Do not touch the learned-cache mechanism** (`tool_category_cache`, the epoch, the router). The
   bug is not there.
6. **Reseal check (§2.3):** `api/**` is drift-mapped. After your edits run
   `npx tsx scripts/checkDocDrift.ts`. If it reports drift, reseal **in the same commit** and bump
   `docVersion` per the repo's own convention. If it stays `[OK]`, say so explicitly — do not bump
   for nothing.
7. **CHANGELOG entry in-branch**, same PR.

---

## 3 · SUB-PHASE A — reachability becomes a GUARD, then a fix

**Do A1 before A2.** The test must go red first; a fix whose test never failed proves nothing.

### A1 · The guard (NEW test) — `api/cwf/__tests__/toolReachability.test.ts`

Assert: **every tool the ARMES domain pack declares is reachable.**

```
reachable = (⋃ CATEGORIES[].tools) ∪ ALWAYS_INCLUDE
declared  = ARMES_REFERENCED_TOOLS ∪ { node.tool for node in TOOL_GRAPH }
assert declared ⊆ reachable
```

- Export whatever minimum surface the test needs from `toolCategories.ts` (e.g. a
  `reachableToolNames()` helper, or exporting `CATEGORIES`/`ALWAYS_INCLUDE` read-only). Prefer a
  **named pure helper** over exporting the raw arrays.
- The failure message must name the unreachable tool and say what it means:
  *"declared by the ARMES domain pack but present in no category and not in ALWAYS_INCLUDE — it can
  never be offered."*
- **Run it and paste the RED output before writing the fix.** That red line is the artifact that
  proves months of silent breakage.

### A2 · The fix — one line

Add **`getDailyManualScrap`** to the **`quality`** category's `tools` (the category whose keywords
already carry the fire/scrap vocabulary — `FIRE_ROUTING_SYNONYMS` — and which already holds
`getScrapBarcodeList`). Nothing else moves: no keyword changes, no new category, no other tool.

Re-run A1: green.

### A3 · The sweep (report only)

Run the same reachability logic over the **Superset** domain pack's declared tools, if it declares
any. **Report the result; fix nothing.** If Superset has the same hole, that is a finding for the
register, not a scope creep.

---

## 4 · SUB-PHASE B — a silent turn tells the truth (F69)

`completionGuard.ts` defines the empty case as *no text AND no tool calls*. A turn that called tools
and then produced no text falls through to the client's raw `'No response generated.'`
(`src/lib/cwfService.ts:219`). Close it — **without touching the existing empty-retry policy.**

1. **New pure predicate** in `completionGuard.ts` (do not widen `isEmptyCompletion` — the retry
   logic keys on it, and a retry is the wrong response here):

   ```ts
   /** The turn did work (tools ran) and then produced NO text. Not the OBS-3 retriable empty. */
   export function isSilentFinish(i: { text: string; toolCallCount: number; finishReason: FinishReason }): boolean
   ```
   True when `text.trim() === ''` **and** `toolCallCount > 0`.

2. **An honest, reason-aware message** (a pure function beside it; the ONLY new user-facing copy):
   - `finishReason === 'error'` →
     `'Araçlar çalıştı ama model cevabı üretemeden hata verdi. Soru büyük olabilir — hatları tek tek ya da daha dar bir zaman aralığıyla sor. (Turn kaydı İncele'de duruyor.)'`
   - `finishReason === 'tool-calls'` (the step cap: `stopWhen: stepCountIs(MAX_TOOL_ROUNDS)`) →
     `'Bu soru araç bütçesini doldurdu: model veri toplamayı bitiremeden durduruldu. Soruyu böl — önce duruşlar, sonra fire.'`
   - `'length'` / `'content-filter'` / anything else →
     `'Araçlar çalıştı ama cevap üretilemedi. Turn kaydı İncele'de duruyor; soruyu daraltıp tekrar dene.'`

   Every message says **what happened** and **what the user does next**. None of them is a stack
   trace and none of them is a blank.

3. **Wire it at the single existing call site** where the completion is finalized (the same place
   `isEmptyCompletion` is consulted). **No cross-provider swap, no new retry, no silent fallback** —
   the message replaces the blank, that is all.

4. **Log it** on the existing `[LLMFinish]` line's neighbourhood: one line naming
   `silentFinish=true finishReason=… toolCalls=N` so the next occurrence is greppable.

5. **Tests:** the predicate (empty+tools+each finishReason), the message selector (one per branch),
   and one regression test proving `isEmptyCompletion` and the OBS-3 retry path are **unchanged**
   (a text-empty, zero-tool completion still retries exactly as today).

---

## 5 · SELF-VERIFICATION (paste every item)

1. Anchor SHA; branch; PR URL.
2. **The RED first:** the A1 failure output naming `getDailyManualScrap`, captured **before** A2.
3. `git diff --stat <anchor>..HEAD`, plus the guard: no diff under `supabase/**`, no migration, no
   change to `ALWAYS_INCLUDE`, no change to the eval-gate staging engine (`git diff` proof).
4. `npx tsc -b` clean; `npx vitest run --reporter=dot` **UNSHARDED** (sharded ≠ CI) — count + delta.
5. `npx tsx scripts/checkDocDrift.ts` — `[OK]`. State whether a reseal was needed and, if so, the
   new `docVersion`.
6. **Prove the offered set changed:** a unit assertion (not a claim) that a message containing
   "fire" now yields an offered set **containing** `getDailyManualScrap` — routed through the SAME
   production core (`routeKeywordLayer`), not a hand-built set.
7. **Prove the honest message:** the test output for `finishReason='error'` + `toolCallCount=3` +
   empty text → the Turkish message, and for the zero-tool empty → the OBS-3 retry path, unchanged.
8. A3 sweep result (Superset), report-only.
9. **CI green on the PR head.**

Report every deviation. A deviation disclosed is a design conversation; a deviation found in review
is a defect.

---

## 6 · ACCEPTANCE

1. Ask, with **no session flags**: *"KB7 ikincilalt hattı bugünkü fire listesi"* → the agent calls
   `getFactoryLines → getDailyManualScrap` and returns the list. (The counterfactual already proved
   the agent does the right thing the moment the tool is offered.)
2. The reachability test is in CI. A future tool declared by a domain pack and forgotten by the
   router **fails the build**, not the customer.
3. A turn that dies after doing work says so, in a sentence a human can act on.

---

## 7 · OUT OF SCOPE

The ARMES-side `Zone not found` / `outputSchema` bugs (owner is raising them). Governing
`MAX_TOOL_ROUNDS` as an `agent.param` (F39 — a later phase). The learned map's stopword pollution
(SEMANTIC-ROUTING-1). The intermittent `[MCP Discover] armesMes … 401` (F73 — needs its own
diagnosis; **do not chase it here**).

<!-- END · claude-code-PHASE-ROUTE-SCRAP-1-v1 · rev 1 · 2026-07-13 -->
