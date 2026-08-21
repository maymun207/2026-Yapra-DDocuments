# CWF — Master Rollout Planı · v2_0

*(cwf-master-rollout-plan-v2_0 · 2026-08-06 · S82 · Sahip-ratife yürüyüş haritası — tek
takip belgesi budur. **v1_9'u amend eder** (S37-1). **v2_0: BLOK 2F doğdu — BİLİŞSEL
KATMAN** (dört bellek katmanı + planlayıcı, sahip hükmü S82-6 ile, SOTA derecesinde).
S82'nin tüm kapanışları ✅+kanıtla işlendi; S82'de doğan her kalem adıyla eklendi; OPA'nın
açık sorusu sahip hükmüyle kapandı. Kural değişmedi: buradan kalem SİLİNMEZ; biten işe ✅
ve kanıtı yazılır; yeni iş adıyla EKLENİR.)*

> **⚠ ARCHITECT'E BAĞLAYICI NOT (sahip, S82):** *"Buralar çok kritik noktalar — çıkarım
> yapma, bana sor."* Boşluklar ADIYLA SORULUR; doldurulmaz. **(v2_0 kaydı: S82'de bu not
> iki kez işledi — `SEMANTIC-MEMORY-1`'i "tetiği beklesin" diye park eden Architect
> çıkarımını sahip iptal etti ve S82-6 doğdu; BUG-020'nin artığı sorulup hükümle kapandı.)*

> **⚖ S82-6 (SAHİP YASASI — bu belgenin üstünde):** *"Bir mimaride olması gerekenler en
> başta olacak, en ince ayrıntısına kadar."* Mimari olarak gerekli olduğu tespit edilen
> bir katman için "şimdilik gerek yok / tetiği bekleyelim / yetmezse açarız" sınıfı her
> erteleme geçersizdir. Katman adıyla kuyruğa girer ve SOTA seviyesinde yapılır.
> Yaşanmış maliyet: 1,5 ay circle-after-circle. Bu yasa SOTA-1'in kardeşidir: SOTA-1
> ölçüt ertelemesini, S82-6 mimari ertelemeyi yasaklar.

**Kabul ölçütü:** `cwf-sota-definition-v1_5` (BINDING). Her satır oradaki bir ölçüte
bağlıdır; bağlanmayan satır ya adlı önkoşuldur ya v1 dışıdır (R6).
**Bütçe rakamı bu belgede YAZMAZ** — tek kaynak sözleşmenin R4'üdür.

---

## BLOK 1 · ÖLÇÜM PANOSU (MEASURE-1) — ✅ **KAPANDI 2026-08-03**

Kanıt zemini (kapanış anı, TARİHÎ — değiştirilmez): `origin/master` =
`d599b8b2b25315dbb02bfa02efc61fbbe1e90d24` · docVersion **rev 185** · 67 migration ·
436 test dosyası.

**Bugünkü zemin (v2_0, 2026-08-06):** `origin/master` = `36bdfbe53457317f22778db17b4fac40a9b75f9c`
· docVersion **rev 197** · 67 migration · **468** test dosyası / 5304 test · 13 ADR.
*(S82 içinde üç merge: `a9649019` GATEWAY-BURST-GUARD-1 · `114894a8` BURST-GUARD-1-FIX-1 ·
her ikisinin `## MERGE` raporu aynı push'ta — S81 relay kuralının iki yarısı da ilk kez
birlikte tuttu.)*

