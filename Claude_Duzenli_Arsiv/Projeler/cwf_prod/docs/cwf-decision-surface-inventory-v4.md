# CWF — Karar Yüzeyi TAM Envanteri · BİRLEŞİK (v2×v3) + KURAL REVİZYONU · v4

<!-- cwf-decision-surface-inventory-v4 · rev 4 · 2026-07-09 · v2 (kademe-sıralı tam satırlar) ile
     v3 (hüküm + gereksinim) BİRLEŞTİ; sahibin iki standing kuralı işlendi:
     (R-A) HER ŞEY TWEAKABLE — kod = hardcoded REFERANS (seed · outage-floor · her-zaman-dönülebilir
           reset hedefi), DB = versiyonlu/gated düzenlenebilir kopya. "Koda yazdım çünkü güvenlik"
           tek başına gerekçe OLAMAZ.
     (R-B) SANDBOX PARITY ZORUNLU — her yeni governed aile A/A2/A3 mimarisiyle %100 uyumlu:
           session-preview → personal-draft → global publish (yalnız super_admin) + reset-to-reference.
     Hüküm seti revize: 🔒 artık YALNIZCA motor/mekanik için (değer değil). Kod-doğrulanmış: `470eb7b`. -->

## Hüküm lejantı (revize)
✅ YETERLİ (bugün versiyonlu/gated değiştiririm) · 🧪 TEST-EDERİM-AMA-DEĞİŞTİREMEM ·
⛔ DOKUNAMAM (kod fazı gerekir) · ⛔➡️ **KURAL-İHLALİ: R-A gereği DB-first/code-floor'a TAŞINACAK değer** ·
🔒 MOTOR-KİLİDİ (değer değil MEKANİK — R-A kapsamı dışı; kod kalır: eval-gate motoru, grounding algoritmaları,
injection-boundary kablolaması, tek gateway, Zod yapı kilitleri, audit defter mekaniği)

Kolonlar: Rol (o kademede) · Admin (bugün) · 🔬 Microscope (bugün) · HÜKÜM · NE LAZIM

---

## `01` User Query
| Kaynak | Rol | Admin | 🔬 | HÜKÜM | NE LAZIM |
|---|---|---|---|---|---|
| İstek gövdesi + `labMode` bayrakları | Sorgu + oturumluk overlay girişi | — | Tweak taşır (sunucu yetkilendirir) | 🧪 | Kayıtlı-deney: bayrak setini adlandır/sakla → promote yolu (L1+L5); R-B ile doğal uyumlu (zaten session-katman) |
| `telemetry_events` ✍️ | Turn kaydı başlar | Inspect (salt-okunur) | Inspect satırı | ✅ gözlem | **Per-turn versiyon damgası**: prompt-rev/param-rev/slice-rev/authority-rev — atıfsız lifecycle olmaz (L1 çekirdeği) |

## `02` Conversation / State
| Kaynak | Rol | Admin | 🔬 | HÜKÜM | NE LAZIM |
|---|---|---|---|---|---|
| `auth.users` | Kimlik | Users/davet | — | ✅ | — |
| `user_roles` | Rol→capability | GOVERN → Users | Lens/koşu capleri türer | ✅ | Cohort/segment alanı (canary dilimi, L5) |
| `user_backend_scopes` | Backend kapsamı | Users | — | ✅ | — |
| `conversations` / `messages` | Geçmiş yükleme | Sohbet UI / (kayıt) | Specimen kaynağı | ✅ kayıt | — |
| `permissions.ts` | Capability kapıları | Users'ın sunucu gerçeği | Cap tanımları | 🔒 mekanik | Her L/Q fazı kendi cap'ini in-phase getirir |

