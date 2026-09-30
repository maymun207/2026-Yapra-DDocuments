<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-PREREVIEW-LANE-RESILIENCE-S166-1

LANE: scout-2 (the scout-2 window ONLY; scout-1 prints "NOT MINE: scout-2 order" and stops). Take this AFTER ORDER-SCOUT-LAND-M3-S165-3 is finished — never both at once (practice 159).
fanout: personalized (one lane, one body)
FROM: Architect, S166, 2026-09-30T19:10Z
PRECONDITION: the card text is in "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S166/CARD-LANE-RESILIENCE-S166-1.md" (and in the project box as docs/CARD-LANE-RESILIENCE-S166-1.md); master = your `git ls-remote origin refs/heads/master`.
AUTHORITY: OWNER-APPROVAL-S166-PLAN-1 ("plani onayliyorum", 2026-09-30 21:55 TSİ) · §12.1 (NEW subject → scout first).
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER — adversary pre-review of the CARD against the CODE (read-only)
1. Verify the card's PRECONDITION: quote the three catch blocks of scripts/mail-wait.mjs at master that return EXIT_READ_FAILED on the first failed read (line numbers + text). Name any other exit-4 site the card missed that a network loss would hit.
2. Hunt the traps: (a) can the transient classifier turn a real failure (auth, SQL, digest, card refusal) into an endless retry? (b) does retrying the poll risk taking or stamping a card twice (seen ids, watermark, stampConsumed)? (c) does any caller or test depend on exit 4 arriving at once (grep the callers of the exit codes: hooks, boot files, landScript, archivePush)? (d) is the helper testable without real sleeps as the card claims? (e) is `Bash(gh pr close:*)` safe with guard-bash (does GB-5 or another rule already refuse it)?
3. Verdict: `ADVERSARY-VERDICT: GREEN|RED card=CARD-LANE-RESILIENCE-S166-1` + every required amendment as an exact sentence the Architect can paste.
4. scout_reply (p_from 'scout-2') as SCOUT-STATUS-PREREVIEW-LANE-RESILIENCE-S166-1; same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S166/SCOUT-STATUS-PREREVIEW-LANE-RESILIENCE-S166-1.md". Back to `node scripts/mail-wait.mjs scout-2 --budget-min 480`.
BUDGET: ≤ 15 minutes. A permission you cannot pass → write it in the reply and stop.
FORBIDDEN: no edit, commit, push, merge, dispatch, cron; never print an environment value.

END · ORDER-SCOUT-PREREVIEW-LANE-RESILIENCE-S166-1
