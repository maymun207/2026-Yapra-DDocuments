# CWF-ROUTING-ARCHITECTURE-v2 — "Yetenek Yönlendiricisi" (Capability Router) · TASLAK v1 · S159

DURUM: TASLAK — scout hasım incelemesine ve sahibin hükmüne gidiyor. Kod DOKUNULMADI; bu belge hüküm almadan hiçbir kart kesilmez.
MEASURED-AT: 2026-09-26T16:31Z (bridge clock). Ölçüm kaynakları: master 2a6f6781b1a4748aac5f5bc7b1d73136863b1c35 (git show/grep, tracking ref = Vercel prod READY), canlı DB fjbrkimwvtpwoxhziidh (turn_trace_digest, domain_rules, messages), S158/S159 izleri, A24 v1_3 (sahip onaylı FINAL), RECON-A24-P1C-P2-S151-1-v1, CWF-ROUTING-DETERMINISM-EXPLAINER-S158-1.
TASARIM KAYNAĞI (S112-YASA-1, adıyla): OWNER-DESIGN-S159-1 — sahip, 2026-09-26 19:16 TSİ: "6×13 hard-kodlu çerçeve matrisi ve kodun içine sokulmuş sabit bloklar mimariyi çöpe çeviriyor; yeni bir backend (ör. finans) eklediğimde bu tablo her şeyi ARMES'e çevirecek; kendi kendine öğrenen, kendi kendine konfigüre olan, kendi kendine iyileşen bir yapı şart; kod öncesi doküman + plan + scout tartışması." Yanındaki Architect kör noktası A-REC-S159-1: A24 v1_3'ün "kelime listesi yönlendiricisi KALDIRILIR; hibrit retrieval; keyword yalnız merdiven tabanı" hükmü üç oturumdur yamayla (PR 620, keyword-floor kartı) geçiştirildi.
GEÇERSİZ KILACAĞI KARARLAR (sahip hükmüyle): OWNER-RULING-S140-K1-ORDER-CELL-HINT-1 ve IR-3 fazının "MATRIX router seçiminin yerine geçer" kuralı. KORUDUĞU KARARLAR: A24 v1_3'ün tamamı (K4, K6, K10, K12, K15, K17, K21, K23, K24, K26, K28, K29), AGNOSTIC-1, OWNER-RULING-S153-NO-ARMES-HARDCODE-1, OWNER-RULING-S156-DATA-BACKENDS-1, OWNER-RULING-S156-FAIL-CLOSED-1, empty≠zero, partial≠complete.

---

## 0 · Tek cümlede

Bugün soru→araç seçimi, kodun içine yazılmış bir seramik-MES sözlüğüyle (6 eylem × 13 nesne matrisi, ALWAYS_INCLUDE, sabit mesajlar) yapılıyor ve olasılıksal LLM seçimi, sahibin arayüzden girdiği deterministik kuralların ÜSTÜNDE duruyor. Hedef: hiçbir backend'in adının, kategorisinin veya nesnesinin kodda olmadığı; adayların VERİDEN (araç kartları) hibrit getirmeyle üretildiği; yönetişimli tabanın asla ezilmediği; her kararın izlendiği; yeni bir backend'in sıfır kodla yönlendirilebilir olduğu; yürütme sonuçlarından öğrenip kapılı yayınla kendini iyileştiren bir yönlendirici.

## 1 · Teşhis — ölçülmüş (bu haftanın dört tanığı)

Bugünkü boru hattı (stage 07, filterToolsByMessage, toolCategories.ts:1418–1944):
1. Router LLM (tek çağrı): kategori seçimi + IR çerçevesi (action ∈ 6 sabit, object ∈ 13 sabit — irFrame.ts:54–61).
2. `router.frameRouting=1` ve confidence HIGH → MATRIX[action][object] (deriveCategories.ts:63–92, sabit kod) router seçiminin YERİNE geçer. Hücre null → router seçimi kalır. AMBIGUOUS → birleşim.
3. Yönetişimli anahtar kelime eşleyici (matchCategories :1148) YALNIZ router susarsa (fallback) ya da PR 620 sonrası yalnız basis='frame' iken (yalnız matris-dışı kategoriler için) çalışır.
4. Sticky (önceki mesaj) + ALWAYS_INCLUDE {getFactoryList, getFactoryLines} (:1203, iki ARMES aracı kodda).
5. Cevap modeli sunulan kümeden seçer; fan-out sınırı yalnız araç bütçesi; bütçe dolunca sabit Türkçe mesaj (completionGuard.ts:228: "önce duruşlar, sonra fire").

