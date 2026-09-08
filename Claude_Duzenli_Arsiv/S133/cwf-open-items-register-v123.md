# CWF OPEN ITEMS REGISTER — v123 (S133 close)

Supersedes v122 (S132 close). Append-only; items leave ONLY via `CLOSED@evidence` / `SUPERSEDED-BY` / `MERGED-INTO`. Predecessor `claude/cwf-open-items-register-v122.md` READ IN FULL before this was written. Every status carries a basis: **MEASURED** (instrument named, S133) or **CARRIED-UNVERIFIED** (no lens reached it since the named session). Written WHOLE (A-REC-S101-7).

**GROUND FLOOR, MEASURED not asserted:** `origin/master` = `e25f7cd33b7a72d262f7e62c54299c55b17adb4d`, read from the owner's clone `refs/remotes/origin/master` at 2026-09-08T11:42:54Z. v122's floor was `5d482353161198d0b1381f9473fe86a02dce2bf3`. Master moved TWICE this session, and both moves are named in §1. **CAVEAT, standing:** the bridge VM's `git fetch` fails for want of a GitHub credential (`F-S133-BRIDGE-VM-HAS-NO-GITHUB-CREDENTIAL-1`), so every ref reading in this file is of remote-tracking refs that the LANES refresh in the shared clone. It is a real reading of a real ref; it is not `git ls-remote`.

## 0 · THIS FILE IS STILL THE LEDGER'S ONLY LIVE CARRIER

v122 §0 declared the inversion: the repo's `docs/ground/open-items.md` is the stale mirror, this box register is the fullest-attested ledger (FULLEST-ATTESTED). NOTHING CHANGED THAT IN S133 — no ADF lift was ruled, no ledger card landed. Item E of PHASE-ARCHITECT-CARD-GRAMMAR-1 stays OPEN and is still the first ADF lift to ask for. `F-S132-LEDGER-TRACK-ABANDONED-AT-S117-1` remains the finding.

## 1 · CLOSED SINCE v122 — `CLOSED@evidence` · S133, by name, with the evidence

- **WEB-VALVE-1 → LANDED.** `git cat-file -e origin/master:api/cwf/_lib/webTools.ts` succeeds. Merge commit `021669fd53e82620eec9442a983f37ce9fa2f3ee` (pull request 517), exactly the seventeen paths, under `OWNER-APPROVAL-S133-WEB-VALVE-MERGE-1` ("web valve merge onay"). Valve floor CLOSED: `web.enabled` declares `value 0, min 0, max 1, sessionTweakable false`. CI at the landed head `89bd65e7a81593f85bd419a760f8b7c62e0081c7`: `Build and Test`, `Relay corpus`, `report-schema` all `completed :: success`; `eval-canary` SKIPPED and named; `rule26` passed. `check:doc-drift` at the new master: all seven narrative tabs synced. **MEASURED**, and additionally **WITNESSED BY THE OWNER** on the live Vercel deploy at build `021669f`, scope GLOBAL · prod, with all three `web.*` params PUBLISHED and running v1 (`OWNER-WITNESS-S133-WEB-VALVE-LIVE-1`).
- **The web valve's seal debt → PAID ON THE BRANCH.** Six narrative tabs were made true of the web valve and resealed in ONE commit (RULE 20). Two were outright FALSE (`Architecture Map` and `Request Lifecycle` both hard-coded "three meta-tools"); four were untrue by omission. `docs/relay/WEB-VALVE-RESEAL-S133-1-AG4-report.md`, on master. **MEASURED**.
- **AG-5's own landing record → LANDED** as pull request 518, merge commit `e25f7cd33b7a72d262f7e62c54299c55b17adb4d`, under `OWNER-RULING-S132-FOREMAN-REPORTS-STANDING-1`. Both AG-5 reports (the STOP and the landing) are on master. **MEASURED**.
- **`CARD-MA-RERUN-3-S132-1` v5 through v15 → SUPERSEDED-BY `CARD-MA-RERUN-HARDEN-1-S133-1-v1` + `CARD-MA-RERUN-RUN-1-S133-1-v1`.** Eleven versions, twenty-one amendments, zero commits; the v15 adversary verdict declared the card UNEXECUTABLE. The two successor cards split it at the seam its own FALSIFIER could not hold. **MEASURED** (`git branch -r | grep -i ma-rerun` empty; no MA-RERUN commit newer than the S132 landing).
- **`CARD-WEB-VALVE-1-S132-1` v6 through v12 and their twelve adversary reviews → CLOSED WITHOUT PRODUCT.** They argued about scope added to a card AFTER its build was written, green and pushed. Recorded, not hidden: `A-REC-S133-6`.
- **`F-S133-SCOUT-CANNOT-READ-BACK-ITS-OWN-ROWS-1` → CURED FORWARD.** The scout's verdict row is archived and named with its md5 in the review card, so the scout compares against its OWN bytes. Both scouts confirmed. **MEASURED**.
- **`F-S133-A-HAND-TYPED-ROW-CAN-BE-MADE-FAIL-CLOSED-1` → CURED BY CONSTRUCTION.** Every bus insert now carries `where md5(body) = '<expected>' and encode(sha256(...),'hex') = '<expected>'`, so a mistype writes ZERO rows into an append-only table. Fourteen inserts this session, fourteen first-try matches. **MEASURED**.

