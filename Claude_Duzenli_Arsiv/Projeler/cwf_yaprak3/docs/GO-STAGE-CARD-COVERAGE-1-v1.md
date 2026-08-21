# GO-STAGE-CARD-COVERAGE-1 · v1  (lane AG-2)

**VERDICT: GO.** RULE-25 review completed by the Architect in a FRESH FULL CLONE
(`git clone` → `git checkout origin/phase/stage-card-coverage-1`), independently,
not from your report.

## What the Architect verified independently

| Check | Method | Result |
|---|---|---|
| Fence | `git diff --name-status origin/master...HEAD` | 4 files, ZERO hits in `api/`, `shared/`, `scripts/`, `supabase/`, `public/architecture/`, `BenchTab` — **held** |
| Card count | `grep -c "^{ no:'"` | **15** — RECON right, bootstrap wrong |
| Coverage list | AST-ish count over `STAGE_ORGAN_ITEMS` | **16 items = 15 `described` + 1 `deferred`**, the deferral is `bench-tezgah` owned by `BENCH_KULLANIM_DOC` — exactly the G2 ruling |
| New tests | `grep -c "    it("` | **9** — matches the reported +9 exactly |
| Card 04's claims | read against source | `PLANNER_ENABLED value:1 stage:'05'` (agentParams.ts:742) · `PLANNER_REPLAN_NUDGE_MAX value:1 min0 max2 stage:'11'` (:753) · `ROUTER_FRAME_ENABLED value:0` (:390) · `PLAN_TEMPLATE_FLOOR` (planner.ts:175) — **all four TRUE** |
| Card 08's correction | read against source | `MAX_TOOL_RESULT_CHARS = Number(process.env.MAX_TOOL_RESULT_CHARS) \|\| 40000` (toolResult.ts:72) — the old card said "kodda, 40000" and hid the env override. **The correction is right and the old text was wrong in a way nobody had noticed.** |
| Anchor drift | `git rev-parse` before and after review | master `c1e3f5f`, branch `5728676` — nothing moved under the review |

The two-direction instrument is the part that earns the merge: `claims` red when
the CARD stops saying it, `anchors` red when the CODE stops carrying it. M1 and
M3 are the same test firing in opposite directions, and M3 is the one a weaker
design would have omitted.

Also accepted as correct and recorded rather than argued with: the telltale scan
MISSED two of the four convictions (03 and 08). That is the brief's own rule
proving itself the hard way.

---

## STEP 1 — BLOCKING: CI on the PR head

The Architect's sandbox is GitHub-rate-limited and cannot read run status. **You
verify it, and the merge does not proceed without it.**

Read by CONCLUSION on the head SHA:
`GET /repos/maymun207/cwf_yaprak/actions/runs?head_sha=5728676`

PASS condition: `status: completed` AND `conclusion: success` on every real job.
`in_progress` or `null` is **NOT** a pass. `eval-canary` skipped-by-design on a
`pull_request` event is not a failure. If the run is red, STOP and report — do
not merge, do not rerun blindly.

## STEP 2 — MERGE

`--no-ff`. Squash is banned. Use the message below **VERBATIM**.

Re-read `origin/master` immediately before merging. It must still be
`c1e3f5f99ac7a36fb8c6ccf4ff7c2cc99d8dd95b`. If it moved, STOP and report.

### TAIL ANCHOR (S61-3) — verify after merging, with `git rev-list --parents -1 HEAD`

The new master tip must be a merge commit with **parents = [`c1e3f5f`, `5728676`]**.
Do not assume it; print it.

## STEP 3 — THE SEAL: rev 222 STANDS, and that is a MEASUREMENT

`src/**` is mapped by no tab; you RAN `check:doc-drift` and it reported
`[OK] no drift -- all 7 narrative tabs synced`, including with the report file on
disk. So **no reseal is owed and no `docVersion` is written by this merge.**

Per S90-1 this is stated explicitly rather than inherited: **the merged tree is
rev 222.** AG-1's lane will mint 223 when its branch completes. Do not write a
docVersion string in this merge.

## STEP 4 — MERGE REPORT

`docs/relay/PHASE-STAGE-CARD-COVERAGE-1-MERGE-report.md`, pushed on master.
It must carry: the CI run id and its conclusion; the tail-anchor parents as
PRINTED; the post-merge suite figure MEASURED on the merged tree; the doc-drift
result on the merged tree; and the two residuals below, restated by name.

**Do NOT delete the branch.** It is left for the session-close sweep, matching
this wave's practice.

---

## RESIDUALS CARRIED FORWARD (named, not silently absorbed)

