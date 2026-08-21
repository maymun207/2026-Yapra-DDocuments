# CWF — Open Items Register · v71
<!-- cwf-open-items-register-v71 · 2026-07-30 · closes S70. Supersedes v70.
     S63-2: THIS REGISTER IS SELF-SUFFICIENT. Every open item carries its full
     wording here. Back-pointers only to terminal-marked items. -->

## §0 · FLOOR (verified from a fresh clone at session close)

```
origin/master   523c44b4a893e308462f146d2a52b2aa9c19520c
vitest test files 387   ·   tests 4318   ·   migrations 60   ·   docs/adr 11
docVersion      rev 162 · 2026-07-30
production      dpl_DvKyCx42mrk1jFVe3ZEMQHpzhvJc · READY · target=production · ref=master
```

Zero branches in flight. Zero pending migrations. GOLDEN FREEZE engaged (lifts at A5).

**Merge ladder, S70 (UTC):**

| commit | phase |
|---|---|
| `8434efcc` | Merge UI-CURATE-1 (F218 · F220 · F221 · F210) — owner-verified in production UI |
| `523c44b4` | Merge A9-SECRET-MOVE-1 (data-only migration, 59 → 60) — **APPLIED** by Operator 05:20:47Z |

**Governed data operations through gated surfaces (owner):** 19 `router_proposals`
rejected (F212 disposition; Operator-verified 19/1/0) · `armes-daily-token` store value
updated via MCP Servers panel (the A9 named contingency — see §3).

---

## §1 · LIVE GOVERNED STATE (re-derive from here — NEVER from memory)

```
router.frameRouting = 0 (DARK) · frameEnabled = 1 · enabled = 1
router.learnEnabled = 0 (BRAKED) · contextTurns = 2

tool_category_cache = 2 rows, BOTH pinned (kb7→factory · scrap→metrics), epoch 12
router_proposals = 20 total / 0 pending / 1 accepted / 19 rejected   ← S70 CHANGE
  (reject is terminal-until-reproposed: the panel's own text — "re-proposing later reopens it")

mcp_settings = 3 rows, ZERO credential-bearing entries anywhere        ← S70 CHANGE
mcp_global_settings = 1 row id='global': 'armes' + 'supersetArmes', BOTH apiKeyRef-only
mcp_secrets = 2 rows: armes-daily-token (updated 2026-07-30 by owner, post-incident)
              · supersettoken (2026-07-06)
  ROTATION IS NOW ONE STORED-VALUE UPDATE, no redeploy, no per-user rows.

armes.tool_category = 12 published / 108 slots / 97 distinct / ZERO write tools
armes.tool_annotation = 141 (44 write, in no category, ADR-011)
superset gateway: inner=22 data=11 foreign=11 · backend_tools = 171
entity_registry: factory 17 · line 779 · EQUIPMENT ZERO ROWS (never-discovered; §3 of v70)
backend_entity_layers = 3 rows all enabled; NO `present` column
learnable corpus: 167 tools, 796 entities · synthetic.mode = frame-only (calls ZERO tools)
```

**Corpus-token observation (recorded, not a finding):** the learn-guard corpus renders
as 720 admit tokens / 1018 entity tokens in the panel (token-SET sizes over the 167/796
objects). `kb7` badges *not-in-corpus*, not *entity-name* — the display names of the 796
entities do not produce the token `kb7`. Guard behavior is still correct (kb7 is pinned,
must not be auto-learned); noted for the day entity display-names are revisited.

---

## §2 · WHAT S70 SHIPPED

### UI-CURATE-1 (`8434efcc`)

**F218 CLOSED.** The Accept button's disabled expression (`RoutingTab.tsx:880`) carried the
`?? suggested_category` fallback; the handler (`:409`) did not — an enabled button that
sent no request. Per S69-3 the repair is structural: one `resolved` binding per row feeds
the Select's value, the disabled state, and the handler's ARGUMENT; the handler can no
longer re-derive. Proposal-less rows now disable BOTH Accept and Override (verified live:
`kirmizi`, `veriler`).

**F220 CLOSED (minted in-phase).** Door 4's override reason literal `operator-curated`
existed only server-side — the door had NO client caller: an override the UI could not
exercise. The literal moved to `shared/routerCuration.ts` (single definition), guard
verdict badges render per row (amber, clause-named), and an explicit override path exists
behind a ConfirmDialog that writes the spelled reason into the publish audit.

