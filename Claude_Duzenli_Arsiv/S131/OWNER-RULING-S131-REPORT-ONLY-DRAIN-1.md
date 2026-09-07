# OWNER-RULING-S131-REPORT-ONLY-DRAIN-1 — #496 and #497 ratified; while the canary is frozen, report-only PRs land under the foreman's own authority without a per-push owner approval

Owner's word in the Architect chat, 2026-09-06T04:3xZ (07:3x TSİ): "onaylıyorum" — given against the Architect's proposed text, which is therefore the ruling's text:

> #496 ve #497 ratifiye; canary donuk kaldığı sürece yalnız docs/relay/ altına dokunan, yazarı ≠ indireni olan PR'lar foreman'ın kendi yetkisiyle onaysız iner; başka yola dokunan her PR §5'te kalır; canary çözüldüğü an bu hüküm düşer.

## OPERATIVE TERMS (English, for the lanes)

1. PR #496 (`phase/trunk-ci-verdicts-s130-1` → master `2b71f3df50429a3a8648dfe9ff9d052cad4ea2a9`) and PR #497 (`phase/nightly-verdicts-s131-1` → master `a6881c46216ac4f2ca862735948e09c4417a113e`), landed by the foreman on its own poll on 2026-09-06 without a card or a named approval, are RATIFIED after the fact. F-S131-FOREMAN-DRAIN-LANDED-WITHOUT-NAMED-APPROVAL-1: CLOSED@ruling.
2. WHILE `eval-canary` is frozen (`if: false` in `build-test.yml`), a pull request whose changed paths ALL start with `docs/relay/` (the `REPORT_ONLY_PREFIX` in `scripts/land.ts`) lands under the foreman's own merge authority (OWNER-RULING-S122-E1-E2 + E1-AMENDMENT-1) with NO per-push owner approval and NO Architect landing card. The landing block on master and the foreman's report row are the record. The ⑤ semantic test is untouched: the lander reads CI at the forty hex itself, and the AUTHOR-SUBJECT classification decides SELF-LAND / AUTHOR-UNKNOWN exactly as land.ts does today.
3. Any PR touching a path outside `docs/relay/` keeps §5 in full: a NAMED owner approval bound to the forty hex (or to an artefact shape), and an Architect landing card.
4. This ruling EXPIRES the moment the canary thaws; the thaw ruling must state what replaces it. It narrows §5's per-push cost rule to the case where the cost is zero; it widens nobody's authority.

## WHAT IT DOES NOT COVER

- The foreman's OWN observation reports (e.g. PR #495) — ⑤ keeps them out of self-landing; they go to the owner's table.
- Report branches whose report predates grammar v1 and carries no header — those cannot land green and are a separate owner decision (see S131-DISPATCH-RECORD-5).

TAIL ANCHOR: OWNER-RULING-S131-REPORT-ONLY-DRAIN-1 ends here.
