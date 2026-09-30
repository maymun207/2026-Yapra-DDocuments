
## S160 · HEADER FOR v152 (this version)
cwf-open-items-register-v152 — cut at S160 close, 2026-09-27 (owner turn 20). Supersedes v151. Every v151 line above is carried BYTE-FOR-BYTE (the file was concatenated by script, not retyped); S160 changes are ONLY the sections below. ANCHOR at close: master c58438b59cff4d1d403634b28e44af9b01db6dea (PR 625, Vercel production READY dpl_HFX2angiyhUsXqL31zXr38vm9wyh). Open PRs: 0. Every line not re-measured in S160 stays CARRIED UNVERIFIED.

## S160 · CLOSED / SUPERSEDED (by evidence)
104 CLOSED @ PR 623 merge 9fbb0b9b4de44e192c8f5e4eb69f6d0cad6ad2c4 (06:35:41Z, scout-2 GREEN, Vercel prod READY) AND by the first scheduled Nightly Compatibility on [22.x, 24.x] at that head: SUCCESS 2026-09-27T13:25:47Z.
83 (code half) CLOSED @ PR 625 merge c58438b59cff4d1d403634b28e44af9b01db6dea (17:13:54Z, scout-2 GREEN SCOUT-STATUS-LAND-PR625-S160-1, Vercel prod READY): ALWAYS_INCLUDE deleted, floor passed in as data, superset pack arm from data/backends/index.json packs. The DATA half is row 112. 58-G2c for the routing floor is inside this closure; G3/G4 stay in 58.
82 (superset hand pack) PARTLY: assemble.ts 'superset' literal and superset/pack.ts gone @ PR 625; HAND_PACKED_BACKENDS (DbKnowledgeProvider.ts:358) and the 'machine-knowledge-base' literal (assemble.ts:70) remain → 82 stays OPEN, narrowed.
107 (and 86 merged into it): pushed three times in S160 by AG-1 — remote main 7cab257e4d0f33e1698eaf66c6c287bdf0f69a7c measured at 14:12Z (slip); then 7cab257..a9b0dac push line witnessed 20:05 TSI (remote 40-hex UNMEASURED by ls-remote; F-S160-BRIDGE-CANNOT-SEE-DOC-REPO-REMOTE-1). Row stays OPEN as the standing push practice; close-set commits are ahead at this cut.
PR 624 CLOSED unmerged, SUPERSEDED-BY PR 625 (FENCE-GREW; practice 101).
F-S159-SOTA1-NOT-FIRST-CALL-1 RECURRED (S160) — root cause measured (project instructions §0 vs bootstrap §0); fix in bootstrap v163 §0.

## S160 · CORRECTIONS TO CARRIED ROWS
108 CORRECTED: the two helper scripts live in the CONNECTED folder cwf-architect-ro ($HOME/mnt/cwf-architect-ro/gh.sh, gitw.sh), never in the session-scoped bridge $HOME (absent at S160 open, recreated). gitw.sh takes the REPO ROOT as its first argument ("…/2026 - Yapra - DDocuments"), not a subdirectory (F-S160-GITW-NEEDS-REPO-ROOT-1); commits pass `-c user.name="Claude Architect" -c user.email="architect@cwf.local"`. gh.sh reads cwf_yaprak only; it cannot see the doc-repo remote; it cannot download job logs (proxy 403 → scout, 12.9).
67 gains the measured mechanism: scripts/mail-wait.mjs --read stamps nothing; only --take stamps consumed_at (F-S160-CONSUMED-AT-NOT-SET-WITHOUT-TAKE-1, AG-1). "Unconsumed" is not "unread".
66 gains: lanes report PREFLIGHT-UNMEASURED (tsx IPC listen EPERM) as a third value — correct; the fix stays node --import tsx for every entry.
84 gains: with PR 625, the floor on a store outage is 'unread' = [] with no code fallback (F-S160-FLOOR-EMPTY-ON-OUTAGE-BY-DESIGN-1, scout-2 N1) — the backend-down live test must now also read entryFloorSource in the stage-07 span.
91 unchanged: NOT started in S160 (turn budget went to the R6(g) landing). S161 first hour: ⚡ operator text (OPERATOR-PROMPT-S158-ITEM91-ALTER-ROLE-1 re-issued as S161) + AG-4 ORDER 3; then 87.
106 unchanged: not cut; S161 small card → scout → AG.
103 (A25 build): R6(g) NOW card LANDED (PR 625). E1 cards NOT drafted in S160. Next: E1 (K11 sets, K-A fixture, K-G instrument, three-provider baseline with per-firing spend approval, K25 bar) — each a NEW subject → scout first (12.1).

