# Belgeyi detaylı inceleme

**Sohbet ID (UUID):** `017c0427-ccc0-48f4-8b50-b2273051d50a`

**Oluşturulma Tarihi:** 2026-06-15T11:05:54.440273Z

**Güncellenme Tarihi:** 2026-06-15T19:14:29.066779Z

**Özet:** **Conversation Overview**

The conversation took place in Turkish and involved a technically sophisticated user working on a project called ARDIÇ, which has an associated code repository containing versioned markdown documents including master fact books, bootstrap files, and session prompts. The user was accompanied by a senior software engineering team also following the discussion. The user's communication style is direct and analytical, explicitly requesting responses without filler, in a "cold facts" mode, and specifically asked Claude to respond with an engineering and senior architect perspective when addressing the team.

The first technical question focused on how to manage prompts, skills, workflows, memory, and rules in a centralized, version-controlled code repository accessible to multiple agents and IDEs simultaneously. Claude explained the current state-of-the-art architecture built around three converging open standards: AGENTS.md (cross-tool agent instruction governance, now under Linux Foundation), SKILL.md / Agent Skills (portable, reusable capability packages with progressive disclosure), and MCP (Model Context Protocol for tools, live context, and persistent memory). Claude proposed a concrete repository layout with a canonical AGENTS.md, symlinks for Claude Code compatibility, a committed `.mcp.json` for consistent tool/memory access, a `skills/` directory with domain-specific SKILL.md packages, a versioned `prompts/` library, and a CI lint workflow enforcing length limits, secret scanning, schema validation, and evaluation gates. Claude noted that the user's existing ARDIÇ bootstrap methodology already represents a manual implementation of this exact pattern and recommended formalizing it rather than starting from scratch.

The second technical question addressed a brownfield scenario: adopting agentic workflows on top of an existing complex project with established architecture, database schemas, and integrations. Claude presented a six-phase, gated comprehension-first pipeline: freeze and constrain (read-only agent boundaries), mechanical extraction via Tree-sitter and schema introspection, human-edited understanding synthesis capturing tacit knowledge, ground-truth validation via end-to-end journey tracing, spec-driven change management, and continuous drift control with bidirectional spec sync and a `/learn` loop. Claude evaluated four spec-driven development frameworks—OpenSpec, GitHub Spec Kit, BMAD, and AWS Kiro—with explicit tradeoffs, recommending OpenSpec for change management combined with Spec Kit's reconcile discipline for the user's scenario. The Strangler Fig architectural pattern was recommended for incrementally integrating the agentic layer without disrupting the existing system. Five non-negotiable engineering gates were articulated for the team: no code before comprehension gate, no implementation before spec approval, human editing mandatory on living docs, all changes validated with strict mode, and drift control enforced in CI.

---

## 👤 Kullanıcı (2026-06-15T11:05:55.873091Z)

ekteki dokumani detaylica oku...

---
**Ekli Dosyalar & Ekler:**

- 📎 isimsiz_ek
- 📄 isimsiz_dosya

---

## 🤖 Claude (2026-06-15T11:06:58.549623Z)

I need to start by reading through the session prompt and the canonical reference files in the order specified, beginning with the Master Fact Book and other bootstrap documents that the user has provided.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

I need to review the Master Fact Book as the authoritative reference, then check the latest bootstrap version and the Defter Notu to understand the current state and any open decisions before responding properly.Fact Book okundu. Şimdi devir state'ini ve kesin defter referansını alayım.
```
This block is not supported on your current device yet.
```

I've reviewed the session prompt and the supporting documents—the Fact Book and Bootstrap v11. Now I need to walk through the three main tasks: get approval on the five open decisions outlined in Bootstrap v11 section 4, confirm the open questions, and then move toward production once I have that sign-off. Şimdi yanıt Türkçe olarak, Stil B'de (yansıtıcı-analitik), /godmode (maksimum doğruluk, nezaket yok, soğuk gerçekler) ve prose tercihli olarak hazırlıyorum. Durum yüklü olduğunu doğrulayacak, 5 kararı onay/geçersiz kılma için hazır önerilerle sunacak, açık soru durumlarını belirtecek ve comp band girdilerini isteyeceğim — hiçbir dolgu olmadan, sadece karar yüzeyi ve blokajlar.State yüklendi. Master Fact Book v1 kanonik temel, Bootstrap v11 devir state'i, Defter v5 + 5-mercek v2 + Personel v3 referansları yerinde. Eski-hata log'u içselleştirildi: headcount 30-38→17 (41 ölü), ortak kredisi %99,8 sert para, $889K zaten sermayede, SGK gap ~₺5,2M. Kur çapası EUR/TRY 53,5256 (15.06.2026).

Üç şeyi peşinen sabitliyorum, çünkü bu session'ın bütün üretimi bunlara bağlı:

Strateji ekseni değişmedi — ACT müttefik, herkesin-hizalı **kurtarma alımı**, NewCo-eşitler-JV değil. Distress hijyeni kesin: içsel ~₺95M yükümlülük, ertelenmiş-ücret yastığı ₺10,6M, ACT pazarlık bandı €1,2-2,2M, BATNA=sıfır — hiçbiri Kale/ACT-facing belgeye girmez. Simetri: Gökhan da Claude kullanıyor, sözlü verilen her sayı onun okumasından rahatsız olunmayacak sayı.

Şimdi seni bekleten beş karar. Bootstrap v11'de önerileri hazır; tek geçişte onay veya override almak istiyorum:

| # | Karar | Önerim | Senden |
|---|---|---|---|
| 1 | ACT rakamı belgede | Yazılı = €400K anapara çapası, band YOK. Sahibe sözlü = nakit kılıfı zarfı €1,5-2,5M Kale. İç hedef €1,2-2,2M hiçbir yere yazılmaz. | ONAY / override |
| 2 | Aksayan ₺2,78M | Kurucu-feragat bloğu DIŞI; "dostane ayrı imza". Kontrol-edilen feragat = Tunç altın ₺28.115.428. | ONAY / override |
| 3 | Li/Tan C-grup ₺4,71M | Başa-baş "uzlaşı" değil — **nisap kaldıracı**; ödeme devir+oy şartına bağlı. Li↔Creative Master teyidi öncelik. | ONAY / override |
| 4 | Belge 1 (₺80,5M) dağıtım | Yalnız sahip + CIO. 5-mercek "gerçek resim" kapağı eklenir: faaliyet zararı ₺2,9M, ceza ₺15,4M tek-seferlik, TTK 376 temiz. | ONAY / override |
| 5 | Kurucu comp bantları | Kalem 1 kilitli (İİK 206 ₺4.111.353). Kalem 2/3/4 için **bant lazım** — aşağıda. | GİRDİ |

Karar #5 term sheet'i bloke ediyor. Üç sayı istiyorum: **Kalem 2** ileri maaş bandı (Kale benzer-birim GM referansı — aylık brüt aralık), **Kalem 3** earnout tetikleri (CWF/tesis/Godrej milestone'ları + pay), **Kalem 4** hisse yüzdesi + vesting takvimi. Bunlar gelmeden item 4 kurucu comp term sheet'i üretmem; geçim payroll tarafında yapılanır, alım fiyatından düşülmez — bu çerçeveyi koruyorum.

Açık soruların statüsü, dürüst hâliyle:

**#11 sahip toplantısı tarihi** hâlâ teyitsiz. Öngörü ~20 Haziran'dı, T-5 (15 Haziran) bugün geçti. Bu artık en sert kilit — WS5 sahip e-postası ve bütün zamanlama buna asılı. Tarih yoksa ilerideki her şey havada. **#12 ACT fon bitiş** "1 yıl" deniyordu, son 36 saatte teyit gelmedi. **#15** iki parça: KSL ~2M tahsilatı hâlâ girmedi; İİK 278-280 hijyen yazılı talimatı (içeriye sıfır ödeme) **hâlâ CFO'da değil** — bu iptal-edilebilirlik savunmasının çapası, geciktikçe risk. **#6 431 cephanesi** Defter v5 §7'de hazır, tetiğe basılmayı bekliyor.

İki şeyi netleştir, ona göre üretime geçeyim: beş kararın onayı/override'ı (özellikle #1 simetri açısından kritik), ve hangisini önce istiyorsun — **(a)** sahip toplantısı tarihini zorlama hamlesi (WS5 e-posta taslağı, rakamsız/ACT'siz/NewCo'suz), **(b)** İİK hijyen yazılı talimatını CFO'ya geçirme, yoksa **(c)** karar #5 bantları gelir gelmez kurucu comp term sheet.

## 👤 Kullanıcı (2026-06-15T15:09:06.913070Z)

Bu bir projeye ait. Promptların da kod reposunda tutulmasını.  Otomatik olarak nasıl sağlarız?
Seçtiğimiz idelerde de sonuç itibariyle istediğimiz şey, kullandığımız agentlerin direkt olarak buradaki o ortak noktaya gitmesi ve bu, hem promptları, hem skillleri, hem workflowları, hem memory'i, hem de rule'ları tek bir yerden yönetebilmemizi sağlayacak bir alt yapıyı nasıl kurarız?
Bunun yapılmış örnekleri var mı?
Şu anda state of the art architecture nasıl olmalı?
Bu konuda bana var olanların yapısını ve kendi önerilerini paylaş.

## 🤖 Claude (2026-06-15T15:11:19.559531Z)

The user is asking about managing prompts, skills, workflows, memory, and rules in a centralized code repository that multiple agents and IDEs can reference—essentially treating context as infrastructure with a single source of truth that different tools can pull from.

