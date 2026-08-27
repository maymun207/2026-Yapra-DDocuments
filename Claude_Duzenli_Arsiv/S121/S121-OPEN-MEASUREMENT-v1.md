# S121 · OPEN MEASUREMENT — v1

MEASURED-AT 2026-08-27 08:30–08:48Z (11:30–11:48 TSİ). Fresh clone at
`/home/claude/cwf_s121`, the live database, and the connected archive folder. Nothing below was
carried from memory; every line names how it was taken.

**ON DISAGREEMENT:** where this document and any carrier disagree, the fresh clone and the live
database win, and the difference is recorded as a finding — which is what §3 is.

---

## 0 · SOTA-1 — POSITIVE CONTROL (S66-1)

Restated verbatim from `docs/laws/constitution/SOTA-1.md` at `cd8261ef`, not from memory:

> **SOTA-1 — KABUL KRİTERİ (S80).** v1'in tek kabul kriteri `cwf-sota-definition`'dır. O
> dosyadaki bir kritere izlenemeyen her şey v1 kapsamı dışıdır. Architect, bir SOTA kriterini
> ilerleten hiçbir kalemi *"şimdilik gerek yok / az trafik / bu kadarı yeter / sonra / v1.1'e"*
> gerekçesiyle **erteleyemez, küçültemez, sırada aşağı çekemez.** Elinde kalan **tek** itiraz
> sınıfı *"bu sıralama SOTA'yı kanıtlanamaz kılar"*dır ve ancak şunları YAZILI adlandırırsa
> kabul edilir: **(a)** hangi kriter kanıtsız kalır, **(b)** hangi tarihte kanıtlanabilir olur,
> **(c)** hangi ölçüm çözer. Üçü eksik her erteleme önerisi bir **SOTA-1 ihlalidir**: sahip
> adıyla iptal eder, Architect ya aynı mesajda (a)+(b)+(c)'yi verir ya öneriyi geri çeker —
> üçüncü yol yoktur. Bir kriter YALNIZ kanıtla emekli olur; kolaylık, maliyet veya kapsam
> baskısıyla asla.

`enforcement: ADVISORY` · `source: owner-held:CLAUDE-PROJECT-INSTRUCTIONS — fullest attested
wording, v5_1`.

---

## 1 · THE ANCHOR — VERIFIED, LINE BY LINE

| anchor line (bootstrap v120 §0) | measured | verdict |
|---|---|---|
| master `cd8261ef53509efb9f6f7d985c0ce235e0695393` | `git rev-parse HEAD` on a fresh clone; `git ls-remote` agrees; HEAD **is at** master | ✅ |
| remote branches 90 | `git ls-remote --heads origin` → 90 (5 lane · 82 phase · 2 probe · master) | ✅ |
| relay corpus 289 | `find docs/relay -name '*.md'` → 289 | ✅ |
| frozen exemption entries 82 | non-comment lines of `docs/relay/RELAY-AUDIT-EXEMPT-HISTORY-v1.txt` → 82 | ✅ |
| newest migration `20260825153000_factory_recovery.sql` | `ls supabase/migrations \| tail -1` | ✅ |
| gates 47 of 47 | `relayAuditGate.test.ts` 37/37 · `archivePush.test.ts` (secret guard) 10/10 — run here | ✅ |

**Beyond the anchor, because S120 was punished for running one suite:** the **whole** local suite
was run at this commit — **695 test files, 10 119 passed, 4 expected-fail, 0 failures, 975 s.**
The trunk is green under a lens 347× wider than the anchor's, and the anchor's two files are 2 of
those 695. Recorded as `F-S121-ANCHOR-GATE-SCOPE-IS-TWO-FILES-1` (LOW): the anchor line is true
and its scope is narrower than the words "47 of 47" suggest.

`architect:open` fields 4, 10 and 11 returned UNMEASURED (`gh` ENOENT · no
`SUPABASE_ACCESS_TOKEN`). That is the shape of this container, not a fault; the live reads below
were taken through the Supabase MCP surface instead. A direct GitHub API probe returned **403 —
repository not enabled for this session**, confirming the proxy gate.

---

## 2 · THE OPENING FINDINGS — four, all of the same shape S120 named

Every one is a claim that was true when written, went stale or was refuted, and kept being obeyed.

### `F-S121-BOOTSTRAP-REFUTES-ITS-OWN-SESSION-LEDGER-1` — **HIGH**

