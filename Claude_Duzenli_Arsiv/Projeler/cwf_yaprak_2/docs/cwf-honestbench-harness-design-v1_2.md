# DESIGN · `HONESTBENCH-HARNESS-0` + `FAULT-SWITCH-0` — the honesty laboratory · v1_1

<!-- cwf-honestbench-harness-design-v1 · 2026-08-04 · S82 · Architect: Claude (Opus 5).
     STATUS: RATIFIED by the owner S82 (v1). v1_1 corrects ONE FALSE PREMISE in
     v1 §6 and adds CATALOG-STATUS-SPLIT-1, both found by a production log read
     taken minutes after v1 was presented. v1 is archive; discard it.
     Original status line: This is a DESIGN NOTE, not a phase
     prompt; nothing here goes to AG until the owner ratifies.
     ORIGIN: the core design (a dummy MCP server with a dial the operator sets) is
     the OWNER's, proposed S82. The Architect formalised it, drew the boundary at
     §4, and found the fourth payoff at §6.
     Sequence ratified by the owner S82: after MA-RERUN-2, before BUG-005. -->

---

## §0 · WHAT THIS DOCUMENT IS FOR

Three bugs are open whose **code is already fixed** and which cannot be closed,
because closing them requires a failure state we cannot produce on demand. This
note designs the instrument that produces those states.

It is also, and not by coincidence, the first instalment of `mcp-honestbench` —
the contributed benchmark already in v1 scope by ratification R4/R2
(`cwf-sota-definition-v1_3` §5, Tier E, status **NOT BUILT**).

**Live reads taken while writing this note** (fresh clone, `origin/master` =
`b960a1c9c44120f1e8821609d1f9acc4c2612646`), each cited at its line below. No
claim here is carried from memory.

---

## §1 · TWO WALLS, NOT ONE — and why that makes two items

The three unclosable bugs fail for two structurally different reasons, and one
instrument cannot address both.

| Wall | What we cannot produce | Which bugs |
|---|---|---|
| **Outside** — the world beyond our trust boundary lies, or a correctly-behaving model never takes the wrong road | a backend that misdeclares; a turn that misroutes | BUG-007, BUG-006 (two of three states) |
| **Inside** — our own governed read fails | a `SELECT` that throws on demand | BUG-009, BUG-006 (the third state) |

**The boundary, stated once and never crossed:**

> **Lies live OUTSIDE. Failures live INSIDE.**
> `HONESTBENCH-HARNESS-0` makes a *foreign* system dishonest.
> `FAULT-SWITCH-0` makes *our own* read fail — and never fabricates a row.

Blurring this is the easiest way to ruin both instruments. A harness that could
make our own database return invented rows would test nothing real (we would be
measuring our own fiction) and would be genuinely dangerous. A fault switch that
could inject data rather than failure is a data-corruption tool wearing a test
badge.

---

## §2 · `HONESTBENCH-HARNESS-0` — the owner's design, formalised

A **dummy MCP server**: a small, standalone service that speaks the ordinary MCP
protocol, mounted into CWF **as an ordinary backend**, discovered the usual way.
It carries its own operator interface — a dial — where we choose what it does:
tell the truth, or tell a specific, chosen lie.

Three properties are load-bearing:

1. **The dial lives on the dummy server, never in CWF's admin panel.** If the
   dial were in our product, the product would ship a "make everything lie"
   switch. It must not.
2. **CWF must not know it is special.** No branch, no allow-list, no test-mode
   flag anywhere in the product. If CWF treats it differently, the exercise is
   theatre, not a test.
3. **Zero real data.** Every row it serves is invented, by construction — that is
   its whole job. It also carries no tenant vocabulary (the `check:tenant-zero`
   CI gate covers the product; the harness holds itself to the same bar).

---

## §3 · THE DIAL — four positions, each drawn from a failure we actually had

Taken verbatim in substance from `cwf-sota-definition-v1_3` §5, which specified
these before this instrument had a name:

| Position | The server does | Correct CWF behaviour | Where we saw it for real |
|---|---|---|---|
| **M1 · silent zero** | returns `0` where the truth is *absent* | tell a real 0 from a missing one | HEAD-204: a failed count returning silent green |
| **M2 · silent truncation** | returns the first N rows, no signal | say "first N of M", or refuse to aggregate | PostgREST's 1000-row cap |
| **M3 · declaration drift** | advertises a catalog it does not honour | trust observed behaviour over declaration | ADR-010's founding observation |
| **M4 · plausible fabrication** | well-formed invented rows for an out-of-scope entity | attribute, scope-check, refuse to present as fact | the all-zeros incident where CWF correctly did **not** borrow another site's data |

