SCOUT-STATUS-MAP-M3-S164-1 — scout-2 · reply_to ORDER-SCOUT-MAP-M3-S164-1 (id a1fc9ca0-3d3b-4437-977b-1d0bcd6a916e, md5 c859ed85d5edd83ba67b9bd6476356e1 DIGEST-OK)
BASE: master 41450c98f75c18d0fe0e4c59bb1e8c8b73d384b1 (ls-remote). M2 read from AG-3's branches:
- phase/m2-honest-grading-s164-1 = 008b0a36dd7c4b7645c4515095103ea8a170f109 (PR 642 content; still has askTurnUngraded, memoryDistill.ts:367/:572, and ONE filter, EpisodesRepository.ts:419).
- phase/m2-honest-grading-s164-1-prep = 0a7eb950684cd34ad9f0b7661e3570b321bd36c2.
NOTICE-M2-CARRY-FILTER-RULING-S164-2 (read-only, id cb0e4ab9) rules TWO named filters (CARRY_OUTCOME_FILTER = pre-M2 class-only literal; OFFERABLE_OUTCOME_FILTER = M2 literal) and removes askTurnUngraded. That shape is NOT on any remote branch yet, so it is UNMEASURED as built. M3 below is mapped against the RULED shape.

1 · WHERE FEEDBACK LIVES
- Table: 20260802160000_turn_feedback.sql:29-40 `turn_feedback(id, trace_id text, conversation_id, user_id, verdict up|down, reason_text ≤2000, created_at, updated_at, UNIQUE(user_id, trace_id))`, latest-wins upsert. Triage columns reviewed_at and reviewed_by come from 20260803160000_turn_feedback_triage_and_latency_dedup.sql:99-105. Header :9-12 restates the three hard rulings. There is NO reason-code column: reason is free text.
- Writer: api/cwf/feedback.ts:76 `feedback.upsert(…)` → TurnFeedbackRepository.ts:109-128 (owner RLS insert/update, :63-78 of the migration).
- UI that collects it: src/components/chat/FeedbackButtons.tsx (reason input :106 maxLength) via src/lib/feedbackService.ts.
- markReviewed: TurnFeedbackRepository.ts:271-278 writes ONLY `{ reviewed_at: now, reviewed_by: reviewerUserId }`. Its caller is api/admin/feedback-triage.ts, action 'review', gated `PERMISSIONS.TELEMETRY_READ_ALL` (header :8-22). Action 'resolve-message' is gated GOLDEN_CURATE. The header says "feedback flows to humans and MEASUREMENT only".
- Pin: feedbackPipelineIsolation.test.ts:5-10 "THREE HARD RULINGS (design cwf-measure-1-design-note-v1 §2): feedback is never a prompt input, never a knowledge source, never a viz data source. Structurally: NO file under the turn pipeline (api/cwf/_lib/turn/**, api/cwf/_lib/prompt/**) may import the feedback repository or touch the turn_feedback table." PIPELINE_DIRS is set at :32.

2 · trace_label
- ABSENT on master. `git grep -i -e trace_label -e traceLabel -e "evidence\.append"` over api/shared/supabase/src/scripts at 41450c98 → no output. The second lens was my earlier C12 measurement (repo-wide cwf.trace / no_correction / K23) → absent.
- Persistence classes today: shared/dbConstants.ts:483-504 has nine classes and NO `evidence.*` family.
- Smallest durable home, proposed:
  - NEW table `trace_label(trace_id text, labelled_at timestamptz default now(), human jsonb {label: up|down, reason: code}, labelled_by uuid, source text check in ('admin'), primary key (trace_id, labelled_at))`, append-only (no update/delete grants), service-role only, RLS on with zero policies (the router_proposals posture).
  - Class: NEW family `evidence.append_only` in dbConstants.ts:483 plus TABLE_PERSISTENCE_CLASS. It must NOT be `learned.*`, because LEARNED_TABLES is a prefix derivation (dbConstants.ts:882) and assertPayloadShape (snapshotEnvelope.ts:99-111) would then refuse every existing snapshot file.
  - Consequence: the table is outside snapshot, wipe and restore. BUT episodes are `learned.user` and ARE restored (restore_where_true.sql:264), so a restore brings back an episode's pre-label `decision.outcome`. The restore must RE-PROJECT current trace_label rows onto restored episodes, or the human cut silently reverts. Name this in the card; it is the K3 ledger rule applied to labels.
