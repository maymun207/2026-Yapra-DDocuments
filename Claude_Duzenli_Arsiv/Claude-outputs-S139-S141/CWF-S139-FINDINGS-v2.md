# CWF-S139-FINDINGS-v2

Supersedes v1 (cut 06:12Z mid-session). PART 1 below is v1's body carried unchanged — append-only; the only
edit is this title. PART 2 follows at the end.

---

# PART 1 · v1 body (cut 2026-09-15T06:12Z)

Cut 2026-09-15T06:12Z (09:12 TSİ), MID-SESSION, while AG-4's closing ritual is still unfinished. A v2 will
follow at close; this v1 exists so the session's findings survive an abrupt end (the v127 lesson). Every
line is MEASURED with its instant or marked RELAYED with its row.

## WHAT LANDED ON MASTER (measured, shared clone refs + merge commits)

- **PR 549** ASK-AFTER-DISCOVERY → master `96fe357a6cdab599b04bbf88c2d9f8bc69bd88a8` at 04:04:16Z, landed
  by the fresh AG-5 via `npm run land -- 549`, 3 minutes after the sealed card reached its box. Vercel
  production `dpl_GivCWApRe9we4TzUrAFQYym3HZyF` READY at 04:04Z. The third lock on the owner's production
  bug is LIVE.
- **PR 550** FLOOR-ANNOUNCES → master `9e830fe8ff074ee195a818b95173609245e89492` at 04:56:23Z, same
  route, 3 minutes after its card. Vercel production `dpl_DwtZRHYuPFsFCcSwCaaa1qT8juEU` READY (AG-5 slip
  05:12Z).
- Master had not moved for 24 hours before this session. Two landings in 52 minutes once a live foreman
  and a sealed card existed.

## FINDINGS, BY NAME

**F-S139-THE-NUL-NOTICE-LANDED-FIVE-MINUTES-AFTER-THE-NEXT-CARD-WAS-CONSUMED-1** — measured 02:45Z.
NOTICE-RULE24-NUL-BYTE-YOURS-TO-FIX was posted at 21:41:20Z; AG-4 had consumed CARD-FLOOR-ANNOUNCES at
21:36:54Z and did not poll again until its slip at 02:43Z. Five hours of "unconsumed" was not neglect; the
bus has no preemption and a producer does not poll while it works. The byte was fixed 5 minutes after the
lane read the notice (05:49 TSİ), by count, with perl, no editor.

**F-S139-THE-ADVERSARY-GATE-IS-A-DATABASE-TRIGGER-AND-IT-REFUSED-THE-ARCHITECT-1** — measured 03:16Z.
`relay_adversary_gate()` raised AG002 on an unsealed landing card addressed to AG-5. The seal binds the
SCOUT's digest (first line of the verdict row, `sha256=<canonical body>`), never the Architect's. Refusal is
itself a measurable row: a NOT-GREEN first line is refused by the gate as AG004. This is the mechanical cure
§12.1 asked for, and it is already on master (migration 20260911180000).

**F-S139-SCOUT-POLLER-SILENT-AFTER-FIRST-TICK-1** — owner-witnessed at ~03:40Z (screenshot: idle prompt,
no spinner, "continue" tab). The first scout window of the session replied once (02:57Z), read two review
cards, and never posted a verdict or a poll line for 40 minutes. LOOP-DEAD class (seed §12.2). The rebooted
window created its poll task (cron 01c3cd41, 2 min, no budget) and listed it back — the boot rule's exact
shape — and has ticked since.

**F-S139-EDITOR-EVALUATES-ESCAPES-REPRODUCED-BY-THE-SCOUT-AND-THE-BUS-REFUSED-IT-1** — scout's own report,
02:57Z. Typing the six-character escape into a body file produced a raw 0x00; the bus INSERT was refused by
Postgres (22P05). §12.3 reproduced in a third lane; and the bus is a NUL gate nobody had named.

**F-S139-HEARTBEAT-PROVES-THE-REF-EXISTS-NOT-THAT-THE-CALLER-HOLDS-IT-1** — scout, 03:58Z, self-reported.
`mail-wait AG-4 --once` from the scout window wrote AG-4's heartbeat, because `laneNonce()` reads the nonce
from `git ls-remote`, which any forge reader can obtain. Needs a repository card: refuse the tick for an
address the window did not create, or bind the verb to something a reader cannot obtain.

