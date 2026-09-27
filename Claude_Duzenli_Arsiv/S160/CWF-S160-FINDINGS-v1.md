<!-- relay-audit: v1 kind=notice -->
CWF-S160-FINDINGS-v1

Cut at S160 close, 2026-09-27 (Architect). Every finding names its fix and its date (owner rule 2026-09-10). Findings live here AND by name in register v152 §3 until the owner rules on bucket merging. Attribution follows S112-YASA-1 / 12.14: the owner's, a lane's and a scout's contributions are named.

## A · ARCHITECT (A-REC class)

F-S159-SOTA1-NOT-FIRST-CALL-1 · RECURRENCE IN S160. The first tool calls of S160 read preferences, the bootstrap and device info before the SOTA-1 paragraph went out. Root cause, measured: CLAUDE-PROJECT-INSTRUCTIONS v5_10 §0 says "HER OTURUMUN İLK İŞİ cwf-memory-seed … oku" while bootstrap v162 §0 says "Do NOT read any file first". Two binding texts order opposite first steps; the Architect obeyed the older one. FIX: bootstrap v163 §0 names the contradiction and rules SOTA-1 first (SendUserMessage, no file read) and the seed second; the project-instructions line is flagged for the owner's next v5_11 edit. DATE: v163 cut in this close.

A-REC-S160-1 · TWO BUS INSERTS WITHOUT THE HASH PRECONDITION. NOTICE-PUSH-DOC-REPO-S160-2-CLOSED (row cbd8398d…) and ORDER-SCOUT-MEASURE-PR624-RED-S160-1-v1-WITHDRAWN (row 3760664b…) were inserted without md5 AND sha256 WHERE (§4 side rule). Content was harmless; the rule is mechanical, not moral. FIX: from ORDER-SCOUT-LAND-PR625-S160-1-v1 on, the insert SQL is GENERATED from the file bytes by script (hashes computed, not typed) — done once in S160, becomes practice H. DATE: applied 2026-09-27T17:06Z.

F-S160-ARCHITECT-STOPPED-CADENCE-WITH-ORDERS-OUTSTANDING-1. The 3-minute bus cadence was stopped at 05:47Z while two scout orders were outstanding; scout-1 (RED on card v1) and scout-2 (GREEN landing 623) replied at 06:33Z and were read only when the owner wrote. FIX: the cadence continues while ANY order or notice is outstanding, with the wait named (S102-YASA-2); applied from 14:00Z, every outstanding order had a scheduled read. DATE: 2026-09-27.

F-S160-ARCHITECT-READ-UNCONSUMED-AS-NOT-STARTED-1. Twice (16:21Z, 16:35Z) the Architect read a bus row's null consumed_at as "the lane has not read it" and told the owner nothing had started. AG-1 measured the mechanism (12.14): scripts/mail-wait.mjs --read without --take never stamps consumed_at; the lane HAD read and was working. See F-S160-CONSUMED-AT-NOT-SET-WITHOUT-TAKE-1. FIX: consumed_at is not a liveness lens; liveness is read from OUTPUT only (pushed branch, PR) — §4 S122 rule re-applied to the bus. DATE: 2026-09-27.

