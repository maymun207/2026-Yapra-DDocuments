REVIEW-VERDICT: RED ruling=NOTICE-M2-F7-RULING-S164-1 (body_md5 4fdd690ed8cbd8dd2466ae9be315cfbf) — to the Architect, not AG-3
BASE: master 1b2553c960317ab0cc0718e51dda8b7bc92bc112; prep head 9b6715b07f71ab20542d4aa78fe8e07b6bafb23d (refs/heads/phase/m2-honest-grading-s164-1-prep; merge-base = master; M1 stacked under it). AG-3 report read at the prep head. Order id 10786d81-4271-4702-bdca-70c93fbae4f1.
WHY RED: Q1–Q3 hold, and askTurnUngraded is safe. But the ruling fixes only the ASK row, and M2 opens a second carry break in the opposite direction (Δ4): the carrier now reaches BACK past a completed but non-offerable reply to an older ask. The ruling's reason for rejecting (c) is itself untested (Q4).

Q1 · AVAILABLE, no new plumbing, but the stamp is ORDERED BEFORE the ask. prep memoryDistill.ts:532-535 stamps `offerable` inside distillEpisode; the same function reads `const shown = ctx.askShown?.[0]` at :548 and writes `decision.ask` from it at :555 (`...(shown ? { ask: … } : {})`).
Δ1: hoist `shown` above :532 and define askTurnUngraded on `shown !== undefined`, the exact condition that writes decision.ask, so the stamp and the field cannot disagree. Do not re-read decision (it is built after the stamp).

Q2 · NO reader gains a row pre-M2 hid. The filter has two readers only: prep EpisodesRepository.ts:593 (listRecentByConversation) and :618 (listRecentByUser); the admin list does not use it. askTurnUngraded requires `class !== 'failed'`, so every row it admits was admitted by the pre-M2 literal (class null ∨ ≠ failed). Consequence to state in the report: ask turns return to warm-trust recall and to the LIMIT-k carrier (memoryRetrieve.ts:407), exactly as pre-M2.

Q3 · NO shape with groundingOk ≠ null exists; the conjunct is DEAD for ask turns.
- ctx.askShown is written at exactly two sites, stageClarify.ts:2433 and :2451, and both `return { kind: 'ask', … }` on the next line (:2434, :2452). So a shown ask ⇒ a clarification outcome ⇒ runTurn.ts:276-277 `runClarificationTurn`, never :279 `runStreamStage`.
- The only groundingSummary writer is stageStream.ts:661, inside runStreamStage (:192-1156). Cite drift: the ruling says :649.
- So `groundingOk === null` is always true when decision.ask exists, and askTurnUngraded ≡ `ask shown ∧ class ≠ failed`.
The carry still breaks under null grounding for ONE ask shape: D1's new failed cell. Discovery returns ≥1 empty + ≥1 failed + 0 data, so `emptyOnlyWithFailures` makes the class `failed`, the turn is not offerable, and the carry breaks. Pre-M2 that turn was `unproven` and carried.
F7b does not cover it: its fixture is one failed discovery with 0 successes, which is failed pre-M2 too once M1 has landed.
Δ3: add F7e = (ask shown, discovery {1 empty, 1 failed, 0 data}) and RULE it. Either accept the break (the ask stays unanswerable by option), or exempt ask turns from D1's disjunct, because an ask turn's product is the question and D1's rationale ("no data behind its answer") does not apply to a question.

Q4 · UNMEASURED. No test pins "the carrier skips a failed reply turn". The only carry suite, carryLastResolution.test.ts, mocks ONE prior episode in every case (a, b, c, c′, c″, d…, g…, F7 at :630). `git grep` for readCarriedResolution / carried.read / askOption over api/**/__tests__ finds that file alone. The (c) rejection rests on an untested behaviour.
Δ4 — the converse break, which the ruling does not address. readCarriedResolution (stageClarify.ts:677-710) takes the LIMIT-1 row through OFFERABLE_OUTCOME_FILTER and carries BOTH its ask options and its canonical entities as peers (:697-709). The consumer (:2798-2820) has NO adjacency check that the row is the previous turn.
Under M2, a non-failed but non-offerable ANSWER turn is now invisible. Shape: A = ask {X, Y}; B = reply "X", tools {1 answered, 1 failed}, groundingOk true ⇒ `unproven`, toolFailures 1 ⇒ outcomeHonest false ⇒ offerable false; C = next message. The carrier skips B and reads A. C is scoped by A's stale peers, and a C that equals "Y" re-answers A's old question.
Pre-M2, C read B (visible, no ask), so it carried B's peers and no option.
The carrier and recall answer two different questions: "what was the latest non-failed turn" versus "what is honest to recall". One filter for both is the root. Remedy for the Architect to rule: (i) the carrier keeps the pre-M2 class-only literal as a NAMED carry filter. This is shape (a), which the ruling rejected, and Δ4 is the measured reason to revisit it: it restores pre-M2 parity in BOTH directions and makes askTurnUngraded unnecessary. Or (ii) keep one filter, and the carrier refuses a row whose turnId is not the conversation's latest non-failed episode (one more bounded read).
Test F7f = the A/B/C shape above: C must NOT carry A's option or peers.

read relay_inbox at 2026-09-30T03:57:34Z (mail-wait exit 0) + --read of order 10786d81 and notice a97a6299 (read-only).
