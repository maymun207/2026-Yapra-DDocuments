# claude-code-EXEC-GOLDEN-BATCH-S45-v2.md

<!-- v2 · 2026-07-15 · Supersedes EXEC v1 (SUPERSEDED-BY this doc — v1 stopped
     correctly on the missing seam; PUBLISH-SEAM-1 (fe1fc3e) built it).
     Anchor: master fe1fc3e · rev 92. Job file (Architect-authored, schema-exact,
     JSON-validated): cwf-publish-job-S45-viz3-b1scope2-superset-serve1-v1.json —
     place it at repo root as publish-job-s45.json (content verbatim, do not edit).
     PLATINUM: one machine command per step; owner touchpoints = the consent flag
     value (relayed decision) and live probes after. ADR-006 rev 2 (S43-4) is now
     committed law for exactly this script class. -->

## 0 · PRE-FLIGHT
- `git rev-parse origin/master` == `fe1fc3e2cf7097e4b9f1c17933d397bfe55f45f7`; local
  master fast-forwarded; `npm ci` clean.
- Local env carries SUPABASE_URL / SUPABASE_SECRET_KEY (the reconcile-script
  convention). NEVER print either (ADR-007). If absent → STOP, report.
- Save the job file verbatim as `publish-job-s45.json`. Sanity: `node -e
  "JSON.parse(require('fs').readFileSync('publish-job-s45.json','utf8'))" `.
- `--as` identity: the owner's admin email (ksadmin@ardictech.com).

## 1 · SEQUENCE (stop between steps, report each output verbatim)
1. `npm run publish:governed -- plan --job publish-job-s45.json --as ksadmin@ardictech.com`
   → report the dry-run plan. STOP for Architect ACK.
2. `… stage --job … --as …` → report draft ids. Run it a SECOND time and show
   the no-op line (S31-1 evidence).
3. **CONSENT GATE:** report the plan's estimated budget; the owner grants the
   flag value (expected: 12000000 — the governed ceiling clamps regardless).
   Then: `… golden --job … --as … --consent-tokens <granted>`
   → report the verdict VERBATIM. green → step 4. underpowered → STOP (owner
   decision, fabb123b precedent). red → STOP + full audit line.
4. `… publish --job … --as … --golden-run-id <run id from step 3>`
   → report every publish audit line + new revs (expect: prompt.segment viz v3,
   safety.b1_scope v2, superset.gateway_rule query-form-tool-vocabulary,
   superset.gateway_step discover).
5. Final: `git status` clean (this run changes ZERO repo files beyond the
   untracked job file — delete it after publish), run id, verdict, revs.

<!-- END · claude-code-EXEC-GOLDEN-BATCH-S45-v2 · rev 2 · 2026-07-15 -->
