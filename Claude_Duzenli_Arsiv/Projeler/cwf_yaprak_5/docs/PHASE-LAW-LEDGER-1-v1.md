# PHASE-LAW-LEDGER-1 · v1
**Lane: AG-1 · S102 · SC-A sınıfı (yalnız doküman + testler; NO migration, NO
seal-relevant surface unless drift demands it, NO turn-pipeline contact).
Dalga 8'i BLOKLAMAZ — Qdrant/RBAC ile paralel koşar. Dayanağı:
`KARAR-LAW-HOME-1-v1` (sahip hükmü).**

**PRECONDITION (S47-1):** base = `origin/master` (S102 açılışında taze klonda
doğrulanan hash; bootstrap v102 çapası `e7939c93…` idi). Master ilerlemişse
yeni hash'i raporla ve devam et — bu faz herhangi bir tepeye oturur.

**Branch:** `phase/law-ledger-1` · push · PR (unsharded CI arbiter; PR'da
`total_count:0` = FAILED, S101-L1: önce koşunun VARLIĞINI doğrula).
**Report:** `docs/relay/PHASE-LAW-LEDGER-1-report.md`

---

## 0 · NEDEN (S101'de yaşanan arıza)
Numaralı kural korpusunun kanonik metni hiçbir kalıcı yerde yoktu:
`CLAUDE-PROJECT-INSTRUCTIONS-v4` yalnız ADLARINI sayıyordu, kodda uygulamaları
vardı, kanonik cümleler ise **sohbet dökümlerinde** yaşıyordu. Sahip elle
avlamasa RULE-16 · 20 · 23 · 31 kaybolacaktı. Aynı sınıf arıza RULE-16'nın
kendi tarihçesinde de var: *"grep-enforced"* yazıyordu ama CI kapısı yoktu ve
**61 ihlal birikti** (audit-or-alarm dersi). Bu faz hem korpusa kalıcı ev verir
hem de o evi bir kapıyla korur.

## 1 · LIVE-READ FIRST (D-1 / S65-1) — rapora yapıştır
- `grep -rhoE "RULE[- ]?[0-9]{1,2}\b"` ile **kod, test, CI yml, docs** içinde
  geçen TÜM `RULE-N` referanslarının hesaplanmış envanteri (dosya:satır ile).
- `.github/workflows/build-test.yml` içindeki iş adları (job names) listesi.
- Mevcut `docs/` ağacı (bugün: ARCHITECTURE.md · ROADMAP.md · adr/ · relay/ ·
  replay/ · turn-pipeline.md · delegation-policy.md · source-diagrams/).

## 2 · REQUIREMENTS

**R1 — `docs/laws/RULES.md` doğar.** Her kural için MAKİNE-OKUNUR bir blok:
`id` (RULE-N) · `canonical` (tek cümle) · `scope` (hangi yüzey) ·
`enforcement` (biri: `ci:<job-adı>` | `test:<dosya yolu>` | `code:<dosya yolu>`
| `ADVISORY`) · `status` (`LIVE` | `RETIRED@<sebep>` | `SUPERSEDED-BY:<id>`) ·
`source` (kanonik cümlenin nereden geldiği: kod / oturum arşivi / sahip hükmü).
Başlangıç içeriği `cwf-rule-ledger-v3`'ten alınır ama **kopyalanmaz,
DOĞRULANIR**: her `enforcement` değeri §1 envanterine karşı kontrol edilir.

**R2 — `docs/laws/CONSTITUTION.md` doğar.** Anayasal blok tam metinle:
SOTA-1 · PLATINUM RULE · ALTIN DEFTER (GOLDEN LEDGER) · FULL-TRACE MANDATE ·
TOTAL-45/S59-2 · S61-2. Metinler `CLAUDE-PROJECT-INSTRUCTIONS-v5_3`'ten alınır;
her birine ("enforcement" alanı zorunlu değil ama) varsa dayatma yeri yazılır.

