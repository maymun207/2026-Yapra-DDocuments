# PHASE · `BACKEND-IDENTITY-IS-DATA-1` · v1 — the admin adds a backend, and the system uses it

<!-- PHASE-BACKEND-IDENTITY-IS-DATA-1-v1 · 2026-08-04 · S82 · Architect: Claude (Opus 5).
     Author lane: AG. ONE self-contained relay (D-2) — every dependency embedded.
     Rollout: jumps the queue ahead of 2.3a's mount and 2.2, by owner ruling S82,
     under PLATINUM's own prescription (a required manual step = a design error =
     a queue-jumping redesign).
     TOUCH BUDGET: the standard quartet, PLUS a second quartet ONLY if G0's census
     forces a migration — declared at hand-back, never absorbed silently. -->

---

## §0 · PRECONDITION (S47-1)

```
FRESH FULL clone · git fetch --all · git rev-parse origin/master
  EXPECT fbfd8aa1be615184ecca85a8e98503176779922d
```

| Check | Expected |
|---|---|
| migrations · test files · ADRs | 67 · 448 · 13 |
| `docVersion` | `rev 190 · 2026-08-04` |

Branch: `phase/backend-identity-is-data-1`. Merge only on a verbatim GO.

---

## §1 · THE ACCEPTANCE CRITERION — the owner's sentence, and nothing else

> **"Admin gelir, backend'i ekler, credential'ını girer, sistem onu kullanır.
> Elle hiçbir müdahale yok."**
>
> *(The admin arrives, adds the backend, enters its credential, and the system
> uses it. No manual intervention of any kind.)*

**Every gate below serves that sentence. If a gate does not, say so and stop.**

**This is not a feature request — it is a defect report.** `HONESTBENCH-HARNESS-0`
tried to mount a foreign MCP server and could not, and the owner's ruling is that
the attempt *was* the test: **the system failed it.** PLATINUM says a required
manual step means the design is wrong and gets a queue-jumping redesign. This is
that redesign.

**Two scopes, both in the sentence, both proven:**
- a **user** connects a personal MCP server from their own panel;
- an **admin** connects a global server **and creates a new backend identity**.

**What "the system uses it" means, end to end** — this chain is the phase's spine
and every link is reported:

```
identity created → credential entered → catalog sync → backend_tools mirror
   → health tracked → tools offered on a live turn → a tool actually called
```

---

## §2 · G0 · THE CENSUS — BLOCKING, and it comes before any fix

**The brief does not tell you which links break. It tells you to find out.**

Four walls are known and verified by the Architect at this anchor. There may be
more, and **the census — not this document — defines the fix list.**

| # | Wall | Evidence |
|---|---|---|
| 1 | **No creation door.** Nothing in the application inserts into `backends`. RLS: SELECT open, writes service-role only. Only `scripts/seedPromptSegments.ts` (a seed upsert) and `scripts/verifyRules.ts` (its own test control) touch it. | `20260627160000_backends_registry.sql:41-48`; repo-wide grep |
| 2 | **`toolPatternOf` never reads the column.** `BACKEND_TOOL_PATTERN` is a hardcoded two-entry map; unknown ids get `?? 'flat'`. **8 synchronous call sites**: `mcp-catalog.ts:71` · `stageTools.ts:254,390,552,764` · `routeShadowLens.ts:249,255` · `catalogSync.ts:90` | `backendToolPattern.ts:46-59` |
| 3 | **`BACKEND_IDS` is a hardcoded 4-entry const**, and its own docblock records that it **lagged behind reality** until `machine-knowledge-base` was appended. It gates `parseBackend` (`adminGuard.ts:38-42`, 400s anything absent), mints per-backend governance kinds (`kinds.ts:411,416,421`), floors `resolveToolCategories` (`:67,69`), and feeds `referenceFingerprint`. | `dbConstants.ts:560-573` |
| 4 | **A positional coupling nobody has named:** `SUPERSET_BACKEND_ID = BACKEND_IDS[1]`. The gateway identity depends on an **array index**. Insert a new id in the wrong position and Superset stops being a gateway. | `backendToolPattern.ts:38` |

