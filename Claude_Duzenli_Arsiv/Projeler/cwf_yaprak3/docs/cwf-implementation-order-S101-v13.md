# CWF — TAM İMPLEMENTASYON SIRASI · S101 · v13

<!-- cwf-implementation-order-S101-v13 · 2026-08-15. S99-v12'yi geçersiz kılar.
     ⚠ TÜRETİLMİŞ GÖRÜNÜM — ikinci gerçek kaynak DEĞİL. Bağlayıcı sıra
     master-rollout-plan, açık kalemler open-items-register + KB. Çelişirse
     onlar kazanır. SOTA-1 bağlayıcı: kapı anahtarı ilerleten kalem
     KÜÇÜLTÜLEMEZ/ERTELENEMEZ.
     v13 FARKI: Dalga 7 kapandı (S100, kapı 4/7→5/7); S101 DALGA-DIŞI bir
     UI-GERÇEK programı koştu (4 faz merge+deploy+kabul) ve iki şerit hâlâ
     uçuşta; zemin rev 262→265, 613→621 test dosyası; sekiz yeni bulgu,
     dört A-REC. -->

## §0 · ZEMİN (S101 içinde taze klonda HESAPLANDI, 2026-08-15)
`origin/master` **8c610a70** · docVersion **rev 265** · **621** test dosyası
(git ls-tree bağımsız sayımı) / test sayısı İDDİA — hakem PR-head CI (S37-2) ·
**16** e2e Playwright spec (AYRI) · **80** migration (canlı `schema_migrations`
= 80, bire bir) · **16** ADR · drift kapısı `[OK] 7/7` + S99-5 pozitif kontrol
CANLI doğrulandı (haritalı kod dosyası bozuldu → 5 tab FAIL → geri alındı → OK).
`phase/*` dal sayısı: **4** (hepsi merge edilmiş artık; S98-L1 temizliği oturum
kapanışında yapılacak).

**UÇUŞTA: 2 şerit** — AG-1 `#60 TURN-QUESTION-TRUTH-1`, AG-2
`#61 MCP-SETTINGS-TRUTH-1-FIX-2`. S91-3 gereği bunlar inmeden oturum kapanmaz.

## §1 · KAPI DURUMU — **5/7** (S100'den beri değişmedi)
Dönen: #2 (S93) · #10 (S96) · #16 (S98) · #18 (S99) · **#23 (S100, PB-A lexical;
valf `pathB.enabled`=0 KALIR)**.
Kalan iki anahtar: **#25 Graph-KB · #29 A23**.
S101 tek bir anahtar döndürmedi — **ve döndürmemesi doğruydu:** bu oturum
#25/#29'un ÜZERİNDE ÖLÇÜLECEĞİ ekranları ölçülebilir hale getirdi. Amaçsız bir
defterin üstüne Graph-KB kanıtı yazılamazdı.

## §2 · DALGA TABLOSU (plan, ölçüm değil)
| Dalga | A (AG-1) | B (AG-2) | C (AG-3) | D (AG-4) | Kalan | Kapı |
|---|---|---|---|---|---|---|
| ✅7 (S100) | #23 🔑 | #57 | #56 | #58 | 11 | **5/7** |
| ✅7.5 (S101, DALGA-DIŞI) | UI-GERÇEK ×4 merge | ↑ | ↑ | — | 11 | 5/7 |
| 7.9 (UÇUŞTA) | #60 turn-question | #61 settings-fix-2 | — | — | 11 | 5/7 |
| 8 (SIRADAKİ) | #25 🔑 Graph-KB | #33 | #27 Qdrant | #47 RBAC **+ F-S101-ANON-AUDIT** | 5 | **6/7** |
| 9 | #29 🔑 A23 | #49 | #17 | #48 · #59 | 3 | **7/7 → yaprak_gate** |
| 10 | #30 ilk ölçüm | #31 | #37 · #32 | — | 0 | **→ cinekop_gate** |

