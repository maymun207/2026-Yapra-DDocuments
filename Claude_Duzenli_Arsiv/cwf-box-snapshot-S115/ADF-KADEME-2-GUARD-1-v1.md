<!-- relay-audit: v1 kind=card prov=1 -->
# ADF-KADEME-2-GUARD-1-v1
The bash guard is not firing; boots prove the gate or stop; merge and secrets get absolutes
fanout: personalized - one address, AG-4.

## PREMISE - MEASURED @2026-08-22T19:40:00Z, free lane and foreman
- MEASURED: python3 -c "print('gate probe')" --force EXECUTED unblocked in an IDE window and the terminal-launched foreman; the same string fed to guard-bash.py exits 2
- MEASURED: printenv CLAUDE_PROJECT_DIR in Bash - unset; settings.json names the hook as $CLAUDE_PROJECT_DIR/.claude/hooks/guard-bash.py
- MEASURED: /hooks in an IDE window - not available in this environment
- MEASURED: git grep origin/master - nothing reads ADF_LANE_ROLE; guard-bash.py imports json re sys only
- MEASURED: fed to guard-bash.py - gh pr merge -s and --rebase return 0; --squash and --admin exit 2
- MEASURED: git status - .claude/hooks/__pycache__ untracked, not ignored
- UNMEASURED: why the harness skips the hook; the hook launch log is unreachable from a lane
- UNMEASURED - relayed by the owner: consent onay ADF-KADEME-2, 2026-08-22
SELF-INVALIDATION: decays on the first push to master after the floor, and on any harness upgrade the owner reports.

## FALSIFIER
A boot proceeding past an unblocked probe falsifies order B; gh pr merge with flags other than exactly --auto --merge, or without the foreman role, reaching gh falsifies C; a Read or Bash opening a secret-bearing file falsifies D.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the floor is the commit in evidence:floor | MEASURED: git ls-remote origin refs/heads/master | floor |
| the guard does not fire today | MEASURED: the probe executed unblocked in two windows of different launch kind · the same bytes fed to the script exit 2 | inline |
| the hook path depends on an env var | MEASURED: grep CLAUDE_PROJECT_DIR on origin/master .claude/settings.json | inline |

```evidence:floor
$ git ls-remote origin refs/heads/master
922ef571a4d8e1c6c9dd751d6c20f6ec144b3eea	refs/heads/master
```

## STANDING ORDERS
- consumed_at is RETIRED. You do not merge. A harness refusal to write .claude/** is a MEASUREMENT: print it verbatim, commit what you could, report; the owner's hand is the named fallback, never a route-around.

## ORDERS
```scope
- A · Path. The hook command drops CLAUDE_PROJECT_DIR and resolves the script from git rev-parse --show-toplevel via a one-line wrapper, so workspace roots and IDE launches hit the same file.
- B · Boot probe. Every .claude/boot/*.md runs python3 -c "print('gate probe')" --force as its FIRST bash call; if it executes, print GATE-INERT and STOP before claiming an address. A blocked probe is the positive control, printed.
- C · Merge absolute. guard-bash.py: gh pr merge with any flag set other than exactly --auto --merge exits 2 (covers -s -r --rebase --squash --admin); gh pr merge when ADF_LANE_ROLE is not foreman exits 2; one red test per case.
- D · Secrets. A PreToolUse hook on Read and Bash refuses .env, .env.*, *.local.json and anything under ~/.claude/ with exit 2 and the path printed; the free boot states the rule in prose too.
- E · .gitignore gains __pycache__/; remove .claude/hooks/__pycache__.
```

## SHARED SURFACES
.claude/hooks/** and tests ...... AG-4 sole owner
settings.json, settings.foreman.json ... AG-4, hook lines only
.claude/boot/*.md ............... AG-4, probe paragraph only; AG-3 owns foreman.md section 1 on PR 349 - rebase onto it if it lands first
.gitignore ...................... AG-4

## DECISION RIGHTS
wrapper shape ....... AG-4
probe wording ....... AG-4; the STOP is the Architect's
secret path list .... AG-4 may widen, never narrow

## DELIVERY
- Branch phase/adf-kademe-2-guard from the measured floor; push early.
- Report docs/relay/ADF-KADEME-2-AG4-report.md plus JSON twin; your own window's probe transcript before and after, verbatim.
- Open the pull request against master; do not merge it.
- Report opens with read relay_inbox at <ISO> - read OK - N rows since ADF-KADEME-2-GUARD-1-v1; closes with git status --porcelain -uall and git worktree list.
