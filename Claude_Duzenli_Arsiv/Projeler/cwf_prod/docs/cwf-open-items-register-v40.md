# CWF — Open Items Register · v40

<!-- cwf-open-items-register-v40 · rev 40 · 2026-07-12 · Supersedes v39 (immutable).
     SESSION 38 SWEEP (owner-requested full walkthrough): two intense working days folded in.
     VERIFIED FLOOR: origin/master 7f6aeb3 = 2073 tests / 205 files / docVersion rev 70 /
     drift [OK] / CI green (PR flow).
     S38 chain: 415db54 → cefe52e (S38-CLEAN-1) → df18a86 (E-DOC-1: RULE 30 + operator-inbox
     + ADR-006) → 7f6aeb3 (E-HARDEN-1). Master plan = v2 (E reshaped + re-gated). -->

## 0 · VERIFIED FLOOR
`origin/master` = **`7f6aeb3`** · **2073 / 205** · rev **70** · drift `[OK]` · CI green.
**No Operator/DB step pending. No prod action blocking.**

---

## 1 · CLOSED IN S38 (do NOT re-raise)
- **W0.b flake sweep** — clean; the S37-2 pattern had exactly one instance (already fixed).
- **W0.c S38-CLEAN-1** (`cefe52e`) — NAV-STACK-1 DOC-FLIP · STAGES-FIX-1/2 stale annotations ·
  `/dev/admin-preview` quota seam + `??[]` hardening + smoke test.
- **W0.d E.0 diagnosis** (`cwf-E0-superset-diagnosis-findings-v1`) — root cause = personal
  `supersetArmes` missing `backend_id` + 4-server union + name-collision provenance mislabel
  (F-E0-2). Killed the stale seedRules step (rules were SEEDED, 48/31). "Diagnose live, don't
  guess" vindicated twice (register's steps AND the Architect's gateway=4 half-inference).
- **E.1** — personal `supersetArmes` disabled (applied TWICE; the first undone by
  MCP-UI-REWRITE-1, now fixed). **F-E0-2 CLOSED.** Rollback = one statement.
- **E.2** — gateway chain live-verified (search_tools→call_tool→45 datasets) · the OWNER
  authored + published his first governed rule (`superset.gateway_rule/call-tool-request-wrapper`
  running v1) and the next fresh session proved one-attempt `{"request":{}}` (trace `93d277b7`)
  — the governed-knowledge→live-behavior loop field-proven end to end · `search_tools` 5-vs-0
  characterized as QUERY-FORM sensitivity (natural phrase hits, camelCase misses).
- **E-DOC-1** (`df18a86`) — Stream-E changelog · **operator-inbox single-writer mailbox**
  (gitignored, README committed) · **AGENTS.md RULE 30** (dirty-tree tripwire entry-gate +
  Operator-writes-only-to-inbox) · **ADR-006 committed** to `docs/adr/` (was project-side only).
- **E-HARDEN-1** (`7f6aeb3`, FULL, +21 tests, rev 70 reseal) — (A) RULES-CREATE-MISMATCH-1:
  backend derived from KIND server-side, mismatch → 400 at creation, picker backend-scoped,
  inline GateVerdict regression-locked · (B) MCP-UI-REWRITE-1: `mergeConfigUpdate` round-trips
  untouched fields (enabled/backend_id/future keys) · (C) VIZ-GATEWAY-1: `selectToolResult`
  most-recent record-derivable (error-string shadowing), honest-empty preserved ·
  (D) MCP-DISCOVER-ATTR-1: discovery failures attributed by server id+backend (log + span).
