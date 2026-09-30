# CWF-S166-PLAN-v1
Architect, S166, 2026-09-30T18:45Z. Owner order 21:37 TSİ: landing throughput is item ONE ("ACILEN çözüm ... TARİHLER DEADLY").

## 0 · DIAGNOSIS (MEASURED 18:38–18:44Z, bridge gh.sh read-only token)
- Pipeline speed when lanes are live: PR 646 opened 06:24:39Z → merged 06:57:06Z (32 min); PR 647 07:03:44Z → 07:34:09Z (30 min). Both merged by github-actions[bot] (auto-merge). The machine lands in ~30 min.
- PR 648 opened 07:38:14Z, armed 07:38:25Z, merged by owner hand at 14:40:08Z: the 7 h stall sits inside the Mac network outage (07:42Z–13:53Z, register 170). Loss = network, not the pipeline.
- Ruleset on master (rules/branches/master): required_status_checks with strict_required_status_checks_policy = TRUE (branch must be up to date) + 5 contexts (changes, rule26, build (24.x), relay corpus (grammar v1), adversary/scout). With strict ON, every landing makes every other open PR BEHIND → merge master + new CI (Build and Test ≈ 13–17 min) + new scout status. That is what makes "one PR at a time" the only workable mode.
- mergeGuard.mjs runGuard COLLISION (L494–522): two open PRs are allowed when their fences are DISJOINT; on overlap the higher number yields. The guard already serializes only what truly overlaps.
- Repo is private and user-owned (maymun207) → GitHub merge queue is not available (org-only). NOT the path.
- auto-merge.yml already reads `secrets.ADF_MERGE_TOKEN || github.token`; with github.token a merge does NOT start master's push CI (file's own comment).
- Lost today: ~7 h network (170), 2 red M3 cycles from Architect instructions (FENCE-GREW; 173/A-REC-S165-4), 1 auto-merge stall (169, unmeasured).

## 1 · ITEM ONE — LANDING-THROUGHPUT-1 (register row 177, new)
Target: from ~3 landings/day to one landing every ~30 min, several in parallel.
1a. PARALLEL PRs NOW: SD2 (AG-4), vectorLane (AG-1), SD1 (AG-1 after vectorLane or scout-free AG) re-picked onto current master and opened AT ONCE, next to M3. Guard COLLISION decides overlap by fence; disjoint ones land in parallel. WHEN: orders sent the turn the owner approves; landings expected within ~60 min.
1b. STRICT OFF (owner's surface, 2 min): ruleset master-merge-gate → uncheck "Require branches to be up to date before merging". Effect: a landing no longer invalidates the other green PRs. WHEN: tonight, owner.
1c. SAFETY FOR 1b: owner creates Actions secret ADF_MERGE_TOKEN (fine-grained PAT, cwf_yaprak only, Contents RW + Pull requests RW). auto-merge.yml already uses it → merges are by the owner's token → master push CI runs after every landing; red master = stop the line, Architect orders the fix the same tick. WHEN: tonight, owner (secret = owner-only surface).
1d. NETWORK RESILIENCE (register 170): card to AG-4 — mail-wait.mjs retries READ-FAILED/PROXY-REFUSED with bounded backoff instead of exiting; a window survives an outage and resumes by itself. NEW subject → scout-1 pre-review first (§12.1). WHEN: card tonight, landed by ~23:30 TSİ.
1e. AUTO-MERGE STALL (169): scout-2 measures after M3 lands; until then every land order keeps the 10×60 s wait + owner ⚡.
1f. CARD ERRORS: scout pre-review on every new-subject card; proof budget (173); fresh-branch carry, never fence growth.

## 2 · THEN (unchanged from bootstrap v171, now parallel where fences allow)
M3 (163, in flight, AG-3) → Operator ⚡ migration 20260930060000 the landing turn · 175 test-root card · 167 K41 exam measure · 168 model-text (scout first) · 171 · 174 · M4b bar ⚡ (160) · doc repo push (AG-4) · close set at turn 20.
END · CWF-S166-PLAN-v1