This is a rapidly evolving area in agent architecture, and I need to search for current standards and tools like AGENTS.md, MCP, .cursor/rules, CLAUDE.md, and Claude Skills to give accurate guidance on what state-of-the-art looks like right now. The project knowledge here contains financial and strategy documents, not agent architecture patterns, so a web search will give better current information than checking the project files. I need to search the web for current standards around agent instructions and prompt management—things like AGENTS.md, Anthropic's Skills format, MCP, and how teams are centralizing prompts as version-controlled code. This is about finding the state-of-the-art architecture for a single source of truth across different IDEs and agents, which requires up-to-date information beyond what I already know about their stack.Bu artık ARDIÇ stratejisi değil, altyapı sorusu — context engineering / "prompt-as-code" tarafı. Bu alan son bir yılda hızla standardize oldu; hafızadan değil, güncel hâlinden konuşmam lazım. Önce mevcut standartları çekiyorum.
```
This block is not supported on your current device yet.
```

I'm looking into how skills and memory get centralized across systems, exploring MCP patterns and Anthropic's Agent Skills format to understand how memory flows between agents and what a single source of truth architecture might look like.İyi temel. Şimdi skills/memory/workflow tarafını ve "tek kaynak" mimarisini netleştireyim.
```
This block is not supported on your current device yet.
```

I need to dig deeper into how teams structure their memory layer and context repositories, plus understand how MCP fits into the memory architecture, so I can pull all these pieces together into a coherent picture.Standartlar net. Son parça: memory katmanı ve "tek-kaynak context repo" mimari deseni.
```
This block is not supported on your current device yet.
```

I'm pulling together a comprehensive answer that covers what they need: version-controlled prompts in their codebase, a unified system for managing prompts and workflows across all their agents and IDEs, concrete examples, and modern architecture patterns tailored to their Next.js 16 stack with React, TypeScript, Tailwind, Vercel, and Supabase.

The key standards I'm recommending are AGENTS.md (the Linux Foundation standard now widely adopted across Codex, Copilot, Cursor, Windsurf, and other tools), SKILL.md for portable agent capabilities, and MCP as the backbone for centralizing tools, memory, and live data. For Claude Code specifically, I'll note the symlink workaround since it still reads CLAUDE.md natively. The architecture pattern centers on a dedicated context directory in their repo—either `.agent/` or `context/`—that serves as the single source of truth, with rules and memory layers managed through MCP servers and tool-specific configuration files that all point back to that central store.

To operationalize this, I'm proposing they version these context files as first-class artifacts with CI/CD validation (schema checks, length limits, secret scanning), treat them like code with PR review workflows, and distribute them via git submodule, npm package, or a skills CLI for reuse across projects. Their existing bootstrap methodology with versioned markdown files is actually a manual implementation of this exact pattern, so I can frame my recommendation as formalizing and automating what they're already doing. Three concrete standards handle the heavy lifting: AGENTS.md for cross-tool instruction governance, SKILL.md for workflow capabilities across clients, and MCP as the de facto standard for tools and live context. The repo itself becomes the single source of truth—agents read directly from the working tree rather than hitting external servers, with symlinks resolving any fragmentation between instruction files. Memory remains the least standardized piece, split between repo-committed markdown files for long-term persistence and MCP memory servers backed by external stores.

For their specific situation, I'd recommend committing the MCP config to the repo pointing at a Supabase-backed memory server, organizing skills as portable folders, and using CI gates to enforce standards. There's a sharp trap worth flagging: AGENTS.md research shows bloated LLM-generated files actually hurt performance—23% cost increase and lower success rates—so keeping these lean under 150 lines matters. Real-world examples of this working well include the Anthropic skills repo and the monorepo CLAUDE.md scoping pattern.

I'm thinking about offering to scaffold the directory structure for them since I have file tools and know their stack—that's a concrete next step beyond just recommendations. The key insight I want to land is that there are three orthogonal layers: instructions and rules, skills and workflows, and tools plus memory, and getting those boundaries right is what makes the system scale.Üç saat önce konuştuğumuz işle alakası yok bu — saf altyapı. Ve iyi haber: bu alan 2025 sonu / 2026 başında dağınık olmaktan çıktı, üç açık standart etrafında oturdu. Önce gerçek manzara, sonra senin stack'ine özel öneri.

## Kritik kavramsal ayrım

Sorduğun "promptlar + skills + workflow + memory + rules tek yerden" cümlesi tek bir şey gibi duruyor ama aslında **üç ayrı katman**, ve her birinin artık kendi olgunlaşmış standardı var. Bunları karıştırmak en yaygın mimari hatası. Katmanlar:

| Katman | Ne | Standart (2026) | Yönetişim |
|---|---|---|---|
| **Talimat / Rules** | "bu repoda nasıl davran" — boundaries, komutlar, konvansiyon | **AGENTS.md** | Linux Foundation / Agentic AI Foundation |
| **Skill / Workflow** | tekrarlanabilir yetenek paketleri (kod+talimat+kaynak) | **SKILL.md (Agent Skills)** | açık standart, agentskills.io |
| **Tool + canlı bağlam + memory** | dış sistemlere erişim, veri çekme, kalıcı hafıza | **MCP** | de-facto endüstri standardı |

