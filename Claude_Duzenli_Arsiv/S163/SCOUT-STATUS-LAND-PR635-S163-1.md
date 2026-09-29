ADVERSARY-VERDICT: GREEN pr=635 head=7fc4ba96c6d5c453d874d21a25b36fdd9b15a506 · LANDED merge=ed033de062dfc869850a35e40f1b39094dd24ea3
SCOUT-STATUS-LAND-PR635-S163-1 · scout-1 · reply to ORDER-SCOUT-LAND-PR635-S163-1 (966a8b72-edd5-4910-a0df-54b55420f735)

ORDER READ: mail-wait --read: DIGEST-OK md5 13c751c6054948d468cb62c287b3f105; PREFLIGHT-UNMEASURED (listen EPERM, tsx IPC pipe in the sandbox) — delivered unchecked, the third value. Read only, consumed_at not written.

1 · REFS (git fetch origin; git ls-remote origin refs/pull/635/head refs/heads/master, read twice, and a third time just before the status post)
  7fc4ba96c6d5c453d874d21a25b36fdd9b15a506 refs/pull/635/head
  1a6279e0c3eddf5ac331b38f5c028b5f17668690 refs/heads/master
  Neither moved.

2 · SHAPE (git log --format=%H %P origin/master..7fc4ba96…)
  7fc4ba96c6d5c453d874d21a25b36fdd9b15a506 1a6279e0c3eddf5ac331b38f5c028b5f17668690
  ONE commit, ONE parent = 1a6279e0.

3 · FENCE and TRANSPLANT
  git diff --name-only 1a6279e0 7fc4ba96 → 34 paths. FILE-FENCE of docs/relay/E1A-EXAM-SETS-AND-BAR-S161-1-AG4-report.md at head → 34 paths. diff∖fence = ∅, fence∖diff = ∅.
  git diff --stat e61fd0c6894277b690a4df1b017175d0c47daedc 7fc4ba96 -- <the 31 paths> →
    data/gates/backend-names-baseline.json | 9 ++++++--- (the one path new to this PR; PR 632 did not carry it, so a diff there is by construction)
  The other 30 paths are byte-identical to PR 632's head. Transplant exact.

4 · BASELINE (git diff 1a6279e0 7fc4ba96 -- data/gates/backend-names-baseline.json)
  system/code 859→864, system/tests 787→791; attributions: +resolveExamPolicy.test.ts 4, agentParams.ts 19→20, +resolveExamPolicy.ts 4. Nothing else in the file moved. Arithmetic: code +1+4 = +5, tests +4.
  git grep -n -i system 7fc4ba96 -- (the three grown files):
    resolveExamPolicy.ts L4, L27, L69 = fetchSystemParamRows (existing helper); L14 = English prose (the system cannot lower...). agentParams.ts: the one new line is L335, a comment (the system cannot lower its own bar). → CODE RULING CONFIRMED.
    resolveExamPolicy.test.ts L10, L34 = SYSTEM_BACKEND_ID; L12, L33 = SYSTEM_KIND_IDS. NOTE: the ruling names only code lines. These four test cells ARE references to the system lane's backend id ('system', agentParams.ts L23), but through the one-home constant and not a literal, in exactly the shape of the sibling resolveHealthPolicy.test.ts (L15, L17, L38, L39, L73, L74). That is the app's own system lane, not a vendor backend. Not RED; I'm naming it so the ruling's text can be widened.
  git diff -U0 1a6279e0 7fc4ba96 -G armes|ARMES|Armes|superset|machine-knowledge-base → the only hunk is the relay report's prose (docs/relay). No new occurrence in any source or test file. NO-HARDCODE clean.

