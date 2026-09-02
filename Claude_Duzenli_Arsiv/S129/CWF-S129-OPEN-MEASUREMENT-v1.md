# CWF-S129-OPEN-MEASUREMENT-v1 — the open, measured: a bridge that opened, an anchor that held, and a ruling that had not landed on itself

CUT 2026-09-02 evening (Istanbul), at the S129 open, from bootstrap v129.
Every line below is a MEASUREMENT taken this session, or is labelled UNVERIFIED. Nothing
carried from v129 is restated here as fact.

---

## 0 · SOTA-1 POSITIVE CONTROL (S66-1) — EXECUTED FROM SOURCE, NOT FROM A MIRROR

`SOTA-1` was read this session from `docs/laws/constitution/SOTA-1.md` **at the anchor commit**
in the owner's local clone, over the device bridge. Not from the project box, not from memory.

- Read via `git show d8895114744dbb23ba5633d726a0814cfe0468d5:docs/laws/constitution/SOTA-1.md`
- md5 of the anchor blob: `7a3b38aeca3522d39380426ef4a76e87`
- md5 of the working-tree file at local HEAD: `7a3b38aeca3522d39380426ef4a76e87` — **equal**,
  so the file did not move between local HEAD and the anchor.

**HONESTY LABEL ON THIS CONTROL.** The clone could NOT be verified against the wire: the device
VM has no GitHub credentials (`git fetch` → *could not read Username for https://github.com*).
The anchor was therefore verified against the clone's own object store, where it is present as a
real commit object and as `origin/master`. That is a stronger ground than a mirror and a weaker
ground than the wire, and it is named as such.

## 1 · ANCHOR — HELD, WITH A NAMED GAP

| claim | v129 said | measured this session | verdict |
|---|---|---|---|
| master anchor | `d8895114744dbb23ba5633d726a0814cfe0468d5` | present as a commit object; equals `origin/master` in the clone | **HOLDS** (object store, not wire) |
| owner clone checkout | not stated | on `master` at `245e90a24f58be8134a0558b7fc570d598621d90`, dated 2026-08-29 19:45:47 +0300 | **3 commits BEHIND the anchor** |
| `docs/laws/constitution/` | sixteen records | `16` at working tree AND at the anchor | **HOLDS** |
| `docs/laws/rules/` | fifty-nine files | `59` at working tree AND at the anchor | **HOLDS** |
| `phase/context-retrieval-1-organ` | 22 unlanded commits | `d72c39a0e87e92e9a19742e03362e4aa41168332`, exactly **22** commits vs the anchor | **HOLDS** |

The three commits the owner's checkout is missing are `02f5d679` · `dad70135` · `d8895114`
(PR #486, the S126 budget thresholds). The working tree is otherwise clean but for one modified
file, `docs/ground/authority-conformance.latest.md`.

## 2 · THE BRIDGE (bootstrap ⓵) — OPEN, BY A DIFFERENT ROUTE THAN THE ONE PREDICTED

S128's standing hypothesis — *a conversation binds its tool catalogue at start, so the Docker
gateway's filesystem servers appear in a NEW conversation* — was tested at this open and is
**FALSIFIED for the gateway route**:

- `get_device_info.localMcpServers` enumerates FOUR servers: `B12 Website Generator`,
  `PDF Tools`, `Apify`, `MCP_DOCKER`. No filesystem server appears.
- The gateway's announced tool set carries `browser_*`, `code-mode`, `mcp-add`, `mcp-config-set`,
  `mcp-exec`, `mcp-find`, `mcp-remove`, `mcp-*-profile` — and **zero** filesystem tools.
- `mcp-find "filesystem"` confirms `filesystem`, `rust-mcp-filesystem` and `desktop-commander`
  exist in the CATALOG. Catalog presence is not session presence.

**What actually opened the bridge was the owner connecting two folders**, which gave this session
`device_bash` — a real shell on his machine, scoped to the connected folders. That is a strictly
better instrument than the gateway filesystem servers were ever going to be, and it makes the
`desktop-commander` fallback moot. The Docker-gateway line of work is **closed as unnecessary**,
not as failed.

**The path, measured, and why S128's probe missed it.** The clone is at
`/Users/tunckahveci/Desktop/2026 DESKTOP/2026 -YAPRA/2026 - Yapra -  Codes/cwf_yaprak`.
The owner's proposed path in v129 read `2026 - Yapra - Codes`. The real segment is
`2026 - Yapra -  Codes` — **two spaces after the hyphen**. A single invisible character is the
whole distance between "not found" and "found". Filed as
**F-S129-PATH-DOUBLE-SPACE-1**: a path typed by hand is a claim; a path from *Copy as Pathname*
is a measurement, and v129 already said so.

**What the bridge still cannot do.** `npm run architect:open` does NOT run over it. The clone's
`node_modules` is macOS-native (`@esbuild/darwin-arm64`) and `device_bash` is a Linux VM, so `tsx`
dies on the platform mismatch — the same trap S127 noted and S128 hit. Claude does not write
packages into the owner's folders. **Therefore the 7-key internal counter was NOT measured at this
open either, and this is the fourth consecutive session in which it was not.** Its cure belongs to
the lane, which runs on Linux with its own install, not to the owner and not to a workaround.

## 3 · THE STANDING FAULT — CONFIRMED BY ENUMERATION, AND WIDER THAN v129 SAYS

All twelve **published** `armes.tool_category` rules were read and their tool arrays enumerated in
full — a closed count, not a search. Live counts confirm v129 exactly:
`draft=12 · published=12 · archived=29`.

The published categories and their sizes: `admin` 1 · `andon` 3 · `employee` 8 · `factory` 2 ·
`linestop` 6 · `logistics` 5 · `machine` 21 · `material` 19 · `metrics` 2 · `production` 23 ·
`quality` 9 · `transfer` 9.

`getRecipeTemplatesByDate` appears in **none** of the twelve. The fault stands, four days old.

### 3.1 · TWO NUMBERS IN THE CARD ARE WRONG, AND THEY WERE FOUND BEFORE DISPATCH

**F-S129-BYDATE-FAMILY-ARRIVAL-MISDATED-1.** S128 §2 records the family as *"same family, same
arrival"*: `getOrdersByDate`, `getEmployeesByShiftAndDate`, `getMaterialListByFactory`. Measured
`first_seen_at`:

| tool | first_seen_at | in a published category? |
|---|---|---|
| `getEmployeesByShiftAndDate` | **2026-08-28 11:31:54Z** | no |
| `getMaterialListByFactory` | 2026-09-01 08:31:00Z | no |
| `getOrdersByDate` | 2026-09-01 09:31:53Z | no |
| `getRecipeTemplatesByDate` | 2026-09-01 09:31:53Z | no |

The arrivals are **not** the same. `getEmployeesByShiftAndDate` predates the others by four days
and had been invisible for five days before the fault was ever noticed. Card part (c)'s claim
*"on 09-01 09:31Z it would have read 1"* is therefore false on its own terms: at that instant at
least three read-tools already sat in no published category.

**F-S129-G5-COUNTER-SPEC-WOULD-READ-48-1, and this one would have shipped a useless gauge.**
Card part (c) specifies the counter as *"active tools in no published category: N"* and asserts
*"Today it would read 4"*. Computed against the live DB — active `armes` tools minus the union of
all twelve published category arrays — **N = 48**, not 4. Forty-four of those forty-eight are
mutating tools (`create*`, `update*`, `delete*`, `start*`, `stop*`, `approve*`, `reject*`,
`merge*`, `insert*`, `setAmount`, `emptySiloZone`, `fixWarehouseSnapshots`,
`addMachineDataReportToProduction`, `reviewRecipe`, `pauseOrderPlan`, `returnShipment`,
`completeShipment`), all first seen 2026-07-14.

Whether those forty-four are excluded **by design** (a write-gating policy) or by the same
omission is **NOT MEASURED** and must not be assumed in either direction — that reading comes
from the code, which the bridge can now reach. But the consequence for the card is settled
either way: a counter built to the letter of (c) renders **48 in red on day one**, is read as
noise, and stops being looked at. The gauge that was meant to stop this class would have been
disarmed by its own first reading.

**The cure is a specification change, not a smaller number:** (c) must count active tools in no
published category **restricted to the read surface the router may offer**, and must say on its
face which surface it counts. Until the read/write split is measured in code, the counter's
denominator is unproven and the card cannot be dispatched on this part.

## 4 · ARCHIVE OPEN-MEASUREMENT (OWNER-RULING-S128-ARCHIVE-AUTOPUSH-1, arm 2) — RED AT THE FIRST OPEN IT BINDS

Measured on the archive working copy with `GIT_OPTIONAL_LOCKS=0`:

- branch `main`, HEAD `84a67f1aa6e54ede2a7626a13ea99fc67ba28546`, ahead 0 / behind 0 vs the local
  upstream ref. **Wire read-back impossible**: `git ls-remote` fails with the same missing GitHub
  credential. Ahead/behind is therefore measured against a ref last refreshed by the S128 lane,
  and is labelled UNVERIFIED against the wire.
- `git status --porcelain` returns twelve lines. Nine are the known NFD phantoms
  (F-S125-NFD-LENS-1). **Three are real and new.**

**F-S129-AUTOPUSH-RULING-DID-NOT-LAND-ON-ITSELF-1.** Untracked in the archive repository:

- `Claude_Duzenli_Arsiv/S128/OWNER-RULING-S128-ARCHIVE-AUTOPUSH-1.md`
- `Claude_Duzenli_Arsiv/S128/OWNER-RULING-S128-WINDOW-REFRESH-1.md`
- `Claude_Duzenli_Arsiv/S128/CARD-LANE-CLOSE-S128-AG5-v1.md`

The first of those **is the ruling that forbids exactly this state.** It was written and never
landed — `F-S128-ARCHIVE-DONE-MEANT-WRITTEN-NOT-LANDED-1` recurring, one session later, on the
document that outlaws it. The lane's push at 84a67f1 landed the files that existed when the card
was cut; these three were written after it, and no second card followed.

**And the close-gate's arm 1(b) was not performed at all.** `S128/` held six files on disk;
`S125/`, `S126/` and `S127/` each hold their `CWF-S<n>-SESSION-CLOSE-v1.md` and their
`CWF-BOOTSTRAP-...-v<n+1>.md`. S128's two §11 close artifacts and its dispatch record existed
**only in the project box** and had never been placed on the bridge. Placed this session, from the
project-box originals:

- `S128/CWF-S128-SESSION-CLOSE-v1.md` — sha256 `9199c73d5772059adfd9c41d9861b5c274a095e13b1757f3324f7da395e6c50b`
- `S128/CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v129.md` — sha256 `9fa580cd103ed1f54a888c226273e52d0fb5ef7d0955191e00f32b815ab6f6ad`
- `S128/S128-DISPATCH-RECORD-1.md` — sha256 `548b5d2ca73da8097aa08eab75b667bd18161c7c5103c0a537866e1cec59365f`

They are on disk and **still untracked**; landing them is the lane's work, not the owner's.
This file itself is at `S129/CWF-S129-OPEN-MEASUREMENT-v1.md`, likewise untracked and likewise
the lane's to land; its digest belongs in the dispatch card, not inside itself.

**F-S129-BOOTSTRAP-OMITS-ITS-OWN-BINDING-ARM-1.** The ruling's arm 2 states plainly that
*"CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v129 and every successor carries both this arm and arm 1; a
bootstrap that omits them is defective by this ruling."* v129 carries **neither**. The bootstrap
is defective by the ruling that names it, and the omission was invisible until the archive was
measured. v130 must carry both arms verbatim.

## 5 · THE CLASS, AGAIN, AND WHERE IT LIVES NOW

v129 §5 named the class: an indicator taken for ground truth. Every defect above is that class
wearing the costume the bootstrap did not predict:

- `offeredCount` was S128's indicator. **A card's own prose was S129's** — `"Today it would read 4"`
  is an assertion that reads like a measurement, and it was one number away from shipping a gauge
  that could not work.
- `"same family, same arrival"` is a generalisation across four rows where only three share the
  date; nobody read the fourth row's timestamp.
- `git status` clean-by-assumption is the same error at the filesystem: the S128 close said the
  archive was cured, and the cure covered every file that existed at the moment of the card.

**The mitigation that worked here was not care. It was refusing to quote a number without
re-deriving it, and preferring enumeration to search on every one of the four checks.** Three of
the four numbers held; two did not; the two that did not were both inside the card awaiting
consent.

Also worth filing against the bridge itself: `git fetch` printed `fatal:` and the shell reported
`fetch_exit=0`, because the exit code belonged to the tail of the pipe. **An exit code is an
indicator too.** Read the output, not the receipt — S128 §8's lesson, arriving from the opposite
direction.

## 6 · WHAT IS NOT MEASURED AND IS SAID SO

- **SOTA, both boards.** Fourth consecutive session. The internal 7-key counter needs
  `architect:open`, which the bridge cannot run (§2). The external contract,
  `cwf-sota-definition-v1_5`, lives in the project box and the archive — **not in the repository**
  (`docs/` has no such file; the repo's only hits are references). Its own last binding statement,
  dated 2026-08-04, is that sixteen of sixteen external criteria are unmeasured, and no later
  version of the contract exists. That is a measurement OF THE DOCUMENT, not of the product.
- The budget fence's 07:10Z run, the two router valves, AG-5's liveness, and the S127 infrastructure
  changes: all carried UNVERIFIED from v129 and **not measured at this open**.
- Whether the forty-four mutating tools are excluded by design (§3.1).
- The wire. Nothing in this session was read from GitHub.

TAIL ANCHOR: CWF-S129-OPEN-MEASUREMENT-v1 ends here.
