# CWF-S165-FINDINGS-v2
Every finding by name, with its register row. Cut with CWF-S165-SESSION-CLOSE-v1.

- A-REC-S165-1 — the M3 race notice ordered 20× a parallel full `npx vitest run` before AND after a one-line test fix; the lane spent the queue's hour executing it. Mechanical cure: proof budget (row 173).
- A-REC-S165-2 — after PR 648 landed the Architect did not give the idle lanes carry-prep work until the owner said "bence duruyorlar" (row 162 practice breached).
- A-REC-S165-3 — the 16:15Z tick attributed AG-3's silence to the card before reading the bridge/pooler, which showed the Mac offline from ~15:55–16:18Z.
- F-S165-AUTOMERGE-ARMED-CLEAN-NOT-MERGED-1 — PR 648 armed + clean from 14:28Z, not merged; owner hand-merge 14:40Z; cause UNMEASURED (scout-2) (row 169).
- F-S165-MAC-OFFLINE-LANES-DEAD-1 — two network losses; mail-wait exits on READ-FAILED PROXY-REFUSED; every window leaves the loop (row 170).
- F-S165-POOLER-LENS-SHARED-ROLE-1 — supavisor_logs cannot attribute DB work to a window (shared cwf_lane role) (row 171).
- F-S165-SCOUT-LIVENESS-LENS-1 — scouts do not stamp consumed_at in READ mode; liveness is read only from their scout_reply rows (row 159).
- F-S165-SUPERSET-LITERAL-TOOLRESULT-1 — api/cwf/_lib/toolResult.ts:307-320 names Superset in code (§13.1) (row 168).
- F-S165-ENTITYLAYERS-RELOAD-RACE-1 — entityLayersSection.test.tsx:132 asserts an async reload synchronously (row 172).
- F-S165-K41-UNION-KEYWORDARM-EMPTY-1 — with 0/1, basis 'union' and keywordArmAdded [] ; the witness criterion was unmet (row 167).
- F-S165-INBUCKET-CONFIG-DEPRECATION-1 — supabase CLI warns on `[inbucket]` (row 174).
- F-S161-HEREDOC-BASE64-CORRUPTION-1 RECURRED ×2 — base64 transfers to the device corrupted; quoted heredoc + md5 works (row 130).
- OWNER-APPROVAL-S165-PLAN-1 · OWNER-WITNESS-S165-K41-FLIP-1 · OWNER-ACT-S165-PR648-HAND-MERGE-1.
- A-REC-S165-4 — NOTICE-M3-CI-RED-ENTITYLAYERS-RACE-S165-1 and -REASSIGN ordered the fence to grow on an open PR; mergeGuard.mjs 473-474 refuses it (A-REC-S162-2 repeated). Cure: a notice that adds a path to an open PR orders a fresh-branch carry (practice 145) (register row 163).
- F-S165-TEST-ROOT-FROM-CWD-1 — persistenceClassGate.test.ts:46 / snapshotLifecycle.test.ts:37 resolve ROOT from process.cwd() (row 175).
- F-S165-MAC-OFFLINE-LANES-DEAD-1 CORRECTED — AG-1's loop survived the evening outage; the killing condition is UNMEASURED (row 170).
- OWNER-QUESTION-S165-A25-ETA-1 — "A25 ne zaman fully implemented olacak?" (row 176).
(v2 supersedes v1; every v1 line above is kept.)
END · CWF-S165-FINDINGS-v2
