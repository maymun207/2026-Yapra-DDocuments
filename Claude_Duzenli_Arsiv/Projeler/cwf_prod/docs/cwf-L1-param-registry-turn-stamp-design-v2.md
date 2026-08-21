# CWF — L1: PARAM-REGISTRY + TURN DAMGASI · Design Note · v2

<!-- cwf-L1-param-registry-turn-stamp-design-v2 · rev 2 · 2026-07-09 · Architect lane.
     v1'i GEÇERSİZ kılar. Rev-2 gerekçesi: 60-agent review (52 bulgu, 6 blocker, 0 çürütme) —
     v1'in hata modu sistematikti: makinenin zihinsel modelinden yazılmış, HEAD'deki koddan değil.
     Bu rev her taşıyıcı iddiayı `470eb7b` satır-referansıyla bağlar. Kurucu kısıtlar: HC-1/HC-2. -->

---

## 0. Rev-2'nin üç kurucu KARARI (blocker çözümleri)

**D1 — `system` backend şeridi (B1).** `agent.param`, `armes`/`superset`'e YALAN söyleyerek
pinlenmez; **`backends` tablosuna `system` satırı** eklenir (backend kimliği DATA — kendi
invariantımız) ve `system`-scoped kind'lar için **koşulsuz, adanmış küçük warm** açılır
(`ctx.activeBackends`'ten bağımsız — RBAC∩MCP kesişimi `system`'ı asla içermez, içermemeli).
Dürüst kod dokunuşu TEK literal: `shared/dbConstants.ts:244` `BACKEND_IDS`'e `'system'`
(admin-parse guard'ı; satır data kalır, literal guard'dır). `system` satırının trust'ı floor
(`authority: []`) — Scope/Authority lens'i otomatik doğru davranır. **Bu karar L2 için de
taşıyıcıdır:** prompt değerleri aynı şeritten akacak; şerit BİR kez şimdi açılır.
**min/max davranış probu eval-gate'e DOKUNMAZ:** kontrol `coreSchemas.ts`'e cross-field
`.refine` olarak girer — gate'in MEVCUT şema aşamasında koşar; motor byte-identical (§10 ayakta).