**And one behaviour the owner flagged, which the sentence forbids:** the panel's
own help text says a blank backend *"still defaults to armes on the chat path,
BUT the server is NOT health-tracked and NOT mirror-served"*. A user can
therefore connect a server today whose tools run **under another backend's
identity**, silently. That is the panel face of **BUG-012**.

### What the census must produce

Walk the §1 chain for a **novel backend id** — one absent from every constant —
and report, link by link: **works · degrades · blocked**, each with the file and
line that decides it. Do this **by reading and by executing**, not by reasoning
from this table.

**The question the Architect could not answer and will not pretend to:** does a
new backend need **governed kinds** (`tool_category`, `tool_doc`,
`gateway_tool_policy`) for its tools to be **offered and called** on a turn? If
yes, `kinds.ts` is inside this phase and it is the largest piece in it. If no, it
is a separate named item. **Answer it with evidence and report before building
anything that depends on the answer.**

**ESCAPE VALVE:** if the census finds a wall materially larger than G1–G5 below —
the kind registry is the candidate — **report before building it.** Ship what the
sentence needs and hand the remainder back with your estimate. A named handback
is not a failure; silent absorption is.

---

## §3 · GATES

### G1 · The creation door

An admin endpoint plus a panel affordance to **create, rename, enable and disable
a backend identity**. Gate it on the same permission the sibling global-config
surfaces use (`PERMISSIONS.CONFIG_GLOBAL`, as `api/admin/mcp-secrets.ts:37`
does) — **do not invent a new permission.**

- **`id` is immutable once created.** It is a foreign-key target for
  `backend_tools`, `backend_entity_layers`, `domain_rules` and more; a rename is
  a migration, not an edit.
- **Deleting is NOT in scope.** Disable is. A delete would orphan or cascade
  across every table keyed on it, and that decision is not this phase's.
- **`tool_pattern`** is offered only if G2 makes it real. **A form field the
  system ignores is the exact dishonesty this phase exists to remove** — if G2
  is deferred by the census, the field is omitted rather than shown.

### G2 · `tool_pattern` becomes data — DB-first, code-floor

The project's own pattern, not a new one: `resolveToolCategories`,
`routerModelId()` and the provider registry all resolve DB-first with a code
floor. **F185 governs the floor: it is TODAY'S state, never a new one** — so
`{ armes: 'flat', superset: 'gateway' }` becomes the outage floor and a
`backends` row wins when present.

**Therefore behaviour is byte-identical at merge**, because those two rows
already carry exactly those values. Only a **new** backend changes anything.
**Assert that byte-identity with a test rather than claiming it.**

**The eight call sites are synchronous and must stay cheap.** Resolve the
registry **once** per turn / per sync and pass the resolved map down, rather than
making a hot-path function async. The replay lens (`routeShadowLens.ts:249,255`)
must resolve the same way, or a lens and the turn it replays will disagree.

**Retire the positional read.** `BACKEND_IDS[1]` is replaced by a lookup that
cannot silently change meaning when a row is added.

**And the discovery half, because a declaration is only a claim (ADR-010):** CWF
already observes gateway-ness at one site — `stageTools.ts:372` asks
`toolDefs.some(t => t.name === 'call_tool')`. **Record what the catalog was
observed to be, beside what the row declares.** Where they disagree, the row
wins (a human ruled) but **the disagreement is recorded, never swallowed** —
ADR-010's two-speed shape. Note honestly in the code that `call_tool` is a
**convention, not a spec field**: MCP has no gateway/flat notion, so observation
is a heuristic and the governed row is what makes a wrong heuristic fixable
without a deploy.

### G3 · `parseBackend` validates against the registry, not the constant

