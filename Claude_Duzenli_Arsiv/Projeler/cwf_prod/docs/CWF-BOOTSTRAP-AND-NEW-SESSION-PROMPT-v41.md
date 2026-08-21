# CWF — Bootstrap & New-Session Prompt · v41

<!-- CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v41 · rev 41 · 2026-07-14 · Supersedes v40.
     Lean on this at the start of Session 43. Detail: KB v41. Queue: register v44. -->

## 0 · WHO'S WHO (ADR-006 — unchanged)
Architect = Claude (this chat): diagnosis, design notes, gated phase prompts, RULE-25 reviews,
verbatim merge messages; never writes the repo; **every response ends with click-level "SENİN
YAPACAKLARIN"**. AG = Claude Code (AntiGravity plugin): all repo writes, PR per phase, merges only
with the Architect's verbatim `--no-ff` message. Operator = Gemini (Supabase MCP): `supabase db
push` only; **every prompt carries the S40-4 fence** (validated under fire in S41 — Gemini stopped
at a wrong-project misconfig instead of improvising). Owner = Maymun: decisions, prod/env/UI,
publishes, smokes — the primary QA channel. Turkish strategy / English artifacts.

## 1 · FIRST COMMANDS (RULE-25 posture)
```bash
cd /tmp && rm -rf cwf_yaprak && git clone --quiet https://github.com/maymun207/cwf_yaprak.git
cd cwf_yaprak && git rev-parse origin/master   # c5f58a4… UNLESS ROUTE-GOV-1 v2_2 merged (expected)
npm ci --no-audit --no-fund --silent
npx tsx scripts/checkDocDrift.ts               # [OK]; docVersion rev 74 at close
```
**Floor at S41–42 close:** `c5f58a4` · **2212 tests / 216 files** · rev **74** · drift `[OK]` ·
prod READY. History this session: `d3e0c4e` → `dd04831` (PARAM-GOV-1) → `c5f58a4` (VIZ-BIND-1).
**⚠ IN FLIGHT: `ROUTE-GOV-1 v2_2`** with AG on branch **`route-gov-2`** — if master moved, that is
the merge; verify the new floor, then run the post-merge owner chain (§3.1).
*(Sandbox: full suite exceeds the tool limit — count via 4 shards; sharded ≠ CI (S37-2). Sandbox
cannot read GitHub CI; ask the owner "yeşil/kırmızı".)*

## 2 · READ THESE, IN ORDER
1. **`cwf-open-items-register-v44`** — §2 in-flight, §3 committed queue (do not reorder), §4
   findings ledger.
2. **`claude-code-PHASE-ROUTE-GOV-1-v2_2`** — the executing spec (mirror + overlay + fail-closed
   F80 + stage-drafts for the 29).
3. **`claude-code-PHASE-GOLDEN-BATCH-1-v1`** — approved, in the owner's hands, starts ONLY after
   ROUTE-GOV-1 merges.
4. **`cwf-f83-prescriptive-authority-architecture-v1_2`** — the authority ladder; §1.5 is why
   F83.1 is "make the boundary real", not "loosen".

## 3 · SESSION-43 OPENING MOVES (in this order)
1. **Reconcile ROUTE-GOV-1.** If PR open: owner reports CI → RULE-25 (fresh clone, recount, frozen
   sweep: exactly ONE migration under `supabase/`) → verbatim merge. After merge, the owner chain:
   ① **fenced Operator prompt** (Architect writes): `backend_tools` migration via `supabase db
   push` + **fold F73 in the same visit** (delete user `d388d5c2…`'s credential-less `armesMes`
   row `mcp-1782457873092-0`); ② `npm run seed:rules`; ③ panel: ARMES **Kataloğu senkronize et** →
   **Kapsanmayan araçlar için taslak oluştur** → publish annotations + read-tool category drafts;
   ④ A3 re-test (expect batch tool offered, no ambiguity panels).
2. **Hand `GOLDEN-BATCH-1` to AG** (file already with the owner). After ITS merge: Operator
   migration → `npm run seed:agent-params` → verify cron firing from logs → **viz golden run →
   viz v2 PUBLISH** (completes F82's model side, unblocks all prompt.segment governance).
3. **Design `GATE-VISIBLE-1`** (F88+F90) while AG builds.
4. Then **F83.1 `SCOPE-HONEST-1`** (now publishable), then the revised EXPLORER-1-FIX-1 batch
   (F81 guard · F87 labels · TS2339 cleanup · dialog polish).

## 4 · THINGS A NEW ARCHITECT WILL GET WRONG WITHOUT THIS
1. **Stage order:** tool-selection (stage 7 `register-tools`) runs BEFORE knowledge-warm (stage 8).
   ROUTE-GOV-1 §3.C's `resolveToolCategories()` exists because of this. Do not re-derive.
2. **A rule on an unoffered tool is dead on arrival** (S41-2). Reachability = categories ∪
   ALWAYS_INCLUDE; check `[ToolRoute] offered=` before authoring anything tool-referencing. Two
   already-published rules (graph node + format rule for `getLineStopsReportForZones`) go LIVE the
   moment ROUTE-GOV-1 makes the tool reachable — do not re-author them.
3. **The `viz` prompt segment's new directive is INERT until republished**, and republish is walled
   by F89 until GOLDEN-BATCH-1 ships. Ambiguity panels in prod until then are CORRECT behaviour,
   not a bug.
4. **A "failed to publish" with no reason = read Vercel logs for `POST … 4xx`** (F88). The server
   always answered; the client swallows `null`. `rule_audit` shows NO row for rejected publishes.
5. **The green GateVerdict box lies across selection changes (F90)** — trust the version timeline
   and the left list, never the box alone.
6. **PR #33's numbers (2214/217, rev 75) are DEAD** — closed unmerged, branch deleted. Floor truth
   is §1. Never cherry-pick from dead branches; v2_2 re-implements its three small items fresh.
7. **Golden publish price** (once GOLDEN-BATCH-1 lands): ~6–12M tokens + ~700 live ARMES calls,
   ~30–60 min background. The ceiling is governed: `quota.goldenRunTokenCeiling` (Rules → System →
   Params), clamp [1M,30M], next-run effective.
8. **Agent params live under the System backend slice** of Rules (family lens: Params) — the
   backend selector, not a dedicated tab.
9. **Seeds need `--env-file`** — or just use the npm aliases (`seed:rules`, `seed:agent-params`,
   `seed:prompt-segments`, `seed:providers`) that v2_2 ships.
10. **Mirror vs overlay:** `backend_tools` is a system-written observation (immutable to humans;
    `missing`, never deleted); ALL human knowledge about tools is the governed `armes.tool_annotation`
    overlay. Never blur this — it is the ADR-001 boundary.

## 5 · OPERATOR FENCE HEADER (S40-4 — paste atop EVERY Operator prompt; also in Gemini's persistent
instructions since S41)
```
FENCE — OPERATOR LANE.
• DB'ye erişimin TEK yolu Supabase MCP'dir. Başka hiçbir yol kullanma.
• .env, .env.local, .env.* dosyalarını AÇMA, OKUMA, GREP'LEME, ÖZETLEME.
• Servis anahtarıyla (SUPABASE_SECRET_KEY / service_role) elle istemci KURMA.
• Repoya veya diske dosya YAZMA (.agents/operator-inbox/ hariç).
• Bunlardan biri gerekli görünüyorsa DUR ve bildir — kendi başına çözme.
• Rapor = ham çıktı. Yorum yok, düzeltme yok, "yardımcı olmak için" ek adım yok.
```
Project: `fjbrkimwvtpwoxhziidh` (state it in every Operator prompt — the wrong-project incident).

## 6 · STANDING RULES QUICK LIST (S41 additions bold)
S30-1..3 · S31-1 · S32-1 · S33-1 · S34-1 · S35-1 · S37-1 (presented artifacts immutable → vN_2) ·
S37-2 (CI-green on PR head; sharded≠CI) · S38-1 · S39-1..3 · S40-1..6 · RULE 31 (now BOTH
directions, relocating into the gate via ROUTE-GOV-1) · **S41-1 born loud** (every rejection
traces in log+audit+UI; prove in tests) · **S41-2 reachability before rules** · **wrong ≠ missing**
(F82's law) · Wave-2 naming principle · automation-first (the system fetches its own catalogs —
the owner is never a data transport) · click-level "SENİN YAPACAKLARIN" · versioning in filename
AND inside.

## 7 · REPO FOOTGUNS (carry-over + new)
`adminLegibility.test.ts` auto-gens 2 tests per admin `.tsx` · jsdom lacks `scrollIntoView` · Radix
ScrollArea needs a column-flex parent · vitest `include` excludes `scripts/**` · module-scope
row/header components · Vercel MCP logs: narrow `since`, single-word `query`, prefer
`deploymentId` · `golden_specimens.mark()` is write-once no-op on ACTIVE rows · **learned-map log
spam is fixed only after v2_2 lands (idempotent-silent)** · **admin publish endpoint returns
verdicts in 200/422 bodies and logs nothing (until GATE-VISIBLE-1)**.

<!-- END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v41 · rev 41 · 2026-07-14 -->
