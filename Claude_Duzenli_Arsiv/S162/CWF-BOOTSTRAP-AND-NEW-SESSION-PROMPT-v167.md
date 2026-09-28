SOTA-1 — KABUL KRİTERİ (S80). v1'in tek kabul kriteri cwf-sota-definition'dır. O dosyadaki bir kritere izlenemeyen her şey v1 kapsamı dışıdır. Architect, bir SOTA kriterini ilerleten hiçbir kalemi "şimdilik gerek yok / az trafik / bu kadarı yeter / sonra / v1.1'e" gerekçesiyle erteleyemez, küçültemez, sırada aşağı çekemez. Elinde kalan tek itiraz sınıfı *"bu sıralama SOTA'yı kanıtlanamaz kılar"*dır ve ancak şunları YAZILI adlandırırsa kabul edilir: (a) hangi kriter kanıtsız kalır, (b) hangi tarihte kanıtlanabilir olur, (c) hangi ölçüm çözer. Üçü eksik her erteleme önerisi bir SOTA-1 ihlalidir: sahip adıyla iptal eder, Architect ya aynı mesajda (a)+(b)+(c)'yi verir ya öneriyi geri çeker — üçüncü yol yoktur. Bir kriter YALNIZ kanıtla emekli olur; kolaylık, maliyet veya kapsam baskısıyla asla.

CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v167
Cut at S162 close (2026-09-28T19:2xZ, owner turn 20) as a WHOLE new version; SUPERSEDES v166. Carriers: register v155 (rows 133–139), CWF-S162-SESSION-CLOSE-v1, CWF-S162-FINDINGS-v1, CWF-SESSION-GRAPH-KB-v162, CWF-S162-OPEN-AND-PLAN-v1, A25 v1 (design in force). Every inherited line not re-measured in S162 is CARRIED UNVERIFIED.
Numbering: the next session is S163 (Claude_Duzenli_Arsiv/S163/).

## 0 · THE FIRST TOOL CALL OF S163 IS SendUserMessage WITH THE SOTA-1 PARAGRAPH, VERBATIM
Copy it from project instructions section 1. Do NOT read any file first — not preferences, not this bootstrap, not device info, not the seed. F-S159-SOTA1-NOT-FIRST-CALL-1 recurred a FOURTH time in S162. Owner edit of §0 in v5_11 is the permanent fix (⚡ given at S162 close).

## 1 · OPEN SEQUENCE
1. TASK LIST = register v155 rows 133–139 + every OPEN row of v154 §6; then §2 as its own rows. Count owner turns in every footer from turn 1 ("tur n/20"); remind at 18.
2. ANCHOR: Vercel production list, then `$HOME/mnt/cwf-architect-ro/gh.sh` PATH-ONLY (`gh.sh git/ref/heads/master`, `gh.sh "pulls?state=open"`, `gh.sh "actions/runs?head_sha=<40hex>"`, `gh.sh actions/runs/<id>/jobs` for step names — the Architect CAN read job/step conclusions, NOT logs). MEASURED at close: master 7b54180dc68b7f4b3ca76d4cbab45d8bde5f8e26; PRs 630/631/632 open and RED; prepared branch phase/e1b-ka-fixture-backend-s162-3 @ ebda839afc9da4951a039f27456023e76081113e. Read, do not assume — AG-3 may have executed NOTICE-PR630-FRESH-BRANCH-OPEN-S162-1 after this cut (it was holding on the owner's in-lane prompt).
3. CAPABILITIES: ls $HOME/mnt/ must show "2026 - Yapra - DDocuments", "cwf_yaprak", "cwf-architect-ro" — if not, device_request_folder_access is the Architect's move (it worked in S162 via the owner's connect). Bridge files move by device_stage_files / device_commit_files only.
4. BUS FIRST, BY NAME: every row since 2026-09-28T19:09Z; SLIP-PR630-FRESH-BRANCH-OPEN-S162-1 (AG-3) is the first thing to look for; `ls -t` S162/ and S163/. consumed_at NULL means nothing for scouts and for AG-4/AG-2 (cannot write).
5. THE CHAIN, one open PR at a time (OWNER-RULING-S162-GET-IT-DONE-1): (a) if AG-3's PR is open and 4/4 green → ORDER-SCOUT-LAND-PR<n>-S163-1 (shape of ORDER-SCOUT-LAND-PR628-S161-1-v2; check: ONE non-merge commit off master, 16-path fence, CI 4/4, post adversary/scout, one master read) + ⚡ scout-1 boot (scout cannot stamp) → lands; (b) NOTICE to AG-1: fresh branch off the NEW master carrying 631's 8 paths (first commit, full fence), open PR (only open PR) → scout → lands → AG-2's transport problem ends; (c) NOTICE to AG-4: fresh branch off master carrying 632's content (package.json `exam:*` lines auto-merge; first fence complete), open PR → scout → lands. Each within 30 minutes of green or the ONE measured reason. EVERY landing notice QUOTES the guard rule it depends on by line (A-REC-S162-1/-2): MERGE-HAND-EDIT L260-290 · COLLISION L494/L504/L521 · FENCE-GREW.
6. DOC REPO: `rev-list --count origin/main..HEAD` (31+). NOTICE-PUSH-DOC-REPO-S163-1 to AG-1 after (b), with `git ls-remote origin refs/heads/main` proof.
7. Owner decisions go ONLY through ⚡ (A-REC-S162-3). A stop is never attributed to the owner without a ⚡ on record.

