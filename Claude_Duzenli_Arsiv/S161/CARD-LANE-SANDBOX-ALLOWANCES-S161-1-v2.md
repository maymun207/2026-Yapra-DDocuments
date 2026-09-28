<!-- relay-audit: v1 kind=card -->
CARD-LANE-SANDBOX-ALLOWANCES-S161-1-v2

LANE: AG-1 (fresh window; one card per window; your OWN worktree off origin/master — the main worktree is dirty with an unrelated .claude/settings.json edit, scout-2 item 6)
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-28T00:55Z (bridge clock, date -u)
SUPERSEDES: CARD-LANE-SANDBOX-ALLOWANCES-S161-1-v1 (scout-2 RED, SCOUT-STATUS-REVIEW-CARD-LANE-SANDBOX-ALLOWANCES-S161-1-v1, doc repo S161/, sha256 6221f416f822202dd74450db234613348dc00cec6f7a7bc6224da3f9e1844d64, 2026-09-28T00:25:54Z). v2 = v1 with the scout's complete delta 1–7 applied where each is named. The scout's findings are credited to scout-2 (S112-YASA-1).
OWNER APPROVAL: OWNER-APPROVAL-S161-PLAN-1 ("onay S161 planı", 2026-09-28 02:37 TSI, plan step P5). Register rows 113 (a–d), 66, 118, 87, 17, 109 named below.
ADVERSARY GATE: EXEMPT for this re-cut only — the loop-breaking case of 12.1: v2 repeats v1's subject and applies the scout's own complete delta and nothing else; OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1.

```evidence:adversary
ADVERSARY: EXEMPT
ack: 6221f416f822202dd74450db234613348dc00cec6f7a7bc6224da3f9e1844d64
basis: project instruction 12.1 loop-breaking case + OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1; ack = SCOUT-STATUS-REVIEW-CARD-LANE-SANDBOX-ALLOWANCES-S161-1-v1 (doc-repo file sha256; the scout cannot post through laneSlip, item 7), whose delta 1-7 this body applies
```
BRANCH: phase/lane-sandbox-allowances-s161-2 off origin/master · PUSH early · REPORT docs/relay/LANE-SANDBOX-ALLOWANCES-S161-1-AG1-report.md · PR: yes, non-draft, opened in THIS card.
GRAFT: take context from graft first (laneWrite.resolveLaneDsn/laneExec, laneSlip.postSlip, mail-wait.mjs:1079, checkGroundTruth.ts:223, guard-secrets.py GS-3/GS-4). Slip and report carry a GRAFT line.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time | MEASURED: GitHub API branches/master, Architect bridge, 2026-09-27T23:28Z | master |
| the installed Claude Code (2.1.241) exposes a configurable sandbox; the keys that govern network, filesystem, sockets and TLS are named in its settings schema | READ: scout-2 §1 (schema file path and keys quoted there) | schema |
| the four refusals and their LAYERS | READ: scout-2 §2 (network via proxy-only DNS; filesystem write policy; Seatbelt socket bind; Seatbelt Mach lookup/trustd) | layers |
| laneExec opens a raw pg TCP socket with no proxy; direct DNS fails for every host; egress is proxy-only (HTTP_PROXY/HTTPS_PROXY/ALL_PROXY present) | READ: scout-2 §2a, §6 (laneWrite.mjs:337-348, :145-185) | pg |
| the tsx CLI spawn sites: mail-wait.mjs:1079 (npx tsx), checkGroundTruth.ts:223 (npx tsx), 17 package.json lines; `node --import tsx` works sandboxed with no allowance | READ: scout-2 §6 | tsx |
| .claude/settings.local.json is gitignored (.gitignore:46) and GS-3 blocks any lane from reading or naming it in Bash; Write/Edit is not hooked and sits behind the editor permission prompt | READ: scout-2 §4, §5 | local |

```evidence:master
c58438b59cff4d1d403634b28e44af9b01db6dea
```

```evidence:schema
READ (scout-2, MEASURED there): ~/.vscode/extensions/anthropic.claude-code-2.1.241-darwin-arm64/claude-code-settings.schema.json, properties.sandbox:
sandbox.network.allowedDomains [string] · deniedDomains · strictAllowlist (project settings ignored) · allowUnixSockets · allowAllUnixSockets · allowLocalBinding (boolean) · allowMachLookup ("macOS only: Additional XPC/Mach service names to allow looking up.")
sandbox.filesystem.allowWrite ("Additional paths to allow writing within the sandbox. Merged with paths from Edit(...) allow permission rules.") · denyWrite · denyRead · allowRead
sandbox.enableWeakerNetworkIsolation ("macOS only: Allow access to com.apple.trustd.agent ... Reduces security ... Default: false")
sandbox.excludedCommands · allowUnsandboxedCommands (the escape hatch; FORBIDDEN here)
```

