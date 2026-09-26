# cwf-open-items-register-v149 — THE WHOLE OPEN LIST (owner's copy)

APPEND-ONLY. Cut at S158 close, 2026-09-26T14:50Z. Supersedes v148. Row detail restored from CWF-S158-CONSOLIDATED-OPEN-ITEMS-v1 (F-S158-REGISTER-V148-COMPRESSED-ROWS-1, closed by this version). Rows changed in S158 are marked S158; new rows in "S158 · NEW ROWS".
Items leave only by CLOSED@evidence / SUPERSEDED-BY / MERGED-INTO. Every row: what (EN), Türkçe özet, state now, next and date.
SOURCES READ IN FULL: register v148, CWF-S158-CONSOLIDATED-OPEN-ITEMS-v1, bootstrap v159, the S158 bus rows by name, Vercel production deployment list 2026-09-26T13:42Z, production DB (turn_trace_digest, messages) 13:50Z.
ANCHOR: master 6e385480d0aecce6a3e8d65ae732b4049c75a1a8 (Merge PR #620, Vercel production READY). Every line not re-measured in S158 says CARRIED UNVERIFIED.

## A · IN FLIGHT NOW
| # | Work | Türkçe özet | State now | Next · when |
|---|---|---|---|---|
| 58 | NO ARMES HARDCODE (top rule). G2c category floor to data (83) · G3 tests/fixtures/comments/diagrams · G4 CI grep gate INCLUDING public/, CASE-SENSITIVE (F-S154-CASE-INSENSITIVE-ARMES-GREP-HITS-CLEARMESSAGES-1, F-S154-G4-SCOPE-MISSES-PUBLIC-1). 62 inside. | Kodda ARMES'e özel her şey kalkacak | S158: G2 CLOSED@PR 613 merge 628e9ccf9632b4d7c2e8943a84c9ba42b8d86a27 (Vercel prod READY). G2c, G3, G4 not cut. | G2c card -> scout -> AG-1 · S159 |
| 99 | NEW S158: A24-P20 tokenizer (item 51, 40d P2-0), ex-PR 619 | Tokenizer işi | PR 619 closed by RULING-PR619-YIELD-S158-1; rebuild on a fresh branch ordered (NOTICE-PR619-REBUILD-S158-1, bus 13:40:49Z, AG-2). pbFullMeasure UNMEASURED. | AG-2 slip -> scout land order -> master · S159 open |
| 91 | cwf_lane password rotation (S157 leak) | Şerit şifresi rotasyonu | OPERATOR-PROMPT-S158-ITEM91-ALTER-ROLE-1 cut; outcome NOT RE-MEASURED at close (CARRIED UNVERIFIED) | read the operator result / AG-4 slip · S159 open |
| 89 | Shared clone guard | Klon muhafızı | v2 (scout D1-D8) state NOT RE-MEASURED at close (CARRIED UNVERIFIED) | read bus · S159 open |

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
| 95 | NEW S158: grounding blind to tr-TR numbers (F-S158-GROUNDING-BLIND-TO-TR-NUMBERS-1) | Doğrulama Türkçe sayıyı görmüyor | open | FIRST card S159 |
| 21 | Two S141 bugs: CHOSEN-OPTION-DOES-NOT-NARROW-ITS-SIBLING-REF · PREFIX-TIER-MATCHES-WRONG-FACTORY-LINE-AND-FACTORY-ID | S141'in iki hatası | unmeasured | scout measure after P1 |
| 59 | Stamp false positive on method-name numerals ("5 Neden Analizi") | Sayı damgası yanlış alarm | open | small card |
| 60 | Recalled claim written as measured | Hatırlanan bilgi ölçülmüş gibi | open | with 59 |
| 61 | Prose says "all" when calls were dropped | "Hepsi" deniyor | open | small card |
| 62 | Canned split advice text | Sabit tavsiye | inside 58 | with 58 |
| 13 | Converge association failing since 2026-09-11 | Converge çöküyor | one read away (CARRIED UNVERIFIED) | Architect read S159 |
| 41 | Web valve open in production; Q4 not re-asked (M-f). S158: capital turn offered web_fetch (webValveSource db) | Web valfi açık | live | owner re-asks Q4 |
| 82 | Superset hand pack privilege (F-S156-SUPERSET-HAND-PACK-PRIVILEGE-1) | Superset paket ayrıcalığı | open | own card · S159 |
| 83 | G2c category floor to data (toolCategories.ts key + every consumer + MKB key + CANONICAL_METRIC_TOOLS) + ALWAYS_INCLUDE (F-S158-ALWAYS-INCLUDE-ARMES-HARDCODE-1) | Kategori tabanı veriye | not cut | S159 (= 58) |
| 84 | Backend-down live test | Backend çökünce uyduruyor mu | UNMEASURED | scout live read · S159 |
| 85 | Graph KB reads published tool_graph_node rows | Graf KB | open | after 83 |
| 97 | NEW S158: keyword overlap hygiene (makine, parametre, enerji, bilgi, rapor, personel sayısı, faaliyet raporu) + TR inflection (F-S158-TR-INFLECTION-BLIND-1 -> 99) | Anahtar kelime çakışması | open | operator data card · S159 |

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
END · cwf-open-items-register-v149