1. **`api/admin/stage-context.ts:41-48` carries the same lie, and it is the
   AUTHORITATIVE copy.** It declares stage 04 a PERMANENT thin
   (`'no-artifact'`, *"ayrı planlayıcı yok (ReAct)"*), mirrored at
   `src/dev/AdminPreview.tsx:629` and echoed by two in-lane fixtures. Both halves
   are false: `ctx.turnPlan` / `ctx.planBlock` are real artifacts, so an artifact
   exists to snapshot and the permanence claim has expired. **An admin opening
   İncele → Aşama Bağlamı is still told there is no planner.** Correctly NOT
   fixed here — outside the fence, and flipping the two in-lane fixtures alone
   would make them disagree with the server payload they exist to mirror. Enters
   the register by name as **`STAGE-CONTEXT-TRUTH-1`**, needs an `api/**` lane.

2. **The organ is ON and SILENT in production.** `planner.enabled` floors to 1,
   but a plan needs a frame and frame extraction rides `router.enabled` /
   `router.frameEnabled`, both floored to 0. Card 04's fourth law states this out
   loud rather than swapping one lie for its mirror image. Recorded as a live
   system fact for the register, not as a defect of this phase.

3. **`voiceGate.test.ts` (WAVE2-CONTENT-1 §4)** forbids internal identifiers in
   card copy and was not named in the brief. Architect's omission; it goes into
   the doctrine's pre-send checklist so the next card-writing lane is told.

---

## THE MERGE MESSAGE — VERBATIM, DO NOT EDIT

```
merge: STAGE-CARD-COVERAGE-1 — the map stops denying the territory

Four cards were convicted, and the scan found only two of them. Card 03 said the
frame was "şu an yalnız GÖZLEM amaçlıdır" — fluent, confident, and false since
PLANNER-0 made that frame the planner's input and the re-plan gate's yardstick.
Card 08 called the 40000-char threshold "kodda" while
MAX_TOOL_RESULT_CHARS reads process.env first. Neither carries a telltale phrase.
Both were found by reading the card against the code, which is what the brief
said the scan could not replace, and what the scan then demonstrated by missing
half the answer.

Card 04 is the one that mattered: it denied an organ that ships. planner.ts was on
disk, PLAN_TEMPLATE_FLOOR served five actions, three governed keys existed — and
the card named for planning still asked "Neden boş bırakıldı?". PLANNER-0 filed
its documentation on card 05, because agentParams declares PLANNER_ENABLED with
stage:'05' and runPlannerStage runs inside the memory-retrieval stage. The code's
own attribution pointed at the wrong card and nobody walked back.

The rewrite refuses the mirror-image lie. "Açık olmak konuşmak değildir":
planner.enabled floors to 1, but a plan requires a frame and frame extraction
rides router.enabled and router.frameEnabled, both floored to 0. On factory
floors this organ is ON and SILENT — zero bytes. "Is it on?" and "did it speak?"
are two measurements, and reading one for the other is the failure this card was
just cured of.

The instrument is the reason this is a phase and not an edit. stageCardCoverage.ts
holds sixteen organs in exactly two states — fifteen described, one deferred, no
third — on the healthCoverage precedent. Each described organ carries CLAIMS
(substrings the card must still say) and ANCHORS (needles the shipped source must
still carry), so the test reds in BOTH directions: when the card stops speaking,
and when the code stops backing it. M1 and M3 are that same test fired in opposite
directions; a weaker design would have shipped only M1. Four mutations, four
killed, with the baseline 9/9 green before and after each.

The TEZGÂH is a deferral, not a manufactured sixteenth card. A pipeline stage is
something a turn passes through; the bench is something an admin pours input into,
and numbering it would make the numbering itself a lie. It is owned by
BENCH-KULLANIM-DOC-1 and cannot fall out silently.

One mutation harness printed nothing at all and silence read exactly like a pass —
a grep -c whose CORRECT answer was 0 exited 1 and killed an && chain before vitest
ran. Caught mid-run, re-run with ; separators, and the absence of a "Tests N
failed" line is now treated as a failed measurement rather than a survived
mutation. That is the false-green law in a new spelling.

Named and NOT fixed: api/admin/stage-context.ts:41-48 declares stage 04 a
permanent thin and is the authoritative copy — an admin opening Aşama Bağlamı is
still told there is no planner. It is outside this lane's fence, and flipping the
two in-lane fixtures alone would make them disagree with the payload they mirror.
It enters the register as STAGE-CONTEXT-TRUTH-1 and needs an api/** lane.

check:tenant-zero reds with 46 hits, every one in the gitignored generated
changelog — proven by stashing to the pristine anchor and re-running to the same
46, not by pointing at the filename. Presence of a red is not evidence of a cause.

Suite 517/6308 -> 518/6317, both measured in the same fresh clone. src/** is
mapped by no narrative tab, check:doc-drift reported no drift including with the
report on disk, and no docVersion string was written: the merged tree is rev 222.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
```

<!-- END · GO-STAGE-CARD-COVERAGE-1-v1 -->
