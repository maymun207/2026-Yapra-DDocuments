<!-- relay-audit: v1 kind=card -->
# CARD-ARCHIVE-PUSH-S130-1 · v1 — land every uncommitted S129 and S130 archive file in the documents repository, and clear the Architect's stale zero-byte lock on the way in

AG-4 card. `OWNER-RULING-S129-ARCHIVE-FIRST-1` and `OWNER-RULING-S128-ARCHIVE-AUTOPUSH-1` require every durable artefact to reach the documents repository. At S130 close the Architect measured NINETY-TWO archive files on the owner's disk and in NO commit: twenty-four under `Claude_Duzenli_Arsiv/S129/` and sixty-eight under `Claude_Duzenli_Arsiv/S130/`. The S129 set is the population CARD-ARCHIVE-PUSH-S129-2 (v1 and v2) was cut for and NEVER EXECUTED — both card versions sit untracked in the same directory, which is the proof. This card supersedes S129-2 in scope; its rules are the same.

This card writes NO code, touches NO governed row, and enters the cwf_yaprak repository not at all. The documents repository is a different repository on the same machine.

## PREMISE

MEASURED: 2026-09-05T14:59:03Z `git status --porcelain -uall` in the documents repository over the bridge: 24 untracked under `S129/`, 68 untracked under `S130/`, 9 further paths under `Projeler/` — the `not-mine` fence. Branch `main`; `git rev-parse HEAD` in the `history` fence; `git log -1` subject "CARD-ARCHIVE-PUSH-S129-1: the report and the card, beside the push they describe" dated 2026-09-03 01:59 +0300 — nothing has been committed since S129's first push.
MEASURED: 2026-09-05T14:59Z `ls -la .git/index.lock` — a ZERO-BYTE lock dated Sep 3 12:19 exists, the same one CARD-ARCHIVE-PUSH-S129-2 attributed to the Architect's own bridge read (the bridge shell cannot delete files). It has now sat there two days; no git process holds it.
MEASURED: CARD-ARCHIVE-PUSH-S129-2-v2's `not-mine` finding, re-used not re-derived: the nine `Projeler/` paths are NFD spellings of files ALREADY TRACKED under NFC — phantoms of the bridge lens, not a debt. Re-verify with `git ls-tree -r --name-only HEAD` over both `Projeler/` directories before you decide; if a path there is genuinely untracked, it stays OUT anyway.
DECAYS on any write to the documents repository. Re-take the status at ORDER A; the counts are a FLOOR — this card's own archive copy will have been written under `S130/` after the count and is IN SCOPE.
ON-DISAGREEMENT: branch not `main`; any listed S129/S130 file already tracked; `.git/index.lock` NON-EMPTY or dated other than Sep 3 → STOP and report. A count that has moved is NOT a disagreement — the scope RULE governs it.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| 24 + 68 archive files are untracked; the branch tip | MEASURED: 2026-09-05T14:59Z bridge read | history |
| the scope RULE | STATED by this card | scope |
| the nine Projeler paths are out of scope | MEASURED 2026-09-03 (S129-2-v2 not-mine), re-verify at ORDER A | not-mine |
| the lock is litter, not a process | MEASURED: zero bytes, dated Sep 3 12:19, attributed in S129-2 | lock |
| the pushed tip | UNMEASURED — ORDER C | remote |

```evidence:history
documents repository: /Users/tunckahveci/Desktop/2026 DESKTOP/2026 -YAPRA/2026 - Yapra - DDocuments
remote origin: https://github.com/maymun207/2026-Yapra-DDocuments.git
branch main, tip at 2026-09-05T14:59:03Z:
    57948757ff71ee1d47ffd0071df3f20276762f48
```

```scope
RULE: every path `git status --porcelain -uall` reports untracked or modified under
  Claude_Duzenli_Arsiv/S129/
  Claude_Duzenli_Arsiv/S130/
at ORDER A is IN SCOPE, listed or not. Anything outside those two directories is OUT, without exception.
Stage by explicit path list (a `git status --porcelain -uall -- Claude_Duzenli_Arsiv/S129 Claude_Duzenli_Arsiv/S130` piped to `git add --`), never `git add .` / `git add -A`.
```

```evidence:not-mine
Claude_Duzenli_Arsiv/Projeler/EAIP-1/docs/        three .docx (NFD phantoms of tracked NFC paths)
Claude_Duzenli_Arsiv/Projeler/cwf_yaprak3/docs/   six .md   (same)
NOT TOUCHED. Their continued presence in the post-push status is the proof you staged narrowly.
```

```evidence:lock
-rw------- 1 <owner> <owner> 0 Sep  3 12:19 .git/index.lock
Zero bytes, two days old, authored by the Architect's bridge read (S129-2 `lock` fence). This card is the authority to remove it. If it is non-empty or has a different date, it is not this lock — STOP.
```

```evidence:remote
UNMEASURED. ORDER C prints `git ls-remote origin refs/heads/main` = local HEAD, forty hex.
```

## ORDER A — READ FIRST
In the documents repository: `git rev-parse --abbrev-ref HEAD` (= main), `git rev-parse HEAD`, `git status --porcelain -uall`, `ls -la .git/index.lock`. Apply the scope RULE and print the in-scope list with its count. Re-verify the nine Projeler paths against `git ls-tree -r --name-only HEAD`.

## ORDER B — CLEAR THE LOCK, COMMIT
Remove `.git/index.lock` on the `lock` fence's authority. Stage the in-scope paths by name. ONE commit; message names this card and says: the S129 population CARD-ARCHIVE-PUSH-S129-2 was cut for and never executed, plus the whole S130 session archive (dispatch records 2–9, cards, approvals, rulings, notices, CWF-S130-SESSION-CLOSE-v1, CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v131). Push to `main`.

## ORDER C — PROVE FROM THE REMOTE
`git ls-remote origin refs/heads/main` = local `git rev-parse HEAD` (S63-1 — the push's exit code is not evidence). `git status --porcelain -uall` again: nothing under S129/ or S130/; the nine Projeler paths STILL present.

## ORDER D — REPORT
From_lane row, artifact_name `ARCHIVE-PUSH-S130-1-AG-4-report`: ORDER A readings, in-scope count, the full commit sha, the ORDER C remote reading, the Projeler survival. Also write the report as a file beside this card under `Claude_Duzenli_Arsiv/S130/` and include it in a SECOND commit + push (the S129-1 pattern: "the report and the card, beside the push"), read back the same way.

## FALSIFIER
Wrong if any path outside S129/ and S130/ enters the commit, if the lock is non-empty or differently dated, if the remote tip after push differs from local HEAD, or if any S129/S130 file remains untracked afterwards.

## SHARED SURFACES
The documents repository's `main`: two commits, two pushes. NOTHING in cwf_yaprak. No governed row.

## DECISION RIGHTS
None.

BODIES: OWNER-RULING-S129-ARCHIVE-FIRST-1 · OWNER-RULING-S128-ARCHIVE-AUTOPUSH-1 · CARD-ARCHIVE-PUSH-S129-2-v2 (superseded in scope by this card) · `S63-1` · `TOTAL-45` · `partial ≠ complete`.

fanout: personalized

```deliverables
documents repo main: 92+ archive files committed and pushed, proven by ls-remote read-back
report: bus row from_lane ARCHIVE-PUSH-S130-1-AG-4-report + file Claude_Duzenli_Arsiv/S130/ARCHIVE-PUSH-S130-1-AG-4-report.md
```

TAIL ANCHOR: CARD-ARCHIVE-PUSH-S130-1-v1 ends here.
