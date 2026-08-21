# Claude Code — SUPERSET GATEWAY-RULE LIVE REFRESH (activate the P6.8 scope-guards)
**Artifact: `claude-code-PHASE-6_9-superset-gateway-live-reseed-v1.md` · v1 · 2026-06-28**
*(Corrective activation, not a new feature. Makes the already-built P6.8 scope-guards reach runtime.)*

> **Read fully before writing anything.** This is **not** a build phase — it is a **governed-data refresh**
> using machinery that already exists (`governance.resetToReference`). You write ONE thin script + a verify;
> the actual live reset is the **owner's** to run (it writes new published versions to the production
> Supabase). No source/behavioral code changes.
>
> **Why this exists (the trap, verified in code):** `composeSuperset.ts` resolves each kind as
> `pick(governedRows, codeFloor)` — *"governed rows override the baseline; empty → floor."* The Superset
> `superset.gateway_rule` rows in the live DB were seeded at **P6.5**, which **predates** the P6.6/P6.7/P6.8
> gateway-rule work. So at runtime the stale DB rows **override the code floor** and the **P6.8 scope-guards
> are NOT live** — `scope-from-datasource`, `scope-match-or-decline`, `attribute-source`,
> `metric-authority-armes` exist only in the floor and are being dropped. These guards are exactly what
> stops "present Granit data as KB7 OEE." The upcoming 3-provider acceptance test would therefore
> **false-fail**. This refresh republishes the current code reference for that one kind, through the gate,
> so the DB-sourced prompt contains the guards.

---

## 0. PRE-FLIGHT GATE (do all; paste evidence; stop on any failure)

1. `git rev-parse HEAD` → `97406fe…` (B1). Clean tree.
2. **Confirm the override:** `sed -n '29,40p' api/cwf/_lib/knowledge/composeSuperset.ts` → show the
   `pick(byKind(rules, GATEWAY_RULE), GATEWAY_RULES)` line + the "governed rows override the baseline;
   empty → floor" comment. This is *why* stale DB rows hide the floor guards.
3. **Confirm the reference contains the guards:** `grep -n "scope-from-datasource\|scope-match-or-decline\|attribute-source\|metric-authority-armes" api/cwf/_lib/knowledge/backends/superset/gatewayProtocol.ts`
   → all four present in `GATEWAY_RULES`. And `grep -n "GATEWAY_RULES.map" api/cwf/_lib/knowledge/reference/referenceData.ts`
   → confirms `REFERENCE_INSTANCES` spreads `GATEWAY_RULES` (so `referenceSchema.instances` carries all 16,
   incl. the corrected `resource-identifier`).
4. **Read the tool you'll use:** `sed -n '191,205p' api/cwf/_lib/knowledge/governance.ts` →
   `resetToReference(actor, backend, kindId?)`: filters `referenceSchema.instances` by backend (+kind),
   and for each does `createDraft → publish(...,'reset-to-reference')` (so it goes **through the eval-gate**
   and **supersedes** the existing published version; history intact), then audits + invalidates the cache.
5. **Confirm how the governance service is constructed** (service client → `RuleStoreRepository` →
   governance class) by reading the admin publish endpoint's wiring. Your script constructs it the SAME way.

---

## 1. SCOPE (build exactly this — one script + one verify; NOTHING else changes)

### 1.1 `scripts/resetSupersetGateway.ts` (mirror `scripts/seedRules.ts` conventions)
- Get the **service client** from env (`SUPABASE_URL` / `SUPABASE_SECRET_KEY`); if missing, `console.error`
  + `process.exit(1)`. **Never print secrets.**
- Construct the governance service exactly as the admin publish path does (service-role repo).
- Call **`resetToReference(actor, 'superset', 'superset.gateway_rule')`** — `actor` = a clear audit label
  from a const (RULE 1; e.g. `RESET_ACTOR = 'gateway-refresh-script'`), `backend` from the Superset
  `BackendId` const, `kindId` from `SUPERSET_KIND_IDS.GATEWAY_RULE` (no string literals).
- Print `{ reset, failed }`. **Exit non-zero if `failed > 0`** (a reference rule that won't publish is a
  real signal — surface it, do not swallow).
- **Per-kind only.** Do NOT reset the whole Superset backend — only `superset.gateway_rule` drifted; the
  other Superset kinds match their reference and need no churn.

### 1.2 `scripts/verifySupersetGatewayLive.ts` (or extend `scripts/verifySupersetRules.ts`)
A numbered live-proof script (same style as the other `verify*` scripts) asserting the refresh took:
1. The published `superset.gateway_rule` keys = **exactly the 16 reference keys** — no missing, **no orphan**
   (no published gateway key absent from `referenceSchema.instances`). If an orphan exists, REPORT it
   (resetToReference doesn't delete orphans by design; here there should be none).
2. The four guard keys are **published**: `scope-from-datasource`, `scope-match-or-decline`,
   `attribute-source`, `metric-authority-armes`.
3. `resource-identifier`'s published payload is the **corrected, Granit-free** one (matches the code
   reference — no Granit example string).
4. **Runtime effect:** compose the Superset pack via the **DB path** and assert the two eval-gate markers
   (`SUPERSET_REQUIRED_MARKERS` — scope-from-datasource + metric-authority-armes) are present in the
   rendered slice. (Proves the guards now actually reach the prompt, not just the DB.)