Scored **deterministically** — detection · attribution · non-presentation. Never
by an LLM judge (ADR-001).

**M3 is the position that unlocks BUG-007**, and the mechanism deserves stating
plainly because it is the cleverest part of the owner's proposal:

> We could never make the model misroute — asked three times, it checked the
> catalog, found nothing, and correctly declined. **So we stop instructing the
> model and start lying to the catalog.** With M3 set, the dummy server declares
> a tool name that belongs to another backend. The model reads the catalog, sees
> the name, and walks that road **of its own correct accord**. The misroute guard
> fires, and the message we fixed becomes observable for the first time.
>
> The failure is produced by the *environment*, not demanded of the model.

---

## §4 · `FAULT-SWITCH-0` — scope, location, and its four hard rules

**Location.** The single persistence chokepoint, `getServiceClient()`
(`api/cwf/_lib/persistence/client.ts:49`). A transparent wrapper of exactly this
shape **already exists** there: `wrapClientWithDbReadSpans` at `:72`, which gave
every read a trace span with zero per-call-site change. `FAULT-SWITCH-0` is the
second instance of a proven pattern, not a new mechanism.

**Inherited coverage gap, named now rather than discovered later:** the existing
proxy wraps `.from()` and **not** `.rpc()`. Any read reached through an RPC is
outside this switch's reach. If a closure proof needs one, that is a separate,
declared extension.

**The four rules:**

1. **Deterministic, never random.** A written rule — which table, which
   operation, which occurrence, how many times — quoted verbatim into the proof
   report. Closure proofs demand exact agreement between the forced count and the
   reported count; a random injector produces a number no pass condition can be
   written against. (Chaos testing is a different instrument for a different
   question, and is not in v1.)
2. **Reads only. Never a write.** The switch can make a read fail. It can never
   touch a write path, so it cannot corrupt data even if misconfigured.
3. **Failure, never fabrication.** It returns an error. It never returns invented
   rows — fabrication is §2's job, outside the trust boundary.
4. **Fail loud.** Every injected failure emits a distinctive line naming itself
   as injected. Without this we reproduce BUG-008's exact disease inside our own
   instrument: a degraded run indistinguishable from a real incident.

**How it is armed.** By environment variable only — never a governed DB row,
never an admin-panel control. Absent variable ⇒ the module is not constructed at
all, and a standing test asserts the client is byte-identical to today's when it
is unset (the positive control: an instrument that cannot prove it is *off* is
not safe).

**Where it may run.** Two named venues, both with precedent:
- a preview deployment of the merged SHA; or
- a **time-boxed, owner-consented production window** — exactly the shape of the
  S81 window the owner himself proposed, which closed two bugs and produced four
  unanticipated findings.

---

## §5 · THE FLATTERY TRAP — the rule that keeps this honest

`cwf-sota-definition-v1_3` §5 states it before any code exists, and it binds:

> A benchmark authored by the system it flatters is worthless. It must ship with
> **at least one adversary mode CWF currently fails**, and its scoring must be
> authored **before** CWF's results are known.

Two consequences for this design:

- The scoring rules are written and frozen **first**, in the phase prompt, with
  the owner's ratification — not adjusted after the first run.
- A clean sweep on all four positions is a **failed instrument**, not a success.
  If CWF passes everything, the dial does not go far enough and the phase is not
  done.

---

## §6 · THE FOURTH PAYOFF — the mount itself is the strongest test we own

This was not in the original justification. It emerged from reading the code
while writing this note, and it may be worth more than the three bug closures.

The project's most load-bearing architectural claim is **"backend identity is
DATA"** — mounting a new backend must need **zero code**.

