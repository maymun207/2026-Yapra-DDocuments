<!-- relay-audit: v1 kind=order -->
ORDER-SCOUT-REVIEW-E1-CARDS-S161-1-v1

LANE: scout (scout-1 window; fresh; one order per window)
fanout: personalized (one lane, one body)
FROM: Architect, S161, 2026-09-28T00:35Z
OWNER APPROVAL: OWNER-APPROVAL-S161-PLAN-1 ("onay S161 planı", 2026-09-28 02:37 TSI, plan step P7).
NO POLL OR CRON TASK. FORBIDDEN: any repo edit, commit or push; printing any environment value; any DB write; leaving the sandbox except for gh reads, named as unsandboxed.
PRECONDITION: master is c58438b59cff4d1d403634b28e44af9b01db6dea (verify with gh api, print the 40-hex).

TASK: adversary review of TWO cards (both NEW subjects, 12.1), read from the doc repo (they are NOT on the bus until GREEN):
- "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S161/CARD-E1C-BACKEND-NAME-GATE-S161-1-v1.md"
- "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S161/CARD-E1A-EXAM-SETS-AND-BAR-S161-1-v1.md"
(md5s in the Architect's boot text). MEASURE, do not opine; print MEASURED/READ/UNMEASURED with the command for each item.
E1-c: (1) does any backend-name gate or count script already exist at master (scripts/, .github/, package.json)? (2) run the card's grep classes at master and print the per-id, per-variant counts — is the "50 files / 71 matches" figure reproducible? (3) does the whole-word matcher the card describes miss any spelling the code uses (e.g. `armes_` prefixes, `ArmesClient`)? name them. (4) the CI step placement: does the build job's CI-DIET path filter skip the step on some diffs? quote the lines.
E1-a: (5) does an exam-set / acceptable-label / held-out mechanism already exist anywhere (grep 'exam', 'heldOut', 'held-out', 'acceptable', 'labels' in api/ scripts/ src/; check goldenSpecimens, routerAbLens selection, llmScanTask scoring set) — if yes, the card must become a narrower wiring; (6) golden_specimens: confirm the columns at master's migrations; does any migration already touch it; (7) can the recorded router output (offeredToolNames in turn_trace_digest / messages) support Recall@1 scoring per backend WITHOUT a live call — quote the fields; (8) agentParams decl pattern: quote one existing decl and its Rules UI exposure so the three K25 params follow it; (9) is the golden mark door in HealthTab.tsx the right UI home, or does a Replay/Eval tab exist (12.6: consumer, not definition)? (10) the three witness turns: can you locate T1/T2/T3 message ids read-only (turn_trace_digest by timestamp) and print them? (11) anything in either card that touches the LIVE routing path (S102-YASA-3) — must be none.
VERDICT per card: GREEN / RED with the complete delta. Status: SCOUT-STATUS-REVIEW-E1-CARDS-S161-1-v1 via laneSlip; if refused (sandbox DNS), write it to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S161/SCOUT-STATUS-REVIEW-E1-CARDS-S161-1-v1.md" and print its sha256 (register 109). Stop.

END · ORDER-SCOUT-REVIEW-E1-CARDS-S161-1-v1
