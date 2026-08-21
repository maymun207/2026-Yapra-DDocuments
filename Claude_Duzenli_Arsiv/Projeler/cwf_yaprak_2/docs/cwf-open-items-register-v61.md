CWF — Open Items Register · v61
<!-- cwf-open-items-register-v61 · 2026-07-22 · amends v60 after S60 ("BLOCK 2 CLOSE + F161-FIX day"). GOLDEN LEDGER: append-only; items leave ONLY via terminal marker; carry-diff pasted in §0; open items carried BY NAME with pointer to v60 for last full wording; prose may shorten, no item omitted. -->
VERIFIED FLOOR (v61 / S60 close)

master a8ecd6db9defa280a7bb6a777a6bedf09047cf0a · rev 136 · ~3606 tests / 341 files (CI-arbitrated) · drift OK · 56 migrations (all applied; 20260722130000_factory_registry.sql Operator-applied & live-verified S60). S60 lineage: c0fff49(S59) → e8bf988(ENTITY-FLOOR-1 PR#103, rev 135, +Operator migration factory_registry) → a8ecd6d(F161-FIX-1 PR#104, rev 136). NOTE: a8ecd6d merge-commit message = GitHub default ("Merge pull request #104…"), NOT the authored verbatim text — content byte-identical to PR#104, two-parent --no-ff, frozen surfaces clean. Force-push on shared master REJECTED for a cosmetic text mismatch (S60 decision, permanent record).

0 · CARRY-DIFF PROOF — v60 → v61

S60 terminal markers (items leaving OPEN):

ENTITY-FLOOR-1 v1_2 → CLOSED@e8bf988+Operator+live — factory_registry system-synced mirror (17 factories, RLS on/0 policy/all-grantees revoke, verifyGrants clean) + backends.entity_list_tool DATA (armes='getFactoryList', others NULL) + deterministic resolver (TR-fold/prefix/DL≤2). LIVE-SEALED: [EntityResolve] refs=[granik fabrikasi] resolved=[Granit:fuzzy] suppressedClarification=true (trace 47406847) — F162 fixed, typo-tolerance proven. F159 SUPERSEDED (templates already TR, code-verified; known-factory hint delivered).
F161 → CLOSED@a8ecd6d+live — TOTAL-45 code companion done. FIX-1 killed the lying record field: findRecordArray data-key precedence (columns_* excluded) + complete≠paginated gate. Verified: two verbatim live specimens (34/1→1/1, 34/0→0/0) as unit tests + ARMES bare-array regression guard. (Original F161 shipped in ENTITY-FLOOR-1 but buggy on gateway envelopes; FIX-1 = the redemption — S55-1 "merge≠works" honored.)
F153 → G3-SUPPRESSED@a8ecd6d (CWF side) / root PARK (external ops) — dead http://0.0.0.0 Superset base URL now stripped/rewritten (SUPERSET_PUBLIC_BASE_URL or placeholder) before the model; root cause (Superset armes-reports2 config) stays external ops PARK.
Log verification blindness → CLOSED@a8ecd6d — G2 added Vercel-lane [Frame]/[EntityResolve] mirror of OTel span data; live-verified. Future verification no longer needs a Langfuse round-trip (automation-first honored).
BLOCK 2 (Superset) → CLOSED@owner-verdict-S60 ("kapalı, geri dönmemek üzere") — infrastructure + serve + governed + empty≠zero (to render layer: Glazur3 "0 olarak kaydedilmiştir") + entity resolution + typo tolerance + ADR-001 datasource-scope discipline all LIVE-VERIFIED. Scope claim REMOVED from the verdict (see §5 correction).
"Superset=Granit-only / KB7=ARMES-only" doctrine → RETRACTED@S60 (owner-legislated) — see §5 NEW LAW. Was never true; my register "vindication" was a premise error (verified-then-retracted). Carry-diff check: every v60 item is present below OR carries a terminal marker above. "Absent without marker" set = EMPTY ✓. F-BW11/12/13 carried OPEN (§4). §2 freeze, §3 spine, §6 rules, §7 parked/watch carried by name.
1 · v5_2 RELEASE TRACK — position

GATE-0 ✓ → B1 ✓ → B2 Superset ✓ CLOSED (owner verdict S60) → F163 mini-phase (NEXT — Architect authors gated prompt) → B3 Memory (MEMORY-1, F166-aware design) → B4 → B5 → B6 → B7 → Path B. OWNER-RATIFIED SEQUENCE (S60): F163 → BLOCK 3 (MEMORY-1) → F166 (cross-turn viz binding — placed AFTER memory: both A-refetch and B-carry-forward paths are cleaner on the memory substrate; no architectural double-build). MEMORY-1 design note to be written F166-AWARE (episodic store consumable by a future attributed viz carry-forward). F166 does NOT block B3.

2 · 🧊 GOLDEN FREEZE (engaged, unchanged) — pointer v60 §2 / v59_7 §2.

Golden-runner 1075/18h watch unchanged (BLOCK 5). Lifts at B5.

3 · REMAINING SPINE — B3/B4/B5/B6/B7/Path-B carried by name (pointer

v60 §3 / v59_7 §3). B5 security-cleanup (mcp_settings 6/6 raw→apiKeyRef + ksadmin stale personal rows) unchanged.

4 · BOARD-WALK — F-BW01-10 CLOSED · F-BW11/12/13 OPEN (pointer v60 §4;

re-home to B5 or early-B3 batch).

5 · NEW S60 RECORDS (rules / findings / watches)

NEW LAW — FACTORY↔BACKEND COVERAGE IS CONFIG, NOT DOCTRINE (owner-legislated S60, PERMANENT): which factory "lives in" which backend is connection/access CONFIG — discovered live, mutable. The system NEVER encodes it as a governed rule / routing_hint / learned mapping. "Superset only knows Granit" / "KB7 only in ARMES" are FALSE and must never be baked in — the moment KB7's DBC/dataset is connected, such a doctrine would make the system lie (inverse of empty≠zero). The system discovers live every turn: whatever the connection returns is what is; empty → "not visible in this connection now," NEVER "never exists." The existing gatewayProtocol.ts rules (datasource-scope verify · wrong-scope≠answer) are the RIGHT kind and ALIGN with this law — untouched. (Born: owner corrected the Architect's 2nd premise lapse of the arc.) FINDINGS (open unless marked):

