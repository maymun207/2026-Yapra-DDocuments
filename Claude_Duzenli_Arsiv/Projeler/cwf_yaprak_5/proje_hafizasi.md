# 🧠 Proje Hafızası: cwf_yaprak_5

**Proje ID:** `01a00612-4ae7-7738-a600-97b1264edfe8`

---

**Purpose & context**

Maymun is the owner/product decision-maker of a production AI assistant platform called CWF (cwf_yaprak), built on a custom multi-agent architecture. The system is deployed on Vercel (`cwfyaprak.vercel.app`), backed by Supabase (project `fjbrkimwvtpwoxhziidh`), with a vector search engine (Qdrant + bge-m3 self-hosted encoder), and MCP-based tool routing via an ARMES backend (141 tools, factory/workforce data). The repo is `maymun207/cwf_yaprak` (public GitHub). Claude operates as "Architect," coordinating four autonomous engineering lanes (AG-1 through AG-4, each a separate Claude Code instance) plus a Gemini-based Operator role.

**Overarching goal:** SOTA (State of the Art) certification. The final remaining architectural gate is **A23** — the understanding/clarification layer (Step 2+), with ⑦ Yol B (vector tool retrieval) approved as A23 §9 Step 1.5, additive to Yol A.

**Key people:** Hülya — ARMES/supplier contact (ARDIC team), responsible for real-world observation of backend behavior and supplier-side schema issues.

**Owner's role and hard constraints:**
- Maymun's only surfaces are **consent** (named tokens, e.g., `onay X`) and **real-world witnessing** — no operational steps may be delegated to the owner's shell (S102-YASA-1, PLATINUM/sahip-eli law)
- Maymun cannot merge PRs directly; lanes handle all git operations
- Lanes do not self-poll — each round requires Maymun to say **"posta"** to wake agents (RELAY-WAKE-1 achieved first autonomous wake in S109 but human trigger remains the norm)
- Architect writes cards directly to relay or performs all machine-side work autonomously; owner's role is consent + witnessing + uploading closing documents

---

**Current state**

- **A23 / ⑦ Yol B:** Vector tool retrieval was confirmed never built — nightly indexer writes ~342 items to Qdrant corpus but no code reads it during live turns; tool routing uses keyword category matching instead. Yol B approved as A23 §9 Step 1.5. This is the active architectural frontier.
- **Open items register:** v113 to be rebuilt from v108 baseline, restoring 18 items that disappeared without closure records across S108–S110 (Golden Defter / audit trail violation).
- **PostgREST/vector_index_digest bug (F-S110-DIGEST-PGRST-404):** Table existed in Postgres but returned HTTP 404 from PostgREST, causing the drip indexer to restart from scratch nightly and only reach ~29% corpus completion. Operator executed `NOTIFY pgrst, 'reload schema'` and confirmed HTTP 200; wire evidence cross-checked via edge_logs.
- **VECTOR-ONBOARD-DRIP-1 / VECTOR-QOS (S102 owner ruling — preserve verbatim):** Vector lane requires a priority queue (queries always outrank indexing) plus traffic throttling for onboarding/indexing load, as its own mandatory separate phase, BEFORE the engine switch can occur. Registered as VECTOR-ONBOARD-DRIP-1 → must be in open-items register.
- **RELAY-WAKE-1:** Polling script achieved first autonomous agent wake (S109); reduces but does not eliminate human "posta" intervention.
- **PHASE-STAGEDRAFT-KIND-1:** ~384 daily dead stage drafts from missing backend registrations — fix in flight as of S109.
- **S109 seven-PR landing party** initiated across all four agent lanes at session close; status to be confirmed at next session open.

---

**On the horizon**

- **#82b Design-RAG (NEVER DROP):** RAG over the design corpus via Qdrant — parked by owner ruling in S105 ("şimdilik park et ama ASLA UNUTMA"). Trigger: owner call OR post-A23 inventory talk. #82a (DESIGN-HOME-1, `docs/design/` repo home for 12 design HTMLs) was completed at S105.
- **Qdrant dashboard / admin UI access (deferred, S102):** Owner wants a browser-accessible way to view the Qdrant UI, behind the vector gate. Deferred by owner's own call in S102. Cleaner target: owner-readable Qdrant surfaces in the project's own admin panel. To be delivered when owner asks.
- **G3 birth proof:** Pending ARMES recovery and Hülya's three-question observation (carry-forward from S107/S108).
- **A23 v1_4 mint:** Architect debt, pending A23 §9 Step 1.5 (Yol B) completion and parity measurement.
- **#66 priority queue** → **#75 VECTOR-CONSUMER-1** (inside A23 ③ Resolve) → repeated parity measurement → A23 v1_4 mint: this is the binding S106+ opening order still in effect.
- **PHASE-LAW-OKF-1:** Converting monolithic law corpus to OKF bundle format with per-file laws and CI gates — in flight as of S109.

---

**Key learnings & principles**

