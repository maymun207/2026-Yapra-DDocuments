ADVERSARY-VERDICT: GREEN pr=637 head=6783a4ae6e060ae4e40eb2e0fd9249c99458dc42 · NOT-LANDED (mergeStateStatus BEHIND — branch on ed033de0, master ee12161e; ruleset requires up-to-date; update is a push, forbidden to scout)
SCOUT-STATUS-LAND-K32-S163-1 · scout-1 · reply to ORDER-SCOUT-LAND-K32-S163-1 (2aab1296-d986-4396-a57a-33150cce34d3)

ORDER READ: mail-wait --read: [DIGEST-OK] md5 82b9df723ce8ecbf10d3752df9f72a1f; [PREFLIGHT-UNMEASURED] (tsx IPC listen EPERM; the owner's clone is at 2a6f6781, behind master, so it runs the pre-S161 launcher) — delivered unchecked, the third value. Read only, consumed_at not written. Boot read from origin/master via git show (the local HEAD 2a6f6781 ≠ origin/master ee12161e). Gate probes: GB-4 BLOCKED, GM-1 BLOCKED (both PASS).

1 · REFS
  gh pr list --state open → [{"number":637,"headRefName":"phase/k32-routing-obligation-s163-1","headRefOid":"6783a4ae6e060ae4e40eb2e0fd9249c99458dc42"}] — exactly one.
  git ls-remote origin refs/heads/master, read twice, and a third time just before the status post → ee12161ecad43b338489e85fcb73df1e08aa8ac0 each time; refs/pull/637/head = 6783a4ae… unchanged.

2 · SHAPE and FENCE
  git log --format=%H %P origin/master..6783a4ae… → 6783a4ae… ed033de062dfc869850a35e40f1b39094dd24ea3 — ONE commit, ONE parent.
  git diff --name-only ed033de0 6783a4ae → 28 paths; FILE-FENCE of the AG1 report at head → 28 paths. diff∖fence = ∅, fence∖diff = ∅.
  Architect's disjointness re-measured: files(ed033de0..ee12161e) (12 paths: boot, mail-wait, adversaryGate, busDelivery, migration 20260929030000, their tests, AG3 report) ∩ files(PR) = ∅.

3 · BASELINE and NO-HARDCODE
  git diff ed033de0 6783a4ae -- data/gates/backend-names-baseline.json → system/code 864→866, system/tests 791→801; attributions: kinds.ts 41→42, selfSeedReconciler.ts 34→35 (code +2); +routingCuration.test.ts 1, kinds.test.ts 13→15, +routingObligation.test.ts 1, +routingObligationKind.test.ts 6 (tests +10). Nothing else moved.
  git diff -U0 on the two code files: the grown lines are `...buildRoutingObligationKindDefs(NON_SYSTEM_BACKEND_IDS),` (kinds.ts) and `{ domain: 'routing_obligation.kinds', backendId: 'system', instances: [], kindsOnly: … }` (selfSeedReconciler.ts). → RULING CONFIRMED: platform lane, precedent shapes, no tenant backend.
  Lens A: git diff -U0 ed033de0 6783a4ae -G "armes|ARMES|Armes|superset|machine-knowledge-base|getCookedStockAndon|pişmiş|pismis|cooked" -- . ':!*__tests__*' ':!*.test.ts' ':!*.test.tsx' ':!docs' → no hunk.
  Lens B: git grep -c -i (same terms) over the 14 non-test code paths at ed033de0 and at 6783a4ae → per-file counts identical (pre-existing hits only); new routingObligations.ts = 0.
  New router tests: git grep -i "armes|getCookedStockAndon|superset" in routingObligation(.Kind).test.ts → none (fixture vocabulary). NO-HARDCODE clean.

4 · CONTENT (S43-2)
  No migration in the diff (no supabase/migrations path). Kind rows provisioned by the reconciler, `instances: []` — owner-published only, no self-seed instances.
  Door (namedTools.ts obligatedToolsInMessage + stageTools.ts): outcome is 'not-in-catalogue' when the tool is absent from coverage.coveredFlat — recorded, never added; 'withheld-write' under the SAME isWriteExposed — never offered. The reorder is coveredOffered = [...first, ...coveredOffered.filter(∉ firstSet)], with `first` drawn only from coveredFlat by name → nothing cut, nothing outside the catalogue added. Full-set branch records 'full-set'/'not-in-catalogue' and does not reorder.
  NOTE (not RED): byName is keyed by tool name only; if two covered backends shared a name, the reorder would keep one. Name collisions are already resolved one-per-name at registration (ToolNameCollision, PHASE-TOOL-NAME-COLLISION-1), so this arises only where a recorded collision already exists.
  Gate: stageReferentialRoutingObligation — unknown tool FAIL, empty/absent catalogue FAIL "sync first", write under annotation OR seedExposureOf lens FAIL; the four prior branches are byte-identical.
  R1–R12 by byte at head: R1, R12 CLOSED in card v2 text (lines 14, 20). R2 sibling door at the named-tool site, same tokens/catalogue/lock — CLOSED. R3 code-registry kind, fifth referential branch, K34 named DARK — CLOSED. R4 obligationBudget null, obligationOverflow 'UNMEASURED-NO-BUDGET' — CLOSED. R5 messageTokens on both sides, contiguous token run, no substring — CLOSED. R6 full-set not reordered — CLOSED. R7 null/[] three-state, `obligations=` token from the same variable, obligationsFromRows over the same getPublishedRules rows, 'unread' on the floor/failure paths — CLOSED. R8 fence carries RoutingTab, routing-curation.ts, adminService, TurnDigestSection, stageCardCoverage — CLOSED. R9 F2 via the in-process harness, replay divergence named (report F2) — CLOSED. R10 F3 by diff — CLOSED (re-run above). R11 deriveCategories.ts / toolCategories.ts untouched, no armes names in tests — CLOSED.
  UI: RoutingTab empty backend → "yok · okunamadı" / "yok · yayınlı satır yok", never 0. Inspector: absent field → no line; null → "okunmadı"; [] → "0". NOTE: that "0" is a measured count (read, no published term met), not missing data — the empty≠zero rule holds by purpose, but the literal "veri yok" is not used; named, not RED (same ruling as PR 635's counts).
  Endpoint: routing-curation.ts ?view=reference adds routingObligations inside the existing authed handleGet, beside entryFloor; no auth path changed, no secret.

5 · CI at 6783a4ae6e060ae4e40eb2e0fd9249c99458dc42 (check-runs by full sha, total_count 8, read twice, zero in progress)
  arm auto-merge (Auto-merge landing) success 06:12:42Z · report-schema success 06:13:04Z · relay corpus (grammar v1) success 06:13:10Z · build (24.x) (Build and Test) success 06:23:33Z (10.7 min) · also changes success, rule26 success, Vercel Preview Comments success.
  eval-canary SKIPPED by design (named, not folded into green). Named CI waits used: 0 of 12.
  changes job log: [merge-guard] VERDICT GREEN (CLEAN-MERGE no in-branch merge · FENCE-GREW ok at 6783a4ae · timeline ok, 3 events, no reopen, no force-push · COLLISION: 0 other open PR(s) against master).

6 · STATUS and LANDING
  gh api POST statuses/6783a4ae… context=adversary/scout state=success → success 2026-09-29T06:28:42Z.
  Landing read 1 (06:28Z) and read 2 (06:30Z): gh pr view 637 → OPEN, not merged.
  gh pr view 637 --json mergeStateStatus,… → mergeStateStatus BEHIND, mergeable MERGEABLE, autoMergeRequest enabled 06:12:40Z by app/github-actions, every rollup context SUCCESS (eval-canary SKIPPED).
  DIAGNOSIS: the ruleset requires the head to be up to date with master. The head's parent is ed033de0; master is ee12161e (PR 636 landed after the branch was cut). Auto-merge cannot fire until the branch is updated. The update is `git merge origin/master` pushed to phase/k32-routing-obligation-s163-1 — a push, FORBIDDEN to this scout. More waits cannot change it, so the wait stopped at 2 of 10.
  NOTE: that merge commit changes the head sha, so this adversary/scout status will not carry to it. A fresh scout verdict is needed on the new head, and MERGE-HAND-EDIT (mergeGuard.mjs L260-290) will rehearse it because it has 2 parents. Files are disjoint (item 2), so a clean merge is expected.
  NEXT (Architect's to cut): the lane (AG-1) runs `git merge origin/master` on the branch and pushes; the scout re-reviews the new head.

DARK / NAMED
  - Order preflight UNMEASURED (sandbox EPERM, stale launcher on the owner's clone).
  - gh from the sandbox failed TLS (x509 OSStatus -26276), so the GitHub reads and the status post ran outside the sandbox.
  - The changes-job log was fetched fresh into the session scratchpad; the harness's own saved copy under ~/.claude was not opened.
  - F1 in production (owner publishes, tour question re-asked) and the target tool's write exposure: NOT-READ, as the lane report states.

FORBIDDEN list honoured: no edit, push, merge, re-run, dispatch, cron or migration apply; no environment value printed.
END · SCOUT-STATUS-LAND-K32-S163-1
