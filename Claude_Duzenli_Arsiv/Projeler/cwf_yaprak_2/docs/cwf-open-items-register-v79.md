# CWF — Open Items Register · v79
<!-- cwf-open-items-register-v79 · 2026-08-02 · closes S76 = closes the v1
     program. Supersedes v78. Derives from cwf-work-board-S74-v1 (R-BOARD).
     Self-sufficient per S63-2. -->

## §1 · CLOSED @ S76 — never re-raise
**v1 SEALED.** Tag `v1.0.0` (object `2b46d578c292…`) at master
`39590e97dbe382c4f0b5a40531ed20a51bab1831` (release-notes commit atop B5
merge `4b5548098fdd…`); `docs/RELEASE-NOTES-v1.md` sha
`59743bb5cf1e2b3747940718a888ab7301ccf6c49f07dfe274cbd2b27668a535`;
Architect-verified from a fresh FULL clone. Board layers A + B COMPLETE.
- **A7 · B6-MIN-DOCS CLOSED@evidence** (detail = v78 §1, unchanged record):
  ADR-012 landed byte-verbatim (`446309de…`) · delegation-policy.md (17
  grep-anchored rows) · Level-3/gated-Level-4 language · R-1 labels on
  ADR-001…011 (bodies byte-identical ×2 proofs) · STAGE-CARD-DRIFT-1 closed
  (Stage Cards tab, seal `1f0ca2fbe1f8`, positive control ×3) ·
  EVALGATE-DEADGLOB closed (sha-identical removal). Merge `6350844e`,
  rev 174.
- **B5-RETIRE CLOSED@evidence (owner disposition "temiz bir nokta", named
  and executed):** floor + param-hint + lens re-pointed at entity_registry
  FACTORY layer (four-way empty≠zero proven branch-for-branch;
  PARAMHINT-MIRROR-READ-1 minted by AG's §0 census and closed by design
  with a negative-control fail-open test) · `factory_registry` table AND
  `backends.entity_list_tool` column dropped in production (migration
  `20260802120000`; Operator: pre-read 17 rows/0 stragglers · idempotent ·
  42P01 + info-schema absence + existence-probe positive control ·
  backends 4 rows intact) · code refs ZERO across four casings · suite
  413/4601 with Δ−19 reconciled per-file. Merge `4b55480`, rev 175. Prod
  READY, zero new error classes.
- **A8 · SEAL CLOSED@evidence:** recount reproduced (413/4601 CI-arbiter ·
  64 migrations · rev 175 · drift [OK] 7/7) · 46 fully-merged historical
  branches pruned behind a zero-unmerged gate (post-census master-alone is
  the closure record) · master run `30731733173` (PR) green first-attempt;
  run `30731940883` (master) green after matched-signature one-rerun ·
  notes-commit-then-tag order honored.

## §2 · LAWS (standing chain + S76 additions)
S75-1 · WRITE-EXPOSURE rule · CI-arbiter amendment (PR eval-canary skipped
= correct structural state) · flake discipline (matched-signature or
one-ordered-rerun; new persisting signature = STOP) — all carried from v78
§2 verbatim. NEW:
**S76-1 (census lens):** an inventory claim is only as good as its lens —
shallow clones, head-truncated greps, and single-casing searches are
SAMPLING, not census; every census names its lens and the lens must be able
to see the whole population. (Fired twice in S76; both catches were AG's §0
re-verification working as designed.)
**S76-2 (retirement census):** retiring code/objects requires a LIVE-READ
census, not a name census; preserved fail-open postures get negative-control
tests; coupled-object decisions evaluate on the POST-retirement tree by a
deterministic rule.

## §3 · OPEN — post-tag block (board G, order standing; v1.1 gate)
1. **FLOOR-TENANT-SPLIT** (owner mandate, FIRST engineering item): platform
   repo carries ZERO tenant words; acceptance `grep -ri kale` over source =
   ZERO; tenant voice becomes deployment-time data asset.
2. **TENANT-CONSOLE-VISION** (artifact v1 in project): second product
   surface over the SAME gated services; ADR-012 = permission spec;
   activates with ADR-012 §6.
3. **BACKEND-LIFECYCLE-AFFORDANCE-1:** new backend join = ZERO repo commits;
   delete = ONE gated action with cascaded cleanup, audit preserved.
4. **RULE26-HARDEN-1** (from F-BW01 widening ×2): de-flake rule26
   structurally — pre-warm pages before assertions or make admin-preview
   survive a preview build; family signatures on record: dev-server
   30s-timeout class (`memory-1b :28/:71`, `rule26-admin :645`) + vite-
   error-overlay click-intercept (transform race, `api/admin/rules.ts?…`
   parsed as JS).

