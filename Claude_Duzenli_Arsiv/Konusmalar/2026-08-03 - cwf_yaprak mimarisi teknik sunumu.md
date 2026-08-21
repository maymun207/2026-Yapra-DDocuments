# cwf_yaprak mimarisi teknik sunumu

**Sohbet ID (UUID):** `ef718c1f-187d-4598-965d-2d5943542004`

**Oluşturulma Tarihi:** 2026-08-03T07:18:24.893784Z

**Güncellenme Tarihi:** 2026-08-03T07:29:18.647793Z

**Özet:** **Conversation Overview**

The person requested that Claude create a comprehensive architecture chart deck for the `cwf_yaprak` project, at a level of technical detail suitable for presenting to an engineer. The request was made in Turkish, though the deliverable itself was produced in English following the project's established convention for technical artifacts.

Claude executed this task by first reading project instructions, then performing a fresh clone of the live `cwf_yaprak` GitHub repository at commit `ce9c96de` to derive all structural claims directly from source code rather than documentation or summaries. Claude ran a systematic census of the codebase across all major subsystems: the turn pipeline in `api/cwf/_lib/turn/`, the eval gate, routing system, prompt composition, knowledge provider, LLM gateway, observability layer, data layer, memory system, measure layer, admin control plane, and CI configuration. All counts (48 admin endpoints, 39 repositories, 65 migrations, 48 tables created with 47 live, 427 test files, 22 replay modules, 9 prompt core modules, docVersion rev 183) were computed via shell commands against the live clone rather than asserted from memory.

The output was a self-contained 21-slide interactive HTML presentation (`cwf-engineer-architecture-deck-v1.html`) using keyboard navigation, dot-rail slide indicators, and a "show all" mode for printing. The deck covers system context and five edge security classes, runtime topology across Vercel/Supabase/MCP/Langfuse, the 10-stage turn pipeline with TurnContext contracts, the warm→read two-phase pattern, intent resolution and clarification logic, two-layer tool routing, the single LLM gateway site, prompt composition with byte-pinned core plus domain packs, tool information sources and the gateway mirror distinction, the three-stage eval gate, trust resolution and grounding, the empty≠zero law with its three concrete failure modes, three-system observability with one turn ID, the 47-table data layer, episodic memory without vectors, the measure layer and its known structural faults, the admin control plane and CI gates, the EAIP reuse contract split, and a day-one reading map. Each slide preserves exact file paths and explains the architectural reasoning behind design decisions, not just the structure. Claude also noted two forward-looking considerations: the deck is in English for term alignment with code comments, and slide 18 covering the active measurement work will need a revision when that work phase closes.

---

## 👤 Kullanıcı (2026-08-03T07:18:26.411502Z)

Senden sunu istiyorum, bana cwf_yaprak mimarisini muhendise anlatacak seviyede detaylica anlatacak bir chart deck olusturabilirmisin?

## 🤖 Claude (2026-08-03T07:29:18.647793Z)

I need to start by reading the project instructions file, then search for the cwf_yaprak architecture details to build an engineer-level chart deck. Based on the project's existing HTML architecture diagrams, I should create an HTML deliverable that visualizes the architecture.

But I should follow the doctrine of reading live code rather than relying on documentation alone — since the cwf_yaprak repo is public on GitHub, I can clone it directly and examine the actual source structure to ensure accuracy. My plan is to read the instructions and knowledge base first, then pull the live code, and finally build the HTML chart deck with both Turkish strategy notes and English technical content.
```
This block is not supported on your current device yet.
```

I need to get the current state by examining the actual repository rather than relying on documentation. I'll clone the repo fresh to see the live structure, and also check the latest versions of the knowledge base, register, and bootstrap files to understand the session details.
```
This block is not supported on your current device yet.
```

The clone is working correctly with the right HEAD commit verified. Now I'm mapping out the full architecture from the live codebase—I need to identify the turn pipeline stages, IR layer, prompt composition system, knowledge provider, governance and evaluation gates, backends and MCP integration, observability setup, persistence and repository patterns, frontend structure, and database migrations. Let me do a structural inventory of the codebase.
```
This block is not supported on your current device yet.
```

I need to check the pipeline.ts file to understand the 14-stage tree structure, and then look at what's in the _lib subdirectory.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

I'm examining the turn flow in chat.ts to understand how the pre-stream stages work alongside the main streaming handler.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

Now I'm getting a clear picture of the turn shape, so let me quickly map out the other major subsystems—backends, knowledge, llm, mcp, routing, grounding, observability, persistence, prompt, replay, quota, synthTraffic, and memory—by doing a file census with line counts to understand their relative weight and identify the key exported functions.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

I'm examining the frontend structure, database schema from migrations, and getting a count of the tests and migration files.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

