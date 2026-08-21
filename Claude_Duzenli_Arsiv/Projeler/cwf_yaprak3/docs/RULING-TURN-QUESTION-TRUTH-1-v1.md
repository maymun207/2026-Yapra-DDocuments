# RULING-TURN-QUESTION-TRUTH-1 · v1 — carry rule keys on AUTHORSHIP, not on the empty flag
**For: AG-1 · binding delta to PHASE-TURN-QUESTION-TRUTH-1-v1 R1/R4 (S37-1: phase file immutable). §1 diagnosis ACCEPTED as proven; the two killed candidates are accepted as killed with their evidence. One relay, self-contained (D-2).**

## The correction to your proposed fix
Do NOT flip the ceiling abort out of `empty`. `empty` truthfully means "the model produced no content" and it feeds telemetry, the F69/F105 finish accounting, and #59 silent_finish. Flipping it would make one consumer right and silently re-point several others — the same class of error the quarantine itself commits.

**The seam is authorship.** The quarantine's real subject is MODEL-authored content that failed mid-flight (partial, poisoned, unverifiable). The ceiling sentence is not that: it is a DETERMINISTIC, code-authored, self-describing governed statement about the turn. Those two classes have opposite carry rules and today share one boolean.

**Therefore:**
1. Introduce an explicit finish CLASS on the wire alongside `empty` (do not overload it): at minimum `answered` · `ceiling-abort` · `governed-refusal` · `failed-empty`. Values are named in code with a `never`-check so a new finish path cannot join silently.
2. The next turn's history assembly keys on that class: **system-authored governed sentences carry VERBATIM, attributed as system**; model partials stay quarantined exactly as today. `cwfStore.ts:651` stops asking "did this fail" and starts asking "who wrote this, and is it a governed statement".
3. The quarantine placeholder, where it still applies, keeps saying content was withheld — but it must never overwrite a governed sentence again.
4. Carry the ceiling sentence in full, including its actionable half ("the question itself was not refused; ask it over a narrower range"). The erased half was the load-bearing one.

## Additional binding points
**(a) Assert at the ASSEMBLY seam, not the store.** The regression must replay the four-message incident shape and assert what the MODEL RECEIVES — the assembled history — contains the ceiling sentence as system-authored, with the badge question as the sole current query. A store-level assertion would pass while the assembler still dropped it (the fixture-fabrication lesson from AG-3's '14' buckets, one layer up).
**(b) Positive control mandatory (S66-1).** Pre-fix code must FAIL that replay. A green test on unfixed code proves nothing.
**(c) Scope discipline stands.** This is NOT #48 FAILURE-LESSON-MEMORY-1. You are making one honest sentence survive one turn boundary; durable cross-session lesson memory remains #48's. Record the evidence pointer, build nothing for it.
**(d) The `UNTAGGED (bug)` on a `backends` select you spotted:** if the site is outside AG-2's fenced files (`MCPSettingsTab`, `mcpTruth`, `McpSettingsRepository`, `BackendToolsRepository`), tag it with its emission-site purpose in this phase and say so. If it is inside them, file `F-S101-BACKENDS-SELECT-UNTAGGED` naming the file+line and leave it — no cross-fence edit. Either way it goes in the report; a defect the gate rendered must not die unrecorded.
**(e) R3 unchanged and still required** — the 6811-record / 200-read partial answer is a separate defect from the carry rule and does not inherit its diagnosis.

Everything else in PHASE-TURN-QUESTION-TRUTH-1-v1 stands.

<!-- END · RULING-TURN-QUESTION-TRUTH-1-v1 -->
