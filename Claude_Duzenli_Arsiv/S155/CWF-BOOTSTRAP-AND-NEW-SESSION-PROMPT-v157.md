SOTA-1 — KABUL KRİTERİ (S80). v1'in tek kabul kriteri cwf-sota-definition'dır. O dosyadaki bir kritere izlenemeyen her şey v1 kapsamı dışıdır. Architect, bir SOTA kriterini ilerleten hiçbir kalemi "şimdilik gerek yok / az trafik / bu kadarı yeter / sonra / v1.1'e" gerekçesiyle erteleyemez, küçültemez, sırada aşağı çekemez. Elinde kalan tek itiraz sınıfı *"bu sıralama SOTA'yı kanıtlanamaz kılar"*dır ve ancak şunları YAZILI adlandırırsa kabul edilir: (a) hangi kriter kanıtsız kalır, (b) hangi tarihte kanıtlanabilir olur, (c) hangi ölçüm çözer. Üçü eksik her erteleme önerisi bir SOTA-1 ihlalidir: sahip adıyla iptal eder, Architect ya aynı mesajda (a)+(b)+(c)'yi verir ya öneriyi geri çeker — üçüncü yol yoktur. Bir kriter YALNIZ kanıtla emekli olur; kolaylık, maliyet veya kapsam baskısıyla asla.

CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v157
Cut at S155 close (2026-09-22T17:49Z, 20:49 TSI) as a WHOLE new version, LAST of the close set; SUPERSEDES v156. Carriers: register v146, CWF-S155-SESSION-CLOSE-v1, CWF-S155-FINDINGS-v1, CWF-SESSION-GRAPH-KB-v155, cwf-open-items-register-v145 (the owner's full-list copy). Every inherited line not re-measured in S155 is CARRIED UNVERIFIED.
Numbering: the next session is S156 (Claude_Duzenli_Arsiv/S156/).

## 0 · THE FIRST TEXT OF S156 IS THE SOTA-1 PARAGRAPH AT THE TOP OF THIS FILE
It is the first paragraph here so it can be copied before any tool call. S153, S154 and S155 all broke this by writing a sentence first; copying line 1 of this file cures it mechanically.

## 1 · OPEN SEQUENCE (in this order)
1. TASK LIST = register v146 §A-§H IN FULL, one panel row per item or named group. A delta register is never the panel's source (F-S155-OPEN-LIST-TOOK-DELTA-REGISTER-ONLY-1).
2. CAPABILITIES, measured and said in the first turn: `ls $HOME/mnt/` must show "2026 - Yapra - DDocuments", "cwf_yaprak", "cwf-architect-ro"; request what is missing (cwf-architect-ro is ~/cwf-architect-ro; cwf_yaprak lives under "2026 - Yapra -  Codes" with TWO spaces). Recreate ~/gh.sh from the token file (never printed). CARD GATE on the bridge, and it is the ONLY accepted form: `mkdir -p ~/cpw/tree && git archive origin/master scripts shared | tar -x -C ~/cpw/tree && ln -s "$HOME/mnt/cwf_yaprak/node_modules" ~/cpw/tree/node_modules` then `cd ~/cpw/tree && ESBUILD_BINARY_PATH=$HOME/esb/package/bin/esbuild node --import tsx scripts/cardPreflight.ts --check <file>`; esbuild is fetched per session (`mkdir -p $HOME/esb && cd $HOME/esb && npm pack @esbuild/linux-arm64@0.27.0 && tar xzf esbuild-linux-arm64-0.27.0.tgz`). NEVER an esbuild bundle of cardPreflight and never a symlinked invocation (F-S155-BRIDGE-CP-BUNDLE-RAN-RELAYAUDIT-1, F-S155-CP-SYMLINK-SILENT-GREEN-1). Prove the gate with a planted fault once per session. Bridge git commits: always -c gc.auto=0 -c maintenance.auto=false, then move .git locks into .git/stale-locks/.
3. EVERY card, notice and order body is written in the SAME shell command that runs `date -u`, and its times come from that output (item 80).
4. LANES NEED A FRESH BOOT: every window was closed for the rotation and the IDE was relaunched. Nothing is in flight; the bus is quiet since 17:25:50Z.
5. Read the bus at EVERY owner turn, not only when asked.

## 2 · OWNER RULES IN FORCE (unchanged from v156 section 2)
OWNER-RULING-S153-NO-ARMES-HARDCODE-1 is the top rule. Short Turkish replies; every owner action in ONE ⚡ message, verbatim and paste-ready; SENİN AKSİYON MADDELERİN at the end; first line = what moved in the PRODUCT. No functionality removed; A24 by Wednesday 2026-09-23 evening TSI. One plan, one approval. 30 minutes green to master. <= 20 turns.

## 3 · BOOT TEXTS: unchanged from v154 section 3. Add for a scout that must post a status: if the auto-mode classifier denies the POST, say so in one line and stop; the owner takes the window out of auto mode and approves (F-S155-SCOUT-STATUS-POST-CLASSIFIER-DENIED-1, item 17).

## 4 · CARD DISCIPLINE (v156 section 4 stands) + S155
- A card to AG-n is refused by the DB gate without an `evidence:adversary` block: GREEN verdict row id, or EXEMPT with ack to a scout row or a kind=ruling row.
- A notice always refuses CP-1 in the repository gate (kind=notice). That is expected; do not predict another class in the GATE-NOTE.
- Landing evidence is the PR HEAD's runs plus Vercel; the merge sha has no Actions run (F-S155-MASTER-PUSH-HAS-NO-CI-RUN-1).

## 5 · IN FLIGHT AT CLOSE
NOTHING. No open PR, no unread card, no lane running. The next cards are S156's to cut.

## 6 · THE ONE THING
S155 landed PR 594 and PR 595 and closed items 30, 46 and 65. S156 opens on item 58's remainder: G2 (knowledge to governed data), G3 (tests and fixtures), G4 (the case-sensitive CI grep gate including public/), all three by Wednesday evening TSI, then 40b P1-B, 40c C2 and 40d P2-0/P2-1.
END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v157
