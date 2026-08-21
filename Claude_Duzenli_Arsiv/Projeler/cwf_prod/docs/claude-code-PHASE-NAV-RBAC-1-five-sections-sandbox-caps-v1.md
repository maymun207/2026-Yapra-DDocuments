# claude-code — PHASE NAV-RBAC-1 · Five-Section Nav + Sandbox-vs-Global Capability Splits · v1

<!-- v1 · 2026-07-06 · Architect-lane gated phase prompt (written by the Architect, NOT AG).
     Anchor: origin/master `bf3d95d` · 1013 tests / 93 files / docVersion rev 47 / drift [OK].
     Design source: cwf-phase-A-rbac-nav-maker-sandbox-design-v3.md (§1 Phase A scope ONLY).
     Security-relevant (permission matrix + replay endpoint gate split) → FULL RULE-25 review. -->

## 0. PRE-FLIGHT GATE (hard — abort if any line fails)

1. `git fetch origin && git rev-parse origin/master` → MUST print `bf3d95d…`. If not, STOP and report —
   do not proceed on a moved HEAD without Architect sign-off.
2. Working tree clean; branch from origin/master: `feat/nav-rbac-1-five-sections`.
3. **Drift gate green**: run the drift/doc check exactly as CI does → `[OK]` required before any edit.
4. Full test suite green at anchor: 1013/1013. Record the count.

## 1. HARD CONSTRAINTS (violating any = phase rejected)

- **Scope fence — Phase A ONLY.** Do NOT build: kind session-drafts (A2), personal providers / SSRF guard
  / tunnel UI (A3), any quota (B), User Docs page (C). If a change seems to need them, STOP and report.
- **Capability-not-role:** no new role-literal checks anywhere (render or server). All gates via
  `hasPermission`/`can`/`ensurePermission` with PERMISSIONS constants. The one existing display-only role
  branch (Admin vs Settings label in Sidebar) stays as-is.
- **Server is the gate; UI is a hint.** Every surface newly visible to `power_user` MUST be enforced
  server-side by the matching cap. Never ship a nav unlock without its endpoint split in the same commit.
- **Replay endpoint discipline (security artifact):** the GET/POST split must not alter lens semantics —
  lenses stay pure GET, token-free, un-audited, NAME-ONLY, production-core reuse; C9 raw tool payloads
  never cross to the client. POST (paid run) behavior byte-identical apart from the permission constant.
- **Frozen files:** eval-gate machinery, grounding core (`groundingCheck.ts`), trust registry, injection
  boundary, `resolveAuthHeader`, secret-guard modules — byte-identical. `git diff --stat` must show zero
  lines in them.
- **No secrets** in code, tests, fixtures, or the report.
- Diff-scope explicitly PERMITS: `.agents/CHANGELOG.md`, reseal of `public/architecture/manifest.json`,
  and the frontend service method(s) needed for the split — never forbid the changelog.

## 2. GATED SUB-PHASES (complete + self-verify each before the next)

### 2.1 Capability layer (`shared/permissions.ts`, `shared/dbConstants.ts` if needed)
Add three PERMISSIONS constants (follow the `domain:verb` convention):
`REPLAY_LENS: 'replay:lens'` · `PROVIDER_VIEW: 'provider:view'` · `KIND_VIEW: 'kind:view'`.
Add exactly these three to `MAKER_PERMISSIONS`. `ALL_PERMISSIONS` picks them up automatically. `user`
bundle unchanged. Header comments updated (state the sandbox-vs-global principle in one line).
**Gate evidence:** unit tests — `power_user` has each new cap; `user` has none of them; `power_user`
still LACKS `REPLAY_RUN`, `PROVIDER_MANAGE`, `KIND_SOFT_EDIT`, `USER_MANAGE`, `CONFIG_GLOBAL`.

### 2.2 Server splits (the security core)
- **`api/admin/replay.ts`:** every pure-GET path (specimen list, specimen detail, grounding lens, routing
  lens) → `ensurePermission(REPLAY_LENS)`. Every POST/run path (single + mode:'ab') → keep
  `ensurePermission(REPLAY_RUN)` byte-identical in behavior.
