<!-- ADR-005-supabase-apply-authority-v2 · RESTORED TO PROJECT KNOWLEDGE 2026-07-26 (S66).
     PROVENANCE: this is the OWNER'S ORIGINAL document, supplied verbatim in session S66.
     It is NOT an Architect reconstruction — an Architect draft written the same session
     (before the original surfaced) was discarded, and its invented rationale for
     `db push` was materially WRONG: the real root cause is timestamp `version`s that
     never matched file prefixes, i.e. LEDGER DRIFT uncovered by the SEC-ADVISOR
     reconcile, not an abstract reproducibility argument.
     WHY THIS FILE EXISTS: F190 found ADR-005 present in NEITHER docs/adr/ (which holds
     001-004 and 006-008) NOR project knowledge, while 15+ repo files — production code,
     tests and two applied migrations — cite it by name as binding law. This file is the
     interim home; F190 lands it in docs/adr/ where the Author lane can finally read it.
     Text below is unmodified. -->

# ADR-005 — Supabase Apply Authority & Agent DB Access
**Status: Accepted · v2 · rev 2 · 2026-07-07**
*(EAIP governance primitive. Versioned per standing rule — supersedes v1 (Proposed), never silently
overwritten.)*

> **v2 delta (read first).** v1 proposed **CI** as the apply actor. The owner selected the simpler,
> already-proven model: the **Operator lane (Gemini)** applies, restoring the pre-2026-07-07
> three-role separation immediately with zero build cost. v2 records that as the Accepted decision,
> keeps the two non-negotiable refinements (apply via `supabase db push`, not `apply_migration`; a
> deterministic closing gate), and documents **CI-apply as a zero-rework future upgrade** (same
> commands, different trigger).

> **One-line decision.** Migrations are **authored** by AG (repo, read-only live access), **applied**
> by the Operator lane (Gemini) via **`supabase db push`** only, and **verified** by a deterministic
> post-apply gate (`verifyGrants` + `get_advisors`) whose output the Architect reasons over —
> independent of the actor that authored the change.

---

## Context

On 2026-07-07 (`b1529fa`) AG was granted a read+write Supabase MCP connection and used it to author,
apply, and self-verify three migrations plus a destructive ledger rewrite. The migrations were sound
and closed a real RPC info-leak and a real production audit bug — but self-apply + self-verify by the
authoring agent collapsed two locked decisions: *"autonomous-apply rejected as a standing mechanism"*
and the Operator lane's *"no ad-hoc governed-table writes"* fence, and removed the independent
live-read gate that caught the B / REPLAY-QUOTA-1 FIX-1 grant-lockdown bug. The sharpest edge was AG
holding live write to the service-role-only **secret-value** tables (`mcp_secrets`,
`llm_provider_secrets`) and the ledger tables.

### The safety property at stake (unchanged from v1)
For governed / secret / grant-bearing schema changes, the LIVE end-state must be confirmed by an actor
or mechanism **independent of the one that produced and applied the change**, before "applied +
verified" is declared. An agent's narrative self-check is not independent (it can be wrong the same
way the change was wrong — the FIX-1 class). A deterministic probe (`verifyGrants` anon-deny;
`get_advisors` diff) is independent: it cannot be talked into a false green.

---

## Decision

### 1. Roles (restores the proven three-role separation)
- **AG — author.** Writes migration `.sql` in the repo. **Live Supabase access = READ-ONLY** —
  inspects tables/structure/grants so it authors from real live shape instead of blind (a genuine
  upgrade over the pre-2026-07-07 model), but cannot mutate the live DB. The secret-store-write edge
  is removed the moment the key is downgraded.
- **Operator (Gemini + Supabase MCP) — apply.** Applies reviewed, merged migrations to the live DB
  via **`supabase db push` ONLY**. `apply_migration` / `execute_sql`-for-DDL are **banned** going
  forward — that mixed tooling (timestamp `version`s that never matched file prefixes) was the
  ledger-drift root cause the SEC-ADVISOR reconcile uncovered. The Operator's read role (diagnostics,
  live-schema reads, independent confirmations) is unchanged. Fence otherwise intact: no repo writes,
  no ad-hoc governed-table DATA writes (rule/provider edits go through the gated admin UI), never
  echoes a secret value.
- **Deterministic gate — verify.** After apply, the Operator runs `scripts/verifyGrants.ts` (anon-deny
  probes over the real DB, incl. the new function-EXECUTE probe below) **and** `get_advisors(security)`
  and reports the **raw output**. The Architect reasons over that raw output — not the Operator's or
  AG's narrative — before "applied + verified" is declared. This replaces "read the grants and eyeball
  them" with a probe that can't forget what to check.
- **Architect — review.** Writes ONE gated phase prompt per governed/secret migration; does the
  fresh-clone RULE-25 review before merge (apply happens only after merge).

