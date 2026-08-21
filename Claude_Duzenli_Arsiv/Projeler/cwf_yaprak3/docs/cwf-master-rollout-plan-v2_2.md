# CWF — Master Rollout Planı · v2_2

<!-- cwf-master-rollout-plan-v2_2 · 2026-08-08 · S86 · Architect: Claude (Opus 5).
     v2_1'i amend eder. Sahip ratifikasyonu S86 (bu kanalda, "1-4 onaylı"):
     danışman notu cwf-advisor-note-CS329A-lessons-v1'in dört kalemi işlendi.
     Kalem SİLİNMEZ; ✅+kanıt, yeni iş adıyla. -->

> **⚖ S82-6 (SAHİP YASASI):** Olması gereken her şey en başta, en ince ayrıntısına kadar.
> "Şimdilik gerek yok / tetiği bekle / yetmezse aç" sınıfı erteleme geçersiz. SOTA-1'in
> kardeşi: SOTA-1 ölçüt ertelemesini, S82-6 mimari ertelemeyi yasaklar.

**Kabul ölçütü:** `cwf-sota-definition-v1_5` (BINDING). Bütçe rakamı burada YAZMAZ (R4).

---

## ZEMİN (v2_2, 2026-08-08 · S86)
master `43d15f38` (FENCE-WITNESS-1 merge) · docVersion **rev 211** · 67 migration ·
**492** test dosyası / **5719** test (CI-hakemli) · 13 ADR · üretim `dpl_AvXJ9pn…`
(20276dd) — FENCE-WITNESS deploy'u sensörden izlemede.
S86 merge zinciri: `b2d6c55` (rescue) → `fd9f49b` (FAULT-SWITCH-0) → `20276dd`
(RENDER-TIME-1) → `43d15f38` (FENCE-WITNESS-1).

## BLOK 1 · ÖLÇÜM PANOSU — ✅ KAPANDI (S80)

## BLOK 2 · ÖLÇÜLEBİLİRLİK
- 2.1·2.1a·2.1b·2.3 ✅ · 2E.1 ✅ (`a6252b20`) + ROUTE-OPEN-2 ✅ (`338e5380`)
- **2.3b `FAULT-SWITCH-0` ✅ S86** (merge `fd9f49b`) — alet gemide; canlı tanık (W2/W3)
  FENCE-WITNESS-1 şeridinde koşuyor.
- **AÇIK — Blok 3'ün önkoşulu:** 2.2a backend-register · 2.2 mount · 2.3a harness ·
  2.4 reset · 2.5 A2A · 2.6 smoke · 2.7 frame-shadow · 2.8 discovery-extend-2 ·
  2.9 corpus-line-fill

### Kusur kuyruğu → bucket v24 (işleyen sıra orada)
**S86 kapananlar:** BUG-012 ✅ (canlı mühür, 3 üretim nesli) · BUG-028 ✅ (kimlik
denklemi: queryCount = Σkanıt + failures) · BUG-009 ✅ (merge `43d15f38`, üçüncü durum +
durable satır + çip) · F-S86-1/3/4/5 ✅ (RENDER-TIME-1 tanıklı) · kanarya-tavan ✅
(CAP=240, koşu doğrulandı). **S86 doğanlar:** BUG-036 (preview anahtarı — W1 onarıldı,
kapanış W2 gövdesiyle) · CANARY-POWER-1 (→ #6 şartnamesine katlandı: 3 ardışık
underpowered, 9/9 rep → 3 skorlu; hükme varamayan kanarya kapı değildir) · F-S86-2
(hata-papağanlığı → 2F sınıfı).

## BLOK 2B · MÜŞTERİ GİRDİSİ
- 2B.1 RAG — şerit açık, dış ekip cevabı bekleniyor, bizi bloke etmez.

## BLOK 2D · MİMARİ KATMAN
- 2D.1 `PB-FULL-1` AŞAMA 1 · PB-A — blok bununla açılır (harness sonrası).
- 2D.2 `LINE-RESOLUTION-DIAGNOSIS-1` · 2D.4a/b `PB-B`·`RETRIEVAL-INFRA-1` (ölçüm-tetikli).
- 2D.5 OPA-POLICY-1 — sahip hükmü (ii): adlandırılmış önkoşul (EAIP-TENANT ailesi).
- 2D.3 GRAPH-KB-1 — 2F.2 SEMANTIC-MEMORY ile aynı aile, tasarım notu ortak, organ TEK.

## BLOK 2E · KENDİNİ ANLATAN BACKEND
- 2E.1 ✅ · 2E.2 ROUTE-DERIVE · 2E.3 PACK-FROM-PROTOCOL · 2E.4 ROUTE-ASK (2.7 sonrası).

## ★ BLOK 2F · BİLİŞSEL KATMAN (sıra v2_1'den aynen — conv-poisoning kilidi)

