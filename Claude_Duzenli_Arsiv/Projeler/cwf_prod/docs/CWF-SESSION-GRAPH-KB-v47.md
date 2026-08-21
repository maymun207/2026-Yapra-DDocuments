# CWF — Session Graph KB · v47

<!-- CWF-SESSION-GRAPH-KB-v47 · rev 47 · 2026-07-17 · Supersedes v46.
     Adds Chapter S48. Chapters ≤S47 live in v46 and earlier — unchanged. -->

## Chapter S48 — "The proposals-loop day" (2026-07-16/17)

**Arc in one line:** SR1-W2 shipped end-to-end in one session — and the session's
real story is that the machinery caught its own architect: a silent seed failure
(F128) became a self-declared PLATINUM breach, a queue-jumping redesign, and a
live-proven self-heal, all before midnight-to-morning turned over.

### 1 · SR1-W2 build (master 4f756bb → 82e7552)
Phase prompt authored against live master with every anchor verified from code
(S46-3): the L4 reuse question was answered AT authoring — routing_drafts is a
personal sandbox, not a proposal store (S33-1 would break); what got reused was the
validation helpers, the capability gate, and above all the accept flow TERMINATING
in the existing governed publish seam so an accepted keyword can only ever land
inside a category that already binds tools (S41-2 by construction, not by review).
AG-A shipped 35 files/+1493: evidence ledger with an atomic RPC (rejected keywords
re-open on fresh evidence; accepted is terminal AT THE DB), dark emission, panel
accept/reject, an always-emitting daily cron, router.prompt as a fourth system-lane
kind with a three-placeholder refine, and the description-enrichment path that flows
to the router prompt with zero new plumbing. One flagged divergence (promptTemplate
optional + floor fallback) — approved: the live path passes the resolved template;
optionality only spares fixtures. FAST-GATE passed; merge message verbatim; CI green
before merge (S37-2 honored).

### 2 · Operator + verifyGrants (the middle word)
Operator G1–G5 ALL PASS — the proacl read came back exactly
`{postgres=X/postgres,service_role=X/postgres}`. AG-A ran verifyGrants (ADR-006
rev 2): 51/51. AG called it "live-verified"; the Architect corrected the record to
**applied & grants-verified** — live-positive for THIS table is the first MACHINE
row, which structurally cannot exist until W3 enables the router. The three-stage
status vocabulary is now a standing wording discipline.

### 3 · F128 — the seed that lied by omission
Post-merge live check found `[Seed] domain=system.router_prompt rows=0` where the
spec expected rows=1. Instead of accepting either story, the Architect read the
code: rows=0 was AMBIGUOUS between "already present" and "publish refused" —
per-row failures were a silent `continue`. The chain: domain_rules hard-FKs
rule_kinds; nothing creates a NEW kind's row (the upsertKind seed scripts were
demoted to unrun wrappers in SELF-SEED-1); resolveKindDef's code fallback masked
the gap; the FK exploded invisibly; completeOutcome consumed the claim forever.
Zero user impact (router dark, floor byte-identical) — but the self-seed design
could not self-configure a new kind and hid it. That is a PLATINUM violation, and
the spec that assumed otherwise was the Architect's own. **PLATINUM-BREACH-3
declared unprompted**, redesign queue-jumped SR1-W3.

### 4 · SR1-W2-FIX-1 — the self-heal (08faed4)
Kind-aware absence-only provisioning from the code registry (an existing DB kind
row — e.g. a RULES-AMEND-1-amended field_spec — is never overwritten); born-loud
per-row failures with an enriched `rows/skipped/failed` summary; total-failure
passes RELEASE their claim instead of completing; and the X2b reclaim was extended
so a COMPLETED claim in the exact total-failure shape self-reclaims — which is
precisely the poisoned row's shape. Terminality of genuine successes pinned by
test ("no delete" assertion). Merged on CI green; owner threw one chat message to
trigger a warm; the logs delivered the exact predicted chain plus a bonus:
`kind-provisioned` → `[Gate] verdict=published rule=c1ea1cf6` → `rows=1 skipped=0
failed=0`, same fingerprint, zero human steps beyond the real-world-test message
(S43-4's one legitimate touchpoint). F128 CLOSED@evidence within hours of birth.

### 5 · DOC-FLIP + hygiene
DOC-FLIP fd0be2b: status flip proven comment-only by the Architect's OWN
SQL-stripped md5 compare (identical hashes), not by trusting the report. Branches
deleted; remote heads = master only; rev 105; 2685 tests / 273 files.

### 6 · Side quest — Langfuse for the team
Power/super users hitting the Langfuse login on Inspect trace links was two auth
systems, not a bug. Decision: ONE shared org-level VIEWER account (OSS RBAC),
no SMTP needed (invites resolve at signup with the exact email); owner's OWNER
account stays private. Attribution traded away knowingly; rotation = removal.
CWF side needed nothing — observability config was already PANEL_ACCESS-gated.

### 7 · Lessons that outlive the session
- A "self-configuring" claim in a spec is a testable claim: the Architect must
  trace the full dependency chain (here: kind row before instance row) before
  writing "expect rows=1". F128 existed because that trace was skipped.
- rows=0 taught the difference between honest emptiness and silent failure INSIDE
  our own tooling — the empty≠zero doctrine applied to ourselves. The fix makes
  the distinction structural: failures are loud, total failures retry.
- The three-stage migration vocabulary (authored → grants-verified →
  live-verified) prevents celebration-inflation in the ledger.
- S47-1 preconditions carried three concurrent artifacts (phase, fix, doc-flip)
  through one evening with zero collisions; reseal pre-assignment worked
  102→103→104→105 without a single manifest fight.

**Floor at close:** master fd0be2b · rev 105 · 2685/273 · router DARK ·
router.prompt governed row LIVE · proposals machinery armed, waiting for W3.

<!-- END · CWF-SESSION-GRAPH-KB-v47 · rev 47 · 2026-07-17 -->
