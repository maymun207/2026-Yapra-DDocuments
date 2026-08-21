# PHASE SC-2 — Remaining Stage Snapshots · Verdict Badge · LOG-3 Usage Ladder · v1

<!-- claude-code-PHASE-SC-2-v1 · rev 1 · 2026-07-19 · Architect-authored.
     Design SSOT: cwf-sc2-design-v1 (§2 disposition OWNER-RATIFIED, S53).
     Anchor: master f1c40d8 (docVersion rev 113 · 294 files / 2893 tests · drift OK).
     Ceremony: FULL (api/** touched). No DB migration. No telemetry enum change.
     CI (unsharded) green on the PR head = merge precondition (S37-2/S43-2).
     Grounded in a fresh clone read at f1c40d8: stageContextSlice.ts,
     stage-context.ts, stageStream.ts:108–158, configFingerprint.ts,
     StageContextSection.tsx, package.json scripts. -->

**PRECONDITION (S47-1):** This prompt is valid only while `origin/master == f1c40d8`
and no open PR touches `api/admin/stage-context.ts`,
`api/cwf/_lib/replay/stageContextSlice.ts`, or `api/cwf/_lib/turn/stageStream.ts`.
On mismatch: **STOP and report the actual state** — do not adapt silently.

**PLATINUM compliance:** every snapshot below is derived from recorded data or a
deterministic re-run of existing production code — zero configuration, zero
manual steps. Permanent-thin cards are self-declaring data, not settings.

---

## 0 · Mission

SC-1 shipped the oscilloscope for stages 01/07/09/10/11 and honestly marked the
rest `{ thin: 'sc2' }` — "sc2 will decide." This phase IS that decision: every
remaining stage id either gains a REAL snapshot (**00 · 02 · 03 · 05 · 06 · 12
· 13**) or converts to a PERMANENT honest thin with a machine-readable reason
(**04 · 08 · 14**). After this phase the literal `sc2` must not exist anywhere
in `api/ src/ shared/` (grep-pinned zero). Riding along: the shared
`SnapshotVerdictBadge` (three states, shield tone — F38) and the LOG-3
deterministic usage ladder in `stageStream.ts` (both sinks). This is the
empty≠zero render taxonomy applied to the inspector itself: deferred ≠ absent.

---

## 1 · Hard pre-flight (all must pass before writing a line)

```bash
git fetch origin && git rev-parse origin/master   # MUST print f1c40d8… — else STOP (S47-1)
git checkout -b sc-2 origin/master
npm ci
npm test                    # vitest run — unsharded, the same experiment CI runs
npm run typecheck:api
```

**Discovery reads (in-repo ground truth over this prompt's summaries — report
the answers in your completion report):**

- D1. Read the `turn_done` and `llm_call` telemetry EMITTER sites and record the
  exact payload field names for: reserved tokens, actual tokens, the
  quota-degraded flag, and the resolved-params capture (the PARAM-GOV era
  stamps). Stage 00 and stage 05 read THESE fields — never guessed names.
- D2. Read the grounding/scope telemetry emitter(s) and record the exact event
  `type` strings for grounding verdicts/catches and scope notices. Stage 12
  filters on THESE.
- D3. Confirm `rawToolResults` shape on the recorded turn
  (`loadTurnForStageContext`) — the per-call `callId`/args fields VIZ-BIND-1
  added. Stage 13 counts THESE (structural only).
- D4. Confirm which files in this phase's touch set are doc-manifest-mapped
  (`stageStream.ts` almost certainly is) — budget the reseal (S34-1).

---

## 2 · Binding constraints

- **C1 LAW / read-only:** the entire stage-context path stays zero-write. Grep
  pin: no `.insert(` / `.update(` / `.upsert(` / `.delete(` in
  `stageContextSlice.ts`, the new `asOfGovernedSlice` module, or
  `stage-context.ts`.
- **Gate byte-unchanged:** the `ensurePermission(ctx, PERMISSIONS.TELEMETRY_READ_ALL, res)`
  line in `stage-context.ts` stays byte-identical.
- **Frozen surfaces (diff-empty):** `gateway.ts` · eval-gate machinery ·
  `routeKeywordLayer` / `semanticRouter.ts` / `resolveRouterPolicy.ts` ·
  `configFingerprint.ts` (read its exports; never edit).
- **`llm_call` event SHAPE unchanged:** the emitted object's keys and structure
  are shape-pinned in existing tests — those tests must pass UNMODIFIED. Only
  the VALUES now flow through the usage ladder.
- **No migration. No telemetry enum change** — this phase only READS telemetry.
- **Redaction posture:** new reads expose no free-text bodies. History heads are
  capped previews (C9); tool results are structural projections through the
  existing `scrubIoData` posture — never raw I/O.
- **Engine-tag contract preserved:** stages 03 and 07 return
  `{ engine: 'keyword', artifact }` — the exact seam IR-1's frame renders
  beside later. Do not restructure it.
- **Endpoint envelope additive-only:** existing `meta` fields and existing
  stage snapshot shapes (01/07/09/10/11) unchanged except where G1/G5 say so.
- **Bilingual copy** via the section's existing `t(tr, en)` convention.
- **Branch `sc-2`; no merge by AG.** Push + open PR; the Architect reviews
  (FAST-GATE) and authors the verbatim `--no-ff` merge message at GO. Squash
  remains banned.

---

## 3 · Gated sub-phases (each gate = tests green before the next)

### G1 — Characterization pin, then `asOfGovernedSlice` extraction

1. **BEFORE touching any code:** add a characterization test that pins the
   FULL JSON output of `resolveStage09` for a deterministic mocked-repo
   fixture (mock `getVersions` / `getPublishedByKind`; fixed `recordedAt`;
   cover BOTH branches: byte-faithful AND diverged-with-publishesSince).
2. Extract the as-of pattern into ONE shared module
   `api/cwf/_lib/replay/asOfGovernedSlice.ts`: the generalized form of
   `resolveSegmentAsOf` + the currentRows→asOf→`publishesSince` comparison —
   parameterized over (repo, kind, rule keys, atMs), returning per-key
   `{ asOfPayload, asOfVersionNo, currentPayload, currentVersionNo }` plus the
   derived `publishesSince`. Zod parsing stays at the CALLER (each consumer
   owns its payload schema).
3. `resolveStage09` becomes consumer #1. **Gate: the characterization test
   passes byte-identical, UNMODIFIED.**

### G2 — LOG-3 usage ladder (pure, both sinks)

1. New pure module `api/cwf/_lib/turn/finishUsage.ts`:
   `resolveFinishUsage(info) = info.totalUsage ?? sumSteps(info.steps) ?? info.usage`.
   Rung semantics (bank-grade = honest, never invented): a rung is taken only
   if it yields at least one real number. `sumSteps` sums each usage field
   across steps where present; a field absent from EVERY step stays
   `undefined`; if NO step carries any numeric usage, the rung yields
   `undefined` and the ladder falls through. A fully-empty ladder returns the
   original (possibly empty) `info.usage` — NULLs stay NULL.
2. In `stageStream.ts` `onFinish`: `const usage = resolveFinishUsage(info);` —
   the SAME resolved object now feeds ALL FOUR consumers: `ctx.actualTokens`
   accumulation, the `[Token Usage]` line, the `[LLMFinish]` line, and the
   `llm_call` emit. No other logic in `onFinish` changes.
3. Regression fixtures (unit tests on the pure module + one stageStream-level
   test): (a) `finishReason='other'`, empty `info.usage`, real per-step usage →
   resolved totals are the step sums; `llm_call` token columns non-null;
   `ctx.actualTokens` accumulates the sum. (b) fully usage-less event →
   resolved stays empty; token columns NULL; `ctx.actualTokens` += 0 — no
   fabricated count. **Existing `llm_call` shape-pin tests pass unmodified.**

### G3 — Seven BUILD cards (extend `stageContextSlice.ts`; wire in `stage-context.ts`)

Every resolver is a read-only SELECT through the service client or a pure
re-run of existing production code. Use D1–D3's discovered field names.

- **00 quota — `[recorded]`.** From telemetry for `turn.traceId`: reserved vs
  actual tokens and the quota-degraded flag out of the `turn_done` +
  `llm_call` events (loader sibling to `loadTurnDoneTelemetry`). Read-only
  join; ZERO re-computation.
- **02 identity — `[recorded]`, minimal.** From the loaded turn:
  `ownerUserId`, `conversationId`, `recordedAt`, plus an explicit
  disclosed-gap note (bilingual): role-at-time is NOT persisted — the card
  says so; it never infers.
- **03 route — `[rebuilt, hash-verified]`.** Re-run the keyword layer over the
  recorded query with the CURRENT learned map exactly as stage 07 already does
  (REUSE the same resolution path — do not duplicate it). Verdict vs the
  recorded hash: compute `currentLearnedMapHash()` and compare against
  `meta.routingMapHashAtRecording` (already read in the endpoint):
  equal → `byte-faithful` · different → `diverged` · recorded hash absent
  (pre-ADD-2 turn) → `unverifiable`, stated. Engine-tagged
  `{ engine: 'keyword', artifact }`.
- **05 history — `[rebuilt, exact]`.** Resolve `historyWindowN` from the
  turn's RECORDED params capture (D1); if the recorded capture lacks it, say
  so on the card and fall back to the current governed value with an explicit
  provenance label — never silently. Then reproduce the exact window slice
  from the `messages` table (the N prior messages in the conversation at
  `recordedAt`): ids + role + capped head preview ONLY (C9).
- **06 knowledge — `[rebuilt, hash-verified]`.** Consumer #2 of
  `asOfGovernedSlice`: walk the published knowledge rows for the turn's
  active backends as-of `recordedAt`, recompute via the EXPORTED
  `knowledgeHashFrom(...)` (import from `configFingerprint.ts` — never
  reimplement), compare vs the fingerprint's `knowledgeHash` →
  `byteFaithful` | `divergence{ publishesSince }` — the 09 pattern verbatim.
  Retire 09's `KNOWLEDGE_NOTE` placeholder (its job now exists as this card).
- **12 grounding — `[recorded]`.** Telemetry events for the traceId filtered
  to the grounding-verdict/catch + scope-notice types (D2). Copy discipline
  (F38): a catch is the system WORKING — shield framing, never red-alarm;
  bilingual.
- **13 persist — `[recorded]`, trivial.** `messageId`, the trace id (the
  client renders the TRACE-LINK-1 deep-link from its existing
  ObservabilityConfig — no new server surface), and `rawToolResults` count +
  per-call `callId` list (D3; structural only).

Endpoint: fill `stages['00'|'02'|'03'|'05'|'06'|'12'|'13']` with the new
resolvers (parallelize the independent reads as the existing `Promise.all`
does).

### G4 — Permanent thins + `sc2` retirement

1. Replace the `ThinStage` shape project-wide:
   `{ thin: 'no-artifact'; note: { tr: string; en: string }; links: string[] }`
   (links = stage ids the card points to; may be empty for register pointers).
   - **04 plan:** "ayrı planlayıcı yok (ReAct) — araç döngüsü planın kendisi /
     no separate planner (ReAct) — the tool loop IS the plan" → `links: ['11']`.
   - **08 warm:** "warm altyapıdır — ÇIKTISI 06/09'un anlık görüntüleridir /
     warm is infrastructure — its OUTPUT is stages 06/09's snapshots" →
     `links: ['06','09']`.
   - **14 learn:** "tur-başına öğrenme atfı bugün yalnız logda (born-loud
     [Route] özeti), persist edilmiyor — MEMORY-1 büyüme noktası / per-turn
     learn attribution is log-only today (born-loud [Route] summary), not
     persisted — MEMORY-1 growth point" → `links: []`.
2. Client: update `isThin` to the new shape; thin cards render the note +
   tappable links that jump to the linked stage card. Never a bare thin.
3. **Grep pin:** `grep -rn "sc2" api/ src/ shared/ --include="*.ts" --include="*.tsx"`
   returns ZERO matches (comments included — clean the SC-1 header comments
   and the `KNOWLEDGE_NOTE` mention too). `.agents/` docs use "SC-2" (capital,
   hyphen) which correctly does not match.

### G5 — `SnapshotVerdictBadge` (shared, three states)

1. New `src/components/admin/SnapshotVerdictBadge.tsx`, props
   `{ verdict: 'byte-faithful' | 'diverged' | 'unverifiable'; publishesSince?: number }`:
   - `byte-faithful` → quiet success outline: "bayt-uyumlu ✓ / byte-faithful ✓".
   - `diverged` → informational SHIELD tone (F38: governance moved on = the
     system working; NEVER destructive/red):
     "sürüm farkı — bu turn'den beri N yayın / diverged — N publishes since".
   - `unverifiable` → neutral muted: "doğrulanamaz — ADD-2 öncesi turn /
     unverifiable — pre-ADD-2 turn".
2. Adopt at stage 09 (replacing the current inline byte-faithful/divergence
   badges in `StageContextSection.tsx`), stage 03, and stage 06.
3. **RULE 26:** all three states render without clipping at 1280 AND 1024 —
   rendered evidence required (extend the existing `test:rule26` Playwright
   job or an equivalent rendered-viewport assertion; state which and paste the
   proof).

### G6 — Tests · docs · seal

- Full new-test set: G1 characterization (unmodified-green) ·
  `asOfGovernedSlice` units · 03 verdict TRIPLET (match / diverged /
  absent-hash) · 06 verify pair (byte-faithful + diverged fallback) ·
  00/02/05/12/13 resolver units with mocked reads · thin-shape + links render
  · G2 fixture pair · endpoint test updated for the full stages map ·
  StageContextSection render tests for every new card + badge states.
- `.agents/` CHANGELOG + skill-KB entries for SC-2 — IN scope this time
  (the NAV-STACK-1 omission lesson).
- Reseal on the final tree if D4 confirms mapped files (expected: yes,
  `stageStream.ts`); drift gate OK.
- Push `sc-2`, open the PR, let CI (unsharded) run.

---

## 4 · Self-verify checklist (evidence, not claims)

1. `git rev-parse` of the branch head + PR number + **CI run link, green,
   unsharded** (merge precondition).
2. Characterization proof: test name + statement that it passed UNMODIFIED
   after the G1 extraction.
3. 03 verdict triplet + 06 verify pair + G2 fixture pair: test names + pass.
4. `llm_call` shape-pin tests: listed, UNMODIFIED, green.
5. Grep outputs pasted verbatim: (a) `sc2` → zero; (b) write-methods in the
   stage-context path → zero; (c) the `TELEMETRY_READ_ALL` gate line, byte-identical.
6. Frozen-surface proof: `git diff f1c40d8..HEAD --stat -- api/cwf/_lib/gateway.ts
   api/cwf/_lib/semanticRouter.ts api/cwf/_lib/knowledge/resolveRouterPolicy.ts
   api/cwf/_lib/turn/configFingerprint.ts` → empty (plus the eval-gate files).
7. RULE 26 evidence for the badge's three states at 1280/1024.
8. D1–D4 discovery answers (the exact field/event names used).
9. Test delta: N files / M tests vs the anchor's 294/2893; docVersion rev
   after reseal; drift-gate output verbatim.
10. Confirmation: no migration files added; no merge performed.

**Report back** with all ten items. The Architect reviews via FAST-GATE and
issues GO + the verbatim merge message.

<!-- END · claude-code-PHASE-SC-2-v1 · rev 1 · 2026-07-19 -->
