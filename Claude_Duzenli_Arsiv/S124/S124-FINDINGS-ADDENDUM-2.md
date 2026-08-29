# S124 · FINDINGS ADDENDUM 2 — round 23 returns RED, and the plan is superseded by measurements

CUT 2026-08-29T04:40Z. Corrects addendum 1 and the round-23 card where they were wrong; supersedes
the dispatch plan. Under `S37-1` nothing earlier is edited.

---

## 1 · SCOUT ROUND 23 — RED, six findings, verdict accepted in full

`SCOUT-CARD-REVIEW-23-report`, bus row `cd92ac4a-11ab-4569-a639-2289ae27e8e5`, reply_to the round-23
row, 2026-08-29T04:20:25Z. The scout ran the preflight as ordered (`REFUSED-CHECKS=CP-6`), audited the
supersedes ledger line by line, verified every premise against the working copy read-only, and
reproduced the candidate's sha256 exactly. The card is authentic and its claims are true; the defects
are the Architect's, and three of them are owned here by name:

**A — the guard fence's length was in the wrong unit.** I wrote "18684 bytes" and "12789 bytes";
those are CHARACTER counts (Postgres `length()`); the objects are 18779 and 12861 BYTES. The digests
matched; the cheap number didn't, and my own fence orders a reviewer to STOP on mismatch — so the
guard built against substitution would reject an intact card. The instrument-measures-the-tool class,
committed inside the very fence built against it. Future fences carry `octet_length` bytes, stated as
bytes.

**B/C — a stale count in the anti-stale-count ledger.** "AG4 → AG5, four sites" — THREE sites
changed; the fourth occurrence names the PREVIOUS card's report (`ARCHIVE-PUSH-S123-1-AG4-report`)
and must not move, exactly as my own dispatch record §2 said. The card's ledger and the record
disagreed, and the card was wrong. The ledger line also trips CP-6 by naming a bare filename
fragment (`AG4`); the fix is to spell full report names. `v124` §8's sentence convicts me precisely:
a number travelled between carriers without being re-derived.

**F — the "interception" premise was FALSE.** The scout measured `gh api … --jq .visibility` →
**`private`**. `maymun207/cwf_yaprak` is a PRIVATE repository; an unauthenticated GET answers 404 BY
DESIGN, and a 401 on `info/refs` is auth being requested, not a wire intercept. The memory seed's
"(public)" line is stale. My four-way probe measured real refusals but the CONCLUSION drawn from
them — "egress interception signature" — is withdrawn. WebFetch's "public and accessible" rendering
remains unexplained and is now itself suspect (possibly a stale cache from when the repo was public);
it is not evidence of anything.

