# CWF — Session Graph KB · v46

<!-- CWF-SESSION-GRAPH-KB-v46 · rev 46 · 2026-07-16 · Supersedes v45.
     Story of S47 ("the routing-brain day"). Ledger: register v49 (carry-diff inside).
     Floor at close: master 4f756bb · rev 102 · 2623 tests / 267 files · migrations
     tail …backend_health (applied & live-verified). -->

## The day in one line
Two hotfixes healed the KB7 wounds before lunch; MCP-WARM-1 deleted 3.92s of dead
connection weight by dinner; and between them the owner tore up keyword routing's
stone-age contract and the semantic router's core was ON MASTER (dark) by midnight —
with S47-1 legislated in the morning and field-proven three times before the day ended.

## Chapter 1 — Parallel hotfixes & the birth of S47-1
F122 (retry error-class) → AG-A, F123 (stopword guard, write+load+defense-in-depth) →
AG-B, dispatched in parallel on disjoint surfaces. Both shipped; F123's load-guard
neutralized 24 junk DB rows (not the 5 first seen) with zero Operator action — PLATINUM
pattern textbook. The mess: the Architect issued a HOLD on a stale snapshot after AG-B
had already merged under a legitimate earlier conditional GO; both branches had resealed
to the SAME docVersion (98) and AG-A resolved the collision correctly inside the merge
commit (→99, reseal on merged tree). AG-B's refusal-on-stale-premise was named the model
behavior. Owner legislated **S47-1**: every cross-lane instruction carries a state
precondition; concurrent mapped-code phases get PRE-ASSIGNED reseal responsibility.
Branch hygiene sweep followed: all 53 dead merged branches deleted (AG-A independently
re-verified ancestry 53/53 before the irreversible delete — the S47-1 spirit, unprompted).
F81-guard then closed WITHOUT a phase: SELF-SEED-1's decl-derived seeds + parity test +
[Params] source stamps already ARE the guard; live proof arrived same-day when a brand-new
decl self-published ([Gate]+[Seed] rows=1).

## Chapter 2 — MCP-WARM-1 (F117): the connection nobody was using
Diagnosis: the 3.92s/turn discovery cost had NO consumer — execution opens fresh
connections anyway (P6.7); the eager connect's only product was tool definitions, which
backend_tools already mirrors (schema stored "for a future consumer" — this phase).
Shipped: mirror-served defs with four per-server floor triggers (never a global switch,
never a guess — F82 family), fire-and-forget self-heal feed, lazy connect = deleting the
eager one, backend_health append ledger + */30 CRON_SECRET machine-arm cron that is ALSO
the standing mirror-freshener, ACTIVE fail-open withholding (every non-fresh-down branch
incl. table-absent offers normally — the code-before-migration window safe by
construction), governed mcp.healthFreshnessSec (floor 3600, self-seeded live).
turnPathNoMirror constraint-6 was NARROWED, not silently broken — defs-only allowlist,
categories/annotations stay domain_rules-only — and ratified. Operator applied G1–G6
all-PASS; first tick 19:00:34Z wrote the first health row; DOC-FLIP 7c89f87 closed the
chain same-session.

## Chapter 3 — F127: the helper text that lied
First tick checked only superset. Root-cause hunt: Operator read-only report showed the
owner's backend_id edit had landed on a DISABLED PERSONAL row; the effective GLOBAL
armes row was still null — and the panel's own helper text ("Blank = default (armes)")
had rationally encouraged leaving it blank, while MCP-WARM-1's two new consumers are
explicit-only. Fix = one field on the right row. Tick 20:00:02Z: {checked:2, up:2},
armes 141 tools / 2273ms. F127 CLOSED same night; F127.b (copy fix) rides SR1-W2.
Side lesson: a "missing" cron tick was actually on the NEW production deployment after
the DOC-FLIP switch — re-resolve the production deploymentId before scoping log reads.

## Chapter 4 — The owner tears up the contract (SR-1)
A live English query ("active alarms in a table format") hit the scope-refusal wall.
Debug chain, all evidence: routing starved the model — 'alarms' (plural) missed the
'alarm' keyword (exact-token match, line 432), the only matched category came from
learned junk, and tool-starved Gemini dressed "no capability" as "out of scope" (F84).
Architect proposed a morphology interim (MATCH-FOLD); the owner REJECTED it as
stone-age patching and demonstrated the alternative live: flash-lite + the 12-category
catalog mapped the same sentence to `andon` in one shot. Convergence sealed the same
hour: catalog stays the governed spine (a keyword = a published row); a cheap LLM does
MEANING inside deterministic rails (Zod armor, catalog-subset, hard cap, floor on any
failure); proposals become VISIBLE drafts accepted through the gate (the anti-junk-learn);
keyword+learned path survives as the floor; acceptance = REPLAY-A2 routing lens, not
vibes; router prompt is a SEPARATE kind — structurally outside the golden gate/freeze.
Design note + mermaid signal-flow diagram approved; M2→SR-1 gate consciously lifted.

## Chapter 5 — SR1-W1 ships dark
AG-B built the core in hours: semanticRouter.ts (relocated out of turn/ when a locked
test — unifiedPath — banned raw SDK calls there; RULE 35), routerModelId() reused from
PROV-1 (pre-existing, verified — better than the spec's own fallback), three governed
params self-seeding, 12 description glosses, [Route] line + cwf.route.* attrs, 19-case
armor matrix, and the phase's spine: a dark-launch equivalence test proving master-
byte-identical behavior at router.enabled=0. One integrity incident: AG-B's report
claimed MCP-WARM-1's reseal "was never actually applied" — the Architect ran the gate
on master directly ([OK]) and REQUIRED the false claim corrected pre-merge (the ledger
never carries a false incident). S47-1 then fired twice more on its own precondition
mechanics (DOC-FLIP moved master mid-flight; AG-B stopped and asked; rebase → reseal
rev 102 exactly as pre-assigned). Merged 4f756bb. The routing brain is on master,
one param publish away.

## Standing truths reaffirmed this session
Deterministic trust untouched by SR-1 (router narrows ATTENTION, never judges truth) ·
empty≠zero extended to catalogs (absent mirror ≠ empty toolset) and health (cron-down ≠
chat-down) · PLATINUM: every fix that could be data WAS data (F127), every mechanism
self-heals (mirror feed, self-seed) · GOLDEN FREEZE never approached — SR-1's prompt
lives in its own kind, its lens is ordinary replay.

<!-- END · CWF-SESSION-GRAPH-KB-v46 · rev 46 · 2026-07-16 -->
