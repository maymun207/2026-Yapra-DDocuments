# EAIP v5.1 Patch Notes & theblueprint23.dev Integration Guide
**Date:** 10 June 2026 · **Decided by:** Maymun · **Status:** Sequence locked, all six review findings resolved

---

## 1. What changed (v5.0 → v5.1)

**Sequence locked: Variant A (Logical Order).** Customer deadline is not fixed, so the commercial override is unnecessary. Variant B is archived, not deleted — it reopens only if a customer imposes a hard M3 gate *and* ARU/KARU is confirmed as a clean API in week one. Both conditions, not either.

**Effort authority resolved: 12,060h / 1,508 person-days / core 2,900h is the truth.** The investigation reversed the initial suspicion: the SSoT was not inflated — the Schedule v5 xlsx and the May 29 briefing were stale. They were missing task A4.5 (CI pipeline + Harbor sovereign registry + Trivy scanning + Cosign signing, 160h — mandatory under the data-sovereignty principle) plus an 80h core re-decomposition. Schedule v5.1 is now *generated from* the SSoT's PLAN_DATA rather than maintained in parallel, which eliminates the structural cause of the drift: two hand-maintained decompositions of the same program. The audit trail is in Schedule v5.1, Sheet D.

**Identity federation moved to day one (new task D8, 60h).** Keycloak ↔ customer AD/Entra OIDC federation was orphaned in the FIN phase (M8–M13) while the insurance instance needs it at deployment (M4–M5). D8 now sits in the Insurance phase; FIN G1 is reduced by 60h and retains only enterprise-wide federation hardening for Astra. M0 discovery must profile: AD vs Entra, LDAP vs OIDC, app-registration ownership, and IdP network reachability from the cluster. Program total unchanged.

**Graphiti + FalkorDB gated (F4, 420h).** Per the standing principle — temporal knowledge graphs only on confirmed causal-query demand — F4 now carries an explicit gate: written class-6 requirement confirmation from Kale at the CWF v1 exit review (M5). No confirmation, no build. The hours stay in the plan as conditional scope so capacity planning remains honest.

**Temporal cut from committed scope (new gated G7, 80h).** LangGraph Postgres checkpointing plus Airflow covers durable state and batch workflows. Temporal adds a cluster, an SDK paradigm, and a failure domain — it must earn its place via a confirmed Astra UC needing durable multi-day human-in-the-loop workflows. Default: not built. TimescaleDB (G5) and Iceberg (G6) gates made explicit: GU sensor-pilot signature and Astra UC3 time-travel confirmation respectively. Total conditional scope: 880h of 12,060h, now visible instead of silently committed.

**MariaDB/Galera scope lock.** ARMES replication adapter only, read-only, forever. No Galera clustering for any platform store or new product. The insurance instance has no ARMES and therefore no MariaDB at all — the stale "MariaDB Galera (txn)" line in the project copy of the insurance bootstrap is corrected in v0.4.

**M1–M3 capacity rule added.** Core + WA + GU = 4,280h in 13 weeks ≈ 8.3 FTE sustained against a 10 FTE peak. Rule: Core wins any resource contention; WA and GU customer-facing dates carry an explicit +2-week buffer and must not be committed externally without it.

---

## 2. How to patch theblueprint23.dev (advice for the Agentic SW Team)

The v5 SSoT embeds all data — PHASES, COMPS, CONNECTIONS, PLAN_DATA — as JavaScript consts inside a 160KB HTML file. That was fine for a human-readable artifact; it is the wrong substrate for a live tool maintained partly by agents. Hand-editing HTML is exactly how the 11,820-vs-12,060 drift happened. Recommended migration, in order of effort:

**Step 1 — Extract data from presentation (half a day, do this first).** Pull the four consts out of the HTML into versioned JSON files in the blueprint repo: `phases.json`, `components.json`, `connections.json`, `plan.json`. The HTML page becomes a pure renderer that fetches them. From that moment, every change to the architecture is a JSON diff in a pull request — reviewable by you, applicable by an agent, and diffable forever. The attached `theblueprint23_changeset_v5_1.json` is written against exactly this structure and doubles as the v5.1 migration content.

**Step 2 — Add invariant validation in CI (a few hours).** A `validate_blueprint.py` that asserts: every phase's hours equal the sum of its task hours; the program total equals the sum of phase hours; every task marked `gated` has a non-null gate condition; D8 exists; no Galera reference outside the ARMES-adapter context. Run it on every PR. This single script would have caught the 240h drift, the federation gap, and any future silent scope creep — it is the cheapest insurance in this whole program.

**Step 3 — Make the schedule and briefing generated artifacts (already half-done).** Schedule v5.1 was produced by a generator reading PLAN_DATA — keep that generator in the repo (`generate_schedule.py`, openpyxl, your existing pattern) and add a `generate_briefing.py`. Rule: nobody edits the xlsx or the briefing by hand, ever. They are build outputs, like compiled binaries.

**Step 4 — Enrich the task schema for agent consumption (when Agentic SW Team v1 starts EAIP work).** Since part of EAIP will be built by the agentic team, the blueprint is not just documentation — it is the agents' work specification. Each task entry should gain four fields, seeded in the changeset: `depends_on` (task IDs), `gate` (null or condition text), `owner_type` (`agent` / `human` / `agent_with_human_review`), and `acceptance_criteria` (the testable definition of done an agent can verify against). D8 and G7 in the changeset show the pattern. This turns theblueprint23.dev from a map into a dispatchable backlog — the natural bridge between the EAIP-1 project and the Agentic SW Team project, and a direct input to Revolutionize's SOUL.md scoping.

**Applying v5.1 specifically:** if you do Step 1 first, the changeset applies as data. If you patch the current monolithic HTML instead, the delivered `ARDICTECH_Platform_v5_1_SSoT.html` is the already-patched file — replace wholesale rather than merging fragments, then do Step 1 before the next change.

---

## 3. Open items this patch does NOT resolve

These remain on the horizon and were deliberately untouched: LLM model size for insurance (70B vs 13B, ~4× hardware delta — M0 question), source-code escrow posture, final payment tranche preference, ARU/KARU integration profile (still the single biggest delivery risk, 80h vs 320h), discovery questions v0.2 revision, and the commercial annex spreadsheet. The Graphiti gate decision point is now formally scheduled: CWF v1 exit review, M5.
