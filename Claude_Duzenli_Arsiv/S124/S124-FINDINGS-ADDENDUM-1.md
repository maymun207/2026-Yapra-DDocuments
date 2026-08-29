# S124 · FINDINGS ADDENDUM 1 — what the bus said, and what it corrects in v1

CUT 2026-08-29T04:05Z. This does NOT edit `CWF-S124-OPEN-MEASUREMENT-v1`; under `S37-1` a presented
artefact is immutable and a correction is a new artefact. Read them together, this one second.

---

## 1 · THE CORRECTION, STATED BEFORE ANYTHING ELSE

`CWF-S124-OPEN-MEASUREMENT-v1` §6 proposed, as THE ONE PATH, a card that pushes the archive and
wire-checks the anchor. **That work was already carded and already dispatched, and I had not read the
bus when I wrote it.**

```evidence:bus
id df57e025-6bed-4be8-89d5-73b2b4640eb4
  direction to_lane · lane_addr AG-4 · artifact CARD-ARCHIVE-PUSH-S123-2-v2
  created_at 2026-08-29 03:24:35Z · consumed_at NULL · 12789 bytes
  body sha256 371146084f5114674f3eb1cfe38f8b8d64699e1e2ac056c2482ea9c518efb062
scout review that produced it
  da9e9cf1-b490-4f59-bdd6-71999afd9df7  to_lane scout  SCOUT-CARD-REVIEW-22-v1   2026-08-28 15:08:25Z
  e960eb7d-83cf-4d64-9df5-725053f9d618  from_lane scout  ...report-W1  RED       2026-08-28 15:11:47Z
  e68bd1da-4b1f-452b-8ed2-a338a0cf2440  from_lane scout  ...report-W1  RED       2026-08-28 15:12:02Z
  c64bdcb5-4c28-4874-bd5a-088602d11a9c  from_lane scout  ...REPLY-W2               2026-08-28 15:12:11Z
```

**The card is scout-reviewed, three windows, RED on `v1`, and `v2` is the repair.** Its content is
better than what I would have written: it probes REACH, CREDENTIAL, WRITE and **COMMIT** separately,
because a harness can permit a file write and refuse the commit that follows it — a distinction three
scout windows had to force, and which my §6 sketch did not have.

**The failure is mine and it has a name.** `v124` was cut at 2026-08-28T15:03Z; the close commit
landed at 15:05Z; a session at 03:24Z today carded the push. I read `v124`, measured the disk, and
proposed. **The bus is a live carrier and I treated the bootstrap as if it were the whole world.**
`D-1 RECON-FIRST` names exactly this, and reading the bus is the recon that was skipped.

**What survives from v1 §5 unchanged:** the archive close commit IS unpushed, measured, and the
`v124` anchor fence that says otherwise IS stale. What does not survive is the implication that
nobody had noticed.

---

## 2 · WHY THE CARD HAS NOT MOVED, MEASURED FROM THE PRIMARY SOURCE

The card is addressed to `AG-4`. `AG-4`'s row reads `WORKING` with a heartbeat last written
2026-08-28T15:12:19Z, and its nonce belongs to a window that is not answering.

`public.factory_claim` was read from `pg_catalog.pg_proc`, not from the seed's description of it. Its
re-claim arm accepts **exactly two shapes**:

```evidence:claim-verb
elsif v_nonce is not distinct from p_nonce_sha or v_old = 'CLOSED' then   -- re-claim
else raise exception 'FW002: % is held by a different nonce'
```

So a NEWLY booted producer window can claim **none** of `AG-1 … AG-4`: each is `WORKING` under a
foreign nonce, and no window can present a nonce it never generated. This is
`F-S118-CLAIM-GUARD-DEADLOCK-AFTER-LEGITIMATE-RECLAIM-1`, still standing, and it is now load-bearing
on today's work rather than theoretical.

**The window the owner opened is `AG-5`, and it did not need to claim.** Its `nonce_sha` is unchanged
(`a8b3344e476adec7…`) and its `changed_at` is still 2026-08-27T12:36:22Z — the re-claim arm sets
`changed_at`, so no claim ran. What moved is the heartbeat alone:

