# PHASE-CENSUS-CONSOLE-2 · v1
**Lane: AG-1 · standalone (OUTSIDE Dalga 8, owner ruling S101) · SC-A class: UI + view-model only, NO migrations, NO seal-relevant surfaces unless drift gate demands reseal, NO turn-pipeline contact.**

**PRECONDITION (S47-1):** `origin/master` = `2caaffba383a3bb0485d9d8438a5a07ee7d9747d` (rev 262). If origin has moved, STOP and report the new hash before writing anything.

**Branch:** `phase/census-console-2` · push to origin · open a PR against `master` for CI (S37-2 arbiter). PR CI: `total_count:0` is ALWAYS FAILED (A-REC-S100-1).
**Report file:** `docs/relay/PHASE-CENSUS-CONSOLE-2-report.md`

---

## 0 · WHY (the owner-observed defect, verbatim intent)

The owner opened MİKROSKOP → Tool Census on production (bc5372f, GLOBAL·prod) and could not answer, unaided:
1. *"What is this screen for?"*
2. *"I see a tool row — what am I supposed to DO about it, and is it even my job?"*
3. The armes card renders ~97 rows as one flat unwindowed list; the first viewport showed only superset/system (all-zero cards), so the only card with real data was invisible without scrolling.

This closes reopened item **#56** and the S100 "scrollbox + single-viewport blind spot" finding as ONE phase (MERGED-INTO recorded by the Architect at session close).

**Design law of this phase:** every verdict already has a deterministic OWNER and a deterministic NEXT ACTION. The screen must SAY them. No LLM anywhere in this mapping (ADR-001 spirit: deterministic code, never a judge).

## 1 · LIVE-READ FIRST (S65-1 / D-1)
Open with a live read and paste into the report:
- `src/components/admin/CensusTab.tsx` (269 lines today) and `src/components/admin/censusConsole.ts` (the view-model: `verdictBadge`, `namedVerdicts`, `reasonPhrase`, `attributionLabel`).
- `api/cwf/_lib/backends/censusConsoleView.ts` — the verdict/reason vocabulary as it exists in CODE (do not retype from this prompt; COMPUTED-NOT-ASSERTED).
- One production API response of the census console read (shape only, values redacted if any).

## 2 · REQUIREMENTS

**R1 — Action mapping (the heart).** Extend the view-model (`censusConsole.ts`, pure + unit-tested) with a deterministic function `actionForVerdict(verdict, reasonCode, attribution) → { owner: 'nobody'|'backend-vendor'|'system-auto'|'us-annotation', actionPhrase: string }`:
- `answered` → nobody · "Healthy — nothing to do."
- `excluded by law` → nobody · "ADR-011 safety exclusion working as designed — not a missing measurement."
- `unread` + `required-param-unresolvable` + THEIRS → backend-vendor · "Vendor must publish a machine-readable default/enum for the named param. Include in vendor report."
- `unread` + `no-specimen-discovered` + OURS → system-auto · "Self-heals on a future discovery run — no human action."
- `unclassified` → us-annotation · "Needs a read/write annotation."
- Any UNKNOWN combination → a visible "unmapped verdict" cell, NEVER silently bucketed (empty≠zero at the render layer). Exhaustiveness enforced by a `never`-check on the verdict union + a test that walks every `namedVerdicts()` × known reason codes.

**R2 — Table hygiene.** Per-backend card becomes: fixed-height windowed table (virtualized or CSS scrollbox — pick one, justify in report; must stay usable at 1000+ rows), tool-name substring search, click-to-filter on verdict chips (the existing count boxes become the filter chips), default sort = action-required first (`us-annotation` > `backend-vendor` > `system-auto` > `nobody`), then tool name.

**R3 — Summary strip.** One line above the cards, computed from the same view-model, e.g.: `97 tools · 19 answered · 44 excluded by law (healthy) · 25 waiting on vendor · 5 self-healing · 9 need annotation · YOUR actions: 9`. Cards ordered data-bearing-first so an all-zero backend can never occupy the first viewport while a data-bearing one hides below the fold.

**R4 — Vendor report export.** A button on the summary strip: "Vendor report (THEIRS)" → downloads a plain markdown file listing every THEIRS row (tool · param · declared type · missing default), generated client-side from already-fetched rows. This continues the `ARDIC-ARMES-arac-notu` line. No new endpoint.

**R5 — Purpose strip pattern (seed only).** Add a one-sentence "what this screen is for + what you do here" header component, used on Tool Census NOW; build it as a reusable component (`TabPurposeStrip`) so later phases can adopt it tab-by-tab. Do NOT touch other tabs in this phase.

**R6 — Honesty invariants preserved byte-for-byte in meaning:** the three "no verdict" states (`unread` / `excluded by law` / `exposure layer unreadable`) and the "census table not installed ≠ empty census" sentence must survive the redesign; a filter that hides rows must still show true totals in the strip (filtered view says "showing N of M", partial≠complete).

## 3 · TESTS
Extend `censusConsoleRender.test.tsx` + view-model unit tests: action mapping exhaustive · unknown-verdict visible · search narrows + strip says N-of-M · sort order property · vendor export contains every THEIRS row and only THEIRS rows · summary math cross-foots to per-verdict counts.

## 4 · DELIVERABLES (kind=phase, R-DELIVERABLES)
```deliverables
branch: phase/census-console-2
report: docs/relay/PHASE-CENSUS-CONSOLE-2-report.md
pr: against master, CI green (unsharded run is the arbiter; total_count:0 = FAILED)
proof: screenshot-equivalent DOM assertions in tests + report names the post-deploy proof read (S63-1): owner reloads Tool Census and reads the summary strip unaided
```
Merge `--no-ff` only after Architect GO (verbatim merge message will follow in the GO relay). If any drift-mapped file changes, reseal in the same commit ONLY if the tree actually changed (S100-1) and bump docVersion.

<!-- END · PHASE-CENSUS-CONSOLE-2-v1 -->
