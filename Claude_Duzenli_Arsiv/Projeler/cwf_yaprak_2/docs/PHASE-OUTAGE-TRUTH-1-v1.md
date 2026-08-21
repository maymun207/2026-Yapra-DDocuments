# PHASE-OUTAGE-TRUTH-1 · v1

**Closes:** `BUG-019` + `BUG-002` + `BUG-007` — one disease, three surfaces.
Three entries, kept separate; they close together or not at all.
**Lane:** Author = AG. **Anchor:** `3fc6a1bc46f2405e24516687a1aa4c8a2e6b089a`.
**Migrations:** likely zero — see §2.4 before assuming.

---

## §0 · BOOTSTRAP

```bash
rm -rf /tmp/outage && git clone https://github.com/maymun207/cwf_yaprak.git /tmp/outage
cd /tmp/outage && git fetch --all
git rev-parse origin/master   # MUST be 3fc6a1bc46f2405e24516687a1aa4c8a2e6b089a
grep -oE '"docVersion"[^,]*' public/architecture/manifest.json   # rev 193
ls supabase/migrations | wc -l                                   # 67
```

**S80-1:** absolute paths only. **Branch `phase/outage-truth-1`; push AND open a
PR** — `push` fires CI only on master. **Baseline: 454 files / 5142 tests.**

**Run `check:tenant-zero` locally before the first push.** The previous phase's
first push went red on it. This phase touches user-facing messaging, which is the
highest-risk surface for tenant vocabulary in the whole repo.

---

## §0.1 · FALSIFIERS — two, and either one reshapes the phase

> **(a) If the failure count already reaches the client on the turn object, the
> phase is smaller than this brief and you should say so.**
> The Architect's read: `mcpClient.ts:191` does
> `console.error('[MCP Error] …')` and `return JSON.stringify({ error: errMsg })`
> — the failure goes to the console and back to the MODEL as a tool result, and
> nowhere else. Not `ctx`, not the span, not a ledger. The badge in
> `ChatShell.tsx` is computed **client-side** from a turn object that never
> learns of it. **Verify both halves before writing code.**

> **(b) If the scope-refusal sentence turns out to live in code, stop and report
> it as a `check:tenant-zero` breach rather than editing it.**
> It cannot: the gate forbids tenant vocabulary in all eight tokens. It is a
> governed prompt row. **Therefore the fix cannot be "reword the sentence" —
> that text is DATA and belongs to the tenant.** The remedy must be structural.

---

## §1 · THE DISEASE, AND ITS THREE SURFACES

An outage reaches the audience as **an absence of capability**.

| Entry | Audience | Observed |
|---|---|---|
| **BUG-002** | the **user** | a withheld backend surfaced as *"I have no such capability"* |
| **BUG-007** | the **model** | the misroute guard pointed it at a backend whose tools were withheld that turn — a locked door |
| **BUG-019** | the **user** | 21 tool calls failed (`trace=13d532e7`) and the turn closed with the **scope-refusal** template. Nothing about scope had happened. |

**Why one phase.** Writing the same rule three times is how a rule becomes three
rules that drift. **Why three entries.** Rule 2 forbids rewriting a carried body,
and each keeps its own closure proof.

**The control that already works, and must not regress.** On `trace=269c2367` a
turn made **zero** tool calls and asserted a fact about a backend's contents. The
grounding badge caught it: *"Bu cevap hiçbir araç sorgusuna dayanmıyor."* That is
ADR-001 working. **This phase extends that channel; it does not replace it.**

---

## §2 · GATES

### G1 — the turn gains a failure ledger, and it is DATA not prose

Tool failures currently exist only as a console line and a string handed to the
model. Give the turn a structured record — call count, failure count, and the
backends involved — carried on `ctx` **and** stamped on the stage span, with the
**same `null`/zero semantics the `[ToolRoute]` work established**: an explicit
zero on a clean turn, never an absent field. This is ADR-013 half (a): two paths
reaching the same decision class must record identically.

**Do NOT put tool-argument values or backend response payloads in it.** That is
BUG-005 and it is not open season because a new field is being added. Counts,
tool names and backend ids only.

### G2 — the badge tells the truth about failures, model-independently

The client badge surface must be able to say, from DATA and not from the model's
prose, that N tool calls failed and against which backend. **Whatever the model
says, the badge holds.** Bilingual, matching the existing badge's shape and its
tests in `chatShellToolEvidence.test.tsx`.

