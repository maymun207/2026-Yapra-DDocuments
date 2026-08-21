# Blueprint23 nedir?

**Sohbet ID (UUID):** `70d4a565-66e9-47b3-baf8-ded9ddceec61`

**Oluşturulma Tarihi:** 2026-07-03T14:25:37.174906Z

**Güncellenme Tarihi:** 2026-07-03T14:34:22.580650Z

**Özet:** **Conversation Overview**

This conversation was conducted in Turkish and centered on the ARDICTECH/EAIP platform architecture documented at theblueprint23.dev (also referenced as theblueprint23.com). The person asked Claude to explain what blueprint23 is, then commissioned a thorough SOTA (State of the Art) architectural review of the EAIP platform, framing Claude explicitly as a "top-notch seasoned architect with authority on cutting-edge technology." The person wanted to know whether the architecture qualifies as SOTA by current standards and requested a formal review report.

Claude began by searching project knowledge and reading the full v5.1 SSoT file (ARDICTECH_Platform_v5_1_SSoT.html, ~160KB), PATCH_NOTES_v5_1.md, ARDICTECH_Session_Briefing_May29.md, GU_CWF_Bootstrap_v0_1.md, and insurance-uc_bootstrap_v0_4.md. Using Python scripts, Claude extracted the full component inventory (67 components across layers), 93 connections with their types and protocols, and the overall data architecture. Claude also attempted to fetch the live site but found theblueprint23.com blocked to robots and theblueprint23.dev not indexed; the review is therefore grounded in v5.1 SSoT as the authoritative source. Claude ran targeted web searches on agentic AI architecture best practices, LangGraph production status, LightRAG/GraphRAG status, enterprise semantic layer trends, and vLLM inference serving as of mid-2026 to benchmark the architecture against current standards.

The review concluded that the architecture is in the top tier of modern enterprise agentic platforms for mid-2026 — pattern selection, integration discipline, and sovereignty engineering are SOTA-aligned, and two areas (MCP-first tooling, hybrid deterministic reasoning) are ahead of industry consensus. Three concrete gaps prevent a full SOTA designation: (1) absence of an eval harness for regression testing of LLM-driven steps, estimated at 80–120 hours to close; (2) agent-layer security thin against the 2026 threat model, specifically the ClickHouse MCP NL→SQL path lacking a deterministic query gate and no prompt-injection defense for untrusted inputs like broker emails; (3) the governed-truth domain model is not compiled into a machine-consumable semantic contract, limiting the "portable domain model" moat claim to doctrine rather than demonstrable engineering. Secondary notes flagged single-PostgreSQL as a risk when insurance production precedes CWF v2 HA, static model selection governance, and absent per-tenant token/cost budget enforcement in LiteLLM config. Claude offered to formalize the three gaps as a theblueprint23_changeset_v5_2.json in the D8/G7 task schema (depends_on, gate, acceptance_criteria) to make the review directly dispatchable as backlog.

**Tool Knowledge**

Claude used bash_tool with inline Python scripts to parse the monolithic HTML SSoT file, extracting structured data via regex against known JavaScript const patterns (COMPONENTS, CONNECTIONS). The working extraction pattern for components was `re.findall(r"\{id:'([^']+)',name:'([^']+)',layer:'([^']+)',lname:'([^']+)',phase:'([^']+)',badge:'([^']*)'", html)` and for connections `re.findall(r"\{from:'([^']+)',\s*to:'([^']+)',\s*type:'([^']+)',\s*proto:'([^']*)'", body)` after first isolating the CONNECTIONS array with `re.search(r"const CONNECTIONS\s*=\s*\[(.*?)\];", html, re.S)`. A preliminary scan with `grep -o "const [A-Z_]*"` was used to identify all top-level data structure names before attempting extraction. Web fetch of theblueprint23.com returned no usable content (robots-blocked); theblueprint23.dev returned an unrelated newsletter site. Project knowledge search using queries combining "theblueprint23.dev two-repo Next.js content repo SSoT runtime GitHub API bilingual" successfully retrieved the two-repo architectural intent and v5.1 data structure details from project files.

