# CWF · MASTER ROLLOUT PLAN · v3_0 — S92 kapanışı

<!-- cwf-master-rollout-plan-v3_0 · 2026-08-11. v2_9'u supersede eder.
     BAĞLAYICI YÜRÜYÜŞ SIRASI BUDUR. -->

## §0 · v2_9'DAN FARK

S92 üç yürüyüş kalemini KAPATTI (#1 · #3 · #5 — aşağıda ✅) ve iki kalem
DOĞDU: **#35 CANARY-REP-FAILURE-1** (tetiği ateşlendi; kanaryanın 9 tabanına
ulaşabilmesinin tek kapısı — yürüyüşün BAŞINA yerleşir) ve **#36
FLOOR-RESYNC-1** (küçük, sahip-sıralamalı; F185 yönü). Payda 34 → **36**,
açık **33**. S91-H2/H3/H4 hükümleri ve SOTA kapısı (0/7) aynen.

## §1 · DEĞİŞMEZ HÜKÜMLER

**H2 · SOTA KAPISI = MİMARİNİN TAMAMLANMASI** (7 anahtar: #2 · #10 · #16 ·
#18 · #23 · #25 · #29 — S92 kapanışında hâlâ 0/7, üç merge dürüstlük/altyapı
borcuydu). **H3 · pilot = kanarya ailesi** (VERDICT-TRUTH kapandı; REP-FAILURE
devraldı). **H4 · LEARNING-SNAPSHOT-1 ŞART** — ⚠ S92 şema okuması: iki tablo
(`router_proposals` · `tool_category_cache`) çıplak-keyword PK → `task_id`
izolasyonu MIGRATION ister; tasarım `v1_1` amendi + ratifikasyon + Operator
adımı faz önkoşulu.

## §2 · BAĞLAYICI SIRA

| # | Kalem | Şerit | Not |
|---|---|---|---|
| ✅1 | ~~CANARY-VERDICT-TRUTH-1~~ | — | **KAPANDI** `b5da685` (rev 224). İlk üç gerçek hüküm üretimde |
| **35** | **CANARY-REP-FAILURE-1** *(S92 doğumlu, tetik ATEŞLİ)* | Architect→AG | failed/scored 6/3→3/6→6/3 salınımlı; `ok:true`+`errorName:null`. ÖNCE Architect teşhis notu, SONRA faz. Kanaryanın 9 tabanı buna kilitli |
| **2** | 🔑 **LEARNING-SNAPSHOT-1** | AG + **Operator** | Tasarım `v1_1` amendi ratifikasyona gelecek (migration doğdu). ⚠ `router_proposals`'a dokunur — S88-1 eşleştirme notu |
| ✅3 | ~~STAGE-CONTEXT-TRUTH-1~~ | — | **KAPANDI** `c2f7dfd` (rev 225). Elle tanık H5 |
| **4** | **TRUST-PANEL-PER-BACKEND-1** | AG | Dalga-1'den çekilmişti (adminService/AdminPreview çarpışması) — artık serbest; prompt yeni master'a karşı yeniden kesilir |
| ✅5 | ~~ROUTING-FLOOR-BACKEND-1~~ | — | **KAPANDI** `0de5ffd` (rev 226). `coveredBackendIds:null` öldü |
| **36** | **FLOOR-RESYNC-1** *(S92 doğumlu)* | AG (tek script) + sahip onayı | `--report`+`--write`: machine-knowledge-base 0→1 kategori (5 araç) + armes 8 keyword. W-038 redaksiyon kuralı talimatta |
| 6 | 2.7 FRAME-SHADOW-EVIDENCE-1 | AG | |
| 7–9 | #6 ALETLER: BUG-015 (+W-026×5) · BUG-016 · BUG-017 | dalga | |
| **10** | 🔑 **TOOL-BEHAVIOR-CENSUS-1** | — | |
| 11 | FRAME-ON-ALL-PATHS-1 | — | |
| 12 | **METRIC-VOCAB-DISCOVERY-1** | — | |
| 13–14 | 2E.3 PACK-FROM-PROTOCOL-1 (+W-035 + `evalGate:160-164`) · 2E.4 ROUTE-ASK-1 | 2E | |
| 15 | 2.2a backend-lifecycle affordance | Blok 2 | |
| **16** | 🔑 **2.2 BENCH-BACKEND-MOUNT-1** | Blok 2 | |
| 17 | 2.3a HONESTBENCH-HARNESS-0 | Blok 2 | |
| **18** | 🔑 **2.5 BENCH-A2A-1** | Blok 2 | Ondört benchmark'ın ortak engeli |
| 19–22 | 2.4 BENCH-RESET-1 · **2.6 BENCH-SMOKE-1** (hakem-model maliyeti KAPSAMDA) · 2.8 · 2.9 | Blok 2 | |
| **23** | 🔑 **2D.1 PB-FULL-1** | 2D | |
| 24 | 2D.2 LINE-RESOLUTION-DIAGNOSIS-1 | 2D | |
| **25** | 🔑 **2D.3 GRAPH-KB-1** | 2D | |
| 26–28 | LLM-SCAN-BASELINE-1 · 2D.4a/b vektör (🔒#26) · 2D.5 OPA-POLICY-1 | 2D | |
| **29** | 🔑 **A23 ANLAMA KATMANI** | Blok 4 | |
| — | 🔓 **SOTA KAPISI** | — | 0/7 |
| **33** | **B-FRONTIER-PAIRING-1** | Blok 3 | Kapı sonrası, ilk skordan önce |
| **34** | **AGENTBEATS-INTEGRATION-1** | Blok 3 | #18 + #2'ye bağlı |
| 30 | Blok 3: EVAL-SPLIT-LAW + ilk ölçüm turu | Blok 3 | |
| 31 | honestbench (yeşil ajan) | Blok 4 | |
| 32 | v1.1 kuyruğu | Blok 5–6 | |

## §3 · SOTA KAPISI — **0/7** (S92'de değişmedi; sıradaki anahtar #2)

## §4 · PARALEL ŞERİT

2B.1 RAG (dış bekleme) · 2B.2 WEB-VALVE-1.

## §5 · PARK / TETİKLİ

Register v96 §7 (değişmedi).

<!-- END · cwf-master-rollout-plan-v3_0 -->
