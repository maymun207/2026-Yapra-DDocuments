# CWF — Open Items Register
**cwf-open-items-register-v16 · rev 16 · 2026-07-05 · supersedes v15 (`0c6c328`→`a878cae`: OBS-3.1 Sub-phases A+B+C all shipped, reanchor ADOPTED)**
**State anchor:** `origin/master` = `a878cae` · 747/747 tests (75 files) · docVersion rev 33 · drift `[OK]` · observe backbone COMPLETE + production-proven · replay instrument LIVE + audited · **OBS-3.1 CLOSED — perturbed empty-retry (reanchor) live in production, reactive-only**

---

## OPEN — committed queue (in order)
| # | Item | Owner | Notes |
|---|---|---|---|
| 1 | **MICRO-1 — AWS Langfuse host + admin-panel deep-link + pipeline span coverage** | Claude prompt (+ scoped IAM policy embedded) → AG; Maymun: AWS account + one scoped key + retention choice | THREE co-dependent things in one phase: (a) **AWS host** (`LANGFUSE_HOST` swap — PROBE-OBS reduced it to that; retention config here; evidence gate = same "span visible in Langfuse UI after force-flush" criterion, now on the permanent host); (b) **deep-link** from each admin turn-row → its Langfuse trace via the RULE-28 turn id (the Langfuse-access saga proved manual nav drops you in the wrong org — this is the higher-priority half); (c) wrap the **10 dark pipeline stages in `withSpan()`** (KB v15 §3: 2/14 traced today) so the trace waterfall IS the owner's "dream dashboard" — the deep-link must land on a trace showing all 14 stages or it's half a picture. Do NOT build a standalone dashboard (buy-before-build). **Fold in: blueprint §07 DOC-DEBT redraw** (see below) since MICRO-1 touches the blueprint/observability docs. Unblocks Replay Part A / live experiments on the permanent host. |
| 2 | **P7 — Superset empty≠zero runtime validator** | Claude (design) | 3rd defense layer (today: prompt + eval-gate). No fragile regex bolt-on; proper design in P7. ARMES has 3 layers, Superset has 2 — close the gap. |

