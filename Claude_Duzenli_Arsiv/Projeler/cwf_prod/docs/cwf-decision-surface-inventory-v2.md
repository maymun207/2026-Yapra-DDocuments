# CWF — Karar Yüzeyi Envanteri · KADEME SIRALI · v2

<!-- cwf-decision-surface-inventory-v2 · rev 2 · 2026-07-09 · v1'i tamamlar (aynı içerik,
     kademe-öncelikli pivot + 08'e resultStore eklendi). Kod-doğrulanmış: master `470eb7b`
     (1318/128, rev 54). Okuma anahtarı: bir kaynak birden çok kademede kullanılıyorsa
     HER ilgili kademede tekrar görünür — pivot'un amacı bu. -->

İşaretler: 🗄️ = DB tablosu · 🧱 = hard-coded kod · ✍️ = bu kademede YAZILIR · 🔬 = MICROSCOPE işlemi · ⛔ = admin yüzeyi yok

---

## `01` User Query
| Kaynak | Rolü | Admin | Microscope |
|---|---|---|---|
| (istek gövdesi) | Sorgu + varsa `labMode` bayrakları buradan girer | — | 🔬 Tweak bayrakları bu gövdeyle taşınır (sunucu yetkilendirir) |
| 🗄️ `telemetry_events` ✍️ | Turn kaydı başlar | Inspect (salt-okunur) | 🔬 Inspect satırı |

## `02` Conversation / State
| Kaynak | Rolü | Admin | Microscope |
|---|---|---|---|
| 🗄️ `auth.users` | Kimlik | Users/davet (magic-link) | — |
| 🗄️ `user_roles` | Rol → capability çözümü | GOVERN → Users | 🔬 `REPLAY_LENS`/`REPLAY_RUN`/`LAB_TOGGLE_SESSION` buradan türer |
| 🗄️ `user_backend_scopes` | Kullanıcının backend kapsamı | Users (kapsam ataması) | — |
| 🗄️ `conversations` | Oturum/başlık | Sohbet arayüzü | Specimen filtresinde başlık |
| 🗄️ `messages` | Geçmiş yükleme | — (kayıt) | 🔬 Replay specimen kaynağı |
| 🧱 `permissions.ts` | Capability kapıları | Users'ın sunucu gerçeği | 🔬 Lens/koşu kapıları burada tanımlı |

## `03` Intent / Understanding
| Kaynak | Rolü | Admin | Microscope |
|---|---|---|---|
| 🗄️ `tool_category_cache` | Öğrenilmiş keyword→kategori eşleme (advisory) | MICROSCOPE → Routing: görüntüle + Clear | 🔬 **Routing lens** `@floor\|live`; Tweak `routingBypass` katmanı atlar |
| 🧱 `CATEGORIES` | Statik keyword tabanı | Salt kod | 🔬 Routing lens `@floor` ekseni |

