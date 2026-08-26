# CWF — HAFIZA TOHUMU (MEMORY SEED) · cwf_yaprak_5 · v2
<!-- v1'i GEÇERSİZ KILAR (S116 kapanışı). v2 FARKI: §3 Langfuse kutusu i-057e5737f7ce02c52
     (2026-08-16'da yeniden kuruldu; i-030c2b4fadebfa229 TARİHSELDİR, AWS'de yok) ·
     §3'e factory_state sabitleri · YENİ §11 Desktop yetenek haritası · §8'e S116 tuzakları.
     Kural değişmedi: bu dosya ile canlı artefakt çelişirse CANLI ARTEFAKT kazanır.
     Buradaki hiçbir commit hash / sayı / durum, okunmadan doğru sayılmaz. -->

## 1 · KİM KİMDİR, NE YAPAR

**Sahip:** Hulya (proje adı "Maymun"). Ürün sahibi ve tek karar mercii.
**Hedef:** CWF → EAIP. MCP arkabahçeleri üstünde yönetişimli agentic AI
platformu; hedef müşteri Kale Seramik seramik üretimi. Uzun vade: çok-kiracılı
Enterprise Agentic Intelligence Platform.
**Arkabahçeler:** ARMES (KB7 MES, ~141 gerçek araç) · Apache Superset 6.1 BI
geçidi · machine-knowledge-base · honestbench · mount-probe · system.
**Repo:** `maymun207/cwf_yaprak` (public).
**Soy:** CWF→EAIP, daha önceki cwf_prod projesini sürdürür. **CWF-DEMO bu
projeyle İLGİSİZDİR — asla gündeme getirme.** Yük taşıyan her şey bu projeye
sürümlü artefakt olarak girer.

**Üç şeritli düzen (KİLİTLİ):** Architect = Claude (teşhis, tasarım, kapılı faz
kartları; ASLA repo dosyası yazmaz). Author = AG şeritleri (tüm repo yazımı;
--no-ff; squash yasak; iniş yalnız `npm run land`). Operator = Gemini + Supabase
MCP (yalnız `supabase db push` — ADR-005; şema okuma; canlı doğrulama; çitli).
**Dil:** strateji Türkçe; teknik artefakt İngilizce.

## 2 · SAHİBİN ÇALIŞMA TARZI (bağlayıcı)

Tek yol öner, menü sunma · Teşhis önce · Dürüstçe itiraz et, baskı altında
pozisyonu koru · Kapanmış maddeyi bir daha açma · Tam bitir · Her yanıt "SENİN
AKSİYON MADDELERİN" ile biter (yoksa açıkça "yok") · Sahip aksiyonları HER ZAMAN
insan diliyle, saatler HER ZAMAN TSİ (UTC+3) · OTOMASYON ÖNCE: sahibe manuel iş
devretme; istisna yalnız sırlar, gerçek-veri onayı, insan-gözü tanıklığı ·
Sahibin üslubu kısa onaylardır ("tamam", "başlat", "tut", "onay").

## 3 · ALTYAPI SABİTLERİ

