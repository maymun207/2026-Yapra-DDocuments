# CWF — v1 SCOPE CUT · v1_0
<!-- cwf-v1-scope-cut-v1_0 · 2026-07-30 · S70 · Architect: Claude.
     Floor: origin/master 8434efcc28b078bad136a88907962d11a702ecac · docVersion rev 162
     · 387 test files / 4318 tests · 59 migrations · docs/adr 11 · production
     dpl_95zkZJrGEj31YaRpzG1bzRwTqAQa READY.
     Derived from cwf-open-items-register-v70 §7 + git + code reads. NOT from any
     lane's memory index (see §6, F222). Owner ratification required — §7. -->

## §0 · Why this document exists, stated plainly

The owner asked on 2026-07-30 why, after five weeks, no working v1 has shipped.
The answer is not that the work was slow or wrong. It is that **v1 was never
defined**, so nothing could ever be outside it.

`cwf-master-plan-v5_3` defines seven BLOCKS and a close (B5 freeze lift → B6 docs
→ B7 close). That is a *finish-everything* definition of release. Under it, every
finding is potentially in scope and the date is unbounded by construction. Two of
seven blocks are done (B1 IR, B2 Superset); the plan's own §1 says out loud that
**B3 has not started** and that everything running since S66 is a
measurement-and-hardening line *between* B2 and B3.

There is a second, quieter reason. **S69-1 parks findings into B5, and B5 is on
the release line.** Parking is not a discharge, it is a transfer — and the
transfer target is precisely the block that gates the release. Without a cut,
S69-1 protects the queue's order while lengthening its tail.

This is an Architect failure, not an Author or Operator one. The missing artifact
is this one.

## §1 · THE DEFINITION

> **v1 is the smallest complete system a Kale operator can rely on safely — not
> the system with every finding closed.**

Three tests decide membership. An item is in v1 if and only if it fails one:

- **T1 · SAFE** — can its absence cause a wrong action, a mutated factory, an
  ungrounded answer presented as grounded, or a leaked secret?
- **T2 · REACHABLE** — does it sit on a path a real user or operator takes today,
  in production, with today's governed flag values?
- **T3 · DEPLOYABLE** — does a real installation at Kale fail or require manual
  intervention without it? (PLATINUM RULE: a required manual step is a defect.)

Everything else is **v1.1**, recorded by name, with its evidence.

**What v1 explicitly does NOT promise:** the understanding layer (A23) · frame
routing switched on · Kale-RAG · a measured Recall@k target · a closed
`router_proposals` queue · zero known findings. Each of those is named in §3 with
the reason it waits, so no reader has to guess whether it was forgotten.

## §2 · BUCKET A — IN v1

Ordered as it will be worked. Every item carries the test it fails.

| # | item | test | why it is in v1 |
|---|---|---|---|
| A1 | **F212 disposition** — the 19 pending `router_proposals` rows | T2 | The panel now shows each row's guard clause and whether the guard could see its corpus. Zero code; an owner decision on live governed rows. A release cannot ship with a curation queue nobody has ruled on. |
| A2 | **F153** — Superset `0.0.0.0` URLs | T3 | A `0.0.0.0` URL cannot resolve from a real deployment. Kale/ARDIC ops item; without it the BI backend is unreachable from anywhere but the authoring machine. |
| A3 | **F203** — `maymun207@gmail.com` has no `auth.users` row | T1 | Owner actions are attributed to an identity that does not exist in the identity table. Every governed publish's audit trail inherits that gap. |
| A4 | **B3 minimum — MEMORY-1 only** | T2 | Multi-turn memory is what makes the system usable rather than demonstrable. **Minimum slice only**: MEMORY-1's design note + implementation, carrying the A23 cross-turn-carrier CONTRACT paragraph (§3.4). F48 and F83/F83.1 move to v1.1. |
| A5 | **Freeze lift + the publishes it gates** | T3 | 🧊 GOLDEN FREEZE blocks `prompt.segment` publishes today. Shipping a release whose prompt layer cannot be published is shipping a system that cannot be corrected in the field. The freeze's named block (viz v4 · `safety.b1_scope` v3 · `tools.rule.1` v2 · `tools.rule.6` v2) is re-cut in v1_1 of this document — see §6. |
| A6 | **F214** — the code floor and the live catalog have diverged | T1 (weak) | 42 tools in the floor and absent live, 20 live and absent from the floor. The floor serves precisely when the DB cannot, so routing changes materially under outage. **Severity downgraded this session:** ADR-011 enforces the write lock at the floor as well (`docs/adr/ADR-011:99-113`), so the divergence is a READ-set divergence — degraded answers under outage, not unsafe ones. **This is the last v1 item and the FIRST to cut if the date is pressed.** |
| A7 | **B6 minimum docs** | T3 | Documentation of what actually ships, at release altitude. Not the full architecture program — that is B6-full, v1.1. |
| A8 | **B7 — tag + release notes** | — | The close. |

