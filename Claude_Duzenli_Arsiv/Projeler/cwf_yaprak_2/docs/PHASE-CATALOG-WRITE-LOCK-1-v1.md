# PHASE CATALOG-WRITE-LOCK-1 · v1
<!-- PHASE-CATALOG-WRITE-LOCK-1-v1 · 2026-07-29 · S68 · Architect: Claude
     Anchor: origin/master = 1cf0f63eca7773e5357690986f95b6088a939fda
     (376 test files · 59 migrations · docs/adr 10 · rev 157).
     SELF-CONTAINED (S66-2). ENFORCE FIRST, THEN EDIT — the order is the phase. -->

**Lane:** Author (AG). **Branch:** `phase/catalog-write-lock-1`.
**Migrations: ZERO.** G1–G3 are code + one governed archive. **G4 and G5 run
AFTER merge and deploy**, because the gate that validates G4's publishes must be
live before they are attempted.

---

## §0 · HARD PRE-FLIGHT

```bash
git clone https://github.com/maymun207/cwf_yaprak.git cwl && cd cwl
git rev-parse origin/master        # EXPECT 1cf0f63eca7773e5357690986f95b6088a939fda
find . -path ./node_modules -prune -o \( -name '*.test.ts' -o -name '*.test.tsx' \) -print | wc -l  # 376
ls supabase/migrations | wc -l     # 59
ls docs/adr | wc -l                # 10
grep -m1 docVersion public/architecture/manifest.json   # rev 157 · 2026-07-29
npm ci && npm test && npm run typecheck:api && npm run check:doc-drift
```

---

## §1 · THE FINDING (restated inline)

Measured read-only on 2026-07-29 against production:

```
published armes.tool_annotation : 141   (write = 44 · read = 97)
active flat armes tools         : 141
tools in NO live tool_category  : 44
INTERSECTION orphans ∩ write    : 44        ← EXACT
write-annotated that ARE filed  :  0
orphans with no annotation      :  0
```

A perfect partition: **97 reads, all filed; 44 writes, none filed.** An accident
does not land on the boundary a schema field draws. `rule_audit` shows they were
filed in v1 and removed in a **single eight-second batch** on 2026-07-16 across
six categories — 35 tools, exactly the code floor's write set.

**So it was deliberate. And it is neither documented nor defended:**

