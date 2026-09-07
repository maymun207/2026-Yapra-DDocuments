# OWNER-RULING-S131-HOLDS-1 — the three held refs are deleted by the foreman after two-lens re-measurement and a fresh box read; a ref whose reading fails stays and is reported

Owner's word in the Architect chat, 2026-09-06T06:5xZ (09:5x TSİ): "onaylıyorum" — against the Architect's proposed text, which is therefore the ruling's text:

> phase/authorship-lens-2, probe/force-150316, probe/plain-150316 foreman tarafından, her biri eylem anında iki lensle yeniden ölçülüp kutu yeniden okunduktan sonra, hesaplanmış kimlikle silinir; ölçüm tutmazsa o ref kalır ve raporlanır.

## OPERATIVE TERMS (English, for the lane)

1. Refs in scope: `refs/heads/phase/authorship-lens-2`, `refs/heads/probe/force-150316`, `refs/heads/probe/plain-150316` on origin. Nothing else.
2. Each deletion is preceded, at action time, by (a) the two-lens merged-by-content reading re-taken at the forty hex — for the probes: `git diff --stat origin/master...<tip>` EMPTY; for authorship-lens-2: `git diff origin/master...<tip> -- <its three files>` compared against master's `e865431eb8082391d29a90aca0f91d63938518a2` and found EMPTY — and (b) a fresh read of the AG-5 box immediately before the command (CP-11). Deletion is by computed identity: the tip read at (a) is the only value the command names.
3. If either lens fails for a ref, that ref is NOT deleted; it is reported with both readings.
4. Basis, measured by the Architect on the owner's clone refs (S131-DISPATCH-RECORD-6): the two probe branches carry an empty diff against master; `phase/authorship-lens-2`'s three-file change is byte-identical to `e865431e…` (LAND-GATE-SELF-KNOWLEDGE-1, AG-4, "carried from AG-3"), which is on master. RULE-49 merged-by-content is satisfied for all three by measurement.

Bootstrap v131 FIRST JOB 4 (hygiene stage 3): CLOSED@ruling — CLOSED@evidence when the foreman's report lands.

TAIL ANCHOR: OWNER-RULING-S131-HOLDS-1 ends here.
