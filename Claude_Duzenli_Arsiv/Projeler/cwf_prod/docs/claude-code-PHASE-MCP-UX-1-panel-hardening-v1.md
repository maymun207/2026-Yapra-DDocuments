# PHASE MCP-UX-1 — MCP Panel Hardening & Ergonomics · v1
<!-- rev 1 · 2026-07-06 · Author lane (AG / Claude Code on AntiGravity). Queue #3's first
     concrete slice (GOVERN polish), scoped by Maymun's live rough-spot review of the MCP
     Servers panel + the ARMES daily-token findings. Code-grounded at master HEAD 384e0f2.
     SECURITY-RELEVANT (adds a secret-to-global write guard + a server-probing endpoint
     that handles stored secrets server-side) → FULL REVIEW, not hotfix mode.
     No migration (all changes ride existing tables). -->

---

## 0. HARD PRE-FLIGHT GATE (all literally true before any change)

- [ ] Fresh clone; `git rev-parse origin/master` == **`384e0f2…`** (RULE 25 — verification starts here).
- [ ] `npm ci` clean; baseline **829/829 tests (83 files)** green BEFORE any change (paste counts).
- [ ] **Drift gate green** (`check:doc-drift` → `[OK]`) on the untouched clone (paste the line).
- [ ] Read the context notes in §1 — especially WHY the import mangled (Format-2 fallback) and
      the confirmed no-leak state of `mcp_global_settings` (skeleton rows only).

## 1. Context (diagnosed root causes — build against THESE, not symptoms)

1. **Import mangling:** `parseMCPConfigJSON` (src/lib/mcpConfig.ts) silently falls through to
   Format 2 when the Format-1 (Claude Desktop) detection fails for ANY entry, then
   `parseSingleConfig` mints `name: item.name || 'Server ${idx+1}'`, drops unrecognized fields,
   and the UI writes the result with `enabled:true`. Real incident: a Global-target JSON import
   produced six skeleton rows ("Server 1…5" + a duplicate "Server 1"), zero url/apiKey/args
   (Operator-verified). The parser mangles instead of rejecting.
2. **No dedupe on merge:** `handleJsonImport('add')` is `[...globalServers, ...parsed]` — pure
   append; duplicate names accumulate.
3. **No confirm on Replace all:** `handleJsonImport('replace')` overwrites the ENTIRE list for
   the chosen scope with no confirmation dialog — with target=Global that is a one-click,
   all-users destructive write (delete has a confirm; replace-all does not).
4. **No secret-to-global guard in code:** the panel primer SAYS "secret headers are owner-locked
   in the personal row — never promoted to global", but `api/admin/mcp-settings.ts` PUT validates
   only id/name/transport/enabled and stores whatever else rides along. The principle lives in
   prose, not code. (This incident leaked nothing only because the parser happened to drop the
   fields — that is luck, not a guard.)
5. **Edit-dialog ergonomics:** the personal Edit Server dialog has no field labels; the stdio
   `armesMes` row's Bearer token lives INSIDE the raw comma-joined args string, edited daily in a
   tiny single-line input. FIX-3C's masked-apiKey discipline (blank = keep existing) exists for
   `apiKey` but not for the args-embedded token.
6. **No liveness/status:** the panel has no probe; a dead server (the ARMES daily-token-expiry
   window) looks identical to a healthy one. Discovery only runs at chat time
   (`discoverServerTools`, TTL-cached) and its failure is a red span, not a panel signal.

## 2. HARD CONSTRAINTS (violating any = rejected review)

**2.1 — Secrets never cross to the client or to global.** The probe endpoint and every response
in this phase return NAMES, booleans, counts, and error CLASS/status only — never a url's
credential part, never apiKey/headers/env values, never raw error messages that may embed a
token (error → `{ class, httpStatus? }`, message text stays server-side in logs). The per-server
JSON view (D) renders secrets masked (`••••`) and never round-trips a real secret value to the
browser. The global write path REJECTS secret-bearing entries (Sub-phase B).

