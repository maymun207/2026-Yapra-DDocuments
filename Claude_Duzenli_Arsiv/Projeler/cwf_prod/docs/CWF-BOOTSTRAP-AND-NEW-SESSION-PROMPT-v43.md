# CWF — Bootstrap & New-Session Prompt · v43

<!-- CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v43 · rev 43 · 2026-07-14 · Supersedes v42.
     Open S45 with this. Ledger: register v46 (carry-diff inside). Story: KB v43.
     Plans: MP-v4 + runbook v1/v1_2 (M-waves) — spine re-prioritized by owner in S44
     (register v46 §3 is authoritative over the runbook's old §3 order). -->

## 0 · CONSTITUTION (unchanged + one addition)
PLATINUM · GOLDEN LEDGER · S43-2 FAST-GATE (CI = sole test arbiter; never re-run the
suite locally) · S43-3 (zero-judgment plans → machine) · S43-4 (Architect orchestrates
AG+Gemini; owner = Decision/Consent/Test + relay ONLY) · **S44-1 (NEW): one live agent
per worktree — parallel agents ONLY with separate clones/worktrees.** Owner tempo:
light speed, one pass, no re-litigating.

## 1 · FIRST COMMANDS (seconds, no suite)
```bash
cd /tmp && rm -rf cwf_yaprak && git clone -q https://github.com/maymun207/cwf_yaprak.git
cd cwf_yaprak && git rev-parse origin/master   # RECORD (badge at close: ed414a5, THINK-CLAMP-1)
python3 -c "import json; print(json.load(open('public/architecture/manifest.json'))['docVersion'])"  # ≥ rev 89
ls supabase/migrations | tail -2               # unchanged: …backend_tools + …golden_batch_runs
```
Unsharded count from latest master CI (≥2397/245). ONE residual confirm: the ed414a5
push-run's eval-canary conclusion (expected green, `compared` or `advisory` arm — a
`baseline:absent` after any prompt publish is ALSO documented-green).

## 2 · WAKE-UP SEQUENCE
1. **VIZ-BIND-2** — author the phase prompt (register v46 §3.1: F111 zone-keyed-dict
   chart binding + match.zoneId subset derivation, honest panel kept when no
   discriminator; F107 residue `####`/`<br>`/`*`). AG's next build.
2. **OBS-LEGIBILITY-1 design note** — Architect-authored, owner flagged "çok kritik"
   (v46 §3.2 scope; the wrong-trace anecdote is the north star: "find my last A3 in 5s").
3. **b1_scope v2 + SUPERSET-SERVE-1** — write BOTH prompt-edit sets, batch into ONE
   golden run (~10M) + one Consent (v46 §3.3; probe traces 82b380f0/b251b9ea = evidence).
4. **F101 owner Decision** — two payloads side by side, one pick, loser archived.
5. Then v46 §3.5+ (GATE-VISIBLE-1 v2 → PLATINUM sweep remainder → EXPLORER → F80 lane).

## 3 · THINGS S45'S ARCHITECT GETS WRONG WITHOUT THIS
1. **eval-canary is GREEN now** (CANARY-CAP-1 smoke subset; `[EvalCI][Params]` line =
   cap/budget + source + fullSet/picked). `baseline:absent` after a goldenSet or prompt
   change is DOCUMENTED-GREEN — do not "fix" it.
2. **Thinking at 16384 requires maxOutputTokens=32768 published FIRST** — the runtime
   ratio guard (min(thinking, maxOut/2)) otherwise caps loudly (`+capped` source suffix
   in [Params] and the fingerprint). A `+capped` sighting is the guard WORKING.
3. **Prompt-segment publishes gate through a golden run (~10M tokens + Consent)** —
   batch every pending segment edit into one run; never spend a run on one segment.
4. **F108 (48≠43)**: do not adjudicate from the report OR the meta count — the arbiter
   is an Inspect/Replay specimen read. Until then: distribution table, not the total.
5. Gemini reasoning spends from INSIDE maxOutputTokens (F105/F109 mechanics) — any
   output-budget reasoning must account for it.
6. Superset gateway is ALIVE; `search_tools` searches TOOL descriptions, not data —
   a total=0 on a data-vocabulary query is the untaught query-form, not an outage.
7. Every design note/phase prompt: one-line PLATINUM statement. Every close: carry-diff
   pasted into the new register. Both non-negotiable.
8. Log reads: heavy windows time out — scope to deploymentId + narrow `since`, or
   group_by first; query = ONE inner content word.

## 4 · LANES & FENCES
Unchanged (v42 §4 verbatim): Operator fence S40-4 + A-1 single-ref; project
`fjbrkimwvtpwoxhziidh` in every Operator prompt; AG runs gated-service scripts
(ADR-006 as amended); raw DB = Operator MCP only; secrets never printed. Plus S44-1
(worktree rule) and the S44-observed keeper: an agent refusing side-channel master
orders until owner-direct confirmation is a reflex to PRESERVE, not train away.

<!-- END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v43 · rev 43 · 2026-07-14 -->
