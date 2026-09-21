CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v151
Cut at S149 close (2026-09-21 ~11:55Z) as a WHOLE new version; SUPERSEDES v150 (S147). S148 cut no bootstrap. Carriers: register v138, CWF-S148-SESSION-CLOSE-v1 (retro), CWF-S149-SESSION-CLOSE-v1, CWF-S149-FINDINGS-v1, CWF-SESSION-GRAPH-KB-v149, A24 v1_3, A24-REVIEW-VERDICT-S149-1-v1, CWF-S149-Q3Q4-WITNESS-v1. Every inherited line not re-measured in S149 is CARRIED UNVERIFIED.

## 0 · FIRST MESSAGE OF S150 — SOTA-1, WORD FOR WORD (S66-1)
SOTA-1 — KABUL KRİTERİ (S80). v1'in tek kabul kriteri cwf-sota-definition'dır. O dosyadaki bir kritere izlenemeyen her şey v1 kapsamı dışıdır. Architect, bir SOTA kriterini ilerleten hiçbir kalemi "şimdilik gerek yok / az trafik / bu kadarı yeter / sonra / v1.1'e" gerekçesiyle erteleyemez, küçültemez, sırada aşağı çekemez. Elinde kalan tek itiraz sınıfı *"bu sıralama SOTA'yı kanıtlanamaz kılar"*dır ve ancak şunları YAZILI adlandırırsa kabul edilir: (a) hangi kriter kanıtsız kalır, (b) hangi tarihte kanıtlanabilir olur, (c) hangi ölçüm çözer. Üçü eksik her erteleme önerisi bir SOTA-1 ihlalidir: sahip adıyla iptal eder, Architect ya aynı mesajda (a)+(b)+(c)'yi verir ya öneriyi geri çeker — üçüncü yol yoktur. Bir kriter YALNIZ kanıtla emekli olur; kolaylık, maliyet veya kapsam baskısıyla asla.

## 1 · OPEN SEQUENCE (in this order)
1. SIDE-PANEL TASK LIST FIRST (OWNER-RULING-S146-TASK-PANEL-EVERY-SESSION-1): one TaskCreate per register v138 §2 open row (38–44 are new), never a row hidden in another's description.
2. Read the bus (relay_inbox, direction=from_lane, created_at > 2026-09-21T05:49:17Z): expect SLIP-PUSH-DOC-REPO-S149-2. Then `git update-ref refs/remotes/origin/main <ls-remote sha> ab34e705203c7f84bed7202038bddb9b9e5cb826` in the doc repo from the bridge. If the slip is absent: the close set is LOCAL ONLY — say so before anything else.
3. Anchor: scout ls-remote master + Vercel list_deployments target=production → rewrite register §ANCHOR (three readings at S149: 7572c3bb… owner clone, 9cb7fefc… AG-4, 20c1651c… Vercel footer). Do not quote any of the three as "master" until reconciled.
4. Read A24 v1_3 (project box docs/A24_cwf-capability-fabric-architecture-v1_3.html) BEFORE cutting any A24 card. It is the FINAL CANDIDATE; the owner's approval word is item 38.

## 2 · OPERATING MODEL (v150 §2 stands, with S149 corrections)
- Boot text for AG-4 unchanged (v150 §2). Lanes have NO .env access (GS-2) and no SUPABASE_URL/SECRET: never order a lane to run publishAgentParam or any --env-file script until the owner rules item 42. Governed params are flipped in the admin UI (Kurallar/Rules → System (agent params) → Edit → Save draft → Publish (run gate)); the Architect can do it through the browser pane on the owner's word.
- CARD GATE FROM THE BRIDGE: `mkdir -p $HOME/esb && cd $HOME/esb && npm pack @esbuild/linux-arm64@0.27.0 && tar xzf esbuild-linux-arm64-0.27.0.tgz`, then in the owner clone `ESBUILD_BINARY_PATH=$HOME/esb/package/bin/esbuild npx tsx scripts/cardPreflight.ts --check <file>`. kind=notice passes with only CP-1 refused.
- ⚠ CORRECTION to v150: a kind=notice body carries a `## STEPS` heading, NOT `## ORDERS` — relay_adversary_gate refuses ORDERS (AG007). Insert with md5 AND sha256 WHERE.
- Doc repo: Architect commits from the bridge (delete grant once per session for lock files); AG-4 pushes on a NOTICE; Architect sets the tracking ref afterwards. Owner's standing rule: every document to project box AND archive S<n>/ AND repo in the turn it is written.
- Sessions ≤ 20 turns; Architect timer 3 min to read the bus; no lane pollers.

## 3 · IN FLIGHT AT CLOSE
1. NOTICE-PUSH-DOC-REPO-S149-2 on the bus for AG-4 (this close set + v1_2 + v1_3 + owner's yapra-mimari-documents copies). Owner boots AG-4.
2. Web valve OPEN (web.enabled v2=1). Q4 has not been re-asked with the valve open (M-f).
3. Item 15 v2 RED; v3 not cut. Item 20 state UNMEASURED since S148.

## 4 · THEN, IN ORDER
38 (owner: "v1_3 onay") → 39 P0 measurements (M-a..M-f; M2, M3′ via credentialed lane) → 40 P1 card (executor v0 + numeric guard + exam skeleton + K17 + trace schema; NEW subject → scout) → 15 v3 → 20 reconcile → 5 (with K15 analyzer) → 21 → 28 → small cards 31 30 32 33 35 16 18 19 23 → 13 → 8 9 10 → 6 (superseded by A24 K9/K25). Owner: 14, 24, 42. Frozen: 2 3 4 27.

## 5 · THE ONE THING
First line of every report: what moved in the PRODUCT. S149 moved one production parameter (web valve open) and produced the final-candidate architecture; it landed no code. S150 must land code: the P1 executor + numeric guard is the first card, because Q3/Q4 showed numbers no tool computed reaching the owner's eye.
END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v151
