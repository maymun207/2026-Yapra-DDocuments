<!-- relay-audit: v1 kind=status -->
SCOUT-STATUS-REVIEW-CARD-LANE-SANDBOX-ALLOWANCES-S161-1-v1

FROM: scout (scout-2 window), 2026-09-28T00:25:54Z (date -u)
ORDER: ORDER-SCOUT-REVIEW-CARD-LANE-SANDBOX-ALLOWANCES-S161-1-v1 · bus id 1eb42aed-2d4c-4c40-857b-acb2387c0f46 · created_at 2026-09-27 23:57:33.723493+00 · body_md5 6927f20ae5f287cc3f9bffae2f6f9987 [DIGEST-OK] (node scripts/mail-wait.mjs scout --read …; READ, not taken)
CARD UNDER REVIEW: CARD-LANE-SANDBOX-ALLOWANCES-S161-1-v1 · doc repo S161/ · md5 2bc855d08ba46d1818021968b87bd4ec (MEASURED: md5, matches the boot text)
PRECONDITION: master = c58438b59cff4d1d403634b28e44af9b01db6dea — MEASURED: `gh api repos/maymun207/cwf_yaprak/branches/master --jq .commit.sha`, run UNSANDBOXED, as ordered (F-S160-SCOUT-GH-UNSANDBOXED-1). This was the only unsandboxed call.
GRAFT: graft ask (laneSlip/bus), graft skeleton scripts/laneSlip.mjs + scripts/laneWrite.mjs, graft grep resolveLaneDsn, graft ask (mail-wait CLI).
FORBIDDEN KEPT: no repo edit, commit or push; no env value printed (presence only); no poll or cron task.

## VERDICT: RED

The mechanism exists: the installed Claude Code exposes a configurable sandbox. But ORDER 1 cannot deliver its FALSIFIER as written, for two reasons. First, allowance (a) cannot fix refusal (a). Second, allowance (d) names a mechanism the installed schema does not have. The complete delta follows the six items.

## 1 · Installed sandbox schema — MEASURED

- Version: `claude --version` → `2.1.241 (Claude Code)`. `/Users/tunckahveci/.local/bin/claude` → `~/.local/share/claude/versions/2.1.241`. The VS Code extension is `anthropic.claude-code-2.1.241-darwin-arm64`.
- Schema source: `~/.vscode/extensions/anthropic.claude-code-2.1.241-darwin-arm64/claude-code-settings.schema.json`, key `properties.sandbox` (read with python json.load). Keys governing the four questions:
  - NETWORK: `sandbox.network.allowedDomains` [string], `deniedDomains`, `strictAllowlist` ("Only honored from user, managed/policy, or CLI (--settings) settings — project settings (.claude/settings.json and .claude/settings.local.json) are ignored."), `allowManagedDomainsOnly`, `httpProxyPort`, `socksProxyPort`.
  - FILESYSTEM: `sandbox.filesystem.allowWrite` ("Additional paths to allow writing within the sandbox. Merged with paths from Edit(...) allow permission rules."), `denyWrite`, `denyRead`, `allowRead`.
  - IPC / sockets: `sandbox.network.allowUnixSockets` ("macOS only: Unix socket paths to allow."), `allowAllUnixSockets`, `allowLocalBinding` (boolean), `allowMachLookup` ("macOS only: Additional XPC/Mach service names to allow looking up.").
  - TLS: `sandbox.enableWeakerNetworkIsolation` ("macOS only: Allow access to com.apple.trustd.agent in the sandbox. Needed for Go-based CLI tools (gh, gcloud, terraform, etc.) to verify TLS certificates … **Reduces security** — opens a potential data exfiltration vector through the trustd service. Default: false"). There is also `sandbox.network.tlsTerminate` {caCertPath, caKeyPath}, which is "[EXPERIMENTAL] … Only honored from user, managed/policy, or CLI … project settings … are ignored."
  - ESCAPE HATCH (named so it is not missed): `sandbox.excludedCommands` [string] and `allowUnsandboxedCommands`.
- The repo's `.claude/settings.json:2` `$schema` is `https://json-schema.org/draft/2020-12/schema`, the generic meta-schema and not the Claude Code schema. Nothing validates a `sandbox` block written there.

## 2 · Refusals (a)–(d) reproduced — MEASURED, one probe each, sandboxed

