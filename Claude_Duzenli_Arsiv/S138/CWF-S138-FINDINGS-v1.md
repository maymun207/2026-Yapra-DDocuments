# CWF-S138-FINDINGS-v1

Cut 2026-09-14, mid-session, while the lanes were running. Every line here was MEASURED today; where a
claim is carried it says so. Four of the fifteen are the Architect's own defects and they are filed beside
the rest, not in a footnote.

## 0 · WHAT LANDED, SO THE FINDINGS ARE READ AGAINST PRODUCT AND NOT AGAINST PROSE

| what | evidence |
|---|---|
| PR 547, AG-4's landing report | master `3adf6bb513422ef2f61c63599988edb8132040b9`. Open since S137's close |
| The archive push | documents `origin/main` = HEAD = `f2c5c7786bf1f4a053ef40e58737bb2194cf6090`, 0 ahead. Open since S134 — eleven days |
| `armes.tool_category` key `factory` | v3 PUBLISHED 09:11:45Z, 7 tools, gate passed |
| `armes.tool_category` key `employee` | v4 PUBLISHED 09:52:12Z, 12 tools, SCHEMA + REFERENTIAL + BEHAVIORAL all green |
| The clone's master | fast-forwarded `0cae062c…` → `88d7a11c…` by AG-5's own boot |
| AG-4's address | CLAIMED, heartbeat 19:37:00Z, after an owner-approved pinned-lease takeover |

## 1 · THE CARRIER FINDINGS

**`F-S138-THE-BUCKET-WAS-NEVER-AT-V54-1`** — four consecutive registers called REGISTER-BUG-BUCKET stale
at v54. It is at **v56**, and has been since S120. S135's own bootstrap measured this correctly and ordered
it re-filed; three registers overwrote the correction. Filed in full in this directory. CLOSED by
`REGISTER-BUG-BUCKET-v57`.

**`F-S138-THE-SHARED-CLONE-MASTER-IS-FIFTY-FIVE-BEHIND-1`** — the clone every lane works in was zero ahead
and fifty-five behind `origin/master`. CLOSED@ AG-5's boot fast-forward, twenty-five minutes after filing.

## 2 · THE TOOL-VISIBILITY CHAIN — three layers, measured one at a time, each exposed by fixing the one above

**`F-S138-A-DRAFT-CATEGORY-IS-AN-INVISIBLE-TOOL-1`** — `getEmployeesByWorkstationsAndShift` entered the
catalog at 2026-09-10T07:01:08Z. Its category row was authored **sixty-four seconds later** at 07:02:13Z
and sat in `draft` for four days. The runtime reads PUBLISHED rows only. A tool in a draft category and a
tool that does not exist are byte-identical from the turn's side.

**`F-S138-THE-GATES-REFUSAL-RENDERS-OFF-SCREEN-1`** — the reason that draft never published was a gate
refusal naming four specific defects, including `fixWarehouseSnapshots` as write-exposed under ADR-011
CATALOG-WRITE-LOCK-1. The refusal WAS rendered. It sat below the fold and behind a horizontal scroll in
the right panel. Four days, and the Architect itself did not see it on the first attempt — it learned the
refusal from `rule_audit`, not from the screen. **This is the most expensive line in this document.**

**`F-S138-A-TOOL-IN-THE-WRONG-CATEGORY-IS-STILL-INVISIBLE-1`** — publishing `factory` was necessary and
NOT sufficient. The semantic router classifies the question as `employee`; the tool was filed under
`factory`. Measured across six turns: the tool was absent from every offered set even on the healthy
semantic path. Publishing `employee` v4 put it in the offered set — `offeredCount` 22 → 26, measured live.

## 3 · THE ROUTING FINDINGS

**`F-S138-THE-FLOOR-NARROWS-WHAT-IT-PROMISED-TO-PRESERVE-1`** — six turns on 2026-09-14: five took the
semantic path at 452–827 ms; one floored at **1501 ms** against a 1500 ms budget, `floorReason "timeout"`,
`irFrame null`. On that turn the offered set fell from 18–26 tools to **14**. The project's own design
document `cwf-ir-pathb-hybrid-logic-v1_3` §ALT-B promises of the floor ladder that *"cekirdek fabrika
yetenekleri ASLA kaybolmaz"*. They are being lost. Carded as `CARD-FLOOR-WIDENS-S138-1-v1`.

**`F-S138-THE-ASK-PRE-EMPTS-THE-DISCOVERY-TOOL-1`** — turn `5095733756b00e106c404ad44ddba6ee`, 09:56:51Z:
semantic path, HIGH-confidence frame, 26 tools offered **including `getWorkingPlaces`**, and **zero tool
calls**. `router.askOnUnresolved=1` turned an unresolved entity into a question to the human while the tool
built to discover that entity sat unused in the same offered set. The tool's own annotation instructs the
caller to try `getWorkingPlaces` first. Carded as `CARD-ASK-AFTER-DISCOVERY-S138-1-v1`.

**`F-S138-A-TOOL-DESCRIPTION-IS-OFFERED-AS-A-RECOGNISABLE-SURFACE-1`** — `api/cwf/_lib/routing/askSuggestions.ts`
line 69 pushes a tool's ENTIRE description as a candidate `surface`, with no length cap. Its sibling
`vectorSuggestions.ts` carries `VECTOR_SUGGESTION_MAX_LEN = 80` and a comment explaining precisely why a
paragraph must never be offered. **One guard, two layers, applied to one.** Witnessed in production: the
user was asked "did you mean" and shown a full English tool description.

