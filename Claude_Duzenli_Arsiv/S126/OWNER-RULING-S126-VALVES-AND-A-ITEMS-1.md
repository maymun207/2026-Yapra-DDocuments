# OWNER-RULING-S126-VALVES-AND-A-ITEMS-1 — the five-item package ruled in one line

RECORDED 2026-08-29 ~17:2xZ, under S112-YASA-1 (filed by name, the owner's verbatim words).
AMENDED 2026-08-30 ~01:2xZ: §UI-SURFACE RULING added — the owner corrected the EXECUTION
PATH of item 1; the decision itself (valve opens) stands, the mechanism the Architect chose
was wrong and is withdrawn.
AMENDED 2026-08-30 ~01:35Z: §GI-101 WITNESSING added — CLOSED.

## THE PACKAGE PUT TO THE OWNER (after the live falsifier was measured)

Measured ground: production turn trace db0d138d @2026-08-29T16:59Z on the new deploy —
cross-layer widening ran (WIDENED[equipment,factory,line]), three candidates found
(ambiguous=[değirmen10x3], totals=[3]), valve=0 so the rich ask was not rendered,
wouldHaveAsked=1 (first production shadow count). Candidate NAMES unverified from the log
lens (count only); names verify on valve-open or from the Langfuse span.

## THE RULING, the owner verbatim (session channel)

> "1 aç, 2 tut, 3 onay, 4 onay, 5 onay"

## EFFECT

1. **router.askOnUnresolved: OPEN (0 -> 1).** Execution path CORRECTED by the UI-SURFACE
   ruling below: the owner flips it himself on the ADMIN PANEL's governed-rules surface —
   never a lane CLI, never a credentials handoff. DONE — see GI-101 WITNESSING below.
2. **router.nudgeOnTimeUnclear: HOLD at 0** until the first wouldHaveNudged shadow
   evidence is put before the owner.
3. **A1 · Fly vendor call: APPROVED** (measured floor ≈289 MiB, S123-A1-RUNTIME-FLOOR-v1).
   Rides its own card.
4. **A2 · credentials + ARMES rotation: APPROVED.** env-only, never pasted into any
   artifact or chat; the secret material itself moves only through env surfaces.
5. **A5 · spend: APPROVED** (R4 provisional $10/round; BENCH-SMOKE-1 carries no metered
   actuals yet — the first measured round produces them).

## UI-SURFACE RULING (S112-YASA-1, the owner verbatim, 2026-08-30 ~01:2xZ)

> "bu valflaerin DB de elle yazilarak acilip kapanmasi yerine bunlarin CWF de ADmin
> panelde settings uzetinden yapilmasi lazim. Servisler elle DB ye yazilarak ON/OFF
> edilmez ! ON /OFF edilen her servisin bir UI yuzeyi olmasi lazim."
> "Genel olarak bu projede HER ZAMAN DB mirations gemini operator tarafindan bilincli
> olarak yapildi! ... bunlarda well documented kararlar, git oku..."

BINDING EFFECT, measured against the repository before recording:
- Every service ON/OFF has a UI surface, and the UI surface is the ONLY sanctioned flip
  path. Verified present: TweakTab's session levers are deliberately session-only, and its
  "Make it permanent →" button opens the governed-rules editor for the agent.param kind —
  the designed permanent path already exists in the admin panel.
- The DB-write authority split stands as documented: structure -> code (migrations
  authored by AG, APPLIED only by the Operator via supabase db push — ADR-005 v2 Accepted,
  the owner's own document, read from docs/adr/ this session); data -> the gated admin UI;
  secrets -> env.
- WITHDRAWN by this ruling: the Architect's credentials-handoff plan (SUPABASE keys into
  the worker window's environment) and the lane-CLI publish path for valves. The lane's
  LACK of governance-DB credentials is BY DESIGN, not a gap to fill.
- A-REC-S126-ARCHITECT-BYPASSED-DESIGNED-SURFACE-1: the Architect proposed routing a
  governed data flip through a lane CLI + credentials handoff instead of the designed
  admin-UI surface, and did not read the documented decisions first; the OWNER caught it.
  Ledger item; the finding F-S126-LANE-NO-GOVERNANCE-CREDENTIAL-1 is reframed accordingly
  (not a credential gap — a correct absence).

## GI-101 WITNESSING — CLOSED (2026-08-30 ~01:30Z), three lenses agreeing

1. GOVERNED PUBLISH, measured in the DB: router.askOnUnresolved v2 PUBLISHED value=1 at
   01:29:14Z, v1 archived atomically in the same instant; the admin API's own Gate line in
   the runtime logs: action=publish kind=agent.param key=router.askOnUnresolved
   verdict=published — the owner's hand, through the gate, with the audit trail.
2. PRODUCTION BEHAVIOR, measured in the runtime log of the very next falsifier turn
   (@2026-08-30T01:29:59Z): [Ask] decision=ask-ambiguous ambiguous=1 totals=[3] valve=1
   wouldHaveAsked=0 — the seam flipped exactly as designed (rendered ask, shadow counter
   correctly zero because the ask was real).
3. THE OWNER'S SCREEN, witnessed: "değirmen10 durumu nedir?" now renders the rich ask with
   THREE candidates BY NAME — "GR & SFX Masse Hazırlık Fabrikası · Sır Hazırlık - Çan ·
   Yer Karosu Masse Hazırlık Fabrikası" — consistent with the expected three plants
   (Sir · Masse · Masse_YK) in their full names.

NEW FINDING from the witnessing, ledger item, cosmetic but real:
F-S126-ASK-RENDERS-BILINGUAL-DUPLICATE-LIST-1 — the rendered ask prints the candidate list
TWICE (Turkish block, then the English restatement with the same list), the two blocks run
together mid-line. One ask, one list, one language pair handled cleanly is the cure.

TAIL ANCHOR: OWNER-RULING-S126-VALVES-AND-A-ITEMS-1 ends here.
