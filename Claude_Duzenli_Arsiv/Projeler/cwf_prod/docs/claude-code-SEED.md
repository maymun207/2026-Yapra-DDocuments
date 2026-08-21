# Claude Code 4.8 — SEED Prompt
### New CWF Service repo · curated keeper-copy · simulation-free · build-green
> Run this with Claude Code 4.8 (AntiGravity add-on) **from inside the new, empty local folder you just opened**. It seeds a clean CWF service repo by copying ONLY the keeper files from the old repo (used as a read-only donor), with a fresh git history. Scope is SEED ONLY — no `_core/` restructure, no Supabase Foundation work, no agent refactor. Those are later steps.

---

You are seeding a brand-new repository for the **CWF service** in the current working directory (assume it is empty or nearly empty). The goal is a clean, compiling, **simulation-free** codebase containing only the live ARMES-MCP agent and its supporting modules — NOT a clone of the old repo.

## CORE PRINCIPLE
The new repo is **NOT** a clone of the old one. The old repo is used **only as a read-only donor**: we clone it into a throwaway reference directory, copy curated keeper files out of it, then discard the reference. The new repo gets a **fresh `git init`** (no old history). Anything related to the digital-twin **simulation, virtual factory, demo, or copilot must never enter** the new repo.

## HARD CONSTRAINTS (non-negotiable)
- **Donor is read-only.** Never commit, modify, or push to the old repo. Clone it to a sibling reference dir OUTSIDE this repo (e.g. `../_cwf-old-donor`); never place it inside the new repo and never add it to git.
- **Secrets.** NEVER read, write, or print any `.env*` file containing real values. Produce only `.env.example` with placeholders. Reference all secrets via `$VAR_NAME`. If any raw secret appears anywhere, STOP and flag it.
- **No copy of the exclude set.** The simulation/demo/copilot/Drive files listed below must NOT be copied. Do not copy them and then delete — never bring them in.
- **Stay in SEED scope.** Do NOT create the `_core/` layered structure, do NOT do Supabase Foundation work (auth/migrations/telemetry), do NOT refactor the agent. Keepers are copied in their CURRENT structure. Cleaning = cutting simulation tendrils until the build is green, nothing more.
- **Definition of done = green.** `tsc -b`, `vite build`, `oxlint`, and `vitest` must all pass before you finish.

## PRE-FLIGHT
1. Confirm cwd is the new empty folder. Run `git status` — if it is already a git repo with history, STOP and ask.
2. Clone the donor read-only into a sibling dir: `git clone --depth 1 https://github.com/maymun207/CWF-DEMO.git ../_cwf-old-donor` (ensure the repo is accessible — public or your `gh` auth). Record the donor HEAD hash.
3. `git init` in the current directory (fresh history). Create a sensible `.gitignore` (node_modules, dist, .env*, .vercel, the donor dir path if relative).

## EXCLUDE SET — never copy these from the donor
**Backend (simulation agent + demo + copilot + Drive KB):**
- `api/cwf/chat.ts`, `api/cwf/demo-chat.ts`
- `api/cwf/_lib/chatEngineAI.ts`, `copilotEngine.ts`, `copilotPrompt.ts`
- `api/cwf/_lib/cwfDbSchema.ts`, `cwfParameterRanges.ts`, `cwfResponseCache.ts`, `cwfKnowledgeDocs.ts`
- `api/cwf/copilot/` (entire directory)

**Frontend (simulation stores / demo UI / copilot UI):**
- `src/store/simulationStore.ts`, `simulationDataStore.ts`, `demoStore.ts`, `workOrderStore.ts`, `copilotStore.ts`
- `src/components/demo/` (entire directory)
- `src/components/ui/copilot/` (entire directory)
- `src/components/ui/cwf/SimulationHistoryDropdown.tsx`
- `src/hooks/useCopilotHeartbeat.ts`, `useCopilotLifecycle.ts`, `useCWFCommandListener.ts`
- `src/services/simulationHistoryService.ts`
- `src/lib/params/parameterRanges.ts`, `src/lib/params/copilot.ts`
- All tests of the above (`**/__tests__/*` for: copilotStore, demoStore, stubStores, useCWFCommandListener, simulationHistoryService, copilotParams)
- `test-parse-data.js` (scratch file)

**Everything else in the donor is copied.** (Copy-all-except-exclude is deliberate: any leftover simulation import inside a kept file will break the build, which is your signal to cut that tendril.)

## TASKS

### S1 — Curated copy
Copy the donor tree into the new repo **excluding the EXCLUDE set above**. Preserve directory structure. Do not copy `.git`, `node_modules`, `dist`, `.vercel`, lockfile-only artifacts you'll regenerate, or the donor's git metadata.

