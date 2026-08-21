# Stage S2g-R2 (rev 3) — Charter amendments v1 + program plan v1.1 publication (anchored-insertion model)

> **Rev 3 (2026-06-11):** rev 1 BLOCKED (curly quotes mangled in transit); rev 2 BLOCKED (AG's file-write tooling interprets \uXXXX sequences, so pasted text can never be byte-faithful — correctly caught by the new hash tripwire). **Rev 3 changes the delivery channel:** both scripts now arrive as FILES in `_incoming/` (the file channel is proven byte-faithful — the plan payload hash-verified through it). AG copies them with shell `cp` ONLY (never an editor or write tool, which reinterprets escapes), hash-verifies, runs. Any AG-reconstructed script from the rev 2 attempt must be deleted first — an unverifiable reconstruction never runs against the canonical repo, regardless of structural plausibility. Amendment content unchanged throughout.

> **Supersedes S2g-R1 / PR #10 (unmerged — to be closed in T0).** R1's payload was built on a charter baseline that predated commit `662fe75` (the v0.5 → v1/v1.5/v2 version-model reconciliation + `mandate_p3`); merging it would have reverted that commit. The drift guard caught it. **R2 changes the model:** instead of replacing the charter with a pre-built file, AG applies the amendments as six anchored operations directly onto whatever is on `main`, via a Claude-authored script run unmodified. This is drift-immune by construction and removes all operator file-shuttling. The amendment CONTENT is unchanged from R1 and remains Claude-authored (single-author rule).

> **Stage type:** content-repo publication (governance documents)
> **Repo:** `agbuilder-platform/revolutionize` @ `main`
> **Author:** Claude (single-author rule)
> **Date:** 2026-06-11
> **Model recommended:** Claude Sonnet 4.6 thinking (operator may select Opus)
> **Estimated size:** S — AG 15–25 min · human review 15–20 min
> **Merge mode:** **operator-gated — AG opens the PR, reports, STOPS. AG does NOT merge.**
> **Predecessor:** S2f (`34c6bb7`) · S2g first run: rejected · S2g-R1 / PR #10: superseded, unmerged
> **Dry-run status:** the apply script + smoke test below were executed by the author against a simulated post-`662fe75` baseline before handoff — diff signature `+34 -2`, 53 assertions green; rev 2 scripts re-dry-run end-to-end after the ASCII hardening.

---

## 1. Goal

One PR containing:
1. Charter amendments applied **in place** to `docs/architecture/08_leadership_charter_bilingual.html` on top of live `main` (which includes `662fe75`).
2. `docs/library/program_plan_phase0_phase1_v1_1.md` added (payload from `_incoming/`, hash-verified).
3. One manifest entry added to `docs/library/manifest.json`.

No app-repo changes. After merge, TheBluePrint23 renders everything automatically.

---

## 2. Prerequisites

- Operator has placed THREE files in `_incoming/`:
  - `_incoming/program_plan_phase0_phase1_v1_1.md` — SHA-256 `e862ff9cff0a77957e040033047e53ec2bf62c389d060972875b756c5bc743ef`
  - `_incoming/apply_s2g_r2.py` — SHA-256 `36ff904673fcbde560d36eb697adccc52f5a5b98a6dbe9165951cd510e3a15b1`
  - `_incoming/s2g-r2-smoke.js` — SHA-256 `e79a22f04a15d920e9375a51e0c7a870680e844d965c36728fd318a32ff94445`
- **Any charter HTML file in `_incoming/` is OBSOLETE** (pre-`662fe75` base). Ignore it entirely; do not use, copy, or commit it. (Operator may delete it at leisure.)
- `node` and `python3` available. Clean `git status` on up-to-date `main`.

---

## 3. Step 0 — Tripwires (before ANY write)

> **TRIPWIRE RULE:** every check is a tripwire, not a work item. Failing check → STOP, report BLOCKED with the observed value. Never mutate any file, payload, or test to make a check pass — that was the first run's defining failure and is an automatic reject. The apply script runs **unmodified, byte-for-byte as given**; editing it in any way is a reject.

**0.0 — Repo identity + freshness.** `git remote -v` → must be `agbuilder-platform/revolutionize`, else BLOCKED. `git checkout main && git pull` → up to date. Clean status (only `_incoming/` untracked).

**0.1 — Plan payload hash.** `shasum -a 256 _incoming/program_plan_phase0_phase1_v1_1.md` must equal `e862ff9c…43ef` (full hash above). CRLF-normalize a copy and re-hash if it differs; still differs → BLOCKED.

**0.2 — Charter baseline tripwires** (on `docs/architecture/08_leadership_charter_bilingual.html`):
- Contains `mandate_p3` AND `B(c.mandate_p3)` (the `662fe75` reconciliation) — absent → BLOCKED.
- Does NOT contain `var AMEND=[` — present → BLOCKED (double-application).
- Record byte count, char count, and SHA-256 of the baseline in the PR body (informational; as of authoring, main = 38,148 bytes / 36,820 chars — if it differs, main moved again: still fine, the script's own anchor checks are the gate).
- Anchor uniqueness is enforced **inside the apply script itself** — it aborts without writing if any of its six anchors does not occur exactly once. An abort message is a BLOCKED report, verbatim, to the operator.

**0.3 — Manifest read.** Read `docs/library/manifest.json` in full; record field names and the `category` value of the runbook / dev-schedule-patch entries. Check for any reference to the superseded `program_plan_phase0_phase1_v1.md`; record yes/no.

---

## 4. Detailed task

**T0 — Close out R1.** Close PR #10 with the comment: `Superseded by S2g-R2 — R1 payload predated 662fe75; see stage prompt.` Delete branch `s2g-charter-amendments-v1`. Do not merge anything from it.

**T1 — Branch.** From fresh `main`: `s2g-r2-charter-amendments`.

**T2 — Apply the charter amendments.** First delete any leftover `scratch/apply_s2g_r2.py` from the rev 2 attempt (unverifiable reconstruction). Then `mkdir -p scratch && cp _incoming/apply_s2g_r2.py scratch/` — **shell `cp` only; never recreate the file via an editor or write tool** (they reinterpret escapes). Verify SHA-256 against the §6 tripwire, then run `python3 scratch/apply_s2g_r2.py` from the repo root. Expected output: `APPLIED OK -- chars: <n> bytes: <m>`. Any `ABORT` output → BLOCKED, report verbatim, stop.

**T3 — Plan + manifest.** Copy `_incoming/program_plan_phase0_phase1_v1_1.md` (or its CRLF-normalized copy) to `docs/library/program_plan_phase0_phase1_v1_1.md`; post-copy SHA-256 must equal the canonical hash. Append one manifest entry using the EXACT schema from Step 0.3: id `program_plan_v1_1`, title `Program Plan — Day 1 → Phase 1 Exit (v1.1)`, file `docs/library/program_plan_phase0_phase1_v1_1.md`, category = runbook entry's value verbatim. Uninferable required field → BLOCKED. Preserve key order / indentation / comma conventions. If Step 0.3 found a superseded-v1 reference: delete that file + its entry in this same PR and note it.

**T4 — Diff signature.** `git diff main --numstat -- docs/architecture/08_leadership_charter_bilingual.html` must print exactly `34	2	docs/architecture/08_leadership_charter_bilingual.html`. Any other numbers → BLOCKED (do not "fix" the diff). This signature is a property of the patch, independent of baseline content.

**T5 — Smoke test.** `cp _incoming/s2g-r2-smoke.js scratch/` — shell `cp` only. Verify SHA-256 against the §7 tripwire, then run `node scratch/s2g-r2-smoke.js` from the repo root. All `ok:`, ending `S2g-R2 smoke complete -- all green`. The `info: v0.5 occurrences` line is informational — expected `0` on real main; if non-zero, report the count in the PR body, do not edit anything. Failures → BLOCKED, never modification. Delete `scratch/` before the PR.

**T6 — PR.** Title `S2g-R2: charter amendments v1 (CA-1..CA-7) + program plan v1.1 — anchored on main`. Body: Step 0 findings, apply-script output line, numstat line, full smoke output, manifest diff, SHA-256 confirmations. **Then STOP. Do not merge.**

---

## 5. Scope boundaries

In scope: the charter (in-place amendment via the script), the plan v1.1, the manifest (+ superseded-v1 removal only if Step 0.3 found it). Out of scope: everything else — v5/v6 SSoT, other architecture HTMLs, ADRs, lessons files, anything in `maymun207/TheBluePrint23`, `_incoming/` contents (never committed), the obsolete charter payload. **No content authoring; no script editing.** Believed payload/script error → report in PR body, do not fix.

---

## 6. The apply script — delivered as `_incoming/apply_s2g_r2.py`

Authored by Claude; pure ASCII; self-asserting (six anchor-uniqueness checks, double-application check, 662fe75-presence check, Pattern #16 check; aborts without writing on any failure).

**Transit tripwire — after `cp` to `scratch/`, BEFORE executing:** `shasum -a 256 scratch/apply_s2g_r2.py` MUST equal
`36ff904673fcbde560d36eb697adccc52f5a5b98a6dbe9165951cd510e3a15b1`.
Mismatch → BLOCKED. Do not run, do not repair, do not reconstruct — report both hashes to the operator.

Operator review: open the file in any viewer; it is 40 lines and human-readable (content blocks are \uXXXX-escaped).

---

## 7. The smoke test — delivered as `_incoming/s2g-r2-smoke.js`

**Transit tripwire — after `cp` to `scratch/`, BEFORE executing:** `shasum -a 256 scratch/s2g-r2-smoke.js` MUST equal
`e79a22f04a15d920e9375a51e0c7a870680e844d965c36728fd318a32ff94445`.
Mismatch → BLOCKED, same rule as §6.

---

## 8. Edge cases

- **Script SHA-256 transit tripwire fails (§6/§7) after a shell `cp` from `_incoming/`:** BLOCKED — report both hashes; the operator re-downloads the file. Never repair, regenerate, or reconstruct a script (rev 1 and rev 2 failure modes). Structural plausibility is not verification.
- **Apply script prints ABORT:** BLOCKED — paste the abort line to the operator. The likely cause is an anchor changed on main since authoring; the architect re-issues anchors. Never adjust the script or the charter to get past it.
- **numstat ≠ `34 2`:** BLOCKED — same rule.
- **PR #10 close fails / branch delete fails:** report, continue with T1 anyway (stale PR is an operator cleanup, not a blocker).
- **main moves between T1 and T6:** rebase the branch on main, re-run T2-from-scratch on the rebased file ONLY IF the charter file itself changed upstream (script will re-abort on double-application otherwise — in that case reset the branch to fresh main and redo T2–T5); report what happened.
- **Manifest field uninferable / unexpected taxonomy:** BLOCKED / use runbook's category verbatim and note it.

---

## 9. Operator verification (Maymun — before signaling merge)

1. PR diff: charter shows ~34 added / 2 modified lines (additions only at three insertion points + two subtitle lines); plan file added; manifest +1 entry.
2. Smoke output in PR body ends `S2g-R2 smoke complete -- all green`; note the `info: v0.5` count (expect 0).
3. Standalone render check of the branch charter: EN/TR toggle; mandate section shows THREE paragraphs incl. the version-model one (v1 → v1.5 → v2); bottom shows CA-1…CA-7 + exit-gate section (X1–X5, +A1–+A3, green reconciliation note); subtitle shows `amendments v1 (2026-06-11)`.
4. All pass → signal **`"Approved — merge S2g-R2"`**. AG merges, reports merge SHA, deletes branch.
5. Post-merge: theblueprint23.dev → Charter tab + Library check for the v1.1 plan entry.

---

## 10. Watch-fors

- Editing the apply script or smoke script in ANY way — byte-for-byte or reject.
- Touching the obsolete charter payload in `_incoming/`.
- Any mutation aimed at making a tripwire pass (numstat, anchors, smoke). Tripwires fail → BLOCKED.
- Manifest authored fresh instead of edited.
- Declaring done without the smoke output in the PR body (Artifacts are not proof).
- Committing `scratch/` or `_incoming/`. Merging. Both forbidden.

---

## 11. Lessons.md

After merge, `prompts/v0/S2g-lessons.md` covers all three runs (rejected first run, superseded R1, merged R2) with the standard three AUTHORED-BY sections. Claude retrospective will log: defect Pattern #19 (sizes in bytes only / prefer hashes), the project-knowledge staleness root cause behind R1, and the model change to anchored insertions as the durable fix.

**End of Stage S2g-R2 prompt.** Operator pre-step: download `apply_s2g_r2.py` and `s2g-r2-smoke.js` from the chat and place them in `_incoming/` next to the plan payload (verify all three hashes if you like — AG re-verifies regardless). Then fire.
