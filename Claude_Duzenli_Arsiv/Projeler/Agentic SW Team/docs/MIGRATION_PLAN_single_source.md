# Migration Plan — Single Source of Truth (v6 SSoT)

> **Goal:** eliminate the dual/triple-representation defect permanently. Make `ARDICTECH_Platform_v6_SSoT_bilingual.html` the **one** source of truth; the tool *renders* it; nothing is hand-copied; drift becomes impossible.
> **Nav decision:** Choice 2 — keep the familiar per-section top tabs; each tab frames the SSoT at its section.
> **Author:** Claude (architect). **Date:** 2026-06-03.
> **This is the plan, not the stage prompts.** Review the sequence; then I write the stages one at a time, gated.

---

## The problem we're killing

The same content lives in (up to) three hand-maintained places that drift:
1. **Canonical HTML docs** (content repo `docs/architecture/`) → shown in the **Library**.
2. **App data** (`app/_data/*.ts` in the app repo) → drives the **interactive tabs** — a hand-extracted copy.
3. **A duplicate `docs/`** in the app repo (already drifted on the bridge file).

And the live tool fetches from the **content repo** (`agbuilder-platform/revolutionize@main`, hardcoded in `app/_lib/github.ts`), while the app repo is `maymun207/TheBluePrint23`.

## The target (rock solid)

**One file is the source: the v6 SSoT.** It already does ~90% of everything (all 7 sections, EN/TR toggle, nav, filters, Gantt — verified firsthand). The tool's 8 content tabs each **frame the SSoT at their section**. The React content re-implementation, the `app/_data` content files, the duplicate `docs/`, and the redundant standalone docs are **retired**. Fix the SSoT → everything updates. There is nothing left to drift against.

**Two structural facts that make this cheap:**
- The SSoT is **self-contained**, so it can be tested by just opening the file in a browser — that's our "preview" for content-repo changes (which otherwise have none).
- Production already reads the content repo, so "one repo" is mostly true at runtime already; the app-repo `docs/` is just dead weight to delete.

---

## The sequence — two phases, 8 stages

**Principle: the tool stays working at every stage.** Phase 1 perfects the SSoT (the tabs don't frame it yet, so the live tabs are unaffected). Phase 2 flips the tabs to the SSoT and removes the copies.

### PHASE 1 — Make the SSoT the complete, correct single source
*All edits to ONE file (the v6 SSoT) in the content repo. Each is testable standalone before merge.*

**S1 — Decision record + tab↔section mapping** · *XS · content repo*
Commit a short architecture-decision doc (why we're consolidating, Choice 2) to `docs/decisions/`, and pin the exact mapping of the 8 tabs → 7 SSoT sections (resolving the Big-Picture-vs-Bridge overlap the inventory flagged). This is the reference the later stages follow. *Verify: doc renders in Library.*

**S2 — Enhance the SSoT to feature-complete + embeddable** · *M–L · content repo · the biggest stage*
Add the one net-new feature and the embed plumbing:
- **Click-to-detail panels** for EAIP Arch + Rev Arch (each component/agent → inbound/outbound connection lists). *Likely reuses the connection data already in the SSoT's conn-table sections — Step 0 confirms, which keeps this smaller than it looks.*
- Trivia: LLM badges (Rev Arch), divider rows, chevron animation, cal-bound hatching on the Gantt if missing.
- **Embed mode** (a config the app injects) that hides the SSoT's own internal nav when framed — so there's no double row of tabs under Choice 2.
- **Section entry point** so the SSoT opens at a given section on load.
*Verify: open the SSoT file standalone in a browser — all sections, toggle, filters, Gantt, NEW click-to-detail, embed mode, section entry all work. (May split into S2a embed/entry + S2b click-to-detail if too large.)*

**S3 — Reconcile content: timeline** · *S · content repo* (this is the old R2, now on one file)
In the SSoT: M1 = June 2026, the program(M1–M7)-vs-roadmap(M8–M13/2027) split, the five M7 products, CWF1 cutover, Insurance v0.8. *Verify standalone.*

**S4 — Reconcile content: prerequisites** · *S · content repo* (old R3, on one file)
In the SSoT: the canonical 5-set / 4-open / ④-resolved; ⑤ reworded (human-or-agentic); operational items as a separate kickoff checklist. *Verify standalone.*

**S5 — Verify SSoT consistency** · *XS–S · content repo* (old R4)
Prove the one source is clean: no `v0.5`, counts converge, timeline statements agree, TR reads well, all interactivity works. A clean report — we *prove* it, not assert it.

*(R1 — the v0.5→v1.5 fix — is already merged and its SSoT edit is preserved, so it's the foundation S3–S5 build on.)*

### PHASE 2 — Switch the tool to the SSoT and remove the copies
*App repo — and here we DO get Vercel PR previews, so each stage is reviewable before merge.*

**S6 — Re-point the 8 content tabs to the SSoT** · *M · app repo*
Each content tab renders the (now complete + correct) SSoT via the existing DocumentFrame, at its section, in embed mode. Fix the Big Picture mapping. **Top nav stays exactly as-is (Choice 2).** App-machinery tabs (Phase 0, Library, Resources) untouched. *Verify on Vercel preview: every tab shows the right section, no double nav, EN/TR + click-to-detail work, nav unchanged.* The moment this merges, the team sees the complete single-source content on every tab.

**S7 — Retire the dead React content layer** · *S–M · app repo*
Delete the 8 React content components + children, and the orphaned `app/_data` content files. **Step 0 first lists what app-machinery still needs** (e.g. `i18n.ts`, `nav.ts`, `resources.ts`) so we delete only orphans. Delete the duplicate `docs/` in the app repo. *Verify on preview: build clean, all tabs + machinery work, no broken imports.*

**S8 — Retire redundant standalone docs + tidy the Library** · *S · content repo · optional/deferrable*
The standalone section docs (01–07) are now superseded by the SSoT. Remove them from the Library manifest (or the repo), leaving the Library = the SSoT + process docs (ADRs, runbook, schedule patch, reconciliation). *Verify Library renders.* Lowest priority — harmless if deferred.

---

## What each phase resolves

| Structural bug found tonight | Resolved by |
|---|---|
| Content tabs ≠ canonical docs (the v1.5 mystery) | S6 — tabs render the SSoT |
| `app/_data` hand-extracted copy drifts | S7 — deleted |
| Duplicate `docs/` in app repo (already drifted) | S7 — deleted |
| Two repos confusion | already runtime-resolved (production reads content repo); S7 removes the misleading copy |
| Redundant standalone docs | S8 — retired |
| The v0.5 / timeline / prereq content errors | R1 (done) + S3 + S4, all on the one source |

## Expectations while in flight

- **During Phase 1**, the **Library** will show the improving SSoT while the **content tabs still show the old React versions** — that divergence is *expected* and resolves at S6. (Flagging it so it doesn't look like a new bug if you check mid-migration.)
- **Production never breaks**: Phase 1 doesn't touch what the tabs render; Phase 2 switches them with preview verification first.
- **Verification paths**: SSoT/content stages → open the self-contained file standalone before merge. App stages → Vercel PR preview before merge.

## Effort shape

Mostly S/M stages. The one heavier stage is **S2** (click-to-detail + embed), and even that is lighter than it looks if the connection data is already in the SSoT. Deletion stages (S7) reduce code. Net: the tool gets **smaller and simpler**, not bigger.

---

**If this sequence looks right, I'll start with S1** (the decision record + tab↔section mapping — quick, and it's the reference the rest follow). Or if you want to go straight to the real work, S2. Your call on where we begin.
