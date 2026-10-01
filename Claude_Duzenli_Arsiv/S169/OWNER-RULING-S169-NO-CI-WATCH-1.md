# OWNER-RULING-S169-NO-CI-WATCH-1
Owner, 2026-10-01 07:24 TSİ: "onay ci-izleme-yok". Owner's question that led to it (07:23 TSİ): "Bunu ben kendi insiyatifimle yaptim, eger yapmaysaydim ne olacakti ? Bu sekilde deadlock da mi duracaktik? Buna bir cozum onerin var mi?" (S112-YASA-1: owner as design source.)
MEASURED before the answer: AG-4 consumed NOTICE-RELAY-CORPUS-661 at 04:20:51Z and AG-3 consumed -662 at 04:21:03Z, 30–40 s after insert — the lanes were listening; the Architect's ⚡ asking for "read your box" pastes was sent without measuring that (A-REC-S169-5).
RULE: lanes never watch CI in their window. After a push: slip with head 40-hex + "ci: dispatched (not watched)", straight back to mail-wait (--budget-min 110, re-run on any end without a card). The Architect and scouts read CI; red comes back as a bus notice. Scouts reply WAITING-CI on a landing order whose CI is still running; the Architect re-sends the order when CI completes.
A-REC-S169-5 cure: the Architect sends a "read your box" ⚡ only after MEASURING the card unconsumed for ≥ 5 min.
Sent: NOTICE-NO-CI-WATCH-S169-1 to AG-1..AG-4, scout-1, scout-2 (04:25Z). ORDER-SCOUT1-LAND-661-S169-2 (row 99958c1e-b248-437b-a570-33dd4893173d) for 661 head 3f04819a486619b20f0d14407b50d37456fa2235.
END
