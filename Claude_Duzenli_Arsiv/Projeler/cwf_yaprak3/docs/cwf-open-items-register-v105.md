# CWF — AÇIK KALEMLER REGISTER · v105 (S101 kapanışı)
<!-- v104'ü geçersiz kılar. Bağlayıcı sıra: master-rollout-plan. -->

## §0 · ZEMİN
`origin/master` `e7939c93` · rev **268** · 624 test dosyası · 16 e2e ·
80 migration · 16 ADR · drift 7/7 · **uçuşta şerit: YOK** (S91-3 temiz).

## §1 · SOTA KAPISI — **5/7**
Dönen: #2 (S93) · #10 (S96) · #16 (S98) · #18 (S99) · #23 (S100).
Kalan: **#25 GRAPH-KB · #29 A23**.
S101 anahtar döndürmedi ve döndürmemesi doğruydu: #25/#29'un kanıtı bu oturumda
ölçülebilir hâle getirilen ekranlarda okunacak.

## §2 · S101'DE KAPANAN KALEMLER
| Kalem | Kapanış kanıtı |
|---|---|
| **#56** census-console (reopen) | Sahip özet şeridini yardımsız okudu; her satırda sahip+eylem |
| **#57** synth pacing borcu | 15 Ağu histogramı düz yayılım + canlı `pace-wait` logu |
| tek-viewport kör noktası | census fazına MERGED-INTO |
| **#60** TURN-QUESTION-TRUTH-1 | Tavan sonrası alakasız soru DOĞRU cevaplandı (canlı) |
| **#61** MCP-SETTINGS-TRUTH (1+FIX-1+FIX-2) | tk-temp silindi (canlı: 0 kalıntı); sayılar silmeden düzeldi |
| **#62** STAGES-TRUTH-1 | Canlı turda 91 okuma / 0 etiketsiz; kart 06 scope doğru |

## §3 · AÇIK KALEMLER (bağlayıcı sırada)
| # | Kalem | Dalga | Not |
|---|---|---|---|
| 27 | Vektör (Qdrant + bge-m3) | **8-1** | Mevcut EC2, iki konteyner, konteyner-probu ŞART, parite kapısı, sessiz fallback YOK |
| 47 | RBAC-GOVERNED-1 | **8-2** | + `F-S101-ANON-AUDIT-GRANT` + `F-S101-PERSONAL-ROW-CROSS-USER` hükmü |
| 25 | 🔑 **GRAPH-KB-1** | **8-3** | 4. bellek katmanı; SEED-PROBATION tetiği; F-S97-REGISTRY-PARENT-OVERWRITE burada |
| 33 | B-FRONTIER-PAIRING-1 | 8 | 🔒 kapı sonrası, ilk skordan önce |
| 29 | 🔑 A23 ANLAMA KATMANI | 9 | A23 ∩ PLANNER-0 çizili |
| 48 | FAILURE-LESSON-MEMORY-1 | 9 | **S101 canlı gerekçe üretti** (tavan dersi hatırlanmadı) |
| 59 | SILENT-FINISH | 9 | #60'ın `turnFinishClass` işiyle komşu — sırası gözden geçirilecek |
| 49 · 17 | A2A auth (401) + `context_id` · HONESTBENCH-HARNESS-0 | 9 | |
| 30 · 31 · 37 · 32 | EVAL-SPLIT + ilk ölçüm · honestbench · GOLDEN-SET-REPLAY · v1.1 kuyruğu | 10 | 🔒 |

## §4 · AÇIK BULGULAR (faz açtırmaz, adıyla izlenir)
| Bulgu | Ağırlık | Ev |
|---|---|---|
| `F-S101-OVERRIDE-DROPS-BACKEND` | **YÜKSEK** | Kendi fazı — `mergeMcpServers` gölgelenen global satırı TOPTAN değiştiriyor; `backend_id`'siz override onu her sohbet isteğinde efektif config'den düşürüyor. Armes altındaki yabancı satırların gerçek mekanizması. Düzeltme canlı turları değiştirir |
| `F-S101-PERSONAL-ROW-CROSS-USER` | ORTA | #47 — dört kişisel satır (iki hesap) `backend_id` boş, RLS gereği ulaşılamaz |
| `F-S101-ANON-AUDIT-GRANT` | DÜŞÜK | #47 — sızıntı YOK (RLS kapatıyor), gereksiz grant yüzeyi var |
| `F-S101-FK-CENSUS-BY-CONVENTION` | DÜŞÜK | Bir sonraki migrasyonlu faz — kolon-farkında katalog RPC'si ile BİRLİKTE emekli |
| `F-S101-ROUTE-READ-DUP` | ORTA | Artık ÖLÇÜLEBİLİR: ×6 backend_tools/Σ317 · ×7 domain_rules/Σ843 · ×2 entity_registry/Σ800 |
| `F-S101-PURPOSE-GATE-SCOPE` | DÜŞÜK | Turn-dışı okumalar TASARIMLA etiketsiz |
| `F-S101-LIFECYCLEOF-SERVES-UNKNOWN` | ORTA | `lifecycleOf` tanınmayan durumu `active`'e katlıyor; çağıran taraması yapılmadı |
| `F-S101-BACKENDS-SELECT-UNTAGGED` | DÜŞÜK | Emitter bulunamadı — **tahminle kapatılmadı** |
| `F-S101-MKB-TOKEN-ROTATION` | — | **Sahip planlı (haftaya). GÜNDEME GETİRME.** |

Devir: FRAME-ERROR enum · MIGRATION-LIES-WIDER (13 dosya) · corpus-vs-registry ·
**OBS-HOST-HEALTH-1** (bütçe-çiti ~20 Ağustos, 5 gün).

## §5 · HİJYEN BORCU (S102 açılışının İLK işi)
Altı `phase/*` ref origin'de duruyor, **hepsi master'a MERGED** (ancestor testi
ile doğrulandı): `census-console-2` · `mcp-settings-truth-1` ·
`mcp-settings-truth-1-fix-1` · `mcp-settings-truth-1-fix-2` · `stages-truth-1` ·
`turn-question-truth-1`. S98-L1 temiz sayfa yasası gereği silinir.

<!-- END · cwf-open-items-register-v105 -->
