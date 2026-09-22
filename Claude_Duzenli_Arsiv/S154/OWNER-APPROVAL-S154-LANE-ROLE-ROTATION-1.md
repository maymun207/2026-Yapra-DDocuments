<!-- relay-audit: v1 kind=approval -->
OWNER-APPROVAL-S154-LANE-ROLE-ROTATION-1

Given: 2026-09-22 11:09 TSI, S154, the owner's word "onay" to the Architect's four proposals for item 46 (scout RED on CARD-LANE-PASSWORD-ROTATION-S154-1-v2, needs-a-ruling items N1, D7, N2, D1c).
N1 · The Gemini operator may run, ONCE, on project fjbrkimwvtpwoxhziidh, exactly two statements: ALTER ROLE cwf_lane PASSWORD '<verifier>' where the verifier is read from the file AG-4 names in SLIP-LANE-PASSWORD-ROTATION-S154-1 and matches the sha256 prefix printed there; then select pg_terminate_backend(pid) from pg_stat_activity where usename = 'cwf_lane'. Nothing else. This approval is the separate named owner approval that .claude/boot/operator.md section 3 requires for a replacement.
D7 · The verifier may appear in the operator's own transcript and MCP request. Reason: a SCRAM verifier alone does not authenticate; it needs a captured exchange as well, and exchanges travel inside TLS. The verifier still never goes on the bus, in a commit, or in a lane transcript.
N2 · The swap at the secret's home (card step 3b) is done by AG-4 with one scratch script outside every repository that rewrites the export line from the staged file and prints only digest prefixes. No owner step.
D1c · From the operator's ALTER until the owner's IDE restart, the Architect dispatches no card to any cwf_lane user, and measures the quiesce from the bus and from pg_stat_activity (every cwf_lane backend idle, no open transaction).
END · OWNER-APPROVAL-S154-LANE-ROLE-ROTATION-1
