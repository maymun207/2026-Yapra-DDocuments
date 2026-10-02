SOTA-1 — KABUL KRİTERİ (S80). v1'in tek kabul kriteri cwf-sota-definition'dır. O dosyadaki bir kritere izlenemeyen her şey v1 kapsamı dışıdır. Architect, bir SOTA kriterini ilerleten hiçbir kalemi "şimdilik gerek yok / az trafik / bu kadarı yeter / sonra / v1.1'e" gerekçesiyle erteleyemez, küçültemez, sırada aşağı çekemez. Elinde kalan tek itiraz sınıfı *"bu sıralama SOTA'yı kanıtlanamaz kılar"*dır ve ancak şunları YAZILI adlandırırsa kabul edilir: (a) hangi kriter kanıtsız kalır, (b) hangi tarihte kanıtlanabilir olur, (c) hangi ölçüm çözer. Üçü eksik her erteleme önerisi bir SOTA-1 ihlalidir: sahip adıyla iptal eder, Architect ya aynı mesajda (a)+(b)+(c)'yi verir ya öneriyi geri çeker — üçüncü yol yoktur. Bir kriter YALNIZ kanıtla emekli olur; kolaylık, maliyet veya kapsam baskısıyla asla.

CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v180
Cut at S170 (2026-10-02T00:40Z, owner turn 19: "yeni sessionda devam edelim bunu kapatalim"). SUPERSEDES v179.
Carriers: register v165 (= v164 + CWF-S170-OPEN-ITEMS-TABLE-v1 rows 210–217 + cwf-open-items-register-v165-S170-SECTIONS), CWF-S170-SESSION-CLOSE-v1, CWF-S170-FINDINGS-v1, CWF-SESSION-GRAPH-KB-v170, CWF-S170-PLAN-v1, OWNER-DESIGN-S170-PRIORITY-1, CWF-S170-RESUME-v1, instructions v5_11. Every line not re-measured at this cut is CARRIED UNVERIFIED and says so.
Next session: S171 (Claude_Duzenli_Arsiv/S171/).

## 0 · FIRST TOOL CALL OF S171
SendUserMessage with the SOTA-1 paragraph above, VERBATIM, before any read.

