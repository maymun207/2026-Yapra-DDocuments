# S133-DISPATCH-RECORD-1 — the S133 open through the cold restart

Written WHOLE (A-REC-S101-7) by the Architect at 2026-09-08T05:0xZ (08:0x TSİ), while the factory is down and nothing can move, so that the facts below are written from measurement rather than recalled at close. `F-S132-LEDGER-TRACK-ABANDONED-AT-S117-1` is the reason this exists mid-session instead of at the end: a track drops documents the way a document drops names. Every digest below was read back from the bus by `INSERT ... RETURNING encode(sha256(convert_to(body,'UTF8')),'hex')` and compared to the local preflighted file; every archive copy was re-hashed on the owner's disk after the commit.

## 1 · WHAT WAS DISPATCHED, in order, with its digest

| # | artefact | to | created (UTC) | sha256 | preflight |
|---|---|---|---|---|---|
| 1 | `CARD-MA-RERUN-3-S132-1-v10` | AG-4 | 03:52:26 | `08e7ec1730e3eb14dca3b29b9ee82ecaf5c7a0fa9a9f5744ff96438c7d7ac915` | GREEN |
| 2 | `CARD-WEB-VALVE-1-S132-1-v7` | AG-4 | 03:55:14 | `4030b97959443f32f2a70c073a3637a0234890890f7ff144abfeabadcf7c682b` | GREEN |
| 3 | `CARD-ADVERSARY-REVIEW-MA-RERUN-3-v10-S132-1-v1` | scout | 03:57:20 | `78f1f1bd4d770e3dd7cd11ddd0933c4cb1b3a4294c56c47cfa4c1753912d08c0` | GREEN |
| 4 | `CARD-ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-v7` | scout | 03:58:54 | `01603304eb2738a7315afa062e9cc8c77787101870f60bf293a59c449e7ae818` | GREEN |
| 5 | `CARD-ARCHIVE-PUSH-S133-1-v1` | AG-5 | 04:06:09 | `cc81c9665b4931d07eda777b30cdaa0f3885180920a0cae4c485ead0f82b9f63` | GREEN |
| 6 | `CARD-ADVERSARY-REVIEW-ARCHIVE-PUSH-S133-1-v1` | scout | 04:07:28 | `fdd4a30985283de24e9cdbd0384709d7417f2d7672d4a8711091d17183a12090` | GREEN |
| 7 | `CARD-MA-RERUN-3-S132-1-v11` | AG-4 | 04:28:43 | `4a54b0d7f7e9dc0083299b55ad3f65aca59f8ec05c00cd8b7c89b150171f37c6` | GREEN |
| 8 | `CARD-ADVERSARY-REVIEW-MA-RERUN-3-v11-S132-1-v1` | scout | 04:30:30 | `89086e7e31d302661861f04a25afa9983c6648c5ff8af9adc6c72e0e91a921ae` | GREEN |
| 9 | `NOTICE-S133-COLD-RESTART-AG5-BACKLOG-1` | AG-5 | 04:43:24 | `8e2a1a4ee5ed1b7aa814693d32a6adae5377ae58b46493eb4affd82bdc9dd42f` | notice, not a card |

Nine rows, nine digests EQUAL, zero drift. `scripts/cardPreflight.ts` at blob `7d1ce51b105be184943d981b0f27b892f8f2338b` was the instrument for all eight cards; it was staged from the owner's clone after `git hash-object` was measured equal to `git rev-parse origin/master:scripts/cardPreflight.ts`.

**A method change worth carrying.** Cards 1, 2 and 7 were not transcribed. Their bodies were CONSTRUCTED SERVER-SIDE from the predecessor row by an ordered chain of `replace()` and `regexp_replace()` calls, and the result's sha256 was compared to the locally preflighted file BEFORE the insert. That makes "nothing else changed" a property of how the artefact was made rather than a claim a reviewer audits — the S123 lesson, applied to a 40 KB card without pushing 40 KB through a transcription.

## 2 · THE TWO SCOUT VERDICTS OF S133, and what they caught

**`ADVERSARY-REVIEW-MA-RERUN-3-v9-S132-1-scout-report`, 03:11:41Z — FAIL**, AMENDMENTS 14–17. The `artifact-id` route through "the run's job outputs" is a DEAD PATH: a step in the REST jobs payload carries no `outputs` key. The FALSIFIER's single-integer clause and ORDER B.0(b)'s failure prints CONTRADICT on any failed run — the v7 class returning. `id:` appears on no step in ma-rerun.yml, so `steps.<id>.outcome` does not exist. A failed run yields no evidence JSON, so G4 has no counterpart.

**`ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report-v6`, 03:16:19Z — FAIL**, AMENDMENTS 23–25. The ARCHITECT CLAUSE named an exported union type that does not exist — all three declarations are inline; the component imports nothing it could have meant; and production frontend code does not import from `api/`, which adminService.ts documents at :666 and :705 as MIRRORED. The scout also FALSIFIED ITS OWN AMENDMENT 20 by measurement: `groundingCheck.ts:72-79` folds only case, Turkish diacritics and whitespace, so a date-granularity demand still barks on the majority of correctly-cited Turkish answers.

