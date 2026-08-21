# CWF — PHASE UI-STAGES-1 — StagesDashboard v1
**claude-code-PHASE-UI-STAGES-1-stages-dashboard-v1 · v1 · 2026-07-11 · Architect: Claude**

---

## 0 · MISSION (read fully before touching anything)

Build the read-only **"Aşamalar / Stages"** admin tab: a pedagogical, deep-linked map of
the agent turn pipeline — one pre-pipeline card (**00 Kota Kapısı**) + the **14 stages**
(01 Kullanıcı Sorgusu → 14 Bellek Güncelleme). Also flip the admin panel's **default
landing tab from `'rules'` to `'users'`** (owner Karar 1).

The owner has FINAL-GO'd a pixel-level mockup (`cwf-stages-dashboard-mockup-v2.html`,
archived project-side). **This prompt embeds everything you need verbatim** — the stage
registry data (§A1), the UI chrome strings (§A2), and the layout contract (§A3). You do
NOT need the mockup file. **Transplant the embedded copy byte-faithfully; do not
paraphrase, "improve", or translate it.**

This phase is **pure client + shared code**: zero new API routes, zero DB migrations,
zero governed-table writes, zero eval-gate contact, zero new npm dependencies. No
Operator door.

---

## 1 · HARD PRE-FLIGHT (gate 0 — STOP on any mismatch)

```bash
cd /tmp && rm -rf cwf_yaprak && git clone --quiet https://github.com/maymun207/cwf_yaprak.git
cd cwf_yaprak && git rev-parse origin/master
```
- MUST print `67e35d59f442b0e17367f294e16dd732cf10712a`. If master has moved past this,
  **STOP and report the new hash** — do not build on an unreviewed floor.
- `npm ci --no-audit --no-fund --silent` then `npx vitest run --reporter=dot 2>&1 | tail -5`
  → MUST report **1975 tests / 187 files, all green**. (If the container time limit bites,
  shard: `--shard=1/2` then `--shard=2/2` and sum.)
- Locate and run the repo's living-doc **drift gate** the way `package.json` defines it —
  grep the `scripts` block; do NOT guess an invocation (S32-1). It MUST pass `[OK]` at
  the floor before you start.
- Read these files fully before writing code:
  `src/components/admin/adminTabs.ts` · `src/components/admin/AdminPanel.tsx` ·
  `src/components/admin/InspectTab.tsx` (the `ObservabilityConfig` fetch + `traceUrl`
  pattern) · `api/cwf/_lib/observability/config.ts` (span-name constants) ·
  `api/cwf/_lib/turn/pipeline.ts` (`TURN_STAGES` names) · `e2e/rule26-admin.spec.ts` ·
  `src/components/admin/adminUi.tsx` (existing primitives) · the living-doc/KB files the
  drift gate maps (so you know what a UI-tab addition must update).
- Branch: `git checkout -b feature/ui-stages-1`. **Push the branch and REPORT — do NOT
  merge.** Merge happens only after the Architect's RULE-25 review, with a merge message
  the Architect will provide verbatim (S30-2).

---

## 2 · BINDING CONSTRAINTS (violating any one = phase failure)

- **C-1 Read-only page.** The Stages tab renders and navigates; it never mutates
  anything. No POST/PUT/DELETE from this tab; no new API routes anywhere in this phase.
- **C-2 Diff scope is frozen.** `git diff --stat 67e35d5..HEAD` may touch ONLY:
  `src/components/admin/**` (new `StagesTab.tsx`, new `stagesRegistry.ts`, `adminTabs.ts`,
  `AdminPanel.tsx`, tests), `e2e/rule26-admin.spec.ts`, the Vite config (ONLY for the
  build-SHA define, C-8), and the living-doc/KB files the drift gate requires. NOTHING
  under `api/**`, `shared/**` (read-only imports are fine, edits are not),
  `supabase/**`, or `package.json` dependencies. No new npm packages.
- **C-3 Tab identity.** Add `'stages'` to the `TABS` whitelist in `adminTabs.ts` — the
  `Tab` union derives automatically. Nav entry in `AdminPanel.tsx`:
  `{ id: 'stages', section: 'documents', label: t('Aşamalar', 'Stages'), icon: Workflow, show: true }`
  positioned **between** the `architecture` and `docs` entries (mockup order:
  Mimari · Aşamalar · Kılavuzlar). `Workflow` from `lucide-react` (already a dependency).
- **C-4 Landing default (Karar 1).** In `resolveInitialTab`: the documented default AND
  the `catch` fallback both become `'users'` (currently `'rules'`). Update the docblock
  precedence text. The `?scopeBackend=` → `'replay'` jump is PRESERVED. Update the
  existing `adminTabs.test.ts` assertions that pin `'rules'` — these are INTENDED test
  edits; list them in your report.
- **C-5 Registry is the single source.** All page content lives in a new typed
  `src/components/admin/stagesRegistry.ts` (data embedded in §A1 — transplant verbatim).
  `StagesTab.tsx` renders ONLY from the registry; no copy strings inside the component
  beyond §A2 chrome. The `tab` field of a source target is typed as `Tab` imported from
  `adminTabs.ts` — a dead deep-link must be a TYPE error.
