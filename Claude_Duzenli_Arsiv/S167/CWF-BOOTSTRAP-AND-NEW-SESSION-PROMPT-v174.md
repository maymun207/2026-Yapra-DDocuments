SOTA-1 — KABUL KRİTERİ (S80). v1'in tek kabul kriteri cwf-sota-definition'dır. O dosyadaki bir kritere izlenemeyen her şey v1 kapsamı dışıdır. Architect, bir SOTA kriterini ilerleten hiçbir kalemi "şimdilik gerek yok / az trafik / bu kadarı yeter / sonra / v1.1'e" gerekçesiyle erteleyemez, küçültemez, sırada aşağı çekemez. Elinde kalan tek itiraz sınıfı *"bu sıralama SOTA'yı kanıtlanamaz kılar"*dır ve ancak şunları YAZILI adlandırırsa kabul edilir: (a) hangi kriter kanıtsız kalır, (b) hangi tarihte kanıtlanabilir olur, (c) hangi ölçüm çözer. Üçü eksik her erteleme önerisi bir SOTA-1 ihlalidir: sahip adıyla iptal eder, Architect ya aynı mesajda (a)+(b)+(c)'yi verir ya öneriyi geri çeker — üçüncü yol yoktur. Bir kriter YALNIZ kanıtla emekli olur; kolaylık, maliyet veya kapsam baskısıyla asla.

CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v174
Cut at S167 owner turn 16 (2026-09-30T21:30Z), draft-first; a later S167 re-cut supersedes it. SUPERSEDES v173. Carriers: register v161 (= v160 + cwf-open-items-register-v161-S167-SECTIONS, by cat), CWF-S167-SESSION-CLOSE-v1, CWF-S167-FINDINGS-v1, CWF-SESSION-GRAPH-KB-v167, CWF-S167-PLAN-v1, instructions v5_11. Every inherited line not re-measured in S167 is CARRIED UNVERIFIED.
Numbering: the next session is S168 (Claude_Duzenli_Arsiv/S168/).

## 0 · FIRST TOOL CALL OF S168 = SendUserMessage with the SOTA-1 paragraph above, VERBATIM, before any read (v5_11 §0.1). S167 did it right; keep it.

## 1 · OPEN SEQUENCE
1. Task list = register v161 open rows (184–192, 166-P, 170-P, 160, 161, 167, 168, 169, 171, 176) + PRs in flight.
2. CAPABILITIES FIRST, same turn: `ls $HOME/mnt/` must show "2026 - Yapra - DDocuments", cwf-architect-ro, cwf_yaprak. At S167 open only the first was connected — the owner connected the other two on request. Missing → say so the same turn.
3. GITHUB via `$HOME/mnt/cwf-architect-ro/gh.sh` (the container has no GitHub credential): git/ref/heads/master · pulls?state=open · actions/runs?head_sha=<40-hex> · actions/runs/<id>/jobs (step timings work). At cut: master 1f694e1ff47d84d6e7b321e332446519f443b1f0; PR 656 (TEST-ROOT, AG-1) head ac8b611bca8788edc774ced342adc8f76bbd71e9 (may have moved); PR 657 (INBUCKET) head 67eaf3b36149e43655e0ea82bfd402b67054b49f + AG-3 header fix.
4. BUS by name since 21:25Z: SCOUT-STATUS-LAND-656-657-S167-1 (scout-2) · SCOUT-STATUS-PREREVIEW-SCOUT-ACK-S167-1 and -CI-SPEED- (scout-1) · SLIP-CARD-SESSION-TOKEN-S167-1 (AG-4) · SLIP-NOTICE-INBUCKET-HEADER-FIX-S167-1 (AG-3) · SLIP-CARD-TEST-ROOT-S167-1 (AG-1). Scouts show pickup only by their final reply until 185 lands.
5. Vercel production list (project prj_0fDFCY8qXj8Kr5y7n4zmyefjHY8i, team team_UjOMyrQtTQ32mfYCeEDpC0Qj) — anchor = READY sha.
6. Doc repo: `git -C "…/2026 - Yapra - DDocuments" rev-list --count origin/main..HEAD` > 0 → push notice to an idle AG (proof = ls-remote 40-hex).

## 2 · FIRST WORK, IN THIS ORDER
1. Land 657 then 656 (scout-2). 30-minute rule from green.
2. SCOUT-ACK v2 and CI-SPEED v2 from scout-1's verdicts (paste amendments verbatim, EXEMPT seal with the verdict row id) → AG-1 (after 656) and AG-3. SESSION-TOKEN lands BEFORE SCOUT-ACK (both edit mail-wait.mjs).
3. CI-SPEED exit = the PR's own CI "Run tests" < 480 s, file/test counts equal (C2/C5).
4. 189: compile every `PROMPTS:` line from S167/S168 slips → ONE ⚡ with exact allow lines (Architect writes .claude/settings.local.json on onay, backup first). 191 rides in that PR.
5. 166-P: scout reads a production turn for SD1 (no stamp on "1 250 000" / "5 Neden Analizi"; "3 neden bulundu" still stamped).
6. 190 (test writes docs/ground file) card · 192 graft upgrade decision · then 167, 168, 169, 171, 160 ⚡, 161.

## 3 · DISCIPLINE ADDED IN S167 (binding)
- Every lane message starts `[<addr>]`; every slip carries `GRAFT:` and `PROMPTS:` lines (BOOT-LANES-S167-1, NOTICE-PROMPT-HYGIENE-S167-1). A slip without them is returned.
- Clear + re-boot a window only when IDLE, one ⚡ per window with the boot text from BOOT-LANES-S167-1.
- A scout's silence is not "not consumed"; read its reply rows (until 185 lands, pickup is invisible).
- New report files in docs/relay need line 1 `<!-- relay-audit: v1 kind=report -->` — put it in every card's STEPS.
- When two PRs edit one file, the one whose review returns first lands first; the other is carried onto the new master.
- Card SQL is generated from the file bytes (md5 + sha256 WHERE); files go to the doc repo with device_commit_files + md5 check.

## 4 · OWNER RULES IN FORCE
As v173 §4, plus S167: OWNER-APPROVAL-S167-PLAN-1 · OWNER-ORDER-S167-CLEAR-REBOOT-GRAFT-1 · OWNER-ACT-S167-DELETE-GRANT-1 (session-scoped) · OWNER-APPROVAL-S167-CI-SPEED-1 · OWNER-APPROVAL-S167-SCOUT-ACK-1.

## 5 · STATE AT CUT (MEASURED 21:25Z)
master 1f694e1f (PR 655) · landed in S167: 654 seal, 655 SD1 · open: 656, 657 · cards in flight: SESSION-TOKEN v2 (AG-4), SCOUT-ACK v1 + CI-SPEED v1 at scout-1 · throughput: 6 landings in 2 h (650–655).
END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v174
