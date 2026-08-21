# RECON-TENANT-CONSOLE-POSTURE-1 · v1
<!-- RECON-TENANT-CONSOLE-POSTURE-1-v1 · 2026-08-02 · S78 · Architect: Claude.
     DOCTRINE D-1 thin recon brief — READ-ONLY, no branch, no writes, no design.
     Lane: AG (Author). One self-contained relay per D-2.
     Purpose: earn the live evidence the ADR-012 §6 capability-posture row-set
     DESIGN NOTE depends on, before a single design sentence is written.
     This is NOT a phase prompt. Output = one pasted report. -->

## PRECONDITION (S47-1)
`git rev-parse origin/master` must print
`29e4965fd5d3654593d19a06b0221e03112d7a38` (SPLIT-2 merge). If it does not,
STOP and report the hash — do not proceed.

## WHY THIS RECON EXISTS (context, embedded per D-2)
TENANT-CONSOLE is the next board item (register v80 §3.1). Its vision note
(TENANT-CONSOLE-VISION-v1 §7) binds the derivation order: (1) ADR-012 §6
posture row-set design → (2) FLOOR-TENANT-SPLIT [DONE @ S77, merges
cc309328 + 29e4965f] → (3) console client → (4) discovery→draft assistant.
Step 1 is therefore live. ADR-012 §6 (repo: docs/adr/ADR-012-…md) commits
NO schema — the row-set design note is the first artifact, and per D-1 it
may not be written over assumed live state. S77's KIND-ALREADY-MINTED
hand-back is the exact failure mode this recon prevents: a design premised
on "no posture kind exists" without a live read.

## ARCHITECT-COMPUTED FACTS (already earned this session — do NOT re-derive)
Provenance: fresh full clone of origin/master @ 29e4965f, S78 session,
commands named per fact.
- **No tenant dimension exists in the schema.** `grep -rln "tenant_id\|org_id"
  supabase/migrations/*.sql` → EMPTY across all 64 migrations. Migrations are
  the schema's sole source (ADR-005), so this is authoritative; no Operator
  schema read is needed (CEREMONY-ZERO).
- **No posture kind or table exists in code.** `grep -rn "posture"
  supabase/migrations/*.sql` → prose-only hits (RLS-posture comments);
  no kind name, no table.
- ADR-012 landed in repo @ A7 (docs/adr/), §6 explicitly "shape, NOT a
  schema commitment".

## G0 · THE ONLY ASK — gated live reads, read-only, paste the raw output
Using the existing gated read affordances (the same pattern as prior phase
G0s — gated RuleGovernanceService / read-only scripts; NO direct DB access,
NO writes, NO branch creation):

1. **Full `rule_kinds` live inventory**: kind name · backend/domain ·
   core-vs-soft flag · row count in `domain_rules` per kind. (Paginate to
   exhaustion if any read can exceed 1000 rows — PostgREST cap law.)
2. **Posture-claim verdict, stated explicitly**: after reading the inventory,
   answer in one line — "a posture/capability-profile-like kind DOES / DOES
   NOT exist live" — and if DOES, name it and paste its rows.
3. **Positive control (S66-1 / D-5)**: prove the inventory command can fail —
   e.g. query one deliberately wrong kind name and show the empty/error
   result — so a zero in (2) is believable.

Nothing else. No schema proposals, no opinions, no cleanup — the design note
is the Architect's next artifact and it waits for this paste.

## HOUSEKEEPING (same lane, same relay, zero risk — execute, one line back)
Delete the two merged remote branches:
`git push origin --delete phase/floor-tenant-split-1 phase/floor-tenant-split-2`
Both verified merged into master 29e4965f this session
(`git branch -r --merged origin/master` listed both). Report: one line,
"pruned" + remaining remote branch list.

## OUTPUT CONTRACT
ONE pasted report containing: precondition hash echo · G0.1 inventory table ·
G0.2 one-line verdict · G0.3 positive-control evidence · housekeeping line.
No merge, no PR, no commit is expected from this brief.

TAIL ANCHOR (S61-3): this brief ends at the line below.
— END · RECON-TENANT-CONSOLE-POSTURE-1-v1 —
