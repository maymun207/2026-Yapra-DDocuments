CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v146

Cut LAST at the close of S144 (2026-09-20T04:43Z), after register v134, CWF-S144-SESSION-CLOSE-v1, CWF-S144-FINDINGS-v1
and CWF-SESSION-GRAPH-KB-v144. SUPERSEDES v145. v145 §3 (landing route), §5 (traps), §6 (liveness) and §8 stand by name
and are in the box; this document adds to them. Every inherited line not re-measured in S144 is CARRIED UNVERIFIED.

## 0 · FIRST MESSAGE OF S145 — SOTA-1, WORD FOR WORD (S66-1)

SOTA-1 — KABUL KRİTERİ (S80). v1'in tek kabul kriteri cwf-sota-definition'dır. O dosyadaki bir kritere
izlenemeyen her şey v1 kapsamı dışıdır. Architect, bir SOTA kriterini ilerleten hiçbir kalemi "şimdilik gerek
yok / az trafik / bu kadarı yeter / sonra / v1.1'e" gerekçesiyle erteleyemez, küçültemez, sırada aşağı
çekemez. Elinde kalan tek itiraz sınıfı *"bu sıralama SOTA'yı kanıtlanamaz kılar"*dır ve ancak şunları YAZILI
adlandırırsa kabul edilir: (a) hangi kriter kanıtsız kalır, (b) hangi tarihte kanıtlanabilir olur, (c) hangi
ölçüm çözer. Üçü eksik her erteleme önerisi bir SOTA-1 ihlalidir: sahip adıyla iptal eder, Architect ya aynı
mesajda (a)+(b)+(c)'yi verir ya öneriyi geri çeker — üçüncü yol yoktur. Bir kriter YALNIZ kanıtla emekli olur;
kolaylık, maliyet veya kapsam baskısıyla asla.

## 1 · OPERATING MODEL (v145 §1 + S144 rulings)

- No 2-minute pollers. Architect writes to the bus; owner says "kartını oku" in that window; Architect reads the bus on
  its own send_later timer (3–10 min). Lane results are read from the bus, never pasted by the owner.
- **ONE PLAN, ONE APPROVAL** (OWNER-RULING-S144-ONE-PLAN-ONE-APPROVAL-1): write the plan, get one "onay", execute
  without per-step prompts. Only an out-of-plan step, a destructive/replacing act or new spend returns for a yes.
- **ONE CARD PER LANE SESSION** (OWNER-RULING-S144-CLEAR-PER-CARD-1): after a lane's slip lands, tell the owner to
  /clear that window and paste the boot text below WITH THE CARD NAME FILLED IN (never "oldest unconsumed" —
  lanes do not mark consumed; F-S144-BOOT-TEXT-TOOK-AN-ANSWERED-ORDER-1):
  `Sen <AG-4|scout>'sun. CLAUDE.md'yi uygula. Kartın: <ARTIFACT-NAME>. relay_inbox'tan yalnız o kartı oku ve yap. factory_state yazımında FW001 alırsan scripts/factoryState.mjs reclaim(self) ile adresini geri al ve slip'ine yaz. Kart bitince slip'ini bus'a yaz ve dur.`
- Max 10 turns, then five carriers. Every document: archive commit + project box in the same turn; push by an AG-4 notice.
- Bridge VM git: reads in the code clone with GIT_OPTIONAL_LOCKS=0; any *.lock left in either clone is removed at once
  (delete grant is per session — request it).
- Penalty date: **22 Eylül 2026** (OWNER-RULING-S144-PENALTY-DATE-1). Stability of the product first.

## 2 · ANCHOR

master `7572c3bbfeed23656fcf8a55f6e64d93ed240c14` — MEASURED by scout ls-remote 2026-09-20T04:22:05Z. Gate enforcing,
bypass 0, five contexts incl. adversary/scout; auto-merge active (04:07Z). Re-measure at open (the head moves when
AG-4's vector PR lands).

## 3 · IN FLIGHT AT CLOSE — READ THESE FIRST (bus)

1. SCOUT-STATUS-AUTH-READ-S144-1 (reply to row 4074ab16). OK <path> → scout uses that path. EXPIRED → one-step owner
   token refresh (the only owner item it creates).
2. AG-4 slip for CARD-VECTOR-ORIGIN-REPAIR-S144-1-v2 (row 5e902908; files were uncommitted on
   phase/vector-origin-repair-s144-1 at 04:41Z). If a PR exists: order the scout to review the diff at the head and post
   adversary/scout. 30-minute rule from PR open.
3. NOTICE-PUSH-DOC-REPO-S144-3 for AG-4 (after its build card, in a fresh /clear session, card named).

## 4 · THE APPROVED PLAN (OWNER-APPROVAL-S144-PLAN-1 — no new approval needed for these)

Landing → dry-run on master (confirm empty) → if vector origins on old DNS AND langfuse-ec2 on current DNS AND diff is
exactly the two DomainName paths: confirm=repair → vector-live-proof. That proof run closes item 11. Any condition false
→ stop and bring the owner the one measured reason. Elastic IP line in the dry-run decides item 12.

## 5 · THEN, IN ORDER (write it as ONE plan, get ONE approval)

item 7 (wiring card: resolved parent → child layer parent_param; search the box + Claude_Duzenli_Arsiv for "A23",
"ask-shape", "parent_param" first — the docs/design A23 runbook has none of those words) → item 5 (read the vector-lane
caller in the turn path first; may be the vector lane itself) → item 21 → item 28 → item 31 (CP-3 RELAYED/RECALLED) →
item 30 (NODE_USE_ENV_PROXY) → item 32 (worktree hygiene) → item 20 (five stale PRs). Frozen: 2 3 4 27.

## 6 · THE ONE THING

Write in every first line what moved in the PRODUCT. S144 moved the vector repair from "diagnosed" to "card GREEN,
being built". S145 must end with the vector engine answering in production, proven by vector-live-proof.

END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v146
