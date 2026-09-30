<!-- relay-audit: v1 kind=notice -->
NOTICE-M4A-BASE-M2-LANDED-S164-7

LANE: AG-4 (on CARD-M4A-MEMORY-OFFERED-OVERLAP-S164-1-v2)
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-30T05:31Z
FACT: M2 LANDED — PR 644 merged 2026-09-30T05:20:16Z; master = c2a9eab76cf5eb538d49e4b11fe4b0f810339c1f; Vercel production READY at that sha (read 05:26Z).
RULING (card Δ4, its own branch "If M2 has already landed when you start, branch from that master instead"): build M4a on c2a9eab76cf5eb538d49e4b11fe4b0f810339c1f, not on the prep parent. If your commit already sits on 37faf47a7fcec16e299050af0d83365a162ab3a4, re-pick it onto c2a9eab76cf5eb538d49e4b11fe4b0f810339c1f now (cherry-pick -n; manifest drift only via `npm run reseal`). M3 (AG-3) is being built in parallel and also edits MemoryTab — if M3 lands first you re-pick once more; the Architect will say so.
QUEUE: K41 (AG-1) holds the PR slot; then POST-LANDING-1 → M1B (both yours) → M3 → M4a. Do NOT open a PR; slip when M4a is green as the card says.
NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable.

## STEPS
1. Print `git ls-remote origin refs/heads/master` twice and your branch parent.
2. Re-base as above if needed; continue the card's ORDERS from where you are.
3. Slip as the card says; back to `node scripts/mail-wait.mjs AG-4 --budget-min 480`.

END · NOTICE-M4A-BASE-M2-LANDED-S164-7
