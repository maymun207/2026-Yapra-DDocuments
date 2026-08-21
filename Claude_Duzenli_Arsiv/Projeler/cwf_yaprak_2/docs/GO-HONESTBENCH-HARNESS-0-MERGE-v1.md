# GO · `HONESTBENCH-HARNESS-0` — merge + the Vercel entry · v1

<!-- GO-HONESTBENCH-HARNESS-0-MERGE-v1 · 2026-08-04 · S82 · Architect: Claude (Opus 5).
     ONE self-contained relay (D-2). Covers BOTH repos, by owner instruction.
     Issued after a RULE-25 review from a fresh clone of cwf_yaprak and a full
     read of mcp-honestbench (now public — the Architect cloned and read it). -->

---

## §0 · REVIEW RESULT — every claim re-derived, none taken from the report

| Claim | Verified |
|---|---|
| `origin/master` | `b0e8c9e2…` ✓ unmoved |
| branch head | `7480c68e…` ✓ |
| **zero-code proof** | `git diff --name-only` → **one file**, `docs/honestbench-harness-0-report.md`, **396 insertions / 0 deletions**. Code files: **0** ✓ |
| `mcp-honestbench` | cloned and read. `523215a` (instrument) + `3d1f850` (CI fix) — both real, both cited accurately ✓ |
| **the falsification** | `backendToolPattern.ts:46-59` — `BACKEND_TOOL_PATTERN = { armes:'flat', superset:'gateway' }`, `toolPatternOf()` returns `?? 'flat'`, and **`backends.tool_pattern` is never read** ✓ |
| the second chokepoint | `dbConstants.ts:573` — `BACKEND_IDS` is a hardcoded 4-entry const, **and its own comment records that the list lagged behind reality** until `machine-knowledge-base` was appended ✓ |
| the flat collision | `stageTools.ts:526` — `ctx.vercelTools[safeName] = tool({…})`, no `.has()`, no log, no span ✓ |
| §6's wrong table | global rows belong in `mcp_global_settings` (`dbConstants.ts:68`); `mcp_settings` is per-user (`:698`, owner column `user_id`) ✓ **Architect's error** |

**The finding is accepted in full, and it is this phase's product.** The scored
run did not happen; a half-true architectural claim was falsified instead, at the
cost of one phase rather than a failed benchmark round. `MCP-Bench` mounts **28**
servers; `BACKEND_IDS` would have needed 28 entries. **We found the wall before
walking into it.**

**Stopping instead of writing the one-line map entry was correct.** Writing it
would have manufactured the result we were measuring.

---

## §1 · STEP 1 — `cwf_yaprak`: CI, anchor, merge

**CI on `7480c68e`**, all five by name; `in_progress`/`null` is not a pass:
build (20.x) · build (22.x) · coverage · rule26 · eval-canary (`skipped`).

**Anchor:** `git fetch --all && git rev-parse origin/master` must still be
`b0e8c9e22f47450c80cdf50c5371f39ebdf27afe`. If it moved: STOP and report.

**Merge `--no-ff`, message verbatim:**

```
merge: HONESTBENCH-HARNESS-0 — the instrument, and the wall it found

The scored run did not happen. A half-true architectural claim was
falsified instead, and that is the better outcome: `backend identity is
DATA` is HALF TRUE. Backend ENABLEMENT is data. Backend DISPATCH PATTERN
is code. So is backend identity in the governance and admin surfaces.

toolPatternOf() reads a hardcoded two-entry map and never reads
backends.tool_pattern — established with a passing positive control
(superset -> gateway), so the 'flat' returned for a novel id is real, not
an artefact. The DB column exists and is CHECK-constrained; nothing
dispatches on it. Its own migration said so in 2026-06: "dispatch hint
for the future BackendAdapter. DATA now, behavior later." The Architect
quoted that line in the design note and read it as "behavior now" — a
violation of the doctrine's own D-3 screw, which forbids inferring one
layer's behaviour from another layer's declaration.

BACKEND_IDS is the second chokepoint, and its own comment records the
lag: 'machine-knowledge-base' joined public.backends by Operator-applied
migration and this seed list "was BEHIND its own seed reality until it
caught up here". So the third backend did NOT mount without code, and
the design note's claim that it did is withdrawn.

THE ONE-LINE FIX WAS NOT WRITTEN, DELIBERATELY. Adding the map entry
would have manufactured the very property under measurement. AG reported
and stopped, exactly as the brief's §1 and §6 instruct. The repair is a
separate phase, BACKEND-IDENTITY-IS-DATA-1, and it is the named
prerequisite of rollout 2.2 and 2.2a — MCP-Bench mounts 28 servers and
MCP-Universe 11, so this wall was going to be hit with a benchmark
attached to it. We hit it with a test instrument instead.

WHAT THIS DIFF CONTAINS: one document, 396 lines, zero code. That is the
zero-code mount proof for the flat path, and it is the reason no .ts file
appears here.

WHAT IS BUILT AND NOT YET CONNECTED: mcp-honestbench (523215a instrument,
3d1f850 CI), a standalone Streamable HTTP MCP server with both profiles,
five dials, a file fixture that carries the GROUND TRUTH beside every
served lie, a startup content hash, 43 tests, 7/7 mutations caught, and
an honesty control proving it tells the truth when no dial is set. It was
spoken to over real MCP in a container. It has never been connected to
CWF.

NOT CAPTURED, AND NOT CLOSED: BUG-006 and BUG-007. Their fixes are in
production and their proofs remain unobtainable, now for a third reason
in three attempts. Neither is marked closed. The scored five-mode run is
named HONESTBENCH-RUN-1 and carries its own SOTA accounting: the
criterion left unproven is Tier E; it becomes provable once the server is
publicly reachable and BACKEND-IDENTITY-IS-DATA-1 has landed; the
measurement that resolves it is the run itself.

FOUND ALONG THE WAY, EACH NAMED: the flat registration path has no
tool-name collision guard at all -- ctx.vercelTools[safeName] = tool(...)
overwrites with no check, no log and no span, so a foreign flat backend
silently shadows another backend's tool. Filed as BUG-012, provenance
code-reading rather than live observation. And a green suite shipped a
broken container -- tsc clean, 43 tests green, CMD pointing at a file the
build never emitted -- caught only by running the image, which then
exposed CI exempting the smoke test on the one path that publishes.

ARCHITECT ERRORS IN THIS PHASE, RECORDED: the brief named mcp_settings
where global rows belong in mcp_global_settings; Amendment 1's
reachability table asserted the DB column satisfied toolPatternOf and it
does not; and the brief's §7 treated the synthetic token ceiling as a
shared wallet when it meters synthetic_runs alone. Three of three were
caught by AG or by a later read, none by the brief's own review.
```

