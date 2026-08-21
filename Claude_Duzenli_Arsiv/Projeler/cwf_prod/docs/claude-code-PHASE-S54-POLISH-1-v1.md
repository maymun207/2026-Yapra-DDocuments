# PHASE S54-POLISH-1 — F143 reservation stamp + 00-card read · VSplit nits · learn-path label · branch hygiene

<!-- claude-code-PHASE-S54-POLISH-1-v1 · rev 1 · 2026-07-20 · Architect: Claude (S54)
     Executor: AG (Claude Code). In-window batch: none of this touches routing judgment,
     the GOLDEN FREEZE, or the owner-locked ROUTING-ARCH sequence. -->

## 0 · PRECONDITION (S47-1 — check FIRST)

Valid ONLY while:
- `origin/master == 4b2a3be044678dc807559508e06aa39b549747be` (Merge PHASE LEARN-NORM-1), AND
- no OPEN PR touches `api/cwf/_lib/turn/stageStream.ts`, `api/admin/stage-context.ts`,
  `api/cwf/_lib/turn/stageTools.ts`, or `src/components/admin/VSplit.tsx`.

On ANY mismatch: **STOP and report the actual state.**

## 1 · Context — four small items, one handoff (round-batching)

**W1 · F143 (register v55):** the per-turn chat-quota **reservation is never persisted** —
`ctx.quota` (`api/cwf/_lib/turn/types.ts` ~:81-95, Q-1 §3.4: `{ reserved: number,
degraded: boolean } | null`, seeded by the chat.ts gate; `context.ts` ~:29 defaults null)
lives only in memory for the turn. The SC-2 stage-00 card honestly discloses this gap via
its bilingual `reservedNote`. Fix = stamp the reservation onto the **`turn_done` ledger
event** (`api/cwf/_lib/turn/stageStream.ts` ~:342-354, `payload.kind='turn_done'` — the
ONE telemetry carrier per L1 §2.6), then teach the stage-00 loader to read it.

**W2 · VSPLIT-NIT pair (register v54):** in `src/components/admin/VSplit.tsx` —
(a) the debounced ratio-persist timer is not cleared on unmount (harmless post-unmount
localStorage write); (b) the divider `aria-label` is monolingual.

**W3 · learn-path label honesty:** LEARN-NORM-1's aggregate line hardcodes
`path=semantic`, but prod trace=38b3c1b0 proved the block also fires on keyword-floor-routed
turns (it identifies the **learn path**, not the routing path) — confusable in logs.
Rename the token to `path=stagetools`.

**W4 · branch hygiene (post-merge side-op, no commit):** delete stale merged remote
branches `learn-norm-1` and `sc-2`.

**Line numbers are anchors at `4b2a3be` — locate by content, never trust the number blindly.**

## 2 · Profile & compliance

- **Ceremony: FULL** (touches `api/**`). Unsharded CI on the PR head is the SOLE test
  arbiter (S37-2/S43-2); AG runs targeted tests locally; merge only on Architect GO
  under CI-green.
- **PLATINUM compliance:** zero manual/config steps introduced; pre-F143 turns need no
  backfill — the 00 card self-discloses for them (empty≠zero), new turns carry the stamp
  automatically.
- **C1 LAW:** zero writes to the `messages` table — W1 only ADDS payload keys to the
  existing `turn_done` telemetry emission; the write path itself is untouched.
- No migration (telemetry payload is free-form jsonb). No secrets. No gate machinery.
  No golden-run surface.

## 3 · Binding constraints

1. Production files touched: **exactly** `api/cwf/_lib/turn/stageStream.ts`,
   `api/admin/stage-context.ts` (stage-00 branch + its client card file if the note text
   lives client-side — name every file in the report), `api/cwf/_lib/turn/stageTools.ts`
   (W3 one token), `src/components/admin/VSplit.tsx`. Plus tests, `.agents/` APPEND
   (E-DOC-1; S53-1 forbids compaction), and drift-manifest/docVersion reseal IF flagged
   (expect rev 116, final commit, grep-verified script name — S32-1).
2. `git diff --name-only 4b2a3be..HEAD -- supabase/` must be EMPTY.
3. Eval-gate, gateway.ts, prompt segments, provider registry, trust line, quota gate
   LOGIC (reservation/settle math in chat.ts + stageStream clamp at ~:88-94): untouched.
   W1 is stamp-only — it changes NO quota behavior.
4. Honest-absence semantics (empty≠zero) are binding in W1: a degraded/fail-open turn has
   NO real reservation → stamp `null`, never `0` and never the ceiling constant.
5. The fallback learn path's aggregate line format stays byte-identical (W3 touches only
   the stageTools line + its test pin).
6. Naming-collision grep before coding: `grep -rn "reservedTokens\|quotaDegraded\|S54-POLISH" src api shared`
   → no pre-existing uses.

## 4 · Gated sub-phases

### G0 — Pre-flight (hard gate)
- Fresh/clean tree → `git rev-parse origin/master` MUST print
  `4b2a3be044678dc807559508e06aa39b549747be`. Paste it.
