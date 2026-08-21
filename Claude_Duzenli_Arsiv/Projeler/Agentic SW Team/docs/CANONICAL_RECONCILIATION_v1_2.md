# Canonical Reconciliation — Decisions & Remediation Plan (v1)

> ⚠️ **REFERENCE DOCUMENT — NOT AN EXECUTION ORDER.**
> This document records *locked decisions* and the *remediation plan*. It is the source of truth that the gated stage prompts (R1, R2, R3, R4) **reference**. It must **never be executed directly**, in whole or in part. All changes to canonical docs are applied **only** via the individual, operator-gated R-stage prompts — one stage at a time, in sequence, each reviewed before merge.
> **AG: do not act on this document. Act only on the specific R-stage prompt you have been handed.**

> **Purpose:** Resolve every documented inconsistency surfaced in the 2026-06-02 content audit of TheBluePrint23 / ARDICTECH program content, and propagate **one canonical truth** to all source documents. The tool serves canonical content, so each fix is made at the source doc and propagates automatically.
> **Authority:** Decisions confirmed by Maymun (founder / program sponsor) in session 2026-06-02. Authored by Claude (senior architect).
> **Status:** Decisions LOCKED. Remediation pending execution (AG).
> **Why this doc exists:** so the corrections are *auditable* — the team and CTO can see exactly what was decided and why, rather than discovering a record that was quietly edited. A wrong fact recorded with the authority of a lesson is a confidence-laundering bug; a *correct* fact must be traceable to a decision.

---

## 0. Audit scope (honesty boundary)

This reconciliation covers the **narrative / timeline / strategy / version / prerequisites** layer — the human-authored content where the divergences lived. It does **not** re-audit the 100 connections / 67 EAIP components against v5 by hand; that data was machine-extracted and is lower-risk. A separate data-fidelity verification pass is recommended but not part of this reconciliation.

---

## 1. DECISION — Timeline & program window

**Inconsistency:** Charter said "June–December 2026 program" (7 months); EAIP schedule headed "Timeline — phases across 13 months" (M1–M13); no calendar anchor; CWF1 "M3–M5" vs "December cutover" unaligned.

**Canonical truth:**

- **M1 = June 2026.** Therefore M7 = December 2026, M13 = June 2027. (Pin this anchor explicitly in the EAIP schedule.)
- **The June–December 2026 program = M1–M7 of the EAIP roadmap.** It delivers, by end of M7:
  1. Platform Core
  2. Web Assistant
  3. Usta Portal (Galip Usta) **v1**
  4. CWF **v1** (Kale) — production cutover, **Kale live December 2026 (M7)**
  5. Insurance **v0.8** (partial; full insurance is later, not in this program)
- **The full EAIP platform is a 13-month roadmap (M1–M13).** M8–M13 — **cwf2 and Astra/fin** — is the **2027 continuation**, explicitly *outside* the June–Dec 2026 program.
- **CWF1 timing:** build M3–M5 (Aug–Oct 2026); shadow validation + production cutover M5→M7; **live December 2026.** This closes the "M3–M5 build vs December cutover" gap.

**Every document must state the program-vs-roadmap distinction so a reader never sees "7 months" and "13 months" without the bridge between them.**

---

## 2. DECISION — Version model (v0.5 → v1.5)