## 2 · OPEN — CWF SCOPE (counts toward `cinekop_gate` first half, OWNER-RULING-S132-CINEKOP-GATE-CWF-SCOPE-1)

- **WEB-VALVE-1 follow-up — THE CITATION CONTRACT.** The landing proved the code exists and is off. NOBODY has opened the valve, no fetch has been made, and the citation contract has never been exercised. `AMENDMENT 43` from the v12 adversary review names a real correctness bug: an unanchored marker fires on the English words "smart"/"Walmart" and would accept a wrong date. The single path is a small card against a FIXTURE CORPUS of labelled answer strings, never against prose clauses. **NOT STARTED. MEASURED** (the amendment text; the code on master).
- **WEB-VALVE-1 — OPENING THE VALVE** is a governed, owner-surface decision and has NOT been asked for. **OPEN by design.**
- **WEB-VALVE-2** (`web_search` behind a provider key) — NOT STARTED; owner secret. **MEASURED** (absence: no card, no branch).
- **MA-RERUN-3 measurement** — IN FLIGHT under two new cards: `CARD-MA-RERUN-HARDEN-1-S133-1-v1` (bus 11:46:58Z, md5 `b70ee2d7886c39f4fa9ebb50f89724b7`) and `CARD-MA-RERUN-RUN-1-S133-1-v1` (bus 11:49:28Z, md5 `b69809ed682d4dfbf2c2d5d503e92bfc`, gated on the first by a COMPUTED branch head, not a remembered hash). The runner itself is on master and dispatchable; the run needs NO master push and therefore NO further owner approval. Feeds `cwf-sota-definition-v1_6`. **MEASURED**.
- **`F-S133-PRODUCER-HAS-NO-BUS-WRITE-PATH-1`** — `relay_post_from_lane` is defined in the migration, enumerated in `scripts/verifyGrants.ts`, exercised in `factoryWriteChannel.test.ts`, and CALLED BY NOTHING; `callVerb` in `factoryState.mjs` is module-private. Both AG-4 and AG-5 found it independently, two lenses each. A producer cannot post a report row at all. **OPEN, and it is the loudest finding of the session** — it made an idle-looking lane indistinguishable from a blocked one, and the Architect read the silence wrongly for hours. Cure owed: export a caller, or declare `scripts/busDelivery.ts` the receipt in `producer.md`. **MEASURED**.
- **`F-S133-SILENCE-DECLARATION-IS-DROPPED-ON-THE-VERB-PATH-1`** — `producer.md` orders `SILENT-UNTIL <iso> :: <what>` into `factory_state.note`; `writeLane`'s `opts.note` is honoured only on the legacy direct-table path, and `factory_write_lane(lane, state, nonce)` has no note parameter. A lane that obeys the rule is UNDECLARED-SILENT by mechanism. Sibling of `F-S132-SILENT-UNTIL-UNWRITABLE-ON-LIVE-CHANNEL-1`. **MEASURED**.
- **`F-S133-A-SUBSET-REPORTED-AS-THE-WHOLE-1`** — `npm run build` runs five gates the reported green never covered: `tsc -b` (the ROOT project, so every line under `src/`), `gen:arch-facts`, `check:ground`, `vite build`, `check:doc-drift`. `vitest` + `typecheck:api` is a PROPER SUBSET. Named as a class, not an incident. **MEASURED** from `package.json`.
- **`F-S133-A-VERDICT-AT-THE-PARENT-IS-NOT-A-VERDICT-AT-THE-CHILD-1`**, with its sibling: `gh api actions/runs?head_sha=<short sha>` answers `total_count: 0`, byte-identical to "CI never ran". A short sha there is a FALSE NEGATIVE, not a style choice. **MEASURED**.
- **`F-S133-BRIDGE-VM-HAS-NO-GITHUB-CREDENTIAL-1`** and **`F-S133-BRIDGE-VM-CANNOT-RUN-REPO-TSX-1`** (the owner clone's `node_modules` are darwin-arm64; the Linux bridge VM cannot run `tsx`, so no repo script — preflight, drift, audit — runs there). Both **MEASURED**; the second was worked around by staging three script files into the Architect container.
- **`F-S133-PREFLIGHT-HAS-NO-GRAMMAR-FOR-A-NOTICE-1`** — `cardPreflight.ts` knows only `kind=card`. **MEASURED**.
- **`docs/ground/facts.json` moduleCount is STALE** — `454` where the tree now has `455`, because `webTools.ts` exists. AG-4 reverted the regeneration to stay inside its fence and reported the debt rather than hiding it. CI regenerates before `check:ground`, so it is inert there. **OPEN, MEASURED**.
- **The four S119-LANDING-ORDER reports · `F-S132-ASK-RENDERED-TWICE-BILINGUAL-1` · `#81 BACKEND-DISCOVERY-1` · A1 deploy workflow · census cadence runner · honestbench publish endpoint · BENCH-SMOKE-1 · Kademe 4 H9/H10 · `#82b` Design-RAG (PARKED by the owner) · PI-001 · `F-S117-CLARIFY-CHILD-LAYER-FALSE-EMPTY-1` · VECTOR-QOS order-of-events · `F-S130-TEST-SUITE-WRITES-GROUND-DOC-1` (seen again this session, both lanes' `git status` shows it) · `F-S132-GATE-VERDICT-AVAILABLE-LOCALLY-1` · panel publish path for a new registry key (ANSWERED IN PRACTICE this session: the owner published nothing and the three `web.*` keys appeared on the panel by themselves — CARRIED-UNVERIFIED as a general answer) · RAG lane finish · B-FRONTIER-PAIRING-1 · GOLDEN-SET-REPLAYABILITY-1 · EVAL-SPLIT-LAW · OPA-POLICY-1 + FAULT-SWITCH-0 · FAILURE-LESSON-MEMORY-1 · SILENT-FINISH** — all carried from v122 §2 unchanged. **CARRIED-UNVERIFIED** except where v122 marked them MEASURED.
- **Architect-owed documents (CWF):** `cwf-sota-definition-v1_6` (waits on MA-RERUN-3's report) · RAG-lane finish definition · EVAL-SPLIT-LAW text · `ARCHITECT-CARD-TEMPLATE-v3` · ledger CWF/ADF split of the repo's 65 rows · `REGISTER-BUG-BUCKET-v57` (see §5). **Project box instructions v5_9 — CUT IN S133**, see §5.
- **Owner/Operator surface (consent, secrets, spend, witness — never operations):** unchanged from v122 — A3 Operator's two rows · A1 vendor call + spend · A2 credential set + ARMES rotation · A4 honestbench republish · A5 per-round spend · synthetic injector pause ruling · WEB-VALVE-2 provider key · census classification ruling. **One item LEAVES this list: the named landing approval for WEB-VALVE-1 was given and spent.** The MA-RERUN-3 landing approval is NOT needed for the measurement (branch dispatch), only if its artefact is later landed.

## 3 · OPEN — ADF SCOPE (frozen; OUT of the gate's count)

Every name in v122 §3 is carried forward UNCHANGED and UNVERIFIED — no ADF lens ran in S133. Added this session, in the same frozen scope:

- **`F-S133-PRODUCER-HAS-NO-BUS-WRITE-PATH-1`** and **`F-S133-SILENCE-DECLARATION-IS-DROPPED-ON-THE-VERB-PATH-1`** are ADF-scope by substrate but CWF-blocking in effect; they are listed in §2 deliberately, because a producer that cannot report is not a frozen concern.
- **GATE-1 agenda, current reading:** ⓵ CLOSED (S130) · ⓶ ⑤ steel — OPEN · ⓷ ADF-ARCHITECTURE-v2 landing + H2 — OPEN · ⓸ foreman report path — OPEN · ⓹ SUPERSEDED · ⓺ pre-dispatch preflight hook — OPEN, and S133 raised its value: three cards were REFUSED by preflight before insert and every refusal was a real defect · ⓻ P-9 — OPEN.
- **P-6 OBSERVATION WINDOW:** the owner ruled in S133 that it covers the S132 adversary mechanism AND that an infinite loop is stopped wherever it is seen (`OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1`). Under that ruling the adversary gate was lifted, by name, for three cards: the reseal, the MA harden and the MA run. The mechanism itself is UNCHANGED and still under observation.

## 4 · OWNER-SURFACE ITEMS CARRIED FROM v122 §4

Unchanged. Budget fence resolved as a fence with its standing exception; the warning-subscriber gap still CARRIED-UNVERIFIED. Window hangs recorded per session.

## 5 · THE CARRIERS THEMSELVES

| carrier | last version | status at S133 close |
|---|---|---|
| open-items register | **v123 (this)** | current |
| session graph KB | **v133** (this close) | current |
| bug bucket | v56 (S120) | **v57 STILL OWED** — v122's proposal (merge the bucket into this register's §2/§3) is REPEATED and still unratified; the owner's word decides |
| implementation order | v33 (S124) | SUPERSEDED for CWF by `S132-CINEKOP-TODO-v2` + this register |
| memory seed | v3 (S117) | box §0 ordered v1 until v5_8; **v5_9 fixes it** |
| bootstrap | **v134** (this close) | current |
| session close | **S133** (this close) | current; S119 has none (named hole, unchanged) |
| project box instructions | **v5_9** (this close) | current |
| findings | **v1 + v2 addendum** (S133) | current |

## 6 · SOTA GATE — TWO SCOREBOARDS

**(B) ACCEPTANCE CONTRACT — NOT RE-MEASURED IN S133.** v122's reading was 0/16 (PR #506). It is CARRIED-UNVERIFIED and must be read from `cwf-sota-definition` and `architect:open` before it is quoted. **(A) INTERNAL SEVEN-KEY — NOT-READ**; the instrument prints no such field, and the S117 figure 6/7 is not to be quoted.

**WHAT S133 DID TO (B), honestly:** WEB-VALVE-1 is F2 DeepScholar's PRECONDITION and it landed, so the precondition is met — but no criterion was measured as satisfied, because the valve is closed and the citation contract is unexercised. The nearest movement remains: MA-RERUN-3's fresh internal row (in flight), then the citation-contract card, then the owner package A1/A2/A4/A5 for Tier E.

END-OF-REGISTER cwf-open-items-register-v123
