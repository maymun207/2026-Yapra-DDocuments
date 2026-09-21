OWNER-RULING-S153-NO-ARMES-HARDCODE-1

Given: 2026-09-22 01:21 TSI, S153, the owner's words verbatim:
"code icindeki her ARMES hard code MUTLAKA cikartilmali !!!!! buna IZIN VEREMEM! ARMES herhangi bir back end! no more no LESS code kendim grep liyecegim eger bir tane hard coded ARMES bulursam kulahlari degisiriz! BU SENIN CWF icin en ONELI KURALIN !!!"

Rank: the owner names this the most important CWF rule. It sits beside AGNOSTIC-1 and is enforced mechanically (a CI gate), never by memory.

Design source (S112-YASA-1): the owner's question at 01:17 TSI ("neden CWF ARMES e fetisizmi yasiyor ... hard coded birsey mi var") exposed it. The Architect had not asked it; its blind spot is recorded here beside his contribution.

MEASURED at origin/master 4f6a919fc0fd80f496e4533bfd977f781fd24498, 2026-09-21T22:20Z, bridge, git grep -i "armes":
- product code outside tests and fixtures: 137 files, 633 occurrences (api 110 files, src 24, shared 3); scripts 16 files; e2e 5; supabase migrations 22; tests roughly 250 more files.
- named privilege sites: DEFAULT_BACKEND_ID = 'armes' (shared/dbConstants.ts:1691) · HAND_PACKED_BACKENDS {armes, superset} and composeArmesContext (DbKnowledgeProvider.ts:53, 296) · the armes knowledge module with a hard-coded entry tool and a Turkish sequencing rule (knowledge/backends/armes/toolGraph.ts:35-39) · buildSystemPrompt default ['armes'] (prompt/assemble.ts:87) · ENTITY_ALIAS_BACKEND_ID = 'armes' (turn/stageClarify.ts:150) · a category vocabulary that is ARMES-shaped (12 of 13 catalog categories).

MEANING (the Architect's reading, stated so it can be corrected):
- "armes" may exist only as DATA: a row in the backends registry and in governed tables, exactly like "machine-knowledge-base". Code never names it: no condition, default, map, module, prompt text, comment, test literal or fixture name.
- Historical migration files are immutable history; the gate exempts supabase/migrations by name and says so. Any NEW migration may not name it.
- Everything ARMES-specific that is knowledge (the pack text, the tool-graph entry and sequencing rule, category hints) moves to governed data per backend, served by the same generic path every backend uses.

PLAN (one wave, parallel to A24, no A24 functionality removed):
G0 inventory: a lane produces the full occurrence list with a class per line (logic / knowledge module / prompt text / comment / test / fixture / migration) and a target card per line. Due 2026-09-22 10:00 TSI.
G1 logic: remove the default-backend fallback, the entity-alias backend constant, the prompt default and every backend-name condition; each becomes registry-driven. Due 2026-09-22 evening.
G4 gate: CI fails if "armes" (any case) appears in api/, src/, shared/, scripts/, e2e/ or tests outside the exempt migration history. It lands WITH the last removal so master is never red. The owner's grep and CI then measure the same thing.
G2 knowledge to data: the armes pack, tool graph and category vocabulary move to governed rows; code keeps only the generic path. Prompt bytes change, so the eval gate runs; any eval-canary spend is named to the owner before it fires. Due 2026-09-23 evening, with A24.
G3 comments, tests, fixtures: renamed to neutral fixture backends. Due 2026-09-23 evening.
Every card goes to the scout first (new subject). Dates are the Architect's estimate before G0 measures the size; G0 either confirms them or names the one measured reason they move.

END · OWNER-RULING-S153-NO-ARMES-HARDCODE-1
