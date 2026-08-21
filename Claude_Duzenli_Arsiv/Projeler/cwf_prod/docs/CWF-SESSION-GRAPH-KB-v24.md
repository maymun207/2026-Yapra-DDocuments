# CWF — Session Graph KB · v24
<!-- rev 24 · 2026-07-07 · Supersedes v23. Ground truth = repo CHANGELOG at master HEAD `3dd0a95`.
     This window: (1) closed the Replay-microscope loop with OWNER-OBSERVED-LIVE + Operator audit-shape
     verification; (2) opened the sandbox-vs-global RBAC line and shipped its first two phases — NAV-RBAC-1
     (five-section nav + maker view/lens caps + server gate splits) and KIND-DRAFT-1 (SOFT-kind session-draft
     sandbox, migration APPLIED). master HEAD `3dd0a95` (1074/103, rev 49, drift OK).
     Queue: cwf-open-items-register-v24.md. -->

## §0 One-paragraph state
This window did two things. First, it took the Replay microscope from code-verified to **owner-observed-live
+ audit-verified-live**: the owner clicked ①–④ through the UI, I confirmed the Part A A/B run from Vercel
logs (POST 200, tool results **replayed from the recording** — proving no live-backend re-hit and that
ARMES-401 cannot block replay — full 32-hex trace id), and the Operator (Gemini/Supabase MCP) read the live
`replay_audit` rows to confirm the paired-audit shape carries only counts/rates/delta, no reply/payload/secret.
Second, and larger, it opened the **sandbox-vs-global RBAC line** and shipped **NAV-RBAC-1** (five-section
admin nav + three new maker view/lens caps + the security-core server gate splits) and **KIND-DRAFT-1** (a
SOFT-kind session-draft sandbox on a new non-governed owner-RLS table, with the frozen eval-gate engine
untouched and publish kept global-only). Both fresh-clone RULE-25 verified; KIND-DRAFT-1's migration was
Operator-APPLIED with a schema-read confirmation. master HEAD `3dd0a95` (1074 tests / 103 files / rev 49 /
drift OK).

## §1 The governing principle established this window (locked)
The owner set the axis that all sandbox RBAC follows: **developer plays with EVERYTHING in their own sandbox
(session/draft/preview); the ONLY gated line is GLOBAL (publish/commit) = super_admin.** Promotion of proven
sandbox work to global is a human act (verbal/email), not an in-system workflow. This replaced the
Architect's initial coarser "view vs act" framing — the owner's question "developer neyi develop edecek? if
they can't tweak, how do we expect them to develop?" was the correction that sharpened it. One categorical
exception: CORE kind structure is code-Zod-locked for everyone. Phase sequence locked: **A → A2 → A3 → B →
C** (nav+caps → kind sandbox → provider sandbox → quota → User Docs), with the scope/authority lens deferred
below the sandbox line.

## §2 What shipped (fresh-clone RULE-25 verified)
- **NAV-RBAC-1** (`e5b678a`, rev 48, 1013→1036) — `plane`→`section` (visual grouping only; no toggle) → five
  `SectionGroup`s. `REPLAY_LENS`/`PROVIDER_VIEW`/`KIND_VIEW` added to `MAKER_PERMISSIONS` (no privileged cap
  leaked). Server splits: `replay.ts` GET-first-stmt `ensurePermission(REPLAY_LENS)`, POST-first-stmt
  `REPLAY_RUN` before any spend/audit; providers `method==='GET'?VIEW:MANAGE`; kinds GET=VIEW/write=SOFT_EDIT
  (role-literal `ensureSuperAdmin` removed). Nav `show:` = OR(view-or-action) so both roles see the tab, the
  server decides the DO. Gate tests use the REAL `ensurePermission`+`ROLE_PERMISSIONS` (mock only `authed`).
- **KIND-DRAFT-1** (`3dd0a95`, rev 49, 1036→1074) — the rules draft pattern does NOT copy (`rule_kinds` PK =
  kind_id, no status/owner), so a **new non-governed owner-RLS `kind_drafts` table** holds per-user drafts,
  never joined by any production read. The kind def is already a PARAMETER to the frozen eval-gate, so the
  overlay is additive at the resolution seam only: `resolveKindWithDrafts(global, callerDraft)` — CORE always
  wins, else caller's SOFT draft overrides an absent/SOFT global. Seam 1 (`governance.ts` create/updateDraft,
  actor-scoped; `resetToReference`/`rollbackToVersion` opt out via `consultCallerDrafts:false`). Seam 2
  (`composeLabSlice` consults caller drafts STRICTLY inside the `previewUserId` block → production
  byte-identical). Publish stays global-only. Migration authored → **Operator-APPLIED** (schema-read: RLS
  true, exactly 4 owner-scoped policies, no service-role read, UNIQUE(user_id,kind_id)).