**Dalga-8 iç sırası (sahip onayı bekliyor):** 1) QDRANT-ENGINE-1 (AG-3) — iki
konteyner mevcut Langfuse EC2'de, konteyner-probu ŞART, parite kapısı, sessiz
fallback YOK; bütçe-çiti ~20 Ağustos döngüsü konteynerleri bilmeli. 2)
RBAC-GOVERNED-1 (AG-4) — kelepçe kalıbı, **ve `F-S101-ANON-AUDIT-GRANT` bu
maddeye acil bağlandı.** 3) #25 anahtarı A şeridinde.

## §3 · S101 HASADI — UI-GERÇEK PROGRAMI (dalga dışı, kapı taşımaz)
Sahibin ekranda yaşadığı dört şikâyetten doğdu ("ne işe yarıyor anlamıyorum ·
upuzun liste · silme yok · select ne demek"). Dördü de merge + deploy + kabul:

| Faz | Ne değişti | Kanıt |
|---|---|---|
| CENSUS-CONSOLE-2 (#56 reopen) | Her hükme SAHİP + EYLEM (deterministik, LLM yok), amaç şeridi, aranabilir pencereli tablo, THEIRS tedarikçi raporu | Sahip özet şeridini yardımsız okudu |
| MCP-SETTINGS-TRUTH-1 | Kimlik-merkezli kart, "active"=lifecycle sözlük yasası, render edilen join, evrensel retire, hesaplanmış draft-delete | 14 tablo census; serving≠enabled iki-doğru ayrıştı |
| STAGES-TRUTH-1 | Her digest okumasında ZORUNLU `purpose` (derleyici kapısı, 141 site/28 dosya), ölçülmüş yazmalar, N-of-M kesme, kalıcı scope, `cwf.flush` iki sebebiyle düzeltildi | Canlı turda 91 okuma / **0 etiketsiz** |
| SETTINGS-FIX-1 | Delete yasası durum→TARİH testine genelleşti; sayılar SİLMEDEN düzeldi (armes 141+9, superset 4+22); sır maskeleme; `system` INVARIANT | Canlı kartlar doğrulandı, 0 satır silindi |

Ek kapanış: **#57 pacing borcu** — 15 Ağu histogramı düz yayılım (00:20 · 01:21
· 02:21 · 03:21 run) + canlı `pace-wait` logu; S100'ün OWED kalemi PASS.
**Tek-viewport kör noktası** census fazına MERGED-INTO.

## §4 · AÇIK KALEMLER (bağlayıcı sırada)
🔑 = yedi anahtardan biri · 🔒 = kapı arkası

| # | Kalem | Dalga | Not |
|---|---|---|---|
| 60 | TURN-QUESTION-TRUTH-1 | UÇUŞTA | Teşhis KANITLANDI: tavan-iptali `empty`→`failed` → geçmişte cümle silindi. Yazarlık-sınıfı hükmü verildi |
| 61 | MCP-SETTINGS-TRUTH-1-FIX-2 | UÇUŞTA | Bodiless-HEAD kök sebebi; census evreni, refusal ayrıştırma, eksik çip |
| 25 | 🔑 GRAPH-KB-1 | 8 | 4. bellek katmanı; SEED-PROBATION tetiği; F-S97-REGISTRY-PARENT-OVERWRITE burada |
| 27 | Vektör (Qdrant · bge-m3) | 8 | KARAR-QDRANT-HOSTING-1: mevcut EC2, 2 konteyner; port hazır (S100 VECTOR-SEAM-1) |
| 47 | RBAC-GOVERNED-1 | 8 | + **F-S101-ANON-AUDIT-GRANT** (yüksek: `user_audit` anon okunabilir) |
| 33 | B-FRONTIER-PAIRING-1 | 8 | 🔒 kapı SONRASI ilk skordan ÖNCE |
| 29 | 🔑 A23 ANLAMA KATMANI | 9 | A23 ∩ PLANNER-0 çizili — ikinci planlayıcı asla |
| 48 | FAILURE-LESSON-MEMORY-1 | 9 | S98-L5; **S101 canlı gerekçe üretti** (tavan-iptali dersi hatırlanmadı) |
| 59 | SILENT-FINISH | 9 | #60'ın bitiş-sınıfı işiyle komşu — sıralama #60 inince gözden geçirilir |
| 49 · 17 | A2A auth (401) + `context_id` · HONESTBENCH-HARNESS-0 | 9 | |
| 30 · 31 · 37 · 32 | EVAL-SPLIT + ilk ölçüm · honestbench · GOLDEN-SET-REPLAY · v1.1 kuyruğu | 10 | 🔒 hepsi kapı arkası |

Devir borçları (faz açtırmaz, nöbette): FRAME-ERROR enum · MIGRATION-LIES-WIDER
(13 dosya) · corpus-vs-registry (grid referanslarının 1/3'ü kayıtta yok) ·
OBS-HOST-HEALTH-1 (**bütçe-çiti ~20 Ağustos: 5 gün kaldı**).

## §5 · S101'DE DOĞAN BULGULAR
`F-S101-ANON-AUDIT-GRANT` **(yüksek)** · `F-S101-FK-CENSUS-BY-CONVENTION`
(+kolon-farkında RPC ile BİRLİKTE emekli) · `F-S101-ROUTE-READ-DUP` (artık
ÖLÇÜLEBİLİR — amaç gruplaması sayesinde) · `F-S101-PURPOSE-GATE-SCOPE` ·
`F-S101-LIFECYCLEOF-SERVES-UNKNOWN` · `F-S101-PERSONAL-ROW-CROSS-USER` ·
`F-S101-BACKENDS-ENABLED-NO-WRITER` · `F-S101-MKB-TOKEN-ROTATION` (sahip
planlı — haftaya, gündeme getirilmez).

**A-REC-S101 (dördü de şeritlerin CANLI okumasıyla yakalandı):** 1) FK census
yaklaşımının zayıf sanılması (aslında superset) · 2) `cwf.flush` "hiç açılmıyor"
öncülü yanlıştı (açılıyordu; soy + sıralama iki ayrı sebep) · 3) sync'in
budamadığı ve superset'in bayat olduğu öncülleri yanlıştı (ikisi de dürüst,
defekt sayımdaydı) · 4) katalog RPC'sinin kolon bilgisi verdiği varsayıldı
(yalnız tablo adı döndürüyor). **Kök tek:** canlı artefaktı okumadan spec
yazmak (S65-1). Kural pekişti: her faz kartı bağlı olduğu yeteneği önce OKUR.

