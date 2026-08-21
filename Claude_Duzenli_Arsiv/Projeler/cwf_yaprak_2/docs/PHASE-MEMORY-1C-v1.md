# PHASE MEMORY-1C · v1 — promotion + the admin memory surface
<!-- Architect-authored · 2026-07-31 · binding design: cwf-memory-1-design-v1_1
     §3-C4/C5 + §6.3. Carries two riders born 2026-07-31: CHART-SERIES-DIALECT-1
     and the stage-14 button-sentence flip deferred by ADDENDUM-1. -->

## §0 · HARD PRE-FLIGHT (live ground, Architect-read from production)

Anchor: `origin/master` = `40896d3c273a69694603201d22b0d9b6528b8548` (the 1B
merge) · suite **398/4413** · docVersion **rev 165** · production
`dpl_432EjSFiBuaCKPDq3twt28XL1rb5` READY. The store is live and recalling —
today's witnesses, verbatim:

    [Memory] offered=3 conv=0 user=3 topK=3 ms=132
    [Gate] action=publish kind=agent.param key=agent.memory.retrievalTopK verdict=published
    [MemoryWrite] user=f4805bd1-… tools=3 entities=1 importance=2   ← 4th episode, first with a resolved entity

Fresh clone → verify the anchor + counts; drift → STOP and report. Branch:
`phase/memory-1c`. If ANY step below appears to require a migration or the
Operator, STOP and hand back — that is a premise error to surface, not to solve.

## §1 · BINDING CONSTRAINTS

1. **ZERO migrations · the Operator does not enter.** All episode reads and the
   delete run server-side (service role) behind gated admin endpoints. The
   `episodes` grant posture (SERVER_ONLY, zero policies) is untouched.
2. **Eval-gate untouched** — additive dispatch only. Promotion rides the
   EXISTING draft → gate → publish rail; no new gate, no bypass.
3. **Freeze law:** the proof promotion uses **`domain_rules` kind ONLY**
   (semantic). prompt-segment / routing promotion drafts may be AUTHORED but
   never published in this phase — the golden freeze holds until A5.
4. **Brake law:** the agent never auto-promotes. While `learnEnabled=0` the
   propose affordance is authoring-only and visibly labeled so (the braked-
   Curate posture). The ONE end-to-end publish in §3 is the owner's super-admin
   hand on the existing rail — and is immediately rolled back, so governed
   state ends where it began. Both directions ARE the proof (design §6.3).
5. **C1:** zero writes to `messages`. Delete touches `episodes` only and writes
   an audit record (actor · timestamp · reason · episode `turn_id`) — audit
   rows carry structure, never raw content (no-PII ledger posture, ADR-007).
6. **LLM:** zero on any runtime path. LLM assist is permitted at DRAFT
   AUTHORING time only (the stage-drafts/Sentezle precedent).
7. **S69-3 at birth:** every row control derives its enabled-state, action and
   authority from ONE resolved binding; the handler never re-derives.
   Structural grep lands in self-verify.
8. **F221:** the corpus-health header is computed from real reads — total
   episodes · expiring-in-7d · last forget-tick time + deleted count.
9. **Bounded reads:** the episode browser pages to exhaustion or caps WITH a
   disclosed truncation marker — PostgREST's silent 1000 cap is a known trap;
   an undisclosed partial list is a violation, not a display choice.
10. **Render laws:** RULE-26 @1280 AND @1024 with numeric scrollWidth asserts ·
    S64-1 native-HTML density. ADR-012 is NOT citable (not in the repo yet).
11. **Grounding/memory isolation unchanged:** the M-MEM2=0 construction
    guarantee (zero memory imports in `grounding/`) must survive byte-for-byte;
    re-grep in self-verify.

## §2 · GATED SUB-PHASES

**G1 · Gated admin data endpoints.** List (filters: user · date range · outcome
class · has-correction; paginated per constraint 9) · detail · corpus-health ·
audited DELETE. RBAC: super-admin surface; tests include an authz-deny case and
a delete-audit shape test.

**G2 · U-2 admin Memory tab.** Corpus-health header (constraint 8) · episode
browser (columns: date · user · asked-digest · entities · tools · importance ·
expires_at) · detail drawer (full distilled record + turn id) · delete behind
ConfirmDialog writing a reason · **"Terfi önerisi"** affordance with the braked
labeling. e2e rendered evidence per constraint 10.

**G3 · Promotion path.** Episode detail → propose → a draft authored into the
EXISTING drafts surface (`domain_rules` kind), carrying episode provenance
(source `turn_id`s) · additive gate dispatch · rollback path exercised in test.

**G4 · CHART-SERIES-DIALECT-1 rider.** `chatParser` accepts each `series` item
as `string` OR `{field, header}`; `header` becomes the legend label in
`MessageChartContent`. Dual-dialect tests + a fixture reproducing the REAL
block emitted in production today (UUID fields + `{field, header}` objects) —
red on the old parser, green on the new one (the positive control).

**G5 · DOC-FLIP.** Stage-14 card: flip ONLY the button sentence — the audited
delete now exists — while "Bellek bulur, öğretmez" and the mapping-only
learning law stay intact and explicit. Reseal drifted tabs · docVersion
**165 → 166** · CHANGELOG + KB.

**G6 · SELF-VERIFY (literal evidence, in order).** Suite counts vs anchor ·
S69-3 structural grep · constraint-11 isolation grep · authz-deny + delete-audit
test output · rollback evidence · dual-dialect red→green · rendered screenshots
@1280/@1024 with numeric asserts · card text diff.

## §3 · POST-MERGE PROOF READS (S63-1 — lanes named)

- **Owner's hand:** ONE end-to-end promotion (`[Gate] … verdict=published`,
  `domain_rules` kind) then rollback — the Architect reads both log lines.
- **Owner deletes one expendable episode** via the tab — the Architect reads
  the audit line; the next 03:40Z forget tick's `scanned` must be consistent
  with the store's true count (≥4 minus deletions).
- **The tab rendered against live data,** owner verifying in production
  (the UI-CURATE-1 verification pattern).
- **F48 → CLOSED@evidence** when all three land.

## §4 · MERGE RITUAL

Self-verify → hand back → Architect RULE-25 (fresh clone, independent recount)
→ GO with a verbatim Architect-authored merge message → `--no-ff` (squash
banned) → §3 reads. Nothing merges from the AG lane before GO.

<!-- END · PHASE-MEMORY-1C-v1 · 2026-07-31 -->
