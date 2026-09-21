CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v154
Cut at S152 close (2026-09-21 ~21:15Z, 00:15 TSI 2026-09-22) as a WHOLE new version, LAST of the close set; SUPERSEDES v153. Carriers: register v141, CWF-S152-SESSION-CLOSE-v1, CWF-S152-FINDINGS-v1, CWF-SESSION-GRAPH-KB-v152 (+v151), OWNER-APPROVAL-S152-LANDINGS-1, WAVE-A24-PARALLEL-PLAN-S151-1-v1, RECON-A24-P1C-P2-S151-1-v1, A24 v1_3 (FINAL). Every inherited line not re-measured in S152 is CARRIED UNVERIFIED.
Numbering: the next session is S153 (Claude_Duzenli_Arsiv/S153/).

## 0 · FIRST MESSAGE OF S153 — SOTA-1, WORD FOR WORD (S66-1)
SOTA-1 — KABUL KRİTERİ (S80). v1'in tek kabul kriteri cwf-sota-definition'dır. O dosyadaki bir kritere izlenemeyen her şey v1 kapsamı dışıdır. Architect, bir SOTA kriterini ilerleten hiçbir kalemi "şimdilik gerek yok / az trafik / bu kadarı yeter / sonra / v1.1'e" gerekçesiyle erteleyemez, küçültemez, sırada aşağı çekemez. Elinde kalan tek itiraz sınıfı *"bu sıralama SOTA'yı kanıtlanamaz kılar"*dır ve ancak şunları YAZILI adlandırırsa kabul edilir: (a) hangi kriter kanıtsız kalır, (b) hangi tarihte kanıtlanabilir olur, (c) hangi ölçüm çözer. Üçü eksik her erteleme önerisi bir SOTA-1 ihlalidir: sahip adıyla iptal eder, Architect ya aynı mesajda (a)+(b)+(c)'yi verir ya öneriyi geri çeker — üçüncü yol yoktur. Bir kriter YALNIZ kanıtla emekli olur; kolaylık, maliyet veya kapsam baskısıyla asla.

