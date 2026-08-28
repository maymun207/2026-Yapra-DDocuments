# CWF · S123 SESSION CLOSE — v1

MINTED 2026-08-28T15:02Z. Every number here was MEASURED at the close, from a fresh clone, the live
bus and the owner's archive working copy. Nothing is carried from the session's own prose. Where a
figure could not be re-measured it says so.

## 1 · THE ANCHOR AT CLOSE

```evidence:anchor
master     3aab649dfbab5360c52aab58db839d0905649fa6
branches   112 on the wire · lane refs lane/AG-1 … lane/AG-5, five
docs/laws  constitution 16 · rules 59
open-items 38990 bytes — exactly its pinned FLOOR
archive    2026-Yapra-DDocuments main = c5cc031e655d89ad467b891f1683eed442a17778, remote MATCHES
```

## 2 · WHAT LANDED

**TWO trunk landings, and both closed items the register had carried for eight sessions as "the real
blocker, NOT BUILT".**

```evidence:landings
PR #472  master 8a19fe8a049338c4b22ae6f798b0c98c0ca062e3  16:01 +0300  the honestbench scorer
PR #479  master 3aab649dfbab5360c52aab58db839d0905649fa6  17:14 +0300  the A23 understanding layer
         9 files, +1426 / −47 — exactly the nine paths the landing card's files fence named
         #29 / GI-101 · the SEVENTH KEY of the internal counter · traces to TIER A · Gaia2
```

Before those, the session also ran the ledger decay sweep to a landed, byte-verified report, and
repaired the owner's `cwf_yaprak` clone in place (14 behind → tip, 1 dirty → clean, 24 worktree
entries → 1).

## 3 · WHAT WENT WRONG, IN ORDER, AND WHO CAUGHT IT

**The Architect's own defects, none of which the Architect caught first.**

| # | defect | caught by |
|---|---|---|
| `F-S123-14` | a card BORN STALE — premise read 13:20:42Z, the lane pushed 13:23:22Z, the card posted 13:33:42Z, so no window could ever have confirmed it | three scout windows, round 16 |
| `F-S123-15` | the decay clause watched MASTER while the ref that moved was the BRANCH — a card that cannot announce its own expiry | a scout window, round 18 |
| `F-S123-16` | the Architect's "correction" of the window count was itself wrong, in the opposite direction, and its own re-correction was still short | server-issued row receipts, rounds 18–21 |
| `F-S123-19` | two instruments measured the TOOL rather than the thing: `diff -u` is not one program, and Postgres `text::bytea` is not byte-preserving | three windows; then the Architect, on its own next call |
| — | a deleted `S63-1` gloss in the landing card, and a deleted CLAIMS row in the archive card | the hunk-to-`supersedes` mapping, rounds 18 and 19 |
| `F-S123-21` | a read-only diagnostic rewrote a governed ledger as a side effect, writing `not run` over live measurements | the stop hook, at close |

**Lane and gate findings, uncarded and named so they are not lost.**

- `F-S123-20` · **the foreman lands and does not report.** Zero `GO-LANDING-S123-*` reports exist on
  master; two S123 landings went in without one. Under `busDelivery.ts` a card is ACTED **iff** a
  declared `deliverables` name exists on origin, so by the gate's own reading both cards are NOT ACTED.
  The S122 precedent shows the lane can and normally does file.
- `F-S123-22` · the archive card routed its report fallback on REACH being absent; AG-4 met a case
  where REACH and CREDENTIAL both read PRESENT and the **write** was refused by its own harness. The
  two are separable and the card conflated them. AG-4 named it and did not route around the refusal.
- two gate findings handed back by the build lane: five reader sites the build card named none of, and
  **the whole-tree typecheck passes over `api/` files while proving nothing about them** — a planted
  type fault went uncaught by that project and was caught only by `typecheck:api`.
- `F-S123-17` · `CP-3` accepts `MEASURED:` · `UNMEASURED` · `SELF-INVALIDATION` · `ON-DISAGREEMENT` ·
  `DECAYS` in a PREMISE and REFUSES `RELAYED:`, which is legal in a CLAIMS basis. `NOT-READ` is the
  mirror: legal in CLAIMS, refused in PREMISE.
