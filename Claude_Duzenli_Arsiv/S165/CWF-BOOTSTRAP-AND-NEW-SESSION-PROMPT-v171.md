SOTA-1 — KABUL KRİTERİ (S80). v1'in tek kabul kriteri cwf-sota-definition'dır. O dosyadaki bir kritere izlenemeyen her şey v1 kapsamı dışıdır. Architect, bir SOTA kriterini ilerleten hiçbir kalemi "şimdilik gerek yok / az trafik / bu kadarı yeter / sonra / v1.1'e" gerekçesiyle erteleyemez, küçültemez, sırada aşağı çekemez. Elinde kalan tek itiraz sınıfı *"bu sıralama SOTA'yı kanıtlanamaz kılar"*dır ve ancak şunları YAZILI adlandırırsa kabul edilir: (a) hangi kriter kanıtsız kalır, (b) hangi tarihte kanıtlanabilir olur, (c) hangi ölçüm çözer. Üçü eksik her erteleme önerisi bir SOTA-1 ihlalidir: sahip adıyla iptal eder, Architect ya aynı mesajda (a)+(b)+(c)'yi verir ya öneriyi geri çeker — üçüncü yol yoktur. Bir kriter YALNIZ kanıtla emekli olur; kolaylık, maliyet veya kapsam baskısıyla asla.

CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v171
Cut at S165 close (2026-09-30T18:3xZ, owner turn 20) as a WHOLE new version; SUPERSEDES v170 (unattended turn-17 cut) and v169. Carriers: register v159 (= v158 + cwf-open-items-register-v159-S165-FINAL-SECTIONS, concatenated by script on the bridge), CWF-S165-SESSION-CLOSE-v2, CWF-S165-FINDINGS-v2, CWF-SESSION-GRAPH-KB-v165, A26 v1_2, A25 v1, instructions v5_11. Every inherited line not re-measured in S165 is CARRIED UNVERIFIED.
Numbering: the next session is S166 (Claude_Duzenli_Arsiv/S166/).

## 0 · THE FIRST TOOL CALL OF S166 IS SendUserMessage WITH THE SOTA-1 PARAGRAPH ABOVE, VERBATIM
Before ANY read (v5_11 §0.1).

## 1 · OPEN SEQUENCE
1. Task list = register rows 154–176 open + every OPEN row carried. Footer "tur n/20"; remind at 18; close set at 20.
2. ANCHOR from the container: `git ls-remote https://github.com/maymun207/cwf_yaprak refs/heads/master` (at cut: fb28343ea332e98aa588bf73acc0762c84e1d9dc, PR 648) · `curl .../pulls?state=all&per_page=3` (at cut: 649 open RED FENCE-GREW at b736f1f40f10834629176a84cc07a552c664cafa; AG-3 carrying it to phase/m3-feedback-evidence-s165-3 and closing 649) · `/commits/<sha>/check-runs` for CI · Vercel production list (UNMEASURED at cut).
3. CAPABILITIES: device_bash `date -u` (bridge up?); ls $HOME/mnt/. If the bridge refuses twice → the Mac is offline: say so in the same turn, ⚡ "Mac açık", push notification if the owner is away.
4. BUS BY NAME since 2026-09-30T18:20Z: NOTICE-M3-FRESH-BRANCH-S165-1 (AG-3) consumed_at + SLIP-NOTICE-M3-FRESH-BRANCH-S165-1 · ORDER-SCOUT-LAND-M3-S165-3 (scout-2) + SCOUT-STATUS-LAND-M3-S165-3. Print both reads. `ls -t` Claude_Duzenli_Arsiv/S165/ for fallback slips.
5. LOOP CHECK: every window whose to_lane row stays unconsumed > 3 min while the bridge is up → one ⚡ with one boot line per dropped window (AntiGravity → cwf_yaprak workspace → tab → paste; ends in `node scripts/mail-wait.mjs <lane> --budget-min 480`; scouts via `.claude/boot/free.md`).
6. REGISTER v159: confirm S165/cwf-open-items-register-v159.md exists (built at close by cat of v158 + S165-FINAL sections); if absent, build it by the same cat and print the md5s.
7. DOC REPO: `git rev-list --count origin/main..HEAD`; > 0 → NOTICE-PUSH-DOC-REPO-S166-1 to an idle AG (proof = ls-remote 40-hex).

## 2 · FIRST WORK, IN THIS ORDER (one open PR at a time; branch from CURRENT master; 30 minutes green→master)
1. M3 (163): fresh-branch PR from phase/m3-feedback-evidence-s165-3 (649 closed) → CI by full sha → scout-2 lands under ORDER-SCOUT-LAND-M3-S165-3 (10×60 s named wait after clean; owner ⚡ if clean-but-stalled, 169) → the SAME turn LANDED: Operator ⚡ for 20260930060000_learning_snapshots_human_evidence (prompt: Claude_Duzenli_Arsiv/S165/SCOUT-STATUS-PREREVIEW-M3-S165-1 §8; dry run exactly one pending).
2. SD2 (164): slot notice to AG-4 — re-pick 2bea820041c6ccd02d722c5cc47cd7499ef7d1b0 onto the new master, open PR → scout lands.
3. vectorLane (165): AG-1 — re-pick 68224cda2649237989afc37f3dfaba109eebb180 → PR → scout.
4. SD1 (166): AG-1 — re-pick ab6e77f725f572975c6ad58c9b65532111d4faad → PR → scout.
5. While the chain runs, idle lanes/scouts get: 175 test-root card · 170 mail-wait network-retry card (NEW subject → scout first) · 169 auto-merge measure (scout) · 167 K41 exam-set measure (scout, branch dispatch) · 168 model-text governed-home card (NEW subject → scout) · 171 · 174.
6. M4b (160): ⚡ with ONE recommended MEMORY-1 bar (A26 v1_2 K7). Register 60 (161) small card.

## 3 · DISCIPLINE ADDED IN S165
- Proof budget (173): no card orders more than one full-suite run unless the flake is its subject.
- The moment a PR lands, every idle lane gets its carry-prep in the same tick (A-REC-S165-2).
- A lane silent on a push: read the bridge and pooler BEFORE attributing the silence to the card (A-REC-S165-3).
- Every land order: 10×60 s named wait after clean, then owner ⚡ (169).
- Device transfers: files via device_commit_files / quoted heredoc + md5, never base64 (130).
- The owner is never asked to paste a lane screen; the bus is read by name (S143).
- A notice that adds a path to an OPEN PR orders a fresh-branch carry, never fence growth (A-REC-S165-4; mergeGuard.mjs 473-474).
- A25 forecast is re-measured at every close from landed-PR counts (row 176; at S165: E5 exit ≈ 13 Ekim).

## 4 · OWNER RULES IN FORCE
As v169 §4, plus S165: OWNER-QUESTION-S165-A25-ETA-1 · OWNER-APPROVAL-S165-PLAN-1 · OWNER-WITNESS-S165-K41-FLIP-1 (router 1/0 restored by the owner; default to be decided on 167) · OWNER-ACT-S165-PR648-HAND-MERGE-1.

## 5 · STATE AT CUT (MEASURED 18:26Z)
master fb28343e (PR 648) · landed in S165: 646, 647 (M1B), 648 (M4a + migration verified) · PR 649 open RED FENCE-GREW (fix correct) → fresh-branch carry in flight (AG-3) · carried branches: SD2 2bea8200, vectorLane 68224cda, SD1 ab6e77f7 · AG-1 stopped, AG-4 and scout-1 idle · doc repo through af5869a + close commit, local (push pending).
END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v171
