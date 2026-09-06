# OWNER-RULING-S130-SEVEN-DISAGREEMENTS-AND-HOLD-1

Recorded under S112-YASA-1: the owner is a DESIGN SOURCE and these are his rulings, by name, in his words (2026-09-04, ~08:20 TSİ). The Architect proposed five items; the owner ruled on all five. Where the ruling differs from the Architect's proposal, the difference is recorded, not smoothed.

## RULING 1 — #6 reply_authority drift. MIGRATION AUTHORITY IS GEMINI, FULL STOP.
Owner, verbatim: "CWF migrationlarını DB'ye yazan tek bir authority var, o da GEMINI'dir, NOKTA. Burada konuşacak bir şey yok, karar açık ve KESİN." This is the standing ADR-005 rule restated with force: an AG lane may AUTHOR the migration file under `supabase/migrations/`; ONLY the Operator (Gemini + Supabase MCP, `supabase db push`, never `apply_migration`) applies it. The Architect's proposal was the same; the owner's surprise is that it was asked at all. Recorded so it is never asked again.
DISPOSITION: one migration reconciling `relay_inbox_reply_authority` to `operator + scout` (matching live and the landed lane_addr precedent). AG authors; Operator applies.

## RULING 2 — #1/#3 scout claimability. SCOUT TAKES NO ADDRESS.
Owner: "Scout adres almadan devam eder." The code (`laneRoster.mjs`: scout has a box, is never claimable) is RIGHT; the matrix expectation (scout claimable) is WRONG.
DISPOSITION: correct the authority matrix expectation; make laneRoster and the DB constraint read one source. No behavioural change.

## RULING 3 — #2/#4/#5/#7 foreman identity. FOREMAN ADDRESS IS FIXED: AG-5. NO UB- SHAPE. NO REDESIGN.
Owner: "Foreman adresi fixed ve AG-5, burada konuşulacak bir şey yok, bu karar gene çok öncesinde verilmişti, NOKTA."
CONSEQUENCE, stated plainly because the Architect proposed otherwise: the matrix's expectations that (a) the foreman role has its own `^UB-` address shape, (b) role binding must not be a code literal, (c) the boot prose must not bind role to ordinal — are all WRONG BY RULING. The `AG-5` literal in `factoryState.mjs` and `foreman.md` is the design, not a defect. #5 (bus admits operator/scout as report authors while `factory_assert_nonce` refuses them) is likewise by design: operator and scout author reports WITHOUT holding an address or a nonce.
ADF-ARCHITECTURE-v2's H2 question (deterministic set vs vector retrieval as the binding-law source) is MOOT under this ruling: there is no role→shape binding to source. The Architect withdraws the v2_1 proposal. ADF-ARCHITECTURE-v2 itself is NOT ratified and NOT landed; whatever survives of it is a later owner decision, not this session's.
DISPOSITION: correct the four matrix expectations to the ruled design. Code untouched.

## RULING 4 — the P7D freshness bound. REMOVE IT ENTIRELY.
Owner: "Raf ömrü anlamsız. Bu kuralı ben hatırlamıyorum, bir noktada sen bunu vermişsin, bu anlamsız kuralı tamamen kaldır, NOKTA."
ATTRIBUTION, honestly: the freshness bound on the authority snapshot was Architect-introduced, not owner-ruled. It produced a repo-wide landing block every seven days on the calendar, regardless of the diff (born-barking class). It is recorded as an Architect design defect: A-REC-S130-1 — THE ARCHITECT INTRODUCED A CALENDAR-TRIGGERED REPO-WIDE GATE WITHOUT OWNER RULING, and it cost the factory two days of landings.
DISPOSITION: remove `freshnessBound`, the `measuredAt`-age verdict, and the three `authorityMatrix` freshness assertions. The snapshot keeps its `measuredAt` stamp as provenance (a date is a fact; an expiry is a rule).

## RULING 5 — HOLD-S129-LANDING-488 IS LIFTED.
Owner: "Hold'u kaldır, işimize bakalım." And: "her şey yanlış olsa, bu süre içinde tüm kodu sıfırdan yazardık; neyi bekledik, faydası ne oldu?" Recorded verbatim as owner design input: the wait had no measurable benefit and cost the time in which the relevant CWF part could have been rewritten from scratch.
DISPOSITION: the HOLD row is released by a bus row in the foreman box in this turn. PR 488 lands under `CARD-LANDING-TOOL-VISIBILITY-B-1-v3` as soon as the trunk-sync's heavy build reads green (or, under RULING 4, as soon as the freshness assertions are gone — whichever the Architect can prove first).

## THE OWNER'S STANDING OBJECTION — RECORDED, NOT ANSWERED HERE
Owner: "Artık kurallar ayağımıza dolanmakta ve ilerlememizi ciddi şekilde blockladı, ilerleyemiyoruz. Bunu ayrıca masaya yatıracağız, şimdi şu merge'leri bitirelim." A governance review is OWED: which rules produced measurable protection this fortnight (the landing gate's AUTHOR-UNKNOWN refusal; the scout catching a body-destroying amend) and which produced only delay (the calendar gate; three card versions for one hex cell). It is the owner's table, scheduled after the merges. F-S130-RULE-COST-REVIEW-OWED-1.

## SEQUENCE UNDER THESE RULINGS
1. Trunk-sync report (AG-4) → heavy build read.
2. `CARD-LANDING-TOOL-VISIBILITY-B-1-v3` → foreman lands PR 488 (HOLD lifted).
3. `CARD-AUTHORITY-MATRIX-RULED-1` (AG-4): matrix expectations corrected to RULINGS 2–3; freshness removed per RULING 4; reply_authority reconciling migration FILE authored in the same branch.
4. Operator prompt (Gemini): `supabase db push` for that migration, project `fjbrkimwvtpwoxhziidh`. Owner opens the Operator window — that is RELAY, the owner's surface.
5. Landing of 3 by the foreman. Then the seven read zero on the next snapshot — and zero is the PASSING state only because the expectations were corrected, which is exactly what FALSIFIER 1 will now have to be re-pointed at.

TAIL ANCHOR: OWNER-RULING-S130-SEVEN-DISAGREEMENTS-AND-HOLD-1 ends here.
