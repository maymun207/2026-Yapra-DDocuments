# S121 · OPEN MEASUREMENT — v2

**SUPERSEDES v1. v1 IS NOT DELETED AND NOTHING IN IT WAS SHORTENED** (S37-1: a presented artefact
is immutable; a correction is a new version). Written WHOLE, not patched (A-REC-S101-7).

MEASURED-AT 2026-08-27 08:30–09:35Z (11:30–12:35 TSİ). Fresh clone at `/home/claude/cwf_s121`
(`git clone https://github.com/maymun207/cwf_yaprak.git`, HEAD `cd8261ef53509efb9f6f7d985c0ce235e0695393`),
the live database (Supabase project `fjbrkimwvtpwoxhziidh`, read-only MCP surface), and the
connected archive folder `Claude_Duzenli_Arsiv/`.

**ON DISAGREEMENT:** where this document and any carrier disagree, the fresh clone and the live
database win, and the difference is recorded as a finding — which is what §3 is.

---

## 0 · CARRY-DIFF FROM v1 — what an adversary changed, and what it did not

`S121-ADVERSARY-VERDICT-CODEX-1.md` (15 615 bytes, md5 `282303b705ffa617df9b21de2be74cc3`,
written 2026-08-27 09:25Z) returned **REFUTED** on v1. Four of its attacks were upheld and are
repaired here. Its central holding — that the chosen S121 path is unproven — is **partly upheld**:
v1 stated no falsifier for its own path, and §7 now does.

| v1 said | v2 says | what moved it |
|---|---|---|
| the trunk is green "under a lens **347× wider**" | the raw pair, with no multiplier: the anchor names **2** test files; the suite run here is **695** files / 10 119 passing tests | the multiplier was rhetorical, and 695 ÷ 2 = 347.5, not 347. A number in prose is a claim (TOTAL-45) and this one was mine |
| "**the deadlock is remedied**" | the remedy is **DEPLOYED, BYTE-IDENTICAL TO THE REVIEWED MIGRATION, AND EXECUTABLE BY THE LANE ROLE. Its behaviour is UNMEASURED** and stays so until it is executed under consent | existence in `pg_proc` is not behaviour (ADR-010: declaration is not observation). The re-measurement made the claim *stronger* and correctly bounded — see §3.3 |
| "AG-1 **has none**" (stop card) | AG-1 has no card **from the S120 stop wave** — now confirmed over ALL rows, consumed and unconsumed. Its box does hold an unconsumed `S116-DRAINING-AG1-v1` from 24 Aug, inert under the boot rule but present | v1 asserted an absence from ONE lens (unconsumed rows only), which is the exact law v1 quotes at others: a single negative probe is not proof of absence |
| "it **costs nothing**" | the four rulings need **no factory, no window, no branch, no cloud spend and no canary firing**; they do cost Architect time, tokens, and owner review | "costs nothing" was undefined and therefore false as written |
| no falsifier for the chosen path | §7 states what would make the chosen path wrong | v1 demanded falsifiers of others and supplied none of its own |

**What the adversary did NOT find, recorded because it bounds what this instrument is worth:** it
found **zero factual errors**. It had the document and no measurement channel, so it could attack
form and not the world. Every repair above came from a re-measurement *this* seat then ran. The
assessment of that is `S121-ADVERSARY-RUN-1-ASSESSMENT-v1`.

---

## 1 · SOTA-1 — POSITIVE CONTROL (S66-1)

Restated verbatim from `docs/laws/constitution/SOTA-1.md` at `cd8261ef`, read from the fresh clone,
not from memory:

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

File metadata as read: `enforcement: ADVISORY` · `source: owner-held:CLAUDE-PROJECT-INSTRUCTIONS —
fullest attested wording, v5_1`.

---

## 2 · THE ANCHOR — VERIFIED, WITH THE COMMAND THAT VERIFIED IT

| anchor line (bootstrap v120 §0) | command | measured | verdict |
|---|---|---|---|
| master `cd8261ef53509efb9f6f7d985c0ce235e0695393` | `git rev-parse HEAD` + `git ls-remote origin refs/heads/master` | identical; HEAD **is at** master | ✅ |
| remote branches 90 | `git ls-remote --heads origin \| wc -l` | 90 — 5 lane · 82 phase · 2 probe · master | ✅ |
| relay corpus 289 | `find docs/relay -name '*.md' -type f \| wc -l` | 289 | ✅ |
| frozen exemption entries 82 | `grep -vE '^\s*#\|^\s*$' docs/relay/RELAY-AUDIT-EXEMPT-HISTORY-v1.txt \| wc -l` | 82 | ✅ |
| newest migration | `ls supabase/migrations \| tail -1` | `20260825153000_factory_recovery.sql` | ✅ |
| gates 47 of 47 | `npx vitest run api/cwf/__tests__/relayAuditGate.test.ts` → 37/37 · `… archivePush.test.ts` → 10/10 | 37 + 10 = 47 | ✅ |

