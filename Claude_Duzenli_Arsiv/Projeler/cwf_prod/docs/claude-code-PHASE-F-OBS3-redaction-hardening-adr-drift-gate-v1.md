# PHASE F-OBS3 — Redaction Hardening + Full Tool I/O + ADR-004 + Drift Gate FAIL
**claude-code-PHASE-F-OBS3-redaction-hardening-adr-drift-gate-v1 · rev 1 · 2026-07-04**
**Repo:** `cwf_yaprak` · **Base:** `origin/master` @ `226a255` (658/658 tests, docVersion rev 24, F-obs2 landed)
**Author lane:** Claude Code (AntiGravity).

---

## 0. WHY

F-obs1 shipped the redaction SKELETON; F-obs2 deliberately withheld raw tool payloads from spans until that boundary hardened (C7). This phase closes the loop: harden the scrubber into the deterministic boundary it was always meant to be, then unlock the observability value the restraint was protecting — full (scrubbed, capped) tool I/O on MCP spans. Two governance items ride along because their conditions just matured: **ADR-004** (the ledger/trace separation is now real, running architecture — it must be sealed as a decision, not folklore) and **GAP-5** (doc-drift WARN→FAIL was deferred "until the next full tab reconcile" — that reconcile happened at rev 24; the condition is met).

Known bugs this phase fixes (both catalogued, neither guessed):
1. **The `…TokenDetails…` over-match** (found live in PROBE-OBS): `/token(?!s)/i` redacts `ai.usage.inputTokenDetails.cacheReadTokens`, `reasoningTokens`, etc. — harmless but it masks exactly the cache/reasoning counters we observe FOR.
2. **RULE 27 wording drift** (found in F-obs2 review): the rule still says the OTel flush is "joined into the finally `Promise.allSettled` — keep it there", but F-obs2's sanctioned deviation made it sequential (a span cannot record its own exporter). A future session following the rule literally would reintroduce the bug the deviation fixed. One-line amendment in this phase's seal.

## 1. HARD PRE-FLIGHT GATE
```bash
git fetch origin && git rev-parse origin/master        # MUST be 226a255...
git status --porcelain                                  # empty (stash-protect operator-local files if present)
npx vitest run 2>&1 | tail -3                           # 658 passed (658)
docker compose -f infra/langfuse/docker-compose.yml ps  # 6/6 up (live evidence needed)
```
Branch: `feat-fobs3-redaction-adr-drift`.

## 2. HARD CONSTRAINTS
- **C1 — Determinism is the contract.** The scrubber stays pure over (input, env): no I/O, no clock, no randomness, no logging of what matched. Every rule below is expressible as a unit test.
- **C2 — THE DESIGN TRAP, named so it is not shipped:** segment-aware matching ALONE does not fix the over-match — `inputTokenDetails` still contains the segment `Token`. The fix is **precedence**, and the order is non-negotiable:
  1. **Env-value equality/substring masking wins over everything** — a real secret value is masked wherever it appears, even inside an allow-listed key's value.
  2. **Usage-counter allow-list passes key-based masking:** attribute keys under the GenAI usage namespaces (`gen_ai.usage.`/`ai.usage.` prefixes) and token-COUNT shaped keys are never key-redacted — they are counters, not credentials.
  3. **Segment-aware deny-list redacts the rest:** keys are split into segments (camelCase humps, `_`, `-`, `.`), and a key is sensitive iff a SEGMENT equals a deny-listed word (`authorization`, `apikey`/`api`+`key` adjacency, `token`, `secret`, `password`, `bearer`, `jwt`). Substring matching of keys is retired with the lookahead hack.
- **C3 — Value-substring masking is bounded and exact:** every currently-set sensitive env VALUE (existing ≥8-char guard stays) is masked as a SUBSTRING inside every string attribute (prompt bodies, completion text, tool args/results) — exact-match substring replace, no fuzzy/regex-over-secrets. Cost is |secrets| × scan, deterministic.
- **C4 — Tool I/O unlock is scrub-then-cap, config-governed:** MCP tool spans gain the result payload attribute — value = `scrubIoData(result)` serialized then capped by a NEW config constant (sibling of `MCP_SPAN_ARGS_MAX_LEN`; RULE 1). Cap AFTER scrub, never before (capping first can split a secret across the boundary and leak its prefix). Result META attributes stay as-is.
- **C5 — Ledger untouched.** `telemetry_events` payloads/schema unchanged; this phase touches the TRACE side only.
- **C6 — Drift gate escalation is honest, not theatrical:** `check:doc-drift` exits non-zero (FAIL) on mapped-area drift — in the build gate and CI alike. No env override, no skip flag. The reseal mechanism (manifest `lastSyncedCommit`) is the ONLY way through, exactly as designed.
- **C7 — Behavior floor:** RULE 27/28 invariants hold (no-op when disabled; flush before `res.end()`; one turn id). Chat path behavior untouched.

## 3. GATED SUB-PHASES

