# CWF — L5 PROGRESSIVE DELIVERY · Design Note · v1

<!-- cwf-L5-progressive-delivery-design-v1 · rev 1 · 2026-07-10 · Architect-lane
     artifact (NOT for AG). Diagnosed at origin/master b3e8148 (fresh clone,
     independently recounted: 1853 tests / 174 files / docVersion "rev 63 ·
     2026-07-10" / drift [OK]). Charter: decision-surface inventory v4 line 161 —
     "Segment/% publish + guardrail auto-rollback (%0 dilim = staging)".
     The program's LAST letter. -->

---

## §1 Diagnosis (verified at b3e8148 — code, not summary)

**What exists (the substrate L5 stands on):**

1. **Publish today is instant-global on every family.** `domain_rules` publish flips
   the one published pointer; `prompt.segment` rows ride the same lifecycle
   (system lane, `SYSTEM_KIND_IDS.PROMPT_SEGMENT`); routing publish bumps ONE
   epoch. There is no delivery dimension anywhere — inventory v4 line 131 calls
   this out verbatim ("Publish anlık-global").

2. **Arm attribution in production is ALREADY durable — for free.**
   `resolvePromptSegments` computes `ctx.promptRev` from the *actually resolved*
   texts each turn; `configFingerprint` stamps it into the `turn_done` ledger
   event (`telemetry_events`, jsonb `config_fingerprint` column,
   20260709120000); `usage_by_fingerprint()` already aggregates turns/tokens/
   cost **per promptRev**. A sliced cohort serving a candidate prompt produces a
   *different promptRev by construction* — the fingerprint machinery is an
   arm-labeling system that predates the arms. This is the single strongest
   reason L5 is cheap: attribution was built by L1/Q before L5 needed it.

3. **The hot-path hook point is ONE function with identity in hand.**
   `resolvePromptSegments` is called exactly once per turn from
   `stagesModel.ts:100` with the full `TurnContext` (which carries `userId`,
   types.ts:105). Its contract is already "ONE pure chain per segment:
   session-draft preview > DB-published > PROMPT_FLOOR; NEVER throws; no
   module-level cache; resolution lives on ctx for exactly one turn"
   (torn-attestation guard). A rollout tier slots into that chain without
   touching its guarantees.

4. **The verdict machinery is built and pure.** `goldenVerdict()` +
   `wilsonInterval()` (L2/L3) are the deterministic comparison rule;
   `decideCanaryVerdict` (canaryRun.ts) proves the longitudinal-comparison
   pattern; C9 discipline (counts only, never text) is established.

5. **Rollback is structurally safe.** Prior versions are never destroyed
   anywhere in the system (`rule_versions` history; GOLDEN unmark =
   revoke-UPDATE never DELETE). Returning a rollout to 0% reverts arm selection
   to intact prior truth — nothing to restore, nothing to lose.

6. **What is MISSING for a production guardrail:** the `turn_done` ledger row
   does not carry the **empty-completion outcome**. OBS-3 made the empty RATE
   observable in `[LLMFinish]` logs and spans — but spans are the retention-
   bounded debug plane (ADR-004), never a guardrail input. The durable ledger
   has tokens/cost per arm but not the one sacred quality metric. This is the
   only new data L5 needs.

**What does NOT exist and must NOT be rebuilt:**

7. **The deploy axis is Vercel's — bought.** Instant rollback and promote for
   *code deployments* are native Vercel surfaces (`list_deployments` already our
   standing deploy confirm). L5's axis is exclusively the **rows**
   (rule/prompt/param/routing publishes). The bootstrap's warning stands: do not
   conflate the axes. A red canary about a *deploy* is answered by Vercel-native
   rollback (human act, out of scope); a red guardrail about a *publish* is
   answered by L5.

8. **External feature-flag stores (LaunchDarkly, Vercel Edge Config/Flags)
   evaluated and REJECTED** (buy-before-build discharged): our publish axis is
   governed DB rows behind an unbypassable server-side eval-gate with an audit
   ledger. An external flag store splits the SSOT, bypasses the gate, and adds a
   secret/vendor surface — for what is, on our side, a ~10-line deterministic
   bucket function plus one small table. The *expensive* parts of progressive
   delivery (arm attribution, verdict math, audit, version history) we already
   own. Build.

---

## §2 The two named splits (charter requirements, up front)

### §2.1 Determinism split (§7 of the map)

**Deterministic/authoritative (code, exactly correct):**
- **Bucket assignment**: `sha256("<rolloutId>:<userId>")`, first 4 bytes as
  uint32 mod 10000, `< percent × 100` ⇒ candidate arm. Pure, stable (same user
  + same rollout ⇒ same arm every turn — no flapping, no `Math.random`),
  rotating (rolloutId in the hash ⇒ consecutive rollouts don't resample the
  same cohort). Decided ONCE per turn inside `resolvePromptSegments`.
- **Guardrail verdict**: the EXISTING `goldenVerdict()` over per-arm ledger
  counters. Never an LLM judge (RULE 5 / ADR-001 posture).
- **Fail posture**: rollout-state read error or invalid row ⇒ serve **prior
  published truth** (candidate OFF). Full DB outage ⇒ existing floor behavior,
  unchanged. The candidate is never the safe default.
- **The chain**: `lab draft > rollout-candidate (iff bucketed-in) > published >
  floor` — one pure function, the L1 single-chain law.

**Soft/governed (rows, tweakable — HC-1):**
- The rollout row itself (percent, state) — governed data with an audit ledger.
- Guardrail thresholds: `rollout.guardrailMinTurnsPerArm` (power floor) as an
  L1 `agent.param` row (CORE kind, clamped, resettable). The verdict RULE is
  code; its power floor is a governed value.

### §2.2 Blast-radius split (the L3 lesson, sharpened)

L3's lesson: a gate that reds on noise gets disabled. An actuator that ACTS on
noise is strictly worse — it converts noise into a production change. Therefore:

**The automated actuator MAY (and may ONLY):**
- **Rollback the slice to 0%** — i.e., stop serving the candidate and return
  100% of traffic to intact prior truth — and ONLY when the deterministic
  verdict is a **distinguishable regression** on the sacred metric
  (empty-rate, candidate vs prior, Wilson CIs non-overlapping, both arms above
  the governed power floor). `distinguishable=false` = UNDERPOWERED, never
  "safe" AND never "actionable" — the actuator does nothing on it, in either
  direction. This act is safe by construction (§1.5): it restores, it never
  destroys.
- **Freeze** is subsumed: rollback-to-0% IS the halt; a separate "freeze at
  current %" state adds surface without adding safety (a regressing candidate
  frozen at 30% keeps harming 30%).

