# PHASE-A23-STEP01-MEASURE-1 · v1 (S108)
<!-- Self-contained relay artifact (S54-3). Lane: AG-2. First card of #29 A23 — the LAST SOTA key. -->

## PRECONDITION (S47-1, queue-aware form)
Fresh clone. Record `git rev-parse origin/master` in your report. It must be
`15db33a48a2f3c5f3c77d93e311f7383e1998816` OR a descendant of it — verify with
`git merge-base --is-ancestor 15db33a4 origin/master` (rc must be 0; AG-1's MERGE-GATE-1 may land
first and that is EXPECTED, not a deviation). Before opening your PR:
`git merge-base --is-ancestor origin/master HEAD` rc must be 0, else rebase and report the new base.

## AUTHORITY & SEQUENCE (read before writing any code)
Source of truth: `A23_cwf-understanding-layer-architecture-v1_4.html` (md5 `3a2eb694fe5e889887f303e7e1846bd8`,
LOCKED, anchor 194f6a8) — its §9 build order is OWNER LAW (KARAR-A23-SEQ-1). This card = **Step 0 + Step 1 ONLY**:
- Step 0: F169 hotfix — telemetry flush before response, awaited. (Gate: without observability no
  baseline is trustworthy.)
- Step 1: MEASURE — F129 trigger: Recall@k via routerAbLens + current clarify-gate behavior baseline;
  F174 set-genişliği (set width is the guard metric — a single metric lies, E1).
**FORBIDDEN in this card (by owner ruling KARAR-A23-SEQ-1):** any ⑤/⑥ machine code (Step 3), any
second channel/BM25 (Step 4), ANY τ/β calibration (Step 5 gate: channel-2 must be LIVE first, A-7).
S62-2: Step 1 is not skippable. S102-YASA (derived-source): read pipeline.ts / stageClarify.ts /
routerAbLens LIVE before claiming anything about them — this card names files by folder listing only,
not by read; your first work item is the read.

## WORK ITEMS
**W0 · Recon read (D-1, report section 1).** Read `api/cwf/_lib/turn/pipeline.ts`, `stageClarify.ts`,
`stagesResolve.ts`, the routerAbLens implementation, and the F169 flush site. Report: where the flush
happens today relative to the response, whether it is awaited, and where F129's trigger lives.
**W1 · F169 hotfix.** Flush-before-response, awaited. Minimal diff; no behavior change beyond ordering.
Prove with a test that fails on the old ordering (canlılık kanıtı, E2).
**W2 · Baseline measurement run.** Produce and commit (under `docs/relay/` as report appendix):
- Recall@k numbers from routerAbLens on the existing synthetic corpus (frozen word-map is the
  ablation floor, A-4) + set-genişliği per F174.
- Current clarify-gate behavior baseline: on the corpus, how many turns die at `stageClarify` and why
  (the v1 disease the whole of A23 exists to cure — measured, not narrated).
**W3 · Owner question-set as named baseline cases.** The owner's 11-question factory set (KB7/Granit;
in project box `CWF_SorularSayfa1.csv`) is ACCEPTANCE MATERIAL. Encode the 11 non-empty questions as
corpus cases with class labels: A=tool-answerable w/ control URL (1,3,4,5,6,7,8,9) · B=no-such-report
honesty probe (2) · C=correlation/synthesis (20,21). Do NOT run them against live ARMES in this card —
they enter the measurement corpus as fixtures; live three-model runs are a SEPARATE harness phase.
Question 1's note («son 3 gün» time-constraint missed) is the named CLARIFY-class exemplar: record it
verbatim in the fixture metadata.
**W4 · Oda kartı draft for Step 2/3 rooms.** Fill the 8-line room card (§7) for turn_context and ⑤/⑥
from the MEASURED baseline — TABAN ÇİZGİSİ rows now have real numbers to pin. Draft only; no Step-2 code.

## GATES
Full local set (vitest · typecheck · build), `$?` unpiped per gate. Measurement outputs are artifacts
in the report, each number traceable to the command that produced it (COMPUTED-NOT-ASSERTED).

## DELIVERY (S91)
Branch `phase/a23-step01-measure-1` · push · report `docs/relay/PHASE-A23-STEP01-MEASURE-1-report.md` ·
PR to master. **You do NOT merge.** If branch protection is live by then (AG-1), enable auto-merge on
your PR and stop; if not yet live, stop at the open PR and report — the old detached-merge idiom is
retired either way. Overlap pre-check before PR: your changed files vs `phase/merge-gate-1`
(`comm -12`); expected intersection: empty (their card is settings+docs). Non-empty → report first.
TAIL ANCHOR: report ends with `git rev-parse origin/master` at report time.
<!-- END PHASE-A23-STEP01-MEASURE-1-v1 -->
