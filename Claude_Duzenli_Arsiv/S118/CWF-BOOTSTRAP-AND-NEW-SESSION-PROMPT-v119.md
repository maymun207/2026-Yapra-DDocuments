# CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v119

<!-- Supersedes v118. Written WHOLE (A-REC-S101-7). Every number below is a CLAIM
     measured at 2026-08-25T19:45Z and MUST be re-verified in a fresh clone plus a
     live DB read before any phase card is cut. If the clone disagrees, the CLONE
     WINS and the difference is filed as a bug. That rule is why this file exists. -->

---

## §0 · THE ANCHOR TABLE — verify, never recall

| anchor | value at S118 close |
|---|---|
| `origin/master` | `51826e6f8859ebc2c4aacc1ab4e2488c3df3133e` |
| factory mode | `READY` |
| AG-1 | `49134c2d` · AG-2 `80b1612c` · AG-3 `26198849` · AG-4 `9091af50` · AG-5 `077b63a0` (foreman) |
| operator · scout | `CLOSED`, no nonce, **no live window** |
| open phase branches | 9 (listed in §4) |
| ADF exit test | **2/6**, measured S118 |
| internal 7-key tally | **6/7** — open: `#29` A23 |
| acceptance contract | **0/16** — `cwf-sota-definition` v1_5 §10 |

**Verify the master sha and every lane nonce in a FRESH CLONE and a live
`factory_state` read before cutting anything.** Three separate sessions have been
burned by a carried number.

---

## §1 · THE OPENING PROMPT — paste this and NOTHING else

```
S119 açılıyor. Rolün: Architect (cwf_yaprak).

1. Proje kutusundan oku: CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v119 ·
   CWF-S118-SESSION-CLOSE-v1 · cwf-implementation-order-S118-v31 ·
   S118-FINDINGS-ADDENDUM-1 · S118-SESSION-NOTES-v1 (ikisi birlikte okunur,
   birleştirme borcu §5'te) · cwf-sota-definition-v1_5.
2. SOTA-1'i docs/laws/constitution/SOTA-1.md'den KELİMESİ KELİMESİNE ilk
   yanıtına yaz (S66-1 pozitif kontrolü).
3. §0 çapa tablosunu TAZE KLONDA ve canlı DB'de doğrula. Çelişkide klon kazanır,
   fark bir bug olarak kaydedilir.
4. Fabrikayı SOĞUK BAŞLAT — ve bunun bir KABUL TESTİ olduğunu bil (§2).
5. Sonra sıra: cwf-implementation-order-S118-v31.

DURUŞ: hüküm bus'a, sohbete değil · her yanıt "SENİN AKSİYON MADDELERİN" ile
biter · sahibe operasyon adımı yok (S102-YASA-1) · saatler HER ZAMAN TSİ · her
sayı bir iddiadır, telde/DB'de doğrula · nöbetlerini kendin kur (send_later) ·
hiçbir şeride sessizlikten DURMA atfetme, UNMEASURED de · dört hâl var:
BUSY · STOPPED · LOOP-STOPPED · HUNG, son ikisi yalnız sahibin ekranından görülür.
```

**Nothing else is pasted.** If the Architect needs a document, it is in the project
box or the repository. A paste that is not this prompt is a finding against the
zero-paste criterion, and it is recorded as one.

---

## §2 · THE FIRST ACT IS AN ACCEPTANCE TEST — do not let it pass unnoticed

S118 rewrote the claim walk to a PLAIN push. `CLAUDE.md` section 2 and
`.claude/commands/claim.md` both carry the new form; the force flag is gone from
both. The measured root cause was the `force` substring — a plain push and a force
push creating the same shape of throwaway ref were run back to back, and **only the
force form raised a dialog.**

**The card's acceptance test is: a lane claims an address with ZERO permission
dialogs.** No machine can prove it. It needs a real cold start, and the owner's eyes
are the instrument.

**So the cold start of S119 IS the test.** Ask the owner one question and only one:
*did a dialog appear while the lanes were claiming?* Record the answer as evidence
either way. A criterion retires only by evidence.

**AND THE TEST IS NARROWER THAN IT SOUNDS.** One dialog class closed — the force
class. **The PIPE class is still live** and was measured during S118's recon:

```
grep -n "..." <file> | head -25      → raised a dialog
```

`CLAUDE.md` lines 173–176 forbid pipes precisely because a prefix rule cannot match
a pipeline by definition. The lane broke a landed law and the harness did exactly
what it is for. **Do not read a pipe dialog as a failure of the claim fix** — they
are different classes, and conflating them was already recorded as
`A-REC-S118-DIALOG-CLASS-OVERCLAIMED-1`.

---

## §3 · WHAT S119 INHERITS — five named things, none of them a surprise

