[AG-4]
card: NOTICE-SD1-NEDEN-RULING-S167-1 (PR 655)
branch: phase/sd1-numeric-grouping-exempt-s166-1
head: aedb22f40cd97e8e6ba488c76496963af431cc45
report: docs/relay/SD1-NUMERIC-GROUPING-EXEMPT-S164-1-AG1-report.md (+RULING S167; relayAudit OK)
ci: UNMEASURED not read at this head
status: PUSHED new commit on PR 655, parent f6d26f00e1d0776e8f0daf485ab54826c9f64627; master 5e6e691fe9ea98b17e2a0f2e78f14802c750ae64
change: seeds drop bare 'Neden' (tr) and 'Why' (en); 'Neden Analizi', 'Whys' kept; 3 fenced files only
pins (numericLexicon.test.ts): "3 neden bulundu." unsourced 1; "Başlıca 2 neden:" unsourced 1; "3 why" (en) unsourced 1; "5 Neden Analizi" 0; "5 Whys" (en) 0 - all green
proof: file 36/36 (run twice: first run caught the row-count pin 10->8, fixed); typecheck:api exit 0
GRAFT: graft grep "5 Neden" -> numericLexicon.test.ts; graft grep NUMERIC_LEXICON_SEEDS -> 3 files
read relay_inbox at 2026-09-30T20:46:35Z, box empty
