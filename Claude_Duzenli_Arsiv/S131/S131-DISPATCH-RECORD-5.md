# S131-DISPATCH-RECORD-5 — hygiene batch 1a drained (three landed, two refused on a corpus red); the owner's table is now eleven PRs that cannot land by design, plus the foreman's two own reports

Architect, 2026-09-06T06:12Z (09:12 TSİ). Measured: bus row `HYGIENE-DRAIN-1A-AG5-report` (04:52:18Z), Vercel `list_deployments`, `factory_state`.

## CARD-HYGIENE-DRAIN-1A-v1 — DONE (card consumed 04:35:34Z, one minute after mint; report 04:52Z)

- LANDED, each after one trunk sync and a CI read at the SYNCED head (build (24.x), report-schema, relay corpus all success; eval-canary and rule26 skipped, named): **#484** → master `58eba12c1ce42f1149c32fb1d51fc3412bd45011`; **#451** → `2dc68b807dee0fa3129a139e8d2f35967c1ad184`; **#434** → `e4d4bcdd52b06899f27edcfbfb0901b06cc56b9a` (current master; production deployment CANCELED by ignored build step — docs-only, production stays at the #494 build).
- REFUSED, not fixed, not retried: **#444** and **#437** — `relay corpus (grammar v1)` RED at the synced head. Syncing to current master brought today's grammar to yesterday's prose; both reports predate the rules now applied to them. Exactly the class the card sent to the owner's table.
- Foreman's own report: PR **#498** (`phase/hygiene-drain-1a` at `4c22eadd2f3ed17a98ce98afacf5d887d5ea1447`), left OPEN by the card's own order (⑤: a foreman's own observation report does not self-land).
- Four foreman findings, carried: F-A `mergeStateStatus` describes a STALE head, one sync flips it — "nothing landable" was never a reading of content; F-B the report-only exception permits author==lander for `docs/relay/`-only PRs and the foreman had mis-read it as absolute; F-C `git worktree add <path> <branch>` can silently check out a stale LOCAL branch (caught because ORDER A's forty-hex read was compared against the checkout; a stale-AHEAD local would have pushed unreviewed content onto a live PR); F-D the PULL ref and the BRANCH ref are different objects and can disagree for days (#434).

## THE OWNER'S TABLE, measured — eleven PRs that cannot land by design

| class | PRs | why they cannot land |
|---|---|---|
| header-missing, pre-grammar (triage 1b) | 424 427 431 432 483 485 487 | the corpus gate reds any `docs/relay/**.md` without the v1 header; the exempt list's own text says "FROZEN. Future additions are FORBIDDEN"; adding the header makes the file GOVERNED and the full grammar then reds it (foreman measured 1 → 29 refusals on #495); S37-1 forbids rewriting a presented report |
| corpus-red after sync (today) | 444 437 | same class, discovered by measurement rather than by reading |
| two-lane author | 405 | AUTHOR-UNKNOWN {AG-3, AG-5}; the lander is in the candidate set, land.ts refuses; a header rewrite would be the S37-1 problem again |
| conflicting | 419 | a LATER revision of a report master already carries in an earlier form; 292 behind |

What closing loses: NOTHING that is not already in two other homes — every one of these reports exists as a permanent bus row (the bus is the record; `docs/relay/` was its second home) and on its origin branch (the S130 branch sweep retained them by name). Closing a PR deletes no branch.

**Architect's one path (owner's decision):** OWNER-RULING-S131-OWNER-TABLE-1 — (a) the eleven PRs above are CLOSED by name with a closing comment naming this ruling; NO branch is deleted; (b) GATE-1 ⓹ ("four S119-LANDING-ORDER reports owed") is retired as SUPERSEDED-BY this ruling — their content is on the bus and on their branches; (c) the foreman's own reports **#495** and **#498** are landed by the foreman under THIS ruling as the owner's order — ⑤ keeps a foreman's own report out of self-landing precisely so that a person, not the foreman, decides it; this is that decision, one-off, named by PR number and head. After (a)–(c) the open-PR queue is EMPTY and hygiene stage 2 closes.

## STANDING STATE (06:12Z)

- master `e4d4bcdd52b06899f27edcfbfb0901b06cc56b9a`. Lanes: AG-4 WORKING (idle since 03:59Z, its heartbeat is written by the foreman's box reads — F-7 — so the stamp says nothing), AG-5 polling, scout polling.
- Bootstrap v131 FIRST JOBS: 1 ✔ · 1b ✔ · 2 ✔ · 3 in progress (batch 1a done; owner's table pending) · 4 (three holds) next · 5–7 ADF-frozen.
- Open findings this session, all ADF-scope and frozen until lift: F-S131-SCOUT-REPLAYS-DECAYED-CARD-1 · F-S131-PRODUCER-BOOT-SAYS-CONSUMED-AT-RETIRED-1 · CARD_GATE re-arm · the foreman's F-7 (box read writes another lane's heartbeat) and F-C (stale local branch on worktree add).

TAIL ANCHOR: S131-DISPATCH-RECORD-5 ends here.
