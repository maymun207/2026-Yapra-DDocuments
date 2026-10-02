[scout-1]
READ-REDS: #673 = (a) author-branch defect (tenant-zero hits on literals the PR added; master is green on the same gate) · #675 = (b) guard refusal caused by sibling #673 (merge guard COLLISION, mergeGuard.mjs:532)
GRAFT: none run. These are CI-log reads; the code lines were read with `git grep` at master 648c61d6384942ab532444be252422ed9e37c02b (graft indexes the stale local clone).
PROMPTS: one. The job logs come from the sanctioned `gh api repos/maymun207/cwf_yaprak/actions/jobs/<id>/logs` (NOTICE-PROMPT-HYGIENE P3), whose redirect lands on productionresultssa17.blob.core.windows.net; that host was declared for those two commands. Annotations were tried first and carry only "Process completed with exit code 1".

SCOUT-STATUS-READ-REDS-673-675-S170-1 · reply to ORDER-SCOUT1-READ-REDS-673-675-S170-1 (id 3632852c-f103-4db7-a006-d1d6fb646d0c)
PRECONDITION: master = 648c61d6384942ab532444be252422ed9e37c02b. Heads unmoved: #673 61fbdb24276dffed21de448648b37f1d5aefd31a, #675 ea35131683201c4a6880937839852441852b02c2 (gh pr list). Open now: 673, 674, 675, 676, 677, 678.

## PR 673 — build (24.x) job 110260959158, step 8 "Tenant-zero gate"
```
[check:tenant-zero] positive control RED as required (planted hit detected, control file removed) — proceeding to the real scan.
[check:tenant-zero] [FAIL] 4 gated-vocabulary hit(s) in scope (2399 files scanned, 26 binaries skipped):
  api/cwf/__tests__/piiDetector.test.ts:193: for (const w of ['Demir', 'Çelik', 'Kaya', 'Bakır', 'Kurt', 'Aslan', 'Yıldız', 'Deniz', 'Kale']) expect(amb).toContain(w);
  api/cwf/_lib/knowledge/reference/piiNameLexiconSeeds.ts:51: names: ['Demir', 'Çelik', 'Kaya', 'Bakır', 'Kurt', 'Aslan', 'Yıldız', 'Deniz', 'Kale'],
  api/cwf/_lib/pii/piiCorpus.ts:207: ['Kale Usta pres ayarını yaptı.', 'Kale'],
  api/cwf/_lib/pii/piiCorpus.ts:220: 'Kale tipi kilit takıldı.',
##[error]Process completed with exit code 1.
```
- SILENT (skipped, not passing): step 9 Backend-name gate, step 10 Build, step 11 Run tests. The PR's tests and build have NOT been measured in CI.
- DISCRIMINATOR: every hit is a literal THIS PR added (all four paths are new in #673). The common token on all four lines is `Kale`, which is a gated tenant token (scripts/tenantZeroLens.ts:30 TENANT_ZERO_VOCABULARY). The other eight words in the list are not flagged.
- MASTER IS GREEN on the same gate: push run 36823301688 at 648c61d6384942ab532444be252422ed9e37c02b, build job step 8 "Tenant-zero gate" success (steps 9–11 success too). Not run LOCALLY at master: that needs a checkout of 648c61d6…, and the shared clone sits at an older commit that a scout does not move or write. The CI run of the same gate at the exact sha is the measurement used instead.
- CLASS: (a) a defect in the author's own branch.
- CAUSE DISCLOSED: my own PII pre-review (SCOUT-STATUS-PREREVIEW-PII-S170-1, A3) listed `Kale` among the plant-noun surnames the corpus must carry. That amendment collided with the tenant-zero gate. The fault is in my amendment as much as in the branch.
- REPAIR (AG-2): remove `Kale` from piiNameLexiconSeeds.ts:51, piiCorpus.ts:207 and :220, and piiDetector.test.ts:193. Replace it with a non-gated plant-noun surname (e.g. `Tuna` or `Akın`), and do NOT add any exemption to the tenant-zero vocabulary.

## PR 675 — changes job 110266239036, step 6 "Merge guard"
```
[merge-guard] pr #675 base 648c61d6384942ab532444be252422ed9e37c02b head ea35131683201c4a6880937839852441852b02c2 merge-base 648c61d6384942ab532444be252422ed9e37c02b
[merge-guard] CLEAN-MERGE: no in-branch merge in merge-base..head
[merge-guard] FENCE-GREW ok — head fence is held by the first fence, at ea35131683201c4a6880937839852441852b02c2
[merge-guard] timeline ok — 3 events, no reopen, no force-push
[merge-guard] COLLISION: 2 other open PR(s) against master (plant heads ignored)
[merge-guard] FAIL COLLISION — YIELDED-TO #673: #675 and #673 overlap on api/cwf/_lib/knowledge/reference/kinds.ts~api/cwf/_lib/knowledge/reference/kinds.ts, api/cwf/_lib/knowledge/selfSeedReconciler.ts~api/cwf/_lib/knowledge/selfSeedReconciler.ts, data/gates/backend-nam
[merge-guard] COLLISION ok against #674 — fences disjoint
[merge-guard] VERDICT RED — COLLISION
##[error]Process completed with exit code 1.
```
- Rule line: scripts/mergeGuard.mjs:532 `fail('COLLISION', \`YIELDED-TO #${p.number}: #${ctx.pr} and #${p.number} overlap on … ; the higher number yields\`)`. The log line is cut at 200 chars by my reader; the third overlap path begins `data/gates/backend-nam`, consistent with the Architect's data/gates/backend-names-baseline.json.
- SILENT (skipped): build, rule26. Nothing about 675's code has been measured in CI.
- CLASS: (b) a guard refusal caused by sibling open PR #673. The overlap is the guard's measured cause (the line above), no longer UNMEASURED.
- REPAIR (AG-1): no code edit now. After #673 lands (or is closed), `git merge origin/master` into phase/e2-registry-data-s170-1, resolve kinds.ts and selfSeedReconciler.ts by content, re-run `checkBackendNames --write-baseline` so the baseline reflects both PRs, and push. If #673 stays red for long, the Architect rules which yields.

## Note
#673 now blocks #675 twice: it is red, and the guard makes the higher number yield. Fixing #673's four `Kale` lines unblocks both.

read relay_inbox at 2026-10-01T07:45:36Z: this order was the only card.
