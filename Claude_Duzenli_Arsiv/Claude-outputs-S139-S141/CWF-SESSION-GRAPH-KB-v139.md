# CWF-SESSION-GRAPH-KB-v139

Edges this factory learned in S139. Each is tagged with the session that measured it. An edge here is a
claim about how this system actually behaves, not a rule about how it should — rules live in the
instructions box and the law corpus. v138 stands in full; nothing here restates it.

---

## THE LAND SCRIPT, MEASURED ON EIGHT LANDINGS

**[S139] `npm run land -- <pr>` lands a behind-master branch in TWO RUNS.** Step 2 measures an update OWED,
merges master into the branch THROUGH THE FORGE (`gh pr update-branch`; the commit's author is the owner's
account, its committer is GitHub — byte-identical to the web UI's button), refuses CI-ZERO-RUNS at the moved
head, and run 2 lands once CI at the moved head is green. Measured on PR 559, 561, 564. The moved head's
tree equalled the clean `merge-tree` rehearsal every time (scout, tree identity).

**[S139] A landing card whose DECAYS clause says "if the branch head moves" voids ITSELF on a behind-master
branch**, because the script moves the head. Three cuts were lost to this on one PR. The fence form from
CARD-LAND-ASK-NO-LAYER-NO-PROSE-S139-1-v1 on: the script's own step-2 sync is not a decay; master may be at
the fenced anchor OR at the next expected merge above it when the file sets are measured disjoint.

**[S139] Time from sealed card in the foreman's box to master: 3 to 30 minutes** when CI is already green
(549: 3 min; 552: ~10; 560: ~8), and CI-time plus ~2 minutes when the script must sync first (559: 30 min,
561: 20, 564: 23). The foreman's slip arrives 15–25 minutes after the landing; the merge commit and the
Vercel production record are the earlier lenses.

**[S139] Two sibling PRs whose file sets are DISJOINT need no re-sync between landings** (560 then 559, 559
then 561, 561 then 564). The three-ledger-file conflict of v138 arises only when both touch
`.agents/CHANGELOG.md`, `docs/ground/facts.json` or `public/architecture/manifest.json` — a reseal on both
sides. Measure with `comm -12` over two `git diff --name-only` lists, both inputs non-empty.

**[S139] `rule26` (Playwright, `e2e/table-time.spec.ts`) runs ONLY on the forge and is in no author's local
gate list.** A local `npm run build` green does not cover it. VIZ-TABLE-1's pinned evidence is
`YYYY-MM-DD HH:mm`; a card that changes a rendered time must name that pin or it orders a red.

---

## THE CLARIFY / ASK SEAM, NOW VISIBLE

**[S139] Until PR 560, `computeTurnClarification` ran OUTSIDE any stage span** (runTurn.ts:236 bare) while
`withStageSpan` wrapped every other stage — the fourth caller-absent instance of the day. The digest keyed
01, 02, 07, 09, 10, 12, 14 and nothing for clarify. Since 12:47Z, `cwf.stage.03.clarify` carries INPUT
(entityRefs, frameObject, backend, layers, scope) and OUTPUT (per-ref verdict, discovery attempts with
`beforeAsk`, the ask decision with each candidate's `labelSource` and distance, outcome).

**[S139] `STAGE_NUMBER_BY_SPAN` (observability/config.ts) and the Stages tab registry (stagesRegistry.ts)
are BOUND by a test** (stagesRegistry.test.ts:139): every span key must appear exactly once in the
same-numbered registry card. Adding a stage span without its registry entry is red there. Clarify is card 03.

**[S139] The frame object is the query's SUBJECT for layered objects and the REF'S KIND for unlayered ones,
and the code had no way to tell.** `stageClarify.ts:436` filters descriptors by `frame_object`; when none
match, `layers=ALL[...]` judges the ref against every layer. An ORDER number on armes (descriptors:
factory/FACTORY, line/LINE, equipment/EQUIPMENT, workstation/NULL) was judged against factories and lines,
found nowhere, and asked about. PR 564: a ref whose object is an entity kind (`ENTITY_KIND_OBJECTS`: LINE,
ZONE, FACTORY, EQUIPMENT, ORDER, RECIPE, MATERIAL, TRANSFER, VEHICLE, EMPLOYEE) with NO enabled descriptor
is a LITERAL (`no-layer-for-object`, per ref); a backend with ZERO descriptors keeps the old ladder
(undeclared ≠ unlayered — ruled).

**[S139] `askSuggestions.ts` offered a tool's whole DESCRIPTION as one candidate surface, and
`proposeCandidates`' containment rule (`hay.includes(needle)` → distance 0) made any paragraph that contains
the token the BEST candidate.** The owner was shown an English paragraph as a "did you mean", three times.
PR 564: descriptions become word and bigram surfaces labelled by tool; containment applies only to a hay of
at most 40 characters (fixture longest 21, live longest 37).

**[S139] The workstation layer's descriptor has `frame_object` NULL** (declared through the Entity Layers
door at 11:10:35Z). It is therefore never the `matching` set and only ever reached through `layers=ALL`.
Not a defect today; an edge to know before the next descriptor is declared.

---

## THE LANES' BOOT AND CLOSE, MEASURED

**[S139] The shutdown ritual in `producer.md` :443-478 ordered RELEASE THE REF then WRITE CLOSED, and
`writeLane` refuses a row whose ref the caller no longer holds.** Every orderly close left a WORKING row;
every orderly successor paid the takeover path. `lane:close` (PR 561) writes CLOSED first.

**[S139] `factory_claim` re-claims over CLOSED; `factory_reclaim` admits a CLOSED row with a matching nonce
and writes its own `factory_events` row; `DWELL_FLOOR_MS = 120000` is a positive re-read floor, never a
timer; `planTakeover`'s trigger is a PERSON.** `lane:boot` PATH A (ref ABSENT + row CLOSED): plain push +
`factory_claim`, CLAIMED in 104 ms on a fixture. PATH B (held ref or non-CLOSED row): candidate notice and
STOP; `--confirm-takeover <lane>:<measured sha>` runs `planTakeover` with the dwell unchanged; a bare
`--force` in argv is refused as FAULT. No heartbeat-age rule exists anywhere in it.

**[S139] `.claude/settings.json` already allows `Bash(npm run:*)`**, so a boot through `npm run lane:boot`
needs no harness click; `guard-bash.py` was NOT touched by PR 561 (measured by path).

**[S139] A producer lane's heartbeat is FRESH while it idles and SILENT while it works** (AG-4 beat every
2 min between cards and went silent for 27 minutes while building the ask-seam fix; AG-5 last beat 13:01Z
and landed three PRs after it). Liveness from output only — reconfirmed for the third session running.

