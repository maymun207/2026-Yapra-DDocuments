# CWF — Wave 2 · Design Note 2/3: SANDBOX (ex-Tweak) INFORMATION ARCHITECTURE

<!-- cwf-wave2-sandbox-ia-design-v1 · rev 1 · 2026-07-13 · Session 39.
     The SECOND of the three W1.a design notes (master plan v2 §W1). Owns F23 — the owner's
     hardest directive ("regroup the levers BY STAGE, in pipeline order").
     Siblings: #1 cwf-wave2-content-voice-design-v1_2 (voice/docs/naming — its §4.1 binds here) ·
     #3 Rules split (F46+F26), not yet written.
     Code floor: origin/master 7f6aeb3 · 2073/205 · rev 70. Every claim below was read out of
     the tree, not recalled.
     NEW FINDINGS MINTED HERE: F50 (stage chips are wrong) · F51 (three authority classes shown
     as one flat list). Both code-verified 2026-07-13. -->

---

## 0 · WHAT THE PANEL IS TODAY (read from `TweakTab.tsx`, 275 lines)

Seven levers in one flat `divide-y` list, each with a hand-written stage chip; below them, the
Active-fingerprint block; below that, "Clear all flags."

| Lever | Chip today | Kind of thing it actually is |
|---|---|---|
| `routingBypass` | `06` | server lab flag |
| `knowledgeSource` | `05` | server lab flag |
| `previewDrafts` | `05·08` | server lab flag |
| `forceProvider` | `09` | server lab flag (`req.body.forceProvider`) |
| `rawToolData` | `12` | **client-only render flag — never reaches the server** |
| `temperature` | `10` | **governed param override** (`agent.temperature`, `sessionTweakable`) |
| `historyWindow` | `05` | **governed param override** (`agent.historyWindowN`) |

---

## 1 · DIAGNOSIS — F23 is deeper than "regroup"

### 1.1 · F50 — the stage tags are wrong (the layout would have encoded the error)

`TweakTab.tsx`'s own header says: *"Every flag is stage-tagged against the canonical 14-stage
request flow."* It is not. Against `stagesRegistry.ts` — which is now the canonical flow the
Stages tab **teaches**:

| Lever | Chip today | Canonical stage | Why |
|---|---|---|---|
| `routingBypass` | `06` | **`07` Araç Seçimi** | it skips the per-message **tool filter** |
| `knowledgeSource` | `05` | **`06` Bilgi / RAG** | DB slice vs code floor **is** the knowledge stage |
| `previewDrafts` | `05·08` | **`06` Bilgi / RAG** | your drafts substitute for the published knowledge slice (`08` = Sıkıştırma — unrelated) |
| `forceProvider` | `09` | **`10` LLM Çıkarımı** | it picks the model, not the prompt |
| `rawToolData` | `12` | **`13` Biçim / Sunum** | it changes what is *rendered*, not what is *verified* |
| `temperature` | `10` | `10` ✓ | comes from `agentParams.ts` (server truth) |
| `historyWindow` | `05` | `05` ✓ | comes from `agentParams.ts` (server truth) |

Four of the five hand-written chips are off by exactly one stage, downward — the fingerprint of a
numbering that predates `stagesRegistry`. **No test pins any of them** (grep: zero hits). The two
correct ones are correct precisely *because* they are not hand-written: they derive from the
governed `stage` field on the server (`agentParams.ts`: `TEMPERATURE stage:'10'`,
`HISTORY_WINDOW_N stage:'05'`).

> **The lesson that shapes this whole note:** the panel's stage tags were *prose*, so they rotted.
> The moment we make stage the **grouping key**, a wrong tag stops being a cosmetic error and
> becomes a **structural lie** — the user is taught 07 = Araç Seçimi in Stages and then finds the
> tool-filter lever filed under 06. F23 cannot be built on hand-written tags.

### 1.2 · F51 — three authority classes, one undifferentiated list