I need to pull some key files to understand the architecture better—checking test counts, the docs directory, and specifically that turn-pipeline doc. I'm also looking for details on eval gate stages, IR frame priority, memory handling with episodes, the trust registry, grounding mechanisms, the gateway setup with Superset, quota management, synthetic traffic, and the measurement phase. Let me grab the headers from several important files to get oriented quickly.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

I'm diving into the critical subsystems that give this architecture its depth—starting with the eval gate to understand stage ordering, then the IR frame and semantic router that handle the priority chain for clarification, followed by the trust registry for grounding, the gateway layer with its preflight checks and capability indexing, the memory system managing episodes and retrieval, and finally the measurement layer tracking feedback.
```
This block is not supported on your current device yet.
```

Now I'm moving into the gateway layer with Superset, considering how memory flows through the system, and thinking through the measurement layer that captures feedback, synthetic data, and read honesty metrics.
```
This block is not supported on your current device yet.
```

I'm reviewing the key architectural components: the prompt assembly logic, the two-phase DbKnowledgeProvider, the LLM gateway setup, the shared constants, the M1 measurement layer with its feedback endpoint and useful-turn metrics, and the synthetic traffic injector. Now I'll organize these into batches.
```
This block is not supported on your current device yet.
```

I need to pull together the control plane inventory from the API and admin endpoints, review the M1 measurement surface in the feedback system, and check the CI pipeline gates. Then I'll do a quick alignment pass on the latest KB and register versions to make sure the session-state framing is consistent, even though the deck itself focuses on architecture rather than session state.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

I'm checking the build job configuration and verifying some key details from the current codebase — the register v82 and KB v78 headers to make sure the deck's positioning slide is accurate, along with confirming the test file count and revision information against what's actually in the live clone.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

I'm verifying the documentation version against my memory and confirming it matches. For the test count, I have 427 test files from a live count, and I'll reference the ~4740 tests as the last known CI-verified number rather than trying to approximate by counting test declarations.

Now I'm looking at the architecture documentation tabs — there are 7 sealed narrative sections that form the in-app documentation surface, which will be useful to list out for the presentation.
```
This block is not supported on your current device yet.
```

I want to verify the M1 measure layer with the turn feedback and useful-turn ratio since that's the active work, and see where the current implementation stands in the deck. Let me check the feedback API and the token spending tracking to get a complete picture.
```
This block is not supported on your current device yet.
```

I'm ready to build this out as a self-contained HTML file following the project's established pattern for architecture visuals. The deck will be named `cwf-engineer-architecture-deck-v1.html` with versioning both in the filename and embedded in the document, designed for a technical audience with detailed architectural information.

Before I proceed, I should verify the language convention by checking whether the existing HTML architecture artifacts like cwf-architecture-map-v6.html are in English, since that will determine whether this deck should follow suit.
```
This block is not supported on your current device yet.
```

I'm settling on the dark cyan aesthetic for a self-contained HTML slide deck aimed at engineers, structured as an interactive presentation with keyboard navigation. The deck will span roughly 16-18 slides, each combining real diagrams and technical annotations, starting with a cover slide that transitions from CWF to EAIP.

Now I'm mapping out the core content: system architecture at the C4 level showing the SPA-to-serverless-to-backend flow, deployment topology with Vercel functions and Supabase, the ten-stage turn pipeline as the centerpiece, TurnContext as the mutable state carrier, the warm-then-read pattern for async initialization and sync composition, and intent resolution with semantic and keyword prioritization.

Continuing with tool routing across two layers (categories and learned maps), the single LLM gateway site in gateway.ts with step counting and provider registry, prompt composition built from core modules with domain packs, and the four sources of tool information feeding into knowledge.

The governance evaluation gate uses rule kinds, domain rules, and rule versions across three schema stages with candidate-set semantics and role-based access control, while trust resolution follows an outage-to-code-floor-to-database hierarchy for determining what's verified versus unverified.

Grounding happens post-stream in advisory mode without LLM judgment, and I'm tracking read honesty through three contract types (throw, null, or numberOrNull) with a 1000-row cap, while observability separates telemetry events, Langfuse traces, and turn digest displays into distinct systems that never conflate, using a single turn ID to connect the span tree from core workflow through stages to MCP and warm paths.

The data layer spans 47 tables organized by concern with migrations pushed through Supabase only and RLS enforced, memory uses deterministic distillation with multi-signal retrieval combining keyword folding, entity matching, recency decay, and importance scoring alongside honesty bits and audit trails, the measure layer tracks turn feedback and synthetic traffic to compute useful-turn ratios, the admin control plane exposes 47 endpoints across tabs following the governed-data-through-UI principle, and CI gates enforce verification discipline through build and test stages.

