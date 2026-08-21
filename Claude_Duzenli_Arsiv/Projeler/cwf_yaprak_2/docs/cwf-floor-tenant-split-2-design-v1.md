# CWF — FLOOR-TENANT-SPLIT-2 · Design Note · v1
<!-- cwf-floor-tenant-split-2-design-v1 · 2026-08-02 · S77 · Architect: Claude.
     Layer C of cwf-floor-tenant-split-design-v1_1 §2. Authored while
     SPLIT-1 is in the AG lane; §6 stays OPEN for SPLIT-1 G0 census intake
     — the SPLIT-2 phase prompt is NOT authored until §6 closes. -->

## 0 · Scope
Retire tenant knowledge from the code floor: `armes/zones.ts`
(`FACTORY_ID='KB7'` + ZONES with capability flags), tenant data content of
`armes/glossary.ts`, zone typing residue in `armes/types.ts`; re-point
every consumer; widen `check:tenant-zero` to the FULL extent
(kb7 · glazur · remaining vocabulary) and delete SPLIT-1's Layer C
exclusion list. End state = the owner's 100% mandate reached.

## 1 · The central design problem — and the trap inside it
Zone topology already has its home: `entity_registry` factory/line/zone
layers (F183). But the load-bearing part of zones.ts is not the names —
it is the **behavioral qualifiers** (`hasBarcode`, `scrapVisible:false`,
the IKINCILUST blind-spot note). These are empty≠zero's concrete carrier:
lose them and the render layer starts stamping honest absences as zeros.
**F184 therefore comes off the shelf as a dependency, not an option.**

**TRAP (named before prescribing):** entity_registry is a SYSTEM-SYNCED
MIRROR — `syncEntityDiscovery` is its single writer. Hand-curated
qualifiers written onto mirror rows would be overwritten by the next sync
tick, silently. And per ADR-010 a backend's own declaration could not be
trusted for them anyway — "scrap is structurally invisible in IKINCILUST"
is OPERATIONAL knowledge Kale's floor taught us, not something ARMES
declares. Mirror data and curated knowledge are different authorities and
may not share a write path.

## 2 · Committed single path
**Qualifiers = governed kind (F184's original shape):** an `armes.zone`
rule kind — Zod field-locked structure in code (structure→code), tenant
VALUES as governed rows via the gated admin UI / gate-published jobs
(data→gated UI), joined to registry entities by (backend, layer, name).
The registry stays a pure mirror; the governed rows carry the judgment.
Read side composes: names/topology from `entity_registry`, qualifiers
from the governed kind, absence of a qualifier row = honest unknown
(attributed), never a default-true.

**Seeding without re-tenanting the repo:** the current zones.ts bytes are
the seed CONTENT, but a seed file in the repo would re-plant tenant words.
Committed: a GENERIC, tenant-free loader in code (payload from path/
stdin, gate-published, idempotent, FENCE-first when Operator-lane); the
Kale payload lives as a versioned PROJECT ARTIFACT (deployment-time data
asset), relayed — never committed. This is the b1_scope job pattern with
one correction the mandate forces: post-split, tenant-worded payloads may
not enter `scripts/jobs/` at all.

**Consumers re-point (B5 floor-swap precedent, branch-for-branch
empty≠zero proof):** grounding scope vocabulary (today DERIVED from
zones.ts) → registry+kind read · stageClarify / alias-and-ref resolution
tables → registry layers (comment residue already swept in SPLIT-1) ·
render honesty (scrapVisible) → governed kind read · glossary floor keeps
structure + generic examples, tenant rows remain governed data (already
live — OEE v3 line).

**Prompt parity rides again:** glossary/persona slices composing into the
live prompt get the SPLIT-1 T3 treatment — the composed-prompt sha256
parity gate is reused verbatim wherever this phase touches a
live-composing text.

## 3 · Outage posture (owner-visible consequence, decided)
Post-split the code floor for tenant knowledge is DISCOVERY + governed
data: seed = discovery run + payload apply · reset target = re-discovery
+ re-apply · outage = **attributed absence** (the platform says "tenant
knowledge unavailable", never guesses, never stamps zeros). A
last-known-good runtime cache (repo-free) is a NAMED option, deliberately
DEFERRED: it is added only if observed outage behavior warrants it —
capability ahead of evidence is how spaghetti starts. Deferral name:
**TENANT-LKG-CACHE-Q**.

## 4 · Proof reads (S63-1 — merge is not proof)
1. Live zone-scoped turn resolves with registry-sourced vocabulary
   (Langfuse trace shows the registry/kind reads in the stage tree).
2. The IKINCILUST witness: a scrap question against the blind-spot zone
   renders the structural-invisibility answer, not a zero (empty≠zero's
   live test, before AND after).
3. Outage simulation test: registry/kind read failure → attributed
   absence, four-way semantics branch-for-branch.
4. `check:tenant-zero` full-extent ZERO with the exclusion list DELETED,
   positive control re-proven (S66-1).
5. Composed-prompt parity sha where applicable.

## 5 · Expected lanes
AG: code + tests + loader + reseal. Operator: ONE migration expected
(rule kind + any registry join support), `supabase db push` only
(ADR-005), FENCE `fjbrkimwvtpwoxhziidh`, idempotence probe, verifyGrants
row (security standing rule). Owner: consent lines for gate publishes +
the Kale payload relay.

## 6 · OPEN — SPLIT-1 G0 census intake (closes before the phase prompt)
Unclassified files surfaced by SPLIT-1's G0 (if any) are classified here;
kb7/glazur hits that SPLIT-1's sweep reveals as data-not-comment join §2's
consumer list. **The SPLIT-2 phase prompt is not authored until this
section closes on AG's evidence.**

<!-- END · cwf-floor-tenant-split-2-design-v1 -->
