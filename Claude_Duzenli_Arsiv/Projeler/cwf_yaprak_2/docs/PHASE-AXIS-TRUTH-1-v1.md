# PHASE-AXIS-TRUTH-1 · v1

**Closes:** `BUG-018` (`REGISTER-BUG-BUCKET-v13` §BUG.1) — queue position 2.
**Lane:** Author = AG. **Migrations: ZERO.** **New surfaces: ZERO.**
**Anchor:** `origin/master` = `338e538056e471c950dbaaa17c8bf7ed22996a31`.

---

## §0 · BOOTSTRAP

```bash
rm -rf /tmp/axis && git clone https://github.com/maymun207/cwf_yaprak.git /tmp/axis
cd /tmp/axis && git fetch --all
git rev-parse origin/master     # MUST be 338e538056e471c950dbaaa17c8bf7ed22996a31
grep -oE '"docVersion"[^,]*' public/architecture/manifest.json   # MUST be rev 193
ls supabase/migrations | wc -l  # MUST be 67
```

**S80-1:** every write uses an absolute path.
**Branch `phase/axis-truth-1`. Push the branch AND open a PR** — `push` fires CI
only on master, so the PR is the trigger. Habit is not an instruction.
**Baseline: 452 files / 5124 tests** (CI-arbitrated on `338e538`; report what CI
prints and flag any disagreement).

---

## §0.1 · THIS BRIEF'S FALSIFIER

> **If the axis labels are being truncated by string logic rather than clipped by
> the axis gutter, this brief's mechanism is WRONG — stop and say so.**

The Architect's reading, stated so it can be checked rather than trusted:
`src/components/ui/cwf/MessageChart.tsx:283-288` renders
`<YAxis width={44} … tickFormatter={fmtTick} />`, and `fmtTick` (`:118-121`) is
`v.toFixed(Math.abs(v) < 10 ? 1 : 0)` — so a tick of 340000 formats to the full
six-character string `"340000"` and nothing in the code shortens it. **Verify
both lines yourself before writing anything.**

---

## §1 · THE DEFECT

Production, 2026-08-05, a bar chart of natural-gas consumption per line. Y-axis
ticks rendered top-to-bottom: **`40000 · 55000 · 70000 · 85000 · 0`**. The table
directly beneath the same chart: FIRINALT 111179, FIRINUST 209979, Glazur3
195577, **Glazur4 337704**, Glazur5 249645. The tallest bar touches the top tick.

Five evenly-spaced ticks over that domain are `340000 · 255000 · 170000 · 85000 ·
0`. Against what rendered:

| Should read | Rendered | Chars |
|---|---|---|
| 340000 | **40000** | 6 → 5 |
| 255000 | **55000** | 6 → 5 |
| 170000 | **70000** | 6 → 5 |
| 85000 | 85000 | 5 → 5 ✅ |
| 0 | 0 | ✅ |

**Every six-character label loses exactly its leading character; every
five-character label survives.** The spacing is exactly 85000 throughout, which
is what makes this derivation rather than guesswork.

**MECHANISM.** `width={44}` is the axis gutter in pixels. Tick text is
right-anchored, so overflow is clipped on the LEFT. At the default tick font a
six-character label exceeds 44px and loses its first glyph. The formatter is
innocent; the gutter is too narrow for the numbers this product actually shows.

**WHY THIS IS THE WORST DEFECT FOUND THIS WEEK.** Everything else fails
visibly. This one **succeeds while lying to a human eye**: data correct, bar
proportions correct, tooltip correct (209979), table correct. Only the axis
lies — and an operator reads a number **8.5× too small** about his own factory.

---

## §2 · GATES

### G1 — the formatter carries magnitude, and the gutter fits it

Two knobs, and **both must move together or the bug returns one order of
magnitude later:**

1. **`fmtTick` becomes magnitude-carrying** for large values — a compact form
   with an explicit unit suffix (`340B` / `340K` — pick one and use it
   everywhere), never a silently shortened digit string.
