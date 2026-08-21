# GO-TRAIN-WAVE5-v1 — four lanes, one train (conductor: AG-1)

<!-- S98 · Architect-authored · filed via relay_inbox. PRECONDITION (S47-1):
     origin/master = cc9a2a78…. STEP 0 gates the train on AG-3's completion. -->

## STEP 0 — BLOCKING WAIT: the OBS completion
`phase/obs-host-truth-1` is finishing under RULING-OBS-SURFACE-v1 (new table +
registries + R3/R4-honest + seal + report addendum). Sensor: its tip moves AND
the report gains the addendum section. Until then: verify STEP 1 on the other
three, prepare, do not merge.

## STEP 1 — CI verdicts, BLOCKING (S37-2)
All FOUR PR tips via `gh run view` per job + check-runs cross-read.
`in_progress`/`null` is not a pass. Any red → STOP, report the job verbatim.

## STEP 2 — merges, `--no-ff`, THIS order
**#13 → #12 → #16 → OBS** (the migration-carrying lane rides last so DDL +
registries land adjacent to the apply).

**CONFLICT LAW (computed: `.gitattributes` carries NO union rules):** every
lane touches `.agents/CHANGELOG.md` + `.agents/skills/cwf-project-kb/SKILL.md`.
On conflict: TAKE BOTH SIDES — every lane's block survives, ordered by merge
sequence, zero lines dropped (S90-1's kin). Same for any doc-plane collision.

**SEAL DROPS (S98-L2 — computed identity):** per branch, compute the
provisional-seal commit yourself (`git log --grep='seal' --grep='PROVISIONAL'
--all-match origin/phase/<b>`), list each SHA in the report, drop each on your
local integration line (never rewrite origin branches — S96-1). OBS's seal
arrives with its addendum; compute it then.

Merge messages, VERBATIM:

#13: `merge: PHASE-PACK-FROM-PROTOCOL-1 — a mounted backend can now be TALKED ABOUT without code (the derived pack renders tool inventory, argument shapes and closed value sets from the mirror plus census; the two hand packs become a byte-pinned override layer above a floor that stops a new backend being mute; absence stays honest — empty mirror means no section, unreadable mirror degrades by name; and the birth proof judges itself: a floor, not a substitute for authored meaning)`

#12: `merge: PHASE-METRIC-VOCAB-DISCOVERY-1 — the vocabulary writer exists and only ever writes DRAFTS (candidates discovered per-backend from protocol surface, entering through the same governed createDraft door a panel click uses; the platform floor stays empty and oee cannot leak across backends; the birth proof's negative is the finding — a gateway's chart titles are call-time payloads the mirror never sees, so the doğalgaz class needs a new observation, not a wider derivation)`

#16: `merge: PHASE-BENCH-BACKEND-MOUNT-1 — the third SOTA key turns: a backend joins this platform born draft, verified by observation, promoted only by a human (verify reuses the existing sync seams and earns no trust tier per ADR-010; could-not-read never masquerades as zero tools; the console renders only what the endpoint asserted; two fence amendments owner-ratified in flight, and the in-phase birth proof honestly deferred — a read-only lane cannot mount, so the first real mount happens on production under the Architect's eye)`

OBS: `merge: PHASE-OBS-HOST-TRUTH-1 — the flush stops lying and the observability host stops being unwatched (ok now means DELIVERED and nothing else, the original optimism proven then killed by mutation; a three-verdict liveness probe distinguishes down from could-not-read by construction; observations get their own honest table because bending backend_health or telemetry_events would corrupt a boundary to save a migration; window-awareness ships only its honest half — a probe sees down, never down-and-expected)`

Per merge turn: local FULL suite (state Node version + counts). After all
four: ONE reseal, docVersion DERIVED from master (expect 250 — READ it),
push. TAIL ANCHOR the final tip.

## STEP 3 — report + handoff
`docs/relay/GO-TRAIN-WAVE5-report.md` (grammar v1): STEP-1 verdicts · four
merge SHAs · seal SHAs dropped · conflict resolutions listed by file ·
docVersion read · suite runs. Push, delete the four lane branches from origin
(S98-L1), re-enter MAIL-WAIT. The Operator apply card, the production birth
proofs (#16 mount choreography, #13 pack observable, OBS host reading) and the
gate flip to 3/7 are Architect-orchestrated after your report.

<!-- END · GO-TRAIN-WAVE5-v1 -->
