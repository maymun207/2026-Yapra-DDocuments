NEW-PR: #634 head=46a7b124a32c0ef31bf2e40864458754c0ecd191

SLIP-PR631-FRESH-BRANCH-S163-1 · AG-1 · answers NOTICE-PR631-FRESH-BRANCH-S163-1 (id 27d2260c-2b51-4175-bc36-32895ef3074c, md5 479d44ac8027e0a3976fa0d7212939ce, DIGEST-OK)

PRECONDITION
- git ls-remote origin refs/heads/master, read twice: 3d2f06a58c708cfc0c7f06fe9dac62c45a118cbd both times (equals the card's).
- Shared clone: ` M .claude/settings.json` (named, not discarded). The work was done in a worktree at scratchpad/wt-ag1, so the shared clone was not touched.
- Card preflight: PREFLIGHT-UNMEASURED (master's mail-wait still spawns `npx tsx` → listen EPERM; this PR removes that spawn). The card was delivered unchecked; this is the third value, not a pass.
- consumed_at: NOT written (STAMP-OPEN-NAMED, ENOTFOUND on the pooler, master's transport; this PR carries the proxy-aware transport).

STEP 1 — cherry-pick
- Branch phase/lane-sandbox-allowances-s163-4 from origin/master. `git worktree add -b` created the branch, then failed to write the upstream config: `could not lock config file .git/config: Operation not permitted` (F6, same as S161). The worktree was attached with `git worktree add <path> <branch>`.
- `git cherry-pick b2ebe011…` → CONFLICT (content) in package.json ONLY. Every other path applied cleanly (status: 7 paths staged M/A, `UU package.json`).
- Resolution: a pure adjacency. HEAD (633) added `"exam:ka"` above the seven keys that b2ebe011 rewrites to `node --import tsx` (check:ground, census, claim:roster, env:presence, card:preflight, land, land:selftest). Kept `exam:ka` plus 631's seven rewritten lines; no key dropped.

STEP 2 — proofs
- git log --format='%H %P' origin/master..HEAD →
  46a7b124a32c0ef31bf2e40864458754c0ecd191 3d2f06a58c708cfc0c7f06fe9dac62c45a118cbd   (ONE commit, ONE parent = master)
- git diff --name-only origin/master → .claude/settings.json · api/cwf/__tests__/laneWriteTransport.test.ts · docs/ops/LANE-SANDBOX.md · docs/relay/LANE-SANDBOX-ALLOWANCES-S161-1-AG1-report.md · package.json · scripts/checkGroundTruth.ts · scripts/laneWrite.mjs · scripts/mail-wait.mjs   (exactly the 8)
- git diff --stat b2ebe011 -- <the 7 non-package.json paths> → `docs/relay/LANE-SANDBOX-ALLOWANCES-S161-1-AG1-report.md | 1 +`. Six paths are EMPTY. The report differs by exactly the one FRESH-BRANCH line that step 2 ordered amended in. It is not reported as empty.
- package.json: `JSON.parse OK; scripts before=42 after=42 missing=[]`. The 17 changed values are exactly the tsx-CLI list in the report's evidence:tsx (gen:arch-facts … land:selftest), so 633's exam:ka and check:backend-names are intact.
- Report line, inside the existing evidence:fresh-branch fence of the Landing section, amended into the single commit:
  FRESH-BRANCH: phase/lane-sandbox-allowances-s163-4 cherry-picked from b2ebe011 onto master 3d2f06a58c708cfc0c7f06fe9dac62c45a118cbd; supersedes PR 631 (closed by serial-close ruling)
- relayAudit: [relay-audit] [OK] 1 file(s) audited, zero violations   (kind=report grammar v1)

STEP 3 — gates (sandboxed, cwd = worktree, node_modules symlinked from the main clone)
- npm run build → [check:doc-drift] [OK] no drift -- all 7 narrative tabs synced (mode=worktree).
  (tsc -b OK · typecheck:api OK · gen:arch-facts "left unchanged docs/ground/facts.json" · check:ground GREEN, regeneration identity MATCH · vite build OK)
- npm run typecheck:api → `tsc -p tsconfig.api.json && tsc -p tsconfig.api.test.json`, exit 0, no diagnostics (tsc prints nothing on success)
- npm run check:backend-names → [check:backend-names] [OK] every (id, class) count equals data/gates/backend-names-baseline.json.  (SUMMARY verdict 0)
- git status --porcelain -uall after the gates: empty.

STEP 4 — push + PR
- git push origin phase/lane-sandbox-allowances-s163-4 → `* [new branch]`. Pushed without -u, because the upstream write to .git/config is refused in the sandbox (F6); the push is unaffected.
- git ls-remote origin refs/heads/phase/lane-sandbox-allowances-s163-4 → 46a7b124a32c0ef31bf2e40864458754c0ecd191
- PR #634 https://github.com/maymun207/cwf_yaprak/pull/634, non-draft, title as ordered. Auto-merge is armed by .github/workflows/auto-merge.yml (the "arm auto-merge" job), as on the earlier PRs; no window ran a merge or arm verb.
- gh runs outside the sandbox: inside it, gh fails with x509 OSStatus -26276 (layer (d); the trustd key in this PR is not live in this window).
- Old branches: none deleted.

STEP 5 — CI at 46a7b124a32c0ef31bf2e40864458754c0ecd191
- check-runs by full sha, total_count=8 (non-zero on the first read, so no re-read was needed):
  changes success (job 109223965597) · build (24.x) success in 17m47s (109224040897) · rule26 success in 6m34s, "185 passed" (109224040901) · report-schema success · relay corpus (grammar v1) success · arm auto-merge success · Vercel Preview Comments success
  SKIPPED, named and not folded into the green: eval-canary (109223967094)
  Vercel status: success "Canceled by Ignored Build Step"
- changes job, merge guard (run 36511354841):
  [merge-guard] CLEAN-MERGE: no in-branch merge in merge-base..head
  [merge-guard] FENCE-GREW ok — head fence is held by the first fence, at 46a7b124a32c0ef31bf2e40864458754c0ecd191
  [merge-guard] timeline ok — 3 events, no reopen, no force-push
  [merge-guard] COLLISION: 0 other open PR(s) against master (plant heads ignored)
  [merge-guard] VERDICT GREEN
- PR #634: OPEN, non-draft; autoMergeRequest enabledAt 2026-09-29T02:10:41Z by app/github-actions (MERGE); mergeStateStatus BLOCKED.
- DARK: adversary/scout is NOT yet posted at this head (the combined status holds the Vercel context only). This explains BLOCKED. The status is the scout's to write; the author's window does not write it.

GRAFT: not used for this card. It was a cherry-pick and conflict resolution on a known file with known paths, so no code-context query was needed. Every fact above comes from git and the gates directly.
