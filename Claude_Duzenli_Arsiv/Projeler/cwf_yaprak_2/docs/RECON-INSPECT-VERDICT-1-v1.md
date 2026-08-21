# RECON — INSPECT-VERDICT-1 · v1
<!-- RECON-INSPECT-VERDICT-1-v1 · 2026-08-02 · S79 · D-1 thin recon brief.
     Every fact below is a READ run this session against a fresh full clone at
     origin/master = dec3ff557036bc142d85002d596f9c74325a76ce (M1F1 merged,
     migration APPLIED by the Operator, prod READY on this SHA). No phase
     prompt is written until this brief is owner-read. -->

## §0 · Why this recon exists
The owner's ask: *"hangi cevapları kullanıcı onayladı, bunu en azından
Inspect'te görebilmeliyim."* M1F1 shipped the PRODUCER only; there is today
**zero** admin surface over `turn_feedback` (verified: `grep -rl
turn_feedback|TURN_FEEDBACK|TurnFeedbackRepository api/admin
src/components/admin` → **0 files**). This brief establishes what the read
side actually looks like before any prompt is authored.

## §1 · The join key — VERIFIED, three links, all from code
1. `api/cwf/chat.ts:172` — `const turnId = turnIdentity();` inside the turn
   root span; the comment at :170 states telemetry `session_id` derives from
   it (RULE 28).
2. `api/cwf/_lib/observability/identity.ts:1-27` — the turn id IS the active
   OTel trace id (32 hex), UUID fallback when observability is off; log
   prefix + Langfuse trace + ledger `session_id` all derive from this one
   value.
3. `src/lib/inspectGrouping.ts:107` — Inspect's TURN key is literally
   `row.session_id`; :38 documents it as the turn's OTel trace id.
4. `supabase/migrations/20260802160000_turn_feedback.sql` —
   `trace_id text not null`, commented "= messages.trace_id, text; =
   telemetry_events.session_id. Join by value — no FK."

**Conclusion:** the verdict joins to an Inspect turn on the key Inspect
ALREADY groups by. No new id, no schema change, no RULE-28 risk. This is
the single most important premise of the phase and it is CLOSED.

## §2 · Inspect's read path — TWO doors, not one (the load-bearing surprise)
`src/components/admin/InspectTab.tsx:173-182`, `refresh()`:
- `canAll && who !== 'me'` → `loadTelemetryAdmin(...)` → **GET
  /api/admin/telemetry**, service-role, RLS-exempt, gated server-side on
  `PERMISSIONS.TELEMETRY_READ_ALL` (`api/admin/telemetry.ts:52`; super_admin
  only, plain 403 otherwise).
- otherwise → `loadTelemetry(...)` → **personal own-rows RLS path, browser
  SELECT** — untouched by the admin endpoint, used even by a super_admin
  while the user filter says "ben/me" (the DEFAULT state).

**Design consequence:** a badge wired only into `/api/admin/telemetry`
appears ONLY after the owner switches the user dropdown to "tüm
kullanıcılar". On the default screen — the one the owner will actually open
— it would be invisible. Any design that touches one door only is wrong.

## §3 · Where a badge would land (render sites, already-existing pattern)
`InspectTab.tsx:609-619` renders three turn badges from
`inspectGrouping.TurnBadges` (`grounding` · `truncated` · `quotaDegraded`),
each a `<Badge variant="outline">` on the turn row; `TurnBadges` is built in
`buildTurn()` (`inspectGrouping.ts:68-96`) purely from the turn's own event
rows. A verdict is NOT derivable from telemetry rows — it arrives minutes
later from a different table — so `TurnBadges` cannot compute it; the
verdict must be MERGED IN as a per-turn lookup the grouping function
accepts, or applied at the render site over a trace-keyed map.

## §4 · What the feedback lane offers today (read surface)
- `TurnFeedbackRepository` exposes exactly ONE method: `upsert(...)`
  (`grep 'async ' TurnFeedbackRepository.ts` → one hit). There is **no read
  method at all** on the server side.
- The only existing reader is the CLIENT's `loadOwnFeedback(conversationId)`
  (`src/lib/feedbackService.ts:65-82`) — a browser RLS SELECT keyed by
  `conversation_id`, returning a `trace_id`-keyed map, `[]` on error.
- So the phase must add: one server-side read (service-role, gated) and/or
  one trace-keyed client read. Nothing exists to reuse verbatim.

## §5 · The three decisions the phase must make (Architect's committed answers)
**D-A · Which door?** → BOTH, via ONE new mechanism: a trace-keyed verdict
lookup the client merges, so the badge behaves identically on the personal
RLS path and the cross-user admin path. Rejected: joining inside
`/api/admin/telemetry` (covers one door, and edits a gated read path for a
cosmetic gain).

**D-B · Which permission?** → Mirror telemetry's own posture exactly, because
the privacy tier is identical (another user's words about another user's
turn): own rows ride the browser RLS SELECT; cross-user rides a NEW gated
endpoint on `PERMISSIONS.TELEMETRY_READ_ALL` (`shared/permissions.ts:83`),
never a lower gate. Rejected: PANEL_ACCESS for cross-user — that would let a
maker read every user's feedback text, a privacy widening M1F1 never
authorized.

**D-C · Does `reason_text` render in the list?** → NO. The list row carries
the VERDICT chip only (👍/👎); the free-text reason renders in the expanded
turn detail, where the owner is already looking at one specific turn. A
2000-char user sentence in a scrollable list is both a layout hazard
(RULE 26) and a privacy leak by shoulder-surfing. Not a new rule — the same
restraint `query_head` already gets.

## §6 · What this phase is NOT (scope fence, named)
- NOT aggregates, trends, thresholds, or the Health tab — those are rollout
  plan 1.3/1.4 and stay there.
- NOT a 👎-review queue and NOT golden-question promotion — plan 1.4.
- NOT any change to the producer: no new write path, no schema, no
  migration, ZERO Operator involvement.
- The THREE HARD RULINGS stay intact by construction: an admin read surface
  is not a prompt input, not a knowledge source, not a viz data source; the
  `feedbackPipelineIsolation` fence is untouched and must stay green.

## §7 · Live floor this phase would build on (computed this session)
origin/master `dec3ff557036bc142d85002d596f9c74325a76ce` · remote heads:
master only · 65 migrations (turn_feedback APPLIED, Operator ALL GATES PASS)
· 420 vitest files / 4675 tests (AG-reported, CI-arbitrated) · docVersion
rev 179 · prod `dpl_71mgWvoZ1fRquH9ZRhi2PmVhzFYj` READY on `dec3ff55` ·
one live feedback write observed (`POST /api/cwf/feedback 200`, 17:37:46Z,
fence ok).
**Not read this session (would be re-derived at prompt time, D-1):** the
current row count in `turn_feedback` (Operator lane), and whether any
telemetry row exists for that first verdict's `trace_id` — the phase's own
post-deploy proof read is exactly that badge appearing on that turn.

## §8 · Size estimate
One new gated endpoint + one repository read method + one client lookup +
badge render + filter ("yalnız 👎"), plus tests including a positive control
that the badge can FAIL to appear (S66-1: a turn with no verdict must render
NO chip, and the detector must be proven able to fire). Zero migrations,
zero governed writes, zero publishes, zero Operator steps.

<!-- END · RECON-INSPECT-VERDICT-1-v1 -->
