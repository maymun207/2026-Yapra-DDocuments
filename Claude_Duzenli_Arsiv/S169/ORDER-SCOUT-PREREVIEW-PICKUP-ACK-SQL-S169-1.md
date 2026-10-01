<!-- relay-audit: v1 kind=order -->
ORDER-SCOUT-PREREVIEW-PICKUP-ACK-SQL-S169-1

LANE: scout-2 (the scout-2 window ONLY; any other window prints "NOT MINE: scout-2 order" and stops). First line of every message: `[scout-2]`.
fanout: personalized (one lane, one body)
FROM: Architect, S169, 2026-10-01T05:27Z
AUTHORITY: OWNER-APPROVAL-S169-PLAN-1 ("onay S169-plan", 08:26 TSİ) · §12.1 NEW subject → scout pre-review before the card goes to its lane.
PRECONDITION: `git ls-remote origin refs/heads/master` prints 6f545ba826349564b9da3ad37317930d05bf7e5c. If not, review at what it prints and say so.
ORDER (measure, change nothing): graft first; read the card below against master's own source; judge every claim and every step hard (line numbers, regexes, gate interactions, tests that would break, anything the card forgets). Reply by scout_reply: `[scout-2]` SCOUT-STATUS-PREREVIEW-PICKUP-ACK-SQL-S169-1 — GREEN, or RED with numbered amendments written to be pasted VERBATIM into v2 (keep them in one section headed exactly `AMENDMENTS (paste VERBATIM):` and end that section with a line `END-AMENDMENTS`). Body ≤ 8000 characters. Then mail-wait --budget-min 110.
IF A COMMAND IS REFUSED: report it with the exact text; do not route around it. NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable; never print the publishable key.

## CARD UNDER REVIEW (verbatim)
<!-- relay-audit: v1 kind=card -->
CARD-PICKUP-ACK-SQL-S169-1-v1

STATUS: v1 for scout pre-review (§12.1, NEW subject); v2 goes to AG-4.
LANE (after pre-review): AG-4 (the AG-4 window ONLY; any other window prints "NOT MINE: AG-4 card" and stops). First line of every message: `[AG-4]`.
fanout: personalized (one lane, one body)
FROM: Architect, S169, 2026-10-01T05:27Z
PRECONDITION: master = your `git ls-remote origin refs/heads/master` (6f545ba826349564b9da3ad37317930d05bf7e5c, PR 670 SCOUT-ACK landed). Architect read at that sha: supabase/migrations/20260929030000_scout_addresses_and_reply_ack.sql:126 `create or replace function public.relay_adversary_gate_check(` — EXEMPT ack (:191–:209) resolves the `ack:` uuid to a scout row or an owner-ruling row; it does NOT look at the row's artifact_name or first line. Lane side (PR 670) already refuses a PICKED-UP row as an EXEMPT ack in scripts/adversaryGate.mjs (AG006).
ON-DISAGREEMENT: if the function is not shaped as described, quote what is and stop.
WHY: register 209 (scout-2, DARK on 668). Every scout pickup now mints a `PICKED-UP-<artifact>` from_lane row. The bus's own gate (the SQL trigger) would accept such a row's id as an EXEMPT ack, so a card could pass the database gate citing a mere pickup instead of a verdict. Plain words: "I picked it up" must never count as "I reviewed it".
AUTHORITY: OWNER-APPROVAL-S169-PLAN-1 ("onay S169-plan"). DB rule (§13.4): the lane AUTHORS the migration file in the repo; only the Gemini operator applies it to the database (`supabase db push`, project fjbrkimwvtpwoxhziidh) after the PR lands — the Architect sends the operator prompt.
NO CRON TASK. GRAFT FIRST (migrations are not indexed: `git grep` them). SECURITY: never print, echo, printenv or cat any environment variable.
UI/UX (§13.3): none — a gate rule; say so in the report.

## WORK
S1. New migration `supabase/migrations/<UTC stamp>_adversary_gate_refuses_pickup_ack.sql` that re-creates `public.relay_adversary_gate_check` BYTE-FOR-BYTE from the latest definition on master EXCEPT: when the EXEMPT ack resolves to a from_lane row whose `artifact_name like 'PICKED-UP-%'` (or whose first line matches the lane-side pickup shape), return `AG006: the seal's acknowledgement is a PICKED-UP row, not a verdict — ack <uuid>`. Grants/revokes re-stated exactly as live. Version key unique (check:migration-versions).
S2. Parity: if a test pins the SQL gate to scripts/adversaryGate.mjs (git grep for the mirror test), extend it so both refuse a pickup ack; otherwise add one test that reads the migration text and asserts the new branch exists and the rest of the function body equals the previous definition (diff-guard).
S3. Report states the operator step that remains (apply after merge) and quotes the exact function diff.
REPORT RULE (merge guard + relay corpus refuse without it): line 1 of the report is `<!-- relay-audit: v1 kind=report -->`; exactly ONE `## FILE-FENCE` section (`FILE-FENCE:` + one `- <path>` per changed file = `git diff --name-only origin/master...HEAD`); `## CLAIMS` and `## DIFF` sections; no 7–39 hex in prose (full 40-hex or none); no run ids in prose. The FIRST commit carries code + report + fence; the fence never grows after it (FENCE-GREW). Run `npx vitest run api/cwf/__tests__/relayAuditGate.test.ts` before the first push.
FENCE: the new migration file · the parity/guard test (name it) · docs/relay/PICKUP-ACK-SQL-S169-1-AG4-report.md.

## STEPS
1. `git ls-remote origin refs/heads/master` (twice). Worktree `phase/pickup-ack-sql-s169-1` at master.
2. S1–S3 + report (with fence); first commit + push + `gh pr create --base master` within 15 min (a migration PR runs the full suite by rule). Print PR number + head 40-hex.
3. Slip SLIP-CARD-PICKUP-ACK-SQL-S169-1 ("ci: UNMEASURED dispatched (not watched)"). Remove worktree. Back to mail-wait --budget-min 110.
BUDGET: whole card ≤ 45 min. A refused command → slip it, never route around it.
FORBIDDEN: applying anything to the database; editing an existing migration file; touching any other function; --force; merging; cron; printing an environment value.

END · CARD-PICKUP-ACK-SQL-S169-1-v1

END · ORDER-SCOUT-PREREVIEW-PICKUP-ACK-SQL-S169-1
