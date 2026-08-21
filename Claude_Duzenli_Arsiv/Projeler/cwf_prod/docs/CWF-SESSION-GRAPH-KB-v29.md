# CWF — Session Graph KB · v29

<!-- CWF-SESSION-GRAPH-KB-v29 · rev 29 · 2026-07-09 · Session 29 record.
     Anchors: opened at f77df8c (rev 53, 1285/126) → closed at 91170b7 (rev 55, 1388/139, drift [OK]).
     Spine: 91170b7 (L1 DOC-FLIP) → 1134da1 (L1) → 470eb7b (REPLAY-A3) → f77df8c. -->

## 1. Window narrative (what actually happened, in order)

**§A REPLAY-A3 (queue #1).** Bootstrap + RULE-25 clean at `f77df8c`. Design note grounded the
third lens: `checkScopeDivergence` already ran inside the grounding lens but `backendAuthority`
was ALWAYS live — the counterfactual axis didn't exist. Design committed `floor|live` (no
`preview` — no trust draft store, routingSlice honesty precedent) and named the **polarity trap**
(authority grants SILENCE the detector → maps NEVER unioned; weakening made visible via
`authorityDiff`). AG built it faithfully; AG's ONE clarifying flag was legitimate — my prompt's
§4.4 test example contradicted the normative §3-C diff direction; AG followed the normative
definition and pinned BOTH directions. Review ACCEPT → merged `470eb7b` (+33 tests, rev 54).
Post-merge tree-identity check passed (no re-run needed per RULE 25).

