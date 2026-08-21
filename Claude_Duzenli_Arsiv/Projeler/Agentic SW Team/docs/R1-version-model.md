# Stage R1 — Canonical Reconciliation: Version model (v0.5 → v1.5)

> **Stage type:** Canonical Reconciliation (R-series) · content edit to source docs + governance tracking
> **Author:** Claude (single-author rule)
> **Date:** 2026-06-02
> **Model recommended:** Claude Sonnet 4.6, thinking mode
> **Model used actual:** [AG fills in lessons.md]
> **Estimated size:** M — Antigravity 30–45 min · human review 20–30 min (incl. TR check)
> **Merge mode:** operator-gated — operator reviews EN + TR on the Vercel preview before approving
> **Predecessor:** D0.7c.1 (`f456b1f`) + canonical decisions locked (CANONICAL_RECONCILIATION_v1.md §2)
> **Successor:** R2 (timeline framing) — runs sequentially; R1 must merge first (shared docs)

---

## 0. TARGET REPOSITORY (non-negotiable — read first)

**All R1 work — doc edits, the governance card, the reconciliation reference doc — is done in `agbuilder-platform/revolutionize`, branch `main`.** This is the content store the live tool fetches from (confirmed: `app/_lib/github.ts` → `GITHUB_REPO = 'agbuilder-platform/revolutionize'`, branch `main`).

- **Do NOT edit `maymun207/TheBluePrint23`** (the Next.js app repo / AG's default local clone). It carries a *stale duplicate* of `docs/architecture/` that production does **not** serve — editing it reaches neither the tool nor the team ("died at birth").
- Operate in a fresh clone of `agbuilder-platform/revolutionize` (e.g. `/tmp/rev`), commit on a branch, open a PR — operator-gated, exactly as D0.7c.1's PR #1 did against this same content repo.
- `docs/phase0/` (governance docs + `manifest.json`) lives in this content repo; the R1 card and `r1-version-model.md` go here.
- The app repo's duplicate `docs/` is a known drift hazard (already diverged on `03_bridge_...html`); retiring it is a separate cleanup, **NOT** part of R1.

---

## 1. Goal

Make the program's version terminology **identical and correct across every canonical document**. Today "v0.5" appears only in the charter (6×) and nowhere else, and it points the wrong direction (implies pre-v1 immaturity, when the program's end-state is post-v1 maturation). Every other Revolutionize doc is framed as "v1 → v2" with no v1.5 waypoint.

After R1, the canonical progression **`v1 → v1.5 → v2`** is stated once in each version-bearing doc, the term **`v1.5`** replaces every "v0.5", and a Phase-0 governance card (**R1**) logs the correction as tracked remediation.

