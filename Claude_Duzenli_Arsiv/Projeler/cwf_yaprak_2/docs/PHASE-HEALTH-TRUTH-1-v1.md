# PHASE-HEALTH-TRUTH-1 · v1

**Closes:** `BUG-026` then `BUG-025`, in that order — 026 is 025's instrument.
**Lane:** Author = AG. **Anchor:** `5858ce8c2a32940313bdf3c20b3dd9374ca8ffb4`.
**Migrations: expected ZERO** — `backend_health` already carries `error_head`.
Confirm before assuming; if you conclude otherwise, STOP and report (ADR-005).

---

## §0 · BOOTSTRAP

```bash
rm -rf /tmp/health && git clone https://github.com/maymun207/cwf_yaprak.git /tmp/health
cd /tmp/health && git fetch --all
git rev-parse origin/master   # MUST be 5858ce8c2a32940313bdf3c20b3dd9374ca8ffb4
ls supabase/migrations | wc -l   # 67
```
**S80-1:** absolute paths. **Branch `phase/health-truth-1`; push AND open a PR.**
**Baseline: 457 files / 5173 tests.** Run `check:tenant-zero` before the first
push — this phase touches an operator-facing surface.

---

## §0.1 · S81-4 NOTICE — read this before trusting a single line below

Rule 13 was minted **because the last brief carried three false premises taken
from frozen bug entries.** Everything in §1 below is labelled:

- **[READ @5858ce8c]** — the Architect ran a command at the anchor. Re-derive it.
- **[HYPOTHESIS]** — not verified. **G1 exists to test it.** If it dies, say so
  and the brief is rewritten by you.

---

## §1 · THE TWO DEFECTS

### BUG-026 — the reason is written and shown to nobody

**[READ @5858ce8c]** `backend-health.ts:102-105` computes
`classifiedErrorHead(err)`, logs `[BackendHealth] backend=X down: <errorHead>`,
and stores it via `healthRepo.recordCheck({ backendId, status:'down', errorHead })`.

**[READ @5858ce8c]** `HealthTab.tsx:568-586` renders **name · status
(`ayakta`/`kapalı`/`hiç kontrol edilmedi`) · relative time** — and nothing else.
`errorHead` appears nowhere in that file.

**[READ @5858ce8c]** Only the CRON branch logs the head. The settings/sync branch
(`mcp-settings.ts:127` → `recordSyncHealth`) writes to the database and prints
nothing.

**Consequence, and it is why this comes first:** on 2026-08-05 two healthy
backends were marked down and **the reason could not be reached** from the panel,
the runtime logs, or the Architect's tools. The field existed. The first time it
was needed, it was unreachable.

### BUG-025 — a health verdict for backends nobody touched

**[READ @5858ce8c]** `mcp-settings.ts:127`:
`syncBackendCatalog(...).then((result) => recordSyncHealth({ scope:'global', server, result }))`
runs for **every** server in the saved payload. One URL edit therefore probes all
of them.

**[READ — live, `OUTAGE-WINDOW-1`]** The owner edited ARMES only. `down` rows
were written for `superset` and `honestbench` at ~14:09, ~14:11 and ~14:16.

**[READ — live, the control]** At 15:01 the `*/30` cron probed the same four
backends over the same connections:
`[BackendHealth] tick { checked: 4, up: 4, down: 0 }`, with
`armes ms=7923 · superset ms=3102 · machine-knowledge-base ms=13876 ·
honestbench ms=740`. **Four up, zero down — so those rows were false.**

**[HYPOTHESIS]** `GET /api/admin/backend-health` both probes and WRITES. If the
Health tab's refresh control calls it, then *viewing* the health page writes
health rows — the ~14:16 timestamps landed while the owner was on that tab.

**The obvious timeout story does NOT fit the data and must not be assumed:**
honestbench is the **fastest** backend (740 ms) and was marked down;
machine-knowledge-base is the **slowest** (13.9 s) and survived the first batch.

---

## §2 · GATES

### G1 — BUG-026 first: surface the reason, and log it on both paths

1. The Health tab shows a `down` backend's **classified reason** beside its
   status. `error_head` is already capped and classified — **do not widen it,
   do not add raw stack traces**, and do not introduce a new field.
