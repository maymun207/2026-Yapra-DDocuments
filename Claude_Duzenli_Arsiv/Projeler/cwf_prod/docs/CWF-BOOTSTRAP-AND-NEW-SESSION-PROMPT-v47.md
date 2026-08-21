# CWF — Bootstrap & New-Session Prompt · v47

<!-- CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v47 · rev 47 · 2026-07-17 · Supersedes v46.
     Open S49 with this. Ledger: register v50 (carry-diff inside). Story: KB v47. -->

## 0 · CONSTITUTION
PLATINUM (BREACH-3 on record — redesign shipped & live-proven, see register v50 §5) ·
GOLDEN LEDGER · FAST-GATE (S43-2) · S43-3 · S43-4 · S44-1-as-amended · S45-1/2 ·
S46-1/2/3 · S47-1 (precondition line + pre-assigned reseal — field-proven again:
102→103→104→105 with three concurrent artifacts, zero collisions) ·
🧊 **GOLDEN FREEZE unchanged & absolute** (register v50 §2; SR1-W3 is
structurally freeze-clean: ordinary replay, own kind).

## 1 · FIRST COMMANDS (seconds, no suite)
```bash
cd /tmp && rm -rf cwf_yaprak && git clone -q https://github.com/maymun207/cwf_yaprak.git
cd cwf_yaprak && git rev-parse origin/master   # badge at close: fd0be2b (DOC-FLIP SR1-W2)
python3 -c "import json; print(json.load(open('public/architecture/manifest.json'))['docVersion'])"  # ≥ rev 105
ls supabase/migrations | tail -1   # …router_proposals (applied & grants-verified)
```
2685 tests / 273 files unsharded — CI is the arbiter; never full-suite locally as
proof. Remote heads = exactly master.

## 2 · WAKE-UP SEQUENCE
1. **SR1-W3 phase prompt** (S49 opener; author against live master per S46-3):
   REPLAY-A2 routing lens **floor-vs-router A/B on real specimens** (ordinary
   replay, NOT golden) → present evidence to owner → owner review →
   `router.enabled` publish (the single param flip that turns the brain on) →
   **observation window** → learned-map retirement DECISION (decision, not
   execution). F124/F125/F126 terminal markers + router_proposals
   grants-verified→live-verified promotion land here.
2. **WAVE2-IA-2 → re-walk** (M1 remainder), then M-waves per register v50 §3.
3. F119 · F120 (retires SELF_SEED_ACTOR_EMAIL interim) · F118 — small phases
   where surfaces are touched.

## 3 · THINGS S49'S ARCHITECT GETS WRONG WITHOUT THIS
1. **Router is still DARK** (router.enabled floor 0; behavior byte-identical).
   The governed `router.prompt` row IS live (published 04:12Z, rule c1ea1cf6) and
   serves source:db — but the router consuming it runs only when enabled.
2. **router_proposals is EMPTY and must stay empty until enable** — emission is
   semantic-branch-only. A pre-enable machine row would be a BUG, not a win.
3. **05:00Z daily cron emits ALWAYS**, pending=0 included
   (`[RouteProposals] daily pending=0 …`). A SILENT 05:00Z is the incident.
4. **Seed-line grammar changed (FIX-1):** `rows=N skipped=M failed=K`; any
   `[Seed] FAILED …` line is born-loud and REAL (silent seed failure is
   structurally impossible now); a total-failure pass releases its claim and
   retries next warm. `[Seed] kind-provisioned kind=…` is the new-kind line.
5. Migration status vocabulary is three-stage: authored → **applied &
   grants-verified** → live-verified (first machine evidence). router_proposals
   sits at stage two; do not write "live-verified" before W3's first machine row.
6. Standing WATCHES (opportunistic): first natural `[LLMRetry] …
   finishReason=error` seals F122; first natural turn logging
   `[MCP Mirror] served 145 defs … (live-fallback: 0)` seals the 3.92s win.
7. After ANY production deploy switch, re-resolve the production deploymentId
   before scoping runtime-log reads.
8. Langfuse team access = ONE shared org-level VIEWER account (no SMTP; Sign In,
   never Sign Up; owner's OWNER account private). CWF needed zero code.
9. Never propose golden work — freeze is owner law; eval-canary STAYS ON
   (observed riding warms 21:48Z and 04:12Z, governed caps holding).
10. Accept-flow law (S41-2, structural): proposals are only ever accepted INTO a
    category (tools min(1)) through the gated publish seam — never author a
    side-door.
11. Every close: carry-diff pasted into the new register (GOLDEN tooth #2).

## 4 · LANES & FENCES
Unchanged (v46 §4): Operator fence + single-ref fjbrkimwvtpwoxhziidh in every
Operator prompt; db push only (ADR-005); AG gated-service scripts per ADR-006
rev 2; raw DB = Operator MCP only; secrets never printed (ADR-007); identity-tag
protocol + S47-1 precondition line on every relay.

<!-- END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v47 · rev 47 · 2026-07-17 -->
