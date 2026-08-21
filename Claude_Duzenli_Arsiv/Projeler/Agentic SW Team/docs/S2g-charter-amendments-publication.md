# Stage S2g — Charter amendments v1 + program plan v1.1 publication

> **Stage type:** content-repo publication (governance documents)
> **Repo:** `agbuilder-platform/revolutionize` @ `main`
> **Author:** Claude (single-author rule, dev_schedule §9)
> **Date:** 2026-06-11
> **Model recommended:** Claude Sonnet 4.6, thinking mode (mechanical publication stage; operator may select Opus)
> **Model used actual:** [AG fills in lessons.md self-report]
> **Estimated size:** S — Antigravity 15–25 min · human review 15–20 min
> **Merge mode:** **operator-gated — AG opens the PR, reports, and STOPS. AG does NOT merge.** Operator runs the manual check and signals merge separately.
> **Predecessor:** S2f (Phase filter) — merged at `34c6bb7`
> **Successor:** none scheduled in this group (S2e deferred to late M0/early M1)

---

## 1. Goal

Publish three governance changes to the content repo in **one PR**:

1. **Replace** `docs/architecture/08_leadership_charter_bilingual.html` with the amended charter (adds two new bilingual sections: "Program amendments v1 (CA-1 … CA-7)" and "Phase 1 exit gate — canonical five + amendment additions"; all 14 pre-existing sections unchanged).
2. **Add** `docs/library/program_plan_phase0_phase1_v1_1.md` (new library document).
3. **Update** `docs/library/manifest.json` with one new entry for the program plan, matching the manifest's existing field schema exactly.

After merge, TheBluePrint23 renders both automatically via DocumentFrame / the Library hub — **no app-repo change is part of this stage.**

---

## 2. Prerequisites

- Operator has placed the two payload files in `_incoming/` at the workspace root **before this prompt runs**:
  - `_incoming/08_leadership_charter_bilingual.html` (expected size: **48,216 bytes**)
  - `_incoming/program_plan_phase0_phase1_v1_1.md`
  - (A third downloaded file, `charter-amendments-commit-guide.md`, is operator documentation — it is **NOT committed** in this stage.)
- Clean `git status` on `main` before starting (additive-over-destructive rule).
- `node` available for the smoke test.

---

## 3. Step 0 — Mandatory reads & baseline verification (before ANY write)

Read-before-code discipline. Complete ALL of these and record findings in the PR body:

**0.1 — Verify the incoming payload is the right payload.**
- `_incoming/08_leadership_charter_bilingual.html` exists; byte size = 48,216 (±0 — exact). It MUST contain ALL of these marker strings (verbatim):
  - `Program amendments v1 (CA-1 \u2026 CA-7)` *(check the source for the escaped form `\u2026` OR the rendered `…` — the source uses `\u2026`)*
  - `The first product is live in production.`
  - `Mutabakat kayd\u0131 (2026-06-11)`
  - `var AMEND=[`, `var XGATE=[`, `var XADD=[`
