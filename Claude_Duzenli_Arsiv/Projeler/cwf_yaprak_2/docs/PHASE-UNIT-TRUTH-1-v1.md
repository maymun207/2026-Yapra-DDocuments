# PHASE-UNIT-TRUTH-1 · v1 — LANE: AG-2

<!-- PHASE-UNIT-TRUTH-1-v1 · 2026-08-06 · S82 · Architect: Claude (Opus 5).
     ⚡ LANE AG-2 — first job of the second lane. AG-1 is inside Phase B
     (TOOL-EARNED-TRUST-1) touching api/cwf/_lib/turn/stageTools.ts + backends/*.
     THIS PHASE MUST NOT TOUCH THOSE FILES. Its surface is the client render
     layer (src/lib/chatParser.ts · src/lib/chartData.ts · MessageChart) plus one
     server-side derivation module NEW file. Zero overlap by construction.
     Closes BUG-024. ZERO migrations. Touch budget 4. -->

**Anchor:** current `origin/master` at cut time — S82-4: prove the base, don't assert it.
**Branch:** `phase/unit-truth-1`
**MERGE ORDER RULE:** you build and push; **GO may HOLD until AG-1's Phase B merges** —
the Architect sequences merges across lanes, one at a time. Build now, merge when told.

---

## §0 · THE BUG, from its own entry (BUG-024, owner-ruled S81)

One answer, three units, none the source's: the question said **adet** (count), the prose
said **"adedi (metre cinsinden)"**, the table header said **m²** — and the source field
was **`actualQuantityInMeter`**. Not a wrong-number claim; the defect is that **nothing
in the turn ESTABLISHED the mapping.** BUG-018's family: a human-facing number made
untrustworthy by its caption.

**Owner's finish definition (the only acceptance):**
> *"Tablodaki birim, verinin geldiği yerde yazan birimdir. Sistem birim uydurmuyor;
> bilmiyorsa bilmediğini yazıyor."*

## §1 · Where the lie is manufactured — read, verified

`chatParser.ts` accepts the model's `{field, header}` directive dialect and
`chartData.ts` renders `header` as the display label — the code's own comment concedes
*"a header can mislabel, never fabricate a number."* BUG-024 is that concession firing in
production. Meanwhile the source ALREADY carries unit truth, twice:

1. **Field names**: `actualQuantityInMeter`, `…InMeter`-class suffixes (ARMES).
2. **Superset `display_name`**: live turn 03:44Z showed `"Toplam Sarfiyat (M³)"` with
   `data_type` — the backend hands us the unit in the column metadata.

## §2 · G1 — a unit derivation that only speaks when the source spoke

New pure module `src/lib/unitTruth.ts`:

`deriveUnit(field: string, sourceMeta?: {display_name?, data_type?}) →
{ unit: string; source: 'field-name' | 'source-meta' } | null`

- `source-meta` wins when present (a `display_name` containing a parenthesised unit or a
  known unit token — m³, m², m, kg, adet, %, sn/dk/saat).
- `field-name` recognises an explicit, **closed** suffix list (`InMeter`→m,
  `InSquareMeter`→m², `Count`→adet, `Percent`→%, …). Closed and tested — a suffix not on
  the list derives **null**, never a guess.
- **null means null.** No default, no "probably m²" — deriving a unit from convention is
  the exact defect re-created inside its cure.

## §3 · G2 — the render layer trusts the derivation over the directive

In the table/chart label path (`chartData.ts` display-label seam):

- Derivation returns a unit → the label carries THAT unit. A model header claiming a
  **different** unit for the same field is **overridden**, and the mismatch is recorded
  on the ledger (`unitMismatch: {field, claimed, derived}` — count and fields, no values).
- Derivation returns null → the label renders **without any unit**, and where the model's
  header smuggled one in for that field, the unit token is not rendered (the header's
  text portion survives). Absence explicit, never blank: the column tooltip/caption says
  *"birim: kaynakta belirtilmemiş"*.
- **This is a RENDER-LAYER decision on OUR OWN generated captions — it does not rewrite
  the model's prose** (OUTAGE-TRUTH law untouched: prose stays the model's; the
  structured table/chart captions are ours and always were).

## §4 · Red-first proofs

1. `actualQuantityInMeter` + model header "Toplam Üretim (m²)" → rendered label unit
   **m**, mismatch recorded. **Mutation:** disable the override → m² renders, test red.
2. Superset meta `"Toplam Sarfiyat (M³)"` → **m³** (source-meta beats field-name where
   both exist; assert precedence both directions).
3. Unknown field `someValue` + model header with unit → rendered without unit token +
   explicit absence caption. **Positive control:** unknown field + headerless → identical.
4. A field the source labels correctly and the model labels correctly → byte-identical
   render, zero mismatch records (the clean path proves the machine is silent when
   nothing is wrong).

## §5 · Post-deploy proof (S63-1, live, trace named)

The `trace=cb71521b` question re-asked in production: the production table's unit column
reads **m** (from `actualQuantityInMeter`), or renders unitless-with-explicit-absence —
never m² unsourced. Positive control in the same session: the gas question's chart whose
Superset meta says m³ renders m³ unchanged.

## §6 · Standing rules

Report `docs/relay/PHASE-UNIT-TRUTH-1-report.md`, in-branch, same push · `## MERGE` with
the merge commit, never pre-written (S82-3) · S82-5: any new payload/parse field gets a
parser-entry test · S82-4 base proof · no control chars in prose · every claim cites a
command or carries "taken from the brief, not verified" · nothing under the rug ·
question-round-trip count (streak is 4 zeros) · **and state plainly which files you
touched, so the lane-conflict check is a read, not a trust.**