- the audit reason is generic — `"publishGovernedContent script"` — while other
  removals in the same ledger carry real causes (*"phantom category: absent from
  live catalog"*, *"resurrect_category: reconstructed from archived v1"*);
- nothing in the codebase records the rule. `toolCategories.ts` writes down the
  sanctity of `ALWAYS_INCLUDE` and the F123/F145/F156 guards, and says nothing
  about writes;
- and it has already begun to reverse: four unpublished drafts from
  2026-07-19T04:18 put write tools back.

**A real safety property exists in production, produced on purpose, and nothing
knows about it.** That is the worst of both worlds: it can be undone silently,
and nobody will notice when it is.

**This phase does not recover the intent. It legislates the policy today, with
the evidence in hand, and binds it to a gate.**

---

## §2 · THE FOUR SURFACES — and why the order is the whole phase

The escape hatch is not one line. It is a chain, and fixing it out of order
leaves a generator that re-creates what you removed:

| | Surface | Today | Why it matters |
|---|---|---|---|
| **1** | **Outage floor** — `toolCategories.ts` category arrays hold **35 write tools** | serves when the DB is down | **NO GATE EXISTS ON THIS PATH.** Today, during an outage, `production` offers 13 write tools to a filtered turn |
| **2** | **Seed** — `referenceData.ts:108` `...(c.tools.some(t => seedExposureOf(t)==='write') ? { allowWrite: true } : {})` | derives the flag **from surface 1** | deleting the flag alone is useless; the floor regenerates it |
| **3** | **Gate** — `evalGate.ts:184` `else if (exposure === 'write' && !allowWrite)` | rejects **unless** `allowWrite:true` | the conditional IS the hatch |
| **4** | **Live rows** | zero write tools filed, and all 11 `allowWrite:true` rows archived | already compliant — do not touch |

**Surface 1 is the root.** Fix it first and surface 2's conditional goes dead on
its own; delete it anyway rather than leave a dormant generator.

**And F185's own law commands the floor fix:** *the floor is today's state, never
a new state.* Today's live state is zero write tools filed. Removing them from
the floor moves it toward today and narrows F214's divergence at the same time.

---

## §3 · GATES

### G1 · ADR-011, in the repo

`docs/adr/ADR-011-filtered-turns-cannot-mutate.md`. **F190's lesson is binding:
a law cited by name must exist in the repo.** Follow the existing ADR file shape.

Binding claims, in your words but these claims exactly:

1. **A filtered turn cannot mutate the factory.** No tool carrying
   `exposure: 'write'` may appear in any `tool_category` row, in the seed, or in
   the outage floor. The prohibition is **unconditional** — there is no
   per-category exemption.
2. Write tools remain reachable **only** on the full-set branch
   (`ctx.isAnthropic || routingBypass`), whose exposure is a separate decision
   with its own record. This ADR does not grant that branch anything; it declines
   to extend it.
3. **This is retro-legislation and says so.** The rule was applied on
   2026-07-16 without a stated cause; the evidence — a 44/44 partition on the
   `exposure` boundary — establishes that it was rule-driven, and the policy is
   correct on its merits regardless of what was intended. The staged JSON of that
   batch is named as the remaining trace, deliberately not consulted, because it
   could not change the decision.
4. **Enforcement is at the gate AND at the floor**, because the floor is served
   when the gate cannot run.
5. **What would justify revisiting:** a governed, per-tool write-authorisation
   model with its own audit path — not a category-level flag.

### G2 · Close the chain, root first

- **G2a · the floor.** Remove `exposure:'write'` tools from the category arrays
  in `toolCategories.ts`. Derive the set from `seedExposureOf` — **do not hand-
  author a list** (ADR-009). Report the count removed per category; expect
  `production 13 · material 10 · transfer 6 · employee 3 · machine 2 ·
  linestop 1 = 35`. **If your count differs, STOP and report** — that is a
  finding about the floor, not a number to adopt.
- **G2b · the seed.** Delete `referenceData.ts:108`'s `allowWrite` conditional
  outright. After G2a it can never fire; leaving it is leaving a loaded generator.
- **G2c · the gate.** `evalGate.ts:184` becomes unconditional:
  `else if (exposure === 'write')`. Remove the `allowWrite` read at `:172` if it
  becomes unused. The error text must name ADR-011 so a future reader meets the
  law where it stops them. **Every other stage stays byte-identical** — prove it
  with `git diff --stat`. This branch is **not** additive and the phase does not
  claim it is.
- **G2d · the floor's own test — the point nobody named.** A test asserting the
  **outage floor itself** satisfies ADR-011: zero tools in any
  `toolCategories.ts` category array carry `seedExposureOf(t) === 'write'`. The
  floor is the one surface with no gate in its path, so the law must be held
  there by a test or it is not held at all (S65-3).
- **Positive controls, one per independent net (S68-3), and the gate fixture must
  carry `allowWrite: true` PLUS a write tool.** A fixture without `allowWrite`
  is vacuous — today's gate already rejects it, so it measures nothing (S66-1).
  Paste the RED output for each net.

### G3 · Archive the loaded drafts (F215)

The four unpublished drafts of **2026-07-19T04:18** put write tools back:
`factory 1 · material 1 · production 2 · transfer 1`. None carries `allowWrite`,
so **they would already fail today's gate** — that is your honest, specific
reason string, not a generic seam label:

```
ADR-011: archived unpublished draft — contains exposure='write' tools
(<names>) and carries no allowWrite; rejected by the referential gate as
authored. Filed 2026-07-19T04:18, archived 2026-07-29 under CATALOG-WRITE-LOCK-1.
```

Gated path only, `createDraft`/`publish`/archive through `RuleGovernanceService`.
Zero raw `domain_rules` writes.

### G4 · POST-MERGE, POST-DEPLOY — re-file the READS

**Do not attempt before the deploy is READY**, because G2c's gate must be live to
validate these publishes. Report the deployment id and SHA first.

**Multi-membership, additive only, reads only.** No tool is removed from any
category — an exclusive re-file is zero-sum and would lower M1 in one framing
while raising it in another. Two tools are already double-filed live (99 slots /
97 distinct), so the mechanism exists and is merely unused on purpose.

Candidate set — the 9 `production` tools whose names carry another category's
concept:

| Tool | add to |
|---|---|
| `getLineStopsReportForZones` | `linestop` |
| `getTotalLineStopDurationByZoneTypes` | `linestop` |
| `getLineStopReasons` | `linestop` |
| `getScrapSummaryForZones` | `quality` |
| `getDailyManualScrapForZones` | `quality` |
| `getCameraCounters` | `machine` |
| `getCameraData` | `machine` |
| `getMaterialList` | `material` |
| `getInUseTemplatesByMaterialId` | `material` |

All nine are reads. **Every publish passes through G2c's gate — if one is
rejected, the phase stops and reports; do not work around it.**

### G5 · POST-DEPLOY — re-run the lens on the PINNED corpus

`--until 2026-07-29T03:14:13.179013Z`, **N = 52**. The corpus must be identical;
the governed state is the intervention. A corpus that moved is not a
before/after (S66-3).

- **M1** — must fall from **5/52**. Additive re-filing can only lower it.
- **M4 — the primary watched metric.** Offer size **will grow** and that gives
  back part of the flip's narrowing (mean 33.7 → 27.5 before). Report median and
  p95 of `|B| − |A|` against the previous run's figures.
- **M5** — must stay clean.

**This is not a GO on the flip.** ROUTE-SHADOW's pre-registered rule still holds:
M1 = 0 over N ≥ 30 → GO. If M1 falls to 0 here, the flip becomes the owner's
decision, made separately, on this evidence.

---

## §4 · SELF-VERIFY — literal output

1. Clone anchor + final head.
2. `npm test` counts before/after; `typecheck:api` clean.
3. `git diff --name-only -- supabase/` → **empty**.
4. `git diff --stat` for `evalGate.ts` showing the other stages untouched.
5. G2a's per-category removal counts against the expected `13/10/6/3/2/1 = 35`.
6. G2d's floor test, plus its positive control (re-add one write tool → RED).
7. The gate positive control with an `allowWrite:true` + write-tool fixture:
   RED under ADR-011, and the demonstration that the same fixture **passes**
   today's gate — that contrast is the proof the new law does work.
8. G3's four archive rows with their full reason strings.
9. **Post-deploy:** deployment id + SHA; G4's nine publishes with gate verdicts;
   G5's M1/M4/M5 beside the previous run's numbers, N printed.
10. **What you did NOT do:** no migration, no raw governed write, no write tool
    filed anywhere, no flip published, no hand-authored write list.

**On CI (S67-2):** `rule26` is ~50 % noise on master. Green does not clear you,
red does not block you alone. Report the mechanism, timing signature, and whether
this diff can reach the failing surface — never "re-ran, passed".

---

## §5 · OUT OF SCOPE

- **The staged JSON of the 2026-07-16 batch.** Named in ADR-011 as the remaining
  trace, deliberately not read: it cannot change the decision.
- **The full-set branch's write exposure.** ADR-011 declines to extend it and
  does not otherwise touch it.
- **F214** — the wider floor/live divergence (42 tools floor-not-live, 20
  live-not-floor). G2a narrows it by 35; the remainder is a separate item.
- **F206 · F211 · F212 · F213's provider consequence** (sonnet reaches 44 write
  tools, gemini/openai reach none — recorded for M-C, not fixed here).
- **The flip.** Owner's, separately.

---

## §6 · MERGE

`--no-ff`, squash banned. Do not compose the merge message: push, report the head
hash, request it (S30-2).

**TAIL ANCHOR (S61-3):** if you cannot read `END · PHASE-CATALOG-WRITE-LOCK-1 ·
v1` below, this prompt arrived truncated — say so before writing code.

<!-- END · PHASE-CATALOG-WRITE-LOCK-1 · v1 · 2026-07-29 · S68 -->