- Supabase proje: `fjbrkimwvtpwoxhziidh`
- Vercel: `prj_0fDFCY8qXj8Kr5y7n4zmyefjHY8i` · team `team_UjOMyrQtTQ32mfYCeEDpC0Qj`
- GitHub: `maymun207/cwf_yaprak` · arşiv deposu `maymun207/2026-Yapra-DDocuments`
- **Langfuse: kendi barındırılan, AWS EC2 `i-057e5737f7ce02c52` (eu-central-1,
  adı cwf-langfuse-host, doğum 2026-08-16T14:37:41Z — ESKİ kutu
  i-030c2b4fadebfa229 TARİHSELDİR, AWS'de Reservations:[] döner).** CloudFront
  `dl3644f5a7fnn.cloudfront.net`, Elastic IP `52.57.7.5` (kalıcı). OTLP/HTTP
  ingest `/api/public/otel` — gRPC DESTEKLENMEZ. Konteynerler
  `cwf-langfuse-{web,worker,clickhouse,redis,minio,postgres}` (`restart: always`).
  ⚠ Bütçe çiti aylık ~20'sinde ~10 gün kapanır — planlı kör nokta; çit beyanı
  repo'da `infra/aws/budget-fence.json` ve YENİ kutuyu gösterir (S116, #372).
- **Fabrika durumu (S116'dan beri): `public.factory_state`** — singleton mod
  satırı (INIT/READY/WORKING/DRAINING/SHUTDOWN) + şerit satırları
  (BOOTING/CLAIMED/WORKING/PARKED/CLOSED, nabız) + `public.factory_events`
  (trigger'la append-only). Açılış: ustabaşı önce → süpürme → READY → üreticiler.
  Kapanış: sahip "fabrikayı kapat" der → Architect DRAINING yazar → şeritler ref
  bırakıp CLOSED yazar → ustabaşı SHUTDOWN. **READY görülmeden kart dağıtılmaz.**
- Qdrant + bge-m3 aynı EC2'ye planlandı. bge-m3 deterministiktir, LLM DEĞİLDİR.
  Vektör portu hibrit dense+sparse + RRF konuşmak zorunda (IR-4 sözleşmesi).

## 4 · MİMARİ YASALAR (kilitli)

DB-first / code-floor · **empty ≠ zero KUTSALDIR** · grounding deterministik
KODdur, asla LLM yargıcı değil (ADR-001) · eval-gate atlanamaz (motor + stage
sırası + yorumlayıcı BAYT-AYNI) · C1: replay/governance'tan `messages`'a sıfır
yazma · arkabahçe kimliği VERİdir · JOIN YASASI (Glazur3) ·
MEASURE-READ-HONESTY-1 ("veri yok" ≠ "okuyamadım") · FLOOR-TENANT-SPLIT
(`check:tenant-zero`). ADR külliyatı repo'da `docs/adr/` (16 adet; ADR-005 db
push only · ADR-007 sır asla basılmaz · ADR-009 topoloji keşfedilir · ADR-010
beyan ≠ gözlem · ADR-012 kısıt etiketi valfin tanım yerinde). D-13: standart
interop RESMÎ SDK ile.

## 5 · SÜREÇ YASALARI (S-numaralı; tam metinler docs/laws/, burada ad + öz)

Kanıt: S65-1/2 (canlı okumayla açıl; kanıt hesaplanır) · S70-1 · S73-1/2 ·
S66-1 (pozitif kontrolsüz sıfıra güvenme) · S63-1 (merge kanıt değildir) ·
S93-1 (doğum kanıtı) · S98-L4 (ölçümün ilk tüketicisi de kanıta dahil) ·
S98-L5 (kazık defteri). İş: S74-1..4 (bekleme sözleşmesi: bitiren çıktı +
yapıştırılacak + expiry + bağımsız sensör) · S75-1 · S80-1 (mutlak yol) ·
S88-1 (dalga-çapa) · S91 (faz kartı tamlığı: dal · push · rapor yolu · PR) ·
S91-3 (şerit işi bitmeden oturum kapanamaz — S116: adlandırılmış taşıma
meşrudur) · S94-1/2 (pg_catalog, asla information_schema) · S96-1/2/3 ·
S98-L1 (temiz sayfa; ölü worktree silinir) · S98-L2 (yıkıcı hedef HESAPLANMIŞ
kimlikle) · S100-1/2/3/4 · S101-L1..L4 · S102 yasaları (sahip-eli · yarışsız
teslim · okunmamış plan yıkamaz · türev kaynak yerine geçmez · tek negatif prob
yokluk kanıtı değildir · en tam tanıklı kazanır) · S103-YASA-1/2 (defter
append-only; numara yeniden verilmez).

## 6 · ARCHITECT DOKTRİNİ (v1_5 · D-1…D-13)

D-1 RECON-FIRST · D-2 ONE-RELAY · D-3 COMPUTED-NOT-ASSERTED · D-4 CEREMONY-ZERO
· D-5 GATE-SELF-TEST (iki yönde) · D-6 TOUCH-BUDGET (faz başına ≤3 sahip
dokunuşu) · D-7 gönderim-öncesi liste (S6 SIRALILIK) · D-13 resmî SDK.
**S116 ekleri (kart grameri):** her çit "artı repo kapılarının ZORLADIĞI kayıt
dosyaları, raporda adlandırılır" cümlesini taşır · damga işaretçi-formundadır
(çıplak sha yasak) · küçük kalemler TEK-DAL dalgaya biner (kaskad CI'ı önler) ·
KÜÇÜK-KART rapor formu: CLAIMS tablosu + kanıt çitleri · kart GROUND'u yalnız
şeridin doğrulayacağı satırları taşır.

## 7 · FAZ YÜRÜTME KALIBI

Bootstrap (taze klon; çapa doğrula) → teşhis + tasarım notu → TEK kapılı sürümlü
kart bus'a → şerit kurar, push, PR → ustabaşı drain-in-turn İNİR (S116'dan beri
dürtmesiz) → Operator migrasyonları db push → kapanış artefaktları sürümlü.
Relay BLOCK işaretleri LANE alır. Kartlar relay_inbox'a dollar-quoted İNSERT ile
iner; Architect'in tek DB yazma yetkisi relay_inbox INSERT + factory_state mod
satırı (sahip komutuyla DRAINING/READY sınıfı geçişler).

## 8 · ARAÇ TUZAKLARI (acıyla öğrenildi; S116 ekleriyle)

**Supabase MCP:** her zaman pg_catalog · domain_rules'a status='published' ·
PostgREST 1000 satırda sinyalsiz keser · HEAD+count tuzağı · relay_inbox
düzeltmeleri YENİ SATIR, çok satırlı gövde dolar-tırnak.
**Vercel MCP:** dar pencere + deploymentId; **list_deployments meta'sı commit
mesajlarını taşır — PR sayfası önbelleğe takılınca ikinci göz (S116).**
**GitHub:** Architect kabından gh PROXY-KAPILI (add_repo Cowork'ta yok) — CI
hakemi ŞERİTTEDİR; public web sayfası okuması ikinci gözdür, hakem değil.
`/actions/runs?head_sha=` kullan; rollup'a asla tek başına güvenme (iptal,
success giyer).
**git/land:** `gh pr update-branch` seviyedeki dalda 0 ile çıkar — bekleme
ÖLÇÜLMÜŞ soy üstünden kurulur (LAND-FIX-4) · kendi-inişi yalnız docs/relay/ ·
land token'ı ADRES formudur (`ADF_LANE_ROLE=AG-<n>`), rol kelimesi değil ·
komut-öneki export'un yerine geçer (her Bash çağrısı taze kabuk).
**macOS canlılık:** pgrep kendi pid'ini bile kaçırabilir; kendi-pid pozitif
kontrolü geçmeyen mercek hüküm veremez. Boot bayat ağaçtan okunur — önce tel
kontrolü (ls-remote master vs rev-parse HEAD).
**Vitest:** scripts/** include dışı; script testleri api/cwf/__tests__ altına.
**CI:** eval-canary PR'da YAPISAL atlanır · rule26 = Playwright panel ölçümü
(scope src/components/admin/**) — CI-DIET path-aware: kapsam dışı diffte koşmaz;
tam takım merge SONRASI master'da · budget-fence yalnız günlük 07:10Z + elle
tetik; PR'da hiç koşmaz (yeşil kanıtı planlı koşudan okunur).
**AWS:** AWS_PAGER="" · CloudFront us-east-1 · hangi kabuk olduğunu doğrula.

## 9 · KİLOMETRE TAŞLARI VE SÖZLÜK

yaprak_gate = 7 SOTA anahtarı dönmüş (mimari tamam, ölçülmemiş) · cinekop_gate =
açık kalem sıfır + ilk ölçüm turu (kanıtlanmış SOTA). **SOTA'nın İKİ skorbordu
var:** iç sayaç 6/7 (açık: #29 A23) · kabul sözleşmesi 0/16 (cwf-sota-definition
v1_5 §10) — SOTA-1 kabulü (B)'ye bağlar; (A)'yı 7/7 yapmak SOTA'yı KANITLAMAZ.
**ADF** = fabrika disiplini programı; bitti demenin tek tanımı çıkış testinin
6/6 ölçülmesi (S116 sonunda fiilen ~4+/6). **Oturum durumu asla hafızada
taşınmaz** — canlı konum proje kutusundaki en yüksek sürümlü register/bootstrap/
KB'dedir; hafızadan hatırlanan her sayı varsayılan BAYATTIR.

## 10 · TEKRAR EDEN ARCHITECT HATASI (her oturum hatırlat)

**Canlı artefaktı okumadan spec yazmak.** S101'de beş, S116'da beş kez daha
(A-REC-S116: kart-kapı çelişkisi, iki dar çit, çıplak-sha damga, sahibe gereksiz
konsol gezisi). Kural: her kart, bağımlı olduğu yeteneği ÖNCE okur ve kanıtını
karta yazar; kapının kendisi de "bağımlı olunan yetenek"tir.

## 11 · DESKTOP YETENEK HARİTASI (S116'da ölçüldü — Cowork Desktop kabı)

Kendi kabında: tam shell (git/node/npm), taze klon, `npm run architect:open`
KENDİ ELİYLE, apt kurulumu. Canlı okuma: Supabase MCP (+ relay INSERT), Vercel
MCP, public GitHub web. gh: kurulabilir ama token vekil-kapılı — hakem şeritte.
Köprü (device_*): sahibin Mac'inde İZOLE VM — bağlı klasörleri okur/yazar
(arşiv kanalı: `Claude_Duzenli_Arsiv/S<oturum>/` her teslimatın sahip nüshası),
gh/gerçek-kabuk YOK. Zamanlanmış nöbetler (send_later) Architect'in kendi
dürtmesiz döngüsüdür: aktif zincirde ~10 dk, boşta 30-45 dk kadans; iç temizlik
görevleri silinmek yerine kendiliğinden sönecek biçimde kurulur (Manual modda
silme sahibin tıkına takılır). Auto modu sürtünmeyi kaldırır, yönetişimi
kaldırmaz: yıkım/harcama/gerçek-dünya kararları yine adlandırılmış rıza ister.

<!-- END · cwf-memory-seed-CWF5-v2 -->
