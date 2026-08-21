# PHASE · M1F2A · HONEST-READ-1 · v1
<!-- PHASE-M1F2A-HONEST-READ-1-v1 · 2026-08-03 · S80 · Architect: Claude Opus 5.
     Master rollout plan item 1.3 (Veri katmanı), FIRST of two gates.
     Design base: cwf-measure-1-design-note-v1 §3 · RECON-M1F2-DATA-LAYER-1-v1_1.
     SELF-CONTAINED (D-2): everything AG needs is in this file. No companion
     artifact travels with it. -->

## §0 · WHY THIS PHASE EXISTS BEFORE THE DATA LAYER

Rollout item 1.3 builds the health dashboard's measurement layer. Its readers
would have been authored on top of a foundation that **cannot tell a database
outage from a quiet day**.

The repo already contains the correct posture and the wrong one **in the same
file**. `UsageAnalyticsRepository.emptyByFingerprint` returns `null` on a read
failure, and its own comment states the reason: *a fabricated `[]` would mislabel
an outage as evidence* — because the rollout guardrail is an actuator and must
not act on fiction. Its three siblings (`dailySeries`, `totalsByUser`,
`byFingerprint`) return `[]` on the same failure. Today the blast radius is one
human-read console. Item 1.3 was about to make them the dashboard's spine, where
a DB error renders as a **flat zero line** — an outage displayed as calm.

This is the same defect class M1P0 closed (`HEAD-COUNT-SILENT-204-1`). M1P0's
census was scoped to `head:true` count reads (19 sites / 15 folds). It therefore
could not see `select(...)+reduce` folds, `delete(...).select()` folds, or
RPC-result folds. **This phase closes the rest of the class.** No new surface, no
migration, no new capability — the floor is made honest so 1.3b can stand on it.

**Standing ruling this phase enforces (new, minted by the Architect, S80):**

> **MEASURE-READ-HONESTY-1.** A read whose result feeds a **measurement**, a
> **durable ledger row**, an **actuator**, or a **spend/safety fence** MUST
> distinguish *"no data"* from *"could not read"*. Fail-open (`[]`/`0` on error)
> is legitimate **only** where the sole consumer is a human-read list and no
> decision, no stored number and no displayed metric hangs on it.

Per **D-5** this rule is tested in both directions: it must fire on every Class A
site, and it must **not** fire on Class B (the innocent-case probe).

---

## §1 · HARD PRE-FLIGHT (blocking — report literal output)

Run in a **fresh full clone**, not a reset of an existing tree (WORKDIR-
DISCIPLINE-1, two occurrences at S79; a `reset --hard` preserves only what you
remember to check).

```
git clone https://github.com/maymun207/cwf_yaprak.git <scratch> && cd <scratch>
git rev-parse origin/master
```

**Expected anchor:** `e214b7e60ec3f1d14fca1f41883eea1184046af5`
If it differs, **STOP and report** — do not rebase, do not proceed.

Then, each command verified present in `package.json` `scripts`:

| Command | Expected |
|---|---|
| `ls supabase/migrations/*.sql \| wc -l` | `65` |
| `npx vitest run` | **424 files green**; report the exact test count |
| `grep docVersion public/architecture/manifest.json` | `rev 182 · 2026-08-03` |
| `npm run check:doc-drift` | `[OK]` |
| `npm run check:tenant-zero` | `[OK]` |
| `npm run typecheck:api` | clean |

The test COUNT is not asserted here on purpose: the Architect could not arbitrate
it this session (GitHub Actions API is rate-limited from the Architect sandbox).
**Report the number you measure; it becomes the baseline.**

Branch: `phase/m1f2a-honest-read-1`.

---

## §2 · BINDING CONSTRAINTS

1. **NO migration, NO DDL, NO governed write, NO Operator door.** This phase is
   code + tests + docs only. If you believe a migration is required, STOP and
   report — do not author one.
2. **Eval-gate untouched.** `evalGate.ts` diff must be EMPTY.
3. **C1 LAW** — zero writes to `messages` from any path this phase touches.
4. **ADR-007** — secrets never echoed; no secret value in a log, a test fixture,
   or a report.
