# CWF — Wave 2 · Design Note 3/3: RULES & KINDS — IA, THE PUBLISH FLOW, AND THE AMEND DEFECT

<!-- cwf-wave2-rules-ia-design-v1 · rev 1 · 2026-07-13 · Session 39.
     The THIRD of the three W1.a design notes (master plan v2 §W1). Owns F46 · F26 · F49 ·
     the S38 publish-flow case study — and mints F52, a genuine defect found while reading
     the code for this note.
     Siblings: #1 cwf-wave2-content-voice-design-v1_2 (voice/docs/naming) ·
               #2 cwf-wave2-sandbox-ia-design-v1 (F23, minted F50/F51).
     Code floor: origin/master a38adc6 · 2106/206 · rev 70 · drift [OK]. Every claim below was
     read out of the tree. -->

---

## 0 · THE HEADLINE — F52 (read this first)

**There is no way to edit a published rule starting from its published content.**

`RulesTab.tsx:177` — `onResetToReference()` has two behaviors:

```ts
if (selected.status === RULE_STATUS.DRAFT)  → load the FLOOR text into the editor   // a reset
else                                        → createDraft({ payload: ref.payload }) // ← from the FLOOR
```

`ref` comes from `adminService.listReferenceInstances(...)` — the **code reference**, not the
published row. The button is labelled *"Referansa sıfırla (taban metin)"* (`:406`) and it is
**the only one-click affordance that produces a draft from a published rule.**

So a super_admin who wants to amend his published rule has exactly two options today:

| Path | What he actually gets |
|---|---|
| *"Referansa sıfırla (taban metin)"* | a draft seeded with the **code floor payload** — his published content is **silently absent**. Publish it and he has *reverted his own governance change while performing what looked like an edit.* |
| *"+ Yeni taslak"* with the same key | a **blank** payload — retype the whole thing by hand. |

**The eval-gate does not save him.** A floor payload is schema-valid, referentially valid, and
behaviorally valid — the gate passes it happily. The gate protects against *invalid* rules; it was
never asked to protect against *the wrong rule, validly published.*

This is not a legibility complaint. It is a **silent-governance-regression path**, sitting one
click away from the owner's only published rule — the one he authored in S38 and will want to
amend. **Recommendation: pull the fix forward, ahead of all Wave-2 content** (§5, `RULES-AMEND-1`).

> The class this belongs to: *a reset affordance being used as an amend affordance because no amend
> affordance exists.* We have seen this shape before (S38-L3: the deterministic gate held, but with
> zero cheap guards in front of it, the human paid). Same lesson, new surface.

---

## 1 · THE PUBLISH FLOW — the three-place problem, precisely

The owner could not complete one publish without three stalls. Here is why, from the code:

| Step | Where it lives | What the user must realize |
|---|---|---|
| 1 · author | **"Tüm kurallar"** view → select entry → payload editor → *Kaydet* | that a draft now exists |
| 2 · mark ready | the **detail pane**, a toggle (`onToggleReady` → `setReady`) | that "hazır" is not "yayınlandı" — it only *enqueues* |
| 3 · publish | the **"Yayına hazır (N)"** segmented view (`view === 'queue'`) → *Yayınla* (`publish()` → eval gate) | that the publish button is **on a different screen** than the draft he was just editing |

Three surfaces, one intention. Nothing tells the user, at any step, where he is in the sequence or
what comes next. `readyQueue` is a legitimate *batch* surface — but today it is the **only** publish
surface, which is what forces the traverse.

### 1.1 · The fix: one guided strip, no gate change

On a selected draft, render a three-step progress strip — **`1 Yaz` → `2 Hazır` → `3 Yayınla`** —
with the current step lit, the next step's action as the primary button, and one line of copy
saying what that button will do.

**Publish becomes available in place** (on the draft detail), calling the **same** `publish()` store
action → the **same** server endpoint → the **same** eval-gate. **Binding: no gate change, no new
endpoint, no SoD change** — `RULE_PUBLISH_GLOBAL` still gates the button, and a prompt.segment
publish still carries its `goldenRunId` (L2). The Queue view **stays** as the batch surface for
someone publishing several drafts at once.

The three-place problem was never a missing capability. It was a missing **path**.

---

## 2 · "WHICH SLICE AM I IN" — the invisible backend selector

The header backend selector is shown only on `rules` and `kinds` (`AdminPanel.tsx:197`), and its
effect is otherwise **invisible on the page it governs**. It caused two separate confusions in one
evening, and it is the reason a freshly created draft "vanished": the row was stamped to one
backend while the owner was looking at another slice.