**D2 — Sandbox akışı düzeltildi (B2).** v1'in `kind_drafts`/`previewDrafts` rotası ÖLÜ yoldu:
`kind-drafts.ts:56-58` CORE'u 422 ile reddeder (RULE 24 gereği — doğru davranış) ve
`previewDrafts` yalnızca compose edilen bilgi METNİNE ulaşır, hiçbir resolver'a değil.
Rev-2 akışı: **oturum denemesi = YALNIZCA typed labMode alanları** (`temperature?`, `historyN?`,
clamp'li, `sessionTweakable` şart) · **yayın taşıtı = `domain_rules` DRAFT satırı**
(created_by-owned, scope-gated rules endpoint — mevcut kapı). Zincir dört-katman kalır (§5).
HC-2 sağlanır: session-preview (lab) → personal draft (`domain_rules` draft, sahip-kapsamlı) →
global publish (super) → reset-to-reference.

**D3 — `obs.langfuseHost` L1'DEN ÇIKTI (B3).** İki bağımsız ölümcül: (i) `otel.ts:63-77` init
senkron/env-only/pre-auth singleton — DB değeri rebuild'siz init'e ULAŞAMAZ; publish sessiz no-op
olurdu; (ii) exporter env `LANGFUSE_*` anahtarlarıyla configured host'a kimlik doğrular —
doğrulanmamış governed host = **anahtar + trace exfil kanalı**; v1'deki "anahtarlar mcp_secrets'ta"
gerekçem olgusal olarak YANLIŞTI. Kuyruğa kendi fazı olarak döner (**OBS-ENDPOINT-1**: https-only +
hostname-allowlist paylaşık clamp'ten, açık re-init seam, kayıtlı risk kabulü). L1 İKİ param gönderir.

## 1. Tek cümle (rev-2)
`agent.temperature` + `agent.historyWindowN`, `system` backend şeridinde mevcut governed-kind
yaşam döngüsüne biner; her turn, stage-9 sonrası kullanım-anı-yakalanmış girdilerden sha256
config-fingerprint üretir ve `done` telemetry olayı + kök span attr'larıyla damgalar.

## 2. Kod zemini (HEAD `470eb7b`, satır-bağlı)
| Çapa | Bugün | L1 |
|---|---|---|
| `llm/config.ts:19` `GEN_TEMPERATURE` (env) | env sabiti | **Floor'a katlanır**: kod referans değeri := `GEN_TEMPERATURE` (env-aware floor). `CWF_TEMPERATURE` override'ı YAŞAR — v1 zinciri onu öldürüyordu (major düzeltildi) |
| `llm/gateway.ts:92-133` per-call `temperature?` | REPLAY-B seam'i | Turn yolu resolver değerini geçer; gateway dokunulmaz |
| `stagesModel.ts:105` `.slice(-6)` | hardcode | `.slice(-ctx.params.historyWindowN)` |
| `stagesModel.ts:85` bilgi warm'ı | `stageAssemblePrompt` içinde | Param warm'ı da BURADA yaşar — **adanmış küçük fetch, dürüstçe**: `system`-scoped yayınlı `agent.param` satırları (v1'in "ekstra roundtrip yok"u yanlıştı; bu fetch backend-scoped ana warm'a binemez) |
| `TweakTab.tsx:153-172` DISABLED | placeholder 09/04 çipli | CANLANIR; **çip gerçeği: temperature `10`, historyWindow `05`** — shipped 09/04 çipleri de bu revizyona düzeltilir (UI çelişkisi kapanır) |
| `labMode.ts` | typed alan deseni başlıkta | `+ temperature?: number` `+ historyN?: number`; sunucu clamp + `sessionTweakable` kontrolü |
| `TurnContext` (`turn/types.ts:69`) | `turnId` SSOT | `+ params: ResolvedParams` (ham değerler) `+ configFingerprint` |
| `cwf.turn` kök span | handle ATILIYOR | Handle iş parçacığına taşınır (threaded) — attr'lar stream'den önce set edilebilsin |
| `cwfStore.ts:329-334` | istemci geçmişi SON 10'la kırpar | **`historyWindowN` seed max:10** — istemci L1'de dokunulmaz; >10 istenirse istemci gönderici touch-list'e girer (açık not) |
| `taskFn.ts` `HISTORY_WINDOW=6` + pairedReplay baseline | replay parity varsayımı | **§10 açık non-goal**: L1'de replay, KAYITLI ham değerleri okur (aşağıda) ama taskFn eşitlemesi L1 kapsamı dışı — sapma docblock'la işaretlenir |

## 3. `agent.param` CORE kind (yapı Zod, `system`-scoped)
```
{ key; value: number|string|boolean; type; min?; max?; stage; sessionTweakable: boolean }
```
`coreSchemas.ts` şemasına **cross-field `.refine`**: `type==='number'` ⇒ `min≤value≤max` (gate'in
şema aşamasında koşar — davranış aşamasının armes/superset dispatch'ine girilmez, motor dokunulmaz).
Kod referansı `knowledge/reference/agentParams.ts` (seed·floor·reset):
`agent.temperature {value:=GEN_TEMPERATURE→0.7, min:0, **max:1.0**, stage:'10', sessionTweakable:true}`
(provider-körlüğü düzeltmesi: Anthropic 0..1 — seed tavanı 1.0; aile-bazlı clamp sonraki dilim) ·
`agent.historyWindowN {value:6, min:1, **max:10**, stage:'05', sessionTweakable:true}`.
**Seed = Operatör kapısı (açıkça):** `system` backends satırı + `agent.param` `rule_kinds` satırı +
2 yayınlı `domain_rules` satırı — Kinds/Rules panelleri DB satırını render eder; "otomatik görünür"
ancak seed'den SONRA doğrudur (v1'in gizli ikinci kapısı artık isimli).

## 4. Çözümleme zinciri (tek pure fonksiyon — OBS-3.1 dersi)
`lab(oturum, yalnız sessionTweakable, clamp'li) > DB yayınlı (clamp'li) > kod-floor(env-aware)`.
Clamp TEK paylaşık fonksiyon, HER kaynağa (bozuk publish ya da craft'lı labMode tavanı aşamaz).
Dağıtık `??` YASAK; zincir tek testte kilitlenir.

## 5. Config-fingerprint (mekanik tamamen isimli)
- **An:** stage-9 sonrası (4 girdinin tamamı ancak burada hazır — son pre-stream nokta).
- **Kullanım-anı yakalama (torn-attestation önlemi):** her girdi KULLANILDIĞI anda ctx'e kopyalanır
  (slice satırları, authority map, param satırları); fingerprint SONRADAN asla yeniden-okumaz —
  warm singleton'ları publish'le yarışabilir; test §9'da.
- **İçerik:** `{ promptRev: PROMPT_CORE_REV, paramsHash, knowledgeHash, authorityHash }` — **sha256**,
  sıralı girdi. `PROMPT_CORE_REV` = yeni sabit, **içerik-hash disiplini** (repo'nun reseal-marker
  emsali; elle-bump literal değil): prompt core dosyalarının birleşik hash'inden türetilir,
  CI testi sabit↔hash eşitliğini doğrular.
- **Ham değerler de kaydedilir:** `params.temperature`, `params.historyWindowN` (gizli değil,
  2 sayı) — replay-parity'yi İLERİDE mümkün kılar + debug'da hash-çözme derdi biter.
- **Taşıyıcılar:** kök `cwf.turn` span attr'ları (threaded handle) + `telemetry_events` **`done`
  olayı** `config_fingerprint jsonb` (stage-3 `message` olayı damgadan ÖNCE atar — taşıyıcı `done`).
- **RBAC-scoped'luk açık beyan:** aynı yayın durumu, farklı kullanıcı ⇒ farklı `knowledgeHash`
  (activeBackends kesişimi) — damga kullanıcının GÖRDÜĞÜ dünyayı imzalar, global durumu değil.
- Migration: `ALTER telemetry_events ADD config_fingerprint jsonb` (forward-only; iki-kapı).
- **OBS-3 notu (docblock, kod değişimi yok):** tüm empty-retry denemeleri AYNI çözümlenmiş
  temperature'ı paylaşır; temperature republish'i Gate-B adopted-tier ölçüm bağlamını geçersizler.

## 6. UI
Tweak: iki input canlanır (clamp'li, `05`/`10` çipleri — shipped 09/04 düzeltilir); "aktif
fingerprint" rozeti **yeni küçük GET** ile beslenir (REPLAY_LENS endpoint kalıbı emsal; un-audited
pure read). Rules/Kinds: seed sonrası `agent.param` mevcut panelde.

## 7. Test planı (rev-2 ekleriyle)
Zincir pure testi (3 katman × 2 param) · çift-taraflı clamp · outage→env-aware-floor ·
**torn-attestation** (warm'ı turn ortasında invalidate et — damga kullanım-anı kopyayı imzalar) ·
fingerprint determinizm + publish-değiştirir + **draft-DEĞİŞTİRMEZ** + **lab-DEĞİŞTİRMEZ**
(lab ham `lab.*` attr'da ayrı) · lab izolasyonu (A→B sızmaz) · `slice(-N)` davranış ·
`.refine` gate testi (min>value publish 422) · `system` backend guard testi (parseBackend kabul,
scope lens floor) · PROMPT_CORE_REV içerik-hash CI eşitliği · legibility gate'leri · **istemci-10
tavanı bilinç testi** (max:10 seed'i `cwfStore` kırpmasıyla tutarlı — yorum satır-referanslı).

## 8. Docs / reseal / süreç (v1'de eksikti — RULE 20/3)
Aynı-pencere yükümlülükleri: `docVersion` rev 54→55 reseal (Control-Plane + Request-Lifecycle
sekmelerine below-altitude L1 notu) · `.agents/CHANGELOG.md` · iki-commit seal · KB/register
oturum kapanışında v29. Migration seal metni: "authored, Operator-pending" (asla ön-ilan yok).

## 9. Non-goals (rev-2)
`obs.langfuseHost` (→ OBS-ENDPOINT-1) · taskFn/pairedReplay parity eşitlemesi (sapma docblock'lu
açık non-goal) · aile-bazlı temperature clamp · istemci geçmiş göndericisi (>10 pencere) ·
eval-gate motoru/`kind_drafts`/`previewDrafts` (dokunulmaz — RULE 24) · L5 segment publish.

<!-- END · cwf-L1-param-registry-turn-stamp-design-v2 · rev 2 · 2026-07-09 -->
