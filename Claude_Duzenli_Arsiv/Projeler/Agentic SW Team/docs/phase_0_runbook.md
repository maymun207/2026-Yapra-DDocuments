# Phase 0 Runbook — ARDICTECH Combined-Platform

> **Status:** Draft v0.1 — yazar: Claude · CTO redline bekleniyor (24h)
> **Owner:** Maymun (sponsor) · CTO (operasyonel sahip)
> **Scope:** EAIP + Revolutionize ortak başlangıç fazı · Week 0–1
> **Exit:** Bütün acceptance komutları yeşil → Week 2'de takımlar ayrı çalışmaya başlar

---

## 0. Bu doküman nedir, ne değildir

**Nedir.** Stage 1.1.1'in *önündeki* görünmez işler. Phase 0 bir geliştirme fazı değil — bir hazırlık aşamasıdır. Hiçbir "stage" PR'ı yok, sadece bir kerelik kurulum işleri var. Bittiğinde:

- 6 mühendisin ortak çalıştığı **shared sovereign substrate** ayakta (K8s, Vault, Keycloak realm, MariaDB Galera, MinIO, Redpanda, ClickHouse, Postgres, Qdrant, observability stack)
- **5 OPEN prereq'in 4'ü yazılı cevaplanmış** (#4 zaten implicitly çözüldü)
- **GitHub repo + branch protection + Antigravity workspace** kurulu
- **CI baseline hello-world yeşili** + stage-gate iskeleti hazır
- **Pattern Library v0** + **SOUL.md** ilk taslakları repo'da
- **Walking skeleton tasarımı** (Week 2'de uygulanacak) onaylı

**Değildir.** Bu Stage 1.1.1 değil. Stage 1.1.1 telemetry event schema yazımıdır ve Week 2'de Takım-1 tarafından Antigravity ile yapılacak. Phase 0 → Stage 1.1.1 sıralaması: önce zemin, sonra ilk tuğla.

---

## 1. Takım yapısı

| Rol | Sayı | Phase 0'daki iş |
|---|---|---|
| Takım-1 mühendisleri | 3 | Joint substrate (B-track) + Week 2'den Revolutionize Phase 1 |
| Takım-2 mühendisleri | 3 | Joint substrate (B-track) + Week 2'den EAIP M1 Core |
| CTO (Tech Lead + Program Leader) | 1 | A-track sahibi · runbook PR review · ritüel kurar |
| Maymun (Owner) | 1 | A-track sponsor · OPEN prereq cevaplayıcı · SOUL.md kaynak |
| Claude | 1 | Stage prompt yazarı · architecture review · runbook iskelet |

Sembol notu: **lead** = tek sorumlu mühendis, **support** = yardımcı. Phase 0 boyunca tüm 6 mühendis sınıfta — sahiplik tek, iş kolektif.

---

## 2. Zaman planı

```
Week 0 (BU HAFTA)        Week 1 (Joint Phase 0)         Week 2 (Split başlar)
──────────────────       ─────────────────────────       ──────────────────────
CTO + Maymun + Claude    6 eng + CTO                    T1 → Stage 1.1.1
A-track ilerletir        B-track + A-track devam        T2 → EAIP M1 Core App-zone
Reading week başlar      C-track tasarım onaylanır      Walking skeleton inşası
Antigravity erişimi      Cuma 16:00 exit gate           Monday/Friday ritüel canlı
sağlanır                 (acceptance komutları yeşil)
```

**Critical path:** A1 (OPEN prereq) ve A4 (reading week) Week 0'da başlamazsa Week 1 başlangıcı kayar. CTO + Maymun bu hafta başlayacak.

---

## 3. Track A — Kararlar ve toplantılar

CTO + Maymun + Claude tarafından sürülür. Mühendisler katılır ama owner değildir.

### A1 — 4 OPEN prereq yazılı cevapları
- **Owner:** Maymun (sponsor) · CTO (drafter)
- **Goal:** ① first product (Stage 1.6 + Walking skeleton bağımlı), ② SOUL.md founder (varsayılan Maymun, onay), ③ quarterly LLM budget USD aralığı, ⑤ expertise gaps (TLA+/Alloy + orchestration + multi-tenant security önerilen 3 ana adres).
- **Acceptance:** `cat docs/decisions/open_prereqs.md` → 4 maddenin tamamı dolu, "TBD" string yok.
- **Effort:** 1× 90 dk Maymun+CTO toplantısı + 2h Claude entegrasyon.

### A2 — ADR-001 + ADR-002 review oturumu
- **Owner:** CTO
- **Goal:** LiteLLM gateway (ADR-001) ve MCP external tool protocol (ADR-002) ekibe walkthrough; itiraz varsa kayda geçir, yoksa "Accepted" damgası.
- **Acceptance:** ADR dosyalarının front-matter'ında `status: Accepted` + `accepted_at: 2026-06-XX` + `accepted_by: <CTO_name>`.
- **Effort:** 60 dk toplantı + 30 dk damga.

### A3 — Tüm-ekip alignment session
- **Owner:** CTO
- **Goal:** v6 SSoT bilingual master page + dev_schedule_patch_v1 + bu runbook walkthrough. Disagreement'lar `docs/disagreements/2026-06-XX.md` dosyasına yazılır.
- **Acceptance:** Tüm 6 mühendis + CTO + Maymun katılım imzalı (Confluence/Notion sayfası); disagreement listesi varsa CTO'nun next-step'i yazılı.
- **Effort:** 90 dk toplantı + 30 dk doküman.

### A4 — Pre-reading dağıtımı + reading week kickoff
- **Owner:** CTO
- **Goal:** Anthropic *Building Effective Agents* (zorunlu, §5 invariant) + OpenClaw + Hermes Agent + OASIS örnekleri dağıtımı. 6 mühendis 3-5 iş gününde okur. Her engineer 1 sayfa write-up çıkarır.
- **Acceptance:** `ls docs/reading_week_writeups/*.md | wc -l` → `6`.
- **Effort:** 3-5 iş günü (her engineer için), CTO için 2h koordinasyon.

### A5 — Monday/Friday ritüel takvimi
- **Owner:** CTO
- **Goal:** Pazartesi 30 dk (Stage Generator review — Claude'un o hafta üreteceği prompt'ların ön tarama + invariant kontrolü); Cuma 60 dk (geçen hafta merged PR demo + retro + lessons.md güncellemesi). Recurrent calendar invite + Confluence sayfa şablonu.
- **Acceptance:** `caldav` veya Outlook'ta önümüzdeki 12 hafta için recurrent event görünüyor; ritüel template'i repo'da `docs/rituals/{monday,friday}_template.md`.
- **Effort:** 1h.

### A6 — ADR-003 yazarı atanır
- **Owner:** CTO (atayan), atanan mühendis (yazar)
- **Goal:** Reading week çıktılarını (A4'ten 6 yazı) **ADR-003: Patterns adopted from prior art** dosyasında konsolide edecek mühendisi atamak. Yazma A4 bittikten sonra başlar, Week 1 sonu teslim.
- **Acceptance:** `git log adrs/ADR-003-patterns-from-prior-art.md` → 1+ commit; ADR `status: Draft` veya `Accepted`.
- **Effort:** Yazar için 6-8h.

### A7 — Resource allocation contract
- **Owner:** CTO drafter, Maymun sign-off
- **Goal:** 3+3→1+5 transition triggerını yazılı kayıt altına almak: (i) Revolutionize Phase 1 exit gate'in 5 maddesi yeşil olunca otomatik switch; (ii) CWF velocity 2 stage/hafta altına düşerse erken switch; (iii) hangi 2 mühendis hangi koşulda T1'den T2'ye geçer.
- **Acceptance:** `docs/contracts/resource_allocation_v1.md` mevcut, CTO + Maymun digital imzalı.
- **Effort:** 2h drafting + 30 dk Maymun review.

---

## 4. Track B — Shared substrate (Week 1 joint)

Bu maddelerin **çoğu mevcut ARDICTECH altyapısı üzerinde** yapılıyor (Keycloak, MariaDB Galera, MinIO ✓ var). Bazıları yeni kurulum (Vault HA, Redpanda, ClickHouse, Qdrant, observability stack). ArgoCD app-of-apps deseni ile çoğu deployment Git'ten yönetilir.

**Bağımlılık özeti:**
```
B1 (K8s namespace) ── B2 (ArgoCD bootstrap) ─┬── B5..B11 (ArgoCD apps olarak)
                                              ├── B3 (Vault HA) parallel
                                              ├── B4 (Keycloak realm) parallel
                                              └── B13 (Antigravity, depends B3+B12)
B12 (GitHub repo) ── B14 (CI baseline) parallel from Day 1
```

### B1 — K8s namespaces + ResourceQuota + NetworkPolicy
- **Lead / Support:** Takım-2 lead · Takım-1 review
- **Prerequisites:** Mevcut ARDICTECH K8s cluster `kubectl` erişimi (Netaş/OSB Cloud).
- **Goal:** 3 namespace (`revolutionize-system`, `eaip-system`, `eaip-tenant-kale`) + per-namespace `ResourceQuota` (CPU 4, Mem 8Gi başlangıç) + `NetworkPolicy` (pod'lar yalnız kendi ns + `platform-system`'a erişir).
- **Acceptance:** `kubectl get ns | grep -E 'revolutionize-system|eaip-system|eaip-tenant-kale' | wc -l` → `3`; `kubectl get networkpolicy -A | wc -l` → `≥ 3`.
- **Effort:** 4h.

### B2 — ArgoCD bootstrap (app-of-apps)
- **Lead / Support:** Takım-2 lead · Takım-1 review
- **Prerequisites:** B1 tamam.
- **Goal:** ArgoCD `v2.11` kurulu (Helm chart), `argocd` namespace'inde; app-of-apps deseninde parent `platform` Application + child app'ler için Git repo şablonu. SSO Keycloak'a bağlı.
- **Acceptance:** `kubectl get application -n argocd platform -o jsonpath='{.status.sync.status}'` → `Synced`; `argocd app list` → 0+ child app.
- **Effort:** 6h.

### B3 — Vault HA 3-node
- **Lead / Support:** Takım-1 lead · Takım-2 review
- **Prerequisites:** B1 tamam.
- **Goal:** HashiCorp Vault HA mode 3-node (Raft storage), TLS sertifikalı, Keycloak OIDC ile auth backend. Secret engines: `kv-v2/` (gizli env), `transit/` (encryption-as-a-service), `pki/` (sertifika).
- **Acceptance:** `vault status` → `HA Enabled: true`, `Sealed: false`, `Active Node: <one of three>`; `vault kv put secret/test/probe value=ok && vault kv get secret/test/probe` → success.
- **Effort:** 8h.

### B4 — Keycloak realm setup (yeni platform realm)
- **Lead / Support:** Takım-2 lead · Takım-1 review
- **Prerequisites:** Mevcut ARDICTECH Keycloak erişimi.
- **Goal:** Yeni realm `ardictech-platform`; client'lar: `argocd`, `vault`, `grafana`, `metabase`, `langgraph`, `litellm-proxy`, `kong-admin`. Mapper'lar: `tenant_id`, `roles`, `mcp_capabilities`. JWT signing key Vault'tan.
- **Acceptance:** `curl <kc>/realms/ardictech-platform/.well-known/openid-configuration` → 200 + `issuer` field doğru; `kcadm.sh get clients -r ardictech-platform | jq 'length'` → `≥ 7`.
- **Effort:** 6h.

### B5 — MariaDB Galera schemas
- **Lead / Support:** Takım-2 lead
- **Prerequisites:** Mevcut MariaDB Galera erişimi.
- **Goal:** Schema'lar `eaip_core`, `eaip_armes`, `revolutionize_core` create; uygulama kullanıcıları + Vault'ta password (kv-v2'ye yazılı).
- **Acceptance:** `mysql -e "SHOW DATABASES" | grep -E 'eaip_core|eaip_armes|revolutionize_core' | wc -l` → `3`.
- **Effort:** 2h.

### B6 — MinIO buckets
- **Lead / Support:** Takım-2 lead
- **Prerequisites:** Mevcut MinIO erişimi.
- **Goal:** Bucket'lar `audit-pdfs`, `cold-telemetry`, `model-artifacts`, `kale-tenant-uploads`. Per-bucket IAM policy + lifecycle (audit-pdfs: 365d retention; cold-telemetry: 365d sonra glacier-eq).
- **Acceptance:** `mc ls platform/ | wc -l` → `≥ 4`; `mc admin policy list platform` → policy'ler görünür.
- **Effort:** 3h.

### B7 — Redpanda 3-node + topics
- **Lead / Support:** Takım-1 lead · Takım-2 review
- **Prerequisites:** B1 + B2 tamam (ArgoCD üzerinden Redpanda Operator).
- **Goal:** Redpanda 3-broker cluster, mTLS açık. Topic'ler: `telemetry.raw.v1` (partition 12, retention 7d), `intent.stream.v1` (partition 3), `verification.gate.v1` (partition 3), `reality.feed.v1` (partition 6).
- **Acceptance:** `rpk cluster info` → `Brokers: 3`; `rpk topic list | wc -l` → `≥ 4`.
- **Effort:** 6h.

### B8 — ClickHouse 3-node + databases
- **Lead / Support:** Takım-1 lead · Takım-2 review
- **Prerequisites:** B1 + B2 tamam.
- **Goal:** ClickHouse 3-replica cluster (zookeeper-less Keeper). Database `telemetry` (hot 30d) + `analytics_marts`. Tablo şemaları Stage 1.1.1'de gelecek — şimdilik sadece DB ve user.
- **Acceptance:** `clickhouse-client -q "SELECT count() FROM system.clusters WHERE cluster='platform'"` → `3`; `clickhouse-client -q "SHOW DATABASES" | grep telemetry` → satır var.
- **Effort:** 8h.

### B9 — PostgreSQL HA pair + databases
- **Lead / Support:** Takım-2 lead
- **Prerequisites:** B1 + B2 tamam (Postgres Operator).
- **Goal:** Postgres 16 HA pair (primary + sync replica), `wal_level=logical` (Debezium CDC için Phase 1.6+ hazırlık). DB'ler: `langgraph_checkpoints`, `litellm`, `app_state`. pgvector extension.
- **Acceptance:** `psql -c "SELECT pg_is_in_recovery()"` primary'de `false`, replica'da `true`; `psql -c "SHOW wal_level"` → `logical`; `\dx` → `vector` var.
- **Effort:** 6h.

### B10 — Qdrant 2-node + collections
- **Lead / Support:** Takım-2 lead
- **Prerequisites:** B1 + B2 tamam.
- **Goal:** Qdrant 2-node cluster, gRPC açık. Collection'lar tenant başına yaratılacak (Phase A4+); şimdilik sadece cluster + sağlık probe.
- **Acceptance:** `curl <qdrant>:6333/healthz` → `ok`; `curl <qdrant>:6333/cluster` → `peers: 2`.
- **Effort:** 4h.

### B11 — Observability stack
- **Lead / Support:** Takım-1 lead · Takım-2 review
- **Prerequisites:** B1 + B2 tamam.
- **Goal:** Grafana + Metabase + Tempo (trace) deployed. Keycloak SSO. Veri kaynakları: ClickHouse (telemetry için), Postgres (uygulama state'i için), Prometheus (K8s metrics).
- **Acceptance:** `curl <grafana>/api/datasources` (auth'lu) → en az 3 datasource; `curl <metabase>/api/health` → `ok`.
- **Effort:** 6h.

### B12 — GitHub repo + branch protection + codeowners + prompt structure
- **Lead / Support:** Takım-2 lead · Claude review
- **Prerequisites:** Yok (Day 0).
- **Goal:** `git@github.com:maymun207/revolutionize.git` (combo doc §1 suggested name). Branch protection on `main`: ≥1 review, status checks required, no force push. `CODEOWNERS` file (T1 owns `revolutionize/**` + `prompts/**`, T2 owns `eaip/**`). Directory'ler: `prompts/phase-{N}/stage-{X.Y.Z}/{v1.md,v2.md,final.md,lessons.md}`, `stages/<id>/verify.sh`, `adrs/`, `docs/`.
- **Acceptance:** `gh repo view maymun207/revolutionize --json defaultBranchRef,visibility` → `main` + `private`; `gh api repos/maymun207/revolutionize/branches/main/protection` → 200 + required reviews ≥1.
- **Effort:** 3h.

### B13 — Antigravity workspace + model access + Vault integration
- **Lead / Support:** Takım-1 lead · Tüm engineer'lar bireysel kurulum
- **Prerequisites:** B3 (Vault) + B12 (repo) tamam.
- **Goal:** Antigravity workspace stood up, model erişimi (Anthropic Opus 4.7 + Sonnet 4.6 + Haiku 4.5 + Gemini 3.1 Pro). API key'ler Vault'tan inject (asla repo'da değil). Repo strüktürü Antigravity'den görünür. 6 engineer her biri hello-world prompt çalıştırıp 200 dönüş aldı.
- **Acceptance:** `ls docs/onboarding/antigravity_helloworld_results/*.md | wc -l` → `6`; `vault kv list secret/llm-providers/` → 4+ entry.
- **Effort:** Her engineer için 1h + Takım-1 lead için 4h setup.

### B14 — CI baseline + stage-gate iskeleti
- **Lead / Support:** Takım-1 lead · Takım-2 review (CI'ı her iki takım kullanacak)
- **Prerequisites:** B12 tamam.
- **Goal:** GitHub Actions workflow `ci.yml`: lint + unit test + `node --check` (HTML deliverables için) + `stage-gate` job iskeleti (her PR'da `stages/<changed_stage>/verify.sh` bulup çalıştırır). Hello-world PR yeşil geçer.
- **Acceptance:** `gh run list --workflow=ci.yml --limit 1 --json conclusion -q '.[0].conclusion'` → `success` (hello-world PR'ında); `stages/0.0.0/verify.sh` exit 0.
- **Effort:** 6h.

### B15 — Pattern Library v0 + SOUL.md initial
- **Lead / Support:** Claude (taslak) · Maymun (SOUL.md content) · CTO (review)
- **Prerequisites:** B12 tamam.
- **Goal:** `docs/pattern_library/` directory + `INDEX.md` (boş ama yapılı). `docs/SOUL.md` ilk taslağı (Maymun'un tasarım tercihleri, "nelerden hoşlanmam", taste anchors — Vision Engine'in Phase 2+ için referansı). §5 invariant: "Pattern Library sacred."
- **Acceptance:** `ls docs/pattern_library/INDEX.md docs/SOUL.md` → 2 dosya; SOUL.md ≥ 200 kelime.
- **Effort:** 4h.

---

## 5. Track C — Walking skeleton tasarımı

Week 1 paralel, Maymun + CTO + Claude. Week 2'de iki takım ortak teslim edecek.

### C1 — Bileşen sırası diagram
- **Owner:** Claude (drafter) · CTO (review)
- **Goal:** Walking skeleton'ın 7-9 bileşenli zincirini görselleştir: WhatsApp test webhook → Channel Gateway → LangGraph stub graph → LiteLLM proxy → mock LLM endpoint → echo response → OTel event → ClickHouse insert → Grafana panel. Her bileşen "real" mi "stub" mu işaretli.
- **Acceptance:** `docs/walking_skeleton/component_sequence.svg` veya `.html` mevcut + CTO `Approved` damga.
- **Effort:** 3h.

### C2 — Stub → real implementation map
- **Owner:** Claude (drafter) · CTO (review)
- **Goal:** Hangi Stage hangi stub'u real'le değiştirecek tablo. Örn: Stage 1.1.1 (telemetry schema) → OTel event "real". Stage 1.4.2 (LiteLLM wrapper) → LiteLLM proxy "real". Stage 1.5.1 (agent base) → LangGraph stub graph "real". Mfg agent stage'leri (EAIP-cwf1) → mock LLM endpoint "real".
- **Acceptance:** `docs/walking_skeleton/stub_to_real_map.md` mevcut + her stub'a en az bir Stage ID assigned.
- **Effort:** 2h.

### C3 — Week 2 split execution planı
- **Owner:** CTO (drafter) · Claude (review)
- **Goal:** Week 2 Monday başlangıçta T1 ve T2 hangi 3-4 işle başlayacak, Cuma demo'sunda neyi göstereceklerini yazılı plan. T1: Stage 1.1.1 + OTel collector kurulumu; T2: Channel Gateway iskeleti + LangGraph stub graph + Kong route.
- **Acceptance:** `docs/week_2_execution_plan.md` mevcut + Maymun + CTO + 2 takım lead imzalı.
- **Effort:** 3h.

---

## 6. Phase 0 exit gate

Cuma Week 1, 16:00. Aşağıdaki **bütün** acceptance komutları yeşil olmalı:

| Track | Madde | Komut |
|---|---|---|
| A | A1 | `grep -c "TBD" docs/decisions/open_prereqs.md` → `0` |
| A | A2 | `grep -l "status: Accepted" adrs/ADR-00{1,2}*.md \| wc -l` → `2` |
| A | A3 | alignment session attendance sheet imzalı |
| A | A4 | `ls docs/reading_week_writeups/*.md \| wc -l` → `6` |
| A | A5 | calendar invite kanıtı |
| A | A6 | `git log adrs/ADR-003*.md` → ≥1 commit |
| A | A7 | `docs/contracts/resource_allocation_v1.md` imzalı |
| B | B1 | `kubectl get ns \| grep -cE 'revolutionize-system\|eaip-system\|eaip-tenant-kale'` → `3` |
| B | B2 | `kubectl get application -n argocd platform -o jsonpath='{.status.sync.status}'` → `Synced` |
| B | B3 | `vault status` → `HA Enabled: true`, `Sealed: false` |
| B | B4 | `curl <kc>/realms/ardictech-platform/.well-known/openid-configuration` → 200 |
| B | B5 | `mysql -e "SHOW DATABASES" \| grep -cE 'eaip_core\|eaip_armes\|revolutionize_core'` → `3` |
| B | B6 | `mc ls platform/ \| wc -l` → `≥ 4` |
| B | B7 | `rpk cluster info \| grep -c 'Brokers: 3'` → `1` |
| B | B8 | `clickhouse-client -q "SELECT count() FROM system.clusters WHERE cluster='platform'"` → `3` |
| B | B9 | `psql -c "SHOW wal_level" \| grep -c logical` → `1` |
| B | B10 | `curl <qdrant>:6333/cluster \| jq .result.peers \| length` → `2` |
| B | B11 | `curl <grafana>/api/health \| jq -r .database` → `ok` |
| B | B12 | `gh api repos/maymun207/revolutionize/branches/main/protection` → 200 |
| B | B13 | `ls docs/onboarding/antigravity_helloworld_results/*.md \| wc -l` → `6` |
| B | B14 | `gh run list --workflow=ci.yml --limit 1 --json conclusion -q '.[0].conclusion'` → `success` |
| B | B15 | `ls docs/pattern_library/INDEX.md docs/SOUL.md` → 2 dosya |
| C | C1 | `ls docs/walking_skeleton/component_sequence.{svg,html}` → 1+ |
| C | C2 | `ls docs/walking_skeleton/stub_to_real_map.md` → 1 |
| C | C3 | `ls docs/week_2_execution_plan.md` → 1 |

**Tek kırmızı varsa Phase 0 kapalı değildir.** Week 2'ye geçilmez. Eksik madde acil kapatma toplantısı.

---

## 7. Açık prereqler (Track A1'in detayı)

Bunlar Phase 0 boyunca cevaplanacak. Şu an `docs/decisions/open_prereqs.md` dosyasında `TBD` ile başlayacaklar.

| # | Soru | Bağlı olduğu Stage | Karar verici | Önerilen ön-cevap |
|---|---|---|---|---|
| 1 | First product (Revolutionize'ın inşa edeceği ilk EAIP modülü) | Stage 1.6 | Maymun + CTO | CWF audit PDF üretici (telemetri zengin, contractual değil ama prestij) **VS** Web Asistan embed widget (düşük risk, ölçülebilir CTR/conversion telemetrisi) — öneri: **Web Asistan widget** |
| 2 | SOUL.md founder | A6 + Vision Engine | Maymun (varsayılan) | Maymun, onay bekliyor |
| 3 | Quarterly LLM budget (USD) | LiteLLM routing config (Stage 1.4) | Maymun | TBD — Phase 1 için $15-25K/quarter range önerisi |
| 5 | Expertise gaps (dış danışman ihtiyacı) | Phase 4-5 planlama | CTO | TLA+/Alloy (formal methods), multi-tenant security audit, ML evals |

#4 (EAIP↔Revolutionize ilişkisi) **bu runbook ile cevaplandı**: ayrı takımlar, paylaşılan substrate, bridge üç kanal (intent_stream + verification_gate + reality_feed) üzerinden.

---

## 8. Riskler ve mitigation

| Risk | Olasılık | Etki | Mitigation |
|---|---|---|---|
| Week 1 ortak Phase 0'da koordinasyon yükü ile bireysel velocity düşük | Orta | Düşük | Owner/Support modeli net; A5 ritüel takvimi Pazartesi 30 dk standup ekler |
| Vault HA setup (B3) tahmin edilenden uzun sürer | Orta | Orta | Takım-1 lead için 8h buffer var; gerekirse Vault Cloud SaaS yedek (combo doc Hybrid topology, Cloud SaaS sütunu yok ama ekleyebiliriz) |
| OPEN prereq #1 (first product) Maymun-CTO arası gecikmesi | Yüksek | Yüksek | Week 0 sonu deadline; geçilirse Web Asistan widget'ı default olarak işaretle |
| Reading week (A4) "okudum" diyenler aslında okumamış | Orta | Yüksek (uzun vadeli) | 1 sayfa write-up zorunlu; CTO write-up'ları okuyup short feedback verir |
| Antigravity model API quota Phase 0'da bitmez ama Phase 1'de patlar | Düşük | Orta | A1.3 LLM budget kararına dahil; LiteLLM proxy (Stage 1.4) gerçek throttle koyana kadar Vault'ta hard cap |
| CTO veya Maymun Week 1 müsait değil | Düşük | Yüksek | Backup: CTO yedeği = Takım-2 senior; Maymun yedeği = CTO'nun SOUL.md ön-taslağı + Maymun onay |

---

## 9. Bu runbook'tan sonrası

Phase 0 exit gate yeşil olunca Week 2 Pazartesi:

- **Takım-1:** Stage 1.1.1 prompt'unu (Telemetry event schema — Pydantic + TypeScript) Claude'dan ister. Antigravity ile çalıştırır. Cuma demo'sunda telemetry event Grafana'da görülüyor.
- **Takım-2:** EAIP M1 Core'un App-zone bileşenlerine başlar — Kong baseline config, Channel Gateway iskeleti, LangGraph stub graph, LiteLLM proxy ayağa kalkışı. Cuma demo'sunda WhatsApp test mesajı echo geri dönüyor.
- **İki takım ortak:** Walking skeleton (C1-C3'ten tasarım) end-to-end Cuma demo'sunda canlı çalışıyor.

Phase 0 kapanır, Phase 1 (Revolutionize tarafı) ve EAIP M1 Core (EAIP tarafı) paralel başlar.

---

## Appendix — Maymun'un onay bekleyen maddeleri

- [ ] Takım yapısı (§1) onayı
- [ ] Zaman planı (§2) onayı
- [ ] Track A görev sahiplikleri onayı
- [ ] OPEN prereq #1, #3 ön-cevapları (varsa şimdi)
- [ ] Repo adı `maymun207/revolutionize` doğru mu?

## Appendix — CTO redline bekleyen maddeleri

- [ ] Bütün acceptance komutları (lokal cluster context'iyle doğrulama)
- [ ] B3 Vault HA: gerçek node sayısı + storage path
- [ ] B7 Redpanda + B8 ClickHouse: partition/replica sayıları
- [ ] B11 observability stack: Loki ekleyelim mi (combo doc'ta yok ama trace+log birleştirme için faydalı)?
- [ ] A4 reading week pre-reading listesi: Anthropic *Building Effective Agents* dışında ne eklensin?

---

*Draft v0.1 · Yazar Claude · 2026-05-31 · Sonraki revizyon CTO redline sonrası*
