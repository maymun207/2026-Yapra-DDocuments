# CWF — Session Graph KB · v32

<!-- CWF-SESSION-GRAPH-KB-v32 · rev 32 · 2026-07-10 · Supersedes v31.
     This window: Session 32 — OBS-ENDPOINT-1 end-to-end + GOLDEN-MARK-1 end-to-end. -->

## §1 Session 32 summary

Opened at floor `171ee43` (v31, verified unmoved). TWO phases shipped end-to-end:
**OBS-ENDPOINT-1** — diagnosis REVERSED the recorded scope (governed param → HARDEN + LAW),
owner-ratified same-turn → gated prompt → AG build merged `6a8bce3` (RULE-25 PASS, +28 tests)
— no Operator door, closed at merge with **ADR-007** in-repo. **GOLDEN-MARK-1** — design v1
(side table, owner-ratified after a §0 write-discipline walkthrough) → gated prompt → build
merged `dabc29e` (RULE-25 PASS, +45/+3, rev 60) → Operator `db push` applied & live-verified
(probes **37/37**, incident-free) → DOC-FLIP merged `494b9ba` (tree-checked). Program spine:
L1 ✅ Q ✅ TRUST-PANEL-1 ✅ L2 ✅ **OBS-ENDPOINT-1 ✅ GOLDEN-MARK-1 ✅**.

## §2 Decisions (owner-ratified)

- **OBS-ENDPOINT-1 scope reversal — `obs.langfuseHost` is env-only BY LAW (ADR-007).**
  Three fatals: (i) `otel.ts` sync/env-only/pre-auth singleton — a DB value cannot reach init
  (D3-i re-confirmed); (ii) **pair-integrity** — the host steers where the env-only
  `LANGFUSE_*` keys are sent, so it inherits the keys' trust tier; (iii) NEW in this
  diagnosis: the host is also the browser target of admin deep-links, and the UI normalizes
  the Langfuse login wall as "expected" — a hostile host = admin-credential **phishing
  surface**. The allowlist-regress argument sealed it: the allowlist must be CODE (infinite
  regress otherwise), so governance would only buy redeploy-free selection within a
  ONE-element approved set = zero value. METRIC_ALIASES polarity-LAW precedent applied.
  **Revisit trigger recorded in ADR-007: a second production host existing** ⇒ a
  governed-SELECTION-among-code-allowlist phase becomes legitimate.
- **OBS-ENDPOINT-1 mechanics:** ONE pure `validateLangfuseHost` (+ `explainLangfuseHostRejection`,
  both views over one internal analyzer — cannot disagree by construction; closed 5-reason
  enum) consumed by ALL THREE readers (enable derivation · otel init baseUrl · admin
  deep-link endpoint, request-time read preserved BY DESIGN); invalid host = ONE loud
  console.error naming the reason, NEVER the value; `shutdownObservability()` re-init seam
  (re-arms the warn guard BEFORE the no-provider early return — test-pinned).
- **GOLDEN-MARK-1 — SIDE TABLE, never a column on `messages`.** Write-discipline grounds:
  messages is single-writer (chat turn, turn-time) server-write-only truth; a marker column
  opens an admin UPDATE path into the truth table — the raw_tool_results-marker category
  error one step removed. The `trace_id` additive-column precedent is INAPPLICABLE
  (turn-produced by the same writer vs post-hoc curation). C1 held absolutely: zero
  messages writes in the diff (grep-proven independently).
- **golden_specimens shape:** PK=message_id FK→messages (CASCADE for hard-deletes only);
  mark=INSERT · unmark=**revoke-UPDATE never DELETE** (the revoked row IS the audit record;
  re-mark clears the revoke pair) · RLS on / ZERO policies / REVOKE-all incl. SELECT (the
  backend_trust_audit posture) · no SQL functions (S30-1 stated, not cargo-culted).
- **`golden:curate` = super_admin ONLY** (TRUST_MANAGE tier): golden-set membership changes
  what GATES a prompt publish — promotion-tier governance, HC-2 parity intentionally N/A.
- **The Layer-2 flip is by construction:** `listGoldenSpecimens()` kept `Promise<string[]>`,
  so `goldenPublishContract.ts` AND `governance.ts` are byte-identical; the owner's FIRST
  mark flips Layer 2 from `goldenSet:absent` loud-skip to MANDATORY with zero further code.
- **Fail-loud golden reads (spec-driven family deviation):** missing client ⇒
  `ReplayUnavailableError`, DB error ⇒ throw — a swallowed error would silently flip
  Layer 2 OFF, the exact fallback the phase bans. Genuinely empty set ⇒ `[]` = the
  contract's defined loud arm. Defensive re-filter skips (`message-missing`/`not-replayable`)
  are loud-logged AND surfaced in the prompt-golden run digest.

## §3 Verified state deltas

| Commit | What | Floor |
|---|---|---|
| `6a8bce3` | OBS-ENDPOINT-1 (+28 tests; ADR-007; no DB) | 1701 / 165 / rev 59 |
| `dabc29e` | GOLDEN-MARK-1 build (+45 / +3) | 1746 / 168 / rev 60 |
| `494b9ba` | GOLDEN-MARK-1 DOC-FLIP (docs-only, 2 files) | **1746 / 168 / rev 60 — floor at close** |

DB deltas (live-verified 2026-07-10): `golden_specimens` table applied via one clean
`db push` — 6/6 columns schema-read · RLS on / 0 policies / 0 rows · privilege-layer
anon+authenticated ALL false incl. SELECT · probe registry **36→37**, first-exercise
anon-UPDATE 42501-DENIED · second push "up to date" (idempotence). Golden set EMPTY —
`goldenSet:absent` loud-skip stands until the owner's first mark.

## §4 Process notes (Architect-owned)

- **Two Architect spec errors owned** (OBS-ENDPOINT-1 deviations, both benign): the drift
  script was written as a guessed `docs:drift` (real: `check:doc-drift`), and the "≥166
  files" expectation contradicted the spec's own test-home directives. → standing rule
  S32-1 below.
- **Author strengthened the spec:** AG added the suffix-spoof validator case
  (`http://localhost.evil.example` — hostname must be EXACTLY localhost) that the spec
  table missed; accepted as a correct hardening.
- **Report-less review works:** the flip "report" first arrived as a mistaken paste of the
  prompt itself; the Architect verified the remote spine directly instead of asking —
  the flip HAD landed, and the full tree-identity check ran from the repo alone (RULE-25's
  point: the repo is the record, the report is a courtesy). The real report arrived later
  and matched the already-completed independent check line-for-line.
- **Operator deviation class extended (benign, env mechanics):** workspace-dir clone
  instead of /tmp (IDE sandbox constraint) + `.env.local` copied into the clone for the
  probe env — the L2 `--env-file` class, recorded unsanitized in the flip payload.
- **Flip scope judgment call (accepted):** AG also flipped two stale L2-section posture
  lines in SKILL-KB that still said Operator-pending — correct: living-doc sections state
  TODAY's truth; only authoring-time records are immutable.
- **Wording nit recorded:** the flip report said "fast-forwarded"; the actual merge is
  `--no-ff` with the verbatim message (correct behavior, loose prose — no action).

## §5 Standing addition

- **S32-1 — Pre-flight commands are grep-verified, never guessed:** every command in a
  phase prompt's pre-flight/self-verify (npm script names, file expectations) is copied
  from the repo's actual `package.json`/layout at diagnosis time. The OBS-ENDPOINT-1
  `docs:drift` guess is the negative precedent.

<!-- END · CWF-SESSION-GRAPH-KB-v32 · rev 32 · 2026-07-10 -->
