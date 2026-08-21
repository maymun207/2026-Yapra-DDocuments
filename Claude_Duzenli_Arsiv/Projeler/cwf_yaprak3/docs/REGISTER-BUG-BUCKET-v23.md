# REGISTER-BUG-BUCKET v23 — S85 işleyen kuyruk (TEK kaynak)
<!-- v22'yi geçersiz kılar. S37-1 sürümleme. -->

## §BUG.1 · S84'TE KAPANANLAR
BUG-025 · BUG-026 (canlı okuma + 81/81 pozitif kontrol) · BUG-033 (dış arıza;
run 31152100128) · BUG-034 (N=3 v2 3/3) · BUG-035 (numaralandırma yasası) ·
W-021 (18. kural, FOLD 4af2eeb8) · W-018 superseded · W-019 merged.

## §BUG.2 · RESOLVED-GUARDED (kod tam, canlı mühür ARMED)
- **BUG-028** (merge da8a0d5): parite yapısal; mühür = ilk doğal yerel-araçlı
  tur; şerh W-024 (defter aggregate/query_records'u görmüyor).
- **BUG-029** (merge da8a0d5): 5 site taşındı / 7 muaf / :707 birleşik;
  mühür = ilk doğal bozuk-sınıf turda dil turun sorusundan.
- **BUG-012** (dal ba05bb7, MERGE BEKLİYOR): first-claim + yerel-isim
  rezervasyonu + explicit clean marker; mühür = merge sonrası ilk turun
  collisions alanı (GO-öncesi DB okumasına göre yorumlanır).

## §BUG.3 · S85 İŞLEYEN SIRA
| # | İş | Not |
|---|---|---|
| 1 | **CI-DIET-1 — ACİL** | Sahip talebi. (a) docs-only paths-ignore (b) canary master-only (c) concurrency cancel (d) Vercel ignoredBuildStep. SINIR: master kod-merge push'u DAİMA tam takım (S37-2). Kanıt: bir docs-push (atlama) + bir dal-push (canary yok) + bir master-merge (5/5). Workflow dosyası kendi CI'ını değiştirir — dikkatli inceleme |
| 2 | **COLLISION-1 GO zinciri** | Önce Architect: RULE-25 (dal ba05bb7, beklenen 486/5610 rev 206) + `backend_tools`'ta yerel adlar deklare mi (SQL). Sonra GO + merge (canary borcu merge koşusunda ödenir) + ilk-tur mühür okuması |
| 3 | **LEDGER-COMPLETE-1** (W-024) | 15-dk mikro: iki recordToolCall + parite fikstürü; COLLISION merge'i SONRASI (aynı dosya: stageTools) |
| 4 | **PROBE-PARITY + AUTO-SYNC** | AG-1 boşta bekliyor; recon S85'te taze başlar |
| 5 | FAULT-SWITCH-0 | |
| 6 | BUG-006 + BUG-009 | |
| 7 | 2F.1 PROCEDURE-RECALL → 2F.2 SEMANTIC-MEMORY | QA-S81 kaydındaki sahip-tetikli katman |
| 8 | 2F.3 STEP-EFFICIENCY | Referans çifti: 910675a7 calls=8 vs d94bcfc3 calls=5 conv=1; S84 eki: T4/T5 bayt-aynı resolve_time_range+getFactoryLines tekrarı (tur-arası araç notu yok) |
| 9 | BUG-015 + BUG-016 → BUG-017 | |
| 10 | 2F.4 PLANNER-0 → 2E.2/3/4 → HONESTBENCH-RUN-1 | |
| 11 | **BUG-005** | PROJE KAPANIŞI — EN SON |
| — | BUG-010 · BUG-011 | Eski-açık, v21 yerlerinde |

## §W · İZLEME/ALET KALEMLERİ
- **W-022**: verifySupersetGatewayLive.ts bayat (başlık "13"; proof-1 ~26 gün
  koşulmamış). Tazeleme + takvim; uygun faza biner.
- **W-023**: rev-monotonluk korumasız (iki şerit bağımsız 204; git sessiz
  birleştirdi). CI koruması adayı: head rev > merge-base rev.
- **W-024**: → kuyruk #3 LEDGER-COMPLETE-1.
- **STAGE-CARDS-ALTITUDE**: Stage-07 kartına çakışma sebebi; kaynak client
  (stagesRegistry.ts) → client-çitli faza adıyla devredildi.
- **ADHOC-VIZ-1 (aday)**: dataset-grain küre yolu; SOTA kontrolü + sıra
  kararı Architect'te.
- **W-020 R1/R2**: AG-temp PAT silme + settings göçü — sahip teyidi bekler.
- QA-S81 kaydı: cwf-memory-and-discovery-QA-S81-v1.md projede; register/bucket
  atıf verebilir.

## §NÖBET (pasif — Architect okur, kimseye iş çıkarmaz)
BUG-032 P1/P2 · [GatewaySearchZero] · BUG-028/029 mühürleri · chartId çipi ·
BUG-012 ilk-tur · RAG 3-soru.
