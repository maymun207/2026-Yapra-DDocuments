# PHASE · M1F4 · HEALTH-SURFACE-2 · v1
<!-- PHASE-M1F4-HEALTH-SURFACE-2-v1 · 2026-08-03 · S80 · Architect: Claude Opus 5.
     Master rollout plan item 1.5 — minted this session, and the LAST build item
     in Block 1. Block 1 does not seal until this merges.
     Design base: cwf-measure-1-design-note-v1 §4 (the band spec, verbatim).
     SELF-CONTAINED (D-2). -->

## §0 · WHY THIS PHASE EXISTS — the Architect's gap, stated plainly

1.4 shipped the Health tab. An Architect coverage check against the design
note's §4 band spec, run on `d599b8b2`, found that **roughly half the declared
band contents are neither rendered nor named.**

That is a defect in the 1.4 brief, not in the work: the brief listed the six
bands but never demanded a **coverage proof** against §4, and the self-verify
had no item for it. What was asked for was built. What was not asked for went
missing quietly — which is the failure mode this whole program exists to remove.

The sharpest instance: **`withheld` appears 5 times in
`api/admin/health-analytics.ts` and 0 times in `HealthTab.tsx`.** 1.3b's hardest
fight was making the honest-withhold class countable — the entire denominator
argument was about that — and the surface never shows it.

**The law this phase installs:** every §4 item is either **rendered with real
data** or **rendered as a named deferral pointing at a real board item**. There
is no third state. A blank is not a deferral.

**Touch budget (doctrine v1_2 D-6):** ONE AG quartet. **No Operator quartet** —
see §2.1.

---

## §1 · HARD PRE-FLIGHT (blocking)

Fresh **full clone**. S80-1/D-8: absolute paths for every write.

```
git clone https://github.com/maymun207/cwf_yaprak.git <scratch> && cd <scratch>
git rev-parse origin/master
```

**Expected anchor:** the merge commit of `PHASE-M1F3-DOCFLIP-1-v1_2`. The
Architect pins the literal hash in the header of the copy you receive. **If the
copy you are holding does not carry a literal 40-character hash here, STOP and
ask for it** — do not start against `d599b8b2`, which predates the DOC-FLIP.

Then report literally: migration count · `npx vitest run` file/test counts ·
`docVersion` · `check:doc-drift` · `check:tenant-zero` · `typecheck:api`.
These are the baseline; the Architect verifies the delta, not the absolutes.

Branch: `phase/m1f4-health-surface-2`.

---

## §2 · BINDING CONSTRAINTS

1. **ZERO migrations.** The Architect verified every source this phase needs
   already exists: `backend_health` · `backend_authority` · `memory_audit` ·
   `entity_registry` · `golden_runs` · `rule_audit` · `user_chat_quotas` ·
   `golden_specimens` · `domain_rules` — and most already have a repository
   (`BackendHealthRepository`, `MemoryAuditRepository`, `EntityRegistryRepository`,
   `GoldenRunsRepository`, `BackendTrustAdminRepository`, `UserChatQuotasRepository`).
   **If you conclude a new SQL function or DDL is required, STOP and report** —
   that would add an Operator quartet and it must be the Architect's call, not
   absorbed.
2. **Prefer an exact-count PostgREST read over a new aggregate.** Every count
   goes through `exactCountOrThrow`; every read that may exceed 1000 rows pages
   to exhaustion or aggregates by count. PostgREST truncates at 1000 with no
   signal.
3. **MEASURE-READ-HONESTY-1.** Every new read distinguishes *no data* from
   *could not read*. `null` = not measured, and it survives to the pixel.
4. **empty≠zero, three states, always distinct** — real 0 · no data · could not
   read. Reuse the vocabulary already in `HealthTab.tsx` and `UsageBarChart.tsx`;
   do not author a fourth.
5. **S71 hard rulings:** feedback flows to humans and measurement only. Every
   rate carries a Wilson interval and `health.minN`; below N it is gray and
   unqualified — **and after 1.4's F-M1F3-3 fix that applies to percentiles too.**