## OPEN — fold into next touching phase (no standalone patches)
| Item | Fold into |
|---|---|
| **Blueprint §07 DOC-DEBT** — Agent Control Plane blueprint still lists the roadmap variant set `{ baseline retry · nudge-perturbation · temp-bump }` and says variants "remain OBS-3.1 design work". Superseded by shipped `reanchor`(adopted)/`directive`(rejected). AG resealed-not-redrew per C8 (mid-phase redraw banned) + recorded as DOC-DEBT in CHANGELOG. | MICRO-1 (it's the blueprint/observability-touching phase) — redraw §07 to the Gate-B outcome. |
| **"drift gate green" mandatory pre-flight line** (standing — trivially cheap now: content-hash markers killed the shallow-clone failure class). | every phase prompt henceforth |
| GAP-4 prose fix: "adding a backend = a row + a pack + one registration". | first architecture doc touched |
| `[ToolFilter] 🧠 Learned` log lines duplicated per turn (cosmetic noise). | any future toolFilter-touching phase — dedup emit |
| Nested-I/O allow-list depth: per-key fail-closed accepted as correct default. | amend ONLY if a real attribute hits live |

## OPEN — needs owner input / awaiting decision
| Item | Detail |
|---|---|
| **F3 — vanished audit row** (`a8798c1d`, run `9d115773`) | REPLAY-B's happy-path `replay_audit` row went GONE (CHAR-1 pre-count 0 not 1). Service-role-only deletion, cause unknown. Audit-or-alarm exists to make this impossible — worth a genuine look. NEW forensic data available: OBS-3.1 Gate B recorded `replay_audit` 11→12→13→14 across the 3 live arms (one clean increment per run, no vanish this time) — a healthy baseline to diff against the F3 loss. Flagged for owner review; not blocking. |

## OPEN — Maymun's desk (small)
| Item | Detail |
|---|---|
| Stale ARMES token in IDE MCP config | Fresh token initially went to the IDE ("global MCP settings") — harmless but useless there; remove it. Real fix landed in Supabase. (Carried from v13.) |
| Empty `yaprakdev`/`AgentTune` Langfuse org/project | Auto-created during the login saga; zero data, safe to delete (or leave — harmless). Not urgent. Will be moot once MICRO-1 swaps to the AWS host. |

## CLOSED 2026-07-05 (do not re-raise)
- **OBS-3.1 — perturbed empty-completion retry — FULLY SHIPPED (`b8ecb4d` A · `cf0fa89` B · `d7df2a2` Gate-B evidence · `a878cae` C).** The whole empty-completion/observe/replay epic closes here.
  - **Sub-phase A** (`b8ecb4d`): pure `perturbForRetry` + `tierForAttempt`/`attemptForTier` + `perturbationTier` telemetry. Reviewed ACCEPTED (determinism, identity-at-none, non-mutation, verbatim-user-token tests; `redactGroundingVerdict` added unprompted — correct leak-guard).
  - **Sub-phase B** (`cf0fa89` harness, `d7df2a2` evidence): replay 3-arm paired validation. **Gate B result, independently recounted by Claude from `docs/replay/obs31-gateB/gateB-redacted-perrep.json`:** Arm A `none` 9/25 = 36.0% [20.2, 55.5] (control VALID ∈ [23.2,43.4]); Arm B `reanchor` **0/25 = 0.0% [0.0, 13.3] → ADOPTED** (upper 13.3 < 23.2 baseline-low, clean separation, no overlap); Arm C `directive` 11/25 = 44.0% [26.7, 62.9] → **REJECTED** (worse than control). All 26+ empties `finishReason=stop`. Grounding parity: reanchor 25/25 recovered clean, 0 violations = matches Arm A. **Key finding:** reanchor vs directive is a PLACEMENT effect — the SAME engage-directive succeeds in a re-anchored USER turn (0/25) but backfires appended to SYSTEM (44%). Vindicates Maymun's P-b intuition; directive-worse is the internal control proving the effect is specific, not generic-perturbation-escape.
  - **Sub-phase C** (`a878cae`): production wire-in. Reviewed ACCEPTED. `adoptedTierForAttempt` (0→none, 1→reanchor, ≥2→none) is the SINGLE-SOURCE live driver — deliberately NOT `tierForAttempt` (which maps 2→directive, the rejected tier, retained as lab-only). 2 surgical edits in `stageStream.ts` + import; `ctx.aiMessages` proven pristine after reanchor retry (T2 `toEqual(before)`); empty≠zero/give-up/no-double-paint/cross-provider-ban byte-identical; injection-boundary A2 guard re-expressed against the new `attemptSystem` sink WITHOUT weakening (production `attemptSystem === ctx.systemPrompt` byte-for-byte since none/reanchor leave system untouched). C7 honest relabel landed. Reactive-only by construction. 747/747, rev 33.
  - **Reactive-only firing:** CONFIRMED by Maymun (architect thread). Perturbation fires strictly after a detected empty; attempt 0 always verbatim.
  - **Stated design risk carried live (not a blocker):** validated on N=1 specimen (`07beb11f`). `perturbationTier` ships in production telemetry → generalization is now measurable; the first wild divergent specimen gets replayed against the shipped reanchor.
- Carried-closed from v15 (still do not re-raise): REPLAY-B (`6b07927`) · `replay_audit` DDL (`32dba7e`) · Vercel build hotfixes (`c1e7725`/`963a912`/`5d13b73`) · CHAR-1 (`c772171`) · doc-drift/flaky hotfixes + `e565dd3` defect (`c772171`→`0c6c328`, content-hash drift markers killed the shallow-clone failure class) · empty-saga characterization gate · F-obs1/PROBE-OBS/F-obs2/F-obs3 · ARMES prod (141 tools, OEE chain) · Superset seed (DB=reference) · `backend_id` backfill · OA-8 dev half (local Docker DEV host) · Playwright MCP disabled · Instructions v2 in project files.

## STANDING WATCH
- Gemini operator fence: sanctioned tasks ONLY, no self-initiated cleanup. Migrations = Operator-lane.
- gpt-4.1-mini `call_tool(search_tools)` self-correct in prod → future replay-lab experiment material.
- Node drift AG v26.x vs v22.x spec; green — don't touch while green.
- **F2 lab-env trap:** `vercel dev` ignores parent-shell exports (silent zero traces / silent zero data); full `.env.local` copy + overrides works, delete at teardown. **Also (Gate-B finding):** `@ai-sdk/google` reads `GOOGLE_GENERATIVE_AI_API_KEY`, not `GEMINI_API_KEY` — a google-provider env check must include BOTH names. Carry into any future lab-run phase.
- **Direct-engine replay-invocation caveat (Gate-B):** the live 3-arm run invoked the production engine directly (service-client context; headless super_admin HTTP auth unavailable) and replicated the C4 audit write per run. Metrics unaffected (same engine/scorers). If a future run needs to VALIDATE the endpoint's RBAC+audit transport specifically, it must go through HTTP, not direct.
- **Replay grounding fidelity gap:** replay records no server config → the grounding scope-divergence AUTHORITY branch can't attribute per-result; body-flag checks (empty_as_zero/count/fabrication) remain faithful. Constant across arms so it cancels in paired comparison — but absolute scope-divergence rates are NOT trustworthy from replay.
- claude.ai MCP servers (Gmail/Calendar/Drive/Vercel) need re-auth via connector settings if wanted back.
