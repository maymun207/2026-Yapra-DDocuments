# CWF — AÇIK KALEMLER REGISTER · v103 (S99 kapanışı)

<!-- cwf-open-items-register-v103 · 2026-08-14. v102'yi geçersiz kılar.
     Yeni kalem yalnız ADIYLA eklenir; liste yeniden gözden geçirilmez. -->

## A · AÇIK YÜRÜYÜŞ KALEMLERİ (18) — sıra `cwf-implementation-order-S99-v12`
**Dalga 7 (sıradaki):** #23 🔑 PB-FULL-1 (AG-1) ·
**#57 SYNTHETIC-INJECTOR-SILENT-1** → #34 AGENTBEATS (AG-2) ·
**#56 CENSUS-CONSOLE-1** → #27 vektör/Qdrant (AG-3) ·
**#58 CARD-DELIVERABLES-SLOT-1** → #28 OPA-POLICY-1 (AG-4).
⚠ #57 dalga-önceliği: sentetik trafik 01:39Z'den beri SIFIR — golden runner
güçsüz, kanarya aç, honestbench izi (#52/#55 borcu) ödenemiyor.
**Dalga 8:** #25 🔑 GRAPH-KB-1 · #33 B-FRONTIER · #48 FAILURE-LESSON-MEMORY-1 ·
#47 OWNER-BATTERY-1 · **#59 SILENT-FINISH-DESIGN-1** (yeni — tetik ateşledi:
30 günde 16 olay, S98 "tek örnek" nöbeti aşıldı)
**Dalga 9:** #29 🔑 A23 · #49 ARTIFACT-NAME-OBSERVATION-1 · #17 HARNESS taraması
**Dalga 10 (kapı arkası — K3: ölçüm işlevi izler):** #37 · #30 (önkoşulu
F-S97-CLASS-CATALOG-UNINSTALLED **#54 ile ödendi**) · #31 · #32

## B · BUG BUCKET (S99 hasadı — tam liste REGISTER-BUG-BUCKET-v35)
| Ad | Durum |
|---|---|
| F-S99-BUS-WRITE-AUTHORITY-BY-CONVENTION | ✅ KAPANDI (#53 uygulandı; rol telde değil — bilinçli) |
| F-S99-BENCH-RESET-UNARMED | ✅ KAPANDI (#54; katalog 54/54, drift 0/0; uç okuması W7 bench kullanımına katlandı — session-gated) |
| F-S99-CI-ZERO-RUNS-READS-AS-CLEAN | ✅ YASALAŞTI (sertleştirilmiş CI + teşhis uzayı: no-PR-yet dahil) |
| F-S99-MAILWAIT-ATTRACTOR | ✅ YASALAŞTI (S99-3 + S99-4) |
| **F-S99-SYNTHETIC-INJECTOR-SILENT** | 🔴 AÇIK → **#57** (kontrollü izolasyon: cron düzlemi canlı, arıza enjektöre özgü) |
| ARDIC sayım tersine dönüşü (18/18 bizim) | ✅ ÖLÇÜLDÜ — satıcı listesi YOK; census üç-liste yasası (THEIRS/OURS/unattributed); canlı re-probe borç |
| ARMES yetki: 13 araç "no access to factory" | 🔴 ARDIC'ta (sayımdan AYRI — erişim meselesi) |
| F-S98-SHIFT-QUERY-UNUSABLE | 🔴 AÇIK — ARDIC'ta |
| Adsız flake | 🔵 NÖBET ×2 (#55 raporu NOT-READ + AG-4 push-on-red; kimlik kaybedildi — S99-9 adli disiplini bundan doğdu) |
| silent_finish | 🔴 tetik ateşledi → **#59** |
| User-voice: 3 incelenmemiş 👎 (48s+) | 🟡 SAHİP HİJYENİ — golden-set adayları ("felsefe yapıyorsun" · "fabrika listesi/KB7" · "armes'e ulaşamadın") |
| F-S97-REGISTRY-PARENT-OVERWRITE | 🔵 #25 çağı |
| BUG-016 sayaç · kanarya kilidi · transient-retry | 🔵 NÖBET (değişmedi) |

## C · PARK (tetikli — değişmedi)
TENANT-CONSOLE/EAIP-TENANT (müşteri #2 ∨ online satış) · SEED-PROBATION ·
nakil kanıtı 2. yarı · admin metin-katmanı üçlüsü · LangGraph · HISTORY-DIET-1 ·
MEMORY-HYGIENE-Q · ROUTER-DISTILL-1 · QUERY-CANDIDATE-1 · ACTION-AUTHORITY-ADR
→ BACKEND-N8N-1 · 2B.1 RAG · 2B.2 WEB-VALVE-1 · DOKÜMANTASYON (en sona).

## D · SAHİP KARARI SIRADA
Yok. (S99'da verilenler: damga izni HAYIR ✓ · #54 sırası ✓ · sayım-UI Seçenek 1 ✓ ·
iki göz-okuması GEÇTİ ✓ — #51 kabulü + Persistence bandı dönüşü.)

## E · S99'DA KAPANANLAR (10)
**#18 🔑 BENCH-A2A-1 (kapı 4/7)** · #45 OBS-PROBE-TRIGGER-1 (5-tick canlı nabız) ·
#51 MOUNT-CONSOLE-UX-1 (sahip kabulü ekranla) · #52 PACK-LIVE-OBSERVABLE-1 ·
#46 CENSUS-DEEPEN-1 (18/18 bulgusu) · #14 ROUTE-ASK-1 (karanlık valf) ·
#50 EVALGATE-BACKEND-GENERIC-1 (sebep düzeltmesiyle) · **#53 BUS-LANE-ROLE-1**
(doğdu+uygulandı) · **#54 PERSISTENCE-CATALOG-INSTALL-1** (doğdu+uygulandı+panel) ·
**#55 PACK-BACKEND-GENERIC-1** (doğdu+kapandı). Ayrıca S99-2 okuma-tarafı aleti
(numarasız) merge edildi; #53 verifyGrants artığı ödendi (80/80).

## F · YASALAR (S99 — dokuz)
S99-1 tek-ifade DB · S99-2 teslimat=git · S99-3 inşada posta kapalı ·
S99-4 yetkili işle MAIL-WAIT yasak · S99-5 pozitif kontrol · S99-6 kapıya uy ·
S99-7 alet doğrulaması · S99-8 merge fiili · S99-9 exit-code/pipefail + flake
adli disiplini. Detay ve doğuran olaylar: **CWF-SESSION-GRAPH-KB-v100 §1**.
A-REC-S99-1..8 serisi: KB v100 §3.

<!-- END · cwf-open-items-register-v103 -->
