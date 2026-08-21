# PHASE-FLOOR-TENANT-SPLIT-2 · v1_3 — SINGLE-RELAY EDITION
<!-- PHASE-FLOOR-TENANT-SPLIT-2-v1_3 · 2026-08-02 · S77 · Architect → AG.
     Supersedes v1_2 on AG's G0 hand-back. RULINGS EMBEDDED:
     FTS2-F1 KIND-ALREADY-MINTED-1 → arm accepted: the armes.zone kind
     (minted P4 · 2026-06-27, 4 published rows byte-matching this payload,
     served live by composeArmes) is the INCUMBENT; G1 verifies it, G3
     becomes a consent-gated 0-change idempotence re-proof.
     FTS2-F2 REGISTRY-ZONE-LAYER-EMPTY-1 → arm accepted: join ruling in
     B-2; parent guard MANDATORY; zone-descriptor alternative REJECTED.
     FTS2-F3 → arm accepted: loader strips `layer` as join-metadata, with
     a logged attribution line (never silent).
     FTS2-F4 disclosure accepted (positive-control culture).
     Architect premise correction on record: the design's "qualifiers
     exist ONLY in zones.ts" was FALSE — the gate caught it (S65-1).
     G0 STATUS: SATISFIED — AG's G0 evidence pack (census 546/1050,
     paginated registry reads 17/779/0/0, parity baseline, payload sha
     40193ea9… match) CARRIES FORWARD; do not re-run G0 except free
     re-asserts on the warm clone.
     Supersedes v1_1 (PAYLOAD-APOSTROPHE-DRIFT-1, AG hand-back honored:
     RULING arm (a) — U+2019 canonical; the payload below is generated
     PROGRAMMATICALLY from the anchor bytes with an in-build assertion, so
     the provenance claim is true by construction; new sha).
     G0.3 note: if supabase-ro MCP is unauthorized in the AG session, the
     S52-1 read-only script lane is the SANCTIONED fallback for the live
     registry reads — same pagination-to-exhaustion duty applies.
     Supersedes v1 (PLATINUM-BREACH-S77-1 remedy: v1 split the relay across
     two files plus a spoken line; v1_1 is ONE self-contained artifact —
     payload EMBEDDED verbatim with its sha, Architect confirmation in this
     header). ARCHITECT CONFIRMS: SPLIT-1 CLOSED@evidence — merge cc309328
     verified · master CI 30736834892 success ×5 · prod
     dpl_ELaD1oaBQoUog7Xtm6AYKfwQ79wm READY serving · zero new runtime
     error classes. PRECONDITION SATISFIED; this relay is the gate opening.
     Design: cwf-floor-tenant-split-2-design-v1 — its §6 census intake is
     CLOSED on the merged CHANGELOG: FTS1-F1/F2/F3 add NO Layer C entries;
     FTS1-F1 mints this phase's central census duty (see G0.2). Payload:
     FLOOR-TENANT-PAYLOAD-KALE-v1.json — embedded by reference AND by sha
     below (S54-3: one relay, one artifact; the payload rides THIS relay).
     -->

## PRECONDITION (S47-1)
`origin/master` = `cc309328f018f1c1e4f896b80da709807bdf601a` (SPLIT-1
merge) · docVersion rev 176 · 414 files / 4614 tests (CI arbiter) ·
64 migrations · `check:tenant-zero` [OK] with the kb7·glazur named
deferral · SPLIT-1 CLOSED@evidence confirmed by the Architect in the
relay that carries this prompt. Any mismatch → STOP.

## PAYLOAD (EMBEDDED — the single-relay guarantee)
The tenant data asset rides INSIDE this artifact. Extraction rule: the
exact bytes between the BEGIN/END markers below (marker lines excluded,
trailing newline INCLUDED). Write them to a LOCAL file OUTSIDE the repo
working tree (e.g. /tmp/FLOOR-TENANT-PAYLOAD-KALE-v1_1.json), then verify:
sha256 = `40193ea934d1a8ab49ddfd7afa849357e3683df78cf79c85a7c317a82546a5cb`
Mismatch → STOP, report, do not proceed. The payload NEVER enters the
repo — not as a file, not as a fixture, not in a test; tests use B-7
neutral placeholders exclusively. Before use, verify the entries
byte-match `armes/zones.ts` values at the anchor.

