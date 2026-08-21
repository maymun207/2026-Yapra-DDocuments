# CWF — Provider-arm asymmetry: why the model comparison cannot conclude what it looks like it concludes · v1
<!-- cwf-provider-arm-asymmetry-findings-v1 · 2026-07-26 · S66 · Architect: Claude
     Source: Vercel production runtime logs, deployment dpl_8Vwj2Kc8gGM6dXQKLjM5DjMvEfHb,
     window 2026-07-26 03:13:05Z – 03:36:21Z, 8 chat turns — the complete set in
     that window (no turns were excluded). Every claim below is either a pasted
     log value or a grep-verified source line (TOTAL-45).
     HONEST LIMIT: the Architect read TOOL TRACES, not the rendered answers. The
     owner's own verdict (gemini mostly failed · openai half-answered · sonnet
     mostly answered) is the ground truth for QUALITY; this note explains the
     MECHANISM behind it and does not re-judge it. -->

## §1 · The headline
> **The three arms were not given the same tools.** Sonnet received all **145**
> tools on every turn and the intent-resolution pipeline never ran for it at all.
> Gemini and OpenAI received a keyword-filtered subset ranging from **14** to
> **74**. The comparison therefore varies **two** things at once — the model and
> the size of its action space — so it cannot establish which model is better.

This is not a bug. It is a documented design decision
(`api/cwf/_lib/turn/stageTools.ts:213`):

```
if (ctx.isAnthropic || ctx.labActive?.routingBypass) { …full sorted set… }
```

with the rationale stated in the comment above it: Anthropic prompt caching needs
a byte-stable prefix, tools render before system, so a per-message-varying tool
set would invalidate the system cache too — full set is *cheaper* for Anthropic
(cache-read ~10%), while fewer tokens wins for everyone else.

The decision is defensible. The **inference drawn from an experiment run on top
of it** is not.

## §2 · The evidence

### Question A — natural-gas consumption, Granit, last 3 days
| time | provider | route | offered | tool calls | out tok | outcome |
|---|---|---|---|---|---|---|
| 03:17:56 | gemini-2.5-flash | semantic | **52**/145 | `search_tools` ×1 → 1 result → stop | 531 (reasoning 462) | gave up |
| 03:19:07 | gpt-4.1-mini | semantic | **74**/145 | **zero** | 122 | never tried |
| 03:20:28 | claude-sonnet-4-6 | **all-fallback** | **145**/145 | `search_tools` ×2 → `list_datasets` ×3 → `get_dataset_info` → `execute_sql` | 2587 | real ClickHouse rows returned |

### Question B — yesterday's 16–24 shift staff on Sırlama 3-4-5, Granit
| time | provider | route | offered | tool calls | out tok | outcome |
|---|---|---|---|---|---|---|
| 03:23:27 | claude-sonnet-4-6 | **all-fallback** | **145**/145 | `getFactoryLines` → `getShiftNotes` ×3 (**all three errored**) → `getEmployeeShiftBetween` → 5 rows | 1583 | recovered from 3 backend errors |
| 03:25:27 | gemini-2.5-flash | semantic | **14**/145 | `getActiveShifts` — returns **today's 24–08 shift** for a *yesterday 16–24* question | 2936 (reasoning 2650) | confidently wrong tool |
| 03:36:21 | gpt-4.1-mini | semantic | **14**/145 | `getFactoryList` → `getFactoryLines` → **`getEmployeesDetail` → 6809 rows** → `getEmployeeShiftBetween` → 5 rows | 701 | right answer, wasteful path |

Context cost: sonnet `input=401617` / `221702` (cached 309672 / 206448) vs gemini
35 897–70 123 and openai 42 355–76 089. Sonnet is being handed 3–10× the context —
economically viable only because of the cache the full-set decision exists to
protect.

## §3 · Five causes, ranked by leverage

**C1 · Action-space asymmetry (dominant).** §1. Everything downstream inherits it.

**C2 · The filter's founding premise is now falsifiable — and the first evidence
goes against it.** The source comment states the relevance filter exists because
it *"helps weak models navigate ARMES's ~140 tools."* At 03:25 the weak model,
narrowed to 14 tools, chose a *current-state* tool for a *historical* question;
at 03:23 the strong model with all 145 chose the correct historical tool. One
pair is not proof — but the premise has never been measured, and it is the load-
bearing assumption under the entire routing layer.

