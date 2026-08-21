# CWF — Session Graph KB · v34

<!-- CWF-SESSION-GRAPH-KB-v34 · rev 34 · 2026-07-10 · Supersedes v33.
     This window: Session 34 — L4 ROUTING-DRAFTS end-to-end (design → build → merge →
     Operator apply → DOC-FLIP) + the L3 canary's first two real firings confirmed. -->

## §1 Session 34 summary

Opened at floor `d87fedd` (v33, verified unmoved via fresh clone). ONE phase shipped
END-TO-END **including its Operator door and DOC-FLIP in the same window** (a first —
prior DDL phases spanned sessions): **L4 ROUTING-DRAFTS** — design v1 (owner-ratified) →
gated prompt → AG build `40cecdb` (RULE-25 PASS, +74 tests / +4 files) → merge `b4223cd`
(tree==reviewed tip, verbatim message) → deploy sha-matched → Operator apply
(incident-free, verifyGrants 39/39) → DOC-FLIP `b3e8148` (reseal rev 62→63, disclosed &
accepted). Floor at close: **b3e8148 = 1853 / 174 / rev 63 / drift [OK]**. Program spine:
L1 ✅ Q ✅ TRUST-PANEL-1 ✅ L2 ✅ OBS-ENDPOINT-1 ✅ GOLDEN-MARK-1 ✅ L3 ✅ **L4 ✅** →
L5 PROGRESSIVE DELIVERY next.

## §2 Decisions (owner-ratified, design v1 D1–D9)

- **Scope = the LEARNED map lifecycle only.** Static `CATEGORIES` governance and
  `ALWAYS_INCLUDE` union rows explicitly deferred with named triggers. Routing stays the
  SOFT axis: FINDS, never KNOWS; the code floor inside `routeKeywordLayer` is untouchable
  (below-floor structurally impossible — proven again by the floor test).
- **Steerable learning = `pinned`.** Machine learn-path is a two-step write
  (insert-do-nothing + update-where-unpinned) that CANNOT clobber a pin; human edit/publish
  auto-pins (an unpinned human edit would be re-learned over = a ghost edit); unpin is the
  explicit return-to-machine-territory act; **Clear preserves pinned** (curation ≠ cache).
- **ONE `mutateAndBump` seam** = the ghost-publish guard: every live curation mutation
  does row write(s) + exactly ONE epoch bump + audit row(s), never separable; a
  multi-keyword publish is ONE bump. Unconfigured client THROWS (ghost-success banned).
- **`routing_audit` ledger IS the version history**; point revert = apply a row's
  `before` (itself audited). No snapshot machinery. Machine learn writes NO audit rows.
- **Lens `@preview` honest at last** = live ∪ the CALLER's OWN drafts (`set` override /
  `remove` tombstone); identity from adminGuard ctx ONLY — a supplied userId param is
  refused (impersonation door slammed); no-identity degrades to floor, never
  "everyone's drafts". Probe bench: pure `routeKeywordLayer` over arbitrary text,
  zero tokens.
- **C-H dead-draft door:** the learned-map lookup is per-extracted-word and
  `extractKeywords` drops ≤2-char words — so a draft keyword must be ONE whitespace-free
  lowercase token, length ≥3, 422 otherwise (an unmatched-able draft is rejected honestly,
  not stored silently dead). Categories validated against the code manifest at PUT AND
  re-checked at publish.
- **Caps:** `ROUTING_DRAFT` (maker, KIND_DRAFT precedent) · `ROUTING_EDIT_GLOBAL` first
  enforcement (super; publish/row-CRUD/pin/revert/audit-read) · `ROUTING_CACHE_CLEAR`
  unchanged but unpinned-only now.

## §3 Verified state deltas

| Commit | What | Floor |
|---|---|---|
| `32908de`…`40cecdb` | L4 G1–G6 (7 commits, branch, REVIEWED) | (branch) |
| `b4223cd` | Merge feat/l4-routing-drafts (--no-ff, tree==40cecdb) | 1853 / 174 / rev 62 |
| `7a6ad86`+`386e92a` | DOC-FLIP + deviation reseal rev 62→63 | (branch) |
| `b3e8148` | Merge docs/l4-flip | **1853 / 174 / rev 63 — floor at close** |

