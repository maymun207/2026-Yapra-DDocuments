# S133-DISPATCH-RECORD-2 — the cold restart landing, and the round that repaired the adversary mechanism itself

Written WHOLE (A-REC-S101-7) by the Architect at 2026-09-08T06:0xZ (09:0x TSİ), covering 05:00Z to 06:00Z. `S133-DISPATCH-RECORD-1` covers the session open to 05:00Z. The reason this is written mid-session rather than at close is the same as before: most of what follows exists nowhere but in this conversation until it is filed, and `F-S132-LEDGER-TRACK-ABANDONED-AT-S117-1` is what happens when that is left for later.

## 1 · THE RESTART LANDED, AND EVERY HALF WAS MEASURED

| act | measurement |
|---|---|
| foreman AG-5 reclaimed | nonce `4a81984328efbd5ed6754882b060ca1d5a09e8f5` → `5f2ae576c9a0cd7eefb6c185effe32fa7864dba6`, 05:11:56Z; leased push accepted `+ 4a819843...5f2ae576`; ref read back; `factory_reclaim` returned ok |
| mode published | `READY`, 05:24:15Z, `changed_by = AG-5` — after the Architect's `INIT` at 04:41:25Z |
| producer AG-4 reclaimed | nonce `279a0c62b9510ea4c75e92ba7b18bce7f4ecc99e` → `bbfeef1114946e1bf695cdb4a52fa0d72cc15c3b`; ref and row agree; `reclaim('AG-4','AG-4',…)` ok over the live write channel |
| scout | no address by ruling; alive by OUTPUT only — three verdicts posted between 05:22Z and 05:44Z |
| AG-1, AG-2, AG-3 | byte-identical before and after; untouched, as §4 explains |

Both windows proved their gate before claiming: `git -C /nonexistent-gate-probe push --force` was refused by `[guard-bash] BLOCKED · GB-4` in each, which is the PASS. The foreman found the shared clone THIRTY-ONE commits stale and fast-forwarded `11d6da31` → `5d482353161198d0b1381f9473fe86a02dce2bf3` before reading a line of law — `F-S116-BOOT-STALENESS-BLIND-1` avoided, and the Architect's anchor upgraded from CARRIED to MEASURED by a window that holds a credential.

## 2 · THE FOREMAN REFUSED AN ORDER AND WAS RIGHT

Step 3 of the foreman's start prompt ordered a cross-lane retirement of AG-1/2/3. It refused on two independent lenses — the repository's own policy fence and the harness classifier — and then went looking for a sanctioned path instead of concluding from one probe. There is none. MEASURED in `scripts/factoryState.mjs` at master: `reclaim(self, lane, deadNonceSha)` at :508 and `writeLane(self, lane, state)` at :395 both refuse `self !== lane` with `fenced: true` — *"Reclaiming another lane's address is a TAKEOVER, and a takeover is a decision a person makes, not a helper"* — and `planTakeover()` at :1147 returns a command string and an event and NEVER writes the row: *"NOTHING here shells out."*

So both halves of a certificate are performed by the window that will HOLD the address, and a third party can perform neither. The Architect ordered a motion the repository forbids by construction. `A-REC-S133-2-ARCHITECT-ORDERED-A-MOTION-THE-HELPER-FORBIDS-1` — the recurring class of memory seed §10: a spec written without first reading the live artefact it depends on. `NOTICE-S133-WITHDRAW-FOREMAN-STEP3-1` withdrew it and named the tempting forbidden route so no later reader takes it: the fence is policy in the CALLER, so a caller passing `self = 'AG-1'` would slip past it — that is a window misreporting its identity to get around a refusal, and `CLAUDE.md` §6 forbids it by name.

The foreman also withheld `READY` with a reasoned objection — a READY factory with no free address admits no producer. Correct for the ORDINARY walk, and answered by information it did not have: the producer arrives by NAMED SELF-RECLAIM, so `NO-ADDRESS-FREE` is the expected reading en route to the exception path, and leaving `INIT` standing would not have protected the producer but prevented its boot entirely.

## 3 · THE PRODUCER'S THREE FINDINGS, ALL THREE THE ARCHITECT'S DEFECTS

