# CWF — İŞ PANOSU · S74 · v1
<!-- cwf-work-board-S74-v1 · 2026-08-01 · Architect: Claude.
     Kaynaklar: register v75 (defter) + sahip kolajı (S69-71 kesitleri) + S74 canlı olayları.
     Bu bir ÇALIŞMA PANOSUdur — kayıt defteri DEĞİL; defter oturum sonunda v76 olarak basılır. -->

## 0 · KOLAJ MUTABAKATI — orada açık görünüp BUGÜN KAPALI olanlar
A9 sır emekliliği · A2 F153 · A6 F214 zemin senkronu · MEMORY-1A/1B/1C + FIX-1 ·
F209-CHART-AXIS-1 · F212 (A1, 19 red) · F153 · F158 · F160(render) · viz üçlüsü
(TABLE-1 · UPLIFT-1 · MATCH-ARRAY-1). Kolajdaki "1A yarın damgalanır" satırı tarih:
1A **31 Tem 03:40:47Z tick'iyle** kapandı (deleted=0 scanned=3). BUGÜNKÜ 03:40Z
okuması FARKLI şey: `memory_audit`'in İLK forget_tick LEDGER satırı → **F48/A4'ü kapatır**.

---

## A · 🔴 UÇUŞTA (S74 — bu saat)

| # | İş | Şerit | Durum / Kapı |
|---|---|---|---|
| 1 | **F48 son tanık** — 03:40Z `[MemoryForget]` + `[MemoryAudit] forget_tick audited=true` çifti | Architect | Vadede okunur → F48 CLOSED → **A4 KAPANIR** |
| 2 | **VIZ-FINISH-1 · FIX-1-v1_1** — time-join (CHART-TIME-AXIS-1) · `bucket:day` deterministik grain · dense-pixel · monotonluk e2e · v4.1 job | AG-B | Yapımda |
| 3 | Golden **verdict + run id** raporu — publish YOK (stand-down mühürlü) | AG-A | Koşuyor |
| 4 | **v4.1 TEK publish** (FIX branch'inden; yeni consent satırı gerekir) | AG-B + sahip | FIX G4 |
| 5 | **W1′ + W2′** canlı tanıklar → bitiş tanımı → **VIZ-FINISH-1 CLOSED, geri dönüşsüz** | Sahip (el) + Architect (log) | Publish sonrası |
| 6 | Kapanış artifact'ları: **register v76 · KB v73 · bootstrap v73** (S74-1 yasası · S74-2 adayı · GO'suz merge notu · yeni bulgular · 0→rampa gözlemi · B5/factory_registry adresi) | Architect | Oturum sonu |

## B · 🟡 v1 YOLU — F48 kapısının ardında (sıra bağlayıcı)

