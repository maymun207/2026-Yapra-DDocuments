CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v148

Cut LAST at S146 close (2026-09-20T08:30Z), after register v136, CWF-S146-SESSION-CLOSE-v1, CWF-S146-FINDINGS-v1,
CWF-SESSION-GRAPH-KB-v146. SUPERSEDES v147. Every inherited line not re-measured in S146 is CARRIED UNVERIFIED.

## 0 · FIRST MESSAGE OF S147 — SOTA-1, WORD FOR WORD (S66-1)

SOTA-1 — KABUL KRİTERİ (S80). v1'in tek kabul kriteri cwf-sota-definition'dır. O dosyadaki bir kritere
izlenemeyen her şey v1 kapsamı dışıdır. Architect, bir SOTA kriterini ilerleten hiçbir kalemi "şimdilik gerek
yok / az trafik / bu kadarı yeter / sonra / v1.1'e" gerekçesiyle erteleyemez, küçültemez, sırada aşağı
çekemez. Elinde kalan tek itiraz sınıfı *"bu sıralama SOTA'yı kanıtlanamaz kılar"*dır ve ancak şunları YAZILI
adlandırırsa kabul edilir: (a) hangi kriter kanıtsız kalır, (b) hangi tarihte kanıtlanabilir olur, (c) hangi
ölçüm çözer. Üçü eksik her erteleme önerisi bir SOTA-1 ihlalidir: sahip adıyla iptal eder, Architect ya aynı
mesajda (a)+(b)+(c)'yi verir ya öneriyi geri çeker — üçüncü yol yoktur. Bir kriter YALNIZ kanıtla emekli olur;
kolaylık, maliyet veya kapsam baskısıyla asla.

## 1 · OPEN SEQUENCE (in this order)
1. SIDE-PANEL TASK LIST FIRST (OWNER-RULING-S146-TASK-PANEL-EVERY-SESSION-1): TaskCreate one task per open row of register v136 §2
   (group small ones as S146 did), mark in_progress/completed as work moves. It is the owner's only view of the work.
2. Read the bus (relay_inbox, direction=from_lane, created_at > 2026-09-20T08:25Z): AG-4 slip for CARD-LANE-NO-POLLER-S145-1-v3.
3. Anchor: Vercel list_deployments target=production + owner clone origin/master (lane-refreshed; a claim).

## 2 · OPERATING MODEL (v147 §1 stands)
- No lane poll/cron. Boot text, always FILLED, now with own-worktree and token lines:
  `Sen AG-4'sun. CLAUDE.md'yi uygula, ANCAK poll/cron görevi KURMA (OWNER-RULING-S143-OPERATING-MODEL-1; CLAUDE.md'nin poll bölümü askıda); varsa CronDelete ile sil. Kartın: CARD-NAME. relay_inbox'tan yalnız o kartı oku ve yap; kendi worktree'nde çalış. GitHub token'ını git credential fill ile kendin al, değerini asla basma. factory_state yazımında FW001 alırsan scripts/factoryState.mjs reclaim(self) ile adresini geri al ve slip'ine yaz. Kart bitince slip'ini bus'a yaz ve dur.`
  (scout: `Sen scout'sun.` + same; add "Bekleme döngüsü yok.")
- Every card/notice goes through the repo gate from the owner clone before insert:
  ESBUILD_BINARY_PATH=<linux-arm64 esbuild from npm @esbuild/linux-arm64 at the repo's esbuild version> npx tsx scripts/cardPreflight.ts --check <file>
  kind=notice bodies refuse only on CP-1 (expected). Insert with md5 AND sha256 WHERE.
- A lane asking the owner to export a token or dispatch a workflow: answer "Other" — the lane takes its own token (S102-YASA-1).
- Max 10 turns, timer turns included.

## 3 · IN FLIGHT AT CLOSE
1. AG-4 on CARD-LANE-NO-POLLER-S145-1-v3 (bus 875b2f64), booted 11:28 TSI. -> its PR head goes to the scout (adversary/scout),
   then auto-merge. Item 34.
2. AG-4 next: NOTICE-LAND-FIVE-RECORDS-S146-1 (231f1a32) + NOTICE-LAND-VECTOR-CHAIN-REPORT-S146-1 (a60d2cdf) in one window. Then a
   scout review of the six heads (records only, S43-2 fast gate). Item 20.
3. Doc repo: S146 commits unpushed after 392bec9b -> NOTICE-PUSH to AG-4 quoting the owner's standing push permission; ls-remote.
4. F-S146-PR587-MERGED-BEFORE-SCOUT-STATUS-1: read with the LAND-FIVE slip.

## 4 · THEN, IN ORDER (OWNER-APPROVAL-S145-PLAN-1 + S146-LAND-FIVE)
34 -> 20 -> item 15 + self-takeover + own-worktree (one card) -> 7 (archive search FIRST) -> 5 (with item 36 parity) -> 21 -> 28 ->
small cards 31 30 32 33 35 16 18 19 23 -> 13 -> 8 9 10 -> 6. Owner: 14, 24. Frozen: 2 3 4 27. Full list: register v136 §2.

## 5 · THE ONE THING
First line of every report: what moved in the PRODUCT. S146 delivered the vector engine answering in production. S147 must land
the no-poller card and the six records, and open item 7.

END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v148
