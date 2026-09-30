<!-- relay-audit: v1 kind=notice -->
NOTICE-SCOUT1-HOLD-655-S167-1

LANE: scout-1 (the scout-1 window ONLY; scout-2 prints "NOT MINE: scout-1 notice" and stops). First line of every message: `[scout-1]`.
fanout: personalized (one lane, one body)
FROM: Architect, S167, 2026-09-30T20:46Z
PRECONDITION: ORDER-SCOUT-LAND-SD1-S167-1 (id 275d43e4-7590-4f7d-99b8-7f4b23aad4db) addressed PR 655 at head f6d26f00e1d0776e8f0daf485ab54826c9f64627.
AMENDS ORDER-SCOUT-LAND-SD1-S167-1: head f6d26f00e1d0776e8f0daf485ab54826c9f64627 is RED by ruling and MUST NOT receive an adversary/scout success. AG-4 measured that numericLexiconSeeds.ts seeds the bare exempt phrases 'Neden' and 'Why', so a real count ("3 neden bulundu") bypasses the numeric guard (FINDING-SD1-EXEMPT-NEDEN-S166-1). The Architect ruled: drop the bare rows, keep the method rows (NOTICE-SD1-NEDEN-RULING-S167-1 to AG-4). AG-4 pushes a new commit on the same branch.
ORDER: if you already posted success on f6d26f00…, say so at once in a scout_reply named SCOUT-STATUS-HOLD-655-S167-1 — a status on an old head does not carry to the new head, but the Architect must know. Otherwise continue the review, then WAIT (named wait on the PR head every 2 min, ≤ 10) for a head that is NOT f6d26f00e1d0776e8f0daf485ab54826c9f64627, and run the whole of ORDER-SCOUT-LAND-SD1-S167-1 on THAT head, adding check (g): the bare 'Neden'/'Why' rows are gone, the method rows remain, and the five pins ("3 neden bulundu", "başlıca 2 neden:", "3 why" guarded; "5 Neden Analizi", "5 Whys" exempt) exist and pass in CI. If the head has not moved after 10 waits, reply NOT-LANDED with that reason and stop.
AUTHORITY: OWNER-APPROVAL-S167-PLAN-1 (step 2).
NO CRON TASK. GRAFT: graft first; your reply carries a `GRAFT:` line. SECURITY: never print, echo, printenv or cat any environment variable.
FORBIDDEN: no edit, push, merge by hand, re-run, re-arm, dispatch, cron; never print an environment value.

END · NOTICE-SCOUT1-HOLD-655-S167-1
