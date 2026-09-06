<!-- relay-audit: v1 kind=card -->
# CARD-AUTHORITY-SNAPSHOT-REFRESH-1 · v1 — re-stamp the authority snapshot so build (24.x) is green repo-wide

The authority snapshot passed its own `P7D` freshness bound on 2026-09-02. `build (24.x)` — the ONLY
required CI context — now fails three `authorityMatrix` freshness assertions on EVERY branch,
including a pristine master worktree. Nothing can land until the snapshot is re-stamped. The owner
ruled on 2026-09-03, after reading CWF-S129-AUTHORITY-CONFORMANCE-INVESTIGATION-1: refresh it.

This card RE-STAMPS the live reading. It does NOT touch the seven conformance disagreements — those
are reported-not-gated and a fresh snapshot over unchanged code still reports them. This card closes
NONE of them and blesses NONE of them; it resets the clock the freshness gate reads.

## PREMISE

MEASURED: 2026-09-03T14:2xZ, `docs/ground/authority-live.snapshot.json` stamp — `measuredAt 2026-08-26T03:24:51Z`, `freshnessBound P7D`, so it expired 2026-09-02; today is 2026-09-03, eight days old.
MEASURED: 2026-09-03T14:2xZ, `package.json` — `"authority:snapshot": "node scripts/authoritySnapshot.mjs"`, and the script's header states it takes the reading "HERE, by a lane, with a credential, and committed as data" over the repository's own supabase-ro read path. It is a REPO write and a DB READ; it applies no migration and needs no Operator.
MEASURED: 2026-09-03T14:2xZ, the conformance doc's committed verdict — "REPORTED — 7 disagreement(s)". These are structural (code shapes, literals, boot prose); a fresh reading over the same tree reports the same seven, which is EXPECTED and is not a regression.
DECAYS the moment the live authority state changes or the snapshot is re-run. Re-read the stamp at ORDER A.
ON-DISAGREEMENT: if the disagreement COUNT the fresh run reports is anything OTHER than seven, STOP and report — a new disagreement means the live authority world moved since the investigation, and re-stamping it would bless a change nobody measured. Seven exactly proceeds; anything else is the owner's to see first.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the snapshot expired its own P7D bound and that is why build (24.x) is red repo-wide | MEASURED: 2026-09-03T14:2xZ, the snapshot stamp read over the bridge, bound P7D against today | stamp |
| authority:snapshot is a repo-write + DB-read that needs no Operator and applies no migration | MEASURED: 2026-09-03T14:2xZ, package.json and the script header read over the bridge | how |
| the fresh run must report exactly seven disagreements, the investigated set | MEASURED: 2026-09-03T14:2xZ, the committed conformance verdict "REPORTED — 7", cross-checked to CWF-S129-AUTHORITY-CONFORMANCE-INVESTIGATION-1 | stamp |
| whether the live authority state has moved since the investigation | NOT-READ | ORDER B's own run settles it; the ON-DISAGREEMENT arm governs a count other than seven |

```evidence:stamp
Read at 2026-09-03T14:2xZ from docs/ground/authority-live.snapshot.json:

  measuredAt      2026-08-26T03:24:51Z
  freshnessBound  P7D            -> expired 2026-09-02
  today           2026-09-03     -> eight days old, STALE

The committed conformance verdict at the same instant: "REPORTED — 7 disagreement(s)". The seven
are enumerated and verified in CWF-S129-AUTHORITY-CONFORMANCE-INVESTIGATION-1. A fresh run that
reports seven is re-stamping the investigated world; a run that reports any other number has
measured a world that moved.
```

```evidence:how
package.json: "authority:snapshot": "node scripts/authoritySnapshot.mjs"

The script writes docs/ground/authority-live.snapshot.json (SNAPSHOT_PATH) and regenerates
docs/ground/authority-conformance.latest.md, reading the live authority state over the repository's
own supabase-ro read path. NO migration. NO db push. NO Operator. A producer lane with the standard
read path runs it.

NOTE: merely running the vitest suite ALSO regenerates authority-conformance.latest.md as a side
effect, overwriting its verdict with COULD-NOT-RUN. Run authority:snapshot LAST, after any test
run, so the committed conformance doc carries the real verdict and not the test side effect.
```

## ORDER A — READ

Re-read the snapshot stamp at your HEAD and confirm it is still the expired 2026-08-26 reading. If it
is already fresh, STOP — someone re-stamped it and this card is done.

## ORDER B — RE-STAMP

Run `npm run authority:snapshot`. Read its output: it prints the disagreement count. If the count is
NOT seven, STOP and report the count and the new disagreement — do not commit. If it is seven,
commit the regenerated `docs/ground/authority-live.snapshot.json` and
`docs/ground/authority-conformance.latest.md` and NOTHING else. Run the snapshot AFTER any test run
so the conformance doc is not left at COULD-NOT-RUN.

Then run `build (24.x)`'s authority tests locally (`vitest run api/cwf/__tests__/authorityMatrix.test.ts`)
and confirm the three freshness assertions now PASS. Read vitest's FIRST output line to confirm the
root is your worktree, not the shared clone — the `--root`/cwd trap AG-4 documented in addendum 2/3.

Open a pull request. This is a producer branch; you do not land it.

## ORDER C — PROVE IT

Report the fresh snapshot's `measuredAt`, the disagreement count (seven), the local authorityMatrix
result (three now green), and the vitest root line you read. A green local run is not the merge
evidence — the foreman reads PR-head CI at land time (S37-2).

## ORDER D — REPORT

File `from_lane` with artifact name `AUTHORITY-SNAPSHOT-REFRESH-1-<your-address>-report`, carrying
the ORDER A reading, the ORDER B count and commit sha, and the ORDER C readings.

## FALSIFIER

This card is wrong if the snapshot is already fresh, or if the fresh run reports a disagreement count
other than seven. The second is not a failure of this card — it is the investigation's world having
moved, and it is the owner's to see before any re-stamp lands.

## SHARED SURFACES

Two files on a new branch: `docs/ground/authority-live.snapshot.json` and
`docs/ground/authority-conformance.latest.md`. One commit, one pull request. NO migration. NO db
push. NO other file. NO governed row. NO production traffic. The seven disagreements are neither
edited nor closed.

## DECISION RIGHTS

The owner ruled refresh, 2026-09-03, after reading the investigation. You decide the commit message
and nothing else. You decide NOTHING about the seven disagreements — they are out of scope and the
owner is sequencing them separately. A disagreement count other than seven is a STOP, not a judgement
call.

BODIES: `PLATINUM` · `S37-2` · `S63-1` · `TOTAL-45` · `empty ≠ zero` (a snapshot is a reading with a
freshness, not a truth without one).

fanout: personalized

```deliverables
branch: phase/authority-snapshot-refresh-1
report: bus row from_lane, artifact_name AUTHORITY-SNAPSHOT-REFRESH-1-<your-address>-report
```

TAIL ANCHOR: CARD-AUTHORITY-SNAPSHOT-REFRESH-1-v1 ends here.
