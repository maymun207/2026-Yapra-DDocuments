CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v149
Cut LAST at S147 close (2026-09-20T09:40Z), after register v137, CWF-S147-SESSION-CLOSE-v1, CWF-S147-FINDINGS-v1, CWF-SESSION-GRAPH-KB-v147. SUPERSEDES v148. Every inherited line not re-measured in S147 is CARRIED UNVERIFIED.

## 0 · FIRST MESSAGE OF S148 — SOTA-1, WORD FOR WORD (S66-1)
SOTA-1 — KABUL KRİTERİ (S80). v1'in tek kabul kriteri cwf-sota-definition'dır. O dosyadaki bir kritere izlenemeyen her şey v1 kapsamı dışıdır. Architect, bir SOTA kriterini ilerleten hiçbir kalemi "şimdilik gerek yok / az trafik / bu kadarı yeter / sonra / v1.1'e" gerekçesiyle erteleyemez, küçültemez, sırada aşağı çekemez. Elinde kalan tek itiraz sınıfı *"bu sıralama SOTA'yı kanıtlanamaz kılar"*dır ve ancak şunları YAZILI adlandırırsa kabul edilir: (a) hangi kriter kanıtsız kalır, (b) hangi tarihte kanıtlanabilir olur, (c) hangi ölçüm çözer. Üçü eksik her erteleme önerisi bir SOTA-1 ihlalidir: sahip adıyla iptal eder, Architect ya aynı mesajda (a)+(b)+(c)'yi verir ya öneriyi geri çeker — üçüncü yol yoktur. Bir kriter YALNIZ kanıtla emekli olur; kolaylık, maliyet veya kapsam baskısıyla asla.

## 1 · OPEN SEQUENCE (in this order)
1. SIDE-PANEL TASK LIST FIRST (OWNER-RULING-S146-TASK-PANEL-EVERY-SESSION-1): one TaskCreate per register v137 §2 open row or named group — NEVER a row hidden inside another row's description (A-ERR-S147-PANEL-ROWS-HIDDEN-IN-DESCRIPTIONS). Include OWNER (14, 24), FROZEN (2 3 4 27) and a CLOSED reference row. Update as work moves.
2. Read the bus (relay_inbox, direction=from_lane, created_at > 2026-09-20T09:21:18Z): (a) scout SCOUT-STATUS-REVIEW-CARD-LANE-TAKEOVER-SELF-S147-1-v1; (b) AG-4 slips for NOTICE-LAND-FIVE-RECORDS-S146-1 and NOTICE-LAND-VECTOR-CHAIN-REPORT-S146-1.
3. Anchor: Vercel list_deployments target=production (READY at 20c1651c3fb59b48490670ffefed02099d684ed9 at 09:33Z) + owner-clone refs (lane-refreshed; a claim; the bridge cannot git fetch).

## 2 · OPERATING MODEL (v148 §2 stands, with S147 additions)
- No lane poll/cron (now also in the lanes' own files, PR 588). Boot text always FILLED; it NAMES EVERY notice the window takes, in order, then "her notice bitince slip'ini yaz; sonuncusu bitince dur" (F-S147-BOOT-TEXT-VS-NOTICE-SAME-WINDOW-1):
  `Sen AG-4'sun. CLAUDE.md'yi uygula, ANCAK poll/cron görevi KURMA (OWNER-RULING-S143-OPERATING-MODEL-1); varsa CronDelete ile sil. Kartın: CARD-NAME. relay_inbox'tan yalnız o kartı oku ve yap; kendi worktree'nde çalış. GitHub token'ını git credential fill ile kendin al, değerini asla basma. factory_state yazımında FW001 alırsan scripts/factoryState.mjs reclaim(self) ile adresini geri al ve slip'ine yaz. Kart bitince slip'ini bus'a yaz ve dur.` (scout: `Sen scout'sun.` + "Bekleme döngüsü yok.")
- CARD GATE FROM THE BRIDGE (F-S147-BRIDGE-CAN-RUN-CARDPREFLIGHT-1): in the owner clone, ESBUILD_BINARY_PATH=$HOME/esb/package/bin/esbuild npx tsx scripts/cardPreflight.ts --check <file> (if $HOME/esb is gone: npm pack @esbuild/linux-arm64@<node_modules/esbuild version> and untar there). kind=notice passes with only CP-1 refused when it carries: `fanout:` line; ON-DISAGREEMENT line; a `## PREMISE` section of MEASURED:<ISO>,<command> / UNMEASURED: lines ending in SELF-INVALIDATION:; then a `## ORDERS` heading; no short hex anywhere (bus-row uuids trip CP-8 — name rows by artifact name + created_at). kind=card additionally needs `## CLAIMS` with evidence fences holding every 40-hex.
- Insert every row with md5 AND sha256 WHERE (body pasted from `cat` of the gated file).
- DOC REPO: the Architect commits in the connected doc repo; git leaves lock/tmp_obj files — delete them (delete grant is per session: request it once). AG-4 pushes (owner's permanent allow rule, S147). After AG-4's slip prints ls-remote, the Architect runs `git update-ref refs/remotes/origin/main <ls-remote sha> <old>` (F-S147-DOC-PUSH-TRACKING-REF-NOT-WRITABLE-BY-LANE-1).
- Max 10 turns, timer turns included. The Architect waits in-turn with sleep ≤180s and reads the bus; two unchanged reads = stop and report.

## 3 · IN FLIGHT AT CLOSE
1. Scout reviewing CARD-LANE-TAKEOVER-SELF-S147-1-v1 (order row created 2026-09-20T09:25:46Z). GREEN -> insert the card to AG-4 as kind=card with `ADVERSARY: <ack row>` seal (see how v3 no-poller did it) -> boot AG-4 on it. RED -> v2 answering each defect, same turn.
2. AG-4 on LAND-FIVE then VECTOR-REPORT (booted 12:20 TSI). Then order the scout: fast-gate (S43-2) review of the six heads, records only, adversary/scout on each -> auto-merge. Read F-S146-PR587-MERGED-BEFORE-SCOUT-STATUS-1 against the slip (item 17).
3. Doc repo: S147 commits local (3159ede + close commit). NOTICE-PUSH-DOC-REPO-S147-1 to AG-4 (quote the owner's permanent allow rule), then update-ref.

## 4 · THEN, IN ORDER (OWNER-APPROVAL-S145-PLAN-1 + S146-LAND-FIVE)
15 (build + land) and 20 (land six) in parallel lanes -> 7 LIVE WITNESS (F-S147-ITEM7-SEAM-ALREADY-REPAIRED-THREE-WAYS-1; synthetic names in artefacts) -> 5 (with 36) -> 21 -> 28 -> small cards 31 30 32 33 35 16 18 19 23 -> 13 -> 8 9 10 -> 6. Owner: 14, 24. Frozen: 2 3 4 27. Full list: register v137 §2.

## 5 · THE ONE THING
First line of every report: what moved in the PRODUCT. S147 landed the no-poller card (PR 588, 20c1651c, production READY). S148 must land the six records and item 15, and run the item-7 witness on production.
END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v149
