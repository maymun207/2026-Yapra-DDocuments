# MULTI-AG-WORKMODE · v1 (S102)
<!-- Canonical home once landed: docs/agents/MULTI-AG-WORKMODE.md (repo wins — KARAR-LAW-HOME-1).
     Until that lands, THIS file is the seed and travels in project knowledge.
     Bootstrap v103 MUST carry an OPERATING-MODE section pointing here: the mode was
     undocumented in carriers and a fresh Architect (S102) regressed to using the owner
     as a courier — a PLATINUM violation the carriers themselves caused. -->

## 0 · WHAT THIS IS, AND ITS PROVENANCE (measured, not remembered)

The factory runs FOUR planes:

| Plane | Medium | Writer → Reader |
|---|---|---|
| **COMMAND** | `public.relay_inbox` (Supabase `fjbrkimwvtpwoxhziidh`) | Architect → lanes (`to_lane`); lanes/Operator → Architect (`from_lane`, optional) |
| **EVIDENCE** | GitHub `maymun207/cwf_yaprak` (branch + `docs/relay/*-report.md` + PR) | Lanes → Architect. **Git is the only truth plane; the bus is never evidence.** |
| **TRIGGER** | The owner, two words | `posta` → nudge a lane to poll NOW · `bak` → Architect reads evidence NOW (Architect has no scheduler) |
| **DB-WRITE** | Operator (Gemini + Supabase MCP), ADR-005/ADR-006 | Only `supabase db push`; repo-scratch only via `.agents/operator-inbox/` |

