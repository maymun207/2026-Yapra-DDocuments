# Charter amendments v1 — commit guide

Same workflow as yesterday's EAIP update: commit canonical files to
`agbuilder-platform/revolutionize@main`; TheBluePrint23 frames them via
DocumentFrame, so **no app-repo change is needed** for item 1. The manifest
is the contract for item 2.

## 1. Replace the charter (renders immediately on the Charter tab + Library)

```
docs/architecture/08_leadership_charter_bilingual.html   ← REPLACE with the new file
```

What changed (additive only — all prior sections untouched):
- New section **"Program amendments v1 (CA-1 … CA-7)"** — bilingual, same item style as the gates section.
- New section **"Phase 1 exit gate — canonical five + amendment additions"** — the five canonical items verbatim from `07_revolutionize_schedule.html`, plus +A1/+A2/+A3 added by amendment, plus the reconciliation record.
- Subtitle now carries `amendments v1 (2026-06-11)` in both languages.

Verified before handoff: Node smoke test rendered both EN and TR with a DOM
stub — 39 assertions green (canonical five verbatim, CA-1…7 both languages,
+A items, recon note, no regression on the 14 pre-existing sections,
technical identifiers untranslated in TR). Pattern #16 checked: exactly one
`</script>` in the file.

## 2. Library: program plan v1.1 (new document)

```
docs/library/program_plan_phase0_phase1_v1_1.md   ← NEW
```

Then add an entry to `docs/library/manifest.json`. **Match the existing
manifest's exact field schema** (copy an existing process-doc entry such as
`dev_schedule_patch_v1` and edit); suggested values:

- id: `program_plan_v1_1`
- title: `Program Plan — Day 1 → Phase 1 Exit (v1.1)`
- file: `docs/library/program_plan_phase0_phase1_v1_1.md`
- category: same category as the runbook / dev schedule patch (process)

Path-mismatch is safe as before — a wrong path renders "not yet available",
nothing breaks.

## 3. Supersession note

v1.1 supersedes the `program_plan_phase0_phase1_v1.md` from this morning's
session. If v1 was already committed, replace it (or keep both and point the
manifest at v1.1 only — do not list both). Only change in v1.1: the Week-9
exit-gate table is reconciled to the canonical schedule wording (X2 insertion
moved to +A1; "live in production" restored to X5).

## 4. One reconciliation left open — by design

The **A7 contract** (`docs/contracts/resource_allocation_v1.md`) does not
exist yet — it is a Week-0/1 A-track deliverable (CTO drafts, you sign).
Both the charter and the plan already state: **once signed, the contract's
wording governs the 3+3→1+5 triggers**; if it differs from +A3, the contract
wins. After signing, ping me and I do the final wording pass — a one-line
diff at most.

## Suggested commit message

```
charter: program amendments v1 (CA-1..CA-7) + Phase 1 exit gate reconciled

- 08_leadership_charter_bilingual.html: add bilingual amendments section
  and exit-gate section (canonical five verbatim from 07 schedule + A1-A3
  amendment additions + reconciliation record)
- docs/library: add program_plan_phase0_phase1_v1_1.md (exit gate
  reconciled; supersedes v1)
- manifest.json: add program plan entry
```
