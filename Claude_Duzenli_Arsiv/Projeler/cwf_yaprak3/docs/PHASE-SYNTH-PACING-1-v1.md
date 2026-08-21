# PHASE-SYNTH-PACING-1 · v1 — lane AG-2 · walk item #57 (REDIAGNOSED) · Wave 7 first delivery

<!-- LANE CHECK: AG-2 only. If your window is not lane AG-2, STOP, reply "wrong lane". -->

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| S100 anchor | READ: Architect fresh clone, drift gate exercised with a positive control | anchor |
| the injector is ALIVE and stopped by its own spend fence, not broken | READ: Vercel runtime logs (per-tick body) + `synthetic_runs` seven-day histogram + published governed rows | live |
| ~11% of daily runs carry a non-null error | READ: same seven-day histogram | live |

```evidence:anchor · read 2026-08-14T06:52Z (Architect)
origin/master = bfd9153b90a002a1f1924a38120ac352738928dd
docVersion "rev 258 · 2026-08-14" · vitest ruler 601 · migrations 80 (live=80)
ADR 15 · drift [OK] 7/7 · phase/* unmerged 0
```
```evidence:live · read 2026-08-14T06:55–06:57Z (Architect: Vercel MCP + Supabase MCP)
360 injector invocations / 6h, ALL 200; every tick: "daily token ceiling
reached — injection STOPPED {tokensToday:200000, dailyTokenCeiling:200000}"
seven consecutive UTC days: runs=500 · window 00:00→~01:40Z · tokens=200000
math: ratePerMinute=5 × ESTIMATED_TOKENS_PER_ROUTER_CALL=400 = 2000/min
  → ceiling burns in 100 minutes; 01:39Z is the BUDGET boundary, not a fault
errors: 57/500 on 08-14 (frames 443/500); similar every day
```

## STALE-WINDOW NOTICE
Anchors from earlier waves are VOID. Every S99 card in your box is completed,
merged work. **F-S99-SYNTHETIC-INJECTOR-SILENT is SUPERSEDED by measurement** —
renamed **F-S100-SYNTH-DUTY-CYCLE-BURST-1**. There is nothing to repair in the
injector; the defect is the DISTRIBUTION: all synthetic evidence is minted
00:00–01:40Z, so the golden runner and canary starve all working day and the
honestbench trace debt (#52/#55) is structurally unpayable in daylight.
PRECONDITION: origin/master at the anchor hash (docs-only advance ≠ stop).

## STANDING LAWS: S99-1..9 · hardened CI (`head_sha`; zero runs = FAILED;
`completed`+`success` only) · merge-from-master (S99-8) · pipefail + red-to-file
(S99-9) · porcelain empty before push · one exclusive worktree.

## THE DESIGN (binding carrier: cwf-design-SYNTH-PACING-1-v1 — full text
relayed to the owner; its mechanism is restated here completely, D-2)
Spread the SAME daily budget across the UTC day. **No ceiling change, no cron
change, no migration, no Operator step, no new spend.**

## SCOPE — numbered, closed
**R1 — the pace gate, pure.** New pure module in `synthTraffic/` (suggested
`paceGate.ts`): `allowedByNow(ceiling, nowUtc) = floor(ceiling ×
elapsedFractionOfUtcDay(nowUtc))`. The tick's injection loop admits an
injection only while `tokensToday + ESTIMATED_TOKENS_PER_ROUTER_CALL ≤
min(allowedByNow, ceiling)`. The existing ceiling check REMAINS and still binds
independently — the pace gate may only ever admit LESS, never more (assert this
as a property, not a comment). Clock injected via the existing `now` seam.

**R2 — the governed valve, floor law.** One new agent.param
`synthetic.paceSpread` `{type:'number', min:0, max:1, stage:'00',
sessionTweakable:false}`, **code floor = 0 = today's burst behaviour** (F185
verbatim: the floor is TODAY'S state; an outage can never change what the
system does today). Self-seeds through the existing AGENT_PARAM_SEEDS mapping.
Resolved in `resolveSyntheticTrafficPolicy` beside its siblings. At merge,
behaviour is byte-identical (characterization-pinned).

**R3 — honest waiting.** A paced skip is neither silence nor `ceiling-reached`:
new closed reason **`pace-wait`**, logged once per tick with `{tokensToday,
allowedByNow, ceiling}` and carried in the tick result — "budget spent" and
"budget not yet earned" must be distinguishable by a reader (empty≠zero,
applied to time). The existing `ceiling-reached` path stays byte-identical.

**R4 — the FLIP (owner-authorized in S100 opening; no new spend).** After
merge + deploy: publish `synthetic.paceSpread = 1` via the existing gated
`scripts/publishAgentParam.ts` CLI, reason
`synth-pacing-1-owner-authorized-s100`. Reversible: publishing 0 restores
burst. If your session lacks the publish credential, state so in ONE line —
the Architect routes the publish; do not route around it.

**R5 — FIRST CONSUMERS, named (S98-L4).** (i) golden runner + eval canary get
daytime evidence; (ii) honestbench (#52/#55 debt) becomes payable in daylight;
(iii) the Architect's boot read. **Post-deploy proof (S63-1), named now:**
after the flip, the `synthetic_runs` hourly histogram shows non-empty hours
past 02:00Z through the day AND the day's token total stays ≤ the governed
ceiling. Both reads pasted in a report addendum.

**R6 — the error class, REPORT ONLY.** Classify the ~11% non-null `error` rows
(one day suffices) by reason text into a small closed table for the report —
finding **F-S100-SYNTH-FRAME-ERROR-11PCT**. Three-list discipline where
attribution applies (OURS / THEIRS / unattributed). FIX NOTHING here unless a
class is a one-line injector-side defect, disclosed; anything structural is
named for a Wave 8 item, not built.

## FALSIFIERS (D-5)
(a) `paceSpread=0` (floor) → tick behaviour byte-identical to today
(characterization on fixtures); (b) `paceSpread=1`, bucket unearned →
`injected=0`, reason `pace-wait` with its three numbers — and the POSITIVE
control (S99-5): advance the injected clock, the SAME configuration then
admits an injection (the gate provably opens, not just closes);
(c) `paceSpread=1`, `tokensToday ≥ ceiling` → `ceiling-reached`, never
`pace-wait` (spent beats unearned); (d) UTC midnight rollover → allowance
resets with the day, no carry; (e) the pace gate can never admit an injection
the ceiling check would refuse (property test).

## FENCES
Zero migrations, zero Operator, zero vercel.json edits, zero changes to
`ratePerMinute`/`dailyTokenCeiling` values or the spend-read (fail-closed)
path. `extractSyntheticFrame` untouched. No governed-table writes from code —
the seed rides the existing reconciler; the flip rides the existing CLI.

## DELIVERABLES (S91 completeness)
Branch `phase/synth-pacing-1` · pushed · PR against master ·
report `docs/relay/PHASE-SYNTH-PACING-1-report.md` (incl. R6 table) ·
hardened CI on the head · then MAIL-WAIT for GO. **#34 AGENTBEATS follows by a
separate card after this lands** — do not open it.

TAIL-ANCHOR: PHASE-SYNTH-PACING-1-v1
