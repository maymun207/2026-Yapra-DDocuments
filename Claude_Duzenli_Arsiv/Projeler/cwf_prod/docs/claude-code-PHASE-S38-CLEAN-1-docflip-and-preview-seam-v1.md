# PHASE S38-CLEAN-1 — NAV-STACK-1 DOC-FLIP + `/dev/admin-preview` quota seam · v1

<!-- claude-code-PHASE-S38-CLEAN-1-docflip-and-preview-seam-v1 · rev 1 · 2026-07-12 · Session 38.
     Lane: AG (Author). Master-plan step W0.c. CEREMONY PROFILE: HOTFIX — docs + dev-seam +
     tests only; no api/** · shared/** · supabase/** · package.json · security surface.
     Note: the Architect ran the W0.b flake-pattern sweep (sync getBy* after async promise)
     across the whole suite and found ZERO further instances — do not redo it; there is no
     flake sub-task in this phase. -->

## 0 · HARD PRE-FLIGHT (gate — stop on any mismatch)

```bash
git fetch origin && git rev-parse origin/master   # MUST print 415db543cd507c87b987ecf92e0a3b517c07e9da
git switch -c s38-clean-1 origin/master
npm run check:doc-drift                            # MUST be [OK]
npx vitest run src/components/admin src/dev --reporter=dot   # record the targeted baseline count
```

## 1 · BINDING CONSTRAINTS

- **C-1 scope:** the final diff touches ONLY `.agents/**`, `src/dev/**`, `src/components/admin/QuotaPanel.tsx`
  (hardening line only), and test files. Nothing under `api/**`, `shared/**`, `supabase/**`,
  `package.json`; no new dependency; no `vite.config` change.
- **C-2 no behavior change** to any production admin panel beyond the one defensive `?? []`
  hardening in QuotaPanel (§2·B). No copy rewrites (that is Wave 2).
- **C-3 no reseal expected:** `.agents/**` and `src/dev/**` are outside every sealed tab's
  `codeAreas`. If `check:doc-drift` complains after your diff, you touched something out of
  scope — STOP and re-check C-1. docVersion stays `rev 69`.
- **C-4 secrets:** none involved; keep it that way.
- **S37-2 flow:** push the branch, report, and WAIT. CI (unsharded) must be green, then the
  Architect runs RULE-25, then you merge ONLY with the Architect's verbatim `--no-ff` message.

## 2 · THE WORK (single pass, two sub-tasks)

### A — NAV-STACK-1 DOC-FLIP (`.agents/`)

1. **`.agents/CHANGELOG.md`** — add the missing entry for **PHASE NAV-STACK-1** (merged
   `3a2fe02`) **plus the CI de-flake hotfix** (merged `415db54`), newest-first, matching the
   established `### What / ### How / ### Verify` format of the STAGES-FIX-3 entry. Content it
   must carry (from the merged reality — verify against the code, don't trust this summary):
   - What: five findings (F27/F28/F29/F31/F41) were ONE missing abstraction — no navigation
     history. `navStack.ts` pure ancestor stack (no React/DOM/history) + `useTabNavigation`
     stamping `navDepth` on each `pushState`, popping ONE hop on `popstate` + `NavBreadcrumb`
     (`← Ancestor › … › Current`) + per-entry scroll memory + Kinds→Rules and Trust→Replay
     push context + the Rules arrival strip. `BackToStagesStrip` DELETED — one nav mechanism;
     the STAGES-FIX-2 scroll-restore suite passed UNCHANGED as the abstraction proof.
   - De-flake hotfix: `backendTrustPanel.test.tsx` audit-drawer test raced an async promise
     with a sync `getByTestId` (drawer rendered its loading skeleton first) — fixed test-only
     (`await findByTestId` + `vi.restoreAllMocks` in `navStackIntegration` afterEach). Record
     the S37-2 lesson line: **sharded local greens hid it; CI runs unsharded — CI-green is a
     merge precondition.**
   - Verify section: state "docs-only entry, written post-merge in S38-CLEAN-1" honestly.
2. **Stale annotation fix:** the `## [2026-07-11] PHASE STAGES-FIX-2` heading still reads
   "(AUTHORED, Architect-RULE-25-pending; …)". It merged at `8e7203d`. Update that
   parenthetical to MERGED (keep the rest of the heading intact).
3. **`.agents/skills/cwf-project-kb/SKILL.md`** — add a compact KB section for the nested-nav
   layer: the `navStack.ts` pure-core/hook-wrapper pattern (same move as `resolveInitialTab`),
   the `navDepth`-stamped history contract (one hop per Back), and the two footguns future
   agents must know — **jsdom has no `scrollIntoView` on the prototype (tests stub it)** and
   **Radix `ScrollArea` needs a column-flex parent for a definite height (F31 lesson)**.
   Place it where the KB's existing UI/admin sections live; follow the file's heading style.

### B — `/dev/admin-preview` quota seam

Pre-existing dev-only defect (absent in production): `src/dev/AdminPreview.tsx` seeds mocks
via `Object.assign(adminService, {...})` but mocks **no quota-family method** — `grep -n uota
src/dev/AdminPreview.tsx` returns nothing — so opening the Quota panel in the preview hits the
real network-backed service and crashes/errors the seam.
1. **Reproduce first** (open the preview route, navigate to Quota; record the exact failure).
2. **Mock the quota surface the panel actually calls** — code-read `QuotaPanel.tsx` for the
   authoritative list; at minimum `listChatQuotas` (rows fixture incl. one orphan row — the
   STAGES-FIX-1 F1/F2 honesty case), `setChatQuotaLimit`, `setChatQuotaNoLimit`,
   `resetChatQuota`, plus whatever usage/replay-quota reads it makes (`getUserUsageSeries`,
   `getUsageAnalytics`, `listUsers` — verify which are already mocked before adding).
   Fixtures follow the seam's existing in-memory style (mutations mutate the fixture so the
   panel visibly updates).
3. **One defensive hardening** in `QuotaPanel.tsx` at the `rawRows` derivation: guard the
   source arrays with `?? []` so an undefined service response can never throw at that site.
   No other QuotaPanel change.
4. **Seam smoke test** (new file under `src/dev/__tests__/` — vitest `include` covers
   `src/**`): render QuotaPanel under the preview seed with NO network (stub `fetch` to throw,
   the ReplayTab-test pattern) and assert rows render + no crash. Budget the
   `adminLegibility.test.ts` auto-gen (+2 tests per new admin `.tsx` — none expected here
   since no new admin component; confirm).

## 3 · SELF-VERIFY (evidence, literal)

- `git rev-parse origin/master` unchanged at `415db54…`; branch diff-stat pasted and matching
  C-1 exactly (`git diff --stat origin/master..HEAD`).
- Targeted suite: `npx vitest run src/components/admin src/dev` — paste before/after counts
  (delta = your new tests only).
- `npm run check:doc-drift` → `[OK]` pasted; `tsc -b` clean.
- The preview repro: one line describing the pre-fix failure and the post-fix behavior.
- Push `s38-clean-1`; report branch head SHA. **Do not merge.** CI-green + Architect RULE-25 +
  verbatim merge message come next.

<!-- END · claude-code-PHASE-S38-CLEAN-1-docflip-and-preview-seam-v1 · rev 1 · 2026-07-12 -->