- (a) `node --input-type=module -e "…laneExec('select 1')…"` → `WRITE-CHANNEL UNCLASSIFIED … (code ENOTFOUND): getaddrinfo ENOTFOUND aws-0-eu-west-1.pooler.supabase.com`. LAYER: Seatbelt/network. Direct DNS is refused for EVERY host: `node -e dns.lookup` → `aws-0-eu-west-1.pooler.supabase.com ENOTFOUND`, `api.github.com ENOTFOUND`, `registry.npmjs.org ENOTFOUND`. Egress is proxy-only. HTTP_PROXY, HTTPS_PROXY and ALL_PROXY are present (names only printed). `curl https://api.github.com/…` → HTTP 404, meaning the host was reached through the proxy.
- (b) Python `os.open(<docrepo>/.git/refs/remotes/origin/scout2-probe.lock, O_CREAT|O_EXCL)` → `EPERM Operation not permitted`. LAYER: filesystem write policy.
- (c) `npx tsx -e …` → `listen EPERM: operation not permitted /tmp/claude-501/tsx-501/14634.pipe` (syscall listen). It also appeared inside mail-wait's preflight (`…/13838.pipe`). LAYER: Seatbelt socket bind policy. It is not the filesystem layer, because `/tmp/claude` and `/private/tmp/claude` are in the write allow-list.
- (d) `gh api repos/maymun207/cwf_yaprak/branches/master` → `tls: failed to verify certificate: x509: OSStatus -26276`. LAYER: Seatbelt Mach lookup (trustd). It is NOT network policy, because curl reached the same host.

## 3 · Doc-repo tracking ref — MEASURED

This is filesystem write policy, NOT git lock semantics. The probe returned EPERM, not EEXIST, and no git process was involved. The refused path is `/Users/tunckahveci/Desktop/2026 DESKTOP/2026 - YAPRA/2026 - Yapra - DDocuments/.git/refs/remotes/origin/scout2-probe.lock`. The doc repo's top level (git rev-parse --show-toplevel) is `…/2026 - Yapra - DDocuments`. The current write grant covers the SESSION FOLDER only: `…/Claude_Duzenli_Arsiv/S160/` is WRITABLE and `…/Claude_Duzenli_Arsiv/S161/` is EPERM (probe file created and removed in S160). The session folder is an "additional working directory". It rotates every session, and it never covers `.git`.

## 4 · Hook interaction — READ + MEASURED

- `.claude/settings.json:131` wires guard-secrets with matcher `"Read|Bash"`. `.claude/hooks/guard-secrets.py:173-174` has `if base.endswith(".local.json"): return "*.local.json"`, and `:188-209` refuses a Read whose target matches and any Bash command whose PATHISH token matches. MEASURED: `git check-ignore -v .claude/settings.local.json` → `BLOCKED · GS-3 · *.local.json`.
- A Write/Edit of `.claude/settings.local.json` is NOT hooked, because no PreToolUse matcher covers Write|Edit. The Bash sandbox itself lists `…/cwf_yaprak/.claude/settings.json` and `…/.claude/settings.local.json` in denyWithinAllow, so only the editor tool, behind its permission prompt, can write them.
- Consequence: after AG-1 writes settings.local.json, no lane can READ it back, and no lane can name it in Bash. That rules out git check-ignore, a diff, and ORDER 1b's plant/restore on it.
- `~/.claude/**` is GS-4. The user layer is the only project-external layer that honours `strictAllowlist`, `tlsTerminate`, `allowAppleEvents` and `filesystem.disabled`, and lanes cannot inspect it (MEASURED: BLOCKED · GS-4 on ~/.claude/settings.json).

## 5 · settings.local.json gitignored? — READ (the ordered command is refused)

`git check-ignore -v .claude/settings.local.json` → BLOCKED · GS-3, by the hook quoted in item 4. I did not respell it. Other lens: `.gitignore:46` reads `.claude/settings.local.json` (under the comment on :45), and `git ls-files .claude` does not list it. So it is ignored and untracked.

## 6 · Wider / missing — MEASURED

