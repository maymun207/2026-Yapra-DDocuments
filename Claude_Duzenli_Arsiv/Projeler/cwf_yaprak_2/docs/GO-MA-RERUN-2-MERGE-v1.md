# GO · `MA-RERUN-2` — merge instruction · v1

<!-- GO-MA-RERUN-2-MERGE-v1 · 2026-08-04 · S82 · Architect: Claude (Opus 5).
     ONE self-contained relay (D-2). Issued after a RULE-25 fresh-clone review.
     THE GO IS CONDITIONAL: STEP 1 can STOP the merge, and it is the step this
     review exists for. Touch budget stays at the standard quartet — STEP 1 is
     a read of a file AG already holds, not a new run. -->

---

## §0 · REVIEW RESULT — verified independently, nothing taken from the report

Fresh full clone, `git fetch --all`. **Every value below was copied from the
output of a command run during this review, not reconstructed.**

| Claim | Verified |
|---|---|
| `origin/master` | `4469a37057ac4819d64e078000c2232e58bb9187` ✓ unmoved |
| branch head | `cda8a1a52a4f044cb223c0ee01ff83ed90153bae` ✓ · anchor is an ancestor |
| diff | **5 files, +1232 / −0** ✓ additive only |
| `src/` · `api/cwf/_lib/` | **0** · **0** lines ✓ |
| test files · migrations · docVersion · ADRs | 448 · 67 · `rev 190 · 2026-08-04` · 13 ✓ |
| BUG-005 | `factory` / `messageTr` / `scope` appear in the analyser **only inside the guard that forbids them** (`FORBIDDEN_OUTPUT_KEYS`) ✓ |
| purity | no wall clock (the `Date.UTC` at `:118` builds the cutoff candidates deterministically), no network, no DB ✓ |
| **`check:tenant-zero`** | **AG's diagnosis confirmed by running the gate myself on a fresh clone: `[OK] ZERO gated-vocabulary hits — 1044 files scanned`.** The hit file is `.gitignore:42`, `git ls-files` returns 0, and it is absent from a fresh clone. A working-tree artefact, not a branch defect ✓ |

**Arithmetic reconciled independently, and it holds throughout:**
`938+466+273+857 = 2534` · `2271+521+2432+2003 = 7227` · G5's block column sums
to **2792**, exactly G3(b)'s block count · G5's `n` column sums to **7227** · and
the entity-unresolved counts implied by the two denominators agree on a single
number in each population (610 at n=2534; 1735 at n=7227). The report does not
contradict itself anywhere I could test it.

---

## §1 · STEP 1 — BLOCKING: THE MUST-BLOCK GUARDIAN

**The finding.** The phase publishes a **29.20 pp fall** in the block rate and
does not report the one number that decides whether a fall is a win or a leak.
`grep -n guardian scripts/analyseClarificationRun.ts` returns **nothing**; the
committed report names the guardian once, only inside the seam-invocation
arithmetic.

The lens was built with this counterweight on purpose, and its own caveat at
`clarificationLens.ts:1353` says why:

> `MUST-BLOCK GUARDIAN FAILED (blocked/n): [...] did not block.` *Every rate in
> this report improves by FALLING, so a lower block rate alongside a failed
> guardian is a REGRESSION, not a win. Do not quote these numbers as an
> improvement until the guardian is back at 100%.*

**This omission is the Architect's first.** G0 named `readIntegrity` as the
honesty precondition and never named the guardian — in a phase whose entire
output is a rate that improves by going down. AG implemented the brief
faithfully. Recorded in the S82 premise ledger.

**No re-run.** `guardian` is already in the evidence JSON you hold.

### What to add

1. **The analyser reads and prints it** — so the counterweight becomes part of
   the instrument rather than a note someone remembers. From
   `GuardianSummary` (`clarificationLens.ts:746-752`): `n`, `blocked`, `rate`,
   and on failure the `id` + `expectation` of every probe with `blocked: false`.
2. **Each probe's own read record.** `GuardianProbeResult` carries `entityRead`
   (`:732-741`), and the reason is written at the site: *a probe that "still
   blocked" while its registry read was down proved less than it looks.* Report
   that all four probes have a non-null `entityRead` with empty `readFailures`.
3. **The report states it in §G0**, beside `readIntegrity`, **before any rate** —
   same position, same discipline.
4. **One test**, both directions: a fixture with `rate: 1` passes clean; a
   fixture with a leaked probe surfaces the failure with the probe named.

