SOTA-1 — KABUL KRİTERİ (S80). v1'in tek kabul kriteri cwf-sota-definition'dır. O dosyadaki bir kritere izlenemeyen her şey v1 kapsamı dışıdır. Architect, bir SOTA kriterini ilerleten hiçbir kalemi "şimdilik gerek yok / az trafik / bu kadarı yeter / sonra / v1.1'e" gerekçesiyle erteleyemez, küçültemez, sırada aşağı çekemez. Elinde kalan tek itiraz sınıfı *"bu sıralama SOTA'yı kanıtlanamaz kılar"*dır ve ancak şunları YAZILI adlandırırsa kabul edilir: (a) hangi kriter kanıtsız kalır, (b) hangi tarihte kanıtlanabilir olur, (c) hangi ölçüm çözer. Üçü eksik her erteleme önerisi bir SOTA-1 ihlalidir: sahip adıyla iptal eder, Architect ya aynı mesajda (a)+(b)+(c)'yi verir ya öneriyi geri çeker — üçüncü yol yoktur. Bir kriter YALNIZ kanıtla emekli olur; kolaylık, maliyet veya kapsam baskısıyla asla.

CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v176
Cut at the S168 close (2026-10-01T03:20Z, owner turn 3: "yeni session baslatalim"). SUPERSEDES v175.
Carriers: register v163 (= v162 + cwf-open-items-register-v163-S168-SECTIONS, joined with cat), CWF-S168-SESSION-CLOSE-v1, CWF-S168-FINDINGS-v1, CWF-SESSION-GRAPH-KB-v168, CWF-S168-OPEN-v1, CWF-S167-PLAN-v1, instructions v5_11.
Every inherited line not re-measured in S168 is CARRIED UNVERIFIED.
Numbering: the next session is S169 (Claude_Duzenli_Arsiv/S169/).

## 0 · FIRST TOOL CALL OF S169
SendUserMessage with the SOTA-1 paragraph above, VERBATIM, before any read (v5_11 §0.1).

## 1 · OPEN SEQUENCE
1. **Task list.** Build it from register v163's open rows: 660 (186), 184, 185, 189+191+197, 196, 198, 166-P, 190, 192, 167, 168, 169, 171, 160, 161, 176.
2. **Capabilities.** Run `ls $HOME/mnt/`. It must show "2026 - Yapra - DDocuments", cwf-architect-ro and cwf_yaprak. If any is missing, say so in the same turn.
3. **GitHub reads.**
   - Use `bash $HOME/mnt/cwf-architect-ro/gh.sh <PATH>`. The path goes under the repo, e.g. `commits/master`, `pulls/660`, `commits/<40-hex>/status`. Never pass the full repos/... path (graph KB v168).
   - The bridge can also fetch from GitHub and run mergeGuard.mjs (findings F-S168-BRIDGE-CAN-RUN-GUARD-1).
   - At cut: master 9354882aa2f993d8285bb0cefcb9cb1f350ec118. PR 660 open at ac51ca99eec4c4cea3f65ad40a22100522682a02, CI green, missing only adversary/scout, auto-merge armed.
4. **Vercel production** (project prj_0fDFCY8qXj8Kr5y7n4zmyefjHY8i, team team_UjOMyrQtTQ32mfYCeEDpC0Qj). At cut, 9354882a (dpl_2hbj32guXk9Nab9bEEhjaXsUTzBx) was BUILDING. Read READY first.
5. **Bus.**
   - Read rows since 03:15Z by name.
   - scout-2 was rebooted at 03:11Z and replied at 03:15Z (SCOUT-STATUS-LAND-659-660-S168-1).
   - scout-1 has written nothing since 20:32Z.
6. **Doc repo.**
   - The S168 close files are committed locally and not pushed. Send a push notice to an idle AG; proof is the `ls-remote` 40-hex.
   - Use gitw.sh for git commands on the bridge, because an index.lock that cannot be unlinked has been seen there.

## 2 · FIRST WORK, IN THIS ORDER
1. **Land 660.** It needs an adversary/scout status from a scout that can read the diff.
   - Option (a): scout-1 reviews 660. First confirm scout-1 is alive. If it is silent, one ⚡ /clear + boot.
   - Option (b): one ⚡ asking the owner to let `git diff` run in scout-2's window (row 197).
   - Pick ONE and say which. Thirty-minute rule from the moment the status is posted.
2. **Row 196.** Ask the owner for a one-line ruling on the waiting rule: "while every blocker is an owner act, no self-timer after the ⚡".
3. **SCOUT-ACK v2 and CI-SPEED v2** from scout-1's verdicts. SESSION-TOKEN (660) lands BEFORE SCOUT-ACK, because both edit mail-wait.mjs.
4. **189 + 191 + 197.** One PROMPTS ⚡ with exact allow lines, including `git diff` for scouts.
5. **166-P.** SD1 production read.
6. **Then:** 190 → 192 → 167, 168, 169, 171, 160 ⚡, 161.

## 3 · DISCIPLINE ADDED IN S168 (binding)
- **Waiting on the owner.** Send ONE ⚡, then no timer flood (F-S168-SELF-TIMER-FLOOD-1). Until the owner rules on 196, use a long gap: one read per 30 minutes at most, never 3 minutes, while the only blocker is an owner act.
- **Before any repair notice,** read the branch head and its diff (rule ①; A-REC-S168-3).
- **FROM stamps** are written at insert time, never ahead (A-REC-S168-2).
- **BOOT-LANES-S169-1** (when next cut) fixes the scout paragraph: scouts hold no lane ref (row 198).
- **All S167 discipline (v175 §3) stays in force.**

## 4 · OWNER RULES IN FORCE
As v175 §4. OWNER-APPROVAL-S167-PLAN-1 still governs the open plan items. A new card needs a named owner approval.

## 5 · STATE AT CUT (MEASURED 03:16Z)
- master 9354882a (PR 659).
- Landed in S168: 656 (731c1ee4, production READY) and 659 (9354882a, production BUILDING).
- 658 closed, SUPERSEDED-BY 660.
- Open: 660 (green, adversary/scout missing).
- Throughput: 2 landings in 7 h. The 4 h gap was scout windows stuck while the owner was asleep.

END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v176
