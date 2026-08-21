# VSCode'da Claude performans karşılaştırması

**Sohbet ID (UUID):** `032e46c4-aacd-4a30-9df1-3a18494ee2f5`

**Oluşturulma Tarihi:** 2026-07-29T12:14:07.466870Z

**Güncellenme Tarihi:** 2026-07-29T12:16:23.537900Z

**Özet:** **Conversation Overview**

The person asked Claude to compare the performance of using Claude models through GitHub Copilot in VSCode versus accessing Claude directly through a self-hosted LiteLLM gateway with the Anthropic API. The conversation was technically detailed and conducted in Turkish throughout.

Claude used web search and page fetch tools to verify current pricing and capabilities before answering, discovering that GitHub switched to usage-based billing on June 1, 2026, making Copilot's per-token rates for Anthropic models identical to Anthropic's own list prices. This finding reframed the entire comparison: cost is no longer the differentiating factor, and the real differences lie in context control, prompt cache breakpoint ownership, content filtering overhead, model version pinning, and observability.

Claude provided a structured analysis covering token pricing parity, context window behavior, content filter latency implications, data routing differences, and a concrete cost calculation demonstrating up to 65% savings through proper prompt cache management. The recommendation was a hybrid approach with a clear split rule: keep a Copilot seat exclusively for inline tab completion (which remains unlimited on paid plans and doesn't consume AI credits), and route all agentic and chat work through LiteLLM for full cache control, Langfuse observability, exact model version pinning, and data sovereignty. Claude flagged two specific gotchas: Copilot's bring-your-own-key option still routes through GitHub infrastructure and doesn't solve sovereignty concerns, and a known LiteLLM bug (issue #27763) where cached tokens aren't properly normalized in cost reporting on the `/v1/messages` passthrough, causing inflated cost dashboard figures. The person's existing LiteLLM and AntiGravity IDE setup was referenced as already aligned with the recommended direction.

---

## 👤 Kullanıcı (2026-07-29T12:14:08.459404Z)

Kod geliştirirken VSCode üzerinden github copilot aracılığıyla claude modeli kullanmayla, doğurdan VSCode üzerinden LiteLLM gateway üzerinden Claude api key'i kullanma arasında performans karşılaştırması yap.

## 🤖 Claude (2026-07-29T12:16:23.537900Z)

I'm thinking through the performance differences between accessing Claude through GitHub Copilot in VSCode versus connecting directly through a self-hosted LiteLLM gateway, keeping in mind the user's strong preference for self-hosted solutions over cloud alternatives like OpenRouter for data sovereignty reasons.

The key technical tradeoff is that GitHub Copilot wraps Claude with its own system prompt and tooling scaffolding, which adds overhead and truncates the available context window, whereas a direct LiteLLM connection gives you the full model capabilities but requires managing the gateway infrastructure yourself. I'm considering latency, context availability, prompt caching, rate limiting, cost structure, and observability across both approaches. Performance could mean latency, code quality, or cost-efficiency — the real differentiator isn't the underlying model since both use the same one, but rather the context harness: how much context gets sent, system prompt design, tool definitions, and caching effectiveness. I should verify current Copilot pricing multipliers and model availability since these change frequently and my knowledge cutoff is May 2026.

I'm also thinking about whether Claude Code deserves mention as a third option given their setup with AntiGravity and the VSCode extension. Let me search for the current facts on Copilot's request multipliers, context limits, and LiteLLM's caching support so I can lead with a direct recommendation backed by evidence rather than presenting options.Bu konuda güncel fiyatlandırma ve limit bilgilerini doğrulamam gerekiyor — Copilot'ın premium request çarpanları sık değişiyor.
```
This block is not supported on your current device yet.
```

I need to look up GitHub's current pricing structure since they switched to usage-based billing in June 2026, and also verify what context window limits apply for Claude models with Copilot.Billing modeli 1 Haziran 2026'da değişmiş. Güncel token fiyatlarını doğrudan GitHub dokümanından alayım.
```
This block is not supported on your current device yet.
```

So Copilot switched to usage-based pricing in June 2026, and now their per-token rates for Anthropic models match Anthropic's own pricing exactly—Sonnet 4.5 at $3/$15 and Opus at $5/$25. This fundamentally changes the competitive landscape since the cost advantage argument that previously favored Copilot has essentially disappeared.

The real differentiators now come down to context window sizes, how efficiently each platform handles prompt caching, latency from the extra routing layer, data residency requirements, observability and monitoring capabilities, model version control, and any bundled credits included with Copilot Pro subscriptions. I need to verify Copilot's context window limits and confirm the current Anthropic API pricing to ensure I'm working with accurate numbers.GitHub 1 Haziran'da usage-based billing'e geçmiş — çarpan sistemi artık büyük ölçüde tarihe karışmış. Şimdi context window limitlerini kontrol edeyim, çünkü asıl fark orada.
```
This block is not supported on your current device yet.
```

Looking at the key capabilities and limitations of Copilot's integration with these models — the 1M token context is restricted to VS Code and CLI, there's configurable reasoning available, pricing matches Anthropic's, and content filtering adds overhead on the default models. The thinking seems to cut off while mentioning model retirement history.

I notice GitHub manages its own model lifecycle independently, retiring versions on their schedule without version pinning control. I should verify the current pricing for the newer models like Opus 5, Sonnet 5, and Fable 5 since those are beyond my training data, and also check whether LiteLLM properly supports prompt caching passthrough for Anthropic's API.İki nokta daha: Anthropic'in güncel liste fiyatları ve LiteLLM'in prompt caching passthrough davranışı.
```
This block is not supported on your current device yet.
```

Token pricing is now at parity across platforms, which neutralizes the cost argument I was considering. What actually matters now is that Copilot Pro and Business tiers include AI credit allowances that make them cheaper up to a point, while self-hosting LiteLLM avoids OpenRouter's markup entirely. I'm starting to evaluate what other factors differentiate these options.
```
This block is not supported on your current device yet.
```

I've identified the key shift in the pricing landscape: as of June 2026, Copilot now matches Anthropic's per-token rates for monthly and usage-based plans, which undermines the traditional argument about Copilot's cost multipliers. This pricing parity only doesn't apply to legacy annual subscribers still on request-based billing with their higher multipliers.

The real distinction isn't in the model weights themselves—both platforms run the same Claude models—but in how they wrap around them. Copilot handles context assembly automatically through repo indexing and file selection, though this convenience comes with constraints: it only offers 1M context windows on newer models within VS Code and the CLI, and it costs more credits. The direct API approach via tools like Cline or Continue puts you in control of what context gets fed in. Copilot also layers GitHub's content filters over both inputs and outputs, which introduces latency and can block or distort results—a real friction point for industrial code and non-English prompts. Finally, GitHub controls model deprecation on its own timeline, so you can't pin versions, whereas using the API directly through LiteLLM lets you lock to specific model strings.

The biggest lever is prompt caching. Anthropic's cache hits cost 10% of input tokens, with writes at 1.25x for 5-minute ephemeral or 2x for 1-hour persistent caches. LiteLLM supports full cache control—you can place breakpoints, set TTL via environment variables, and respect the 4-breakpoint limit. Copilot handles caching behind the scenes and bills it separately, but you have no say in where the breakpoints land. Latency-wise, both add a proxy hop, though LiteLLM's overhead is negligible for single-developer IDE work (single to low-double-digit milliseconds); it only becomes a concern at high request volumes. For observability, pairing LiteLLM with Langfuse gives you granular per-request tracking that Copilot doesn't expose.

Data sovereignty is another differentiator: Copilot routes through GitHub/Microsoft infrastructure under their Anthropic agreements, while direct API access keeps logs in your own gateway. There's also a Fable 5 caveat—when Fable 5 runs in Copilot, Anthropic retains data for safety classifiers, which matters for Maymun's on-premises positioning. One real gotcha I should flag: LiteLLM has a known bug where cached_tokens aren't properly normalized into prompt_tokens_details on /v1/messages passthrough for Vertex and Bedrock, which can cause cost tracking to over-report. Now I'm working through a concrete cost example.

Let me model a typical agentic coding session with Sonnet 5 across 40 turns, each sending roughly 50K tokens of context and generating about 2K output. Without caching, that's 2 million input tokens costing $4 plus 80K output tokens at $0.80, totaling around $4.80. With caching—assuming a 45K cached prefix and 5K fresh input per turn—the math shifts: one cache write of 45K tokens costs $0.11, then 39 cache reads at $0.35 combined, plus the fresh input tokens across all turns.

The total with caching comes to roughly $1.66, which represents about a 65% savings. That's the real lever here, and the math works identically on both sides if Copilot caches equally well. The actual difference between the two platforms comes down to control and visibility rather than the pricing structure itself.

On latency, I need to be careful not to speculate with made-up numbers. What's clear is that Copilot introduces additional hops through GitHub's proxy and content filtering on both input and output, while LiteLLM adds just one gateway hop—typically single-digit milliseconds if self-hosted near your dev machine or in the same region as Anthropic's API. The dominant latency term is always the Anthropic call itself, so I shouldn't invent specific timing figures.

Given his focus on measurement and data sovereignty, I should give him a concrete method to benchmark this himself rather than guessing at numbers. For his situation—the data sovereignty philosophy, existing LiteLLM setup, AntiGravity as his primary IDE, and ARDICTECH's cash constraints—the recommendation is LiteLLM for the actual implementation work, with a Copilot Business seat only for tab completion, since that feature runs unlimited on paid plans without touching AI credits.

For agentic and chat work, LiteLLM wins because he already has the pinning, caching control, per-project virtual keys with budget caps, Langfuse observability, and avoids content filter issues. Tab completion is the one thing the direct API can't match as well as Copilot's VS Code extension does it. It's a hybrid approach with a clear split rule, not a menu of options.

One more thing worth flagging: Copilot does support bringing your own Anthropic key, but that historically limits which features work and you're still going through GitHub's infrastructure, so it's worth mentioning but probably not the move here. Also need to call out the legacy annual plan trap explicitly since that's where people get locked into bad pricing. Structuring the response: a direct diagnosis of the pricing shift, a comparison table showing where they actually differ now, then diving into caching performance—that's the real differentiator. I'll cover latency measurement and give him a concrete split rule for choosing between them, plus flag the LiteLLM cache accounting quirk and the annual plan gotcha he might hit. Keeping it tight in Turkish.## Kısa teşhis

Bu karşılaştırmanın cevabı 1 Haziran 2026'da değişti. GitHub o tarihte usage-based billing'e geçti ve Copilot artık Anthropic modellerini token başına faturalandırıyor: Opus 5 $5/$25, Sonnet 5 $2/$10, cache okuma $0.20, cache yazma $2.50 — 1 AI credit = $0.01. Bunlar Anthropic'in kendi liste fiyatlarıyla birebir aynı.

Yani "Copilot'ta Claude çarpanlar yüzünden pahalı" argümanı öldü. **Fark artık fiyatta değil, harness'ta.** İki tarafta da aynı model ağırlıkları çalışıyor; performansı belirleyen şey modele ne gönderildiği ve arada ne olduğu.

## Gerçek farklar

| | Copilot içinden Claude | LiteLLM → Anthropic API |
|---|---|---|
| Token fiyatı | Anthropic liste fiyatı | Anthropic liste fiyatı (self-hosted'da komisyon yok) |
| Context kontrolü | GitHub'ın repo indexing'i + kendi system prompt'u karar veriyor | Extension/Claude Code + senin kararın |
| 1M context | Var ama sadece VS Code ve Copilot CLI'da, ve daha fazla kredi tüketiyor | Doğrudan, flat rate |
| İçerik filtresi | Girdi prompt'ları ve çıktı tamamlamaları GitHub'ın zararlı/uygunsuz içerik filtrelerinden ve açık kod eşleşme kontrolünden geçiyor | Yok |
| Versiyon pinleme | Yok — GitHub kendi takvimiyle emekliye ayırıyor (Sonnet 4: 1 Mayıs 2026, Opus 4.1: 17 Şubat 2026) | Tam kontrol |
| Prompt cache breakpoint | GitHub yerleştiriyor | Sen yerleştiriyorsun |
| Observability | Toplam kredi tüketimi | Langfuse'da request bazında token/maliyet/latency |
| Veri | GitHub/Microsoft altyapısı üzerinden | Kendi gateway'in |

Bir uyarı: yıllık Pro/Pro+ aboneliğinde request-based billing'de kalanlar için Opus 27x, Sonnet 4.6 9x çarpanla yanıyor. Eğer yıllık plandaysan bu tek başına kararı belirler.

## Asıl performans kaldıracı: cache kontrolü

Cache hit'ler standart input'un %10'una mal oluyor; 5 dakikalık cache yazma 1.25x, 1 saatlik 2x. Somut hesap — Sonnet 5 ile 40 turluk bir agentic oturum, tur başına ~50K context:

- Cache'siz: 2M input ($4.00) + 80K output ($0.80) = **~$4.80**
- 45K'lık sabit prefix cache'lenmiş: yazma $0.11 + 39 okuma $0.35 + taze input $0.40 + output $0.80 = **~$1.66**

%65 fark, ve bu latency'ye de yansıyor. LiteLLM tarafında bu kontrol sende: cache_control passthrough çalışıyor, otomatik checkpoint injection var, 4 blokluk provider limitine uyuyor, ve uzun agentic oturumlar için `LITELLM_ANTHROPIC_PROMPT_CACHING_TTL` ile 1 saatlik cache'e geçebiliyorsun. Copilot'ta breakpoint'leri GitHub yerleştiriyor — cache faturalanıyor ama nereye konduğuna müdahale edemiyorsun.

## Latency

Yapısal olarak Copilot iki ek yük taşıyor: GitHub proxy hop'u ve hem girdi hem çıktı üzerinde içerik filtresi geçişi. LiteLLM tek hop ekliyor; tek geliştirici IDE kullanımında bu tek haneli ms seviyesinde ve baskın terim Anthropic çağrısının kendisi. Yüksek RPS'te LiteLLM'in ölçeklenme sorunları raporlanıyor ama bu senin senaryon değil.

Sana uydurma rakam vermeyeceğim — ölç. Aynı prompt'u aynı repo context'iyle her iki yoldan 20 kez geçir, Langfuse'da TTFT ve toplam süreyi kaydet, Copilot tarafında da IDE loglarından ölç. İki gün sürer, tahminden iyidir.

## Tavsiyem

**Bölünmüş kullan, ve bölme kuralı net olsun:**

Inline tab completion için Copilot seat'ini tut. Kod tamamlamaları ve next edit suggestions AI credit ile faturalanmıyor, ücretli planlarda sınırsız kalmaya devam ediyor. Bu doğrudan API ile replike edemeyeceğin bedava değer.

Agentic ve chat işlerinin tamamı LiteLLM üzerinden gitsin. Gerekçe senin zaten kurulu tercihlerinle örtüşüyor: exact model string pinleme, proje bazında virtual key + bütçe limiti, Langfuse'da maliyet attribution, ve içerik filtresi müdahalesi yok. Claude Code'u `ANTHROPIC_BASE_URL` ile kendi gateway'ine yönlendirmek en temiz yol — AntiGravity kurulumunda zaten yolun yarısındasın.

İki gotcha: Copilot'un BYOK'i seni yine GitHub harness'ından geçirir, sadece faturayı taşır — sovereignty açısından çözüm değil. Ve LiteLLM tarafında /v1/messages passthrough'da `cache_read_input_tokens` alanının `prompt_tokens_details.cached_tokens`'a normalize edilmediği açık bir bug var (issue #27763), bu da cache okumalarının tam fiyatlı input olarak raporlanmasına yol açıyor. Maliyet dashboard'u kuruyorsan bunu doğrula, yoksa rakamlar şişik gelir.

