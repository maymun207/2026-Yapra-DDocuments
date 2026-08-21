# claude-code-PHASE-ENTITY-FLOOR-1-v1_2

<!-- claude-code-PHASE-ENTITY-FLOOR-1-v1_2 · rev 1.2 · 2026-07-22 · Architect: Claude
     SUPERSEDES v1 (immutable, S37-1). ONE delta, owner-law enforcement: the
     registry SOURCE-TOOL declaration is DATA, not code — no per-backend
     code-floor descriptor.
     Night batch closing today's three live-proven defects: F162 (entity
     clarification over-fire), F161 (TOTAL-45 pagination honesty), F159
     (clarification template locale). Implements the MINIMAL cut of the parked
     ENTITY-FLOOR-1 design (2026-07-20): factory registry mirror + the
     clarification-gate consumer. Amendments mint v1_2 (S37-1). -->

## PRE-FLIGHT (hard gate)
- Valid only while `origin/master == c0fff4920fbc1848fd9694e5a95ad69d30c28a6c`
  and no other phase branch is open. On mismatch STOP and report actual state.
- Branch: `entity-floor-1`. FULL profile (api/** + one migration). Unsharded
  CI green on the PR head is a merge precondition. Never merge yourself.
- PLATINUM: the registry is system-synced (on-connect + the existing health
  cadence, the backend_tools pattern) — zero manual entry; owner touchpoints
  are none beyond the standard merge/Operator relay.
- Do NOT touch: eval-gate machinery · routeKeywordLayer extraction ·
  deriveCategories matrix · gatewayProtocol rule content · gatewayPreflight ·
  metric-floor/learn-guard logic (METRIC-FLOOR-1 surfaces stay byte-identical).

## EVIDENCE (Architect+AG verified today — treat as given)
- F162 (2 digest-verbatim specimens, traces 591fcf00…/73870d59…): frame
  resolves QUERY_METRIC × FACTORY, entity_ref=["Granit fabrikası"] /
  ["granik fabrikasi"], confidence HIGH, metrics=['oee'] — yet the
  clarification gate fires on the entity_ref slot ALONE because the surface
  form finds no canonical id in the armes.entity_alias lookup. Result: 0-tool
  "I couldn't tell which entity (line/zone/equipment)…" refusals on perfectly
  explicit factory queries. Healthy contrast: KB7/line-level turns resolve and
  serve (glazur3 → getDailyOeeValues chart, same session).
- Ground truth: getFactoryList returns 17 factories (KB7, Granit, Sir, Masse
  active + 13 registered-inactive) — live-verified today (17:51 turn,
  total=17 returned=17, non-paginated).
- F161 (TOTAL-45 incident): [ToolResult] "total=" counts structural elements,
  not records — the Architect misread total=45 as a full list while list_*
  calls page at page_size=10 (real 47/191/22). Log semantics must tell the
  truth; partial≠complete must be visible to model AND observer.
- F159: the clarification template is English in a Turkish conversation.

## GATES

### G1 · FACTORY REGISTRY MIRROR (migration + sync)
- New table `factory_registry` (Operator-pending migration; RLS on, zero
  client policies, all-grantees revoke — the backend_tools/backend_health
  posture; S30-1 note in-file): columns backend_id, factory_id (canonical,
  e.g. 'Granit'), display_name, first_seen_at, last_seen_at, status
  (active|missing) — missing≠deleted semantics identical to backend_tools.
- Synced BY THE SYSTEM from the backend's factory-list tool result on the
  SAME offline cadence catalogSync rides (on-connect + Sync + health tick) —
  a generic `entityRegistrySync` step driven by DATA: the migration ALSO adds
  a nullable `entity_list_tool text` column to the EXISTING `backends` table
  (backend identity is DATA — owner law; adding a future backend's registry =
  setting this value on its row, ZERO code) and backfills the armes row with
  'getFactoryList' in the same migration. The sync step reads the column; a
  NULL value = no registry for that backend, step no-ops silently. NO
  per-backend code descriptor anywhere — genericity red-team test: a seeded
  fake backend row with entity_list_tool set syncs with zero 'armes'
  references in the sync module.
- Failure honesty: sync failure leaves prior rows (stale-but-attributed),
  never empties; empty first-sync = registry honestly empty (resolver then
  no-ops — outage only disables, F162 gate falls back to today's behavior).

### G2 · ENTITY RESOLVER + CLARIFICATION GATE (the F162 fix)
- New pure `resolveEntityRef(entityRefs, registryRows)` in the routing layer:
  normalization = lowercase, Turkish-fold (ı/i, ş/s, ğ/g, ü/u, ö/o, ç/c),
  strip generic suffix words ('fabrikası','fabrikasi','fabrika','işletmesi',
  'isletmesi'), then match canonical factory_id OR display_name by exact →
  prefix → Damerau-Levenshtein ≤2 ('granik'→'granit'). Deterministic, no LLM.
- Clarification gate change (surgical): when frame.object==='FACTORY' and
  resolveEntityRef returns a UNIQUE match, the entity-ambiguity trigger MUST
  NOT fire — the resolved canonical id is stamped on the span
  (cwf.route.entity_resolved=<id>, cwf.route.entity_method=exact|prefix|fuzzy)
  and threaded so downstream tool args use the canonical factory_id.
  Zero matches OR multiple matches → today's clarification stands (correct
  honesty), but the reply template gains the KNOWN-factory hint ("kayıtlı
  fabrikalar: …" — max 4 active names) so the user can self-correct.
- Tests: exact/typo/suffix/case specimens VERBATIM from today ('Granit
  fabrikasının', 'granik fabrikasi' → Granit; 'KB7' → KB7); ambiguous
  ('Yerköy' matches 2+) still clarifies; unknown ('Atlantis fabrikası')
  clarifies with hint; empty registry → byte-identical current behavior.

### G3 · F161 PAGINATION HONESTY (TOTAL-45 companion, code not record)
- [ToolResult] line: when the tool result carries a recognizable pagination
  envelope ({count,total_count,page,page_size,has_next} — detect generically,
  key-name tolerant), the line states truth:
  `[ToolResult] <tool>: records=<count>/<total_count> page=<page>/<total_pages>
  paginated=true`; non-paginated results keep today's shape but rename the
  misleading field: `elements=` (never `total=`) — grep-kill every `total=`
  emission in this line.
- Span/digest: stamp cwf.tool.paginated=true + cwf.tool.coverage="10/47" on
  the MCP span (scrubbed path as usual) so FULL-TRACE carries it.
- Model-facing: the tool-result envelope handed to the model gains ONE
  prepended honesty note when has_next=true: "NOT: bu liste toplam
  <total_count> kaydın ilk <count> tanesi (sayfa <page>)." — partial≠complete,
  sibling of empty≠zero. Grounding/facts-ledger machinery untouched.

### G4 · F159 TEMPLATE LOCALE (one-liner rider)
- The ALT-D clarification templates render in Turkish (the conversation
  language source already threaded for other templates — reuse it; if no
  locale signal exists, default TR per product language). English string kept
  as fallback constant. Include the G2 known-factory hint in both.

### G5 · SELF-VERIFY (literal evidence)
[ ] G2 specimen tests green: today's two failing queries resolve → no
    clarification → factory tools eligible (unit-level; live proof is the
    owner's turn post-deploy).
[ ] Registry sync unit tests: first-sync, missing-flip, failure-keeps-rows.
[ ] G3: grep proof zero `total=` in the ToolResult emitter; paginated +
    non-paginated + malformed-envelope cases tested; honesty note byte-tested.
[ ] Migration authored Operator-pending, full header per standing rules.
[ ] Full unsharded suite + CI green; reseal rev 134 → 135; CHANGELOG + KB.
[ ] grep proof: zero diff on the do-not-touch list.
[ ] Report: PR number, head SHA, CI status, origin/master unchanged. NO merge.

## OUT OF SCOPE (named, not dropped — GOLDEN LEDGER)
Anaphora/context carry ("diğer tüm hatları…" class → MEMORY-1/F48, BLOCK 3) ·
ENTITY-FLOOR's other 3 consumers (tool-arg resolver everywhere, not-found
mediation, ungrounded-refusal detector — follow-up after this foundation) ·
(source-tool declaration is already DATA in this phase — the former Path-B
deferral on that point is CLOSED by design here).

<!-- END · claude-code-PHASE-ENTITY-FLOOR-1-v1_2 · rev 1.2 · 2026-07-22 -->
