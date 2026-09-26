SOTA-1 — KABUL KRİTERİ (S80). v1'in tek kabul kriteri cwf-sota-definition'dır. O dosyadaki bir kritere izlenemeyen her şey v1 kapsamı dışıdır. Architect, bir SOTA kriterini ilerleten hiçbir kalemi "şimdilik gerek yok / az trafik / bu kadarı yeter / sonra / v1.1'e" gerekçesiyle erteleyemez, küçültemez, sırada aşağı çekemez. Elinde kalan tek itiraz sınıfı *"bu sıralama SOTA'yı kanıtlanamaz kılar"*dır ve ancak şunları YAZILI adlandırırsa kabul edilir: (a) hangi kriter kanıtsız kalır, (b) hangi tarihte kanıtlanabilir olur, (c) hangi ölçüm çözer. Üçü eksik her erteleme önerisi bir SOTA-1 ihlalidir: sahip adıyla iptal eder, Architect ya aynı mesajda (a)+(b)+(c)'yi verir ya öneriyi geri çeker — üçüncü yol yoktur. Bir kriter YALNIZ kanıtla emekli olur; kolaylık, maliyet veya kapsam baskısıyla asla.

CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v161
Cut at S159 close (2026-09-26T17:30Z) as a WHOLE new version, LAST of the close set; SUPERSEDES v160. Carriers: register v150, CWF-S159-SESSION-CLOSE-v1, CWF-S159-FINDINGS-v1, CWF-SESSION-GRAPH-KB-v159, CWF-ROUTING-ARCHITECTURE-v2-DRAFT-S159-2, CWF-ASTRA-REVIEW-EVALUATION-S159-1. Every inherited line not re-measured in S159 is CARRIED UNVERIFIED.
Numbering: the next session is S160 (Claude_Duzenli_Arsiv/S160/).

## 0 · THE FIRST TOOL CALL OF S160 IS SendUserMessage WITH THE SOTA-1 PARAGRAPH, VERBATIM
Copy it from project instructions section 1 (in context before any tool call). Do NOT read any file first — not preferences, not this bootstrap, not device info. S159 violated this again (F-S159-SOTA1-NOT-FIRST-CALL-1; sixth recurrence).

## 1 · OPEN SEQUENCE
1. TASK LIST = register v150 (A-H + S158 rows + S159 rows 103-108), one panel row per item.
2. ANCHOR: master from the Vercel production deployment list (latest READY production: sha + merge message), then GitHub API via ~/gh.sh (read-only token in cwf-architect-ro). Expected at close: 2a6f6781b1a4748aac5f5bc7b1d73136863b1c35 (PR 621) UNLESS scout-2 landed PR 622 after close — read, do not assume.
3. CAPABILITIES: ls $HOME/mnt/ must show "2026 - Yapra - DDocuments", "cwf_yaprak", "cwf-architect-ro". ~/gh.sh and ~/gitw.sh exist on the bridge (item 108); if absent, recreate from CWF-SESSION-GRAPH-KB-v159 edges. The doc-repo path is spelled exactly "2026 - YAPRA/2026 - Yapra - DDocuments" (with spaces).
4. READ THE BUS FIRST, by name (all from_lane rows after 2026-09-26T16:50:00Z):
   - scout-2 SCOUT-STATUS-LAND-PR622-S159-1 -> if landed: Vercel READY -> item 95 CLOSED; then NOTICE-PR623-MASTER-MERGE-S160-1 to AG-1 (merge origin/master into phase/nightly-compat-floor-22-s159-1, reseal only if the guard asks, push, NO rebase) -> ORDER-SCOUT-LAND-PR623 (item 104; branch dispatch already SUCCESS 16:46:33Z).
   - scout-1 SCOUT-STATUS-REVIEW-ROUTING-ARCHITECTURE-v2-S159-2 -> GREEN-FOR-OWNER-RULING: put OWNER-RULING-S160-ROUTING-V2-1 to the owner in ONE ⚡ message with the five decisions named (doc v2 §9 R6: K1 rollback · migration default OBLIGATION · company layer as data · provider baseline spend · ADR-008). RED-ON-DESIGN: v3 = v2 + complete delta, same session, then the ruling.
   - If either scout row is absent: the owner may not have booted the window; the ⚡ boot texts are in the S159 close message; re-issue them, do not re-post the orders.
