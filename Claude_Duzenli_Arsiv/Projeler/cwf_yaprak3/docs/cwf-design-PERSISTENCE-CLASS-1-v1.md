# cwf-design-PERSISTENCE-CLASS-1 · v1

<!-- Architect-authored · S94 · walk item #40 (born this session, owner-ratified
     in intent; hardened by the Architect from opt-in registration to a total
     classification law). Ships as ADR-014. BINDING CARRIER for #40.
     Recon base: origin/master a7600997 + live DB reads 2026-08-11. -->

## §0 · THE OWNER RULING (S94, verbatim intent)

*"Bundan sonra yeni birçok servis ekleyeceğiz — Graph-KB, anlama katmanı, BM25
tabloları vs. Bunların hepsi, backup gerektiren data taşıyorsa, kendisini ve
hangi datalarının backup yapılması gerektiğini bu sisteme söylemeli. Bu bir
mimari yapı ve kural olmalı."*

Ratified — and HARDENED. Pure self-registration reproduces the
`semantic_memory` failure one layer up: a service that FORGETS to register is
still invisible, and nothing turns red. The S93 near-miss (a learned table
absent from the snapshot inventory, caught by a human) is the exact defect
class this item must make structurally impossible to repeat silently.

## §1 · THE LAW (one sentence)

**Every table in this database carries a declared persistence class at birth,
the snapshot/seed/export scopes are DERIVED from the classes rather than
listed, and an unclassified table — in either direction — fails CI.**

The value is not the registry; registries are memos. The value is the GATE:
forgetting cannot stay green.

## §2 · THE TAXONOMY (closed vocabulary; extending it is an ADR amendment)

