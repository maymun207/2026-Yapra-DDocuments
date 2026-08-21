# CWF — Session Graph KB · v59
<!-- CWF-SESSION-GRAPH-KB-v59 · 2026-07-22 · adds S60 ("BLOCK 2 CLOSE DAY") to
     v58. Prior sessions carried by pointer (v58 and earlier). GOLDEN LEDGER:
     digest may shorten, nothing dropped — register v61 holds the full item
     ledger; this KB holds the session NARRATIVE + lessons. -->

## S60 · 2026-07-22 · "BLOCK 2 CLOSE DAY" (RESUMED mid-flight from S59)

**Arc in one line:** resumed ENTITY-FLOOR-1 in flight, merged it + a
same-session F161-FIX-1, live-sealed the whole entity-resolution + pagination-
honesty machinery, and CLOSED BLOCK 2 by owner verdict — after two owner
catches turned a premature "scope victory" into a permanent constitutional law.

**Floor:** `c0fff49`(S59) → `e8bf988`(ENTITY-FLOOR-1 PR#103, rev 135, +Operator
migration factory_registry) → `a8ecd6d`(F161-FIX-1 PR#104, rev 136). One
Operator migration applied (factory_registry, verifyGrants clean). Deploys
live-verified via Vercel MCP.

**Chapter 1 — ENTITY-FLOOR-1 lands, registry fills the hard way:** FAST-GATE
passed (migration read in full: RLS on/0 policy/all-grantees revoke;
entity_list_tool DATA; genericity red-team clean). Merged; AG's "fast-forward"
wording was loose but the two-parent --no-ff topology was correct (RULE-25
caught the label, cleared the content). The registry did NOT fill from the
health tick or the first (wrong-row) Sync — factory_registry syncs from ARMES's
getFactoryList, and the owner had synced the SUPERSET row (entity_list_tool
NULL → silent no-op, correct by design). Diagnosis from logs: ARMES was LIVE
again (the ~2026-07-03 401 resolved — getFactoryList returned 17 factories),
so the fix was "sync the armes row." Owner did; `[EntityRegistry] backend=armes
total=17 active=17 missing=0` sealed (emitter grep-verified — TOTAL-45).

**Chapter 2 — The verification turns & F161's live failure:** Tur 1/2 (Granit
OEE) + Tur 3 (KB7) + a catalog enumeration exposed F161 emitting the exact
lying field it was born to kill: `records=34/1` / `records=34/0` — findRecordArray's
"longest array" heuristic picked `columns_available` (34) over the real data
array (1, or 0), and stamped complete/empty results as `paginated=true`. FIX-1
authored same-session (3 Gs): G1 data-key precedence + complete≠paginated
gate; G2 the log-completeness `[Frame]`/`[EntityResolve]` Vercel-lane mirror
(closing the owner-named "why are logs missing entity_resolved" blindness — it
was a Langfuse-only span attr); G3 F153 dead-URL suppression. FAST-GATE +
CI-green (one rule26 flake, disproven by S55-1 discipline: build/coverage green
twice, untouched surface, clean rerun) → merged.

**Chapter 3 — The two owner catches (the real story):** (a) The Architect had
enshrined "KB7 monthly OEE not in Superset" as an ADR-001 scope-authority
VICTORY in the register — WITHOUT verifying KB7's actual absence. Owner's "KB7
should be in Superset, I'm surprised" forced a catalog read: it showed only
Granit objects — but the enumeration was TRUNCATED (charts page 12/20, tool
budget) so even "Granit-only" was an over-read of incomplete data (F161/
partial≠complete biting the Architect personally). (b) Then the deeper catch:
owner corrected that ARMES holds ALL FOUR factories (KB7/Granit/Sır/Masse), the
Superset "Granit-only" was a CONFIG artifact (incomplete DBC/dataset/gateway
wiring — DBC = database connector, team term), and "Superset=Granit-only /
KB7=ARMES-only" must NEVER be baked into the system. Verification (grep) showed
the code was MORE disciplined than the Architect's framing: gatewayProtocol.ts
already carries datasource-scope-verify + wrong-scope≠answer rules (the right
kind, config-independent) — nothing encoded factory→backend exclusivity. Born:

**THE FACTORY↔BACKEND-COVERAGE-IS-CONFIG LAW (S60, owner-legislated,
PERMANENT):** which factory lives in which backend is mutable CONFIG, never
governed doctrine. Encoding it would make the system lie the moment coverage
changes — the inverse of empty≠zero. Discover live every turn; empty = "not in
this connection now," never "never exists."

**Chapter 4 — BLOCK 2 CLOSED + F166 captured:** Live seal (trace 47406847):
`[EntityResolve] resolved=[Granit:fuzzy] suppressedClarification=true` (typo
"granik"→Granit, F162 fixed) + empty≠zero to the render layer (Glazur3 all-zero
→ "0 olarak kaydedilmiştir," not fabricated). Owner verdict: **BLOCK 2 kapalı,
geri dönmemek üzere.** A follow-up "chart these" (trace fa62a5fb) surfaced F166:
the model emitted viz segments referencing a PRIOR turn's tool result without
re-fetching → the turn-scoped binder honestly reported "tool result not
available to chart" (polarity CORRECT — no fabricated chart; F82 avoided; UX
broken). Owner captured it as independent. Owner Q on memory answered: MEMORY-1
aids only the re-fetch path INDIRECTLY; memory must NEVER be a viz data source.
Sequence ratified: **F163 → B3 (MEMORY-1, F166-aware) → F166.**

**Lessons (beyond the rules):** (a) The Architect's premise-error tally hit 4
across S59→S60 — all caught before shipping into a governed artifact, but the
S60 "scope victory" lapse is the sharpest reminder that a MODEL claim + an
OWNER intuition are BOTH unverified until checked against ground truth, and
even the ground-truth read (catalog enum) can be truncated. TOTAL-45 cuts every
direction, including the Architect's own conclusions. (b) A same-session
follow-up fix (F161-FIX-1) redeemed a phase's own buggy deliverable — S55-1
"merge≠works" honored; live verification caught what a ≤60s static FAST-GATE
structurally cannot (data-dependent runtime bug). (c) `gh pr merge` with empty
--subject/--body silently takes GitHub's default message — a delivery footgun;
force-pushing shared master to fix cosmetic text was correctly REJECTED
(content was byte-correct). (d) The log-completeness gap the owner named was
real automation-first debt (verification forced a Langfuse round-trip); G2
closed it — tests are now sealable from Vercel logs alone.

**S60 premise tally: 1 new** (the scope-victory lapse, #4 of the arc;
resolved + birthed the coverage-is-config law). **Session artifacts:** register
v61 · KB v59 · bootstrap v59 · F161-FIX-1 phase prompt · 2-merge (ENTITY-FLOOR-1
+ F161-FIX-1), 1-Operator-migration, ~6-finding day.

<!-- Prior sessions: see CWF-SESSION-GRAPH-KB-v58 and earlier. -->
<!-- END · CWF-SESSION-GRAPH-KB-v59 · 2026-07-22 -->
