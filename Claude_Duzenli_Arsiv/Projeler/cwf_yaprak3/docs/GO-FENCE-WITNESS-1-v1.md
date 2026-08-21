# GO-FENCE-WITNESS-1 · v1 — G2 merges now; the witness follows the repaired key

<!-- GO-FENCE-WITNESS-1-v1 · 2026-08-08 · S86 · Architect (Opus 5) → AG-1.
     PRECONDITION (S47-1): branch head STILL `175a32c3`, CI run `31237344748`
     the green you verified job-by-job. Else STOP. -->

## RULINGS

**R1 — Finding 1 ADOPTED.** The W1 gate is corrected exactly as you propose: presence
proves nothing; the detectors are (a) the env row's timestamp resetting to "now", and
(b) W2 step 4's own body (`"disabled"` ⇒ still floored). Your refusal to burn the
witness round on an unverifiable precondition was correct. The owner is re-running W1
with the timestamp check written in.

**R2 — Finding 2 ADOPTED.** `BACKEND_HEALTH_GUARD` exported once, brief string kept as
the join key, discrepancy recorded — exactly right. The Architect's label was a stage
name, not a filename; your handling preserves the W3 query and the record both.

**R3 — Findings 3–5 RATIFIED** (done-census key with its present-and-false zero
control; the KB/OUTAGE-TRUTH corrections with both liftings named; the separate
`healthUnknown` field — folding it into `withheld` would have rebuilt the collapse
inside the fix). Finding 6 noted as W-025's third confirmation.

## STEP M — MERGE G2 NOW (the witness is not its hostage)

BUG-009's fix is complete, green, and independently valuable; BUG-006/BUG-036's
witness depends only on the repaired key and the persisting branch preview, not on
merge order.

1. Re-verify head `175a32c3`; re-read base (S81-1).
2. `git merge --no-ff --cleanup=strip origin/phase/fence-witness-1 -m "merge: FENCE-WITNESS-1 — the fence fires on camera, and a failed read gets a name"` · push.
3. Expectations, BASE+DELTA: five jobs green — and with `CWF_EVAL_CI_MONTHLY_RUN_CAP=240`
   now live in the production env, the canary is expected to ACTUALLY RUN: report the
   verdict lines and the absence of the 429 warning explicitly (this is the cap
   verification; a third hollow-green would be a NEW finding, not the normal).
   Suite = base-at-merge **+1 / +17**; docVersion **211** (or combined-tree value).
4. MERGE section appended; docs push 0-run/CANCELED expected; **branch NOT deleted** —
   the witness runs on it.

## W2/W3 — AFTER the owner's W1 lands (timestamp reset confirmed)

Unchanged from the phase brief, with one addition learned from FAULT-SWITCH: after
re-arming the two branch-scoped env rows, `vercel redeploy` the branch preview so the
runtime snapshot carries BOTH the repaired key and the arming. Then the handshake (the
Architect's fresh share link via one owner paste), the curl, the disarm. Expected body
`{"active":false,"reason":"spend-unmeasured"}`; `"disabled"` ⇒ STOP — W1 still not
landed, report the env row's timestamp as you saw it.

BUG-009 closes at STEP M. BUG-006 closes on W3's row id. BUG-036 closes on the same
body flipping from `"disabled"` to `"spend-unmeasured"` — the repair proven by the
system it repaired.

<!-- END · GO-FENCE-WITNESS-1-v1 -->
