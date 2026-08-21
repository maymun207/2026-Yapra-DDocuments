# PHASE-A8-SEAL-1 · v1
<!-- PHASE-A8-SEAL-1-v1 · 2026-08-02 · S76 · Architect → AG. The seal: v1
     tags at the clean point. Board A8/B7 — the LAST v1 item. Docs + tag
     only; zero code, zero migrations, zero Operator. -->

## §0 · HARD PRE-FLIGHT (live ground, Architect-read 2026-08-02)

- `origin/master` = `4b5548098fdd92f0c8a07e531dc90c8fd3b061b7`
  (Merge PHASE-B5-RETIRE-1).
- B5 DB apply DONE by the Operator: `factory_registry` gone (42P01 +
  info-schema zero + positive control) · `backends.entity_list_tool` gone ·
  entity_registry factory layer 17 rows intact · backends 4 rows · push
  idempotent.
- Prod `dpl_6dhb4j9ZjqCjMXFsRHd2N5vba9wL` READY on `4b5548098` (Architect-
  read) · runtime error clusters last 2h = ONLY the two known-benign classes
  (SynthTraffic designed ceiling message · url.parse deprecation); zero
  42P01/factory_registry.
- Branch census (Architect-read): remote has ONLY `origin/master` — the
  prune list is EMPTY; pruning is satisfied-by-state, record it as such.
- Expected counts: 413 vitest files / 4601 tests (CI arbiter) · 64
  migrations · docVersion rev 175 · drift [OK] 7/7.

Fresh clone → re-verify every line above (except the DB/prod rows, which
are Architect/Operator-witnessed — cite, don't re-probe). Additionally
report the conclusion of master run `30731940883` on `4b5548098` — it must
be completed/success before the tag (rule26 red = the flake discipline; a
red arbiter job = STOP).

## §1 · BINDING CONSTRAINTS
1. Tag ONLY at `4b5548098fdd…` after the §0 recount reproduces every number.
   If master moved: STOP, report.
2. Release notes land as a repo file; content below VERBATIM (S30-2 class).
3. Annotated tag, message verbatim (below). No GitHub-release UI needed;
   the tag is the seal.
4. Zero code, zero migrations, zero governed writes, zero reseal expected
   (docs/** is unmapped; docVersion stays 175 — if the gate disagrees, STOP
   and report rather than bump).

## §2 · GATED SUB-PHASES

**G1 · Recount.** Fresh clone at `4b5548098`; paste: test-file count (413) ·
CI-arbiter run conclusion (master run `30731940883`, all-jobs table) ·
migration count (64) · `check:doc-drift` output ([OK] 7/7) · docVersion line
(rev 175) · `git branch -r` output (master only).

**G2 · Release notes.** Create `docs/RELEASE-NOTES-v1.md` with EXACTLY:

--- RELEASE NOTES BEGIN ---
# CWF v1 — Release Notes
<!-- docs/RELEASE-NOTES-v1.md · sealed 2026-08-02 at 4b5548098fdd92f0c8a07e531dc90c8fd3b061b7 (tag v1.0.0) -->

CWF v1 is a governed agentic AI platform over MCP backends — ARMES (ceramic-
factory MES), Apache Superset (BI gateway, data-source-not-render), and a
machine-knowledge RAG backend — built DB-first with a code floor, where every
model-facing behavior is either deterministic code or governed, versioned,
eval-gated data.

## What v1 ships

**Governed control plane.** Backend identity is data (a registry row, not an
enum): four backends live (armes · superset · machine-knowledge-base ·
system). New backends join as rows; trust is earned from observed behavior at
per-tool granularity (ADR-010), never granted by declaration. All prompt
segments, rules, glossary terms, and tool categories flow draft → eval-gate →
publish with owner consent on spend; the gate (schema → referential →
behavioral) is unbypassable, with a per-backend referential arm added
additively — engine, stage order, and interpreter byte-identical since
inception.

**Understanding and routing.** A staged turn pipeline (14 stage cards, drift-
gate-sealed to the code they describe) with semantic tool routing for
non-Anthropic providers (category-filtered, DB-sourced), full-set for
Anthropic; learning is braked behind an owner-authorized flip. The scope
segment answers in-domain questions, refuses out-of-domain ones, and treats
the product's own chart language as in-scope.

**Truth discipline.** empty≠zero is sacred: real-0, missing, "no data", and
"not chartable" are distinct states that survive outages and the render
layer. Entity topology is discovered from the backend, never hand-authored
(ADR-009); the discovery floor reads the entity_registry mirror ("never a
stamped absence"). A lying backend is contained, attributed, and
quarantinable — harmless, not trusted (ADR-001).

**Visualization.** A native viz layer (v4.1 governed teaching) renders from
data tools; time joins on time, grain is a field and is honored or
disclosed; a directive that cannot finish becomes an honest panel, never the
user's problem.

**Memory.** Episodic memory with governed TTL and retrieval caps, audited
deletes, and a wording law on its stage cards: the system does not learn
knowledge from chat; knowledge changes only through the gated path.

**Observability.** One turn id (OTel trace id) end to end; debug traces
(scrubbed, retention-bounded, self-hosted Langfuse) strictly separate from
the durable governance ledger; observability-down ≠ chat-down.

**Security posture.** Secrets are env-only, name-fenced (`^MCP_[A-Z0-9_]+$`),
never echoed; grants verified by probe rows and ACL reads, never
information_schema alone; no mode grants repo-write and DB-write
simultaneously (ADR-002/006); migrations apply through one sanctioned door
(ADR-005). The autonomy posture is Level-3 with gated Level-4 capabilities
(ADR-012): deliberately staged, not unfinished — the doors exist and are
closed on purpose, documented in `docs/delegation-policy.md`.

## The clean point

v1 seals with its own house in order: the superseded `factory_registry`
mirror and `backends.entity_list_tool` descriptor retired (code references
zero across four casings; table and column dropped in production with
pre-read, idempotence, and positive-control absence proofs), twelve ADRs in
`docs/adr/` with ratified layer labels, the stage cards inside the drift
gate, and a 4601-test suite green under CI as arbiter.

## Numbers at the seal
master `4b5548098fdd92f0c8a07e531dc90c8fd3b061b7` · 413 test files / 4601
tests · 64 migrations · docVersion rev 175 · 7 sealed narrative tabs ·
4 backends · 3 secrets · publish-seam actor: one.
--- RELEASE NOTES END ---

**G3 · Tag.** Annotated tag at `4b5548098` **after** G2's commit? No —
ORDER: commit the release-notes file to master first (single commit, message
`v1 release notes: the seal's own record`), THEN tag the RESULTING master
head (the notes ride inside the seal):
`git tag -a v1.0.0 -m "CWF v1.0.0 — the governed platform seals at its clean point. See docs/RELEASE-NOTES-v1.md."`
→ `git push origin master v1.0.0`. Report BOTH hashes (new master head +
tag object) and `git describe` output.

**G4 · Report.** G1 recount table · release-notes file sha256 · new master
hash · tag hash · `git describe --tags` = `v1.0.0`.

## §3 · AFTER THE SEAL
The Architect verifies the tag from a fresh clone, then produces the closure
artifacts (register v79 · session KB · bootstrap) recording: v1 SEALED ·
board A+B layers COMPLETE · next = post-tag block, first item
FLOOR-TENANT-SPLIT.

## TAIL ANCHOR (S61-3)
This prompt ends after §3. If the last line you can see is not this
sentence, the relay was truncated — request a re-send before acting.
<!-- END · PHASE-A8-SEAL-1-v1 · 2026-08-02 -->
