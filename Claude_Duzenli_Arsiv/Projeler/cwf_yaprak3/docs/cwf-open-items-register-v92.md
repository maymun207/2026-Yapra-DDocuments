# cwf-open-items-register · v92 — S88 kapanış mint'i
**2026-08-09 · S88 close · master `19e84206eb84a8fc3e4b25a2e0a5afb6d8179cff`**
<!-- v91'i geçersiz kılar. Kaynak: cwf-work-board-S74-v1 (BAĞLAYICI). Kod > özet. -->

## §0 · Kapanış zemini (hesaplanmış)
master `19e8420` · docVersion **rev 217** · 68 migration · 13 ADR · GATEWAY_RULES 18 ·
suite **500 dosya / ~5986 test** (CI-hakemli; birleşik ağacın ilk master koşusu kesinleştirir) ·
üretim `dpl_2jepUGrQNFXhA8Pq9zZxKuwvjrck` READY · `armes.tool_category/machine` **v5**
(7 enerji kelimesi yayında, sahip elle — SON elle kural, sahip beyanı).
**S88 merge'leri (4):** `8292168` PROCEDURE-YIELD-1 · `3d6b056` READY-EDIT-TRUTH-1 ·
`fc8ab78` LANDING-YIELD-TRUTH-1 · `b7f26ce` CHART-SERIES-IDENTITY-1.

## §1 · S88'de KAPANANLAR
- **F-S87-4 / PROCEDURE-YIELD-1** ✅ merge + S63-1 tanığı dolaylı ödendi (aşağıda YIELD-2 tanığıyla).
- **BUG-037 / READY-EDIT-TRUTH-1** ✅ merge; ilk gerçek saha kullanımı machine-v5 yayınında temiz.
- **F-S88-2 tablo-failed / LANDING-YIELD-TRUTH-1 §G1** ✅ merge + üretim tanığı `87181610`
  (tablo-cevap: `unproven procedure=1 domainYield=1`, LandingGate satırı YOK).
- **PROCEDURE-YIELD-2 / LANDING-YIELD-TRUTH-1 §G2** ✅ merge + üretim tanığı `4e21e8df`
  (helyum: `procedure=0 semantic=0 domainYield=0`). Taban 2→3 ÖLÇÜMLE (7 v2 satırının 1'i
  W2-şekli; 6 meşru satır bedel olarak emekli — kanıt icat edilmedi).
- **F-S88-1 seri patlaması / CHART-SERIES-IDENTITY-1** ✅ merge + sahip-göz tanığı: 8-günlük
  grafik 5 seri / 5 renk + 865 satır saatlik tablo. Kök: (group, field) kimliği; alan listesi KÜME.
- **F-S87-5 önleyicisi** ✅ canlı (ortak yüklem); mevcut çöp dossier satırının akıbeti → §3.
- **Sahip devri (register v91 §3)** ✅ TAMAMI: tanık-2 (SM1 dossier: `e329437b`→`b16754a1`,
  dossier=1 geri-teklif) · tanık-yield · 7 enerji kelimesi (machine v5, eval-gate 3/3) ·
  Sırlama canlı testi (dürüst failed, karantina doğru işledi).
