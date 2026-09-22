<!-- relay-audit: v1 kind=notice -->
AMENDMENT-1-CARD-ASK-OPTION-LABEL-IS-OWN-NAME-S140-1-v2

LANE: AG-4

ONE test added to ORDER 2 of the sealed card you hold (row named in `raw-tokens`), from the scout's GREEN review — the scout's contribution, recorded by name (SCOUT-VERDICT-CARD-ASK-OPTION-LABEL-IS-OWN-NAME-S140-1-v2, discriminator 1):

ORDER 2 (e) — the FLOOR path: "no parent name in hand" is true in TWO situations, not one. The card pins the parentless row (a). The second is a row whose parent EXISTS but is NOT VISIBLE in the pool — the one-layer read at `buildDisambiguators(registryRows, registryRows)` (:784), which the seam's own comment (:234-:238) names as the floor's structural case. Today those options read the layer key; under ORDER 1 they read their own display names, which the rule intends. Pin it: a one-layer (floor) ambiguity whose rows carry a parent_entity_id that is absent from the pool labels each option by its own display_name, labelSource 'self'. Synthetic fixture, as (a).

Nothing else changes: the rung order, the pins, the scope and the tenant clause stand as sealed.

```evidence:raw-tokens
sealed card row   f0abe578-cec7-46ab-8a0d-dbef8929cfe8
scout GREEN row   a5f797ee-8c91-469b-99f2-24530dc55145
```
