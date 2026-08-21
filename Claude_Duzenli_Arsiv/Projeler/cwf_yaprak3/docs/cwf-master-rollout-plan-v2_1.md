# CWF — Master Rollout Planı · v2_1

<!-- cwf-master-rollout-plan-v2_1 · 2026-08-06 · S82 kapanışı · Architect: Claude (Opus 5).
     v2_0'ı amend eder. S82'nin 7 merge'i ✅ · conv-poisoning bulgusu Blok 2F'yi yeniden
     sıraladı · SUCCESS-ONLY-RECALL yeni öncelik. Kalem SİLİNMEZ; ✅+kanıt, yeni iş adıyla. -->

> **⚖ S82-6 (SAHİP YASASI):** Olması gereken her şey en başta, en ince ayrıntısına kadar.
> "Şimdilik gerek yok / tetiği bekle / yetmezse aç" sınıfı erteleme geçersiz. SOTA-1'in
> kardeşi: SOTA-1 ölçüt ertelemesini, S82-6 mimari ertelemeyi yasaklar.

**Kabul ölçütü:** `cwf-sota-definition-v1_5` (BINDING). Bütçe rakamı burada YAZMAZ (R4).

---

## ZEMİN (v2_1, 2026-08-06)
master `40085d62627d3277fb4cb2cb9251ec2c0296ca7c` · docVersion **rev 199** · 67 migration ·
**477** test dosyası · 13 ADR · üretim `dpl_J2ioabs…`.

## BLOK 1 · ÖLÇÜM PANOSU — ✅ KAPANDI (S80)

## BLOK 2 · ÖLÇÜLEBİLİRLİK
- 2.1·2.1a·2.1b·2.3 ✅ · 2E.1 ✅ (`a6252b20`) + ROUTE-OPEN-2 ✅ (`338e5380`)
- **AÇIK — Blok 3'ün önkoşulu:** 2.2a backend-register · 2.2 mount · 2.3a harness ·
  2.3b **FAULT-SWITCH-0** (kusur kuyruğu K.8) · 2.4 reset · 2.5 A2A · 2.6 smoke ·
  2.7 frame-shadow · 2.8 discovery-extend-2 · 2.9 corpus-line-fill

### Kusur kuyruğu → bucket v21 §BUG.5 (işleyen sıra orada)
**S82 kapananlar:** BUG-020 ✅ · 021 ✅ · 023/027 (merge `61bc83e`) · 024 (merge `e0990df`)
· 025/026 (S81) · **030 ✅** (merge `c8018e7`).

## BLOK 2B · MÜŞTERİ GİRDİSİ
- 2B.1 RAG — **şerit açık**, `RAG-TEAM-NOTES-v2` iletildi (durum + 3-eşzamanlı fren +
  iki tarih). Dış ekip cevabı bekleniyor, bizi bloke etmez.

## BLOK 2D · MİMARİ KATMAN
- 2D.5 OPA-POLICY-1 — **sahip hükmü (ii): adlandırılmış önkoşul** (EAIP-TENANT ailesi).
  Ölçüte bağlanmaz, v1'de kalır.
- 2D.3 GRAPH-KB-1 — 2F.2 SEMANTIC-MEMORY ile aynı aile, tasarım notu ortak, organ TEK.

## BLOK 2E · KENDİNİ ANLATAN BACKEND
- 2E.1 ✅ · 2E.2 ROUTE-DERIVE · 2E.3 PACK-FROM-PROTOCOL · 2E.4 ROUTE-ASK (2.7 sonrası).
- **S82 kaydı:** TOOL-EARNED-TRUST bu bloğun ilkesinin ilk gerçek uygulaması (şema
  sunucunun söylediği gerçek, faz onu modelin seçim anına taşır).

## ★ BLOK 2F · BİLİŞSEL KATMAN — **YENİDEN SIRALANDI (conv-poisoning)**

**S82'nin en büyük bulgusu bloğu değiştirdi.** conv-poisoning (BUG-032) kanıtladı ki
sistem temiz bağlamda çalışıyor; sorun bellek YAZMA/OKUMA hijyeninde. Bu yüzden hafıza
temizliği, hafıza zenginleştirmesinin ÖNÜNE geçti.

| # | İş | Ölçüt | Durum |
|---|---|---|---|
| 2F.0a | `RESULT-BUDGET-1` | bağlam yönetimi | ✅ merge `cba2af2c` |
| 2F.0b | `TOOL-EARNED-TRUST-1` | BFCL v4 · MCP-Bench | ✅ merge `a24271d4` + 9 overlay |
| **2F.0c** | **`SUCCESS-ONLY-RECALL-1`** | LongMemEval (bellek hijyeni) | **YENİ · 1. SIRA** — başarısız tur ne yazılır ne çağrılır. §0=historyWindowN 6→0 deneyi |
| **2F.0d** | **`CHART-CANDIDATE-1`** | Gaia2 (aday seçim) | **YENİ · 2. SIRA** — şekil uyumu + kök-arama + belirsizse sor |
| 2F.1 | `PROCEDURE-RECALL-1` | ToolComp · Memp | başarılı turdan rutin; SUCCESS-ONLY sonrası |
| 2F.2 | `SEMANTIC-MEMORY-1` | LongMemEval · Gaia2 | **sahip tetiği çekti** — soru→artefakt olgusu, tam kalem |
| 2F.3 | `STEP-EFFICIENCY-1` | §10 iç ölçüt | [TurnEfficiency] → ölçüm panosu |
| 2F.4 | `PLANNER-0` | τ²-bench · Gaia2 | plan-first + re-plan gate; 2F.1/2 tüketir |

**Sıra kilidi:** 2F.0c (conv temizliği) → 2F.0d (aday seçimi) — bu ikisi "her soru her
seferinde çalışsın"ı bitiren pratik iş. Sonra 2F.1→2F.4.

## BLOK 3 · İLK ÖLÇÜM TURU (SOTA) — **HİÇ BAŞLAMADI**
2.2a/2.3a önkoşulları duruyor. Kısmi koşu asla ölçüldü sayılmaz (blok kuralı).

## BLOK 4·5·6 · honestbench katkı · A23 · v1.1 — başlamadı (2F hammadde, A23 tüketici).

## PARK · İZLEME — v2_0'dan aynen. BUG-005 kusur kuyruğunda "proje kapanışı" tarihiyle.

---

## v2_0 → v2_1 DEĞİŞİM
1. **7 merge işlendi** ✅, SHA'larıyla.
2. **conv-poisoning (BUG-032) doğdu ve Blok 2F'yi yeniden sıraladı** — SUCCESS-ONLY-RECALL
   yeni 1. sıra (2F.0c), CHART-CANDIDATE 2F.0d.
3. **BUG-031 (iki grafik tuzağı)** doğdu.
4. Operator 9 overlay yayınladı (BUG-021'in G1 yarısı canlı).
5. RAG şeridi açık, notes-v2 iletildi.
6. Zemin: `40085d6` · 477 test · rev 199.
7. **Hiçbir satır silinmedi; hiçbir sıra sahip hükmü olmadan değişmedi.**
