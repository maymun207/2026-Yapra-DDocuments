S117 ACILIS PROMPTU — asagidaki blogu yeni oturumun ILK mesaji olarak yapistir
(Desktop oturumu; S116 kapanis zemini; FABRIKA TESTI bu oturumda)

---

S117 açılıyor. Rolün: Architect (cwf_yaprak). Zemin: S116 kapanışı, master floor 4408fd88 (ci-diet/drain inişleri sonrası oynamış olabilir — tel kazanır).

SIRAYLA YAP, atlamadan:

1. BOOTSTRAP: proje kutusundan cwf-memory-seed-CWF5-v2'yi (v1'i geçersiz kılar) ve CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v117'yi oku. Taze klonda ÇAPA tablosunu doğrula: master full-sha teldeki değerle; üç boot'ta tel-kontrol satırı + ritüel; land.ts'te FACTORY-NOT-READY + ölçülmüş-soy beklemesi; mail-wait'te BOX_ADDR + --table-lens. Çelişki = bug kaydı, taze klon kazanır.

2. SOTA-1'i docs/laws/constitution/SOTA-1.md'den KELİMESİ KELİMESİNE ilk yanıtına yaz (S66-1).

3. CANLI DURUM: npm run architect:open (11 alan, [factory] dahil) + factory_state'i DB'den oku. Beklenen: mod SHUTDOWN ya da DRAINING (S116 kapanışı 15adbe81 olayıyla DRAINING yazdı; ustabaşı SHUTDOWN'ı tamamlamamış olabilir — ölç, varsayma). Şerit ref'leri: BOŞ beklenir; lane/AG-4 kalmış olabilir (S116'da penceresi erken kapandı) — ritüel süpürmesinin test vakasıdır, elle dokunma.

4. Bus'ı oku (relay_inbox): AG-5 kutusunda FACTORY-BOOT-1-AG5-PROOF-v1 taşınmış olarak durur (yeniden kapsamlandı: gerçek açılış onun sahnesi). CI-DIET-1'in inip inmediğini ölç (phase/ci-diet-1). Sabah 07:10Z budget-fence koşusu: yeşilse F-S115-BUDGET-FENCE-A3 CLOSED@evidence.

5. Oku: cwf-open-items-register-v120 · cwf-implementation-order-S116-v29 · REGISTER-BUG-BUCKET-v53 · CWF-SESSION-GRAPH-KB-v116 · CWF-S116-SESSION-CLOSE-v1.

6. FABRİKA TESTİ (bu oturumun ilk ölçümü — PLATINUM-BREACH-S116-1'in kabul testi): ben "fabrikayı başlat" deyip YALNIZ ustabaşı penceresini açacağım, HİÇBİR ŞEY YAPIŞTIRMADAN. Sen telden + DB'den izle: ritüel kendi kendine yürümeli (tel-kontrol → AG-5 claim → ölü ref süpürmesi [AG-4 dahil] → READY damgası → kutudaki PROOF kartını bulup doğum döngüsünü koşması → raporun master'a inmesi). GEREKEN HER YAPIŞTIRMA BİR DEFEKTTİR: kaydet, mazur gösterme. READY görülmeden hiçbir yeni kart dağıtma (yasa).

7. Test geçince v29 sırası: ① PROOF COMPLETE ilanı ② CI-DIET kapanışı ③ Kademe 3 dalgası (bağlam organı · arşiv otomasyonu · Operator boot'u repoya · takeover taşıma · MCP envanteri · model pin · eval-canary soruşturması · relay migrasyon drift'i · consumed_at yazma kanalı) — küçük kalemler TEK-DAL dalgaya.

DUR ve bekle KURALLARI aynen: hüküm bus'a, sohbete değil · her yanıt "SENİN AKSİYON MADDELERİN" ile biter · sahibe operasyon adımı yok (S102-YASA-1) · saatler sahibe HER ZAMAN TSİ · kutudaki her sayı iddiadır, telde/DB'de doğrula · nöbetlerini kendin kur (send_later; aktif zincirde ~10 dk).

İlk çıktın: SOTA-1 verbatim + çapa doğrulaması + factory_state canlı okuması + fabrika testinin bekleme sözleşmesi. Başla.
