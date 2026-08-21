# CWF — L1: PARAM-REGISTRY + TURN DAMGASI · Design Note · v1

<!-- cwf-L1-param-registry-turn-stamp-design-v1 · rev 1 · 2026-07-09 · Architect lane.
     EAIP-LIFECYCLE fazı L1 (program: cwf-decision-surface-inventory-v4 §Program v2).
     Kod-zeminli: origin/master `470eb7b` (1318/128, rev 54). HC-1 (her şey tweakable,
     kod=referans) + HC-2 (sandbox parity) tasarımın kurucu kısıtları. -->

---

## 1. Tek cümle
Agent parametreleri (`temperature`, `historyWindowN`, `obs.langfuseHost` — ilk üçlü) **yeni bir
alt-sistem değil, mevcut governed-kind yaşam döngüsüne binen bir CORE kind ailesi** (`agent.param`)
olur; her turn, hangi konfigürasyon revizyonlarıyla koştuğunu deterministik bir **config-fingerprint**
olarak span attr + `telemetry_events`'e damgalar — atıfsız lifecycle biter.

## 2. Kurucu karar: params = KIND, yeni tablo DEĞİL (committed)
`agent_config` diye yeni tablo + yeni lifecycle kodu yazmak HC-1/HC-2'yi sıfırdan inşa etmek olurdu.
Bunun yerine params `domain_rules` makinesine biner ve şunlar **bedavaya** gelir:
draft→eval-gate→publish→`rule_versions`→rollback→`rule_audit` (HC-1) · `kind_drafts` + `previewDrafts`
oturum-önizlemesi (HC-2, mevcut GOV-4 mekanizması) · Kinds/Rules panel kalıbı (v4 §UI deseni) ·
reset-to-reference (kod referans dosyası). Tek yeni parça: **hot-path okuyucu + damga**.

## 3. Kod zemini (doğrulanmış, `470eb7b`)
| Çapa | Bugün | L1 değişimi |
|---|---|---|
| `api/cwf/_lib/llm/config.ts:19` `GEN_TEMPERATURE` | env sabiti | Param-resolver default'u besler; env = son-çare floor'un floor'u |
| `api/cwf/_lib/llm/gateway.ts:92-133` | `params.temperature ?? GEN_TEMPERATURE` — **per-call seam HAZIR** | Turn yolunda resolver değeri geçilir; gateway'e dokunulmaz |
| `api/cwf/_lib/turn/stagesModel.ts:105` `.slice(-6)` | hardcoded son-6 | `.slice(-ctx.params.historyWindowN)` |
| `api/cwf/_lib/labMode.ts` + `TweakTab.tsx:153-172` | temperature/historyWindow **DISABLED placeholder**; başlık deseni tarif ediyor: "typed LabMode field + guarded application" | İki typed alan (`temperature?`, `historyN?`) + clamp + guarded uygulama; DISABLED→CANLI |
| `TurnContext` (`turn/types.ts:69`) | `turnId` (RULE 28 SSOT), `labMode: unknown` | `+ params: ResolvedParams` · `+ configFingerprint: ConfigFingerprint` |
| `TelemetryRepository.insert(event)` | düz insert | `config_fingerprint jsonb` kolonu (forward migration) |
| Slice/authority "global rev" | **YOK** | Damga deterministik hash ile üretilir (aşağıda) |

