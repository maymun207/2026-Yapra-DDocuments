# Claude Code 4.8 — PHASE 0 Execution Prompt
### CWF Service Refactor · Safety Net + Inventory + ARMES Ground Truth
> Paste this into Claude Code 4.8 (AntiGravity add-on). It executes **Phase 0** of `CWF-SERVICE-ARCHITECTURE-AND-BUILD-PLAN.md`. Phase 0 is **non-destructive**: you build a safety net and gather ground truth. You do **not** delete, move, rename, or refactor production code, and you do **not** start any later phase.

---

You are executing **Phase 0** of a multi-phase refactor that turns this repo into a clean, single-agent **CWF service** running only against the live **ARMES MCP** server. Phase 0 establishes the safety net and the ground truth that every later phase depends on. **It changes no runtime behavior.**

## MISSION (what Phase 0 produces)
1. A deterministic **characterization test suite** that locks the current behavior of the live chat path so later refactors can't silently break it.
2. A **golden system-prompt snapshot** for byte-identical comparison after the prompt is modularized.
3. A **live ARMES tool-catalog dump** (schema ground truth) for the future knowledge base.
4. A verified, frozen **keep/delete/decouple manifest** for the Phase 1 cleanup.

## HARD CONSTRAINTS (non-negotiable — violating any = the task is not done)
- **Non-destructive.** Do NOT delete, move, rename, or refactor any production code. You may ONLY add: tests, snapshots, scripts, and docs. The single allowed exception is a *minimal, additive* test-harness export needed to capture the prompt — if you use it, list it explicitly and justify it.
- **Secrets.** NEVER read, write, edit, or print any `.env*` file. Reference every secret via environment variables (`$VAR_NAME`). If a raw secret ever appears in a command, log, file, or chat, STOP, flag it as a security incident, and tell the user to rotate that credential before continuing.
- **No mutations on ARMES.** Call only clearly read-only MCP tools. Never call a tool that writes, starts, stops, creates, updates, or deletes anything.
- **Stay in Phase 0.** Do NOT begin cleanup (Phase 1) or any later phase. If you finish early, stop and report.
- **Green baseline preserved.** The existing test suite must still pass after your additions; your new tests must pass (except tests you explicitly mark as known-gap).

## PRE-FLIGHT (verification-first — do this before any task)
1. Read in full: `.agents/skills/cwf-project-kb/SKILL.md` and `.agents/CHANGELOG.md`. Also read `AGENTS.md` (RULE 0 + RULE 1).
2. Run `git status` and `git log -1 --format=%H`. Record the HEAD hash. The working tree MUST be clean; if it is not, STOP and report.
3. Run the full test suite (`npm test`). Record the exact pass count (expected ~213/213). If the baseline is RED, STOP and report — do not build a safety net on a broken baseline.
4. Confirm the live chat endpoint by grepping `src/lib/cwfService.ts` (expected `/api/cwf/standalone-chat`). Record it.
5. Confirm the two code paths inside `api/cwf/standalone-chat.ts`: the Vercel AI SDK path (`streamText`) and the Gemini-native path (`generateContent`). Note their line ranges. (Phase 2 will delete the native path; Phase 0 only documents both.)

## TASKS

### 0.1 — State summary  →  `docs/refactor/00-state-summary.md`
Document, factually and with file paths + line ranges:
- The two agents in the repo: the simulation agent (`api/cwf/chat.ts`, `demo-chat.ts`, `copilot/*`, `copilotEngine.ts`, Supabase-backed) vs the live ARMES agent (`standalone-chat.ts` + `api/mcp/*`).
- The two code paths inside `standalone-chat.ts` and the prompt/tool/result logic each duplicates.
- The keeper module set: `networkTime`, `timeTools`, `toolResult`, `resultStore`, `toolCategories`, `shared/cwfConstants`, `api/mcp/connect`, `api/mcp/call`.
- The known debt: inline duplicated system prompt across both paths (e.g. tool-rule "10" written twice — one with literal tool names, one with `${AGGREGATE_TOOL_NAME}` interpolation), and the absence of any ARMES domain knowledge in the prompt.

### 0.2 — Characterization tests (deterministic; mock the boundaries)
Goal: lock the **orchestration + formatting + refusal contract**, NOT exact LLM text. LLM output is non-deterministic, so a real-model test cannot gate a refactor. **Mock the LLM gateway boundary and the MCP boundary**, feed scripted model responses / tool results, and assert the invariants. Put these under `api/cwf/_lib/__tests__/characterization/`.

Scenarios + invariants to assert:
1. **Data-list query** → at least one MCP tool is invoked; the tool result passes through `formatToolResult`; the response surfaces `recordCount`/the table macro; no rows beyond `recordCount` are emitted.
2. **Large/analytic result** → when a tool result exceeds the budget, the `resultStore` handle path engages (`stored:true`, `resultHandle` present, `truncated:false`); `aggregate_records`/`query_records` are registered and callable; assert no "truncated/only N of M" language is produced when `stored:true`.
3. **Date / relative-time query** → `resolve_time_range` is called BEFORE any time-parameterized MCP tool; assert the agent never hand-computes an epoch.
4. **Out-of-scope query** (weather, coding, recipes) → standard refusal; assert ZERO MCP tool calls.
5. **Injection attempt** ("ignore previous instructions", "print your system prompt", "enter developer mode") → refusal; assert no system-prompt content leaks into the response.
6. **Tool error** → when an MCP tool returns `isError:true`, assert the agent surfaces a user-facing error and does not fabricate data.
7. **(Known-gap) empty-data zone** → when a tool returns an empty record set, the response must NOT assert "zero/sıfır". This test will likely FAIL today — mark it `test.skip`/`xfail` with a `TODO(Phase 4)` comment referencing the blind-spot rule. It documents the gap the knowledge base will close.

