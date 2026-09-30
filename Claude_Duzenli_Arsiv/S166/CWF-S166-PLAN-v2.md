# CWF-S166-PLAN-v2
Architect, S166, 2026-09-30T18:50Z. SUPERSEDES CWF-S166-PLAN-v1 (v1 §0–§2 stand; this version adds item ZERO in front of item one).
Owner order 21:45 TSİ: "18 dakika beklemek olmaz ... beklemeyi minimuma indirecek çözümü BUL" (OWNER-ORDER-S166-NO-WAIT-1).

## 0 · DIAGNOSIS OF THE WAIT (MEASURED 18:45Z on the bridge)
- AG-3 consumed NOTICE-M3-FRESH-BRANCH-S165-1 at 18:22:26Z. Its worktree metadata (.git/worktrees/wt-m2 in the shared clone, readable from the bridge): HEAD → phase/m3-feedback-evidence-s165-3 at 18:22:45Z; index last written 18:23:20Z (tree checked out); NO commit since. 22 min with no git write = the window is stopped, not "proving" (5× one test file is seconds).
- .claude/settings.json allow-list (100 allow, 0 ask): `git checkout -b` and `git checkout --detach` are allowed; the card's `git checkout <sha> -- .` is NOT; `gh pr close` is NOT. A command outside the allow-list makes the lane window wait for a human click — silent from the bus, the pooler and GitHub. Most likely cause of the stop: a permission prompt. (Not proven: the Architect cannot see the window.)
- Card order was proof → push → PR: nothing visible leaves the window until the end, so a stop and a slow proof look identical for the whole card.
- NEW LENS, zero cost: the shared clone's .git/worktrees/<wt>/{HEAD,index,logs/HEAD} mtimes show a lane's git progress minute by minute from the bridge.

## 0 · ITEM ZERO — LANE-NO-WAIT-1 (register row 178, new)
Z1. NOW: owner ⚡ for AG-3 — answer the waiting permission prompt ("Yes, and don't ask again"), or paste the one-line resume if none. WHEN: this turn.
Z2. CARD LINT BEFORE SEND (Architect, machine step, from this tick on): every command a card orders is checked on the bridge against .claude/settings.json allow; a card with an un-allowed command is not sent — rewritten to an allowed form or the allow-list is extended first.
Z3. ALLOW-LIST CARD (AG-4; NEW subject → scout-1 pre-review, short): add the verbs cards really use (`gh pr close`, `git checkout <sha> -- <path>` form, `git diff --stat`, `git ls-remote`) — guard-bash hooks stay the safety net. WHEN: card tonight, landed with the next wave (~1 h).
Z4. PUSH FIRST: every card orders commit → push → open PR in its first steps; local proof AFTER, while CI (the certificate, ~15 min) already runs. A card's first visible output is due ≤ 5 min after consumed_at.
Z5. 5-MINUTE WATCHDOG: each 3-min tick reads consumed_at + worktree mtimes + remote branch. No git write for 5 min after consumption → owner ⚡ the same tick (not 30 min later).

## 1 · ITEM ONE — LANDING-THROUGHPUT-1 (row 177) — as v1 §1 (parallel PRs, strict OFF, ADF_MERGE_TOKEN, mail-wait retry, 169 measure, card discipline).
## 2 · THEN — as v1 §2.
END · CWF-S166-PLAN-v2
