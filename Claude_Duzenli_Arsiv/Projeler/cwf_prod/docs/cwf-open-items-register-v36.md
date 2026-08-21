# CWF — Open Items Register · v36

<!-- cwf-open-items-register-v36 · rev 36 · 2026-07-11 · Supersedes v35.
     Verified floor at close: origin/master 67e35d5 = 1975 tests / 187 files /
     docVersion rev 68 / drift [OK]. Session 36 CLEARED THE POST-PROGRAM POLISH QUEUE:
     CRON_SECRET (owner env) · RULE26-PROVER-1 · P7 (+P7-FIX-1) · SWEEP-1 ·
     HARDEN-GRANTS-1 (authored→Operator-applied→DOC-FLIP). The EAIP-LIFECYCLE program was
     already CLOSED in S35; S36 discharged the remaining §1 polish + the 7-session
     HARDEN-GRANTS-1 deferred. What remains is owner-actionable curation + prod smokes + UI. -->

## 1 · LIVE QUEUE (the polish queue is DONE; this is what's actually left)

**No forced engineering item remains.** The post-program polish queue (GOVERN/KindsTab, P7)
is cleared. The next substantive workstream is **the admin/chat UI work** the owner has
flagged repeatedly — start it diagnosis-first when the owner turns to it.

Everything else below is NOT an unfixed bug — it is verification that RIDES an owner
production action, or correctly-deferred-with-trigger work.

## 2 · RIDES AN OWNER PROD ACTION (not a bug — Architect reads the logs when it fires)

- **Guardrail cron positive confirmation** — CRON_SECRET is SET (owner, S36). The arm is
  armed; SWEEP-1 added a secret-free run-log on both 200 paths, so the next authed cron fire
  (`0 6 * * *` UTC) is now VISIBLE in Vercel runtime logs. Architect confirms `[rollout-guardrail]`
  appears (no-active idle run = `{ active: false }`) at the next fire — closes the CRON_SECRET
  observability gap for real.
- **First L5 rollout prod smoke** — RolloutTab: owner stages a prompt.segment candidate at 0%
  → widens → guardrail evaluate signature → complete = the gated publish. Architect reads the
  create/advance/evaluate/complete signatures from prod logs + the rollout_audit rows.
- **First golden mark prod smoke** — ReplayTab mark: the FIRST mark flips L2 Layer-2 to
  MANDATORY AND seeds the L3 canary baseline. Architect confirms from the next prompt.segment
  publish.
- **Routing / chat-quota curation prod smokes** — ride the owner's first real pin/publish and
  first chat turn (carried, unfired).

## 3 · OWNER-OWNED (surface only if raised)

- Golden-specimen curation (~20 via ReplayTab) · first L5 rollout (RolloutTab) · dark-palette
  sign-off · token rotation on real ARMES 401 · quota floor revisit ·
  `rollout.guardrailMinTurnsPerArm` panel edit (code floor 50 governs; DB row born on first
  governed edit).

## 4 · DEFERRED (do NOT build unprompted)

**REMOVED from deferred this session: HARDEN-GRANTS-1 — DISCHARGED** (applied & live-verified
`67e35d5`; the 7-session default-ACL residue is swept). The kind_drafts-class TRUNCATE, the
universal REFERENCES/TRIGGER, and the fn-EXECUTE default are all closed blanket-by-class.

