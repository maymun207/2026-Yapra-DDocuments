# CWF — Open Items Register · v22
<!-- rev 22 · 2026-07-06 · Supersedes v21. Delta: the ENTIRE MCP-config line closed. Four phases built→RULE-25 PASS→activated this session: MCP-SECRET-REF-1 (b165c34, rev 42), MCP-DONE-1 (f020712, rev 43, secret store), MCP-BACKEND-ID-1 (9dda837, rev 44), MCP-HEADERS-1 (c9f34cf, rev 45). MCP configuration screen CLOSED under RULE 29 (§1–§9). Global armes + global Superset LIVE (Superset = streamable-http + apiKeyRef:supersettoken + backend_id:superset; probes ok, log-verified). Multi-user auth by reference; daily rotation UI-only. master HEAD c9f34cf (940 tests / 89 files / docVersion rev 45 / drift [OK]). -->

---

## ✅ CLOSED THIS SESSION — the MCP-config line (RULE 29 §1–§9 CLOSES the screen)
- **MCP-SECRET-REF-1** (`b165c34`, rev 42) — secret-by-reference `apiKeyEnv` for global servers; ONE `resolveAuthHeader`; `^MCP_[A-Z0-9_]+$` exfil bound (resolve-time). RULE-25 PASS.
- **MCP-DONE-1** (`f020712`, rev 43) — the isolated **`mcp_secrets`** store (service-role-only, RLS+REVOKE both directions; `mcp_secret_audit` append-only, NO value column) + `apiKeyRef` (UI-rotatable secret) + gated `/api/admin/mcp-secrets` (names-only GET, value never echoed) + async resolver precedence `apiKey→apiKeyRef→apiKeyEnv→none`. Migration authored+**Operator-applied**+confirmed. RULE-25 PASS. RULE 29 (§1–§7) pinned.
- **MCP-BACKEND-ID-1** (`9dda837`, rev 44) — `backend_id` threaded through the frontend type + JSON import (`evaluateStrictEntry`) + Add/Edit form (Select from `adminStore.backends`, NOT an enum) + mask-verbatim. Absence still defaults to armes. RULE 29 §8. RULE-25 PASS.
- **MCP-HEADERS-1** (`c9f34cf`, rev 45) — guard refined from "any headers" → **`isCredentialHeader`** (credential NAME-list ∪ `Bearer `/`Basic ` VALUE-marker); non-secret `Accept`/`Content-Type` legitimate on global; mask shares the one predicate. **Required-URL** for non-stdio (form + `isValidServerEntry` server belt) — fixes the silent url-less-row defect. RULE 29 §9. RULE-25 PASS (security-guard loosening, full review; existing block cases unchanged).
- **Activation (owner, log-verified):** global armes (`apiKeyRef:armes-daily-token`) + global Superset (`streamable-http` + `apiKeyRef:supersettoken` + `backend_id:superset`, token rotated) both probe `ok`. Multi-user ARMES/Superset served from one global entry each; daily rotation = one UI Rotate, no Vercel, no redeploy.

## 🟢 MCP-CONFIG SCREEN = CLOSED (RULE 29, nine invariants — do NOT reopen for a UI/UX pass)
Personal value-secrets (owner-RLS) · global reference-secrets (`apiKeyRef` store / `apiKeyEnv` env) · UI-only rotation no-redeploy · value never client-bound · guard fail-closes on values (credential headers by name+value) · one `resolveAuthHeader` · import round-trips all fields · backend identity settable from UI · non-secret transport headers legit + required URL. Future MCP changes fit INSIDE this contract.

---

