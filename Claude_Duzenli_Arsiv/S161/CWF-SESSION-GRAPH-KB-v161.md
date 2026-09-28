<!-- relay-audit: v1 kind=notice -->
CWF-SESSION-GRAPH-KB-v161

Cut at S161 close, 2026-09-28. Edges learned in S161, each session-tagged; v160 edges stand unchanged and are not repeated. Form: SUBJECT —relation→ OBJECT [S161, evidence].

- CARD-ENTRY-FLOOR-REQUIRED-S161-1-v1 —landed-as→ PR 627 (supersedes PR 626, fence dialect) —merged-as→ master 81c87d58962bc01a1e164f8189fb97928810dee9 [S161, scout-2 GREEN 05:05Z; Vercel dpl_EmnaYgNTuSP3GrGfhBojHbRdip6K READY].
- filterToolsByMessage.entryFloor —is-now→ required (nine-arg callers; five middle slots `T | undefined` by TS1016) —guarded-by→ @ts-expect-error pin in 8-arg spelling (3-arg spelling was vacuous: fails for missing middle args, not the floor) [S161, scout-2 2b; AG-4 TS2578 plant].
- stage-07 claim —is-now→ "entryFloorSource is named" (data · absent · unread; enum at api/cwf/_lib/knowledge/entryFloor.ts:39) —replaces→ "Liste asla boş kalamaz" [S161, RULING-S161-F3-F6-1; PR 627].
- mcp-catalog under unreadable rule store —fails-closed→ reachability 'unread', unreachableTools [], badge data-testid catalog-reachability-unread [S161, PR 627, scout-2 2d/2e].
- scout status verb —is→ scout_reply (RPC; .claude/boot/free.md:289) —not→ laneSlip (refuses `^AG-[0-9]+$` mismatch) [S161, A-REC-S161-1].
- scout READ mode —does-not-stamp→ consumed_at; every S161 order acted on shows consumed_at NULL [S161, bus rows; register 67].
- lane sandbox egress —is→ proxy-only (HTTP CONNECT with auth via ALL_PROXY/HTTPS_PROXY, not SOCKS5) —admits→ pg to the pooler when laneWrite.mjs dials through CONNECT [S161, AG-1 slip a6b3e9ab from inside the sandbox = FALSIFIER (i); corrects CARD-LANE-SANDBOX v2's SOCKS5 premise].
- producer lane —can-now-write→ relay_inbox from the sandbox (AG-1, AG-3, AG-4 slips) [S161; narrows F-S133-PRODUCER-HAS-NO-BUS-WRITE-PATH-1; on branch PR 629 until landed].
- .claude/settings.local.json —gained→ sandbox.filesystem.allowWrite [doc-repo/.git] —written-by→ Architect over the bridge under "onay sandbox-local" [S161, 05:18:41Z; verification pending = FALSIFIER (ii)].
- trustd —allowed-only-by→ sandbox.network.allowMachLookup ["com.apple.trustd.agent"]; enableWeakerNetworkIsolation —forbidden-by→ RULING-S161-TRUSTD-NARROW-1 [S161].
- deriveRouteDrafts —never-invents→ categories; kinds —minted-only-over→ data/backends/index.json ids; census —does-not-propose→ categories [S161, grep 0 hits; MEASURED by exam:ka on PR 630: ledger/freight 90 q each hits=0 recall=0.000 categoryDraftsStaged=0].
- public.backends (7 rows, armes-new retired) —diverges-from→ data/backends/index.json —read-by→ kinds.ts:474 NON_SYSTEM_BACKEND_IDS [S161, F-S161-TWO-BACKEND-REGISTRIES-1 → CARD-E2-BACKEND-REGISTRY-TO-DATA-S162-1].
- merge guard —collides→ PRs 627/628/629/630 pairwise on package.json (additive scripts) and public/architecture/manifest.json (seal) —serialises→ landing order 627 → 628 → 629 → 630 [S161, pulls/N/files set intersections; F-S161-MERGE-GUARD-COLLISION-SERIALISES-LANES-1].
- seal-only merge conflict —remedy→ `npm run reseal` in the merge commit (CLAUDE.md §5) —not→ STOP [S161, NOTICE-PR628-MERGE-MASTER-S161-2].
- master merge commit —carries-no→ push-triggered Actions run (81c87d58: total_count 0, two reads) [S161; register 93].
- E1-c instrument —matches-by→ identifier SEGMENT equality (camelCase, _, __, -), EXACT-MATCH baseline data/gates/backend-names-baseline.json, --arm-zero, nameGate.zeroExempt in data/backends/index.json [S161, CARD-E1C v2, scout-1 GREEN-CONTENT PR 628].
- E1-b —is→ measure-the-gap instrument (runRouteDerivation DI seam; pure core computeRouterAbArmA / scoreRouterAbCoverage; `npm run exam:ka`, nightly, outside vitest include) [S161, CARD-E1B v2; PR 630].
- Architect bus read —must-filter-by→ artifact_name (a created_at window missed row c534185c for 3h20m) [S161, F-S161-ARCHITECT-BUS-READ-WINDOW-MISS-1].
- gh.sh —takes→ a path only (`gh.sh pulls/627`); gh-CLI syntax —yields→ 404 that looks like a credential loss [S161, F-S161-GH-SH-CALLING-CONVENTION-1].
- search_tools("inventory") —returns→ [] although getInventory exists [S161, owner tour, production 81c87d58; F-S161-SEARCH-TOOLS-EMPTY-FOR-EXISTING-TOOL-NAME-1].
- "pişmiş stok" —maps-to→ NOTHING in CWF data (entity type / state / zone unmapped; enum values guessed) [S161, F-S161-PISMIS-STOK-VOCAB-UNMAPPED-1; getInventoryCatalogue([]) semantics UNMEASURED].
- answer compose —asserted→ absence over [] + errors ("mevcut değildir") —violates→ empty ≠ zero [S161, F-S161-EMPTY-AS-ZERO-IN-ANSWER-PROSE-1; honesty metric = owner decision].
- A25 fully implemented —does-not-answer→ the pişmiş-stok question by itself (measures the gap, turns guess into ask; needs S1 fix, S2 data row, S4 compose rule) [S161, CWF-S161-TOUR-ASSESSMENT-PISMIS-STOK-v1].
- scripts/mail-wait.mjs —is→ the bounded in-turn lane wait (90 s cadence, 40 min budget; exit 0 mail / 3 no mail / 4 read failed / 5 digest / 6 grammar) —built-for→ F-S107-LANE-WAKE-MANUAL (S109) —never-called-by→ any boot text until S161 [S161, header of the script at master; PLATINUM-BREACH-S161-1].
- OWNER-RULING-S161-LANES-WAIT-1 —supersedes→ the "stops" sentence of OWNER-RULING-S143-OPERATING-MODEL-1 —keeps→ NO-CRON [S161, owner 08:51 TSİ].
- a lane without the proxy transport —writes-its-slip-to→ Claude_Duzenli_Arsiv/S161/<name>.md —which-the-Architect-must-read→ every tick [S161, F-S161-ARCHITECT-DID-NOT-READ-THE-FALLBACK-FILE-1].
- npm run reseal —cannot-parse→ conflict markers; seal conflict —resolved-by→ checkout --theirs + reseal in the merge commit [S161, AG-2 slip; NOTICE-PR628 v3].
- E1-a exam —gains→ emptyVsZeroHonesty (lexicon as data, bar exam.acceptance.honesty) [S161, OWNER-APPROVAL-S161-HONESTY-METRIC-1; CARD-E1A v3 ORDER 4b, scout-1 delta review pending].

END · CWF-SESSION-GRAPH-KB-v161
