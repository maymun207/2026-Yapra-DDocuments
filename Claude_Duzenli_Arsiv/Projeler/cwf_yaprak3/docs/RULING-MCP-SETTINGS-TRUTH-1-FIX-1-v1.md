# RULING-MCP-SETTINGS-TRUTH-1-FIX-1 · v1 — R3(a) becomes a COUNTS fix; missing≠deleted; no prune door
**For: AG-2 · amends PHASE-MCP-SETTINGS-TRUTH-1-FIX-1-v1 R3(a) in-flight (S37-1: phase file immutable; this ruling is the binding delta). One relay, self-contained (D-2).**

## Decision
**Option 1.** No deletions anywhere in sync. `mirroredTools` (and every "verified: N" surface) counts `status='active'` only; the card states the split in words — armes **"141 active · 9 missing"**, superset **"4 entry points + 22 via gateway = 26"**. Option 2's operator prune button is REJECTED: `status='missing'` rows are ADR-010 observation history (trust is earned from observed behaviour at per-tool granularity — a missing row records that a tool was once served under an identity and when it vanished). A destructive affordance whose only consumer is disk cosmetics is banned by S98-L4's inverse: an unread deletion is worse than unread data. If a real prune need ever arrives, it comes as its own phase with its own named consumer and its own authorized door.

**Architect live verification (this session; re-read yourself, S65-1):** `backend_tools` — armes: 141 active + 9 missing (`via_gateway=false`); superset: 26 active (`via_gateway=true`). Both of the original phase premises ("sync never prunes", "superset carries 22 stale rows") were FALSE — owned as **A-REC-S101-3**; your live-read stands.

## Binding amendments (a)–(d)
**(a) The Tool Census side moves with you.** The census verdict pipeline excludes `status='missing'` rows from ALL action math (YOUR actions, need-annotation, vendor totals) — a vanished tool demands no annotation. Missing rows render as one collapsed per-backend line: "9 missing (history)" — visible, never counted, never hidden. Cross-foot tests updated so the summary still balances (active-only) and the missing line carries its own count.
**(b) via_gateway is a rendered class, not a footnote.** Wherever superset's tools list renders, the entry-point/gateway split is visible (chip or grouping), so 4-vs-26 can never look like disagreement again — the same law, applied to tool class.
**(c) R3(c) attribution flow unchanged, with one added assertion:** after the owner reassigns the two backend-less personal rows and re-verifies, the 9 foreign armes rows REMAIN `missing` under armes (correct history: they WERE misattributed there) while appearing `active` under their true identities. Test asserts both sides; nothing is deleted to achieve it.
**(d) Post-deploy proof numbers replace the phase's:** Architect reads live — armes `active=141, missing=9` (disk total 150 UNCHANGED), superset `active=26` with the card wording "4 entry points + 22 via gateway", census summary counting active-only, zero rows deleted anywhere. The phase's original "armes 150→141 on disk" target is void.

Everything else in PHASE-MCP-SETTINGS-TRUTH-1-FIX-1-v1 stands, including R1 (delete-from-retired for tk-temp), R4 (secret masking), R5 (system INVARIANT), and the merge order (AG-3 first).

<!-- END · RULING-MCP-SETTINGS-TRUTH-1-FIX-1-v1 -->