**F221 CLOSED (minted in-phase).** A door-4 refusal was indistinguishable from a
blind-guard refusal. GET now carries `corpusHealth {loaded, admitTokens, entityTokens}`;
the panel prints it above the queue ("Learn-guard corpus read: 720 admit tokens, 1018
entity tokens"), so every clause decision is visibly decided against a real corpus.

**F210 CLOSED.** Evidence strip prints one merged `Kanıt / Evidence:` list; the
zero-tool warning stays deliberately doubled (affirmative-signal rule).

Owner verified all four in production after a hard refresh (stale-bundle note: the SHA
badge is API data and does not prove bundle freshness).

### A9-SECRET-MOVE-1 (`523c44b4`, migration `20260730120000`)

The OPERATOR-READ-A9-PRE census found the two platform credentials living as RAW copies
inside three users' personal `mcp_settings` rows (6 credential-bearing entries; the
superset bearer identical across all three; the armes credential in two shapes, one
inside a stdio `args` array), while the clean reference layer (global `apiKeyRef` →
`mcp_secrets`, resolved at the `resolveAuthHeader` chokepoint) already existed. Under
`mergeMcpServers` override-by-id-WHOLESALE semantics those raw copies could shadow the
reference layer on the live path.

One data-only migration, one transaction: derive ref names from the global row (never
assumed) + require store rows exist → sync store from personal values IF DISTINCT
(Bearer-stripped) → delete the six personal entries WHOLESALE (a stripped-field survivor
would shadow the global entry and kill auth) → in-block re-scan raising on ANY remaining
raw surface. Value-blind (uuid-stripped grep 0 with positive control 1). Idempotence and
all three abort paths proven twice, independently: AG on a disposable postgres:16, the
Architect on a second one from a fresh clone (byte-identical snapshots on run 2;
rogue-credential tripwire aborted AND rolled back).

Operator applied via `supabase db push`: 6 entries removed, `A9 clean: 0 raw`, second
push "Remote database is up to date". Post-state census: zero raw surface across all rows.

---

## §3 · THE A9 INCIDENT — the falsifiable ruling fell, exactly where it said it would

**Timeline (all UTC, 2026-07-30):** 05:00:30 `[BackendHealth] tick up:2` (armes 141 tools
syncing THROUGH THE GLOBAL REF with the store's 07-27 token) → 05:20:47 apply (STEP 2b
synced `armes-daily-token` := ksadmin's personal value; superset sync was a 0-row no-op,
values equal) → 05:30:05 + 06:01:00 armes DOWN (`Streamable HTTP error: Error POSTing to
endpoint:`) → owner pasted the current token via the gated panel → 06:30:05
`tick { checked: 2, up: 2, down: 0 }`, armes 141 tools + 17 factory + 779 line
re-verified → live turn: KB7 Glazur3 OEE answered with data, evidence
`getFactoryLines ×1 · resolve_time_range ×1 · getDailyOeeValues ×1`.

**What was wrong:** STEP 2b's ruling — "ksadmin's personal value is the demonstrably-live
one" — cited the wrong witness. The 05:00 green tick demonstrated the STORE's value live
(the health cron consumes the global ref), not the personal copy. The sync replaced a
fresh credential with a stale one. The ruling was written as falsifiable with a named
contingency; the probe fell red, the contingency executed, recovery took one gated panel
edit. The store's OLD value was not recoverable (UPDATE, no versioning) — accepted cost,
stated in the migration header before the fact.

**Second observed behavior (worked as designed, recorded for legibility):** the owner's
first retry FAILED even after the token paste — the turn ran while `backend_health` still
recorded armes down from the 06:01 tick, so MCP-WARM-1 W2.4 withheld armes tools; the
model, left with superset's gateway + system tools, honestly answered "no tool resolves
zoneId" with the advisory line. Health-based withholding heals on the next cron tick;
the 06:31 retry succeeded. **A backend recovery is not user-visible until the next health
tick** — a legibility fact, not a defect.

---

## §4 · LEDGER CORRECTIONS — four ledgers, four directions, one week (S70's theme)

1. **F129 RESTORED AND CLOSED.** Silently dropped from registers v69/v70 (GOLDEN-LEDGER
   violation, this register's own defect class). The metric it demanded (Recall@k of the
   routing candidate channel) was in fact DELIVERED as ROUTE-SHADOW's M2
   (`api/cwf/_lib/replay/routeShadowLens.ts:607`). Closed against that evidence.
