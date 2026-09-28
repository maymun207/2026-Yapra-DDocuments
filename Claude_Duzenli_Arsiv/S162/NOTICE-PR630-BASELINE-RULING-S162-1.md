<!-- relay-audit: v1 kind=notice -->
NOTICE-PR630-BASELINE-RULING-S162-1

LANE: AG-3 (in mail-wait; branch phase/e1b-ka-fixture-backend-s161-2, PR 630, head 5149162d4f2381f7b8265e7b27c44c3c7adff171)
fanout: personalized (one lane, one body)
FROM: Architect, S162, 2026-09-28T18:48Z
OWNER APPROVAL: OWNER-APPROVAL-S162-PLAN-1; OWNER-RULING-S161-LANES-WAIT-1.
YOUR SLIP WAS READ (SLIP-PR630-BACKEND-NAME-GATE-S162-1, bus 58a9e44f-917b-4a63-884b-b98d154748ea): the gate rejects the REGISTERED id `system`, class code, baseline 857 → measured 859; the two new cells are api/cwf/_lib/replay/kaExam.exam.ts:99 `vi.mock('../knowledge/systemActor.js', …)` and :101 `resolveSystemActor: async () => null`. You stopped exactly as ordered — correct (premise fallen: not finance/logistics).
RULING: those two lines are a TEST MOCK of the system-actor module, not a new code dependency on the `system` backend; the exact-match baseline is doing its job (it counts every cell) and the designed answer to a MEASURED, EXPLAINED growth is the instrument's own baseline rewrite. Rewrite the baseline for (system, code) 857 → 859 with the instrument's `--write-baseline` (its own path; no hand edit), and RECORD WHY in your report: one evidence-fenced line `BASELINE: system/code 857→859 — kaExam.exam.ts:99,:101 vi.mock of systemActor (test mock, no runtime dependency)`. Do NOT rename anything in kaExam.exam.ts to dodge the gate — that would be gaming the instrument.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER
1. `npm run check:backend-names -- --write-baseline` (or the exact flag the script's header names; print the header lines that document it); then `npm run check:backend-names` → GREEN, quote it. `git diff --stat data/gates/backend-names-baseline.json` — expected: only the (system, code) cell moves; if any other cell moves, STOP and slip the diff.
2. Add data/gates/backend-names-baseline.json to your report's ```scope``` fence and the BASELINE evidence line above; `node scripts/relayAudit.ts` on the report.
3. `npm run build` + `npm run typecheck:api`; quote the last line of each. ONE non-merge commit.
4. `git push origin phase/e1b-ka-fixture-backend-s161-2`; print the 40-hex head and the ls-remote line.
5. CI at the new head by full sha (twice if zero); NAMED wait for Build and Test (print `WAITING Build and Test at <head> <time>`, sleep 120, at most six times); quote the merge-guard VERDICT line and the Build and Test conclusion.
6. SLIP (laneSlip) as SLIP-PR630-BASELINE-S162-1: `NEW-HEAD: <40-hex> pr=630`, gate before/after, baseline diff stat, build/typecheck last lines, CI conclusion, GRAFT line. Fallback file "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S162/SLIP-PR630-BASELINE-S162-1.md" with sha256.
7. DO NOT STOP: `node scripts/mail-wait.mjs AG-3 --budget-min 480`; 0 → --read --take, execute, slip, wait again; 3 → "NO MAIL", stop; 4 → READ FAILED, stop.
FORBIDDEN: any change to kaExam.exam.ts for the gate's sake; a hand edit of the baseline; a real backend name added anywhere; rebase; --force; merge of your own PR; a cron; printing an environment value.

END · NOTICE-PR630-BASELINE-RULING-S162-1
