# Revolutionize v1 — Adım Adım Uygulama Listesi

| Alan | Değer |
|---|---|
| Tarih | 2026-06-16 |
| Yazar | Claude (single-author kuralı) |
| Kapsam | Revolutionize **v1**'in sıfırdan çalışır hâle getirilmesi — Faz 0 zemin → Faz 1 inşa → çalışan v1 |
| Kaynak belgeler | `program_plan_phase0_phase1_v1_1.md` · `phase_0_runbook.md` · `dev_schedule_patch_v1.md` · `R1-version-model.md` · ADR-001 · ADR-002 |
| Niteliği | Bağımlılık-sıralı **inşa dizisi** (ordered backlog). Haftalık/kişi-bazlı takvim için `program_plan_v1.1` ayrı belgedir — bu onu tekrar etmez, tamamlar. |

---

## v1 nedir, ne değildir (kapsam sınırı — peşinen sabitliyorum)

Version modeli (`R1-version-model.md` §2) kanonik: **v1 → v1.5 → v2.**

- **v1** = ajanik organizasyon / tam insan-ekip simülasyonu — *inşa edilen ve kullanılan* artefakt.
- Haziran–Aralık 2026 programı **çalışan bir v1** ayağa kaldırır ve onu EAIP ürünlerini (CWF1, EAIP v1) geliştirmek için *kullanır*.
- Gerçek kullanımla v1, **7. Ay'a (Aralık 2026) kadar v1.5'e** olgunlaşır — programın bitiş durumu.
- v1.5 → v2 (hücresel mimari) program-sonrası ufuktur; bu listede yoktur.

**Dürüst kapsam notu:** Faz 1 çıkışı = *çalışan v1 temeli*. Beş sistemden (Vision Engine, Execution Swarm, Verification Mesh, Reality Loop, Meta-cognition) Faz 1 şunları üretir: Measurement Foundation (SG 1.1–1.3), Tool Integration (SG 1.7), LLM gateway (SG 1.4), Execution Swarm tohumu (SG 1.5), insan-kapılı ince bir Verification Mesh, ve telemetri-beslemeli ince bir Reality Loop. **Vision Engine ve Meta-cognition Faz 1'de incedir/ertelenir** — bunların olgunlaşması v1.5 → v2 yoludur. Bu liste fazla iddiada bulunmaz: Faz 1, "tek gerçek ürünü uçtan uca döngüden geçirip canlıya alabilen, tam ölçümlü çalışan bir ajan seti" demektir.

---

## ADIM 0 — Uygulama öncesi kararlar (bunlar kapanmadan tek satır v1 kodu yazılmaz)

Bunlar iş değil, **karardır** — ve en çok kayan kalemlerdir. Faz 1 girişi (G1–G8) bunları kapı yapar.

