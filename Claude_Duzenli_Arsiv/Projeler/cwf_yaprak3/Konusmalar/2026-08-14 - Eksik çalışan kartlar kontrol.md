# Eksik çalışan kartlar kontrol

**Sohbet ID (UUID):** `027bf8af-fc56-44a8-8721-c46d1c9fe1d4`

**Oluşturulma Tarihi:** 2026-08-14T09:20:05.117961Z

**Güncellenme Tarihi:** 2026-08-14T09:25:59.845229Z

**Özet:** **Conversation Overview**

The person, acting in an admin role, asked Claude to identify which of the 15 cards in the STAGES section were malfunctioning or incomplete. Claude conducted a comprehensive live audit using a fresh clone of the `cwf_yaprak` repository (origin/master `bfd9153b`, docVersion rev 258, 2026-08-14, 601 test files, 80 migrations) and Supabase MCP queries against the production database (project `fjbrkimwvtpwoxhziidh`).

Claude's audit found 4 cards functionally broken, 2 with declared architectural limits, and 1 misrepresenting live system state. Cards 03 (Intent/Understanding) and 04 (Planning) actively contain incorrect copy: both organs are live and active in production (router.enabled=1, planner.enabled=1 with 96/107 recent turns showing frame presence), but card text states they are off or silent. Card 07 (Tool Selection) has its learning arm frozen — `tool_category_cache` has had no new writes in 32 days. Card 13 (Format/Presentation) is operationally blind with no server-side span measurement. Card 14 (Memory Update) is the most deficient: turn-level learning attribution is log-only with no persistence, and the primary deliverable table has been stagnant for a month. Cards 05, 09, 10, 11, and 12 are functioning correctly per live telemetry.

Claude identified a systemic root cause labeled `F-S100-COVERAGE-FLOOR-BLIND`: the existing `stageCardCoverage.ts` tool checks card copy against source code floors but is structurally blind to published policy overrides in `domain_rules`, meaning any published rule that diverges from code defaults creates an undetected lie class. Claude proposed a fix labeled `STAGE-CARD-LIVE-TRUTH-1` — adding a third anchor type (`livePolicy`) that resolves actual published rule values — and offered to write the phase prompt if the person approves adding it to Wave 7 as an SC-A lane item.

**Tool Knowledge**

Supabase MCP `execute_sql` required iterative schema discovery before queries succeeded: column names like `probed_at` (not `observed_at`) on `tool_behavior_census`, `updated_at` (not `created_at`) on `semantic_memory`, and `ts` (not `created_at`) on `telemetry_events` all required separate `pg_catalog` introspection queries to resolve. Filtering `telemetry_events` for turn-done records uses `WHERE type='message' AND payload->>'kind'='turn_done'` with JSONB existence operator (`?`) for optional keys like `'planner'`, `'frame'`, and `'funnel'`. The `domain_rules` table does not have a `kind_id` column; the correct join pattern is through `rule_versions` on `rule_id` with `status='published'` filter. Fresh clone via `git clone` into `/home/claude/` followed by `git rev-parse origin/master` was used to establish ground truth per session rules before any grep-based code analysis.

---

## 👤 Kullanıcı (2026-08-14T09:20:05.991214Z)

ADMIN -> STAGES da olan 15 tane kart in hangileri eksik calismakta?

## 🤖 Claude (2026-08-14T09:25:59.845229Z)


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

## SOTA-1 — POZİTİF KONTROL (oturum açılış şartı, verbatim)

> **SOTA-1 — THE ACCEPTANCE CRITERION (owner-legislated S80).** The sole acceptance criterion for v1 is `cwf-sota-definition-v1`. Anything not traceable to a criterion in that file is out of v1 scope. The Architect may NOT defer, shrink or re-order-down any item that advances a SOTA criterion on the grounds of *"not needed yet / low traffic / this is enough for now / later / push to v1.1"*. The **only** objection class the Architect retains is *"this ordering makes SOTA unprovable"*, and it is admissible ONLY when it names, in writing: **(a)** which criterion would go unproven, **(b)** the date it becomes provable, **(c)** which measurement resolves it. Any deferral proposal missing those three is a **SOTA-1 violation**: the owner cancels it by name ("SOTA-1 ihlali") and the Architect either supplies (a)+(b)+(c) in the same message or withdraws the proposal — there is no third option. A criterion retires ONLY by evidence, never by convenience, cost, or scope pressure.

## RULE 25 — taze klon zemini (bu oturumda okundu, hafızadan değil)

`origin/master` = `bfd9153b90a002a1f1924a38120ac352738928dd` · docVersion **rev 258 · 2026-08-14** · **601 test dosyası** · **80 migration**. `grep -c "^{ no:'" src/components/admin/stagesRegistry.ts` = **15** — kart sayısı doğru.