This is a **terminology + model-statement** pass only. It does **not** touch timeline framing (that's R2) or prerequisites (R3). Stay in scope.

---

## 2. Canonical truth to apply (authoritative — from CANONICAL_RECONCILIATION_v1.md §2)

**Progression: `v1 → v1.5 → v2`.**

- **v1** = the agentic org / full human-team simulation — the artifact that is *built and used*.
- The **June–Dec 2026 program** stands up a **working v1** and *uses* it to develop & deploy the EAIP products (CWF1, EAIP v1).
- Through that real-world use, v1 **matures to v1.5** by Month 7 — battle-tested; the program's end-state.
- **v1.5 → v2 (cellular architecture)** is the post-program horizon; the full 8-phase / 12–15-month Revolutionize build *is* the v1.5 → v2 road.
- **"v0.5" was a misnomer → replaced by `v1.5` everywhere.**

### 2.1 Canonical model statement (insert once per version-bearing doc)

**EN:**
> Revolutionize evolves **v1 → v1.5 → v2**. **v1** is the agentic org (full human-team simulation), built and *used* during the June–December 2026 program to develop and deploy the EAIP products. Through that real-world use, v1 matures into **v1.5** by Month 7 (December 2026) — battle-tested, the program's end-state. The full 8-phase / 12–15-month Revolutionize build is the **v1.5 → v2** (cellular architecture) road beyond the program.

**TR (draft — operator to verify on preview):**
> Revolutionize **v1 → v1.5 → v2** olarak evrilir. **v1**, ajanik organizasyondur (tam insan-ekip simülasyonu); Haziran–Aralık 2026 programı boyunca EAIP ürünlerini geliştirmek ve devreye almak için inşa edilir ve *kullanılır*. Bu gerçek-dünya kullanımıyla v1, 7. Ay'a (Aralık 2026) kadar **v1.5**'e olgunlaşır — savaş-testinden geçmiş, programın bitiş durumu. Tam 8-fazlı / 12–15 aylık Revolutionize inşası, programın ötesindeki **v1.5 → v2** (hücresel mimari) yoludur.

### 2.2 Three-folds mandate line (charter) — version reference update

Wherever the charter's mandate says the team "builds Revolutionize v0.5", change to **"builds Revolutionize v1, maturing to v1.5"** (EN) / **"Revolutionize v1'i inşa eder, v1.5'e olgunlaştırır"** (TR). Preserve the rest of the mandate sentence verbatim.

---

## 3. Step 0 — mandatory reads (report before editing)

1. **Grep every canonical doc for `v0.5`** (and `v0\.5`, `V0.5`) across the `revolutionize` repo `docs/` tree — report **every** occurrence as `file:line` with the surrounding phrase, EN and TR, so each replacement is verified safe (not inside a URL, code identifier, or unrelated string).
2. **Charter** (`docs/architecture/08_leadership_charter_bilingual.html`): report the exact mandate sentence(s) containing the "v0.5 / builds Revolutionize" phrasing, both EN and TR keys (e.g. `mandate_p1`).
3. **Revolutionize architecture** (`01_...`), **Revolutionize schedule** (`07_...`), **v6 master** (`ARDICTECH_Platform_v6_SSoT_bilingual.html`): report where v1 / v2 are described — the heading or block where the canonical model statement (§2.1) should be inserted so a standalone reader sees v1.5.
4. **Runbook** (`docs/library/phase_0_runbook.md`): grep for `v0.5` — report occurrences (if any).
5. **Phase-0 governance manifest** (`docs/phase0/manifest.json`): report the **exact item schema** (all fields of one example item, verbatim — id, title, owner, effort, acceptance, category, status, file, plus any others) and the **list of existing categories**. This drives how the R1 card is added (§5, Step 4).

If `v0.5` appears anywhere unexpected (a code identifier, a real version of an external tool), report it and do **not** blind-replace — confirm scope first.

---

## 4. Steps

**Step 0 — Reads.** §3. Report findings.

**Step 1 — Commit the reconciliation SSoT.** Add `CANONICAL_RECONCILIATION_v1.md` (provided by operator) to `docs/decisions/CANONICAL_RECONCILIATION_v1.md` **in `agbuilder-platform/revolutionize`**. This is the traceable source of truth that R1–R4 reference. (If operator has not supplied the file, report BLOCKED — do not fabricate it.)

**Step 2 — Replace `v0.5` → `v1.5`.** For every occurrence found in Step 0.1 (charter + any others), replace `v0.5` with `v1.5`, preserving surrounding text, in **both EN and TR**. Apply the mandate-line update (§2.2).

**Step 3 — Insert the canonical model statement (§2.1).** Add the EN + TR model statement once into the charter, Revolutionize architecture, Revolutionize schedule, and v6 master, at the location Step 0.3 identified (near where v1/v2 are described). Match each doc's existing markup/data structure (these are bilingual HTML files with embedded JS string dictionaries — add the strings to the correct `en` and `tr` keys, do not hardcode raw text into markup if the doc uses a dictionary).

**Step 4 — File the R1 governance card.** Using the exact schema from Step 0.5:
- Append an item to `docs/phase0/manifest.json` with: **id** `R1`; **title** "Canonical Reconciliation R1 — Version model (v0.5 → v1.5)"; **owner** Maymun (sponsor) · Claude (architect); **effort** small content pass; **acceptance** `grep -ri "v0\.5" docs/ → 0` (no v0.5 in any canonical doc); **category** an existing category if one fits, else add **"Remediation"** (report which); **status** matching how a completed/approved item is represented; **file** `docs/phase0/r1-version-model.md`.
- Create `docs/phase0/r1-version-model.md` — a short bilingual backing doc: what was reconciled (v0.5→v1.5, the v1→v1.5→v2 model), why (the misnomer + cross-doc divergence), and a link/reference to `docs/decisions/CANONICAL_RECONCILIATION_v1.md`. No TBDs.

**Step 5 — Verify.** `grep -ri "v0\.5" docs/` → **0**. Confirm the model statement renders in EN and TR in each of the four docs. Confirm the new R1 card appears in the Phase-0 portal and its doc renders (this exercises the path we fixed in D0.7c.1 — a nice live regression check).

**Step 6 — Commit + PR.** Branch `recon/r1-version-model`. PR title `"R1: canonical reconciliation — version model v0.5→v1.5"`. PR body must include: the Step 0.1 grep map (before), the after grep (`v0.5 → 0`), the four docs where the model statement was inserted, and the R1 card details (category used, file). Screenshots: the model statement rendering on one Revolutionize tab (EN + TR), and the R1 card in the Phase-0 portal.

AG stops. Report PR URL.

---

## 5. Acceptance criteria

### Content
- `grep -ri "v0\.5" docs/` → **0** across the entire `revolutionize` `docs/` tree (no v0.5 anywhere in canonical content).
- The `v1 → v1.5 → v2` model statement (§2.1) is present in **all four** docs: charter, Revolutionize architecture, Revolutionize schedule, v6 master — in **both EN and TR**.
- Charter mandate line reads "builds Revolutionize v1, maturing to v1.5" (EN) / TR equivalent — rest of the sentence unchanged.
- No timeline or prerequisite content altered (those are R2/R3 — out of scope here).
- `CANONICAL_RECONCILIATION_v1.md` committed to `docs/decisions/`.

### Governance
- New **R1** item in `docs/phase0/manifest.json`, matching the existing schema exactly.
- `docs/phase0/r1-version-model.md` exists, bilingual, no TBDs, references the reconciliation SSoT.
- R1 card renders in the Phase-0 portal (no 404 — validates the D0.7c.1 fix holds for new items).

### Verified on preview (operator)
- The model statement reads correctly in **TR** (operator confirms the Turkish — this is the one part AG cannot self-verify for fluency).
- A Revolutionize tab now shows v1.5; nowhere shows v0.5.
- No regression: other tabs, Library, other Phase-0 cards still render.

---

## 6. Edge cases
- **`v0.5` inside a non-version context** (URL, external tool version, code id): do NOT replace; report it. Only program-version "v0.5" → "v1.5".
- **Insurance "v0.8"**: that is a *product* version, NOT the program version — leave it untouched (it's correct; R2 confirms it).
- **A doc uses raw markup instead of a string dictionary:** match whatever that doc does; keep EN/TR parallel.
- **`category` is a fixed enum in the governance UI:** if adding "Remediation" would break rendering, reuse the closest existing category and report it — do not break the portal to add a category.
- **Reconciliation file not provided:** BLOCKED — do not invent its contents.

---

## 7. Verification approach (operator)
1. Preview: open a Revolutionize tab → see the v1 → v1.5 → v2 statement; toggle TR → reads fluently.
2. Confirm no "v0.5" anywhere (spot-check charter mandate + Revolutionize tabs).
3. Phase-0 portal → new **R1** card present → open it → backing doc renders (no 404).
4. Spot-check no regression (Library, other cards, other tabs).
If all pass → **`"Approved — merge R1"`**.

---

## 8. Antigravity configuration
**Model recommended:** Sonnet 4.6 thinking.

**Watch for:**
- AG editing the `maymun207/TheBluePrint23` app repo's `docs/` instead of `agbuilder-platform/revolutionize`. **Hard reject** — wrong repo means the fix never reaches the live tool or the team.
- AG blind-replacing `v0.5` inside a URL / external-tool version / code identifier. Reject — version-context only.
- AG touching Insurance **v0.8** (a product version — out of scope). Reject.
- AG altering timeline or prerequisite text (R2/R3 scope). Reject — R1 is version-only.
- AG hardcoding EN text where the doc uses a bilingual string dictionary, or adding EN without the matching TR. Reject.
- AG inventing the reconciliation doc's contents instead of committing the operator-provided file. Reject.
- AG breaking the Phase-0 portal by forcing a new category into a fixed enum. Reject — reuse + report.
- AG declaring done without the before/after grep map + the TR-rendering screenshot. Reject.

---

## 9. Lessons.md template

After merge, AG creates `prompts/v0/R1-lessons.md`:

```md
# R1 Lessons

**Stage:** R1 — Canonical Reconciliation: Version model (v0.5 → v1.5)
**Executed:** 2026-06-XX · **Operator:** Maymun · **Reviewer:** Claude + Maymun
**Merge mode:** operator-gated · **Result:** [✅ / ❌]

## § Antigravity self-report  (AUTHORED-BY: Antigravity)
- Size actual: [Xm] · Model used: [...]
- v0.5 occurrences before: [grep map] · after: [0]
- Model statement inserted in: [charter, rev-arch, rev-schedule, v6] — EN+TR [✅]
- Mandate line updated: [✅] · Insurance v0.8 left untouched: [✅]
- Reconciliation SSoT committed to docs/decisions/: [✅]
- R1 governance card: category used [...], file docs/phase0/r1-version-model.md, renders [✅]
- Out-of-scope text (timeline/prereqs) untouched: [✅]

## § Operator review  (AUTHORED-BY: Maymun)
- TR reads fluently: [✅ / ❌ + corrections]
- No "v0.5" anywhere on preview: [✅ / ❌]
- R1 card renders (no 404): [✅ / ❌]
- No regression: [✅ / ❌]
- Things AG missed: [≥1 bullet]
- Approval at: [timestamp]

## § Prompt-author retrospective  (AUTHORED-BY: Claude) — appended post-merge.
```

---

**End of Stage R1. First of the R1–R4 canonical reconciliation. Version terminology unified (v0.5 → v1.5; v1 → v1.5 → v2) and logged as tracked remediation. R2 (timeline framing) follows once R1 merges.**