The seven switches look identical, but they are three different animals:

| Class | Levers | What a change actually does | Can it be made permanent? |
|---|---|---|---|
| **A · Görünüm** (client-only) | `rawToolData` | Never leaves the browser. The agent's behavior does not change **at all**. | No — there is nothing to persist. |
| **B · Oturum davranışı** (server lab flag) | `routingBypass` · `knowledgeSource` · `previewDrafts` · `forceProvider` | The server re-authorizes each flag (`authorizeLab`, `LAB_TOGGLE_SESSION`) and behaves differently **for this session only**. | **No — by design.** There is no publish path. That is the safety property, not a gap. |
| **C · Governed değer** (param override) | `temperature` · `historyWindow` | Overrides a **published governed row** — and only if that row says `sessionTweakable: true`. The row exists in Rules, permanently, right now. | **Yes** — publish a new version of the `agent.param` row. |

A user cannot tell these apart today. So he cannot answer the only question that matters after a
successful experiment: **"I liked that. How do I keep it?"** For class C the answer is "publish the
row"; for class B the answer is "you can't, and here's why that's deliberate"; for class A the
question doesn't apply. **Silence on this is why the panel felt like a pile of switches.**

### 1.3 · The naming residue (from note #1 §4.1)

The tab becomes **"Sandbox Ortamı / Session Sandbox"** (owner-locked). The TR label carries *safe
place to try things* but **not** *session-scoped* — so the primer must say it, and a test must pin
the sentence. That requirement lands in this panel, so it is repeated here as a binding item.

---

## 2 · THE TARGET IA

### 2.1 · Reading order (top → bottom)

1. **Primer** — the §4.1 sentence, plus the exit ramp in one line: *changes here live only in this
   session; to keep one, publish a governed rule.*
2. **Aktif parmak izi (F24) — moves to the TOP.** Today it is buried under seven switches; the
   owner only discovered it after the scroll fix. It is not a footnote: **it is the baseline you
   are about to perturb.** You read *what is true right now* (published temperature, history
   window, prompt/params/knowledge/authority hashes), and only then reach for a lever.
3. **The levers, grouped by stage, in pipeline order** — `06 → 07 → 10 → 13` (the stages that
   actually have levers), plus the class-C params under their own governed stages (`05`, `10`).
4. **Invariant badges** (server-authorized · no publish path · clears on refresh · flags off ⇒
   byte-identical request path) — keep them, re-voiced per note #1 §2.
5. **Tüm bayrakları temizle** (unchanged).

### 2.2 · The group header — the bridge Stages promised

Each stage group is headed by its **canonical number + canonical title**, taken from
`stagesRegistry`, and deep-links to that stage's card:

> **`06` · Bilgi / RAG** — *Ajanın bu turda neyi "bildiği".* → **Aşamayı oku**

This is the pillar-3 move (findings-v4 §0.3): *the Stages mental model propagates into the panels.*
The user who just learned the pipeline finds the same pipeline here, in the same order, under the
same names — and Sandbox becomes what it should be: **the action-twin of Stages.**

**Empty groups are not rendered, and — binding — you do not invent a lever to fill a stage.** A
pipeline stage with no session lever is a fact, not a hole.

### 2.3 · The authority marker (F51)

Every lever carries a small class badge, and the class determines what else it shows:

- **A · Görünüm** — muted badge *"yalnız görünüm — ajan değişmez"*.
- **B · Oturum davranışı** — badge *"oturumluk — kalıcı yapılamaz"*, with the one-line reason on
  expand (*"bu bir deney kaldıracı; yayın yolu bilerek yok"*).
- **C · Governed değer** — badge *"governed"* **plus the exit ramp**: **`Kalıcı yap →`**, which
  deep-links to Rules filtered to the `agent.param` kind (reuse the existing kind-filter jump —
  `onOpenRules(kindId)`; **no new endpoint, no new mechanism**). Class C rows also show the
  published value beside the override box (they already do — keep it).

