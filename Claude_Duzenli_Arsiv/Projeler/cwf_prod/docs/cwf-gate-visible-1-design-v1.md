# GATE-VISIBLE-1 — a rejection stops being invisible; a verdict stops answering for a rule it did not come from

<!-- cwf-gate-visible-1-design-v1 · rev 1 · 2026-07-14 · Session 43.
     Design note ONLY (the phase prompt is authored when queue #4's turn arrives — after
     GOLDEN-BATCH-1 merges and the viz v2 republish completes, per register v44 §3).
     Findings: F88 (silent rejected publish) + F90 (stale GateVerdict).
     Anchor evidence: fresh clone at origin/master c5f58a4 · 2212/216 · rev 74 · drift [OK].
     Standing rules in force: S41-1 born-loud · S40-5 bounded logging · ADR-007 (no secrets
     in logs) · F82's law ("wrong ≠ missing"; a thing must not answer for what it did not
     come from) · eval-gate machinery untouched. -->

---

## 1 · DIAGNOSIS — the anatomy of the silence (code-cited, all at `c5f58a4`)

The teaching surface **exists and was built for exactly this moment** — and has never once
executed for a live rejection. Four independent breaks stack:

**Break 1 — the transport discards the verdict.**
`api/admin/rules/[id].ts:103` answers a gate rejection with the RICH body
`{ published:false, failedStage, stages, rule, layer2 }` under HTTP **422** (REST-correct).
`adminFetch` (`src/lib/adminService.ts:640-642`) treats every `!res.ok` as a transport error:
it throws `AdminApiError(status, body.error ?? 'Admin API 422')`. The rich body has **no
`error` field**, so the throw carries the generic string and the verdict — stages, failed
stage, golden reason — is discarded at the transport seam. `AdminApiError`
(`adminService.ts:615-618`) has no `body` member; nothing downstream could recover it.

**Break 2 — `guarded` converts the throw to `null`.**
`adminStore.publish` (`src/store/adminStore.ts:252-256`) wraps the call in
`guarded(set, …, null)` (`:147-159`): catch → `set({ error: 'Admin API 422' })` → return
`null`. `if (verdict)` is false ⇒ `lastPublish` is **never set for a rejection**.

**Break 3 — the component's rejection branch is dead code in production.**
`RulesTab.tsx:179-182` has three toast branches (`published` / `layer2` / gate) — all keyed
on a non-null `verdict`, so none fires. `RulesTab.tsx:521` renders
`{lastPublish && <GateVerdict …/>}` — never set on reject ⇒ never shown.
`GateVerdict.tsx`'s header comment promises "on reject it shows WHICH stage failed and the
stage's errors verbatim" — that branch has **never run live**. S41's seven 422s were this.

**Break 4 — the server whispers nothing.**
No `console.*` exists anywhere on the publish path — pass or fail. The only line the
Architect could ever see in Vercel logs is the platform's bare `POST … 422`. This repeats
the PARAM-GOV-1 lesson verbatim: what the ledger records, the log must whisper, or the
Architect is blind.

