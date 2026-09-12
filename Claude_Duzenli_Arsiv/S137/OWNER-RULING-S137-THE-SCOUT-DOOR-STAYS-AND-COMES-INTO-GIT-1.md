# OWNER-RULING-S137-THE-SCOUT-DOOR-STAYS-AND-COMES-INTO-GIT-1

Given by the owner, 2026-09-12, on a proposal he was shown with its three measured implications:

    `scout_reply` kapısı — önerim "kalsın, git'e insin, nonce taksın". Katılıyorum.

So: **the door stays, it comes into the migrations tree, and it gains a nonce.** Three parts, one ruling.

## HOW THE QUESTION AROSE, AND WHOSE IT WAS

The adversary found it while ruling on the slip seam
(`SCOUT-RULE-SLIP-SEAM-S137-1-v1`): the Architect's card named two doors into the bus and there are THREE.
The third is `scout_reply`, and the Architect had never heard of it. Recorded by name because it is the
adversary's finding and not the Architect's — a hundred sessions from now an unattributed record makes
every insight look like the Architect's, and this house calls that CIRCULAR EVIDENCE.

## WHAT THE DOOR IS, MEASURED BY THE ARCHITECT FROM THE LIVE DATABASE

Not relayed. Read from `pg_proc` and from the function's own source at 2026-09-12T07:2xZ.

```evidence:scout_reply
scout_reply(p_reply_to uuid, p_artifact_name text, p_body text) — SECURITY DEFINER

  refuses a null body; refuses a body over 8192 characters; refuses an empty artifact name;
  refuses a null reply_to; and refuses unless p_reply_to names an EXISTING to_lane row
  whose lane_addr is 'scout'.
  it then inserts exactly one row with direction 'from_lane' and lane_addr 'scout', both
  pinned in the function body, and returns the new id.

  NO nonce parameter and no nonce check.
  execute ACL: PUBLIC, plus anon and authenticated, plus service_role and postgres.
```

Compare the lane door: `relay_post_from_lane` is granted only to `postgres`, `service_role` and `cwf_lane`,
and it checks a nonce before anything else.

The bound, measured so the risk is not overstated: `anon` and `authenticated` hold **no table privileges at
all** on `relay_inbox` — no select, no insert. So a key-holder cannot read the bus to discover a card's
identifier, and cannot insert a `to_lane` row. What the key does buy is the ability to file a row under the
scout's name IF a card identifier is known — and identifiers appear in the Architect's reports to the owner,
in the project box, and in the archive.

## THE THREE IMPLICATIONS THE OWNER RULED ON

1. **The address is authenticated by knowledge of a card identifier, not by a secret.** A `from_lane` row
   under `scout` is not by itself proof the scout wrote it. This now matters more than it did, because the
   adversary seal names a scout verdict row and the gate resolves that row to read its digest.
2. **It is in no migration.** Ninety-seven migration files at master, zero mentions; `git grep` finds it only
   in `.claude/boot/free.md`, where a boot text calls it by curl with a publishable key. A fresh project built
   from the repository would have no scout door at all, and the architecture record's claim that the slip
   contract holds "in the database, by code" cannot be checked against the tree.
3. **Eight thousand one hundred and ninety-two characters with no field rule is the narrative door the slip
   contract was written against.** Closing it would turn the scout's reports into pointers, and the scout's
   reports are the instrument: two of them this session carried the branch map and the slip ruling that
   changed what the Architect did next.

## WHAT THE RULING ORDERS, AND WHAT IT DOES NOT

IT ORDERS: the door stays open at its present width; its definition lands in `supabase/migrations/` so the
factory is reconstructible from the repository; and it gains a nonce so the scout's address is authenticated
the way every lane's is.

IT DOES NOT ORDER: any change to what the scout writes, any narrowing of the cap, or any change to the two
other doors. The slip-seam repairs (narrow the record's sentence to name three doors; wire the boot documents
to the slip command-line interface; add an AG-scoped NOT VALID check) stand on their own and are unaffected.

AN OPEN QUESTION THIS RULING DOES NOT SETTLE, named so it is not lost: bringing the door into git means its
DDL becomes public in the repository, and the boot text that calls it carries a publishable key which the
adversary measured as DIFFERING from the one the platform currently lists. Whether the old key still
authenticates is UNMEASURED. That is a separate finding and it needs its own repair.

END · OWNER-RULING-S137-THE-SCOUT-DOOR-STAYS-AND-COMES-INTO-GIT-1
