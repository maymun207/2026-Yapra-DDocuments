# CWF — AÇIK KALEMLER REGISTER'I · v94

<!-- cwf-open-items-register-v94 · 2026-08-09 · S90 kapanışı. v93'ü supersede
     eder (S37-1). GOLDEN LEDGER: hiçbir kalem silinmez; çıkış yalnız
     CLOSED@evidence / SUPERSEDED-BY / MERGED-INTO ile olur. -->

## §0 · Kapanış zemini (hesaplanmış, taze klon — S90 kapanış okuması)
`origin/master` **`c1e3f5f99ac7a36fb8c6ccf4ff7c2cc99d8dd95b`** · docVersion **rev 222 · 2026-08-09** ·
**517** test dosyası (vitest kapsamı) · **68** migration · **13** ADR ·
GATEWAY_RULES **18** yayınlı (kod tabanı 16 + operatör 2) · üretim
`dpl_7Pyxpa7c…` **READY** @ `02a8d33` · `phase/*` **29** (kapanış süpürmesi borcu:
`gate-silence-visibility-1` + `route-derive-1`) · birleşik suite **517/6308, 0 skip**
(AG-1 birleşik ağaç ölçümü; master CI `31319314909` 5/5).
S90 merge'leri: `5d92d81` GATE-SILENCE-VISIBILITY-1 · `02a8d33` ROUTE-DERIVE-1.

---

## §1 · S90 SAHİP HÜKÜMLERİ (bağlayıcı, verbatim taşınır)

**H1 · METRIC-REGISTRY-DATA-1 (ana hüküm).**
> *"Bir back-end'e ait tapular hard-coded olarak kodun içine konmaz. Herhangi bir
> back-end bağlanır, problanır, verify edilir; tapu senedi sistemin kendisi
> tarafından belli bir maturity gözlemlendikten sonra assign edilir — gerekirse
> üstüne bir arayüz olur, admin oradan koyar. Ama kod içerisinde bugün OEE'dir,
> throughput'tur, fire'dır; bunları koymak mantıklı değil. Bu sistem bir sigorta
> şirketinde kullanılsa OEE'nin anlamı ne? Bankacılıkta FIRE'ın ne anlamı var?"*
> (Sahip, S90.)

