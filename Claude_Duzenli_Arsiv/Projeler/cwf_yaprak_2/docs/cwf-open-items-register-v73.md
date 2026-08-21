# CWF — Open Items Register · v73
<!-- cwf-open-items-register-v73 · 2026-07-30 · CLOSES S71. Supersedes v72
     (the mid-session checkpoint). S63-2: SELF-SUFFICIENT — every open item
     carries full wording here; v72's §2 decisions carry forward verbatim in
     substance. -->

## §0 · FLOOR (verified from a fresh clone at session close)

```
origin/master   a51d70ec9496bace8d319939d055f3ca98a75556
vitest test files 391 · tests 4353 · migrations 61 · docs/adr 11
docVersion      rev 164 · 2026-07-30
production      dpl_F4AwANCkfgULaNCnhVf9FTXzU8zx · READY · SHA=a51d70ec
DB              episodes LIVE (Operator apply, verifyGrants 58/58) · ≥1 real row
```

IN FLIGHT (expected, not drift): `phase/memory-1b` — the 1B prompt is cut,
uploaded, and relayed to AG; AG may push at any time. Its §0 HARD GATE
requires the first live `[MemoryForget]` tick line before ANY work — AG
cannot legitimately start before that evidence exists (~03:40Z).

**Merge ladder, S71:** `5b91d117` F214-FLOOR-SYNC-1 · `a51d70ec` MEMORY-1A
("the platform stops treating every conversation as its first"; CI full-suite
green ON THE MERGE SHA incl. eval-canary — deviation note: `Build and Test`
triggers are push:[master]+PR-only so phase branches never attach; AG rightly
did NOT force workflow_dispatch, which would fire the spend-fenced canary).

## §1 · S71 SESSION RECORD

**A2/F153 CLOSED@evidence** — three witnesses (ops curl end-to-end on
armes-reports2.ardich.com · Architect DNS 88.99.188.61 · owner browser);
`SUPERSET_PUBLIC_BASE_URL` set; the CWF rewrite branch intentionally dormant
(a future firing is itself a finding).

**A6/F214 CLOSED@evidence (`5b91d117`)** — the floor is a GENERATED mirror of
the live catalog (12/108/97/0-write; `sync:routing-floor --report|--write`,
idempotent, positive-control-proven). Category order preserved (real
dependence: router-fallback prompt renders array order). Forward obligation:
A5's tools.rule.1/6 v2 publishes re-diverge it → ONE re-run inside A5.
Final live witness landed on turn `c611dc4e`: `catSource=db catCount=12`.

**A4/MEMORY-1 · 1A functionally COMPLETE — closure pending exactly ONE read.**
Chain in one session: PHASE-MEMORY-1A relayed → AG sealed `bdee3118`
(391/4353; P-A field-source table; disposable-pg double-apply; RED-capable
controls) → Architect RULE-25 PASS (both modified tests verified as
STRENGTHENINGS: learnBrake dual-pin · C-SEAM read/stamp split via
REPLAY_CTX_STAMPED_FIELDS; two AG self-decisions ENDORSED: 42P01
silent-degrade pre-apply window [RouterProposals precedent] ·
conversation_id deliberately NOT an FK [a conversations write failure must
never cost an episode]) → merged `a51d70ec` → **Operator apply G0–G5 ALL
PASS** (drift pre-read exactly-one-missing; second push "up to date"; 16
cols/4 indexes/RLS on/0 policies/0 rows-as-expected; verifyGrants **58/58**
incl. the episodes probe 42501) → **first episodic row written on a real
production turn** `c611dc4e`: `[MemoryWrite] user=f4805bd1-… tools=3
entities=0 importance=2` (entities=0 is the HONEST zero — resolver dark,
`resolverRan=false` bit in the row). Bonus witness on the same turn:
`agent.memory.ttlDays` SELF-SEEDED THROUGH THE GATE live (`[Gate]
verdict=published rule=6defd310` · `[Seed] rows=1 skipped=27 failed=0`).
**Remaining for CLOSED@evidence:** the first `[MemoryForget] deleted=N
scanned=M` tick (~03:40Z; expected honest `deleted=0 scanned=≥1`) — S72's
OPENING read; the same line unlocks AG's 1B gate.

**PHASE-MEMORY-1B-v1 CUT + UPLOADED + RELAYED** (retrieval · stage-'05'
slice · U-1 chip · U-3 params surface · MEMORY-LENS · DOC-FLIP rider).
Committed inside: M-MEM2=0 is a CONSTRUCTION guarantee (zero memory imports
in grounding/knowledge-warm, grep+test-pinned) with a poisoned-fixture
positive control · `agent.memory.retrievalTopK` clamp [0,8] with 0 = the
kill-switch (learnEnabled brake twin) · weights/window code-floor (DL≤2
precedent) · bounded reads only (F198) · lens refuses quality-gain claims
(ROUTE-SHADOW refusal) · chip live-turn-only (SCOPE-HONEST disclosure) ·
rendered evidence @1280/@1024 for U-1 and U-3 · the 1A migration DOC-FLIP
rides G6 with S35-1 comments-stripped proof.

## §2 · DECISIONS OF S71 (carried from v72 §2 in full force)

