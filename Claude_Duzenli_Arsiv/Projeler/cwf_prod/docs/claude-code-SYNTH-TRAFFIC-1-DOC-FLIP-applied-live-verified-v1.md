# SYNTH-TRAFFIC-1 DOC-FLIP — Operator-applied · live-verified
**claude-code-SYNTH-TRAFFIC-1-DOC-FLIP-applied-live-verified-v1 · rev 1 · 2026-07-21 · Architect: Claude · Executor: AG-B**
Profile: **HOTFIX** (doc flip + gated-script run; zero production logic).

## §P · PRECONDITION (S47-1) + WORKDIR (S56-1)
Valid ONLY while `origin/master == 7d317937b39faac866b0d5a4637aad2c760d0deb`
(Merge PR #95). If GATE0-UI-BATCH-1 (AG-A) merged first, rebase and report the
new anchor. Unique workdir (S56-1). Branch: `synth-traffic-1-docflip`.

## CONTEXT (verified, do not re-verify beyond G1)
Operator applied `20260721150000_synthetic_traffic.sql` to `fjbrkimwvtpwoxhziidh`
(G1–G5 evidence filed: dry-run exact-one → clean apply → 2nd-push no-op → RLS
true/true → 0 policies → anon/authenticated 0 grants). Architect live-verified
from Vercel prod logs (deploy `7d31793` READY): cron 200/min via CRON_SECRET,
`[SynthTraffic] { active:false, reason:'disabled' }`, `[Fence] … ok`.

## §G · STEPS
- **G1 · verifyGrants live run (S43-4 gated-service script):** run the
  repo's verifyGrants script (grep the exact invocation from `package.json`,
  S32-1) against the live DB with the anon/publishable key env it expects.
  EXPECTED: all probes deny-pass INCLUDING the two NEW rows
  (`synthetic_question_sets`, `synthetic_runs` → 42501 deny). Paste the full
  summary line (previous baseline 52/0-class; expect +2 probes, 0 leaks). Any
  LEAK/INCONCLUSIVE → STOP and report (HARDEN-FN-PROBE-1 spirit: never
  silent-green).
- **G2 · STATUS flip:** in `20260721150000_synthetic_traffic.sql`'s header,
  flip `STATUS: authored, Operator-pending …` →
  `STATUS: Operator-applied 2026-07-21 (supabase db push, project
  fjbrkimwvtpwoxhziidh; G1-G5 evidence in Operator report) · live-verified
  (cron 200 + disabled no-op + fence-ok in prod logs) · verifyGrants +2 probes
  deny-pass`. Comment-only change to the migration file — the applied DB object
  is untouched; this is the established DOC-FLIP pattern.
- **G3 · CHANGELOG:** one `.agents/CHANGELOG.md` entry (apply + verify chain,
  one paragraph). If any doc-manifest-mapped file is touched, reseal per
  lock-step; otherwise state "no mapped files touched".

## §V · SELF-VERIFY (paste literal evidence)
1. Anchor rev-parse. 2. verifyGrants full output tail (probe count + zero
leaks). 3. `git diff --stat` (expect: 1 migration comment flip + CHANGELOG
[+ reseal if applicable]). 4. Head SHA + PR # + WHOLE CI job green (S56-2).

## §M · MERGE
Post §V, do NOT merge until Architect GO. Upon GO, `--no-ff` with exactly:

`Merge SYNTH-TRAFFIC-1 DOC-FLIP: migration Operator-applied + live-verified + verifyGrants deny-pass (+2 probes)`

Post-merge: delete branch `synth-traffic-1-docflip`.

<!-- END · claude-code-SYNTH-TRAFFIC-1-DOC-FLIP-applied-live-verified-v1 · rev 1 · 2026-07-21 -->