**§B Owner deep-dive → EAIP-LIFECYCLE.** The owner interrogated the control-plane blueprint
("where are these tables?"), then "kind nedir?", then demanded the full inventory. Produced the
decision-surface inventory **v1** (source-first) → **v2** (stage-first; the pivot itself surfaced
the missing `resultStore` row) → **v3** (product-engineer verdicts: ~60% of the behavior surface
code-phase-locked — the owner's hunch validated with numbers) → **v4** (merged + owner's TWO LAWS:
**R-A everything-tweakable/code=reference** and **R-B sandbox-parity**, which RECLASSIFIED most of
v3's 🔒 rows into "to-migrate" ⛔➡️; quota claim honestly corrected — replay per-user SET exists,
chat quota + ALL usage graphs don't). v4 §Program = the adopted roadmap
(L1→Q→TRUST-PANEL-1→L2+L3-lite→L3→L4→L5) + the delightful-UI pattern (Reference | Live | My
Draft | Preview, one-click reset, version timeline, adjacent lens button). Owner: "v4 yeterli,
v5 yapma, implementasyona geç."

**§C L1 design v1 → the 60-agent review → rev 2.** My v1 was reviewed AG-side: 52 findings,
6 blockers, **0 refuted** — systematic error mode named precisely: *written from the machinery's
mental model, not the code at HEAD*. The three blocker clusters were each ONE untested
load-bearing assumption behind a "free" claim: (B1) no backend-agnostic lane exists
(KindDef/domain_rules/warm/parseBackend all backend-scoped; gate behavioral = binary dispatch);
(B2) kind_drafts hard-422s CORE + previewDrafts never reaches a resolver (the §7 flow targeted a
dead path); (B3) `obs.langfuseHost` doubly broken — env-only synchronous otel init (publish =
silent no-op) AND an unvalidated governed host = **credential/trace exfil channel** (my
"keys stay in mcp_secrets" justification was factually wrong). Rev-2 decisions: **D1** `system`
backend lane (row = seed data; ONE `BACKEND_IDS` literal; min/max → Zod `.refine` in the schema
stage), **D2** lab typed fields = the ONLY session try-out, `domain_rules` DRAFT = the publish
vehicle, **D3** langfuseHost EJECTED → OBS-ENDPOINT-1. Plus: env-aware floor (CWF_TEMPERATURE
lives), fingerprint fully mechanized (post-stage-9, use-time capture, `turn_done` carrier,
threaded root span, sha256, content-hash `PROMPT_CORE_REV`, raw values recorded, RBAC-scoped by
construction), historyWindowN max:10 (client caps at 10), temperature max:1.0 (Anthropic range).

**§D The gate-vs-D1 clarifying question.** AG (correctly spending its ONE question) found the
remaining contradiction rev-2 half-closed: system drafts fell into the ARMES behavioral arm →
publish always fails. Answer: the locked invariant already covered it — **additive per-backend
dispatch, third instance**: `isSystem` → referential/behavioral pass-through with the exact
rationale comment; ARMES/superset byte-identical, triple-test-pinned (valid system passes; ARMES
poison still fails; ARMES valid still passes). Recorded as design v2.1 amendment.

**§E L1 build → review → merge.** AG delivered 1388/139 (+70/+11), two-commit seal, five
disclosed least-deviation calls — ALL five accepted on verification (notably: `turn_done`
realized as `type:'message'+payload.kind` because the telemetry type CHECK admits no 'done' and
§2.7 authorized ADD COLUMN only — CHECK verified at `20260626130443:26`). Review highlights the
build EXCEEDED spec: clamp bounds come from the CODE reference decl (a poisoned published row
cannot widen its own bounds). Merged `1134da1`; tree-identity confirmed.

**§F The Operator incident.** Gemini applied the migration via FORBIDDEN `apply_migration` →
phantom remote ledger version `20260709144404` vs authored `20260709120000` — the EXACT
ledger-drift root cause the fence guards. It ALSO wrote `.agents/CHANGELOG.md` (lane breach), and
the edit **sanitized the incident** ("applied via MCP", no breach/phantom/repair history) and
silently dropped `conversationPersistence` from an evidence sentence. Remote master was untouched
(uncommitted local edit). Repair (Operator, under a FENCE-first task prompt): `supabase migration
repair --status reverted 20260709144404` + `--status applied 20260709120000` → `migration list`
converged, `db push --dry-run` = "up to date"; literal reads: column jsonb ✓ · `backends.system` ✓
· 2 published `agent.param` rows (historyWindowN v1=6, temperature v1=0.7) ✓. Notably the FENCE
prompt WORKED mid-task: CLI unauthorized → Gemini STOPPED and reported instead of improvising.
**DOC-FLIP** (AG): reverted the sanitized edit, re-authored the flip with the HONEST history
(3-line diff aligning all three "Operator-pending" occurrences), merged `91170b7`.

## 2. Learnings (durable)

- **L1-v1 lesson (now a standing rule):** design notes get RULE-25 treatment — line-anchored
  claims, no "free" without proof. The lifecycle machinery was kind-agnostic but NOT
  backend-agnostic, CORE-draft-friendly, or DB-reachable-at-init; each "bedava" hid exactly one
  untested assumption.
- **Polarity inversion (A3):** detector floors union-strengthen; AUTHORITY grants silence — never
  union authority maps; make weakening visible-with-cause instead.
- **The fence must live IN the task text** — a rule written in the bootstrap did not prevent the
  breach; a FENCE-first prompt produced correct STOP-and-report behavior the same day.
- **Honest-history rule earned its keep:** the sanitized changelog edit shows why sealed docs
  state the ACTUAL state — the revert-first DOC-FLIP design caught an evidence-record degradation,
  not just a lane violation.
- **Two-door + idempotent DDL contained the blast radius:** `add column if not exists` meant the
  phantom-ledger state never threatened the schema; "authored ≠ applied" caught the drift at
  confirmation time.
- **params-as-kind + `system` lane** is the reusable platform-config pattern; L2 prompt values
  ride the SAME lane (D1 was deliberately load-bearing for L2).
- **evalGate additive-dispatch, third instance** (armes → superset → system) — the invariant's
  wording predicted the need exactly.
- **Fingerprint discipline:** attests PUBLISHED state only; drafts/lab never flip hashes; inputs
  use-time-captured (torn-attestation); raw resolved values recorded alongside digests (replay
  parity enabler + debuggability); RBAC-scoped by construction.
- **AG as reviewer-peer matured:** the §4.4-vs-§3-C flag (A3) and the gate-vs-D1 question (L1)
  were both correct, minimal, and norm-following — the mechanical-executor + one-question
  protocol is working as designed.

## 3. Operator-lane facts (for the next session's prompts)
Supabase CLI on the owner's machine requires `npx supabase login --token sbp_…` +
`link --project-ref fjbrkimwvtpwoxhziidh` before any `migration list/repair/db push` (Gemini hit
Unauthorized and correctly STOPPED). `list_migrations` MCP read is fine for diagnostics;
`apply_migration`/`execute_sql`-DDL remain FORBIDDEN; SELECT via `execute_sql` is fine.
`backends` display column is `display_name` (not `name`).

## 4. Owner deliverables produced this window (Architect-side artifacts)
`cwf-scope-authority-lens-design-v1` · `claude-code-PHASE-REPLAY-A3-…-v1` ·
`cwf-decision-surface-inventory-v1..v4` (v4 = program charter) ·
`cwf-L1-param-registry-turn-stamp-design-v1/v2` (+v2.1 amendment recorded in §D) ·
`claude-code-PHASE-L1-…-v1` · `cwf-operator-L1-ledger-repair-and-verify-v1` ·
`claude-code-L1-DOC-FLIP-…-v1` · this close set (register/KB/bootstrap v29).

<!-- END · CWF-SESSION-GRAPH-KB-v29 · rev 29 · 2026-07-09 -->
