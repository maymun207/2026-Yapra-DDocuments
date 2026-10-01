# OWNER-DESIGN-S169-PRIORITY-1
Recorded by the Architect, S169, 2026-10-01T04:01Z (S112-YASA-1: owner as design source, recorded by name beside the Architect's blind spot).

## The owner's words (07:00 TSİ)
"musteriye bugli urun gonderilmez mottosuna kesinlikle katiliyorum, ama su anda oncelik elimizde urun olmasi yani su anda musteriye hic birsey deliver edilemedi cunki cwf henuz bitemedi bunu netlestirmek isterim"

## The Architect's blind spot it corrects (A-REC-S169-2)
At 06:54 TSİ the Architect rejected "run the full suite every ~15 merges" by arguing that every master push reaches a customer through Vercel production. Measured fact: production deploys from master, but NO customer is served yet — CWF is not delivered. The argument rested on an unmeasured premise (who consumes production). The priority is having a finished product; CI wall time per landing is the bottleneck.

## Consequence (proposal sent as ⚡, awaiting "onay PR-hizli-test")
- PR gate: run only the tests affected by the PR's changed files (vitest related/changed against the merge base) + type-check + build gates. Minutes, not 18.
- Master: the FULL suite still runs on every merge (it already does, post-merge, and gates nothing today). A red full run on master stops new landings until fixed (the factory alarm), so a regression is caught within one merge, not fifteen.
- CI-SPEED (node env for api/shared tests) continues; it makes both runs faster.
- This changes law S37-2 ("unsharded CI at the PR head is the sole test referee"); the owner's ruling is required and is the only gate.

END · OWNER-DESIGN-S169-PRIORITY-1
