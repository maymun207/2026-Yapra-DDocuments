# CWF — Session Graph KB · v38

<!-- CWF-SESSION-GRAPH-KB-v38 · rev 38 · 2026-07-12 · Supersedes v37. Session 38 in one
     document: what happened, what was DECIDED, and WHY — so no future Architect re-derives
     or re-litigates. Companion: cwf-open-items-register-v40 (the queue) and
     cwf-master-plan-v2 (the sequence). Floor at close: 7f6aeb3 · 2073/205 · rev 70. -->

## 1 · WHAT SHIPPED (chain 415db54 → 7f6aeb3)
- **S38-CLEAN-1** (`cefe52e`): NAV-STACK-1 DOC-FLIP + stale annotations + `/dev/admin-preview`
  quota seam. Flake sweep beforehand: CLEAN (the S37-2 pattern had exactly one instance).
- **E-DOC-1** (`df18a86`): Stream-E changelog · **operator-inbox mailbox** · **AGENTS.md
  RULE 30** · **ADR-006 committed** (was project-side only since 2026-07-08; ADR-005 still
  repo-absent — queued).
- **E-HARDEN-1** (`7f6aeb3`, FULL, +21 tests, reseal rev 69→70): the day's four live-found
  defects — create-time kind↔backend guard, MCP save round-trip, gateway tabulation,
  discovery attribution.
- **Master plan v2**: Stream E reshaped (seed+backfill → staged CONNECTION CONSOLIDATION),
  re-gated on the golden set, runs parallel to W1. v1 immutable.
- **Stream E through E.2**: E.0 diagnosis → E.1 applied (twice) → E.2 verified. The owner
  published his FIRST governed rule via the admin UI and the next fresh session proved the
  behavior change (3 calls → 2; one-attempt `{"request":{}}`; trace `93d277b7`).

## 2 · THE E-STREAM MECHANISM (read before touching E.3)
- **Root cause of F36** was never missing seeds: rules were SEEDED (48/31). It was the
  personal `supersetArmes` row lacking `backend_id` inside a personal+global UNION merge
  (merge is BY ID; all four ids distinct → 4 live servers, 2 per backend). `toolPatternOf(null)
  ='flat'` → the personal Superset connection was a flat/armes tool source; name collisions
  resolve last-write-wins with personal appended last → **reporting-mirror data could execute
  under system_of_record attribution (F-E0-2)**. E.1 (disable the personal element) closed it.
- **Arithmetic fingerprints** (how to read `[ToolRoute]`): pre-E.1 total 290 = 286 flat
  (two ARMES catalogs + personal-superset 4) + 4 gateway; post-E.1 286. An armes-down turn
  showing exactly 4 tools = gateway-only = the E.1 signature.
- **Catalog skew (OPEN, E.3-critical):** during the token-expiry outage the surviving ARMES
  connection served a 145-tool catalog while combined-flat arithmetic implies the other holds
  ~137. E.3 must verify per-connection counts (the new `cwf.mcp.server_id` spans make this
  possible) and land the cutover on the current/fuller catalog. The global connection
  field-proved its auth by serving ALONE through the outage → E.3 risk is now LOW.
- **`search_tools` 5-vs-0** = QUERY-FORM sensitivity (natural phrase hits; camelCase
  identifier misses), not flakiness. Candidate governed-rule polish, owner-editable.

## 3 · LESSONS (the expensive ones — each cost real time)
- **S38-L1 · Verify against the SHARED TREE, not just the remote.** The Architect ruled the
  Operator's "changelog updated" claim a confabulation after checking only origin. AG later
  found the entry UNCOMMITTED in the shared AntiGravity working tree — the fence event was
  real. Institutionalized as RULE 30 (dirty-tree tripwire) + the operator-inbox mailbox. The
  owner's directive that shaped it: **"coordination, not lockout"** — the Operator keeps repo
  READ; writes flow only through the gitignored inbox; AG is the sole folder. (ADR-006 is the
  written form of the whole model.)
- **S38-L2 · No mid-flow zigzags with a learning human.** The Architect redirected the owner
  from "create a new rule" to "amend the existing one" mid-form; the unsaved form died, an
  orphan draft was born, and an evening of confusion followed. Commit to ONE path; register
  the purist alternative as a cleanup item instead of switching a human mid-task.
- **S38-L3 · The three-missing-guards anatomy** (RULES-CREATE-MISMATCH-1): picker unfiltered +
  client stamps the header backend + server accepts at create — the deterministic gate (last
  line) HELD every time, but with zero cheap guards in front, the human paid in vanishing
  toasts. Defense-in-depth is also a UX doctrine.
- **S38-L4 · UI saves must round-trip what they didn't touch.** The MCP re-import
  (`{...inc, id}` + strict importer's `enabled:true`) silently undid an Operator change.
  Fixed; the class ("rewrite resets untouched fields") is now a named review lens.
- **S38-L5 · PR-fires-CI**: the workflow triggers only on PR/push→master; a bare branch push
  runs nothing. Standing flow: AG opens a PR per phase. The Architect sandbox CANNOT read
  GitHub CI (anonymous rate-limit) — AG's CI confirmation on the PR is part of the report.
- **S38-L6 · Changelog-in-branch**: every phase prompt's scope includes its CHANGELOG entry
  (E-HARDEN-1 had to fold it in post-hoc). Also: entries written pre-merge say "pending
  merge" — a stale-annotation class to sweep on the next doc touch.
- **S38-L7 · Same conversation ≠ a test.** A repeated question in one conversation is answered
  from history with ZERO tool calls — behavioral smokes need a FRESH session.
- **S38-L8 · Owner pedagogy = product evidence.** Every explanation the owner needed tonight
  (key vs payload, kind→backend inheritance, backend slices, publish lifecycle) is verbatim
  Wave-2 content material; the session transcript is the case study.

## 4 · DECIDED — DO NOT RE-LITIGATE
- Master plan v2 sequencing (W0 → W1 ∥ E → GOLDEN-LOOP-1 → W3 → W4 → W5).
- E is consolidation, NOT seeding. `seedRules.ts` does not run. The E.1 disable stands;
  G5 (delete vs disable) decides after E.4 + one clean week.
- S38-1 both teeth; RULE 30; the mailbox protocol; PR-fires-CI; changelog-in-branch.
- The orphan mismatched draft gets ARCHIVED (owner, 2 clicks), never published or deleted.
- ADR-005 gets AUTHORED by the Architect (no project-side text exists) → next doc batch.

## 5 · SESSION-38 HUMAN CONTEXT (for tone continuity)
The owner spent the evening hands-on inside the admin panels for the first time as a real
user: published a rule, hit every UX trap, and articulated the Wave-2 mandate in his own
words ("no rational order a HUMAN can follow, no docs, error-ready, unmemorable"). He pushed
back once, hard and correctly — against capability-lockout as a fence fix — which produced
the mailbox design. Golden set at 5/20; he knows it gates E.3. He asked for the full
open-items sweep himself (register v40) — treat that register as owner-audited.

<!-- END · CWF-SESSION-GRAPH-KB-v38 · rev 38 · 2026-07-12 -->
