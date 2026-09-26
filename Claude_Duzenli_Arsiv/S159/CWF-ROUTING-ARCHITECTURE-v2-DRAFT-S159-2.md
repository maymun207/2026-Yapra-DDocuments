# CWF-ROUTING-ARCHITECTURE-v2 — "Yetenek Yönlendiricisi" (Capability Router) · TASLAK v2 (S159-2)

DURUM: TASLAK v2 — scout hasım incelemesine (ORDER-SCOUT-REVIEW-ROUTING-ARCHITECTURE-v2-S159-2-v1) ve sahibin hükmüne (OWNER-RULING-S160-ROUTING-V2-1) gidiyor. Kod DOKUNULMADI; hüküm gelmeden hiçbir yönlendirme kartı kesilmez. v1'i (CWF-ROUTING-ARCHITECTURE-v2-DRAFT-S159-1, sha256 2230e93a…) GEÇERSİZ KILAR.
MEASURED-AT: 2026-09-26T17:15Z (köprü saati). Ölçüm tabanı: master 2a6f6781b1a4748aac5f5bc7b1d73136863b1c35 (sahibin klonu, tracking ref = Vercel prod READY), canlı DB fjbrkimwvtpwoxhziidh (turn_trace_digest), A24-V1_3-ARCHITECT-CAPTURE-S150-1-v1 (sahip onaylı FINAL), CWF-ASTRA-REVIEW-EVALUATION-S159-1 (bu belgenin kanıt eki), SCOUT-STATUS-REVIEW-ROUTING-ARCHITECTURE-v2-S159-1 (16:44:11Z).

TASARIM KAYNAKLARI, ADIYLA (S112-YASA-1 · §12.14):
- OWNER-DESIGN-S159-1 (sahip, 19:16 TSİ): 6×13 sabit çerçeve matrisi ve koda gömülü sabit bloklar yapısal çöp; yeni bir backend (finans) MES sözlüğüne zorlanamaz; kendi kendine öğrenen, konfigüre olan, iyileşen yapı; kod öncesi doküman + plan + scout tartışması.
- EXT-DESIGN-S159-ASTRA-1 (ChatGPT Astra incelemesi, sahibin toplamasıyla, 19:53 TSİ; değerlendirmesi CWF-ASTRA-REVIEW-EVALUATION-S159-1): 24 maddenin 21'i ölçümle KABUL, 2'si ifade düzeltmesiyle kabul, 1'i scout'a (ToolScope iç ayrıntısı). Bu belgeye adıyla giren katkılar: A1 üç sınıf yönetişimli veri + değişmez · A2 sağlayıcı sunum matrisi · A3 araç kimliği · A4 yayın kapısının genelleştirilmesi · A5 keşif zinciri · A6 yönlendirme olayı · A7 toplulaştırma/kapsam yüzleri · A8 çalışma zamanı bütçesi · A9 kanıt aşamaları · A10 kabul tablosu · A11 kapsamlı sıfır-kod.
- SCOUT (S159, RED-ON-DESIGN): kapısız learnToolMapping mevcut (:950-956) · Q3 ipucu düzeltmesi S151'de indi · clarify stage 07'den SONRA koşuyor, şirket katmanı yok · routeShadowLens kol A zaten frameRouting=0+keyword, canlı kol tekrar oynatılamaz, backend başına Recall yok · frameRouting=0 ipuçlarını/metrik tabanını/unmodeled-keep'i de kapatır (:1609) · Yol B vektör-tek, encoder yer tutucu, BM25 yalnız varlık adlarını indeksliyor · sayımlar 50 dosya/71 eşleşme ve 11 üretim + 8 test.
- ARCHITECT KÖR NOKTASI, ADIYLA: A-REC-S159-1 (üç oturum yama, A24 hükmü dururken) ve A-REC-S159-2 (v1, A24'ü yalnız NUMARAYLA taşıdı ve dört yerde A24'ün TERSİNİ yazdı — §3). Bu sürümün kuralı: bu belge, inline etmediği hiçbir dış kuralı adıyla anmaz.

GEÇERSİZ KILACAĞI KARARLAR (yalnız sahip hükmüyle): OWNER-RULING-S140-K1-ORDER-CELL-HINT-1; IR-3 fazının "MATRIX router seçiminin yerine geçer" kuralı. KORUDUĞU KARARLAR (metinleri §3'te): A24 v1_3 (K17, K19, K21, K22, K23, K24, K25, K26, K28, K29, K31, öğrenme yasası, konformal kapsam, sınav zemini, yetki katmanı, kart yüzleri), AGNOSTIC-1, OWNER-RULING-S153-NO-ARMES-HARDCODE-1, OWNER-RULING-S156-DATA-BACKENDS-1, OWNER-RULING-S156-FAIL-CLOSED-1, OWNER-RULING-S149-R07-PLANNER-1, empty≠zero, partial≠complete, S102-YASA-3 (P4'e kadar bugünkü yol dokunulmaz).

---

## 0 · Tek cümlede

