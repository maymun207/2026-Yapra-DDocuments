# PHASE `ONBOARD-RECONCILE-1` — the system heals its own governance state

<!-- claude-code-PHASE-ONBOARD-RECONCILE-1-v1 · rev 1 · 2026-07-14 · Session 43. EMERGENCY,
     takes the queue head. Branch `onboard-reconcile-1` from origin/master (expect 81a6ab0).
     Ceremony: FULL (api service exports + scripts + tests), NO migration, NO UI this phase.
     FAST-GATE review (S43-2). CI-green on head = merge precondition.

     WHY (today's evidence chain — every item found by a HUMAN CLICK, one landmine at a time):
       publish blocked by orphan tool_graph_node (ForZones)
       → human archives it → publish blocked by orphan tool_format_rule (ForZones)
       → human archives it → publish blocked by PHANTOM tool in a SEED category
         ('machine' contains getMachineNotifications — absent from the live 141-tool mirror;
         a months-old routing defect the new gate caught on day one).
     The gate is doing its job. The EXECUTION MODEL is what failed: drifted state must be
     reconciled by a machine that derives the WHOLE dependency-ordered fix and executes it —
     not by iterating a human through rejections (S43-3, owner-legislated).

     Findings folded: F98 phantom category tools (≥1 confirmed: machine/getMachineNotifications;
     the reconciler ENUMERATES the rest) · the ForZones archive/restore dance · publish
     dependency ordering (annotations → categories → nodes → format rules). -->

---

## 0 · PRE-FLIGHT GATE
```bash
cd /tmp && rm -rf cwf_yaprak && git clone --quiet https://github.com/maymun207/cwf_yaprak.git
cd cwf_yaprak && git rev-parse origin/master     # expect 81a6ab0; if moved, re-derive
npm ci --no-audit --no-fund --silent && npx tsc -b && npm run typecheck:api
npx tsx scripts/checkDocDrift.ts                 # [OK]
```

## 1 · BINDING CONSTRAINTS
1. **The gate does not move** — `evalGate.ts` / `governance.ts` publish internals: empty diff.
   Every executed action goes through the EXISTING service methods (`publish`, `archive`,
   `rollback`, `updateDraft`) — gated, audited, `[Gate]`-logged exactly as a panel click. New
   surface = derivation + orchestration only (small exported helpers on the service are fine;
   its decision logic is not).
2. **Two modes, dry-run default.** `npm run reconcile:tools -- --backend=armes` prints the
   FULL ordered plan (action · target · REASON) and executes NOTHING.
   `--execute` runs it action-by-action, prints each verdict as it lands, **halts on the first
   unexpected rejection** with the gate's full error list (born loud, S41-1).
3. **Idempotent & convergent (S31-1):** on a converged state the derived plan is EMPTY and the
   run says so. Re-running `--execute` after success is a no-op. A halted run re-derives from
   live state on the next invocation — no stored plan, no partial-state amnesia.
4. **Human judgment is INPUT, never bypassed:** the reconciler NEVER invents or flips an
   exposure. Annotation drafts are published with the exposure they carry (the owner's edits
   included). A tool with NO annotation draft/row stays out of categories (fail-closed F80
   preserved). Write-exposed tools are never added to any category by this tool.
5. **Actor & attribution:** actions run as the invoking identity — the script resolves the
   super_admin user id from an `--actor <email>` arg (looked up server-side), never a
   hardcoded uuid, never NULL (these are human-consented actions; S33-1 applies only to true
   machine actors, which this is not: the human consented by running `--execute`).
6. **C1 LAW · no migration · secrets env-only · vitest `include` excludes `scripts/**` ⇒ all
   tests live under `api/cwf/__tests__/` over the extracted pure derivation module.**

## 2 · THE DERIVATION (pure module: `api/cwf/_lib/knowledge/reconcileToolGovernance.ts`)
Input (all read from live via existing repositories at run time; injected as plain data for
tests): mirror rows (name+status) · ALWAYS_INCLUDE · published rules (all kinds) · draft rules
(all kinds) · archived rules for the restore step.
Derive, in this exact dependency order:

1. **PHANTOM SWEEP (F98):** for every PUBLISHED `tool_category`:
   `phantoms = tools − (mirror.ANY-status names ∪ ALWAYS_INCLUDE)`. For each category with
   phantoms → plan a category re-publish whose payload = `(published.tools − phantoms)`,
   MERGED with that category's staged draft additions if a draft exists (one final payload per
   category; the draft row is updated, never duplicated). Every removed phantom is listed with
   reason `phantom: absent from live catalog`.
2. **BLOCKER SWEEP:** any PUBLISHED `tool_graph_node` or `tool_format_rule` whose tool will
   NOT be covered by the post-plan category set ∪ ALWAYS_INCLUDE → plan `archive` with reason
   (`orphan node/format-rule blocks all publishes`). (Today's two are already human-archived —
   the derivation must detect the already-archived state and simply not re-plan them.)
3. **ANNOTATIONS:** every `tool_annotation` DRAFT → plan `publish` (exposure as drafted).
4. **CATEGORIES:** every `tool_category` draft (incl. §2.1 merged payloads) → plan `publish`.
5. **RESTORE:** every ARCHIVED `tool_graph_node` whose tool IS covered post-§4 → plan
   `rollback→publish`; then every ARCHIVED `tool_format_rule` whose tool has a published node
   post-restore → plan `rollback→publish`. (Node before format rule — the format check is
   graph-based until F97.)
6. **REPORT-ONLY tail:** anything that cannot converge (e.g. a format rule whose tool has no
   node and no draft) is PRINTED with reason, never silently skipped.

## 3 · THE RUNNER (`scripts/reconcileToolGovernance.ts` + npm alias `reconcile:tools`)
Wires repositories → derivation → (dry print | execute via service). Output per action:
`#07 publish tool_annotation/completeShipment → PUBLISHED v1` or the gate's errors verbatim.
Exit code 0 only on converged/empty-or-fully-applied; non-zero on halt.

## 4 · WHAT MUST NOT MOVE
Gate engine & governance internals (empty diff) · BULK/GB-1 surfaces · seeds · turn path
(grep: no new imports) · panel (no UI edits this phase).

## 5 · SELF-VERIFICATION (paste each)
1. Anchor · branch · PR URL · **CI green on head**.
2. Empty-diff list on gate/governance internals.
3. Fixture test reproducing TODAY exactly (phantom `getMachineNotifications` in machine ·
   ForZones node+format archived · 29 annotation drafts with 3 write-flips · category drafts)
   → dry-run plan equals the expected ordered list; simulated execute converges; second
   derivation is EMPTY (idempotence).
4. Halt-on-rejection test (injected failing rule) → non-zero exit + full errors printed.
5. Exposure-inviolability test: reconciler output contains zero exposure mutations.
6. `tsc` · `typecheck:api` · drift/reseal rev. (No local suite — CI is the arbiter, S43-2.)

## 6 · OWNER STEPS (the whole remainder, after merge)
1. `git pull && npm run reconcile:tools -- --backend=armes --actor <owner-email>` → paste the
   printed plan (the Architect eyeballs it once — the ONLY human review left).
2. Same command `--execute` → paste the action log. Converged = the 29 + categories + restores
   are DONE, by the machine, through the gate, fully audited.
3. A3 question to Gemini (a real-world test — genuinely human).
4. Rules → System → Prompt → `viz` → **"Altın koşuyu başlat"** (a spend consent — genuinely
   human) → return → **Publish**.

<!-- END · claude-code-PHASE-ONBOARD-RECONCILE-1-v1 · rev 1 · 2026-07-14 -->
