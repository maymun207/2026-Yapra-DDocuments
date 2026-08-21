# PHASE `GOLDEN-BATCH-1` — the golden gate learns to finish (F89)

<!-- claude-code-PHASE-GOLDEN-BATCH-1-v1 · rev 1 · 2026-07-14 · Session 42.
     Author: Architect. Executor: AG. DO NOT START before ROUTE-GOV-1 v2_2 merges — one phase in
     flight at a time; re-derive the anchor at §0 (expect it to be the ROUTE-GOV-1 merge commit).
     Closes F89. Unblocks EVERY prompt.segment publish (viz v2 republish, F83.1 SCOPE-HONEST-1).
     Ceremony: FULL + OPERATOR LANE (one migration, two tables). Reseal expected.
     OWNER DECISIONS BAKED IN (vetoable before build): cron-driven background execution;
     ~6–12M tokens and ~700 live ARMES calls per golden publish accepted as the price of the gate;
     per-run ceiling is a governed L1 param. -->

---

## 0 · PRE-FLIGHT GATE

```bash
cd /tmp && rm -rf cwf_yaprak && git clone --quiet https://github.com/maymun207/cwf_yaprak.git
cd cwf_yaprak && git rev-parse origin/master   # RECORD — must be the ROUTE-GOV-1 v2_2 merge; if
                                               # route-gov-2 is unmerged, STOP (sequencing rule)
npm ci --no-audit --no-fund --silent
npx tsc -b && npm run typecheck:api && npx tsx scripts/checkDocDrift.ts   # clean · [OK] · RECORD rev
npx vitest run --reporter=dot                  # RECORD count/files (UNSHARDED)
```

---

## 1 · WHY — the sensor that suffocates, with numbers

Four publish attempts on the `viz` prompt segment last night. Four rejections. `replay_audit` shows
why, and it is not a regression:

```
verdict: "underpowered" · completed: false
specimen 1 → ok            (baseline arm alone: 431–533k tokens)
specimens 2..20 → "token budget exhausted before this specimen"
```

`REPLAY_TOKEN_BUDGET = 500_000`, and its own docblock says it was *"sized for ~10 reps of ONE
tool-heavy turn."* The golden batch is **20 specimens × 2 arms × 3 reps = 120 real turns** sharing
that one budget — under-provisioned ~8–20×, from day one. The L2 contract then does exactly what it
should (*an under-sampled batch certifies nothing*) and rejects. Net effect today: **no prompt
segment can be published at all.** The sensor built to protect prompt governance is holding prompt
governance hostage — including F83.1, the owner's highest-priority capability change.

Raising the constant cannot fix this: 120 real turns do not fit one serverless invocation (time
wall), and the true cost per publish is **~6–12M tokens and ~700 live ARMES tool calls** — a spend
that must be *decided*, paced, and observable, not smuggled inside a button click.

**The design in one line:** decouple RUN from PUBLISH. The golden batch becomes a **background,
chunked run** — one replay turn per chunk, claimed and executed by a cron-driven runner, accumulated
in DB, finalized into exactly today's `replay_audit` outcome shape — and PUBLISH stays what it
already is: *supply a completed, fresh, hash-matching `goldenRunId` to the contract.* The contract's
laws do not move; the execution grows lungs.

Reuse anchors (grep, do not re-derive): `api/admin/prompt-golden.ts` (today's sync batch — its
pooling/Wilson/verdict math is the reference the finalizer must reproduce byte-identically),
`api/admin/eval-ci.ts` (canary — reps arithmetic + audit-row shape), the L2 contract
`goldenPublishContract.ts`, `api/admin/rollout-guardrail.ts` + `vercel.json` crons (the CRON_SECRET
auth pattern to copy), `golden_specimens` repository, the per-turn replay engine entry that
prompt-golden already calls, PARAM-GOV-1 (the governed-param chain for the new ceiling).

---

## 2 · BINDING CONSTRAINTS

