# CWF-S168-FINDINGS-v1
Each finding below is listed by name with its register row. Cut together with CWF-S168-SESSION-CLOSE-v1 (2026-10-01T03:20Z).

- **F-S168-SELF-TIMER-FLOOD-1 (row 196).**
  - What happened: the only blocker was an owner paste, and the owner was asleep. The Architect still re-armed a 3-minute self-timer, about 65 times between 22:53Z and 03:12Z. Every one became a no-change turn. The owner's verdict: "cok fazla auto turn".
  - Why: the 3-minute cap was written for waiting on lanes. It was applied to waiting on the owner, where no lane can move.
  - Fix proposal (needs an owner ruling): when every named blocker is an owner act, send ONE ⚡ and stop the timer. The owner's next message is the wake. Timers run only while a lane or CI can still move.
- **F-S168-SCOUT-CLASSIFIER-DENIES-GIT-DIFF-1 (row 197).**
  - What happened: in scout-2's window, the Claude Code auto-mode classifier denied the read-only `git diff --stat 731c1ee4...ac51ca99` and gave no reason. `git log` over the same range ran. Without the diff, the scout cannot check CLAIMS against it, so 660 has no adversary/scout status.
  - Fix: add a `git diff` allow line through row 189 (the PROMPTS ⚡). Until then, scout-1 reviews 660.
- **F-S168-SCOUT-HOLDS-NO-LANE-REF-1 (row 198).**
  - What happened: mail-wait's heartbeat printed "no ref refs/heads/lane/scout-2 on origin". BOOT-LANES-S168-1 says the window holds its address by a lane ref, but scouts hold none.
  - Fix: correct the boot text in the next BOOT-LANES version.
- **F-S168-SCOUT-CARD-LATENCY-1 (row 199).**
  - What happened: scout-2 received cards 4–6 h after insert, because its window was stuck.
  - Second problem: on reboot it drained S167 backlog rows and replied to them, which adds noise.
  - Fix direction: same as 185 (SCOUT-ACK makes pickup visible). Also, when a reboot follows a long gap, scouts should skip cards superseded by a later notice.
- **F-S168-BRIDGE-CAN-RUN-GUARD-1 (capability, no row).**
  - The bridge can fetch from GitHub with the read-only token, using an http.extraheader into $HOME/mg.
  - It can also run the merge-base `scripts/mergeGuard.mjs` with `NODE_USE_ENV_PROXY=1`. That is how the Architect read 658's NO-FENCE and 659's COLLISION verdicts without a scout.
  - Job logs are still 403.
- **A-REC-S168-1..3** are listed in the session close §3. A-REC-S168-3 (cutting a notice without reading the branch head) breaks mechanical rule ① again.

END · CWF-S168-FINDINGS-v1