| Class | Meaning | Snapshot (restore) | Seed (transplant) | Export file | Examples (Architect's claim — the phase census re-derives ALL of these from schema, D-3) |
|---|---|---|---|---|---|
| `learned.user` | Earned by time, keyed to a person | **YES** | NO (foreign users don't exist) | inside payload | `episodes` |
| `learned.tenant` | Earned by time, tenant-shared — THE BRAIN | **YES** | **YES** | inside payload | `tool_category_cache` · `router_proposals` · `semantic_memory` |
| `learned.discovered` | Machine-discovered from a live backend | **YES** (byte-identity) | NO — re-discovered (ADR-009) | inside payload | `entity_registry` |
| `learned.authority` | Earned trust / detector-silencing grants | **YES** | flag-gated, typed consent (R2) | inside payload | `backend_authority` |
| `governed` | Rule/param/prompt family — travels ONLY by the governed publish path | NO | NO | NEVER | `domain_rules` · `rule_kinds` · `rule_versions` · `rule_audit` · drafts |
| `content.user` | User-authored content — Supabase PITR territory | NO | NO | NEVER | `conversations` · `messages` · `turn_feedback` |
| `operational.mirror` | System-synced mirror; rebuild = re-sync | NO | NO | NEVER | `backend_tools` · `backend_health` |
| `operational.telemetry` | Ledgers, digests, runs, audits | NO | NO | NEVER | `telemetry_events` · `turn_trace_digest` · `replay_audit` · `golden_*` · `memory_audit` · `seed_state` |
| `operational.control` | Quotas, snapshots-of-snapshots, machinery | NO | NO | NEVER | `user_chat_quotas` · `learning_snapshots` itself |
| `secret` | Never leaves the DB in ANY artifact | NO | NO | **STRUCTURALLY NEVER** | `mcp_secrets` · `llm_provider_secrets` |

Two axes ride on the class, and this is the creative core: the class answers
not just "is it backed up" but the table's WHOLE data-motion fate — snapshot,
transplant, export, and (for `secret`) a hard structural exclusion the export
path asserts from the SAME registry. #39's rulings R1/R2 stop being special
cases inside a seed function and become properties of `learned.discovered` /
`learned.authority` — one definition site, per ADR-012's own philosophy (the
label lives on the valve where it is defined).

**Forced question at birth:** when BM25 arrives, "does the index need backup?"
cannot be skipped — classification is mandatory, and it forces the real
question: is the CORPUS learned (`learned.tenant`) while the INDEX is
`operational.mirror` (rebuildable)? The service must answer; the gate makes
not-answering red. That is the owner's rule, made physical.

## §3 · MECHANICS — where the declaration lives, what the gates read

* **Declaration = CODE, colocated.** This is STRUCTURE about the schema, not
  runtime data — by the standing split (structure→code, data→gated UI,
  secret→env) it lives in `shared/` beside `DB_TABLES`, one entry per table,
  class required at the type level. A migration that creates a table and a
  commit that classifies it are the SAME commit (RULE-20 discipline shape).
* **Gate A · CI, static, both directions:** a standing test walks
  `supabase/migrations/**` for `CREATE TABLE` statements and diffs against the
  manifest. Unclassified table → RED naming it. Classified name with no
  creating migration → RED (a ghost entry is a lie in the other direction —
  the RULE-31 both-directions pattern). This is the `healthCoverage.ts` LAW
  pattern and the `KIND_REGISTRY` completeness pattern, generalized to the
  whole schema — the house already owns this shape; #40 promotes it.
* **Gate B · runtime, live:** one new band on the existing Health surface
  compares `information_schema` to the manifest — catches drift the static
  gate cannot see (hand-made tables, Operator-side divergence). Two gates
  because a gate must read ONE reality and these are two realities; each
  reports honestly for its own (the F185/F190 lesson).
* **Derivation, not listing:** `LEARNED_TABLES` becomes
  `tablesOfClass('learned.*')` — the manifest is the source, the constant the
  view. The snapshot SQL functions remain static text; a standing test pins
  **function scope === derived learned set** (the S93 birth proof's
  manifest-vs-live 6/6 check, promoted to a permanent gate). Widening the
  learned set without re-emitting the functions goes RED at that pin.
* **Export hardening for free:** #39's export path asserts, from this same
  registry, that no non-`learned.*` table can ever appear in a payload and
  that `secret` tables are unreachable by construction — a negative control
  test plants one and expects refusal.

## §4 · HONESTY CLAUSE — what this does and does not guarantee

The mechanism does NOT make forgetting impossible; SQL is static and a new
learned table still requires a human to ship the function-widening migration.
The guarantee is precisely: **forgetting cannot stay green.** A check that
reports but does not gate is not a check (S68-4) — every gate here FAILS,
none merely prints.

## §5 · BIRTH COMPATIBILITY — the floor is today's state

At merge, the derived learned set must equal today's `LEARNED_TABLES`
byte-for-byte (order-insensitive), pinned by a characterization test captured
BEFORE any edit. Zero behaviour change on day one; the classes of the six
existing tables are seeded exactly as the table above claims them (subject to
the census). Every other existing table gets its class in the same phase —
the census is TOTAL or the law is a slogan.

## §6 · SEQUENCING + BIRTH PROOF

* **Position: #40, immediately behind #39, and STRICTLY BEFORE the service
  wave (#23 PathB/BM25 · #25 Graph-KB · #29 A23).** The law must exist before
  the buildings it protects (S82-6: architectural deferral is void).
* **Operator involvement: NONE expected** — the manifest is code, the gates
  are tests, the Health band reads existing surfaces. If the census finds a
  table needing a comment-only correction, that stays code-side too.
* **Birth proof (S93-1), within the phase:** the gate must be seen to FAIL
  before it is trusted — (i) a scratch migration planting an unclassified
  `CREATE TABLE` reds Gate A naming the table; (ii) deleting one manifest
  entry reds it in the other direction; (iii) the S66-1 positive control: the
  clean tree passes with the full census count printed; (iv) the Health band
  renders live with total = classified, and its "drift" cell proven able to
  fire against a temporary scratch table on a branch DB or via the band's own
  test double — whichever the phase can do honestly, recorded.
* **Ships as `docs/adr/ADR-014-persistence-class-taxonomy.md`** — the taxonomy
  table, the two gates, the derivation rule, and the amendment procedure for
  new classes.

## §7 · RISKS (named for the phase prompt)

1. **Census misclassification** — a wrong class is worse than no class (it
   gates with false confidence). Mitigation: the phase report lists EVERY
   table with its class and one-line justification; the Architect reviews the
   census row-by-row at RULE-25, not by spot-check.
2. **Migration-parser fragility** — `CREATE TABLE` extraction must tolerate
   `if not exists`, quoted names, partitions; mutation controls include a
   deliberately odd-but-valid statement.
3. **Scope creep temptation** — #40 classifies and gates; it does NOT touch
   snapshot SQL, export, or seed logic (those are #38/#39's). The pin test
   references them read-only.

<!-- END · cwf-design-PERSISTENCE-CLASS-1-v1 -->
