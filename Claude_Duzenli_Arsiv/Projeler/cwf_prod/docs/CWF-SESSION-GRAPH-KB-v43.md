# CWF — Session Graph KB · v43

<!-- CWF-SESSION-GRAPH-KB-v43 · rev 43 · 2026-07-14 · Supersedes v42.
     Adds S44. Ledger of record: register v46. Earlier sessions: v42 and back. -->

## S44 — "the governed-knob night" (2026-07-14 evening)

**Arc in one line:** a red CI gate diagnosed from code+logs, repaired by a governed
smoke subset, then an evening of live A3 use where every defect was caught by an honest
surface and two were fixed by PUBLISHING A PARAM — zero redeploys.

### 1 · The canary wall (F-unnumbered → CANARY-CAP-1, a13fda3)
CI #166 red on eval-canary: `completed:false, tokens 508438`. Root cause arithmetic:
eval-ci ran the FULL golden set (grown to 20 specimens post-BULK-REVIEW) synchronously
under REPLAY_TOKEN_BUDGET's 500k default — one specimen ate it. `baseline:absent` in the
same JSON was the separate, documented-GREEN arm. Design verdict: the gate had not
scaled with what it guards; raising the budget alone would hit serverless duration next.
Fix = governed smoke subset (cap 3 [1,5] · budget 2M [500k,5M], resolveGoldenRunPolicy
pattern verbatim), hash computed over WHAT RAN (longitudinal honesty), the swallowed
`min(REPLAY_TOKEN_BUDGET, request)` re-clamp retired with a single-caller structural
pin, maxDuration 800. Full-set assurance stays with the async golden publish gate. The
second post-merge canary found the first's baseline and ran a REAL longitudinal
compare (`compared/underpowered`) — the L3 design's first live exercise end to end.

### 2 · The two-agent near-miss (S44-1)
Owner spun a second AG for the conditional merge; it turned out to SHARE the first AG's
worktree, saw its uncommitted CANARY-CAP-1 work, and (after the first instance was
killed) snapshotted it as `e077021` — which proved benign and was kept, the resumed
agent building on top. Also observed and prized: the merge-AG REFUSED a master-merge
order that arrived via a side channel until the owner confirmed directly. **Rule S44-1:
one live agent per worktree; parallelism only with separate clones/worktrees.**

### 3 · OUTPUT-BUDGET-1 (905cef2) and the manifest race
PR #45 carried F105's two knobs (maxOutputTokens seed 16384 — "the seed IS the fix";
thinkingBudget gemini-only providerOptions). FAST-GATE caught **F106**: a green test
pinning `minTurn(10k) > GEN_MAX(8192)` whose NAMED invariant ("an allowed turn is never
output-clamped") had silently gone false once the ceiling became governable above
minTurn — retired honestly (FIX-1 71db977), the floor-vs-floor claim kept, the
quota-edge clamp documented as by-design. Both branches had independently resealed the
manifest → pre-merge reconciliation (`83cc6ea` + `c6b9417` fixing a stale-hash
self-catch) re-resealed the MERGED tree to rev 88. Seed ×2: `4 inserted / 8 published`
then `0 / 12` — the S31-1 idempotence evidence verbatim.

### 4 · The A3 evening — publish-as-cure, twice
First A3: complete SHAPE failure — only 1 of 3 lines rendered, no action section, yet
`finishReason=stop` at 17% of the output ceiling. The fingerprint: `reasoning=2047` —
pinned to the 2048 thinking cap. Yesterday's disease inverted: the answer no longer
starved FOR the thought; the thought starved the answer's PLAN. Cure = publish
thinkingBudget v2=8192 (the [Gate] born-loud line observed live). Re-ask: reasoning
8188, output 10,699 (3.7×), full four-section report with Aksiyon/Hedef pairs and the
empty≠zero doctrine spoken in prose ("IKINCILUST gibi barkodsuz zonlarda fire ARMES'te
görünmemektedir"). **F109** minted (reasoning saturates any cap) → THINK-CLAMP-1
(ed414a5): ceiling 16384 + read-time ratio guard min(thinking, maxOut/2) — the F105
recreate-by-publish made structurally impossible, a bound cap surfacing as a loud
`+capped` source suffix. Publish-order recipe on file: 16384 thinking needs
maxOutputTokens=32768 published first.

### 5 · The Superset probes (evidence for SUPERSET-SERVE-1, promoted)
Probe A (bare "granit fırın alt ve üst OEE") → REFUSED as out-of-scope by b1_scope —
**F110**; falsified by re-asking WITH "KB7": full pipeline, getOeeValuesForZones, 334
records. Diagnosis: scope-anchor narrowness, not model temperament (F84 weakened —
Gemini also volunteered an 8-item action plan in the A3, unprompted). Probe B (explicit
"Superset'ten getir") → gateway ALIVE, `search_tools` ×2 returned total=0 for
data-vocabulary queries; the model declined honestly AND spoke the authority doctrine
("OEE, ARMES'ten alınan yetkili bir metriktir") on its own. The Claude-Desktop contrast
decoded: Desktop enumerates all ~22 tools into context (discovery without governance);
CWF's search-then-call needs the QUERY-FORM taught. b1_scope v2 (F83.1+F110) and
SUPERSET-SERVE-1 prompt edits batch into ONE golden run + one Consent.

### 6 · Render findings
**F111**: getOeeValuesForZones returns a zone-keyed DICT — the chart binder's
record-derivable inference expects arrays, fell to the honest "no result to chart"
panel under both line headings (VIZ-BIND-1's never-guess discipline held; capability
gap real, and it covers the whole now-workhorse ForZones family). **F107** narrowed:
the markdown-pipe leak died with viz v2 (macros fired); literal `####`/`<br>`/`*`
residue remains. Both → VIZ-BIND-2. **F108** open: "48 duruş" internally consistent
(27+4+17) vs ToolResult `total=43` — arbiter is an Inspect/Replay specimen; meanwhile
the asakai guidance is "use the distribution table, not the single total."

### 7 · Observability legibility (owner-critical, → OBS-LEGIBILITY-1)
The owner could not find tonight's A3 in Inspect and opened the WRONG Langfuse trace
(`0cfc7efd` = noon's TRUNCATED incident) believing it current; root cwf.turn spans show
Input/Output `undefined`. The data was all there — the Architect located both A3 turns
by token counts. Deliverable: design note first — turn-centric Inspect grouping,
root-span scrubbed I/O (ADR-004 permits), stage↔span parity table (00 pre-span by
RULE 28; 13-14 client-side unspannable; real gaps get spans).

### Floor at close
master `ed414a5` · docVersion rev 89 · eval-canary GREEN (smoke subset) · CI unsharded
≥2397/245 · 12 governed agent params (4 minted today) · viz v2 + thinkingBudget v2
published · golden run fabb123b consumed ~10M/12M, verdict underpowered, published.

<!-- END · CWF-SESSION-GRAPH-KB-v43 · rev 43 · 2026-07-14 -->
