# RULING-MCP-SETTINGS-TRUTH-1-FIX-2 · v1 — fix the bodiless-HEAD root cause (Option 1)
**For: AG-2 · binding delta to PHASE-MCP-SETTINGS-TRUTH-1-FIX-2-v1 R1 (S37-1: phase file immutable). One relay, self-contained (D-2).**

## Decision
**Option 1.** Drop `head: true`; probe with `{ count: 'exact' }` + `.limit(0)`. The count still comes server-side from the Content-Range header (immune to the 1000-row cap, ruling amendment (c) of the parent phase preserved), and because the response now carries a body, PostgREST's `42703` arrives WITH its code — so the designed three-way classification finally works and the ~31 irrelevant tables become `not-referencing` instead of vetoing a delete. Option 2 is rejected: it needs a migration this phase is fenced from, opens an Operator door for a defect that has a code-level root cause, and would leave the bodiless-HEAD bug alive underneath a workaround.

**A-REC-S101-4 (my premise error, recorded):** R1 instructed you to derive the probe set "server-side from `pg_catalog` via the existing SECURITY DEFINER catalogue path". That path returns table NAMES only — no column information — so the instruction was unbuildable as written. Your live read corrected it; R1's literal text is superseded by this ruling. This is the second time in this session a phase card assumed a capability of a live artifact instead of reading it (S65-1 again).

## Binding amendments (a)–(d)
**(a) The safety property is a TEST, not a hope.** The whole risk of error-code classification is a permission failure masquerading as "not a child". Assert it: a table that returns a permission/RLS error (42501 or any non-42703 code) stays `unreadable` and REFUSES the delete; only 42703 (and the schema-cache phrasings already handled) becomes `not-referencing`. Fail-closed is untouched — prove it in both directions (D-5).
**(b) Cross-foot the classification against live truth, in the report.** Architect live-read this session: exactly 14 public tables carry `backend_id`. Your post-fix census of `tk-temp` must classify exactly those 14 as counted (13 zero + `backend_tools`=4) and the rest as `not-referencing`, with ZERO unreadable. Any deviation is a finding, not a rounding.
**(c) `exactCountOrThrow` stays.** Losing `head:true` does not retire the HEAD-COUNT-SILENT-204-1 guard — a `count: null` with `error: null` must still throw rather than fold to a stamped zero.
**(d) The column-aware catalogue RPC remains the eventual right answer** — file it against the EXISTING `F-S101-FK-CENSUS-BY-CONVENTION`, whose retire condition it now shares: both close together in the next migration-bearing phase, when the Operator door is open for its own reason. Do not open one here.

Everything else in PHASE-MCP-SETTINGS-TRUTH-1-FIX-2-v1 stands, including R2 (refusal renders blocked-vs-unreadable apart), R3 (the missing legacy chip, diagnosed to the byte), and R4 (`F-S101-ANON-AUDIT-GRANT` filed, not fixed).

<!-- END · RULING-MCP-SETTINGS-TRUTH-1-FIX-2-v1 -->
