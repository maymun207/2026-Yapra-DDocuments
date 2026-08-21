# CWF — Bootstrap & New-Session Prompt · v45

<!-- CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v45 · rev 45 · 2026-07-16 · Supersedes v44.
     Open S47 with this. Ledger: register v48 (carry-diff inside). Story: KB v45. -->

## 0 · CONSTITUTION
PLATINUM · GOLDEN LEDGER · FAST-GATE (S43-2) · S43-3 (zero-judgment → machine) ·
S43-4 (Architect orchestrates) · S44-1 **as amended** (one live writer per worktree
INCLUDING background sub-agents) · S45-1 (one relay-ready block) · S45-2 (pick()
kinds = complete sets) · **S46-1** (composition rows → golden run → segment publish;
never one job) · **S46-2** (multi-agent isolation is agent-built: absolute-path
fresh clone + in-clone identity check; [AG-A]/[AG-B] tags + IDENTITY CHECK header
standing) · **S46-3** (phase-spec items verified against live master at authoring) ·
**🧊 GOLDEN FREEZE (owner-legislated, supreme until owner lifts):** zero golden-run
work/tokens/proposals; run 5 + F110 + F111-emission + F83.1-① + viz-v3/b1_scope-v2
staged drafts + P1/P2 + BUDGET-HONEST-1 + GOLDEN-BATCH-2 + GOLDEN-ASSIST-2 all
locked behind it (register v48 §2).

## 1 · FIRST COMMANDS (seconds, no suite)
```bash
cd /tmp && rm -rf cwf_yaprak && git clone -q https://github.com/maymun207/cwf_yaprak.git
cd cwf_yaprak && git rev-parse origin/master   # badge at close: 5cb873f (DOC-FLIP)
python3 -c "import json; print(json.load(open('public/architecture/manifest.json'))['docVersion'])"  # ≥ rev 97
ls supabase/migrations | tail -2   # …seed_state + …domain_rules_one_published_per_key (both APPLIED)
```
2544 tests / 261 files unsharded (CI is the arbiter — local full-suite showed
resource-contention flakes at S46 close, different files each run, CI clean).

## 2 · WAKE-UP SEQUENCE (freeze-independent product work)
1. **F122 hotfix** (S47 first): extend the bounded same-provider retry to
   `finishReason=error` (OBS-3 covers empty-only; live KB7 evidence on file —
   transient error, retry heals). HOTFIX profile.
2. **F123 interim**: stopword guard on learned-map writes (five junk words each
   learned to 8 categories on one turn; compound pollution → 62-tool offers).
   Real fix stays SR-1 (M3).
3. **F81-guard** (EXPLORER leftover, v46 §3.7 wording — missed by the S46 batch,
   honestly carried).
4. **MCP-WARM-1 (F117, owner-approved ahead of golden infra):** mirror-served tool
   definitions · lazy connect at first tools/call · cron backend_health ledger.
   3.92s/turn (35%) at stake.
5. **WAVE2-IA-2 → re-walk** (M1 remainder), then M-waves per register v48 §3.
6. F119 seam archive verb · F120 machine-actor identity · F118 golden coverage
   boundary — slot as small phases where surfaces are touched.

## 3 · THINGS S47'S ARCHITECT GETS WRONG WITHOUT THIS
1. **Never propose golden work** — freeze is owner law; even freeze-adjacent
   (GOLDEN-LOOP-1, CANARY-CHUNK-1) waits. eval-canary itself STAYS ON
   (owner decision; governed caps 3-spec/2M; observed firing in prod).
2. `CWF_REPLAY_TOKEN_BUDGET=1500000` lives ONLY in AG-A's shell env — not code,
   not Vercel. Any future golden run (post-lift) must re-set it or ship
   BUDGET-HONEST-1 first.
3. Staged segment drafts (viz v3, b1_scope v2) PERSIST in DB; re-stage is
   idempotent; do not touch under freeze.
4. SELF_SEED_ACTOR_EMAIL=ksadmin@ardictech.com is LIVE in Vercel prod — machine
   seeds attribute to owner identity until F120; seed_state.outcome carries the
   trigger truth.
5. A NEW [Seed] line on deploy is normal ONLY at a new fingerprint (reference-set
   change); rows>0 with no reference change = investigate (X1 regression class).
6. AG-A's worktree still carries untracked publish-job-s45.json — leave alone.
7. F112's Inspect defect was found already-healed at HEAD; if the owner re-sees
   clipping, it's a NEW instance, not a reopen.
8. Every close: carry-diff pasted into the new register (GOLDEN tooth #2).

## 4 · LANES & FENCES
Unchanged (v44 §4): Operator fence + single-ref fjbrkimwvtpwoxhziidh in every
Operator prompt; db push only; AG gated-service scripts per ADR-006 rev 2; raw DB
= Operator MCP only; secrets never printed; identity-tag protocol on every relay.

<!-- END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v45 · rev 45 · 2026-07-16 -->
