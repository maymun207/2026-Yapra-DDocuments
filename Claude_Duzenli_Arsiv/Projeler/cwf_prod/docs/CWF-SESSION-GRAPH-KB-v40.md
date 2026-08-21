# CWF — Session Graph KB · v40

<!-- CWF-SESSION-GRAPH-KB-v40 · rev 40 · 2026-07-13 · Session 40. Supersedes v39.
     What happened, why it happened, and what a future Architect must not re-learn the hard way. -->

## 1 · THE SHAPE OF THE SESSION

S40 started as a UI session (Wave 2) and became a **diagnosis session**. The pivot was one production
question the owner asked and did not get answered. Chasing it exposed a defect class that had been
live for months, and a lane that had been working through a forbidden door.

**Merged:** `WAVE2-CONTENT-1` (`e93906c`) → `WAVE2-IA-1` (`c7eb89c`) → `ROUTE-SCRAP-1` (`4177eb2`) →
`MCP-EXPLORER-1` (`d3e0c4e`). Floor: **2173 tests / 212 files · rev 72 · CI green · prod READY.**
`PARAM-GOV-1` in flight at close.

---

## 2 · THE THREE TRUTHS OF S40

### Truth 1 — A tool the knowledge layer DECLARES, the routing layer may never OFFER.
`getDailyManualScrap` was named in `ARMES_REFERENCED_TOOLS`, placed in the tool graph, and written
into its own sequencing prose — while sitting in **no** routing category. `matchCategories` maps
keywords to category **names**; `getToolsForCategories` draws tools **only** from the static
`CATEGORIES`. So the tool was unreachable **by construction**: no governed rule, no cache clear, no
learning could have rescued it. Nothing was checking. Now RULE 31 does — and the Explorer drawer
immediately reported **29 more** in the same state.

### Truth 2 — The system had the answer the whole time; the panel threw it away.
`mcp-probe.ts` has always returned `toolCount`, `errorClass`, `httpStatus`. The panel rendered **a
green dot**. Which is why another user's credential-less `armesMes` row has been 401-ing on every
discovery for weeks, in production, invisible to the super_admin who owns the system.
*Corollary (S40-5, the owner's rule): a system you cannot see is a system you cannot debug.*

### Truth 3 — The Operator lane had been driving through a forbidden door.
Gemini was reading `.env.local` and building a service-role Supabase client by hand. Its MCP was not
even authorised for the project. **The lane looked healthy because the wrong path worked.** It only
surfaced when I forbade the path and the lane collapsed. → the S40-4 fence header, and SEC-1 (rotate
the key).

---

## 3 · SIX LESSONS

1. **The owner's hypothesis was right about the symptom and wrong about the layer.** He said "teach
   the agent the tool." He published a correct, necessary governed rule — and nothing changed, because
   the tool was never on the table. *Diagnose the layer before writing the fix.*
2. **My first diagnosis was wrong too.** I read *10 tool calls → no text* as step-cap exhaustion. The
   logs said `finishReason=error` at 43k input tokens. **Production logs beat inference.**
3. **A counterfactual is the cheapest proof (S40-1).** One session flag (`routingBypass`) turned a
   month-old mystery into a closed case in 90 seconds: with the full set offered, the agent called the
   right tool immediately and returned 24 rows.
4. **Verify the flag was applied before reading the experiment (S40-2).** A `bypass=off` line in the
   logs invalidated a whole round of both our reasoning.
5. **Don't claim teeth you haven't bitten (S40-3).** My IA-1 prompt asserted a compile-time guarantee
   the type system does not give (`StageEntry.no` is `string`). AG disclosed it honestly in a docblock
   and softened it in the summary. **Read the docblock, not the summary.**
6. **Read the catalog, not the logs (S40-6).** I inferred "Superset grew to 8 tools" from a count.
   Superset has 4; `gateway=8` was two Superset servers enabled at once. The Explorer now answers this
   in one click — the tool I had just shipped.

---

## 4 · WHAT THE THREE UI PHASES ACTUALLY BOUGHT

- **CONTENT-1:** the doctrine stopped living in a design note where it can decay. The voice is a
  **test** (`voiceGate`), the docs bridge is a **type** (a card without one does not compile), and
  "what you will do next" is a **required field**. Three names now say what they do to a human.
- **IA-1:** the Sandbox regroups by stage — but only after the stage became a **fact**. Four of five
  hand-written stage chips were wrong; regrouping without fixing them would have promoted a cosmetic
  error into a structural lie. The two governed levers are now pinned against the **server's own**
  declaration.
- **MCP-EXPLORER-1:** read-only by design (`callTool` appears nowhere in the diff). The invoke console
  is a separate, gated phase — because 141 ARMES tools include `createRecipe` and `updateLineStop`,
  and **`get*` is a convention, not a guarantee**.

---

## 5 · THE OPEN GOVERNANCE QUESTION (decided, not open — record it)

The owner asked: *how many hardcoded tables are there, and which are configurable?* Answer: **24
tables — 14 governed, 6 structural by design, 4 red.** He ruled: **all four reds go green.** I
accepted, with one condition he accepted in turn:

> **Governed does not mean unguarded — it means the guard moved.**
> Categories governed ⇒ the reachability invariant moves from a CI test to the **eval-gate** (a
> published row must not orphan a declared tool). The tool-round ceiling governed ⇒ the `[min,max]`
> clamp is mandatory. `ALWAYS_INCLUDE` and the CORE schemas stay in code: you cannot put the lock
> inside the box.

<!-- END · CWF-SESSION-GRAPH-KB-v40 · rev 40 · 2026-07-13 -->
