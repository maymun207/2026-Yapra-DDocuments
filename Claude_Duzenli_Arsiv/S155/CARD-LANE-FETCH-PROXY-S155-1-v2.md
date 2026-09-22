<!-- relay-audit: v1 kind=card -->
CARD-LANE-FETCH-PROXY-S155-1-v2

LANE: AG-4
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-22T15:10Z (bus clock)
SUPERSEDES: CARD-LANE-FETCH-PROXY-S154-1-v1 (scout RED, SCOUT-STATUS-REVIEW-CARD-LANE-FETCH-PROXY-S154-1-v1, bus 2026-09-22T15:07:41Z). Applied as edits, all and only the scout's seven: FALSIFIER added; bare sha moved to CLAIMS; RELAYED premise replaced by the scout's MEASURED lines; ORDER 1 fence = call sites and importers, module-level routing, runtime NODE_USE_ENV_PROXY is inert, setGlobalProxyFromEnv feature-detected, undici example dropped, pg/TCP out of scope; ORDER 2 no URL printed and a userinfo test; ORDER 4 names which branch it proves; ORDER 0 uses node --import tsx.
OWNER APPROVAL: S154 plan approval "onayliyorum" 06:40 TSI; S155 plan approval "onay" 18:03 TSI. Register item 30.
ADVERSARY GATE: EXEMPT, the loop-breaking case of 12.1: same subject, only the scout's named delta (ack = the scout's RED row).
BRANCH: phase/lane-fetch-proxy-s155-1 off master (claims row base) · PUSH early · REPORT docs/relay/LANE-FETCH-PROXY-S155-1-AG4-report.md · PR: yes, non-draft.
GRAFT: take code context from graft first; slip and report carry a GRAFT line.

```evidence:adversary
ADVERSARY: EXEMPT
ack: a512d617-a5a7-4f6a-ba6a-57fcecf1c04a
```

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time (base) | MEASURED: GitHub API commits/master, Architect bridge, 2026-09-22T15:01Z | base |
| the bus read path is one plain global fetch with no proxy handling | MEASURED: git grep and git show on master, bridge, 2026-09-22T04:10Z; scout re-grep at fdb0df24 found no proxy routing, 2026-09-22T15:07Z | rpcfetch |
| four scripts call fetch directly | MEASURED: git grep -l on master, bridge, 2026-09-22T04:10Z; scout graft grep and git grep, 2026-09-22T15:07Z | fetchers |
| the fault reproduces in a scout window and the in-process call fixes it | READ: scout status on the bus, 2026-09-22T15:07:41Z | repro |

```evidence:base
fdb0df24d0b9dd288223fec55da4185f4ca62382
```

```evidence:rpcfetch
scripts/mail-wait.mjs:    const res = await fetch(endpoint.url, { method: 'POST', headers, body: JSON.stringify(payload) });
```

```evidence:fetchers
scripts/a2aClient.ts
scripts/mail-wait.mjs
scripts/roQuery.ts
scripts/vectorLiveProof.ts
```

```evidence:repro
node scripts/mail-wait.mjs scout --read <order> -> exit 4 "[READ-FAILED] could not establish the read path: initialize: fetch failed"
same command with NODE_USE_ENV_PROXY=1 -> DIGEST-OK
node --version = v26.4.0; HTTPS_PROXY, HTTP_PROXY, https_proxy, http_proxy, NO_PROXY, no_proxy all SET (presence only)
plain fetch('https://mcp.supabase.com/') -> cause ENOTFOUND; after require('node:http').setGlobalProxyFromEnv() in-process -> HTTP 404 (host reached)
```