**Inconsistency:** "Revolutionize v0.5" appeared only in the charter (6×) and nowhere else; all other Revolutionize docs were framed around "v1 → v2" with no v0.5. The term also pointed the *wrong direction* (implying pre-v1 immaturity, when the program's end-state is post-v1 maturation).

**Canonical truth — progression `v1 → v1.5 → v2`:**

- **v1** = the agentic org / **full human-team simulation**. The artifact that is *built and used*.
- The **June–Dec 2026 program (M1–M7)** stands up a **working v1** (minimum-viable full-team-simulation: Phase-1 substrate + first-product loop) and **uses it** to develop and deploy the five M7 products (CWF1, EAIP v1, etc.).
- Through that heavy real-world use, v1 **matures to v1.5** by Month 7 — battle-tested; the program's end-state.
- **v1.5 → v2 (cellular architecture)** is the post-program horizon. The full 8-phase / 12–15-month Revolutionize build **is** the v1.5 → v2 road.

**Canonical name: `v1.5`** (replaces every occurrence of "v0.5"). The three-folds mandate line in the charter updates accordingly: *"builds Revolutionize v1, maturing to v1.5"* — not "v0.5".

---

## 3. DECISION — Open prerequisites (4 / 5 / 6 → one set)

**Inconsistency:** Charter listed **6**, architecture spec **5**, Phase-0 governance **4** — with non-matching sets, all under the label "open prerequisites."

**Canonical truth:**

### 3.1 One strategic prerequisite set (5 items)
| # | Prerequisite | Status |
|---|---|---|
| ① | **First product** — what the agentic org (v1) builds first | OPEN |
| ② | **SOUL.md founder** — the taste/values model authored (founder *identity* = Maymun is known; the open item is the SOUL.md *content*) | OPEN |
| ③ | **Quarterly LLM budget** | OPEN |
| ④ | **EAIP ↔ Revolutionize relationship** | **RESOLVED — by the bridge:** v1 builds & ships verified work *into* EAIP; EAIP production telemetry flows *back* as v1's reality signal. |
| ⑤ | **Required capabilities** (formal methods, agent orchestration, multi-tenant security) — **secured as either a human or an agentic capability** | OPEN |

**Canonical count: 5 strategic prerequisites; 4 OPEN (①②③⑤); 1 RESOLVED (④).** This "4 open" is exactly what the Phase-0 governance card already displays.

> Note on ⑤: reworded from "expertise gaps." In an agentic org the prerequisite is not "do the humans have the skill" but "does the required capability exist" — and it may be embodied as a human (hire/upskill) *or* an agent. This rewording is itself a canonical correction.

### 3.2 Separate "Kickoff Readiness Checklist" (operational — NOT prerequisites)
These three came only from the charter and are *"ready to begin Monday"* logistics, not architectural unknowns. They move to their own clearly-labeled list:
- GitHub repo stood up + clone access for all 6
- Pre-reading email sent + acknowledged
- First CWF spike subsystem chosen (default: single-turn OEE Q&A)

### 3.3 Charter must also ADD the two strategic prereqs it was missing
The charter's old list omitted **② SOUL.md founder** and **④ EAIP↔Rev relationship**. After splitting out the operational items, the charter's strategic list must equal the canonical five (with ④ shown resolved).

---

## 4. DECISION — A1 answer-document path

**Inconsistency:** runbook A1 acceptance referenced `docs/decisions/open_prereqs.md`; Phase-0 governance card uses `docs/phase0/a1-open-prereqs.md`.

**Canonical truth:** **`docs/phase0/a1-open-prereqs.md`** is canonical (the governance tool reads it; already fixed in the manifest). The runbook's `docs/decisions/open_prereqs.md` reference is corrected to match. The doc itself lists the **4 open** items (①②③⑤) so that when answered, they are the right four.

---

## 5. Affected source documents

| Document | Changes |
|---|---|
| `08_leadership_charter_bilingual.html` | v0.5→v1.5 + version model; three-folds mandate line; timeline framing (M1=June, program=M1–M7, roadmap→M13/2027, five M7 products); split OPENS into 5 strategic (add ②④, reword ⑤, mark ④ resolved) + Kickoff Readiness Checklist. **Bilingual EN+TR.** |
| `06_eaip_schedule.html` | Calendar anchor (M1=June 2026); program-vs-roadmap split (M1–M7 program / M8–M13 2027); CWF1 build M3–M5 + cutover M7; Insurance labeled v0.8. **Bilingual.** |
| `01_revolutionize_architecture.html` | Introduce v1→v1.5→v2 explicitly; v1.5 = program end-state; 8-phase/12–15-mo build = v1.5→v2 road. **Bilingual.** |
| `07_revolutionize_schedule.html` | Same version model; align any v0.5 / timeline references. **Bilingual.** |
| `ARDICTECH_Platform_v6_SSoT_bilingual.html` | Master SSoT: align version model, timeline framing, and ROPENS / open-prereq content to §§1–3. **Bilingual.** |
| `phase_0_runbook.md` | A1 path fix (§4); reword prereq ⑤; confirm "5 set, 4 open, ④ resolved" framing. |
| `docs/phase0/a1-open-prereqs.md` | Ensure it enumerates the canonical 4 open items. (Content/answers = separate program work, not this pass.) |

---

## 6. Remediation sequence (proposed)

Organized **by concept**, so each stage has a single crisp, globally-checkable acceptance criterion.

- **R1 — Version model.** Replace all "v0.5" → "v1.5"; state v1→v1.5→v2 once in each Revolutionize doc + charter + v6. *Acceptance:* `grep -ri "v0\.5" → 0` across all canonical docs; version model present in charter, rev-arch, rev-schedule, v6.
- **R2 — Timeline framing.** Charter + EAIP schedule + v6: M1=June anchor, program(M1–M7)-vs-roadmap(M1–M13/2027) split, five M7 products, CWF1 cutover, Insurance v0.8. *Acceptance:* every doc that states a duration also states the program/roadmap distinction; no bare "7 months" or "13 months" without the bridge.
- **R3 — Prerequisites.** Charter (split operational → Kickoff checklist; add ②④; reword ⑤; mark ④ resolved) + runbook (path fix, ⑤ reword) + a1 doc (4 items) + v6 (ROPENS align). *Acceptance:* every surface shows the same 5-set / 4-open / 1-resolved; "open prerequisites" label denotes exactly one set everywhere; operational items live under a distinct label.
- **R4 — Consistency verification gate.** Prove it's clean: cross-doc grep sweep (v0.5→0; counts converge; timeline statements agree), render-check the corrected content in the tool, produce a consistency report. *Acceptance:* a clean report with zero divergences — we **prove** consistency, not assert it.

Each remediation stage is operator-gated and may be filed as a Phase-0 governance item so the corrections are tracked, not quiet.

---

## 7. Open program work NOT in this pass (separate thread)

Reconciling the *documentation* defines the canonical **4 open prerequisites**. It does **not** *answer* them — that is the 90-minute Maymun + CTO session (runbook A1) plus the LLM-budget and capabilities decisions. When answered, `docs/phase0/a1-open-prereqs.md` loses its TBDs and card A1 goes green. That work unblocks Revolutionize Phase 1 ("B").

---

*End — Canonical Reconciliation v1. Decisions locked 2026-06-02. Source of truth for the R1–R4 remediation.*
