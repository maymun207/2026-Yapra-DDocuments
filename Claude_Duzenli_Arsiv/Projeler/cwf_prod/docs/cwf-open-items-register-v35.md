# CWF — Open Items Register · v35

<!-- cwf-open-items-register-v35 · rev 35 · 2026-07-10 · Supersedes v34.
     Verified floor at close: origin/master 6b8e3f1 = 1945 tests / 184 files /
     docVersion rev 65 / drift [OK]. Session 35 CLOSED THE EAIP-LIFECYCLE PROGRAM:
     L5 PROGRESSIVE DELIVERY shipped end-to-end in ONE window (design → build eb1e74e-merge
     → Operator apply 42/42 incident-free → DOC-FLIP 6b8e3f1). L1→L5 all ✅. -->

## 1 · LIVE QUEUE (committed order — the program is DONE; this is post-program work)

**Q-NEXT — GOVERN polish**: KindsTab scroll defect. RULE 26 discipline: reproduce the
clip **headlessly FIRST** (the `/dev/admin-preview?view=` seam L5 built is the tool —
programmatic `scrollWidth <= innerWidth` at 1280 AND 1024) before touching layout. A
defect you cannot repro headlessly you cannot prove fixed.

**P7** — Superset empty≠zero 3rd (runtime) layer. Today the Superset zone defends
empty≠zero at 2 layers (prompt + eval-gate) vs ARMES's 3 (prompt + eval-gate + runtime
validator); the runtime validator is still ARMES-zone-specific. Generalize it —
**no fragile regex** (the standing constraint).

## 2 · MICRO-TD (attach to a legit open, don't open for them)

- **`'canary'` literal cross-pin (standing):** `ReplayAuditRepository`'s private mirror
  const ↔ `eval-ci.ts`'s `CANARY_AUDIT_MESSAGE_ID` — still no cross-pin test; neither
  file opened in S35. Fold on the next legit open of either.
- **Rollout curation prod smoke (NEW):** rides the owner's FIRST real staged rollout
  through RolloutTab — Architect reads Vercel prod logs (create 200 → advance → the
  guardrail evaluate signature → complete = the gated publish). No synthetic exercise.
- **Routing curation prod smoke:** rides the owner's FIRST real pin/draft/publish (carried
  from v34, unfired).
- Chat-quota prod smoke (one owner turn; L2 prompt smoke rides the same turn).
- Golden prod smoke: rides the owner's FIRST mark (+ next prompt.segment publish takes the
  Layer-2 MANDATORY arm).
- Audit-drawer past-relative time polish.

## 3 · OWNER-OWNED (surface only if raised)

