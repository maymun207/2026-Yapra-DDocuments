CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v153
Cut at S151 close (2026-09-21 ~20:05Z, 23:05 TSI) as a WHOLE new version, LAST of the close set; SUPERSEDES v152. Carriers: register v140, CWF-S151-SESSION-CLOSE-v1, CWF-S151-FINDINGS-v1, CWF-SESSION-GRAPH-KB-v151 (+v150, v149, v147), WAVE-A24-PARALLEL-PLAN-S151-1-v1, RECON-A24-P1C-P2-S151-1-v1, A24 v1_3 (FINAL). Every inherited line not re-measured in S151 is CARRIED UNVERIFIED.
Numbering: the next session is S152 (Claude_Duzenli_Arsiv/S152/).

## 0 · FIRST MESSAGE OF S152 — SOTA-1, WORD FOR WORD (S66-1)
SOTA-1 — KABUL KRİTERİ (S80). v1'in tek kabul kriteri cwf-sota-definition'dır. O dosyadaki bir kritere izlenemeyen her şey v1 kapsamı dışıdır. Architect, bir SOTA kriterini ilerleten hiçbir kalemi "şimdilik gerek yok / az trafik / bu kadarı yeter / sonra / v1.1'e" gerekçesiyle erteleyemez, küçültemez, sırada aşağı çekemez. Elinde kalan tek itiraz sınıfı *"bu sıralama SOTA'yı kanıtlanamaz kılar"*dır ve ancak şunları YAZILI adlandırırsa kabul edilir: (a) hangi kriter kanıtsız kalır, (b) hangi tarihte kanıtlanabilir olur, (c) hangi ölçüm çözer. Üçü eksik her erteleme önerisi bir SOTA-1 ihlalidir: sahip adıyla iptal eder, Architect ya aynı mesajda (a)+(b)+(c)'yi verir ya öneriyi geri çeker — üçüncü yol yoktur. Bir kriter YALNIZ kanıtla emekli olur; kolaylık, maliyet veya kapsam baskısıyla asla.

