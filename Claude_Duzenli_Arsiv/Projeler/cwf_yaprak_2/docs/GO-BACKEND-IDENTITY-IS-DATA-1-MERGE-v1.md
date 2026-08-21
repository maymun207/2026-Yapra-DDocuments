# GO · `BACKEND-IDENTITY-IS-DATA-1` — merge instruction · v1

<!-- GO-BACKEND-IDENTITY-IS-DATA-1-MERGE-v1 · 2026-08-04 · S82 · Architect: Claude (Opus 5).
     ONE self-contained relay (D-2). RULE-25 review from a fresh clone.
     TOUCH BUDGET: prompt · report · GO · merge report = the standard quartet, held. -->

---

## §0 · REVIEW RESULT — re-derived, nothing taken from the report

| Claim | Verified |
|---|---|
| `origin/master` | `fbfd8aa1…` ✓ unmoved · anchor is an ancestor |
| branch head | `cb1a567d…` ✓ · 23 files, **+883 / −60** |
| test files · migrations · ADRs · docVersion | **449** · **67** · 13 · **rev 191** ✓ |
| **G2 shape** | `toolPatternOf` = `patterns?.get(id) ?? BACKEND_TOOL_PATTERN[id] ?? 'flat'` — DB map first, **code floor second**, and an **omitted** map answers exactly as the pre-phase function did ✓ (`backendToolPattern.ts:81`) |
| **positional read retired** | `BACKEND_IDS[1]` appears **only in comments** now; zero live index reads ✓ |
| **G1** | `api/admin/backends.ts` — GET/POST/PATCH on `PERMISSIONS.CONFIG_GLOBAL`, the **same** gate `mcp-secrets` uses; **DELETE → 405 with its reason**; `id` immutable ✓ |
| **G3** | `parseBackend` is registry-backed, **union not replacement** (an empty read cannot lock the admin out of backends that demonstrably exist), and **fail-closed** on an unreadable registry — floor only, loudly ✓ |

**Two judgements I want to name as good, not merely correct:**

`parseBackend`'s **union** is the right call and it is not the obvious one. A
replacement would have been "purer" and would have locked the panel out the first
time the registry read hiccuped. And `parseBackend` becoming **async** rippled
into six endpoints — every one of them updated rather than one of them forgotten.

**The mock that did nothing** is the finding I would keep from this phase's
process: `vi.spyOn` on an ESM class export was **silently inert** and 18 of 19
tests passed anyway. Second instance in two days of a **test apparatus that
reported success while doing nothing** (yesterday: a mutation harness whose
`tail` hid the summary). The DI seam plus the control that would have caught it
is the right repair.

---

## §1 · THE VERDICT — the identity half is DONE. The sentence is NOT YET TRUE.

The census answered its question honestly and the answer was a **degradation**,
which is why it is not buried in a footnote:

> `offered on a turn` — **degrades** — reachable only via all-fallback

**Verified at the byte.** `stageTools.ts:262-271`: the offered set is
`all(gateway tools) ∪ relevanceFilter(flat tools)`, and the relevance filter runs
against `resolveToolCategories()` — **armes' governed category map**. A novel
backend registered as `flat` has tools in **no** category, so the moment a
message matches *any* armes category, its tools are dropped. They surface only
when the message matches **nothing**.

**And the irony is eight lines above it, in the code's own comment:** the gateway
carve-out exists precisely because *"a gateway backend's tools match no keyword
category, so filtering them offers ZERO (the live [ToolRoute] bug)"*. **The same
bug now applies to a novel FLAT backend.** The carve-out was written for the
symptom and never generalised to its cause: *a backend with no category coverage
cannot survive a category filter.*

**AG's correction makes this material rather than theoretical:** production takes
the filtered branch (live provider Gemini, `isAnthropic=false`). So an admin who
adds a backend and asks a question **about that backend's domain** will very
likely hit an armes keyword and see the new tools dropped.

**Against §1's acceptance criterion — the owner's sentence — that is not "the
system uses it".** It is "the system uses it when the question happens to match
nothing", which is use by accident.

**This is not a defect in the work.** The brief asked the census to answer the
reachability question and it did, with executed evidence and both branches shown.
Naming it instead of absorbing it is exactly right.

---

## §2 · MERGE — CI, anchor, message

**CI on `cb1a567d`**, five by name; `in_progress`/`null` is not a pass.

**On the `AdminPanel.test.tsx` red:** accepted as a flake, and accepted because
it was **proven rather than asserted** — 5× isolated on the branch, 3× isolated
on a clean `origin/master` worktree, full suite green locally on both, all five
gates green on a re-run with identical code, plus the structural argument that
the test drives `permissions: []` and never mounts `MCPSettingsTab`. That is the
S55-1 bar met, not waved. **The underlying defect is recorded as
`W-006 · the AdminPanel active-context assertion cannot fail`** —
`findByTestId('active-context-banner')` resolves in both states, so it cannot
distinguish "not updated yet" from "updated". Not fixed here; correctly so.

**Anchor:** `git fetch --all && git rev-parse origin/master` must still be
`fbfd8aa1be615184ecca85a8e98503176779922d`. If moved: STOP and report.

**Merge `--no-ff`, message verbatim:**

