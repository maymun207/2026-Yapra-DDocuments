# GO-FAULT-SWITCH-0 · v2 — the gate lifts; the witness moves to its consumer

<!-- GO-FAULT-SWITCH-0-v2 · 2026-08-07 · S86 · Architect (Opus 5) → AG-1.
     AMENDS v1 (S37-1: v1 is immutable; this file supersedes its STEP-M gate).
     PRECONDITION (S47-1): branch head is STILL `8287599`; the only branch commits
     above it are the two docs/relay reports (432efb7, 7b5adaf). Else STOP. -->

## RULING-S86-2 — the C4' outcome is ACCEPTED as a finding, and the merge gate LIFTS

Your STOP was correct under v1's gate. The Architect corroborated the root cause on an
independent sensor (runtime logs, 19:11:14Z: `ref pinned ok` · `Unregistered API key` ·
`code floor will serve` · `reason:'disabled'`): the Preview environment's
`SUPABASE_SECRET_KEY` is an unregistered key, so the tick returns at the POLICY gate,
upstream of the spend fence. This is an ENVIRONMENT defect, not a defect in this branch.

**BUG-036 is hereby minted:** *Preview `SUPABASE_SECRET_KEY` unregistered — every preview
deployment serves governed reads from the code floor; no policy-gated surface can be
witnessed on preview until repaired.* (Your third-blocker section is its birth record.)

Consequences:
1. The instrument code is green, reviewed (RULE-25, independent recount), and complete.
   Holding it hostage to an environment repair serves nothing. **STEP M's C4' gate is
   LIFTED.**
2. The preview witness was ALWAYS the consumer phase's food — bucket v24 #2 reads
   "BUG-006 + BUG-009: with #1's OUTPUT". The witness re-run therefore moves BY NAME into
   the BUG-006+009 phase as its opening steps: (W1) owner repairs the Preview
   `SUPABASE_SECRET_KEY` in the Vercel dashboard (secret-class, owner-only — the value
   never transits chat, AG, or any report); (W2) re-arm branch-scoped, redeploy, fresh
   share link, re-run S3 — expected `{"active":false,"reason":"spend-unmeasured"}`;
   (W3) the S5 triple. Your two structural alternatives are declined: (a) would aim the
   instrument away from the fence it exists to exercise; (b) would abandon the ruled
   witness locus for a repairable env.
3. Your S3 transport proof (200 through SSO + minted bearer) is RECORDED as an asset —
   the redelivery design is proven and will be reused verbatim in W2.

## STEP M — MERGE (now unconditional on C4)

1. Re-verify head `8287599`; re-read the base at merge time (S81-1 — AG-2's
   RENDER-TIME-1 may land first: CHANGELOG double-merge both-entries-whole, late-merge
   on top; manifest conflict → last-merger reseals in the combined tree).
2. `git merge --no-ff --cleanup=strip origin/phase/fault-switch-0 -m "merge: FAULT-SWITCH-0 — the fault the system can order, so honesty can be measured"` · push.
3. Expectations, BASE+DELTA: merge run ALL FIVE jobs green (canary converged-not-cleared
   is the recorded normal); suite = base-at-merge **+1 / +19**; docVersion **209** on
   master (or the combined-tree reseal value — report which).
4. MERGE section appended to the same relay file; docs push expected 0-run/CANCELED —
   one observed line.
5. Branch NOT deleted.

## DEBTS AFTER THIS GO
BUG-006 + BUG-009 OPEN (unchanged) · **BUG-036 OPEN (new)** — all three are the
BUG-006+009 phase's charter, which now opens with W1–W3 above. The armed residual
preview (`dpl_8bmwXzdq`) keeps only a dead bearer behind SSO; it is inert and may be
superseded naturally.

<!-- END · GO-FAULT-SWITCH-0-v2 -->
