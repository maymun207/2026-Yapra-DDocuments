# CWF — Open Items Register · v34

<!-- cwf-open-items-register-v34 · rev 34 · 2026-07-10 · Supersedes v33.
     Verified floor at close: origin/master b3e8148 = 1853 tests / 174 files /
     docVersion rev 63 / drift [OK]. -->

## 1 · LIVE QUEUE (committed order)

**Q-NEXT — L5 PROGRESSIVE DELIVERY**: the actuator L3 deliberately did NOT build — a red
canary is a SIGNAL; acting on it (halt / rollback / progressive %-slice promotion,
%0 slice = de-facto staging) is L5's charter. Diagnosis-first design note at CURRENT HEAD.

**GOVERN polish** — KindsTab scroll defect (reproduce headlessly per RULE 26 FIRST).
**P7** — Superset empty≠zero 3rd (runtime) layer, no fragile regex.

## 2 · MICRO-TD (attach to a legit open, don't open for them)

- **`'canary'` literal cross-pin (standing):** `ReplayAuditRepository`'s private mirror
  const ↔ `eval-ci.ts`'s `CANARY_AUDIT_MESSAGE_ID` — still no cross-pin test; neither
  file was opened in S34. Fold on the next legit open of either.
- **Stale-posture sweep (NEW, from the L4 flip's finding-2):** GOLDEN-MARK-1
  "AUTHORED, Operator-pending" comments are factually stale since the golden apply —
  `shared/grantPolicy.ts:55` (GOLDEN_SPECIMENS row), the `shared/dbConstants.ts` golden
  block (~:108), two api docblocks, and the governance-model.html status badges. None
  trips a gate. Flip on the next legit open of each file / the next at-altitude redraw.
  REMEMBER S34-1: flipping the .ts comments WILL drift the content-hash seal — budget
  the reseal in the same phase.
- **Routing curation prod smoke (NEW):** rides the owner's FIRST real pin/draft/publish
  through the panel — Architect reads Vercel prod logs (draft PUT 200 / publish 200 /
  epoch advanced / audit row born). No synthetic exercise before then.
- Chat-quota prod smoke (one owner turn; the L2 prompt smoke rides the same turn).
- Golden prod smoke: rides the owner's FIRST mark (+ next prompt.segment publish takes
  the Layer-2 MANDATORY arm).
- Audit-drawer past-relative time polish.

## 3 · OWNER-OWNED (surface only if raised)

**Golden-specimen curation — ACTIONABLE** (~20 specimens via the ReplayTab mark
affordance; the FIRST mark simultaneously flips L2 Layer-2 to MANDATORY AND establishes
the L3 canary's first baseline epoch) · dark-palette sign-off · token rotation on real
401 · quota floor revisit.

## 4 · DEFERRED (do NOT build unprompted)

**HARDEN-GRANTS-1** (pg_default_acl class fix — noted SIX sessions running; scope now
also carries the S34 observation: authenticated retains table-level TRUNCATE on
owner-CRUD tables — RLS does not govern TRUNCATE, PostgREST exposes no TRUNCATE verb so
it is API-unreachable; fold the REVOKE TRUNCATE sweep into this item when it opens) ·
Langfuse-host governed SELECTION (ADR-007 trigger: a SECOND production host) ·
static-CATEGORIES governance (L4 §6 trigger: first no-deploy category change need) ·
ALWAYS_INCLUDE union rows (trigger: first no-deploy floor addition) · router-LLM
gateway rewiring · Docusaurus · CI-apply · AWS-DENY-1 · Langfuse SSO · governed
connectors · backends enabled/tier/row-CRUD UI · family temperature clamp · client
history sender · taskFn/pairedReplay parity · prompt A/B in production (L5 decides) ·
per-user prompt variants · any sanitizer on governed/draft text ·
time-module/assembly-order governance · METRIC_ALIASES as a governed row.

## 5 · CLOSED THIS SESSION (do NOT re-raise)

- **L4 ROUTING-DRAFTS end-to-end** — design v1 (owner-ratified D1–D9) → gated prompt →
  AG build `40cecdb` RULE-25 PASS (independent recount 1853/174; 9 byte-pins + toolCategories
  all 0-diff; replay.ts hunks scoped to the routing block + the sanctioned fold; six
  deviations accepted incl. two Architect-owned prompt errors) → merge `b4223cd`
  tree-checked (tree == reviewed tip, message verbatim) → deploy READY/production
  sha-matched → **Operator apply incident-free** (one clean db push, schema-read 7/7,
  verifyGrants first-exercise **39/39** with both new anon-UPDATE probes 42501-DENIED,
  second push up-to-date) → **DOC-FLIP `b3e8148`** (11 occurrences / 6 files flipped;
  disclosed material deviation ACCEPTED: reseal rev 62→63 was jointly REQUIRED by the
  artifact's own gates — S34-1 born). **ROUTING LIFECYCLE LIVE** (tables 0 rows at birth).
- **L3 canary live-firing confirm** — the L4 merge push: Actions run `Build and Test @
  b4223cd` completed SUCCESS; Vercel runtime logs literal `GET /api/admin/eval-ci 200`
  (SHA-convergence poll) + `POST 200` (run) at 17:50; timing-safe pass ⇒ both secret
  copies consistent; `goldenSet:absent` arm by construction (set empty) + zero-spend
  timing signature. Fired ROUTINELY again on the flip push (18:22, GET+POST 200) —
  the canary is now business-as-usual, no standing confirm item remains.
- **authorityDiff fold micro-TD** — replay.ts:332-338 folded into the canonical
  `shared/authorityDiff` during the L4 legit open; direction semantics byte-verified.
- All prior closes per v33 §CLOSED stand.

<!-- END · cwf-open-items-register-v34 · rev 34 · 2026-07-10 -->
