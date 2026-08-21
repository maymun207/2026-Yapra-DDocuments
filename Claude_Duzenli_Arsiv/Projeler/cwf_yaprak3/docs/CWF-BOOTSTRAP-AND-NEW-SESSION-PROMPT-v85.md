# CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT v85 — S85 açılışı
<!-- v84'ü geçersiz kılar. S37-1: bu dosya sürümlüdür, sessizce üzerine yazılmaz. -->

## §A · KİMLİK VE OKUMA SIRASI
Architect = Claude (Opus 5). Önce CLAUDE-PROJECT-INSTRUCTIONS-v4 → bu dosya →
cwf-open-items-register-v88 → REGISTER-BUG-BUCKET-v23 (işleyen kuyruk TEK
kaynak) → CWF-SESSION-GRAPH-KB-v85. Kod > her özet. Bellekten hatırlanan her
SHA/sayı/statü VARSAYILAN BAYAT. SOTA-1 ilk mesajda harfiyen tekrarlanır.

## §B · ARAÇ ENVANTERİ
Vercel MCP + Supabase MCP ERTELENMİŞ → `tool_search` ile yükle. Supabase yalnız
OKUMA (ADR-005). GitHub API sandbox'tan 403 (IP limiti) — CI okuma AG/ekran
üzerinden; Actions CANLI (BUG-033 kapandı, dış arızaydı). Vitest 4:
`--reporter=basic` YOK (iki şerit + Architect üçü de çarptı; default reporter).
Sandbox'ta tam-takım vitest asılabiliyor (S84'te 191. dosyada ortam-sınıfı
donma) — hedefli dosya koşusu meşru düşüş, dürüstçe beyan edilir.

## §C · RULE-25 BOOT (taze TAM klon; --depth yasak)
master = `be8509ef5040c6af6046a90e6f4a9555c05c4d44` (SS relay raporu tepede;
first-parent: da8a0d5 SS merge → 764ce68 → 4af2eeb FOLD merge → 92b832b).
Master sayıları: suite 485/5599 · docVersion **rev 205** · migrations 67 ·
ADR 13 · GATEWAY_RULES roster **18**. İnceleme bekleyen dal:
`phase/tool-name-collision-1` @ `ba05bb7` (beklenen: 486/5610 · rev 206).
Sapma varsa DUR, raporla.

## §D · S85 AÇILIŞ SIRASI
1. **CI-DIET-1 — ACİL, İLK İŞ** (sahip talebi: "15-20 dk CI kabul edilemez").
   Kaynak teşhisi kesin: (i) eval-canary dal koşusunda yapısal 900 sn yakıyor
   (prod dal SHA'sı servis etmez → "never became live"); (ii) docs-only rapor
   push'ları tam takım tetikliyor. Reçete (workflow + Vercel config, AG şeridi,
   tek küçük faz): (a) docs-only paths-ignore ile ağır işler atlanır;
   (b) eval-canary `if: github.ref == refs/heads/master`; (c) concurrency
   cancel-in-progress; (d) Vercel ignoredBuildStep docs-only'de deploy atlar
   (S84-1 beklemesini de kökten bitirir). DEĞİŞMEZ: master'a KOD merge push'u
   her zaman TAM takım (S37-2). Workflow dosyası değişikliği kendi üstünde
   test edilir (bir docs-push + bir dal-push kanıtı).
2. **TOOL-NAME-COLLISION-1 RULE-25 incelemesi** (dal `ba05bb7`). GO'dan ÖNCE
   Architect DB okuması: `backend_tools`'ta yerel adlar (`resolve_time_range`,
   `aggregate_records`, `query_records`) herhangi bir backend'de deklare mi?
   Deklare varsa ilk post-merge tur GERÇEK çakışma kaydı üretir — hüküm ona
   göre okunur (AG-2'nin şerhi). İnceleme odakları: yerel-isim rezervasyonu
   (loop ÖNCESİ; davranış bayt-aynı, kayıp artık sesli), map/closure aynı
   guard altında, clean marker explicit ([] ≠ absent), mutasyon asimetrisi.
   GO bloğuna canary borcu + S84-1 tutuşu yazılır (CI-DIET sonrası docs-push
   deploy tetiklemeyeceği için tutuş sadeleşir).
3. **LEDGER-COMPLETE-1 mikro-faz** (W-024): `aggregate_records`/`query_records`
   → `recordToolCall`; parite fikstürüne iki yerel araç. COLLISION merge'inden
   sonra (aynı dosya).
4. **PROBE-PARITY + AUTO-SYNC** (AG-1 boşta bekliyor; recon S85'te taze).
5. Devamı bucket v23 sırası.

## §E · BU OTURUMDA DOĞAN YASALAR/DERSLER (S84)
S84-1: canary'nin 900 sn bütçesi içinde master'a takip push'u yapılmaz
(CI-DIET (d) bunu yapısal çözer; yasa yine kayıtta kalır). ÖNCÜL #25:
governance tablosuna beklenti status-filtresiz yazılmaz (append-only tarih).
ÖNCÜL #26: guard gözlenen desene yazılır, hatırlanan şekle değil (AG'nin
merge+rapor iki-commit deseni). ÖNCÜL #27 (küçük): kapsam-notu grounding'e
bağlı, sohbet-reddine değil — sonda tasarımı buna çarptı. SONDA EKONOMİSİ:
bilerek tetiklenemeyen bozuk-sınıf yüzeyler ARMED ailesine gider; sahip
dokunuşu kontrived tetiklere harcanmaz. Reseal gerekçesi canlı örnekli:
birleşik içeriğin hash'i iki şeridin hiçbirine ait değildir; elle birleştirme
hiç var olmamış ağacın hash'ini yazar.

## §F · CANLI NÖBETLER (pasif, Architect okur)
- BUG-032 P1/P2: ilk doğal başarısız turda MemoryWrite outcome=failed +
  sunulmama + başarılının sunulması.
- `[GatewaySearchZero]` ARMED: ilk sıfır-sonuçlu gateway aramasında.
- BUG-028 canlı mührü ARMED: ilk doğal yerel-araçlı turda başlık/Kanıt
  paritesi (W-024 şerhiyle: defter iki yerel aracı henüz görmüyor).
- BUG-029 canlı mührü ARMED: ilk doğal bozuk-sınıf turda (boş tamamlama /
  sessiz bitiş / grounded kapsam sapması) sistem cümlesi turun dilinde mi.
- chartId repair çipi ARMED (trace sınıfı: camelCase alias).
- BUG-012 (merge sonrası): ilk turda collisions alanı — [] mi, gerçek kayıt mı
  (yukarıdaki DB okumasına göre yorumlanır).
- RAG ekibi 3-soru relay'i · W-020 R1/R2 (sahip onayıyla).

## §G · ŞERİT DURUŞU
AG-1 boşta (SS bitti) · AG-2 raporda durdu (COLLISION, GO bekliyor) ·
Operator soğuk · paralellik yalnız ölçülmüş dosya-ayrıklığıyla · merge sırası
Architect'te, tek tek · son-merge-eden reseal'i birleşik ağaçta koşar ·
CHANGELOG aynı-gün çift-merge'de yapısal çakışır: iki giriş de tam tutulur,
geç-merge üstte.
<!-- END v85 -->
