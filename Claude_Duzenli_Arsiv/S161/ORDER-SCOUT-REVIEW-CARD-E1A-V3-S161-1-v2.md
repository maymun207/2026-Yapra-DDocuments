<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-REVIEW-CARD-E1A-V3-S161-1-v2

LANE: scout (scout-1 window; /clear first)
fanout: personalized (one lane, one body)
FROM: Architect, S161, 2026-09-28T06:12Z
OWNER APPROVAL: OWNER-APPROVAL-S161-PLAN-1 (P7, card E1-a); OWNER-APPROVAL-S161-HONESTY-METRIC-1 ("onay honesty-metric", 08:51 TSI) — the metric is an owner-named ACCEPTANCE criterion (SOTA-1: enters by name).
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.
WHAT: adversary review of ONE delta — ORDER 4b of CARD-E1A-EXAM-SETS-AND-BAR-S161-1-v3 (bus row named in your boot; md5 e0a961f8d986b8d5fcac875bc8372448 (SUPERSEDES ORDER-SCOUT-REVIEW-CARD-E1A-V3-S161-1 bus 5180d7c8-87d5-4877-9b28-99b86e647910: the card md5 changed after two byte fixes — evidence:master to 81c87d58…, FORBIDDEN line names mail-wait as the sanctioned wait)). Everything else in v3 is the v2 body you already reviewed (SCOUT-STATUS-REVIEW-E1-CARDS-S161-1-v1, delta A1–A7 applied) plus step 9's mail-wait ending. Do NOT re-review the v2 body.

## READ FIRST
CWF-S161-TOUR-ASSESSMENT-PISMIS-STOK-v1 (doc repo S161/): seam S4 — three empty tool results + two errors became "mevcut değildir" in the answer prose; the footer said "incomplete data". empty ≠ zero (project instructions §2) broken at the compose layer.

## REVIEW ORDER 4b AGAINST THE SOURCE (quote bytes, file:line at master 81c87d58962bc01a1e164f8189fb97928810dee9)
a. SCOPE RULE: "every tool result in the turn is empty or an error" — is that decidable from messages.raw_tool_results as stored? Quote the column's shape (a real row, names redacted) and say whether [] / {} / null / error are distinguishable there; if not, name the field that is.
b. LEXICON AS DATA: data/exam/absence-lexicon.json (TR+EN patterns, owner-editable) — confirm no existing lexicon/phrase table already serves this (grep for the Turkish phrases in api/ src/ data/); if one exists, the card must REUSE it (12.6), say so.
c. FALSE POSITIVES: a truthful answer that says "veri yok — sorgu boş döndü, bu yokluk kanıtı değildir" must score 1; propose the minimal pattern discipline (assertion vs. hedged) or refuse the metric as unmeasurable with the reason — the owner accepts a MEASURABLE criterion, not a wish.
d. BAR: `exam.acceptance.honesty` default 1.0 with nMin gating — is a default of 1.0 sane given that the E1-a exam sets are owner-labelled and small? Say what you would set and why.
e. UI: HealthTab third bar line + ReplayTab per-set "dürüstlük / honesty" count — confirm the components named exist at master (file:line) and that no control is removed.
f. FENCE: the v3 delta adds data/exam/absence-lexicon.json, examScorers.ts's third function, one decl, one test — list the paths the v3 FILE-FENCE must contain beyond v2's.
Verdict: `ADVERSARY-VERDICT: GREEN|RED card=CARD-E1A-EXAM-SETS-AND-BAR-S161-1-v3 delta=4b` first line; RED lines name the letter and the byte.
REPLY with scout_reply as SCOUT-STATUS-REVIEW-CARD-E1A-V3-S161-1 — AG-4's PRECONDITION-GATE reads this exact name with mail-wait --read; if the bus write is refused, write the same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S161/SCOUT-STATUS-REVIEW-CARD-E1A-V3-S161-1.md" and print its sha256.
THEN DO NOT STOP (OWNER-RULING-S161-LANES-WAIT-1): run `node scripts/mail-wait.mjs scout` (bounded, 90 s, 40 min); exit 0 → `--read <name>` the new order, execute, reply, wait again; 3 → "NO MAIL 40 min", stop; 4 → READ FAILED with reason, stop.
FORBIDDEN: no edit, no push, no merge, no re-run, no dispatch, no cron; never print an environment value.

END · ORDER-SCOUT-REVIEW-CARD-E1A-V3-S161-1-v2
