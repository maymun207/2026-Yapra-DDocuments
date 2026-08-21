# Context Bootstrap — Session 2026-06-02 (afternoon)

> **Purpose:** Resume the senior-architect / single-author role in a fresh session without re-deriving state. Read this + the project bootstraps (`context_bootstrap.md`, `context_boostrapt_combo_prj.md`, `phase_0_runbook.md`) + this doc, then continue from the **NEXT ACTION** at the end.
> **Predecessor bootstrap:** `context_bootstrap_session_2026-06-02.md` (morning)
> **Session window covered:** 2026-06-02 ~05:40 → ~14:30
> **Author:** Claude · single-author of stage prompts (§5 invariant of dev_schedule)

---

## 1. Where we are

**Phase D0.6 (program command center / governance portal) is COMPLETE.** All four D0.6 stages merged. `/phase0` is a fully functioning governance portal: 25 cards, Supabase auth, role-gated approve/block, live status badges (🟢/🔴/🟡), per-item detail route with document rendering and audit history.

**Phase D0.7 (TheBluePrint23 finalization) is IN PROGRESS.** This group exists because a **CTO review** surfaced three gaps before sign-off. The honest framing: "Phase D0 closed" was declared prematurely after D0.6d — the **CTO sign-off is the real close gate**, and D0.7 is the work that earns it. The three gaps:
1. **Big picture had drifted from canonical** — the `/` tab rendered a card-based simplification instead of the actual two-plane architecture diagram Maymun authored in `03_bridge`. **FIXED in D0.7a.**
2. **No document hub** — the team couldn't read source docs (runbook, ADRs, charter, schedules) inside the tool. **D0.7b written, handed to AG, awaiting execution.**
3. **No resource allocation view** — nothing surfaced engineer-hours, team capacity, or the 3+3→1+5 transition trigger. **D0.7c is the next stage to write.**

**The governing principle established this session (important):** TheBluePrint23 should **re-implement only where interactivity earns it; serve canonical source everywhere else.** The big picture drifted precisely because it was re-implemented as React data instead of served as the canonical HTML. Interactive deep-dives, governance, language toggle → re-implement in React. Documents the team reads top-to-bottom → serve the canonical file directly (zero drift). This is why D0.7a/D0.7b serve HTML via iframe rather than rebuilding.

**Repository topology (unchanged from morning):**
- `maymun207/TheBluePrint23` — the UI app (Next.js 15 / React 19 / TS / Tailwind, Vercel at `theblueprint23.dev`).
- `agbuilder-platform/revolutionize` — source-of-truth document store. Now also holds the **library documents** (see §4). Fetched via GitHub API with fine-grained PAT (`GITHUB_PAT`).
- Supabase — `oapvuepmkaoglfjnjayk.supabase.co`. **Critical drift correction from D0.6b:** the working env var is `NEXT_PUBLIC_SUPABASE_ANON_KEY` (legacy JWT anon key), NOT `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` / `sb_publishable__...`. The `sb_publishable__` format is NOT supported by Supabase SDK v2. Any future Supabase work uses the ANON_KEY name.

---

## 2. D0.6 + D0.7 stages completed this session

| Stage | What | Merge SHA | Status |
|---|---|---|---|
| D0.6b | Supabase auth: profiles table, user_role enum, RLS, triggers, login/signup, UserMenu | `4a37172` | ✅ (+4 hotfixes) |
| D0.6c | `phase0_approvals` schema (immutable log) + live status badges + SHA-aware stale detection | `ef3cc74` | ✅ |
| D0.6d | `/phase0/[itemId]` detail route + role-gated approve/block + react-markdown + audit history | `074485b` | ✅ (+2 hotfixes) |
| D0.7a | Big picture hero serves canonical `03_bridge` HTML via iframe (`DocumentFrame` precursor `BigPictureFrame`) | `b0958e8` | ✅ (+1 fix) |

**D0.7b** — Document hub (Library). Prompt written (`D0_7b-document-hub-library.md`), library manifest committed, all 13 docs in repo. **Handed to AG — awaiting execution as this session ends.**

---

## 3. Hard-won lessons / Pattern Library additions this session

