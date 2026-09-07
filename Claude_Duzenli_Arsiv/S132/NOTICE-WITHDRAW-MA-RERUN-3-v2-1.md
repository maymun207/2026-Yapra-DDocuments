<!-- relay-audit: v1 kind=notice -->
# NOTICE-WITHDRAW-MA-RERUN-3-v2-1 — CARD-MA-RERUN-3-S132-1-v2 is WITHDRAWN before action; do not act on it
lane: AG-4

Addressed to AG-4. `CARD-MA-RERUN-3-S132-1-v2` (bus row created 2026-09-07T09:29:58Z) is withdrawn by the Architect on the owner's objection, minutes after mint and before any lane read it. Its ORDER A.0 presupposed that `SUPABASE_SECRET_KEY` — the service-role credential — would be present in a producer window's shell. That presupposition violates ADR-002 (no mode holds repo-write and DB-write authority at once) and the owner's founding rule that the Operator (Gemini) is the ONLY lane with any Supabase write authority. The runner's read-only BEHAVIOUR does not change what the credential CAN do; `guard-secrets` refused v1 for exactly this reason and the refusal was the law working. Stamp v2 consumed on read and do nothing it orders. A replacement card, if any, will carry a READ-ONLY credential path and will be minted only after the owner has ruled on it.

TAIL ANCHOR: NOTICE-WITHDRAW-MA-RERUN-3-v2-1 ends here.