---

## THE ARCHITECT'S LENSES, MEASURED

**[S139] The bridge VM's shared clone cannot `git fetch`** ("could not read Username"); its `origin/*` refs
are whatever a LANE last fetched (FETCH_HEAD mtime tells when). Every ref instant in an Architect card is
that instant, not a forge read. The scout is the only lens with a credential.

**[S139] The Vercel deployment list is the fastest landing lens the Architect has**: a production
deployment appears within ~5 s of the merge push, `meta.githubCommitSha` is master's new head and
`meta.githubCommitMessage` carries the land script's verdict block. A branch push shows as a CANCELED
non-production deployment ("Canceled by Ignored Build Step") — presence, not build, is the signal.

**[S139] `public.messages` + `turn_trace_digest stages->'03'` reproduce an owner's live production turn
within a minute of it**, which is how the ask-seam card was cut fifty minutes after the span landed.

**[S139] The cloud replica of `cardPreflight` agreed with the scout's own invocation on every card today**
(CP-1..CP-11). Its REDs before insertion: 7-hex order numbers in prose (CP-8, treated as a short sha —
write them in an unanchored `raw-tokens` fence), "4 tests"/"3 tests" as counted nouns in prose (R-TRIP-
COUNT), `AG4` spelling (CP-6). Orders and notices are exempt kinds and need no preflight.

---

## WHAT S139 CONFIRMS ABOUT EARLIER EDGES

**[S138]**'s three-gate tool-offer chain closed end to end: the fourth thing (no workstation layer) was a
DOOR problem, and once the door existed (PR 552) the owner declared the layer in 13 minutes and the query
answered.

**[S134]**'s caller-absent class produced four instances in one session (withStageSpan at clarify;
deriveTableData's table-from-tool path; the factoryState verbs; the relay verbs), all cured by WIRING cards.

**[S137]**'s fabricated-red A-REC was NOT repeated: two silent hours of the foreman were reported as
"no output yet" and it had landed. **[S134]**'s "the owner's memory is an instrument" held twice more
("we already solved this" on the boot design; the own-screen witness that completed the time finding).

END · CWF-SESSION-GRAPH-KB-v139