| # | İş | Durum | Kanıt |
|---|---|---|---|
| 1.0–1.4 | *(v1_9'daki yedi satır aynen — değişmedi)* | ✅ | v1_9 §Blok 1 |

**Blok 1'in dersi korunur:** *RLS SATIRLARI kapatır, SÜTUNLARI değil.*

---

## BLOK 2 · ÖLÇÜLEBİLİRLİK — *sırayı açan blok*

| # | İş | Hangi SOTA ölçütü | Şerit / Durum |
|---|---|---|---|
| **2.1** | ✅ `MA-RERUN-1` | §10 iç ölçüt | BİTTİ S81, `d3d246c1` (VOID, dürüst) |
| **2.1a** | ✅ `LENS-CEILING-1` | 2.1b önkoşulu | BİTTİ S82, `4469a370` |
| **2.1b** | ✅ `MA-RERUN-2` | §10 — ÖLÇÜLDÜ | BİTTİ S82, `b0e8c9e2` (84.61 % → 55.41 %) |
| **2.2** | `BENCH-BACKEND-MOUNT-1` | MCP-Bench · MCP-Universe | AG · 2.3b'den hemen sonra (sahip hükmü v1_6) |
| **2.2a** | `BACKEND-REGISTER-AFFORDANCE-1` | Tier B'nin ADLI ÖNKOŞULU | AG+Operator · PLATINUM boşluk: 39 backend, sıfır insert yolu |
| **2.3** | ✅ `BACKEND-LIFECYCLE-AFFORDANCE-1` | 2.2 önkoşulu | BİTTİ S81, `b960a1c9` |
| **2.3a** | `HONESTBENCH-HARNESS-0` | Tier E ilk taksit | AG · üç tasarım sorusu kapalı; ayrı repo `activeMode:null` bekliyor |
| **2.3b** | `FAULT-SWITCH-0` | 2.3a kardeşi · **BUG-006+009'un aleti** | AG · **BUGÜN S82 akşam diliminde** (kusur kuyruğu K.9) · **kanıt PREVIEW'da (sahip hükmü b, S82):** kırılan şey kendi DB okumamız, o yol preview'da birebir — üretim penceresi hiçbir şey eklemez |
| **2.4** | `BENCH-RESET-1` | C3 | AG+Operator |
| **2.5** | `BENCH-A2A-1` | C2+C3 | AG |
| **2.6** | `BENCH-SMOKE-1` | ilk dış sayı + maliyet aleti | AG+sahip |
| **2.7** | `FRAME-SHADOW-EVIDENCE-1` | τ²-bench · Gaia2 erken yanlışlama | AG |
| **2.8** | `DISCOVERY-EXTEND-2` | Gaia2 · τ²-bench | AG+Operator · kapsam: LINE-içi çözümleme (2.1b ölçtü) |
| **2.9** | `CORPUS-LINE-FILL-1` | 2.8 bileşeni | AG |

**Hüküm kayıtları (v1_6, korunur):** mount önce; BUG-005 arkasında.

### 🐞 KUSUR KUYRUĞU — **S82'DE ERİDİ; işleyen sıra artık bucket v21'dedir**

Kaynak `REGISTER-BUG-BUCKET` (v20 → **v21 bu gece**; register'a artık **verbatim
kopyalanır** — sahip hükmü S82, D-003 böyle düşer). v1_9 "7 açık" diyordu; S82'nin
gerçek hareketi:

**S82'DE KAPANDI (sahip hükümleri + merge'ler + canlı kanıt):**
- **BUG-020** — fren üç şafta bindi (`gateway.maxConcurrentCallsPerBackend=3` KUYRUKLAR
  asla reddetmez · `turn.maxTokensPerTurn=300000` totalTokens/cached-dahil, sahip-onaylı,
  AMENDMENT §B · `turn.maxCallsPerToolPerTurn=30` arka duvar). Canlıda ateşledi ve
  **söyledi** (`trace=15f24d24`: `[BurstGuard] stopped reason=turn_tokens total=315030`).
  Semafor artığı **sahip hükmüyle kapandı** ("birim kanıt yeter", 2026-08-06): 3'e karşı 7,
  mutasyon-kanıtlı, S66-1 pozitif kontrollü.
