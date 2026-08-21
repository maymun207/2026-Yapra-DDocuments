# PHASE-PB-FULL-1 · v1 — lane AG-1 · walk item #23 🔑 (PB-A) · Wave 7 turn 2

<!-- LANE CHECK: AG-1 only. -->

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| S100 turn-2 anchor | READ: Architect sensor after the W7T1 train, steps 1–3 merged | anchor |
| every ground-truth premise below | READ: RECON-PB-FULL-1-report.md, now ON MASTER — your own measurements, ratified | recon |

```evidence:anchor · read 2026-08-14T12:05Z (Architect)
origin/master carries: PHASE-HOUSEKEEPING-S100-1 MERGE · RECON-PB-FULL-1 MERGE ·
PHASE-CARD-DELIVERABLES-SLOT-1 MERGE · PHASE-CENSUS-CONSOLE-1 MERGE
docVersion "rev 259" · synth-pacing merge (step 4) may land while you build —
your integration merge absorbs it; that is not a stop condition.
```

## THE ARCHITECT'S RULINGS on your recon's two open questions (binding)
**R-A · table-or-not: NO TABLE.** Term statistics are computed in process and
cached in memory per cold start. Eight hundred ten-character names cost
nothing to recompute; a table would be a drift surface bought for a
computation. The class debate is therefore MOOT and is not ruled. If a later
PB part ranks the long governed corpora, the question reopens WITH data.
**R-B · scope: the ENTITY SEAM ONLY.** Exactly your scoping caution, adopted:
rank entity candidates; do not touch the glossary/tool-doc corpora. This is
not a shrink — the ratified order names this item PB-A. The user-scoped
corpora (episodes, semantic_memory) are OUT by the privacy boundary you named.

## SCOPE — numbered, closed
**R1 — the baseline, BEFORE the build (S93-1).** A harness script (no prod
code) measures TODAY'S entity resolution as Recall@k (k=1,3) over the Line-1
grid, per matrix cell, corruption rows separated. The corpus module's own
"makes no claim about how these resolve" line is why this measurement must
exist before R3 — an after-number without a before-number proves nothing.
Results table into the report; this is the phase's first measurement organ and
you are its first consumer by name (S98-L4).

**R2 — the lexical core, pure.** `pathB/bm25.ts` (suggested): BM25 over an
injected tokenizer (the learnableCorpus seam — INJECTED, never imported).
Laws from your own recon, now binding: fold FIRST then tokenize (the dotted-İ
defect is already paid for once); ONE normalisation applied symmetrically to
query and document; TWO profiles — match-profile (suffix-stripped) for
scoring, stats-profile (suffix-kept) for document frequencies — one function
cannot serve both and must not try; the Unicode-property split; the
spurious-space class ("LineL 1") survives via a digit-rejoin rule the corpus
pins; a per-corpus document-length notion (trivial here, structural later).