| # | Karar | Durum | Varsayılan / öneri | Bloke ettiği |
|---|---|---|---|---|
| 0.1 | **Yürütme yüzeyi / IDE** (15.06 analizi) | AÇIK | AG'yi orkestrasyon + öğrenme yüzeyi tut; **token-yoğun production üretimini VS Code (veya Cursor) + BYO-key → LiteLLM gateway**'inden geçir. Gerekçe: AG'nin opak kredi sayacı per-agent budget + cost-at-emission + Vault mimarinizle uyumsuz; gateway'iniz tek satırla denetlenebilir. | SG 1.4 sonrası tüm ajan üretimi |
| 0.2 | **G3 — Çeyreklik LLM bütçesi** (rakam, niyet değil) + `caps.yaml` taslağı | AÇIK | $15–25K/çeyrek aralığı önerildi (runbook §7) | Stage 1.4.2 (per-agent cap enforcement) |
| 0.3 | **G4 — İlk ürün** (SG 1.6 kapsamı) | AÇIK | **Web Asistan embed widget** (düşük risk, ölçülebilir CTR/conversion telemetrisi) — Cuma Hafta 0 sonuna kadar karar yoksa default budur | SG 1.6 + walking skeleton |
| 0.4 | **G5 — SOUL.md** founder onayı | AÇIK | Maymun (varsayılan), onay bekliyor | Vision Engine girdisi (Faz 2+), G5 kapısı |
| 0.5 | **G2 — GitHub Team tier** + her iki repoda branch protection | AÇIK | CA-7 gereği teknik zorunluluk — sosyal değil | Tüm Faz 1 (ajan PR'ları korumasız repoya yazamaz) |
| 0.6 | **G7 — Uzmanlık-boşluğu** değerlendirmesi (dış danışman) | AÇIK | "Faz 1 için danışman gerekmez, Faz 3/5'te tekrar bak" geçerli cevaptır | — |
| 0.7 | **SDD metodolojisi** (15.06 analizi) | DEĞERLENDİR | OpenSpec'i değişiklik motoru, Spec Kit'in reconcile disiplinini drift kontrolü için, Tree-sitter/knowledge-graph tabanlı comprehension katmanı. **Faz başına tek araç** — altı asistanı paralel çalıştırma. BMAD'ın 12-agent ağırlığına Faz 1'de ihtiyaç yok; hafif başla. | Ajan inşa idiomu (SG 1.5) |

> **Disiplin kuralı:** ADIM 0'daki AÇIK kalemler Hafta 0'a (Jun 15–19) front-load edilmiştir. G4/G5 karar olduğu için en çok kayar — bu yüzden named default + Cuma deadline var. İndecision programı durduramaz.

---

## FAZ 0 — Zemin (Hafta 0–1, Jun 15–26) · ~169h · Hiçbir "stage" PR'ı yok, bir kerelik kurulum

Faz 0 bir geliştirme fazı değil; Stage 1.1.1'in **önündeki görünmez işler**. Bittiğinde: ortak sovereign substrate ayakta, kararlar yazılı, repo+CI+AG kurulu, walking skeleton tasarımı onaylı.

### A — Kararlar (CTO + Maymun + Claude sürer)
1. **A1** — 4 açık prereq yazılı cevap (`docs/decisions/open_prereqs.md`, "TBD" yok). *Kabul:* `grep -c "TBD" → 0`.
2. **A2** — ADR-001 (LiteLLM) + ADR-002 (MCP) ekibe walkthrough → `status: Accepted` damgası.
3. **A3** — Tüm-ekip alignment (v6 SSoT + dev_schedule_patch + runbook); disagreement'lar dosyaya.
4. **A4** — **Reading week** (zorunlu, §5 invariant): Anthropic *Building Effective Agents* + OpenClaw + Hermes + OASIS. 6 mühendis → 6 write-up. *Kabul:* `ls docs/reading_week_writeups/*.md \| wc -l → 6`.
5. **A5** — Monday (30dk standup) / Friday (60dk demo+retro) ritüel takvimi + şablonlar.
6. **A6** — ADR-003 ("prior-art'tan benimsenen pattern'ler") yazarı atanır; reading week çıktısını konsolide eder.
7. **A7** — **Resource allocation kontratı** (`docs/contracts/resource_allocation_v1.md`): 3+3→1+5 transition tetikleyicileri yazılı + Maymun imzalı.

### B — Ortak substrate (Hafta 1, 6 mühendis birlikte — kasıtlı cross-training)
Bağımlılık: `B1 → B2 → (B5..B11 ArgoCD app'leri ∥ B3 Vault ∥ B4 Keycloak ∥ B13 AG)`; `B12 → B14` Day-0'dan paralel.
8. **B1** — K8s namespaces (`revolutionize-system`, `eaip-system`, `eaip-tenant-kale`) + ResourceQuota + NetworkPolicy.
9. **B2** — ArgoCD bootstrap (app-of-apps, Keycloak SSO).
10. **B3** — Vault HA 3-node (Raft, TLS, kv-v2 + transit + pki). *⚠ 8h buffer'lı — en çok süren kalem.*
11. **B4** — Keycloak realm `ardictech-platform` (7+ client, `tenant_id`/`roles`/`mcp_capabilities` mapper'ları).
12. **B5** — MariaDB Galera schemas (`eaip_core`, `eaip_armes`, `revolutionize_core`).
13. **B6** — MinIO buckets (`audit-pdfs`, `cold-telemetry`, `model-artifacts`, `kale-tenant-uploads`).
14. **B7** — Redpanda 3-broker + **dört kanal topic'i**: `telemetry.raw.v1` (p12) · `intent.stream.v1` (p3) · `verification.gate.v1` (p3) · `reality.feed.v1` (p6). *Üç değişmez kanal + telemetri burada doğar.*
15. **B8** — ClickHouse 3-replica (Keeper) + `telemetry` (hot 30d) + `analytics_marts` DB'leri. *Tablo şemaları Stage 1.1.1'de gelir.*
16. **B9** — PostgreSQL HA pair, `wal_level=logical` (Debezium CDC hazırlık) + pgvector + `langgraph_checkpoints`/`litellm`/`app_state`.
17. **B10** — Qdrant 2-node (collection'lar tenant başına Faz A4+'ta).
18. **B11** — Observability stack: Grafana + Metabase + Tempo (trace), Keycloak SSO, ClickHouse/Postgres/Prometheus datasource'ları.
19. **B12** — GitHub repo + branch protection + CODEOWNERS + prompt dizini (`prompts/phase-{N}/stage-{X.Y.Z}/`, `stages/<id>/verify.sh`, `adrs/`, `docs/`).
20. **B13** — Antigravity workspace + model erişimi (Vault'tan inject, asla repo'da değil) + 6 mühendis hello-world.
21. **B14** — CI baseline (`ci.yml`: lint + unit + `node --check` + stage-gate iskeleti) — hello-world PR yeşil.
22. **B15** — Pattern Library v0 (`docs/pattern_library/INDEX.md`) + SOUL.md ilk taslak (≥200 kelime).

### C — Walking skeleton (Hafta 1 paralel — Maymun + CTO + Claude)
23. **C1** — 7–9 bileşenli zincir diagramı: WhatsApp webhook → Channel Gateway → LangGraph stub → LiteLLM proxy → mock LLM → echo → OTel → ClickHouse → Grafana panel. Her bileşen "real/stub" işaretli.
24. **C2** — Stub→real map: hangi stage hangi stub'u gerçekle değiştirir.
25. **C3** — Hafta 2 split execution planı (T1 + T2 ilk işleri + Cuma demo taahhüdü), 2 lead + Maymun + CTO imzalı.

### ✅ FAZ 0 ÇIKIŞ KAPISI (Cuma Hafta 1, 16:00)
Runbook §6 tablosundaki **bütün** A/B/C acceptance komutları + Faz 1 girişi **G1–G8** yeşil. **Tek kırmızı → Hafta 2 başlamaz** (acil kapatma toplantısı). Bu kapı tasarım gereği serttir.

---

## FAZ 1 — v1 inşası (Hafta 2–9, Jun 29–Aug 21) · ~1.188h · Takım-1 ∥ Takım-2 (EAIP M1+)

**İş birimi (değişmez):** 1 stage = 1 Claude prompt'u = 1 AG run = 1 PR = 1 kapılı merge.
**Atama:** push değil **pull** — her conductor WIP=1, açık stage-grubunun sıralı backlog'unun tepesinden çeker. Sıralama mimar-belirlidir; isim→stage bağı çekim anında oluşur.
**Yönetilen kısıt:** authoring değil **review kapasitesi**. Her PR ≥30dk insan review. CA-2 metrikleri (review-minutes/PR + defect-escape-rate) **ilk PR'dan itibaren** canlı.

### Bağımlılık zinciri (DAG — sıralama burada kilitli)
```
SG 1.1 Telemetry ─► SG 1.2 Streaming+storage ─► SG 1.3 Observability
                                                      │
                                          ┌───────────┴───────────┐
                                          ▼                       ▼
                                   SG 1.4 LiteLLM           SG 1.7 MCP servers
                                   gateway (2)              (6, kalibrasyon: 1.7.4 İLK)
                                          └───────────┬───────────┘
                                                      ▼
                                       SG 1.5 Agent base + v1 ajan seti (10)
                                                      ▼
                                          SG 1.6 İlk ürün (G4 kararı)
                                                      ▼
                                       FAZ 1 ÇIKIŞ = çalışan v1
```
1.4 ve 1.7 birbirinden **bağımsız** — iki operatör paralel sürer. En uzun yol yönetir.

### SG 1.1 — Telemetry foundation (10 stage) — *programın ilk Faz 1 tuğlası*
26. **1.1.1** Telemetry event şeması (Pydantic + TypeScript, schema-versioned) — ilk stage.
27. OTel collector deployment.
28. Agent-side emitter (lock-free ring buffer / fire-and-forget client lib).
29. Unknown-version reddetme yolu.
30. Schema registry + validation; CI hook (her event-schema PR'ı contract test çalıştırır).
31–35. Kalan emitter/registry/retention stage'leri.
*Cuma demo (Hafta 2):* bir telemetry event Grafana'da görünür. *Kabul:* event → Redpanda `telemetry.raw.v1` → ClickHouse sorgulanabilir.

### SG 1.2 — Streaming + storage (7 stage)
36. Redpanda consumer → ClickHouse insert pipeline.
37. ClickHouse tablo şemaları + materialized view'lar (per-agent, per-intent rollup).
38. Retention politikaları.
39. Replay tooling.
40–42. Kalan pipeline/rollup stage'leri.

### SG 1.3 — Observability surface (7 stage)
43. Grafana dashboard'ları (system health, pipeline lag).
44. **1.3.4 Cost & cache-efficiency dashboard** — per-agent cost trend + **prefix-cache hit rate** (context-bloat erken sinyali) + >%10 WoW düşüşte alert + **CA-2 reviewer-health panelleri** (review-minutes/PR, defect-escape-rate).
45. Metabase analitik view'lar.
46–49. Kalan observability stage'leri.

### SG 1.4 — LiteLLM gateway (2 stage) ∥ SG 1.7 ile paralel
50. **1.4.1 LiteLLM proxy deployment** — Anthropic primary + Vertex Gemini fallback, Vault key referansları, Keycloak JWT service-auth, health check, Helm/compose, e2e doğrulanmış test çağrısı.
51. **1.4.2 Gateway wrapper** (~500 LOC Python) — agent-aware routing, **`(agent_class, agent_instance, intent_id, cell_pool)`'a cost attribution**, per-minute token-burst cap'leri, her çağrıda structured telemetry event. **G3'ün `caps.yaml`'ı burada enforce config olur.** CTO bu PR'ı şahsen review eder.

### SG 1.7 — MCP tool servers (6 stage) — *kalibrasyon: 1.7.4 İLK gönderilir*
> Çalıştırma sırası: **1.7.4 → review + styleguide → (1.7.5 ∥ 1.7.6) → (1.7.2 ∥ 1.7.3) → 1.7.1**. Bu kapı serttir.
52. **1.7.4 Filesystem MCP** (S, **kalibrasyon stage**) — `fs.{read,write,list,mkdir,delete}`, per-agent home'a sandbox, path-traversal bloklu. **İlk MCP server; dersler MCP styleguide'a yazılır, diğer 1.7 başlamadan önce.**
53. **1.7.5 Web search MCP** (S) — `search.web()`, Brave primary + Tavily fallback, Vault key, per-agent rate limit.
54. **1.7.6 Docs fetch MCP** (S) — `docs.fetch(url, format)`, readability-lxml, opsiyonel URL allowlist.
55. **1.7.2 Git MCP** (M) — `git.{clone,fetch,branch,commit,diff,log,status,push}`, Keycloak JWT ile per-agent repo scope, Vault SSH key.
56. **1.7.3 GitHub MCP** (M) — `github.{pr_create,pr_review,pr_merge,issue_*,repo_get,file_*}`, identity'den read-only/write scope.
57. **1.7.1 Sandbox MCP** (**L — Faz 1'in en büyük tek stage'i**) — `sandbox.execute()`, swappable `SandboxBackend` (Faz 1: Docker socket), CPU/mem/network-egress limitleri enforce, çıktı stream. *⚠ Hafta 7'yi tehdit ederse pairing fallback.*
> Browser/accessibility-tree MCP **Faz 2'ye ertelendi** (Empathy Engine persona'ları için). G4 ürünü browser gerektiriyorsa minimal browser MCP'yi Faz 1'e terfi ettir.

### SG 1.5 — Agent base class + ilk v1 ajan seti (10 stage)
58. **1.5.1 Agent base class** (M) — *prereq: SG 1.1+1.2+1.3+1.4+1.7 tamam.* MCP client (per-agent config'ten server discovery + allowlist enforce + trace_id propagation), tüm LLM çağrıları 1.4.2 wrapper'ından (asla doğrudan provider'a), her gateway+tool çağrısı telemetry emit eder. CTO review.
59. engineering-manager agent.
60. backend agent.
61. frontend agent.
62. database agent.
63. DevOps agent.
64–67. Kalan v1 ajanları (base class üstünde).
*Bu, Execution Swarm tohumu. v1 = bu ajan setinin insan-kapılı PR üretmesi.*

### SG 1.6 — İlk ürün (G4 kararı; default = Web Asistan widget)
68. **G4 ürünü, v1 ajan seti tarafından tam döngüden inşa edilir:** intent → ajanlar → verification gate → PR → insan kapısı → merge. **Programın ilk gerçek "Revolutionize bir şey inşa ediyor" olayı.**
69. Ürün canlıya alınır (production URL + gerçek trafik telemetrisi).

### ✅ FAZ 1 ÇIKIŞ KAPISI (Cuma Hafta 9) = ÇALIŞAN v1
Kanonik beş (07_revolutionize_schedule.html'den verbatim — hepsi tutmalı):
- **X1** Telemetry uçtan uca akıyor ve sorgulanabilir (bir 1.6 ajan run'ının canlı izi: action → event → Redpanda → ClickHouse → query).
- **X2** LiteLLM gateway per-agent cost attribution ile route ediyor (sıfır doğrudan-provider çağrısı).
- **X3** MCP server'lar boot'ta capability allowlist enforce ediyor (ihlal-reddi demo).
- **X4** v1 ajanları verification gate üzerinden insan-review'lı PR gönderiyor (merged 1.6 PR'ları + gate kayıtları).
- **X5** İlk ürün production'da canlı.

Amendment eklentileri:
- **+A1** (CA-2) Cost/prefix-cache/reviewer-health dashboard'ları ≥4 hafta geçmişle dolu; bir cap'in gerçekten bloke ettiği gösterildi (CA-7).
- **+A2** (CA-4) 6/6 mühendis ≥3 stage conduct etti (conductor log).
- **+A3** Faz 2 just-in-time decomposition taslağı + **3+3→1+5 değerlendirmesi** yapıldı (A7 tetikleyici (i) bu kapının yeşili).

---

## v1 → v1.5 olgunlaşma (M2–M7, programın geri kalanı)

Faz 1 çalışan v1'i üretir; sonra v1 **kullanılarak** olgunlaşır:
- v1 ajan seti EAIP ürünlerini geliştirmek için kullanılır (gerçek-dünya iş yükü).
- CWF v1 (Kale) — M3–M5 build, M4–M5 UAT, **Aralık go-live (sert deadline)**. *Not: CA-1 firewall — CWF Takım-2 insanları tarafından teslim edilir; Revolutionize CWF kritik yolunda DEĞİLDİR.*
- Reality feed gerçek production telemetrisini ancak CWF canlıya alınınca (~M5–M7) alır → v2-yetenek doğrulaması (tournament selection, prompt evolution) ~M10'dan önce planlanmaz (CA-6).
- v1, M7'ye (Aralık 2026) kadar **v1.5**'e — savaş-testinden geçmiş, programın bitiş durumu — olgunlaşır.

---

## Hesaplanmış-risk notları (peşin uyarılar)

1. **G4/G5 kararları Hafta 0'ı geçerse** → named default (Web Asistan widget) + Cuma deadline + kapı bloke. *En yüksek olasılıklı kayma.*
2. **1.7.1 Sandbox (L) Hafta 7'yi patlatabilir** → kalibrasyon-önce sıralama (1.7.4 ilk) pattern'i de-risk eder; Dev pairing fallback; Hafta 9 buffer.
3. **Cadence rampasında (Hafta 7–9) review rubber-stamping** → CA-2 metriği ilk PR'dan; medyan review <15dk/PR iki hafta üst üste düşerse CTO gate-audit. *Otonomi ölçülen escape-rate ile kazanılır, takvimle verilmez.*
4. **Reality-feed cold start** → CWF go-live öncesi (M5–M7) production verisi yok; "production telemetrisiyle doğrulandı" iddiası bu tarihten önce prompt-review'da reddedilir.
5. **AG güvenilirliği** → AG iyi execute eder ama state-read'leri ve nedensel açıklamaları güvenilmez. Yalnız ground-truth'a güven (ham GitHub dosyası, browser'da standalone dosya, Vercel production) — AG özetlerine asla. Chat→disk sınırını geçen her şey hash-verified dosya olarak gelir (Pattern #20).
6. **Tooling kararı (ADIM 0.1)** ertelenirse SG 1.4 sonrası tüm ajan üretimi opak-kredi sayacına kilitli kalır → bütçe enforce edilemez. Bu kararı G3 ile birlikte kapat.

---

*Liste sonu. Bu, `program_plan_v1.1`'in bağımlılık-sıralı tamamlayıcısıdır: ne, hangi sırada, hangi kabul ile. Onay sonrası ilk somut adım — Stage 1.1.1 prompt'unu yazmak — Faz 0 çıkış kapısı yeşil olduğunda tetiklenir.*