- Print numbered PASS/FAIL; exit non-zero on any FAIL.

---

## 2. CONSTRAINTS / TRAPS (any violation = fails review)

- **Gated path ONLY.** Use `resetToReference` (createDraft→publish→gate). Do **NOT** write a raw SQL
  `UPDATE`/`INSERT` or a direct service-role write that sets `status='published'` outside the gate. The
  governance model's whole point is that published writes pass the eval-gate; bypassing it is a RULE
  violation even for the trusted reference.
- **No source/behavioral change.** Only the two new `scripts/*.ts` files (+ docs). Prove it:
  `git diff --stat 97406fe -- api/ shared/ src/` → **empty** (nothing under app code changes). This is a
  data refresh, not a code change.
- **Per-kind, idempotent.** Re-running republishes the reference again (new versions, history grows) —
  safe and reversible. Don't broaden scope to other kinds/backends.
- **Live-write boundary (important).** Running `resetSupersetGateway.ts` mutates the **production**
  governed store (publishes new versions). **AG does NOT run the live reset** unless it holds prod
  service-role env intentionally for this; AG's job is to write + self-verify the script (compiles, logic,
  constructs governance like the admin path, exits non-zero on failure) and hand the owner a clean
  two-command run sequence (§3). If AG can run it against a non-prod/staging DB to smoke-test, good; the
  authoritative live run is the owner's.
- Secrets via env only, never printed. RULE 1 (no literals — kind id, backend id, actor, markers from
  consts). Don't touch CWF-DEMO.

---

## 3. THE RUN SEQUENCE (hand this to the owner, verbatim)
```
# against the LIVE Supabase (service-role env loaded):
npx vite-node scripts/resetSupersetGateway.ts        # expect: { reset: 16, failed: 0 }
npx vite-node scripts/verifySupersetGatewayLive.ts   # expect: all numbered proofs PASS
npx vite-node scripts/verifySupersetRules.ts          # the existing live gate proofs — still green
```
After this, the DB-sourced Superset prompt carries the P6.8 guards → the 3-provider acceptance test is valid.

## 4. DOCS (RULE 3)
- `.agents/CHANGELOG.md`: "Superset gateway-rule live refresh — republished `superset.gateway_rule` to the
  current code reference via `resetToReference` (gated); activates the P6.8 scope-guards that the stale
  P6.5 DB seed was overriding. Data refresh, no code change."
- SKILL KB / ROADMAP: one line that the Superset gateway rules are now governed-current (DB == reference
  for that kind); the P6.8 guards are live via the DB path, not only the floor.
- **Track the UI gap (do NOT build now, just record it):** add a note to the governance-panel backlog —
  *the admin panel has no reset-to-reference button; the endpoint/`resetToReference` exists but is
  script-only. Wiring a gated per-kind "Reset to reference" control is an open P5-panel item.* (This is
  one of the owner's flagged UI gaps; capture it so it isn't lost.)

---

## 5. SELF-VERIFY CHECKLIST (AG report MUST show evidence)
- [ ] Pre-flight §0: HEAD `97406fe`; quoted the `pick(...)` override + comment; the four guards in
      `GATEWAY_RULES`; `REFERENCE_INSTANCES` spreads `GATEWAY_RULES`; the `resetToReference` body.
- [ ] `scripts/resetSupersetGateway.ts`: service client from env (exits if missing); governance service
      constructed like the admin path; `resetToReference(actor, superset, gateway_rule)`; prints
      `{reset,failed}`; exits non-zero on `failed>0`; all ids/labels from consts (no literals).
- [ ] `scripts/verifySupersetGatewayLive.ts`: the 4 numbered proofs (16-keys/no-orphan; guards published;
      resource-identifier Granit-free; DB-path markers present).
- [ ] **No code change:** `git diff --stat 97406fe -- api/ shared/ src/` → empty (paste). Only the two
      scripts + docs are new/changed.
- [ ] `tsc -b` + api nodenext + `vite build` + `oxlint(0)` + `vitest` still green (the scripts don't break
      the build/tests). Report the test total.
- [ ] CHANGELOG + SKILL/ROADMAP updated; the **UI reset-button gap** recorded in the panel backlog.
- [ ] Commit: `chore(governance): live-refresh superset.gateway_rule to code reference (gated
      resetToReference) — activate P6.8 scope-guards over the stale P6.5 seed; scripts only, no code change`.
      Report new HEAD. (The live DB reset itself is the owner's run, §3.)

**Stop conditions:** any reference gateway rule fails to publish (`failed>0`) — surface which and why
(a guard the gate rejects is a real bug, not something to force); a raw non-gated write appears; the
no-code-change diff is non-empty; an unexpected orphan key in the published set.

---

### Note for the owner (you)
AG delivers verified scripts; **you** run the three commands in §3 against live. Expect `{ reset: 16,
failed: 0 }`, then all proofs PASS. Then step 5 (the 3-provider acceptance test) is a valid signal —
run it and paste me the three outputs. The missing reset-to-reference **button** is now logged as a
governance-panel gap (§4) so it isn't forgotten when we return to the UI debt.