- **BUG-032** ✅ (S87 mührü; bucket v27'de ARMED→✅ taşındı).
- **F-S88-3** ❌ GERİ ÇEKİLDİ — aynı oturumda: arama filtresi ("To") kart listesini anahtar-altdizi
  ile süzüyordu (`GovernanceTab.tsx:293`); kusur yok. İz için kayıt: doğdu ve öldü.

## §2 · S88'de DOĞAN adlı kalemler
- **F-S88-4 · soru-yerinden-etme (question displacement)** — trace `af5dbe5f`: Frame `oee`yi
  DOĞRU çıkardı, model önceki turun (doğalgaz) peşine düştü, 311k girdi tokenı, BurstGuard
  `turn_tokens` ilk doğal durdurma (fence tanıklı ✓), `procedure=0` (kapılar tuttu ✓).
  **HÜKÜM: 2F.4 PLANNER-0'ın motive edici baş tanığı** — frame→plan bağlayıcılığı tasarım
  girdisi. Taze oturumda aynı soru temiz cevaplandı (ağır-geçmiş hipotezi desteklendi).
- **W-028 · domainYield/BurstGuard anlık-görüntü yarışı** — `af5dbe5f`: son `execute_sql`
  1 satır döndürdüğü halde `domainYield=0`; kesme ile distill snapshot sıralaması doğrulanacak
  (suçlama değil soru işareti; AG-1 şeridine küçük doğrulama işi).
- **W-029 · MAX_CHART_SERIES grup sayıyor, seri değil** (`MessageChartContent.tsx:452`).
- **W-030 · modelin bölge-başlık niyeti sessizce çöpe gidiyor** — prompt katmanı: series ekseni
  alan eksenidir; modele bunu söyleyen yok (CHART-SERIES raporu kalıntı 2).
- **W-031 · deriveTableData kopya-kolon sınıfı denetlenmedi**.
- **UI-POLISH-NOTE** (tetik: Stages kartları admin-UI işi; ayrı faz AÇILMAZ):
  (a) filtre aktifken kart sayaçları "filtreli" demiyor (F-S88-3 yanlış alarmının kaynağı);
  (b) `user` rolünde sohbet-yüzeysiz backend toggle'ları (system/mkb) etkisiz — gizle veya rozetle.
- **Gemini+PII deterministik error: 3. veri noktası** (`54984697`, getEmployees→finishReason=error).
- **Kanarya POWER-1 defteri: 6 koşu** — underpowered serisi reps 4→3→2→1→1→3; enstrüman tezi
  güçlü; çözüm #6 ALETLER (CANARY-POWER-1).

## §3 · Açık kalanlar (değişmedi + küçük eklemeler)
BUG-005 (proje kapanışı) · BUG-014 (önkoşulsuz) · BUG-015+016 (#6 ana teslimatlar) ·
BUG-017 (yapısal 2E.3, ölçüm #6) · ARMED: BUG-010-down, BUG-029 · GRİ: SIFIR ·
F-S86-2 papağanlık → 2F.4 · F-S87-2 → BUG-017 ailesi · W-018 (suffix retry) ·
mevcut çöp dossier satırı ("hat bazında"): TTL mi elle mi — v93'te karar · Card-05 üç-yasa
metni → STAGE-CARD-COVERAGE-1 (AG-1 raporunda hazır drop-in) · fabricated-macro çifti →
grounding katmanı · reach-class haritası paylaşılan güven noktası (beyan edildi).

## §4 · Ufuk (adıyla; ritim hükmü: rollout ÖNCE)
2F.4 PLANNER-0 (girdiler: F-S88-4 baş tanık · hint-emeklilik kanıtı · eşanlam yelpazesi ·
F-S86-2) → #6 ALETLER (BUG-015/016/017 + CANARY-POWER-1) → TOOL-BEHAVIOR-CENSUS-1 (tasarım
notu v1 BAĞLAYICI) + FRAME-ON-ALL-PATHS-1 → Blok 3 açılış EVAL-SPLIT-LAW · LLM-SCAN-BASELINE-1
(vektör önkoşulu) · ROUTER-DISTILL-1 (ölçüm-tetikli) · STAGE-CARD-COVERAGE-1 (post-2F.4) ·
**Vizyon rezervleri (cwf-vision-note-MODULARITY-AND-MULTI-AGENT-S88-v1, NON-BINDING):**
STAGE-CONTRACT-TYPES · LANE-TERRITORY-1 · SEAL-SHARD-1 · sub-agent şeritleri ·
**Eylem-uzuv hattı (S88 n8n sohbeti):** sıra = census → ACTION-AUTHORITY-ADR (yazma-eylem
anayasası; ADR-011'in kontrollü gevşetilmesi) → BACKEND-N8N-1 (tek pilot workflow, unverified
başlar) → LangGraph-sınıfı akıl-alt-ajanları çok-ajan yeniden-girişinde ·
RAG şeridi (sahip sinyali) · TENANT ailesi (müşteri #2 tetiği) · Doktrin v1_4? (D-6 GO-relay
4-dokunuş yapısal boşluğu hâlâ adlı).

<!-- END · cwf-open-items-register-v92 -->
