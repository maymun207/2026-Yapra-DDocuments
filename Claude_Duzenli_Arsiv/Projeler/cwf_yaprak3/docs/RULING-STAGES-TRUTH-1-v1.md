# RULING-STAGES-TRUTH-1 · v1 — purpose-gate scope = the digest jurisdiction (Option A)
**For: AG-3 · amends PHASE-STAGES-TRUTH-1-v1 R1 in-flight (S37-1: phase file immutable; this ruling is the binding delta). One relay, self-contained (D-2).**

## Decision
**Option A — turn-path gate.** `DigestDbReadEntry.purpose` is REQUIRED on the shape; every appender reachable from the turn pipeline supplies it at the call site. Options B and C are rejected: tagging the ~230 non-digest sites produces data with NO consumer (S98-L4: "who reads this?" has no answer there — dead on arrival), and both variants touch AG-2's lane files mid-parallel-wave (fence breach) for zero rendered truth. The gate's jurisdiction is the DIGEST, not the database client. When a future phase gives admin/replay/synth surfaces a rendered ledger, that phase brings their tags together with their consumer.

**Architect count-probe (this session):** raw `.from()/.rpc()` sites in non-test code = 17, funneled behind the single service-client proxy — your "274" therefore counts a different layer (likely repo-method invocation sites). Your §1 appender census remains the authoritative worklist; reconcile your number against the census in the report and name what you counted (COMPUTED-NOT-ASSERTED).

## Binding amendments (a)–(e)
**(a) Coverage is census-driven, not sample-driven.** One "representative turn" is a small clean sample and a small clean sample is not proof. The coverage check derives from the §1 census list itself: a static assertion that every census-listed appender path threads a non-empty purpose, PLUS a runtime matrix of at least {no-tool turn, tool-calling turn} asserting zero untagged entries. If frame/gateway branches are reachable in the harness, include them; if not, say so by name.
**(b) Runtime backstop, loud.** Any entry that reaches the builder without a purpose (JSON cast, spread, legacy path) is stamped `purpose: 'UNTAGGED (bug)'` — rendered exactly that way, never blank — and the matrix test asserts ZERO such entries. Empty≠zero at the tag layer: an untagged read must look like a bug, not like quiet prose.
**(c) Fence guard.** Do not modify files owned by AG-1 (census console) or AG-2 (MCPSettingsTab, McpSettingsRepository, lifecycle service). If the required type threads through a genuinely shared file, the touch is type-only, minimal, and named in the report with the one-line reason.
**(d) Named finding for the remainder:** `F-S101-PURPOSE-GATE-SCOPE` — non-turn-path read sites remain untagged BY DESIGN; retire condition = the phase that gives those surfaces a rendered ledger consumer. SOTA-1 check performed: no SOTA criterion requires purpose tags on non-rendered reads. Enters the register by name.
**(e) Gate self-test both directions (D-5).** One deliberately untagged fake appender in a test proves the compiler/matrix gate goes RED; the innocent fully-tagged case compiles and passes green. A gate never tested in the failing direction is an unverified gate.

Everything else in PHASE-STAGES-TRUTH-1-v1 stands unchanged, including merge order AG-1 → AG-2 → AG-3.

<!-- END · RULING-STAGES-TRUTH-1-v1 -->
