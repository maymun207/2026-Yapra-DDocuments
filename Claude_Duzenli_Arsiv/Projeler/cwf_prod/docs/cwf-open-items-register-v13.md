# CWF — Open Items Register
**cwf-open-items-register-v13 · rev 13 · 2026-07-04 · supersedes v12**
**State anchor:** `origin/master` = `7eb59ce` · 681/681 tests · docVersion rev 25 · observe backbone (F-obs1→3) COMPLETE · ARMES live in prod (141 flat tools, verified 08:06Z)

---

## OPEN — committed queue (in order)
| # | Item | Owner | Notes |
|---|---|---|---|
| 1 | **Replay Part B fill** — domain-stage replay task-fns + deterministic empty≠zero recovery scorer | Claude prompt → AG | Inputs from `messages.content` + `raw_tool_results` recorded stubs, NEVER redacted telemetry. Buildable now (pre-AWS). Next phase prompt. |
| 2 | **Empty-saga characterization → OBS-3.1** | Claude ← replay data | Replay lab's first customer. ~14% input-correlated empties contained (OBS-2/3), not solved. Perturbed retry designed against data only — never guessed. |
| 3 | **AWS Langfuse host phase** | Claude prompt+IAM policy → AG; Maymun: account + one scoped key | PROBE-OBS reduced this to a pure `LANGFUSE_HOST` swap; same trace-in-UI criterion vs AWS. Includes Langfuse retention config. Unblocks Replay Part A / experiments on the permanent host. |
| 4 | **P7 — Superset empty≠zero runtime validator** | Claude (design) | 3rd defense layer (now: prompt + eval-gate). No fragile regex bolt-on; proper design in P7. |

## OPEN — small, fold into next touching phase (no standalone patches)
| Item | Fold into |
|---|---|
| Manifest `_comment` still says drift-guard "WARNs" (it FAILs since F-obs3) | next doc seal — one word |
| GAP-4 prose fix: "adding a backend = a row + a pack + one registration" | first architecture doc touched |
| Nested-I/O allow-list depth: per-key fail-closed accepted as correct default | amend ONLY if a real attribute hits live (AG finding, 2026-07-04) |
| `[ToolFilter] 🧠 Learned` log lines heavily duplicated per turn (cosmetic noise) | any future toolFilter-touching phase — dedup emit |

## OPEN — Maymun's desk
| Item | Detail |
|---|---|
| Bootstrap/template hygiene | The v1 project-instructions text still rides into new chats via Maymun's paste/template. Project FILES are correct (v2 in, v1 deleted — verified). Replace the template block with the 2-line pointer to `CLAUDE-PROJECT-INSTRUCTIONS-v2.md`. |
| Stale ARMES token in IDE MCP config | The fresh token initially went to the IDE ("global MCP settings") — harmless but useless there; remove it. Real fix landed in Supabase. |

## CLOSED 2026-07-04 (do not re-raise)
- **F-obs1** (`8c5387d`): OTel + LangfuseSpanProcessor + redaction skeleton + serverless force-flush; local Langfuse stack versioned in `infra/langfuse/`; RULE 27.
- **PROBE-OBS** (`6b2071b`): production egress PROVEN — prod span visible in local Langfuse UI via ephemeral tunnel; 6.5-min window torn down; AWS = env swap.
- **F-obs2** (`226a255`): turn pipeline (`chat.ts` 1050→133-line HTTP shell + `_lib/turn/*`); manual spans (`cwf.turn/stage/mcp/warm/flush`); ONE turn id (OTel SSOT, log prefix + `telemetry_events.session_id` derive; RULE 28). GAP-3 closed. Sequential-flush deviation accepted (a span cannot record its own exporter).
- **F-obs3** (`7eb59ce`): redaction v2 precedence (env-value substring > usage-allow > segment-EQUALITY deny; TokenDetails over-match dead); full scrubbed+capped tool I/O on MCP spans; ADR-004 (ledger vs trace); GAP-5 closed (drift gate FAIL + cannot-verify=FAIL + CI `fetch-depth:0` hole); RULE 27 wording drift fixed. Canary evidence: planted secret 0 hits / 9× `[REDACTED]` in a 50-span live trace.
- **ARMES prod 401** : root cause = token expired server-side (`e8e9…`); fresh token (`3bce…`) probed BEFORE rollout (400 "Session ID required" = auth pass), rolled to ALL 3 user rows atomically (07:42:15Z), verified live 08:06Z — 141 flat tools, full OEE chain (getFactoryList→getFactoryLines→getDailyOeeValues ×7 zones) on real data, empty≠zero path exercised (one zone honest `total=0`). Diagnosed via Vercel logs + Gemini operator lane; the first attempt had landed in the IDE config, not the DB — three-place confusion resolved.
- **Superset seed**: ALREADY DONE — DB published counts = code reference exactly (7/7 kinds; `routing_hint=0` by design). `seedRules.ts` run NOT needed.
- **`backend_id` backfill**: ALREADY PRESENT on all supersetArmes entries. `armesMes` WITHOUT `backend_id` is BY DESIGN (`backendOf()` → `DEFAULT_BACKEND_ID`=armes) — never "fix" its absence.
- **OA-8 dev half**: local Docker Langfuse = standing DEV observability host. (AWS half = open item #3.)
- **Playwright MCP** disabled project-locally (token cost); no architectural impact.
- **Instructions v2**: project files updated (v1 deleted, v2 uploaded — verified); Gemini/IDE knowledge registered.

## STANDING WATCH
- Gemini operator fence: sanctioned tasks ONLY — no self-initiated "cleanup" (deleted two knowledge dirs unprompted this session; turned out harmless, the reflex is not).
- gpt-4.1-mini attempted `call_tool(search_tools)` in prod; deterministic error message self-corrected it. Gateway-protocol adherence on weak models = future experiment material (replay lab).
- Node version drift: AG runs v26.x vs spec'd v22.x; green so far.
