CWF-S143-G6-LANGUAGE-MEASURED-v2

SUPERSEDES v1 (S37-1: v1 is immutable). v1 WAS WRONG and was acted on: the owner approved a card on it.
S143 · 2026-09-19T20:35Z · master 7572c3bbfeed23656fcf8a55f6e64d93ed240c14 · Architect, READ-ONLY.

## THE ERROR IN v1, NAMED
v1 said no published prompt.segment carries a reply-language instruction. That was read from a query that
TRUNCATED each payload to 400 characters. The published `tone` row (version 1, updated 2026-07-10) carries, at its
fifth line, "Kullanıcı hangi dilde yazarsa o dilde yanıt ver." — beyond the cut. A truncated view was read as an
absence: partial ≠ complete, committed by the Architect. The owner's approval of the v1 repair ("onay", 23:23 TSİ)
is therefore WITHDRAWN by the Architect; no card was cut.

## MEASURED NOW
- Published `tone` payload.text md5 64b434797141202895185d10f897bad7, 995 characters — byte-identical to the
  code floor in api/cwf/_lib/prompt/core/promptFloor.ts (same md5, computed from the file). READ: full payload.
- The rule exists in both layers since 2026-07-10 (commit 17cb75e7 introduced the floor).

## WHAT THEREFORE REMAINS OF G6
The owed item "answers Turkish to English tasks" (BENCH-A2A-1, 2026-08-14) is REAL as a reported observation,
but its cause is NOT a missing rule. Candidates, all UNMEASURED: one Turkish line inside an all-Turkish,
Kale-only system prompt is outweighed by the prompt's language and identity; or the observation predates a change.
The measurement that settles it is ONE English A2A task and its reply language (G4). G6 is MERGED-INTO G10: an
English benchmark persona/scope for the A2A arm removes the Turkish-dominant, Kale-only frame the reply is
generated inside, and G4 then measures whether English tasks come back in English.

END · CWF-S143-G6-LANGUAGE-MEASURED-v2
