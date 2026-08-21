# AG-1 · S100 · Wave 7 opening — HOUSEKEEPING FIRST (owner order), then #23 recon

<!-- LANE CHECK: AG-1 only. If your window is not lane AG-1, STOP, reply "wrong lane". -->

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| S100 anchor, fresh clone, drift gate exercised with a positive control | READ: Architect fresh clone + `checkDocDrift` run twice (mutated→FAIL, restored→OK) | anchor |
| every `phase/*` ref on origin is an ancestor of master | READ: `git merge-base --is-ancestor` per ref | anchor |
| eleven migration files carry a STATUS header claiming Operator-pending while their versions are LIVE in `schema_migrations`; three carry no STATUS line | READ: header grep on the clone + one SQL `IN`-list read against the live ledger | flip |
| the S99 cards in your box are CLOSED work | READ: their named branches are merged ancestors of master | anchor |

```evidence:anchor · read 2026-08-14T06:52–06:57Z (Architect)
origin/master = bfd9153b90a002a1f1924a38120ac352738928dd
docVersion "rev 258 · 2026-08-14" · vitest ruler 601 (src 148 + shared 6 + api 447)
e2e Playwright corpus 15 (separate ruler) · migrations 80 (top 20260814130000)
live schema_migrations = 80 · ADR 15 · drift [OK] 7/7 · phase/* refs 12, all
MERGED by merge-base --is-ancestor, unmerged commits 0
```
```evidence:flip · read 2026-08-14T06:58Z (Architect: grep + live SQL)
STATUS still "AUTHORED, Operator-pending" while LIVE: 20260731120000 ·
20260808120000 · 20260811120000 · 20260811160000 · 20260812120000 ·
20260812160000 · 20260812200000 · 20260813090000 · 20260813101000 ·
20260813110000 · 20260814130000   (all eleven present in schema_migrations)
NO STATUS line at all: 20260813100000_backend_lifecycle_state ·
20260813130000_observability_host_health · 20260814120000_persistence_class_catalog
```

## STALE-WINDOW NOTICE
Any anchor from an earlier wave in your window is VOID; the fence above is
yours. Every S99 card in your box is completed, merged work — read nothing from
them as instruction. PRECONDITION: `git ls-remote origin refs/heads/master`
returns the anchor hash (a docs-only advance is not a stop condition).

## STANDING LAWS (unchanged): S99-1..9 · hardened CI (`head_sha`; a run must
EXIST — `total_count:0` is a FAILED check; `completed`+`success` only) ·
integration verb is MERGE-from-master (S99-8) · `pipefail`/exit-code capture
before any push decision, red output captured to a FILE before any re-run
(S99-9) · `git status --porcelain` empty before every push · one exclusive
worktree per phase (S96-1/S98-L1).

═══════════════════════════════════════════════════════════════════
## PHASE 1 of 2 · PHASE-HOUSEKEEPING-S100-1 — the owner ordered this FIRST

### R1 — delete the twelve merged `phase/*` refs on origin
For EACH ref in the anchor's census: re-verify `git merge-base --is-ancestor
<ref> origin/master` in YOUR clone (never trust my census, S99-7), then delete
(`git push origin --delete <name>`). A ref that fails the ancestor test is NOT
deleted — it is reported by name and left standing. Ref deletion needs no PR.

### R2 — F-S100-MIGRATION-STATUS-LIES-11: the DOC-FLIP
The eleven files in `evidence:flip` flip their STATUS line to APPLIED with the
evidence source named in the line itself (the live ledger read + the Operator
report that applied them, where one exists on the bus/`docs/relay`). The three
STATUS-less files GAIN a STATUS line stating APPLIED with the same sourcing.
Re-derive the live membership yourself with one `IN`-list read before editing —
my read is a claim, yours is the premise (S65-1/D-3).
**Comment-only, proven:** SQL comment-stripped byte-compare (strip `--` lines)
per file, before vs after — zero executable diff, stated in the report.

### R3 — drift + gates
`npm run check:doc-drift` on the branch (migrations are likely below every
tab's globs — but the gate decides, not the assumption; reseal only if it says
so, taking the docVersion number by READING master's manifest at merge time,
never assuming). Full vitest ruler + `typecheck:api` green.

### DELIVERABLES (S91 completeness)
Branch `phase/housekeeping-s100-1` · pushed · PR against master ·
report `docs/relay/PHASE-HOUSEKEEPING-S100-1-report.md` (deleted-ref list with
per-ref ancestor verdicts · per-file flip table · byte-compare verdicts) ·
hardened CI on the head · then MAIL-WAIT for GO. Phase 2 does NOT start until
this branch is pushed and the report filed — owner's explicit sequencing.

═══════════════════════════════════════════════════════════════════
## PHASE 2 of 2 · RECON-PB-FULL-1 — READ-ONLY (D-1; the gated #23 prompt is
written from YOUR recon, not from documents)

#23 🔑 PB-FULL-1 is a SOTA gate key: **Path B = lexical retrieval (BM25 +
regex) that searches the IR FRAME, never raw language** — it improves how the
agent FINDS (soft/learned lane), never what it KNOWS (deterministic lane). The
repo mentions it only as forward references in the Line-1 corpus module. Before
any build, the Architect needs the ground truth mapped.

### Recon questions — every answer a LIVE read with its command named
1. **Seams:** enumerate every point where the resolved IR frame is consumed for
   candidate FINDING today (routing derive, knowledge lookup, memory recall,
   clarify candidates) — file:line, input shape, output shape.
2. **Corpora:** enumerate candidate text corpora Path B could rank (tool mirror
   text + tool_doc overlay · governed rule payloads · entity_registry names ·
   episodes) with LIVE row counts and average text lengths, and which are
   backend-scoped vs platform.
3. **Tokenisation:** what folding/tokenising already exists (the one Turkish
   fold, metricVocab, learnableCorpus token rules) — reuse surface, gaps a BM25
   tokenizer needs (the corpus module's own boundary-class notes included).
4. **Storage:** where would per-corpus term statistics live under ADR-014
   classes — derived/rebuildable (operational.mirror shape) vs learned; name
   the class you would argue for and why. NO migration in recon.
5. **Criterion:** state, from the repo and the frame lens evidence, what
   measurable claim PB-FULL-1 must prove (e.g. FF_UNRESOLVED reduction path,
   Recall@k against golden specimens) — as a PROPOSAL, not a decision.

### FENCES
ZERO code changes, ZERO writes anywhere. Output is one report:
`docs/relay/RECON-PB-FULL-1-report.md` on branch `phase/recon-pb-full-1` ·
pushed · PR against master (docs-only; CI's docs path-ignore means zero runs is
the EXPECTED diagnosis there — state it, per the hardened rule's own list) ·
then MAIL-WAIT. The Architect writes PHASE-PB-FULL-1 from this.

TAIL-ANCHOR: CARD-S100-AG1-HOUSEKEEPING-THEN-PB-RECON-v1
