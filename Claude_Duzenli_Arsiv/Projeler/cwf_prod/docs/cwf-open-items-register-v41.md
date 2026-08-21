# CWF — Open Items Register · v41

<!-- cwf-open-items-register-v41 · rev 41 · 2026-07-13 · Supersedes v40 (immutable).
     SESSION 39. VERIFIED FLOOR: origin/master b753783 = 2116 tests / 207 files /
     docVersion rev 70 / drift [OK] / CI green (PR flow).
     S39 chain: 7f6aeb3 → a38adc6 (GOLDEN-ASSIST-1) → 682f85b (RULES-AMEND-1) →
     639878d (docs) → b753783 (GOLDEN-ASSIST-1-FIX-1).
     HEADLINE: the golden set is COMPLETE (20/20) and STREAM E is CLOSED. -->

## 0 · VERIFIED FLOOR
`origin/master` = **`b753783`** · **2116 / 207** · rev **70** · drift `[OK]` · CI green.
**No Operator/DB step pending. No prod action blocking.**

---

## 1 · CLOSED IN S39 (do NOT re-raise)

- **GOLDEN SET: 20/20, every bucket met.** Core 8/5 · Empty≠zero 4/3 · TR-routing 8/5 ·
  Multi-tool 5/2 · untagged 4. **The system's missing sensor now exists.** This unblocks: E.3 ✓ ·
  L3 canary baseline · consistency lens · GOLDEN-LOOP-1.
