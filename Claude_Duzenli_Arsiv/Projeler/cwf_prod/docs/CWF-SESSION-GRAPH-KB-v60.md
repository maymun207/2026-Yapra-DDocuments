# CWF — Session Graph KB · v60
<!-- CWF-SESSION-GRAPH-KB-v60 · 2026-07-23 · adds S61 ("THE DEBT DAY") to v59.
     Prior sessions carried by pointer (v59 and earlier). GOLDEN LEDGER: the
     digest may shorten, nothing is dropped — register v62 holds the full item
     ledger; this KB holds the session NARRATIVE + lessons. -->

## S61 · 2026-07-23 · "THE DEBT DAY"

**Arc in one line:** shipped F163 (the fourth and final tool-information
source) and proved it live, then — on an owner directive that stopped the
session's forward motion cold — turned around and cleaned every defect that
verification had surfaced, refusing a labelled workaround as a fix.

**Floor:** `a8ecd6d`(S60) → `ebdc020`(TOOL-DOC-1 v1+FIX-1, PR#105, rev 138) →
`aeda744`(S61-CLEAN-1, PR#106, rev 139) → `f551bc0`(S61-CLEAN-2 v1_2, PR#107,
rev 141 · 350 test files · ~3711 tests). Three merges, **zero migrations, zero
Operator apply, zero golden runs.** All three merge messages landed as authored.

**Chapter 1 — F163, and the Architect auditing the Architect.** The design note
(`cwf-tool-doc-overlay-design-v1`) was written the previous session. Before
authoring the phase prompt, a pre-authoring grep sweep against the real tree
falsified FOUR of its own mechanism claims: `tool_annotation` is not
per-backend-derived (kind ids are three literal maps), the warm slice is PROSE
so "zero new reads" was false, there is exactly ONE `streamText` site so
"one small completion" needed the `semanticRouter` one-shot precedent named
explicitly — and, unnamed in v1, **the eval-gate catalog is armes-only**, so
the advertised dead-overlay rejection would never have fired for a gateway
backend. Design v2 was minted (v1 immutable, S37-1) and the phase built on
corrected ground. AG then found a fifth gap the Architect had missed:
`tool_doc`'s deliberate zero-seed-content design meant `selfSeedReconciler`
would never provision its `rule_kinds` rows — solved generically via a new
`SeedDomain.kindsOnly`, not a tool_doc-specific patch.

**Chapter 2 — FAST-GATE catches a lane-locking defect.** Review of PR#105 found
that `governance.ts` assembled the tool_doc catalog only when the DRAFT was a
tool_doc kind, while `runGate`'s candidate is the WHOLE published backend set.
The moment the first `superset.tool_doc` row existed, every unrelated Superset
publish would have been rejected with "tool_doc: catalog not synced" —
accusing the wrong kind and locking the governance lane BLOCK 2 had just
closed on. **The defect originated in the Architect's own phase-prompt
wording** ("a catalog for a tool_doc publish"), not in AG's implementation;
owned as premise-error #9. FIX-1 moved the trigger to candidate scope, proven
red→green at the SERVICE level (a `runGate` unit test passes `catalog:
undefined` by hand and structurally cannot catch it).

**Chapter 3 — the live walkthrough, and four findings in an hour.** The owner
opened the panel to write the first overlay and it wasn't there (**F167**);
the kind provisions only from `warm()`, i.e. the chat lane. A chat turn
materialised it (`[Seed] kind-provisioned kind=armes.tool_doc`), and the
publish went through the gate (`f720918f`). The first verification turn
short-circuited on a false clarification for `"Glazur3 hattı"` (**F170**) and
did so in ENGLISH inside a Turkish dialogue (**F171**). A second turn sealed
F163 end-to-end: trace `464665f1`, `[ToolDoc] backend=armes composed=1
mode=append` with a complete LLM turn. The screen also showed
`getLineStopsReportForZones ×1` — a tempting "the note worked!" — **explicitly
refused as evidence**: the note's text contains no batching instruction and
the offered tool set had grown 9 → 54 tools between the turns. Two variables
moved; no causal claim. Meanwhile the panel's own `tool_graph_node.description`
turned out to be a REQUIRED field the agent never reads (**F168**).

**Chapter 4 — THE OWNER DIRECTIVE.** Offered a choice between batching the
findings or moving to BLOCK 3, the owner rejected both: *"bunları temizlemeden
hiçbir yere gitmiyoruz; arkada çöp bırakarak ilerlemek yok."* S61-CLEAN-1
(F169/F170/F171) and S61-CLEAN-2 (F167/F168) followed. When v1 of the latter
proposed labelling the dead field and deferring the requirement, the owner
rejected that too — **a warning label on a broken thing is not a fix** — and
v1_2 was minted MID-FLIGHT (S55-2: fold as one in-branch commit, never restart
the AG) carrying the root removal. The trap named before prescribing: relaxing
the Zod alone would have been INVISIBLE, because `selfSeedReconciler`'s
ABSENCE-ONLY LAW never rewrites an existing `rule_kinds` row. Solved on the
READ side (`reconcileCoreFieldSpecs`) so the law was not amended — and closed
as a CLASS via an invariant test walking every CORE kind, with a
deliberate-mismatch companion proving the checker can fail.

**Chapter 5 — F169 fails in production, and the confound that nearly hid it.**
Post-merge live reading showed the `[Obs] flush failed … 5000 ms` line
UNCHANGED: 7 of 9 no-op ticks still failing. The Operator's Supabase read then
revealed a 12-minute availability incident (06:44–06:56 UTC, zero PostgREST
logs) **overlapping most of that sample** — so the evidence was contaminated
and the conclusion was withdrawn pending re-measurement. The post-incident
window (06:57–07:05) showed the identical 7/9 rate: the outage was not the
cause, and F169 is genuinely unfixed. The same Operator read closed **F173**
(`'preview'` from the dev harness hitting `mcp_settings.user_id` uuid, 591
executions since 2026-07-09) and separated it from the BENIGN `seed_state`
23505 claim-race errors. LOG-TRUTH-1 was authored with an unusual shape: **G0
instruments and STOPS, G1 is deliberately left EMPTY** for the fix that must be
authored on real data. No second guessed patch.

**Lessons (beyond the rules):**
(a) **The Architect's own artifacts are claims too.** Four of design v1's
mechanism statements and the phase prompt's catalog wording were falsified by
grep and by FAST-GATE — the same TOTAL-45 discipline built for log fields
applies to the Architect's prose about existing machinery. Tally reached 12
across S59→S61; #9 and #12 were caught by the Architect's own verification of
the Architect's own work, which is the intended end-state.
(b) **A contaminated sample must be re-measured, not reasoned away.** The
outage overlapped the F169 evidence; the conclusion survived, but only because
it was re-taken. Had it not survived, shipping the first read would have been
a false finding written into the ledger.
(c) **`git stash` is not a clean checkout** (S61-1) — it manufactured a false
pre-existing-drift claim, and a stash without `-u` separately manufactured a
false test baseline. Only a fresh clone to the target SHA settles it.
(d) **Relay payloads can arrive truncated** (S61-3). AG refused to merge on a
cut-off `--body` rather than improvising — the correct behavior, and the reason
merge instructions now carry a tail anchor.
(e) **A real outage validated the architecture.** Twelve minutes without a
database and the system said "code floor will serve" instead of fabricating.
The DB-first/code-floor law stopped being a design claim and became an
observation.
(f) **A working pipeline is not a useful pipeline** (F172). The first overlay
published was a tautology; the mechanism is proven, the knowledge is not yet
there.

**S61 premise tally: 4 new** (#9-#12). **Session artifacts:** register v62 · KB
v60 · bootstrap v60 · design v2 · 4 phase prompts (TOOL-DOC-1, S61-CLEAN-1,
S61-CLEAN-2 v1/v1_2, LOG-TRUTH-1) · 3 merges · 1 Operator diagnostic read ·
7-finding day (F167-F173).

<!-- Prior sessions: see CWF-SESSION-GRAPH-KB-v59 and earlier. -->
<!-- END · CWF-SESSION-GRAPH-KB-v60 · 2026-07-23 -->
