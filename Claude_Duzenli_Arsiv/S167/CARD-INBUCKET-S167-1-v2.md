<!-- relay-audit: v1 kind=card -->
CARD-INBUCKET-S167-1-v2

LANE: AG-4 (the AG-4 window ONLY; any other window prints "NOT MINE: AG-4 card" and stops). First line of every message: `[AG-4]`. Re-addressed from AG-3 (busy with ORDER-MEASURE-CI-SPEED-S167-1) to AG-4 (idle).
SUPERSEDES CARD-INBUCKET-S167-1 (never sent to a lane). v2 = v1 + scout-2's amendments from SCOUT-STATUS-PREREVIEW-TESTROOT-INBUCKET-S167-1 (row 49598a76-27e2-4d26-9d97-9eac69b24093, verdict GREEN with amendments), pasted VERBATIM below.
fanout: personalized (one lane, one body)
FROM: Architect, S167, 2026-09-30T21:10Z
PRECONDITION: master = your `git ls-remote origin refs/heads/master`. At 5e6e691fe9ea98b17e2a0f2e78f14802c750ae64 (scout-2), supabase/config.toml:95 reads `[inbucket]`, :96 enabled = true, :98 port = 54324; master is now 1f694e1ff47d84d6e7b321e332446519f443b1f0 (PR 655, which does not touch config.toml).
ON-DISAGREEMENT: if the section is not there, print what is and stop.
WHY: register 174 / F-S165-INBUCKET-CONFIG-DEPRECATION-1 — the supabase CLI prints a deprecation warning on `[inbucket]` on every run. Plain words: a warning printed on every run teaches everyone to ignore warnings, and the next real one is missed.
AUTHORITY: OWNER-APPROVAL-S167-PLAN-1 (step 5) · §12.1 (NEW subject → scout pre-review before this card is sent).
```evidence:adversary
ADVERSARY: EXEMPT
ack: 49598a76-27e2-4d26-9d97-9eac69b24093
why: scout-2 returned GREEN with four amendments (I1, I1, I2, I4); v2 carries them verbatim.
```
SCOUT-2 MEASURED: supabase CLI 2.108.0; the binary's own source prints `WARN: config section [inbucket] is deprecated. Please use [local_smtp] instead.` and moves the object whole (keys unchanged); after the rename the WARN is ABSENT (observed on a scratch project). `git grep -n -i inbucket` → only supabase/config.toml:95; no code reader.
AMENDMENTS (scout-2, verbatim; they win over I1–I4 below where they differ):
- I1: "The command is `supabase status --workdir <worktree>`; exit 1 'No such container' is expected, and the measurement is the WARN line. First confirm no local stack runs (`docker ps --filter name=supabase_db_cwf_yaprak --format '{{.Names}}'` prints nothing); if one runs, STOP, because status prints local keys."
- I1: "The CLI fails silently inside the sandbox; if it cannot run unsandboxed, write that in the slip and stop."
- I2: "Rename [inbucket] to [local_smtp] with keys and comments unchanged (CLI 2.108.0 moves the object whole)."
- I4: "At 5e6e691f the only hit is supabase/config.toml:95, and no code reader exists."
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.
UI/UX (§13.3): none — local-dev config only; say so in the report.

## WORK (push-first)
I1. MEASURE the CLI's own words: run the installed supabase CLI once in a way that parses config.toml without starting containers (the scout names the command) and quote the deprecation line VERBATIM, plus `supabase --version`.
I2. Rename the section exactly as that line says (keys unchanged unless the line says otherwise). Do not rename from memory or from web docs.
I3. Re-run the same command: the deprecation line must be ABSENT; print the output.
I4. `git grep -n -i inbucket` over the repo (both before and after) — any other reader of the old key (scripts, docs, tests, CI) is listed; code readers are updated in the same commit, prose mentions are named in the report.
FENCE: supabase/config.toml · any code reader I4 finds (listed) · docs/relay/INBUCKET-S167-1-AG4-report.md. No migration, no production config.

## STEPS
1. `git ls-remote origin refs/heads/master` (twice). `git worktree add <scratch>/wt-ib -b phase/inbucket-s167-1 <master sha>`.
2. I1–I4, report, ONE commit (`git commit -F <file>`), `git push origin phase/inbucket-s167-1`, `gh pr create --base master`. Print PR number + head 40-hex.
3. Slip SLIP-CARD-INBUCKET-S167-1 (bus; first line `[AG-4]`, a `GRAFT:` line). Remove your worktree. Back to `node scripts/mail-wait.mjs AG-4 --budget-min 480`.
BUDGET: whole card ≤ 20 min. A permission you cannot pass → write it in the slip and stop.
FORBIDDEN: --force; `supabase db push` or any command touching the remote project; any path outside the fence; merging; cron; printing an environment value.

END · CARD-INBUCKET-S167-1-v2
