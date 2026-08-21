# P7-FIX-1 — empty-result empty≠zero path: numeric-zero-ONLY (kill the false-positive absence markers)
**claude-code-P7-FIX-1-empty-result-numeric-zero-only · v1 · 2026-07-11 · AG-lane · single gated FIX**

> Architect RULE-25 finding (Session 36, ground truth `5cc642e`): P7's `checkEmptyResultAsZero`
> is byte-clean, additive, correctly anchored on `recordCount === 0`, and leaves Check 1 / the
> eval-gate untouched — **but it MIS-CALIBRATES a CRITICAL gate.** The generic path treats bare
> `ABSENCE_MARKERS` (`yok/hic/none/no/nil`) as a zero-assertion, gated only by the thin
> `COMPLIANT_MARKERS` allowlist. So a compliant explanation of an EMPTY resultset FALSE-FIRES
> critical. Architect probed 6 compliant-empty phrasings the P7 tests never covered:
>
> | compliant answer over recordCount:0 | P7 as-shipped |
> |---|---|
> | "Bu dataset için veri yok." | **FIRES (false)** |
> | "No data was returned for this query." | **FIRES (false)** — `\bno\b` matched "No" |
> | "…tanımlı değil, sonuç yok." | **FIRES (false)** |
> | "Sorgu sonuç döndürmedi." / "kayıt bulunamadı." / "Sonuç boş." | ok |
>
> The worst case — **"No data was returned" is the EXACT phrasing the check's own `detail`
> recommends** ("Must say 'no data / not returned'"). A model that correctly follows empty≠zero
> gets its correct answer flagged critical. The 6 P7 tests pass only because #2 happens to
> include "görünmüyor" (a COMPLIANT_MARKER). This is the "false-firing critical gate is worse
> than no gate" failure P7 itself pinned. P7 is already merged to master (LIVE) → forward-only fix.
>
> **Root cause = polarity.** For an EMPTY resultset, "no data / veri yok" IS the compliant thing
> to say. The violation is presenting emptiness as the QUANTITY ZERO ("sıfır chart", "0 kayıt",
> "değer 0"), not explaining absence. Bare absence markers do not belong on this path.

---

## 0 · RULE-25 BOOTSTRAP
```
cd /tmp && rm -rf cwf_yaprak && git clone --quiet https://github.com/maymun207/cwf_yaprak && cd cwf_yaprak
git rev-parse origin/master        # MUST be 5cc642e06e61adc377b67f1a77eeebf5fc40367c
npm ci --no-audit --no-fund
```
Anchor = **5cc642e** (1957 tests / 185 files / docVersion rev 66). Branch off master; `--no-ff`; squash BANNED.

## 1 · PRE-FLIGHT (grep-verified)
```
grep -n "ABSENCE_MARKERS\|checkEmptyResultAsZero\|zeroAssertion" api/cwf/_lib/grounding/groundingCheck.ts
#   → ABSENCE_MARKERS (const + docblock) is used ONLY inside checkEmptyResultAsZero's
#     `const zeroAssertion = hasNumericZero(ns) || /\bsifir\b/.test(ns) || ABSENCE_MARKERS.test(ns);`
grep -rn "ABSENCE_MARKERS" api/ src/ shared/   # confirm P7-only (no other consumer) before removing
```

## 2 · HARD CONSTRAINTS
- **C-1 Numeric-zero ONLY on the empty-result path.** `zeroAssertion` becomes
  `hasNumericZero(ns) || /\bsifir\b/.test(ns)` — DROP the `ABSENCE_MARKERS` disjunct. Remove the
  now-dead `ABSENCE_MARKERS` const + its docblock (confirmed P7-only in pre-flight).
- **C-2 Check 1 + eval-gate + Check 2/3 BYTE-UNTOUCHED.** This fix edits ONLY the one disjunct
  and deletes one dead const inside the P7 function. `checkEmptyAsZero` (the ARMES zone path,
  which legitimately uses its own scrap+zero logic) is not touched; `git diff` of evalGate.ts = empty.
