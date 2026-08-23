# cwf-master-rollout-plan · v3_2 — S94 sonrası bağlayıcı yürüyüş

<!-- v3_1'i geçersiz kılar. SOTA-1 + S82-6 bu belgenin üstündedir (verbatim
     metinleri bootstrap v95 §A ve v2_0 §0'da). Zemin: master d8f33f80 ·
     rev 233 · 72 migration. Payda 41 · kapalı 9 · açık 32. -->

## §0 · İKİ YASA (özet işaretçi — verbatim tekrar oturum açılışının işi)

SOTA-1: ölçüt ancak KANITLA emekliye ayrılır; erteleme itirazının tek geçerli
sınıfı (a)+(b)+(c) üçlüsüdür. S82-6: mimari erteleme geçersizdir — gereken her
katman en başta, adıyla, SOTA seviyesinde.

## §1 · KAPALILAR (S94 sonu itibarıyla, 9)

S93 öncesi 3 · S93: #2 LEARNING-SNAPSHOT-1 🔑(1/7) · #35 CANARY-REP-FAILURE-1
· #36 FLOOR-RESYNC-1 · **S94: #4 TRUST-PANEL-PER-BACKEND-1 · #38
SNAPSHOT-LIFECYCLE-1 · #39 SNAPSHOT-PORTABILITY-1** (FIX-2 dahil).

## §2 · SIRADAKİ YÜRÜYÜŞ (bağlayıcı sıra)

1. **#40 PERSISTENCE-CLASS-1** — total sınıflandırma yasası + ADR-014.
   Taşıyıcı: `cwf-design-PERSISTENCE-CLASS-1-v1`. Servis dalgasının
   (#23/#25/#29) ÖNÜNDE olmak zorunda (S82-6). Doğum kanıtı: kapı iki yönde
   de KIRMIZIYA düşürülerek + S66-1 pozitif kontrol + canlı Sağlık bandı.
2. **#41 SWEEP-BARE-DELETE-1** — organ-dışı tüm SECURITY DEFINER gövdelerinde
   çıplak tam-tablo DELETE taraması; #39'un sınıf kapısının ev geneline
   genişletilmesi. #40 ile dalga ADAYI — şartlar: S88-1 çapraz kontrol,
   S92-1 GO emri, çit ayrıklığı (beklenen: #40 shared/+test, #41
   migration-metin testi — kesişim düşük ama KANITLANIR, varsayılmaz).
3. **SAHİP KARARI (yayın öncesi):** `learning.snapshotRetentionMax` governed
   yayınlansın mı (kod tabanı 500). S80-3 gereği karar yayından önce.
4. **#6 FRAME-SHADOW-EVIDENCE-1 + #7-9 alet kuyruğu dalga hazırlığı.**
5. **#10 TOOL-BEHAVIOR-CENSUS-1** (taşıyıcı projede) — kapı anahtarı yolu.
6. **#16 mount → #18 A2A/AgentBeats → #23 PathB/BM25 → #25 Graph-KB →
   #29 A23** — kapı anahtarları; #40 hepsinin önünde.

## §3 · İZLENEN, AÇILMAYAN

Kanarya: üç ardışık master 9/9-0; kelime cap'te kilitli; mühür #37.
CANARY-VERDICT-TRUTH-1 verdikt nöbeti sürüyor. Langfuse aylık fence penceresi
(~20'si, ~10 gün) — F-OBS-FLUSH-OK-LIE + OBS-HOST-HEALTH-1 yüksek öncelik.
GitHub App token formatı (ghs_, ~520 kar.) — entegrasyon nöbet notu.

## §4 · PARK (yeniden-giriş tetikleriyle)

TENANT-CONSOLE/EAIP-TENANT ailesi (tetik: müşteri #2 / online satış kararı) ·
RELAY-BUS-1 · Doctrine v1_2 D-6 düzeltmesi · SEED-PROBATION (tetik: Graph-KB
∨ kurulum #2; taşıyıcı: register v98 §1) · nakil kanıtının ikinci yarısı
(tetik: kurulum #2; ölçüm: boş hedefe tohum + hedef loglarında taşınan
öğrenmenin canlı kullanımı) · admin metin-katmanı kapısı (F-S94-VOICEGATE-
BLIND + TRUST-COPY-STUTTER + HEALTH-SYSTEM-ROW üçlüsünün ortak fazı —
aday, sıraya S95'te sahip görünürlüğüyle girer).

<!-- END rollout v3_2 -->