İşin püf noktası şu: **statik katmanlar (rules + skills) için "tek nokta" bir sunucu değil, git repo'nun kendisidir.** Agent'ı bir API'ye yönlendirmiyorsun; dosyaları repo'ya koyuyorsun, her IDE/agent çalışma ağacından (working tree) okuyor. Sadece canlı tool + memory MCP üzerinden merkezi bir store'a gidiyor.

## Var olan yapı — neyin oturduğu

**AGENTS.md** OpenAI tarafından başlatıldı, şimdi Linux Foundation'ın Agentic AI Foundation'ı tarafından yönetiliyor ve 60.000+ açık-kaynak repo tarafından benimsendi. 2026 başı itibarıyla Claude Code, OpenAI Codex CLI, Cursor, Aider, Devin, GitHub Copilot, Gemini CLI, Windsurf ve Amazon Q tarafından native okunuyor — yani sektörün evrensel agent-talimat formatına en yakın şey bu.

Tek çatlak: Claude Code CLAUDE.md kullanıyor ve Nisan 2026 itibarıyla hâlâ AGENTS.md'yi native okumuyor; standart çözüm symlink — yani diskte tek dosya, iki isim, sıfır drift. Senin AntiGravity + Claude Code karışık kullanımın tam da bu yüzden symlink ister.

**SKILL.md / Agent Skills** Ekim 2025'te çıktı, Aralık 2025'te açık standart oldu (agentskills.io) ve Claude'un çok ötesinde benimsendi — GitHub Copilot, VS Code, Cursor, OpenAI Codex, Gemini CLI, Goose, OpenCode ve ~40 istemci. Mekanizma kritik: skill'ler SKILL.md içeren klasörler; agent önce sadece isim+açıklamayı okur, ilgiliyse gövdeyi, gerekirse ek dosyaları yükler — progressive disclosure, context penceresini şişirmez. Aynı format her yerde çalışır: bir kere yaz, Claude uygulamaları + Claude Code + API'de kullan.

**MCP** tool, resource ve prompt'ları standartlaştırıyor — M uygulama × N tool entegrasyon kâbusunu çözen katman. Memory'i de buradan merkezîleştiriyorsun.

**Yapılmış örnekler:** `anthropics/skills` repo'su (kanonik, açık kaynak); `skills.sh` (Vercel-destekli, `npx skills add` ile npm-tarzı paket yöneticisi, Claude Code/Codex/Cursor genelinde); Agensi (güvenlik-taranmış skill marketplace). Monorepo deseni de oturdu: root'ta proje-geneli dosya, alt-klasörlerde scope'lu dosyalar (`/api`'de çalışırken sadece o klasörün kuralları yüklenir).

## Bir uyarı — bunu atlama

Araştırma net: dosyayı şişirmek aktif zarar veriyor. LLM-üretimi AGENTS.md dosyaları başarı oranını düşürdü ve maliyeti %23 artırdı — çünkü repo'da zaten olan içeriği tekrarlıyorlar. 150 satırın ötesinde fayda azalıyor, çıkarım maliyeti %20-23 artıyor. Bir AGENTS.md'yi iyileştirmenin en hızlı yolu çoğu zaman içinden silmektir. Kural: agent'ın koddan/manifestten çıkaramayacağı, gerçekten non-obvious bilgi koy. Gerisi zarar.

## Önerdiğim mimari (senin stack'ine: Next.js 16 / Vercel / Supabase / Claude Code + AntiGravity)

Tek bir `context/` (veya `.agent/`) dizini + symlink + commit-edilmiş MCP config. Repo layout:

```
repo-root/
├── AGENTS.md                 ← KANONİK rules/boundaries (≤150 satır)
├── CLAUDE.md                 → symlink → AGENTS.md  (Claude Code drift'siz okur)
├── .cursor/rules/            → tool-spesifik ince ayar (sadece gerçekten farklıysa)
├── .mcp.json                 ← commit'li: her agent aynı tool+memory MCP'ye bağlanır
├── skills/
│   ├── ardic-finansal/SKILL.md   ← openpyxl+recalc workflow'un = skill
│   ├── kvkk-maskeleme/SKILL.md
│   └── docx-litigation-safe/SKILL.md
├── prompts/                  ← versiyonlu prompt kütüphanesi (bootstrap'ların buraya)
│   └── session-bootstrap/v11.md
└── .github/workflows/
    └── context-lint.yml      ← CI kapısı: uzunluk, secret-tarama, şema, eval
```

Mantık katman katman:

**Rules tek noktada.** AGENTS.md kanonik. CLAUDE.md, GEMINI.md, `.cursor/rules` ona symlink — diskte tek gerçek dosya. AntiGravity native AGENTS.md okur (Codex/Cursor ailesinden); Claude Code symlink'ten okur. Sıfır drift, otomatik.

