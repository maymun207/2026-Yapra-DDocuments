# PHASE-PERSISTENCE-CLASS-1 · v1 — walk item #40 · ADR-014

<!-- Architect-authored · S95 · lane AG-1. Self-contained (lanes cannot see
     project files). Binding carrier content embedded below. -->

## PRECONDITION (S47-1)
Fresh FULL clone of `maymun207/cwf_yaprak`; `git rev-parse origin/master` MUST
print `d8f33f80a5ba3c76fa710e0c73918664f0ffd979`. If it does not, STOP and
report — do not proceed on a moved master.

## LANE / BRANCH / REPORT / PR (S91 completeness gate)
- Lane: **AG-1**. Branch: **`phase/persistence-class-1`** off origin/master.
- PUSH the branch to origin and OPEN A PR against master so CI runs on the PR
  head (S37-2: unsharded CI on the PR head is the sole test arbiter).
- Report file: **`docs/relay/PHASE-PERSISTENCE-CLASS-1-report.md`** (in-branch).
- Merge only on Architect GO (verbatim merge message will be supplied at GO).
  `--no-ff`; squash banned.

## WAVE CONTEXT (S88-1)
AG-2 runs `phase/sweep-bare-delete-1` in parallel. **Your fence:** `shared/`,
`api/cwf/__tests__/persistenceClass*.test.ts`, the Health band files,
`docs/adr/ADR-014-*.md`, seal manifest. **You must NOT touch**
`supabase/migrations/**` (zero migrations in this phase) or any file AG-2's
prompt owns (`api/cwf/__tests__/effectiveBodies*.test.ts`, new migrations).
Your report MUST include `git diff --name-only origin/master..HEAD` verbatim.
**Merge order: #40 merges FIRST.** Reseal (if the drift gate demands one) is
performed normally in this branch; AG-2 rebases after your merge (S90-1 noted).

## THE LAW (ADR-014, one sentence)
**Every table in this database carries a declared persistence class at birth,
the snapshot/seed/export scopes are DERIVED from the classes rather than
listed, and an unclassified table — in either direction — fails CI.**
The value is the GATE: forgetting cannot stay green (S68-4: a check that
reports but does not gate is not a check).

## THE TAXONOMY (closed vocabulary; extending it = ADR amendment)
| Class | Snapshot | Seed | Export file |
|---|---|---|---|
| `learned.user` | YES | NO | inside payload |
| `learned.tenant` | YES | YES | inside payload |
| `learned.discovered` | YES (byte-identity) | NO — re-discovered (ADR-009) | inside payload |
| `learned.authority` | YES | flag-gated typed consent | inside payload |
| `governed` | NO | NO | NEVER |
| `content.user` | NO | NO | NEVER |
| `operational.mirror` | NO | NO | NEVER |
| `operational.telemetry` | NO | NO | NEVER |
| `operational.control` | NO | NO | NEVER |
| `secret` | NO | NO | **STRUCTURALLY NEVER** |

Architect's CLAIMED seeds (the census re-derives ALL of these — D-3; do not
trust this list, verify each): episodes→learned.user ·
tool_category_cache/router_proposals/semantic_memory→learned.tenant ·
entity_registry→learned.discovered · backend_authority→learned.authority ·
domain_rules/rule_kinds/rule_versions/rule_audit/drafts→governed ·
conversations/messages/turn_feedback→content.user ·
backend_tools/backend_health→operational.mirror ·
telemetry_events/turn_trace_digest/replay_audit/golden_*/memory_audit/
seed_state→operational.telemetry · user_chat_quotas/learning_snapshots→
operational.control · mcp_secrets/llm_provider_secrets→secret.

## BUILD
1. **Manifest (code, colocated):** in `shared/` beside `DB_TABLES` — one entry
   per table, class REQUIRED at the type level (a closed union; no string).
   The census is **TOTAL**: every table created by any migration gets a row.
2. **Gate A (CI, static, BOTH directions):** a standing test walks
   `supabase/migrations/**` for `CREATE TABLE` statements (tolerate
   `if not exists`, quoted names, schema prefixes; READ-ONLY — you scan
   migrations, you never edit them) and diffs against the manifest.
   Unclassified table → RED naming it. Manifest name with no creating
   migration → RED (ghost entry). Mutation controls include a deliberately
   odd-but-valid `CREATE TABLE` form. Tables later DROPped by a migration are
   removed from the expected set by the same walk (the walk computes the
   FINAL set, not the union).
3. **Derivation, not listing:** `LEARNED_TABLES` (currently in
   `shared/learningSnapshot.ts`) becomes `tablesOfClass('learned.')` — the
   manifest is the source, the constant a view. **Characterization test
   captured BEFORE any edit:** derived set === today's `LEARNED_TABLES`
   byte-for-byte (order-insensitive). Zero behaviour change on day one.
4. **Function-scope pin:** the snapshot SQL functions remain static text; a
   standing test pins **SQL function scope === derived learned set** (promote
   the S93 manifest-vs-live check to a permanent gate). Widening the learned
   set without re-emitting the functions goes RED here.
5. **Export hardening:** from this SAME registry, assert no non-`learned.*`
   table can appear in a cwf-learn/1 payload and `secret` tables are
   unreachable by construction — a negative-control test plants one and
   expects refusal.
6. **Gate B (runtime, live):** one new band on the existing Health (Sağlık)
   surface comparing live catalog to the manifest. **S94-2 LAW: the live read
   uses `pg_catalog` (pg_class/pg_namespace), NEVER `information_schema`** —
   the latter is privilege-filtered and returns empty without error; an empty
   catalog read is UNREAD, and the band must render that as "could not read",
   never as "0 drift" (MEASURE-READ-HONESTY-1; empty≠zero).
7. **ADR:** `docs/adr/ADR-014-persistence-class-taxonomy.md` — taxonomy, two
   gates, derivation rule, amendment procedure.
8. **Scope fence:** #40 classifies and gates. It does NOT touch snapshot SQL,
   export, or seed LOGIC (#38/#39 territory) — pins reference them read-only.

## BIRTH PROOF (S93-1 — inside this phase, all recorded in the report)
(i) scratch migration text planting an unclassified `CREATE TABLE` → Gate A
RED naming it; (ii) delete one manifest entry → RED the other direction;
(iii) S66-1 positive control: clean tree passes and PRINTS the full census
count; (iv) Health band renders live with total=classified, and its drift
cell proven able to fire via the band's own test double (honestly recorded).

## REPORT MUST CONTAIN
Census table (EVERY table + class + one-line justification — Architect
reviews row-by-row at RULE-25) · full diff name-list · test deltas (files +
count, computed) · birth-proof transcripts (i)-(iv) · drift-gate output ·
`>> BLOCK: AG-1 <<` tail with branch head SHA.

## DO-NOT
No migrations · no `supabase/`, `src/` beyond the Health tab component if it
lives there · no Vercel CLI in the clone (F-S94-VERCEL-AUTOLINK) · no touching
AG-2's fence · absolute paths in any scratch write (S80-1).

<!-- END · PHASE-PERSISTENCE-CLASS-1-v1 -->
