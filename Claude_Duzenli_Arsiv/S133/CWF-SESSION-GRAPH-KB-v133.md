# CWF SESSION GRAPH KB — v133 (S133 delta, written at S133 close)
Append to v132. One line per learned edge; primary sources in repo/bus/close doc. Predecessor `claude/CWF-SESSION-GRAPH-KB-v132.md` READ IN FULL before this was written. Every edge below is tagged [S133] and every one is MEASURED in this window unless it says otherwise.

## The loop that produced nothing, and how it was invisible from inside

- **[S133] A well-formed review loop with no EXIT CONDITION will run forever, and rigour applied to the wrong object is indistinguishable from progress.** Twelve card versions and twelve adversary reviews ran on WEB-VALVE-1 while a complete, green implementation sat unmerged on the branch. Every amendment was about scope ADDED to the card AFTER the build. The mechanism gates a PRODUCER on a verdict; it has no gate on the question *does the thing already exist*. `A-REC-S133-6`.
- **[S133] `UNMOVED` is a MEASUREMENT, not a checkbox.** It says the producer produced nothing since the last reading. It appeared in at least six scout verdicts and was filed as a table field six times. **A repeated unchanged measurement is a STOP.**
- **[S133] A stream of individually true reports can add up to a false picture.** Every twenty-minute report led with card versions and ended "SENİN AKSİYON MADDELERİN: Yok". Each sentence was true; the sum told the owner the factory was working. **The owner found the failure, not the Architect** — the cure is that every report LEADS with what moved in the product, or with "ÜRÜNDE HİÇBİR ŞEY KIPIRDAMADI".
- **[S133] The owner's plain questions outperformed the Architect's instruments.** "Is it implemented, did you test it, is it in the final load, why are we spending days" is what caused the code to be read for the first time in twenty-two hours. A question that refuses the vocabulary of the process is a lens the process cannot supply itself.

## Silence, and why a bus is not a lane

- **[S133] A MISSING CALLER and a SLEEPING LANE are byte-identical from the bus.** `relay_post_from_lane` is created in the migration, enumerated in `verifyGrants.ts`, exercised in `factoryWriteChannel.test.ts` — and called by NOTHING; `callVerb` in `factoryState.mjs` is module-private. A producer CANNOT post a report row. Both AG-4 and AG-5 found it independently, two lenses each, and neither hand-rolled a write. `F-S133-PRODUCER-HAS-NO-BUS-WRITE-PATH-1`.
- **[S133] The consequence is an Architect inference, and it was wrong for hours:** bus silence was read as lane idleness and more card versions were cut into it. The read-side plane already covers the gap — `scripts/busDelivery.ts` classifies a card ACTED when a declared deliverable exists on origin, "work is proof of receipt, whatever the stamp says" — but nothing told the Architect to look there. **Lane reports arrive as BRANCHES.**
- **[S133] An instruction whose instrument does not exist is not an instruction.** `producer.md` orders `SILENT-UNTIL <iso> :: <what>` into `factory_state.note`; `writeLane`'s `opts.note` is honoured only on the legacy direct-table path, and `factory_write_lane(lane, state, nonce)` has no note parameter, so a lane that OBEYS the rule is UNDECLARED-SILENT by mechanism. Sibling of the edge above and of `A-REC-S133-4`.
- **[S133] `consumed_at` stayed null on cards that were fully executed.** Do not read it as a delivery signal.

## "Green" is not a property of a branch

- **[S133] A subset reported as the whole is the exact shape of this house's recurring measurement error, and it now has a mechanical form.** `npm run build` = `tsc -b && typecheck:api && gen:arch-facts && check:ground && vite build && check:doc-drift`. `npm test` = `vitest run`. The reported green covered NONE of the five extra gates — including `tsc -b`, the ROOT project, which is the only place every line under `src/` is type-checked. `F-S133-A-SUBSET-REPORTED-AS-THE-WHOLE-1`, `A-REC-S133-7`.
- **[S133] A verdict at the PARENT is not a verdict at the CHILD.** Three green runs at the reseal commit, a report commit on top minutes later; a landing card must read the runs at the head being LANDED.
- **[S133] `gh api actions/runs?head_sha=<short sha>` answers `total_count: 0`, byte-identical to "CI never ran".** A short sha there is a FALSE NEGATIVE, not a style choice. S101-L1 with full forty hex, always.
- **[S133] The correct report of a lane's local pass is "the suite and the type-check, locally, at the unsynced head" — never "green".**

## Documents that a change makes false

- **[S133] A COUNT is the most brittle claim a document can carry.** The web valve added the FIRST conditional local tool mount to a system whose diagrams hard-coded "the three meta-tools"; two tabs were outright FALSE and four untrue by omission. Not one of six drifted tabs was seal-only.
- **[S133] Distinguish WRONG from INCOMPLETE when reporting doc drift.** A document that says three when the answer is four is wrong; one that omits a real egress edge or a real governed key is incomplete about a subject it claims to enumerate. Both owe an edit; a reader judging the edits needs to know which is which.
- **[S133] A tab's narrative does not always live in a diagram file.** The Stage Cards tab's text lives in `src/components/admin/stagesRegistry.ts`, so a fence that says "no product code touched" fences out the very file the tab needs — the FENCE was wrong, not the lane. Corrected by a new card version under S37-1, never by an edit.
- **[S133] A seal proven true on a branch is not yet proven true where it lands** — `check:doc-drift` is read again at the new master.

