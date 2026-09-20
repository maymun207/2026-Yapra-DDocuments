# CWF-S148-RCA-MKB-UNREACHABLE-v2

SUPERSEDES v1 (S37-1: a presented artefact is immutable; a correction is a new version). Cut 2026-09-20 after SCOUT-STATUS-MEASURE-MKB-REACH-S148-1 (bus 12:30:53Z). v1's §1-§2, §4-§5, §7-§9 stand; §3 and §6 are corrected below. Full design: A24_cwf-capability-fabric-architecture-v1.html.

## What the scout measured that v1 got wrong (A-REC-S148-1)
- C1 · router.frameRouting did NOT flip 0->1 on 2026-08-18. Four rows: v1 value 1 archived 07-25 12:37:24Z; v2 value 1 archived 07-25 12:37:58Z; v3 value 0 archived 08-18 02:04:43.631Z; v4 value 1 PUBLISHED 08-18 02:04:43.760Z. Effective value was 1 for three weeks either side; the v3/v4 pair is a 129 ms no-op. v1 §3 read the last two rows as a flip. WRONG.
- C2 · The only other governed changes in 08-17..08-19: vector.indexRatePerSec v1 (08-17 13:06Z), vector.engine incumbent->qdrant (08-17 18:02:17Z), vector.enabled 0->1 (08-17 18:02:31Z). Vector retrieval switched ON ~8 h before the 08-18 entity-ask surge. CANDIDATE, not measured cause (stage 05, not 07).
- C3 · The board-benefit question (09-20 10:57Z) got the SCOPE REFUSAL (safety.b1_scope v3, published 08-01 19:59Z), not the entity ask; the same refusal is measured 08-11 08:15Z and 08-12 12:24Z/12:25Z, i.e. BEFORE 08-18. On 08-18 only the headcount question got the entity ask; capital-ceiling (12:30Z) and strategy (08-11) were ANSWERED with knowledge_search. Two distinct failure mechanisms, both structural.
- M2 · UNMEASURED: scout window has no SUPABASE_URL/SUPABASE_SECRET_KEY; the dot-env remedy is refused by guard-secrets GS-2; probe exit 3 = CANNOT-READ, not "corpus empty".
- M3 · UNMEASURED as posed (lenses are DB-bound; stage-03 replay needs an LLM frame). C1 answers the frameRouting half negatively without a replay.

## Corrected §3 · When it broke
Scope refusals for company-report questions exist from 08-11 (policy, deterministic in text, nondeterministic in the model's application). The entity ask ("Hangi varlığı ...") first appears 08-18 (14 that day; 0/day before 08-17). The governed change nearest in time is the vector switch-on (08-17 18:02Z). Causation UNMEASURED; P0 of A24 §9 (M3') measures it.

## Corrected §6 · Root cause, one sentence (unchanged in substance)
CWF's understanding layer, tool selection and scope are built on ONE backend's world (MES factory graph + hand-written rows) rather than on a capability map derived from ALL connected backends; a backend whose subject is company documents is unreachable by design, and the August successes were the model waving questions through a scope text it applies inconsistently — not a mechanism this factory controls.

## Mechanical rule adopted
Before a governed parameter is written as a causal premise, ALL its version rows and the effective-value interval are printed. (v1 printed two rows.)

END · CWF-S148-RCA-MKB-UNREACHABLE-v2
