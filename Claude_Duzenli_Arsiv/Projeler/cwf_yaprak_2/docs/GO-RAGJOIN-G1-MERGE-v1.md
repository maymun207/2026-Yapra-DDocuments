# GO-RAGJOIN-G1-MERGE-v1
<!-- GO-RAGJOIN-G1-MERGE-v1 · 2026-08-01 · S75 · Architect → AG.
     Reviews PR #129 (phase/rag-join-finish-1 @ 079e7ef5) against master c22cdf24. -->

## RULE-25 EVIDENCE (Architect's own fresh clone)
- master `c22cdf24…` · head `079e7ef5105ae8d4112228ff2656229445971a3c` · diff =
  exactly 3 files (+46/−0): the migration + CHANGELOG + one KB line. Zero code,
  zero mapped docs — no reseal owed, docVersion rev 171 stands. ✓
- Migration bytes read in full: matches the briefed SQL exactly; idempotent
  (`on conflict do nothing`); the trust_tier/scope_identity omission is
  VERIFIED correct by the Architect's own read of
  `20260628120000_backend_trust_registry.sql` line 27 — default is
  `'unverified'`, the ADR-001 floor. The header's reasoning is accurate. ✓
- CI: Architect's direct read rate-limited (known 403 class) — run
  30705835795 is AG-REPORTED green, accepted with corroboration-by-
  construction: a docs+migration-only diff cannot alter the app under test,
  and the rule26 flake evidence (zero app-surface bytes vs clean anchor) is
  sound. Recorded as AG-reported, not Architect-verified. Pass condition at
  merge time still applies below.
- G0 observations accepted: the `system` registry row is pre-existing (L1
  params lane, no collision); the personal mcp shadow row is inert.

## MERGE — execute now
STEP 1 (blocking): fresh CI re-read on head `079e7ef5` exactly;
`completed/success` required (`in_progress`/null is NOT a pass; a new head
invalidates this GO).
STEP 2: merge `--no-ff` with this message, byte-verbatim:

```
Merge PHASE RAG-JOIN-FINISH-1 G1: the third backend is one INSERT, which is the whole point

machine-knowledge-base joins the backends registry through the registry's own
designed affordance — a row, not a schema change, not an enum, not a fork.
tool_pattern=flat because the RAG service exposes its query tools directly.
trust_tier and scope_identity are deliberately left at their defaults: a new
backend is born unverified (the ADR-001 floor) and earns its standing from
observed behavior, never from a declaration in a migration header.

Idempotence proven on a disposable real-shape database (second apply: 0 rows).
The file is not applied here — supabase db push belongs to the Operator lane,
next in sequence, with the A9 secret-retirement file ahead of it in the queue.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
```

STEP 3: push; report remote master hash from a fresh fetch. Then STAND BY —
G2 is the Operator's; G4 resumes for you only after G3's enable + one TTL.

<!-- END · GO-RAGJOIN-G1-MERGE-v1 -->
