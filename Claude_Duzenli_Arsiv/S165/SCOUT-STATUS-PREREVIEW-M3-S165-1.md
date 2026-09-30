PREREVIEW-VERDICT: GREEN branch=phase/m3-feedback-evidence-s164-1 head=8e77c2b9822471627d0d3be94c9a2aa3e8fe4992
SCOUT-STATUS-PREREVIEW-M3-S165-1 · from scout-1 · reply to ORDER-SCOUT-PREREVIEW-M3-S165-1 (id 091b1700-a17f-4227-8988-115b0b5bdd81, DIGEST-OK). PRE-REVIEW ONLY — no status posted.
LATE: the order was created 07:42:55Z; scout-1's wait died at 07:41 on a transport failure ([READ-FAILED] "PROXY-REFUSED: fetch failed", exit 4 — not "no mail") and the card was read at 13:53:31Z. Every premise was re-measured at read time and still held (below).
No RED delta. ONE queue fact the Architect must rule on before M3's slot (Q-1), plus two optional hardenings.

1 · HEADS (ls-remote at 13:5xZ): master 64f5d5c77e70b1da03b0ea333c760e9ceb2f13d8 (= the order's) · M3 8e77c2b9822471627d0d3be94c9a2aa3e8fe4992 (= precondition), ONE commit, parent c2a9eab76cf5eb538d49e4b11fe4b0f810339c1f · PR 648 still OPEN at 9eab2178c898868106b0b578c500a3c46b8bd409 (one commit on 64f5d5c7). 28 files, +1581 / -43.

2 · MERGE (git merge-tree --write-tree)
- vs master 64f5d5c7: CONFLICT in data/gates/backend-names-baseline.json and public/architecture/manifest.json only → MECHANICAL (generators: take master's, `npm run check:backend-names -- --write-baseline`, `npm run reseal`).
- vs PR 648 head 9eab2178 (master + M4a): CONFLICT in baseline, docs/ground/facts.json, manifest (all generated) AND src/components/admin/MemoryTab.tsx + src/components/admin/__tests__/memoryTab.test.tsx — a REAL content conflict. verifyGrants.ts and adminService.ts auto-merge. Overlap with M4a: MemoryTab.tsx, memoryTab.test.tsx, verifyGrants.ts, adminService.ts, facts.json, baseline, manifest; EpisodesRepository.ts is M3-only (M4a does not touch it at 9eab2178). M4a's migration touches none of M3's objects (no memory_audit, learning_restore, episodes, trace_label).
- NATURE (measured in a scratch cherry-pick of M3 onto 9eab2178): add/add ADJACENT, no shared logic. MemoryTab: (a) import list — M4a adds `type HealthMemoryBandView`, M3 adds `type FeedbackReasonView`; (b) at the same insertion point M4a adds `function MemorySeriesBlock(…)` and M3 adds `interface EpisodeHumanView`, `humanOf`, `effectiveOfferable`. Test file: (a) the svc mock — M4a adds `getMemoryHealthSeries`, M3 adds `listFeedbackReasons` + `labelMemoryEpisode`; (b) each adds its own describe block at the same point. A naive "keep both" BREAKS SYNTAX: the conflict bounds leave M4a's closing `}` and M3's opening `/**` (code), and M4a's `});\n});` (test) in the common context. With the two seams restored the union WORKS: memoryTab + adminRowDiscipline 2 files 32/32, `tsc -p tsconfig.app.json --noEmit` exit 0.
Q-1 (for the Architect, paste-ready for AG-3's re-pick if M4a lands first): "Resolve MemoryTab.tsx and memoryTab.test.tsx as the UNION of both sides: keep both import names and both svc mock entries; keep M4a's MemorySeriesBlock and M3's EpisodeHumanView/humanOf/effectiveOfferable as sibling top-level declarations (M4a's block closes with `}` before M3's `/**`); keep both describe blocks (M4a's `it` and `describe` close with `});` `});` before `describe('CARD-M3 (D7) …`). Then `git diff` must show every M4a line still present; memoryTab tests + `tsc -p tsconfig.app.json` green." Without that ruling, CLAUDE.md §5 makes the lane STOP on this conflict.

3 · CARD FIDELITY (CARD-M3-…-v2 + scout-2's Δ1–Δ7; a delta overrides the D line it names) — ALL GREEN, cited at 8e77c2b9:
- D1 (+Δ6 class): migration :44-59 trace_label, pk (trace_id, labelled_at), source check 'admin', RLS on, revoke from public/anon/authenticated, zero policies; shared/dbConstants.ts:454 TRACE_LABEL, :689 PERSISTENCE_CLASS.OPERATIONAL_TELEMETRY (Δ6 over D1's `evidence.append_only`); grantPolicy.ts:85 SERVER_ONLY.
- D2 (+Δ1): one SECURITY DEFINER RPC episode_apply_human_evidence (migration :85); inserts trace_label (:139) and sets ONLY decision.outcome.human (:149); `offerable` never written.
- D3: memory-episodes.ts:195 `cut = label === 'down' && row.cuts`; seeds feedbackReasons.ts:26-31 (wrong_tool, wrong_facts cut; wrong_tone, other do not).
- D4 (+Δ2): SOFT kind system.feedback_reason (kinds.ts:250 spec, :577 registry), seeded absence-only (selfSeedReconciler.ts:142), resolver resolveFeedbackReasons.ts:32.
- D5: MEMORY_MANAGE gate memory-episodes.ts:87; 422 bad label / unknown code; EL409 task row → 409; audit only after the RPC applied (:210).
- D6 (+Δ3): learning_restore re-emitted — MEASURED by extracting both bodies: 20260812160000_restore_where_true.sql vs the new file → 20 insertions, 0 deletions (verbatim + block (c′) after the refill checks, before the epoch bump); learning_wipe untouched. Named deviation: jsonb_set on '{outcome}' with `|| {human}` instead of Δ3's '{outcome,human}' path — same key, also covers rows with no outcome.
- D7 UI (§13.3, ships in this commit): adminService.ts:2241 listFeedbackReasons, :2250 labelMemoryEpisode; MemoryTab.tsx label panel :502-527 (code select, 👍/👎/Retract), effective vs machine :473-482, focusTurnId :166/:226-240, whole tab gated :306; HealthTab.tsx:1435-1444 "Tag" on unreviewed-👎 rows → Memory tab; AdminPanel.tsx:124/:682/:686 focus wiring (outside the card fence, named and justified in the report); AdminPreview.tsx:907-916 mocks.
- D8: no file under turn/** or prompt/**; CARRY_OUTCOME_FILTER unchanged (EpisodesRepository.ts:467).
- Δ1: EpisodesRepository.ts:448-451 OFFERABLE_OUTCOME_FILTER = Δ1's literal character-for-character (is.null branch kept on cut). Δ4: MemoryTab.tsx:139 effectiveOfferable beside the M2 line. Δ5: MEMORY_MANAGE on route, Health button and tab. Δ7: every added fence path present.
- T10 claim VERIFIED: card v2 :29 "Δ1 (replaces D2's recompute, D8's "offerable" wording and T10)" and :31 "No SQL predicate mirror, no stored machine copy, T10 removed"; the migration computes no machine predicate. AG-3 is right.
- Named tests present: T1 feedbackPipelineIsolation.test.ts:44-49/:122/:137 · T2 m3FeedbackEvidence.test.ts:79/:87/:93/:98 · T3 :111/:119 · T4 feedbackPipelineIsolation.test.ts:89 · T5 memoryEpisodesLabel.test.ts:90-97 · T6 :151 · T7 :123/:130 · T8 m3FeedbackEvidence.test.ts:125-148 · T9 memoryEpisodesLabel.test.ts:168 · T11 m3FeedbackEvidence.test.ts:105 · UI memoryTab.test.tsx:75-114.
- FORBIDDEN list: clean (no turn/prompt file, feedback.ts and golden path untouched, no stored machine copy, no free text in memory_audit, migration not applied).

4 · MIGRATION (read in full, 331 lines)
- trace_label: RLS on, zero policies, `revoke select, insert, update, delete, truncate … from public, anon, authenticated` — the HOUSE pattern for service-only TABLES, verified against memory_audit.sql:92, learning_snapshots.sql:100, vector_index_digest.sql:84, factory_state.sql:183-184 (none grants the table to service_role explicitly; default privileges carry it). The explicit service_role GRANT pattern (health_memory_daily) is for FUNCTIONS, and M3 follows it: episode_apply_human_evidence and learning_restore each `revoke execute … from public, anon, authenticated; grant execute … to service_role`.
- No data rewrite at migration time: `create table if not exists`, idempotent drop-then-add CHECK, CREATE OR REPLACE functions; every UPDATE lives inside a function body.
- memory_audit CHECK: the last full set (20260812120000_snapshot_portability.sql:137-142, 10 values) + 'episode_label' = 11, redeclared in full.
- Version unique: check:migration-versions [OK] 101 keys at the head.
- verifyGrants WIRED (the N1 lesson answered): scripts/verifyGrants.ts adds PROBES[TRACE_LABEL] (trace_id probe), SERVICE_ROLE_ONLY_FUNCTIONS 'episode_apply_human_evidence', FN_EXECUTE_PROBES row with p_actor null (refused by the function's own first guard, so a service-role run writes nothing).
- Named, not RED: (m1) trace_label pk (trace_id, labelled_at) with labelled_at = now() — two label acts on one turn in the same instant would collide 23505 (loud, not silent); (m2) the reason code is validated by the admin route, not in SQL — the RPC is service-role only, so the route is its only caller.

5 · SCRATCH WORKTREE at the head (removed)
- vitest memoryEpisodesLabel, episodesRepository, feedbackPipelineIsolation, kinds, m3FeedbackEvidence, memoryTab, verifyGrants, grantPolicy, memorySlice*, snapshot* → 25 files, 391/391 · typecheck:api exit 0 · check:tenant-zero [OK] 2354 · check:doc-drift [OK] · check:migration-versions [OK] · relayAudit [OK].
- Baseline moved only `system` cells (code 866→888, tests 802→814, per-file system rows); no vendor-id cell.
- PLANT 1 (a cut ignored): NOT_HUMAN_CUT admits cut.eq.true → 5 RED: T2 ×3 (m3FeedbackEvidence.test.ts:81, :90, :100), T11 (:107), the filter pin (episodesRepository.test.ts:337). Reverted.
- PLANT 2 (the order's: human evidence counted when the field is ABSENT — drop the is.null branch): 8 RED in episodesRepository.test.ts (every unlabelled/legacy row vanishes from both bounded reads; the CONTROL at :357). Reverted → green.

6 · REPORT: EXACTLY ONE `FILE-FENCE:` line (:103) + 28 `- <path>` lines (:104-131) = the diff's 28 paths. 7–39-hex runs only inside evidence fences (the prose hits of a naive scan are the English word "feedback"); relayAudit [OK].

7 · CI PREDICTION: Build and Test — no predictable trip at the head; at the slot the generated files must be regenerated (above). rule26 WILL RUN (src/ and public/ in the diff; migration in the diff also forces the FULL suite, build-test.yml "supabase/migrations/** touched — FULL suite"). eval-canary SKIPPED by design.

OPTIONAL (not required for GREEN): O-1 T8 is static (pins the SQL order only) — add a behavioural fake-table T8 (label → restore payload with the pre-label human → (c′) latest-per-turn → expect cut:true), or have the Operator run the round trip after applying. O-2 memory_audit stores the code, not the up/down label (memory-episodes.ts:213): `code: \`${label}:${reason ?? 'retract'}\`` would keep "up wrong_facts" and "down wrong_facts" apart; the card does not require it. O-3 src/dev/AdminPreview.tsx:914 hard-codes which codes cut (dev mock only).

8 · OPERATOR PROMPT (paste-ready; ONLY after M3 lands; project fence fjbrkimwvtpwoxhziidh; DRY-RUN FIRST):
"Operator — apply ONE migration: supabase/migrations/20260930060000_learning_snapshots_human_evidence.sql (CARD-M3, OPERATOR-PENDING).
 0. At the repo root on the master that contains it, confirm the linked project ref is fjbrkimwvtpwoxhziidh; if anything else, STOP.
 1. DRY RUN: `supabase db push --dry-run`. Expect EXACTLY ONE pending migration, 20260930060000_learning_snapshots_human_evidence. If 20260930050000_health_memory_daily (M4a) is ALSO listed, M4a's apply has not happened — STOP and report; the two are independent but each is applied under its own order. Any other pending migration → STOP and report the list.
 2. APPLY: `supabase db push`. Quote the output.
 3. VERIFY (read-only):
   (a) `select has_table_privilege('anon','public.trace_label','select'), has_table_privilege('authenticated','public.trace_label','insert'), has_table_privilege('service_role','public.trace_label','select');` → false, false, true.
   (b) `select has_function_privilege('anon','public.episode_apply_human_evidence(text,jsonb,uuid)','execute'), has_function_privilege('authenticated','public.episode_apply_human_evidence(text,jsonb,uuid)','execute'), has_function_privilege('service_role','public.episode_apply_human_evidence(text,jsonb,uuid)','execute');` → false, false, true. The same three for 'public.learning_restore(uuid,uuid,text)' → false, false, true.
   (c) `select relrowsecurity from pg_class where oid = 'public.trace_label'::regclass;` → true; `select count(*) from pg_policies where tablename = 'trace_label';` → 0.
   (d) `select pg_get_constraintdef(oid) from pg_constraint where conname = 'memory_audit_action_check';` → contains 'episode_label' and all ten earlier values.
   (e) `node --import tsx scripts/verifyGrants.ts` → the trace_label probe denied and `FN-EXEC anon episode_apply_human_evidence → 42501`.
 4. Report the version as applied in supabase_migrations.schema_migrations and (a)-(e) verbatim. Never print a key or an environment value."
The CLI flags are the standard Supabase CLI ones; not run here (no apply authority) — UNMEASURED against this machine's CLI version.

UNMEASURED: rule26 e2e; full vitest suite; T8's behaviour against a real database.
Forbidden kept: no status posted, no edit to any branch, push, merge, re-run, cron, migration apply. No environment value printed. All scratch worktrees removed.
