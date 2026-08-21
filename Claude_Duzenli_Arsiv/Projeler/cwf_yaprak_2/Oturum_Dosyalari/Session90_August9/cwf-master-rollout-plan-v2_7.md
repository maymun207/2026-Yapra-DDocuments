# CWF — Master Rollout Planı · v2_7

<!-- cwf-master-rollout-plan-v2_7 · 2026-08-09 · S90 kapanışı.
     v2_6'yı amend eder (S37-1). Kalem SİLİNMEZ; ✅+kanıt; yeni iş adıyla. -->

> **⚖ S82-6** yürürlükte. Kabul ölçütü: `cwf-sota-definition-v1_5`. Bütçe: R4.

## ZEMİN (v2_7 anı)
master `c1e3f5f` · docVersion rev 222 · 517 test dosyası / 6308 test · üretim
READY @ `02a8d33`. S90 merge'leri: `5d92d81` GATE-SILENCE-VISIBILITY-1 ·
`02a8d33` ROUTE-DERIVE-1 (**2E.2 ✅**).

## ★ S90 HÜKÜM KAYITLARI (sahip — BAĞLAYICI)
1. **METRIC-REGISTRY-DATA-1** — backend tapu kelimeleri koddan çıkar,
   backend-scoped governed satıra iner; platform tabanı BOŞ; armes üçlüsü
   armes seed'i olur. Taşıyıcı: `cwf-design-METRIC-REGISTRY-DATA-1-v1`.
   Gerekçe sahibin kendi cümlesi: *bankada FIRE'ın, sigortada OEE'nin anlamı yok.*
2. **METRIC-VOCAB-DISCOVERY-1 ratife** — sözlük self-learning ile governed
   kapıdan büyür, klavyeyle asla. Önkoşulu (1).
3. **MEMORY-HYGIENE-Q** — BEYAN-PERSIST-Q + çöp-dossier MERGED-INTO; elle
   silme reddedildi, düşüş ADR-010 gözlem disiplinine bağlanır.
4. **BENCH-KULLANIM-DOC-1** — tezgâh kullanım dokümanı (A→G deney formatı).
5. **İZLEK çapaları** register'da sabit bölüm (sahip talebi): ① anlama ·
   ② orchestrator · ③ graph-KB · ④ PathB · ⑤ CS329A.

## S90'DA KAPANAN SATIRLAR
- **2E.2 ROUTE-DERIVE-1 ✅** `02a8d33` — ray aynadan doğuyor, ANY backend;
  cron tanığı dört backend'de canlı, idempotence kanıtlı.
- **GATE-JURISDICTION-AUDIT-1 ✅** — Madde-3 ihlali sıfır; bulgusu faz oldu.
- **GATE-SILENCE-VISIBILITY-1 ✅** `5d92d81` — kapı susuşu üretimde görünür.

## SIRA (v2_7 bağlayıcı yürüyüş)
| # | İş | Şerit | İZLEK |
|---|---|---|---|
| 1 | grounding `vocab_source` span kanıtı (S63-1 yarısı) | Architect | ② |
| 2 | **METRIC-REGISTRY-DATA-1** (recon→tasarım hazır→faz) | AG-1 | ② ⑤ |
| 3 | **STAGE-CARD-COVERAGE-1** (tek geçiş; recon S90'da hazır) | AG-2 | — |
| 4 | **TOOL-ANNOTATION-KIND-MINT-1** (W-034, üretim tanıklı) | AG | — |
| 5 | 2.7 FRAME-SHADOW-EVIDENCE-1 | AG-2 | ① |
| 6 | **#6 ALETLER**: 015 · 016 · 017-ölçüm · **CANARY-POWER-1** (9× hükümsüz) · W-026×5 | — | ⑤ |
| 7 | **TOOL-BEHAVIOR-CENSUS-1** + FRAME-ON-ALL-PATHS-1 | — | ⑤ ① |
| 8 | **METRIC-VOCAB-DISCOVERY-1** (önkoşulu #2) | — | ② ⑤ |
| 9 | 2E.3 PACK-FROM-PROTOCOL-1 (+W-035 evi) · 2E.4 ROUTE-ASK-1 (ölçüm-kapılı) | — | ① |
| 10 | Blok 2 kalanı: 2.2a · 2.2 · 2.3a · 2.4 · 2.5 · 2.6 · 2.8 · 2.9 | — | ③ ⑤ |
| 11 | **2D**: 2D.1 PB-FULL-1 (blok açılışı) · 2D.2 · **2D.3 GRAPH-KB-1** · LLM-SCAN-BASELINE-1 · 2D.4a/b · 2D.5 OPA | — | ④ ③ |
| 12 | **Blok 3** açılış EVAL-SPLIT-LAW + ilk ölçüm turu | — | ⑤ |
| 13 | **Blok 4**: honestbench (Fast_p) · **A23 ANLAMA KATMANI** | — | ⑤ ① |
| 14 | Blok 5–6: v1.1 kuyruğu (RULE26-HARDEN-1 · M-C · E-1 · golden-infra) | — | — |

**Paralel (bloke etmez):** 2B.1 RAG (dış) · 2B.2 WEB-VALVE-1.
**Park (adlı tetikli):** ACTION-AUTHORITY-ADR → BACKEND-N8N-1 (tetik: CENSUS) ·
LangGraph · HISTORY-DIET-1 · ROUTER-DISTILL-1 (ölçüm) · MEMORY-HYGIENE-Q ·
TENANT ailesi (müşteri #2) · vizyon rezervleri.

## v2_6 → v2_7 DEĞİŞİM KAYDI
1. Beş S90 hükmü yasa bölümüne işlendi.
2. 2E.2 ✅ kapandı; GATE-SILENCE-VISIBILITY-1 doğdu ve kapandı (aynı gün).
3. METRIC-REGISTRY-DATA-1 sıraya #2 olarak girdi (önkoşul zinciri:
   registry → census → discovery).
4. W-034/W-035 adlı kalem oldu; FRAME-ON-ALL-PATHS-1 restore edildi.
5. Hiçbir satır silinmedi; hiçbir sıra sahip hükmü olmadan değişmedi.

<!-- END · cwf-master-rollout-plan-v2_7 · S90 -->
