# F-S137-WHAT-GRAFT-ACTUALLY-DOES-MEASURED-FROM-THE-PACKAGE-1

Opened 2026-09-12, session S137, at the owner's instruction to understand `#535` properly before it lands.

He pointed the Architect at the vendor's page. The Architect read it, and then did what this house requires
instead of stopping there: **installed the published package and read its source.** The two do not agree on
one material point, and the disagreement is the reason this finding exists.

`TÜREV KAYNAĞIN YERİNE GEÇMEZ` — a library's behaviour is established from its INSTALLED SOURCE, never from
its documentation. A landing page is a derived view.

## WHAT WAS MEASURED, AND HOW

`npm install @nanonets/graft --ignore-scripts` into a throwaway directory in the Architect's own cloud
container at 2026-09-12T14:11Z, then read. Version **0.18.0**, MIT, by Nanonets, source at
`NanoNets/context-graph-engine`. The build scripts were deliberately NOT run: the package compiles native
tree-sitter grammars, and nothing here needed them.

## THE VENDOR'S CLAIM THAT IS FALSE

The page says, in a three-item list: **"No vector embeddings, Runs 100% local, No telemetry."**

Two of those three hold. The third does not.

```evidence:telemetry-exists
node_modules/@nanonets/graft/package.json
  "prepare": "npm run build && node scripts/stamp-telemetry-key.mjs",
  "postinstall": "node scripts/postinstall.mjs"

dist/telemetry/key.js
  const BAKED_KEY = 'h0AAz0T8UM_liYI4aQREM7VdMDGRLF8B1YbZCeuBUww';

dist/telemetry/  — sixteen modules: gate, track, send, queue, flush, sessions,
                  identity, notice, key, contract
endpoint         — https://events.nanonets.com  (a PostHog proxy, their own host)
```

`scripts/postinstall.mjs` records an `install` event and **spawns a detached child to flush it
immediately** — its own comment says the machine it most wants to count is the one that installs graft and
never runs a command.

The claim is true for a FORK or a local `npm run build`, where the key compiles to an empty string and every
send path short-circuits. It is false for the published tarball, which is what anyone installing from npm
gets. So the page states as unconditional what the code makes conditional.

## AND THE PART THAT IS BETTER THAN THE PAGE SUGGESTS

Having caught the contradiction, honesty requires the other half: the telemetry is unusually disciplined,
and the Architect would not have known that from the page either.

`dist/telemetry/contract.d.ts` is a machine-enforced ALLOWLIST. `track()` drops unknown events and unknown
keys rather than trusting its callers, so a careless future call site loses a metric instead of leaking a
path. Every number crosses as a BUCKET (`"100-500"`, not a file count) and every string as a member of a
fixed union. Errors become one of eleven codes; the module's own comment says the message text is never the
return value, not even in part. Identity is a random UUID per install and a random UUID per repo, written to
`~/.graft/telemetry.json` and to the repo's cache.

Four gates, re-checked before every append: no key at all, `DO_NOT_TRACK`, CI detection across nine
environment variables, and the user's own `graft telemetry disable`. **Default is ON when never set.**

## WHERE THE CODE ACTUALLY GOES, WHICH THE PAGE DOES NOT SAY AT ALL

This matters more than the telemetry and the page is silent on it.

**THE QUERY PATH IS LOCAL AND FREE.** `dist/ask/ask.js` line 13, its own words: *"v1 is deterministic and $0
(term-overlap scoring, no LLM, no embeddings)."* The prompt hook runs `graft ask <prompt> . --json -n 3` and
formats the result into `additionalContext`. Nothing leaves the machine on that path, and the lane's prompt
text is not sent anywhere.

**THE BUILD PATH NEEDS A MODEL.** `dist/engine.js` throws *"No API key. Set GRAFT_API_KEY (and
GRAFT_PROVIDER / GRAFT_BASE_URL / GRAFT_MODEL …)"*. Providers are `openai | anthropic | litellm |
orcarouter`, and the DEFAULT is orcarouter — `https://api.orcarouter.ai/v1`, model `openai/gpt-4o-mini`. So
`graft build` summarises the repository through a third-party gateway unless the provider is set
deliberately.

**AND THERE IS A HOSTED PATH.** `dist/app/brain-build.js` posts a repository digest to
`https://agents.nanonets.com`, behind `GRAFT_BRAIN_TOKEN` and a link step. Off unless linked, and nothing in
`#535` links it.

Outbound hosts in `dist`, complete: `events.nanonets.com`, `agents.nanonets.com`, `api.orcarouter.ai`,
`openrouter.ai`, `api.github.com`, plus localhost.

## WHAT THIS MEANS FOR THIS FACTORY SPECIFICALLY

The general review is not the point. Four consequences are local to this house.

**① IT FITS §8, AND THAT IS WORTH SAYING.** The recurring trap names the split: learning improves how an
agent FINDS its tools, never what it KNOWS. Graft is entirely on the permitted side — it is retrieval, the
pages are committed to git, and the query path is deterministic term overlap. This is not the soft/learned
kind of addition the rule warns against.

**② VERSION DRIFT IS PROMPT DRIFT, AND IT IS THE SHARPEST RISK.** `graft-hooks.cjs` resolves the package by
taking the HIGHEST version it finds across a hard-coded Homebrew path, package resolution, and `npm root -g`.
Two lanes on two machines with two versions inject different context for the same prompt, and nothing in the
repository records which ran. A factory that sells reproducibility cannot have that unpinned.

**③ FULL-TRACE HAS A HOLE THE MOMENT THIS LANDS.** The mandate is that every stage, every read and every
tool call shows INPUT and OUTPUT in Langfuse and in the panel. The prompt hook injects `additionalContext`
into a lane's prompt before the lane runs. That is an INPUT no trace will show. This is not a reason to
refuse the landing; it is a finding that must be filed with it, because the alternative is a mandate quietly
made false.

**④ THE BUILD PROVIDER IS A DECISION, NOT A DEFAULT.** Left alone, the ceramic factory's source is
summarised through OrcaRouter by `gpt-4o-mini`. The owner already pays one model vendor for the lanes.

## THE ARCHITECT'S SINGLE RECOMMENDATION

Land `#535` — the authority stands and the tool is sound — with four settings decided BEFORE it lands, three
of which are one line each:

1. `DO_NOT_TRACK=1` in the lane environments. It closes the telemetry question by the cross-tool convention
   the package honours unconditionally, and it needs no argument with the vendor about a landing page.
2. PIN THE VERSION and record it in the repository. "Highest version wins" is the drift in ②.
3. `GRAFT_PROVIDER=anthropic` with the factory's own key, so the build path stays with the vendor already
   trusted with this code.
4. NEVER set `GRAFT_BRAIN_TOKEN` without its own named decision. That is the path that ships a digest.

And file the FULL-TRACE hole as its own item rather than letting it ride in on this landing.

## WHAT REMAINS UNMEASURED, NAMED

Whether the version installed on the owner's machine is 0.18.0. The Architect read the CURRENT published
package in its own container; the resolver on his machine points at a Homebrew path the bridge cannot reach.

Whether the telemetry allowlist is honoured at runtime. The Architect read the contract and the gate, not a
captured request. The claim rests on the source reading, and a captured request would settle it.

Whether `graft init` writes anything beyond what `#535`'s diff already carries.

END · F-S137-WHAT-GRAFT-ACTUALLY-DOES-MEASURED-FROM-THE-PACKAGE-1