```evidence:layers
READ (scout-2 §2): (a) getaddrinfo ENOTFOUND for EVERY host (pooler, api.github.com, registry.npmjs.org) — direct DNS refused, egress proxy-only; curl through the proxy reached api.github.com (404). (b) os.open(<docrepo>/.git/refs/remotes/origin/scout2-probe.lock, O_CREAT|O_EXCL) → EPERM — filesystem write policy, no git process involved; S160/ writable, S161/ EPERM. (c) tsx → listen EPERM /tmp/claude-501/tsx-501/<pid>.pipe — Seatbelt socket bind. (d) gh → x509 OSStatus -26276 — Seatbelt Mach lookup (trustd), NOT network.
```

```evidence:pg
READ (scout-2 §6): laneExec (scripts/laneWrite.mjs:337-348) opens a raw pg TCP socket with connectionString and no proxy; resolveLaneDsn (:145-185) passes the DSN verbatim, adds ssl rejectUnauthorized:true only. laneSlip → postSlip → laneExec (scripts/laneSlip.mjs:185-203): pg only, no REST host. mail-wait --read already works sandboxed.
```

```evidence:tsx
READ (scout-2 §6): `node --import tsx -e …` → tsx-loader-ok, sandboxed, no allowance. Failing spawns: scripts/mail-wait.mjs:1079 execFileSync('npx', ['tsx', script, '--check', '-']); scripts/checkGroundTruth.ts:223 spawns npx tsx; package.json has 17 lines invoking the tsx CLI (git grep -c).
```

```evidence:local
READ (scout-2 §4-5): .claude/hooks/guard-secrets.py:173-174 maps *.local.json → GS-3; :188-209 refuses Read and any Bash whose path token matches; `git check-ignore -v .claude/settings.local.json` → BLOCKED · GS-3. .gitignore:46 lists .claude/settings.local.json; git ls-files .claude does not list it. No PreToolUse matcher covers Write|Edit. ~/.claude/** is GS-4.
```

## PREMISE
MEASURED by the scout, READ here: the lanes run inside Claude Code's sandbox and four things the factory needs are refused — and each refusal has a DIFFERENT layer (evidence:layers), so one allowance cannot fix them all. Corrected from v1 (scout delta 1): the effective write list is NOT Claude Code's default — it carries non-default paths configured in a layer lanes cannot read (GS-4) or through session directories; this card therefore adds a VERSIONED, minimal layer and does not claim to describe the hidden one.
What actually fixes what (delta 2–5): (a) the bus write fails because pg dials a raw socket and direct DNS is refused for every host; adding the pooler host to allowedDomains admits it AT THE PROXY only — so the fix is a PROXY-AWARE pg transport in laneWrite.mjs (SOCKS5 CONNECT through ALL_PROXY when present) PLUS the pooler host in allowedDomains; api.github.com is dropped (already reachable). (b) the doc-repo tracking ref needs a write allowance on the doc repo's `.git` (root path), not a session folder; it lives in settings.local.json which lanes cannot read back — so its shape is documented and its verification is an OWNER-WITNESS step. (c) the tsx IPC pipe: no allowance — the entry switch `node --import tsx` is measured sufficient; the fence names every spawn site. (d) TLS/trustd: the narrow key is `sandbox.network.allowMachLookup: ["com.apple.trustd.agent"]`; the wide one (`enableWeakerNetworkIsolation`) is a named security reduction and needs an OWNER RULING — this card tries the narrow key ONLY and records the result; if insufficient, gh stays outside the sandbox as a NAMED residual.
SELF-INVALIDATION: dies if any layer attribution above does not reproduce at your head (print both, STOP before ORDER 2), or if ALL_PROXY is absent in a lane window (then (a) has no proxy to speak to: STOP, report).
ON-DISAGREEMENT: YOUR READING WINS: print both, continue with yours.

## FALSIFIER
In a FRESH sandboxed lane window, no human action, no excludedCommands: (i) `node scripts/laneSlip.mjs AG-1 --name PROBE-SANDBOX-S161 --file <probe>` writes a bus row and mail-wait --read reads it back (positive proof of the proxy-aware transport); (ii) in the DOC repo, `git push origin main` followed by `git ls-remote` prints a 40-hex line AND `git rev-parse origin/main` equals it — witnessed by the OWNER on screen (the lane cannot name the local settings file; the ref move is the proof); (iii) `npm run card:preflight -- --check -` and mail-wait's preflight reach a verdict (no EPERM); (iv) `gh api repos/maymun207/cwf_yaprak/branches/master` inside the sandbox: JSON (allowMachLookup sufficient) OR x509 -26276 (insufficient → residual named; NOT a failure of this card). Plant: revert the transport and show (i) fail again; restore.

