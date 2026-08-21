# CWF → EAIP · HANDOVER for a NEW Claude Project (S91 cold start)

<!-- CWF-HANDOVER-S91-NEW-PROJECT-v1 · 2026-08-09 · minted at S90 close.
     PURPOSE: this ONE file tells the owner exactly which artifacts to upload
     into a brand-new Claude project so S91 starts with zero loss. Read it
     first; it is the map to the map. -->

---

## PART A · WHAT TO UPLOAD (the working set — 12 files)

Upload **exactly these** into the new project's knowledge. Nothing else is
required, and everything else is archive (its content survives by name inside
these twelve).

### A1 · The four permanent carriers (never skip)

| # | File | Why it must be there |
|---|---|---|
| 1 | `CLAUDE-PROJECT-INSTRUCTIONS-v4.md` | The durable map: identity, three lanes, architecture spine, all non-negotiable rules, ADR index. Read first in every session. |
| 2 | `cwf-sota-definition-v1_5.md` | THE acceptance criterion (SOTA-1). Nothing enters v1 scope unless traceable to it. |
| 3 | `cwf-architect-doctrine-v1_3.md` | D-1…D-9 binding Architect doctrine (RECON-FIRST, ONE-RELAY, COMPUTED-NOT-ASSERTED, RELAY-DIET…). |
| 4 | `cwf-master-rollout-plan-v2_7.md` | The binding walk order. Supersedes v2_6 and the whole earlier chain. |

### A2 · The four S90-close state artifacts (the live position)

| # | File | Why |
|---|---|---|
| 5 | `CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v91.md` | Boots S91: identity + laws to restate verbatim, the claimed RULE-25 floor, the first jobs in order. **Paste its opening line as the first message.** |
| 6 | `cwf-open-items-register-v94.md` | GOLDEN LEDGER: every open item by name, every S90 closure with its evidence pointer, the İZLEK anchors, the lesson lines. |
| 7 | `REGISTER-BUG-BUCKET-v29.md` | Defect/watch ledger: open W's, ARMED items, the canary book. |
| 8 | `CWF-SESSION-GRAPH-KB-v91.md` | Session graph: what happened S88→S90 and why, with commit anchors. |

### A3 · The four un-shipped design notes (work not yet built)

| # | File | Why |
|---|---|---|
| 9 | `cwf-design-METRIC-REGISTRY-DATA-1-v1.md` | **THE S90 OWNER RULING.** Metric words leave code, become backend-scoped governed data. Binding carrier — must never be lost. |
| 10 | `cwf-design-TOOL-BEHAVIOR-CENSUS-1-v1.md` | The zero-manual-rules program (binding design note). |
| 11 | `cwf-advisor-note-CS329A-lessons-v2.md` | K1–K6 owner-ratified advisor lessons; several are named preconditions in the walk order. |
| 12 | `cwf-architecture-research-S82-v1.md` | The architectural research that produced the cognitive block's shape; still feeds PathB / memory / planner decisions. |

### A4 · OPTIONAL (upload only if the owner wants the visual deck in-project)

- `2026-08-03_-_cwf_yaprak_mimarisi_chart_deck.md`
- `2026-08-03_-_CWF_yaprak_teknolojisi_Book.md`

### A5 · DO **NOT** upload

- Any superseded version (register v93 and below, KB v90 and below, bootstrap
  v90 and below, rollout v2_6 and below, bucket v28 and below).
- Any consumed phase prompt (`PHASE-*.md`) or GO (`GO-*.md`) — their outcome
  lives in git history and their name lives in the register.
- Shipped design notes (`cwf-design-PLANNER-0-v1.md` etc.) — closed by evidence.
- Session transcript dumps (`2026-08-0X_-_Session*.md`) — the KB carries them.

---

## PART B · WHAT THE NEW PROJECT MUST BE TOLD (project instructions field)

Paste this into the new project's custom instructions box:

> Read `CLAUDE-PROJECT-INSTRUCTIONS-v4.md` from project files first in every
> session — it is the durable map. Code in `maymun207/cwf_yaprak` is ground
> truth over any summary. The latest `CWF-SESSION-GRAPH-KB-v*` and
> `cwf-open-items-register-v*` carry session detail. Never carry session state
> in memory: derive every commit SHA, count and status from a fresh clone.

---

## PART C · THE FIRST MESSAGE OF S91

Paste `CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v91.md` in full, with the opening
line **"S90'dan devam"**. The Architect will then, without being asked:

1. restate SOTA-1 and S82-6 verbatim (positive control — their absence means
   the session booted wrong);
2. run RULE-25 from a fresh full clone and reconcile every number against the
   claimed floor in §B of the bootstrap;
3. report any deviation before doing any work.

---

## PART D · CONNECTORS / TOOLS THE NEW PROJECT NEEDS

| Tool | Why | Constant |
|---|---|---|
| **Supabase MCP** | live governed-state reads (`domain_rules`, `telemetry_events`, `backend_health`) | project `fjbrkimwvtpwoxhziidh` |
| **Vercel MCP** | production log + deployment reads (the S63-1 proof reads run on it) | project `prj_0fDFCY8qXj8Kr5y7n4zmyefjHY8i`, team `team_UjOMyrQtTQ32mfYCeEDpC0Qj` |
| **Bash / code execution** | fresh-clone RULE-25, independent test runs | repo `https://github.com/maymun207/cwf_yaprak` (public) |

Notes carried forward: GitHub REST API is rate-limited (403) from the
Architect sandbox — CI verification is folded into AG's GO as a blocking STEP-1
read by CONCLUSION. Vercel log windows: scope narrow, query ONE inner word.
PostgREST caps at 1000 rows silently.

---

## PART E · WHAT CANNOT BE UPLOADED AND MUST BE RE-ESTABLISHED

1. **Claude's memory of this project** does not travel to a new project. Every
   load-bearing fact must therefore be in the twelve files above — that is why
   the S90 owner ruling was minted as its own design note (file #9) rather than
   left in conversation.
2. **The two AG lanes and the Operator lane** are separate sessions; they must
   be re-opened by the owner and re-fed the relay blocks the Architect cuts.
3. **The live tree** — never trusted from a document. First act of S91 is a
   fresh clone.

---

## PART F · THE ONE-PARAGRAPH STATE OF THE WORLD (if only one thing survives)

> CWF is a governed agentic platform over MCP backends, production-live at
> `cwf_yaprak` master `c1e3f5f`, docVersion rev 222, 517 test files, 68
> migrations, 13 ADRs, deployment READY. The cognitive block (episodic,
> procedural, semantic memory + PLANNER-0 orchestrator) is shipped and
> witnessed in production. S90 shipped two things: every enforcing gate now
> records its SILENCE distinctly (a gate that could not see no longer sounds
> like one that looked), and the routing rail now derives itself from the
> mirror for ANY backend (the armes lock is dead, and the post-sync derivation
> was witnessed live across four backends). S90's owner ruling — the one that
> shapes the next phase — is that backend-specific metric words
> (`oee·fire·throughput`) must leave the codebase and become backend-scoped
> governed data, because a bank or an insurer must never see a ceramic
> factory's vocabulary. The vocabulary grows by self-learning through a
> governed gate, never by keyboard. Next: METRIC-REGISTRY-DATA-1, then
> STAGE-CARD-COVERAGE-1, then the #6 instrument wave, then CENSUS, then
> METRIC-VOCAB-DISCOVERY-1.

<!-- END · CWF-HANDOVER-S91-NEW-PROJECT-v1 -->