## S160 · NEW ROWS
| # | Work | Türkçe özet | State now | Next · when |
|---|---|---|---|---|
| 112 | ORDER 0 of CARD-ALWAYS-INCLUDE-TO-DATA-S160-1-v2 — the DATA half of R6(g): the owner publishes domain_rules row kind armes.tool_graph_node, key getFactoryList, payload {tool getFactoryList, role 'resolver', floor true} in the Rules UI through the eval gate, Architect watching (OWNER-RULING-S158 governed settings; never the operator). Until published the data floor carries getFactoryLines only (published 'entry' row) and getFactoryList is offered only by its 'factory' category. | Floor satırı Rules UI'dan | CLOSED@domain_rules ff915392-43a6-45e5-929d-3f7810224769 published v1 2026-09-27T18:09:29Z, gate passed (SCHEMA · REFERENTIAL · BEHAVIORAL); Tool Matching tab shows armes entry floor = getFactoryLines, getFactoryList (OWNER-WITNESS-S160-ORDER0-1) | — ; the 7-day replay FALSIFIER of card v2 (offered set equals master's except the one named class, now closed) is UNMEASURED (AG-4: no service client) → E1 replay ground |
| 113 | Lane sandbox allowances, one card, one subject: (a) pooler DNS refused for laneSlip/heartbeat (getaddrinfo ENOTFOUND, F-S160-LANE-SANDBOX-DNS-BLOCKS-BUS-WRITE-1, twice) · (b) local tracking-ref write refused after a successful push (cannot lock refs/remotes/origin/main) · (c) tsx IPC listen EPERM (66) · (d) scout gh runs unsandboxed because Seatbelt blocks TLS verify, x509 -26276 (F-S160-SCOUT-GH-UNSANDBOXED-1). Measured cost: Architect repaired the tracking ref from the bridge twice; every lane slip that mattered arrived by owner relay. | Şerit sandbox izinleri | open; AG-1 refused to route around (correct) | card S161 → scout (new subject) → AG-4 |
| 114 | Small card after PR 625: (a) filterToolsByMessage `entryFloor?` optional → required or fail-closed with a trace field (F-S160-ENTRY-FLOOR-OPTIONAL-PARAM-1, scout-2 N2); (b) e2e locator /araç adı\|toolName/ also matches CensusTab.tsx:209 (F-S160-E2E-LOCATOR-AMBIGUOUS-CENSUSTAB-1, N3) → an exact, unique locator; (c) Rules UI payload textarea: a pasted value without an input event keeps the stale JSON error (F-S160-RULES-UI-PAYLOAD-TEXTAREA-PASTE-1, cosmetic). | PR 625 sonrası iki küçük düzeltme | open | small card S161; ADVERSARY: repeats PR 625's subject → loop-breaking lift allowed, say so |
| 115 | Two open rulings named by the AG-4 report (F-S160-REPORT-F3-F6-OPEN-RULINGS-1): F3 stage-07 "Liste asla boş kalamaz" is now data-dependent (empty floor is a legal state; the assertion moves to "source is named"); F6 mcp-catalog behaviour under an unreadable rule store. | Rapordaki iki açık hüküm | owner rules | S161 first hour, ⚡ with the two questions and the Architect's single recommendation each |
| 116 | PRACTICE (H): a card that changes a user-visible string names the e2e locators that match the OLD string (git grep -n over e2e/) and puts those files in the FILE-FENCE (F-S160-CARD-MISSED-E2E-LOCATOR-ON-UI-STRING-1; PR 624 lost to it). The scout's card review checks the same grep. | UI metni değişince e2e dosyaları çite | practice | every UI card from S161 |
| 117 | PRACTICE (H): the bus cadence continues while ANY order or notice is outstanding, each wait named with what it waits for and what it last saw (S102-YASA-2); scheduled reads are cancelled only when the outstanding set is empty (F-S160-ARCHITECT-STOPPED-CADENCE-WITH-ORDERS-OUTSTANDING-1). Bus insert SQL is GENERATED from the artefact bytes by script so the md5/sha256 precondition cannot be mistyped (A-REC-S160-1). | Kadans ve insert üretimi | practice | H |
| 118 | Doc-repo push proof: the next push notice orders `git ls-remote origin refs/heads/main` immediately after the push line (before the tracking-ref step can refuse), so the proof is a 40-hex remote sha (F-S160-BRIDGE-CANNOT-SEE-DOC-REPO-REMOTE-1). Close-set commits of S160 are ahead of remote main at this cut. | Push kanıtı 40-hex | open | NOTICE-PUSH-DOC-REPO-S161-1, first lane job of S161 |

