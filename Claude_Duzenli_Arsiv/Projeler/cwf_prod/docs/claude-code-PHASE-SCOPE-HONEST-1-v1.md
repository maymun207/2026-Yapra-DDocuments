# claude-code-PHASE-SCOPE-HONEST-1-v1.md

<!-- v1 · 2026-07-15 · Architect-authored · branch: scope-honest-1 · profile: FULL
     (api/** touch). Design contract: cwf-f83-prescriptive-authority-architecture-v1_2
     §1.5 + F83.1 ② — the DETERMINISTIC half of "make the boundary real". This phase
     is the PUBLISH PRECONDITION for the b1_scope v2 segment (batched golden run):
     without it, the loosening yields fluent guesses in the voice of a standard on
     some providers. CI = sole test arbiter (S43-2); merge ONLY on green unsharded CI.
     PLATINUM: the provenance chip derives from a retrieval FACT computed
     automatically every turn — never prose parsing, never model compliance, never a
     manual step. ADR-001 intact: no LLM judge anywhere. -->

## 0 · PRE-FLIGHT GATE (hard)
- `git rev-parse origin/master` == `cd97aa7238785df088fed49cedb4ffdfc5c42976`
  (OBS-LEGIBILITY-1 merge). STOP if not.
- Branch `scope-honest-1` off master. `npm ci` clean. Drift gate green.
- **Discovery gate (report findings; adapt without changing the contract):**
  (a) locate where the turn's published-rule retrieval happens (warm/knowledge
  slice — the ctx capture the fingerprint already reads) and confirm how to count
  retrieved rules of a kind FAMILY by id pattern; (b) check whether the
  `messages` table / message SSE payload already has a metadata-capable jsonb
  surface the chip fact can ride WITHOUT a migration (raw_tool_results is NOT
  that surface — do not abuse it). If no persistable surface exists without a
  migration, the chip is LIVE-TURN only (SSE payload) and history rows render
  no chip (the OBS-LEGIBILITY-1 "pre-legibility" precedent) — persistence folds
  into a later phase; state which branch you took.

## 1 · THE CONTRACT (v1_2 §1.5, verbatim doctrine)
The honesty banner derives from a **retrieval fact**, never from parsing prose:
"did any `procedure`-class published rule ground this turn?" That is an `if`,
and it holds on every provider, forever. Today NO procedure kind exists
(F83.2 SOP-KB-1 is future) — so the count is structurally 0 on every turn and
the chip states the honest default. The implementation MUST be F83.2-proof:
when a `procedure` kind family later exists and rules are retrieved, the SAME
code path flips the chip with ZERO further changes here.

## 2 · HARD CONSTRAINTS
- **No LLM judge, no prose parsing, no regex over the answer.** The fact is a
  count from the retrieval layer.
- **No migrations** (subject to discovery gate (b) — if a migration would be
  needed for persistence, DON'T: live-only branch).
- **Not an alarm — a provenance affordance.** A small subdued footer chip on
  assistant messages, F38 shield-family styling (informative, never red-panic):
  - count == 0 → "Kayıtlı prosedür kullanılmadı — yanıttaki olası öneriler
    tavsiye niteliğindedir · mühendislik değerlendirmesi"
  - count > 0 → "N kayıtlı prosedüre dayanıyor" (future path, built now,
    fixture-tested now)
- Chip renders on ASSISTANT messages of live turns; absent on pre-phase
  history (honest absence, never fabricated).
- **empty≠zero untouched · C1 untouched · RULE 27/28 untouched.** The count
  rides existing event/SSE surfaces — no new endpoint, no new event type.
- No secrets. Merges `--no-ff`. Budget the reseal if drift-mapped files move
  (S34-1).

## 3 · GATED SUB-PHASES
### S1.A — The retrieval fact (server)
`ctx.procedureRulesRetrieved: number` — computed where the published-rules
slice is read (discovery gate (a)); kind-family match by id pattern
(`procedure` family; constant in ONE shared home, RULE 1). Stamp it: (i) on the
`cwf.turn` root span (one attribute, config-named), (ii) into the turn_done
telemetry payload, (iii) onto the message SSE payload the client already
consumes.
### S1.B — The chip (client)
Assistant-message footer chip from the SSE/message metadata (and from the
persisted surface if discovery gate (b) found one). Both wordings implemented;
count>0 path fixture-tested. Chip absent when the metadata is absent.
### S1.C — Tests + seal
Unit: count derivation (0 today; >0 via a fixture rule row shaped like a future
procedure kind). Client: chip renders/absents correctly; adminLegibility
auto-gen count shift expected. Reseal if needed; CHANGELOG + KB. PR; unsharded
CI green = merge gate.

## 4 · SELF-VERIFY (evidence, literal)
1. A dev turn's SSE payload carries the count; the root span carries the
   attribute; turn_done payload carries it (fixture/integration evidence).
2. Chip visible on a fresh assistant message with the count==0 wording;
   absent on a pre-phase history message.
3. Fixture-driven count>0 flips the chip wording with NO code change beyond
   the fixture (F83.2-proofness demonstrated).
4. `git diff --stat master.. -- supabase` EMPTY. Report files + test delta +
   PR link. No merge before CI green.

## 5 · MERGE MESSAGE (verbatim on GO)
Merge SCOPE-HONEST-1 — the deterministic uncited-advice provenance chip (F83.1 ②): retrieval-fact, provider-independent, F83.2-proof

<!-- END · claude-code-PHASE-SCOPE-HONEST-1-v1 · rev 1 · 2026-07-15 -->
