# CWF — Master Rollout Planı · v2_3

<!-- cwf-master-rollout-plan-v2_3 · 2026-08-08 · S87 · Architect: Claude (Opus 5).
     v2_2'yi amend eder. Sahip ratifikasyonu S87 (bu kanalda, "K1-K6 onaylı"):
     danışman notu cwf-advisor-note-CS329A-lessons-v2'nin altı kalemi işlendi.
     Kalem SİLİNMEZ; ✅+kanıt, yeni iş adıyla. -->

> **⚖ S82-6 (SAHİP YASASI):** Olması gereken her şey en başta, en ince ayrıntısına kadar.
> "Şimdilik gerek yok / tetiği bekle / yetmezse aç" sınıfı erteleme geçersiz. SOTA-1'in
> kardeşi: SOTA-1 ölçüt ertelemesini, S82-6 mimari ertelemeyi yasaklar.

**Kabul ölçütü:** `cwf-sota-definition-v1_5` (BINDING). Bütçe rakamı burada YAZMAZ (R4).

---

## ZEMİN (v2_3, 2026-08-08 · S87 — RULE-25 taze klondan bu oturum hesaplandı)
master `b4f96eeceebd1d9867cfe6f3053fe20b8db46821` (WITNESS raporu tepede; 43d15f38
sonrası iki commit docs-only, docs-dışı delta SIFIR — `git diff --name-only` ile
doğrulandı) · docVersion **rev 211** · 67 migration · **492** test dosyası / **5719**
test (CI-hakemli, S86 kapanış değeri) · 13 ADR · GATEWAY_RULES 18 · üretim
`dpl_7Qy9i1…` READY @ `43d15f38` · merge'siz dal: yalnız `phase/procedure-recall-1`
(S87'de AG-1 açtı, akışta).
S86 merge zinciri: `b2d6c55` (rescue) → `fd9f49b` (FAULT-SWITCH-0) → `20276dd`
(RENDER-TIME-1) → `43d15f38` (FENCE-WITNESS-1).

## BLOK 1 · ÖLÇÜM PANOSU — ✅ KAPANDI (S80)

## BLOK 2 · ÖLÇÜLEBİLİRLİK
- 2.1·2.1a·2.1b·2.3 ✅ · 2E.1 ✅ (`a6252b20`) + ROUTE-OPEN-2 ✅ (`338e5380`)
- **2.3b `FAULT-SWITCH-0` ✅ S86** (merge `fd9f49b`) — alet gemide; canlı tanık
  FENCE-WITNESS-1'le S86'da koştu (satır `04c636b9…`).
- **AÇIK — Blok 3'ün önkoşulu:** 2.2a backend-register · 2.2 mount · 2.3a harness ·
  2.4 reset · 2.5 A2A · 2.6 smoke · 2.7 frame-shadow · 2.8 discovery-extend-2 ·
  2.9 corpus-line-fill

### Kusur kuyruğu → bucket v25 (işleyen sıra orada)
S86 hareketi plan v2_2'de kayıtlı; değişmedi.

## BLOK 2B · MÜŞTERİ GİRDİSİ
- 2B.1 RAG — şerit açık, dış ekip cevabı bekleniyor, bizi bloke etmez.

## BLOK 2D · MİMARİ KATMAN
- 2D.1 `PB-FULL-1` AŞAMA 1 · PB-A — blok bununla açılır (harness sonrası).
- 2D.2 `LINE-RESOLUTION-DIAGNOSIS-1` · 2D.4a/b `PB-B`·`RETRIEVAL-INFRA-1`
  (ölçüm-tetikli). **(K4, S87):** 2D.4b'nin ADLI ÖNKOŞULU →
  **`LLM-SCAN-BASELINE-1`** (yeni adlı kalem): vektör altyapısı (park Qdrant +
  bge-m3) taahhüt edilmeden ÖNCE governed LLM-tarama geri-getirme taban çizgisi
  **F1 (BrowseComp-Plus)** altında ölçülür; korpus-boyutu ekseni tasarımın içinde
  (LLM-tarama maliyeti sorgu başına korpusla doğrusal — kesişim noktası kendisi
  bir ölçümdür). Altyapı yerini bu taban çizgisine karşı KANITLA kazanır
  (CodeMonkeys: ~3M-token repo'da düz LLM-tarama %92.6 recall). Uyku: RAG şeridi /
  2D.4 ölçüm tetiğiyle uyanır; sıra değişmedi.
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
| 2F.1 | `PROCEDURE-RECALL-1` | ToolComp · Memp | **FAZ GEMİDE (S87):** PHASE-PROCEDURE-RECALL-1-v1 relay edildi; AG-1 dalı `0e3b9163` origin'de, rapor bekleniyor |
| 2F.2 | `SEMANTIC-MEMORY-1` | LongMemEval · Gaia2 | sahip tetikli, tam kalem (#4) — GRAPH-KB-1 ile tek organ |
| 2F.3 | `STEP-EFFICIENCY-1` | §10 iç ölçüt | #5 — S86 turları referans setinde; gateway kural-uyum okuması buna biner (S86-R1). **(K5-i, S87) tasarım girdisi adıyla:** huni muhasebesi — tur boru hattı üstünde aşama-başı KOŞULLU kayıp (IR kaybı → discovery kaybı → araç kaybı → grounding kaybı → render kaybı), CodeMonkeys funnel deseni |
| 2F.4 | `PLANNER-0` | τ²-bench · Gaia2 | #7 — eylem-iddiası sınıfının (F-S86-2/T2 yalanı) önleyicisi |

## BLOK 3 · İLK ÖLÇÜM TURU (SOTA) — HİÇ BAŞLAMADI
2.2a/2.3a önkoşulları duruyor. Kısmi koşu asla ölçüldü sayılmaz.
**(K5-iii, S87) `EVAL-SPLIT-LAW` — blok açılışında BAĞLAYICI:** benchmark'a karşı
ayarlanan HER parametre held-out split kullanır; §10'a giren sayı DOKUNULMAMIŞ
split'ten gelir; split yöntemler arasında sabittir (Archon 20/80 emsali; C1–C4
refakatçisi — kendi-portresini-ayarla hatasını yapısal keser).

## BLOK 4·5·6 · honestbench katkı · A23 · v1.1 — başlamadı (2F hammadde, A23 tüketici).
**(K5-ii, S87) `mcp-honestbench` tasarım girdisi adıyla:** Fast_p parametreli-eşik
metrik ailesi (doğru VE taban çizgisini p katı geçen çıktı payı) — dürüstlük/doğruluk
eşiği süpürülebilir düğme olarak metrik tanımlarına.

## PARK · İZLEME — v2_2'den aynen + **S87 eklemeleri (sahip-ratife "K1-K6 onaylı", adlı):**

- 💤 **`ROUTER-DISTILL-1`** — governed router'ın doğrulanmış üretim izleriyle ince-ayarı
  (success-only korpus, 2F.0c hijyeni sonrası). **Adlı non-lever**; ölçülü re-entry
  tetiği v2_2'den aynen (taze M-A okuması: entity-unresolved baskın DEĞİL VE
  routing-miss lider sebep; tetik okuması koşucusunu adlandırır).
  **(K3, S87) yöntem notu:** kendi-ürettiği veriyle düz SFT çeşitlilik çöküşüyle
  platolaşır; multistep-RL-sınıfı ince-ayar çeşitliliği koruyup gelişmeyi sürdürür;
  küçük modeller flywheel'den daha az yararlanır — küçük governed router beklentisi
  buna göre. **Bağımsız teyit satırı:** DeepSeek-R1 döngüsü ağırlıkla POZİTİF
  izlerden öğrenir — `SUCCESS-ONLY-RECALL-1` tasarım öncülünün dış teyidi.
- 💤 **Multi-agent tasarım satırı** (S82 architecture-research ailesine, dosyasıyla):
  *İkinci ajan ilk tasarım notundan itibaren VERIFIER/CRITIC tarafında konumlanır,
  generator değil — modeller kendi akıl yürütme izlerini sistematik tercih eder.*
  **(K6, S87) Archon sözlüğü YALNIZ-SÖZLÜK olarak alınır** (Generator · Fuser ·
  Critic · Ranker · Verifier · UT-Generator · UT-Evaluator) **+ Fuser kısıtı:**
  ADR-001 altında Fuser yalnız soft/advisory katmanda yaşayabilir, grounding'e
  ASLA — yapılandırılmış adaylar (iki SQL) için zaten anlamsız. Archon-sınıfı
  kazanç 35–44 çağrı/sorgu: interaktif governed platform için v1 şekli değil;
  "adım başına en ucuz yeterli model" ilkesi zaten governed model paramları —
  2F.3 verisi ileride bu atamanın ölçüm beslemesi olur.

BUG-005 kusur kuyruğunda "proje kapanışı" tarihiyle (değişmedi).

---

## v2_2 → v2_3 DEĞİŞİM (kaynak: cwf-advisor-note-CS329A-lessons-v2 · sahip "K1-K6 onaylı" S87)
1. **ZEMİN S87'ye taşındı** — bu oturumun RULE-25 taze klonundan hesaplandı
   (b4f96eec; 43d15f38→master docs-dışı delta SIFIR).
2. **K4 işlendi:** yeni adlı kalem `LLM-SCAN-BASELINE-1`, 2D.4b'nin adlı önkoşulu.
3. **K5 işlendi:** (i) huni muhasebesi → 2F.3 satırına · (ii) Fast_p → honestbench
   satırına · (iii) `EVAL-SPLIT-LAW` → Blok 3 açılış yasası · (iv) floor-as-
   differential-oracle TASARIM SATIRI olarak kayda: DB-first/code-floor'da floor
   yolu, aynı girdide governed override için diferansiyel oracle olabilir;
   sapma = alarm (kalem değil; ilgili faz tasarımlarında adıyla anılır).
4. **K3 · K6 işlendi:** park kayıtları yukarıda zenginleşti; tetikler değişmedi.
5. **K1 · K2 register-tarafı** (bu dosyada değil): (a) feedback-richness yasası bu
   dikişte ZATEN gömülü — canlı teyit S87 (`gatewayProtocol.ts`
   recover-from-validation-error: hata eksik alan ADINI geri besletir, çıplak
   retry değil); (b) "örneklem-içi frekans doğruluk sinyali değildir" ders satırı;
   (c) distinguishing-probe literatür teyidi CHART-CANDIDATE-1 kaydına şerh;
   (d) S86-R2 ders satırına long-tail teoremi atfı (pass@k = 1−(1−pass@1)^k;
   pass@1=0 sınıfı her k'da dokunulmaz). → **register v91 mint'inde işlenecek
   (S87 kapanışı), buraya adıyla not düşüldü ki kaybolmasın.**
6. **2F.1 durum satırı canlı gerçeğe güncellendi** (faz gemide, dal origin'de).
7. **Hiçbir satır silinmedi; hiçbir sıra sahip hükmü olmadan değişmedi.**

<!-- END · cwf-master-rollout-plan-v2_3 -->
