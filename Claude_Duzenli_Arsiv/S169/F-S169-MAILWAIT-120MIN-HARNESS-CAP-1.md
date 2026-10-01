# F-S169-MAILWAIT-120MIN-HARNESS-CAP-1
S169, 2026-10-01T04:14Z. Source: AG-1's own screen, relayed by the owner (07:13 TSİ).
MEASURED (AG-1): `node scripts/mail-wait.mjs AG-1 --budget-min 480` ran as a background command and was STOPPED BY THE HARNESS at the 120-minute background limit (79 polls, 22:50:11Z → 00:49:25Z, all reads OK, 0 rows). 360 of the 480 minutes were never waited. AG-1 then sat with no waiter; the card sent at 04:10:31Z was not taken.
Plain words: every lane window goes deaf two hours after its last card. This is why AG-1, AG-3 and AG-4 each needed an owner boot paste this morning, and why scout-1/scout-2 cards waited hours in S168.
FIX (now, no code): every boot text and every card's last step says `--budget-min 110`, and "whenever mail-wait ends without a card (timeout or harness stop), run it again at once". AG-1 got this as an owner paste (07:13 TSİ). BOOT-LANES-S170 carries it.
FIX (code, next free AG, register row): mail-wait.mjs defaults --budget-min to ≤ 110 and prints a final line telling the window to re-run it; the slip/heartbeat names the restart. Card to be cut after PR-FAST lands (shares no file with it).
WHEN: boot fix today; code card in S169 after 661/CI-SPEED/PR-FAST.
END