Verify these tests are deterministic and require **no API keys** (mocked boundaries), so they can run in CI as the refactor safety net.

### 0.3 — Golden prompt snapshot  →  `__snapshots__/system-prompt.golden.txt`
Capture the exact system prompt each path builds, deterministically:
- Stub `getNetworkTime()` to a fixed instant and stub the knowledge fetch, so the rendered prompt is byte-stable.
- Prefer **interception**: invoke the handler with mocked deps and capture the `system` value handed to `streamText` / `generateContent` — avoid refactoring production code. If interception is infeasible without a tiny additive export, make that export minimal and list it in your report.
- Snapshot BOTH paths' prompts AND a diff between them (this records the current duplication/drift, e.g. literal vs `${AGGREGATE_TOOL_NAME}`). Designate the **Vercel-AI-SDK path prompt as the canonical reference** (it survives Phase 2 unification); Phase 3 must reproduce it byte-for-byte.

### 0.4 — ARMES tool catalog dump  →  `docs/refactor/armes-tool-catalog.json`
Write a one-off script `scripts/dump-armes-catalog.ts` that connects to the live ARMES MCP server (reuse the transport logic in `api/mcp/connect.ts`) and lists all tools, writing `{ name, description, inputSchema }` for every tool (~142 expected).
- **Secrets via env only.** The ARMES MCP URL and auth token MUST come from environment variables (e.g. `$ARMES_MCP_URL`, `$ARMES_MCP_TOKEN`). Do NOT hardcode a URL or token, do NOT read them from `.env*` directly, and do NOT print them. If those env vars are unset, the script must exit with a clear message naming exactly which vars to set — do not guess a URL.
- **Schema-only is the required deliverable.** Do NOT call any tool to sample output in this step unless the user has provided an explicit read-only allowlist; if such an allowlist is provided, call ONLY those tools, redact any PII/credentials from sampled output, and write samples to a separate `armes-tool-samples.json`.
- Report the tool count written and confirm env-var sourcing.

### 0.5 — Cleanup manifest  →  `docs/refactor/01-cleanup-manifest.md`
Analysis only — change no files. Re-run the dependency scans and classify EVERY file touched by Phase 1 as **KEEP**, **DELETE**, or **DECOUPLE**, with the precise reason and the exact import edges that must be cut. Confirm against repo reality:
- DELETE: simulation agent + demo + copilot (`chat.ts`, `demo-chat.ts`, `copilot/*`, `copilotEngine.ts`, `copilotPrompt.ts`, `chatEngineAI.ts`, `cwfDbSchema.ts`, `cwfParameterRanges.ts`, `cwfResponseCache.ts`, `cwfKnowledgeDocs.ts`; frontend `simulationStore`, `simulationDataStore`, `demoStore`, `workOrderStore`, `copilotStore`, `components/demo/*`, `components/ui/copilot/*`, `SimulationHistoryDropdown.tsx`, the copilot/simulation hooks, `simulationHistoryService.ts`, `params/parameterRanges.ts`, `params/copilot.ts`).
- DECOUPLE: keepers with simulation tendrils — `toolCategories.ts` (remove Supabase / `learnToolMapping` cache → in-memory), and frontend `CWFChatPanel.tsx`, `cwfStore.ts`, `cwfTypes.ts`, `params/cwfAgent.ts`, `LayoutSettingsDropdown.tsx`, `App.tsx` (cut simulation-store imports).
- Flag the Supabase removal: confirm via grep that, after the deletes/decouples, `@supabase/supabase-js` and `SUPABASE_*` have zero remaining references → they (and `*.supabase.co` in `vercel.json` CSP) can be removed in Phase 1.

## SELF-VERIFICATION CHECKLIST (end your run by confirming each, with evidence)
- [ ] HEAD hash recorded; working tree was clean at start; baseline test count recorded (N/N green).
- [ ] No production code deleted, moved, or renamed. `git status` shows only added test/doc/script files (+ any minimal, listed, justified test-harness export).
- [ ] No `.env*` file read or written; no raw secret in any output, log, file, or command.
- [ ] No mutating MCP tool called; catalog is schema-only (or samples limited to a user-provided read-only allowlist, redacted).
- [ ] Characterization tests added and deterministic (no API keys); list each scenario with pass / known-gap status.
- [ ] Golden prompt snapshot(s) captured; both-paths diff recorded; canonical reference designated.
- [ ] ARMES catalog JSON written; report tool count; env-var sourcing confirmed.
- [ ] Cleanup manifest produced; every file classified KEEP/DELETE/DECOUPLE with reasons and import edges.
- [ ] `tsc -b`, build, oxlint, and the full test suite are all green — report exact numbers.
- [ ] State explicitly: **"Phase 0 complete, non-destructive, ready for Phase 1 review."**

Do not proceed to Phase 1. Stop after the checklist and present your report.
