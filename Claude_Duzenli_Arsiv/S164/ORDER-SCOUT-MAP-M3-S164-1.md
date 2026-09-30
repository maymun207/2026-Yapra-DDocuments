<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-MAP-M3-S164-1

LANE: scout-2
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-30T04:18Z
AUTHORITY: OWNER-RULING-S164-A26-V12-1 ("onay A26 v1_2") · OWNER-RULING-S164-FEEDBACK-EVIDENCE-1 ("onay feedback-evidence": feedback MAY be written as evidence human{label, reason} into trace_label ONLY through an ADMIN path outside api/cwf/_lib/turn/** and prompt/**; the turn reads only the RESULT; the three bans — never a prompt input, never a viz source, never a knowledge source — stay; the pin test is UPDATED in the same card, naming the ruling). Doc: A26_cwf-memory-and-learning-architecture-v1_2 §9 row M3, §4.2, §5, Δ-FB, Codex completion "feedback write contract". Base: master 41450c98f75c18d0fe0e4c59bb1e8c8b73d384b1 or later (print it).
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable. Read-only. Long verdict → doc repo S164/ + bus slip with sha256 (register 109).
PURPOSE: the Architect cuts CARD-M3 from THIS map (§12.5, §12.6). M2 is still in flight (AG-3, fresh branch after NOTICE-M2-CARRY-FILTER-RULING-S164-2): read M2's content from AG-3's prep branch phase/m2-honest-grading-s164-1-prep where M3 depends on it, and say so.

## STEPS
1. Where feedback lives today: the feedback table(s) and their writer(s) (file:line, migration name), the UI that collects it, `markReviewed` (what it writes, who may call it), feedbackPipelineIsolation.test.ts:5-10 (quote the pin).
2. trace_label: does ANY table or type by that name exist on master? If not, what is the smallest durable home for human{label, reason} per A26 v1_2 §4.4 / A26-P1 (episodes.decision.outcome field vs a new append-only table) — name the migration shape, the persistence family (evidence.append_only, Δ-K4 — NEVER learned.*), and the snapshot/envelope consequence.
3. The offerability cut: where M2 stamps `offerable` (prep memoryDistill.ts) and how a LATER human label can turn a row not-offerable (and back) WITHOUT the turn reading feedback: name the one write the admin path makes and the one field recall already reads.
4. The admin write path: which existing admin API route family (outside turn/** and prompt/**) is the natural home; the permission/role it must check (RBAC admin scope; Codex: "new reason/label writes need permissions"); the audit row it writes.
5. Review queue UI: the existing admin tab closest to it (MemoryTab? a feedback tab?), file:line, and what the queue must show (row, turn link, current outcome class, offerable, human label, reason code list — governed data, not inline strings §13.1/(h)).
6. CALLER-ABSENT (§12.6): is there already a built-but-uncalled review queue, label writer or reason-code list? Name it.
7. Tests the card must pin: the updated isolation pin (turn/** and prompt/** still never import the feedback store), label write → offerable flip visible to recall, turn never reads feedback, permission refusal, synthetic/task turns refused (Δ-SYN).
8. Status row SCOUT-STATUS-MAP-M3-S164-1: numbered sections 1–7, each with file:line; UNMEASURED where unread; a proposed FILE-FENCE for the card.

END · ORDER-SCOUT-MAP-M3-S164-1