**F-S139-THE-S138-FOREMAN-TAKEOVER-WAS-HALF-WRITTEN-1** — AG-5 boot, 03:31Z. The S138 foreman moved the git
ref (nonce aafb7b74…) without reclaiming the state row (still 095edb4e… from S137). `factory_reclaim`
refused the ref's nonce (FW002) and accepted the row's; the fresh foreman named the sha the row actually
held. The third claim shape exists and works; the S138 window did not use it.

**F-S139-THREE-SIBLING-PRS-CONFLICT-ON-THREE-LEDGER-FILES-1** — scout `git merge-tree`, 04:38Z. PR
550/551/552 each merge clean onto master alone; each pair conflicts in `.agents/CHANGELOG.md`,
`docs/ground/facts.json`, `public/architecture/manifest.json`. Consequence: sequential landings need an
author re-sync (merge + reseal + hand-resolved hunks) between each. AG-4 synced all three once (04:26–04:33Z),
resolving exactly those files; 550 landed; 551 and 552 now conflict again with the new master.

**F-S139-A-CARD-CAN-BE-GREEN-AND-STILL-CARRY-A-WORDING-TRAP-1** — scout, 04:20Z, on the AG-4 closing v2:
"not one byte edited by hand" and "resolve conflicts in files you authored" collide for a lane reading cold;
manifest.json is the seal and admits only `npm run reseal`. Carried to the lane as a NOTICE beside the
sealed card, since sealed bytes cannot change.

**F-S139-THE-BRIDGE-VM-CANNOT-RUN-THE-REPOSITORY-CHECKER-1** — measured 02:5xZ. `node_modules` in the
shared clone is darwin-arm64; the bridge VM is linux-arm64, so `tsx` fails. The Architect ran the
repository's own `cardPreflight` in its cloud container from staged sources (self-test red=proven
green=proven) — that replica agreed with the scout's window on every card this session.

**F-S139-THE-ARCHIVE-IS-BEHIND-THE-PROJECT-BOX-1** — measured 02:42Z. The documents repository holds
bootstrap up to v139 and register up to v127; the project box holds v140 and v128. The archive is also 2
commits ahead of origin/main with `_s138_stage/` untracked. Lane work; the Architect never pushes.

**F-S139-THE-WHOLE-FACTORY-WENT-SILENT-FOR-EIGHT-MINUTES-WITH-THE-BRIDGE-1** — 04:42Z–04:50Z: scout, AG-5
and the device bridge all stopped within one minute and resumed together. Common cause UNMEASURED; F-S138's
one-laptop finding stands.

## OWNER CONTRIBUTIONS, BY NAME (S112-YASA-1)

- OWNER-COMMAND-S139-ROLLING-REBOOT-1: reboot every long-lived window; the Architect designs the per-lane
  closing ritual (cards WINDOW-CLOSING-AG-4/AG-5).
- OWNER-RULING-S139-TIMERS-3-MINUTES-1: no scheduled check-in over three minutes.
- OWNER-RULING-S139-RIGHT-PANE-CHECKLIST-1: the done/to-do list lives in the task panel so the owner can
  follow it item by item.
- The owner's frustration at 06:14 TSİ ("24 saattir master'a 1 satır koyamadık") was answered with the
  measured chain and a landing card cut immediately — §12.8 applied; master moved 50 minutes later.

## ARCHITECT ERRORS, BY NAME

- A-REC-S139-I-GATED-CLOSING-CARDS-ON-THE-SCOUT-BEFORE-CUTTING-THE-LANDING-CARD-1: the landing card should
  have been the first artefact of the session; the closing cards added latency in front of it.
- A-REC-S139-I-CUT-A-CLOSING-CARD-FOR-A-DEAD-WINDOW-1: the AG-5 closing card was addressed to a window
  with a 19-hour-old heartbeat; a fresh foreman would have read "close yourself". Withdrawn by notice.
- A-REC-S139-MY-FENCE-WENT-STALE-IN-THIRTY-MINUTES-1: AG-4 finished three cards while the closing v1 was in
  review; the scout caught the stale fence (NOT-GREEN).

## OPEN AT CUT (v1; resolved items are marked in PART 2)

- AG-4 closing v2 consumed 04:23Z; syncs done 04:33Z; hygiene done (worktrees gone); NO closing row, ref
  present, row WORKING, heartbeat 04:34Z. Silent 1h35m at cut. Hypothesis (not measured): guard-bash GB-4
  refuses the `git push --force-with-lease` release form, or a harness prompt awaits the owner.
  → RESOLVED IN PART 2: the ritual's order was the defect (F-S139-THE-SHUTDOWN-RITUAL-ORDER-…).
