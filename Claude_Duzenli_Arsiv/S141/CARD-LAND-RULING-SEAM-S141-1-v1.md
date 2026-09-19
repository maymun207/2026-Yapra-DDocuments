<!-- relay-audit: v1 kind=card -->
CARD-LAND-RULING-SEAM-S141-1-v1

LANE: AG-4
fanout: personalized
A GATE card, cut on a measured hole: this factory has NO lawful lander for code the foreman authored. `scripts/land.ts` step B refuses SELF-LAND for any diff outside docs/relay/ (:969-982) with no exception but the report-only one; the foreman is the only window whose settings carry the merge key; a producer window that sets the key is refused by the Claude Code auto-mode classifier — AG-4 tried it on the owner's ruling at 09:21Z and was refused verbatim: "Permission for this action was denied by the Claude Code auto mode classifier. Reason: [Security Weaken]." (AG-4's from_lane slip of 09:23:20Z, artifact_name ending `-HARNESS-REFUSED`; row in `raw-tokens`). PR 579 is CI-green and has sat unlandable since 08:24Z. The Architect's dispatch error made the hole visible (A-REC-S141-CODE-CARD-TO-THE-LANDER-1); the hole itself is a missing seam: an OWNER RULING has no place to land in the gate. This card builds that seam — small, mechanical, auditable — so the foreman can land its own code ONLY on a named owner ruling that the gate reads from the bus and prints. You (AG-4) author; the foreman lands this card the ordinary way (author AG-4 ≠ lander AG-5); then the foreman lands 579 through the seam on a fresh owner ruling addressed to it.

PRECONDITION: `origin/master` at or beyond the head in `the-head`; `judgeReportOnly` and `landerLane` read as fenced; PR 579 still OPEN. If any differs, YOUR reading wins; print both.

```evidence:the-head
master           db907a3424a65345c9a9c0fdde6be3c8e3c171dc   merge of PR 578, 2026-09-17T07:48:21Z, read from the shared clone's origin ref at 09:26:40Z
the gate         scripts/land.ts:896 `export function judgeReportOnly(paths, authorLane, landerLane, candidates = [])` → :947-953 AUTHOR-UNKNOWN refuse · :955 reportOnly · :956-961 author≠lander PASS · :962-967 report-only PASS · :969-982 SELF-LAND refuse (prints the outside paths)
the lander       scripts/land.ts:1368-1370 `landerLane(exec, env)` — `ADF_LANE_ROLE` authoritative, `/^AG-\d+$/`
the bus readers  scripts/mail-wait.mjs (`--read <artifact_name>` prints the row digest-checked: [CARD] id · body_md5 · length · DIGEST-OK) and scripts/busDelivery.ts — the repository's own two bus-read paths; land.ts today imports neither
the harness      the auto-mode classifier refused `env ADF_LANE_ROLE=AG-4 npm run land -- 579` in a producer window at 09:21Z ("Security Weaken") — AG-4's own slip, posted 09:23:20Z, verbatim; the foreman window prefixes `ADF_LANE_ROLE=AG-5` on every landing and is not refused
the self-land    the scout printed :896-982 at 07:38:41Z and classed PR 579's eleven-path diff SELF-LAND for lander AG-5 — AUTHOR-UNKNOWN never passes, author≠lander passes, report-only passes, everything else refuses
the precedent    ⑤ MERGE AUTHORITY EXCEPTION exists by the owner's ruling alone (OWNER-RULING-S122-E1-E2-v1 + E1-AMENDMENT-1; project box §9): "a lane may land the RECORD of a landing ordered to it by card" — the report-only exception is its steel; THIS card is the steel for the second case the owner ruled today, OWNER-RULING-S141-PR579-LANDS-BY-AG-4-1 (bus rows to AG-4 · AG-5 · scout at 09:19:49Z)
```

## PREMISE

MEASURED: the gate, the lander and the two bus readers by `git show`/`git ls-tree` at master over the shared clone at 2026-09-17T09:26:40Z.
MEASURED: the harness refusal and the SELF-LAND refusal, by the lanes' own slips and the scout's print of :896-982 (rows in `raw-tokens`).
MEASURED: the owner's ruling exists on the bus in three copies (09:19:49Z) and in the project box.
UNMEASURED: whether land.ts can import busDelivery.ts without pulling a Supabase client into the landing path it does not have today; ORDER 1 measures it and, if not, shells out to `node scripts/mail-wait.mjs <lane> --read <name>` exactly as a lane does.
SELF-INVALIDATION: dies if master moves by a commit touching scripts/land.ts, scripts/mail-wait.mjs or scripts/busDelivery.ts, or if a v2 appears.

## ORDERS

