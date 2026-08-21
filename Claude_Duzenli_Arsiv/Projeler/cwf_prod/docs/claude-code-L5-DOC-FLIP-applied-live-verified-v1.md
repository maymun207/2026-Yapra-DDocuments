# L5 DOC-FLIP — publish_rollouts/rollout_audit/usage_empty_by_fingerprint applied & live-verified · v1

<!-- claude-code-L5-DOC-FLIP-applied-live-verified-v1 · rev 1 · 2026-07-10 · AG-lane
     artifact. Anchor: origin/master eb1e74e (1945 tests / 184 files / docVersion rev 64 /
     drift [OK]). Docs/comment-only + ONE disclosed gap-fill. S34-1 APPLIES: this flip
     touches mapped .ts comments — the reseal rev 64→65 is BUDGETED here, not a deviation.
     The comment-only proof is the comments-stripped byte-compare, never a line-grep. -->

## 0 · PRE-FLIGHT (STOP on any failure)

```bash
cd <workspace> && rm -rf cwf_yaprak && git clone https://github.com/maymun207/cwf_yaprak && cd cwf_yaprak
git rev-parse origin/master     # EXPECT eb1e74e606ebdaffa5fe8b010b36e19046be0bbe — else STOP
npm ci --no-audit --no-fund && npm run test    # EXPECT 1945 / 184 — docs-only work CANNOT move these
npx vite-node scripts/checkDocDrift.ts         # EXPECT [OK], rev 64
```
Branch: `docs/l5-flip`. Push and STOP at the end — merge only on Architect GO with a
verbatim message.

## 1 · THE FLIP (status string: "AUTHORED, Operator-pending" → "applied & live-verified 2026-07-10")

Exact occurrences at anchor (re-grep to confirm before editing; if the set differs, STOP):

1. `shared/grantPolicy.ts` :57 and :58 — the PUBLISH_ROLLOUTS + ROLLOUT_AUDIT provenance
   comments.
2. `shared/dbConstants.ts` :129 and :136 — the two rollout-block comment lines.
3. `api/cwf/_lib/persistence/repositories/PublishRolloutRepository.ts` :4 — docblock.
4. `api/cwf/_lib/persistence/repositories/UsageAnalyticsRepository.ts` :89 — docblock.
5. `public/architecture/diagrams/governance-model.html` :216 (rollout:manage matrix row
   badge) · :298 · :299 (the two table-row badges) · :340 (the v14 log line's status
   phrase). Badge class `s-target` → the applied/live class the L4-flip badges use.
