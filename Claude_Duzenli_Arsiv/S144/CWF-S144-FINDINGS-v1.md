CWF-S144-FINDINGS-v1

The findings S144 measured, by name. Cut at the close of S144, 2026-09-20T04:42Z. Each lives in register v134 §2 too.
Every finding carries its fix and its date (owner standing rule, 2026-09-10).

## A · PRODUCT / INFRASTRUCTURE

- **F-S144-VECTOR-REPAIR-HAS-A-WRITE-PATH-NOW-1** — item 11 had a diagnosis (S142) and no repair path short of a full
  terraform apply. S144 cut CARD-VECTOR-ORIGIN-REPAIR-S144-1-v2 (scout GREEN, verdict row c5171a93, canonical sha256
  504b16a9af603b9db5f4e589678c8073ebc657a23d495c884179871ab481d60b): a dispatch-only workflow that rewrites exactly the
  two vector origin DomainNames, dry-run by default, pre/post structural diff. FIX: AG-4 builds it (in flight at close:
  `.github/workflows/vector-origin-repair.yml` + `api/cwf/__tests__/vectorOriginRepairWorkflow.test.ts`, uncommitted on
  branch phase/vector-origin-repair-s144-1, read 2026-09-20T04:41Z). WHEN: PR + landing first thing S145; dry-run +
  write + vector-live-proof under OWNER-APPROVAL-S144-PLAN-1 the same day (before 2026-09-21 evening TSİ).
- **F-S144-ITEM5-IS-PROBABLY-THE-VECTOR-LANE-1 (CLAIM, unmeasured)** — `pathB/bm25.ts` is imported only by
  `vectorLane/encoder.ts:40`; `rrfFuse` lives in `vectorLane/incumbentEngine.ts:86`. Item 5 "channel-2 BM25+RRF" may be
  the vector lane itself, dark because of item 11. FIX: read the turn path's caller of the vector lane before cutting
  any item-5 card. WHEN: S145, right after the vector proof.
- **F-S144-F-S117-HALF-LANDED-1** — `stageClarify.ts:895` already widens to every enabled layer when the scoped layer
  is EMPTY. The open half is a POPULATED child layer not narrowed by the resolved parent (parent_param promotion);
  `GraphKbReader.parentsOf` still has no caller. FIX: item 7 becomes a wiring card "resolved parent → child layer
  parent_param scope". WHEN: S145, after the A23 archive search (the A23 runbook file in docs/design/ contains none of
  "ask-shape", "parent_param", "collapse" — one probe, not an absence; search the project box and Claude_Duzenli_Arsiv
  by name first).

## B · FACTORY / TOOLING

- **F-S144-SCOUT-API-401-AFTER-CLEAR-1** — scout read the ruleset with HTTP 200 at 2026-09-20T04:07:35Z; the /clear'ed
  scout window got HTTP 401 on the same endpoints at 04:34:49Z ("token in keyring is invalid"). Without a working API
  read the scout cannot post adversary/scout, so every landing blocks. FIX: ORDER-SCOUT-AUTH-READ-S144-1 (bus row
  4074ab16, 04:40:40Z) discriminates OK <path> / EXPIRED / UNMEASURED; if EXPIRED, the owner refreshes the token (a
  secret, his surface) with one step. WHEN: answered on the bus before AG-4's PR; read first thing S145.
- **F-S144-SCOUT-NODE-FETCH-BLIND-TO-PROXY-1** (reported by the scout 04:34Z) — undici ignores HTTPS_PROXY unless
  NODE_USE_ENV_PROXY=1; every node-fetch box read fails without it. FIX: a lane card setting NODE_USE_ENV_PROXY=1 in the
  lane launch environment or the read helper. WHEN: S145 queue position after item 28.
- **F-S144-TSX-EPERM-IN-SANDBOX-CONFIRMED-1** — tsx IPC bind EPERM again (scout, S144); `architect:open` and
  cardPreflight cannot run under tsx in a sandboxed window; the scout runs the gate under plain node with a resolver
  hook. MERGED-INTO F-S143-TSX-IPC-EPERM-IN-LANE-WINDOWS-1 (item 19).
- **F-S144-CP3-REJECTS-RELAYED-AND-RECALLED-1** (scout, on CARD v1) — CP-3 accepts MEASURED/UNMEASURED/… but not the
  house's own RELAYED:/RECALLED: provenance words; a card honestly labelling a relayed fact goes red. FIX: add
  RELAYED and RECALLED to CP-3's accepted set, one small lane card, NEW subject → scout. WHEN: S145 queue after item 28.
- **F-S144-BOOT-TEXT-TOOK-AN-ANSWERED-ORDER-1** (Architect error) — the post-/clear boot text said "oldest unconsumed
  card"; lanes answer but do not mark consumed, so the scout redid ORDER-SCOUT-OPEN-READ-S144-1. FIX (applied 07:36 TSİ):
  every "kartını oku" now names the card; the bootstrap's boot text carries the card name slot.
- **F-S144-ARCHITECT-GIT-STATUS-LEFT-INDEX-LOCK-1** (Architect error) — `git status` from the bridge VM in the shared
  code clone left `.git/index.lock` (the VM cannot unlink), which would have blocked AG-4's commit. FIX (applied): lock
  removed under the owner's delete grant; the Architect reads the code clone only with GIT_OPTIONAL_LOCKS=0. Same
  trap met twice in the doc repo on update-ref/commit; removed each time.
- **F-S144-SCOUT-SAW-AUTOMERGE-DISABLED-AFTER-THE-ENABLE-1** — AG-4 enabled auto-merge.yml at 2026-09-19T19:43:16Z
  (read-back active), yet the scout's 20:45Z read reported disabled_manually. Today (04:07:35Z) it is active. The
  20:45Z reading is unexplained. FIX: none needed for today's state; recorded so the discrepancy is not re-derived.
- **F-S144-CLAUDE-OUTPUTS-IN-CODE-CLONE-1** — 37 Architect documents (S139–S141) sat untracked in the code clone's
  `Claude outputs/`. FIX (applied, owner "onay outputs-tasi"): cmp-verified copy to
  Claude_Duzenli_Arsiv/Claude-outputs-S139-S141/, sources removed; doc-repo commit 6194e01f.
- **F-S144-EIGHT-STALE-WORKTREES-1** — shared clone lists 8 worktree records (4 prunable from S141 scratchpads, 4
  locked from an old session). FIX: an AG-4 hygiene card (prune only, no branch deletes without RULE-49). WHEN: S145.

## C · OWNER RULINGS AND CONTRIBUTIONS (by name, S112-YASA-1)

- OWNER-RULING-S144-PENALTY-DATE-1 — the penalty date is **22 Eylül 2026** (corrected from "22 Agustos").
- OWNER-RULING-S144-CLEAR-PER-CARD-1 — "onay kart-basina-clear": one card per lane session; /clear + boot text after
  each slip. The owner raised the problem (long lane sessions compact, burn tokens, lose focus).
- OWNER-RULING-S144-ONE-PLAN-ONE-APPROVAL-1 — his words "sen plani yaz tek bir onay al yuruyelim": per-item approvals
  replaced by one approval of a written plan; only an out-of-plan step, a destructive act or new spend returns.
  OWNER DESIGN CONTRIBUTION; the Architect's blind spot was that per-item gating had become the bottleneck.
- OWNER-APPROVAL-S144-PLAN-1 — "onay plan-S144", 07:41 TSİ: covers the seven steps in CWF-S144-SESSION-CLOSE-v1 §4,
  including the CloudFront write when the dry-run shows its three conditions.

END · CWF-S144-FINDINGS-v1