ORDER 1 - THE SEAM, IN THE GATE. In `judgeReportOnly` (or a sibling it calls), a THIRD pass with its own class, `AUTHOR-SELF-RULED`: when `authorLane === landerLane` and the diff is not report-only, the gate looks for env `ADF_LAND_RULING=<artifact_name>`. Absent → SELF-LAND refuse exactly as today (byte-identical message). Present → the gate READS the bus row with that artifact_name addressed `to_lane` the LANDER's own address, digest-checked through the repository's own reader (mail-wait --read semantics: id, md5, length, DIGEST-OK), and PASSES only if ALL hold: the row exists for the lander lane; its artifact_name starts with `OWNER-RULING-`; its body contains the literal pull-request number being landed (`#<n>` or `pull request <n>`) AND the literal lander address; and its created_at is within the last 24 hours. The pass line prints the ruling's artifact_name, row id, md5 and created_at — a landing under a ruling is LOUD. Any missing condition → refuse with class `RULING-UNPROVEN` naming which condition failed (never fall through to PASS). The env var is read ONCE per landing and never persisted; nothing writes it to a settings file.

ORDER 2 - NO SILENT WIDENING. The seam never applies when author≠lander (that path is unchanged) and never to AUTHOR-UNKNOWN (unreadable is never a pass, as today). guard-bash.py is UNTOUCHED — `gh pr merge` stays fenced everywhere; land.ts still calls gh itself. `.claude/settings*.json` UNTOUCHED.

ORDER 3 - TESTS FIRST. In land.ts's own test file: (a) self-land, no env → SELF-LAND refuse, message byte-identical to today; (b) self-land, env names a ruling row that exists for the lander, names the PR and the lander, is fresh → PASS `AUTHOR-SELF-RULED`, and the pass text carries the row id and md5; (c) env names a row that exists but for ANOTHER lane → RULING-UNPROVEN; (d) row exists but names a different PR → RULING-UNPROVEN; (e) row older than 24h → RULING-UNPROVEN; (f) env set but author≠lander → the ordinary PASS, seam not consulted; (g) artifact_name without the `OWNER-RULING-` prefix → RULING-UNPROVEN. The bus reader is injected (the `exec`/deps pattern land.ts already uses) so the tests need no database.

ORDER 4 - GATES. `npm run build` (five gates by name) and `vitest` — exits by name. scripts/ is a permission surface: the scout reviews the diff line by line and the landing card will name it; keep the diff to land.ts + its test + the docs/relay report + (if mapped) the manifest reseal in the SAME commit.

ORDER 5 - SHIP. Push; PR titled `PHASE-LAND-RULING-SEAM-S141-1: the gate reads an owner ruling from the bus, and says so`; slip with the forty-hex head and CI as you read it; report `docs/relay/LAND-RULING-SEAM-S141-1-AG4-report.md` on the same branch. Thirty minutes from green to a slip (§12.8). AG-5 lands this one the ordinary way.

## FALSIFIER

If the seam can PASS without a bus row (a file, an env value alone, a commit message), STOP — that is self-certification. If the reader cannot digest-check the row, STOP and print why. If any existing land.ts test's expected STRING changes for a case the seam does not touch, STOP and print the diff.

## SHARED SURFACES

```scope
- scripts/land.ts (judgeReportOnly: the AUTHOR-SELF-RULED pass and the RULING-UNPROVEN refuse; the injected bus read)
- scripts/__tests__/land*.test.ts (the seven cases)
- docs/relay/LAND-RULING-SEAM-S141-1-AG4-report.md (new)
- public/architecture/manifest.json (only if scripts/land.ts is mapped — reseal, same commit)
```

No change to guard-bash.py, to any settings file, to mail-wait.mjs or busDelivery.ts beyond an import; no migration; no master push.

## DECISION RIGHTS

You choose the reader (import vs shell-out), the exact class names, and the freshness window if 24h collides with an existing constant — print what you chose. You may refuse on evidence this card did not anticipate.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the gate's five branches, the lander, the two bus readers | MEASURED: git show/ls-tree at master, 2026-09-17T09:26:40Z | the-head |
| the harness refusal in a producer window | MEASURED: AG-4's slip at 09:23:20Z, verbatim | the-head |
| SELF-LAND for PR 579's diff | MEASURED: the scout's print of :896-982 at 07:38:41Z | the-head |
| the owner's ruling on the bus | MEASURED: three rows at 09:19:49Z, execute_sql | the-head |
| whether land.ts can import busDelivery without a client | NOT-READ | ORDER 1 measures it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if master moves by a commit touching scripts/land.ts, scripts/mail-wait.mjs or scripts/busDelivery.ts, or if a v2 appears.

```evidence:raw-tokens
AG-4 harness slip     from_lane, 09:23:20Z, artifact_name ends -HARNESS-REFUSED
AG-4 stopped slip     from_lane, 09:10:50Z, artifact_name ends -STOPPED
scout self-land read  961b0f03-d338-4c28-9f6d-340f25c907f5
ruling rows           8c0bb009-b5d9-4ee5-b410-1f477a07e800 (AG-4) · ecb052e2-ee44-4dfc-9f7a-1168277d8905 (AG-5) · ef9a54e1-46d2-408d-a319-21e40df08ddb (scout)
PR 579 head           2adab2da890ac99ce9e36652b33a8914d04dbe9d
```
