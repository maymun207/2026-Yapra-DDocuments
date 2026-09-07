# OWNER-RULING-S132-MEASUREMENT-RUNNER-IS-CWF-1 — a workflow_dispatch measurement runner is CWF work, outside the ADF freeze

Recorded by the Architect, 2026-09-07T09:46Z (12:46 TSİ; instant = the DB clock at the card INSERT). Owner's word, verbatim: "Tek sınıflandırma: ölçüm runner'ı için `workflow_dispatch` CI işi — CWF ölçüm işi sayılıp dondurma dışında.!"

## OPERATIVE TERMS

1. A GitHub Actions job whose deliverable is a SOTA MEASUREMENT (a `cwf-sota-definition` criterion or its internal rows) is CWF work under OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1 §3, even though it lives under `.github/workflows/`. The freeze's ADF list names `.github/` for factory machinery (landing, gates, lanes); a measurement runner is product measurement.
2. The runner holds the credential; no lane does. The credential is the READ-ONLY parity key already used by `vector-live-proof.yml` at master; ADR-002 is untouched (no lane gains DB write; the Operator remains the sole write authority).
3. Executed by CARD-MA-RERUN-3-S132-1-v3 (AG-4, bus row `bacf281e-6fcc-4e78-b1f2-653549926f67`, 09:46:13Z, sha256 `03154af2…` = local, preflight GREEN first pass). The card stops and reports if a secret NAME is missing from the repository store or the parity role lacks a grant — the owner places secrets, the Operator grants roles.
4. The same classification applies to later measurement runners (the (B) criteria harness runs), each carded by name; it does not thaw any other `.github/` change.

TAIL ANCHOR: OWNER-RULING-S132-MEASUREMENT-RUNNER-IS-CWF-1 ends here.
