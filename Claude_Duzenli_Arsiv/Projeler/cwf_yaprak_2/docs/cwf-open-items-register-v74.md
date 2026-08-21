# CWF — Open Items Register · v74
<!-- cwf-open-items-register-v74 · 2026-07-31 · CLOSES S72. Supersedes v73.
     S63-2: SELF-SUFFICIENT — every open item carries full wording here or a
     sanctioned pointer (parked full texts remain in v72 §7, unchanged). -->

## §0 · FLOOR (verified from fresh clones during S72; FIX-1 in flight)

```
origin/master   7ccf34f6dfcfc7284e056a9efc6409549cd103da  (1C merge)
vitest          402 files · 4469 tests · migrations 62 · docs/adr 11
docVersion      rev 166 · 2026-07-31
production      dpl_G7ySdKgdq8Wz1EmWyukAWci5xbW5 · READY 10:06:32Z · SHA=7ccf34f6
DB              episodes LIVE (3 rows after one audited delete) ·
                memory_audit LIVE (applied·idempotent·sealed·empty; 0 rows —
                first forget_tick row lands 2026-08-01T03:40Z)
```

IN FLIGHT (expected, not drift): `phase/memory-1c-fix-1` — PHASE-MEMORY-
1C-FIX-1-v1 relayed to AG (promote-draft reachability + collision routing;
zero migrations). Master moves ONLY after an Architect GO.

