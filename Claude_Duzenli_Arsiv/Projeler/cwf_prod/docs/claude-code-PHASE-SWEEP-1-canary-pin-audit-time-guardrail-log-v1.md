# PHASE SWEEP-1 — three micro-TDs, one merge (canary cross-pin · audit relative-time · guardrail run-log)
**claude-code-PHASE-SWEEP-1-canary-pin-audit-time-guardrail-log · v1 · 2026-07-11 · AG-lane · single gated phase**

> Architect diagnosis (Session 36, ground truth `329ea64`). Three small, independent, low-risk
> polishes the register has carried; folded into ONE `--no-ff` merge. None touches DDL / migrations /
> the eval-gate engine / grounding logic.
>
> **(1) Canary cross-pin.** `api/admin/eval-ci.ts:54` `export const CANARY_AUDIT_MESSAGE_ID = 'canary'`
> (the RULE-1 home) is mirrored by a PRIVATE `const CANARY_MESSAGE_ID = 'canary'` in
> `ReplayAuditRepository.ts:24`. Two literals that MUST stay equal, nothing enforces it → silent-drift risk.
> **(2) Audit relative-time.** Both audit drawers render `created_at` as an ABSOLUTE localized stamp
> (`RolloutTab.tsx:370` inline `toLocaleString`; `RoutingTab.tsx:199` `fmtDate` → `:490`). No shared
> relative-time helper exists. Audit drawers are about recency → a relative "3 saat önce / 3 hours ago"
> reads better, with the absolute preserved on hover.
> **(3) Guardrail run-log.** `api/admin/rollout-guardrail.ts` logs ONLY on the 500 path
> (`console.error('[rollout-guardrail]', …)`). Both 200 paths (no-active :70, active :86–96) are SILENT,
> so a healthy authed run is invisible in Vercel runtime logs (the group_by requestPath omits the
> endpoint). This closes the observability gap named at the CRON_SECRET step — the arm becomes
> Claude-observable when it runs.

---

## 0 · RULE-25 BOOTSTRAP
```
cd /tmp && rm -rf cwf_yaprak && git clone --quiet https://github.com/maymun207/cwf_yaprak && cd cwf_yaprak
git rev-parse origin/master        # MUST be 329ea64e88c6004d86b58f18edf14e0fc2c50ea7
npm ci --no-audit --no-fund
```
Anchor = **329ea64** (1965 tests / 185 files / docVersion rev 67). Branch off master; `--no-ff`; squash BANNED.

## 1 · PRE-FLIGHT (grep-verified; S32-1)
```
grep -n "CANARY_AUDIT_MESSAGE_ID" api/admin/eval-ci.ts                                   # :54 exported RULE-1 home
grep -n "CANARY_MESSAGE_ID" api/cwf/_lib/persistence/repositories/ReplayAuditRepository.ts # :24 private mirror + :89/:113 uses
grep -n "toLocaleString\|fmtDate\|created_at" src/components/admin/RolloutTab.tsx src/components/admin/RoutingTab.tsx  # :370 / :199+:490
grep -rn "Intl.RelativeTimeFormat" src/                                                   # → none (you add the helper)
sed -n '68,101p' api/admin/rollout-guardrail.ts                                           # the two silent 200 paths + the 500 console.error
```

## 2 · HARD CONSTRAINTS
- **C-1 (guardrail) ADR-007 / C9 — NEVER echo a secret.** The new log line carries verdict / state /
  ids / counts ONLY. It MUST NOT reference `CRON_SECRET`, the Authorization header, or any presented
  value. Keep the `[rollout-guardrail]` tag consistent with the existing 500 line.
- **C-2 (relative-time) native only, no new dep.** Use `Intl.RelativeTimeFormat` (built-in). Do NOT add
  a date library. Preserve the ABSOLUTE timestamp as the element's `title` (hover = exact time). Accept
  render-time computation (audit drawers are transient) — NO ticking timer/interval (over-engineering).
- **C-3 (cross-pin) no wrong-direction coupling.** Do NOT make the repository import from the endpoint
  handler `eval-ci.ts` (that pulls the canary/quota module graph into persistence). The RULE-1 home
  STAYS `eval-ci.ts:54`. Just EXPORT the repo's mirror and pin equality in a test.
