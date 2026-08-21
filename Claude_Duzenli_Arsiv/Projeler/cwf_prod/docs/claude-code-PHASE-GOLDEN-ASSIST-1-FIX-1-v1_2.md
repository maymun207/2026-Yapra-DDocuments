# PHASE GOLDEN-ASSIST-1-FIX-1 — the Mark button requires a bucket (F54) + the tag-is-a-claim line (F55)

<!-- claude-code-PHASE-GOLDEN-ASSIST-1-FIX-1-v1_2 · rev 1.2 · 2026-07-13 · Session 39.
     S37-1 AMENDMENT of v1 (presented → immutable; this is a NEW version, not an edit).
     WHAT CHANGED v1 → v1.2: §2 gains item 5 — F55, the "a tag is a claim" guidance line,
     found live minutes after v1 was written (the owner ticked all four buckets on a single
     OEE specimen; two of the four claims were false). Same file, same popover, one more
     string — it rides this phase rather than waiting for Wave 2.
     Profile: HOTFIX (client-only, single component + tests).
     Anchor: origin/master = a38adc6 (or later, if RULES-AMEND-1 merged first — re-anchor on
     whatever origin/master is at pre-flight and report it). -->

---

## 0 · PRE-FLIGHT

```bash
cd /tmp && rm -rf cwf_yaprak && git clone --quiet https://github.com/maymun207/cwf_yaprak.git
cd cwf_yaprak && git rev-parse origin/master     # report it — anchor on whatever this is
git status --porcelain                           # RULE 30: MUST be empty
npm ci --no-audit --no-fund --silent
```

---

## 1 · THE DEFECTS (both found live by the owner, 2026-07-13)

**F54 — the primary button does not require a bucket.** In the golden mark popover
(`data-testid="golden-mark-popover"`):

```tsx
<Button size="sm" variant="default" onClick={onConfirm} disabled={busy}>   {/* ← only `busy` */}
    {t('İşaretle', 'Mark')}
</Button>
<Button size="sm" variant="outline" onClick={onMarkNoBucket} disabled={busy}>
    {t('Kova seçmeden işaretle', 'Mark without a bucket')}
</Button>
```

With **zero buckets ticked**, `İşaretle` produces `formatNote([], '')` → `''` → a mark with **no
note** — exactly what the escape button does, silently. Two buttons, one outcome, no signal. The
owner hit it on his first real mark: the specimen landed in `etiketsiz` and the strip did not move.

**F55 — the popover never says that a tag is a claim.** On the next attempt the owner ticked **all
four** buckets on a single OEE specimen that returned real data (`3 calls · 4 results`). Two of the
four tags were therefore false: that turn is not an `empty-zero` specimen (its correct answer is a
number, not "no data"), and its phrasing is not `routing-tr`-tricky. **A false tag poisons the
sensor**: the strip would report an empty≠zero regression test that does not exist. An empty bucket
is honest; a wrongly-filled one is not.

**Both root causes are Architect spec gaps, not AG errors.** GOLDEN-ASSIST-1 §B2 specified the
escape hatch but neither the bucket requirement nor the semantics of a tag.

---

## 2 · THE FIX (small, exact)

1. **`İşaretle` is disabled while no bucket is selected.** `disabled={busy || buckets.size === 0}`.
2. **Say why.** While it is disabled for that reason, render a one-line hint inside the popover:
   *"En az bir kova seç — ya da 'Kova seçmeden işaretle' ile etiketsiz işaretle."*
   `data-testid="golden-mark-hint"`.
3. **The escape stays exactly as it is.** `Kova seçmeden işaretle` remains the *deliberate* untagged
   path. Untagged must be a **choice**, never an accident.
4. Nothing else changes. No new state, no store change, no endpoint, no `api/**`, no `shared/**`.
5. **F55 — the tag-is-a-claim line.** At the top of the popover's bucket list, one short line
   (`data-testid="golden-mark-claim"`):
   > **"Her etiket bir iddiadır — yalnızca gerçekten uyan kovaları işaretle. Yanlış etiket, ölçümü
   > bozar."**
   *(EN: "Each tag is a claim — tick only the buckets that truly apply. A wrong tag corrupts the
   measurement.")*
   Plain, human, no internal vocabulary. It must render whether or not the primary button is
   disabled.

**Files:** `src/components/admin/ReplayTab.tsx` · `src/components/admin/__tests__/replayTab.test.tsx`
· `.agents/CHANGELOG.md` (entry in-branch). **No others.**

---

## 3 · TESTS

1. **Zero buckets ⇒ the primary button is disabled** and `golden-mark-hint` is present;
   `markGoldenSpecimen` is not called.
2. **One bucket ticked ⇒ the primary button enables** and marks with the encoded note (existing
   assertion — keep it green).
3. **The escape button still marks with no `note` argument** even with zero buckets (regression
   lock — the deliberate untagged path must survive).
4. **`golden-mark-claim` renders** whenever the popover is open.

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
recording an untagged specimen. And before he ticks anything, the panel tells him what a tick
*means* — so the coverage strip counts only claims that are true.

<!-- END · claude-code-PHASE-GOLDEN-ASSIST-1-FIX-1-v1_2 · rev 1.2 · 2026-07-13 -->
