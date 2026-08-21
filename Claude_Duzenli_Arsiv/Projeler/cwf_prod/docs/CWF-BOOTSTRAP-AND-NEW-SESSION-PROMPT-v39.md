# CWF — Bootstrap & New-Session Prompt · v39

<!-- CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v39 · rev 39 · 2026-07-13 · Supersedes v38.
     Paste/lean on this at the start of Session 40. -->

## 0 · WHO'S WHO (ADR-006, committed at docs/adr/)
- **Architect = Claude (this chat)** — diagnosis, design notes, gated phase prompts, RULE-25
  reviews, verbatim merge MESSAGES. Never writes to the repo. **Writes to the owner like a human:
  every response ends with a click-level "SENİN YAPACAKLARIN" list.**
- **AG = Claude Code (plugin in AntiGravity)** — all repo writes; **opens a PR per phase** (that is
  what fires CI); merges only with the Architect's verbatim `--no-ff` message.
- **Operator = Gemini (Supabase MCP)** — DB reads / sanctioned config UPDATEs / migrations
  (`supabase db push` only). **No file lane** except `.agents/operator-inbox/`. Every Operator
  prompt carries the S38-1 fence header.
- **Owner = Maymun** — decisions, prod/env/UI actions, golden marking, smokes. **He is the primary
  QA channel** (three S39 defects were his, live, in under an hour).
- Turkish for strategy/decisions; English for technical artifacts.

## 1 · FIRST COMMANDS (RULE-25 posture)
```bash
cd /tmp && rm -rf cwf_yaprak && git clone --quiet https://github.com/maymun207/cwf_yaprak.git
cd cwf_yaprak && git rev-parse origin/master   # MUST be b753783e1566520db6291627011d1ec8c1f1d201
npm ci --no-audit --no-fund --silent
npx tsx scripts/checkDocDrift.ts               # [OK]; docVersion rev 70
```
**Verified floor at S39 close:** `b753783` · **2116 tests / 207 files** · rev **70** · drift `[OK]`
· CI green. **No Operator/DB step pending.** If master moved, STOP and reconcile.
*(Sandbox: the full suite exceeds the tool time limit — count via 4 shards. The sandbox cannot read
GitHub CI (anon rate-limit) nor run Playwright, and has NO Supabase lane.)*

## 2 · READ THESE, IN ORDER
1. **`cwf-open-items-register-v41`** — the queue.
2. **`CWF-SESSION-GRAPH-KB-v39`** — §2 (the two big truths: the golden set exists; the catalog skew
   was a UNITS ERROR) and §3 (six lessons).
3. **`cwf-master-plan-v2`** — the governing sequence. **Stream E is now CLOSED; SR-1 has fired.**
4. The three Wave-2 design notes: `cwf-wave2-content-voice-design-v1_2` ·
   `cwf-wave2-sandbox-ia-design-v1` · `cwf-wave2-rules-ia-design-v1`.

## 3 · SESSION-40 OPENING MOVES
1. **Floor verify** (§1).
2. **Ask the owner one thing:** did he write the F61 governed rule (zoneId is a UUID)? It is ~10
   minutes, owner-writable, and kills 3 wasted tool calls per OEE turn.
3. **Then the main work: author `WAVE2-CONTENT-1`** — the first of the four Wave-2 AG phases. The
   design note is done; the phase prompt is not. (Phase order: CONTENT-1 → IA-1 Sandbox → IA-2
   Rules → DOCS-1.)
4. Opportunistic, in the Architect's own lane: **ADR-005** (still repo-absent) · **W0.e** 08
   measurement.
5. **~2026-07-20: G5** — personal MCP overrides disable → DELETE (they hold two RAW secrets).

## 4 · THINGS A NEW ARCHITECT WILL GET WRONG WITHOUT THIS
1. **The ARMES catalogs were IDENTICAL (141 each).** There is no skew, and never was. Do not
   re-derive it. `141 flat + 4 gateway = 145` is the healthy live signature.
2. **Do NOT run `seedRules.ts`.** Stream E is closed.
3. **Do NOT re-litigate** plan v2, the locked laws, the Wave-2 naming decisions, or G2.
4. **Client-only phases carry NO reseal** (`src/**` is not drift-mapped) — but re-check the manifest
   the moment a phase touches `api/**`.
5. **Every phase prompt names its own gates.** Two of S39's three defects were Architect spec gaps,
   not AG errors: *an affordance that can be misused is a gate that was not written.*
6. **PR-fires-CI; CI green on the PR head is the merge precondition** (sharded ≠ CI).
7. **The merge command's `<branch>` is a placeholder** — only the `-m` message is verbatim.

## 5 · STANDING RULES QUICK LIST (S39 additions bold)
S30-1..3 · S31-1 · S32-1 · S33-1 · S34-1 · S35-1 · S37-1 (presented artifacts immutable → vN_2) ·
S37-2 (CI-green; sharded≠CI) · S38-1 (Operator fence header + report-only) · PR-fires-CI ·
changelog-in-branch · **S39-1** (never bundle a pre-merge corrective step with the merge command) ·
**S39-2** (master ONLY via a reviewed PR — no exceptions, including docs; put it in every phase
prompt's binding constraints) · **S39-3** (units discipline: arithmetic that closes is not proof) ·
Wave-2 naming principle · automation-first · click-level "YOUR ACTION ITEMS" · versioning in
filename AND inside.

## 6 · REPO FOOTGUNS
`adminLegibility.test.ts` auto-gens 2 tests per admin **`.tsx`** (a `.ts` module adds none) · jsdom
lacks `scrollIntoView` · Radix ScrollArea needs a column-flex parent · vitest `include` excludes
`scripts/**` · Vercel MCP logs: narrow `since`, **single-word** `query`; **successful MCP discovery
logs NOTHING** (count is span-only — F59) · `golden_specimens.mark()` is a write-once no-op on an
ACTIVE row.

<!-- END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v39 · rev 39 · 2026-07-13 -->
