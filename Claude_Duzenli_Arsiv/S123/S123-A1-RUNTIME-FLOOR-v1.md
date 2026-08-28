# S123 · A1 — THE RUNTIME FLOOR, MEASURED, AND THE VENDOR CALL IT SETTLES · v1
MINTED 2026-08-28. **This closes the one measurement `S119-A1-HOST-COMPARISON-v2` §5 named as blocking the vendor decision.** It does not re-open the comparison; v2's requirement set, its four-vendor field and its declared exclusions all stand.

## 1 · WHY THIS COULD BE MEASURED TODAY WHEN IT COULD NOT BE MEASURED THEN

`S119` §3 recorded the floor as blocked because a lane could not build the bench image: the base image would not pull and the registry query hung. **That blocker is real and unchanged, and it does not block the floor** — because `Dockerfile.a2a` introduces no build step. Its `CMD` is `npx tsx a2a/server.ts`, deliberately, so the image runs the same TypeScript source directly. Running that command outside the image measures the same process the image would run.

```evidence:why
Dockerfile.a2a, final line:
  CMD ["sh", "-c", "npx tsx a2a/server.ts --host \"$A2A_HOST\" --port \"$A2A_PORT\"${A2A_CARD_URL:+ --card-url \"$A2A_CARD_URL\"}"]
and its own header: "tsx runs the TypeScript directly. No build step is introduced on purpose."
```

## 2 · THE MEASUREMENT

Run in the Architect's container with the two fatal environment variables set to placeholders and no database configured, sampling the WHOLE process tree recursively.

```evidence:floor
PID    RSS kB   what it is
15176   80,468  npm exec tsx a2a/server.ts …        (the npm wrapper)
15190    1,936  sh -c tsx …                          (the shell the CMD spawns)
15191   63,564  node …/.bin/tsx a2a/server.ts …      (the tsx launcher)
15202  150,252  node — THE SERVER ITSELF
       ───────
       296,220  kB total  ≈ 289 MiB, flat across three samples ten seconds apart
       298,788  kB after fifty agent-card requests  ≈ 292 MiB

idle CPU   the since-start average decayed 1.4% -> 0.7% over thirty seconds,
           i.e. steady-state CPU is indistinguishable from zero
positive   GET /.well-known/agent-card.json -> HTTP 200, a valid A2A card
controls   POST /a2a/tasks/send unauthenticated -> HTTP 401, the auth fence holding
           no A2A_TRIGGER_SECRET -> the process REFUSES to start, naming the variable
```

**A FIRST READING OF THIS WAS WRONG BY 3.6× AND IS RECORDED RATHER THAN QUIETLY REPLACED.** The first sample summed only the npm wrapper and its shell and reported ≈80 MB. The server is a GRANDCHILD of that wrapper, and a process-tree sum that stops at the first generation misses it entirely. The figure above is the recursive sum. **Anyone re-running this must sum descendants recursively or they will reproduce the wrong number.**

## 3 · TWO THINGS THE NUMBER SAYS

**THE FLOOR IS LEAN.** ≈289 MiB resident, essentially zero idle CPU. `S119` §2's table brackets it: below the "~400 MB, CPU mostly idle" row. **A 512 MB machine holds the idle floor with headroom; 1 GB covers a working set nobody has measured yet.**

**ROUGHLY HALF THE FLOOR IS THE COMMAND, NOT THE SERVER.** 146 MB of the 296 MB is `npm exec` plus a shell plus the tsx launcher, all of which exist because the `CMD` shells out through `npx`. The server itself is 150 MB. **Invoking tsx directly would roughly halve the resident floor for a one-line change**, and that matters only under consumption billing — which is exactly the model §4 was weighing. It is a lane card and it is named here rather than done.

## 4 · THE VENDOR CALL — ONE PATH

**FLY. Not because the floor is big, but because the floor is the wrong number to decide on.**

`S119` §4 made its recommendation conditional: *"If the floor comes back lean — resident memory comfortably under half a gigabyte and idle CPU — Railway becomes the better answer."* The floor has come back lean. **The condition is met and it still does not carry the decision, and here is why.**

Railway bills CONSUMPTION. The risk in consumption billing is not the idle floor — it is the busy period. **The measurement that came back lean is the one that does NOT bear on that risk.** What Railway would actually charge for is the working set and CPU under a benchmark round driven by a stranger's harness: external, bursty, unknowable in advance, and **still unmeasured** (`S119` §5 names it, and it needs the owner's credentials, so it is a different card in any case).

So the floor tells us what machine to rent. It tells us nothing about what a round costs on a consumption plan. `S119` §2's argument is untouched and it is the one that decides: *a host whose bill scales with measurement effort couples the invoice to the science*, which the acceptance contract's budget clause exists to forbid.

**Fly, allocation-billed, at the smallest tier that holds the floor with headroom.** Predictability is what is being bought, and the floor measurement now tells us it can be bought at the small end rather than the large.

**IF THE OWNER PREFERS RAILWAY ANYWAY**, the honest form of that choice is: take it, and card the CMD change in §3 first, because under consumption billing that one line is worth roughly half the memory bill. That is a real option and it is not the recommendation.

## 5 · DECLARED, RATHER THAN LEFT FOR SOMEONE TO FIND

- **Node version.** Measured on v22.22.2; the image pins `node:24-slim`. Not controlled for. The direction of the difference is unknown and is unlikely to be large, and "unlikely" is not "measured".
- **No database.** `SUPABASE_URL` and `SUPABASE_SECRET_KEY` were absent, so the card served with `backendsRead: unconfigured` and `skills: []`. **This is a FLOOR — a lower bound — and the working set with the database attached is strictly larger.** That is what §5 of the comparison asked for and what this document delivers; it is not the working set.
- **No task was executed.** The 401 proves the fence, not the executor. Memory under a real turn is unmeasured.
- **One machine, one run.** No repetition, no varying load.

## 6 · WHAT REMAINS THE OWNER'S, AND IT IS TWO THINGS

The account and the payment method are a real-world signup. The token is environment-only and never reaches an artifact. **Everything after those two is machine work and belongs to a lane** — the deploy, the card URL, the smoke read, and the working-set measurement that the credentials unblock.

TAIL ANCHOR: S123-A1-RUNTIME-FLOOR-v1 ends here.
