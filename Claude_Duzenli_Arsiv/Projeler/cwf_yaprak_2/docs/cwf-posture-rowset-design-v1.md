# CWF — Capability-Posture Row-Set Design · v1
<!-- cwf-posture-rowset-design-v1 · 2026-08-02 · S78 · Architect: Claude.
     TENANT-CONSOLE derivation step 1 (vision §7). Status: DESIGN NOTE for
     owner ratification — no phase prompt derives until ratified.
     Earned premises: RECON-TENANT-CONSOLE-POSTURE-1-v1 report (AG, this
     session) + ADR-012 §4/§6 repo bytes @ 29e4965f + agentParams.ts /
     seedAgentParamsCore.ts repo reads @ 29e4965f. -->

## §0 · Earned premises (all computed, provenance named)
- **No posture kind exists live.** AG recon G0.2, 29-kind inventory scanned,
  positive controls proven (incl. the HEAD-204 hand-back). Sum-check 499=499.
- **No tenant dimension exists anywhere in the schema.** Architect grep over
  all 64 migrations (`tenant_id|org_id` → empty), authoritative per ADR-005.
- **The param rail already carries POLICY-class values.** agentParams.ts
  comments label the quota trio "POLICY params"; the rail is DB-published >
  code-floor with ONE resolve chain and ONE clamp; `sessionTweakable:false`
  exists as a hardening flag. (Repo read this session.)
- **ADR-012 §4 defines the strict profile with named doors**; §6 commits
  shape-not-schema and demands: posture = governed row-set, gates identical
  across profiles.

## §1 · The trap, named first
The reflex design is a new `capability_posture` table (or kind) carrying a
`tenant_id`. It is wrong three times over: (a) the v1 sale is a per-tenant
ISOLATED deployment (vision §6.4) — the deployment's DB *is* the tenant
dimension, so an in-schema tenant_id models a future that is explicitly
horizon work (board layer E/G); (b) it would mint a SECOND governed store
beside the rail that already does draft→gate→publish→version→audit — the
exact second-rail breach the vision's binding law forbids; (c) the recon
proved the schema is tenant-silent today — adding the column now would be
the platform's first tenant-shaped byte one day after S77 removed the last.

## §2 · Committed shape — posture rides the agent.param rail
**Posture is a key namespace, not a new store.** Each posture key = one
`agent.param` row (system lane, `domain_rules.key = 'posture.*'`):
- **Code-floor = the strict profile** (ADR-012 §4 values) — CWF-the-service
  runs correctly with ZERO posture rows published, by the floor's own law.
- **DB-published row = this deployment's profile.** In the isolated model,
  "per-tenant governed DATA" (§6) is satisfied by per-deployment DB rows —
  no schema change, no tenant column. When shared multi-tenancy actually
  opens (its own alarm, board E), the tenant dimension is added to the RAIL
  once, and posture inherits it like every other governed row.
- Resolution, clamp, audit, RBAC, publish-gate: **inherited unchanged.**
  Enum-valued keys clamp against a declared allowed-set (the same clamp
  site; a poisoned row degrades to the floor, never to an open door).

## §3 · The genuinely new deltas (only two)
1. **Layer label.** Each param declaration gains `layer: 'POLICY'|'CONFIG'`
   (INVARIANT never has a row — no screen, no toggle, per vision §2).
   Existing params are labeled in the same sweep from ADR-012 §4's ratified
   classification (quota/guardrail → POLICY stance flags where §4 says so;
   the rest CONFIG). This is the birth of ADR-012 R-1's deferred refinement:
   the label exists so the console can tier its UI; the ENGINE ignores it.
   All POLICY-layer keys are `sessionTweakable:false` by construction.
2. **The consumer-honesty rule (binding for this family).** A posture row
   may land ONLY with its named reading site wired, or explicitly marked
   `declaration-only` in its payload. A governed switch nothing reads is
   configuration theater and is forbidden.

## §4 · The initial key set (floors = §4 strict values, doors named)
| Key | Floor | Layer | Reading site today | Class |
|---|---|---|---|---|
| `posture.advisoryLlmWriter` | `false` | POLICY | none (RR-1 door unbuilt) | declaration-only until RR-1 |
| `posture.vectors` | `false` | POLICY | none (Path B adjacent) | declaration-only until PB infra |
| `posture.promotionMode` | `'human'` | POLICY | promotion flow (L4/L5 surface) | **wired** — flow reads the row and refuses non-human paths |
| `posture.episodicScope` | `'user'` | POLICY | episodic retrieval scope | **wired** — retrieval reads the row; `'org'` refused at floor |
| *(topology)* | — | — | CI/by-construction | NOT a row — RR-2 says cardinality is the invariant's v1 position; a runtime row governing nothing would violate §3.2 |

Declaration-only rows still earn their keep: the console's Guardrails page
renders them as closed doors with their consequence text, and opening one is
impossible until the door's build wires the reader — the UI can never race
ahead of the engine.

## §5 · What this note does NOT do
No console client (derivation step 3) · no discovery→draft assistant (step
4) · no deliberate-act UX (console scope; the ROWS only carry the layer
label and consequence text the flow will render) · no multi-tenant schema ·
no new kind, no migration beyond the ordinary seed path if any.

## §6 · Sequencing on ratification
ONE thin phase — **POSTURE-ROWSET-1**: (G1) layer field + labels sweep in
agentParams declarations, (G2) `posture.*` seeds with §4 floors, (G3) the
two wired readers with refuse-at-floor tests, (G4) consumer-honesty test
(every posture key either resolves a reading site by grep or carries
`declaration-only`). Recon already earned G0; per D-1 the phase prompt cites
the recon report as its live-state evidence.

— END · cwf-posture-rowset-design-v1 —