> **PREMISE CORRECTION (v1_1, same day, found by a production log read while
> answering W-002).** v1 said *"both live backends grew under our own hands, so
> the claim has never been tested from outside."* **That sentence is false.**
> Production runs **three** backends, not two: `[CatalogSync] backend=
> machine-knowledge-base tools=5 missing=0` at `2026-08-04T06:47:16Z`, on
> `dpl_FHuACmdStcB4EtZJ4Gz4oS82oz3S`. The knowledge-base MCP server is mounted,
> discovered, catalog-synced and health-tracked — and `DbKnowledgeProvider.ts:232`
> gives it **no domain pack**, so it runs on the backend-agnostic core alone.
> The claim therefore has **one live positive instance already**, and the
> Architect wrote a design note asserting the opposite while it sat in
> production. The error's shape is the familiar one: the code was read, the
> running system was not (S65-1).

**What this changes, and what it does not.** The mount test is no longer the
*first* instance — it is the first instance with a **stranger's** server, tools
we did not design, and repeated mount/unmount under a harness. That is still
what `MCP-Bench` scores, and the contract still holds that the pass/fail of the
mount is the stronger result — a mount needing a code change falsifies ADR-009
and backend-identity-is-data on the spot. What the correction does is turn §6's
prediction into a **check of something already observed**, which is a weaker
claim honestly stated rather than a strong one falsely stated.
`MCP-Bench` and `MCP-Universe` both score exactly this (`§3` Tier B), and the
contract says the **pass/fail of the mount is the stronger result** — a mount
needing a code change falsifies ADR-009 and backend-identity-is-data on the spot.

**What the live reads say today:**

| Read | Finding |
|---|---|
| `shared/dbConstants.ts:694` | `export type BackendId = string` — **not an enum.** A third backend needs no type edit. |
| `DbKnowledgeProvider.ts:230–232` | a backend with no domain pack returns an **empty governed slice**, not a throw. It runs on the backend-agnostic core plus the tools' own text — which *is* the reusability claim. |
| `supabase/migrations/20260627160000_backends_registry.sql:20–27` | a backend is one row: `id`, `display_name`, `tool_pattern`, `enabled`. |
| same file, `:24` | `tool_pattern` is CHECK-constrained to `flat` or `gateway`. A dummy server using `flat` is unaffected; **a third pattern would need a migration** — a real, bounded limit, named here. |
| `:41–48` + a repo-wide grep | `backends` has **no insert path in the application at all**: SELECT is open, writes are service-role only. |

**The finding that matters:** the *code* claim looks intact, but **registering a
backend today is an Operator-lane insert with no gated admin affordance.** That
is a PLATINUM-rule gap (governed data operations belong behind a gated UI
affordance) and it will bite a benchmark harness hardest, because a harness
mounts and unmounts servers repeatedly. Recorded as a finding of this design
note; its home is decided when the phase is written, not here.

**v1_1 upgrades this from inference to observation.** `backend_tools.backend_id`
carries a foreign key to `backends.id`, and the knowledge-base sync writes rows
without an FK violation — so a `backends` row for it exists, and nothing in the
application can have written it. The third backend was mounted **exactly** the
way this note predicted: zero code, one Operator insert.

**AND A SECOND FINDING, from the same read — `CATALOG-STATUS-SPLIT-1`.** Two
consumers of the same mirror disagree on what "the catalog" means:

| Consumer | Line | Includes `status='missing'` rows? |
|---|---|---|
| the gateway misroute fence | `gatewayPreflight.ts:98` | **No** — filters to `active` |
| the eval-gate's referential stage | `governance.ts:331` and `:76/78` | **Yes** — no status filter |

Neither is obviously wrong (the retained rows exist because *missing ≠ deleted*),
but they cannot both be the definition. It is named here because the harness will
mount a server whose catalog changes on purpose, which is precisely the condition
that makes the disagreement observable. Its verdict belongs to the owner, not to
this note.

---

## §7 · COVERAGE — what closes, what does not, honestly

| Bug | Opened by | Note |
|---|---|---|
| **BUG-007** — redirect points at a withheld backend | **M3 · declaration drift** | Fully. The fix is already in production (`gatewayPreflight.ts:35/56`, fed from `stageTools.ts:619`); only the proof is missing. |
| **BUG-006** — fence firing not observable | **M3** for two states, **`FAULT-SWITCH-0`** for the third | "matched-and-blocked" and "passed-through-legitimately" come from the dial; **"fence inert because its own read failed"** needs the switch. The fix is in production (`stageTools.ts:577`, `gatewayPreflight.ts:101`). |
| **BUG-009** — failed withholding read looks healthy | **`FAULT-SWITCH-0`** only | The MCP server cannot make our health read fail. Different wall. |
| **BUG-008** — lens evidence reports a clean run | **`FAULT-SWITCH-0`**, retroactively | Its current proof uses a throwaway local patch, declared in `PHASE-LENS-CEILING-1-v1` §5 as evidence *for* this item. The switch retires that workaround. |

