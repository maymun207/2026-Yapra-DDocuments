# CWF — SET-CONTEXT-2 Design Note · v1

<!-- cwf-sc2-design-v1 · rev 1 · 2026-07-19 · Architect-authored.
     Anchor: master 3da9966 (rev 113, 292 files / 2865 tests, drift OK).
     Parent: cwf-set-context-design-v1_2 (SC-1, shipped a82c2a2) · register v53 §1.2.
     Scope: remaining stage snapshots + divergence-badge polish + LOG-3 fix.
     Ceremony: FULL (api/** touched). No DB migration. -->

**PLATINUM compliance:** every snapshot is derived from recorded data or
deterministic re-run of existing production code — zero configuration, zero
manual steps; permanent-thin cards are self-declaring data, not settings.

## 1 · The one design decision: `{thin:'sc2'}` retires

SC-1's honest placeholder promised "sc2 will decide." SC-2 is that decision:
every stage id either gains a REAL snapshot or converts to a PERMANENT honest
thin with a machine-readable reason — `{ thin: 'no-artifact', note }`. After
this phase, `'sc2'` must not exist in the codebase (grep-pinned). This is the
empty≠zero render taxonomy applied to the inspector itself: deferred ≠ absent.

## 2 · Per-stage disposition (grounded in what is actually recorded)

| Stage | Disposition | Source & verification |
|---|---|---|
| 00 quota | **BUILD** (recorded) | turn_done + llm_call ledger events for the traceId: reserved vs actual tokens, quotaDegraded flag. Read-only telemetry join, no re-computation. |
| 02 identity | **BUILD** (recorded, minimal) | messages row: user, conversation id, recordedAt. Role-at-time is NOT persisted — the card says so explicitly (disclosed gap, not inferred). |
| 03 route | **BUILD** (rebuilt, hash-verified) | routeKeywordLayer over the recorded query with the CURRENT learned map; verdict vs the turn's recorded `routingMapHash` (ADD-2): match → byte-faithful; mismatch → diverged; pre-ADD-2 turn (hash absent) → `unverifiable`, stated. Engine-tagged `keyword` — the exact seam IR-1's frame renders beside later. |
| 04 plan | **THIN permanent** | `no-artifact`: "no separate planner (ReAct) — the tool loop IS the plan"; links stage 11. |
| 05 history | **BUILD** (rebuilt, exact) | historyWindowN from the turn's paramsCapture-derived fingerprint + the messages table reproduces the exact window slice (ids + heads only, C9). |
| 06 knowledge | **BUILD** (rebuilt, hash-verified) | Generalize SC-1's stage-09 as-of walker into ONE shared `asOfGovernedSlice` helper (reuse-not-rebuild); rebuild the knowledge slice as-of recordedAt, byte-verify vs recorded `knowledgeHash`, honest divergence fallback with publishesSince — the 09 pattern verbatim, second consumer. |
| 08 warm | **THIN permanent** | `no-artifact`: "warm is infrastructure — its OUTPUT is stages 06/09's snapshots"; links both. |
| 12 grounding | **BUILD** (recorded) | telemetry events for the traceId: grounding verdicts/catches + scope notices. F38 lesson applies to copy: a catch is the system WORKING (shield, not alarm). |
| 13 persist | **BUILD** (recorded, trivial) | messageId, trace deep-link (TRACE-LINK-1), rawToolResults count + callIds. |
| 14 learn | **THIN permanent** | `no-artifact`: "per-turn learn attribution is log-only today (born-loud [Route] summary), not persisted" — register-pointed (MEMORY-1 / findings-v5 growth point). |

Build set: **00 · 02 · 03 · 05 · 06 · 12 · 13** (7 cards). Permanent-thin:
**04 · 08 · 14** (3 cards, each with a specific reason + link — never bare).

## 3 · Divergence badge (the polish half)

One shared `SnapshotVerdictBadge` for every hash-verified rebuild (09 today,
03/06 new): `byte-faithful ✓` (quiet) · `diverged — N publishes since`
(informational shield tone, NEVER red-alarm; divergence means governance moved
on, which is the system working) · `unverifiable — pre-ADD-2 turn` (03 only).
Bilingual per the standing convention; replaces 09's current inline text.

## 4 · LOG-3 fix (slotted here per register v53 §1.8 — api-touching phase)

Root (read at stageStream.ts:118–151): only `info.usage` is read in onFinish;
on `finishReason=other` / multi-step fan-out the SDK can leave it empty →
`llm_call` writes NULL token columns AND `ctx.actualTokens` (:127)
under-accumulates → quota settle true-up under-counts (~25% of turns, LOG-3
evidence: sessions 3024ade2 / 3e984082).

Fix — ONE deterministic usage ladder, used by BOTH sinks:
`resolveFinishUsage(info) = info.totalUsage ?? Σ info.steps[].usage ?? info.usage`
(missing fields inside a rung never poison the rung: sum treats absent as 0
only when at least one step carries real numbers; a fully-empty ladder still
yields nulls — we never fabricate a count, bank-grade means honest, not
invented). `[Token Usage]`/`[LLMFinish]` log lines and the llm_call event read
the SAME resolved object; `ctx.actualTokens` accumulates from it. Regression
tests: a `finishReason=other` fixture with step-level usage (NULLs → real
sums) and a fully-usage-less fixture (stays NULL, no fabrication).

## 5 · Non-goals (byte-level)

No new table/migration · no telemetry enum change (reads only) · stage 09's
walker RELOCATES into the shared helper with byte-identical 09 output
(characterization-pinned) · no gateway.ts change (the usage ladder lives in
stageStream's onFinish scope) · frozen surfaces untouched · `{thin:'sc2'}`
grep returns zero post-phase.

## 6 · Self-verify demands (for the phase prompt)

CI unsharded green · characterization: 09 snapshot byte-identical pre/post
helper extraction · 03 verdict test triplet (match/mismatch/absent-hash) ·
LOG-3 fixture pair · SnapshotVerdictBadge renders all three states without
clipping at 1280/1024 (RULE 26) · endpoint stays TELEMETRY_READ_ALL-gated,
C1 read-only (grep-pinned unchanged).

**Owner gate before the phase prompt:** ratify the §2 disposition table —
specifically the three PERMANENT thins (04/08/14). Everything else is
mechanical.

<!-- END · cwf-sc2-design-v1 · rev 1 · 2026-07-19 -->