- **C-4 Nothing else moves.** No eval-gate, no grounding, no rollout actuator logic, no DDL. The
  guardrail's auth/actuator/response bodies are untouched except the added log statements.

## 3 · SUB-PHASES
### A — canary cross-pin (drift guard)
- In `ReplayAuditRepository.ts`, change `const CANARY_MESSAGE_ID` → `export const CANARY_MESSAGE_ID`
  (value + uses unchanged). Update its docblock to note the pin.
- Add a test (co-located, e.g. `api/cwf/__tests__/canaryMessageIdPin.test.ts`): import `CANARY_MESSAGE_ID`
  from the repository AND `CANARY_AUDIT_MESSAGE_ID` from `api/admin/eval-ci.ts`; `expect(CANARY_MESSAGE_ID)
  .toBe(CANARY_AUDIT_MESSAGE_ID)`. Now the two literals cannot silently diverge.

### B — audit relative-time helper + wire-in
- Add `src/lib/relativeTime.ts`: `relativeTime(iso: string, lang: 'tr'|'en'): string` using
  `Intl.RelativeTimeFormat(lang === 'tr' ? 'tr' : 'en', { numeric: 'auto' })`. Pick the largest fitting
  unit (second→minute→hour→day→…); a bad/empty iso returns '' (never throws). Keep it pure.
- Wire into BOTH audit drawers, absolute stamp moved to `title`:
  - `RolloutTab.tsx:370`: render `relativeTime(a.created_at, lang)` with `title={new Date(a.created_at).toLocaleString(...)}` (the existing absolute format).
  - `RoutingTab.tsx:490`: `e{row.epoch_after} · {relativeTime(row.created_at, lang)}` with `title={fmtDate(row.created_at)}` (keep `fmtDate` as the title source).
- Add a focused unit test for `relativeTime` (buckets: seconds/minutes/hours/days, tr + en, empty→'').

### C — guardrail run-log (observability)
- In `api/admin/rollout-guardrail.ts`, add a secret-free `console.log('[rollout-guardrail]', {...})`:
  - no-active path (:70): `{ active: false }` before the 200 return.
  - active path (:86–96): `{ active: true, rolloutId: active.id, state: after.state, percent: after.percent, rolledBack: rolledBack !== null, verdict: evaluation.verdict }` before the 200 return.
  Verdict/state/ids/counts ONLY (C-1). Leave the 401/503/405 paths silent (they are pre-auth / no-op —
  the point is observing RUNS, not rejections).

### D — docs / seal / count
- Files under `api/**` (ReplayAuditRepository, rollout-guardrail, and the new test) are SEALED codeAreas
  → if comments change, honor the S34-1 reseal budget (AST `removeComments` per S35-1); bump docVersion.
- If a narrative tab described the guardrail as silent or the audit stamp as absolute, refine it; two-commit
  seal + `check:doc-drift` `[OK]`.
- Recount (sharded 1/2 + 2/2, sum): expect 1965 + the cross-pin test + the relativeTime test(s). Coverage
  floor holds/ratchets, never down.

## 4 · SELF-VERIFY (paste it)
1. `git rev-parse origin/master` = `329ea64…` at start.
2. The cross-pin test GREEN; show it fails if one literal is edited (flip one to `'canary2'` locally,
   watch it RED, revert) — proof the pin has teeth.
3. `relativeTime` unit test GREEN (tr + en buckets + empty→'').
4. The guardrail diff = ONLY the two `console.log` additions (no auth/actuator/body change); grep the file
   for `CRON_SECRET` proximity to the new logs = none (C-1).
5. Full sharded count + `check:doc-drift` `[OK]` + rev/reseal proof if comments moved.
6. Remote HEAD after `--no-ff` merge + push.

## 5 · REPORTING CONTRACT
Report the anchor; each sub-phase diff; the cross-pin has-teeth demonstration; the guardrail no-secret proof;
count/rev/reseal; pushed HEAD. Architect RULE-25 review: independent recount, the cross-pin teeth re-check,
and a grep confirming the guardrail logs carry no secret. (The guardrail run-log becomes visible in Vercel
runtime logs on the next authed cron run — the Architect will confirm it there once it fires, closing the
CRON_SECRET observability gap for real.)

<!-- END · claude-code-PHASE-SWEEP-1-canary-pin-audit-time-guardrail-log · v1 · 2026-07-11 -->
