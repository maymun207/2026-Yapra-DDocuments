# CWF — Session Graph KB · v66
<!-- CWF-SESSION-GRAPH-KB-v66 · 2026-07-28 · S67 close. Supersedes v65.
     The causal narrative: what was believed, what was measured, and where the
     two parted. The register (v68) carries the item wording; this carries the
     REASONING, so a future session can tell which conclusions were earned. -->

## The shape of S67
S66 was CATALOG DAY — five merges, two migrations, 4 hand-written zone rows
replaced by 779 discovered lines. **S67 was BASELINE DAY, and it turned into
INSTRUMENT DAY.** One phase merged, zero migrations, and the number the whole
queue was waiting on. Most of the session's evidence budget went into
instruments rather than features — the right allocation, because three separate
instruments turned out to be lying by omission.

## The spine

**1 · Floor verified, and the tooling gap declared.** `088b2a5e`, rev 150,
361/3953, 59 migrations. The Architect's Vercel and Supabase MCP surfaces were
NOT loaded this session (only Google Drive), verified with three distinct
tool-search queries plus a positive control. Diagnosis rather than complaint:
the one live read the session needed — *has v3 accrued?* — is answered better by
the lens's own per-set section than by a Vercel log line, because F179's ruling
already puts the durable ledger above the injector's spans. **The missing
connector did not block anything.**

**2 · The injector was solved on paper before it was measured.** From code, not
docs: rotation cursor is `countForSet % 9`, so coverage is deterministic and
even; ceiling 200 000 ÷ 400 tokens = **exactly 500 injections/day**; at 5/min
that is 100 minutes. Predicted the cycle would end ~01:40Z. **Observed:
01:39:19Z, 5.09 runs/min, 500 runs.** Three independent confirmations. The
Author's \"500–1000\" estimate from row counts was corrected by derivation from
the ceiling — and v2's lifetime total of exactly 1000 turned out to be two clean
daily cycles, which corroborated it a fourth way.

**3 · F190: the gate that failed against its own reflection.** The phase landed
three ADRs that 17 tracked files — including three APPLIED migrations — already
cited as binding law while the repository did not contain them. The Author's
evidence was green; the Architect's independent replay of the gate's own scan
over the committed tree was RED. **The sentinel `ADR-999` lived inside a tracked
file, so once staged, the gate failed on itself.**
The arithmetic proved the state without argument: the Author measured 94 citing
files, the committed tree had 98, and the delta was exactly the four new files.
**The root cause was deeper than the sentinel and is the lesson worth keeping:**
`landedAdrIds()` read the FILESYSTEM while the corpus scan read the GIT INDEX.
Untracked files are visible to one and invisible to the other, so the three new
ADRs counted as landed while the test file counted as absent. **Two sources of
truth agree at rest and diverge exactly during the commit that changes things.**
→ S67-1.

**4 · The re-run question, answered precisely.** CI had never arbitrated the
branch (`build-test.yml` triggers only on push-to-master and PR-to-master; the
API reported zero runs). On PR #118 `rule26` failed. The Author gathered evidence
before re-running — mechanism named in the log, timing signature, historical
redness, diff reachability — which was the correct order. The Architect's ruling:
**the merge was justified, but not by the green.** With `rule26` red on 4 of the
8 preceding master runs, a green from it is worth as little as its red. The merge
stands on reachability alone. → S67-2, and F196 raised.

**5 · Superset, per tool.** The Operator dump closed F187's precondition with
zero deviation from S66's census. The Architect had predicted from the census
that `mutate` 8 + `explore` 2 = 10 looked like the 10-tool deny column but could
not be, and had named `get_chart_preview` as the likely uncovered renderer.
**Measured: 19 of 22 derive correctly; the three exceptions are `execute_sql`,
`get_chart_preview` and `get_chart_type_schema`.** The named candidate was one of
them.
A v1_1 statement was then CORRECTED rather than dropped: `execute_sql` is not a
false positive. Superset's declaration is right — it really can mutate. We keep
it because it is our only free-form data path and we constrain the PAYLOAD, not
the capability. Under ADR-010 that distinction is load-bearing: one is a
statement about us, the other would be an unevidenced claim about the backend.
The other two are a different class — **the declaration is correct but
ORTHOGONAL**, because no tag encodes surface ownership. Superset's own usage
proves it: two doorways tagged `explore`, a third tagged `data`, sitting beside
`get_chart_data`.

**6 · G4 upgraded F188.** Superset has **zero** published `tool_annotation` and
`tool_category` rows, both kinds existing and empty. So `writeOffered = 0` is not
a counter mis-reading a surface it cannot see — **there is nothing published to
govern.** The same read demoted F191's new site to LATENT: an armes-scoped rule
read cannot be missing anything when the other backend has published nothing.

**7 · The baseline.** 500 injections, 493 frames, `unstableOutcomes: 0`.
**`shortCircuitRate` 33.27 %, ALT_D 0**, so `shortCircuitRate ≡ highRate` and the
set is structurally immune to the unmasking that inflated gapfill's headline —
which is what the standalone corpus was built for, now measured rather than
intended.
The per-utterance map was recovered uniquely from four cause counts and the
per-idx frame counts, and it reconciles exactly. **The map is the deliverable;
the block rate is the least informative number in the report.**

**8 · The finding nobody was looking for.** The three pre-registered
known-failing utterances did not block; the three that blocked were not
pre-registered. Zero overlap — because the two measure different stages
(*cannot ANSWER* vs *asks instead of answering*). And two of the three blockers
are **numeric record identifiers** (`10100000`, `1596497`), 110 of 164 blocked
frames. **The largest measured blocking cause in real operator questions is the
gate mistaking a record identifier for an unresolvable entity.**

**9 · F175 paid off, measurably.** idx 2 now returns `time-unclear`, not
`entity-unresolved`: the fuzzy tier reaches Granit from the typo \"Ganit\", and the
discovered line layer reaches \"sırlama 3-4-5\". **The first measured return on the
779-row mirror.** The shift-window half remains.

**10 · F194 decided by a probe that answered a different question.** idx 7 frames
as `object: QUALITY`, so EQUIPMENT never enters the frame at all. The empty layer
is not the binding constraint; the bottleneck is upstream, in the frame's object
taxonomy. **Filling a mirror the extractor never points at would be building a
road to a door nobody knocks on.** Deferred — and F199 was born from the same
observation: the gate cannot even see that the layer is empty.

## What the session says about method
- **Pre-declaring what will be read, before the payload arrives, worked four
  times.** The alias-source check, the stability control, the ALT_D prediction
  and the truncation flags were all written down first. Two came back as
  predicted, one retired an Architect hypothesis, one closed an instrument gap.
- **Three instruments were found to be filtered subsets that hide failures:** the
  lens's silent `--limit` clamp, the organic bucket's undisclosed predicate, and
  `n = 493` for a population of 500. All four F197 riders are the same class.
- **Every Architect premise error came from writing a spec off a document.** Four
  this session, three self-caught by live reads. The countermeasure is not
  discipline, it is the habit of opening the artifact.

<!-- END · CWF-SESSION-GRAPH-KB-v66 · 2026-07-28 · S67 close -->
