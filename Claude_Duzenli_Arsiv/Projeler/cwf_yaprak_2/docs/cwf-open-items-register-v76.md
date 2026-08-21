# CWF — Open Items Register · v76
<!-- cwf-open-items-register-v76 · 2026-08-01 · closes S74 · supersedes v75.
     SCOPE BASE: cwf-work-board-S74-v1.md (owner-RATIFIED, R-BOARD below).
     Ledger rules unchanged: items leave only via CLOSED@evidence /
     SUPERSEDED-BY / MERGED-INTO. Park full texts carry per v72 §7 + v75 §7
     (v75 precedent); board layer G names them. -->

## §1 · S74 NE YAPTI
- **F48 → CLOSED@evidence → A4 (MEMORY-1) programı TAMAMEN KAPANDI.** Kanıt:
  `[MemoryForget] deleted=0 scanned=53` @03:40:25Z + U-2 Memory sekmesinde
  forget_tick ledger satırı (owner ekranı 04:02Z, "22 minutes ago·deleted=0").
  scanned 3→53 atıfı ekranda çözüldü: tümü owner uuid, digest'ler gerçek
  turlarla birebir — replay kirliliği YOK (aritmetik: golden yazsaydı ~110+).
- **VIZ-FINISH-1 → CLOSED@evidence, geri dönüşsüz (S74-1 uygulaması #1).**
  Dört `--no-ff` merge: `86569a1e` (ana: dangling guard 4 token + final→
  viz-truncated · invalid→viz-invalid · date-prefix elision · v4 floor) →
  `bc5e2f71` (FIX-1: time-join minute-floor · bucket:day|hour deterministik
  grain · dense-dot-drop · monotonluk e2e · v4.1) → `955cbff7` (publish-
  record: reps=3 + CHANGELOG) → `b3216cfa` (FIX-2: tablo bucket + grain
  çipi). v4.1 governed publish: `[Gate] action=publish kind=prompt.segment
  key=viz rule=f901979d verdict=published` (golden `aa1c390f` completed=true
  20/20, underpowered→ALLOW sözleşme yolu). Canlı tanıklar: W1′ (trace
  4e2b1b6e, bucket ibaresi + output=1555) · W2′ (taze data çağrısı + tek
  monoton eksen) · W3 (7-seri günlük + UTC+3 saat atfı). Floor: 411 vitest
  dosyası / 4586 test · docVersion rev 170 · prod `dpl_9cJsurhG…` READY.
- **Board ratifikasyonu** (R-BOARD) + üç yasa + hafıza kayıtları (#14, #15).

## §2 · KARARLAR (S74)
- **R-BOARD:** `cwf-work-board-S74-v1.md` = BAĞLAYICI kapsam tabanı; register
  kalemleri panodan türer; yeni kalem adıyla eklenir, pano yeniden açılmaz.
- **R-RUNID:** Eski içeriğin golden run-id'si yeni içeriği YAYINLATAMAZ —
  davranışsal gate yayınlanacak byte'ları değerlendirir (dcdda4c8 reddi).
- **R-UNDERPOWERED:** golden `aa1c390f` underpowered kabulü sahip kararıyla;
  gerekçe: risk kod katmanında sınırlı, geri dönüş tek komut, gerçek test W′.

## §3 · YASALAR (S74 — v72 §2 zincirine eklenir)
- **S74-1 · İŞ DİBİNE KADAR BİTER:** Program açılınca KULLANICI GÖZÜNDEN
  bitiş tanımı alır; tanım canlı kanıtla sağlanana dek kapanmaz. Aile-içi
  bulgu programın İÇİNDE çözülür; parçalara dağıtmak YASAK — dağıtma ihtiyacı
  = tanım yanlış kesilmiş. Aile-dışı erteleme adı+gerekçesiyle kayda.
- **S74-2 · ÇOK-AG CONSENT KAPSAMI:** Her consent satırı kapsam VE durdurma
  sınırı taşır. Kapsamsız consent'in ölçülmüş maliyeti: 7.35M token
  (AG-A v4 golden'ı, stand-down öncesi).
- **S74-3 · RELAY = İŞ:** Başka şeridin çıktısına bağlı adım ASLA "action
  items: yok" değildir; taşıma adıyla listelenir.
- **S74-4 · BEKLEME SÖZLEŞMESİ:** Her bekleme dört alan yazar: NE (beklemeyi
  bitiren çıktı) · NASIL (sahip yapıştırır) · SON KULLANMA (süre + varsayılan
  probe: "N dk'da yoksa şeride 'status?' yaz, cevabı yapıştır") · SENSÖR
  (varsa bağımsız okuma; bekleme turlarında varsaymak yerine OKUNUR). Relay
  edilen her çıktıda "hangi soruyu cevapsız bırakıyor?" kontrolü zorunlu.

## §4 · S74 BULGULARI
| Ad | Durum | Not |
|---|---|---|
| CHART-POINT-BUDGET-1 | CLOSED (ana faz) | 17.395-token kesilmesi; leak kapıları a+b parser'da kapandı |
| CHART-TIME-AXIS-1 | CLOSED (FIX-1) | ham-epoch-string join → minute-floor bucket join; Δ187ms mekanizması AG rafinesiyle |
| VIZ-TABLE-GRAIN-1 | CLOSED (FIX-2) | tablo bucket + medyan-delta grain çipi |
| GOLDEN-CLAMP-1 | AÇIK → v1.1 golden-infra | CWF_REPLAY_TOKEN_BUDGET=500k çift-klempi × rep aritmetiği koşuları yarım bırakıyor; 800k run-scoped override kanıtı (aa1c390f 20/20); kalıcı çözüm: tek yetkili tavan, bileşimi governed+açık |
| SCOPE-SELF-VOCAB-1 | SERGİ → b1_scope v3 (A5) | Ürünün kendi grafik ibaresi ("günlük ortalama nedir") scope'tan sekti; kapsam-içi sayılmalı |
| MEM-ENTITY-DISPLAY-Q | AÇIK (kozmetik soru) | log entities=1 iken U-2 sütunu "—"; projeksiyon mu persist mi |
| F196 imza #4 | park sayacı 3→4 | rule26 in-run flake retried green; retry-hardening gerekçesi kalınlaşıyor |
| Kuyruk 0→rampa | İZLEME (pano G) | OEE gün-içi kümülatif görünümü; ARMES doğrulamadan öğreti yok |
| MEM-REPLAY izleme | düşürüldü | §1 atıf temizliği; yeniden açılma eşiği: episode sayısında açıklanamayan sıçrama |

## §5 · SÜREÇ NOTLARI (S74)
- VIZ programında merdiven sahip emriyle merge-önce-review-sonra çalıştı
  (2×); program kapandı, normal sıra (build→RULE-25→GO→merge) geri yürürlükte.
- Architect premise düzeltmeleri: bootstrap §0.3 kodun vaat etmediği
  [MemoryAudit] log satırını bekledi (sessiz-başarı, ADR-007) · P2 mekanizma
  tarifi bir katman yanlıştı (formatlanmış etiket değil ham epoch string'i) ·
  "verdict sensörden okurum" iddiası boş sensördü (seam stdout'u loglara
  düşmez). Üçü de S74-4'ün gerekçe hanesinde.
- Çip ilk-doğal-canlı-görülme: pasif gözlem, aksiyon yok (koşullu garanti
  e2e ×2 genişlikte).

## §6 · SIRA (pano B katmanı — F48 kilidi AÇILDI)
1. **Sahip kararları:** `69202e21` OEE-kardeş merge-mi-at-mı — Architect
   kanıt önerisi için FENCED Operator okuması (draft içerik vs OEE v2) İLK
   Operator işi · `fe8709c6` restoration disposition.
2. **A5 freeze kalkışı** (S65-1: kendi canlı okumasıyla açılır): b1_scope v3
   (+SCOPE-SELF-VOCAB-1 sergisi) · tools.rule.1/6 v2 · F133-L5 · F83.1 ·
   FLOOR RE-SYNC RE-RUN · RAG-JOIN kapısı (10 madde, v75 §2 checklist).
3. A7 (D-2 · D-3 · ADR-012 İNİŞ · R-1 · STAGE-CARD-DRIFT-1) → A8 (B7 tag).
Katmanlar C-G: panoda aynen; tablo-grain öğreti cümlesi bir sonraki doğal
segment revizyonuna KUYRUKTA (FIX-2 kaydı).

## §7 · CANLI GOVERNED STATE (S74 sonu — bellekten asla)
frameRouting=0 · learnEnabled=0 · cache 2 pinned · secrets=3 · mcp_settings=3
(armes ON · superset ON · mkb OFF) · FLOOR==LIVE (FIX ailesi src-only) ·
episodes=53 · memory_audit ≥2 satır (episode_delete + forget_tick@03:40:25Z)
· glossary: OEE v2 + fire_orani v1 + 2 İNERT taslak · prompt.segment/viz =
**v4.1 published** (rule f901979d) · entity 17/779/0 · korpus 167/796 ·
master `b3216cfabe4a092947a742b513e91e9c26c30b74` · prod `dpl_9cJsurhG…`.
<!-- END · cwf-open-items-register-v76 -->
