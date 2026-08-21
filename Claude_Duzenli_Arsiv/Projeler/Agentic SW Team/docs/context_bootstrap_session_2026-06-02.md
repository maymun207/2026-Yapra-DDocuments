# Context Bootstrap — Session 2026-06-02

> **Purpose:** Resume the senior-architect / single-author role in a fresh session without re-deriving state. Read this + the project bootstraps + the latest prior bootstrap, then continue from the **NEXT ACTION** at the end.
> **Predecessor bootstrap:** `context_bootstrap_session_2026-06-01_afternoon.md`
> **Session window covered:** 2026-06-01 evening → 2026-06-02 ~05:40
> **Author:** Claude · single-author of stage prompts (§5 invariant of dev_schedule)

---

## 1. Where we are

**Phase D0 (TheBluePrint23 architecture visualization) is fully complete.** TheBluePrint23 has reached V0 UI completeness: all 8 architecture routes live, both architecture pages interactive (click-to-detail), Gantt bar charts rendered for EAIP + Rev schedules, Charter completed with Skill/Kick/Opens sections, full EN/TR bilingual coverage including 70 EAIP component descriptions translated.

**Phase D0.6 (program command center — TheBluePrint23 evolved from read-only visualization into governance portal) is now in progress.** This is the architectural pivot of the session: TheBluePrint23 is no longer just architecture docs; it is the single command center for the entire program. `/phase0` is the first governed section; future `/phase1`, `/cwf-delivery` etc. follow the same pattern. Auth is no longer deferred — Supabase is in scope now because the governance use case requires authentication and persistent state.

