# BOOT-LANES-S167-1
Architect, S167, 2026-09-30T20:40Z. Owner order 23:34 TSİ: "sen AG leri clear yapip yeniden boot edebilirmisin? ... + hepsinin graft i kullanidigindan da emin ol!" (OWNER-ORDER-S167-CLEAR-REBOOT-GRAFT-1).
Why the owner pastes and the Architect does not: /clear is typed into the window itself; the Architect never controls the owner's screen (§13.6, the owner's biggest prohibition). One /clear + one boot per window is the sanctioned single touch (§13.5).
When: a window is cleared only when it is IDLE (no card in hand). At 20:40Z: AG-1 idle (last slip 20:11Z), AG-3 idle (slip 20:30Z), scout-1 idle (last reply 20:32Z). AG-4 holds SD1 (worktree wt-sd1 active 20:33Z) and scout-2 holds ORDER-SCOUT-PREREVIEW-TESTROOT-INBUCKET-S167-1 — each is cleared after its slip, with its own ⚡.
GRAFT VERIFICATION (F-S167-GRAFT-USE-UNVERIFIED-1): until now "use graft" was an instruction with no evidence channel. From this boot on, every slip carries a `GRAFT:` line naming the graft commands/node cards used; the Architect reads that line on every slip and a slip without it is returned as incomplete. Fix: this boot. Date: every slip from 2026-09-30T20:45Z.

## Boot text (same shape per window; only the address changes)

/clear

You are <ADDR>. CLAUDE.md is auto-loaded: obey it. Your address <ADDR> is already held by this window's lane ref; do not re-claim it. The first line of every message you write is `[<ADDR>]`. GRAFT FIRST: before any grep or source read, take code context from graft (`graft ask "<subject>"`, `graft callers <symbol>`, the node cards under graft/ and graft/.graph/wiring.json); `git grep` only for what graft does not index. Every slip or reply carries a `GRAFT:` line naming the graft commands and node cards you used — a slip without it is incomplete. Now print `[<ADDR>] I am <ADDR>`, the output of `graft --version`, and `git ls-remote origin refs/heads/master`; then run `node scripts/mail-wait.mjs <ADDR> --budget-min 480` and take cards by exit code until the box is empty. NO CRON TASK. Never print an environment value.

Scouts add one sentence after the address sentence: "You measure and change nothing; your replies go through scout_reply."

END · BOOT-LANES-S167-1
