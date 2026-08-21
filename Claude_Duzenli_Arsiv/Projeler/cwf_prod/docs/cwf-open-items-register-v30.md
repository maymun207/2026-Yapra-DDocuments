# CWF — Open Items Register · v30

<!-- cwf-open-items-register-v30 · rev 30 · 2026-07-10 · supersedes v29.
     Session 30 record. Verified floor at close: origin/master 3eb887b (1561 tests / 156 files /
     docVersion rev 57 / drift [OK]); the TRUST-PANEL-1 DOC-FLIP merge lands on top (docs-only —
     count cannot move). -->

## LIVE QUEUE (committed order)

1. **L2 — PROMPT-GOV (+ L3-lite golden-20 as its publish gate)** — NEXT FIRST TASK (design
   note). All prompt core text (identity, safety, ARAÇLAR rules 1–10, output format) becomes
   governed CORE values on the `system` lane (DB-first/code-floor; PROMPT_CORE_REV is already
   content-hash-disciplined — L1). METRIC_ALIASES dedup lands here. HC-1/HC-2 apply in full
   (prompt text is polarity-NORMAL: drafts/preview are fine, unlike authority).
2. **L3 — EVAL-CI full** (golden set + N-rep lens batch + Wilson-CI thresholds as gates).
3. **L4 — ROUTING-DRAFTS** (tool_category_cache draft store; routing lens @preview honest).
4. **L5 — PROGRESSIVE DELIVERY**.
5. **OBS-ENDPOINT-1** (Langfuse host param; https-allowlist + re-init seam + risk acceptance)
   — slots after L2 unless the owner pulls it.
6. **GOVERN polish** — incl. the owner-reported **KindsTab scroll defect** (Architect
   reproduces headlessly per RULE 26 before prompting).
7. **P7** — Superset empty≠zero 3rd (runtime) layer, no fragile regex.

## SMALL / MICRO (attach to a matching phase, do not open standalone)

- **TD-REPLAY-DIFF-FOLD**: `api/admin/replay.ts:332-338` inline authorityDiff → import from
  `shared/authorityDiff.ts` the NEXT time replay.ts legitimately opens (semantic identity
  verified line-by-line at review 2026-07-10; the frozen-path constraint forced the temporary
  duplication — TRUST-PANEL-1 deviation #1).
- **Chat-quota prod smoke** (open, owner-triggered): ONE real chat turn; the Architect reads
  Vercel prod logs — no `[ChatQuotaGate] degraded` line, ledger row created, done-event quota
  snapshot present.
- **Past-relative time polish**: audit drawer renders past timestamps as long dates
  (formatResetDate's relative suffix is future-only — TRUST-PANEL-1 deviation #5). Fold into
  GOVERN polish.

## CLOSED THIS WINDOW (do NOT re-raise)

- **PHASE Q-1 (chat-quota + usage-analytics)** — end-to-end: design v1 (owner-approved) →
  gated prompt → build (1388→1501, +113/+12; 8 disclosed deviations all accepted; review
  caught the 52→55 path-count doc error) → merge `261c969` → **Operator apply run 1** (table +
  5 fns + 3 seeded quota.chat* rows) → **LOCKDOWN INCIDENT** (see below) → live 33/33 →
  DOC-FLIP `24cc1ef` (unsanitized). Chat gate LIVE + metered; fail-open stance is design.
- **Q1-FIX-1 (EXECUTE lockdown, all grantees)** — the incident + fix: Q-1's migration revoked
  EXECUTE from PUBLIC only (**Architect spec regression** — the phase prompt cited the
  pre-FIX-2 pattern 20260707160000:188-191; the standing all-grantees rule existed); Supabase
  pg_default_acl's by-name anon/authenticated grants stayed live; **HARDEN-FN-PROBE-1 caught
  it at the Operator door** (4× LEAK + 1× 23503 INCONCLUSIVE; Operator STOPPED per fence);
  same-day revokes-only forward migration `20260709170000` + the NEW author-time gate
  `migrationFnLockdown.test.ts` (SSOT × migrations-corpus scan; negative fixture = the literal
  faulty Q-1 lines) → merge `54d6f9c` → apply → proacl `{postgres, service_role}` only ·
  **33/33** · tamper-glance 0/0 (exposure window: minutes, zero writes).
- **TRUST-PANEL-1 (Backend Trust console)** — design v1 (owner RATIFIED §2: personal-draft for
  authority REJECTED; parity = A3 lens read-preview + mandatory authorityDiff confirm modal +
  reset-to-reference) → gated prompt → build (1503→1561, +58/+4; 5 disclosed deviations, #1 =
  the anchor lesson: authorityDiff was never a trustSlice export, it lived inline in frozen
  replay.ts — AG authored shared/authorityDiff.ts content-identical, replay.ts byte-untouched)
  → merge `3eb887b` → **Operator apply 36/36** (RLS on / 0 policies / three trust-table probes
  first-exercised and DENIED / audit ledger 0) → DOC-FLIP in flight (prompt handed over).
  TRUST_MANAGE capability live; probe exemption unified away (PROBES_COVERAGE_EXEMPT deleted).
- Q-1 §8 whitelist omissions owned by the Architect (grantPolicy.ts, ChatShell.tsx — both
  spec-required, list incomplete).
- Merge-message convention miss on the Q1-FIX-1 merge (bare default message; content lives in
  the branch commit; no rewrite — standing rule S30-2 born from it).

## NEW STANDING RULES (fold into bootstrap; enforce every phase)

- **S30-1**: security/grant patterns in phase prompts are cited from the family's **LATEST
  fix migration**, never the original — "the newest FIX is the pattern".
- **S30-2**: the Architect writes the **merge-commit message verbatim** in every merge
  instruction; "keep the branch message" is banned phrasing.
- **S30-3**: design-note line-anchors must anchor the **definition site** (grep the actual
  export/impl before claiming a home) — the TRUST-PANEL-1 deviation-#1 lesson, companion to
  the L1 "no free/bedava without proof" rule.

## OWNER-OWNED (surface only if raised)
Dark-palette aesthetic sign-off · supersettoken/armes-daily-token rotation on a real 401 ·
chat-quota floor values revisit (5M/10K/200K) if real usage argues.

## DEFERRED (do NOT build unprompted)
Docusaurus · multi-author CHANGELOG/KB gates · CI-apply (ADR-005 future) · HARDEN-GRANTS-1
(the pg_default_acl class-fix via ALTER DEFAULT PRIVILEGES — noted again during the incident,
still deferred) · AWS-DENY-1 · Langfuse SSO · governed connectors · family-based temperature
clamp · client history sender (>10) · taskFn/pairedReplay parity equalization · backends
enabled/tier/row-CRUD UI (explicit TRUST-PANEL-1 non-goal; needs its own blast-radius design).

<!-- END · cwf-open-items-register-v30 · rev 30 · 2026-07-10 -->
