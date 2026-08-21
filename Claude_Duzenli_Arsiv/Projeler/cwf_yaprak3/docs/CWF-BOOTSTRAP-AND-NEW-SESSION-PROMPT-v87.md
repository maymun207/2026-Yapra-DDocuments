# CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT v87 — S87 açılışı
<!-- v86'yı geçersiz kılar. S37-1: sürümlü, sessizce üzerine yazılmaz. -->

## §A · KİMLİK VE OKUMA SIRASI
Architect = Claude (Opus 5). Önce CLAUDE-PROJECT-INSTRUCTIONS-v4 → bu dosya →
cwf-open-items-register-v90 → **REGISTER-BUG-BUCKET-v25** (işleyen kuyruk TEK kaynak)
→ CWF-SESSION-GRAPH-KB-v87 → cwf-architect-doctrine-v1_3 (D-9 DENEME sürüyor;
S86'da yapıştırmasız gün — tripwire temiz) → **cwf-master-rollout-plan-v2_2**
(S86 ratifikasyonları içinde). Kod > her özet. Bellekten SHA/sayı/statü VARSAYILAN
BAYAT. SOTA-1 ilk mesajda harfiyen tekrarlanır. Sahip-iletişim kuralı: aksiyon
maddeleri HER ZAMAN human-readable adım-adım (kalıcı).

## §B · ARAÇ ENVANTERİ + D-9
Vercel + Supabase MCP ERTELENMİŞ → `tool_search` ile yükle. Supabase yalnız OKUMA
(ADR-005). GitHub API sandbox 403 — CI okuma AG/GO-STEP-1. D-9 varsayılanı: her
sahip mesajında git fetch + gerekirse Vercel/DB süpürmesi; AG raporları
`docs/relay/`den; yapıştırma yalnız karanlık bölge. Merge GO'ları `--cleanup=strip`.
Paylaşım-linki el değişimi (SSO'lu preview'a curl) kanıtlanmış desen: Architect
`get_access_to_vercel_url` basar, sahip TEK satır taşır — RELAY-BUS-1 gerekçesine
işlendi. Vitest 4 default reporter; sandbox tam-takım asılabilir → hedefli koşu
meşru, beyanlı.

## §C · RULE-25 BOOT (taze TAM klon; --depth yasak)
master = `b4f96eeceebd1d9867cfe6f3053fe20b8db46821` (WITNESS raporu tepede;
first-parent: 83b7097 → **43d15f38 FENCE-WITNESS merge** → 224c4fb → 20276dd
RENDER merge → f02b260 → fd9f49b FAULT-SWITCH merge → b2d6c55 rescue merge →
e98edb8). Sayılar: suite **492/5719** · docVersion **rev 211** · migrations 67 ·
ADR 13 · GATEWAY_RULES 18 · üretim `dpl_7Qy9i1…` READY @ `43d15f38` (docs-dışı
delta SIFIR). **Merge'siz dal: SIFIR.** Sapma varsa DUR, raporla.

## §D · S87 AÇILIŞ SIRASI
1. **2F.1 PROCEDURE-RECALL-1 derin recon → faz promptu** (bucket v25 #1).
   D-1: MemoryWrite/episodes yüzeyi + SUCCESS-ONLY G1 damga akışı + korpus şeması
   CANLI okunur; hammadde = F-S86-2 örnekleri (trace 58f1a8b3: `"son 3 gün"` kanıtlı
   başarısı sonraki turda taşınmadı; 9d80df71: hata-papağanlığı). Tasarım sorusu:
   rutin NE zaman damıtılır (turn-close?), NEREYE yazılır (governed korpus),
   NASIL geri gelir (offered-3 yanına mı ayrı kanal mı) — SUCCESS-ONLY hijyeni
   (yalnız kanıtlı başarı) tabandır.
2. **ARMED nöbetler pasif** (v25 §A): BUG-010 down · BUG-032 · BUG-029 · kanarya
   serisi POWER-1 lensiyle (61+ satırlar; underpowered ARTIK biliniyor — seri
   okuması #6'ya kanıt biriktirir, yeniden teşhis değil).
3. Devamı v25 sırası: 2F.2 (GRAPH-KB ile TEK organ, ortak tasarım notu) → 2F.3 →
   #6 (015+016+017+CANARY-POWER-1) → 2F.4 → HONESTBENCH-RUN-1 → BUG-005.
   PARK: RELAY-BUS-1 (sahip sinyali) · ROUTER-DISTILL-1 (ölçülü tetik, plan v2_2).

## §E · S86'DA DOĞAN YASALAR
**S86-1:** kullanıcı-gözü sözleşmeler modelin KENDİ çıktısıyla sondalanmadan
mühürlenmez. **S86-2:** yeşil kanarya koşmuş kanarya değildir — warning satırı
okunur, conclusion asla (cleared / converged-not-cleared / DID-NOT-RUN üçlüsü).
Mevcudiyet≠geçerlilik (42-günlük env satırı dersi) — kapılar tazelik/tanık ister.
Kimlik denklemi kayıtta: `queryCount = Σkanıt + failures` (BUG-028 mührü).
Ders: compute değil discovery (MA-RERUN-2) — sampling tartışmaları atıfla kapanır.

## §F · ŞERİT DURUŞU
AG-1 temiz kapalı (rescue + FAULT-SWITCH + FENCE-WITNESS zinciri; iki doğru
STOP-AND-REPORT + tanık koşusu) · AG-2 temiz kapalı (RENDER, ikinci-merge
yükümlülükleri örnek icra) · Operator SOĞUK (gün boyu sıfır adım; migrations 67) ·
FENCE-WITNESS dalı ve silahsızlanmış preview tarihçe olarak durur, iş taşımaz ·
CHANGELOG çift-merge deseni S86'da bir kez daha temiz koştu.
<!-- END v87 -->