### The pass condition, and the STOP branch

- `guardian.rate === 1` **and** all four probes clean ⇒ proceed.
- **`guardian.rate < 1` ⇒ STOP. Do not merge.** Report the rate, the leaked
  probe ids, and stop. In that case the 29.20 pp fall is not a result, and the
  merge message below is void.

### Positive control on the edit

The added lines must not move a single existing number. Keep the current
analyser output, run the updated analyser on the same JSON, and diff:

```
diff old-output.txt new-output.txt        # ADDITIONS ONLY, zero modified lines
```

Report that diff's shape and the new sha256 + byte count beside the old ones
(`848c224e33cd85844a9ae1eb24fe652ac021e9fc5ca56c972f8ff0a6ab9be935`, 5893 bytes),
and re-confirm byte-identical determinism across two runs of the new version.

### One report addition, while you are in the file

§G1's 11-hour plateau (13:00Z–24:00Z, count flat at 2534) has a **named
mechanism**, and it converts `d = 0.000 %` from a suspicious coincidence into a
corroborated control. Live read, taken by the Architect this session from Vercel
runtime logs on `dpl_FHuACmdStcB4EtZJ4Gz4oS82oz3S`, twelve consecutive ticks
sampled `12:48Z–12:59Z` on 2026-08-04:

```
[SynthTraffic] daily token ceiling reached — injection STOPPED
{ tokensToday: 200000, dailyTokenCeiling: 200000, injectedThisTick: 0 }
{ active: true, mode: 'frame-only', injected: 0, framesRecorded: 0,
  stoppedReason: 'ceiling-reached' }
```

