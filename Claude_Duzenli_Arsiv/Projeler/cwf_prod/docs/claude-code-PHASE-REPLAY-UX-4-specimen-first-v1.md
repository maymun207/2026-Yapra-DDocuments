# PHASE REPLAY-UX-4 — specimen-first layout (lift the shared picker above both experiments) · v1
<!-- rev 1 · 2026-07-06 · Author lane (AG / Claude Code on AntiGravity). Code-grounded at master HEAD
     b6ba5d3 (1008/1008, 93 files, docVersion rev 47, drift [OK]). FRONTEND-ONLY information-architecture
     fix for ReplayTab.tsx: the specimen picker (the shared input to BOTH Part A and Part B) currently
     lives buried INSIDE the Part B section at the bottom, so selecting a specimen for Part A (top) means
     scrolling down to Part B, loading + picking there, then scrolling back up — "driver's seat from the
     passenger door." specimenId is ALREADY shared state (ReplayTab.tsx:91); this only relocates the
     picker UI to a shared "① Specimen" section ABOVE both experiments. NO API/type/migration/behavior
     change to the runs. Not security-relevant (no new data flow). RULE-25 review, low risk. Architect
     writes this prompt (not AG). -->

## 0. HARD PRE-FLIGHT GATE (all literally true; paste evidence)
- [ ] Fresh clone; `git rev-parse origin/master` == **`b6ba5d3…`** (RULE 25).
- [ ] `npm ci` clean; baseline **1008/1008 (93 files)** green BEFORE any change (paste).
- [ ] **Drift gate green** (`npm run check:doc-drift` → `[OK]`) untouched clone (paste).
- [ ] Confirm: `specimenId` is ALREADY the single shared state driving Part A (`runPaired`) and Part B (`run`); this phase does NOT add a second picker or a second specimen state.

## 1. The IA fix (one principle)
The specimen is the shared upstream input to both experiments. Order must be: **① pick a specimen (shared, top) → ② Part A · A/B perturbation → ③ Part B · empty-completion**, each experiment reading the one selected specimen. Today the picker is inside Part B (bottom); move it to a shared section above Part A. Single source of truth — do not duplicate the picker or the state.

## 2. HARD CONSTRAINTS (violating any = rejected review)
**2.1 — ONE picker, lifted to the top.** Extract the specimen picker (the "load specimens"/"refresh" button, the search input, the `visible` list with per-row select, the empty/loading states — currently in the Part B `<section>`) into a shared **① Specimen** section rendered ABOVE the Part A `<section>`. It is rendered EXACTLY ONCE. Part B no longer renders its own picker.
**2.2 — `specimenId` stays the single shared state.** No new state, no second picker. Both `runPaired` (Part A) and `run` (Part B) read the same `specimenId`. The selected specimen's compact reference ("specimen: <title> · <id8>") shows in BOTH Part A and Part B headers (read-only), so each experiment shows what it will run against.
**2.3 — On-demand load preserved (no fetch on render).** The picker still fetches ONLY on the explicit "load specimens" action (`loadSpecimens`); nothing fetches on mount. The existing dedup/selection-reset behavior on reload is unchanged.
**2.4 — Both run buttons gate on selection, with a clear hint.** "run A/B" (Part A) and "run experiment" (Part B) stay disabled until `specimenId` is set; when unset, each shows/points to a short hint like "① select a specimen above" (TR+EN) — no more silent disabled button with no explanation.
**2.5 — Zero behavior change to the runs.** The Part A paired run, the Part B run, the audit, the C9 redaction, the deep-links, the scorers — all byte-identical. This is layout only. Diff is confined to `src/components/admin/ReplayTab.tsx` (+ its test). NO `api/**`, NO `shared/**`, NO migration, NO type change. Paste the `git diff --name-only`.
**2.6 — Numbered stepper for legibility.** Give the three sections the ①/②/③ affordance (a small numbered badge in each header: ① Specimen · ② Part A · A/B perturbation · ③ Part B · empty-completion) so the top-down flow is self-evident. Sentence case, existing tokens, no new color ramp.

## 3. GATED SUB-PHASES
**3-A · Extract + lift.** Pull the picker JSX out of the Part B section into a new shared **① Specimen** section above Part A (a small local component or inline block). Wire it to the existing `specimens`/`specimenId`/`loadSpecimens`/`visible`/search state (no state moves — it all already lives in the component scope).
**3-B · Reference + gate.** Add the compact "specimen: …" read-only reference to the Part A and Part B headers; add the "① select a specimen above" hint on both disabled run buttons; add the ①/②/③ badges.
**3-C · Tests.** Update `replayTab.test.tsx`: the picker renders exactly once and ABOVE both experiments; selecting a specimen in the top picker enables BOTH run buttons; no fetch on render (load is explicit); Part B no longer contains a picker. Existing run/audit/redaction tests pass unchanged.
**3-D · Seal.** Two-commit seal. `src/**` is UNMAPPED → NO reseal, NO docVersion bump (mirror PRIMER-COLLAPSE-1); `git diff public/architecture/` must be 0 files. CHANGELOG entry in the docs commit. Diff-scope permits `.agents/CHANGELOG.md`.

## 4. SELF-VERIFICATION (literal evidence)
1. Baseline → final counts (paste).
2. **One picker, on top (§2.1):** the picker renders once, above Part A; Part B has no picker — cite the test + the section order.
3. **Shared state (§2.2):** no new specimen state added; both runs read `specimenId`. Paste the grep (still one `specimenId`).
4. **No-fetch-on-render (§2.3):** test proving mount fires no `listReplaySpecimens`.
5. **Both buttons gate + hint (§2.4):** test — no specimen ⇒ both run buttons disabled + hint shown; select ⇒ both enabled.
6. **Frontend-only (§2.5):** `git diff --name-only b6ba5d3..HEAD` = only `ReplayTab.tsx` + its test (+ `.agents/CHANGELOG.md`). No api/shared/migration/manifest. Paste.
7. **No reseal (§3-D):** `git diff public/architecture/` = 0 files; docVersion still rev 47.
8. Seal: tsc + oxlint clean; drift `[OK]`; two `--no-ff` merges held for push; `origin/master` still `b6ba5d3`.

## 5. AFTER GREEN — owner (Architect surfaces)
No migration/env/secret. Live check: Replay → the ① Specimen picker is now at the TOP → load specimens → pick one → both Part A "run A/B" and Part B "run experiment" light up → run either without scrolling to hunt for the picker.
