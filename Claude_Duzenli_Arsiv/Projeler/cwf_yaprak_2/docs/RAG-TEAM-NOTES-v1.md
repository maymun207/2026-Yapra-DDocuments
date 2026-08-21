# RAG-TEAM-NOTES · v1 · 2026-08-01 (S75 canlı test bulguları)
<!-- Relay: owner → RAG service team. CWF tarafı: Architect (Claude). -->

## Önce iyi haber
Servis CWF'ye backend olarak katıldı ve canlı üretimde ÇALIŞIYOR: 5 araç
keşfedildi, salt-okunur yüzey doğrulandı, gerçek sorgular doğru cevap +
kaynak künyesiyle döndü. `knowledge_search` chunk'larının doküman-no/rev/
bölüm-yolu taşıması attribution zincirimize birebir oturdu — bu tasarımı
koruyun, üzerine inşa ediyoruz.

## Bulgu 1 — Paralel çağrıda oturum/bağlantı sorunları (ÖNCELİKLİ)
Model bazen 2 aracı AYNI ANDA çağırıyor (ör. knowledge_count + knowledge_list,
veya 2× knowledge_search). Bu durumda iki ayrı hata gördük, verbatim:

a) HTTP 400 — `{"jsonrpc":"2.0","error":{"code":-32000,"message":"Bad
   Request: Server not initialized"},"id":null}`
   (knowledge_count, paralel knowledge_list başarılıyken; 17:15Z)

b) `connect timed out after 60000ms` — birden çok kez, retry zincirimiz
   (150ms/300ms backoff, 3 deneme) sonunda kurtardı ama tur gecikmesi ağır
   (17:33Z turu).

Görünüm: streamable-http oturumu eşzamanlı isteklerde ya initialize
edilmemiş sayılıyor ya da bağlantı havuzu tükeniyor. Rica: eşzamanlı istek
altında oturum yaşam döngüsünü ve kapasiteyi inceleyin; beklenen davranış
"N paralel çağrı = N bağımsız başarılı cevap".

## Bulgu 2 — KB içerik hijyeni
İki ayrı sınıf test verisi üretim sorgularına karışıyor:
- Yapısal varlıklar: `Granit-Deneme`, `Mengil-Deneme`, `Örnek Fabrika 1`
  (mengil parametre 4 vb. dahil) — gerçek sorgu sonuçlarında görünüyorlar.
- Doküman korpusu: tamamı yabancı-domain demo içerik ("Ana Fabrika Ankara",
  "Yedek Parça Fabrikası Bursa", CNC hatları, HP-250T hidrolik pres,
  SOP-CNC-001, BK-HYD-003, SD-2025-07...). Test için anlamlı; ancak gerçek
  Kale Seramik dokümanları yüklenene dek her doküman cevabı bu içerikten
  gelecek. Rica: (a) yapısal test varlıklarının temizlik planı, (b) gerçek
  doküman yükleme takvimi.

## Bulgu 3 — Bilgilendirme (aksiyon istemez)
- Şema değişikliğinizi (ad-tabanlı zorunlu seçiciler + opsiyonel UUID id
  alanları) kendi prompt katmanımıza işledik; `factory_id` alanına kısa kod
  yazma eğilimini de kendi tarafımızda düzeltiyoruz.
- `knowledge_search`'ün yapısal sorguları lookup araçlarına yönlendiren
  açıklaması çok işe yarıyor — bu sınıf "prescriptive description" pratiğini
  diğer araçlarda da öneririz.

<!-- END · RAG-TEAM-NOTES-v1 -->