Bağlayıcı taşıyıcı: **`cwf-design-METRIC-REGISTRY-DATA-1-v1`** (tam recon,
kilitli hedef şekil, 5 kabul kanıtı, S89-uzlaşma maddesi içinde).
Özet: mekanizma (tapu defteri, yayın kapıları, BEYAN) **kodda kalır**; kelimeler
ve takma adlar (`shared/dbConstants.METRIC_IDS` + `shared/metricVocab.ts` — ikisi
de SİLİNİR) **backend-scoped governed satıra iner** (`backend.metric_registry`);
armes üçlüsü armes ABSENCE-ONLY seed'i olur; **platform tabanı BOŞ**.
`MetricId` kapalı union olmaktan çıkar (kapalı union tip düzeyinde hard-code'dur).

**H2 · METRIC-VOCAB-DISCOVERY-1 ratife.** Sözlük **self-learning ile, governed
kapıdan** büyür; klavye yolu yoktur ve olmayacaktır. Keşif ÖNERİR, governance
KARAR VERİR, anahtar yalnız yayınla doğar. Önkoşulu H1'dir. Yeri: CENSUS arkası.

**H3 · MEMORY-HYGIENE-Q.** `BEYAN-PERSIST-Q` + çöp-dossier kalemi tek adla
MERGED-INTO. Elle silme REDDEDİLDİ (PLATINUM); çıplak TTL reddedildi (kör);
düşüş ADR-010 gözlem disiplinine bağlanır.

**H4 · GATE-SILENCE-VISIBILITY-1 açıldı** (S90 denetim bulgusundan doğdu, aynı
gün merge edildi — aşağıda ✅).

**H5 · Dokümantasyon borcu:** **BENCH-KULLANIM-DOC-1** — tezgâh UI'ının
kullanım dokümanı (S90'da sahiple birlikte koşulan A→G deney formatında:
ne işe yarar → adım adım → beklenen çıktı). Evi: User Docs sekmesi; Data
Authority açıklaması da yanına.

---

## §2 · S90'DA KAPANANLAR (hepsi kanıt işaretçili)

- **GATE-JURISDICTION-AUDIT-1** ✅ CLOSED@evidence — 9 dayatıcı/dürtücü organ
  kaynak-okumasıyla denetlendi (planner kapısı · BurstGuard · landing G2/G3 ·
  grounding · BUG-032 karantinası · gateway decline-on-empty · admin
  PANEL_ACCESS · clarification · zırh). **Madde-3 ihlali SIFIR.** Bulgu:
  Madde-4 (susuş görünürlüğü) açığı üç organda → H4.
- **GATE-SILENCE-VISIBILITY-1** ✅ merge `5d92d81`; 10 mutasyon/10 ölüm;
  **üretim tanığı 18:44 turu**: `turn_done.burstGuard="watched"`,
  `landing={g2:"no-claim", g3:"clean"}` — S63-1 kanıt okuması TOPLANDI.
  Kalan yarım: `cwf.grounding.vocab_source` span attr'ı (Langfuse tarafı)
  **OKUNMADI ≠ İNMEDİ** — S91'de okunur.
- **2E.2 ROUTE-DERIVE-1** ✅ merge `02a8d33`; 15 mutasyon/15 ölüm;
  **üretim tanığı 18:00 + 18:31 cron tick'leri**: dört backend'de
  `trigger=post-sync` koştu; armes ilk tick `categoryDraftsStaged=4` →
  ikinci tick `0` (**idempotence canlı kanıtlandı**, DB'de 4 taslak
  `armes.tool_category`, 18:01); `rule_audit`'te bu yoldan **sıfır publish**.
- **A1 hint-emekliliği · 2F bilişsel blok** — v93'te kapandı, değişmedi.

---

## §3 · S90'DA DOĞAN ADLI KALEMLER

- **METRIC-REGISTRY-DATA-1** (H1) — sıradaki faz; `groundingCheck.ts` kısıtı
  GATE-SILENCE merge'iyle kalktı, prompt kesilebilir.
- **METRIC-VOCAB-DISCOVERY-1** (H2) — ratife, CENSUS arkası, önkoşulu H1.
- **MEMORY-HYGIENE-Q** (H3) — tasarım sorusu, bellek ailesi.
- **BENCH-KULLANIM-DOC-1** (H5) — dokümantasyon.
- **TOOL-ANNOTATION-KIND-MINT-1** ⚠ **YENİ, ÜRETİM TANIKLI** — cron logu
  gösterdi: `superset.tool_annotation` ve `honestbench.tool_annotation`
  kind'ları YOK, dolayısıyla dört taslak her tick'te `unknown kind` ile
  reddediliyor (`failed=4`). AG-1'in öngördüğü "güvenli sıfır" tam olarak
  gerçekleşti ve **dürüstçe raporlandı** — fix'in kendisi çalışıyor. Evi:
  `rule_kinds` seed domain'i (`kindsOnly` mekanizması); `kinds.test.ts` pini
  zaten yerinde.
- **FRAME-ON-ALL-PATHS-1** — v92'den sessiz düşmüştü, S90'da restore edildi
  (bkz. §6 ders 3). Evi: CENSUS dalgası.
- **evalGate armes-only kalıntısı** — `evalGate.ts:160-164` hâlâ armes'e
  bağlı; ROUTE-DERIVE-1 GO'sunda ADIYLA kabul edildi. Evi: 2E.3 / yayın-yolu
  ailesi. Bugün erişilemez (armes-dışı hiçbir şey yayınlamıyor).

---

## §4 · İZLEK ÇAPALARI (sahip talebi — her register'da sabit bölüm)

| İzlek | Durum | Sıradaki hareket |
|---|---|---|
| **① Anlama katmanı** | ⬜ Blok 4 (A23); hammadde hazır (2F kapalı) | 2.7 FRAME-SHADOW-EVIDENCE-1 → FRAME-ON-ALL-PATHS-1 → 2E.4 ROUTE-ASK-1 → A23 |
| **② Orchestrator** | ✅ CANLI (`162bffe`+`5a052dc`); S90 turunda `gate:active · plan:true · steps:11` | Nöbet: W-032, susuş-oranı okuması. Evrim: n8n eylem-uzvu → LangGraph (park) |
| **③ Graph-KB** | ⬜ 4 bellek katmanının inşa edilmemiş tek kalanı | 2.8 DISCOVERY-EXTEND-2 → 2D.2 LINE teşhisi → **2D.3 GRAPH-KB-1** |
| **④ PathB (BM25+Regex)** | ⬜ 2D'nin açılış satırı | **2D.1 PB-FULL-1/PB-A** → LLM-SCAN-BASELINE-1 (vektörün geçmesi gereken çıta) → 2D.4a/b |
| **⑤ CS329A (K1–K6)** | K1✅ K2✅ K5-i✅ · K3 park · K4/K5-ii/K5-iii kuyrukta | CANARY-POWER-1 (K5/§2-c5) · HONESTBENCH-HARNESS-0 · EVAL-SPLIT-LAW (Blok 3 kapısı) |

---

## §5 · AÇIK KALANLAR (v93'ten devir + S90 ekleri)

BUG: **005** (proje kapanışı) · **014** (önkoşulsuz) · **015 · 016 · 017**
(#6/2E.3 evli). ARMED: **010-down · 029**.
W: **018 · 030 · 032 · 033** + UI-POLISH-NOTE · Gemini+PII 3. veri noktası ·
**no-jurisdiction üretim ORANI** (artık ÖLÇÜLEBİLİR — G2/G3/burstGuard alanları
canlı; telemetri birikince tek okuma).
W-026 sicili ×5. Yeni: **TOOL-ANNOTATION-KIND-MINT-1** · **BENCH-KULLANIM-DOC-1** ·
**MEMORY-HYGIENE-Q** · **HISTORY-DIET-1** · **evalGate armes kalıntısı**.
**Kanarya defteri: 9× ardışık `verdict:null`** — S90'da iki koşu daha, sonuncusu
`scoredReps 5` (seri 4·2·3·2·5, like-for-like). CANARY-POWER-1 aciliyeti büyüdü,
yeri değişmedi (#6).
**Kapanış süpürmesi borcu:** iki S90 dalı (`phase/*` 29 → 27).

---

## §6 · DERS SATIRLARI (v94 mührü)

1. **S90-1 · TEK-SKALER SESSİZ MUTABAKAT YASASI.** Çift şeritte iki lane'in de
   yazdığı tek-skaler bir alanın (docVersion) arıza modu **çatışma değil,
   sessiz mutabakattır**: git anlaşan iki tarafı çatışmasız birleştirir, bir
   revizyon buharlaşır ve `check:doc-drift` yeşil kalır çünkü *hash'ler* doğru
   reseal olur. Bu alanı hiçbir kapı denetlemiyor. **Merge anında açıkça SET
   edilir, asla miras alınmaz.** (AG-1 ölçtü; yakalanmasının tek sebebi GO'nun
   sayıyı adıyla yazmasıydı.)
2. **Mühür beklentisi yazılmaz.** Bir fazın dosya haritası mapped alana
   giriyorsa `checkDocDrift` içerik hash'lediği için mühür oynamak
   ZORUNDADIR; "rev N stands" beklentisi mekanik olarak imkânsızdır. İki
   şerit bunu birbirinden bağımsız kanıtladı → **Architect brief hatası,
   BUG-016 sicili.** Doğrusu: reseal önden ısmarlanır.
3. **Sahibe sunulan insan-okur tablo da envanter denetimidir** (v93'ten):
   S90'da bu ders **ikinci kez** ateşlendi — sahibin paylaştığı eski belge
   çapraz-kontrolde iki sessiz düşme yakalattı (çöp-dossier kararı,
   FRAME-ON-ALL-PATHS-1). Kalem adlı çıkış olmadan düşerse ledger yasası
   ihlal edilmiştir.
4. **Karanlıkta alınan karar aydınlıkta yeniden yargılanır** — S89'da doğdu,
   S90'da **ikinci celsesi** görüldü: METRIC_IDS'in 28 Haziran'daki
   tapu-anahtarı doğumu, çok-backend dünyasında sahip tarafından düşürüldü.
   Ders artık iki tanıklı ve genel: *tek-backend varsayımıyla alınmış her
   karar, ikinci backend geldiğinde yeniden yargılanır.*
5. **Bir organın üç kanıtı vardır ve üçü ayrıdır:** birim yeşili (organ doğru
   mu) · CI yeşili (ağaç bütün mü) · **tezgâh/sahip gözü** (organ SANA doğru
   görünüyor mu). S90'da üçü aynı gün toplandı; hiçbiri ötekinin yerine geçmez.
6. **`turn_done` bir `message` satırıdır** (`payload.kind='turn_done'`,
   `telemetry_events.type` CHECK'i 'done' kabul etmiyor). Ledger sorgusu
   yazan herkes bunu bilmeli — S90'da Architect'in ilk sorgusu bu yüzden boş
   döndü ve "veri yok" sanıldı; **şema bilgisizliği "yokluk" gibi görünür.**

<!-- END · cwf-open-items-register-v94 -->
