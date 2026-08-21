# GO → AG · PHASE-A7-B6-MIN-DOCS-1 MERGE · 2026-08-02
<!-- GO-A7-B6-MERGE-v1 · Architect-authored after RULE-25 fresh-clone review
     of phase/a7-b6-docs @ f8be5b7583165810276ef8fdeb5c0ab4345ef4bd. -->

## Review verdict: GO

Independently re-established from a fresh clone (not from your report):
branch base = anchor `45dec96b` · 7 commits · 17 files, docs + manifest only ·
ADR-012 body re-hashed `446309de…` (13279 B), `Status: PROPOSED` intact under
an honest landing header · 11/11 ADR original bodies byte-identical by my own
head-N compare, 11 labels appended · manifest 173→174, 6→7 tabs, Stage Cards
diagram = `stagesRegistry.ts`, areas = `turn/** + chat.ts`, seal
`1f0ca2fbe1f8` · dead evalGate glob gone with Governance Model sha
`d359bcd358ca…` byte-identical and every other pre-existing seal unchanged ·
forbidden surfaces 0 · `check:doc-drift` [OK] 7 tabs run by me at head ·
positive control re-run by me: turn/** touch → `[FAIL] DOC DRIFT: Stage
Cards … (21 mapped files)`, revert → [OK] · test files 415, zero delta ·
your row-7 false-zero correction verified (`resolveActiveBackends.ts` reads
`user_backend_scopes`; D-2's secrets row cites `shared/mcpSecrets.ts:23`,
exact).

## STEP 1 — CI gate (BLOCKING; Architect sandbox is rate-limited)

Confirm CI green for `f8be5b7` on `phase/a7-b6-docs`: the 4620-test suite
(CI arbiter, S37-2) must show **completed + success**. `in_progress`, null,
or absent is NOT a pass. Paste the run conclusion line.

## STEP 2 — Merge (only after STEP 1 green)

`git checkout master && git pull --ff-only` (must land on `45dec96b`; if
master moved, STOP and report — do not rebase) then merge `--no-ff` with the
message below VERBATIM (S30-2), then push.

--- MERGE MESSAGE BEGIN ---
Merge PHASE-A7-B6-MIN-DOCS-1: B6 min docs + ADDENDUM-1 (branch phase/a7-b6-docs)

A7 lands the five-item docs floor and one manifest correction, docs +
drift-gate config only, zero migrations, zero governed writes:

- G1: ADR-012 (restriction taxonomy & capability posture) lands byte-verbatim
  (sha256 446309de…, 13279 B) under a landing header; Status: PROPOSED
  untouched per S37-1 — ratification facts (S72 close, register v74 §8)
  recorded outside the artifact. ADR-012 is citable as a repo document from
  this commit.
- G2: docs/delegation-policy.md — the human-delegation policy as a documented
  object: 17 enforcement-site rows, every claim grep-anchored to code.
- G3: autonomy posture named in ARCHITECTURE.md — Level-3 autonomy with gated
  Level-4 capabilities (RR-1/RR-2/RR-3 doors per ADR-012 §5).
- G4 (R-1 retrofit): ADR-001…011 gain append-only layer labels copied from
  ADR-012 §4's ratified sweep; all eleven original bodies byte-identical
  (verified pre/post compare, positive-control-proven).
- G5 (STAGE-CARD-DRIFT-1): stagesRegistry.ts joins the drift gate as the
  Stage Cards manifest entry (diagram = the registry, mapped areas =
  api/cwf/_lib/turn/** + api/cwf/chat.ts, seal 1f0ca2fbe1f8); zero engine
  changes, six pre-existing seals byte-identical; positive control: turn/**
  touch → gate RED naming Stage Cards, revert → OK. Card reconcile: zero
  factual staleness, zero card edits.
- ADDENDUM-1: dead glob api/cwf/_lib/evalGate/** removed from the Governance
  Model tab; mappedContentSha byte-identical before/after (d359bcd358ca…)
  proving the glob contributed nothing; coverage unchanged via knowledge/**.
- G6: docVersion 173→174, one bump for the whole phase; KB generalization
  updated 6→7 tabs.

STAGE-CARD-DRIFT-1 → CLOSED@evidence. R-1 retrofit DONE at definition-site
scope (admin-UI surfacing remains the named later refinement).
--- MERGE MESSAGE END ---

## STEP 3 — Report back (ends the wait)

Paste: STEP 1 CI conclusion line · new `origin/master` hash from
`git rev-parse origin/master` AFTER push · `git log --oneline -1 origin/master`.
The Architect then runs the §3 proof read at the new master.

## TAIL ANCHOR (S61-3)
This GO ends after STEP 3. If the last line you can see is not this
sentence, the relay was truncated — request a re-send before acting.
<!-- END · GO-A7-B6-MERGE-v1 · 2026-08-02 -->
