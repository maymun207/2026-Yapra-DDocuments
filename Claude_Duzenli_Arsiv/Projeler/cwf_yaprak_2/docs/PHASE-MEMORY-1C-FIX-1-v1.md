# PHASE MEMORY-1C-FIX-1 · v1 — promote drafts must be reachable
<!-- Architect-authored · 2026-07-31 · Fixes two findings surfaced by the
     owner-hand §3 verification of MEMORY-1C (the UI-CURATE-1 pattern doing
     its job): PROMOTE-DRAFT-VISIBILITY-1 and PROMOTE-COLLISION-1.
     Small, freeze-independent, zero migrations. -->

## §0 · GROUND (live, Architect-read)

Anchor: `origin/master` = `7ccf34f6dfcfc7284e056a9efc6409549cd103da` · suite
402/4469 · docVersion rev 166 · production `dpl_G7ySdKgdq8Wz…` READY ·
`memory_audit` applied & sealed (Operator report: applied · idempotent ·
sealed · empty) · episodes = 3 (one audited delete witnessed:
`[MemoryAudit] action=episode_delete … audited=true`).

The two live exhibits this phase must rescue (do NOT delete or recreate):

    [MemoryPromote] kind=armes.glossary_term key=OEE        rule=69202e21  (10:28Z)
    [MemoryPromote] kind=armes.glossary_term key=fire_orani rule=c92a1dba  (10:50Z)

Both drafts exist server-side with provenance; NEITHER is reachable in the
Rules UI. The OEE one is additionally a duplicate-key sibling of the
published OEE rule (`1ac0978b…`, v2, alwaysInject:true).

## §1 · THE TWO DEFECTS (bind the fix to these, not to symptoms)

1. **PROMOTE-DRAFT-VISIBILITY-1:** promote creates a NEW rule row; kind
   cards list keys with published instances only (drafts render only as a
   chip on an already-listed rule — proven by the rollback draft's chip).
   Draft-only rules appear in NO tab, NO search → propose→publish cannot
   complete through the UI.
2. **PROMOTE-COLLISION-1:** promoting a key that is already published
   creates a duplicate-key sibling instead of a draft on the existing rule,
   with no warning in the dialog.

## §2 · GATED SUB-PHASES

**G1 · Collision routing (server).** Promote resolves (backend, kind, key)
against published rules first: EXISTS → the draft is created ON that rule
(the chip path — same mechanics as the rollback draft), provenance carried
as today; NOT EXISTS → new rule as today. Key comparison uses the catalog's
existing key-normalization convention — read it from code, do not invent
one; if none exists for glossary keys, exact-match and say so in
self-verify.

**G2 · Draft-only visibility (UI + list endpoint).** Kind cards list
draft-only rules with a `draft` chip (no running chip); search matches
them; opening one lands on the existing draft view (Save/Mark ready/
Publish — that surface already works). This must retroactively surface BOTH
§0 exhibits with zero data changes.

**G3 · Collision preview (dialog).** The promote dialog live-checks the key
and, on a hit, states plainly: published version + alwaysInject value +
"your draft will attach to this rule". No new modal — one line in the
existing dialog.

**G4 · Draft-view timeline scope (cosmetic, same surface).** The draft view
currently claims "No published versions yet" while a published sibling
version exists — scope the timeline to the rule's full version set. (The
missing-v1-history observation on the OEE timeline is NOT scoped here;
recorded separately.)

**G5 · Tests + evidence.** Unit: promote-existing-key → draft on same rule
id; promote-new-key → listed draft-only entry. UI test: draft-only chip
renders; collision preview renders. e2e: the fire_orani exhibit visible and
openable @1280 (numeric RULE-26 assert). Suite green; docVersion rev 166 →
167 with reseal if drift flags.

## §3 · CONSTRAINTS

Zero migrations · Operator does not enter · gate untouched (the publish
button already exists; this phase only makes drafts REACHABLE) · freeze
untouched (no publishes by this branch; the fire_orani publish is the
OWNER's post-merge witness, not yours) · the two exhibits remain intact ·
ADR-012 not citable · branch `phase/memory-1c-fix-1` · self-verify → hand
back → RULE-25 → GO → `--no-ff`.

## §4 · POST-MERGE PROOF READS (the F48 finish line)

1. Owner opens Rules → fire_orani visible as draft-only entry → **Publish
   (run gate)** → Architect reads `[Gate] … kind=armes.glossary_term …
   verdict=published`. That line completes the end-to-end promotion witness.
2. The OEE sibling exhibit: owner opens it via the (now-visible) draft
   entry and leaves it — its disposition (merge into the real rule or
   discard) is an owner decision AFTER F48 closes, not part of this phase.
3. With the first `forget_tick` ledger row (03:40Z) already named:
   **F48 → CLOSED@evidence** on (1) + the tick row.

<!-- END · PHASE-MEMORY-1C-FIX-1-v1 · 2026-07-31 -->
