# cwf-design-SYNTH-PACING-1-v1 · S100 · supersedes the #57 premise

## 0 · THE REVERSAL (measured, not recalled)
S99 filed **F-S99-SYNTHETIC-INJECTOR-SILENT**: "synthetic traffic zero since
01:39Z, fault is injector-specific." S100 boot measured the live system before
writing any card, and the premise is dead:

```evidence:live · read 2026-08-14T06:55–06:57Z (Architect: Vercel MCP + Supabase MCP)
/api/admin/synthetic-traffic-injector: 360 invocations / 6h, ALL HTTP 200
every tick logs: "[SynthTraffic] daily token ceiling reached — injection
  STOPPED { tokensToday: 200000, dailyTokenCeiling: 200000, injectedThisTick: 0 }"
synthetic_runs, per UTC day, seven consecutive days (08-08..08-14):
  runs=500 · window 00:00→~01:40Z · tokens=200000 · then ~22h20m of darkness
arithmetic: ratePerMinute=5 × ESTIMATED_TOKENS_PER_ROUTER_CALL=400
  = 2000 tokens/min → the 200000 ceiling burns in exactly 100 minutes
governed rows (domain_rules, published): synthetic.enabled=1 ·
  synthetic.ratePerMinute=5 · synthetic.dailyTokenCeiling=200000 ·
  synthetic.mode=frame-only
```

**There is no broken injector. There is a working spend fence with no pacing.**
01:39Z is not an incident timestamp; it is the daily budget boundary. S99 read
a recurring duty-cycle limit as an outage — S96-2's cousin (a finding must be
conditioned on which cycle phase the organ was in at read time).

Finding renamed: **F-S100-SYNTH-DUTY-CYCLE-BURST-1** (supersedes
F-S99-SYNTHETIC-INJECTOR-SILENT by measurement).
Sibling finding, same lane: **F-S100-SYNTH-FRAME-ERROR-11PCT** — ~11% of every
day's runs carry a non-null `error` (57/500 on 08-14; frames 443/500).

## 1 · WHY THE BURST SHAPE IS A REAL DEFECT (SOTA-linked)
All synthetic evidence is minted 00:00–01:40Z. The golden runner and the canary
tick all day against a corpus that only breathes at night; honestbench trace
debt (#52/#55) cannot be paid during working hours; any daytime regression is
invisible to synthetic measurement until the next midnight. The fence is
correct; the DISTRIBUTION is the defect.

## 2 · THE COMMITTED SINGLE PATH — even-spread pacing, zero new spend
Spread the SAME daily budget across the UTC day. No ceiling change, no cron
change, no migration, no Operator.

**Mechanism (pure function, injected clock):**
```
allowedByNow(ceiling, nowUtc) = floor(ceiling × elapsedFractionOfUtcDay(nowUtc))
inject while: tokensToday + ESTIMATED_TOKENS_PER_ROUTER_CALL
              ≤ min(allowedByNow, ceiling)          // ceiling ALWAYS still binds
```
With the live numbers this yields ≈1 injection per 2.88 minutes, ~500 runs/day,
identical daily spend, continuous 00:00→24:00 coverage. The per-minute cron and
`ratePerMinute` stay untouched — the pace gate simply refuses injections the
day-fraction has not yet earned.

**Valve (floor law, F185 precedent verbatim):** one new governed param
`synthetic.paceSpread` `{type:number, min:0, max:1, sessionTweakable:false}`,
**code floor = 0 = today's burst behaviour** (the floor is TODAY'S state, never
a new state; an outage can never change what the system does today).
Self-seeds through the existing AGENT_PARAM_SEEDS mapping. The flip to 1 is a
`domain_rules` publish via the existing gated `publishAgentParam` CLI —
reversible both ways, zero redeploy. Owner consent for the flip: granted in the
S100 opening ("baslat" on the stated no-new-spend path); the publish records
that reason.

**Honesty of the waiting state:** a paced skip is NOT silence and NOT
`ceiling-reached`. New closed reason `pace-wait`, logged with
`{tokensToday, allowedByNow, ceiling}` — a reader must be able to tell "budget
spent" from "budget not yet earned" (empty≠zero, applied to time).

## 3 · WHAT THIS DESIGN REFUSES
- Raising the ceiling (max 2000000): spend consent — not needed, not asked.
- Editing vercel.json cadence: pacing would live in deploy config instead of
  governance; a ceiling publish would silently desynchronise from it.
- A separate "pacer cron": second writer, same organ — S90-1 territory.

## 4 · FIRST CONSUMERS (S98-L4, by name)
(i) the golden runner and eval canary — daytime synthetic evidence to score;
(ii) honestbench trace debt (#52/#55) — payable in working hours;
(iii) the Architect's own boot read — `synthetic_runs` hourly histogram is the
post-deploy proof surface.

## 5 · POST-DEPLOY PROOF (S63-1, named before build)
After merge + flip: `select date_trunc('hour', created_at), count(*) from
synthetic_runs where created_at > <flip-ts> group by 1` shows non-empty hours
past 02:00Z through the working day, and the day's total tokens remain at or
under the governed ceiling. Both reads pasted into the report addendum.

<!-- END · cwf-design-SYNTH-PACING-1-v1 -->