The scout's remaining findings — ORDER E's `ps ax | grep [g]it` probe never runs under zsh and its
failure text reads as a clean negative before a DELETE; a host process listing is structurally blind
to a guest process, and `lsof` on the exact lock path shows the real holder
(`com.apple.Virtualization.VirtualMachine`, PID 47809, an FD held by the bridge VM's mount layer) —
are accepted and absorbed into the revised path in §4 rather than patched into a v4.

## 2 · `F-S124-HEARTBEAT-MEASURES-ANY-READER-1` — the finding of the session so far

Measured at 04:28Z: ALL FIVE lane heartbeats moved, sequentially — 04:24:08 (AG-1), 04:24:11 (AG-2),
04:24:16 (AG-3), 04:24:20 (AG-4), 04:24:25 (AG-5) — four to five seconds apart, in address order.
That is ONE process walking the five mailboxes: the scout's baseline driver calling
`mail-wait <addr> --once` per address. And mail-wait's own output shows the mechanism — it attempts a
heartbeat for whatever lane it polls, deriving the nonce from the readable `lane/<addr>` ref, and
fails only when no ref exists ("heartbeat for scout NOT written: no ref").

**So a heartbeat on this table does not measure the holder's agent, and does not even measure the
holder's poll loop. It measures that SOMEONE, ANYONE, read the box.** Consequences, owned:

- Addendum 1's "AG-5 is alive and idle — the good case" is DEAD. The 03:48:38Z beat proves a reader
  existed, not a lane. My message to the owner saying his new window had taken AG-5 was wrong twice:
  the producer's boot won NO address, and the beat I read as its liveness was some window's read.
- The producer boot's own "AG-5 at 364s is positively alive" dies with it, same instrument.
- The seed's liveness doctrine needs a third clause — heartbeat-fresh does not even mean ALIVE-IDLE —
  but P-6 is open, so this is RECORDED, not repaired. GATE-1 pile.
- Corollary now confirmed from mail-wait's own mouth: **the nonce is the lane ref's sha, and it is
  readable by anyone.** The claim guard's identity proof is public. Recorded in addendum 1; now
  instrument-confirmed.

Only OUTPUT proves a lane. By that lens exactly one lane actor is proven alive this session: the
producer window, whose boot report (fast-forward `b8685025..3aab649d`, 14 files, gate probe refused
by the hook) is output.

## 3 · THE PRODUCER'S BOOT REPORT — three measurements this session inherits

RELAYED from the boot report the owner pasted, attributed, not re-taken:

1. **The anchor is now WIRE-CONFIRMED**: "Remote refs/heads/master = 3aab649d" — read by the
   producer from the remote, with the law-diff check (`docs/laws/` untouched across the 10-commit
   gap) run on top. The `v124` §0 step-3 wire verification the Architect could not perform is done,
   by the actor designed to do it. Phase cards may be cut.
2. **NO-ADDRESS-FREE**: all five refs held, zero CLOSED rows, takeover needs a released ref or a
   human confirmation naming a lane and a sha — the boot's own words. The S118 deadlock is no longer
   theory; it is the measured state of the whole roster.
3. **A latent trap, found and reported without a card**: `candidateNotice()` reads `row.note` but
   `readLanes()` never selects `note`, so a lane's SILENT-UNTIL declaration reaches the deciding
   human as UNDECLARED — could-not-look collapsed into did-not-declare, the exact distinction this
   project treats as law. Latent (no caller today); both boot files instruct wiring it. RECORDED for
   the ledger, uncarded under P-6. Also flagged by the boot: `CWF_LANE_DATABASE_URL` is SET in that
   address-less window, contradicting the boot text's CONFIGURED-ABSENT description.

Scout corpus findings recorded alongside: CP-6's band is `[1-4]` in both arms while the roster is
AG-1..AG-5 — the check cannot catch a mis-spelled `AG5` at all, the address class this session most
handles; and 139 of 339 landed relay artifacts (41%) trip the short-token rule even with every fence
exempted.

## 4 · THE PATH, REVISED — v3 dies to EVENTS, not to a v4

`v3` is RED and will not be re-cut. Its three orders are each superseded by a measurement:

- **ORDER F (the wire read)** — already done by the producer's boot. Dropped.
- **ORDER E (the lock)** — the Architect attempted the direct remedy this turn:
  `device_request_delete_permission` on the archive folder. **The harness classifier refused the
  request before it reached the owner.** Recorded, not routed around. The lock therefore remains, and
  its removal is lane work in a follow-up card whose instrument is the scout's: `lsof` on the exact
  lock path, host-`ps` blindness stated, removal only on an empty holder reading.
- **ORDER A–D (the push)** — `v2` does this, and `v2` is ALREADY reviewed, ALREADY in AG-4's box, and
  passes the preflight (the scout's baseline scored it PASS). Executed by a real AG-4, its report
  name `AG4` is TRUE. Its ORDER D commit will hit the lock and take its own well-built fallback:
  unstage, bus report, COMMIT ABSENT — a named, complete outcome.

What makes AG-4 real is the one decision only the owner can take, and it is CONSENT, not operation:
the boot offered takeover on "a human confirmation naming a specific lane and sha." The Architect
names the candidate — **AG-4, nonce `089e665bfc42997a4f20ed8cec96705b8a9c7f3b`** (the held ref's sha,
which the claim verb's same-nonce arm accepts) — because AG-4's box holds the work and the owner's
eye can witness that no AG-4 window exists on his screen. The factory names a candidate; the human
confirms. After `v2`'s report lands, ARCHIVE-PUSH-S124-1 (lock removal by lsof discipline + the S124
files + the v2 report file, one commit, push, read back) goes through scout round 24 to the same
now-output-proven address.

---

TAIL ANCHOR: S124-FINDINGS-ADDENDUM-2 ends here.
