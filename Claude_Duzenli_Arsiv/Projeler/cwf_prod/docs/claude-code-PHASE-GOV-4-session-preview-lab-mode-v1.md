# Claude Code — PHASE GOV-4 · Session-Preview + Lab Mode
**rev 1 · 2026-06-28 · base HEAD `7156f0c` · canonical repo `cwf_yaprak`**

Governance redesign **step 4** — the dev environment. A **power_user** (maker) can preview drafts and flip diagnostic toggles **for their own session only**; a super_admin too. This is the mechanism that also unblocks **correct, apples-to-apples OEE testing** (the routing-bypass toggle makes a non-Anthropic provider see the full tool set, like Anthropic — the decisive Phase-F experiment).

**This phase is categorically different from GOV-2/3.** It is the **first touch of the request path (`api/cwf/chat.ts`)** — the safety boundary. The injection points are localized (verified at `7156f0c`):
- Lab flags ride `req.body` alongside `forceProvider` (chat.ts ~L367), validated server-side.
- Routing-bypass injects at the provider split (~L517: `if (provider === 'anthropic')`).
- Knowledge-source / draft-preview inject at `dbKnowledgeProvider.warm(message, { backends })` (~L638).
- Auth role (`auth.role`, ~L361) and the `emit()` telemetry helper (~L426) are in scope for authorization + audit.

It also **activates the reserved permissions** `LAB_TOGGLE_SESSION` and `RULE_PREVIEW_SESSION` (commented `// step 4` in `shared/permissions.ts` since RBAC-1). Grant **and** enforce them **in this same phase** — never grant ahead of enforcement (the RBAC-1.1 matrix-honesty rule).

---

## HARD PRE-FLIGHT GATE — verify and paste
1. `git rev-parse HEAD` → `7156f0c` (or report). `git status --porcelain` clean.
2. Confirm the injection points still read as above: `grep -nE "forceProvider|provider === 'anthropic'|dbKnowledgeProvider.warm|auth.role" api/cwf/chat.ts | head`.
3. Confirm the reserved perms exist and are NOT yet granted: `grep -nE "LAB_TOGGLE_SESSION|RULE_PREVIEW_SESSION" shared/permissions.ts` (reserved constants, not in any role set).
4. Confirm the eval-gate engine location (must stay byte-identical): `api/cwf/_lib/knowledge/gate/evalGate.ts`.

---

## HARD INVARIANTS (this phase lives or dies by these — each is PROOF-REQUIRED)
1. **Non-lab path is BYTE-IDENTICAL.** When no lab flag is present, or the caller is not authorized, the request path behaves **exactly** as today — same tool set, same knowledge slice, same prompt, same blind-spot. All lab logic is **additive**, guarded by `if (labActive)`. Prove the non-lab branch is unchanged.
2. **Lab mode is READ-ONLY against global state.** Lab flags may change only one user's **read** path (tool selection, knowledge source, draft preview). **No** publish / write / mutation path is reachable from a lab flag. The overlay never writes `domain_rules.published`, `rule_kinds`, or `tool_category_cache`. Prove no write is reachable.
3. **Lab flags are SERVER-AUTHORIZED.** Only a caller with `LAB_TOGGLE_SESSION` (power_user / super_admin) is honored. A plain `user`'s lab flags are **dropped** (ignored + audited), never trusted. The client cannot self-grant. Prove a `user`'s flag is ignored.
4. **The blind-spot SURVIVES every lab path.** `knowledgeSource: 'floor'` serves the **code floor** (which CONTAINS the blind-spot: IKINCILUST barcodeless, empty≠zero, etc.) — never "no knowledge". Knowledge is never turned off. Prove the floor path still carries the blind-spot.
5. **The eval-gate is untouched.** Lab mode does not touch publish/gate. `git diff` on `evalGate.ts` + the gate stages = empty.

---

## HARD CONSTRAINTS
- Secrets via env only; never print tokens/keys. RULE 1 (flag names, limits centralized).
- This phase DOES touch `api/cwf/chat.ts` and `DbKnowledgeProvider` — deliberately and surgically. It must NOT change `gateway.ts`, grounding, `evalGate.ts`, the prompt packs' content, or the admin write endpoints.
- Audit every lab activation via the existing `emit()` (a `lab_mode` telemetry event with the active flags + role). No PII beyond what telemetry already carries.
- Legibility (GOV-2) preserved in any new UI; chat shell of normal users untouched.

---

## GATED SUB-PHASES

### 4A — Lab flag channel + server-side authorization (the gate)
- Read `labMode` (and `previewDrafts`) from `req.body` next to `forceProvider`. Validate the shape (a typed `LabMode = { routingBypass?: boolean; knowledgeSource?: 'db' | 'floor'; previewDrafts?: string[] }`).
- **Authorize:** compute `labActive = hasPermission(auth.role, LAB_TOGGLE_SESSION) ? sanitized(labMode) : null`. A caller without the permission → `labActive = null` (flags dropped); emit an audit note that an unauthorized lab flag was ignored.
- Activate `LAB_TOGGLE_SESSION` + `RULE_PREVIEW_SESSION` in `shared/permissions.ts`: add to `power_user` (MAKER) and `super_admin` sets; update `permissions.test.ts` accordingly (grant + enforce together).
- Emit `lab_mode` telemetry when `labActive` is non-null.

