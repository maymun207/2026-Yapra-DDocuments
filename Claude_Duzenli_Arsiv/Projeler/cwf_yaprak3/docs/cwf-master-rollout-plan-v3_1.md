# CWF · MASTER ROLLOUT PLAN · v3_1 — S93 kapanışı

<!-- cwf-master-rollout-plan-v3_1 · 2026-08-11. v3_0'ı supersede eder.
     BAĞLAYICI YÜRÜYÜŞ SIRASI BUDUR. -->

## §0 · v3_0'DAN FARK

S93 üç yürüyüş kalemini KAPATTI (#35 · #2 🔑 · #36) ve iki kalem DOĞDU:
**#37 GOLDEN-SET-REPLAYABILITY-1** (Blok 3, ilk skordan ÖNCE; K-3 cap 3→5
kapsamında — canlı gerekçe: checked-N 6<9 hüküm kelimesini kilitliyor) ve
**#38 SNAPSHOT-LIFECYCLE-1** (küçük; ad benzersizliği · yazılı-onaylı silme ·
saklama). Payda 36 → **38**, açık **32**. **SOTA kapısı 0/7 → 1/7** 🔑.
Kanarya ailesi BİTTİ — yeniden açılmaz; kelime mührü #37'yi bekler.

## §1 · DEĞİŞMEZ HÜKÜMLER

**H2 · SOTA KAPISI = MİMARİNİN TAMAMLANMASI** — 7 anahtar: ✅#2 · #10 · #16 ·
#18 · #23 · #25 · #29. **H4 karşılandı:** LEARNING-SNAPSHOT canlıda, doğum
kanıtlı (S93-1'in ilk uygulaması). **Durma-şartı hükmü icra edildi:** kanarya
tamiri tek turda bitti, ikinci teşhis turu YASAK kalır.

## §2 · BAĞLAYICI SIRA

| # | Kalem | Şerit | Not |
|---|---|---|---|
| ✅1 | ~~CANARY-VERDICT-TRUTH-1~~ | — | S92 · `b5da685` |
| ✅35 | ~~CANARY-REP-FAILURE-1~~ | — | **S93** · `0d622de` (rev 227) · 3× 9/9 tanıklı |
| ✅2 | ~~🔑 LEARNING-SNAPSHOT-1~~ | — | **S93** · `dd561c5` (rev 228) · **KAPI 1/7** · canlı doğum kanıtı + sahip tanığı |
| ✅3 | ~~STAGE-CONTEXT-TRUTH-1~~ | — | S92 · `c2f7dfd` |
| **4** | **TRUST-PANEL-PER-BACKEND-1** | AG | **SIRADAKİ.** Prompt `f6d6e48`'e kesilir; eski v1 relay bayat |
| ✅5 | ~~ROUTING-FLOOR-BACKEND-1~~ | — | S92 · `0de5ffd` |
| ✅36 | ~~FLOOR-RESYNC-1~~ | — | **S93** · `f6d6e48` (rev 229) · G-EXCLUDE + S92-1 ikinci-merger birebir |
| **38** | **SNAPSHOT-LIFECYCLE-1** *(S93 doğumlu, küçük)* | AG | Uygun dalgaya biner (#4 ile aday — çitler ayrıksa). Ad benzersizliği/oto-ek · yazılı-onaylı silme · saklama; ilk işi 2 deneme satırı |
| 6 | 2.7 FRAME-SHADOW-EVIDENCE-1 | AG | |
| 7–9 | #6 ALETLER: BUG-015 (+W-026×5) · BUG-016 · BUG-017 | dalga | |
| **10** | 🔑 **TOOL-BEHAVIOR-CENSUS-1** | — | Kapının 2. anahtarı adayı |
| 11 | FRAME-ON-ALL-PATHS-1 | — | |
| 12 | **METRIC-VOCAB-DISCOVERY-1** | — | |
| 13–14 | 2E.3 PACK-FROM-PROTOCOL-1 (+W-035) · 2E.4 ROUTE-ASK-1 | 2E | |
| 15 | 2.2a backend-lifecycle affordance | Blok 2 | |
| **16** | 🔑 **2.2 BENCH-BACKEND-MOUNT-1** | Blok 2 | ⚠ W-039/W-040/W-041 (mkb borçları) bu bloğa biner |
| 17 | 2.3a HONESTBENCH-HARNESS-0 | Blok 2 | |
| **18** | 🔑 **2.5 BENCH-A2A-1** | Blok 2 | `ctx.taskId`'nin ilk tüketicisi |
| 19–22 | 2.4 · **2.6 BENCH-SMOKE-1** (hakem maliyeti KAPSAMDA) · 2.8 · 2.9 | Blok 2 | |
| **23** | 🔑 **2D.1 PB-FULL-1** | 2D | |
| 24 | 2D.2 LINE-RESOLUTION-DIAGNOSIS-1 | 2D | |
| **25** | 🔑 **2D.3 GRAPH-KB-1** | 2D | |
| 26–28 | LLM-SCAN-BASELINE-1 · vektör (🔒#26) · OPA-POLICY-1 | 2D | |
| **29** | 🔑 **A23 ANLAMA KATMANI** | Blok 4 | |
| — | 🔓 **SOTA KAPISI** | — | **1/7** |
| **33** | **B-FRONTIER-PAIRING-1** | Blok 3 | Kapı sonrası, ilk skordan önce |
| **34** | **AGENTBEATS-INTEGRATION-1** | Blok 3 | #18 + ✅#2'ye bağlıydı — yarısı hazır |
| **37** | **GOLDEN-SET-REPLAYABILITY-1** *(S93 doğumlu)* | Blok 3 | İlk skordan ÖNCE: 14/20 spesimen yedek-bağımlı · alfabetik alt küme yasağı · **K-3: governed cap 3→5** (checked-N 6→≥9; `baseline:absent` tek koşu bedeli) |
| 30 | Blok 3: EVAL-SPLIT-LAW + ilk ölçüm turu | Blok 3 | |
| 31 | honestbench (yeşil ajan) | Blok 4 | |
| 32 | v1.1 kuyruğu | Blok 5–6 | |

## §3 · SOTA KAPISI — **1/7** 🔑 (✅#2; kalan: #10 · #16 · #18 · #23 · #25 · #29)

## §4 · PARALEL ŞERİT

2B.1 RAG (dış bekleme) · 2B.2 WEB-VALVE-1.

## §5 · PARK / TETİKLİ

Register v97 §7 (değişmedi).

<!-- END · cwf-master-rollout-plan-v3_1 -->