**2.2 — No SSRF widening.** The probe accepts ONLY `{ scope: 'global'|'personal', id }` and
probes the server row it resolves server-side (global via service role; personal via the
CALLER's own row under RLS). It NEVER accepts a URL/command from the request body. Unknown id →
404. Timeout hard-capped (reuse the existing MCP timeout constants); probes run sequentially,
no background scheduler.

**2.3 — Chat-path stays byte-identical.** `discoverServerTools` / `discoverMcpTools` /
`mcpClient.ts` used by the chat pipeline are NOT modified. If the probe needs a lighter connect,
factor a shared helper WITHOUT changing the chat path's behavior (existing pipeline tests prove
it: they must pass unchanged).

**2.4 — Import writes nothing without an explicit user confirm.** Parse → PREVIEW → confirm →
write, for both merge and replace, both scopes. A parse that cannot confidently map every entry
REJECTS with a per-entry reason; it never mints placeholder names on the import path.

**2.5 — Owner-locking is code now.** Rejecting secrets on the GLOBAL target happens SERVER-SIDE
in `api/admin/mcp-settings.ts` PUT (the UI mirrors it, but the API is the guard).

**2.6 — Secrets hygiene of the phase itself:** no secret printed in code, tests, or the report;
test fixtures use obviously-fake tokens (`Bearer FAKE_TEST_TOKEN`).

**2.7 — Scope discipline:** this is panel + admin-API work. Do NOT touch grounding, replay,
knowledge, eval-gate, trust, or IAM files. No new env vars. No migration.

## 3. GATED SUB-PHASES (in order; each green before the next)