5. DOC REPO: local commits are ahead of remote main (item 107) — the COUNT is not carried here (it changed twice while this bootstrap was being cut: F-S122-STALE-COUNT class); MEASURE it at open with `git rev-list --count origin/main..HEAD` on the bridge. First AG window of S160 gets NOTICE-PUSH-DOC-REPO-S160-1 (push only; no rebase). Then project_write anything not yet in the project box.
6. ITEM 91 (lane password rotation): NOT run in S159; sequence it AFTER both landings (scouts write the bus with the old credential): ⚡ operator text (OPERATOR-PROMPT-S158-ITEM91-ALTER-ROLE-1 re-issued as S160) + AG-4 ORDER 3.
7. SCHEDULED WORKFLOWS: last conclusion of every scheduled workflow on master; Nightly Compatibility stays RED on master until PR 623 lands.

## 2 · OWNER RULES IN FORCE
OWNER-RULING-S153-NO-ARMES-HARDCODE-1 (top rule) · OWNER-RULING-S156-DATA-BACKENDS-1 · OWNER-RULING-S156-FAIL-CLOSED-1 · OWNER-RULING-S157-G2-OUTAGE-EDGES-1 · OWNER-RULING-S159-NIGHTLY-FLOOR-22-1 · OWNER-DESIGN-S159-1 (routing: no code before the ruling; keyword-floor card ON HOLD) · governed settings are changed in the admin UI WITH the owner, never by the Gemini operator · Gemini operator is the only writer to CWF tables (the Architect inserts relay_inbox bus rows only) · NEVER CONTROL HIS MAC SCREEN · never print env values · short Turkish replies; first line = what moved in the PRODUCT; every owner action in ONE ⚡ message with paste-ready text; SENİN AKSİYON MADDELERİN · no functionality removed · one path, never a menu · 30 minutes green to master or one measured reason · every problem with its fix and its date · <= 20 turns, then close · no card or lane order without a named approval · no pollers.

## 3 · BOOT TEXTS
As v159 §3 (lane name first; "leave auto mode" (Shift+Tab) before an approved external write; NO poll/cron; "never print an environment value"). A landing order to the scout names ONE window.

## 4 · CARD AND DOCUMENT DISCIPLINE (v160 §4 stands) + S159
- A fixture may not carry tenant words (check:tenant-zero, AGNOSTIC-1): a card demanding byte-verbatim production bytes with a tenant name conflicts with the gate; the card names the redaction rule (F-S159-CARD-DEMANDED-TENANT-BYTES-AGAINST-AGNOSTIC-1).
- A DESIGN DOCUMENT NAMES NO EXTERNAL RULE IT DOES NOT INLINE (A-REC-S159-2): citing A24 by K-number is a derived view; the reviewer without the referent cannot check it and the author stops re-reading it.
- Before filing a CI-shape defect, grep the workflow headers for a ruling (the S141 github.token ruling lives in auto-merge.yml).
- A zero from actions/runs is read twice; a branch workflow_dispatch is not a master push and needs no spend approval.
- Every document goes to the project box AND the doc repo in the same turn; the bridge cannot push — a lane pushes.

## 5 · IN FLIGHT AT CLOSE
PR 622 (item 95) GREEN at fa06452850d5393ce8549530de08320f585d7c80, land order at scout-2 (bus 16:50:47Z), not landed at close. PR 623 (item 104) head ba74a7d6f8c4e914c3a2e6d124495338e2a75a65, branch dispatch SUCCESS, blocked by COLLISION until 622 lands. Doc v2 at scout-1 (ORDER-SCOUT-REVIEW-ROUTING-ARCHITECTURE-v2-S159-2-v1 on the bus 2026-09-26T17:23:53Z). AG-2 idle; AG-4 idle; AG-1 on 623. master 2a6f6781b1a4748aac5f5bc7b1d73136863b1c35.

## 6 · THE ONE THING
S160 opens on the ROUTING RULING: scout verdict on doc v2 -> (v3 if RED) -> OWNER-RULING-S160-ROUTING-V2-1 -> the E1 cards (evaluation ground: held-out set + acceptable-set labels + three-provider baseline; replay/exam code only). In parallel, the two landings (622, 623) and the two small cards that need no ruling: ALWAYS_INCLUDE -> tool_graph_node role=entry data (scout: fence breach now; G2c first half) and item 106 numeric formats. Then item 91 rotation. Nothing on the routing PATH is touched before the ruling (S102-YASA-3).
END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v161