The synthetic injector runs every minute and stops for the rest of the UTC day
once the governed daily token ceiling is reached. A plateau in `createdAt` is
therefore the expected shape, not an anomaly. **State it as the plateau's likely
mechanism and mark it exactly that — likely.** The 2026-07-25 ceiling event was
not itself read (Vercel's retention does not reach it), so this is an inference
from today's observed behaviour of the same fence, and the report must say so in
the same sentence.

---

## §2 · THE OBJECTION I RATIFY, AND THE SECOND ERROR IT EXPOSED

G3 instructed you to infer the baseline's block definition from proximity to
2144. **You refused before implementing it, and you were right.** In a replay a
count mismatch is confounded between *"different definition"* and *"different
gate behaviour"* — and the second is the thing being measured, so attributing the
gap to the first assumes the answer. `UNDETERMINED`, both definitions reported,
neither asserted, is the correct output. Ratified; the brief was wrong.

**Also ratified:** the analyser living in `scripts/` rather than
`api/cwf/_lib/`, with tests in `api/cwf/__tests__/` — a pure offline tool in a
doc-drift-mapped area would force a reseal for a file no diagram depicts. Correct
reading of the constraint.

**Carried, not done here:** stamping `layerKey` beside `layerStatus.kind` so
G4's *"on the equipment layer"* becomes verifiable rather than circumstantial.
Named as an open question in your §9; it enters the register by that name.

---

## §3 · STEP 2 · CI · STEP 3 · ANCHOR

**STEP 2.** Re-read the five conclusions on the **new** head after STEP 1's
commit — not the ones from the hand-back, which describe a SHA that will no
longer be the tip. `in_progress` or `null` is **not** a pass. build (20.x) ·
build (22.x) · coverage · rule26 · eval-canary (`skipped`, spend fence,
structural on PR).

**STEP 3.** `git fetch --all && git rev-parse origin/master` must still be
`4469a37057ac4819d64e078000c2232e58bb9187`. **If it moved: STOP and report.**

---

## §4 · MERGE — verbatim, `--no-ff`

**This message is valid ONLY on STEP 1's pass path.** If the guardian did not
hold at 1, do not merge and do not use it.

```
merge: MA-RERUN-2 — the stale row, measured, with its counterweight

The one internal number in the SOTA contract has been stale since
2026-07-25. MA-RERUN-1 could not refresh it: the corpus had outgrown the
lens's ceiling and the run came back VOID. LENS-CEILING-1 removed the
ceiling; this phase is the analysis of the 7227-frame run it made
possible. No new run, no new lens code, zero LLM cost.

THE RECONSTRUCTION IS TEMPORAL, NOT SIZE-BASED. Matching n matches a
count, not a population — disproven with figures at S81 and not repeated
here. The baseline population is isolated by createdAt, and the count is
used only as a control on whether the isolation worked. The cutoff was
pre-registered: an hourly sweep across 2026-07-25, minimise the distance
to 2534, ties to the earlier T, chosen and reported BEFORE any rate was
computed. T = 13:00Z, count 2534, d = 0.000%, on an 11-hour plateau that
makes the tie-break moot. The plateau's likely mechanism is the governed
daily token ceiling that stops the synthetic injector for the rest of the
UTC day — observed on today's ticks, inferred for that date.

THE RESULT, EACH RATE WITH ITS n. Like-for-like at n=2534: block rate
84.61% -> 55.41% (HIGH+ALT_D) and -> 37.02% (HIGH only); entity-unresolved
share of blocks 98.88% -> 43.45% / 65.03%. Over the whole corpus at
n=7227, a different fact about a different population and never a trend
against the first: 38.63% / 31.42% block, 62.14% / 76.40% unresolved.
The baseline's own block definition is UNDETERMINED and is reported as
such: in a replay a count mismatch is confounded between a different
definition and a different gate behaviour, and the second is what is
being measured, so attributing the gap to the first assumes the answer.
Both definitions are reported; neither is asserted.

A FALLING RATE IS ONLY A WIN WHILE THE GUARDIAN HOLDS. Every headline
number this lens produces improves by going DOWN, which makes it
trivially gameable — a gate that never asks anything scores perfectly and
is catastrophically wrong. The must-block guardian rode the same
invocation, against the same live registry, and held at 100%, with all
four probes carrying a clean read record of their own. The analyser now
reads and prints it, so the counterweight is part of the instrument
rather than something a future reader has to remember. That omission was
the Architect's: the brief named readIntegrity as the honesty
precondition and forgot the guardian in a phase whose entire output is a
rate that improves by falling.

G0 WAS THE FIRST REAL USE OF YESTERDAY'S FIELD. readIntegrity came back
{7231, 0, 0, {0,0}} and was asserted before a single rate was quoted,
cross-checked against 7231 [Clarify] lines and 7231 reads=ok in the same
run's stderr. The zero is measured, not assumed — which is the whole
point of having built it.

TWO FINDINGS THE BRIEF DID NOT ANTICIPATE. G4's correspondence is now
one-to-one in BOTH directions and MEASURED rather than inferred across
two surfaces: 304 high-unattributed, 304 declared-empty, the same 304.
Its limit is named rather than smoothed — the stamp carries
layerStatus.kind only, so "on the equipment layer" remains
circumstantial, and stamping layerKey is carried as a named open item.
And G5 half-refutes the standing scoping assumption: ORDER and EMPLOYEE
are major (918 blocks, 32.9%) but do not dominate. LINE alone is the
largest bucket at 787, 785 of them entity-unresolved, against a layer
that is declared AND populated — a resolution failure inside an existing
layer, which is a different disease from a missing one and needs a
different fix. DISCOVERY-EXTEND-2's scope changes on this evidence.

Tests 447/5015 -> 448/5043. Zero migrations, zero Operator, zero src/
lines, zero api/cwf/_lib/ lines, no reseal (scripts/ and docs/ are
unmapped, and the drift guard was run and agreed). The analyser is pure —
no clock, no network, no DB — deterministic across repeated runs, and
structurally forbidden from printing an entity surface, with a test that
fails if it ever does.

WHAT THIS DOES NOT DO: it does not amend the contract. The Architect
ships cwf-sota-definition-v1_4 from these numbers; the measurement lane
supplies the measurement, the contract is amended in the Architect lane.
```

---

## §5 · AFTER THE MERGE

**STEP 5 · tree identity.** `git diff --quiet <branch head after STEP 1> HEAD`
→ must be clean. Then push.

**STEP 6 · report.** Merge SHA with `git log -1 --format=%P` showing **two**
parents · the five CI conclusions read at merge time · STEP 1's guardian numbers
and the additions-only diff · the new sha256 and byte count · the determinism
re-check · `TREE IDENTICAL` · final `git status`.

**Architect lane, after this lands (no owner step):** `cwf-sota-definition-v1_4`
retires §10's stale internal row and replaces it with these numbers, their `n`,
their runner, their date and this merge SHA. That is the first criterion in the
contract to move from **ÖLÇÜLMEDİ / STALE** to measured.

<!-- END · GO-MA-RERUN-2-MERGE-v1 -->
