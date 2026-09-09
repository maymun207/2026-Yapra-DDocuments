# RETRACTED — F-S134-THE-LENS-RUN-IS-HUNG-AND-THREE-DATABASE-LENSES-PROVED-IT-1

**THIS FINDING IS WRONG AND IS RETRACTED IN THE SAME HOUR IT WAS WRITTEN.** The file is rewritten rather than deleted, because the error is more instructive than the finding would have been, and because a document that reached the archive must not simply vanish from it.

Superseded by **F-S134-THE-LENS-RUN-IS-ALIVE-AND-THE-CLIENT-IS-THE-ONLY-HONEST-DISCRIMINATOR-1**, below.

## WHAT WAS CLAIMED AT 18:07Z, AND IT WAS FALSE

That the lens run had made "seventy-nine requests in six hours", had gone silent at 15:05:59Z, and was therefore HUNG rather than slow. Three lenses were cited: an empty `pg_stat_activity`, a near-empty `edge_logs` filter, and a silent `supavisor_logs`.

## WHAT IS ACTUALLY TRUE, MEASURED AT 18:17Z

Split by CLIENT rather than by table — `request.sb.apikey.apikey.prefix` and `request.cf.asOrganization`, both present on every `edge_logs` row:

| client | key prefix | requests | first | last |
|---|---|---|---|---|
| **Microsoft Corporation** (the GitHub Actions runner) | `sb_secret_BmW7n` | **92,296** | 12:24:15.409Z | **18:14:59.973Z and still going** |
| Amazon Data Services / Technologies (Vercel functions) | `sb_secret_BmW7n` | 4,935 | 12:20:21Z | 18:14:37Z |
| Turkish ISPs — TTnet, TurkNet, Tellcom (the owner's own browser) | `sb_publishable_pWfoC` | 363 | 12:20:47Z | 18:01:12Z |

Per-minute from the runner, at the time of writing: 241, 297, 290, 304, 305, 310, 306 — **a flat ~300 requests per minute, unbroken, last seen 18:17:13.934Z.**

Its request shape per replayed frame, measured over the last twenty minutes: `domain_rules` 2,475, `backends` 551, `entity_registry` 550, `backend_tools` 550, `backend_entity_layers` 550 — one governed-layer read of each per invocation plus about four-and-a-half domain-rule reads. That is roughly 550 frames per twenty minutes, about 27 frames a minute, and about 11,000 frames replayed so far.

**THE RUN IS ALIVE, WORKING STEADILY, AND HAS BEEN FOR FIVE HOURS AND FIFTY-THREE MINUTES.**

## THE ERROR, NAMED PRECISELY

I filtered `edge_logs` by the tables I ASSUMED the lens would touch — `telemetry_events`, `synthetic_runs`, `messages`, `synthetic_question_sets` — found seventy-nine requests, and concluded absence of work.

**The lens does not page through those tables. It REPLAYS frames through the clarification gate, and the gate reads the GOVERNED LAYERS on every invocation** — `domain_rules`, `backends`, `entity_registry`, `backend_tools`, `backend_entity_layers`. That is exactly what the script's own report calls "seam invocations" and "every invocation read the governed layers cleanly". The 92,296 requests I dismissed as "the live application" ARE the measurement doing its job.

The seventy-nine requests I DID find were the owner's browser and the app — I attributed them to the lens and attributed the lens's own traffic to the app. **I had it exactly backwards, in both directions, inside one hour.**

The discriminator that settles it is not the TABLE but the CLIENT. It was available on every row the whole time.

## THE CLASS, AND WHY THIS ONE IS WORSE THAN THE OTHERS

This is the fifth measurement error of the session and the same class as the other four: a conclusion drawn from a lens that could not see the thing it ruled on. But this one went further than the others — it was **published to the owner AND written into the archive** before it was checked, and by the owner's own stated reason for keeping an archive, a wrong conclusion that reaches it is worse than none, because the next session reads the archive instead of re-measuring.

What saved it was not judgement but continuing to measure after publishing: the very next probe, asked only to identify WHICH client, refuted it. The mechanical lesson is the one this house already has and I did not apply: **an absence claim needs two lenses that differ in what they ASSUME, and "which tables" and "which tables, again" are one lens wearing two coats.** Table-name and table-name are the same assumption. Client-identity is the different one.

Recorded against the Architect: `A-REC-S134-1-THE-ARCHITECT-PUBLISHED-A-HUNG-VERDICT-ON-A-WORKING-RUN`.

## WHAT IS ACTUALLY WRONG, AND IT IS NOT A HANG

The job has no `timeout-minutes` and the workflow deliberately leaves the platform's six-hour ceiling in place, so this run is killed at roughly **18:23:49Z** — minutes from this writing — while still working at full rate.

**The evidence file is written by a SINGLE `console.log` at the very end of the script.** A run killed mid-replay produces NO evidence JSON at all. So nearly six hours of genuine work, some eleven thousand frames replayed, yields nothing but the counting step's `clarify_lines=<integer>`.

**THE REAL FINDING IS THE POPULATION, NOT THE PROCESS:** `--all` reads "each source to its EXACT counted population (no ceiling)", the workflow's own comment budgets against S82's roughly two hours, and the corpus has since grown past what a six-hour hosted job can finish. The cure is a bounded or sharded run — `--limit` per source, or a run split across jobs — and it is a CARD, not a re-run, because S55-1 forbids re-running a diagnosed failure and because re-running unchanged would burn another six hours to the same ceiling.

TAIL ANCHOR: this retraction ends here.
