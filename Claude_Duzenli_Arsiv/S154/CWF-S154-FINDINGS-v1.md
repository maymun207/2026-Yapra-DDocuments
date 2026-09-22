# CWF-S154-FINDINGS-v1

- F-S154-MAILWAIT-FETCH-IGNORES-PROXY-1: scout-1's window could not read the bus (initialize: fetch failed); NODE_USE_ENV_PROXY retry denied by the classifier. Fix card CARD-LANE-FETCH-PROXY-S154-1-v1 (item 30). HOW: self-configuring proxy routing in mail-wait and three other fetchers. WHEN: land 2026-09-23.
- F-S154-NORUNTIMEAPIIMPORT-MISSES-DYNAMIC-1 (scout F1 on PR 592): the new test does not see dynamic import() or bare side-effect imports from api/. HOW: widen the scan. WHEN: small card 2026-09-23.
- F-S154-RETIRED-BACKEND-ENABLED-1: backends armes-new has lifecycle retired but enabled true and 141 active tool rows sharing names with armes. HOW: G1a-2 v2 keys on lifecycle; data fix to enabled=false routed to the Gemini operator. WHEN: 2026-09-23.
- F-S154-CASE-INSENSITIVE-ARMES-GREP-HITS-CLEARMESSAGES-1: grep -i armes matches clearMessages. HOW: G4 gate uses armes|Armes|ARMES. WHEN: with G4, 2026-09-23 evening.
- F-S154-G4-SCOPE-MISSES-PUBLIC-1: public/architecture carries the name and ships. HOW: add public/ to G4. WHEN: with G4.
- F-S154-SECRET-HOME-NOT-IN-CARD-LIST-1: the lane DSN lives in ~/.zshenv; launchd UNSET. HOW: rotation v5. WHEN: 2026-09-23 morning.
- F-S154-SCOUT-STATUS-LOST-IN-OUTAGE-1: statuses written during the outage never reached the bus; scouts re-wrote on request.
END · CWF-S154-FINDINGS-v1
