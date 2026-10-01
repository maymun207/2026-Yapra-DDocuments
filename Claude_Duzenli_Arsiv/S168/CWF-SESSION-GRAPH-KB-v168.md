# CWF-SESSION-GRAPH-KB-v168
Edges learned in S168 (2026-09-30T22:08Z – 2026-10-01T03:20Z). Each edge is tagged with its session. The v167 edges still hold and are not repeated here.

[S168] `cwf-architect-ro/gh.sh` → `takes a PATH under /repos/maymun207/cwf_yaprak (e.g. commits/master), or a leading-slash path under api.github.com`. Passing a full `repos/<owner>/<repo>/…` path returns 404.
[S168] `bridge git fetch with the read-only token (http.extraheader Basic auth, --shared clone of the cwf_yaprak mount at $HOME/mg)` → `works`. Push does not work, and job logs return 403.
[S168] `scripts/mergeGuard.mjs run on the bridge` → `needs NODE_USE_ENV_PROXY=1 and GITHUB_TOKEN from the gh token file`. Without them every API read is "fetch failed".
[S168] `tsx on the bridge (arm64)` → `needs ESBUILD_BINARY_PATH pointing to @esbuild/linux-arm64@0.27.0 (npm pack into $HOME/esb)`.
[S168] `node_modules symlink INSIDE a worktree` → `makes check:backend-names refuse to measure`. Put the symlink at $HOME/node_modules instead.
[S168] `merge guard COLLISION rule` → `an open lower-numbered PR with an unreadable fence holds every higher PR red ("YIELDED-TO #658")`. Closing the lower PR and re-running the higher one clears it (659 landed after 658 was closed).
[S168] `relay_inbox schema` → `direction ∈ {to_lane, from_lane}, lane_addr, artifact_name, body, consumed_at`. There are no from_lane/to_lane columns.
[S168] `Claude Code auto-mode classifier in a lane window` → `can deny a read-only git diff with no reason`. A scout that respects the refusal leaves the PR without adversary/scout.
[S168] `scout window after a long stall + /clear + boot` → `drains every queued card, including stale S167 ones, within about 5 min of the reboot`.
[S168] `owner asleep + 3-min self-timer` → `about 20 no-change turns per hour`. Waiting on the owner needs a different wake than waiting on lanes.

END · CWF-SESSION-GRAPH-KB-v168
