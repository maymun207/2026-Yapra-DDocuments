# KARAR-LAW-HOME-1 · v1 — yasa korpusunun kalıcı evi ve kapısı
<!-- S101 kapanışında yazıldı. Sahip hükmü BEKLİYOR (S102 açılışında onaylanır).
     Register kalemi olarak adıyla taşınır: LAW-LEDGER-1. -->

## §1 · TEŞHİS (kök sebep)
Yasaları BİLEN rol (Architect) hiçbir yere YAZAMAZ; yazma yetkisi olan roller
(AG repoya, Operator şemaya) yasaların sahibi değildir. Korpus bu boşluğa düştü
ve tek kalıcı ev olarak **sohbet dökümleri** kaldı. S101'de dört kanonik kural
satırı (RULE-16 · 20 · 23 · 31) yalnız orada bulundu; sahip elle avlamasa
kaybolacaklardı. Bu, kendi iki yasamızın ihlalidir:
- **ALTIN DEFTER** — her kalem ADIYLA yaşar, taşıyıcılar append-only.
- **RULE-16 tarihçesi (audit-or-alarm)** — iddia edilen dayatma, WIRED kapı
  olmadan dayatma değildir; o boşlukta 61 ihlal birikmişti.

## §2 · HÜKÜM (tek yol)
**Yasa korpusunun kanonik evi REPO'dur: `docs/laws/`.**
- **DB REDDEDİLDİ:** çalışma-zamanı yönetişimi (agent'ın bildiği, `domain_rules`)
  ile inşa yönetişimi (bizim uyduğumuz) ayrı katmanlardır; karıştırmak tier
  ihlalidir. Ayrıca Architect DB'ye de yazamaz — sorun çözülmez, taşınır.
- **Google Drive REDDEDİLDİ:** kapı yok, diff yok, CI yok, commit'e
  bağlanamıyor; yeni bir silo ve yeni bir taşıma borcu doğurur.
- **REPO SEÇİLDİ:** kod zaten gerçek-kaynak; Architect her oturum klonluyor
  (taşıma maliyeti sıfır, proje göçünden etkilenmez); AG yazabilir; **CI
  dayatabilir**; diff ve PR incelemesi insan için okunur.

**İş bölümü (rol çiti korunur):** Architect YAZAR (metni üretir, relay eder) ·
AG PERSİSTE EDER (repoya commit) · CI DAYATIR (kapı) · sahip HÜKMEDER.

## §3 · PROJE BİLGİSİ ARTIK KOPYA TAŞIMAZ
Yasa metinleri proje bilgi tabanına **kopyalanmaz** — yalnız `cwf-memory-seed`
içindeki tek satırlık **işaretçi** kalır: *"yasa korpusu `docs/laws/` altında;
oturum başında oradan okunur."* Sebep: bugün ADR'lerde ve
`cwf-master-rollout-plan-v3_2`'de yaşadığımız **bayat ikinci kopya** sorunu.
Tek istisna: `cwf-rule-ledger-v3` geçiş dosyası olarak kalır, LAW-LEDGER-1
merge olunca projeden SİLİNİR (repo kanonik olur).

## §4 · KAPI ŞARTI (kararın ayrılmaz parçası)
Defterin kendisi bir kapı doğurmadan bu karar UYGULANMIŞ SAYILMAZ. Kapı en az
şunu iddia eder: kod/CI/doküman içinde geçen **her `RULE-N` referansı**
defterde bir kayda çözünür; her kaydın kanonik cümlesi VE dayatma yeri vardır
(ya da açıkça ADVISORY işaretlidir); dayatma yeri olarak gösterilen dosya/CI işi
GERÇEKTEN vardır. Bu kapı bugünkü arızayı tekrar ettirmez: RULE-23 dokümanda
anılıp deftersizdi, RULE-16/20/31 kodda anılıp cümlesizdi — kapı ikisini de
KIRMIZI yapar.

## §5 · KAPSAM (birinci tur)
İÇERİDE: dokuz numaralı RULE + anayasal blok (SOTA-1 · PLATINUM · ALTIN DEFTER
· FULL-TRACE MANDATE · TOTAL-45 · S61-2).
DIŞARIDA (adlandırılmış erteleme, LAW-LEDGER-2): S-numaralı oturum yasaları
(yüzlerce; evi KB) ve D-doktrini (evi `cwf-architect-doctrine`). Tetik: birinci
tur merge olup kapı yeşil koştuktan sonra. **SOTA-1 kontrolü yapıldı:** hiçbir
SOTA kriteri bu ertelemeden gerilemiyor; korpus hijyeni kapı anahtarı değildir.

## §6 · SIRA
LAW-LEDGER-1, Dalga 8'i BLOKLAMAZ. SC-A sınıfıdır (yalnız doküman + bir test,
migrasyon yok, mühür yok, turn-pipeline teması yok) ve Qdrant/RBAC ile
PARALEL koşar. Register'a `#63 LAW-LEDGER-1` olarak adıyla girer.

<!-- END · KARAR-LAW-HOME-1-v1 -->
