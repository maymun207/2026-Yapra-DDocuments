# S128 · DISPATCH RECORD 1 — the archive-push card, its scout round, and its dispatch

CUT 2026-08-30 ~04:0xZ, mid-session. Every bus row below is reproducible from `relay_inbox`
by `created_at` and `artifact_name`. This record is the carrier the S126 mode addition
demands: the scout verdict, and the one named bypass, both by name.

## THE CHAIN

1. **The audit that forced the card** (owner order: "document reposunu kontrol et — local git
   ve GitHub'da aynı şekilde olması lazım"): the archive repo's committed tree held S115–S124
   complete, but S125 and S126 folders DID NOT EXIST and S127's three files sat untracked.
   The v128 bootstrap's "S127 archive done" meant written-not-landed —
   F-S128-ARCHIVE-DONE-MEANT-WRITTEN-NOT-LANDED-1, ledger item. The Architect placed the
   twelve missing S125/S126 files from the project-box originals and verified all fifteen
   session files sha256-identical on both sides of the bridge (S127's three: byte-identical
   round-trip positive control first).
2. **A-REC-S128-NFD-RELENS-1 (Architect defect, self-caught before dispatch):** the Architect
   reported nine Turkish-named files to the owner as "untracked, should we commit them?" —
   they are NFD phantoms of files ALREADY TRACKED under NFC (F-S125-NFD-LENS-1), documented in
   the very precedent card the Architect had just read (CARD-ARCHIVE-PUSH-S123-1-v3). Measured
   cure: `git ls-tree` resolves every phantom to a tracked path; the card stages fifteen, not
   twenty-four, and carries the phantoms fence.
3. **CARD-ARCHIVE-PUSH-S128-1-v1**: cardPreflight (landed instrument, run by the Architect via
   the strip-types scratch lens — tsx dies on the darwin-arm64 esbuild in the owner clone, the
   v127-noted case) — TWO RED ROUNDS, both real (CP-3/CP-9: wrapped premise lines without
   instruments + missing read-instants; then CP-1: a bare 40-hex in premise prose), then
   GREEN 11/11. Inserted to the scout box 2026-08-30T03:45:14Z, RETURNING sha256 compared
   equal to the file (660c1cbbf48599a43f53902e4de377e44d817520b8d130d9664f1dea5c142fc4).
4. **SCOUT VERDICT — PASS-WITH-NOTES**, artifact_name
   `SCOUT-CARD-REVIEW-CARD-ARCHIVE-PUSH-S128-1-verdict`, from_lane, 2026-08-30T03:50:51Z,
   row id 632bd40c-425e-40d5-b8cc-d30fb14e1587. The scout re-derived on a THIRD lens (macOS):
   REACH present, HEAD equal, all fifteen digests matching, invariant holding, no live lock,
   preflight GREEN — "could not fault one measured claim". Four notes: (a) the SCOUT block's
   guarantee was CIRCULAR (satisfied by its own arrival); (b) the locks fence under-enumerated
   .git/ (seven HEAD.lock remnants unnamed); (c) no fresh-box clause on a card that deletes and
   pushes — and CP-11's green was VACUOUS, third time this pattern, its regex knows none of
   this card's verbs (ledger item, joins the CP-11 AWS-verbs cure); (d) ORDER F had no arm for
   first-push-lands-second-push-fails. Disclosed side effect: its status read refreshed the
   index stat-cache mtime.
5. **CARD-ARCHIVE-PUSH-S128-1-v2**: all four notes incorporated and mapped line-by-line in the
   supersedes fence; the SCOUT block now names the verdict row instead of inferring it;
   preflight GREEN 11/11; sha256
   729c35e5b321f349b225e6afa323ba1a31375e82e02c8a65729951af608934e4 on disk, in the project
   box, and in the archive's S128/ folder, all equal.
6. **DISPATCHED to AG-5**: 2026-08-30T03:58:46Z, row id 27810b80-e40b-44c8-b447-f636c61c6dde,
   RETURNING sha256 compared equal — digest-checked transport, no hand-carry.

## THE SCOUT REQUIREMENT, ANSWERED THE WAY THE SCOUT ASKED

- Verdict named: the PASS-WITH-NOTES row in item 4 — that is the scout verdict this card
  carries.
- **ONE NAMED BYPASS**: the v1→v2 DELTA did not receive a fresh scout round before dispatch.
  Justification, named rather than implied: every delta line is one of the scout's own four
  asks incorporated, mapped in the supersedes fence with nothing else changed but the version
  stamps; the world-model the scout PASSed is byte-unchanged in v2 (same premise readings,
  same fifteen digests, same orders' substance). If the scout, on reading v2 from the archive
  or this record, finds a delta line that maps to nothing — that is a RED by v2's own
  supersedes rule and stops the card wherever it stands.

## STATE AT CUT

AG-5 window RUNNING idle (heartbeat fresh at 03:16:54Z read; MAIL-WAIT polls its box), card
row unconsumed at cut. The Architect holds the archive working copy frozen until the card
closes. The 07:10Z budget-fence run remains a future sensor with a reminder set for 07:20Z.
Next after this card closes: the land.ts steel (GATE-1 ⓶), then the ledger re-entry card,
whose S128 additions so far are: F-S128-ARCHIVE-DONE-MEANT-WRITTEN-NOT-LANDED-1 ·
A-REC-S128-NFD-RELENS-1 · the CP-11 vacuous-green third occurrence · the bridge-VM
unremovable-lock trap (recurring since S121; cure candidate: GIT_OPTIONAL_LOCKS=0 for every
bridge-shell git read) · the GitHub-403-is-private-repo-auth diagnosis (three sessions,
now measured; register item per v128 §0).

TAIL ANCHOR: S128-DISPATCH-RECORD-1 ends here.