-----BEGIN FLOOR-TENANT-PAYLOAD-KALE-v1_1.json-----
{
  "_artifact": "FLOOR-TENANT-PAYLOAD-KALE-v1_1",
  "_date": "2026-08-02",
  "_class": "TENANT DATA ASSET — deployment-time payload. NEVER commit to the platform repo (check:tenant-zero enforces). Applied via the generic loader (PHASE-FLOOR-TENANT-SPLIT-2 G3) with the owner's consent line. Provenance: values EXTRACTED PROGRAMMATICALLY from `git show cc309328:api/cwf/_lib/knowledge/backends/armes/zones.ts` with an in-build byte-match assertion (PAYLOAD-APOSTROPHE-DRIFT-1 remedy, arm a: U+2019 canonical, matching the anchor and render.ts:36).",
  "kind": "armes.zone",
  "backend": "armes",
  "factory": {
    "layer": "factory",
    "name": "KB7",
    "role": "canonical ARMES scope/factory id"
  },
  "entries": [
    {
      "layer": "zone",
      "name": "Glazur3",
      "line": "KB7",
      "hasBarcode": true,
      "scrapVisible": true
    },
    {
      "layer": "zone",
      "name": "FIRINALT",
      "line": "KB7",
      "hasBarcode": true,
      "scrapVisible": true
    },
    {
      "layer": "zone",
      "name": "IKINCILALT",
      "line": "KB7",
      "hasBarcode": true,
      "scrapVisible": true
    },
    {
      "layer": "zone",
      "name": "IKINCILUST",
      "line": "KB7",
      "hasBarcode": false,
      "scrapVisible": false,
      "notes": "Barkodsuz çalışır. Fire/scrap ARMES’te görünmez; fire kırılımı yapısal olarak yoktur."
    }
  ],
  "_semantics": "Absence of a qualifier row for an entity = UNKNOWN (attributed), never default-true and never default-false. scrapVisible:false is the load-bearing empty≠zero carrier: a scrap question against IKINCILUST must render structural invisibility, never a zero."
}
-----END FLOOR-TENANT-PAYLOAD-KALE-v1_1.json-----

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
5. **Parity baseline:** PINNED from AG's G0.5 = `395d527d…9dddc4` ·
   39,092 bytes on the SPLIT-1 pinned turn (28-offered-tools divergence
   disclosed and accepted; F185 brake keeps the learned map frozen
   mid-phase). B-5 compares against THIS sha.

## BINDING CONSTRAINTS
- **B-1:** Deterministic core stays vector-free; grounding/trust stays
  deterministic code (ADR-001). The kind is CORE-class: Zod field-locked
  in code (structure→code), VALUES only via gate (data→gated).
- **B-2 (schema + join, RULED):** the value schema is the LIVE minted
  kind's `Zone` shape (code_schema_ref:'Zone', v1) — the incumbent; if
  code and live kind diverge, the live kind wins and the divergence is a
  STOP-finding. THE JOIN (ruling FTS2-F2): registry row where
  `backend='armes' AND layer_key='line' AND display_name=entry.name AND
  parent = the factory row resolved from entry.line` — the PARENT GUARD
  is MANDATORY; name-only matching is FORBIDDEN (Glazur3 exists under
  KB3 and Granit too). The registry has NO zone layer (proven empty,
  paginated); armes-domain "zones" are LINE-layer rows, per the
  resolveEntityRef precedent. **Absence of a qualifier row = UNKNOWN,
  attributed — never default-true, never default-false.** The payload's
  `layer` key is registry-join METADATA: the loader strips it before
  schema validation and logs the strip (FTS2-F3), zero schema change.
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
**G1 · Kind verification (re-scoped by FTS2-F1):** nothing to mint.
Verify the incumbent: live kind row (core · locked · code_schema_ref
'Zone' · v1) ↔ code `Zone` Zod shape field-for-field; verify the 4
published rows byte-match the payload entries (U+2019 included); land
the MISSING test pair if absent — schema-lock red test (bad payload
rejected) and gate red-ability (S66-1 both nets). Any divergence =
STOP-finding, never a silent fix.

**G2 · Generic loader:** per B-3, with its own test pair incl. the
repo-path refusal and an idempotence double-apply proof.

**G3 · Idempotence re-proof (re-scoped by FTS2-F1, consent-gated):**
loader plan-mode against the live rows MUST read **0 changes** (the
rows pre-exist and byte-match). Plan ≠ 0 → STOP: that is drift between
published rows and the anchor, a finding to report, NEVER an apply.
Plan = 0 → STOP → the owner speaks this consent line in this channel,
verbatim:
  "Onay: FLOOR-TENANT-PAYLOAD-KALE-v1_1, canlı armes.zone satırlarına
  karşı 0-değişiklik idempotence yeniden-kanıtı olarak uygulansın —
  plan 0 değişiklik göstermek zorunda."
→ apply → verify 0 changes applied, gate verdict lines recorded, live
rows re-read unchanged. This doubles as the generic loader's live
validation. NO consent line, NO apply.

**G4 · Consumer re-point:** composeArmes ALREADY serves from the
governed rows (FTS2-F1) — G4's work is the OTHER zones.ts importers:
grounding scope vocabulary · stageClarify · alias/ref resolution ·
render scrapVisible read → registry names via the B-2 RULED JOIN
(parent-guarded) + qualifiers via the governed armes.zone rows. Four-way empty≠zero proven branch-for-branch (B5-RETIRE
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
3. Extracted-payload sha256 (must print the header value) + byte-match proof vs zones.ts. 4. G3 plan output, the
owner's consent line quoted, apply verdicts, live row reads.
5. **IKINCILUST WITNESS:** live scrap question against IKINCILUST renders
structural invisibility, not a zero — before AND after (trace ids).
6. Outage simulation: kind/registry read failure → attributed absence,
four-way. 7. Parity: G0.5 sha == post-sweep sha, side by side.
8. `check:tenant-zero` FULL-EXTENT ZERO + control red. 9. CI green on PR
head (S37-2); flake discipline standing. 10. Test delta reconciled
per-file vs 414/4614. 11. STOP-FOR-REVIEW: branch
`phase/floor-tenant-split-2`; merge only on Architect RULE-25 GO.
TAIL ANCHOR: this prompt ends at the line "END-OF-PHASE-PROMPT v1_3".

END-OF-PHASE-PROMPT v1_3
<!-- END · PHASE-FLOOR-TENANT-SPLIT-2-v1_3 -->