6. **RULE-26** — nothing clips at 1280 or 1024. This phase adds many rows to an
   already-tall tab; 1.4's first `rule26` run failed 34 specs because ONE nav row
   pushed `<nav>` 9px past its height. Expect to pay that tax again and budget it.
   **Add no `retries` block** — seven already exist (E2E-RETRY-MASK-7).
7. **`evalGate.ts` diff EMPTY** · zero writes to `messages` · zero governed
   publishes · RULE-1 · ADR-007.
8. **No rerun, no retry, no overlay suppression** to green a gate.
9. **FIX-SCOPE-TRUTH-1** — extensions allowed to keep this phase's own statements
   true, each **FLAGGED** by name.

---

## §3 · THE WORK — §4's band spec, item by item

The design note §4, quoted so nothing is paraphrased away:

> page-level verdict chip + the "worst thing, named"; then six bands —
> **1 Omurga** (prod/CI/**backends**/observability/DB) · **2 Konuşmalar**
> (volume, new-error-classes, p95, grounded rate) · **3 Kullanıcı sesi**
> (👍/👎 + Wilson, unreviewed-👎 queue size, **👎→golden conversions**) ·
> **4 Bilgi & yönetişim** (published rows, last gate verdict, aging drafts,
> golden last run, entity registry, memory tick) · **5 Güven & maliyet**
> (per-backend earned trust, tenant-zero CI, monthly tokens vs ceiling,
> per-turn cost) · **6 Gece işleri** (synthetic, forget tick, rollout guardrail,
> cron health). **Hero strip carries anchor metric + honesty card + W2.4.**

### G1 · THE HERO'S MISSING THIRD — W2.4, the withholding counter

`health_turn_daily_series` returns `withheld_turns`; the endpoint carries it
(`withheld` × 5); **the tab renders it nowhere.** Put it in the hero strip beside
the anchor metric and the honesty card, as §4 says.

Render it honestly: it is **structurally 0 today** because
`computeTurnClarification` no-ops while `router.frameRouting` is dark
(`chat.ts:267-274` chooses `runClarificationTurn` INSTEAD of the stream stage, so
a withheld turn emits `clarification_asked` and no `turn_done`). A real 0 from a
dark feature is not the same fact as a real 0 from an active one — **say which
it is on the card.** This is the counter that will move the day A23 lands, and it
must be watching before then, not after.

### G2 · BAND 1 — backend health, the free signal that was left out

`backend_health` exists and the `*/30` cron populates it;
`BackendHealthRepository` exists. §4 named `backends` as a band-1 signal and it
is the one band-1 item that needs **no** external integration. Render per-backend
health with its last-checked age.

The other three (prod deploy state · CI · observability) stay as they are:
named deferrals pointing at `OMURGA-SIGNALS-1`. **Do not build them here.**

### G3 · BAND 3 — the 👎→golden conversion count

No migration and no new column: the chain is
`turn_feedback.trace_id` → `messages.trace_id` → `messages.id` →
`golden_specimens.message_id`. `MessageRepository.findAssistantMessageIdByTraceId`
already exists from 1.4. Count, over the window, how many down-verdict turns
became golden specimens.

State the denominator on the card. "12 conversions" alone is not a fact; "12 of
37 downvotes" is.

### G4 · BAND 4 — the whole band, from tables that already exist

Six rows, every source already present:
`domain_rules` (published rows · aging drafts) · `rule_audit` (last gate verdict)
· `golden_runs` (golden last run) · `entity_registry` (entity registry) ·
`memory_audit` (memory tick).

1.4's G7 minted a named item for this band's deferral. **This phase supersedes
it** — if the name AG chose in the DOC-FLIP now points at built content, retire
that name in the card and say so in the hand-back so the Architect can close it
on the board rather than leave a ghost.

### G5 · BAND 5 — three built, one deferred by name