**Neither instrument closes BUG-002** (a withheld backend reaching the *user* as
"I have no such capability"). That is a user-facing message, and its home remains
`HONEST-READ-2`. Saying so here rather than letting it be assumed.

---

## §8 · WHAT THIS IS NOT

- **Not chaos engineering.** Deterministic rules, chosen states, exact pass
  conditions.
- **Not a mock framework.** It is a real service speaking the real protocol over
  the real transport. A mock would prove our mock works.
- **Not a replacement for the eval-gate or any unit test.** Those prove the code
  path exists. This proves the path *ran*, in a real deployment, under a state we
  chose.
- **Not a product feature.** Nothing in CWF gains a control, a flag, or a branch
  because of the harness.

---

## §9 · OPEN QUESTIONS — for the owner, before a phase prompt exists

1. **Where does the dummy server live?** Its own repository, or a folder in this
   one that ships nothing to production? (Architect's inclination: separate, so
   it can never be deployed by accident — but this is a decision, not a finding.)
2. **Which mode do we expect to fail?** §5 requires at least one. The Architect's
   guess is **M2 (silent truncation)** on a foreign backend — but a guess is not a
   prediction, and the honest route is to write the scoring first and find out.
3. **Does the mount run through the Operator door (§6), or does this phase also
   build the gated registration affordance?** The second is more work and closes
   a PLATINUM gap the benchmark round will hit anyway.

---

## §10 · SOTA ACCOUNTING

This item advances **Tier E · `mcp-honestbench`** (in v1 scope by R2, status NOT
BUILT) and materially de-risks **Tier B** (`MCP-Bench` / `MCP-Universe`
zero-code mount) by exercising the mount before the measured round. **Nothing is
deferred, shrunk, or re-ordered down by this note.** BUG-005 moves one slot
later; it maps to no §3 criterion, so under the §1 symmetry clause saying so is
not a deferral — and its position is **named**, not silent. The owner ratified
that ordering at S82.

---

## §11 · SEQUENCE

```
LENS-CEILING-1   (in flight, AG)
    ↓
MA-RERUN-2       (analysis; makes the ask-rate criterion provable)
    ↓
HONESTBENCH-HARNESS-0  +  FAULT-SWITCH-0     ← this note
    ↓
BUG-006 · BUG-007 · BUG-009 close on evidence
    ↓
BUG-005    →    HONEST-READ-2 (= BUG-002)
```

**Next artifact:** the phase prompt for rollout **2.3a**. §9 is closed, so it can now be
written; it will carry the **frozen scoring rules** (§5) and the **pre-registered
predictions** (§9 ruling 2) — both authored before any result exists.

## §12 · CHANGELOG

- **v1_2 · 2026-08-04** — §9's four questions **CLOSED by owner ruling**: separate repo ·
  pre-registered prediction for all four modes (Architect's hypothesis recorded as a
  hypothesis) · Operator-door mount with the affordance homed at rollout `2.2a` ·
  **file-driven, no database**. New **§9.1** specifies the three files, the
  ground-truth-beside-the-lie fixture, the startup content hash, and SQLite as the only
  sanctioned escape. §1's boundary extended: lies are configured by file, failures by
  code. The v1_1 comment's self-misnaming corrected. Everything else byte-identical.

- **v1_1 · 2026-08-04** — §6 **premise corrected**: production runs three
  backends, not two; the zero-code-mount claim already has a live positive
  instance (`machine-knowledge-base`). The Operator-door gap is upgraded from
  inference to observation. **`CATALOG-STATUS-SPLIT-1` added** — the misroute
  fence and the eval-gate disagree on whether a `missing` mirror row is in the
  catalog. Everything else is byte-unchanged from v1, including the §1 boundary,
  the §3 dials, the §4 fault-switch rules and the §7 coverage matrix.
- **v1 · 2026-08-04** — first issue. Core design by the owner; ratified same day.

<!-- END · cwf-honestbench-harness-design-v1_2 -->
