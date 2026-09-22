# cwf-open-items-register-v145 — THE WHOLE OPEN LIST (owner's copy)

APPEND-ONLY. Cut mid-S155, 2026-09-22T15:40Z (18:40 TSI), on the owner's order: "GATE-1'i de ekle, tüm açık kalemleri tek liste yap, hiçbir şeyi atlama". Supersedes v144 (same session, 70 minutes earlier).
Items leave only by CLOSED@evidence / SUPERSEDED-BY / MERGED-INTO. Every row: what it is (EN), Türkçe özet, state now, next step and date.
SOURCES READ IN FULL: registers v134-v144; findings S145, S146, S147, S149, S151, S152, S153, S154; S148 retro close; S142 plan v2 and S143 open measurement (archive); REGISTER-BUG-BUCKET v57; project instructions v5_10 section 9 (GATE-1). S150 findings through register v139 section 3.
ANCHOR: origin/master fdb0df24d0b9dd288223fec55da4185f4ca62382 (PR 593, 12:46:02Z), Vercel production READY on it. Doc repo origin/main a1273232d7435f6f8f14f7332d60acdafe3cd12d; later S155 commits LOCAL.
DEADLINE: all of A24 by Wednesday 2026-09-23 evening TSI; no functionality removed.

## A · IN FLIGHT NOW (lanes working)
| # | Work | Türkçe özet | State now | Next · when |
|---|---|---|---|---|
| 30 | Lane node fetch ignores proxy | Şerit ağ çağrıları proxy'yi kullanmıyor | PR 594 head f592bce014f827a8f2140d43c87cba41b3382141; CI 3/4 success, Build running (15:34Z); ORDER-SCOUT-LAND-PR594-S155-1-v1 on bus 15:35:15Z | scout GREEN -> auto-merge -> master · 2026-09-22 evening |
| 46 | cwf_lane password rotation | Şerit veritabanı şifresini değiştirmek | CARD v6 at AG-4 (bus 15:36:14Z, EXEMPT on scout RED v5); ORDERS 0-2 only | slip -> Gemini ALTER -> ORDER 3 notice -> owner IDE relaunch · ALTER before 2026-09-23 12:00 TSI |
| 58 | NO ARMES HARDCODE (top rule) | Kodda ARMES'e özel her şey kalkacak | G0 CLOSED, G1a-1 CLOSED (PR 593); G1a-2 v3 at scout (bus 15:38:00Z); G2 knowledge-to-data, G3 tests/fixtures, G4 CI grep gate (public/ included, case-sensitive) NOT CUT; 62 inside G1 | G1a-2 land 2026-09-23 morning; G2+G3+G4 by 2026-09-23 evening |

