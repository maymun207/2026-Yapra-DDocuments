# CWF — Bootstrap & New-Session Prompt · v42

<!-- CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v42 · rev 42 · 2026-07-14 · Supersedes v41.
     Open S44 with this. Ledger: register v45 (GOLDEN-compliant, carry-diff inside).
     Story: KB v42. Plans: MP-v4 + runbook v1/v1_2 (authoritative sequencing). -->

## 0 · CONSTITUTION (read before anything)
**PLATINUM** (self-configuring, single-click; breach protocol live; BREACH-1/2 on ledger) ·
**GOLDEN LEDGER** (append-only · carry-diff pasted into every close · no summary-of-summary
· plan files included) · **S43-2 FAST-GATE** (CI = sole test arbiter; review ≤60s; never
re-run the suite locally) · **S43-3** (zero-judgment plans → machine) · **S43-4** (Architect
orchestrates AG+Gemini incl. gated-service scripts; owner = Decision/Consent/Test + relay
ONLY — never hand the owner a terminal command) · Owner tempo: light speed, laser focus,
one pass, no re-litigating.

## 1 · FIRST COMMANDS (FAST-GATE posture — seconds, no suite)
```bash
cd /tmp && rm -rf cwf_yaprak && git clone -q https://github.com/maymun207/cwf_yaprak.git
cd cwf_yaprak && git rev-parse origin/master   # RECORD (badge at close: 74f9ae9, post PHANTOM-INVARIANT)
ls supabase/migrations | tail -3               # expect …backend_tools + …golden_batch_runs as newest
python3 -c "import json; print(json.load(open('public/architecture/manifest.json'))['docVersion'])"  # RECORD (≥79)
```
Unsharded count: read from the latest CI run on master (RECORD; ≥2351/241 + hotfix
fixtures). Drift: CI's build job is the arbiter.

## 2 · WAKE-UP SEQUENCE (in order)
1. **Golden run `fabb123b` (400 chunks, started 17:00Z):** if the owner has NOT yet said
   "yayınlandı" — check verdict (panel strip on Rules→System→Prompt→viz, or
   `[GoldenRun]`/finalize logs). Green ⇒ owner clicks **Yayınla** (Consent) ⇒ **F89+F82
   formally CLOSED**. If ceiling bit (projection said ~9.0M/12M, low risk): ceiling is
   SNAPSHOTTED per run — raise `quota.goldenRunTokenCeiling`, start a fresh run.
2. **OUTPUT-BUDGET-1 (F105):** AG was building at close. PR → FAST-GATE → merge verbatim
   ("the answer stops starving for the thought") → AG runs `seed:agent-params` ×2 (S43-4)
   → next A3 re-ask shows full report (two cures stacked: viz directive + budgets).
3. **F101 owner Decision:** mismatched format-rule row — present both payloads side by
   side; owner picks the survivor; loser archived (one machine action).
4. Then the spine: register v45 §3 (GATE-VISIBLE-1 v2 → PLATINUM sweep 2b→2c→2a →
   SCOPE-HONEST-1 → EXPLORER batch → SUPERSET-SERVE-1). Designs for the sweep are DECIDED
   in runbook §2 — author prompts, don't re-design.

## 3 · THINGS S44'S ARCHITECT GETS WRONG WITHOUT THIS
1. **Reconcile convergence check** = `npm run reconcile:tools -- --backend=armes --actor
   ksadmin@ardictech.com` → "converged — nothing to do" + 3 eternal skip lines. AG runs it
   (S43-4), never the owner.
2. `[Gate]` lines exist ONLY for endpoint publishes today — reconcile/script runs log to
   stdout (fix rides GATE-VISIBLE-1 v2).
3. Superset: gateway=4 IS offered — SUPERSET-SERVE-1 is a TEACHING phase (query-form +
   provenance), not inclusion.
4. GitHub API from sandbox: works until the shared-IP rate limit; CI reads may need an
   owner glance — ask "yeşil/kırmızı", never assume.
5. The A3 trace line is the master diagnostic:
   `offered/gateway/catSource/catCount/writeOffered` — read it before theorizing.
6. `writeOffered=17` semantics UNVERIFIED — do not cite as F80 proof yet (EXPLORER batch).
7. Every new design note/phase prompt carries a one-line PLATINUM compliance statement —
   absence = incomplete artifact.
8. Every close: carry-diff vs the superseded register PASTED into the new one. No
   exceptions, including plan files (the MP-v4 Kale-RAG drop is the cautionary tale).

## 4 · LANES & FENCES (unchanged unless noted)
Operator fence: S40-4 verbatim + **A-1 prints the single CONNECTED ref** (never the org
list). Project `fjbrkimwvtpwoxhziidh` stated in every Operator prompt. AG may run
gated-service scripts (ADR-006 as amended by S43-4); raw DB = Operator MCP only; secrets
never printed.

<!-- END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v42 · rev 42 · 2026-07-14 -->
