# cwf-open-items-register v88 — S84 kapanışı
<!-- v87'yi geçersiz kılar. Kaynak taban: cwf-work-board-S74-v1 (BINDING).
     S37-1: sürümlü dosya, sessizce üzerine yazılmaz. -->

## §1 · S84'TE KAPANANLAR (carry-diff)
- **BUG-025** CLOSED@canlı-okuma: 24s'te 0 sahte-down; 4 backend up (armes 141,
  superset 4, honestbench, machine-knowledge-base).
- **BUG-026** CLOSED@canlı-okuma+pozitif-kontrol: tarihsel 81/81 down satırı
  `error_head` dolu; sebep-yolu prod-kanıtlı (S66-1 sağlandı).
- **BUG-033** CLOSED@run-31152100128: dış platform arızası (GitHub, 06 Ağu
  15:22Z başlangıç); P1 push-doğumlu yeşil run; retro webhook teslimi.
  9056a50 retro-canary kırmızısı operasyoneldi → S84-1 yasası doğdu.
- **BUG-034** CLOSED@N3v2-3/3: kural v3 (dört-durum yasası) + LANDING-MECH
  ağları; turlar f9d7bbd8/25e3c8b2/3a54aa38.
- **BUG-035** CLOSED@S2-repro: boş araç-indeksi ≠ boş katalog; numaralandırma
  yasası; reprodüksiyon cümlesi 4 adayı isim+id saydı.
- **W-021** CLOSED@FOLD-merge `4af2eeb8`: 18. referans kuralı bayt-aynı
  katlandı (md5 18/18 + çift kontrol); republish gerekmedi.
- **W-018** SUPERSEDED / **W-019** MERGED → LANDING-MECH G1+G2.
- Republish ×2 (Operator, consent b): FIX-1 metinleri v2→CANLI, sonra v3
  (dört-durum) CANLI; orphan @1 kımıldamadı; RESET audit'ler tam.

## §2 · RESOLVED-GUARDED (kod tam, canlı mühür ARMED)
- **BUG-028** sayaç-tek-kaynak: parite yapısal (toolEvidence tek numaralandırma
  → başlık+Kanıt); merge `da8a0d5`, canary dahil 5/5. Şerh **W-024**.
- **BUG-029** dil-turdan: 5 site taşındı, 7 sınıf adıyla muaf, :707 zıt-default
  birleştirildi (deklare değişiklik); dedektör çekimser kalabilir, toggle
  fallback. İki sonda denemesi sonuçsuz (temiz turlarda yüzey ateşlemiyor) →
  ARMED, sonda ekonomisi gereği kontrived tetik yok.
- **BUG-012** (merge bekliyor): dal `ba05bb7`, RULE-25 S85 açılışında.
  First-claim + yerel-isim rezervasyonu; clean marker explicit. GO öncesi
  Architect DB okuması şart (yerel ad deklare eden backend var mı).

## §3 · S84'TE AÇILANLAR
- **CI-DIET-1 — ACİL, S85 #1** (sahip talebi): canary dalda 900 sn yapısal
  yanış + docs-only push'lar tam takım tetikliyor → paths-ignore + canary
  master-only + concurrency-cancel + Vercel ignoredBuildStep. Sınır: master'a
  kod merge push'u her zaman tam takım (S37-2 dokunulmaz).
- **W-022**: `scripts/verifySupersetGatewayLive.ts` bayat — başlık "13",
  proof-1 (~26 gün) koşulmamış; tazeleme + takvim adayı.
- **W-023**: rev-monotonluk mekanik korumasız — iki şerit bağımsız 204'e
  ulaştı, git özdeş metni sessizce birleştirdi; küçük CI koruması adayı
  (head rev > merge-base rev).
- **W-024**: defter eksik — `aggregate_records`/`query_records`
  `recordToolCall` çağırmıyor → **LEDGER-COMPLETE-1** mikro-faz (COLLISION
  merge'i sonrası; aynı dosya).
- **STAGE-CARDS-ALTITUDE borcu**: Stage-07 kartı "araç neden kullanılmadı"
  listesine çakışma sebebini almalı; kaynağı client
  (`stagesRegistry.ts`) — client-çitli bir faza adıyla devredildi (AG-2
  taslağı yazıp geri aldı, kaçak sokmadı).
- **ADHOC-VIZ-1 (aday)**: ham günlük veri var (dataset 74), küre-dışı grain'e
  anlık grafik yolu yok (T5 kanıtı); SOTA'ya karşı kontrol + sıra kararı.
- **QA-S81 kaydı mintlendi**: cwf-memory-and-discovery-QA-S81-v1.md (S81
  bellek/kök/PlanB diyaloğu verbatim + üç ipliğin akıbeti) — projede.

## §4 · BEKLEYEN / WAIT TABLOSU (S85)
| Bekleyen | Bitiren çıktı | Kim getirir |
|---|---|---|
| COLLISION GO zinciri | RULE-25 (Architect) → GO → merge raporu (canary dahil) | sahip relay |
| CI-DIET-1 | workflow fazı raporu + kendi-üstünde kanıt (docs-push atlar, dal-push canary'siz) | sahip relay |
| RAG 3-soru | ekip cevabı | sahip relay |
| W-020 R1/R2 | AG-temp PAT silme + settings göçü teyidi | sahip |

## §5 · KUYRUK (bucket v23 = TEK işleyen kaynak; buradaki liste türev)
CI-DIET-1 → COLLISION GO+merge → LEDGER-COMPLETE-1 → PROBE-PARITY+AUTO-SYNC →
FAULT-SWITCH-0 → BUG-006+009 → 2F.1 → 2F.2 → 2F.3 (çift: 910675a7 calls=8 vs
d94bcfc3 calls=5) → 015+016 → 017 → 2F.4 PLANNER-0 → 2E.2/3/4 →
HONESTBENCH-RUN-1 → BUG-005 SON. (BUG-010/011 eski-açık, v21 yerlerinde.)
W-022/W-023/STAGE-CARDS/ADHOC-VIZ: adlı eklemeler, uygun faza binerler.

## §6 · PROJE DOSYASI TEMİZLİĞİ (sahip, S85 öncesi)
Kaldır: BOOTSTRAP v84 · register v87 · KB v84 · bucket v22.
Yükle: BOOTSTRAP v85 · register v88 · KB v85 · bucket v23 (+ QA-S81 v1
yüklenmediyse). Eski oturum dokümanları kalabilir.
