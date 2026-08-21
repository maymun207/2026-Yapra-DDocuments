# CWF — v1 SCOPE CUT · v1_1
<!-- cwf-v1-scope-cut-v1_1 · 2026-07-30 · S70 · Architect: Claude.
     Supersedes v1_0 (ratified R1–R4 same day; v1_0 immutable per S37-1).
     Delta: §4's declared unknown is RESOLVED — the legacy-B5 pass (step 0) ran.
     Floor unchanged: origin/master 8434efcc · rev 162 · 387/4318 · 59 migrations
     · docs/adr 11. Sources: cwf-master-plan-v5_2 §1 BLOCK 5 (the carrier list),
     register v66 (dev-preview wording), the repo's own code+tests+CHANGELOG at
     8434efcc, and targeted conversation-history reads. NOT from any memory index. -->

## §0 · What changed from v1_0

v1_0 §4 declared one unknown: the legacy-B5 list inherited from master-plan v5_2,
whose item-level wording predates register v60 and was never carried forward. The
pass ran. Result: **one addition to Bucket A (A9, likely zero-cost) · one item
found CLOSED IN CODE (F122) · four items with LOST WORDING routed by a new rule ·
everything else confirmed v1.1.** v1_0's prediction ("0–3 additions, the
security/deployability ones") held.

Everything ratified in v1_0 (R1–R4: the definition, T1/T2/T3, Buckets A and B)
stands unchanged. This version only adds the step-0 verdicts and one rule.

## §1 · THE DEFINITION (unchanged, restated for self-sufficiency — S63-2)

> **v1 is the smallest complete system a Kale operator can rely on safely.**

- **T1 · SAFE** — absence can cause a wrong action, a mutated factory, an
  ungrounded answer presented as grounded, or a leaked secret.
- **T2 · REACHABLE** — sits on a path a real user/operator takes today, with
  today's governed flag values.
- **T3 · DEPLOYABLE** — a real Kale installation fails or needs a manual step
  without it.

**NEW RULE (minted by step 0) — R-EXPRESSIBLE:** *an item whose requirement can no
longer be stated cannot gate a release.* A lost-wording item routes to v1.1
automatically, carrying a named recovery task. Rationale: shipping cannot wait on
a requirement nobody can state; and the classification is falsifiable — recovering
the wording re-runs T1/T2/T3, and a recovered T1 item jumps the queue.

## §2 · BUCKET A — IN v1 (v1_0's eight items + A9)

| # | item | test | status note |
|---|---|---|---|
| A1 | **F212 disposition** — 19 pending `router_proposals` rows | T2 | Owner decision, zero code. Panel now shows per-row guard clause + corpus health. |
| A2 | **F153** — Superset `0.0.0.0` URLs | T3 | Kale/ARDIC ops. |
| A3 | **F203** — `maymun207@gmail.com` has no `auth.users` row | T1 | Identity/audit-trail gap. |
| **A9** | **security-cleanup** — `mcp_settings` 6/6 raw→reference (**NEW**, from v5_2 BLOCK 5 line 1) | **T1** | The WRITE path already rejects raw values for global servers (`api/admin/mcp-settings.ts:89`) and `^MCP_[A-Z0-9_]+$` gates `apiKeyEnv` (`shared/mcpSecrets.ts:23`) — but that proves no NEW raw row can land, not that the six PRE-EXISTING rows were migrated. Data fact, not a code fact. **First step: one Operator read of `mcp_settings` rows' secret-bearing fields (values never echoed — ADR-007: shape only, `raw|ref|env|absent` per row).** If all rows are reference-based, A9 closes at the cost of that read. |
| A4 | **B3 minimum — MEMORY-1 only** | T2 | Carries the A23 cross-turn-carrier contract paragraph (v1_0 §3.4). F48/F83/F83.1 → v1.1. |
| A5 | **Freeze lift + its gated publishes** | T3 | **Step 0 clarifies A5's exact content:** the staged `prompt.segment` publishes ARE the freeze-block list — viz v4 · `safety.b1_scope` v3 · `tools.rule.1` v2 · `tools.rule.6` v2 (these four are what F138/F139/F140 name, per v5_2's own parenthetical) · F133-L5 mint · F83.1 golden sub-items. They were never items to cut separately; they are A5. Validation uses the EXISTING golden batch runner — golden-infra improvements are not a prerequisite (§3.2). |
| A6 | **F214** — code floor vs live catalog divergence | T1 (weak) | Read-set divergence only (ADR-011 binds the floor). First cut under date pressure. |
| A7 | **B6 minimum docs** | T3 | Release-altitude docs of what ships. |
| A8 | **B7 — tag + release notes + remote-branch pruning** | — | Branch cleanup folds in here at zero cost: F222's measurement proved all 26 remote branches are ancestors of master, so "cleanup" is `git push origin --delete` over merged refs, a close-out command, not a phase. |

Ledger work folded into session bookkeeping (unchanged from v1_0): F129 restore +
close against M2 · F222 (relayed, done by AG) · F206 wording correction ·
**F122 close (NEW — §3.1)** · register v71 / KB v69 / bootstrap v69.

## §3 · STEP-0 VERDICTS — the legacy-B5 list, item by item

### 3.1 CLOSED IN CODE, plan list stale — the third ledger-drift instance

