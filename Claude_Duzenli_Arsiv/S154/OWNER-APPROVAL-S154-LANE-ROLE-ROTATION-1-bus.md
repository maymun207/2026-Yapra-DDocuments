<!-- relay-audit: v1 kind=ruling -->
OWNER-APPROVAL-S154-LANE-ROLE-ROTATION-1

Given: 2026-09-22 11:09 TSI, S154, the owner's word "onay" to four Architect proposals for register item 46, relayed verbatim by the Architect. This row is the bus copy the scout asked for (SCOUT-STATUS-REVIEW-CARD-LANE-PASSWORD-ROTATION-S154-1-v3, B1).
N1 · AUTHORITY: the owner WIDENS the Gemini operator's closed MAY list (.claude/boot/operator.md section 2) for ONE act only: on project fjbrkimwvtpwoxhziidh, run exactly these two statements, once, in this order:
  ALTER ROLE cwf_lane PASSWORD '<verifier>';
  select pg_terminate_backend(pid) from pg_stat_activity where usename = 'cwf_lane';
BOUND BYTES: <verifier> is the full content of the verifier file AG-4 names in SLIP-LANE-PASSWORD-ROTATION-S154-1, and the operator checks its 12-hex sha256 prefix against the one printed in that slip before running; a mismatch is STOP. Nothing else is authorised; operator.md is otherwise unchanged.
D7 · EXPOSURE: the verifier may appear in the operator's own transcript, the MCP request and any server DDL log. Reason: a SCRAM verifier alone does not authenticate; it needs a captured client exchange as well, and exchanges travel inside TLS. It never goes on the bus, in a commit, or in a lane transcript.
N2 · The swap at the secret's home is done by AG-4's scratch script; no owner step.
D1c · From the ALTER until the owner's IDE restart, the Architect dispatches no card to any cwf_lane user; the owner closes every lane window except AG-4 before the ALTER.
END · OWNER-APPROVAL-S154-LANE-ROLE-ROTATION-1
