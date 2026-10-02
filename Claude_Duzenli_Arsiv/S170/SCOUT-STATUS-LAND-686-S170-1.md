[scout-1]
ADVERSARY-VERDICT: GREEN pr=686 head=b99822967962feafaa523278fc6b4d5b17a3c07a · POSTED adversary/scout success (status id 55390796313, 18:43:29Z) · the one read after the post: OPEN, mergeable_state clean, auto-merge armed (maymun207); merge sha UNMEASURED by this reply (one read only, per the order)
GRAFT: none run (diff, CI-log and status reads only).
PROMPTS: one. The build and guard logs were read through the sanctioned `gh api …/actions/jobs/<id>/logs`, whose redirect host productionresultssa17.blob.core.windows.net was declared.

SCOUT-STATUS-LAND-686-S170-1 · reply to ORDER-SCOUT1-LAND-686-S170-1 (id 02f6cfb8-36f8-4f20-b1a4-06bf68e6de1d)
Head b99822967962feafaa523278fc6b4d5b17a3c07a as the card says (commits 7d807fc4 reviewed GREEN, b9982296 repair).

## 1 · The repair delta 7d807fc4..b9982296: exactly the allowed three, nothing else (3 files, +43/−4)
- Report fence: `- api/admin/rules/[id].ts` → `- api/admin/rules/` (the rules directory holds [id].ts and bulk-publish.ts; only [id].ts is in the diff, per the report's evidence:repair).
- F2, governance.ts readRoutingExamContext, one line: `labelled: load.members.filter((m) => (m.acceptable?.tools.length ?? 0) > 0).length`. It counts the population the keyword arm scores. The block semantics are unchanged: decideRoutingExamPublish is untouched, and only the count that decides "is a run required" is corrected.
- F3, GovernanceTab.tsx, one label string: "Exam run id (required once the exam set reaches nMin)".
- The remaining additions are report text (a repair CLAIMS row, evidence:repair, F1–F5 named).

## 2 · CI at b99822967962feafaa523278fc6b4d5b17a3c07a: the code's first build
build (24.x) success 18:39:46Z · rule26 success · changes success · relay corpus success · report-schema success · arm auto-merge success · Vercel success · SKIPPED: eval-canary.
```
[check:tenant-zero] [OK] ZERO gated-vocabulary hits in scope — 2413 files scanned (floor 400), 26 binaries skipped (counted, not silently dropped), exemptions: B-2 history only.
[check:backend-names] [OK] every (id, class) count equals data/gates/backend-names-baseline.json.
[check:doc-drift] attest docs/relay/E2-K34-PUBLISH-GATE-S170-1-AG4-report.md:223 tab='Architecture Map' -> COUNTED (matched)
[check:doc-drift] attest docs/relay/E2-K34-PUBLISH-GATE-S170-1-AG4-report.md:224 tab='Request Lifecycle' -> COUNTED (matched)
[check:doc-drift] attest docs/relay/E2-K34-PUBLISH-GATE-S170-1-AG4-report.md:225 tab='LLM Control Surface' -> COUNTED (matched)
[check:doc-drift] attest docs/relay/E2-K34-PUBLISH-GATE-S170-1-AG4-report.md:226 tab='Governance Model' -> COUNTED (matched)
[check:doc-drift] attest docs/relay/E2-K34-PUBLISH-GATE-S170-1-AG4-report.md:227 tab='Agent Control Plane' -> COUNTED (matched)
[check:doc-drift] [OK] every touched tab is attested or its diagram is in the diff (mode=pr).
 Test Files  793 passed (793)
```
(The ATTEST RUN reads "30 changed path(s)" from base c817f8e3. CI builds the PR merge ref against the newer master, so #684's own paths ride in and are satisfied by #684's report attests at E2-K33-TOOL-IDENTITY-S170-1-AG3-report.md:195-200.)
DIAGRAM-ATTEST reasons judged TRUE against the code I reviewed:
- Architecture Map, Request Lifecycle and Agent Control Plane: no component, turn step or span added.
- LLM Control Surface: index.json's routingExam is read by the publish gate and admin tab only, never a prompt.
- Governance Model: TRUE but thin, as noted in my review. The drawn Layer-2 statement still holds; the routing arm is attested, not drawn, and the report names it.
Guard:
```
[merge-guard] FENCE-GREW ok — head fence is held by the first fence, at b99822967962feafaa523278fc6b4d5b17a3c07a
[merge-guard] COLLISION ok against #685 — fences disjoint
[merge-guard] COLLISION note — overlaps higher #687 on data/gates/backend-names-baseline.json~data/gates/backend-names-baseline.json; #687 yields
[merge-guard] COLLISION note — overlaps higher #688 on data/gates/backend-names-baseline.json~data/gates/backend-names-baseline.json; #688 yields
[merge-guard] VERDICT GREEN
```

## 3 · Stop rule and post
`git ls-remote origin refs/heads/master` → 0e4dc6bd773a8e9a0bf932de5686521ec40f8322 (685 landed). Push Build and Test: completed SUCCESS (run 36907478330), finished since the Architect's 18:40Z in-progress read; prior tip 0f2f2a44 also success. Not failure → posted.
pulls/686, one read after the post: state open · merged false · mergeable_state clean · merge_commit_sha 6c8606a22b4d401f27c25e78f676a25cbf8e8cdd (test-merge, not a landing) · auto_merge enabled_by maymun207.

## Follow-ups (named, not blocking)
F1. Fail-open on an exam-set read outage: an unreadable set ALLOWS routing publishes as `exam: unmeasured` with `examSet: unread` + reason. Follow-up: a governed choice between fail-open-audited and refuse.
F4. Bulk publish (api/admin/rules/bulk-publish.ts) and the rollout-complete path pass no examRunId. They allow as unmeasured today and will REJECT routing drafts once the set reaches nMin. Follow-up: thread examRunId through both.
F5. mergeGuard.mjs:105 `/[*?[\]{}!]/` cannot fence a literal bracketed path (Next/Vercel dynamic routes), so the fence widens to the directory prefix. Follow-up: an escape or exact-literal matching for bracket segments in the fence dialect.