5. **RULE-1** — no hardcoded config; every bound resolves from its existing
   constant/param source.
6. **empty≠zero is sacred** and reaches the render layer. Real-0 is data;
   missing is a gap; "could not read" is a THIRD thing and must never render as
   either of the first two.
7. **FIX-SCOPE-TRUTH-1** — this fix may extend to whatever is required to keep
   its OWN new statement true, but **every extension is FLAGGED in the hand-back,
   never absorbed silently**. That half is the binding half.
8. **Positive controls are mandatory at every zero** (S66-1): a self-verify zero
   is not believed until the command is proven able to fail.
9. **No retry, no rerun, no overlay suppression** to make a gate green
   (NO-RERUN-ON-A-FLAKE-CLAIM, S79). A red is a refutation.

---

## §3 · GATED SUB-PHASES

### G1 · CENSUS — your own measurement, wider than the Architect's

The Architect's census covered **only** `api/cwf/_lib/persistence/repositories/*.ts`
and found **31** error-branch literal folds. That list is below as a
**cross-check, not as your input**. M1P0's precedent is explicit: AG's census
found a real site **beyond** the Architect's floor (`scripts/verifyRules.ts`).
Assume the same here.

**Your census scope:** `api/**`, `shared/**`, `scripts/**` — every site where a
read/query error path yields a literal `0`, `[]`, `{}` or a `?? 0` / `|| 0`
coercion that erases a `null`.

**State your method** (the exact grep/AST command) and **report your count.**
If your number differs from 31, **your number wins** and the delta is named
site-by-site. If it matches, say so explicitly — a matching number that was never
independently computed is worthless.

<details><summary>Architect cross-check list (31 sites, computed this session, line-numbered)</summary>

```
BackendTrustAdminRepository.ts:106→108  []      BackendTrustAdminRepository.ts:127→129  []
BackendTrustAdminRepository.ts:143→145  []      EpisodesRepository.ts:276→278           []
EpisodesRepository.ts:297→299           []      KindDraftsRepository.ts:60→60           []
LlmProviderSecretsRepository.ts:65→67   []      LlmProvidersPersonalRepository.ts:36→38 []
McpGlobalSettingsRepository.ts:34→36    []      McpSecretsRepository.ts:64→66           []
McpSettingsRepository.ts:32→34          []      RolesRepository.ts:44→46                []
RouterProposalsRepository.ts:88→88      []      RoutingCacheMetaRepository.ts:34→34      0
RoutingDraftsRepository.ts:57→57        []      RuleStoreRepository.ts:123/133/165/184/304 []
SyntheticQuestionSetRepository.ts:76→76 []      SyntheticRunsRepository.ts:97→97         0
ToolCacheRepository.ts:40→42            []      ToolCacheRepository.ts:65→67             0
TurnTraceDigestRepository.ts:124→124     0      UsageAnalyticsRepository.ts:63→65        []
UsageAnalyticsRepository.ts:78→80       []      UsageAnalyticsRepository.ts:116→118      []
UserAuditRepository.ts:67→67            []      UserChatQuotasRepository.ts:146→148     []
UserQuotasRepository.ts:166→168         []
```
Plus 4 numeric-coercion lines in `UsageAnalyticsRepository.ts`: 68, 83, 106, 121
(`Number(x) || 0` — a genuine SQL `null` becomes `0`). Repo-wide the
`Number(...) || 0` pattern appears **10** times under `api/cwf/_lib`.
</details>

**GATE:** no code is written until the census number and method are in the
hand-back.

---

### G2 · CLASSIFY — with the stated rule, consumer named

Apply MEASURE-READ-HONESTY-1 to every censused site. For each, record:

`file:line · method · what it returns on error · THE CONSUMER (file:line) · class`

* **Class A** — consumer is a measurement, a durable ledger row, an actuator, or
  a spend/safety fence. **Must be repaired in this phase.**
