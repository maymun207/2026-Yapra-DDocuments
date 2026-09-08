# CWF-S134-OPEN-MEASUREMENT-1

Written WHOLE at S134 open, 2026-09-08 ~15:25 TSİ. This document is the Architect's
FIRST measurement of the session and it exists because v134's own rule 3 says a report
leads with what moved in the PRODUCT. It carries no card, cuts no version, and asserts
nothing it did not read.

## 1 · WHAT MOVED IN THE PRODUCT — MEASURED

**AG-4 SHIPPED THE MA-RERUN HARDEN WORK WHILE S133 WAS CLOSING.** Branch
`phase/ma-rerun-harden-1-s133-1` exists at origin and carries two commits that are not
on master:

| head | authored (TSİ) | subject |
|---|---|---|
| `4771b6f719cd755767783c9d407d9f961f3b5a8f` | 2026-09-08 15:04:07+03:00 | AG-4: the report, and the trade stated rather than hidden |
| `62936f3e12e9edf2cc99365f11dbc3b5fc894aaf` | 2026-09-08 14:52:01+03:00 | AG-4: stderr leaves the upload, retention drops to a day, a counting step reports seams without printing one |

`git diff --stat master...<branch>` names four paths: `.github/workflows/ma-rerun.yml`
(+67/-9) and three `docs/relay/` reports, two of which are AG-5's landing reports carried
along the branch's base. The workflow edit is ONE file, exactly as the card fenced it.

The AG-4 report on that branch is complete, carries seven MEASURED claim rows each anchored
to a real evidence fence, and states its own regression rather than hiding it: the removed
stderr artifact means a parity-role permission error, a DNS failure, a bad `--until`, an
unset secret and a pre-first-frame crash now collapse into the SAME three values
(`lens_outcome=failure`, `clarify_lines=0`, `lens_failed_lines=0`). It names the repair it
did not make — a third anchored prefix count over the FENCE-DB-1 banner, or the node exit
code beside the outcome — and leaves it to the next card rather than widening its own scope.

**A pull request is open on that branch and was NOT merged.** AG-4 states landing is a
foreman card and the owner's approval was not given for it.

**Master is UNMOVED** at `e25f7cd33b7a72d262f7e62c54299c55b17adb4d`, equal to v134's anchor.
Per mechanical rule 2 an unchanged reading is a STOP that forces the question "why is this
not merged" — and here the answer is measured, not guessed: the harden branch does not need
to be merged for the measurement to run. `ma-rerun.yml` is `workflow_dispatch`, and a
dispatch on a BRANCH ref runs that branch's copy of the file. No master push, no spend
approval.

**`phase/ma-rerun-run-1-s133-1` DOES NOT EXIST at origin.** The run card has produced no
branch. Its gate — a COMPUTED harden-branch head — is now satisfiable: the head is the
forty hex above.

## 2 · THE BUS AND THE LANES — MEASURED, BOTH READS PRINTED

`relay_inbox`: **1360 rows total, newest `2026-09-08 11:49:28.954918+00`** — which is the
RUN card's own insert. NOTHING has been written to the bus since S133 closed, exactly as
`F-S133-PRODUCER-HAS-NO-BUS-WRITE-PATH-1` predicts. The lane's silence is mechanism, not
idleness, and AG-4's own report re-measured that finding independently and reported
`MECHANISM-ABSENT`.

`factory_state` at ~12:22Z: mode row **READY** · AG-4 **WORKING**, heartbeat
`12:21:42Z` · AG-5 **CLAIMED**, heartbeat `12:19:17Z` · AG-1/AG-2/AG-3 WORKING with
heartbeats days old · operator and scout CLOSED. Under CANLILIK YALNIZ POZİTİFTİR a fresh
beat reads as IDLE and the output is the only witness — and the output says AG-4 finished
its card seventeen minutes before this reading.

## 3 · CARRIER MEASUREMENT — register §5, the Architect's first job at open

