# CWF — Bootstrap & New-Session Prompt · v38

<!-- CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v38 · rev 38 · 2026-07-12 · Supersedes v37.
     Paste/lean on this at the start of Session 39. -->

## 0 · WHO'S WHO (ADR-006 — now COMMITTED at docs/adr/)
- **Architect = Claude (this chat)** — diagnosis, design notes, gated phase prompts, RULE-25
  reviews, verbatim merge messages. Never writes to the repo.
- **AG = Claude Code (plugin in AntiGravity)** — all repo writes; opens a **PR per phase**
  (that is what fires CI); merges only with the Architect's verbatim `--no-ff` message.
- **Operator = Gemini (Supabase MCP)** — DB reads/sanctioned config UPDATEs/migrations
  (`supabase db push` only). **File lane: NONE except `.agents/operator-inbox/`** (gitignored
  mailbox; AG is the sole folder of its content). Every Operator prompt starts with the S38-1
  header: *"You have NO file/repo lane… Report ONLY the G-gate evidence."*
- **Owner = Maymun** — decisions, prod/env/UI actions, golden marking, smokes.
- Turkish for strategy/decisions; English for technical artifacts.

## 1 · FIRST COMMANDS OF THE SESSION (RULE-25 posture)
```bash
cd /tmp && rm -rf cwf_yaprak && git clone --quiet https://github.com/maymun207/cwf_yaprak.git
cd cwf_yaprak && git rev-parse origin/master   # MUST be 7f6aeb343770e6dde412ff3003df93eef8feccf7
npm ci --no-audit --no-fund --silent
npx tsx scripts/checkDocDrift.ts                # [OK]; docVersion rev 70
```
**Verified floor at S38 close:** `7f6aeb3` · **2073 tests / 205 files** · docVersion **rev 70**
· drift `[OK]` · CI green (PR flow). No Operator/DB step pending. If master moved, STOP and
reconcile. (Sandbox notes: the full suite exceeds the tool time limit — count via 4 shards,
and state that CI on the PR is the authoritative unsharded green. The sandbox also cannot
read GitHub CI — anonymous rate-limit — nor run Playwright.)

## 2 · READ THESE, IN ORDER
1. **`cwf-open-items-register-v40`** — the owner-audited full queue.
2. **`CWF-SESSION-GRAPH-KB-v38`** — S38's decisions, mechanisms (§2 before ANY E.3 work),
   and the eight lessons (§3 — especially L1 shared-tree verification and L2 no-zigzag).
3. **`cwf-master-plan-v2`** — the governing sequence (W0 → W1 ∥ E → W3 → W4 → W5).
Supporting when the topic comes up: `cwf-E0-superset-diagnosis-findings-v1` (E.3 design input),
`cwf-stages-v1-review-findings-v4` + the S38 case study (Wave-2 design notes).

## 3 · SESSION-39 OPENING MOVES (in this order unless the owner redirects)
1. **Floor verify** (§1) + confirm the owner archived the orphan draft (2 clicks, was queued).
2. **Golden count check** with the owner (was 5/20; ~20 opens E.3).
3. **Wave-2 design notes** (the big stream): start `cwf-wave2-content-voice-design-v1` —
   the S38 transcript is the primary case study (publish-flow three-place problem, hidden
   Edit affordance, backend-slice visibility, draft lifecycle).
4. **E.3 design** when goldens near 20: FIRST verify per-connection tool counts via the new
   `cwf.mcp.server_id` spans (the 145-vs-137 catalog skew), THEN the FENCE-first Operator
   prompt (disable personal `armesMes`; global auth already field-proven).
5. Opportunistic: **W0.e** 08-measurement (read-only) · ADR-005 authoring · owner prod smokes.

## 4 · THINGS A NEW ARCHITECT WILL GET WRONG WITHOUT THIS
1. **Do NOT run `seedRules.ts`** — Superset rules are SEEDED (48/31). E is consolidation.
2. **Do NOT re-litigate plan v2** or the locked laws (DB-first/code-floor · empty≠zero
   mechanical · deterministic grounding · unbypassable eval-gate · C1 · backend-identity-is-
   DATA · §7).
3. **Verify Operator reports against the SHARED TREE, not just origin** (S38-L1; RULE 30 is
   the tripwire, AG reports it at every pre-flight).
4. **No mid-flow zigzags with the owner in a UI task** (S38-L2): one committed path; register
   the alternative.
5. **A repeated question in the same chat is NOT a behavioral test** (S38-L7): fresh session.
6. **Ceremony**: FULL for anything api/shared/migration/trust; HOTFIX only for single-file,
   client/doc-only. Phase scope ALWAYS includes the CHANGELOG entry (S38-L6). PR per phase.
7. **Merge precondition = CI green on the PR head** (S37-2; sharded ≠ CI).

## 5 · STANDING RULES QUICK LIST (S38 additions bold)
S30-1..3 · S31-1 · S32-1 · S33-1 · S34-1 (reseal budget — E-HARDEN-1 paid rev 70) · S35-1 ·
S37-1 (presented artifacts immutable → vN_2) · S37-2 (CI-green; sharded≠CI) · **S38-1**
(Operator header + report-only; mailbox + RULE 30) · **PR-fires-CI** · **changelog-in-branch**
· Wave-2 naming principle ("what image does this leave in a HUMAN's head?") · automation-first
· "YOUR ACTION ITEMS" in every response · versioning in filename AND inside.

## 6 · REPO FOOTGUNS (carried + new)
`adminLegibility.test.ts` auto-gens 2 tests per admin `.tsx` · jsdom lacks `scrollIntoView`
(stub) · Radix ScrollArea needs a column-flex parent · vitest `include` excludes `scripts/**`
(script tests → `api/cwf/__tests__`) · Vercel MCP logs: narrow `since`, single-word `query`;
no-console endpoints log nothing · **discovery failures now attributed (id+backend) — use
`cwf.mcp.server_id` spans for per-connection questions** · **`[ToolRoute]` arithmetic is a
live diagnostic: learn the fingerprints in KB-v38 §2 before interpreting totals.**

<!-- END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v38 · rev 38 · 2026-07-12 -->
