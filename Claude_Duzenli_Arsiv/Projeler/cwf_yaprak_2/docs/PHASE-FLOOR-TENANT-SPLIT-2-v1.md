# PHASE-FLOOR-TENANT-SPLIT-2 · v1
<!-- PHASE-FLOOR-TENANT-SPLIT-2-v1 · 2026-08-02 · S77 · Architect → AG.
     Design: cwf-floor-tenant-split-2-design-v1 — its §6 census intake is
     CLOSED on the merged CHANGELOG: FTS1-F1/F2/F3 add NO Layer C entries;
     FTS1-F1 mints this phase's central census duty (see G0.2). Payload:
     FLOOR-TENANT-PAYLOAD-KALE-v1.json — embedded by reference AND by sha
     below (S54-3: one relay, one artifact; the payload rides THIS relay).
     RELAY GATE: the owner relays this prompt only AFTER the Architect
     confirms SPLIT-1 CLOSED@evidence (prod READY + logs + master CI). -->

## PRECONDITION (S47-1)
`origin/master` = `cc309328f018f1c1e4f896b80da709807bdf601a` (SPLIT-1
merge) · docVersion rev 176 · 414 files / 4614 tests (CI arbiter) ·
64 migrations · `check:tenant-zero` [OK] with the kb7·glazur named
deferral · SPLIT-1 CLOSED@evidence confirmed by the Architect in the
relay that carries this prompt. Any mismatch → STOP.

## PAYLOAD PIN
`FLOOR-TENANT-PAYLOAD-KALE-v1.json` arrives in the SAME relay as this
prompt. Before any use: compute sha256, report it, and verify the entries
byte-match `armes/zones.ts` values at the anchor (names, line, flags,
notes). The payload NEVER enters the repo — not as a file, not as a
fixture, not in a test. Tests use B-7 neutral placeholders exclusively.

## HARD PRE-FLIGHT (G0)
1. Fresh FULL clone; verify the precondition block.
2. **kb7·glazur FULL census with FUNCTIONAL-vs-PROSE classification**
   (the FTS1-F1 law of this phase): for EVERY hit, classify
   `prose/comment` · `test-data` · `FUNCTIONAL` (a value the runtime
   reads: keyword, id, map key, constant). A FUNCTIONAL hit may be
   retired ONLY after proving its governed/registry carrier serves the
   same value LIVE (the sicil precedent: proven against the published
   row before the floor keyword died). Unclassified sweep = FORBIDDEN.
3. **Live registry read (S65-1, F198-aware):** page-to-exhaustion reads
   of `entity_registry` for armes: factory layer (expect 17), line
   layer, zone layer — record counts + whether Glazur3/FIRINALT/
   IKINCILALT/IKINCILUST exist as zone-layer rows. PostgREST caps at
   1000/page; any read without pagination proof is SAMPLING (S76-1).
4. **Governed-kind absence check:** confirm no `armes.zone` rule kind
   exists (ABSENCE-ONLY law context) and record the rule_kinds shape the
   mint must follow.
5. **Parity baseline:** full composed live prompt sha256 for the pinned
   armes turn context (the SPLIT-1 method, reused verbatim).

## BINDING CONSTRAINTS
- **B-1:** Deterministic core stays vector-free; grounding/trust stays
  deterministic code (ADR-001). The kind is CORE-class: Zod field-locked
  in code (structure→code), VALUES only via gate (data→gated).
- **B-2 (schema, locked):** `armes.zone` row value =
  `{ layer:'zone', name:string, line:string, hasBarcode:boolean,
  scrapVisible:boolean, notes?:string }`. Reads join registry entities by
  (backend, layer, name). **Absence of a row = UNKNOWN, attributed —
  never default-true, never default-false.**
- **B-3:** The loader is GENERIC and tenant-free: payload from
  path/stdin, validates against the Zod schema, publishes THROUGH the
  eval-gate (schema→referential→behavioral untouched; per-backend
  dispatch additive only), idempotent (re-apply = 0 changes, proven),
  read-only plan mode mandatory before any apply (S75-1), and it REFUSES
  to run from a repo-committed payload path under `scripts/jobs/` (the
  SPLIT-1 mandate made that class illegal).
