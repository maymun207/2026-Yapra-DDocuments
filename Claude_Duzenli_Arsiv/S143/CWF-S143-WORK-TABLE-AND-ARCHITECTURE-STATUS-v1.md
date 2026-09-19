CWF-S143-WORK-TABLE-AND-ARCHITECTURE-STATUS-v1

S143 · 2026-09-19T19:58Z · master 7572c3bbfeed23656fcf8a55f6e64d93ed240c14 · live domain_rules read 19:56Z.
Owner ruling this turn (OWNER-RULING-S143-COORDINATE-1, his words): "kafana gore is yapma benim ile
koordineli gitmek zorundasin" — no card is cut and no order is dispatched from this table without the
owner's named approval of the item.

## TABLE A · THE S140 ARCHITECTURE TABLE, UPDATED

| Room | S140 (owner's table) | S143 measured | How |
|---|---|---|---|
| ② IR frame + armour | LIVE, routing | LIVE — router.frameRouting=1 | domain_rules |
| ⑦ Path A table | LIVE; ORDER×fire gap | LIVE; named-tool cards LANDED (7eabab2a, 97b2322b, d57afb3b); gap live re-witness NOT done | git log |
| ④ channel-1 | LIVE | LIVE (unchanged) | carried |
| ④ channel-2 BM25+RRF | ABSENT | STILL ABSENT from turn path | git grep |
| ③ typer | ABSENT | STILL ABSENT | git grep |
| ⑤ diagnosis | built, NOT wired | WIRED (S140 card, f049a650) | stageClarify.ts:78 |
| ⑥ execution decision | built, NOT wired | WIRED (same card) | stageClarify.ts:79 |
| τ / β rows | ABSENT | STILL ABSENT — no published row | domain_rules |
| Live clarify | 549/560/564 line | + S140/S141 cards (ask at parent, option label, carried option) | git log |
| turn_context trio | ABSENT | PRESENT (S141, 1f7bedcb) | types.ts:826 |
| Cross-turn carrier / P3c | ABSENT | LANDED (S140, c7779098) | merge-base |
| L5 entity-miss / retrieval-miss ledger | ABSENT | STILL ABSENT (the code's "L5" is progressive delivery — name collision) | git grep ×2 |
| OPA | ABSENT | RECON ONLY (ADR-016) | git grep |
| G coverage graph | no caller | STILL NO CALLER | git grep |
| Time | model-called tool | UNCHANGED | git grep |
| Planner | LIVE, not in A23 docs | NOT RE-MEASURED | — |
| Memory B3 | LIVE, topK=3 | LIVE — agent.memory.retrievalTopK=3 | domain_rules |
| Path B tool retrieval | built, valve CLOSED | CLOSED — vector.toolRetrievalMode=0, pathB.enabled=0 | domain_rules |
| Vector line | on, unreachable | on (vector.enabled=1, qdrant); unreachable — stale CloudFront origin (S142 diagnosis) | domain_rules + S142 |
| Web · golden · synthetic | valves CLOSED | CLOSED — web.enabled=0, golden.enabled=0, synthetic.enabled=0 | domain_rules |
| Replay / OA-10 / telemetry | LIVE | NOT RE-MEASURED | — |

A23 §9 recount: step 3 moved from "half" to "wired" (⑤/⑥ + carrier + trio). Still open: channel-2, τ/β, G,
typer, L5, pre-LLM time slot.

## TABLE B · THE WORK

| # | Work | Kind | State | Depends on | Who acts | Needs owner |
|---|---|---|---|---|---|---|
| 1 | AG-4 address repair (reclaim) | ops | IN PROGRESS | — | AG-4 | done (consent given) |
| 2 | BENCH-A2A-1 · CWF as A2A agent | product/SOTA | no card | landing path | scout→AG-4 | approve start |
| 3 | BENCH-RESET-1 · fresh-state reset | product/SOTA | no card | 2 | scout→AG+Operator | approve |
| 4 | BENCH-BACKEND-MOUNT-1 · zero-code mount | product/SOTA | no card | 2 | scout→AG | approve |
| 5 | ④ channel-2 BM25+RRF wiring | product | no card | — | scout→AG-4 | approve |
| 6 | τ/β governed rows + calibration | product | no card | 5, 9 | scout→AG+Operator | approve |
| 7 | G graph into child layer (F-S117) | product | no card | — | scout→AG-4 | approve |
| 8 | ③ typer | product | no card | — | scout→AG | approve |
| 9 | L5 miss ledgers | product | no card | — | scout→AG+Operator | approve |
| 10 | pre-LLM time slot | product | no card | — | scout→AG | approve |
| 11 | Vector origin repair | infra | diagnosed | — | AG-4 | APPROVE WRITE |
| 12 | Vector stable address | infra | no card | 11 | scout→AG-4 | approve |
| 13 | Converge association failing since 09-11 | infra | one read away | — | scout | approve read |
| 14 | Redis credential rotation | security | open | — | AG-4 | DECIDE |
| 15 | Takeover order fix + producer.md --since | factory | found tonight | — | scout→AG-4 | approve |
| 16 | ruleset:drift gh→curl | factory | found tonight | — | scout→AG-4 | approve |
| 17 | F-B scout status writer | factory | open | — | scout→AG-4 | approve |
| 18 | actionlint on workflows | factory | open | — | scout→AG-4 | approve |
| 19 | tsx IPC EPERM in lane windows | factory | found tonight | — | owner setting | decide |
| 20 | Five stale PRs (523…567) | hygiene | open, BLOCKED | — | AG-4 | approve close |
| 21 | Two S141 product findings (re-measure vs carried-option card) | product | unmeasured | — | Architect read | approve |
| 22 | OPA runtime | product/SOTA | recon only | — | later | approve |
| 23 | land.ts delete | hygiene | open | — | AG-4 | approve |
| 24 | Oven 7-day stoppages witness | witness | open | — | OWNER | — |
| 25 | S143 closing carriers (5) | governance | due at close | — | Architect | — |

END · CWF-S143-WORK-TABLE-AND-ARCHITECTURE-STATUS-v1
