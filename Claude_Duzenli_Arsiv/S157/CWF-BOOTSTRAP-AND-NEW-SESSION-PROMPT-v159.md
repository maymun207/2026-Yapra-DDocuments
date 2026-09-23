SOTA-1 — KABUL KRİTERİ (S80). v1'in tek kabul kriteri cwf-sota-definition'dır. O dosyadaki bir kritere izlenemeyen her şey v1 kapsamı dışıdır. Architect, bir SOTA kriterini ilerleten hiçbir kalemi "şimdilik gerek yok / az trafik / bu kadarı yeter / sonra / v1.1'e" gerekçesiyle erteleyemez, küçültemez, sırada aşağı çekemez. Elinde kalan tek itiraz sınıfı *"bu sıralama SOTA'yı kanıtlanamaz kılar"*dır ve ancak şunları YAZILI adlandırırsa kabul edilir: (a) hangi kriter kanıtsız kalır, (b) hangi tarihte kanıtlanabilir olur, (c) hangi ölçüm çözer. Üçü eksik her erteleme önerisi bir SOTA-1 ihlalidir: sahip adıyla iptal eder, Architect ya aynı mesajda (a)+(b)+(c)'yi verir ya öneriyi geri çeker — üçüncü yol yoktur. Bir kriter YALNIZ kanıtla emekli olur; kolaylık, maliyet veya kapsam baskısıyla asla.

CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v159
Cut at S157 close (2026-09-23T05:25Z) as a WHOLE new version, LAST of the close set; SUPERSEDES v158. Carriers: register v148, CWF-S157-SESSION-CLOSE-v1, CWF-S157-FINDINGS-v1, CWF-SESSION-GRAPH-KB-v157, OWNER-APPROVAL-S157-BUDGET-AND-ROTATION-1, OWNER-RULING-S157-G2-OUTAGE-EDGES-1, OWNER-APPROVAL-S157-CLONE-SYNC-1. Every inherited line not re-measured in S157 is CARRIED UNVERIFIED.
Numbering: the next session is S158 (Claude_Duzenli_Arsiv/S158/).

## 0 · THE FIRST TOOL CALL OF S158 IS SendUserMessage WITH THE SOTA-1 PARAGRAPH, VERBATIM
The paragraph is ALSO in project instructions section 1, which is in context before any tool call: copy it from there. Do NOT read any file first (F-S156/F-S157-SOTA1-NOT-FIRST-1, five sessions running).