## `03` Intent / Understanding
| Kaynak | Rol | Admin | 🔬 | HÜKÜM | NE LAZIM |
|---|---|---|---|---|---|
| `tool_category_cache` | Öğrenilmiş keyword→kategori | Routing: görüntüle+Clear | **Routing lens** `@floor\|live`; `routingBypass` | 🧪 | **L4 draft store**: satır-CRUD + draft→publish + versiyon + lens `@preview`; R-B: taslak kişisel, publish super (sandbox-parity) |
| `CATEGORIES` | Statik keyword tabanı | Salt kod | Lens `@floor` ekseni | ⛔➡️ | R-A: kategori üyeliği SOFT-governed satıra iner; kod kopyası REFERANS/floor kalır + reset-to-reference |

## `04` Planning / Decomp
| Kaynak | Rol | Admin | 🔬 | HÜKÜM | NE LAZIM |
|---|---|---|---|---|---|
| — (LangGraph ertelenmiş) | Tool loop'ta örtük | — | — | ✅ bugün | Geldiğinde plan şablonları AYNI desenle doğar: kod-referans + DB-versiyon + sandbox-katman (R-A/R-B baştan) |

## `05` Memory Retrieval
| Kaynak | Rol | Admin | 🔬 | HÜKÜM | NE LAZIM |
|---|---|---|---|---|---|
| `messages` son-N pencere | Kısa vadeli bellek | — (N kodda) | Replay aynı pencereyi kurar | ⛔➡️ | N = governed param (L1): kod default=REFERANS, DB override, Tweak'te oturumluk, reset mevcut |
| Uzun-vadeli memory | YOK (bilinen PARTIAL) | — | — | ⛔ deferred | Param-registry'ye `memory.enabled=false` yer aç; connector kendi fazında |

## `06` Knowledge / RAG
| Kaynak | Rol | Admin | 🔬 | HÜKÜM | NE LAZIM |
|---|---|---|---|---|---|
| `rule_kinds` | Yapı sözleşmesi | Kinds (CORE görüntüle/reset · SOFT editör) | — | ✅ | — |
| `domain_rules` + `rule_versions` | Governed bilgi SSOT | Rules: draft→gate→publish→rollback | **Grounding lens** `@floor\|live\|preview` | ✅ **ALTIN DESEN** | Tek eksik: segment/yüzde publish + guardrail auto-rollback (L5) |
| `rule_audit` | (yayında ✍️) | Rules detayı salt-okunur | — | ✅ defter | — |
| `kind_drafts` | Lab preview kaynağı | Kinds→Drafts | `previewDrafts` + lens `@preview` | ✅ | — (R-B'nin prototipi zaten bu) |
| `referenceSchema` (blindSpots/zones/referenceData) | Outage-floor + reset hedefi | Kinds "referansa sıfırla" | Lens `@floor` TAM bu | ✅ **R-A'nın kanonik örneği** | — (kural bunun genelleşmesi) |
| `labMode.knowledgeSource` | floor/db anahtarı | Tweak | Tweak | 🧪 | L1 kayıtlı-deney kapsar |

## `07` Tool / Skill Select
| Kaynak | Rol | Admin | 🔬 | HÜKÜM | NE LAZIM |
|---|---|---|---|---|---|
| `tool_category_cache` + `routing_cache_meta` | Offered-set + epoch | Routing (Clear=epoch) | Lens `calledButNotOffered` | 🧪 | L4 (bkz. 03) |
| `ALWAYS_INCLUDE` | Availability floor | Salt kod | Lab'da bile floor düşmez | ⛔➡️ | R-A **union-floor** semantiğiyle: kod listesi = değişmez FLOOR; DB yalnızca EKLEYEBİLİR (floor'un altına inmek yapısal imkânsız — routingSlice deseni) + reset |
| `mcp_settings`/`secrets`/`global` | Bağlantı+token çözümü | Settings→MCP | — | ✅ | Onboarding şablonları (nice-to-have) |
| `user_backend_scopes` | scopeTools filtresi | Users | — | ✅ | — |
| `labMode.routingBypass` | Tam tool seti | Tweak | Tweak | 🧪 | L1 |