2. The settings/sync branch logs the **same classified head** the cron branch
   already logs, so both paths are readable identically (ADR-013 decision
   parity).

**Both directions (D-5):** an `up` backend shows **no** reason rather than an
empty one; `hiç kontrol edilmedi` stays visibly distinct from both — **three
states, never two.** A test asserting the reason renders must RED when the field
is dropped.

### G2 — then BUG-025: establish WHY probes fail, by running them

**Do not skip to a fix.** With G1 shipped locally you can now see the heads.
Reproduce a multi-backend save and report **the classified reason for each false
`down`**. Test the §1 hypothesis about `GET /api/admin/backend-health` explicitly
and say whether it survived.

**Report the finding even if it kills the brief's framing.**

### G3 — the invariant, whatever the mechanism turns out to be

**A probe that did not complete records NEITHER `up` NOR `down`.**

An unknown is not a verdict. This is `empty≠zero` at the health layer, and it is
the same law the whole session has been enforcing: `writeOffered` could not
report 0 for tools it could not classify; a health probe may not report `down`
for a backend it could not reach a conclusion about.

**Both directions (D-5):** a genuinely unreachable backend still writes `down`
**with its reason**; a probe cut short writes **nothing** and the backend keeps
its previous verdict, whose staleness is already visible via `checked_at`.

**Also required:** editing one backend's settings must not write verdicts for
backends whose probes were incidental. **Whether that means probing fewer or
recording fewer is yours to determine from G2 — do not guess it now.**

### G4 — the cron branch is the control and stays byte-unchanged

The `*/30` branch produced the read that falsified the bad rows. It is the only
health writer currently trusted. **Do not refactor it into a shared path in this
phase.** If the fix requires a shared helper, extract it so the cron's behaviour
is provably identical, and prove it.

### G5 — S82-2 on this phase's own apparatus

Four harness false-greens have been caught in this repo this week. State your
red/green control. **A test that reproduces a false `down` must be shown to fail
before the fix and pass after** — otherwise it is measuring nothing.

---

## §3 · DOCS & DRIFT

**[HYPOTHESIS]** `src/components/**` maps to no narrative tab (proven by
`AXIS-TRUTH-1`), but `api/admin/**` and the health seam may. Read the tabs and
name what actually drifts.

---

## §4 · REPORT

1. HEAD, PR URL. 2. Four required CI gates with conclusions. 3. Test counts as CI
prints them. 4. **G2's finding: the classified reason for each false `down`**,
and whether the `backend-health` GET hypothesis survived. 5. G3's both-direction
pair as outputs. 6. Whether a migration proved necessary (§0). 7. Anything in
§1–§3 that is wrong — **the Architect made five premise errors yesterday and
labelled every claim here for exactly that reason.**

---

## §5 · POST-DEPLOY PROOF (S63-1) — two reads, both cheap, no outage window

- **BUG-026:** a `down` backend's reason is readable in the Health tab by a
  human. Screenshot plus the deployment SHA. *(If no backend is down at the time,
  this needs one induced `down` — honestbench, URL edit, one Sync, restore. It is
  the same four-step shape as `OUTAGE-WINDOW-1` window A and costs minutes.)*
- **BUG-025:** editing one backend's settings leaves the other backends'
  verdicts **unchanged** — read live, `checked_at` values named before and after.
  **Positive control:** the cron's next tick still reports `up` for the healthy
  ones.

**Neither closes at merge** (BUG-CARRY-1 rule 4).

---

## §6 · OUT OF SCOPE

`TYPEGATE-TRUTH-1`/BUG-022 (next phase) · `GATEWAY-BURST-GUARD-1`/BUG-020 ·
`PROSE-RENDER-PARITY-1`/BUG-023+027 · BUG-021 · BUG-012 · **and BUG-011's
`AUTO-SYNC-ON-SAVE-1`**, which lives at queue position 8 — this phase makes the
health record TRUE; making the save hook FIRE is a different job and merging them
would hide which one was proven.

<!-- END · PHASE-HEALTH-TRUTH-1-v1 · closes BUG-026 then BUG-025 on proof -->
