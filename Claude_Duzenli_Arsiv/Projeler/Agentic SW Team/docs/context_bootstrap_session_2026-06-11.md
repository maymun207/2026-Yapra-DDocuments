# Context Bootstrap — Session 2026-06-11
## Post-architecture review · Program plan v1.1 authored · S2g in gate

> **Authoritative project state.** Open §1–§8, resume from §8.
> Treat §1–§7 as known — do not re-explain to the operator.

---

## 1. Identity & program

**Claude** = sole senior full-stack architect and sole stage-prompt author
(single-author rule, dev_schedule §9).
**Maymun** = Conductor (founder/CEO): queues prompts, runs gate checks,
approves PRs. Never types code.
**AG (Antigravity)** = agentic IDE executor. One stage at a time, gated.
**CTO** = Tech Lead + Program Leader (one person, two hats).

Six-person engineering team (IoT-Ignite veterans):
- Takım-1 (3 engineers): Revolutionize Phase 1
- Takım-2 (3 engineers): EAIP + CWF delivery → Kale Seramik

**Program window:** June–December 2026.
**Hard deadline:** CWF to Kale Seramik, December 2026. Non-negotiable.

---

## 2. Dual-platform & repos

| Platform | Role |
|---|---|
| **EAIP** | Multi-tenant product platform; CWF lives here |
| **Revolutionize** | Autonomous agent platform that *builds* EAIP; ships verified PRs into EAIP; receives EAIP production telemetry as its reality signal |

**Content repo:** `agbuilder-platform/revolutionize@main` — canonical HTML
SSoT documents, charter, ADRs, stage prompts, lessons.md files.

**App repo:** `maymun207/TheBluePrint23@main` — Next.js 15 / React 19 /
TypeScript / Tailwind, deployed at `theblueprint23.dev` via Vercel. All
8 content tabs render from content-repo documents via DocumentFrame
(srcDoc + sandbox="allow-scripts" + ResizeObserver auto-height). App-repo
changes are not needed for content-only updates.

---

## 3. Key architectural decisions (stable, not open)

- **CA-1 (charter amendment):** CWF is delivered by Takım-2 humans. Revolutionize does not touch CWF's critical path. The bridge ("Revolutionize ships PRs into EAIP") is first exercised no earlier than Phase 4 shadow mode.
- **ADR-001:** LiteLLM as LLM gateway.
- **ADR-002:** MCP as external tool protocol.
- **Pattern library:** #1–#18 established (see `lessons.md` chain). New this session: **#19** (file sizes in bytes only, prefer content hashes — `len()` of decoded string ≠ bytes) and **#20** (everything crossing the chat→disk boundary travels as a hash-verified file; text-paste is not a delivery channel for executable bytes; applies to scripts as well as payloads).
- **Anchored-insertion model (S2g lesson):** when patching a canonical document, embed the changes as anchored `str_replace` operations applied to the live `main` file — not as a pre-built replacement that goes stale. Drift-immune by construction.
- **File-channel delivery for scripts:** apply scripts and smoke tests must arrive via `_incoming/` as downloaded files + SHA-256 tripwires, then shell `cp` only. AG's write tooling reinterprets `\uXXXX` sequences; the file channel does not.

---

## 4. TheBluePrint23 current state

All migration stages complete + cookbook feature-complete (as of 2026-06-04).
Stage history: S1, S2, S2b, S2c, S2d.1, S2d.2, S3–S5 (self-closed), S6–S7 — all merged.
S2f (Phase filter): **merged at commit `34c6bb7`** — all 67 COMPDATA entries have `phase` field, EAIP + Rev phase-filter UIs live.

---

## 5. This session's work (2026-06-11)

### 5.1 Architecture review (complete)
Full technical + feasibility review of the agentic software team approach.
Seven findings, all with concrete mitigations. Outputs:
- `program_plan_phase0_phase1_v1.md` (in project files) — superseded by v1.1
- `program_plan_phase0_phase1_v1_1.md` — **canonical**, in Library

