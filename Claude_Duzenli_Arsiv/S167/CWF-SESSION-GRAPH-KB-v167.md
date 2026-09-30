# CWF-SESSION-GRAPH-KB-v167
Edges learned in S167 (2026-09-30T20:22Z – 2026-10-01). Each edge is session-tagged. v166 edges are unchanged and not repeated.

[S167] `Claude Code /clear` → `rotates CLAUDE_CODE_SESSION_ID but keeps the claude process, so background children (mail-wait) from before /clear keep running and keep taking cards` (AG-4 measured; scout-2 corroborated by the task-dir session id ≠ env session id).
[S167] `a second LIVE window at one address` → `has a DIFFERENT claude ancestor pid than a /clear ghost` — the only safe discriminator for killing a stale waiter (scout-2, `ps`, unsandboxed).
[S167] `Claude Code Bash calls` → `export TMPDIR=/tmp/claude-501` (one flat per-user dir shared by every window); a terminal-launched process gets /var/folders/… (scout-2).
[S167] `Seatbelt sandbox` → `denies the process list` (pgrep: sysmond not found) and `denies creating .git/worktrees in some windows` (AG-3) — both are refusals, not absences.
[S167] `lane permission prompts` → `come from command SHAPE (env reads, ||/&&/|, off-list hosts, outside writes), not from missing allow lines` — `node -e`, `node *`, `git *`, `npx *` were already allowed.
[S167] `.claude/settings.local.json additionalDirectories` → `must contain the doc-repo ROOT`, not session subfolders, or every push and every new S<n> folder is refused.
[S167] `a non-claimable address (scout)` → `never stamps consumed_at` (mail-wait.mjs:441-447, 1029-1044); its only visible act is the FINAL reply, so pickup is invisible.
[S167] `vitest 4 defaults` → `pool forks, isolate true, maxWorkers = cores − 1` (3 on a 4-vCPU runner); `environment: 'jsdom' for every include` costs ~77% of test CPU as per-file overhead; api/shared under node halve (AG-3).
[S167] `new URL('<literal>', import.meta.url)` in a vitest file → `is rewritten by vite to an asset URL and collects 0 tests`; `dirname(fileURLToPath(import.meta.url))` is safe (scout-2).
[S167] `relayAuditGate.test.ts:335` → `holds ANY PR red whose new docs/relay report lacks the <!-- relay-audit: v1 kind=report --> header` — a report file can hold a correct code/config PR red (12.12 reproduced).
[S167] `supabase CLI 2.108.0` → `[inbucket] deprecated → [local_smtp]`, object moved whole; `supabase status --workdir` parses config without starting containers, but runs only unsandboxed (scout-2).
[S167] `PR 655 (SD1)` → `a bare exempt phrase ('Neden', 'Why') lets real counts bypass the numeric guard`; method-name phrases only (AG-4, push security review).
[S167] `VS Code Source Control` → `shows dead worktree records as branches with "Publish Branch"`; `git worktree prune` needs the owner's delete grant from the bridge.
[S167] `throughput` → `6 landings in 2 h (650–655), 22–51 min open→merge` vs `4 in the previous 13 h`; the next bottlenecks are CI "Run tests" (12–16 min) and scout review latency.
END · CWF-SESSION-GRAPH-KB-v167
