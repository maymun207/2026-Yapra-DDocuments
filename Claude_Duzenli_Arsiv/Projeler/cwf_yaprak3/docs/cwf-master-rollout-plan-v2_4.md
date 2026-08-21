# CWF — Master Rollout Planı · v2_4

<!-- cwf-master-rollout-plan-v2_4 · 2026-08-08 · S87 (gün içi ikinci amend).
     v2_3'ü amend eder. Sebep: sahip talimatı — "yakaladığın iki noktayı HEMEN
     dokümante et; sohbette bırakma." İki yeni bağlama plana işlendi VE S87'nin
     v91-mint'ine taşınacak her kalemi §S87-CARRY bloğuna adıyla gömüldü.
     Kalem SİLİNMEZ; ✅+kanıt; yeni iş adıyla. -->

> **⚖ S82-6 (SAHİP YASASI):** Olması gereken her şey en başta, en ince ayrıntısına kadar.
> "Şimdilik gerek yok / tetiği bekle / yetmezse aç" sınıfı erteleme geçersiz. SOTA-1'in
> kardeşi: SOTA-1 ölçüt ertelemesini, S82-6 mimari ertelemeyi yasaklar.

**Kabul ölçütü:** `cwf-sota-definition-v1_5` (BINDING). Bütçe rakamı burada YAZMAZ (R4).

---

## ZEMİN (v2_4, 2026-08-08 öğleden sonra — bu oturumun canlı okumalarından)
master `e650f0f4274240e5f88d01c30ca7131cac94d492` (2F.1 merge `af53fbc` + MERGE raporu
`e650f0f`) · docVersion **rev 212** · suite **493/5772** (CI run 31244645196, 5/5 yeşil)
· 67 migration · 13 ADR · üretim `dpl_4CCJtcGb` READY @ `af53fbc` · akışta iki dal:
`phase/semantic-memory-1` (rapor DÜŞTÜ, RULE-25 bekliyor) · `phase/step-efficiency-1`
(rapor DÜŞTÜ — CI beyanı örnek dürüstlükte: "4 green + 1 SKIPPED, not 5/5").

## BLOK 1 · ÖLÇÜM PANOSU — ✅ KAPANDI (S80)

## BLOK 2 · ÖLÇÜLEBİLİRLİK
- 2.1·2.1a·2.1b·2.3 ✅ · 2E.1 ✅ (`a6252b20`) + ROUTE-OPEN-2 ✅ (`338e5380`)
- 2.3b `FAULT-SWITCH-0` ✅ S86 (`fd9f49b`); canlı tanık FENCE-WITNESS-1 (`04c636b9…`).
- **AÇIK — Blok 3 önkoşulu:** 2.2a backend-register · 2.2 mount · 2.3a harness ·
  2.4 reset · 2.5 A2A · 2.6 smoke · 2.7 frame-shadow · 2.8 discovery-extend-2 ·
  2.9 corpus-line-fill

### Kusur kuyruğu → bucket v25 (işleyen sıra orada) + S87 yöntem bağlamaları
- **(YENİ, S87) `CANARY-POWER-1` yöntem bağlaması (danışman §2-c5, sahip-ratife K1
  ailesi):** güçlendirme N'i SÜPÜRMEYLE DEĞİL, küçük-pilot pass@1 dağılımından
  ekstrapolasyonla seçilir (c = exp(a·k^b); 2–4 mertebe daha ucuz), governed param
  olarak yayınlanır. S87 verisi seriye eklendi: 5 skorlu rep, hâlâ `underpowered`
  (merge raporu `e650f0f`). #6 faz promptu bu yöntemi ZORUNLU girdi olarak taşır.
