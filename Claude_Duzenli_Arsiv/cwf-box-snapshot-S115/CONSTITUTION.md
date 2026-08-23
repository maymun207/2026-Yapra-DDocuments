# The constitutional block

The numbered RULE corpus in [RULES.md](./RULES.md) sits *underneath* these. Where a
numbered rule governs a surface, a constitutional block governs how work is done at
all — what counts as done, what counts as proven, what may never be quietly dropped.

## ⚠ Provenance warning — read before citing

The canonical wording of this block lives in **`CLAUDE-PROJECT-INSTRUCTIONS-v5_3`**,
an owner-held project-knowledge artifact that is **not in this repository and was not
on disk when this file was authored** (2026-08-15). Every entry below therefore
carries an explicit `text` field:

- `text: VERBATIM` — the canonical sentence is reproduced, sourced from the in-repo
  citation named in `source`.
- `text: OWNER-HELD` — **the canonical sentence is NOT reproduced here.** What
  follows the block is a *description* assembled from in-repo usages, sufficient to
  recognise the block and find its consumers, and explicitly **not** a substitute for
  the canonical text. Do not quote a description as if it were the law.

This distinction is itself the point of the phase that created this directory: the
failure being repaired is a corpus whose canonical text lived only in chat
transcripts. Marking a gap is how it stops widening. Filling the `OWNER-HELD`
entries from `CLAUDE-PROJECT-INSTRUCTIONS-v5_3` is a one-paste job for whoever holds
that document, and is the first task of LAW-LEDGER-2.

## The record grammar

