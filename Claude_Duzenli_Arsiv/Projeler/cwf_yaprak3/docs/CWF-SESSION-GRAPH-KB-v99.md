# CWF — SESSION GRAPH KB · v99 · (S98 kapanışı)

<!-- CWF-SESSION-GRAPH-KB-v99 · 2026-08-13. v98'i (S97) geçersiz kılar.
     S98'in TAM tutanağı: beş yasa, sekiz Architect öz-düzeltmesi, altı bulgu,
     iki üretim vakası, altı kapanan kalem, sekiz doğan kalem.
     Hiçbiri özetlenerek atılmadı — sahip talimatı: eksiksiz ve hatasız. -->

## ZEMİN (S98 kapanışında taze klonda HESAPLANDI)
`origin/master` **`4faf054a6713b0dabd7599005ddc38fbfaec2833`** · docVersion
**rev 250** · **582** vitest test dosyası (+14 Playwright `e2e/*.spec.ts`,
vitest korpusu dışında — S98'de TANIM yazıldı) · **78** migration (canlıda 78,
bire bir; tepe `20260813130000_observability_host_health.sql`) · **15** ADR ·
drift 7/7 · **`phase/*` = 0** · üretim deploy `79e8eea` READY (tepe `4faf054`
docs-only, deploy'u CANCELED — kod pariteli; **nöbet**: bir sonraki merge'de
doğal olarak yakalanacak).

