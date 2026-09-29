ADVERSARY-VERDICT: GREEN pr=636 head=15b2b1e14cb4fe0d41839570138d6a4abb1ebc36 · LANDED merge=ee12161ecad43b338489e85fcb73df1e08aa8ac0

SCOUT-STATUS-LAND-SCOUT-LOOP-S163-1 · scout-1 · reply to ORDER-SCOUT-LAND-SCOUT-LOOP-S163-1 (bus 5c44e112-6a96-44dc-9218-7bd691256802, [DIGEST-OK] md5 8ca824cb4d3f1e0d02931cb7786152b5)

BOOT: gate probe BLOCKED (GB-4) · MCP fence BLOCKED (GM-1) · tree: local HEAD 2a6f6781 was stale vs origin ed033de0; git fetch; free.md byte-identical at origin/master; mail-wait.mjs differs only in the preflight tsx invocation. Card read gave [PREFLIGHT-UNMEASURED] (tsx listen EPERM in sandbox - the defect origin/master already fixes; my clone predates it). Card DELIVERED UNCHECKED; proceeded on its authority.

1 · PR/MASTER. gh pr list --state open → exactly one: #636 phase/scout-loop-s163-2 head 15b2b1e14cb4fe0d41839570138d6a4abb1ebc36 (read before and again before the status post). git ls-remote origin refs/heads/master x2 → ed033de062dfc869850a35e40f1b39094dd24ea3.

2 · SHAPE. git log --format='%H %P' origin/master..15b2b1e1 → ONE commit, ONE parent (ed033de0).
Fence (report at head, line 114) vs diff (12 paths): diff − fence = ∅. fence − diff = {scripts/authorityMatrix.mjs, api/cwf/__tests__/authorityMatrix.test.ts, docs/ground/authority-conformance.latest.md} — NOT ∅ as the order expected. FINDING, NON-BLOCKING: an over-declared fence. mergeGuard enforces OUTSIDE-FENCE (diff ⊆ fence) and FENCE-GREW only; the three extras are exactly the POST-LANDING-1 pair plus the restored conformance doc, and `git diff ed033de0 15b2b1e1 --` those three → empty. Only cost: a wider COLLISION footprint (0 other open PRs).
Carry fidelity: git diff a4d21a7a 15b2b1e1 over the 12 paths + authorityMatrix pair → ONLY authorityMatrix.mjs (RULED_NONCLAIMING_AUTHORS back to ['operator','scout'] and its comment) and authorityMatrix.test.ts:244 pin. No other byte. (The unrestricted pathspec shows 32 files: master's own movement between the two bases.)

3 · MIGRATION FULL READ (20260929030000_scout_addresses_and_reply_ack.sql).
- scout_reply(p_reply_to uuid, p_from text, p_artifact_name text, p_body text): `SECURITY DEFINER` + `SET search_path TO 'public', 'pg_temp'`. Old 3-arg dropped, not overloaded.
- Refusals vs the live text quoted in CARD-SCOUT-LOOP-S163-1-v3 (RELAYED: Architect's pg_get_functiondef; GM-1 prevents my own live read; scout_reply is in no migration - two greps): body null, `body exceeds 8192 characters (length: %)`, artifact_name empty, reply_to required, `does not name an existing to_lane row addressed to scout` - all byte-identical. Target widened to `lane_addr in ('scout', 'scout-1', 'scout-2')`.
- SR001: `if p_from is distinct from v_target_lane then raise ... using errcode = 'SR001'` (also refuses NULL p_from). Insert lane_addr = p_from.
- Grants: revoke from public, anon, authenticated; grant to public, anon, authenticated, supabase_read_only_user, service_role (+postgres owner) = live set {PUBLIC, postgres, service_role, supabase_read_only_user, authenticated, anon}. No new role.
- relay_adversary_gate_check vs 20260911180000: identical except `= 'scout'` → `in ('scout','scout-1','scout-2')` (EXEMPT ack) and `<> 'scout'` → `not in (...)` (GREEN verdict). Pinned by adversaryGate.test.ts:434-443 (expected derived from the old file by exactly those two replaces; expected ≠ before asserted). $probe$ not re-run (:446).
- DO $widen$: per table, drops checks matching lane_addr AND 'scout'; `if v_found <> 1 then raise exception` - raises unless exactly one; inside begin/commit so a raise rolls the drops back. Re-added named.
- Data: no DELETE/TRUNCATE/UPDATE. Only insert of two factory_state rows `on conflict ... do nothing`; constraints only widen.
- Fast gate: mail-wait diff = replyAckClause(lane) appended in the 5 builders, '' when LANE_ADDR matches; --take on AG-n still stampConsumed. mailWaitScoutAck.test.ts exists; (c) asserts each builder('AG-2') toBe a literal PRE string (spelled line by line, not derived), plus a RED-capable mutant.
- NOTE for operator/boot: after apply the 3-arg scout_reply no longer exists; free.md at master must carry p_from (this PR updates it) or every scout reply fails.

4 · NO-HARDCODE. git grep -n -E "armes|ARMES|Armes|superset|machine-knowledge-base" at 15b2b1e1 over the 12 paths → no output; git diff -G same pattern ed033de0..15b2b1e1 → no output; positive control (scout-1|SR001) → hits. Clean.

5 · CI at 15b2b1e14cb4fe0d41839570138d6a4abb1ebc36 (check-runs by full sha, read twice; total_count=8): Auto-merge landing success · report-schema success · Relay corpus success · Build and Test success (build (24.x) completed 04:26:09Z after 2 named waits of 120s; changes success; rule26 success). eval-canary SKIPPED by design (named, not folded). Vercel Preview Comments success.
`[merge-guard] VERDICT GREEN` (changes job, 04:08:53Z; CLEAN-MERGE no in-branch merge; FENCE-GREW ok; timeline ok; COLLISION 0 other open PRs).

6 · STATUS: adversary/scout success posted on 15b2b1e1 at 2026-09-29T04:28:35Z (status id 55142897473). Landing: master read 1 ed033de0; read 2 ee12161ecad43b338489e85fcb73df1e08aa8ac0. gh pr view 636 → MERGED 2026-09-29T04:29:07Z, mergeCommit ee12161e. Content: git diff --stat 15b2b1e1 ee12161e → empty (tree identical).

DARK: live scout_reply/grants re-read (GM-1; RELAYED only) · card preflight (UNMEASURED, stale clone) · migration NOT applied (operator's, post-landing).
Sandbox note: gh needed the sandbox lifted (x509 OSStatus -26276 inside it); read-only calls plus the one status post.
No edit, push, merge, re-run, dispatch or cron by this window. Released nothing; held nothing.
