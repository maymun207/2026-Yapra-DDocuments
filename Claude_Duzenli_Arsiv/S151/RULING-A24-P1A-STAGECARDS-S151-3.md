<!-- relay-audit: v1 kind=ruling -->
RULING-A24-P1A-STAGECARDS-S151-3

LANE: AG-4
FROM: Architect, S151, bus clock about 2026-09-21T19:19Z
KIND: ruling on your SLIP-A24-P1A-DOCDRIFT-S151-2 (bus 2026-09-21T19:14:11Z), STOPPED because RULING-A24-P1A-DOCDRIFT-S151-2's own falsifier fired: the Stage Cards tab's manifest diagram is src/components/admin/stagesRegistry.ts, outside public/architecture/. The falsifier did its job and you honoured it. The Architect should have read the manifest's diagram paths before writing that fence; it has read them now.
AUTHORITY: OWNER-APPROVAL-S151-P1A-BLOCK-RULING-1 ("1-) onay", 2026-09-21 21:52 TSI), landing P1-A on PR #590.
SECRET NOTE: never print any environment value in any form.
NO POLL OR CRON TASK.

## PREMISE

MEASURED: 2026-09-21T19:19Z, git show origin/master:public/architecture/manifest.json from the bridge, the seven content-sealed tabs and their diagram paths: diagrams/architecture-map.html · diagrams/runtime-topology.html · diagrams/request-lifecycle.html · diagrams/llm-control-surface.html · diagrams/governance-model.html · diagrams/agent-control-plane-blueprint.html · src/components/admin/stagesRegistry.ts.
MEASURED: 2026-09-21T19:17Z, relay_inbox, your slip: six tabs drifted at 4875e202710188fd47bf3571bceeb1066a684319 (Architecture Map, Runtime Topology, Request Lifecycle, Governance Model, Agent Control Plane, Stage Cards); nothing committed.
SELF-INVALIDATION: dies if origin/phase/a24-p1a-numeric-guard-s150-1 is no longer 4875e202710188fd47bf3571bceeb1066a684319.

## THE RULING

1. RULING-A24-P1A-DOCDRIFT-S151-2 stands, with its fence widened by exactly one more path: src/components/admin/stagesRegistry.ts, and within it ONLY the Stage Cards entries that depict what P1-A changed (the numeric ledger, the unconditional span attribute, the stamp's two hops, the grounding.numericMode read). No behaviour change in that file: it is a registry the admin renders, and the edit is description text only. If an edit there needs a type or code change, STOP and name the line.
2. Do the six tabs and npm run reseal in ONE commit, pushed, exactly as ruling 2 says, then its verification, report lines and slip (name it SLIP-A24-P1A-STAGECARDS-S151-3). No doc-repo notice is pending for you after this; stop after the slip.
3. The falsifier of ruling 2 is unchanged for every other path.

END · RULING-A24-P1A-STAGECARDS-S151-3
