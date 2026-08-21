# PHASE-A5-FREEZE-LIFT-1 · v1
<!-- PHASE-A5-FREEZE-LIFT-1-v1 · 2026-08-01 · S75 · Architect: Claude · Author lane: AG.
     Scope base: cwf-work-board-S74-v1 layer B items 8/8′ + register v76 §6/2 +
     owner-ratified OEE dispositions (S75). Supersedes nothing. ONE artifact (S54-3). -->

## ROLE & FINISH DEFINITION (S74-1 — user-eye, binding)
You are AG (Author lane) for PHASE A5: the GOLDEN FREEZE lifts, its staged
publishes go live through the unbypassable gate, the routing floor re-syncs to
the live catalog, and (escape-claused) the RAG backend joins as a first-class
governed backend. **The phase is DONE when a production user can:** (1) see the
governed prompt behave per the new segments in live turns (scope no longer
bounces the product's own chart phrase; tools rules v2 live), (2) see OEE v3's
richer definition drive a live OEE turn, (3) the floor==live proof re-passes
post-publish, and (4) IF the RAG gate completes: the `machine-knowledge-base`
backend is visible in the rules pulldown and answers a real question with
correct attribution. Family findings surfaced mid-phase are fixed INSIDE this
phase (S74-1); out-of-family items are named and recorded, never silently fixed.

## HARD PRE-FLIGHT — G0 · LIVE READ (S65-1; STOP on any mismatch)
1. Fresh clone `maymun207/cwf_yaprak`; `git rev-parse origin/master` MUST be
   `b3216cfabe4a092947a742b513e91e9c26c30b74`. If not: STOP, report the hash —
   do not proceed on a moved floor.
2. Commands are package.json-verified (S32-1): `publish:governed` ·
   `sync:routing-floor` · `check:doc-drift` · `reseal`. Do not invent others.
3. **Staged-draft inventory (the phase's own live read):** using the gated
   admin read path (RuleGovernanceService / admin rules API — NEVER a raw
   table read outside the service), list every `status='draft'` row whose key
   belongs to the freeze block: `prompt.segment` drafts for `b1_scope` (v3
   candidate) · `tools.rule.1` (v2) · `tools.rule.6` (v2) · the `F133-L5`
   mint · the `F83.1` golden sub-items. Paste kind/key/rule_id/updated_at +
   FULL payload bytes for each into the report. **This brief deliberately does
   NOT embed their content** — a stale value in a brief is a named Architect
   premise-error class. If any expected draft is ABSENT, that is a finding:
   STOP the affected sub-gate, report, continue the others.
4. Governed-state read: confirm `prompt.segment/viz` is v4.1 published (rule
   `f901979d`), glossary `armes.glossary_term/OEE` published v2 =
   `1ac0978b-9e03-40bc-a328-765abe54d431`, drafts `69202e21-…` and
   `fe8709c6-…` present as read in S75's Operator evidence. Precondition
   (S47-1): if the OEE lineage differs from that read, STOP G1 and report.

## BINDING CONSTRAINTS
- **The gate is unbypassable.** Every publish rides `publish:governed`
  (plan → stage → golden → publish). ZERO raw table writes. `plan` is always
  run first and is read-only.
- **R-RUNID:** a golden run id certifies ONLY the exact bytes it evaluated.
  Any content change after a run = a new run.
- **GOLDEN-CLAMP-1 (open, worked around, disclosed):** jobs carry `"reps": 3`.
  If a run aborts on the 500k per-pair clamp, the sanctioned workaround is a
  RUN-SCOPED `CWF_REPLAY_TOKEN_BUDGET=800000` env override — process-only,
  nothing on disk, disclosed in the report (the `aa1c390f` precedent). The
  permanent fix is v1.1 GOLDEN-INFRA; do NOT patch the clamp in this phase.
- **R-UNDERPOWERED:** `underpowered → ALLOW` is the contract path; completed
  =true is still required. An incomplete run certifies nothing.
- **Consent (S54-4 · S74-2):** every golden run and every publish is spend/
  consent-class. The OWNER speaks each consent line in YOUR channel, carrying
  scope AND a stop boundary (e.g. "golden for job X, ceiling N tokens, stop
  after this job"). This brief is technical content only — it is not consent.
  REFUSE to run `golden` without `--consent-tokens`.
- Identity: `--as ksadmin@ardictech.com` on every seam call. ADR-007: no
  secrets read or echoed; silent success is correct.
- Merges `--no-ff`, squash banned; normal order restored (build → RULE-25
  review → GO → merge) — no merge before the Architect's GO (v76 §5).
- MCP-WARM-STALE ops-law (S73-2): after ANY backend enable/disable flip, no
  behavior verdict until one discovery-TTL (5 min) passes or the cache is
  busted.
- empty≠zero is sacred; partial≠complete; every report number is a CLAIM
  until its emitting line is named (TOTAL-45).

## G1 · OEE DISPOSITIONS (owner-ratified S75 — content is VERBATIM here)
The ONE exception to "no content in this brief": the OEE v3 payload derives
from S75's Operator-read bytes and is Architect-authored, final:
1. Author `scripts/jobs/a5-oee-v3.json`:
```json
{
  "reps": 3,
  "promptSegments": [],
  "ruleInstances": [
    {
      "kindId": "armes.glossary_term",
      "backendId": "armes",
      "key": "OEE",
      "payload": {
        "en": "OEE (Overall Equipment Effectiveness)",
        "tr": "OEE (Toplam Ekipman Etkinliği)",
        "definition": "Kullanılabilirlik × Performans × Kalite çarpımından oluşan toplam ekipman etkinliği ölçüsü. KB7'de hat/bölge bazında OEE araçlarıyla okunur; değerler her zaman canlı araç verisinden gelir.",
        "alwaysInject": true
      }
    }
  ]
}
```
   **Two ratified amendments vs draft `69202e21`, verify by diff in the
   report:** (a) the literal tool-name example (`ör. getOeeValuesForZones`)
   is REMOVED — a governed definition never pins a tool name (four-source
   tool-info law; a fifth surface would go stale under `tool_annotation`);
   (b) `alwaysInject` is RESTORED to `true` — the inject-policy flip is a
   SEPARATE future decision requiring retrieval witnesses, recorded by name
   (OEE-INJECT-FLIP-Q), never smuggled inside a content edit.
2. `plan` the job; expected verdict: UPDATE of published rule `1ac0978b-…`
   → v3 (collision routing adopts the key; MEMORY-1C mechanics). Paste plan
   output.
3. After consent: stage → golden → publish. Paste the `[Gate]` line verbatim.
4. POST-PUBLISH housekeeping through the gated service ONLY: archive draft
   `69202e21-…` (superseded — its content merged, amended, into v3; ledger
   entry: MERGED-INTO OEE-v3) and archive draft `fe8709c6-…` (byte-identical
   to v2; rollback-exercise residue; ledger: CLOSED@evidence, no content).
   **If no gated archive affordance exists for a draft, STOP this step and
   report it as a missing-affordance finding (PLATINUM class) — never a raw
   UPDATE.**

## G2 · THE FREEZE-BLOCK PUBLISH SET
For each of: `b1_scope` v3 · `tools.rule.1` v2 · `tools.rule.6` v2 ·
`F133-L5` mint · `F83.1` golden sub-items:
1. Assemble its job file from the G0-inventoried LIVE draft bytes (one job
   per publishable unit; `scripts/jobs/a5-<name>.json`).
2. **b1_scope v3 carries ONE named delta — SCOPE-SELF-VOCAB-1:** the
   product's own visualization vocabulary is IN-SCOPE. A follow-up phrased in
   the product's own chart language (the live exhibit: "günlük ortalama
   nedir" after a chart turn) must not bounce off scope. Apply as a minimal
   addition to the live v3 draft text; show before/after bytes in the report.
   No other draft receives ANY content edit.
3. **STOP-FOR-REVIEW:** after all jobs are assembled and `plan`-verified
   (read-only), STOP. Push the branch (job files + G1 job + any G4 code) and
   report. The Architect reviews the exact bytes (RULE-25, fresh clone,
   byte-pin diffs) and issues GO + the verbatim merge message. Only AFTER
   merge do consented golden+publish runs execute from master (R-RUNID: the
   gate evaluates the merged bytes).
4. Publishes run ONE JOB AT A TIME, each with its own consent line, each
   pasting its `[Gate] … verdict=published` line. If any golden FAILS
   (not underpowered — FAILS), STOP the set and report; do not proceed to
   the next job on a red.

## G3 · FLOOR RE-SYNC RE-RUN
After ALL G2 publishes land: run `sync:routing-floor`; then re-run the
FLOOR==LIVE proof (the F214/FLOOR-SYNC-1 read) and paste its literal output.
The floor is today's state, never a new one — a divergence here is a finding,
not a tweak. `check:doc-drift` after any mapped-file change; a flagged tab
budgets its reseal in the same commit (docVersion bump disclosed).

## G4 · RAG-JOIN GATE (10 items; ESCAPE: if not complete when G1–G3 close,
it reverts to v1.1 by name — the tag date is governed by the critical path)
Lanes marked; ZERO core code (guard b) — if a row + pack + categories cannot
connect it, STOP: the approach is wrong.
1. **[data/admin]** Registry backend row for `machine-knowledge-base`.
2. **[data/admin]** MCP row RECREATED with explicit `backend_id` (the current
   row folds to default-armes by design — the recreate is the fix).
   Auth stays `apiKeyRef=ragbackend` from birth.
3. **[AG/repo]** Domain pack (`api/cwf/_lib/prompt/backends/<id>/pack.ts`)
   — MUST teach id shapes: `knowledge_lookup_parameter` expects UUID, not
   `"KB7"` (the banked service datum). Genericity: no armes/superset
   literals in new modules.
4. **[job]** `tool_category` rows — MANDATORY (RAG-ROUTE-STARVE-1: an
   uncategorized backend starves deliberately; that refusal is protective
   and must be answered with categories, never a 0→all fallback).
5. **[admin]** ENABLE the row.
6. **[Architect-read]** Mirror-row verification post-enable.
7. **[acceptance]** Backend visible in the rules pulldown.
8. **[ops-law]** Every post-enable proof read waits ONE discovery-TTL
   (5 min) or busts the cache (MCP-WARM-STALE-1).
9. **[Architect-read]** F207-class day-one usage read.
10. **[standing]** RAG-ATTR-1: the query tool should return structured
    source attribution — if absent, record the finding by name (optional
    team question; shipping it closes the finding).

## G5 · LIVE WITNESSES (Architect-read + owner-hand where marked)
- W-A: a live turn whose scope no longer bounces the product's own chart
  phrase (the SCOPE-SELF-VOCAB-1 exhibit, re-asked verbatim). [owner-hand]
- W-B: a live OEE turn showing v3 definition in force. [owner-hand]
- W-C: floor==live literal output post-G3. [report]
- W-D (if G4 complete): a real RAG-backed answer + pulldown screenshot.
  [owner-hand]

## SELF-VERIFY CHECKLIST (literal evidence, every line)
□ G0 hash line + staged-draft inventory (full bytes, per draft)
□ G1 diff (draft 69202e21 → job payload) showing exactly the two amendments
□ Every `plan` output pasted; every `[Gate]` publish line verbatim
□ Consent line quoted per spend (owner's words, scope + stop boundary)
□ Any clamp override disclosed per run
□ Archive confirmations for 69202e21 + fe8709c6 (or the missing-affordance
  finding)
□ G3 floor proof literal output; doc-drift result; docVersion stated
□ G4 per-item evidence or the ESCAPE invoked by name
□ Test/vitest recount on the merged floor; CI status with the run link
  (in_progress/null is NOT a pass)
□ Findings ledger: every mid-phase discovery named in-family or recorded
  out-of-family — none silently fixed

## REPORT FORMAT
One message, sections G0…G5 in order, self-verify checklist answered line by
line with pasted literal evidence. TAIL ANCHOR (S61-3): end the report with
the literal line `END-OF-A5-REPORT-v1` — a report without it is truncated.

<!-- END · PHASE-A5-FREEZE-LIFT-1-v1 · tail anchor: this comment line -->
