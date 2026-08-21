# PHASE OBS-TRACE-2b — `.rpc()` read tracing (F150)
**claude-code-PHASE-OBS-TRACE-2b-v1 · rev 1 · 2026-07-21 · Architect: Claude · Executor: AG-B**

> PLATINUM statement: this phase extends the existing self-configuring trace
> layer — every `.rpc()` call traces BY CONSTRUCTION through the one wrapped
> client; zero per-call-site edits, zero manual configuration, zero owner steps.

---

## §P · PRECONDITION (S47-1 — verify BEFORE touching anything)
Valid ONLY while `origin/master == 49ea01d4d9d93fa7bd7c0d7e52197a88e13382ae`
(docVersion rev 126) and NO other PR is open against
`api/cwf/_lib/persistence/**`. On mismatch: **STOP and report actual state.**

```bash
cd /tmp && rm -rf cwf_yaprak && git clone --quiet https://github.com/maymun207/cwf_yaprak && cd cwf_yaprak
git rev-parse origin/master   # must print 49ea01d4d9d93fa7bd7c0d7e52197a88e13382ae
```
Grep all pre-flight/test commands from `package.json` (S32-1) — do not guess.

## §0 · HOUSEKEEPING (same payload, do first)
Delete the merged remote branches (GitHub hygiene, owner-sanctioned):
`obs-trace-1`, `obs-trace-1b`, `obs-trace-2`, `obs-trace-3`, `batch-w-1`,
`hotfix/f149`. Verify each is fully merged into master (`git branch -r --merged
origin/master`) BEFORE deleting; report any that is not merged instead of
deleting it. Then create working branch `obs-trace-2b` from origin/master.

## §1 · WHY (context, one paragraph)
FULL-TRACE MANDATE (constitutional): no read stays dark. OBS-TRACE-2's proxy
traces all 144 `.from()` reads but explicitly re-binds `.rpc` untouched
(`dbReadSpanWrap.ts` ~line 192). Eleven runtime stored-procedure call sites are
therefore invisible in Langfuse: `UserChatQuotasRepository` (chat_quota_reserve,
chat_quota_settle) · `UsageAnalyticsRepository` (usage_daily_series,
usage_totals_by_user, usage_empty_by_fingerprint, usage_by_fingerprint) ·
`GoldenRunsRepository` (golden_run_claim_chunks, golden_run_add_tokens) ·
`RouterProposalsRepository` (record_router_proposal) · `UserQuotasRepository`
(replay_quota_reserve, replay_quota_settle). **OUT OF SCOPE:**
`scripts/verifyGrants.ts:200` — that is a separate `anon` client in the script
lane, not the wrapped service client and not turn-path; do not touch it.

## §2 · BINDING CONSTRAINTS
1. **One wrap point.** Extend `dbReadSpanWrap.ts`'s proxy only: intercept
   `prop === 'rpc'` and wrap the returned builder with the SAME terminal-`.then()`
   span machinery (rpc builders are thenable and self-chaining — `.single()`,
   `.select()` etc. `return this`; the existing re-proxy pattern applies as-is).
   Zero edits inside any repository file. Idempotent wrap (G2.1 marker) must
   still hold.
2. **Span identity.** Reuse `SPAN_DB_READ` (`cwf.db.read`) — do NOT mint a new
   `SPAN_*` constant. Attributes: `ATTR_DB_OP = 'rpc'`; `ATTR_DB_TABLE` carries
   the function name (document this reuse in a one-line comment at the attr
   constant in `config.ts`; comment-only there — no attr renames).
3. **Secret boundary (safe default, no new deny-list).** RPC ARG VALUES are
   NEVER emitted — filter_summary = `args:<key1>|<key2>` (keys only, sorted),
   `(none)` when no args. This is stricter than the `.from()` path on purpose:
   rpc args routinely carry ids/amounts and functions are not in `DB_TABLES`,
   so there is no enum to derive a deny-list from. Error path stays `.code`
   only, never `.message`.