The exit ramp is the whole point of §1.2: **try it here, keep it there.** One visible road.

### 2.4 · What does NOT change (do-not-build)

- **No new lever.** Not one. The "flags off ⇒ request path byte-identical" invariant and the
  `authorizeLab` allow-list are safety properties; this phase is layout + labels + links.
- **No new endpoint, no `api/**`, no `shared/**`, no migration.** (Consequence: `src/**` is not
  drift-mapped ⇒ **no reseal**, `docVersion` stays at rev 70.)
- **No persistence of sandbox state.** No `localStorage`, no "save my sandbox" — the moment
  sandbox state persists, it stops being a sandbox and the byte-identical invariant becomes a lie.
- **Client must not import `api/**`.** (The *test* may — that precedent already exists in
  `stagesRegistry.test.ts` C-9d, which imports server span modules while the bundle does not.)

---

## 3 · THE MECHANISM (so F50 can never happen again)

Prose tags rot. Types and tests do not.

**A pure module: `src/components/admin/sandboxLevers.ts`** — the single source of truth for the
lever set, mirroring the `navStack.ts` / `adminTabs.ts` / `stagesRegistry.ts` discipline.

```ts
import { STAGES } from './stagesRegistry';
export type StageNo = (typeof STAGES)[number]['no'];      // '00'..'14' — derived, never typed by hand
export type LeverClass = 'view' | 'session' | 'governed'; // F51: A · B · C

export interface SandboxLever {
    id: 'routingBypass' | 'knowledgeSource' | 'previewDrafts' | 'forceProvider'
      | 'rawToolData' | 'temperature' | 'historyWindow';
    stage: StageNo;            // a non-existent stage is a COMPILE ERROR
    cls: LeverClass;
    labelTr: string;           // human name (note #1 voice) — not the camelCase identifier
    whatTr: string;            // beat 1: what it does, in the user's world
    ifYouChangeTr: string;     // beat 2: what visibly changes
    paramKey?: string;         // class C only → the governed row the exit ramp points at
}
export const SANDBOX_LEVERS: readonly SandboxLever[];   // ordered by stage, then by id
```

**The three test pins (`sandboxLevers.test.ts`):**

1. **Stage existence** — every `lever.stage` is a real `STAGES[].no`. (Type-enforced *and*
   asserted, because a string literal union can be widened by a careless edit.)
2. **Server agreement (the F50 killer)** — for every class-C lever, `lever.stage` **must equal**
   the governed `stage` on the server's param declaration (`agentParams.ts`). The test imports the
   server module; the client bundle does not. **Client and server can no longer disagree about
   what stage a governed param belongs to.**
3. **Correctness of the five corrected chips** — pinned explicitly: `routingBypass:'07'`,
   `knowledgeSource:'06'`, `previewDrafts:'06'`, `forceProvider:'10'`, `rawToolData:'13'`. A future
   edit that "fixes" one back to the old numbering fails the suite with a named test.

Plus the note-#1 assertion: **the primer contains the session-scoped sentence** (§1.3).

> Same doctrine as note #1: the rule becomes a **test**, the link becomes a **type**. F50 existed
> because the stage tag was a comment in JSX. After this phase it is a typed field with a pin to
> the server's own answer.

---

## 4 · THE COPY (per note #1 §2 — human names, not identifiers)

The camelCase identifier stays visible (engineers grep it) but is **demoted to a mono sub-label**;
the human name leads:

| Stage | Human name (leads) | id (mono, secondary) | Class |
|---|---|---|---|
| `06` | Bilgi kaynağı — yayınlanan mı, kod tabanı mı? | `knowledgeSource` | B |
| `06` | Kendi taslaklarınla dene | `previewDrafts` | B |
| `07` | Araç filtresini atla (tüm araçları ver) | `routingBypass` | B |
| `10` | Sağlayıcıyı sabitle | `forceProvider` | B |
| `10` | Sıcaklık | `temperature` | **C** |
| `05` | Geçmiş penceresi | `historyWindow` | **C** |
| `13` | Ham araç verisini göster | `rawToolData` | A |