- **(YENİ, S87) W-026 → BUG-015 teslimatına KATLANDI** (#6): tenant-zero'nun
  çalışma-ağacı bağımlılığı = 015'in S81 örnek-7'sinin aynı şekli; ayrı izleme
  kalemi olarak süründürülmez.

## BLOK 2B · MÜŞTERİ GİRDİSİ — 2B.1 RAG şeridi açık, dış bekleme, bloke etmez.

## BLOK 2D · MİMARİ KATMAN
- 2D.1 PB-FULL-1 · 2D.2 LINE-RESOLUTION-DIAGNOSIS-1 · 2D.4a/b PB-B·RETRIEVAL-INFRA-1
  (ölçüm-tetikli) — **(K4) adlı önkoşul: `LLM-SCAN-BASELINE-1`** (F1/BrowseComp-Plus
  altında governed LLM-tarama taban çizgisi; korpus-boyutu ekseni içinde; altyapı
  yerini kanıtla kazanır). 2D.5 OPA-POLICY-1 (EAIP-TENANT önkoşulu). 2D.3 GRAPH-KB-1 —
  2F.2'nin TEK-ORGAN sözleşmesi üstüne (sözleşme PHASE-SEMANTIC-MEMORY-1 §WHY'da
  yazılı: tek kimlik uzayı/tek resolver · iki tablo bir şema · M-MEM2).

## BLOK 2E · KENDİNİ ANLATAN BACKEND — 2E.1 ✅ · 2E.2 · 2E.3 (BUG-017'nin adlı
emeklilik evi) · 2E.4.

## ★ BLOK 2F · BİLİŞSEL KATMAN

| # | İş | Ölçüt | Durum |
|---|---|---|---|
| 2F.0a | RESULT-BUDGET-1 | bağlam | ✅ `cba2af2c` |
| 2F.0b | TOOL-EARNED-TRUST-1 | BFCL v4 · MCP-Bench | ✅ `a24271d4` — **onarım döngüsü S87'de canlı tanıklandı** (`ToolRepair identifier_alias`, trace `17509406`; danışman §2-c2 feedback-richness yasasının saha örneği) |
| 2F.0c | SUCCESS-ONLY-RECALL-1 | LongMemEval | ✅ `5277103e` · **BUG-032 nöbeti S87'de İLK doğal tetiğini gördü ve mühürledi:** ilk gerçek `failed` episode doğdu (trace `1591000c`) ve bir sonraki turda SUNULMADI (`[Memory] conv=0`, trace `17509406`) |
| 2F.0d | CHART-CANDIDATE-1 | Gaia2 | ✅ `ce2e244`+FIX-1 |
| 2F.1 | PROCEDURE-RECALL-1 | ToolComp · Memp | **✅ S87** merge `af53fbc` (CI 31244645196, 493/5772) + post-deploy tanık çifti `e4f20cdb`/`d5835e62` (`procedure=1` → `routine=1`); F-S86-2'nin TAŞIMA yarısı kapandı |
| 2F.2 | SEMANTIC-MEMORY-1 | LongMemEval · Gaia2 | **FAZ GEMİDE:** AG-1 dalı + STOP-FOR-REVIEW raporu origin'de (`1e92a88`); RULE-25 incelemesi sırada. Çip kopyası tek-satırı (routineOffered taşınır-çizilmez, R1) bu faza adıyla bağlı |
| 2F.3 | STEP-EFFICIENCY-1 | §10 iç ölçüt | **FAZ GEMİDE:** AG-2 dalı + rapor origin'de (`ec3890a`; CI beyanı "4 green + 1 SKIPPED, not 5/5" — S86-2 disiplini). K5-i huni tasarım girdisi promptta. **(YENİ, S87) referans seti GO'da üçlüyle genişler:** Granit üçlüsü `0953193d` (yanlış-yokluk) · `1591000c` (dürüst fren, 305.558/300.000) · `17509406` (çizim, 111.644) — sistemin bir günde üç durumu |
| 2F.4 | PLANNER-0 | τ²-bench · Gaia2 | #7 — **(YENİ, S87) tasarım girdileri adıyla, faz promptuna ZORUNLU:** (a) ayırt-edici-sonda deseni (danışman §2-c4: adaylar ayrışınca hedefli deterministik sonda; ayırıcı yoksa clarification kapısı — CHART-CANDIDATE'in insan-ayırıcılı hali literatür-teyitli); (b) **bütçeye-sığdırma**: arama planı tur-token bütçesini bilir (S87 dersi: 300K freni, chart 80'in 205 satırı); (c) **eşanlamlı yelpazesi planlayıcı davranışı olur** (bugünkü hint'in yapısal hali); (d) **HİNT-EMEKLİLİK KANITI — adlı kabul öğesi:** merge sonrası `superset.routing_hint/energy-synonym-search` SİLİNİR ve aynı sorgu sınıfının hint'siz başarısı tanıklanır (sahibe verilen söz, S87). F-S86-2'nin PAPAĞANLIK yarısının + F-S87-1'in yapısal emeklisi |

