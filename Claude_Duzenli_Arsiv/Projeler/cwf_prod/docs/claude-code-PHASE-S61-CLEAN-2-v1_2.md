# PHASE S61-CLEAN-2 · v1_2 — F167 · F168 (the governance surface stops lying)

<!-- claude-code-PHASE-S61-CLEAN-2-v1_2 · rev 1.2 · 2026-07-23 · Architect: Claude
     SUPERSEDES v1 (immutable, S37-1). Minted MID-FLIGHT: AG is already working
     from v1. Per S55-2, do NOT restart — fold this delta in as one in-branch
     commit. Everything in v1 survives; the ONLY change is that the owner
     rejected v1's "label the dead field and defer the requirement" compromise
     ("çöp üstüne çöp bırakmayalım"), so the schema relaxation moves IN SCOPE
     as a new gate, and §2.3's prohibition is replaced by a narrow permission.
     Self-contained: this file is the entire relay payload (S54-3). -->

**PRECONDITION (S47-1):** valid ONLY while `origin/master` ==
`aeda744aa06eb8086d6865696b337ec3a0b207dc` (rev 139 · 347 test files ·
56 migrations · drift OK). On mismatch: **STOP and report actual state**.

**PROFILE:** FULL. **MIGRATIONS: ZERO.**

**PLATINUM compliance:** F167 removes the last hidden ordering requirement in
the governance surface — a brand-new governed kind currently only becomes
usable if somebody happens to send a chat message first. F168 stops the
product from *requiring* human work that goes nowhere, and (new in v1_2)
stops it structurally rather than by putting a warning label on it.

---

## §0 · MID-FLIGHT DELTA vs v1 (read this first if you started on v1)

v1 shipped F168 as **labelling only**, and recorded "should
`ToolGraphNodeSchema.description` stop being required?" as a named deferral.
The owner rejected that: a warning label on a mandatory dead field is debt
stacked on debt. So:

- **v1 §2.3 ("CORE Zod schemas untouched") is REPLACED** by §2.3 below — a
  narrow, explicit permission to relax exactly one field.
- **New gate G2** (schema relaxation + the mirror-staleness fix that makes it
  actually visible). v1's self-verify gate renumbers G2 → G3.
- Everything else in v1 is unchanged. Work already done against v1's G0/G1
  stands — fold this delta in, do not restart.

**The trap that makes this more than a one-line change** (Architect-verified
at `aeda744`, do not re-derive): relaxing the Zod schema alone leaves the
PANEL still rendering `description` as required, because
`api/admin/kinds.ts` serves `dbKinds` and `selfSeedReconciler.ts:187`
(`if (existingKind) continue; // ABSENCE-ONLY LAW extends to kinds`) never
updates an existing `rule_kinds` row — so its `field_spec`, seeded once, is
frozen. Fixing only the schema would leave the owner still filling a field the
gate no longer wants. That is the debt-on-debt outcome this delta exists to
prevent.

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
disappears while searching. That is documented intent — leave it alone.)

**F168 — a REQUIRED governed field that nothing ever shows the model.**
`ToolGraphNodeSchema` (`reference/coreSchemas.ts`) mandates
`description: z.string().min(1)`. But `composeArmes.ts` reads exactly one
thing from that kind — the `role === 'entry'` node's `tool` (≈L73-74). A
repo-wide sweep of `KIND_IDS.TOOL_GRAPH_NODE` consumers finds only
`evalGate.ts` (referential / `TOOL_MIRROR_KIND_IDS` checks) and
`reconcileToolGovernance.ts` (reachability / archive bookkeeping) — all of
which use the ROWS, never the `description` / `requires` / `produces` CONTENT.

So the gate compels the owner to write tool documentation into a field the
agent never reads. The owner had in fact written a good Turkish description on
`getScrapBarcodeList` — it goes nowhere. That knowledge belongs in F163's
`tool_doc` overlay, which now carries it properly.

---

## §2 · BINDING CONSTRAINTS

1. **Do NOT make `tool_graph_node.description` model-facing.** F163 just
   established `tool_doc` as THE single model-facing overlay (source #4 of the
   four-source model). Rendering a second field into the prompt would recreate
   the "which text does the agent believe?" ambiguity that model exists to
   remove. The fix is to stop demanding the field, not to promote it.
2. **Do NOT union `KIND_REGISTRY` into the panel's kind list as the F167 fix.**
   Showing a kind whose first draft would fail on an FK is a worse lie than
   not showing it. Fix the provisioning, not the display.
