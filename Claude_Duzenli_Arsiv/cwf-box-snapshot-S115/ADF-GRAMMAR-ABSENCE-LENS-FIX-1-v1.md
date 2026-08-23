<!-- relay-audit: v1 kind=card prov=1 -->
# ADF-GRAMMAR-ABSENCE-LENS-FIX-1-v1
R-ABSENCE-LENS reads "non-zero" as an absence claim; rule 13 names the report path
fanout: personalized - one address, AG-3.

## PREMISE - MEASURED @2026-08-23T05:10:00Z, Architect fresh clone at the floor in evidence:floor
- MEASURED: scripts/relayAudit.ts:539 ABSENCE_CLAIM_RE fires on "non-zero exit" via \bzero\b; AG-5's Kademe 2 report went red on that phrase and was rewritten to pass (F-S114-GRAMMAR-NONZERO-FALSE-POSITIVE-1)
- MEASURED: the grammar has no rule deriving the report path from the card name; ADF-KADEME-3-POLL-AND-DONE-1 order B computes done from that path, so the path must be lawful, not conventional
- MEASURED: scripts/cardPreflight.ts CP-1 delegates to auditText; a new rule in relayAudit.ts reaches preflight without a second copy
- UNMEASURED: how many landed docs/relay/*.md would go red under the new rule 13; you count before you arm it
SELF-INVALIDATION: decays on the first push to master after the floor, and on any harness upgrade the owner reports.

## FALSIFIER
"non-zero", "nonzero" or "not zero" still matching the absence shape falsifies A; a card name from which the auditor cannot compute one report path falsifies B; an existing green report turned red by B without being named in your count falsifies C.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the floor is the commit in evidence:floor | MEASURED: git ls-remote origin refs/heads/master | floor |
| the false positive is in one regex | MEASURED: relayAudit.ts:539 on origin/master is the only absence-shape pattern; line 641 is its only caller | inline |

```evidence:floor
$ git ls-remote origin refs/heads/master
7c099fc6a6e6534dbabc4d9d0e4e89d84ac78c62	refs/heads/master
```

## STANDING ORDERS
- consumed_at is RETIRED. You do not merge. Subjects carry exactly one AG-3 token before the first colon. package.json is closed to this wave.

## ORDERS
```scope
- A · ABSENCE_CLAIM_RE excludes "non-zero", "nonzero" and "not zero" (negated forms are presence claims); one red test per form, one control that a true "zero rows" claim still needs two lenses.
- B · Rule 13 R-REPORT-PATH: a kind=card body's DELIVERY must name exactly docs/relay/<card name minus -vN>-<LANE>-report.md where LANE is the fanout address; any other path is a violation. Emitted into docs/ground by the existing --emit path.
- C · Before arming B, run auditText over every docs/relay/*.md and every card body in relay_inbox since 2026-08-21; list the names that would go red in the report. Arm only if that list is the Architect's to judge - print it, do not fix them.
```

## SHARED SURFACES
scripts/relayAudit.ts + tests ..... AG-3 sole owner
docs/ground/CARD-PREFLIGHT-v1.md ... AG-3 via --emit only
package.json ...................... CLOSED - nobody this wave

## DECISION RIGHTS
negation list ........ AG-3 may widen, never narrow
rule number .......... fixed: 13
arming of B .......... the Architect's, after your count

## DELIVERY
- Branch phase/adf-grammar-absence-lens-fix-1 from the measured floor; push early.
- Report docs/relay/ADF-GRAMMAR-ABSENCE-LENS-FIX-1-AG3-report.md plus JSON twin; the red-list from order C verbatim.
- Open the pull request against master; do not merge it.
- Report opens with read relay_inbox at <ISO> - read OK - N rows since ADF-GRAMMAR-ABSENCE-LENS-FIX-1-v1; closes with git status --porcelain -uall and git worktree list.
