# PHASE S54-POLISH-2 — F141 chart hour labels · F87 admin UUID→name · F137 pin · DEP0169 ID

<!-- claude-code-PHASE-S54-POLISH-2-v1 · rev 1 · 2026-07-20 · Architect: Claude (S54)
     Executor: AG. Register-drain batch (S54-2): client-only, window/freeze-safe. -->

## 0 · PRECONDITION (S47-1)
Valid ONLY while `origin/master == 4d44c740682d40f501f5b170a7e0a2dcaeda4c3f` (Merge
PHASE S54-POLISH-1) and no OPEN PR touches `src/lib/chartData.ts`,
`src/components/ui/cwf/MessageChartContent.tsx`, or `src/components/admin/**`.
On mismatch: **STOP and report actual state.**

## 1 · Work items (register wording is binding)

**W1 · F141 (cosmetic, register v52):** per-zone daily charts repeat a truncated
date (`"2026-07-1…"`) as EVERY x label; single-day ranges should label by hour —
**the combined chart already does this correctly.** Root shape = two divergent
tick-formatting paths (the F144 lesson again). Fix: extract the combined chart's
single-day→hourly / multi-day→date tick logic into ONE shared exported formatter
(in `src/lib/chartData.ts`) and make BOTH chart paths consume it. Search field:
`src/lib/chartData.ts` + `src/components/ui/cwf/MessageChartContent.tsx` (the
F63 epoch-axis fix lives there — locate the existing day/hour logic by content).

**W2 · F87 admin remainder (register v52/v44):** viz surfaces are CLOSED
(turnLabelMap); **admin panels still print raw zone UUIDs.** Fix: enumerate the
admin render sites that print UUID-looking values from turn payloads (at minimum:
stage-context `'11'` tool-loop + `'12'` grounding cards, Inspect event-detail
payload views — enumerate by grep, don't assume), and resolve them through the
EXISTING `src/lib/turnLabelMap.ts` util against that turn's recorded tool
results. Honest fallback where unresolvable: `xxxxxxxx… (ad çözümlenemedi /
name unresolved)` — short-UUID + bilingual note, NEVER a fabricated name.
Sites with NO turn-context data source in hand are OUT of scope: list them in
the report instead of inventing a new data path (no live backend call from
admin, no new endpoint).

**W3 · F137 residual verify (register v52):** the always-bilingual chip fix is
merged; owner screenshots post-fix still showed EN-only (suspected crop).
Convert the eyeball-verify into deterministic proof: locate the chip fix site,
add/extend a component test pinning that the rendered chip text contains BOTH
the TR and EN strings, and paste the rendered output in the report. (Owner
glance becomes optional; automation-first.)

**W4 · DEP0169 (S54 error-ledger noise):** `url.parse()` deprecation, 43×
across admin routes since Jun 27. Own-code grep is already proven ZERO
(`grep -rn "url\.parse(" api src shared` — re-paste it). Identify the emitting
DEPENDENCY (targeted `node_modules` grep and/or `node --trace-deprecation`
against a local invocation), then write a one-paragraph `.agents/` note naming
the offender: "dep-internal, no own-code fix; revisit at next dep upgrade."
**NO fix, NO api edit** — identification + documentation only.

## 2 · Profile & compliance
- **Ceremony: HOTFIX** (client-only cosmetic/mechanical; NO api/shared/supabase
  surface): targeted tests + neighbors locally, single pass, light Architect
  review. **Unsharded CI on the PR head remains the SOLE test arbiter** (S37-2
  — profiles lighten the local ritual, never CI).
- **Hard scope law:** if ANY work item turns out to require touching `api/**`,
  `shared/**`, or `supabase/**` → do NOT touch it; finish the other items and
  report that item back with the blocking reason. (Escalating the profile is the
  Architect's call, not in-phase.)
- **PLATINUM:** zero manual/config steps introduced; fallbacks self-disclose.
- Mapped-file footgun (your own KB lesson): `chartData.ts`/`MessageChartContent.tsx`
  may be doc-mapped — budget a conditional reseal (expect rev 117 if the drift
  gate flags; final commit; grep-verified script name).

## 3 · Binding constraints
1. Touched prod files: `src/lib/chartData.ts`, `src/components/ui/cwf/MessageChartContent.tsx`,
   the enumerated admin components from W2/W3 — **all under `src/`**. Plus tests,
   `.agents/` APPEND (S53-1), conditional manifest reseal. Nothing else;
   `git diff --name-only 4d44c74..HEAD -- api/ shared/ supabase/` must be EMPTY.
2. W1 is an extraction, not a redesign: the COMBINED chart's rendered labels stay
   byte-identical (characterization test BEFORE the extraction; same pattern as
   SC-2's asOfGovernedSlice proof).
3. W2 resolution is read-only over already-recorded turn data; `turnLabelMap.ts`'s
   own logic (incl. MAX_DESCENT_DEPTH=3) is CONSUMED, not modified.
4. Naming-collision grep: `grep -rn "S54-POLISH-2\|sharedTickFormatter\|formatChartTick" src api shared`
   → no pre-existing uses (adjust the new formatter's name if taken).

## 4 · Gated steps
- **G0** pre-flight: rev-parse == `4d44c74…a3f` (paste) · `npm ci` · grep-verify
  script names (S32-1) · paste 2-3 surrounding lines for every anchor you will
  edit (combined-chart tick logic, per-zone tick site, each W2 UUID render site
  — enumerate them ALL here, this list IS the W2 contract, plus the W3 chip site)
  · branch `s54-polish-2`.
- **G1** W1: characterization test on the combined chart's current labels →
  extract shared formatter → per-zone path consumes it → single-day per-zone
  series now labels by hour; multi-day by date (both tested).
- **G2** W2: per enumerated site — thread the turn's recorded tool results into
  `turnLabelMap` resolution; bilingual fallback exactly as §1; one test per
  site class (resolved + unresolved fallback).
- **G3** W3: bilingual-pin test + rendered-output paste.
- **G4** W4: own-code zero-grep re-paste + offender identification evidence +
  `.agents/` note.
- **G5** ledger + conditional reseal; targeted vitest tail pasted.

## 5 · Self-verify (paste literal evidence)
1. G0 rev-parse output. 2. Branch head SHA + PR # + CI link, **CI GREEN**.
3. `git diff --stat 4d44c74..HEAD` + the EMPTY api/shared/supabase name-only
   proof. 4. Formatter SSOT grep: exactly ONE tick-formatter definition, both
   chart paths import it. 5. W2 site table: site → resolved-via / fallback /
   out-of-scope(reason). 6. W3 rendered chip text (TR+EN visible). 7. W4
   offender name + trace evidence. 8. Drift-gate output ([OK] or reseal rev
   117). 9. One-line PLATINUM statement.

## 6 · Report & merge protocol
Push branch, open PR, post §5. **Do NOT merge.** Architect light review → GO.
Upon GO only, merge `--no-ff` with this exact message:

`Merge PHASE S54-POLISH-2: F141 per-zone hour labels via shared tick SSOT, F87 admin UUID→name labels, F137 bilingual pin, DEP0169 identified`

Post-merge: delete remote branch `s54-polish-2`; prod verification Architect-side.

<!-- END · claude-code-PHASE-S54-POLISH-2-v1 · rev 1 · 2026-07-20 -->
