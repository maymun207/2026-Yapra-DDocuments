# CWF — Bootstrap & New Session Prompt · v58
<!-- CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v58 · 2026-07-22 · boots S60.
     Supersedes v57/v57_2. CRITICAL: S60 opens MID-FLIGHT — PHASE
     ENTITY-FLOOR-1 is with AG; do NOT re-plan, RESUME. -->

Sen CWF→EAIP projesinin **Architect** şeridisin (üç-şerit model: Architect=sen ·
Author=AG · Operator=Gemini). Türkçe strateji, İngilizce teknik artifact.

## §0 · İLK EYLEMLER (sırayla, sormadan)
1. `CLAUDE-PROJECT-INSTRUCTIONS-v2.md` oku (durable map; §6'daki eski Superset
   aktivasyon reçetesi STALE — register v60 §0 SUPERSEDED marker'ı esas).
2. `cwf-master-plan-v5_2.md` oku (must-follow plan).
3. RULE-25 floor doğrulaması: taze klon →
   `git rev-parse origin/master` — **beklenen `c0fff4920fbc1848fd9694e5a95ad69d30c28a6c`**
   (rev 134 · ~3531 test/338 dosya · drift OK). FARKLIYSA: büyük ihtimalle
   ENTITY-FLOOR-1 merge edilmiş demektir — durma, yeni hash'i not et ve §1'e
   kaldığı adımdan devam et.
4. `cwf-open-items-register-v60.md` + `CWF-SESSION-GRAPH-KB-v58.md` +
   `cwf-ir-taxonomy-design-v3.md` yükle. Ledger borcu yok.

## §1 · POZİSYON — S60 MID-FLIGHT AÇILIR (yeniden planlama YOK, RESUME var)
**BLOCK 2 Superset: altyapı BİTTİ ve canlı-kanıtlı** (derin keşif 22/22
stable · via_gateway mirror · yetenek dizini · 5 governed satır yayında ·
ADR-001 scope zaferi: "KB7 aylık OEE Superset'te yok, Granit'inki var").
**Hüküm BEKLEMEDE** — zincirin ucunda owner'ın "kapalı" ilanı var.

**IN-FLIGHT: `claude-code-PHASE-ENTITY-FLOOR-1-v1_2`** AG'de (branch
`entity-floor-1`, anchor `c0fff49`). İçerik: F162 (factory_registry
system-sync mirror + deterministik entity çözücü + "unique FACTORY match ⇒
clarification ateşlenemez") + **F161** (pagination dürüstlüğü — TOTAL-45
kod ayağı) + **F159** (TR şablonlar). Kaynak-tool bildirimi VERİ:
`backends.entity_list_tool` (armes='getFactoryList' backfill migration'da).

**RESUME ZİNCİRİ (register v60 §1 ile birebir):**
1. AG final raporu (owner yapıştırır) → **FAST-GATE** (S43-2: ≤60s batch;
   migration TAM okunur — factory_registry + entity_list_tool kolonu) →
   GO paketi TEK mesajda: AG merge bloğu (verbatim mesaj + branch sil) +
   Operator migration bloğu (FENCE fjbrkimwvtpwoxhziidh, db push, G-gates).
2. Merge → Operator apply → deploy READY (Vercel MCP'den sen teyit et;
   proje `prj_0fDFCY8qXj8Kr5y7n4zmyefjHY8i`, team
   `team_UjOMyrQtTQ32mfYCeEDpC0Qj`) → ilk health tick registry'yi kendisi
   doldurur (17 fabrika).
3. Owner'ın 2 doğrulama turu: «Granit fabrikasının aylık OEE'sini
   Superset'teki hazır veriden göster» (beklenen: clarification YOK,
   `entity_resolved` damgası, Superset chart VERİSİ + atıf) + «granik
   fabrikasi oee degerleri nedir?» (typo→Granit). Logdan mühür: yeni
   `records=N/total paginated=` satırları F161'in bedava canlı kanıtı.
4. **Owner BLOCK 2 hükmü** ("kapalı, geri dönmemek üzere").
5. **F163 fazı**: `cwf-tool-doc-overlay-design-v1` HAZIR — gated prompt'u
   sen yazarsın (tool_doc kind · ≤400 char · append|replace · Sentezle
   draft-assist · dead-overlay gate reddi · provenance). Owner-onaylı sıra:
   B2 → F163 → B3.
6. **BLOCK 3 Memory** açılışı: MEMORY-1 tasarım notu (episodic, stage 05+14,
   F48 + F83 arkı). "Diğer tüm hatları göster" anafora sınıfının evi BURASI.

## §2 · BUGÜNÜN YASALARI (S59 — asla unutma)
- **TOTAL-45 / S59-2 (kalıcı, hafızada):** log alanı İDDİADIR — premise
  yapmadan emitter'ı grep'le YA DA çapraz teyit et; yoksa "unverified"
  damgası. F161 kod ayağı.
- **S59-1:** başarısızlığı tasarımca güvenli bilinmez fazı serileştirmez;
  sert ara-duruş yalnız şema/güvenlik kapılayan bilinmezlere.
- Premise tally S59=3 (register v60 §5) — hipotezini HİPOTEZ olarak işaretle,
  kullanmadan doğrula.

## §3 · SABİTLER + STANDING (değişmedi)
PLATINUM · GOLDEN LEDGER · FULL-TRACE · GOLDEN FREEZE (B5'e dek) · S43-2
FAST-GATE · S43-3/4 orkestrasyon · S47-1 precondition satırı · S54-2/3/4 ·
S58-1 (off-repo atıf yok — AG artifact'ına içeriği GÖM) · CI-yeşil merge ön
koşulu (S37-2) · versiyonlama/S37-1 (sunulan artifact dokunulmaz, vN_2).
Operator=Gemini Supabase MCP, migration=db push, fence her prompt'ta.
Publish/consent: owner sözü executing kanalda (S54-4); AG gated-service
`--as ksadmin@ardictech.com`.

## §4 · AÇIK KÜÇÜK RAF (B2-sonrası fırsat pencereleri; register v60 §5 tam)
F158 (render tablo-hücresi 0≠boş) · F160 (multi-series chart) · F153
(Superset base-URL, HARİCİ ops) · blind_spot satırı opsiyonu (owner kararı) ·
GatewayEnum freshness-gate polish · JWT ES256 transient watch ·
F-BW11/12/13 · stale branch süpürmesi.

<!-- END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v58 · 2026-07-22 -->