**Skills portatif klasör.** Senin tekrarlanan iş akışların — sıfır-hata openpyxl+recalc, KVKK isim-maskeleme, litigation-safe docx üretimi — birer SKILL.md paketine döner. Bir kere yazarsın, hem Claude Code hem AntiGravity hem API çağrın aynı skill'i kullanır. Repolar arası paylaşım için ya git submodule, ya `npx skills add` ile paket.

**Memory + tool MCP'de.** `.mcp.json` repo'ya commit'li → her agent başladığında aynı sunuculara bağlanır. Kalıcı memory için Supabase-backed bir memory MCP server (zaten Supabase kullanıyorsun, doğal). İki memory tipini ayır: kalıcı/uzun-vadeli memory MCP store'da; oturum-içi/efemera agent'ta kalır.

**"Otomatik" version control = CI kapısı.** Context dosyalarını birinci-sınıf artifact gibi ele al: pre-commit hook + CI'da uzunluk limiti, secret-tarama (KVKK/distress-hijyen açısından senin için kritik — yanlışlıkla iç rakam sızmasın), SKILL.md frontmatter şema doğrulaması, ve mümkünse eval. PR review'dan geçmeden context değişmez. "Prompt-as-code" budur — prompt'u koddan farklı muamele etmemek.

## Sana özel bir gözlem

Senin ARDIÇ bootstrap metodolojin — versiyonlu markdown bootstrap dosyaları (v8→v11), kopya-yapıştır session prompt'ları, kanonik Fact Book — zaten bunun **elle yazılmış hâli.** Sen context-as-code'u sezgisel olarak icat etmişsin: tek kanonik kaynak (Fact Book), devir state (bootstrap), başlatma talimatı (session prompt). Endüstri standardı sadece bunu formalize ediyor ve çok-agent'a taşıyor. Fact Book → AGENTS.md/kanonik prompt; bootstrap → memory katmanı; session prompt → AGENTS.md init bloğu; openpyxl/recalc disiplinin → SKILL.md. Yani sıfırdan öğrenmiyorsun, var olan pratiğini standarda map'liyorsun.

İstersen bu repo iskeletini senin gerçek stack'inle (Next.js 16/Vercel/Supabase, mevcut skill'lerin) somut olarak kurayım — AGENTS.md taslağı + symlink kurulumu + `.mcp.json` + üç SKILL.md şablonu + CI lint workflow'u, çalışır dosyalar olarak. Hangi repo'ya — Netaş hub mu, yoksa ARDIÇ strateji çalışmanın kendi repo'su mu?

## 👤 Kullanıcı (2026-06-15T15:16:59.280355Z)

Burada enteresan başka bir açıdan sana bir sorum daha var. O da şu: Şimdi sıfırdan geliştirilen projeler için iskelet yapısını nasıl kurmamız gerektiğini anlattım.
Bir de şöyle bir senaryomuz var: Elimizde var olan bitmiş kompleks bir proje var. Bu projenin continuation'ında ise artık acentik yapıyı kullanmak isteyeceğiz. Dolayısıyla, bu projenin arhitektürü olsun, yapısı olsun, DB şemaları olsun vesairesi olsun, bunların hepsinin derli toplu bir şekilde üzerine herhangi bir geliştirilme yapılmadan önce iyice anlaşılması lazım.
Ve onun ışığında bu yeni geliştirmelerin yapılması lazım. Dolayısıyla, bu yapıda bir çalışmayı yapmak için yapılması gereken prosedürel, senin gördüğün, önereceğin ve endüstride best practice olarak ya da ne diyeyim, state of the art bir yaklaşım modeli olarak neleri opsiyon olarak paylaşabilirsin?
Bu arada, bütün bu yazdıklarımız ve bu soruları, bu agentic team'i geliştirecek, agentic yapıyı geliştirecek, E-app arkitektürünü geliştirecek olan tüm Senior Software ekibi izlemekte. Dolayısıyla, şimdiden söyleyeyim, gayet net ve gayet engineering şapkanı, sinir arkitek şapkanı takarak cevap ver, oldu mu?

## 🤖 Claude (2026-06-15T15:19:18.582323Z)

The user is asking for a structured, best-practice approach to adopting agentic workflows in existing complex projects—essentially, how to have an AI agent (and the team) thoroughly understand the current architecture, schemas, and codebase before making any new changes. They want multiple options and approaches, and they're emphasizing this is for a senior engineering audience, so I need to be concrete and technical rather than high-level.

I should research the current state-of-the-art on codebase comprehension for agents—things like automated AGENTS.md generation, repo mapping tools, codebase indexing strategies, architecture extraction, spec-driven development patterns, schema introspection, and techniques to ground agents in existing code to prevent hallucination. Then I'll synthesize this into a strong procedural model with concrete steps and tool recommendations.Brownfield agentik adaptasyon — sıfırdan değil, "var olan kompleks sistemi önce sindir, sonra dokun" problemi. Bu, greenfield iskeletten bambaşka bir disiplin ve 2026'da etrafında ciddi pratik oluştu. Mühendislik şapkası takılı; önce güncel state-of-the-art'ı çekiyorum, sonra prosedürel model.
```
This block is not supported on your current device yet.
```