- **C-6 In-app navigation.** Deep-link chips navigate via the SAME mechanism the sidebar
  uses (the panel's tab-switch handler + URL `?tab=` update) — no full page reloads, no
  new permission logic. If a user lands on a tab their capabilities gate, the target
  tab's EXISTING guards govern; you build nothing there.
- **C-7 Langfuse chips (span-true, config-gated).** Reuse the EXACT
  `ObservabilityConfig{langfuseHost, langfuseProjectId}` fetch that `InspectTab.tsx`
  uses (same endpoint/helper — factor a small shared hook if cleaner). When
  `!configured`, chips render NOTHING (InspectTab's guard pattern). Chip URL builder:
  primary pattern `${host}/project/${projectId}/observations?name=<encoded span>` **only
  if you can verify that URL/filter shape against current Langfuse docs**; otherwise fall
  back to `${host}/project/${projectId}/traces` and keep the span name visible in the
  chip (as the mockup shows) so it is copy-usable. Unit-test the builder for: configured
  host (trailing-slash trimmed, name encoded), unconfigured → null. **Report which URL
  pattern you shipped and your source for it.** Chips appear ONLY on stages whose
  `spans[]` is non-empty (§A1) — never invent a span.
- **C-8 Code links pinned to the deployed SHA.** Every source with a `codePath` renders
  an `‹/›` link → `https://github.com/maymun207/cwf_yaprak/blob/<sha>/<codePath>`.
  `<sha>` = the build-time commit: inject `process.env.VERCEL_GIT_COMMIT_SHA` into the
  client via a Vite `define` (e.g. `__BUILD_SHA__`); when absent (local dev) fall back to
  `master` AND render a small `master` label on the link (the mockup's pinned promise
  must never silently lie). Unit-test both branches of the URL builder.
- **C-9 Registry integrity tests (the anti-drift teeth).** New test file(s) MUST assert:
  (a) the registry has EXACTLY 15 entries, `no` values `'00'`–`'14'` in order;
  (b) every source `tab` target is in `TABS` (type-checked, but assert at runtime too);
  (c) every `codePath` EXISTS on disk relative to repo root (`fs.existsSync`);
  (d) every span name in every `spans[]` is a member of the set exported by
  `api/cwf/_lib/observability/config.ts` **unioned with** the `TURN_STAGES` names from
  `api/cwf/_lib/turn/pipeline.ts` prefixed with `STAGE_SPAN_PREFIX` — import BOTH in the
  TEST ONLY (tests run in Node; the client bundle must NOT import server modules);
  (e) `resolveInitialTab('')` === `'users'` and `resolveInitialTab('?tab=stages')` ===
  `'stages'`.
- **C-10 Mockup meta is excluded.** The real page ships WITHOUT: the dark mockbar, the
  v1/v2 scope box, and the faded "v2 ÖRNEĞİ" badges on stage 10 (those were
  contract-explanation devices). Ship: title, subtitle, legend, the pipeline spine with
  15 cards (chips row · Ne yapar · Nasıl ayarlanır · sources table · "… daha fazla"
  expandable), and the short footer line (§A2).
- **C-11 Disclosure component.** "… daha fazla" is a native, accessible disclosure
  (`<details>/<summary>` or the repo's existing pattern if one exists) — closed by
  default, keyboard-operable, summary label swaps to "▴ gizle" when open. jsdom note:
  if click-toggling `<details>` is flaky in tests, assert content presence in the DOM +
  the `open` attribute after a programmatic toggle — do not fight jsdom.
- **C-12 RULE 26 coverage.** Extend `e2e/rule26-admin.spec.ts`: visit `?tab=stages` at
  1280 AND 1024, assert `document.documentElement.scrollWidth <= window.innerWidth`,
  **including a pass with every `<details>` forced open** (page-level `document
  .querySelectorAll('details').forEach(d => d.open = true)`), since expanded teaching
  blocks are the widest-content risk. Keep the existing seeded-kinds coverage untouched.
- **C-13 Living-doc lock-step.** Update the in-repo living doc/KB exactly the way the
  drift gate demands for a new admin tab + a landing-default change; expect a docVersion
  bump (rev 68 → 69) sealed per the repo's established pattern (two-commit seal if the
  mapping requires it — S34-1). Drift gate MUST end `[OK]`.
- **C-14 Floors ratchet.** Test count ends **> 1975** (report exact); coverage floors
  untouched or up; `npx tsc --noEmit` (or the repo's typecheck script per package.json)
  clean; ALL tests green at the end of EVERY sub-phase you close.
- **C-15 Language.** Stage CONTENT is Turkish-only in v1 (owner's onboarding audience);
  UI CHROME strings go through the existing `t('TR','EN')` helper (§A2 provides both).
  Do not machine-translate the stage content.

---

## A1 · EMBEDDED ARTIFACT — `stagesRegistry.ts` data (transplant VERBATIM)

Type shape (adjust naming to repo conventions, keep fields):

```ts
import type { Tab } from './adminTabs';

export type SourceKind = 'db' | 'code' | 'session' | 'live';
export interface StageSource {
    kind: SourceKind;
    name: string;            // mono-rendered
    sub?: string;            // small muted suffix, e.g. "(agent.param)"
    writes?: string;         // "✍️" | "✍️ LEARN"
    role: string;
    target: { tab: Tab } | { na: string };   // na = non-clickable label
    codePath?: string;       // repo-relative → ‹/› link (C-8)
}
export interface DeepPara { law: string; text: string; }
export interface StageEntry {
    no: string;              // '00'..'14'
    id: string;              // kebab, stable
    title: string;
    tag?: string;            // roleTag pill
    heart?: boolean;         // 09 only — "— kalp" accent
    pre?: boolean;           // 00 only — dashed pre-pipeline styling
    spans: string[];         // REAL span names only (C-7/C-9d)
    purpose: string;         // "Ne yapar"
    tweak: string;           // "Nasıl ayarlanır"
    sources: StageSource[];
    deep: DeepPara[];        // "… daha fazla" paragraphs
    try?: string;            // green "Dene:" callout
}
```

Data (all 15 entries — copy sentences EXACTLY, including `·`, quotes, and emphasis
markers; render `**bold**` as <b>, `` `code` `` as the mono chip):

```ts
export const STAGES: StageEntry[] = [
{ no:'00', id:'quota-gate', title:'Kota Kapısı', tag:"boru hattı öncesi — kodda stage '00'", pre:true, spans:[],
  purpose:'Turn başlamadan aylık token bütçesi rezerve edilir (reserve → clamp → settle). Bütçe biterse turn hiç başlamaz.',
  tweak:'Üç politika parametresi governed satırdır: `quota.chatMonthlyTokensDefault` · `quota.chatMinTurnTokens` · `quota.chatTurnCeiling`. Oturum kendi bütçesini genişletemez (`sessionTweakable:false`). Kullanıcı bazlı sıfırlama/istisna kota panelinden.',
  sources:[
   {kind:'db', name:'user_quotas', role:'Kullanıcı başına bütçe durumu', target:{tab:'quota'}},
   {kind:'db', name:'quota.*', sub:'(agent.param)', role:'Politika değerleri — kod default referans, DB override, reset mevcut', target:{tab:'rules'}, codePath:'api/cwf/_lib/knowledge/reference/agentParams.ts'},
   {kind:'code', name:'reserve-clamp-settle', role:'Harcama motoru — mekanik kilit', target:{na:'ayar yüzeyi yok'}},
  ],
  deep:[
   {law:'Neden boru hattı öncesi?', text:'Bütçe kontrolü prompt kurulmadan, tek bir token harcanmadan yapılır: önce tahmini maliyet **rezerve** edilir, gerçek kullanım **clamp**\'ten geçer, cevap bitince **settle** ile mahsuplaşılır. Böylece "önce harca sonra say" asla yaşanmaz.'},
   {law:'Güvenlik felsefesi', text:'`sessionTweakable:false` üç parametrede de bilinçlidir: bir oturumun kendi bütçesini genişletebilmesi = yetki yükseltme kapısı. Kota politikası yalnız kalıcı governed satırdan değişir; kişi-bazlı istisna ayrı ve audit\'li bir yüzeydir (QuotaPanel).'},
   {law:'İz', text:'Bu kademenin ayrı bir Langfuse span\'i yoktur (kapı, turn izinin dışındadır) — izi İncele\'deki kota kayıtlarıdır.'},
  ],
  try:'QuotaPanel\'de kendi kullanıcına düşük bir aylık override ver, bir turn at; İncele\'de reserve→settle satırlarını gör, sonra override\'ı kaldır.' },

{ no:'01', id:'user-query', title:'Kullanıcı Sorgusu', spans:['cwf.stage.telemetry-init','cwf.stage.lab-overlay'],
  purpose:'Sorgu ve (varsa) oturumluk deney bayrakları istek gövdesiyle girer; turn kaydı `telemetry_events`\'te başlar.',
  tweak:'Kalıcı ayar yüzeyi yok — bu kademe deney bayraklarının **taşıyıcısı**dır; bayraklar Ayarla\'da açılır, sunucu yetkilendirir. Örn. aynı soruyu `knowledgeSource=floor` ile sorup DB cevabıyla karşılaştır.',
  sources:[
   {kind:'db', name:'telemetry_events', writes:'✍️', role:'Turn kaydı başlar — salt-okunur izleme', target:{tab:'inspect'}},
   {kind:'session', name:'labMode bayrakları', role:'Oturumluk overlay girişi', target:{tab:'tweak'}, codePath:'api/cwf/_lib/labMode.ts'},
  ],
  deep:[
   {law:'Taşıyıcı katman', text:'Bu kademede karar alınmaz: bayraklar gövdeyle gelir, **yetki sunucuda** doğrulanır (capability: `LAB_TOGGLE_SESSION`). İstemcinin "ben yetkiliyim" demesi hiçbir şey açmaz — kapı her zaman sunucu tarafındadır.'},
   {law:'Tek turn kimliği (RULE 28)', text:'Turn\'ün OTel trace id\'si tek doğruluk kaynağıdır: log öneki, Langfuse trace\'i ve `telemetry_events.session_id` hepsi AYNI id\'den türer. İkinci bir per-turn id basmak yasaktır — üç yüzeyde aynı olayı bulabilmen bu kurala borçludur.'},
  ],
  try:'Ayarla\'da bir bayrak aç, bir soru sor; İncele\'de turn satırını bul, oradaki Langfuse linkiyle aynı turn\'ün span ağacına geç — üç yüzeyde tek id.' },

{ no:'02', id:'conversation-state', title:'Konuşma / Durum', spans:['cwf.stage.persistence-init'],
  purpose:'Kimlik, rol → capability çözümü, backend kapsamı ve konuşma geçmişi yüklenir.',
  tweak:'Davranış değişikliği = rol/kapsam ataması. Capability **kapıları** kodda tanımlıdır (`permissions.ts`) — atama veridir, kapı yapıdır.',
  sources:[
   {kind:'db', name:'auth.users · user_roles · user_backend_scopes', role:'Kimlik · rol→capability · backend kapsamı', target:{tab:'users'}},
   {kind:'db', name:'conversations · messages', role:'Geçmiş yükleme; replay specimen kaynağı', target:{tab:'replay'}},
   {kind:'code', name:'permissions.ts', role:'Capability kapıları — referans', target:{na:'yapı = kod'}, codePath:'shared/permissions.ts'},
  ],
  deep:[
   {law:'Capability-not-role', text:'Kod hiçbir yerde "admin mi?" diye sormaz; `hasPermission(CAP)` sorar. Rol yalnızca capability paketidir (`user_roles` satırı). Yeni bir yetki ihtiyacı = yeni capability (kod, yapı) + rol atamaları (veri) — rol adına dallanma yasaktır.'},
   {law:'Kapsam', text:'`user_backend_scopes` kullanıcının hangi backend\'leri görebileceğini belirler; 07\'deki araç filtresi buradan beslenir. `messages` ise çift görevlidir: geçmiş penceresi (05) ve ham araç sonuçlarıyla birlikte replay\'in **specimen** kaynağı.'},
   {law:'Sık hata', text:'"Bu kullanıcıya şu paneli açayım" diye rolü genişletmek. Doğrusu: gereken capability\'yi tanımla/ata; panel görünürlüğü kapıdan türesin.'},
  ] },

{ no:'03', id:'intent', title:'Niyet / Anlama', spans:[],
  purpose:'Sorgudan kategori çıkarımı: öğrenilmiş keyword→kategori eşlemesi (advisory) + statik keyword tabanı.',
  tweak:'Yanlış eşleme çoğunlukla **öğrenme**dir → Yönlendirme\'de görüntüle; Clear epoch\'u tazeler, taslak→yayın akışı nokta-atışı düzeltir. `CATEGORIES` kod floor\'udur (governance bilinçli ertelendi).',
  sources:[
   {kind:'db', name:'tool_category_cache', role:'Öğrenilmiş eşleme — görüntüle · Clear · taslak→yayın', target:{tab:'routing'}},
   {kind:'code', name:'CATEGORIES', role:'Statik taban — floor / referans', target:{na:'ertelendi (governance)'}, codePath:'api/cwf/_lib/toolCategories.ts'},
   {kind:'session', name:'routingBypass', role:'Bu katmanı oturumluk atla', target:{tab:'tweak'}},
  ],
  deep:[
   {law:'§7 yasası', text:'Öğrenme yalnız **bulmayı** iyileştirir (hangi araçlar aday), asla **bilmeyi** değil (doğruluk). Bu yüzden `tool_category_cache` advisory\'dir: en kötü ihtimalle araç geç bulunur; cevap YANLIŞLANMAZ.'},
   {law:'Epoch', text:'Clear silmez, **epoch\'u ilerletir**: cache anahtarı epoch içerir, eski öğrenmelerin tamamı tek hamlede geçersizleşir — satır satır temizlik derdi yok. Nokta-atışı düzeltme ise L4 taslak→yayın akışıdır: taslak kişiseldir, yayın super yetkisi ister (sandbox-parity).'},
   {law:'İz', text:'Bu katmanın ayrı bir span\'i yoktur — çıkarım 07\'nin `cwf.stage.register-tools` span\'i içinde koşar; oradaki çipten izle.'},
  ],
  try:'Yönlendirme\'de bir keyword\'ün öğrenilmiş eşlemesini bul; Ayarla\'da `routingBypass` ile aynı soruyu sor ve sunulan araç setinin değiştiğini Tekrar Oynat routing lens\'iyle karşılaştır.' },

{ no:'04', id:'planning', title:'Planlama / Ayrıştırma', spans:[],
  purpose:'Ayrı planlayıcı yok — planlama araç döngüsünde örtük. (LangGraph ertelendi.)',
  tweak:'Bugün ayar yüzeyi yok. Planlayıcı geldiğinde şablonlar aynı desenle doğacak: kod-referans + DB-versiyon + sandbox.',
  sources:[ {kind:'code', name:'—', role:'Ertelenmiş bağlayıcı', target:{na:'—'}} ],
  deep:[
   {law:'Neden boş?', text:'Erken planlayıcı = erken karmaşıklık. Model, araç döngüsü (11) içinde adım adım plan yapar; bugünkü görev karmaşıklığında bu yeterli ve ÖLÇÜLEBİLİR (her adım span\'li). Ayrı planlayıcı, gerçek bir çok-adımlı ihtiyaç kanıtlanınca gelir.'},
   {law:'Doğum kuralı', text:'Geldiği gün plan şablonları "önce kur sonra yönet" DEĞİL, doğuştan governed olacak: kod-referans (floor·seed·reset) + DB-versiyonlu değer + oturumluk sandbox önizleme — 06 ve 09\'un bugünkü deseninin birebir kopyası.'},
  ] },

{ no:'05', id:'memory-retrieval', title:'Bellek Getirme', spans:[],
  purpose:'Kısa vadeli bellek = `messages` son-N penceresi. Uzun vadeli kullanıcı belleği YOK (bilinen eksik; connector ertelendi).',
  tweak:'N governed parametredir: `agent.historyWindowN` — Kurallar\'da kalıcı değişir, Ayarla\'da oturumluk denenir, referansa reset mevcut. Örn. oturumlukta 4→12 yapıp bağlam etkisini Tekrar Oynat ile kıyasla.',
  sources:[
   {kind:'db', name:'agent.historyWindowN', sub:'(agent.param)', role:'Pencere boyu — kod default referans, DB override', target:{tab:'rules'}, codePath:'api/cwf/_lib/knowledge/reference/agentParams.ts'},
   {kind:'session', name:'oturumluk N', role:'Kalıcılaştırmadan dene', target:{tab:'tweak'}},
   {kind:'code', name:'messages son-N mekanizması', role:'Pencereyi kuran kod', target:{na:'mekanik'}},
  ],
  deep:[
   {law:'Tek zincir, tek clamp', text:'N\'in çözümü her param gibi TEK yoldan geçer: **lab > DB-yayın > kod floor**, ve HER kaynak aynı `[min,max]` clamp\'inden. Zehirli bir DB satırı da, aşırı bir oturumluk değer de aynı kapıda kırpılır — dağınık `??` zincirleri bu yolda yasaktır (OBS-3.1 dersi).'},
   {law:'Denge', text:'Büyük N = daha çok bağlam + daha çok token + eski konuların sızması; küçük N = ucuz ama unutkan. Doğru değer görev tipine bağlıdır — bu yüzden N kodda gömülü değil, governed satırdır.'},
   {law:'İz', text:'Ayrı span yok — pencere kurulumu model hazırlığının içindedir; etkisini iki turn\'ü Tekrar Oynat\'ta yan yana koyarak görürsün.'},
  ],
  try:'Ayarla\'da N\'i 4\'e indir, çok-turlu bir konuşmada eski bir detayı sor; sonra 12 ile tekrarla. Farkı replay\'de karşılaştır.' },

{ no:'06', id:'knowledge', title:'Bilgi / RAG', spans:['cwf.warm.knowledge'],
  purpose:'Governed bilgi = runtime tek doğruluk kaynağı: `domain_rules` (warm→read), yapı sözleşmesi `rule_kinds` (CORE Zod-kilitli / SOFT esnek), kesinti tabanı `referenceSchema` — DB çökse de empty≠zero ayakta.',
  tweak:'Bilgi değişikliği = Kurallar\'da taslak → kapı → yayın (rollback\'li; kapı atlanamaz). Risksiz deneme: taslağı Ayarla\'da `previewDrafts` ile yalnız kendi oturumunda gör.',
  sources:[
   {kind:'db', name:'domain_rules · rule_versions', role:'Governed bilgi — taslak→kapı→yayın→rollback', target:{tab:'rules'}},
   {kind:'db', name:'rule_kinds · kind_drafts', role:'Yapı sözleşmesi; lab önizleme taslakları', target:{tab:'kinds'}},
   {kind:'code', name:'referenceSchema', role:'Floor · seed · "referansa sıfırla" hedefi', target:{na:'reset hedefi (Türler\'den)'}, codePath:'api/cwf/_lib/knowledge/reference/referenceData.ts'},
   {kind:'session', name:'knowledgeSource · previewDrafts', role:'Oturumluk floor/db anahtarı; taslak önizleme', target:{tab:'tweak'}},
  ],
  deep:[
   {law:'Altın desen (DB-first / code-floor)', text:'Runtime tek doğruluk kaynağı governed DB\'dir; kod referansının tam ÜÇ rolü vardır: seed · reset hedefi · kesinti tabanı. Supabase çökse bile ajan bilgi-kör kalmaz — empty≠zero kesintiye dayanır. Bu deseni tersine çevirmek (kod-primary, DB opsiyonel) YASAKTIR.'},
   {law:'Zehirlenme savunması', text:'CORE kind\'ların ŞEKLİ Zod\'a kilitlidir (yapı zehirlenemez); DEĞERLER DB\'de ama yalnız sunucu-taraflı eval-gate\'ten (şema→referans→davranış) geçerek yayınlanır — RLS, istemcinin doğrudan publish\'ini reddeder. Yanlış giden yayın rollback\'lenir; en kötü gün "referansa sıfırla" vardır.'},
   {law:'kind_drafts', text:'yalnız lab önizlemede okunur — üretim yolu bu tabloyu GÖREMEZ. Taslağın sızma riski yapısal olarak sıfırdır.'},
  ],
  try:'SOFT bir kind\'da taslak oluştur, Ayarla\'da `previewDrafts` ile yalnız kendi oturumunda gör, yayınlamadan sil — üretim hiçbir şey fark etmez.' },

{ no:'07', id:'tool-select', title:'Araç Seçimi', spans:['cwf.stage.register-tools','cwf.stage.resolve-mcp','cwf.mcp.discover'],
  purpose:'Kategoriden sunulan-set\'e; epoch tazeliği; kullanıcı kapsam filtresi; `ALWAYS_INCLUDE` availability floor — boş araç seti yapısal olarak imkânsız.',
  tweak:'"Araç sunulmadı" şüphesi → Yönlendirme lens\'i `calledButNotOffered`. Bağlantı/token sorunu → MCP Sunucuları. Kapsam → Kullanıcı Yönetimi. Floor lab\'da bile düşürülemez.',
  sources:[
   {kind:'db', name:'tool_category_cache · routing_cache_meta', role:'Sunulan-set + epoch (Clear = epoch bump)', target:{tab:'routing'}},
   {kind:'db', name:'mcp_settings · mcp_secrets · mcp_global_settings', role:'Backend bağlantı + token çözümü (secret maskeli)', target:{tab:'mcp'}},
   {kind:'db', name:'user_backend_scopes', role:'Kapsam filtresi (scopeTools)', target:{tab:'users'}},
   {kind:'code', name:'ALWAYS_INCLUDE', role:'Availability floor — referans', target:{na:'ertelendi (union-floor)'}, codePath:'api/cwf/_lib/toolCategories.ts'},
   {kind:'session', name:'routingBypass', role:'Tam araç seti (OEE parity)', target:{tab:'tweak'}},
  ],
  deep:[
   {law:'Sunulan-set nasıl doğar?', text:'kategori adayları → kullanıcı kapsam filtresi (`scopeTools`) → `ALWAYS_INCLUDE` birleşimi. Floor\'un anlamı: liste ne kadar kötü öğrenilirse öğrenilsin sunulan set asla boşalamaz — güvence disiplinde değil, TASARIMDADIR (lab bile düşüremez).'},
   {law:'calledButNotOffered', text:'Routing lens\'inin en değerli sinyali: model, sunulmayan bir aracı çağırmaya kalktıysa bu bir yönlendirme regresyonu KANITIDIR — tahmin değil, kayıtlı turn üzerinde deterministik tespit.'},
   {law:'Secret disiplini', text:'MCP token\'ları secret-by-reference\'tır: UI yalnız env-adı/maske görür; değer hiçbir yüzeye, log\'a, span\'e yazılmaz (ADR-007).'},
  ],
  try:'Yönlendirme\'de Clear ile epoch\'u ilerlet; aynı soruyu tekrar sor ve `cwf.stage.register-tools` span\'inde sunulan-set farkını izle.' },

{ no:'08', id:'compression', title:'Sıkıştırma', spans:[],
  purpose:'`resultStore` büyük araç sonuçlarını handle ile boşaltır; ajan ham yığını değil sorgu araçlarını kullanır. Özetleme YOK — bilinçli stub.',
  tweak:'Bugün governed kolu yok — eşikler kodda. Governed eşik satırları + feature-flag\'li özetleyici birlikte ertelendi (tetik: prod\'da ilk gerçek bağlam taşması).',
  sources:[
   {kind:'code', name:'resultStore', role:'Offload mekanizması; eşikler kodda', target:{na:'ertelendi (eşikler + özetleyici)'}, codePath:'api/cwf/_lib/resultStore.ts'},
  ],
  deep:[
   {law:'Neden özet yok?', text:'Erken özetleme = sessiz bilgi kaybı riski. Bunun yerine büyük sonuç bir **handle** alır; ajan `query_records` / `aggregate_records` ile ham veriye DETERMİNİSTİK erişir — "özetin doğruluğu" diye yeni bir güven sorunu doğmaz.'},
   {law:'Geleceğin şekli', text:'Özetleyici geldiğinde feature-flag\'li, versiyonlu bir yetenek olacak (sessiz davranış değişikliği değil) ve eşikleri governed L1 satırlarına taşınacak. İkisi birlikte ertelendi; tetik: prod\'da ilk gerçek bağlam taşması. Ayrı span yok — offload izleri İncele log\'unda görünür.'},
  ] },

{ no:'09', id:'prompt-assembly', title:'Prompt Birleştirme', heart:true, spans:['cwf.stage.assemble-prompt','cwf.warm.prompt'],
  purpose:'20 enum-kilitli çekirdek segment (kimlik · güvenlik · format · araç-protokolü) + backend domain pack\'leri tek sistem promptunda birleşir. Segment **metni** governed\'dır (`prompt.segment` satırları: taslak > DB-yayın > kod floor); dizilim **motoru** koddur.',
  tweak:'Metin değişikliği = Kurallar\'da `prompt.segment` taslak→yayın (golden-canary korumalı, rollback\'li). Yayın öncesi taslağı Ayarla\'da yalnız kendi oturumunda dene. Kademeli yüzde yayın → Aşamalı Yayın.',
  sources:[
   {kind:'db', name:'prompt.segment (20 segment)', role:'Kimlik/güvenlik/format/araç metinleri — versiyonlu değer', target:{tab:'rules'}, codePath:'api/cwf/_lib/prompt/core/segmentIds.ts'},
   {kind:'db', name:'domain_rules (pack içeriği)', role:'Backend bilgi değerleri prompt\'a dizilir', target:{tab:'rules'}},
   {kind:'db', name:'aday dilim yayını', role:'Segment adayını %\'lik dilimle yay; guardrail korur', target:{tab:'rollout'}},
   {kind:'code', name:'dizilim motoru (assemble)', role:'Birleştirme motoru — mekanik', target:{na:'mekanik'}, codePath:'api/cwf/_lib/prompt/assemble.ts'},
   {kind:'session', name:'previewDrafts', role:'Taslağı oturumunda önizle', target:{tab:'tweak'}},
  ],
  deep:[
   {law:'Yapı/değer ayrımı', text:'Segment **id seti** yapıdır — 20 id `segmentIds.ts`\'te enum-kilitlidir; yeni segment = kod işi. Segment **metni** değerdir — DB-versiyonlu, gated, rollback\'li; kod metni referans (seed·floor·reset). Kimlik ve güvenlik metinleri bile bu desendedir — ama güvenlik alanının "floor\'un altına inememesi" eval-gate probuyla ayrıca kilitlidir.'},
   {law:'Golden-canary (L3)', text:'Bir prompt.segment yayını, işaretli altın specimen\'lerde lens koşusunu geçmeden yayınlanamaz: "bu metin değişikliği hangi eski doğru cevabı bozar?" sorusu yayından ÖNCE, deterministik olarak cevaplanır.'},
   {law:'promptRev damgası', text:'Her turn hangi yayın revizyonuyla koştuğunu üzerine yazar — "atıfsız yaşam döngüsü olmaz." Injection sınırı motor-kilididir: araç içeriği system prompt\'a ASLA girmez (yapısal test).'},
  ],
  try:'Bir segment taslağı yaz, `previewDrafts` ile kendi oturumunda gör; sonra Aşamalı Yayın\'da %0\'lık aday olarak sahnele ve yayınlamadan geri çek — tüm adımlar audit\'te.' },

{ no:'10', id:'llm-inference', title:'LLM Çıkarımı', spans:['cwf.stage.resolve-provider','cwf.stream.attempt','cwf.warm.params'],
  purpose:'TEK gateway (`streamText`) — provider/model çözümü `llm_providers` **satırından**; model sıcaklığı governed parametre.',
  tweak:'Provider ekle/değiştir = Sağlayıcılar\'da satır işlemi (anahtar maskeli, secret-by-reference). `agent.temperature` → Kurallar\'da kalıcı; Ayarla\'da oturumluk `forceProvider` / sıcaklık denemesi. Kişisel provider = Personal bölümü.',
  sources:[
   {kind:'db', name:'llm_providers (+personal +secrets)', role:'Provider/model satırları; anahtarlar maskeli', target:{tab:'providers'}},
   {kind:'db', name:'agent.temperature', sub:'(agent.param)', role:'Model sıcaklığı — kod default referans, DB override', target:{tab:'rules'}, codePath:'api/cwf/_lib/knowledge/reference/agentParams.ts'},
   {kind:'code', name:'tek gateway', role:'streamText tek çağrı noktası — mekanik', target:{na:'mekanik'}},
   {kind:'session', name:'forceProvider', role:'Oturumluk provider pin\'i', target:{tab:'tweak'}},
  ],
  deep:[
   {law:'Tek gateway yasası', text:'`streamText` TEK çağrı noktasıdır: her provider aynı kapıdan geçer, telemetri yalnız orada açılır. Yeni bir model eklemek migration değil, bilinen bir aile içinde governed bir SATIRDIR; bilinmeyen aile kodda hata fırlatır (yapı işi).'},
   {law:'Boş completion floor\'u', text:'Boş/anormal cevap asla boş ekran olmaz: dürüst mesaj + sınırlı AYNI-provider yeniden deneme. Cross-provider takas yasaktır — hata anında sessizce model değiştirmek, ölçülemeyen bir davranış değişikliğidir.'},
   {law:'Kişisel provider', text:'Sahibine RLS-kilitlidir; anahtar secret-by-reference. Replay, kişisel provider\'la koşabilir — üretim trafiğine dokunmadan A/B karşılaştırması yaparsın.'},
  ],
  try:'Ayarla\'da `forceProvider` ile aynı soruyu iki provider\'a sor; iki turn\'ün `cwf.stream.attempt` span\'lerini Langfuse\'da yan yana incele (token, gecikme, sonuç).' },

{ no:'11', id:'tool-loop', title:'Araç Döngüsü', spans:['cwf.mcp.tool','cwf.mcp.attempt'],
  purpose:'`executeMCPTool` canlı ARMES/Superset çağrıları yapar — cevabın asıl **içeriği hiçbir tabloda değildir**, backend\'lerden canlı gelir. Her çağrı telemetriye yazılır; ham sonuçlar replay için saklanır.',
  tweak:'Bağlantı/token = MCP Sunucuları. İçerik ayarlanmaz — ilke: tablolar çerçeveyi verir (ne bilir · neye güvenir · nasıl konuşur), backend\'ler içeriği verir.',
  sources:[
   {kind:'db', name:'mcp_settings · mcp_secrets', role:'Bağlantı + token çözümü (server-side)', target:{tab:'mcp'}},
   {kind:'db', name:'telemetry_events', writes:'✍️', role:'tool_call kayıtları', target:{tab:'inspect'}},
   {kind:'live', name:'canlı backend sonuçları', role:'Cevabın içeriği — tabloda değil', target:{na:'n/a'}},
  ],
  deep:[
   {law:'Çerçeve/içerik ayrımı', text:'Bu platformun kalp taşlarından biri: governed tablolar ajanın NE bileceğini, NEYE güveneceğini, NASIL konuşacağını belirler; ham İÇERİK her turn canlı MCP\'den gelir. Bu yüzden "cevabı düzelt" diye bir tablo aramazsın — çerçeveyi düzeltirsin (06/09/12), içerik backend\'in sorumluluğudur.'},
   {law:'Replay hammaddesi', text:'Her çağrının ham sonucu `messages.raw_tool_results`\'a yazılır — replay\'in girdisi HER ZAMAN budur; redakte edilmiş telemetri asla girdi olmaz. Her deneme `cwf.mcp.attempt` span\'idir: yeniden denemeler, süreler, boyutlar iz ağacında tek tek görünür.'},
  ],
  try:'Bir OEE sorusu sor; Langfuse\'da `cwf.mcp.tool` span\'ini aç — hangi backend, hangi araç, kaç ms, sonuç boyutu. Sonra aynı turn\'ü İncele\'deki tool_call satırıyla eşleştir (tek id).' },

{ no:'12', id:'verification', title:'Doğrulama', spans:['cwf.grounding','cwf.stage.warm-trust'],
  purpose:'Deterministik motor `groundingCheck.ts`: empty≠zero · sayı · uydurma · kapsam-sapması (LLM-yargıç YASAK). Güven katmanı: `backends` (tier) + `backend_authority` (metrik yetki haritası); kod floor\'u `backendTrust.ts`.',
  tweak:'Tier/yetki değişikliği = Backend Güveni\'nde grant/revoke (audit\'li). Motor mekanik kilitli — ayar yüzeyi yok; **ölçüm** yüzeyi üç lens (Tekrar Oynat).',
  sources:[
   {kind:'db', name:'backends · backend_authority', role:'Trust tier + yetki haritası — grant/revoke', target:{tab:'trust'}},
   {kind:'code', name:'backendTrust.ts', role:'Trust floor · seed · reset referansı', target:{na:'referans'}, codePath:'api/cwf/_lib/knowledge/reference/backendTrust.ts'},
   {kind:'code', name:'groundingCheck.ts', role:'Doğrulama motoru — mekanik kilit', target:{na:'mekanik'}, codePath:'api/cwf/_lib/grounding/groundingCheck.ts'},
   {kind:'session', name:'üç lens (grounding · routing · scope)', role:'Kural değişikliğinin etkisini geçmiş turn\'lerde kanıtla', target:{tab:'replay'}},
  ],
  deep:[
   {law:'Deterministik güven tezi (ADR-001)', text:'Yalan söyleyen ya da yanılan bir backend\'i DÜRÜST yapmaya çalışmayız — **ZARARSIZ** yaparız: çıktısı kontrol altında, kaynağına atıflı, gerekirse karantinada. Doğrulama asla bir modelin kanaati değildir; LLM-yargıç runtime\'da yasaktır.'},
   {law:'empty≠zero kalibrasyonu', text:'İhlal, boşluğu MİKTAR SIFIR olarak sunmaktır ("0 adet üretildi"); boş sonuç için "veri yok" demek İTAATTİR. Bu ayrım S36\'da bir gerçek hatayla bilendi: kapı, kendi önerdiği "No data was returned" cümlesine ceza kesiyordu — kalibrasyon numeric-zero-only\'ye çekildi.'},
   {law:'Üç lens ↔ üç aile', text:'Grounding→`domain_rules`, Routing→`tool_category_cache`, Scope/Authority→`backend_authority`. `authorityDiff`, bir grant flip\'inin hangi GEÇMİŞ cevapları değiştireceğini token harcamadan kanıtlar.'},
  ],
  try:'Tekrar Oynat\'ta bir specimen seç, scope lens\'ini @floor ve @live eksenlerinde koştur; Backend Güveni\'nde tek bir grant\'i değiştirsen verdiktin nasıl döneceğini `authorityDiff` ile gör.' },

{ no:'13', id:'format-render', title:'Biçim / Sunum', spans:[],
  purpose:'real-0 = veri · missing = boşluk · empty = "veri yok" ayrımı + empty-guard: boş cevap asla boş ekran olmaz (mekanik floor).',
  tweak:'**Davranış** mekanik floor\'dur; kullanıcıya görünen guard/format **metinleri** `prompt.segment` kapsamında versiyonlu değerdir → Kurallar.',
  sources:[
   {kind:'code', name:'outputFormat + FROM-TOOL + empty-guard', role:'Sunum floor\'u — mekanik', target:{na:'mekanik'}, codePath:'api/cwf/_lib/prompt/core/outputFormat.ts'},
   {kind:'db', name:'guard/format metin segmentleri', role:'Kullanıcıya görünen dil — versiyonlu değer', target:{tab:'rules'}},
  ],
  deep:[
   {law:'Dörtlü ayrım', text:'Sunum katmanı dört durumu ASLA karıştırmaz: gerçek 0 = veridir (çiz) · missing = boşluktur (boş bırak) · empty = "veri yok" de · sayısal olmayan = çizilemez. Grafik makroları bu ayrımı korur; replay scorer\'ı da aynı ayrımı puanlar — üretimle ölçüm aynı dili konuşur.'},
   {law:'Davranış/dil ayrımı', text:'"Boş asla boş ekran olmaz" DAVRANIŞTIR (mekanik floor, dokunulmaz); kullanıcının o anda okuduğu cümle DİLDİR (governed metin, versiyonlu, rollback\'li). Ton değişikliği istiyorsan davranışı değil sözcükleri değiştirirsin. Ayrı span yok — sunum, akış span\'lerinin içindedir.'},
  ] },

{ no:'14', id:'memory-update', title:'Bellek Güncelleme', spans:['cwf.flush'],
  purpose:'Turn kalıcılaşır (`conversations` / `messages`, ham araç sonuçları dâhil — bir SONRAKİ replay\'in specimen\'i burada doğar). Sistemin tek öğrenmesi: routing LEARN yazımı (**bulma**, asla **bilme**). Kapanış telemetrisi yazılır.',
  tweak:'Öğrenileni gör → düzelt → geri al = Yönlendirme (Clear nokta-atışı geri alır; taslak→yayın kalıcılaştırır). Persist mekaniktir.',
  sources:[
   {kind:'db', name:'conversations · messages', writes:'✍️', role:'Turn persist — specimen kaynağı', target:{tab:'replay'}},
   {kind:'db', name:'tool_category_cache', writes:'✍️ LEARN', role:'Öğrenilenler — floor↔live farkı tam budur', target:{tab:'routing'}},
   {kind:'db', name:'telemetry_events', writes:'✍️', role:'Kapanış kayıtları', target:{tab:'inspect'}},
  ],
  deep:[
   {law:'C1 yasası', text:'`messages` tablosuna YALNIZ canlı turn yazar; replay ve governance yolları bu tabloya ASLA yazamaz. Deney, hammaddesini kirletemez — replay\'in girdisi hep temiz kayıttır.'},
   {law:'Versiyon damgaları', text:'Kapanışta turn, hangi prompt-rev / param-rev / dilim ile koştuğunu üzerine yazar. Bu damgalar denetlenebilir yaşam döngüsünün çekirdeğidir: bir hafta sonra "bu cevap hangi konfigürasyonun ürünü?" sorusunun tek doğru cevabı buradadır.'},
   {law:'Tek öğrenme', text:'Sistemin öğrendiği TEK şey routing eşlemesidir — floor↔live farkı lens\'te birebir görünür, Clear tek hamlede geri alır. "Model zamanla bilgi öğrenir" diye bir mekanizma YOKTUR; bilgi yalnız 06\'nın gated yolundan değişir.'},
  ],
  try:'Bir turn at, Yönlendirme\'de az önce yazılan LEARN satırını bul; Tekrar Oynat routing lens\'inde floor↔live farkında aynı satırı gör, sonra Clear ile geri al.' },
];
```

---

## A2 · EMBEDDED ARTIFACT — UI chrome strings (via `t('TR','EN')`)

- Page title: `t('Ajan Boru Hattı — 14 Kademe', 'Agent Pipeline — 14 Stages')`
- Subtitle (TR only body, EN mirror allowed short):
  `Bir turn'ün baştan sona geçtiği kademeler, her kademenin görevi ve **ayar kolları**. Kaynak adına tıklamak seni o kolun düzenlendiği yüzeye, ‹/› tam kaynak koduna, Langfuse çipi o kademenin gerçek izlerine götürür. Sayfa hiçbir şeyi kendisi DEĞİŞTİRMEZ — harita + kapı + ders.`
- Legend chips: `🗄️ DB tablosu / governed satır` · `🧱 kod — floor · mekanik · referans` ·
  `🔬 oturumluk deney (Ayarla)` · `✍️ bu kademede yazılır` · `◔ Langfuse span'i`
- Sources table headers: `t('Kaynak','Source')` · `t('Rolü','Role')` · `t('Ayar yüzeyi','Tweak surface')`
- Block labels: `NE YAPAR` · `NASIL AYARLANIR` (small-caps style per mockup)
- Disclosure labels: closed `… daha fazla` / open `▴ gizle` (t-wrapped: `'… more'` / `'▴ hide'`)
- "Dene:" callout prefix: `Dene:` (t: `'Try:'`)
- Deep-link chip trailing hint: the mono `?tab=<id>` text + `→` (as mockup)
- Footer (single line): `Bu sayfa salt-okunurdur — harita ve kapı açar, hiçbir şeyi değiştirmez. ‹/› linkleri dağıtımdaki commit'e pinlidir.` (t-wrapped EN mirror allowed)

## A3 · LAYOUT CONTRACT (from mockup-v2 — match, using theme tokens)

Vertical spine rail on the left of the card column; circular numbered nodes (`00` dashed);
cards: 1px `--border`, radius `--radius`, subtle shadow; `00` card dashed;
chips row (Langfuse) directly under the title; two labeled blocks; sources table;
`v2` demo badges DO NOT ship (C-10); `…daha fazla` at card bottom above nothing else.
Session-scoped chips (`kind:'session'`) use the `--session` accent; Langfuse chips a
distinct teal accent; `writes` markers in `--warning`. Use existing `adminUi.tsx`
primitives where they fit; do not fork the theme. RULE 26 at 1280/1024 (C-12).

---

## 3 · GATED SUB-PHASES (close each with green tests before the next)

- **A — Tab identity + landing.** `adminTabs.ts` (`'stages'` + default `'users'`) +
  intended test edits + AdminPanel nav entry. Evidence: `adminTabs.test.ts` green with
  new assertions pasted.
- **B — Registry + integrity tests.** `stagesRegistry.ts` (verbatim A1) + C-9 test suite.
  Evidence: the five C-9 assertions listed with their pass lines.
- **C — StagesTab component.** Render from registry per A3; wire into AdminPanel; RTL
  smoke (15 nodes render; a details toggles; chips absent when spans empty).
- **D — Langfuse + code-link builders.** C-7/C-8 builders + unit tests; report the
  shipped Langfuse URL pattern + source.
- **E — rule26 extension.** C-12; paste the spec diff + local reasoning (CI proves run).
- **F — Living-doc seal.** C-13; drift gate `[OK]`; docVersion line pasted.
- **G — Full self-verify + push.** Full suite (shard if needed) — total MUST exceed 1975;
  typecheck clean; `git push -u origin feature/ui-stages-1`; REPORT (no merge).

## 4 · REPORT FORMAT (paste literally)

1. `git rev-parse origin/master` at start + your branch tip hash.
2. Full-suite summary line(s) (tests/files) at floor AND at finish.
3. `git diff --stat 67e35d5..HEAD` (must satisfy C-2).
4. The five C-9 evidence lines; the C-7 URL pattern + source; C-8 both-branch test names.
5. docVersion line + drift-gate `[OK]` output.
6. List of INTENDED test edits (C-4).
7. Any deviation, however small, flagged loudly at the top.

*Architect will fresh-clone review (RULE-25), then issue the merge instruction with the
verbatim `--no-ff` message.*

<!-- END · claude-code-PHASE-UI-STAGES-1-stages-dashboard-v1 · v1 · 2026-07-11 -->