Bugün soru→araç seçimi, kodun içine yazılmış bir seramik-MES sözlüğüyle (6 eylem × 13 nesne matrisi, ALWAYS_INCLUDE, sabit mesajlar) ve sağlayıcıya göre DEĞİŞEN bir yolla yapılıyor (Anthropic'te süzgeç hiç koşmuyor, diğerlerinde LLM seçimi sahibin girdiği kuralların üstünde). Hedef: hiçbir backend adı/kategorisi/nesnesi kodda değil; adaylar VERİDEN (kartlar) üretilir; sahibin yayınladığı YÜKÜMLÜLÜKLER hiçbir sağlayıcıda ezilmez; her karar iz bırakır; yeni bir backend DESTEKLENEN PROTOKOLLE sıfır kodla yönlendirilir; yürütme olaylarından öğrenip yalnız KAPILI ve SÜRÜM-GRUPLU yayınla kendini iyileştiren bir yönlendirici. SOTA iddiası bileşen sayısıyla değil, bağımsız görevlerde ölçülen sonuçla kurulur (§8).

## 1 · Teşhis — ölçülmüş, düzeltilmiş

Bugünkü boru hattı, sağlayıcıya göre İKİ yol (stageTools.ts:551):
- ANTHROPIC: `if (ctx.isAnthropic || ctx.labActive?.routingBypass)` → kapsam içi TÜM araçlar sıralanıp sunulur ("cache mode, stable prefix"); kategori, router, matris, anahtar kelime — hiçbiri koşmaz; matchedCategories = [].
- DİĞERLERİ (OpenAI, Gemini): stage 07 filterToolsByMessage (toolCategories.ts:1418–1944): router LLM (kategori + IR çerçeve; 6 eylem × 13 nesne, irFrame.ts:54–61) → HIGH'da MATRIX yerine-geçme (deriveCategories.ts:63–92) → yönetişimli anahtar kelime eşleyici YALNIZ fallback (:1561/:1568), basis='frame' (:1644, PR 620) ve sticky (:1681) → metrik ipuçları her eylemde ama frameRouting kapısının arkasında (:1609) → ALWAYS_INCLUDE (:1203) → bütçe dolunca sabit metin (completionGuard.ts:228).

Tanıklar (hepsi trace'ten):
- T1 Sermaye sorusu (S158, 02:58Z): HIGH QUERY_MASTER×SYSTEM → [admin]; MKB düştü; 0 çağrı. Yama PR 620.
- T2 Personel sorusu (S159, 16:02:28Z, turn 85cb74bcfe773dbdfabb170296af8724): path=semantic, basis=keyword, router [employee, production]; router'ın KENDİ çıktısında metricsSurface ["personel sayısı","çalışan sayısı"] — MKB'nin yönetişimli anahtarları — ama derived.hints [] (metric_registry bilmiyor) ve matchCategories koşmadı; 17 fabrika × getEmployeesWorkedBetween = 14 çağrı; 489.176 token; sabit "duruşlar/fire" metni. Sağlayıcı: Anthropic DEĞİL (Anthropic dalında path alanı yoktur).
- T3 Q3 fire (S149): TARİHSEL — ipuçları o gün yalnız QUERY_METRIC'te uygulanıyordu; S151'de düzeltildi (deriveCategories.ts:209 "applied LAST, uniformly, over every branch"). Bugünkü kalıntı: ipuçları yalnız registry'nin bildiği metrikler için ve frameRouting kapısının arkasında.
- T4 Sayımlar (scout): non-test kodda ARMES 50 dosya / 71 eşleşme; MATRIX'e sıkı bağımlı 11 üretim + 8 test dosyası.

Yapısal nedenler (altısı da kodda, ölçülmüş):
(a) SÖZLÜK KODDA — nesne/eylem/kategori evreni bir tenant'ın MES'i.
(b) OLASILIKSAL > DETERMİNİSTİK — LLM seçimi yönetişimli veriyi ezebiliyor (T2), üstelik sağlayıcıya göre farklı biçimde (Anthropic'te süzgeç yok).
(c) SORUYA KOŞULLU YÖNLENDİRME GERİ BESLEMESİ YOK — tool_experience yazılıyor ve okunuyor (censusToolDoc.ts:214, toolCensusRefresh) ama seçim/sıralama yolu okumuyor; sayaç oku-hesapla-upsert (ToolExperienceRepository.ts:110-150), eşzamanlı artış kaybedilebilir. Buna karşılık KAPISIZ bir öğrenme VAR: learnToolMapping (toolCategories.ts:950-956) DRAFT'sız yazıyor.
(d) ARAÇ KİMLİĞİ ÇIPLAK AD — retrieval birleşimi `seen.has(c.tool)` (toolRetrieval.ts:335-345), kayıt `claimToolName` ikinci sahibi reddediyor (stageTools.ts:1281); ikinci backend `search`/`getEmployees` sunarsa kaybolur.
(e) YAYIN KAPISI TEK TÜRE — golden kapısı yalnız prompt.segment (governance.ts:427-429); tool_category / yönlendirme politikası / sıralama için kapı YOK.
(f) SIRA — varlık çözümü (stage 03 clarify, runTurn.ts:259) araç kaydından (runTurn.ts:191) SONRA; katmanlar stage 07'ye yalnız arg bağlama olarak ulaşıyor (stageTools.ts:1479); tanımlı katmanlar factory/line/equipment(/workstation) — şirket katmanı yok; "Kaleseramik" bir fabrika alias'ına çözülüyor (T2 trace: entityId KS, layer factory).

## 2 · A24 v1_3'ten INLINE taşınan kurallar (sahip onaylı; bu belge onların üstüne kurulur)

- K17 · Literal içermeyen giriş aracı: her backend'in giriş yüzeyi VERİDEN (tool_graph_node role=entry); kodda araç adı yok.
- K19 · Sınav dilimli: çerçeve / getirme / slot / soru / erişim — ayrı hata sayaçları; tek bir Recall@1 kök neden değildir.
- K21 · Çift kart ve SÜRÜMLÜ DEMET: PUBLISHED vN servis ederken CANDIDATE vN+1 sınanır; card_version demeti = araç sözleşmesi + şemalar + instructions + profil + index_build_id + yetki kapsamı + sınav hüküm id'leri + model/prompt/embedding sürümü; aktif işaretçi TEK adımda değişir; uyumlu değişiklik ≠ şema kırılması ≠ yetki iptali ≠ güvenlik şüphesi (QUARANTINE). Geri alma DEMETİ geri alır.
- K22 · Kısmi korpus kaçırması = UNMEASURED (partial≠complete); yapısal ontoloji (katmanlar) ≠ dinamik veri (sonda).
- K23 · LEARNED pozitif süzgeci — KONJONKSİYON: answered ∧ grounded(st12) ∧ atıf destekli ∧ bir tur içinde düzeltme yok ∧ PII yok ∧ not_empty. Alias kaydı backend + tenant/tesis/bağlam anahtarıyla.
- ÖĞRENME YASASI (A-REC-S149-2): boş / 502 / timeout / UNREACHABLE → ÖĞRENME YOK. Negatif örnek yalnız doğrulanmış yanlış eşleşme ya da kullanıcı düzeltmesiyle.
- K24 · İz şeması dondurulur (cwf.trace.v1; OpenTelemetry gen-ai semantiği); gölge günleri bu şema olmadan birleştirilmez.
- K25 · Regresyon güven aralıklı; KABUL BARAJI ölçmeden ÖNCE ilan edilir; sistem kötü gidince kendi barajını düşüremez (SOTA-1 ruhu); τ veriden kalibre edilir.
- K26 · PLANLAYICI + DETERMİNİSTİK YÜRÜTÜCÜ (OWNER-RULING-S149-R07-PLANNER-1): planlayıcı ayrı adlandırılmış LLM aşaması (st07p); girdisi çerçeve + kilitli set + kart özetleri + çıktı sözleşmesi; çıktısı şema-kısıtlı JSON DAG (çağrılar, parametreler, paralellik, toplama operatörleri, bağımlılıklar) — iz nesnesi. Yürütücü deterministik: paralel salt-okuma fan-out; yazma seri + WRITE-GATED; toplama (group/count/sum/avg/rank) KODDA; her çağrı FULL-TRACE; partial≠complete damgaları; adım bütçesi kartta ilan; koşan plan okunan plandır. Sonuç tabloları ana LLM'e döner; kullanıcıya giden her sayı yürütücü çıktısında vardır.
- K28 · Çıktı sözleşmeleri kart verisidir (coverage-is-config); veri bölümleri yalnız yürütücü çıktısından, atıflı.
- K29 · Üretim takvimi kart verisidir (gün/vardiya tanımı); "bugün/bu vardiya" onunla çözülür.
- K31 · Hat/bölge çözümü backend'in KENDİ listesine karşı deterministik; sıfır eşleşme = gerçek-0, okunamadı = UNMEASURED; parentsOf/containsAmong KABLOLANIR (CALLER-ABSENT, 12.6).
- KAPSAM · KONFORMAL KÜME (ilan edilmiş α), backend başına kalibrasyon; kalibrasyon n < n_min iken ret kapısı KURULU DEĞİLDİR (sunar); beş karar sınıfı.
- SINAV ZEMİNİ · held-out GERÇEK turlar (messages/turn store + Langfuse) + çapraz-üretici paraphrase + hard negative; şema-türevli sorular AYRI (smoke); etiket = KABUL EDİLEBİLİR KÜME; soğuk başlangıç exam_basis=synthetic damgalı; "connected" = yönlendirme sınavı (offline) ∧ erişim sınavı (canlı salt-okuma canary).
- YETKİ KATMANI · tenant/kullanıcı kapsamı, okuma/yazma sınıfı (WRITE-GATED), RBAC kapsam süzgeci (M-c lensi) — getirme ve LLM'in ÜSTÜNDE.
- KART (dokuz yüz, özet) · kimlik & durum (backend_id, endpoint, protokol sınıfı MCP/gateway, türetme kimliği, card_version demeti, durum) · araç envanteri (tools/list bayt-aynı, backend.tool, inputSchema/outputSchema, annotations = iddia, sha256(description) ve sha256(schema), yazma/yıkıcı sınıf) · profil (when-to-use / not-for, örnekler) · slotlar · katmanlar · korpus sondası · sınav hükümleri · SLO (K18) · web kartı (K30).
- A24 P2/P4/P5 · P2: BM25-TR + RRF gölgede, TR analyzer ve reranker ablasyonu, p95 · P4: kart yolu birincil, keyword yalnız merdiven tabanı, ALWAYS_INCLUDE silinir, tool_search açılır · P5: sonuç defteri → K23 → öneri → iki sınav → yayın; boş sonuçtan LEARNED satır üretilmez.

## 3 · v1'in A24'e göre GERİLEDİĞİ dört yer (düzeltildi; A-REC-S159-2)

| v1 | A24 kuralı | v2 |
|---|---|---|
| "3 kez boş → ceza" | boş → ÖĞRENME YOK; K23 | A24 kuralı aynen (§2) |
| "fan-out planla önlenir, bütçeyle değil; toplulaştırıcı yoksa dur" | K26: paralel salt-okuma fan-out, toplama kodda, adım bütçesi | K26 aynen + §5.L3 |
| satır düzeyi geri alma | K21 demet, atomik işaretçi | K21 aynen + A4 kapı kapsamı |
| "skoru > 0 her backend'in giriş aracı" | konformal küme; kalibre değilken kurulu değil | §5.L1(f) |

## 4 · İlkeler (pazarlıksız)

P1 · SÖZLÜK VERİDE. Backend adı, kategori, nesne türü, giriş aracı, mesaj metni, katman adları — hiçbiri kodda değil. Kaynaklar: backends, backend_tools (ayna), domain_rules.* (tool_category, tool_annotation, tool_graph_node, metric_registry, prompt.segment, YENİ: routing_obligation, ranking_policy), backend_entity_layers, kartlar (K21 demeti). Kod yalnız MEKANİZMA taşır.
P2 · ÜÇ SINIF YÖNETİŞİMLİ VERİ (EXT-DESIGN-S159-ASTRA-1 A1; v1'in "yönetişimli eşleşme asla düşmez" hükmünün yerine):
  (i) YETKİ KISITLARI — tenant, kullanıcı kapsamı, okuma/yazma, veri erişimi: BAĞLAYICI; getirme ve LLM aşamaz (A24 yetki katmanı).
  (ii) AÇIK YÖNLENDİRME YÜKÜMLÜLÜKLERİ — sahibin yayınladığı, kapsamı tanımlı kurallar: "koşul X'te yetenek Y DEĞERLENDİRİLİR (sunulur)". Yükümlülükler araç bütçesine ÖNCE sayılır; yalnız yükümlülükler router.maxTools'u aşarsa tur OBLIGATION-OVERFLOW damgası alır ve sahip Kurallar sekmesinde görür — sessiz taşma da sessiz düşürme de yok.
  (iii) ALAKA İPUÇLARI — anahtar kelime, metrik ipucu, tahmini varlık katmanı, geçmiş başarı, sticky: sıralama için KANIT, hüküm değil.
  DEĞİŞMEZ: her geçerli yönetişimli ipucu HER yolda ve HER sağlayıcıda değerlendirilir, karardaki etkisi izde yazılır; hiçbir ipucu yetki sınırını aşamaz; aday olmak sunulmayı zorunlu kılmaz.
  GÖÇ VARSAYILANI (sahip hükmü ister): bugün PUBLISHED her tool_category anahtar kelime satırı göçte YÜKÜMLÜLÜK sınıfına yazılır — sahibin girdiği hiçbir kural güç kaybetmez ("TEK bir fonksiyonalite çıkartılmaz"); gölge aşaması (E3) yükümlülüklerin bütçeyi ne sıklıkla taşırdığını ölçer; sahip, ölçümün gösterdiği satırları arayüzden İPUCU'na indirir. Bu, sahibin yasasını ("olasılıksal seçim benim girdiğim deterministik kuralı ezemez") ve Astra'nın bütçe değişmezini aynı anda korur.
P3 · HER SUNULAN ARACIN BİR NEDENİ VAR — araç başına neden izde (obligation / authority-pass / keyword / retrieval-rank / hint / layer / sticky / entry-coverage / discovery); neden yoksa sunulmaz. Neden alanı K24'ün uzantısıdır (§5 yönlendirme olayı).
P4 · YENİ BACKEND = SIFIR KOD, KAPSAMLI (A11): MCP tools/list + backends kaydında ilan edilmiş kimlik doğrulama + protokol sınıfı (MCP/gateway) dahilinde. Bilinmeyen auth/işlem protokolü açıklamadan çıkarılmaz; o bir kart kesimidir, vaat değil. Kabul: sentetik finans backend'i (30 araç, 10 soru) VE ikinci bir görülmemiş-sözlüklü backend, hiçbir kod dosyası değişmeden.
P5 · KENDİNİ İYİLEŞTİRME KAPILI VE DEMETLİ. Her öneri TASLAK; yayın, genelleştirilmiş golden/sınav kapısı (A4) + sahip arayüzü ile; K21 demeti halinde; geri alma demeti geri alır; şema değişmez; sessiz öğrenme yok — learnToolMapping'in kapısız yazımı E5'e kadar FRENLENİR (router.learnEnabled canlı ölçülür).
P6 · FAIL-CLOSED, EMPTY≠ZERO, PARTIAL≠COMPLETE yönlendirmede de: katalog okunamıyorsa "yönlendirme ÖLÇÜLMEDİ"; sıfır aday ≠ katalog boş; OWNER-RULING-S156-FAIL-CLOSED-1.
P7 · PLAN + BÜTÇE (K26 + A8): plan gereksiz fan-out'u azaltır; çalışma zamanı bütçesi kalır; gerekli fan-out yürütücüde, KODDA, paralel ve bütçeli koşar; toplama kodda; modele TEK sonuç tablosu döner; ham fabrika-başı yükler bağlama girmez (T2'nin 489.176 token'ı budur). Durmak yetenek değildir; doğrulanmış aggregate / batch / sayfalama / bütçeli paralel arasından SEÇİLİR ve seçim izde yazılır.
P8 · KEŞİF ZİNCİRİ (A5): platform meta-aracı `cwf_find_capability` (gateway'in `search_tools`undan AYRI kimlik ve görev): ara → yetkili kartı bul → güncel şemayı yükle → kaydet → BİR SONRAKİ model adımında kullanılabilir; üç sağlayıcıda aynı güvenlik/davranış sözleşmesi. Her kullanım sınıflanır: INITIAL-NEED-MISS (ihtiyaç ilk mesajdaydı → kaçırma defteri, A24 L5) vs NEXT-STEP-DISCOVERY (ihtiyaç bir sonuçtan doğdu → kaçırma değil).
P9 · SAĞLAYICI SUNUM MATRİSİ (A2): sunulan küme sağlayıcı başına TANIMLIDIR (Anthropic tam-katalog önbellek yolu; OpenAI/Gemini süzgeçli yol); her ikisinde aynı yetki kısıtları ve yükümlülükler uygulanır; her yolun maliyet profili E1'de ölçülür; geçiş sağlayıcı başına ayrı kapıdan geçer.
P10 · ARAÇ KİMLİĞİ = server_id + backend_id + tool (A3): getirme birleşimi, kayıt, deneyim defteri ve kartlar bu üçlüyle anahtarlanır; model-yüzlü ad türetilir ve çakışmasızdır.

## 5 · Hedef mimari — dört katman + keşif + öğrenme

### L0 · Katalog (veri, backend-agnostik; K21 demeti)
- Kart = A24'ün dokuz yüzü (§2) + iki yeni yüz: TOPLULAŞTIRMA (A7: ölçü, birim, grain, tekrar-giderme anahtarı — aynı kişi iki fabrikada; zaman semantiği — "bugün aktif" ≠ "dönemde çalıştı" ≠ FTE; kapsama damgası) ve KAPSAM (bilgi araçları için: kaynak envanterinden türetilen konu/dönem/kurum kapsamı; K22'nin pozitif yarısı; modelin varsayımı olarak doğmaz). Her yüz provenance taşır: backend beyanı / gözlem (sonda) / insan onayı / model çıkarımı (PROPOSED).
- İKİ KORPUS (Tool-to-Agent Retrieval): araç korpusu + backend/yetenek korpusu; backend korpusu isabeti o backend'in giriş araçlarını (role=entry, veriden) taşır. Bugün ALWAYS_INCLUDE'un yaptığı işi veri yapar (G2c).
- Sorgu genişletme (Toollery): her kart için ÜRETİLMİŞ VE DOĞRULANMIŞ kullanıcı-niyeti örnekleri (TR atölye Türkçesi + EN) kart verisidir; kapılı yayınlanır; indekslenir.
- Kodlama: BUGÜN — encoder yer tutucu (hash projeksiyon), Qdrant dense+learned-sparse RRF, BM25 yalnız varlık adları. HEDEF — E3 ablasyonu karar verir (BM25-TR / dense / dense+sparse / reranker, aynı Türkçe küme; A24 P2). Kazanan makaleden değil ölçümden ilan edilir.
- Birleşik/çakışan araç önerileri (ToolScope tarzı) yalnız TASLAK üretir; kapılı.

### L1 · Aday üretimi (yetki → yükümlülük → getirme + ipuçları; MATRIX YOK)
Sıra ve küme:
 (0) YETKİ süzgeci önce (P2-i): tenant/kapsam/yazma sınıfı dışı araçlar hiç aday olmaz.
 (a) YÜKÜMLÜLÜKLER (P2-ii): koşulu tutan her routing_obligation'ın araçları aday ve SUNUM ZORUNLU (bütçeye önce sayılır).
 (b) Hibrit getirme: iki korpus, RRF, top-M skor ve sırayla; paraphrase'e dayanıklı katman.
 (c) İpuçları (P2-iii): metric_registry categoryHints (eylemden bağımsız — bugün öyle) + yönetişimli anahtar kelime eşleşmeleri (tek/çok kelime) + tahmini katman + sticky → yalnız SIRALAMA kanıtı.
 (d) Varlık katmanı kapsaması: entity_ref çözümü (stage 03, ARTIK stage 07'den ÖNCE — boru hattı sırası kartla değişir) hangi backend'in hangi katmanına düştüyse o katmanı kabul eden araçlar kanıt kazanır; ŞİRKET katmanı backend_entity_layers'a VERİ olarak eklenir (yalnız tam-eşleşme; "Kaleseramik" bir fabrika alias'ına çözülmez); kapsama DÜŞÜRMEZ, sıralar (R1'in cevabı).
 (e) Sticky: önceki turun sunulanları, ipucu sınıfında.
 (f) KAPSAMA TABANI: backend korpusunda sırası ≤ N (yönetişimli param, E3'te ölçülür) olan her backend'in giriş aracı; konformal ret kapısı kalibre değilken KURULU DEĞİL (A24). "skor > 0" kuralı YOK.
 (g) `cwf_find_capability` her turda (P8).
IR çerçevesi KALIR ama yalnız GÖZLEM ve girdi olarak (entity_ref, time, metricsSurface → (c),(d)); süzgeç değildir; MATRIX ve nesne/eylem enum'ları yönlendirme yolundan çıkar (E5'te silinir; o güne kadar frameRouting=0 ile hükümsüz — S102-YASA-3).

### L2 · Sıralama ve seçim (bütçeli; politika VERİ)
- Sıralama = getirme sırası + ipucu kanıtları + YAYINLANMIŞ ranking_policy (öncelikler; K21 demetinin parçası; A4 kapısından geçer; çalışma zamanı öğrenilmiş ağırlık YOK).
- Reranker (cross-encoder ya da hafif LLM): E3 ablasyonu izin verirse; gecikme K18 SLO içinde.
- Bütçe: router.maxTools (yönetişimli). Doldurma sırası: yükümlülükler → kapsama tabanı → sıralı adaylar. OBLIGATION-OVERFLOW damgası (P2).
- Sağlayıcı (P9): Anthropic yolunda "sunum" tam katalog kalabilir; o zaman L1/L2 çıktısı modele PLAN girdisi olarak ve keşif sırası olarak verilir; süzgeçli yolda sunulan küme L2 çıktısıdır. Her iki yolda yükümlülük ve yetki aynı.

### L3 · Plan ve yürütme (K26 aynen)
- Planlayıcı st07p: girdi = çerçeve + kilitli set (L2) + kart özetleri (toplulaştırma/kapsam yüzleri dahil) + çıktı sözleşmesi (K28); çıktı = JSON DAG; set-düzeyi bağımlılık kapsaması: plan, gereken yetenek zincirini (şirketi çöz → alt kuruluşlar → kapsamda veri → tekrar gider → topla) TAMAMLAR, eksik halkayı P8 keşfiyle ister (retrieval ile birlikte tasarım — D12).
- Yürütücü: deterministik; paralel salt-okuma fan-out; toplama kodda (K26); adım/token bütçesi kartta; partial≠complete; her sayı yürütücü çıktısında (st12 grounding + numericLedger, PR 622 sonrası mutlak tolerans); sonuç sınıfları AYRI üretilir: tamamlandı / kısmi / bulunamadı / ölçülemedi.

### Keşif zinciri (P8) ve sağlayıcı sözleşmesi
`cwf_find_capability(query)` → kart isabetleri (K21 demetinden, güncel şema) → kayıt (aynı tur; P10 kimliğiyle) → bir sonraki model adımında araç listesinde; Anthropic'te tam katalog zaten sunulu olduğundan zincir "kart getir + plan" olarak çalışır; üçünde de iz aynı şemada.

### Öğrenme döngüsü (kapılı, demetli)
- YÖNLENDİRME OLAYI (A6; K24'ün uzantısı, ikinci defter DEĞİL): tur × araç: aday mı / sunuldu mu / seçildi mi / çağrı gitti mi / argüman-kapsam doğru mu / sonuç boş-kısmi-tam / göreve katkı (K23 konjonksiyonu) / catalog_version, policy_version, model, index_build_id. tool_experience bu akışın TÜREV görünümü olur (oku-hesapla-upsert yarışı yapısal olarak biter).
- Süzgeç: K23 + öğrenme yasası (boş → yok). Kullanıcının tekrar sorması tek başına etiket değildir; grounding geçmek tek başına doğruluk değildir.
- Öneriler (TASLAK, provenance=LEARNED): anahtar kelime/yükümlülük adayı, kart açıklaması düzeltmesi, niyet örneği, sıralama önceliği, birleştirme adayı, varsayılan plan (A24 P5).
- Kapı (A4): decideGoldenPublish tool_category / routing_obligation / ranking_policy / kart demeti için genelleştirilir; iki sınav (yönlendirme ∧ erişim) + regresyon (K25) + canary; yayın K21 demeti; geri alma demeti geri alır. İlk LEARNED önerinin sınavı geçip yayınlanıp geri alınması E5'in çıkışıdır.
- Bandit/kısmi geri besleme (BaRP): LLM yönlendirmesi literatürüdür; burada HİPOTEZ olarak durur, E5'te ölçülmeden politika olmaz.

### Kendi kendini yapılandırma (yeni backend, P4 kapsamında)
A24 ④-⑨: bağlan → tools/list aynası → yuva çıkarımı → korpus sondası (allowlist, salt-okuma) → profil (PROPOSED) → kart (dokuz + iki yüz) → niyet örnekleri → kodlama → sınavlar → CARDED/PUBLISHED. Kod değişmez; protokol sınıfı dışı bir backend kart kesimidir.

## 6 · Envanter — var / eksik / KABLOLAMA (12.6)

VAR: tool_category verisi (13 satır) · matchCategories · semantic router · K24 derived + offeredByBackend · Yol B (vektör-tek, yer tutucu encoder) · Qdrant RRF adaptörü · BM25 modülü (varlık adları) · encoder v2 tokenizer (PR 621) · routeShadowLens (kayıp hesaplar, kazanç hesaplamaz) · recallCat · routerAbLens · tool_experience (yazılıyor; census/doc okuyor) · golden runner + decideGoldenPublish (yalnız prompt.segment) · backend_entity_layers (config) · entity alias · metric_registry hints (eylemden bağımsız) · tool_graph_node role=entry · claimToolName çakışma reddi · numericLedger grounding (PR 622: mutlak tolerans + claims toplamı) · budget fence · planner.ts (deterministik PLAN bloğu; DAG değil) · resultStore aggregate_records (P1-B girdisi) · GraphKbReader.parentsOf/containsAmong (CALLER-ABSENT) · askOnUnresolved üç-durum (kablosuz dal).
KABLOLAMA (mekanizma var, tüketici yok — kart "wiring" der): decideGoldenPublish → diğer türler · parentsOf/containsAmong → L1(d) · aggregate_records → K26 yürütücü v0 · resolveTurnFrame zaten her yolda → L1 girdisi.
EKSİK: routing_obligation ve ranking_policy türleri · yönlendirme olayı şeması · kart demeti (K21) tabloları · iki-korpus indeks + niyet örnekleri · `cwf_find_capability` · şirket katmanı verisi + boru hattı sırası · planlayıcı st07p + yürütücü · sağlayıcı başına taban ölçümü · backend başına Recall@k ve tam-küme kapsaması sınavı · fren: learnToolMapping.

## 7 · Kanıt aşamaları (A9; tarih yerine bağımlılık; her aşama kartlar → scout → şerit → PR → sınav sayıları raporda → scout iniş → master)

E1 · DEĞERLENDİRME ZEMİNİ — held-out gerçek turlar (A24 sınav zemini) + kabul edilebilir küme etiketleri + alternatif geçerli zincirler; DÖRT TANIK (T1, T2, T3, PR 621 sonrası camelCase sorgusu) REGRESYON kümesidir, final sınav değil; taban ölçümü ÜÇ sağlayıcıda (P9); kabul barajı bu aşamada İLAN edilir (K25). Kod: yalnız replay/sınav aletleri; üretim yolu dokunulmaz. Çıkış: taban sayıları, provider × backend kırılımlı.
E2 · KATALOG VE POLİTİKA SÖZLEŞMESİ — P10 kimliği; K21 demeti tabloları; routing_obligation + ranking_policy türleri; kart yüzleri (toplulaştırma, kapsam); yönlendirme olayı şeması (A6); A4 kapı genelleştirmesi; göç: mevcut anahtar kelime satırları → YÜKÜMLÜLÜK (sahip hükmüyle). Çıkış: sözleşme testleri; hiçbir yayın kapısız geçemez (test); demet geri alma testi.
E3 · GÖLGE KARŞILAŞTIRMASI — kollar ADIYLA: bugünkü matrisli yol · matris kapalı (frameRouting=0 + keyword her yolda) · lexical (BM25-TR) · dense (gerçek encoder) · hibrit (RRF) · + reranker; aynı görevlerde; backend başına Recall@k + tam-küme kapsaması + false-certain/over-abstain + p95 + token; OBLIGATION-OVERFLOW sıklığı; kapsama tabanı N'i buradan. Çıkış: kazanan ölçümle; `router.frameRouting=0` sahiple, arayüzden, kapıyla (kod değil); ALWAYS_INCLUDE → veri (G2c) buradan önce bağımsız küçük kart olarak inebilir (scout: çit ihlali şimdi).
E4 · KEŞİF–PLAN–YÜRÜTME BÜTÜNLEŞMESİ — `cwf_find_capability` zinciri üç sağlayıcıda; boru hattı sırası (clarify → stage 07) + şirket katmanı; st07p planlayıcı + yürütücü v0 (aggregate_records) + bütçeli fan-out; sonuç sınıfları. Çıkış: T2 tek tablo, ≤ router.maxFanout çağrı, sayıların tamamı yürütücü baytında; yeni keşfedilen araç aynı turda kullanılabilir (test).
E5 · ÖĞRENME VE KONTROLLÜ YAYIN — yönlendirme olayı → K23 → öneri → genelleştirilmiş kapı → canary → K21 yayın → geri alma; learnToolMapping freni kaldırılır YA DA olay yoluna taşınır; ardından MATRIX + IR enum'ları yönlendirme yolundan SİLİNİR (11 üretim + 8 test dosyası), G3/G4 ARMES grep kapısı (public/ dahil). Çıkış: ilk LEARNED öneri geçer-yayınlanır-geri alınır; regresyon kümesi yeşil; K-A ve K-A′ (iki backend) yeşil.
30 DAKİKA KURALI (12.8) burada yalnız şunu söyler: yeşil kod dalda 30 dakika içinde master'a iner ya da tek ölçülmüş nedeni adlandırılır; aşama boyu değildir. Tarih: her kart kesilirken tahmin olarak yazılır ve yeniden ölçülür (R7).

## 8 · Kabul sözleşmesi (A10; cwf-sota-definition'a izlenebilir; barajlar E1'de ilan edilir)

| Ölçüm | Kanıtladığı | SOTA izi |
|---|---|---|
| Tool Recall@k ve gerekli araç KÜMESİNİN tam kapsanması (backend başına) | Gerekli yetenekler erişilebilir mi | Tier C API-Bank; K19 |
| Doğru argüman/kapsam ve görev başarı oranı (held-out) | İş gerçekten tamamlandı mı | Tier B zero-code mount + E2E N=10/backend |
| Yanlış-kesin cevap ve gereksiz-vazgeçme oranı (iki yönlü) | Belirsizlik doğru yönetiliyor mu | Tier A Gaia2; A24 iki yönlü soru metriği; K22 |
| Çağrı sayısı, tekrar, token, GERÇEK maliyet (fatura; önbellek dahil) | Kaynak kullanımı iyileşti mi | K26 (c); K18 |
| p50/p95 gecikme | Hız kabul edilebilir mi | K18 SLO |
| Backend × dil × SAĞLAYICI kırılımı | Ortalama zayıf grubu gizliyor mu | P9; K19 |
| Yetki, şema değişimi, kesinti, geri alma testleri | Değişim ve arıza altında doğru mu | Tier D MCP-SafetyBench; K21; K10 |
| K-A/K-A′ iki görülmemiş backend sıfır kod (P4 kapsamı) | Genelleme | Tier B; AGNOSTIC-1 |
| K-G kodda backend adı 0 (public/ dahil) — GEREKLİ, yeterli değil | Hard-code yok | OWNER-RULING-S153 |

Dört tanık regresyon kümesindedir; yeni mimarinin başarı kanıtı onlarla sınırlanamaz; tasarımda kullanılan sorular held-out sayılmaz.

## 9 · Riskler ve sahibin hükmüne sunulan sorular

R1 · Katman kapsaması (L1-d) sıralar, düşürmez — v1'deki soru cevaplandı; scout ölçsün.
R2 · Türkçe paraphrase'de hangi kombinasyon: E3 karar verir; makaleden kazanan yok.
R3 · Reranker gecikmesi K18 içinde mi: E3 ölçer.
R4 · İki yolun paralel yaşaması (E3–E5) ölçüm borcudur; S102-YASA-3 gereği bugünkü yol E5'e kadar dokunulmaz.
R5 · tool_experience yarışı: küçük kart (F-S159-TOOL-EXPERIENCE-UPSERT-RACE-1) E2'de olay yoluna geçince yapısal olarak biter.
R6 · HÜKÜM: OWNER-RULING-S160-ROUTING-V2-1 — (a) K1 (S140) ve IR-3 yerine-geçme kuralının geri alınması; (b) göç varsayılanı: mevcut anahtar kelime satırları YÜKÜMLÜLÜK; (c) şirket katmanının veri olarak ilanı (tam-eşleşme); (d) sağlayıcı taban ölçümü harcaması (E1, üç sağlayıcı × held-out); (e) ADR-008 (scout'un istediği ruling) — çerçeve yalnız gözlem.
R7 · Tarihler tahmindir (TOTAL-45).
R8 · ToolScope/Toollery iç ayrıntıları scout'a (S1/S2); tasarım sonucu değişmez.

## 10 · Kaynaklar (okuma sınırları adıyla)
- A24-V1_3-ARCHITECT-CAPTURE-S150-1-v1 (proje kutusu) — bu belgenin tabanı.
- CWF-ASTRA-REVIEW-EVALUATION-S159-1 — her Astra maddesinin ölçümü.
- ToolScope (arXiv 2510.20036; ACL 2026 long 2026.acl-long.1573): birleştirme + bağlam-duyarlı süzme, +8.38…38.6 seçim doğruluğu (özet). Getirme yapılandırması ve etiket yeniden eşlemesi: BU OTURUMDA ARCHITECT OKUYAMADI (proxy 429) → scout S1.
- Tool-to-Agent Retrieval (arXiv 2511.01854): araç+ajan ortak uzay; LiveMCPBench'te ajan getiricilerine göre +19.4% Recall@5 — ölçülen ajan/sunucu getirmesidir, nihai cevap değil.
- Toollery (arXiv 2609.22218): kart başına üretilmiş kullanıcı-niyeti sorguları; scout okuması BM25 R@10 .942 vs embed+rerank .704; önbellek/fatura pasajı → scout S2.
- ToolRet (ACL 2025 Findings, 2025.findings-acl.1258): genel getiriciler araç bulmada zayıf; Türkçe ve projeye özgü sınav gereği.
- HYSET / "Tools Are Not Islands" (arXiv 2607.25718): set-düzeyi getirme; ilgili, zorunlu değil.
- BaRP (arXiv 2510.07429): LLM yönlendirmesi, bandit geri besleme — hipotez.
- SkillSmith (2606.01314), MUSE-Autoskill (2605.27366): kapılı beceri kaydı/budama — ilke düzeyinde.
- MCP spec 2025-06-18 tools: `name` "Unique identifier for the tool"; tools/call sunucu oturumuna adreslidir → sunucular arası benzersizlik istemcinin (bizim) işidir.
- "%98 bağlam", "30–50 araç" gibi sayılar mühendislik sabiti DEĞİLDİR; bu belgede eşik olarak kullanılmaz.

END · CWF-ROUTING-ARCHITECTURE-v2-DRAFT-S159-2
