CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v147

Cut LAST at the close of S145 (2026-09-20T06:45Z), after register v135, CWF-S145-SESSION-CLOSE-v1, CWF-S145-FINDINGS-v1
and CWF-SESSION-GRAPH-KB-v145. SUPERSEDES v146. v146 §1 stands EXCEPT the boot text, which is replaced below. Every
inherited line not re-measured in S145 is CARRIED UNVERIFIED.

## 0 · FIRST MESSAGE OF S146 — SOTA-1, WORD FOR WORD (S66-1)

SOTA-1 — KABUL KRİTERİ (S80). v1'in tek kabul kriteri cwf-sota-definition'dır. O dosyadaki bir kritere
izlenemeyen her şey v1 kapsamı dışıdır. Architect, bir SOTA kriterini ilerleten hiçbir kalemi "şimdilik gerek
yok / az trafik / bu kadarı yeter / sonra / v1.1'e" gerekçesiyle erteleyemez, küçültemez, sırada aşağı
çekemez. Elinde kalan tek itiraz sınıfı *"bu sıralama SOTA'yı kanıtlanamaz kılar"*dır ve ancak şunları YAZILI
adlandırırsa kabul edilir: (a) hangi kriter kanıtsız kalır, (b) hangi tarihte kanıtlanabilir olur, (c) hangi
ölçüm çözer. Üçü eksik her erteleme önerisi bir SOTA-1 ihlalidir: sahip adıyla iptal eder, Architect ya aynı
mesajda (a)+(b)+(c)'yi verir ya öneriyi geri çeker — üçüncü yol yoktur. Bir kriter YALNIZ kanıtla emekli olur;
kolaylık, maliyet veya kapsam baskısıyla asla.

## 1 · OPERATING MODEL (v146 §1, with S145 corrections)

- **LANES CREATE NO POLL OR CRON TASK** (OWNER-RULING-S143-OPERATING-MODEL-1, re-affirmed by the owner in S145:
  "sen niye aglerde cron yaratiyorsun"). Until CARD-LANE-NO-POLLER-S145-1 lands, the lanes' CLAUDE.md STILL orders one,
  so the boot text must override it. No Architect order may contain a wait/poll loop for a lane.
- **BOOT TEXT — always handed FILLED (lane name and card name written in), never as a template:**
  `Sen AG-4'sun. CLAUDE.md'yi uygula, ANCAK poll/cron görevi KURMA (OWNER-RULING-S143-OPERATING-MODEL-1; CLAUDE.md'nin poll bölümü askıda); varsa CronDelete ile sil. Kartın: CARD-NAME. relay_inbox'tan yalnız o kartı oku ve yap. factory_state yazımında FW001 alırsan scripts/factoryState.mjs reclaim(self) ile adresini geri al ve slip'ine yaz. Kart bitince slip'ini bus'a yaz ve dur.`
  (for the scout: `Sen scout'sun.` and the same text.)
- **OWNER-RULING-S145-SELF-TAKEOVER-1 (approved in PLAN-1, not yet written into any lane file):** when a /clear'd lane's
  boot stops at "PATH B — crashed predecessor" on its OWN address, it may confirm the takeover with the nonce the boot
  prints. Fold into CARD-LANE-NO-POLLER's follow-up or its own card.
- The Architect's own bus timer (send_later) is allowed; two unchanged reads = STOP (rule ②), not a third.
- Every to_lane row to AG-n starts with `<!-- relay-audit: v1 kind=... -->`; a kind=card needs an adversary seal.
- Doc-repo pushes by AG-4 can be refused by the harness classifier [Out-of-Place Publication]; the push notice must
  quote the owner's permission, and the owner may need to grant it in the window.
- Max 10 turns (timer turns count). One plan, one approval: OWNER-APPROVAL-S145-PLAN-1 is in force.

## 2 · ANCHOR

master `7572c3bbfeed23656fcf8a55f6e64d93ed240c14` — owner-clone lane-refreshed ref READ 2026-09-20T06:38Z (a claim).
Gate, bypass 0, five contexts incl. adversary/scout, auto-merge active: CARRIED UNVERIFIED from S144 (04:07Z). Re-measure.

## 3 · IN FLIGHT AT CLOSE — READ THESE FIRST (bus)

1. SCOUT-STATUS-REVIEW-PR587-S145-2 (reply to 476d08ac) on PR 587 head 990ca9630c4ea7d9ca018ccd16d744ebb58d0d7a.
   GREEN + CI green -> auto-merge lands it (30-minute rule). RED -> route defect to AG-4 as an amend.
2. After landing: AG-4 dispatches vector-origin-repair on master with confirm empty (dry-run) -> if the three
   conditions hold, confirm=repair -> vector-live-proof. Pre-approved (OWNER-APPROVAL-S144-PLAN-1). This closes item 11.
3. ORDER-SCOUT-REVIEW-CARD-LANE-NO-POLLER-S145-1-v1 (bus fde80e84) — scout takes it after 1, fresh /clear.
4. Doc-repo push: remote main last measured 87d7837b; local commits through this carrier set are unpushed. Issue a
   push notice to AG-4 quoting the owner's permission; measure ls-remote.
5. AG-4 and scout were told (09:3x TSI) to CronDelete their pollers; result unmeasured — ask each slip to list crons.

## 4 · THEN, IN ORDER (OWNER-APPROVAL-S145-PLAN-1 — no new approval)

item 34 (no-poller card) -> item 7 (search box + Claude_Duzenli_Arsiv for "A23", "ask-shape", "parent_param" FIRST) ->
self-takeover rule -> item 5 (read vector-lane caller first) -> 21 -> 28 -> 31, 30, 32, 20, 33, 35. Frozen: 2 3 4 27.

## 5 · THE ONE THING

First line of every report: what moved in the PRODUCT. S146 must end with the vector engine answering in production,
proven by vector-live-proof, and the lanes booting with no poller.

END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v147