## §6 · İnsan diliyle tek paragraf
Kapı 5/7'de duruyor ve S101 bilerek anahtar döndürmedi: sahibin dört
şikâyetinden doğan UI-gerçek programı, sistemin kendi hakkında söylediklerini
ölçülebilir kıldı — artık her tablo okumasının niçin yapıldığı yazıyor, her
araç hükmünün sahibi ve yapılacak işi görünüyor, hiçbir ekran "aktif" kelimesini
iki farklı şey için kullanmıyor ve silinemeyen bir kimlik kalmadı. Bunlar
süsleme değildi: #25 Graph-KB ile #29 A23'ün kanıtı bu ekranlarda okunacak, ve
üç gün önceki hâlleriyle o kanıt okunamazdı. İki şerit hâlâ uçuşta (yanlış-soru
hatası ve census evreni); onlar inince ev temiz. Sonrası düz yol: Dalga 8
QDRANT + RBAC ile açılır, #25 anahtarı A şeridinde döner (6/7), Dalga 9'da #29
ile **yaprak_gate** (mimari tamam, ölçüm yok), ardından tek dalga daha ile liste
sıfırlanıp **cinekop_gate** (ölçülmüş, kanıtlanmış SOTA). Süreyi kısaltan tek
kaldıraç eşzamanlı şerit sayısı; tavan Architect'in RULE-25 inceleme bant
genişliği — bugün dört faz + iki hüküm tek oturumda geçtiğine göre tavan
sanıldığından yüksek.

<!-- END · cwf-implementation-order-S101-v13 -->
