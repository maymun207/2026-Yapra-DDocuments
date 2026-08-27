# S122 · OWNER DECISIONS — T1 — v1

Four rulings are requested. Each is stated as a signable paragraph with its evidence
attached. Nothing in this file has been implemented (P-3). Sign, amend, or refuse each.

---

## DECISION 1 · T1-3 — SUSPEND THE `SILENT-UNTIL` DECLARATION REQUIREMENT

### The ruling put to you, to sign as written or amend

> The `SILENT-UNTIL` declaration requirement is **SUSPENDED** until `factory_write_lane` can
> represent it. Every lane is **UNDECLARED-SILENT BY INSTRUMENT**; this is now stated policy
> rather than silent drift. The requirement returns when, and only when, the schema can store
> it — capability first, then policy.

### The evidence, re-measured live rather than relayed

Read 2026-08-27T20:58Z from the live catalogue via `pg_catalog` (never
`information_schema`, per S94-2):

```
proname               | identity_args
----------------------+-------------------------------------------------
factory_assert_nonce  | p_addr text, p_nonce_sha text
factory_claim         | p_addr text, p_nonce_sha text
factory_heartbeat     | p_addr text, p_nonce_sha text
factory_reclaim       | p_addr text, p_dead_nonce text, p_new_nonce text
factory_set_mode      | p_mode text, p_nonce_sha text
factory_write_lane    | p_addr text, p_state text, p_nonce_sha text
```

`factory_write_lane` takes three parameters and **none of them is a note or declaration
field**. No function in the `factory_*` family has one. The requirement cannot be satisfied by
any lane, however diligent.

### Why this is a suspension and not a repair

The price is already paid and it is on the record: the silence contract is the lens that would
have shown an address was blocked, and with no write path a three-hour block stayed invisible.
Continuing to order a declaration the instrument cannot store does not buy the lens back — it
only guarantees that every lane is in breach of a rule nobody can obey, which is how a rule
stops being read at all.

The schema change is **T2-E**, Operator work, and it is out of T1 scope by the directive's own
fence. This ruling holds the line honestly until then.

### What is NOT being asked

You are not being asked to weaken the silence contract. Nothing is deleted. The requirement is
marked suspended-with-a-named-condition and returns automatically when T2-E lands.

**OWNER DECISION: SIGN | AMEND | REFUSE** ____________  date: __________

---

## DECISION 2 · T1-6 — CP-8's JURISDICTION

### The question you asked, answered by measurement

> *"Is CP-8 currently enforced against landed documents, or only at card preflight?"*

**Only at card preflight.** `cardPreflight` is invoked by `scripts/mail-wait.mjs` when a card
body is delivered to a lane, and by its own unit test. **No CI workflow runs it over
`docs/relay/`.** Three probes with three different assumptions agree; they are tabled in
§1c of `S122-T1-MEASUREMENT-AND-DEVIATION-MEMO-v1`.

Of the two branches you named, **(b) is true: CP-8's binding status is narrower than
declared.** The corpus is not nominally illegal. It is governed by `relayAudit`, which has its
own exemption set and is green over all 302 documents.

The "89% of the corpus" figure measured a check against documents it never governed.

### The ruling put to you — one path, recommended

> CP-8's jurisdiction **stays narrow**: it governs cards at mint and delivery, not landed
> documents. The divergence between `cardPreflight` and `relayAudit` is not resolved by
> extending either one's reach; it is resolved by making each correct within its own
> jurisdiction, which is what T2-C3 is for. No landed document is rewritten to satisfy CP-8.

**Why, in one sentence:** a card is about to be executed and deserves the strict lens, a landed
report is a historical record, and rewriting eighty of them to move a number would be exactly
the silent shrinkage P-2 forbids.

**OWNER DECISION: SIGN | AMEND | REFUSE** ____________  date: __________

---

## DECISION 3 · T1-1 — THE ACCEPTANCE CRITERION MUST BE REPLACED

### Why this reaches you at all

T1-1's acceptance says the corpus refusal rate falls "from 89% to ≤1%". Measured, the
prescribed change lands at **26.5%**, and the remaining 26.5% is **not** false positives — it
is 80 landed documents carrying genuine truncated shas in prose, which is precisely what CP-8
exists to catch. Reaching ≤1% would require exempting wider than `relayAudit` — forbidden in
T1-1's own sentence — or rewriting those 80 documents, which P-2 forbids.

Full decomposition and the inspected residue: §1a–1b of the measurement memo.

### The replacement put to you

> T1-1's acceptance becomes: **(i)** the CP-8 **false-positive** rate over the landed corpus
> falls to **0**, measured on the labelled classes — hex-compatible English words, migration
> filenames, CI run ids, and content on lines `relayAudit` already exempts; **(ii)** the
> **true-positive** count is reported as its own number, expected to be **80** and unchanged;
> **(iii)** a genuine secret-string and raw-hash fixture is still refused; **(iv)** the full
> 40-hex sha is still accepted, proving CP-8's purpose survived the repair.

### One design fact this ruling carries with it

`relayAudit` **reds** the full 40-hex sha outside an exempt line; CP-8 exists to **require**
it. So "make CP-8 the same as relayAudit" would destroy CP-8's purpose. The repair takes
relayAudit's **anchoring** (`\b…\b`, which is the whole cure for the "succeeded" class) and its
**exemption set**, while keeping CP-8's own `{7,39}` bound. The card is written to that shape
and is **HELD** until you rule.

**OWNER DECISION: SIGN | AMEND | REFUSE** ____________  date: __________

---

## DECISION 4 · T1-2 — THE BOOT REPAIR INVERTS UNDER MEASUREMENT

### What was found

T1-2(a) orders replacing the `--since` form with "the watermark form". Measured by executing
the tool's own parser: **`--since` is accepted**; **`--watermark` is refused by name**. The
directive's prescription would break the first box read of every producer lane.

The defect it describes was real and **was repaired on 2026-08-26** by AG-4's own card
`PHASE-MAILWAIT-FLAGS-1` — the day before the inventory recorded it as open. What the tool now
refuses is **unknown flags by name**, which is AG-4's repair working, not `--since`.

Evidence, including the probe table of adjacent spellings: §2 of the measurement memo.

### The ruling put to you — one path

> T1-2(a) is **WITHDRAWN**: there is no defect to repair. In its place, one producer-boot card
> makes a single coherent pass over `.claude/boot/producer.md` doing two things: **(a)** state
> the accepted `--since` form explicitly and warn that the `--since=<iso>` equals form is
> refused by name — the one spelling that genuinely fails; **(b)** supply the missing concrete
> first-action poll command, verified by executing it once in a real producer lane, since
> `producer.md` today contains no command form at all and the lane must invent one.

That card is **HELD** until you rule, because it edits a boot file.

**OWNER DECISION: SIGN | AMEND | REFUSE** ____________  date: __________

---

TAIL ANCHOR: S122-OWNER-DECISIONS-T1-v1 ends here.
