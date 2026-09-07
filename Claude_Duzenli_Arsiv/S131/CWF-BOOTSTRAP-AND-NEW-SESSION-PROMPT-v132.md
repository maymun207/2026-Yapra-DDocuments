# CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v132

Written WHOLE (A-REC-S101-7). Supersedes v131. Every line marked [CARRIED-UNVERIFIED] was inherited without re-measurement at S131 close — the S132 Architect verifies it against the live DB, Vercel and the owner's clone before quoting it as fact (§0, §11). Rewriting a carried claim as settled fact is a new defect committed at close.

## ANCHOR (verify at open — §0)

- master `3e1732c2dd35b88d9f259e5947c7eea60afdf0b7` — the PR #502 landing, 2026-09-07T04:46Z, measured by Vercel `list_deployments` at close. **KNOWN TO BE STALE BY DESIGN:** the foreman's CARD-FOREMAN-REPORTS-DRAIN-1 was in flight at close and lands #503 plus its own report after this value. Measure with Vercel `list_deployments` (target=production, newest) AND the owner's clone `git for-each-ref refs/remotes/origin/master` (refs as of the last lane fetch) before any card. The Architect container has no GitHub credential.
- Bootstrap v132. Neither `npm run architect:open` nor the SOTA scoreboards were run in S131 — both [CARRIED-UNVERIFIED] since v5_7. **FIRST PRODUCT CARD MEASURES THEM.**
- SOTA-1 POSITIVE CONTROL — the Architect rewrites SOTA-1 verbatim in its FIRST message (S66-1).
- Project box instructions v5_8 §9 still names S122 anchors — stale; the box's §9 is owed a rewrite (v5_9), not done in S131.

## FIRST JOBS, in the owner's order

1. **Open the factory the measured way.** Read `factory_state` and the bus. Lanes at S131 close: AG-4 producer (nonce `53938e39…`), AG-5 foreman (`b798ceea…`), scout — all on the owner's death certificates of 2026-09-06. If the windows are gone, the claim walk returns NO-ADDRESS-FREE and the owner supplies the human half again (OWNER-RULING-S131-AG4/AG5-TAKEOVER-1 are the forms). Bridge: run every bridge git read with `GIT_OPTIONAL_LOCKS=0`; the owner's clone cannot run `tsx` (darwin node_modules) — stage `scripts/cardPreflight.ts`, `scripts/relayAudit.ts`, `scripts/harnessSelfTest.ts` into the container and preflight every card there (their sha256 at S131: `eaed3a5f…`, `4f3cb6c2…`, `4c7f1b28…` — re-stage if master moved them).
2. **Verify the drain finished:** `gh pr list --state open` = `[]` (via a lane) and the bus row `FOREMAN-REPORTS-DRAIN-1-AG5-report`. If a foreman report PR is still open, it needs a NEW owner word — OWNER-RULING-S131-FOREMAN-REPORTS-STANDING-1 lapsed at S131 close.
3. **Archive push:** CARD-ARCHIVE-PUSH-S131-1-v1 (to AG-5) pushes the S131 archive commit in the documents repo; confirm `origin/main` read back from the remote.
4. **PRODUCT RETURN — SOTA scoreboard measurement card** (the first card that advances anything): a lane reads `cwf-sota-definition` (sixteen external criteria) and runs `npm run architect:open` (7-key), and brings both counts back MEASURED with the evidence per criterion. The next product card is then chosen by SOTA-1's ordering, not by memory. Carried numbers (6/7 · 0/16) are NOT to be quoted.
5. v131's items 5–7 carried, all ADF-scope and frozen (OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1): mail-wait `--id` (F-MAILWAIT-DUPLICATE-NAME-READ-BLIND-1, recurred in S131) · TOOL-VISIBILITY-A-1 script card · GM-2 estate decision. Plus S131's frozen findings: F-S131-SCOUT-REPLAYS-DECAYED-CARD-1 · F-S131-PRODUCER-BOOT-SAYS-CONSUMED-AT-RETIRED-1 · CARD_GATE re-arm · foreman F-7/F-C/F-D/F-9 · GATE-1 ⓸ (the durable cure for the foreman-report loop). The owner's standing objection that the rules block progress stands: F-S130-RULE-COST-REVIEW-OWED-1, not started.

## STANDING RULINGS / CONSTRAINTS IN FORCE

- OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1 — product first; ADF frozen except by named lift.
- OWNER-RULING-S130-SEVEN-DISAGREEMENTS-AND-HOLD-1 — Gemini sole migration authority; scout takes no address; foreman FIXED at AG-5.
- Canary FROZEN. **OWNER-RULING-S131-REPORT-ONLY-DRAIN-1** (S131): while the canary is frozen, report-only PRs (`docs/relay/` only, author ≠ lander) land under the foreman's own authority with no per-push approval and no card; everything else keeps §5 (named approval bound to forty hex + Architect landing card).
- OWNER-RULING-S131-OWNER-TABLE-1 — eleven pre-grammar report PRs closed by name, branches retained; GATE-1 ⓹ SUPERSEDED.
- OWNER-RULING-S131-HOLDS-1 — executed; the three holds are gone.
- **OWNER-RULING-S131-FOREMAN-REPORTS-STANDING-1 — LAPSED at S131 close.** A foreman's own report PR needs a fresh owner word (⑤).
- Merge authority = foreman's own (OWNER-RULING-S122-E1-E2 + E1-AMENDMENT-1). Approvals go to the Architect in chat, never into lane windows. Architect never writes repo files, never gives the owner terminal commands. Every reply ends "SENİN AKSİYON MADDELERİN". Strategy Turkish, artefacts English, times TSİ. One path, never a menu. Every durable document to BOTH the project box and `Claude_Duzenli_Arsiv/S<n>/` in the turn it is written; a capability gap is declared in that turn.

## CARRIED CORRECTIONS (act on when the work recurs)

- Card grammar, measured from the installed source (ARCHITECT-CARD-TEMPLATE-v2, plus S131 additions): CLAIMS basis is `MEASURED: <cmd>` or literal `NOT-READ` (reason in cell 3); a 40-hex is legal ONLY in a CLAIMS cell or an `evidence:`/`diff` fence — not in PREMISE prose, not in a ```scope fence; short shas are refused in ANCHORED fences; `DECAYS` needs on/when/the moment/before; a ```scope fence satisfies CP-2; report filenames and bus rows are `…-AG<n>-report`; ISO instants, never `T02:1xZ`; destructive orders need "re-read the box immediately before the command".
- The foreman's poll drains report-only PRs on its own; "nothing landable" is a STALE-head reading — one trunk sync flips it (F-A). `git worktree add <branch>` may check out a stale LOCAL branch — compare against the forty hex read (F-C). Pull ref ≠ branch ref (F-D).
- A box read of another lane WRITES that lane's heartbeat (F-7): `heartbeat_at` proves nothing about the read lane. Liveness from OUTPUT only.
- Two S130 corrections remain valid: lander's own CI read is the referee; foreman box reads `--once` after its claim watermark, `--pre-watermark` before.
- The Claude Code classifier refuses `mail-wait` reads intermittently; a refused fresh-box read is a STOP, retried by a new card (HOLDS-RELEASE-2 pattern).

## OPEN AGENDA

- First jobs 1–5 above. Product return is the point of S132; S131 advanced no SOTA criterion (declared).
- GATE-1 ⓶ (⑤ steel), ⓸ (foreman observation-report path — now with a measured cost: fourteen report-only landings and five owner words in one session), ⓺, ⓻ — [CARRIED-UNVERIFIED].
- F-S130-TEST-SUITE-WRITES-GROUND-DOC-1 / SHARED-CLONE-DIRTY-GROUND-DOC-2 — the owner's clone still shows `docs/ground/authority-conformance.latest.md` modified (measured S131 open); one AG-4 card.
- F-S130-DECLARATION-LENS-BARKS-ON-EVERY-LANE-1 — foreman option 2, one AG-4 card, ADF scope.
- ARCHITECT-CARD-TEMPLATE-v3 (S37-1: new version) folding the S131 gate lessons.
- Project box instructions v5_9: §9 rewrite from S131 measurements.

## S131 A-RECs (blind spots — do not re-derive as insight)

A-REC-S131-1: the Architect told AG-4 "do not open a PR" for a report-only branch without reading that land.ts takes a PR number — the next card had to open it. A-REC-S131-2: the Architect did not name the conflict between the foreman boot's drain order and §5 before the foreman acted on it. A-REC-S131-3: four cards needed a second preflight pass on rules the template already claimed to encode — the template is the place, not the memory. A-REC-S131-4: the one-report-behind loop was discovered by running it three times before being named.

## TOOL/MECHANISM TRAPS (measured in S131)

- Bridge `git status` leaves an undeletable `.git/index.lock` unless `GIT_OPTIONAL_LOCKS=0`; the owner grants delete permission per session (`device_request_delete_permission`).
- Owner's clone `node_modules` is darwin-arm64; the bridge VM is linux-arm64 — no `tsx`, no `architect:open` there.
- Card transport unchanged: `base64 -w0` → `convert_from(decode(...,'base64'),'UTF8')`, `RETURNING encode(sha256(...),'hex')` = local `sha256sum`; zero drift over eleven cards.
- The foreman's cron poller works (2-minute cadence); v131's "no between-turn poller" was window-specific. Cards minted after its claim watermark are seen by plain `--once` within ~2 minutes.
- Both lane windows survived a ~15-hour owner absence with the bridge up (heartbeats current at 21:30Z); do not assume windows die with silence.
- Scheduled nightlies fire ~4–5 h after their declared cron minute (observed twice, unexplained).

TAIL ANCHOR: CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v132 ends here.