I need to dig into the specific frameworks for spec-driven development like Spec Kit, OpenSpec, BMAD, and Kiro, along with the codebase tooling options such as Tree-sitter and DeepWiki for knowledge graph indexing. Let me search for how spec-driven approaches pair with codebase knowledge systems, then pull it all together into a coherent procedural model.Bir de spec-driven framework'leri ve kod-tabanı haritalama araçlarının somut hâlini netleştireyim.
```
This block is not supported on your current device yet.
```

I'm pulling together a structured, phase-gated adoption model for agentic systems in legacy codebases—something that acknowledges the core risk that agents perform well on greenfield but tend to hallucinate confidently when navigating brownfield complexity. The goal is to give a senior engineering team a defensible, opinionated framework with concrete tooling tradeoffs and clear decision gates, stripped of any conceptual padding.

The methodology itself hasn't fundamentally shifted—you still map the territory before building—but the execution layer has evolved: Tree-sitter parsers and knowledge graphs now replace grep and tribal knowledge. I'm anchoring on a six-phase onboarding loop, Spec-Driven Development as the core discipline (spec as the single source of truth, not the prompt), and a suite of brownfield-specific tools like OpenSpec for change management, BMAD for multi-agent coordination, and Spec Kit for constitution-driven reconciliation. Beyond the standard AGENTS.md, I'm emphasizing architecture overviews, integration maps, and tacit knowledge capture—the "why the auth flow is weird" documentation that compounds institutional memory over time. The migration itself is phased and reversible: tooling first, then structural extraction, then component-by-component framework migration.

The Strangler Fig pattern becomes the integration strategy—a routing layer that gradually shifts new requests to the new service while legacy code passes through unchanged. Spec drift is the real killer here; static specs become stale within hours, so I need bidirectional, living specs with active reconciliation. Multi-repo federation lets you work across codebases without forcing a monorepo conversion. One critical discipline: run one tool per phase, not six in parallel—that's just noise. And there's a gate I'm calling the writing-forces-understanding check: auto-generated documentation is a draft you have to edit heavily; if you can't explain a subsystem without AI assistance, you haven't actually learned it yet.

Now I'm structuring the procedural model for a senior team building an agentic E-app architecture. I'll start with the core principle—why brownfield is fundamentally different from greenfield—to frame the entire approach, then move into the phased pipeline itself, which is designed as a comprehension-first, gated workflow.

The phases are: first, freeze and guardrail the system in read-only mode until comprehension passes; second, mechanically extract the repo structure, dependency graph, database schema, and API surface using automated tools; third, synthesize that into living documentation with human editing to capture the tacit "why is this weird" layer; fourth, validate understanding by tracing a real user journey end-to-end and having the agent reproduce that understanding; and finally, spec-driven change where each new feature flows through spec, plan, tasks, and implementation.

Beyond that comes drift control with bidirectional spec sync and reconciliation in CI, all wrapped in a Strangler Fig pattern for the agentic layer itself. The tooling landscape includes SDD frameworks like Spec Kit, OpenSpec, BMAD, and Kiro; comprehension tools built on Tree-sitter or knowledge graphs in the DeepWiki style; and the discipline of assigning one tool per phase. There are also hard rules and gates that senior teams need to enforce as non-negotiables. This all layers on top of the AGENTS.md, SKILL.md, and MCP foundation from the earlier conversation, adding the brownfield dimension.

I'll structure this in prose for the reasoning and framing, but use tables for the phase pipeline and tool options matrix since the audience is a senior engineering team reviewing multifaceted content. Keeping it tight, decisive, and in the engineering register. Working in Turkish per their style preference, and being careful with attribution and paraphrasing. Now I'll tie this back to the foundation and offer a concrete next step for the team to move forward.Tamam, mühendislik şapkası takılı, ekip izliyor — net konuşacağım. Bu greenfield iskeletin tam tersi bir problem sınıfı, ve onunla aynı araçlarla saldırırsan duvara çarparsın. Önce neden farklı olduğunu çerçeveleyeyim, çünkü prosedürün tamamı o tek gerçeğe asılı.

## Temel gerçek: brownfield'da agent, kendinden emin halüsinasyon yapar

Greenfield'da agent parlak çünkü kısıt yok — istediğini uydurur, tutar. Brownfield'da aynı agent var olan kod tabanlarında kendinden emin bir şekilde halüsinasyon yapar. Sebep tek: bağlam-körlüğü. Yıllarca verilmiş kararların, gizli bağımlılıkların, "auth akışı neden böyle garip" cinsinden örtük bilginin (tacit knowledge) hiçbiri kodda yazılı değil — kafalardaydı, çoğu da gitti.

