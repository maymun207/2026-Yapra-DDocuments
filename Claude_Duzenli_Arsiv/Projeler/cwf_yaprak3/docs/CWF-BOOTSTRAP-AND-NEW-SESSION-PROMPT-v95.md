# CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT · v95 — S95 açılışı

<!-- v94'ü geçersiz kılar. S37-1. İlk mesaj: "S94'ten devam". -->

## §A · KİMLİK + YASALAR (verbatim tekrar zorunlu)

SOTA-1 + S82-6 ilk mesajda **verbatim**. Doktrin **v1_4** · D-7 · DALGA-ÇAPA
(S88-1) · S74-3/4 (Architect şerit çıktısını origin'den KENDİ okur) ·
otomasyon-önce · PLATINUM · sahip maddeleri insan-dili Türkçe, adım adım.

Yasa katmanları: S89(5) · S90(2) · S91(6) · S92(3) · S93(3) · **S94 üçlüsü**:
- **S94-1 ORTAM-GÖRELİ ANLAM:** anlamsal eşdeğerlik ortama görelidir — canlı
  hedefin koruma seti (preload kütüphaneler, rol GUC'ları) cümlenin anlamının
  parçasıdır. Bu DB'de `authenticator` safeupdate yükler: tam-tablo DELETE'in
  kanonik biçimi `delete … where true;`. Yakınsama yönü repo→uygulanmış;
  "eş" hükmü OKUYARAK verilemez, hedefte ÖLÇÜLEREK verilir.
- **S94-2 KATALOG YASASI:** `information_schema` AYRICALIK-süzgeçli görünümdür
  ve boş küme hatasız döner — boş sonuç OKUNMAMIŞ sayılır. Kısıt/şema
  sansüsleri `pg_catalog` (pg_constraint/pg_class/pg_attribute) veya DDL
  metninden yapılır. ("Canlıda doğruladım" iddiası katalog ister.)
- **S94-3 HESAPSIZ SAYI YOK (D-3 sertleşmesi):** Architect'in merge mesajı,
  beklenti satırı ve durum sayısı dahil HER rakamı hesaplanmış olmalı;
  S94'te üç ayrı hesapsız-sayı hatası sicile girdi (A-REC-S94-1/2/3).

Sahip hükümleri: register **v98 §1** (yeni: #39 iki-senaryo, SAFETY-TAKE,
#40 total sınıflandırma, SEED-PROBATION park).

## §B · RULE-25 BOOT (taze TAM klon; iddia — DOĞRULANACAK)

`origin/master` **`d8f33f80a5ba3c76fa710e0c73918664f0ffd979`** · docVersion
**rev 233** · **533** test dosyası / **6820** test · **72** migration
(canlıda 72, bire bir — ledger tepesi `20260812160000`) · 13 ADR · üretim
`f7af666`'ya yakınsamış (sonraki iki commit docs-only; rozet ed527ec/f7af666
gösterebilir, ikisi de doğru).

**S94 merge'leri:** `342dc81` (#4, rev 230) · `2d9cb72` (#38, rev 231) ·
`f7af666` (#39, rev 232) · `ed527ec` (FIX-2, rev 233).

**SOTA kapısı: 1/7.** Kanarya: master'da üç ardışık `scored 9 / failed 0`
(f6d6e48→f7af666→ed527ec); kelime `underpowered` cap'te KİLİTLİ (checked 6<9)
— beklenen, yeniden teşhis YASAK, mühür #37. İZLENİR, açılmaz.

**Öğrenilmiş katman:** 245/800/13/20/3/2; s94-ritual ritüeli 6/6 bayt-aynı
kapandı; görüntüler: s93-birth-3 · s94-ritual(🔒) · s94-ritual-2 ·
pre-restore-2026… (800). Sahibin diskinde kurulum-dışı ilk dosya yedeği var.

## §C · S95'İN İLK İŞLERİ (sıra — rollout v3_2)

1. **#40 PERSISTENCE-CLASS-1** — prompt taze master'a; taşıyıcı:
   `cwf-design-PERSISTENCE-CLASS-1-v1` (projede). ADR-014 üretir. Servis
   dalgasından önce ZORUNLU (S82-6).
2. **#41 SWEEP-BARE-DELETE-1** — #40 ile dalga adayı; S88-1 çapraz kontrol +
   S92-1 GO emri şartıyla.
3. **Sahip kararı:** `learning.snapshotRetentionMax` yayınlansın mı (taban
   500). S80-3: karar yayından ÖNCE verilir.
4. #6 + #7-9 dalga hazırlığı · kanarya izlenir · Langfuse fence penceresi
   (~ayın 20'si) yaklaşıyor.

## §D · DEĞİŞMEZLER (yeniden tartışılmaz)

S89–S94 katmanları aynen · SOTA kapısı = mimarinin tamamlanması (1/7; kalan
#10·#16·#18·#23·#25·#29) · uygulanmış migration dokunulmaz tarih (72'si de) ·
`where true` kanonik (S94-1) · tohum sınıf haritası #40'a kadar bilinçli el
listesi (raporda beyanlı) · voiceGate admin panellerine KÖR (bulgu açık —
metin elle denetlenir) · AG şeritleri geçici klonda Vercel CLI çalıştırmaz ·
Operator'da `git pull` OKUMA eylemidir, dosya-dokunma yasağını ihlal etmez.

## §E · DOSYA SETİ (projeye yüklü olacak)

`CLAUDE-PROJECT-INSTRUCTIONS-v4` · `cwf-sota-definition-v1_5` ·
`cwf-architect-doctrine-v1_4` · **`cwf-master-rollout-plan-v3_2`** ·
bootstrap **v95** (bu) · register **v98** · KB **v95** · bucket **v32** ·
`cwf-design-PERSISTENCE-CLASS-1-v1` (#40'ın taşıyıcısı) ·
`cwf-design-LEARNING-SNAPSHOT-1-v1_2` · `cwf-design-CANARY-REP-FAILURE-1-v1`
· `cwf-design-TOOL-BEHAVIOR-CENSUS-1-v1` · `cwf-sota-run-guide-S91-v1` ·
`cwf-advisor-note-CS329A-lessons-v2` · `cwf-architecture-research-S82-v1`.

SİLİNECEKLER (arşiv/tüketildi): register v97 · KB v94 · bootstrap v94 ·
rollout v3_1 · bucket v31 · `cwf-design-LEARNING-SNAPSHOT-1-v1` ve `-v1_1` ·
`cwf-design-SNAPSHOT-PORTABILITY-1-v1_1` (tüketildi; yaşayan yükümlülükleri
register v98 §1/§6'da) · `cwf-design-METRIC-REGISTRY-DATA-1-v1` (v1_1 kalır).

⚠ Şeritler proje dosyalarını GÖREMEZ (S91-4); faz promptları kendine yeter.

## §F · İLK MESAJDA SÖYLENECEK TEK CÜMLE

*"S94 dört merge ve bir yangınla kapandı (rev 233): yetki konsolu backend-başına
dürüst konuştu, görüntü organı ad-benzersizliği ve onaylı silmeyle olgunlaştı,
öğrenilmiş beyin dosyaya çıktı-döndü ve ilk gerçek silme+geri yükleme ritüeli
6/6 bayt-aynılıkla geçti — yol üstünde safeupdate yangını iki yeni yasa doğurdu
(ortam-göreli anlam, katalog yasası) ve S95, #40 PERSISTENCE-CLASS'ın servis
dalgasından önce dikilmesiyle açılıyor."*

<!-- END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v95 -->
