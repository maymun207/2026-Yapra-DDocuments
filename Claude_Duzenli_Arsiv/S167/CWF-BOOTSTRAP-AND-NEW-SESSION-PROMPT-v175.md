SOTA-1 — KABUL KRİTERİ (S80). v1'in tek kabul kriteri cwf-sota-definition'dır. O dosyadaki bir kritere izlenemeyen her şey v1 kapsamı dışıdır. Architect, bir SOTA kriterini ilerleten hiçbir kalemi "şimdilik gerek yok / az trafik / bu kadarı yeter / sonra / v1.1'e" gerekçesiyle erteleyemez, küçültemez, sırada aşağı çekemez. Elinde kalan tek itiraz sınıfı *"bu sıralama SOTA'yı kanıtlanamaz kılar"*dır ve ancak şunları YAZILI adlandırırsa kabul edilir: (a) hangi kriter kanıtsız kalır, (b) hangi tarihte kanıtlanabilir olur, (c) hangi ölçüm çözer. Üçü eksik her erteleme önerisi bir SOTA-1 ihlalidir: sahip adıyla iptal eder, Architect ya aynı mesajda (a)+(b)+(c)'yi verir ya öneriyi geri çeker — üçüncü yol yoktur. Bir kriter YALNIZ kanıtla emekli olur; kolaylık, maliyet veya kapsam baskısıyla asla.

CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v175
Re-cut at S167 owner turn 20 (2026-09-30T22:00Z). SUPERSEDES v174 and v173. Carriers: register v162 (= v161 + cwf-open-items-register-v162-S167-FINAL-SECTIONS, by cat), CWF-S167-SESSION-CLOSE-v2, CWF-S167-FINDINGS-v2, CWF-SESSION-GRAPH-KB-v167, CWF-S167-PLAN-v1, instructions v5_11. Every inherited line not re-measured in S167 is CARRIED UNVERIFIED.
Numbering: the next session is S168 (Claude_Duzenli_Arsiv/S168/).

## 0 · FIRST TOOL CALL OF S168 = SendUserMessage with the SOTA-1 paragraph above, VERBATIM, before any read (v5_11 §0.1). S167 did it right; keep it.

## 1 · OPEN SEQUENCE
1. Task list = register v161 open rows (184–192, 166-P, 170-P, 160, 161, 167, 168, 169, 171, 176) + PRs in flight.
2. CAPABILITIES FIRST, same turn: `ls $HOME/mnt/` must show "2026 - Yapra - DDocuments", cwf-architect-ro, cwf_yaprak. At S167 open only the first was connected — the owner connected the other two on request. Missing → say so the same turn.
3. GITHUB via `$HOME/mnt/cwf-architect-ro/gh.sh` (the container has no GitHub credential; job LOGS are not readable from the bridge — a scout or the author reads them): git/ref/heads/master · pulls?state=open · actions/runs?head_sha=<40-hex> · actions/runs/<id>/jobs (step timings and the failing step number work). At cut: master 1f694e1ff47d84d6e7b321e332446519f443b1f0; PR 656 (TEST-ROOT, AG-1) 42e9eb273ab2131653c572a25649e56d89160df4 guard green, suite running; PR 658 (SESSION-TOKEN, AG-4) d8c2fe4062a056744fd4868a93060b496c30f7c2 RED at merge guard; PR 659 (INBUCKET, AG-3) e3889ccd1c5ada3dae14a817e51714fb23e40c34 RED at merge guard; PR 657 closed (SUPERSEDED-BY 659).
4. BUS by name since 21:25Z: SCOUT-STATUS-LAND-656-657-S167-1 (scout-2) · SCOUT-STATUS-PREREVIEW-SCOUT-ACK-S167-1 and -CI-SPEED- (scout-1) · SLIP-CARD-SESSION-TOKEN-S167-1 (AG-4) · SLIP-NOTICE-INBUCKET-HEADER-FIX-S167-1 (AG-3) · SLIP-CARD-TEST-ROOT-S167-1 (AG-1). Scouts show pickup only by their final reply until 185 lands.
5. Vercel production list (project prj_0fDFCY8qXj8Kr5y7n4zmyefjHY8i, team team_UjOMyrQtTQ32mfYCeEDpC0Qj) — anchor = READY sha.
6. Doc repo: `git -C "…/2026 - Yapra - DDocuments" rev-list --count origin/main..HEAD` > 0 → push notice to an idle AG (proof = ls-remote 40-hex).