## 2 · AFTER THE CHAIN — THE CARDS, IN THIS ORDER
- CARD-MERGE-GUARD-PRIORITY-AND-FENCE-S163-1 (register 133): `supersedes: #n` in the report inherits priority; gate-mandated files (data/gates/*) may join the fence when a gate names them. NEW subject → scout (12.1).
- CARD-MAIL-WAIT-ACK-S163-1 (134; after 631's transport lands): --read stamps for writers; scouts get a watermark/ack path; grep consumers first (12.6).
- Owner tour seams (register 120/131): ORDER-SCOUT-MEASURE-TOUR-SEAMS-S163-1 → CARD-SEARCH-TOOLS-NAME-MATCH + CARD-EMPTY-NOT-ZERO-IN-COMPOSE → owner re-asks "Pişmiş stokta hangi işler bulunuyor?" in production.
- CARD-E2-BACKEND-REGISTRY-TO-DATA-S163-1 (119) → scout. Then E1-d (spend approvals per firing), 106, 135 (gate vs test mocks), 125 hygiene.

## 3 · BOOT TEXTS AND THE LOOP (unchanged law; measured facts added)
One boot per window, then `node scripts/mail-wait.mjs <lane> --budget-min 480`. MEASURED S162: a lane in the loop takes a bus row in 40–90 s (8/8). Windows drop out of the loop on stale unstamped rows — the boot text names the stale rows to --take WITHOUT executing (S162 rulings for AG-1/AG-4). The scout cannot --take → one ⚡ boot per scout order until 134 lands. AG-2/AG-4 cannot write the bus until 631's transport is on master; their slips may arrive as doc-repo files. The 10-minute tool cap is NOT a factor (measured).

## 4 · OWNER RULES IN FORCE
As v166 §4, plus S162: OWNER-APPROVAL-S162-PLAN-1 · OWNER-DESIGN-S162-1 (ADF-HEADLESS-LANE-1 remembered, measured true) · OWNER-RULING-S162-GET-IT-DONE-1 (22:08 TSİ: find the way, ship to completion, no blame on the owner) · billing fixed 21:11 TSİ.

## 5 · DISCIPLINE ADDED IN S162 (register 133–139; findings v1)
- Quote the guard rule by line in every landing notice; gate-mandated files in the FIRST fence; never order a hand-resolved merge.
- Decision requests only via ⚡; never attribute a stop to the owner otherwise.
- No in-card gate on a scout verdict row (136); the Architect applies the delta and re-cuts (v4 pattern).
- Baseline growth is answered by the instrument's own rewrite with the reason recorded — never by renaming code to dodge a gate.

## 6 · STATE AT CLOSE (MEASURED 19:12Z)
master 7b54180d (Vercel prod READY at 7b54180d). PRs 630 fcafd59d · 631 b2ebe011 · 632 e61fd0c6 all open, guard RED. Prepared branch ebda839a (16 paths, gate/build/typecheck green locally, no CI). AG-3 holding NOTICE-PR630-FRESH-BRANCH-OPEN-S162-1 on the owner's prompt ("onay serial-close" recommended). AG-1 and AG-4 in mail-wait; scout-1 stopped (cannot loop); AG-2 parked. Bus: 20 S162 rows. Doc repo 31+ ahead. Project box: 18 S162 artefacts incl. this close set.

## 7 · ROWS 133–139 — IN REGISTER v155 (kept here so this file reads alone)
133 guard triple lock (→ guard card) · 134 mail-wait stale rows + scout cannot stamp (→ ack card) · 135 backend-name gate counts test mocks (→ small card) · 136 scout verdict invisible to lane gates (in force) · 137 A-REC-S162-1/-2/-3 (in force) · 138 billing delay (done) · 139 OWNER-RULING-S162-GET-IT-DONE-1 (in force).
END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v167