- `npm ci`; grep `package.json` for exact test + reseal script names; paste.
- Locate and paste 2-3 surrounding lines for each anchor: `ctx.quota` type
  (types.ts), turn_done payload build (stageStream.ts), the stage-00 loader +
  `reservedNote` emission site (grep `reservedNote` across `api/` and `src/` — paste
  every hit), VSplit persist timer + divider aria-label, stageTools aggregate line.
- Branch: `s54-polish-1` off master.

### G1 — W1a: stamp the reservation on `turn_done` (`stageStream.ts`)
Add to the existing `turn_done` payload, additively:
- `reservedTokens`: `ctx.quota && !ctx.quota.degraded ? ctx.quota.reserved : null`
- `quotaDegraded`: `ctx.quota ? ctx.quota.degraded : null`
No other payload key changes; event count/order unchanged; the existing payload
redaction contract holds (token counts are not PII/secrets).

### G2 — W1b: stage-00 honest read (`stage-context.ts` '00' branch + card)
- The '00' loader additionally reads the selected turn's `turn_done` row payload
  (same telemetry read path the card's llm_call-summing loader already uses — reuse it,
  no new endpoint).
- If `reservedTokens` is present (non-null) → the card surfaces the actual reservation
  (+ a degraded marker when `quotaDegraded===true` for that turn family). If the key is
  absent or null → the existing bilingual `reservedNote` disclosure renders EXACTLY as
  today (pre-F143 turns; never fabricate). Update the note's wording only if needed to
  distinguish "not stamped (older turn)" from "no real reservation (degraded)" — keep it
  bilingual.

### G3 — W2: VSplit nit pair (`VSplit.tsx`)
- (a) Clear the debounced persist timer in the effect cleanup / on unmount — no
  localStorage write may fire after unmount.
- (b) Divider `aria-label` becomes bilingual TR/EN (match the panel's existing
  bilingual copy style).
No geometry/behavior change: `clampSplitRatio` and all floor semantics byte-identical.

### G4 — W3: label rename (`stageTools.ts`)
- The aggregate line's `path=semantic` → `path=stagetools`. Update the
  `learnNormStageTools.test.ts` pin. Nothing else in the line changes
  (`learn kept=… skipped_stopword=… skipped_same=… skipped_short=…` stays).

### G5 — Tests (under existing test roots; Vitest include covers `api/cwf/__tests__`)
- (a) turn_done payload carries `reservedTokens`/`quotaDegraded` when `ctx.quota` is a
  real reservation (values match ctx).
- (b) degraded and null-quota turns stamp `reservedTokens: null` (+ correct
  `quotaDegraded`) — the fail-open honesty pin.
- (c) stage-00 loader: stamped turn → actual value surfaced; unstamped/legacy turn →
  disclosure note byte-identical to today (characterize current copy first).
- (d) VSplit: with fake timers, unmount before the debounce fires → NO localStorage
  write (spy); aria-label contains both languages.
- (e) W3 pin updated; fallback aggregate line format untouched (grep-assert in test or
  report).
- Run targeted tests + neighbors; paste tail. CI arbitrates the full suite.

### G6 — Ledger + drift
- `.agents/` CHANGELOG + skill-KB one-paragraph APPEND (F143 / S54-POLISH-1).
- Drift gate; if flagged, reseal docVersion (expect rev 116) in the final commit.
  Paste output either way.

## 5 · Self-verify checklist (paste literal evidence per line)

1. G0 `git rev-parse origin/master` == `4b2a3be…47be`.
2. Branch `s54-polish-1` head SHA + PR number + CI link + **CI GREEN (unsharded)**.
3. `git diff --stat 4b2a3be..HEAD` — only §3.1 paths (name any card-side client file
   explicitly).
4. `git diff --name-only 4b2a3be..HEAD -- supabase/` — empty.
5. Grep proofs: `reservedTokens` sites (stamp + loader + tests only) · `path=semantic`
   → zero hits repo-wide · quota clamp block (stageStream ~:88-94) byte-unchanged
   (`git diff` excerpt showing no hunk there) · naming-collision grep clean.
6. Test names + targeted vitest tail.
7. Drift-gate output ([OK] or reseal rev 116).
8. One-line PLATINUM + C1 statements.

## 6 · Report & merge protocol

- Push branch, open PR, post the §5 evidence block. **Do NOT merge.**
- Architect FAST-GATE review → GO. Upon GO only, merge `--no-ff` (squash banned) with
  this verbatim message:

  `Merge PHASE S54-POLISH-1: F143 reservation stamped on turn_done + 00-card honest read, VSplit nit pair, learn-path label honesty`

- **W4, after the merge lands:** `git push origin --delete learn-norm-1 sc-2` (plus
  `s54-polish-1` after its own merge). Paste the deletion output in the post-merge
  report. No commit involved.
- Post-merge prod verification is Architect-side: Claude reads the next real turn's
  `turn_done`-derived 00-card behavior via logs/panel evidence and the
  `path=stagetools` line. No owner steps.

<!-- END · claude-code-PHASE-S54-POLISH-1-v1 · rev 1 · 2026-07-20 -->