**Positive control, mandatory:** a clean turn carries the same surface with an
explicit zero. **An absent badge and a zero badge must be distinguishable** — an
absence would reproduce the bug in a new shape.

### G3 — a scope refusal is STRUCTURALLY UNAVAILABLE on a turn that had failures

This is the gate the whole phase turns on. On a turn with ≥1 tool failure, the
scope-refusal path must not be reachable. **The sentence is governed data and is
not edited** (§0.1b). The mechanism is a structural block plus the honest
alternative — the turn says what failed.

**Test both directions (D-5):** a turn with failures cannot emit the refusal; a
turn with **zero** failures and a genuinely out-of-scope question **still can**,
byte-unchanged. A fix that makes the outage path honest by breaking the
legitimate refusal is rejected.

### G4 — BUG-007: stop pointing the model at a locked door

`armesGatewayMisrouteMessage` composes a fixed redirect naming a backend without
consulting whether that backend's tools are offered this turn.
`ctx.mcpWithheldBackends` is set at `stagesResolve.ts:31` and the pre-flight path
never reads it.

**Read the entry's evidence log before designing this.** BUG-007 records a
**proof attempted and not obtainable on demand**: the remedy sits on a path only a
misrouting model opens, and a correctly-behaving model never gets there. **That
placement was the Architect's specification and it is the defect of the fix's
shape.** If your design repeats it, this gate is not met — say so rather than
shipping another unprovable remedy.

### G5 — BUG-002: what the USER is told when a backend is withheld

Withheld ≠ absent. The user-facing path must distinguish *"this capability is
temporarily unavailable"* from *"no such capability exists"*.
**Positive control:** with every backend healthy, a genuinely unsupported request
still gets the original answer, byte-unchanged.

### G6 — S82-2, on this phase's own apparatus

Every harness states its red/green control in the report. Three false-greens have
been caught in this repo this week — a tail-truncated summary, an inert ESM
`vi.spyOn`, and a `zsh` glob that made a census return a false zero. Assume yours
is the fourth until you have shown it can fail.

---

## §2.4 · MIGRATION QUESTION — ask, do not assume

If the honest alternative to the refusal needs governed text, that text is
tenant DATA and belongs in a governed row, not in code. **If you conclude a
migration or a governed publish is required, STOP and report it** — the Operator
lane applies migrations (ADR-005) and this phase was scoped as likely-zero. Do
not author one and do not inline a tenant-shaped sentence to avoid one.

---

## §3 · DOCS & DRIFT

Read the tabs. Expectation, falsifiable: the turn pipeline and Request Lifecycle
are mapped areas and will likely drift; `src/components/ui/**` maps to no tab
(proven by `AXIS-TRUTH-1`, which reported 0 tabs hash-changed). Name what
actually drifts.

---

## §4 · REPORT

1. HEAD, PR URL. 2. Four required CI gates named with conclusions. 3. Test counts
as CI prints them. 4. **G3's both-direction pair and G2's zero control, as
outputs.** 5. Which of the two falsifiers fired, if either. 6. Whether §2.4's
question arose. 7. Anything in §1–§3 that is wrong — the Architect has made
sixteen premise errors in three days and two were caught by AG in the last two
phases.

---

## §5 · POST-DEPLOY PROOF (S63-1) — three reads, one per entry

- **BUG-019:** a production turn with ≥1 tool failure carries the failure badge
  with a count and backend, and **does not** carry the scope refusal. Trace + SHA.
- **BUG-002:** with a backend withheld, the user-facing answer says *unavailable*,
  not *nonexistent*. Trace + SHA.
- **BUG-007:** the model-facing redirect no longer names a withheld backend —
  **and if that state cannot be produced on demand, say so in advance and name
  the surface that will prove it**, rather than leaving an unsatisfiable step
  (BUG-008's P3, BUG-007's own 2026-08-04 record).

All three need owner-issued production turns. **State which ones need a
deliberately induced outage** so the owner can plan a window rather than being
asked mid-read.

---

## §6 · OUT OF SCOPE

`TYPEGATE-TRUTH-1`/BUG-022 (next phase) · `GATEWAY-BURST-GUARD-1`/BUG-020 — **no
rate limits, no concurrency caps here**, even though the turn that motivated
BUG-019 also burst · BUG-021's schema learning · BUG-012 · chart work.

<!-- END · PHASE-OUTAGE-TRUTH-1-v1 · closes BUG-019 + BUG-002 + BUG-007 on proof -->