- **Providers admin API:** read/list handlers → allow `PROVIDER_VIEW`; every mutating handler → keep
  `PROVIDER_MANAGE`. Audit the file first: if read+write are jointly gated today, split them.
- **Kinds admin API (`api/admin/kinds.ts` + any kinds read path):** read → allow `KIND_VIEW`; POST/PATCH
  (global SOFT writes) → keep `KIND_SOFT_EDIT`.
**Gate evidence (tests, per endpoint):** as `power_user` — replay GET 200, replay POST 403; providers
read 200, providers mutate 403; kinds read 200, kinds write 403. As `user` — ALL of the above 403 (or the
panel-access equivalent). As `super_admin` — all 200. No test may assert on role literals server-side —
mint the context through the real permission path.

### 2.3 Nav IA (`src/components/admin/AdminPanel.tsx`)
Replace `plane: 'govern' | 'microscope'` with `section: 'documents' | 'connection' | 'configuration' |
'microscope' | 'govern'`; render five `SectionGroup`s in this order with TR/EN titles:
DOCUMENTS (Architecture) · CONNECTION SETTINGS (MCP Servers, LLM Providers) · CONFIGURATION (Rules, Kinds,
Routing) · MICROSCOPE (Inspect, Tweak, Replay) · GOVERN (User Management).
`show:` predicates: Kinds → `can(KIND_VIEW) || can(KIND_SOFT_EDIT)`; Providers → `can(PROVIDER_VIEW) ||
can(PROVIDER_MANAGE)`; Replay → `can(REPLAY_LENS) || can(REPLAY_RUN)`; all others unchanged. A section
whose visible items are zero renders nothing (no empty header). Primer collapse⇄expand untouched.
**Gate evidence:** RTL tests — super sees 5 sections incl. GOVERN; power_user sees 4 sections (no GOVERN,
no Users) and DOES see Kinds, LLM Providers, Replay; `user` (no PANEL_ACCESS) unchanged-denied.

### 2.4 In-page honest affordances (UI hints matching the server truth)
- **ReplayTab:** with `REPLAY_LENS` but not `REPLAY_RUN` — specimen browsing + lens buttons fully work;
  run buttons ("A/B çalıştır", Part B run) rendered disabled with a tooltip (TR/EN) "çalıştırma
  super-admin yetkisi gerektirir / running requires super-admin" (Phase B will relax to quota).
- **ProvidersTab:** with `PROVIDER_VIEW` only — registry renders read-only; add/toggle/remove hidden or
  disabled-with-tooltip.
- **KindsTab:** with `KIND_VIEW` only — structures render; SOFT edit affordances hidden (existing
  `canEdit` already keys on `KIND_SOFT_EDIT` — verify, extend only if a load-path is view-blocked).
**Gate evidence:** RTL per tab for the power_user state.

### 2.5 Living-doc lock-step + seal
Architecture doc: nav/plane description updated to the five-section IA; RULE 24 wording in the governing
docs it lives in (in-repo occurrences only) → "sectioned control-plane home"; `manifest.json` resealed;
docVersion **47 → 48**. Two-commit seal (code commit + doc/manifest commit), merge `--no-ff`, push.

## 3. SELF-VERIFICATION (literal evidence in the report — "build green" is NOT evidence)

1. `git rev-parse origin/master` before/after; final merge + remote hash.
2. Full-suite count before (1013) and after (must be strictly greater; list every new test file).
3. `git diff --stat origin/master...HEAD` — full listing; confirm ZERO lines in frozen files by name.
4. Paste the three PERMISSIONS constants + the `MAKER_PERMISSIONS` diff hunk verbatim.
5. Paste the replay.ts gate lines (GET & POST) verbatim, showing REPLAY_LENS vs REPLAY_RUN.
6. Paste the 403/200 matrix test names + their assertions for §2.2.
7. Drift gate output after seal (`[OK]`) + docVersion line showing rev 48.
8. Declare any deviation from this prompt explicitly; undeclared deviation = rejected phase.

<!-- END · claude-code-PHASE-NAV-RBAC-1-five-sections-sandbox-caps-v1 · rev 1 · 2026-07-06 -->
