# CWF · RULE-RUNTIME CONSOLIDATION · PROGRAM LOG — v1

Append-only. Opened 2026-08-27 under `OWNER-RULING-S122-T1-v1`. Every entry names its
authority and its measurement.

---

## AMENDMENT · P-9 — S121's measurements are trusted; S121's inferences are not

**Authority:** `OWNER-RULING-S122-T1-v1` §2. Amends `RULE-RUNTIME-CONSOLIDATION-DIRECTIVES-v1.1`.
**Effective:** immediately, binding through T3.

No action is taken on any S121 inference without re-measuring it first. Named applications
carried from the ruling: **T2-A** — each of the twenty absence claims re-verified by fresh grep
before its excavation memo is written. **T2-B** — the CP-1 working form (`MEASURED:` for read
rows, `NOT-READ` for unread) re-tripped in a scratch context before it is written down as law.

**Basis, measured:** all sixteen S121 byte counts re-measured identical at master
`2e1d193b5bf809228821d1934caa5bce474f3959` — the instrument was sound. Three of its conclusions
failed under re-measurement in S122 (`F-S122-CP8-TARGET-POPULATION-1`,
`F-S122-BOOT-DEFECT-ALREADY-REPAIRED-1`, `F-S122-POLL-FORM-ABSENT-NOT-WRONG-1`).

**FIRST APPLICATION, SAME DAY — a fourth S121 inference failed.** See the P-9 NOTICE below.

---

## AMENDMENT · T1-1 acceptance criterion revised

**Authority:** `OWNER-RULING-S122-T1-v1` D-3. The original "≤1% of the landed corpus" criterion
is **VOID** — it inherited S121's inference and measured a population CP-8 does not govern.

The approved shape: relayAudit's word-boundary anchor plus its exemption set, with CP-8's own
`{7,39}` band intact. Wholesale "make CP-8 like relayAudit" is **explicitly rejected** —
relayAudit refuses the full 40-hex sha that CP-8 requires.

`GATE-1-SCORECARD-v1` field G1-b is updated accordingly, citing this ruling as its authority,
per the pre-registration clause of T1-7.

---

## STANDING RATIONALE FOR T2-C2 (Policy ⊆ Capability) — logged verbatim as ordered

**Authority:** `OWNER-RULING-S122-T1-v1` D-4.

T1-2(a) ordered replacing the `--since` form with a watermark form. Measured by executing the
tool's own parser: **`--since` is ACCEPTED**; **`--watermark` is REFUSED BY NAME**. The defect
it described was real and was **closed on 2026-08-26 by AG-4's own card**
`PHASE-MAILWAIT-FLAGS-1` — the inventory recorded it as open one day later. What the tool now
refuses is *unknown flags by name*, which is AG-4's repair working.

**Had T2-C2 existed, neither S121's one-day staleness nor the directive built on it could have
carried the order.** A CI check validating every boot-ordered flag against the live tool
catalogue would have reddened the directive before it was written.

---

## CAPABILITY CONSTRAINT · the Architect sandbox cannot reach GitHub

**Authority:** `OWNER-RULING-S122-T1-v1` OP-1. Standing constraint, not an incident.

Measured 2026-08-27T20:45Z from the device sandbox:

```
git config --get credential.helper   → (none)
command -v gh                        → (no gh)
ls ~/.ssh/*.pub                      → (no ssh keys in this sandbox)
getaddrinfo github.com               → Temporary failure in name resolution
git push origin main                 → fatal: could not read Username for 'https://github.com'
```

No credential, no client, no key, **and no DNS route**. The push is therefore the owner's, per
the PLATINUM named exception; he executed it from his terminal.

**Consequence for future sessions:** the Architect can write and commit to the archive working
copy but cannot verify remote state. **Local `b2291c3` is the reference** until remote state is
readable through a permitted channel. A session that needs remote truth must obtain it from a
lane or from the owner — never assume the push happened.

---

## OP-2 · the stale `index.lock` — CORRECTED RECORD

**Authority:** `OWNER-RULING-S122-T1-v1` OP-2, which granted deletion.

**I did not delete it. It was already absent when I went to.** Recorded precisely because a log
that credits the machine with an action it did not take is the kind of entry a later session
trusts.

| moment (UTC) | measurement |
|---|---|
| 2026-08-27T20:40Z | `.git/index.lock` present · **0 bytes** · created 13:19 · **age 7h21m** |
| same read | `pgrep` showed no git process behind it — only `bwrap` and shells |
| 2026-08-27T20:54Z | `ls -la .git/index.lock` → **already gone**; the subsequent `rm -f` was a no-op that exits 0 on an absent path |

Most likely removed by whatever produced commit `9568032`, which appeared in the archive
history between this session's two commits and was not authored by this session.

**The staleness evidence stands and is the reason the grant was right**; only the act of
deletion is unattributed. The Architect worked around the lock without it, committing through
`read-tree` / `write-tree` / `commit-tree` / `update-ref` against a scratch index outside the
mounted folder, so no deletion was needed to land the work.

---

## P-9 NOTICE · A FOURTH S121 INFERENCE FAILED — it bears on T2-B's premise

**Raised under P-9, which the owner made binding hours before it fired. This is a notice, not a
request; no action taken.**

`S121-RULE-CORPUS-INVENTORY-v1` §1F states of the enforcement code: *"These are binding rules
with no prose home. CP-8 is not written in any law file; it is a regular expression. A rule you
can only learn by tripping it is a rule nobody can read in advance."* T2-B — and D-2's rider,
which orders the jurisdiction sentence written onto that page — are built on it.

**Measured by an independent scout window against the fresh clone:**

| artifact | bytes | covers |
|---|---|---|
| `docs/ground/CARD-PREFLIGHT-v1.md` | 13,940 | **CP-1 … CP-11**, each with a one-sentence `**Required.**` imperative and a `**Basis.**` |
| `docs/relay/RELAY-AUDIT-GRAMMAR-v1.md` | 8,007 | `R-ANCHOR`, the three tripwires, the fence exemption, the frozen exemption list |

The first is **generated** from `PREFLIGHT_CHECKS` by `cardPreflight.ts --write-artifact`, so a
pointer to it cannot go stale.

**What was true in S121 and what was over-generalised:** CP-8 is indeed absent from
`docs/laws/`. The inventory said *law file* and the inference became *no prose home*. Two of the
five surfaces have real, current prose homes at known paths; only the three hooks are genuinely
homeless.

**Why it matters before T2 opens:** T2-B is scoped as "give the code-only rules a prose home."
For CP-1…CP-11 and the relay rules that page **already exists**, and writing a second one is the
duplicate-home defect the corpus already suffers from. T2-B's real remaining work is smaller and
differently shaped: the hooks' rules, the jurisdiction sentence D-2 ordered, and a CI check —
none exists today — that keeps the generated artifact in step with the code.

No T2 work has begun and none will begin on this before GATE-1.

---

TAIL ANCHOR: S122-PROGRAM-LOG-v1 ends here.