### 5.2 Charter amendments (complete, in gate)
Seven charter amendments authored (CA-1…CA-7) + Phase 1 exit gate
(canonical five + +A1/+A2/+A3). Exit gate reconciled against
`07_revolutionize_schedule.html` — two drifts corrected from the earlier
draft. A7 contract governs the 3+3→1+5 transition triggers once signed.

**S2g run history:**
| Run | Outcome | Root cause |
|---|---|---|
| S2g (R0) | Rejected — never merged | AG in wrong repo (TheBluePrint23); rewrote governance text + padding to satisfy a failing byte-size check; `len()` char count passed as byte size in prompt |
| S2g-R1 / PR #10 | Superseded, closed | Payload predated commit `662fe75` (version-model reconciliation); merging would have reverted it |
| S2g-R2 rev 1 | BLOCKED by AG correctly | Typographic curly quotes in embedded scripts mangled in transit |
| S2g-R2 rev 2 | BLOCKED by AG correctly | AG's file-write tooling interprets `\uXXXX`; hash tripwire caught it |
| **S2g-R2 rev 3 / PR #11** | **In gate — awaiting operator §8 check** | File-channel delivery worked; 53/53 smoke green; v0.5=0 confirms `662fe75` preserved |

**Operator §8 check before merging PR #11:**
1. Diff: charter +34/−2, plan added, manifest +1. No other files.
2. Smoke output in PR body ends `S2g-R2 smoke complete -- all green`.
3. Standalone browser render of branch charter: EN/TR toggle; mandate = THREE paragraphs (v1→v1.5→v2 present); bottom = CA-1…CA-7 + X1–X5 + +A1–+A3 + green reconciliation note; subtitle = `amendments v1 (2026-06-11)`.
4. Signal: `"Approved — merge S2g-R2"`.
5. Post-merge: theblueprint23.dev Charter tab + Library.

After merge: AG creates `prompts/v0/S2g-lessons.md` (three AUTHORED-BY sections, covers all four runs).

---

## 6. Program plan (canonical v1.1)

Day-1 anchor: Mon 2026-06-15 (ASM-1 — correct if different).

**Phase 0 (Weeks 0–1, Jun 15–26):**
- Week 0: all six engineers on reading week (OpenClaw/Hermes/OASIS/Anthropic). Maymun closes G4/G5/G2/G3 decisions.
- Week 1: joint substrate (B-track, runbook B1–B14). Friday 16:00: Phase 0 exit gate (runbook §6) + Phase 1 entry gate (G1–G8).

**Phase 1 entry gate (G1–G8) — Friday Jun 26, 16:00. Single red = Phase 1 does not start:**
- G1: Phase 0 runbook §6 green
- G2: GitHub Team tier + branch protection on both repos
- G3: Quarterly LLM budget approved + `caps.yaml` drafted
- G4: First product decided (default = Web Asistan widget)
- G5: SOUL.md v0 signed
- G6: 6/6 reading write-ups + ADR-003 drafted
- G7: Expertise-gap assessment done
- G8: Conductor rotation schedule signed by both team leads

**Phase 1 (Weeks 2–9, Jun 29–Aug 21):**
- Takım-1: SG 1.1 (telemetry) → 1.2 (streaming/storage) → 1.3 (observability) → 1.4 ∥ 1.7 (gateway + MCP) → 1.5 (base class + v1 agents) → 1.6 (first product)
- Takım-2 in parallel: walking skeleton → M1 Core → Web Asistan → CWF v1 (M3, Kale)
- Pull-based stage assignment within each week (WIP limit 1 per conductor); week-grain lane plan fixes cadence targets + Friday demo commitments
- Conductor rotation: 6/6 engineers ≥ 3 conducted stages by Phase 1 exit (CA-4 / G8)