Kanıt kaynakları: `domain_rules` yayınlanmış satırlar (canlı), `telemetry_events` turn_done son 10 gün (**192 tur**, 107'sinde huni alanı), organ tabloları satır sayımı.

---

## CEVAP: 15 kartın 4'ü fiilen eksik, 2'si ilan edilmiş sınır, 1'i canlıyı yanlış anlatıyor

| # | Kart | Durum |
|---|---|---|
| 00 | Kota Kapısı | ✅ tam |
| 01 | Kullanıcı Sorgusu | ✅ tam |
| 02 | Konuşma / Durum | ✅ tam |
| **03** | **Niyet / Anlama** | 🔴 **iki valf karanlık + kart canlıyı yanlış anlatıyor** |
| **04** | **Planlama** | 🟠 **organ ÇALIŞIYOR — kart "sessiz" diyor, yalan** |
| 05 | Bellek Getirme | ✅ tam (`retrievalTopK=3`; episodes 279, semantic_memory 15, tool_experience 7 — hepsi bugün yazıldı) |
| **06** | **Bilgi / RAG** | 🟡 başlık fazla söylüyor: vektör YOK (#27 Dalga 7, 2B.1 parkta) |
| **07** | **Araç Seçimi** | 🔴 **öğrenme kolu donmuş** |
| **08** | **Sıkıştırma** | 🟡 özetleyici yok + `stage-context`'te KALICI İNCE — ilan edilmiş sınır, arıza değil |
| 09 | Prompt Birleştirme | ✅ tam |
| 10 | LLM Çıkarımı | ✅ tam |
| 11 | Araç Döngüsü | ✅ tam (`replanNudgeMax=1`; telemetride `replans:1` ateşliyor) |
| 12 | Doğrulama | ✅ tam (107/107 huni `grounding:"ok"`) |
| **13** | **Biçim / Sunum** | 🔴 **kör nokta — organ çalışıyor, ölçülemiyor** |
| **14** | **Bellek Güncelleme** | 🔴 **en eksik olan** |

### Eksiklerin gerekçesi (canlı okumayla)

**03 · Niyet/Anlama** — üç valften ikisi kapalı: `router.frameRouting=0` (yayın v3; **v1 ve v2'de 1'di, geri alınmış**) → çerçeve aday setini çevirmiyor. `router.askOnUnresolved=0` → gölge karar, hiçbir şeyi yönlendirmiyor. Üstüne `router.learnEnabled=0` → öğrenme freni çekili.

**07 · Araç Seçimi** — sunulan-set kuruluyor, ama kartın vaat ettiği öğrenme kolu ölü: `tool_category_cache` **2 satır, son yazım 2026-07-13 11:07Z** — **32 gündür** tek yeni eşleme yok.

**13 · Biçim/Sunum** — sunucu span'ı yok, spanlanamaz. Huniden okunuyor: son 10 günde `n/a` 97 · `landed` 7 · **`gap` 3**. O 3 turda ne olduğu ölçülemez.

**14 · Bellek Güncelleme** — iki ayrı boşluk: (a) `stage-context.ts` KALICI İNCE diyor — tur-başına öğrenme atfı **yalnız logda** (`[Route]` özeti), persist edilmiyor; (b) kartın ana teslimatı olan `tool_category_cache` bir aydır yazılmıyor. Kart "floor↔live farkı tam budur" diyor; bugün fark donmuş.

---

## TEŞHİS — asıl bulgu kartlarda değil, kartları koruyan alette

Kart 03 "Fabrika tabanı yönlendiriciyi KAPALI tutar — **her turn doğrudan anahtar-kelime katmanından geçer**" diyor. Kart 04 "bu organ AÇIK ve **SESSİZDİR: sıfır bayt üretir**" diyor. İkisi de canlıda **yanlış**: `router.enabled=1`, `router.frameEnabled=1`, `planner.enabled=1` yayınlanmış; son 10 günde 96/107 turda çerçeve **present**, 85 turun 75'i `mode:"live", plan:true` (QUERY_MASTER ×26, QUERY_STATUS, QUERY_METRIC, routine…).

**Neden `stageCardCoverage.ts` bunu yakalamadı:** çapaları kaynak dosyaya grep atıyor — `{ path: 'agentParams.ts', needle: 'ROUTER_FRAME_ENABLED, value: 0' }`. Kod hâlâ 0 diyor, yayın 1 diyor. **Alet kart-vs-KOD ölçüyor, kart-vs-YAYINLANMIŞ-SATIR hiç ölçmüyor** — ve bu sistemde her kod tabanı bir satırla geçersiz kılınabilir. Yani S96'da tam bu yalan sınıfını kapatmak için kurulan enstrüman, yalanın ikinci biçimine karşı yapısal olarak kör. Yayınlanan her karanlık valf yeni bir kurban üretecek.

Adı: **F-S100-COVERAGE-FLOOR-BLIND** (baş tanıkları: kart 03 ve kart 04).

## ÖNERİ — tek yol

`STAGE-CARD-LIVE-TRUTH-1`: çapa sözlüğüne üçüncü bir tür eklenir — `livePolicy`, `resolveRouterPolicy`/`resolvePlannerPolicy` çıktısını okur ve kart metniyle karşılaştırır. Kart 03/04 aynı fazda yeniden yazılır (taban vs yayın ayrımı açıkça yazılarak, çünkü ikisi de gerçek ve ikisi de ölçüm). #57 SYNTHETIC-INJECTOR-SILENT dalga önceliğini bozmaz — SC-A sınıfı, C/D şeridine sığar.

## YOUR ACTION ITEMS

**Sıfır manuel iş.** Bu okuma tamamen Supabase MCP + taze klon üzerinden yapıldı. Tek beklenen şey senden bir karar: `STAGE-CARD-LIVE-TRUTH-1` Dalga 7'ye SC-A şeridi olarak girsin mi — "başlat" dersen faz promptunu yazarım.

