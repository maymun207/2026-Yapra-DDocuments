# PHASE `VIZ-BIND-1` — a table stops answering for a call it did not come from

<!-- claude-code-PHASE-VIZ-BIND-1-v1 · rev 1 · 2026-07-14 · Session 41.
     Author: Architect. Executor: AG (Claude Code / AntiGravity).
     Closes F82 (CRITICAL) · F64 · F63. Adds the [Params] log line (Architect blindness, S40-5).
     Anchor: origin/master dd04831 · 2183 tests / 213 files · docVersion rev 73 · drift [OK].
     Ceremony: FULL. Touches api/** and shared/** ⇒ expect a reseal.
     CONTAINS AN OWNER STEP (§6) — a code-only change to the governed `viz` segment is INERT. -->

---

## 0 · PRE-FLIGHT GATE

```bash
cd /tmp && rm -rf cwf_yaprak && git clone --quiet https://github.com/maymun207/cwf_yaprak.git
cd cwf_yaprak && git rev-parse origin/master   # RECORD — expect dd04831; if not, re-derive everything
npm ci --no-audit --no-fund --silent
npx tsc -b                                     # clean
npx tsx scripts/checkDocDrift.ts               # [OK] — RECORD the rev
npx vitest run --reporter=dot                  # RECORD count / files (UNSHARDED)
```

---

## 1 · WHY — the defect, in production, today

The owner asked for a 24-hour A3 report across **three** production lines. The turn made **12** tool
calls, among them `getLineStopsReport` **four** times — once per line. The prose was correct:
Glazur3 **41** stops, FIRINALT **3**, IKINCILALT **23**.

Under all three headings the UI rendered **the same 23 rows**.

`src/lib/toolResultSelect.ts`:

```ts
const inScope = tool ? results.filter((r) => r.toolName === tool) : results;
for (let i = inScope.length - 1; i >= 0; i--) if (isRecordDerivable(inScope[i].raw)) return inScope[i];
```

The viz directives (`[TABLE_FROM_TOOL]` / `[CHART_FROM_TOOL]`) address a tool result **by tool NAME**.
A name is a unique key only while the tool is called once. Call it N times and the key collides, and
the collision is resolved **last-write-wins, silently**. FIRINALT's heading carried another line's data.

**Read the failure precisely, because the fix depends on it:**
- **Grounding HELD.** The model saw the right rows; the numbers in the prose are right.
- **The RENDER layer lied.** It presented data from call X under the label of call Y.

This is the third appearance of one defect family:
- S39/E.3 — the same tool offered to the model twice, collisions resolved last-write-wins.
- S40 — the knowledge layer declared a tool the routing layer never offered; nothing checked.
- **S41/F82 — a viz segment binds to a name; four calls share it; nothing checks.**

The family's one sentence: **a guess on an ambiguous key must never look like an answer.**
`empty ≠ zero` says a missing number must not render as `0`. Its sibling, established here:
**wrong ≠ missing.** An honest gap is recoverable. A confident mislabel is not.

---

## 2 · BINDING CONSTRAINTS

1. **S39-2 — master ONLY via a reviewed PR.** Branch → PR (fires CI) → the Architect's verbatim merge
   message. CI green on the PR head is the merge precondition (S37-2: a sharded local green is not
   the experiment CI runs).
2. **The renderer NEVER trusts the model for DATA.** It already doesn't (rows/series come only from
   `rawToolResults`). This phase keeps that: the model may **propose** which call it means; the
   **recorded** call args decide whether that proposal resolves. A directive can select, never assert.
3. **Ambiguity is rendered, not resolved.** If the binding is ambiguous, the UI says so. There is no
   code path in this phase where an unresolved segment silently picks one of N results.
4. **`empty ≠ zero` render law is untouched.** The existing three-way outcome (derivable → grid /
   empty result → empty grid / non-tabular → honest note) stays byte-for-byte in behaviour. You are
   adding a FOURTH outcome (ambiguous), not rewriting the other three.
5. **C1 LAW — zero writes to `messages`.** Nothing in this phase persists to that table.
6. **No eval-gate machinery change.** No diff to the staging engine, stage order, or schema
   interpreter.
7. **No secret ever reaches a span, a log, or the client.** Tool args are user/domain values — but
   scrub them through the EXISTING redaction path before they leave the server. Do not invent a
   second scrubber; reuse the one F-obs3 built.

---

## 3 · SUB-PHASES (gated — do not start B before A's tests are green)

### A · The call becomes addressable (server) — also closes **F64**

`rawToolResults` records **what came back** and not **what was asked**. That is why the owner had to
open Langfuse to read `{factoryId:"KB7"}`, and it is why the client cannot disambiguate.

1. Find where `rawToolResults` is assembled (grep — do not assume; it is on the turn path).
2. Extend each recorded result with:
   - `callId: string` — a stable, per-turn ordinal (e.g. `"3"` or `"getLineStopsReport#2"`). It must
     be **stable for the message** (it is persisted with the message payload and re-read on reload).
   - `args: unknown` — the arguments the tool was actually called with, **scrubbed through the
     existing redaction path**.
3. The type change lands in the shared/API type that the client already imports. **Old messages have
   neither field** — every consumer must treat both as optional and degrade honestly (an old message
   renders exactly as it does today; no crash, no fabricated caption).
4. **F64:** the chat "Ham tool çıktısı" panel renders, per call, the **args** alongside the output.

**Gate A:** tests prove (a) `args` are recorded and scrubbed, (b) `callId` is unique within a turn and
stable across a reload, (c) a message persisted BEFORE this phase still renders.

### B · The binding becomes explicit (client, pure) — closes **F82**

Replace `selectToolResult` with a resolver whose return type **can say "I don't know"**:

```ts
type ToolBinding =
  | { kind: 'one'; result: RawToolResult }
  | { kind: 'none' }
  | { kind: 'ambiguous'; candidates: RawToolResult[] };   // ← the new, load-bearing case
```

Resolution order, deterministic:

1. Segment carries `callId` → the call with that id. No such call → `none`.
2. Segment carries `match` (an object, e.g. `{"zoneId":"eee1…"}`) → the calls whose **recorded** args
   contain every key/value in `match`. Exactly one → `one`. Zero → `none`. More than one → `ambiguous`.
3. No discriminator, exactly one call of that tool in the turn → `one` *(today's behaviour, preserved —
   this is the common case and it must not regress)*.
4. **No discriminator, N > 1 calls of that tool → `ambiguous`. NEVER pick.** This single line is the
   phase.

Keep the existing `isRecordDerivable` preference **within** a candidate set — it never crosses the
ambiguity boundary.

**Gate B:** a RED-first test that reproduces the production failure exactly — three
`table-from-tool` segments naming `getLineStopsReport`, four recorded calls with different args —
and asserts that **no** segment renders another call's rows.

### C · The UI tells the truth (client) — the visible half of F82

1. **Provenance caption on every from-tool table and chart.** Under the title, in the muted style
   already used by `UnavailableNote`: the tool name and the **recorded** args of the call the data
   actually came from. *(ADR-001 in one line: a table that names its source cannot mislabel silently.
   Even if the model puts the right table under a wrong heading, the caption catches it by eye.)*
2. **The ambiguous case renders an honest panel**, not a guess: state that the tool ran N times and
   the directive did not say which run, then render the N candidates, **each captioned by its args**,
   collapsed. The data is not hidden — only the false certainty is.
3. **F63:** the X axis stops printing raw epoch ms. Deterministic and bounded: an x field whose values
   are all integers in the epoch-ms range renders as a human timestamp. **The underlying value is
   never altered** — this is a label formatter, pure and unit-tested, nothing else.

### D · The Architect stops being blind (server) — the S40-5 debt

`PARAM-GOV-1` stamped the resolved ceiling on the OTel span and the `turn_done` ledger row — and on
**no log line**. So the Architect, whose window into production is the Vercel log, had to ask the
owner to read a panel. *A manual step a diagnosis requires is a missing feature.*

Add ONE line, next to the existing `[Token Usage]` / `[LLMFinish]` lines in `stageStream.ts`:

```
[Params] temperature=0.7(db) historyWindowN=6(db) maxToolRounds=16(db)
```

Value **and** source, every param in `ctx.params`. Bounded, no secrets, no PII.

### E · Teach the model the discriminator (reference only — see §6)

Update the **`viz` prompt segment's code reference** so the model is told: *when you emit more than one
`[TABLE_FROM_TOOL]`/`[CHART_FROM_TOOL]` for the same tool in one answer, you MUST include a `match`
object identifying the call (e.g. the zone/line id you passed).* Keep it short; it is a governed
segment, not an essay.

**AG: do NOT attempt to publish this.** Code is the reference; the DB row is what runs (§6).

---

## 4 · WHAT MUST NOT MOVE

- The three existing from-tool outcomes (derivable / empty / non-tabular). Adding a fourth is not a
  licence to touch the other three.
- `deriveTableData` / `deriveChartData` data semantics.
- The eval-gate, the trust line, the grounding validator.
- The `[TABLE_FROM_TOOL]` grammar's existing keys — `callId`/`match` are **additive and optional**.
  An old message, and a model that emits neither, must still work (rules 3 above).

---

## 5 · SELF-VERIFICATION (paste each, with evidence)

1. Anchor SHA · branch · PR URL.
2. `git diff --stat <anchor>..HEAD`; `git diff --name-only <anchor>..HEAD -- supabase` → **EMPTY**.
3. The RED-first F82 test: paste it failing on the anchor, passing on HEAD.
4. Paste the ambiguity-panel test and the "old message without args/callId still renders" test.
5. Paste the F63 formatter's unit test (epoch ms in → readable label out; a non-epoch numeric x is
   left alone).
6. Grep proof that no new `??` fallback chain was introduced on the binding path.
7. `npx tsc -b` · `npx vitest run --reporter=dot` **UNSHARDED** — count + per-file delta.
8. Drift `[OK]`; state whether a reseal was needed and the resulting `docVersion`.
9. **CI green on the PR head.**
10. State, in one sentence, that the `viz` segment change is inert until the owner republishes (§6) —
    so the reviewer cannot mistake a green suite for a live behaviour change.

---

## 6 · THE OWNER STEP (after merge — THE TRAP OF THIS PHASE)

The `viz` prompt segment is **governed**: `Rules → System → Prompt → viz` shows `running v1`. The
runtime SSOT is that DB row. **Changing the code reference in §3.E changes NOTHING in production
until it is republished.** A phase that shipped green and changed no behaviour would be the exact
"two layers disagree silently" failure this phase exists to kill.

After merge, the owner: `Rules → System → Prompt → viz` → **"Reset to code floor"** (or amend from
the payload) → publish. No deploy.

**Behaviour is honest in the meantime:** with the old segment, a model that emits no discriminator
hits rule B.4 and gets the **ambiguity panel** — noisier than today, and *correct*. It never
mislabels again, republished or not.

---

## 7 · ACCEPTANCE

1. The owner re-asks the A3 question. Each line's stop table shows **that line's** rows, captioned
   with the call it came from.
2. A three-line question whose directives carry no discriminator renders the **ambiguity panel** —
   never another line's data.
3. The chat raw-tool panel shows `{factoryId:"KB7", zoneId:"…"}` — no Langfuse trip (F64).
4. Charts print readable times (F63).
5. `[Params] … maxToolRounds=16(db)` is in the Vercel log (D).

---

## 8 · OUT OF SCOPE

`EXPLORER-1-FIX-1` (the unreachable-tools filter/copy — next). `ROUTE-GOV-1`. `MCP-INVOKE-1`.
The `safety.b1_scope` loosening (**F83** — a separate governance decision with its own arc).
The `resultStore` trimmer diagnosis (**F67**).

<!-- END · claude-code-PHASE-VIZ-BIND-1-v1 · rev 1 · 2026-07-14 -->