## B · A24 PROGRAM (the product)
| # | Work | Türkçe özet | State now | Next · when |
|---|---|---|---|---|
| 39 | A24 P0 measurements: M-a held-out counts · M-b item-5 analyzer · M-c RBAC scope-filter second lens · M-d production-day definition (F-S149-TODAY-IS-CALENDAR-DAY-1) · resultStore handle threshold (39 KB payload) · stage-12 verdict text · M2 MKB corpus · M3′ replay | A24 ön ölçümleri | M-e done S150; rest open; M-b and M-d had dropped from the row text after v139 (restored) | Architect 2026-09-23 morning; M2/M3′ by a lane with 28 |
| 40b | P1-B inline aggregates, executor's deterministic half (+F-S153-TOOL-FANOUT-34-CALLS-1) | Toplamların araç verisinden hesaplanması | card v2 in AG-4 box, cut on an older master | re-measure premise, AG-4 after 46 ORDERS 0-2 · 2026-09-23 |
| 40c | P1-C: C1 CLOSED; C2 K24 trace fields -> C3 routing exam (golden case F-S149-SCRAP-TOOL-NOT-OFFERED-Q3-1) -> C4 held-out reader -> C5 K17 entry tool -> reach canary | Yönlendirme sınavı ve iz alanları | C2 not cut | C2 -> scout -> AG-1 after G1a-2 · 2026-09-23 |
| 40d | P2-0...P2-6 (channel-2 BM25+RRF, TR analyzer K15 = items 5, 36, 51) · P3 (JSON DAG planner, conformal K9/K25 = item 6, K28 A3 output template F-S149-A3-TEMPLATE-ABSENT-1, K29 calendar = item 10, scope sentence F-S149-SCOPE-REFUSES-IN-DOMAIN-SYNTHESIS-1, K30 web) · P4 · P5 | Kanal-2 arama, planlayıcı, kalibrasyon | cards not cut; AG-2 not booted | P2-0/P2-1 -> scout-2 -> AG-2 · 2026-09-23 |
| 40e | PARAMS card (every governed param the wave needs, at safe floors) | Parametre kartı | not cut | after 40b · 2026-09-23 |
| 45 | All system params configurable/backup/restore via env files (OWNER-RULING-S150-PARAMS-UI-ONLY-TODAY-1, second half) | Tüm parametreler env dosyasıyla | design not started | after P1 |
| 7 | Resolved parent -> child layer | Ebeveyn->çocuk katman çözümü | three repairs on master (S147); determinism UNMEASURED | K31 inside A24 P1 · 2026-09-23 |
| 8 | Typer (③) | Tip çıkarıcı | ABSENT | card after 13 · 2026-09-23 |
| 9 | L5 miss ledgers | Kaçırma defterleri | ABSENT | card after 13 · 2026-09-23 |
| 10 | Pre-LLM time slot + K29 calendar | Zaman dilimi | open | 40d P3 |
| 50 | Grouped payload: recordCount counts one group; stored handle holds first group only | Gruplu veride sayım hatası | open | AG-4 card after 40b · 2026-09-23 |
| 51 | Tokenizer camelCase-after-fold | Kelime ayırıcı hatası | open | P2-0 |
| 36 | Vector parity 3/15 | Vektör eşleşme oranı | input to P2 | with 40d |

## C · PRODUCT DEFECTS
| # | Work | Türkçe özet | State now | Next · when |
|---|---|---|---|---|
| 28 | Document/company questions routed to ARMES (F-S153-DOC-QUESTION-MODEL-CHOSE-ARMES-1) | Doküman soruları ARMES'e gidiyor | G1a-1 landed; G1a-2 in review | replay + M2 after G1a-2 lands · 2026-09-23 |
| 21 | Two S141 product bugs: CHOSEN-OPTION-DOES-NOT-NARROW-ITS-SIBLING-REF · PREFIX-TIER-MATCHES-WRONG-FACTORY-LINE-AND-FACTORY-ID | S141'in iki ürün hatası | unmeasured | scout measure after P1 · 2026-09-23 |
| 59 | Stamp false positive on method-name numerals ("5 Neden Analizi") | Sayı damgası yanlış alarm | open | small card · 2026-09-23 |
| 60 | Recalled claim written as measured | Hatırlanan bilgi ölçülmüş gibi yazılıyor | open | with 59 |
| 61 | Prose says "all" when calls were dropped | Çağrı düştüğü halde "hepsi" deniyor | open | small card · 2026-09-23 |
| 62 | Canned split advice text | Sabit tavsiye metni | inside 58 G1 | with 58 |
| 13 | Converge association failing since 2026-09-11 | Sunucu yapılandırma görevi çöküyor | one read away | Architect read · 2026-09-23 morning |
| 41 | Web valve open in production; Q4 not re-asked (M-f) | Web valfi açık | live | owner re-asks Q4 |