E-1 exemplar-weighted retrieval (v1.1, rides the store unchanged) · E-2
fine-tuning dual-trigger watch (measured ceiling + M-C-controlled comparison)
· E-3 "semantic memory" vocabulary disambiguation · **MEASURE-1 umbrella
(v1.1 HEAD): FEEDBACK-1 + HEALTH-DASH-1, three phases PRODUCER-FIRST**
(turn_feedback mechanism → aggregates + governed health.* thresholds + the
ONE new counter [W2.4 withholding windows] → six-band dashboard + feedback
queue); three hard rulings (feedback NEVER auto-learns · denominator honesty
with governed N + Wilson CI · every 👎 = golden-specimen candidate);
verdict-first cards · empty≠zero ON the dashboard · measurement-health band ·
RAG card free-by-construction (R9) + attribution-coverage % + F207-class
adoption · secret-freshness card (armes-daily-token age >~20h = izle) ·
cron last-run-age card · quota fail-open + canary strip · "PROBLEM→push"
named v1.1+ · **R10 proposed-and-withdrawn: scope-cut v1_2 UNAMENDED** ·
MCP 2026-07-28 four dispositions (B4-lite guard(a) = SDK-1.29.0 handshake
proof; backend spec-drift WATCH; MCP Apps conscious non-adoption under F187;
Tasks → F178 note).

## §3 · LIVE GOVERNED STATE (re-derive from here — never from memory)

```
router.frameRouting = 0 (DARK) · learnEnabled = 0 (BRAKED) · contextTurns = 2
tool_category_cache = 2 rows both pinned · epoch 12
router_proposals = 20 / 0 pending / 1 accepted / 19 rejected
mcp_settings = 3 rows ZERO credentials · global = 2 apiKeyRef entries
mcp_secrets = 2 (armes-daily-token 2026-07-30 · supersettoken 07-06)
armes.tool_category = 12 / 108 slots / 97 distinct / 0 write · FLOOR == LIVE
agent params live: temperature·historyWindowN·maxToolRounds·maxOutputTokens·
  thinkingBudget·(+ agent.memory.ttlDays = 90, self-seeded S71)
episodes: LIVE · RLS on/0 policies · service-role-only · ≥1 row ·
  forget cron 40 3 * * * (first tick pending)
entity_registry: 17 factory · 779 line · equipment 0 (never-discovered)
corpus 167 tools / 796 entities · synthetic = frame-only
SUPERSET_PUBLIC_BASE_URL = SET
```

**S71 observations (recorded, not findings):** `[CatalogSync] armes
missing=4` on post-F214 ticks (consistent with the 7 no-longer-live floor
tools' family; standing mirror behavior) · **ACL maintain-residue:**
anon/authenticated hold ONLY `m` (MAINTAIN, PG17) on `episodes` — the
standing revoke list covers select/insert/update/delete/truncate, not
maintain; PostgREST cannot express MAINTAIN and 58/58 proves the REST
surface shut; likely family-wide → **parked micro-item
MAINTAIN-RESIDUE-SWEEP** for the next grant-hardening pass.

## §4 · CORRECTIONS (append-only)

v72 §4 carries (v71 date-string · branch counts · S71 premise errors ×2:
the regex-census artifact absorbed by P-B as designed; the self-assigned
unproducible proof read folded to AG's lane at GO). No new corrections after
the checkpoint.

## §5 · THE v1 PATH (scope-cut v1_2 UNAMENDED)

```
 ✅ A1 · ✅ A9 · ✅ A2 · ✅ A6
 ▶  A4 MEMORY-1: 1A DONE-pending-one-read → 1B (prompt relayed; gate=tick)
                 → 1C (promotion + U-2 admin tab; F48 CLOSED@evidence there)
 ∥  B4-lite RAG (team-side readiness; guard(a) += SDK handshake; escape to v1.1)
 4. A5 freeze lift + 4 publishes + F133-L5 + F83.1 + THE FLOOR RE-SYNC RE-RUN
 5. A7 B6 min docs + D-2 + D-3 + ADR-012 draft
 6. A8 B7 tag + release notes + branch pruning (recount at A8)
```
v1.1 queue: **MEASURE-1 (head)** · E-1 · then v72 §5's list unchanged.

## §6 · DARK FLAG + §7 · PARKED — carried VERBATIM in substance from v72
(§6 stageClarify unreachability + A23-after-B7 + M1 5/52 rule; §7 full
parked list: M-C · SYNTH-TRAFFIC-2/F204 · F196 · F202 · F208 · F211 (→
MEASURE-1 card) · F216 · F219 · F198 · DISCOVERY-EXTEND-2 · F184 · B5 · M-B
· F178(+Tasks note) · F179 · F180 · F165 · D5 · F189 · F191 · F207 (→ RAG
adoption twin) · F197 riders · CLASS-GATE-1 · E-2 · E-3 · MCP-SPEC-DRIFT ·
F-CONTEXTTURNS · F-LEARNENABLED-PROVENANCE) **+ NEW: MAINTAIN-RESIDUE-SWEEP
(§3).**

## §8 · LAWS
No new laws minted in S71. Every prior law survives by name. Practice
precedent recorded: the MID-SESSION CHECKPOINT REGISTER (v72) — when the
owner asks for decisions to be sealed mid-flight, cut a full-text version
immediately; version numbers are cheap, lost decisions are not.

<!-- END · cwf-open-items-register-v73 · 2026-07-30 · closes S71 -->
