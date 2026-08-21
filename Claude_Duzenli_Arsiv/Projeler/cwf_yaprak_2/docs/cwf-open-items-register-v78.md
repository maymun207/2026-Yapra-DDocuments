# CWF — Open Items Register · v78
<!-- cwf-open-items-register-v78 · 2026-08-02 · closes A7 (mid-S76 update;
     supersedes v77). Derives from cwf-work-board-S74-v1 (R-BOARD: items enter
     by name only; board structure never re-opened). Self-sufficient per S63-2. -->

## §1 · CLOSED @ S76 (A7) — never re-raise
**A7 · B6-MIN-DOCS CLOSED@evidence.** Merge `6350844e64e2d3f5e78bdc2a0ac720e32275fb83`
(--no-ff, parents `45dec96b` + `f8be5b7`; message Architect-verbatim via -F).
Branch: 7 commits, 17 files, docs + drift-gate config only; forbidden surfaces 0.
- **G1 · ADR-012 landed:** `docs/adr/ADR-012-restriction-taxonomy-and-capability-posture.md`
  = 12-line landing header + v1 body BYTE-VERBATIM (sha256 `446309de3c8a…3c17a`,
  13279 B — Architect re-hashed at branch AND at merged master). `Status:
  PROPOSED` untouched (S37-1); ratification facts (S72 close, v74 §8) recorded
  outside the artifact. ADR-012 citable as a repo document from `6350844e`.
- **G2 · D-2:** `docs/delegation-policy.md` (130 lines) — human-delegation
  policy as a documented object; 17 enforcement rows, every claim grep-anchored
  (22 `.ts` site citations). One false-zero caught and corrected in-phase:
  `user_backend_scopes` read lives in `resolveActiveBackends.ts`, not
  `scopeTools.ts` (fixed `f8be5b7` pre-hand-back).
- **G3 · D-3:** autonomy posture named in ARCHITECTURE.md + cross-ref in D-2 —
  "Level-3 autonomy with gated Level-4 capabilities" (RR-1/RR-2/RR-3 doors per
  ADR-012 §5); deliberately staged, not unfinished.
