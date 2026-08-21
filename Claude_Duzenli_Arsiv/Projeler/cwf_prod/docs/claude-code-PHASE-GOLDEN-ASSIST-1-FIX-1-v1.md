# PHASE GOLDEN-ASSIST-1-FIX-1 — the primary Mark button must require a bucket (F54)

<!-- claude-code-PHASE-GOLDEN-ASSIST-1-FIX-1-v1 · rev 1 · 2026-07-13 · Session 39.
     Profile: HOTFIX (client-only, single component + one test).
     Anchor: origin/master = a38adc6 (or later, if RULES-AMEND-1 merged first — re-anchor on
     whatever origin/master is at pre-flight and report it).
     Source: F54, found live by the owner 2026-07-13 while curating the golden set.
     ROOT CAUSE IS AN ARCHITECT SPEC GAP, not an AG error: GOLDEN-ASSIST-1 §B2 specified the
     "Kova seçmeden işaretle" escape but never said the PRIMARY button must require ≥1 bucket. -->

---

## 0 · PRE-FLIGHT

```bash
cd /tmp && rm -rf cwf_yaprak && git clone --quiet https://github.com/maymun207/cwf_yaprak.git
cd cwf_yaprak && git rev-parse origin/master     # report it — anchor on whatever this is
git status --porcelain                           # RULE 30: MUST be empty
npm ci --no-audit --no-fund --silent
```

---

## 1 · THE DEFECT

`ReplayTab.tsx` — the golden mark popover (`data-testid="golden-mark-popover"`):

```tsx
<Button size="sm" variant="default" onClick={onConfirm} disabled={busy}>   {/* ← only `busy` */}
    {t('İşaretle', 'Mark')}
</Button>
<Button size="sm" variant="outline" onClick={onMarkNoBucket} disabled={busy}>
    {t('Kova seçmeden işaretle', 'Mark without a bucket')}
</Button>
```

With **zero buckets ticked**, `İşaretle` produces `formatNote([], '')` → `''` → a mark with **no
note** — i.e. it does *exactly* what the escape button does, silently. Two buttons, one outcome, no
signal. The owner hit it on his first real mark: the specimen landed in `etiketsiz` and the coverage
strip did not move.

---

## 2 · THE FIX (small, exact)

1. **`İşaretle` is disabled while no bucket is selected.** `disabled={busy || buckets.size === 0}`.
2. **Say why.** While it is disabled for that reason, render a one-line hint inside the popover:
   *"En az bir kova seç — ya da 'Kova seçmeden işaretle' ile etiketsiz işaretle."*
   `data-testid="golden-mark-hint"`.
3. **The escape stays exactly as it is.** `Kova seçmeden işaretle` remains the *deliberate* untagged
   path. That is the point: untagged must be a **choice**, never an accident.
4. Nothing else changes. No new state, no store change, no endpoint, no api/**, no shared/**.

**Files:** `src/components/admin/ReplayTab.tsx` · `src/components/admin/__tests__/replayTab.test.tsx`
· `.agents/CHANGELOG.md` (entry in-branch). **No others.**

---

## 3 · TESTS

1. **Zero buckets ⇒ the primary button is disabled** and the hint is present; `markGoldenSpecimen`
   is not called.
2. **One bucket ticked ⇒ the primary button enables** and marks with the encoded note (existing
   assertion, keep it green).
3. **The escape button still marks with no `note` argument** even with zero buckets (regression
   lock — the deliberate untagged path must survive).

---

## 4 · SELF-VERIFY

```bash
npx tsc --noEmit -p tsconfig.json
npx vitest run src/components/admin/__tests__/replayTab.test.tsx --reporter=dot
npx vitest run --reporter=dot                     # FULL suite, unsharded
npx tsx scripts/checkDocDrift.ts                  # [OK], no reseal (src/** is not drift-mapped)
git diff --stat <anchor>..HEAD                    # only the three files above
```

Report the new `X tests / Y files`, the diff-stat, the PR URL, and the **CI conclusion on the PR
head** (CI green is the merge precondition — S37-2). Do not merge.

---

## 5 · DONE MEANS

The owner ticks a bucket to mark; if he ticks none, the panel tells him so instead of silently
recording an untagged specimen. The coverage strip moves on every intentional mark.

<!-- END · claude-code-PHASE-GOLDEN-ASSIST-1-FIX-1-v1 · rev 1 · 2026-07-13 -->
