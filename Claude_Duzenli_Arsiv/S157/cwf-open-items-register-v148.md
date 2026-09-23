# cwf-open-items-register-v148 — THE WHOLE OPEN LIST (owner's copy)

APPEND-ONLY. Cut at S157 close, 2026-09-23T05:24Z. Supersedes v147. Same whole-list shape; rows changed in S157 are marked S157, new rows are in "S157 · NEW ROWS".
Items leave only by CLOSED@evidence / SUPERSEDED-BY / MERGED-INTO. Every row: what it is (EN), Türkçe özet, state now, next step and date.
SOURCES READ IN FULL: register v147 (whole), bootstrap v158, the S157 bus (all rows after 2026-09-23T03:09Z), GitHub API reads 03:44Z-05:00Z.
ANCHOR: master edc7e880213ec1d872483d5c239b54f9046c1466 (PR 597, 2026-09-23T04:58:55Z; GitHub API 05:00Z). Ruleset master-merge-gate strict=true. Doc repo GitHub main 04f47cdb460aa13ac8fb72832a102982b8eeded6 (AG-4 push 03:59Z); every commit after it is LOCAL; this close set is in the project box only (bridge down at close).
DEADLINE: all of A24 by Wednesday 2026-09-23 evening TSI; no functionality removed.

## A · IN FLIGHT NOW
| # | Work | Türkçe özet | State now | Next · when |
|---|---|---|---|---|
| 58 | NO ARMES HARDCODE (top rule) | Kodda ARMES'e özel her şey kalkacak | S157: G1b CLOSED@PR 596 merge 3c930797178bd0246470c1db2aa30220d7d84f02 (04:04:08Z) + scout GREEN + Vercel production READY. G2 v3 (CARD-ARMES-G2-KNOWLEDGE-AS-DATA-S156-1-v3, sha256 05a7c9ab18b04898d2d99ba6d9d1e439f0abb2b9f834401591b16d688bc5138b) in scout-1 review (order 04:17:34Z, no verdict at close). G2c (item 83), G3 + G4 after G2. | G2 v3 verdict -> AG-1 · 2026-09-23; G2c, G3+G4 by evening |

## B · A24 PROGRAM (the product)
| # | Work | Türkçe özet | State now | Next · when |
|---|---|---|---|---|
| 39 | A24 P0 measurements: M-a held-out counts · M-b item-5 analyzer · M-c RBAC scope-filter second lens · M-d production-day definition · resultStore handle threshold · stage-12 verdict text · M2 MKB corpus · M3′ replay | A24 ön ölçümleri | M-e done S150; rest open (CARRIED UNVERIFIED) | Architect/lane 2026-09-23 |
| 40b | P1-B inline aggregates (+F-S153-TOOL-FANOUT-34-CALLS-1) | Toplamların araç verisinden hesaplanması | card v2 cut on an older master | re-measure premise, AG-4 after rotation · 2026-09-23 |
| 40c | P1-C: C2 K24 trace fields -> C3 routing exam -> C4 held-out reader -> C5 K17 entry tool -> reach canary | Yönlendirme sınavı ve iz alanları | C2 not cut | C2 -> scout -> AG-1 after G2 · 2026-09-23 |
| 40d | P2-0...P2-6 · P3 · P4 · P5 | Kanal-2 arama, planlayıcı, kalibrasyon | not cut | P2-0/P2-1 -> scout -> AG-2 · 2026-09-23 |
| 40e | PARAMS card | Parametre kartı | not cut | after 40b |
| 45 | All system params configurable via env files | Tüm parametreler env dosyasıyla | design not started | after P1 |
| 7 | Resolved parent -> child layer | Ebeveyn->çocuk katman çözümü | determinism UNMEASURED | K31 inside A24 P1 |
| 8 | Typer | Tip çıkarıcı | ABSENT | card after 13 |
| 9 | L5 miss ledgers | Kaçırma defterleri | ABSENT | card after 13 |
| 10 | Pre-LLM time slot + K29 calendar | Zaman dilimi | open | 40d P3 |
| 50 | Grouped payload recordCount / stored handle | Gruplu veride sayım hatası | open | AG-4 card after 40b |
| 51 | Tokenizer camelCase-after-fold | Kelime ayırıcı hatası | open | P2-0 |
| 36 | Vector parity 3/15 | Vektör eşleşme oranı | input to P2 | with 40d |

## C · PRODUCT DEFECTS
| # | Work | Türkçe özet | State now | Next · when |
|---|---|---|---|---|
| 28 | Document questions routed to ARMES | Doküman soruları ARMES'e gidiyor | G1a-1, G1a-2, G1b landed | replay + M2 · 2026-09-23 |
| 21 | Two S141 product bugs | S141'in iki ürün hatası | unmeasured | scout measure after P1 |
| 59 | Stamp false positive on method-name numerals | Sayı damgası yanlış alarm | open | small card |
| 60 | Recalled claim written as measured | Hatırlanan bilgi ölçülmüş gibi | open | with 59 |
| 61 | Prose says "all" when calls were dropped | "Hepsi" deniyor | open | small card |
| 62 | Canned split advice text | Sabit tavsiye metni | inside 58 | with 58 |
| 13 | Converge association failing since 2026-09-11 | Sunucu yapılandırma görevi çöküyor | one read away | Architect read S158 |
| 41 | Web valve open in production; Q4 not re-asked | Web valfi açık | live | owner re-asks Q4 |