## `08` Compression
| Kaynak | Rol | Admin | 🔬 | HÜKÜM | NE LAZIM |
|---|---|---|---|---|---|
| `resultStore` | Offload (STUB; özet yok) | — | Inspect log'u | ⛔➡️ | Eşikler governed param (L1); summarization feature-flag'li versiyonlu yetenek, hardcode değil |

## `09` Prompt Assembly — kalp
| Kaynak | Rol | Admin | 🔬 | HÜKÜM | NE LAZIM |
|---|---|---|---|---|---|
| `identity.ts` | Kimlik metni | Salt kod (byte-kilit) | Lab bile override edemez | ⛔➡️ | **L2 PROMPT-GOV**: metin = CORE-kind DEĞERİ (DB-versiyonlu, gated, rollback); kod metni = REFERANS (seed·floor·reset). Snapshot testi "yayınlı rev'e eşit" pinler. R-B: draft'ı oturumunda önizle → super publish |
| `safety.ts` | Yasaklar/refusal metinleri + §5 | Salt kod | — | ⛔➡️ (metin) + 🔒 (§5 kablolaması) | Metin alanları L2'ye; injection-boundary MEKANİĞİ (tool içeriği system'a asla girmez — yapısal test) motor-kilidi kalır. Eval-gate'e "güvenlik alanı floor'un altına inemez" probu |
| `outputFormat` + `toolProtocol` (ARAÇLAR 1–10) | Ton/format/araç kuralları | Salt kod | — | ⛔➡️ | L2: kural 1–10 tek tek versiyonlu değer; kod = referans+reset |
| Domain pack builder'ları | Değerleri prompt'a dizer | Dizilim kod | `knowledgeSource`/`previewDrafts` pack'i değiştirir | 🔒 dizilim + ⛔➡️ bölüm-anahtarları | Bölüm sırası/aç-kapa L1 param; dizilim motoru kod |
| `domain_rules` (pack içeriği) | İçerik | Rules | Grounding lens | ✅ | — |

## `10` LLM Inference
| Kaynak | Rol | Admin | 🔬 | HÜKÜM | NE LAZIM |
|---|---|---|---|---|---|
| `llm_providers` (+personal +secrets) | Provider/model çözümü | Providers (+Personal; secret maskeli) | `forceProvider`; replay seçebilir | ✅ satır | **Model PARAMLARI L1**: temperature/top_p/max_tokens/retry-tier — kod default=REFERANS, DB override, Tweak DISABLED'ları CANLANIR, reset |
| Tek gateway | `streamText` tek nokta | — | — | 🔒 mekanik | — |

## `11` Tool Loop
| Kaynak | Rol | Admin | 🔬 | HÜKÜM | NE LAZIM |
|---|---|---|---|---|---|
| `mcp_settings`/`secrets` | executeMCPTool | Settings→MCP | — | ✅ | — |
| Canlı ARMES/Superset sonuçları | **Cevabın içeriği** | — | `raw_tool_results`→replay girdisi | n/a | — |
| `telemetry_events` ✍️ | tool_call kayıtları | Inspect | Inspect | ✅ | Versiyon damgası (L1) |

