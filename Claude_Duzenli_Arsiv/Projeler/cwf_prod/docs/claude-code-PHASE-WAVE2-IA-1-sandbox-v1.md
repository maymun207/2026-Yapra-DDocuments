# PHASE `WAVE2-IA-1` · SANDBOX — the levers regroup by stage; the stage becomes a TYPE

<!-- claude-code-PHASE-WAVE2-IA-1-sandbox-v1 · rev 1 · 2026-07-13 · Session 40.
     Author: Architect. Executor: AG (Claude Code / AntiGravity).
     Design note (binding): cwf-wave2-sandbox-ia-design-v1 (owns F23; minted F50/F51).
     Sibling already SHIPPED: WAVE2-CONTENT-1 (e93906c) — it carried the tab rename and the
     primer sentence. THIS PHASE MUST NOT REDO EITHER.
     Code floor: origin/master e93906c · 2123 tests / 208 files · docVersion rev 70 · drift [OK].
     Ceremony: FULL (multi-file). Client-only ⇒ NO reseal, NO docVersion bump. -->

---

## 0 · PRE-FLIGHT GATE

```bash
cd /tmp && rm -rf cwf_yaprak && git clone --quiet https://github.com/maymun207/cwf_yaprak.git
cd cwf_yaprak
git rev-parse origin/master        # MUST equal e93906c90206493a662b221e0889e0b8d5db9afd
npm ci --no-audit --no-fund --silent
npx tsx scripts/checkDocDrift.ts   # MUST print [OK] (rev 70)
npx vitest run --reporter=dot      # MUST be 2123 passed / 208 files
```

Plus one grep (design note §7 asked for it — the F50 sweep):