- Why not episodes.decision alone: the episodes TTL cron deletes the row (memory-forget), and restore rewrites it. The label is evidence and must outlive both, so episodes carry only the PROJECTION (§3).

3 · THE OFFERABILITY CUT (no turn read of feedback)
- M2 stamp (current branch): memoryDistill.ts:572 `offerable: classified.class === 'clean' || outcomeHonest(classified) || askTurnUngraded(...)`. Under the ruling, askTurnUngraded is removed and the stamp becomes `clean || outcomeHonest`.
- The field recall reads: EpisodesRepository.ts:418 `OUTCOME_OFFERABLE_PATH = 'decision->outcome->>offerable'`, via OFFERABLE_OUTCOME_FILTER at :419-421, used by listRecentByUser :618. Under the ruling the carrier uses the class-only CARRY filter, so a human label does NOT touch the carry: the class stays the observed fact (A26 D4: evidence, not override).
- THE ONE WRITE: the admin path appends a trace_label row AND sets `episodes.decision.outcome.offerable` for that turn_id to `machineOfferable ∧ ¬humanCut`, and `decision.outcome.human = {label, reason, at}`, in ONE transaction. That means a SECURITY DEFINER RPC `episode_apply_human_evidence(p_turn_id, p_human jsonb)` in the migration, because a PostgREST nested-jsonb patch is read-modify-write.
- machineOfferable is RECOMPUTABLE from the stored outcome: outcomeHonest is pure over `decision.outcome.signals` (memoryDistill.ts:337 on the prep). So un-labelling flips back without a stored copy.
- humanCut = label = down ∧ reason ∈ governed cut set (A26 §5: wrong_tool, wrong_facts). wrong_tone and other do not cut.
- The turn reads NOTHING new: recall already reads decision->outcome->>offerable. Join key: turn_feedback.trace_id = episodes.turn_id, both the RULE-28 id (memory_audit.sql:57-59 comment).