## D · FACTORY (lanes, gates, bus)
| # | Work | Türkçe özet | State now | Next · when |
|---|---|---|---|---|
| 17 | Scout bus status writer (+F-S146-PR587-MERGED-BEFORE-SCOUT-STATUS-1, F-S152-SCOUT-BUS-WRITE-BLOCKED-1, F-S154-SCOUT-STATUS-LOST-IN-OUTAGE-1) | Scout'un bus'a yazma yolu | open | small card before 55 · 2026-09-23 |
| 55 | Lane bus-wake hook (OWNER-RULING-S152-BUS-WAKE-HOOK-1) | Şeritleri otomatik uyandırma | v4 not cut | after 17 · 2026-09-23 afternoon |
| 56 | Hook timeouts are seconds | Hook süreleri yanlış birimde | open | after 55 |
| 66 | tsx IPC EPERM: mail-wait preflight UNMEASURED, cards delivered UNCHECKED in sandboxed windows (absorbs 19) | Kart ön-kontrolü sandbox'ta çalışmıyor | open | small card: every tsx entry via node --import tsx · 2026-09-23 |
| 67 | consumed_at / reply surface: an unstarted and a working lane look identical (27 of 166 rows stamped in 3 days); unnumbered since S145 | "Okundu" damgası yok | open | small card with 55 |
| 64 | noRuntimeApiImport misses dynamic imports | Test dinamik import'u görmüyor | open | small card · 2026-09-23 |
| 15 | Takeover order + self-takeover + own worktree (+F-S146-SHARED-CLONE-RACE-1) | Şerit adresi devralma kuralları | v2 RED; v3 not cut | v3 -> scout · 2026-09-23 |
| 16 | ruleset:drift gh -> curl | Kural seti kontrolü | open | small card |
| 18 | actionlint on workflows | Workflow denetimi | open | small card |
| 23 | Delete scripts/land.ts | Eski iniş betiğini silmek | open | small card |
| 31 | CP-3 accepts RELAYED/RECALLED | Kart kontrol kuralı | open | small card |
| 32 | Worktree/branch hygiene | Dal temizliği | open | own card |
| 33 | Executing lens for workflow tests | Workflow testleri | open | small card |
| 35 | REGISTER-BUG-BUCKET v58 (v57 stale since S141; v56 section B carried unread since S120) | Hata kovası güncellemesi | open | small card; v58 reconciles v56 section B |
| 22 | OPA runtime | OPA çalışma zamanı | recon only | open |
| 53 | Wave: 3 workers + 2 scouts | 3 işçi + 2 scout düzeni | AG-2 not booted | with first P2 GREEN card |

## E · GATE-1 AGENDA (project instructions section 9, S133) — ADDED BY OWNER ORDER, never numbered before
| # | Work | Türkçe özet | State now | Next · when |
|---|---|---|---|---|
| 68 | GATE-1 ⓶ steel of the merge-authority exception (PLATINUM-BREACH-S122-1 stands) | Merge istisnasının çeliği | UNMEASURED since S133; merges now happen by GitHub auto-merge on the ruleset (AUTO-MERGE-LANDING-v1), which may supersede it | scout measures ruleset + land.ts use; propose SUPERSEDED-BY with evidence · 2026-09-23 |
| 69 | GATE-1 ⓷ ADF-ARCHITECTURE-v2 landing (H2 direction OPEN) | ADF mimari v2'nin inişi | UNMEASURED since S133 | locate the artefact in repo/archive; owner rules H2 · 2026-09-23 |
| 70 | GATE-1 ⓸ foreman observation-report path | Foreman gözlem raporu yolu | UNMEASURED; no foreman lane runs today (lanes AG-1/2/4 + 2 scouts) | measure; propose close or re-scope · 2026-09-23 |
| 71 | GATE-1 ⓺ unskippable pre-dispatch preflight hook | Atlanamaz kart ön-kontrolü | partial: DB adversary gate enforces; mail-wait runs CARD_GATE=REPORT (not enforced) and is UNMEASURED in sandboxed windows (66) | with 66 · 2026-09-23 |
| 72 | GATE-1 ⓻ P-9 extension candidate | P-9 genişleme adayı | UNMEASURED since S133 | read its text in the S133 archive; owner rules |
| 73 | P-6 observation window over the S132 adversary mechanism (OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1) | Scout mekanizması gözlem penceresi | OPEN by ruling; no close criterion recorded | owner rules a close criterion |