**R3 — the wire, valved.** Path B ranks candidates INSIDE
`resolveEntityRef`'s candidate seam — it reorders what FINDING considers,
never what KNOWING concludes (ADR-012: no vector, and Path B searches the
frame's surfaces, never raw language). One governed valve `pathB.enabled`,
code floor **0 = today's behaviour** (F185 verbatim), self-seeded, flip by
gated publish AFTER R4's numbers exist — measurement follows functionality,
and here the flip follows measurement.

**R4 — the paired proof.** Re-run R1's harness with the valve ON in the
harness (not in prod): the SAME grid, paired per-cell. Secondary:
FF_UNRESOLVED re-measured (never inherited from the 2931/11047 record), with
row-completeness stated per the lens's own universal-claim warnings.
**No-regression positive control:** the deterministic lane byte-unchanged at
floor (characterization) AND a control that can FAIL — one grid row whose
verdict provably flips when the valve flips, so "unchanged" is a measurement,
not an absence (S99-5).

**R5 — honesty of the loss column.** Where Path B ranks WORSE than today on
any cell, the paired table says so in its own column — a phase that reports
only wins has not measured (kazık defteri applies to our own organs too).

## FENCES
ZERO migrations, ZERO tables, ZERO vectors, ZERO edits to the closed IR enums
(the idx-4 enum gap is F-S100-SYNTH-FRAME-ERROR-11PCT, Wave 8, not yours),
user-scoped corpora untouched, `turkishFold`/`learnableCorpus` reused never
forked. The flip publish is NOT in this phase — it follows the Architect's
read of R4.

## DELIVERABLES (S91)
```deliverables
branch: phase/pb-full-1
report: docs/relay/PHASE-PB-FULL-1-report.md
```
Push · PR against master · hardened CI (your OWN correction now governs:
docs-only exemption exists nowhere on PRs) · MAIL-WAIT for GO.

TAIL-ANCHOR: PHASE-PB-FULL-1-v1

═══════════════════════════════════════════════════════════════════
# RECON-VECTOR-QDRANT-1 · v1 — lane AG-3 · walk item #27 · Wave 7 turn 2 · READ-ONLY

<!-- LANE CHECK: AG-3 only. -->
K4 approved Qdrant for this wave; D-1 forbids a build card over unverified
ground. Your census-console discipline, applied to #27: map first.

## RECON QUESTIONS — every answer a live/read command, named
1. **The soft lane today:** enumerate what semantic/vector memory would SERVE
   — the semantic_memory organ (15 rows, its repository, its recall seam), the
   snapshot/portability organs' shapes, and where ADR-012 draws the line
   (vectors NEVER in the deterministic core; Path B is the lexical lane —
   PB-FULL-1 is being built by AG-1 in parallel; your map must not overlap its
   entity seam).
2. **The embedding question:** what would be embedded, from which class of
   text, at what row counts (read them), and what produces embeddings (which
   provider seam exists; no new provider is proposed here).
3. **Hosting options, costed for the OWNER'S decision:** (a) Qdrant on the
   existing Langfuse EC2 (read its instance size and current container load
   from the repo/infra notes — does it FIT), (b) a dedicated small instance,
   (c) Qdrant Cloud free tier. Per option: monthly cost figure with its
   source, ops surface, and the OBS-HOST-HEALTH-1 lesson applied (who monitors
   it). NO selection — the matrix is the deliverable; spend is the owner's.
4. **The adapter seam:** propose the interface Path C would hide behind
   (store/query/collection lifecycle) so the engine is swappable and the core
   never imports a vendor SDK — a PROPOSAL, not code.
5. **Persistence class:** which ADR-014 class embeddings sit in, argued in the
   vocabulary's own terms (your sibling recon's Q4 is the model to follow).

## FENCES
ZERO code, ZERO writes, ZERO infra created, ZERO spend. Report only.
```deliverables
branch: phase/recon-vector-qdrant-1
report: docs/relay/RECON-VECTOR-QDRANT-1-report.md
```
Push · PR (docs-only PRs still get checks — the corrected rule) · MAIL-WAIT.

TAIL-ANCHOR: RECON-VECTOR-QDRANT-1-v1

═══════════════════════════════════════════════════════════════════
# RECON-OPA-POLICY-1 · v1 — lane AG-4 · walk item #28 · Wave 7 turn 2 · READ-ONLY

<!-- LANE CHECK: AG-4 only. -->
#28 asks whether a policy engine (OPA) earns a place in the governance layer.
D-1: map the ground before any build card exists.

## RECON QUESTIONS — every answer a live/read command, named
1. **The policy surface today:** enumerate every place a policy decision is
   CODE — grantPolicy, the capability/permission tiers on admin routes (your
   census-console sibling just chose one; read how), ADR-012 restriction
   taxonomy enforcement, the gates' admissibility rules (S89), delegation
   policy. Per site: file:line, input shape, decision shape, and who can
   change it today (code deploy vs governed publish).
2. **The classification:** which of those decisions are (a) invariants that
   must STAY code (fail-closed floors — the floor law itself cannot live in a
   policy store), (b) genuinely rule-shaped and owner-tunable — the OPA
   candidates. Argue each placement.
3. **Integration shapes, costed:** embedded WASM/library evaluation vs
   sidecar service, in THIS deployment reality (Vercel functions — a sidecar
   has nowhere to live; state what that implies honestly). Policy storage:
   how Rego (or an equivalent decision table) would ride the EXISTING
   governed-rules organ rather than a second store (S90-1: no second writer
   for the same authority).
4. **The alternative, stated fairly:** whether the existing governed
   domain_rules + gates ALREADY are the policy engine, and #28's honest
   deliverable is a mapping/ADR rather than a dependency — if the recon finds
   that, SAY it; importing an engine to rename what exists would be a cost
   without a capability.
5. **First consumer (S98-L4):** name who would read the first OPA (or
   equivalent) decision, by seam.

## FENCES
ZERO code, ZERO dependencies added, ZERO writes. Report only.
```deliverables
branch: phase/recon-opa-policy-1
report: docs/relay/RECON-OPA-POLICY-1-report.md
```
Push · PR · hardened CI · MAIL-WAIT.

TAIL-ANCHOR: RECON-OPA-POLICY-1-v1
