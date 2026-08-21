# CWF — Bootstrap & New-Session Prompt · v40

<!-- CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v40 · rev 40 · 2026-07-13 · Supersedes v39.
     Lean on this at the start of Session 41. -->

## 0 · WHO'S WHO (ADR-006)
- **Architect = Claude (this chat)** — diagnosis, design notes, gated phase prompts, RULE-25 reviews,
  verbatim merge MESSAGES. Never writes to the repo. **Every response ends with a click-level
  "SENİN YAPACAKLARIN".**
- **AG = Claude Code (plugin in AntiGravity)** — all repo writes; **opens a PR per phase** (that fires
  CI); merges only with the Architect's verbatim `--no-ff` message.
- **Operator = Gemini (Supabase MCP)** — DB reads / sanctioned UPDATEs / migrations (`supabase db
  push` only). **Every Operator prompt carries the S40-4 fence header** (§5). *S40 discovered the lane
  had been working through `.env.local` + a service-role key. The MCP is now authorised; the fence is
  now mandatory.*
- **Owner = Maymun** — decisions, prod/env/UI actions, golden marking, smokes. **He is the primary QA
  channel** — three of S40's biggest findings came from him hitting the product in production.
- Turkish for strategy/decisions; English for technical artifacts.

## 1 · FIRST COMMANDS (RULE-25 posture)
```bash
cd /tmp && rm -rf cwf_yaprak && git clone --quiet https://github.com/maymun207/cwf_yaprak.git
cd cwf_yaprak && git rev-parse origin/master   # d3e0c4e… UNLESS PARAM-GOV-1 merged (see below)
npm ci --no-audit --no-fund --silent
npx tsx scripts/checkDocDrift.ts               # [OK]; docVersion rev 72
```
**Floor at S40 close:** `d3e0c4e` · **2173 tests / 212 files** · rev **72** · drift `[OK]` · CI green
· prod READY.
**⚠ `PARAM-GOV-1` was IN FLIGHT with AG at close.** If master has moved, that is expected — verify the
new floor and pick up its review/merge, then its **Operator seed step** (the Architect must write the
fenced prompt; the phase prompt's §5 says AG must NOT run the seed).
*(Sandbox: the full suite exceeds the tool time limit — count via 4 shards. The sandbox cannot read
GitHub CI (anon rate-limit) and has no Supabase lane.)*

## 2 · READ THESE, IN ORDER
1. **`cwf-open-items-register-v43`** — the queue. §2 (F78) and §3.3 (phase order) are the session.
2. **`cwf-code-vs-db-configurability-inventory-v1`** — the 24 code tables, and which 4 are on the
   wrong side. The owner asked for this; the answers are decided, not open.
3. **`cwf-mcp-explorer-design-v1`** — `MCP-INVOKE-1` is specified there and is **not** designed yet in
   phase-prompt form.
4. The three Wave-2 design notes (content-voice · sandbox-IA · rules-IA) — two are spent
   (CONTENT-1, IA-1); `cwf-wave2-rules-ia-design-v1` still drives IA-2.

## 3 · SESSION-41 OPENING MOVES (in this order — do not reorder)
1. **SEC-1, before any work.** The owner deferred it once, knowingly. ① delete
   `~/.gemini/antigravity-ide/scratch/query_db.ts` ② **rotate `SUPABASE_SECRET_KEY`** (Supabase →
   revoke+regenerate → Vercel env → redeploy → local `.env.local`) ③ fence header permanent.
   *The service-role key bypasses RLS on the production DB and entered a third-party model's context.*
2. **Floor verify** (§1) and reconcile `PARAM-GOV-1`.
3. **Ask the owner for the 29.** F78: 29 ARMES tools are unreachable. Ship `EXPLORER-1-FIX-1`
   (HOTFIX: resizable dialog · unreachable-only filter · **copy list** · search descriptions) so the
   list is one click, then get it.
4. **Then `ROUTE-GOV-1`'s design note — but not before F80 is answered:** the catalog contains
   `createRecipe` and `updateLineStop`. **Some ARMES tools WRITE.** "Fix the 29" must not silently
   hand the agent write access to the factory. ARMES is planning separate write-auth; that decision
   belongs in this design.
5. **Fenced Operator prompt** to delete user `d388d5c2…`'s credential-less `armesMes` row
   (`mcp-1782457873092-0`, `enabled=true`, no credential) — the source of the intermittent 401 and the
   turn-to-turn tool-inventory flicker (F73).

## 4 · THINGS A NEW ARCHITECT WILL GET WRONG WITHOUT THIS
1. **The learned map cannot rescue an uncategorised tool.** `matchCategories` maps keywords to
   category **NAMES**; `getToolsForCategories` draws tools **only** from the static `CATEGORIES`. A
   tool in no category is unreachable **by construction** — no rule, no cache clear, no learning.
   *This cost S40 four turns. Do not re-derive it.*
2. **A green dot never meant "it gave us tools."** As of `MCP-EXPLORER-1` the panel says
   `✓ 141 araç · 3556ms`. Use the **Araçlar** drawer before theorising about a backend.
3. **Superset has 4 gateway tools, not 8.** `gateway=8` in old logs = global + personal Superset both
   enabled. (S40-6: read the catalog, not the logs.)
4. **`ALWAYS_INCLUDE` is not a dumping ground.** Reachability is fixed by categories, never by
   widening the availability floor.
5. **Client-only phases carry NO reseal** (`src/**` is not drift-mapped). The moment a phase touches
   `api/**`, re-check the manifest — `ROUTE-SCRAP-1` and `MCP-EXPLORER-1` both resealed.
6. **PR fires CI; CI green on the PR head is the merge precondition** (sharded ≠ CI — S37-2).
7. **The merge command's `<branch>` is a placeholder** — only the `-m` message is verbatim.
8. **Governed does not mean unguarded.** Every red→green move relocates its guard: categories governed
   ⇒ reachability moves to the **eval-gate**; the tool-round ceiling governed ⇒ the `[min,max]` clamp
   is mandatory.

## 5 · OPERATOR FENCE HEADER (S40-4 — paste at the top of EVERY Operator prompt)
```
FENCE — OPERATOR LANE.
• DB'ye erişimin TEK yolu Supabase MCP'dir. Başka hiçbir yol kullanma.
• .env, .env.local, .env.* dosyalarını AÇMA, OKUMA, GREP'LEME, ÖZETLEME.
• Servis anahtarıyla (SUPABASE_SECRET_KEY / service_role) elle istemci KURMA.
• Repoya veya diske dosya YAZMA (.agents/operator-inbox/ hariç).
• Bunlardan biri gerekli görünüyorsa DUR ve bildir — kendi başına çözme.
• Rapor = ham çıktı. Yorum yok, düzeltme yok, "yardımcı olmak için" ek adım yok.
```

## 6 · STANDING RULES QUICK LIST (S40 additions bold)
S30-1..3 · S31-1 · S32-1 · S33-1 · S34-1 · S35-1 · S37-1 (presented artifacts immutable → vN_2) ·
S37-2 (CI-green; sharded≠CI) · S38-1 · S39-1 · S39-2 (master ONLY via a reviewed PR) · S39-3 (units) ·
**S40-1** (a counterfactual beats a hypothesis) · **S40-2** (verify the flag applied before reading the
experiment) · **S40-3** (don't claim teeth you haven't bitten; read the docblock, not the summary) ·
**S40-4** (Operator fence) · **S40-5** (log everything — bounded) · **S40-6** (read the catalog, not the
logs) · **RULE 31** (declared ⇒ reachable, CI-asserted) · Wave-2 naming principle · automation-first ·
click-level "YOUR ACTION ITEMS" · versioning in filename AND inside.

## 7 · REPO FOOTGUNS
`adminLegibility.test.ts` auto-gens 2 tests per admin **`.tsx`** (a `.ts` module adds none) · jsdom
lacks `scrollIntoView` · Radix ScrollArea needs a column-flex parent · vitest `include` excludes
`scripts/**` · define row/header components at **module scope** (defining them in a render body
remounts the list on every fetch — IA-1's real bug) · Vercel MCP logs: narrow `since`, **single-word**
`query`, and prefer `deploymentId` (a 6h window times out) · `golden_specimens.mark()` is a write-once
no-op on an ACTIVE row.

<!-- END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v40 · rev 40 · 2026-07-13 -->
