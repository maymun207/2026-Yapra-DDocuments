# CWF-S135-OPEN-MEASUREMENT-1
Session S135, opening measurements. Every line is MEASURED with its instrument and moment, or marked
CARRIED UNVERIFIED. Times are UTC; the owner's local time is UTC+3.

## SOTA-1, REWRITTEN VERBATIM (S66-1 positive control)

SOTA-1 — ACCEPTANCE CRITERION (S80). v1's only acceptance criterion is cwf-sota-definition. Anything not
traceable to a criterion in that file is outside v1 scope. The Architect may not defer, shrink or
down-rank any item that advances a SOTA criterion on the grounds of "not needed for now / low traffic /
this is enough / later / v1.1". The only objection class left to the Architect is "this ordering makes
SOTA unprovable", and it is accepted only if it names IN WRITING: (a) which criterion stays unproven,
(b) on what date it becomes provable, (c) which measurement settles it. Any deferral proposal missing one
of the three is a SOTA-1 violation: the owner cancels it by name, and the Architect either supplies
(a)+(b)+(c) in the same message or withdraws the proposal — there is no third path. A criterion retires
ONLY by proof; never by convenience, cost or scope pressure.

## ANCHOR — VERIFIED

MEASURED 2026-09-09T16:19Z, `git rev-parse` in the owner's connected clone:
origin/master = 95afefed06f6edb0cea5e2caadc0a4e582af38b2, matching the v135 bootstrap's anchor exactly.
origin/phase/entity-scope-by-resolved-peer-1-s134-1 = 56bd73ae1c05a0306b4c59a7e8416a5ba00c93eb, also
matching. The clone's own working copy sits at 021669fd53e82620eec9442a983f37ce9fa2f3ee, which is S133's
head and is BEHIND its own remote-tracking ref.

FRESHNESS OF THAT REF IS UNMEASURED, and the reason is a capability gap named below: nothing in this
session can `git fetch`. The refs above are as the lanes last left them.

## CAPABILITY GAPS, DECLARED

1. NO GITHUB CREDENTIAL ANYWHERE THIS SESSION CAN REACH. Measured twice, two different assumptions:
   - cloud container: `git ls-remote https://github.com/maymun207/cwf_yaprak` -> "Invalid username or
     token. Password authentication is not supported for Git operations." A token variable IS set in that
     container and it is not a GitHub credential.
   - the owner's bridge VM: `git fetch origin` -> "could not read Username for https://github.com".
     `gh` is not installed there.
   CONSEQUENCE: the Architect cannot read GitHub Actions, cannot fetch, cannot push. Per the S134
   addendum 12.9 this is a DISPATCH to the scout, not a blocker — and the scout answered in this session.
   CONSEQUENCE FOR THE ARCHIVE: files written into "2026 - Yapra - DDocuments" land on disk and are NOT
   pushed to the private GitHub repository by this session. That push needs a lane or the owner.

2. THE ARCHITECT CAN NOW RUN REPOSITORY INSTRUMENTS, WHICH IS NEW. Both folders were connected during
   this session's first turn. The bridge VM is linux-arm64 while the clone's node_modules was installed
   on darwin-arm64, so `tsx` from the clone dies on an esbuild platform mismatch; a private linux `tsx`
   installed outside the repository fixes it and touches nothing of the owner's. With that, this session
   ran `scripts/checkTenantZero.ts`, `scripts/cardPreflight.ts` and `scripts/mail-wait.mjs`'s
   `preflightVerdict` directly, on a clean worktree, for the first time.

## THE FIRST MEASUREMENT PER SECTION 11 — THE REGISTER'S CARRIER TABLE

CARRIED UNVERIFIED from the v135 bootstrap: REGISTER-BUG-BUCKET is at v54 and was not advanced in S134,
which is a failure of the register's own carrier test. NOT RE-MEASURED at S135 open, because the
register's section 5 lives in the project box and the reading was not performed before this document was
cut. It is recorded here as an OPEN finding, not as a fact.

## THE TWO GATES, AND THEY AGREE ON THESE BYTES

S134 recorded that local `cardPreflight` returned GREEN on a body the repository's `mail-wait` refused on
CP-1, CP-3, CP-4, CP-5, and that which of the two is stale was UNMEASURED. On CARD-ENTITY-SCOPE-TENANT-
REPAIR-1-S135-1-v1 both instruments were run on the SAME bytes before insert:
`cardPreflight --check` -> GREEN, eleven of eleven.
`preflightVerdict` imported from `scripts/mail-wait.mjs` -> {"state":"PASS"}.
This settles nothing general. It measures agreement on ONE body, and the S134 disagreement stands
unexplained on the body that produced it.

Both gates were run BEFORE insert, and both refused earlier drafts of this card — CP-1 on a bare
commit-shaped token in prose and on a CLAIMS grammar the Architect wrote from memory, CP-2 twice on a
count with no enumerated members. Three real defects, caught by the instrument rather than by a reviewer.

## WHAT WAS INSERTED

relay_inbox row 82843408-e2ba-4093-b86c-ed398e77a9be, direction to_lane, lane AG-4,
artifact_name CARD-ENTITY-SCOPE-TENANT-REPAIR-1-S135-1-v1, created 2026-09-09T16:28:34Z, 12608
characters, md5 c87c94a62d6e395d24e1e15847e42afa. The insert carried an md5 AND a sha256 WHERE
precondition recomputed server-side, so a mangled body would have written zero rows; the returned md5
equals the file's, so the row and the file are the same bytes.

## THE SCOUT REFUSED THE ARCHITECT'S SHAPE, AND IT WAS RIGHT

ORDER-S134-ADVERSARY-REVIEW-TENANT-ZERO-REPAIR-1 was answered in three parts at 2026-09-09T16:20:45Z,
16:20:56Z and 16:21:07Z, split because the server refused a body over 8192 characters. The scout refused
the proposed repair shape and its three reasons are carried into the card by name:
- gate-green is not tenant-zero: the gate is an eight-token allowlist, and satisfying it exactly leaves
  real tenant names and one real production UUID standing in the file it claims to have cleaned;
- the neutral namespace already exists at item G4 of FLOOR-TENANT-SPLIT-1, the sibling of the gate at
  item G7, so the proposal would have rebuilt it a third time in two sessions;
- a rewrite that "completes" the parentage map deletes the empty-is-not-zero case while every assertion
  still passes.

ONE PLACE THE ARCHITECT WENT FURTHER THAN THE SCOUT, and it removed an owner gate the scout proposed:
the scout held the report repair pending an owner ruling on whether a landed relay report is append-only
history. MEASURED: `git cat-file -e origin/master:docs/relay/ENTITY-SCOPE-BY-RESOLVED-PEER-1-S134-1-AG4-
report.md` returns "Not a valid object name". The report is NOT landed. There is no history to protect and
no ruling to make; it is an unlanded draft of AG-4's, and AG-4 repairs it. The scout could not see this
because it reads GitHub and not the object store.

ONE PLACE THE TWO LENSES DISAGREE, recorded rather than reconciled: the scout named thirteen ungated
tenant lines in the test file; the Architect's own grep names fourteen, the extra being line 81. The card
orders the UNION and names both lenses.

## WHAT IS STILL SILENT

Steps 9 and 10 of build (24.x) — Build, and Run tests — are SKIPPED behind the failing tenant-zero step at
the current branch head and have never spoken about this seam. The narrowing is therefore neither proven
nor disproven, and no report may fold those two steps into a green.