## PREMISE
MEASURED: the base, rpcfetch and fetchers anchors above.
READ, from the scout's window and not re-measured by the Architect: the repro anchor. Node doc (v26.4.0 cli.md): --use-env-proxy "added: v24.5.0, v22.21.0" and the proxy variables are parsed "during startup", so setting NODE_USE_ENV_PROXY inside a running script is inert. The added-in version of http.setGlobalProxyFromEnv is UNMEASURED. package.json has no engines pin. undici is not a declared dependency.
UNMEASURED: the node version and proxy variables in AG-4's own window (ORDER 0 measures them by name).
SELF-INVALIDATION: dies if master already routes these fetches through the environment proxy.
ON-DISAGREEMENT: YOUR READING WINS: print both, continue with yours.

## FALSIFIER
This is wrong if, at your head, `node scripts/mail-wait.mjs <lane> --read <card>` still prints READ-FAILED without an env prefix in a window where HTTPS_PROXY is SET and direct DNS fails; or if any importer named in ORDER 1 still reaches the network unrouted in such a window.

## ORDERS
0. MEASURE: `node --version`; `node --import tsx scripts/envPresence.ts HTTPS_PROXY HTTP_PROXY https_proxy http_proxy NO_PROXY no_proxy` (presence only; `npm run env:presence` dies on tsx IPC EPERM in sandboxed windows). Read Node's own doc or source for the installed version on http.setGlobalProxyFromEnv and quote it.
1. FIX, SELF-CONFIGURING (PLATINUM: no owner step, no prefix to type). The fence is the four call sites AND their importers: archivePush.mjs, authoritySnapshot.mjs, factoryState.mjs, laneSlip.mjs (via factoryState), census.ts, claimRoster.ts. Put the routing at MODULE LOAD of the rpc modules (mail-wait.mjs, roQuery.ts) or in one shared helper that every fetching module imports; never in a CLI main. Setting process.env.NODE_USE_ENV_PROXY at runtime is INERT and is not a fix. The measured in-process candidate is require('node:http').setGlobalProxyFromEnv(), feature-detected: when a proxy variable is set and the API is absent, print a named class and continue as today. When no proxy variable is set, behaviour is byte-identical to today. NO_PROXY is honoured. No new dependency. laneWrite.mjs (pg over raw TCP) is OUT OF SCOPE and stays DARK; name it in the report.
2. The failure stays classified: "proxy set but unused" is classified before "DNS" (in a proxied sandbox the unrouted failure is ENOTFOUND); a proxy refusal, a DNS failure and an auth failure print distinct classes; READ-FAILED stays the third value. Classes print a class name and the proxy HOST presence only, never a URL, never err.cause text that carries one.
3. Tests: unit-test the decision (proxy set / unset / NO_PROXY match / API absent) without network. A test plants a proxy URL with userinfo and asserts it appears in no output of any class. Plant a fault: remove the routing in a scratch worktree and show a test go red.
4. Live proof in YOUR window: `node scripts/mail-wait.mjs AG-4 --read CARD-LANE-FETCH-PROXY-S155-1-v2` prints DIGEST-OK with no env prefix. If your window has no proxy variable, the proof covers the unset branch only and the slip says so; the proxy branch is then proved by a scout reading its order without prefix after the PR lands.
5. npm run build (all five gates) + full suite + typecheck:api locally; open the PR; slip SLIP-LANE-FETCH-PROXY-S155-1 with branch, full head sha, PR number, CI runs by full sha, what is still dark. Stop.

## SHARED SURFACES
The fetching scripts and their importers named in ORDER 1, their tests, and a narrative-tab sentence plus reseal if doc-drift asks; merge origin/master, then reseal, in one commit.

## DECISION RIGHTS
AG-4 picks the mechanism inside ORDER 1 from a primary source. A mechanism that needs the owner or a settings file edit is NOT acceptable: STOP and report. The tsx IPC EPERM finding is registered by the Architect as its own item and is not in this card.
FORBIDDEN: never print an environment value or a proxy URL; no --dangerously-skip-permissions; do not route around a refusal; no poll task, no cron; never merge your own PR.

END · CARD-LANE-FETCH-PROXY-S155-1-v2
