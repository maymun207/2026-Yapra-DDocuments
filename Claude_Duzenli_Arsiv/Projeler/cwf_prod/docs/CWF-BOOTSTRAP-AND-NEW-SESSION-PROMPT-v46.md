# CWF — Bootstrap & New-Session Prompt · v46

<!-- CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v46 · rev 46 · 2026-07-16 · Supersedes v45.
     Open S48 with this. Ledger: register v49 (carry-diff inside). Story: KB v46. -->

## 0 · CONSTITUTION
PLATINUM · GOLDEN LEDGER · FAST-GATE (S43-2) · S43-3 · S43-4 · S44-1-as-amended ·
S45-1 · S45-2 · S46-1 · S46-2 · S46-3 · **S47-1** (state PRECONDITION line on every
cross-lane instruction + pre-assigned reseal responsibility for concurrent phases —
field-proven 3× on day one) · **🧊 GOLDEN FREEZE unchanged & absolute** (register v49
§2; SR-1 is structurally freeze-clean: own kind, ordinary-replay lens).

## 1 · FIRST COMMANDS (seconds, no suite)
```bash
cd /tmp && rm -rf cwf_yaprak && git clone -q https://github.com/maymun207/cwf_yaprak.git
cd cwf_yaprak && git rev-parse origin/master   # badge at close: 4f756bb (Merge SR1-W1)
python3 -c "import json; print(json.load(open('public/architecture/manifest.json'))['docVersion'])"  # ≥ rev 102
ls supabase/migrations | tail -1   # …backend_health (applied & live-verified)
```
2623 tests / 267 files unsharded — CI is the arbiter; never full-suite locally as proof.
Remote heads = exactly master (53-branch sweep S47; keep it that way).

## 2 · WAKE-UP SEQUENCE
1. **SR1-W2 phase prompt** (S48 opener; author against live master per S46-3):
   proposals→DRAFT rows (verify L4 routing-drafts reuse at authoring) · Araç Eşleme
   panel proposal list w/ evidence(query·count·seen, dedupe=counter++) ·
   accept-binds-tools flow (S41-2: no toolless keyword) · gated publish · daily log
   summary [owner: BOTH panel and log] · router-prompt promotion to a governed kind
   (born code-ref → DB-versioned, standard non-golden gate) · **F127.b ride-along**
   (Global Server helper text: blank backend_id = not health-tracked, not
   mirror-served — set explicitly) · DB-side category-description enrichment path.
2. **SR1-W3:** REPLAY-A2 routing lens floor-vs-router A/B on real specimens (ordinary
   replay) → owner review → router.enabled publish (the single param flip that turns
   the brain on) → observation window → learned-map retirement DECISION.
   F124/F125/F126 terminal markers land here.
3. **WAVE2-IA-2 → re-walk** (M1 remainder), then M-waves per register v49 §3.
4. F119 · F120 · F118 — small phases where surfaces are touched.

## 3 · THINGS S48'S ARCHITECT GETS WRONG WITHOUT THIS
1. **Router is DARK** — router.enabled floor 0; master behavior is byte-identical to
   pre-SR1. Enabling is a param publish and happens ONLY at SR1-W3 on lens evidence.
2. Next warm logs `[Seed] domain=system.agent_param rows=3` (three router decls) —
   EXPECTED at the new fingerprint, not an X1 incident.
3. Two standing WATCHES: first natural `[LLMRetry] … finishReason=error` seals F122
   live-positive; first natural chat turn should log
   `[MCP Mirror] served 145 defs … (live-fallback: 0)` — the 3.92s win realized on
   ARMES (cron half sealed: tick 20:00:02Z {checked:2, up:2}).
4. After ANY production deploy switch, re-resolve the current production deploymentId
   before scoping runtime-log reads (S47's "missing tick" lesson).
5. Global MCP servers carry EXPLICIT backend_id — standing data-hygiene rule (F127);
   the cron and mirror-serving are deliberately explicit-only.
6. Cross-lane shell commands must be shell-agnostic (zsh word-splitting incident).
7. Agents adding AGENTS.md rules flag them "proposed RULE"; RULE 34 + RULE 35 are
   ratified and standing.
8. Never propose golden work — freeze is owner law; eval-canary STAYS ON (governed
   caps 3-spec/2M; observed firing 18:55:03Z riding a seed warm).
9. SELF_SEED_ACTOR_EMAIL interim + AG-A's untracked publish-job-s45.json — unchanged,
   leave alone (F120 retires the former eventually).
10. Every close: carry-diff pasted into the new register (GOLDEN tooth #2).

## 4 · LANES & FENCES
Unchanged (v45 §4): Operator fence + single-ref fjbrkimwvtpwoxhziidh in every Operator
prompt; db push only (ADR-005); AG gated-service scripts per ADR-006 rev 2; raw DB =
Operator MCP only; secrets never printed (ADR-007); identity-tag protocol + S47-1
precondition line on every relay.

<!-- END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v46 · rev 46 · 2026-07-16 -->