## D · FACTORY
| # | Work | Türkçe özet | State now | Next · when |
|---|---|---|---|---|
| 17 | Scout bus status writer + classifier denial | Scout'un bus'a yazma yolu | S157: scouts wrote every status via scout_reply today; adversary/scout POST worked (PR 596, PR 597) | re-measure; may CLOSE in S158 |
| 55 | Lane bus-wake hook | Şeritleri otomatik uyandırma | v4 not cut | after 17 |
| 56 | Hook timeouts are seconds | Hook süreleri | open | after 55 |
| 66 | tsx IPC EPERM: mail-wait preflight UNMEASURED in sandboxed windows | Kart ön-kontrolü sandbox'ta çalışmıyor | open (re-measured S157 by two scouts) | small card |
| 67 | consumed_at never stamped (70+ rows) | "Okundu" damgası yok | open (F-S157-UNCONSUMED-ROWS-1) | card S158 |
| 64 | noRuntimeApiImport misses dynamic imports | Test dinamik import'u görmüyor | open | small card |
| 15 | Takeover order + self-takeover + own worktree | Şerit adresi devralma | v2 RED; v3 not cut | v3 -> scout |
| 16 | ruleset:drift gh -> curl | Kural seti kontrolü | open | small card |
| 18 | actionlint on workflows | Workflow denetimi | open | small card |
| 23 | Delete scripts/land.ts | Eski iniş betiği | open (merge guard now shares its rehearsal module) | small card |
| 31 | CP-3 accepts RELAYED/RECALLED | Kart kontrol kuralı | open | small card |
| 32 | Worktree/branch hygiene | Dal temizliği | open | own card |
| 33 | Executing lens for workflow tests | Workflow testleri | open | small card |
| 35 | REGISTER-BUG-BUCKET v58 | Hata kovası | open | small card |
| 22 | OPA runtime | OPA | recon only | open |
| 53 | Wave: 3 workers + 2 scouts | 3 işçi + 2 scout | S157 ran AG-2, AG-4 + 2 scouts; AG-1 idle awaiting G2 | with G2 GREEN |

## E · GATE-1 AGENDA
| # | Work | Türkçe özet | State now | Next · when |
|---|---|---|---|---|
| 68 | GATE-1 ⓶ steel of the merge-authority exception | Merge istisnasının çeliği | UNMEASURED; landings are GitHub auto-merge on the ruleset | scout measures; propose SUPERSEDED-BY |
| 69 | GATE-1 ⓷ ADF-ARCHITECTURE-v2 landing | ADF mimari v2 | UNMEASURED | locate artefact; owner rules H2 |
| 70 | SUPERSEDED-BY item 81 | Foreman gözlem yolu | CLOSED with item 81's landing (S157) | — |
| 71 | GATE-1 ⓺ unskippable pre-dispatch preflight hook | Atlanamaz kart ön-kontrolü | partial | with 66 |
| 72 | GATE-1 ⓻ P-9 extension candidate | P-9 | UNMEASURED | owner rules |
| 73 | P-6 observation window | Scout gözlem penceresi | OPEN by ruling | owner rules a close criterion |

## F · OLDER CARRIED ITEMS
| # | Work | Türkçe özet | State now | Next · when |
|---|---|---|---|---|
| 74 | MA-RERUN run half | Tek metrik ölçümü | open | after A24 |
| 75 | S140 plan remainder | S140 planından kalanlar | likely SUPERSEDED-BY A24 40c/40d | owner confirms |
| 76 | Archive missing bootstrap v140/v141/v143, S139 | Eksik eski belgeler | open | owner exports |
| 77 | architect:open not readable by the Architect | Açılış ölçüm aracı | NOT-READ | lane produces it |
| 78 | Owner's shared clone stale | Mac'teki kod klonu eski | S157: CLOSED@SLIP-SHARED-CLONE-SYNC-S157-1 (bus 05:18:58Z): HEAD edc7e880213ec1d872483d5c239b54f9046c1466, clean; prevention = item 89 | — |
| 79 | SOTA acceptance scoreboard 0/16 (CARRIED UNVERIFIED) | SOTA kabul skoru | not re-measured | Architect scores |

## G · OWNER ITEMS AND FROZEN
| # | Work | Türkçe özet | State | Next |
|---|---|---|---|---|
| 14 | Redis credential rotation | Redis şifre döndürme | owner decision | owner |
| 24 | Witness oven 7-day stoppages | Fırın duruşları | owner | owner |
| 41 | Q4 re-ask | Q4'ü yeniden sormak | owner | owner |
| 2 3 4 27 | Bench items | Bench işleri | FROZEN | owner unfreezes |