---

## 👤 Kullanıcı (2026-07-03T14:25:40.253084Z)

blueprint23 nedir?

## 🤖 Claude (2026-07-03T14:26:29.589113Z)

The user is asking what blueprint23 is in Turkish, and they want me to ground my understanding in the project's actual documentation rather than relying on memory. I need to review the bootstrap documents and chat history to understand the scope and context of blueprint23 before making any claims about it.
```
This block is not supported on your current device yet.
```

I need to dig deeper into the two-repo architecture pattern and understand what theblueprint23.dev actually offers as a product.
```
This block is not supported on your current device yet.
```

Alright, I have what I need to answer this. The user is asking what blueprint23 is in Turkish, so I'll respond in Turkish. Based on the project files, theblueprint23.dev is an architectural documentation tool that serves as the single source of truth for the ARDICTECH/EAIP platform's connectivity map and data layer, containing information about phases and components.

The current setup uses a two-repo architecture with a Next.js app and a content repository, where the SSoT is fetched at runtime via GitHub API. It's transitioning from embedding all data as JavaScript constants in a large HTML file to using versioned JSON files, and it also functions as a dispatchable backlog bridging the EAIP-1 and Agentic SW Team projects. The whole thing is built with Antigravity and Claude Opus thinking mode.`theblueprint23.dev` — ARDICTECH/EAIP platformunun **canlı mimari dokümantasyon aracı ve tek doğruluk kaynağı (SSoT)**. Yani platformun beyni değil, haritası: hangi bileşen var, hangi katmanda, neye bağlı, hangi fazda inşa ediliyor ve kaç saat efor gerektiriyor — hepsi tek yerde.

İçinde dört ana veri kümesi var: `PHASES` (inşa fazları), `COMPS` (~70 bileşen), `CONNECTIONS` (92+ bağlantı) ve `PLAN_DATA` (görev kırılımı + efor). v5.1 itibarıyla program toplamı 12.060 saat / 1.508 adam-gün.

İki rolü aynı anda taşıyor:

**1. Mimari harita (bugünkü hali).** İnsan-okunabilir bir bağlantı diyagramı. Şu an tüm veri, ~160KB'lık tek bir HTML dosyasının içine JavaScript `const`'ları olarak gömülü (`ARDICTECH_Platform_v5_1_SSoT.html`).

**2. Dağıtılabilir iş listesi (gitmek istediği yer).** Görev şeması `depends_on`, `gate`, `owner_type` (agent/human) ve `acceptance_criteria` alanlarıyla zenginleştirildiğinde, harita olmaktan çıkıp **agentic yazılım ekibinin iş spesifikasyonuna** dönüşüyor. Bu da EAIP-1 projesi ile Agentic SW Team projesi arasındaki köprü.

**Mimari niyet (iki-repo modeli):** Next.js uygulama repo'su + `revolutionize` içerik repo'su; SSoT çalışma zamanında GitHub API (PAT) üzerinden çekiliyor. Antigravity + Claude Opus thinking mode ile geliştiriliyor.

---

Bir uyarı, dosyalardan çıkan kritik ders: mevcut monolitik HTML substratı **yanlış zemin**. Tüm veri HTML içine gömülü olduğu için elle düzenleme, 11.820 vs 12.060 saat gibi sessiz sapmalara yol açtı. `PATCH_NOTES_v5_1.md`'deki tavsiye net — dört adımlı migrasyon:

1. Veriyi sunumdan ayır → versiyonlanabilir JSON dosyaları (`phases.json`, `components.json`, `connections.json`, `plan.json`), HTML saf renderer'a düşsün.
2. CI'da invariant doğrulama (`validate_blueprint.py`): faz saatleri = görev saatleri toplamı; her `gated` görevin gate koşulu var vb.
3. Schedule ve briefing'i **üretilen artefakt** yap — elle asla düzenlenmez, derlenmiş binary gibi.
4. Görev şemasını agent tüketimi için zenginleştir.

