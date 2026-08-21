# PHASE — INSPECT-VERDICT-1 · FIX-1 · v1
<!-- PHASE-INSPECT-VERDICT-1-FIX-1-v1 · 2026-08-03 · S79 · rollout plan 1.2b
     tail. Owner-raised on the live panel; the design fault is the
     ARCHITECT'S, named in §0. Authored on reads run this session against a
     fresh clone at origin/master = 11061d8c. ONE self-contained relay (D-2).
     STOP-FOR-REVIEW at the end. Do NOT merge. -->

## §0 · WHY THIS EXISTS (the fault is mine, stated plainly)
The owner opened the shipped panel and asked three questions the control
could not answer: why is the only filter the NEGATIVE one, is the button on
or off, and does anything about it change when pressed. All three are fair,
and the first is an Architect error — **I** wrote "one control: yalnız 👎"
into the phase brief. You built what was asked and added `aria-pressed` on
your own initiative, which was right.

The reasoning behind that brief was triage (the work is in the 👎s), and
triage does not license asymmetry: the panel renders a TWO-VALUED
vocabulary (helpful / not helpful chips) and offers a ONE-VALUED filter.

Three concrete defects follow, and the third is the serious one:
1. **State lives in a single weak channel.** `variant={onlyDown ?
   'secondary' : 'outline'}` — background fill only. The icon is fixed, the
   label is fixed, no count, no chip. On a dark theme, beside five sibling
   outline controls, that difference is close to unreadable.
   `aria-pressed` is correct and invisible.
2. **Asymmetry.** No way to isolate 👍 at all.
3. **A filtered-empty panel is indistinguishable from a broken one.** There
   are ZERO `down` verdicts in production today, so pressing the control
   empties the list completely and the body renders the generic
   `Veri yok (boş liste — sıfır değil).` (InspectTab.tsx:451). "I filtered"
   and "this panel is broken" become the same screen. That is this repo's
   own empty≠zero law, unapplied at the filter layer — and it is exactly the
   class of fault this phase's own two mutation findings were about: a
   property asserted but never measured.

## §1 · HARD PRE-FLIGHT (any mismatch = STOP and report)
Fresh FULL clone (`git rev-parse --is-shallow-repository` → false), branch
from **`11061d8cb4280d2499fc1ccbdfc3231463d1b8e0`**.
1. `git rev-parse origin/master` → `11061d8c…`
2. `ls supabase/migrations/*.sql | wc -l` → **65** (this phase adds ZERO)
3. Baseline suite re-proven on the untouched clone → **424 files / 4708
   tests**
4. `grep -oE '"docVersion": ?"[^"]*"' public/architecture/manifest.json`
   → **rev 181**
5. `grep -n "onlyDown" src/components/admin/InspectTab.tsx` → expect
   exactly five hits (:138 state · :255 predicate · :278 dep array ·
   :382 variant · :385 aria-pressed). A different count means the file
   moved under me — STOP and report.

## §2 · WHAT IS TRUE TODAY (read this session — do not re-derive as opinion)
- The sibling vocabulary to match is the `type` dropdown:
  `const TYPES = ['all','message','llm_call','tool_call','error']`
  (InspectTab.tsx:51), rendered as a `Select` whose `all` option reads
  `t('hepsi','all')` (:373).
- The verdict predicate is one line inside `turnPasses`:
  `if (onlyDown && verdicts.get(turn.turnId)?.verdict !== 'down') return false;` (:255).
- The tiers-view empty body is :451; the events-view empty row is :518
  (`TableMessageRow`). Both currently say the same generic sentence.
- `verdictsFailed` already drives an honest marker in the filter bar
  (INSPECT-VERDICT-1 G4). That marker stays exactly as is — it answers a
  different question ("the lookup broke") and must not be merged with the
  new one ("your filter matched nothing").

## §3 · BINDING CONSTRAINTS
1. **Zero migrations, zero governed writes, zero publishes, zero Operator
   steps, no new env var, no secret.** Client-surface only.
2. **The producer and both read doors are frozen.** No change to
   `api/admin/turn-feedback.ts`, `TurnFeedbackRepository`,
   `feedbackService.loadFeedbackForTraces`, or
   `adminService.listTurnFeedbackAdmin`. The door condition
   (`crossUserDoor`) stays ONE value consumed by both readers — do not
   touch it.
3. **The three hard rulings hold**; `feedbackPipelineIsolation.test.ts`
   stays byte-unmodified and green.
4. **Do not merge the two empty-states.** "No turns matched your verdict
   filter" and "the verdict lookup failed" are different facts with
   different remedies and must render as different sentences.
