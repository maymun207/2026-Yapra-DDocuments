# ADR-006 — Agent Operating Modes (Developer / Operator)
**Status: Accepted · v1 · rev 1 · 2026-07-08**
*(EAIP governance primitive. Owner-approved. Versioned per standing rule. Generalizes ADR-005.)*

> **One-line decision.** Each executor agent (AG, Gemini) operates in one of two modes, defined as a
> {repo, DB} capability tuple, governed by a single invariant: **no mode grants repo-write and
> DB-write at the same time.** Whoever is developing is DB read-only; DB-write is done by the *other*
> agent. Roles are symmetric and swappable. Mode is bound to a **connection**, not a spoken
> instruction, and the default is always the **safe (read-only DB)** side.

---

## Context

Through 2026-07-08 the lane model fixed AG as sole repo author and Gemini as Operator (DB apply,
diagnostic reads, no repo writes). The owner asked whether development could happen in *either* agent
while keeping the same disciplined change-tracking and DB safety. The independence property that
matters — proven all session, and the reason the B / REPLAY-QUOTA-1 FIX-1 gap was caught — is that
**the actor that authors a change is not the sole actor that applies + verifies it against live
state.** This ADR turns that property into a simple, symmetric, human-legible rule.

It also builds directly on today's concrete work: AG's Supabase connection was downgraded to a
genuine read-only role (`supabase_read_only_user`, `transaction_read_only=on`, DDL → SQLSTATE 25006),
enforced at the **Postgres level** — not by the agent believing it is read-only. ADR-006 makes that
the general pattern rather than a one-off.

---

## Decision

### The two modes (a {repo, DB} capability tuple)
| Mode | repo | DB |
|------|------|----|
| **Developer** | write (via PR) | **read-only** |
| **Operator**  | read-only / none | **write** |

### The invariant (the whole point)
**No mode grants repo-write and DB-write simultaneously.** An agent that can write the repo cannot
write the DB in the same mode, and vice-versa. This guarantees author ≠ applier at all times:
whichever agent develops a change is DB read-only, so the DB-write of that change is necessarily
performed by the *other* agent — an independent actor.