| # | İş | Kapsam | Kapı |
|---|---|---|---|
| 7 | **Sahip kararları** | OEE-kardeş `69202e21` merge-mi-at-mı (önce Architect kanıt önerisi — fenced Operator okuması) · `fe8709c6` restoration disposition | F48 kapanışı |
| 8 | **A5 · FREEZE KALKIŞI** | `b1_scope` v3 · `tools.rule.1/6` v2 (F138/139/140) · F133-L5 · F83.1 alt-kalemleri · **FLOOR RE-SYNC RE-RUN** — *(viz v4 buradan ÇIKTI → VIZ-FINISH'te)* | 7 + S65-1 canlı okuma |
| 8′ | **A5 içinde: RAG-JOIN KAPISI** (10 madde) | backend satırı · MCP satırı **backend_id'li yeniden** · domain pack (UUID id-şekli dersi) · tool_category ZORUNLU · ENABLE · mirror doğrulama · pulldown görünürlüğü · post-enable 1 TTL · F207 gün-1 okuma · RAG-ATTR-1 | guard(a); **escape:** A5 bitince hazır değilse v1.1'e döner |
| 9 | **A7 · B6 min docs** | D-2 delegasyon sayfası · D-3 dil · **ADR-012 REPOYA İNİŞ** (taslak değil) · R-1 retrofit · STAGE-CARD-DRIFT-1 fix | A5 |
| 10 | **A8 · B7** | tag · release notes · dal budama · tam recount · *(factory_registry drop adresi v76'da netleşir)* | A7 |

## C · 🔵 v1.1 KUYRUĞU (baş sabit)

| Sıra | İş |
|---|---|
| **BAŞ** | **MEASURE-1** — feedback+sağlık panosu; üç sert hüküm: *asla oto-öğrenme · Wilson+governed-N · her 👎 golden adayı*; tasarım notu = B7 sonrası İLK artifact |
| 2 | **E-1** exemplar-ağırlıklı retrieval (store değişmeden) |
| — | Sırasız blok (adlarıyla): F48-ötesi evrim · F83 · **F166-B** (VIZ-BIND attributed carry-forward) · F171-B · golden-infra paketi (F142 · BUDGET-HONEST-1 · GOLDEN-ASSIST-2 · SPECIMEN-HEALTH-1) · POC-key belt · LANGFUSE-V4 · STAGE-PLAYGROUND · F196 hattı + retry-hardening · RECOVERY-1 kalemleri · D-4 devre-kesici · F206 · F177 (A23'e biner) · PROBLEM→push · settings-epoch cache imzası · bundle lazy-load · PROVIDER-PARITY (M-C'ye biner) |

## D · 🟣 A23 PROGRAMI (B7 sonrası, KENDİ programı)

⑤ teşhis / ⑥ yürütme / ⑦ cevap ayrımı · turn_context (typed/attributed/confidence) ·
çapraz-tur taşıyıcı İNŞASI (A-10/D-N7) · klarifikasyon kapısı + ALT-A₁/A₂ beşli aile ·
scope kapısı + discriminator · **PB-A** (③ typer + ④ BM25 + RRF — Yol B'nin İÇERİDEKİ yarısı) ·
D1-D5 dikişleri · E1-E5 metroloji + room card · L5 entity-miss defteri ·
**frameRouting yeniden-değerlendirmesi YALNIZ burada** (M1 5/52 · GO = M1=0/N≥30) ·
F177 teşhis çatalı (resolver mı IR mı — %67 blok) ilk ölçümlerden · F199 kapı-tanımlayıcı okuması bu ailede.

## E · ⚪ BİTİŞİK ALTYAPI (alarma bağlı — hiç ateşlenmeyebilir)

Qdrant (dense+sparse tek koleksiyon, sunucu-yanı RRF, tenant-per-collection) ·
bge-m3 (deterministik encoder, TR) · OPA (fail-closed Rego ← tool_annotation; **yalnız
EAIP multi-tenant'ta** — bugün gatewayPolicy+F80 aynı işi görür).
**Üç tetik ADI:** (a) korpus tek-Postgres-index tur ms-bütçesini aşar · (b) kritik yolda
p95 retrieval gecikmesi · (c) gerçek multi-tenant izolasyon. İzleme: Recall@k + p95.

## F · RAF KARARLARI (kayıttan, yeniden açılmaz — tetiği adıyla bekler)

| Karar | Hüküm |
|---|---|
| **Path B** | v5_3'te RATİFE ikiye bölündü: işlev İÇERİDE (Postgres FTS+RRF; `retrieval.topK/scoreThreshold` sözlüğü korunur) → PB-A A23'te · altyapı BİTİŞİK (E bölümü) · PB-B M-C'ye bağlı, M-C parkta |
| **Graph KB** | Kavram MERKEZİ, motor değil — 4-sorgu arayüz arkasında; topoloji zaten DATA (ADR-009). Alarm: multi-parent containment VEYA ms-bütçe |
| **LangGraph** | Blueprint v2_1 Shape B DEFERRED — TS çekirdek MCP servisi kalır, Python orkestre eder, governance dokunulmaz; ADR-012 RR-2 kapıyı yapısal açık tutar |

## G · 🟢 PARK / İZLEME (kayıtlı, kuyrukta değil — tam metinler v72 §7 + v75 §7)

| Tema | Kalemler |
|---|---|
| Ölçüm/karşılaştırma | M-C · SYNTH-TRAFFIC-2/F204 (M-C ön koşulu) · F211 · F207 (RAG-adoption ikizi) |
| Keşif/entity | F198 (PostgREST 1000 — her ekipman keşfinin ÖN koşulu) · DISCOVERY-EXTEND-2 (`static_args`; equipment `showAll` SKIPPED buna bağlı) · F184 · F165 · D5 · F189 |
| CI/altyapı | F196 3-imza · F208 · F216 · F219 · M-B · MAINTAIN-RESIDUE-SWEEP |
| Gözlem/watch | F178 · F179 · F180 · F202 · F191 · F197 binicileri · CLASS-GATE-1 · E-2 · E-3 · MCP-SPEC-DRIFT · CATALOG-MISSING-9 · **kuyruk 0→rampa OEE semantiği (S74 yenisi — ARMES doğrulamadan öğreti yok)** · F-CONTEXTTURNS · F-LEARNENABLE-PROVENANCE (defter dürüstlüğü) |
| S73 park | RAG-ROUTE-STARVE-1 (A5 kapısına emildi) · MCP-WARM-STALE-1 (ops-yasası A5'te; yapısal fix v1.1) · prose/render dissonance (v4.1 öğretisine emildi) · ~~tarih-önek elision~~ → **VIZ-FINISH G3'e alındı, parktan ÇIKTI** |

---
**Kritik yol tek cümle:** A1-6 bu oturum → 7 (kararlar) → 8/8′ (A5+RAG) → 9 → 10 → tag;
B4-lite paralel, kritik yola hiç binmez; C-G tag'in ötesi.
<!-- END · cwf-work-board-S74-v1 · 2026-08-01 -->
