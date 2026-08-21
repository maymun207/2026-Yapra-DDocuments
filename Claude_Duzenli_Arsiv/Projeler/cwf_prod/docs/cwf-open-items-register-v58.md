# CWF — Open Items Register · v58

<!-- cwf-open-items-register-v58 · rev 58 · 2026-07-21 · Mid-S56 update (the
     "post-FULL-TRACE cleanup" session). Supersedes v57. GOLDEN LEDGER RULE (Altın
     Kural): append-only; items leave ONLY via CLOSED@evidence / SUPERSEDED-BY /
     MERGED-INTO; carry-diff pasted below; no summary-of-summary — every F-number,
     phase, gate, watch, parked entry survives BY NAME with a one-line essence +
     pointer to its last-full-wording version. -->

## VERIFIED FLOOR (v58)
master **`31d456e83643da4f3f00f50505660927d0859719`** · docVersion **rev 127** ·
drift [OK] · ZERO pending migrations. Test floor **3351 tests / 322 files**
(CI-arbitrated, unsharded — S37-2, from FLAKE-SWEEP-1's 5× green). Session actor
map unchanged: Architect=Claude · AG-A/AG-B=Claude Code on AntiGravity (all repo
writes) · Operator=Gemini + Supabase MCP (`supabase db push` only, project
`fjbrkimwvtpwoxhziidh`).

---

## 0 · CARRY-DIFF PROOF (GOLDEN tooth #2) — v57 → v58
Every v57 item accounted for. Terminal markers minted THIS version:
- **F150 → CLOSED@a6fd3df** (v57 §0/§1.4/§6). PHASE OBS-TRACE-2b, PR #90,
  `--no-ff` merge `a6fd3df`. `.rpc(fn, args)` now opens the same `cwf.db.read`
  span via the one `getServiceClient` proxy wrap point — all 11 previously-dark
  stored-procedure sites traced. Stricter-than-`.from()` secret posture (sorted
  arg KEY names only, hard-leak canary test); empty≠zero at the rpc layer
  (`dataShape` prevents a void function's `null` becoming a fabricated
  `row_count:0`); no new `SPAN_` constant; config comment-only. Doc-drift
  resealed rev 126→127 (also resync'd the three doc entries `21ab667`→`49ea01d`,
  which RESOLVED the S55 125→126 manifest watch). FULL-review verified (fresh
  clone, merge-base==anchor, hard-leak test comprehensive, manifest clean reseal).
  RULE-25 verified at `a6fd3df` (2 parents, subject verbatim, rpc code present).
- **FLAKE-SWEEP-1 → CLOSED@31d456e** (NEW this session; was the un-phased S37-2
  cleanup debt "grep for the sync-getBy-after-async pattern elsewhere"). PR #91,
  `--no-ff` merge `31d456e`. Line-level audit of ~600 sync `getBy*` across all 45
  client test files (6 parallel research agents, cross-checked vs component
  source). Exactly ONE live race found+fixed: `replayTab.test.tsx:1136`
  golden-filter chip (`getByRole`→`await findByRole`). The 3 confirmed-hot
  chatShell files traced CLEAN (non-async bodies can't race the unrelated
  `fetchChatProviders` mock) but converted to `await findBy*` per the binding
  mandate — belt-and-suspenders. No retries/setTimeout added; assertion counts
  preserved (241/9/5/12 unchanged); 5× unsharded retry-free green (S55-1). FROM
  this phase: the file-level heuristic (mock + sync query + no findBy) produced a
  FALSE POSITIVE on chatShell — line-level tracing was necessary. Test-only
  surface (4 files, all `src/**/*.test.tsx`), no reseal. FAST-GATE verified
  (S43-2). RULE-25 verified at `31d456e`.
- **F151 (NEW→OPEN)** — admin panels cannot whole-pane scroll: panel roots pin
  `h-full` so `<main>`'s `overflow-y-auto` (the F4 shell fix) never engages;
  overflow is trapped in nested ScrollAreas. Confirmed with rendered evidence
  (owner walkthrough screenshot, Rules tab, reproduces on every tab). NOT a
  reopen of F4 (F4's shell fix stays) — F151 is the panel-layer sibling.
  Design: `cwf-pane-scroll-defect-design-v1` (owner-approved option a).
  In-flight: PHASE PANE-SCROLL-1 (AG-B, branch `pane-scroll-1`, pinned
  `31d456e`). Last-full-wording pointer = the design note + PANE-SCROLL-1 prompt.
- **S55 docVersion watch → RESOLVED** (v57 §4 "NEW watch S55"): OBS-TRACE-2b's
  reseal set all six manifest doc entries to `49ea01d` at rev 127; drift-gate
  green; no straggler `lastSyncedCommit`. Watch closed.
- **Branch cleanup (v57 §4 NEW cleanup + §7.2)** → DONE by AG-B in the
  OBS-TRACE-2b phase: `obs-trace-1/1b/2/3`, `batch-w-1`, `hotfix/f149` deleted
  (all six confirmed merged first). NEW un-deleted branches: `obs-trace-2b`,
  `flake-sweep-1` (post-merge; owner/AG discretion — GitHub hygiene only).
- v57 §1 (SPINE) / §2 (GOLDEN FREEZE) / §3 (M-WAVES) / §4 (PARKED+WATCH+
  BOARD-WALK) / §5 (RULES) / §6 (FINDINGS) — **all carried below BY NAME,
  unchanged except where a terminal marker above applies.**
- **Absent-without-terminal-marker check: EMPTY** — every v57 item is carried
  below by name.

---

## THE-SESSION (S56) — what shipped, in order (append-only narrative anchor)
Boot floor `49ea01d` rev 126 → current `31d456e` rev 127. TWO merges so far +
one phase in flight:
1. **OBS-TRACE-2b** (PR #90) → `a6fd3df` rev 127 — `.rpc()` read tracing; F150
   CLOSED. FULL-TRACE MANDATE now covers `.from()` AND `.rpc()` — no DB read dark.
2. **FLAKE-SWEEP-1** (PR #91) → `31d456e` rev 127 — repo-wide sync-query-after-
   async sweep; the S37-2 cleanup debt CLOSED.
3. **PANE-SCROLL-1** (F151) — IN FLIGHT with AG-B.

Parallel-lane note: AG-A ran FLAKE-SWEEP-1 while AG-B ran OBS-TRACE-2b. The two
lanes collided on a SHARED `/tmp/cwf_yaprak` working directory (checkouts
interleaved; AG-A's commit briefly landed on master locally). AG-A caught it
pre-push, reset the shared dir, and redid the work in an isolated clone — master
was never corrupted (RULE-25 verified `31d456e`/`a6fd3df` clean). → **S56-1** law
below.

---

## 1 · REMAINING SPINE (owner-locked — carried from v57 §1, unchanged)
1. **Traffic window OPEN → review ~2026-08-02**, DOUBLE-instrumented: keyword
   evidence (ADD-1/proposals/badges) AND IR-1 shadow frames LIVE since
   2026-07-20 10:38Z (`frame=on`). Review = **K1 ratification** (taxonomy §8
   WITH data) + window-pool items (§4). *(Unchanged from v57 §1.1.)*
2. **IR-3 — THE flip** (frame→semantic→keyword primary; clarification ACTIVE;
   COMMAND×F80 honest message). Depends: IR-1 ✓ · IR-2 ✓ · K1. RIDERS riding
   IR-3: `semanticRouter.ts:179-181` stale "only ever floor" comment · F134 ·
   F146 · F147 · enrichment 4th-tier sentence when that tier activates.
   *(Unchanged from v57 §1.2.)*
3. **IR-4** — one page of Path B contract prose inside IR-0. Zero build.
4. **F150 → CLOSED@a6fd3df** (was v57 §1.4 OBS-TRACE-2b). See §0.
5. **MEMORY-1** (episodic; stages 05+14; unblocks F83 arc: KB→web→write-back) →
   **security-cleanup block** (mcp_settings 6/6 raw→apiKeyRef + DB-introspection
   endpoint) → **FINAL combined docs+arch pass**. *(v57 §1.5.)*
6. Carried by name: **F133-L5** (unminted; freeze queue) · **F118 · F119 ·
   F120** where surfaces touched · **F147** (`GroundingViolation.backendId` at
   detection + telemetry emit; rides the IR-3-era api batch) · **F146
   (POST-WINDOW):** probe context + per-layer attribution lens (IR-3 era; probe
   computes NO sticky today). *(v57 §1.6, unchanged.)*

---

## 2 · 🧊 GOLDEN FREEZE BLOCK (unchanged from v57 §2, engaged)
Staged-behind-freeze: **viz v4 · safety.b1_scope v3 · tools.rule.1 v2 ·
tools.rule.6 v2** (F140/F138/F139 STAY OPEN until freeze lifts) + F133-L5 once
minted. Carried whole: quota records (ksadmin replay-exempt/no-limit, audited) ·
GOLDEN-BATCH-2 (F142) · BUDGET-HONEST-1 · GOLDEN-ASSIST-2 · SPECIMEN-HEALTH-1 ·
S50-viz4 job payload ARCHIVED · W3b job SUPERSEDED (kept). Tree-proven boundary
(S54): golden batch fires ONLY for `prompt.segment` (`golden-runs.ts:68`;
`dbConstants.ts:493`). **No golden token spent in S56** (OBS-TRACE-2b +
FLAKE-SWEEP-1 + PANE-SCROLL-1 touch zero prompt.segment surface).

---

## 3 · M-WAVES — carried whole (v53 §3 wording via v54/v55/v56/v57). S56 delta:
none (no M-wave surface touched). The FULL-TRACE observability layer (S55) remains
the live face of every M-wave debug need. Full merge-hash lineage in KB v54/v55.

---

## 4 · PARKED / EXTERNAL / WATCH (carried from v57 §4)
Carried by name: **F134** (annotation unchanged; ALSO an IR-3 rider) · **F135** ·
first live viz-v4-compliant combined chart (freeze-staged) · **F122** first
`finishReason=error` watch · LANGFUSE-V4-UPGRADE · separate-POC-key belt
DEFERRED · **Kale-RAG external arc** (enters as an MCP backend ROW when their
side is ready) · STAGE-PLAYGROUND · **Superset E-activation** (DB-first serve;
seedRules + backend_id backfill — dedicated workstream, owner-scheduled).
- **BOARD-WALK (owner: "ASLA unutma" — NEVER drop; re-raise EVERY round close,
  BY NAME in every carrier):** cards **00·03·07·11·12** re-walked at S55 via the
  LIVE OBS-TRACE StagesDashboard. Remainder cards **01·02·04·05·06·08·09·10·13·
  14** — the OBS-TRACE panel RENDERS them with live data; next re-walk = a
  content/legibility pass. Re-walk at NEXT round close stands. *(F151, once
  fixed, directly improves the legibility of this re-walk.)*
- **Watches (live):** `routing_mismatch` ticks · learn-quality (map ~141 rows;
  suffix/ASCII-variant keys: 'haftalikk','deki','nin','hattının' class) ·
  divergence-badge rates · **WINDOW-POOL:** semantic-router reliability N=2 (one
  1613ms timeout + one provider-error; ladder fell to keyword floor gracefully
  BOTH times; review ~Aug 2, NOT a hotfix) · ASCII-stopword top-up candidates
  beyond 'icin'. *(All unchanged from v57.)*
- **S55 docVersion 125→126 watch → RESOLVED@a6fd3df** (§0). Removed from live
  watches.
- **NEW cleanup (S56):** `obs-trace-2b`, `flake-sweep-1` remote branches not
  deleted post-merge — GitHub hygiene, owner/AG discretion.

---

## 5 · RULES / RECORDS
v57 §5 carried WHOLE by name (FULL-TRACE MANDATE · COMPLETENESS GUARD · ADR-008 ·
G3 SCOPE RULING · ROOT-SPAN I/O nuance · G3 auth two-tier · S55-1 · S55-2 · and
all of v56 §5's carried set: K1/K2/K3 · S52-1/2 · S53-1/2 · HYGIENE SWEEP · SC-1 ·
naming law · Step-0 project-confirm · DB-INTROSPECTION · doc-drift false-alarm ·
RTF recovery · PLATINUM-BREACH-4 · S49-1 · S50-1 · relay identity-tag ·
naming-collision grep · executable acceptance probe · S54-1 · S54-2 ·
S54-3+PLATINUM-BREACH-3 · S54-4 · CHANGELOG ruling · S32-1 wording note).
**S56 adds:**

- **S56-1 (ISOLATED-WORKDIR MANDATE, owner-context, standing):** two AG lanes
  running concurrently MUST NOT share a `/tmp/<reponame>` working directory —
  their branch checkouts/merges interleave and a commit can land on the wrong
  branch (or briefly on master). Each concurrent lane clones into a UNIQUE path
  it owns for that phase only. Born from the S56 FLAKE-SWEEP-1 / OBS-TRACE-2b
  collision. **AG-A's handling is the RATIFIED pattern:** catch pre-push, reset
  the shared dir to `origin/master`, save the diff as a patch, redo in an
  isolated clone rebased onto the new master, re-validate. No lasting damage;
  master verified clean by RULE-25. Every concurrent-phase prompt now carries the
  isolated-workdir line (PANE-SCROLL-1 §P is the first).

---

## 6 · FINDINGS LEDGER Δ (S56)
- **F150 CLOSED@a6fd3df** (OBS-TRACE-2b `.rpc()` tracing; §0). Its S55 wording
  (11 sites, proxy-bypass rationale) lives in register v57 §0/§6.
- **FLAKE-SWEEP-1 CLOSED@31d456e** (§0). The S37-2 origin wording lives in the
  S37-2 memory / KB.
- **F151 OPEN** (whole-pane scroll; §0/§1). Last-full-wording =
  `cwf-pane-scroll-defect-design-v1` + `claude-code-PHASE-PANE-SCROLL-1-v1`.
- **S54-1 tally (carried + S56):** the two-lane critique loop stays load-bearing.
  S56 catches so far: FLAKE-SWEEP-1's own honest finding — the file-level flake
  heuristic (mock + sync query + no findBy) FALSE-POSITIVED on the 3 chatShell
  files; line-level tracing was required to confirm no real race. (Recorded as a
  method lesson: audit races at LINE level, not file level — already the
  FLAKE-SWEEP-1 §3 G1 mandate; now empirically vindicated.)
- Carried unchanged by name from v57 §6: **F148 DELIVERED@3ef02f8** · **F149
  CLOSED@6592a1b** · **OBS-TRACE-1 @3ef02f8** · **OBS-TRACE-1b @d19ed97** ·
  **OBS-TRACE-2 @21ab667** · **OBS-TRACE-3 @49ea01d** · **BATCH-W-1 @dca514c**
  (W-1..W-12 dispositions, all CLOSED; last-full-wording v57 §6-BW) · **F144
  CLOSED@38b3c1b0** · **F145 CLOSED@e8a42833** · **IR-1 @0c0db5c** ·
  **FRAME-OBSERVE-ON CLOSED** · **IR-2 @eddf83e** (SEEDING RULING) ·
  **TOOLMATCH-IA-1 @134c953** · **DATA-AUTHORITY-1 @e1218ba** · **F132 CLOSED** ·
  **F133 PARTIAL (L5)** · **F136 CLOSED** · **F138/F139/F140 OPEN**
  (freeze-staged) · **F142 OPEN→GOLDEN-BATCH-2** · **LOG-2 MERGED-INTO F83 arc**.

---

## 7 · YOUR ACTION ITEMS (owner) — standing, at v58 write
1. **PANE-SCROLL-1 (F151)** — handed to AG-B; on its PR-open + CI-green report,
   Architect does a FULL review + verbatim merge message. No owner action until
   then beyond relaying start (done).
2. **AG-A idle** — no unlocked register work remains for a second lane until K1
   (~Aug 2). Optional: assign the merged-branch cleanup (`obs-trace-2b`,
   `flake-sweep-1`) to AG-A. Not required.
3. **~Aug 2 traffic-window review = K1 ratification** — the main-line next event.
   Far side: IR-3 flip → IR-4 → MEMORY-1/F48 → F83 arc → Kale-RAG row → Superset
   E-activation → security-cleanup → FINAL docs+arch pass.
4. **BOARD-WALK re-walk** at next round close (owner "ASLA unutma").
5. **GOLDEN FREEZE** still engaged — lift only when you say so.
If any response ever contains a manual action, it is surfaced bullet-by-bullet
(the "YOUR ACTION ITEMS" rule).

<!-- END · cwf-open-items-register-v58 · rev 58 · 2026-07-21 -->
