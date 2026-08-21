# PHASE-METRIC-VOCAB-DISCOVERY-1-v1 — the vocabulary grows by learning, never by keyboard

<!-- S98 · Architect-authored · lane AG-4 · Wave-5 MAIN · walk item #12.
     Ratified S90: vocabulary grows through a governed gate, never a human
     typing words. Named precondition METRIC-REGISTRY-DATA-1 closed in S91.
     Filed through relay_inbox (single-line). -->

## PRECONDITION (S47-1)
Fresh clone at `origin/master` = `cc9a2a78de473b2ec6eeb3d38641780cc781851b`
(rev 249 · 575 vitest test files · 77 migrations · 15 ADRs · drift 7/7 ·
zero `phase/*`). Disagreement → STOP and report.

## WHY — and today's live specimen
The registry is DATA now (S91), but it is FROZEN data: three seeded words
and nothing has ever been added except by hand. Today's production turn
is the specimen, and it is in the logs: the owner asked for a **doğalgaz**
(natural gas) consumption chart; the frame resolved
`action=QUERY_METRIC object=FACTORY entity_ref=[Granit fabrikası]` and
then **`metrics=[]`** — because "doğalgaz" is not a word this system
knows. Superset was carrying a chart named for it the whole time. A
platform that onboards a backend in a click and then cannot learn that
backend's own vocabulary has moved the bottleneck, not removed it.

## CLAIMS (S97-L1 — computed live this session; each names its source)
- Published `metric_registry` rows, read live from `domain_rules`
  (status='published'): **3 rows, all `backend_id='armes'`** —
  `oee` (aliases: oee) · `fire` (aliases: fire, scrap, ıskarta, iskarta;
  categoryHints: quality) · `throughput` (aliases: throughput, debi, k4).
  **No other backend has a single metric word.** The platform floor is
  EMPTY by design (S90 ruling: a bank backend must never see `oee`).
- `resolveMetricRegistry.ts` (read live) already: reads governed rows per
  backend · treats the backend list as DATA (every enabled `backends`
  row) · UNIONs across the turn's active backends · distinguishes "this
  backend publishes no metrics" from "we could not establish this
  backend's vocabulary" · falls back on a read outage. **The reader is
  ready. What is missing is the WRITER.**
- The learn-side guard already exists and is deliberately strict:
  `routing/learnableCorpus.ts` (F185-GUARD-1) is an ALLOW-LIST over the
  DISCOVERED integration — admission by exact token equality against
  `backend_tools.tool_name` + `.description` + METRIC_ALIASES, after one
  shared Turkish fold, with four deny clauses. **This is the machinery a
  discovery path must go through, not around.**
- ADR-011 / catalog write-lock and the eval-gate are unbypassable: a
  learned word can never widen tool exposure.

## THE SHAPE
### R1 — candidates are DISCOVERED from what the backends already say
A pure derivation proposes metric-word candidates from protocol surface
only: mirror tool names + descriptions, census response FIELD names,
declared value spaces, and (for a gateway backend) the artifact names its
own search returns — the "Granit - Glazür Hatları **Doğalgaz** Sarfiyat
Grafiği" class. Zero hand lists. Per-backend by construction: a candidate
discovered from armes may never be proposed for superset, and the
platform floor stays EMPTY.

### R2 — candidates enter as DRAFTS, through the EXISTING governed seam
Nothing self-publishes (F95, absolute). A candidate becomes a
`<backend>.metric_registry` DRAFT through the SAME
`RuleGovernanceService.createDraft` path a panel click uses — never a raw
insert, never a second write door. Publishing stays a human act through
the gate that already exists.

### R3 — the gate stays the gate
Every existing check applies unchanged: the eval-gate's schema +
referential stages, the F185 corpus guard, ADR-011. A discovered word
that cannot pass is REPORTED, never smuggled. If you find the guard
rejects a word that should obviously pass (the `doğalgaz` case is the
live test), that is a FINDING to report — do not weaken the guard to make
your feature look good. Widening a law to fit an implementation is how a
gate starts dying (the frozen-exemption lesson, this session).

### R4 — the owner surface is part of the organ (S82-6)
Proposed candidates are reviewable where governed drafts already live,
each showing WHERE it was discovered (which tool, which field, which
artifact) — a proposal without its provenance is a guess with a UI.

## FENCE (exhaustive; intersections with the three sibling lanes = ∅)
CREATE: `api/cwf/_lib/routing/metricVocabDiscovery.ts` (+ `__tests__`) ·
`docs/relay/PHASE-METRIC-VOCAB-DISCOVERY-1-report.md`
EDIT: `api/cwf/_lib/routing/**` (learnableCorpus wiring, deriveCategories
if the union point demands it) · `api/cwf/_lib/knowledge/resolveMetricRegistry.ts`
(READ side only if genuinely required — prefer leaving it untouched) ·
`api/cwf/_lib/knowledge/reference/metricRegistry.ts` · the rules/drafts
review surface under `src/components/admin/**`
PLUS: `.agents/CHANGELOG.md` · `.agents/skills/cwf-project-kb/SKILL.md`
**FORBIDDEN THIS WAVE (allocated to siblings):** `shared/dbConstants.ts` ·
`shared/grantPolicy.ts` · `scripts/verifyGrants.ts` ·
`knowledge/reference/agentParams.ts` · `api/cwf/_lib/backends/**` ·
`api/cwf/_lib/knowledge/backends/**` · `api/cwf/_lib/observability/**`.
No migration stamp is allocated: this phase writes governed ROWS through
an existing table. If you conclude DDL is needed, STOP and ask.

## FALSIFIERS
(a) A candidate discovered from backend A is never proposed for backend B
    (forced with two fixture backends).
(b) Nothing published without a human act: a grep + behavioural pin that
    no path here reaches `publish()`.
(c) The platform floor stays empty — a fresh backend with no rows gets no
    vocabulary, and `oee` never leaks to a non-armes backend.
(d) A read outage yields the reader's existing honest state, not an empty
    vocabulary presented as fact (MEASURE-READ-HONESTY-1).

## BIRTH PROOF (S93-1, inside this phase) — the specimen closes the loop
Run the discovery against the LIVE superset mirror and report whether
**doğalgaz** (or its fold) appears as a candidate with its provenance.
If it does not, that is the finding — report WHY (the corpus source that
would have carried it, and why it did not), and do not paper over it.
Either outcome is a real result; only a silent one is a failure.

## DELIVERY (S91 gate)
Branch `phase/metric-vocab-discovery-1` — PUSH · PR against master ·
report at the path above · seal only if a mapped file is touched
(`routing/**` IS mapped — expect a provisional seal in its own commit,
DROP-AT-MERGE, docVersion NOT bumped, S95-1). NO per-lane GO: build,
push, report, then **re-enter MAIL-WAIT** — the GO-TRAIN is mail.

<!-- END · PHASE-METRIC-VOCAB-DISCOVERY-1-v1 -->