- **G4 · R-1 retrofit DONE (definition-site scope):** ADR-001…011 each carry an
  append-only `## ADR-012 layer label (R-1 retrofit, S76)` section copied from
  §4's ratified sweep; ADR-005/006 carry the scope-guard sentence + `PROCESS
  (unclassified by ADR-012 §4 scope guard)`. All 11 original bodies
  byte-identical — AG pre/post compare with corrupted-copy positive control,
  independently re-proven by Architect head-N cmp (11/11 IDENTICAL).
  Admin-UI surfacing of labels = the NAMED later refinement (not closed).
- **G5 · STAGE-CARD-DRIFT-1 CLOSED@evidence:** manifest tab "Stage Cards"
  (diagram = `src/components/admin/stagesRegistry.ts`; codeAreas =
  `api/cwf/_lib/turn/**` + `api/cwf/chat.ts`; 21 mapped files; seal
  `1f0ca2fbe1f8`). Zero engine changes (gate never opens the diagram file —
  `.ts` diagram needed no generalization); six pre-existing seals
  byte-identical. Positive control proven THREE times (AG worktree · Architect
  at branch · Architect at merged master): turn/** touch → `[FAIL] … Stage
  Cards`, revert → `[OK] all 7 narrative tabs synced`. Card reconcile: zero
  factual staleness, zero card edits; 21/21 codePaths exist; numerics verified
  (20 segments · topK floor 3 clamp [0,8] · ttlDays 90 · 3 quota values ·
  router dark). `src/components/**` stays UNMAPPED by design: the registry is
  the diagram; card-text-only edits follow C-13.
- **ADDENDUM-1 · EVALGATE-DEADGLOB CLOSED@evidence:** dead
  `api/cwf/_lib/evalGate/**` removed from Governance Model codeAreas;
  `mappedContentSha` `d359bcd358ca…` byte-identical across three records —
  proof the glob contributed nothing. Coverage NEVER had a hole: real gate
  files (`knowledge/gate/evalGate.ts`, `knowledge/governance.ts`) sit inside
  the same tab's `knowledge/**`. Severity honestly downgraded from AG's
  "unwatched" claim: hygiene + misleading lens, not blindness.
- **G6:** docVersion **173 → 174** (one bump for the whole phase); KB
  generalization 6→7 tabs; CHANGELOG entry.
- **CI (STEP 1):** run `30729627483` attempt 2 = completed/success (build 20.x
  · 22.x · coverage · rule26 all success; eval-canary skipped = structural PR
  spend-fence state — see §2 amendment). PR #133 was CI-trigger only; the
  GitHub button was never used.
- **Proof read (Architect, fresh clone at `6350844e`):** ADR-012 + D-2 present
  · body hash re-verified · rev 174 · 7 tabs · dead glob gone · gate [OK] ·
  positive control re-run green · 415 test files, zero delta.

## §2 · LAWS + STANDING AMENDMENTS (chain unchanged, plus:)
**S75-1** (job file proven only when the seam's own loader swallowed it; green
`plan` pre-merge) and **WRITE-EXPOSURE** standing rule carry forward verbatim
from v77 §2.
**CI-arbiter amendment (S76, Architect premise error owned):** on
`pull_request` runs the arbiter = build(20.x)+build(22.x)+coverage;
**eval-canary skipped is the CORRECT structural state** (spend fence `if:`
gate; precedents `30713408192`, `30708856416`). Never treat PR-run
eval-canary:skipped as a red.
**Flake discipline (S76, applied):** rule26 red with a signature ABSENT from
the clean-anchor run = NEW red → ONE ordered rerun (cap one, justification on
record: branch provably cannot alter the rendered code) → green passes;
second red escalates to clean-anchor worktree repro. No retry-shopping.

## §3 · OPEN — v1 path (board B, order binding)
1. **A8 · B7 tag** (gate: A7 ✅ — open NOW): release notes · branch pruning ·
   full recount (fresh clone; test files/tests; migration count; drift [OK]) ·
   **B5 / `factory_registry` drop address: disposition NAMED BY OWNER at tag
   time** (drop now vs named v1.1 deferral) · tag + closure artifacts
   (register v79 · KB · bootstrap).

## §4 · OPEN FINDINGS / WATCH (full wording, self-sufficient)
- **F-BW01 flake class** [register eye — WIDENED @ S76 with evidence]:
  (i) original: AdminPanel Set-Context tab-switch red under vite-error-overlay,
  node-20 only, first seen PR #131; (ii) rule26 job class: anchor run
  `30715042991` (clean master `45dec96b`) failed
  `memory-1b-evidence.spec.ts:28:9` (chip toHaveCount(3)→0 @1024); PR run
  `30729627483` attempt 1 failed `memory-1b-evidence.spec.ts:71:5`
  (scrollIntoViewIfNeeded 30s timeout @1280); BOTH runs carried
  `rule26-admin.spec.ts:645:5` @1024 click-timeout as retry-recovered flaky;
  BOTH carried identical `[vite] Internal server error: Transform failed …
  'from' expected` dev-server noise adjacent to the timeouts — the plausible
  common cause. Attempt 2 fully green. Root structural cause (read from
  config): rule26 must run against a LIVE `npm run dev` server because `vite
  preview` tree-shakes `/dev/admin-preview` to 404 → JIT-compile latency under
  CI load hits 30s action caps; ~48 timing-dependent tests concentrated in one
  job. **Named post-tag hardening candidate** (pre-warm pages before assert,
  or make admin-preview survive a preview build); never a v1 gate.
- **KB-CLAIM-CONTRA-1** [watch]: model stated "only 2 params carry min+max"
  while its own Ek Not admitted Sıcaklık 1 has min 800/max 900 (true criterion
  was min+max+optimal). Collect recurrences; no deterministic fix.
- **SCOPE-TAIL-LENIENT-Q** [watch, S75]: under b1_scope v4 the out-of-scope
  design tail of a mixed question was ANSWERED (domain-bound content) rather
  than one-sentence-refused. Binding criterion (no total refusal) passed;
  over-inclusion within domain bounds is the residual, far smaller risk.
- **OEE-INJECT-FLIP-Q** [future decision]: `alwaysInject` flip for OEE awaits
  retrieval witnesses; never inside a content edit.
- **GOLDEN-CLAMP-1** [v1.1 golden-infra]: 500k per-pair clamp vs rep
  arithmetic; run-scoped `CWF_REPLAY_TOKEN_BUDGET=800000` disclosure-per-run
  is the sanctioned workaround.
- **MASTER-RUN-30730054599** [one-shot check, folded into A8 pre-flight]: the
  merge push auto-triggered this run on `6350844e`; in progress at A7 close.
  A8's §0 must report its conclusion (rule26 red there would be the known
  F-BW01 class — record, don't gate).

## §5 · TEAM-SIDE (wait-contracted; relayed via RAG-TEAM-NOTES-v1)
- **RAG-SVC-INIT-RACE-1:** parallel calls → HTTP 400 "Server not initialized"
  + 60s connect timeouts; our 3-attempt retry is the mitigation. VERIFY: one
  parallel-call re-run after the team ships; expiry: ask team "status?" if
  silent next session.
- **KB-TEST-RESIDUE-1:** structural test entities (Granit-Deneme,
  Mengil-Deneme, Örnek Fabrika 1) + entire doc corpus is foreign-domain demo
  ("Ana Fabrika Ankara", CNC/HP-250T). Owed: cleanup plan + real-Kale doc
  load schedule.

## §6 · v1.1 QUEUE (by name; unchanged set + one add)
WRITE-EXPOSURE-GENERIC-1 · CARD13-BUCKET-11-Q · SPECIMEN-F83-1 ·
F133-L5 → RECOVERY-1 sweep · STAGED-UNCLAIMED-2 (`bc324b0a`
armes.tool_format_rule/getLineStopsReport · `a087cfa4`
superset.resource_semantic/chart) · M-C re-run · B5 (unless owner drops at
tag) · prior chain per v76. **Add (S76): R-1-ADMIN-SURFACE-1** — surface the
ADR-012 layer labels in the admin UI (the named later refinement of G4).

## §7 · POST-TAG BLOCK (unchanged from v77, order standing)
- **FLOOR-TENANT-SPLIT** (first engineering item post-tag): platform repo
  carries ZERO tenant words; acceptance: `grep -ri kale` over source = ZERO.
- **TENANT-CONSOLE-VISION** (artifact v1 in project): tenant console = second
  product surface over the SAME gated services; ADR-012 = permission spec;
  activates with ADR-012 §6.
- **BACKEND-LIFECYCLE-AFFORDANCE-1:** acceptance — new backend join = ZERO
  repo commits (row + pack-data + categories via admin/gate surfaces); delete
  = ONE gated action with cascaded cleanup, audit preserved.
- **RULE26-HARDEN-1** (add, S76, from F-BW01 widening): de-flake the rule26
  job structurally (pre-warm or preview-buildable admin-preview).

## §8 · GOVERNED STATE (live-observed @ A7 close — re-derive, never memory)
master `6350844e64e2d3f5e78bdc2a0ac720e32275fb83` (Merge PHASE-A7-B6-MIN-DOCS-1)
· docVersion **rev 174** · manifest **7 tabs** (+Stage Cards, seal
`1f0ca2fbe1f8`; Governance Model sha `d359bcd358ca…` unchanged, dead glob
gone) · vitest **415 files / 4620** (CI arbiter; run `30729627483` att.2
green) · prod deploy for `6350844e` NOT yet confirmed — A8 §0 fetches the new
`deploymentId` via list_deployments before any log read (docs-only change;
READY expected). Published state unchanged from v77 §8: OEE v3 · b1_scope v4
(`a4a8a7fb`) · tools.rule.1/6 v2 · viz v4.1 · mkb tool_category
`machine-knowledge` (`13a8c0b4`) · backends 4 rows (mkb unverified,
bound+enabled, mirror 5 read-only tools) · routing non-Anthropic
path=semantic catSource=db, Anthropic full-set, `learn braked` · secrets 3 ·
seam actor ksadmin.

## §9 · PREMISE CORRECTIONS LOGGED @ S76 (pattern ledger)
Architect: split the A7 relay into prompt + un-relayed artifact (S54-3
violation — caused AG's correct BLOCK; remedied by embedding the body in the
relay with sha) · demanded eval-canary success on a PR run (structurally
impossible; amended §2) · spot-check grepped a guessed path
(`api/cwf/_lib/mcpSecrets.ts`) while D-2's own citation
(`shared/mcpSecrets.ts:23`) was exact.
AG: "gate silently doesn't watch the eval-gate code" — overstated; coverage
existed via `knowledge/**` (Architect downgrade accepted in ADDENDUM-1).
Positive pattern to keep: AG's false-zero discipline (D-2 row 7) and
STOP-on-unrelayed-artifact were both correct-by-law.

<!-- END · cwf-open-items-register-v78 -->
