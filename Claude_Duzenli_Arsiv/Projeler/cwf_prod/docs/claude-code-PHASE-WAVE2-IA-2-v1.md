# PHASE · WAVE2-IA-2 — renames sweep · backend-agnostic Rules-split · Tweak IA

<!-- claude-code-PHASE-WAVE2-IA-2-v1 · rev 1 · 2026-07-18 · Architect-authored, owner-endorsed.
     Relay to AG (Author lane) verbatim. FULL ceremony + Operator-applied migration. -->

**PLATINUM compliance:** the Rules-split is DATA-DERIVED and BACKEND-AGNOSTIC —
connecting any future backend (IoT / Ignite / anything) places its kinds into the
right group with ZERO code changes. A backend-name-keyed or hardcoded-kind-list
split is a PLATINUM violation and is forbidden here.

**Naming law (owner-legislated, standing):** every USER-VISIBLE label is chosen
for the image it forms in a HUMAN's head — not what an AI would parse. Test every
label against "what does a person picture when they read this?"

**PRECONDITION (S47-1):** valid ONLY while `origin/master == a21d046` (Merge
FENCE-DB-1) and no other phase is mid-merge on the admin nav/Rules surface. On
mismatch: STOP and report actual `git rev-parse origin/master`.

---

## 0 · Scope reality (already verified — do not re-litigate)

- F33/F45 renames are ALREADY at tab level (`adminTabs.ts:54,57`: `routing → "Araç
  Eşleme / Tool Matching"`, `trust → "Veri Otoritesi / Data Authority"`; inner
  `?tab=` ids stay). This phase finishes the RESIDUE, not the tab labels.
- The existing `RulesTab.tsx:99` family lens (`'all'|'params'|'prompt'`,
  system-lane-only, hardcoded) is REPLACED by a data-derived split.
- `KIND_CLASS` (core/custom) is a lock axis, NOT parameter-vs-rule — do not reuse it.

## 1 · IA-2.a — rename residue sweep (finish F33/F45)

Find every USER-VISIBLE string still rendering "Routing" or "Backend Trust" (stage
cards in `stagesRegistry.ts`, panel copy, buttons, tooltips, deep-link labels) and
change it to the tab labels ("Araç Eşleme", "Veri Otoritesi"). Inner `?tab=` ids,
code identifiers, and test fixtures referencing the ids stay untouched. Add a test
asserting no user-facing render emits the retired labels.

## 2 · IA-2.b — backend-agnostic Rules-split (F46 — the stage-00 pain root)

**Immutable rule:** the split derives from a per-KIND classification, never from
backend id or a hardcoded kind list.

- **G1 · new kind field `surface`.** Add `surface` to the kind definition:
  - `shared/dbConstants.ts`: a `KIND_SURFACE = { PARAMETER: 'parameter', RULE:
    'rule' }` invariant (mirror of the DB CHECK).
  - `KIND_REGISTRY` (kinds.ts / reference): each kind declares `surface`
    (default `'rule'`); `agent.param` = `'parameter'`; everything else `'rule'`.
    A future backend's parameter-type kind is BORN with `surface:'parameter'`
    in its registry declaration — that is the "once for all" mechanism.
  - Migration (Operator-pending): `ALTER TABLE rule_kinds ADD COLUMN surface text
    NOT NULL DEFAULT 'rule' CHECK (surface IN ('parameter','rule'));` then seed
    `UPDATE rule_kinds SET surface='parameter' WHERE kind_id='agent.param';`
    (idempotent; second run no-op). No grants change (a column) — but include a
    verifyGrants no-op confirmation if the family's pattern expects it.
- **G2 · read it through.** Thread `surface` from `rule_kinds` → the kinds
  repository read → the kinds admin endpoint → the client kinds payload
  (additive field, like `class`).
- **G3 · RulesTab first-class split.** Replace the hardcoded family lens with a
  data-derived, ALWAYS-VISIBLE segmented control available for EVERY backend:
  - **"Ayarlar / Parameters"** = kinds where `surface==='parameter'`
  - **"Kurallar / Rules"** = kinds where `surface==='rule'`
  - Build the grouping from the SELECTED backend's kinds' `surface` (via the
    existing `kinds` array — add a `kindSurface` map beside `kindClass`).
  - **empty≠zero:** a group with no kinds for the selected backend is NOT shown
    (ARMES with no parameter-kinds → only "Kurallar" renders; never a fabricated
    empty "Ayarlar").
  - Human labels: a parameter row shows "sayısal ayar / parameter", NEVER
    "(agent.param)" (kills the F-S00-c kind_id jargon leak).
  - One-line header stating the two-box distinction (naming law applies).
  - Stays ONE Rules tab — a prominent lens, not two tabs (deep-links + one
    governance surface intact).
- **Eval-gate untouched:** `surface` is descriptive UI-grouping metadata, NOT a
  gate input — publish semantics, stage order, schema interpreter all byte-identical.
  A test must prove `surface` never reaches `evalGate`/`governance.publish`.

## 3 · IA-2.c — Tweak IA (F23)

Surface the Tweak/Sandbox tab's SESSION-ONLY, non-persisted framing at the top of
the tab ("burada denediğin hiçbir şey kalıcı olmaz — yalnızca senin oturumun").
Naming law applies. (The "Session Sandbox →" arrival strip is F-S00-a's job, next
phase — do NOT build it here; just the tab's own framing.)

## 4 · Gated sub-phases (order)
G1 (field + migration authored) → G2 (read-through) → G3 (RulesTab split) →
IA-2.a (rename sweep) → IA-2.c (Tweak framing) → tests. The migration is AUTHORED
+ Operator-pending; do NOT apply it (Operator lane).

## 5 · Self-verify (evidence in PR)
- [ ] `surface` column migration authored; seed idempotent (second-run no-op shown).
- [ ] A new backend's kind with `surface:'parameter'` would self-place — proven by
      a test that adds a synthetic parameter-kind and asserts it lands in "Ayarlar"
      with ZERO RulesTab code referencing its kind_id or backend.
- [ ] empty≠zero: a backend with no parameter-kinds renders no "Ayarlar" group (test).
- [ ] No user-facing string renders "Routing"/"Backend Trust" (test).
- [ ] `surface` never reaches evalGate/governance.publish (grep + test).
- [ ] No "(agent.param)" kind_id string in a user-facing RulesTab render.

## 6 · Ceremony (FULL + Operator migration)
Fresh clone; unsharded CI on the PR head is the sole test arbiter (S37-2). Mapped
files touched (`shared/**`, `src/**`, kinds reference) → **reseal required** (bump
docVersion, update the affected tabs' notes "below diagram altitude, reseal not
redraw", re-run `npm run reseal`, `check:doc-drift` green). Push branch → CI →
Architect FAST-GATE review → merge `--no-ff` on GREEN CI only → report remote HEAD
hash. The `rule_kinds.surface` migration is Operator-applied AFTER merge (FENCE-first
prompt, G-gates, idempotence probe); DOC-FLIP after live-verify.

## 7 · Collision boundary (S47-1)
F-S00-a (deep-link filter + F42 strip) is the NEXT phase, same nav surface. IA-2
owns labels + the `surface`-derived split; the hotfix owns deep-link target
resolution. IA-2 merges FIRST; the hotfix rebases + reseals to the next rev.

<!-- END · claude-code-PHASE-WAVE2-IA-2-v1 · rev 1 · 2026-07-18 -->