**Human-only, promotion-tier (HC-2 — the sandbox-parity law's publish tier):**
- Create a rollout (stage a candidate) · advance the % · complete to 100%
  (which executes the real publish through the EXISTING gated path) · cancel.
  Capability `ROLLOUT_MANAGE`, super tier (capability-not-role). The guardrail
  verdict is DISPLAYED at every advance as an advisory gate — an underpowered
  window must not hard-block a human (that's how gates get disabled) — but an
  active distinguishable-regression verdict DOES hard-block advance/complete
  (advancing into a known-red candidate is not a judgment call).

**The automated actuator may NEVER:** advance a %, publish anything, flip the
published pointer, touch the floor, delete/alter version rows, run cross-family,
or act on any arm other than distinguishable-regression.

---

## §3 Committed design (D1–D10)

**D1 — Scope: family-generic substrate, ONE wired family in v1 =
`prompt.segment`.** The rollout table carries a `family` column from birth, but
v1 wires resolution + guardrail + panel for prompt segments only — the
highest-risk publish (global prompt text), the seam with the richest existing
instrumentation (promptRev stamping, L2 golden gate, canary), and ONE call site.
`domain_rules`-proper rollouts: deferred, trigger = the first rule publish the
owner wants sliced (the substrate will already accept the row). Routing:
explicitly OUT — it is the SOFT finds-not-knows axis with its own epoch + audit
+ point-revert already live (L4); its blast radius is relevance, not
correctness. Params: deferred (a temperature rollout is real but the empty-rate
regime coupling — stageStream.ts:72 — makes it a follow-on, not a v1).

**D2 — `publish_rollouts` table (ONE active per family — 409 on second).**
Columns (design altitude): id · family · target (segmentId for v1) ·
candidate_version (FK into the version history — the staged text) ·
prior_version (captured at create for honest display; resolution reads the LIVE
published pointer, never this snapshot) · percent (int 0–100) · state
(`staged | progressing | rolled_back | completed | cancelled`) ·
created_by/timestamps. RLS on, service-role only, owner-CRUD posture; anon/auth
writes revoked; **verifyGrants probe rows + coverage IN-PHASE** (standing rule).
Plus `rollout_audit` append-only ledger (create/advance/auto-rollback/complete/
cancel + the guardrail evaluation rows — rates/counts/CIs only, C9; audit-or-
alarm; machine actor = NULL uuid + `outcome.actor:'rollout-guardrail'` per
S33-1).

**D3 — Staging IS a gated act.** "Create rollout at 0%" runs the candidate
through the SAME publish-shaped gates as a real publish (schema → referential →
behavioral; L2 Layer-2 golden Wilson arm once the golden set exists) — it just
lands as `candidate_version` in rollout state instead of flipping the published
pointer. "Publish ONLY via server-side eval-gate" is preserved: the gate moved
earlier, it did not move aside. %0 = de-facto staging: the candidate is parked,
gated, lab-previewable, serving nobody.

**D4 — Resolution chain (the ONLY hot-path diff).** Inside
`resolvePromptSegments`: after the draft tier, before the published tier —
read the active `progressing` rollout for the family (one small indexed read,
same soft-fail discipline as the params read: error ⇒ tier skipped, `degraded`
NOT set — a missing rollout is absence, not error); if present AND
`bucket(rolloutId, ctx.userId) < percent`, serve `candidate_version`'s text for
that segment; capture `source = 'rollout:<id>'` (the existing
`PromptSegmentSource` string — promptRev then differs by construction, which IS
the arm label). `staged` (0%) never enters the hot path read (percent 0 short-
circuits identically, but state-gating keeps the invariant legible). One turn,
one bucket decision, stamped once — the torn-attestation guard holds unchanged.

**D5 — Replay/canary NEVER consult rollouts.** `runReplayExperiment`,
`pairedReplay`, `canaryRun` all receive `segments` explicitly — byte-
comparability is their contract. The rollout tier lives ONLY in the production
`resolvePromptSegments` path. The canary continues to arm with the LIVE
published set (prior truth during a rollout): the canary guards *deploys*; the
**rollout guardrail** is the new, separate instrument guarding the *candidate*.
Overloading the canary with candidate arms recreates the double-counting trap
L3 §C-C explicitly closed.

**D6 — The guardrail metric = empty-rate per arm, from the LEDGER.** Additive:
`turn_done` payload gains `empty: boolean` (jsonb key — no column DDL; the
OBS-2/3 outcome is already in scope at emit time in stageStream) and ONE new
read-only aggregate `usage_empty_by_fingerprint(p_from, p_to)` returning
(prompt_rev, turns, empty_turns) — SECURITY DEFINER with the standing lockdown
+ EXECUTE probe + verifyGrants row IN-PHASE. This is the ONLY DDL in L5 (one
function; the D2 tables ride the same migration). Ledger-vs-trace law (ADR-004)
respected: the guardrail reads the durable no-PII ledger, never Langfuse.

**D7 — Guardrail evaluation = a gated admin endpoint, actuator inside it.**
`api/admin/rollout-guardrail.ts` (eval-ci posture: capability-gated;
evaluation windowed since last advance): loads per-arm (candidate promptRev vs
prior promptRev) empty counters via D6, feeds `goldenVerdict()`, records an
audit evaluation row, and — iff distinguishable regression — executes the
auto-rollback (state → `rolled_back`, audit row, actor NULL +
outcome.actor:'rollout-guardrail') in the same call. Triggers: the panel
(render + explicit "Evaluate now") and a **Vercel cron entry** (vercel.json —
bought scheduling, buy-before-build) hitting the endpoint on a coarse cadence.
No hot-path evaluation ever (side effects in the turn pipeline banned).

**D8 — Complete-to-100% = the real publish, existing door.** Completing a
rollout executes the standing gated publish (pointer flip, rule_versions,
rule_audit) and closes the rollout (`completed`). One act, one audit trail in
BOTH ledgers (rollout_audit + rule_audit), no parallel publish path — C1
discipline: the rollout machinery never gains its own pointer-flip primitive.

**D9 — Two live variants MAX, by invariant.** One active rollout per family
(D2's 409) ⇒ at most TWO composed prompt variants exist in production (prior +
candidate) ⇒ at most two prompt-cache prefixes. The cache-economics cost of a
rollout equals the cost of the publish it precedes — bounded and named, never
N-way.

**D10 — Panel: RolloutTab in GOVERN** (RULE 26 verified at 1280/1024): active
rollout card (family/target/percent/state/arm counters/latest verdict with
Wilson CIs and the honest UNDERPOWERED phrasing — never "safe"), advance/
complete/cancel affordances (ROLLOUT_MANAGE-gated), the audit drawer, and
staged-candidate diff view (candidate text vs live published — the L2 diff
affordance precedent).

---

## §4 Hidden traps (named before they bite)

1. **`turn_done` soft-fail asymmetry:** the `empty` payload key lands via a
   `record()` that logs-never-throws; a ledger write failure silently thins the
   guardrail sample. Acceptable (it thins BOTH arms identically — the bucket is
   independent of write success) but the evaluation must report raw per-arm
   turn counts so a starved window is visibly underpowered, not quietly green.
2. **promptRev is the arm label — protect its meaning:** the candidate arm's
   promptRev must come from the SAME sha discipline (ordered segment texts). It
   does automatically (D4 serves text through the normal chain) — but any
   future "optimize: skip re-hash when rollout active" would destroy arm
   attribution. Name it as a byte-pin in the phase prompt: promptRev derivation
   untouched.
3. **Prior-arm identification is by LIVE published promptRev at evaluation
   time,** not the create-time snapshot — a mid-rollout independent publish of
   a DIFFERENT segment changes both arms' revs. Committed simplification: an
   independent `prompt.segment` publish while a rollout is `progressing` is
   REJECTED (409, "one prompt delta in flight") — two concurrent prompt deltas
   make the arms unattributable, and the golden gate would double-fire. This is
   the prompt-family sibling of D2's one-rollout invariant.
4. **Bucket by `userId`, never conversation/session:** mid-conversation arm
   flapping pollutes both UX and the per-arm sample. Anonymous/system paths
   (replay, canary, eval-ci) never reach the rollout tier (D5) — no NULL-userId
   bucket case exists in the hot path; if one appears, prior truth (fail-closed
   to safe arm).
5. **`staged` ≠ invisible:** the candidate at 0% must be reachable by lab
   preview (the existing draft-preview machinery already covers "see a
   non-published text in a lab session" — reuse, don't build a parallel
   preview). Production turns stay floor/published/rollout-only.
6. **Cron + trigger-secret:** the Vercel cron hit must ride the eval-ci
   trigger-secret posture (timing-safe, reason-only reject, value never
   echoed). Rate-limit-proof witness pattern (S34) applies to its log
   verification.
7. **S34-1 applies at DOC-FLIP time:** the flip will touch mapped `.ts`
   comments (the `AUTHORED, Operator-pending` stamps D2/D6 introduce) — budget
   the reseal in the flip prompt from the start; comment-only proof =
   comments-stripped byte-compare.
8. **The stale-posture sweep micro-TD attaches here:** the GOLDEN-MARK-1 stale
   "Operator-pending" comments (grantPolicy.ts:55, dbConstants golden block,
   two api docblocks, governance-model badges) — L5's build legitimately opens
   grantPolicy.ts and dbConstants.ts (new caps + tables), so the sweep folds
   into L5's build commit per the register's standing instruction.

---

## §5 Phasing (ONE phase, L4's end-to-end pattern)

**PHASE L5 — PROGRESSIVE-DELIVERY** (single gated AG prompt, then the Operator
door + DOC-FLIP in-window if the S34 rhythm holds):
- G1 substrate: migration (publish_rollouts + rollout_audit + the D6 aggregate
  fn, AUTHORED Operator-pending) + dbConstants + grantPolicy rows (+ the §4.8
  stale-sweep fold) + verifyGrants rows + coverage.
- G2 resolution: the D4 tier in `resolvePromptSegments` + bucket fn (pure,
  shared) + capture/promptRev tests + fail-posture tests + the D5 byte-pins
  (replay/canary/pairedReplay/goldenRun untouched).
- G3 lifecycle endpoints: rollout CRUD (D3 gated create, advance, cancel,
  D8 complete) + `empty` on turn_done.
- G4 guardrail: D7 endpoint + actuator + cron entry + audit rows.
- G5 panel: D10 RolloutTab, RULE 26 evidence.
- Self-verify: independent recount · byte-pins · the D4 chain's truth table ·
  guardrail verdict fixtures (distinguishable-regression fires, underpowered
  does NOTHING, distinguishable-improvement does NOTHING) · 409 invariants.

Prod smoke rides the owner's first real staged rollout (register micro-TD
pattern) — no synthetic exercise.

---

## §6 YOUR ACTION ITEMS

- **Ratify this design (D1–D10)** — specifically: D1's v1 scope
  (prompt.segment only, params/rules deferred with triggers), §2.2's actuator
  boundary (auto-rollback-to-0% is the ONLY automated act), and trap §4.3's
  one-prompt-delta-in-flight 409. On ratification I write the gated AG phase
  prompt.
- No other manual action exists at this point.

<!-- END · cwf-L5-progressive-delivery-design-v1 · rev 1 · 2026-07-10 -->