## §3 · FINDINGS CARRIED BY NAME (S160; CWF-S160-FINDINGS-v1)
F-S159-SOTA1-NOT-FIRST-CALL-1 (recurrence; → bootstrap v163 §0) · A-REC-S160-1 (→ 117) · F-S160-ARCHITECT-STOPPED-CADENCE-WITH-ORDERS-OUTSTANDING-1 (→ 117) · F-S160-ARCHITECT-READ-UNCONSUMED-AS-NOT-STARTED-1 (→ 67) · F-S160-GITW-NEEDS-REPO-ROOT-1 (→ 108) · F-S160-CARD-MISSED-E2E-LOCATOR-ON-UI-STRING-1 (→ 116) · F-S160-ADVERSARY-GATE-LIFT-ON-V2-1 (recorded, no defect) · F-S160-LANE-SANDBOX-DNS-BLOCKS-BUS-WRITE-1 (→ 113) · F-S160-CONSUMED-AT-NOT-SET-WITHOUT-TAKE-1 (→ 67) · F-S160-PREFLIGHT-UNMEASURED-IN-SANDBOX-1 (→ 66) · F-S160-BRIDGE-CANNOT-SEE-DOC-REPO-REMOTE-1 (→ 118) · F-S160-SCOUT-GH-UNSANDBOXED-1 (→ 113) · F-S160-BACKENDS-INDEX-NAMES-ONE-BACKEND-AS-WRITER-TARGET-1 (→ 103 E2) · F-S160-ENTRY-FLOOR-OPTIONAL-PARAM-1 (→ 114) · F-S160-E2E-LOCATOR-AMBIGUOUS-CENSUSTAB-1 (→ 114) · F-S160-FLOOR-EMPTY-ON-OUTAGE-BY-DESIGN-1 (→ 84, 115) · F-S160-REPORT-F3-F6-OPEN-RULINGS-1 (→ 115) · OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1 · OWNER-APPROVAL-S160-PLAN-1.
All S145–S159 findings: as carried by name above (v151 §3 sections, byte-for-byte).

## §5 · CARRIERS (S160)
CLAUDE-PROJECT-INSTRUCTIONS v5_10 · CWF-S160-SESSION-CLOSE-v1 · CWF-S160-FINDINGS-v1 · CWF-SESSION-GRAPH-KB-v160 · register v152 (this) · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v163 · RULING-S160-UI-UX-AND-HARDCODED-TABLES-1 · CARD-ALWAYS-INCLUDE-TO-DATA-S160-1-v2 (landed) · SCOUT-STATUS-REVIEW-CARD-ALWAYS-INCLUDE-TO-DATA-S160-1-v1 · SCOUT-STATUS-LAND-PR625-S160-1 (bus 3a37f177…) · A25_cwf-capability-fabric-architecture-v1 (design in force) · A24 v1_3 · REGISTER-BUG-BUCKET v57 (STALE, 35) · cwf-sota-definition v1_5.

## §6 · SIDE PANEL ↔ REGISTER (S160)
| Panel # | Panel task (S160) | Register id(s) | State at close |
|---|---|---|---|
| 1 | S160 OPEN (SOTA-1, anchor, bus, doc repo) | — | done (SOTA-1 not first: finding) |
| 2 | R6(g) card ALWAYS_INCLUDE + superset → data | 83, 58, 82 | code half CLOSED@PR 625; data half = 112 |
| 3 | PR 623 landing | 104 | CLOSED@PR 623 + nightly SUCCESS |
| 4 | Doc-repo push | 107 (86) | pushed 3×; ahead again at close → 118 |
| 5 | Item 91 rotation | 91, 87 | NOT started → S161 first hour |
| 6 | Item 106 numeric card | 106 | not cut → S161 |
| 7 | E1 cards | 103 | not drafted → S161 |
| 8 | Owner hard-coded-table question | 58, 82, 103 E2/E5 | answered (RULING-S160-UI-UX-AND-HARDCODED-TABLES-1) |
| 9 | Scheduled workflows read | 93, 104 | Nightly SUCCESS at 9fbb0b9b; budget-fence SUCCESS |
| 10 | S160 CLOSE set | — | done (this set) |
Every v151 §6 row keeps its mapping; ids unchanged.

## §7 · CHAIN CARRY CHECK (S160 cut, over v147, v148, v149, v150, v151 → v152)
v152 = v151 bytes + the S160 sections (concatenated by script; md5 of the v151 prefix printed in the close commit message). Therefore every row id present in v151 is present in v152 by construction. v151 §7 already restored the one lost id (86 → MERGED-INTO 107) over v143–v149; v150 → v151 carried rows byte-for-byte per its header. No id left v152 in S160 without an exit line: exits recorded above are 104 (CLOSED), 83 code half (CLOSED), PR 624 (SUPERSEDED-BY 625). 
END · cwf-open-items-register-v152
