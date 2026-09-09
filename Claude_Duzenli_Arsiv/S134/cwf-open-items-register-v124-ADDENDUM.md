# cwf-open-items-register-v124-ADDENDUM — one item, discovered AFTER v124 was cut

v124 is delivered and IMMUTABLE (S37-1). This addendum does not rewrite it; it SHARPENS one open item
with a cause measured after v124 was already in the owner's hands.

## ARCHIVE-NOT-PUSHED — the cause is now measured, and it is WORSE than v124 said

v124 recorded: "the documents repository is ahead of its remote and unpushed; the bridge VM holds no
GitHub credential."

MEASURED at 2026-09-09T16:1Z, after that line was written: the repository cannot even COMMIT locally.
Two stale git lock files block it, left by a git process that crashed in that repository earlier:

```
.git/index.lock
.git/HEAD.lock
```

Both refusals printed verbatim by git: "Another git process seems to be running in this repository...
If it still fails, a git process may have crashed in this repository earlier: remove the file manually
to continue." Attempting to write objects also printed fourteen `unable to unlink ... tmp_obj_...
Operation not permitted` warnings, which is the same restriction seen from the other side.

The Architect ATTEMPTED A LAWFUL WORKAROUND and it failed, recorded so nobody repeats it: setting
`GIT_INDEX_FILE` to a scratch path and running `read-tree` + `add` + `commit` avoids `index.lock` but
NOT `HEAD.lock`, because the commit must still move the ref.

**THE BRIDGE SHELL CANNOT DELETE FILES.** `rm`, `rmdir` and `unlink` on a mounted path answer
"Operation not permitted" by design. So the Architect cannot clear the locks, and did not ask the owner
to delete them by hand: that is machine work and routing it to his surface would breach S102-YASA-1.

## STATE OF THE ARCHIVE AT CLOSE, stated without softening

- All twenty-four S134 artefacts, including the five closing carriers and
  `CLAUDE-PROJECT-INSTRUCTIONS-v5_10.md`, are **ON DISK** under `Claude_Duzenli_Arsiv/S134/`.
- The last COMMIT in that repository is still `ee58896474b8e02d42d1cae4f0211784964d427c`, dated
  2026-09-09T02:16:29Z, which contains only the two artefacts committed early this morning.
- Everything written after that moment is **UNCOMMITTED AND UNPUSHED**. It is not archived. It is
  files sitting in a working tree.
- `git rev-list --left-right --count origin/main...HEAD` reads `0 1`: one local commit ahead, nothing
  behind, nothing pushed.

## WHAT CLEARS IT — a lane, not the owner and not the Architect

A producer lane has a full shell on that machine and is not subject to the bridge's delete
restriction. The next session's FIRST archive card orders, in this order:

1. Delete `.git/index.lock` and `.git/HEAD.lock` in the documents repository, and print `git status`
   afterwards to prove the repository is usable.
2. Commit the S134 tree — twenty-four files under `Claude_Duzenli_Arsiv/S134/`, count them rather than
   trusting this number.
3. Push, then READ THE REMOTE BACK (`git ls-remote`) rather than trusting the push's own output.
4. Clear the nine untracked NFD-decomposed Turkish filenames under Projeler, which are still there and
   which a probe that does not handle `core.quotePath` will miss.

UNTIL THAT CARD RUNS, THIS SESSION'S CLOSE IS NOT ARCHIVED. It exists in the claude.ai project box and
on the owner's disk, and in neither case in git. A future session that assumes otherwise will be
reading files that were never versioned.

END · cwf-open-items-register-v124-ADDENDUM
