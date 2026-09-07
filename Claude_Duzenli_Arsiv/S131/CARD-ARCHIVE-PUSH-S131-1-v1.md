<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-ARCHIVE-PUSH-S131-1 · v1 — push the S131 archive commit in the documents repository to origin and prove it from the remote; finish your drain card first
lane: AG-5
report: docs/relay/ARCHIVE-PUSH-S131-1-AG5-report.md
fanout: personalized

The Architect committed S131's archive files (twenty-eight artefacts under `Claude_Duzenli_Arsiv/S131/`) locally in the documents repository over the device bridge, which holds no GitHub credential — so the push is a lane job (OWNER-RULING-S129-ARCHIVE-FIRST-1, OWNER-RULING-S128-ARCHIVE-AUTOPUSH-1). This card is addressed to you because you are the lane alive at close; AG-4 ran the S130 pushes. Run it AFTER CARD-FOREMAN-REPORTS-DRAIN-1-v1 completes. It enters cwf_yaprak not at all; its report is posted ONLY as a bus row (this session's standing order has lapsed at close, so no report PR is opened for it — the row is the record).

## PREMISE
- MEASURED: 2026-09-07T04:56Z over the bridge, documents repository (`/Users/tunckahveci/Desktop/2026 DESKTOP/2026 -YAPRA/2026 - Yapra - DDocuments`), branch `main`: ONE new commit on top of the `history` fence, the `commit` fence; `git show --stat` names only paths under `Claude_Duzenli_Arsiv/S131/`. `origin/main` last read at the `history` fence (AG-4's S130 report commit).
- UNMEASURED: whether `origin/main` moved since (no network on the bridge). ORDER A reads it.
- ON-DISAGREEMENT: local `main` tip ≠ `commit` fence, or `origin/main` NOT equal to the `history` fence, or any path outside `S131/` in the commit → STOP and report; do not push.
- DECAYS on any write to the documents repository.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the local archive commit, unpushed | MEASURED: git rev-parse HEAD over the bridge after the commit | commit |
| origin/main as last read | MEASURED: git rev-parse origin/main over the bridge (last lane fetch) | history |
| the pushed tip | NOT-READ | ORDER B measures it from the remote |

```evidence:commit
c23763c6afaeef2c9531044c71a10929880b2fff
```

```evidence:history
31c8276de5f377e96781cefb55e1517cb9c169fb
```

## SCOPE
```scope
- documents repository, branch main: one commit, twenty-eight files under Claude_Duzenli_Arsiv/S131/
```

## ORDER A — READ FIRST
In the documents repository: `git rev-parse HEAD` = `commit` fence; `git ls-remote origin refs/heads/main` = `history` fence (if it already equals `commit`, someone pushed — STOP, report); `git show --stat HEAD | tail -1`; `git diff --name-only HEAD~1 HEAD | grep -v '^Claude_Duzenli_Arsiv/S131/'` must be EMPTY.

## ORDER B — PUSH AND PROVE
`git push origin main`; then `git ls-remote origin refs/heads/main` = local HEAD (S63-1 — the push's exit code is not evidence).

## ORDER C — REPORT
Post a from_lane row `ARCHIVE-PUSH-S131-1-AG5-report` ONCE with ORDER A readings and the ls-remote read-back. No file in either repository.

## FALSIFIER
Wrong if `origin/main` after ORDER B ≠ local HEAD, or if the commit touches any path outside `S131/`.

## SHARED SURFACES
The documents repository's `main`: one push. NOTHING in cwf_yaprak. No governed row.

## DECISION RIGHTS
None.

BODIES: OWNER-RULING-S129-ARCHIVE-FIRST-1 · OWNER-RULING-S128-ARCHIVE-AUTOPUSH-1 · CARD-ARCHIVE-PUSH-S130-2-v1 · S63-1 · TOTAL-45.

```deliverables
documents repo origin/main = the S131 archive commit, proven by ls-remote read-back
bus row from_lane ARCHIVE-PUSH-S131-1-AG5-report, posted once
```

TAIL ANCHOR: CARD-ARCHIVE-PUSH-S131-1-v1 ends here.
