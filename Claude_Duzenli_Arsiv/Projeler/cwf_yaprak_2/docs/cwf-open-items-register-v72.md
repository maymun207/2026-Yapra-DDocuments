# CWF — Open Items Register · v72
<!-- cwf-open-items-register-v72 · 2026-07-30 · MID-SESSION CHECKPOINT of S71
     (MEMORY-1A in flight at AG when this was cut — the S71 session-close
     register v73 will supersede with 1A's outcome). Supersedes v71.
     S63-2: THIS REGISTER IS SELF-SUFFICIENT. Every open item carries its full
     wording here. Cut mid-session at the owner's explicit instruction: a
     decision not in the ledger does not exist. -->

## §0 · FLOOR (verified from a fresh clone at checkpoint time)

```
origin/master   5b91d117a90c1510d8b030fb45a8aeed2b15c609
vitest test files 388  ·  tests 4332  ·  migrations 60  ·  docs/adr 11
docVersion      rev 163 · 2026-07-30
production      dpl_ALyhU77Jn4ySoorZzPRUrTahdkyD · READY · target=production
                · SHA=5b91d117 (read live from Vercel)
```

Zero branches in flight on the remote at last scan (merge-base over all
remotes; `phase/memory-1a` exists only in AG's environment, unpushed at
checkpoint). Zero pending migrations. GOLDEN FREEZE engaged (lifts at A5).

**Merge ladder, S71 (UTC):**

| commit | phase |
|---|---|
| `5b91d117` | Merge F214-FLOOR-SYNC-1 — the outage floor becomes a generated mirror of the live catalog |

**Env/deploy events (owner, gated surfaces):** `SUPERSET_PUBLIC_BASE_URL =
https://armes-reports2.ardich.com` added to Vercel production env (redeploy
`dpl_48MC4E2W…` of `523c44b4`, then superseded by the merge deploy above).

## §1 · WHAT S71 HAS SHIPPED SO FAR

**A2 / F153 CLOSED@evidence.** Root cause fixed by ARDIC ops (Superset
external URL configured on armes-reports2). Three independent witnesses:
W1 ops curl end-to-end over `https://armes-reports2.ardich.com:8443/mcp`
(generated dashboard URLs carry the real host, 08:05Z) · W2 Architect public
DNS probe → 88.99.188.61 (ardich.com and ardictech.com verified as SEPARATE
real domains — not a typo) · W3 owner browser render of the Superset Sign-in
page. CWF-side defense (toolResult.ts 0.0.0.0 rewrite) upgraded from
placeholder-mode to real-link-mode by the env fill; the rewrite branch is now
intentionally dormant — if it ever fires again, that is itself a finding
(ops config regression).

**A6 / F214 CLOSED@evidence (`5b91d117`).** The floor (84 tools, 7 dead, 20
missing) is now GENERATED from the live published catalog by a two-mode
script (`sync:routing-floor --report | --write`), byte-stable + idempotent,
reading through the SAME repository read `resolveToolCategories.ts` uses.
Post-sync: floor == live exactly (12 categories · 108 slots · 97 distinct ·
zero write-exposed — independently re-derived by the Architect from the real
classifier rules). Category order preserved (a real order dependence exists:
the router-fallback prompt renders array order). One test legitimately
INVERTED (ROUTE-GOV RED baseline "unreachable TODAY" → pins the repaired
state). ADR-011 guard untouched. Post-merge proof: AG fresh-clone `--report`
CLEAN/exit 0 with the positive control still red-capable; Architect live
reads — deploy READY, live traffic window with ZERO floor-fallback error
lines (clean zero, corroborated by the 11:30:37Z healthy tick:
`checked:2 up:2 down:0`, discovery 17 factory + 779 line, equipment honestly
SKIPPED required-param-no-default). **F214 forward obligation:** A5's
freeze-lift publishes (tools.rule.1/6 v2) re-diverge the floor by exactly
those rules — the follow-up is ONE `--report` + `--write` re-run, recorded in
the script header and in A5's row below.

**A4 / MEMORY-1 OPENED (critical path).** Design note
`cwf-memory-1-design-v1_1` delivered and owner-ratified (v1_1 supersedes v1;
delta = the UI surfaces ship WITH the memory block per owner instruction:
U-1 chat memory chip · U-2 admin Memory tab · U-3 governed params surface —
bound into phases 1B/1C with rendered-evidence proof reads). Committed
rulings inside: episodes user-private (org surface = promotion) · NO vectors
in v1 (multi-signal deterministic; embeddings additive later) · no LLM on the
write path · memory slice enters stage '05' (history), NEVER stage '06' ·
A23 carrier contract satisfied by schema (`(conversation_id, created_at
DESC)` exact-key recency read) · F166 law (memory never a viz data source) ·
usage measured from day one (F207 lesson) · MEMORY-LENS pre-registered
M-MEM2 = zero grounding drift. **PHASE-MEMORY-1A-v1 relayed; AG BUILDING at
checkpoint.** Post-1A sequence: RULE-25 review → GO → Operator apply
(supabase db push) → live `[MemoryWrite]`/`[MemoryForget]` reads → 1B.

## §2 · DECISIONS RATIFIED IN S71 (the reason this checkpoint exists)

**E-1 · Exemplar-weighted retrieval — v1.1 by name (ratified).** Retrieving
successful past examples measurably improves performance (ch6-7-8 crosscheck,
ExpeL line). MEMORY-1's store already carries the distilled exemplar signal
(asked + entities + tools-that-worked + decision); the evolution rides the
store UNCHANGED. Full-transcript few-shot deliberately excluded (raw payloads
never enter episodes).

**E-2 · Fine-tuning — watch with a DUAL trigger (ratified).** Not before:
(1) measured evidence the prompt/catalog ceiling is hit, AND (2) any
comparison run under M-C discipline (action-space size controlled — the S66
confound lesson). Function-calling FT's problem class is already attacked by
deterministic routing/catalog work. Small-model cost note = EAIP-horizon
observation only.

**E-3 · Vocabulary collision (ratified, record).** The ch6-7-8 book uses
"semantic memory" to mean vector-stored-anything; our D-1 sense is
facts/policies (`domain_rules`). Future readers inherit this disambiguation.

**MEASURE-1 (owner-ratified, S71) — the FEEDBACK + HEALTH umbrella, v1.1
HEAD-OF-QUEUE.** One program, one design note, three phases,
PRODUCER-FIRST: Phase 1 FEEDBACK mechanism (`turn_feedback` table keyed by
the ONE turn id — verdict up|down, deterministic reason codes [Yanlış veri ·
Eksik cevap · Yanlış grafik/tablo · Anlamadı · Diğer+text], scrubbed/capped
comment, (message_id,user_id) unique, SERVER_ONLY, chat-surface thumbs +
reason chips, minimal admin queue) → Phase 2 data layer (SQL aggregates over
the EXISTING `tool_call`/`llm_call` ledger rows + governed `health.*`
verdict thresholds + the ONE genuinely new counter: W2.4 withholding
windows) → Phase 3 surfaces (admin "Sağlık" tab, six bands: Omurga ·
Öğrenen yapılar · Bağlantılar[backends incl. RAG] · LLM sağlayıcıları ·
Cevap kalitesi · Kullanım+Ölçüm sağlığı; + "Geri bildirim" queue tab +
dashboard cards). THREE HARD RULINGS: (1) feedback NEVER feeds any automatic
learning path — humans and measurement only; the gate remains the only door
to knowledge (a user may legitimately downvote a CORRECT withholding);
(2) denominator honesty — below a governed N threshold the satisfaction card
renders grey "veri az", and the rate always carries a Wilson interval
(reusing the existing `wilsonInterval`); (3) every 👎 is a golden-specimen
CANDIDATE via one click into the EXISTING golden_specimens curation.
Dashboard laws: verdict-first cards (İyi/İzle/Sorun) from governed
thresholds · empty≠zero ON THE DASHBOARD (unreadable source = grey
"ölçülemedi", never a green zero) · measurement-health is its own band
(known gaps like F211 render as cards) · freshness stamp + source on every
card · zero LLM, read-only, C1 · RAG card comes FREE by construction (R9:
it is a backend, so health/usage/trust machinery applies automatically;
card adds attribution-coverage % and F207-class adoption) · named extras:
secret-freshness card (armes-daily-token age > ~20h = izle — the A9 lesson),
cron last-run-age card, quota fail-open (`cwf.quota.degraded`) + last canary
verdict strip · "PROBLEM verdict → push notification" is a NAMED v1.1+ item,
not scope. **R10 (feedback into v1) was PROPOSED AND WITHDRAWN in-session:**
the unbackfillable-signal argument over-weighted pre-rollout traffic (~3
internal users); the valuable feedback era begins with Kale operators
post-B7, which is exactly when v1.1 opens. scope-cut v1_2 stands UNAMENDED.

**MCP 2026-07-28 spec (read S71) — four dispositions:** (1) B4-lite guard(a)
sharpened: the connection's FIRST proof is our pinned SDK 1.29.0 client
passing initialize → list_tools → call_tool against the team's server; team
directed to build on the new stateless spec. (2) WATCH: ARMES/Superset spec
drift — their upgrade may force our SDK bump; v1.1+, trigger external,
ADR-010 covers the declaration. (3) MCP Apps (servers rendering UI in-host)
= CONSCIOUS NON-ADOPTION under the F187 law — a backend's "I render UI"
declaration files as foreign-surface; the ecosystem standardizing it does
not reopen the law. (4) Tasks extension = design input noted on parked F178
(completeness guard measures fill-ness, not arrival); no work opened.

**Artifacts produced in S71 (registered by name):**
`cwf-memory-1-design-v1` → superseded by `cwf-memory-1-design-v1_1` ·
`cwf-literature-crosscheck-ch678-v1` · `PHASE-F214-FLOOR-SYNC-1-v1` ·
`PHASE-MEMORY-1A-v1`.

## §3 · LIVE GOVERNED STATE (re-derive from here — NEVER from memory)

```
router.frameRouting = 0 (DARK) · frameEnabled = 1 · enabled = 1
router.learnEnabled = 0 (BRAKED) · contextTurns = 2
tool_category_cache = 2 rows, BOTH pinned (kb7→factory · scrap→metrics), epoch 12
router_proposals = 20 total / 0 pending / 1 accepted / 19 rejected
mcp_settings = 3 rows, ZERO credential-bearing entries anywhere
mcp_global_settings = 1 row 'global': armes + supersetArmes, BOTH apiKeyRef-only
mcp_secrets = 2 rows: armes-daily-token (2026-07-30, owner) · supersettoken (07-06)
armes.tool_category = 12 published / 108 slots / 97 distinct / ZERO write tools
armes.tool_annotation = 141 (44 write, in no category, ADR-011)
CODE FLOOR == LIVE CATALOG (F214 sync, --report CLEAN)          ← S71 CHANGE
superset gateway: inner=22 data=11 foreign=11 · backend_tools = 171
entity_registry: factory 17 · line 779 · EQUIPMENT ZERO ROWS (never-discovered)
backend_entity_layers = 3 rows all enabled; NO `present` column
learnable corpus: 167 tools, 796 entities (720 admit / 1018 entity tokens)
synthetic.mode = frame-only (calls ZERO tools)
SUPERSET_PUBLIC_BASE_URL env = SET (real host)                   ← S71 CHANGE
```

**Recorded observation (S71, not a finding):** the first post-F214 health
tick logs `[CatalogSync] backend=armes tools=141 missing=4` — mirror rows
flagged missing, consistent with the family of the 7 no-longer-live floor
tools F214 measured; standing mirror behavior, not phase-caused. Watch only.

## §4 · CORRECTIONS (append-only honesty)

1. **v71 §0 docVersion date-string:** v71 wrote "rev 162 · 2026-07-30"; the
   repo manifest at `523c44b4` carried "rev 162 · 2026-07-29". Governing
   value (162) matched; transcription slip, moot at rev 163.
2. **A8 remote-branch count:** v71 said 26; 27 existed pre-merge (F222's
   measurement predated two S70 phase branches), 28 after `phase/f214-…`.
   A8 recounts at execution; all proven ancestors.
3. **S71 Architect premise errors (2):** (i) P-B floor census "80" was a
   regex parser artifact (comment-embedded brackets truncated the match; 4
   tools missed: getFactoryList/getFactoryLines/getZonesWithRecipeId/
   getZonesWithRecipeIdAndZoneTypes) — AG's real-manifest 84 correct; the
   premise block absorbed it as designed. (ii) The F214 §5 post-merge
   `--report` read was self-assigned to the Architect, whose sandbox
   correctly lacks `.env.local` — "demanding a metric from a lens that
   cannot produce it"; corrected at GO by folding the read into AG's lane.

## §5 · THE v1 PATH — current (scope-cut v1_2 stands UNAMENDED)

```
 ✅ A1  F212 disposition            CLOSED (S70)
 ✅ A9  secret retirement           CLOSED@evidence (S70)
 ✅ A2  F153 Superset 0.0.0.0       CLOSED@evidence (S71, three witnesses)
 ✅ A6  F214 floor read-set sync    CLOSED@evidence (S71, 5b91d117)
 ▶  A4  MEMORY-1 FULL (R8)          CRITICAL PATH — 1A AT AG NOW · then 1B
                                    (reader + U-1 chip + U-3 params + LENS)
                                    · then 1C (promotion + U-2 admin tab);
                                    F48 → CLOSED@evidence at 1C
 3′ B4-lite RAG integration (R9)    PARALLEL · team-side readiness · guard(a)
                                    += SDK-1.29.0 handshake proof · escape:
                                    reverts to v1.1 if not ready at A5
 4. A5  freeze lift + gated publishes (viz v4 · b1_scope v3 · tools.rule.1/6
        v2) + F133-L5 + F83.1 golden sub-items + THE FLOOR RE-SYNC RE-RUN
 5. A7  B6 min docs + D-2 delegation page + D-3 language + ADR-012 draft
 6. A8  B7 tag + release notes + remote-branch pruning (recount at A8)
```

**v1.1 (named, not lost):** **MEASURE-1 (§2) — HEAD OF QUEUE** ·
F48-umbrella evolution beyond MEMORY-1 · **E-1** (rides the store) · F83 ·
F166 (VIZ-BIND) · F171-B · golden-infra (F142 · BUDGET-HONEST-1 ·
GOLDEN-ASSIST-2 · SPECIMEN-HEALTH-1) · POC-key belt · LANGFUSE-V4-UPGRADE ·
STAGE-PLAYGROUND · dev-preview residuals (F196 line) · RECOVERY-1 items ·
D-4 answer-quality circuit breaker · F206 · F177 (rides A23) · "PROBLEM
verdict → push" (MEASURE-1 rider) · everything PARKED below.

## §6 · LATENT BEHIND THE DARK FLAG (carried in substance from v71 §6)

`stageClarify.ts` → `if (!ctx.frameRoutingEnabled || !frame) return null;`
and `router.frameRouting = 0`: the entire clarification gate is unreachable
in production. Latent: F199 (shipped, dark) · A23 ⑤/⑥ separation · scope
question-gate · F191 · everything off `computeTurnClarification`. Any future
brief states reachability (PREMISE BLOCK P-A). frameRouting stays DARK; the
S68 pre-registered rule stands (M1 = 0 over N ≥ 30 → GO; M1 is 5/52);
reopenable only inside the A23 evaluation. A23 runs as its OWN program after
B7; the only A23 pieces inside v1 are the carrier CONTRACT PARAGRAPH in the
MEMORY-1 design note and 1A's `(conversation_id, created_at DESC)` index.
PB-A rides A23; PB-B gated on M-C (parked). CLASS-GATE-1 → B5-b post-v1.

## §7 · OPEN ITEMS — FULL WORDING (S63-2)

### QUEUED (= the v1 path §5; A4 wording lives in the design note v1_1)

*(No other queued items — A2 and A6 closed this session.)*

### PARKED under S69-1 (recorded, not queued — full wording)

**M-C** (provider comparison; must re-run only with action-space size
controlled: the S66 A/B was confounded — sonnet got all 145 tools via the
`isAnthropic` branch, others 14–74 via semantic filtering) ·
**SYNTH-TRAFFIC-2 / F204** (no lane can produce a full-tool production turn;
M-C's hard precondition) · **F196** (`rule26` CI noise, localised to
`rule26-admin.spec.ts`, reproduced on an untouched anchor; a green does not
clear a merge, a red does not block one; carries the dev-preview seam
residuals: admin fetch in e2e dev-preview hits Vite's transform middleware,
oxc parses TS as JS, `<vite-error-overlay>` swallows pointer events) ·
**F202** (`unknown_tool` rejection makes our mirror define Superset's usable
surface) · **F208** (`check:doc-drift` detects from the worktree but names
culprits from committed history) · **F211** (31 of 95 frame turns have no
`turn_done`; unusable as a denominator — renders as a MEASURE-1
measurement-health card) · **F216** (a preview build cannot express
"deliberately incomplete") · **F219** (`ChatPreview` dev fixtures greppable
in `dist/`; harmless today) · **F198** (unbounded reads; PostgREST truncates
silently at 1000 — hard precondition for ANY equipment discovery) ·
**DISCOVERY-EXTEND-2** (`static_args jsonb` descriptor column carrying
`showAll` for `getEntities`; decided by the `[Clarify]
layerStatus=declared-empty` counter, which cannot start until frameRouting=1
→ bound to A23; drags F198; the live tick's honest
`SKIPPED reason=required-param-no-default` line is its running evidence) ·
**F184** (behavioural qualifiers in `armes.zone`) · **B5 `factory_registry`
drop** · **M-B** · **F178** (completeness guard enforces fill-ness, not
arrival — unbounded delay; now carries the MCP Tasks-extension design-input
note, §2) · **F179** (synthetic injector has no `forceFlush` call) ·
**F180** (LB-11 tool-output injection hardening unverified; literature
weight from Dibia ch13, classification unchanged) · **F165** (unbounded
"list everything") · **D5** (chart binding under gateway flattening never
observed) · **F189** (no JSON schema on gateway inner tools) · **F191**
(`stageClarify` armes-literal read, latent) · **F207** (Superset usage ~zero
on the user path — every observed production turn went to ARMES; measure
stands, guards B4-lite, and twins onto the RAG adoption card in MEASURE-1) ·
**F197's riders** · **CLASS-GATE-1** (F177's resolver-vs-IR fork; B5-b) ·
**E-2** (fine-tuning dual-trigger watch, §2) · **E-3** (vocabulary
disambiguation, §2) · **MCP-SPEC-DRIFT watch** (§2 item 2) ·
**F-CONTEXTTURNS · F-LEARNENABLED-PROVENANCE** (deliberately uncleaned;
append-only ledger honesty).

### CLOSED IN S71 (so far)

**A2/F153** (§1, three witnesses) · **A6/F214** (§1, `5b91d117`).

## §8 · LAWS

No new laws minted in S71 to checkpoint time; every prior law survives by
name (v71 §8 + KB). S70-1/S70-2/S70-3 were each EXERCISED live this session
(derivable branch scan · MEASURE-1's R-EXPRESSIBLE framing · the F153/F214
consuming-path witnesses).

<!-- END · cwf-open-items-register-v72 · 2026-07-30 · S71 mid-session checkpoint -->