## `04` Planning / Decomp
| Kaynak | Rolü | Admin | Microscope |
|---|---|---|---|
| — | Ayrı planlayıcı yok (tool loop'ta örtük; LangGraph ertelendi — deferred connector) | — | — |

## `05` Memory Retrieval
| Kaynak | Rolü | Admin | Microscope |
|---|---|---|---|
| 🗄️ `messages` | Son-N pencere (kısa vadeli bellek) | — | 🔬 Replay aynı pencereyi yeniden kurar |
| (uzun-vadeli user memory) | **YOK** — blueprint'te bilinen PARTIAL; Memory connector deferred | — | — |

## `06` Knowledge / RAG
| Kaynak | Rolü | Admin | Microscope |
|---|---|---|---|
| 🗄️ `rule_kinds` | Yapı sözleşmesi (CORE Zod-kilitli / SOFT esnek) | GOVERN → Kinds | — |
| 🗄️ `domain_rules` | Governed bilgi (runtime SSOT, warm→read) | GOVERN → Rules (gated publish) | 🔬 **Grounding lens** `@floor\|live\|preview` |
| 🗄️ `rule_versions` | Yayınlı sürüm çözümü | Rules detayı + rollback | 🔬 Lens `live` ekseni |
| 🗄️ `kind_drafts` | YALNIZ lab preview'da okunur | Kinds → Drafts | 🔬 Tweak `previewDrafts` + lens `@preview` |
| 🧱 `referenceSchema` (blindSpots/zones/referenceData) | Outage-floor: DB çökse de empty≠zero ayakta | Kinds'daki "referansa sıfırla" hedefi | 🔬 Lens `@floor` ekseni TAM budur |
| 🧱 `labMode.ts` (`knowledgeSource`) | İstek-kapsamlı floor/db anahtarı | MICROSCOPE → Tweak | 🔬 Tweak'in kendisi |

## `07` Tool / Skill Select
| Kaynak | Rolü | Admin | Microscope |
|---|---|---|---|
| 🗄️ `tool_category_cache` + `routing_cache_meta` | Eşlemeden offered-set'e; epoch tazeliği | Routing (Clear = epoch bump) | 🔬 Routing lens `calledButNotOffered` regresyonu |
| 🧱 `ALWAYS_INCLUDE` | Availability floor — boş offered set imkânsız | Salt kod | 🔬 Lens lab'da bile floor'u düşüremez |
| 🗄️ `mcp_settings`/`mcp_secrets`/`mcp_global_settings` | Backend bağlantı + token çözümü (server-side) | Settings → MCP (secret maskeli) | — |
| 🗄️ `user_backend_scopes` | Kapsam filtresi (scopeTools) | Users | — |
| 🧱 `labMode.ts` (`routingBypass`) | Tam tool seti (OEE parity) | Tweak | 🔬 Tweak |

## `08` Compression
| Kaynak | Rolü | Admin | Microscope |
|---|---|---|---|
| 🧱 `resultStore` | Büyük tool sonuçlarını offload (handle ile) — blueprint'te STUB, özetleme yok | — | 🔬 Inspect'te resultStore log'u görünür |

## `09` Prompt Assembly
| Kaynak | Rolü | Admin | Microscope |
|---|---|---|---|
| 🧱 `identity.ts` | "Sen Kale Seramik asistanısın" — byte-kilitli | Salt kod (bilinçli) | Lab bile override edemez |
| 🧱 `safety.ts` | Yasaklar/anti-jailbreak/tool-içeriği-DATA — byte-kilitli | Salt kod (bilinçli) | Aynı |
| 🧱 `outputFormat.ts` + `toolProtocol.ts` | Ton, chart makroları, ARAÇLAR 1–10 | Salt kod | — |
| 🧱 Domain pack builder'ları | `domain_rules` DEĞERLERİNİ prompt'a dizer | Değerler GOVERN'den | 🔬 Tweak `knowledgeSource`/`previewDrafts` pack'i istek-kapsamlı değiştirir |
| 🗄️ `domain_rules` (dolaylı) | Pack içeriği | Rules | 🔬 Grounding lens |

## `10` LLM Inference
| Kaynak | Rolü | Admin | Microscope |
|---|---|---|---|
| 🗄️ `llm_providers` | Provider/model çözümü (TEK gateway) | GOVERN → Providers (provider=ROW) | 🔬 Tweak `forceProvider`; Replay POST provider seçebilir |
| 🗄️ `llm_providers_personal` | Kişisel provider (sahibine) | Providers → Personal | 🔬 Replay kişisel provider'la koşar |
| 🗄️ `llm_provider_secrets` | Anahtar (secret-by-reference) | Maskeli referans | — |
| 🧱 `labMode`/pinned provider | Oturumluk pin | Tweak | 🔬 Tweak |

## `11` Tool Loop
| Kaynak | Rolü | Admin | Microscope |
|---|---|---|---|
| 🗄️ `mcp_settings`/`mcp_secrets` | executeMCPTool bağlantısı | Settings → MCP | — |
| (CANLI ARMES/Superset sonuçları) | **Cevabın asıl içeriği — hiçbir tabloda değil** | — | 🔬 `raw_tool_results` olarak `messages`'a kaydolur → replay girdisi |
| 🗄️ `telemetry_events` ✍️ | tool_call kayıtları | Inspect | 🔬 Inspect |

## `12` Verification
| Kaynak | Rolü | Admin | Microscope |
|---|---|---|---|
| 🧱 `groundingCheck.ts` | empty≠zero · count · fabrication · scope_divergence (deterministik; LLM-yargıç YASAK) | — | 🔬 ÜÇ lens'in motoru (A1 tam verdikt, A3 `runScopeCheck`) |
| 🗄️ `backends` | Trust tier/scope kimliği (warm) | ⛔ **YOK — TRUST-PANEL-1 boşluğu** | 🔬 **Scope/Authority lens** `@floor\|live` |
| 🗄️ `backend_authority` | Metrik yetki haritası | ⛔ **aynı boşluk** — grant UI'dan yapılamıyor | 🔬 Lens `authorityDiff` ile grant flip'ini kanıtlar (REPLAY-A3) |
| 🧱 `backendTrust.ts` | Trust outage-floor (armes=SoR kaybolmaz) | ⛔ tabloyla birlikte gelecek | 🔬 Lens `@floor` ekseni TAM budur |
| 🧱 `referenceSchema` | Grounding sözlük tabanı | Kinds reset hedefi | 🔬 Grounding lens `@floor` |

## `13` Format / Render
| Kaynak | Rolü | Admin | Microscope |
|---|---|---|---|
| 🧱 `outputFormat` + FROM-TOOL direktifi + OBS-2 empty-guard | real-0=veri · missing=boşluk · empty="veri yok"; boş cevap asla boş ekran | Salt kod | 🔬 Replay scorer'ı aynı empty≠zero ayrımını puanlar |

## `14` Memory Update
| Kaynak | Rolü | Admin | Microscope |
|---|---|---|---|
| 🗄️ `conversations` ✍️ + `messages` ✍️ | Turn persist (raw_tool_results dâhil) | — | 🔬 Bir SONRAKİ replay'in specimen'i burada doğar |
| 🗄️ `tool_category_cache` ✍️ | Routing LEARN yazımı (öğrenme = bulma, asla bilme — §7) | Routing → Clear geri alır | 🔬 Routing lens floor↔live farkı = tam bu öğrenilmişler |
| 🗄️ `telemetry_events` ✍️ | Turn kapanış kayıtları | Inspect | 🔬 Inspect |

---

## Turn-DIŞI kaynaklar (hiçbir kademede okunmaz — yönetim/deney/denetim yüzeyleri)
| Kaynak | Ne zaman devrede | Yüzey |
|---|---|---|
| 🗄️ `rule_audit` · `provider_audit` · `mcp_secret_audit` · `llm_provider_secret_audit` · `user_audit` | İlgili CRUD/publish ANINDA ✍️ | Kendi sekmelerinin detayında salt-okunur (defter — edit yok, tasarım gereği) |
| 🗄️ `user_quotas` | 🔬 Ücretli replay POST'u harcar (reserve-clamp-settle) | QuotaPanel (super_admin reset/override) |
| 🗄️ `replay_audit` | 🔬 Her ücretli koşu TEK satır (A/B çifti dâhil) | ReplayTab geçmişi (redakte digest) |
| 🧱 `coreSchemas.ts` (Zod) | Yayın ANINDA eval-gate doğrulaması | Kinds "şemayı gör" modali |

<!-- END · cwf-decision-surface-inventory-v2 · rev 2 · 2026-07-09 -->