**R3 — KAPI (fazın kalbi): `api/cwf/__tests__/lawLedger.test.ts`.**
⚠ `scripts/**` vitest kapsamı DIŞINDADIR — test bu yola yazılır.
Kapı şunları iddia eder, hepsi hesaplanarak:
  (a) **Sarkan referans yok:** kod/test/CI/docs içinde geçen her `RULE-N`
      defterde bir kayda çözünür. *(Bugünkü RULE-23 arızasını yakalar.)*
  (b) **Cümlesiz kayıt yok:** her kaydın `canonical` alanı boş değil.
      *(Bugünkü RULE-16/20/31 arızasını yakalar.)*
  (c) **Hayalet dayatma yok:** `ci:<job>` gösteren kayıt için o iş adı
      workflow yml'de GERÇEKTEN vardır; `test:`/`code:` gösteren kayıt için
      dosya diskte vardır. `ADVISORY` açık bir seçimdir, boşluğun kılıfı değil.
  (d) Yinelenen `id` yok; `SUPERSEDED-BY` hedefi var olan bir id'dir.
  (e) `RETIRED` kayıtlar bir sebep taşır ve KODDA REFERANSI KALMAMIŞTIR.

**R4 — Kapının kendi kendini testi (D-5, iki yön).** Fixture'la kanıtla:
sahte bir `RULE-99` referansı eklendiğinde kapı KIRMIZI olur; `canonical`
boşaltıldığında KIRMIZI olur; var olmayan bir `ci:` işi gösterildiğinde KIRMIZI
olur; masum tam-dolu durum YEŞİL geçer. **Tek yönlü test edilmiş kapı,
doğrulanmamış kapıdır** — bu fazın var olma sebebi tam olarak budur.

**R5 — Tek gerçek kaynak ilanı.** `docs/laws/README.md`: bu dizin yasa
korpusunun KANONİK evidir; proje bilgi tabanındaki her kopya türevdir ve
çelişkide BU dizin kazanır. `docs/ARCHITECTURE.md` ve `docs/ROADMAP.md`'den
buraya işaretçi konur (metin kopyalanmaz).

**R6 — Bilinen boşluklar ADIYLA yazılır, sessizce doldurulmaz.** `RULES.md`
sonunda "açık sorular" bölümü: RULE-26'nın `latest-turn-trace.ts`'teki
"posture" yüzü aynı kural mı yoksa ad çakışması mı — tahmin etme, soruyu
kaydet. Aynı yere `LAW-LEDGER-2` (S-yasaları + doktrin) adıyla ertelenmiş
kapsam olarak yazılır.

## 3 · TESTS
R3'ün beş iddiası + R4'ün dört yönlü self-test'i. Ek: `RULES.md` parse edilebilir
(bozuk blok testi kırar). Yeni sorgu sitesi eklenmediği için purpose-gate
tetiklenmemeli; tetiklenirse etiketle ve raporda söyle.

## 4 · DELIVERABLES (kind=phase, R-DELIVERABLES)
```deliverables
branch: phase/law-ledger-1
report: docs/relay/PHASE-LAW-LEDGER-1-report.md (§1 envanteri + kapı self-test kanıtı)
pr: against master, unsharded CI green (total_count:0 = FAILED)
proof: post-deploy değil, CI-canlı (S63-1 uyarlaması) — merge sonrası master'da
       kapı koşar ve YEŞİLDİR; Architect taze klonda `RULE-99` fixture'ıyla
       kapının KIRMIZI olduğunu bağımsız doğrular
```
Merge `--no-ff` yalnız Architect GO'sundan sonra. Mühür yalnız ağaç değiştiyse
(S100-1); `docs/**` haritalı yüzey değilse reseal beklenmez — drift kapısını
koştur ve sonucu raporla.

<!-- END · PHASE-LAW-LEDGER-1-v1 -->