## 1 · OPEN SEQUENCE
1. TASK LIST = register v148 A-H, S156 rows, S157 NEW ROWS, one panel row per item or named group.
2. CARRY THE S157 CLOSE SET INTO THE DOC REPO FIRST: the bridge was down at S157 close, so CWF-S157-FINDINGS-v1, CWF-S157-SESSION-CLOSE-v1, cwf-open-items-register-v148, CWF-SESSION-GRAPH-KB-v157 and this file exist in the project box ONLY. Copy them byte-exact (project_read -> write) into Claude_Duzenli_Arsiv/S157/, commit, then one push notice to the first lane window (same shape as NOTICE-PUSH-DOC-REPO-S157-1).
3. CAPABILITIES: ls $HOME/mnt/ must show "2026 - Yapra - DDocuments", "cwf_yaprak", "cwf-architect-ro"; recreate ~/gh.sh from ~/mnt/cwf-architect-ro/gh-token; CARD GATE: git archive the tracking ref's scripts/shared/api/cwf/_lib/package.json/tsconfig.json into ~/cpw/tree, symlink node_modules, esbuild 0.27.0 linux-arm64 via npm pack, ESBUILD_BINARY_PATH, node --import tsx scripts/cardPreflight.ts --check. The bridge cannot git fetch (no credential): read master from the GitHub API, not the tracking ref. If the bridge drops, write artefacts to the container scratchpad and copy them on reconnect.
4. READ THE BUS FIRST, by name (states at close):
   - AG-4 SLIP-BUDGET-PR610-MASTER-MERGE-S157-1 -> order the scout to land PR 610 (quote FILE-FENCE and the merge guard's own lines: this is the first PR judged by the landed guard) -> master within 30 min of green.
   - SCOUT-STATUS-REVIEW-CARD-ARMES-G2-KNOWLEDGE-AS-DATA-S156-1-v3 (order 04:17:34Z). GREEN -> card to AG-1 with boot text; RED with complete delta -> apply, EXEMPT; RED on design -> v4 to the scout.
   - CARD-SHARED-CLONE-GUARD-S157-1: cut v2 = scout D1-D8 verbatim (row fe985072-b28c-472e-ace8-15d045060087), EXEMPT, to AG-2 (claim nonce 65d136beb01b64eb5f89f33d21966bd7a1a02109).
   - Rotation: after PR 610 lands, AG-4 runs CARD-LANE-PASSWORD-ROTATION-S157-1-v2 ORDERS 0-2; then the Gemini operator ALTER with every other Claude window closed (operator prompt shape: OPERATOR-PROMPT-S155-ITEM46-ALTER-ROLE-1, file ~/.cwf_lane_S157_scram_verifier); ORDER 3 by a cardPreflight-checked notice.
5. SCHEDULED WORKFLOWS: read the last conclusion of every scheduled workflow on master (actions/runs?branch=master) at open; a red one is a finding in the first report (F-S157-BUDGET-FENCE-RED-FOUR-DAYS-UNREPORTED-1).

## 2 · OWNER RULES IN FORCE
OWNER-RULING-S153-NO-ARMES-HARDCODE-1 (top rule) · OWNER-RULING-S156-DATA-BACKENDS-1 · OWNER-RULING-S156-FAIL-CLOSED-1 · OWNER-RULING-S157-G2-OUTAGE-EDGES-1 (no DB configured = outage; zero rows = not an outage) · NEVER CONTROL HIS MAC SCREEN · short Turkish replies; every owner action in ONE ⚡ message; SENİN AKSİYON MADDELERİN; first line = what moved in the PRODUCT · no functionality removed · A24 by Wednesday 2026-09-23 evening TSI · one plan, one approval · 30 minutes green to master · <= 20 turns · every problem with its fix and its date.

## 3 · BOOT TEXTS
AG-n new tab: `Sen AG-n'sin. CLAUDE.md'yi uygula, ANCAK poll/cron görevi KURMA. Kartın: <NAME> (bus <created_at>). relay_inbox'tan yalnız onu oku ve yap; kendi worktree'nde çalış. Kod bağlamını önce graft ile al ve slip'ine GRAFT satırını yaz. GitHub token'ını git credential fill ile kendin al; hiçbir ortam değişkeninin değerini basma. factory_state yazımında FW001 alırsan scripts/factoryState.mjs reclaim(self) ile adresini geri al ve slip'ine yaz. Slip'ini bus'a yaz ve dur.` A closed tab re-boots with `npm run lane:boot -- AG-n --confirm-takeover AG-n:<held sha read from refs/heads/lane/AG-n via the API>`.
Existing tab: ALWAYS start with the lane's name: `Sen AG-n'sin. Kartını oku: <NAME> (bus <created_at>) ...` (F-S157-ORDER-PASTED-TO-WRONG-TAB-1).
Scout: `Sen scout'sun. CLAUDE.md'yi uygula, ANCAK poll/cron görevi KURMA. Bekleme döngüsü yok. Emrin: <NAME> (bus <created_at>). relay_inbox'tan yalnız onu oku ve yap. Hiçbir ortam değişkenini hiçbir şekilde basma.`
An approved external write (AWS, workflow dispatch, DB): the ⚡ message tells the owner to leave auto mode (Shift+Tab) in that tab first, then approve the prompt (F-S157-AUTO-MODE-CLASSIFIER-DENIES-WITHOUT-PROMPT-1).

## 4 · CARD DISCIPLINE (v158 section 4 stands) + S157
- Every PR report carries a FILE-FENCE block: the merge guard now enforces it on master.
- Parallel PRs: when one lands, the other's author merges master by notice immediately (strict ruleset).
- Cards too long to embed in an order are read by the scout from the doc repo path with a sha256 check (worked for four cards in S157).

## 5 · IN FLIGHT AT CLOSE
AG-4: PR 610 master merge (notice 05:11:07Z), then rotation v2. AG-2: idle after clone sync (claim 65d136beb01b64eb5f89f33d21966bd7a1a02109). AG-1: idle, awaiting G2 v3. Scouts: G2 v3 review (scout-1). master edc7e880213ec1d872483d5c239b54f9046c1466; open PRs: 610.

## 6 · THE ONE THING
Land PR 610; get G2 to AG-1 and landed; then G2c, G3 + G4 — all of item 58 by Wednesday evening TSI. In parallel: shared clone guard v2 (AG-2), rotation (AG-4), then 40b, 40c C2, 40d P2-0/P2-1.
END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v159
