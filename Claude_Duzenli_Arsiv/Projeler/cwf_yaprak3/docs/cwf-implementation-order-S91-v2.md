# CWF — TAM İMPLEMENTASYON SIRASI · S91 · v2

<!-- cwf-implementation-order-S91-v2 · 2026-08-09 · S91 açılışı.
     S90-era sürümü (rollout v2_6 + register v93 tabanlı) supersede eder.

     ⚠ BU BELGE TÜRETİLMİŞ BİR GÖRÜNÜMDÜR, İKİNCİ BİR GERÇEK KAYNAK DEĞİL.
     Bağlayıcı yürüyüş sırası `cwf-master-rollout-plan-v2_7` §SIRA'dır;
     açık kalemlerin gerçeği `cwf-open-items-register-v94`tür. Bu tablo o
     ikisinin İZLEK-etiketli, insan-okur açılımıdır. Çelişki halinde rollout
     ve register kazanır. -->

**ZEMİN (taze klon, hesaplandı — S91 açılışı):** `origin/master`
`c1e3f5f99ac7a36fb8c6ccf4ff7c2cc99d8dd95b` · docVersion **rev 222** ·
**517** test dosyası / **6308** test, 0 skip · **68** migration · **13** ADR ·
GATEWAY_RULES **18** yayınlı · üretim `dpl_7Pyxpa7c…` READY @ `02a8d33`
(master ucu +2 salt-doküman) · `phase/*` **27** (kapanış süpürmesi TAMAM).

