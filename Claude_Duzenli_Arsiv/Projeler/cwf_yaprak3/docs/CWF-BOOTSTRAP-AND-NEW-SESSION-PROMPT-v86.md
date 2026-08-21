# CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT v86 — S86 açılışı
<!-- v85'i geçersiz kılar. S37-1: sürümlü, sessizce üzerine yazılmaz. -->

## §A · KİMLİK VE OKUMA SIRASI
Architect = Claude (Opus 5). Önce CLAUDE-PROJECT-INSTRUCTIONS-v4 → bu dosya →
cwf-open-items-register-v89 → REGISTER-BUG-BUCKET-v24 (işleyen kuyruk TEK
kaynak) → CWF-SESSION-GRAPH-KB-v86 → **cwf-architect-doctrine-v1_3** (D-9
RELAY-DIET DENEME statüsünde — tripwire a-d; sahip sözüyle rollback). Kod >
her özet. Bellekten SHA/sayı/statü VARSAYILAN BAYAT. SOTA-1 ilk mesajda
harfiyen tekrarlanır.

## §B · ARAÇ ENVANTERİ + D-9 SENSÖR DÜZENİ
Vercel MCP + Supabase MCP ERTELENMİŞ → `tool_search` ile yükle. Supabase yalnız
OKUMA (ADR-005). GitHub API sandbox'tan 403 — CI okuma AG/GO-STEP-1 veya sahip
ekranı (screenshot sensörü S85'te çalıştı). **D-9 varsayılanı:** her sahip
mesajında ("bak" yeter) git fetch + gerekirse Vercel/DB süpürmesi; AG raporları
`docs/relay/`den okunur; yapıştırma yalnız push'lanmamış çıktılar için (karanlık
bölge = sahibin ekranı). Ayakta-GO'lar kalp atışı İSTER (S85-1: şeritler
tur-tabanlı, poll etmez). Merge GO'ları `--cleanup=strip` taşır (RULING-S85-1).
Vitest 4: default reporter. Sandbox tam-takım vitest asılabilir → hedefli koşu
meşru, beyanlı.

## §C · RULE-25 BOOT (taze TAM klon; --depth yasak)
master = `e98edb8445d92a4318b78531875fadb67b1e5f0e` (P1-OBSERVED raporu tepede;
first-parent: cd24285 PROBE-PARITY merge → 9ebb05f → e32ccb4 LEDGER merge →
57e736a → 10525a2 COLLISION merge → f2b72df → 637fe0a CI-DIET merge → be8509ef).
Master sayıları: suite **490/5642** · docVersion **rev 208** · migrations 67 ·
ADR 13 · GATEWAY_RULES 18 · canlı deploy `dpl_25jNhK41…` READY @ `cd24285`.
İnceleme bekleyen dal YOK — dört faz dalı da merge'li. Sapma varsa DUR, raporla.

## §D · S86 AÇILIŞ SIRASI
1. **FAULT-SWITCH-0 derin recon → faz promptu** (bucket #1; rollout 2.3b).
   Alet: env-armed, salt-okuma, deterministik, fails-loud; kanıt PREVIEW
   deployment'ta (sahip hükmü b). Çıktısı BUG-006 (çit ateşlemesi log
   YOKLUĞUNDAN çıkarılıyor) + BUG-009'u (başarısız withholding okuması =
   "hiçbir şey saklanmadı") besler — #2 bitişik. S85 yüzey haritası: çit
   siteleri 6 dosya (semanticRouter · runSyntheticInjectorTick · floorSyncCore
   · readHonesty · SyntheticRunsRepository · ReplayAuditRepository);
   withholding dikişi toolOutcomes.ts + gatewayPreflight.ts merkezli;
   env-emsal CWF_* config.ts evlerinde; anahtar adları `^MCP_` regex'inden
   UZAK durur (o namespace apiKeyEnv'in). D-1: bu harita YÜZEYDİR — prompt
   yazılmadan önce ateşleme semantiği + preview-deploy kanıt mekaniği bayt
   bayt okunur.
2. **ARMED nöbetler pasif:** BUG-012 (`collisions=[]` MEVCUT-BOŞ beklenir —
   DB-mühür: 0 deklarasyon) + BUG-028 (TAM yerel roster paritesi) ilk DOĞAL
   turda tek okumayla; BUG-010 down-kolu doğal ulaşılamazda. `ToolRegistry`
   lens kelimesi; pozitif kontrol şart (S66-1).
3. Devamı bucket v24 sırası. PARK: RELAY-BUS-1 (sahip sinyaliyle; ADR-014
   taslağı Architect'te).

## §E · S85'TE DOĞAN YASALAR
S85-1: ayakta-GO sahipten tek-satır kalp atışı ister. ÖNCÜL #28: iki noktadan
yön okunmaz (trend ≥N nokta). GO beklentileri TABAN+DELTA yazılır (mutlak
sayılar çapraz-şerit merge'iyle bayatlar; delta değişmez). RULING-S85-1:
doğrulanmış/deploy'lu tarih yorum bloğu için yeniden yazılmaz; önleme
`--cleanup=strip`. Sonda ekonomisi teyit: down-kolu/çakışma örneği ÜRETİLMEZ,
ARMED bekler. Canary serisi yeni çit altında: 3:26/3:23/3:43/3:49 — S84-1
kitapta, konfigürasyonda yapısal gereksiz.

## §F · ŞERİT DURUŞU
AG-1 temiz kapalı (4 fazın 3'ü onun) · AG-2 temiz kapalı (COLLISION merge +
örnek öz-ihbar) · Operator SOĞUK (gün boyu sıfır adım; migrations 67 sabit) ·
paralellik ölçülmüş dosya-ayrıklığıyla · merge sırası Architect'te, tek tek ·
son-merge-eden reseal'i birleşik ağaçta koşar · CHANGELOG çift-merge: iki
giriş tam, geç-merge üstte.
<!-- END v86 -->