Bootstrap v120 §4, the file that opens this session, says of the owner's **first** product item:

> *"honestbench state: **67 KB of landed design across three reports, zero lines of code.** No
> harness, no fixture, no scorer. The design phase is over; only building remains."*

`S120-HANDOVER-CENSUS-v1` carries the same sentence. **Both are refuted by measurements taken in
the same session, by the same Architect, and landed on the same trunk:**

- `S120-FINDINGS-LEDGER-v3` §3 — `F-S120-HONESTBENCH-IS-PUBLISHED-1`, measured by a lane **and**
  independently by the Architect **from two networks with the same hash pins**: the repository is
  PUBLIC, the instrument answers on a public HTTPS path, and **the adversary modes are implemented
  code** — four families, five dial positions, one null honesty control.
- `cwf-implementation-order-S120-v32` §2 — **A4 · CLOSED@evidence**, with the explicit sentence
  *"No owner ruling is required and none should be requested."*
- `docs/honestbench-harness-0-report.md` on the trunk — §4 *"The instrument — built, and proven by
  running"*, §4 *"The five dials"*, §4 *"The three files"*, §4 *"Verification"*.

So of *harness · fixture · scorer*, **two of the three exist and are on a public endpoint.** The
one that does not exist is the **deterministic scorer** (`F-S120-NO-DETERMINISTIC-SCORER-EXISTS-1`,
four lenses; `v32` A4b: *"THE REAL BLOCKER"*).

**Why this is the worst possible carrier to be wrong:** the bootstrap is minted last precisely so
it is not stale on arrival, it is the first file S121 reads, and the sentence understates by two
thirds the completion of the one item the owner ordered first. A card cut from it would have
rebuilt a harness that exists.

### `F-S121-FACTORY-DB-NEVER-SHUT-1` — **HIGH**

The bootstrap and the session close both state the factory is *shut down*. **The database does not
know it.** Live `public.factory_state`, read 08:35Z:

| row | state | nonce held | last heartbeat |
|---|---|---|---|
| mode row | **`READY`** | — | set 2026-08-26 02:21:24Z by AG-5 |
| AG-1 | `WORKING` | yes | 2026-08-27 05:56:35Z |
| AG-2 | `WORKING` | yes | 2026-08-27 05:58:31Z |
| AG-3 | `WORKING` | yes | 2026-08-27 05:58:42Z |
| AG-4 | `WORKING` | yes | 2026-08-27 05:58:22Z |
| AG-5 | `CLAIMED` | yes | 2026-08-27 05:57:37Z |

What was shut is five windows on the owner's machine. **No `DRAINING`, no `SHUTDOWN`, no `CLOSED`
lane row was ever written.** Per the memory seed's own §12.15, a death certificate has two halves
in two systems; here **neither database half exists**, and the surviving half is a mode row that
says the factory is open and fully staffed.

Consequence, and it is not theoretical: `producer.md` orders a window not to claim on
`DRAINING`/`SHUTDOWN`. The mode says `READY`. **Any window opened now will claim** — and it will
claim an address whose row is already held by a dead nonce.

### `F-S121-SEED-CLAIM-GUARD-REMEDY-ALREADY-LANDED-1` — MEDIUM

`cwf-memory-seed-CWF5-v3` §3 carries the S118 deadlock (`FW002` on re-claim, `FW001` on the
`CLOSED` write that would clear it) and says the cure *"is a PHASE — not a hand-patch."* **That
phase landed.** `20260825153000_factory_recovery.sql` is the newest migration on the trunk, and
`factory_reclaim(p_addr, p_dead_nonce, p_new_nonce)` **exists in the live database** — measured in
`pg_catalog.pg_proc`, alongside `factory_claim`, `factory_write_lane`, `factory_set_mode`,
`factory_heartbeat`, `relay_mark_consumed`, `relay_post_from_lane`.

It moves `CLAIMED → CLAIMED` swapping the nonce, refuses to forge a `CLOSED` a foreman sweep would
read as a death, and writes an event marked `UNCORROBORATED-TAKEOVER` carrying both shas. The
deadlock is remedied; the seed says it is not. Good news, wrongly carried.

### `F-S121-AG1-HAS-NO-STOP-CARD-1` — MEDIUM

