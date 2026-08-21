# PHASE E-HARDEN-1 — rules-create guards + MCP save round-trip + gateway tabulation + discover attribution · v1

<!-- claude-code-PHASE-E-HARDEN-1-v1 · rev 1 · 2026-07-12 · Session 38, E-stream support batch.
     Lane: AG (Author). CEREMONY PROFILE: FULL — api/** touch, multi-file, gated sub-phases,
     full-suite verification, PR-fired CI, Architect RULE-25 recount.
     Origin: four production defects found during the owner's live E.2 walk, each diagnosed to
     file:line by the Architect. The eval-gate held throughout (no corrupt rule reached the
     agent); these are the missing CHEAP guards in front of it, plus two serving-quality fixes. -->

## 0 · HARD PRE-FLIGHT (gate)
```bash
git fetch origin && git rev-parse origin/master     # expected cefe52e… or the E-DOC-1 merge if it
                                                    # landed first — RECONCILE with the Architect if
                                                    # anything else. Record your anchor.
git status --porcelain                              # MUST be empty (dirty-tree tripwire)
git switch -c e-harden-1 <anchor>
npx vitest run --reporter=dot | tail -3             # record full baseline (2052/200 at cefe52e)
npm run check:doc-drift                             # [OK]
```

## 1 · BINDING CONSTRAINTS
- **C-1** No eval-gate machinery change: staging ENGINE + STAGE ORDER + schema interpreter stay
  byte-identical. Sub-phase A adds a guard BEFORE the gate (at draft creation), never inside it.
- **C-2** empty≠zero render law untouched: the honest "not available to tabulate" fallback stays
  for genuinely-missing results; sub-phase C only fixes the lookup for results that EXIST.
- **C-3** Secrets: the discover log/span gains server.id + error message ONLY — never headers,
  tokens, or full URLs with credentials.
- **C-4 Doc lock-step (S34-1 — budget the reseal):** `api/admin/rules.ts` and
  `governance.ts` are mapped in a sealed narrative tab. Update the affected tab's narrative in
  the SAME commit + `npm run reseal` + bump docVersion **rev 69 → rev 70**. Paste the doc diff.
- **S37-2 flow:** push → **open a PR** (that is what fires CI) → CI green → Architect RULE-25 →
  merge only with the verbatim message.

## 2 · SUB-PHASES (gated; complete + self-verify each before the next)

### A — RULES-CREATE-MISMATCH-1 (api + client): backend is derived from the KIND
Anatomy (Architect-verified): picker unfiltered (`RulesTab.tsx:344`) · client stamps the header
backend (`adminStore.ts:239`) · server accepts the mismatch (`api/admin/rules.ts:57-63`); only
the publish gate's REFERENTIAL stage catches it, as a vanishing toast.
1. **Server (source of truth):** in the POST handler, resolve the kind's OWN `backend_id`
   (governance service / kinds lookup). Use THAT for `ensureBackendScope` + `createDraft`.
   If `body.backendId` is present and ≠ the kind's backend → `400 { error: 'kind belongs to
   backend <x>' }`. A kind that doesn't exist → 400 (probably already handled — verify).
2. **Client picker:** filter `kinds` (and the `kindDrafts` extension) to `selectedBackendId`
   in the New-draft Select — mirroring `KindsTab.tsx:35`. The `system` lane needs no special
   case: `system` is a selectable header backend.
3. **Client error legibility:** a publish rejection renders a PERSISTENT inline verdict in the
   detail panel (failed stage + reason), not toast-only. Reuse the green "Published — gate
   passed" panel's visual as its red sibling ("Gate rejected — REFERENTIAL: …").
4. Tests: server (in `api/cwf/__tests__` — vitest include footgun): mismatch→400,
   derived-backend create→draft row carries the KIND's backend; client: picker shows only the
   selected backend's kinds; publish-reject renders the inline verdict.

### B — MCP-UI-REWRITE-1 (client): the settings save round-trips untouched elements
Repro (live-confirmed): editing/re-adding ONE server via MCP Settings rewrote the whole
`servers` array and reset another element's `enabled:false` to `true` (it undid an Operator
change silently). Find the save path in `MCPSettingsTab.tsx`; the fix contract: **elements the
user did not touch are round-tripped byte-exactly** (enabled flags, unknown/extra fields —
tolerate fields the UI doesn't know, e.g. `backend_id`, future keys). Test: an array with one
`enabled:false` element + one element carrying an unknown field survives a save of a DIFFERENT
element with both intact.

### C — VIZ-GATEWAY-1 (client): gateway `call_tool` results tabulate
Live repro material: the persisted assistant message of production trace `93d277b7` (and
`e7002f22`) — `raw_tool_results` = [search_tools array, call_tool ERROR string, call_tool
success `{"datasets":[…45]}`] (in `e7002f22`'s case) — yet the `[TABLE_FROM_TOOL]`(call_tool)
macro rendered the "not available to tabulate" fallback. Diagnose FIRST with a fixture copying
that exact shape (`MessageChartContent.tsx:42 matchResult` + `tableData.findRecords`): find
whether the miss is the error-string entry shadowing, the `{"datasets":[…]}` derivation, or the
macro/toolName mismatch — report the mechanism before fixing. Fix contract: the most recent
**non-error, row-derivable** result of the named tool tabulates; a genuinely absent/empty
result keeps the honest fallback (C-2). Tests: the three-entry fixture tabulates 45 rows; an
all-error fixture still falls back honestly.

### D — Discover-log attribution (api, tiny): duplicate names become distinguishable
`mcpDiscovery.ts` catch: the error line becomes
`[MCP Discover] <name> (id=<server.id>, backend=<backend_id||'default'>): <err.message>` and
the span gains the server-id attribute. C-3 applies. Test: a failing-discovery unit asserts the
id appears in the logged line (spy on console.error).

## 3 · SELF-VERIFY (evidence, literal)
- Full suite before/after counts (unsharded locally is fine as a smoke — **CI on the PR is the
  real experiment**); every new test enumerated per sub-phase.
- `tsc -b` + `typecheck:api` clean · `check:doc-drift` `[OK]` post-reseal · docVersion rev 70.
- `git diff --stat <anchor>..HEAD` pasted; scope = the files named above + their tests + the
  resealed tab + manifest.
- Push `e-harden-1`, open the PR, report head SHA + CI run. **Do not merge.**

<!-- END · claude-code-PHASE-E-HARDEN-1-v1 · rev 1 · 2026-07-12 -->
