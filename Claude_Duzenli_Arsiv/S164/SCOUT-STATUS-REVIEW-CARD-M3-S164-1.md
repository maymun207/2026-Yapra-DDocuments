REVIEW-VERDICT: RED card=CARD-M3-FEEDBACK-EVIDENCE-S164-1-v1 md5=f303691818e22feaa3ac0c369ab8a80b — to the Architect
SCOUT-STATUS-REVIEW-CARD-M3-S164-1 · reply_to ORDER-SCOUT-REVIEW-CARD-M3-S164-1 (id 5ee49b59-0157-4ca6-bdf5-c1ad13bc2cfb, md5 e22019d136648796251ae48ec8fb8184 DIGEST-OK)
BASE: master 41450c98f75c18d0fe0e4c59bb1e8c8b73d384b1. M2 is read at AG-3's branch 008b0a36dd7c4b7645c4515095103ea8a170f109 (PR 642 content) and prep 0a7eb950684cd34ad9f0b7661e3570b321bd36c2. The two-filter ruling is not yet built, so it is reviewed as ruled.
WHY RED:
- D2's "mirror machineOfferable in SQL" diverges from TS on legacy rows (Q1).
- D2 and D6 together cannot un-retract after a restore, because they overwrite the machine value (Q1/Q3).
- The ruled carrier split leaks labels into RECALL through memoryRetrieve.ts:407. This is an M2 fix that must happen before M3 (Q4).
- The fence misses files (Q6).
I also correct my own map: a new persistence family is unnecessary (Δ6).
The design itself (evidence written by an admin act, read by the turn only as a result) stands.

