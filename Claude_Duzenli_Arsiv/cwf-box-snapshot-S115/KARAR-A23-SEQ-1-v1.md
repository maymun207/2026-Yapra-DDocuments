# KARAR-A23-SEQ-1 · v1 — A23 §9 sıralama hükmü (sahip, S103)

<!-- KARAR-A23-SEQ-1-v1 · 2026-08-17 · Sahip hükmü, verbatim + bağlayıcı sıra +
     takip telleri. Bu belge #29 faz kartlarının ZORUNLU girdisidir. S37-1:
     düzeltme = yeni sürüm. -->

## §1 · HÜKÜM (verbatim)
Architect'in tespit ettiği iç gerilim: A23 v1_3 §9 adım-3 τ/β'yı kurarken
adım-4 ikinci kanalı ekliyor; A-7 ise "τ/β yalnız-DL üstüne kurulmaz" diyor.
Sahibin cevabı (S103, verbatim): **"(a):kanal-2 one, (b) makine once."** ve
onay + takip emri (verbatim): **"Onaylıyorum, ve bunun MUTLAKA implement
edildiğini tazı gibi arkasında koşup emin olmanı istiyorum!"**

## §2 · BAĞLAYICI SIRA (hükmün sentezi — sahip onaylı okuma)
Makine önce, kanal-2 kalibrasyondan önce:
1. **Adım 3 = ⑤/⑥ MAKİNESİ** — üçlü teşhis (LINK/NIL/AMBIGUOUS) mevcut
   kademe-hükümleri üstünde kurulur; taşıyıcılık + üç davranış + kapsam
   kapısı + atıf + çapraz-tur taşıyıcı. **τ/β governed param olarak DEKLARe
   edilir, KALİBRE EDİLMEZ** (skor uzayı henüz tek kanal).
2. **Adım 4 = KANAL-2** — ④'e BM25 + RRF füzyonu; s₁/s₂ skor uzayı doğar.
3. **τ/β KALİBRASYONU** ancak kanal-2 CANLI + L5 miss-ledger verisi varken
   yapılır (adım 5 ile birlikte). A-7 böylece İNŞA GEREĞİ korunur: τ/β
   hiçbir anda yalnız-DL üstüne kalibre edilmiş olamaz.

## §3 · v1_4 AMENDMENT KAPSAMI (bu hükmün eve işlenişi)
A23 ana belgesi LOCKED; değişiklik v1_4 mint'iyle olur (asla in-place):
(a) §9 tablosu bu KARAR'ın §2 sırasıyla yeniden yazılır ve satıra
"KARAR-A23-SEQ-1" atfı girer; (b) A-7'ye çapraz-atıf eklenir; (c) END
satırındaki kardeş atfı düzeltilir — `turn-sequence-target` son sürümü
**v1'dir** (dosyanın kendi footer'ı "amendments mint v1_1" der; v1_1 hiç
mint edilmedi; ana belgenin "v1_1" ataması ileri-atıf hatasıdır —
F-A23-SIBLING-REF-MISMATCH, DÜŞÜK, burada kapanır); (d) changelog satırı.

## §4 · TAKİP TELLERİ ("tazı" mekanizması — dört tel, hepsi adlı)
- **W1 · FAZ KİLİDİ:** #29'un İLK faz kartının PRECONDITION satırı şunu
  taşımak ZORUNDADIR: "A23 v1_4 kutuda mevcut ve §9'u KARAR-A23-SEQ-1 §2
  sırasını taşıyor; değilse kart geçersizdir, kesilemez." Amendment yoksa
  faz açılamaz — takip umuda değil kapıya bağlandı.
- **W2 · SIRA GÖRÜNÜMÜ:** implementation-order v17'den itibaren #29 satırı
  "KARAR-A23-SEQ-1 bağlayıcı" etiketini taşır.
- **W3 · REGISTER:** v107'den itibaren sahip-hükümleri bölümünde bu KARAR
  adıyla yaşar; yalnız CLOSED@v1_4-mint ile düşer.
- **W4 · AMENDMENT İZİ:** v1_4'ün kendi changelog'u bu KARAR'ı adıyla anar;
  böylece belgeyi tek başına okuyan da hükmün kaynağını görür.

<!-- END · KARAR-A23-SEQ-1-v1 -->
