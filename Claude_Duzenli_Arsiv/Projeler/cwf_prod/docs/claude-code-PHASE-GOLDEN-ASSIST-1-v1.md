# PHASE GOLDEN-ASSIST-1 — Golden-set coverage strip + bucket tagging

<!-- claude-code-PHASE-GOLDEN-ASSIST-1-v1 · rev 1 · 2026-07-13 · Session 39.
     Profile: HOTFIX (client-only; NO api/**, NO shared/**, NO migration, NO security surface).
     Anchor: origin/master = 7f6aeb3 · 2073 tests / 205 files · docVersion rev 70 · drift [OK].
     Design source: cwf-wave2-content-voice-design-v1_2 is NOT the parent — this phase stands
     alone (it unblocks the golden set, which gates E.3 / canary baseline / consistency lens /
     GOLDEN-LOOP-1). Author: Architect. Lane: AG (all repo writes). -->

---

## 0 · PRE-FLIGHT (do this first, report the output verbatim)

```bash
cd /tmp && rm -rf cwf_yaprak && git clone --quiet https://github.com/maymun207/cwf_yaprak.git
cd cwf_yaprak && git rev-parse origin/master      # MUST be 7f6aeb343770e6dde412ff3003df93eef8feccf7
git status --porcelain                            # RULE 30: MUST be empty (dirty-tree tripwire)
npm ci --no-audit --no-fund --silent
npx tsc --noEmit -p tsconfig.json                 # baseline must be clean BEFORE you touch anything
npx tsx scripts/checkDocDrift.ts                  # MUST print [OK]
```

If `origin/master` is not the anchor, or the tree is dirty: **STOP and report.** Do not proceed.

---

## 1 · THE PROBLEM (why this phase exists)

Golden-set curation (`GOLDEN-MARK-1`) ships a star toggle and a filter chip. It does **not** ship
the *specification*: the owner must hold "≥5 ARMES core metrics · ≥3 empty≠zero · ≥5 Turkish
routing-tricky · ≥2 multi-tool · ~20 total" in his head while scrolling a flat list of turns. The
spec lives in an Architect document, not in the product. Result: the set has been stuck at 5/20
across two sessions — and it gates four downstream workstreams.

**A manual step that keeps stalling is a missing tooling feature, not a discipline problem.**
This phase moves the spec into the product.

**Scope discipline:** this is a *curation aid*. It changes no gate, no endpoint, no schema, no
authority. If at any point you believe you need `api/**`, `shared/**`, or a migration — **STOP and
report**; that would flip this to a FULL-ceremony phase and it must be re-authored.

---

## 2 · BINDING CONSTRAINTS (violating any of these fails review)

1. **Files you may touch — and no others:**
   - `src/components/admin/goldenCoverage.ts` (**new**, pure module)
   - `src/components/admin/__tests__/goldenCoverage.test.ts` (**new**)
   - `src/components/admin/ReplayTab.tsx` (wiring)
   - `src/components/admin/__tests__/replayTab.test.tsx` (tests)
   - `.agents/CHANGELOG.md` (entry, **in this branch** — S38-L6)
   **NO** `api/**`, **NO** `shared/**`, **NO** `supabase/**`, **NO** new dependency.
2. **No new endpoint.** Use the existing, already-verified surface only:
   - `adminService.listGoldenSpecimens()` → `{ specimens: GoldenSpecimen[] }`
   - `adminService.markGoldenSpecimen(messageId, note?)` → `{ changed, markedBy, markedAt, note }`
   - `adminService.unmarkGoldenSpecimen(messageId)`
   The server **already accepts** `note` (`api/admin/golden-specimens.ts` POST body `{ action,
   messageId, note? }`, string, bounded).
3. **Note length is a hard bound:** `GOLDEN_SPECIMEN_NOTE_MAX_LEN = 280` (`shared/dbConstants.ts`).
   Import the constant — **never re-declare the number** (RULE 1). The client clamps and shows the
   remaining budget; a >280 note must be impossible to send.
4. **Preserve every existing test id:** `golden-controls`, `golden-badge`, `golden-toggle`. Other
   panels' tests must not move.
5. **Zero network on render holds.** The golden set still loads only with the explicit
   load-specimens action. Do not add a fetch on mount. (Existing test G5 pins this — keep it green.)
6. **Honest degradation stays honest.** `golden === null` (unloaded / failed read) ⇒ the coverage
   strip is **not rendered as zeros** — it is absent, with the existing honest note. A failed read
   must never look like "0/20."
7. **empty≠zero, applied to our own curation UI (non-negotiable):** a golden specimen whose note
   carries no bucket tag is **`etiketsiz` (untagged)** — a *distinct, visible count*. It is NEVER
   silently folded into a bucket, and it is NEVER treated as "missing." Unknown ≠ zero. This is the
   project's own law; the panel that curates the empty≠zero specimens may not itself break it.
8. **No storage APIs.** No `localStorage` / `sessionStorage` for coverage state — it is derived
   from server data every load.
9. **No heuristic classification.** Do not guess a specimen's bucket from `contentPreview` text.
   Buckets are a **human judgment**, recorded at mark time. The single mechanical hint allowed is
   §4.3 (multi-tool), which is a fact the list already carries, not an inference.
10. **Capability gate unchanged:** the whole affordance stays behind `PERMISSIONS.GOLDEN_CURATE`
    (`canCurate`), exactly as today.
11. **Turkish-first copy** via the existing `t(tr, en)` helper in `ReplayTab`.

---

## 3 · GATED SUB-PHASES

### A0 — GATE: verify the mark-upsert semantics (read-only, report before writing code)

Read `api/admin/golden-specimens.ts`. Answer, **with a line citation**:

> **Q: Does a second `{ action:'mark' }` on an ALREADY-marked specimen update `note` (upsert),
> or does it no-op / conflict?**

- **If it upserts the note** → the retro-tagging affordance (§4.4) is IN scope.
- **If it does NOT upsert** → the retro-tagging affordance is **OUT of scope; drop it silently and
  report that fact.** Do NOT work around it with an unmark→mark round-trip (that would rewrite
  `marked_by`/`marked_at` — a history rewrite, forbidden). Everything else in this phase proceeds
  unchanged; existing untagged goldens simply stay in the `etiketsiz` count.

**Report A0's answer before writing any code.** This gate exists because the answer changes scope,
and guessing it would either drop a feature we could have had, or ship a history rewrite.

### A — the pure module (green before ReplayTab is touched)

Create `src/components/admin/goldenCoverage.ts`. Pure, no React, no network — mirrors the existing
extract-the-pure-core discipline (`navStack.ts`, `navScroll.ts`, `adminTabs.ts`), so it is unit
testable without mounting a 1571-line panel.

```ts
export interface GoldenBucket {
    id: 'core' | 'empty-zero' | 'routing-tr' | 'multi-tool';
    labelTr: string;      // rendered via the caller's t()
    labelEn: string;
    target: number;       // the MINIMUM this bucket must reach
    hint: string;         // one line: what qualifies (shown in the mark popover)
}
export const GOLDEN_BUCKETS: readonly GoldenBucket[];   // the four, in this order
export const GOLDEN_TARGET_TOTAL = 20;
```

Buckets (exact ids, exact targets — the Architect's spec, do not invent your own):

| id | TR label | EN label | target | qualifies when… |
|---|---|---|---|---|
| `core` | Çekirdek metrik | Core metric | 5 | an ARMES core-metric question (OEE, üretim, hurda, fire, duruş) |
| `empty-zero` | Boş ≠ sıfır | Empty ≠ zero | 3 | the honest answer is "veri yok / görünmüyor", never "0" (IKINCILUST class) |
| `routing-tr` | Zor Türkçe eşleme | Turkish routing-tricky | 5 | the phrasing makes tool matching hard (ekler, eş anlamlılar, kısaltmalar) |
| `multi-tool` | Çok araçlı | Multi-tool | 2 | the turn legitimately used more than one tool |

`5+3+5+2 = 15`; the remaining 5 toward `GOLDEN_TARGET_TOTAL` are free-choice specimens. Say this in
the UI — do not let the strip imply 15 is the finish line.

**The note encoding (the data contract).** The note is a *human* field that we now also read
mechanically. Format:

```
#core #empty-zero — serbest metin buraya
```

- `parseBuckets(note: string | null): BucketId[]` — matches only `#<known-id>` tokens at the head;
  **unknown tokens are ignored, not errors**; a note with no known tag ⇒ `[]` (= `etiketsiz`).
- `stripTags(note: string | null): string` — the free-text remainder (for display/edit).
- `formatNote(buckets: BucketId[], freeText: string): string` — deterministic, **round-trips**
  (`parseBuckets(formatNote(b, f)) === b`, `stripTags(formatNote(b, f)) === f.trim()`), and is
  clamped to `GOLDEN_SPECIMEN_NOTE_MAX_LEN` by **truncating the free text only** — a tag is never
  cut in half.
- `coverage(golden: Map<string, GoldenSpecimen>): CoverageReport` where

```ts
export interface CoverageReport {
    total: number;                                   // golden.size
    targetTotal: number;                             // GOLDEN_TARGET_TOTAL
    untagged: number;                                // constraint 7 — its own visible count
    buckets: { id: BucketId; count: number; target: number; met: boolean }[];
    complete: boolean;                               // every bucket met AND total >= targetTotal
}
```

A specimen may carry more than one tag and counts toward each — that is correct (an empty≠zero core
metric is both).

**Tests (`goldenCoverage.test.ts`)** — at minimum: round-trip property (tags × free text, incl.
empty free text) · unknown-tag tolerance · a note of `null` ⇒ untagged · the 280-char clamp cuts
free text and never a tag · multi-tag counting · `untagged` never folded into a bucket · `complete`
false while any bucket is short even when `total >= 20`.

**Run the module's tests green before touching `ReplayTab.tsx`.**

### B — ReplayTab wiring

**B1 · The coverage strip.** Rendered above the specimen picker, only when `canCurate && golden !==
null` (constraint 6). `data-testid="golden-coverage"`. Shows, in one compact row:

- per bucket: `label count/target`, visually "met" vs "short" (short = the reader's eye goes there);
- `etiketsiz (N)` as its own chip when `N > 0` (constraint 7);
- `Toplam N/20`;
- one line of guidance when incomplete, naming **the shortest bucket first** — e.g.
  *"Eksik: Boş ≠ sıfır (0/3). Bu kova, verisi olmayan bir sorunun '0' diye cevaplanmadığı
  dönüşlerdir."* (the bucket's `hint`).

Voice: it must say what to *do*, not only what is missing.

**B2 · The mark popover.** Clicking an **unmarked** row's star (`golden-toggle`) no longer marks
immediately — it opens a small popover (`data-testid="golden-mark-popover"`) with:
- the four bucket checkboxes (label + `hint`);
- an optional free-text note with a live remaining-characters count (bounded by the constant);
- **`İşaretle`** (primary) and **`Kova seçmeden işaretle`** (secondary escape — marks with an empty
  note ⇒ lands in `etiketsiz`; the flow is never blocked by the taxonomy);
- `İptal`.

Marking sends `markGoldenSpecimen(id, formatNote(selected, freeText))` — omit `note` entirely when
nothing is selected and the text is empty (do not send `""`).

**Unmark stays one click** (no popover), exactly as today.

**B3 · The candidate hint (the only mechanical one).** On a row where `toolCallCount != null &&
toolCallCount > 1`, show a muted badge `çok araçlı aday` (`data-testid="golden-candidate-multi"`).
It is a *fact from the row*, not a classification — it does not pre-check the box, it only points.

**B4 · Retro-tagging** — **only if A0 said "upserts".** A marked row's bucket tags render as small
chips; a pencil affordance re-opens the same popover pre-filled, and saving re-`mark`s with the new
note. If A0 said otherwise: skip entirely and say so in the report.

**Tests (`replayTab.test.tsx`)** — extend, do not rewrite. Keep the four existing GOLDEN-MARK-1 G5
tests green (adapting the "star toggles" one to the popover flow is expected and allowed). Add:
- the strip renders with correct counts from a seeded golden set, and shows `etiketsiz` distinctly;
- the strip is **absent** when the golden read fails (`golden === null`) — never a zeroed strip;
- the popover marks with the encoded note (assert the exact `markGoldenSpecimen` argument);
- "Kova seçmeden işaretle" marks with **no** `note` argument;
- the multi-tool candidate badge appears only on rows with `toolCallCount > 1`;
- zero-network-on-render still holds.

### C — CHANGELOG + PR

- `.agents/CHANGELOG.md` entry **in this branch** (S38-L6 — not a later DOC-FLIP). State the A0
  verdict and whether B4 shipped.
- Push the branch and **open a PR** (PR-fires-CI — a bare branch push runs nothing).
- Report the CI conclusion on the PR head. **CI green is the merge precondition** (S37-2). Do not
  merge; the Architect issues the verbatim `--no-ff` message after review.

---

## 4 · SELF-VERIFY (report each line with literal evidence, not a claim)

```bash
npx tsc --noEmit -p tsconfig.json                                    # clean
npx vitest run src/components/admin/__tests__/goldenCoverage.test.ts --reporter=dot
npx vitest run src/components/admin/__tests__/replayTab.test.tsx --reporter=dot
npx vitest run src/components/admin/__tests__/adminLegibility.test.ts --reporter=dot
npx tsx scripts/checkDocDrift.ts                                     # MUST still be [OK]
git diff --stat 7f6aeb3..HEAD                                        # ONLY the §2.1 files
```

Report:
1. **A0's verdict**, with the file:line citation.
2. The **exact** new totals: `X tests / Y files` (full-suite or sharded — say which).
3. `git diff --stat` output — if a file outside §2.1 appears, you have failed constraint 1.
4. `checkDocDrift` output. Expected `[OK]` **with no reseal**: the drift manifest maps only
   `api/**`, `shared/**`, `vercel.json` — `src/**` is not drift-mapped, so a client-only phase
   carries **no reseal budget** and `docVersion` stays at **rev 70**. If you find yourself needing
   a reseal, you touched something you should not have — stop and report.
5. The PR URL + its CI conclusion.
6. Note that `adminLegibility.test.ts` auto-generates 2 tests per admin **`.tsx`** — `goldenCoverage`
   is a `.ts` module, so it must **not** move that count. If it does, explain why.

---

## 5 · DONE MEANS

The owner opens Replay, loads specimens, and the panel tells him — without a document open beside
him — which buckets are short, what qualifies for the shortest one, and lets him record his judgment
in the same click he was already making. The 15 remaining specimens become a task he can finish in
one sitting.

<!-- END · claude-code-PHASE-GOLDEN-ASSIST-1-v1 · rev 1 · 2026-07-13 -->