F164 · OPEN-LATENT: Superset search/find robustness — model builds inconsistent search terms; Superset search is substring/exact-ish, no fuzzy/normalized match. NOT triggered on the connected (currently Granit-populated) instance; would bite a multi-factory Superset. VIZ/routing evolution; downgraded from "confirmed" (the KB7 0-result was a TRUE 0 for the current config, not a false miss — and the catalog enumeration itself was TRUNCATED at chart page 12/20, so no completeness claim is even made).
F165 · OPEN (minor, B5): unbounded "list everything" turn exhausts the tool-round budget (maxToolRounds=16, silentFinish); model stops HONESTLY. Also: the budget-exhaustion message renders in English (i18n).
F166 · OPEN (VIZ-BIND lane, sibling of F160): cross-turn viz binding — a follow-up "chart these" emits viz segments referencing a PRIOR turn's tool result; the binder (toolResultSelect.selectToolResult) is turn-scoped and the current turn's rawToolResults is empty (model didn't re-fetch) → honest "tool result not available to chart" panels ×5 (trace fa62a5fb). POLARITY CORRECT (no fabricated chart from stale/other-turn data — F82 family avoided); UX broken (user asked for a chart, got none). Two fix directions: (A) re-fetch (model re-calls the tool this turn — model-dependent) · (B) attributed carry-forward (bring prior rawToolResults forward, C1-LAW /turn-isolation care). Memory note (owner Q, S60): MEMORY-1 helps only path A INDIRECTLY (better re-fetch decision from episodic context); memory must NEVER be a viz DATA source (that would be F82 — lossy summary rendered as a chart). Charts always bind to the CURRENT turn's deterministic raw tool result. Scheduled AFTER B3 per owner-ratified sequence. NOT a correctness/safety hole (system honest) — no queue-jump.
F163 · DESIGN DELIVERED (cwf-tool-doc-overlay-design-v1) — carried from v60 §5; NEXT phase, Architect authors the gated prompt. Full wording v60.
Carried OPEN from v60 (pointer): F158 (render 0≠empty table cell) · F160 (multi-series single chart) · blind_spot row option (now MOOT under the new law — do NOT add; superseded by the coverage-is-config law). WATCHES (new + carried):
PANE-SCROLL Replay CI-flake (pane-scroll-admin.spec.ts:104, 2-worker timeout) — recurring debt; timeout-bump was a band-aid. Permanent fix = PANE-SCROLL-2 / CI-worker root-cause (GATE-0 named). One clean rerun proved flake THIS time (build/coverage green twice, untouched surface). Do not band-aid forever.
NTP transient ([Time] UDP NTP query failed, HTTP fallback) — single specimen, unrelated to viz; minor watch.
a8ecd6d merge-commit message = GitHub default — content correct (PR#104 byte-identical), force-push rejected by decision; traceability via PR# + this ledger. Delivery lesson: gh pr merge --subject/--body empty → GitHub uses its own default; next merge instruction embeds message in --subject/--body.
JWT ES256 transient · GatewayEnum full double-sweep polish · enumeration swallowed errors ×2 — all carried from v60 §5.
[ToolResult] total=… lying-field WATCH from v60 → RESOLVED@F161-FIX-1 (records=N/total honest, columns_* excluded). MEMORY NOTE (owner term, S60): DBC = database connector (team usage). The KB7-Superset check owner owns: (a) KB7 gateway access granted? (b) the connected DBC's tables all registered as Superset datasets? (c) a separate un-connected DBC? — CWF-external, result NEVER encoded (coverage-is-config law). ARCHITECT PREMISE-ERROR TALLY (arc S59→S60 = 4; all resolved): (1) catCount=12 "Superset absent" (S59) · (2) TOTAL-45 "total=45 full list" (S59) · (3) "Granit=KB7 line" (S59) · (4) "Superset=Granit-only VERIFIED / ADR-001 vindication" (S60 — reached without verification, then the enumeration was truncated AND the owner corrected it as a config artifact; retracted, birthed the coverage-is-config law). Discipline holds: each was caught (owner or self) before shipping into a governed artifact.
6 · RULES / RECORDS — all prior survive by name (pointer v60 §6 + KB).

+ FACTORY↔BACKEND-COVERAGE-IS-CONFIG law (§5). S59-1, S59-2/TOTAL-45, S55-1, S43-2 FAST-GATE, PLATINUM, GOLDEN LEDGER, FULL-TRACE, S54-x — all live.

7 · PARKED / EXTERNAL / WATCH — v60 §7 carried by name + §5 above.

Stale-branch sweep: entity-floor-1 + f161-fix-1 deleted at merge ✓; older list (obs-trace-2b · flake-sweep-1 · pane-scroll-1/2 · hotfix/f152) still owed.

8 · YOUR ACTION ITEMS (owner, at v61 write / S60 close)
Add to the project: this register v61, CWF-SESSION-GRAPH-KB-v59, CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v59, plus S60 phase files (ENTITY-FLOOR-1 v1_2 · F161-FIX-1 v1) if not yet added.
To start S61: paste bootstrap v59 into a fresh session — it boots at F163.
Tomorrow (CWF-external, non-blocking): Superset KB7 DBC/dataset check (§5 MEMORY NOTE) — result never encoded.
Relay stays the only owner surface; judgment points ahead: F163 consent-class publishes (if any), B3 design ratification.
<!-- END · cwf-open-items-register-v61 · 2026-07-22 -->