* **Class B** — consumer is a human-read list; nothing decides, stores or
  displays a number from it. **Must be left byte-untouched in this phase** and
  reported as a named carry-forward item.

The Architect's provisional Class A (yours may differ — you own the call, with
the consumer cited):

1. `SyntheticRunsRepository.tokensSpentToday` → `0` — **spend fence** (the
   injector's daily token ceiling), **and** an unpaginated `select('tokens')`.
2. `UsageAnalyticsRepository.dailySeries` → `[]` — 1.3b's series spine.
3. `UsageAnalyticsRepository.totalsByUser` → `[]` — same.
4. `UsageAnalyticsRepository.byFingerprint` → `[]` — same.
5. The four `Number(x) || 0` mapper lines (68, 83, 106, 121).
6. `ToolCacheRepository.clearAll` → `0` — the count lands in an **audit row**
   (`before:{deletedCount}`). Same family as `EpisodesRepository.deleteExpired`,
   which M1P0 already fixed for exactly this reason; missed because it is a
   `delete(...).select()`, not a head count.
7. `TurnTraceDigestRepository.deleteOlderThan` → `0` — reported as a cron
   cleanup result.

**Named judgment calls — decide and justify, do not decide silently:**
* `EpisodesRepository:276/297` → `[]`. Memory retrieval is the ADVISORY lane, but
  a read failure silently removes memory from a turn. Class A or B? State which
  and why.
* `RoutingCacheMetaRepository.getEpoch` → `0`. The Architect reads this as Class
  B: its own comment declares a deliberate *"degrade to no change"* on the
  advisory routing layer. Confirm or overturn.

**GATE:** the full classification table is in the hand-back before G3 begins.

---

### G3 · REPAIR — copy the in-repo precedent, invent nothing

Three precedents already exist. **Use them; do not author a fourth shape.**

| Consumer must… | Contract | Precedent |
|---|---|---|
| abort loudly (fence / ledger write) | **throw** a named error | `exactCountOrThrow` / `CountUnavailableError` — `api/cwf/_lib/persistence/countGuard.ts` |
| render "unmeasured" | return **`null`** (distinct from `[]`) | `UsageAnalyticsRepository.emptyByFingerprint` |
| report per-field unmeasured | **`number \| null`** per field | `EpisodesRepository.countHealth` (F221) |

Rules:
* A real `0` and a real empty list still pass through **byte-honest**. The guard
  catches failure, never success.
* `Number(x) || 0` becomes a coercion that preserves `null`. A SQL `null` is
  "not measured"; only a real `0` is `0`.
* Every changed signature's callers are updated **in the same commit** — a
  compile break left for later is a broken build, not a deferral.

---

### G4 · THE SPEND FENCE — the one that disarms itself when raised

`SyntheticRunsRepository.tokensSpentToday()` carries **two independent** faults:

1. `if (error) { … return 0; }` — a DB blip reads as *"nothing spent today"* and
   the injector keeps injecting.
2. `select('tokens')` with no pagination. PostgREST caps at db-max-rows (**1000**)
   **with no truncation signal**. At the code floor
   (`synthetic.dailyTokenCeiling` = 200 000 ÷ `ESTIMATED_TOKENS_PER_ROUTER_CALL`
   400 = **500 rows/day**) it is under the cap today. The param's declared `max`
   is **2 000 000** ⇒ **5 000 rows/day**: the read silently caps at ~400 000 and
   **the ceiling can never trip**. The fence fails exactly when a human widens it
   through the admin panel.

Both are repaired here: **page to exhaustion** (or move the sum server-side by a
means that needs no DDL — if you conclude DDL is the only honest option, STOP and
report per §2.1) **and** throw instead of folding.

**Two proofs required, both literal:**
* **P1 (S66-1 positive control):** the guard proven able to fail — a forced read
  error yields the throw, not a `0`.
* **P2 (truncation closed):** a fixture with **>1000 rows** whose summed total is
  proven correct. Before the fix the same fixture must be shown to under-report.
  A test that only passes after the fix, without the failing-before evidence, is
  the false-green class L4 named at S79.

---

### G5 · CONSUMER TRUTHFULNESS — empty≠zero reaches the screen

A reader that can now say "unmeasured" is only honest if its consumers say it too.
Known consumers of the changed contracts:

`api/admin/usage-analytics.ts` · `src/lib/adminService.ts` ·
`src/components/admin/QuotaAnalyticsTab.tsx` · `src/components/admin/QuotaPanel.tsx` ·
`src/dev/AdminPreview.tsx` · `api/admin/turn-trace-digest-cleanup.ts` ·
`api/admin/routing-cache.ts` (verify — census yours, not the Architect's)

Requirements:
* **Two empty states are two facts** (L8, S79): "no data in this window" and
  "the read failed" render as **two distinct strings**, test-pinned separately.
  A single generic "Veri yok" for both is the defect this phase exists to remove.
* The unmeasured state is **gray/neutral** — never a green zero, never a red.
* No consumer may re-fold a `null` back into `0` on the way to the screen. Grep
  for it and prove the zero.

**This is an extension beyond a literal reading of "make the readers honest" —
it is flagged, per §2.7, because the phase's own new statement is false at the
render layer if a repaired reader still displays `0`.**

---

### G6 · DOCS, SEAL, RECORD

* `api/cwf/_lib/persistence/**` maps to **Architecture Map** + **Runtime
  Topology**; `api/admin/**` maps to **Governance Model**. A reseal **is**
  expected — budget it.
* **Never hand-write a hash or a rev** (L13, S79): run `npm run reseal`, let it
  compute every hash, then bump `docVersion` **rev 182 → rev 183** by hand once.
  Two trees must never both claim the same rev.
* `.agents/CHANGELOG.md` entry + `.agents/skills/cwf-project-kb/SKILL.md` lessons.
* `npm run check:doc-drift` → `[OK]` at HEAD.

---

## §4 · SELF-VERIFY (literal evidence, no prose claims)

Report each with the command AND its output:

1. Census: method command + count + the delta against the Architect's 31.
2. Classification table, complete, every row carrying its consumer `file:line`.
3. Class B proven **byte-untouched**: `git diff` over those files = 0 lines.
   (This is the D-5 innocent-case probe. A sweep that also swept Class B has
   disproved its own rule.)
4. `evalGate.ts` diff EMPTY.
5. G4 P1 + P2 outputs, including the **failing-before** run for P2.
6. Zero `Number(...) || 0` remaining on a Class A path — with a positive control
   proving the grep can find the pattern where it still legitimately exists.
7. Consumer grep: no `null → 0` re-fold on any path to a rendered value.
8. `npx vitest run` full green; new count and the delta, fully accounted
   (`+N tests, +M files`, each named).
9. `npm run typecheck:api` · `npm run check:doc-drift` `[OK]` ·
   `npm run check:tenant-zero` `[OK]`.
10. `npm run test:rule26` green. **First attempt.** If it reds, report the red —
    do not rerun (S79 ruling).
11. Every FIX-SCOPE-TRUTH-1 extension listed by name.

**STOP FOR REVIEW.** Push the branch, report the remote hash, and **do not
merge.** Merge happens only on an Architect RULE-25 review plus a verbatim
Architect-authored merge message.

---

## §5 · POST-DEPLOY PROOF READ (S63-1 — named now, not later)

After merge and a READY production deployment:

* **The sensor:** the `[SynthTraffic] daily token ceiling reached — injection
  STOPPED` line, a **server-side** `console.error` in
  `runSyntheticInjectorTick.ts` (L11 check: this lives on the serverless side,
  not in a browser — the Architect can read it via Vercel).
* **The claim it proves:** the paged, guarded sum still trips the fence at the
  right point — i.e. the repair did not break the thing it was protecting.
* **L10 discipline:** the reading MUST name the `deploymentId` that emitted it
  and that deployment's SHA must contain the merge. A line from a pre-fix
  deployment proves nothing about the fix.

The Architect performs this read. No owner work.

<!-- END · PHASE-M1F2A-HONEST-READ-1-v1 -->
