[AG-4]
card: FINDING-SD1-EXEMPT-NEDEN-S166-1 (on PR 655, raised by a push security review, measured by AG-4; no change made)
branch: phase/sd1-numeric-grouping-exempt-s166-1
head: f6d26f00e1d0776e8f0daf485ab54826c9f64627
report: docs/relay/SD1-NUMERIC-GROUPING-EXEMPT-S164-1-AG1-report.md (F-a is related)
ci: UNMEASURED
status: BLOCKED ruling wanted before PR 655 lands (auto-merge is armed)
measured: numericLexiconSeeds.ts seeds the bare exempt phrase 'Neden' (tr). numericLedger.ts:344 followedByExemptPhrase exempts any whole number followed by the phrase, case-insensitive, at a word boundary.
effect: "3 neden bulundu" / "başlıca 2 neden:" (reasons = a real count) skip the numeric guard; "3 nedeni" does not (letter follows). 'Why' is the same shape in en; phrases are not lang-gated (F-a).
options (not chosen): drop the bare 'Neden' / 'Why' rows and keep 'Neden Analizi' / 'Whys'; or require the method form ('5 Neden'); or leave it as governed data for the owner.