### 2. Enforcement additions (pull forward)
- **HARDEN-FN-PROBE-1 (de-deferred → NOW).** Add a function-EXECUTE anon-denied probe to
  `verifyGrants.ts` (`replay_quota_settle(NO_UUID,0,0)` as anon → error = good; no-error = LEAK). This
  is exactly the class self-verification misses (the FIX-1 leak was a function-EXECUTE grant the
  table-UPDATE probes could not catch). It becomes part of the deterministic gate.
- **Advisor floor.** `get_advisors(security)` output is checked against the allow-list of the 5
  INTENTIONAL `rls_enabled_no_policy` INFO findings + the 1 Auth toggle; any NEW finding is a fail.

### 3. Ledger discipline (the drift root-cause fix, ratified)
- **`supabase db push` ONLY** for all future apply. One-time `supabase login` + `link --project-ref
  fjbrkimwvtpwoxhziidh` is an owner prerequisite; thereafter the Operator applies via `db push`.
- **Precondition on trusting `db push`:** the `schema_migrations` reconcile (delete-all + 33-row
  re-insert) must be **independently confirmed to match the LIVE schema** (not just the files) before
  `db push` is trusted — a file marked "applied" whose objects are absent would be skipped forever.
  This is the shipped independent verification prompt
  (`cwf-operator-VERIFY-sec-advisor-ledger-reconcile-v1.md`); it must PASS before the first `db push`.

### 4. New hard invariant (carry into KB / bootstrap)
The authz helpers live in `private`, not `public`. **Every future RLS policy or migration must call
`private.is_super_admin(...)` / `private.has_backend_scope(...)`.** The `private` schema must **never**
be added to PostgREST's exposed-schema list (that re-opens the boolean-oracle RPC leak SEC-ADVISOR-2
closed); the advisor re-run catches a regression.

---

## Future upgrade — CI-apply (documented, zero-rework, NOT built now)
If the manual Operator relay ever becomes friction, apply can move into a protected GitHub Actions
workflow on merge to `master`, with a scoped token held only in Actions secrets. **This is a pure
trigger swap: the apply command (`supabase db push`) and the verify command (`verifyGrants` +
`get_advisors`) are identical to the Operator model** — so adopting the Operator model now costs no
rework later. It is the direct analogue of the locked AWS *"Terraform applies, never an MCP; CI
applies it"* decision, deferred until warranted. Not on the live queue; recorded here so the path is
known.

---

## Interim posture (until AG key is downgraded)
AG holds live read+write today. Until the key is read-only:
- No governed / secret / grant migration is declared "applied + verified" on AG's self-report — the
  deterministic gate output (Architect-reasoned) is the sole basis.
- **Downgrade AG's Supabase key to read-only as the first action** — the secret-store-write edge is
  live every day the key stays read-write, and read-only preserves 100% of AG's verification value.
- No autonomous AG apply to `mcp_secrets` / `llm_provider_secrets` / `user_quotas` / `*_audit`.

---

## Consequences
**Gains.** The proven three-role independence is restored today at zero build cost; the sharp
secret-store-write edge is removed; AG gains live read for better-informed authoring; the deterministic
verify gate is stronger than the pre-2026-07-07 eyeball step; the model is forward-compatible with
CI-apply at zero rework.

**Costs.** Per-migration manual relay of the Operator apply + verify (the checkpoint the owner
values); one-time `supabase login` / `link`; the AG key downgrade; building HARDEN-FN-PROBE-1.

**Honest limit.** The Operator apply is still an interactive-agent live apply — its independence comes
from Operator ≠ AG-author + the deterministic gate, which is sufficient for the FIX-1 class but is not
the hands-off CI end-state. That end-state is available at zero rework when wanted (above). Software
gates and contains; it does not author correctness — the Architect spec pre-review remains the layer
that catches design-level errors a probe can't express.

---

## Relationship to existing decisions
- Restores the pre-2026-07-07 Operator-lane apply role, correcting only its apply MECHANISM
  (`db push`, not `apply_migration`) and adding the deterministic closing gate.
- Keeps the locked AWS principle (*MCP authors/validates, CI applies*) as the documented future
  Supabase upgrade rather than the immediate mechanism.
- Complements ADR-001 (trust is deterministic, never a self-assessment) — the DB-apply gate is that
  same discipline applied to schema mutation.

---
*Accepted 2026-07-07 (owner decision). Open precondition: the independent ledger↔live-schema +
SEC-ADVISOR-2 end-state verification must PASS before the first `supabase db push`. On the next
doc-touch, the KB/bootstrap gain the `private`-schema invariant + the `db push`-only rule; the
register gains HARDEN-FN-PROBE-1 (promoted from DEFERRED) + the AG-key-downgrade action.*
