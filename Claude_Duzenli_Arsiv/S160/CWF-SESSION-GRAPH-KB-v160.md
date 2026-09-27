<!-- relay-audit: v1 kind=notice -->
CWF-SESSION-GRAPH-KB-v160

Cut at S160 close, 2026-09-27. Edges learned in S160, each session-tagged; v159-2 edges stand unchanged and are not repeated. Form: SUBJECT —relation→ OBJECT [S160, evidence].

- CARD-ALWAYS-INCLUDE-TO-DATA-S160-1-v2 —landed-as→ PR 625 —merged-as→ master c58438b59cff4d1d403634b28e44af9b01db6dea [S160, GitHub API 17:13:54Z; Vercel dpl_HFX2angiyhUsXqL31zXr38vm9wyh READY].
- PR 624 —superseded-by→ PR 625 —cause→ FENCE-GREW on e2e/rule26-admin.spec.ts —cause→ ORDER 5 placeholder string change [S160, AG-4 slip 15:49Z; merge guard].
- UI string change —requires→ e2e locator grep in the FILE-FENCE (practice 116) [S160, F-S160-CARD-MISSED-E2E-LOCATOR-ON-UI-STRING-1].
- entry floor —is-now→ data (published tool_graph_node rows role 'entry' OR floor true) —read-by→ api/cwf/_lib/knowledge/entryFloor.ts —passed-into→ RoutingCoreInput.entryFloor (required) and filterToolsByMessage(entryFloor?) [S160, scout-2 2c/2d].
- entry floor on store outage —equals→ 'unread' = [] (no code fallback) [S160, scout-2 N1; → register 84, 115].
- superset pack —selected-by→ data/backends/index.json packs.superset='provider' —replaces→ assemble.ts case 'superset' + prompt/backends/superset/pack.ts (deleted) [S160, scout-2 2f]; 'machine-knowledge-base' literal —remains→ item 82.
- evalGate RULE 31 / isPhantomTool —read→ PUBLISHED floor only, never the candidate row [S160, scout-2 2e].
- ORDER 0 (getFactoryList floor row) —done-by→ OWNER in Rules UI through the eval gate —never-by→ operator [S160, card v2 ORDER 0; OWNER-RULING-S158 governed settings].
- Nightly Compatibility [22.x, 24.x] —first scheduled run→ SUCCESS at 9fbb0b9b 13:25:47Z [S160, actions/runs by head sha] —closes→ item 104 with nightly evidence.
- merge commit on master —has→ 0 push-triggered runs (norm; b8e5b1d9 and c58438b5 both 0, read twice) [S160]; scheduled runs attach to whatever master head is current at fire time.
- mail-wait --read —stamps→ nothing; --take —stamps→ consumed_at [S160, AG-1 measured]. consumed_at null —does-not-mean→ unread.
- lane sandbox —refuses→ pooler DNS (laneSlip/heartbeat), local tracking-ref lock after push, tsx IPC listen (preflight) [S160, AG-1 ×2, scout-2]; push itself —succeeds→ (proof = pushed head / push line).
- bridge —cannot→ see doc-repo remote (read-only token scoped to cwf_yaprak), fetch, download job logs (proxy 403) —can→ update-ref locally, commit with -c identity, read GitHub API for cwf_yaprak [S160].
- gitw.sh —requires→ repo root argument; helper scripts —live-in→ connected folder cwf-architect-ro, not bridge $HOME [S160, F-S160-GITW-NEEDS-REPO-ROOT-1].
- bus insert —generated-from→ artefact bytes by script (md5 + sha256 WHERE) [S160, A-REC-S160-1 cure; ORDER-SCOUT-LAND-PR625 insert].
- project instructions §0 —contradicts→ bootstrap §0 on the first action [S160, F-S159-SOTA1-NOT-FIRST-CALL-1 recurrence] —resolved-by→ bootstrap v163 §0 (SOTA-1 first).
- scout-2 —measured→ CI by full sha, posted status, read master once, named eval-canary SKIPPED, refused to call preflight a pass [S160, SCOUT-STATUS-LAND-PR625-S160-1].
- owner —contributed→ OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1 and the hard-coded-table question —answered-by→ RULING-S160-UI-UX-AND-HARDCODED-TABLES-1 (six classes → A25 stages) [S160, S112-YASA-1].
- hard-coded tables remaining after PR 625 —are→ MATRIX 6×13 (deriveCategories.ts:63, → E5) · IR enums (irFrame.ts, → E5) · HAND_PACKED_BACKENDS + 'machine-knowledge-base' (→ 82) · index.json backend names as writer/console/exposure/reconcile targets (→ E2) · 146 armes lines non-test (→ E5 + K-G gate) [S160, RULING-S160-UI-UX-AND-HARDCODED-TABLES-1].

END · CWF-SESSION-GRAPH-KB-v160
