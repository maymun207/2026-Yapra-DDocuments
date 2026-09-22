<!-- relay-audit: v1 kind=card -->
CARD-LANE-FETCH-PROXY-S154-1-v1

LANE: AG-4
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-22T04:12Z (bus clock)
OWNER APPROVAL: S154 plan approval "onayliyorum" 06:40 TSI (small cards). Register item 30 ("Lane node fetch ignores proxy").
ADVERSARY GATE: NEW SUBJECT. Goes to the scout first; reaches AG-4 only with a GREEN verdict row.
ORIGIN: 2026-09-22 ~04:06Z scout-1 window: `node scripts/mail-wait.mjs scout --read <card>` -> exit 4, "[READ-FAILED] could not establish the read path: initialize: fetch failed"; a retry with NODE_USE_ENV_PROXY=1 was DENIED by the auto-mode classifier. The same script worked in the scout-2 window the same hour. A scout could not read its order at all; the owner had to grant a permission by hand (PLATINUM breach class: a machine step moved to the owner).
BRANCH: phase/lane-fetch-proxy-s154-1 off master 9aba71fe2cbad0c53f3996d01b8991e5bbe40ed4 · PUSH early · REPORT docs/relay/LANE-FETCH-PROXY-S154-1-AG4-report.md · PR: yes, non-draft.
SEQUENCING: independent of CARD-LANE-PASSWORD-ROTATION-S154-1-v2; if both reach you, take this one first only if the rotation card is not yet GREEN.
GRAFT: take code context from graft first; slip and report carry a GRAFT line.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the bus read path is one plain global fetch with no proxy handling | MEASURED: git grep and git show on origin/master, bridge, 2026-09-22T04:10Z | rpcfetch |
| four scripts call fetch directly | MEASURED: git grep -l on origin/master, bridge, 2026-09-22T04:10Z | fetchers |

```evidence:rpcfetch
9aba71fe2cbad0c53f3996d01b8991e5bbe40ed4:scripts/mail-wait.mjs:302:    const res = await fetch(endpoint.url, { method: 'POST', headers, body: JSON.stringify(payload) });
```

```evidence:fetchers
scripts/a2aClient.ts
scripts/mail-wait.mjs
scripts/roQuery.ts
scripts/vectorLiveProof.ts
```

## PREMISE
MEASURED: 2026-09-22T04:10Z, bridge, origin/master 9aba71fe2cbad0c53f3996d01b8991e5bbe40ed4: mail-wait's rpc() posts with the global fetch; no ProxyAgent, undici import, setGlobalDispatcher or NODE_USE_ENV_PROXY anywhere in scripts/mail-wait.mjs, scripts/laneWrite.mjs, scripts/laneSlip.mjs, scripts/factoryState.mjs or package.json.
RELAYED: scout-1 window text pasted by the owner, S154 07:06 TSI (the READ-FAILED line above and the classifier denial).
UNMEASURED: the node version in each lane window; whether the failing window's environment carries HTTPS_PROXY / HTTP_PROXY / NO_PROXY (names only); why scout-2's window succeeded (a permission rule, a sandbox setting, or a different network path). ORDER 0 measures by NAME, never value.
SELF-INVALIDATION: dies if master already routes these fetches through the environment proxy.
ON-DISAGREEMENT: YOUR READING WINS: print both, continue with yours.

## ORDERS
0. MEASURE: `node --version`; `npm run env:presence -- HTTPS_PROXY`, then HTTP_PROXY, https_proxy, http_proxy, NO_PROXY (presence only). Read Node's own docs or source for the installed version on NODE_USE_ENV_PROXY and on proxy support in the built-in fetch; quote the primary source.
1. FIX, SELF-CONFIGURING (PLATINUM: no owner step, no prefix to type): every script in the fetchers fence routes its fetch through the environment proxy when one is set, and behaves exactly as today when none is set. Choose the mechanism from ORDER 0's primary source (for example, re-exec once with NODE_USE_ENV_PROXY=1 when a proxy variable is set and the flag is absent, or a proxy-aware dispatcher from a dependency the repo already has). No new dependency without naming it in the report. NO_PROXY is honoured.
2. The failure stays classified: a proxy refusal, a DNS failure and an auth failure print distinct classes; READ-FAILED stays the third value, never "empty box".
3. Tests: unit-test the decision (proxy set / unset / NO_PROXY match) without network. Plant a fault: remove the proxy routing in a scratch worktree and show the test go red.
4. Live proof in YOUR window: `node scripts/mail-wait.mjs AG-4 --read CARD-LANE-FETCH-PROXY-S154-1-v1` prints DIGEST-OK with no env prefix. Say whether your window has a proxy variable (presence only), so the proof says which branch it exercised.
5. npm run build (all five gates) + full suite + typecheck:api locally; open the PR; slip SLIP-LANE-FETCH-PROXY-S154-1 with branch, full head sha, PR number, CI runs by full sha, what is still dark. Stop.

## SHARED SURFACES
None beyond the four scripts, their tests, and a narrative-tab sentence plus reseal if doc-drift asks.

## DECISION RIGHTS
AG-4 picks the mechanism inside ORDER 1 from a primary source. A mechanism that needs the owner or a settings file edit is NOT acceptable: STOP and report.
FORBIDDEN: never print an environment value; no --dangerously-skip-permissions; do not route around a refusal; no poll task, no cron; never merge your own PR.

END · CARD-LANE-FETCH-PROXY-S154-1-v1