## 🔴 LIVE QUEUE (committed, ordered — next session)
1. **Part A widen — routing, then scope/authority.** REPLAY-A1 proved the deterministic per-stage-replay harness (grounding). Widen the SAME lens to routing, then scope/authority. Short design note before each phase prompt. Security-relevant → full review; keep OUT of UI-polish phases. (Part-A UI naming collision still tracked.)
2. **Endpoint switcher / "Sayfa 3"** — gated admin UI to point Langfuse at AWS ↔ local Docker ↔ other. `/api/admin/observability` is GET-only; move target env→governed config (DB-first/code-floor) + gated write UI + selector. **Config/secret split now INHERITS the `mcp_secrets` store pattern:** host/projectId = non-secret soft config (DB-editable); keys = secret (the `mcp_secrets` store via a ref, resolved server-side — same discipline as `apiKeyRef`).
3. **GOVERN polish — continued.** MCP screen done. Remaining: owner's other GOVERN rough-spots (runtime, needs the owner's live list) + tracked MCP follow-ups (JSON-edit masked round-trip view; probe auto-poll).
4. **P7** — Superset empty≠zero runtime validator (3rd defense layer, no fragile regex; Superset at 2 vs ARMES's 3).
5. **ARMES-401 — REFRAMED (not a recurring bug).** The daily-token-expiry window; static bearer, no refresh; manual daily renewal. Now largely SUBSUMED: ARMES is a global `apiKeyRef:armes-daily-token` row → daily rotation is one UI Rotate on the `armes-daily-token` secret (no per-user rows, no Vercel). Residual manual step = obtaining the ARDIC token (source-blocked).

---

## 🛠 DEFERRED / HARDEN-LATER (do NOT build unprompted)
- **AWS-DENY-1** (before next re-provision): DENY `ssm:SendCommand`/`ssm:StartSession` (crown jewel), `ec2:ModifySnapshotAttribute`/`ec2:ModifyImageAttribute`, `iam:AttachRolePolicy`/`iam:UpdateAssumeRolePolicy`. NEVER deny `ec2:ModifyInstanceAttribute` (the apply uses it).
- **Multi-user Langfuse SSO** — rising as the multi-user end-user product lands.
- **AWS README harden-later**: OIDC→role, permissions-boundary, Elastic IP, CloudFront↔origin secret, MinIO media endpoint.

## 🟡 TRACKED-SMALL / DOC-DEBT
- REPLAY-A1 edit-diff limitation (floor-first union suppresses edits to existing floor-id rules — ADDs only; not a safety defect).
- Part-A UI naming collision (UI "Part A · single-request replay" ≠ REPLAY-A1's grounding lens under Part B).
- MCP-UX JSON-*edit* masked round-trip view + probe auto-poll (still user-triggered).
- `replay_audit outcome.status=null` on 3 CHAR-1 rows · GAP-4 prose · `[ToolFilter] Learned` dedup · `act()` RTL warnings in `replayTab.test.tsx`.

## 👤 OWNER-OWNED (manual)
- **Daily Superset/ARMES rotation (now trivial):** Secrets → Rotate `armes-daily-token` / `supersettoken` → paste raw token (no "Bearer "). One place, all users, no redeploy.
- (If any old per-user personal ARMES/Superset rows linger, they're now redundant — the global `apiKeyRef` rows serve everyone. Optional cleanup.)

## Verified anchors
- **Repo** `maymun207/cwf_yaprak` master HEAD **`c9f34cf`** — **940 tests / 89 files** / docVersion **rev 45** / drift `[OK]` (fresh-clone RULE-25 verified).
- Session chain (from v21 close `2f94a66`): `2612859`·`8771680`→`7960a01`·`b165c34` (SECRET-REF-1, rev 42) → DONE-1 `…`·`f020712` (rev 43, migration applied) → BACKEND-ID-1 `db976da`·`9dda837` (rev 44) → HEADERS-1 `9632000`·`c9f34cf` (rev 45).
- **Prod** serves `c9f34cf` (`dpl_38LGE7QP…`). Global armes + Superset probe `ok` (log-verified 10:27 UTC).
- **mcp_secrets** live: `armes-daily-token`, `supersettoken` (both set; service-role-only; UI-rotatable).
- **AWS host** unchanged: `i-030c2b4fadebfa229`, `dl3644f5a7fnn.cloudfront.net`, `cwf-prod`, eu-central-1; bootstrap key DEACTIVATED; `cwf-budget-stop` STANDBY ($50).
- **Session artifacts** (versioned): `claude-code-PHASE-MCP-SECRET-REF-1-…-v1.md`, `claude-code-PHASE-MCP-DONE-1-…-v1.md`, `claude-code-PHASE-MCP-BACKEND-ID-1-…-v1.md`, `claude-code-PHASE-MCP-HEADERS-1-…-v1.md`, register v22, KB v22, bootstrap v22.
