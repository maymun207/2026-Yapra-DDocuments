[scout-1]
ADVERSARY-VERDICT: RED card=CARD-E2-REGISTRY-DATA-S170-1-v1
GRAFT: graft callers getKindDef (32 callers; sync production callers listed below). graft indexes the stale local clone, so every line was confirmed at master 648c61d6384942ab532444be252422ed9e37c02b with `git grep`/`git show`. The live facts were read through scripts/roQuery.ts (read-only).
PROMPTS: none.

SCOUT-STATUS-PREREVIEW-E2-REGISTRY-S170-1 · reply to ORDER-SCOUT-PREREVIEW-E2-REGISTRY-S170-1 (id 4e95d30b-4091-439d-9652-561e6093d270)
PRECONDITION master = 648c61d6384942ab532444be252422ed9e37c02b: HOLDS.

## 1 · Card claims vs master and live
- HOLDS: kinds.ts:554, :557-631 (KIND_REGISTRY, a module-load const), :633 (sync getKindDef). The six writer-target consumer lines and index.json are as quoted.
- LIVE public.backends: armes, honestbench, machine-knowledge-base, mount-probe, superset (gateway), system are active; armes-new is retired. LIVE rule_kinds: every active non-system backend already holds the 6 generic families (tool_doc, gateway_tool_policy, tool_category, metric_registry, routing_obligation, tool_annotation). armes has 15 rows and superset 13 (declared + hand-written).
- The card MISSES the actual seam. governance.ts:91-106 resolveKindDef PREFERS the DB rule_kinds row and falls back to getKindDef only when the row is absent. Those rows are provisioned by selfSeedReconciler.seedDomain (:276-291, absence-only), from `kindsOnly` lists that are KIND_REGISTRY filters computed at MODULE LOAD (:156, :168, :177, :189, :209, :216). A registered backend fails createDraft because no reconciler domain ever names its kinds, so no rule_kinds row exists (domain_rules.kind_id FK) and getKindDef has no fallback.
- DEFECT CONFIRMED (R3): router-proposals.ts:151/:184 and memory-episodes.ts:~234/:264-266 take `backend` from the request (parseBackend + ensureBackendScope) but always author kindId `armes.*`. A superset accept writes kind armes.tool_category under backendId superset.

## 2 · Seam (ONE): the self-seed reconciler + a pure family minter
Choose this, not an async getKindDef:
(i) a PURE `genericFamilyKindDefs(backendIds)` = the six existing builders (buildToolDocKindDefs … buildToolAnnotationKindDefs), already pure over an id list;
(ii) the reconciler (already async, already the rule_kinds writer) computes its six `kindsOnly` lists AT RUN TIME from `activeBackendIds()`, which reads RuleStoreRepository.getBackends — the adminGuard.ts:55-84 precedent: union with the floor on read, floor-only on error, stamped;
(iii) seedDomain's `getKindDef(kindId)` (:281) is replaced by a lookup over KIND_REGISTRY ∪ genericFamilyKindDefs(activeIds).
The fingerprint (referenceFingerprint over kindsOnly) changes when a backend is added, so the next boot claims and provisions it, and nothing else.
After that, createDraft, the kinds admin route (api/admin/kinds.ts:86 is DB-first) and the Rules UI all work from DB rows with ZERO sync-caller change.
The sync fallback stays the static floor. Sync getKindDef callers: kind-drafts.ts:33, admin/kinds.ts:56, rollouts.ts:79, governance.ts:106, DbKnowledgeProvider.ts:282, selfSeedReconciler.ts:281, tenantPayloadLoader.ts:71, kaExam.exam.ts:140. Only :281 changes.