**C3 · The experiment mutated its own instrument.** Every turn ran with
`basis=keyword` (the frame is dark, `router.frameRouting=0`), and
`stageTools.ts:517` learns *only* when `routeBasis==='keyword'` — i.e. exactly
today's configuration. Observed: `[ToolCache] Loaded 147` at 03:13 →
`Loaded 156` at 03:15; three turns each persisted 10 new keyword→category rows.
Two distinct problems:
- **(a) The arms are not independent.** Turn N's learning changes turn N+1's
  offered set. `"ganit"` was learned as `[employee]` at 03:25 (gemini) and as
  `[employee, factory]` at 03:36 (openai) — same word, different mapping, last
  writer wins. Any A/B run in this state has order effects.
- **(b) Guard gap: temporal vocabulary is being learned as domain signal.** The
  learned keys include **`dün`, `akşam`, `4-12`, `3-4-5`, `vardiyasında`**. The
  existing guards cover *broadness* (`LEARN_MAX_CATEGORIES`) and *metric vocab*
  (F156 `isMetricVocabWord`); neither covers time words. `dün → [employee]` means
  every future question containing "yesterday" pulls employee tools.

**C4 · Backend defects punish weak models disproportionately.** Two live
instances in a 23-minute window:
- `getShiftNotes` → `No content to map due to end-of-input` **three consecutive
  times** (ARMES-side deserialization failure, not CWF);
- `list_charts` → `Parent instance <User …> is not bound to a Session` (Superset
  SQLAlchemy failure).

Sonnet absorbed three consecutive errors and reached the right tool anyway;
gemini stopped after one thin search result. **A large part of the observed
"model quality" gap is resilience to backend failure** — and these are precisely
**ADR-010 outcome-failure signals**, now with recorded live instances to build the
per-tool trust model on.

**C5 · Attractive-nuisance tool shapes.** `getEmployeesDetail({})` returned
**6809 elements** (`STORED handle=res_1 sample=183`). A zero-required-argument
tool that dumps the entire personnel directory will be called by a weak model
with a budget to burn — and was.

**Also observed (not causes, but they distort any metric turn):**
`canonicalOEE=absent` on 4 of the 6 filtered turns vs `present` on both full-set
turns — canonical OEE tools are filtered out as uncategorized (GOV-4's own
comment), so a filtered metric question may be missing them entirely. And frame
extraction shows the F175 defect again: `object=VEHICLE entity_ref=[Granit Ham]
conf=AMBIGUOUS` (03:13), `object=EMPLOYEE entity_ref=[sırlama 3-4-5]` (03:36) —
a line name typed as an EMPLOYEE entity. Both were observation-only and steered
nothing (`frameRouting=0`).

## §4 · The recommendation — the instrument already exists
`ctx.labActive?.routingBypass` **already** gives a non-Anthropic provider the same
full sorted 145-tool set. A clean experiment is therefore a flag, not a build.

**Proposed M-C — same-question, same-action-space model comparison.** A 2×3
design: {gemini · openai · sonnet} × {filtered · bypass}, over a fixed question
set, with two preconditions that make it valid:
1. **Freeze keyword learning for the duration** (C3a), or every run contaminates
   the next. Without this the measurement is not a measurement.
2. **Record the offered-tool count per turn** as part of the result, so no arm's
   number can later be read without its action space.

M-C answers two questions for the price of one:
- *Which model actually handles this catalog better, holding tools constant?*
- **Does the relevance filter help or hurt weak models?** — the load-bearing
  architectural assumption that has never been measured, and the same class of
  question M-A just answered for the clarification gate.

## §5 · Honest limits on this note
- **n = 8 turns, 2 questions with all three arms.** Suggestive, not conclusive.
- The Architect read **tool traces, not answers.** Success/failure above is
  inferred from call patterns and output size; the owner's lived verdict remains
  the quality ground truth.
- Provider assignment to question was not randomized and the turns ran in
  sequence, so C3a order effects are present in this very sample.
- No claim is made that sonnet is or is not the better model. **The available
  data cannot support either claim** — that is the finding.

<!-- END · cwf-provider-arm-asymmetry-findings-v1 · 2026-07-26 · S66 -->