## §4 · OPEN FINDINGS / WATCH (full wording)
- **F-BW01 flake class** [register eye]: as v78 §4 + S76 widening #2 (the
  overlay-intercept signature above; three disciplined pass sequences on
  record: A7 PR rerun · B5 PR first-attempt green · seal master rerun).
- **KB-CLAIM-CONTRA-1** [watch]: model stated "only 2 params carry min+max"
  while its own Ek Not admitted Sıcaklık 1 has min 800/max 900 (true
  criterion was min+max+optimal). Collect recurrences.
- **SCOPE-TAIL-LENIENT-Q** [watch]: under b1_scope v4 the out-of-scope
  design tail of a mixed question was answered (domain-bound) rather than
  one-sentence-refused; binding criterion passed; residual risk small.
- **OEE-INJECT-FLIP-Q** [future decision]: `alwaysInject` flip awaits
  retrieval witnesses; never inside a content edit.
- **GOLDEN-CLAMP-1** [v1.1 golden-infra]: 500k per-pair clamp vs rep
  arithmetic; run-scoped `CWF_REPLAY_TOKEN_BUDGET=800000` disclosure-per-run
  is the sanctioned workaround.

## §5 · TEAM-SIDE (wait-contracted; RAG-TEAM-NOTES-v1)
- **RAG-SVC-INIT-RACE-1:** parallel calls → HTTP 400 "Server not
  initialized" + 60s connect timeouts; 3-attempt retry is our mitigation.
  VERIFY: one parallel-call re-run after the team ships; expiry: ask team
  "status?" if silent next session.
- **KB-TEST-RESIDUE-1:** structural test entities (Granit-Deneme,
  Mengil-Deneme, Örnek Fabrika 1) + foreign-domain demo corpus ("Ana
  Fabrika Ankara", CNC/HP-250T). Owed: cleanup plan + real-Kale doc load
  schedule. NOTE: FLOOR-TENANT-SPLIT's grep-zero will interact with any
  real-Kale corpus naming — corpus lives in DB (data asset), never repo.

## §6 · v1.1 QUEUE (by name)
MEASURE-1 design note (queue head) · WRITE-EXPOSURE-GENERIC-1 ·
CARD13-BUCKET-11-Q · SPECIMEN-F83-1 · F133-L5 → RECOVERY-1 sweep ·
STAGED-UNCLAIMED-2 (`bc324b0a` armes.tool_format_rule/getLineStopsReport ·
`a087cfa4` superset.resource_semantic/chart) · M-C re-run (action-space-
controlled) · R-1-ADMIN-SURFACE-1 (surface ADR-012 layer labels in admin
UI) · prior chain per v76. ~~B5~~ EXECUTED inside v1 (owner disposition;
§1). ENTITY-LIST-TOOL retirement rode B5 (arm 1) — no residual item.

## §7 · GOVERNED STATE (live-observed @ seal — re-derive, never memory)
master `39590e97dbe382c4f0b5a40531ed20a51bab1831` · tag `v1.0.0`
(`2b46d578…`) · docVersion **rev 175** · 7 sealed tabs · vitest **413
files / 4601** (CI arbiter) · **64 migrations** · remote branches: master
ONLY · prod `dpl_6dhb4j9ZjqCjMXFsRHd2N5vba9wL` READY on `4b55480` (the
notes commit will produce a successor deploy — next session's §0 fetches
the current id via list_deployments; docs-only, READY expected). DB:
`factory_registry` GONE · `backends.entity_list_tool` GONE ·
entity_registry factory layer 17 rows · backends 4 rows (armes ·
superset · machine-knowledge-base [unverified, bound+enabled, mirror 5
read-only tools] · system). Published: OEE v3 · b1_scope v4 (`a4a8a7fb`) ·
tools.rule.1/6 v2 · viz v4.1 · mkb tool_category `machine-knowledge`
(`13a8c0b4`). Routing: non-Anthropic path=semantic catSource=db ·
Anthropic full-set · `learn braked`. Secrets 3 · seam actor ksadmin.

## §8 · PREMISE CORRECTIONS LOGGED @ S76 (pattern ledger)
Architect: split relay (A7; S54-3) · structurally-impossible eval-canary
demand · guessed-path spot grep · head-truncated grep census
(factoryParamHint → nearly shipped a silent feature death; caught by AG) ·
shallow-clone branch census (46 branches invisible; caught by AG). The
recurring shape across ALL FIVE: sampling mistaken for census → minted as
law S76-1.
AG: "gate silently doesn't watch eval-gate code" overstated (coverage
existed) · "25 files" off-by-one. Positive patterns to keep: §0
re-verification fired correctly twice; false-zero discipline (D-2 row 7);
STOP-before-destructive (prune) with a content-safety derivation attached.

<!-- END · cwf-open-items-register-v79 -->