- **`F-S133-START-PROMPT-NAMES-A-VERSION-THAT-GOES-STALE-1`** — the start prompt named `CARD-WEB-VALVE-1-S132-1-v7`; v8 was minted four minutes later. AG-4 measured it, held v8, and said so. The cure: a start prompt names the CARD LINE and the gate, never a version; the RELEASE row carries the version.
- **`F-S133-RECLAIM-MOVES-THE-WATERMARK-AND-BLINDS-THE-POLLER-1`** — the watermark is the lane's own claim row, so claiming moved it from 2026-09-07T05:48:39Z to 2026-09-08T05:29:43Z and dropped ten pending cards beneath it. The next tick printed zero unconsumed rows WITH a read-OK attached: byte-identical to an empty box, and carrying the very signal meant to tell those apart. It cost nothing only because AG-4 read the backlog directly BEFORE claiming, as `CLAUDE.md` §1 orders. It also caught a real card — v8 was minted in the 114-second window between that pre-claim read and the claim.
- **`F-S133-OWNER-RULING-NOT-READABLE-BY-LANES-1`** — `OWNER-RULING-S133-COLD-RESTART-1` was written to the project box and the archive, and a lane can reach neither. Four negative lenses, each read succeeding and matching zero rows. AG-4 did not stop; it named what it stood on. The cure shipped as `NOTICE-S133-LANE-READABLE-AUTHORITY-1`: the archive path plus the md5, so a lane proves byte-identity and then reads.

## 4 · WHY AG-1, AG-2 AND AG-3 STAY EXACTLY WHERE THEY ARE

The owner is right that fossil address spaces are meaningless, and the Architect moved on this twice before measuring: first "leave them, fewest writes", then "retire them, three landmines". The measurement in §2 settles it. Retirement is possible but costs three window-openings by the owner — one per address, each declaring itself that lane, self-reclaiming, writing `CLOSED`, releasing its own ref — for zero operational gain, because under `OWNER-RULING-S125-SINGLE-LANE-1` the only address a worker needs is AG-4 and its own window reclaims it. A held address is a hazard only when it is an address someone needs. The price is written down and carried by name; the `lane_addr` CHECK is NOT touched (a free address is an asset, and the migration would be Operator work under an ADF freeze for negative value), and the queues are NOT deleted (append-only by law — retiring an address retires the ADDRESS, never its history).

## 5 · THE ADVERSARY MECHANISM WAS BROKEN, AND THE SCOUT PROVED IT

Three verdicts, and the second and third are about the mechanism rather than the cards.

**`ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report-v7`, 05:22:36Z — FAIL.** AMENDMENT 24's rendered set could be satisfied by a WRONG date: `groundingCheck.ts:72-79` folds no separator and every match in that file is a SUBSTRING match, so "7 eylul 2026" occurs inside "17 eylul 2026". The set verified a suffix, not a date. And `StageContextSection.tsx:374-378` narrows by ELIMINATION, so every value that is not the literal `'ok'` reaches `.join` and throws inside the panel's render.

**`ADVERSARY-REVIEW-MA-RERUN-3-v11-S132-1-scout-report`, 05:30:14Z — FAIL, and NOT on v11.** Three independent measurements killed the REVIEW CARD: (i) no sha256 lens exists — `mail-wait.mjs` emits `md5` only and `execute_sql` is refused by `guard-mcp` GM-1; (ii) the 34 310-character body overflowed the harness cap into a spill file under `~/.claude/` that the scout's charter forbids it to open, so 2 048 octets reached it; (iii) **ORDER A.2 had no second operand — `mail-wait.mjs` reads `direction = to_lane` ONLY, so a reviewer cannot read back a single sentence it has ever written.** Every review card this factory has cut ordered a diff against the reviewer's own rows and not one had an operand: the comparisons were made from window memory. `F-S133-SCOUT-CANNOT-READ-BACK-ITS-OWN-ROWS-1`, with `F-S133-CARD-FENCE-IS-SHA256-BUT-THE-SCOUT-READS-MD5-1` and `F-S133-SCOUT-CANNOT-READ-A-CARD-PAST-THE-OUTPUT-CAP-1`.

The scout also supplied the unblocking measurement without acting on it: the archive file's md5 EQUALS the bus row's `body_md5`, so that file is not "a copy that might differ" but the same bytes — and it declined to read it because the card's FALSIFIER forbade reading from a copy, leaving the amendment to the Architect. That is the fence working exactly as designed.