**SCOPE OF THAT LAST ROW, stated because S120 was punished for running one suite:** "47 of 47"
names **two** test files. The **whole** local suite was also run at this commit —
`npx vitest run` → **695 test files, 10 119 passed, 4 expected-fail, 0 failures, 974.73 s.**
Both readings agree; the second is the wider one. No multiplier is claimed between them.
Recorded as `F-S121-ANCHOR-GATE-SCOPE-IS-TWO-FILES-1` (LOW): the anchor line is true and its
scope is narrower than the words "47 of 47" suggest.

**What this container could NOT measure, named rather than defaulted to zero:** `architect:open`
fields 4, 10 and 11 print UNMEASURED (`spawnSync gh ENOENT`; `SUPABASE_ACCESS_TOKEN` unset). A
direct GitHub API call to `/actions/runs?head_sha=cd8261ef…` returned **403** with the body
*"GitHub access to this repository is not enabled for this session."* Two readings are consistent
with that: a session-scoped access gate (which the memory seed §11 already records as this
container's shape) or an auth/session misconfiguration. **Which one is UNMEASURED**; either way the
CI arbiter is in the lanes, and the live reads below were taken through the Supabase MCP surface.

---

## 3 · THE OPENING FINDINGS

Every one is a claim that was true when written and has since gone stale or been refuted, and that
was still being carried forward at S121 open.

### 3.1 · `F-S121-BOOTSTRAP-REFUTES-ITS-OWN-SESSION-LEDGER-1` — HIGH

Bootstrap v120 §4, the file that opens this session, says of the owner's **first** product item:

> *"honestbench state: **67 KB of landed design across three reports, zero lines of code.** No
> harness, no fixture, no scorer. The design phase is over; only building remains."*

`S120-HANDOVER-CENSUS-v1` carries the same sentence. **Both are contradicted by artefacts on the
trunk and by two carriers minted the same day:**

- `docs/honestbench-harness-0-report.md` — landed, read here from the fresh clone. Its section
  headings include *"The instrument — built, and proven by running"*, *"The five dials"*, *"The
  three files"*, *"Verification"*, and a scoring table printed **empty** with every mode marked
  *NOT RUN — not a pass*.
- `cwf-implementation-order-S120-v32` §2 — **A4 · CLOSED@evidence**, with the sentence *"No owner
  ruling is required and none should be requested."* Its A4b names the deterministic scorer as
  *"THE REAL BLOCKER."*
- `S120-FINDINGS-LEDGER-v3` §3 — `F-S120-HONESTBENCH-IS-PUBLISHED-1`, reported as measured by a
  lane **and** independently by the Architect from two networks with the same hash pins.

**HONEST BOUND ON THIS FINDING:** the third bullet is a carrier reporting a measurement, and this
seat did **not** re-probe the public endpoint (no such probe was run in S121). The first two
bullets are artefacts read directly here. So the load-bearing half — *a harness exists on the
trunk and A4 is closed in the landed order* — is measured; the *endpoint is live right now* half is
carried, not measured. **The resolving measurement is a fresh probe of the instrument's public
health path, and it has not been run this session.**

Even on the measured half alone, the bootstrap sentence is wrong: of *harness · fixture · scorer*,
the harness and its three files exist and are landed. The one that does not exist is the
**deterministic scorer**.

### 3.2 · `F-S121-FACTORY-DB-NEVER-SHUT-1` — HIGH

The bootstrap and the session close both state the factory is shut down. **The database does not
know it.** Live `public.factory_state`, read 08:35Z:

| row | state | nonce held | last heartbeat |
|---|---|---|---|
| mode row (`row_kind='factory'`) | **`READY`** | — | set 2026-08-26 02:21:24Z by AG-5 |
| AG-1 | `WORKING` | yes | 2026-08-27 05:56:35Z |
| AG-2 | `WORKING` | yes | 2026-08-27 05:58:31Z |
| AG-3 | `WORKING` | yes | 2026-08-27 05:58:42Z |
| AG-4 | `WORKING` | yes | 2026-08-27 05:58:22Z |
| AG-5 | `CLAIMED` | yes | 2026-08-27 05:57:37Z |
| operator · scout | `CLOSED` | no | — |

What was shut is five windows on the owner's machine. **No `DRAINING`, no `SHUTDOWN`, and no
`CLOSED` lane row was ever written.** Per the memory seed §12.15 a death certificate has two halves
in two systems; here **neither database half exists**, and the surviving row says the factory is
open.

**The operational consequence, and it is an inference, labelled as one:** `producer.md` orders a
window not to claim on `DRAINING`/`SHUTDOWN`. The mode says `READY`. **A window opened now is
therefore expected to attempt a claim** — and to meet a row held by a dead nonce. That expectation
is derived from the mode value plus the boot rule; it has not been executed and no dry run was
performed, because doing so would mutate the coordination plane.

### 3.3 · `F-S121-SEED-CLAIM-GUARD-REMEDY-ALREADY-LANDED-1` — MEDIUM

`cwf-memory-seed-CWF5-v3` §3 carries the S118 deadlock (`FW002` on re-claim, `FW001` on the
`CLOSED` write that would clear it) and says the cure *"is a PHASE — not a hand-patch."*
**That phase landed, and this version proves more than v1 did:**

| measurement | result |
|---|---|
| migration on trunk | `supabase/migrations/20260825153000_factory_recovery.sql`, newest in the directory |
| function present live | `public.factory_reclaim(p_addr text, p_dead_nonce text, p_new_nonce text)` in `pg_catalog.pg_proc` |
| **deployed body vs reviewed migration** | live `prosrc` **md5 `4d1f9d2a41c6d257550b3e6e42ba46e1`, length 2248** — **byte-identical** to the body inside the migration file's `$$…$$`. The inspected object and the deployed object are the same bytes |
| security | `prosecdef = true`, owner `postgres` |
| ACL | `{postgres=X, service_role=X, cwf_lane=X}` — `anon` and `authenticated` absent, exactly as the migration's lockdown intended |
| lane role | `cwf_lane` exists; `has_function_privilege('cwf_lane', …, 'EXECUTE')` = **true** |

**AND THE BOUND, WHICH IS THE PART v1 GOT WRONG:** all of the above is *presence and reachability*.
**The verb's behaviour is UNMEASURED.** Nothing here proves it performs the `CLAIMED → CLAIMED`
nonce swap, refuses the wrong predecessor, or writes its `UNCORROBORATED-TAKEOVER` event. Proving
that requires executing it, which mutates the coordination plane and is not done without named
consent. The correct sentence is: **the remedy is deployed and reachable; whether it works is
untested.**

### 3.4 · `F-S121-AG1-HAS-NO-STOP-CARD-1` — MEDIUM, corrected scope

`S120-HANDOVER-CENSUS-v1` prints a five-row table whose `stop card` column reads **UNCONSUMED for
all five addresses**, implying five cards exist. Bootstrap v120 §5 says *"**Four** undelivered stop
cards remain on the bus for AG-1..AG-5"* — four cards, five addresses, in one sentence.

**Measured over ALL rows for AG-1, consumed and unconsumed** (v1 read only the unconsumed set,
which was one lens and is the defect the adversary correctly named):

- The S120 stop wave contains exactly four cards: `RULING-S120-STAND-DOWN-1-v1` to AG-2, AG-3,
  AG-4, and `RULING-S120-FACTORY-STOP-1-v1` to AG-5. **Nothing from that wave is addressed to
  AG-1.** The census's fifth row has no card behind it.
- AG-1's box does contain **`S116-DRAINING-AG1-v1`, unconsumed, from 2026-08-24 00:11:19Z** — a
  stop-class card, but from three days and one factory reopen earlier. Under
  `MULTI-AG-WORKMODE-v1` §1.6 a lane executes only rows created after its own boot, so it is inert
  — **inert by a rule, not absent.**
- AG-1 was reading its box until shortly before it froze: `RULING-S120-SECRET-GUARD-FALSE-POSITIVE-1-v1`
  was **consumed at 05:28:34Z**, 28 minutes before its last heartbeat at 05:56:35Z.

**What remains UNMEASURED:** whether AG-1 holds a stop instruction outside the bus entirely — in
its window's own boot text, or given directly by the owner. The bus is one channel and this
measurement covers only the bus.

---

## 4 · WHERE honestbench ACTUALLY STANDS — the eight preconditions

From `docs/relay/PHASE-HONESTBENCH-SCORER-DESIGN-2-AG3-report.md` §5, read here from the fresh
clone (landed on the trunk; not a summary):

| # | precondition | exists? | owner |
|---|---|---|---|
| 1 | instrument reachable on public HTTPS | reported YES | — *retired as a blocker by that report* |
| 2 | backend mounted in CWF: the two data rows | no | **Operator** — a write, not a judgement |
| 3 | the closed detection vocabulary named or located | no | **ARCHITECT** — a ruling on frozen text |
| 4 | the provenance marker's literal form named | no | **ARCHITECT** |
| 5 | a ruling on the `runlog.jsonl` conflict | no | **ARCHITECT** |
| 6 | which M3 governs — brief's or amendment's | no | **ARCHITECT** |
| 7 | a dial set and a turn run against the mounted backend | no | whoever holds the run |
| 8 | the spend ceiling for a scored run | no | **OWNER** |

The report's own sentence, aimed at this seat: *"Only item 8 is an owner decision. Items 3–6 are
Architect rulings on frozen text and item 2 is an Operator action… the project has twice carried
build work wearing an owner's label."* It adds the ordering that matters: **items 3–6 gate
*scoring*, not *running*** — the scorer consumes recorded artefacts, not a live session.

**BOUND:** this table is read from a landed report; it has not been re-derived against the scorer
code and the frozen text by this seat. Doing that re-derivation **is** the work proposed in §5.

---

## 5 · THE ONE PATH FOR S121

**S121 spends itself on the four Architect rulings (preconditions 3–6), and does not reopen the
factory to do it.**

It satisfies bootstrap v120 §2's binding rule: the criterion advanced is `mcp-honestbench`, named
in `cwf-sota-definition-v1_5` §5 and carried in its §10 status table as one of the sixteen
unmeasured external criteria — the only queued item that moves the external scoreboard.

**COST, DEFINED RATHER THAN WAVED AT:** no factory, no window, no branch, no cloud spend, no
canary firing, no owner decision. It does cost Architect time and tokens, and it costs the owner a
review when the rulings are delivered.

It also removes the shape of the S120 failure instead of repeating it: S120's arithmetic was five
producers behind one serial verifier. Rulings are verifier work with no producer idling behind
them — though a queue can still form later, around the build cards these rulings unblock, and that
is when the single-address mode becomes the question.

---

## 6 · WHAT S121 IS NOT DOING, NAMED RATHER THAN SILENT

- **Not reopening the factory.** It was stopped deliberately; restarting is the owner's alone.
- **Not landing the twenty frozen branches.** Fourteen carry only reports.
  `context-retrieval-1` + `-organ` (26 commits, 40 code files per `S120-HANDOVER-CENSUS-v1`) stay
  frozen **as a decision**, and this line is the record that the decision is still being taken.
  Those branch numbers are carried from the census, not re-measured here.
- **Not arming the corpus gate, not repairing the four exempted files.** Both are factory items
  under §2's rule; the owner's S120 consent to the first is surfaced in
  `S121-PARKED-OWNER-ITEMS-v1`, not spent.
- **Not writing the database half of the death certificate.** A lane-row write is outside the
  Architect's declared surface (memory seed §7) and needs the owner's named one-off consent.

---

## 7 · WHAT WOULD FALSIFY THIS DOCUMENT'S CHOSEN PATH

Stated in advance, because v1 demanded falsifiers of others and supplied none of its own.

1. **If preconditions 3–6 turn out not to be Architect rulings** — if the frozen text, read
   directly, already names the detection vocabulary and the provenance marker — then the four
   rulings are not work, the blocker is elsewhere, and the path is wrong. **This is checkable
   before any ruling is written, by reading the frozen conditions in the archive.**
2. **If items 3–6 do not in fact gate scoring** — if the scorer can be written and run without
   them — then they are not on the critical path and building the scorer should come first.
3. **If `mcp-honestbench` is not one of the sixteen criteria in `cwf-sota-definition-v1_5` §10**,
   the SOTA-1 justification collapses and this becomes factory work that §2 forbids cutting.
4. **If the instrument's public endpoint is not live**, precondition 1 is not retired, and the
   nearest blocker is a host and a spend — the owner's, not the Architect's.

**Items 1 and 4 are cheap and unrun. They should be measured before the first ruling is written,
not after.**

<!-- END · S121-OPEN-MEASUREMENT-v2 -->
