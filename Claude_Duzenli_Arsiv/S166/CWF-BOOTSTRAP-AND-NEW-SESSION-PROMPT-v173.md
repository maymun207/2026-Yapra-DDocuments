SOTA-1 — KABUL KRİTERİ (S80). v1'in tek kabul kriteri cwf-sota-definition'dır. O dosyadaki bir kritere izlenemeyen her şey v1 kapsamı dışıdır. Architect, bir SOTA kriterini ilerleten hiçbir kalemi "şimdilik gerek yok / az trafik / bu kadarı yeter / sonra / v1.1'e" gerekçesiyle erteleyemez, küçültemez, sırada aşağı çekemez. Elinde kalan tek itiraz sınıfı *"bu sıralama SOTA'yı kanıtlanamaz kılar"*dır ve ancak şunları YAZILI adlandırırsa kabul edilir: (a) hangi kriter kanıtsız kalır, (b) hangi tarihte kanıtlanabilir olur, (c) hangi ölçüm çözer. Üçü eksik her erteleme önerisi bir SOTA-1 ihlalidir: sahip adıyla iptal eder, Architect ya aynı mesajda (a)+(b)+(c)'yi verir ya öneriyi geri çeker — üçüncü yol yoktur. Bir kriter YALNIZ kanıtla emekli olur; kolaylık, maliyet veya kapsam baskısıyla asla.

CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v173
Re-cut at S166 owner turn 20 (2026-09-30T20:17Z). SUPERSEDES v172 and v171. Session close is v2. Carriers: register v160 (= v159 + cwf-open-items-register-v160-S166-SECTIONS, by cat), CWF-S166-SESSION-CLOSE-v2, CWF-S166-FINDINGS-v1, CWF-SESSION-GRAPH-KB-v166, CWF-S166-PLAN-v2, instructions v5_11. Every inherited line not re-measured in S166 is CARRIED UNVERIFIED.
Numbering: the next session is S167 (Claude_Duzenli_Arsiv/S167/).

## 0 · FIRST TOOL CALL OF S167 = SendUserMessage with the SOTA-1 paragraph above, VERBATIM, before any read (v5_11 §0.1).

## 1 · OPEN SEQUENCE
1. Task list = register v160 open rows (166, 179, 180, 181, 183, 170-P, 160, 161, 167, 168, 169, 171, 174, 175, 176) + practices 173/177/178/182. Footer "tur n/20"; remind at 18; close set at 20.
2. GITHUB from the BRIDGE (the container has NO GitHub credential: `git ls-remote` fails "could not read Username"): `$HOME/mnt/cwf-architect-ro/gh.sh git/ref/heads/master` · `gh.sh "pulls?state=all&per_page=6"` (read `auto_merge.enabled_by`, `merged_by`) · `gh.sh "actions/runs?head_sha=<40-hex>"` (check-runs endpoint is 403 for this token; use runs) · `gh.sh rules/branches/master` (strict must read false). At cut: master a3ce7b0c1b1ba39d559d034e2c18fb938799a76c; PR 654 (seal) open at d4e441ec3cf9e6238c765cdd08d3814dc0e47439, armed by maymun207.
3. CAPABILITIES: device_bash `date -u`; `ls $HOME/mnt/` must show "2026 - Yapra - DDocuments", cwf-architect-ro, cwf_yaprak (the code clone — graft/ lives there). Missing → say so the same turn.
4. BUS BY NAME since 2026-09-30T20:10Z: SCOUT-STATUS-LAND-SEAL-S166-1 (scout-1) · SLIP-NOTICE-SD1-RECARRY-AFTER-SEAL-S166-1 (AG-4) · any `[AG-x] I am` lines. Print both reads each tick.
5. WATCHDOG LENS: `.git/worktrees/<wt>/{HEAD,index,logs/HEAD}` mtimes in the shared clone (cwf_yaprak) — no git write 5 min after a card's consumed_at → owner ⚡ the same tick (tab check: permission prompt?).
6. DOC REPO: `git -C "…/2026 - Yapra - DDocuments" rev-list --count origin/main..HEAD` > 0 → push notice to an idle AG (proof = ls-remote 40-hex). Bridge commits: `cwf-architect-ro/gitw.sh <repo> -c user.name="Claude Architect" -c user.email="architect@cwf.local" commit …`.