- **STREAM E — CLOSED. → SR-1 trigger has FIRED.**
  - **E.3** (Operator, index-guarded `jsonb_set`): personal `armesMes`
    (`mcp-1783870383459-dbu0`, `mcp_settings` idx 1) → `enabled=false`. G-a..G-d ✅, idempotent ✅,
    rollback statement held (not run).
  - **THE CATALOG SKEW NEVER EXISTED (KB-v38 §2 CORRECTED).** Live: `141 flat + 4 gateway = 145`.
    Both ARMES connections served the **identical 141-tool catalog**. The "145" seen during the
    outage was a **TOTAL** (141+4); `282 − 145 = 137` mixed a total with a flat count. A **units
    error**, not a skew. The duplicate offering (same tool twice, last-write-wins) is now gone.
  - **E.4 smokes ✅**: BI → Superset gateway (`search_tools` → `call_tool {"request":{}}`
    **one-shot**, 45 datasets — the owner's own governed rule proven live again); MES → ARMES
    (`getDailyLineStops`, 43 rows). `141 flat + 4 gateway` on both turns.
- **GOLDEN-ASSIST-1** (`a38adc6`, HOTFIX): coverage strip + bucket-tagging popover. **A0 gate
  finding:** `mark()` is a write-once no-op on an ACTIVE row → retro-tagging is impossible without
  a history rewrite → **dropped, not worked around**.
- **RULES-AMEND-1** (`682f85b`, HOTFIX): **F52** — amend a published rule from its **published**
  payload (`rule-amend`); reset relabeled `Kod tabanına sıfırla`, confirm-gated on PUBLISHED, and
  **deliberately generalized to all kinds** (Architect-reviewed capability decision; the floor is by
  definition the safe baseline, the action only mints a DRAFT, publish still passes the gate).
- **GOLDEN-ASSIST-1-FIX-1** (`b753783`, HOTFIX): **F54** Mark requires ≥1 bucket · **F55** the
  "her etiket bir iddiadır" line.
- **Orphan draft archived** (owner) — the S38 mismatched `call-tool-request-wrapper` draft.
- **W1.a — ALL THREE Wave-2 design notes authored** (see §3).
- **G2 DECIDED:** `?tab=` ids **stay**; only visible labels change (`tabLabel()` is the single lever).

---

## 2 · LIVE QUEUE

### 2.1 — OWNER
- **F61 governed rule (~10 min, no code, owner-writable):** `zoneId` is a **UUID** — never send a
  zone NAME (`Glazur3`, `FIRINALT`); resolve via `getFactoryLines` first. Live evidence: 3 wasted
  calls + a Java deserialize error on every `getDailyOeeValues` name-path turn. Doubles as a
  walkthrough of the new **"Bu kuralı düzenle"** flow.
- **G5 decision — ~2026-07-20** (E.4 + one clean week): personal MCP overrides **disable → DELETE**.
  Extra weight now: the two disabled personal entries hold **raw secrets** in the DB (personal
  `armesMes` = raw `apiKey`; personal `supersetArmes` = raw `headers.Authorization`), while the
  global entries use `apiKeyRef`. Deleting removes two raw secrets from the DB.
- **W0.f prod smokes** (carried): first guardrail cron fire · first L5 rollout (= the `CRON_SECRET`
  positive verification) · routing/quota smokes.

### 2.2 — STREAM E remainder (E-polish, small, batchable)
- **Provenance visibility in chat answers** — E.4's one unmet criterion: routing is correct, but the
  answer does not show **which authority** produced it (owner sees tool names, not
  `system_of_record` / `reporting_mirror`). Open.
- Governed `gateway_rule` teaching `search_tools` QUERY FORM (natural phrases, not camelCase).

### 2.3 — W1 · WAVE 2 (the next big stream — design notes DONE, four AG phases queued)
1. **WAVE2-CONTENT-1** (FULL, client-only): `stagesRegistry` rewrite in the four-beat voice ·
   **required `docs` field** + `DocSlug` type · **`voiceGate.test.ts`** · the three renames
   (`routing`→**Araç Eşleme**, `trust`→**Veri Otoritesi**, `tweak`→**Sandbox Ortamı**) · panel
   explainers · F38 grounding-catch visual · **F53** (bucket `hint` is single-language).
2. **WAVE2-IA-1 · Sandbox** (FULL): `sandboxLevers.ts` typed registry + 3 test pins · regroup by
   stage · class badges (**F51**) · fingerprint to the TOP · class-C **"Kalıcı yap →"** ramp ·
   **F50** stage-chip correction · the session-scoped primer sentence (test-pinned).
3. **WAVE2-IA-2 · Rules/Kinds** (FULL): guided publish strip (three-place problem) · persistent
   backend-slice label · **F49** archived-rows filter · **F46** role split · **F26** Kinds→Rules
   reorder · draft-visibility-after-create.
4. **WAVE2-DOCS-1** (FULL): the six User-Docs + registry rows + panel "📖" links + F42 arrival strips.

### 2.4 — W3 (SR-1 is now TRIGGERED)
- **Consistency lens** (small AG phase, W3 entry — needs the golden set, which now exists).
- **SEMANTIC-ROUTING-1.** S39 evidence hardened: routing cache **136 → 172 → 208 in ONE day** ·
  stopwords being learned (`son`, `bir`, `için`, `2026`, `haziran`, `çalışma`, `istiyorum`,
  `neydi?`) · the **same word re-learned 3× in one turn** (write amplification) · one router
  fallback to a 106-tool candidate set.

### 2.5 — Small items (do not lose)
- **ADR-005 still repo-absent** — Architect authors it (migration lane: `supabase db push` only).
- **F59** — successful per-server discovery count lives ONLY on a span (Langfuse), not in Vercel
  logs → add one `console.log` in `mcpDiscovery.ts`; **fold into the next `api/**`-touching phase**
  (alone it would cost a reseal).
- **F57** — the Architect cannot independently read golden coverage (no DB lane) → surface coverage
  in an admin read.
- **F56** — the specimen row shows the conversation title + the ASSISTANT preview, not the **user's
  question** — the thing being bucketed. Curation friction.
- **F58** — `resolve_time_range` rejects `last_month`; humans say "geçen ay" constantly.
- **F60** — cross-backend mis-route: Superset's `search_tools` was reached for an ARMES scrap
  question.
- **W0.e** 08 measurement (read-only telemetry).
- **G4** repo-private → `VITE_REPO_PUBLIC=false`.

---

## 3 · S39 ARTIFACTS
`cwf-wave2-content-voice-design-v1_2` (voice · docs bridge · naming) ·
`cwf-wave2-sandbox-ia-design-v1` (F23; minted F50/F51) ·
`cwf-wave2-rules-ia-design-v1` (F46/F26/F49; minted **F52**) ·
`claude-code-PHASE-GOLDEN-ASSIST-1-v1` · `…-FIX-1-v1_2` · `claude-code-PHASE-RULES-AMEND-1-v1` ·
`cwf-operator-E3-armes-consolidation-v1`.

## 4 · NEW STANDING RULES (S39)
- **S39-1** — never put a pre-merge corrective instruction in the **same message** as the verbatim
  merge command; the merge block is a strong attractor and the corrective step gets dropped.
  Corrective steps get their own gate.
- **S39-2** — **master is reached ONLY through a reviewed PR. No exceptions, including docs.** A
  direct push happens only if the Architect says so in writing. (Enforced structurally: this line
  goes into every phase prompt's binding constraints, not into a reminder to the owner.)
- **S39-3 (units discipline)** — arithmetic that "closes" is not proof; **units must match**. The
  145/137 skew survived a whole session because `282 − 145 = 137` looked like it balanced. It mixed
  a total with a flat count.
- **Merge-command convention** — the Architect writes `<branch>` as a placeholder; only the `-m`
  message is verbatim (the Architect does not know the branch name).

<!-- END · cwf-open-items-register-v41 · rev 41 · 2026-07-13 -->