**1 · `PR #409` is open on a MEASURED RED and is the first build item.**
Head `209e4202`, `build (24.x) = FAILURE`. Two separate defects, ruled at S118:

- **C-group** — the conformance test failed AS DESIGNED (6 disagreements). That is
  the Architect's error: a deliberately-red test cannot pass a gate that requires
  green. `A-REC-S118-ORDERED-A-RED-TEST-THROUGH-A-GREEN-GATE-1`. **Remedy: the
  comparison becomes a REPORTING instrument — prints every disagreement, writes them
  to a governed document, exits 0.** The falsifier survives: it still FAILS on zero
  disagreements (proof it was written to agree with the world) and on failure to run.
- **B-group** — two detector assertions failed that are NOT the expected red:
  `BUS-ADMITS-AN-AUTHOR-THE-VERB-REFUSES` and `REPLY-AUTHORITY-DRIFT` were expected
  in the disagreement list and were absent. **The instrument cannot see the defect it
  was commissioned to see**, because it has no live-read path at all (three
  `UNMEASURED-live-*` entries say so). **This is NOT repaired by deleting the
  assertions.** Either the lane gets a live read — UNMEASURED, establish it first —
  or the live side is captured into a GOVERNED SNAPSHOT with its own freshness as a
  measured field.

**2 · master carries an UNAPPLIED migration.**
`supabase/migrations/20260825153000_factory_recovery.sql`, 207 lines, landed by
PR #407. **Merging a file is not applying a migration.** The Operator address reads
`CLOSED` with heartbeat never — no live window can apply it. And the danger is that
**nothing in the poll tick, the landing gate or `architect:open` reads pending
migrations, so the drift between repository and schema is SILENT.**

**3 · `PR #404` and `#405` are the FOREMAN'S OWN WORK** and it correctly refuses to
land them. They need a different lander. This is `NEVER MERGE YOUR OWN WORK` behaving
as designed, not a stall.

**4 · The carrier merge is OWED.** `S118-FINDINGS-ADDENDUM-1` (21 sections) has NOT
been merged into `S118-SESSION-NOTES`, and `REGISTER-BUG-BUCKET`,
`cwf-open-items-register` and `CWF-SESSION-GRAPH-KB` have not been versioned for
S118. **Nothing is lost — the addendum is a complete standalone document in the
project box** — but it is a DEBT and it is named here rather than left to be
discovered. Read BOTH `S118-SESSION-NOTES-v1` AND the addendum; the addendum wins on
anything they disagree about, because it is the later measurement.

**5 · The pipe-dialog class needs its own card**, with its own acceptance test: a
lane's whole recon runs with zero dialogs, **proven by a real run rather than by
reading the rule.**

---

## §4 · THE NINE OPEN BRANCHES — measured, not remembered

```
phase/authority-matrix-1            209e4202   PR #409, MEASURED RED, first build item
phase/sota-harness-recon-1          b7eb7632   the S118 recon report, needs landing
phase/context-retrieval-1           993fa218   the context organ, unlanded
phase/context-retrieval-1-organ     d72c39a0   sibling of the above
phase/authorship-lens-2             70be7849
phase/lens-author-set-1             2d7469d8
phase/lane-ag3-reclaim-1            2218dde8
phase/s118-lane-closing-2-ag5-report 1c1240a0
phase/s118-lane-sweep-2-ag5-report  a1548164
```

**Judge each by ANCESTRY, never by movement.** A branch that stops moving is either
stalled or DONE, and only `git merge-base --is-ancestor` tells them apart. The
Architect made that mistake twice in S118 and reported a live lane as idle for it.

**And never read a two-dot diff as an unlanded signal.** `CLAUDE.md` section 4 names
the trap; S118 met it three times in one session, and the foreman's
`git merge-tree --write-tree` rehearsal is the instrument that answers the question
actually asked.

---

## §5 · THE ORDER — it changed, and the reason is measured

The owner's approved shape was **Wave 9 build → Wave 10 benchmarks**. The S118 recon
refutes its premise:

> **The harness the acceptance contract calls blocking is NOT BLOCKED BY CODE.**
> Every code floor is repaired and wired; every phase has landed. What stands between
> this system and its first external measurement is deployment, one governed data
> write, and a spend authorisation — **none of which is build work.**

So the two waves sit on **DIFFERENT critical paths and do not compete.** The
benchmark unblocks start immediately and in parallel; Wave 9 proceeds beside them.

**Under SOTA-1 this REMOVES the deferral question rather than answering it.** The
Architect owes no (a)+(b)+(c) objection, because the correct ordering is not a
deferral.

The binding sequence lives in `cwf-implementation-order-S118-v31`.

---

## §6 · THE OWNER'S SURFACE — consent and witness only, never operations