**Merge ladder, S72:** `40896d3c` MEMORY-1B ("the platform starts using what
it remembers") · `7ccf34f6` MEMORY-1C ("window, door, ledger") — both
`--no-ff`, both messages byte-verbatim (Vercel metadata echo verified), both
suites independently re-run to the digit on reviewer clones (398/4413 · 402/
4469, delta 0; chunked single-core method, aggregate==unsharded-count as the
partition proof).

## §1 · S72 SESSION RECORD

**A4/MEMORY-1A → CLOSED@evidence.** First tick 2026-07-31T03:40:47Z on
schedule: `[MemoryForget] deleted=0 scanned=3` (scanned=3 reconciled: a 3rd
episode from 2026-07-30 ~14:20 existed; the 2→3 movement is the positive
control — the counter tracks reality). Pre-clearance chain the day before
(cron registered in deployed vercel.json · endpoint live · scheduler+
CRON_SECRET proven by the sibling digest-cleanup 200 · fence ok) meant the
absence-then-presence was fully explained: the S72 bootstrap's "tick at
open" premise assumed next-day opening; same-day opening made it NOT-YET-
DUE, not failed.

**A4/MEMORY-1B → CLOSED@evidence, full chain in one morning.** Gate relay
(verbatim tick + STOP endorsement + scanned=≥2 update + ADDENDUM-1 stage-
card rider) → AG build `a03496f` (8 commits) → RULE-25 on a fresh clone
(grounding zero-memory-imports · topK=0 = ZERO READS spy-pinned · identity
door precedes policy fetch · constraint-10 byte-pins · lens refusal literal
+ writesPerformed:0 · doc-flip deltas read comment-only by eye · ADDENDUM-1
cards exact, new deep law "Bellek bulur, öğretmez") → GO → merge `40896d3c`
→ CI green after an F196-family flake (see §4) → deploy `dpl_432EjSFiBuaCKPDq…`
READY 07:47:18Z → live proof on the owner's real turn: `[Memory] offered=3
conv=0 user=3 topK=3 ms=132` + the chip rendering "3 past interactions"
(UI==log) + `agent.memory.retrievalTopK` self-seeded through the real gate
(`verdict=published`) + a 4th episode written same turn (`[MemoryWrite]
tools=3 entities=1` — entities counts SURFACES; see §4 label note).

**A4/MEMORY-1C → merged + applied; F48 remains OPEN on two named witnesses.**
1C v1 carried an Architect premise error (zero-migration decree + demanding
the tick datum from a source that persisted nothing — the named trap class);
AG's hand-back proved every audit carrier closed (action CHECKs; founding-
law-sealed tables; the tick logged only). v1_1 resolution = ONE append-only
`memory_audit` migration (episode_delete | forget_tick; S33-1 machine
actor; SERVER_ONLY; all-grantees revoke; probe+CI) + the tick gains a
ledger row (delete first, append second, append-failure loud-and-drops) +
kind correction (promotion targets the SOFT lane kind `armes.glossary_term`;
`domain_rules` is the table). Build `f1066e3` (7 commits, incl. G4 =
CHART-SERIES-DIALECT-1 fix) → RULE-25 402/4469/0 + structural PASS → GO →
merge `7ccf34f6` → CI green → deploy → **Operator apply: applied ·
idempotent · sealed · empty** (ACL shows anon/auth `m`-only → §7
MAINTAIN-RESIDUE-SWEEP inventory += memory_audit). Owner-hand witnesses:
**rollback direction** ✅ (POST /rules/1ac0978b 201 @11:00:34Z; pending
restoration draft `fe8709c6` inert; published v2 untouched; diff honestly
"no changes") · **audited delete** ✅ (`DELETE 200` @11:04:15Z ·
`[MemoryAudit] action=episode_delete turn=ce93abab… audited=true` ·
episodes 4→3). **F48 → CLOSED@evidence on exactly:** (1) the first
`forget_tick` LEDGER row matching the 03:40Z log line, and (2) the
`fire_orani` publish `[Gate] verdict=published` after FIX-1 lands.

**CHART-SERIES-DIALECT-1: born and RESOLVED same day.** The 07:57Z answer
showed the chart block as raw text; diagnosis: the model borrowed the TABLE
dialect's `{field, header}` objects into the chart's `series` (the chart
dialect had no header-renaming affordance and the fields were bare UUIDs);
the parser's honest non-chartable fallback fired. Proven NOT-1B (zero diff
on render files). Fixed in 1C G4: dual-dialect parser + header→legend,
red-then-green against the real production block. Prompt-side tightening
feeds viz v4 (A5).

**Promotion path findings (owner-hand verification working as designed —
the UI-CURATE-1/F218 class):**
- **PROMOTE-COLLISION-1** — promoting an already-published key creates a
  duplicate-key SIBLING rule, no dialog warning. Live exhibit: rule
  `69202e21`, key=OEE (10:28Z) — INERT, do not publish or delete.
- **PROMOTE-DRAFT-VISIBILITY-1** — draft-only (new-rule) promote drafts are
  reachable in NO tab/search; drafts attached to an existing rule DO render
  (chip path — proven by the rollback draft). Live exhibit: `fire_orani`,
  rule `c92a1dba` (10:50Z), provenance-carrying, awaiting FIX-1 to become
  publishable. Both defects are FIX-1's exact scope (collision → draft ON
  the existing rule; draft-only rules listed with a `draft` chip; dialog
  collision preview; draft-view timeline scope).

**RAG lane (B4-lite):** owner answered the five probes (reachable · SDK-
1.29.0 handshake ok · read-only · NO source attribution "aynen ARMES" ·
key via reference layer). **RAG-ATTR-1 minted** (ratified text says finding,
not block): provenance covers RAG at backend+tool granularity only; the
honest difference recorded — ARMES is a system-of-record returning raw
measurements, the RAG tool returns another LLM's synthesis; the finding
closes if attribution later ships. Connect path pre-verified our side
(registry case + pack + row + categories; health/mirror automatic on an
explicit-backend_id row; `mcp-probe` works on a DISABLED row). 3-step
panel walkthrough standing (secret `ragtoken` → disabled global row
`ragdocs` → Probe). Owner parked the connection; guard(a) window = A5 end.

**ADR-012 ratified** (2026-07-31, parallel discussion session; document in
project knowledge; that session's operational lane terminated — versions
come only from the session-of-record). **S72-1 = R-1 "the label lives on
the valve"** · **S72-2 = R-2 "name the layer before legislating"** (numbers
bound; no collision). Audit verdict: zero conflict with locked laws; RR-1/
RR-2 change no current behavior (§7 fence). **A7 scope MUTATED:** "draft
ADR-012" is dead → "LAND ADR-012 into docs/adr + R-1 retrofit propagation
(its §8.3 B6 task)". **ADR-012 is NOT citable in any AG phase prompt until
it lands in the repo (the F190 lesson).**

**Repo-visibility incident + the bundle protocol.** Between 2026-07-30
12:43Z and 2026-07-31 05:19Z the repo flipped public→private (metadata-
proven: `githubRepoVisibility` per deployment), severing the Architect
ground-read mid-review; owner restored public and the review completed
classically. **Standing fallback designed and recorded:** incremental
`git bundle <anchor>..<branch>` relayed via upload, cryptographically
self-verifying against the Vercel-pinned head SHA — available any time the
repo goes private again, no protocol amendment needed.

## §2 · DECISIONS CARRIED (v73 §2 in full force, plus S72)

All of v73 §2 verbatim in substance (E-1 · E-2 · E-3 · MEASURE-1 umbrella
with its three hard rulings and card set · R10 withdrawn/scope-cut v1_2
UNAMENDED · MCP 2026-07-28 four dispositions). S72 adds: ADR-012
ratification + S72-1/S72-2 · A7 mutation · the bundle protocol · FIX-1
scoped as the F48 unblock · the fire_orani publish and the OEE-sibling
disposition are OWNER actions after FIX-1 (sibling: merge-or-discard
decided AFTER F48 closes).

## §3 · LIVE GOVERNED STATE (re-derive from here — never from memory)

```
router.frameRouting = 0 (DARK) · learnEnabled = 0 (BRAKED) · contextTurns = 2
tool_category_cache = 2 rows both pinned · epoch 12
router_proposals = 20 / 0 pending / 1 accepted / 19 rejected
mcp_settings = 3 rows ZERO credentials · global = 2 apiKeyRef entries
mcp_secrets = 2 (armes-daily-token 2026-07-30 · supersettoken 07-06)
armes.tool_category = 12 / 108 / 97 / 0-write · FLOOR == LIVE
agent params live: temperature·historyWindowN·maxToolRounds·maxOutputTokens·
  thinkingBudget · agent.memory.ttlDays=90 · agent.memory.retrievalTopK=3
  (both gate-self-seeded on first live use)
episodes: LIVE · 3 rows · service-role-only · forget cron 40 3Z
memory_audit: LIVE · sealed (anon/auth m-only residue) · 1 row
  (episode_delete 11:04Z) · first forget_tick row due 08-01T03:40Z
glossary armes.glossary_term: OEE v2 PUBLISHED alwaysInject:true · +1 inert
  restoration draft (fe8709c6) · +2 inert promote exhibits (69202e21 OEE-
  sibling · c92a1dba fire_orani)
permissions: + memory:manage (super-admin)
entity_registry 17/779/0 · corpus 167/796 · synthetic = frame-only
SUPERSET_PUBLIC_BASE_URL = SET
```

## §4 · CORRECTIONS + LABEL NOTES (append-only)

v73 §4 carries. S72 additions: **(a)** Architect premise error in 1C v1
(zero-migration decree; unproducible tick datum) — surfaced by AG per §0's
own law, absorbed as designed. **(b)** Architect's "entity-çözümlü ilk
epizod" corrected to "yüzey-çıkarımlı": `[MemoryWrite] entities=` counts
SURFACES (extraction live under the dark flag); the drawer shows CANONICAL
+ resolverRan — both honest, different layers; log-label sharpening
(`surfaces=`) rides the dark-flag block post-A23. **(c)** Probe artifact's
"attribution or block" overstated the ratified text — corrected to finding
(RAG-ATTR-1). **(d)** F196 now has THREE signatures (rule26-admin ·
memory-1b chip scrollIntoView detached-DOM · tool_graph_node @1024 self-
recover); hardening candidate named by AG: the chip spec carries no per-
describe CI retries. **(e)** Cosmetic ledger: OEE version timeline shows no
v1 history (observation, uninvestigated) · draft-view timeline scope fix
rides FIX-1 G4.

## §5 · THE v1 PATH (scope-cut v1_2 UNAMENDED)

```
 ✅ A1 · ✅ A9 · ✅ A2 · ✅ A6 · ✅ 1A · ✅ 1B · ✅ 1C(merge+apply+2 witnesses)
 ▶  FIX-1 (in flight) → owner publishes fire_orani → [Gate] read →
    with the first forget_tick ledger row: F48 → CLOSED@evidence → A4 CLOSES
 ∥  B4-lite RAG (owner-parked; 3-step panel path standing; guard(a) window = A5 end)
 4. A5 freeze lift + 4 publishes + F133-L5 + F83.1 + THE FLOOR RE-SYNC RE-RUN
 5. A7 B6 min docs + D-2 + D-3 + LAND ADR-012 + R-1 retrofit
    + STAGE-CARD-DRIFT-1 fix (stagesRegistry into the drift gate)
 6. A8 B7 tag + release notes + branch pruning (recount at A8)
```
v1.1 queue: **MEASURE-1 (head)** · E-1 · then v72 §5's list unchanged ·
+ PROMOTE dialog/UX polish beyond FIX-1 if any residue.

## §6 · DARK FLAG — carried verbatim in substance from v73/v72
(stageClarify unreachable under frameRouting=0 · 1B's entity signal honestly
0-contribution, resolverRan=false — recorded fact, not defect · A23-after-B7
owns the re-evaluation · M1 rule 5/52, GO threshold M1=0/N≥30 · + the
`entities=` label note of §4b.)

## §7 · PARKED — v72 §7 full texts carry unchanged, plus S72 deltas
M-C · SYNTH-TRAFFIC-2/F204 · F196 (now 3-signature + retry-hardening
candidate) · F202 · F208 · F211 · F216 · F219 · F198 · DISCOVERY-EXTEND-2 ·
F184 · B5 · M-B · F178(+Tasks) · F179 · F180 · F165 · D5 · F189 · F191 ·
F207 · F197 riders · CLASS-GATE-1 · E-2 · E-3 · MCP-SPEC-DRIFT ·
F-CONTEXTTURNS · F-LEARNENABLED-PROVENANCE · MAINTAIN-RESIDUE-SWEEP
(inventory: episodes + memory_audit) · **NEW: RAG-ATTR-1** (closes if the
team ships attribution) · **STAGE-CARD-DRIFT-1** (scheduled at A7, not
free-floating).

## §8 · LAWS
S72-1 (R-1: the restriction label lives on the valve) · S72-2 (R-2: name
the layer before legislating). Practice precedents (not numbered laws):
chunked single-core suite arbitration with aggregate==unsharded-count as
partition proof · the bundle evidence channel (§1) · the GO block now
carries an explicit Operator-door step when a migration ships.

<!-- END · cwf-open-items-register-v74 · 2026-07-31 · closes S72 -->
