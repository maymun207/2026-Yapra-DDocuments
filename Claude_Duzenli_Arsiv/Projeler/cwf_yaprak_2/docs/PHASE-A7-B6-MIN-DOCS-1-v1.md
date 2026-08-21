# PHASE-A7-B6-MIN-DOCS-1 · v1
<!-- PHASE-A7-B6-MIN-DOCS-1-v1 · 2026-08-01 · S76 · Architect → AG.
     Board item B/9 (cwf-work-board-S74-v1) = register v77 §3.1. Five items,
     ONE branch, ONE review, ONE merge: D-2 delegation page · D-3 autonomy
     language · ADR-012 repo landing · R-1 layer-label retrofit ·
     STAGE-CARD-DRIFT-1 fix. Docs + drift-gate-config only phase. -->

## §0 · HARD PRE-FLIGHT (live ground, Architect-read 2026-08-01)

Anchor: `origin/master` = `45dec96b60b3a4204d20e8a00e131f87d1c1724f` · vitest
**415 files / 4620 tests** (CI arbiter, S37-2) · docVersion **rev 173** ·
prod `dpl_32MadXUpA6EVGFXbt5SpB8CcwXQA` READY on the same SHA.

Live reads this phase depends on (S65-1, Architect-verified from a fresh clone
at the anchor — re-verify, STOP on mismatch):
1. `docs/adr/` holds ADR-001 … ADR-011. **ADR-012 is ABSENT** (it exists only
   as a project artifact). This is the F190/ADR-005 lesson in reverse: from
   this phase's merge onward you MAY cite ADR-012; until G1 lands it, you may
   not.
2. `public/architecture/manifest.json` (rev 173): NO tab's `codeAreas` covers
   `src/components/**`. `src/components/admin/stagesRegistry.ts` is therefore
   OUTSIDE the doc-drift gate — verified by scanning every tab's codeAreas.
   That is STAGE-CARD-DRIFT-1's coverage gap, live today.
