# GO — HEALTH-TRUTH-1 MERGE · v1

**Branch:** `phase/health-truth-1` · **HEAD:** `225702409e8d14d47bd99d59d71ff29e0effc412`
**Anchor:** `5858ce8c2a32940313bdf3c20b3dd9374ca8ffb4` (= `merge-base`, verified)
**PR:** #159 · **Closes on proof:** `BUG-026`, then `BUG-025`

**RULE-25 review on a fresh clone:** HEAD, merge-base, 17-file diff with **zero
migrations**, `backend-health.ts` diff of **0 lines** (G4 held), 17 + 10 new
`it()` blocks in the two new suites, `docVersion 194 → 195`, **zero references to
`backend-health` anywhere in `src/`** (the Architect's hypothesis is dead), and
the `enabled` divergence confirmed at line level (`backend-health.ts:77` uses
`enabled !== false`; `mcp-settings.ts:34` demands `typeof s.enabled === 'boolean'`).

---

## STEP 1 — BLOCKING. Re-read CI.

```bash
gh run list --repo maymun207/cwf_yaprak --commit 225702409e8d14d47bd99d59d71ff29e0effc412 --json name,status,conclusion
```
**PASS: `build (20.x)` · `build (22.x)` · `coverage` · `rule26` all `completed` +
`success`.** `eval-canary` = `skipped` on the PR plane, **not a pass**.

---

## STEP 2 — MERGE `--no-ff`, message VERBATIM

```bash
git checkout master && git pull --ff-only
git merge --no-ff 225702409e8d14d47bd99d59d71ff29e0effc412 -F -
```

```
merge: HEALTH-TRUTH-1 — an unknown is not a verdict

Editing one backend's URL marked two others down. The */30 cron then probed the
same four backends over the same connections and reported checked:4 up:4 down:0,
so those rows were false — and a false `down` withholds a working backend for a
whole freshness window, which means the platform manufactured the very outage
BUG-002 was built to report honestly.

THE INSTRUMENT SHIPPED BEFORE THE FIX, AND THAT ORDER WAS THE POINT. Diagnosing
a false verdict without its reason cost this session an hour: error_head was
written to the database by every path and rendered by none. The Health tab now
shows the classified reason beside the status, and the settings branch logs the
same classified head the cron branch already logged, so the two paths read
identically. Three states stay three: `up` shows no reason rather than an empty
one, and `hiç kontrol edilmedi` stays distinct from both.

THE ARCHITECT'S HYPOTHESIS WAS WRONG AND LABELLING IT WAS WHAT MADE THAT CHEAP.
The brief guessed that GET /api/admin/backend-health both probes and writes, and
that viewing the Health tab therefore wrote rows. It has ZERO callers in src/,
sits behind the MACHINE-ARM CRON_SECRET bearer, and is structurally unreachable
from a browser session; the tab calls health-analytics, which only reads. The
14:16 timing was coincidence. Rule S81-4 was minted one phase earlier for exactly
this, and its labelling convention paid for itself immediately.

WHAT IS PROVEN AND WHAT IS NOT, KEPT APART. Proven: mcp-settings posts the whole
server array to change one row, so every enabled entry is probed and recorded —
the fan-out manufactures incidental verdicts. NOT proven: why those particular
probes failed. The freeze story was tested against the data and rejected — it
predicts the slowest probe dies first, but machine-knowledge-base (13.9 s,
slowest) survived while honestbench (740 ms, fastest) was marked down. A local
harness with real MCP servers over the real transport was built and ABANDONED on
discovering it cannot reproduce the failure: the decisive variable is the
serverless post-response lifecycle — there is no waitUntil anywhere in this repo,
so the handler returns while four probes are still in flight, and localhost keeps
orphaned promises alive where Vercel may not. Reporting an unreproduced mechanism
would have been the easy lie.

SO THE FIX IS AN INVARIANT, NOT A MECHANISM PATCH. A probe that did not complete
records NEITHER `up` NOR `down`. An unknown is not a verdict — `empty≠zero` at
the health layer, the same law that stopped writeOffered reporting 0 for tools it
could not classify. ProbeNotAttemptedError carries that distinction, and because
it is an Error subclass the cron's own catch behaves identically.

FOUR CONTROLS, EACH REDDING ONLY ITS OWN CAUSE: a genuinely unreachable backend
still writes down WITH its reason; a probe that never opened a socket writes
nothing and the previous verdict stands, the ledger being append-only; an
unrecognised error still records down, so the classifier narrows and never
swallows; and the changed server IS still probed and DOES still record, so the
fix does not buy silence by doing less.

NAMED, NOT FIXED: the cron retains the same skeleton-row exposure. Holding the
invariant there means editing the only health writer this session has proven
trustworthy, which G4 forbade. The gap is recorded rather than closed quietly.

FOUND EN ROUTE: the cron treats a server with no `enabled` field as enabled
(`!== false`) while the settings path demands an explicit boolean. Two paths, two
readings of the same absent field.

AND THE DOC LAYER WAS CORRECTED WITHOUT REWRITING HISTORY. The Architecture Map
names recordSyncHealth's "three guards" in prose and there are now four. A rev 22
entry was added rather than editing the historical rev-20 text, which would have
falsified what that phase actually did. Four tabs drifted, one redrawn;
rev 194 -> 195. check:doc-drift also blamed six files this phase never touched —
that is likelyCulprits, a heuristic presented beside a measurement, and it was
disproved by a clean-anchor control run rather than argued with.

Tests 457/5173 -> 460/5210. Zero migrations, 67 before and after. 8 mutations, 8
killed, and the two G1 nets were proven unable to substitute for each other — the
tab suite mocks adminService, so an endpoint-side mutation leaves it green while
the panel shows a bare red word.

NEITHER ENTRY CLOSES HERE. BUG-CARRY-1 rule 4.
```

Then `git push origin master`, and prune `phase/health-truth-1` local + remote.

---

## STEP 3 — Convergence

`list_deployments` → `state=READY`, `target=production`, `githubCommitSha` = the
new merge SHA. Name the `dpl_…` before any read.

---

## STEP 4 — POST-DEPLOY PROOFS. Two reads, one short induced `down`.

**Use honestbench. Not ARMES.** Same four-step shape as `OUTAGE-WINDOW-1`
window A, and **record honestbench's URL outside the panel first** — the field
pre-fills from the stored value and there is no history.

| # | Action | Proof |
|---|---|---|
| **1** | Health tab, before anything | baseline: all `ayakta`, no reason shown |
| **2** | Break honestbench's URL, press **Save/Sync**, open the Health tab | **BUG-026:** honestbench shows `kapalı` **with its classified reason**. **BUG-025:** the other three backends' `checked_at` values are **unchanged** — no incidental verdicts. Screenshot both. |
| **3** | Restore the URL, press Save/Sync | honestbench returns to `ayakta`; reason field disappears rather than showing empty |
| **4** | Wait for the next `*/30` tick | `[BackendHealth] tick { checked: 4, up: 4, down: 0 }` — the cron control still reads clean |

**Step 2 is the whole proof and it carries both entries.** Write down the three
untouched backends' `checked_at` values BEFORE pressing Save, or the comparison
cannot be made afterwards.

**A near miss is not a pass** (S81-3 rule 2). If honestbench happens to be down
already, or a cron tick lands mid-step, restore and repeat from step 1.

---

## STEP 5 — Carried forward, so nothing is swept

Three items from this phase go into `REGISTER-BUG-BUCKET-v20` and are **not**
fixed here:

1. **The cron's skeleton-row exposure** — named by AG, forbidden by G4.
2. **The `enabled` divergence** between the two paths.
3. **`likelyCulprits` presented beside a measurement** — a heuristic that blamed
   six innocent files. Same class as BUG-015.

Plus two harness footguns worth carrying: `*/30` inside a `/** … */` block
terminates the comment (tsc reports an unterminated regex, pointing nowhere near
the cause), and **`git checkout -- <file>` silently no-ops on an untracked file**,
so a mutation restore appeared to succeed, did not, and the next mutation ran
dirty. **That is the fifth harness false-green caught this week** and it belongs
in BUG-015's evidence.

---

## STEP 6 — OUT OF SCOPE

`TYPEGATE-TRUTH-1`/BUG-022 is next and its prompt is already written at this
anchor · `GATEWAY-BURST-GUARD-1` · `PROSE-RENDER-PARITY-1` (BUG-023 + BUG-027) ·
BUG-011's `AUTO-SYNC-ON-SAVE-1`, which stays a separate job: this phase made the
health record TRUE, not the save hook FIRE.

<!-- END · GO-HEALTH-TRUTH-1-MERGE-v1 -->
