# CWF — v1 SCOPE CUT · v1_2
<!-- cwf-v1-scope-cut-v1_2 · 2026-07-30 · S70 · Architect: Claude.
     Supersedes v1_1 (same day; v1_0/v1_1 immutable per S37-1).
     Delta: R8 (A4 = MEMORY-1 FULL program) · R9 (B4-lite = INTEGRATE the team's
     existing MCP-native RAG service, parallel lane) · F48-line correction ·
     A1/A9/A3 status flips · revised estimate 3–4 working weeks.
     Floor at issue time: origin/master 523c44b4 · rev 162 · 387/4318 · 60 migrations. -->

## §0 · What changed from v1_1

Two owner amendments (R8, R9), one correction, three status flips. Everything ratified
in v1_0/v1_1 (R1–R7: definition, T1/T2/T3, buckets, R-EXPRESSIBLE, RECOVERY-1, F122)
stands.

**Correction (owed by v1_1):** v1_1's §2 wrote "F48/F83/F83.1 → v1.1". Wrong for F48:
F48 is the DIAGNOSIS ("the system's only learning is routing — it stays five years
old"), not a work item. MEMORY-1 is its answer; **F48 closes on MEMORY-1's evidence**,
inside v1. What stays v1.1 is the evolution BEYOND the converged production
architecture (self-evolving/RL memory — an open research frontier per the SOTA review),
plus F83 and the F83.1 golden sub-items (freeze lane) and F166 (VIZ-BIND lane).

## §1 · THE DEFINITION (unchanged, restated — S63-2)

> **v1 is the smallest complete system a Kale operator can rely on safely.**

T1 SAFE — absence can cause a wrong action, a mutated factory, an ungrounded answer
presented as grounded, or a leaked secret. · T2 REACHABLE — sits on a path a real
user/operator takes today, with today's governed flag values. · T3 DEPLOYABLE — a real
Kale installation fails or needs a manual step without it.
Plus **R-EXPRESSIBLE** (S70-2) and **RECOVERY-1** (v1_1 §3.3) unchanged.

## §2 · R8 — A4 IS THE FULL MEMORY-1 PROGRAM (owner-ratified)

"Complete" is defined by the owner-commissioned SOTA review §2.4 (the 2026 converged
production architecture), and the Dibia/Bornet cross-check confirms the same shape.
A4 ships ALL FIVE, no demo deferrals (S61-2):

1. **Episodic store in Postgres** — governed `episodes` table (what was asked · which
   tools worked · verdict · what the user corrected), scoped by user/org.
2. **Multi-signal retrieval into stage 05** — keyword + entity + recency + importance,
   fused; NEVER vector-only.
3. **Forgetting policy from day one** — TTL, importance scoring, decay. Forgetting is a
   feature.
4. **Promotion, not accumulation** — an episode becomes knowledge ONLY by promotion
   through the EXISTING draft → eval-gate → publish → rollback path. The agent
   proposes; the gate (and a human, initially) disposes. Anti-oracle: the agent never
   writes its own ground truth.
5. **Admin surface + lens proof** — a memory change is provably non-destructive to past
   answers.

Design note FIRST (the next Architect artifact), written in the D-1 vocabulary
(working/episodic/semantic/procedural) and stating plainly: **semantic memory
(`domain_rules`, governed knowledge) and procedural memory (prompt segments, tool rules,
routing config) are ALREADY BUILT AND GOVERNED — only the episodic slice is new.** The
note carries the A23 cross-turn-carrier contract paragraph (the store must not preclude
the carrier's read shape). Execution: 2–3 gated phases. **F48 → CLOSED@evidence at A4's
close.** Out (v1.1 by name): self-evolving memory frontier · F83 · F83.1 · F166.

## §3 · R9 — B4-lite IS AN INTEGRATION, NOT AN IMPLEMENTATION (owner-ratified)

**New fact that reshaped this item:** the owner's team has ALREADY BUILT a RAG service —
documents are uploaded to it, it processes them with its own LLM pipeline, and it
**speaks MCP natively**. CWF neither writes nor hosts RAG; CWF connects to it.

**Connection ruling (committed):** the RAG service joins as a **BACKEND**, the exact
Superset pattern — a backend row + domain pack + tool_category rows; the model calls its
`query` tool WHEN NEEDED. It is NOT an unconditional pipeline stage: a per-turn forced
read bloats context (Dibia's context-rot line), bypasses routing, and would mix
soft/advisory RAG content into stage 06's deterministic governed knowledge. The Stages
board's "06 · Bilgi/RAG" card narrative updates to "governed core + tool-accessed RAG";
mechanically RAG flows through the tool layer. This also makes the F207-class usage
measure meaningful: the model must CHOOSE it.

**Integration facts to confirm with the team (guard a):** service reachable from
Vercel + docs loaded · auth joins the reference layer from birth (global entry +
`apiKeyRef` → `mcp_secrets`; never a raw value in any row — the A9 lesson) · the query
tool returns **source attribution** (which document), or the un-attributed answers are
minted as a finding — the provenance chain (evidence chip, grounding) covers RAG only
if attribution exists.

**Guards (unchanged in spirit from v1_1):** (b) ZERO core code — if a row + pack +
categories cannot connect it, the approach is wrong and we stop; (c) F207-class usage
read runs from day one; zero usage is a prompt/routing finding, recorded by name.
**Escape:** if guard (a) is not met when A5 completes, B4-lite reverts to v1.1 — the
tag date is governed by the critical path, which B4-lite never joins.

**ADR-012 tie:** this backend is the first live instance of "delegation is a tool call"
— specialist behind the MCP boundary, trust per-tool (ADR-010), read-only so ADR-011 is
trivially satisfied, LangChain/anything free INSIDE the service's own shell, never in
the CWF core.

## §4 · THE v1 PATH — current

```
 ✅ A1  F212 disposition          CLOSED (19 rejected, Operator-verified 19/1/0)
 ✅ A9  secret retirement         CLOSED@evidence (applied · incident recovered ·
                                  up:2 · live OEE turn with full evidence chip)
 —  A3  F203                      REMOVED — closed not-a-defect (gmail=infra identity,
                                  ksadmin=app identity; fail-closed resolver correct)
 1. A2  F153 Superset 0.0.0.0     Kale/ARDIC ops
 2. A6  F214 floor read-set sync  AG phase
 3. A4  MEMORY-1 FULL (§2)        CRITICAL PATH · design note first · 2–3 phases
 3′ B4-lite RAG integration (§3)  PARALLEL · team-side readiness · escape clause
 4. A5  freeze lift + viz v4 · b1_scope v3 · tools.rule.1/6 v2 (=F138/139/140)
        + F133-L5 + F83.1 sub-items
 5. A7  B6 min docs + D-2 delegation-policy page + D-3 language + ADR-012 draft
 6. A8  B7 tag + release notes + remote-branch pruning
```

**Estimate: 3–4 working weeks** (moved from 2–3 by R8's honest full-program cost;
B4-lite adds zero because it never touches the critical path).

## §5 · RATIFICATION LEDGER

R1–R4 (v1_0: definition, tests, buckets) · R5 (A9→Bucket A) · R6 (R-EXPRESSIBLE +
RECOVERY-1) · R7 (F122 closed) · **R8** (§2) · **R9** (§3) — all owner-ratified,
2026-07-30.

<!-- END · cwf-v1-scope-cut-v1_2 · 2026-07-30 · S70 · floor 523c44b4 / rev 162 -->
