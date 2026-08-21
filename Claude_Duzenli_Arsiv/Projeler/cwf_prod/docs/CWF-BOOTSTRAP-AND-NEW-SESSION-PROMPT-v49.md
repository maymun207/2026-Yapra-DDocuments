# CWF — Bootstrap & New-Session Prompt · v49

<!-- CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v49 · rev 49 · 2026-07-17 · Supersedes v48.
     Open S51 with this. Ledger: register v52 (carry-diff inside). -->

## 0 · CONSTITUTION
PLATINUM (**BREACH-4 on record this session** — three-file relay; redesign
shipped; corollary standing: every cross-lane deliverable = ONE self-contained
document) · GOLDEN LEDGER · FAST-GATE · S43-3 · S43-4 · S47-1 (absorbed two
more real crossings in S50) · S49-1 (**four instances now** — every count and
identifier in a cross-lane message is COMPUTED, never recalled) · **S50-1
PROPOSED, awaiting owner ratification** (fixtures embedded verbatim in phase
prompts) · 🧊 GOLDEN FREEZE: **ONE-TIME LIFTED for the S50 batch only** —
re-engages automatically at that batch's publish or abort. Nothing else golden
is authorized.

## 1 · FIRST COMMANDS (seconds, no suite)
```bash
cd /tmp && rm -rf cwf_yaprak && git clone -q https://github.com/maymun207/cwf_yaprak.git
cd cwf_yaprak && git rev-parse origin/master   # badge at close: 3d115b9 (Merge VIZ-BIND-3)
python3 -c "import json; print(json.load(open('public/architecture/manifest.json'))['docVersion'])"  # ≥ rev 108
```
2776 tests / 281 files unsharded — CI is the arbiter. Production deployment at
close: `dpl_GPGJpcbtoSshyMx47THG1daGSt9i` (re-resolve after any deploy).

## 2 · WAKE-UP SEQUENCE (S51)
1. **GOLDEN-BATCH S50 close-out — FIRST BUSINESS.** State at S50 close: job
   `cwf-publish-job-S50-viz4-behavior-superset-v1.json` staged (21 lines:
   viz v4 UPDATE · b1_scope v3 UPDATE · tools.rule.1 CREATE · tools.rule.6
   CREATE · 3 gateway_step + 14 gateway_rule); golden re-run (full 60/60)
   EXECUTING in background; run 1 (a87a5c5c) = underpowered 14/20 via replay-
   quota exhaustion 38.1M/38.1M → owner set ksadmin REPLAY **exempt**; a
   STANDING conditional GO is with AG: GREEN 60/60 → re-`plan` (drafts
   untouched) → `publish` → paste every `[Gate]` line. Architect then seals
   the `[Gate] action=publish kind=prompt.segment …` lines from production
   logs independently; owner closes with THREE probes (EXEC v2 §3):
   ① "KB7 nin OEE degerlerini gunluk olarak cizermisin" — no counter-question,
   declared assumption, ALL 7 zoneIds in args; ② "tum hatlari tek bir grafikde
   cizelim" — ProvenanceCaption ABOVE the chart (tool-bound), empty zone as a
   NAMED gap series; ③ "SIR tesisinde durum nedir" — no refusal, real data
   query in the evidence chip. **Then record: FREEZE RE-ENGAGED.**
   RED/partial → STOP, specifics verbatim, drafts stay, freeze re-engages.
2. **2026-07-18 05:00Z digest check** — expected `[RouteProposals] daily
   pending=N` with N≥4 (F126 residual, one day).
3. **Post-batch residue:** F133-L5 negative-assertion segment draft (NOT in
   the batch — mint into the freeze queue) · F137 residual verify (bilingual
   chips live?) · F141 cosmetic.
4. **WAVE2-IA-2 → re-walk** — the main lane resumes here.

## 3 · THINGS S51'S ARCHITECT GETS WRONG WITHOUT THIS
1. The operative batch document is **EXEC v2 (self-contained)** —
   `claude-code-EXEC-GOLDEN-BATCH-S50-v2.md`; v1 and the two edit files are
   design records only. Staged **viz v3 and b1_scope v2 are SUPERSEDED** (v3
   taught the now-false "matchless multi-group always panels" fact).
2. **Do not re-author or re-stage anything** — drafts are already staged under
   ksadmin (viz f901979d… / b1_scope 54cdfb1d… lineages). Plan vocabulary:
   UPDATE = findOwnDraft reuse, CREATE = first draft; never a published-row
   diff.
3. **The router is live AND context-aware** (SR1-W3b, 3dba52a): every [Route]
   line carries `ctx_turns= sticky=`; router.contextTurns self-seeded
   (e46dfff0, floor 2). VIZ-BIND-3 (3d115b9) renders matchless multi-group
   results as labelled multi-series/tables — turnLabelMap has nested descent
   with a permanent REAL-payload guard test.
4. **Model-disposition defects (F138/F139/F140) are fix-in-flight via the
   batch** — do not design code fixes for them unless the post-publish probes
   fail; the freeze-free fallback for F140 is a "model-drawn" honesty badge.
5. ksadmin replay quota is now **exempt** (owner action, audited). F142:
   golden runner still lacks a pre-run quota check — GOLDEN-BATCH-2 item,
   below product work.
6. Relay hygiene: every verbatim block to AG carries the **origin tag**
   (Architect-authored, owner-endorsed); AG's fence WILL challenge untagged
   pre-answering relays — that is correct behavior, not an obstacle.
7. Runtime-log reads: single inner content word, narrow since, correct
   deploymentId; `[Gate]`/`[Seed]`/`[Route]`/`[Params]` are the born-loud
   spine. Never full-suite locally as proof; sharded ≠ CI.
8. Every close: carry-diff pasted into the new register (GOLDEN tooth #2).

## 4 · LANES & FENCES
Unchanged (v48 §4) plus: single self-contained relay unit (BREACH-4 corollary);
computed-not-recalled literals (S49-1 tightening); fixtures embedded verbatim
once S50-1 is ratified.

<!-- END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v49 · rev 49 · 2026-07-17 -->
