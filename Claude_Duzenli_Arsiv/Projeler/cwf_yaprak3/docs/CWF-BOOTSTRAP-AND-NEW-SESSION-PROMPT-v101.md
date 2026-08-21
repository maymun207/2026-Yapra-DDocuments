# CWF — BOOTSTRAP & YENİ OTURUM PROMPTU · v101 (S101 için)
<!-- S100 kapanışında yazıldı. v100'ü geçersiz kılar. Oturumun İLK mesajıdır. -->

## 0 · KİMLİK
Architect (Claude) · AG-1..AG-4 (Claude Code — tüm repo yazımı, --no-ff, squash
yasak) · Operator (Gemini+Supabase MCP — yalnız `supabase db push`, ADR-005).
Strateji/karar Türkçe; teknik artefakt İngilizce.

## 1 · ÇAPA (S101 açılışında TAZE KLONDA DOĞRULA)
| Ne | Beklenen |
|---|---|
| `origin/master` | `2caaffba383a3bb0485d9d8438a5a07ee7d9747d` |
| docVersion | `rev 262` |
| vitest cetveli | **613** (src 149 + shared 6 + api 458) · e2e Playwright **16** AYRI |
| migration | **80** (canlı `schema_migrations` = 80 çaprazla) |
| ADR | **16** (yeni: ADR-016 policy-engine-is-the-governed-organ) |
| drift | `[OK] 7/7` + S99-5 pozitif kontrol (1 satır boz → FAIL → geri al → OK) |
| `phase/*` | **SIFIR ref** (S100 kapanışı origin'i master-only bıraktı) |
Boot adımı: busDelivery — Architect kabında ÇALIŞMAZ (kimlik yok, F-S100-…-HOMELESS
başlık düzeltmesi merge'li); birleştirme MCP(bus)+git(taze klon) elle, S100 modeli.

## 2 · S100'DE NE OLDU (miras)
- **DALGA 7 KOMPLE** tek oturumda: 14 merge, docVersion 258→262 kayıpsız.
  Kapı **5/7** — #23 döndü (PB-A: entity seam, lexical, valf `pathB.enabled`=0
  KALIR — Architect R4 okuması: DO NOT FLIP; 3 belirsiz satırın 2'si bayt-aynı
  metin, 1'i fuzzy-katman; lexical'in çözemeyeceği ölçüldü). Kalan: #25 · #29.
- **#57 tersine döndü:** enjektör hiç bozulmadı — pacing'siz harcama çitiydi.
  SYNTH-PACING-1 merge + **FLIP CANLI** (`synthetic.paceSpread` v2=1, 11:17:50Z).
  ⚠ S101 İLK OKUMA: `synthetic_runs` saatlik histogram (UTC rollover sonrası) —
  yayılım kanıtı + gün toplamı ≤ tavan. AG-2 defterinde OWED.
- **#56 census-console CANLI** — sahip kabulü BEKLİYOR: MİKROSKOP → Araç Sayımı
  yardımsız okuma (okunamazsa madde reopen). + #46 canlı re-probe borcu sürer.
- **#58** deliverables-slot: kartlarda makine bloğu, matcher yalnız onu okur,
  rapor-yolu kolu dal silinmesine dayanıklı (iki yanlış-pozitif sınıfı öldü).
- **A2A: resmî SDK'ya geçildi** (sahip Seçenek-1 hükmü). Zarf/lifecycle/kart
  SDK'nın; machineAuth/spendFence/runTurn bizim, çitler SDK'nın ÖNÜNDE. Gerçek
  a2a-sdk istemcisi task tamamladı — CWF artık TASKABLE. Borçlar: hosted
  harness auth kararı (401) + `context_id` sürekliliği.
- **VECTOR-SEAM-1 merge:** port + incumbent motor + deterministik encoder
  (golden-pinli), valfler `vector.enabled`=0 / `vector.engine`=incumbent,
  ikinci motor aynı portta kanıtlı. Bulgu: stand-in'de sparse taşıyor, dense
  gürültü — parite kapısı tasarım girdisi.
- **ADR-016:** policy engine = governed organ; match bar (provenance+clamp+
  gate); İKİ-AŞAMALI hüküm (federated ölçekte aynı sözleşme OPA'ya aynalanır,
  tetik "federated backend gerçek olduğunda") — IR-4 sözleşmesi
  `cwf-ir-pathb-hybrid-logic-v1_3` bağlayıcı taşıyıcı (sahip yeniden yükledi).
- Housekeeping: 12 bayat ref silindi · 14 migration STATUS yalanı düzeltildi
  (F-S100-MIGRATION-STATUS-LIES-11) · geniş bulgu WIDER (13 dosya, 2'si RUNTIME
  mesajı) Architect'te, Dalga 8.

## 3 · YENİ YASALAR (S100)
- **D-13 (doktrin v1_5, sahip yasası):** standart interop/taşıma protokolü
  RESMÎ SDK ile konuşulur, elle yazılmaz. Ayraç: "dış taraf uyumumuzu ölçebilir
  mi?" Evet→SDK varsayılan (D-13.2), kaçış valfi yalnız adlandırılmış ortam
  engeli (D-13.3), SDK adaptör kenarında yaşar (D-13.4). İç doğrulama/
  governance mantığı BİZİM kod kalır (ADR-001 kalbi).
- **S100-1 reseal ritüel değildir:** merge-turn reseal'i ağaç DEĞİŞTİYSE
  yapılır; hash değiştirmeyen reseal reseal değildir (AG-1 keskinleştirmesi).
- **S100-2 `paceAllowance` çifti kalıbı:** yalnız yeni build'de var olan alanın
  VARLIĞI deploy kanıtı, BOŞLUĞU kapının sorgulanmadığının kanıtı — "sıfır"
  ile "ölü" ancak böyle ayrılır (gözlem-tarafı S99-5 kardeşi).
- **S100-3 detached-HEAD merge formu SANCTIONED:** paylaşılan klonda master
  checkout'luyken merge detached-HEAD'de kurulur, `push HEAD:master`; -B/force/
  stash yasak; CI yeşili tree-hash eşitliğiyle taşınır. GO şablonuna girdi.
- **S100-4 AG izin ön-kuralı:** her AG penceresi kurulumda `git push` "Always
  allow" alır — tren izin duvarına bir daha çarpmaz.
- Kart grameri artık `deliverables` bloğu ister (kind=phase, R-DELIVERABLES).

## 4 · A-REC-S100 (Architect hataları, şeritler ölçerek yakaladı)
1. GO'daki "docs-only=CI beklenmez" YANLIŞtı — path-ignore yalnız push'ta; PR
   bilerek filtresiz. Kural: PR'da `total_count:0` HER ZAMAN FAILED.
2. VECTOR-SEAM tasarımı embedder'ı LLM hattına bağladı — IR-4 sözleşmesi tersini
   emreder (bge-m3 deterministik, "LLM DEĞİL"); sahip dokümanı yeniden yükleyince
   düzeldi. Ders: sözleşme dokümanları proje dosyalarına girmeden faz kesme.
3. Tasarım notu bus'a yazılmadan "carrier" diye anıldı (sahip yakaladı; D-2).

## 5 · DALGA 8 GÜNDEMİ (sıra önerisi, sahip onayıyla)
1. **QDRANT-ENGINE-1** (AG-3): KARAR-QDRANT-HOSTING-1 = AWS mevcut Langfuse
   EC2, İKİ konteyner (Qdrant + bge-m3), konteyner-probu ŞART, parite kapısı
   incumbent'a karşı, sessiz-fallback YOK (AG-3 tutarlılık noktası: confirm).
   Bütçe-çiti ~20'si döngüsü konteynerleri bilmeli.
2. **RBAC-GOVERNED-1** (AG-4): kelepçe — kod rol başına AZAMİ demet, satır
   yalnız DARALTIR.
3. FRAME-ERROR (1/9: `hat` IR_OBJECTS'te yok — enum genişletme, S99-6 tadili
   Architect'ten) · MIGRATION-LIES-WIDER · scrollbox hükmü + tek-viewport kör
   noktası (Architect) · corpus-vs-registry (grid referanslarının 1/3'ü
   kayıtta yok) · A2A auth kararı + `context_id` · #59 silent_finish ·
   #48 FAILURE-LESSON-MEMORY-1 · #25 🔑 Graph-KB · #29 🔑 A23.
3'. AG-2'nin histogram OWED'i S101 açılışında Architect bağımsız okumasıyla
   birlikte kapanır.

## 6 · SABİTLER
Supabase `fjbrkimwvtpwoxhziidh` · Vercel `prj_0fDFCY8qXj8Kr5y7n4zmyefjHY8i` /
`team_UjOMyrQtTQ32mfYCeEDpC0Qj` · GitHub `maymun207/cwf_yaprak` · Langfuse EC2
`i-030c2b4fadebfa229` · CloudFront `dl3644f5a7fnn.cloudfront.net` · EIP 52.57.7.5.
Sahip tarzı: tek yol, teşhis-önce, kapanmışı açma, her yanıtta "SENİN AKSİYON
MADDELERİN", adımlar Türkçe ekran kelimeleriyle, manuel iş BUG.
<!-- END · v101 -->