Netleştireyim: v6 SSoT (`ARDICTECH_Platform_v6_SSoT_bilingual.html`, `var EPH`/`EPLAN` değişken adlarıyla) ve iki-repo mimarisi hafızamda var ama bu oturumdaki proje dosyalarında **v5.1'e kadar** doğrulayabildim. v6'nın son durumu ya da site şu an canlı mı — bunları teyit etmek istersen ilgili repo'yu (fresh `git clone --depth=3`) çekip bakabilirim.

Devam etmek istediğin yer neresi — Step 1 JSON extraction mı, yoksa v6 SSoT'nin mevcut durumu mu?

## 👤 Kullanıcı (2026-07-03T14:29:24.005680Z)

Theblueprint23.com daki EAIP mimarisini review etmeni istiyorum, sen top knotch seasoned bir architectsin ve cutting edge technology de soz sahibisin. Bu mimari sence  SOTA olarak kabul edilebilinirmi ? bu gozle incelemeni istiyorum, raporunu benimle paylas

## 🤖 Claude (2026-07-03T14:34:22.580650Z)

I need to start by reviewing the core architecture documents for this EAIP project—specifically the authoritative source of truth document and recent patch notes—before I can properly assess whether the design meets current standards. I'll structure the assessment across those key dimensions—agent stack, data layer, platform infrastructure, observability, and governance—evaluating each against mid-2026 standards. Since my knowledge cuts off in January, a few targeted web searches on recent agentic architecture patterns and LightRAG's current status would sharpen the analysis, but I'll prioritize reading the project docs and checking if the live site shows v6 first.Anlaşıldı. Önce fact-gathering — dosyaları okuyorum, canlı siteyi çekiyorum, sonra raporu yazacağım. Sıfır varsayım kuralıyla ilerliyorum.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

I need to parse through the v5.1 SSoT document and extract its architectural structure—the layers, components, connections, and core design principles—using grep to pull out the relevant information from the 160KB file.
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

I've got the full graph now, so let me check the live site. The user mentioned theblueprint23.com, but I recall seeing .dev in my memory, so I'll try fetching both URLs to see which one is correct.Canlı siteyi kontrol ediyorum v6'nın yayında olup olmadığını görmek için.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

The live site isn't accessible since theblueprint.dev is someone else's newsletter and theblueprint23.com blocks robots, while the user's actual site at theblueprint23.dev appears to be private. I could try cloning the GitHub repo if I knew the org, but that's not worth guessing. The good news is the project files contain the v5.1 source of truth that the site renders from — that's my authoritative reference.

Now I need to assess the state of the art as of mid-2026. Since my knowledge cuts off at January 2026, I should run a few targeted searches on recent developments in agentic orchestration, RAG systems, MCP adoption, inference serving, and guardrails to see if the architecture has fallen behind. Let me do 3-4 focused searches to strengthen the review.Canlı siteden veri çekemediğim için yetkili kaynak dosyalarından v5.1'in 67 bileşen ve 93 bağlantısını çıkardım. Şimdi SOTA kıyaslaması için Temmuz 2026 verilerini doğruluyorum.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

I should run a couple more targeted searches to fill in gaps: one on the vLLM sovereign LLM inference landscape and open-weight models for 2026, and another on NL2SQL and semantic layers for enterprise analytics agents, since I want to benchmark the governed-truth reasoning pattern I'm building against what's emerging in semantic layer standards.
```
This block is not supported on your current device yet.
```

I should search for current vLLM performance and whether it's still the standard for serving open-weight models in 2026, plus investigate what eval frameworks are missing from the EAIP stack—it has orchestration, observability, and MCP tooling, but lacks an explicit evaluation harness like Ragas or promptfoo that seems to be part of the modern reference architecture.
```
This block is not supported on your current device yet.
```