## F · OLDER CARRIED ITEMS FOUND IN THE ARCHIVE (pre-S145, never numbered)
| # | Work | Türkçe özet | State now | Next · when |
|---|---|---|---|---|
| 74 | MA-RERUN run half: dispatch + measurement + artefact (harden landed PR 519, S134) | Tek metrik ölçümünün yeniden koşusu | open since S135 | dispatch on a branch ref (no spend) · after A24 |
| 75 | S140 plan remainder: section 9-1 baseline Recall@k on two trees · tool-selection observation (offered vs called) · scope gate | S140 planından kalanlar | UNMEASURED; very likely SUPERSEDED-BY A24 40c C3/C4 and 40d | map row by row after 76; owner confirms |
| 76 | Archive missing S139/S140 folders, bootstrap v140-v143, CWF-S140-IMPLEMENTATION-PLAN-EVERYTHING-LIVE-v2 (F-S143-ARCHIVE-MISSING-...-1) | Eski proje kutusundaki eksik belgeler | open; still absent (ls 15:3xZ) | owner exports them from the cwf_yaprak_8 box into the archive |
| 77 | architect:open not readable by the Architect (ARCHITECT-CANNOT-RUN-THE-REPOSITORY-GATES-1); project instructions section 0 requires it every open | Açılış ölçüm aracı çalışmıyor | NOT-READ since S138; cardPreflight now runs on the bridge via node --import tsx, so the same path may run it | try at S156 open; else a lane produces it |
| 78 | Owner's shared clone master stale (51 behind origin/master at 15:0xZ); lanes branching without fetch start old | Senin Mac'teki kod klonu eski | open | lane cards say "off origin/master" (done in S155 cards); one fetch by a lane · 2026-09-23 |
| 79 | SOTA acceptance scoreboard (B): 16 external criteria; 0/16 carried UNVERIFIED since S122; S142 measured 15 of 16 blocked by the frozen bench items | SOTA kabul skoru | not re-measured | Architect reads cwf-sota-definition v1_5 and scores · S155 close; owner decides the bench freeze against SOTA-1 |

## G · OWNER ITEMS AND FROZEN
| # | Work | Türkçe özet | State | Next |
|---|---|---|---|---|
| 14 | Redis credential rotation | Redis şifre döndürme | owner decision | owner |
| 24 | Witness oven 7-day stoppages | Fırın duruşlarına bakmak | owner | owner |
| 41 | Q4 re-ask with web valve open (M-f) | Q4'ü yeniden sormak | owner | owner |
| 2 3 4 27 | Bench: A2A · RESET · BACKEND-MOUNT · persona | Bench işleri | FROZEN (OWNER-RULING-S143-FREEZE-BENCH-1) | owner unfreezes (see 79) |

## H · STANDING PRACTICES (not work, kept by name)
26 every document in the doc repo · 37 tracking ref after each push (done S155) · 49 device_commit md5 · 52 bridge git locks · 63 Architect GitHub read + graft on bridge · 80 NEW Architect writes card times from `date -u` in the same command (F-S150-CARD-MEASURED-AT-AHEAD-OF-CLOCK-1 recurred five times in S155).

## §1 · CLOSED (reference)
1 · 5 (MERGED-INTO 40d) · 6 (SUPERSEDED-BY K9/K25) · 11 · 12 · 19 (MERGED-INTO 66) · 20 · 25 · 29 · 34 · 38 · 40 · 40c-C1 · 42 · 43 · 44 · 47 · 48 · 54 · 57 · 58-G0 · 58-G1a-1 · 65 · F-S155-BRIDGE-CP-BUNDLE-RAN-RELAYAUDIT-1 (closed by practice: the bridge runs node --import tsx scripts/cardPreflight.ts).

## §3 · FINDINGS CARRIED BY NAME
All findings S145-S155 by name, each mapped to a row above. NEW S155: F-S155-OPEN-LIST-TOOK-DELTA-REGISTER-ONLY-1 · F-S155-BRIDGE-CP-BUNDLE-RAN-RELAYAUDIT-1 · F-S155-CP-SYMLINK-SILENT-GREEN-1 · recurrence of F-S150-CARD-MEASURED-AT-AHEAD-OF-CLOCK-1.

## §5 · CARRIERS
CLAUDE-PROJECT-INSTRUCTIONS v5_10 · CWF-S154-SESSION-CLOSE-v1 · CWF-S154-FINDINGS-v1 · CWF-SESSION-GRAPH-KB-v154 · register v145 (this) · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v156 · A24 v1_3 · REGISTER-BUG-BUCKET v57 (STALE, 35) · cwf-sota-definition v1_5.
END · cwf-open-items-register-v145