4 · THE ADMIN WRITE PATH
- Home: api/admin/memory-episodes.ts. It already mutates episodes, is gated `PERMISSIONS.MEMORY_MANAGE` at :74 (shared/permissions.ts:162; super_admin), and writes memory_audit on delete (:134 insertEpisodeDelete). Add a `PATCH { turnId, label, reason }` beside DELETE (:116) and POST (:144). It is outside turn/** and prompt/**.
- Permission: MEMORY_MANAGE. The act changes what recall offers, which is the memory tier. It is NOT TELEMETRY_READ_ALL, even though the triage queue that surfaces the row is gated there: the feedback-triage.ts:8-22 permission-honesty pattern says gate each act on its own capability.
- Audit: memory_audit gains action `episode_label`. The CHECK was last redeclared in full at 20260812120000_snapshot_portability.sql:136-138, so the migration redeclares the whole set plus episode_label. It records actor_user_id, episode_turn_id, and `reason` = the CODE (never free text). Note memory_audit writes are best-effort (memory_audit.sql:67). The trace_label insert inside the RPC is the authoritative record; the audit is the human trail.
- Refusals: a row with task_id not null (a synthetic or task turn, Δ-SYN; EpisodesRepository.ts:345-350 withTaskNamespace) → 409. An unknown reason code → 422.

5 · REVIEW QUEUE UI
- Closest existing queue: src/components/admin/HealthTab.tsx ≈:1392-1409 (the unreviewed-👎 list; data api/admin/health-analytics.ts:489-501 listUnreviewedDown; actions src/lib/adminService.ts:2228/:2237 → /feedback-triage).
- Episode surface: src/components/admin/MemoryTab.tsx (row badge :268, detail :305-315 at master; M2 D5 adds outcome, offerable and counters on its branch).
- Proposal: the queue row keeps its home in HealthTab and gains a "label" act that opens the MemoryTab episode detail (turn link by trace_id), where the label is written (MEMORY_MANAGE; hidden without it, enforced server-side).
- The queue must show: the feedback row (verdict, reason_text as the user's words, age), the turn link, the episode's current outcome class, offerable (machine and effective), any existing human label, and the reason-code picker.
- Reason codes are GOVERNED DATA: a governed kind or an agent-param list resolved like other governed vocab (§13.1/(h)). They are not a TS const and not inline strings. TR/EN labels come from the governed row. The tab's own chrome keeps its inline t('TR','EN') pattern.

6 · CALLER-ABSENT (§12.6)
- Review queue: EXISTS and is wired (HealthTab + feedback-triage + listUnreviewedDown). Reuse it; do not build a second one.
- Label writer: ABSENT (no human_label, humanLabel, reason_code or reasonCode in api/shared/src/supabase at 41450c98).
- Reason-code list: ABSENT. The only reason is free text: FEEDBACK_REASON_MAX_CHARS at TurnFeedbackRepository.ts:30, feedbackService.ts:30, FeedbackButtons.tsx:106.
- Episode mutation + audit seam: EXISTS (memory-episodes.ts DELETE + MemoryAuditRepository). Reuse it.
- 👎 → golden curation door: EXISTS (feedback-triage resolve-message → golden-specimens mark). M3 must not fork it.

7 · TESTS THE CARD MUST PIN
T1 isolation pin UPDATED, naming OWNER-RULING-S164-FEEDBACK-EVIDENCE-1. PIPELINE_DIRS unchanged (feedbackPipelineIsolation.test.ts:32). The forbidden-token list GAINS trace_label and its repository name, since the turn reads the projection only. Keep the positive control (the detector fires on a planted import) and the innocent case (api/cwf/feedback.ts, and the new admin route, allowed).
T2 label write → flip visible to recall. Seed an offerable episode, PATCH down+wrong_facts → listRecentByUser excludes it; PATCH up (or retract) → included again; offerable recomputed from stored signals.
T3 the carry is untouched by a label (CARRY filter class-only): the labelled ask turn still carries.
T4 turn never reads feedback: a grep-lens test that no file under turn/** or prompt/** references trace_label or turn_feedback. Plus a behavioural control: the stage-12 recall of a labelled row reads only decision->outcome->>offerable.
T5 permission refusal: TELEMETRY_READ_ALL-only caller → 403 on PATCH; no trace_label row, no episode change.
T6 synthetic/task turn refused: task_id set → 409, nothing written (Δ-SYN).
T7 unknown reason code → 422; wrong_tone/other → recorded, offerable unchanged.
T8 restore re-projection: snapshot → label → restore → the episode's effective offerable still reflects the label.
T9 audit: memory_audit episode_label row with the code and the actor; a failed audit does not roll back the evidence (best-effort, stated).

PROPOSED FILE-FENCE (CARD-M3)
supabase/migrations/<ts>_trace_label_evidence.sql (table + RPC episode_apply_human_evidence + memory_audit CHECK redeclared with episode_label; grants service-role only) ·
shared/dbConstants.ts (DB_TABLES.TRACE_LABEL, PERSISTENCE_CLASS.EVIDENCE_APPEND_ONLY, TABLE_PERSISTENCE_CLASS row) ·
shared/grantPolicy.ts (row) ·
api/cwf/_lib/persistence/repositories/TraceLabelRepository.ts (new) + persistence/index.ts ·
api/cwf/_lib/persistence/repositories/MemoryAuditRepository.ts (insertEpisodeLabel) ·
api/admin/memory-episodes.ts (PATCH) ·
the governed reason-code list (a kind row or agent-param + its resolver) ·
learning_restore re-projection (migration function body) ·
src/lib/adminService.ts · src/components/admin/MemoryTab.tsx · src/components/admin/HealthTab.tsx (label act link) ·
tests: api/cwf/__tests__/feedbackPipelineIsolation.test.ts (updated), the new T2–T9 suites, src/components/admin/__tests__/memoryTab.test.tsx ·
report docs/relay/… · gate-regenerated files.
NOT: anything under api/cwf/_lib/turn/** or api/cwf/_lib/prompt/**; TurnFeedbackRepository's write shape; api/cwf/feedback.ts.
DEPENDS ON M2 landing with the RULED two-filter shape, because the offerable field and outcomeHonest come from M2.

UNMEASURED: the ruled M2 shape (not yet pushed); live row counts (DB is the Operator's read; turn_feedback 10 rows is the Architect's number).
read relay_inbox at 2026-09-30T04:12:02Z (mail-wait exit 0) + --read of order a1fc9ca0 and notice cb0e4ab9 (read-only).