### S2 — Decouple kept files until the build is green
These kept files import or reference the removed simulation modules — cut those edges (remove the imports, the dead branches, the sim-only props/state) so they compile and do something sensible for a chat-only service. Do not add new features; just remove simulation coupling.
- `src/App.tsx` — remove simulation/demo/copilot mounts; keep CWF chat shell + MCP settings + login.
- `src/components/ui/CWFChatPanel.tsx`, `src/components/ui/cwf/LayoutSettingsDropdown.tsx` — remove sim-store imports/usage.
- `src/store/cwfStore.ts`, `src/store/uiStore.ts` — remove sim-coupled state/actions.
- `src/lib/types/cwfTypes.ts`, `src/lib/params/cwfAgent.ts`, `src/lib/params/index.ts` — remove sim-only types/params/exports.
- `api/cwf/_lib/toolCategories.ts` — leave its Supabase usage AS-IS for now (it points at env vars; the new-project repoint happens in the Foundation step). Just ensure it compiles.
- Tests of decoupled files (`cwfStore.test`, `uiStore.test`, `mcpStore.test`, `hooks.test`, etc.) — remove assertions that referenced removed modules so the suite passes; keep the rest.

### S3 — Rename the endpoint to the canonical name
The donor's live agent is `api/cwf/standalone-chat.ts` and the old `chat.ts` (simulation) was excluded, so `chat.ts` is now free. Rename `standalone-chat.ts` → `api/cwf/chat.ts` and update the two references:
- `src/lib/cwfService.ts` — fetch URL `/api/cwf/standalone-chat` → `/api/cwf/chat`.
- `vercel.json` — function key `api/cwf/standalone-chat.ts` → `api/cwf/chat.ts`.

### S4 — Prune config + routing
- `vercel.json` — remove `api/cwf/chat.ts` (old sim) and `api/cwf/demo-chat.ts` function routes; keep the renamed chat route + `api/mcp/connect.ts` + `api/mcp/call.ts`. Keep CSP `connect-src` entries for `https://armes-api.ardich.com` and `https://*.supabase.co` (both are needed by the CWF service). Update any `maxDuration` keys to match the new filenames.
- `package.json` — set `"name": "cwf-service"` (or the name I provide). Do NOT prune dependencies yet by guessing; see S6.
- `.env.example` — rewrite for the CWF service only: Gemini/OpenAI/Anthropic keys, the NEW CWF Supabase (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`), ARMES MCP (`ARMES_MCP_URL`, `ARMES_MCP_TOKEN`), and the existing auth placeholders. Remove any simulation-only variables. Placeholders only — no real values.
- Replace the Vite-template `README.md` with a short, real README describing the CWF service (what it is, stack, how to run, env vars).

### S5 — Carry origin docs
- Keep `.agents/AGENTS.md`, `.agents/CHANGELOG.md`, `.agents/skills/cwf-project-kb/SKILL.md`.
- Create `docs/` and place the architecture document there as `docs/ARCHITECTURE.md` (I will provide its contents — leave a clearly-marked placeholder if not yet supplied).
- In `AGENTS.md`, append a note: this repo is the clean CWF service seeded from the old `CWF-DEMO` donor at donor-HEAD `<hash>`; simulation/demo/copilot intentionally absent.

### S6 — Verify, prune deps, commit
1. `npm install`, then `tsc -b`, `vite build`, `oxlint`, `vitest run`. Iterate until ALL are green.
2. **Now** prune dependencies: detect packages with zero references in the kept tree (e.g. via `npx depcheck` or import-grep) and remove only those from `package.json` (likely candidates if unused: `googleapis`, one of the two Google SDKs, sim-only chart libs — but REMOVE ONLY what analysis proves unused). Re-run build + tests after pruning; they must still be green.
3. `grep -ri` the tree for any leftover references to: `simulation`, `simulationId`, `demo-chat`, `copilot`, `workOrder`, `scenario`, `SCN-00`. Expected: zero (outside historical text in CHANGELOG). Report findings.
4. Initial commit: `feat: seed clean CWF service from CWF-DEMO donor (simulation-free)`.

## SELF-VERIFICATION CHECKLIST (end your run by confirming each, with evidence)
- [ ] cwd was empty/non-git at start; donor cloned to a sibling read-only dir; donor HEAD hash recorded; donor NOT inside the new repo or git.
- [ ] Fresh `git init`; the new repo has its OWN first commit, NOT the donor's history.
- [ ] No file from the EXCLUDE set exists in the new repo.
- [ ] No `.env*` with real values created; `.env.example` has placeholders only; no raw secret anywhere.
- [ ] Endpoint renamed to `/api/cwf/chat`; `cwfService.ts` + `vercel.json` updated.
- [ ] `grep` for simulation/demo/copilot/workOrder/scenario returns zero hits (outside CHANGELOG history).
- [ ] `tsc -b`, `vite build`, `oxlint`, `vitest run` ALL green — report exact numbers.
- [ ] Dependencies pruned only where proven unused; build still green after prune; list what was removed.
- [ ] Docs carried (`AGENTS.md`, `CHANGELOG.md`, skill, `docs/ARCHITECTURE.md` placeholder).
- [ ] State explicitly: **"SEED complete — clean CWF service repo, simulation-free, build green. Ready for the Supabase Foundation step."**

Do not start the Foundation, the `_core/` restructure, or any agent refactor. Stop after the checklist and present your report, including the final file tree.