### Role-based & symmetric (owner's option A)
- **AG develops** → AG = Developer (repo-write, DB read-only); Gemini = Operator (DB-write). *(today's state)*
- **Gemini develops** → Gemini = Developer (repo-write, DB read-only); AG = Operator (DB-write).

Roles swap as a set; the invariant holds through the swap. There is no "Gemini-specific ban" — the
constraint is structural and applies to whichever agent currently holds the Developer role.

### The critical refinement — mode is bound to a CONNECTION, not a claim
A mode an agent merely *declares* ("I'm in Developer mode now") is a convention, not a boundary — a
confused or prompt-injected agent could claim Developer mode and still write. Therefore:

- **Developer mode's DB side = the agent's only DB connection is read-only** (a `supabase-ro`-style
  connection: `supabase_read_only_user`, `transaction_read_only=on`). The write connection is
  **absent / disabled** in that agent's config. The agent cannot write even if instructed to — the
  write tool is not present.
- **Operator mode's DB side = the write connection is enabled.**
- **Default = the safe side (DB read-only).** "Return to default" therefore always returns to *safe*:
  a forgotten flip-back, or an agent losing track of its mode, never results in an unintended write.

The owner's verbal mode-switch protocol ("you are now in Operator mode for this task … then return
to default") is retained as the **intent / UX layer**. The connection binding is the **enforcement
layer**. Intent and capability can never diverge because the capability is set at the connection,
not the sentence. Verbal switch = intent; connection = hard boundary.

### The repo-write side is process-locked, not tool-locked
Developer-mode repo-write is not a per-agent capability lock; it is the **merge process**: repo
changes land only via PR + Architect RULE-25 review + CI gates. The Operator-role agent simply does
not open PRs during its Operator turn. Enforcement on the repo side is the merge pipeline (which is
author-agnostic — see the multi-author discipline follow-up), not an in-agent switch.

### Canonical definition, per-agent pointer (no duplication)
The mode definitions + the invariant live in **one canonical place** (`.agents/AGENTS.md`, the SSOT
both agents point to). Each agent's own instruction file (`AGENTS.md` for Claude Code, a thin
`GEMINI.md` / `.gemini/` pointer for Gemini) references that single source and differs only in one
line: *"your default mode = Developer"* or *"= Operator."* No second copy of the rules — a duplicate
would drift (the doc-layer version of today's `.mcp.json`-vs-plugin confusion).

### Architect lane is orthogonal
The Architect (Claude, this lane) is neither Developer nor Operator: it designs, writes gated phase
prompts, and reviews. Modes govern the two **executor** agents only. The Architect's review is the
constant normalizer across whichever agent authored.

---

## Today's concrete instantiation (already live)
- **AG = Developer (default).** Repo-write via PR; DB = `supabase-ro` (read-only Postgres role,
  verified 2026-07-08: DDL → 25006, `supabase_read_only_user`, `transaction_read_only=on`). The
  read-write built-in `plugin:supabase:supabase` is **disabled**. Root cause of the earlier
  read-write leak was that the built-in plugin (name `supabase`) overrode `.mcp.json` and dropped the
  `read_only` param — hence the non-`supabase` server name (`supabase-ro`) + plugin disable.
- **Gemini = Operator (default).** DB-write via `postgres` role (verified live 2026-07-08); no repo
  writes; applies migrations, runs independent live-schema verification.

The independent verification of the SEC-ADVISOR/BUGFIX/reconcile work was correctly run by Gemini
(Operator), not AG (the applier of nothing here, but the authoring agent) — the invariant in action.

---

## Relationship to ADR-005
ADR-006 generalizes ADR-005. ADR-005 said: apply is independent of authoring, verified by a
deterministic gate; AG's live DB access is read-only. ADR-006 reframes that as: **read-only DB is
simply the DB side of Developer mode**, and any executor agent inherits it whenever it develops. The
ADR-005 mechanisms (Operator applies; `verifyGrants` + `get_advisors` as the deterministic closing
gate; `db push`-only; the `private`-schema invariant) all remain in force — ADR-006 just makes *which
agent* is the applier a function of who is developing, symmetrically.

---

## Consequences
**Gains.** The independence property becomes a one-sentence human rule with a connection-level
enforcement floor. Either agent can develop without losing DB safety. No CI-apply pipeline is
required for the DB boundary (the read-only role does the work). Default-safe means the failure mode
of forgetting a mode switch is *no write*, not *accidental write*.

**Costs.** Swapping Developer/Operator roles between AG and Gemini is a deliberate reconfiguration
(enable/disable the write connection per agent), not a casual per-message toggle. In practice roles
are assigned per work-session; the verbal protocol handles intra-session intent.

**Honest limits.**
- True *per-turn* connection swapping is operationally heavy; the practical model is **session-level
  role assignment** with connection-enforced DB boundaries + the verbal protocol as the intra-session
  intent layer. The invariant (no simultaneous repo-write + DB-write) holds at the connection level
  regardless of how often roles are swapped.
- ADR-006 secures the **DB** side of multi-author. It does **not** by itself make the CHANGELOG/KB
  change-tracking discipline agent-agnostic — `.gemini/` still does not point to `.agents/AGENTS.md`,
  and CHANGELOG-entry presence is not yet CI-enforced. Those two gaps remain a separate, lower-urgency
  follow-up (a `GEMINI.md` pointer + a "changelog-touched" CI gate) before Gemini is onboarded as a
  routine Developer. Recorded here so the boundary of this ADR is explicit.

---
*Accepted 2026-07-08 (owner decision, option A + connection-binding refinement). Wiring follow-up: one
gated AG phase prompt to place the canonical mode definitions in `.agents/AGENTS.md`, add the thin
`GEMINI.md`/`.gemini` pointer with Gemini's default = Operator, and document the connection-binding
per mode. The multi-author CHANGELOG/KB gates (GEMINI.md → AGENTS.md pointer + changelog-touched CI
check) are a separate follow-up, sequenced after the current committed queue.*
