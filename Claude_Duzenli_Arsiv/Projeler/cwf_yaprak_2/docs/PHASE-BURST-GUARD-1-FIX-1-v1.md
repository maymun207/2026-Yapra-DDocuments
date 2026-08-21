# PHASE-BURST-GUARD-1-FIX-1 · v1

<!-- PHASE-BURST-GUARD-1-FIX-1-v1 · 2026-08-06 · S82 · Architect: Claude (Opus 5).
     Completes BUG-020's own finish definition. ONE self-contained relay (D-2).
     ZERO migrations. ZERO Operator steps. ZERO governed publishes. -->

**Lane:** AG. **Anchor:** `origin/master` = `40c3d9c6dc260e11b073364dae012ac1acfc4630`
**Branch:** `phase/burst-guard-1-fix-1`
**Floor at anchor (re-derive, do not trust this line):** 466 test files · 67 migrations ·
docVersion `rev 196 · 2026-08-06` · 13 ADRs.
**Touch budget:** four — prompt · report · GO · merge report.

---

## §0 · WHY THIS PHASE EXISTS — measured, not suspected

BUG-020's finish definition, in the owner's words:

> *"Ajanım müşterinin sunucusunu deviremiyor, **ve bir freni çektiğinde bana söylüyor.**"*

The first half shipped. **The second half does not work at all, and production proved it
within fifteen minutes of the deploy.**

Production turn `trace=15f24d24`, 2026-08-06T03:43:21Z, on `dpl_4jGLZ3x7cKHVGEjZcVyXZhxWQMYY`
(SHA `40c3d9c6`, deployed 03:29:39Z). Copied verbatim from that request's log:

```
[BurstGuard] armed concurrency=3(db) perToolCalls=30(db) turnTokens=300000(db)
[BurstGuard] stopped reason=turn_tokens total=315030 limit=300000
[LLMFinish] silentFinish=true finishReason=tool-calls toolCalls=6
```

The brake armed from governed rows, fired correctly, and logged itself. **The user was
shown neither the fact nor the number.** The screen said, in full:

> *"This question exhausted the tool budget: the model was stopped before it finished
> gathering data. Split the question — stops first, then scrap."*

No brake chip. And the sentence is the **round-cap** message: `maxToolRounds` is 16 and the
turn made 6 calls, so the round cap never came near firing. The advice — *stops first, then
scrap* — was given to a user who never asked about stops.

---

## §1 · THE CAUSE — one line, and it is BUG-019's disease re-created inside its own cure

**`src/lib/cwfService.ts` never learned the field.** Its `done` metadata type declares
`toolFailures?` and `withheldBackends?`, and the mapping below it copies both onto the
message. **`brakes` appears in neither.** So:

server sends `brakes: [...]` → **client parser drops it** → `msg.brakes` is `undefined` →
`resolveTurnChips` computes `(msg.brakes ?? [])` → `brake = null` → **no chip, on every
path, always.**

Everything downstream is correct and was built correctly: `BRAKE_CHIP_TEXT` has three
distinct sentences with the AMENDMENT §B wording constraint honoured, `resolveTurnChips`
joins one line per brake, `ChatShell` renders `data-testid="burst-brake-chip"` and its gate
is right. **A complete, correct surface fed by nothing.**

**And the tests passed because they never used the path.** `burstBrakeChip.test.ts`
exercises `resolveTurnChips` against a hand-built message object carrying a `brakes` array.
That object is a **test-side copy of data the real path never produces**. The MEMORY-1B
constraint — *evaluate the REAL derivation, never a test-side copy* — is the rule this
violated.

> **S82-5 (new law, minted here):** a payload field is not a surface. Between the server's
> `done` and the user's screen there is a parser that must **name every field it carries**.
> A test that constructs the message object by hand proves the renderer and says nothing
> about the path. Any field added to `done` needs a test that enters at the parser.

---

## §2 · G1 — CARRY THE FIELD, AND PROVE IT AT THE PARSER

Add `brakes` to `cwfService.ts`'s `done` metadata type and to the mapping that builds the
message, in the shape `toolFailures` / `withheldBackends` already use — **live-turn only**,
same honest-absence posture (a reloaded history message carries no key; the chip is absent
there rather than fabricated).

**RED-FIRST PROOF, and it must enter at the parser:** feed a `done` event whose payload
carries a `turn_tokens` brake through the **real** parse path, and assert the chip text
reaches the rendered message. **Mutation:** delete the new mapping line → the test must
red. If it stays green, the test is another hand-built copy and has proved nothing.

**Positive control (S66-1):** a clean turn's `done` carries `brakes: []` and the chip is
absent — **present-and-empty is not the same observation as the key never arriving**, and
that is exactly the distinction this defect erased.

---