```evidence:ag5-liveness
AG-5  heartbeat 2026-08-28T15:12:48Z   read at 2026-08-29T03:36Z   age 12h23m
AG-5  heartbeat 2026-08-29T03:48:38Z   read at 2026-08-29T03:55Z   age 7m
```

**This is a POSITIVE reading and it is the only kind that counts.** `AG-5` is alive and idle — the
good case. Every other lane stays `UNMEASURED`.

---

## 3 · AND V2'S OWN PREMISE HAS DECAYED — BY MY HAND, THIS MORNING

`CARD-ARCHIVE-PUSH-S123-2-v2` states as a measured premise:

> `git status --porcelain` filtered to lines whose first two characters are not `??` — **EMPTY**.
> Nothing staged, no tracked file modified.

That was true at 2026-08-28T15:05Z. It is not true now, and the cause is this session:

```evidence:decay
2026-08-29T03:42Z  Claude_Duzenli_Arsiv/S124/CWF-S124-OPEN-MEASUREMENT-v1.md written, 14417 bytes
                   sha1 431a1a50363becc2bc663cdc94c75aa9d5f378a8
                   untracked (??), so the filtered status is still EMPTY — the premise HOLDS
                   but the untracked set grew from 9 files to 10
2026-08-29T03:42Z  git add + git commit REFUSED:
                   fatal: Unable to create '<archive>/.git/index.lock': File exists.
                   and the bridge shell cannot unlink it (Operation not permitted)
```

**The stale `index.lock` is the sharper half.** `v2`'s `ORDER D` writes a report file and commits it.
**That commit cannot succeed while the lock exists**, and `v2` has no disposition for a refusal whose
cause is a leftover file rather than a permission. A card dispatched as-is would send a lane into a
failure its own COMMIT probe would misattribute to the harness.

**One more consequence.** `v2` names its report `ARCHIVE-PUSH-S123-2-AG4-report`. If `AG-5` does the
work under that name, the bus records the wrong author — and attribution is MEASURED from the bus,
never assumed (S117 discipline 11). Four occurrences, all in the report-filename spelling; the body
names no bus address at all, so the address itself lives only in `lane_addr`.

---

## 4 · WHAT THE NEXT CARD IS, AND WHY IT IS A RE-CUT RATHER THAN A RE-ADDRESS

`v3`, built SERVER-SIDE from `v2`'s reviewed bytes by named substitution — never written beside it and
compared — so the reviewed bytes and the dispatched bytes are one object by construction (`v124` §4).
Each difference has a measured cause, and a changed line that maps to none of these is a silent edit
and a RED:

1. four `AG4` → `AG5` in the report artifact name — the recipient changed, and attribution follows the
   author, not the plan.
2. a disposition for the stale `.git/index.lock`: probe it, remove it only after proving no git
   process holds it, and print both readings. **Measured cause: §3.**
3. `Claude_Duzenli_Arsiv/S124/CWF-S124-OPEN-MEASUREMENT-v1.md` joins the commit, and the premise's
   untracked count moves 9 → 10. **Measured cause: §3.**
4. one added order: `git ls-remote https://github.com/maymun207/cwf_yaprak.git refs/heads/master`,
   printed verbatim. **Measured cause:** `CWF-S124-OPEN-MEASUREMENT-v1` §1 — the Architect has no wire,
   and under the project box §0 no phase card may be cut until this line exists.
5. the version stamp — title and tail anchor. **STATED EXEMPTION:** a re-cut always moves these and a
   rule demanding a measured cause for them can never be satisfied.

`v2` is immutable and is not edited (`S37-1`). It stays on the bus at `AG-4`, unconsumed, and it stays
as the record of what was reviewed.

**Ruling ② holds: `v3` goes to a scout before it goes to `AG-5`.** No exception was taken in S123, none
is taken here, and the scout is also the actor that runs
`npx tsx scripts/cardPreflight.ts --check -` over the candidate — the preflight the Architect's own
last ten cards failed while their author believed otherwise.

---

TAIL ANCHOR: S124-FINDINGS-ADDENDUM-1 ends here.
