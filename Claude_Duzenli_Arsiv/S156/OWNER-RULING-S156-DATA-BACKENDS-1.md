# OWNER-RULING-S156-DATA-BACKENDS-1
Written 2026-09-23T02:17Z (bridge date -u).
- 2026-09-23 05:17 TSI, owner: "onay data/backends".
- Ruling: backend-specific knowledge floors and seeds (blind spots, zones, glossary, metrics, formats, tool graph, persona, sequencing, category floor, metric registry seeds, kind definitions) leave code and live in repository data files under data/backends/<backend-id>/, loaded generically by backend id. No backend name stays in code. The G4 CI gate scans code dirs (api/, src/, shared/, scripts/, e2e/, public/) and exempts data/backends/, as it exempts migration history.
- Produced by: scout RED verdicts SCOUT-STATUS-REVIEW-CARD-ARMES-G2-KNOWLEDGE-AS-DATA-S156-1-v1 (bus 01:57:31Z) and SCOUT-STATUS-REVIEW-CARD-ARMES-G1B-REMAINDER-S156-1-v1 (bus 01:57:33Z): removing the code copies would have removed the blind-spot law floor, the outage guard and live category-floor consumers.
- Same turn, the owner opened a design question (S112-YASA-1, by name): if CWF's own DB is down but the backend is up, or the backend is down, should CWF keep answering at all? Recorded; the Architect's answer and the fail-closed proposal follow in the S156 reply.
