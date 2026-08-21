# Stack geliştirme için anti-gravity, cursor ve VS Code karşılaştırması

**Sohbet ID (UUID):** `80f6177c-10aa-473c-986a-9f54ea9692e7`

**Oluşturulma Tarihi:** 2026-06-15T14:39:00.068494Z

**Güncellenme Tarihi:** 2026-06-15T14:51:34.792177Z

**Özet:** **Conversation Overview**

The conversation focused on evaluating three agentic development tools — Antigravity, Cursor, and VS Code — for use in developing the team's "Revolutionize architecture." The person asked Claude to compare the three tools in a quick pros/cons format, then followed up requesting a cost-effectiveness comparison based on verified, current pricing models, explicitly warning Claude not to fabricate data and to respect Single Source of Truth (SSoT) principles.

Claude first established a critical framing point before diving into comparisons: all three tools share VS Code as their common base (Antigravity and Cursor are both VS Code forks), so the real comparison is about which agentic layer, vendor-stability profile, and cost model fits the team's existing architecture. The pros/cons breakdown covered Antigravity's agent-first orchestration and multi-model support against its public preview instability and opaque credit system; Cursor's production maturity, Cloud Agents, and transparent pricing against its fork lock-in and team onboarding cost; and VS Code's neutrality and GA stability against its less polished agentic UX. Claude's architectural recommendation was to keep Antigravity as primary for Revolutionize experiments (given the team's existing familiarity and its swappable-adapter role), run a time-boxed Cursor bake-off on a few stages, and anchor any contractual/non-slipping work to a GA surface rather than a preview platform.