- `F-S123-18` · `CP-2` fires on a version number adjacent to a counted noun — "round-16 card row" reads
  as "16 cards".

## 4 · WHAT THE REVIEW LOOP COST AND WHAT IT BOUGHT

Six rounds, eighteen readings, **zero GREEN until round 20**. Every RED found something real and
different. Two silent edits were caught that the author had read past in its own diff — which is the
finding, not the two edits.

**The mechanism that came out of it, and it survived being broken twice.** A re-cut now carries an
`evidence:supersedes` fence: the predecessor's digest, a stated exemption for the version stamp, and
one line per difference naming what forced it. The diff digest that was adopted in round 18 was
WITHDRAWN in round 20 on the windows' measurement. What replaced it is stronger: on the archive card,
**`v3` was BUILT server-side from the reviewed `v2` bytes by eight named substitutions and nothing
else**, and the output hashed to the Architect's local file. "Nothing else changed" stopped being a
claim a reviewer must audit and became a property of how the artifact was made.

**And dispatch is now a construction too.** Both cards were extracted SERVER-SIDE from the scout row
that had reviewed them, under an md5 guard. The reviewed bytes, the preflighted bytes and the
dispatched bytes are one object by construction rather than by comparison.

## 5 · TWO DISAGREEMENTS RESOLVED BY MEASUREMENT

**Identity is a receipt.** Round 15 drew three replies from THREE distinct windows, two of which both
label themselves `W1`. Counting by label collapses three readings into two; `reply_to` plus the
server-issued row id is the durable key. A name-keyed census of this bus under-reports without saying
that it did.

**Nine versus zero, and both readers were right.** The index spellings are NFC, the on-disk spellings
are NFD. macOS git precomposes before comparing and reports ZERO; the Architect's Linux bridge has no
precompose path and reports NINE; no deletions appear on either side because the mac filesystem's
lookup is normalisation-insensitive. `empty ≠ zero` at the filesystem.

## 6 · SOTA — STATED HONESTLY

`SOTA-1` binds acceptance to `cwf-sota-definition`, sixteen external criteria. **The two skorbords were
NOT re-measured at this close and the v122 figures (6/7 internal · 0/16 external) are NOT restated
here as fact.** What is measured: the seventh internal key, `#29` / `GI-101`, LANDED. Whether that
turns the internal counter to 7/7 is a reading the next session must take from
`npm run architect:open` and `cwf-sota-definition`, not from this sentence.

Turning the seventh key does not satisfy `SOTA-1`. It never did.

## 7 · P-6 METRICS

```evidence:metrics
cards preflighted        11 · cards REFUSED by preflight 6, every refusal a real defect
scout rounds dispatched   6 (16 through 21) · replies 18 · GREEN rounds 2
cards dispatched to producers 2 — the landing to AG-5, the archive push to AG-4
trunk landings            2 · archive pushes 1
governance changes        0 in any gate, rule file or repository artifact — the P-6 window is respected
                          the supersedes mechanism is a change to the SHAPE of Architect-written cards
                          and is recorded for the GATE-1 decision rather than made structural here
owner action items        0 · owner spend approvals asked for 0 beyond the standing landing approval
architect defects         6, all named above, none caught first by the Architect
```

## 8 · WHAT IS OWED TO S124

- the two AG-3 gate findings (five unnamed reader sites; the whole-tree typecheck's blind spot)
- `F-S123-20` · the foreman's unfiled landing reports
- `F-S123-21` · the read-only diagnostic that rewrites a governed ledger
- `F-S123-22` · the fallback keyed on REACH rather than on the WRITE
- the sweep's five CLOSED-BY-TREE closures: GI-006, GI-012, PI-007, PI-011, PI-014
- the ARMES `apiKeyRef` card — **the owner rotates the key itself and never pastes the new one here**
- the card for the test that dirties `docs/ground/authority-conformance.latest.md` on every run
- GATE-1's own agenda, unchanged: the context-retrieval organ, the ⑤ steel, `ADF-ARCHITECTURE-v2`'s
  landing, the foreman's observation-report path, the four S119 landing-order reports, the
  pre-dispatch preflight hook, the P-9 extension candidate

TAIL ANCHOR: CWF-S123-SESSION-CLOSE-v1 ends here.