F-S160-GITW-NEEDS-REPO-ROOT-1 (register 108 correction). gitw.sh moves .git/*.lock aside relative to its first argument; called with a SUBDIRECTORY of the doc repo (Claude_Duzenli_Arsiv) the glob misses the repo's .git and a stale index.lock blocks the commit. Also: both helper scripts must live in the CONNECTED folder cwf-architect-ro, not the session-scoped bridge $HOME (they were absent at S160 open and recreated). FIX: register 108 text corrected in v152; usage `gitw.sh "<repo root>" …`; the commit identity is passed with -c user.name/-c user.email (the bridge has no git identity). DATE: this close.

F-S160-CARD-MISSED-E2E-LOCATOR-ON-UI-STRING-1. CARD-ALWAYS-INCLUDE-TO-DATA-S160-1-v2 ORDER 5 changed the GovernanceTab placeholder ('getFactoryLines' → 'araç adı'); e2e/rule26-admin.spec.ts located the field by that string, so the file joined the diff AFTER the first commit; the merge guard held PR 624 at FENCE-GREW and one landing was lost (fresh branch → PR 625, practice 101). Neither the Architect nor scout-1's ten-defect review grepped e2e/ for the strings the card changed. FIX (practice, register row 116): every card that changes a user-visible string names the e2e locators that match it (git grep over e2e/ for the old string) and puts those files in the fence. DATE: this close; first applied at the next UI card.

F-S160-ADVERSARY-GATE-LIFT-ON-V2-1 (self-check, 12.1). Card v2 went to AG-4 under the loop-breaking exemption with scout-1's RED as the ack. That is the narrow case 12.1 allows (same subject, superseded card). Recorded so the lift is visible; no defect.

## B · FACTORY (lanes, sandbox, bus)

F-S160-LANE-SANDBOX-DNS-BLOCKS-BUS-WRITE-1 (AG-1, twice). The lane sandbox refused (a) DNS for the Supabase pooler (getaddrinfo ENOTFOUND aws-0-eu-west-1.pooler.supabase.com) so laneSlip could not write, and (b) the local tracking-ref write after a successful push (cannot lock ref 'refs/remotes/origin/main' … Operation not permitted). The push itself went through both times. AG-1 correctly refused to retry outside the sandbox. FIX: the notice text carries the trap by name (done in NOTICE-PUSH-DOC-REPO-S160-3); the Architect repairs the tracking ref from the bridge with update-ref (done twice); permanent fix = register row 113 (sandbox allowances card: pooler DNS, ref lock, tsx IPC — one card, one subject). DATE: card in S161.

F-S160-CONSUMED-AT-NOT-SET-WITHOUT-TAKE-1 (AG-1 measured). mail-wait --read stamps nothing; only --take stamps consumed_at. Every "unconsumed" row in S160 was in fact read. → register 67 (reader stamps consumed_at) gains this as the measured mechanism. DATE: with 67.

F-S160-PREFLIGHT-UNMEASURED-IN-SANDBOX-1 (AG-1, scout-2). Card preflight did not run in the lanes (tsx IPC pipe: listen EPERM); both lanes reported PREFLIGHT-UNMEASURED as a third value, not a pass — correct behaviour. → register 66 (node --import tsx for every entry). DATE: with 66.

F-S160-BRIDGE-CANNOT-SEE-DOC-REPO-REMOTE-1. The read-only GitHub token is scoped to cwf_yaprak; the doc repo remote returns Not Found, and the bridge cannot fetch. Doc-repo push proof in S160 = the lane's push line (7cab257..a9b0dac) — the remote 40-hex was NOT measured by ls-remote because AG-1 stopped at the ref refusal. FIX: the next push notice orders `git ls-remote origin refs/heads/main` BEFORE the push's tracking-ref step is reached (or immediately after the refusal), so the proof is a 40-hex line. DATE: NOTICE-PUSH-DOC-REPO-S161-1.

F-S160-SCOUT-GH-UNSANDBOXED-1 (scout-2 N5). gh calls ran unsandboxed because Seatbelt blocks TLS verification (x509 -26276); all GETs plus the one status POST. Recorded; the scout named it itself. → register 113.

## C · PRODUCT (from the landed card and its review)

F-S160-BACKENDS-INDEX-NAMES-ONE-BACKEND-AS-WRITER-TARGET-1 (RULING-S160-UI-UX-AND-HARDCODED-TABLES-1 item 5). data/backends/index.json names armes as writerKinds/consoleKinds/exposureAnnotationKind/reconcileBackends. → A25 E2 (K33 identity / contract). DATE: E2 card.

F-S160-ENTRY-FLOOR-OPTIONAL-PARAM-1 (scout-2 N2). filterToolsByMessage's trailing `entryFloor?: readonly string[]` defaults to []; a future caller that omits it gets a silent empty floor with no type error (RoutingCoreInput.entryFloor is required). FIX: small card — make the parameter required or fail closed with a trace field. → register 114. DATE: S161 small card.

F-S160-E2E-LOCATOR-AMBIGUOUS-CENSUSTAB-1 (scout-2 N3). /araç adı|toolName/ also matches CensusTab.tsx:209; harmless while that tab is unmounted, latent strict-mode ambiguity. → register 114 (same small card). DATE: S161.

F-S160-FLOOR-EMPTY-ON-OUTAGE-BY-DESIGN-1 (scout-2 N1; design note). Until ORDER 0's row is published the data floor carries getFactoryLines only; on a store outage or unconfigured store the floor is 'unread' = [] with no code fallback (NO-ARMES-HARDCODE), recorded in the stage-07 span. A behaviour change on outage. → register 84 (backend-down live test) and the report's F6 ruling (row 115). DATE: owner ruling S161.

F-S160-REPORT-F3-F6-OPEN-RULINGS-1 (scout-2 N4). The AG-4 report names two open rulings: F3 stage-07 "Liste asla boş kalamaz" is now data-dependent; F6 mcp-catalog under an unreadable store. → register 115, owner rules. DATE: S161 first hour.

F-S160-RULES-UI-PAYLOAD-TEXTAREA-PASTE-1 (cosmetic, Architect in the browser pane). The Rules tab's payload textarea is React-controlled; a value set without an input event (paste-by-tool) leaves the stale 'Expected property name' error visible until submit, and cmd+a inside it selected the page, not the field. A native-setter + input event write landed; the draft, gate and publish then worked first time. → register 114 (c). DATE: S161 small card.

OWNER-WITNESS-S160-ORDER0-1: ORDER 0 published by the owner's hand in the Rules UI at 18:09Z with the Architect driving the built-in browser pane at his request and him watching; DB and Tool Matching read-back confirmed in the same minute.

## D · OWNER CONTRIBUTIONS, BY NAME (S112-YASA-1)

OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1 (08:06 TSI): every architecture card carries the UI/UX additions AND removals it implies. Applied in card v2 ORDER 5 and verified by scout-2 2g. Architect blind spot: v1 had the UI half thin (scout-1 D8: four missed UI sites).
OWNER QUESTION S160 (08:06 TSI): "after A25, does any hard-coded table remain?" → measured inventory RULING-S160-UI-UX-AND-HARDCODED-TABLES-1 (six classes; MATRIX 6×13 and IR enums → E5; ALWAYS_INCLUDE + superset arm → landed S160; HAND_PACKED_BACKENDS → 82; index.json names → E2; 146 armes lines → E5 + K-G gate).
OWNER TURN DISCIPLINE: the owner kept every relay to one line; 20 turns held (F-S159-TURN-LIMIT-EXCEEDED-1 not repeated).

END · CWF-S160-FINDINGS-v1
