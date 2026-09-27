<!-- relay-audit: v1 kind=card -->
CARD-LANE-SANDBOX-ALLOWANCES-S161-1-v1

LANE: AG-1 (fresh window; one card per window) — reaches AG-1 ONLY with a scout GREEN row
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-28T00:02Z (bridge clock, date -u)
OWNER APPROVAL: OWNER-APPROVAL-S161-PLAN-1 ("onay S161 planı", 2026-09-28 02:37 TSI, plan step P5). Register row 113 (a–d), 66, 118, 87 named below.
ADVERSARY GATE: NEW SUBJECT → goes to the scout first (project instruction 12.1); this body is delivered to AG-1 only inside a GREEN verdict's ack. No exemption is claimed.
BRANCH: phase/lane-sandbox-allowances-s161-1 off origin/master · PUSH early · REPORT docs/relay/LANE-SANDBOX-ALLOWANCES-S161-1-AG1-report.md · PR: yes, non-draft, opened in THIS card.
GRAFT: take context from graft first (laneSlip, laneWrite.laneExec, mail-wait, factoryState heartbeat, scripts that spawn tsx); slip and report carry a GRAFT line.
Work in your own worktree for this branch, never in the main worktree another lane uses.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time | MEASURED: GitHub API branches/master, Architect bridge, 2026-09-27T23:28Z | master |
| the repo's Claude Code settings carry a permissions allow-list and hooks, and NO sandbox section | MEASURED: GitHub contents API .claude/settings.json at master, Architect bridge, 2026-09-28T00:00Z (top-level keys: $schema, env, permissions, hooks, statusLine, subagentStatusLine, footerLinksRegexes) | settings |
| four refusal classes were measured in lanes in S160–S161, all from the lane sandbox, none from the permission allow-list | READ: CWF-S160-FINDINGS-v1 §B; SCOUT-STATUS-LAND-PR625-S160-1 N5; AG-4's ORDER 3 screen 2026-09-28 02:49 TSI (owner relay); AG-1 push slips S160 | refusals |

```evidence:master
c58438b59cff4d1d403634b28e44af9b01db6dea
```

```evidence:settings
c58438b59cff4d1d403634b28e44af9b01db6dea:.claude/settings.json:5:  "permissions": {
c58438b59cff4d1d403634b28e44af9b01db6dea:.claude/settings.json:6:    "allow": [
c58438b59cff4d1d403634b28e44af9b01db6dea:.claude/settings.json:39:      "Bash(git push origin:*)",
c58438b59cff4d1d403634b28e44af9b01db6dea:.claude/settings.json:56:      "Bash(npx tsx:*)",
c58438b59cff4d1d403634b28e44af9b01db6dea:.claude/settings.json:60:      "Bash(node --import tsx:*)",
READ: python3 json.load(settings.json).keys() at master → ['$schema','env','permissions','hooks','statusLine','subagentStatusLine','footerLinksRegexes']; d.get('sandbox') → None
```

```evidence:refusals
READ (F-S160-LANE-SANDBOX-DNS-BLOCKS-BUS-WRITE-1, AG-1 ×2, AG-4 ×1 in S161): getaddrinfo ENOTFOUND aws-0-eu-west-1.pooler.supabase.com — laneSlip / laneExec cannot resolve the pooler host inside the sandbox; nothing reaches the server.
READ (same finding, AG-1 ×2, S160): after a successful `git push origin main` in the DOC repo, the local tracking-ref write is refused: cannot lock ref 'refs/remotes/origin/main' … Operation not permitted — the doc repo lives OUTSIDE the cwf_yaprak workspace.
READ (F-S160-PREFLIGHT-UNMEASURED-IN-SANDBOX-1, register 66): tsx IPC pipe listen EPERM — cardPreflight cannot run in a lane; lanes report PREFLIGHT-UNMEASURED.
READ (F-S160-SCOUT-GH-UNSANDBOXED-1, scout-2 N5): gh calls fail TLS verification under Seatbelt (x509 -26276); the scout ran gh unsandboxed.
```

## PREMISE
MEASURED: the anchors above. In plain words: the lanes run inside Claude Code's sandbox, and four things the factory NEEDS are refused by it — (a) the database pooler's hostname cannot be resolved, so a lane cannot write its slip or heartbeat and every report that mattered came by the owner's hand; (b) after pushing the document repo the lane cannot update its own tracking ref because that repo is outside the workspace, so the push proof had to be repaired from the bridge; (c) the tsx IPC pipe is refused, so the card preflight never runs in a lane; (d) TLS verification fails under the sandbox, so the scout runs gh outside it. Today each is worked around by a human or by leaving the sandbox — PLATINUM says that is a design error. The repo's settings carry NO sandbox configuration at all (evidence:settings): whatever the sandbox allows today is Claude Code's DEFAULT, not this factory's decision.
WHAT THE ARCHITECT DOES NOT KNOW, and the card refuses to guess (§10, 12.2): the exact settings schema by which Claude Code configures its sandbox (network allow-list, filesystem write paths, unix-socket/IPC, TLS/CA handling) in the version installed on the owner's machine. ORDER 0 measures it from the INSTALLED source and docs, not from memory.
SELF-INVALIDATION: dies if ORDER 0 finds the installed Claude Code has no configurable sandbox (then the card becomes a "leave the sandbox for these four verbs, by name" card and STOPS for the Architect), or if any refusal class above does not reproduce at your head.
ON-DISAGREEMENT: YOUR READING WINS: print both, STOP before ORDER 1 if the mechanism differs from what ORDER 0 assumed.