**Repository topology established:**
- `maymun207/TheBluePrint23` — the UI app (Next.js 15 / React 19 / TypeScript / Tailwind, deployed to Vercel at `theblueprint23.dev`).
- `agbuilder-platform/revolutionize` — the source-of-truth document store (private GitHub repo under a new GitHub Organization `agbuilder-platform`, migrated from Maymun's personal account this session). Contains `docs/phase0/manifest.json` + 25 Phase 0 stub files (7 Track A + 15 Track B + 3 Track C). TheBluePrint23 fetches the manifest via GitHub API at request time using a fine-grained PAT.
- Supabase project — `https://oapvuepmkaoglfjnjayk.supabase.co`, publishable key `sb_publishable__hXyDTgwFYlmZNPIZsFQ_g_jDSOHWyU` (publishable keys are safe to expose; RLS protects data). Auth tables come in D0.6b.

**Critical context drift that surfaced this session:** AG used the OLD repo path `maymun207/revolutionize` in D0.6a's code despite the prompt explicitly specifying `agbuilder-platform/revolutionize`. The page works only because GitHub auto-redirects after a repo transfer — brittle, bypasses the org boundary, must be fixed. D0.6b folds in the patch.

---

## 2. D0.5 stages completed this session

All five D0.5 stages merged in order during 2026-06-01 evening → 2026-06-02 early morning:

| Stage | What | PR | Status |
|---|---|---|---|
| D0.5a | Revolutionize Architecture click-to-detail (inline expansion) | #17 → `dd5f284` | ✅ merged |
| D0.5b | Visual Gantt bar charts (Rev + EAIP) | #18 | ✅ merged |
| D0.5c | Detail panel + Gantt legend i18n labels | #19 | ✅ merged |
| D0.5d | Charter deferred sections (Skill Map, Kickoff Sequence, Open Items) | #20 | ✅ merged |
| D0.5e | EAIP component TR translation pass (70 components, 6 with empty notes) | #21 | ✅ merged |

After D0.5e: TheBluePrint23 hit V0 UI completeness. Auth was still deferred at that point — the governance pivot happened next.

---

## 3. The D0.6 pivot (mid-session architectural decision)

When I asked about Phase 0 prerequisites status before writing the first D1 stage, Maymun surfaced a critical gap: *"all these documents should be available on this web application, then CTO should login then access these documents, then he reviews these documents, then marks it as approved or not approved."* TheBluePrint23 was built as a read-only visualization tool with no auth, no state, no write operations. The user's mental model required all three.

I presented two paths:

- **Option A** — Keep TheBluePrint23 as architecture visualization only. Phase 0 governance lives elsewhere (GitHub PRs as approval mechanism, Linear/Notion for tracking). Simple, no auth needed.
- **Option B** — Evolve TheBluePrint23 into the program command center. `/phase0` is the first governed section, sets the pattern for all future phases. Requires auth + state storage now.

**Maymun chose Option B.** This is the load-bearing decision of the session. Auth moved from "V1.1 deferred" to **D0.6b required**. Supabase Auth is the chosen stack (matches the user's pre-existing context with Supabase).

**Document storage decision:** GitHub repo (`agbuilder-platform/revolutionize`) is the source of truth, fetched at runtime via API. Justification: documents can be any format (PDF, markdown, SVG), GitHub gives versioning + diff history for free, the repo and its PR workflow are the natural place for engineers to produce docs.

**Role model:** Three roles in a `profiles` table.
- `approver` — CTO + Maymun. Can approve/block items and add notes.
- `reviewer` — ProjectLead. Can add notes only.
- `viewer` — Engineers. Read-only.

**Approval semantics:** Version-pinned to commit SHA. If a document changes, the approval no longer applies and the dashboard surfaces "approved at commit abc123, current commit def456 — re-review needed." This is the difference between governance theatre and real governance.

---

## 4. D0.6 stage map

| Stage | What | Status |
|---|---|---|
| Pre-D0.6 | Create `agbuilder-platform/revolutionize` repo with Phase 0 scaffold (manifest.json + 25 stub files) | ✅ done — repo live, smoke test green via new fine-grained PAT |
| D0.6a | `/phase0` dashboard route — fetch manifest, render 25 items grouped by track, all `🔴 Pending` status (no auth) | ✅ merged — PR #22 → `7cc31ae`; production verified shows 25 real cards |
| D0.6b | Supabase Auth + `profiles` table + roles + `/login` + `/signup` + `/auth/signout` + header `UserMenu` + D0.6a patches | **prompt written, awaiting AG execution** |
| D0.6c | `phase0_approvals` table + document/infra-check review flows + approve/block actions + commit-SHA pinning + PDF/markdown rendering | not yet scoped |

After D0.6c merges, Phase D0 is fully closed. Then D1 begins (Revolutionize Phase 1 infrastructure prerequisites + Stage 1.1.1 Telemetry event schema).

---

## 5. Org migration — the GitHub Free private-repo trap

Worth recording because I gave wrong info and the user pushed back appropriately.

**The migration:** Maymun's personal account `maymun207/revolutionize` was migrated to a new GitHub Organization `agbuilder-platform/revolutionize`. Driver: GitHub Free for personal accounts doesn't support branch protection on private repos (returns HTTP 403). My initial claim was that Free orgs DO support it — wrong. Both Free orgs and Free personal accounts hit the same wall on private repos. Branch protection rulesets can be configured (status: Active) but won't be enforced.

**Three options after the trap was revealed:**
- (a) Upgrade org to GitHub Team ($4/user/month) — gets real branch protection.
- (b) Stay on Free, skip branch protection for now — rely on CODEOWNERS-triggered review requests, social trust on a 6-person team.
- (c) Make repo public — security concern (LLM budget, infra configs, ADRs in there) — rejected.

**Maymun chose (b).** Item B12 in the Phase 0 manifest stays partial (🟡) until either team scale demands the upgrade or CWF goes to production. The dashboard surfaces this gap honestly.

**What the migration was still worth:** the new fine-grained PAT was issued against the org (scoped to `agbuilder-platform/revolutionize`, `Contents: Read` only), the org provides cleaner long-term ownership for a 6-person team, and the conceptual model (org > personal) is the right pattern even without the branch protection benefit.

**Critical for future stages:** code references must use `agbuilder-platform/revolutionize`, not `maymun207/revolutionize`. AG drifted on this in D0.6a despite explicit prompt direction. D0.6b's prompt makes the patch a first-class acceptance criterion.

---

## 6. Working-style invariants reinforced this session

**The "slow down" feedback (mid-session).** When walking through the org migration, I was bundling 7 simultaneous items (visibility, tier, PAT re-issue, team members, env var update, smoke test, branch protection) into one message. Maymun pushed back: *"you are listing too many things at a time, slow down! lets go one by one"*. Subsequent walk-through went one decision per turn — repo name → create org → transfer repo → create new PAT → update Vercel env var → curl smoke test → branch protection. This is the new house pattern when walking the user through interactive ops/setup steps: **one decision per turn, wait for confirmation, then the next**. Stage prompts (single shot to AG) are different — those bundle context aggressively because AG processes the full prompt at once.

**Step 0 mandatory reads.** D0.5a–D0.5e all included an explicit Step 0 section where AG must read specified source files and report findings in the PR body before writing any code. This caught real drift (RevSystem has no `id` field; RevConnection has bilingual `purposeEn`/`purposeTr`; nav uses a 2-tier breakpoint not 3-tier). Maintain this pattern.

**Pattern #25 — `'use client'` components never import runtime data modules.** Server pages compute the strings and pass as serializable props. D0.5c's i18n pass for `LayerGridClient` and `RevSystemGridClient` reinforces this. D0.6b extends this to Supabase: `app/_lib/supabase/server.ts` has `import 'server-only'` to prevent accidental client import.

**Pattern #26 — When replacing a component, delete the old file (not rename in place).** Pattern emerged across D0.5a (deleted `RevSystemGrid` + `RevSystemCard`), D0.5b (deleted `RevGanttTable` + `EaipPlanTasks`). Avoids dead code accumulation. Continued in D0.6 work.

**Pattern #27 (new this session) — Folding small patches into the next substantive stage.** When D0.6a shipped with two known issues (wrong repo path, missing `accent-red` token), I considered a dedicated D0.6a.1 patch stage but Maymun chose to fold into D0.6b. Rule: if the next stage is ≤24h away and the patches are ≤3 file touches, fold. Otherwise patch separately.

**Pattern #28 (new this session) — Operator runs SQL migrations manually.** AG cannot execute SQL against the live Supabase project (no service role credentials in AG's environment, and we deliberately don't want them there). AG creates `supabase/migrations/XXXX_*.sql` files and the PR body includes the SQL as a copy-pasteable code block for Maymun to run in Supabase Dashboard → SQL Editor.

**Pattern #29 (new this session) — Trigger-based role bootstrap.** Instead of seeding users via SQL or via a service-role admin script, Supabase's `handle_new_user()` trigger fires on `auth.users` insert and creates the corresponding `profiles` row. Special-case logic in the trigger gives `maymun207@gmail.com` the `approver` role automatically on first signup; all other emails default to `viewer`. Role promotion is a manual admin task (SQL `update` by Maymun) — deliberately no self-service UI for this.

**Pattern #30 (new this session) — Publishable key, not service role, in environment.** `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` is the new name for the anon key — safe to expose in client bundles, RLS protects data. `SUPABASE_SERVICE_ROLE_KEY` bypasses RLS and must never be added to TheBluePrint23 env vars in D0.6b. Reserved for future admin scripts only.

**Pattern #31 (new this session) — Repo path drift.** AG used `maymun207/revolutionize` in D0.6a despite the prompt explicitly specifying `agbuilder-platform/revolutionize`. The justification AG gave was "used actual" — meaning AG checked something locally and decided the old path was right. This is a class of failure where AG overrides explicit prompt content with local-environment inference. Future prompts that depend on a freshly-changed path should make the patch a first-class acceptance criterion with a grep check (`grep -r "maymun207/revolutionize" app/` → 0 results expected).

---

## 7. State of the open questions queue

These five were marked OPEN at the start of the session:

| # | Question | Status as of 2026-06-02 |
|---|---|---|
| 1 | First product (Revolutionize) — what does the system build first? | Still OPEN — will surface as part of Phase 0 Track C deliverable C2 (stub-to-real implementation map). The Phase 0 dashboard will list this OPEN visibly. |
| 2 | SOUL.md founder content (≥200 words) | Still OPEN — Phase 0 item B15 owned jointly by Maymun (SOUL content) + Claude (Pattern Library draft) + CTO (review). Surfaced on /phase0 dashboard. |
| 3 | Quarterly LLM budget | Still OPEN — Phase 0 item A1 component. Surfaced on /phase0. |
| 4 | Platform relationship (EAIP ↔ Revolutionize coupling) | Resolved in v6 SSoT — dual-platform, EAIP is the multi-tenant product, Revolutionize is the autonomous agent platform that ships PRs into EAIP. Implicitly closed by D0.3i Bridge Charter. |
| 5 | Team expertise gaps | Still OPEN — Phase 0 item A1 component. Drives the reading week (A4) and Phase-5 risk. |

The Phase 0 dashboard now surfaces these gaps directly — Pattern #32 (implicit, worth naming): **OPEN items become first-class entities in the governance portal**, not buried in markdown footnotes.

---

## 8. Asset locations recap

**TheBluePrint23 repo (`maymun207/TheBluePrint23`):**
- Stage prompts: `prompts/v0/D0_<X>-<slug>.md`
- Lessons retrospectives: `prompts/v0/D0_<X>-lessons.md`
- All D0.5a–e and D0.6a lessons committed to main.

**Revolutionize repo (`agbuilder-platform/revolutionize`):**
- `docs/phase0/manifest.json` — 25 items, schema v1.
- `docs/phase0/<id>-*.md` — 25 stub files seeded from the runbook's per-item Goal paragraphs.
- `README.md`, `.gitignore`, `.github/CODEOWNERS`, `adrs/.gitkeep` — scaffolding only; ADRs added separately.
- `gh api .../branches/main/protection` → 403 (Free tier limit, accepted).

**Vercel env vars set on TheBluePrint23 project (Production / Preview / Development):**
- `GITHUB_PAT` — fine-grained PAT scoped to `agbuilder-platform/revolutionize`, `Contents: Read`.
- `NEXT_PUBLIC_SUPABASE_URL` — Maymun added; D0.6b verifies presence on first run.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — same.

**Supabase project:**
- URL: `https://oapvuepmkaoglfjnjayk.supabase.co`
- Schema not yet created — D0.6b ships the SQL for Maymun to run manually.
- "Confirm email" must be disabled in Auth → Providers → Email before D0.6b testing.

---

## 9. Drift / anti-pattern log from this session

For each, the recovery action is either already taken or scheduled:

- **D0.6a used wrong repo path** (`maymun207/revolutionize` instead of `agbuilder-platform/revolutionize`). Recovery: D0.6b folds the patch (4 patch points: `github.ts` constant, footer href, footer text, both `STRINGS.phase0.footerNote` values). Acceptance criterion includes a grep check.
- **D0.6a missing `accent-red` Tailwind token.** Not visible in D0.6a render (only `🔴 pending` used `accent-amber`); will be visible in D0.6c when blocked status renders. Recovery: D0.6b adds `accent.red: '#F85149'`.
- **AG self-report claimed Step 0 found a "2-tier breakpoint" system but earlier memory said 3-tier.** AG was correct; my carry-forward memory was wrong. Updated mental model: nav has 2 breakpoint tiers, not 3.
- **My initial Free-org branch-protection claim was wrong.** Corrected mid-session; recorded above in §5. Lesson: when recommending an option that depends on a tier-based feature, verify the feature works at the chosen tier before recommending.
- **I overloaded a message with 7 simultaneous decisions during the org migration.** User pushed back, I switched to one-decision-per-turn. Reinforces Pattern: interactive ops walk-throughs are one-step-at-a-time even when bundle-friendly stage prompts are not.

---

## 10. NEXT ACTION (resume here in new session)

**D0.6b prompt is written and ready. AG has not yet executed it.**

Hand the file `D0.6b-supabase-auth.md` to AG. While AG executes:

1. Maymun confirms the two `NEXT_PUBLIC_SUPABASE_*` env vars are set on Vercel (Production + Preview + Development).
2. After AG opens the PR, Maymun runs the SQL migration from the PR body in Supabase Dashboard → SQL Editor.
3. Maymun disables "Confirm email" in Supabase → Auth → Providers → Email.
4. Maymun signs up at the Vercel preview `/signup` with `maymun207@gmail.com` + a password ≥8 chars.
5. Verify header shows `maymun207@gmail.com · Approver` on `/phase0`.
6. Sign out, sign in again, confirm round-trip.
7. Verify patches: `/phase0` footer link goes to `agbuilder-platform/revolutionize` (not `maymun207/revolutionize`).
8. Send `Approved — merge D0.6b`.

After D0.6b merges, write **D0.6c** — the heaviest stage of D0.6:

- `phase0_approvals` table + RLS policies (append-only insert; only `approver` / `reviewer` roles can insert; latest insert per `item_id` is current state).
- Document review flow: route `/phase0/[itemId]` fetches the document from GitHub (markdown rendered with `react-markdown`, PDF rendered with `react-pdf` or iframe, SVG/HTML direct embed). Approve / Block buttons + note field, gated by role. Commit SHA pinning — approval includes the manifest's commit SHA at time of review.
- Infra-check flow: same route but UI is "paste evidence" textarea + Mark Verified button. No file fetch.
- /phase0 status badges become live — read latest approval per item, render `🟢 Approved` / `🔴 Blocked` / `🟡 Pending re-review (commit drift)` / `🔴 Pending`.
- Role-gated UI: approver sees Approve/Block buttons; reviewer sees Note-only; viewer sees read-only.

Step 0 mandatory reads for D0.6c will need to verify the actual roles enum values, document file types in the stub folder, and how `LayerGridClient`-style detail expansion should be adapted for the longer-form Phase 0 item content. **Do not write D0.6c until D0.6b is merged** — the auth foundation must be verified first.

After D0.6c, Phase D0 closes fully and we pivot to D1 (Revolutionize Phase 1, starting with infrastructure prerequisites confirmation — the original D1 gate before the D0.6 governance pivot intervened).

---

**End of bootstrap. Continue in new session by reading: this file + the four project bootstraps + the latest prior bootstrap (`context_bootstrap_session_2026-06-01_afternoon.md`), then resume from §10 NEXT ACTION above.**