DB deltas (Operator, live-verified): `tool_category_cache.pinned` (boolean NOT NULL
default false) · `routing_drafts` (5 cols, RLS on, 4 owner policies, anon writes revoked)
· `routing_audit` (8 cols, RLS on, ZERO policies, writes revoked both roles) · both
tables 0 rows at birth · verifyGrants **39/39** (37+2 first-exercise 42501-DENIED) ·
second `db push` "up to date" (idempotence). Deploys: `dpl_9cq6TUcy…` (b4223cd) and
`dpl_7AnmMM1b…` (b3e8148), both READY/production/sha-matched via Vercel MCP.

**L3 canary: LIVE and now ROUTINE.** First real firing on the L4 merge push —
run `Build and Test @ b4223cd` completed SUCCESS; runtime logs literal
`17:50:39 GET /api/admin/eval-ci 200` + `17:50:40 POST 200` (the workflow's exact
GET-converge-then-POST choreography); timing-safe pass ⇒ GitHub+Vercel secret copies
consistent; `goldenSet:absent` arm by construction + zero-spend timing. Second firing on
the flip push (18:22, GET+POST 200). No standing canary confirm item remains.

## §4 Process notes (Architect-owned — two prompt errors owned out loud)

- **Architect error 1 (phase prompt §4):** the verifyGrants grep assumed inline table
  literals; RULE 1 mandates `DB_TABLES.*` constants, so AG's `grep -c` legitimately
  returned 0. AG's implementation was MORE correct than the check. Lesson folded into
  S32-1 practice: self-verify greps must match the target file's actual authoring
  discipline, not an imagined one.
- **Architect error 2 (DOC-FLIP prompt):** "do NOT reseal (rev stays 62)" was JOINTLY
  UNSATISFIABLE with the same artifact's mandates (flip every L4 occurrence incl. the
  `.ts` comments + final grep EMPTY + drift [OK]) — the content-hash seal
  (`mappedContentSha`) hashes mapped `.ts` files INCLUDING comments, so the mandated
  comment flips drift two tabs by construction. AG resolved it correctly via the standing
  RULE-20 ritual in a dedicated, fully-disclosed commit (`386e92a`, note-append + reseal
  rev 62→63) rather than papering over or silently skipping. → **S34-1**.
- AG's §2 comment-only grep gate was also structurally unpassable for trailing comments;
  AG substituted a comments-stripped byte-compare — the Architect reproduced it
  independently at tree-check (both `.ts` files IDENTICAL comments-stripped). The
  byte-compare is the canonical comment-only gate going forward (part of S34-1).
- **GH Actions jobs API rate-limit worked AROUND, not waited out:** run-level Actions
  call succeeded once; job-level detail was reconstructed from Vercel runtime logs (the
  GET+POST endpoint choreography is job-ran evidence — a skipped job produces zero
  requests). Automation-first pattern to keep: **the endpoint's request signature in
  Vercel logs is a rate-limit-proof Actions witness**.
- Operator's TRUNCATE observation (G2-f): authenticated retains table-level TRUNCATE on
  owner-CRUD tables — standing tier posture (anon-only revoke), NOT an L4 regression;
  RLS does not govern TRUNCATE but PostgREST exposes no TRUNCATE verb (API-unreachable).
  Attached to deferred HARDEN-GRANTS-1; recorded in the flip's evidence digest, not buried.
- Operator deviation (benign, new class member): already-authenticated shell SKIPPED
  `login --token` — avoided needless token exposure; arguably safer than the script.

## §5 Standing addition

- **S34-1 — DOC-FLIPs touching mapped `.ts` files MUST budget a reseal:** the
  content-hash seal hashes comments, so a comment-only status flip in a mapped `.ts`
  file drifts its tabs by construction — "docs-only, no reseal" and "flip the `.ts`
  comments" cannot both be mandated. And the comment-only proof is a
  **comments-stripped byte-compare**, never a line-grep (trailing comments defeat
  line-based filters). The L4 DOC-FLIP (`386e92a`) is the precedent.

<!-- END · CWF-SESSION-GRAPH-KB-v34 · rev 34 · 2026-07-10 -->
