Beş ilgili test dosyasındaki 105 test geçti. Mevcut davranış doğrulandı; asıl eksikler A26’nın önerdiği geçişlerde. Özellikle grounding.ok yanıtın sayısal doğruluğunu garanti etmiyor ve snapshot geri yüklemesi silinen episode’ları yeniden oluşturabiliyor. Bulguları önem sırasına göre, her biri için düzeltme önerisiyle hazırlıyorum.







Dokümanın ana yönü doğru; ancak mevcut haliyle uygulamaya doğrudan geçirilecek kadar tamamlanmış değil. Özellikle başarı etiketleri, silme/geri yükleme ve kabul ölçümleri konusunda önemli boşluklar var.
Workspace’in ee12161e sürümünü inceledim; dokümandaki daha yeni 6a3824c2 referansını da Git geçmişinden karşılaştırdım. Canlı veritabanına bağlanmadığım için “83 episode”, yayımlanmış ayar değerleri gibi canlı ölçümleri doğrulamadım.
Önem sırasına göre bulgularım:
1. Kritik — “Başarı sinyalini doğru yapma” hedefi için seçilen veri kaynakları yeterli değil.
   §4.2 ve A26-P1, telemetry_events + episodes.decision.outcome kaynağını kararlaştırılmış gösteriyor. Oysa mevcut tool_call kaydında çağrıyı episode ile kesin eşleştirecek callId ve isEmpty gibi gerekli alanlar yok. Aynı aracın paralel veya tekrarlı çağrılarında isim/zaman üzerinden eşleştirme güvenilir olmaz. [Kayıt noktası (line 1771)](/Users/tunckahveci/Desktop/2026 DESKTOP/2026 - YAPRA/2026 - Yapra -  Codes/cwf_yaprak/api/cwf/_lib/turn/stageTools.ts:1771).
   Daha önemlisi, grounding.ok=true, cevabın doğru olduğu anlamına gelmiyor. Sayısal iddiaların kaynak kontrolü ayrı hesaplanıyor ve ok sonucuna dahil edilmiyor. Kod, “uydurulmuş sayılar varken ok:true” durumunu açıkça tanıyor. [Grounding hesabı (line 619)](/Users/tunckahveci/Desktop/2026 DESKTOP/2026 - YAPRA/2026 - Yapra -  Codes/cwf_yaprak/api/cwf/_lib/grounding/groundingCheck.ts:619).
   Düzeltme: Her label alanı için kaynak, hesaplama, eksik veri davranışı ve sürüm belirtilmeli. Ortak call_id, çağrı sonuçları ve kayıt bütünlüğü zorunlu olmalı; kanıt eksikse sonuç UNKNOWN kalmalı. Mevcut groundingOk, yeni grounded/cited bitlerinin yerine geçirilmemeli.
2. Kritik — UNKNOWN durumundaki örnekler öğrenme kapısından geçebiliyor.
   §4.2’de example uygunluğu için no_correction ≠ false yazıyor. Bu koşul UNKNOWN değerini de kabul eder. §5 ise pencere kapanana kadar bunun kesinleşmemiş olduğunu söylüyor.
   Sonuç: Kullanıcının düzeltmesi gelmeden örnek uygun sayılabilir; N/M/K de sağlanmışsa yayımlanabilir.
   Düzeltme: Yayımlama koşulu açıkça settled/finalized durumu ve kabul edilen no_correction değeri üzerinden kurulmalı. Zaman aşımında “düzeltme gözlenmedi” ile “başarı doğrulandı” ayrılmalı; sonradan gelen düzeltmenin etkisi de tanımlanmalı.
3. Kritik — Silme kapsamı snapshot kopyalarını dışarıda bırakıyor.
   §6 ve §9a-c silme zincirini anlatıyor; fakat mevcut snapshot’lar episode ve semantic memory satırlarının tam kopyalarını içeriyor. Restore bu satırları yeniden ekliyor. Dolayısıyla episode sil → eski snapshot’ı geri yükle işlemi silinen belleği geri getirebilir. [Restore SQL (line 258)](/Users/tunckahveci/Desktop/2026 DESKTOP/2026 - YAPRA/2026 - Yapra -  Codes/cwf_yaprak/supabase/migrations/20260812160000_restore_where_true.sql:258).
   Ayrıca iki kullanıcıdan öğrenilen bir satırda bir kullanıcı silinirse kanıt tamamen boşalmaz; fakat K_users≥2 artık sağlanmaz. Doküman bu ara durumun davranışını belirtmiyor.
   Düzeltme: Snapshot, dışa aktarımlar ve restore sırasında silme kaydının uygulanması kapsama alınmalı. Silinen veya geri çekilen içeriğin kullanımını hemen durdurmak ile kalıcı bundle rollback onayını beklemek ayrı işlemler olmalı.
