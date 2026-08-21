CWF — Master Plan to Release · v5_2 (Path B relocated; #5 resolved)

cwf-master-plan-v5_2 · rev 5.2 · 2026-07-21 · Architect: Claude Amends v5 (immutable, S37-1). ONE structural change + one clarification, both owner-decided this turn:

#5 "BM25+regex hybrid" = Path B (cwf-ir-pathb-hybrid-logic-v1_3) — NOT a router swap (pure BM25 was design-eliminated, §6) and NOT a today-scale phase. It is the hybrid-retrieval SECOND GEAR that mounts BEHIND IR for 1000+ federated tools (SAP / IoT-Ignite).
Owner decision: close the PRODUCT first (IR → Superset → Memory → RAG), then run Path B as an ADJACENT PROGRAM immediately after — queued, not deferred-to-someday. Rationale accepted: we'll build it eventually, so no half-baked Yol-A table inflation; but Path B needs IR's canonical frame to exist (it never sees raw language) and only proves out against a real federated corpus — so it runs AFTER the product spine, not inside it.

PLATINUM statement: sequencing only; every spawned phase self-configures and carries its own PLATINUM line. Path B's 3 new components (Qdrant + bge-m3 + OPA) are one-click/IaC-provisioned when that program starts — no manual runway.

§0 · GATE-0 — "no UI crap" (unchanged from v5)

Release track starts only after (a) PANE-SCROLL-2 merged + (b) BOARD-WALK re-walk (cards 01·02·04·05·06·08·09·10·13·14) + (c) owner says "UI clean." Current: PANE-SCROLL-2 prompt authored, awaiting handoff.

§1 · THE RELEASE TRACK — 7 product blocks (owner-ordered)

BLOCK 1 · IR fully closed (your #1)

K1 ratification — traffic-window review; taxonomy §8 answered with IR-1 shadow-frame data. The date (~Aug 2) is an Architect ESTIMATE; the real gate is DATA sufficiency → §3-D (pull early if the data is already there).
IR-3 — THE flip (frame→semantic→keyword primary; clarification ACTIVE; COMMAND×F80 honest message = ALT-D). Riders: semanticRouter.ts:179-181 stale comment · F134 · F146 · F147 · enrichment 4th-tier sentence.
IR-4 — Path B CONTRACT prose (zero build): the future-state contract lives in IR-0. This is the ONLY Path-B artifact inside the release — the CONTRACT, not the build. cwf-ir-pathb-hybrid-logic-v1_3 is that contract, already authored; IR-4 = fold its one-page summary into IR-0.
Freeze-independent: IR-3 publishes router.prompt (normal eval gate, not prompt.segment) → IR closes UNDER the GOLDEN FREEZE.

BLOCK 2 · Superset (your #2 — pulled early, §3-A CONFIRMED)

Superset E-activation — DB-first serve: seedRules.ts publishes Superset rule_kinds + CORE rules to the governed DB + backfill backend_id:'superset' on the supersetArmes mcp_settings entry. Rides the normal eval gate (not prompt.segment) → freeze-independent, clean at #2. Verify live via Vercel logs that answers route via Superset, not only ARMES.

BLOCK 3 · Memory (your #3)

MEMORY-1 — episodic memory (stages 05 + 14, F48).
F83 arc — KB → web → write-back (loosen safety.b1_scope; F83.1). Folded here because MEMORY-1 enables it (§3-B). F83.1's golden sub-items wait for the freeze lift (BLOCK 6).

BLOCK 4 · RAG connection (your #4)

Kale-RAG — enters as an MCP backend ROW (never a side-channel). EXTERNAL dependency on Kale's readiness (§4). Architect guidance already delivered (chunk identity, ARMES zone/line/equipment tagging, active|superseded, TR hybrid search). Note: Kale-RAG is the FIRST real federated consumer — it is the natural corpus that makes the adjacent Path-B program testable rather than a dry empty install.

BLOCK 5 · Little items + cleanup (your #6 — GOLDEN FREEZE LIFTS HERE)

security-cleanup: mcp_settings 6/6 raw→apiKeyRef + DB-introspection endpoint.
GOLDEN FREEZE LIFT → staged prompt.segment publishes: viz v4 · safety.b1_scope v3 · tools.rule.1 v2 · tools.rule.6 v2 (F138/F139/F140) + F133-L5 (mint) + F83.1 golden sub-items. Golden-infra: GOLDEN-BATCH-2 (F142) · BUDGET-HONEST-1 · GOLDEN-ASSIST-2 · SPECIMEN-HEALTH-1.
dev-preview seam residuals · F-number tail: F118 · F119 · F120 · F135 · F122 · LANGFUSE-V4-UPGRADE · separate-POC-key belt · STAGE-PLAYGROUND · branch cleanup · BOARD-WALK residuals.

BLOCK 6 · Docs + architecture (your #7)

FINAL combined docs+arch pass: CLAUDE-PROJECT-INSTRUCTIONS · architecture maps (map / runtime-topology / control-plane blueprint) · ADRs · governance-replay explainer (refresh only if drifted) · release notes.

BLOCK 7 · Release close (your #8)

Final floor freeze, tag/version, close artifacts (register/KB/bootstrap), the release-close declaration.
§2 · THE ADJACENT PROGRAM — Path B (starts immediately after BLOCK 7)

(your #5, relocated per your decision — queued next, not someday)

Scope: IR + Hybrid Retrieval (cwf-ir-pathb-hybrid-logic-v1_3, the authored contract). 3 new prod components: Qdrant (dense+sparse in one collection, RRF fusion, tenant-per-collection) · bge-m3 embedding service (deterministic encoder, NOT an LLM; TR multilingual) · OPA tool-chain policy engine (fail-closed, Rego from the governed tool_annotation overlay). New pipeline steps ⑥a resolver / ⑥b Qdrant retrieval / ⑥c OPA filter + ALT-C (retrieval-empty) + ALT-D (exposure-ungoverned). Zero new LLM calls.
Why AFTER the product, not inside it (locked rationale): (1) Path B never sees raw language — it searches the IR canonical frame, so it CANNOT exist before IR closes (BLOCK 1). (2) Its value is 1000+ federated tools; it only proves out against a real federated corpus (Kale-RAG in BLOCK 4 + Superset), so it runs after those land. (3) It is an AWS/IaC infra program (3 self-hosted components), not a code phase — its own runbook.
The A↔B bridge (kept): a retrieval-miss ledger surfaces frequently-used Yol-B intents → each promotes to Yol A with ONE governed row. The system moves its most-valuable paths to the most-deterministic gear over time. This is why we do NOT inflate the Yol-A table by hand now.
§3 · DECISIONS — status after this turn
A · Superset early → CONFIRMED (locked at BLOCK 2).
B · F83 in Memory (BLOCK 3) → default (folded; say the word to split it out).
C · #5 = Path B → RESOLVED (relocated to §2 adjacent program).
D · Pull K1 early → OPEN, highest leverage. Want me to read the live IR-1 shadow-frame volume + enum-drop + routing_mismatch NOW (Vercel/telemetry, no agent)? If §8 is answerable with power, BLOCK 1 starts before ~Aug 2. Matches your "faster" push.
E · GOLDEN FREEZE lift at BLOCK 5 → default (IR-3 + Superset are freeze-independent; staged prompt.segment publishes live at BLOCK 5). Confirm or lift earlier.
§4 · LOCKED / HARD DEPENDENCIES
K1 needs shadow-frame data (BLOCK 1) — the ONE true data-gate; the DATE is soft (§3-D), the DATA is the gate.
Path B needs IR closed (BLOCK 1) — canonical frame is its only query input.
Kale-RAG (BLOCK 4) needs Kale's side ready — external; parks if not ready.
Architecture laws unchanged: DB-first/code-floor · empty≠zero · deterministic trust (ADR-001) · eval-gate unbypassable · SEEDING RULING · backend-identity-is- DATA · C1 LAW.
§5 · GOLDEN LEDGER — carry check

Every v5 item survives: GATE-0 · IR-3/IR-4-contract/riders (B1) · Superset E (B2) · MEMORY-1/F48/F83+F83.1 (B3) · Kale-RAG (B4) · security-cleanup + FREEZE block (viz v4/b1_scope v3/tools.rule.1-6 v2/F138-140/F133-L5) + golden-infra (F142/BUDGET-HONEST-1/GOLDEN-ASSIST-2/SPECIMEN-HEALTH-1) + F118-120/F135/F122/ LANGFUSE-V4/STAGE-PLAYGROUND/dev-preview-seam/BOARD-WALK (B5) · FINAL docs (B6) · close (B7) · Path B / Qdrant+bge-m3+OPA (§2 adjacent program). v5's BLOCK 5 "TBD" is RESOLVED, not dropped. Watches run B1→B5. Absent-without-a-home: EMPTY.

<!-- END · cwf-master-plan-v5_2 · rev 5.2 · 2026-07-21 -->