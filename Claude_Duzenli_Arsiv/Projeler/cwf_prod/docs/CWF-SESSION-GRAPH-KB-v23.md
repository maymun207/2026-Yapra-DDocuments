# CWF — Session Graph KB · v23
<!-- rev 23 · 2026-07-06 · Supersedes v22 and RECONCILES two parallel session threads (§1). Ground truth =
     repo CHANGELOG at master HEAD bf3d95d. This window closed the Replay-microscope line: REPLAY-A2
     (routing lens) · PRIMER-COLLAPSE-1 · PERTURB-1 (Part A A/B perturbation LIVE+audited) · REPLAY-UX-4
     (specimen-first). master HEAD bf3d95d (1013/93, rev 47, drift OK). Queue: cwf-open-items-register-v23.md. -->

## §0 One-paragraph state
On top of the v22 MCP-config close (RULE 29), this window brought the Replay microscope to a finished,
usable state in four gated phases. **REPLAY-A2** widened the deterministic per-stage governance lens from
grounding (A1) to **routing** — a no-LLM read that answers "would the governed routing @ version X still
offer this past turn the tools it needed," with the availability floor kept sacred by reusing production
code. **PRIMER-COLLAPSE-1** fixed an irreversible admin-primer dismiss (never renders null again).
**PERTURB-1** activated the UI's "Part A · single-request replay" shell as a LIVE, **audited** two-armed
A/B (baseline vs perturbed) over the shipped REPLAY-B engine — reuse, not rebuild — with an atomic token
budget, one paired audit row, and a Wilson-CI delta that refuses to claim an effect when the intervals
overlap. **REPLAY-UX-4** fixed the backwards IA by lifting the shared specimen picker into a top ① Specimen
section above both experiments. All four were fresh-clone RULE-25 verified. master HEAD `bf3d95d`
(1013 tests / 93 files / docVersion rev 47 / drift OK).

## §1 DUAL-SESSION RECONCILIATION (why this KB exists)
Two chat threads advanced the repo in parallel. **This thread** ran the v21→v22 MCP-config marathon (ending
`c9f34cf`, sealed v22). The **"Dokuman okuma-backtothefuture" thread (356f9823)** resumed from v22 and drove
the four Replay phases above (ending `bf3d95d`). The owner then re-entered THIS thread by mistake; not
knowing the other existed, this thread re-reviewed PRIMER-COLLAPSE-1 (already built) and re-derived the
PERTURB-1 + REPLAY-UX-4 phase prompts, then RULE-25-reviewed the built results. **No divergence resulted** —
the repo is one reality, and both threads' reviews independently confirmed the same commits. Lesson locked:
the repo + the latest register/KB v* are the ONLY resume source; a chat's own memory is not authoritative,
and "the KB looks stale" is the signal to reconcile against `origin/master`, not to rebuild.

## §2 What shipped (all fresh-clone RULE-25 verified)
- **REPLAY-A2** (`3f8b639`, rev 46, 940→980) — `routeKeywordLayer` pure-core extraction (learned map became
  a PARAMETER; production keyword-path byte-identical) + `routingSlice.ts` `{floor|live}` (floor = empty
  learned map = code CATEGORIES; live = `tool_cache`; degrades to floor, never throws) + GET
  `?routingReplay=&version=` (REPLAY_RUN, C9 NAME-ONLY, no audit — pure GET). The router LLM
  (`routerSelectCategories`) is NEVER invoked; a no-match is an honest counterfactual, never fabricated.
  `ALWAYS_INCLUDE` unioned on every path (floor sacred). UI: "Routing @" beside "Grounding @".
- **PRIMER-COLLAPSE-1** (`ff46bf3`, 980→983) — `PanelPrimer` collapse⇄expand; no absorbing state; sessionStorage;
  legacy `'dismissed'`→collapsed. `InlineHelp` banner left on localStorage (tracked-small).