## 1 · OPEN SEQUENCE (in this order, no step skipped)
1. SIDE-PANEL TASK LIST FIRST: one TaskCreate per register v141 §2 open row or named group, owner rows, frozen row, one CLOSED reference row.
2. LANDING QUEUE BEFORE ANY CARD (cure for A-ERR-S152-PROCESS-OVER-PRODUCT): read relay_inbox from_lane rows where created_at > 2026-09-21T20:54:09Z. Expect SCOUT-STATUS-LAND-PR590-S151-1 (scout-1), SCOUT-STATUS-LAND-PR591-S152-1 (scout-1, queued), AG-4's slip for CARD-DIGEST-SPAN-CAP-S152-1-v2, and NOTICE-PUSH-DOC-REPO-S152-1's slip. For every green PR without an adversary status, the scout is ordered FIRST. #590 and #591 land under OWNER-APPROVAL-S152-LANDINGS-1 without asking the owner.
3. Capabilities, said in the first turn: bridge `ls $HOME/mnt/` (expect "2026 - Yapra - DDocuments" and "cwf_yaprak"); Supabase MCP; Vercel MCP; bridge has NO GitHub credential (ls-remote fails; GitHub reads are the scouts'); esbuild on the bridge (`mkdir -p $HOME/esb && cd $HOME/esb && npm pack @esbuild/linux-arm64@0.27.0 && tar xzf esbuild-linux-arm64-0.27.0.tgz`); graft CLI absent on the bridge → read graft/*.md and graft/.graph/wiring.json.
4. Vercel MCP list_deployments target=production: is #590 live? (last READY at S152 close: 20c1651c3fb59b48490670ffefed02099d684ed9, #588; later master deployments CANCELED.)
5. Doc repo: origin/main tracking ref is set by the Architect from each lane push's ls-remote (item 37); S152 commits are local until NOTICE-PUSH-DOC-REPO-S152-1's slip.

## 2 · OWNER RULES IN FORCE (memory + this file; never re-litigate)
- Replies SHORT, plain, TURKISH (strategy); technical artefacts English. Every owner action in ONE ⚡ message, numbered, paste-ready. End with SENİN AKSİYON MADDELERİN.
- Every report opens with what moved in the PRODUCT (mechanical rule ③); if nothing: ÜRÜNDE HİÇBİR ŞEY KIPIRDAMADI.
- OWNER-APPROVAL-S152-LANDINGS-1: #590, #591, P1-B, DIGEST-SPAN-CAP, BUS-WAKE-HOOK, item 46, P1-C2 land on scout GREEN + CI GREEN with no further question. Anything else, destructive/replacing acts, new spend classes → separate named yes.
- OWNER-RULING-S152-BUS-WAKE-HOOK-1: pollers banned; a background shell wait with zero model turns is permitted; ≤ 3 wakes per window.
- Lane and scout windows are CLAUDE CODE TABS IN ANTIGRAVITY (cwf_yaprak workspace) — Claude Code 2.1.128 there. Never "terminal".
- GRAFT FIRST for the Architect, subagents, lanes and scouts; every slip/status carries a GRAFT line.
- ONLY THE GEMINI OPERATOR writes CWF tables. The Architect inserts only relay_inbox bus rows.
- No functionality removed; all of A24 implemented by Wednesday 2026-09-23 evening TSI.
- 2 scouts + 3 workers (AG-4 executor/grounding, AG-1 routing, AG-2 retrieval+learning).
- One plan, one approval; 30 minutes from green to master or the one measured reason; ≤ 20 turns per session.
- When the owner is waiting on code, ship code: no process card is cut while a green PR waits for review.

## 3 · BOOT TEXTS (fill the name; the owner pastes into a NEW Claude Code tab in AntiGravity)
AG-n: `Sen AG-n'sin. CLAUDE.md'yi uygula, ANCAK poll/cron görevi KURMA. Kartın: CARD-NAME (bus <created_at>). relay_inbox'tan yalnız onu oku ve yap; kendi worktree'nde çalış. Kod bağlamını önce graft ile al ve slip'ine GRAFT satırını yaz. GitHub token'ını git credential fill ile kendin al; hiçbir ortam değişkeninin değerini basma. factory_state yazımında FW001 alırsan scripts/factoryState.mjs reclaim(self) ile adresini geri al ve slip'ine yaz. Slip'ini bus'a yaz ve dur.`
Existing AG tab, next card: `Kartını oku: CARD-NAME (bus <created_at>). relay_inbox'tan yalnız onu al ve yap; graft ile başla, slip'ine GRAFT satırını yaz; slip'i bus'a yaz ve dur.`
AG-2 first boot adds: `Adres: AG-2'yi devral. Sahip tanıklığı: OWNER-WITNESS-S151-AG1-AG2-CLOSED-1. Komut: npm run lane:boot -- AG-2 --confirm-takeover AG-2:9b56810026d7623e0f6f88142a02f166a106c061 — boot'un bastığı held sha farklıysa DUR ve iki değeri slip'e yaz.`
Scout: `Sen scout'sun. CLAUDE.md'yi uygula, ANCAK poll/cron görevi KURMA. Bekleme döngüsü yok. Emrin: ORDER-NAME (bus <created_at>). relay_inbox'tan yalnız onu oku ve yap. Kod bağlamını önce graft ile al ve durumuna GRAFT satırını yaz. GitHub token'ını git credential fill ile kendin al; hiçbir ortam değişkeninin değerini basma. Durumunu bus'a yaz ve dur.`
Keep the "Sen AG-n'sin … Kartın:" and "Sen scout'sun … Emrin:" shapes EXACT: the bus-wake hook (item 55) reads identity from them.

## 4 · CARD DISCIPLINE (measured S150–S152)
- Every card: SHARED SURFACES pre-pays diagrams, stagesRegistry.ts description text, manifest via reseal; "merge origin/master, then reseal".
- NEW subject → scout first. EXEMPT only for a version that applies exactly the scout's named delta (ack = the scout's RED row id).
- Before cutting a card that wires a consumer, RUN the consumer (A-ERR-S152-HOOK-V1-UNRUN-WAITER) and measure the RUNTIME the lanes use (2.1.128 in AntiGravity), not the Architect's.
- The repo card gate on bridge: `ESBUILD_BINARY_PATH=$HOME/esb/package/bin/esbuild npx tsx scripts/cardPreflight.ts --check <file>`; notices refuse only on CP-1 (expected). CP-7 refuses any line naming the retired receipt column — write "the retired delivery-receipt stamp".
- INSERT with md5 AND sha256 WHERE, plus relay_adversary_gate_check('to_lane', <lane>, body) is null for cards.
- device_commit_files: always a NEW temp name, then mv, then md5/sha256 (item 49 recurred twice in S152).
- Bridge doc-repo commits: `git -c user.name="Claude Architect" -c user.email="noreply@anthropic.com" commit`; afterwards move HEAD.lock, index.lock, objects/maintenance.lock and tmp_obj_* into .git/stale-locks/; status with --no-optional-locks.

## 5 · IN FLIGHT AT CLOSE
1. #590 P1-A: head 1bdcc0ab6bd43ddb22e4425db2d0352867f015c8; scout-1 on ORDER-SCOUT-LAND-PR590-S151-1-v1 since 23:44 TSI, no status at close. Green + status → auto-merge → Vercel READY → ⚡ owner flips grounding.numericMode=stamp → owner re-asks Q3.
2. #591 P1-C1: head 50a3aa2a02e22a57c042f0c4838bdc9c57ee1773, CI success; ORDER-SCOUT-LAND-PR591-S152-1-v1 (bus 2026-09-21T20:48:01Z) queued for scout-1 — the owner must say "sıradaki emrini oku" in scout-1's tab after #590 (its boot said "only that order").
3. AG-4 on CARD-DIGEST-SPAN-CAP-S152-1-v2 (bus 2026-09-21T20:58:20Z); P1-B v2 waits for #590; NOTICE-PUSH-DOC-REPO-S152-1 queued after.
4. Hook (item 55): v3 RED by scout-2; five MUST-CHANGE as exact edits, relayed by the owner (scout could not post — item 17). S153: cut v4 applying them verbatim, EXEMPT (ack: the relayed verdict, named OWNER-RELAYED-SCOUT-STATUS-S152-HOOK-V3), to AG-4 after the digest card. Fix item 17 first or in the same wave.
5. Item 46 due 2026-09-22: card with ALTER ROLE routed to the Gemini operator → scout.
6. AG-1 idle after #591: cut P1-C2 (K24 routing fields) → scout-2.
7. P2-0/P2-1 cards → scout-2 → AG-2 first boot with takeover.

## 6 · THE ONE THING
S150, S151 and S152 landed nothing on master (unmoved since 2026-09-20 13:03 TSI). S153's first report must say #590 and #591 are on master and live, or name the one measured reason each is not.
END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v154