**İZLEK anahtarı:** ① Anlama katmanı · ② Orchestrator · ③ Graph-KB ·
④ PathB (BM25+Regex) · ⑤ CS329A (K# ile)

---

## ★ ÖNCE: BU SÜRÜMDE NE DEĞİŞTİ (S90 sürümüne göre)

| # | Değişim | Sebep |
|---|---|---|
| 1 | **GATE-SILENCE-VISIBILITY-1 ✅ KAPANDI** (`5d92d81`) | 10/10 mutasyon; üretim tanığı 18:44 |
| 2 | **2E.2 ROUTE-DERIVE-1 ✅ KAPANDI** (`02a8d33`) | 15/15 mutasyon; cron tanığı 18:00+18:31, idempotence canlı |
| 3 | **`vocab_source` kanıtı ✅ KAPANDI** (S91, Architect) | epizod `ee142f84` `vocabSource='governed'`; pozitif kontrol: deploy öncesi 24 turun hepsi `null` |
| 4 | **METRIC-REGISTRY-DATA-1 doğdu ve UÇUŞTA** (AG-1) | Sahip hükmü S90 H1 |
| 5 | **STAGE-CARD-COVERAGE-1 UÇUŞTA** (AG-2) | "boşluk"tan çıktı, faz promptu kesildi |
| 6 | **METRIC-VOCAB-DISCOVERY-1 PARK'tan YÜRÜYÜŞE geçti** | S90 H2 ile **RATİFE EDİLDİ** — eski satırdaki *"ratife bekler, kuyruğa girmez"* artık YANLIŞ |
| 7 | **MEMORY-HYGIENE-Q hükme bağlandı** (S90 H3) | Elle silme REDDEDİLDİ (PLATINUM), çıplak TTL reddedildi; düşüş ADR-010'a bağlandı. "Onay bekliyor" değil artık |
| 8 | **TOOL-ANNOTATION-KIND-MINT-1 (W-034) doğdu** | Üretim tanıklı: cron her tick'te `failed=4` |
| 9 | **ROUTING-FLOOR-BACKEND-1 doğdu** (S91) | Üretilmiş rota tabanının backend boyutu yok; 12 seramik kategorisi platform tabanında |
| 10 | **LANGFUSE-ATTR-READ-1 doğdu** (S91) | İki okunmamış span attr'ı tek kaleme katlandı |
| 11 | **BENCH-KULLANIM-DOC-1 doğdu** (S90 H5) | Tezgâh kullanım dokümanı borcu |
| 12 | **evalGate armes kalıntısı adlı kalem oldu** | ROUTE-DERIVE GO'sunda adıyla kabul edildi; evi 2E.3 |
| 13 | **Kanarya borcu 8× → 9×** | S90'da iki koşu daha, sonuncusu `scoredReps 5` |
| 14 | **Kapanış süpürmesi TAMAM** | 29 → 27 dal |

---

## A · BAĞLAYICI YÜRÜYÜŞ (uygulama sırası, baştan sona)

| # | Kalem | Blok/Şerit | Durum | İZLEK | Not |
|---|---|---|---|---|---|
| — | GATE-JURISDICTION-AUDIT-1 | Architect | ✅ S90 | ② | 9 organ denetlendi; Madde-3 ihlali SIFIR |
| — | GATE-SILENCE-VISIBILITY-1 | AG-2 | ✅ S90 `5d92d81` | ② | Kapı susuşu üretimde görünür |
| — | 2E.2 ROUTE-DERIVE-1 | AG-1 | ✅ S90 `02a8d33` | — | Ray aynadan doğar; armes kilidi öldü |
| — | `vocab_source` kanıtı (S63-1 yarısı) | Architect | ✅ S91 | ② | Epizod satırından okundu; Langfuse ingest artığı → #16 |
| — | Kapanış süpürmesi (2 dal) | AG-1 | ✅ S91 | — | `phase/*` 27 |
| **1** | **METRIC-REGISTRY-DATA-1** | **AG-1** | **🔄 UÇUŞTA** | ② ⑤ | Tapu kelimeleri koddan governed satıra; platform tabanı BOŞ. Taşıyıcı: tasarım notu **v1_1**. STEP 0: `ff-only` + `rescue/` sil + rapor DISCHARGED işareti |
| **2** | **STAGE-CARD-COVERAGE-1** | **AG-2** | **🔄 UÇUŞTA** | — | Kart 04 beş yerde fiilen yanlış; kart 05 yasası bayat; kapsam aleti `healthCoverage` emsaliyle |
| 3 | **TOOL-ANNOTATION-KIND-MINT-1** (W-034) | AG-1 fazının **G7'si** | 🔄 ayrı commit | — | Üretim tanıklı `failed=4`. Ayrı commit = tek başına reddedilebilir |
| 4 | **ROUTING-FLOOR-BACKEND-1** | 2E (ray ailesi) | ⏳ **YENİ** | — | `toolCategories.ts:164–490` üretilmiş blok: 12 seramik kategorisi + `'oee'`/`'scrap'`/`'ıskarta'` literalleri, platform-genelinde. #1'in adlandırılmış dışlaması |
| 5 | 2.7 FRAME-SHADOW-EVIDENCE-1 | AG-2 | ⏳ | ① | Frame-kanıtı gölge ölçümü; ROUTE-ASK-1 kapısını besler |
| 6 | #6a · BUG-015 harness-dürüstlük (+W-026×5) | dalga | ⏳ | — | Enstrüman kapısı |
| 7 | #6b · BUG-016 relay-denetçisi | dalga | ⏳ | — | Süreç kapısı. **Sicil büyüdü:** S90'da "mühür beklentisi" hatası |
| 8 | #6c · BUG-017 ölçüm (LENS altında) | dalga | ⏳ | — | 2E.3'ün emeklilik girdisi |
| 9 | #6d · **CANARY-POWER-1** | dalga | ⏳ **aciliyet ↑** | ⑤ (K5/§2-c5) | Borç **9× ardışık `verdict:null`**; seri 4·2·3·2·5 like-for-like |
| 10 | **TOOL-BEHAVIOR-CENSUS-1** | — | ⏳ | ⑤ (K2 ruhu) | "Compute = discovery"; sıfır-elle-kural hedefi |
| 11 | FRAME-ON-ALL-PATHS-1 | census dalgası | ⏳ | ① | v92'de sessiz düşmüştü, S90'da restore edildi |
| 12 | **METRIC-VOCAB-DISCOVERY-1** | — | ⏳ **ratife (S90 H2)** | ② ⑤ | Sözlük self-learning ile governed kapıdan büyür, klavyeyle asla. **Önkoşulu #1** |
| 13 | 2E.3 PACK-FROM-PROTOCOL-1 (+W-035 evi) | 2E | ⏳ | — | BUG-017'nin ve **evalGate armes kalıntısının** adlı emeklilik evi |
| 14 | 2E.4 ROUTE-ASK-1 | 2E | 🔒 ölçüm-kapılı | ① | Kapıyı #5'in ölçümü açar (hüküm korunuyor) |
| 15 | 2.2a BACKEND-REGISTER-AFFORDANCE-1 | Blok 2 | ⏳ | — | PLATINUM boşluğu (insert yolu yok) |
| 16 | 2.2 BENCH-BACKEND-MOUNT-1 | Blok 2 | ⏳ | — | Zero-code mount provası |
| 17 | 2.3a HONESTBENCH-HARNESS-0 | Blok 2 | ⏳ | ⑤ (K5 ailesi) | Kadranlı sahte sunucu |
| 18 | 2.4 BENCH-RESET-1 | Blok 2 | ⏳ | — | |
| 19 | 2.5 BENCH-A2A-1 | Blok 2 | ⏳ | ⑤ (K6 komşusu) | Agent-to-agent protokol provası |
| 20 | 2.6 BENCH-SMOKE-1 | Blok 2 | ⏳ | — | Maliyet aleti |
| 21 | 2.8 DISCOVERY-EXTEND-2 | Blok 2 | ⏳ | ③ | Keşfedilen topoloji = graf katmanının hammaddesi (ADR-009) |
| 22 | 2.9 CORPUS-LINE-FILL-1 | Blok 2 | ⏳ | — | LINE eval korpusu |
| 23 | 2D.1 PB-FULL-1 / PB-A | 2D açılışı | ⏳ şartsız | ④ | PathB çekirdeği — Blok 2D bu satırla AÇILIR |
| 24 | 2D.2 LINE-RESOLUTION-DIAGNOSIS-1 | 2D | ⏳ | ③ | 785 çözümsüz LINE — graf öncesi kimlik teşhisi |
| 25 | 2D.3 GRAPH-KB-1 | 2D | ⏳ sahip-çekili | ③ | 4. bellek katmanı — SM1 TEK-ORGAN sözleşmesi üstüne |
| 26 | LLM-SCAN-BASELINE-1 | 2D.4 önkoşulu | ⏳ | ④ + ⑤ (K4) | Leksik taban çizgisi: vektör bunu kanıtla geçmek zorunda |
| 27 | 2D.4a/b vektör altyapısı (Qdrant·bge-m3) | 2D | 🔒 #26'ya bağlı | ④ (sınır) | Yerini kanıtla kazanır |
| 28 | 2D.5 OPA-POLICY-1 | 2D | ⏳ | — | EAIP-TENANT adlı önkoşulu |
| 29 | Blok 3 açılışı: EVAL-SPLIT-LAW + ilk ölçüm turu | Blok 3 | 🔒 | ⑤ (K5-iii) | SOTA §10'un tüm ÖLÇÜLMEDİ'leri okunur |
| 30 | honestbench (Fast_p) | Blok 4 | 🔒 | ⑤ (K5-ii) | |
| 31 | A23 ANLAMA KATMANI | Blok 4 | 🔒 | ① + ② (sınır) | ②-sınırı: A23 ∩ PLANNER-0 çizili — ikinci planlayıcı asla |
| 32 | v1.1 kuyruğu: RULE26-HARDEN-1 · temizlik · M-C · E-1 · golden-infra | Blok 5–6 | 🔒 | — | |

---

## B · PARALEL ŞERİT (bloke etmez)

| Kalem | Durum | İZLEK | Not |
|---|---|---|---|
| 2B.1 RAG şeridi | dış bekleme | — | Senin sinyalinle |
| 2B.2 WEB-VALVE-1 | şerit kapasitesi | — | R7/F2 DeepScholar-Bench |

---

## C · NÖBET / KUSUR (faz açtırmaz)

| Kalem | Ev | İZLEK |
|---|---|---|
| **LANGFUSE-ATTR-READ-1** ⚠ YENİ — iki okunmamış span attr'ı: `cwf.grounding.vocab_source` (Langfuse ingest tarafı) + `cwf.burst_guard.state` | tek okumada birlikte emekler | ② |
| **no-jurisdiction üretim ORANI** — artık ÖLÇÜLEBİLİR (G2/G3/burstGuard alanları canlı) | telemetri birikince tek okuma | ② |
| W-032 kapı hassasiyeti | tezgâh incelemesi | ② |
| W-030 · W-033 · W-018 · UI-POLISH-NOTE · Gemini+PII 3. veri noktası | prompt şeridi · UI · izleme | — |
| BUG-005 (proje kapanışı) · BUG-014 (önkoşulsuz) · ARMED 010-down · ARMED 029 | kapanış · tetikli · nöbet | — |
| W-026 sicili ×5 | #6a ile | — |
| **BENCH-KULLANIM-DOC-1** — tezgâh kullanım dokümanı (A→G deney formatı) | User Docs sekmesi | — |

---

## D · TETİKLİ / PARK (adlı tetik, sırası geldiğinde)

| Kalem | Tetik | İZLEK |
|---|---|---|
| ACTION-AUTHORITY-ADR → BACKEND-N8N-1 (eylem uzvu) | CENSUS (#10) kapanışı | ② |
| LangGraph ikinci-beyin sınıfı | eylem-uzvu hattı sonrası | ② |
| HISTORY-DIET-1 | 2F-sonrası kuyruk | ② (planner tasarımı §5'in öteki yarısı) |
| **MEMORY-HYGIENE-Q** (=BEYAN-PERSIST-Q + çöp-dossier, MERGED-INTO) | **HÜKÜM VERİLDİ S90 H3** — elle silme reddedildi, çıplak TTL reddedildi; düşüş ADR-010 gözlem disiplinine bağlı. Tasarım sorusu olarak bellek ailesinde bekliyor | — |
| ROUTER-DISTILL-1 | ölçüm-tetikli | ⑤ (K3) |
| TENANT-CONSOLE / EAIP-TENANT ailesi · M-C · vizyon rezervleri | müşteri #2 / online satış kararı | — |

---

## İnsan diliyle tek paragraf

S90 iki merge'le kapandı ve S91 elimizde **iki şerit birden uçuşta** başladı — bu, listenin en tepesindeki iki satırın artık "sırada" değil "koşuyor" olması demek. ② Orchestrator canlı ve listede yalnız nöbet (W-032, susuş-oranı, iki span attr'ı) ile evrim kalemleri (n8n eylem uzvu, LangGraph, HISTORY-DIET) taşıyor; üstüne S90'ın tapu hükmü ② izleğine iki yeni satır ekledi — **#1 kayıt fazı ve #12 keşif**, ki ikincisi artık park değil, ratife edilmiş kuyruk kalemi. ① Anlama hattı üç basamakta yükseliyor: #5 gölge-kanıt, #11 frame-her-yolda, #14 ROUTE-ASK, zirvesi #31 A23. ③ Graph-KB üç hazırlık taşının üstünde duruyor — #21 topoloji keşfi, #24 LINE teşhisi, #25 katmanın kendisi. ④ PathB 2D'nin açılış satırı (#23) ve #26–27'de vektörün geçmek zorunda olduğu çıta. ⑤ CS329A yine tek yerde toplu değil, tam da olması gerektiği gibi yürüyüşün kritik kapılarına gömülü (#1, #9, #10, #12, #17, #19, #26, #29, #30). Listeye bu oturumda giren **#4 ROUTING-FLOOR-BACKEND-1** ise tek başına bir ders taşıyor: tek-backend varsayımıyla üretilmiş her artefakt — sabit de olsa, ÜRETİLMİŞ de olsa — ikinci backend geldiğinde yeniden yargılanır; ve bu kez yargılanan şey kodun kendisi değil, kodun *aynası* oldu.

<!-- END · cwf-implementation-order-S91-v2 -->