- **Golden-specimen curation — ACTIONABLE** (~20 specimens via the ReplayTab mark
  affordance; the FIRST mark simultaneously flips L2 Layer-2 to MANDATORY AND establishes
  the L3 canary's first baseline epoch).
- **First L5 rollout — ACTIONABLE** (RolloutTab: stage a prompt.segment candidate at 0% =
  de-facto staging, widen the slice, watch the guardrail, complete = the gated publish).
- dark-palette sign-off · token rotation on real 401 · quota floor revisit ·
  `rollout.guardrailMinTurnsPerArm` panel edit (code floor 50 governs until then — a seed
  is NOT required; the DB row is born by the first governed edit, L1 DB-first/code-floor).

## 4 · DEFERRED (do NOT build unprompted)

**HARDEN-GRANTS-1** (SEVEN sessions running; the standing owner-CRUD grant-hygiene item).
Scope now carries THREE folded observations, all the same default-ACL class, all
API-unreachable via PostgREST:
  (a) `pg_default_acl` grants anon+authenticated EXECUTE on new SECURITY DEFINER fns BY
      NAME — the class the Q1-FIX-2 / L5 at-birth `REVOKE ... FROM public, anon,
      authenticated BY NAME` pattern now pre-empts per-fn, but the *default* is unfixed;
  (b) authenticated retains table-level **TRUNCATE** on owner-CRUD tables (RLS does not
      govern TRUNCATE, no PostgREST TRUNCATE verb);
  (c) **REFERENCES + TRIGGER** metadata privileges survive on anon+authenticated for
      EVERY server-only table (S35 finding — zero migrations revoke them; confirmed
      harmless: neither reads nor writes data, DDL API-unreachable).
When this opens, sweep all three at once.

Others (unchanged): Langfuse-host governed SELECTION (ADR-007 trigger: a SECOND production
host) · static-CATEGORIES governance (trigger: first no-deploy category change) ·
ALWAYS_INCLUDE union rows (trigger: first no-deploy floor addition) · router-LLM gateway
rewiring · Docusaurus · CI-apply · AWS-DENY-1 · Langfuse SSO · governed connectors ·
backends enabled/tier/row-CRUD UI · family temperature clamp · client history sender ·
taskFn/pairedReplay parity · **prompt A/B in production — NOW LIVE via L5** (this deferred
line is DISCHARGED: L5 IS the production prompt-delta mechanism; remove from deferred) ·
per-user prompt variants (a DIFFERENT axis — L5 slices ONE candidate by user bucket, not
per-user distinct variants; stays deferred) · any sanitizer on governed/draft text ·
time-module/assembly-order governance · METRIC_ALIASES as a governed row · rollout family
extension beyond prompt.segment (domain_rules-proper / params — trigger: the first rule or
param publish the owner wants sliced; the substrate already accepts the `family` column).

## 5 · CLOSED THIS SESSION (do NOT re-raise)

- **L5 PROGRESSIVE DELIVERY end-to-end** — design v1 (owner-ratified D1–D10, two
  Architect refinements ratified: Layer-1-only at stage / cron-GET) → gated prompt v1 →
  build merged `eb1e74e` (RULE-25 PASS: 1945/184 independently recounted, all 10 C-B
  byte-pins = 0, both comments-stripped pins IDENTICAL, C-D actuator fixtures verified) →
  Operator apply incident-free **42/42** first-exercise (3× 42501-DENIED incl. the fn
  probe) → DOC-FLIP merged `6b8e3f1` (tree-identity ✓, deploy sha-matched). The
  prompt.segment publish now has a delivery dimension: staged 0% candidate → deterministic
  user slice → Wilson guardrail whose ONLY automated act is rollback-to-0% on
  distinguishable regression (underpowered/unavailable actuate NOTHING). Human
  ROLLOUT_MANAGE arms LIVE; cron arm graceful-off until CRON_SECRET.
- **The G6 living-doc gap** (ROADMAP + ARCHITECTURE had zero L5 content) — repaired in the
  flip's §3 gap-fill.
- **The stale-posture sweep** (4 GOLDEN-MARK-1 comments + 7 governance-model badges) —
  folded into the L5 build G6 and flip, all flipped to applied & live-verified.

## 6 · STANDING RULES DELTA (this session)

- **S35-1 (NEW):** the comments-stripped byte-compare tool MUST be an AST-parse +
  `removeComments` printer (full lexer context), NOT a raw `createScanner` token stream —
  the scanner mis-lexes the region between two adjacent template literals as one token and
  swallows an intervening docblock, yielding a false DIFFERENT. (S35 finding, AG-caught and
  Architect-reproduced; supersedes the naive-scanner implication in S34-1's proof method —
  S34-1's *requirement* stands, only its tool is sharpened.)
- All prior standings carried (S30-1..3, S31-1, S32-1, S33-1, S34-1). The `.ts`-comment
  reseal budget (S34-1) fired correctly this session (rev 64→65, precedent extends 386e92a).

## 7 · CLOSED THE PROGRAM

EAIP-LIFECYCLE (charter = decision-surface inventory v4, HC-1 everything-tweakable /
HC-2 sandbox-parity): **L1 ✅ Q ✅ TRUST-PANEL-1 ✅ L2 ✅ OBS-ENDPOINT-1 ✅ GOLDEN-MARK-1 ✅
L3 ✅ L4 ✅ L5 ✅** — every letter shipped design→build→apply→flip. Post-program surface =
§1 (GOVERN polish, P7) + owner-actionable curation (golden marks, first rollout).

<!-- END · cwf-open-items-register-v35 · rev 35 · 2026-07-10 -->