- **BUG-021 → Faz B'de** (`TOOL-EARNED-TRUST-1`, AG'de ŞU AN). 7. örnek `trace=b835babd`'de
  kaydedildi. Recon bulgusu: `input_schema` aynada DOLU, tek-araç okuma hazır — faz veri
  değil enjeksiyon işi.
- **BUG-025 · BUG-026** — HEALTH-TRUTH-1 merge'lendi; kanıt bugünkü canlı turlarda okunur.
- **2.11 `HONEST-READ-2` / BUG-002** ✅ — S81'de düzeltilmiş kod üzerinde canlı gösterildi.
- **BUG-028 · BUG-029 doğdu S82** (`trace=90f1f5ed` — sayaç 13/14 çelişkisi; TR soruya EN
  sistem mesajı) ve **sahip hükmüyle kuyruk 5'e katlandı** — katlanan bug hâlâ bugdur,
  her biri ayrı kanıtla kapanır.
- **BUG-005 (2.10)** — **sahip hükmü S82: proje kapanışında** (*"belki bir ay sonra, tüm
  proje bittiğinde"*). Açık durur, gündemde durmaz.

**BUGÜN S82'nin kalan yürüyüşü (bucket v21 §BUG.5 sırası):** Faz A `RESULT-BUDGET-1` →
Faz B `TOOL-EARNED-TRUST-1` → üç canlı kanıt turu → `PROSE-RENDER-PARITY-1`
(023+027+028+029) → `UNIT-TRUTH-1` (024) → BUG-012 kayıt kapısı → **2.12
`PROBE-PARITY-1`** + `AUTO-SYNC-ON-SAVE-1` (010+011) → **2.3b `FAULT-SWITCH-0`** →
BUG-006+009. Sığmazsa yarına ilanla kalan: 015+016 kapıları, 017 lens.

---

## BLOK 2B · MÜŞTERİ GİRDİSİ YETENEĞİ

| # | İş | Ölçüt | S82 durumu |
|---|---|---|---|
| **2B.1** | `RAG-FINISH-1` | F1 · BrowseComp-Plus | **Şerit S82'de yeniden açıldı (sahip: "devam etsin")** · `RAG-TEAM-NOTES-v2` iletildi: Bulgu 1 durum sorusu + bizim 3-eşzamanlı fren haberi ("sizin düzeltmenizi emekliye AYIRMAZ") + **iki tarih istendi** (gerçek doküman korpusu · test-varlık temizliği — kanıt kapımız) · bitiş tanımı fazın İLK çıktısı (S74-1) |
| **2B.2** | `WEB-VALVE-1` | F2 · DeepScholar-Bench | değişmedi; şerit kapasitesi bekler |

---

## BLOK 2D · MİMARİ KATMAN — *(v1_9'dan aynen; S82'de İKİ değişiklik)*

| # | İş | v2_0 değişikliği |
|---|---|---|
| 2D.1 | `PB-FULL-1` AŞAMA 1 · `PB-A` | değişmedi — blok bununla açılır |
| 2D.2 | `LINE-RESOLUTION-DIAGNOSIS-1` | değişmedi |
| 2D.3 | `GRAPH-KB-1` | değişmedi (alarm sahip-çekili, koşulsuz) · **2F.2 `SEMANTIC-MEMORY-1` ile aynı ailedir ve tasarım notları BİRLİKTE yazılır** — iki kavram merkezi kurulmaz |
| 2D.4a/b | `PB-B` · `RETRIEVAL-INFRA-1` | değişmedi |
| **2D.5** | `OPA-POLICY-1` | **❓ AÇIK SORU KAPANDI — SAHİP HÜKMÜ (ii), 2026-08-06:** OPA bir ölçüte bağlanmaz; **ADLANDIRILMIŞ ÖNKOŞUL** ilan edilir — *EAIP-TENANT ailesinin / bir sonraki müşterinin önkoşulu.* Ölçülmez ama v1'de kalır, gerekçesi yazılıdır. Simetri maddesi tatmin: muafiyet değil, adlandırma. Eval-gate değiştirilemezliği korunur. |

---

## BLOK 2E · KENDİNİ ANLATAN BACKEND

| # | İş | S82 durumu |
|---|---|---|
| **2E.1** | ✅ `ROUTE-OPEN-1` | **BİTTİ S82**, `a6252b20` (merge). Ardından **`ROUTE-OPEN-2`** doğdu ve BİTTİ (`338e5380`): sayaç üç-değerli oldu (`writeOffered=N unclassified=M`) — 2E.1'in açtığı dilimi sayaç göremiyordu |
| **2E.2** | `ROUTE-DERIVE-1` | sırada (bucket kuyruğunun kuyruğu) |
| **2E.3** | `PACK-FROM-PROTOCOL-1` | sırada |
| **2E.4** | `ROUTE-ASK-1` | 2.7 ölçümünden sonra |

**S82 kaydı:** Faz B (`TOOL-EARNED-TRUST-1`) bu bloğun ilkesinin ("sunucu söylüyorsa biz
yazmayalım") ilk gerçek uygulamasıdır — şema, sunucunun `tools/list`'te zaten gönderdiği
ve aynanın zaten yazdığı gerçektir; faz onu modelin seçim anına taşır.

---

## ★ BLOK 2F · BİLİŞSEL KATMAN — **v2_0'DA DOĞDU (sahip hükmü S82-6)**

**Neden var:** S82'nin üretim turları (`13d532e7` 312 823 tok cevapsız · `90f1f5ed`
420 892 tok cevapsız · `15f24d24` 315 030 tok 5. günde kesildi) tek teşhise indi:
**dört bellek katmanından biri var (episodic), sayfalayıcı yok, planlayıcı yok.**
Sahip hükmü: *"minimalist yaklaşımlar beni circle-after-circle bitirdi — olması gereken
her şey en başta, en ince ayrıntısına kadar."* Kanonik çerçeve (CoALA: working ·
episodic · semantic · procedural) + 2026 endüstri deseni (progressive disclosure —
katalog büyük, çalışma kümesi küçük) bu bloğun tasarım zeminidir; araştırma kaydı:
`cwf-architecture-research-S82-v1`.

