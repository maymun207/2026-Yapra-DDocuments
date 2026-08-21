# CWF — Bootstrap & New-Session Prompt · v44

<!-- CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v44 · rev 44 · 2026-07-15 · Supersedes v43.
     Open S46 with this. Ledger: register v47 (carry-diff inside). Story: KB v44.
     IN FLIGHT: the S45 golden batch (19 staged drafts, consent 12M) was running
     under AG at close — S46's first real event is its VERDICT. -->

## 0 · CONSTITUTION (unchanged + two additions)
PLATINUM · GOLDEN LEDGER · S43-2 FAST-GATE · S43-3 (zero-judgment → machine) ·
S43-4 (Architect orchestrates; ADR-006 rev 2 now COMMITTED law) · S44-1 (one agent
per worktree) · **S45-1 (NEW): every agent-bound output = ONE relay-ready block —
the owner never assembles, orders, or merges parts.** · **S45-2 (NEW): a publish
into a `pick()`-style all-or-nothing kind carries the COMPLETE set, never a
partial (composeSuperset lesson).** Owner tempo: light speed, one pass, running
sync-map with explicit owner action items at every step.

## 1 · FIRST COMMANDS (seconds, no suite)
```bash
cd /tmp && rm -rf cwf_yaprak && git clone -q https://github.com/maymun207/cwf_yaprak.git
cd cwf_yaprak && git rev-parse origin/master   # RECORD (badge at close: fe1fc3e, PUBLISH-SEAM-1)
python3 -c "import json; print(json.load(open('public/architecture/manifest.json'))['docVersion'])"  # ≥ rev 92
ls supabase/migrations | tail -2               # unchanged: …backend_tools + …golden_batch_runs
```
2513 tests unsharded. NO canary residuals from S45 (all closed via owner
screenshots). KNOWN-EXPECTED: first post-publish push-canary = `baseline:absent`
= DOCUMENTED-GREEN.

## 2 · WAKE-UP SEQUENCE
1. **Golden verdict** (AG background run). green → author publish GO with the
   REAL `--golden-run-id` embedded (S45-1: one block). **underpowered → owner
   decision**; recommendation ready: both arms clean + gate green ⇒ consent
   (fabb123b). red → STOP + audit line.
2. **Publish ×19 → verify audit lines** ([Gate] born-loud, revs listed). This
   CLOSES: F110, F111-emission, F83.1-①, SUPERSET-SERVE-1, and the long-deferred
   Superset DB-first activation.
3. **Probes** — texts VERBATIM in register v47 §2: P1 F110/F111 charts ·
   P2 F83.1+chip ON GEMINI (F84 evidence) · P3 Superset first-serve + negative
   control. Owner asks; Architect reads logs/traces.
4. **Owner-requested topic: "3 halka" continuation** (discovery → classification
   → mapping): the S45 explainer is on file as Wave-2 User-Docs raw material;
   likely directions: SR-1 (M3) sequencing, coverage growth (F91), goto-doc icon
   pattern (F42). Do NOT re-explain from scratch — build on the delivered rings.
5. Then spine (register v47 §3): F101 owner Decision → GATE-VISIBLE-1 v2 →
   PLATINUM sweep remainder → EXPLORER → F80 lane → UI mini-batch (F112).

## 3 · THINGS S46'S ARCHITECT GETS WRONG WITHOUT THIS
1. Plan's CREATE = draft-existence for the actor, NOT published-row existence;
   env sanity signal = goldenSet=20 + governed ceiling=12M.
2. composeSuperset (and any `pick()` kind) is per-kind all-or-nothing — S45-2.
3. The seam is `npm run publish:governed` (plan/stage/golden/publish; consent is
   a FLAG; `--as <owner email>`; job = Architect-authored JSON artifact; job v2 =
   cwf-publish-job-…-v2.json, 2 segments + 17 rows). Staged draft ids are in the
   S45 transcript/AG report — stage is idempotent, re-staging is safe.
4. Code floors for viz/b1_scope/gatewayProtocol intentionally stay at
   pre-publish text (reference/outage role) — fold sync into the next FULL phase
   touching those files; do NOT "fix the drift" ad hoc.
5. Verify agent BLOCKAGE claims from code like success claims (S45: two true,
   one false in one dialog).
6. If P3 fails: check `supersetArmes` mcp_settings `backend_id:'superset'`
   backfill (E-stream leftover) BEFORE touching rules.
7. Every close: carry-diff pasted into the new register (GOLDEN tooth #2).

## 4 · LANES & FENCES
Unchanged (v43 §4 verbatim): Operator fence + single-ref; project
`fjbrkimwvtpwoxhziidh` stated in every Operator prompt; AG runs gated-service
scripts per ADR-006 rev 2; raw DB = Operator MCP only; secrets never printed;
machine/AG terminal stays open while a backgrounded consented run is live.

<!-- END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v44 · rev 44 · 2026-07-15 -->
