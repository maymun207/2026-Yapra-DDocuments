# PHASE `PARAM-GOV-1` — the tool-round ceiling stops being a redeploy

<!-- claude-code-PHASE-PARAM-GOV-1-v1 · rev 1 · 2026-07-13 · Session 40.
     Author: Architect. Executor: AG (Claude Code / AntiGravity).
     Closes F39 (registered since S37; live evidence arrived 2026-07-13).
     Code floor: origin/master 4177eb2 · 2162 tests / 211 files · docVersion rev 71 · drift [OK].
       (If MCP-EXPLORER-1 merged first, re-derive at pre-flight; do not trust these numbers.)
     Ceremony: FULL. Touches api/** ⇒ reseal may return. Requires an OPERATOR seed step. -->

---

## 0 · PRE-FLIGHT GATE

```bash
cd /tmp && rm -rf cwf_yaprak && git clone --quiet https://github.com/maymun207/cwf_yaprak.git
cd cwf_yaprak && git rev-parse origin/master   # RECORD — this is your anchor
npm ci --no-audit --no-fund --silent
npx tsc -b                                     # clean
npx tsx scripts/checkDocDrift.ts               # [OK] — RECORD the rev
npx vitest run --reporter=dot                  # RECORD count / files
```

---

## 1 · WHY

The owner asked a heavy question in production — *"KB7 glazur, fırın alt, ikincil alt hatlarında son
24 saatteki tüm duruş, fire ve verimsizlikleri A3 olarak raporla, düzeltici aksiyon öner"* — and got
**a blank screen**. The turn ran 10 tool calls, reached `input=43085` tokens, and died with
`finishReason=error`.

`ROUTE-SCRAP-1` already made the blank honest: such a turn now says *"araç bütçesini doldurdu — soruyu
böl"*. But the ceiling itself is still **`Number(process.env.CWF_MAX_TOOL_ROUNDS) || 8`**
(`llm/config.ts:17`) — invisible in the admin panel, absent from `AGENT_PARAM_KEYS`, and raisable
only by a **redeploy**.

That is the wrong side of the line, and the project's own law says so: **a policy number is a VALUE.**
`agent.temperature` is exactly this class and it has been governed since L1. The ceiling is not a
safety invariant — it is a cost/latency trade-off the owner should be able to tune the way he tunes
temperature: publish a row, gate passes, it takes effect on the next turn.

**What stays a safety property:** the *existence* of a ceiling, and its `[min, max]` clamp. A runaway
tool loop must remain structurally impossible — governed does not mean unbounded.

---

## 2 · BINDING CONSTRAINTS

1. **S39-2 — master ONLY via a reviewed PR.** Branch → PR (fires CI) → the Architect's verbatim merge
   message.
2. **The ONE chain, the ONE clamp (§2.4 of `agentParams.ts` — this is the law you are extending, not
   bending).** Every source — lab, DB-published, code floor, env floor — passes through
   `clampParamValue`. **A scattered `??` chain on this path is forbidden.** If you find yourself
   writing `dbValue ?? envValue ?? 8`, stop: you are re-introducing the OBS-3.1 bug the single-chain
   rule exists to prevent.
3. **`sessionTweakable: false`** — decided, do not "improve" it. Making it lab-tweakable would widen
   `labMode`'s typed fields and `authorizeLab`'s allow-list, i.e. touch a **security surface**, for a
   convenience this phase does not need. The win here is "no redeploy", and Rules delivers it.
4. **The env override survives** as the floor's floor. `CWF_MAX_TOOL_ROUNDS` must keep working when
   the DB row is missing or the DB is down — exactly the `GEN_TEMPERATURE` precedent
   (`floorParams()`).
5. **`REFERENCE_AGENT_PARAMS` is APPEND-ONLY.** The file says so explicitly: *"earlier indexes are
   load-bearing in tests."* Append; never reorder.
6. **No eval-gate machinery change.** A new `agent.param` key is DATA in an existing kind — the
   staging engine, stage order and schema interpreter stay byte-identical.
7. **No migration.** `agent.param` rows are `domain_rules` rows. The new row is **seeded**, not
   DDL'd — that is the Operator step in §5.
8. **CHANGELOG in-branch.** Reseal if the drift gate asks; do not bump for nothing.

---

## 3 · THE BUILD

### 3.1 · The declaration (`reference/agentParams.ts`)

- `AGENT_PARAM_KEYS` += `MAX_TOOL_ROUNDS: 'agent.maxToolRounds'`.
- `REFERENCE_AGENT_PARAMS` += (**appended last**):

```ts
{ key: AGENT_PARAM_KEYS.MAX_TOOL_ROUNDS, value: 8, type: 'number',
  min: 2, max: 24, stage: '11', sessionTweakable: false },
```

**The numbers, and why** — put this reasoning in the code comment, not just here:
- `value: 8` — today's shipped default. **The seed must not change behaviour.**
- `min: 2` — below 2 the agent cannot call a tool and then speak about it; the loop stops being a
  loop.
- `max: 24` — three times today's ceiling. The A3-class question needs maybe 12–16. A ceiling of 200
  would let one published row turn every turn into a sustained hammering of the live MES; the clamp
  is the guard that survives a bad publish.
- `stage: '11'` — the tool loop (Araç Döngüsü). *Verify this against `stagesRegistry.ts`* — the
  `sandboxLevers` server-agreement pin (IA-1) reads this field, and a wrong stage is now a **test
  failure**, not a cosmetic slip.

### 3.2 · The resolution (the delicate part)

`ResolvedParams` today is `{ temperature, historyWindowN }`. Add `maxToolRounds: number`.

- `floorParams()` → `maxToolRounds := MAX_TOOL_ROUNDS` (the existing env-aware constant). **Keep the
  env tier**, exactly as `temperature := GEN_TEMPERATURE` does.
- `resolveAgentParamValues` resolves it through the **existing** chain and the **existing** clamp.
  Adding a third key must not add a third code path. If it does, you have not extended the chain —
  you have forked it.

### 3.3 · The consumer (`llm/gateway.ts`)

Today: `stopWhen: stepCountIs(MAX_TOOL_ROUNDS)` — a **module constant**, so the value is baked at
import time and cannot be per-turn.

- Thread the resolved value in the way `temperature` already travels from `ctx.params` into the
  stream call (follow `stageStream.ts` — do not invent a second transport).
- `streamChat`'s new parameter is **optional with the env constant as its default**, so any other
  caller (probes, tests, scripts) keeps working unchanged and the diff stays honest.
- `MAX_TOOL_ROUNDS` stays exported from `config.ts` — it is now the **floor**, not the policy.

### 3.4 · The fingerprint (do not skip this)

`configFingerprint.ts` stamps `historyWindowN` **and its source** onto the turn's root span. The
ceiling gets the same treatment: value + source (`lab` / `db` / `floor`). A turn that died against a
ceiling must be able to answer *"which ceiling, and where did it come from?"* — otherwise we have
governed a number and lost the ability to debug it, which is the opposite of the point (**S40-5**).

### 3.5 · Tests

1. **Chain + clamp:** a published row of `500` resolves to **24**; `0` resolves to **2**; a missing
   row resolves to the env floor; `CWF_MAX_TOOL_ROUNDS=12` with no row resolves to **12**;
   `CWF_MAX_TOOL_ROUNDS=999` with no row resolves to **24** (*the floor is clamped too* — the
   `agentParams.ts` docblock states this explicitly for temperature; pin it here).
2. **Per-turn, not per-import:** two turns in one process with different published values get
   different ceilings. This is the regression that the module-constant design made impossible — pin
   it.
3. **Seed is a no-op behaviourally:** with the seeded row published at `8`, the resolved ceiling
   equals today's constant.
4. **The stage is right:** the `sandboxLevers` server-agreement pin still passes (it will, since the
   new param is not a lever — but state that you ran it).
5. **Fingerprint:** value + source land on the span.

---

## 4 · SELF-VERIFICATION (paste each)

1. Anchor SHA; branch; PR URL.
2. `git diff --stat <anchor>..HEAD`. Guards: `git diff --name-only <anchor>..HEAD -- supabase` →
   **EMPTY** (no migration). No diff to the eval-gate staging engine.
3. **Prove the single chain:** `git diff <anchor>..HEAD | grep -nE "\?\?" ` — show that no new
   fallback chain appeared on the param path (or explain each hit).
4. **Prove per-turn resolution:** paste the two-turns-one-process test output.
5. **Prove the floor's floor:** paste the `CWF_MAX_TOOL_ROUNDS=999 → 24` assertion output.
6. `npx tsc -b`; `npx vitest run --reporter=dot` **UNSHARDED** — count + per-file delta.
7. Drift `[OK]`; state whether a reseal was needed and the resulting `docVersion`.
8. **CI green on the PR head.**

---

## 5 · THE OPERATOR STEP (after merge — the Architect will write the fenced prompt)

The new row must be **published** into `domain_rules` (kind `agent.param`, backend `system`, key
`agent.maxToolRounds`, payload = the reference decl, value `8`). Until then the resolver serves the
code floor — which is today's behaviour, so **nothing breaks while the seed is pending**. That is the
DB-first/code-floor pattern working exactly as designed.

AG: **do not run the seed.** Report which script publishes it (`scripts/seedAgentParams.ts` or its
current equivalent — grep it, do not assume) and whether it is idempotent on re-run.

---

## 6 · ACCEPTANCE

1. Rules → `agent.param` → a row named **`agent.maxToolRounds`**, editable, gate-checked, resettable
   to the code floor.
2. The owner publishes `16`, re-asks the A3 question, and it completes — **with no deploy**.
3. A published `500` is clamped to `24`. Governance did not become a foot-gun.
4. Inspect/Langfuse shows the ceiling **and its source** on the turn.

---

## 7 · OUT OF SCOPE

A Sandbox lever for the ceiling (would widen `labMode` + `authorizeLab` — a separate, deliberate
phase if ever wanted). Governing the categories (`ROUTE-GOV-1`). The MCP invoke console
(`MCP-INVOKE-1`). `METRIC_ALIASES` and the `resultStore` thresholds (still red in the inventory;
the latter is blocked on the F67 diagnosis).

<!-- END · claude-code-PHASE-PARAM-GOV-1-v1 · rev 1 · 2026-07-13 -->