- **C-3 Accepted miss, documented (not silently dropped).** Entity-absence WITHOUT a number
  ("böyle bir dashboard yok", "hiç chart yok") will no longer fire at runtime. That is the correct
  trade for killing the false positives; it stays covered at the PROMPT + EVAL-GATE layers.
  DEFERRED with a named trigger: *add entity-absence at runtime via Superset's GOVERNED forbidden
  phrases* (a `multiwordForbidden`-style match over `SUPERSET_BLIND_SPOTS[].forbidden`, mirroring
  Check 1's governed-phrase mechanism) — NEVER a bare "yok" marker (that is exactly what caught
  compliant "veri yok"). Trigger: if prompt+eval-gate prove insufficient for entity-absence in prod.
- **C-4 No new regex, no union** (carried from P7): the path stays anchored on structured
  `recordCount === 0` + the existing numeric-zero detectors.

## 3 · SUB-PHASES
### A — the calibration fix
Edit `checkEmptyResultAsZero`: `zeroAssertion = hasNumericZero(ns) || /\bsifir\b/.test(ns)`.
Delete the `ABSENCE_MARKERS` const + docblock. Update the P7 function's own comment to state the
numeric-zero-only calibration and the C-3 accepted miss.

### B — tests: pin the fix as must-NOT-fire (the regression that let it ship)
Extend the P7 describe block:
- **must-NOT-fire (NEW):** each of `"Bu dataset için veri yok."`, `"No data was returned for this
  query."`, `"…tanımlı değil, sonuç yok."`, `"Sorgu sonuç döndürmedi."` over `recordCount:0`
  ⇒ `{ ok: true, violations: [] }` (no empty_as_zero). These are the exact phrasings that
  false-fired.
- **still-FIRES (regression guard):** `"sıfır chart"`, `"0 kayıt var"`, `"Toplam sıfır kayıt var."`
  over `recordCount:0` ⇒ ONE empty_as_zero critical each (numeric zero still caught).
- **documented accepted miss (C-3):** `"böyle bir dashboard yok"` (no number) over `recordCount:0`
  ⇒ ZERO empty_as_zero at runtime — asserted as the intended post-fix behavior WITH a comment
  pointing to the deferred governed-phrase follow-up (so a future reader knows it is deliberate).
- The original 6 P7 tests stay green (they fire via "sıfır"/"0"; #2 no longer needs "görünmüyor"
  to pass — but leave #2 as-is).

### C — docs / seal / count
- `groundingCheck.ts` is under `api/**` (SEALED). Comment change ⇒ S34-1 reseal budget (AST
  `removeComments` per S35-1, never a raw scanner); bump docVersion.
- If ARCHITECTURE/tab text described the runtime empty≠zero calibration, refine it (numeric-zero
  anchor; entity-absence at prompt/eval-gate + deferred governed-phrase runtime). Two-commit seal
  + `check:doc-drift` `[OK]`.
- Recount (sharded 1/2 + 2/2, sum). Coverage floor holds/ratchets.

## 4 · SELF-VERIFY (paste it)
1. `git rev-parse origin/master` = `5cc642e…` at start.
2. The 4 previously-false-firing phrasings now each return `{ ok: true, violations: [] }`
   (paste the assertions).
3. The numeric-zero cases still fire ONE critical each.
4. `git diff 5cc642e..HEAD -- api/cwf/_lib/grounding/groundingCheck.ts` = the one-disjunct edit +
   the ABSENCE_MARKERS deletion ONLY (no other logic moved); `checkEmptyAsZero` body unchanged;
   evalGate.ts diff empty.
5. Full sharded count + `check:doc-drift` `[OK]` + rev/reseal proof.
6. Remote HEAD after `--no-ff` merge + push.

## 5 · REPORTING CONTRACT
Report the anchor, the fixed must-NOT-fire evidence (all 4), the still-fires regression guard, the
minimal-diff + Check-1/evalGate untouched proof, count/rev/reseal, pushed HEAD. Architect RULE-25
review will independently re-probe the false-positive phrasings (the exact failure this fix closes)
+ confirm the numeric-zero firing cases survive.

<!-- END · claude-code-P7-FIX-1-empty-result-numeric-zero-only · v1 · 2026-07-11 -->
