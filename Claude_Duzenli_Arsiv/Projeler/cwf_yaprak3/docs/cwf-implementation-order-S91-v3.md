# CWF — TAM İMPLEMENTASYON SIRASI · S91 kapanışı · v3

<!-- cwf-implementation-order-S91-v3 · 2026-08-09. v2'yi geçersiz kılar.
     ⚠ TÜRETİLMİŞ GÖRÜNÜM — ikinci gerçek kaynak DEĞİL.
     Bağlayıcı sıra `cwf-master-rollout-plan-v2_8`, açık kalemler
     `cwf-open-items-register-v95`. Çelişirse onlar kazanır. -->

**ZEMİN:** `origin/master` `00062c7871a994fea3d63a79ba3c918b5201f263` ·
rev **223** · **518** test dosyası / **6322** test · 68 migration · 13 ADR ·
GATEWAY_RULES 18 · `phase/*` **27** · üretim `dpl_JE98TTs…` READY @ `39a0b90`.

**İZLEK:** ① Anlama · ② Orchestrator · ③ Graph-KB · ④ PathB · ⑤ CS329A (K#)

---

## 🔓 SOTA KAPISI — SAYILABİLİR TETİK · **0/7**

Dış benchmark'lara girmenin şartı (sahip hükmü H2). Her oturum bunu sayar:

```
[ ] 2D.1 PB-FULL-1             — PathB (BM25+regex)          #16
[ ] 2D.3 GRAPH-KB-1            — 4. bellek katmanı           #18
[ ] A23 ANLAMA KATMANI                                       #22
[ ] 2.2 BENCH-BACKEND-MOUNT-1  — zero-code mount             #12
[ ] 2.5 BENCH-A2A-1            — = SOTA-AGENT-ADAPTER-1      #14
[ ] LEARNING-SNAPSHOT-1                                      #2
[ ] TOOL-BEHAVIOR-CENSUS-1     — orkestrasyonun kalan yarısı #8
```

*"Hazır olunca" değil — **şu yedisi bitince.** Her merge'de kaç kaldığını sayabilirsin.*

---

## ★ S91'DE NE DEĞİŞTİ

| Değişim | Sebep |
|---|---|
| **STAGE-CARD-COVERAGE-1 ✅ KAPANDI** (`d32482f`) | 4 kart mahkûm, 4/4 mutasyon, rev 222 korundu |
| **METRIC-REGISTRY-DATA-1 ✅ KAPANDI** (`39a0b90`) | 8/8 mutasyon, 217→0 tip hatası, rev 223, üretimde 3 governed satır |
| **W-034 ✅ KAPANDI** | G7, `superset.tool_annotation` mint edildi, 4 taslak, sıfır publish |
| **`vocab_source` kanıtı ✅ KAPANDI** | Epizod `ee142f84`, pozitif kontrolle |
| **SOTA testleri ⛔ KAPI ARKASINA ALINDI** | Sahip hükmü H2 — mimari-önce |
| **Pilot API-Bank → `CANARY-POWER-1`** | Kanarya 10× null; kırık olan iç döngü |
| **`LEARNING-SNAPSHOT-1` doğdu ve ŞART** | Sahip H4 + AgentBeats giriş şartı |
| **4 yeni kalem daha doğdu** | ROUTING-FLOOR-BACKEND-1 · TRUST-PANEL-PER-BACKEND-1 · STAGE-CONTEXT-TRUTH-1 · LANGFUSE-ATTR-READ-1 |
| **AGENTBEATS-INTEGRATION-1** | Sahibin WorkLane'i adres kazandı; A2A, yeşil/mor ajan |
| **Kanarya borcu 9× → 10×** | `scoredReps` 6→3, güç DÜŞTÜ |

---

## A · BAĞLAYICI YÜRÜYÜŞ

| # | Kalem | Şerit | Durum | İZLEK | Not |
|---|---|---|---|---|---|
| **1** | **CANARY-POWER-1** | AG | ⏳ **PİLOT** | ⑤ (K5/§2-c5) | 10× `verdict:null`; ekstrapolasyonla-N |
| **2** | **LEARNING-SNAPSHOT-1** | AG | ⏳ **ŞART** | — | 🔓 kapı önkoşulu · tasarım notu hazır |
| **3** | **STAGE-CONTEXT-TRUTH-1** | AG-1 (`api/**`) | ⏳ | ② | Aşama 04'ün ASIL nüshası hâlâ "planlayıcı yok" diyor |
| **4** | **TRUST-PANEL-PER-BACKEND-1** | AG-2 (`src/**`) | ⏳ | — | #3 ile ideal DALGA-ÇAPA çifti |
| **5** | **ROUTING-FLOOR-BACKEND-1** | AG | ⏳ | — | 12 seramik kategorisi platform tabanında |
| 6 | 2.7 FRAME-SHADOW-EVIDENCE-1 | AG | ⏳ | ① | ROUTE-ASK-1 kapısını besler |
| 7 | #6 ALETLER: 015 (+W-026×5) · 016 · 017-ölçüm | dalga | ⏳ | — | Enstrüman + süreç kapıları |
| **8** | **TOOL-BEHAVIOR-CENSUS-1** + FRAME-ON-ALL-PATHS-1 | — | ⏳ | ⑤ (K2) ① | 🔓 **kapı önkoşulu** |
| 9 | **METRIC-VOCAB-DISCOVERY-1** | — | ⏳ | ② ⑤ | ⚠ önkoşulu S91'de KARŞILANDI |
| 10 | 2E.3 PACK-FROM-PROTOCOL-1 (+W-035 + evalGate kalıntısı) | 2E | ⏳ | — | |
| 11 | 2E.4 ROUTE-ASK-1 | 2E | 🔒 ölçüm-kapılı | ① | #6 açar |
| **12** | **2.2 BENCH-BACKEND-MOUNT-1** (+2.2a affordance) | Blok 2 | ⏳ | — | 🔓 **kapı önkoşulu** |
| 13 | 2.3a HONESTBENCH-HARNESS-0 | Blok 2 | ⏳ | ⑤ (K5) | honestbench backend'i henüz yok |
| **14** | **2.5 BENCH-A2A-1** = SOTA-AGENT-ADAPTER-1 | Blok 2 | ⏳ | ⑤ (K6) | 🔓 **kapı önkoşulu** · A2A sunucusu |
| 15 | 2.4 BENCH-RESET-1 · 2.6 BENCH-SMOKE-1 · 2.8 DISCOVERY-EXTEND-2 · 2.9 CORPUS-LINE-FILL-1 | Blok 2 | ⏳ | ③ | 2.6 maliyet aleti; 2.8 graf hammaddesi |
| **16** | **2D.1 PB-FULL-1 / PB-A** | 2D açılışı | ⏳ | ④ | 🔓 **kapı önkoşulu** · 2D bu satırla açılır |
| 17 | 2D.2 LINE-RESOLUTION-DIAGNOSIS-1 | 2D | ⏳ | ③ | 785 çözümsüz LINE |
| **18** | **2D.3 GRAPH-KB-1** | 2D | ⏳ | ③ | 🔓 **kapı önkoşulu** · 4. bellek katmanı |
| 19 | LLM-SCAN-BASELINE-1 | 2D | ⏳ | ④ ⑤ (K4) | Vektörün geçmesi gereken çıta |
| 20 | 2D.4a/b vektör (Qdrant·bge-m3) | 2D | 🔒 #19'a bağlı | ④ | Yerini kanıtla kazanır |
| 21 | 2D.5 OPA-POLICY-1 | 2D | ⏳ | — | Tier D'nin üç bacağının önkoşulu |
| **22** | **A23 ANLAMA KATMANI** | Blok 4 | ⏳ | ① ② | 🔓 **kapı önkoşulu** · A23 ∩ PLANNER-0 çizili |
| **23** | 🔓 **SOTA KAPISI AÇILIR** | — | 🔒 **0/7** | — | AGENTBEATS-INTEGRATION-1 → pilot → B-FRONTIER |
| 24 | Blok 3: EVAL-SPLIT-LAW + ilk ölçüm turu | Blok 3 | 🔒 | ⑤ (K5-iii) | SOTA §10'un ÖLÇÜLMEDİ'leri |
| 25 | honestbench (Fast_p, **yeşil ajan olarak**) | Blok 4 | 🔒 | ⑤ (K5-ii) | AgentBeats = C2+C3 bedava |
| 26 | v1.1 kuyruğu: RULE26-HARDEN-1 · temizlik · M-C · E-1 · golden-infra | Blok 5–6 | 🔒 | — | |

## B · PARALEL (bloke etmez)

2B.1 RAG şeridi (dış bekleme) · 2B.2 WEB-VALVE-1 · `AGENTBEATS-INTEGRATION-1`
okuma/keşif.

## C · NÖBET / KUSUR (faz açtırmaz)

`LANGFUSE-ATTR-READ-1` (2 attr) · no-jurisdiction üretim ORANI · W-032 · W-030 ·
W-033 · W-018 · UI-POLISH-NOTE · Gemini+PII 3. veri noktası · BUG-005 · BUG-014 ·
ARMED 010-down · ARMED 029 · `BENCH-KULLANIM-DOC-1` · honestbench backend yokluğu.

## D · TETİKLİ / PARK

ACTION-AUTHORITY-ADR → BACKEND-N8N-1 (CENSUS) · LangGraph (eylem-uzvu sonrası) ·
HISTORY-DIET-1 (2F sonrası) · MEMORY-HYGIENE-Q (S90 H3 ile hükme bağlandı) ·
ROUTER-DISTILL-1 (ölçüm-tetikli) · TENANT-CONSOLE / EAIP-TENANT (müşteri #2) ·
QUERY-CANDIDATE-1 (recon).

---

## İnsan diliyle tek paragraf

S91 iki merge'le kapandı ve listenin şekli değişti: dış SOTA testleri artık
**sayılabilir bir kapının arkasında** (0/7), ve o kapıyı açan yedi kalemin
**beşi zaten senin dört izleğin** — ④ PathB (#16), ③ Graph-KB (#18), ① A23 (#22),
artı mount (#12) ve A2A (#14). Yani üç haftadır peşinde olduğun şeyler artık
listenin kuyruğunda değil, **kapının anahtarı.** ② Orchestrator'ın son yarısı
CENSUS (#8) ve o da anahtarlardan biri. Önlerinde yalnız iki kalem var: **#1
kanarya** (10 merge'dir konuşamayan iç geri besleme döngün) ve **#2
LEARNING-SNAPSHOT-1** (hem senin hükmün hem AgentBeats'in giriş bileti). Ve
S91'de doğan #3 · #4 · #5, üç küçük dürüstlük borcu — ikisi bugün admin'e yalan
söyleyen yüzeyler, biri seramik sözlüğünün son sığınağı.

<!-- END · cwf-implementation-order-S91-v3 -->
