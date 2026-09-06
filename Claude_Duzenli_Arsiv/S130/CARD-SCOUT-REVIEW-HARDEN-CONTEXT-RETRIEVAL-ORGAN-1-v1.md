<!-- relay-audit: v1 kind=card -->
# CARD-SCOUT-REVIEW-HARDEN-CONTEXT-RETRIEVAL-ORGAN-1 · v1 — review PR #493: your five organ findings, each closed with the planted-fault test that was missing; say whether each test would fail without its fix

Scout card. Read-only by your charter. You wrote the five findings (SCOUT-REVIEW-CONTEXT-RETRIEVAL-1-v1, 2026-09-04 10:03Z; reconfirmed v2); AG-4 has now closed them under CARD-HARDEN-CONTEXT-RETRIEVAL-ORGAN-1-v1 on branch `phase/harden-context-retrieval-organ-1`, PR #493, three commits, pushed 2026-09-05T13:20:41Z. CI is running at the tip as this card is cut; review the content now and say IN-PROGRESS by name for any context not concluded — the landing card waits on the lander's own CI read. AG-4's report (`HARDEN-CONTEXT-RETRIEVAL-ORGAN-1-AG-4-report`) may or may not be on the bus when you start; review the tree you find.

## PREMISE

MEASURED: 2026-09-05T13:20:41Z Vercel branch-push sensor for the `head` fence's commit; PR #493 in its meta. Three non-merge subjects in master..tip, all `AG-4: PHASE-HARDEN-CONTEXT-RETRIEVAL-ORGAN-1 — …` (owner's clone, `git log master..branch`): A2–A5 in one commit, A1 isolated in its own, reseal in the third.
MEASURED: 2026-09-05T13:2xZ `git diff --stat master...branch` on the owner's clone: 12 files, +487/−50 — `groundMcpServer.test.ts` (new, 107), `groundPort.test.ts`, `groundTools.test.ts`, `indexArchive.test.ts`, `archiveCorpus.test.ts`, `groundPort.ts`, `groundTools.ts`, `readOnlyFence.ts`, `archiveCorpus.ts`, `scripts/groundMcpServer.ts`, `scripts/indexArchive.ts`, `public/architecture/manifest.json` (Architecture Map digest moved — a REAL reseal, 503 mapped files; facts.json unchanged).
MEASURED: AG-4's A1 commit body names an ON-DISAGREEMENT with the card's FALSIFIER file list: the same fold existed in `groundTools.ts` (its own comment warns that collapsing the two "would make a walled-off corpus look empty"), so A1 could not be closed inside the five modules alone. AG-4 reported the contradiction rather than resolving it silently. The Architect accepts `groundTools.ts` as a NAMED exception for A1 — confirm the edit there is the A1 fix and nothing else.
UNMEASURED: whether each of the five new tests FAILS against the parent commit (ORDER B — the card's ORDER C asked AG-4 to prove fail-then-pass; verify from its report or from the test diff); the A1 `Placed<T>` typing (AG-4 measured a first non-generic draft that let `T` resolve to `unknown` with all 61 tests still green — vitest does not type-check; confirm the committed version is generic); CI at the tip.
DECAYS on any push to the branch or master. ON-DISAGREEMENT: tip ≠ `head` fence → review what you find, say so first.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the branch, PR, tip, commit shape | MEASURED: 2026-09-05T13:2xZ Vercel meta + owner's clone | head |
| the content verdict | UNMEASURED — ORDERS A–D | verdict |

```evidence:head
phase/harden-context-retrieval-organ-1, PR #493 (base master), tip:
    57ae325bfda66867e1197a9e6424ed5a0d2e9972
master it was cut from and will land on:
    de47d9b1fd867bd8c86d76566002da56d53583af
```

```evidence:verdict
UNMEASURED. ORDER A shape; ORDER B the five fixes and their tests; ORDER C laws; ORDER D resolver and CI.
```

## ORDER A — SHAPE
`git ls-remote` the branch = `head`; `git diff --name-only master...tip` = the 12 paths above and nothing else (the `groundTools.ts` exception named); non-merge subjects = 3, all `AG-4:` before the first colon.

## ORDER B — THE FIVE FIXES, ONE BY ONE (your own findings)
For each of A1–A5: quote the line that closes it at the tip, and the new test; state whether that test would FAIL against the parent master in the `head` fence (read the assertion against the old code path — you do not run it). A1: mismatch arms carry `Placed<T>`/UNKNOWN (the organ's existing idiom, not a new one), `get` distinguishes wrong-collection (UNKNOWN) from no-such-id (null), refusal names BOTH collections, helper is generic; the `groundTools.ts` edit is A1 only. A2: blank segment REFUSED with a reason; `"arch:fam::"` and `"arch:fam: :3"` asserted. A3: lens two iterates the SAME `WRITE_VERBS` lens one owns; `.delete(` planted and caught. A4: duplicate-id tally in the index summary/manifest; two same-basename docs in two sections asserted; refuse-vs-report direction named. A5: non-array provenance writes one stderr line then `[]`; `{}` planted and asserted. Any fix without a test that would fail without it is a FINDING.

## ORDER C — THE LAWS
C1 LAW (no write to `messages` / governed tables from the organ); secrets env-only; empty ≠ zero now holds on every mismatch arm; no route-around of a refusal; the reseal is content-derived (S100-1), not a breadcrumb.

## ORDER D — RESOLVER AND CI
Installed `resolveAuthorLane` + `judgeReportOnly` at the tip (expect AUTHOR-SUBJECT/AG-4; lander AG-5 PASS; AG-4 SELF-LAND since paths leave docs/relay/). CI at the full forty hex, every context named; IN-PROGRESS by name where not concluded.

## ORDER E — REPORT
From_lane row, artifact_name `SCOUT-REVIEW-HARDEN-CONTEXT-RETRIEVAL-ORGAN-1-v1`. First line `VERDICT: GREEN|AMBER|RED`; second `RESOLVER: <cls> · landable-by: <lanes>`; third `HEAD: <tip reviewed> · CI: <concluded|in-progress>`. Then ORDERS A–D. This row is copied into the AG-5 box as the landing card's PRECONDITION.

## FALSIFIER
Wrong if any of the five tests would pass against the parent, if a path outside the 12 appears, if the `groundTools.ts` edit is more than A1, if the resolver does not read AG-4, or if the reseal digest is not content-derived.

## SHARED SURFACES
None written. Reads only.

## DECISION RIGHTS
None.

BODIES: `empty ≠ zero` · `S37-2` · `S100-1` · `TOTAL-45` · C1 LAW · OWNER-RULING-S130-LAND-490-1 (§2, the hardening cards) · CARD-HARDEN-CONTEXT-RETRIEVAL-ORGAN-1-v1 · SCOUT-REVIEW-CONTEXT-RETRIEVAL-1-v1/v2 · free.md.

fanout: personalized

```deliverables
report: bus row from_lane, artifact_name SCOUT-REVIEW-HARDEN-CONTEXT-RETRIEVAL-ORGAN-1-v1
```

TAIL ANCHOR: CARD-SCOUT-REVIEW-HARDEN-CONTEXT-RETRIEVAL-ORGAN-1-v1 ends here.