**Then, tree identity:** `git diff --quiet 7480c68e HEAD` → clean. Push.

---

## §2 · STEP 2 — `mcp-honestbench`: the Vercel entry

The owner's ruling: **Vercel for now; the container conversion is much later.**

**The cause, read from the repo:** `src/index.ts` calls
`createApp(cfg, runlog).listen(port)` — a process that opens its own port.
Vercel's express preset wants a module whose **default export** is the app, so it
fails with `Invalid export found in module "/var/task/src/server.js"` and every
request 500s (`GET /` and `/favicon.ico`, read from the project's runtime logs).

### G1 · Add a serverless entry WITHOUT touching the container path

- New `api/index.ts` (or the repo's preferred Vercel convention): builds the
  config + runlog and **default-exports the express app** from `createApp`.
- `vercel.json` — the repo has **none** today. Route **all** paths to that entry,
  so `POST /flat`, `POST /gateway`, `GET /health`, `GET /runlog` all resolve.
- **`src/index.ts` and the `Dockerfile` stay byte-unchanged.** One repo, two
  entries: `listen()` for the container, default export for Vercel. Prove it —
  the container smoke test must still pass.

### G2 · The proof is an MCP handshake, not an HTTP 200

A `GET /health` returning 200 proves Express booted. It does **not** prove the
server speaks MCP. **The proof is a real `initialize` + `tools/list` over
Streamable HTTP against the deployed public URL**, with the returned tool names
and the startup fixture hash reported.

### G3 · Two constraints of serverless, named now rather than discovered mid-run

1. **The runlog is not durable on Vercel.** `Runlog` appends via
   `appendFileSync` when `HONESTBENCH_RUNLOG` is set and otherwise keeps
   `this.lines` in memory — and a serverless invocation has neither a writable
   filesystem nor memory that survives to the next call.
   **This is acceptable, and here is why it does not break scoring:** the server
   is deterministic by design — given `fixture.json`, `dial.json` and the call,
   the served value is a **pure function**, and both files are hash-pinned. The
   scorer's authoritative inputs therefore become **the two hashes plus CWF's own
   telemetry** (which records that the call happened), with `GET /runlog` a
   warm-instance convenience. **Report this as a limitation in the repo's README
   rather than working around it.** Filed as watchlist
   `HONESTBENCH-RUNLOG-DURABILITY-1`; it retires if reconstruction ever proves
   insufficient, and only then does a durable sink get built.
2. **Deployment protection is UNVERIFIED and is a plausible silent blocker.** The
   Architect could not read the project's protection settings. **If Vercel
   Authentication or password protection is enabled, CWF will get a 401 and the
   mount will fail for a reason that looks like a bug.** Check it, report the
   setting, and if it is on, say so — **do not change an account-level security
   setting yourself.**

### G4 · What stays out

No dial change, no fixture change, no new mode, no scoring code. This step is
**hosting only**. If it turns into anything else, report before building.

---

## §3 · WHAT THIS GO DOES NOT DO

- **It does not mount anything.** The `backends` row is an Operator write and the
  Architect still owes that packet — with `mcp_global_settings`, not
  `mcp_settings`. It comes after G2 proves the URL speaks MCP.
- **It does not add the map entry.** Deliberately.
- **It closes no bug.** BUG-006, BUG-007 stay open; BUG-012 opens.
- **It does not run the benchmark.** That is `HONESTBENCH-RUN-1`.

---

## §4 · REPORT

1. `cwf_yaprak`: merge SHA with **two** parents · the five CI conclusions read at
   merge time · `TREE IDENTICAL` · final `git status`.
2. `mcp-honestbench`: the new head, the Vercel deployment id, and **G2's MCP
   handshake output** — tool names returned plus the fixture hash the server
   printed at startup.
3. The container smoke test still green (proving the two entries coexist).
4. G3.2's protection setting, as read.
5. Anything unanticipated, by name — the same standing invitation, and it has now
   paid three times in one phase.

<!-- END · GO-HONESTBENCH-HARNESS-0-MERGE-v1 -->
