# S120 · FINDINGS ADDENDUM 4 — ONE RECOVERED DOCUMENT, AND WHAT IT PROVED

<!-- ADDENDUM. LEDGER-v3 and ADDENDUM-1/2/3 are NOT superseded and NOT re-typed. -->

MEASURED-AT 2026-08-26T18:10:00Z (21:10 TSİ). Occasioned by the owner finding ONE of the five
carriers that appeared nowhere, and handing it over.

---

## RECOVERED · REGISTER-BUG-BUCKET-v38

4916 bytes, md5 `85a331d69971b2f0f96ddf55538f9661`, closing marker `<!-- END · REGISTER-BUG-BUCKET-v38 -->`
present. Ground stated in its own header: master `1f660ea`, rev 271. **This is the document, not a
reference to it** — seventeen closed items with evidence commits, fifteen open items with weights.

Placed beside its siblings v30–v36 in the yaprak3 bucket rather than in a new session folder, so a
sweep by version series finds the run contiguous. Written to the project box in the same turn.

**The gap is now FOUR, not five:** bootstrap v103, bootstrap v105, bug-bucket v33, bug-bucket v40.

---

## WHAT THE RECOVERED FILE PROVED — THE OWNER'S ARGUMENT, MEASURED

The recovered ledger carries fifteen open items. Each was searched across the whole archive and
across the live repository. The result splits sharply, and one row is the point of this addendum:

| item | files in the archive | files in the live repo | newest carrier reached |
|---|---|---|---|
| **fan-out wedges the service** | **1 — v38 ITSELF** | **0** | **none** |
| healthcheck has no treatment | 3 | 1 | register v106 |
| override drops the backend | 14 | 6 | register v108 |
| parity key breadth | 3 | 0 | register v106 |
| orphaned model volume | 2 | 0 | register v106 |
| backends enabled with no writer | 8 | 5 | register v106 |
| registry parent overwrite | 26 | 6 | register v107 |
| purpose gate scope | 12 | 2 | register v106 |

**Read the first row again.** That item existed in exactly ONE file in the world, and that file was
the one the owner had to go and find. It is weighted MEDIUM and marked IN FLIGHT. It names its own
diagnosis — a single-worker dev server whose socket backlog silenced even its health endpoint, and
which **did not self-heal** — and it names its own fix, including which part must stay behind the
inference lock so determinism is untouched.

Had that file stayed lost, the item was gone: not deprioritised, not closed with evidence — **gone,
with no record that it had ever been raised.** This is the concrete form of the owner's argument
that documents which never reach the archive become facts a later Claude will guess at.

---

## F-S120-LEDGER-TRAIL-STOPS-AT-v108-1

The wider measurement shows the items were NOT dropped at S102. They were carried forward correctly
into registers v106, v107 and v108 — and **the trail stops there.** The current register is v121.

This is not a new defect; it is the already-named one, seen from the other end. The canonical home
for open items moved to the repository's ground ledger, and the items did not move with it. The
live ground ledger holds the GI series plus S110/S111/S112/S117 findings; **not one S101/S102-era
item is in it.**

What this recovery adds is the NAMES. A break that was known as a scope defect now has a concrete,
enumerable population attached to it, which is the difference between a finding and a work item.

---

## A-REC-S120-NARROW-CORPUS-NEAR-MISS-1 · SELF-DECLARED, CAUGHT BEFORE PUBLICATION

The first continuity check ran against THREE files — the two most recent bug buckets and the most
recent register. All fifteen items came back absent, and the sentence "15 of 15 have fallen out of
the ledger" was one keystroke from being written down.

It would have been wrong, and wrong in **exactly the class of error withdrawn in ADDENDUM-3 an hour
earlier**: a conclusion drawn from a corpus too narrow to support it, dressed as a measurement.

The wider sweep — the whole archive, then the live repository — reversed the finding for fourteen of
the fifteen. **The near-miss is recorded because the correction happened by habit and not by luck,
and a habit that has now caught the same error twice is worth naming so it survives.**

---

## F-S120-HEARTBEAT-IS-NOT-LIVENESS-DURING-LANDING-1

A lane-state read showed the landing address with a heartbeat 37 minutes stale while the other four
were seconds fresh. On the four-state rule that reads as STOPPED, and it was about to be reported
that way.

**The repository said otherwise.** That same address had merged a pull request two minutes before the
read, and six landings had gone in over the preceding half hour, including the archive-reconciler
card cut earlier in this session.

**The heartbeat lagged; the lane did not.** During a landing run the state row is not a reliable
liveness lens, and a positive lens — actual merges on the trunk — outranks it. Reporting the address
as stopped would have been a false alarm that cost the owner attention and the lane an interruption.

---

## STANDING

Six landings between 20:34 and 21:03 TSİ. The archive reconciler designed earlier in this session
is itself now on the trunk. Four addresses are writing seconds-fresh; the fifth is landing.

The scout probe on whether a machine may alter merge authority is on the bus and **not yet
answered** — the scout window is episodic, not an autonomous address, so it answers when it is run.
The gate-consent ruling remains recorded and undispatched until it does.

<!-- END · S120-FINDINGS-ADDENDUM-4 -->