| carrier | version read | verdict |
|---|---|---|
| open-items register | v123 (S133 close) | current |
| session graph KB | v133 | current |
| bootstrap | v134 | current |
| session close | S133 | current |
| project box instructions | v5_9 | current |
| findings | v1 + v2 addendum | current |
| memory seed | v3 | current; box §0 fixed in v5_9 |
| bug bucket | v56 (S120) | **v57 STILL OWED**, proposal unratified for the third session |

No carrier is older than the previous session. **No opening finding is filed against §5.**

## 4 · CAPABILITY STATE — DECLARED, MEASURED, NOT ASSUMED

- **Both folders are connected**, and they were NOT at the first minute of this session.
  The owner connected `cwf_yaprak` and `2026 - Yapra - DDocuments` mid-turn. Every reading
  above post-dates that.
- **The Architect container HOLDS a GitHub credential and CANNOT use it on this repository.**
  `GH_TOKEN` and `GITHUB_TOKEN` are set; `api.github.com/user` answers 200 as `maymun207`;
  and `repos/maymun207/cwf_yaprak/git/ref/heads/master` answers *"GitHub access to this
  repository is not enabled for this session"*. `git ls-remote` fails from the container
  (token rejected as a git password) and from the bridge VM (no credential at all).
- **CONSEQUENCE, and it is the honest limit of this document: the Architect CANNOT satisfy
  mechanical rule 4 by itself.** Whether a CI run exists at `4771b6f7...` is unreadable from
  here. Nothing in section 1 is called green. Only a lane can answer it.
- Every ref reading above is of remote-tracking refs in the owner's clone, refreshed by the
  lanes. It is a real reading of a real ref; it is not `git ls-remote`.

## 5 · FINDINGS OPENED AT S134 OPEN

**F-S134-THE-ARCHIVE-IS-UNTRACKED-NOT-MERELY-UNPUSHED-1.** v134 FIRST JOB 5 carried
"local `main` 18+ commits ahead of `origin/main`". Measured:
`git rev-list --left-right --count origin/main...HEAD` = `0	30` — thirty ahead, zero behind —
and `git status --porcelain` shows **57 untracked paths, among them the whole of
`Claude_Duzenli_Arsiv/S133/` (69 files)**. The carried framing named a PUSH debt and hid a
COMMIT debt: S133's archive was written to disk and never entered git at all. By the owner's
own stated reason for the rule, a file in neither git nor GitHub is a fact a later session
will guess. The push must still be ordered on an AG-5 card — neither the bridge VM nor this
container can push — and the card must now cover `git add` as well.

**F-S134-ARCHITECT-HOLDS-A-CREDENTIAL-IT-CANNOT-SPEND-1.** Refines
`F-S126-ARCHITECT-GH-403-1`, which is upheld in effect and wrong in cause: the absence is not
of a token but of repository authorisation for this session. The distinction matters because
the older finding invites a fix (supply a token) that is already satisfied and still yields
nothing.

**F-S134-CONSUMED-AT-IS-NOT-A-LANE-UNIFORM-SIGNAL-1.** Both AG-5 cards carry a `consumed_at`
stamp; all three AG-4 cards read NULL, including the harden card AG-4 demonstrably executed
and shipped. A NULL `consumed_at` therefore does not distinguish an unread card from a done
one, and the product remains the only receipt.

## 6 · THE SINGLE PATH FOR S134

Run the measurement, then build the citation contract.

1. The MA-RERUN measurement runs on the BRANCH ref `phase/ma-rerun-harden-1-s133-1` at head
   `4771b6f7...`. No master push, no spend approval, no second owner gate. The run card is
   already on the bus for AG-4 and its computed gate is now satisfied.
2. While it runs, the Architect writes the WEB-VALVE citation-contract card against a
   FIXTURE CORPUS of labelled answer strings — never against prose clauses. `AMENDMENT 43`
   of the v12 adversary review names the real bug it must catch: an unanchored marker fires
   on the English words "smart" and "Walmart" and would accept a wrong date. This is the
   nearest thing in the house to a SOTA-1 criterion actually moving.

TAIL ANCHOR: CWF-S134-OPEN-MEASUREMENT-1 ends here.