- It MUST contain **exactly one** literal `</script>` (Pattern #16 invariant).
- `_incoming/program_plan_phase0_phase1_v1_1.md` exists and contains the marker strings `(v1.1)` (in the H1) and `Reconciliation record (2026-06-11)`.
- If any marker or the size check fails → **report BLOCKED** ("payload mismatch — wrong or modified files in `_incoming/`"). Do not proceed.

**0.2 — Verify the repo baseline charter is the expected predecessor.**
Read the current `docs/architecture/08_leadership_charter_bilingual.html` in the repo:
- It MUST contain `succ_note:` and `var OPENS=[` (known baseline markers).
- It MUST **NOT** contain `var AMEND=[` (i.e., the amendments are not already applied — if they are, report BLOCKED: "amendments already present; possible double-application").
- Record its byte size in the PR body. Expected baseline ≈ 35,625 bytes; if it differs by more than ±2,000 bytes, **report BLOCKED** ("repo charter has drifted from the known baseline — architect must re-verify before overwrite"). Do not overwrite a drifted file.

**0.3 — Read `docs/library/manifest.json` in full.**
- Record the exact field names used by existing entries (e.g., `id`, `title`, `file`, `category` — use whatever the manifest actually uses; **the manifest is the contract, do not invent fields**).
- Record the exact `category` value used by `phase_0_runbook` and/or `dev_schedule_patch_v1` entries — the new entry uses the same category value verbatim.
- Check whether any entry already references `program_plan_phase0_phase1_v1.md` (the superseded v1). Record yes/no.

**0.4 — Check whether `docs/library/program_plan_phase0_phase1_v1.md` exists in the repo.** Record yes/no. (Edge case §7 governs what to do.)

---

## 4. Detailed task

Branch from `main`: `s2g-charter-amendments-v1`.

**T1 — Charter replacement (full-file, verbatim).**
Copy `_incoming/08_leadership_charter_bilingual.html` over `docs/architecture/08_leadership_charter_bilingual.html` **byte-for-byte**. Do not reformat, re-indent, re-encode, "fix" escapes, or alter the file in ANY way. The `\u2019`-style escapes and the single `</script>` are deliberate. Post-copy check: committed file size = 48,216 bytes.

**T2 — Program plan publication (new file, verbatim).**
Copy `_incoming/program_plan_phase0_phase1_v1_1.md` to `docs/library/program_plan_phase0_phase1_v1_1.md` byte-for-byte.

**T3 — Manifest entry (one addition).**
Append one entry to `docs/library/manifest.json`, using the EXACT field schema discovered in Step 0.3. Values:
- id: `program_plan_v1_1`
- title: `Program Plan — Day 1 → Phase 1 Exit (v1.1)`
- file: `docs/library/program_plan_phase0_phase1_v1_1.md`
- category: the same value as the runbook / dev-schedule-patch entries (verbatim from Step 0.3)
- Any other fields the schema requires: mirror the runbook entry's pattern; if a required field's correct value is not inferable, **stop and report BLOCKED** rather than guessing (exact-identifiers rule).
Preserve the manifest's existing key order, indentation style, and trailing-comma/no-trailing-comma convention.

**T4 — Supersession handling** — only per the Step 0.4 finding; see §7 Edge cases.

**T5 — Smoke test.** Create `scratch/s2g-smoke.js` with EXACTLY the script in §6 and run `node scratch/s2g-smoke.js` from the repo root. All assertions must print `ok:`; exit code 0. Paste the full output into the PR body. Delete `scratch/` before opening the PR (scratch is never committed).

**T6 — Open the PR** titled `S2g: charter amendments v1 (CA-1..CA-7) + program plan v1.1 library publication`, body containing: Step 0 findings (0.1–0.4), the smoke-test output, the manifest diff, and file-size confirmations. **Then STOP. Do not merge. Report and wait for the operator.**

---

## 5. Scope boundaries

- **In scope:** exactly 3 files — the charter (replace), the plan v1.1 (add), the manifest (one entry; plus the §7 removal if and only if that edge case applies).
- **Out of scope — do NOT touch:** the v6 SSoT, the v5 SSoT, any other `docs/architecture/*.html`, ADRs, stage prompts, lessons files, anything in `maymun207/TheBluePrint23` (the app repo is untouched by this stage), the commit-guide file (operator doc, not committed).
- **No content authoring.** AG copies verbatim payloads. If AG believes the payload contains an error, report it in the PR body — do not fix it.

---

## 6. Acceptance criteria + smoke test (verbatim script)

Acceptance:
1. `git diff main --stat` shows exactly the in-scope files (3, or 4 if §7 removal applies).
2. Committed charter = 48,216 bytes; exactly one `</script>`.
3. `node scratch/s2g-smoke.js` → all `ok:`, exit 0.
4. `docs/library/manifest.json` parses as valid JSON and contains exactly one entry whose `file` is `docs/library/program_plan_phase0_phase1_v1_1.md`; no entry references the superseded v1 path.
5. PR open, AG stopped, nothing merged.

```js
// scratch/s2g-smoke.js — run from repo root
const fs = require('fs');
const html = fs.readFileSync('docs/architecture/08_leadership_charter_bilingual.html', 'utf8');
const assert = (c, m) => { if (!c) { console.error('FAIL:', m); process.exit(1); } console.log('ok:', m); };

// Pattern #16 + size
assert((html.match(/<\/script>/g) || []).length === 1, 'exactly one closing script tag');
assert(Buffer.byteLength(html, 'utf8') === 48216, 'charter byte size 48216');

// Render both languages with a DOM stub
const m = html.match(/<script>([\s\S]*)<\/script>/);
assert(!!m, 'script block extracted');
const els = {};
global.document = {
  getElementById: id => els[id] || (els[id] = { innerHTML: '', textContent: '', classList: { toggle() {} } }),
  documentElement: { lang: 'en' }
};
eval(m[1]);                       // runs setLang('en')
const en = els['main'].innerHTML;
setLang('tr');
const tr = els['main'].innerHTML;

// Canonical five — verbatim (EN)
assert(en.includes('Telemetry flows end-to-end and is queryable.'), 'X1 canonical EN');
assert(en.includes('The LiteLLM gateway routes with per-agent cost attribution.'), 'X2 canonical EN');
assert(en.includes('MCP servers enforce the capability allowlist at boot.'), 'X3 canonical EN');
assert(en.includes('v1 agents ship human-reviewed PRs through the verification gate.'), 'X4 canonical EN');
assert(en.includes('The first product is live in production.'), 'X5 canonical EN');

// Amendments + additions + recon, both languages
for (let i = 1; i <= 7; i++) { assert(en.includes('CA-' + i), 'CA-' + i + ' EN'); assert(tr.includes('CA-' + i), 'CA-' + i + ' TR'); }
['+A1', '+A2', '+A3'].forEach(a => { assert(en.includes(a), a + ' EN'); assert(tr.includes(a), a + ' TR'); });
assert(en.includes('Reconciliation record (2026-06-11)'), 'recon EN');
assert(tr.includes('Mutabakat kayd\u0131'), 'recon TR');
assert(en.includes('Program amendments v1'), 'section header EN');
assert(tr.includes('Program de\u011fi\u015fiklikleri v1'), 'section header TR');
assert(tr.includes('\u0130lk \u00fcr\u00fcn \u00fcretimde canl\u0131d\u0131r.'), 'X5 TR');

// No regression on pre-existing sections
assert(en.includes('No rubber-stamp review'), 'GATES intact EN');
assert(tr.includes('\u0130mza-atma incelemesi yok'), 'GATES intact TR');
assert(en.includes('Mandate') , 'mandate EN intact');
assert(tr.includes('G\u00f6rev'), 'mandate TR intact');

// Technical identifiers untranslated in TR
['lessons.md', 'caps.yaml', 'Stage 1.4.2', 'docs/contracts/resource_allocation_v1.md', 'LiteLLM', 'MCP', 'TLA+']
  .forEach(t => assert(tr.includes(t), 'identifier in TR: ' + t));

// Manifest
const man = JSON.parse(fs.readFileSync('docs/library/manifest.json', 'utf8'));
const flat = JSON.stringify(man);
assert(flat.includes('docs/library/program_plan_phase0_phase1_v1_1.md'), 'manifest points at plan v1.1');
assert(!flat.includes('program_plan_phase0_phase1_v1.md"'), 'manifest does not reference superseded v1');

// Plan file markers
const plan = fs.readFileSync('docs/library/program_plan_phase0_phase1_v1_1.md', 'utf8');
assert(plan.includes('(v1.1)'), 'plan is v1.1');
assert(plan.includes('Reconciliation record (2026-06-11)'), 'plan recon record');
assert(plan.includes('The first product is live in production'), 'plan X5 canonical');

console.log('\nS2g smoke complete — all green');
```

---

## 7. Edge cases

- **`_incoming/` files absent or markers fail (Step 0.1):** BLOCKED — "payload missing/mismatched". Never substitute content from memory or regenerate the files.
- **Repo charter already contains `var AMEND=[` (Step 0.2):** BLOCKED — possible double-application; the operator decides.
- **Repo charter size drifted > ±2,000 bytes from 35,625 (Step 0.2):** BLOCKED — baseline drift; architect re-verifies. Overwriting a drifted canonical file silently is the exact failure class this program eliminates.
- **`docs/library/program_plan_phase0_phase1_v1.md` exists in the repo (Step 0.4 = yes):** delete it in the same PR AND remove/replace its manifest entry so the manifest lists v1.1 only. Note the removal in the PR body. (Step 0.4 = no): nothing to remove.
- **Manifest schema has a required field whose value can't be safely inferred:** BLOCKED, quote the field — never guess identifiers.
- **Manifest uses an unexpected category taxonomy:** use the runbook entry's category verbatim, whatever it is; note it in the PR.

---

## 8. Operator verification (Maymun — before signaling merge)

1. Open the PR diff: confirm 3 files (or 4 with the §7 removal), charter diff is a full-file replacement, manifest diff is one entry (± one removal).
2. Confirm the smoke-test output in the PR body ends `S2g smoke complete — all green`.
3. Download the PR's charter file (or open the raw branch file) standalone in a browser: toggle **EN/TR**; scroll to the bottom — two new sections render (CA-1…CA-7 items, then the exit-gate section: X1–X5, "+added by amendment" subheading, +A1–+A3, green reconciliation note); all earlier sections (gates, routing table, risks, kickoff timeline, open items, succession) still render in both languages.
4. If all pass → signal: **`"Approved — merge S2g"`**. AG merges, confirms the merge SHA, cleans up the branch and `_incoming/`.
5. Post-merge (operator): open theblueprint23.dev → Charter tab → confirm the amended charter renders inside the DocumentFrame; open Library → confirm "Program Plan — Day 1 → Phase 1 Exit (v1.1)" appears.

---

## 9. Antigravity configuration & watch-fors

**Six operating rules apply** (no `.env` access · BLOCKED-not-false-success · exact identifiers only · cross-phase verification · no raw secrets · additive-over-destructive).

Watch for — reject/redo if AG does any of these:
- "Improving" the charter HTML: reformatting, prettifying, converting `\u2019` escapes to literal characters, adding a DOCTYPE meta change, or otherwise producing a committed file ≠ 48,216 bytes. **Verbatim copy only.**
- Re-authoring the manifest entry with invented field names instead of mirroring the schema read in Step 0.3.
- Translating technical identifiers anywhere (`caps.yaml`, `lessons.md`, stage IDs stay as-is in both languages).
- Declaring done without the smoke-test output pasted in the PR body — the output is the evidence, an AG summary is not (Artifacts are not proof).
- Committing `scratch/`, `_incoming/`, or the commit-guide file.
- **Merging.** This stage is operator-gated; AG opens the PR and stops.

---

## 10. Lessons.md template

After merge, AG creates `prompts/v0/S2g-lessons.md`:

```md
# S2g Lessons

**Stage:** S2g — Charter amendments v1 + program plan v1.1 publication
**Executed:** 2026-06-XX
**Operator:** Maymun · **Reviewer:** Maymun (+ CTO async)
**Merge mode:** operator-gated
**Result:** [✅ / ❌]

## § Antigravity self-report
**AUTHORED-BY: Antigravity**
**Stage size actual:** [Xm] (estimated S: 15–25 min)
**Model used actual:** [model]
**Step 0 findings:** payload size [bytes] · baseline charter size [bytes] · manifest schema fields [list] · category value used [value] · superseded v1 present in repo [yes/no]
**Smoke test:** [all green ✅ / failures]
**Files changed:** [list]
**Anything rejected/redone:** [...]

## § Operator review (Maymun)
**AUTHORED-BY: Maymun**
**PR diff scope correct (3–4 files):** [✅/❌]
**Standalone EN/TR render check passed:** [✅/❌]
**Post-merge theblueprint23.dev Charter tab + Library check:** [✅/❌]
**Things AG self-report missed:** [≥ 1 bullet]
**Approval signal given at:** [timestamp]

## § Prompt-author retrospective (Claude)
**AUTHORED-BY: Claude** — appended post-merge.
```

---

**End of Stage S2g prompt.** Operator pre-step before firing: create `_incoming/` in the workspace and place the two downloaded payload files there (charter HTML + plan v1.1 md). Then paste this prompt to AG.