## 4 · THE TOPOLOGY FINDINGS

**`F-S138-NO-WORKSTATION-LAYER-EXISTS-1`** — `backend_entity_layers` declares exactly three enabled layers
for armes: factory, line, equipment. `entity_registry`: equipment 1715, line 783, factory 17, nothing else.
The workstation the user asks about is not a modelled entity class. **Correcting his spelling would not have
resolved it** — see the A-REC below.

**`F-S138-THE-DESCRIPTOR-TABLE-HAS-NO-CONFIGURATION-SURFACE-1`** — `entityDiscoverySync.ts` is generic by
construction (its own header: *"Nothing in this module names a backend, a tool, a layer or an entity...
Adding a fourth layer or a third backend is a row INSERT"*) and IS called, from `catalogSync.ts`. The organ
works. What is missing is the surface: a grep over `src/` for `backend_entity_layers` returns **zero**
matches, and `BackendEntityLayersRepository.ts` line 4 already labels the table *"authored,
Operator-pending"*. The debt was recorded in the code before this session found it.

**`F-S138-THE-SANDBOX-IS-A-THIRD-HARNESS-GATE-1`** — reported by AG-4, not by the Architect. Inside the
lane's sandbox, `mcp.supabase.com` is blocked, so the repository's own `readMode()` returns `UNMEASURED:
read path unavailable`; the same command unsandboxed reads `READY`. `ps` is also blocked, so the liveness
lens cannot run its own control there. Same class as
`F-S137-THE-HARNESS-IS-A-GATE-NO-LAW-NAMES-1`, third instance, still uncured as a class.

## 5 · THE UI FINDINGS, GATHERED BY DRIVING THE PANEL WITH THE OWNER WATCHING

1. The gate refusal renders off-screen (§2, and it is the costly one).
2. Three competing drafts sit under one `(kind,key)` labelled only by age — "5 days ago", "2 weeks ago".
   No author, no tool count, no content hint. Picking the right one required reading the database.
3. Marking ONE draft ready flipped the aggregate badge to `ready ×3`. Two of those three are not ready.
   The stale-count class, on the surface.
4. The payload editor is a raw JSON textarea. `cmd+a` does not select its contents; typed text was spliced
   into the middle of the existing JSON and the editor accepted the malformed result silently.
5. `Publish` runs a pre-publish save that CLEARS the ready mark, so `Mark ready` is decorative on that path
   while the two buttons imply a sequence.
6. `Staged drafts (172)` · `Ready to publish (0)`. One hundred and seventy-two authored drafts, none queued.

## 6 · THE ARCHITECT'S OWN DEFECTS

**`PLATINUM-BREACH-S138-1`** — the Architect proposed that the owner hand-write a row into
`backend_entity_layers`. The owner refused and named the law: configuration is either discovered by the
system or done through an admin surface; a hand-edited DB row means the product is garbage. He is right and
PLATINUM says it in those terms. The redesign is §4's missing surface, queue-jumping.

**`A-REC-S138-I-TURNED-A-LAW-INTO-A-DELAY-1`** — the Architect asked, twice, for named owner approvals the
owner had already given, on a class he had already ruled on. S102-YASA-3 requires a named approval for a
replacement; it does not license re-asking as a way to hand the decision back. S112-YASA-1 forbids exactly
that. His words: *"sen beni benim ile mi SINAMAKTASIN?"*

**`A-REC-S138-I-NAMED-A-TYPO-AS-A-ROOT-CAUSE-1`** — the Architect told the owner his question failed because
he wrote `siralama` where the system holds `Sirlama`, one transposed letter. Measurement later showed there
is no workstation layer at all: the correctly spelled name would not have resolved either. A plausible cause
published before the registry was read.

**`A-REC-S138-I-RANKED-THE-FALLBACK-AS-THE-PRIMARY-PATH-1`** — the Architect diagnosed exact-token keyword
matching as the root of the Turkish failure and proposed fixing the matcher. The trace then showed
`path: "semantic"` on five of six turns: the cheap LLM router was ON, fast and correct, and the matcher runs
only on the floor. The diagnosis was not wrong; it was mis-ranked, and the owner said so first — *"biz
Turkcedeki problemi cozmek icin ucuz LLM kullaniyorduk"*. His memory was the instrument that corrected it,
which is S112-YASA-1 and §12.14 working exactly as written.

## 7 · WHAT THE LANES DID, IN THE SAME HOURS

AG-5 refused nothing it should have refused, landed `#546`'s report, ran the sync card, fast-forwarded the
clone and pushed eleven days of archive. The scout REDDED a landing card of the Architect's on one sentence
— ORDER 4 said "do not set any merge key" and `land.ts` requires the foreman's own-address prefix, so a lane
obeying that card literally would have got `AUTHOR-UNKNOWN` and stopped — and it measured the whole forge
green in the same breath. AG-4 met `NO-ADDRESS-FREE`, stopped by law rather than taking an address, then
produced a liveness report that discarded `pgrep` because its own-pid control failed, said plainly that the
boot-time leg did NOT carry the weight it carried for AG-5, and recorded a forbidden pipe instead of hiding
it.

Read that beside §6 before assuming the Architect is the careful one.

END · CWF-S138-FINDINGS-v1
