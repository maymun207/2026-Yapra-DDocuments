# CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT v84 — S84 açılışı

<!-- v83'ü geçersiz kılar. S37-1: bu dosya sürümlüdür, sessizce üzerine yazılmaz. -->

## §A · KİMLİK VE OKUMA SIRASI
Architect = Claude (Opus 5). Önce CLAUDE-PROJECT-INSTRUCTIONS-v4 → bu dosya →
cwf-open-items-register-v87 → REGISTER-BUG-BUCKET-v22 (işleyen kuyruk TEK
kaynak) → CWF-SESSION-GRAPH-KB-v84. Kod > her özet. Bellekten hatırlanan her
SHA/sayı/statü VARSAYILAN BAYAT.

## §B · ARAÇ ENVANTERİ (S83-1: yokluk aranmadan iddia edilemez)
Vercel MCP + Supabase MCP ERTELENMİŞ araçlardır → `tool_search` ile yükle
(ör. "runtime logs", "execute sql"). Supabase yalnız OKUMA (ADR-005:
migration=Operator `db push`). GitHub API sandbox'tan 403 — CI okuma Actions
UI/AG üzerinden. Vercel: geniş tam-metin sorgu zaman aşımı (W-016 gürültüsü);
önce group_by, sonra ≤30dk pencere, TEK ayırt edici kelime.

## §C · RULE-25 BOOT (taze TAM klon; --depth yasak)
Beklenen (FIX-1 merge'i S83 kapanışında SAHİP TEYİDİ BEKLİYORDU — boot bunu
ÇÖZER): master ya `2cc554b0`'ın merge commit'i (FIX-1 girdi) ya da hâlâ
`ce2e244` (girmedi → ilk iş GO'nun akıbetini sor). Dal tabanı `ce2e244`.
Suite dal başı 479/5481 · docVersion rev 202 · migrations 67 · ADR 13.
Dört sayı bucket v22'den türetilir. Sapma varsa DUR, raporla.

## §D · S84 AÇILIŞ SIRASI (bucket v22 §BUG.5)
1. FIX-1 merge + BUG-033 sondası oku (Actions run doğdu mu → hüküm).
2. **REPUBLISH** (FIX-1 NOT-YET-LIVE, S80-3): sahip tercihi (a) kendi eliyle
   `resetSupersetGateway.ts` / (b) Operator relay'i (Architect keser; içinde
   FENCE-first + verifyGrants gerekmez — governed content publish, eval-gate
   İÇİNDEN). Kanıt: `[Gate]` chart-shape-filter + root-research **v2**.
3. Yeni **N=3** (sahip 3 soru): hedef 3/3 çizim ya da isim-isim; SIFIR
   yokluk-iddiası → BUG-034 hükmü.
4. HEALTH-TRUTH canlı okuma (BUG-025/026) — Architect kendisi.
5. SIGNAL-SOURCE-1 **v2** kes (v1 İPTAL; chartId alias; stageTools serbest;
   "yerel yarım işi at" satırı; güncel tabana demir).
6. Devamı bucket v22 sırası.

## §E · BU OTURUMDA UYULACAK YENİ YASALAR
S83-1 (araç yokluğu aranmadan iddia edilemez) · S83-2 (ctx.emit ≠ istemci
SSE; varış noktası okunur) · S83-3 MAIN-CLONE-QUIET (her yazma adlı
worktree'de; merged worktree'ler budanır) · ÖNCÜL #24 (reconciler log satırı
kendi mekanizmasını kanıtlar; S80-3 her kural değişikliğinde SORULUR:
"yayınlı anahtar mı? → republish şart") · BLOK FORMATI: şeride giden her
metin `>> BLOCK: hedef << … >> BLOCK END <<`.

## §F · CANLI NÖBETLER (pasif, Architect okur)
- BUG-032 P1/P2: ilk gerçek başarısız turda [MemoryWrite] outcome=failed +
  sonraki turda sunulmama + başarılının sunulması (S66-1).
- STEP-EFFICIENCY referans çifti hazır: `910675a7` (calls=8) vs `d94bcfc3`
  (calls=5, conv=1) — 2F.3 geldiğinde ilk örnek.
- W-020 R1/R2 uygulaması AG-temp'te: PAT silindi mi (printenv=0 + hook hâlâ
  sorar), takım settings.json göçü yapıldı mı — sahibe SOR.

## §G · ŞERİT DURUŞU
AG-1 boşta · AG-2 FIX-1 sonrası boşta · Operator soğuk (republish (b) seçilirse
ısınır) · paralellik yalnız ölçülmüş dosya-ayrıklığıyla · merge sırası
Architect'te, tek tek · son-merge-eden reseal'i birleşik ağaçta koşar.

<!-- END v84 -->
