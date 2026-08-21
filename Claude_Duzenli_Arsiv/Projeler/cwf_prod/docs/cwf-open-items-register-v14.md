# CWF — Open Items Register
**cwf-open-items-register-v14 · rev 14 · 2026-07-04 · supersedes v13**
**State anchor:** `origin/master` = `c772171` · 721/721 tests · docVersion rev 27 · replay instrument LIVE + audited · CHAR-1 measurement DONE · OBS-3.1 design LOCKED (P-b primary)

---

## OPEN — committed queue (in order)
| # | Item | Owner | Notes |
|---|---|---|---|
| 1 | **OBS-3.1 — perturbed empty-completion retry** | Claude: bump design to rev 2 (P-b primary) → phase prompt → AG | Design LOCKED (KB v14 §4): attempt-0 unperturbed · attempt-1 P-b (re-anchor last USER turn) · attempt-2 P-a (directive) · replay validates per tier on `07beb11f` (N=25, CI-separation + grounding-parity evidence gate) BEFORE production. Reactive-only firing (my single-path rec; Maymun to confirm in phase). 3 surgical touch points in `stageStream.ts`, no rewrite. Maymun's P-b choice honored; mechanism corrected (empty dies pre-tool → re-anchor user turn, not a nonexistent tool result). |
| 2 | **MICRO-1 — AWS Langfuse host + admin-panel deep-link + pipeline span coverage** | Claude prompt (+ scoped IAM policy embedded) → AG; Maymun: account + one scoped key | THREE things in one phase, all now co-dependent: (a) AWS host (`LANGFUSE_HOST` swap, PROBE-OBS reduced it to that; retention config here; same trace-in-UI criterion); (b) deep-link from each admin turn-row → its Langfuse trace via the RULE-28 turn id (the Langfuse-access saga proved manual nav drops you in the wrong org — this matters MORE now); (c) wrap the 10 dark pipeline stages in `withSpan()` so the trace waterfall IS the "dream dashboard" (KB v14 §3) — the deep-link must land on a trace that shows all 14 stages or it's half a picture. Do NOT build a standalone dashboard (buy-before-build). Unblocks Replay Part A / experiments on the permanent host. |
| 3 | **P7 — Superset empty≠zero runtime validator** | Claude (design) | 3rd defense layer (now: prompt + eval-gate). No fragile regex bolt-on; proper design in P7. |

## OPEN — fold into next touching phase (no standalone patches)
| Item | Fold into |
|---|---|
| **`e565dd3` bad manifest hash** — Runtime Topology tab `lastSyncedCommit` points at a commit that exists nowhere in the repo; drift gate has FAILed since `fc2ac9d`. One-line fix = correct to the real Runtime Topology seal hash. | OBS-3.1 pre-flight (folded in) |
| **ADD "drift gate green" as an explicit pre-flight line** in every future phase prompt (measurement or not — CHAR-1's pre-flight missed the red build). | every phase prompt henceforth (standing) |
| GAP-4 prose fix: "adding a backend = a row + a pack + one registration" | first architecture doc touched |
| `[ToolFilter] 🧠 Learned` log lines duplicated per turn (cosmetic noise) | any future toolFilter-touching phase — dedup emit |
| Nested-I/O allow-list depth: per-key fail-closed accepted as correct default | amend ONLY if a real attribute hits live |

## OPEN — needs owner input / awaiting decision
| Item | Detail |
|---|---|
| **OBS-3.1 production firing = reactive-only?** | My committed single-path rec is reactive-only (perturb after a detected empty, never predictive). Maymun to confirm/override when the phase prompt lands. Not blocking design. |
| **F3 — vanished audit row** (`a8798c1d`, run `9d115773`) | REPLAY-B's happy-path `replay_audit` row is GONE (CHAR-1 pre-count 0 not 1). Service-role-only deletion, cause unknown. Audit-or-alarm exists to make this impossible — worth a genuine look. Not blaming CHAR-1. Flagged for owner review. |

## OPEN — Maymun's desk (small)
| Item | Detail |
|---|---|
| Stale ARMES token in IDE MCP config | Fresh token initially went to the IDE ("global MCP settings") — harmless but useless there; remove it. Real fix landed in Supabase. (Carried from v13.) |
| Empty `yaprakdev`/`AgentTune` Langfuse org/project | Auto-created during the login saga; zero data, safe to delete (or leave — harmless). Not urgent. |

## CLOSED 2026-07-04 (do not re-raise)
- **REPLAY-B** (`6b07927`): empty-completion replay engine — recorded-stub task-fn, ONE raw attempt/rep, C1 no-write, deterministic scorers (production `isEmptyCompletion` re-export + floor-phrase), REPLAY_RUN-gated audited endpoint, ReplayTab Part B live. 721 tests. Reviewed ACCEPTED (C8 better-than-parity, C7 triple-proof, wall-clock anchor beyond spec).
- **`replay_audit` DDL** (`32dba7e` + Gemini): applied both lanes (idempotent); RLS on, super_admin read, service-role write, anon/authenticated REVOKE; live C4 happy-path proven (audit row + 42501 anon-deny). Audit-or-alarm proven in both modes.
- **Vercel build hotfixes** (`c1e7725`, `963a912`, reseal `5d13b73`): drift-gate builder-context (assert committed `base..HEAD` under CI/VERCEL — Vercel rewrites `vercel.json` in build container); equality-narrow `ProviderWriteResult` (Vercel per-function compile lacks strictNullChecks — use `x.ok === false`). Reviewed sound; gate green both modes.
- **CHAR-1** (`c772171`): empty-saga characterization measurement — 11 runs, 111 provider attempts, zero production code, spend 1.26M/2M. Reviewed ACCEPTED. Delivered the OBS-3.1 substrate (KB v14 §2): empty region 32.5% [23–43%], temperature does NOT rescue, step-1 pre-tool signature, pool = 1 replayable turn. One prose slip caught (34→54 non-empty); one pre-existing infra defect surfaced (`e565dd3`, now tracked above).
- **Empty-saga characterization** (the "designed against data" gate): DONE — OBS-3.1 now designed against real CHAR-1 data, not guessed.
- Carried-closed from v13 (still do not re-raise): F-obs1/PROBE-OBS/F-obs2/F-obs3 · ARMES prod 401 (fresh token live, 141 tools, OEE chain verified) · Superset seed (DB=reference) · `backend_id` backfill (present; `armesMes` sans backend_id BY DESIGN) · OA-8 dev half (local Docker = standing DEV host) · Playwright MCP disabled · Instructions v2 in project files · **Bootstrap/template hygiene** (v14 bootstrap block is the clean 2-line-pointer form; the paste-template drift appears resolved this session).

## STANDING WATCH
- Gemini operator fence: sanctioned tasks ONLY, no self-initiated cleanup. Migrations = Operator-lane (CHAR-1 dual-lane DDL apply harmless but boundary stands).
- gpt-4.1-mini `call_tool(search_tools)` self-correct in prod → future replay-lab experiment material.
- Node drift AG v26.x vs v22.x spec; green — don't touch while green.
- **F2 lab-env trap:** `vercel dev 50.18.2` ignores parent-shell exports (silent zero traces); full `.env.local` copy + overrides works, delete at teardown. Carry into any future lab-run phase.
- claude.ai MCP servers (Gmail/Calendar/HF/Supabase) need re-auth via connector settings if wanted back.
