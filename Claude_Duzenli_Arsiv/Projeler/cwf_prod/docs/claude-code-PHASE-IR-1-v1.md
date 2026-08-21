# PHASE IR-1 — frame extraction, dark (observe-only) + enum-drop metric + F129

<!-- claude-code-PHASE-IR-1-v1 · rev 1 · 2026-07-20 · Architect: Claude (S54)
     Parent: cwf-routing-arch-design-v1 §2/§5 · taxonomy: cwf-ir-taxonomy-design-v1 (DRAFT enums EMBEDDED below — the design doc is not in-repo).
     Runs PARALLEL to IR-2 and possibly S54-POLISH-2. -->

## 0 · PRECONDITION (S47-1, parallel-lane form)
Anchor at authoring: `origin/master == 4d44c740682d40f501f5b170a7e0a2dcaeda4c3f`.
If master has advanced: `git diff --name-only 4d44c74..origin/master` — if it
touches NONE of {`api/cwf/_lib/semanticRouter.ts`, `api/cwf/_lib/knowledge/resolveRouterPolicy.ts`,
`api/cwf/_lib/knowledge/resolveRouterPromptTemplate.ts`, `api/cwf/_lib/turn/stageTools.ts`,
`api/cwf/_lib/turn/configFingerprint.ts`, `src/components/admin/ReplayTab.tsx`,
`api/cwf/_lib/replay/**`} → rebase onto current master, paste the proof, proceed.
Else STOP and report. **Reseal pre-assignment:** whichever of {POLISH-2, IR-1,
IR-2} merges after another REBASES + RESEALS to the next docVersion rev on the
MERGED tree (S47-1 corollary).

## 1 · Scope — what IR-1 is and is NOT
Observe-only. The frame is EXTRACTED and RECORDED; it steers NOTHING. The
derivation table, candidate sets, clarification-asking = IR-3. Keyword layer,
gateway.ts, eval gate: untouched in shape (roadmap §4 law). **No migration.
No publish. Zero golden-gate contact (🧊): the frame enters via the CODE FLOOR.**

