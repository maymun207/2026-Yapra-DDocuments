# CWF — Session Graph KB · v83

<!-- CWF-SESSION-GRAPH-KB-v83 · 2026-08-06 · S82 kapanışı · Architect: Claude (Opus 5).
     v82'yi amend eder. S82'nin hikâyesi, taşınan cümleler, çözülmemişler. -->

## S82 tek paragrafta

İki günde tüm bug listesini kapatma emriyle başladı, çift AG şeridine geçti, ve ajanın
*çökme* sınıfı arızalarını canlıda bitirdi: burst (semafor sıraya koydu), token patlaması
(tavan durdurdu ve söyledi), şema tahmini (overlay + repair), görünmeyen grafik (üç kopuk
halka). Yedi merge, bir Operator yayını, üç yeni yasa. Sonra en önemli bulgu geldi — sahip
fark etti, Architect iki mesaj yanından geçmişti: **sistem temiz bağlamda çalışıyor, kendi
başarısızlıklarıyla kendini zehirliyor.** `conv=0`→8/8 başarı, `conv≥1`→8/8 başarısızlık.

## İpler ve nereye vardıkları

**GATEWAY-BURST-GUARD-1.** Ajan 19 paralel istekle müşterinin Superset'ini devirdi, tek
soruda 312.823 token. Fren üç ayrı şafta bindi. Sahip 450K önerisini geri çekti ("aynı
kalsın 300K"). F185'ten ilanlı sapma: güvenlik çiti fail-closed. Semafor REDDETMEZ,
SIRAYA KOYAR — yedi çağrılık meşru yelpaze yapısal olarak sağ çıkar.

**BURST-GUARD-1-FIX-1.** Fren ateşledi ama kullanıcıya söylemedi — çip her turda ölüydü,
23 test yeşilken. **S82-5 doğdu:** payload alanı yüzey değildir; test parser'dan girer.
İki istemci sekmesi de (`cwfService`, `cwfStore`) alanı adıyla taşımıyordu.

**TOOL-EARNED-TRUST-1.** Architect'in öncülü YANLIŞTI — "input_schema aynada dolu" ARMES
için doğru (150/150), gateway için yanlış (22/22 sadece hint). Faz v2'ye döndü: overlay
(bilgi önde) + repair (kaçanı yakala). Repair `experimental_repairToolCall`'da DEĞİL
(SDK'nın kendi validation'ını görür), stage-7'de. 32 örnek (7 değil). C sınıfı BUG-020'nin
kökeni: `op` yerine `opr`, iki karakter. Operator 9 overlay yayınladı.

**RESULT-BUDGET-1.** Guard çağrı ekseninde (40k/çağrı), zarar tur ekseninde. `turn.
resultCharBudget=120000` + sayaç → mevcut tier-3a STORED yoluna page-out. Architect'in
brief'i ölçümle ters çevrildi: byte-identical tier-3a küçük sonuçları BÜYÜTÜYORDU (1.51×);
turn-axis sample 5 kayda kapandı.

**UNIT-TRUTH-1.** Sayı doğru, her başlık tahmin. Birim kaynaktan türer (`display_name`,
alan adı ekleri), yoksa "kaynakta belirtilmemiş". "Saat" tuzağı: yalın birim kelimesi bir
isimdir, silinmez.

**PROSE-RENDER-PARITY-1.** Render katmanı zaten biliyordu ve sustu. 023+027+028+029 tek
fazda başladı; 028 kaynak düzeltmesi gerektiği, 029 dil dikişi olmadığı için SIGNAL-SOURCE'a
ayrıldı.

**VIZ-GATEWAY-BINDING-1.** Veri ekranın kapısına üç kez geldi. Kusur: binding
`toolName==='call_tool'` ile iç araç adını eşleştiremiyordu. Üç kopuk halka. Beş çubuk
ekranda — sahibin kabul ölçütü karşılandı.

**Ve sonra: CONV-POISONING.** Sahip son 5 dakikaya bakmamı istedi ve deseni gösterdi.
İki grafik tuzağı (85 vs 94, "sarfiyat" vs "sarfiyatı") üstüne, asıl sebep: aynı sohbette
bir başarısızlık, sonraki turu zehirliyor. Sistem patlamıyor ama tutarlı değil.

## En iyi an: sahibin son-5-dakika sezgisi

Architect "model kararsız" diye geçiştirdi — bir teşhis değil, teşhisin yokluğu. Sahip
"bu yetmiyor bana, anlamıyorum" dedi ve son turlara bakmamı istedi. Log 8/8 deseni verdi.
**Sahip patterni gördü, Architect kaçırmıştı.** S82'nin en değerli anı bu.

## Taşınan cümleler
- *Deploy READY ≠ kullanıcı yeni kodu koşuyor.* İstemci-fix kanıtı sert yenilemeden sonra
  alınır.
- *Bir payload alanı bir yüzey değildir* (S82-5).
- *Çalışma klasörü kaynak değildir; dal tabanı KANITLANIR* (S82-4).
- *Pozitif kontrolü tatmin eden yer tutucu o kontrolü devre dışı bırakır* (S82-3).
- *Olması gereken her şey en başta, en ince ayrıntısına kadar* (S82-6, sahip yasası).
- *Kontrol karakterini düzyazıya yazma — tarif et* (F-2 dersi).
- *Sistem kendi başarısızlıklarıyla kendini zehirliyor* (conv-poisoning).

## Sahibin hükümleri (S82)
§BUG verbatim kopyalanır · BUG-006 preview'da · RAG devam · G6 credential-untested kapanış
+ BUG-014 açık · tavan 300K totalTokens · OPA (ii) adlı önkoşul · BUG-020 birim kanıt yeter
· BUG-005 en son (proje kapanışı) · SEMANTIC-MEMORY tetiği çekildi · SUCCESS-ONLY-RECALL
yeni 1. sıra.

## Çift şerit dersleri (yeni)
İki AG şeridi (AG-1/AG-2) · her şerit kendi adlı worktree'sinde (`cwf-<faz>`) · ana klasör
hiçbir şeridin cwd'si değil · merge sırası Architect'te, tek tek, asla paralel · şerit
çakışması OKUMAYLA doğrulanır (dokunulan dosya listesi) · `chatSurface.ts` tek paylaşımlı
risk, ADD-only kuralıyla tutuldu.

## Taşınan, çözülmemiş
- conv-poisoning taşıyıcı ayrımı (hafıza vs pencere) — ölçülecek.
- 023/027 panel-nesir paritesi canlı okuma.
- 025/026 canlı okuma.
- RAG dış ekip cevabı (iki tarih).
- SOTA ölçümü (Blok 3) HİÇ başlamadı — 2.2a/2.3a önkoşul.
