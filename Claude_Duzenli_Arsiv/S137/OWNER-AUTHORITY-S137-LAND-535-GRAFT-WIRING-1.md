# OWNER-AUTHORITY-S137-LAND-535-GRAFT-WIRING-1

Given by the owner in his own words, 2026-09-12, after being shown what the diff actually does:

    OWNER-AUTHORITY-S137-LAND-535-GRAFT-WIRING-1 — PR 535 yeşilse AG-5 indirebilir; hook'ların repo dışı
    kod çalıştırdığını bilerek onaylıyorum.

## WHAT HE WAS SHOWN BEFORE HE GAVE IT, AND WHY THAT MATTERS

He had already said "indirelim" once. The Architect held the card and measured the diff first, and the
measurement changed what the decision was about. Recording that here because the second sentence is the
authority and the first one was not informed.

`.claude/helpers/graft-hooks.cjs` is sixty-seven lines and NONE of them is the hook's behaviour. It is a
RESOLVER: it locates `@nanonets/graft`'s `dist/claude/hooks.js` — first at a hard-coded Homebrew path, then
by package resolution, then by shelling out to `npm root -g` — and imports it, calling its `main`. The same
shape resolves the status line.

So the repository gains `PostToolUse` hooks on `Write|Edit|MultiEdit` and on `Bash|mcp__graft__|Read|Grep|Glob`,
plus `UserPromptSubmit` and `SessionStart` hooks, and **what they execute is not in the repository**. It
comes from a package installed globally on the machine. The import is wrapped in a catch that no-ops when
graft is absent, so a missing package is silent rather than broken — and equally, what runs is invisible
from the tree.

The change also adds one grant, `Bash(graft:*)`, two helper files, a skill, a new `graft` MCP server in
`.mcp.json`, and ignore rules for the local graph cache. No credential appears in the diff.

This is the DERIVED-NEVER-SOURCE law meeting a harness file: a repository file that CLAIMS a behaviour whose
source lives somewhere git cannot see. The owner authorised it knowing that, which is the only way a
permission-file change is authorised at all under `CLAUDE.md` §6.

## THE BLOCKER THE AUTHORITY CANNOT SPEND YET, MEASURED AFTER IT WAS GIVEN

The landing REFUSES today, and not for anything the owner decided.

```evidence:author-lens
scripts/land.ts at master, read 2026-09-12T07:33Z:
  const LANE_TOKEN = /\bAG-\d+\b/g;
authorLaneOf() takes the text before the first colon of every non-merge subject and requires
EXACTLY ONE such token in each.

the branch's two subjects, read from the owner's mounted clone at 2026-09-12T07:30Z:
  GRAFT-WIRING-1: keep only Bash(graft:*) — the other three grants were for developing Graft, not using it
  GRAFT-WIRING-1: wire @nanonets/graft into Claude Code for this repo, repo-scoped only

neither prefix carries an AG token, so lens one returns `untokened`; lens two reads relay report
files in the diff and the diff carries none, so it abstains; resolveAuthorLane returns
AUTHOR-UNKNOWN and order B refuses the landing.
```

The repair is an AUTHOR act, not a lander act: the branch needs a relay report naming the lane that wrote
it, which lets lens two resolve. That lane must not be AG-5, because the diff is not report-only and a
self-land is refused.

WHICH LANE ACTUALLY WROTE IT IS UNMEASURED. Every commit carries the shared git identity, and the subjects
name no lane. That question goes to the scout or to the lanes, not to a guess.

## WHAT THIS AUTHORITY COVERS

ONE landing of pull request 535 by AG-5, once an author is resolvable and the forge is green on the merged
tree. It does not authorise a second permission change, it does not survive a re-cut of the branch, and it
does not override a red gate. No spend approval accompanies it and none is needed: the canary carries
`if: false`.

END · OWNER-AUTHORITY-S137-LAND-535-GRAFT-WIRING-1
