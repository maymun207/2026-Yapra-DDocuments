# CWF — Open Items Register · v86

<!-- cwf-open-items-register-v86 · 2026-08-06 · S82 kapanışı · Architect: Claude (Opus 5).
     v85'i amend eder. §BUG artık VERBATIM taşınır (sahip hükmü S82 — D-003 discharged).
     Bu dosya REGISTER-BUG-BUCKET-v21'i tek kaynak olarak işaret eder; §3 aşağıdadır. -->

## §0 · FLOOR — her şey buna karşı okunur
- master `40085d62627d3277fb4cb2cb9251ec2c0296ca7c`
- 477 test dosyası · 67 migration · docVersion **rev 199** · 13 ADR
- üretim deploy `dpl_J2ioabsEVmrCdAcW2aBXD5uuRFgN` (branch=master)
- ikinci repo `mcp-honestbench` — `activeMode:null`

## §1 · S82 NE HALLETTİ
7 merge (`a9649019·114894a8·cba2af2c/95d8107·a24271d4/6244d3e·e0990df/57c4732·61bc83e/
75b2211·c8018e7/40085d6`) · 1 Operator yayını (9 overlay `9b1f2b7`) · 3 yeni yasa
(S82-3/4/5/6) · çift şerit düzeni kuruldu · **conv-poisoning keşfedildi.**

## §2 · KAPANANLAR (canlı kanıtla): BUG-020 · 021 · 030 ✅ tam · 023·024·025·026·027
merge'li, canlı okuma borçlu.

## §3 · İŞLEYEN KUYRUK = REGISTER-BUG-BUCKET-v21 §BUG.5 (VERBATIM)

> **Yeni 1. sıra `SUCCESS-ONLY-RECALL-1`** (conv-poisoning, BUG-032) → 2 `CHART-CANDIDATE-1`
> (BUG-031) → 3 `SIGNAL-SOURCE-1` (028+029, AG-1'de) → 4 UNIT-TRUTH canlı → 5 HEALTH-TRUTH
> canlı → 6 BUG-012 kapısı → 7 PROBE-PARITY+AUTO-SYNC → 8 FAULT-SWITCH-0 → 9 BUG-006+009 →
> 10 PROCEDURE-RECALL (2F.1) → 11 SEMANTIC-MEMORY (2F.2, sahip tetiği) → 12 STEP-EFFICIENCY
> (2F.3) → 13 015+016 kapıları → 14 BUG-017 lens → 15 PLANNER-0 (2F.4) → 2E kalemleri →
> **SON BUG-005.**

*(Tam §BUG.1–§BUG.6 içeriği için REGISTER-BUG-BUCKET-v21 birebir bu register'ın ekidir;
ayrı dosya olarak yüklenir ve bu satır onun otoritesini teyit eder.)*

## §4 · WAIT CONTRACT — kim neyi borçlu
- **RAG dış ekip:** `RAG-TEAM-NOTES-v2`'ye üç cevap (Bulgu 1 durumu · test-varlık temizlik
  tarihi · gerçek doküman korpusu tarihi). Bizi bloke ETMEZ.
- **conv-poisoning taşıyıcı deneyi:** `historyWindowN` 6→0 yayınla + aynı sohbette tekrar
  sor. `SUCCESS-ONLY-RECALL-1` §0'ın açılışı.
- **AG-1:** `SIGNAL-SOURCE-1` askıda + `chartId` alias notu.

## §5 · YASALAR (S82'de mintlenen)
- **S82-3** — pozitif kontrolü tatmin eden yer tutucu o kontrolü devre dışı bırakır; kapı
  başlığa değil, başlığın altındaki İÇERİĞE bakar.
- **S82-4** — dal tabanı `origin/master`'a eşit KANITLANIR, varsayılmaz; çalışma klasörü
  kaynak değildir.
- **S82-5** — payload alanı yüzey değildir; test parser'dan girer, elle kurulmuş nesne
  render'ı kanıtlar, yolu değil.
- **S82-6 (sahip yasası)** — olması gereken her şey en başta, en ince ayrıntısına kadar;
  "yetmezse açarız" sınıfı erteleme geçersiz. SOTA-1'in kardeşi.
- **İstemci-yenileme kuralı** — deploy READY ≠ kullanıcı yeni kodu koşuyor; istemci-fix
  kanıtı sert yenilemeden sonra.

## §6 · ARCHITECT ÖNCÜL DEFTERİ — S82
- TOOL-EARNED-TRUST §B0 öncülü yanlıştı (repository şeklinden yazdım, satırlardan değil) —
  S81-4. AG canlı okumayla yanışladı.
- GO'da "max 547 chars" türetilemez sayı yazdım (D-3) — AG düzeltti (addendum max 385).
- conv-poisoning'i "model kararsız" diye iki mesaj geçiştirdim — sahip deseni gösterdi.
- CHART-CANDIDATE'i birincil sebep sandım — asıl birincil conv-poisoning; sahip düzeltti.

## §7 · TRUE / NOT TRUE
**TRUE:** çökme sınıfı arızalar canlıda bitti · fren/overlay/repair/viz-binding üretimde
çalışıyor · çift şerit düzeni işledi.
**NOT TRUE:** "her soru her seferinde çalışıyor" (conv-poisoning) · "SOTA ölçüldü" (Blok 3
başlamadı) · "8 bug tam kapandı" (3 tam + 5 canlı-okuma-borçlu).
