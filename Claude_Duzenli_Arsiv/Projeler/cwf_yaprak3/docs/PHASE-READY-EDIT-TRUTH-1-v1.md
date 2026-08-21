# PHASE-READY-EDIT-TRUTH-1 · v1 — LANE: AG-2 — a save that persists nothing is a lie

<!-- 2026-08-08 · S87 · Architect → AG-2. BUG-037 fix, owner-approved this
     session, owner-DISCOVERED with a clean two-path differential.
     Born-evidence (rule_audit, read live by the Architect): two failed
     attempts 12:58:33 and 13:16:13 each logged `update {"diff": {}}` AFTER
     `{"ready": true}` and then published STALE content (v2/v3 of
     superset.routing_hint/energy-synonym-search carry v1's text verbatim);
     the 13:18 attempt WITHOUT ready logged a real diff and published
     correctly (v4). Mechanism to confirm in recon: an edit made after
     Mark-ready is silently dropped — the save reports success while
     persisting nothing.
     DUAL-LANE: AG-1 runs PHASE-PROCEDURE-YIELD-1 (turn pipeline). YOUR
     territory: `src/components/admin/**` (GovernanceTab/kind editors) +
     `api/admin/**` rule draft endpoints + their tests. DO NOT touch
     `api/cwf/_lib/turn/**` or memory files. Second merge carries combined
     reseal + both CHANGELOGs. Branch: phase/ready-edit-truth-1.
     Migrations: ZERO. Operator: ZERO. Governed publishes: ZERO. -->

## §BASE
Fresh worktree; `git rev-parse origin/master` MUST print
`4b828993985ce461cfb5f232865fe4fe75e07c9a`. Absolute paths. Record baseline
suite verbatim. Deviation ⇒ STOP.

## §D-1 · ROOT-CAUSE FIRST (no fix before the byte is named)
Trace the save path for a READIED draft end to end — UI state → updateDraft
call → api/admin endpoint → the row write — and NAME the byte where the
content is dropped (candidates: endpoint ignores payload when `ready_at` is
set; UI sends the pre-edit snapshot; the diff computed against the wrong
base). Reproduce the `{"diff": {}}` audit row in a test BEFORE fixing —
the failing repro is the phase's positive control.

## §G1 · THE RULING (committed single path — least surprise)
**Editing a readied draft is allowed, and saving it PERSISTS the content AND
clears the ready mark**, with a visible toast in both languages:
`t('Değişiklik kaydedildi — yayın işareti kaldırıldı', 'Saved — ready mark
cleared')`. Rationale, embedded: a ready mark is a claim about SPECIFIC
content; the moment the content changes the claim is stale, so the system
un-claims it loudly rather than publishing a ghost. The alternative (freeze
readied drafts read-only) is REJECTED because today's incident shows people
edit-then-look; a disabled textarea invites copy-paste-into-nothing.

## §G2 · HONEST AUDIT + BELT
1. The audit `update` row for a post-ready save records the REAL diff (the
   repro test flips from `{}` to a content diff) and a `readyCleared: true`
   marker in detail.
2. Belt at publish: if the publish path can still receive a draft whose
   ready-snapshot differs from its current content (race), it publishes the
   CURRENT content — never a snapshot — and the test pins it.
3. No silent success anywhere on this path: a save whose row-write reports
   zero changed content while the editor payload differs is an ERROR toast,
   not a green one (the S68-9 class: a net matching success theater).

## §G3 · TESTS (S82-5 through the real seams · D-5)
The repro (ready → edit → save) asserting: content persisted · ready cleared ·
audit diff non-empty · toast text · publish-after publishes the NEW content ·
the direct-publish path (today's working flow) byte-unchanged — a regression
pin so the fix cannot break the path that works. Mutation controls: (a)
restore the drop (save ignores payload when readied) ⇒ repro reds; (b) drop
the ready-clear ⇒ its pin reds. Span declaration: "yeni span: yok".

## §CI · §REPORT · STOP
Five gates; tenant-zero note: audit/fixture strings carry no tenant tokens.
Report `docs/relay/PHASE-READY-EDIT-TRUTH-1-report.md` with the named
root-cause byte (file:line), the before/after audit rows, both mutations,
falsification check (can any path still publish content the editor does not
show?), push, STOP for RULE-25 + GO. Merge `--no-ff --cleanup=strip`.

<!-- END · PHASE-READY-EDIT-TRUTH-1 · v1 -->
