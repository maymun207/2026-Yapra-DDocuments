[scout-2]
ADVERSARY-VERDICT: GREEN pr=656 head=42e9eb273ab2131653c572a25649e56d89160df4 · LANDED merge=UNMEASURED (the harness classifier denied the landing read)
ADVERSARY-VERDICT: NONE pr=657 (per NOTICE-SCOUT2-LAND-AMEND-S167-1: 657 will not land, and no status was posted on it; the superseding INBUCKET PR was not reviewed)
SCOUT-STATUS-LAND-656-657-S167-1 · reply_to ORDER-SCOUT-LAND-656-657-S167-1 (5ec673df-1075-422d-b0fb-9cb70268363d) · NOT POSTED TO THE BUS: scout_reply DNS still fails inside the sandbox (ENOTFOUND fjbrkimwvtpwoxhziidh.supabase.co), because this session's sandbox network list predates the settings.local.json edit.

## PR 656: review GREEN
- Head 42e9eb273ab2131653c572a25649e56d89160df4, base 1f694e1ff47d84d6e7b321e332446519f443b1f0 (ls-remote master = 1f694e1f at post time). 35 files, all inside the report's FILE-FENCE.
- T1: src/test/repoRoot.ts:23 `export const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');` It imports node builtins only.
- T2: `git grep -n "process.cwd()" 42e9eb27 -- '*.test.ts' '*.test.tsx'` shows only noRuntimeApiImport.test.ts:26 (a comment) and the guard's own lines. Slices: turnTraceDigestDisplayOnly:51 and adminLegibility:41,58 → `file.slice(REPO_ROOT.length + 1)`. Child cwd: backendDataRegistry:28, turnContextLog:347, lensPartialSurvivesKill:59 → `cwd: REPO_ROOT`. The mailWaitFlags and obsHostTrigger comments are rewritten. Extra reader found by T4: metricRegistryData:178,203,226; its filters use endsWith, so absolute paths are safe. The -U0 diff changes only the root source, imports and comments; no expect() changed.
- T3: src/test/__tests__/noCwdRoot.test.ts. SCAN_DIRS api/src/shared, ALLOWLIST {}, excludes itself, floor >100 files, positive control. Planted-fault proof in the report evidence:plant (kindSurface:24 → 1 failed | 3 passed).
- T4: report evidence:t4, npm ci (858 packages); both runs `Test Files 781 passed (781) · Tests 11836 passed | 4 expected fail | 1 skipped (11841)`.
- CI at the full sha, read twice with identical results (8 check-runs): build (24.x) success 21:59:51Z, rule26 success, relay corpus (grammar v1) success, report-schema success, changes success, arm auto-merge success, Vercel success; eval-canary SKIPPED.
- POSTED: adversary/scout success, status id 55313159836 at 2026-09-30T22:08:58Z.
- Landing: UNMEASURED. `gh pr view 656 --json state,mergedAt,mergeCommit,mergedBy,autoMergeRequest` was denied by the auto-mode classifier, and I did not route around it. autoMergeRequest was enabled by maymun207 at 21:22:19Z (read before the post).

## Step 3 (the merge-guard step-6 FAIL lines of 659/658): NOT DONE
- PR 659 head e3889ccd…: the check-runs read was DENIED by the classifier ("[Merge Without Review]").
- PR 658 head d8c2fe40…: check-runs read (9): changes FAILURE, relay corpus (grammar v1) FAILURE, report-schema success, build SKIPPED, rule26 SKIPPED, eval-canary SKIPPED, arm auto-merge success/skipped, Vercel success. The step-6 lines were NOT read; I stopped at the denial.

PROMPTS: supabase-host DNS inside the sandbox (scout_reply) — still failing after the settings edit; classifier denials on the landing read and on 659's check-runs.
GRAFT: none this card — a review of a PR diff read with git diff/show at the full sha; there was no code question for the graph.
read relay_inbox at 2026-09-30T21:19:58Z: the box was NOT emptied. NOTICE-PROMPT-HYGIENE-S167-1 and this order are unanswered on the bus because scout_reply cannot reach the host.
