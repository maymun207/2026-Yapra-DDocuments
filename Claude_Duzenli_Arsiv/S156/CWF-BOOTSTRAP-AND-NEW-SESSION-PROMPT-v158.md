SOTA-1 — KABUL KRİTERİ (S80). v1'in tek kabul kriteri cwf-sota-definition'dır. O dosyadaki bir kritere izlenemeyen her şey v1 kapsamı dışıdır. Architect, bir SOTA kriterini ilerleten hiçbir kalemi "şimdilik gerek yok / az trafik / bu kadarı yeter / sonra / v1.1'e" gerekçesiyle erteleyemez, küçültemez, sırada aşağı çekemez. Elinde kalan tek itiraz sınıfı *"bu sıralama SOTA'yı kanıtlanamaz kılar"*dır ve ancak şunları YAZILI adlandırırsa kabul edilir: (a) hangi kriter kanıtsız kalır, (b) hangi tarihte kanıtlanabilir olur, (c) hangi ölçüm çözer. Üçü eksik her erteleme önerisi bir SOTA-1 ihlalidir: sahip adıyla iptal eder, Architect ya aynı mesajda (a)+(b)+(c)'yi verir ya öneriyi geri çeker — üçüncü yol yoktur. Bir kriter YALNIZ kanıtla emekli olur; kolaylık, maliyet veya kapsam baskısıyla asla.

CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v158
Cut at S156 close (2026-09-23T03:06Z, bridge date -u) as a WHOLE new version, LAST of the close set; SUPERSEDES v157. Carriers: register v147, CWF-S156-SESSION-CLOSE-v1, CWF-S156-FINDINGS-v1, CWF-SESSION-GRAPH-KB-v156, OWNER-RULING-S156-DATA-BACKENDS-1, OWNER-RULING-S156-FAIL-CLOSED-1, OWNER-APPROVAL-S156-MERGE-GUARD-1. Every inherited line not re-measured in S156 is CARRIED UNVERIFIED.
Numbering: the next session is S157 (Claude_Duzenli_Arsiv/S157/).

## 0 · THE FIRST TOOL CALL OF S157 SENDS THE SOTA-1 PARAGRAPH ABOVE, VERBATIM, BEFORE ANY READ
S153-S156 all wrote a sentence first (F-S156-SOTA1-NOT-FIRST-1). The first action is SendUserMessage with line 1 of this file.

## 1 · OPEN SEQUENCE
1. TASK LIST = register v147 §A-§H plus "S156 · NEW ROWS" IN FULL, one panel row per item or named group.
2. CAPABILITIES, measured in the first turn: ls $HOME/mnt/ must show "2026 - Yapra - DDocuments", "cwf_yaprak", "cwf-architect-ro" (request missing ones: cwf_yaprak under "2026 - Yapra -  Codes" with TWO spaces; ~/cwf-architect-ro). Recreate ~/gh.sh from ~/mnt/cwf-architect-ro/gh-token (never printed). CARD GATE: git archive origin/master scripts shared into ~/cpw/tree, symlink node_modules, esbuild per session (npm pack @esbuild/linux-arm64@0.27.0), then node --import tsx scripts/cardPreflight.ts --check; prove it once with a planted short sha (CP-8). Bridge git: always --no-optional-locks for reads and -c gc.auto=0 -c maintenance.auto=false for writes, then move .git/*.lock into .git/stale-locks/.
3. READ THE BUS FIRST FOR THESE, by name, and act (states at close):
   - AG-4 SLIP-ARMES-G1B-REMAINDER-S156-1 and its PR (branch phase/armes-g1b-remainder-s156-1 pushed at 02:55Z; no PR at close). A PR -> order the scout land review (it quotes the FILE-FENCE) -> master within 30 minutes of green.
   - AG-2 SLIP-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1 (card v5 on the bus 03:05:32Z; the owner was given the boot text at close). Its PR lands with GUARD-BOOTSTRAP quoted by the scout.
   - SCOUT-STATUS-REVIEW-CARD-ARMES-G2-KNOWLEDGE-AS-DATA-S156-1-v2 (order 02:31:34Z; NO verdict at close). GREEN -> lane-bound card to AG-1; RED with a named delta -> apply and send EXEMPT (as G1b v3 and merge guard v5 did); RED on design -> v3 to the scout.
   - Unconsumed to_lane rows (consumed_at null) are listed and resolved before any new card (F-S156-BOOTSTRAP-MISSED-UNCONSUMED-NOTICE-1).
4. DOC REPO PUSH FIRST: every S156 commit is local (item 86). The first lane window of S157 gets a push notice (same shape as NOTICE-PUSH-DOC-REPO-S155-2).
5. Every card, notice and order: times from date -u in the same command; the ⚡ boot text for the owner goes out in the SAME turn as the bus post (F-S156-ORDER-WITHOUT-BOOT-TEXT-1).

## 2 · OWNER RULES IN FORCE
OWNER-RULING-S153-NO-ARMES-HARDCODE-1 (top rule) · OWNER-RULING-S156-DATA-BACKENDS-1 (backend-specific data lives in data/backends/<id>/, loaded by id; the G4 gate exempts data/backends/) · OWNER-RULING-S156-FAIL-CLOSED-1 (knowledge unreadable -> no data answer, say so; data files are law copy, seed and eval input, never an outage answer source) · NEVER CONTROL HIS MAC SCREEN (standing prohibition, S156 05:35 TSI; only Claude's own browser, on shared topics) · short Turkish replies; every owner action in ONE ⚡ message, verbatim; SENİN AKSİYON MADDELERİN at the end; first line = what moved in the PRODUCT · no functionality removed · A24 by Wednesday 2026-09-23 evening TSI · one plan, one approval · 30 minutes green to master · <= 20 turns.

## 3 · BOOT TEXTS: unchanged from v154 §3 (AG-n, existing tab, AG-2 first boot with --confirm-takeover AG-2:9b56810026d7623e0f6f88142a02f166a106c061, scout).

## 4 · CARD DISCIPLINE (v157 §4 stands) + S156
- Parallel cards carry DISJOINT ORDER 0 file sets; each PR's report carries a FILE-FENCE block (the merge guard enforces it once landed).
- A re-review order to a /clear-ed scout carries the prior defect list (F-S156-CLEARED-SCOUT-CANNOT-READ-OWN-STATUS-1).
- A scout RED that names the complete delta to GREEN is applied and sent EXEMPT with the ack row (12.1 loop case), not re-reviewed.
- Before removing a code copy, name what it PROTECTS (F-S156-G2V1-WOULD-REMOVE-FUNCTIONS-1).

## 5 · IN FLIGHT AT CLOSE
AG-4: G1b v3 (branch pushed, no PR). AG-2: merge guard v5 (boot given at close). Scout: G2 v2 review (no verdict). master 1ca28ede61588ff542764cf3f1375568c94436ae, open PRs 0 at 02:55Z.

## 6 · THE ONE THING
Land G1b and the merge guard, get G2 to AG-1, then G2c (category floor, item 83), G3 + G4 (tests/comments/diagrams + the case-sensitive CI gate with public/ and without data/backends/) — all of item 58 by Wednesday evening TSI; then 40b P1-B, 40c C2, 40d P2-0/P2-1, and item 17 -> item 55 (bus-wake hook).
END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v158
