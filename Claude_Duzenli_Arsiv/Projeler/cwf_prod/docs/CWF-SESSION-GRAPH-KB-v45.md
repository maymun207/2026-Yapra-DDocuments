# CWF — Session Graph KB · v45

<!-- CWF-SESSION-GRAPH-KB-v45 · rev 45 · 2026-07-16 · Supersedes v44.
     Story of S46. Ledger of record: register v48. -->

## S46 — "the freeze-and-spine day"

**Arc 1 · The golden saga (morning→midday).** The S45 batch verdict arrived
`underpowered/completed=false`. Diagnosis chain, all machine-read: run 1 died on a
SILENT quota clamp (F113 — reserve = least(12M, remaining≈7.45M), never printed;
settle overshoot −33,386 matched arithmetic exactly). Run 2 (headroom raised via
gated setLimit) exposed the SECOND silent clamp: runPairedReplay's default
per-pair pot (env CWF_REPLAY_TOKEN_BUDGET || 500k) starved the candidate arm —
baseline eats first (structural 71-vs-54 asymmetry, F115). Run 3 (pot widened to
1.5M process-scoped) died on F113 AGAIN (window consumed by runs 1–2). Run 4
(governed ceiling published 12M→16M — golden-exempt kind — + headroom) finally
reached completed=true/underpowered… and the publish REJECTED both prompt.segments:
the SAME job's 17 superset rows changed gatewayProtocol's composition
(composeSuperset), so promptRevFrom-hashed certificate world diverged. The
integrity gate was RIGHT; the job design was the defect → **S46-1**. 17/19 rows
went LIVE → SUPERSET-SERVE-1 + the long-deferred Superset DB-first activation
CLOSED (P3 probe double-pass, owner screenshots). Owner then legislated the
**GOLDEN FREEZE** — run 5 parked, all golden infra below product work. Along the
way the owner's own questions minted GOLDEN-BATCH-2's requirements (FIFO/chunk/
resume), GOLDEN-ASSIST-2 (deterministic-signal exam curation), and the certificate
explainer (Wave-2 raw material).

**Arc 2 · Laser spine closure (owner directive: "everything today").** Parallel
lanes under the new identity-tag protocol ([AG-A]/[AG-B] + IDENTITY CHECK — which
saved the day twice when the inherited-workspace trap fired; S46-2 minted, S44-1
amended after AG-B's sub-agent near-miss). Shipped chain on master:
6c54fba S46-MECH-1 (F94 · HOTFIX-6 · F87 deterministic own-data labels ·
dialog empty≠zero three-state · F112-class UsersTab fix · TS2339 closed@HEAD) →
873c4ba S46-GATE-1 (422-as-data F88 · F90 identity guard · Audit trail tab ·
[Gate] choke point G4 · GATE-REF-1 key≡payload.tool invariant; PR #52's first CI
correctly caught a doc-drift reseal gap → rev 93) → dfb7878 WAVE2-DOCS-1 by AG-B
(5 code-grounded user docs + DocLink + F116 two-orders + arrival strips; W1/W3
verified already live at b82dc87 — S46-3 minted) → 806b8c2 SELF-SEED-1 (boot
reconciler through the real gate, seed_state ledger, seed commands demoted;
SELF_SEED_ACTOR_EMAIL interim = ksadmin, F120 queued) → first live run EXPOSED
the mixed-backend absence bug (31 rows re-/seeded, 16 needless churn — clean
version bumps, zero duplicates) → 2b1bd7c SELF-SEED-FIX-1 (X1 per-instance
backend scoping · X2 insert-as-claim + release · X2b stale-claim reclaim
[Architect-caught liveness gap] · X3 partial unique index one-published-per-key —
app promise → DB guarantee · X4 query-form-tool-vocabulary healed into the floor ·
X5 first-claim visibility) → both migrations Operator-applied (Gemini, all
G-gates verbatim green) → live proof `[Seed] domain=armes.reference
fingerprint=9663d15922aa rows=0` → 5cb873f DOC-FLIP (rev 97).
F101 resolved with a live-truth premise correction (real violator archived);
F80 closed on evidence (44 write tools: zero usage in full telemetry history →
6 categories republished write-free, [Gate]×6).

**Arc 3 · Live findings at the wire.** KB7-OEE turn errored user-visibly
(finishReason=error, attempt=0, F69 honest message worked) → retry succeeded →
**F122** (extend bounded retry to error) + **F123** (learned-map stopword
pollution × all matched categories — SR-1 evidence grows). Owner decided
eval-canary STAYS (it fired in prod under governed caps).

**Concept deliveries (owner-education, Wave-2 raw material):** mapping = two
deterministic dictionary lookups (learned/keywords → categories → tools; router
LLM only on miss, learns FINDS never KNOWS) · certificate = Layer-2 golden
verification contract (completed/hash/freshness/regression; underpowered allowed
+ flagged) · logical 00-14 vs physical execution order (F116, shipped same day) ·
per-turn MCP discovery reality (5-min warm cache; MCP-WARM-1 三-part design) ·
source:"db" param provenance.

**Badge at close:** master **5cb873f** · docVersion **rev 97** · **2544 tests /
261 files** (2b1bd7c; DOC-FLIP comment-only) · migrations tail
…seed_state + …domain_rules_one_published_per_key, both applied & live-verified ·
GOLDEN FREEZE standing · quota limit 38,081,613 · governed golden ceiling 16M ·
SELF_SEED_ACTOR_EMAIL live in Vercel prod.

<!-- END · CWF-SESSION-GRAPH-KB-v45 · rev 45 · 2026-07-16 -->
