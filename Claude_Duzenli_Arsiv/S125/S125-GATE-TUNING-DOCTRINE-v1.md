# S125 · GATE TUNING DOCTRINE · v1

MINTED 2026-08-29, S125, from a brainstorm the owner opened: "bu kapıları nasıl tune edeceğiz —
sistem self-discovery/self-tuning yapmalı, insan yalnız gerektiğinde." The claims were verified
against measurement BEFORE this doctrine was written; the verification is §1 and is part of the
document, because a doctrine resting on unverified claims is the stale-count class in doctrine form.

## §1 · THE VERIFIED GROUND

- MEASURED (2026-08-04, MA-RERUN-2, `b0e8c9e2`): whole-corpus ask-rate 38.63% (HIGH+ALT_D),
  like-for-like 55.41%. One in three queries is cut by a gate.
- **THAT ROW IS NOW STALE BY ITS OWN EXPIRY RULE** — the ask seam (PHASE-ROUTE-ASK-1) changed the
  clarify branch order. There is NO current cut-rate figure. Re-measuring is the first act of any
  tuning, and A23's falsifier run is the natural first datapoint.
- MEASURED (trace `cb49f416`, live production, S124): the flagship cut is a DATA defect, not a
  threshold defect — frame put değirmen10 in EQUIPMENT, that layer is declared-empty, the three
  real rows live in armes/line. The gate did its job on a wrong premise.
- Self-discovery EXISTS in code: ADR-009, ADR-010, `selfSeedReconciler` (ABSENCE-ONLY),
  `toolExperienceFlush`, warm-trust, vector suggestion reader (valve `vector.enabled=1`).
- Self-tuning's LOOP IS NOT CLOSED: shadow evidence (`wouldHaveAsked`, `askEvidence`,
  `clarifyRead`) is stamped on every frame-bearing turn but nothing routes it back into
  configuration. Sense and muscle exist; the spinal cord does not.
- The binding fence (project box §8): learning improves how the agent FINDS, never what it KNOWS.
  Honesty gates (empty≠zero, ALT-D write permission, grounding) are never relaxed by learning.

## §2 · THE THREE CUT CLASSES — each with its own tuning mechanism

| class | example | mechanism | human share |
|---|---|---|---|
| DATA-missing (registry gap) | cb49f416: wrong layer mapping, missing alias | FULLY AUTOMATIC — ABSENCE-ONLY self-seeding, alias candidates from vector near-misses, A23 layer-scope fix | zero |
| QUALITY-low (right cut, poor question) | generic "which entity?" instead of named offer | SEMI-AUTOMATIC — ask seam + vector suggestions; quality improves from experience data | one valve flip, once, owner |
| VERDICT-wrong (gate should not have cut / should have and did not) | ALT-D write permission, COMPARE threshold | NEVER AUTOMATIC — replay lens produces a named candidate; the owner rules | every change |

## §3 · THE LOOP TO CLOSE — four steps

1. **SENSE (exists):** every cut stamps structured evidence, shadow counters included. Missing
   piece: FAILURE-LESSON #48 — each cut becomes a lesson row.
2. **DIAGNOSIS (half-exists):** the replay lens can classify cuts mechanically — cb49f416's
   signature (declared-empty + sibling layer holding rows) is a detectable pattern. A periodic
   lens pass reports "N cuts, M data-class, here are the candidates". Infrastructure exists;
   the pass does not.
3. **REFLEX (to build):** data-class candidates auto-apply via ABSENCE-ONLY writes (reversible,
   never overwrites, zero C1 contact). Verdict-class candidates queue to the owner.
4. **BRAKE (to build, MANDATORY):** GOLDEN-SET #37 + EVAL-SPLIT #30. No automatic tuning is
   legitimate without the regression floor and the train/test split. A reflex without a brake is
   a gate that loosens itself.

**The missing pieces of all four steps ARE the seven off-ledger items.** The ledger re-entry card
is not housekeeping; it is the self-tuning program itself.

## §4 · OWNER RULINGS RECORDED HERE (S112-YASA-1 — design contributions by name)

- **OWNER (S125): the LOW/time gate rides the A23 package.** His words: "bir şeyleri sonraya
  bırakıp dağıtmayalım diye karar almıştık… o fonksiyon %100 bitsin, yanına check mark koyalım."
  S61-2 applied by the owner before the Architect proposed it. A23's card therefore carries LOW's
  disposition in scope, and #29's close covers the whole clarify function, LOW included.
- **OWNER (S125, earlier the same session): the frame itself** — "kapılar gıcırdamadan çalışmalı;
  sistem self-tuning yapmalı, insan yalnız gerektiğinde" — is the owner's design statement this
  doctrine implements. The Architect's contribution is the three-class split and the loop; the
  requirement is his.

## §5 · CADENCE (Architect's single path, changeable by one owner word)

Verdict-class candidates reach the owner AS THEY ARISE, one message, one decision — the owner's
existing "tamam/başlat" rhythm. Batching is deferral in polite clothing.

## §6 · ORDER — unchanged by this doctrine

A23 first (largest cut class's data fix + re-measure of the stale rate), then valve + shadow read,
then the ledger re-entry card builds brake and reflex. This doctrine adds no new work item ahead of
the sixteen; it names the mechanism the already-ordered items serve.

TAIL ANCHOR: S125-GATE-TUNING-DOCTRINE-v1 ends here.
