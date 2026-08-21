# OPERATOR-APPLY-RAGJOIN-G2-v1
<!-- OPERATOR-APPLY-RAGJOIN-G2-v1 · 2026-08-01 · S75 · Architect: Claude.
     RUN ONLY AFTER the owner relays AG's merge confirmation (remote master
     hash reported). Applies the RAG-JOIN registry migration via the sole
     sanctioned channel (ADR-005 v2: `supabase db push`; apply_migration is
     BANNED). -->

## FENCE — READ FIRST, BINDING
- Supabase project: **`fjbrkimwvtpwoxhziidh`** ONLY.
- Channel: **`supabase db push`** only. NEVER `apply_migration`, never raw SQL
  for the apply itself. No repo edits — your checkout is a read/push vehicle,
  nothing else. No secrets echoed (ADR-007); silent success is correct.
- If the push proposes ANY file beyond the two named below: STOP, paste the
  proposed list, apply nothing.

## PRECONDITION (S47-1)
Pull latest master (AG has merged; the owner's relay confirms). `supabase db
push` dry/list is expected to propose EXACTLY these two pending files, in
this order:
1. `20260730120000_a9_personal_secret_retirement.sql` — merged earlier
   (A9 phase, closed at board level); its application is DISCLOSED as part of
   this apply set. It is idempotent by its own phase's standard.
2. `20260801152148_backend_registry_machine_knowledge_base.sql` — this
   phase's file.

## G-GATES — in order, paste literal output under each label
**G-A · Push.** Run `supabase db push`; paste the applied-file list verbatim.
**G-B · Idempotence probe.** Run `supabase db push` AGAIN immediately;
expected: "no pending migrations" (or equivalent no-op). Paste it. A second
apply that writes anything = STOP + report.
**G-C · Read-back (read-only SQL, allowed for verification only):**
```sql
select id, display_name, tool_pattern, enabled, trust_tier, scope_identity
from public.backends order by id;
```
Expected: 4 rows — `armes` · `machine-knowledge-base` (Makine Bilgi Tabanı ·
flat · true · unverified · {}) · `superset` · `system`. Paste all rows.
**G-D · A9 spot-verify (one read):** confirm the A9 file's own success
signature per its header (if the header names a verification read, run it;
if not, state "A9 header names no read" — do not invent one).

## OUTPUT
One block: `=== G-A ===` … `=== G-D ===` with verbatim outputs, closing line
`ROWS: backends=<n>`. No interpretation — the Architect reads the literals.

<!-- END · OPERATOR-APPLY-RAGJOIN-G2-v1 -->