3. `docs/` holds ARCHITECTURE.md · ROADMAP.md · turn-pipeline.md ·
   CLAUDE-PROJECT-INSTRUCTIONS-v2.md (stale, not this phase's business) —
   NO delegation-policy page exists.

Fresh clone → verify anchor + counts + reads 1–3. Branch: `phase/a7-b6-docs`.
If ANY step below appears to require a migration, the Operator, a governed
publish, or a prompt/golden surface touch — STOP and hand back: that is a
premise error to surface, not to solve.

## §1 · BINDING CONSTRAINTS

1. **ZERO migrations · ZERO Operator · ZERO governed writes · ZERO
   prompt.segment/golden surface.** This phase writes repo files and
   drift-gate CONFIG only.
2. **S37-1 — ratified artifacts are immutable.** ADR-012 lands VERBATIM
   (constraint 3). Existing ADR-001…011 texts are NEVER rewritten by the R-1
   retrofit — labels are APPENDED as a clearly-marked additive section
   (constraint 5). A comments/appendix-stripped byte-compare proving the
   original body of every touched ADR is unchanged is mandatory self-verify
   evidence (S34-1/S35-1 class).
3. **ADR-012 status honesty.** The v1 text says `Status: PROPOSED`. Do NOT
   silently flip it. Land the full v1 body byte-verbatim and PREPEND one
   clearly-fenced repo-landing header block stating: ratified by owner at S72
   close (register v74 §8 binds S72-1/S72-2 = R-1/R-2), landed at A7 per
   register v77 §3.1. The original comment header stays intact inside.
4. **Drift-gate law.** "No gate change" = engine + stage order + interpreter
   byte-identical; ADDITIVE manifest entries are legitimate. G5 must not fork
   `checkDocDrift.ts`/`docDriftCore.ts` semantics. If the engine's current
   shape cannot host the new entry without a code change, the change must be
   ADDITIVE and characterization-tested (existing tabs' verdicts byte-
   identical before/after), and your report names exactly what moved.
5. **Docs describe TODAY, mechanisms nowhere.** D-2/D-3 are documentation of
   EXISTING behavior — zero new endpoints, params, permissions, or valves.
   Every claim in the new pages must name its enforcement site in code
   (file · symbol) — TOTAL-45 applies to prose: no claimed behavior without a
   grep-verifiable anchor.
6. **FLOOR-TENANT-SPLIT is post-tag** — not this phase. But do not ADD new
   tenant-name occurrences in the new pages beyond what quoting existing
   governed state requires.
7. **Genericity:** the delegation page describes the platform's authority
   fabric, not one backend's.
8. **RULE-24** source=text, no NUL · versioning in filename headers per house
   style (ADRs carry their own version lines).

## §2 · GATED SUB-PHASES

**G1 · ADR-012 repo landing.**
`docs/adr/ADR-012-restriction-taxonomy-and-capability-posture.md` = the
repo-landing header block (constraint 3) + the project artifact
`ADR-012-restriction-taxonomy-and-capability-posture-v1.md` body VERBATIM
(the owner relays the artifact; byte-verify against what you receive and
paste its sha256 in self-verify).

**G2 · D-2 delegation-policy page.**
`docs/delegation-policy.md` — the human-delegation policy as a documented
object: which action classes REQUIRE a human, and where that is enforced
today. Minimum coverage, each row = action class · human role · enforcement
site (file/symbol):
- consent-for-spend (golden runs / replay: `--consent-tokens` refusal-by-
  default in the publish seam; quota reserve/settle fences);
- secrets (env-only, ADR-007; `apiKeyEnv` regex fence; never echoed);
- governed publishes (draft → eval-gate → publish rail; RBAC caps;
  S54-4 consent-class authority spoken by the owner);
- migrations (ADR-005: Operator lane, `supabase db push` only);
- mode fences (ADR-002/ADR-006: no mode grants repo-write + DB-write
  simultaneously);
- the braked-learning stance (`router.learnEnabled` flip = owner-authorized
  publish, audit-reasoned — the F185 FLIP precedent);
- backend enable/bind (owner hand in admin, the S75 mkb precedent).
Close the page with a short "layer" note per R-2: this page documents POLICY
positions and their CONFIG instruments; the valves' existence is INVARIANT
(cite ADR-012 §1–2 — now citable via G1).

**G3 · D-3 autonomy language.**
Adopt the "Level-3 autonomy with gated Level-4 capabilities" framing as the
platform's stated autonomy posture: one subsection in `docs/ARCHITECTURE.md`
(additive — do not restructure the file) + one sentence cross-reference in
`docs/delegation-policy.md`. Substance: deliberate staging is the design
("deliberately staged, not unfinished"); Level-4 capabilities exist behind
named doors (ADR-012 §5's RR-1/RR-2/RR-3) and open only by their own design
notes through the normal rail.

**G4 · R-1 layer-label retrofit.**
For EACH of ADR-001 … ADR-011: append ONE clearly-fenced additive section at
the end of the file, titled `## ADR-012 layer label (R-1 retrofit, S76)`,
stating which layer(s) the ADR's rules occupy per ADR-012 §4's ratified sweep
— copy the classification FROM §4, never re-derive or re-litigate it. ADRs
whose subject is lane/process discipline (ADR-005, ADR-006) get the §4 scope-
guard sentence verbatim: "lane and process discipline is OUT of this
taxonomy" + the label `PROCESS (unclassified by ADR-012 §4 scope guard)`.
Constraint 2's byte-compare covers all eleven files.

**G5 · STAGE-CARD-DRIFT-1 fix.**
Bring `src/components/admin/stagesRegistry.ts` INTO the drift gate as a NEW
manifest entry whose mapped codeAreas are the pipeline the cards describe:
`api/cwf/_lib/turn/**` (+ `api/cwf/chat.ts`). Committed shape: a new tab-
class record ("Stage Cards") with `diagram` → the registry file itself and
`lastSyncedCommit` = this branch's reconcile point, so any future turn/**
change past that commit without a card resync FAILS the gate — exactly the
1A-staled-card failure mode, closed structurally. Engine constraint 4
applies: if `checkDocDrift`/`reseal` assume `.html` diagrams, generalize
ADDITIVELY (characterization test: all 6 existing tabs' hashes and verdicts
unchanged). **Positive control (S66-1):** prove the new entry can fail —
touch a mapped turn/** file in a throwaway worktree, run the gate, paste the
RED naming the Stage Cards entry, revert.
While reconciling: verify the 15 cards against today's pipeline; card TEXT
edits in this phase are limited to factual staleness found in this
reconcile (report each as a named diff; the S72 wording law — "the system
does not learn knowledge; only word→tool mapping; knowledge changes only
through the gated path" — stays intact and explicit on stages 05/06/14).

**G6 · DOC-VERSION + reseal.**
`npm run check:doc-drift` clean at the branch head; reseal drifted tabs
(manifest edit itself drifts) — docVersion **173 → 174** disclosed;
CHANGELOG entry.

**G7 · SELF-VERIFY (literal evidence, in order).**
Suite counts vs anchor (415/4620 baseline; any delta named) ·
ADR-012 sha256 of the landed body vs the relayed artifact ·
appendix-stripped byte-compare output for ADR-001…011 (constraint 2) ·
grep table for every enforcement-site claim in D-2 (constraint 5) ·
G5 characterization evidence (6 existing tabs unchanged) ·
G5 positive-control RED output ·
`check:doc-drift` [OK] at head · docVersion 174 visible in manifest ·
zero-forbidden-surface greps: no `supabase/migrations` diff · no
`prompt/core` diff · no `domain_rules` write path touched.

## §3 · POST-MERGE SEQUENCE (S63-1, lanes named)

1. Self-verify → hand back → Architect RULE-25 fresh-clone review → GO +
   verbatim merge message → merge `--no-ff` → push, remote hash reported.
2. **Proof read (Architect):** fresh clone at the new master — ADR-012
   present, delegation page present, manifest carries the Stage Cards entry,
   docVersion 174; re-run the G5 positive control independently.
3. Register v78 records: A7 CLOSED@evidence · STAGE-CARD-DRIFT-1
   CLOSED@evidence · R-1 retrofit DONE (definition-site scope per ADR-012
   §3; admin-UI surfacing stays the named later refinement).

## TAIL ANCHOR (S61-3)
This prompt ends after §3. If the last line you can see is not this
sentence, the relay was truncated — request a re-send before acting.
<!-- END · PHASE-A7-B6-MIN-DOCS-1-v1 · 2026-08-01 -->
