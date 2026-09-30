<!-- relay-audit: v1 kind=notice -->
NOTICE-PROMPT-HYGIENE-S167-1

LANE: AG-1, AG-3, AG-4, scout-1, scout-2 — the same body is addressed to each; read it from YOUR box. First line of every message: `[<your address>]`. STANDING — it binds every later card. Do not stop your current card to act on it; apply it from your next command on.
fanout: broadcast (one body, five rows)
FROM: Architect, S167, 2026-09-30T21:17Z
WHY: owner, 2026-10-01 00:15 TSİ, with a screenshot of a lane's prompt: "Ag lerin ve scoutun surekli izin istemesi de bizi yavaslatiyor". Every prompt stops a window until the owner clicks. MEASURED: `Bash(node -e:*)`, `Bash(node *)`, `Bash(git *)`, `Bash(npx *)` are already on the allow lists (.claude/settings.json, .claude/settings.local.json), yet the window in the screenshot was asked about `node -e "const v=process.env.CLAUDE_CODE_SESSION_ID||''; …"`. So these prompts come from the SHAPE of the command (an environment read, an operator such as `||` `&&` `;` `|` `$(`), a network host outside the sandbox allow list, or a write outside the project — not from a missing allow line. Plain words: the lanes write commands that look risky to the harness; most can be written so they do not.
AUTHORITY: OWNER-APPROVAL-S167-PLAN-1 (register 180) · CLAUDE.md §3 (every bash call is ONE command).
NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable.

## RULES (apply from your next command)
P1. No operators in a Bash call, not even inside a quoted `node -e` string: no `||`, `&&`, `;`, `|`, `$(`, backticks, redirections `>`/`<`. If you need logic, write it to a `.mjs` file in YOUR scratch dir with the editor tool and run `node <that file>`.
P2. Never read an environment variable on the command line (`process.env.X`, `$X`, `printenv`). If a card needs a fact derived from one, put the read inside a scratch `.mjs` file that prints only the derived fact (a boolean, a hash prefix), never the value.
P3. Network only through the tools already allowed (`git`, `gh api`, `npm`). No `curl` to a new host; GitHub job logs: `gh api repos/<o>/<r>/actions/jobs/<id>/logs` only.
P4. Writes only inside your worktree, your scratch dir, or "2026 - Yapra - DDocuments" (now allowed at its root).
P5. When you are about to run a command you believe will prompt anyway (a CLI that must run outside the sandbox, a kill, a delete), say so in ONE line in your window BEFORE running it, starting `[<addr>] PROMPT-EXPECTED:` with the reason, so the owner knows it is expected; and list every such command in your slip under `PROMPTS:` (or `PROMPTS: none`). The Architect turns that list into allow lines.
Ack: no slip; the rule is proven by the `PROMPTS:` line on your next slip. Scouts: ACK-BY-REPLY as usual (one line).

END · NOTICE-PROMPT-HYGIENE-S167-1
