# F-S134-THE-POOLER-LOG-IS-A-POSITIVE-LIVENESS-LENS-AND-AG-4-CONNECTED-FOR-ONE-HUNDRED-AND-SIXTY-MILLISECONDS-1

session: S134 · cut by the Architect at 2026-09-09T00:45Z · bridge DOWN, so this is BOX-ONLY at the moment of cutting
class: MEASUREMENT INSTRUMENT (new) + LANE STATE (measured)
laws touched: CANLILIK YALNIZ POZITIFTIR (§4) · TOTAL-45 (a number is a claim) · S102 (one negative probe is not proof of absence) · RULE-54 (absence needs two lenses)

## THE SHORT OF IT

This house has spent one hundred and thirty-four sessions unable to tell a WORKING lane from a
SLEEPING lane, because the only instrument it had — `factory_state.heartbeat_at` — is written BY
the lane and is therefore the lane's own assertion about itself. S133 already ruled that the
heartbeat is inversely correlated with production. What it did not have was a lens the lane cannot
write.

There is one, it was already switched on, and nobody had read it: **the Supavisor pooler log.**

The lanes reach Postgres through the pooler under a dedicated role, `cwf_lane`. Supavisor writes a
connection line per episode — authentication, backend pid, terminate, pool shutdown — and NOTHING a
lane does can edit those lines. They are written by the infrastructure, about the lane, from
outside it. That is the definition of a positive liveness lens.

## WHAT IT SAYS, MEASURED

Window 2026-09-08T18:00:00Z → 2026-09-09T00:45:00Z (six hours forty-five minutes).
Source `supavisor_logs`. Total rows in that window: TWELVE.

```evidence:pooler
2026-09-08T23:39:30.076437  ClientHandler: (ECLIENTSOCKETCLOSED) Client socket closed while state was auth_scram_first_wait (session)
2026-09-09T00:07:34.591473  ClientHandler: Connection authenticated
2026-09-09T00:07:34.592505  Starting pool(s) for Supavisor.id(type: :single, tenant: "fjbrkimwvtpwoxhziidh", mode: :session, user: "cwf_lane", db: "postgres")
2026-09-09T00:07:34.603978  DbHandler: Backend authenticated, backend_pid: 3752370
2026-09-09T00:07:34.768706  ClientHandler: Terminate received from client
2026-09-09T00:08:11.593476  ClientHandler: Connection authenticated
2026-09-09T00:08:11.596581  ClientHandler: Connection authenticated
2026-09-09T00:08:11.597076  DbHandler: Backend authenticated, backend_pid: 1346155341
2026-09-09T00:08:11.752687  ClientHandler: Terminate received from client
2026-09-09T00:08:11.753114  ClientHandler: Terminate received from client
2026-09-09T00:09:34.595225  No subscribers for pool ... user: "cwf_lane" ..., shutting down
2026-09-09T00:09:34.595379  Pool ... user: "cwf_lane" ... shutting down gracefully
```

THREE `cwf_lane` episodes in six and three-quarter hours, and NOTHING AT ALL before 23:39Z.

1. **23:39:30** — a FAILED one. The client socket closed while the server was still waiting for the
   first SCRAM message. The lane began to connect and vanished mid-handshake.
2. **00:07:34.59 → .768** — pool started, backend authenticated, terminate. **177 milliseconds.**
3. **00:08:11.59 → .753** — two clients authenticated, one backend, both terminated.
   **160 milliseconds.** Ninety seconds later the pool shut down for lack of subscribers.

## THE IDENTIFICATION, AND IT IS EXACT

`factory_state` reads, at 2026-09-09T00:38:32Z:

```evidence:beat
AG-4  state WORKING   heartbeat_at 2026-09-09 00:08:11.673198+00
AG-5  state CLAIMED   heartbeat_at 2026-09-08 19:16:42.889388+00
```

AG-4's heartbeat was written at **00:08:11.673**. The pooler authenticated that connection at
**00:08:11.593 / .596** and received terminate at **00:08:11.752 / .753**. The write sits inside the
connection, eighty milliseconds after authentication and eighty milliseconds before the disconnect.
The heartbeat was written by the `cwf_lane` role over the pooler in a session that lasted a sixth of
a second and did nothing else in it.

## WHY THAT SETTLES THE QUESTION THE OWNER ASKED

A working lane holds a session while it reads its box, clones, runs commands, and writes a report.
That is minutes, not milliseconds. A one-hundred-and-sixty-millisecond connection that stamps a
timestamp and hangs up is a **poller tick**, and it is the machine equivalent of a night watchman
signing the register on his way past the door.

The second lens agrees, and RULE-54 wants two. Over 2026-09-08T12:00Z → 2026-09-09T00:45Z the
PostgREST edge log carries **ZERO** requests to `/rest/v1/factory_state` and **ZERO** to
`/rest/v1/relay_inbox`; the last `/rest/v1/rpc/scout_reply` was in the 13:00Z hour. And
`relay_inbox` still holds 1369 rows whose newest is **2026-09-08 18:37:16.991902+00** — the
Architect's own insert of the landing card, six hours ago.

So the answer to "is anybody working" is: **AG-4 is powered and reachable and is producing nothing.**
Not asleep — a sleeping machine cannot authenticate. Awake, ticking, empty-handed.

