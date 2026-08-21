# CWF — SESSION GRAPH KB · v50

<!-- CWF-SESSION-GRAPH-KB-v50 · rev 50 · 2026-07-19 · Adds S51 to the graph.
     Supersedes v49. Earlier sessions: see v49 and back (unchanged, carried by ref). -->

## S51 (2026-07-18 → 07-19) — "Fence, re-walk, unify, stop the bleeding"

**Floor moved:** 3d115b9 (rev 108) → **186277c (rev 112)**. Five merges:
1. **FENCE-DB-1** (a21d046, rev 109) — getServiceClient fails closed on wrong Supabase
   project ref (two live DBs discovered: governed fjbrkimwvtpwoxhziidh vs live POC
   rsiyilsgclghplpoadlf). Prod-sealed `[Fence] ok`; Gemini Operator config pinned +
   live-verified; Step-0 project-confirm made constitutional. Separate-POC-key belt
   DEFERRED (owner: fence suffices).
2. **WAVE2-IA-2** (4998270, rev 110) — rule_kinds.surface ('parameter'|'rule',
   backend-agnostic, PLATINUM: a future backend's kind self-places) drives the
   data-derived Ayarlar/Kurallar split; rename residue swept; Tweak session-only
   framing. Migration applied+verified (parameter:1/rule:19).
3. **STAGES-FIX-4** (d83059a, rev 111) — the three systemic re-walk hotfixes:
   F-S00-a stage→Rules deep-links carry kind/key/keyPrefix + 'stages' arrival strip
   (wiring, not building — the machinery existed); F-S01-a ONE named doc tab;
   F-S01-b Langfuse chips → the caller's latest turn's per-TRACE URL (own-user-scoped
   api/admin/latest-turn-trace.ts; v3.205 has no per-span URL — owner's design).
4. **GOV-UNIFY-1** (21dd981, no reseal) — Rules + Kinds merged into ONE hierarchical
   GovernanceTab (owner-reached: "collapse-all = a Kinds list"). Kind = collapsible
   header (shape · CORE/SOFT humanized · N rules · fields ▸), rule = instance beneath;
   provenance floor/edited; views explained; Stage-06 consumption link; RS-6 dead
   surface-toggle fixed. Both ?tab= ids alive. KindsTab deleted.
5. **ROUTE-HYGIENE-1** (186277c, rev 112) — the learn write-path gains
   normalizeLearnToken (punctuation stripped pre-guard AND pre-key) +
   LEARN_MAX_CATEGORIES=3 whole-turn broad-set skip + born-loud per-turn summary.
   Purge migration applied: **342→104 rows (~70% junk)**, 2 pinned survived, epoch
   9→10, idempotent second push.

**The owner's two S51 arcs (both vindicated by data):**
- **Re-walk arc:** main Stages walk 00-14 (findings-v5) + three sub-walks (Rules+Kinds
  → RS-1…11; Tool Matching → TM-1…8; Data Authority → DA-1…6). Diagnosis: engine
  solid, face weak — same illnesses everywhere (backend hidden, jargon, context-free
  deep-links, unresponsive layouts, blurb docs). Three structural redesigns emerged:
  GOV-UNIFY (shipped), 1b Tool-Matching flow, 1c Data-Authority. Pillars named:
  **SET-CONTEXT** (the oscilloscope), **F-DOCS-ENRICH** (final combined docs+arch
  pass, owner-legislated LAST), **MEMORY-1** (episodic, 05+14, unblocks F83).
- **Panic → measurement arc:** owner's "deterministic-safe but answers nothing" panic
  met with evidence: last-5-turns console read + value-safe telemetry ledger read
  (Gemini) + token verification. Result: trust spine CLEAN (0 safety catches/24h);
  real issues are behavioral (LOG-2 fetch-much-answer-little → F83) + hygiene (LOG-1
  stopword pollution → fixed same session) + a small leak (LOG-3 finishReason=other
  token-NULLs → open). Web research confirmed the architecture is at the field's
  frontier (tool-retrieval/two-stage routing is the industry answer; flat keyword
  degrades at scale — the owner's fear is a KNOWN problem class). Re-sequenced:
  measurement-first (SET-CONTEXT fast-tracked), ROUTING-ARCH decided ON evidence
  (~2 weeks of mismatch data), 1b after the engine decision.

**Owner decisions (locked):** faithful-default/lab-opt-in SET-CONTEXT; pipeline-wide
snapshot; three v1_2 additions (mismatch telemetry / routing_map_hash / engine-tagged
03-07 contract); "Kurallar / Rules" single nav entry (NAV-SINGLE-1); security-cleanup
in its own later block; docs+arch as ONE closing process at the very end.

**Security event:** owner cut-and-paste exposed raw mcp_settings Bearer tokens →
rotated (one-click store rotate). Value-safe DB introspection then proved the REAL
state: 6/6 servers raw-credential, 0 reference (store exists, unreferenced) → the
raw→apiKeyRef legacy migration is a named security-cleanup item. Lesson: screens
lie; disciplined queries don't.

**Session lessons:** RTF-recovery pattern (attachments unreliable; sed-strip from
uploads) · doc-drift likelyCulprits ≠ verdict (2nd false alarm; verify master with
CI=1 mode) · secret-table reads = explicit columns only · owner meltdown responded
with evidence + honest self-correction (twice retracted own wrong framings:
"cilaladın" and "systemic silent-finish").

**In flight at close:** AG building **SC-1** (anchor 186277c). Pending on its merge:
both DOC-FLIPs (surface + hygiene migrations, comment-only). Next after: SC-2 →
2-week measurement → ROUTING-ARCH → 1b → 1c → MEMORY-1 → security-cleanup →
final docs+arch.

**Artifacts minted (S51):** designs — governance-unify v1, stages-fix-4 v1,
set-context v1/v1_2; phases — GOV-UNIFY-1, STAGES-FIX-4, ROUTE-HYGIENE-1,
SET-CONTEXT-1, WAVE2-IA-2, FENCE-DB-1 (+operator prompts: IA-2 apply,
db-introspection, telemetry-read, purge-apply); ledgers — stages findings-v5,
subwalk-findings-v1, register v53, bootstrap v50, this KB v50.

## Prior sessions
S50 and earlier: carried unchanged — see CWF-SESSION-GRAPH-KB-v49.

<!-- END · CWF-SESSION-GRAPH-KB-v50 · rev 50 · 2026-07-19 -->