2. **F122 CLOSED.** The plan carried it as owed; it lives in code with tests —
   `completionGuard.ts:47` ("a transient provider error that an immediate same-provider
   retry has been observed to heal (F122)"), four passing F122-named tests. The PLAN kept
   a closed item open — third drift direction.
3. **F222 (minted, corrected, closed as an event).** AG's MEMORY.md index carried dead
   live-state: 3 "Operator-pending" migrations actually applied, "unmerged" branches all
   ancestors of master (merge-base over 26 remotes), F169 actually closed at rev 143.
   AG re-derived every claim, corrected 7 index entries into an explicit corrections
   section, fixed frontmatter so recall cannot resurrect a dead claim, and adopted the
   derivability rule (§8 S70-1). Fourth drift direction: the compaction promoted
   remembered state into a higher-signal index.
4. **F206 WORDING CORRECTED (and reclassified v1.1).** v70 claimed the behavioural
   consequence "a local-tools-only turn is counted empty and RE-RUN". FALSE for the live
   path: the retry decision reads in-memory `ctx.toolCallCount`
   (`completionGuard.ts:39`), never the durable ledger. The 37-row gap is real but its
   blast radius is measurement/replay integrity only. v1.1.
5. **F177 RECLASSIFIED v1.1.** The 67%/110-of-164 number is a REPLAY COUNTERFACTUAL:
   `stageClarify.ts` returns at `!frameRoutingEnabled` and `router.frameRouting = 0`, so
   the numeric-identifier class blocks nothing a user sees today. Rides the A23 program.
6. **F214 DOWNGRADED (stays v1 as A6, weak-T1).** ADR-011 binds the write lock at the
   outage floor too (`seedExposureOf` filters the floor path), so floor/live divergence
   is a READ-set divergence: wrong availability under outage, never wrong authority.
7. **F203 CLOSED (not-a-defect).** `maymun207@gmail.com` absent from `auth.users`
   (13 rows populated — clean empty≠zero read) is correct: gmail is the GitHub/Vercel
   identity, `ksadmin@ardictech.com` is the app identity; the original mint was
   `runRouterAbReplay.ts` correctly failing closed on the wrong identity. Nothing
   attributes to gmail. Creating the row would add an identity nobody uses.
8. **F212 CLOSED.** Owner rejected all 19 pending proposals via the panel;
   Operator-verified distribution rejected=19 / accepted=1 / pending=0. The Curate
   surface is now authoring-only until learning is un-braked.

---

## §5 · THE v1 SCOPE CUT — ratified R1–R9 (binding; full text in cwf-v1-scope-cut-v1_2)

**Definition:** *v1 is the smallest complete system a Kale operator can rely on safely.*
Tests: T1 SAFE · T2 REACHABLE · T3 DEPLOYABLE. New rules: **R-EXPRESSIBLE** (§8 S70-2)
and **RECOVERY-1** (lost-wording items F118 · F119 · F120 · F135 · BOARD-WALK residuals →
v1.1 with a named conversation-history recovery task).

**The v1 path (revised estimate: 3–4 working weeks; critical path = A4):**

| # | item | status |
|---|---|---|
| ✅ | A1 · F212 disposition | CLOSED |
| ✅ | A9 · mcp_settings secret retirement | CLOSED@evidence (§2/§3) |
| 1 | A2 · F153 — Superset `0.0.0.0` URLs | Kale/ARDIC ops, next |
| 2 | A6 · F214 — outage-floor ↔ live-catalog read-set sync | AG phase |
| 3 | **A4 · MEMORY-1 — FULL program (R8)**: episodic `episodes` table (Postgres, scoped) · multi-signal retrieval into stage 05 (keyword+entity+recency+importance, never vector-only) · forgetting policy day one (TTL/decay/importance) · promotion ONLY through the existing draft→eval-gate→publish path (agent proposes, gate disposes) · admin surface + lens proof. 2–3 phases. Design note in the episodic/semantic/procedural vocabulary (D-1), stating semantic+procedural are ALREADY governed; carries the A23 cross-turn-carrier contract paragraph. **F48 closes with MEMORY-1's evidence.** | critical path |
| 3′ | **B4-lite · RAG integration (R9, PARALLEL)**: the owner's team's EXISTING RAG service (already built, processes uploaded docs, **speaks MCP natively**) connects as a BACKEND — not a pipeline stage (context-rot, routing-bypass, deterministic-stage-06 rationale). Guards: (a) service reachable + docs loaded (team side), (b) ZERO core code — a backend row + domain pack + tool_category only, (c) F207-class usage measurement from day one; query tool should return source attribution or it's a finding. Auth via apiKeyRef→mcp_secrets from birth. Escape: reverts to v1.1 if not ready when A5 completes — the tag date is governed by the critical path. | parallel lane |
| 4 | A5 · freeze lift + gated publishes (viz v4 · `safety.b1_scope` v3 · `tools.rule.1` v2 · `tools.rule.6` v2 = the F138/F139/F140 content) + F133-L5 mint + F83.1 golden sub-items | governed |
| 5 | A7 · B6 minimum docs (+ D-2 human-delegation policy page · D-3 Level-3-with-gated-Level-4 language · **ADR-012 draft**) | docs |
| 6 | A8 · B7 tag + release notes + remote-branch pruning (all 26 remote branches proven merged by F222's measurement) | close |

**v1.1 (named, not lost):** F48-umbrella evolution beyond MEMORY-1 · F83 · F166 (VIZ-BIND)
· F171-B · golden-infra (F142 · BUDGET-HONEST-1 · GOLDEN-ASSIST-2 · SPECIMEN-HEALTH-1) ·
POC-key belt (FENCE-DB-1 already fails closed vs `rsiyilsgclghplpoadlf`; remaining work is
retiring the external POC project) · LANGFUSE-V4-UPGRADE · STAGE-PLAYGROUND · dev-preview
residuals (merged into F196's line) · RECOVERY-1 items · D-4 answer-quality circuit
breaker · F206 · F177 (rides A23) · everything in §7 PARKED.

---

## §6 · WHAT IS LATENT BEHIND A DARK FLAG (carried verbatim in substance from v70 §6)

`stageClarify.ts` → `if (!ctx.frameRoutingEnabled || !frame) return null;` and
`router.frameRouting = 0`: **the entire clarification gate is unreachable in
production.** Latent today: F199 (shipped, dark) · the A23 ⑤/⑥ separation · the scope
question-gate · F191 · everything hanging off `computeTurnClarification`. Any future
brief states reachability (PREMISE BLOCK P-A). `frameRouting` stays DARK; the S68
pre-registered rule stands (M1 = 0 over N ≥ 30 → GO; M1 is 5/52); reopenable only inside
the A23 evaluation.

**A23's PLACE (v70 §7's open question — RESOLVED in S70):** A23 runs as its OWN program
**after B7**, per its §9 build order; the ONLY A23 piece inside v1 is the cross-turn-
carrier CONTRACT PARAGRAPH inside MEMORY-1's design note (the episodic store must not
preclude the carrier's read shape). PB-A rides A23; PB-B still gated on M-C (parked).
CLASS-GATE-1 (the F177 detector fork) filed to B5-b post-v1.

---

## §7 · OPEN ITEMS — FULL WORDING (S63-2)

### QUEUED (= the v1 path, §5 — wording lives there)

**A2/F153 · Superset serves `0.0.0.0` URLs.** Superset's own generated links/assets carry
`0.0.0.0` hosts, unreachable from a user's browser; a Kale install needs the external URL
configured server-side. Ops task (Kale/ARDIC), zero CWF code.

**A6/F214 · The code floor and the live catalog have diverged.** 42 tools present in the
floor and absent live; 20 present live and absent from the floor. ADR-011 binds writes at
the floor too, so this is a READ-set divergence: under DB outage, routing availability
changes materially. F185's own law: the floor is today's state, never a new one.

### PARKED under S69-1 (recorded, not queued — full wording)

**M-C** (provider comparison; the decision it served — frameRouting — is made; must be
re-run only with action-space size controlled: the S66 A/B was confounded, sonnet got all
145 tools via the `isAnthropic` branch while others got 14–74 via semantic filtering) ·
**SYNTH-TRAFFIC-2 / F204** (no lane can produce a full-tool production turn; M-C's hard
precondition) · **F196** (`rule26` CI noise, localised to `rule26-admin.spec.ts`,
reproduced on an untouched anchor; binding posture: a green does not clear a merge, a red
does not block one; now also carries the dev-preview seam residuals: an admin fetch to
`/api/admin/rules?…` in e2e dev-preview hits Vite's transform middleware, oxc parses TS
as JS, and the `<vite-error-overlay>` swallows pointer events for a LATER spec) ·
**F202** (`unknown_tool` rejection makes our mirror define Superset's usable surface) ·
**F208** (`check:doc-drift` detects from the worktree but names culprits from committed
history) · **F211** (31 of 95 frame turns have no `turn_done`; unusable as a
denominator) · **F216** (a preview build cannot express "deliberately incomplete") ·
**F219** (`ChatPreview` dev fixtures greppable in `dist/`; contents harmless today) ·
**F198** (unbounded reads; PostgREST truncates silently at 1000 — **hard precondition
for ANY equipment discovery**) · **DISCOVERY-EXTEND-2** (`static_args jsonb` descriptor
column to carry `showAll` for `getEntities`; decided by the `[Clarify]
layerStatus=declared-empty` counter, which cannot start until frameRouting=1 → bound to
A23; drags F198) · **F184** (behavioural qualifiers in `armes.zone`) · **B5
`factory_registry` drop** · **M-B** · **F178** (completeness guard enforces fill-ness,
not arrival — unbounded delay) · **F179** (synthetic injector has no `forceFlush` call) ·
**F180** (LB-11 tool-output injection hardening unverified — literature weight added by
Dibia ch13, classification unchanged) · **F165** (unbounded "list everything") · **D5**
(chart binding under gateway flattening never observed) · **F189** (no JSON schema on
gateway inner tools) · **F191** (`stageClarify` armes-literal read, latent) · **F207**
(Superset usage ~zero: every observed production turn, including a chart request, went to
ARMES and never entered the gateway — zero `call_tool`, zero `search_tools` **on the
user path**; the S70 incident turn's `call_tool ×1` was the withholding fallback, not
adoption — measure stands and now also guards B4-lite) · **F197's riders** ·
**CLASS-GATE-1** (F177's resolver-vs-IR diagnosis fork; B5-b post-v1) ·
**F-CONTEXTTURNS · F-LEARNENABLED-PROVENANCE** (deliberately uncleaned; append-only
ledger honesty).

### CLOSED IN S70

**F218 · F220 · F221 · F210** (UI-CURATE-1, §2) · **A9** (§2/§3) · **F212** (19/1/0,
Operator-verified) · **F203** (not-a-defect, §4.7) · **F129** (restored + closed vs M2,
§4.1) · **F122** (code evidence, §4.2) · **F222** (corrected + rule adopted, §4.3).

---

## §8 · LAWS MINTED IN S70

- **S70-1 · A LIVE-STATE CLAIM MUST BE DERIVABLE.** Every carried claim about live state
  names a source another lane can re-derive (branches → merge-base; migrations → the
  Operator's read of created objects; findings → the register). A claim without a source
  is not carried. *(AG-side half; adopted by AG as f222-live-state-derivability.)*
- **S70-2 · R-EXPRESSIBLE.** An item whose requirement can no longer be stated cannot
  gate a release; it routes to v1.1 with a named recovery task. Classification is
  falsifiable: recovered wording re-runs T1/T2/T3. *(Architect-side half. Owner-ratified
  as scope-cut R6.)*
- **S70-3 · "DEMONSTRABLY LIVE" MUST NAME THE CONSUMING PATH.** A value is proven live
  only by a read that exercised THAT value through THAT path. The A9 STEP 2b ruling
  cited a green tick that exercised the STORE's value to prove the PERSONAL value live —
  wrong witness, red probe, §3. Same family as S69-6 (reachability) and S65-2 (computed
  evidence), specialised to data provenance.

## §9 · ARCHITECT PREMISE ERRORS IN S70 — four

1. **UI-CURATE C-7/C-3 contradiction** (`chatSurface.ts` both frozen and editable) — AG
   caught pre-build; resolved by ruling C-3 governs.
2. **Reseal-scope gap**: the phase's reseal expectation was computed over EXISTING mapped
   files and missed that a CREATED `shared/` file joins the map — two tabs resealed, not
   one. Caught by the drift gate, absorbed in-phase.
3. **Merge-message arithmetic** ("Three defects on one surface" then a numbered
   "Fourth") — shipped; recorded here as the correction (S37-1: no in-place edits).
4. **The A9 STEP 2b witness error** (§3, → S70-3). Named falsifiable in the artifact,
   fell red in production, recovered by the pre-stated contingency in minutes. This is
   the PREMISE BLOCK epoch working as intended: the error class moved from silent to
   self-announcing.

Also recorded: the initial OPERATOR-READ-A9-F203 census omitted `command/args/env/url`
from its scan vocabulary; the Architect caught its own gap before the phase and re-read
(OPERATOR-READ-A9-PRE) — the stdio `args` credentials only exist in the record because
of that second read. Empty≠zero applies to scan SURFACES too: "absent" from an unscanned
field is not absence.

<!-- END · cwf-open-items-register-v71 · 2026-07-30 · closes S70 -->