Bu yüzden 2026 best-practice'i tek bir disipline indirgenmiş durumda: **önce haritala, sonra inşa et.** Metodoloji yeni değil; yeni olan araçlar. 2026'da sabırlı senior developer'ın yerini kısmen Tree-sitter parser + knowledge graph kullanan bir AI aldı; ama metodoloji değişmedi — toprağı inşa etmeden önce haritala. Yani prosedürün omurgası: **kod yazma yetkisi, anlama kapısından (comprehension gate) geçmeden açılmaz.**

İkinci omurga: spec-driven development. Sektör 2025'te "vibe coding"in başarısızlığından sonra şuna yakınsadı — yazılı spec'i projenin birincil, çalıştırılabilir artifact'i olarak ele al; kod ise spec'ten üretilen, yeniden-üretilebilir çıktı. Spec = kontrat, kod = derleme çıktısı. Bunu "niyet için git" gibi düşün: spec'ler ürün düşünceni, commit'lerin kodu versiyonladığı gibi versiyonlar; agent saptığında spec'i gösterip "bu eşleşiyor mu?" diye sorabilirsin. Erken benimseyen raporlarına göre önemsiz olmayan görevlerde ilk-geçiş başarı oranı ~3-10× artıyor.

## Önerdiğim prosedürel model: kapılı anlama→spec→inşa hattı

Altı fazlı, kapılı bir hat. Her faz bir sonraki fazın okuduğu bir markdown artifact üretir; **hiçbir faz, bir öncekinin kapısı geçilmeden başlamaz.** Kritik: ilk üç faz salt-okunur — agent'a yazma izni yok.

| Faz | Ne yapılır | Çıktı (artifact) | Kapı |
|---|---|---|---|
| **0 — Dondur & sınırla** | Repo salt-okunur. Agent boundaries: "Never write" katmanı. CI/test/build komutları sabitlenir. | AGENTS.md boundaries bloğu | Agent yazamaz, sadece okur+çalıştırır |
| **1 — Mekanik çıkarım** | Tree-sitter ile repo map; bağımlılık grafiği; **DB şema introspection** (canlı şema → markdown); API yüzeyi; ölü-kod tespiti | `architecture/repo-map.md`, `db-schema.md`, `dependency-graph` | Otomatik üretilir, ham |
| **2 — Anlama sentezi** | Mimari genel-bakış + entegrasyon haritası + ADR geri-doldurma + **örtük bilgi katmanı** ("neden böyle garip") | `architecture-overview.md`, `integration-map.md`, ADR'ler | **İnsan ağır editler** — yazmak anlamayı zorlar |
| **3 — Ground-truth doğrulama** | Bir gerçek kullanıcı yolculuğunu uçtan-uca izlet; agent anlamayı yeniden üretmeli | Trace dokümanı | Agent açıklayamıyorsa Faz 2'ye dön |
| **4 — Spec-driven değişiklik** | Yeni özellik: Specify→Plan→Tasks→Implement. Her akış `MODIFIED` / `ADDED` olarak işaretli | Feature spec + task listesi | Spec onaylanmadan kod yok |
| **5 — Drift kontrolü** | Bidirectional spec sync; `/learn` döngüsü; CI'da reconcile | Güncellenen living-docs | Drift yakalanır, memory birikir |

Üç kapı kritik, üçünü de açayım:

**Faz 2'nin "insan editi" kapısı pazarlık konusu değil.** Otomatik araçlar (DeepWiki, Understand-Anything tarzı) bir taslak verir ama üretilen genel açıklamaları bulduğun spesifik sebeplerle, diyagramları ekibinin iş akışında gerçekten önemli olan sınırlarla değiştir; bir alt-sistemi AI'ın yardımı olmadan yeni bir meslektaşına açıklayamıyorsan, onu henüz öğrenmemişsindir. AI seni anlamanın kapısına getirir; içinden yürümek senin işin. Bu yüzden Faz 2 çıktısı asla salt-otomatik kabul edilmez.

**Standart AGENTS.md/CLAUDE.md brownfield için yetmez.** Bir önceki konuşmadaki foundation (AGENTS.md + SKILL.md + MCP) gerekli ama yetersiz. Brownfield'da ek olarak kod tabanıyla birlikte agent-odaklı dokümantasyon tutman gerekir — mimari genel-bakışlar, entegrasyon haritaları, yeni bir ekip üyesinin ihtiyaç duyup da nadiren yazılan türden bağlam; auth akışının neden garip olduğu, hangi dış servislerin zamanlamaya duyarlı olduğu, cesetlerin nerede gömülü olduğu. Bu "örtük bilgi katmanı" Faz 2'nin asıl değeri.

**Faz 5 atlanırsa altı ayda spec'ler çöp olur.** En sinsi başarısızlık drift. Statik spec'ler saatler içinde implementasyondan sapar. Çözüm bidirectional/living spec: agent'lar çalışırken değişiklikleri spec'e geri yazar — döngüyü kapatır. Ayrıca compounding institutional memory için agent bir şeyde takıldığında başarısızlığı analiz edip dokümanlara güncelleme öneren bir /learn komutu — sistem ilerledikçe akıllanır. Bunu CI reconcile kapısıyla zorla.

