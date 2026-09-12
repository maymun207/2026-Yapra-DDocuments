# F-S137-THE-GRANT-IS-WIDER-THAN-THE-RULING-1

Opened 2026-09-12T18:30Z, session S137. Found by the ADVERSARY, not by the Architect, inside a card that was
asked a different question — who authored the graft wiring. Recorded under its name for that reason.

## THE FINDING IN ONE SENTENCE

The owner ruled that no code leaves for graft, in any form. Pull request 535 would land a permission grant
that leaves two doors to that exact thing open, and the Architect read the diff twice without seeing it.

## WHAT THE RULING SAYS

`OWNER-RULING-S137-NO-CODE-LEAVES-FOR-GRAFT-1`, in the owner's own words:

    graft in hic bir sekilde bizim codumuzu as is yada ozeti olarak bile almasina izin VERME!

Absolute. The Architect's five settings under it named `--deep` as the departure and closed it by removing
the key. That was the whole of the Architect's model of the risk.

## WHAT THE ADVERSARY MEASURED

```evidence:grant
.claude/settings.json in PR 535 grants: Bash(graft:*)

That wildcard admits EVERY subcommand with no prompt, including:
  graft build --deep    → sends file PATH + SOURCE, one call per file, to the provider
                          (cli.js 368-378, ai/providers.js)
  graft brain link      → brain/link.js 18
  graft brain push      → brain/push.js 73, app/brain-build.js 131
                          posts a repository digest to agents.nanonets.com

The skill file never mentions brain. The grant does not care what the skill mentions.
```

**The brain path is the one the Architect missed entirely.** Its five settings said "never set
`GRAFT_BRAIN_TOKEN`" — but a wildcard grant lets an agent run `graft brain link`, and linking is how a token
arrives. The rule was written as a variable to leave unset and the grant makes it a variable an agent can
set. A ban enforced by a missing credential is not a ban when the grant includes the command that fetches
the credential.

## AND TELEMETRY IS ALREADY LIVE ON THAT MACHINE

```evidence:telemetry
~/.graft/telemetry.json on the owner's machine: no disable flag, noticeShownAt 13:18:04Z,
flushedAt SET — events have already reached events.nanonets.com.
Nothing in PR 535 disables it, and its PostToolUse hooks run graft on every
Write, Edit, Bash, Read, Grep and Glob.
```

Measured earlier from the package source: the payload is allowlisted, bucketed and carries no paths or
code. So this is a NETWORK SEND ON EVERY TOOL CALL, not a code leak. Both halves belong in the record: the
Architect's own finding said telemetry was unusually disciplined, and that remains true and does not make
it invisible.

## THE THIRD HOLE, ALREADY NAMED, NOW MEASURED WIDER

The Architect had found `.claude/skills/graft/SKILL.md` line 86 — "`--deep` adds a concept map; skip unless
asked" — and called it the one hole. The adversary read all 156 lines and found it is worse than one line:

- line 16 says "Every command below is $0, needs no API key" — which CONTRADICTS line 86 inside the same
  file. A lane reading top-down learns the wrong thing first.
- line 122 tells the agent to run `graft build` to refresh, which reaches the model layer whenever a key is
  present in the environment.

## WHAT THIS COSTS THE FACTORY, AND WHAT IT DOES NOT

It costs nothing yet: nothing has landed and no key is present. The graph on the machine was built
structurally — `readyCount: 0`, no concept nodes, no prose — so no source has left for a model.

What it would have cost is the ruling itself. A grant that admits the forbidden command turns an absolute
owner ruling into a convention, and this house has a name for a rule enforced by everyone remembering:
it has already failed.

## THE CLASS, WHICH IS OLDER THAN THIS PULL REQUEST

The Architect reviewed the diff for WHAT IT CHANGES and missed WHAT IT PERMITS. A permission line is not
read like code; it is read like prose, and its blast radius is every command that matches the pattern.
`Bash(graft:*)` is four characters wider than `Bash(graft ask:*)` and those four characters are the whole
finding.

Beside it, the same shape the adversary named in `#535`'s helper file: the repository declares a behaviour
whose source lives where git cannot see it. Here the repository declares a PERMISSION whose consequences
live in a package the repository does not vendor.

## THE REPAIR, PROPOSED AND NOT YET AUTHORISED

One card, to a producer that is not the lander:

1. Narrow the grant from `Bash(graft:*)` to the explicit read-only subcommands the hooks actually use.
2. Amend the skill: line 86 and line 122 lose the model path, line 16 stops claiming what line 86 denies.
3. Bring `DO_NOT_TRACK=1` into the lane environment and run `graft telemetry disable` on the machine.
4. Adopt the two commits under a carded producer's own `AG-N:` subjects, stating the provenance — the
   original session and shas — because the forge carries no lane attribution and inventing one would
   manufacture an attribution.

That is a re-cut branch, so `OWNER-AUTHORITY-S137-LAND-535-GRAFT-WIRING-1` does not reach it. A new line is
owed and the owner has been asked for exactly one.

## WHAT REMAINS UNMEASURED

Whether session 24d72668-e84b-435c-9401-ecc36f496433 was a lane, the Operator, or the owner's own window.
The first line of its transcript answers it; it sits under `~/.claude`, which the adversary's hooks fence
and the Architect's bridge cannot reach.

Whether the version installed on the owner's machine behaves as the published 0.18.0 the Architect read.

END · F-S137-THE-GRANT-IS-WIDER-THAN-THE-RULING-1
