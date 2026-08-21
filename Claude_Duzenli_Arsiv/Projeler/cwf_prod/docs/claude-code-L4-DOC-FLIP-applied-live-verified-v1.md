# L4 DOC-FLIP — routing_drafts/routing_audit/pinned applied & live-verified · v1

<!-- claude-code-L4-DOC-FLIP-applied-live-verified-v1 · rev 1 · 2026-07-10 · AG-lane
     artifact. Docs/comment-only flip after the Operator's incident-free apply of
     20260710150000_l4_routing_drafts.sql (the GOLDEN-MARK-1/L2/Q-1 DOC-FLIP pattern).
     Anchor: origin/master b4223cd. -->

## 0 · PRE-FLIGHT

```bash
cd <workspace> && rm -rf cwf_yaprak && git clone https://github.com/maymun207/cwf_yaprak && cd cwf_yaprak
git rev-parse origin/master   # EXPECT b4223cdfc66cbc574dcd7f28b5cd4bdbae2cb469 — if moved, STOP and report
```
Branch: `docs/l4-flip`.

## 1 · THE FLIP (grep-driven, comment/prose only — ZERO behavior diffs)

```bash
grep -rn "Operator-pending" --include="*.md" --include="*.ts" docs/ shared/ .agents/ | grep -i "l4\|routing"
```
Flip EVERY L4-scoped occurrence (expected homes: `docs/ARCHITECTURE.md` routing-lifecycle
section, `docs/ROADMAP.md` L4 section, `.agents/CHANGELOG.md` PHASE L4 entry, and the two
`shared/grantPolicy.ts` comment lines for ROUTING_DRAFTS/ROUTING_AUDIT) from
"AUTHORED, Operator-pending" to **"applied & live-verified 2026-07-10"**. The
`grantPolicy.ts` edits are COMMENT-ONLY — the diff must contain no code-token changes
(self-verify below). Do NOT touch narrative tabs, do NOT reseal (docVersion stays rev 62).

Append to the CHANGELOG L4 entry this evidence digest verbatim:

> Operator apply 2026-07-10, incident-free: one clean `db push`
> (20260710150000 only; 4× drop-policy-if-exists NOTICE = idempotence guards on a
> fresh table, benign); schema-read 7/7 gates — `pinned` boolean NOT NULL default
> false · routing_drafts 5 cols / RLS on / 4 owner policies · routing_audit 8 cols /
> RLS on / ZERO policies · privilege layer exact (drafts: anon no writes,
> authenticated own-row; audit: no writes either role) · both tables 0 rows at
> birth; verifyGrants first-exercise **39/39** (37+2 — routing_drafts AND
> routing_audit anon-UPDATE 42501-DENIED); second push "up to date" = idempotence
> confirmed. Two benign Operator deviations (already-authenticated shell skipped
> `login --token` — avoided needless token exposure; standing .env.local copy).
> Noted, not opened: authenticated retains table-level TRUNCATE on owner-CRUD
> tables per the standing tier (RLS doesn't govern TRUNCATE; PostgREST exposes no
> TRUNCATE verb — API-unreachable). Same class as kind_drafts; attached to the
> deferred HARDEN-GRANTS-1, do not build unprompted. ROUTING LIFECYCLE LIVE:
> curation endpoints armed, learn path pin-guard active, lens @preview honest.

## 2 · SELF-VERIFY

```bash
npm ci --no-audit --no-fund && npm run test        # EXPECT 1853 / 174 green (docs cannot move the count)
npm run typecheck:api                              # EXPECT green
npx tsx scripts/checkDocDrift.ts                   # EXPECT [OK] no drift
git diff b4223cd..HEAD --stat                      # EXPECT ONLY the flip files, small line counts
git diff b4223cd..HEAD -- shared/grantPolicy.ts | grep -v "^[+-][[:space:]]*//" | grep "^[+-]" | grep -v "^[+-][+-]"   # EXPECT EMPTY (comment-only)
grep -rn "Operator-pending" docs/ shared/ .agents/ | grep -i "l4\|routing"          # EXPECT EMPTY
```

## 3 · MERGE (on completing §2 — docs-only flips merge without a review stop; the Architect tree-checks after)

`--no-ff` (squash BANNED), message VERBATIM:

```
Merge docs/l4-flip: L4 DOC-FLIP — routing_drafts/routing_audit/pinned applied & live-verified 2026-07-10 (one clean db push [20260710150000 only; 4× drop-policy-if-exists NOTICE = fresh-table idempotence guards, benign]; schema-read 7/7 — pinned boolean NOT NULL default false · drafts 5 cols/RLS on/4 owner policies · audit 8 cols/RLS on/ZERO policies · privilege layer exact · 0/0 rows at birth; verifyGrants first-exercise 39/39 with routing_drafts + routing_audit anon-UPDATE 42501-DENIED; second push up-to-date = idempotence confirmed; incident-free, two benign Operator deviations [already-authed shell skipped login --token, .env.local copy]; authenticated TRUNCATE on owner-CRUD noted → attached to deferred HARDEN-GRANTS-1, API-unreachable via PostgREST; ROUTING LIFECYCLE LIVE — curation armed, pin-guard active, lens @preview honest; docs/comment-only)
```

Report the remote master hash. STOP.

<!-- END · claude-code-L4-DOC-FLIP-applied-live-verified-v1 · rev 1 · 2026-07-10 -->