## 2 · FIRST WORK, IN THIS ORDER
1. 179 SEAL (PR 654): read scout-1's SCOUT-STATUS-LAND-SEAL-S166-1; RED → paste its amendments to AG-3 as a notice (same subject); GREEN+LANDED → confirm on master: manifest has no lastSyncedCommit/mappedContentSha; RULE-20 amended; Vercel production build passes check:doc-drift in build mode (ATTEST NOT RUN line).
2. 166 SD1: AG-4 re-carries after 654 → PR → a scout lands (the first PR under DIAGRAM-ATTEST — read its `[check:doc-drift]` lines).
3. 183: RULED in S166 — window 1 owns AG-3; window 2 closed. Cut the per-window session-token card (boot mints a token; every slip prints it) — NEW subject → scout first. 181 resolved (AG-1 back 20:11Z).
4. 180: list every command that raised a permission prompt in S165/S166 (M3 carry, seal card: at least `git checkout <sha> -- .`, `gh pr close`, CLAUDE.md / workflow edits — MEASURE from the lanes' slips) → ONE ⚡ to the owner with the exact allow lines to add to .claude/settings.json (the harness refuses a lane's self-edit).
5. Idle lanes: 175 test-root card · 174 inbucket rename · 169 auto-merge measure (scout) · 167 K41 exam measure (scout, branch dispatch) · 168 model-text governed home (NEW subject → scout first) · 171 · 160 M4b ⚡ (one recommended MEMORY-1 bar).

## 3 · DISCIPLINE ADDED IN S166 (binding)
- Read the FENCES of every PR you plan to run in parallel; disjoint files are not disjoint fences (A-REC-S166-1).
- A silent lane is measured (worktree mtimes) before it is described; "probably running proofs" is not a measurement (A-REC-S166-2).
- One ⚡ = one owner act; a secret/token step gets its own ⚡ and a screenshot check (A-REC-S166-3).
- Cards: lint every command against .claude/settings.json allow before insert; close PRs with `gh api repos/…/pulls/<n> -X PATCH -f state=closed`; re-run a failed job with `gh api -X POST …/actions/runs/<id>/rerun-failed-jobs` (both allow-listed).
- Cards to AG-* need an ```evidence:adversary seal (DB gate AG002): GREEN with the scout's verdict row + printed canonical sha256, or EXEMPT with `ack: <scout from_lane row id>` when the card carries that scout's amendments verbatim.
- Push-first: commit → push → PR in the first minutes; proofs after; CI is the certificate.
- Every lane message starts with `[<address>]` (182).

## 4 · OWNER RULES IN FORCE
As v171 §4, plus S166: OWNER-ORDER-S166-THROUGHPUT-FIRST-1 · OWNER-ORDER-S166-NO-WAIT-1 · OWNER-APPROVAL-S166-PLAN-1 (plan v2) · OWNER-ACT-S166-STRICT-OFF-1 · OWNER-ACT-S166-ADF-MERGE-TOKEN-1 (Contents RW + Pull requests RW) · OWNER-ORDER-S166-PERMANENT-SEAL-FIX-1 · OWNER-RULING-S166-RULE20-ATTEST-1 · OWNER-ACT-S166-PR653-HAND-MERGE-1 · OWNER-ORDER-S166-SAY-YOUR-NAME-1.

## 5 · STATE AT CUT (MEASURED 20:10Z)
master a3ce7b0c (PR 653) · landed in S166: 650 M3 (+ migration applied, verified), 651 vectorLane, 652 SD2, 653 lane resilience · open: PR 654 seal (scout-1 landing) · SD1 queued (AG-4) · AG-1 back (20:11Z) · duplicate AG-3 ruled (window 1) · doc repo: local commits since 0e2879ed not yet pushed.
END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v173
