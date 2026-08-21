# CWF — Wave 2 · Design Note 1/3: CONTENT VOICE, DOCS BRIDGE & NAMING

<!-- cwf-wave2-content-voice-design-v1_2 · rev 1.2 · 2026-07-13 · Session 39.
     S37-1 AMENDMENT of v1 (presented → immutable; this is a NEW version, not an edit).
     WHAT CHANGED v1 → v1.2 — one decision, one consequence:
       (1) §4 naming table: the `tweak` rename is DECIDED by the owner —
           "Sandbox Ortamı / Session Sandbox" (v1 proposed "Oturum Denemesi"). LOCKED.
       (2) §4.1 (new) + §5: the TR label "Sandbox Ortamı" does NOT carry the session-scoped
           meaning that the EN "Session Sandbox" does — so the persistence semantics become a
           MANDATORY primer sentence, and a required test assertion. Nothing else moved.
     Code floor: origin/master 7f6aeb3 · 2073/205 · rev 70.
     Siblings (not this note's scope): #2 Tweak/Sandbox IA (F23) · #3 Rules split (F46+F26). -->

---

## 0 · WHAT THIS NOTE OWNS (and what it does not)

**Owns: the WORDS, the LINKS, the NAMES.**
- The voice doctrine every teaching surface must obey, and the *mechanical gate* that enforces it.
- The User-Docs bridge (F16/F22) — its type contract, its doc set, its arrival pattern (F42).
- The renames (F33/F45/**tweak**) and the `?tab=` id decision (G2).
- The panel-copy explainer inventory (F7/F8/F17/F18/F24/F30/F34/F40) and the F38 grounding visual.
- The extra-depth content briefs for stages 07/09/10/11/12.

**Does NOT own (deliberately deferred to notes 2 and 3):**
- The Sandbox panel's *layout* regrouping by stage → note #2 (F23).
- Rules' *structure* split, the publish-flow three-place problem, the persistent backend-slice
  label, draft-filter visibility, archived-row rendering (F49) → note #3 (F46/F26 + S38 case).

The split is deliberate: **this note changes text and links; it must not need a layout decision
to land.** That keeps `WAVE2-CONTENT-1` shippable independently of the two IA phases.

---

## 1 · DIAGNOSIS (why the first attempt failed)

StagesDashboard v1 was written by the Architect, in the Architect's voice, for a reader who
already holds the system's internal vocabulary. It reads like a *specification index*: it names
the law (`§7`, `OBS-3.1 dersi`, `RULE-N`), names the table, opens a gate — and stops. The owner's
verdict after walking all 14 stages: *"beni bir yere getiriyor; ne yapacağım, neyi bekleyeceğim —
bilmiyorum,"* and at stage 12: *"senden başka kimse kullanamaz bunu."*

The failure is not that the content is *wrong*. It is that **it answers the question "what is
this?" and never the question "what do I do, and what will I see?"** A specification answers the
first. A teacher answers both, in that order, and then gets out of the way.

S38 turned this from an opinion into evidence: the owner — **super_admin, the system's designer,
the person who commissioned every one of these panels** — could not complete a single rule publish
without three stalls. If *he* stalls, the copy is not "a bit dry." It is not usable.

**The trap this note must avoid:** rewriting 15 stage cards + a dozen panels in one pass *without
first fixing what "good" means* is the F13 mistake repeated at scale. So the voice contract and
its enforcement gate land in the SAME phase as the first rewritten cards — never after.

---

## 2 · THE VOICE CONTRACT

### 2.1 · The four-beat card (mandatory order)

Every teaching surface — stage card, panel primer, `InlineHelp` box, arrival strip — answers these
in this order. Missing beat 3 is the v1 defect and is now a review-blocker.

| # | Beat | The question it answers | Rule |
|---|---|---|---|
| 1 | **Ne yapar** | What happens here, in the *user's* world (a question gets answered, a number gets checked) — not the system's world (a stage executes). | Active, present, concrete. One real factory example, always. |
| 2 | **Ne olursa ne olur** | If you change this, what visibly changes — and what breaks if you get it wrong. | Consequence, not capability. |
| 3 | **Sen ne yapacaksın** | The concrete next action: *where you go, what you click, what you will see when you get there.* | **Mandatory.** No deep-link may exist without it (F14/F19). |
| 4 | **Neden böyle** *(optional, "… daha fazla")* | The law behind it. | The **only** place an internal identifier may appear — and only in parentheses, after the idea has been said in human words. |

### 2.2 · The seven writing rules

1. **İkinci tekil şahıs, şimdiki zaman, etken çatı.** "Ajan aracı bulur, bilmez." — not "araç
   seçimi gerçekleştirilir."
2. **Hiçbir iç isim taşıyıcı olamaz.** `§7`, `RULE-N`, `ADR-00N`, `OBS-3.1`, `L1..L5`, faz adları,
   commit SHA'ları, ham tablo adları — beat 1–3'te **yasak**; beat 4'te yalnızca parantez içinde
   ve insan diliyle açıklandıktan sonra.
3. **Her jargon ilk geçtiği yerde açılır.** "empty≠zero — yani 'veri yok', asla '0' diye
   gösterilmez."
4. **Varışsız link yok** (F42 deseni): her deep-link hedefi *neden buradasın + şimdi ne yap*
   şeridiyle karşılar. Replay'in Trust'tan gelen şeridi zaten çalışıyor ve owner beğendi — o
   referans desen, her hedefe kopyalanır.
5. **Boş görünen durum yasak** (F34): "ertelendi" tek başına bir kullanıcı durumu değildir —
   ya ne olduğu ve ne zaman geleceği yazılır, ya satır gösterilmez.
6. **Yakalama, hata gibi görünemez** (F38): sistem bir backend'i "boşluğu sıfır diye sunarken"
   yakaladıysa bu **iyi** bir olaydır. Kırmızı alarm değil, kalkan/"yakalandı" görseli + insan
   cümlesi: *"Sistem, verisi olmayan bir sonucu '0' diye göstermeye çalışan bir kaynağı durdurdu.
   Cevabın doğru kaldı."*
7. **Her soyut iddia bir gerçek örnek taşır.** IKINCILUST barkodsuz → "ARMES'te görünmüyor",
   asla "sıfır". OEE, hurda, fırın hattı: örnekler fabrikadan gelir, kurgudan değil.

### 2.3 · The gate that makes it stick — `voiceGate.test.ts` (deterministic, AG-buildable)

Doctrine that lives only in a design note decays. This one gets teeth, in the project's own idiom
(mechanical enforcement, not judgment):

- **Scope:** `stagesRegistry.ts` content fields (`purpose`, `tweak`, `sources[].role`, `try`,
  `deep[].text`) + the admin copy strings passed to `InlineHelp` / `PanelPrimer`.
- **FORBIDDEN in beats 1–3** (`purpose`, `tweak`, `role`, `try`): `/§\d/`, `/\bRULE[-\s]?\d+/i`,
  `/\bADR-\d{3}/`, `/\bOBS-\d/`, `/\bL[1-5]\b/`, `/\bS3\d-\d/`, `/\b[0-9a-f]{7,40}\b/` (SHA),
  known phase names.
- **ALLOWED in beat 4** (`deep[].text`) **only inside parentheses** — a match outside a `(...)`
  span fails. Deterministic, no judgment call.
- **Bridge is a TYPE, not a memory:** `StageEntry` gains a **required** `docs: { slug: DocSlug;
  anchor?: string }` field, where `DocSlug` is derived from `DOCS_REGISTRY` — exactly mirroring
  the existing `target: { tab: Tab }` discipline (a dead deep-link is already a *compile error*,
  UI-STAGES-1 C-5). A card without a doc link will not typecheck.
- **Beat-3 presence:** every `StageSource` with a `target: {tab}` must have a non-empty `role`
  (already true) **and** the stage must carry a `try` string — the "what you'll do there" beat.
  Enforced in the same test.
- **§4.1 assertion** (new in rev 1.2): the Sandbox panel's primer copy MUST contain the
  session-scoped sentence. Pinned as a string assertion, not a style opinion.

> This is the automation-first move: the voice rules become a *test*, the docs bridge becomes a
> *type*. Neither can be forgotten by a future author (including me).

### 2.4 · Language decision

Stage content stays **Turkish-only** in Wave 2 (UI-STAGES-1 C-15 carries). Panels keep their
existing `t(tr, en)` pairs where they already have them. Rationale: doubling the writing cost buys
nothing today — the entire user population is Turkish-speaking. English is a later, mechanical
pass over a *frozen* Turkish source, not a parallel authoring burden.

---

## 3 · THE USER-DOCS BRIDGE (F16 / F22)

### 3.1 · What already exists (verified in code, not assumed)

- `src/components/docs/DocsReader.tsx` renders repo-shipped `.md` at `/docs/:slug`, with a section
  rail, a breadcrumb, an auto-generated ToC, and **heading anchors** (`slugify()` produces the same
  id for the rendered heading and the ToC entry). **Anchor deep-links work today.**
- `src/docs/registry.ts` — *"the ONLY place a new user doc is declared. A future doc = one `.md`
  drop under `public/docs/` + one row here."*
- Current registry content: **exactly one doc** (`microscope-replay`).

So the bridge does not need new machinery. It needs **content** plus **one required field**.

### 3.2 · The doc set to author (six docs, one voice, this order)

| # | slug | Title (TR) | What it must teach | Feeds |
|---|---|---|---|---|
| 1 | `nasil-calisir` | Bir soru nasıl cevaplanır — 14 aşama | The turn, end to end, for a human. The spine every stage card links back to. | all stages |
| 2 | `turler-ve-kurallar` | Türler ve Kurallar | **Kinds = structure, Rules = instances** (Excel: Kinds = sütun başlıkları/tipler, Rules = satırlar). Key vs payload. Kind→backend kalıtımı. Taslak→yayın→yürürlük→arşiv yaşam döngüsü. | 09, Rules, Kinds |
| 3 | `arac-eslemesi` | Araç Eşleme | The learned map. "Model bilmez, bulur." Why a wrong match is recoverable and a wrong *fact* is not. | 03, 07, Routing |
| 4 | `veri-otoritesi` | Veri Otoritesi | Per-backend authority (system_of_record vs reporting_mirror), empty≠zero, what a grounding *catch* means. | 07, 12, Trust |
| 5 | `mikroskop-tekrar-oynatma` | Mikroskop — Tekrar Oynatma | **EXISTS** (`cwf-governance-replay-explained-v1.md`) — re-voiced against §2, not rewritten. | 12, Replay |
| 6 | `sandbox-ve-yayin` | Sandbox ve Aşamalı Yayın | **Session overlay vs governed row** (the §4.1 semantics, in long form) · the active fingerprint · what a staged rollout actually does. | 05, 10, Sandbox, Rollouts |

Doc #2 is the highest-value single artifact in Wave 2: **every one of the four explanations the
owner personally needed on the S38 evening lives in it** (key vs payload · kind→backend inheritance
· backend slices · publish lifecycle). That evening's transcript is its outline — S38-L8.

### 3.3 · The two-way rule

- **Card → doc:** every stage card carries `docs` (type-enforced, §2.3).
- **Panel → doc:** every panel primer ends with one link — *"📖 Bunu anlamak için: <doc>"*.
- **Doc → panel:** every doc section that describes an action ends with the deep-link back
  (`?tab=…`), so reading and doing are one loop, not two silos.

---

## 4 · NAMING (F33 / F45 / tweak + the standing test)

**The test (standing Wave-2 rule):** *"What image does this name leave in a HUMAN's head?"* A
technically-correct name that evokes the wrong concept is a **defect**, not a preference.

| Tab id (unchanged) | Now | → New label | Why the old name fails the test |
|---|---|---|---|
| `routing` | Yönlendirme / Routing | **Araç Eşleme / Tool Matching** | "Route" evokes signal-switching / network paths. The real function is a learned *query → tool-category map*. (F33, owner-agreed) |
| `trust` | Backend Güveni / Backend Trust | **Veri Otoritesi / Data Authority** | "Trust" evokes keys, certificates, network security. The real function is *which backend's numbers are authoritative vs a mirror* — the panel's own title already says "authoritative metric registry." (F45, owner-agreed) |
| `tweak` | Ayarla / Tweak | **Sandbox Ortamı / Session Sandbox** — **LOCKED (owner, 2026-07-13)** | "Ayarla" promises a **persistent setting**. The panel is a *session-only overlay* that vanishes when the session ends — precisely the misreading a governed system cannot afford. |

Names that PASS the test and stay: `stages` (Aşamalar) · `inspect` (İncele) · `users` · `quota` ·
`rollout` · `architecture` · `mcp` · `providers`. `kinds`/`rules` keep their names — their problem
is *order and explanation*, not naming (note #3, F26).

**Mechanism:** `tabLabel()` in `adminTabs.ts` is already the single source of truth for every
visible tab name (STAGES-FIX-3 F20 made both the sidebar and the Stages chips call it). **Each
rename is a one-line `switch` case change.** Nothing else moves.

**Gate G2 — DECIDED: the `?tab=` ids STAY.** `routing`, `trust`, `tweak` remain the URL ids.
Rationale: the ids are load-bearing in `stagesRegistry` targets, deep-links, tests, and the
`resolveInitialTab` whitelist; migrating them buys zero user value and breaks every existing link.
Labels are the human surface; ids are the machine surface. (This resolves plan v2's G2.)

### 4.1 · The residue the label does not carry (new in rev 1.2)

The whole reason `tweak` is renamed is that "Ayarla" promised **persistence**. The chosen label
solves half the problem: **"Sandbox" carries *safe place to try things*, but the Turkish label
drops the *session-scoped* meaning that the English "Session Sandbox" keeps.** A user who reads
only "Sandbox Ortamı" can still believe his change persists.

So the missing semantics move from the *label* into the *copy*, where they become testable. The
Sandbox panel primer MUST say, in substance:

> **"Buradaki değişiklikler yalnız bu oturumda yaşar.** Sekmeyi kapattığında kaybolur — ajanın
> kalıcı davranışı değişmez. Bir ayarı kalıcı hale getirmek istiyorsan, Kurallar'da governed bir
> satır olarak yayınlaman gerekir → *(link)*."

Three bindings follow, all cheap:
1. **Primer copy** as above (WAVE2-CONTENT-1).
2. **A test assertion** that the primer contains the session-scoped sentence (§2.3) — so a future
   copy edit cannot quietly delete it.
3. **The exit ramp**: the primer's link is the *sandbox → governed row* path, which is exactly the
   lesson doc #6 teaches. Trying something and then making it real must be one visible road.

---

## 5 · PANEL-COPY INVENTORY (the explainers)

Each row = one surface, one sentence it must land. All obey §2.

| F | Surface | The one thing it must say |
|---|---|---|
| **F38** | Inspect / grounding events | A grounding catch is the system **working**, not failing — shield icon, not red alarm. Copy per §2.2 rule 7. |
| **§4.1** | **Sandbox (ex-Tweak) primer** | **Changes here live only in this session; making one permanent means publishing a governed rule.** (Test-pinned.) |
| F7 | Rules — payload editor | What the payload *is* for this kind, shown as a template from the kind's own field spec (no new endpoint; the client already holds `field_spec`). |
| F8 | Kinds — schema | The same lever, seen from the structure side: this is the shape every instance must fill. |
| F17 | `system` backend | It is **not a data source**. It is the parameter lane (`SYSTEM_BACKEND_ID`) where the agent's own settings live. |
| F18 | Users — row actions | Add the missing cross-action: *"bu kullanıcının kotasını ayarla"* → Quota. |
| F24 | Sandbox — "Active fingerprint" | This is the visible face of the auditable lifecycle: the exact prompt/params/knowledge this answer was produced with. |
| F30 | archive / rollback / "running now" / 🗑 | High-risk production actions. Explain what each does to the **live agent**, and confirm before firing. |
| F34 | ALWAYS_INCLUDE "availability floor" | Never show a bare "ertelendi." Say what it will be and what happens meanwhile. |
| F40 | Stage 11 — tool loop | The agent's live hands: bounded rounds, every call recorded. |

---

## 6 · EXTRA-DEPTH BRIEFS (stages 07 · 09 · 10 · 11 · 12)

These five carry the system's trust-critical ideas. Each card must land ONE thesis sentence; the
"… daha fazla" paragraph earns the rest.

- **07 · Araç Seçimi** — *"Model araçları bilmez; bulur."* The candidate set = learned map + your
  scope + the always-included floor. Getting the *match* wrong is recoverable; getting a *fact*
  wrong is not. (The owner named this the trust-critical concept himself.)
- **09 · Prompt Kurulumu** — the agent's knowledge is **20 governed segments**, not code. You can
  change what it knows without a deployment — and every change is versioned, gated, reversible.
- **10 · Çıkarım** — one gateway, one call site. A blank answer is never shown blank: honest
  message, bounded same-provider retry, never a silent swap.
- **11 · Araç Döngüsü** — the agent's live hands. Bounded (max rounds), and every call is recorded
  and replayable.
- **12 · Doğrulama** — the verifier is **deterministic code, never an AI judging an AI**. Its goal
  is not to make a lying backend honest — it is to make it **harmless**: contained, attributed,
  quarantinable. A catch is a good day (see F38).

---

## 7 · WHAT THIS FEEDS (phases, ceremony, budget)

| Phase | Scope | Profile |
|---|---|---|
| **WAVE2-CONTENT-1** | `stagesRegistry.ts` rewrite (15 cards, §2 voice) · **required `docs` field** + `DocSlug` type · **`voiceGate.test.ts`** (incl. the §4.1 assertion) · the three renames in `tabLabel()` (G2: ids stay) · panel explainers §5 · F38 visual + copy · CHANGELOG entry in-branch | **FULL** (multi-file, client-only) |
| **WAVE2-DOCS-1** | The six docs (§3.2) + registry rows + panel "📖 read this" links + arrival strips on every deep-link target (F42 pattern) | **FULL** |

**Budget finding (verified this session, not assumed):** the doc-drift manifest maps **only**
`api/**`, `shared/**`, `vercel.json` — **`src/**` is not drift-mapped.** Both phases are
client-only ⇒ **no reseal, no `docVersion` bump, S34-1 does not fire.** The drift gate stays `[OK]`
for free. (If a phase later touches `api/**`, the reseal budget returns — check, don't assume.)

**Footguns for the phase prompts:** `adminLegibility.test.ts` auto-generates 2 tests per admin
`.tsx` (test count moves on any new admin component) · jsdom has no `scrollIntoView` (stub) ·
Radix `ScrollArea` needs a column-flex parent · PR-fires-CI: CI green on the PR head is the merge
precondition (S37-2 — sharded ≠ CI).

---

## 8 · ACCEPTANCE (how we know Wave-2 content worked)

Not "the copy reads better." Three falsifiable tests:

1. **The stranger test.** A person who has never seen CWF reads the stage-07 card and can say, in
   one sentence, (a) what happens there and (b) what they would change and where. If they cannot,
   the card failed.
2. **The gate is green.** `voiceGate.test.ts` passes — no internal identifier outside a
   parenthesis, every card has a doc link, every card has a beat-3, and the Sandbox primer still
   carries its session-scoped sentence.
3. **The owner re-walk 00→14** produces a findings-v5 that is **short** — and contains no instance
   of *"beni bir yere getiriyor, ne yapacağımı bilmiyorum."* That sentence is the metric.

---

## 9 · OPEN — carried to notes #2 and #3 (do not solve here)

- Sandbox (ex-Tweak) layout regrouping by stage (F23) → **note #2**.
- Rules split (F46), Kinds→Rules order (F26), the publish-flow three-place problem, the persistent
  backend-slice label, draft-filter visibility, and **F49** (archived rows still render a
  cross-backend kind group in the wrong slice — seen live on 2026-07-13) → **note #3**.

<!-- END · cwf-wave2-content-voice-design-v1_2 · rev 1.2 · 2026-07-13 -->
