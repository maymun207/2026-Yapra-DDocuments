SOTA-1 — KABUL KRİTERİ (S80). v1'in tek kabul kriteri cwf-sota-definition'dır. O dosyadaki bir kritere izlenemeyen her şey v1 kapsamı dışıdır. Architect, bir SOTA kriterini ilerleten hiçbir kalemi "şimdilik gerek yok / az trafik / bu kadarı yeter / sonra / v1.1'e" gerekçesiyle erteleyemez, küçültemez, sırada aşağı çekemez. Elinde kalan tek itiraz sınıfı *"bu sıralama SOTA'yı kanıtlanamaz kılar"*dır ve ancak şunları YAZILI adlandırırsa kabul edilir: (a) hangi kriter kanıtsız kalır, (b) hangi tarihte kanıtlanabilir olur, (c) hangi ölçüm çözer. Üçü eksik her erteleme önerisi bir SOTA-1 ihlalidir: sahip adıyla iptal eder, Architect ya aynı mesajda (a)+(b)+(c)'yi verir ya öneriyi geri çeker — üçüncü yol yoktur. Bir kriter YALNIZ kanıtla emekli olur; kolaylık, maliyet veya kapsam baskısıyla asla.

CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v178
Cut at S169 (2026-10-01T05:24Z, re-cut after six landings). SUPERSEDES v177 and v176.
Carriers: register v164 (= v163 + cwf-open-items-register-v164-S169-SECTIONS-v2), CWF-S169-SESSION-CLOSE-v2 (v1 §3–§4 carried), CWF-S169-FINDINGS-v1, CWF-SESSION-GRAPH-KB-v169, CWF-S169-OPEN-v1, CWF-S169-RULINGS-AND-ARECS-v2, OWNER-DESIGN-S169-PRIORITY-1, OWNER-RULING-S169-NO-CI-WATCH-1, instructions v5_11. Lines not re-measured in S169 are CARRIED UNVERIFIED.
Next session: S170 (Claude_Duzenli_Arsiv/S170/).

## 0 · FIRST TOOL CALL OF S170
SendUserMessage with the SOTA-1 paragraph above, VERBATIM, before any read.

## 1 · OPEN SEQUENCE
1. Task list from register v164 open rows: 201 proof, 202, 204, 206, 208, 209, 205, 207, then S167 carry (166-P, 167, 168, 171, 160, 161, 176, 189/191, 192).
2. Capabilities: `ls $HOME/mnt/` must show "2026 - Yapra - DDocuments", cwf-architect-ro, cwf_yaprak. In S169 the last two were missing at open; the owner connected them in turn 1. Say so in the same turn if missing.
3. GitHub: `bash $HOME/mnt/cwf-architect-ro/gh.sh <path-under-repo>`; doc repo git via `bash gitw.sh "<repo>" <git args>` with `-c user.name=Architect -c user.email=maymun207@gmail.com`. md5 on the bridge is `md5sum` (no `md5`).
4. Vercel production (prj_0fDFCY8qXj8Kr5y7n4zmyefjHY8i, team_UjOMyrQtTQ32mfYCeEDpC0Qj): at cut READY at master 6f545ba826349564b9da3ad37317930d05bf7e5c (dpl_Ew99hMg4qaKU4N3b2dKBUq8cDCV4); read it again.
5. Bus: read the LAST 30 MINUTES (never anchored on your own insert time — A-REC-S169-3). Scouts never stamp consumed_at; read their replies by artifact_name.
6. Doc repo: origin main was 28406a351c1399637ff3c0bbb31d46f4de13ccfb after AG-4's owner-consented push; later S169 commits are LOCAL. A doc-repo push from a lane window is refused by the classifier ([Remote Repoint]) unless the owner consents in that window; send a push notice to an idle AG; proof is ls-remote 40-hex.

## 2 · FIRST WORK
1. If the owner approved the S169 plan (⚡ "onay S169-plan"), the cards for 202, 204, 206 and 209 go to scouts for pre-review, then to AG lanes; otherwise ask for it once.
2. Read the first ordinary code PR after 663: tests=related? Run tests seconds? (row 201 proof).
3. Row 208 BOOT-LANES-S170 at open.
4. Row 207 ⚡ (merge queue) with the 201 numbers.
5. Then the S167 carry list.

## 3 · DISCIPLINE ADDED IN S169 (binding)
- Every code card carries a REPORT RULE: line 1 `<!-- relay-audit: v1 kind=report -->`, one `## FILE-FENCE`, CLAIMS + DIFF sections, first commit carries code + report; run relayAuditGate.test.ts before the first push.
- Scout amendments go into v2 cards by SQL composition from the scout's row (byte-for-byte), md5/sha256 computed first.
- A refusal's own text is read before any notice about it; "smaller pieces" is routing around.
- "Read your box" ⚡ only after measuring the card unconsumed ≥ 5 min.
- Lanes never watch CI; Architect reads CI by full sha and re-sends scout landing orders after WAITING-CI.
- Self-timer ≤3 min only while a lane or CI can move; one ⚡ then no timer when only the owner can move (OWNER-RULING-S169-196-1).

## 4 · OWNER RULINGS IN FORCE (new in S169)
OWNER-RULING-S169-196-1 · OWNER-APPROVAL-S169-190-1 · OWNER-DESIGN-S169-PRIORITY-1 · OWNER-RULING-S169-PR-FAST-TEST-1 (amends S37-2) · OWNER-RULING-S169-SCOUT-ACK-REST-1 · OWNER-RULING-S169-NO-CI-WATCH-1. Plus all of v176 §4 (carried unverified).

## 5 · STATE AT CUT (measured 05:23Z)
master 6f545ba826349564b9da3ad37317930d05bf7e5c (670). Landed in S169: 660, 662, 661, 663, 669, 670 — all READY in Vercel production. Open PRs: none. Run tests 988 s → 458 s. Lanes AG-1..AG-4, scout-1, scout-2 idle on mail-wait 110.

END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v178