## 3 · Consumers the card forgets (12.6 / 13.3)
- UI: src/components/admin/UsersTab.tsx:329 renders the backend picker from `BACKEND_IDS.map`, which is the static file and is not R1-compliant. AdminPanel.tsx:656 is named, but the "selected backend" it should follow needs a source.
- Floor-list seeders: resolveToolCategories.ts:157, resolveMetricRegistry.ts:227/:229, llmScanBaseline.ts:188 (`BACKEND_IDS.filter(≠system)`). genArchitectureFacts.ts:252.
- declaredKindDefs (kinds.ts:298) is per data file (data/backends/armes, machine-knowledge-base only). A registry-only backend gets the 6 GENERIC families and never glossary_term or zone. So R3's memoryPromote for honestbench must REFUSE ("backend declares no glossary_term family"), not mint.
- Tests that read the index shape: memoryEpisodes.test.ts:102, routerProposals.test.ts:100, archiveWriteBearingDrafts.test.ts:20 (BACKEND_INDEX.writerKinds.*), shared/backendData.ts:28-40 (the type) and data/backends/registry.ts (validation).
- Pins that must stay green UNTOUCHED (the floor list is not edited): systemLane.test.ts:77-80 and backendDataRegistry.test.ts:67-69 (BACKEND_IDS hash), kinds.test.ts:99/:194/:240/:287 (counts over BACKEND_IDS), referencePoolIsComplete.test.ts (walks static KIND_REGISTRY). backendIdentityIsData.test.ts:220-250 already has REGISTRY_ONLY_FIXTURE, which is the right fixture for R4(a).
- K-G gate (scripts/checkBackendNames.ts:10-16) counts every index id in EVERY corpus file including index.json, and "a fall is red too, until the same pull request rewrites the baseline with --write-baseline". R4(d)'s drop therefore turns CI RED unless data/gates/backend-names-baseline.json is rewritten in the same PR.

## AMENDMENTS (paste VERBATIM):
A1. SEAM: kind families for registered backends reach the DB through the self-seed reconciler, not through an async getKindDef. Export a pure `genericFamilyKindDefs(backendIds)` composed of the six existing builders. selfSeedReconciler computes the six `kindsOnly` lists at run time from `activeBackendIds()` (RuleStoreRepository.getBackends, lifecycle='active', system excluded; union with BACKEND_IDS on read; floor-only on error, stamped `source: 'floor'` in the seed log/health), and seedDomain (selfSeedReconciler.ts:281) resolves a kind via KIND_REGISTRY ∪ genericFamilyKindDefs(activeIds). getKindDef and KIND_REGISTRY stay static (the floor); no sync caller becomes async.
A2. A retired or disabled backend is excluded from activeBackendIds(); test with armes-new-shaped data (lifecycle='retired') → no kinds provisioned. The registry-unreadable test asserts floor-only provisioning plus the 'floor' stamp.
A3. R3 derives every writer kind from the item's backend, never a literal: router-proposals.ts:184 and memory-episodes.ts:264 author `${backend}.<family>` with the backend parseBackend already returned. If that kind is absent (no rule_kinds row and no static def, e.g. glossary_term for a registry-only backend), refuse 422 naming "backend <id> declares no <family> family". index.json writerKinds/consoleKinds/exposureAnnotationKind become FAMILY names; reconcileBackends becomes "every active backend whose kinds include the family". archiveWriteBearingDraftsCore.ts:85 matches isToolCategoryKind(kind_id); resolveToolCategories.ts:199 matches isToolAnnotationKindId over the backends in scope.
A4. UI (13.3): UsersTab.tsx:329's backend picker and AdminPanel.tsx:656's category filter read the live backends list (the existing admin backends endpoint), and the filter follows the selected backend. The report lists both, plus any static list still left on screen.
A5. FENCE adds: shared/backendData.ts, data/backends/index.json, data/backends/registry.ts (if it validates the shape), data/gates/backend-names-baseline.json (rewritten with `--write-baseline` in the SAME PR; print before/after per id), the three tests reading BACKEND_INDEX.writerKinds, UsersTab.tsx, AdminPanel.tsx. BACKEND_IDS (index.json `ids`) is NOT edited: systemLane.test.ts:77-80 and backendDataRegistry.test.ts:67-69 pin its hash.
A6. Out of scope, named in the report as residual: the floor seeders resolveToolCategories.ts:157, resolveMetricRegistry.ts:227/:229, llmScanBaseline.ts:188 and genArchitectureFacts.ts:252 still iterate BACKEND_IDS.
A7. R4(a) uses REGISTRY_ONLY_FIXTURE (backendIdentityIsData.test.ts) through a repository double: the reconciler provisions its six generic kind rows, and RuleGovernanceService.createDraft accepts a `<fixture>.tool_category` draft against that double. MIGRATION: none (rule_kinds and backends exist; provisioning is absence-only).
END-AMENDMENTS
