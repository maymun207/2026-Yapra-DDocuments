# PHASE S61-CLEAN-2 · v1 — F167 · F168 (the governance surface stops lying)

<!-- claude-code-PHASE-S61-CLEAN-2-v1 · rev 1 · 2026-07-23 · Architect: Claude
     The two findings surfaced during F163's live walkthrough that S61-CLEAN-1
     deliberately did not carry (different files, UI/legibility class).
     Owner-approved as a follow-up mini-phase. ENTIRE relay payload (S54-3).
     Amendments mint v1_2. -->

**PRECONDITION (S47-1):** valid ONLY while `origin/master` ==
`aeda744aa06eb8086d6865696b337ec3a0b207dc` (rev 139 · 347 test files ·
56 migrations · drift OK). On mismatch: **STOP and report actual state**.

**PROFILE:** FULL (touches `api/admin/**` and `api/cwf/_lib/persistence/**`).
**MIGRATIONS: ZERO.** **CORE Zod schemas: UNTOUCHED** (see §2.3).

**PLATINUM compliance:** F167 removes the last hidden ordering requirement in
the governance surface — a brand-new governed kind currently only becomes
usable if somebody happens to send a chat message first. After this phase the
panel provisions what it renders, with no human sequencing knowledge required.
F168 stops the product from demanding human work that goes nowhere.

---

## §1 · THE TWO DEFECTS (both observed live, 2026-07-23)

**F167 — a newly minted governed kind is invisible and unusable until an
unrelated chat turn happens.** After TOOL-DOC-1 shipped, the owner opened
Kurallar/Rules to write the first `tool_doc` row and the kind was not there.
Three independent layers, all code-verified:

1. **Provisioning has exactly one trigger, on the wrong lane.** `runSelfSeed()`
   is called only from `DbKnowledgeProvider.warm()` — i.e. the chat turn path.
   Grep of `api/admin/**` for `runSelfSeed` returns nothing.
2. **The panel's kind read is all-or-nothing.** `api/admin/kinds.ts`:
   `const kinds = dbKinds.length ? dbKinds : KIND_REGISTRY;` — because the DB
   already holds ~18 kinds, the code registry is never consulted, so a kind
   that exists in `KIND_REGISTRY` but not yet in `rule_kinds` cannot appear.
3. **The list has no deterministic order.** `RuleStoreRepository.getKinds()`
   issues a `select('*')` with **no `.order()`**, so a freshly inserted kind
   lands wherever the DB returns it — in practice last, below the fold.

The failure mode a caller that bypasses the panel would hit is different and
worse: `createDraft` resolves the kind from the CODE registry and then inserts,
hitting `domain_rules.kind_id → rule_kinds` FK
(`supabase/migrations/20260627150001_domain_rules.sql:13`).

(Related, and NOT a defect: with a live search term, `GovernanceTab.tsx`
deliberately narrows to kinds with matching rules, so a zero-instance kind
disappears while searching. That is documented intent — leave it alone. It is
named here only because it compounded the confusion during the walkthrough.)

**F168 — a REQUIRED governed field that nothing ever shows the model.**
`ToolGraphNodeSchema` (`reference/coreSchemas.ts`) mandates
`description: z.string().min(1)`. But `composeArmes.ts` reads exactly one
thing from that kind — the `role === 'entry'` node's `tool` (≈L73-74). A
repo-wide sweep of `KIND_IDS.TOOL_GRAPH_NODE` consumers finds only
`evalGate.ts` (referential/`TOOL_MIRROR_KIND_IDS` checks) and
`reconcileToolGovernance.ts` (reachability/archive bookkeeping) — all of which
use the ROWS, never the `description` / `requires` / `produces` CONTENT.

