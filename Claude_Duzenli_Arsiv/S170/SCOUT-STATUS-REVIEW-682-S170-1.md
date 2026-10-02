[scout-1]
ADVERSARY-VERDICT: GREEN (code) pr=682 head=cd34fa3789b5fc34b73026e3143b759f776ad02a (still a draft; the report-only commit is not pushed yet) · WAITING-CI: build (24.x) and rule26 in_progress at the one read · no adversary/scout posted (this order forbids it)
GRAFT: none run (graft indexes the stale local clone). The diff was read with `git diff 7c5a715b…cd34fa37` / `git grep cd34fa37`; live rows via scripts/roQuery.ts (read-only).
PROMPTS: one. The guard log was read through the sanctioned `gh api …/actions/jobs/<id>/logs`, whose redirect host productionresultssa17.blob.core.windows.net was declared.

SCOUT-STATUS-REVIEW-682-S170-1 · reply to ORDER-SCOUT1-REVIEW-682-S170-1 (id 14c19b43-b3a6-48aa-b9b3-7b321bd4c709)
Reviewed head cd34fa3789b5fc34b73026e3143b759f776ad02a (1 commit, 17 files), base = master 7c5a715bb154af13751f027c309954b28288ebca (unchanged). If AG-1's report-only commit lands, only the report changes; re-check that its diff is report-only.

## Code review vs my A1–A7: GREEN
- A1 seam: kinds.ts `genericFamilyKindDefs(ids)` composes the six builders and KIND_REGISTRY now uses it for the static floor (same composition, so earlier pins hold). selfSeedReconciler: `activeBackendIds` = floor ∪ servingBackendIds(rows) minus system; an empty read or a throw → `source:'floor'` with a reason, logged `[Seed] backends source=…` every pass. `liveSeedDomains` adds the six family kinds ONLY for registry-only ids (not in KIND_REGISTRY), so a floor-only registry computes byte-identical domains and fingerprints. seedDomain resolves KIND_REGISTRY, then `dom.kindDefs`. getKindDef and KIND_REGISTRY stay static and no sync caller changed. The once-per-process gate is decided on static names BEFORE the registry read (no read per turn).
- A2: retired and system are excluded (tests: "a retired backend provisions nothing", "registry unreadable → exactly the static domains").
- A3 writers: memory-episodes.ts and router-proposals.ts call `resolveWriterKind(getKind, backend, family)`, where backend is the one parseBackend returned; absent → 422 `backend <id> declares no <family> family`; no fallback. archiveWriteBearingDraftsCore scans `familyKindId(backend, family)`. resolveToolCategories filters exposure rows on `familyKindId(r.backend_id, exposureAnnotationFamily)`. RECONCILE_BACKENDS is derived from the registry by `reconcileFamily: tool_graph_node`.
- §13.1: data/backends/index.json now carries FAMILY names only (writerFamilies, consoleFamilies, exposureAnnotationFamily, reconcileFamily); its 5 one-backend kind ids are gone. No backend id or display name in new code.
- 673 intact: kinds.ts keeps `SYSTEM_KIND_IDS.PII_NAME_LEXICON` (SOFT) in KIND_REGISTRY; selfSeedReconciler.ts:215 keeps `{ domain: 'system.pii_name_lexicon', … PII_NAME_LEXICON_SEEDS }`.
- A4 UI (§13.3): UsersTab lists the live `backends` from the admin store minus retired, falling back to BACKEND_IDS with a visible "Registry unread — showing the static list" note (never an empty picker). AdminPanel's category bridge uses `familyKindId(selectedBackendId, consoleFamilies…)` (selectedBackendId is the store's, AdminPanel.tsx:84), or no filter when none is selected.
- A7: registryKindFamilies.test.ts provisions the fixture's six rule_kinds and then accepts a `<fixture>.tool_category` draft through createDraft, with a CONTROL (no row → refused).
- Baseline: only `system` moves (code 937→927, tests 864→871) plus per-file lines. Every vendor id is unchanged; index.json is in K-G's exempt set (the registry), so removing its armes literals moves no count. I AGREE with the ruling: `system` is the platform's own id (nameGate.zeroExempt), so the tests rise from the new test file's fixture lines is not a §13.1 vendor rise.
- DIAGRAM-ATTEST (report :153-157): Architecture Map, Request Lifecycle, Governance Model and Agent Control Plane are true and specific. LLM Control Surface ("no … tool-exposure change") is TRUE ON TODAY'S DATA, measured: published tool_annotation rows exist only for armes (150, 44 write); every other backend's are drafts (honestbench 4, machine-knowledge-base 5, mount-probe 8, superset 8). The exposure read therefore yields the same map today. It will change, by design, when another backend publishes an annotation.
- Residual A6 named in the report (F-g): the floor seeders still iterate BACKEND_IDS.

## Findings (non-blocking)
F1. resolveWriterKind calls `RuleStoreRepository.getKind`, which discards the read error (RuleStoreRepository.ts:562-565 destructures only `data`). For a REGISTRY-ONLY backend, a failed kind read therefore 422s as "backend X declares no glossary_term family", which is a confident absence that was never measured (floor backends pass on the static getKindDef first). Paste-ready for a follow-up: "getKind returns {row} | {unread: reason}; resolveWriterKind answers 503 'kind registry unread' on unread, 422 only on a measured absence."
F2. The once-per-process gate means a backend registered AFTER a warm instance started gets its kinds at the next cold start, not at once. Acceptable and consistent with the fingerprint design; worth one line in the report.

## CI at cd34fa3789b5fc34b73026e3143b759f776ad02a (read once, not watched)
changes success, with merge guard lines:
```
[merge-guard] pr #682 base 7c5a715bb154af13751f027c309954b28288ebca head cd34fa3789b5fc34b73026e3143b759f776ad02a merge-base 7c5a715bb154af13751f027c309954b28288ebca
[merge-guard] CLEAN-MERGE: no in-branch merge in merge-base..head
[merge-guard] FENCE-GREW ok — head fence is held by the first fence, at cd34fa3789b5fc34b73026e3143b759f776ad02a
[merge-guard] timeline ok — 3 events, no reopen, no force-push
[merge-guard] COLLISION: 2 other open PR(s) against master (plant heads ignored)
[merge-guard] COLLISION ok against #680 — fences disjoint
[merge-guard] COLLISION ok against #681 — fences disjoint
[merge-guard] VERDICT GREEN
```
relay corpus success · report-schema success · Vercel success · build (24.x) IN_PROGRESS · rule26 IN_PROGRESS · SKIPPED: arm auto-merge (the PR is a draft), eval-canary.
WAITING-CI.