**Fix (cheap, high value):** a persistent slice label on the Rules and Kinds pages — *"ARMES —
Kale Seramik dilimindesin · 47 kural"* — placed where the eye lands before the list, not in the
top chrome. Every empty state names the slice too: *"ARMES diliminde bu türden kural yok"*, never a
bare *"No rules."* (Note #1 §2.2 rule 5: a boş görünen durum must say **which** emptiness it is.)

**F49 (seen live, 2026-07-13):** an ARCHIVED rule whose kind belongs to another backend still
renders a kind group header in the wrong slice (the owner's ARMES slice showed a
`SUPERSET.GATEWAY_RULE` group containing one archived row). Two-part fix:
1. **Archived rows leave the default view.** "Tüm kurallar" means *live* — running + draft. Archived
   gets its own filter chip (`Arşiv (N)`), never the default. History is preserved; it is just not
   in the working set.
2. Any cross-backend residue that survives renders with an explicit note, not a silent group.

---

## 3 · F46 — the Rules split (why everything "lands in Rules")

Rules is one flat list that conflates three *roles*. Today the only relief is a family filter
(`params | prompt`) that is **visible on the `system` backend only** (`RulesTab.tsx:57`) — so on a
domain backend there is no lens at all, and the recurring complaint (*"dönüp dolaşıp Rules'a
çakıyorum"*) is structurally guaranteed: every deep-link from Stages, Kinds, and Sandbox lands on
the same undifferentiated page.

**Split Rules into three role sections** (the grouping the data already supports — `kind_id` →
class/family):

| Section | What lives there | Kinds |
|---|---|---|
| **Ajanın bildikleri** | the factory knowledge the agent reads | domain kinds (`armes.*`, `superset.*`) |
| **Ajanın davranışı** | the agent's own settings | `agent.param` (temperature · historyWindowN · quota.* · rollout.*) |
| **Ajanın talimatı** | the system prompt, as governed rows | `prompt.segment` (the 20) |

Deep-links carry the section, so a jump from Sandbox's `temperature` lands in **Ajanın davranışı**,
not at the top of a 60-row list. This is what F29 was really asking for.

**F26 — Kinds before Rules.** The sidebar reads `Rules · Kinds · Routing`
(`AdminPanel.tsx:179-181`). Conceptually the structure precedes the instances. Reorder to
**`Kinds · Rules · Routing`** (one array reorder), and teach the relation in one line on both pages
— the Excel analogy: **Kinds = sütun başlıkları ve tipleri; Rules = o başlıkları dolduran satırlar.**
(The KindsTab primer already says *"the structure contract for rule instances"* — correct, and
completely invisible to a human. Re-voice per note #1.)

---

## 4 · DRAFT LIFECYCLE VISIBILITY

A draft the user just created must be findable **regardless of the filter he is standing in**. The
create path is now backend-safe (E-HARDEN-1·A derives the backend from the kind server-side), but a
draft can still hide behind the kind filter, the family lens, or the wrong slice.

**Rule: creation navigates to its own result.** After `createDraft` succeeds, the panel clears any
narrowing filter that would hide the new row, selects it, and scrolls to it — the affordance
already exists (`setSelectedId(rule.rule_id)` at `:188`); it simply must be paired with
*"and make sure it is visible."* A thing you just made must never require a search.

---

## 5 · WHAT THIS FEEDS

| Phase | Scope | Profile | When |
|---|---|---|---|
| **RULES-AMEND-1** (**pull forward**) | **F52**: add *"Bu kuralı düzenle → yeni sürüm"* on a published rule → `createDraft` seeded with the **published payload** · relabel the reset button and put it behind a `ConfirmDialog` that says in words that it **discards the published content and returns to the code reference** · show the draft↔published diff (the `DiffRows` component already exists) | **HOTFIX** (single file: `RulesTab.tsx` + tests; no endpoint, no gate, existing `createDraft`) | **before Wave-2 content** |
| **WAVE2-IA-2 · Rules & Kinds** | §1.1 guided publish strip · §2 slice label + F49 archived filter · §3 role split + F26 reorder + the Kinds↔Rules explainer · §4 draft visibility · copy per note #1 | **FULL** (multi-file, client-only) | W1.b |

**Budget:** both are client-only ⇒ **no reseal**, `docVersion` stays rev 70 (`src/**` is not
drift-mapped — verified). **Binding on both: no eval-gate change, no new endpoint, no SoD change.**
"No gate change" means the staging engine, stage order, and schema interpreter stay byte-identical
— a UI that calls the same `publish()` is additive, not a gate touch.

---

## 6 · ACCEPTANCE

1. **The amend test (F52).** The owner opens his published `call-tool-request-wrapper`, clicks
   *Düzenle*, and the editor contains **his v1 text** — not the code floor. Publishing produces v2,
   and the diff shows exactly what he changed.
2. **The one-screen publish.** A draft is authored, marked ready, and published **without leaving
   the row** — and the Queue still works for batch publishing.
3. **The slice test.** At every moment on Rules and Kinds, the user can name the backend slice he is
   in without touching the header.
4. **The lost-draft test.** A newly created draft is visible immediately, whatever filter was set.
5. **The reset is honest.** The reset-to-floor button says, before it fires, that it throws the
   published content away.

---

## 7 · MINTED HERE

- **F52** — no amend-from-published path; the reset affordance masquerades as one and seeds from
  the code floor. **Silent governance-regression risk.** → `RULES-AMEND-1`, pulled forward.
- (Carried) F46 · F26 · F49 · the S38 three-place publish case.

**The three Wave-2 design notes are now complete** (#1 voice/docs/naming · #2 Sandbox IA ·
#3 Rules IA). Four AG phases follow: `RULES-AMEND-1` (now) → `WAVE2-CONTENT-1` · `WAVE2-IA-1`
(Sandbox) · `WAVE2-IA-2` (Rules) → `WAVE2-DOCS-1`.

<!-- END · cwf-wave2-rules-ia-design-v1 · rev 1 · 2026-07-13 -->
