# CWF — BOOTSTRAP & YENİ OTURUM PROMPTU · v102 (S102 için)
<!-- S101 kapanışında yazıldı. v101'i geçersiz kılar. Oturumun İLK mesajıdır. -->

## 0 · KİMLİK
Architect (Claude) · AG-1..AG-4 (Claude Code — tüm repo yazımı, `--no-ff`, squash
YASAK) · Operator (Gemini + Supabase MCP — yalnız `supabase db push`, ADR-005).
Strateji/karar Türkçe; teknik artefakt İngilizce.

## 1 · ÇAPA (S102 açılışında TAZE KLONDA DOĞRULA)
| Ne | Beklenen |
|---|---|
| `origin/master` | `e7939c93dab14fdd29e4d5ddc6ea6b8a3142d28d` |
| docVersion | **rev 268** |
| vitest cetveli | **624** (src 155 + shared 6 + api 463) · e2e Playwright **16** AYRI |
| migration | **80** (canlı `schema_migrations`=80 ile çaprazla) |
| ADR | **16** |
| drift | `[OK] 7/7` + S99-5 pozitif kontrol |
| `phase/*` | **6 ref** (hepsi master'a MERGED — S98-L1 temizliği S102 açılışının İLK işi) |

⚠ **Pozitif kontrol uyarısı (S101'de öğrenildi):** drift'i düşürmek için
`manifest.json`'a dokunmak YETMEZ — manifest haritalanan yüzey değildir.
Kontrol MUTLAKA bir `codeAreas` kod dosyasına vurmalı (ör. `api/cwf/**`), aksi
halde "pozitif kontrol geçti" sanılır ve kapı doğrulanmamış kalır.

## 2 · S101'DE NE OLDU (miras)
S101 **dalga dışı bir UI-GERÇEK programı** koştu: sahibin ekranda yaşadığı dört
şikâyetten doğdu ("bu ekran ne işe yarıyor · upuzun liste · silme yok · select
ne demek"), **altı faz** merge + deploy + kabul, docVersion 262 → 268.

- **CENSUS-CONSOLE-2 (#56 reopen KAPANDI):** her hükme deterministik SAHİP +
  EYLEM (`actionForVerdict`, 7-üyeli union, `never`-check, {tr,en}); veri taşıyan
  kart önce; aranabilir pencereli tablo; özet şeridi "SENİN eylemin: N" ile
  bitiyor; THEIRS-only tedarikçi raporu indirilebiliyor. Sahip şeridi yardımsız
  okudu → kabul.
- **MCP-SETTINGS-TRUTH-1 + FIX-1 + FIX-2:** kimlik-merkezli kart; "active"
  yalnız lifecycle'ın (satır şalteri "serving"); paused kimlik altındaki şalter
  sonucunu cümleyle söylüyor; **delete yasası durum→TARİH testine genelleşti**
  (draft VE retired, yayınlanmamış + governed history yok ⇒ silinebilir);
  sayılar SİLMEDEN düzeldi (armes 141 live + 9 missing, superset 4 giriş + 22
  gateway); URL'deki sırlar maskeli (reveal-to-copy); `system` kimliğinde
  lifecycle kontrolleri **YOK** (gri değil, absent — ADR-012 INVARIANT).
- **STAGES-TRUTH-1:** her digest okumasında **zorunlu `purpose`** (TracedClient
  yetki alanı, 141 site / 28 dosya, worklist'i DERLEYİCİ üretti); ölçülmüş
  yazma sayıları; kesme artık "N of M" diyor; kart 06 scope'u KALICI ve
  `lifecycle`-only serving gerçeğinden (`ENABLED_IS_LIVE=false`); `cwf.flush`
  iki ayrı sebebiyle düzeltildi (soy + sıralama).
- **TURN-QUESTION-TRUTH-1:** canlı doğruluk hatası — tavan-iptali turu `empty`
  → `failed` → geçmişte cümle silinip "önceki deneme başarısız" ile
  değiştiriliyordu; model bir sonraki turda YANLIŞ SORUYU cevapladı. Düzeltme
  bayrağı çevirmedi: **taşıma kuralı artık YAZARLIĞA bakıyor** (`turnFinishClass`
  — system-yazımı governed cümleler verbatim taşınır, model yarımları
  karantinada kalır). `partialRead` "6811'in 200'ü okundu"yu kontrol edilebilir
  kıldı.

**Kanıtlanan sahip testleri (hepsi geçti):** özet şeridi yardımsız okundu ·
kart 07 amaç-gruplu okundu (canlı turda 91 okuma / **0 etiketsiz**) · tk-temp
arşivden SİLİNDİ (canlı: `backends`'te yok, `backend_tools`=0) · tavan
sorusundan sonra alakasız soru DOĞRU cevaplandı.

**#57 pacing borcu KAPANDI:** 15 Ağu histogramı düz yayılım (00:20 · 01:21 ·
02:21 · 03:21) + canlı `pace-wait` logu.

## 3 · YENİ YASALAR / EMSALLER (S101)
- **S101-L1 (poller yasası):** koşunun VAR olduğunu iddia etmeyen bir poller,
  hiçbir şey koşmamışken "yeşil" raporlayabilir. `total_count >= 1` her kova
  okunmadan ÖNCE doğrulanır. (A-REC-S100-1'in telin öbür ucundaki kardeşi.)
- **S101-L2 (wave-seal eki):** provisional bir docVersion, HERHANGİ bir kardeş
  şerit merge olduğu an bayatlar. İki şerit aynı skaleri basarsa git çakışma
  BİLDİRMEZ — bir revizyon sessizce kaybolur. Standart prosedür: provisional
  mühür commit'i tek dosya yazılır, merge-turn'de DÜŞÜRÜLÜR ve numara master
  tarafından yeniden TÜRETİLİR (uçuştaki şeritler de kontrol edilerek).
- **S101-L3 (severity yasası, AG-2'den, aynen kabul):** bir kartta yazan
  severity, GRANT değil POLICY okunana kadar HİPOTEZDİR. RLS-açık + sıfır
  politika = deny-all; RLS-açık + `qual: true` = ardına kadar açık.
- **S101-L4 (karantina yasası):** karantinanın konusu "başarısızlık" değil
  YAZARLIKTIR. Deterministik, kod-yazımı, kendini anlatan governed cümleler
  bir sonraki tura taşınır; model yarımları taşınmaz.
- **Ölçüm-organı UX kuralı (S98-L4'ün insan yarısı):** bir ölçüm ekranı hükmü
  gösteriyorsa, o hükmün SAHİBİNİ ve YAPILACAK İŞİNİ de göstermek zorundadır.
  Aksi halde "eee ne yapacağım?" sorusu cevapsız kalır ve ekran ölüdür.

## 4 · A-REC-S101 (Architect öncül hataları — BEŞİ DE şeritlerin canlı okumasıyla yakalandı)
1. FK-census'un `pg_constraint`'ten zayıf olduğu sanıldı — aslında SÜPERKÜME
   (14 tablo `backend_id` taşıyor, yalnız 10'u FK).
2. `cwf.flush` "hiç açılmıyor" öncülü yanlıştı — açılıyordu; iki ayrı sebep
   (soy + sıralama) vardı. Üç fixture, canlı yolun üretemeyeceği '14' kovasını
   elle yazıp **beş fazdır** yeşil geçiyormuş.
3. "Sync budamıyor / superset bayat" öncülleri yanlıştı — ikisi de dürüsttü,
   defekt SAYIMDAYDI. Reçetelenen delete gözlem tarihini yok edecekti.
4. Katalog RPC'sinin kolon bilgisi verdiği varsayıldı — yalnız tablo adı
   döndürüyor. (Gerçek kök: gövdesiz HEAD, hata kodunu taşıyamıyordu.)
5. `anon`'un `user_audit` GRANT'ı "sızıntı" ilan edildi — RLS politikası
   (`is_super_admin(auth.uid())`) anon için false; sızıntı YOK, gereksiz
   grant yüzeyi var. → S101-L3 doğdu.

**Kök tek ve tekrar eden:** canlı artefaktı okumadan spec yazmak (S65-1).
**S102 kuralı:** her faz kartı, bağımlı olduğu yeteneği ÖNCE okur ve kanıtını
karta yazar; okunmamış yetenek üzerine gereksinim yazılmaz.

## 5 · DALGA 8 GÜNDEMİ (sahip S101'de ONAYLADI — bu sıra bağlayıcı)
1. **QDRANT-ENGINE-1** (AG-3): KARAR-QDRANT-HOSTING-1 — mevcut Langfuse EC2'de
   İKİ konteyner (Qdrant + bge-m3), konteyner-probu ŞART, parite kapısı
   incumbent'a karşı, sessiz fallback YOK. Port hazır (S100 VECTOR-SEAM-1).
   ⚠ Bütçe-çiti ~20 Ağustos döngüsü konteynerleri bilmeli.
2. **RBAC-GOVERNED-1** (AG-4): kelepçe kalıbı (kod rol başına AZAMİ demet, satır
   yalnız DARALTIR) + **`F-S101-ANON-AUDIT-GRANT`** (gereksiz grant yüzeyini
   daralt) + **`F-S101-PERSONAL-ROW-CROSS-USER` hükmü** (owner-scoped kişisel
   satırlara super_admin erişimi AÇILSIN MI? — dört satır bugün ulaşılamaz).
3. **#25 🔑 GRAPH-KB-1** (AG-1): kapıyı 6/7'ye taşıyan anahtar.

## 6 · AÇIK BULGULAR (S101 doğumlu, hiçbiri faz açtırmadı)
`F-S101-OVERRIDE-DROPS-BACKEND` (⚠ en önemlisi: `mergeMcpServers` gölgelenen
global satırı TOPTAN değiştiriyor; `backend_id` taşımayan bir override onu her
sohbet isteğinde efektif config'den DÜŞÜRÜYOR — armes altındaki yabancı
satırların GERÇEK mekanizması bu; düzeltmesi canlı turları değiştirir, kendi
fazını hak eder) · `F-S101-ANON-AUDIT-GRANT` (LOW) · `F-S101-PERSONAL-ROW-CROSS-USER`
· `F-S101-FK-CENSUS-BY-CONVENTION` (+kolon-farkında katalog RPC'si; birlikte
emekli olurlar) · `F-S101-ROUTE-READ-DUP` (artık ÖLÇÜLEBİLİR: bir turda
×6 backend_tools/Σ317, ×7 domain_rules/Σ843, ×2 entity_registry/Σ800) ·
`F-S101-PURPOSE-GATE-SCOPE` · `F-S101-LIFECYCLEOF-SERVES-UNKNOWN` ·
`F-S101-BACKENDS-SELECT-UNTAGGED` (emitter bulunamadı, tahminle kapatılmadı) ·
`F-S101-MKB-TOKEN-ROTATION` (**sahip planlı — haftaya; GÜNDEME GETİRME**).

Devir borçları: FRAME-ERROR enum · MIGRATION-LIES-WIDER (13 dosya) ·
corpus-vs-registry · OBS-HOST-HEALTH-1 (**bütçe-çiti ~20 Ağustos: 5 gün**).

## 7 · SABİTLER
Supabase `fjbrkimwvtpwoxhziidh` · Vercel `prj_0fDFCY8qXj8Kr5y7n4zmyefjHY8i` /
`team_UjOMyrQtTQ32mfYCeEDpC0Qj` · GitHub `maymun207/cwf_yaprak` · Langfuse EC2
`i-030c2b4fadebfa229` · CloudFront `dl3644f5a7fnn.cloudfront.net` · EIP
`52.57.7.5`.
Sahip tarzı: tek yol, teşhis-önce, kapanmışı açma, her yanıtta "SENİN AKSİYON
MADDELERİN", adımlar Türkçe ekran kelimeleriyle, manuel iş BUG.
GitHub API Architect kabından 403 → CI doğrulaması her GO'nun BLOCKING STEP 1'i.

<!-- END · v102 -->
