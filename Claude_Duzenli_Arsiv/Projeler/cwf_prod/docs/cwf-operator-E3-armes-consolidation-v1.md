# OPERATOR — E.3 · ARMES connection consolidation (the auth cutover)

<!-- cwf-operator-E3-armes-consolidation-v1 · rev 1 · 2026-07-13 · Session 39.
     Lane: OPERATOR (Gemini + Supabase MCP). Gated in TWO stages: READ → STOP → (Architect
     authorizes) → WRITE. Reversible by a single statement at every point.
     Anchor: master 639878d. Golden set 20/20 (the plan-v2 gate for E.3 is MET).
     Design: cwf-master-plan-v2 §E.3 + the live catalog measurement of 2026-07-13. -->

---

## 0 · FENCE (read this first — it binds everything below)

**You have NO file lane and NO repo lane.** You do not read, write, create, move, or stage any
file in any working tree. You do not touch git. Your only surfaces are the Supabase MCP tools.

**You report ONLY the G-gate evidence asked for below.** No summaries of what you think it means,
no recommendations, no extra queries "while you're in there."

**You never echo a secret value.** Not a token, not an API key, not a bearer string — not even
partially, not even "to confirm it's set." If a field holds a secret, report only
`present: true|false` and its **key name** (e.g. `apiKeyEnv: MCP_ARMES_TOKEN`).

**You stop where the prompt says STOP.** Stage B is not authorized until the Architect reads your
Stage A output and says so in writing. Proceeding past a STOP is a fence breach.

---

## 1 · WHAT THIS IS (context, one paragraph)

There are currently **two ARMES connections** live at once: a **global** one and a **personal** one
(owner-scoped, under `ksadmin@ardictech.com`). Because the two are merged by id, the agent is
offered **both catalogs simultaneously** — 282 flat tools where one connection should serve ~145.
The same tool name appears twice and collisions resolve last-write-wins. We are going to disable
the **personal** ARMES entry so exactly one connection serves per backend. The global connection's
auth is already field-proven (it served alone, correctly, through the July token outage).

This is a **config UPDATE**, not a migration. It is reversible with one statement.

---

## 2 · STAGE A — READ ONLY (do this now, then STOP)

Do **not** write anything in this stage.

**A-1.** Read the **global** MCP settings row(s) and the **personal** MCP settings row for
`ksadmin@ardictech.com` from `mcp_settings`.

**A-2.** For **every** server element in **both** rows, report this table and nothing else:

| owner (global / personal) | element `id` | `name` | `enabled` | `backend_id` | url **host only** (no path, no query) | secret field: `apiKey` present? / `apiKeyEnv` name? |
|---|---|---|---|---|---|---|

- **Host only.** `https://armes.example.com/mcp/v1?token=…` → report `armes.example.com`. Nothing
  after the host.
- **Secret column:** report `apiKey: present` or `apiKey: absent`, and `apiKeyEnv: <NAME>` or
  `apiKeyEnv: absent`. **Never the value.**
- Report the **array index** of each element as it appears in the stored JSON (0-based). We need
  the index to write a surgical update in Stage B.

**A-3.** Report the exact **column name** that holds the server array, and the exact **primary-key
predicate** that identifies each row (so Stage B's UPDATE can be written against reality, not a
guess).

### ⛔ STOP HERE.

Post the Stage-A table. **Do not proceed to Stage B.** The Architect will identify which element is
the personal `armesMes` and authorize the write. Guessing which row to disable is exactly the
failure this gate exists to prevent.

---

## 3 · STAGE B — THE WRITE (only after the Architect authorizes, naming the element id)

**B-1 · Pre-read (the before-picture).** Re-read the target row and report the **full array with
secrets redacted** (same redaction rules as §2). This is the rollback reference.

**B-2 · The single targeted UPDATE.** Set `enabled = false` on **exactly one element** — the one
whose `id` the Architect named — inside the personal row's array, addressed **by the array index
you reported in Stage A**.

**Binding constraints on the write:**
- **One row. One element. One key.** `enabled` → `false`. Nothing else changes.
- **Do NOT rewrite the element.** Do not rebuild it, do not re-serialize it, do not "clean it up."
  Every other key on that element (`id`, `name`, `url`, `backend_id`, `apiKey`/`apiKeyEnv`, and any
  key you do not recognize) must survive **byte-identical**. *(This is not paranoia: a UI rewrite
  that reset untouched fields is what silently undid this exact change once before.)*
- **Do NOT touch any other element**, and do not touch the global row at all.
- **No migration.** No `apply_migration`. No DDL. This is a data UPDATE.
- If the shape of the data makes a surgical single-key update impossible, **STOP and report that** —
  do not fall back to a whole-array rewrite.

**B-3 · Post-read (the after-picture).** Re-read the row and report:
- **G-a:** the target element now has `enabled = false`. ✅/❌
- **G-b:** the target element's **every other key** is unchanged vs B-1 (list any key that differs —
  the expected answer is *none*). ✅/❌
- **G-c:** **every other element** in the array is unchanged vs B-1. ✅/❌
- **G-d:** the **global** row is untouched. ✅/❌

**B-4 · Idempotence probe.** Run the same UPDATE a second time. Report that it changes nothing
(`enabled` was already `false`; no other diff). ✅/❌

**B-5 · Report the ROLLBACK statement** — the exact statement that sets `enabled = true` back on
that element, ready to paste. Do not run it. We may need it within minutes.

---

## 4 · WHAT HAPPENS NEXT (not your lane — for your awareness only)

The owner will ask one ARMES question in the chat. The Architect will read the production log line
`[ToolRoute] … offered=N/M` and decide from the arithmetic:

- flat catalog **145** → the surviving connection is the fuller/current one → **cutover stands**.
- flat catalog **137** → we kept the thinner one → **roll back immediately** (B-5), and we disable
  the other connection instead.

You do nothing until told. **Do not run the rollback on your own judgment.**

<!-- END · cwf-operator-E3-armes-consolidation-v1 · rev 1 · 2026-07-13 -->