4. Yüksek — Append-only evidence ile mevcut snapshot sözleşmesi uyuşmuyor.
   §6, trace_label ve learned_proposals snapshot kapsamına girsin ama restore bunları silmesin diyor. Mevcut ADR-014 ise aynı tablo kümesini “snapshot alır, wipe boşaltır, restore doldurur” şeklinde tanımlıyor. [ADR-014 (line 22)](/Users/tunckahveci/Desktop/2026 DESKTOP/2026 - YAPRA/2026 - Yapra -  Codes/cwf_yaprak/docs/adr/ADR-014-persistence-class-taxonomy.md:22).
   Bu nedenle iki tablo eklemek yeterli değil. Mevcut importer yeni tabloları taşımayan eski snapshot dosyalarını da reddeder. [Importer kontrolü (line 99)](/Users/tunckahveci/Desktop/2026 DESKTOP/2026 - YAPRA/2026 - Yapra -  Codes/cwf_yaprak/api/cwf/_lib/learning/snapshotEnvelope.ts:99).
   Düzeltme: Persistence sınıfları, append-only kayıtların birleştirilmesi, restore çakışmaları ve eski snapshot uyumluluğu aynı geçiş planında çözülmeli.
5. Yüksek — Mevcut semantic_memory, dokümandaki tarihli gerçekler modeli değil.
   Bugünkü tablo kullanıcı–varlık etkileşim istatistiklerini tutuyor: kullanım sayısı, görev ve zaman ifadesi dağılımları, procedure referansları. {entity, predicate, value} biçiminde doğrulanmış gerçekler saklamıyor. [Mevcut veri modeli (line 55)](/Users/tunckahveci/Desktop/2026 DESKTOP/2026 - YAPRA/2026 - Yapra -  Codes/cwf_yaprak/api/cwf/_lib/persistence/repositories/SemanticMemoryRepository.ts:55).
   Bu yüzden “bi-temporal kolonlar ekle” ifadesi geçişi eksik tarif ediyor. Aynı varlığın farklı özellikleri ve geçmiş sürümleri için yeni kimlik/benzersizlik modeli gerekiyor. Mevcut satırların backend/tenant kapsamına nasıl bağlanacağı da çözülmeli.
   Düzeltme: Kullanım istatistikleriyle gerçek kayıtlarının ayrı tutulacağı veya dönüştürüleceği açıkça seçilmeli. Ayrıca observed_atın anlamı netleştirilmeli: “gerçeğin geçerli olduğu zaman” ile “sistemin bunu öğrendiği zaman” ayrı sorgulanabilmeli. Yalnızca valid_to güncellemek geçmiş bilgi durumunu yeniden kurmaya yetmez.
6. Yüksek — E5 metriği, izin verilen değişikliği ölçmüyor.
   P9 ve §8, hafızanın yalnız ORDER, yani sıralama üzerinde etkili olacağını söylüyor. §4.3 ise hafızanın offered set’e ekleyebileceği, listede bulunmayan araçları ölçüyor.
   Sıralama değiştirmek listede olmayan aracı ekleyemez. Ayrıca “sonunda başarılı cevapta kullanılan araç” ölçütü, mevcut akışta hiç keşfedilemeyen araçları göremez.
   Düzeltme: İki ölçüm ayrılmalı: mevcut küme içindeki sıralama kalitesi ve küme dışında kaçırılan araç fırsatları. İkincisi için bağımsız doğru-araç etiketleri veya tanımlı bir keşif ölçümü gerekir.