3. **CORE schema change — NARROW PERMISSION (replaces v1's prohibition).** You
   may relax exactly `ToolGraphNodeSchema.description` to optional, plus its
   code field-spec mirror, plus the read-side fix in §3 G2. **No other CORE
   schema, no other field.** `requires`/`produces` are already optional —
   leave them. Backward compatibility is given: every published
   `tool_graph_node` row already carries a description, so relaxing a
   constraint invalidates nothing.
4. **Eval-gate scoping law (P6):** this is a schema-STAGE *content* change. The
   staging ENGINE (`runGate` loop), `GATE_STAGES` order, the schema
   interpreter, and every other backend's path stay **byte-identical**. If your
   change touches any of those, STOP and report.
5. **The ABSENCE-ONLY LAW stands.** Do NOT make `selfSeedReconciler` update
   existing `rule_kinds` rows. §3 G2 solves the staleness on the READ side
   precisely so that law is not amended.
6. **Zero migrations. Zero `prompt.segment` publishes. Zero golden runs.**
   GOLDEN FREEZE remains engaged.
7. `runSelfSeed()` must keep its fail-open, absence-only, claim-based posture —
   a seeding failure must never break a panel read.
8. If any instruction here contradicts the code you find, **STOP and report.**
   (Three Architect premises have already been falsified this session by
   exactly this discipline; it is working, keep using it.)

---

## §3 · GATED SUB-PHASES

### G0 · F167 — the panel provisions what it renders *(unchanged from v1)*

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

### G1 · F168 part 1 — the field stops looking model-facing *(unchanged from v1)*

- In the panel and in the kind's field-spec mirror, label `description` (and
  `requires`/`produces`, same status) truthfully: **not sent to the agent**;
  the model-facing surface for a tool is the `tool_doc` İşletme notu. Wording
  in TR · EN, matching the product's existing bilingual convention.
- Add a one-click path from that field to creating a `tool_doc` draft for the
  same tool, pre-filled with the existing text — the owner already wrote good
  content there and must not have to retype it. If this cannot be done cleanly
  without touching F163's publish path, say so and ship the labelling alone
  rather than forcing it.

**Evidence required:** a test asserting the honest label renders · RULE-26
coverage at 1280/1024 for any changed panel surface · if the one-click path
ships, a test that it produces a DRAFT only and never publishes.

### G2 · F168 part 2 — the field stops being MANDATORY *(NEW in v1_2)*

Three moves, and all three are needed or the fix is invisible (see §0's trap):

1. **Schema:** `ToolGraphNodeSchema.description` → optional
   (`reference/coreSchemas.ts`). Nothing else in that schema changes.
2. **Code mirror lock-step:** `TOOL_GRAPH_NODE_MIRROR` (`kinds.ts` ≈L106)
   flips `description` to `required: false`. The mirror must never disagree
   with the Zod schema it mirrors.
3. **Read-side SSOT fix (this is what makes 1+2 actually visible):** for a
   **CORE** kind, `api/admin/kinds.ts` serves `field_spec` / `code_schema_ref`
   from `KIND_REGISTRY`, not from the stale DB row — because for CORE kinds the
   code Zod schema IS the SSOT and the DB `field_spec` is, by `kinds.ts`'s own
   header, a read-only display mirror. **SOFT kinds are untouched**: their
   `field_spec` is genuine DB-editable governed structure and must keep coming
   from the DB. A CORE kind present in the DB but absent from `KIND_REGISTRY`
   (a retired kind) must fall back to the DB value, never blank.

**Then close the class, not just the instance:** add an invariant test that,
for **every** CORE kind in `KIND_REGISTRY`, each field's `required` flag in the
code field-spec mirror matches the corresponding Zod schema's optionality. A
future CORE schema edit that forgets its mirror then fails CI instead of
silently making the panel lie. This is the part that stops the debt recurring.

**Evidence required:** a `tool_graph_node` draft with NO `description` passes
the schema stage (RED before, GREEN after — show both) · every existing
published `tool_graph_node` row still validates unchanged · a test that a
stale/divergent DB `field_spec` on a CORE kind can no longer reach the panel ·
a test that a SOFT kind's DB `field_spec` still does · the new CORE
mirror-vs-Zod invariant test, with a deliberate temporary mismatch shown
failing.

### G3 · Self-verify *(was G2 in v1)*

- Do-not-touch greps, pasted verbatim: no new migration · `composeArmes.ts`
  unchanged · `evalGate.ts` staging engine / `GATE_STAGES` / schema interpreter
  unchanged · `selfSeedReconciler`'s absence-only branch unchanged · no
  `prompt.segment` publish · F163's `tool_doc` serve path
  (`resolveToolDocs.ts`, `stageTools.ts` composition,
  `gatewayCapabilityIndex.ts`) unchanged · no CORE schema other than
  `ToolGraphNodeSchema.description` touched.
- `npm run build` · `npm run lint` · `npm run test` · `npm run test:rule26`.
- Reseal only if a mapped file drifted; report `docVersion` before/after and
  the `check:doc-drift` verdict.
- `.agents/CHANGELOG.md` + `cwf-project-kb` SKILL.md. Record that v1's named
  deferral is now **CLOSED by G2**, not carried.

---

## §4 · REPORT FORMAT

One report: branch · pushed SHA(s) · `git diff --stat` vs `aeda744` · the CI
conclusion **on the final head** (if a docs amendment moves the head, re-verify
CI on the new head before reporting green — the S61-CLEAN-1 precedent) ·
per-gate evidence including G2's red→green and the invariant test's deliberate
failure · the do-not-touch greps · `docVersion` before/after · anything you had
to STOP on.

**Do not merge.** FAST-GATE review first; the merge instruction arrives as a
single GO block with the message embedded in `--subject`/`--body`.

<!-- END · claude-code-PHASE-S61-CLEAN-2-v1_2 · rev 1.2 · 2026-07-23 -->
