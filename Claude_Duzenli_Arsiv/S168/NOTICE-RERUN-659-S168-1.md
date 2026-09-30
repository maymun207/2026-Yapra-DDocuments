<!-- relay-audit: v1 kind=notice -->
NOTICE-RERUN-659-S168-1

LANE: AG-1 (the AG-1 window ONLY; any other window prints "NOT MINE: AG-1 notice" and stops). First line of every message: `[AG-1]`. Thank you for TEST-ROOT — it landed as 731c1ee412432b2c5e96f1966793c00f00ec27e2.
fanout: personalized (one lane, one body)
FROM: Architect, S168, 2026-09-30T22:31Z
PRECONDITION: PR 659 (AG-3, phase/inbucket-s167-2) open at e3889ccd1c5ada3dae14a817e51714fb23e40c34; PR 658 CLOSED (22:14Z). The only Build and Test run at that head is attempt 1, failure, step 6 merge guard.
MEASURED (Architect ran the merge-base guard on the bridge): 659's only red was `FAIL COLLISION — UNMEASURED: the fence of lower-numbered #658 cannot be read … YIELDED-TO #658 … close it or fence it, and this PR goes green on its next push`. 658 is now closed, so the premise changed; a re-run is not chasing a green (S55-1).
WHY YOU: scout-2 holds NOTICE-SCOUT2-LAND-659-S168-1 but has written nothing to the bus since 21:19Z; this is a machine operation, so it runs on an idle lane (S102-YASA-1). You do NOT land 659 and you post NO adversary/scout status — landing stays scout-2's.
AUTHORITY: OWNER-APPROVAL-S167-PLAN-1 (INBUCKET). NO CRON TASK. PROMPT HYGIENE: NOTICE-PROMPT-HYGIENE-S167-1. SECURITY: never print, echo, printenv or cat any environment variable.
IF BLOCKED: write the blocker to the bus as your slip and return to mail-wait; never stop in the window waiting for input.

## STEPS
1. `gh run list --repo maymun207/cwf_yaprak --commit e3889ccd1c5ada3dae14a817e51714fb23e40c34 --json name,databaseId,attempt,conclusion`. If Build and Test already shows attempt ≥ 2 (scout-2 re-ran it), skip to step 3.
2. `gh run rerun <Build and Test id> --repo maymun207/cwf_yaprak --failed` — ONCE.
3. `gh run watch <id> --repo maymun207/cwf_yaprak --exit-status` (≤ 25 min). Then `gh run view <id> --repo maymun207/cwf_yaprak --log | grep '\[merge-guard\]'` and quote the VERDICT line verbatim; name the conclusion of every job.
4. Slip SLIP-NOTICE-RERUN-659-S168-1 (bus; `[AG-1]`, attempt number, verdict line, job conclusions, `GRAFT:` none needed, `PROMPTS:`). Back to `node scripts/mail-wait.mjs AG-1 --budget-min 480`.
BUDGET: ≤ 30 minutes (mostly waiting on CI).
FORBIDDEN: merging; posting any commit status; editing any file; --force; cron; printing an environment value.

END · NOTICE-RERUN-659-S168-1