## ORDERS
0. MEASURE at your head, print: the schema keys (evidence:schema) from the installed schema file; ALL_PROXY/HTTPS_PROXY PRESENCE (names only); the four probes of evidence:layers reproduced once each.
1. PROXY-AWARE PG TRANSPORT (delta 2): scripts/laneWrite.mjs — when ALL_PROXY (or HTTPS_PROXY) is set, laneExec passes pg a `stream` factory that performs a SOCKS5 CONNECT (RFC 1928, no auth; ~60 lines, node:net only — NO new dependency unless `socks` is already in package.json, measure) to the DSN host:port, then hands the socket to pg's TLS as today; when no proxy is set, behaviour is byte-identical to master (a test pins both). `.claude/settings.json` gains `"sandbox": { "network": { "allowedDomains": ["aws-0-eu-west-1.pooler.supabase.com"] } }` — the pooler host ONLY. Nothing for api.github.com.
2. DOC-REPO WRITE (delta 3): document in docs/ops/LANE-SANDBOX.md the exact `.claude/settings.local.json` shape: `{ "sandbox": { "filesystem": { "allowWrite": ["/Users/tunckahveci/Desktop/2026 DESKTOP/2026 - YAPRA/2026 - Yapra - DDocuments/.git"] } } }` (absolute; the doc-repo path spelled exactly as here — spaces on both sides of the dash before YAPRA). You WRITE that file once with the editor tool (the permission prompt is the owner's consent; GS-3 stops you reading it back — do not try; do not name it in Bash). Verification = FALSIFIER (ii), owner-witnessed. No plant/restore on that file.
3. TSX ENTRY SWITCH (delta 4): scripts/mail-wait.mjs:1079 → execFileSync('node', ['--import','tsx', script, '--check','-']); scripts/checkGroundTruth.ts:223 likewise; every package.json script line that invokes the tsx CLI (the 17) → `node --import tsx <file>`; no sandbox allowance for sockets. Print the before/after grep `git grep -n -E "(^|[^-])tsx " -- package.json scripts` .
4. TRUSTD (delta 5): `.claude/settings.json` sandbox gains `"network": { "allowMachLookup": ["com.apple.trustd.agent"] }` (merged with ORDER 1's block). FALSIFIER (iv) measures it. Do NOT set enableWeakerNetworkIsolation; if (iv) is still x509, record F-S161-SANDBOX-TRUSTD-NARROW-KEY-INSUFFICIENT-1 in the report and leave gh outside the sandbox (the owner rules on the wide key separately).
5. docs/ops/LANE-SANDBOX.md (new): per allowance — refusal removed, layer, probe, residual; the local-json shape; the owner-witness step. Anchored to ORDER 0's quotes.
6. UI/UX: none, factory-only. REMOVALS: none. Say both in the report.
7. Counts: `git grep -n -E "armes|Armes|ARMES" -- .claude docs/ops scripts/laneWrite.mjs scripts/mail-wait.mjs package.json` before/after (must not grow); guard-secrets verdict printed; no secret or env VALUE in any changed file.
8. Gates: npm run build (five gates — now runnable in a lane after ORDER 3) + suite + typecheck:api; report with the FILE-FENCE in the first commit; PR non-draft; slip SLIP-LANE-SANDBOX-ALLOWANCES-S161-1 (branch, 40-hex head, PR, CI by full sha read twice if zero, the four probe results, residuals by name) — posted THROUGH THE NEW TRANSPORT (that is FALSIFIER (i)). Do not merge. Stop.

## SHARED SURFACES
```scope
- scripts/laneWrite.mjs (SOCKS5 stream factory; proxy detection); api/cwf/__tests__/ (transport test: no-proxy byte-identical + proxy handshake against a local fake SOCKS server)
- scripts/mail-wait.mjs (:1079); scripts/checkGroundTruth.ts (:223); package.json (the tsx-CLI script lines)
- .claude/settings.json (sandbox: network.allowedDomains, network.allowMachLookup); .claude/settings.local.json (owner machine; written once, never read back)
- docs/ops/LANE-SANDBOX.md (new); docs/relay/LANE-SANDBOX-ALLOWANCES-S161-1-AG1-report.md
- public/architecture/manifest.json (reseal only if check:doc-drift asks)
```

## DECISION RIGHTS
AG-1 decides the SOCKS5 implementation details and file layout. The Architect decided (by the scout's measurements): proxy-aware transport + pooler host only; doc-repo `.git` root path in the local file, owner-witnessed; entry switch, no socket allowance; narrow trustd key only, wide key = owner ruling; every residual named. You may refuse on evidence this card did not anticipate.
FORBIDDEN: no excludedCommands / allowUnsandboxedCommands; no enableWeakerNetworkIsolation; no wildcard domain; no host beyond the pooler; no secret or env value in any file; no change under api/cwf/_lib src/ shared/ data/; no merge; no scout post on your own head; no poll task, no cron.

END · CARD-LANE-SANDBOX-ALLOWANCES-S161-1-v2