### Sub-phase A — strict import: reject-don't-mangle + preview + dedupe
`src/lib/mcpConfig.ts` + `src/components/admin/MCPSettingsTab.tsx`:
- Add a STRICT parse for the import path returning
  `{ ok: Entry[], rejected: { key|index, reason }[] }`. An entry is `ok` only when its name is
  explicit (the Claude-Desktop key or an explicit `name`) AND it has a usable connection
  (`url`, or `command`+`args`). The `'Server ${idx+1}'` fallback is REMOVED from the import
  path (keep `parseSingleConfig`'s signature for any non-import callers; verify callers first).
- Import flow becomes parse → **preview panel** (table: name · transport · url/command summary ·
  NEW/UPDATES-EXISTING badge · rejected entries with reasons) → explicit confirm button → write.
- **Merge = true merge:** dedupe by case-insensitive `name` within the target scope — same name
  updates the existing entry (id preserved) instead of appending. Preview states "N new,
  M updated, K rejected".
- **Replace all** gets a confirm dialog naming the blast radius, scope-aware (global: "replaces
  the global list for ALL users — X entries will be removed"). Reuse the existing delete-confirm
  Dialog pattern.

### Sub-phase B — secret-to-global guard (server-side, the security core)
`api/admin/mcp-settings.ts` PUT: reject (422, per-entry reason) any GLOBAL entry that carries
`apiKey`, `headers`, `env`, or any `args`/`command` element containing `Authorization` or
`Bearer` (case-insensitive). The error names the offending entry and says secrets belong in a
PERSONAL row. UI import preview shows the same verdict pre-emptively for target=Global. Add a
test that a Bearer-in-args global PUT is refused and that the same payload to a PERSONAL row
still works.

### Sub-phase C — edit-dialog ergonomics + first-class stdio token
`MCPSettingsTab.tsx` edit dialog:
- Labeled fields (Name / Command / Args / URL / API key), args in an auto-growing textarea
  (no fixed single-line input for long values).
- When the args contain a `--header` `Authorization: Bearer <token>` pair, surface a separate
  **masked "token" field** (shows `•••• (set)`; blank on save = keep existing — the exact FIX-3C
  discipline). A typed value is spliced back into the args at the same position server-value-side
  (client store write, owner RLS — same path the dialog already uses). The raw token never
  prefills.
- This is THE daily ARMES renewal affordance: paste-new-token → Save, no raw-args surgery.

### Sub-phase D — per-server masked JSON view
In the edit dialog (or an adjacent affordance): a read-only JSON rendering of the entry with
every secret masked (`apiKey`, `headers` values, and the Bearer token inside args →
`Bearer ••••`). Optional copy button copies the MASKED form. No JSON *edit* in this phase (a
masked round-trip editor is a follow-up; do not build a path that could echo or overwrite
secrets ambiguously).

### Sub-phase E — probe/status (the ARMES-window visibility)
- New gated endpoint (e.g. `GET /api/admin/mcp-probe?scope=…&id=…`, PANEL_ACCESS; personal
  probes resolve ONLY the caller's row): server-side connect + `listTools` with the existing
  timeout, returning `{ status: 'ok'|'error'|'unreachable', toolCount?, errorClass?,
  httpStatus?, latencyMs }`. Error taxonomy: HTTP 401/403 → `auth` (the ARMES daily-expiry
  signal), timeout/conn-refused/DNS → `unreachable`, other → `error`. NEVER the error message
  text in the response.
- Panel: a per-row probe control + status dot — green `ok`, orange `error`/`auth` (reachable
  but failing; tooltip shows the class, e.g. "auth (401) — token likely expired"), red
  `unreachable`; gray = not probed yet. Probing is user-triggered (row button and/or a
  "probe all" that runs sequentially); NO auto-polling.
- Reuse `connectMcp`/timeout constants via a shared helper per 2.3; a skeleton row (no
  url/command) short-circuits to `unreachable` without a network attempt.

### Sub-phase F — reseal (living-doc lock-step)
Mapped `api/**` changed (mcp-settings PUT guard + the new probe endpoint) → reseal the affected
tab(s) (Governance Model at minimum), bump `public/architecture/manifest.json` docVersion
**40 → 41**. Two-commit seal (code+reseal, then changelog). Diff scope EXPLICITLY permits
`.agents/CHANGELOG.md`, `public/architecture/manifest.json`, and the frontend service method(s)
in `src/lib/adminService.ts` / `mcpSettingsService.ts`. Merge `--no-ff` (squash banned). Drift
gate ends `[OK]`.

## 4. SELF-VERIFICATION (literal evidence; "build green" is not evidence)

1. Baseline `829/829 (83 files)` and final `829+N/829+N` with N itemized per test file.
2. **Reject-don't-mangle:** a test feeding the incident-shaped JSON (entries without
   name/url/command) asserts ZERO entries written and per-entry rejection reasons — and that
   NO entry named `Server 1` can be produced by the import path anymore.
3. **Merge dedupe:** importing the same JSON twice yields no duplicates (second run = "0 new,
   N updated").
4. **Replace-all confirm:** a test (or RTL assertion) that the write does NOT fire before the
   confirm interaction.
5. **Secret-to-global guard:** the Bearer-in-args GLOBAL PUT → 422 with the entry named; same
   payload PERSONAL → accepted. Paste both test names + results.
6. **Token field:** with a fixture args containing `--header Authorization: Bearer FAKE_TEST_TOKEN`,
   the dialog state never contains the raw token (masked), blank-save keeps it byte-identical in
   the store, and a typed value replaces ONLY the token substring.
7. **Probe safety:** probe response for a 401-failing fake server contains `errorClass:'auth'`
   and does NOT contain the fake token or the error message text; probe by arbitrary URL is
   impossible (only scope+id accepted — 404 on unknown id).
8. **Chat-path byte-identity (2.3):** existing discovery/pipeline tests pass UNCHANGED; state
   which files prove it.
9. Drift `[OK]` post-reseal + docVersion **41** + two-commit shas + `git rev-parse origin/master`
   after push (RULE 25) + independent recount of tests 2/5/7 from raw output.

## 5. YOUR ACTION ITEMS (for Maymun)
- **None pre-build** (no migration, no env, no Operator apply).
- The six skeleton global rows are DATA cleanup via the existing UI delete buttons — Maymun
  handles it directly; do NOT write a migration or script for it.
- After merge+report: Architect fresh-clone FULL review (security-relevant), then Maymun's live
  pass: probe ARMES pre/post token renewal (expect orange `auth` → green) and paste one day's
  new token via the Sub-phase-C token field.

If any step forces an unlisted manual action, STOP and surface it as a new
"YOUR ACTION ITEMS" line rather than proceeding.