Tanıklar:
- Sermaye sorusu (S158, 02:58Z): HIGH çerçeve QUERY_MASTER×SYSTEM → [admin]; MKB silindi; 0 araç çağrısı; kapsam reddi. Yama: PR 620.
- Personel sorusu (S159, 16:01Z): basis=keyword, router [employee, production]; MKB'nin yönetişimli "personel sayısı" anahtarı VARDI, kod bakmadı (yalnız frame yolunda bakıyor); 17 fabrika × getEmployeesWorkedBetween = 14 çağrı, bütçe doldu, 489.176 token, sabit "duruşlar/fire" mesajı. İki kez, deterministik.
- Q3 fire (S149): QUERY_EVENTS×LINE → [linestop, andon]; metric_registry'nin "fire→quality" ipucu yalnız QUERY_METRIC'te uygulandığı için scrap araçları sunulmadı.
- ARMES sayımı (S159): non-test kodda 71 dosya ARMES adı taşıyor; 22 üretim dosyası + 35 test dosyası MATRIX/çerçeve yönlendirmesine bağlı.

Yapısal neden (üç madde, hepsi kodda): (a) SÖZLÜK KODDA — nesne/eylem/kategori evreni bir tenant'ın MES'i; (b) OLASILIKSAL > DETERMİNİSTİK — LLM seçimi yönetişimli veriyi ezebiliyor (§8 kuralının tersi); (c) GERİ BESLEME YOK — yanlış seçim hiçbir yere yazılmıyor, hiçbir şey öğrenilmiyor (tool_experience yazılıyor ama yönlendirme okumuyor; CALLER-ABSENT sınıfı).

## 2 · İlkeler (pazarlıksız)

P1 · SÖZLÜK VERİDE. Backend adı, kategori adı, nesne türü, giriş aracı, mesaj metni — hiçbiri kodda değil. Kaynaklar: backends, backend_tools (ayna), domain_rules.*.tool_category / tool_annotation / tool_graph_node (role=entry vb.) / metric_registry / prompt.segment, backend_entity_layers, araç kartları (A24 ⑦-⑧). Kod yalnız MEKANİZMA taşır.
P2 · DETERMİNİSTİK TABAN ASLA EZİLMEZ. Yönetişimli bir eşleşme (anahtar kelime, metrik ipucu, varlık katmanı) HER yolda aday kümesine GİRER; LLM ve retrieval yalnız EKLER ve SIRALAR, asla yönetişimli bir adayı düşüremez. (§8: deterministik/otoriter vs yumuşak/öğrenilmiş.)
P3 · HER SUNULAN ARACIN BİR NEDENİ VAR. Stage 07 çıktısı araç başına nedenini (keyword / retrieval skoru / ipucu / katman / sticky / entry / search) basar (K24 uzantısı). Neden yoksa araç sunulmaz.
P4 · YENİ BACKEND = SIFIR KOD. A24 ④-⑨ onboarding'i (ayna, yuva çıkarımı, korpus sondası, profil, kart, kodlama) tek başına yönlendirilebilirlik verir. Kabul testi: sentetik bir "finans" backend'i (30 araç) eklenir; hiçbir kod dosyası değişmeden soruları doğru araçlara gider.
P5 · KENDİ KENDİNİ İYİLEŞTİRME KAPILIDIR. Yürütme sonuçlarından üretilen her öneri (anahtar kelime, açıklama düzeltmesi, sıralama önceliği, anti-pattern) TASLAK satırdır; golden kapısı + sahip arayüzü ile yayınlanır; provenance taşır; geri alınabilir; şemayı değiştirmez (K23, K12). Sessiz öğrenme yoktur.
P6 · FAIL-CLOSED, EMPTY≠ZERO, PARTIAL≠COMPLETE yönlendirmede de geçerli: katalog okunamıyorsa "yönlendirme ÖLÇÜLMEDİ" damgası; sıfır aday ≠ katalog boş.
P7 · FAN-OUT PLANLA ÖNLENİR, BÜTÇEYLE DEĞİL. "Toplam personel" gibi bir soru 17 fabrikaya tek tek gitmez: planlayıcı (K26) toplulaştırıcı aracı bulur ya da düz Türkçe, veriden gelen bir mesajla durur.
P8 · KAÇIŞ KAPISI HER ZAMAN AÇIK: `search_tools` meta-aracı her turda sunulur (progressive disclosure); model sunulmayan bir aracı arayabilir; her arama iz bırakır ve öğrenme döngüsüne girer ("sunulmalıydı" sinyali).