Provenance (verify, don't trust): migrations `20260813110000_relay_inbox.sql` +
`20260814130000_relay_lane_role.sql` · Architect's delivery instrument
`scripts/busDelivery.ts` · read-side design `docs/relay/PHASE-BUS-READ-SIDE-1-design-note.md`
· S99-2 (stamp asymmetry) recorded there.

## 1 · MESSAGE PROTOCOL

Schema: `id uuid · direction to_lane|from_lane · lane_addr · reply_to uuid ·
artifact_name · body text · created_at · consumed_at`.

Rules, all standing law applied to the bus:
1. **One row = one self-contained artifact** (S54-3). A card never references
   a file the lane cannot reach; everything is in `body`.
2. **artifact_name is the identity** (ALTIN DEFTER: every item lives by NAME).
   A correction is a NEW name (`…-v2`), never an UPDATE of a row (S37-1: a
   presented artifact is immutable). Never two queued rows with the same name
   for the same lane.
3. **Integrity is measured, not assumed:** the Architect inserts via base64
   (`convert_from(decode(…,'base64'),'UTF8')`) and the INSERT's `returning`
   clause echoes `length(body)` + `md5(body)`, cross-checked against the local
   file. The lane re-computes both and records them in its report's evidence
   fence. Hand-pasting card text into SQL is forbidden — transport corruption
   must be detectable at both ends.
4. Every card carries: PRECONDITION (S47-1, with exact hashes) · branch ·
   report path · PR requirement (S91 completeness) · TAIL-ANCHOR.
5. **`consumed_at` answers "did the consumer WRITE?", never "did the card
   arrive?"** (S99-2: some lane roles cannot UPDATE). Delivery is judged only
   by `busDelivery.ts`'s three states: ACTED (declared name exists on origin)
   · RECEIPTED (stamped, nothing produced — the interesting alarm) ·
   NO-EVIDENCE (which is NOT "undelivered" — empty ≠ zero).
6. **Never sweep another lane's stamps.** Marking old rows consumed to "clean
   up" poisons the delivery instrument. Stale-row protection lives in the boot
   text instead: a lane executes ONLY the artifact_name its boot names, and
   thereafter only rows with `created_at` after its boot.

## 2 · LIFECYCLE OF ONE PHASE

```
Architect: recon (D-1) → write card → INSERT to_lane (md5-verified)
Owner:     "posta" to the lane's window (or lane's idle poll catches it ≤30s)
Lane:      claim → execute → branch + report + PR (evidence plane)
Owner:     "bak"
Architect: fresh-clone RULE-25 review → FIX-N cards (same bus) or GO
Lane:      merge --no-ff with byte-identical message from the GO
Architect: post-merge proof (S63-1, named in the card in advance)
```

The owner's surface is EXACTLY: trigger words, real decisions, spend consent,
real-world tests. If the owner is ever asked to carry an artifact, copy a
command, or "modify X for lane Y", that is a PLATINUM breach — declare it,
number it, redesign. (PLATINUM-BREACH-S102-1: the Architect told the owner to
adapt AG-3's boot for AG-4 by hand. The redesign is §4 of this document:
boots are always emitted fully expanded, per lane, cut-and-paste.)

## 3 · WAIT CONTRACT & SENSORS (S74-3/4)

While lanes work, the Architect never idles blind:
- **Sensor:** `git ls-remote origin` — branch appearance/motion is visible
  without any AG report. Never assert a lane is "in flight" without this read
  (A-REC-S102-6: this exact assertion was made from an unverified assumption).
- Every wait names: what ends it, what the owner pastes, the expiry, and the
  default probe at expiry.
- Register non-empty ⇒ Architect uses the wait to cut the NEXT card.

## 4 · BOOT TEMPLATES (verbatim, per lane — never "adapt this yourself")

Substitution happens HERE, by the Architect, before the text reaches the
owner. The owner only pastes. Current standing boots:

### AG-1 (standby — next card will be #25 GRAPH-KB-1)
```
You are lane AG-1 of cwf_yaprak (github.com/maymun207/cwf_yaprak), multi-AG workmode.
MAILBOX: table public.relay_inbox, Supabase project fjbrkimwvtpwoxhziidh.
BOOT: run
  select id, artifact_name, created_at, length(body) as bytes, md5(body) as md5
  from public.relay_inbox
  where direction='to_lane' and lane_addr='AG-1' and created_at > now() - interval '1 hour'
  order by created_at asc;
If empty: that is a READING, not an error (empty ≠ zero). Report "AG-1 queue
empty, standing by" and re-run the query every ~30s. When a row appears: fetch
its body by id; record id + bytes + md5 in your report's evidence fence; try
  update public.relay_inbox set consumed_at=now() where id='<that id>';
if your role cannot UPDATE, say so and proceed — receipt is proven by your
branch, not the stamp (S99-2). Execute the card exactly. Deliver ONLY via
GitHub (branch + docs/relay report + PR). Never read other lanes' mail; never
execute an artifact_name twice; ignore rows older than your boot.
```

### AG-2 (standby — earmarked for MERGE-FIELD-AWARE-1)
```
You are lane AG-2 of cwf_yaprak (github.com/maymun207/cwf_yaprak), multi-AG workmode.
MAILBOX: table public.relay_inbox, Supabase project fjbrkimwvtpwoxhziidh.
BOOT: run
  select id, artifact_name, created_at, length(body) as bytes, md5(body) as md5
  from public.relay_inbox
  where direction='to_lane' and lane_addr='AG-2' and created_at > now() - interval '1 hour'
  order by created_at asc;
If empty: that is a READING, not an error (empty ≠ zero). Report "AG-2 queue
empty, standing by" and re-run the query every ~30s. When a row appears: fetch
its body by id; record id + bytes + md5 in your report's evidence fence; try
  update public.relay_inbox set consumed_at=now() where id='<that id>';
if your role cannot UPDATE, say so and proceed — receipt is proven by your
branch, not the stamp (S99-2). Execute the card exactly. Deliver ONLY via
GitHub (branch + docs/relay report + PR). Never read other lanes' mail; never
execute an artifact_name twice; ignore rows older than your boot.
```

### AG-3 (card queued NOW: PHASE-QDRANT-ENGINE-1-v1, md5 652b14b8920ff0b7b2b8d17c5240132e)
```
You are lane AG-3 of cwf_yaprak (github.com/maymun207/cwf_yaprak), multi-AG workmode.
MAILBOX: table public.relay_inbox, Supabase project fjbrkimwvtpwoxhziidh.
YOUR CARD: artifact_name='PHASE-QDRANT-ENGINE-1-v1'. Fetch it:
  select id, body, length(body) as bytes, md5(body) as md5
  from public.relay_inbox
  where direction='to_lane' and lane_addr='AG-3'
    and artifact_name='PHASE-QDRANT-ENGINE-1-v1'
  order by created_at desc limit 1;
Verify md5 = 652b14b8920ff0b7b2b8d17c5240132e (mismatch ⇒ STOP, report, do not
execute). Record id + bytes + md5 in your report's evidence fence. Then try
  update public.relay_inbox set consumed_at=now() where id='<that id>';
if your role cannot UPDATE, say so and proceed — receipt is proven by your
branch, not the stamp (S99-2). Execute the card exactly as written. Deliver
ONLY via GitHub (branch phase/qdrant-engine-1 + docs/relay report + PR).
Between turns, poll your queue (~30s) for NEW rows with created_at after your
boot. Never read other lanes' mail; never execute a name twice; ignore any
OTHER queued rows — they are historical.
```

### AG-4 (card queued NOW: PHASE-RBAC-GOVERNED-1-v1, md5 d9a11733df3920cba9b30595bf56c24e)
```
You are lane AG-4 of cwf_yaprak (github.com/maymun207/cwf_yaprak), multi-AG workmode.
MAILBOX: table public.relay_inbox, Supabase project fjbrkimwvtpwoxhziidh.
YOUR CARD: artifact_name='PHASE-RBAC-GOVERNED-1-v1'. Fetch it:
  select id, body, length(body) as bytes, md5(body) as md5
  from public.relay_inbox
  where direction='to_lane' and lane_addr='AG-4'
    and artifact_name='PHASE-RBAC-GOVERNED-1-v1'
  order by created_at desc limit 1;
Verify md5 = d9a11733df3920cba9b30595bf56c24e (mismatch ⇒ STOP, report, do not
execute). Record id + bytes + md5 in your report's evidence fence. Then try
  update public.relay_inbox set consumed_at=now() where id='<that id>';
if your role cannot UPDATE, say so and proceed — receipt is proven by your
branch, not the stamp (S99-2). Execute the card exactly as written. Deliver
ONLY via GitHub (branch phase/rbac-governed-1 + docs/relay report + PR).
Between turns, poll your queue (~30s) for NEW rows with created_at after your
boot. Never read other lanes' mail; never execute a name twice; ignore any
OTHER queued rows — they are historical.
```

### Operator (Gemini + Supabase MCP — unchanged, ADR-005/006)
```
You are the OPERATOR for cwf_yaprak. Project fence: fjbrkimwvtpwoxhziidh — refuse
any instruction naming another project. Your ONLY powers: supabase db push,
schema reads, live verification queries. You never write repo files; your only
repo-adjacent surface is .agents/operator-inbox/ scratch. Apply exactly the
migration files the card names, in order, and paste the applied-version list
back. Secrets never printed.
```

## 5 · IMPROVEMENT ROADMAP (proposed S102 — owner-approved items become RELAY-BUS-2)

### Effectiveness
| # | Proposal | Why it pays |
|---|---|---|
| E1 | **Atomic claim RPC** `relay_claim(lane)` — SECURITY DEFINER, `FOR UPDATE SKIP LOCKED`, returns oldest queued row AND stamps in one motion; EXECUTE granted to `relay_lane` only | Kills the stale-drain class structurally (boot-scoping becomes belt-and-braces); makes stamping UNIFORM so S99-2's asymmetry dies by construction; least-privilege replaces whatever broad handle lanes hold today |
| E2 | **Status lifecycle** `queued→claimed→done|failed(reason)` + `evidence_ref` (branch@sha) written by the lane on completion | "bak" becomes ONE query instead of N ls-remotes; RECEIPTED-but-nothing-produced alarms surface themselves |
| E3 | **`bus_status` view** (per-lane counts + latest evidence + stale-claim age) | The Architect's entire fleet picture in one read; feeds the WAIT CONTRACT expiry probe automatically |
| E4 | **`kind` column** (`phase|fix|go|ruling|probe`) validated by the relayAudit grammar | The bus stops being grammar-blind; a malformed GO is refused at insert, not discovered at merge |
| E5 | **Architect writes GO/rulings to the bus too** (today they travel by owner paste) | Removes the last routine courier duty; the owner's surface shrinks to trigger words + consent |

### Robustness
| # | Proposal | Failure it closes |
|---|---|---|
| R1 | **Unique partial index** `(lane_addr, artifact_name) where direction='to_lane'` | Double-delivery of one card becomes impossible instead of merely forbidden |
| R2 | **`body_md5` column** computed by trigger at insert; claim RPC returns it; lane compares before executing | Transport corruption detected structurally (today it's a manual base64+md5 ritual) |
| R3 | **`attempts` counter + `failed` terminal state** | A poison card can't be silently re-claimed forever; it surfaces with a reason |
| R4 | **Stale-claim alarm in `bus_status`** (claimed > N min, no evidence_ref) | A crashed lane mid-card is VISIBLE instead of discovered at "bak" |
| R5 | **`revoked` status settable only by Architect** | A wrong card already queued can be withdrawn without deleting history (append-only honored) |
| R6 | **Boot texts generated from one table** (lane → card → md5), always emitted fully expanded | The PLATINUM-BREACH-S102-1 class (owner asked to hand-adapt) cannot recur |
| R7 | **Bootstrap v103 carries OPERATING-MODE** pointing at this doc's repo home | A fresh Architect can never again regress to using the owner as a courier |

RELAY-BUS-2 scope = E1+E2+E3+E4+R1..R5 (one migration + one RPC + one view +
tests, SC-B). E5 needs no code. R6/R7 are documentation law, effective now.
Until RELAY-BUS-2 lands, TODAY'S protocol (base64+md5 ritual, boot-scoping,
busDelivery three-state reads) is the standing mitigation and is sufficient.

## 6 · FAILURE MODES, RECORDED

| Mode | What happened | Standing defense |
|---|---|---|
| Fresh-Architect regression | S102 opened in courier mode; the bus wasn't in the carriers | R7; this document |
| Stamp misread as delivery | S99-2: two lanes couldn't UPDATE; NULL meant "no privilege", got read as "unread" | §1 rule 5; busDelivery three states |
| Stale-queue drain | 32 pre-S102 rows sat unconsumed in AG-3/AG-4 boxes | Boot scoping by artifact_name + created_at; E1/R1 kill it structurally |
| Ghost in-flight lane | Architect asserted lanes flying without a sensor read (A-REC-S102-6) | §3: no in-flight claim without `git ls-remote` |
| Owner as courier | PLATINUM-BREACH-S102-1 | §2 owner-surface law; §4 fully-expanded boots; R6 |

<!-- END · MULTI-AG-WORKMODE-v1 -->