Four things only he can move, and all four block the first external measurement:

1. **A long-lived host with a public HTTPS URL** for `a2a/server.ts`, built from
   `Dockerfile.a2a` or from a pushed image. **Not configured anywhere.** Vercel
   cannot hold this endpoint open — the code says so itself.
2. **A public HTTPS endpoint for the honestbench instrument.** It is containerised
   and locally proven and *"deliberately never published; publication is an owner
   decision, not an oversight."*
3. **An Operator (Gemini) window** — for two data rows (the `backends` identity and
   the global MCP server row in `mcp_global_settings`, **not** `mcp_settings`), and
   for the unapplied migration in §3.2.
4. **A spend authorisation**, plus a ruling on whether the synthetic injector is
   paused for the run window.

Also owner-held, credential class, env-only: `A2A_TRIGGER_SECRET` and
`A2A_ACTOR_USER_ID` (a real `auth.users` uuid, **not a sentinel**), and
`A2A_CARD_URL` set to the address peers actually use.

**Standing owner rulings carried into S119:**

- **S118-H2** — foreman landings carry standing spend consent for the wave. **Bound:**
  a landing that actually FIRES `eval-canary` still wants a named approval for that
  firing. Every S118 landing read `eval-canary = skipped`.
- **Budget fence** — eight consecutive red scheduled days. Ruling: **watch, no
  action.** STANDING EXCEPTION: **if the stop actually fires, tell the owner
  immediately — nothing else will.** Report SHAPE only; never read the fence logs
  into an artefact.
- **Window hangs** — no report filed by owner decision; write one on the NEXT
  occurrence. S118 held one: AG-1 `HUNG` on a modal, recovered the moment the owner
  closed it, and the recovery was measured (heartbeat 1323s → beating, card stamped
  within a minute). **That is a positive measurement of the diagnosis, and it is why
  silence is never read as a stop.**

---

## §7 · DISCIPLINE THAT S118 PAID FOR — carried forward by name

- **A decay clause names events the card's own delivery and execution CANNOT cause.**
  If reading the card, claiming an address, or stamping the box can trip it, the
  clause is scoped wrong. Measured twice in one session.
- **Supersession by recency does NOT survive this bus.** A newer card does not stop
  an older one from being handed over afterwards — AG-4 read a superseded version
  thirty minutes AFTER the version that superseded it. A superseded card must be
  SELF-CANCELLING, because the Architect holds no credential that can retire a row.
- **The bus is APPEND-ONLY** (`RI001`); only the delivery stamp is updatable. A
  payload larger than one insert is multi-row by force of design — that, not a size
  limit, is why the S113 transport was split. Plain text makes an incomplete set
  DETECTABLE; an encoded split does not.
- **A stamp is a DELIVERY MARK, not a consumption of the body.** A stamped row is
  still readable and reading it again is not a defect.
- **Cards enter the bus only after preflight PASS and the landed auditor at zero
  violations**, and every INSERT returns `md5(body)` to be compared against the local
  file before the card is considered posted.
- **VOCABULARY, owner ruling S118-H4: the word is STOPPED, never "death" or "dead."**
  A lane that goes quiet has STOPPED; it has not died. The distinction is not
  politeness — this project's standing law is that **silence is never evidence of a
  stop**, and calling the artefact a *death* certificate argued against the law every
  time it was read. A stop is a STATE and it is reversible; death implies a fate and a
  cause, and neither is ever measured from silence. The four states are therefore
  **BUSY · STOPPED · LOOP-STOPPED · HUNG**, and the closing artefact is a **STOP
  CERTIFICATE** — still two halves in two systems, a `CLOSED` state row plus a
  released ref. **`producer.md` line 120 and its siblings still carry the old word and
  a lane must change them**; the Architect does not write repository files.
- **A refusal is a MEASUREMENT.** It is printed verbatim, never routed around, never
  retried, and never resolved by raising a timeout.

---

## §8 · THE THREE SCOREBOARDS, AND THE ONE THAT DOES NOT EXIST

| board | measures | value |
|---|---|---|
| acceptance contract (`cwf-sota-definition`) | the REAL product | **0/16** |
| internal 7-key tally | internal readiness, NOT acceptance | **6/7** |
| ADF exit test, six criteria | is the car drivable | **2/6** |

**A fourth does not exist and must not be written.** ADF has no acceptance contract
of its own; the owner deferred it to *"when the second product arrives"* and the
sealed architecture document records that as his decision. Writing one would invent a
scoreboard he has explicitly postponed, and every hour scoring it is an hour taken
from the sixteen.

**Turning the seventh key does NOT satisfy SOTA-1.** A close that cites the internal
board without the acceptance board is incomplete.

<!-- END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v119 -->
