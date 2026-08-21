# Developer Cookbook — Strategic Proposal

> **Author:** Claude (architect)
> **Date:** 2026-06-03
> **Audience:** Maymun (Conductor) — decision required before next stage
> **Replaces:** No prior doc — this opens a new workstream parallel to the migration

---

## 1. The honest gap

| Surface | v5 SSoT (HTML reference) | v6 SSoT (today, post-S2/S2b) |
|---|---|---|
| Components in store | **67 with full data** | 67 with `[name, layer, tag]` only |
| Fields per component | `sub · desc · deploy.image · deploy.install · deploy.note · config[].{k,v,n} · notes` (~10 fields) | **3 fields** |
| Connection metadata | `purpose` (EN only) | `proto · purpose_en · purpose_tr` ✓ |
| Connection type catalog | `name + desc` | `desc_en + desc_tr` ✓ |
| Languages | EN only | EN + TR throughout ✓ |
| Click → component depth | Right-side panel with deploy + config + notes + connections | **S2 panel: connections only** |
| Click → connection depth | Same right-side panel (FROM component) | **S2b inline: 5 data points** |

What v6 gained: bilingualism, connection-side richness, cleaner data shape.
What v6 lost: **the cookbook**. The single thing a developer needs most.

Your screenshot of Channel Gateway is the bar. We are far below it.

---

## 2. What "cookbook" actually means

A developer working on this platform asks one of **three questions** at any
given moment. Anything else is decoration. Anything missing breaks flow.

### Job 1 — INTEGRATE: "I need to call this. What's the contract?"
- Endpoint URL + port
- Auth method (JWT / mTLS / API key / none)
- A **copy-paste call sample** (curl / Python / TypeScript — pick one per component)
- Expected response shape
- Top 2-3 error codes and what they mean

### Job 2 — DEPLOY: "I need to bring this up. How?"
- Container image + version pin policy
- Install / Helm command
- Required env vars (with secret references, not values)
- Resource limits (CPU / RAM / GPU / disk)
- Boot dependencies ("Postgres must be ready first")

### Job 3 — DEBUG: "It's broken. Where do I look?"
- Health endpoint + expected response
- Key Prometheus metric names
- Loki log search query
- Top 2-3 failure modes with **symptom → action**
- Owner role (links to Phase 0 / Phase 1 team) + escalation

Three jobs. ~15-18 fields. Not 50. Discipline.

---

## 3. The proposed schema (per component)

```javascript
{
  // ── IDENTITY (v6 has 3, add 3) ──
  name: 'Channel Gateway',
  layer: 'L0',
  phase: 'core',
  tag: '',                            // existing — MCP, gateway, etc.
  sub_en: 'one brain → many surfaces',
  sub_tr: 'tek beyin → çok yüzey',

  // ── PURPOSE (v5 had EN; add TR) ──
  desc_en: 'Central normalisation and routing service...',
  desc_tr: 'Merkezi normalleştirme ve yönlendirme servisi...',

  // ── DEPLOY (v5 had; add bilingual notes + resources) ──
  deploy: {
    image: 'custom Python FastAPI service',
    install: 'pip install fastapi uvicorn redis',
    resources: '500m CPU · 512Mi RAM · 2 replicas',     // NEW — capacity planning
    note_en: 'Exposes channel-specific webhook endpoints. Stateless.',
    note_tr: 'Kanal-özel webhook uç noktaları açar. Durumsuz.'
  },

  // ── CONFIG (v5 had; bilingualise the "n" field) ──
  config: [
    { k: 'LANGGRAPH_URL',  v: 'http://langgraph:8001',
      n_en: 'LangGraph agent service', n_tr: 'LangGraph ajan servisi' },
    { k: 'REDIS_URL', v: 'redis://redis:6379',
      n_en: 'Session state store', n_tr: 'Oturum durumu deposu' },
    /* secrets via Vault, never raw — denoted v: '<vault:path>' */
  ],

  // ── OPERATIONS (NEW — beyond v5) ──
  ops: {
    health: 'GET /health → {"status":"ok","redis":"connected"}',
    metrics: 'GET /metrics (Prometheus, port 9090)',
    log_query: '{service="channel-gateway"} | json | level="error"',
    trace: 'Langfuse: channel.{name}.inbound'
  },

  // ── INTEGRATION SAMPLE (NEW — copy-paste) ──
  sample: {
    lang: 'bash',
    code: 'curl -X POST http://channel-gateway:8000/webhook/whatsapp \\\n  -H "X-Hub-Signature-256: sha256=..." \\\n  -d \'{"from":"...","text":"..."}\''
  },

  // ── FAILURE MODES (NEW — runbook tier) ──
  errors: [
    { symptom_en: 'Webhook returns 502', symptom_tr: 'Webhook 502 döner',
      action_en: 'Check LangGraph readiness (kubectl get pod langgraph). Restart gateway only if LangGraph healthy.',
      action_tr: 'LangGraph hazırlığını kontrol et (kubectl get pod langgraph). Yalnızca LangGraph sağlıklıysa gateway\'i yeniden başlat.' },
    { symptom_en: 'Voice messages silently dropped',
      action_en: 'Inspect Whisper STT logs; Channel Gateway proxies but does not log payloads.' }
  ],

  // ── OWNERSHIP (NEW — connects to team) ──
  owner: 'Backend',                          // links to EROLE in v6
  repo: 'agbuilder-platform/channel-gateway',

  // ── IMPLEMENTATION NOTES (v5 had EN; add TR) ──
  notes_en: 'Single entry point for ALL user interactions. Enforces tenant isolation at the boundary, rate-limits per channel...',
  notes_tr: 'TÜM kullanıcı etkileşimleri için tek giriş noktası. Sınırda kiracı izolasyonunu uygular, kanal başına hız sınırlar...'
}
```