I'm settling on a three-lane operating model (Architect/Author/Operator) with the reuse contract mapping tenant-specific versus generic concerns, where adding a backend amounts to one data row plus one package plus one registration. Aiming to consolidate this down to around 20 slides and build it as an interactive HTML file with slide navigation, keyboard controls, and SVG diagrams where they help clarify the architecture.

Building the presentation file... Counting through the full list of governed tables in the system. 17 llm_provider_secrets
18 llm_providers
19 llm_providers_personal
20 mcp_global_settings
21 mcp_secret_audit
22 mcp_secrets
23 mcp_settings
24 memory_audit
25 messages
26 provider_audit
27 publish_rollouts
28 replay_audit
29 rollout_audit
30 router_proposals
31 routing_audit
32 routing_cache_meta
33 routing_drafts
34 rule_audit
35 rule_kinds
36 rule_versions
37 seed_state
38 synthetic_question_sets
39 synthetic_runs
40 telemetry_events
41 tool_category_cache
42 turn_feedback
43 turn_trace_digest
44 user_audit
45 user_backend_scopes
46 user_chat_quotas
47 user_quotas
48 user_roles

So that's 48 tables created across 65 migrations, with factory_registry retired on 2026-08-02, leaving 47 live tables. I notice routing_curation has a repository but no create table statement—it's probably a view or stored elsewhere, so I won't count it. Now I'm moving on to count the admin endpoints. Let me count the repository entities to verify the total—looks like there are around 38 files plus test directories, with entities like BackendEntityLayers, Conversation, Episodes, and various audit and settings repositories.
```
This block is not supported on your current device yet.
```

Now I'm building out the HTML slide deck with keyboard navigation, using the house palette. I'll create about twenty slides in a manageable file size, with a fixed canvas that scales responsively, and save it to the outputs folder.

For the interaction model, I'm going with full-viewport slides where only the active one shows, navigable via arrow keys, click buttons, and a dot rail. I'll add a toggle to display all slides stacked for printing. The design will safely handle 1024px width minimum with a max-width content column and internal scrolling if needed.

Each slide will include a title, kicker, diagram, and engineer notes with file paths to give it that technical depth.

Writing the HTML now...Live floor doğrulandı (fresh clone, `ce9c96de`, docVersion rev 183, 427 test dosyası, 65 migration). Deck'i dokümanlardan değil, canlı koddan çıkardım. Şimdi yazıyorum.
```
This block is not supported on your current device yet.
```

I need to clean up that stray Chinese character in the "Reading" map label and then verify the file loads correctly by checking that all 21 slides are present.
```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```


```
This block is not supported on your current device yet.
```

**`cwf-engineer-architecture-deck-v1.html`** — 21 slayt, ok tuşlarıyla gezinme, "show all" ile tek sayfa/print modu.

**Deck'i dokümanlardan değil, canlı klondan çıkardım.** `ce9c96de` fresh clone; stage sırası `turn/pipeline.ts`'den, kontratlar modül header'larından, sayılar shell ile hesaplandı (48 admin endpoint, 39 repository, 65 migration / 48 tablo, 427 test dosyası, 22 replay modülü, 9 prompt core modülü), docVersion rev 183 `public/architecture/manifest.json`'dan. Hiçbir sayı elle taşınmadı.

**Yapı:** 02–03 bağlam ve topoloji (beş edge sınıfı ayrı ayrı) → 04–06 turn'ün kendisi (10 stage, TurnContext, warm→read) → 07–11 zeka katmanı (IR, routing, tek LLM sitesi, prompt, tool bilgisi) → 12–15 güven katmanı (eval gate, trust/grounding, empty≠zero, observability) → 16–18 veri/hafıza/ölçüm → 19–21 kontrol düzlemi, reuse contract, okuma haritası.

Mühendis seviyesini üç şeyle taşıdım: her slaytta gerçek dosya yolu, her mekanizmanın **neden** öyle olduğu (örneğin stream stage'in `TURN_STAGES` dışında olması, `config_fingerprint`'in stage 7'de var olmaması), ve tuzaklar ayrı kutuda — cache-lies penceresi, mirror'ı authoritative sanma, bodiless HEAD count, browser→Supabase okumalarının Vercel log'unda görünmemesi.

İki not, karar senin:

**1.** Deck İngilizce yazıldı (teknik artifact kuralı). Anlatım Türkçe yapılacaksa slayt gövdeleri de Türkçeye çevrilebilir — ama o zaman kod yorumlarıyla terim eşleşmesi zayıflar; benim tavsiyem İngilizce kalması.

**2.** Slayt 18'deki M1 bulguları 1.3b'nin canlı kapsamı — yani deck bu haliyle bugünün fotoğrafı. 1.3b kapandığında o slayt bayatlar; kapanışta `v1_1` olarak revize etmek gerekecek.

**YOUR ACTION ITEMS:** yok.