- **F122 · CLOSED.** `completionGuard.ts:47` — *"a transient provider error
  (finishReason='error') that an immediate same-provider retry has been observed
  to heal (F122)"* — with four passing F122-named tests in
  `completionGuard.test.ts:88-102`. The behavior lives, is bounded
  (`LLM_EMPTY_RETRY_MAX`), and never chases `content-filter`/`length`. The plan
  carried it as owed work. **Same defect class as F129 (register dropped a live
  item) and F222 (index kept dead items live), third direction: the PLAN keeps a
  closed item open.** Register v71 closes it by name with this evidence.

### 3.2 v1.1 — read, cut by T1/T2/T3

- **Golden-infra: F142 (GOLDEN-BATCH-2) · BUDGET-HONEST-1 · GOLDEN-ASSIST-2 ·
  SPECIMEN-HEALTH-1.** Improvements to a QA instrument. The instrument itself
  (golden specimens + batch runner + coverage strip) exists and works — the
  CHANGELOG's GOLDEN-ASSIST-1 entries record the owner using it live. A5's
  publishes gate on the eval-gate and validate with the runner AS IT IS. Fails
  all three tests. → v1.1.
- **Separate-POC-key belt.** The dangerous half is DONE and tested:
  FENCE-DB-1 (`client.test.ts`) proves `getServiceClient()` fails closed on any
  Supabase ref other than the pinned build DB — the still-live POC database
  (`rsiyilsgclghplpoadlf`) cannot be reached by this system even by
  misconfiguration. The remaining belt is decommissioning/rotating the POC
  project itself: real-world ops on an EXTERNAL system, zero effect on a Kale
  install. → v1.1 ops note; recommend rotation at the owner's convenience.
- **LANGFUSE-V4-UPGRADE.** Observability infra upgrade. RULE-27:
  observability-down ≠ chat-down; the floor holds on v3. → v1.1.
- **STAGE-PLAYGROUND.** Admin-panel feature. → v1.1.
- **Dev-preview seam residuals.** Register v66's wording locates this in the
  rule26 e2e flake family (Vite transform middleware parsing an API URL as TS —
  the exact artifact UI-CURATE-1's C-8 observation reproduced). That family is
  F196, already parked with a binding posture. → v1.1, merged into F196's line.

### 3.3 v1.1 by R-EXPRESSIBLE — wording lost, recovery named

- **F118 · F119 · F120 · F135.** Not in registers v60–v70 (v59_7 chain broke at
  the S62 archive event), not in the repo CHANGELOG's surviving window, not in
  code comments (repo-wide grep: zero hits each). Circumstantial evidence they
  were small: v5_2 filed them under "Little items + cleanup / F-number tail"
  behind B3 and B4 — a T1 item would not have waited there. But circumstance is
  not wording. → v1.1 with **RECOVERY-1**: targeted conversation-history search
  per id at the start of the v1.1 cycle; recovered wording re-runs T1/T2/T3;
  irrecoverable ids close as `LOST@S70` with this paragraph as the record.
- **BOARD-WALK residuals.** GATE-0 is ✓ in the plan, so the walk happened and
  closed; the checklist's own end-state contract says findings went to
  `cwf-board-walk-findings-v1` — a file NOT in the working set, and its content
  is not in any surviving register. Whatever "residuals" meant, nobody can state
  it today. → v1.1 under RECOVERY-1. (The three F-BW ids that DID survive —
  F-BW11/12/13, carried in v62 §6 — are already in the parked set and unaffected.)

### 3.4 The general lesson, so it stops recurring

Four ledgers have now drifted in four directions in one week: the register
dropped a live item (F129), the Author index kept dead items live (F222), the
plan kept a closed item open (F122), and an archive event orphaned item wording
entirely (F118-family). One rule covers all four and both lanes have now adopted
its halves: **a live-state claim must be derivable (F222's rule, AG-side) and a
carried item must be expressible (R-EXPRESSIBLE, Architect-side).** Register v71
carries both as standing laws S70-1 and S70-2.

## §4 · THE v1 PATH — updated

```
 1. A1  F212 disposition           (owner decision, zero code)
 2. A9  mcp_settings secret-shape  (ONE Operator read; closes or becomes a phase)
 3. A3  F203 identity row          (same Operator prompt as A9 — one relay)
 4. A2  F153 Superset URLs         (Kale/ARDIC ops)
 5. A6  F214 outage-floor refresh
 6. A4  MEMORY-1 (+ carrier contract paragraph)
 7. A5  freeze lift + the four publishes + F133-L5 + F83.1 sub-items
 8. A7  B6 minimum docs
 9. A8  B7 tag + branch pruning
```

Nine steps; two are decisions/ops, one is likely a single read. The two-to-three
working-week estimate from v1_0 §5 stands — step 0 added at most one read and
possibly one small phase (A9's migration IF the read finds raw rows).

## §5 · RATIFICATION DELTA

v1_0's R1–R4 stand. New for the owner:

- **R5** · A9 into Bucket A, with its Operator read as the next relay.
- **R6** · R-EXPRESSIBLE as a standing rule (→ S70-2), and RECOVERY-1 as a v1.1
  task rather than a v1 blocker.
- **R7** · F122 closed on the code evidence in §3.1.

<!-- END · cwf-v1-scope-cut-v1_1 · 2026-07-30 · S70 · floor 8434efcc / rev 162 -->