AG-5 has not touched the pooler in this window at all. Its beat is frozen at 19:16:42Z, three
hundred and twenty-two minutes.

## WHAT IS NOT CLAIMED

- Which PROCESS opened those three connections is NOT-READ. `cwf_lane` is a shared role and this
  lens names the role, not the lane. The identification above rests on the heartbeat timestamp
  falling inside episode 3, which is strong, and on nothing else.
- `postgres_logs` is NOT A LENS for this question: seventeen rows in one hundred minutes proves it
  is an error/notice log, not a statement log. Do not read its emptiness as silence.
- Whether the 23:39:30 failed handshake was the same machine losing its network is UNMEASURED. It is
  consistent with a host suspending and resuming, which is also consistent with the bridge having
  refused for eight consecutive Architect ticks — but consistency is not identity, and this line is
  a hypothesis with its name on it.

## WHAT THIS BUYS THE FACTORY

A card can now demand a liveness proof the lane cannot fake. `MEASURED: supavisor_logs over the
window, user = "cwf_lane", episode durations` distinguishes, mechanically:

- **no episodes** → the lane is off or unreachable.
- **short episodes only** → the lane is ticking and NOT working. This is the state that was invisible
  for one hundred and thirty-three sessions and it is the state the factory has been in tonight.
- **long episodes with statements** → the lane is working, and the report should exist.

A-REC line: the Architect read a moved heartbeat at 00:08Z on the previous tick and called it
"the first change since 19:32Z", which was true and useless. The useful reading needed one more
lens and forty minutes; the reason it was not taken sooner is that the Architect went looking for
the lane in the log the LANE writes.

BODIES: A-REC-S133-6 · CANLILIK YALNIZ POZITIFTIR (§4) · OWNER-DESIGN-S134-LOOK-AT-THE-DATABASE-LOGS-1 ·
F-S134-FOREMAN-POLLER-DIED-UNNOTICED-1 · RULE-54 · TOTAL-45 · S102.

ARCHIVE: the bridge refused for the eighth consecutive tick at 00:38Z, so this document exists in
the project box ONLY. It is NOT in Claude_Duzenli_Arsiv/S134/ and is NOT to be called saved until a
lane commits it.

---

## SECOND READING AT 00:52Z — AND IT CORRECTS THE PARAGRAPH ABOVE

Window 2026-09-09T00:09:35Z → 00:52:00Z, same source, same role. **Zero rows.**

The lens is proven live — it returned twelve rows in the earlier window from the same query — so this
emptiness is a reading, not a blind instrument.

That kills the word "poller". A poller has a cadence. What actually happened is TWO connections
thirty-seven seconds apart (00:07:34 and 00:08:11) and then FORTY-THREE MINUTES OF NOTHING. The
image in the section above — a watchman signing the register on his round — is wrong in its second
half, because there was no round. This was a **single wake**: something came up at about 00:07,
completed one loop iteration in under two hundred milliseconds, and went quiet again.

The Architect wrote "poller tick" six minutes before measuring whether it ticked again. That is the
derivation-beating-measurement error in miniature, committed inside a document whose whole subject
is measuring instead of deriving. It is corrected here rather than edited away.

What stands unchanged: AG-4 is not asleep in the sense of being off, it is producing nothing, and
the heartbeat proved neither. What is added: the wake was ONE, not a cadence, which is consistent
with a host suspending and resuming — the same class as the 23:39:30 handshake that died mid-SCRAM,
and consistent with a bridge that has now refused nine consecutive ticks. Consistent, not proven.

---

## THIRD READING AT 02:35Z — THE LENS HAS A BLIND SPOT AND IT MUST BE NAMED

At 02:17:48Z AG-4 cut `phase/lens-measurement-repair-1-s134-1` from master, one hundred and
fourteen seconds after the card reached the bus. Measured from the branch's own reflog, not
inferred: `branch: Created from` the current master head, and the ref file's mtime agrees.

At 02:35Z the pooler shows only SHORT `cwf_lane` episodes — about a hundred and seventy
milliseconds each, at 02:32:35 and 02:34:30. By the reading rule written into the section above,
that says "ticking and NOT working". **That reading would be wrong here, and the rule as published
is too strong.**

The pooler sees ONE thing: connections to Postgres. A lane cloning, reading source, editing files,
running `tsc` or `vitest` touches no database at all. So a lane in the middle of exactly the work
this card orders is INVISIBLE to this lens, and its silence looks identical to sleep.

The corrected rule, and it is narrower than the one it replaces:

- **A long episode is positive evidence of DB work.** That direction still holds and is what makes
  the lens worth having.
- **Short-episodes-only means only "not doing DB work".** It does NOT mean idle. Pair it with a
  filesystem or git observation before concluding anything about the lane.
- **No episodes at all still means the lane is not reaching the database**, which for a lane whose
  poller ticks against Postgres does imply it is off or unreachable — but that inference belongs to
  the poller's cadence, not to the lens alone.

This is the same error the SECOND READING corrected, committed a second time in the same document:
a rule stated more strongly than the instrument supports. It is recorded rather than edited away
because a future Architect reading only the confident version would call a working lane asleep — and
this house has already published one hung verdict on a working run tonight (A-REC-S134-1).