## 2 · DRAFT enums (embed EXACTLY — source: cwf-ir-taxonomy-design-v1 §1-§3)
New module `api/cwf/_lib/routing/irFrame.ts`:
- `IR_ACTIONS = ['QUERY_STATUS','QUERY_METRIC','QUERY_EVENTS','QUERY_MASTER','QUERY_TOPOLOGY','COMPARE','COMMAND'] as const`
- `IR_OBJECTS = ['LINE','ZONE','FACTORY','EQUIPMENT','ORDER','RECIPE','MATERIAL','TRANSFER','VEHICLE','EMPLOYEE','QUALITY','DOWNTIME','SYSTEM'] as const`
- `IrFrame` type: `{ action: ActionId; object: ObjectId; entity_ref: string[]; metrics: MetricId[]; time: { surface: string } | null; confidence: 'HIGH'|'AMBIGUOUS' }`
  — `metrics` closed to `shared/metricVocab` METRIC_IDS; `entity_ref` and
  `time.surface` are FREE-TEXT by design (surface captures; interpretation is
  IR-2's deterministic code — polarity law).
- Header comment: `DRAFT enums pending K1 ratification (taxonomy §8); post-ratification changes = gated amendments.`

## 3 · Work items
**W1 · Schema + armor** (`semanticRouter.ts`): `RouterResponseSchema` gains an
OPTIONAL `frame` block (absent ⇒ valid — total backward compat). Armor extends
the EXISTING out-of-catalog discipline: `action`/`object`/`metrics` values
outside the enums are DROPPED + COUNTED per field; a frame failing Zod entirely
⇒ frame=null, router categories unaffected. Never a throw, never a floor-trip
caused by the frame alone.

**W2 · Floor prompt** : `ROUTER_PROMPT_FLOOR` (locate by content) gains the
frame-extraction instructions (output the optional `frame` JSON block per §2),
gated in the TEMPLATE on the new param (W4) so the instruction text is only
emitted when enabled. The governed published `router.prompt` version is NOT
touched (freeze law); it joins the post-freeze batch.

**W3 · Serving-source discovery (G0-critical)**: read
`resolveRouterPromptTemplate.ts` precedence (db vs floor) and paste it. Add ONE
log line at the router call: `[RouterPrompt] source=db|floor frame=on|off`.
If the LIVE source proves `db` post-merge, the floor-borne frame text does not
serve → frame stays dormant → REPORT that fact loudly; the freeze-lift/publish
decision is the owner's. **No silent workaround.** The phase is safe to land
either way (all additive + inert when off).

**W4 · Params** (resolveRouterPolicy.ts, self-seeding floor pattern —
mcp.healthFreshnessSec precedent): `router.frameEnabled` (bool-as-number,
**floor 0** — dark by default; observe-flip is a later one-step param publish,
freeze-safe) and fold **F129's cap**: `quota.routerAbRunTokenCeiling`
(floor = the current `replay/config.ts` constant, clamp sane bounds; the
constant now READS the resolved param).

**W5 · Observation sink**: on the EXISTING stage-07 register-tools span:
`cwf.route.frame.present|action|object|confidence`, and **provider-tagged
enum-drop counters** `cwf.route.frame.enum_drop.{action|object|metrics}` +
`cwf.route.provider` (the model-agnosticism metric). Plus ONE telemetry row per
extracted frame: existing type + `payload.kind:'ir_frame'` discriminator
(ADD-1 pattern — no enum change, no migration), payload = the armored frame +
drops + `config_fingerprint` key. C1: telemetry only. C9: payload passes the
existing redaction boundary (frame fields are enums/short surfaces).

**W6 · F129 UI**: ReplayTab affordance to trigger the EXISTING router-ab lens
run (behind its existing gates/quota; cap now governed via W4). Arrival/consent
copy bilingual; no new endpoint if the lens already exposes one — G0 enumerates.

## 4 · Gated steps
G0 pre-flight: rev-parse (+§0 advance-proof if any) · npm ci + S32-1 script
grep · paste anchors: RouterResponseSchema, armor drop site, ROUTER_PROMPT_FLOOR,
resolveRouterPromptTemplate precedence, stage-07 span-attr site, replay lens
trigger + config constant · naming-collision grep `irFrame|frameEnabled|routerAbRunTokenCeiling`
· branch `ir-1`.
G1 W1 module+schema+armor (+tests: absent-frame valid; per-field drop+count;
invalid-frame ⇒ null, categories unaffected).
G2 W2+W3 floor text + source log (+dark-equivalence test: frameEnabled=0 ⇒
router request BYTE-IDENTICAL to pre-phase — the SR1-W1 test pattern).
G3 W4 params (+floor/clamp/self-seed tests; replay cap reads param).
G4 W5 sink (+span-attr and telemetry-shape tests; fingerprint keyed).
G5 W6 UI (+component test). G6 `.agents` APPEND + conditional reseal (mapped
files WILL drift — budget it; rev = next free per §0 pre-assignment).

## 5 · Self-verify (literal evidence)
1. G0 rev-parse (+advance proof). 2. Branch head + PR # + **CI GREEN link**.
3. diff --stat; `-- supabase/` EMPTY; gateway.ts/evalGate untouched (name-only
proof). 4. Dark-equivalence test output pasted. 5. Enum lists in irFrame.ts
byte-match §2. 6. [RouterPrompt] source precedence finding stated. 7. Grep:
frame code has ZERO reach into candidate-set/tool-offer paths (observe-only
proof: no import of irFrame from filterToolsByMessage/derivation sites).
8. Targeted vitest tail. 9. PLATINUM + freeze/window untouched statements.

## 6 · Report & merge
Push, PR, post §5. **Do NOT merge.** Architect FAST-GATE → GO. Upon GO,
`--no-ff` with exactly:

`Merge PHASE IR-1: dark frame extraction on the router floor path (observe-only) + enum-drop metric + F129 lens cap governed`

Post-merge: delete branch `ir-1`; Architect reads `[RouterPrompt] source=` from
prod and reports the dormant-vs-observing verdict + the one-step flip plan.

<!-- END · claude-code-PHASE-IR-1-v1 · rev 1 · 2026-07-20 -->
