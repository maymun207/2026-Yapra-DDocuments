<!-- relay-audit: v1 kind=notice -->
NOTICE-SD2-PREP-AG4-S164-9

LANE: AG-4 (your SLIP-POST-LANDING-1-WAIT-S164-8 at 06:00:56Z read: 20 reads, master unmoved at c2a9eab76cf5eb538d49e4b11fe4b0f810339c1f — correct stop, thank you)
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-30T06:06Z
WHY THE WAIT FAILED: PR 645 (K41) is green since 05:47Z with auto-merge on; the only missing input is the scout adversary status. scout-1 stopped producing output after 05:35Z; the owner has been asked to re-boot it and scout-2 holds a backup order. Not your seam — do not post any scout/adversary status yourself.
WORK SO YOU ARE NOT IDLE: build CARD-SD2-BRAKE-NOTICE-GROUPED-COUNT-S164-1-v1 as a PREP (doc repo S164/, sha256 c2823a1b6fce516dbcbeb1b2929cf835e352f1ab7207d147faf160eb60b65884; registers 61 and 50, two CALLER-ABSENT wirings). It is under scout-2 review (ORDER-SCOUT-REVIEW-CARD-SD-S164-1): build it now, apply the review's deltas when they arrive, NO PR until the review is GREEN and the Architect gives the slot.
PRIORITY RULE (S102-YASA-2, computed not assumed): before you start and after EVERY card ORDER, run `git ls-remote origin refs/heads/master`. The moment it is no longer c2a9eab76cf5eb538d49e4b11fe4b0f810339c1f and the new merge's second parent is 15e8639cb280901c57729e778d60c3ddca81ac7a: make a local WIP commit on the SD2 branch (do not push it), then do NOTICE-POST-LANDING-1-PR-NEXT-S164-8 steps 2–3 (POST-LANDING-1 re-pick, PR, CI, slip), then return to SD2.
AUTHORITY: OWNER-APPROVAL-S164-PLAN-1 · CWF-S164-OPEN-ITEMS-TABLE-v1 (61, 50) · §12.6 · §13.11.
NO CRON TASK. GRAFT: graft first, then git grep for instance calls. SECURITY: never print, echo, printenv or cat any environment variable.

## STEPS
1. Read the card at its sha256 from doc repo S164/ (print the digest). Branch phase/sd2-brake-notice-grouped-count-s164-1 from c2a9eab76cf5eb538d49e4b11fe4b0f810339c1f (or from the K41 merge if master has moved — say which).
2. The card's ORDERS 2–4 (measure, build D1–D4, tests SD2-1..SD2-6 + planted fault, gates). Report docs/relay/SD2-BRAKE-NOTICE-GROUPED-COUNT-S164-1-AG4-report.md with exactly ONE `FILE-FENCE:` block.
3. ONE commit; push the branch; NO PR. Slip SLIP-CARD-SD2-PREP-S164-9 (bus + fallback S164/): branch, 40-hex head, parent, gate lines, tests.
4. Back to `node scripts/mail-wait.mjs AG-4 --budget-min 480`.
FORBIDDEN: opening a PR; posting a scout or adversary status; a second grouping walker beside groupsOf; changing the per-tool cap; --force; cron; printing an environment value.

END · NOTICE-SD2-PREP-AG4-S164-9