**`ADVERSARY-REVIEW-MA-RERUN-3-v10-S132-1-scout-report`, 04:08:20Z — FAIL**, AMENDMENTS 18–23. ORDER B.0(d) still ORDERED the route AMENDMENT 14 had measured dead, and exposing that output needs an `id:` on the UPLOAD step — a SECOND new surface, while the widened scope permits exactly one. **The card ordered an edit its own FALSIFIER forbids.** `UNPERFORMED` appeared five times in v10 and NOT ONCE in the FALSIFIER. `steps.<id>.outcome` is a status WORD, never a numeric code. And the four SCOPE mirrors of AMENDMENTS 14–17 were abbreviations, one polarity-inverted.

**Every FAIL was on the Architect's own connective prose; not one was on a carried scout sentence.** `A-REC-S122-ARCHITECT-PRECISION-DECAY-1` vindicated a third time, and the mechanical cure — a scout window per card — held on every round.

## 3 · WHAT THE ARCHITECT DECLARED ABOUT ITS OWN WORK, rather than letting the scout find it

- v10's review card named THREE divergences before the scout measured them: AMENDMENT 16 orders the widening of a clause that IS the scout's AMENDMENT 9, and the widening landed on one of that sentence's two instances; the four mirrors; and the label convention. The scout ruled on all three; the widening was ruled LICENSED and the one-instance landing was the defect.
- v11's review card named three more: AMENDMENT 19 says "BOTH instances" where the phrase occurred once; AMENDMENT 21 applied at four sites and deliberately NOT at two others, one of them AMENDMENT 16's own internal quotation; and the site label on the widening tail.
- v7 (WEB-VALVE) declared that AMENDMENT 25's file was added to the SCOPE list ONLY, leaving AMENDMENT 21's sentence byte-untouched, so the list carries one file more than the sentence does.

## 4 · FINDINGS BORN IN S133

- **`F-S133-BRIDGE-VM-HAS-NO-GITHUB-CREDENTIAL-1`** — MEASURED: `git fetch origin master` in the owner's clone over the bridge answers `fatal: could not read Username for 'https://github.com'`, and the same failure zeroed `.git/FETCH_HEAD`, destroying the previous fetch's timestamp. A `git clone` from the Architect's cloud container fails the same way (`F-S126-ARCHITECT-GH-403-1`, confirmed). Consequence: the master anchor is CARRIED from the last successful fetch and every card orders the lane to fetch for itself.
- **`PLATINUM-BREACH-S133-1`** — the Architect wrote the owner an action item asking him to TYPE a ruling sentence the Architect had composed. The judgement was already his and already delivered; the transcription was machine work. Self-declared, repaired by minting `OWNER-RULING-S133-COLD-RESTART-1` from the witness he had already given.
- **The foreman boot does NOT end its turn at a gate.** MEASURED: AG-5 consumed a gated card at 04:06:59Z, fifty seconds after it was inserted, and its heartbeat still advanced at 04:12:43Z. The scout likewise found cards by a live box read and posted verdicts. So `F-S132-PRODUCER-TICK-LOOP-ENDS-AT-GATE-1` is demonstrated on the PRODUCER boot only, and the ADF lift the Architect asked for was NARROWED to `.claude/boot/producer.md` on that measurement — the first request had named `free.md` too, on assumption.

## 5 · THE COLD RESTART

At 04:4xZ the owner reported that he had closed AntiGravity and every Claude Code extension window by his own hand. Measured consequence: five lane rows reading `WORKING`/`CLAIMED` whose nonces are carried by `refs/heads/lane/AG-1..AG-5` at origin — the cell `foreman.md` §1z names as BYTE-IDENTICAL to a healthy lane, with the walk answering `NO-ADDRESS-FREE` and the takeover path unable to fire. The Architect wrote `mode = INIT` at 04:41:25Z on its declared mode-row authority so no producer would race the foreman's sweep, and wrote NO lane row — `factory_reclaim` exists and each fresh window reclaims its own address. `S133-COLD-RESTART-MEASUREMENT-1` and `OWNER-RULING-S133-COLD-RESTART-1` carry the graveyard table, the roster ceiling, the retirement of AG-1/2/3 and the reason the CHECK constraint is not touched.

## 6 · STATE AT THIS WRITE (2026-09-08T05:00Z)

Factory `INIT`. No window has booted: no nonce has changed, no heartbeat has advanced past 04:12:43Z, no `from_lane` row exists since the scout's 04:08:20Z verdict. Gated and waiting: AG-4 holds `CARD-MA-RERUN-3-S132-1-v11` and `CARD-WEB-VALVE-1-S132-1-v7`; AG-5 holds `CARD-ARCHIVE-PUSH-S133-1-v1` and the notice; the scout holds three unanswered review cards. **No `RELEASE` row of any kind exists.** Archive: local `main` at the S133 commits, `origin/main` still `460caf075c5fbc65a7c0d150e97511a2a985bc93` — the push is the first job of the fresh AG-5 and is still OWED.

TAIL ANCHOR: S133-DISPATCH-RECORD-1 ends here.