- **Pattern #30 CORRECTED:** Supabase publishable-key concept is right (safe to expose) but the env var name + key format differ by SDK version. Verify against the installed SDK, not Supabase marketing docs. The working value is `NEXT_PUBLIC_SUPABASE_ANON_KEY` (legacy JWT).
- **Pattern #33:** Any server component reading Supabase session (`supabase.auth.getUser()`) must call `noStore()` first, else it's statically cached and shows stale auth state after login.
- **Pattern #34:** After sign-in, force a hard navigation (`window.location.href`) — `router.push()` preserves client cache and server components don't re-render, leaving auth state stale.
- **Pattern #35 (NEW, critical):** Component-deletion safety. Before deleting a component, `grep -rl "ComponentName" app/` across the ENTIRE app/ tree (all subdirectories, not just routes). D0.7a deleted `LoopDiagram` as "big-picture-only" but `BridgeOverview.tsx` (a deep-dive tab) imported it — a route-scoped grep missed it. This is now a hard Step 0 gate in any stage that deletes.
- **Auth layer was the highest-hotfix area of D0** (6 hotfixes across D0.6b + D0.6d). Root cause: prompt author lacked firsthand Next.js 15 server-component + Supabase Auth + Vercel CDN caching experience. Patterns #30–#34 are the output. Apply the auth standing-criteria template to any future auth-touching stage.
- **iframe height-sync pattern (D0.7a, reused D0.7b):** self-contained HTML in an iframe doesn't auto-size; append a postMessage height-reporter shim AT RENDER TIME (never modify the canonical repo file). Use `sandbox="allow-scripts"` WITHOUT `allow-same-origin` (runs embedded scripts in null origin, safe; postMessage still works cross-origin).

---

## 4. Library setup — DONE this session (repo state confirmed via screenshots)

The library documents are committed to `agbuilder-platform/revolutionize`. All 13 manifest paths verified resolving:

```
adrs/ADR-001-litellm-llm-gateway.md
adrs/ADR-002-mcp-external-tool-protocol.md
docs/architecture/01_revolutionize_architecture.html
docs/architecture/02_eaip_architecture.html
docs/architecture/03_bridge_revolutionize_builds_eaip.html   ← already serving on /
docs/architecture/04_eaip_connectivity.html
docs/architecture/05_revolutionize_connectivity.html
docs/architecture/06_eaip_schedule.html
docs/architecture/07_revolutionize_schedule.html
docs/architecture/08_leadership_charter_bilingual.html
docs/architecture/ARDICTECH_Platform_v6_SSoT_bilingual.html
docs/library/manifest.json                                    ← library manifest (13 docs, 4 categories)
docs/library/dev_schedule_patch_v1.md
docs/library/phase_0_runbook.md
```

Folder names are consistently lowercase (`architecture`, `library`, `phase0`). The library manifest is separate from the Phase 0 governance manifest (`docs/phase0/manifest.json`) — both are named `manifest.json` but in different folders. The 4 library categories: Architecture / Schedules / Decisions / Process.

**Expected D0.7b Step 0 result:** availability map 13/13 resolved, 0 × 404.

---

## 5. D0.7c — Resource Allocation (NEXT STAGE TO WRITE)

The last build stage of the D0.7 finalization group. Maymun confirmed he wants **BOTH** halves in one dashboard:

**(a) Quantitative — engineer-hours by role.** Extracted + LOCKED this session from `06_eaip_schedule.html` (do NOT re-extract; use these canonical numbers in the prompt):

| Role | Hours | Share |
|---|---|---|
| AI Eng | 6,380 | 52.9% |
| Data Eng | 2,440 | 20.2% |
| Backend | 2,180 | 18.1% |
| DevOps | 740 | 6.1% |
| Frontend | 320 | 2.7% |
| **Total** | **12,060** | 100% |

Headline insight for the CTO: **AI Engineering is >half the entire EAIP effort** — validates ML/AI-eng as the load-bearing role and frames the 3+3→1+5 transition (freed Revolutionize engineers flow into AI-heavy CWF/Astra work).

**(b) Qualitative — team structure + transition contract.** The 3+3→1+5 transition trigger lives in runbook A7. The source doc `a7-resource-allocation.md` IS committed in the repo at `docs/phase0/a7-resource-allocation.md` — read it in D0.7c Step 0 for the exact transition trigger conditions. Team structure (6 engineers across Takım-1/Takım-2 + CTO + Maymun) is in runbook §1.

