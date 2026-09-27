SOTA-1 — KABUL KRİTERİ (S80). v1'in tek kabul kriteri cwf-sota-definition'dır. O dosyadaki bir kritere izlenemeyen her şey v1 kapsamı dışıdır. Architect, bir SOTA kriterini ilerleten hiçbir kalemi "şimdilik gerek yok / az trafik / bu kadarı yeter / sonra / v1.1'e" gerekçesiyle erteleyemez, küçültemez, sırada aşağı çekemez. Elinde kalan tek itiraz sınıfı *"bu sıralama SOTA'yı kanıtlanamaz kılar"*dır ve ancak şunları YAZILI adlandırırsa kabul edilir: (a) hangi kriter kanıtsız kalır, (b) hangi tarihte kanıtlanabilir olur, (c) hangi ölçüm çözer. Üçü eksik her erteleme önerisi bir SOTA-1 ihlalidir: sahip adıyla iptal eder, Architect ya aynı mesajda (a)+(b)+(c)'yi verir ya öneriyi geri çeker — üçüncü yol yoktur. Bir kriter YALNIZ kanıtla emekli olur; kolaylık, maliyet veya kapsam baskısıyla asla.

CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v162
Cut at S159 FINAL close (2026-09-27, after the owner's 05:00 TSI message) as a WHOLE new version, LAST of the close set; SUPERSEDES v161 (which was cut before PR 622 landed and before A25 existed). Carriers: register v151, CWF-S159-SESSION-CLOSE-v2, CWF-S159-FINDINGS-v2, CWF-SESSION-GRAPH-KB-v159-2, A25_cwf-capability-fabric-architecture-v1 (owner-adopted design), A25-POINTER-AND-S159-CLOSE-ADDENDUM-v1, CWF-ASTRA-REVIEW-EVALUATION-S159-1, SCOUT-STATUS-REVIEW-ROUTING-ARCHITECTURE-v2-S159-2 (full). Every inherited line not re-measured in S159 is CARRIED UNVERIFIED.
Numbering: the next session is S160 (Claude_Duzenli_Arsiv/S160/).

## 0 · THE FIRST TOOL CALL OF S160 IS SendUserMessage WITH THE SOTA-1 PARAGRAPH, VERBATIM
Copy it from project instructions section 1 (in context before any tool call). Do NOT read any file first — not preferences, not this bootstrap, not device info (F-S159-SOTA1-NOT-FIRST-CALL-1; recurring).

## 1 · OPEN SEQUENCE
1. TASK LIST = register v151, built from its §6 (side panel ↔ register map) — every row there becomes a panel row; nothing is re-derived from memory. Then run §2 below as its own panel rows.
2. ANCHOR: master from the Vercel production deployment list (latest READY production: sha + merge message), then GitHub API via ~/gh.sh. Expected: b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f (PR 622). Open PRs expected: 623 only.
3. CAPABILITIES: ls $HOME/mnt/ must show "2026 - Yapra - DDocuments", "cwf_yaprak", "cwf-architect-ro". ~/gh.sh and ~/gitw.sh on the bridge (register 108). Doc-repo path spelled exactly ".../2026 - YAPRA/2026 - Yapra - DDocuments".
4. BUS FIRST: all from_lane rows after 2026-09-27T00:33:47Z, by name. The to_lane row ORDER-SCOUT-REVIEW-ROUTING-ARCHITECTURE-v2-S159-3-v1 (cb574247-…) is SUPERSEDED-BY A25 — never boot a scout onto it.
5. DOC REPO: measure `git rev-list --count origin/main..HEAD`; the first AG window of S160 gets NOTICE-PUSH-DOC-REPO-S160-1 (push only, no rebase) (register 107, which now also carries 86).
6. SCHEDULED WORKFLOWS: last conclusion of each on master; Nightly Compatibility stays RED on master until PR 623 lands.
7. Count owner turns in every reply footer from turn 15; cut the close set at 20 (register 111).

## 2 · THE ONE THING — BUILD A25 (OWNER-RULING-S159-A25-ADOPT-1)
The owner read A25 v1 and ruled "a25 i okudum, bunu hayata gecirelim" (2026-09-27 05:00 TSI). Register v151 row 103 records the reading: A25 adopted INCLUDING its recommended options R6(a) EVET · (b) B (existing keywords = hints + ladder floor; obligations only the owner's published (condition, TOOL) rows) · (c) company layer wins, "Kaleseramik → KS fabrika" alias ARCHIVED · (d) E1 three-provider baseline approved in principle, but EVERY firing still needs a NAMED spend approval (S102) · (e) frame = observation only · (f) K1 on every provider, Anthropic switch gated by E1 billed cost · (g) ALWAYS_INCLUDE card NOW. S160's FIRST owner-facing message restates this reading in ONE line so the owner can correct it; silence is not a ruling on (d) spend.
Build order (A25 §7/§9; every card = a NEW subject → scout adversary review first, 12.1; each lands within 30 min of green, 12.8):
- NOW · CARD R6(g): ALWAYS_INCLUDE (toolCategories.ts:1203–1205) + assemble.ts:55 'superset' → data (tool_graph_node role=entry + backends.pattern). Closes the fence breach (register 83/58).
- E1 · evaluation ground: K11 three disjoint sets from held-out real turns + acceptable-set labels; T1–T4 as REGRESSION set; K-A fixture (a repo MCP server serving tools/list from JSON — finance, 30 tools) + K-A′ second unseen vocabulary; K-G instrument; three-provider billed baseline (spend approval named per firing); K25 bar DECLARED here. Replay/exam code only. Absorbs 40c, 39, 28 (broader).
- E2 · contract: K33 identity (first red test: T2 honestbench/mount-probe collision) · routing_obligation + ranking_policy kinds · K38 faces · cwf.trace.v1 BUILT → v2 + label record (K35) · router.maxTools / maxSchemaTokens / maxFanout created (with 40e) · knob split router.matrixReplace ≠ router.frameEnabled ≠ keyword-on-semantic (K41) · decideGoldenPublish generalised (K34, with 96) · tool_experience → view · fixed user texts → prompt.segment (K40).
- E3 shadow · E4 discovery–plan–execute (router-call split K39, company layer, st07p = new mode of turn/planner.ts, executor v0) · E5 learning + removal (MATRIX, IR filter enums, alias enum; hand category rows archived). Not before E1/E2 exits.
Nothing on the live routing PATH changes before its E-stage exit (S102-YASA-3).

## 3 · IN PARALLEL (no ruling needed, already approved or small)
- PR 623 (register 104): NOTICE-PR623-MASTER-MERGE-S160-1 to AG-1 (merge origin/master, no rebase) → CI by full sha → ORDER-SCOUT-LAND-PR623-S160-1 → master.
- Item 91 (cwf_lane password rotation): AFTER 623 lands — ⚡ operator text (OPERATOR-PROMPT-S158-ITEM91-ALTER-ROLE-1 re-issued as S160) + AG-4 ORDER 3; then 87.
- Item 106 (numeric space-group + "milyon/bin" multipliers): small card → scout → AG.
- Every other v151 row keeps its state and "Next" as written; none is dropped.

## 4 · OWNER RULES IN FORCE
OWNER-RULING-S153-NO-ARMES-HARDCODE-1 (top rule) · OWNER-RULING-S156-DATA-BACKENDS-1 · OWNER-RULING-S156-FAIL-CLOSED-1 · OWNER-RULING-S157-G2-OUTAGE-EDGES-1 · OWNER-RULING-S159-NIGHTLY-FLOOR-22-1 · OWNER-DESIGN-S159-1 · OWNER-RULING-S159-A25-ADOPT-1 · governed settings changed in the admin UI WITH the owner, never by the Gemini operator · Gemini operator is the only writer to CWF tables (the Architect inserts relay_inbox bus rows only) · NEVER CONTROL HIS MAC SCREEN · never print env values · short Turkish replies, plain language for every defect; first line = what moved in the PRODUCT; every owner action in ONE ⚡ message with paste-ready text; SENİN AKSİYON MADDELERİN · no functionality removed · one path, never a menu · 30 minutes green → master or one measured reason · every problem with its fix and its date · ≤20 turns · no card or lane order without a named approval · no pollers.

## 5 · DISCIPLINE ADDED IN S159
- A design document quotes the rules it rests on MECHANICALLY (by line, byte-verified); a summary is not a quote (register 110; A-REC-S159-2/3).
- A scout order that may produce > 8000 chars names its doc-repo path S160/<ARTIFACT>.md; the Architect commits it the same turn (register 109). Check the reply's "answering <order>" line: a window may re-deliver an older order.
- Fixtures carry no tenant words (check:tenant-zero); a card names the redaction rule.
- Before filing a CI-shape defect, grep workflow headers for a ruling (S141 github.token ruling in auto-merge.yml).
- A zero from actions/runs is read twice; a branch workflow_dispatch is not a master push.
- At every close: the chain carry check over the last five registers is run and pasted into the new register (register v151 §7; it found row 86).
- Every document to the project box AND the doc repo in the same turn; a lane pushes the doc repo.

## 6 · STATE AT CLOSE
master b8e5b1d95b76b92b0c20383ebd7a1d0bf9c7da6f (Vercel prod READY). Open PR 623 (head ba74a7d6f8c4e914c3a2e6d124495338e2a75a65). AG-1, AG-2, AG-4 idle; scout-1, scout-2 idle. No routing code touched in S159.
END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v162
