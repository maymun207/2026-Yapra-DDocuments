CWF-SESSION-GRAPH-KB-v144

Edges S144 learned. Appends to v143; v143 and earlier stand by name. Each edge is session-tagged.

- [S144] vector origin repair —needs→ a CloudFront writer; none existed (scout grep, 04:15Z) —built-by→ CARD-VECTOR-ORIGIN-REPAIR-S144-1-v2.
- [S144] ghost filter (vector-diagnose.yml) —conflicts-with→ "exactly one instance" in a repair —resolved-by→ exactly one RUNNING + GHOST lines, backstopped by langfuse-ec2 match (ORDER 1(d)).
- [S144] update-distribution —replaces→ the WHOLE config —so→ pre-write diff proves what is SENT, post-write diff proves what is STORED.
- [S144] origin domain_name change —is-in-place-for→ terraform (no replace) —so→ deploy-langfuse plan gate (delete-only) unaffected; drift REDUCED.
- [S144] relay_adversary_seal_strip —regex with 'n' flag→ strips the FIRST ```evidence:adversary block at any line start —so→ seal can sit mid-card; verify with relay_adversary_canonical_sha256 in the INSERT's WHERE.
- [S144] /clear —loses→ nothing durable (CLAUDE.md reloads; card on bus; state in repo) —but→ scout's API auth read 401 after it (unresolved, item 29).
- [S144] lanes answer orders —do-not→ mark consumed —so→ "oldest unconsumed" re-selects answered orders —cure→ name the card in every "kartını oku".
- [S144] bridge VM git status/update-ref/commit —leaves→ *.lock (VM cannot unlink) —cure→ GIT_OPTIONAL_LOCKS=0 for reads; delete grant + rm for writes.
- [S144] pathB/bm25.ts —imported-only-by→ vectorLane/encoder.ts; rrfFuse —lives-in→ vectorLane/incumbentEngine.ts —suggests→ item 5 ≈ vector lane (claim).
- [S144] F-S117 empty-layer widen —landed-at→ stageClarify.ts:895; populated-layer parent scoping —still-open→ item 7; GraphKbReader.parentsOf —caller→ none.
- [S144] per-item owner approvals —were→ the bottleneck (owner, 07:40 TSİ) —replaced-by→ one approval per written plan.

END · CWF-SESSION-GRAPH-KB-v144