**Phase 1 exit gate (canonical five + amendments):**
- X1: Telemetry flows end-to-end and is queryable
- X2: LiteLLM gateway routes with per-agent cost attribution
- X3: MCP servers enforce capability allowlist at boot
- X4: v1 agents ship human-reviewed PRs through the verification gate
- X5: First product is live in production
- +A1 (CA-2): Reviewer-health dashboards ≥ 4 weeks history; cap enforcement demonstrated
- +A2 (CA-4): 6/6 conductor rotation complete
- +A3: Phase 2 just-in-time decomposition drafted; A7 3+3→1+5 evaluation held

---

## 7. Pattern library additions this session

| # | Pattern |
|---|---|
| **19** | **File sizes in bytes only.** `len(str)` is a character count. Multi-byte UTF-8 (Turkish letters, arrows, em dashes) makes chars ≠ bytes. Use `wc -c`, `Buffer.byteLength(buf)`, or `len(s.encode('utf-8'))`. Better: prefer content hashes over sizes entirely — hashes are drift-proof and mutation-resistant. |
| **20** | **Everything that crosses the chat→disk boundary is hash-verified and delivered as a file.** Text-paste is not a delivery channel for executable bytes: AG's write tooling interprets `\uXXXX` sequences, editors introduce smart quotes, encodings shift. Scripts AND payloads travel as downloaded files via `_incoming/`, SHA-256 verified, then shell `cp` only (never an editor or write tool). |
| **Anchored-insertion** | When patching a canonical document: embed the patch as anchored operations (`str_replace` on exact unique strings) applied to the live `main` file. Pre-building a replacement file creates a snapshot that silently reverts any commits made between authoring and merge. Scripts that abort on anchor-count ≠ 1 make this self-detecting. |

---

## 8. Open / pending work (resume here)

### 8.1 S2g-R2 PR #11 — in gate ← FIRST ACTION
See §5.2 above. Operator runs §8 checks, signals merge, AG creates lessons.md.

### 8.2 S2e — Supabase progress tracker (deferred to late M0/early M1)
- 4-state per component: ⚪ not started / 🟡 in progress / 🔵 staging / 🟢 production
- Append-only dev notes per component (author + timestamp)
- Roll-up percentages by layer + phase
- Timing: when Phase 1 starts producing real events. Premature before then.

### 8.3 Phase 1 kickoff prerequisites (Week 0, Jun 15–19)
G2–G5 are decision-gates. G4 has a named default (Web Asistan widget) if undecided by Week 0 Friday. G3 (LLM budget number) is the most likely to drift — it blocks Stage 1.4.2 (per-agent caps enforced). Track via governance log.

### 8.4 A7 contract (docs/contracts/resource_allocation_v1.md)
CTO drafts, Maymun signs during Week 0–1. Once signed, its wording governs the 3+3→1+5 triggers over +A3 in the charter. Ping Claude after signing for a one-line wording pass.

### 8.5 Deferred cookbook + Rev work (unchanged from prior bootstrap)
- Rev component cookbook depth (after Phase 1 starts)
- RCONN cross-linking (after Rev cookbook)
- TR translation of cookbook fields
- Five Revolutionize ROPENS: ① first product (default decided at G4) · ② SOUL.md (G5) · ③ LLM budget (G3) · ⑤ expertise gaps (G7). ④ resolved.

---

## 9. Operating conventions (unchanged)

- **Interactive ops:** one decision per turn, confirmation before proceeding.
- **Stage prompts to AG:** 13-field template, Step 0 mandatory reads, merge mode explicit (`operator-gated` = AG opens PR and stops).
- **Gate discipline:** Maymun always runs manual browser check before signaling AG to merge. Never short-circuit.
- **Lessons.md:** three AUTHORED-BY sections (Antigravity self-report, Maymun operator review, Claude prompt-author retrospective) after every merged stage.
- **Pattern #27:** fold small patches into the next substantive stage.
- **Bilingual convention:** human-readable prose EN + TR; technical identifiers stay as-is in both languages.
- **Six AG operating rules:** no `.env` access · BLOCKED-not-false-success · exact identifiers only · cross-phase verification · no raw secrets · additive-over-destructive.