5. RULE 26: nothing clips at 1280 and 1024, rendered evidence or not done.
   The filter bar is already crowded — this replaces a control, it must not
   widen the row.

## §4 · GATED SUB-PHASES

### G1 · The control becomes a stated value, not a pressed state
Replace the boolean `only 👎` Button with a `Select` in the SAME shape and
size as the `type` dropdown beside it, three options:
`hepsi / all` · `👍 faydalı / helpful` · `👎 faydasız / not helpful`.
- State is now READ, not inferred from a fill: the trigger shows the chosen
  value as text. The "is it on?" question stops existing.
- Symmetry arrives for free — 👍 is isolable, which the chips always
  implied and the filter never allowed.
- A dropdown also READS as a filter. A thumbs-down button sitting in a panel
  full of thumbs-down chips can be misread as "am I voting?" — a real
  ambiguity in a surface whose entire subject is voting.
- Keep an `aria-label` in the file's existing style (`t('oy filtresi',
  'verdict filter')`); the Select carries its own accessible state.
- Rename the state accordingly (e.g. `verdictFilter: 'all'|'up'|'down'`)
  and update the predicate at :255 — a turn passes when the filter is `all`,
  or when its verdict equals the filter. **A turn with NO verdict passes
  only under `all`** (absence is not a verdict, and must never be swept into
  either bucket).

### G2 · A filtered-empty panel says WHY it is empty
When the result set is empty AND `verdictFilter !== 'all'`, both empty
states (tiers :451 and events :518) render a DIFFERENT sentence naming the
cause and the remedy — the filter is the reason, and clearing it is the
exit. Keep the existing generic sentence for a genuinely empty window.
Write it in the file's `t(tr,en)` style; keep it one line, no new component.
This is the phase's real payload: today, pressing the control produces an
empty panel that looks broken, because production carries zero `down`
verdicts.

### G3 · Tests (the property, not just the effect)
The existing filter test proves it NARROWS. That is the effect; these prove
the properties the owner actually asked about:
1. **State is readable without colour:** the active selection is present as
   TEXT/accessible value in all three states — a test that would still pass
   if every colour in the file were identical. (The old control fails this
   by construction: assert that in your own words in the test's comment.)
2. **Symmetry:** selecting 👍 isolates the up-voted turn and hides the
   down-voted one; selecting 👎 does the reverse. Both directions, one test
   each — not one test and an assumption.
3. **Unvoted turns are excluded from BOTH** filters and present under
   `hepsi`.
4. **Filtered-empty ≠ generic-empty:** with a filter active and zero
   matches, the rendered sentence differs from the no-data sentence; with no
   filter and zero rows, it is the generic one. Assert the two are not the
   same string.
5. **The failure marker is untouched:** with `verdictsFailed` true, the G4
   marker still renders and is NOT replaced by the new filtered-empty line.
- RULE 26 e2e at 1280 and 1024 with the new Select in the bar, filter
  active, list empty.

### G4 · Docs
CHANGELOG + KB lesson + `reseal` (181 → **182**) + `check:doc-drift` [OK],
in the SAME commit as the code. The KB lesson worth recording is the general
one: **a toggle whose only state channel is a background fill is a control
that cannot be read**, and a filter that can empty a panel owes the reader
the reason it is empty.

## §5 · SELF-VERIFY (literal evidence, no adjectives)
1. `git rev-parse origin/master` at start · branch name · head sha.
2. The §1 five pre-flight outputs.
3. `git diff --stat 11061d8c..HEAD` + full file list.
4. Suite before/after with the delta explained per file.
5. `tsc -b` + `typecheck:api` clean.
6. Isolation-fence test: byte-unmodified (empty `git diff`) and green.
7. `git diff 11061d8c..HEAD -- api/` → expect **EMPTY** (client-surface
   only; if anything under `api/` moved, name why or STOP).
8. reseal 181 → 182 + doc-drift verdict.
9. RULE-26 evidence at both widths, filter active and list empty.
10. Zero migrations · zero governed writes · zero publishes · zero Operator
    steps — or name what you needed and STOP instead.

## §6 · STOP-FOR-REVIEW
Push `phase/inspect-verdict-1-fix-1`, open NO PR, merge NOTHING, hand back
the report.

<!-- TAIL ANCHOR (S61-3): this relay ends after the words "hand back the
     report." and this comment. Missing line = truncated relay — request a
     re-send before acting. -->
<!-- END · PHASE-INSPECT-VERDICT-1-FIX-1-v1 -->