## Araç opsiyonları — fazlara map'li, tradeoff'larıyla

Spec-driven framework katmanı 2026'da üç ciddi seçeneğe oturdu (artı bir IDE):

| Framework | Brownfield duruşu | Tradeoff | Ne zaman seç |
|---|---|---|---|
| **OpenSpec** | Brownfield için en doğal | `MODIFIED` vs `ADDED` akış ayrımı; `openspec validate --strict` eksik GIVEN/WHEN/THEN senaryosunu yakalar; hafif değişiklik-yönetimi | Var olan sisteme aşırı yük bindirmeden yapısal değişiklik yönetimi |
| **GitHub Spec Kit** | Battle-tested, constitution-driven | Feature başına ayrı spec dosyası; `/speckit.reconcile` drift uzantısı; MIT, model-agnostik (`specify` CLI) | Olgun, denenmiş bir akış istiyorsan |
| **BMAD** | Çok-agent orkestrasyonu | 12+ uzman persona (Analyst, PM, Architect, QA...) "Agent-as-Code" markdown dosyaları + brownfield için **codebase flattener** | Tam agile-takım simülasyonu, ağır kurumsal |
| **Kiro (AWS IDE)** | IDE-içi, spec→design→tasks→implement | EARS notasyonu IDE'ye gömülü, hook'lar (commit/dosya tetikli); AWS-native | AWS stack'indeysen, dikişsiz entegrasyon |

Senin AntiGravity tarafın için bir not: Google Antigravity da kendi SDD lezzetini gönderdi (2026'da her büyük araç — Spec Kit, Kiro, Claude Code, Cursor, OpenSpec, BMAD, Tessl, Antigravity — kendi SDD varyantını çıkardı), yani framework seçimi IDE'ne kilitlenmek zorunda değil — spec'ler markdown, taşınabilir.

Benim opsiyon-mantığım, kompleks-bitmiş-proje senaryon için: **OpenSpec'i değişiklik motoru, Spec Kit'in reconcile disiplinini drift kontrolü için, comprehension katmanını Tree-sitter/knowledge-graph tabanlı bir araçla** kur. BMAD'ın 12-agent ağırlığına çoğu ekibin ihtiyacı yok; başla hafif.

Ve disiplin kuralı — ekip bunu duysun: faz başına tek araç seç; altı AI asistanını paralel çalıştırma — o gürültüdür, içgörü değil.

## Agentik katmanı var olan app'e nasıl bağlarsın: Strangler Fig

Mimari soruna gelince — agentik yapıyı monolit'in içine gömme. Strangler Fig deseni brownfield AI entegrasyonuna temiz oturur: legacy sistemin önüne bir yönlendirme katmanı (facade/proxy) koy; AI'dan faydalanabilecek yeni istekler yeni servise gider, geri kalanı legacy'den değişmeden geçer; zamanla daha çok işlev AI-zenginleştirilmiş servislerin arkasına taşınır ve legacy küçülür. Bu sana iki şey verir: yeni agentik geliştirmeleri var olan mimariyi kırmadan ekleme, ve geri-alınabilirlik. Çünkü kompleks sistemler toptan değişime direnir — etkili yaklaşımlar göçü ayrık, geri-alınabilir fazlara böler: önce tooling (build/lint/test), sonra yapısal çıkarım, sonra bileşen-bileşen migrasyon.

## Ekibe net non-negotiable'lar

Beş kapı, taviz yok: (1) Anlama kapısı geçilmeden tek satır kod yazılmaz — Faz 0-3 salt-okunur. (2) Spec onaylanmadan implementasyon yok; spec kontrat, kod çıktı. (3) Faz 2 living-docs insan tarafından editlenir, salt-AI çıktısı kabul edilmez. (4) Her değişiklik `MODIFIED`/`ADDED` olarak işaretli ve `--strict` validate'ten geçer. (5) Drift kontrolü CI kapısı — reconcile + `/learn` döngüsü, yoksa altı ayda spec çürür.

Bu, bir önceki konuşmadaki foundation'ın üstüne oturuyor: AGENTS.md + SKILL.md + MCP statik temel; bu fazlı hat onun brownfield'a uygulanışı. Greenfield'da iskeleti kurarsın; brownfield'da önce mevcudu sindiren bu comprehension+spec katmanını eklersin.

İstersen somutlaştıralım: ya bahsettiğin o kompleks proje için Faz 1-2 artifact iskeletini (architecture-overview / integration-map / db-schema / ADR şablonları + OpenSpec change-proposal template'i) çıkarayım, ya da ekibe sunmak üzere bu altı-fazlı hattı tek sayfalık bir karar diyagramı + kapı-kriterleri dokümanına dönüştüreyim. Hangisi ekibin önünde daha çok iş görür?