Two examples of the beat-1/beat-2 pair the writing must hit (the rest follow the same shape):

- **Araç filtresini atla** — *"Normalde ajana yalnızca sorunla ilgili araçlar verilir. Bunu açarsan
  tüm araç setini görür."* / *"Cevap yavaşlar ve yanlış araç seçme ihtimali artar — ama filtrenin
  bir aracı haksız yere elediğini kanıtlamak için tam olarak bu gerekir."*
- **Bilgi kaynağı** — *"Ajanın bu turda okuyacağı bilgi: yayınlanan governed dilim, ya da kod
  tabanı (yayın öncesi hâli)."* / *"Kod tabanını seçersen, yayınladığın kuralların gerçekten fark
  yaratıp yaratmadığını görürsün — floor'un kör noktaları da geri gelir."*

---

## 5 · WHAT THIS FEEDS

| Phase | Scope | Profile |
|---|---|---|
| **WAVE2-IA-1 · Sandbox** | `sandboxLevers.ts` (new, pure) + `sandboxLevers.test.ts` (3 pins) · `TweakTab.tsx` regroup by stage + class badges + fingerprint-to-top + group deep-links + exit ramp for class C · primer per note #1 §4.1 · tab label rename lands here or in WAVE2-CONTENT-1 (whichever ships first — **not both**) · CHANGELOG in-branch | **FULL** (multi-file, client-only) |

**Sequencing note:** the `tabLabel()` rename (`tweak` → "Sandbox Ortamı") is a one-line change owned
by **WAVE2-CONTENT-1** (note #1 §4). If WAVE2-IA-1 ships first, it carries the rename instead and
CONTENT-1 drops it. **The Architect states which in the phase prompt** — a rename landing twice is
a merge conflict, and landing zero times is a half-renamed product.

**Ceremony:** FULL (multi-file), but client-only ⇒ no reseal, `docVersion` stays rev 70. Footguns:
`adminLegibility.test.ts` auto-generates 2 tests per admin `.tsx` (`sandboxLevers.ts` is `.ts` —
must not move that count) · PR-fires-CI, CI green is the merge precondition.

---

## 6 · ACCEPTANCE

1. **The twin test.** Open Stages, read stage 07. Open Sandbox. The tool-filter lever is under a
   group headed **`07 · Araç Seçimi`** — the same number, the same name. The two surfaces tell one
   story. (Today they tell two.)
2. **The keep-it test.** The owner changes `temperature`, likes the result, and reaches the
   governed row **from the panel he is standing in**, without asking anyone how.
3. **The pins are green.** `sandboxLevers.test.ts` — stage existence · server agreement on class-C
   stages · the five corrected chips · the primer's session-scoped sentence.
4. **Nothing new was built.** `git diff` shows no new lever, no `api/**`, no storage API.

---

## 7 · REGISTERED (carried to the register, not solved here)

- **F50** — Sandbox stage chips were off-by-one vs `stagesRegistry` (4 of 5), un-pinned by any
  test. **Fixed by this note's phase.** Root class: *"a fact stated in prose drifts; a fact stated
  in a type does not."* Worth a sweep — **are there other hand-written stage numbers in the
  client?** (Cheap grep, fold into WAVE2-IA-1's pre-flight.)
- **F51** — three authority classes shown as one flat list; `rawToolData` never reaches the server.
  **Fixed by this note's phase** (class badges + the class-C exit ramp).
- Note #3 (Rules split, F46/F26, publish-flow, slice label, F49) — **still to write.**

<!-- END · cwf-wave2-sandbox-ia-design-v1 · rev 1 · 2026-07-13 -->