Şimdi raporu yazma zamanı geldi. Kullanıcı Türkçe sordu, bu yüzden Türkçe yanıt vereceğim. Bu bir mimari inceleme raporu olacak — stratejik ve iç mimari açıdan önemli bir belge.

Raporun yapısı: önce genel yargı, sonra boyut-boyut değerlendirmesi, 2026 referans mimarisine kıyasla boşluklar, riskler ve SOTA olması için ne gerektiği. Bulguları yoğun analitik prose ile sunacağım, mermi noktaları değil — kişisel görüş modunda, sert dürüstlük ile.

Temel sonuç: mimari 2026 modern production-grade referans mimarisi — desen seçiminde neredeyse SOTA, disiplin açısından ortalamanın üstü (gating, hibrit akıl yürütme, GitOps, egemenlik). Ama "SOTA" sınır-kenar anlamında? Hayır — kasıtlı olarak doğru yerlerde muhafazakar, bu kısıtlar göz önüne alındığında (10-17 FTE, egemen, sadece OSS) bir erdem. 2026 referans mimarisine kıyasla gerçek boşluklar var.

Güçlü yönler: LangGraph orkestrasyonu 2026'nın konsensüs üretim çerçevesi; MCP-first araç entegrasyonu endüstri genelinde kabul görmüş; hibrit akıl yürütme (LLM sıralar, deterministik karar verir, tam denetim) tam da ortaya çıkan semantik-katman-aracılı desen; dbt Silver/Gold semantik katman olarak ajanları mevcut tanımlarla bağlama — 2026 en iyi uygulaması. Ancak dbt Semantic Layer/MetricFlow metrik derleme API'si daha keskin bir versiyon — EAIP modelleri kullanıyor ama metrik derleme API'sini açığa çıkarıyor mu? Yükseltme yolu olarak işaretlemeye değer.