## 3 · Hedef mimari — dört katman + öğrenme döngüsü

### L0 · Katalog (veri, backend-agnostik)
- Her araç için bir KART (A24 ⑦-⑧): name, backend_id, description (ham + profil: when-to-use, not-for), slots (required/optional, tür: entity-ref@layer | time-range | enum | free-text), read/write, örnek sorular (TR atölye Türkçesi + EN), katman (backend_entity_layers), rol (entry/metric/scrap/other — tool_graph_node), aggregate-capability bayrağı (bir çağrıda çoklu varlık alabiliyor mu).
- İKİ KORPUS (Tool-to-Agent Retrieval, arXiv 2511.01854): araç korpusu + backend/yetenek korpusu (backend'in kendi açıklaması ve kategorileri). Sorgu her ikisine karşı koşar; backend korpusundan gelen isabet o backend'in giriş araçlarını (role=entry, veriden) taşır. Bugün ALWAYS_INCLUDE'un yaptığı işi veri yapar.
- Kodlama: dense (bge-m3) + BM25-TR (K15; bugün inen tokenizer) — Yol B altyapısı zaten var (vector.toolRetrievalMode anahtarı canlıda 0).
- Birleşik/çakışan araçlar: ToolScope (arXiv 2510.20036) tarzı birleştirme (embedding komşuluğu + LLM sınıflandırıcı + doğrulayıcı) YALNIZ taslak öneri üretir; yayın kapılı (P5).

### L1 · Aday üretimi (deterministik + getirme; MATRIX YOK)
Aday kümesi = BİRLEŞİM:
 (a) Yönetişimli anahtar kelime eşleşmesi (tek ve çok kelimeli) — HER yolda (bugün yalnız fallback/frame).
 (b) Hibrit getirme: BM25-TR + dense, RRF ile birleşik, iki korpus, top-M (skorlarla). Paraphrase'e dayanıklı olan katman budur (A24: "kelime listesi yönlendiricisi kaldırılır; hibrit retrieval").
 (c) K24 türev ipuçları: metric_registry categoryHints (metrics/metricsSurface'tan) — eylem türünden BAĞIMSIZ (Q3'ün düzeltmesi).
 (d) Varlık katmanı kapsaması: entity_ref çözümü hangi backend'in hangi katmanına düştüyse (backend_entity_layers), o katmanı kabul eden araçlar aday olur; şirket-düzeyi bir varlık (ör. Kaleseramik A.Ş.) fabrika-katmanı araçlarını DEĞİL doküman/bilgi araçlarını getirir — bugün tam tersi oluyor.
 (e) Sticky: önceki turun adayları (mevcut).
 (f) `search_tools` meta-aracı (P8) ve backend başına en az bir giriş aracı (role=entry, veriden), skoru sıfırdan büyük her backend için (kapsama tabanı; bugünkü "kategorisiz backend tümüyle sunulur" kuralının yerine geçer).
IR çerçevesi KALIR ama yalnız GÖZLEM ve girdi olarak: entity_ref, time, metrics → (c) ve (d)'yi besler. Çerçeve hiçbir zaman süzgeç değildir; MATRIX ve nesne/eylem enum'ları yönlendirme yolundan çıkar.

### L2 · Sıralama ve seçim (bütçeli)
- Cross-encoder ya da hafif LLM reranker: aday kartları (veri) + soru + son 2 tur → top-k (router.maxCategories yerine router.maxTools, yönetişimli param). ToolScope ölçümü: yeniden sıralama küçük korpusta kazanç, büyük korpusta büyük kazanç; bağlam %98+ küçülür.
- ÖĞRENİLMİŞ ÖNCELİK: (soru imzası, araç) çiftleri için başarı istatistiği (tool_experience'tan; bandit-tarzı, arXiv 2510.07429'un kısmi geri besleme ilkesi): yalnız SIRALAMAYI etkiler, adayı asla düşürmez (P2).
- Yönetişimli aday (a,c,d) her zaman top-k içinde kalır (taban korunur); k'yi aşarsa retrieval adayları kırpılır, yönetişimli olanlar değil.
- Anti-pattern hafızası (SkillSmith, arXiv 2606.01314): "bu soru imzasında bu araç 3 kez boş/hatalı döndü" → reranker cezası + iz; yine düşürmez.

### L3 · Plan ve yürütme (K26)
- Planlayıcı: aday kümesinden adım planı (JSON DAG, A24 P3); aynı aracın N varlık üzerinde tekrarını TESPİT eder: aggregate-capability olan araç varsa onu seçer; yoksa adım bütçesini aşmadan durur ve DÜZ TÜRKÇE, veriden gelen (prompt.segment) bir mesajla nedenini söyler (sabit "duruşlar/fire" metni gider).
- Yürütücü: adım bütçesi, her adım izli (K24), grounding (numericLedger) ve empty≠zero damgaları mevcut.

### Öğrenme döngüsü (kendi kendini iyileştirme — kapılı)
Sinyaller (hepsi bugün kısmen yazılıyor): araç sunuldu/çağrıldı/boş döndü/hata verdi; grounding hükmü; cevap kabul (kullanıcı yeniden sordu mu, thumbs); golden koşuları; `search_tools` ile bulunan ama sunulmamış araç ("kaçırma" — L5 miss ledger, register kalem 9).
Üretilen ÖNERİLER (hepsi TASLAK domain_rules satırı, provenance=LEARNED): (1) anahtar kelime ekleme/silme (kalem 97 hijyeni otomatik), (2) kart açıklaması düzeltmesi (ToolScope auto-correct tarzı), (3) sıralama öncelikleri (tool_experience), (4) anti-pattern kaydı, (5) birleştirme adayı.
Kapı: golden runner (kalem 96 güçlendirilmiş: boş-tekrar oranı eşiği) + sahip arayüzü (Kurallar sekmesi) → yayın; her yayın sürümlü ve geri alınabilir; şema değişmez (K23/K12). MUSE-Autoskill (arXiv 2605.27366) ilkesi: test geçmeyen beceri kaydolmaz; kullanılmayan/başarısız olan budanır.

### Kendi kendini yapılandırma (yeni backend)
A24 ④-⑨ akışı: bağlan → tools/list aynası → yuva çıkarımı → korpus sondası (allowlist, salt-okuma) → profil (LLM, PROPOSED) → kart → kodlama (dense+BM25-TR) → CARDED. Bunlar var olduğunda backend yönlendirilebilir; kod değişmez. Kabul testi P4.

## 4 · Envanter — var olan / eksik (12.6: tüketici aranır, tanım değil)

VAR (master'da): tool_category/keyword verisi (13 satır) · matchCategories (tek+çok kelime) · semantic router · K24 derived + offeredByBackend (PR 616) · Yol B toolRetrieval (BM25+vektör; anahtar 0) · encoder v2 + camelCase tokenizer (PR 621) · routeShadowLens (üretim filterToolsByMessage'ı replay çerçevesiyle koşturur) · recallCat (Recall@k) · routerAbLens · tool_experience upsert (stage 14) · golden runner · backend_entity_layers (config) · entity alias · metric_registry categoryHints · tool_graph_node role=entry (veri!) · numericLedger grounding · budget fence.
EKSİK / KOPUK: (i) anahtar kelime tabanı her yolda değil; (ii) MATRIX yerine-geçme kuralı; (iii) ALWAYS_INCLUDE kodda (role=entry verisi varken); (iv) search_tools sunulmuyor (K17 açık); (v) iki-korpus indeks yok; (vi) reranker/öncelik yok; tool_experience'ı yönlendirme okumuyor; (vii) anti-pattern hafızası yok; (viii) fan-out planlayıcı yok (K26 P3 açık); (ix) sabit Türkçe mesajlar kodda; (x) backend başına recall sınavı hiçbir yerde hesaplanmıyor; (xi) held-out küme var (turn_trace_digest 162+ satır) ama altın küme bu haftanın dört tanığını içermiyor.

## 5 · Uygulama planı — her faz bir kart, bir sınav, bir iniş (30 dk kuralı)

FAZ 0 · SINAV ALETİ (27 Eyl, AG-2): routeShadowLens + recallCat'e "backend başına Recall@k" ve "kol" (A/B: bugünkü vs frameRouting=0 + keyword-her-yolda) eklenir; altın küme = held-out + 4 tanık soru (sermaye, personel, Q3 fire, 621 sonrası bir kamel-case sorgu). ÇIKTI: taban sayıları (hiçbir eşik uydurulmaz; eşik tabandan sonra konur). Kod: yalnız replay/lens; üretim yolu dokunulmaz.
FAZ 1 · ÇERÇEVE GÖZLEME İNER (27–28 Eyl): (1) keyword tabanı her yolda + K24 ipucu eylem-bağımsız (kart hazır, bekletildi) · (2) sınav yeşilse `router.frameRouting=0` — admin arayüzünden SAHİPLE, golden kapısıyla (kod değil) · (3) ALWAYS_INCLUDE → tool_graph_node role=entry (veri) — G2c'nin ilk yarısı · (4) sabit bütçe mesajı → prompt.segment (veri). Sınav: Faz 0 aleti, dört tanık yeşil, backend başına recall taban altına düşmez.
FAZ 2 · GETİRME ADAY ÜRETİCİ OLUR (28–30 Eyl): iki-korpus indeks (backend korpusu = backends.description + kategori adları) · Yol B `vector.toolRetrievalMode` sınav sonrası açılır · `search_tools` meta-aracı her turda sunulur, her çağrısı "kaçırma" olarak loglanır. Sınav: Recall@5 paraphrase kümesinde (ör. "istihdam edilen kişi sayısı", "kadro") yükselir; token/tur düşer.
FAZ 3 · SIRALAMA + ÖĞRENME (1–3 Eki): reranker (önce cross-encoder, ölçülmezse LLM) · tool_experience → öncelik (yalnız sıralama) · anti-pattern hafızası · öneri üretici (anahtar kelime/açıklama taslakları, provenance=LEARNED) · golden kapısı güçlendirmesi (kalem 96). Sınav: önerilerin hiçbiri kapısız yayınlanamaz (test); sıralama kazancı ölçülür.
FAZ 4 · SÖKÜM VE KABUL (4–6 Eki): MATRIX + IR enum'ları yönlendirme yolundan silinir (35 test dosyası güncellenir; çerçeve yalnız gözlem tipi olarak kalır) · fan-out planlayıcı (K26, A24 P3 ile birlikte) · G3/G4 ARMES grep kapısı (public/ dahil, büyük/küçük harfe duyarlı) · KABUL: sentetik finans backend'i (30 araç, 10 soru) sıfır kod değişikliğiyle doğru yönlendirilir; dört tanık yeşil; ARMES grep 0.
Her faz: kart → scout inceleme → şerit → PR → sınav sayıları raporda → scout iniş → master (30 dk). Hiçbir faz "yeterlilik" gerekçesiyle ertelenmez (SOTA-1).

## 6 · Kabul kriterleri (cwf-sota-definition'a izlenebilir)
K-A · Yeni backend sıfır kod (sentetik finans testi) — A24 P4/AGNOSTIC-1.
K-B · Backend başına Recall@5, held-out + altın kümede, Faz 0 tabanından geriye gitmez; dört tanık soru doğru araca gider (kanıt: turn_trace_digest stage 07 offeredToolNames + stage 10 toolLoop).
K-C · Yönetişimli bir eşleşme hiçbir yolda düşmez (birim testi + trace alanı governedKept ≥ eşleşme sayısı).
K-D · Her sunulan araç nedenini taşır (K24 alanı zorunlu; boş = kırmızı).
K-E · Tek toplulaştırma sorusunda araç çağrısı ≤ router.maxFanout (yönetişimli); aşımda düz Türkçe, veriden mesaj.
K-F · Öğrenme önerileri yalnız TASLAK doğar; kapısız yayın imkânsız (test); her yayın geri alınabilir.
K-G · Kodda backend adı 0 (G4 kapısı, public/ dahil).

## 7 · Riskler ve scout'a açık sorular
R1 · Varlık katmanı kapsaması (L1-d) yanlış çözümde doğru aracı DÜŞÜREBİLİR — P2 ile çelişir mi? Öneri: katman kapsaması yalnız SIRALAMAYI etkiler, düşürmez; scout ölçsün.
R2 · Türkçe paraphrase'de BM25-TR + dense yeterli mi; K15 analyzer canlıda hangi durumda (vektör motoru kesintisi merdiveni ③e)?
R3 · Reranker gecikmesi ve maliyeti (router.timeoutMs=1500 ile uyum).
R4 · 35 test dosyası + 22 üretim dosyası MATRIX'e bağlı: söküm bir dalga; Faz 1–3 boyunca MATRIX kodda ama HÜKÜMSÜZ kalır (frameRouting=0) — iki yolun paralel yaşaması ölçüm borcu mu?
R5 · tool_experience sinyali "araç çağrıldı" ile "araç doğru cevabı verdi"yi ayırt ediyor mu (grounding hükmüyle birleştirilmeli mi)?
R6 · K1 hükmünün (S140) geri alınması için sahibin adlandırılmış hükmü gerekir: OWNER-RULING-S159-ROUTING-V2-1 önerilen ad.
R7 · Faz takvimi iddiadır (TOTAL-45): her fazın tarihi kartı kesilirken yeniden ölçülür.

## 8 · Kaynaklar (web, 2026-09-26 okundu)
- ToolScope — araç birleştirme + bağlam-duyarlı süzme; hibrit (BM25+dense) + cross-encoder; bağlam %98.6–99.9 küçülme, seçim doğruluğu +8.8…+38.6 (arXiv 2510.20036).
- Tool-to-Agent Retrieval — araç + ajan/sunucu iki korpus, birleşik indeks; LiveMCPBench Recall@5 0.83 (+19.4%) (arXiv 2511.01854).
- SkillSmith — beceri/araç birlikte evrim; anti-pattern hafızası ve veto; yürütme kayıtlarından fayda modeli (arXiv 2606.01314).
- MUSE-Autoskill — deneyimden beceri üretimi; test geçmeden kayıt yok; budama (arXiv 2605.27366).
- BaRP — kısmi (bandit) geri beslemeden yönlendirme politikası; tercih vektörüyle maliyet/kalite (arXiv 2510.07429).
- MCP progressive discovery (bex.co, 2026-09-23; MCP 2026-07-28 revizyonu): Tier-0 küçük giriş yüzeyi + search_tools; düz yüklemede seçim doğruluğu %43→%14; >30–50 araçta bozulma.
- Benchmarking Tool Retrieval for LLMs (ACL Findings 2025); Set-level tool retrieval (arXiv 2607.25718); A Survey of Agent Memory (arXiv 2602.06052).
- OKUNAMADI (proxy 429): Toollery — "Scaling LLM Agents to Thousands of Skills and Tools" (arXiv 2609.22218). Scout okuyup özetlesin.

END · CWF-ROUTING-ARCHITECTURE-v2-DRAFT-S159-1
