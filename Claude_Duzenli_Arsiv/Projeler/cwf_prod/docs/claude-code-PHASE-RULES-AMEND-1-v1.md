# PHASE RULES-AMEND-1 — Amend a published rule from its PUBLISHED payload (F52)

<!-- claude-code-PHASE-RULES-AMEND-1-v1 · rev 1 · 2026-07-13 · Session 39.
     Profile: HOTFIX (client-only; single component + tests. NO api/**, NO shared/**, NO
     migration, NO eval-gate change, NO new endpoint, NO SoD change).
     Anchor: origin/master = a38adc6 · 2106 tests / 206 files · docVersion rev 70 · drift [OK].
     Source: cwf-wave2-rules-ia-design-v1 §0 + §5 (F52). Author: Architect. Lane: AG. -->

---

## 0 · PRE-FLIGHT (run, report verbatim)

```bash
cd /tmp && rm -rf cwf_yaprak && git clone --quiet https://github.com/maymun207/cwf_yaprak.git
cd cwf_yaprak && git rev-parse origin/master     # MUST be a38adc608ef61cc528bb9ea9cad9e8fe05c69d29
git status --porcelain                           # RULE 30: MUST be empty
npm ci --no-audit --no-fund --silent
npx tsc --noEmit -p tsconfig.json                # clean baseline
```

Anchor mismatch or dirty tree ⇒ **STOP and report.**

---

## 1 · THE DEFECT (F52) — read this before writing code

`src/components/admin/RulesTab.tsx:177` — `onResetToReference()`:

```ts
const instances = await adminService.listReferenceInstances(selectedBackendId, selected.kind_id);
const ref = instances.find((i) => i.key === selected.key);        // ← the CODE FLOOR payload
if (selected.status === RULE_STATUS.DRAFT) {
    setEditText(JSON.stringify(ref.payload, null, 2));            // reset the editor — correct
} else {
    const rule = await createDraft({ ..., payload: ref.payload }); // ← seeds a draft FROM THE FLOOR
}
```

The button (`:405-406`) is labelled *"Referansa sıfırla (taban metin)"* — and it is **the only
one-click affordance that produces a draft from a PUBLISHED rule.** A super_admin who wants to
amend his published rule therefore gets a draft containing the **code reference payload**, not his
published content. Publishing it silently **reverts his own governance change** while looking like
an edit. The eval-gate does not catch this: a floor payload is perfectly valid.

**This phase adds the missing amend path and makes the reset honest.** It does not touch the gate.

---

## 2 · BINDING CONSTRAINTS (violating any of these fails review)

1. **Files you may touch — and no others:**
   - `src/components/admin/RulesTab.tsx`
   - `src/components/admin/__tests__/rulesTabAmend.test.tsx` (**new**) — or extend an existing
     RulesTab test file if that is cleaner; say which.
   - `.agents/CHANGELOG.md` (entry **in this branch** — S38-L6)

   **NO** `api/**`, **NO** `shared/**`, **NO** `supabase/**`, **NO** store changes
   (`adminStore.ts` already exposes everything needed), **NO** new dependency.
2. **No new endpoint and NO eval-gate change.** Use the existing store actions only:
   `createDraft({ kindId, key, payload })` · `publish()` · `setReady()` · `getRuleDetail()`.
   ("No gate change" = the staging engine, stage order, and schema interpreter stay byte-identical.)
3. **No SoD change.** Drafting stays behind `RULE_DRAFT_CRUD` (`canDraft`); publishing stays behind
   `RULE_PUBLISH_GLOBAL` (`canPublish`). Do not widen either.
4. **The published row is never mutated.** Amending means: **create a NEW draft** for the same
   `(kind, key)`, seeded with the published payload. The published version keeps running until the
   new draft passes the gate and is published. (This is the existing lifecycle — do not invent one.)
5. **Reuse the existing components**: `ConfirmDialog` and `DiffRows` from `./adminUi` (already
   imported at `:30`). Do not hand-roll a dialog or a diff.
6. **No storage APIs** (`localStorage` / `sessionStorage`).
7. Copy is **Turkish-first** via the existing `t(tr, en)` helper.

---

## 3 · WHAT TO BUILD

### A · The amend affordance (the fix)

On a selected rule whose status is **PUBLISHED**, render a primary action:

> **`Bu kuralı düzenle → yeni sürüm`** *(EN: "Edit this rule → new version")*
> `data-testid="rule-amend"`

Behavior:
- Calls `createDraft({ kindId: selected.kind_id, key: selected.key, payload: <the PUBLISHED
  payload> })`. The published payload is already in hand — `getRuleDetail(selectedId)` populates
  `detail.rule.payload`, and the editor text is seeded from it at `:110`. **Do not fetch the
  reference.**
- On success: select the new draft (`setSelectedId(rule.rule_id)`), load its payload into the
  editor, and toast *"Yayınlanan içerikten yeni taslak oluşturuldu — düzenleyip yayınlayın."*
- Gated on `canDraft` (same as the reset button today).
- **If a draft already exists for this (kind, key)** — `selectedEntry.draft` is present — do **not**
  create a second one. Instead, select the existing draft and toast *"Bu kural için zaten bir
  taslak var — o açıldı."* (Drafts are per (kind,key); a silent second draft is how S38's orphan
  was born.)

### B · Make the reset honest

The existing reset button stays (it is a legitimate operation — "go back to what the code ships"),
but:
- **On a PUBLISHED rule** it must go behind a `ConfirmDialog` whose body says, in words:
  > *"Bu, yayınlanan içeriği KULLANMAZ. Kod tabanındaki referans metinden yeni bir taslak oluşturur —
  > yayınladığın değişiklikler bu taslakta yer almaz. Kuralını düzenlemek istiyorsan 'Bu kuralı
  > düzenle' butonunu kullan."*
  `data-testid="rule-reset-confirm"`.
- **On a DRAFT** it keeps its current one-click behavior (loading the floor text into an editor you
  are already editing is not destructive — it is a visible, undoable action).
- Relabel it so the two actions cannot be confused: **`Kod tabanına sıfırla`** *(EN: "Reset to code
  floor")*. Keep the `RotateCcw` icon.

### C · Show the difference

When a draft exists alongside a published version for the same (kind, key), render the
draft ↔ published diff with the existing `DiffRows` component, headed *"Yayındaki sürümden farkı"*
(`data-testid="rule-amend-diff"`). The user must be able to see what he changed **before** he
publishes.

If computing a payload diff here is not already available, build it locally in the component with a
small pure helper (shallow key-wise `{from, to}` over the two payload objects — the exact shape
`DiffRows` already consumes at `adminUi.tsx:306`). Do **not** add an endpoint for this.

---

## 4 · TESTS (must be present and green)

1. **Amend seeds from PUBLISHED, not the floor** — the load-bearing test. Mock
   `adminService.listReferenceInstances` to return a payload that is **clearly different** from the
   published one, click `rule-amend`, and assert `createDraft` was called with **the published
   payload** and that `listReferenceInstances` was **never called**. *(This test is the whole point
   of the phase — if it can pass while the bug is present, it is the wrong test.)*
2. **Amend with an existing draft does not create a second draft** — `createDraft` not called; the
   existing draft is selected.
3. **Reset on a published rule is confirm-gated** — `createDraft` is not called until the
   confirmation is accepted; the confirm body names the consequence.
4. **Reset on a draft still loads the floor text into the editor** (unchanged behavior — regression
   lock).
5. **Capability gates hold** — without `RULE_DRAFT_CRUD` the amend button is absent/disabled.
6. **Diff renders** the draft↔published differences when both exist.

---

## 5 · SELF-VERIFY (report each with literal evidence)

```bash
npx tsc --noEmit -p tsconfig.json
npx vitest run src/components/admin/__tests__ --reporter=dot       # the whole admin test folder
npx vitest run --reporter=dot                                      # FULL suite, unsharded
npx tsx scripts/checkDocDrift.ts                                   # MUST still be [OK], rev 70
git diff --stat a38adc6..HEAD                                      # ONLY the §2.1 files
```

Report: exact new `X tests / Y files` · the `git diff --stat` · `checkDocDrift` output (expect
`[OK]`, **no reseal** — `src/**` is not drift-mapped) · the PR URL + **CI conclusion on the PR
head** (PR-fires-CI; CI green is the merge precondition — S37-2). **Do not merge.** The Architect
issues the verbatim `--no-ff` message after review.

Note: `adminLegibility.test.ts` auto-generates 2 tests per admin **`.tsx`** — this phase adds no new
admin component, so that count must **not** move. If it does, explain why.

---

## 6 · DONE MEANS

The owner opens his published `superset.gateway_rule / call-tool-request-wrapper`, clicks
**"Bu kuralı düzenle"**, and the editor contains **his own v1 text**. He changes one line, sees the
diff against what is running, marks it ready, publishes — and gets v2 containing his change. The
reset button still exists, is honestly named, and tells him what it will destroy before it does it.

<!-- END · claude-code-PHASE-RULES-AMEND-1-v1 · rev 1 · 2026-07-13 -->