**D0.7c design notes:**
- Resource data is NOT in `app/_data/` yet (schedule stages deliberately extracted only timeline + component counts, no hours/roles — confirmed by reading D0.3e + D0.5b prompts). D0.7c embeds the role table above as canonical typed data + reads `a7-resource-allocation.md` for the transition contract.
- New `/resources` route (or fold into an existing schedule tab — decide in the prompt). A 10th nav tab risks overflow — coordinate with whatever D0.7b's nav-overflow Step 0 reports about the 9th tab.
- Surface the A7 contract as a readable doc link into the Library (`runbook` doc already there).
- Likely M–L size.

**After D0.7c + CTO fidelity pass, TheBluePrint23 is review-ready and the D0.7 finalization group closes.** Fidelity verification needs no dedicated stage — once D0.7b serves canonical HTMLs alongside the interactive React tabs, the tool itself is the verification surface (CTO compares tab vs canonical side-by-side; drift → small patch stage).

---

## 6. The bigger map (so the next session keeps perspective)

Two tracks, distinct:
- **TheBluePrint23 (the web tool)** — D0.x stages. Finishing now via D0.7. This is "A" in Maymun's framing.
- **Revolutionize platform (service code)** — Phase 1 stages, target repo `agbuilder-platform/revolutionize/services/`. This is "B". 42 stages total; Stage 1.1.1 (telemetry event schema) is WRITTEN (`Stage_1_1_1-telemetry-event-schema.md`) but NOT yet started — it waits until "A" (the tool) is finalized and CTO-signed-off. Maymun's explicit order: finalize A, then B.

Stage 1.1.1 specifics already decided: CTO-gated merge (schema is first-pass draft, CTO redline is the acceptance gate); target `services/telemetry/`; Pydantic v2 + TS mirror; calibration stage for the Phase 1 styleguide.

CWF to Kale Seramik (the absolute top business priority) runs on EAIP, not the Revolutionize phase sequence, and has ZERO stage prompts written — flagged for a dedicated scoping session but deferred behind tool finalization.

---

## 7. Working invariants (unchanged)

- Single-author rule: Claude is sole author of stage prompts. Maymun is Conductor; AG (Antigravity) is sole execution surface (filesystem/git/PR/deploy).
- 13-field prompt template. Prompts describe OUTCOMES the agent produces, never operator keystrokes (Pattern #11). Three-author lessons.md (AG self-report + Operator review + Claude retrospective); AG will NOT self-grade reliably.
- Prompt size targets: XS 150–200, S 200–300, M 300–400, L 400–500+ lines (L stages run longer when the implementation code in §3 is load-bearing — D0.6d/D0.7b ran ~600/~400 and that was justified).
- Outputs copied to `/mnt/user-data/outputs/` before `present_files`.
- Bilingual convention: all prose in EN + TR; technical identifiers stay as-is.
- Maymun communicates concisely, momentum-oriented, defers format to Claude's judgment. Prefers to experience pipeline gates live.
- Six non-negotiable AG operating rules: no `.env` access, BLOCKED-not-false-success, exact identifiers only, cross-phase verification, no raw secrets, additive-over-destructive.

---

## NEXT ACTION

Maymun is handing `D0_7b-document-hub-library.md` to AG (or has just done so). When AG returns the D0.7b PR:

1. **Verify Step 0 availability map = 13/13 resolved, 0 × 404.** If any 404, it's a path mismatch in the manifest — fix the one `file` line and re-run.
2. **Verify the `BigPictureFrame` grep returned exactly `app/page.tsx`** before deletion (Pattern #35).
3. **Check the 9th nav tab overflow report** at 375/768/1024/1366/1440px. If it overflows, write a small `D0.7b.1` nav patch — do NOT accept AG truncating labels or hiding the tab.
4. After D0.7b merges + lessons.md, **write D0.7c (Resource Allocation)** using the LOCKED role table in §5 (do not re-extract) and reading `docs/phase0/a7-resource-allocation.md` in its Step 0 for the transition contract.
5. After D0.7c + CTO fidelity pass → **D0.7 closes, tool is review-ready.** Then the conversation shifts to "B" (Revolutionize Phase 1, starting with the already-written Stage 1.1.1) — but only on Maymun's signal.

Do NOT re-explain this doc unless asked. Resume as senior full-stack architect, single-author.