**The false alibi — the wrong-seam test.**
`src/store/__tests__/adminStore.test.ts:64-72` ("publish() stores the gate verdict — the
teaching surface") mocks `adminService.publish` to **resolve** with a failed verdict. The
real service **throws** on 422. The test encodes the design intent at a seam ABOVE the
break, so the suite is green while the feature is dead. This is the S37-2 lesson in a new
costume: a green that isn't the same experiment production runs.

**What the audit ledger actually does (better than F88 assumed).**
`governance.ts` writes `action='reject'` rows on all three governance rejections (gate
fail, rollout-in-flight, golden reject) with `failedStage`/errors in `detail`;
`'reject'` has been in the DB CHECK since birth
(`supabase/migrations/20260627150003_rule_audit.sql:13-16`). Two real gaps remain:
(a) the three **early returns** (`governance.ts:193-198`: rule not found · not a draft ·
unknown kind) return `{ok:false}` with **no audit and no log**; (b) **no UI surface reads
`rule_audit` at all** — the detail pane's timeline reads `rule_versions`, which only gains
rows on SUCCESS (`insertVersion` sits in the pass path). So even if S41's reject rows
exist in prod, the owner had no window that could show them. "No trace" was true from
every seat anyone was sitting in. §7 settles the live question with one read.

---

## 2 · THE LAW — F82, transplanted to the panel

F90's mechanism: `lastPublish: PublishResult | null` (`adminStore.ts:45`) carries **no rule
identity**. `RulesTab.tsx:304` (New draft) calls `clearPublish()`; the two selection sites
at `:316` (queue click) and `:341` (list click) do not. Select rule B after publishing rule
A ⇒ A's green "Published — gate passed" renders over B.

Sprinkling `clearPublish()` onto `:316` and `:341` fixes today's two sites and leaves the
bug class alive for the third site someone adds next quarter. The committed fix is the same
law VIZ-BIND-1 just shipped for tables: **bind the verdict to the identity it was produced
for, and render only on identity match.** A verdict must not answer for a rule it did not
come from. Staleness becomes impossible by construction, not by discipline.

---

## 3 · DESIGN (committed single path)

### A · Client transport: a 422 with a verdict body is a DOMAIN RESULT, not a transport error
1. `AdminApiError` gains `public body?: unknown` (third ctor arg); `adminFetch` passes the
   already-parsed body into every throw. Zero behaviour change for all other callers.
2. `adminService.publish` alone catches: `AdminApiError && status===422 && body` is an
   object with `'published' in body` → **return body as PublishResult**. Anything else
   rethrows. The HTTP contract (`200/422`) is untouched — REST semantics stay correct; the
   client stops mistaking a governance answer for a network failure.

### B · Identity-bound verdict (F90 dies by construction)
1. Store: `lastPublish: { forRuleId: string; verdict: PublishResult } | null`.
   `publish(id,…)` sets `{ forRuleId: id, verdict }` for pass AND fail; `loadRules()` only
   when `verdict.published` (a rejection changed nothing server-side).
2. Render (`RulesTab.tsx:521`):
   `{lastPublish?.forRuleId === selectedId && !creating && <GateVerdict verdict={lastPublish.verdict} …/>}`.
3. `clearPublish()` at `:304` stays (hygiene on entering create-mode). `:316`/`:341` need
   **no edits** — identity does the work; a future fourth selection site inherits safety.
4. Existing toasts (`:179-182`) now fire for rejections (verdict arrives). Add the missing
   final branch: `else` (null verdict = thrown transport/early-return path) → toast the
   store `error` (`'Yayın başarısız' / 'Publish failed: <reason>'`). No path is silent.

### C · Server: ONE bounded `[Gate]` line per lifecycle action, every outcome
Emitted in the endpoint handler (`api/admin/rules/[id].ts`) via one tiny helper — the
service stays pure, and the log attaches to the HTTP surface the Architect greps:
```
[Gate] action=publish kind=system.prompt_segment key=viz rule=1f3a9c2e actor=7be1d4a0 verdict=rejected stage=behavioral reason="zone IKINCILUST hasBarcode=true" ms=412
[Gate] action=publish … verdict=published stage=- reason=- ms=388
[Gate] action=publish … verdict=error stage=- reason="only a draft can be published" ms=6
[Gate] action=rollback|archive … verdict=ok|error reason=…
```
Bounded (S40-5): ids truncated to 8 chars, `reason` = first gate error, ≤120 chars, **never
payload contents** (ADR-007 posture; gate errors are invariant descriptions, not data).
This gives the Architect eyes even when the audit insert itself fails
(`RuleStoreRepository.insertAudit` `:250-253` logs its own error but never throws — correct;
the `[Gate]` line is the independent witness).

### D · The ledger becomes visible: audit trail in the rule detail pane
1. `GET /api/admin/rules/:id` response gains `audit`: last 20 `rule_audit` rows for
   `target_rule` (`created_at, action, reason, detail, actor`) via a new
   `listAuditForRule(ruleId, limit)` on the repository (service-role read, same client).
2. Detail pane renders a compact **"Denetim izi / Audit trail"** list under the version
   timeline — rejects styled destructive with `failedStage`/reason from `detail`, publishes
   with version. This closes the observation-surface gap that manufactured F88's "no
   trace": the version timeline structurally CANNOT show failures; the audit list can.
3. Early returns stay auditless **deliberately**: they are request-shape errors, not
   governance decisions — recording `reject` rows for "rule not found" pollutes the ledger.
   S41-1 loudness for them = the `[Gate] verdict=error` line (§C) + the else-toast (§B.4).
   This position is stated so it is a decision, not an omission.

---

## 4 · WHAT MUST NOT MOVE
- **Eval-gate machinery byte-identical**: engine, stage order, schema interpreter,
  `governance.ts` publish logic (audit writes included) — the endpoint only gains logging
  around the existing call; `git diff` on gate files must be empty.
- HTTP contract of `[id].ts`: statuses and body shapes unchanged (200/422, rich body).
- `adminFetch` semantics for every caller except the one publish catch (throw-on-!ok stays).
- `guarded` untouched.
- GateVerdict.tsx rendering internals (it finally gets to do its job, unmodified).
- C1 LAW · RLS posture · no new tables, no migration (rule_audit + 'reject' exist since
  `20260627150003`).

---

## 5 · RED-FIRST TEST PLAN (each fails on the anchor, passes on HEAD)
1. **Transport:** fetch-level mock, 422 + rich body ⇒ `adminService.publish` RESOLVES with
   `published:false` (anchor: throws).
2. **Store:** re-seat the wrong-seam test at the fetch/adminFetch level; assert rejection
   sets `lastPublish = { forRuleId, verdict }` (anchor: null) and does NOT `loadRules()`.
3. **RulesTab (jsdom):** publish→reject ⇒ GateVerdict visible with "Rejected — BEHAVIORAL"
   + verbatim stage error (anchor: absent).
4. **F90 identity, both live sites:** verdict for A; click B via list (`:341`) ⇒ no
   GateVerdict; via queue (`:316`) ⇒ no GateVerdict; reselect A ⇒ renders again (proves
   identity-match, not clearing).
5. **{error}-shape 422** (not-a-draft) ⇒ else-toast fires with the reason (anchor: total
   silence).
6. **Endpoint log:** console spy — published / gate-reject / golden-reject / early-error
   each emit exactly ONE `[Gate]` line; assert bounded fields, assert NO payload text.
7. **Detail audit:** GET returns `audit` incl. an `action='reject'` fixture row; pane
   renders it destructive-styled.

---

## 6 · CEREMONY & SEQUENCING
**FULL profile** — touches `api/**` + `src/**` and sits adjacent to the gate surface (engine
untouched, but the api/** rule alone mandates FULL). **NO migration ⇒ the Operator lane is
not consumed** — this phase cannot tangle with ROUTE-GOV-1's or GOLDEN-BATCH-1's
migrations. Queue position stays **#4** (register v44 §3 — the order is the owner's
sequencing decision); the no-migration fact is recorded so the option to slide it into any
AG idle window exists WITHOUT an Operator dependency, should the owner ever choose to.

---

## 7 · THE ONE LIVE QUESTION (read-only; fold into the next fenced Operator visit)
Do S41's rejections exist as `action='reject'` rows in prod `rule_audit`? Code says they
should (the golden-reject path audits). Two reads settle it — append to the ROUTE-GOV-1
Operator prompt (it already carries the F73 deletion; reads cost nothing):
```sql
select action, count(*) from public.rule_audit group by 1 order by 2 desc;
select created_at, action, target_kind, reason, detail
from public.rule_audit where action = 'reject'
order by created_at desc limit 10;
```
- Rows exist ⇒ F88's "no audit row" was the observation-surface gap; §3.D is the complete
  answer. **Expected branch.**
- Zero rows ⇒ NEW finding (live insert failing despite the healthy CHECK) — mint it in the
  register and diagnose (the §C log line will thereafter witness every attempt regardless).

---

## 8 · OUT OF SCOPE
Gate engine/stage changes · rollback/archive UX beyond the `[Gate]` line · `rule_audit`
retention/pagination · audit rows for early returns (deliberate, §3.D.3) · GATE-VISIBLE-1's
phase prompt itself (authored at queue turn, anchored to the then-current floor) ·
GOLDEN-BATCH-1 interplay (none — different files, no shared seam).

<!-- END · cwf-gate-visible-1-design-v1 · rev 1 · 2026-07-14 -->
