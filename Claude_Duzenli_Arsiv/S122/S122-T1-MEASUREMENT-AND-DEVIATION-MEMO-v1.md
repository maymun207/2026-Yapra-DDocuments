# S122 · T1 MEASUREMENT AND DEVIATION MEMO — v1

MEASURED 2026-08-27T20:19Z–21:05Z, from a fresh clone at master
`2e1d193b5bf809228821d1934caa5bce474f3959` and from the live database. Every number below
came from a command run in this session. Nothing is relayed and nothing is recalled (P-1).

**Why this document exists before any T1 change lands:** P-1 was applied to the directive's
own basis, and three of the seven T1 items did not survive it. Under P-3 and delivery note 2,
a deviation goes to the owner as a memo rather than into silent practice. Two items are held;
one is answered; the rest executed.

---

## 0 · THE BASIS IS SOUND — the drift check passed

The directive was measured at `89861c87353d94de2d9d052f871c298cfbe6b0ee`; master has since
moved eight landings to the sha above. Every governance surface was re-measured:

```
git diff --stat 89861c8..origin/master -- scripts/relayAudit.ts scripts/cardPreflight.ts \
    .claude/boot/ .claude/hooks/ .claude/settings.json docs/laws/
(empty — no file in any of these paths changed)
```

All sixteen byte counts in `S121-RULE-CORPUS-INVENTORY-v1` re-measure **identical**:
`docs/laws/` 135,274 · constitution 38,517 (16 files) · rules 61,510 (59 files) ·
foreman 47,982 · producer 26,375 · free 17,710 · operator 11,668 · `CLAUDE.md` 17,825 ·
`relayAudit.ts` 84,686 · `cardPreflight.ts` 50,225 · the three hooks 15,469 / 9,703 / 7,522 ·
`settings.json` 3,889.

**The inventory's measurements are good. Its three inferences are not, and that is the
difference this memo is about.**

---

## 1 · FINDING · `F-S122-CP8-TARGET-POPULATION-1` — T1-1's threshold is unreachable, and aimed at a population CP-8 does not govern

### 1a · The refusal rate decomposes, and most of it is not a false positive

CP-8 as landed, and two candidate repairs, run over all 302 landed relay documents:

| variant | refuses | rate |
|---|---|---|
| CP-8 as landed | 271 / 302 | **89.7%** |
| + relayAudit's word-boundary anchoring | 261 / 302 | 86.4% |
| + relayAudit's exemption set (fence delimiters, `evidence:*` fences, `## DIFF` fences, CLAIMS rows) | **80 / 302** | **26.5%** |

The prescribed change lands at **26.5%, not ≤1%.** The residue was inspected rather than
assumed, and it is **genuine truncated shas in ordinary prose** — exactly what CP-8 exists to
catch:

```
docs/relay/PHASE-FAULT-SWITCH-0-report.md:11   **commit** `8287599` ... **anchored at** `b2d6c55`
docs/relay/PHASE-STAGE-BENCH-1-report.md:3     **Base** `fe06ed6efd2a69d8c6d685ef36605db9a7501820`
docs/relay/PHASE-TOOL-BEHAVIOR-CENSUS-1A-report.md:16   `d8e7688…` ✅ same
```

So the 89.7% was two populations wearing one number: **~63 points of false positive**, which
the prescribed change removes cleanly, and **~26.5 points of true positive**, which it must
not remove. Reaching ≤1% would require either exempting wider than `relayAudit` — which T1-1
forbids in the same sentence — or rewriting 80 landed documents, which is outside T1 scope and
collides with the never-silently-shrink law (P-2).

### 1b · The root cause is the ANCHOR, not only the fence exemption

Both regexes were executed side by side. `relayAudit` uses `\b…\b`; CP-8 uses hex-character
lookarounds. That single difference is the whole "succeeded" class:

| input | CP-8 | relayAudit |
|---|---|---|
| `succeeded` | **FIRES** on `cceeded` | clean |
| `20260827120000_add_col.sql` | **FIRES** on the digit run | clean |
| `2f0804622c59b9b857208342314912499ba076f1` (full 40) | clean | **FIRES** |
| `2f08046` (truncated) | FIRES | FIRES |

A word boundary cannot fall between two word characters, so `\b` is already immune to a
hex-compatible tail sitting inside a longer word; the lookaround form is not. **The lexical
false positives are an anchoring defect, and the corpus divergence is an exemption defect.**
They are two changes with two different justifications, and T1-1 named only the second.

**The third line is the one that must not be missed:** `relayAudit` REDS the full 40-hex sha
outside an exempt line, while CP-8 exists to REQUIRE it. Making CP-8 "the same as relayAudit"
would destroy CP-8's purpose. The reconciliation must take relayAudit's **anchoring** and
**exemption set** while keeping CP-8's `{7,39}` bound and its intent. This is inside T1-1's
"do not change its intent", but it is not what a literal reading would produce.