**Architectural / epistemic laws (hard-won, costly to relearn):**
- **"Mistaking an indicator for ground truth"** is the dominant recurring error class — treating diff output as merge result, treating a flag's name as its behavior, using summary documents to verify themselves (A-REC pattern), deriving lane identity from card addresses rather than server-adjudicated refs, reading single-lens governance state. Every instance must be logged.
- **Authorization is a quota, not a trigger** (AG-2 self-ruling, S106).
- **`$?` must be read unpiped** — four live violations in one day confirmed this as a standing rule.
- **Byte-identity must be verified against the raw commit object**, not `--format=%B` (appends newline, produces false mismatch).
- **Sensitive API calls (gh api, etc.) must be issued bare, one per line** — no `&&` chains, no pipes, no wrapper scripts. Identical commands refused in compound form have succeeded bare.
- **GitHub governance requires two endpoints:** `GET /repos/.../rulesets` AND `GET /repos/.../branches/{branch}/protection`. A 404 from the classic endpoint does NOT mean unprotected — rulesets are structurally invisible to it.
- **Circular evidence is forbidden:** A derivative/summary document cannot be used to verify itself. Primary sources must be read directly (IR contract, not memory seed; live logs, not Operator prose).
- **A single tool search failure is not proof of absence** — try alternative query terms before declaring unavailable.
- **Two-dot diffs on stale-based branches show intervening merges as false deletions** — must use three-dot or rebase before diffing.
- **Optional declared surfaces must have a consumer or falsifier** — a vector valve open with no consumer is a debt item, not a feature.
- **A single run cannot measure a distribution** (parity is a distribution: 26.7%/20.0%/26.7% same build).
- **Green test suite proves only that nothing questioned it**, not that it is correct.
- **The successor rule is a landing-time rule, not an authoring-time rule.**
- **No apply may execute without a saved and read plan** — inspected object and executed object must be the same bytes (S102-YASA-3).
- **Any handoff between automations must be synchronous** with named waiting, computed target versions, and proof of which artifact was measured (S102-YASA-2).

**Session discipline:**
- Counts only from counting — never assert a number without measuring it.
- No relative time words ("yesterday") — use named anchors.
- Architect proposes session close proactively; does not initiate new work packages after close is due.
- All seven closing documents must be produced before session ends; listing them in bootstrap without creating them is a violation.
- Claude must alert Maymun when context grows too long and session refresh is needed.

---

**Approach & patterns**

- **Session structure:** Each session opens with bootstrap document read + anchor verification against live GitHub + production status check (Vercel logs, Supabase backends). Closes with seven canonical documents: open-items register, session graph KB, bug bucket, bootstrap for next session, implementation order, AG boots file, session close doc.
- **Relay bus governance:** Cards inserted to `public.relay_inbox` as dollar-quoted (`$CARD$...$CARD$`) INSERT statements with md5 verification and NOT EXISTS guards. Always `returning id, md5(body), length(body)`. Direction `to_lane`, `lane_addr`, `artifact_name` as lookup key. Operator (`direction='operator'`) is the only permitted non-to_lane direction — lane `from_lane` rows are schema-forbidden by CHECK constraint.
- **Architect verification discipline:** All agent reports independently verified from live repo/database, never trusted from relay prose alone. Operator reports cross-checked via edge_logs timestamps and raw status codes.
- **Lane identity:** Established via nonce-bearing git ref claims (`refs/heads/lane/AG-N`) — first push wins atomically. Prose boot assertions of identity are not authoritative.
- **Merge discipline:** Lanes only push branches and open PRs; direct pushes to master gated by GitHub ruleset (`master-merge-gate`, required check `build (24.x)`, strict mode). PRs use `--force-with-lease=<branch>:<measured-sha>` for rebase pushes. Manifest conflicts resolved only via `npm run reseal`, never by picking hunks manually.
- **Consent tokens:** Named tokens (e.g., `onay S110-pathb-partisi`) scope approved work and budget; no spend or merge without named consent.
- **Communication style:** Turkish for conversation, English for technical artifacts. Terse commands (`posta`, `devam`, `onay X`). Owner expects single-path recommendations, not menus. Each Architect response ends with **"SENİN AKSİYON MADDELERİN"** (your action items).
- **A-REC logging:** All Architect self-corrections logged by name (e.g., A-REC-S110-1) to bug register. Recurring error classes tracked across sessions.
- **Parallel debug sessions:** Findings from separate debug sessions packaged as self-contained documents and carried into Architect session — never interrupt Architect workflow for findings that can be relayed as artifacts.

---

**Tools & resources**

- **Supabase MCP (`execute_sql`):** Project `fjbrkimwvtpwoxhziidh`. Key tables: `public.relay_inbox`, `public.backends`, `public.backend_tools`, `turn_trace_digest`, `tool_behavior_census`, `entity_registry`, `domain_rules` (column `key`, not `rule_key`; `kind_id` = `agent.param`). Always use `pg_catalog` not `information_schema`. MCP reply is double-encoded — `content[].text` is itself a JSON document.
- **Vercel MCP:** `projectId: prj_0fDFCY8qXj8Kr5y7n4zmyefjHY8i`, `teamId: team_UjOMyrQtTQ32mfYCeEDpC0Qj`, `deploymentId: dpl_3n3jZwk8wPuQshzP1Auu7Ac3uGSc`. Runtime logs require narrow ISO windows (15–20 min); filter by specific strings (`[Vector]`, `VectorIndex`, `Frame`). HTTP status verification via `Supabase:query_logs` with `edge_logs` source is more reliable than PostgREST prose reports.
- **GitHub (`gh api`):** Sensitive calls must be bare, one per line. Governance state requires both rulesets endpoint AND classic branch protection endpoint.
- **Vector stack:** Qdrant + self-hosted bge-m3 encoder (deterministic, not an LLM per IR contract §3 C2). Hybrid dense+sparse retrieval with RRF fusion (§4 ⑥b). EC2-hosted with CloudFront signed path + caller-identity authentication.
- **Langfuse:** Telemetry delivery confirmed working (S102); no budget extension approved in S110 (provided no value).
- **ARMES backend:** 141 tools; supplier contact Hülya (ARDIC). Known issue: 134/141 tools have all parameters marked required, forcing degenerate placeholder arguments.