- PR 551 and PR 552 green at pre-resync heads; both need author re-sync after PR 550; 552 introduces
  ENTITY_LAYER_MANAGE and needs OWNER-APPROVAL-S139-ENTITY-LAYER-SURFACE-MERGE-1 by name.
  → RESOLVED IN PART 2: both landed.
- The owner's real-world witness of the Granit personnel query on the new production build: not yet given.
  → RESOLVED IN PART 2: OWNER-WITNESS-S139-WORKSTATION-LAYER-LIVE-1.

END · PART 1 (v1 body)

---

# PART 2 · AFTERNOON, cut 2026-09-15T15:2xZ (18:2x TSİ) at close. v1 above is carried BYTE-FOR-BYTE
(append-only). Every line is MEASURED with its instant, or RELAYED with the row it came from.

## WHAT LANDED ON MASTER AFTER v1 (measured: merge commits, Vercel deployment records, AG-5 slips)

- **PR 551** FLOOR-WIDENS → master `909851baec5f48fcc582ad5a636c2a7206527557` at 08:17:20Z (land script).
- **PR 552** ENTITY-LAYER-SURFACE → master `8f05ca23af69582310df8bdd9df8d04ba134c2d9` at 10:57:49Z, under
  OWNER-APPROVAL-S139-ENTITY-LAYER-SURFACE-MERGE-1 ("1- 552 onay"); prod READY 11:03:21Z. The owner then
  DECLARED the workstation layer through the new door (backend_entity_layers row `workstation ·
  getWorkingPlaces · parent factory (factoryId)`, audit `eda66a99`, 11:10:35Z) and the Granit / Sırlama
  3-4-5 personnel query ANSWERED on both screens (3 personnel; chain getFactoryList → resolve_time_range →
  getWorkingPlaces → getEmployeesByWorkstationsAndShift). OWNER-WITNESS-S139-WORKSTATION-LAYER-LIVE-1.
- **PR 560** CLARIFY-STAGE-SPAN → master `bb1a157507ec0d30b21afb4fef6623a2dc0d130a` at 12:40:50Z; prod
  `dpl_J1LS3eNz1A9JWnU2fYzUWkxqyqYX` READY 12:47:10Z. The clarify stage (`cwf.stage.03.clarify`) is in
  turn_trace_digest for the first time.
- **PR 559** TABLE-CELLS-FROM-TOOL-BYTES → master `fb7f971ca626536864308cf9e3f0dfe2873b7877` at 13:23:25Z;
  prod `dpl_CMzFznMja6KTosw5xUkDVcjkTefV` READY 13:28:05Z. Answer-table cells are a projection of the tool
  bytes; *Time renders Europe/Istanbul HH:mm.
- **PR 561** LANE-BOOT-ONE-COMMAND → master `ec09181359fecd327b08beeae1098b59713e1f1e` at 14:08:21Z; prod
  `dpl_Hwyinpi9GoSXgvdLgMDHTBdFQLqr` READY 14:13:05Z (no served file changed). `npm run lane:boot -- <AG-n>`
  and `npm run lane:close -- <AG-n>` exist on master; AG-5 printed the usage line from the landed master.
- **PR 564** ASK-NO-LAYER-NO-PROSE → master `abd00e2c4c9c64dd3af9aa8b6b6046510d5dd2bb` at 14:59:36Z; prod
  `dpl_7dXUfi72GoNDPuxUjwmCvCBr2Q6f` READY 15:04:15Z.
- Nine landings in one session (549, 550, 551, 552, 560, 559, 561, 564 plus the foreman's own report PRs).
  Master had not moved for 24 hours before it.

## FINDINGS, BY NAME (afternoon)

**F-S139-THE-ANSWER-TABLE-CARRIES-TIMES-THE-TOOL-NEVER-RETURNED-1** — filed in its own document at ~11:4xZ.
The same tool bytes rendered as raw epochs on one screen and as invented ISO instants on the owner's. Cure:
PR 559 (cells from bytes). Owner's witness on the new build: NOT YET GIVEN at close.

**F-S139-THE-CLARIFY-STAGE-HAD-NO-SPAN-1** — measured 11:19Z on the digest of the two morning turns: keys
01, 02, 07, 09, 10, 12, 14 and nothing for clarify; `computeTurnClarification` was called at runTurn.ts:236
outside any stage span; `withStageSpan` existed and wrapped every OTHER stage (§12.6 caller-absent, fourth
instance today). Cure: PR 560. Consequence: the two clarify sub-defects measured on 2026-09-14 became
re-measurable, and the third (below) was READ in bytes within 50 minutes of the landing.

**F-S139-A-PARAGRAPH-WAS-OFFERED-AS-A-DID-YOU-MEAN-AND-NO-LAYER-MEANS-NO-ASK-1** — measured 13:36Z–13:44Z on
three production turns (13:29:53Z, 13:30:50Z, 13:33:11Z; turn ids in the card). The owner asked for
`getOrderScrapWithReasons` on an order number; frame object ORDER has NO descriptor in backend_entity_layers
(factory/line/equipment/workstation only), so the ref was judged against every layer, found nowhere, and an
ask was raised whose single candidate was the tool's own DESCRIPTION PARAGRAPH (askSuggestions.ts:69 offered
the whole description as one surface; proposeCandidates' containment rule gave it distance 0 because the
paragraph contained the number as its own example). The owner answered "evet" and then pasted the paragraph
back; three identical asks. Cure: PR 564 — `no-layer-for-object` abstain reason (per ref, literal
pass-through, span verdict `literal`), word-level tool_doc surfaces labelled by tool, containment capped at
40 characters (fixture longest 21, live longest 37). Architect ruling on AG-4's narrowing: a backend with
ZERO descriptors keeps today's ladder — undeclared is not unlayered. STANDS.