1. **S39-2 / S37-2** — branch (`golden-batch-1`) → PR → CI green on head → Architect's verbatim
   `--no-ff` merge. Sharded ≠ CI.
2. **The L2 contract's laws are untouched:** golden-set-non-empty ⇒ run required; incomplete ⇒
   reject; regression ⇒ reject; candidate-hash mismatch ⇒ reject; stale ⇒ reject. Additive fields
   only. If the contract file needs more than additive reads, STOP and report.
3. **Statistics byte-identical:** the finalizer computes pooled/Wilson/verdict with the SAME
   functions the sync path uses today (import, don't copy). A fixture test asserts outcome-shape
   equality between a finalized chunked run and the sync reference on identical digests.
4. **The per-turn replay engine is not modified.** Chunks call the existing single-replay entry.
   Empty≠zero scoring, grounding lens, C1 LAW (zero `messages` writes) — all inherited, none edited.
5. **Candidate pinning:** run START snapshots the candidate payload hash AND the golden-set hash
   into the run row. Chunks execute against the pinned candidate content stored in the run row —
   never the live draft. Mid-run edits ⇒ hash mismatch at publish ⇒ honest rejection (test it).
6. **Factory-load discipline:** runner concurrency ≤ 2 chunks per tick; one replay turn per chunk.
   The run row records total ARMES calls observed. No parallel fan-out beyond the tick's bound.
7. **S33-1:** cron-actor writes use NULL for any `uuid references auth.users` column + attribution
   in the jsonb (`{"actor":"golden-cron"}`).
8. **DB ceremony:** migration applied ONLY by the Operator (`supabase db push`); FIX-2 all-grantees
   revoke; `verifyGrants` probe rows for BOTH tables + CI coverage; S31-1 idempotence on any seed.
9. **Governed ceiling (the F39 lesson applied here):** `quota.goldenRunTokenCeiling` becomes an L1
   `agent.param` (seed value **12_000_000**, clamp `[1_000_000, 30_000_000]`), resolved at run
   START and stamped on the run row + `[GoldenRun]` log. The per-CHUNK cap stays a code const
   (single-turn engine floor, like MAX_TOOL_ROUNDS' floor): `GOLDEN_CHUNK_TOKEN_CAP = 500_000`.
10. **Existing replay UX budgets unchanged:** the Replay tab's single/perturb flows and the
    REPLAY-QUOTA subsystem keep their semantics; golden chunks draw the SAME per-user replay quota
    (real spend is real spend) — assert with a test, and surface total spend in the run row.
11. **ADR-007 / S40-5:** no secrets anywhere; ONE bounded log line per chunk
    (`[GoldenRun] run=… chunk=17/120 spec=… arm=cand rep=2 tokens=… ok`) + one per finalize.
12. **Born loud (anti-F88):** every new endpoint returns and LOGS its rejection reason; no silent
    `null` path from any new client code.

---

## 3 · SUB-PHASES (gated)

### A · State: `golden_runs` + `golden_run_chunks` (migration + repositories)

1. Migration `supabase/migrations/<ts>_golden_batch_runs.sql`:
   ```sql
   create table if not exists public.golden_runs (
       id                 uuid primary key default gen_random_uuid(),
       rule_id            uuid not null,
       candidate_hash     text not null,
       candidate_payload  jsonb not null,          -- pinned content chunks execute against
       golden_set_hash    text not null,
       specimen_ids       jsonb not null,          -- pinned list
       reps_per_specimen  int  not null default 3,
       token_ceiling      bigint not null,          -- resolved governed param, stamped
       tokens_spent       bigint not null default 0,
       status             text not null default 'running'
                          check (status in ('running','completed','failed','aborted')),
       verdict            text,
       outcome            jsonb,                    -- finalized, byte-shape of replay_audit outcome
       started_by         uuid references auth.users (id) on delete set null,
       attribution        jsonb,                    -- {"actor":"panel"|"golden-cron"} (S33-1)
       created_at         timestamptz not null default now(),
       updated_at         timestamptz not null default now()
   );
   create table if not exists public.golden_run_chunks (
       id          uuid primary key default gen_random_uuid(),
       run_id      uuid not null references public.golden_runs (id) on delete cascade,
       specimen_id text not null,
       arm         text not null check (arm in ('baseline','candidate')),
       rep         int  not null,
       status      text not null default 'pending'
                   check (status in ('pending','running','done','failed')),
       claimed_at  timestamptz,
       digest      jsonb,                           -- per-turn digest the pooling math consumes
       tokens      int,
       error       text,
       unique (run_id, specimen_id, arm, rep)
   );
   ```
   RLS deny-all; service-role via repositories only; FIX-2 grants; `verifyGrants` probe rows ×2.
2. Repositories: `createRun` (pins candidate+set, enumerates chunks pending), `claimNextChunk`
   (atomic `update … where status='pending' … limit 1 returning`; stale `running` older than 10 min
   is reclaimable), `storeChunk`, `finalizeIfComplete` (all chunks done ⇒ pool → Wilson → verdict →
   write `outcome` + status + ONE `replay_audit` row in today's exact shape ⇒ the contract needs no
   new fetch path), `abortRun`, spend accounting into `tokens_spent` (ceiling exceeded ⇒ run
   `failed`, reason recorded — never a silent stop).

**Gate A:** grants tests; claim-atomicity test (two concurrent claims never take the same chunk);
ceiling-exceeded honest-fail test; finalize shape-equality fixture test (constraint 3).

### B · The runner: cron-driven ticks + manual tick

1. `api/admin/golden-runner.ts`: auth = CRON_SECRET header (copy rollout-guardrail's pattern
   verbatim) OR an admin session (so the panel's "şimdi işle" button can call the same endpoint).
   One tick: claim up to 2 chunks → execute each via the existing single-replay entry against the
   run's pinned candidate → store digests/tokens → `finalizeIfComplete`. Hard wall-clock guard: stop
   claiming after 45s so the invocation never nears the platform limit.
2. `vercel.json` crons: add `{ "path": "/api/admin/golden-runner", "schedule": "* * * * *" }`
   (per-minute; silent no-op when nothing is pending — ADR-007's silent-idle is correct behaviour,
   but a CLAIMED chunk always logs its one line).
3. Expected wall time at concurrency 2 + ~30-60s/turn: **a 120-chunk run completes in ~30–60 min in
   the background.** The owner starts it and walks away.

**Gate B:** runner tests with a stubbed replay entry (tick claims ≤2; respects wall guard; cron auth
rejects bad secret; manual path requires admin); an end-to-end fixture run (4 chunks) reaching
`completed` with a verdict.

### C · Orchestration + panel truth

1. `POST /api/admin/golden-runs` (start): resolves the governed ceiling, pins candidate + set,
   enumerates chunks, returns `{ runId, chunkCount, estTokens }`. Refuses a second `running` run for
   the same rule (one at a time — honest error).
2. `GET /api/admin/golden-runs/:id` (progress): counts + spend + verdict when done.
   `POST …/:id/abort`.
3. Rules tab, prompt.segment publish flow becomes two honest steps when the golden set is non-empty:
   - **"Altın koşuyu başlat"** → confirm dialog states the REAL price before consent:
     `"20 örnek × 2 kol × 3 tekrar = 120 tur · tahmini ~%d token · canlı ARMES çağrıları içerir ·
     arka planda ~30–60 dk"`. Then a progress strip (poll): `Altın koşu: 47/120 · %s token · sürüyor`
     with "şimdi işle" (manual tick) and "iptal".
   - On `completed`: the verdict renders (pass/regression, per-arm rates), and **"Yayınla"** enables,
     wired to pass the `goldenRunId` to the EXISTING publish path. On `failed/aborted`: the reason
     renders, republish of the RUN is offered — never a silent dead button (anti-F88; the stale-
     verdict clearing bug F90 stays in GATE-VISIBLE-1's scope, but nothing NEW here may exhibit it:
     the run strip is keyed to the selected rule id).
4. The old inline `runPromptGolden` sync call is retired from the publish path (the endpoint may
   remain for tests/CLI, marked as such) — grep every caller; no orphaned code path that can still
   attempt a 20-specimen batch in one request.

**Gate C:** RED-first: on the anchor, reproduce last night exactly (non-empty golden set ⇒ publish
attempt ⇒ `underpowered/completed:false` rejection); on HEAD, the two-step flow publishes with a
finalized fixture run. Panel state tests (progress, failure reason, one-run-at-a-time).

### D · Observability + docs

1. `[GoldenRun]` chunk + finalize log lines (constraint 11) — the Architect must be able to follow a
   run from Vercel logs alone.
2. The run row is the audit; `replay_audit` finalize row preserves the historical query surface
   (last night's SQL keeps working).
3. CHANGELOG + KB: the two-step publish flow, the cron, the ceiling param, the price of a publish.

---

## 4 · WHAT MUST NOT MOVE

- `goldenPublishContract` semantics (additive reads only). The eval-gate engine/stage order/schema
  interpreter — byte-identical, prove with an empty diff on the engine files.
- The per-turn replay engine; single/perturb Replay-tab flows; REPLAY-QUOTA semantics.
- `agent.param` machinery (the new ceiling is one more seed through the EXISTING chain).
- `golden_specimens` marking flow. Canary (`eval-ci`) behaviour.
- Chat/turn hot path: zero new reads or imports (grep-test).

## 5 · SELF-VERIFICATION (paste each)

1. Anchor SHA (must be the ROUTE-GOV-1 merge) · branch · PR URL.
2. Diff stat; `-- supabase` shows exactly ONE new migration; engine files empty-diff list.
3. Shape-equality fixture test (chunked finalize ≡ sync math) — pasted output.
4. Claim-atomicity + ceiling-fail + pinning (mid-run edit ⇒ publish reject) tests.
5. RED-first §3.C reproduction on anchor + green on HEAD.
6. Cron auth tests; wall-guard test; `vercel.json` diff.
7. Grep proof: no caller left on the retired sync batch path; no new turn-path imports.
8. `[GoldenRun]` sample lines from a local fixture run.
9. tsc · typecheck:api · UNSHARDED vitest count vs anchor · drift/reseal rev.
10. **CI green on the PR head.**

## 6 · OWNER STEPS (after merge — Architect re-issues click-level)

1. **Operator (FENCE):** apply the migration (`supabase db push`) — Architect authors the prompt.
2. `git pull` → `npm run seed:agent-params` (publishes `quota.goldenRunTokenCeiling`; idempotent).
3. Verify cron visible in Vercel project settings (Architect confirms first firing from logs).
4. Rules → System → Prompt → `viz` → **"Altın koşuyu başlat"** → walk away → return → **"Yayınla"**.
   That single act closes F89 AND ships the F82 model-side directive that has been waiting.
5. Then F83.1 (`SCOPE-HONEST-1`) becomes publishable — the Architect queues its phase next.

## 7 · ACCEPTANCE

1. A prompt.segment publish is again POSSIBLE — gated, not strangled: run completes in the
   background, verdict visible, publish consumes it.
2. An incomplete/stale/hash-mismatched run still cannot publish (the contract's laws, proven).
3. The price is consented and observable: confirm dialog → progress → `[GoldenRun]` in Vercel logs
   → spend on the run row.
4. Last night's SQL over `replay_audit` still returns finalized runs.

## 8 · OUT OF SCOPE

GATE-VISIBLE-1 (F88 silent-422 UX / F90 stale verdict — next). Golden-set curation/subsetting.
Reps-count governance (knob later). SEMANTIC-ROUTING-1. Superset activation. Any change to what
"regression" means statistically.

<!-- END · claude-code-PHASE-GOLDEN-BATCH-1-v1 · rev 1 · 2026-07-14 -->