**Field count: 18 named fields. Of those, 11 restored from v5, 7 net-new.**
Each field is small. Total record size: ~1-2 KB per component. 67 components × 2 KB ≈ 130 KB added to the SSoT file. Acceptable.

---

## 4. Beyond v5 — the brilliance

Five ideas that turn this from "better docs" into a **developer companion**.

### 4.1 Bidirectional cross-linking
Every connection in the inline detail row (S2b) shows the FROM and TO
component names. Make them **clickable**. Click → opens that component's
cookbook panel. Now: from any connection a developer is investigating,
they reach both endpoints' full deploy/config/runbook in one click. The
doc becomes a navigable graph instead of a list.

### 4.2 Copy-paste samples (the "in 30 seconds" rule)
Every outbound connection includes ONE working sample. Bash / Python /
TypeScript — pick the most natural per component. A new developer should
be able to integrate with any component in **30 seconds from opening
this panel**. No "see the docs at..." → those don't exist yet.

```bash
# Outbound LangGraph → LiteLLM
curl -X POST http://litellm:4000/v1/chat/completions \
  -H "Authorization: Bearer $LITELLM_KEY" \
  -d '{"model":"sonnet-4.6","messages":[{"role":"user","content":"..."}]}'
```

### 4.3 Symptom → action runbook entries
Most architecture docs say what works. Real value is in saying what
**doesn't** and what to do. Two failure modes per non-trivial component is
all it takes — bilingually authored, indexed by symptom. When something
breaks at 3 AM, the operator searches the symptom in the live SSoT and
gets the action.

### 4.4 Owner role → live team mapping
Phase 1 plan already defines EROLE colours (Backend, DevOps, AI Eng,
Data Eng, Frontend) with engineer-hour budgets. Tag every component with
its owning role. Hover → see who's responsible. This connects the
**architecture** doc to the **execution** plan in v6 — they currently
live in separate tabs.

### 4.5 The "first 5 minutes" view
A new engineer joining the team. They open Channel Gateway in the SSoT.
The panel renders **in priority order**: sub → desc → sample (with copy
button) → deploy.image → config table → owner. Everything else collapses
into expandable sections. The cookbook respects attention budget.

---

## 5. What this is NOT