| # | İş | Ölçüt | Durum |
|---|---|---|---|
| 2F.0a | `RESULT-BUDGET-1` | bağlam yönetimi | ✅ `cba2af2c` |
| 2F.0b | `TOOL-EARNED-TRUST-1` | BFCL v4 · MCP-Bench | ✅ `a24271d4` + 9 overlay |
| 2F.0c | `SUCCESS-ONLY-RECALL-1` | LongMemEval | ✅ `5277103e` (S83) · §0 deneyi ARMED-NOT-RUN |
| 2F.0d | `CHART-CANDIDATE-1` | Gaia2 | ✅ `ce2e244` + FIX-1 (S84) |
| 2F.1 | `PROCEDURE-RECALL-1` | ToolComp · Memp | **SIRADAKİ (bucket #3)** — F-S86-2'nin canlı örnekleri hammadde |
| 2F.2 | `SEMANTIC-MEMORY-1` | LongMemEval · Gaia2 | sahip tetikli, tam kalem (#4) — GRAPH-KB-1 ile tek organ |
| 2F.3 | `STEP-EFFICIENCY-1` | §10 iç ölçüt | #5 — S86 turları referans setinde; gateway kural-uyum okuması buna biner (aşağıda, S86-R1) |
| 2F.4 | `PLANNER-0` | τ²-bench · Gaia2 | #7 — eylem-iddiası sınıfının (F-S86-2/T2 yalanı) önleyicisi |

## BLOK 3 · İLK ÖLÇÜM TURU (SOTA) — HİÇ BAŞLAMADI
2.2a/2.3a önkoşulları duruyor. Kısmi koşu asla ölçüldü sayılmaz.

## BLOK 4·5·6 · honestbench katkı · A23 · v1.1 — başlamadı (2F hammadde, A23 tüketici).

## PARK · İZLEME — v2_0'dan aynen + **S86 eklemeleri (sahip-ratife, adlı):**

- 💤 **`ROUTER-DISTILL-1`** — governed router'ın doğrulanmış üretim izleriyle ince-ayarı
  (success-only korpus, 2F.0c hijyeni sonrası). **Adlı non-lever** — erteleme değil,
  kanıtla önceliklendirme: MA-RERUN-2 (`b0e8c9e2`) routing'i baskın blok sebebi
  GÖSTERMİYOR. **Ölçülü re-entry tetiği:** discovery işleri (2.8 ailesi) indikten sonra
  taze M-A okuması (a) entity-unresolved artık baskın değil VE (b) routing-miss lider
  sebep; tetik okuması koşucusunu adlandırır.
- 💤 **Multi-agent tasarım satırı** (S82 architecture-research ailesine, dosyasıyla):
  *İkinci ajan ilk tasarım notundan itibaren VERIFIER/CRITIC tarafında konumlanır,
  generator değil — modeller kendi akıl yürütme izlerini sistematik tercih eder (CS329A).*

BUG-005 kusur kuyruğunda "proje kapanışı" tarihiyle (değişmedi).

---

## v2_1 → v2_2 DEĞİŞİM
1. **Zemin S86'ya taşındı:** `43d15f38` · 492/5719 · rev 211 · 4 merge SHA'sıyla.
2. **2.3b ✅** (FAULT-SWITCH-0); 2F.0c/0d ✅ işareti işlendi (S83/S84 kapanışları).
3. **S86 kusur hareketi işlendi** (7 kapanış, 3 doğum; CANARY-POWER-1 → #6 şartnamesi).
4. **Danışman notu S86 ratifikasyonu (dört kalem):**
   - **S86-R1 · CLOSED-BY-RECON — `QUERY-CANDIDATE-1` DOĞMAZ.** Gateway sorgu onarımı
     governed protokolde zaten var: `gatewayProtocol.ts` → `recover-from-validation-error`
     (P6.7-A) + P6.8 boş-dönüş yeniden-formülasyonu + `decline-on-empty` tabanı. Kural-uyum
     ölçümü 2F.3'e biner; best-of-N bu dikişe bilinçli olarak açılmaz (maliyetli
     doğrulayıcı + MA-RERUN-2 kaldıracı discovery'de gösteriyor). Desen sorusu kapalı.
   - **S86-R2 · Ders satırı** (register v90 §lessons'a): "Compute ölçülen kaldıraç
     değildir; discovery'dir — MA-RERUN-2."
   - **S86-R3 · PARK: ROUTER-DISTILL-1** (yukarıda, tetikleriyle).
   - **S86-R4 · Multi-agent verifier-side satırı** (yukarıda).
5. **Hiçbir satır silinmedi; hiçbir sıra sahip hükmü olmadan değişmedi.**

<!-- END · cwf-master-rollout-plan-v2_2 -->