## 4. `agent.param` CORE kind (yapı Zod-kilitli — HC-1'in "yapı" yarısı)
```
{ key: string; value: number|string|boolean; type: 'number'|'string'|'boolean';
  min?: number; max?: number; stage: string;  // '10', '05', 'obs' — TweakTab çip dili
  sessionTweakable: boolean }                  // Tweak'te oturumluk açılabilir mi
```
Kod referansı `knowledge/reference/agentParams.ts` (seed · outage-floor · reset hedefi — HC-1):
`agent.temperature {value:0.7, min:0, max:2, stage:'10', sessionTweakable:true}` ·
`agent.historyWindowN {value:6, min:1, max:50, stage:'05', sessionTweakable:true}` ·
`obs.langfuseHost {value:'', type:'string', stage:'obs', sessionTweakable:false}` — **kuyruk #2
"endpoint switcher" bu satırdır**: host secret değil (anahtarlar `mcp_secrets`'ta kalır); boş →
env `LANGFUSE_HOST` floor'u. Eval-gate davranış probu: number param'da `min≤value≤max` şart.

## 5. Hot-path okuyucu + İKİ GİZLİ TUZAK (adlarıyla)
`resolveAgentParams()` — warm→read, `DbKnowledgeProvider` ailesiyle AYNI desen/faz (`stagesGovernance`
warm'ına eklenir; ekstra roundtrip yok). Outage/eksik satır → kod referansı. **Tuzak 1 — clamp her
kaynağa:** DB'den yayınlı değer BİLE koddaki `min/max`'a sunucuda clamp'lenir (bozuk publish ya da
elle DB yazımı temperature=50 yapamaz); labMode değerleri de aynı clamp'ten geçer — clamp fonksiyonu
TEK ve paylaşık. **Tuzak 2 — öncelik zinciri tek yerde:**
`labMode(oturum, yalnız sessionTweakable) > DB yayınlı > kod referansı > env` — bu zincir tek pure
fonksiyonda yaşar ve testle kilitlenir; dağıtık `??` zincirleri YASAK (OBS-3.1 `adoptedTier` dersi).

## 6. Config-fingerprint (damga)
Warm'da BİR kez hesaplanır, `TurnContext`'e konur:
```
{ promptRev:   PROMPT_CORE_REV,                 // kod sabiti; L2'de yayınlı rev'e döner
  paramsHash:  sha1(sorted published agent.param key:value:version),
  knowledgeHash: sha1(sorted published rule kind:key:version, per active backend),
  authorityHash: sha1(sorted backendId:metrics from warmed trust) }
```
Yazıldığı yerler: (a) `cwf.turn` span attr'ları (Langfuse'ta görünür), (b) `telemetry_events.
config_fingerprint` (forward migration; Operatör uygular — iki-kapı kuralı). Join anahtarı
`ctx.turnId` (RULE 28 — asla `traceId`). Hash SIRALI girdiden (deterministik) — test: aynı slice
iki warm'da aynı hash; bir rule publish'i hash'i değiştirir.

## 7. Sandbox parity (HC-2) — bedava ama KANITLANIR
Maker `agent.temperature` draft'ını `kind_drafts`'a yazar → Tweak/`previewDrafts` ile KENDİ
oturumunda dener → super publish. Test: A kullanıcısının draft'ı B'nin turn'üne ASLA sızmaz;
publish olmadan fingerprint `paramsHash` DEĞİŞMEZ (draft damgaya girmez — damga yalnız yayınlıyı
söyler; oturum overlay'i span attr'da ayrı `lab.*` alanında görünür, karışmaz).

## 8. UI (v4 kalıbının ilk klonu)
Tweak: iki DISABLED input CANLANIR (clamp'li, stage-çipli `05`/`10`). Rules/Kinds: `agent.param`
otomatik görünür (mevcut panel). Yeni mini-yüzey: Tweak'e "aktif fingerprint" rozeti (kısa hash'ler,
tıkla-kopyala) — mühendis "şu an hangi rev'deyim"i görür. `obs.langfuseHost` publish'i otel init'te
guarded okunur (floor=env; RULE 27 dokunulmaz).

## 9. Test planı (özet — AG prompt'u literal gate'ler)
Öncelik-zinciri pure testi (4 kaynak × 2 param) · çift-taraflı clamp (DB-üstü + lab-üstü) ·
outage→referans · fingerprint determinizm + publish-değiştirir + draft-DEĞİŞTİRMEZ · lab izolasyonu
(A'nın overlay'i B'ye sızmaz) · `slice(-N)` davranış testi · migration iki-kapı (authored/applied
ayrı; `verifyGrants` gerekmiyor — kolon ekleme, yeni tablo yok) · legibility gate'leri yeşil.

## 10. Non-goals
Yeni tablo yok (kolon ekleme hariç) · eval-gate motoruna dokunulmaz · prompt metinleri L2'nin işi ·
L5 segment-publish sonrası · `resultStore` eşikleri param olarak SONRAKİ dilim (stub aktifleşince).

<!-- END · cwf-L1-param-registry-turn-stamp-design-v1 · rev 1 · 2026-07-09 -->