So the gate compels the owner to write tool documentation into a field the
agent never reads. The owner had in fact written a good Turkish description on
`getScrapBarcodeList` ("Barkod bazlı fire listesi (shift parametreli). Yalnızca
barkodlu zonlarda anlamlı.") — it goes nowhere. This is exactly the knowledge
F163's `tool_doc` overlay now carries properly.

---

## §2 · BINDING CONSTRAINTS

1. **Do NOT make `tool_graph_node.description` model-facing.** F163 just
   established `tool_doc` as THE single model-facing overlay (source #4 of the
   four-source model). Rendering a second field into the prompt would recreate
   the "which text does the agent believe?" ambiguity that model exists to
   remove. The fix is honesty about the field, not promotion of it.
2. **Do NOT union `KIND_REGISTRY` into the panel's kind list as the F167 fix.**
   Showing a kind whose first draft would fail on an FK is a worse lie than
   not showing it. Fix the provisioning, not the display.
3. **CORE Zod schemas untouched.** Whether `description` should stay `required`
   is a governed-schema question with published-row implications — record it
   as a NAMED deferral, do not act on it.
4. **Zero migrations. Zero `prompt.segment` publishes. Zero golden runs.**
   GOLDEN FREEZE remains engaged.
5. `runSelfSeed()` must keep its fail-open, absence-only, claim-based posture —
   a seeding failure must never break a panel read.
6. If any instruction here contradicts the code you find, **STOP and report.**
   (Three Architect premises have already been falsified this session by
   exactly this discipline; it is working, keep using it.)

---

## §3 · GATED SUB-PHASES

### G0 · F167 — the panel provisions what it renders

- Call `runSelfSeed()` from the admin kind-read path, fail-open, so opening the
  governance surface is sufficient to materialise any kind the code registry
  declares. `DbKnowledgeProvider.warm()`'s existing call is the precedent for
  a read-ish path triggering it; do not duplicate the reconciler's logic.
  It is claim-based via `seed_state`, so the steady-state cost must be a cheap
  check, not a re-seed — prove that.
- Give `getKinds()` a **deterministic order**. Pick the ordering that least
  disturbs the panel's current grouping and justify it in one line; the
  binding requirement is determinism, not a particular sort.
- A seeding failure must degrade to today's behavior (the panel still renders
  what the DB has), never a 500.

**Evidence required:** a test proving a kind present in `KIND_REGISTRY` but
absent from `rule_kinds` becomes visible after one admin kind read, with **no
chat turn involved** · a test proving the second read does not re-seed · a
test proving a thrown reconciler still returns a normal kind list · a
deterministic-order test.

### G1 · F168 — the dead field stops looking alive

- In the panel and in the kind's field-spec mirror, label `description`
  (and `requires`/`produces`, same status) truthfully: **not sent to the
  agent**; the model-facing surface for a tool is the `tool_doc` İşletme notu.
  Wording in TR · EN, matching the product's existing bilingual convention.
- Add a one-click path from that field to creating a `tool_doc` draft for the
  same tool, pre-filled with the existing text — the owner already wrote
  good content there and must not have to retype it. If this cannot be done
  cleanly without touching F163's publish path, say so and ship the labelling
  alone rather than forcing it.
- **Named deferral to record in CHANGELOG + KB:** whether
  `ToolGraphNodeSchema.description` should become optional (a CORE-schema
  change affecting published rows) is deliberately not decided here.

**Evidence required:** a test asserting the honest label renders on the field ·
RULE-26 coverage at 1280/1024 for any changed panel surface · if the one-click
path ships, a test that it produces a DRAFT only and never publishes.

### G2 · Self-verify

- Do-not-touch greps, pasted verbatim: `coreSchemas.ts` zero diff · no new
  migration · `composeArmes.ts` unchanged · no `prompt.segment` publish ·
  F163's `tool_doc` serve path (`resolveToolDocs.ts`, `stageTools.ts`
  composition, `gatewayCapabilityIndex.ts`) unchanged.
- `npm run build` · `npm run lint` · `npm run test` · `npm run test:rule26`.
- Reseal only if a mapped file drifted; report `docVersion` before/after and
  the `check:doc-drift` verdict.
- `.agents/CHANGELOG.md` + `cwf-project-kb` SKILL.md, including G1's named
  deferral.

---

## §4 · REPORT FORMAT

One report: branch · pushed SHA(s) · `git diff --stat` vs `aeda744` · the CI
conclusion **on the final head** (if a docs amendment moves the head, re-verify
CI on the new head before reporting green — the S61-CLEAN-1 precedent) ·
per-gate evidence · the do-not-touch greps · `docVersion` before/after ·
anything you had to STOP on.

**Do not merge.** FAST-GATE review first; the merge instruction arrives as a
single GO block with the message embedded in `--subject`/`--body`.

<!-- END · claude-code-PHASE-S61-CLEAN-2-v1 · rev 1 · 2026-07-23 -->
