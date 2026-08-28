# CWF · BOOTSTRAP AND NEW SESSION PROMPT — v124

CUT 2026-08-28T15:03Z at the close of S123. **Every line marked UNVERIFIED was carried without being
re-measured, and rewriting one of those as fact is a new defect committed at the next close** — that
is §11's own rule and S123 spent the day proving why.

## 0 · FIRST ACTS, IN ORDER

1. Read `cwf-memory-seed-CWF5-v3.md` — **v3, not the v1 the project box §0 still names.** That
   mis-pointer is `F-S123-2` and it is a governance edit deferred to GATE-1 by the P-6 window.
2. Restate `SOTA-1` VERBATIM from `docs/laws/constitution/SOTA-1.md` in a fresh clone, in the
   session's first message. `S66-1`: a silent guarantee is an unverified guarantee. Its absence means
   the session opened wrong.
3. VERIFY THE ANCHOR BELOW against `git ls-remote` and a fresh clone before cutting any card.
4. `npm run architect:open`. Expect `gh`-dependent fields UNMEASURED (no `gh` in the Architect's
   container) and the factory field UNMEASURED unless `SUPABASE_ACCESS_TOKEN` is set — read the
   factory with the Supabase MCP instead.

## 1 · THE ANCHOR — MEASURED AT CLOSE, VERIFY IT ANYWAY

```evidence:anchor
master     3aab649dfbab5360c52aab58db839d0905649fa6
branches   112 on the wire · lane refs lane/AG-1 … lane/AG-5, five
docs/laws  constitution 16 · rules 59
open-items 38990 bytes — exactly its pinned FLOOR (api/cwf/__tests__/groundLedger.test.ts)
archive    2026-Yapra-DDocuments main = c5cc031e655d89ad467b891f1683eed442a17778, remote MATCHES,
           nothing unpushed. AG-4 pushed it and read the remote back.
```

## 2 · WHAT S123 LANDED

Two trunk landings, both closing items carried for eight sessions as "the real blocker, NOT BUILT":
the **honestbench scorer** (PR #472, `8a19fe8a…`) and the **A23 understanding layer** (PR #479,
`3aab649d…`, nine files, +1426/−47) — `#29` / `GI-101`, the SEVENTH KEY of the internal counter.

## 3 · THE FACTORY, AND HOW TO READ IT

**Liveness is positive-only.** `factory_state.state` is hand-written and fossilises. The heartbeat is
ANTI-correlated with production: it goes quiet while a lane works and fresh while it idles. **A fresh
heartbeat means a window is ALIVE AND IDLE**, which is the good case and the actionable one. Only
OUTPUT — a landed commit, a pushed branch, a bus reply — proves a lane alive.

The `scout` and `operator` rows are `CLOSED` with a null heartbeat BY DESIGN: `scout` is a box address
that is readable and never claimable, so a scout window writes no heartbeat. Scout liveness is
UNMEASURED at any open and only output settles it.

**Count bus replies by `reply_to`, never by `artifact_name`** — windows choose their own names, so a
name-keyed census under-reports without saying that it did. Cross-check against the server-issued row
ids the windows quote: that is the one identity claim a window cannot fabricate about itself. At least
two windows label themselves `W1`.

## 4 · THE CARD MECHANISM AS S123 LEFT IT

**A re-cut carries an `evidence:supersedes` fence:** the predecessor's recovered digest, a STATED
exemption for the version stamp (title and tail anchor — a rule demanding a measured cause for those
can never be satisfied), and one line per difference naming what forced it. A changed line that maps
to neither is a silent edit and it is a RED. **Two silent edits were caught this way in one session.**

**Do NOT put a diff digest in a card.** `diff -u` is not one program: BSD and GNU render the same delta
at different byte counts and sometimes different HUNK COUNTS. The unit of a hunk belongs to the differ.
The predecessor and successor digests already pin the delta portably.

**Prefer construction to comparison.** The strongest form S123 reached: build the new version
SERVER-SIDE from the reviewed predecessor by named substitutions, and dispatch by extracting the
candidate SERVER-SIDE from the scout row that reviewed it, under an md5 guard. Then the reviewed bytes,
the preflighted bytes and the dispatched bytes are one object by construction.