## 1 · OPEN SEQUENCE
1. Task list from register v165 open rows: 691 landing + migration, K29 GO, 218, 220, 221, 222/224, 223, 227, then the plan's remaining waves (CWF-S170-PLAN-v1 §2).
2. Capabilities: `ls $HOME/mnt/` must show "2026 - Yapra - DDocuments", cwf-architect-ro, cwf_yaprak. If the bridge is absent, the Mac is asleep, offline, or the Claude desktop app is closed — say so in the same turn (F-S170-BRIDGE-CANNOT-READ-GITHUB-WHEN-MAC-SLEEPS-1: the container's own request to api.github.com is refused at the proxy).
3. GitHub: `bash $HOME/mnt/cwf-architect-ro/gh.sh <path-under-repo>` (repo maymun207/cwf_yaprak). Doc repo git: `bash $HOME/mnt/cwf-architect-ro/gitw.sh "<repo dir>" <git args>` — the repo dir is the FIRST argument; never raw git there (stale locks).
4. Vercel production: NOT-READ at this cut; read it for master (prj_0fDFCY8qXj8Kr5y7n4zmyefjHY8i, team_UjOMyrQtTQ32mfYCeEDpC0Qj — ids CARRIED UNVERIFIED from v179).
5. Bus: read the LAST 30 MINUTES, never anchored on your own insert time. Scouts' rows are read by artifact_name. THEN the pooler lens: Supabase query_logs, source 'supavisor_logs', count of 'Connection authenticated' per 2 minutes for the last 20 minutes — six polling windows give 3–7 per 2 minutes; ZERO means the windows are not polling (asleep Mac or dead waiters), whatever the bus looks like.
6. Doc repo: the S170 close set is committed LOCALLY (hash in the close message of S170's last turn); a lane pushes it (NOTICE-PUSH-DOC-REPO); proof is `git ls-remote` 40-hex.

## 2 · FIRST WORK (in this order)
A. PR 691 (AG-1, tool_experience → derived read; head febbd45d8db6b2b0afe0cf452dea4efe906c4311 at the cut; build success, rule26 in progress at 00:36Z). ORDER-SCOUT2-REVIEW-LAND-691-S170-1 (row 9dd2fae5-5f3f-4b7a-b353-ecdbca6b8e65) carries review + conditional landing; read scout-2's SCOUT-STATUS-REVIEW-LAND-691-S170-1. If WAITING-CI: read CI, send the landing half. After it lands: ⚡ operator prompt for supabase/migrations/20261001200000_tool_experience_legacy.sql (from AG-1's report; verify the file's md5 yourself — the slip's 5be0deab0a7c17bf0055f12184ae3b2d is UNVERIFIED), fence fjbrkimwvtpwoxhziidh.
B. K29 (AG-4): after 691 is MERGED send NOTICE-GO-K29 (cut phase/e4-k29-calendar-s170-1 from that master, re-apply prep/e4-k29-calendar-s170-1, `build:ci` shape if it exists by then, push, PR); scout-1 reviews (it pre-reviewed). After landing: ⚡ for the owner to enter each backend's production-day start in the Rules tab.
C. CARD-MAIL-WAIT-AWAKE-S170-1-v2 (AG-3, row 3fafac5f-3418-4fb2-90a8-ed64f866cff2): read its slip, CI, scout-2 lands.
D. Register 220 — LANE PROMPTS ZERO. Compose v2 for AG-2 from scout-1's rows 033a70ca-7236-4289-aa6a-4bc25396a5fc (A1–A10) and 58cfad62-2f6a-41ff-a078-74ce35a86710 (A11–A13), EXEMPT seal ack = the first row. LANE-DOABLE: A11 `npm run build:ci -- <base-sha>` + `--base` on checkDocDrift (class d cured by shape, no settings entry), A2 shape cures (tsx CLI → `node --import tsx`), A6/A5 the frozen-baseline gate script, A9 the honest PROMPTS line in boot text, A12 respell. OWNER SURFACE, ONE ⚡ with ready text: the settings/hook edits a lane cannot write (exact log host; worktree write roots per A4; SessionStart caffeinate hook), A8 (remove key-bearing entries from settings.local.json and delete .claude/settings.local.json.bak-S167-2), and a ruling on the residual wide prefixes (222). Until `build:ci` lands, EVERY Architect notice spells the build WITHOUT an env prefix request — say "the CI-shaped build (every step of the build job)" and let the lane's existing allowed forms run.
E. Register 221 (baseline serialises landings) and 222/224 (guard gaps) — cards, scout first. Until 221 lands: ONE open PR at a time; a second lane PREPARES locally and pushes on GO.
F. Then the plan: K38 faces, K40, E1-d (⚡ spend), 97+105+K36, 36+40d, E4 K31/K39+7, company layer+85, P2a, P2b, 168 carry (owner present), 227 follow-ups.

## 3 · DISCIPLINE ADDED IN S170 (binding)
1. A carry, never a branch commit, clears a baseline conflict (ARCHITECT-RULING-S170-BASELINE-CARRY-1); park the older open PR first (COLLISION yields to the lower number).
2. Scouts read CI ONCE and reply WAITING-CI; the Architect reads CI (S169 ruling; A-REC-S170-1).
3. "CI-shaped build" = EVERY step of the build job (tenant-zero and backend-name gate are separate steps).
4. A `card` to AG-n carries an ```evidence:adversary``` seal (EXEMPT + ack: <scout row>) or the bus refuses it; v2 cards are composed in SQL from the stored rows, header md5+sha256 guarded.
5. Before lanes are left unattended: prompts measured, the Mac on its charger or the awake fix landed, and the pooler lens read. The owner being away is the NORMAL case (A-REC-S170-3).
6. Never print .claude/settings.local.json (A-REC-S170-4); read settings by KEY NAME only.
7. TIMER TURNS (owner, S170 turn 19): self-timer ticks made the session long. In S171: a tick writes to the owner ONLY when something landed, something broke, or an owner action is needed; otherwise it ends silently with the next timer set. Ticks do not count as owner turns, but the close set is cut at 20 owner turns OR when the owner asks.
8. A crashed window: read refs/heads/lane/<lane> from GitHub and give the owner ONE paste with `npm run lane:boot -- <lane> --confirm-takeover <lane>:<held sha>`; put a RECOVER notice and the re-sent card in its box first.

## 4 · OWNER RULINGS IN FORCE (new in S170)
"onay S170-A" (CWF-S170-PLAN-v1; OWNER-DESIGN-S170-PRIORITY-1: A25 and A26 to 100% as fast as possible) · "onay S170-B" (2026-10-02 03:15 TSİ: lane permission prompts → zero; the Mac's sleep) · OWNER-WITNESS-S170-PROMPT-1. All S169 rulings stand (NO-CI-WATCH-1, 196-1).

## 5 · STATE AT CUT (measured 2026-10-02T00:36Z unless marked)
- master 9ec54640a4b0a5ee8b4795df5e57dbe197620e5a (PR 690). Open PRs: 691 only.
- Lanes: AG-1 waiting on 691 · AG-2 idle · AG-3 on the mail-wait card · AG-4 (replacement window, lane ref 8544a17beff435e8d8d7dc57a3097bcbdfd6b4b5) preparing K29 · scout-1 idle after two pre-reviews · scout-2 holds the 691 order (unconsumed at 00:36Z). All six were re-armed by the owner after the 00:18Z crash; whether each is still polling is UNMEASURED at the cut — read the pooler lens.
- A25/A26 landed in S170: 673, 674, 680, 681, 682, 684, 685, 686, 689, 690. Remaining scope: CWF-S170-PLAN-v1 §2 minus those (K38, K40, ranking_policy re-scope, E1-d, E3 shadow lens, 97/105/K36, 36/40d, E4, company layer/85, P2a/P2b/P3/P4/M4b, E5 removals, 168).
- The Mac is on its charger at the cut (owner; pmset 'Using AC' at 02:55 +0300) — UNVERIFIED after that.

END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v180
