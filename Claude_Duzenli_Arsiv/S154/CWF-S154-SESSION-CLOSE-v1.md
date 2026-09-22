# CWF-S154-SESSION-CLOSE-v1

S154: 2026-09-22 06:30 TSI -> ~15:35 TSI. Opened from bootstrap v155 section 1 (all five steps). A three-hour network outage (about 07:10-10:00 TSI) cut the bridge and dropped scout bus writes.

## 1 · WHAT LANDED ON MASTER (MEASURED: GitHub API, Vercel MCP)
- PR 592 digest span cap (item 54): merge 9aba71fe2cbad0c53f3996d01b8991e5bbe40ed4 at 2026-09-22T03:57:16Z (06:57 TSI). Root cause of the rule26 timeouts, found by AG-4: a VALUE import of a constant from api/ into src/ that the Vite dev server 404s, so the admin preview never rendered. Fixed via shared/dbConstants plus a new noRuntimeApiImport test. Scout GREEN, all CI green by full sha, Vercel production READY on 9aba71fe2cbad0c53f3996d01b8991e5bbe40ed4.

## 2 · NOT LANDED, ONE MEASURED REASON EACH
- PR 593 (G1a-1, item 58): head d23bde41100167caf97a7e0b02661915bba87690, all four CI runs success by full sha at 12:32Z, blocked ONLY on adversary/scout. Branch was green from 10:23Z; ORDER-SCOUT-LAND-PR593-S154-1-v1 was dispatched only at 12:31Z. Reason it missed 30 minutes: the Architect did not read the bus between 11:22 and 15:29 TSI (owner away, no wake). A-ERR-S154-30MIN-MISSED-NO-BUS-READ.
- Item 46 password rotation: v4 ORDER 0 STOPPED correctly (SLIP-LANE-PASSWORD-ROTATION-S154-1-ORDER0-STOP, 08:30Z): the secret's home is ~/.zshenv line 1 (not in the card's file list); launchd is UNSET. No password generated, no ALTER. Needs v5 with home = ~/.zshenv and NO launchd step. DUE date 2026-09-22 MISSED; new date 2026-09-23 morning.
- G1a-2 (turn path): scout RED (A1): 144 active tool names have two owners (140 shared by armes and armes-new, 4 by honestbench and mount-probe); armes-new is lifecycle retired but enabled true; a gateway name active only on armes-new would be refused naming a retired backend. v2 must key the mirror on enabled AND lifecycle active, and define a multi-owner rule. Plus CP-2 on the collide fence.
- Item 30 fetch-proxy card: scout review ordered 04:09Z; no status on the bus at 12:30Z (UNMEASURED whether reviewed).

## 3 · ARCHITECT ERRORS, BY NAME
- A-ERR-S154-SOTA1-NOT-FIRST-LINE (repeat of S153).
- A-ERR-S154-PRUNABLE-READ-AS-DEAD: called AG-4 dead because git marked its worktree prunable; the path was on the owner's /private/tmp, invisible to the bridge. AG-4 was waiting on a permission prompt.
- A-ERR-S154-CARD-GAMMAR-HEX: a 12-hex digest-of-empty in prose tripped R-TRIP-HEX; caught locally before insert.
- A-ERR-S154-30MIN-MISSED-NO-BUS-READ (section 2).
- Password card went four versions; each RED was a real defect (quiesce, 28P01, operator MAY list, slip on old value). The fourth still assumed the home list without measuring it.

## 4 · OWNER RULINGS AND CONTRIBUTIONS
- OWNER-APPROVAL-S154-LANE-ROLE-ROTATION-1 (11:09 TSI), bus copy kind=ruling 08:23:03Z.
- Plan approval "onayliyorum" 06:40 TSI.
- Owner correction 06:40: AG-4 was alive (permission prompt).
- Owner question 11:09: when does automatic two-way lane messaging go live -> answered: items 30 -> 17 -> 55 v4, target Wednesday afternoon (estimate).

## 5 · CAPABILITIES MEASURED THIS SESSION
- Relay DB gate relay_adversary_gate_check read from pg_proc: card to AG-n needs `evidence:adversary` with GREEN verdict row (scout from_lane, reply_to set, sha256 of canonical body) or EXEMPT with ack to a scout row or a kind=ruling row; exempt kinds capped at 8192 chars.
- Architect Supabase MCP can execute_sql (no GM-1 in this window); lanes' windows cannot.
- Bridge git commits leave lock files unless gc.auto=0 and maintenance.auto=false; delete permission granted for the doc repo.
- cardPreflight bundled with esbuild to ~/cp.mjs runs the relay-audit grammar on the bridge.

## 6 · STATE AT CLOSE
master 9aba71fe2cbad0c53f3996d01b8991e5bbe40ed4; Vercel READY on it. Doc repo: local HEAD ahead of origin/main 058f2259476bb52c6e7e00c6f1164d1332cfd800 by the S154 commits (count in bootstrap), not pushed.
END · CWF-S154-SESSION-CLOSE-v1