`adminGuard.ts:38-42` currently 400s any id absent from `BACKEND_IDS`, so a
newly created backend is rejected by admin surfaces **the moment it is created**.
Validate against the live registry with the constant as the outage floor.
**Fail-closed on an unreadable registry** — an admin surface that accepts an
unknown id because it could not check is worse than one that refuses.

### G4 · Whatever else G0 found

Fix what the sentence requires. Name what it does not.

### G5 · A blank backend must not silently become another backend's identity

For a **global** server, backend selection is **required**. For a **personal**
server, either the same, or the fallback is stated in the UI at the moment of
choosing — **not** in help text below the form. This closes BUG-012's panel face;
the registration-collision half (`stageTools.ts:526`) stays open under BUG-012
unless the census shows it inside this chain, in which case say so.

### G6 · The proof is the owner's sentence, performed

Not a unit test. A **live demonstration**, and the owner performs it:

1. The admin creates the backend `honestbench` **from the panel**.
2. The admin adds the global server (`https://mcp-honestbench.vercel.app/flat`,
   Streamable **HTTP**) and selects that backend.
3. **No SQL. No Operator. No env var. No deploy.**
4. Then, unaided, the system: syncs the catalog · writes mirror rows · records
   health · offers the tools on a live turn · calls one.

**Report each of those five as an observed line** — a `[CatalogSync]` line, the
mirror count, a `[SyncHealth]` line, the offered-tool count on a turn, and the
tool call. **If any link needs a human, the phase is not done** — that is the
whole point, and reporting it honestly is worth more than working around it.

The credential path is **already proven to work** and needs no change: three
routes exist (`resolveAuthHeader.ts:11-16`) and two are panel-only —
`apiKey` (personal) and `apiKeyRef` (a name in the `mcp_secrets` store). The
honestbench server needs none, so G6 exercises the no-credential path;
**state that the credential path was not exercised** rather than implying it was.

---

## §4 · WHAT IS NOT IN THIS PHASE

- **Deleting a backend.** Disable only.
- **`HONESTBENCH-RUN-1`** — the scored five-mode run. This phase mounts; it does
  not score.
- **BUG-006 / BUG-007 captures.** They become *possible* when a gateway backend
  can be created; capturing them is the run's job.
- **Closing any bug**, including BUG-012, whose closure proof is its own.
- **`2.2 BENCH-BACKEND-MOUNT-1`** — a real benchmark's servers. This is the door
  that phase walks through.

---

## §5 · MIGRATIONS, CI, RESEAL

**Zero migrations are expected** — `backends` exists with every column this needs.
If the census proves one is required, **author it and do not apply it**: it is an
Operator step, it opens the second touch quartet, and both are declared at
hand-back.

Five gates by name on the PR head; `in_progress`/`null` is not a pass:
build (20.x) · build (22.x) · coverage · rule26 · eval-canary (`skipped`).

This touches `api/cwf/_lib/**` and `shared/**`, so **the drift guard will fire**.
Obey it. Judge redraw-vs-hash-only on the evidence: a governed read replacing a
constant adds no topology node — but the **panel gains a surface**, and a new
admin surface may well be above diagram altitude. **Decide by reading the tabs,
not by assuming, and say which you did.**

---

## §6 · REPORT

1. Branch, head SHA, the §0 numbers you computed.
2. **G0's census table** — every link, its verdict, its file and line — and the
   answer to the governed-kinds question, with evidence.
3. Per gate: what changed, where, and the mutation control proving each new rule
   fires **and** stays quiet on the innocent case.
4. **The byte-identity proof for the two existing backends.**
5. Test deltas, five CI conclusions, the drift-guard outcome and your reasoning.
6. G6: the five observed lines — or the exact link that still needs a human.
7. **Anything unanticipated, by name.** Declared scope growth is legitimate;
   silent growth is not. Disagree with a gate **before** implementing something
   else — in this phase that invitation has already paid three times.

**Do not merge.** RULE-25 review from a fresh clone, then a verbatim GO.

<!-- END · PHASE-BACKEND-IDENTITY-IS-DATA-1-v1 -->
