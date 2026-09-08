# CWF-S134-FINDINGS-v1

Written WHOLE at S134 open, 2026-09-08 15:45 TSİ. This carrier exists because the
session's FIRST document — `CWF-S134-OPEN-MEASUREMENT-1`, written at 12:24:49Z — was
re-measured twenty minutes later and one of its findings was wrong in its numbers while
right in its class. Under TOTAL-45 a number in a carrier is a claim, and this file records
the re-derivation rather than letting the wrong count travel into the register.

## F-S134-OPEN-MEASUREMENT-COUNT-DEFECT-1 — the Architect committed the house's own signature failure inside the document that names it

`CWF-S134-OPEN-MEASUREMENT-1` §5 states, of the archive working copy
`2026 - Yapra - DDocuments`:

> `git status --porcelain` shows **57 untracked paths, among them the whole of
> `Claude_Duzenli_Arsiv/S133/` (69 files)**

RE-MEASURED at 2026-09-08T12:42Z, in the same working copy, from the bridge VM:

| quantity | instrument | reading |
|---|---|---|
| untracked paths, total | `git status --porcelain -uall \| grep -c '^??'` | **60**, not 57 |
| untracked paths, dirs collapsed | `git status --porcelain \| grep -c '^??'` | 60 — identical, which is itself the proof S133 is not a wholly-untracked directory |
| files on disk under `S133/` | `ls Claude_Duzenli_Arsiv/S133 \| wc -l` | **71**, not 69 |
| TRACKED under `S133/` | `git ls-files Claude_Duzenli_Arsiv/S133 \| wc -l` | **21** |
| UNTRACKED under `S133/` | `git ls-files --others --exclude-standard Claude_Duzenli_Arsiv/S133 \| wc -l` | **50** |
| the remaining untracked | same, whole tree | 9 under `Claude_Duzenli_Arsiv/Projeler/` + 1 under `S134/` |
| modified or staged | `git status --porcelain -uall \| grep -vc '^??'` | **0** |
| ahead / behind `origin/main` | `git rev-list --left-right --count origin/main...HEAD` | `0	30` — thirty ahead, zero behind. This one was RIGHT. |

**THE CLASS IS CORRECT AND STANDS: the archive carries a COMMIT debt, not merely the PUSH
debt v134 FIRST JOB 5 carried.** Fifty S133 artefacts are on disk and in no git object at
all, and the AG-5 archive card must cover `git add` before `git push`.

**THE SHAPE IS WRONG AND MATTERS.** `S133/` is PARTIALLY tracked — twenty-one of its
seventy-one files are already committed. A card written from "the whole of S133 is
untracked" would fence itself on a false premise and could not have been falsified by its
own reading. And the collapsed-versus-`-uall` counts being EQUAL is the mechanical tell:
git collapses a wholly-untracked directory to a single entry, so 60 = 60 was already
saying "no directory here is wholly untracked" before any file was counted.

**WHY THIS IS THE HOUSE'S OWN CLASS.** `F-S122-STALE-COUNT-CLASS-IS-SUBSTRATE-INDEPENDENT-1`
says the dominant failure mode is a number passing from one carrier to another without
re-derivation, and that every actor commits it. It was committed here inside the very
document whose §5 was filed to correct a carried count — the carried claim "18+ commits
ahead" was properly re-derived to 30, and three fresh numbers written beside it were not.
Re-derivation is not a habit that generalises across the sentences of one paragraph.

**CURE, and it is mechanical rather than moral (A-REC-S122-ARCHITECT-PRECISION-DECAY-1):**
the archive card must PRINT its own counts from the instruments named above as its first
order, and must not accept any count from this or any prior carrier as a premise. The
numbers in the table above are this file's own reading and are equally claims for it.

## CONFIRMED, NOT NEW — the MA-RERUN run card's gate is SATISFIED, not merely satisfiable

`CWF-S134-OPEN-MEASUREMENT-1` §1 records that the run card's computed gate "is now
satisfiable". It is now MEASURED SATISFIED. `CARD-MA-RERUN-RUN-1-S133-1-v1` ORDER A.3 names
two greps against the harden branch head
`4771b6f719cd755767783c9d407d9f961f3b5a8f`, and both were run at 12:38Z:

- `ma-rerun-stderr.log` appears six times in `.github/workflows/ma-rerun.yml` — at the lens
  step's `2>` redirect, four times inside the counting step, and once in that step's `rm -f`.
  It does NOT appear in the upload step's `path:`, which the card requires and which was
  confirmed by reading the whole `Upload evidence` block: `path:` carries
  `ma-rerun-evidence.json` alone and `retention-days: 1`.
- `clarify_lines=` appears once, in the counting step.

**So AG-4 does not enter the ORDER A WAIT arm.** Its silence on the bus is
`F-S133-PRODUCER-HAS-NO-BUS-WRITE-PATH-1` and nothing else, and the only positive signal
the line can emit is `docs/replay/ma-gate-rerun3-S133-v1.md` appearing on the harden branch.

## THE TWO READS AT THIS WRITE, PRINTED EVEN THOUGH ONE IS EMPTY (A-REC-S133-5)

- PRODUCT: `origin/master` = `e25f7cd33b7a72d262f7e62c54299c55b17adb4d`, UNMOVED from the
  v134 anchor. `origin/phase/ma-rerun-harden-1-s133-1` = `4771b6f719cd755767783c9d407d9f961f3b5a8f`,
  two commits ahead of master, zero behind. `phase/ma-rerun-run-1-s133-1` DOES NOT EXIST.
  `docs/replay/ma-gate-rerun3-S133-v1.md` DOES NOT EXIST on any ref.
- BUS: `relay_inbox` — **1360 rows, newest `2026-09-08 11:49:28.954918+00`**, which is the
  run card's own insert. Nothing has been written since. `factory_state`: mode READY;
  AG-4 WORKING with heartbeat `2026-09-08T12:21:42Z`; AG-5 CLAIMED with heartbeat
  `2026-09-08T12:19:17Z`; AG-1/2/3 WORKING with heartbeats days old; operator and scout
  CLOSED. Under CANLILIK YALNIZ POZİTİFTİR a stale beat is the WORKING reading.

Both reads are IDENTICAL to `CWF-S134-OPEN-MEASUREMENT-1`'s. Under mechanical rule 2 that
is a STOP and it is declared as one here: the line is halted awaiting a product signal, a
self-tick is armed on it, and no card version is cut on the strength of an unchanged reading.

## CAPABILITY STATE AT THIS WRITE — DECLARED

- Both folders are connected. Every reading in this file post-dates that.
- This file is written to the project box AND to `Claude_Duzenli_Arsiv/S134/` on the owner's
  disk. **It is NOT in git and NOT on GitHub**, because the archive working copy holds the
  commit debt this file's first finding measures, and neither the Architect container nor the
  bridge VM can push. Calling it "archived" would be the untrue half of the owner's own rule.
- Mechanical rule 4 remains UNSATISFIABLE by the Architect: whether a CI run exists at the
  harden head cannot be read from here. Nothing in this file is called green.

TAIL ANCHOR: CWF-S134-FINDINGS-v1 ends here.
