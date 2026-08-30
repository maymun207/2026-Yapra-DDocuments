# S125 · DISPATCH RECORD 2 — the header-fix chain and what it surfaced

CUT 2026-08-29 ~13:40Z. Continues S125-DISPATCH-RECORD-1 (S37-1: the presented record is not
edited; the delta gets its own artifact). Every bus row id below is reproducible from
`relay_inbox` by `created_at`.

## 1 · THE CHAIN SINCE RECORD 1

- **The foreman's systemic find (owner-relayed UB screen, ~13:0xZ):** report files written
  without the `relay-audit` header are born-red on the Relay corpus job; twenty-plus report PRs
  stacked since Aug 24; PR #480's landed report is the counter-example carrying the header. The
  A23 phase report was in the class and PR #482's landing was queued behind it.
- **PHASE-A23-REPORT-HEADER-FIX-1-v1** → AG-4, inserted 13:17:43Z (row `89f52ac0…`), preflight
  11/11 GREEN, sha-verified byte-identical. Orders: measure the red first (ON-DISAGREEMENT: green
  or a different file = STOP), add the header as line 1, local gate answers the .json question,
  one commit, push, bus report.
- **GO-LANDING-S125-1-ADDENDUM-1-v1** → AG-5/foreman, inserted 13:24:47Z (row `235ff020…`,
  sha `c68a463a27fdcd03f763a2f123307aac25e8a030d15b9257c19dc2048b321c7e`). Narrows ONE arm of the
  landing card: a corpus red naming ONLY that report file is WAIT-then-re-probe at the new head;
  every other red stays a STOP; the trunk ON-DISAGREEMENT arm untouched; the foreman does not add
  the header itself.
- **AG-4's fix report** (row `f4855222…`, 13:30:38Z) — executed in full, and it carried MORE than
  the header. Summarized in §2; the numbers are the LANE'S readings, relayed:
  pre-fix head `fdf34041c4e4296019d6c376947e3d7253306511` → new head
  `61dbb1d7867cb23e3a82e6b2982dfaf6e6abb616`. ORDER A confirmed the red naming exactly the
  predicted file. At the new head: relay corpus PASS, changes/report-schema/Vercel pass,
  eval-canary SKIPPING (freeze working), build (24.x) and rule26 PENDING at report time (build
  runs ~16 min; the lane refused to report a pending job as a pass — correct under TOTAL-45).

## 2 · WHAT THE FIX SURFACED (new findings, by name)

- **A real regression from the phase's own ORDER B, caught only by the full suite in CI:**
  `clarificationLens.test.ts` (under `api/cwf/_lib/replay/__tests__`) pins every `ctx.x` in
  computeTurnClarification as classified read-or-stamp; the phase's two new fields
  (`clarificationNudge`, `nudgeEvidence`) were unclassified. The lane classified both as STAMPS
  in REPLAY_CTX_STAMPED_FIELDS — the classification the pin demanded, not a weakening — in a
  SEPARATE commit (`11ec8fd8`, source file only) so the header commit (`61dbb1d7`, report file
  only) stays clean against the card's falsifier. Deliberate commit separation ACCEPTED.
- **A-REC-S125-PHASE-CARD-SCOPED-SUITE-1 (Architect defect):** the A23 phase card said both
  "Vitest under api/cwf/__tests__" AND "run the whole suite; a red anywhere STOPS". The lane ran
  the named narrower path (364 files, green); the whole suite is 699 files and the pin lived in
  the other half. The producer's DONE "suite green" was therefore a SCOPED reading relayed as
  whole — the stale-count class wearing a test scope. Standing remedy for future cards: name the
  suite by its command, never by a directory, or name the directory AND say it is partial.
- **Header promotion effect (lane finding, keep for the template card):** adding the header
  PROMOTES a report into the governed grammar — the "one-line repair" cost a CLAIMS table, DIFF
  fence, hex/count fencing, two-lens absence claims, three local-gate rounds. The pattern-level
  cure (report template teaching the header + grammar skeleton) is a ledger item.
- **Whole-suite reading at the fixed tree (lane's run):** 699 files, 10221 passed, 4 expected
  fail; both typechecks clean. No .json touched (the gate never named one); nothing added to the
  frozen exemption list.
- **Row anomaly, small:** the fix report's row carries `lane_addr=operator` while the body
  self-identifies Lane AG-4. Observation only; the foreman's own probes re-derive the head and
  do not depend on this column.
- **Architect stamp imprecision (self-report, A-REC precision class):** the addendum's CLAIMS
  row says "read at 13:26Z"; the bus read was ~13:23Z. Card left standing (S37-1; the reading it
  describes did occur); defect named here instead of a re-cut.

## 3 · STATE AT CUT

Foreman holds GO-LANDING-S125-1-v3 + ADDENDUM-1, no from_lane output yet. build (24.x) and
rule26 expected to answer ~13:46Z at the lane's reading cadence. The owner has NO pending action;
the ⚡ package fires after landing + deploy READY, per Record 1 §4.

TAIL ANCHOR: S125-DISPATCH-RECORD-2 ends here.