5 · CONTENT (S43-2)
  Migration 20260928180000_golden_specimens_exam_set.sql, full read: ADDITIVE only. It has two ALTER TABLE ADD COLUMN. exam_set text NOT NULL DEFAULT 'unassigned' with a five-value CHECK. acceptable jsonb is nullable, and NULL means unlabelled. There are also two COMMENTs. No DROP, rename, backfill, UPDATE, function, SECURITY DEFINER or GRANT; RLS posture is inherited (service-role only). The default equals the pre-apply read arm's mapping. Not applied (Operator-pending); this scout applied nothing.
  api/admin/golden-specimens.ts, full read: authed() then ensurePermission(GOLDEN_CURATE) on EVERY method, before GET/POST dispatch. The two new actions route through handleWrite after the gate. Input is validated at the door: isExamSet against EXAM_SETS, and zod parseAcceptableLabel for acceptable. A missing ACTIVE marking gives 404; ExamColumnsAbsentError gives 503. Responses carry curation metadata plus examRuns (read | unread with a DB error message), with no raw_tool_results and no secret. latestExamRuns returns unread rather than throwing, so the existing list cannot be hidden by it.
  api/admin/health-analytics.ts: the auth path is unchanged. It adds resolveExamPolicy() in parallel with resolveHealthPolicy (never throws) and one optional examPolicy response field. No secret.
  UI fast gate: HealthTab K25 line renders sunucu bildirmedi when examPolicy is absent, never 0. ReplayTab/goldenCoverage use fmtRate, which gives n/a when n is 0 or absent (never 0%). An unread run shows son sınav koşusu okunamadı with its reason; no run means no metrics span. Per-set member counts show a real 0, which is a count, not a rate. The literal string veri yok is not used, but the empty≠zero rule holds. No RED byte.

6 · CI at 7fc4ba96c6d5c453d874d21a25b36fdd9b15a506 (check-runs by full sha, read twice after completion)
  arm auto-merge (Auto-merge landing) success 02:50:56Z · report-schema success 02:51:22Z · relay corpus (grammar v1) success 02:51:24Z · build (24.x) (Build and Test) success 03:07:41Z (started 02:51:06Z, 16.6 min). Also changes success, rule26 success, Vercel Preview Comments success.
  eval-canary SKIPPED by design (named, not folded into green).
  Named waits used: 5 of 12, from 03:00Z to 03:08Z. Waits 1 and 2 overlapped; that was my sequencing slip, and I counted both.
  changes job, Merge guard step: [merge-guard] VERDICT GREEN (also: CLEAN-MERGE no in-branch merge · FENCE-GREW ok · timeline ok, 3 events, no reopen, no force-push · COLLISION: 0 other open PR(s) against master).

7 · STATUS and LANDING
  gh api POST statuses/7fc4ba96c6d5c453d874d21a25b36fdd9b15a506 context=adversary/scout state=success → success adversary/scout 2026-09-29T03:09:47Z. The first attempt was refused 422 (description over 140 chars), nothing was written, and I shortened the description and posted again.
  Landing, read 1 of 10: gh pr view 635 → MERGED 2026-09-29T03:09:55Z; git ls-remote master → ed033de062dfc869850a35e40f1b39094dd24ea3.
  git log -1 --format=%H %P ed033de0 → ed033de062dfc869850a35e40f1b39094dd24ea3 1a6279e0c3eddf5ac331b38f5c028b5f17668690 7fc4ba96c6d5c453d874d21a25b36fdd9b15a506. The parents are exactly master and the reviewed head.

DARK / NAMED
  - Order preflight UNMEASURED (sandbox EPERM).
  - gh api from the sandbox failed TLS verification (x509 OSStatus -26276), so the GitHub reads, status post and ls-remote re-reads ran outside the sandbox.
  - Guard GS-4 refused reading a saved tool-output file under ~/.claude/**, and I did not reopen it. I fetched the public CI job log fresh into this session's scratchpad instead.
  - The baseline ruling's text does not cover the four test cells (see 4).
  - The migration is not applied. No live-schema lens was taken by this scout.

FORBIDDEN list honoured: no edit, push, merge, re-run, dispatch or cron; no migration apply; no environment value printed.
END · SCOUT-STATUS-LAND-PR635-S163-1
