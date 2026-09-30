REVIEW-VERDICT: RED doc=A26_cwf-memory-and-learning-architecture-v1_1 md5=04aad2c5435a4df8910be88dd83b236d

SCOUT-STATUS-REVIEW-A26-V11-S164-1
FROM: scout-2 · reply_to ORDER-SCOUT-REVIEW-A26-V11-S164-1 (id dfed52f4-af95-4cf7-bd8a-c816de1ebffc, body_md5 d45d1bec5f3955d30a9c970d0d919822 DIGEST-OK)
BASE: origin/master 1b2553c960317ab0cc0718e51dda8b7bc92bc112 (`git fetch origin master` → FETCH_HEAD 1b2553c9…, the order's expected sha; PR 640 is on it). Lines come from `git archive 1b2553c9` extracted to scratch, or from `git grep <sha>`. I did not open Codex's own review file; each K seam was re-measured independently.
DOC md5 (printed first): 04aad2c5435a4df8910be88dd83b236d

WHY RED. Codex's nine seams are all real: K1, K3, K5, K7 and K8 are SAME on the bytes, and K4 is SAME with a sharper consequence. RED because three of v1_1's remedies collide with code or law that already exists:
- K6(a) measures "rank position" on a set the code declares UNORDERED, and the exam law forbids tool-level Recall@k.
- The feedback write contract treats a HARD RULING as a test to update.
- K4's new persistence class, if spelled in the `learned.*` family, makes every existing snapshot file unimportable.
One K2 gap remains, where UNKNOWN can still publish through three kinds. And §4.3's prompt row still says `offerable = procedureEligible`, which my SCOUT-STATUS-REVIEW-CARD-M2-S164-1 has since corrected (frameless gateway turns).

──────── K1 · SAME (plus one missing wire) ────────
Telemetry `tool_call` at master: stageTools.ts:1852-1877 `payload: { ok: !toolError, server, backendId, ...toolCallTracePayload({ args, declaredKeys, gatewayEntryPoint, klass, reason }) }`. toolCallTrace.ts:153-159 returns `argKeys, argShape, undeclaredArgCount, errorClass, errorReason`. It carries NO callId and NO isEmpty; klass is present as errorClass. CONFIRMED.
groundingCheck.ts:613-627: "`ok` and `violations` are UNCHANGED — same six checks … CARD-A24-P1A-NUMERIC-GUARD-S150-1: `numeric` is the same kind of key — a SEPARATE measurement computed after `violations` is sealed and read by nothing above." Then `return { ok: violations.length === 0, violations, vocabSource, numeric: measureNumericClaims(…) }`. So ok:true with unsourced numbers is admitted by construction. CONFIRMED.
A numeric verdict EXISTS: stageStream.ts:622-631 `const numeric = verdict.numeric ?? NUMERIC_UNMEASURED; if (numeric.unsourced !== null) { span.setAttribute(ATTR_GROUNDING_NUMERIC_UNSOURCED, …) … numericClaimsUnsourced: numeric.unsourced }`.
BUT the flush-side summary DROPS it: stageStream.ts:661-674 `ctx.groundingSummary = { ok, violationKinds, vocabSource }`. So `grounded = groundingOk ∧ numeric passed` has no input on the distill/label side today.
Δ-K1: "`grounded` needs `numeric.unsourced` lifted onto ctx.groundingSummary (stageStream.ts:661; three-valued: unsourced === null ⇒ UNKNOWN, never 0), the same lift pattern vocabSource used. It is named as the M2/A26-P1 wire."

──────── K2 · PARTLY. `example` is closed; three kinds still admit UNKNOWN ────────
The example row requires `k23_settled.final_at set ∧ no_correction = true` ✓.
But:
- `base_set` reads "k23_settled" with no finality or no_correction condition.
- `default_plan` reads procedureEligible episodes, which carry no settled label at all.
- `ranking_policy` reads experience_clean deltas, a tool-level signal with no turn settlement.
- `alias` "OR a clean dossier pair" has no settled condition either.
Δ-K2: "Per-kind table, one rule for all kinds: a candidate is eligible only on evidence rows whose every consumed bit is SETTLED and not UNKNOWN. base_set: + final_at ∧ no_correction = true. default_plan: + the source episode's current_label k23_settled final. alias (dossier arm): + final. ranking_policy: + the tool_call_label rows it counts are final_at-stamped."

──────── K3 · SAME; memory_audit cannot be the ledger as it stands ────────
restore_where_true.sql:246-247 `delete from public.episodes where true; delete from public.semantic_memory where true;` then :264-265 `insert into public.episodes select * from jsonb_populate_recordset(null::public.episodes, v_payload -> 'episodes')` (and the same for semantic_memory). A deleted episode comes back. CONFIRMED.
Existing ledger (20260731120000_memory_audit.sql:44-67):
- `action … check (action in ('episode_delete','forget_tick'))`, widened later to add `learning_wipe`, `learning_restore` (20260811120000_learning_snapshots.sql:201).
- `episode_turn_id` for episode_delete only; `forget_tick` carries counts only (`deleted_count`, `scanned_count`), with no ids.
- Comment: "Writers DELETE first then append; append failure logs loud and drops."
Why it cannot serve as is:
(i) best-effort: a delete whose append dropped is invisible to re-deletion, so the row resurrects;
(ii) no semantic_memory or retraction variant;
(iii) TTL deletions carry no ids. They do not need them: expires_at rides in the snapshot payload, so the next forget tick re-deletes, which is worth stating.
Δ-K3: "The deletion/retraction ledger is either a NEW append-only table written IN THE SAME TRANSACTION as the delete, or memory_audit extended with `semantic_delete`/`retraction` actions AND its write moved inside the deleting transaction (it is best-effort today, memory_audit.sql:67). TTL deletions need no ledger entry (expires_at travels with the row; the next tick re-deletes); the restore function re-applies the ledger before it returns."

──────── K4 · SAME, and the break is total ────────
ADR-014:22 "Every table … carries a declared persistence class at birth, the snapshot/seed/export scopes are DERIVED from the classes". The "serializes / wipe empties / restore refills" wording is at :32 (`LEARNED_TABLES`).
The derivation is a PREFIX: dbConstants.ts:882 `export const LEARNED_TABLES = tablesOfClass(PERSISTENCE_FAMILY.LEARNED)`, with :841-846 `startsWith(sel)`.
snapshotEnvelope.ts:99-111 `assertPayloadShape`: `for (const table of LEARNED_TABLES) if (!Array.isArray(obj[table])) throw new SnapshotFileError('… missing the '${table}' table … a missing table is NOT an empty one …')`.
WHAT BREAKS: if the new append-only evidence class is spelled inside the `learned` family, it auto-joins LEARNED_TABLES. EVERY snapshot file exported before the migration then fails import (422). deriveManifest (:84-88) and the six hand-spelled tables in the PL/pgSQL wipe/restore (restore_where_true.sql:246-269) also diverge from the TS list.
The envelope has NO format-version field. Only a free-text `docVersion` exists (snapshotEnvelope.ts:135, :226 `'unknown'` fallback), so "accept old envelopes that lack the new tables" has nothing to key on. Absence is a refusal by law (MEASURE-READ-HONESTY-1 in the same comment).
Δ-K4: "(1) The evidence class is a NEW FAMILY (e.g. `evidence.append_only`), NOT `learned.*`, so LEARNED_TABLES and assertPayloadShape are unchanged for existing files. (2) The envelope gains an integer `formatVersion`; v1 files (field absent) import with the evidence section reported as `not-in-envelope`, never coerced to [] (absence ≠ empty). (3) The PL/pgSQL restore merges the evidence section (insert … on conflict do nothing) and never truncates it; a test pins that a pre-migration fixture file still imports."

──────── K5 · SAME; one overlap to fence ────────
SemanticMemoryRepository.ts:55-72: "The stats jsonb interior (§G1). Every field is an OBSERVED-USAGE aggregate" — `turns, firstSeen, lastSeen, frames: Record<'ACTION/OBJECT', number>, timeKeys, procedureTurnIds (≤3 pointers)`. Row :76-83 `{ userId, entityKey, entitySurface, stats, updatedAt }`. Usage statistics, not facts. CONFIRMED.
§12.6 overlap: entity_registry (20260726120000_entity_registry_layers.sql:109-122) = `backend_id, layer_key, entity_id, display_name, parent_*, attrs jsonb, first_seen_at, last_seen_at, status active|missing`. It is a backend-OBSERVED attribute mirror, "never authority by itself" (:125, ADR-001). Governed glossary_term/entity_alias live in domain_rules. A new `entity_fact` storing backend-mirrored attributes would duplicate entity_registry.attrs AND violate P3 ("never replace authoritative current state").
Δ-K5: "entity_fact holds only facts NOT mirrored from a backend (user- or conversation-stated, or LEARNED); a backend-observable attribute is read from entity_registry.attrs, never copied; `source_authority` distinguishes, and a conflict resolves to the mirror."

──────── K6 · (a) collides with the exam law; (b) has a label, but only on exam turns ────────
examScorers.ts:6-9: the offered set "is an unordered Set (stageTools.ts), so a cutoff over it is meaningless (recallCat.ts:60-62), and a tool-level Recall@k is forbidden metric substitution until per-utterance expected-tool labels exist". recallCat.ts:10-13: "Tool-level recall stays a NAMED GAP until per-utterance expected TOOL labels exist."
So v1_1 §4.3(a) "position delta, Recall@k by phrasing-frequency tercile" has no order to measure against today. An ORDER exists only once the E5 ORDER lane emits a ranked list, which is what (a) is supposed to justify.
Independent right-tool labels EXIST: shared/examSets.ts:38-43 `AcceptableLabel { tools: string[] }` ("The OWNER-WRITTEN acceptable set for one turn"), consumed by examScorers.ts:52-57 firstCallHitAt1 and :68-81 coverage. They cover EXAM turns only and are held-out, so they are usable for measurement but never as learning evidence (§5 candidate row).
The live recall-candidate log (A26-P1) is therefore enough for (a) ONLY if it records the recall arm's RANKED candidates with scores. It is enough for (b) ONLY on replays of labelled exam turns.
Δ-K6: "(a) = rank of the AcceptableLabel tool inside the recall arm's OWN ranked candidate list vs the compiled arm's ranked list, measured on labelled exam turns (examSets.ts:42), since the production offered set is unordered (examScorers.ts:6-9); no tool-level Recall@k on unlabelled traffic (recallCat.ts:10-13). (b) = on replayed labelled exam turns, AcceptableLabel tools absent from the offered set but present in the recall candidates. Production traffic contributes only the candidate log, not a metric."

──────── K7 · SAME; no gold-answer scorer exists ────────
examScorers.ts:155-164: "A sentence violates iff it matches an assertion AND matches no hedge", with `if (lex.hedges.some((h) => h.re.test(sentence))) return null;`. Any hedge clears it. CONFIRMED.
Gold-answer scorer: ABSENT, two lenses. `git grep -i -e goldAnswer -e expectedAnswer -e expected_value -e expectedValue -e gold_answer` over api/shared/scripts/data → no output. The golden-specimen code (goldenSpecimens.ts, GoldenSpecimensRepository.ts) has no expected-answer field (only hit: goldenSpecimens.ts:25 "posture, not an expected state"). The exam scores tools (firstCallHitAt1, coverage) and honesty, never answer values.
v1_1's remedy is correct and is NEW code. Δ-K7: "the gold-answer scorer is a NEW module beside examScorers.ts (normalized value match per recalled fact + date normalization); its version is part of the ratified MEMORY-1 bar."

──────── K8 · SAME; no PII scrubber exists anywhere ────────
router_proposals.sql:57-58 `sample_query` = "The latest triggering user message, truncated to 200 chars". CONFIRMED.
Scrubbers in the repo: observability/redaction.ts. Its header (:1-31) is a SECRET boundary: "ENV-VALUE masking … every currently-set sensitive env VALUE is masked", plus a segment-aware key deny-list. It never detects personal data. memoryDistill's `asked` uses scrubbedAttrValue from the same module (secrets only).
Second lens `git grep -i -e tckn -e iban -e "kimlik no" -e piiScrub -e detectPii -e "personal data" -e "kişisel veri"` → only comments (TelemetryRepository.ts:10, persistence/types.ts:52 "never pass … personal data") and a MODEL instruction (prompt/core/promptFloor.ts:70). A PII detector is ABSENT. So v1_1's "without an audit no_pii is never true" means no_pii is UNKNOWN for every row until one is built, which v1_1 already says. The track should carry it as a named build item.

──────── K9 · SAME for both; the stage-03 path is episode→ENTITY, and M2 already changes it ────────
Planner: memoryRetrieve.ts:646 `ctx.offeredRoutine = outcome.routine` → :563 `derivePlan(ctx.irFrame, ctx.offeredRoutine ?? null, overrides)`. `offeredRoutine` has no other reader (git grep: types.ts:744 and these two only). The planner runs in warm-trust, AFTER register-tools, so it does not touch the offered set. CONFIRMED.
Stage 03: stageClarify.ts:677-704 readCarriedResolution → `repo.listRecentByConversation(conversationId, 1, taskId)` → `matchShownOptionDetailed(message, row.decision?.ask ?? null)`. It is reached at :2798 only after :2771 `if (!ctx.frameRoutingEnabled)` returns. So it is frameRouting-gated, but the carried object is the last turn's shown ASK OPTIONS → an ENTITY, not a frame.
NOT NAMED IN v1_1: this read goes through `.or(OFFERABLE_OUTCOME_FILTER)` (EpisodesRepository.ts:550), so every change to offerability (M2 D2) also changes whether a shown question can be answered by its option. An ask turn that ran discovery tools (stageClarify ask-discovery through the registered closures) is tool-bearing, so under a strict offerable predicate its ask may stop carrying.
Other user-scoped paths: warm-trust episode recall and the semantic dossier (memoryRetrieve.ts:405-414) are PROMPT face, not routing. No other routing path was found.
Δ-K9: "P9 names the stage-03 path as 'episode → carried ask option → entity (stageClarify.ts:2798, frameRouting-gated)', and records that it shares OFFERABLE_OUTCOME_FILTER with recall (EpisodesRepository.ts:550), so M2's offerable rule must be tested on the carry: an ask turn with discovery calls still carries."

──────── + FEEDBACK CONTRACT · DIFFERENT — it is a hard ruling, not a test ────────
feedbackPipelineIsolation.test.ts:5-10: "THREE HARD RULINGS (design cwf-measure-1-design-note-v1 §2): feedback is never a prompt input, never a knowledge source, never a viz data source. Structurally: NO file under the turn pipeline (api/cwf/_lib/turn/**, api/cwf/_lib/prompt/**) may import the feedback repository or touch the turn_feedback table."
A26 M3 makes human feedback an EVIDENCE channel that cuts offerability (read by recall in turn/**) and feeds negative_example proposals. That makes feedback a knowledge source. "UPDATES that isolation test's contract by name" is not enough.
Δ-FB: "M3 requires an OWNER RULING amending cwf-measure-1-design-note-v1 §2 ('never a knowledge source') before any code; the structural test is then updated to the amended ruling. Until then, feedback may write only to trace_label via an admin path OUTSIDE turn/** and prompt/**, and the turn may read the RESULT (offerable flag), never turn_feedback."

──────── + SYNTHETIC ACCEPTANCE · a new actor kind is unnecessary; the namespace already isolates ────────
The door is the single constant `'user'`: EpisodesRepository.ts:38 `MEMORY_WRITE_ALLOWED_ACTOR_KIND = 'user'`, enforced at memoryDistill.ts:420-425 and EpisodesRepository.ts:492-501.
The read isolation exists: EpisodesRepository.ts:345-350 `withTaskNamespace(query, taskId) = taskId === null ? query.is('task_id', null) : query.eq('task_id', taskId)`, applied to both recall reads (:551, :576). Production turns carry taskId null (memoryDistill.ts:494-496), so they never read a task-namespaced row.
Δ-SYN: "The MEMORY-1 harness runs as a dedicated TEST USER account (actor kind 'user') on task-namespaced turns (task_id set). No new actor kind, C1-LAW untouched. The exemption to NAME is the extractor/trace_label refusal of task turns (§9a-d), not the episode door. If a distinct kind is still wanted, the door admits it only when `row.taskId !== null`, and a test pins that a null-task memory_exam row is refused."

──────── + CARRIED CORRECTION (from my M2 review, not a K item) ────────
§4.3 prompt row "offerable = procedureEligible" over-restricts. procedureEligible requires `irFrame != null` and domain yield (memoryDistill.ts:312-322), and the frame is absent by default on gateway-only turns (resolveTurnFrame.ts:194-200 `frameOnAllPaths` floor 0).
Δ-43: "offerable = clean ∨ outcomeHonest(outcome), where outcomeHonest is the signal half (:298-305) split out of procedureEligible; procedureEligible = outcomeHonest ∧ calls>0 ∧ yield ∧ frame (one predicate, two exported halves)."

read relay_inbox at 2026-09-30T03:24:09Z (mail-wait exit 0, one row) + --read of card dfed52f4.
