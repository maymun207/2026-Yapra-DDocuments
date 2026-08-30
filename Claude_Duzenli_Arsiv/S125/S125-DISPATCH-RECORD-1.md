# S125 · DISPATCH RECORD 1 — the archive close, the A23 phase, the landing chain

CUT 2026-08-29 ~11:30Z, mid-session. Ground: master `3aab649dfbab5360c52aab58db839d0905649fa6`
(wire-read by two boots and the scout's 11:14Z probe, agreeing). Every bus row id below is a claim
reproducible from `relay_inbox` by `created_at`.

## 1 · WHAT LANDED (chain, in order)

- **ARCHIVE-PUSH-S124-1** — v3 cut after v2 was orphaned by the first producer window's death;
  scout round 29 GREEN; AG-4 (reclaimed 08:00:39Z on owner confirmation) executed in full: stale
  lock removed under the lsof discipline (holder resolved to the VM mount layer via ps), thirteen
  files staged BY NAME, commit `3f5816e5a8d0d42bbaff36142b8d9299d55fecca`, push read back. The
  S124 close is on GitHub.
- **PHASE-A23-LAYER-SCOPE-1** — v1 RED in round 30 (two real design findings), v2 GREEN-equivalent
  chain (round 31 after a transport re-emission), dispatched 10:06Z. AG-4 built ORDER A, STOPPED
  correctly on an unpredicted red (MODE B: widening traded a named-empty for silence — empty≠zero),
  filed three shapes; RULING-1 took shape 1 (widen only for a frame with surfaces); DONE at
  10:53Z — 5556 tests green, protected tests untouched, PR #482 open NOT merged. The lane also
  correctly REFUSED the card's migration instruction (the valve decl self-seeds through the gated
  publish path; a migration would be a second writer) — accepted.
- **GO-LANDING-S125-1** — v1 RED in round 32 (MERGE-KEY and PR-STATE probes missing, both
  additive; scout donated two wire readings: branch head `fdf34041c4e4296019d6c376947e3d7253306511`,
  LEVEL=YES @11:14Z); v2 in round 33 at cut time. A new producer window HALTED at the claim walk
  exactly as designed (five addresses held, no death certificate) and asked for the human lens;
  the owner was asked to confirm AG-5 (`a8b3344…`) as the leased replacement.

## 2 · FINDINGS AND A-RECS OF THE DAY (for the ledger re-entry, by name)

- **F-S125-NFD-LENS-1** — nine tracked files with Turkish names read as untracked in a Linux
  bridge shell (NFC index vs NFD readdir; core.precomposeunicode is macOS-only). Same disk, two
  lenses, two answers. The stale-count class travelling through a FILESYSTEM NORMALIZATION.
- **F-S125-SCOUT-BOOT-HUNG-1** — a scout window froze at "Thinking · 150 tokens" mid-boot; the
  stop button was dead too; only window death recovered it. HUNG is outside-visible only; the
  owner's eye was the lens, twice. Cost class: spend without output.
- **A-REC-S125-ARCHITECT-HAND-B64-1** — a hand-carried 23KB base64 lost ONE SPACE; the digest
  read-back caught it; the repair was a server-side replace verified by digest. Standing remedy:
  card transport is server-side copy or digest-checked decode, never hand-typed.
- **A-REC-S125-CARD-MOVED-PINS-UNNAMED-1** — the A23 card ordered a behaviour change without
  naming the test pins it would move, while also saying "a red anywhere STOPS". The lane paid the
  contradiction; RULING-1 named the re-pins.
- **Lane finding (AG-4):** the TEST probe is not side-effect-free — authorityMatrix.test.ts
  rewrites a ground stamp; a second derived file (facts.json moduleCount) moves and is OWED.
- **Window findings (halted producer):** budget-fence run red (standing "izle, aksiyon yok" ruling
  covers it; only a fired STOP escalates) · two leftover probe refs from
  PHASE-LANE-CLAIM-WITHOUT-FORCE-1 (cleanup ledger item).
- **Scout process yield:** the digest CONVENTION line (adopted round 29) took recomputations from
  six to zero; round 31's corrupted row was caught INDEPENDENTLY by the scout before the
  re-emission reached it — the gate worked in both directions.

## 3 · OWNER RULINGS RECORDED TODAY (S112-YASA-1)

- LOW/time rung rides the A23 card ("dağıtmayalım, %100 bitsin") — executed in the phase.
- Gate-tuning frame ("kapılar gıcırdamasın; self-tuning, insan yalnız gerektiğinde") — doctrine
  cut as S125-GATE-TUNING-DOCTRINE-v1.
- Priority statement: CWF 100% + ALL VALVES OPEN, soonest — recorded verbatim in
  S125-EAIP-COLDSTART-PROCESS-v1 §0 (that doc is DRAFT, walk-through owed).
- mcp-honestbench re-published PUBLIC (owner statement) — one of four owner-package items closed.

## 4 · WHAT COMES AFTER THE LANDING (the queue as it stands)

1. Vercel deploy verification, then the WOULD-HAVE-ASKED shadow read.
2. THE OWNER PACKAGE, one message: A1 vendor call (floor: ≈289 MiB resident, idle CPU ≈0 — Fly
   allocation-billed at the smallest tier is the standing single-path recommendation, Railway named
   as the honest alternative with the CMD-change card first) · A2 credentials + ARMES rotation
   (env-only, never pasted) · A5 spend (R4's provisional $10/round stands; the first metered round
   produces the actuals that replace the estimate — BENCH-SMOKE-1's report carries no cost figures,
   measured today: the harness landed, the metered run needs A1/A2).
3. Valve package to the owner: askOnUnresolved + nudgeOnTimeUnclear, shadow counts attached.
4. GI-101 close on the owner's screen (three plants offered) + his two-item #29 ruling.
5. Ledger re-entry card (the seven off-ledger items + today's findings above).

TAIL ANCHOR: S125-DISPATCH-RECORD-1 ends here.
