# SET-CONTEXT — per-stage turn inspector · Design v1.2

<!-- cwf-set-context-design-v1_2 · rev 1.2 · 2026-07-18 · Supersedes v1 (immutable, presented).
     Owner review integrated: three additions + the strategic sentence v1 lacked.
     Anchor: 21dd981. -->

**The sentence v1 lacked (owner-supplied):** this tool exists to FEED the ROUTING-ARCH
migration. SC-1 ships → ~2 weeks of real traffic → the 07-vs-11 mismatch rate + the
failed-turn collection become the golden set's first face → the IR taxonomy is built on
that EVIDENCE, not on speculation. SET-CONTEXT is the migration's eval infrastructure.

**PLATINUM compliance:** unchanged from v1 (one click, ephemeral, reuse).

## 0-1 · What it is + locked decisions — UNCHANGED from v1
(Faithful default / Lab = Replay deep-link / pipeline-wide / graded richness / C9 ·
C1 · ephemeral / version-pinning honesty per layer / SC-1 trio 09·07·11 + 10/01.)

## 2 · Architecture — v1 + three owner additions

### ADD-1 · 07-vs-11 mismatch telemetry (microscope → counter)
Instrument the LIVE pipeline (not just the inspector): at stage 11, each executed tool
call is checked for membership in the turn's OFFERED set (known in-process at stage 07).
On mismatch, emit a `telemetry_events` row `routing_mismatch` with
`{ tool, offeredCount, engine }` — no message text. (telemetry_events is the ledger, not
`messages` — C1 untouched.) This yields the migration statistic: "in the last N turns,
what % had a call outside the offered set" — routing error vs selection error becomes a
NUMBER. The SET-CONTEXT 07/11 cards display the same verdict per-turn.
Classification (owner-framed): call ∉ offered set → ROUTING error; call ∈ set but wrong
tool chosen → SELECTION error (the latter needs ground truth — golden-set territory,
not auto-classified; the event records the deterministic half only).

### ADD-2 · routing_map_hash into config_fingerprint (from now on)
The learned map is not per-turn versioned (v1's honest badge). Forward-fix: compute a
`routing_map_hash` (hash of the learned-map content + epoch) at stage 07 and stamp it
into the turn's `config_fingerprint` alongside prompt_rev/params_hash/knowledge_hash.
Cost: one hash. Payoff: during the routing migration, "was this turn routed by the old
map or the new engine" is a RECORD, not a guess; before/after comparison by hash.
Past turns keep the badge; future turns get the hash.

### ADD-3 · stage-03 snapshot contract is ENGINE-TAGGED (migration-proof)
The endpoint's 03 (and 07) payloads are not keyword-shaped structs but
`{ engine: 'keyword' | 'ir' | …, artifact: { … } }` — the card renders per engine.
Today: `engine:'keyword', artifact:{ matchedKeywords, categories }`. Post-migration:
`engine:'ir', artifact:{ actionFrame, objectFrame, confidence }`. The inspector then
becomes the migration's A/B diagnostic: the same turn rendered through both engines,
two 03 cards side by side. (Same data-not-enum instinct as backend-id-is-data.)

### Endpoint, selector, sources, caps — UNCHANGED from v1
(`POST /api/admin/stage-context`, Inspect-style picker, Inspect's cap, ephemeral client
snapshot.)

## 3 · Version-pinning honesty — UNCHANGED from v1, plus ADD-2's forward hash.

## 4 · Per-stage snapshot table — UNCHANGED from v1, with:
- 03/07 payloads engine-tagged (ADD-3).
- 07 and 11 cards each show the containment verdict (ADD-1's per-turn face):
  "called ⊆ offered ✓" or the named mismatch.

## 5 · UI — UNCHANGED from v1.

## 6 · Phasing (updated)
- **SC-1:** endpoint + picker + trio 09·07·11 (+10/01) **+ ADD-1 live mismatch event
  + ADD-2 fingerprint hash + ADD-3 engine-tagged contract.** All three are small and
  ride SC-1's own api/ surface (the endpoint + one pipeline touch each).
- **SC-2:** remaining stages + divergence-badge polish.
- **Then (owner-sequenced):** ~2 weeks of real traffic → mismatch rate + failed-turn
  collection → ROUTING-ARCH design note written ON that evidence (IR taxonomy, golden
  set seeded from the collected failures). 1b Tool-Matching UI follows the decision.

## 7 · What this is NOT — UNCHANGED, plus:
- Not the ROUTING-ARCH decision itself — it is that decision's measuring instrument.

<!-- END · cwf-set-context-design-v1_2 · rev 1.2 · 2026-07-18 -->