| # | İş | Hangi SOTA ölçütü | Not |
|---|---|---|---|
| **2F.0a** | **`RESULT-BUDGET-1`** — working-memory sayfalayıcısı (page-out): tur-ekseni bütçesi `turn.resultCharBudget=120000`, taşan sonuç mevcut tier-3a STORED yoluna (handle + özet), `result_budget` fren çipi, **`[TurnEfficiency]` satırı** | LongMemEval · ToolComp (bağlam yönetimi) | **AG'DE ŞU AN (Faz A).** Yeni makine YOK — mevcut `resultStore`+`aggregate/query` bağlanıyor. Kanıt: 7-günlük fire sorusu **TAMAMLANIR** |
| **2F.0b** | **`TOOL-EARNED-TRUST-1`** — prosedürel belleğin ŞEMA yarısı: `search_tools` sonucu aynadaki `input_schema`'yı taşır, **talep üzerine** (154 şema önden yüklenMEZ — definition bloat) | BFCL v4 (parametre doğruluğu) · MCP-Bench | **AG'DE ŞU AN (Faz B).** Kanıt: 10-günlük gaz sorusu `identifier`'ı İLK denemede doğru verir, sıfır validation hatası |
| **2F.1** | **`PROCEDURE-RECALL-1`** — prosedürel belleğin RUTİN yarısı: başarılı turlardan soyutlanmış iş akışı, mevcut kayıtlı-prosedür organına yokluk-esaslı yayın (`selfSeedReconciler` emsali) | ToolComp · Mem2ActBench | AWM/Memp şekli: ham iz DEĞİL soyut rutin · anahtar-kelime DEĞİL anlamsal geri çağırma · TTL+tazelik · YALNIZ başarılı turlar · insan satırı asla ezilmez. Tasarım notunun ilk satırı: Faz B sonrası aynı soru kaç çağrı? |
| **2F.2** | **`SEMANTIC-MEMORY-1`** — olgusal katman: soru-sınıfı → BI-artefaktı eşlemeleri ("Granit doğalgaz = chart 85"), governed satırlar, gated publish, `empty≠zero`, TTL | LongMemEval · Gaia2 | **SAHİP TETİĞİ ÇEKTİ (S82): "YAPILACAK ve çok iyi yapılacak, SOTA derecesinde."** Tetik/koşul YOK — S82-6. `GRAPH-KB-1` (2D.3) ile aynı aile; tasarım notu ortak, organ TEK |
| **2F.3** | **`STEP-EFFICIENCY-1`** — adım-verimliliği ölçüm yüzeyi: `[TurnEfficiency]`'nin log'dan ölçüm panosuna bağlanması (tur başına çağrı · tekrar · stored oranı) | §10 iç ölçüt (yeni satır adayı) | Doğuşu 2F.0a'nın içinde (log satırı); kalem olarak da listede — literatürün 5. uyarısı: yalnız tamamlanma değil, adım verimliliği ölçülür |
| **2F.4** | **`PLANNER-0`** — karar katmanı: plan-first + **re-plan gate** (katı öndeki plan ASLA — kırılgan-plan arıza modu), plan şablonları doğuştan governed (kod referansı + versiyonlu DB + oturumluk önizleme — stage 04'ün kendi yasası) | τ²-bench · Gaia2 · ToolComp | 2F.0a–2F.2'yi TÜKETİR, onlarsız kör plan yapar. Hibrit: dış katman plan, adım içi ReAct. A23 (Blok 5) ile kesişimi tasarım notunda çizilir — iki planlayıcı kurulmaz |

**Sıra kilidi:** 2F.0a → 2F.0b bugün; 2F.1/2F.2 tasarım notları **bu gece** (sahip
tetiği), fazları kusur kuyruğu bittikten sonraki ilk şerit boşluğunda; 2F.4 en son.
**Bu blok Blok 5'in (A23) rakibi değil, hammaddesidir** — A23'ün ⑤/⑥ ayrımı 2F'nin
katmanlarını tüketir.

---

## BLOK 3 · İLK ÖLÇÜM TURU — *(değişmedi; 2F.0a'nın `[TurnEfficiency]` çıktısı 3.6'nın §10 tablosuna satır adayıdır)*

## BLOK 4 · `mcp-honestbench` — *(değişmedi)*

## BLOK 5 · ANLAMA KATMANI (A23) — *(değişmedi; 2F ile ilişki: 2F hammadde, A23 tüketici. SOTA-1 kendine-uygulama bölümü aynen geçerli)*

## BLOK 6 · v1.1 KUYRUĞU — *(değişmedi)*

## 💤 PARK — *(değişmedi: TENANT-CONSOLE ailesi tetikli · LangGraph · M-C. **BUG-005 buraya taşınmadı** — kusur kuyruğunda "proje kapanışı" tarihiyle açık durur; park işi değil, sıralanmış iştir)*

## 👁 İZLEME LİSTESİ — *(değişmedi + S82 eklemesi: W-013 arama davranışı `90f1f5ed`'de düzeldi — model `list_charts(search)` kullandı, tek çağrı; W-015 doğdu: silent-finish tavsiye metni sabit)*

---

## v1_9 → v2_0 DEĞİŞİM KAYDI — S82'nin TAMAMI, tek tek

1. **BLOK 2F doğdu — BİLİŞSEL KATMAN, altı kalem** (2F.0a/0b/1/2/3/4). Doğum belgeleri:
   üç üretim turu ölçümü + `cwf-architecture-research-S82-v1` + **S82-6 sahip yasası**
   (bu belgenin başına yazıldı). `SEMANTIC-MEMORY-1`'in tetiğini **sahip çekti** —
   Architect'in "yetmezse açarız" park önerisi iptal edildi ve bu iptal, bağlayıcı notun
   yaşayan örneği olarak nota işlendi.
2. **İki merge, ikisi de kanıtla:** `GATEWAY-BURST-GUARD-1` (`a9649019`; üç governed fren
   parametresi sıfır migration'la self-seed; F185'ten İLANLI sapma — güvenlik çiti
   fail-closed) ve `BURST-GUARD-1-FIX-1` (`114894a8`; S82-5 doğdu: *payload alanı yüzey
   değildir* — 23 test yeşilken çip her turda ölüydü, iki istemci sekmesi de alanı adıyla
   taşımıyordu; yeni test parser'dan girer, mutasyonu Architect bağımsız koştu).
3. **BUG-020 KAPANDI** (sahip hükmü: semafor birim kanıtı yeter) · **BUG-005 proje
   kapanışına** (sahip) · **BUG-028/029 doğdu ve kuyruk 5'e katlandı** (sahip) ·
   **BUG-021'e 6. ve 7. örnek** kaydedildi.
4. **Kusur kuyruğu artık bucket'ta yaşar ve register'a VERBATIM kopyalanır** (sahip
   hükmü; D-003 bu yolla düşer). v1_9'un "referansla taşınır, kopyalanmaz" kaydı bu
   hükümle geçersizdir.
5. **`ROUTE-OPEN-1` ✅ + `ROUTE-OPEN-2` doğdu-ve-bitti** (üç-değerli sayaç) — 2E.1 satırı
   güncellendi.
6. **2D.5 OPA açık sorusu KAPANDI — sahip hükmü (ii):** adlandırılmış önkoşul
   (EAIP-TENANT ailesi). Ölçüt eklenmez.
7. **RAG şeridi yeniden açıldı** (sahip: "devam etsin") ve `RAG-TEAM-NOTES-v2` çıktı —
   durum soruları + 3-eşzamanlı fren bildirimi + iki tarih talebi. 2B.1 satırına işlendi.
8. **FAULT-SWITCH-0 kanıt yüzeyi:** preview deployment (sahip hükmü b) — üretim penceresi
   hiçbir şey eklemez; 2.3b satırına yazıldı.
9. **Tavan hükümleri:** `turn.maxTokensPerTurn = 300 000` iki kez teyit (450K önerisi
   sahip tarafından geri çekildi, "aynı kalsın"); sayım birimi `totalTokens`
   cached-dahil (AMENDMENT §B); revizyon aleti canlı `turn_tokens` fren kayıtları.
10. **Dört yeni yasa mintlendi:** S82-3 (pozitif kontrolü tatmin eden yer tutucu o
    kontrolü devre dışı bırakır) · S82-4 (dal tabanı origin/master'a eşitliği KANITLANIR)
    · S82-5 (payload alanı yüzey değildir; test parser'dan girer) · S82-6 (yukarıda,
    belge başında).
11. **Relay disiplini ölçümü:** soru turu sayısı üç ardışık fazda **sıfır**
    (TYPEGATE → GATEWAY-BURST → FIX-1). Doktrin işliyor; ölçüm sürer.
12. **Zemin güncellendi:** master `36bdfbe5` · 468 dosya / 5304 test · rev 197 ·
    67 migration (S82 boyunca değişmedi — üç faz da sıfır migration).
13. **Hiçbir satır silinmedi; hiçbir sıra sahip hükmü olmadan değişmedi.**

*(v1_8→v1_9 ve öncesi değişim kayıtları v1_9'da aynen durur; bu belge onları tekrar
basmaz, S37-1 amend zinciri korunur.)*

<!-- END · cwf-master-rollout-plan-v2_0 · 2026-08-06 · S82 -->
