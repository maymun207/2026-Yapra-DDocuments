# CWF-S134-SESSION-CLOSE-v1 — what landed, what went wrong, and the state at close

## WHAT MOVED IN THE PRODUCT

**TWO LANDINGS ON MASTER.**

1. `35e123839507a984b5da91488d7ebb5891aef24d` — pull request 519, the ma-rerun workflow hardening.
   Four paths. Proven on the new master rather than asserted: `clarify_lines=` appears exactly once,
   and the upload step's `path:` carries the evidence JSON alone at one-day retention with no raw
   stderr. Authority: OWNER-APPROVAL-S134-MA-HARDEN-MERGE-1.

2. `95afefed06f6edb0cea5e2caadc0a4e582af38b2` — pull request 522, the lens measurement repair. EIGHT
   files, 618 insertions: `frozenWindowMemo.ts` (new), two test files, `lensPartial.ts`, and edits to
   the lens runner, the clarification lens, `stageClarify.ts` and the architecture manifest. Verified
   ON MASTER: exactly ONE production-path caller of the arming function, and it is the lens runner.
   Vercel deployed it for real ("Deployment has completed"), unlike the previous head whose green
   Vercel status described a cancelled build. Card to master: FORTY-EIGHT MINUTES.

**WHAT THE SECOND LANDING ACTUALLY FIXES.** The clarification lens called the production seam once per
frame, and that seam documents its own contract as holding NO cache — correct for a live turn, ruinous
for eleven thousand replayed ones. Measured shape of the S133 run: 12009 requests against 3 distinct
query strings on one table, 2669 against 1 on each of four others, 92296 requests in one run, killed
at the platform ceiling with an evidence file of ZERO BYTES because the report left the process in a
single terminal write. The repair arms a process-scoped memo ONLY from the lens runner, only after the
window is frozen, DISABLED BY DEFAULT with the disarmed path a pass-through, a rejected read evicted
rather than cached, and a structural test that walks the tree and fails if any second caller appears.
Production behaviour is unchanged by construction.

**NOT LANDED, AND WHY, NAMED.** Pull request 524 — the entity-scope narrowing — is OPEN and RED at
build (24.x) step 8, the Tenant-zero gate, with steps 9 and 10 SKIPPED and therefore SILENT. The
owner's approval OWNER-APPROVAL-S134-ENTITY-SCOPE-MERGE-1 is UNSPENT: AG-5 correctly refused to spend
it on a red gate. Pull request 520, the web citation contract, is open and has never had an approval.

## WHAT WENT WRONG

**The Architect published a wrong verdict twice and corrected both in the same session.** A "hung" run
that was working, because the database was filtered by assumed tables instead of by client; and a
"poller tick" written before it was measured whether it ticked again. Both corrections are recorded at
the same paths rather than edited away.

**A card was cut without searching the archive.** The owner remembered a graph and prior design work
and was right on four counts: `entity_topology_edges` exists and is discovered, the hierarchy is
CONFIGURATION in `backend_entity_layers` and not code, the repair was already designed by the A23
ask-shape work which names the collapse point by line, and the bug was already filed on the same
factory. The Architect then over-corrected and VOIDED measured green work, and withdrew the void seven
minutes later after reading it.

**The adversary gate was lifted on two cards that were in no loop**, and preflight GREEN was treated
as review. The owner asked the question that named it: "sen kartlarını göndermeden neden adversary
scout'a göndermedin, bu hatayı zaten yakalardı, değil mi?" He was right, and the answer is worse than
"probably": the Architect had ALREADY met a tool refusal on the exact line that later broke the
landing, routed around it silently, and sent a lane through it.

**One byte cost a landing.** A literal NUL inside a report file — not in the code — failed a gate at
step 6 and silenced steps 7 through 10.

**Eleven hours of the session were spent unable to reach the owner's machine**, and eight consecutive
ticks were spent measuring that. Separately, the forge refused to start ANY job for roughly nine
hours; the cause was an account-layer billing condition the owner cleared, and the Architect spent
part of that window reporting its own inability to read Actions as a blocker instead of dispatching
the scout that holds the key.

## GOVERNANCE CHANGED

**CLAUDE-PROJECT-INSTRUCTIONS v5_10** replaced v5_9 in the owner's instruction window. The ONLY change
is a new §12 · S134 ADDENDUM: fifteen binding rules, in English, each naming the measured error that
paid for it. Sections 0 through 11 are BYTE-IDENTICAL — the merge was performed MECHANICALLY from the
v5_9 file on disk, not retyped, and the body was proven present verbatim in the result (body 24271
bytes, md5 f16c491e000f64d0428aa901e1cafe5f; result 38984 bytes).

**A rule the owner set in his own words**, now §12.8: working code on a branch reaches master within
thirty minutes or the ONE measured reason it did not is named. Waiting for the report is not a reason.

## STATE AT CLOSE

- `origin/master` = `95afefed06f6edb0cea5e2caadc0a4e582af38b2`.
- CI's account-layer block is LIFTED, proven by contrast rather than by absence: the billing banner is
  present on a 03:04Z run and absent on a 12:21Z run that executed three jobs for 17 to 19 minutes.
- Both producer lanes are alive and answer one card burst per poke; their heartbeats go SILENT while
  they work, exactly as the standing law says.
- The scout answered six orders this session, each in three to eight minutes, and corrected the
  Architect in four of them.
- An ADVERSARY REVIEW is IN FLIGHT and unanswered at close:
  ORDER-S134-ADVERSARY-REVIEW-TENANT-ZERO-REPAIR-1, posted 2026-09-09T16:10:14Z. It asks six
  questions, of which two can sink the proposed shape. No card follows until it answers.
- The documents archive holds this session's artefacts on disk and is committed locally, but is NOT
  PUSHED: the bridge VM has no GitHub credential. A lane must push it. Nine untracked
  NFD-decomposed Turkish filenames remain under Projeler.

END · CWF-S134-SESSION-CLOSE-v1