### 3.1 — Scrubber hardening (redaction.ts v2)
Implement the C2 precedence + C3 substring masking. Keep `scrubSpanAttributes`/`scrubIoData` signatures stable (call sites don't change). Delete the `/token(?!s)/i` lookahead with a comment pointing at the precedence design. Unit tests as a **precedence matrix** — at minimum:
- `ai.usage.inputTokenDetails.cacheReadTokens` / `reasoningTokens` / `gen_ai.usage.input_tokens` → VISIBLE (rule 2 beats rule 3)
- `access_token`, `idToken`, `x-auth-token`, `apiKey`, `API_KEY`, `authorization` → REDACTED (segment hit)
- an allow-listed key whose VALUE equals a sensitive env value → value REDACTED (rule 1 beats rule 2)
- a prompt-body string containing a sensitive env value mid-sentence → that substring masked, rest intact (C3)
- `tokenizer`, `tokens_per_second` → VISIBLE (no segment equals `token`… note: `tokens` is not a deny word); `token_count`… decide and TEST the call: `token` segment present → key-redacted UNLESS usage-allow-listed — document this edge in a test with a comment.
- determinism: same input twice → identical output.
**Gate:** matrix green + full suite green.

### 3.2 — Tool I/O unlock (stageTools/mcpClient span site)
Add the scrubbed+capped result payload attribute per C4 (new `ATTR_TOOL_RESULT` + cap constant in observability config). Update the C7-restraint comments from F-obs2 to point here.
**Gate:** unit test proving scrub-then-cap order (a secret straddling the cap boundary never leaks a prefix) + full suite green.

### 3.3 — ADR-004 (ledger vs trace)
Write `docs/adr/ADR-004-ledger-vs-trace-separation.md` (house ADR format, versioned inside): **`telemetry_events` = durable governance/safety LEDGER** (counts + safe metadata, no PII/payloads, RBAC-read, retention = long) vs **OTel→Langfuse = causal DEBUG traces** (full scrubbed I/O, retention-bounded, admin/dev consumers). The join key is the RULE 28 turn id (`session_id` = trace id). Decision includes the two standing prohibitions: never conflate the systems, never mint a parallel per-turn id.
**Gate:** file exists, referenced from RULE 27/28 blocks.

### 3.4 — GAP-5: drift gate WARN→FAIL
Flip `scripts/checkDocDrift.ts` (and its `check:doc-drift` wiring in the build gate) to exit non-zero on drift per C6. **Evidence must show the teeth:** with a TEMPORARY uncommitted edit to a mapped file, run the check → FAIL (paste output); revert → PASS. 
**Gate:** both runs pasted; the temp edit demonstrably reverted (`git status --porcelain` empty).

### 3.5 — Live verification (Langfuse stack up)
One real dev turn with ≥1 MCP tool call, plus a PLANTED fake secret: set a throwaway env var with a deny-listed name (e.g. `PROBE_FAKE_API_KEY=cwf-fobs3-canary-…`, value ≥ 8 chars) and craft the turn so the canary value appears inside a tool arg or prompt body. Evidence from the Langfuse UI:
1. `…TokenDetails…` counters now VISIBLE on GENERATION spans (the over-match is dead).
2. The MCP tool span carries the result payload (present, non-empty, capped).
3. The canary value appears NOWHERE in the full trace JSON — masked in both key-position and substring-position; `[REDACTED]` visible where it was planted.
4. RULE 27/28 sanity: flush still pre-`res.end()` (turn behaves normally), one id across log prefix / trace / ledger row (spot-check one turn).
Remove the canary env var afterward.
**Gate:** all four evidenced (trace id + screenshots/JSON excerpts). Trace-in-UI, never build-green.

### 3.6 — Living-doc seal (separate commit)
- **RULE 27 amendment (the drift fix):** replace the "joined into the finally `Promise.allSettled`" wording with the landed truth — *writes-flush span ends, THEN `forceFlushObservability()`, both before `res.end()`; a span cannot record its own exporter — do not re-merge them.* Extend the redaction bullet: precedence design (env-value > usage-allow > segment-deny), tool I/O now on spans, ADR-004 reference.
- Re-sync affected tabs (Agent Control Plane Observe cell: F-obs3 LANDED; others reseal-only with justification — no runtime topology change expected). Manifest → **rev 25**.
- Note GAP-5 closure + the drift gate's new FAIL semantics in the changelog and KB.
**Gate:** `check:doc-drift` clean (now under FAIL semantics — the gate polices its own seal commit).

### 3.7 — Merge + push (RULE 25)
`--no-ff`, branch deleted, push, report `git rev-parse origin/master`.

## 4. SELF-VERIFICATION CHECKLIST (evidence per line)
- [ ] Pre-flight: HEAD `226a255`, 658/658, stack 6/6
- [ ] Precedence matrix tests green (each C2/C3 row present); lookahead hack deleted
- [ ] Scrub-then-cap order test (boundary-straddling secret never leaks)
- [ ] `ATTR_TOOL_RESULT` + cap constant in config (RULE 1)
- [ ] ADR-004 committed, cross-referenced from AGENTS.md
- [ ] Drift gate: FAIL run + PASS run pasted; temp edit reverted
- [ ] Live: TokenDetails visible · tool result payload on span · canary masked everywhere · one-id spot-check
- [ ] Canary env var removed
- [ ] RULE 27 amended to sequential-flush truth; manifest rev 25; drift check clean under FAIL semantics
- [ ] Full suite green (≥ 658 + new; report count)
- [ ] `--no-ff` merged, pushed, remote hash reported

## 5. NON-GOALS
No OBS-3.1/perturbed retry, no replay/dataset/experiment work, no AWS host, no Langfuse retention config (AWS phase), no `telemetry_events` changes, no new spans beyond the result attribute, no scrubbing of the LEDGER (it is redacted at emit by design, different system). If the precedence design proves insufficient for a real attribute found live: report the attribute as a finding and stop — the design amendment is the architect's call, not an in-phase improvisation.