- Not API reference documentation (Swagger / OpenAPI lives separately)
- Not a replacement for source repo READMEs (links there)
- Not runbooks in detail (high-signal symptom→action entries only)
- Not a chat / Q&A interface — static cookbook, no LLM in the loop
- Not Revolutionize-internal (that's separate — see §7)

---

## 6. Phased delivery — three real options

| Stage | What it delivers | Effort | Value |
|---|---|---|---|
| **S2c** | Restore v5 fields, add TR + owner + repo. Render in S2 panel. | M (data extract + render rewrite) | **80% of cookbook** |
| **S2d** | Add ops + sample + errors fields. Render in expanded S2 panel. Cross-link from S2b inline rows. | M-L (mostly authoring, no v5 source) | The "beyond v5" tier |
| **S2e** | Same treatment for Revolutionize systems (RSYS) + Rev connections. | M | Rev coverage |

**Option A — Minimum viable cookbook (S2c only)**
- ~1 week real-time, mostly data extraction from v5
- Bilingual TR for prose fields
- Restores v5 + adds owner + repo
- **Recommendation if** you want fastest path to "no longer embarrassing"

**Option B — Real cookbook (S2c + S2d)**
- ~2-3 weeks real-time
- Includes the ops/sample/errors tier — the parts that make it a *tool*, not a *doc*
- Cross-linking + copy-paste samples land
- **Recommendation if** you want this to be a daily-use developer tool

**Option C — Full programme (S2c + S2d + S2e)**
- ~3-4 weeks real-time
- Covers EAIP + Revolutionize
- **Recommendation if** you want the SSoT to be the single thing engineers open every morning

All three slot **between S2b and S3** in the migration plan — they don't
disturb S6/S7 (which still flip the tabs to render the SSoT).

---

## 7. Open questions before I write a stage prompt

I need your call on each:

**Q1 — Scope:** Option A, B, or C?

**Q2 — Sample language:** When a component has multiple natural integration languages (e.g. LangGraph: Python SDK + REST), pick ONE per component for the sample, or show a tabbed switcher?
- One per component → smaller, faster, ships sooner
- Tabbed switcher → richer, slower to author, more UI complexity

**Q3 — Failure modes coverage:** Author for every component, or only "non-trivial" ones (skip pure external adapters like SAP / Salesforce)?
- All 67 → ~2-3 days authoring
- Non-trivial only (~40) → ~1.5 days

**Q4 — Revolutionize coverage:** Same depth as EAIP, or lighter (since Rev components are mostly agent classes, not deployable services)?
- Rev agents aren't "deployed" in the same sense — they're prompts + tools + spec
- I'd argue for a **different schema** for Rev components, not the same one

**Q5 — Where to source the v5 → v6 TR translations from?**
- I author them (you review) — fastest
- You author them (I draft EN) — most accurate
- External translator — best quality, slowest
- Note: v5 was EN only. There is no TR to extract; it's net-new work.

---

## 8. What I'm going to do if you say "Option B, defaults on everything"

1. Write **S2c** prompt: data extraction from v5 + TR authoring + render the
   restored v5 fields in an enhanced S2 panel. Acceptance criteria include
   bilingual diff review per component.
2. Write **S2d** prompt: author the ops/sample/errors/owner/repo fields
   per component. Render in the panel. Add cross-linking from S2b inline
   rows. Acceptance: every component has a working sample, two failure
   modes, an owner.
3. **Defer** S2e (Revolutionize) — propose separately once EAIP is solid.
4. Update `MIGRATION_PLAN_single_source.md` to insert S2c + S2d between
   S2b and S3, and update S6 acceptance criteria to verify the rich
   panel renders inside DocumentFrame.

---

## 9. A note on discipline

The strongest temptation right now is to add **everything** — owner +
SLO + cost + sensitivity + RPO + repo + readiness + locality + ...

I've cut that list deliberately. Each added field is a 67-row maintenance
burden bilingually. The fields proposed in §3 pass a test: **a working
developer will use them this month**. Anything that fails that test is a
roadmap item, not a stage item.

If you want fields I cut — SLO, cost, data sensitivity, local-dev parity —
say so and I'll add them with eyes open about the authoring cost.

---

## 10. Decision

Reply with: **A / B / C** + answers to Q2, Q3, Q4, Q5 (defaults are fine).
I'll write the first stage prompt the same session.
