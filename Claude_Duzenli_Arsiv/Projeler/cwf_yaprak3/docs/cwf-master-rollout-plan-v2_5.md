# CWF — Master Rollout Planı · v2_5

<!-- cwf-master-rollout-plan-v2_5 · 2026-08-09 · S89. v2_4'ü amend eder (S37-1).
     Sebep: PLANNER-0 tasarım notu mint'i (bootstrap v89 §E hükmü) + S88/S89
     kapanışlarının işlenmesi. Kalem SİLİNMEZ; ✅+kanıt; yeni iş adıyla. -->

> **⚖ S82-6 (SAHİP YASASI):** Olması gereken her şey en başta, en ince ayrıntısına kadar.
> "Şimdilik gerek yok / tetiği bekle / yetmezse aç" sınıfı erteleme geçersiz. SOTA-1'in
> kardeşi: SOTA-1 ölçüt ertelemesini, S82-6 mimari ertelemeyi yasaklar.

**Kabul ölçütü:** `cwf-sota-definition-v1_5` (BINDING). Bütçe rakamı burada YAZMAZ (R4).

---

## ZEMİN (v2_5, 2026-08-09 — S89 taze klon + canlı okumalar)
master `19e84206eb84a8f…9cff` · docVersion **rev 217** · **68 migration** · 13 ADR ·
GATEWAY_RULES 18 · suite **500 dosya / 5986 test** (KESİNLEŞTİ: birleşik ağacın ilk
master koşusu run `31289369079`, 5/5) · üretim `dpl_2jepUGrQNFXhA8Pq9zZxKuwvjrck`
READY @ `b7f26ce` (master ucu +1 salt-doküman commit; kod kayması SIFIR — S89 boot
okuması) · sarkan dal SIFIR. **S89 olayı:** F-S88-1 sahip-göz tanıklığıyla KAPANDI
(5 seri / 5 renk / ek yok, 05:53).

## BLOK 1 — ✅ KAPANDI (S80)

## BLOK 2 · ÖLÇÜLEBİLİRLİK
- ✅'ler v2_4'ten aynen (2.1·2.1a·2.1b·2.3·2.3b·2E.1+ROUTE-OPEN-2).
- **AÇIK — Blok 3 önkoşulu (değişmedi):** 2.2a backend-register · 2.2 mount ·
  2.3a harness · 2.4 reset · 2.5 A2A · 2.6 smoke · 2.7 frame-shadow ·
  2.8 discovery-extend-2 · 2.9 corpus-line-fill.
- Kusur kuyruğu → bucket v27 (işleyen sıra orada); CANARY-POWER-1 yöntem bağlaması
  ve W-026→015 katlaması v2_4'ten aynen.

## BLOK 2B · MÜŞTERİ GİRDİSİ
- 2B.1 RAG şeridi: açık, dış bekleme, bloke etmez.
- **2B.2 `WEB-VALVE-1` — SATIR GÖRÜNÜRLÜĞÜ GERİ (S89):** v2_2–v2_4 metinleri bu
  satırı basmıyordu; zincirde hiç silinmedi ve burada yeniden görünür yazılır.
  Ölçütü R7/F2 (DeepScholar-Bench); bekleyişi şerit kapasitesi.

## BLOK 2D · MİMARİ KATMAN — v2_4'ten aynen (2D.1 · 2D.2 · 2D.3 GRAPH-KB-1
TEK-ORGAN sözleşmesi üstüne · 2D.4a/b + adlı önkoşul `LLM-SCAN-BASELINE-1` · 2D.5 OPA).

## BLOK 2E — 2E.1 ✅ · 2E.2 · 2E.3 (BUG-017 emeklilik evi) · 2E.4.

## ★ BLOK 2F · BİLİŞSEL KATMAN