## BLOK 3 · İLK ÖLÇÜM TURU — başlamadı. **`EVAL-SPLIT-LAW` açılışta bağlayıcı** (K5-iii).

## BLOK 4·5·6 — başlamadı. honestbench'e **Fast_p** tasarım girdisi (K5-ii).

## PARK · İZLEME — v2_3'ten aynen (ROUTER-DISTILL-1 yöntem notu + DeepSeek-R1 teyidi ·
multi-agent verifier-side + Archon sözlüğü + Fuser kısıtı · BUG-005 proje kapanışı ·
TENANT-CONSOLE ailesi adlı tetikli).

---

## §S87-CARRY · v91/bucket-v26 MINT LİSTESİ (hiçbir kalem sohbette yaşamaz — hepsi burada)
1. **K1 register satırları:** (a) feedback-richness dikişte gömülü — S87 canlı teyit
   `ToolRepair` · (b) "örneklem-içi frekans doğruluk sinyali değildir" ders satırı ·
   (c) distinguishing-probe literatür teyidi CHART-CANDIDATE-1 kaydına şerh.
2. **K2:** S86-R2 ders satırına long-tail teoremi atfı (pass@k = 1−(1−pass@1)^k;
   pass@1=0 her k'da dokunulmaz).
3. **S87 ders satırı (envanterden):** "Envanter denetimi kapanış CÜMLESİNİ okur;
   isim-varlığı grep'i denetim değildir." (BUG-016 defterine S87 örneği işlendi.)
4. **`cwf-bug-inventory-S87-v6`** referans artefaktı olarak girer: 36 kalem = 28 ✅ ·
   5 açık (005·014·015·016·017) · 3 ARMED → **BUG-032 nöbeti S87'de MÜHÜRLENDİ**
   (yukarıdaki 2F.0c satırı kanıtıyla; bucket'ta ARMED→✅ taşınır) · gri SIFIR.
5. **F-S87-1 kusur kaydı:** üç dar aramanın boşluğu "veri yok" dünya-iddiasına
   genişletildi (trace `0953193d`); veri VARDI (chart 80/85, S87'de bulundu).
   İki yumuşak fren sahip eliyle yayında: `superset.routing_hint/
   energy-synonym-search` (10:18Z) + `armes.persona_fragment/armes.analyst` v2
   (10:27Z). Yapısal emekli: 2F.4 (yukarıdaki d-öğesi dahil).
6. **STAGE-CARD-COVERAGE-1** (sahip-onaylı S87): PARK, tetik = 2F.4 kapanışı,
   HONESTBENCH-RUN-1'den önce TEK geçiş. Bugünkü envanter: 6 dolu kova {01,02,07,09,
   10,12} · 6 gerçek boşluk {03,05,06,08,11,14} · 04 etiketsiz-dürüst-yokluk ·
   digest-09 cap bulgusu (rutin bloğu aynada görünmez → 05 kartına özet alanı).
   **Ara disiplin (bugünden):** her faz promptu, doğan her yeni span'ın kart kovasını
   raporda beyan ettirir ("yeni span: yok" dahil) — iki S87 promptunda uygulandı.
7. **Kanarya serisi verisi:** S87 koşusu 5 skorlu rep, `underpowered` (POWER-1
   defterine; yeniden teşhis değil, seri kanıtı).
8. **S87 oturum olayları (KB'ye):** 2F.1 tam döngü (prompt→GO→merge→tanık) tek günde ·
   çift-şerit ikinci kez · sahibin governed-UI ilk yayını (iki kural) · Granit üçlüsü
   hikâyesi · GO-PROCEDURE-RECALL-1'in docs-uç/CI bekletme maliyeti (Architect defteri:
   FENCE-WITNESS emsal kısayolu GO'ya yazılmalıydı).

<!-- END · cwf-master-rollout-plan-v2_4 -->
