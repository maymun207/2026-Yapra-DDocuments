# Task INV-1 — Content-tab interactivity inventory (READ-ONLY)

> **Type:** Diagnostic inventory · no code changes, no commits, no PR
> **Author:** Claude (architect)
> **Purpose:** Decide Option A (render the docs, retire the React content layer) vs Option B (auto-extract data) on **facts**. We need to know, for each React *content* tab, exactly what interactivity it implements that its **source canonical doc does not already have** — so we know which docs (if any) need a small HTML5 top-up before we frame them.
> **Output:** a per-tab inventory with evidence (file:line). Nothing is changed.

---

## 0. Hard rules

- **READ-ONLY.** No edits, no commits, no PR, no branches. Inventory only.
- **Two repos in scope:**
  - `maymun207/TheBluePrint23` (the app) — for the React content-tab components and their data sources.
  - `agbuilder-platform/revolutionize` (content store) — for the canonical docs.
- **Cite raw evidence** for every claim — `file:line` or a short code/markup excerpt. Do **not** infer or summarize from memory; if you can't point to the code, don't assert it. (We've had inaccurate self-reports; this one must be evidence-backed.)
- If anything is ambiguous (e.g., a tab has no clear 1:1 source doc), **report the ambiguity** rather than guessing.

---

## 1. Scope — the 8 CONTENT tabs only

Inventory these content tabs (the ones that re-present canonical content):

`Big Picture · EAIP Arch · EAIP Conn · EAIP Sched · Rev Arch · Rev Conn · Rev Sched · Bridge`

**Do NOT inventory** `Phase 0`, `Library`, `Resources` — those are app machinery (governance, doc index, resource view), not content re-implementations. They stay in React regardless.

---

## 2. For each of the 8 content tabs, report

**2.1 — The React side.**
- The route + component file(s) in the app repo (e.g. `app/eaip/architecture/page.tsx` and any child components).
- The **data source**: which `app/_data/*.ts` file(s) the tab renders from. (This is the hand-extracted content layer we're evaluating for retirement — name the exact files.)
- **Every interactive feature** the tab implements, each with `file:line` evidence. Be specific and concrete, e.g.:
  - click-to-detail panel (what opens, what data it shows)
  - filtering / toggles (what filters what)
  - language EN⇄TR toggle (how it's wired)
  - hover highlights, expand/collapse, animated transitions
  - charts / Gantt / SVG diagrams (how rendered — library? inline SVG? canvas?)
  - any cross-tab or backend (Supabase) interaction
  - anything else interactive

**2.2 — The source doc.**
- Which canonical doc in `agbuilder-platform/revolutionize/docs/` is this tab's source/equivalent. (State it explicitly; if unclear or many-to-one, say so.)
- Is the doc **self-contained** (its own `<style>` + `<script>` for interactivity) or **static** (prose/markup only)? Cite evidence (presence of `<script>`, event handlers, etc.).
- **Which of the React tab's interactive features (from 2.1) the doc ALREADY has natively** — with evidence (the doc's own `onclick`, JS functions, SVG, lang toggle, etc.).

**2.3 — The DELTA (the key output).**
- List interactive features present in the **React tab** but **NOT** in the source doc. This is the "top-up needed" list.
- For each delta item, note whether it looks **trivial** (a click-handler, a show/hide), **moderate** (a filter system, a detail-panel pattern), or **substantial** (something genuinely complex) to add to the doc in plain HTML5/JS.

---

## 3. Output format

A table per tab, then a roll-up:

```
### <Tab name>
- React component: <file>
- Data source: <app/_data/...ts>
- Source doc: <docs/architecture/...html>  (self-contained: yes/no)

| Interactive feature | In React tab? | In source doc? | Delta (top-up needed) | Effort |
|---------------------|---------------|----------------|------------------------|--------|
| click-to-detail     | yes (file:line) | no (or yes, file:line) | yes/no | trivial/moderate/substantial |
| EN⇄TR toggle        | ...            | ...            | ...    | ... |
| ...                 |               |                |        |      |
```

Then a **roll-up summary**:
- Total interactive features across all tabs that the docs **already have**: N
- Total **delta** features (in React, not in docs): M — broken down by effort (trivial / moderate / substantial)
- Any tab where the React layer adds something **genuinely hard to do in HTML5** (if any — I expect none, but report honestly if you find one)
- Any tab with **no clear source doc** (ambiguous mapping)

---

## 4. What I'll do with this

If the deltas are all trivial/moderate (expected), Option A is confirmed: we top up the handful of docs in HTML5, then frame the docs per tab and retire the `app/_data` content layer + the React content re-implementations — one source of truth, zero drift. If any delta is genuinely substantial, we weigh it explicitly before deciding. Either way, the call is made on this inventory, not assumption.

**Report the inventory. Change nothing.**