## §3 Key learnings (this window)
- **The right RBAC axis is sandbox-vs-global, not view-vs-act.** "Can the developer see it" is the wrong
  question; "can they change GLOBAL state" is the line. Sandbox (draft/preview/personal-row) is free;
  global publish/commit is super. This maps cleanly onto capabilities and onto the existing personal/global
  MCP pattern.
- **Adding a maker surface is a capability + a server split, never a nav flip.** Visibility ≠ enforcement:
  every nav unlock shipped WITH its endpoint gate split in the same commit, and the gate tests are minted
  through the real permission bundles (remove a cap from `MAKER_PERMISSIONS` and the test fails at the
  capability layer, not a mock).
- **A sandbox for governed DATA is a non-governed overlay, not a governed-table mutation.** `kind_drafts` is
  a separate owner-RLS table; the eval-gate engine stays byte-identical because the kind def was already a
  parameter — the only change is WHICH def reaches the existing call site, guarded to the caller's own
  drafts and to the preview path. Production reads never see drafts.
- **Publish-stays-global is the load-bearing safety boundary.** A rule authored against a draft-only kind
  previews but cannot publish (publish resolves the kind globally → not found → gate stops). You cannot
  accidentally promote a sandbox-only artifact to production.
- **Honest boundary over silent magic (Seam-2 novel-kind).** A novel draft kind's instances don't render in
  the lab slice (composers render only known-registry kinds); the AG declared the boundary rather than
  hacking the composer. Shadow-drafts preview fully; author+validate+rule-draft works for both. Tracked for
  an owner decision.
- **Two-gate migration discipline held under pressure.** "Migration authored ≠ applied." The Operator lane
  initially could not apply (Supabase MCP unauthorized) and CORRECTLY refused to improvise `supabase db push`
  against production (fence said MCP-only + don't work around); once the owner authorized the connector, the
  same Operator prompt applied it and a schema-read confirmed the live shape. Authored → applied → verified,
  as two separate gates.
- **Wilson-CI honesty, demonstrated live.** The three real reps=3 A/B rows all showed `distinguishable=false`
  with overlapping Wilson intervals [0, 0.561] — not "no effect" but UNDERPOWERED. The lens measures
  absence/emptiness, not reply length (a perturbed arm shortened output 365→30 tokens without emptying it).
  This is the worked example the committed textbook doc must teach.
- **Owner-observed-live is a distinct verification class.** Code-verified + Vercel-log-verified (my side) +
  UI-observed (owner) + Operator-DB-verified together closed the microscope loop from both ends.
- **Process:** AG asked "should I design the spec/split?" twice → the Architect directed "implement to the
  Architect's prompt exactly; do not re-model" (phase prompts are the Architect's, not AG's). The Architect
  also dropped a reflexive habit (tacking "token rotation" onto every response) after the owner flagged it —
  surface a manual action only when it's real.

## §4 Verified anchors + commit ledger
- master HEAD **`3dd0a95`** — 1074 tests / 103 files / docVersion **rev 49** / drift `[OK]`.
- From v23 close `bf3d95d`: NAV-RBAC-1 `19747b7`→`12695d4`→ merge **`e5b678a`** (rev 48, 1013→1036) →
  KIND-DRAFT-1 `a7b64b9`→`3c415ac`→ merge **`3dd0a95`** (rev 49, 1036→1074).
- **`kind_drafts` migration APPLIED** (Operator/Supabase MCP, project ref `fjbrkimwvtpwoxhziidh`; 9 cols,
  RLS true, 4 owner-scoped policies, no service-role read, UNIQUE(user_id,kind_id)).
- Prod serves the latest master deployment. `mcp_secrets`: `armes-daily-token`, `supersettoken` (UI-rotatable).
- AWS unchanged: `i-030c2b4fadebfa229`, CloudFront, `cwf-prod`, eu-central-1; bootstrap key DEACTIVATED;
  `cwf-budget-stop` STANDBY. RULES current through RULE 29.

## §5 Open queue → cwf-open-items-register-v24.md
LIVE (next, in order): **A3 — Personal Provider Sandbox** (design note + prompt) · **B — Replay quota**
(monthly + super manual reset + no-limit + usage view; personal-key spend quota-exempt-but-audited) ·
**C — User Docs page** (hosts the textbook explainer) · **Part A widen — SCOPE/AUTHORITY** (deferred here) ·
endpoint switcher · GOVERN polish · P7. STANDING DELIVERABLE: `cwf-governance-replay-explained-v1.md`
(textbook, with the reps=3 Wilson-CI worked example). DEFERRED: AWS-DENY-1 · Langfuse SSO · novel-kind
preview follow-up · provider config drafts · kind-draft versioning. Tracked-small: novel-kind preview,
grounding clean-badge green, InlineHelp localStorage, routing preview, perturbation single-shot label, etc.

<!-- END · CWF-SESSION-GRAPH-KB-v24 · rev 24 · 2026-07-07 -->