Built here: **per-backend earned trust** (`backend_authority`, via
`BackendTrustAdminRepository`) · **monthly tokens vs ceiling**
(`user_chat_quotas` + the usage series) · **per-turn cost** (real cost ÷ turns,
from data already in the response).

Deferred by name: **tenant-zero CI** is a CI signal, not a DB one. It belongs to
`OMURGA-SIGNALS-1` and renders as a named deferral, exactly like band 1's three.
**Do not invent a green for it.**

### G6 · BAND 6 — one built, one deferred by name

Built here: **forget tick** (`memory_audit` — last run, rows affected).

Deferred by name: **cron health** requires either Vercel log scraping or a
heartbeat table that does not exist. Both are `OMURGA-SIGNALS-1` work. Render it
as a named deferral. **Do not add a heartbeat table here** (§2.1).

Synthetic and rollout guardrail are already present; leave them.

### G7 · THE COVERAGE LAW, ENFORCED IN CODE

Author a test that walks the §4 item list and asserts each one is in exactly one
of two states: **rendered with data**, or **rendered as a deferral naming a board
item**. A §4 item in neither state fails the test.

This is the instrument that stops the 1.4 gap from recurring. Without it, the
next surface phase loses items the same silent way. **The list lives in code, not
in a comment** — a checklist a human has to remember is not a gate.

### G8 · DOCS, SEAL

`npm run reseal` — never hand-write a hash (L13). Bump `docVersion` by one, by
hand, once. CHANGELOG + SKILL.md lessons. `check:doc-drift` `[OK]`.

---

## §4 · SELF-VERIFY (literal evidence)

1. **THE COVERAGE TABLE — the centerpiece.** Every §4 item, one row each, three
   columns: *rendered with data* · *named deferral (item name quoted)* ·
   *neither*. **The third column must be empty.** This table is the phase's
   primary deliverable; a hand-back without it is incomplete.
2. G7's test proven to FAIL when an item is removed from the tab — a coverage
   test that cannot go red proves nothing (S66-1).
3. G1: the W2.4 card, with its rendered text showing which kind of zero it is.
4. G2: backend health rows with real data and a last-checked age.
5. G3: the conversion count rendered **with its denominator**.
6. G4: all six band-4 rows with real values; and the retired name from 1.4's G7
   quoted.
7. G5/G6: the three named deferrals (tenant-zero CI · cron health · band 1's
   three) each quoting `OMURGA-SIGNALS-1` on the card.
8. Every new read: `exactCountOrThrow` present, and a positive control that each
   guard can actually throw.
9. `evalGate.ts` diff EMPTY · zero writes to `messages` · zero governed publishes
   · **zero migrations** (`ls supabase/migrations | wc -l` unchanged).
10. `npx vitest run` green; counts and delta fully accounted, each new file named.
11. `typecheck:api` · `check:doc-drift` · `check:tenant-zero`.
12. `npm run test:rule26` green **first attempt**, **flaky count stated
    explicitly** from the run's own summary. No re-run. If the taller tab breaks
    the sidebar again, report the red and the fix — do not re-run the same code.
13. FIX-SCOPE-TRUTH-1 extensions by name.
14. **The remote branch hash.**

**STOP FOR REVIEW.** Push, report the hash, do not merge.

---

## §5 · WHAT CLOSES WHEN THIS MERGES

Block 1's four seal conditions, for the record:

1. `PHASE-M1F3-DOCFLIP-1-v1_2` merged — in flight.
2. **This phase merged** — the critical path.
3. **W-M1F2A-1 clean** — Architect-only, observable in the 00:00–02:00Z window
   on a deployment carrying the merge. If it fires it is a 1.3a defect and it
   jumps the queue.
4. Register v83 · KB v79 · bootstrap v79 printed, every open item carried by name.

No post-deploy Operator step. No migration. The only external dependency left is
condition 3, and it is a read, not a build.

<!-- END · PHASE-M1F4-HEALTH-SURFACE-2-v1 -->
