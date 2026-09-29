SOTA-1 — KABUL KRİTERİ (S80). v1'in tek kabul kriteri cwf-sota-definition'dır. O dosyadaki bir kritere izlenemeyen her şey v1 kapsamı dışıdır. Architect, bir SOTA kriterini ilerleten hiçbir kalemi "şimdilik gerek yok / az trafik / bu kadarı yeter / sonra / v1.1'e" gerekçesiyle erteleyemez, küçültemez, sırada aşağı çekemez. Elinde kalan tek itiraz sınıfı *"bu sıralama SOTA'yı kanıtlanamaz kılar"*dır ve ancak şunları YAZILI adlandırırsa kabul edilir: (a) hangi kriter kanıtsız kalır, (b) hangi tarihte kanıtlanabilir olur, (c) hangi ölçüm çözer. Üçü eksik her erteleme önerisi bir SOTA-1 ihlalidir: sahip adıyla iptal eder, Architect ya aynı mesajda (a)+(b)+(c)'yi verir ya öneriyi geri çeker — üçüncü yol yoktur. Bir kriter YALNIZ kanıtla emekli olur; kolaylık, maliyet veya kapsam baskısıyla asla.

CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v168
Cut at S163 close (2026-09-29 15:2x TSİ, owner turn 18, on the owner's order) as a WHOLE new version; SUPERSEDES v167. Carriers: register v156 (rows 140–151), CWF-S163-SESSION-CLOSE-v1, CWF-S163-FINDINGS-v1, CWF-SESSION-GRAPH-KB-v163, CWF-S163-MEMORY-DIAGNOSIS-AND-PLAN-v1, A25 v1 (design in force), project instructions v5_11. Every inherited line not re-measured in S163 is CARRIED UNVERIFIED.
Numbering: the next session is S164 (Claude_Duzenli_Arsiv/S164/).

## 0 · THE FIRST TOOL CALL OF S164 IS SendUserMessage WITH THE SOTA-1 PARAGRAPH ABOVE, VERBATIM
Before ANY read. v5_11 §0.1 now writes this order; F-S159-SOTA1-NOT-FIRST-CALL-1 recurred five times (S159–S163). S164 is the first test of the written order.

## 1 · OPEN SEQUENCE
1. Task list = register v156 rows 140–151 + every OPEN row carried. Footer "tur n/20" on every reply; remind at 18; close set at 20.
2. ANCHOR by gh.sh (register 150): `$HOME/mnt/cwf-architect-ro/gh.sh git/ref/heads/master` (MEASURED at close: 6a3824c2b5efd1764be178d05ba647feec06927c, PR 638) · `gh.sh "pulls?state=open"` (none at close) · Vercel production list for READY at that sha (NOT read at close — first read of S164).
3. CAPABILITIES: ls $HOME/mnt/ shows "2026 - Yapra - DDocuments", "cwf_yaprak", "cwf-architect-ro". In cwf_yaprak run ONLY history-reading git (register 151).
4. BUS BY NAME since 2026-09-29T12:00Z: SLIP-PUSH-DOC-REPO-S163-3 (AG-2, ls-remote proof of the close-set push) first. All six windows were in mail-wait at close; scouts ack by reply.
5. DOC REPO: `git rev-list --count origin/main..HEAD`; if the S163-3 push did not land, NOTICE-PUSH-DOC-REPO-S164-1 to an idle AG window.

## 2 · FIRST WORK, IN THIS ORDER (one open PR at a time; each PR from a branch cut from CURRENT master immediately before it opens — register 145)
1. OWNER WITNESS (141) — ⚡: publish armes.routing_obligation {tool getCookedStockAndon, when_any ["pişmiş","cooked"]} in the Rules UI; re-ask "KB7 pişmiş stokta hangi işler bulunuyor?". The Architect reads stage 07 obligationsApplied from turn_trace_digest before and after.
2. M1 (140) — CARD-M1-MCP-ISERROR-PASSTHROUGH-S164-1: executeMCPTool returns result.isError beside the text; stageTools passes it as transportError to classifyToolResult; ledger/telemetry/experience/honesty follow. NEW subject → scout-2 review → AG lane → PR → scout-1 lands.
3. TOUR-HONESTY (142) — AG-4: cherry-pick 3f3ba86f5d3ea0ed5e4c502c04d72987d028b3c0 onto a fresh branch off current master (conflicts with K32 on stageTools.ts / baseline / manifest resolved in the pick; npm run build; one commit, one parent) → PR → scout-1.
4. A26 (140 Track 2) — draft "A26 Memory & Learning Architecture" as the memory face of A25: one learning path (trace v2 → K23 filter on a TRUE success signal → router_proposals queue → K34 gate → publish → rollback); which store feeds which decision point (07 routing — memory before it?, 03 clarify via Graph KB, planner, prompt); forgetting/decay; scope; MEMORY-1 acceptance (LongMemEval incl. abstention). Inputs: SCOUT-STATUS-MEMORY-MAP-S163-1 (full), CWF-S163-MEMORY-DIAGNOSIS-AND-PLAN-v1, A25 §6/§9, cwf-sota-definition MEMORY-1. Quote rules mechanically (practice 110). Draft → scout-2 adversary → owner.
5. M2 (honest grading, after TOUR-HONESTY lands) · K41 (143, fresh branch after M2; owner flips knobs after) · M3 · M4 · POST-LANDING-1 (144).
6. Backlog: 146 AG007 literal · 147 settings.local.json · 149 boot --since drift · 133 guard card · 119 E2 registry · 106 · 135 · E1-b (PR 630 content, branch ebda839a, CARRIED UNVERIFIED) · E1-d.

## 3 · DISCIPLINE ADDED IN S163 (register 145–151)
- A PR opens only from a branch cut from current master at that moment; an open PR is never updated (FORCE-PUSH permanent, ruleset up-to-date). Master moved → close and carry.
- Every landing with a migration: the ⚡ operator prompt goes out the same turn scout reports LANDED (148). Operator = `supabase db push` from a clean worktree, dry-run first.
- While anything is landable, wait IN-TURN with named waits; never end a turn with green code unlanded (150).
- A refused notice (AG007) is re-cut as a sealed card, never reworded around the gate.
- Scout orders carry ≥ 12 × 2 min waits (CI ≈ 18 min).

## 4 · OWNER RULES IN FORCE
As v167 §4, plus S163: OWNER-APPROVAL-S163-PLAN-1 · OWNER-APPROVAL-S163-K41-1 · OWNER-APPROVAL-S163-MEMORY-MAP-1 · OWNER-APPROVAL-S163-MEMORY-PLAN-1 (Track 1 M1–M4 + Track 2 A26) · OWNER-DESIGN-S163-MEMORY-FEEDBACK-1 · OWNER-DESIGN-S163-MEMORY-A26-1 · v5_11 instructions in force.

## 5 · STATE AT CLOSE (MEASURED)
master 6a3824c2 (PR 638). Landed in S163: 634, 635, 636, 638; migrations of 635/636 applied 06:14Z. Branches: TOUR-HONESTY 3f3ba86f (AG-4), K41 e2cb64c0 (AG-2) — both on stale base ed033de0. All AG windows and both scouts in mail-wait. Doc repo: close set committed; push notice NOTICE-PUSH-DOC-REPO-S163-3 issued to AG-2 at close.

## 6 · ROWS 140–151 — IN REGISTER v156 (kept here so this file reads alone)
140 memory plan (M1–M4 + A26) · 141 owner witness tour · 142 TOUR-HONESTY landing · 143 K41 landing + flips · 144 POST-LANDING-1 · 145 PR-opening protocol · 146 AG007 literal · 147 settings.local.json · 148 migration same-turn · 149 boot --since drift · 150 gh.sh + in-turn waits · 151 bridge read-only git.
END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v168
