SOTA-1 — KABUL KRİTERİ (S80). v1'in tek kabul kriteri cwf-sota-definition'dır. O dosyadaki bir kritere izlenemeyen her şey v1 kapsamı dışıdır. Architect, bir SOTA kriterini ilerleten hiçbir kalemi "şimdilik gerek yok / az trafik / bu kadarı yeter / sonra / v1.1'e" gerekçesiyle erteleyemez, küçültemez, sırada aşağı çekemez. Elinde kalan tek itiraz sınıfı *"bu sıralama SOTA'yı kanıtlanamaz kılar"*dır ve ancak şunları YAZILI adlandırırsa kabul edilir: (a) hangi kriter kanıtsız kalır, (b) hangi tarihte kanıtlanabilir olur, (c) hangi ölçüm çözer. Üçü eksik her erteleme önerisi bir SOTA-1 ihlalidir: sahip adıyla iptal eder, Architect ya aynı mesajda (a)+(b)+(c)'yi verir ya öneriyi geri çeker — üçüncü yol yoktur. Bir kriter YALNIZ kanıtla emekli olur; kolaylık, maliyet veya kapsam baskısıyla asla.

CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v169
Cut at S164 close (2026-09-30 09:3x TSİ, owner turn 13, OWNER-ORDER-S164-CLOSE-1) as a WHOLE new version; SUPERSEDES v168. Carriers: register v157 (rows 152–162), CWF-S164-SESSION-CLOSE-v1, CWF-S164-FINDINGS-v1, CWF-SESSION-GRAPH-KB-v164, CWF-S164-OPEN-ITEMS-TABLE-v1, A26 v1_2 (memory design in force), A25 v1 (routing design in force), project instructions v5_11. Every inherited line not re-measured in S164 is CARRIED UNVERIFIED.
Numbering: the next session is S165 (Claude_Duzenli_Arsiv/S165/).

## 0 · THE FIRST TOOL CALL OF S165 IS SendUserMessage WITH THE SOTA-1 PARAGRAPH ABOVE, VERBATIM
Before ANY read (v5_11 §0.1). S164's own compliance is UNMEASURED (transcript compacted) — S165 is measured by its first call.

## 1 · OPEN SEQUENCE
1. Task list = register v157 rows 152–162 + every OPEN row carried. Footer "tur n/20" on every reply; remind at 18; close set at 20.
2. ANCHOR by gh.sh: `$HOME/mnt/cwf-architect-ro/gh.sh git/ref/heads/master` (MEASURED at close: 61e7f368604ffdd86b8841d9063e540641d42efc, PR 645) · `gh.sh "pulls?state=all&per_page=5"` (at close: 646 open, head 408ba6c736952d44bc3fe4e87e4b9f204c3a2dbe) · Vercel production list (READY at 61e7f368 at close; if 646 landed, READY at its merge).
3. CAPABILITIES: ls $HOME/mnt/ → "2026 - Yapra - DDocuments", "cwf_yaprak", "cwf-architect-ro". In cwf_yaprak only history-reading git (151).
4. BUS BY NAME since 2026-09-30T06:20Z (filter by artifact_name, print both reads): SCOUT-STATUS-LAND-PR646-S164-1 (scout-1) · SLIP-CARD-SD1-NUMERIC-S164-1 (AG-1) · SLIP-PUSH-DOC-REPO-S164-3 (AG-1) · SLIP-CARD-SD2-S164-1 (AG-4) · SLIP-POST-LANDING-1-PR-S164-8 (AG-4) · SLIP-CARD-M3-FEEDBACK-EVIDENCE-S164-1 (AG-3) · SCOUT-STATUS-PREREVIEW-M4A-S164-1 (scout-2). Then `ls -t` Claude_Duzenli_Arsiv/S164/ for fallback slips (127).
5. POOLER LENS (159): supavisor_logs over the last 15 min — which windows poll at ~90 s. Every window silent AND without output since close → one ⚡ with one boot line per dropped window (scouts: `.claude/boot/free.md` for the address, then `node scripts/mail-wait.mjs <scout-N> --budget-min 480`).
6. DOC REPO: `git rev-list --count origin/main..HEAD`; if SLIP-PUSH-DOC-REPO-S164-3 is absent and the count is > 0, NOTICE-PUSH-DOC-REPO-S165-1 to an idle AG.