`S120-HANDOVER-CENSUS-v1` prints a five-row table with a `stop card` column reading **UNCONSUMED
for all five addresses**, implying five cards. Bootstrap v120 §5 says *"**Four** undelivered stop
cards remain on the bus for AG-1..AG-5"* — four cards, five addresses, in one sentence.

Measured on the live bus (`relay_inbox`, `consumed_at is null`): **four stop cards exist** —
`RULING-S120-STAND-DOWN-1-v1` to AG-2, AG-3, AG-4, and `RULING-S120-FACTORY-STOP-1-v1` to AG-5.
**AG-1 has none.** Its newest unconsumed card is `PHASE-ENV-PRESENCE-PROBE-1-v1` from 26 Aug
02:42Z — a work card.

Combined with the finding above: AG-1 is the one address that, if its window is ever continued,
reads a `READY` factory and a work card, and no instruction to stand down.

---

## 3 · WHERE honestbench ACTUALLY STANDS — the eight preconditions, and who owns each

Taken from `PHASE-HONESTBENCH-SCORER-DESIGN-2-AG3-report.md` §5 on the trunk (primary, landed),
not from any summary:

| # | precondition | exists? | owner |
|---|---|---|---|
| 1 | instrument reachable on public HTTPS | **YES** | — *retired as a blocker* |
| 2 | backend mounted in CWF: the two data rows | no | **Operator** — a write, not a judgement |
| 3 | the closed detection vocabulary named or located | no | **ARCHITECT** — a ruling on frozen text |
| 4 | the provenance marker's literal form named | no | **ARCHITECT** |
| 5 | a ruling on the `runlog.jsonl` conflict | no | **ARCHITECT** |
| 6 | which M3 governs — brief's or amendment's | no | **ARCHITECT** |
| 7 | a dial set and a turn run against the mounted backend | no | whoever holds the run |
| 8 | the spend ceiling for a scored run | no | **OWNER** |

The lane's own sentence, and it is aimed at me: **"Only item 8 is an owner decision. Items 3–6 are
Architect rulings on frozen text and item 2 is an Operator action… the project has twice carried
build work wearing an owner's label."**

**Four of the eight nearest blockers on the owner's number-one item are rulings the Architect
owes.** They need no factory, no window, no branch, no spend. The frozen text they rule on was
located in S120 (`F-S120-THE-FROZEN-CONDITIONS-WERE-IN-THE-ARCHIVE-1`, CLOSED@evidence) and the
archive folder holding it is connected to this session now.

The same report adds the ordering that matters: **items 3–6 gate *scoring*, not *running*** — the
scorer consumes recorded artefacts, not a live session.

---

## 4 · THE ONE PATH FOR S121

**S121 spends itself on the four Architect rulings, and does not reopen the factory to do it.**

It satisfies §2's binding rule exactly: the criterion advanced is `mcp-honestbench`, named in
`cwf-sota-definition-v1_5` §5 and §10, one of the sixteen at 0/16 — the only queued item that
moves the external scoreboard. It costs nothing, needs no window, and unblocks the scorer, which
`v32` calls the real blocker.

**It also removes the shape of the S120 failure rather than repeating it.** S120's arithmetic was
five producers behind one serial verifier. Rulings are verifier work with no producer waiting on
them; there is no queue to form.

Only after the rulings are written does a build card become worth cutting — and by then it is a
single card for a single address, which is the mode this factory has actually been measured
succeeding in: given a decision, one address delivered a verified fix in seventeen minutes.

---

## 5 · WHAT S121 IS NOT DOING, AND WHY IT IS NAMED RATHER THAN SILENT

- **Not reopening the factory.** It was stopped deliberately; restarting is the owner's alone.
- **Not landing the twenty frozen branches.** Fourteen carry only reports and advance nothing.
  `context-retrieval-1` + `-organ` (26 commits, 40 code files) stay frozen **as a decision**, and
  this line is the record that the decision is still being taken rather than forgotten.
- **Not arming the corpus gate, not repairing the four exempted files.** Both are factory items
  under §2's rule. The owner consented to the first in S120; that consent is surfaced here, not
  spent, because the rule that came after it says a factory card is not cut.
- **Not writing the database half of the death certificate.** Writing a lane row is outside the
  Architect's declared surface (seed §7) and needs the owner's named, one-off consent with the
  reason written. It is not urgent while no window is open — and it becomes urgent the moment one
  is.

<!-- END · S121-OPEN-MEASUREMENT-v1 -->
