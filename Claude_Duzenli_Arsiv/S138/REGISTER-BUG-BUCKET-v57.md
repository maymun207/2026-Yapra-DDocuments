# REGISTER BUG BUCKET — v57 (S138 open)

<!-- Appends to v56 (S120). Append-only ledger: an item leaves only by CLOSED@evidence /
     SUPERSEDED-BY / MERGED-INTO. Ground: origin/master
     88d7a11cd4667ac0b6cb37b6779f6308ad54abc9, anchor verified against
     CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v139 at 2026-09-14T07:42Z from the owner's clone.
     Cut to discharge first job 3 of that bootstrap: "Repair it or close it; do not tick it a
     fifth time." -->

## 0 · WHAT THIS VERSION IS FOR

The bootstrap ordered the bucket repaired because four registers called it stale at v54. **It was
never at v54.** v55 was minted at S117 and v56 at S120; both have been on disk in the documents
repository the whole time. The wrong row is filed as
`F-S138-THE-BUCKET-WAS-NEVER-AT-V54-1`, in this directory, with the four carriers that repeated it
and the one bootstrap that measured it correctly and was ignored.

So this version does not repair a stale bucket. It repairs the LEDGER'S ACCOUNT of the bucket, and
then advances the bucket honestly for the first time since S120.

## 1 · THE CARRY GAP, NAMED RATHER THAN HIDDEN

v56 was minted at S120. **S121 through S137 closed without minting a bucket — SEVENTEEN sessions.**
v56's own header names the same class for S118 and S119 and refuses to reconstruct them; that refusal
is correct and is inherited here.

**THIS VERSION DOES NOT RECONSTRUCT S121-S137.** Those findings were not lost: they live by name in
`cwf-open-items-register` v124 through v127, in the `CWF-S<n>-FINDINGS` carriers, and in this archive.
Reconstructing them into a bucket from a register would be a derived view copied into a ledger, and a
derived view is not a source. The gap is recorded here as a known, dated hole with a pointer to where
those names actually live.

## 2 · CLOSED, WITH EVIDENCE

| name | closure |
|---|---|
| `REGISTER-BUG-BUCKET STALE AT v54` (the register row, four carriers) | CLOSED@ the find over the archive recorded in `F-S138-THE-BUCKET-WAS-NEVER-AT-V54-1`. The bucket is at v56; the row was wrong, not late |
| `F-S135-REGISTER-BUG-BUCKET-STALE-AT-V54-1` | RE-FILED IN THE OPPOSITE DIRECTION, as `CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v136` ordered on 2026-09-11 and three registers did not do |

## 3 · OPEN — MEASURED AT S138 OPEN, NAMED, NOT FIXED

| name | substance |
|---|---|
| `F-S138-THE-SHARED-CLONE-MASTER-IS-FIFTY-FIVE-BEHIND-1` | The shared clone's checked-out `master` is `0cae062c130b99a94df825f3481537b8251d23b2`, zero ahead and fifty-five behind `origin/master`. A lane that branches without pulling starts from S137's first landing. Cards must name a BASE at full forty-hex, not "master" |
| `ARCHITECT-CANNOT-RUN-THE-REPOSITORY-GATES-1` | Re-measured live: `npm run architect:open` on the bridge dies in esbuild — the clone's `node_modules` carries `@esbuild/darwin-arm64` and the bridge is `linux-arm64`. Section 0 of the project instructions requires an `architect:open` reading at every session open; that reading is **NOT-READ** and will stay NOT-READ until a lane produces it. The repair is NOT `npm install` in the owner's clone: that would rewrite the toolchain the lanes use on macOS |
| `F-S133-BRIDGE-VM-HAS-NO-GITHUB-CREDENTIAL-1` | Re-measured live at 07:41Z: `git fetch` fails with "could not read Username for https://github.com", and `gh` is not installed on the bridge at all. Standing, unchanged |
| `THE ARCHIVE PUSH` | Now **SEVEN** commits ahead of `origin/main` `4b773c1e6b7f4f573e6a7674310e5d6fc0846baa`, not the six the bootstrap carried: `ba9e629c76cca8369d530a3cc555c23eaeb77fe4` was cut after the bootstrap read. Working tree clean. Still needs a lane |
| `PR 547` | AG-4's landing report for `#546`. Open. Needs a lander that is not AG-4 |
| `NO LANE IS BEATING` | AG-4 last beat 2026-09-14T00:24:57Z, AG-5 at 00:25:44Z, both about seven hours and twenty minutes before this cut; AG-1, AG-2 and AG-3 last beat on 2026-09-10; scout and operator CLOSED. **A dark beat is not proof of sleep** (section 12.11) — but no output has appeared since 20:59:02Z and the clone was never pulled, so the honest reading is that the windows are closed |
| unconsumed bus rows | `SLIP-LAND-ASK-RENDERED-TWICE-S137-1-v3-AG4-BLOCKED` (from AG-4, 20:26:58Z) and `HOLD-NO-MORE-PUSHES-TO-ASK-RENDERED-TWICE-S137-1-v1` (to AG-5, 2026-09-12T20:40:49Z) both carry `consumed_at` null. The HOLD is now moot — its subject landed — and should be retired by name rather than left to be read cold by a waking lane |

## 4 · CARRIED FROM v56, UNCHANGED

Everything in v56 section B that no evidence below closes. The S118-S119 hole named in v56's header
stands as v56 wrote it, now widened to S121-S137 by section 1 above.

END-OF-BUCKET REGISTER-BUG-BUCKET-v57