For the pricing comparison, Claude ran live web searches to verify June 2026 figures before presenting them, explicitly flagging one data conflict (Antigravity's $249.99 vs. $200 Ultra tier) and resolving it via Google's official blog. Verified pricing: Antigravity AI Pro $20/month, AI Ultra $100 (new tier) and $200 (top); Cursor Pro $20, Pro+ $60, Ultra $200; GitHub Copilot Pro $10, Pro+ $39, Max $100, with VS Code itself free. The core cost-effectiveness insight Claude surfaced was that per-seat subscription costs are largely irrelevant at the team's LLM spend scale — the real differentiator is whether each tool supports bring-your-own-key (BYO-key) routing through the team's existing LiteLLM gateway (referenced as ADR-001). Claude ranked cost-effectiveness as: (1) VS Code with a BYO-key agent layer routed through LiteLLM — zero editor cost, raw API token pricing, full cost-at-emission control; (2) Cursor Pro with OpenAI Base URL override pointing to the LiteLLM proxy — best UX/cost balance with Auto mode consuming no credits for routine work; (3) Antigravity — least cost-effective despite the $20 sticker price because it lacks a documented BYO-key path for its core agent experience, making per-agent budget enforcement and gateway routing (Vault keys, cost-at-emission rules) impossible due to an opaque and undisclosed credit-to-token conversion rate. Claude was explicit that this verdict does not mean abandoning Antigravity, but rather scoping high-volume token-intensive production work to gateway-routable surfaces.

The person communicates tersely and directly, values factual grounding over hedged generalities, and expects Claude to flag uncertainty rather than fill gaps with plausible-sounding data. The explicit instruction "sakın ha yalan söyleme, altı dolu" (do not fabricate, there will be accountability) and the SSoT reminder indicate the person holds Claude to a high evidentiary standard and expects live verification before making architectural or financial claims.

---

## 👤 Kullanıcı (2026-06-15T14:39:01.702079Z)

bu stack'i geliştirmek için, özellikle **revolutionized architecture**'ı ilk geliştirmek için takımın kullanmasını düşündüğümüz fikirler var.
Bu fikirlerden bir tanesi **anti-gravity**, diğeri **cursor**, diğeri de **VS Code**.
Sen bu üçünü hızlı bir şekilde **pros and cons** olarak birbirleriyle kıyaslar mısın?

## 🤖 Claude (2026-06-15T14:42:00.007179Z)

I'm understanding what Maymun is asking for — a comparison of Antigravity, Cursor, and VS Code as development tools for their stack, with a focus on the Revolutionize architecture. I need to review the project context and documentation to provide an informed pros and cons breakdown tailored to their specific needs.

Since these are external tools with rapidly evolving features and pricing, I should gather current facts about each one rather than relying on outdated information. The project context shows they're already using Antigravity as an executor, so I have some baseline understanding of how it fits into their workflow, but I need to evaluate all three objectively against their requirements. I need to search the project knowledge to understand their current setup and constraints, then look up the current capabilities of these three tools to give them an accurate comparison that fits their specific situation with the December 2026 deadline and their existing Antigravity-based workflow.
```
This block is not supported on your current device yet.
```

I'm looking at their project setup—they've already settled on Antigravity as their main execution surface with Claude Code as a backup option, and there's documentation about why they made that choice and what issues they're dealing with in AG 2.0. I should dig into whether they've considered other tools like Cursor or VS Code, and understand what their execution surface policy actually entails.
```
This block is not supported on your current device yet.
```

I'm seeing they've already locked in a clear execution-surface strategy: Antigravity IDE handles the critical work, Antigravity 2.0 is for trials, Claude Code serves as a fallback, and the core system stays tool-agnostic through a Channel Adapter Pattern so the dev tool can be swapped out. The thinking cuts off mid-point while noting something about what's *not* the case.

Cursor isn't part of their existing policy, but now they're asking me to compare it against Antigravity and VS Code—introducing Cursor as a new candidate they haven't formally evaluated yet. The key context is that Antigravity and Cursor are both VS Code forks, while VS Code itself is the base editor that all three tools build on or extend. Their workflow centers on Claude authoring stage prompts that the IDE executes as single-stage PRs for conductor review, so the critical requirements are native git/GitHub/filesystem operations, agentic execution of large bundled prompts, multi-model support (Claude Opus/Sonnet plus Gemini Pro), and the ability to produce verifiable PRs as an execution surface. They're looking for a quick comparison now.

But I need to be careful here—this is genuinely fact-dependent because Antigravity launched recently in late 2025 with known bugs, and both Antigravity's pricing/quotas and Cursor's capabilities are changing rapidly. My training data is from January 2026, but it's now June 2026, so I should search for current information on all three tools before making architectural recommendations.I have the full project context. Before comparing, I need current facts on these three tools since their capabilities and pricing shift fast. Let me verify.
```
This block is not supported on your current device yet.
```

I'm noticing an important discrepancy in my knowledge—the project documentation mentions "Gemini 3.1 Pro" while I had been thinking of it as "Gemini Pro." Looking at the current state as of June 2026, Antigravity 2.0 launched in May at Google I/O with a four-part platform including a VS Code-based IDE, desktop application, a Go-based CLI that replaced the older Gemini CLI, and a Python SDK, all supporting Gemini 3.1 Pro, Gemini 3 Flash, and Claude Sonnet models.

The platform also supports additional models like Claude Opus 4.6 and GPT-OSS 120B, with a tiered pricing structure—free with rate limits, AI Pro at $20/month, and AI Ultra at $249.99/month (though there's conflicting information about a $100 tier). It's still in public preview rather than general availability, which means there are known regressions and API instability. The main pain points users report are aggressive rate limiting, an opaque credit system, and context window performance issues that consume significant RAM. Performance-wise, it's hitting 76.2% on SWE-bench Verified, and the platform was built on technology from Windsurf, which Google acquired for $2.4B.
```
This block is not supported on your current device yet.
```

Now I need to clarify what the user means by VS Code—whether they're asking about it with Copilot's agent capabilities or just the base editor itself. Let me check what VS Code's agent features look like in 2026.
```
This block is not supported on your current device yet.
```

I'm pulling together the comparison they need while keeping their existing setup in mind—they've already committed to Antigravity with Claude Code as backup, and their architecture treats the dev tool as a swappable adapter rather than a core dependency. Now I'm synthesizing the pros and cons of each option specifically for building out the Revolutionize architecture, factoring in their distinctive workflow where Claude generates large bundled stage prompts.

The key insight here is that these three tools aren't really direct competitors—they're all variations on VS Code with different agentic layers bolted on. Antigravity is a VS Code fork with its own agent capabilities, Cursor adds Copilot-style agents on top of VS Code, and plain VS Code becomes agentic through extensions like Claude Code or Cline. Given their sovereignty concerns, self-hosting requirements, and the hard CWF deadline in December 2026, I need to frame this around execution risk and their team's readiness to learn conductor workflows rather than just picking the "best" tool. VS Code with Copilot's agent mode offers the sovereignty they need—it's the neutral substrate everyone else forks from, with GA stability and multi-model support across Anthropic, Google, and OpenAI. The enterprise governance features (MCP policies, sandboxing, Settings Sync) make it the strongest choice for professional teams, and they can even layer the Claude Code extension on top for additional flexibility.

The main trade-offs are that the agentic experience feels more bolted-on than truly agent-first, the premium request model ($39/month for Pro+ with overages) can get expensive for heavy agentic workloads, and there's inherent two-vendor coupling with Microsoft and GitHub. Antigravity, by contrast, is built agent-first from the ground up with a Manager surface that orchestrates parallel agents across the editor, terminal, and browser.

Antigravity's strengths include native support for multiple models (Gemini 3.1 Pro, Claude Sonnet/Opus, and GPT variants) in one environment, which aligns well with their existing multi-model setup, plus artifacts like plans and diffs that serve as useful verification inputs. They've already integrated it into their workflow and governance machinery, and it's proven strong on SWE-bench at 76.2%. The main concern is that it's still in public preview rather than GA, so there's risk of regressions and API changes.

Beyond that, the credit and rate-limit system is opaque and unpredictable—users report wild consumption swings with Gemini 3 Pro, and the March 2026 free-tier cuts sparked complaints about the platform becoming unusable. That makes budgeting difficult when they care about cost discipline per agent. There's also the context-window lag requiring frequent restarts, and the broader vendor coupling risk they flagged when rejecting a build directly on Antigravity's infrastructure.

Cursor, by contrast, is mature and battle-tested across 1M+ developers with 360k paying users—64% of Fortune 500 rely on it. The IDE-first agentic experience is strong, especially with Composer 2.5 handling multi-file refactors at scale and Agent mode running isolated workloads.

It supports Claude, Gemini, and GPT with flexible switching or Auto mode, which aligns with their multi-model strategy. The self-hosted Cloud Agents option addresses sovereignty concerns, and the credit-pool pricing ($20–$200 tiers) is more transparent than Anthropic's opaque system—plus Auto mode doesn't consume credits. Native MCP, skills, and hooks are built in, and the inline-edit UX is the best in class.

The main drawbacks are that it's still a fork with vendor lock-in risk, though less volatile than Anthropic's roadmap. Adopting Cursor introduces another tool the team has to learn alongside Anthropic's offering, which creates context-switching friction during a deadline-critical phase. Credit management on premium models still requires oversight, there's a 40-tool MCP ceiling, and it adds another surface to govern in their verification workflow.

Looking at their established policy, it already provides most of the framework needed for this decision.

The real tension is whether Cursor should replace or supplement Anthropic/Claude Code in their tooling strategy, especially for Revolutionize development. The key distinction I need to make clear: these aren't three equal options—they're all running on VS Code, so the actual choice is about which agentic layer and vendor-stability tradeoff makes sense. For an internal project like Revolutionize, the calculus shifts toward what minimizes friction and maximizes control. For contractual work, I'd lean toward proven production tools like VS Code with Copilot agent mode or Cursor rather than betting on AG's preview status in mid-2026. The real insight though is that their Stage Generator output is surface-agnostic, so they can actually run a bounded comparison across tools without being locked in — keep AG as the primary for Revolutionize where the team's already comfortable, but run a time-boxed Cursor trial on a few stages to measure verification quality and throughput differences.

I'll frame this as a clear pros/cons breakdown since they asked for that, then give a concrete recommendation rooted in their own principles. They're terse and action-oriented, so I should keep it tight but complete. They wrote in Turkish, so I'll respond in Turkish too. is being honest about trade-offs rather than just validating their preference. Cursor has the strongest AI integration and most polished UX for coding tasks, but it's closed-source and pricier. Antigravity is newer and less battle-tested. VS Code with extensions is the most flexible and transparent option, though it requires more setup. I should present these honestly so they can make an informed choice based on their actual priorities. I'll keep the response tight and focused on the architectural judgment they need, delivered in Turkish.Üçünü kıyaslamadan önce kritik bir noktayı netleştireyim, çünkü "pros and cons" listesi bu olmadan yanıltıcı olur: **bu üçü gerçek anlamda eş düzeyde rakip değil.** Üçü de VS Code üzerinde duruyor.

Antigravity bir VS Code fork'u (Windsurf ekibinin Google tarafından 2.4 milyar dolara satın alınmasıyla geldi). Cursor da bir VS Code fork'u. VS Code'un kendisi ise çıplak editör — agentic yetenek için üstüne GitHub Copilot agent mode (ya da Claude Code eklentisi/Cline) takıyorsun. Yani asıl kıyas "üç ayrı IDE" değil; **ortak VS Code tabanı üzerine binen agentic katman + vendor-bağımlılığı/olgunluk/maliyet** üçgeni. Sizin "adopt patterns, not runtime dependencies" ilkeniz açısından bu ayrım kritik.

Güncel durum (Haziran 2026) ile pros/cons:

**Antigravity** (sizin mevcut primary'niz)
- Artılar: Baştan agent-first; Manager yüzeyi editor/terminal/browser'da paralel ajanları orkestre ediyor — sizin "conductor, not typist" modelinize birebir oturuyor. Tek ortamda çoklu model: Gemini 3.1 Pro, Gemini 3 Flash, Claude Sonnet 4.6, Claude Opus 4.6, GPT-OSS 120B. Sizin Claude+Gemini karışımınıza native uyuyor. 76.2% SWE-bench Verified. Ekip zaten öğrenme eğrisini tırmandı, tüm prompt/governance makineniz bunun etrafında kurulu.
- Eksiler: **Hâlâ "public preview", GA değil** — regresyonlar, API değişiklikleri ve beklenmedik davranışlar çıkabiliyor. Bu tam da sizin "asla kontratlı teslimatı yeni/kırık dedikleri platforma bağlama" kuralınızın işaret ettiği risk. **Opak kredi/rate-limit sistemi**: Google kredi-token oranını dokümante etmiyor; kullanıcılar özellikle Gemini 3 Pro'da öngörülemez tüketim bildiriyor, Mart 2026'da free-tier kısıntısı kamuoyu şikâyetlerini tetikledi. **Context window lag/RAM yükü** bilinen bir sorun, sık pencere restart'ı gerekiyor. Ve 2.0 brand-new (19 Mayıs 2026), CLI göçü churn'ü var (Gemini CLI 18 Haziran 2026'da kapanıyor). Google roadmap riski — zaten Revolutionize'ı AG SDK *üzerine* kurmayı reddetmiştiniz, doğru karardı.

**Cursor**
- Artılar: Olgun ve production-kanıtlı — 1M+ geliştirici, ~360.000 ücretli müşteri, Fortune 500'ün %64'ü. Güçlü IDE-first agentic UX: Composer 2.5 ile file-tree ölçeğinde çok-dosyalı refactor, ve Cloud Agents — izole cloud VM'lerde tam terminal/browser erişimiyle çoklu repo'da paralel çalışıp sonucu IDE'ye asenkron raporlayan ajanlar. Cloud Agents self-hosted da çalışabiliyor — bu egemenlik (sovereignty) açısından sizin için önemli. Çoklu model + MCP/skills/hooks. Kredi modeli AG'den daha öngörülebilir: $20 Pro / $60 Pro+ / $200 Ultra, Auto mode kredi yakmadan sınırsız; Pro yaklaşık 225 Claude Sonnet isteği kapsıyor.
- Eksiler: Yine bir fork → AG'deki aynı vendor-lock endişesi (roadmap'i AG'den daha az oynak olsa da). Ama asıl maliyet şu: **ekibin zaten bildiği AG'nin üstüne yeni bir araç öğrenmesi** — deadline-kritik bir programda context-switch yükü ve momentum kaybı. Premium modellerde kredi yönetimi gerekiyor; MCP'de 40-araç tavanı var.

**VS Code** (+ Copilot agent mode veya Claude Code eklentisi)
- Artılar: Nötr taban — diğer ikisi bundan fork'lanıyor, yani fork-vendor roadmap'ine sıfır bağımlılık. "Adopt patterns, not runtime dependencies" ilkenize en saf uyan seçenek. En olgun/GA, preview riski yok. Agent mode Mart 2026 itibarıyla VS Code ve JetBrains'te GA: hangi dosyaların değişeceğini belirliyor, terminal komutları çalıştırıyor, görev bitene dek iterasyon yapıyor. MCP implementasyonu güvenlik ve takım iş akışlarını önceliyor — sandboxing, input variables, Settings Sync ve enterprise policy'lerle profesyonel takımlar için en güçlü seçenek. Çoklu model (Anthropic/Google/OpenAI GA). Üstüne Claude Code eklentisini de koyabilirsin — yani mevcut fallback'inizi de barındırır.
- Eksiler: Agentic deneyim "bolted-on", AG/Cursor kadar agent-first değil. Copilot premium-request modeli (Pro'da 300/ay, Pro+ $39) ağır agentic kullanımda sınırlayıcı olabilir, overage $0.04/istek. Paralel-ajan orkestrasyonu AG 2.0 / Cursor Cloud Agents kadar agresif değil (companion app preview'da yakalıyor). Copilot rotasında çift-vendor (Microsoft editör + GitHub Copilot) kuplajı.

---

Mimari tavsiyem, sizin kendi ilkelerinize dayanarak:

**Tek bir araç seçmek zorunda değilsiniz — mimariniz zaten buna izin veriyor.** Stage Generator çıktınız surface-agnostic; bir stage'i yüzeyler arası taşımak 1 satırlık değişiklik. Bu yüzden doğru hamle "AG mı Cursor mı VS Code mu" diye irreversible bir seçim yapmak değil, **sınırlı bir bake-off** koşmak.

Revolutionize'ı *ilk* geliştirmek için — ki bu fold sizin tanımınızla "can slip if needed / highest learning rate" — bu, hesaplı riski almanın doğru yeri. Önerim:

1. **Revolutionize'da primary olarak AG'yi tutun** (ekip biliyor, agent-first, Claude+Gemini native), ama mevcut charter'ınızdaki gibi "swappable adapter" olarak — foundation değil.
2. **Cursor'ı 2-3 Revolutionize stage'inde time-box'lı dene.** Karşılaştırılacak somut metrikler: verification kalitesi (sizin Verifier'ınız, Artifact değil), stage başına maliyet öngörülebilirliği, throughput, ve self-hosted Cloud Agents'ın egemenlik tarafında ne sunduğu. Revolutionize bu deneyi soğurabilir; CWF soğuramaz.
3. **CWF (kontratlı, kaymaz) için preview'a bel bağlamayın.** Charter'ınız "CWF-kritik iş ~M3'e kadar stable AG IDE'de" diyor — ama AG mid-2026'da hâlâ preview. Kontratlı yolun fallback/birincil adayı olarak **VS Code + Copilot agent mode (GA, enterprise governance)** ya da production-kanıtlı **Cursor** değerlendirmeye değer. Bu, "asla kontratlı teslimatı kırık dedikleri brand-new platforma bağlama" kuralınızla tutarlı.

Tek cümlede: AG'yi Revolutionize'ın deney zemininde primary tutun, Cursor'ı orada dar bir bake-off ile sınayın, CWF'in kritik yolunu ise GA bir yüzeye (VS Code/Copilot veya Cursor) yaslayın — çünkü gerçek mimari kazanım araç değil, sizin zaten sahip olduğunuz tool-agnostic invariant.

---
**Ekli Dosyalar & Ekler:**

- 📄 virtual_software_team_architecture_diagrams.pdf
- 📄 virtual_software_team_architecture_diagrams.pdf
- 📄 virtual_software_team_architecture_diagrams.pdf
- 📄 virtual_software_team_architecture_diagrams.pdf

---

## 👤 Kullanıcı (2026-06-15T14:49:12.142869Z)

Bunların arasında en kost efektivi sence hangisidir?
Sonuç itibariyle, en son pricing modellerine de bir bakar mısın? O pricing modellerinde bir kıyaslama yap. Bir onu görelim.
Burada sakın ha yalan söyleme. Altı dolu.
Single Source of Truth'u unutma.

## 🤖 Claude (2026-06-15T14:51:34.792177Z)

I need to pull together the most current pricing information for these three tools to give an accurate comparison. There's some conflicting data on Antigravity's costs that I should clarify, and I want to make sure I'm working with the latest figures since pricing updates frequently. I need to run fresh searches to pin down the exact current pricing for each tool, since there's conflicting data on Antigravity's tiers. But the bigger picture here is that subscription costs are almost secondary to their actual token consumption — the real lever for cost optimization is whether they can bring their own API keys through these tools or use their LiteLLM gateway to bypass the IDE's pricing markup entirely. Copilot requires a subscription with per-request costs, but VS Code itself is free and open source—the real expense comes from whatever agent extension and model billing you layer on top. The key insight is that if they route through their existing LiteLLM gateway, VS Code plus an MCP or agent extension could be the most cost-effective option since they'd pay raw API costs with no IDE markup and already have budget controls in place. I should search for current pricing and bring-your-own-key capabilities across these tools to confirm which actually supports their setup.Fiyatlandırma hızlı değişiyor ve son aramalarımda Antigravity tarafında çelişki gördüm (bir kaynak $100 AI Ultra, diğeri $249.99 diyor). Yalan riskine girmemek için üçünün de güncel fiyat sayfasını netleştireyim — ve sizin için asıl maliyet kalemini (LiteLLM gateway / BYO-key) doğrulayayım.
```
This block is not supported on your current device yet.
```

I found Google's official pricing breakdown from their I/O 2026 announcement, which clarifies the Antigravity tier structure: they're now offering $20/mo AI Pro, a new $100/mo AI Ultra for standard needs, and a top-tier option at $200/mo (down from the previous $250), with unified rate limits across the tiers.

The critical limitation is that Antigravity isn't available as a standalone product—it's bundled with Google's subscription tiers, and while you can use your own Google AI Studio or Vertex AI keys for some integrations, there's no formal bring-your-own-key option for the core agent experience, leaving you subject to opaque credit systems and potential quota restrictions.

Now I need to verify the current pricing and key policies for Cursor and Copilot to complete the comparison.Google'ın kendi blogu çelişkiyi çözdü — eski $249.99 rakamı artık geçersiz. Şimdi Copilot fiyatını ve sizin için kritik olan "kendi API anahtarını/gateway'ini kullanma" durumunu netleştireyim.
```
This block is not supported on your current device yet.
```

GitHub Copilot switched to usage-based billing in June 2026, with free tier offering 50 agent/chat requests monthly and 2,000 completions, while paid tiers (Pro at $10/mo, Pro+ at $39/mo, and Max at $100/mo) include monthly AI Credits that scale with the subscription level, plus Business pricing at $19 per user monthly.

The critical distinction is that VS Code itself is free—Copilot is just a paid layer on top—which means you can attach alternative agents like Claude Code extension or Cline using your own API keys and pay only raw token costs. I need to verify the bring-your-own-key situation across all three tools: Antigravity has no clean BYO-key option for its core agent and is locked into Google's metered credits, VS Code supports BYO-key through Claude Code and Cline extensions, and I still need to confirm Cursor's current BYO API key support.Cursor'ın kendi anahtarını kullanma (BYO-key) durumu, sizin LiteLLM gateway'iniz açısından belirleyici. Onu doğrulayayım.
```
This block is not supported on your current device yet.
```

LiteLLM has an official Cursor integration where you can override the OpenAI base URL to point at your LiteLLM proxy, set up a virtual key in the dashboard, and route all Cursor requests through the gateway—which aligns perfectly with ADR-001. For VS Code, the editor itself is free and you can attach extensions like Claude Code, Cline, or opencode to handle the integration.

All of these extensions support custom OpenAI-compatible base URLs, so you can point them at LiteLLM and pay only the raw API token cost through your own gateway with full logging, caching, and cost control. Antigravity, by contrast, has no formally documented BYO-key option for the core IDE agent experience—you're locked into Google's metered credits and quota system with an opaque credit-to-token ratio, which is the worst fit for their cost-control architecture with per-agent budgets and Vault keys.

Looking at the latest pricing data, Antigravity is tied to Google AI subscriptions rather than standalone pricing, with no clean way to bring your own keys for the agent layer, whereas the LiteLLM gateway approach gives them the transparency and control they need. The real cost lever for them is token consumption, not subscription fees—their LLM spend runs $5-15K monthly while infrastructure costs another $800-1.5K, making per-seat pricing negligible. Cost-effectiveness means choosing a tool that lets them pay raw API rates through their own LiteLLM gateway with per-agent budgets and escalation rules, not the cheapest sticker price. So the ranking comes down to which tool actually honors their ADR-001 setup and cost-at-emission controls.

VS Code with a self-built agent layer routed through LiteLLM is the cheapest option—zero editor cost plus raw token pricing with full control—but trades off polished agentic orchestration for DIY flexibility. Cursor Pro at $20 offers a better balance: unlimited Auto mode for routine work, the ability to override the base URL and route premium requests through their own gateway, and access to included credits when needed.

Antigravity looks deceptively affordable at $20 Pro, but it's actually the least cost-effective choice because the credit-to-token conversion is opaque (making per-agent budgeting impossible), there's no clean way to bring your own keys or route through a gateway to honor cost controls, and the documented history of lockouts introduces operational risk. Scaling beyond Pro requires jumping to $100 or $200 Ultra tiers with still-unpredictable quotas—the cheap sticker price masks an uncontrollable meter.

That said, the honest comparison on sticker price alone: Antigravity Pro and Cursor Pro are both $20, while Copilot Pro is the cheapest at $10.

But sticker price doesn't reflect effective cost at their scale. I shouldn't overstate that VS Code with Cline is "free"—the token costs are the same regardless; what you actually save is the IDE markup and gain operational control. The real cost lever is whether they can bring their own keys and route through a gateway, and that's where Antigravity falls short. If they're just consuming bundled credits from the IDE without BYO-key capability, then token costs wash out and the comparison becomes about credit transparency and predictability.

Cursor and Copilot both publish clear credit-to-token mappings and subscription structures, making budgeting straightforward. Antigravity's credit system remains opaque—no disclosed conversion rates and lockout mechanics that make it harder to forecast spend. Even their recent change to consolidate rate limits into a single API pricing tier is a minor improvement but doesn't solve the transparency problem.

I should structure this as a pricing table with verified June 2026 rates, then reframe the core insight: token cost dominates the bill, BYO-key access is the real differentiator, and I'll rank them clearly based on cost-effectiveness and budgetability. Given their architecture with LiteLLM gateway and per-agent budgets, VS Code paired with a bring-your-own-key setup routed through their gateway emerges as the most cost-effective option, with Cursor as a strong alternative for better out-of-the-box agentic capabilities, while Antigravity ranks least cost-effective despite its low $20 price tag because its credit model resists their cost-control governance. That said, since they already use Antigravity and treat it as a swappable adapter, the cost verdict doesn't necessarily mean abandoning it—rather, it clarifies the trade-off between cost optimization and their existing workflow.Fiyatları üç kaynaktan (resmi blog dahil) doğruladım. Önce çıplak rakamlar, sonra sizin için asıl önemli olan — çünkü "en ucuz sticker" ile "sizin mimarinizde en kost-efektif" aynı şey değil.

**Doğrulanmış fiyatlar (Haziran 2026):**

| | Editör | Giriş ücretli | Üst kademe | Faturalama modeli | Kendi anahtarın / gateway? |
|---|---|---|---|---|---|
| **Antigravity** | Fork (ücretsiz IDE) | AI Pro **$20**/ay | AI Ultra **$100** (yeni) ve **$200** (eskiden $250) | Opak **kredi** sistemi, $0.01/kredi | **Hayır** — core agent için resmî BYO-key yok |
| **Cursor** | Fork (ücretsiz IDE) | Pro **$20**/ay | Pro+ **$60**, Ultra **$200** | Abonelik kadar **kredi havuzu**, Auto mode kredi yakmaz | **Evet** — Override OpenAI Base URL |
| **VS Code + Copilot** | **VS Code $0** | Copilot Pro **$10**/ay | Pro+ **$39**, Max **$100** | Token-bazlı **AI Credits** (1 Haz 2026'dan beri) | **Evet** — VS Code'a BYO-key katmanı takılır |

Kaynak teyitleri: Google kendi blogunda — $20 AI Pro + yeni $100 AI Ultra + top-tier'ı $250'den $200'e indirdi, ve Flash/Pro rate-limit'lerini "API pricing'e göre düşülen" tek limite birleştirdi. Cursor: Hobby (ücretsiz), Pro $20, Pro+ $60, Ultra $200; her plan abonelik değeri kadar kullanım içerir, tükendiğinde pay-as-you-go. Copilot 1 Haziran 2026'da AI Credits (token-bazlı) faturalamaya geçti: Free $0, Pro $10, Pro+ $39, Max $100; Business $19/kullanıcı, Enterprise $39/kullanıcı. Completion'lar her ücretli planda ücretsiz.

---

**Şimdi yalansız asıl mesele — SSoT'unuz devreye giriyor.**

Bu sticker fiyatlar sizin için neredeyse alakasız. Kendi rakamlarınız: LLM ~$5–15K/ay, self-host altyapı ~$800–1.5K/ay. 6 mühendislik bir agentic-dev operasyonunda **asıl maliyet kalemi token tüketimi**, abonelik değil. $10–200'lık koltuk ücreti, $5–15K'lık token faturasının yanında yuvarlama hatası. Dolayısıyla "en kost-efektif" sorusunun gerçek cevabı şu: **token'ları kendi kontrol ettiğin gateway üzerinden, IDE markup'ı olmadan, ham API fiyatına ödeyebildiğin araç hangisi?**

Ve burada ADR-001 (LiteLLM gateway) belirleyici oluyor:

- **Cursor** → LiteLLM'in resmî entegrasyonu var: "Override OpenAI Base URL"i açıp proxy URL'ini giriyorsun, LiteLLM dashboard'da virtual key oluşturuyorsun, tüm istekler gateway üzerinden geçiyor; MCP sunucuları da LiteLLM proxy üzerinden bağlanabiliyor. Yani Vault'taki anahtarlarınız, per-agent budget'larınız, cost-at-emission disiplininiz aynen geçerli.
- **VS Code** → editör $0; üstüne Claude Code eklentisi / Cline gibi bir BYO-key katmanı takıp aynı LiteLLM proxy'sine yönlendiriyorsun. Bu tür custom-endpoint kurulumları logging, caching ve data-routing üzerinde tam kontrol verir — sadece uptime/scaling sorumluluğu sizde.
- **Antigravity** → core IDE agent deneyimi için resmî olarak dokümante edilmiş bir "bring your own key" özelliği yok; Google AI Studio/Vertex anahtarları yalnızca MCP-tabanlı entegrasyonlarda kullanılabiliyor. Token tüketimi Google'ın **opak kredi sistemine** kilitli: kredi-token dönüşüm oranı Google tarafından açıklanmıyor; Kasım 2025 lansmanından sonra limitler kademeli kısıldı ve kullanıcılar günlerce kilitlendi — "paperweight" lakabı buradan geldi. Bu, sizin per-agent budget + cost-at-emission + Vault mimarinizle **uyumsuz**: bütçeyi enforce edemezsiniz çünkü 1 kredi kaç token bilinmiyor.

---

**Verdict — sizin operasyonunuz için kost-efektiflik sıralaması:**

1. **VS Code (ücretsiz) + BYO-key agent katmanı → LiteLLM gateway.** Mutlak en ucuz: $0 editör + ham API token maliyeti, sıfır markup, tam cost-control, sıfır fork-lock-in. SSoT'unuzla da en hizalı. Bedeli: agentic UX daha DIY, AG/Cursor'ın hazır paralel-agent orkestrasyonu kadar cilalı değil.

2. **Cursor Pro $20 + Override Base URL → LiteLLM.** UX/maliyet dengesinin en iyisi. Rutin işi kredi yakmayan sınırsız Auto mode ile bedavaya yakın çevir, ağır/kritik işi kendi gateway'inden ham fiyatına geçir. $20 koltuk farkı ihmal edilebilir.

3. **Antigravity — $20 sticker'ı ucuz görünse de sizin için en az kost-efektif.** Ucuz etiket, yönetilemeyen bir sayacı gizliyor: opak kredi (bütçelenemez), BYO-key yok (gateway'inizden geçemez → ADR-001/Vault/cost-at-emission devre dışı), ve ölçeklemek için yine öngörülemez kotalı $100/$200 Ultra'ya çıkmak gerekiyor.

Dürüst çekince: bu, "AG'yi söküp atın" demek değil. Charter'ınız AG'yi zaten swappable adapter sayıyor ve agent-first UX'i Revolutionize deneyleri için değerli. Söylediğim şu — **maliyet kontrolünün konuştuğu yüksek-hacimli iş, AG'nin bundled metresinden değil, kendi gateway'inizden geçtiğinde (VS Code veya Cursor) hem daha ucuz hem de tek satırla denetlenebilir.** AG'yi orkestrasyon/öğrenme yüzeyi olarak tutun; token-yoğun production üretimini kendi gateway'inize yaslayın.