### 1c · CP-8 does not govern the corpus at all — three independent probes

| probe | assumption | result |
|---|---|---|
| grep for `card:preflight` / `cardPreflight` across every file type | it is invoked by name | invoked only by `scripts/mail-wait.mjs` and its own unit test |
| read what `relay-corpus.yml` actually runs | the corpus job might call it indirectly | it runs `npx vitest run api/cwf/__tests__/relayAuditGate.test.ts` — relayAudit's gate |
| enumerate all workflows | a differently-named job might host it | 8 workflows; none runs the preflight |

**`cardPreflight` runs at card delivery, inside `mail-wait.mjs`. No CI workflow runs it over
`docs/relay/`.** The corpus is governed by `relayAudit`, which has its own exemption set and
is green. So a "corpus re-scan refusal rate" is not a measure of CP-8's health — it measures a
check against documents it never governed. **This also answers T1-6; see §4.**

### 1d · What is asked

T1-1's acceptance criterion needs replacing, and P-3 forbids me replacing it myself. The
proposed correction, for the owner's ruling:

> **Old:** landed-relay refusal rate falls from 89% to ≤1%, and the secret fixture still trips.
> **New:** (i) the CP-8 **false-positive** rate over the landed corpus falls to **0**, measured
> on the labelled classes — hex-compatible English words, migration filenames, CI run ids, and
> content on lines `relayAudit` already exempts; (ii) the **true-positive** count is reported
> as its own number and is expected to be **80**, unchanged, because those are real short shas;
> (iii) a genuine secret-string and raw-hash fixture is still refused; (iv) the full 40-hex sha
> is still accepted, proving CP-8's purpose survived.

The card is written and **HELD** pending this ruling.

---

## 2 · FINDING · `F-S122-BOOT-DEFECT-ALREADY-REPAIRED-1` — T1-2(a) would install a flag that does not exist

The inventory's item ④ says the boot orders `--since` and the tool now refuses it "in favour
of the watermark". Measured against the live tool, by executing its own parser:

```
$ node -e "import('/tmp/cwf/scripts/mail-wait.mjs')..."   parseArgs(['AG-3','--once','--since','2026-08-27T00:00:00Z'])
KNOWN_FLAGS : cadence-sec, budget-min, since, read, once, take, table-lens, pre-watermark
parsed      : {"lane":"AG-3","once":true,"since":"2026-08-27T00:00:00Z"}
unknownFlags: []
VERDICT     : ACCEPTED — no unknown flag
```

The form `producer.md` line 253 orders — verbatim, space-separated — is **accepted**. Adjacent
spellings were probed, because one accepting probe is not proof:

| form | verdict |
|---|---|
| `--once --since <iso>` (the boot's own form) | **ACCEPTED** |
| `--since=<iso>` (equals form) | **REFUSED BY NAME** |
| flags reordered | ACCEPTED |
| no `--since` at all | ACCEPTED |
| `--watermark <iso>` — the form T1-2(a) prescribes | **REFUSED BY NAME** |

**T1-2(a) orders replacing a working flag with one the tool refuses.** Executed as written, it
breaks the first box read of every producer lane.

**How the error was born, and it matters more than the error.** `scripts/mail-wait.mjs` last
changed on 2026-08-26 at 06:10 in commit `067dfb72`, titled *"PHASE-MAILWAIT-FLAGS-1 AG-4: the
box reader stops answering questions nobody asked"* — **AG-4's own card, the lane the inventory
credits with the measurement.** Its commit body records what actually happened: `parseArgs`
built its positional list with `argv.filter(a => !a.startsWith('--'))`, so an unrecognised flag
was silently discarded, and a typo, a retired flag and a never-implemented flag were
byte-identical to correct usage. AG-4's repair **added** the unknown-flag refusal.

So: the defect was real, it was repaired the day before the inventory recorded it as open, and
what the tool "now refuses" is **unknown flags by name** — not `--since`. The "watermark" in
AG-4's output was the high-water mark *concept*, the default anchor, never a `--watermark` flag.

This is the program's own target failure mode — a finding carried between bodies without
re-measurement — arriving inside the program's founding directive. It is the strongest possible
argument for the program, and the strongest possible argument for P-1.

**T1-2(a) is HELD. Nothing was changed.** The real remaining hazard, if the owner wants it repaired, is
that the boot does not warn that the equals form is refused by name. That is a different
one-line edit and it needs his ruling, not my initiative.

---

## 3 · FINDING · `F-S122-POLL-FORM-ABSENT-NOT-WRONG-1` — T1-2(b) is an addition, not a replacement

`producer.md` §"First action: your own poll task" (line 196) orders the lane to *"create your
poll task… Then list it back and print its id"*. Read in full, **it contains no concrete
command form at all.** The measured symptom in inventory item ⑥ — a lane losing ten minutes
concluding the mechanism did not exist — is caused by an **absent** form, not a wrong one.

The repair direction is unchanged; the edit is an addition rather than a replacement, and the
item's acceptance ("verified by executing it once in a scratch lane") is **producer-lane work,
not Architect work**: the permission classifier does not exist in the Architect container, so I
cannot verify acceptance here. Declared rather than assumed around.

Because this edit and the held T1-2(a) live in the same file, the producer-boot card is held
with it, so one lane makes one coherent pass over `producer.md` after the ruling.

---

## 4 · T1-6 · THE OWNER'S QUESTION IS ANSWERED BY MEASUREMENT

> *"Is CP-8 currently enforced against landed documents, or only at card preflight?"*

**Only at card preflight** — specifically inside `mail-wait.mjs` when a card body is delivered
to a lane. Evidence is the three-probe table in §1c.

Of the two branches offered, **(b) is the true one: CP-8's binding status is narrower than
declared.** The corpus does **not** operate nominally-illegal, because CP-8 has no jurisdiction
over it; `relayAudit` governs `docs/relay/` and it is green there.

**What still needs the owner's pen** is not the fact but the intent: should CP-8's jurisdiction
stay narrow? The Architect's recommendation, one path: **yes, keep it narrow.** A card is a
thing about to be executed and deserves the strict lens; a landed report is a historical record
and rewriting 80 of them to satisfy a check that never governed them would be shrinkage in
service of a number. The divergence itself is real and is exactly what T2-C3 is for — the two
checks should be made to *agree about what they each govern*, not merged into one jurisdiction.

---

## 5 · WHAT WAS EXECUTED, AND WHAT IS HELD

| item | state | note |
|---|---|---|
| T1-1 CP-8 reconciliation | **CARD WRITTEN, HELD** | acceptance criterion unreachable as written; ruling requested in §1d |
| T1-2(a) `--since` | **HELD — DO NOT EXECUTE** | prescribed replacement is refused by the tool; defect already repaired |
| T1-2(b) poll form | **HELD with 2(a)** | same file; addition not replacement; needs a producer lane to verify |
| T1-3 SILENT-UNTIL memo | **DELIVERED** | separate memo; schema evidence re-verified live from `pg_catalog` |
| T1-4 self-describing refusals | **CARD DISPATCHED, GREEN** | preflighted locally; refused 3× here, 0 refusals at the producer |
| T1-5 shift-left preflight | **ADOPTED AND PROVEN** | see §6 |
| T1-6 enforcement question | **ANSWERED** | §4; the intent half still needs his ruling |
| T1-7 GATE-1 scorecard | **DELIVERED** | separate artifact, verdict boxes empty, dry run attached |
| P-6 baseline | **STARTED** | separate metrics log |

---

## 6 · T1-5 IS NOT A HABIT HERE, IT IS A MEASURED CAPABILITY

`cardPreflight` runs in the Architect container. Its self-test passes in both arms —
`red=proven green=proven` across 24 scenarios — which is the positive control that the check
can still fail (S66-1).

The T1-4 card was then preflighted before dispatch and **refused three times**:

```
attempt 1  REFUSED-CHECKS=CP-1,CP-3,CP-5
attempt 2  REFUSED-CHECKS=CP-1,CP-3
attempt 3  GREEN — every check passed. The card may be inserted.
```

Three refusals that a producer lane would otherwise have met, met here instead, at no cost to
anyone's window. **Post-dispatch validator refusals for this session: 0.**

One thing that surfaced while doing it, and it is evidence for T1-4 rather than a complaint:
`R-ANCHOR` refused with *"names anchor "guard", which resolves to no ```evidence:guard fence in
this file"* — a refusal that states the expected form, and it was fixed in one pass. CP-3
refused with *"premise line carries no instrument"* while firing on a fence delimiter, and it
never says what an instrument is. **The same author, in the same minute, was taught by one
refusal and left guessing by the other.** That is T1-4's entire thesis, measured.

---

## 7 · A NOTE ON `docs/laws/` WHICH THIS SESSION DID NOT TOUCH

No rule, law, boot file, hook or check was changed by the Architect in this session. The
standing hold of bootstrap §1④ is treated as lifted **only** for the scope this directive
names, and no wider (P-8).

---

TAIL ANCHOR: S122-T1-MEASUREMENT-AND-DEVIATION-MEMO-v1 ends here.
