# CWF — Master Plan to Release · v5_3 (Path B split; the router line pulled forward)

<!-- cwf-master-plan-v5_3 · rev 5.3 · 2026-07-28 · S68 · Architect: Claude.
     Amends v5_2 (rev 5.2, 2026-07-21 — IMMUTABLE, S37-1, archived).
     TWO structural changes + one sequencing change, all owner-ratified this
     session. Every v5_2 item survives by name (§5 carry check). -->

## §0 · What changed from v5_2, and why

**v5_2 conflated a FUNCTIONALITY with an INFRASTRUCTURE.** It placed "Path B" —
IR + hybrid retrieval — wholly outside the release track, to start after BLOCK 7,
gated on a real federated backend arriving. The owner rejected that gate on
2026-07-28 and he is right on measured evidence:

- the tool corpus is already **167 tools** (141 ARMES + 26 Superset), and the
  gear that navigates it is measurably broken — `tool_category_cache` learns
  entity names and time words as domain signal (`glazur1 → [material]` vs
  `glazur3 → [metrics, production, andon, factory, machine]`, sibling lines,
  wholly different routing, F185);
- `ROUTING_STOPWORDS` is a hand-authored ~90-word list whose own comments record
  three *"observed production-leak top-up"* blocks — it grows with the WORLD and
  fails ADR-009's degree test;
- the relevance filter's founding premise (*"it helps weak models navigate ~140
  tools"*) is falsifiable and the first evidence goes AGAINST it (F-PROVIDER);
- Recall@k has never been named or measured (F129).

**And half of Path B was already inside the plan without v5_2 noticing it.**
A23 v1_3 §9's build order (owner-approved, binding) contains:

| A23 §9 | Content | = Path B's |
|---|---|---|
| **Step 4** | ③ typer + ④ **second channel (BM25) + RRF** | retrieval gear, on the **ENTITY** corpus |
| **Step 6** | **word-map ROLE CHANGE** + `router_proposals` closure loop | retrieval gear, on the **TOOL** corpus |

So the amendment is not "pull Path B forward". It is: **stop calling the
functionality by the infrastructure's name.**

---

## §1 · THE RELEASE TRACK — unchanged in structure

GATE-0 → **B1 IR ✓** → **B2 Superset ✓** → B3 Memory → B4 Kale-RAG →
B5 cleanup + **GOLDEN FREEZE LIFT** → B6 docs+arch → B7 release close.

Block contents are **unchanged from v5_2** — MEMORY-1/F48/F83+F83.1 (B3) ·
Kale-RAG (B4) · security-cleanup + the freeze block (viz v4 · safety.b1_scope v3 ·
tools.rule.1 v2 · tools.rule.6 v2 · F138/F139/F140 · F133-L5 · F83.1 golden
sub-items) + golden-infra (F142 · BUDGET-HONEST-1 · GOLDEN-ASSIST-2 ·
SPECIMEN-HEALTH-1) + dev-preview seam residuals + F118 · F119 · F120 · F135 ·
F122 · LANGFUSE-V4-UPGRADE · separate-POC-key belt · STAGE-PLAYGROUND · branch
cleanup · BOARD-WALK residuals (B5) · FINAL docs+arch (B6) · close (B7).

**Honest position statement (new at v5_3):** the work actually running today —
F187, F199, F177, F196, F185, M-C, F175, F198, F197, M-B/F178/F179/F180 — is
**not inside any block**. It is the measurement-and-hardening line between B2 and
B3. That is legitimate, but it must be said out loud: **B3 has not started.**

---

## §1.5 · NEW — THE ROUTER LINE (pulled to the front)

This is the sequencing change. **The router that will serve is already written
and merged; what is missing is not code but the number that justifies turning it
on.** Three things are called "router" in this system and they have three
different fates:

| # | Thing | Today | Fate |
|---|---|---|---|
| 1 | **Semantic router** (`semanticRouter.ts`) | **SERVING** — 493 of 500 injections carried a frame, and a frame exists only on `path='semantic'` ⇒ ~98.6 % | **Stays** |
| 2 | **Learned word map** (`tool_category_cache`) | Contaminated; serves as the floor tier when the router floors | **Not repaired — RETIRED.** Pinned, measured outage floor (A23 Step 6) |
| 3 | **Frame router** (IR-3, rev 129) | **Merged, DARK** — `router.frameRouting = 0` | **This is the router. It gets turned on.** |