Q1 · A faithful SQL mirror is NOT safe. M2's predicate (0a7eb950 memoryDistill.ts:337-346) compares possibly-ABSENT keys strictly: `s.groundingOk === true && s.toolFailures === 0 && s.surfacedEmpty === false && s.silentFinish === false && s.answerUnbacked === false && s.fetchedNotDrawn === false && s.absenceWithoutEnumeration === null`.
On a pre-BUG-035 row the key `absenceWithoutEnumeration` is absent: TS gives `undefined === null` ⇒ false, while SQL `->>'absenceWithoutEnumeration' is null` ⇒ true. `fetchedNotDrawn` has the same absent-vs-false split. So SQL and TS disagree exactly on legacy rows.
Calling back into TS is feasible, since admin routes already import turn modules (api/admin/config-fingerprint.ts:19/:25, api/admin/mcp-probe.ts:30). But the restore (D6) is pure SQL and cannot call TS (see Q3).
Δ1 (replaces D2's recompute and T10): NEVER overwrite `decision.outcome.offerable`. It stays the machine value M2 stamped. The RPC writes `decision.outcome.human = { label, reason, cut: boolean, at }` (cut computed by the admin route from the governed row) and appends trace_label. Recall excludes cut rows IN THE QUERY. The OFFERABLE_OUTCOME_FILTER literal becomes:
`and(decision->outcome->>offerable.eq.true,or(decision->outcome->human->>cut.is.null,decision->outcome->human->>cut.eq.false)),and(decision->outcome->>offerable.is.null,or(decision->outcome->>class.is.null,decision->outcome->>class.neq.failed),or(decision->outcome->human->>cut.is.null,decision->outcome->human->>cut.eq.false))`
'retract' writes a human record with cut:false. There is no predicate mirror, no stored machine copy (the card's FORBIDDEN line is respected: the machine value is the ORIGINAL stamp, not a copy), and no T10. EpisodesRepository.ts joins the fence.

Q2 · The governed-vocab mechanism EXISTS: domain_rules kinds. KIND_REGISTRY is at api/cwf/_lib/knowledge/reference/kinds.ts:527 (SYSTEM_KIND_IDS :86, getKindDef :593). Seeding is api/cwf/_lib/knowledge/selfSeedReconciler.ts:233-331 seedDomain, "ABSENCE-ONLY LAW" for instances, and kinds are provisioned absence-only too ("ABSENCE-ONLY LAW extends to kinds"). Rows are edited in the Rules/GovernanceTab (src/components/admin/GovernanceTab.tsx:155). Seed absence-only: YES.
Δ2: D4 names "a new SYSTEM kind `feedback_reason` in KIND_REGISTRY (kinds.ts:527), fieldSpec {code, cuts: boolean, label_tr, label_en}, seeded through selfSeedReconciler.seedDomain; the admin route resolves the published rows". Fence: kinds.ts, its reference seed module, and the resolver.

Q3 · YES, in the same transaction, IF D6 replaces the LATEST body. learning_restore is defined three times: 20260811120000_learning_snapshots.sql:381, 20260812120000_snapshot_portability.sql:366, and 20260812160000_restore_where_true.sql:169, which is the LATEST. Its episodes refill is at :264, with count checks at :271-274, all inside one plpgsql function, so one transaction.
Δ3: "The migration CREATE OR REPLACEs learning_restore copied VERBATIM from restore_where_true.sql:169 and adds, after the refill checks (:274), `update episodes e set decision = jsonb_set(e.decision, '{outcome,human}', latest.human) from (latest trace_label per trace_id) latest where e.turn_id = latest.trace_id`. It is pure SQL (possible only under Δ1; under D2's overwrite, a retract followed by a restore of a post-label snapshot cannot recover the machine value in SQL). learning_wipe needs nothing: trace_label is not in the learned layer."

Q4 · YES, a leak, and it is M2's to fix. Callers of listRecentByConversation at master: memoryRetrieve.ts:407 (the RECALL carrier, MEMORY_CARRIER_LIMIT_K1) and stageClarify.ts:689 (the carrier). The ruling (NOTICE-M2-CARRY-FILTER-RULING-S164-2 item 1) moves listRecentByConversation to the class-only CARRY filter. Recall's same-conversation carrier at memoryRetrieve.ts:407 would then read non-offerable AND human-cut rows. Item 5 of the ruling tells AG-3 to STOP on exactly this caller.
Other `offerable` readers: MemoryTab (M2 D5, 008b0a36 src/components/admin/MemoryTab.tsx:91-132, :378) renders offerable, and no replay or admin count reads it.
Δ4 (to AG-3, before M3): "EpisodesRepository keeps listRecentByConversation on OFFERABLE (recall, memoryRetrieve.ts:407) and adds `listLastForCarry(conversationId, taskId)` on CARRY_OUTCOME_FILTER, called ONLY by stageClarify.ts:689." M3's D7 then renders EFFECTIVE offerable = offerable ∧ ¬human.cut in MemoryTab (beside :378).

Q5 · YES. shared/permissions.ts:254-259: super_admin = ALL_PERMISSIONS; power_user = MAKER_PERMISSIONS (:195-248), which holds TELEMETRY_READ but NOT TELEMETRY_READ_ALL and NOT MEMORY_MANAGE. MEMORY_MANAGE is super_admin only (:150-162). The triage queue (TELEMETRY_READ_ALL, feedback-triage.ts) and the label act (MEMORY_MANAGE) are both super_admin today, so the owner's super_admin account sees both.
Δ5: A26 §4.4 "power_user+" for the reason/label write is wrong against the bundles. The card is right (MEMORY_MANAGE); record the A26 wording as superseded.

Q6 · FENCE GAPS.
Δ6 (correcting my map §2): use the EXISTING class `PERSISTENCE_CLASS.OPERATIONAL_TELEMETRY` (dbConstants.ts:498-499, "An append-only RECORD ABOUT the system — events, audits, digests"; memory_audit's own class :683). PERSISTENCE_FAMILY has three families only (:512-516); a new `evidence.` family means ADR-014 law plus family plumbing. operational.telemetry is already outside LEARNED_TABLES (:882), so snapshot, wipe and the envelope are untouched. Reserve `evidence.*` for A26-P1, when a snapshot-MERGE semantic is actually needed.
Δ7: fence additions:
- api/cwf/_lib/persistence/repositories/EpisodesRepository.ts (the Δ1 filter + row type)
- api/cwf/_lib/knowledge/reference/kinds.ts + the reference seed module + the resolver (Δ2)
- scripts/verifyGrants.ts (the grant expectation for trace_label and the memory_audit CHECK; it already enumerates memory_audit)
- src/dev/AdminPreview.tsx (fixtures enumerate tables and classes)
- src/components/admin/__tests__/memoryTab.test.tsx expectations at 008b0a36 :104/:116 (they pin 'failed · not offerable' / 'legacy · offerable (legacy rule)' strings that D7 changes)
- e2e files by `git grep` of changed strings (practice 116)
- graft cards + public/architecture/manifest.json via reseal
REMOVE from the fence: nothing. REMOVE from the tests: T10 (moot under Δ1). ADD T11: a labelled row with `offerable:true, human.cut:true` is excluded by listRecentByUser and INCLUDED by the carry read (label never touches the carry).

read relay_inbox at 2026-09-30T04:26:35Z (mail-wait exit 0) + --read of order 5ee49b59.
