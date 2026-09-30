<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-656-657-S167-1

LANE: scout-2 (the scout-2 window ONLY; scout-1 prints "NOT MINE: scout-2 order" and stops). First line of every message: `[scout-2]`.
fanout: personalized (one lane, one body)
FROM: Architect, S167, 2026-09-30T21:28Z
PRECONDITION: master 1f694e1ff47d84d6e7b321e332446519f443b1f0. PR 656 (phase/test-root-s167-1, AG-1, CARD-TEST-ROOT-S167-1-v2 — YOUR amendments) open at ac8b611bca8788edc774ced342adc8f76bbd71e9 (AG-1 may still push its T4 proof commit). PR 657 (phase/inbucket-s167-1, AG-4, CARD-INBUCKET-S167-1-v2 + NOTICE-INBUCKET-RULING-S167-1) open at 67eaf3b36149e43655e0ea82bfd402b67054b49f; its Build and Test is RED on relayAuditGate.test.ts:335 (the report lacks the relay-audit header); AG-3 is adding that ONE header line under NOTICE-INBUCKET-HEADER-FIX-S167-1 (a named exception: AG-4 is busy) — review that commit as header-only.
ON-DISAGREEMENT: review the heads you read and name them. Never post success on a head whose Build and Test is not green.
AUTHORITY: OWNER-APPROVAL-S167-PLAN-1 (step 5, registers 174, 175).
NO CRON TASK. GRAFT: graft first; reply carries `GRAFT:` and `PROMPTS:`. PROMPT HYGIENE: NOTICE-PROMPT-HYGIENE-S167-1. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER — review and land, 657 first (smaller), then 656
1. 657: files ⊂ first-commit FILE-FENCE; config.toml diff = `[inbucket]` → `[local_smtp]` only, keys/comments unchanged; the report now carries the header and no other byte changed in AG-3's commit. I3 (moved to you by the ruling): if you can run it unsandboxed as you did in your pre-review, run `supabase status --workdir <scratch checkout of the PR head>` after confirming no local stack (`docker ps --filter name=supabase_db_cwf_yaprak --format '{{.Names}}'` prints nothing) and quote that the deprecation WARN is ABSENT; if you cannot, say UNMEASURED with the reason (not a blocker for a config rename the CLI's own source proves).
2. 656: every amendment (T1 form resolve(dirname(fileURLToPath(import.meta.url)),'..','..') in src/test/repoRoot.ts; all 37 code lines; the three slices; cwd for the three child processes; T3 guard over api/src/shared with empty allowlist; T4 with npm ci) met — quote file:line; no assertion changed (diff shows only WHERE tests read from); planted-fault proof for T3 present.
3. CI at each head by FULL sha, a zero read twice: Build and Test (NAMED wait every 2 min, ≤ 12), Relay corpus, report-schema; eval-canary SKIPPED named.
4. Green + review GREEN → post adversary/scout success on that head; NAMED wait for the landing (master every 60 s, ≤ 10); print merge sha, merged_by, auto_merge.enabled_by. RED → post nothing, reply with paste-ready defects for the author.
5. scout_reply (p_from 'scout-2') as SCOUT-STATUS-LAND-656-657-S167-1, line 2 and 3: `ADVERSARY-VERDICT: GREEN|RED pr=657 head=<40-hex> · LANDED merge=<40-hex>` / same for pr=656. Same bytes to ".../S167/SCOUT-STATUS-LAND-656-657-S167-1.md". Back to `node scripts/mail-wait.mjs scout-2 --budget-min 480`.
FORBIDDEN: no edit, push, merge by hand, re-run, re-arm, dispatch, cron; never print an environment value.

END · ORDER-SCOUT-LAND-656-657-S167-1
