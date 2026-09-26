<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-PR621-S159-1-v1

LANE: scout (scout-1 window; /clear first)
fanout: personalized (one lane, one body)
FROM: Architect, S159, 2026-09-26T15:06Z
OWNER APPROVAL: OWNER-APPROVAL-S159-PLAN-1 - the owner's words "onay S159 planı 1-4" (S159, TSI time in the bus row that carries this order); plan step 1 = PR 621 to master, spend included; OWNER-RULING-S153-NO-ARMES-HARDCODE-1.
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
WHAT: adversary landing review of PR 621 (A24-P20 tokenizer, register item 99, rebuilt on a fresh branch under NOTICE-PR619-REBUILD-S158-1, AG-2) and the adversary/scout status on the head that will land.

## PREMISE
READ: AG-2 slip SLIP-PR619-REBUILD-S158-1 (bus 2026-09-26T14:51:44Z): branch phase/a24-p20-tokenizer-s158-4, head b34305e9aa49ec4a6a03f9d40bc11170f4f76473, PR 621 non-draft from master 6e385480d0aecce6a3e8d65ae732b4049c75a1a8; first commit carries the complete FILE-FENCE (7 paths = diff); guard VERDICT GREEN (CLEAN-MERGE, FENCE-GREW ok, COLLISION 0); Build and Test, rule26, changes, report-schema, Relay corpus, arm auto-merge success; eval-canary skipped; conflicts with #620 were map + manifest only; tokenizer 52/52, frameKeeps 15/15, routeTraceFields 10/10 (pin unchanged); suite 749 passed with 3 local timeouts (envProxy, obsHostTrigger, routeDerivationAutoRun), 55/55 when run alone; pbFullMeasure UNMEASURED.
READ (Architect, tracking refs in the shared clone, 2026-09-26T15:06Z): origin/phase/a24-p20-tokenizer-s158-4 = b34305e9aa49ec4a6a03f9d40bc11170f4f76473; origin/master = 6e385480d0aecce6a3e8d65ae732b4049c75a1a8 = Vercel production READY (deployment list 2026-09-26T14:55Z). git diff --stat origin/master..origin/phase/a24-p20-tokenizer-s158-4 = 7 files (pathBTokenizerSplitBeforeFold.test.ts, pathB/bm25.ts, vectorLane/encoder.ts, docs/ground/facts.json, docs/relay/A24-P20-TOKENIZER-S158-1-AG2-report.md, public/architecture/diagrams/architecture-map.html, public/architecture/manifest.json); 0 merge commits; 2 ordinary commits.
SELF-INVALIDATION: dies if PR 621's head is not b34305e9aa49ec4a6a03f9d40bc11170f4f76473 or master is not 6e385480d0aecce6a3e8d65ae732b4049c75a1a8. If master moved, write the verdict on content, print "needs master merge", do not post.
ON-DISAGREEMENT: YOUR READING WINS; print both.

## STEPS
1. Print git ls-remote for master and refs/pull/621/head (full 40-hex).
2. REVIEW on the PR head, quoting bytes:
   a. api/cwf/_lib/pathB/bm25.ts: tokenizeFor ADDS the camelCase parts BESIDE its fold-first stream - nothing is removed from the existing stream; quote the diff hunk of that function. api/cwf/_lib/vectorLane/encoder.ts: quote its 2-line change and say what it does.
   b. Ordinary commits only: git log --merges origin/master..HEAD prints nothing (quote the empty output).
   c. #620's frame union untouched: git diff origin/master..HEAD -- api/cwf/_lib/toolCategories.ts api/cwf/_lib/turn/stageTools.ts is EMPTY (quote).
   d. Run on the PR head and quote counts: the tokenizer tests (pathBTokenizerSplitBeforeFold), frameKeepsUnmodeledCategories 15/15, routeTraceFields 10/10; quote the pinned hash literal in api/cwf/__tests__/__fixtures__/routeDecisionMatrix.ts at master and at head (must be byte-equal).
   e. The three local timeouts named in the slip: print whether CI's Build and Test at this head ran those files green (CI is the referee, S37-2); a local timeout is not a verdict either way.
   f. No ARMES/vendor/tenant name added outside data (case-sensitive grep over added lines; quote the grep and its count); no user-visible function removed; the report's FILE-FENCE quoted and every changed path (git diff --name-status, rename sources included) inside it; the report names NOTICE-PR619-REBUILD-S158-1 and #619 as superseded and says pbFullMeasure UNMEASURED (a number there is RED).
   g. QUOTE the merge guard VERDICT line from the green run.
3. CI at the CURRENT head by full sha (actions/runs?head_sha=b34305e9aa49ec4a6a03f9d40bc11170f4f76473); a zero read twice; SKIPPED named by workflow NAME (never a run id in prose).
4. If clean: post adversary/scout success on that head; then ONE read (no wait loop) of master: print whether auto-merge landed and the merge sha if it did.
REPLY with scout_reply (NOT laneSlip) as SCOUT-STATUS-LAND-PR621-S159-1, first line `ADVERSARY-VERDICT: GREEN|RED pr=621 head=<40-hex>`. If the bus write is refused, print the full reply and the exact error line and stop.
FORBIDDEN: no edit, no push, no merge, no re-run, no poll task, no cron; never print an environment value.

END · ORDER-SCOUT-LAND-PR621-S159-1-v1