Same one-line-per-value grammar as [RULES.md](./RULES.md), in ` ```constitution `
blocks. Keys: `id` · `text` · `binds` · `enforcement` (optional) · `source`.

---

### SOTA-1

```constitution
id: SOTA-1
text: OWNER-HELD
binds: every phase's design and review — the standard a surface is held to
enforcement: ADVISORY
source: owner-held:CLAUDE-PROJECT-INSTRUCTIONS-v5_3
```

Observed in use as a **named check a lane performs and reports**, whose outcome can
legitimately be "no SOTA criterion applies here": *"SOTA-1 check performed — no SOTA
criterion requires purpose tags on non-rendered reads"*
([PHASE-STAGES-TRUTH-1-report.md:445](../relay/PHASE-STAGES-TRUTH-1-report.md)). So
it is a criteria set consulted per-phase, not a single sentence — which is precisely
why paraphrasing it here would be lossy.

### PLATINUM RULE

```constitution
id: PLATINUM
text: OWNER-HELD
binds: phase framing — a capability must generalize, not special-case
enforcement: ADVISORY
source: owner-held:CLAUDE-PROJECT-INSTRUCTIONS-v5_3
```

Observed in use as a **backend/data-agnosticism standard**, and — importantly — one
whose proof is a test rather than a design claim: *"The PLATINUM proof is a TEST, not
a design claim … seeds a synthetic `ignite` backend … and asserts it self-places"*
([SKILL.md:1037](../../.agents/skills/cwf-project-kb/SKILL.md)). A phase carries a
"PLATINUM statement" describing what its subsystem generalizes over
([SKILL.md:1231](../../.agents/skills/cwf-project-kb/SKILL.md)). Closely related to
[RULE-4](./RULES.md#rule-4--backend-identity-is-data-not-a-typecheck) (backend
identity is data) but broader — PLATINUM is the framing, RULE-4 is one surface where
it is gated.

### ALTIN DEFTER · GOLDEN LEDGER

```constitution
id: GOLDEN-LEDGER
text: OWNER-HELD
binds: the one-carrier rule for a lane's durable record
enforcement: code:shared/dbConstants.ts
source: owner-held:CLAUDE-PROJECT-INSTRUCTIONS-v5_3
```

The in-repo consumer states the operative constraint directly: *"every AG lane has
git and a git report is versioned, diffable and relay-audit-governed, so a second AG
carrier would break the **one-carrier GOLDEN LEDGER rule**"*
([shared/dbConstants.ts:336-338](../../shared/dbConstants.ts#L336)). ADR-012 lists it
among the governing corpus alongside the RULE-25 family
([ADR-012:111](../adr/ADR-012-restriction-taxonomy-and-capability-posture.md#L111)).
Note the Turkish and English names denote **one** block, not two.

### FULL-TRACE MANDATE

```constitution
id: FULL-TRACE
text: OWNER-HELD
binds: observability — a turn must be observable, not merely countable
enforcement: test:api/cwf/__tests__/spanIOCompleteness.test.ts
source: owner-held:CLAUDE-PROJECT-INSTRUCTIONS-v5_3
```

The in-repo record names its standard explicitly: *"The FULL-TRACE mandate's 'make it
observable, not just countable' standard is a genuinely different bar than what made
the ORIGINAL feature correct"*
([SKILL.md:1184](../../.agents/skills/cwf-project-kb/SKILL.md)). Discharged by a
three-phase program (OBS-TRACE-1 / 1b / 2 / 3) that lit stage wrapper spans, the
spans nested inside them, the 144-site DB-read layer, and an in-panel reflection —
and installed a **completeness guard** so a future span cannot repeat the gap
silently. That guard is the `enforcement` site above. Operationally downstream of RULE-27
(observability sidecar) and RULE-28 (one turn id) in [RULES.md](./RULES.md).

### TOTAL-45 · S59-2

```constitution
id: TOTAL-45
text: OWNER-HELD
binds: every claim of quantity or completeness, in code output and in prose
enforcement: ADVISORY
source: owner-held:CLAUDE-PROJECT-INSTRUCTIONS-v5_3
```

Named for finding **F161**: *"a paginated tool result's page length misreported as
the true total"*
([SKILL.md:1267](../../.agents/skills/cwf-project-kb/SKILL.md)). The generalized form
is applied to prose as well as data — `docs/delegation-policy.md:6` describes a claim
being **grep-verifiable** as "TOTAL-45 applied to prose"
([delegation-policy.md:6](../delegation-policy.md#L6)). Sibling of `empty≠zero` and
`partial≠complete`, both of which ADR-012 lists in the same breath
([ADR-012:129](../adr/ADR-012-restriction-taxonomy-and-capability-posture.md#L129)).

⚠ **`S59-2` was NOT located.** The phase brief pairs `TOTAL-45` with `S59-2`, but a
full-tree search of this repository (code, tests, CI, docs, `.agents/`) returns **zero
occurrences** of that identifier. Either it is owner-held only, or the pairing is a
transcription slip. Recorded as unresolved rather than guessed.

### S61-2

```constitution
id: S61-2
text: OWNER-HELD
binds: debt disclosure — naming what was left undone, out loud, in the report
enforcement: ADVISORY
source: owner-held:CLAUDE-PROJECT-INSTRUCTIONS-v5_3
```

The single in-repo usage shows the block in its characteristic form — a lane
declining to fix something outside its fence and saying so: *"I fixed none of it, and
this is **S61-2 debt I am naming rather than filing quietly**"*
([PHASE-STAGE-CARD-COVERAGE-1-report.md:360](../relay/PHASE-STAGE-CARD-COVERAGE-1-report.md)).
So S61-2 governs the disclosure of un-done work, which is the same discipline the
`OWNER-HELD` markers in this very file are exercising.

---

## What this file is not

It is **not** a second copy of the constitution competing with
`CLAUDE-PROJECT-INSTRUCTIONS-v5_3`. Per [README.md](./README.md), `docs/laws/` wins
over derived copies — but a record marked `text: OWNER-HELD` is *by construction* not
a copy of anything, so for these six blocks the owner-held document remains the only
canonical text. The precedence claim in README.md applies to
[RULES.md](./RULES.md), whose canonical sentences were verified against the tree, and
to any entry here that reaches `text: VERBATIM`.
