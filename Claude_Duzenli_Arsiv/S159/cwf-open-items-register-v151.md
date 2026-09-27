# cwf-open-items-register-v151 — THE WHOLE OPEN LIST (owner's copy)

APPEND-ONLY. Cut at S159 FINAL close, 2026-09-27T02:01Z. Supersedes v150 (and v149 before it). v150 rows carried BYTE-FOR-BYTE except rows marked "S159-late" (95, 103, 104, 105, 97, 83, 107); new rows 109-111; new §6 = the side-panel ↔ register map and a MECHANICAL CARRY CHECK (every item id of v150 present in v151). ANCHOR at close: master b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f (PR 622, Vercel prod READY). Open PRs: 623 only. Every line not re-measured in S159 stays CARRIED UNVERIFIED.
Items leave only by CLOSED@evidence / SUPERSEDED-BY / MERGED-INTO. Every row: what (EN), Türkçe özet, state now, next and date.
SOURCES READ IN FULL: register v148, CWF-S158-CONSOLIDATED-OPEN-ITEMS-v1, bootstrap v159, the S158 bus rows by name, Vercel production deployment list 2026-09-26T13:42Z, production DB (turn_trace_digest, messages) 13:50Z.
ANCHOR: master 6e385480d0aecce6a3e8d65ae732b4049c75a1a8 (Merge PR #620, Vercel production READY). Every line not re-measured in S158 says CARRIED UNVERIFIED.

## A · IN FLIGHT NOW
| # | Work | Türkçe özet | State now | Next · when |
|---|---|---|---|---|
| 58 | NO ARMES HARDCODE (top rule). G2c category floor to data (83) · G3 tests/fixtures/comments/diagrams · G4 CI grep gate INCLUDING public/, CASE-SENSITIVE (F-S154-CASE-INSENSITIVE-ARMES-GREP-HITS-CLEARMESSAGES-1, F-S154-G4-SCOPE-MISSES-PUBLIC-1). 62 inside. | Kodda ARMES'e özel her şey kalkacak | S159: G2c NOT cut (owner: architecture doc first). Measured: ALWAYS_INCLUDE = fence breach NOW (scout); ARMES case-sensitive 50 files / 71 matches non-test (scout recount); the routing redesign (item 103) absorbs G2c/G3 of the routing path | ALWAYS_INCLUDE -> data as an independent card (scout: repair now) · S160 |
| 99 | NEW S158: A24-P20 tokenizer (item 51, 40d P2-0), ex-PR 619 | Tokenizer işi | S159: CLOSED@PR 621 merge 2a6f6781b1a4748aac5f5bc7b1d73136863b1c35 (15:41:26Z, scout GREEN, Vercel prod READY 15:47Z). Residual pbFullMeasure UNMEASURED (Operator run) | — ; pbFullMeasure under 40d P2 |
| 91 | cwf_lane password rotation (S157 leak) | Şerit şifresi rotasyonu | S159: the owner had NOT run OPERATOR-PROMPT-S158-ITEM91-ALTER-ROLE-1 (his words 18:04 TSI); sequenced after PR landings (scouts write the bus with the old credential) | ⚡ operator text + AG-4 ORDER 3 · S160 first hour |
| 89 | Shared clone guard | Klon muhafızı | S159: CLOSED@PR 611 merge 0b14ef3bf6cea0296a02e28aa11e9ec224a6043b (Vercel prod READY, measured at S159 open; v149 carried it UNVERIFIED) | — |

## B · A24 PROGRAM (the product)
| # | Work | Türkçe özet | State now | Next · when |
|---|---|---|---|---|
| 39 | A24 P0 measurements: M-a held-out counts · M-b item-5 analyzer · M-c RBAC scope-filter second lens · M-d production-day definition (F-S149-TODAY-IS-CALENDAR-DAY-1) · resultStore handle threshold (39 KB) · stage-12 verdict text · M2 MKB corpus · M3′ replay | A24 ön ölçümleri | M-e done S150; rest open (CARRIED UNVERIFIED) | Architect · S159 |
| 40b | P1-B inline aggregates | Satır içi toplamlar | S158: CLOSED@PR 614 merge 5e0b13c8d60c296ac0e203a3d5e39ba4935ce138 (dark at floor 0) | — ; F-S153-TOOL-FANOUT-34-CALLS-1 remains with 40e |
| 40c | P1-C: C1 closed; C2 K24 trace fields; C3 routing exam (golden case F-S149-SCRAP-TOOL-NOT-OFFERED-Q3-1) -> C4 held-out reader -> C5 K17 entry tool -> reach canary | Yönlendirme sınavı | S158: C2 CLOSED@PR 616 merge 7fb4a589349911c84757d9e38c0e0d98f2d48c58. Frame keep-unmodeled fix CLOSED@PR 620 6e385480. | C3 card -> scout -> AG-1 · S159 |
| 40d | P2-0...P2-6 (channel-2 BM25+RRF, TR analyzer K15 = 5, 36, 51) · P3 (JSON DAG planner, conformal K9/K25 = 6, K28 A3 template F-S149-A3-TEMPLATE-ABSENT-1, K29 calendar = 10, scope sentence F-S149-SCOPE-REFUSES-IN-DOMAIN-SYNTHESIS-1, K30 web) · P4 · P5 | Kanal-2 arama, planlayıcı | P2-0 = item 99 in flight; rest not cut | after 99 · S159 |
| 40e | PARAMS card (every governed param the wave needs, safe floor) | Parametre kartı | not cut | S159 |
| 45 | All params configurable/backup/restore via env files (OWNER-RULING-S150-PARAMS-UI-ONLY-TODAY-1 second half) | Parametreler env dosyasıyla | design not started | after P1 |
| 7 | Resolved parent -> child layer (K31) | Ebeveyn->çocuk katman | three repairs on master S147; determinism UNMEASURED | A24 P1 |
| 8 | Typer | Tip çıkarıcı | ABSENT | card after 13 |
| 9 | L5 miss ledgers | Kaçırma defterleri | ABSENT | card after 13 |
| 10 | Pre-LLM time slot + K29 calendar | Zaman dilimi | open | 40d P3 |
| 50 | Grouped payload: recordCount counts one group; stored handle keeps first group only | Gruplu veride sayım hatası | open | AG-4 card · S159 |
| 51 | Tokenizer camelCase-after-fold | Kelime ayırıcı | = item 99 | with 99 |
| 36 | Vector parity 3/15 | Vektör eşleşmesi | input to P2 | with 40d |

## C · PRODUCT DEFECTS
| # | Work | Türkçe özet | State now | Next · when |
|---|---|---|---|---|
| 28 | Document/company questions routed away from knowledge (F-S153-DOC-QUESTION-MODEL-CHOSE-ARMES-1) | Doküman soruları yanlış yere gidiyordu | S158: owner's capital question CLOSED@PR 620 + ACCEPTANCE-D6-CAPITAL-QUESTION-S158-1 (answer = source bytes). Broader replay (M2/M3′) stays in 39. | replay with 39 · S159 |
| 95 | NEW S158: grounding blind to tr-TR numbers (F-S158-GROUNDING-BLIND-TO-TR-NUMBERS-1) | Doğrulama Türkçe sayıyı görmüyor | S159: CLOSED@PR 622 merge b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f (scout-2 GREEN, bus 2026-09-27T00:33:47Z; Vercel prod READY measured 00:4xZ): absolute half-grid tolerance at both call sites + claims total in the span | — (follow-up 106) |
| 21 | Two S141 bugs: CHOSEN-OPTION-DOES-NOT-NARROW-ITS-SIBLING-REF · PREFIX-TIER-MATCHES-WRONG-FACTORY-LINE-AND-FACTORY-ID | S141'in iki hatası | unmeasured | scout measure after P1 |
| 59 | Stamp false positive on method-name numerals ("5 Neden Analizi") | Sayı damgası yanlış alarm | open | small card |
| 60 | Recalled claim written as measured | Hatırlanan bilgi ölçülmüş gibi | open | with 59 |
| 61 | Prose says "all" when calls were dropped | "Hepsi" deniyor | open | small card |
| 62 | Canned split advice text | Sabit tavsiye | inside 58 | with 58 |
| 13 | Converge association failing since 2026-09-11 | Converge çöküyor | one read away (CARRIED UNVERIFIED) | Architect read S159 |
| 41 | Web valve open in production; Q4 not re-asked (M-f). S158: capital turn offered web_fetch (webValveSource db) | Web valfi açık | live | owner re-asks Q4 |
| 82 | Superset hand pack privilege (F-S156-SUPERSET-HAND-PACK-PRIVILEGE-1) | Superset paket ayrıcalığı | open | own card · S159 |
| 83 | G2c category floor to data (toolCategories.ts key + every consumer + MKB key + CANONICAL_METRIC_TOOLS) + ALWAYS_INCLUDE (F-S158-ALWAYS-INCLUDE-ARMES-HARDCODE-1) | Kategori tabanı veriye | S159-late: ALWAYS_INCLUDE + assemble.ts:55 superset literal -> data = A25 R6(g) NOW card, adopted | S160 first card |
| 84 | Backend-down live test | Backend çökünce uyduruyor mu | UNMEASURED | scout live read · S159 |
| 85 | Graph KB reads published tool_graph_node rows | Graf KB | open | after 83 |
| 97 | NEW S158: keyword overlap hygiene (makine, parametre, enerji, bilgi, rapor, personel sayısı, faaliyet raporu) + TR inflection (F-S158-TR-INFLECTION-BLIND-1 -> 99) | Anahtar kelime çakışması | S159-late: folded into A25 K32 (existing keywords = hints + ladder floor; migration default B); hygiene of function-word keywords (neden, not, plan, alan, hat, hata…) measured by scout | with 103 E3 |

## D · FACTORY
| # | Work | Türkçe özet | State now | Next · when |
|---|---|---|---|---|
| 17 | Scout bus status writer | Scout'un bus'a yazması | S158: scout_reply worked (616 x2, 620 second window); first 620 window posted the GitHub status but wrote NO bus row | with 67 |
| 67 | consumed_at never stamped + two windows ran one order (F-S157-UNCONSUMED-ROWS-1, F-S158-TWO-SCOUT-WINDOWS-RAN-ONE-ORDER-1) | Okundu damgası; bir emri iki pencere koştu | open | reader stamps consumed_at and refuses a consumed order · card S159 |
| 96 | NEW S158: golden gate underpowered (110/200 empty reps) + disabled runner silent (golden.enabled=0) | Altın kapı zayıf | open | card S159 |
| 98 | NEW S158: merge guard failure message names the fresh-branch remedy (F-S158-GUARD-CONFLICT-HAS-NO-MERGE-PATH-1) | Guard'ın hata mesajı | open | small card S159 |
| 55 | Two-way bus-wake hook (OWNER-RULING-S152-BUS-WAKE-HOOK-1) | Bus uyandırma | v4 not cut | after 67 |
| 56 | Hook timeouts are seconds | Hook süreleri | open | after 55 |
| 66 | tsx IPC EPERM in sandboxed windows (scout 620 again PREFLIGHT-UNMEASURED); fix: every tsx entry via node --import tsx | Ön-kontrol sandbox'ta | open | small card |
| 64 | noRuntimeApiImport misses dynamic imports | Dinamik import | open | small card |
| 15 | Takeover order + self-takeover + own worktree | Şerit devralma | v2 RED; v3 not cut | v3 -> scout |
| 16 | ruleset:drift gh -> curl | Kural seti | open | small card |
| 18 | actionlint | Workflow denetimi | open | small card |
| 23 | Delete scripts/land.ts | Eski iniş betiği | open | small card |
| 31 | CP-3 accepts RELAYED/RECALLED | Kart kuralı | open | small card |
| 32 | Worktree/branch hygiene (S158: closed branches of 617, 618, 619 kept) | Dal temizliği | open | own card |
| 33 | Executing lens for workflow tests | Workflow testleri | open | small card |
| 35 | REGISTER-BUG-BUCKET v58 (v57 stale since S141; reconcile v56 §B) | Hata kovası | open | small card |
| 22 | OPA runtime | OPA | recon only | open |
| 53 | Wave: 3 workers + 2 scouts | Dalga | S158 ran AG-1, AG-2, AG-4 + 2 scouts | continue |
| 87 | Lane DB credential in every window's env | Şifre her sekmede | open (CARRIED UNVERIFIED) | card after 91 |

## E · GATE-1 AGENDA
| 68 | ⓶ steel of merge-authority exception (PLATINUM-BREACH-S122-1 stays) | UNMEASURED; landings are GitHub auto-merge | scout measures; propose SUPERSEDED-BY |
| 69 | ⓷ ADF-ARCHITECTURE-v2 landing (H2 open) | UNMEASURED | owner rules H2 |
| 71 | ⓺ unskippable pre-dispatch preflight hook | partial | with 66 |
| 72 | ⓻ P-9 extension candidate | UNMEASURED | owner rules |
| 73 | P-6 observation window | OPEN by ruling | owner rules close criterion |

## F · OLDER CARRIED
74 MA-RERUN run half (after A24) · 75 S140 plan remainder (likely SUPERSEDED-BY 40c/40d; owner confirms) · 76 missing bootstrap v140/v141/v143, S139 (owner exports) · 77 architect:open not readable (NOT-READ) · 79 SOTA acceptance 0/16 (CARRIED UNVERIFIED; S142 measured 15/16 blocked by frozen bench).

## G · OWNER ITEMS AND FROZEN
14 Redis rotation · 24 oven 7-day stoppages witness · 41 Q4 re-ask · 2 3 4 27 bench FROZEN (OWNER-RULING-S143-FREEZE-BENCH-1).

## H · STANDING PRACTICES
26 every document in the doc repo · 37 tracking ref after each push · 49 device_commit md5 · 52 bridge git locks · 63 Architect GitHub read + graft on bridge · 80 card times from date -u · 92 boot text names the lane first, "leave auto mode" before approved external writes · 93 open reads last conclusion of every scheduled workflow on master · 100 NEW S158: on a routing complaint, read turn_trace_digest stage 07 before any governed-data edit (A-REC-S158-1) · 101 NEW S158: a conflicting sibling PR is carried onto a fresh branch, never merged by hand · 102 NEW S158: landing is read from the Vercel production deployment list when the bus is silent.

## S158 · CLOSED (by evidence)
90 @ PR 610 2d7087bff1eda24b6224c2fbd9a9d987061dec7d · 58-G2 @ PR 613 628e9ccf9632b4d7c2e8943a84c9ba42b8d86a27 · 40b @ PR 614 5e0b13c8d60c296ac0e203a3d5e39ba4935ce138 · 40c-C2 @ PR 616 7fb4a589349911c84757d9e38c0e0d98f2d48c58 · frame fix @ PR 620 6e385480d0aecce6a3e8d65ae732b4049c75a1a8 · 28 (owner's capital question) @ PR 620 + ACCEPTANCE-D6 · F-S158-REGISTER-V148-COMPRESSED-ROWS-1 @ this v149. PR 617, 618, 619 CLOSED unmerged (superseded by 619-rebuild, 620, 99).
Earlier closures: as in register v148 §1 and CONSOLIDATED-OPEN-ITEMS-v1 §1, unchanged.

## §3 · FINDINGS CARRIED BY NAME
NEW S158 (CWF-S158-FINDINGS-v1): F-S158-FRAME-REPLACE-DROPS-UNMODELED-CATEGORIES-1 (closed) · F-S158-ARCHITECT-EDITED-DATA-BEFORE-MEASURING-TRACE-1 (-> 100) · F-S158-GUARD-CONFLICT-HAS-NO-MERGE-PATH-1 (-> 98, 101) · F-S158-TWO-SCOUT-WINDOWS-RAN-ONE-ORDER-1 (-> 67) · F-S158-GROUNDING-BLIND-TO-TR-NUMBERS-1 (-> 95) · F-S158-GOLDEN-GATE-UNDERPOWERED-1 (-> 96) · F-S158-GOLDEN-RUNNER-DISABLED-SILENT-1 (-> 96) · F-S158-ALWAYS-INCLUDE-ARMES-HARDCODE-1 (-> 83) · F-S158-TR-INFLECTION-BLIND-1 (-> 99) · F-S158-KEYWORD-OVERLAP-HYGIENE-1 (-> 97) · F-S158-SCOUT-WINDOW-LACKS-SUPABASE-ENV-1 · F-S158-ARCHITECT-CLAIMED-SCOUTS-CANNOT-WRITE-BUS-1 · F-S158-REGISTER-V148-COMPRESSED-ROWS-1 (closed) · F-S158-STALE-LANE-OUTPUT-PASTED-1 · F-S158-SOTA1-FIRST-UNMEASURED-1.
All S145-S157 findings: as carried by name in register v148 §3.

## §5 · CARRIERS
CLAUDE-PROJECT-INSTRUCTIONS v5_10 · CWF-S158-SESSION-CLOSE-v1 · CWF-S158-FINDINGS-v1 · CWF-SESSION-GRAPH-KB-v158 · register v149 (this) · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v160 · CWF-ROUTING-DETERMINISM-EXPLAINER-S158-1 · ACCEPTANCE-D6-CAPITAL-QUESTION-S158-1 · CWF-S158-CONSOLIDATED-OPEN-ITEMS-v1 · A24 v1_3 · REGISTER-BUG-BUCKET v57 (STALE, 35) · cwf-sota-definition v1_5.

## S159 · NEW ROWS
| # | Work | Türkçe özet | State now | Next · when |
|---|---|---|---|---|
| 103 | ROUTING v2 (OWNER-DESIGN-S159-1): replace the hard-coded IR matrix / ALWAYS_INCLUDE / canned-text routing with a data-driven, backend-agnostic, self-configuring, gated self-improving capability router. Doc CWF-ROUTING-ARCHITECTURE-v2-DRAFT-S159-1; scout verdict RED-ON-DESIGN (SCOUT-STATUS-REVIEW-ROUTING-ARCHITECTURE-v2-S159-1, 16:44:11Z) with the complete delta: ungated learnToolMapping exists (K-F violated today); Q3 hint fix already landed S151; clarify runs AFTER stage 07 so layer scoping needs a pipeline reorder and a declared company layer; routeShadowLens arm A already = frameRouting=0+keyword, live semantic arm NOT replayable, no per-backend Recall@k, ADR-008 ruling needed; frameRouting=0 also switches off hints/metric floor/unmodeled-keep (:1609); Yol B is vector-only with a hashed stand-in encoder, BM25 indexes entity names only; Toollery: verified synthetic intent queries per tool as gated card data, BM25 beats embed+rerank; governed floor must be a measured PROPERTY of the offered set after every cap (governedKept), not an ordering promise. | Yönlendirme mimarisi v2 | S159-late: A25 v1 BUILT = A24 v1_3 bytes + RED proposals (Claude_Duzenli_Arsiv/yapra-mimari-documents/A25_cwf-capability-fabric-architecture-v1.html, sha256 8e8c18a8fab6141fe178f483f286ca1a2e93d8416fa5fadd6ac7bc4d9cf7866b; builder S159/build_a25.py); inputs doc v3, scout S159-1 + S159-2 full (D1-D17), Astra. OWNER-RULING-S159-A25-ADOPT-1 (owner, 2026-09-27 05:00 TSI: "a25 i okudum, bunu hayata gecirelim"): A25 adopted incl. its recommended options R6(a) EVET · (b) B · (c) şirket kazanır, KS fabrika alias ARŞİV · (d) ONAY in principle (each firing still needs a NAMED spend approval, S102) · (e) EVET · (f) K1 all providers, Anthropic switch gated by E1 billing · (g) ONAY. NO code touched | S160: A25 build — NOW card (R6(g)) + E1 cards first, each NEW subject -> scout; S160 first message restates this ruling reading in one line (owner may correct) |
| 104 | Nightly Compatibility RED since 09-23 (F-S159-NIGHTLY-COMPAT-RED-1): envProxy tests need Node >=24.14 API; mergeGuard needs type stripping (Node 20 cannot). OWNER-RULING-S159-NIGHTLY-FLOOR-22-1 ("onay nightly 22/24"). CARD-NIGHTLY-COMPAT-FLOOR-22-S159-1-v2 -> PR 623 (AG-1), head 347a6de6b8b14f47363864491158a9ce668bdcf0 at close; first branch dispatch FAILED (16:24:15Z), second SUCCESS (16:46:33Z, workflow_dispatch on the branch — the measurement the card asked for); head moved to ba74a7d6f8c4e914c3a2e6d124495338e2a75a65 (AG-1); mergeable_state blocked until 622 lands (COLLISION) | Gece uyumluluk koşusu kırmızı | S159-late: PR 623 head ba74a7d6f8c4e914c3a2e6d124495338e2a75a65; branch dispatch of Nightly Compatibility SUCCESS 2026-09-26T16:46:33Z; PR 622 landed so the COLLISION cause is gone; mergeable_state unknown at close | S160: NOTICE master merge to AG-1 (merge origin/master, no rebase) -> CI by full sha -> ORDER-SCOUT-LAND-PR623 -> master |
| 105 | F-S159-GOVERNED-KEYWORD-IGNORED-ON-SEMANTIC-PATH-1: owner's personnel question (16:01Z x2): MKB keywords published but consulted only on basis 'frame'; 14 ARMES fan-out calls; 489,176 tokens; canned split text. Card CARD-KEYWORD-FLOOR-ALL-PATHS ON HOLD by owner (architecture first) | Personel sorusu çöktü | S159-late: folded into A25 K32 (obligations) + E4; the owner question T2 is in the E1 regression set | with 103 |
| 106 | F-S159-NUMERIC-SPACE-GROUP-AND-MULTIPLIER-WORDS-1: extractor reads "1 250 000" as three literals; "12,5 milyon" multipliers not applied (scout) | Sayı biçimleri | open | small card after 622 lands · S160 |
| 107 | Doc-repo push: bridge cannot push; S159 pushed once by AG-4 (remote main 89346dbcad691b752dad10019d79752381c812eb); commits after that (5 at close) await NOTICE-PUSH-DOC-REPO-S160-1 | Doküman reposu push | S159-late: doc repo local commits ahead of remote main = 9 at this cut (git rev-list --count origin/main..HEAD); bridge cannot push | S160: NOTICE-PUSH-DOC-REPO-S160-1 to the first AG window |
| 108 | Item 52 mechanised: ~/gitw.sh moves every .git/*.lock aside before/after a bridge commit; ~/gh.sh reads GitHub with the read-only token (cwf-architect-ro folder must be connected) | Köprü git kilidi + GitHub okuma | practice | H |

## S159 · CLOSED (by evidence)
99 @ PR 621 2a6f6781b1a4748aac5f5bc7b1d73136863b1c35 · 89 @ PR 611 0b14ef3bf6cea0296a02e28aa11e9ec224a6043b (measured at open) · F-S159-MASTER-PUSH-RUNS-ABSENT-SINCE-AUTO-MERGE-1 WITHDRAWN (SUPERSEDED-BY the S141 ruling in auto-merge.yml: github.token landing accepted; ADF_MERGE_TOKEN = owner option) · F-S158-GROUNDING-BLIND-TO-TR-NUMBERS-1 SUPERSEDED-BY F-S159-NUMERIC-SAME-RELATIVE-TOLERANCE-1.

## §3 · FINDINGS CARRIED BY NAME (S159 additions)
CWF-S159-FINDINGS-v1: F-S159-SOTA1-NOT-FIRST-CALL-1 · F-S159-NIGHTLY-COMPAT-RED-1 (-> 104) · F-S159-NUMERIC-SAME-RELATIVE-TOLERANCE-1 (-> 95) · F-S159-GOVERNED-KEYWORD-IGNORED-ON-SEMANTIC-PATH-1 (-> 105/103) · F-S159-NUMERIC-SPACE-GROUP-AND-MULTIPLIER-WORDS-1 (-> 106) · F-S159-MASTER-PUSH-RUNS-ABSENT-SINCE-AUTO-MERGE-1 (WITHDRAWN) · F-S159-CARD-DEMANDED-TENANT-BYTES-AGAINST-AGNOSTIC-1 (Architect) · F-S159-UNGATED-LEARN-TOOL-MAPPING-1 (scout; -> 103) · F-S159-CLARIFY-AFTER-STAGE07-LAYER-BLIND-1 (scout; -> 103) · F-S159-YOL-B-VECTOR-ONLY-HASHED-ENCODER-1 (scout; -> 103) · F-S159-TOOL-IDENTITY-NAME-ONLY-1 (-> 103 E2) · F-S159-TOOL-EXPERIENCE-UPSERT-RACE-1 (-> 103 E2; small card) · F-S159-GOLDEN-GATE-PROMPT-SEGMENT-ONLY-1 (-> 103 E2, wiring) · F-S159-PROVIDER-OFFERING-DIVERGENCE-1 (-> 103 P9) · A-REC-S159-1 · A-REC-S159-2 (v1 carried A24 by number and contradicted it in four places) · OWNER-DESIGN-S159-1 · EXT-DESIGN-S159-ASTRA-1 (external design source, S112-YASA-1 / 12.14).
All S145-S158 findings: as carried by name in register v149 §3.

## §5 · CARRIERS (S159)
CLAUDE-PROJECT-INSTRUCTIONS v5_10 · CWF-S159-SESSION-CLOSE-v1 · CWF-S159-FINDINGS-v1 · CWF-SESSION-GRAPH-KB-v159 · register v150 (this) · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v161 · CWF-ROUTING-ARCHITECTURE-v2-DRAFT-S159-2 (supersedes v1; at scout) · CWF-ASTRA-REVIEW-EVALUATION-S159-1 · A24 v1_3 · REGISTER-BUG-BUCKET v57 (STALE, 35) · cwf-sota-definition v1_5.

## S159-late · NEW ROWS
| # | Work | Türkçe özet | State now | Next · when |
|---|---|---|---|---|
| 109 | Scout long-verdict delivery: bus refuses bodies > 8192 chars; the S159-2 verdict (30,888 B) reached the Architect only because a second scout run wrote the doc repo (first run: "cp: Operation not permitted") and the Architect committed it. F-S159-SCOUT-LONG-VERDICT-DELIVERY-1 | Scout uzun rapor teslimi | practice named, mechanism unbuilt | S160: every scout order names the doc-repo path S<n>/<ARTIFACT>.md + a bus slip with sha256; the Architect commits it the same turn; a multipart bus verb is a card after A25 E2 |
| 110 | Design documents quote the rules they rest on MECHANICALLY (script copies by line number, byte-verified); a hand-written summary is not a quote (A-REC-S159-2, A-REC-S159-3; A25 built this way) | Tasarım belgesi kuralı bayt bayt alıntılar | practice | H — every design artefact from S160 on |
| 111 | Owner turn limit: S159 ran past 20 owner turns (≈26) because the architecture line opened late; F-S159-TURN-LIMIT-EXCEEDED-1 | 20 tur sınırı aşıldı | named | S160: the Architect counts owner turns in every reply footer from turn 15 and cuts the close set at 20 |

## S159-late · CLOSED / SUPERSEDED (by evidence)
95 @ PR 622 b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f + Vercel prod READY · ORDER-SCOUT-REVIEW-ROUTING-ARCHITECTURE-v2-S159-3-v1 (bus row cb574247-34ce-4619-8a82-9d4ddf465c38, never answered) SUPERSEDED-BY A25 v1 — a scout must NOT run it · CWF-ROUTING-ARCHITECTURE-v2-DRAFT-S159-1/-2/-3 SUPERSEDED-BY A25 v1 (they remain inputs) · keyword-floor card (CARD-KEYWORD-FLOOR-ALL-PATHS, never cut) SUPERSEDED-BY A25 K32.

## §3 · FINDINGS CARRIED BY NAME (S159-late additions; CWF-S159-FINDINGS-v2)
F-S159-ANTHROPIC-PATH-NO-FRAME-1 (scout; -> 103 K37/K39) · F-S159-ROUTER-BUDGET-PARAMS-ABSENT-1 (router.maxTools/maxFanout/maxSchemaTokens absent; -> 103 E2) · F-S159-CENSUS-EXPERIENCE-IN-MODEL-DESCRIPTIONS-1 (toolCensus.composeEnabled channel; -> 103 K40 brake) · F-S159-TRACE-V1-UNBUILT-1 (cwf.trace.v1 not in code; -> 103 K35) · F-S159-OBLIGATION-OVERFLOW-NORMAL-UNDER-ALL-KEYWORDS-1 (p50 13 / p90 46 / max 56; -> R6(b) B) · F-S159-COMPANY-LAYER-IS-CODE-1 (-> 103 K39 E4) · F-S159-SCOUT-LONG-VERDICT-DELIVERY-1 (-> 109) · F-S159-TURN-LIMIT-EXCEEDED-1 (-> 111) · A-REC-S159-3 (v2 paraphrased A24; 12 of 16 rules narrowed; -> 110) · F-S159-V149-DROPPED-ROW-86-1 (-> §7; 86 MERGED-INTO 107) · OWNER-RULING-S159-A25-ADOPT-1.

## §5 · CARRIERS (S159 final)
CLAUDE-PROJECT-INSTRUCTIONS v5_10 · CWF-S159-SESSION-CLOSE-v2 · CWF-S159-FINDINGS-v2 · CWF-SESSION-GRAPH-KB-v159-2 · register v151 (this) · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v162 · A25_cwf-capability-fabric-architecture-v1 (the design in force, owner-adopted) · A25-POINTER-AND-S159-CLOSE-ADDENDUM-v1 · CWF-ASTRA-REVIEW-EVALUATION-S159-1 · SCOUT-STATUS-REVIEW-ROUTING-ARCHITECTURE-v2-S159-2 (full) · A24 v1_3 (base; unchanged) · A24-V1_3-ARCHITECT-CAPTURE-S150-1-v1 · REGISTER-BUG-BUCKET v57 (STALE, 35) · cwf-sota-definition v1_5.

## §6 · SIDE PANEL ↔ REGISTER (every S159 panel task mapped; none dropped)
| Panel # | Panel task (S159) | Register id(s) | State at close |
|---|---|---|---|
| 1 | S159 OPEN | — | done |
| 2 | #99 tokenizer | 99 | CLOSED@PR 621 |
| 3 | #95 numeric tolerance | 95 | CLOSED@PR 622 |
| 4 | #91 cwf_lane password rotation | 91 | OPEN — S160 after 623 lands |
| 5 | #89 shared clone guard | 89 | CLOSED@PR 611 |
| 6 | #58/#83 NO ARMES HARDCODE (G2c, G3, G4) | 58, 83 | OPEN — 83 = A25 R6(g) NOW card; G3/G4 = A25 E5 + K-G |
| 7 | #93 scheduled workflows | 93 (H), 104 | practice; Nightly red -> 104 |
| 8 | #40c C3 routing exam → C4 → C5 → reach canary | 40c | OPEN — = A25 E1 |
| 9 | #96 golden gate underpowered + silent runner | 96 | OPEN — with A25 K34 |
| 10 | #67/#17 consumed_at + scout refuses consumed order | 67, 17 | OPEN |
| 11 | #40d A24 P2–P5 | 40d | OPEN — = A25 E3–E5 |
| 12 | #39 A24 P0 measurements | 39 | OPEN — feeds A25 E1 |
| 13 | #40e PARAMS card | 40e | OPEN — absorbs router.maxTools/maxFanout/maxSchemaTokens (A25 E2) |
| 14 | #97 keyword overlap hygiene | 97 | OPEN — with A25 E3 |
| 15 | #98 merge guard remedy message | 98 | OPEN |
| 16 | #82 Superset hand pack privilege | 82 | OPEN |
| 17 | #84 backend-down live test | 84 | OPEN |
| 18 | #50 grouped payload recordCount | 50 | OPEN |
| 19 | #13 converge association failing | 13 | OPEN |
| 20 | #28 doc/company routing (broader replay) | 28 | capital question CLOSED S158; broader replay -> A25 E1 |
| 21 | #85 Graph KB reads tool_graph_node | 85 | OPEN — after 83 |
| 22 | #7 resolved parent → child layer (K31) | 7 | OPEN — A25 K39 E4 |
| 23 | #59/#60/#61/#62 small product defects | 59, 60, 61, 62 | OPEN |
| 24 | #21 two S141 bugs | 21 | OPEN |
| 25 | #41 web valve / Q4 re-ask | 41 | OWNER item |
| 26 | #8/#9/#10/#36/#45/#51 A24 program items | 8, 9, 10, 36, 45, 51 | OPEN — 9 = A25 K36 miss ledger; 51 closed by 99 (PR 621) |
| 27 | #55/#56 two-way bus-wake hook v4 + hook timeouts | 55, 56 | OPEN |
| 28 | #66/#64/#71 tsx IPC EPERM · noRuntimeApiImport · preflight hook | 66, 64, 71 | OPEN (scout sandbox EPERM re-measured S159) |
| 29 | Factory hygiene #15/#16/#18/#23/#31/#32/#33/#35 | 15, 16, 18, 23, 31, 32, 33, 35 | OPEN |
| 30 | #87 lane DB credential in every window | 87 | OPEN — after 91 |
| 31 | #22/#53 OPA runtime · Wave 3 workers | 22, 53 | OPEN |
| 32 | E GATE-1 #68 #69 #71 #72 #73 | 68, 69, 71, 72, 73 | owner rulings pending |
| 33 | F/G older + owner/frozen | 74, 75, 76, 77, 79, 14, 24, 41, 2, 3, 4, 27 | carried |
| 34 | H standing practices | 26, 37, 49, 52, 63, 80, 86, 92, 93, 100, 101, 102, 108, 110 | practice |
| 35 | S159 CLOSE | — | done (this set) |
| 36 | F-S159-NIGHTLY-COMPAT-RED-1 | 104 | OPEN — PR 623 |
| 37 | F-S159-MASTER-PUSH-RUNS-ABSENT (withdrawn) | — | WITHDRAWN (S141 ruling) |
| 38 | F-S159-NUMERIC-SPACE-GROUP-AND-MULTIPLIER-WORDS-1 | 106 | OPEN — small card S160 |
| 39 | F-S159-GOVERNED-KEYWORD-IGNORED-ON-SEMANTIC-PATH-1 | 105 | folded into 103 |
| 40 | ARCH routing v2 → A25 | 103 | ADOPTED — S160 builds |
Doc-repo push: 107. Scout long-verdict path: 109. Turn limit: 111.

## §7 · CHAIN CARRY CHECK (mechanical, run at this cut over registers v143, v146, v147, v148, v149 → v151)
Every row id of those five registers was searched in v151. Absent ids and their exit, by evidence: 65 CLOSED in S155 (armes-new enabled=false) · 70 SUPERSEDED-BY 81 (v148) · 78 CLOSED@SLIP-SHARED-CLONE-SYNC-S157-1 (v148) · 81 CLOSED@PR 597 edc7e880213ec1d872483d5c239b54f9046c1466 (v148) · 88 CLOSED@SLIP-BUDGET-DISPATCH-S157-1 (v148).
ONE ROW WAS LOST WITHOUT AN EXIT: **86** (v148: "Doc repo push impossible from the bridge", state "open; AG-4 pushed 04f47cd at 03:59Z; later commits local") — absent from v149 with no CLOSED/SUPERSEDED/MERGED line. Restored here: **86 MERGED-INTO 107** (same subject; 107 carries it). Finding: F-S159-V149-DROPPED-ROW-86-1 (S158 close compressed a row away — the GOLDEN LEDGER violation class of F-S158-REGISTER-V148-COMPRESSED-ROWS-1). Fix: this chain check runs at EVERY close over the last five registers and its output is pasted here (practice H, from S160).
END · cwf-open-items-register-v151