## Hand-written rows, and cards small enough to execute

- **[S133] THE DIGEST AS A WHERE PRECONDITION.** `insert … select … where md5(b) = '<expected>' and encode(sha256(convert_to(b,'UTF8')),'hex') = '<expected>'` makes a mistyped hand-written row write ZERO rows into an append-only table instead of polluting it. **Fourteen inserts, fourteen first-try matches.** This closes the A-REC-S133-3 recurrence class by construction rather than by care.
- **[S133] Per-line length-profile reconciliation finds a transcription divergence in two queries** — `regexp_split_to_table(body, E'\n') with ordinality` selecting `length(l)`, compared against the local file's profile; the one differing line is the one to fetch. Found an eleven-character divergence on line 3 of a fifty-line row.
- **[S133] An archive file whose md5 equals the bus row's `md5(body)` IS the row's bytes** — so a lane can read back its OWN sentences in `sed -n` slices instead of trusting the Architect's transcription. Cured `F-S133-SCOUT-CANNOT-READ-BACK-ITS-OWN-ROWS-1` on both lines; both scouts said the carry was faithful and they no longer took it on trust.
- **[S133] An unexecutable card is split at the seam its own FALSIFIER cannot hold.** `CARD-MA-RERUN-3-v15` was 43465 characters, twenty-one amendments, eleven versions, ZERO commits, and its own adversary verdict said its FALSIFIER forbade what its ORDER B.0 retained. Two small cards with machine judges replaced it. **A v16 of a card nobody can execute is not a cure.**
- **[S133] A card that waits must WAIT, not fail** — the run card's precondition is COMPUTED from a branch (two greps), never a remembered hash, and an absent branch is a wait state.

## The Architect's own instruments

- **[S133] `cardPreflight.ts` accepts a CLAIMS basis of `MEASURED: <command>` / `READ: <command>` / `NOT-READ` and nothing else**; every such row must anchor to a REAL `evidence:<name>` fence; `NOT-ANCHORED` is not a value; every PREMISE line needs an instrument or the literal `UNMEASURED`. R-TRIP-COUNT fires on counted live-state nouns in prose; R-TRIP-HEX fires on any bare 7–39-char commit-shaped token — **a GitHub run id (eleven digits) trips it**.
- **[S133] Three cards were REFUSED by preflight before insert and every refusal was a real defect** — the strongest evidence yet for GATE-1 ⓺, the pre-dispatch hook that does not depend on the Architect remembering.
- **[S133] The bridge VM cannot run any repo `tsx` script** — the owner clone's `node_modules` are darwin-arm64 and the bridge is linux. The working route: stage `cardPreflight.ts`, `harnessSelfTest.ts`, `relayAudit.ts` into the Architect container, `npm i -g tsx`, run there. `F-S133-BRIDGE-VM-CANNOT-RUN-REPO-TSX-1`.
- **[S133] The bridge VM has no GitHub credential either** — `git fetch` fails, so every ref reading there is of remote-tracking refs the LANES refresh. Real, but never `git ls-remote`. `F-S133-BRIDGE-VM-HAS-NO-GITHUB-CREDENTIAL-1`.
- **[S133] `cardPreflight.ts` knows only `kind=card` and refuses a notice** — `F-S133-PREFLIGHT-HAS-NO-GRAMMAR-FOR-A-NOTICE-1`.

## Landing, approval and witness

- **[S133] The land gate's AUTHOR-SUBJECT seam works as designed** — author AG-4, lander AG-5, classified `AUTHOR-SUBJECT`, and the report-only exception was never needed.
- **[S133] An approval names an ACT, not a path list.** "web valve merge onay" covered a merge; the nine-path fence was the Architect's own and it widened to seventeen when CI demanded a reseal. The widening is ruled, recorded and told to the owner in the same turn — never assumed and never hidden.
- **[S133] A `workflow_dispatch` on a BRANCH ref is not a master push and needs no spend approval** — which is why a measurement can complete without a second owner gate.
- **[S133] The owner's eye is the only instrument that reads ARRIVAL.** Every Architect reading was of the repository; the live Vercel deploy at build `021669f` with three `web.*` params PUBLISHED and running v1 is what says the feature reached production. `OWNER-WITNESS-S133-WEB-VALVE-LIVE-1`.
- **[S133] Landing a feature with its valve at a CLOSED floor changes what the repository CONTAINS and not what production DOES** — which is what makes it safe to land now and settle the contract later, against a fixture corpus rather than prose.

END-OF-KB CWF-SESSION-GRAPH-KB-v133