## §3 · G2 — THE MESSAGE MUST NAME THE BRAKE THAT ACTUALLY STOPPED THE TURN

`stopWhen` is an OR of two conditions, and **both produce `finishReason: 'tool-calls'`**.
So the round cap and the token ceiling are **indistinguishable from the finish reason
alone** — and `silentFinishMessage` currently reads only the finish reason. That is why a
token-ceiling stop was narrated as a round-cap stop.

**The ledger already knows.** `ctx.toolLedger.brakes` carries `{ kind: 'turn_tokens',
limit }`, recorded by `onTokenCeilingReached` before the silent-finish branch runs.

**Fix:** on the silent-finish path, select the sentence from the **ledger first**, falling
back to the finish reason only when no brake was recorded. A turn stopped by the token
ceiling must be told so, with the number; a turn stopped by the round cap keeps today's
wording byte-identical.

**Constraints:**
- Do **not** change the `'error'`, `'stop'`, `'length'`, `'content-filter'` or default
  branches. This phase touches the `'tool-calls'` branch only.
- Do **not** rewrite or suppress model output. This path only fills text the model never
  produced.
- The wording obeys AMENDMENT 1 §B: it names **a token ceiling on the turn**, never a
  budget, never a price.
- Both languages, and **only the languages that already exist** — do not invent a third.

**RED-FIRST:** a silent finish with `finishReason='tool-calls'` **and** a `turn_tokens`
brake in the ledger produces the ceiling sentence; the same finish reason with an **empty**
ledger produces today's round-cap sentence, byte-identical. Both directions, or the gate
proves one case and asserts the other.

---

## §4 · WHAT THIS PHASE DOES NOT DO — named, never blank

- **It does not make the seven-day question succeed.** That turn was stopped because
  `getScrapSummaryForZones` returned 206 order-line records across five days
  (35+24+41+59+47) for a question that asked for a daily *summary*, and
  `MAX_TOOL_RESULT_CHARS = 40000` is a **per-call** cap that no single call reached. The
  guard is on the call axis; the harm is on the turn axis. That is **`RESULT-BUDGET-1`**,
  owner-placed at queue position 2, and **it is not attacked here.**
- **It does not raise the ceiling.** Owner ruling stands: **300 000**. Chasing the number
  would be quieting the alarm instead of fixing what set it off.
- **It does not touch** the semaphore, the per-tool cap, the governed rows, or any floor.
- **BUG-021** (the gateway loses inner-tool schemas — a seventh instance was recorded on
  `trace=b835babd`, `chart_id` guessed for `identifier`) is queue position 3 and untouched.

---

## §5 · POST-DEPLOY PROOF — and what BUG-020 still owes after it

1. **Re-run the seven-day scrap question in production.** Expected: it is **still stopped**
   by the ceiling — that is not this phase's failure — and the user now reads **which**
   limit bound the turn and **at what value**. Name the trace.
2. **A clean turn shows no brake chip**, while its `done` payload carries `brakes: []`.
   Absence on screen, presence in the payload. Name the trace.

**BUG-020 does NOT close on these two.** Its first half — *the agent cannot take the
customer's server down* — is proven at unit level (max in-flight 3 against 7 calls, with
the unbraked control observing 7) but **the concurrency brake has never been observed
firing in production.** Neither proof turn burst: `trace=b835babd` found its chart with a
single filtered `list_charts` call and never paged. So BUG-020 carries a named residual —
**`concurrency brake unobserved in production`** — and closes when a real turn records
`[BurstGuard]` with `reason=concurrency`, or when the owner rules the unit evidence
sufficient. **It is not closed quietly on the strength of the half that was easy to prove.**

---

## §6 · STANDING RELAY RULES

- Phase report → `docs/relay/PHASE-BURST-GUARD-1-FIX-1-report.md`, in-branch, same push as
  the work. Merge report appended to that **same file** under `## MERGE`, in the same push
  as the merge commit — **and per S82-3 the heading is not pre-written as an empty
  placeholder**, because a placeholder that satisfies a positive control has disabled it.
- **Never write a control character into prose — describe it** (S82's own F-2 lesson: the
  carrier was, twice, the paragraph documenting the defect).
- Report states the **question round-trip count**. The last two phases reported zero.
- Every behavioural claim cites a command run in the same report, or carries the label
  *"taken from the brief, not verified"* (S81-4).
- **Nothing under the rug** (S81-3): every defect noticed while building this is named,
  including near misses and reads that could not be completed.
- **S82-4:** the branch's base is **proved** equal to `origin/master` when cut, not assumed.
  "I cut it from origin" is a claim, not a check.

**Merge:** `--no-ff`, squash banned. CI green on the **head that will actually merge** —
if a later commit moves the head, the check re-runs on the new one.
