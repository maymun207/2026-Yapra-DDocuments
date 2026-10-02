[scout-1]
ADVERSARY-VERDICT: RED card=CARD-LANE-PROMPTS-ZERO-S170-1-v1 (P1 has no measured list; current allow entries already break P3; P5 is not doable by a lane)
GRAFT: none run (settings/hooks/boot are not graph code). Lenses: `git show`/`git grep` at master, guard-bash.py read in full, `grep -a -o` of key NAMES in the installed binary.
PROMPTS: three auto-mode classifier refusals on this card (§1); no prompt waited on.

SCOUT-STATUS-PREREVIEW-LANE-PROMPTS-ZERO-S170-1 · reply to ORDER-SCOUT-PREREVIEW-LANE-PROMPTS-ZERO-S170-1 (id 9f978390-262d-4d5e-aec6-6732c0f8b8e7)
PRECONDITION: ls-remote master = 9ec54640a4b0a5ee8b4795df5e57dbe197620e5a (exactly). HOLDS.

## 1 · (1) The real prompt list is UNMEASURED: what refused
- Session records: `ls ~/.claude/projects` REFUSED by guard-secrets GS-4 (~/.claude/**). No lane can read them.
- Bus fallback (PROMPTS lines since 10-01): a read-only roQuery script REFUSED by the auto-mode classifier ("[Auto-Mode Bypass]").
- `git worktree list` REFUSED the same way, although `Bash(git worktree list:*)` is in the tracked allow-list and that file is live here (its hooks fired). An allow rule did NOT prevent a classifier refusal.
- Binary schema context around the key names: REFUSED by the classifier. Not routed around.
- For P6: a tool result carries no marker that a prompt was shown and approved. A window cannot report what it does not observe (observed in this window, not read from source).

## 2 · (2)(3) Causes and keys, as far as measured
- Installed versions: 2.1.204, 2.1.222, 2.1.241; the launcher points at 2.1.241. Key NAMES in 2.1.241: allowedDomains, deniedDomains, allowWrite, denyWrite, allowWritePaths, denyWritePaths, allowUnixSockets, allowAllUnixSockets, allowLocalBinding, allowMachLookup, excludedCommands, allowUnsandboxedCommands, autoAllowBashIfSandboxed, enableWeakerNestedSandbox, additionalDirectories. Nesting and types UNMEASURED.
- (a) The tracked file has no write roots. This window's live sandbox (untracked user/local level) allows `.`, /tmp, /private/tmp and 20+ stale roots from old projects (cwf-obs-trace-1, cwf-synth-traffic-1, mcp-honestbench, wt-*…), and denies .claude/settings*.json, hooks and skills. Whether the target path or a built-in .git deny is the cause: UNMEASURED.
- (b) Here the tsx CLI failed `listen EPERM` and `node --import tsx` worked. At master, package.json has 29 `node --import tsx` lines and 0 lines matching `tsx (scripts|api|shared)/`. So the vitest/gate cause is UNMEASURED. Harness text in this window: `sandbox.network.allowLocalBinding: true` cures a local listen EPERM and applies without restart (the only pick-up fact measured).
- (c) The redirect host declared here is productionresultssa17.blob.core.windows.net. Its "family" `*.blob.core.windows.net` is all of Azure Blob, an exfiltration channel.

## 3 · (4) Tracked allow entries at master that ALREADY break P3
- `git push origin:*` admits `+<ref>`, `--delete`/`:<ref>` and `--mirror`. GB-4 (guard-bash.py:542-544) refuses only `--force`, `-f` and `--force=`.
- `git -C:*` admits every git subcommand. `git branch:*` admits `-D`. `find:*` admits `-delete`/`-exec rm`. `sed -n:*` admits a `w file` write.
- `python3:*`, `node -e:*`, `npx tsx:*`, `node --import tsx:*` and `npm run:*` are arbitrary code: a blanket Bash under another name.
- `gh api repos:*` admits PUT …/pulls/<n>/merge (GB-2 never sees it), DELETE …/git/refs, …/runs/<id>/rerun, and POST …/statuses/<sha> adversary/scout. An author can certify itself, which §5 forbids and nothing enforces.
- `gh api graphql:*` admits mergePullRequest, closePullRequest and deleteRef (not in GATE_MUTATIONS).
- `Write/Edit(.claude/**)` admit rewriting guard-*.py and settings.json (built-in protection UNMEASURED).
- Shared clone:
  - It has a STAGED settings.json edit vs master (+WebFetch arxiv, footerLinksRegexes emptied), which live windows load.
  - At session start, `.claude/settings.local.json.bak-S167-2` was untracked and NOT ignored. GS-3's `*.local.json` misses it, and `git add -A` there would stage it. I did not open it.
- (5) Classifier refusals refuse at once, never wait. A matching allow rule did not clear one, so they are outside P2's reach, and so are External-System-Write refusals. Each window's mode (auto vs the waiting default) is UNMEASURED.

## AMENDMENTS (paste VERBATIM):
A1. P1 MEASURED BY THE OWNER'S HAND: lanes are fenced from ~/.claude/** (GS-4) and a scout's slip read was classifier-refused. The prompt list per class (count + exact command shape + window mode: auto | default) comes from the owner or the Operator under a named owner consent, as a file under docs/relay/ that AG-2 cites. Until it exists, P2 may add ONLY entries for classes (a)–(c) that AG-2 reproduces in its OWN window (command, refusal text verbatim, syscall/host/path), each listed in CLAIMS with that evidence.
A2. CURE BY SHAPE BEFORE CAPABILITY: a class that disappears by changing the command (e.g. `node --import tsx` instead of the tsx CLI) is cured that way, with no sandbox key. A sandbox key is added only when no shape cure exists, and the report says which.
A3. NETWORK: exact hosts only, as measured (e.g. productionresultssa17.blob.core.windows.net). No wildcard on *.blob.core.windows.net. A new shard costs one prompt, not an exfiltration channel.
A4. FILESYSTEM: the write root for worktrees is the worktree parent and `<common .git>/worktrees/**` only. NEVER the .git root, .git/hooks or .git/config (hooks = code execution outside guard-bash; config = hooksPath/insteadOf push redirection). A planted fault (allowWrite on .git/hooks) goes red in P4.
A5. P3 GROWS: FORBIDDEN keys and values = allowUnsandboxedCommands:true, excludedCommands (non-empty), allowAllUnixSockets:true, enableWeakerNestedSandbox:true, defaultMode bypassPermissions, any Write/Edit allow on .claude/hooks/** or .claude/settings*.json. autoAllowBashIfSandboxed is an OWNER ruling named in the report, never set silently: with it, the sandbox becomes the only boundary.
A6. P4 KEYS ON THE ACT: the gate carries a FROZEN baseline of code-execution and wide prefixes (python3, node -e, npx tsx, node --import tsx, npm run, git -C, git push origin, git branch, find, sed -n, gh api repos, gh api graphql, Write/Edit .claude/**) and goes red on any NEW one. The existing ones are listed as named residuals for an owner ruling: removing them would CREATE prompts, which is the opposite of this card. The gate prints position and length only, never the matched text, so CI logs never carry a key.
A7. GUARD GAPS ARE NAMED, NOT FIXED HERE: GB-4 misses `+refspec`, `--delete`/`:ref`, `--mirror`; GB-2 misses REST/GraphQL merges; nothing fences an author's own adversary/scout status. These go to a separate guard card (another fence); this card's report lists them.
A8. P5 IS THE OWNER'S: GS-3 refuses Read/Bash on *.local.json, Edit/Write need a prior Read, and the sandbox denies writes there. AG-2 cannot do P5. The owner removes the key-bearing entries AND deletes .claude/settings.local.json.bak-S167-2, and AG-2's report only records the count the owner gives. The shared clone's staged settings.json edit is named for the owner (not AG-2's file).
A9. P6 HONEST: a model cannot observe an approved prompt, so boot text cannot make PROMPTS complete. The line becomes `PROMPTS: self-observed=<refusals/denials seen> · approvals UNMEASURED-BY-WINDOW`. At master, .claude/boot/ has 0 lines matching PROMPTS:/PROMPT-EXPECTED (one lens: git grep). The rule lives only in a bus NOTICE.
A10. P7 MEASURED, not asserted: after the change lands, AG-2 re-runs one previously-refused command per class in a RUNNING window and reports picked-up | restart-needed per key. The installed version is named, since 3 versions are on this machine.
END-AMENDMENTS