2. **The gutter is sized from the longest label the formatter can emit**, not
   from a constant that was right for four-digit factory counts.

**FORBIDDEN:** widening `width` alone. It hides today's magnitude and returns at
the next one. **Also forbidden:** any format that drops magnitude without a
suffix — that is this bug wearing a different mask.

### G2 — the invariant test, and it must RED on today's build

Two assertions, both pure, both over a value sweep that includes 4-, 5-, 6- and
7-digit ticks and negatives:

- **ROUND-TRIP:** the formatted label, parsed back, equals the tick value within
  the format's own declared precision. `"40000"` parsed from a 340000 tick fails
  this. **This is the assertion that reds on the current code.**
- **FIT:** `label.length ≤ maxChars(gutterWidth)` for the gutter actually
  configured, with `maxChars` derived from the tick font rather than guessed.
  A label that cannot fit is a label that will be clipped.

**Prove the test can fail (S82-2, and this phase is small enough that there is no
excuse):** run it against the pre-fix formatter, show it RED; apply the fix, show
it GREEN. Both outputs in the report, not a sentence claiming both.

### G3 — the tooltip and table are the control, and they are byte-unchanged

The tooltip already reads correctly (`209979` observed live) and the table is
correct. **Neither may change.** If a shared formatter is refactored, assert that
the tooltip and table paths still render full precision — a fix that makes the
axis compact and drags the table with it has traded a lie for a loss.

### G4 — every chart surface, not just the one that was screenshotted

`fmtTick` is one site; `src/dev/ChartUpliftPreview.tsx` is another surface that
renders the same component. **Census the axis-rendering call sites and state the
count.** If a second component configures its own gutter, it has the same defect
and is in scope. Do not fix only the site named in §1 — the grep floor above is a
FLOOR, not a ceiling (the M1F2A lesson: a 31-site grep floor was exceeded by a
44-site AST census).

---

## §3 · DOCS & DRIFT

Obey the drift gate by READING the tabs. Expectation, and it is the Architect's
and therefore falsifiable: `src/components/ui/**` is a render surface — if no
narrative tab maps it, this is **reseal-only**. If a tab does drift, say which
and why the expectation was wrong.

---

## §4 · REPORT

1. Branch HEAD and PR URL.
2. CI: four required gates named with conclusions (`eval-canary` skipped on PR is
   expected and is not a pass).
3. Test counts before → after **as CI prints them**.
4. **G2's red/green pair, four outputs** — pre-fix RED, fix applied, post-fix
   GREEN, and the mutation (restore the old formatter → RED again).
5. G4's census count and every site touched.
6. The chosen suffix convention, stated once, and where it is defined.
7. Anything in §1–§3 you found to be wrong. The Architect's last brief carried a
   premise error that AG caught; assume this one does too.

---

## §5 · POST-DEPLOY PROOF (S63-1 — merge is not proof)

After the merge lands and the deployment SHA is named: the **same question**
re-asked in production renders a chart whose **top tick reads the full value**,
cross-checked against the maximum in the table rendered in the same response.
Screenshot plus the trace id. **BUG-018 closes there, not at merge**
(BUG-CARRY-1 rule 4).

---

## §6 · OUT OF SCOPE — named so nobody absorbs them

- **`BUG-019`** (outage dressed as scope refusal) — its own phase, position 3.
- **`BUG-020`** (burst guard) — position 4. Do not add rate limits here.
- **`BUILD-TYPEGATE-DEAF-1`** — the Vercel function-layer type errors visible in
  the `338e538` build log. **Not this phase.** Recorded so nobody "helpfully"
  fixes twenty unrelated type errors inside an axis change.
- Any chart feature, legend, colour or layout work. This phase changes what a
  number READS, nothing about what the chart IS.

<!-- END · PHASE-AXIS-TRUTH-1-v1 · closes BUG-018 on proof · zero migrations -->
