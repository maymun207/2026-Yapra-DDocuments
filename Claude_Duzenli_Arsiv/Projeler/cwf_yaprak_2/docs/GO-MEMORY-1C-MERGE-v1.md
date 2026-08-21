# GO → AG · MEMORY-1C MERGE AUTHORIZED · 2026-07-31
<!-- Architect-authored · RULE-25 PASSED on a fresh clone of
     origin/phase/memory-1c @ f1066e3afc9d6a444bea8bdc3b6a535f26ffe130,
     merge-base = 40896d3c273a69694603201d22b0d9b6528b8548. -->

## 1 · Review facts (independently verified)

Suite arbitration on the reviewer's clone: **402 files / 4469 tests /
0 failed — delta 0** against your report. Structural: migration shape
matches the binding spec to the column, with the all-grantees revoke
verbatim (`revoke select, insert, update, delete, truncate … from public,
anon, authenticated`) · tick ordering delete→append in code · promotion
kind server-hardcoded to `armes.glossary_term` · chatParser `{field,
header}` normalization display-only ("the model still supplies ZERO
values") · stage-14 diff flips ONLY the button sentence, deep laws intact,
sources gained `memory_audit ✍️` · grounding isolation clean ·
docVersion **rev 166** · migrations 61 → **62**. Your hand-back on v1 and
the 42P01 pre-apply note were both correct calls — the phase is the better
for them.

## 2 · Merge mechanics (in order)

1. `git checkout master && git pull` — confirm `40896d3c…`; anything else
   → STOP and report.
2. Merge `phase/memory-1c` with `--no-ff` (squash BANNED), message VERBATIM
   from §4.
3. Push. Report `git rev-parse origin/master` verbatim.

## 3 · Post-merge sequence (blocking, in order)

- **CI on master:** `build-test.yml` on the new master SHA completes
  **green** — wait for the conclusion string; `in_progress`/absent is not
  a pass.
- **Production deploy:** the merge-SHA deployment reaches `state=READY,
  target=production`; report the `dpl_…` id.
- **The Operator door:** the owner then relays OPERATOR-APPLY-MEMORY-1C-v1
  to the Operator lane (not yours). Until that apply lands, the
  `memory_audit` 42P01 silent-degrade lines in production are the DESIGNED
  window, not an incident.
- **§3 proof reads** (Architect + owner hands, per the phase prompt):
  promotion publish+rollback `[Gate]` pair · one expendable-episode delete
  · the first `forget_tick` ledger row at the next 03:40Z · the tab
  against live data. **F48 → CLOSED@evidence** when they land. This lane
  is idle after §2 — nothing further on any earlier instruction.

## 4 · MERGE COMMIT MESSAGE (verbatim, byte-exact)

Merge PHASE MEMORY-1C: the memory lane gets its window, its door, and its ledger

1A taught the platform to remember; 1B taught it to recall; 1C makes the
memory lane governable by a human — a window to look through, a door to
act through, and a ledger that holds both accountable.

The ledger exists because a premise error was surfaced instead of solved
around: this phase's first prompt decreed zero migrations, and the build
proved that decree wrong — every existing audit carrier is closed by an
action CHECK or sealed by its founding law, and the forget tick persisted
nothing at all. memory_audit is the honest carrier: append-only,
structure-only, no PII, service-role-only at read AND write, all-grantees
revoked, probe-verified. The forget tick now appends its own
{deleted, scanned} row — the heartbeat gained a ledger. Delete first,
append second; an append failure logs loud and drops, because
audit-down ≠ forget-down ≠ chat-down.

The window is the admin Memory tab: corpus health computed from real
reads (its pre-first-tick state says "no tick recorded yet" — never a
fabricated zero), a bounded episode browser that discloses truncation
rather than hiding it, and a detail drawer down to the turn id.

The door swings both ways and leaves marks. "Şunu unutsun" is now a
button: super-admin only, reason required, one structural audit row per
delete — deletion manages memory, never knowledge, and the stage-14 card
flips exactly one sentence to say so. Promotion rides the existing rail
unmodified: episode → provenance-carrying draft (kind server-hardcoded to
the semantic lane), the gate publishes, rollback is a new draft that must
re-pass the same gate, and while the brake holds the affordance is
visibly authoring-only. The agent proposes; the gate and a human dispose.

Riding along: CHART-SERIES-DIALECT-1. The parser now accepts the
{field, header} series dialect observed live in production — header
becomes the legend, the model still supplies zero values — red against
the real emitted block on the old parser, green on the new, with the
legacy string dialect green throughout.

One migration (61 → 62), Operator at the door. Suite 402/4469 green,
independently re-run to the digit on the reviewer's fresh clone;
docVersion rev 166. F48 closes on the live reads, not on this message.

<!-- END · GO-MEMORY-1C-MERGE · 2026-07-31 -->