**Blast radius of #2, stated so it is never re-feared without evidence:**
`toolCategories.ts` pins *"THE AVAILABILITY FLOOR IS SACRED"* — `ALWAYS_INCLUDE`
is unioned on **every** path and a learned slice *"may ADD or CHANGE matched
categories but can never drop `ALWAYS_INCLUDE` or collapse the set to empty"*;
zero keyword matches returns `path:'all-fallback'` with `filtered: allTools`.
The worst case is an over-broad or mis-aimed candidate set — **never zero tools**,
and never a correctness or grounding effect (ADR-001 is deterministic and the
clarification gate reads governed rows + a static matrix only).

**The ordered line:**

1. **F187** — gateway surface (in flight, Author lane).
2. **F185-BRAKE** — `router.learnEnabled`. One governed param, three machine
   write sites. *Why first: the map mutates itself while being measured; an
   instrument cannot be calibrated against a moving target (S65-3).*
3. **ROUTE-SHADOW** — a replay lens over ALREADY-RECORDED frames: what
   `frameRouting=1` would have offered vs what was actually called. Produces
   frame accuracy (P1) and **Recall@k** (F129's owed metric). **No new traffic is
   collected — `router.frameEnabled=1` has been recording frames all along.**
4. **`router.frameRouting = 1`** — a governed publish, owner-consented, on the
   §3 evidence. **The router "works" at this step.**
5. **F185-GUARD + word-map retirement** (A23 Step 6) — exclusion sources are
   `entity_registry` (779 rows, from F183) for entities and the deterministic
   `resolve_time_range` for time words.

Then the pre-existing queue resumes: F199 · F177 · F196 · M-C · F175 · F198 ·
F197 riders · M-B/F178/F179/F180.

**Named risk, disclosed before the fact:** an unmapped `(action × object)` pair
(20 of 78) behaves EXACTLY as today, so turning the flip on cannot hurt there.
The single real risk is a **high-confidence WRONG frame** replacing the candidate
set outright. Step 3 exists to size precisely that, and if it comes back worse
than expected, step 4 waits and a frame-correction phase is born between them.

---

## §2 · PATH B — SPLIT (this is the structural amendment)

v5_2's §2 is superseded. Path B is now two things with two different homes.

### §2.1 · IN THE RELEASE TRACK — the retrieval FUNCTIONALITY

- **PB-A · entity corpus** = A23 §9 **Step 4** (③ typer + ④ second channel
  BM25 + RRF fusion). Already owner-approved inside the binding design; ships
  with the F175/A23 line. Evidence it is needed today, not at federation: the v3
  baseline's `sırlama 3-4-5` multi-token surface, the `Ganit` typo, and 110 of
  164 blocked frames being numeric record identifiers (F177).
- **PB-B · tool corpus** = A23 §9 **Step 6** (word-map role change). It
  **replaces** the learned keyword map rather than improving it.
  **Hard precondition: M-C.** M-C answers *does the relevance filter help or
  hurt weak models?* If it hurts, PB-B's job is to remove a layer, not to build a
  better one. Building before that measurement would repeat F194's premise error
  — filling a road to a door nobody knocks on.

### §2.2 · ENGINE RULING (owner-ratified 2026-07-28)

**The retrieval engine is Postgres today, behind a contract interface, with the
swap trigger named in advance.** This is A23 §6's own doctrine (coverage graph:
*"BUGÜN Postgres + recursive CTE… YARIN aynı arayüz, arkada Neo4j / Apache AGE.
Motor = uygulama detayı"*) applied to retrieval as well.

- Lexical/sparse: Postgres FTS (`tsvector`) / `pg_trgm`. Dense (only if the
  measurement asks for it): `pgvector`. Fusion: RRF, which is arithmetic.
- Governed params keep Path B's contracted names — `retrieval.topK`,
  `retrieval.scoreThreshold`, fusion weights — so the swap changes an engine, not
  a vocabulary.
- **Named swap triggers (an alarmed shelf, "it would be nice" is NOT a
  trigger):** (a) corpus growth past what a single Postgres index serves inside
  the turn's ms budget; (b) p95 retrieval latency on the critical path;
  (c) tenant-per-collection isolation becoming a real multi-tenant requirement.
- **Metric + watchdog:** Recall@k (named at ROUTE-SHADOW) + retrieval p95.

**Consequence: zero new infrastructure, zero spend consent, zero IaC program
required to get the functionality.** That is why this amendment delivers it
sooner than pulling Qdrant forward would have.

### §2.3 · ADJACENT PROGRAM after BLOCK 7 — the INFRASTRUCTURE only

**Qdrant** (dense+sparse in one collection, server-side RRF, collection-per-
tenant) · **bge-m3** self-hosted embedding service (a deterministic encoder, NOT
an LLM) · **OPA** tool-chain policy engine (fail-closed Rego from the governed
`tool_annotation` overlay).

**OPA stays here, and the Architect held this position under pressure:** F187 is
landing `gatewayPolicy.ts` as deterministic fail-closed code this week, and F80
fail-closed write exposure already exists. Adding Rego today would duplicate
governance we are building. OPA earns its place when policy spans **tenants and
tool chains** — i.e. real multi-tenant EAIP.

**The A↔B bridge is kept unchanged from v5_2:** a retrieval-miss ledger surfaces
frequently-used Yol-B intents; each promotes to Yol A with ONE governed row. This
is still why we do not inflate the Yol-A table by hand.

---

## §3 · DECISIONS — status after this amendment

- **A** · Superset early → CONFIRMED, shipped (B2 ✓).
- **B** · F83 in Memory (B3) → unchanged default.
- **C** · #5 = Path B → **RE-RESOLVED at v5_3:** functionality in-track (§2.1),
  infrastructure adjacent (§2.3). v5_2's single-bucket answer is superseded.
- **D** · Pull K1 early → CLOSED (K1 §8 ratified; frame enums live).
- **E** · GOLDEN FREEZE lift at BLOCK 5 → unchanged.
- **F (new)** · Retrieval engine = Postgres behind an interface → **RATIFIED**.
- **G (new)** · Router line to the front of the working queue → **RATIFIED**.

---

## §4 · LOCKED / HARD DEPENDENCIES

- **PB-B needs M-C** (§2.1) — a measurement, not a build.
- **M-C needs F185-BRAKE** — without a learning freeze the arms contaminate each
  other, which is exactly what happened in the S66 A/B.
- **Step 4 (`frameRouting=1`) needs ROUTE-SHADOW** — the flip is an owner-consented
  publish on evidence, never on confidence.
- **Kale-RAG (B4) needs Kale's side ready** — external; parks if not ready.
- **Path B INFRA (§2.3) needs B7** — unchanged.
- Architecture laws unchanged: DB-first/code-floor · empty≠zero · deterministic
  trust (ADR-001) · eval-gate unbypassable · backend-identity-is-DATA · C1 LAW ·
  ADR-005 two doors · ADR-009 degree test · ADR-010 per-tool trust.

---

## §5 · GOLDEN LEDGER — carry check

Every v5_2 item survives by name: GATE-0 · IR-3 / IR-4-contract / riders (B1 ✓) ·
Superset E (B2 ✓) · MEMORY-1 / F48 / F83 + F83.1 (B3) · Kale-RAG (B4) ·
security-cleanup + FREEZE block (viz v4 · b1_scope v3 · tools.rule.1-6 v2 ·
F138-140 · F133-L5) + golden-infra (F142 · BUDGET-HONEST-1 · GOLDEN-ASSIST-2 ·
SPECIMEN-HEALTH-1) + F118-120 · F135 · F122 · LANGFUSE-V4 · STAGE-PLAYGROUND ·
dev-preview-seam · BOARD-WALK (B5) · FINAL docs (B6) · close (B7) · **Path B**
(now split, §2.1 + §2.3 — Qdrant · bge-m3 · OPA all survive by name in §2.3) ·
the A↔B bridge (§2.3).

**Moved, not dropped:** Path B's retrieval functionality moved from §2 into the
release track (§2.1) and into A23 §9 Steps 4 and 6, where it was already
scheduled. **Absent-without-a-home: EMPTY.**

<!-- END · cwf-master-plan-v5_3 · rev 5.3 · 2026-07-28 · S68 -->