| # | İş | Ölçüt | Durum |
|---|---|---|---|
| 2F.0a–0d | RESULT-BUDGET · TOOL-EARNED-TRUST · SUCCESS-ONLY-RECALL · CHART-CANDIDATE | — | ✅ (v2_4 kanıtlarıyla) |
| 2F.1 | PROCEDURE-RECALL-1 | ToolComp · Memp | ✅ S87 (`af53fbc` + tanık çifti) |
| 2F.2 | SEMANTIC-MEMORY-1 | LongMemEval · Gaia2 | ✅ S87 merge `ac764d6`; S88 tanığı dossier geri-teklifi `e329437b`→`b16754a1` |
| 2F.3 | STEP-EFFICIENCY-1 | §10 iç | ✅ S87 merge `ac764d6`; huni+efficiency alanları üretimde (af5dbe5f okuması bu organla yapıldı) |
| **2F.4** | **PLANNER-0** | τ²-bench · Gaia2 | **TASARIM NOTU MINT'LENDİ (S89): `cwf-design-PLANNER-0-v1` — faz promptu `PHASE-PLANNER-0-v1` AG-relay'de.** Kilitli şekil: deterministik frame→plan bağlama (yeni LLM YOK) · governed `system.plan_template` (tenant-zero kod tabanı + veri satırları; ABSENCE-ONLY self-seed) · plan bloğu kullanıcı-mesajı 4. blok (önbellek-önek yasası) · re-plan kapısı = TEK gateway sitesinde additive `prepareStep` (yokken bayt-özdeş; STEP-0 kurulu-tip doğrulaması, S82 emsali) · rutin=plan tohumu (bellek tüketilir) · eşanlam yelpazesi QUERY_METRIC TABANINA genelleşir (yapı kod, sözlük veri — machine-v5 sınırı) · **A1 HİNT-EMEKLİLİK:** `energy-synonym-search` (canlı v4, bu oturum verbatim okundu) merge+deploy sonrası ARŞİVLENİR ve aynı sorgu sınıfı hint'siz başarılır (S63-1 kanıt okuması Architect'te) · A2 yerinden-etme replay'i (`af5dbe5f` bayt-teşhisi: frame kusursuz, 12 çağrı/2 araç/10 tekrar, 217k önbellek geçmiş-ağırlığı, huni beş yeşil — kapı yoktu) · tarih-hijyeni yarısı §5 (aşağıdaki yeni kalem) |

**YENİ ADLI KALEM (S89, S82-6 ile doğdu): `HISTORY-DIET-1`** — istemci-yanı geçmiş
birleştirme: kalıcı asistan içeriği düzyazı+makro/handle taşır, 865-satır render
yükleri geçmişe binmez (BUG-032 üçüncü-kapı ailesinin başarılı-tur kardeşi). Bu
fazda YAPILMAZ; fazın yaptığı dürüst taban: governed
`turn.historyCharBudgetPerMessage` orta-kırpma + açık işaret (tasarım notu §5).
Yeri: 2F kapanışı sonrası kuyruk, kapsam notu tasarımda.

## BLOK 3 — başlamadı; açılış yasası `EVAL-SPLIT-LAW`. BLOK 4·5·6 — değişmedi.

## PARK · İZLEME — v2_4'ten aynen + **S89:** STAGE-CARD-COVERAGE-1 tetiği (2F.4
kapanışı) YAKLAŞIYOR — faz merge'ünde otomatik uyanır, HONESTBENCH-RUN-1'den önce
tek geçiş. W-028 sivriltildi (tasarım notu §8: iki adlı dal — reach-class mı,
snapshot yarışı mı; ilk okuma TAG'dir, kod değil).

---

## v2_4 → v2_5 DEĞİŞİM KAYDI
1. **2F.4 tasarım notu mint'lendi** (`cwf-design-PLANNER-0-v1`) — af5dbe5f bayt-teşhisi
   ve dört zorunlu girdi (a)–(d) + S88 F-S88-4 baş tanığı işlenmiş; faz promptu kesildi.
2. **`HISTORY-DIET-1` adıyla doğdu** (S82-6); fazdaki taban yarısı tasarım §5.
3. **2B.2 WEB-VALVE-1 satırı yeniden görünür** — zincir kaybı yoktu, basım eksikti.
4. **Zemin S89'a taşındı**; suite sayısı 5986 KESİN (CI run 31289369079); F-S88-1
   sahip tanıklığıyla ✅.
5. Hiçbir satır silinmedi; hiçbir sıra sahip hükmü olmadan değişmedi.

<!-- END · cwf-master-rollout-plan-v2_5 · 2026-08-09 · S89 -->