- **PERTURB-1** (`b6ba5d3`, rev 47, 983→1008) — `pairedReplay.ts` (`runReplayExperiment` ×2, atomic budget
  `max(0, budget−spentA)`, `wilsonInterval` + `computePairedDelta`) + POST `mode:'ab'` (one paired
  `replay_audit` row, no reply/payload/secret; no-mode Part B byte-identical) + full §PARITY UI. Wilson
  overlap ⇒ "not distinguishable from noise" (conservative — suppresses, never manufactures, a claim).
- **REPLAY-UX-4** (`bf3d95d`, 1008→1013) — shared picker lifted to a top ① Specimen section; one `specimenId`;
  both run buttons gated + "① select a specimen above" hint; picker moved inline (NOT a nested component —
  a nested wrapper would remount the search input each keystroke and drop focus). Zero run-behavior change.

## §3 Key learnings (this window)
- **Reuse-not-rebuild is a testable invariant.** PERTURB-1's `pairedReplay` calls the shipped engine twice;
  the review grep-proved zero new rep loop / scorer / stub / budget. REPLAY-A2's routing lens reuses the
  production `matchCategories`/`getToolsForCategories`/`ALWAYS_INCLUDE` core so the lab floor cannot drift
  from production. When a "widen" starts adding an engine, it drifted from reuse.
- **Wilson-CI honesty.** A stochastic A/B needs N-rep-per-arm; a 1-vs-1 shot is "illustrative, not evidence."
  The delta reports CI separation and only ever SUPPRESSES a confident claim (overlap ⇒ noise) — the
  conservative direction that matches the standing stochastic-verification discipline.
- **The availability floor is sacred in the lab** (routing), same shape as `empty≠zero` (grounding): a
  no-keyword-match returns the floor set + an honest counterfactual, never `offered=0`.
- **IA: shared input first.** The specimen is the one upstream input to both experiments → it belongs ABOVE
  them, once, not buried in the downstream one. "Driver's seat from the passenger door" is the smell.
- **Nested-component focus-drop.** A controlled input wrapped in a nested function component remounts on every
  keystroke (new component identity) and silently drops focus — keep such JSX inline.
- **`list_deployments` not exposed this session** — "what's live" inferred from newest-serving deploymentId +
  probe logs (idle-factory caveat).
- **Owner-honesty (this thread):** two wrong diagnoses were made during the MCP marathon (an over-strong
  "JSON is dead" and a token/transport-first guess) and each was corrected by reading the production logs —
  the lesson (read the real status class before proposing a fix) is carried forward.

## §4 Verified anchors + commit ledger
- master HEAD **`bf3d95d`** — 1013 tests / 93 files / docVersion **rev 47** / drift `[OK]`.
- From v22 close `c9f34cf`: REPLAY-A2 `…`·`3f8b639` (rev 46) → PRIMER-COLLAPSE-1 `78aed2b`·`ff46bf3` →
  PERTURB-1 `2d3bccf`·`b6ba5d3` (rev 47) → REPLAY-UX-4 `…`·`bf3d95d`.
- Prod serves the latest master deployment. `mcp_secrets`: `armes-daily-token`, `supersettoken` (set, UI-rotatable).
- AWS unchanged: `i-030c2b4fadebfa229`, CloudFront, `cwf-prod`, eu-central-1; bootstrap key DEACTIVATED; budget-stop STANDBY.
- RULES current through RULE 29 (24 amended for the per-stage lenses + Part A live).

## §5 Open queue → cwf-open-items-register-v23.md
LIVE (next, in order): **Part A widen — SCOPE/AUTHORITY** (the third per-stage lens) · endpoint switcher
(inherits the `mcp_secrets` store for its keys) · GOVERN polish continued · P7 · ARMES-401 (subsumed).
DEFERRED: AWS-DENY-1 · Langfuse SSO (rising) · AWS README harden-later. Tracked-small: InlineHelp localStorage
· routing preview deferred · perturbation single-shot label · REPLAY-A1 edit-diff · replay_audit status-null
· ToolFilter dedup · act() RTL.
