# CWF-S170-PLAN-v1 — A25 + A26 %100 PLANI (tek yol)
Architect, S170, 2026-10-01 09:40 TSİ (06:40Z). Yetki istenen: OWNER-DESIGN-S170-PRIORITY-1 altında TEK onay ("onay S170-A"). CWF-S170-OPEN-ITEMS-TABLE-v1 §K'nın YERİNE GEÇER; tablonun geri kalanı (A–J) geçerlidir.

## 0 · ÖLÇÜLEN DURUM (06:30Z)
- master 648c61d6384942ab532444be252422ed9e37c02b (PR 672). Vercel production READY en son ae766b56 (671) için ölçüldü; 672'nin deploy'u ÖLÇÜLMEDİ.
- **209 CLOSED@canlı kanıt:** migration 20261001060000 uygulandı (schema_migrations 1 satır; operatör ekranı 09:24 TSİ; Architect 06:28Z'de yeniden okudu). Canlı fonksiyon üç probe: PICKED-UP satırını onay gösteren EXEMPT mühür → `AG006: the seal's acknowledgement is a PICKED-UP row, not a verdict`; gerçek scout hükmünü gösteren mühür → kabul (null); var olmayan satır → AG006. anon/authenticated execute = false/false.
- **A25 inenler (6):** R6(g) 625 · E1-c 628 · E1-b 633 · E1-a 635 · K32 638 · K41 645. **30 Eyl 06:16Z'den beri A25 inişi: SIFIR.**
- **A26 inenler (5):** M1 641 · M2 644 · M1B 647 · M4a 648 · M3 650. A26 P-hattı (P1–P4) BAŞLAMADI; 210/211/212 register'a hiç girmemişti (F-S170-S164-TABLE-ROWS-NOT-CARRIED-1).
- **S165–S170'in 19 inişi:** A25 0 · A26 3 · ürün kusuru 2 (SD1, SD2) · fabrika 14. Ölçülen A25 hızı (27–30 Eyl, şeritler paylaşımlıyken): 1,5 kalem/gün.
- Şeritler: AG-1, AG-2, AG-4 ve scout-1, scout-2 bugün döngüde (kartlar 15–35 s'de alındı). AG-3'ün son otobüs satırı 04:47Z — döngüde mi ÖLÇÜLMEDİ (ilk boot ⚡'sı ile ölçülür).
- Bugün ölçülen hız: iki küçük kart v1 → scout → v2 → PR → master, 45 dakikada, paralel (çitler ayrık). Bu, orta boy A25 kartı için bir ÜST sınır değil, bir kanıt: paralel iniş çalışıyor.

## 1 · SAHİBİN SORUSU: "DOĞRU MU?"
Evet. İki ekle, ikisi de senin yasalarından:
- **SOTA-1:** v1'in tek kabul kriteri cwf-sota-definition'ın 16 kriteridir. A25 + A26 bunların ARACIDIR. Bir kriteri ikisi de karşılamıyorsa bunu bugün bilmeliyiz, sonda değil. Bu yüzden Architect bu oturumda (tur 5, şerit zamanı sıfır) cwf-sota-definition v1_5'i master'a karşı skorlar ve her kriterin yanına hangi A25/A26 kartıyla kapandığını yazar. 79 bu yüzden plandadır: belge için değil, hedefi ölçmek için.
- **Müşterinin gördüğü iki kusur** A25/A26 dışındadır: 13 converge ilişkilendirmesi (11 Eyl'den beri "bir okuma uzakta") ve 84 backend çökünce uydurma. İkisi de önce OKUMADIR (şerit yok). Okuma kart gerektiriyorsa sana adıyla söylerim; kuyruğa sen koyarsın.

## 2 · KALAN KAPSAM (kart sayısıyla; her yeni konu önce scout'a — 12.1, "kartların %50'si hatalı")
A25 (≈15 kart): E1-d (1, ⚡ harcama) · E2: 119 kayıt defteri → veri (1) · K33 kimlik + K35 trace v2 (1) · 40e router bütçeleri + K40 fren + ranking_policy (1, Rules UI ile) · K34 decideGoldenPublish + tool_experience view + K38 (1) · 168 model-metni yönetişimli ev + Superset literali (1, §13.1) · E3: shadow lens replay + per-backend Recall@k (1) · 97 anahtar kelime hijyeni + 105 T2 + 9/K36 kaçırma defteri (1) · 36 vektör + 40d BM25+RRF (1) · E4: K31/K39 ebeveyn→çocuk + 7 (1) · şirket katmanı veriye + 85 Graf KB tool_graph_node (1) · 10 zaman dilimi + K29 (1) · E5: MATRIX + IR enum + alias enum kaldırma (1) · HAND_PACKED_BACKENDS + 'machine-knowledge-base' kaldırma + 82 (1) · K-G sıfır kapısı silahlanır + son tarama (1).
A26 (≈10 kart): 210 PII dedektörü (1) · 211 M2B + 212 Δ-K1 (1) · 161 reg 60 (1) · P1a trace_label + current_label + canlı recall-aday günlüğü + store-time PII kancası (1, migration) · P1b düzeltme sözlüğü (yönetişimli) + aday çıkarıcı iskeleti (1) · P2a learned_proposals + uygunluk + N/M/K + §9a + silme defteri (1, migration) · P2b K34 genelleme + fixture backend'de ilk öğrenilmiş örnek + geri alma (1) · P3 containsAmong → stage 03 + bi-temporal + iki deneyim serisi (1, E4 ile aynı dikiş) · P4 gölge ORDER-lane recall + decay/zehirlenme (1, E5 ile) · M4b (1, 160 barı sonrası).
Toplam ≈ 25 kart + 4 sahip kapısı.

## 3 · DALGALAR (3 üretici şerit paralel, çitler ayrık; 2 scout: biri ön-inceleme, biri iniş)
| Dalga | Kartlar (şerit) | Hedef iniş |
|---|---|---|
| W1 (bugün, onayla başlar) | 119 E2 kayıt defteri → veri (AG-1) · A26-P1a trace_label + recall-aday günlüğü (AG-4, migration → operatör ⚡ aynı tur) · 210 PII dedektörü (AG-2) · AG-3 döngüdeyse 168 Superset literali (AG-3) | 1 Eki 20:00 TSİ |
| W2 (2 Eki) | K33+K35 · 40e+K40+ranking_policy · 168 (W1'de inmediyse) · 211+212 · E1-d (⚡ harcama) | 2 Eki |
| W3 (3 Eki) | K34+view+K38 · E3 shadow lens + Recall@k · 97+105+K36 · P1b · 161 | 3 Eki |
| W4 (4–5 Eki) | 36+40d · E4 K31/K39+7 · şirket katmanı+85 · P2a · P2b | 5 Eki |
| W5 (6–7 Eki) | 10+K29 · P3 · E5 MATRIX/IR/alias kaldırma · E5 HAND_PACKED+literal | 7 Eki |
| W6 (8–9 Eki) | E5 K-G sıfır kapısı silahlanır (= ARMES hardcode SIFIR, master'da yeşil) · P4 · M4b | 9 Eki |
Çıkış: K-G kapısı master'da yeşil + A26-P4 inmiş + SOTA skoru 16 kriterin her birinde kanıt ya da adlandırılmış açık. **Hedef: 9–10 Eki.** Bu bir ARGÜMANDIR (ölçülmüş 1,5/gün paylaşımlı hız → 4–6/gün tahsisli, paralel). Yanlışlayıcı: W1'in üç kartı 1 Eki 20:00 TSİ'ye kadar master'a inmezse tahmin yanlıştır ve W1'in ölçülen süresinden yeniden hesaplanır.

## 4 · YAPILMAYACAKLAR (adıyla ertelendi; S61-2 altında meşru çünkü hiçbiri bir SOTA kriterini ilerletmiyor)
216/217 · 208 BOOT-LANES-S170 (bir pencere döngüden düşerse o anda tek boot metni kesilir) · 207 merge queue · 192 graft yükseltme · 189/191 izin listesi (bir şerit bir istemde DURURSA o tek izin adlandırılmış istisna olarak aynı tur) · 15/16/18/23/31/32/33/35 · 64/66/71/158 · 146/147/149 · 55/56/17/67 kapanış kayıtları register'da (şerit zamanı sıfır).
Kural: bir fabrika kalemi ancak ölçülmüş bir inişi DURDURUYORSA kesilir, o da tek kart, adıyla.

## 5 · SAHİBİN KAPILARI (yalnız yargı ve tanıklık; tarih = ne zaman gelecek)
| Kapı | Ne | Ne zaman |
|---|---|---|
| ⚡ onay S170-A | bu plan | şimdi |
| ⚡ operatör | W1 P1a migration'ı (Gemini) | bugün, P1a inince |
| ⚡ harcama | E1-d üç sağlayıcı baseline, ateşleme başına | 2 Eki |
| ⚡ hüküm | 160 MEMORY-1 barı — Architect TEK önerilen barı yazar | 3 Eki |
| ⚡ hüküm | 167 K41 varsayılanı — scout'un sınav tablosundan | 3 Eki |
| ⚡ hüküm | 115-sınıfı tasarım soruları çıkarsa (E5 kaldırmada) | çıkınca |
| tanıklık | 131 pişmiş stok sorusunu yeniden sor | E4 indikten sonra (5 Eki) |
Başka hiçbir şey sana düşmez; düşerse PLATINUM ihlalidir ve adıyla yazılır.

## 6 · RİSKLER (dürüst)
1. **Sahip turu asıl tavan.** 20 tur/oturum; her dalga ~1 onay + ~2 operatör/hüküm turu ister. Günde 2–3 oturum sürerse plan tutar; 1'e düşerse 9 Eki kayar.
2. **%50 RED.** Scout ön-incelemesi her yeni konuda zorunlu; atlamak hız değil, yeniden iştir. Bugünkü iki kart bunun kanıtı (ikisi de RED geldi, v2 ilk seferde indi).
3. **E5 büyük patlama.** Kaldırma, E2–E4 yerinde değilse yönlendirmeyi kırar; E1-a sınav setleri geriye dönüşü ölçer. E5 kartları sınav setlerini zorunlu kılar.
4. **PII dedektörü** Türkçe metinde ölçülmüş recall ister; korpus yoksa önce korpus (W1'de scout bunu söyler). P2 ona bağlı.
5. **AG-3 belirsiz.** 3 yerine 4 üretici şerit W1'i bir gün kısaltır; ölçülene kadar 3 varsayılır.

END · CWF-S170-PLAN-v1