- **B-4:** Registry stays a pure mirror — `syncEntityDiscovery` remains
  its single writer; qualifiers NEVER write to registry rows (the
  overwrite-by-sync trap, design §1).
- **B-5 (parity):** the composed live prompt sha256 must equal the G0.5
  baseline post-sweep (glossary floor sheds tenant EXAMPLES, structure
  stays; if any live-composing text would change, the SPLIT-1 T3
  publish-then-neutralize ordering applies to it first).
- **B-6 (S76-2 retirement census):** zones/glossary/types retirement
  requires a LIVE-READ census of every consumer (imports AND dynamic
  reads), decisions on the POST-retirement tree; every preserved
  fail-open posture gets a negative-control test.
- **B-7:** neutral placeholders as SPLIT-1 (FactoryF1, LineA, ZoneZ1…).
- **B-8:** migrations: ONE Operator-pending file ONLY IF the evidence
  says a schema object is needed (decide at G1 on the G0.4 shape, never
  assume); ADR-005 — never applied by AG; FENCE `fjbrkimwvtpwoxhziidh`
  in any Operator artifact.

## GATED SUB-PHASES
**G1 · Kind mint:** `armes.zone` rule kind (B-2 schema) + additive gate
dispatch; ABSENCE-ONLY self-seed path; tests prove schema lock (bad
payload rejected) and gate red-ability (S66-1 both nets).

**G2 · Generic loader:** per B-3, with its own test pair incl. the
repo-path refusal and an idempotence double-apply proof.

**G3 · Payload apply (consent-gated):** plan-mode output on the pinned
payload → STOP → the owner speaks the consent line in this channel →
apply → verify: 4 zone rows + factory row live, gate verdict lines
recorded. NO consent line, NO apply.

**G4 · Consumer re-point:** grounding scope vocabulary · stageClarify ·
alias/ref resolution · render scrapVisible read → registry(names) +
kind(qualifiers). Four-way empty≠zero proven branch-for-branch (B5-RETIRE
precedent): real-0 · missing · empty · read-failure each behave
identically, absence-of-qualifier renders UNKNOWN-attributed.

**G5 · Floor retirement:** zones.ts + glossary tenant content +
types residue retire per B-6; post-retirement-tree import census ZERO;
negative-control tests for every preserved fail-open catch.

**G6 · Gate widening:** `check:tenant-zero` vocabulary += kb7 · kb2 ·
kb3 · glazur · kalebodur-compound forms; Layer C exclusion list DELETED;
the deferral line replaced by "FULL EXTENT"; positive control re-proven
red-first. Independent full-tree census: ZERO in scope (exempt-history
counts pinned).

**G7 · Reseal:** affected cards reworded (zones card, knowledge-floor
prose); docVersion rev 176 → 177; clean-anchor worktree drift attribution.

## SELF-VERIFY (literal evidence)
1. G0.2 classification table (every kb7/glazur hit, class + carrier proof
   for FUNCTIONAL ones). 2. G0.3 paginated counts + the four zone rows.
3. Payload sha256 + byte-match proof vs zones.ts. 4. G3 plan output, the
owner's consent line quoted, apply verdicts, live row reads.
5. **IKINCILUST WITNESS:** live scrap question against IKINCILUST renders
structural invisibility, not a zero — before AND after (trace ids).
6. Outage simulation: kind/registry read failure → attributed absence,
four-way. 7. Parity: G0.5 sha == post-sweep sha, side by side.
8. `check:tenant-zero` FULL-EXTENT ZERO + control red. 9. CI green on PR
head (S37-2); flake discipline standing. 10. Test delta reconciled
per-file vs 414/4614. 11. STOP-FOR-REVIEW: branch
`phase/floor-tenant-split-2`; merge only on Architect RULE-25 GO.
TAIL ANCHOR: this prompt ends at the line "END-OF-PHASE-PROMPT v1".

END-OF-PHASE-PROMPT v1
<!-- END · PHASE-FLOOR-TENANT-SPLIT-2-v1 -->