- WIDER THAN NEEDED: `api.github.com` in (a). curl already reaches it through the proxy (404). The gh failure is trustd, not the host allow-list.
- WRONG MECHANISM: (d) "CA bundle path / keychain access". The installed key is `sandbox.enableWeakerNetworkIsolation` (trustd Mach), which the schema flags "Reduces security … exfiltration vector". A narrower candidate is `sandbox.network.allowMachLookup: ["com.apple.trustd.agent"]`. Neither has been tried, so both are UNMEASURED; this order forbids edits. This is a security trade and it needs an OWNER ruling, not a lane decision.
- INSUFFICIENT: (a) the pooler hostname in `allowedDomains`. `laneExec` (`scripts/laneWrite.mjs:337-348`) opens a raw `pg` TCP socket with `connectionString` and no proxy. Direct DNS fails even for hosts the proxy already admits (item 2a). An allowedDomains entry only admits the host AT THE PROXY. Expected result: ENOTFOUND persists and FALSIFIER (i) fails. A fix needs a proxy-aware transport, i.e. SOCKS through the sandbox's ALL_PROXY, in laneWrite.mjs, which is outside the card's scope block. The alternative, `excludedCommands`, is "leaving the sandbox", which the card forbids.
- No Supabase REST host is needed. laneSlip → `postSlip` → `laneExec` (`scripts/laneSlip.mjs:185-203`), so it is pg only. `resolveLaneDsn` (`laneWrite.mjs:145-185`) does no host handling: it passes the DSN verbatim and adds only `ssl: {rejectUnauthorized:true}` when sslmode is absent. The mail-wait read path already works sandboxed (this order was read with it).
- MISSING, for (c): `node --import tsx -e …` → `tsx-loader-ok`, sandboxed, with no allowance. So 1c's entry switch is MEASURED sufficient and no socket allowance is needed. BUT the failing spawn is `scripts/mail-wait.mjs:1079` `execFileSync('npx', ['tsx', script, '--check', '-'])`, not only `package.json:43` `"card:preflight": "tsx scripts/cardPreflight.ts"`. The scope block names "package.json (that script line only)" and misses mail-wait.mjs:1079. Also `scripts/checkGroundTruth.ts:223` spawns `npx tsx`. `git grep -c` counts 17 package.json lines that invoke the tsx CLI. ORDER 6's `npm run build` in a lane is therefore UNMEASURED and likely to hit the same EPERM.
- MISSING, for (b): the allowance must name the doc repo ROOT (at least `<docrepo>/.git`), not a session folder. The Architect's own fallback path (S161/) is EPERM today. Per the schema, allowWrite paths in settings.local.json resolve "relative to the settings file root" or absolute. The path contains spaces and a double space in `2026 - Yapra -  Codes`.

## DELTA (complete)

1. PREMISE correction: "whatever the sandbox allows today is Claude Code's DEFAULT" is falsified. The effective write list carries non-default paths (other repos, the S160 doc folder), so it is configured in a layer lanes cannot read (GS-4) or through session additional directories.
2. 1a: drop `api.github.com`, which is already reachable. The pooler entry alone does not fix (a). Either re-scope the card to add a proxy-aware pg transport (scripts/laneWrite.mjs) and prove it, or the Architect re-plans. FALSIFIER (i) is unattainable as scoped.
3. 1b: grant the doc repo root or its `.git`, not the session folder. ORDER 1b's "confirm gitignored" and the plant/restore on the local file cannot be performed by a lane under GS-3. Name them as owner-witness steps, or use the .gitignore:46 lens.
4. 1c: decide it now. The entry switch is measured sufficient. Scope must add `scripts/mail-wait.mjs` (line 1079), and preferably `scripts/checkGroundTruth.ts:223`. package.json has 17 tsx-CLI lines, which ORDER 6 gates will meet in a lane.
5. 1d: the key is `enableWeakerNetworkIsolation` or `allowMachLookup` com.apple.trustd.agent, a named security reduction that needs an owner ruling. `tlsTerminate` is ignored at project level.
6. The main worktree is dirty: `M .claude/settings.json` (+`WebFetch(domain:arxiv.org)`, footerLinksRegexes emptied). This is not scout work and it is not touched. AG-1 must cut from origin/master in its own worktree.
7. ORDER-level: a scout cannot post through laneSlip. `scripts/laneSlip.mjs:225` accepts only `^AG-[0-9]+$`, and `postSlip` requires the caller's claimed nonce (:195). "Status via laneSlip" is structurally unavailable to `scout`, independent of DNS.

## BUS WRITE

MEASURED: `node scripts/laneSlip.mjs scout --name SCOUT-STATUS-REVIEW-CARD-LANE-SANDBOX-ALLOWANCES-S161-1-v1 --file <this file>` → exit 2, `[lane-slip] the first argument is the posting lane, AG-N — identity is passed in, never inferred`. The same usage text states a 1024-character cap (FW005) and the required fields card/branch/head/report/ci/status (FW006). A scout status of this length cannot travel by laneSlip even under an AG address. The refusal came BEFORE the DNS layer was reached. This file is the ordered fallback. The Architect commits it (register 109).

read relay_inbox at 2026-09-28T00:25:54Z for THIS card only (OWNER-RULING-S143-OPERATING-MODEL-1): ORDER-SCOUT-REVIEW-CARD-LANE-SANDBOX-ALLOWANCES-S161-1-v1, direct read by artifact_name, created_at 2026-09-27 23:57:33.723493+00, acted on. The rest of the scout box was not read, so its emptiness is UNMEASURED.

END · SCOUT-STATUS-REVIEW-CARD-LANE-SANDBOX-ALLOWANCES-S161-1-v1