**Plus the ledger work that costs no phase** (folded into A1–A8's session
bookkeeping, listed so it is not forgotten): F129 restored to the register and
closed against ROUTE-SHADOW's M2 · F222 index correction (relayed) · F206's
falsified live-impact wording corrected · register v71 / KB v69 / bootstrap v69.

## §3 · BUCKET B — v1.1, each with its evidence

### 3.1 Moved by a reachability read computed this session

- **F177 · the numeric record-identifier class.** `stageClarify.ts:338` returns at
  `!ctx.frameRoutingEnabled` before any blocking decision runs, and
  `router.frameRouting = 0`. The 164 "blocking frames" and M-A's 85 % block rate
  are **replay counterfactuals** — what the gate WOULD do — not lived user
  experience. Fails T1, T2 and T3. → v1.1, and its real home is A23 Step 6, whose
  own build order names *"F177 okumaları önce"*.
- **F206 · local tools are not written to the durable ledger.** The register's
  stated consequence ("counted as an empty answer and RE-RUN") is **falsified as
  written**: the live retry decision is `isEmptyCompletion({ text, toolCallCount:
  ctx.toolCallCount })` — an in-memory counter incremented during the stream
  (`completionGuard.ts:39`, callers `stageStream.ts:144` and `:208`) — and never
  reads the ledger. What remains is real but different: **measurement integrity.**
  The 37-row gap corrupts any metric joined on the ledger (F211's denominator,
  ROUTE-SHADOW's pools). Fails no v1 test. → v1.1.

### 3.2 Moved by owner ruling, 2026-07-30

- **A23 / F175 — the whole understanding-layer line** (§9 Steps 2, 3, 4, 5, 6, 7;
  PB-A entity retrieval; PB-B tool-corpus role change). Its own §10 boundary note
  says the cross-turn carrier is a minimal working memory that *B3 extends and does
  not break* — and that constraint is satisfiable by a **contract paragraph inside
  MEMORY-1's design note** reserving the ⑤/⑥ slice, not by building A23 first. The
  cheap resolution was available and the Architect chose the expensive one on
  2026-07-30 before reversing it the same day. → after B7, as its own program.
- **`router.frameRouting = 1`** — bound to the A23 evaluation, reopenable only
  there (pre-registered rule unamended: M1 = 0 over N ≥ 30 → GO; M1 is 5/52). → v1.1.
- **CLASS-GATE-1** — the two mechanical detectors for the "decision written twice"
  and "built with no caller" classes. Proposed and ratified this session as "B5",
  but B5 now splits: this belongs to **B5-b (post-v1)**, not to A5. Applying the
  cut to my own proposal is the test of whether the cut is real. The detector
  prototype is held Architect-side and is not lost.
- **B4 · Kale-RAG** — external dependency; `cwf-master-plan-v5_3` §4 already parks
  it if Kale's side is not ready. **Explicitly outside v1.**

### 3.3 Already parked under S69-1, unchanged, carried here by name

**M-C** · **SYNTH-TRAFFIC-2 / F204** · **F196** (`rule26` CI noise) · **F202**
(`unknown_tool` rejection) · **F208** (`check:doc-drift` names culprits from
history) · **F211** (31 of 95 frame turns without `turn_done`) · **F216** (a
preview build cannot express "deliberately incomplete") · **F219** (`ChatPreview`
dev fixtures in the production bundle) · **F198** (unbounded reads; PostgREST
truncates silently at 1000) · **DISCOVERY-EXTEND-2** (`static_args jsonb`; blocked
on the frameRouting flip, which is now v1.1, so this is too) · **F184** ·
**`factory_registry` drop** · **M-B** · **F178** · **F179** · **F180** · **F165** ·
**D5** · **F189** · **F191** · **F207** (Superset usage is ~zero) · **F197's
riders** · **F-CONTEXTTURNS** · **F-LEARNENABLED-PROVENANCE** · **F222** (index
correction, relayed as a no-build note) · **B6-full** · **F48** · **F83 + F83.1**.

**Absent-without-a-home: EMPTY.** Every item in register v70 §7 appears in
Bucket A or Bucket B above.

### 3.4 The one contract v1 owes v1.1

MEMORY-1's design note (A4) must contain a paragraph reserving the **⑤/⑥
cross-turn carrier slice** — its shape, its owner, and the statement that B3's
working memory is a superset that extends it rather than replacing it. This is the
whole cost of moving A23 out of the v1 path, and it is one paragraph in a document
that has to be written anyway.

## §4 · What I do not yet know, said before it becomes a surprise

`cwf-master-plan-v5_3` §1 carries a **legacy B5 list** inherited from v5_2 whose
full wording lives in registers v62–v67, not in v70: F138 · F139 · F140 · F133-L5 ·
F142 · BUDGET-HONEST-1 · GOLDEN-ASSIST-2 · SPECIMEN-HEALTH-1 · F118 · F119 · F120 ·
F135 · F122 · LANGFUSE-V4-UPGRADE · separate-POC-key belt · STAGE-PLAYGROUND ·
branch cleanup · BOARD-WALK residuals · dev-preview seam residuals.

**I have not read their wording, so I have not cut them, and I will not guess.**
Applying T1/T2/T3 to that list is one mechanical pass over four registers and it is
the first thing I do after ratification. It produces `cwf-v1-scope-cut-v1_1`.

**Honest consequence:** that pass can only ADD to Bucket A, never subtract. My
expectation is 0–3 additional v1 items — the security/deployability ones (the
separate-POC-key belt and the dev-preview seam residuals are the likely
candidates). If it comes back with more, the cut gets tighter rather than the date
getting later, and that decision comes back to the owner.

## §5 · THE v1 PATH — what is actually left

```
  0. legacy-B5 cut pass (Architect, mechanical, no phase)  →  scope-cut v1_1
  1. A1  F212 disposition            (owner decision, zero code)
  2. A2  F153 Superset URLs
  3. A3  F203 identity row
  4. A6  F214 outage-floor refresh
  5. A4  MEMORY-1  (+ the A23 carrier contract paragraph)
  6. A5  freeze lift + its gated publishes
  7. A7  B6 minimum docs
  8. A8  B7 tag
```

**Eight steps, of which one is an owner decision and one is bookkeeping.**
Pace-derived estimate, from the observed S69/S70 cadence (S69: four merges in one
day; S70: one merge plus a full independent review): **roughly two to three
working weeks**, plus whatever step 0 adds. That is derived from measured cadence,
not promised — a single diagnosis that turns out wrong moves it, and the honest
history of this project is that it happens about once a week.

## §6 · What could still move the date, named in advance

1. **Step 0's outcome.** §4. The only unknown I am declaring rather than hiding.
2. **A4 MEMORY-1's design note.** It is the largest single piece of new design in
   v1 and the only one where the diagnosis does not exist yet.
3. **A5's freeze-lift block.** The four named publishes (viz v4 · `safety.b1_scope`
   v3 · `tools.rule.1` v2 · `tools.rule.6` v2) each go through the unbypassable
   eval-gate. A gate refusal is a phase, not a retry.
4. **The ledger drift itself.** F129 (register lost a live item) and F222 (index
   kept dead items as live) are the same class in opposite directions, and neither
   is caught by a gate today. A cut built on a drifted ledger is a cut built on
   sand — which is why every item above was derived from register v70, git and code
   reads, and **not one from a memory index.**

## §7 · RATIFICATION — what the owner is approving

- **R1** · the DEFINITION in §1 and its three tests T1/T2/T3.
- **R2** · Bucket A as the v1 contents (8 items), with A6 named as the first cut
  under date pressure.
- **R3** · Bucket B as v1.1, including **A23 after B7**, **frameRouting stays
  dark**, **B4 Kale-RAG outside v1**, and **CLASS-GATE-1 in B5-b rather than B5-a**.
- **R4** · step 0 (the legacy-B5 pass) as the immediate next Architect work,
  producing `cwf-v1-scope-cut-v1_1` before any new phase prompt is written.

Once R1–R4 are ratified, this document — not the block list — is what "done"
means, and the next question anyone asks about scope is answered by T1/T2/T3
instead of by judgement.

<!-- END · cwf-v1-scope-cut-v1_0 · 2026-07-30 · S70 · floor 8434efcc / rev 162 -->