4. **empty≠zero at the rpc layer (THE trap — read twice).** An rpc resolving
   `data: null` may be a VOID function (e.g. `chat_quota_settle`), not an empty
   result. The `.from()` mapping `null→0` would FABRICATE a zero here.
   Therefore for op='rpc': `row_count` = `data.length` iff `Array.isArray(data)`
   and `ok`; otherwise `row_count` is ABSENT (null). Additionally stamp an
   output field `dataShape: 'array' | 'scalar' | 'object' | 'null'` so the
   trace stays honest about what came back. Never emit `row_count: 0` for a
   non-array rpc result.
5. `setSpanIO` input = `{ fn, op: 'rpc', argKeys }`; output = `{ ok, dataShape,
   rowCount?, latencyMs, errorCode? }` — same scrubbed-by-construction posture,
   no re-serialize of arg values anywhere.
6. C1 LAW / ADR-008 untouched: no writes, no digest/ledger changes needed —
   the DigestSpanProcessor already taps `cwf.db.read` spans by reference; verify
   (do not modify) that rpc spans flow into the digest like `.from()` spans.
7. No changes to: staging engine, eval-gate, grounding/trust files,
   `getServiceClient()` signature, any migration. Zero new migrations expected.

## §3 · GATED SUB-PHASES
- **G1 — RED first (mandatory Red→Green proof).** Extend
  `spanIOCompleteness.test.ts` (or a sibling in the same dir) with a test that
  drives a representative rpc call through the wrapped client (mock PostgREST
  layer, same harness as `dbReadSpanWrap.test.ts`) and asserts a `cwf.db.read`
  span with op='rpc' + I/O exists. Run it on the UNMODIFIED tree and capture
  the RED output verbatim into the report. A guard green from the start is
  worthless.
- **G2 — implement** per §2. Include in `dbReadSpanWrap.test.ts`:
  (a) void-rpc case: `data:null` → NO row_count, `dataShape:'null'`;
  (b) array case: row_count = length, 0-length → `row_count:0` (real zero);
  (c) hard leak test: seed an arg value `sk-live-LEAKCANARY` and assert it is
  absent from EVERY setAttribute/setSpanIO payload;
  (d) self-chaining: `.rpc(fn).single()` still spans and resolves identically;
  (e) idempotent double-wrap no-op.
- **G3 — full suite + CI.** Full unsharded local pass, push branch, open PR.
  S37-2: unsharded CI green on the PR head is the merge precondition.

## §4 · SELF-VERIFY CHECKLIST (evidence, literal)
- [ ] G1 RED output pasted (test fails on pre-change tree).
- [ ] G1 test GREEN post-change; completeness guard still green, allowlist EMPTY.
- [ ] All five G2 test cases present and green, named in the report.
- [ ] `git diff --stat origin/master..HEAD` pasted; touched files ⊆
      `{api/cwf/_lib/persistence/dbReadSpanWrap.ts, api/cwf/_lib/observability/config.ts (comment only), tests}`
      (+ doc-drift reseal if the manifest maps a touched file — S34-1: budget it).
- [ ] Grep proof: zero edits in `repositories/*.ts`; `scripts/verifyGrants.ts`
      untouched.
- [ ] CI (unsharded) green link on the PR head.
- [ ] Branch-cleanup report from §0 (which branches deleted / any refused).
- [ ] Report cites the REAL merge-base hash from a fresh `git rev-parse`
      (S54-1 / the PR#86 stale-anchor lesson).

## §5 · WHAT YOU DO NOT DO
No merge (Architect reviews per FULL profile — persistence seam — then authors
the verbatim merge message, S30-2). No migrations. No golden runs (FREEZE). No
prompt.segment surface. No live Vercel env changes.

<!-- END · claude-code-PHASE-OBS-TRACE-2b-v1 · rev 1 · 2026-07-21 -->