## `12` Verification
| Kaynak | Rol | Admin | 🔬 | HÜKÜM | NE LAZIM |
|---|---|---|---|---|---|
| `groundingCheck.ts` motoru | empty≠zero·count·fabrication·scope algoritmaları | — | Üç lens'in motoru | 🔒 mekanik | — (LLM-yargıç yasağı sabit) |
| `METRIC_ALIASES` (motor içi hardcode) | Sözlük DEĞERİ | — | — | ⛔➡️ **çifte ihlal** (R-A + zaten `armes.metric_definition` kind'ı VARKEN duplikasyon) | Governed metric-definition'dan türet; kod kopyası referans/floor; tekilleştir (L2 yan-işi) |
| `backends` / `backend_authority` | Trust tier + yetki haritası | ⛔ YOK | **Scope/Authority lens** `@floor\|live`, `authorityDiff` | 🧪 | **TRUST-PANEL-1** (tasarım hazır): grant/revoke gated UI + audit; R-B: grant taslağı→super publish; lens yan panelde |
| `backendTrust.ts` | Trust REFERANSI (floor·seed·reset) | (panelle gelir) | Lens `@floor` TAM bu | ✅ R-A örneği | — |
| Grounding sözlük tabanı (`referenceSchema`) | Zone vocab floor | Kinds reset | Lens `@floor` | ✅ | — |

## `13` Format / Render
| Kaynak | Rol | Admin | 🔬 | HÜKÜM | NE LAZIM |
|---|---|---|---|---|---|
| Empty-guard DAVRANIŞI (boş asla boş ekran) | OBS-2 floor | — | Scorer aynı ayrımı puanlar | 🔒 mekanik | — |
| Guard/format METİNLERİ + FROM-TOOL ton | Kullanıcıya görünen dil | Salt kod | — | ⛔➡️ | L2 versiyonlu değer; kod = referans+reset |

## `14` Memory Update
| Kaynak | Rol | Admin | 🔬 | HÜKÜM | NE LAZIM |
|---|---|---|---|---|---|
| `conversations`/`messages` ✍️ | Turn persist | — | Sonraki replay'in specimen'i | ✅ | — |
| `tool_category_cache` LEARN ✍️ | Sistemin tek öğrenmesi (bulma, asla bilme) | Clear geri alır | Lens floor↔live farkı = öğrenilenler | 🧪 | L4: öğrenileni gör→düzelt→pin→versiyonla; nokta-atışı geri alma |
| `telemetry_events` ✍️ | Kapanış kayıtları | Inspect | Inspect | ✅ | Damga (L1) |

## Turn-DIŞI
| Kaynak | Rol | Admin | 🔬 | HÜKÜM | NE LAZIM |
|---|---|---|---|---|---|
| 5× `*_audit` defterleri | CRUD/publish anı ✍️ | Kendi sekmelerinde salt-okunur | — | ✅ defter (🔒 mekanik) | — (edit olmaması tasarım) |
| `user_quotas` | REPLAY token defteri | **QuotaPanel: per-user SET VAR** (PUT limit · no_limit · reset) — düzeltme: "yönetilemez" değil | Ücretli koşu reserve-clamp-settle | ✅ replay için · ⛔ **CHAT için kota kavramı HİÇ yok** | **Q fazı-1**: chat-usage kota ailesi (aynı atomik desen); politika = governed param (L1 satırı); R-B: kişisel görünüm herkese, SET super |
| **(YOK) Kullanım/maliyet ANALİTİĞİ** | — | ⛔ tarihsel grafik SIFIR: per-user & global token/cost zaman serisi yok (Inspect = tek-event + CSV) | — | ⛔ | **Q fazı-2 USAGE-ANALYTICS**: `telemetry_events` üstüne günlük/saatlik aggregate görünüm (materialized ya da sorgu), QuotaPanel'e kullanıcı grafiği + GLOBAL maliyet panosu; damga (L1) sayesinde "maliyet ↔ hangi rev" kırılımı |
| `replay_audit` | Koşu geçmişi | ReplayTab digest | Her POST tek satır | ✅ | Q-2 grafiklerine seri olarak girer |
| `coreSchemas.ts` (Zod) | Yayın-kapısı yapı kilidi | Kinds şema modali | Eval-gate doğrular | 🔒 mekanik | — |
| **(YOK) Golden set + batch eval** | — | — | Lens'ler tek-numune/manuel | ⛔ **en büyük tekil eksik** | **L3 EVAL-CI**: `eval_specimens` + N×lens×A/B koşucu + Wilson-CI eşikleri publish/merge GATE'i |
| **(YOK) Ortam/segment** | — | Publish anlık-global | — | ⛔ | **L5**: %-dilim publish (=fiilî staging) + guardrail auto-rollback |

---

# EAIP-LIFECYCLE · Program v2 (kural-revize)

## İKİ CROSS-CUTTING HARD CONSTRAINT (her fazda, istisnasız)
**HC-1 · R-A "Her şey tweakable, kod=referans":** Her governed değer ailesi ÜÇLÜ yaşar —
(1) KOD referansı: seed + outage-floor + **her zaman tek-tık reset-to-reference**;
(2) DB canlı kopya: draft→eval-gate→publish→**version→rollback**;
(3) Union-floor nerede geçerliyse (detektör/availability aileleri) DB floor'u ASLA zayıflatamaz.
"Koda yazdım çünkü güvenlik" tek başına RED gerekçesi — kilit yalnızca MOTOR/MEKANİK'e (🔒) kalır.
**HC-2 · R-B Sandbox parity:** Her yeni aile A/A2/A3 ile %100 uyumlu doğar:
session-preview (lab overlay, `LAB_TOGGLE_SESSION`) → personal draft (owner-scoped RLS) →
global publish = YALNIZ super_admin → out-of-band promotion. Developer HER ŞEYİ kendi
alanında dener; tek gated çizgi global commit. Uyumsuz tasarım = otomatik RED.

## Fazlar (committed sıra)
**L1 — PARAM-REGISTRY + TURN DAMGASI.** `agent_config` ailesi (temperature, history-N, retry-tier,
resultStore eşikleri, pack bölüm anahtarları, Langfuse host, memory.enabled, chat-kota politikası…);
TweakTab DISABLED noktaları canlanır (session) + gated global default; **her turn'e config-fingerprint**
(prompt/param/slice/authority rev'leri) → atıf mümkün olur. HC-1/HC-2 tam.
**Q — QUOTA & USAGE.** Q-1: chat-usage kota ailesi (replay'in atomik deseni). Q-2: USAGE-ANALYTICS —
per-user + global token/cost zaman serisi grafikleri (QuotaPanel'e kullanıcı grafiği, yeni global pano);
L1 damgasıyla "maliyet↔rev" kırılımı. *(L1 ile paralel koşabilir; TRUST-PANEL-1 de bağımsız yanında.)*
**L2 — PROMPT-GOV.** identity/safety-metin/outputFormat/toolProtocol-kuralları → CORE-kind değerleri;
yapı Zod-immutable; snapshot "yayınlı rev'e eşit"; güvenlik-floor eval-probu; `METRIC_ALIASES` tekilleşir.
**L3 — EVAL-CI.** Golden set + batch koşucu + eşik-gate. (L2'den ÖNCE minimum çekirdeği: L2 publish'leri
gate'siz çıkmasın — L3-lite golden-20 seti L2 ile aynı pencerede.)
**L4 — ROUTING-DRAFTS.** Draft store + satır-CRUD + `@preview` dürüstleşir + öğrenme yönlendirilebilir.
**L5 — PROGRESSIVE DELIVERY.** Segment/% publish + guardrail auto-rollback (%0 dilim = staging).

## Mühendisi hayran bırakacak arayüz deseni (her governed ailede AYNI, tek dil)
Her aile paneli DÖRT sütunlu tek kalıp: **Reference (kod) | Live (yayınlı revN) | My Draft | Preview** —
(a) Reference↔Live **diff görünümü** tek bakışta; (b) **tek-tık reset-to-reference** (HC-1'in butonu);
(c) sürüm zaman çizelgesi + rollback; (d) hemen yanında ilgili **lens düğmesi** ("bu draft geçmiş N turn'de
neyi çevirir?" — L3 golden-set'e bağlanır); (e) kademe-çipi (TweakTab dili: `06`, `09`…); (f) publish
butonu yalnız super'da yanar, maker'da "request promotion". Aynı kalıp Rules'ta bugün fiilen var —
L1/L2/L4/Q panelleri bu kalıbı klonlar; mühendis bir paneli öğrenince HEPSİNİ öğrenmiş olur.

<!-- END · cwf-decision-surface-inventory-v4 · rev 4 · 2026-07-09 -->
