# PHASE `MCP-EXPLORER-1` — the panel stops hiding what the server already knows

<!-- claude-code-PHASE-MCP-EXPLORER-1-v1 · rev 1 · 2026-07-13 · Session 40.
     Author: Architect. Executor: AG (Claude Code / AntiGravity).
     Design note (binding): cwf-mcp-explorer-design-v1 · §2 "MCP-EXPLORER-1".
     Code floor: origin/master 4177eb2 · 2162 tests / 211 files · docVersion rev 71 · drift [OK].
     Ceremony: FULL. Touches api/** ⇒ the reseal budget may return (check the manifest).
     READ-ONLY phase: no tool INVOCATION here. That is MCP-INVOKE-1, and it is gated. -->

---

## 0 · PRE-FLIGHT GATE

```bash
cd /tmp && rm -rf cwf_yaprak && git clone --quiet https://github.com/maymun207/cwf_yaprak.git
cd cwf_yaprak && git rev-parse origin/master   # MUST equal 4177eb28ab7af25f809c5087fad73b53bae66b36
npm ci --no-audit --no-fund --silent
npx tsc -b                                     # clean
npx tsx scripts/checkDocDrift.ts               # [OK] · rev 71
npx vitest run --reporter=dot                  # 2162 passed / 211 files
```

Any disagreement: **STOP and report.**

---

## 1 · WHY THIS PHASE EXISTS

Today the owner spent **four turns** answering one question — *"does `getDailyManualScrap` exist?"* —
because CWF shows **nothing** about the MCP servers it connects to. He asked the agent (it guessed
wrong, via the Superset `search_tools` gateway, and returned empty). I read the Vercel logs. Only
then did we learn the tool existed, worked, and had simply never been offered.

**And the worst part: the server already knew.** `api/admin/mcp-probe.ts` returns

```ts
interface ProbeResult { status; toolCount?; errorClass?; httpStatus?; latencyMs; }
```

— and the panel renders **a green dot**. It throws away the tool count. It throws away `auth 401`.
Which is why a credential-less personal `armesMes` row belonging to another user has been 401-ing on
**every discovery for weeks**, in production, invisible to the admin who owns the system.

> **The rule this phase serves (S40-5, the owner's standing directive):** *a system you cannot see
> is a system you cannot debug.* Half this phase is not new code — it is putting already-computed
> data on the screen.

---

## 2 · BINDING CONSTRAINTS

1. **S39-2 — master ONLY via a reviewed PR.** Branch → PR (fires CI) → verbatim merge message.
2. **READ-ONLY. No tool invocation. No `callTool`.** If you find yourself writing one, you are in
   the wrong phase — **STOP and report**. Discovery/listing only.
3. **`api/cwf/_lib/turn/mcpClient.ts` is FROZEN.** Reuse `connectMcp` / `withTimeout` /
   `extractHTTPFromStdioArgs` / `MCP_TOOL_TIMEOUT_MS` exactly as `mcp-probe.ts` does. Zero diff in
   that file — the chat path must stay byte-identical.
4. **The security posture of `mcp-probe.ts` is the LAW, copied not weakened:**
   - the target row is resolved **server-side** from `{scope, id}`; a URL is never accepted from the
     client (no SSRF widening); unknown id → 404;
   - personal scope resolves **ONLY the caller's own row** (`getByUserId(callerId)`);
   - the response **never** carries a credential: no `apiKey`, no `apiKeyRef` value, no headers, no
     env value, and **no raw error message** (it can embed a token) — error **class** + HTTP status
     only.
5. **No migration, no schema change, no new table.** (The audit table belongs to `MCP-INVOKE-1`.)
6. **No change to `toolCategories.ts`, `ALWAYS_INCLUDE`, or the eval-gate.**
7. **CHANGELOG in-branch**, same PR. Reseal if the drift gate asks; do not bump for nothing.

---

## 3 · SUB-PHASE A — the new endpoint

`api/admin/mcp-catalog.ts` — **the probe's sibling**, same guard, same resolution, same redaction.

```
GET /api/admin/mcp-catalog?scope=global|personal&id=<serverId>     (PANEL_ACCESS)
```

Connects with the frozen transport helper, calls `listTools()`, and returns:

```ts
interface CatalogTool {
    name: string;
    description?: string;
    inputSchema?: unknown;      // the tool's own JSON schema, verbatim from the server
}
interface CatalogResult {
    status: 'ok' | 'error' | 'unreachable';
    serverId: string;
    serverName?: string;
    backendId?: string;               // '' / undefined when the row predates backend_id
    pattern: 'flat' | 'gateway';      // toolPatternOf(backendId)
    toolCount: number;
    tools: CatalogTool[];
    unreachableTools: string[];       // §3.1 — THE POINT OF THIS PHASE
    errorClass?: 'auth' | 'error' | 'unreachable';
    httpStatus?: number;
    latencyMs: number;
}
```

### 3.1 · `unreachableTools` — the badge that would have saved today

For a **`flat`** server, a tool that is in **no** routing category and **not** in `ALWAYS_INCLUDE`
can never be offered to the model — *that is exactly what happened to `getDailyManualScrap`.*
Compute it with the function RULE 31 already gave us:

```
unreachableTools = tools.filter(t => !reachableToolNames().has(t.name))
```

**For a `gateway` server this list MUST be empty** — a gateway backend's tools reach the model
through their own unconditional partition, not through the categories (RULE 31 says so explicitly).
Return `[]` for gateway servers and **do not** run the check. Getting this wrong would flood the UI
with false alarms on Superset.

### 3.2 · Tests (endpoint)

- `PANEL_ACCESS` enforced; anon → 401/403.
- personal scope with **another user's** server id → **404**, never that user's data (pin it).
- an `auth`-failing server → `status:'error'`, `errorClass:'auth'`, `httpStatus:401`, `tools:[]` —
  and **no credential anywhere in the JSON** (assert on the serialized body, not on a field).
- `unreachableTools` names an unrouted flat tool; is `[]` for a gateway server.
- the raw upstream error message is **not** in the response (a token could live there).

---

## 4 · SUB-PHASE B — the panel stops throwing data away

In `MCPSettingsTab.tsx`:

### B1 · The probe row tells the truth
Replace the bare green dot with the data the endpoint already returns:
- `ok` → `t('✓ 141 araç · 820 ms', '✓ 141 tools · 820 ms')`
- `auth` → `t('⚠ Kimlik doğrulama başarısız (401) — bu sunucu hiçbir araç sunmuyor', '⚠ Auth failed (401) — this server offers no tools')`
- `unreachable` / `error` → the class + status, never the raw message.

**A green dot that means "we reached it" is not the same as "it gave us tools".** Never render a
server as healthy when `toolCount` is 0 or `status !== 'ok'`.

### B2 · The catalog drawer
A **"Araçlar / Tools"** affordance per server row opens a drawer:
- backend badge (`armes` / `superset` / `—`) + pattern badge (`düz` / `gateway`);
- a searchable list of tools (name + first line of description);
- clicking a tool opens its **`inputSchema`**: required vs optional fields, types — rendered, not a
  raw JSON dump (a `<pre>` fallback is acceptable for exotic schemas, inside `overflow-auto`);
- **⚠ ulaşılamaz** badge on every tool in `unreachableTools`, with the sentence:
  `t('Bu araç hiçbir yönlendirme kategorisinde değil — modele asla sunulmuyor. Araç Eşleme kategorilerine eklenmeli.', 'This tool is in no routing category — it is never offered to the model. It must be added to a Tool Matching category.')`
- an explicit count line when the list is non-empty: `t('{n} araç ulaşılamaz durumda', '{n} tools unreachable')`.

Use the panel's own idioms — `InlineHelp` (collapsible, never dismissible), the existing drawer/nav
mechanism (`navStack`), the existing badge tokens. **Invent no new UI vocabulary.**

### B3 · What you must NOT add
No "call this tool" button. No arguments form. No retry-with-different-args. That surface is
`MCP-INVOKE-1` and it ships with a capability, a backend-scope check, an audit-first row and an
explicit LIVE-PRODUCTION confirmation. Adding a bare invoke button here would be shipping a remote
code-execution surface against a live factory MES with **no gate**. Do not.

---

## 5 · SELF-VERIFICATION (paste each)

1. Anchor SHA; branch; PR URL.
2. `git diff --stat 4177eb2..HEAD`. Prove the freeze: `git diff --name-only 4177eb2..HEAD -- api/cwf/_lib/turn/mcpClient.ts api/cwf/_lib/toolCategories.ts supabase` → **EMPTY**.
3. **Prove no invocation shipped:** `git diff 4177eb2..HEAD | grep -i "callTool"` → empty. Paste it.
4. **Prove no credential can leak:** paste the test that serializes an `auth`-failing catalog
   response and asserts the body contains no `apiKey` / `apiKeyRef` / header value / raw message.
5. **Prove the reachability badge is real:** a test where a flat server exposes `getDailyManualScrap`
   **plus** a fabricated uncategorised tool → the fabricated one is in `unreachableTools`, and
   `getDailyManualScrap` is **not** (it became reachable in ROUTE-SCRAP-1 — this is the regression
   pin that keeps it that way).
6. **Prove gateway servers are exempt:** a superset-pattern server returns `unreachableTools: []`
   even though its tools match no category.
7. `npx tsc -b`; `npx vitest run --reporter=dot` **UNSHARDED** — count + per-file delta.
   `adminLegibility` auto-generates 2 tests per admin `.tsx`: state whether you added one.
8. Drift `[OK]`; state whether a reseal was needed and the resulting `docVersion`.
9. **CI green on the PR head.**

Report every deviation. A deviation disclosed is a design conversation; one found in review is a
defect.

---

## 6 · ACCEPTANCE (what the owner will do)

1. Open **MCP Servers** → the global `armesMes` row reads **"✓ 141 araç"**, not a green dot.
2. Open its **Araçlar** drawer → search `scrap` → sees `getDailyManualScrap` and
   `getScrapBarcodeList`, with their argument schemas. **The question that cost four turns today is
   now one click.**
3. Any tool sitting in no category wears **⚠ ulaşılamaz** — the failure mode that hid for months is
   now visible on first sight.

---

## 7 · OUT OF SCOPE

Tool invocation + its audit table (`MCP-INVOKE-1`). Deleting the dead credential-less personal row
(Operator lane — currently broken; the Supabase MCP is not authorised for project
`fjbrkimwvtpwoxhziidh`). Governing the categories (`ROUTE-GOV-1`). `MAX_TOOL_ROUNDS` (`PARAM-GOV-1`).

<!-- END · claude-code-PHASE-MCP-EXPLORER-1-v1 · rev 1 · 2026-07-13 -->
