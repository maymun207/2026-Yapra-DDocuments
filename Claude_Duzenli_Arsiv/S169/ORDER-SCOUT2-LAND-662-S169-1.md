<!-- relay-audit: v1 kind=order -->
ORDER-SCOUT2-LAND-662-S169-1

LANE: scout-2 (the scout-2 window ONLY; any other window prints "NOT MINE: scout-2 order" and stops). First line of every message: `[scout-2]`.
fanout: personalized (one lane, one body)
FROM: Architect, S169, 2026-10-01T04:27Z
AUTHORITY: OWNER-APPROVAL-S167-CI-SPEED-1 · OWNER-RULING-S169-NO-CI-WATCH-1.
PRECONDITION: PR 662 (AG-3, phase/ci-speed-s167-1) head = 31f9e124cfcfee9353c1ceadab85fc59d0ab1c85, base master 8d452df354e8ed98c479f6f1cdecfbc61c7ed34b. If it moved, review the new head and say so.
WHAT 662 IS: CARD-CI-SPEED-S167-1-v2 (row 11ee9938-f70c-4bfa-bbc4-567712423fba) = v1 + scout-1's A1–A6 (row 0417a10f-93ed-4df6-8648-b1c1ca16e5ee): vitest.config.ts → test.projects node (api+shared, threads) / dom (src, jsdom), both `extends: true`, environment+include moved into the projects, setupFiles/globals/coverage at root only. AG-3's slip: parity 782 files / 11878 tests, node 617 + dom 165, overlap 0.
ORDER (measure, change nothing):
1. Graft first. Read the diff 8d452df354e8ed98c479f6f1cdecfbc61c7ed34b...31f9e124cfcfee9353c1ceadab85fc59d0ab1c85 (one file at a time if needed). If the harness refuses the read, write the refusal with its exact text to the bus and stop — do not route around it.
2. Check A1–A6 against the diff; the report's grammar header and FILE-FENCE; CLAIMS vs diff; the C4 planted-fault evidence.
3. CI at the full head sha: changes (merge guard), Relay corpus, report-schema, build (24.x). The card's exit is C5: the "Run tests" step of build (24.x) at this head under 480 s (read from the jobs API; quote the seconds). If build (24.x) is still running, post nothing, reply WAITING-CI with your code verdict, and return to mail-wait (do NOT watch the run); the Architect re-sends this order when CI completes.
4. Code GREEN + required CI green + C5 met → post `adversary/scout` success on the head; auto-merge lands it. C5 over 480 s → do not post success; reply with the measured seconds (the card then goes to its C3 step). RED → post failure with the reason.
5. Reply by scout_reply: `[scout-2]` SCOUT-STATUS-LAND-662-S169-1. Then mail-wait --budget-min 110, re-run whenever it ends without a card.
NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable.

END · ORDER-SCOUT2-LAND-662-S169-1