Gating disiplini (Graph RAG ve diğer bileşenler koşullu kapsama göre) hesaplanmış risk ve GraphRAG-Bench'in sık sık vanilla RAG'den daha düşük performans gösterdiğini göstermesi ile eşleşiyor. Altyapı (ArgoCD GitOps, OpenTofu, Harbor, Cosign, Trivy, Vault, OPA, Keycloak, RLS) modern egemen platform mühendisliği; gözlemlenebilirlik (Langfuse, OTel, Loki, Grafana, MLflow) LLM'ye özgü ve çoğu kuruluşta hala eksik. LightRAG seçimi Microsoft GraphRAG'e karşı maliyet açısından doğru (1/100'ü indeksleme maliyeti, %70-90 kalite) ancak uyarılar var: Neo4j LightRAG kurumsal kazançları hakkında üretim düzeyinde istatistik yok; varsayılan depolamalar yalnızca geliştirme amaçlı — PostgreSQL/Qdrant arka uçları yapılandırılmalı.

Şimdi 2026 SOTA referans mimarisine karşı boşlukları inceliyorum. En büyük eksiklik bir eval harnesinin olmaması — platform belirleyici denetlenebilirlik satıyor ama regresyon değerlendirmeleri çıkarma/sınıflandırma/RAG doğruluğu için hiçbir yerde yok. Langfuse veri setleri barındırabiliyor ama eval'ler birinci sınıf muamele görmüyor. Ayrıca aracı katmanı güvenliği 2026 tehdit modeline göre zayıf — OPA/Kong/Keycloak API erişimini yönetiyor, GuardrailsAI çıktı şemasını zorluyorsa da istem enjeksiyonu savunması, araç çağrısı yetkilendirmesi ve aracı döngüleri için çıkış kontrolü eksik.

MCP sunucuları yeni bir saldırı yüzeyi oluşturuyor, özellikle ClickHouse MCP'si doğal dil-SQL çevirisi için — sorgu izin listesi, salt okunur zorlama ve satır sınırları gerekli ama SSoT'ta belirtilmiş değil. Anlamsal katman formalizasyonu da kritik — hibrit motor + dbt modelleri doğru yaklaşım ama 2026 standartı açık metrik sözleşmelere doğru gidiyor. EAIP'nin yönetilen-gerçek alan modeli bunu yapıyor ama dbt modelleri + KB olarak gösteriliyor, makine tarafından tüketilebilir anlamsal sözleşme olarak değil. Model stratejisi de statik kalmış — Mayıs briefingindeki "vLLM + yerel Llama-3" ortamı değişiyor, LiteLLM yönlendirmesi iyi ama model seçimi tekrarlayan bir kapı olmalı, 70B vs 13B sigorta sorusu hala açık.

A2A/interop atlanabilir ama 2026'de token/sorgu bütçeleri kiracı başına ağ geçidinde gömülü olmalı — LiteLLM bunu destekliyor ama SSoT'ta görünmüyor. Tek PostgreSQL tüm backend'ler için (Keycloak, Langfuse, MLflow, Airflow, Harbor, LangGraph checkpoints, uygulama) — egemenlik için savunulabilir ama CWF v2 HA'ya kadar tüm platform için tek hata noktası. Sigorta üretimi (M7) CWF v2'den önce geliyorsa HA olmayan Postgres'te çalışıyor — düzenlenmiş müşteri için risk, en azından akış kopyası + test edilmiş geri yükleme gerekli. Genel SOTA değerlendirmesi: desen seçimi, yönetim disiplini, egemenlik mühendisliği açısından bu 2026 için en üst düzey kurumsal agentic platform mimarisi, MCP ve hibrit deterministik akıl yürütmede gerçekten eğrinin ilerisinde.Fact-gathering tamamlandı. Okuduklarım: v5.1 SSoT'nin tamamı (67 bileşen, 93 bağlantı, PLAN_DATA), PATCH_NOTES_v5_1, May 29 briefing, GU/CWF bootstrap, insurance bootstrap v0.4, changeset JSON. Canlı site erişilemedi — theblueprint23.com robots'a kapalı, theblueprint23.dev arama sonuçlarında yok (theblueprint.dev başkasının newsletter'ı). **Bu review'un hedefi v5.1 SSoT'dir; v6 bilingual sürüm bundan saptıysa bulgular oraya taşınmadan teyit gerekir.** Güncel SOTA kıyaslaması için Temmuz 2026 itibarıyla agentic framework, GraphRAG, semantic layer ve inference serving literatürünü taradım.

---

# EAIP v5.1 Mimari Review — SOTA Değerlendirmesi

## Hüküm

Kısa cevap: **Bu mimari, Temmuz 2026 itibarıyla "modern production-grade enterprise agentic platform" tanımının üst dilimindedir ve iki noktada endüstri konsensüsünün önündedir; ancak üç somut eksik onu "SOTA" etiketinden ayırıyor.** Üçü de egzotik teknoloji değil, sınırlı efortla kapanabilir boşluklar. Aşağıda önce neyin SOTA-hizasında olduğunu, sonra neyin olmadığını kanıtlarıyla veriyorum — diplomatik yumuşatma yok.

## Neresi SOTA hizasında (hatta önünde)

**1. Orkestrasyon omurgası: LangGraph — 2026 konsensüs birincisi.** Bağımsız 2026 karşılaştırmaları tutarlı: LangGraph, karmaşık stateful workflow'lar için production-readiness sıralamasında birinci; durable execution (agent çöküp kaldığı yerden devam eder), human-in-the-loop ve uzun süreli stateful süreçler tam olarak LangGraph'ın parladığı yer, Klarna, Replit, Elastic gibi şirketler tarafından kullanılıyor. EAIP'in LangGraph + PostgresSaver checkpointing bağlantısı SSoT'de mevcut — 2026 referans deseninin kendisi.

**2. MCP-first entegrasyon: eğrinin önündesiniz.** SSoT'de ARMES, ClickHouse, SAP, SharePoint, Salesforce bağlantılarının tamamı MCP tool call olarak tanımlı. 2026'da bu artık checkbox değil, mimari karar: MCP, Anthropic-orijinli spesifikasyondan Linux Foundation yönetiminde endüstri-geneli adaptasyona geçti; MCP üzerinde standartlaşan bir ekip, entegrasyon katmanını yeniden yazmadan orkestrasyon framework'ünü değiştirebilir. Bu, sizin "adapter ports on every layer" ilkenizin endüstri tarafından doğrulanması. ARMES MCP'nin zaten üretimde olması bu avantajı kağıt üstünden çıkarıyor.

**3. Hybrid reasoning doktrini: endüstri sizin kararınıza yakınsadı.** "LLM ranks, deterministic rules decide; asla ham ARMES tablosu üzerinde reasoning yok" ilkesi, 2026'nın en güçlü NL2SQL sonucunu üreten desenin birebir aynısı. Üç gün önce yayınlanan mimari makale: agent ham şemayı asla görmez; kompakt yapısal bir sorgu (SMQ) semantic layer'a gider, deterministik bir motor bunu dialect-correct SQL'e derler — Spider2-snow benchmark'ında %94.15 execution accuracy, schema-only baseline'ların çok üzerinde. Bağımsız pratisyen konsensüsü de aynı: NL2SQL'de rekabet avantajı model ya da framework değil — moat, metadata'nızdır; yıllarını semantic layer kurmaya harcayan organizasyonlar bu moat'a zaten sahiptir. CWF'in governed-truth domain model tezi, bu literatürün ticari formülasyonu. Bu, review'un en önemli stratejik bulgusu: **CWF'in temel mimari bahsi Temmuz 2026'da dışsal olarak doğrulanmış durumda.**

**4. Gating disiplini: "calculated risk" ilkesinin ders kitabı uygulaması.** Graphiti+FalkorDB'nin yazılı class-6 talebine, Temporal'ın onaylanmış Astra UC'sine, TimescaleDB'nin GU sensör pilotuna kapılanması — 880h koşullu scope'un görünür kılınması — literatürle tam uyumlu: GraphRAG'ın birçok gerçek dünya görevinde vanilla RAG'ın altında performans gösterdiği raporlanıyor; kritik soru graf yapılarının hangi senaryolarda ölçülebilir fayda sağladığı. Graf teknolojisini talep kanıtına kadar bekletmek 2026'da muhafazakârlık değil, olgunluk sinyali.

**5. LightRAG seçimi maliyet-doğru.** Aynı 500 sayfalık korpus GraphRAG'da ~$50-200 ve 45 dakika iken LightRAG'da ~3 dakika ve ~$0.50; kalite benchmark'ları GraphRAG performansının %70-90'ını 1/100 maliyetle gösteriyor; düz graf yapısı incremental update'i kolaylaştırıyor. İki dürüst kayıt: (a) Neo4j'nin uyarısı — LightRAG'ın gerçek enterprise ortamlarında anlamlı iyileşme sağladığına dair production-level istatistik henüz yok; kendi eval'inizi kurmadan bu bahsi doğrulayamazsınız (aşağıdaki 1 no'lu boşlukla birleşiyor). (b) LightRAG'ın default storage backend'leri yalnızca geliştirme içindir; production'da PostgreSQL veya Qdrant/graph store konfigürasyonu gerekir — SSoT'de lightrag→qdrant, lightrag→postgres bağlantıları zaten tanımlı, bu tuzağa düşmemişsiniz.

**6. Sovereign inference: vLLM hâlâ doğru at.** 2025 itibarıyla AI altyapısının kabaca %71'i public cloud dışında çalışıyor ve open-weight ekosistemi self-hosted modellerin çoğu enterprise görevde frontier hosted API'lerle yarışabildiği olgunluğa ulaştı; 2025'te sektör ham token/saniyeye odaklanmıştı; 2026'da öncelik operasyonel verimlilik ve data sovereignty. Sizin dört yıllık sovereignty tezi pazar tarafından yakalandı. vLLM + LiteLLM routing + Ollama dev-tier üçlüsü standart ve doğru.

**7. Platform mühendisliği: eleştirecek şey bulamadım.** ArgoCD GitOps + OpenTofu (BUSL kaçışı bilinçli) + Harbor + Trivy + Cosign imzalı image'lar + Vault + OPA + Keycloak RLS — v5.1'de A4.5 ile kapatılan CI boşluğu ve D8 ile day-one'a çekilen identity federation dahil, 10-FTE'lik bir ekip için sovereign platform mühendisliğinin olması gereken hali. Jenkins'ten kaçınma, Pulumi/Crossplane ret gerekçeleri — hepsi savunulabilir.

## Neresi SOTA değil — üç somut boşluk

**Boşluk 1 (en kritiği): Eval harness yok.** 2026 referans mimarisi net biçimde dört bacaklı: bir orkestrasyon framework'ü + bir observability stack + bir eval harness + MCP-tabanlı tooling, tanınabilir referans mimari haline geliyor; yıl sonuna kadar bu stack'e sahip olmayan ekipler eğrinin gerisinde kalacak. EAIP'te dördün üçü var. 67 bileşenin hiçbiri sistematik LLM değerlendirme katmanı değil — Langfuse trace'tir, MLflow prompt versioning'dir, Evidently (CWF2) drift monitoring'dir; hiçbiri "her release'te extraction accuracy / classification precision / RAG faithfulness regresyon suite'i" değildir. Deterministik auditability satan bir platform için bu tutarsızlık: classification'ı LLM'e vermeyerek kazandığınız güvenceyi, extraction ve enrichment aşamalarında ölçmeden bırakıyorsunuz. Insurance MS#1 kabulünde "extraction doğruluğu kaç?" sorusunun cevabı bugün anekdotal olurdu. **Öneri:** Core fazına ~80-120h'lik bir eval görevi — Langfuse datasets + Ragas/promptfoo türü bir harness, CI'a bağlı, golden-set'ler insurance/CWF/GU başına. Bu, programdaki en ucuz risk azaltımı ve v5.2'nin bir numaralı adayı.

**Boşluk 2: Agent-katmanı güvenliği 2026 tehdit modeline göre ince.** Kong/OPA/Keycloak API erişimini, GuardrailsAI çıktı şemasını yönetiyor — ama 2026'nın agentic güvenlik cephesi farklı bir yerde: zero-trust analytics yolu — authenticate, authorize metrics, compile SQL, log lineage, inspect egress; prompt metninin kendi kapsamını sınırlamasına asla güvenme. Somut endişem ClickHouse MCP (NL→SQL) bağlantısı: SSoT bu MCP'nin read-only zorlaması, satır limiti, sorgu allow-list'i veya kaynak tavanı taşıyıp taşımadığını belirtmiyor. LLM'in ürettiği SQL'in ClickHouse'a giden yolunda deterministik bir kapı görünmüyor — oysa aynı disiplini classification'da kurmuşsunuz. Prompt-injection savunması (özellikle RAG'a giren dokümanlar ve insurance'ta gelen broker e-postaları — untrusted input'un ta kendisi) hiçbir bileşende adreslenmiyor. **Öneri:** MCP tool-call authorization matrisi (hangi agent, hangi tenant, hangi tool, hangi scope) OPA policy'si olarak; ClickHouse MCP'ye deterministik query-gate; insurance extraction'a injection-aware input handling. Bunlar yeni bileşen değil, mevcut bileşenlerin konfigürasyon derinleşmesi.

**Boşluk 3: Domain model bir semantic contract olarak derlenmiş değil.** Bu bir eksiklikten çok en yüksek kaldıraçlı upgrade. Bugün governed-truth domain model = dbt Silver/Gold modelleri + KB + hybrid engine kuralları — yani üç ayrı yerde yaşayan bir doktrin. 2026 yakınsaması bunun makine-tüketilebilir tek artefakt hali: NL arayüzler governed metrics olmadan join halüsinasyonu üretir; modern programlar semantic layer, metric catalog ve agent'ların çağırmak ZORUNDA olduğu compile API'ler içerir, ve 2025'te başlayan Open Semantic Interchange girişimi — dbt Labs, Snowflake, Salesforce — metriği vendor-nötr YAML'da bir kez tanımlayıp her aracın tüketmesini standartlaştırıyor. CWF'in "portable domain model" moat iddiası için bu dönüşüm stratejik: domain model versiyonlanabilir, diff'lenebilir, yeni bir MES'e *derlenebilir* bir contract haline gelirse, "bounded mapping cost" iddiası pazarlama cümlesi olmaktan çıkıp gösterilebilir mühendislik gerçeği olur. Blueprint'in JSON extraction migrasyonuyla (PATCH_NOTES Step 1) aynı felsefe — data'yı sunumdan ayır, invariant'ı CI'da doğrula.

## İkincil notlar

**Postgres tek arıza alanı, insurance production HA'dan önce geliyor.** Variant A sırasında Postgres HA CWF v2'de; insurance V1 production (müşteri MS#3) ondan önce. Insurance instance ayrı bir on-prem deployment olsa da orada da tek Postgres her şeyin (transactional + checkpointing + audit + pgvector) altında. Regüle bir müşteride minimum: streaming replica + test edilmiş restore, MS#3 kabul kriterine yazılmalı. Konsolidasyon kararının kendisi doğru — 10 FTE'yle beş ayrı veritabanı işletmek daha büyük risk — ama tek instance ile tek *engine* farklı şeyler.

**Model seçimi statik kalmış.** May briefing'deki "vLLM (local Llama-3)" ifadesi mid-2026 open-weight temposunda bayat; 70B-vs-13B insurance sorusu hâlâ açık. Mimari bunu LiteLLM routing ile zaten absorbe ediyor — sorun mimaride değil, governance'ta: model seçimi tek seferlik karar değil, eval harness'a (Boşluk 1) bağlı tekrarlayan bir gate olmalı. Boşluk 1 kapanmadan model upgrade'i ölçülemez — iki boşluk birbirine kilitli.

**Token/maliyet bütçeleri görünmüyor.** Agent'lar sorgu iterasyonu yaptıkça warehouse harcaması sıçrar; owner'lar maliyet guardrail'lerini ve sorgu bütçelerini platform scorecard'larına gömer. LiteLLM per-tenant budget destekler; SSoT config'lerinde yok. Ucuz ekleme, multi-tenant GU'da zorunlu hale gelecek.

**Bilinçli atlananlar doğru atlanmış.** A2A cross-framework interop, agent swarm'ları, Kubernetes-üstü ikinci control plane — hiçbiri bu ölçekte ve bu ekip boyutunda yerini hak etmiyor. Bunların yokluğu eksiklik değil, disiplin.

## Sonuç

Skorlarsam: desen seçimi ve entegrasyon mimarisi **SOTA** (MCP-first ve hybrid-deterministic reasoning'de konsensüsün önünde); platform/infra mühendisliği **SOTA-hizasında**; değerlendirme ve agent-güvenlik katmanları **2026 referans mimarisinin gerisinde**. "SOTA olarak kabul edilebilir mi" sorusunun dürüst cevabı: **eval harness + MCP authorization/query-gate + semantic contract derlemesi eklendiğinde evet, tereddütsüz; bugünkü haliyle "SOTA-eksi-bir", ve o bir'in tamamı bounded, düşük-riskli, mevcut bileşenler üzerine iş.** Üç boşluğun toplamı kabaca 300-400h — 12,060h'lik programın %3'ü — ve v5.2 changeset'i olarak formüle edilmeye hazır.

İstersen bir sonraki adımda bu üç boşluğu `theblueprint23_changeset_v5_2.json` formatında, D8/G7 desenindeki task şemasıyla (depends_on, gate, acceptance_criteria) yazayım — böylece review rapor olarak kalmaz, doğrudan dispatchable backlog'a girer.

