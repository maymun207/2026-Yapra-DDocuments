# S132-DISPATCH-RECORD-4 — CARD-MA-RERUN-3-S132-1-v4 on the bus; v3's stop absorbed; the foreman's queue reached EMPTY

Recorded by the Architect, 2026-09-07T10:41:49Z (13:41 TSİ; instant = DB clock of the v4 INSERT). Continues S132-DISPATCH-RECORD-3.

## 1 · What was read (bus, 10:41Z)

| row | direction | name | created_at | consumed |
|---|---|---|---|---|
| 13ee0d46… | from_lane AG-4 | MA-RERUN-3-S132-1-AG4-report-v3 | 09:51:39Z | — |
| 3851d12a… | from_lane AG-5 | FOREMAN-REPORTS-STANDING-S132-1-AG5-report (passes 1–3, appended) | 09:58:13Z | — |
| ac3633f0… | to_lane AG-4 | CARD-MA-RERUN-3-S132-1-v4 | 10:41:49Z | not yet |

### v3 report (AG-4, 09:51Z) — STOPPED at ON-DISAGREEMENT, correctly
- ORDER A.0 PASSED for the first time: `gh secret list` names include `SUPABASE_URL` and `SUPABASE_PARITY_KEY` (names only, dated 2026-08-16).
- STOP cause: origin/master had moved from the card's fence to `52b50354082dd22ba68882c9666a43c75e9ef952` by five `docs/relay/` landings while the card was being read. The lane's drift fence proved the four instrument files byte-identical across the range.
- Verdict: the lane obeyed the card; the CARD was the defect.

### Foreman report (AG-5, three passes) — as the lane reported it, not re-measured by me
- Pass 1: #505 LANDED (S132 standing word); #506 and #507 RED at relay corpus (R-CLAIMS-MISSING · R-DIFF · R-TRIP-HEX), not landed. Finding: the card's ground for excluding #507 ("carries docs/replay/") was FALSE by measurement — #507 was all `docs/relay/`. Correction accepted; my premise, my defect (A-REC-S132-4).
- Pass 2: #509 (v2 report) LANDED under REPORT-ONLY-DRAIN-1.
- Pass 3: #506, #507, #511 (retraction of v2's remedy), #512 (v3 report), #510 (foreman pass-2 report) LANDED, each after a `--no-ff` sync read green at the SYNCED head; `gh pr list --state open` → `[]` with a passing positive control. `eval-canary` and `rule26` named SKIPPED on every landing, not folded into the green.
- Question carried to the Architect by the lane: whether #511 should have landed at all.

## 2 · Rulings by the Architect (within decision rights)

R-1 · **PR #511 (the retraction) landing is RATIFIED.** Master without the retraction carried a remedy that ADR-002 and the owner's founding rule forbid (a service-role credential in a producer window). The retraction is the correction record; landing it was the right call under REPORT-ONLY-DRAIN-1. Nothing to revert.
R-2 · **PR #507 question CLOSED** — landed by the foreman after repair; the "decision on #507" line from RECORD-3 is moot.
R-3 · **F-S132-MASTER-FENCE-DECAYS-UNDER-DRAIN-1** — a measurement card that fences the master tip decays faster than a lane can act on it while the foreman is actively draining; the fix is to fence the INSTRUMENT (blob ids of the files measured), read-and-record master, and never stop on master movement alone. Goes into ARCHITECT-CARD-TEMPLATE-v3.
R-4 · **F-S132-GATE-VERDICT-AVAILABLE-LOCALLY-1** (from the foreman's pass-1 finding) — three report PRs reddened on the same three grammar rules on first push while `auditText` gives the same verdict locally in one command. A first-class local runner (`npm run relay:audit -- <file>`) is a CWF hygiene item; queued in the cinekop TODO §1, not carded this turn.
R-5 · Minor defect in the foreman report, named not fixed (S37-1): the closing heading reads "OPEN PULL REQUESTS AT THE END OF PASS 1" while the measurement it holds is post-pass-3.

## 3 · v4 minted
- `CARD-MA-RERUN-3-S132-1-v4` — preflight GREEN first pass (CP-1…CP-11, staged scripts = origin/master). Local sha256 `ffc6a6408b2636c76807dc43b94d71fe3a37de645287ac0252297579fee96b58` = bus `body_sha256` (drift 0). Row `ac3633f0-984e-4c87-83c9-b613dd71bb01`, 10:41:49.317Z.
- Single change vs v3: ON-DISAGREEMENT binds the five instrument blobs (four lens/persistence files + `vector-live-proof.yml` template), measured 10:33Z over the bridge; master is recorded, never a stop. Credential path unchanged: parity key in CI only; lane proves both Supabase names UNSET at analysis.
- Box: `claude/CARD-MA-RERUN-3-S132-1-v4.md`. Archive: `Claude_Duzenli_Arsiv/S132/`.

## 4 · What waits
- `MA-RERUN-3-S132-1-AG4-report-v4` on the bus → Architect landing card for the PR (workflow + replay artefact, NOT report-only) + owner's named approval → `cwf-sota-definition-v1_6`.
- Docs archive: 6 commits ahead of origin/main after this turn's commit; push order goes on the next AG-5 card, fenced by path prefix + ancestry (F-S132-ARCHIVE-PUSH-FENCES-TIP-1).
- Self-check scheduled ~45 min after the insert.

TAIL ANCHOR: S132-DISPATCH-RECORD-4 ends here.