**F-S139-THE-LAND-SCRIPT-LANDS-IN-TWO-RUNS-WHEN-THE-BRANCH-IS-BEHIND-1** — measured by AG-5's slips
(13:45:03Z, 14:28:40Z, 15:16:11Z) and the scout's ref reads. `scripts/land.ts` step 2 measures an update
OWED, merges master into the branch THROUGH THE FORGE (`gh pr update-branch`: author = the owner's account,
committer = GitHub), refuses CI-ZERO-RUNS at the moved head, and lands on run 2 once CI at the moved head
is green. Three landings today took this shape (559, 561, 564). Its tree equals the clean merge-tree
rehearsal every time (scout, tree identity). Consequence for cards: a landing card's "DECAYS if the head
moves" clause must EXEMPT the script's own step 2, or every behind-master branch voids its own card; from
CARD-LAND-ASK-NO-LAYER-NO-PROSE-S139-1-v1 on, the fence says so.

**F-S139-THE-VIZ-TABLE-1-EVIDENCE-IS-LAW-AND-THE-ARCHITECT-ORDERED-AGAINST-IT-1** — measured 12:12:48Z (scout
read2 on 559's first head): rule26 (Playwright, e2e/table-time.spec.ts :43 and :70) expects minute
precision; the Architect's ORDER 3 had asked for seconds. NOTICE-CI-RED-AT-559-SECONDS-WERE-THE-ARCHITECTS-
ERROR ruled the evidence the law; AG-4 repaired its own file (712a82cf, 12:33:32Z). Rule26 runs only on the
forge and is in no author's local gate list — a local green does not cover it.

**F-S139-THE-SHUTDOWN-RITUAL-ORDER-CONTRADICTS-THE-VERB-FENCE-1** — measured on the AG-4 close of 04:34Z
(ref released, then `writeLane` refused CLOSED because the caller no longer held the ref). Every ORDERLY
close left a WORKING row; every successor paid the takeover price by construction. Cure: PR 561's
`lane:close` writes CLOSED first, then releases the ref with the lease pinned to its own nonce.

**F-S139-THE-BRIDGE-VM-STILL-HAS-NO-GITHUB-CREDENTIAL-1** — re-measured 12:53:30Z: `git fetch` in the shared
clone fails ("could not read Username"). The Architect read refs the LANES had fetched; every ref instant in
today's cards is the clone's FETCH_HEAD instant, not a live ls-remote. F-S133 stands.

## OWNER CONTRIBUTIONS, BY NAME (S112-YASA-1, afternoon)

- OWNER-RULING-S139-CLAIM-IN-FIVE-SECONDS-1 — booting a lane must claim in ≤5 s, no dialog. Cure shipped
  (PR 561: PATH A CLAIMED in 104 ms on a fixture).
- "iki yol" — the two-path design of lane:boot (orderly successor vs crashed predecessor with
  `--confirm-takeover`), with LANE-DEATH-CERTIFICATE-1 order C unchanged. The Architect's v1 had reinstated
  a heartbeat-age rule; the scout's RED and the owner's two words fixed the shape.
- "doldur" — the Architect fills the Entity Layers form; the owner witnesses.
- "kendi ekranımdan da sordum, cevabı ekledim" — the owner's screen read gave the second half of the
  time-fabrication witness (invented ISO instants vs raw epochs).
- "ban uzun cümle kurma… ne istiyorsun net söyle" — the report form for a busy owner: what moved, what is
  needed, nothing else.
- Three live production turns at 13:29–13:33Z on order 1600167 — the witness that PR 564 was cut on.

## ARCHITECT ERRORS, BY NAME (afternoon)

- A-REC-S139-I-BURIED-THE-APPROVAL-ASK-IN-STATUS-REPORTS-FOR-TWO-HOURS-1: the 552 authority ask sat inside
  status prose until the owner asked why nothing finished. Rule adopted: a permission-surface approval is
  the FIRST LINE of the report, alone, until answered.
- A-REC-S139-I-ORDERED-SECONDS-AGAINST-THE-PINNED-EVIDENCE-1: ORDER 3 of the table-cells card asked for
  seconds; VIZ-TABLE-1 pins HH:mm; one CI red and one repair commit were the cost.
- A-REC-S139-I-REINSTATED-A-DEAD-BY-HEARTBEAT-RULE-1: lane-boot v1 contradicted LANE-DEATH-CERTIFICATE-1
  order C; the scout refused it.
- A-REC-S139-I-ATTRIBUTED-A-HEAD-MOVE-TO-THE-OWNERS-HAND-WITHOUT-MEASURING-1: the 13:04:24Z sync of PR 559
  (author maymun207, committer GitHub) was called "the owner pressed Update-branch" in a notice and in the
  v4 land card. It was `scripts/land.ts` step 2 run by AG-5 (AG-5's CORRECTION slip, 13:47:56Z). The two
  shapes are byte-identical in the commit object; the Architect chose the unmeasured one and wrote it as a
  fact under S112-YASA-1. Corrected on the bus (NOTICE-LAND-SCRIPT-HEAD-MOVE-IS-NOT-DECAY, 13:52:15Z).
- A-REC-S139-I-CUT-THREE-LANDING-CARDS-FOR-ONE-PR-1: 559's v2 decayed to a master move, v3 to the script's
  own sync; v4 landed by content. The fence form was the defect, not the PR (see the two-run finding).

## OPEN AT CLOSE

- Owner's real-world witness of PR 564 in production (order 1600167 must ANSWER, not ask): NOT YET GIVEN.
- Owner's real-world witness of PR 559's table times on his own screen: NOT YET GIVEN.
- F-S139-HEARTBEAT-PROVES-THE-REF-EXISTS-NOT-THAT-THE-CALLER-HOLDS-IT-1 (v1): no card yet.
- F-S139-THE-ARCHIVE-IS-BEHIND-THE-PROJECT-BOX-1 (v1): lane work, not started.
- The three clarify neighbours from S134 (A23-COLLAPSE, S117-PARENT-PROMOTION, PEER-SCOPE): untouched today;
  PR 564 repairs a fourth seam beside them, none replaced.
- The scout's request for a repository card on the heartbeat-forgery seam (v1) stands.

## ADDENDUM AT 19:35Z — THE OWNER'S WITNESS ON PR 564, AND WHAT IT SHOWED NEXT

**OWNER-WITNESS-S139-ASK-SEAM-LIVE-1** — the owner asked `getOrderScrapWithReasons aracı ile getir 1600167` in
production at 19:26:47Z (turn be86ec518c0883243f96ae1af5b3068c); the Architect repeated it in its own browser at
19:30Z (turn 3f52a621b519c18e4dc96d8f0b7731e7) and read the screen. NO ASK: the clarify span shows the ref
verdict `literal`, reason `no-layer-for-object`, ask `no-ask`; the turn answered in one pass with a table whose
header reads "hücreler araç çıktısından · cells from tool bytes" (PR 559 visible on screen). Both seams are LIVE.

**F-S139-A-TOOL-NAMED-BY-THE-USER-WAS-NOT-OFFERED-1** — measured 19:32Z on both turns. The answer opens with
"`getOrderScrapWithReasons` aracı bulunamadı" and falls back to `getOrderDetails`. The tool is `active` in
`backend_tools` (armes, last seen 19:31:19Z) and sits in the PUBLISHED `quality` v5 category; the semantic router
matched `production` only (`matchedCategories:["production"]`, basis frame QUERY_METRIC/ORDER, metricsSurface
scrap), so the 38-tool offered set did not contain it, and the model's own `search_tools` call did not surface it
either. A tool the user names VERBATIM must be offered deterministically — a name match on the catalog is code,
not routing (§8: deterministic vs learned). Beside it, the answer says "Varsayılan olarak Kale Seramik KB7
fabrikası için" — the owner named no factory; a default the tool did not require was invented in prose. Two
seams, one card, S140's first.

END · CWF-S139-FINDINGS-v2