## 1 · OPEN SEQUENCE (in this order, no step skipped — S151 skipped two)
1. SIDE-PANEL TASK LIST FIRST: one TaskCreate per register v140 §2 open row or named group, owner rows, frozen row, one CLOSED reference row.
2. Capabilities, said in the first turn: bridge `ls $HOME/mnt/` (expect "2026 - Yapra - DDocuments" and "cwf_yaprak"); Supabase MCP; bridge has no GitHub credential (GitHub reads are the scouts'); esbuild on the bridge (`mkdir -p $HOME/esb && cd $HOME/esb && npm pack @esbuild/linux-arm64@0.27.0 && tar xzf esbuild-linux-arm64-0.27.0.tgz`); graft CLI absent on the bridge → read graft/*.md and graft/.graph/wiring.json.
3. Bus: relay_inbox where created_at > 2026-09-21T19:53:34Z. Expect SCOUT-STATUS-LAND-PR590-S151-1 (scout-1), AG-1's slip for CARD-A24-P1C1-METRIC-HINTS-S151-1-v2, and any AG-4 row. Doc repo: local commits after c7918aac571233be516667f1d8d62dd0cdd3fb65 are unpushed → NOTICE-PUSH-DOC-REPO-S152-1 to AG-4 in the first turn.
4. Vercel MCP list_deployments target=production: is PR #590 live?

## 2 · OWNER RULES IN FORCE (memory + this file; never re-litigate)
- Replies SHORT and plain. Every owner action in ONE ⚡ message, numbered, paste-ready. End with SENİN AKSİYON MADDELERİN.
- Lane and scout windows are CLAUDE CODE TABS IN ANTIGRAVITY (cwf_yaprak workspace). Never "terminal", never "open from folder".
- GRAFT FIRST for the Architect, its subagents, lanes and scouts; every card/order requires a GRAFT line in the slip; a slip without it goes back.
- ONLY THE GEMINI OPERATOR writes CWF tables in the Supabase DB. The Architect inserts only relay_inbox bus rows.
- No functionality removed; all of A24 implemented by Wednesday 2026-09-23 evening TSI.
- 2 scouts + 3 workers (AG-4 executor/grounding, AG-1 routing, AG-2 retrieval+learning); WAVE-A24-PARALLEL-PLAN-S151-1-v1 M1–M6 bind.
- One plan, one approval; 30 minutes from green to master or the one measured reason; ≤ 20 turns per session.

## 3 · BOOT TEXTS (fill the card name; the owner pastes into a NEW Claude Code tab in AntiGravity)
AG-n: `Sen AG-n'sin. CLAUDE.md'yi uygula, ANCAK poll/cron görevi KURMA. Kartın: CARD-NAME (bus <created_at>). relay_inbox'tan yalnız onu oku ve yap; kendi worktree'nde çalış. Kod bağlamını önce graft ile al ve slip'ine GRAFT satırını yaz. GitHub token'ını git credential fill ile kendin al; hiçbir ortam değişkeninin değerini basma. factory_state yazımında FW001 alırsan scripts/factoryState.mjs reclaim(self) ile adresini geri al ve slip'ine yaz. Slip'ini bus'a yaz ve dur.`
AG-2 first boot adds: `Adres: AG-2'yi devral. Sahip tanıklığı: OWNER-WITNESS-S151-AG1-AG2-CLOSED-1. Komut: npm run lane:boot -- AG-2 --confirm-takeover AG-2:9b56810026d7623e0f6f88142a02f166a106c061 — boot'un bastığı held sha farklıysa DUR ve iki değeri slip'e yaz.`
Scout: `Sen scout'sun. CLAUDE.md'yi uygula, ANCAK poll/cron görevi KURMA. Bekleme döngüsü yok. Emrin: ORDER-NAME (bus <created_at>). relay_inbox'tan yalnız onu oku ve yap. Kod bağlamını önce graft ile al ve durumuna GRAFT satırını yaz. GitHub token'ını git credential fill ile kendin al; hiçbir ortam değişkeninin değerini basma. Durumunu bus'a yaz ve dur.`

## 4 · CARD DISCIPLINE (measured in S150–S151)
- Every card: SHARED SURFACES pre-pays public/architecture/diagrams/*, src/components/admin/stagesRegistry.ts (description text), manifest via npm run reseal, and learnBrake tail pins if a param is added; "merge origin/master, then reseal".
- NEW subject → scout first. EXEMPT only for a v2 that applies exactly the scout's named delta (ack = the scout's RED row).
- INSERT with md5 AND sha256 WHERE, plus relay_adversary_gate_check(...) is null for cards; notices use `## STEPS`, ≤ 8192 chars.
- Bridge doc-repo commits: `git -c user.name="Claude Architect" -c user.email="noreply@anthropic.com" commit`; afterwards move HEAD.lock, index.lock, objects/maintenance.lock and tmp_obj_* into .git/stale-locks/; status with --no-optional-locks; md5 every device copy.

## 5 · IN FLIGHT AT CLOSE
1. PR #590 P1-A: head 1bdcc0ab6bd43ddb22e4425db2d0352867f015c8; scout-1 on ORDER-SCOUT-LAND-PR590-S151-1-v1. Green + status → auto-merge → Vercel READY → ⚡ owner flips grounding.numericMode=stamp in the admin UI → owner re-asks Q3.
2. P1-B v2 in AG-4's box (starts after #590 lands). Then PARAMS card (40e), then item 50.
3. P1-C1 v2 at AG-1 (booted 22:58 TSI). Next AG-1 card: C2 (K24 routing fields).
4. Item 46 due 2026-09-22: cut the card at open with ALTER ROLE routed to the Gemini operator → scout.
5. P2-0/P2-1 cards (RECON-A24-P1C-P2-S151-1-v1) → scout-2 → AG-2 first boot with takeover.
6. Item 48: read turn_trace_digest for the Q4 grounding span.

## 6 · THE ONE THING
S150 and S151 landed nothing on master. S152's first report must say P1-A is on master and live, or name the one measured reason it is not.
END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v153