**NEW deferred (P7-FIX-1 accepted miss):** entity-absence WITHOUT a number ("böyle bir dashboard
yok", "hiç chart yok") is no longer caught at the RUNTIME empty≠zero layer (dropping the bare
absence markers was the fix for the false-positive storm). It stays covered at the PROMPT +
EVAL-GATE layers. Runtime follow-up = a GOVERNED `SUPERSET_BLIND_SPOTS[].forbidden` phrase match
(multiwordForbidden-style, mirroring Check 1's governed-phrase mechanism), NEVER a bare "yok"
marker. Trigger: if prompt+eval-gate prove insufficient for entity-absence in production.

Others (unchanged, carried from v35): Langfuse-host governed SELECTION (trigger: 2nd production
host) · static-CATEGORIES governance · ALWAYS_INCLUDE union rows · router-LLM gateway rewiring ·
Docusaurus · CI-apply · AWS-DENY-1 · Langfuse SSO · governed connectors · backends
enabled/tier/row-CRUD UI · family temperature clamp · client history sender · taskFn/pairedReplay
parity · per-user prompt variants (distinct from L5's one-candidate-by-bucket slice) ·
governed-text sanitizers · time-module/assembly-order governance · METRIC_ALIASES as a governed
row · rollout family extension beyond prompt.segment (trigger: first rule/param the owner wants
sliced). NOTE: "prompt A/B in production" stays DISCHARGED (L5 is that mechanism).

## 5 · CLOSED THIS SESSION (do NOT re-raise)

- **CRON_SECRET (owner env)** — set in Vercel production + redeploy (steps 1–3). Guardrail arm
  armed-by-construction; positive confirmation rides the next authed cron fire (§2), now
  observable via SWEEP-1's run-log.
- **RULE26-PROVER-1** (`7f0dee5`) — the automated headless RULE-26 gate
  (`e2e/rule26-admin.spec.ts` + Playwright + `rule26` CI job on push/PR). The KindsTab "scroll
  defect" is **NOT-REPRODUCIBLE** (phantom; prover GREEN margin=0px @1280 & @1024 with worst-case
  seeded kinds; NO layout change). RULE 26 is now a machine-checked `scrollWidth <= innerWidth`
  invariant, not a manual screenshot. `?tab=` deep-link via `adminTabs.ts` (Tab union DERIVED from
  the runtime TABS whitelist). 1945/184 → 1951/185.
- **P7 + P7-FIX-1** (`5cc642e` → `329ea64`) — Superset empty≠zero **RUNTIME** layer (the 3rd,
  backend-generic, `recordCount === 0` result anchor; orthogonal to the ARMES zone path, no union,
  no regex). Architect RULE-25 caught a CRITICAL-gate calibration DEFECT (bare absence markers
  false-fired compliant empties incl. "No data was returned" — the detail's OWN advice — via
  `\bno\b`); FIX-1 recalibrated to numeric-zero-ONLY (`hasNumericZero || sifir`). Entity-absence
  no-number = accepted miss (§4). 1951 → 1965/185.
- **SWEEP-1** (`373739a`) — three micro-TDs, one merge: (1) canary cross-pin test (export
  `CANARY_MESSAGE_ID`, pin `=== CANARY_AUDIT_MESSAGE_ID`, has-teeth proven; also corrected a FALSE
  docblock that claimed a pin that never existed); (2) audit relative-time (`src/lib/relativeTime.ts`
  via native `Intl.RelativeTimeFormat`, absolute in `title`, both drawers); (3) guardrail
  secret-free run-log on both 200 paths (closes the CRON_SECRET observability gap). 1965 → 1975/187.
- **HARDEN-GRANTS-1** (`cbd657a` authored → `67e35d5` DOC-FLIP applied & live-verified) — default-ACL
  residue swept blanket-by-class: `revoke references, trigger, truncate on all tables in schema
  public from anon, authenticated` + `alter default privileges … tables/functions`. Hygiene-not-hole
  (the classes have NO PostgREST verb → API-unreachable). Operator applied incident-free; G-a residue
  gone (5/5 false), G-b must-not-break (SELECT+INSERT true), G-c defaults hardened (postgres/public
  tables=arwdm, functions=postgres+service_role only), G-d idempotent. The 7-session deferred item is
  DISCHARGED.

## 6 · STANDING RULES DELTA (this session)

- **S36-1 (NEW):** for a CRITICAL validator/gate, RULE-25 review MUST independently probe the
  must-NOT-fire class with phrasings the author's own tests did NOT cover — a gate that is green on
  the author's cases can still false-fire on the recommended-compliant phrasing (P7 fired critical on
  "No data was returned", exactly what its error detail told the model to say). Running the author's
  green tests is not review; running the cases the author didn't imagine is.
- **S36-2 (NEW, process):** before authoring ANY versioned artifact, grep the project files for an
  existing same-name artifact; reuse or version-bump — never mint a colliding version. (Architect
  re-created an existing `claude-code-PHASE-RULE26-PROVER-1-v1.md` this session; owned.)
- **S36-3 (design pattern):** a blanket grant-revoke is SAFE exactly when the privilege has no API
  verb (REFERENCES/TRIGGER/TRUNCATE/fn-EXECUTE-default → no PostgREST verb → API-unreachable), which
  is why it needs no per-table enumeration; a blanket revoke of SELECT/INSERT/UPDATE/DELETE would
  break RLS-governed access. `ALTER DEFAULT PRIVILEGES` retires the recurring per-fn lockdown chore
  (secure-by-default). "empty≠zero" calibrates on the emptiness-as-QUANTITY-ZERO axis, never on bare
  absence-explanation (that IS the compliant answer).
- All prior standings carried (S30-1..3, S31-1, S32-1, S33-1, S34-1, S35-1).

<!-- END · cwf-open-items-register-v36 · rev 36 · 2026-07-11 -->