7. Yüksek — MEMORY-1 kabul kriterleri henüz hesaplanabilir değil.
   CWF’ye özel yeni bir görev kümesinde “median üzeri / üst çeyrek” deniyor; fakat hangi sistemlerin, hangi model ve bütçeyle elde ettiği dağılımın kullanılacağı belirtilmiyor. Orijinal LongMemEval farklı bir sohbet geçmişi değerlendirmesi olduğundan, onun yüzdelikleri yeni CWF kümesine doğrudan taşınamaz. LongMemEval tanımı.
   Üstelik atıf verilen mevcut scorer, cümlede iddia ve belirsizlik ifadesi arıyor; doğru tarih, güncel değer veya çok oturumlu çıkarımı doğrulamıyor. Aynı cümlede bir belirsizlik ifadesi varsa ihlali kaldırıyor. [Scorer (line 155)](/Users/tunckahveci/Desktop/2026 DESKTOP/2026 - YAPRA/2026 - Yapra -  Codes/cwf_yaprak/api/cwf/_lib/replay/examScorers.ts:155).
   Düzeltme: Referans sistemler, görev sayısı, doğru cevaplar, scorer sürümü ve eşikler önceden sabitlenmeli. “Belki X” şeklindeki temelsiz cevap, doğru abstention olarak geçmemeli.
8. Yüksek — Paraphrase, PII kontrolünün alternatifi olamaz.
   §9a-a, ölçülmüş Türkçe PII temizleyicisi yoksa paraphrase kuralının tek başına kalmasına izin veriyor. Oysa yeniden ifade edilmiş bir cümle isim, kimlik bilgisi, müşteri veya tesis sırrını aynen koruyabilir.
   Düzeltme: Paylaşılan öğrenmeler için yayımlanabilecek alanlar sınırlandırılmalı; kullanıcıya özgü değerler genelleştirilmeli ve çıktı ayrıca denetlenmeli. Denetim yoksa no_pii=true üretmek yerine aday özel kapsamda tutulmalı veya yayımlanmamalı.
9. Orta–yüksek — “Yalnız yayımlanmış veri” kuralının kapsamı belirsiz.
   §4.2, stage 07/03/planner’ın yalnız yayımlanmış satırları okuyacağını söylüyor. Mevcut planner ise kullanıcı episode’undan gelen offeredRoutine değerini doğrudan derivePlan içine alıyor. [Mevcut yol (line 563)](/Users/tunckahveci/Desktop/2026 DESKTOP/2026 - YAPRA/2026 - Yapra -  Codes/cwf_yaprak/api/cwf/_lib/turn/memoryRetrieve.ts:563).
   Doküman bu yolu başka yerde kabul ediyor ama istisnalar arasında açıkça düzenlemiyor.
   Düzeltme: Kuralın paylaşılan öğrenilmiş politikalar için mi, kullanıcıya özel hatırlama için de mi geçerli olduğu belirtilmeli. Mevcut episode→frame ve routine→planner yollarının korunacağı, kapatılacağı veya gate’e taşınacağı adlandırılmalı.
Bunlara ek olarak yeni sürümde şu bağlantılar tamamlanmalı:
- Feedback geçişi: Mevcut markReviewed yalnız incelendi işareti koyuyor. Yeni reason/label yazımı, yetkileri ve mevcut feedback izolasyon testinin nasıl değişeceği belirtilmeli. [Mevcut sözleşme (line 6)](/Users/tunckahveci/Desktop/2026 DESKTOP/2026 - YAPRA/2026 - Yapra -  Codes/cwf_yaprak/api/cwf/__tests__/feedbackPipelineIsolation.test.ts:6).
- Sentetik kabul testi: Testler sentetik kimlikle çalışacakken label/extractor sentetik aktörleri reddediyor. Gerçek öğrenme zincirinin yalıtılmış test kapsamında nasıl çalıştırılacağı tanımlanmalı.
- Doküman bütünlüğü: v0_1e devredilen bölümler ve belirsiz §12.6, §13.3/13.4 referansları dosya/sürüm bağlantılarıyla tamamlanmalı. Track 0 hem tamamlanmış hem açık iş olarak listeleniyor.
Korunmasını önerdiğim kararlar: Çağrı bazında değerlendirme, insan geri bildiriminin gözlenen gerçeği değiştirmemesi, ortak publish/rollback yolu, hafızanın yetki verememesi ve “helped” iddiasının kanıt gerektirmesi.
İlk revizyonda önceliğim 1–4 numaralı bulgular olurdu. Bunlar kapanmadan öğrenmeyi açmak, yanlış başarı sinyalini kalıcılaştırabilir veya geri çekilmiş belleği yeniden devreye sokabilir.
İlgili beş test dosyasındaki 105 test geçti. Bu sonuç mevcut uygulamayı kapsıyor; önerilen A26 akışının doğrulandığı anlamına gelmiyor. Proje dosyalarında değişiklik yapmadım.


6:12 AM

























Ask for approval

Select effortGPT-6 AstraUltraNoneMinimalLightMediumHighExtra HighMaxUltraPersistent
    IDE context











Work locallyLocal