## 2 · FIRST WORK, IN THIS ORDER
0. scout-1: owner tab check (⚡ 00:46 TSİ) — confirm it is alive (a reply row) or re-boot it with BOOT-LANES-S167-1.
1. Land 656 (scout-2). For 658 and 659 get the `[merge-guard] FAIL …` line (scout-2's landing reply, or order a scout); if 658's cause is the empty first-commit fence, AG-4 carries onto a FRESH branch (one commit = code + report + FILE-FENCE) and closes 658 as SUPERSEDED-BY.
2. SCOUT-ACK v2 and CI-SPEED v2 from scout-1's verdicts (paste amendments verbatim, EXEMPT seal with the verdict row id) → AG-1 (after 656) and AG-3. SESSION-TOKEN lands BEFORE SCOUT-ACK (both edit mail-wait.mjs).
3. CI-SPEED exit = the PR's own CI "Run tests" < 480 s, file/test counts equal (C2/C5).
4. 189: compile every `PROMPTS:` line from S167/S168 slips → ONE ⚡ with exact allow lines (Architect writes .claude/settings.local.json on onay, backup first). 191 rides in that PR.
5. 166-P: scout reads a production turn for SD1 (no stamp on "1 250 000" / "5 Neden Analizi"; "3 neden bulundu" still stamped).
6. 190 (test writes docs/ground file) card · 192 graft upgrade decision · then 167, 168, 169, 171, 160 ⚡, 161.

## 3 · DISCIPLINE ADDED IN S167 (binding)
- Every lane message starts `[<addr>]`; every slip carries `GRAFT:` and `PROMPTS:` lines (BOOT-LANES-S167-1, NOTICE-PROMPT-HYGIENE-S167-1). A slip without them is returned.
- Clear + re-boot a window only when IDLE, one ⚡ per window with the boot text from BOOT-LANES-S167-1.
- A scout's silence is not "not consumed"; read its reply rows (until 185 lands, pickup is invisible).
- New report files in docs/relay need line 1 `<!-- relay-audit: v1 kind=report -->`, ## CLAIMS, ## DIFF, a FILE-FENCE, and no 7–39-hex — and they ride in the FIRST commit with the code (A-REC-S167-4, register 193). A repair notice names the gate rule set it must satisfy, read from source first (A-REC-S167-3).
- CI-DIET skips only non-code PRs; code PRs run the full suite by design; the speed fix is CI-SPEED (184).
- When two PRs edit one file, the one whose review returns first lands first; the other is carried onto the new master.
- Card SQL is generated from the file bytes (md5 + sha256 WHERE); files go to the doc repo with device_commit_files + md5 check.

## 4 · OWNER RULES IN FORCE
As v173 §4, plus S167: OWNER-APPROVAL-S167-PLAN-1 · OWNER-ORDER-S167-CLEAR-REBOOT-GRAFT-1 · OWNER-ACT-S167-DELETE-GRANT-1 (session-scoped) · OWNER-APPROVAL-S167-CI-SPEED-1 · OWNER-APPROVAL-S167-SCOUT-ACK-1.

## 5 · STATE AT CUT (MEASURED 21:57Z)
master 1f694e1f (PR 655) · landed in S167: 654 seal, 655 SD1 · open: 656 (suite running), 658 (red), 659 (red) · SCOUT-ACK v1 + CI-SPEED v1 waiting on scout-1's pre-review · throughput: 6 landings in 2 h (650–655), then none in the last hour (guard reds + scout silence).
END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v175