```
merge: BACKEND-IDENTITY-IS-DATA-1 — the door exists; the room is still half lit

The admin can now create a backend identity from the panel, enter its
credential, and have the system sync, mirror and health-track it with no
SQL, no Operator and no deploy. That was the defect HONESTBENCH-HARNESS-0
found by failing to mount a foreign MCP server, and PLATINUM's own rule --
a required manual step means the design is wrong -- is why this jumped the
queue.

WHAT BECAME DATA. toolPatternOf resolves DB-first with the old hardcoded
map as the F185 code floor: today's state is the floor, so the resolved
map EQUALS it on armes and superset and an omitted map answers exactly as
the pre-phase function did -- asserted by test, not claimed. All eight
call sites stay synchronous by resolving once per turn, sync, lens and
request, so the hot path did not become async. The replay lens resolves
identically, because a lens and the turn it replays must not disagree
about what a backend is. BACKEND_IDS[1] -- the gateway identity bound to
an ARRAY INDEX, so that inserting an id in the wrong position would have
silently stopped Superset being a gateway -- is retired.

ADR-010 IN THE SAME BREATH. A row is a claim, so the catalog is also
OBSERVED and a divergence between what a backend declares and what its
tools/list shows is logged rather than swallowed. The row still wins,
because a human ruled -- but the disagreement is on the record. The
observation is a heuristic and says so: MCP has no gateway/flat notion,
`call_tool` is a convention rather than a spec field, and the governed row
is what makes a wrong heuristic fixable without a deploy.

parseBackend now validates against the registry, UNION with the code floor
rather than replacing it -- an empty read must not lock the admin out of
backends that demonstrably exist -- and fail-closed and loud when the
registry is unreadable, deliberately asymmetric to G2 with the reason in
code. Going async rippled into six endpoints; all six were updated.

A blank backend on a global server is now REFUSED, and the consequence
moved onto the option being chosen instead of living in help text below
the form. That closes the panel face of BUG-012: a user could connect a
server whose tools then ran under ANOTHER backend's identity.

THE CENSUS ANSWERED ITS QUESTION AND THE ANSWER WAS A DEGRADATION.
Governed kinds are NOT required for a novel backend's tools to be offered
and called -- proven by execution, both branches shown -- so reference/
kinds.ts stays out, named rather than absorbed. But offering DEGRADES: the
offered set is all(gateway) union relevanceFilter(flat), the filter runs
against armes' category map, and a novel flat backend's tools belong to no
category. They survive only when the message matches NOTHING. Production
takes the filtered branch, so this is material, not theoretical. The
carve-out that already exists for gateway tools eight lines above was
written for the symptom and never generalised to its cause: a backend with
no category coverage cannot survive a category filter.

SO THE ACCEPTANCE SENTENCE IS NOT YET TRUE. "The admin adds a backend,
enters its credential, and the system uses it" is satisfied up to "uses
it", where it becomes "uses it when the question happens to match
nothing". BACKEND-REACHABILITY-1 is the named next item, and the owner's
live demonstration is deliberately deferred until after it -- performing
it now would prove a half-answer we already know.

KNOWN GAPS, EACH NAMED RATHER THAN DISCOVERED LATER: UsersTab's scope
selector still iterates the constant, so a new backend cannot be
RBAC-scoped from the panel (super_admin bypasses scopes, so the sentence
survives); genArchitectureFacts maps through the floor, so generated
architecture facts understate a newly created backend; and deleting a
backend is out of scope by design -- 405 says so rather than pretending
the route does something.

Tests 448/5051 -> 449/5072. Zero migrations. Drift fired on 7 tabs and was
obeyed by READING them: governance-model enumerates admin endpoints
exhaustively, so a new one is above its altitude and it was redrawn; the
other six resealed hash-only, because a governed read replacing a constant
adds no topology node. rev 190 -> 191.

PROCESS FINDING WORTH MORE THAN A LINE: a vi.spyOn on an ESM class export
was silently inert and 18 of 19 tests passed anyway. Second instance in
two days of test apparatus reporting success while doing nothing. Fixed
with a DI seam and the control that would have caught it.
```

**Then:** `git diff --quiet cb1a567d HEAD` → clean. Push.

---

## §3 · WHAT COMES NEXT — and why the demonstration waits

**`BACKEND-REACHABILITY-1`** — generalise the carve-out at `stageTools.ts:262-271`
from *"gateway tools bypass the filter"* to *"tools of any backend with no
published category coverage bypass the filter"*. The precedent, the reasoning and
the comment explaining why are already in that function; what is missing is the
generalisation.

It is small, it sits on the **hottest path in the system**, and it therefore gets
its own phase with its own proof rather than being absorbed here. **Do not start
it from this GO** — the Architect writes it as the next relay.

**G6 is deliberately not requested yet.** The owner performs that demonstration
**once**, after reachability lands, and it either passes or names the link that
still needs a human. Asking him to perform it today would spend his time proving
a half-answer we can already predict.

---

## §4 · REPORT

Merge SHA with **two** parents · the five CI conclusions read at merge time ·
`TREE IDENTICAL` · final `git status` · and confirmation that the 405 on DELETE
and the blank-backend refusal both survive the merge.

<!-- END · GO-BACKEND-IDENTITY-IS-DATA-1-MERGE-v1 -->