**`ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report-v8`, 05:44:55Z — PASS-WITH-AMENDMENTS, the first PASS on either line.** The repaired route WORKED and was proven before it was walked: md5 measured EQUAL before one byte of content was read, 144 lines read in `sed` slices, no file under `~/.claude/` opened, and **all EIGHT instances of AMENDMENTS 26–29 diffed character for character and found EQUAL.** Five amendments followed: the url-only date path, the four Turkish all-numeric forms, the source-text form of the api/ test, the union-member-SET equality test, and — the instrument worth keeping — **AMENDMENT 34, in which the scout amends its OWN earlier sentence** from "eight" to "eighteen". A carried sentence is immutable against the Architect's hand; its author may amend it.

## 6 · THE MECHANISM AS REPAIRED

Every review card now carries four things, and none of them existed this morning: the **md5 and length** the scout's own instrument can produce, never a sha256 it cannot; a **byte-proven archive path** so a body past the output cap is readable without touching a forbidden file; the scout's **own new sentences carried verbatim**, because it cannot read back its own rows; and **"nothing else changed" as a `diff -u` of two digest-proven files** rather than a memory — which is possible because the cards are built server-side from their predecessors, so byte-continuity is a property of construction. `NOTICE-S133-WEB-VALVE-REVIEW-OPERANDS-1` retro-fitted the operand to the review already in flight.

## 7 · DISPATCHED IN THIS HOUR, with digests equal on bus, disk and box

| artefact | to | md5 |
|---|---|---|
| `NOTICE-S133-WITHDRAW-FOREMAN-STEP3-1` | AG-5 | body sha256 `c9f8891538aabd4080135e0b4db93df87e79d11792c7b8417029c655fb16f9fb` |
| `CARD-WEB-VALVE-1-S132-1-v8` | AG-4 | `dc336c724092ec26f6c09f38d7499ae7` |
| `CARD-ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-v8` | scout | `c822adb46a6937fc484be2262666369b` |
| `NOTICE-S133-LANE-READABLE-AUTHORITY-1` | AG-4, AG-5, scout | `fb1466680127216e29d0a70b5d6a2d1f` (one typed insert, two derived by `select body`) |
| `CARD-ADVERSARY-REVIEW-MA-RERUN-3-v11-S132-1-v2` | scout | `971a3230284fb9efce50fd2e89ddfb9d` |
| `NOTICE-S133-WEB-VALVE-REVIEW-OPERANDS-1` | scout | `4510d8b4adb716d075d6633932b5864f` |
| `CARD-WEB-VALVE-1-S132-1-v9` | AG-4 | `12b8c5e17d680e3fe6436ba3d93ccf57` |
| `CARD-ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-v9` | scout | `e5cd4c97bd8cf7ca5d415a751e2cc901` |

**`A-REC-S133-3-PREFLIGHTED-ONE-OBJECT-AND-DISPATCHED-ANOTHER-1`.** Twice in this hour a hand-typed insert diverged from the preflighted local file — by 26 characters and by 23, both cosmetic. The `RETURNING` digest caught both. The repair each time was to treat the ROW as authoritative and reconcile the local, box and archive copies to it, then preflight the DISPATCHED bytes; both came back GREEN. The rule that now stands: **for a hand-typed row the row is the source and the copy is derived from it, never the reverse** — and a card built server-side from its predecessor needs no such repair, which is one more reason to build them that way.

## 8 · STATE AT THIS WRITE (2026-09-08T06:00Z)

Factory `READY`. AG-5 heartbeat 05:59:40Z, AG-4 heartbeat 06:00:08Z, both `CLAIMED`. Gated in AG-4's box: `CARD-MA-RERUN-3-S132-1-v11` and `CARD-WEB-VALVE-1-S132-1-v9`. In the scout's box, unanswered: the MA-RERUN v11 review v2, the WEB-VALVE v9 review, and `CARD-ADVERSARY-REVIEW-ARCHIVE-PUSH-S133-1-v1`. **No `RELEASE` row of any kind exists.** Archive: local `main` twenty-nine commits ahead of `origin/main` `460caf075c5fbc65a7c0d150e97511a2a985bc93`; the push is still the first job of AG-5 and still gated behind its own review.

TAIL ANCHOR: S133-DISPATCH-RECORD-2 ends here.