6. `.agents/skills/cwf-project-kb/SKILL.md` :433 (section header status) and :441 (the
   "DB state" bullet — rewrite to applied & live-verified with a ONE-line evidence
   condensation: "one clean push · schema-read 8/8 · verifyGrants 42/42 first-exercise
   3× 42501-DENIED · second push up-to-date").
7. `.agents/CHANGELOG.md` :7 (entry header parenthetical) and :13 (the G1 bullet's bold
   status) — **the L5 entry ONLY**. The historical Operator-pending phrasings in OLDER
   entries (L2-era lines ~119/145/182) are sealed history — DO NOT touch them.

## 2 · CHANGELOG EVIDENCE DIGEST (append, the L4-flip blockquote convention)

Append to the L5 entry's **Verify** section, as a blockquote, this digest VERBATIM:

> Operator apply 2026-07-10, incident-free: one clean `db push` (20260710180000 only);
> schema-read 8/8 gates — publish_rollouts 11 cols exact order · rollout_audit 6 cols ·
> RLS on both · ZERO policies both (absence stated) · privilege layer: NO data
> privileges for anon/authenticated incl. SELECT and TRUNCATE (REFERENCES/TRIGGER
> metadata residue remains — the standing default-ACL class on EVERY server-only table,
> zero migrations revoke them, DDL is API-unreachable via PostgREST; attached to
> deferred HARDEN-GRANTS-1 alongside the TRUNCATE-on-owner-CRUD observation) ·
> one-active-per-family partial unique index exact (UNIQUE btree(family) WHERE state IN
> staged,progressing) · `usage_empty_by_fingerprint` proacl = {postgres, service_role}
> ONLY (no PUBLIC =X, no anon/authenticated) · 0/0 rows at birth; verifyGrants
> first-exercise **42/42** — publish_rollouts anon-UPDATE 42501-DENIED · rollout_audit
> anon-UPDATE 42501-DENIED · usage_empty_by_fingerprint anon-EXECUTE 42501-DENIED;
> second `db push` "Remote database is up to date" (idempotence); three benign Operator
> deviations (already-authed shell skipped `login --token` · `.env.local` copy ·
> workspace-subdir clone — all standing class). ROLLOUT MACHINERY LIVE: human
> ROLLOUT_MANAGE arms armed; the cron arm stays graceful-off (503 naming CRON_SECRET)
> until the env lands.

## 3 · GAP-FILL (disclosed scope — the L5 build's G6 missed these two living docs)

`docs/ROADMAP.md` and `docs/ARCHITECTURE.md` carry ZERO L5 content at anchor (verified:
`grep -in "rollout\|progressive\|L5" docs/ROADMAP.md docs/ARCHITECTURE.md` is empty) —
the L4 precedent updated both in-phase. Repair here, at their existing altitude and
section style:
- ROADMAP: the L5 line/section, status ✅ applied & live-verified 2026-07-10 (born
  post-apply — no 🚧 intermediate state; say so in the line).
- ARCHITECTURE: a progressive-delivery section at the L4 routing-lifecycle section's
  altitude — rollout row + deterministic slice + guardrail actuator boundary (the ONE
  automated act) + one-delta-in-flight + Layer-2-at-the-pointer-flip-only + the cron
  arm posture.

## 4 · RESEAL (rev 64 → 65 — BUDGETED, S34-1)

The grantPolicy/dbConstants comment flips + the governance-model badge flips WILL drift
sealed tabs by construction (the content-hash seal hashes comments). Run the standing
reseal ritual in a DEDICATED commit (the 386e92a precedent): note-append the drifted
tabs (below diagram altitude — governance-model's badge flips are part of its EXISTING
v14 entry, reseal not redraw), recompute hashes, docVersion **rev 65**, drift [OK].

## 5 · SELF-VERIFY (paste evidence)

1. `npm run test` → **exactly 1945 / 184** (docs-only cannot move the count);
   `npm run typecheck:api` green; `npx vite-node scripts/checkDocDrift.ts` → [OK];
   manifest docVersion = "rev 65 · 2026-07-10".
2. Comments-stripped byte-compare (the S34-1 comparator, TS-scanner token streams)
   IDENTICAL vs eb1e74e for ALL FOUR touched .ts files: `shared/grantPolicy.ts` ·
   `shared/dbConstants.ts` · `PublishRolloutRepository.ts` ·
   `UsageAnalyticsRepository.ts` — zero code tokens changed anywhere in this flip.
3. Final grep gates: `grep -rn "Operator-pending" shared api public .agents/skills`
   → EMPTY; `grep -n "Operator-pending" .agents/CHANGELOG.md` → ONLY the historical
   pre-L4 entry lines (the L5 entry clean — list the surviving line numbers so the
   Architect can confirm they are all sealed history).
4. `git diff eb1e74e..HEAD --stat` — every touched path is one of: the seven §1 files,
   the two §3 docs, the seal manifest (+ CHANGELOG per §2). Nothing else.

## 6 · REPORT

Commit hashes (flip commit + reseal commit) + the §5 evidence block + any deviations
(disclosed, never silent). Then STOP for the Architect's review.

<!-- END · claude-code-L5-DOC-FLIP-applied-live-verified-v1 · rev 1 · 2026-07-10 -->