## 2 · FIRST WORK, IN THIS ORDER (one open PR at a time; each PR from a branch cut from CURRENT master — 145; 30 minutes green→master — §13.11)
1. PR 646 POST-LANDING-1 → master (scout-1 order bc8faa99). If it landed, close 144.
2. OWNER FLIP (157) — if not yet done, re-issue the ⚡: Rules tab router.matrixReplace = 0, router.keywordArmAllPaths = 1; re-ask "KB7 pişmiş stokta hangi işler bulunuyor?". The Architect reads stage-07 keywordArmAdded + knobs (turn_trace_digest) before and after; close 143/131 on the witness.
3. Landing queue: M1B (152, AG-4, manifest reseal) → M3 (154, AG-3) → M4a (153, AG-4; re-pick after M3; ⚡ Operator prompt for health_memory_daily the SAME turn it lands, + verifyGrants.ts) → SD2 (156, AG-4) → SD1 (155, AG-1). Each: open-PR notice to the author lane → the idle scout lands it.
4. M4b (160): ⚡ to the owner with ONE recommended MEMORY-1 bar (A26 v1_2 K7) — spend-gated after that.
5. Register 60 (161) small card after M4a → scout → lane.
6. Backlog (scout MEASURE first, 12.1): 158 card-grammar disagreement · 146 AG007 literal · 147 settings.local.json · 149 boot --since · 133 guard card · 119 E2 registry · 135 · E1-d (named spend approval per firing).

## 3 · DISCIPLINE ADDED IN S164 (register 158–162)
- 3-minute Architect tick while any lane or order is live (send_later, initiation human_request); every idle lane gets work the same tick (162).
- Scout liveness from the pooler log; a landing scout silent > 10 min after green → ⚡ re-boot the same tick; never give one scout a review and a landing at once (159).
- Every card: GATES line incl. CI-only gates (A-REC-S164-1); report line "exactly ONE `FILE-FENCE:` line + `- <path>` lines" (F-S164-K41-FENCE-SHAPE-1); "graft first, then git grep for instance calls" (F-S164-GRAFT-CALLERS-MISS-INSTANCE-CALLS-1); a ruling that changes a reader set goes to the scout first (A-REC-S164-2).
- No bare 7–39 hex in card prose — this includes long all-decimal numbers (write 1,250,000, not the bare digit run).
- A REPORT-mode card-grammar refusal printed by a lane is carried to the owner (§12.13, 158).

## 4 · OWNER RULES IN FORCE
As v168 §4, plus S164: OWNER-APPROVAL-S164-PLAN-1 · OWNER-RULING-S164-A26-1 · OWNER-RULING-S164-A26-V12-1 (A26 v1_2 in force) · OWNER-RULING-S164-FEEDBACK-EVIDENCE-1 · OWNER-WITNESS-S164-ROUTING-OBLIGATION-1 · OWNER-ORDER-S164-THREE-MIN-TICK-1 · OWNER-ORDER-S164-CLOSE-1 · OWNER-DESIGN-S164-EXTERNAL-REVIEWS-1 · v5_11 instructions in force.

## 5 · STATE AT CLOSE (MEASURED 06:24–06:26Z)
master 61e7f368 (PR 645) · Vercel prod READY · landed in S164: 640 TOUR-HONESTY, 641 M1, 644 M2, 645 K41 · open PR 646 (CI running) · branches: M1B 3c44ed75 (AG-4), M4a b6e347be (AG-4) · in progress: M3 (AG-3), SD1 v2 (AG-1), SD2 v2 queued (AG-4) · scout-1 landing 646 · scout-2 pre-reviewing M4a · live grounding.numericMode 'stamp' · doc repo 13 ahead + close set, push notice at AG-1.

## 6 · ROWS 152–162 — IN REGISTER v157 (kept here so this file reads alone)
152 M1B landing · 153 M4a landing + Operator migration + verifyGrants · 154 M3 · 155 SD1 (106, 59) · 156 SD2 (61, 50) · 157 K41 owner flip + witness · 158 card-grammar disagreement · 159 scout liveness practice · 160 M4b (MEMORY-1 bar ruling) · 161 register 60 recall provenance · 162 3-minute tick.
END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v169
