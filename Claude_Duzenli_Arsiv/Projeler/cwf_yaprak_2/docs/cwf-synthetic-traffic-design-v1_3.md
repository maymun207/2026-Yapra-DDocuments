cwf-synthetic-traffic-design-v1_3.md


# CWF — Synthetic Traffic subsystem · design note v1_3
**cwf-synthetic-traffic-design-v1_3 · rev 1.3 · 2026-07-21 · Architect: Claude**
Amends v1_2 (immutable, S37-1). One owner addition folded in: a THIRD question
class — registered-but-inactive factories — which turns synthetic traffic into a
LIVE empty≠zero / ADR-001 test. v1_2's §5a (four factories), §5 (Class A/B), and
all of v1 (mechanism, two-mode cost, architecture, traps) stand. This version
adds §5b (Class C) + §5c (the factory-list bootstrap that sources real names).
 
## §5b · CLASS C — REGISTERED-BUT-INACTIVE FACTORIES (empty≠zero live test)
Tree/log-verified fact: `getFactoryList` returns **17 factories** (confirmed
across multiple past turns — "17 fabrika, KB7 dahil"), but ARMES sends live data
for only **4** (KB7 · Granit · Sır Hazırlık-Çan · GR&SFX Masse). So **~13
factories are REGISTERED in ARMES but send no data.** Asking about those is the
purest live test of the system's core contract:
- **empty≠zero (sacred):** the honest answer is "bu fabrika için ARMES'te veri
  yok / not visible in ARMES" — NEVER a fabricated "sıfır" and NEVER borrowing
  another factory's numbers (the ADR-001 wrong-scope-oversharing failure that a
  capable model once did — surfacing Granit values under a KB7 question).
- **What Class C measures:** does the system (a) route the frame correctly
  (factory=<inactive>), (b) call the tool, (c) get an empty/absent result, and
  (d) SAY SO honestly rather than fabricate or borrow scope? This is exactly the
  behavior the whole trust line (ADR-001, grounding, scope-authority lens) exists
  to guarantee — Class C exercises it under real load.
- **Frame value:** these turns still produce IR-1 frames (factory=<inactive> is a
  valid frame), so they also feed §8 — and they specifically stress the
  derivation fall-through / ALT-C honesty path.
## §5c · FACTORY-LIST BOOTSTRAP (source the real inactive names — no fabrication)
I will NOT invent the ~13 inactive factory names (organic `getFactoryList` calls
are absent in the last 18h, so I can't read them live right now, and inventing
names would poison the set). Two honest sourcing paths — the phase does ONE:
1. **Self-sourcing (preferred, PLATINUM):** the SYNTH-TRAFFIC-1 injector's FIRST
   scripted utterance is "fabrika listesini getir" → the system calls
   `getFactoryList` → we capture the real 17 names + which 4 are active (the
   4 active ones return data on a follow-up probe; the other 13 return empty).
   The Class C question set is then GENERATED from that real list — the subsystem
   seeds its own inactive-factory questions from ground truth. Zero manual name
   entry, fully self-configuring.
2. **Owner-provided:** if you paste the 17-list (or the 13 inactive), I seed
   Class C verbatim. Faster if you have it handy.
Recommendation: path 1 — the injector bootstraps its own Class C from
`getFactoryList`, so the set is always correct against live registration and
never drifts.
## §5 (updated) · THREE CLASSES — the full Pareto set v1 shape
~40-50 curated utterances across all four active factories PLUS the inactive set:
- **Class A · data-query** (dominant): OEE, fire/scrap, line-stops, shipment,
  production, counter, order — across KB7/Granit/Sır-Çan/Masse, varied on
  scope/time/action/agglutinative phrasing. Owner anchors Q1 (Granit downtime) +
  Q2 (Sır Hazırlık shipment) seeded verbatim.
- **Class B · prescriptive/agentic (F83 arc, today refused):** owner anchors Q3
  (corrective A3) + Q4 (web-research roadmap) seeded verbatim. Measures
  frame-fires-despite-refusal + seeds the F83 regression bed.
- **Class C · registered-but-inactive factory (empty≠zero live test):** generated
  from the real `getFactoryList` (§5c). Measures honest-absence vs
  fabrication/scope-borrow. THE trust-line stress test under load.
## §9 (updated) · OWNER DECISIONS — status
- **Mode default → frame-only for K1** (your GO covers this unless you say
  full-turn). *Note: Class C's real value shows in FULL-TURN (you need the tool
  to actually return empty and watch the answer) — so I recommend a small
  full-turn Class-C batch ALONGSIDE the frame-only K1 bulk. Cheap (13 factories ×
  a couple probes).*
- **Class B in the set now → default YES** (F83 regression bed).
- **Class C sourcing → path 1** (injector self-bootstraps from getFactoryList) —
  confirm or paste the 17-list.
- **Injector engine → cron-driven** (robust) unless you prefer start/stop.
- **GO given** → I now author question-set v1 (3 classes, 4 active + inactive
  factories, owner anchors verbatim) + the SYNTH-TRAFFIC-1 phase, in one shot.
<!-- END · cwf-synthetic-traffic-design-v1_3 · rev 1.3 · 2026-07-21 -->