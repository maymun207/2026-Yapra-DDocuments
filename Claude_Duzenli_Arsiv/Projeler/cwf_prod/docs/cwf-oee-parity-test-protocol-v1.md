# CWF — OEE Parity Test Protocol (Phase-F diagnosis validation)
**rev 1 · 2026-06-28 · run against the deployed app at HEAD `9ca5833` (GOV-4)**

## Objective
Empirically confirm or refute the **CP4 root-cause diagnosis** before building the Phase-F fix. The claim (code-verified): the canonical OEE tools (`getDailyOeeValues`, `getOeeValuesForZones`) are in **no** CP4 category, so for non-Anthropic providers the relevance filter drops them and offers the confusable wrong neighbors (`getMachineData`, `getPlannedOrderPlans`); Anthropic bypasses CP4 (full set) → succeeds. GOV-4's **routing-bypass** toggle now lets us give a non-Anthropic provider the full set too — the decisive, switchable experiment.

**Why now:** the Phase-F fix (make canonical metric tools CP4-exempt) is real code. If this test confirms CP4, Phase F is exactly scoped. If it refutes (full set ≠ success), the dominant cause is downstream (comprehension / CP11 / CP1-grain) and Phase F must be re-scoped. Better to know first.

## Hypothesis — the prediction matrix
If CP4 is the dominant cause, we expect:

| Provider | bypass **OFF** (today) | bypass **ON** (full set) |
|---|---|---|
| Anthropic (Sonnet) | ✅ succeeds (full set anyway) | ✅ succeeds — **control, no change expected** |
| OpenAI (GPT-4.1) | ❌ fails (filtered → wrong tool) | **✅ predicted success** ← decisive cell |
| Google (Gemini Flash) | ❌ fails (filtered) | **✅ predicted success** ← decisive cell |

The two **bypass-ON / non-Anthropic** cells are the decisive ones. Anthropic is the control: bypass should be a no-op for it (it already skips CP4).

## Controls (hold everything else fixed)
- **ARMES backend ON** (the OEE path). Superset state irrelevant here.
- **Fresh conversation per run** — no carried context that could help the model. 6 runs = 6 new chats.
- **One fixed query, verbatim, every run.** Proposed (adjust to the exact phrasing that failed before, then keep it identical across all 6):
  > **"KB7 fabrikası için bu haftanın OEE değerleri nedir?"**
- **Same role/auth** (your power_user/super_admin session — needed for the Lab toggle).
- **Lab toggle is the ONLY variable:** Routing bypass OFF vs ON. Leave knowledge-source = DB and preview-drafts = off for all runs (we are testing routing, not knowledge).
- **Force the provider** via your provider-override (`forceProvider`) the same way you ran the original 3-provider test.

**Two confounds to note, not fix:**
- **RBAC flakiness** — if a run hits `getFactoryLines → "User has no access to factory"`, that's the intermittent infra issue (F-c), **not** a routing signal. Mark the run `RBAC-FLAKE` and re-run it.
- **tool_category_cache warmth** — only affects the **bypass-OFF** runs (bypass skips the filter entirely, so ON runs are cache-independent and clean). Run the OFF runs first to reproduce the baseline; if an OFF run unexpectedly succeeds, note whether the cache had been warmed by a prior OEE query.

## The 6 runs
For each: new chat → set provider → set Lab routing-bypass → send the fixed query.

1. Anthropic · bypass **OFF**
2. Anthropic · bypass **ON** (control)
3. OpenAI · bypass **OFF** (reproduce the failure)
4. OpenAI · bypass **ON** ← **decisive**
5. Google · bypass **OFF** (reproduce the failure)
6. Google · bypass **ON** ← **decisive**

## What to capture per run (the tool-call sequence is the key datum)
1. **Tool-call sequence** — *which* tools the model actually called, in order. This is the primary evidence: with bypass ON, did the non-Anthropic model now call `getOeeValuesForZones` / `getDailyOeeValues` (canonical), or still grab `getMachineData` / `getPlannedOrderPlans` (wrong)? Capture from the **`telemetry_events`** ledger filtered by the run's `session_id` (it records tool executions), or server logs if easier. *(This is exactly the friction the parked OTel/Langfuse tracing removes — worth noting as a motivator for F-obs.)*
2. **Final answer** — verbatim (or "No response generated" / "asked which line?" / wrong number).
3. **Blind-spot check** — did it correctly treat IKINCILUST as barcodeless / "not visible in ARMES," **not** report it as zero?
4. **Outcome + failure mode** if it failed — one of: `WRONG-TOOL` · `NO-FINAL-MSG (CP11)` · `MIS-READ-SUCCESS (comprehension)` · `RBAC-FLAKE` · `WRONG-GRAIN (CP1)`.

## Results table — fill and paste back
```
Run | Provider  | Bypass | Tools called (in order)                 | Final answer (short) | Blind-spot ok? | Outcome
 1  | Anthropic | OFF    |                                         |                      |                |
 2  | Anthropic | ON     |                                         |                      |                |
 3  | OpenAI    | OFF    |                                         |                      |                |
 4  | OpenAI    | ON     |                                         |                      |                |
 5  | Google    | OFF    |                                         |                      |                |
 6  | Google    | ON     |                                         |                      |                |
```

## How to read the result (the decision tree)
- **Decisive cells (4 & 6) SUCCEED, and the tool trace shows the canonical OEE tool was called** → **CP4 confirmed** as the dominant cause. Phase F proceeds exactly as scoped: make the canonical metric tools CP4-exempt (always offered, like meta-tools) + reconcile the CP1 canonical tool. The bypass is the proof the fix will work.
- **Decisive cells reach the canonical tool but answer with the WRONG GRAIN** (e.g. `getDailyOeeValues` single-day vs the per-zone weekly `getOeeValuesForZones`) → CP4 is real **and** the CP1 canonical-tool mismatch is confirmed; Phase F must fix **both** (exempt + reconcile the canonical tool to the per-zone-weekly shape).
- **Decisive cells STILL FAIL even with the full set** (no-final-message / mis-read / wrong pick among all tools) → **CP4 is NOT the dominant cause.** The bottleneck is downstream comprehension / CP11. Phase F is **re-scoped**: prioritize CP11 (guaranteed final message) + prompt-encoded OEE tool-discipline over the CP4 exemption.
- **Anthropic (control) changes between OFF and ON** → unexpected; means bypass isn't a clean no-op for Anthropic — flag it, something else is coupled.

Run it, paste the filled table + the tool traces, and I'll read the verdict and lock (or re-scope) Phase F accordingly.