- **Master plan v2** minted (E → staged connection consolidation; gate = golden set; ∥ W1).
- **S38-1 standing rule** (owner-approved, both teeth LIVE): Operator prompts carry the
  no-file-lane header + report-only-G-gates line (field-proven: second E.1 report was clean);
  structural side = RULE 30 + the mailbox (the owner's "coordination, not lockout" directive).
- **Process:** PR-fires-CI is the standing flow (workflow triggers only on PR/push to master).
- **Incidents resolved:** ARMES token expiry (owner renewed BOTH personal + global secret);
  Operator fence event (Gemini wrote a changelog entry into the shared tree — handled by AG's
  stash-restore, entry discarded as out-of-lane + premature claim; institutionalized as RULE 30).

---

## 2 · LIVE QUEUE

### 2.1 — OWNER (tomorrow, own pace)
- **Orphan draft archive** (2 clicks): the mismatched `call-tool-request-wrapper` draft
  (backend=armes × kind=superset — the very row class E-HARDEN-1·A now makes impossible).
  Archive, don't delete (history).
- **Golden set 5 → ~20** (GOLDEN-MARK-1 UI; coverage: ARMES core metrics · ≥3 empty≠zero ·
  Turkish routing-tricky phrasings · 1-2 multi-tool). Gates: **E.3** + canary baseline +
  consistency lens + GOLDEN-LOOP-1 value.
- **W0.f prod smokes** (carried): first guardrail cron fire · first L5 rollout (= the
  `CRON_SECRET` positive verification) · routing/quota smokes.

### 2.2 — STREAM E remainder (Architect/Operator; gate = ~20 goldens)
- **E.3 ARMES consolidation** — now LOW risk: the global connection field-proved itself alone
  under the outage; D-fix makes failures attributable; the re-added personal `armesMes` is
  well-formed (`backend_id`, `apiKey`). One open technical question folded into E.3's design:
  the **catalog skew** (one ARMES connection exposed 145 tools, the other 137 — the cutover
  must land on the current/fuller catalog; verify per-connection counts via the D-fix spans
  before disabling anything).
- **E.4 owner smokes** → Stream E exit → **SR-1 trigger fires**.
- **G5 decision** (owner): personal overrides disable → DELETE after E.4 + one clean week.
- **E-polish (small, batchable):** provenance visibility in chat answers (a Superset/
  reporting_mirror attribution chip — the owner saw tool names, not authority) · a governed
  `gateway_rule` teaching search_tools QUERY FORM (natural phrases, not camelCase identifiers)
  — owner-editable data, no code.

### 2.3 — W0 remainder (Architect)
- **W0.e 08 measurement** — read-only telemetry query (session shape); if sessions are short,
  stage 08 CLOSES as a finding.

### 2.4 — W1 · WAVE 2 (Stream C; the next big stream; design notes FIRST)
All of v39 §1.2 carries unchanged (content rewrite F13/14/15/19 with 07/09/10/11/12 depth ·
User-Docs bridge F16/F22 with F42 as the pattern · F23 Tweak IA · F46 Rules split + F26 ·
naming F33/F45 · panel explainers F7/F8/F17/F18/F24/F30/F34/F40 · F38 grounding-catch visual ·
F9-proper source viewer), **now enriched by the S38 live case study** (the owner, as
super_admin, could not complete one rule publish without three stalls):
- **Rules publish flow legibility** — the three-place problem (draft ↔ ✓ready ↔ queue+Publish);
  a guided single-surface flow or wizard strip.
- **"Edit a published rule" affordance** — the amend path exists but hides as "Taban metinden
  taslak oluştur"; surface it as an explicit Edit→new-version action (naming rule applies).
- **"Which backend slice am I in"** — a persistent visible slice label on Rules/Kinds (the
  header selector's effect was invisible; caused two separate confusions in one evening).
- **Draft lifecycle visibility** — a just-created/ready draft must be findable regardless of
  filters (the owner's draft "vanished" twice: unscoped-create now fixed, but filter-hiding
  remains a Wave-2 IA item).
- Cosmetic: the E-HARDEN-1 changelog heading carries a stale "RULE-25 pending merge"
  annotation (the FIX-1/FIX-2 class) — fold into the next doc touch.

### 2.5 — SOTA gaps (unchanged sequencing from the plan; SR-1 dossier GREW in S38)
| Item | Status |
|---|---|
| **Golden set** | 5/20 — in progress (owner) |
| **SEMANTIC-ROUTING-1** | post-E trigger. **S38 evidence added:** cache 104 → 136 rows in ONE day of smokes; per-tool-result re-learn write amplification (same word learned 2-4× per turn); one router-unparseable → 145-tool all-fallback turn; one fabricated-UUID precondition violation (self-corrected) on the Anthropic path. |
| **MEMORY-1** | after W1+E (unchanged) |
| **GOLDEN-LOOP-1** | W2-parallel slot (unchanged) |
| **Consistency lens** | W3 entry, needs goldens (unchanged) |
| **08 measurement** | = W0.e above |
| **F39 / F47 / offline judge (G1)** | W4 / W4 / decide by end of E (unchanged) |

### 2.6 — Small items (do not lose)
- **ADR-005 is repo-absent** (docs/adr now holds 001-004, 006, 007; ADR-006 cites 005 twice).
  Architect authors it (migration-lane: `supabase db push` only, never `apply_migration`) →
  rides the next doc batch.
- **Architect sandbox cannot read GitHub CI** (anonymous API rate-limit) — covered by the PR
  flow + AG confirmation; known verification-surface gap alongside the no-Chromium one.
- **G4** repo-private → `VITE_REPO_PUBLic=false` (unchanged, conditional).

---

## 3 · NEW STANDING RULES / FLOW FROM S38
- **S38-1** (both teeth, live — see §1).
- **PR-fires-CI**: AG opens a PR per phase branch; CI on the PR head is the merge precondition.
- **Changelog-in-branch**: every phase prompt's scope INCLUDES its `.agents/CHANGELOG.md`
  entry (the E-HARDEN-1 lesson — no more dangling DOC-FLIPs; Architect template updated).

<!-- END · cwf-open-items-register-v40 · rev 40 · 2026-07-12 -->