## FALSIFIER
After ORDER 1, in a FRESH sandboxed lane window (not this one), with no human action and no "run outside the sandbox": (i) laneSlip posts a test slip to the bus and the row exists (positive proof); (ii) in the DOC repo, `git push origin main` followed by `git ls-remote` prints a 40-hex line AND `git rev-parse origin/main` equals it (tracking ref updated); (iii) `npm run card:preflight` (or the repo's preflight entry) runs to a verdict, not EPERM; (iv) `gh api repos/maymun207/cwf_yaprak/branches/master` returns JSON inside the sandbox. Any of the four still refused = the card is NOT done; report which and STOP. Plant: remove one allowance and show its probe fail again; restore.

## ORDERS
0. MEASURE, NO CHANGE. (1) Print the installed Claude Code version. (2) From the INSTALLED package (its bundled docs/schema/source — `npm ls -g`, the settings JSON schema the $schema line points to, `claude --help`, the sandbox docs it ships), print the settings keys that govern: network egress allow-list (domains/hosts), filesystem write allow-list, unix sockets / IPC, and TLS/CA behaviour; quote the lines with their file path. (3) Reproduce each refusal (a)–(d) once in the sandbox with a minimal probe and print the exact refusal line (no secrets: hostnames and error codes only). (4) Name for each refusal which sandbox layer produced it (network policy, filesystem policy, Seatbelt profile) as the installed docs describe it. If (2) finds NO configurable sandbox: STOP, slip SLIP-LANE-SANDBOX-ALLOWANCES-S161-1-ORDER0 with the evidence; the Architect re-plans.
1. ALLOWANCES, MINIMAL and NAMED, in `.claude/settings.json` (versioned, so every lane window inherits them): (a) network: the Supabase pooler host `aws-0-eu-west-1.pooler.supabase.com` and `api.github.com` (+ `github.com` only if the push probe needs it) — hostnames only, no wildcards wider than the host; (b) filesystem: write allowance for the DOCUMENT repo path — this is an owner-machine path, so it does NOT go in the versioned file: it goes in `.claude/settings.local.json` (untracked; confirm it is gitignored, else add it to .gitignore in this card) written ONCE by you with the owner's named permission prompt, and its SHAPE (key, example) is documented in docs/ops/LANE-SANDBOX.md so the next machine can reproduce it; (c) IPC: the allowance the tsx IPC pipe needs, OR, if the installed sandbox cannot grant it, the repo's preflight entry switches to `node --import tsx` (register 66) — you decide from ORDER 0's measurement and say which; (d) TLS: the allowance that lets gh verify certificates inside the sandbox (CA bundle path / keychain access) as the installed docs describe; if none exists, gh stays outside the sandbox and the card RECORDS that as the named residual with its finding id.
2. docs/ops/LANE-SANDBOX.md (new): each allowance, the refusal it removes, the probe that proves it, and the residual (if any). Every line anchored to ORDER 0's quotes.
3. PROVE: run the FALSIFIER's four probes from a fresh sandboxed window (you may open it yourself if the IDE allows; otherwise name it as the owner witness step in the slip and STOP before claiming done).
4. UI/UX (OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1): none — this card touches no product surface; say "UI/UX: none, factory-only" in the report. REMOVALS: none.
5. Counts: `git grep -n -E "armes|Armes|ARMES" -- .claude docs/ops` before/after (must not grow); no secret or env value in any changed file (guard-secrets hook is the gate; print its verdict).
6. Gates: npm run build (five gates) + suite + typecheck:api; report with the FILE-FENCE in the first commit; PR non-draft; slip SLIP-LANE-SANDBOX-ALLOWANCES-S161-1 (branch, 40-hex head, PR, CI by full sha read twice if zero, the four probe results, the residuals by name). Do not merge. Stop.

## SHARED SURFACES
```scope
- .claude/settings.json (sandbox section — new); .claude/settings.local.json (owner machine, untracked; .gitignore if needed)
- docs/ops/LANE-SANDBOX.md (new); docs/relay/LANE-SANDBOX-ALLOWANCES-S161-1-AG1-report.md
- scripts/ (only if ORDER 1c switches the preflight entry to node --import tsx); package.json (that script line only)
```

## DECISION RIGHTS
AG-1 decides the exact keys and file layout from ORDER 0's measurement, and whether 1c is an allowance or the entry switch. The Architect decided: allowances are minimal and hostname-exact; the owner-machine path never enters the versioned file; every residual is named, never silent; no lane "leaves the sandbox" as a fix. You may refuse on evidence this card did not anticipate.
FORBIDDEN: no wildcard network allowance; no allowance for any host not named here; no secret, token or env value in any file; no change under api/ src/ shared/ data/; no merge; no scout post on your own head; no poll task, no cron.

END · CARD-LANE-SANDBOX-ALLOWANCES-S161-1-v1