**Kanarya:** üç ardışık 9/9-0, `underpowered` kelime-cap'inde KİLİTLİ.
İzlenir, açılmaz, yeniden teşhis YASAK (mühür #37/GOLDEN-SET).

---

## §1 · S98'DE DOĞAN YASALAR (beşi de bağlayıcı)

**S98-L1 — TEMİZ SAYFA.** Her dalga temiz açılır: artık dosyalar, ölü
worktree'ler ve merge edilmiş dallar silinir. Paylaşımlı ÇALIŞMA AĞACI
YASAK; ortak nesne deposu + şerit-başı münhasır worktree standart kalır.
*(Uygulandı: 53 dal silindi, worktree 36→5, `fsck` temiz; dalga sonunda
dört lane dalı daha silindi → `phase/*` = 0.)*

**S98-L2 — HESAPLANMIŞ HEDEF.** Yıkıcı bir emir hedefini HESAPLANMIŞ
kimlikle adlandırır, anlatıyla değil. *(Doğuş: Architect "klonu sil" dedi;
o dizin repo kökü + ~30 worktree'nin `.git`'iydi — AG-1 durdurdu.)*

**S98-L3 — SÜREÇ-DURUMU.** Çıktı tamamlığı süreç bitişi değildir. Şeridin
çalışıp çalışmadığını yalnız sahip görür; Architect ya sahibin gözlemine
dayanır ya "bilmiyorum" der. Sensörler yalnız ÇIKTIYI görür (commit, satır).

**S98-L4 — ÖLÇÜM TÜKETİCİSİYLE DOĞAR** (sahip yasası). Ölçen bir organın
doğum kanıtı İLK TÜKETİCİSİNİ de kapsar. Kimsenin okumadığı ölçüm ölüdür;
sayım/deneyim verisi modele (pack) ve kalıcı hafızaya AKMALI. Her ölçüm
organı fazında "bu veriyi kim okuyor?" sorusunun cevabı adıyla yazılır.
*(Doğuş: #10 sayımı S96'da ölçtü, veri S98'e dek modele hiç ulaşmadı —
sahip aynı duvara üç kez çarptı.)*

**S98-L5 — KAZIK DEFTERİ** (sahip yasası). *"Tecrübe, yenilen kazıkların
toplamıdır."* Negatif tecrübe birinci sınıf bilgidir: başarısız turdan çıkan
ARAÇ-GERÇEĞİ (aracın ne istediği, neden çalışmadığı) kalıcı ve
MODEL-GÖRÜNÜR hafızaya otomatik yazılmalı. Kazığın TARİFİ değil GERÇEĞİ
kaydedilir (S87 başarı-şartlı prosedür geri-çağırması DOKUNULMAZ); geçici
arıza ders sayılmaz (onun defteri `backend_health`); ayrım deterministik,
LLM-hakem asla. **Yürüyüş kalemi #48 FAILURE-LESSON-MEMORY-1.**

---

## §2 · ARCHITECT ÖZ-DÜZELTMELERİ (sekiz; kök: ölçmeden yazmak)

| # | Ne oldu | Yakalayan |
|---|---|---|
| A-REC-S98-1 | Üçlü-kayıt zincirinin 3. halkası (`grantPolicy.ts`) çite yazılmadı — çit HİÇBİR altkümeyle sağlanamaz haldeydi | AG-1 (ölçüp durdu) |
| A-REC-S98-2 | Yıkıcı emir hesaplanmamış hedefe ("klonu sil" = repo kökü + 30 worktree) | AG-1 (durdu) |
| A-REC-S98-3 | Dal sayımı `head -30` ile kesik örneklem, tam-küme iddiası olarak sunuldu | AG-1 (döngüyle 3 dal daha buldu) |
| A-REC-S98-4 | "AG-1 boşta" iddiası sensörsüz (S98-L3'ün doğuşu) | Sahip (ekran) |
| A-REC-S98-5 | AG'ye var olmayan kapıdan (`from_lane`) cevap emredildi — AG'lerin dönüş yolu git'tir | AG-2 |
| A-REC-S98-6 | Mühür tespiti `git log --grep` ile emredildi: büyük/küçük harf duyarlı + lane başına tek mühür varsayımı; OBS'nin İKİNCİ mührü görünmezdi | AG-1 (manifest imzasıyla) |
| A-REC-S98-7 | Mount koreografisinde transport belirtilmedi (SSE vs streamable-http) | Sahip (ekran) |
| A-REC-S98-8 | Faz kabul kriterinde UI GÖRÜNÜRLÜĞÜ yok: yeni birincil eylem (`verify`) etiketlerden ayrışmıyor; terfi iki adım ve ikisinde de aynı kelime (`resume`) | Sahip (kullanamadı) |

Sekizinin ortak kökü S97-L1 ile aynı: **belgeden yazmak, canlıdan okumamak.**
Sekizinin de yakalanma yolu aynı: şeridin/sahibin duruşu.

---

## §3 · KAPANAN KALEMLER (altı)

**#42 RELAY-BUS-1** — `relay_inbox` organı. Üç dar yetki (Architect `to_lane`
yazar · tüketici kendi `consumed_at`'ini BİR KEZ damgalar · YALNIZ Operator
`from_lane` yazar, DDL CHECK'iyle). Append-only trigger (TRUNCATE dahil —
brifingin kaçırdığı tek-statement bypass), üç ayrı SQLSTATE (RI001/2/3),
her guard'da `IS DISTINCT FROM` (AG-1 metin-falsifier iznini reddedip gerçek
PG'de koştu ve `null <> null` kusurunu yakaladı). ADR-015. İki yönlü doğum
kanıtı kapandı. **MAIL-WAIT protokolü** (sahip önerisi): tur işini bitirince
ölmez, ~90sn poll / 40dk bütçe → zil N karttan uzun-sessizlik başına 1'e indi.
Ölçülen teslim gecikmesi: 68-108sn (ana promptlar).

**#43 CI-DIET-2** — **F-S98-CI-NODE-MISMATCH** kapandı: kapı 20/22 koşarken
üretim Node **24.x**'ti ve suite o sürümde HİÇ ölçülmemişti; şimdi tek bacak
24.x (ilk koşu 7679/7680 yeşil). Coverage + 20/22 → `nightly-compat.yml`
(cron `17 7 * * *`, Vercel cron bandı dışı, "alarm duyulur" saat). **Efekt
ÖLÇÜLDÜ ve tahmini DÜZELTTİ:** GitHub işleri paralel koşar → duvar-saati
kritik yoldur, toplam değil. Eski kapı 7m26s/7m55s → yeni 6m31s (~1dk);
runner-dakikası 22m51s → 9m32s (**~%60 ucuz**). "15dk→6dk" ifadesi YANLIŞTI —
KARAR bu ölçümle düzeltildi. eval-canary/tenant-zero/drift/rule26/S37-2
bayt-dokunulmadı.

**#16 BENCH-BACKEND-MOUNT-1 🔑** (SOTA anahtar 3/7) — draft doğar → gözlemle
doğrulanır → insan terfi ettirir. **CANLI DOĞUM KANITI:** `mount-probe`
kimliği panelden yaratıldı → `lifecycle=draft` (DB doğrulandı, bir an bile
`active` görünmedi) → `verify` → `verified · tools: 4 · 473ms`, keşfedilen
adlar `hb_entity_lookup, hb_grove_status, hb_grove_yield_total,
hb_sensor_readings_list`, ayna 4 satır + 5 sağlık kaydı, ekran=DB birebir →
`resume` ×2 → `active` → `pause`. **Kodsuz, deploysuz mount kanıtlandı.**
İki uçuş-içi çit amendmenti: (R1) `RuleStoreRepository.createBackend`'e
opsiyonel `lifecycle` — iki adımlı INSERT+UPDATE REDDEDİLDİ ("bugün güvenli"
değil "yapı gereği güvenli"); (R4) `src/lib/adminService.ts` APPEND-ONLY
protokolüyle üç şeride birden açıldı (S97 emsali; iki dur-ve-sor önlendi).

**#13 PACK-FROM-PROTOCOL-1** — pack protokolden TÜRETİLİR (ayna + sayım);
el pack'leri (armes/superset) bayt-pinli ÜST katman olur; boş ayna → bölüm
YOK, okunamayan ayna → adıyla degrade (üç ayrı durum: `mirror-unreadable` /
absent / empty). Fake-backend genericity testi. **Dürüst öz-yargı:** türetilen
pack kapalı değer kümelerini ve argüman şekillerini verir (gerçek grounding),
ama ANLAM veremez — el katmanının yerine geçmez, "sessiz backend"i önleyen
tabandır. **W-035 KAPANDI-AS-RELOCATED**: token hiçbir canlı register/bucket/
rollout belgesinde yok — etiket ÖKSÜZ; işaret ettiği yara canlı
(`evalGate.ts:164` literal `armes` sabiti) → **#50** olarak yeniden doğdu.

**#12 METRIC-VOCAB-DISCOVERY-1** — vokabüler YAZARI doğdu ve yalnız DRAFT
yazar (F95 mutlak: self-publish yok; `createDraft` seam'i, panel tıkıyla aynı
kapı). Per-backend by construction; platform tabanı BOŞ kalır (`oee` sızmaz).
Provenance payload'da yaşayamaz → ayrı taşıyıcı (tasarım bulgusu).
**DOĞUM KANITI NEGATİF ve bu SONUCUN KENDİSİ:** "doğalgaz" aday olarak
ÇIKMADI — sebep yapısal: ayna gateway'in ARAÇ TANIMLARINI taşır, o gateway'in
döndürdüğü ARTEFAKT adlarını değil. `list_charts` `slice_name` alanını
belgeliyor; başlığın kendisi çağrı-anı payload'ı, hiçbir yerde saklanmıyor.
Sayım da kurtarmazdı (`response_fields` alan ADLARINI tutar). Superset'te
0 sayım satırı, 0 entity kaydı. → **#49 ARTIFACT-NAME-OBSERVATION-1**.

**#44 OBS-HOST-TRUTH-1** — **F-OBS-FLUSH-OK-LIE KAPANDI**: `ok` artık YALNIZ
teslim demek; yalan ÖNCE kanıtlandı (teslim etmeyen exporter `ok` basıyordu),
sonra mutasyonla öldürüldü. Üç-verdict host sondası doğdu: `reachable` /
`unreachable` / `could-not-read` — canlı üç kol da GERÇEK ağa karşı okundu
(404 cevaplayan host 286ms; gerçekten erişilemez host `network-error` 1ms;
host yapılandırılmamış `no-host-configured`). **Yeni tablo
`observability_host_health`** (stop-and-ask → Architect yetkisi; gerekçe:
`backend_health` FK'lı ve Langfuse backend değil — şemayı memnun etmek için
backend uydurmak RULE 4'ün kaldırdığı enum tuzağı; `telemetry_events` ise
ADR-004'ün ayrı tuttuğu ledger). ADR-014 sınıfı `operational.mirror`
(gerekçesi yazılı: gözlem, asla otorite). CHECK `down` kelimesini REDDEDİYOR —
çünkü `down`, `unreachable` ile `could-not-read`'i sessizce birleştirir.
RLS on / 0 policy / revoke tam; verifyGrants 79→80 sınıfı geçti.
**EKSİK (yeni kalem #45):** sondayı tetikleyen uç ve cron girdisi YOK →
tablo boş, host hâlâ ölçülmüyor. Bağlam tükenmesiyle yarım kaldı.

---

## §4 · ÜRETİM VAKALARI (iki, ikisi de deftere)

**F-S98-SILENT-FINISH-AFTER-TOOLS** (tek örnek, nöbet). Sahip "Granit doğalgaz
grafiği" sordu → 6 araç çağrısı, chart verisi GELDİ (85 nokta), model
`finishReason=other` ile sustu (132K input). F69 tasarımı gereği araç'lı
silent-finish retry edilmez; dürüst stand-in basıldı, `fetchedNotDrawn=true`,
Memory `outcome=failed`. İkinci denemede çalıştı → anlık model tökezlemesi.
Yan gözlem: frame `metrics=[]` → #12'nin canlı specimen'i.

**F-S98-SHIFT-QUERY-UNUSABLE** (ARMES yetenek boşluğu, bizim taraf değil).
Sahip iki kez "Granit dün 16-24 vardiyası personeli" sordu, iki kez cevapsız.
Canlı ölçüm: `getEmployeeShiftBetween` **`employeeIds` UUID listesi İSTİYOR**
(yumurta-tavuk: cevabı bilmeden soru sorulamıyor; 6811 çalışan, tek çağrıda
alınamıyor) · `getEmployees` yalnız `fullName/id/personnelID` döndürüyor
(hat/zon YOK) · sayım: `getActiveShifts`=**error**, iki vardiya aracı=**unread**.
İlk adlandırma **F-S98-WRONG-TOOL-THEN-GIVE-UP** ölçümle DÜZELTİLDİ: model
erken pes etmedi, dar araç da cevabı veremezdi. Sistem UYDURMADI (ADR-001
tuttu). Sonuç bütçesi (120K) dolunca liste TAM saklandı, hiçbir kayıt atılmadı.
→ ARDIC'a not gönderildi (sahip iletti).

**ARMES yetki bulgusu (ARDIC'a iletildi):** 13 araç aynı hatayla düşüyor —
*"User has no access to factory"* (`getActiveShifts`, `getCarPoolList`,
`getCarQuantityInfo`, `getCookedStockAndon`, `getEntitySummary`,
`getInventoryCatalogue`, `getMaterials`, `getMaterialTypes`,
`getMoistureContentTable`, `getOrderList`, `getRawStockPool`,
`getTransferrableZoneList`, +`getRecipe` dolaylı). Tek yetki dokunuşu 13 aracı
birden açar. ARMES sayım özeti: **9 ok · 18 error · 70 unread** (97 araç).

---

## §5 · NÖBETLER (faz açtırmaz, izlenir)
- Kanarya verdikt nöbeti + `underpowered` kilidi (mühür #37)
- **Langfuse fence penceresi ~20 Ağustos (~10 gün)** — #45 buna yetişmeli
- `4faf054` üretim deploy'u CANCELED (docs-only; kod pariteli — sonraki merge'de kapanır)
- Bus'ta bir kez görülen "transient permission classifier" retry'ı (AG-1 damgası; tek örnek, yasa değil)
- MAIL-WAIT sınırı: **tur içindeyken posta okunmaz** → uzun sessizlik sonrası tek kelimelik zil kalır (AG şeritlerine zamanlayıcı gelirse ölür)
- BUG-016 sayaç hükmü (auditor KENDİ sayımıyla) · ekipman R3 gerçek sondası
- F-S97-REGISTRY-PARENT-OVERWRITE (#25 çağı) · F-S97-CLASS-CATALOG-UNINSTALLED (#30 öncesi)
- `honestbench` backend'i canlıda VAR (active, 4 tool) — #17 notu S98'de bayat çıktı
- `mount-probe` backend'i `paused` bırakıldı (sonda kimliği; silinmez, `id` dokuz tablonun FK hedefi)

## §6 · SAYIM TANIMLARI (S98'de yazıldı, bir daha tartışılmaz)
- **Test dosyası çapası = git-tracked `*.test.ts(x)`** (vitest korpusu). `e2e/*.spec.ts` (14) Playwright tarafıdır, vitest include'unda değildir; ayrıştırılmadan sayılırsa 596 okunur.
- **Manifest drift = 7 tab / 7 yapısal `mappedContentSha`.** Metinde 9-10 kez geçmesinin sebebi düzyazı notların içindeki geçişlerdir.
- **Mühür tespiti = `public/architecture/manifest.json`'a DOKUNAN commit** (grep DEĞİL). Sayı sabit değil, YÖNTEM sabit; her entegrasyon anında yeniden hesaplanır.

<!-- END · CWF-SESSION-GRAPH-KB-v99 -->