**RE-READ EVERY MOVING REF AT THE MOMENT OF DISPATCH, not only at the moment of measurement.** A card
died this session because thirteen minutes passed between the two. And point the DECAY clause at the
ref that actually moves — usually the BRANCH, not master.

**Two instrument traps, both measured:** Postgres `text::bytea` is NOT byte-preserving (it interprets
backslash-octal escapes) — use `convert_to(t,'UTF8')`. And `md5` is 32 hex, inside CP-8's refused band;
use `sha1` (40) or `sha256` (64) in card prose.

## 5 · STANDING RULINGS, UNCHANGED

- **Ruling ②** — every card is scout-reviewed before it reaches a producer. No exception was taken in
  S123 and none should be.
- **The canary is FROZEN** by owner ruling (`docs/ops/CANARY-FROZEN.md`, `if: false`). Its absence from
  a checks list is the freeze working: not a fault, not to be repaired, not reported as a gap.
- **P-6 observation window is OPEN.** Ordinary lane work runs; no governance or mechanism change lands.
- **⑤ merge-authority exception** stands by owner ruling; its STEEL is GATE-1's first work order.
- **Secrets are env-only.** A transcript is a publication. The ARMES literal key found in
  `mcp_global_settings.servers` must be ROTATED BY THE OWNER and re-entered as `apiKeyRef`; the new
  value is never pasted to the Architect.

## 6 · SOTA — UNVERIFIED, AND SAID SO

**UNVERIFIED, carried from v122 and NOT re-measured at the S123 close: the internal counter read 6/7
and the external acceptance contract read 0/16.** The seventh internal key landed in S123, so the
internal figure has moved — **by how much is a reading the next session takes from
`cwf-sota-definition` and `npm run architect:open`, not from this sentence.**

`SOTA-1` binds acceptance to the sixteen EXTERNAL criteria of `cwf-sota-definition`. The internal
7-key counter is a READINESS measure. **Turning the seventh key does not satisfy `SOTA-1`**, and a
session that closes on "gate N/7" without naming the external contract has closed incomplete.

## 7 · FIRST WORK, IN THE OWNER'S ORDER

Carried from v122's GATE-1 agenda, unchanged and UNVERIFIED as to its current state:

1. `phase/context-retrieval-1-organ` — 22 unlanded commits, HELD unreviewed
2. the ⑤ ruling's steel: the `land.ts` predicate, four prose homes, the `factory_events` write
3. `ADF-ARCHITECTURE-v2`'s landing — the landing card states the landing IS the owner's ratification;
   the H2 direction (deterministic set vs vector retrieval as the source of binding law) stays OPEN and
   is decided alongside the context-retrieval review; any change mints `v2_1` under `S37-1`
4. the foreman's observation-report path
5. the four `S119-LANDING-ORDER` reports
6. the unskippable pre-dispatch preflight hook
7. the P-9 extension candidate

Plus what S123 leaves owed, all uncarded:

- the two AG-3 gate findings — five reader sites the build card named none of, and **the whole-tree
  typecheck passing over `api/` files while proving nothing about them**
- `F-S123-20` the foreman lands and does not report · `F-S123-21` a read-only diagnostic rewrites a
  governed ledger · `F-S123-22` a fallback keyed on REACH rather than on the WRITE
- the sweep's five CLOSED-BY-TREE closures: GI-006, GI-012, PI-007, PI-011, PI-014
- the ARMES `apiKeyRef` card · the `authority-conformance.latest.md` dirty-stamp card
- `F-S123-2`: the project box §0 points at `cwf-memory-seed-CWF5-v1` and the current seed is **v3**

## 8 · THE ONE SENTENCE WORTH CARRYING

The dominant failure of this factory is a NUMBER that travels between carriers without being
re-derived, and **every actor commits it — the owner, the lanes, and the Architect most of all.** S123
added the sharper half: **an INSTRUMENT that measures the tool rather than the thing does the same
damage while looking like rigour.** Both were caught by a second lens, never by the author.

TAIL ANCHOR: CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v124 ends here.