```bash
grep -rnE '<Stage n="|stage=.{1,3}0[0-9]' src/ | grep -v stagesRegistry
```
Expected: hits **only** in `TweakTab.tsx` (7 of them). If a hand-written stage number turns up in
another panel, **report it — do not fix it here** (that is a new finding, not this phase's scope).

Any disagreement with the four numbers above: **STOP and report.**

---

## 1 · WHY THIS PHASE EXISTS

Sandbox is seven identical-looking switches in one flat list. Three problems, one root:

**F50 — four of the five hand-written stage chips are WRONG.** `routingBypass` is tagged `06` but
it skips the **tool filter** (stage `07`). `knowledgeSource` is tagged `05` but choosing DB-vs-floor
**is** the knowledge stage (`06`). `previewDrafts` says `05·08` (`08` is compression — unrelated).
`forceProvider` says `09` but it picks the *model*, not the prompt (`10`). `rawToolData` says `12`
but it changes what is **rendered**, not what is **verified** (`13`). The two correct chips are
correct precisely because they are *not* hand-written: they come from the server
(`agentParams.ts`: temperature `stage:'10'`, historyWindowN `stage:'05'`).

> **The lesson that shapes this phase:** the tags were *prose*, so they rotted. The moment stage
> becomes the **grouping key**, a wrong tag stops being cosmetic and becomes a **structural lie** —
> the user learns "07 = Araç Seçimi" in Stages, then finds the tool-filter lever filed under 06.
> **So F23 is not "regroup by stage." It is "make the stage a typed, server-pinned fact, THEN
> regroup."** Do these in that order.

**F51 — three different animals wearing one costume.** `rawToolData` never leaves the browser.
Four flags are session-only server behaviour with **deliberately no publish path**. Two are
overrides of **governed rows that exist in Rules right now**. A user cannot tell them apart, so he
cannot answer the only question that matters after a good experiment: *"I liked that — how do I
keep it?"*

**F24 — the fingerprint is buried.** It sits under seven switches. It is not a footnote: **it is
the baseline you are about to perturb.** It goes to the top.

---

## 2 · BINDING CONSTRAINTS

1. **S39-2 — master ONLY via a reviewed PR.** Branch → PR (that fires CI) → Architect's verbatim
   merge message. Never push to master.
2. **CLIENT-ONLY.** Only `src/**` may change. `git diff --name-only e93906c..HEAD -- api shared
   supabase scripts vercel.json public` must be **EMPTY**. The *test* may import `api/**` (that
   precedent exists: `stagesRegistry.test.ts` imports server span modules); **the bundle may not.**
3. **NO NEW LEVER. Not one.** This is layout, labels, links, and types. The "flags off ⇒ request
   path byte-identical" invariant and the server's `authorizeLab` allow-list are safety properties —
   you are not touching either.
4. **NO persistence.** No `localStorage`, no "save my sandbox". The moment sandbox state persists it
   stops being a sandbox and the byte-identical invariant becomes a lie.
5. **DO NOT touch `tabLabel()`.** The `tweak` → "Sandbox Ortamı / Session Sandbox" rename **already
   shipped** in WAVE2-CONTENT-1. A rename landing twice is a conflict.
6. **DO NOT touch the primer sentence.** `TweakTab`'s primer already carries the session-scoped
   sentence and `voiceGate.test.ts` (B3) already pins it. You may *add* the exit-ramp line (§3.4);
   you may not remove or reword the pinned sentence. If your edit breaks the B3 pin, you edited the
   wrong string.
7. **No new endpoint, no new server field, no migration.** The class-C exit ramp reuses the exact
   mechanism `KindsTab` already uses (`onOpenRules(kindId)` — `AdminPanel.tsx:314`).
8. **CHANGELOG entry in-branch**, same PR.
9. `sandboxLevers.ts` is a **`.ts`** module, not `.tsx` — `adminLegibility.test.ts` auto-generates 2
   tests per admin **`.tsx`**, so this file must contribute **0** to that generator. If the count
   moves for that reason, you created the wrong file type.

---

## 3 · THE BUILD

### 3.1 · Sub-phase A — `src/components/admin/sandboxLevers.ts` (NEW, pure)

The single source of truth for the lever set, mirroring the `adminTabs.ts` / `stagesRegistry.ts` /
`navStack.ts` discipline.

```ts
import { STAGES } from './stagesRegistry';

export type StageNo = (typeof STAGES)[number]['no'];        // derived — never typed by hand
export type LeverClass = 'view' | 'session' | 'governed';   // F51: A · B · C

export interface SandboxLever {
    id: 'knowledgeSource' | 'previewDrafts' | 'routingBypass' | 'forceProvider'
      | 'temperature' | 'historyWindow' | 'rawToolData';
    stage: StageNo;          // a non-existent stage is a COMPILE ERROR
    cls: LeverClass;
    labelTr: string;         // the HUMAN name — leads the row
    labelEn: string;
    whatTr: string;          // beat 1: what it does, in the user's world
    ifYouChangeTr: string;   // beat 2: what visibly changes / what it costs
    paramKey?: string;       // class 'governed' ONLY → the governed row the exit ramp points at
}

export const SANDBOX_LEVERS: readonly SandboxLever[] = [ /* §3.2, ordered by stage then id */ ];
```

`StageNo` is derived, so `STAGES[].no` widening to `string` would silently defeat the compile-time
check. **Guard it:** if `STAGES[].no` is typed `string` (not a literal union), state that in your
report and add the assertion test anyway (§3.5 pin 1 catches it at runtime). Do **not** change
`stagesRegistry.ts` to fix this — report instead.

### 3.2 · The lever table — transplant VERBATIM

Order: by stage, then as listed. `labelEn` is given; every other string is Turkish and final.

| # | id | stage | cls | labelTr / labelEn |
|---|---|---|---|---|
| 1 | `historyWindow` | `05` | `governed` | **Geçmiş penceresi** / History window |
| 2 | `knowledgeSource` | `06` | `session` | **Bilgi kaynağı — yayınlanan mı, kod tabanı mı?** / Knowledge source |
| 3 | `previewDrafts` | `06` | `session` | **Kendi taslaklarınla dene** / Preview your drafts |
| 4 | `routingBypass` | `07` | `session` | **Araç filtresini atla (tüm araçları ver)** / Skip the tool filter |
| 5 | `forceProvider` | `10` | `session` | **Sağlayıcıyı sabitle** / Pin the provider |
| 6 | `temperature` | `10` | `governed` | **Sıcaklık** / Temperature |
| 7 | `rawToolData` | `13` | `view` | **Ham araç verisini göster** / Show raw tool data |

`paramKey`: `historyWindow` → `agent.historyWindowN` · `temperature` → `agent.temperature`.
No other lever has a `paramKey`.

**`whatTr` / `ifYouChangeTr` (verbatim):**

```
historyWindow
  what:  'Modele, konuşmanın son kaç mesajının verileceğini belirler. Ajanın "peki ya dün?" sorusunu anlaması bu pencereden gelir.'
  if:    'Büyütürsen daha çok bağlam ama daha çok token — ve eski konular yeni cevaba sızmaya başlar. Küçültürsen ucuzlar ve unutkanlaşır.'

knowledgeSource
  what:  'Ajanın bu turda okuyacağı bilgi: yayınlanan governed dilim, ya da kod tabanı (yayın öncesi hâli).'
  if:    'Kod tabanını seçersen, yayınladığın kuralların gerçekten fark yaratıp yaratmadığını görürsün — ama tabanın kör noktaları da geri gelir.'

previewDrafts
  what:  'Henüz yayınlamadığın taslakları, yalnızca bu oturumda, yayınlanmış hâllerinin yerine kullanır.'
  if:    'Bir kuralı yayınlamadan önce etkisini görürsün. Üretim hiçbir şey fark etmez — kimse senin taslağını görmez.'

routingBypass
  what:  'Normalde ajana yalnızca sorunla ilgili araçlar verilir. Bunu açarsan tüm araç setini görür.'
  if:    'Cevap yavaşlar ve yanlış araç seçme ihtimali artar — ama filtrenin bir aracı haksız yere elediğini kanıtlamak için tam olarak bu gerekir.'

forceProvider
  what:  'Bu oturumun sorularını hangi modelin cevaplayacağını sabitler.'
  if:    'Aynı soruyu iki modele sorup yan yana koyabilirsin: hız, maliyet, doğruluk. Kimsenin ayarı değişmez.'

temperature
  what:  'Modelin ne kadar "serbest" cevap vereceğini belirler. Düşük = tekrarlanabilir; yüksek = çeşitli.'
  if:    'Yükseltirsen cevaplar çeşitlenir ama sayısal tutarlılık düşer. Burası fabrika verisi konuşan bir ajan — bu takas ucuz değildir.'

rawToolData
  what:  'Cevabın altında, araçların döndürdüğü ham veriyi gösterir.'
  if:    'Yalnızca senin ekranın değişir. Ajan hiçbir şey fark etmez — bu bir görünüm anahtarıdır, bir deney değil.'
```

### 3.3 · Sub-phase B — `TweakTab.tsx` reading order

Top → bottom, exactly:

1. **Primer** (existing, sentence untouched) **+ one added line**:
   `t('Buradaki hiçbir değişiklik kalıcı değildir. Bir denemeyi kalıcı yapmak istersen, governed bir kural yayınlarsın — governed kaldıraçlarda "Kalıcı yap →" düğmesi seni tam oraya götürür.', 'Nothing here is permanent. To keep an experiment, you publish a governed rule — the "Make it permanent →" button on governed levers takes you straight there.')`
2. **Aktif parmak izi — MOVES TO THE TOP** (the whole block, unchanged in content). Add one line
   above the hashes: `t('Şu an yürürlükte olan ayarlar — birazdan oynayacağın taban bu.', 'The settings in force right now — this is the baseline you are about to perturb.')`
3. **Invariant badges** (existing four, unchanged).
4. **The levers, GROUPED BY STAGE, in pipeline order** (`05 → 06 → 07 → 10 → 13`), rendered from
   `SANDBOX_LEVERS` — **no lever markup may hard-code a stage number any more.**
5. **Tüm bayrakları temizle** (unchanged).

**Group header** — number + canonical title, both read from `stagesRegistry` (never re-typed), with
a deep-link to that stage's card:

> **`07` · Araç Seçimi** — *(the stage's own one-line purpose, truncated)* → **Aşamayı oku**

The "Aşamayı oku" jump reuses the existing nav mechanism: an `onOpenStage(stageId)` prop on
`TweakTab`, wired in `AdminPanel.tsx` **exactly like** the `onOpenRules` wiring at `:314`
(`pushTo('stages', makeNavEntry('tweak', t, { scrollY: captureScrollY(mainRef.current) }))` plus the
existing stage-card scroll-restore state). **If that stage-card targeting state does not exist as
described, STOP and report** — do not invent a second navigation mechanism.

**Empty groups are not rendered — and you do not invent a lever to fill a stage.** A pipeline stage
with no session lever is a fact, not a hole.

### 3.4 · Sub-phase C — the class badges + the exit ramp (F51)

Every lever row carries a small class badge; the class decides what else it shows.

| cls | badge (TR / EN) | extra |
|---|---|---|
| `view` | `yalnız görünüm — ajan değişmez` / `view only — the agent does not change` | — |
| `session` | `oturumluk — kalıcı yapılamaz` / `session-only — cannot be made permanent` | on expand: `t('Bu bir deney kaldıracı. Yayın yolu bilerek yok — kalıcı bir deney, deney olmaktan çıkar.', 'This is an experiment lever. There is deliberately no publish path — a permanent experiment stops being an experiment.')` |
| `governed` | `governed` | **`Kalıcı yap →`** button + the published value already shown beside the override box (keep it) |

**`Kalıcı yap →`** = `onOpenRules(RULE_KIND.AGENT_PARAM)` — the constant is `'agent.param'`
(`shared/dbConstants.ts:396`; **import the constant, do not retype the string**). Wire `TweakTab`'s
`onOpenRules` prop in `AdminPanel.tsx` with the **same two lines** `KindsTab` uses: set the Rules
kind filter, then `pushTo('rules', makeNavEntry('tweak', …))`. Rules' existing arrival strip then
greets the user — no new strip, no new endpoint.

The camelCase id stays visible (engineers grep it) but is **demoted to a mono sub-label** under the
human name.

### 3.5 · Sub-phase D — `sandboxLevers.test.ts` (NEW) — the four pins

1. **Stage existence** — every `lever.stage` is a real `STAGES[].no`.
2. **Server agreement (the F50 killer)** — for every `cls: 'governed'` lever, its `stage` **equals**
   the governed `stage` on the server's own declaration (`api/cwf/_lib/knowledge/reference/agentParams.ts`),
   matched by `paramKey`. The test imports the server module; the client bundle does not. *Client
   and server can no longer disagree about which stage a governed param belongs to.*
3. **The five corrected chips, named explicitly** — `routingBypass:'07'` · `knowledgeSource:'06'` ·
   `previewDrafts:'06'` · `forceProvider:'10'` · `rawToolData:'13'`. A future edit that "restores"
   the old numbering fails with a named test.
4. **Class integrity** — every `governed` lever has a `paramKey`; no `view`/`session` lever has one.

---

## 4 · SELF-VERIFICATION (evidence, not adjectives — paste each)

1. Start SHA `e93906c`; branch; PR URL.
2. `git diff --name-only e93906c..HEAD -- api shared supabase scripts vercel.json public` → **empty**
   (paste the empty result). Then `git diff --stat`.
3. `npx tsx scripts/checkDocDrift.ts` → `[OK]`, rev **70** (unchanged — prove it).
4. `npx vitest run --reporter=dot` UNSHARDED (sharded ≠ CI). New count + per-file delta explanation.
   State explicitly that `adminLegibility` contributed **0** new tests.
5. **Prove the type teeth:** temporarily set one lever's `stage` to `'99'` and paste the `tsc` error.
   Restore.
6. **Prove pin 2 bites:** temporarily flip `temperature.stage` to `'09'` and paste the failing
   server-agreement test output. Restore.
7. **Prove nothing new was built:** `git diff e93906c..HEAD -- src/store src/lib` — show that no lab
   flag, store field, or service call was added. Confirm zero `localStorage`/`sessionStorage` in the
   diff.
8. Confirm `tabLabel()` and the primer's pinned session sentence are **byte-untouched**
   (`git diff e93906c..HEAD -- src/components/admin/adminTabs.ts` → empty; `voiceGate` B3 still green).
9. **CI green on the PR head.** Paste the conclusion.

**Report every deviation.** A deviation disclosed is a design conversation; a deviation discovered
in review is a defect.

---

## 5 · ACCEPTANCE (what the owner will check)

1. **The twin test.** Read stage 07 in Stages. Open Sandbox. The tool-filter lever sits under a
   group headed **`07 · Araç Seçimi`** — same number, same name. Two surfaces, one story.
2. **The keep-it test.** Change the temperature, like the result, and reach the governed row
   **from the panel you are standing in**, without asking anyone how.
3. **The pins are green.**
4. **Nothing new was built.**

---

## 6 · OUT OF SCOPE

Rules/Kinds structure, publish flow, F46/F26/F49 → `WAVE2-IA-2`. The six user docs and the 📖 links
→ `WAVE2-DOCS-1`. The chart's epoch-ms axis (F63), the chat raw-output input panel (F64), the empty
`cwf.backend.id` attribute (F65), the large-result trimming question (F67) → a later phase.

<!-- END · claude-code-PHASE-WAVE2-IA-1-sandbox-v1 · rev 1 · 2026-07-13 -->