**Gate:** with no flag → `labActive` null (path unchanged); a `user` with a flag → null + audit; a power_user with a flag → sanitized `labActive`.

### 4B — Routing bypass (CP4) — the OEE unblocker
At the provider split (~L517): change the full-set condition to `provider === 'anthropic' || labActive?.routingBypass`. When bypassing, the non-Anthropic request uses the **same full sorted tool set** the Anthropic path uses (skip `filterToolsByMessage`) — so the canonical OEE tools (`getDailyOeeValues` / `getOeeValuesForZones`, currently uncategorized → normally filtered out) are reachable. Do **not** alter the Anthropic or default-filter branches.

**Gate:** a non-Anthropic request **with** `routingBypass` carries the full tool set (the canonical OEE tools present); **without** it, the behavior is unchanged (still filtered).

### 4C — Knowledge source + draft preview (CP1) — read-only overlay
Extend `dbKnowledgeProvider.warm` to accept optional lab options: `{ ..., labSource?: 'floor', previewDrafts?: string[], previewUserId?: string }`.
- `labSource: 'floor'` → serve the **code floor** instead of the DB published slice for this request (the floor carries the blind-spot — invariant 4).
- `previewDrafts` → additionally serve the **maker's own draft** versions of the named rules, scoped to `previewUserId` (the caller). Read-only; no publish.
- Pass these from chat.ts (~L638) only when `labActive` says so. Default call (no lab) is unchanged.

**Gate:** `labSource:'floor'` serves the floor slice (blind-spot present, proven); `previewDrafts` serves the caller's drafts; **no** global write occurs (proven).

### 4D — Admin Lab panel + session banner (UI)
- A **Lab** tab (capability-gated on `can(LAB_TOGGLE_SESSION)` — hidden/disabled for plain users) with toggles: **Routing bypass (full tool set)**, **Knowledge source: DB / code-floor**, **Preview my drafts**. These set the flags attached to **this user's** chat requests (client-side session state; reuse the `forceProvider` attach path).
- A persistent **banner** while any lab flag is active: `SESSION · dev — changes affect only your session, not global`. Auto-clears when toggles are off / session ends.
- Inline help: one line stating lab mode is session-only and never writes global.

**Gate:** a power_user can flip routing-bypass and run a chat that uses the full tool set, with the banner showing; toggling off restores normal behavior; a plain user has no Lab tab.

---

## SELF-VERIFICATION CHECKLIST — PROOF-REQUIRED
- [ ] Pre-flight 1–4 pasted.
- [ ] **Invariant 1 (byte-identity):** a request with **no** lab flag yields the same tool set + knowledge slice + prompt as `7156f0c` (show the non-lab branch is additive-only; diff the changed lines and confirm the `else`/default path is unchanged).
- [ ] **Invariant 2 (read-only):** grep/argue that no lab branch reaches a publish/write; lab options affect only `filterToolsByMessage` selection and `warm()` reads.
- [ ] **Invariant 3 (authorization):** a `user` with `labMode` → flags dropped (`labActive` null) + audit emitted; a power_user → honored. Paste both.
- [ ] **Invariant 4 (blind-spot survives):** `labSource:'floor'` serves the floor slice that still contains the IKINCILUST empty≠zero blind-spot. Show it.
- [ ] **Invariant 5 (gate untouched):** `git diff 7156f0c -- api/cwf/_lib/knowledge/gate/evalGate.ts` empty.
- [ ] **OEE unblock proof:** a non-Anthropic request **with** `routingBypass` carries the canonical OEE tools (full set); **without**, they're filtered out (the Phase-F asymmetry, now switchable for testing).
- [ ] Reserved perms activated: `LAB_TOGGLE_SESSION` + `RULE_PREVIEW_SESSION` now in power_user + super_admin; `permissions.test.ts` updated and green (grant + enforce same phase).
- [ ] `lab_mode` telemetry emitted on activation.
- [ ] UI: power_user sees the Lab tab + banner; plain user does not. Legibility preserved (banned-token grep empty).
- [ ] `git diff --stat 7156f0c..HEAD` — touches `chat.ts`, `DbKnowledgeProvider`, `permissions.ts`(+test), admin Lab UI; **not** `gateway.ts`, grounding, `evalGate.ts`, prompt-pack content, admin write endpoints.
- [ ] `tsc -b` + typecheck:api + `vite build` + `oxlint` + `vitest` green — paste numbers.

---

## STOP
Do **not** build the Tool Routing tab / `tool_category_cache` surface (step 5). Stop after the checklist and present the report **with the byte-identity proof, the OEE-unblock proof (full set with bypass vs filtered without), the blind-spot-survives-floor proof, and the empty gate diff**. Then state:

> **"GOV-4 complete — session-preview + Lab mode live; lab flags server-authorized (power_user/super_admin only, user flags dropped); routing-bypass unblocks apples-to-apples OEE testing (full tool set on demand); knowledge-source/draft-preview read-only overlay; non-lab path byte-identical; blind-spot survives the floor; eval-gate untouched; LAB_TOGGLE_SESSION/RULE_PREVIEW_SESSION granted+enforced together. Ready for step 5 (Tool Routing tab) — and the Lab routing-bypass is now available to run the Phase-F OEE parity test."**