## H · STANDING PRACTICES
26 every document in the doc repo · 37 tracking ref after each push · 49 device_commit md5 · 52 bridge git locks · 63 Architect GitHub read + graft on bridge · 80 card times from date -u · 92 NEW S157 owner boot text names the lane first and says "leave auto mode" before an approved external write · 93 NEW S157 session open reads the last conclusion of every scheduled workflow on master.

## S156 ROWS (state after S157)
| # | Work | State now | Next |
|---|---|---|---|
| 81 | Merge guard | CLOSED@PR 597 merge edc7e880213ec1d872483d5c239b54f9046c1466 (04:58:55Z) + scout GREEN posted (SCOUT-STATUS-POST-PR597-S157-1) | — |
| 82 | Superset hand pack privilege | open | own card after G2 · 2026-09-24 |
| 83 | G2c category floor to data | not cut | after G2 lands |
| 84 | Backend-down live test | UNMEASURED | scout live read after G2 |
| 85 | Graph KB reads the published tool_graph_node rows | follow-on of G2 ORDER 9 | after G2 |
| 86 | Doc repo push impossible from the bridge | open; AG-4 pushed 04f47cd at 03:59Z; later commits local | push notice at each close / first lane window of S158 |

## S157 · NEW ROWS
| # | Work | Türkçe özet | State now | Next · when |
|---|---|---|---|---|
| 87 | Lane DB credential sits in every window's env (~/.zshenv), so any scout can print it (scout X1) | Şifre her sekmenin ortamında | open | card after rotation · S158 |
| 88 | AWS budget stop 160 below projected spend; no warning before stop | Bütçe sunucuyu kapatacaktı | CLOSED@SLIP-BUDGET-DISPATCH-S157-1 (05:04:07Z): stop 200, warning 180, A0-A5 PASS | record PR = item 90 |
| 89 | Shared clone guard (boot fast-forwards a clean clone, prints strays, close attributes them) | Klon tekrar kirlenmesin | v1 scout RED on mechanism D1-D8 (row fe985072-b28c-472e-ace8-15d045060087) | v2 = D1-D8 verbatim, EXEMPT -> AG-2 · S158 first card |
| 90 | PR 610: budget workflow record 200/180 on master | Bütçe kaydı master'a | AG-4 merging master (notice 05:11:07Z) | scout land -> master · S158 |
| 91 | cwf_lane password rotation (S157 leak) | Şerit şifresi rotasyonu | CARD-LANE-PASSWORD-ROTATION-S157-1-v2 EXEMPT at AG-4 (bus 04:28:02Z) | ORDERS 0-2 after PR 610; ALTER by Gemini operator · 2026-09-23 |

## §1 · CLOSED (reference)
S157 BY EVIDENCE: 58-G1b CLOSED@PR 596 merge 3c930797178bd0246470c1db2aa30220d7d84f02 + Vercel production READY · 81 CLOSED@PR 597 merge edc7e880213ec1d872483d5c239b54f9046c1466 · 70 closed with 81 · 78 CLOSED@SLIP-SHARED-CLONE-SYNC-S157-1 · 88 CLOSED@SLIP-BUDGET-DISPATCH-S157-1 · 86 partial (push 04f47cd).
Earlier closures: as listed in register v147 §1 (S156, S155 and the numbered list), unchanged.

## §3 · FINDINGS CARRIED BY NAME
NEW S157 (CWF-S157-FINDINGS-v1): F-S157-SOTA1-NOT-FIRST-1 · F-S157-BUDGET-FENCE-RED-FOUR-DAYS-UNREPORTED-1 (closed) · F-S157-SCOUT-PRINTED-LANE-DSN-1 (-> 91, 87) · F-S157-AUTO-MODE-CLASSIFIER-DENIES-WITHOUT-PROMPT-1 (-> 92) · F-S157-SHARED-CLONE-66-BEHIND-WITH-STRAYS-1 (closed; -> 89) · F-S157-BRIDGE-DROPS-MIDSESSION-1 (-> 86) · F-S157-ORDER-PASTED-TO-WRONG-TAB-1 (-> 92) · F-S157-CARD-ANCHOR-STALE-AT-CUT-1 · F-S157-UNCONSUMED-ROWS-1 (-> 67).
All S145-S156 findings: as carried by name in register v147 §3.

## §5 · CARRIERS
CLAUDE-PROJECT-INSTRUCTIONS v5_10 · CWF-S157-SESSION-CLOSE-v1 · CWF-S157-FINDINGS-v1 · CWF-SESSION-GRAPH-KB-v157 · register v148 (this) · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v159 · OWNER-APPROVAL-S157-BUDGET-AND-ROTATION-1 · OWNER-RULING-S157-G2-OUTAGE-EDGES-1 · OWNER-APPROVAL-S157-CLONE-SYNC-1 · A24 v1_3 · REGISTER-BUG-BUCKET v57 (STALE, 35) · cwf-sota-definition v1_5.
END · cwf-open-items-register-v148
