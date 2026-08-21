# PHASE-RELAY-BUS-1-v2 — the prompt channel becomes infrastructure (+ the Operator's reply box)

<!-- S98 · Architect-authored · lane AG-1 · Wave-5 PRECURSOR mini-lane.
     SUPERSEDES PHASE-RELAY-BUS-1-v1 (S37-1: amend = new version; v1 was
     presented but not yet relayed — discard it, build from THIS file).
     v2 delta, owner-ruled in-session S98: the bus gains a RETURN direction
     for exactly ONE lane — the Operator, whose ADR-006 fence (zero repo
     contact) leaves it as the only lane without an automatic return path.
     AG replies deliberately STAY in git (versioned, diffable, relay-audit
     governed — one carrier per fact, GOLDEN LEDGER).
     Owner decision K6-S97 "RELAY-BUS evet" (register v101 §2, #42) +
     S98 owner ruling: Operator send/receive on the same table.
     Design carrier: KARAR-RELAY-BUS-1-v1 (ADR-015 draft inside). -->

## PRECONDITION (S47-1)
Work starts from a FRESH clone of `maymun207/cwf_yaprak` at
`origin/master` = `0a35d86b75ee169b82509bc70adecb26e0cbb55b` (rev 248 ·
574 test files · 76 migrations, top `20260813101000` · 14 ADRs · drift 7/7).
If `git rev-parse origin/master` disagrees, STOP and report — do not build
on a moved floor.

## WHY (one paragraph)
Wave 4 cost the owner ~16-18 manual pastes. AG reports already flow
automatically (AG → origin → Architect reads); the manual legs left are
(1) carrying Architect-authored prompt/GO/ruling artifacts into AG and
Operator windows, and (2) carrying the Operator's narrative reports back —
the Operator being the one lane with no git. This phase closes BOTH with a
single fenced operational table: outbound rows for all five addresses,
return rows for the Operator alone. The owner's surface shrinks to genuine
decisions (D-4 CEREMONY-ZERO); the canonical artifact REMAINS the
versioned file — the inbox is a carrier, never the archive.

## CLAIMS (S97-L1 — every line computed live this session, source named)
- `relay_inbox` does NOT exist in the production DB
  (`pg_catalog.pg_class` join `pg_namespace`, nspname='public' → 0 rows)
  and has ZERO repo references (`grep -rn relay_inbox` over the tree → 0).
- Live public tables: 52. Applied migrations: 76, top `20260813101000`
  (`supabase_migrations.schema_migrations` count/max, read live).
- ADR numbering: ADR-001…ADR-014 exist in `docs/adr/` (dir listing) →
  next free number is 015.
- ADR-014 class-declaration mechanism (read from
  `20260813090000_tool_experience_and_fingerprint.sql` +
  `shared/dbConstants.ts:418` `TABLE_PERSISTENCE_CLASS`): class is declared
  in the migration's table COMMENT **and** as a census entry in
  `TABLE_PERSISTENCE_CLASS` keyed by a `DB_TABLES` constant — a missing
  entry fails to COMPILE (the both-directions gate).
- House security posture for server-only tables (read from the two most
  recent migrations): RLS ON, ZERO client policies, REVOKE all incl.
  SELECT from `public`+`anon`+`authenticated`, plus a `verifyGrants.ts`
  `PROBES` row and CI coverage.
- `shared/dbConstants.ts` IS doc-drift-mapped (grep over
  `public/architecture/manifest.json` → 9 hits) → S90-2 applies: this
  phase PRE-ORDERS a reseal (see DELIVERY).
- Migration stamp assigned at prompt time (S97 practice):
  **`20260813110000`** — strictly above the applied top, unique in
  `supabase/migrations/` (verified by listing).

## FENCE (exhaustive; computed against the CI-DIET-2 sibling lane — intersection ∅)
CREATE: `supabase/migrations/20260813110000_relay_inbox.sql` ·
`docs/adr/ADR-015-relay-bus.md` · `.agents/relay-bus-setup.md` ·
`api/cwf/__tests__/relayBusMigration.test.ts`
EDIT: `shared/dbConstants.ts` (DB_TABLES + TABLE_PERSISTENCE_CLASS entries
ONLY) · `scripts/verifyGrants.ts` (ONE `PROBES` row) ·
`public/architecture/manifest.json` (provisional seal only)
PLUS: `docs/relay/PHASE-RELAY-BUS-1-report.md` · `.agents/CHANGELOG.md` entry.
NOTHING else. The sibling lane (AG-2, CI-DIET-2) owns `.github/workflows/**`
exclusively — zero shared files by construction.

## R1 — the table (migration `20260813110000_relay_inbox.sql`)
`public.relay_inbox`:
- `id uuid PK default gen_random_uuid()`
- `direction text NOT NULL DEFAULT 'to_lane'` + CHECK in
  `('to_lane','from_lane')` — outbound Architect mail vs the Operator's
  return mail.
- `lane_addr text NOT NULL` + CHECK in
  `('AG-1','AG-2','AG-3','AG-4','operator')`
- **The reply-authority CHECK (the v2 law, in DDL):**
  `CHECK (direction = 'to_lane' OR lane_addr = 'operator')` — a
  `from_lane` row can only ever carry the Operator address. The only lane
  that can be replied AS is the one lane without a git.
- `reply_to uuid NULL REFERENCES relay_inbox(id)` — optional threading:
  which outbound card a return row answers.
- `artifact_name text NOT NULL` (the versioned filename, e.g.
  `PHASE-X-v1.md` outbound, `OPERATOR-REPORT-<PHASE>-v1` return — the
  name IS the join key back to the archive)
- `body text NOT NULL`
- `created_at timestamptz NOT NULL default now()`
- `consumed_at timestamptz NULL` — stamped by the CONSUMER: the addressed
  lane for `to_lane` rows, the Architect for `from_lane` rows.

Laws, enforced IN the migration:
1. **ADR-014 at birth:** table COMMENT declares
   `persistence class operational.control` with the reasoning (a routing
   channel for work-in-flight; never snapshots, never seeds, never exports
   — a fresh installation has no mail).
2. **House grant posture:** RLS ON, zero policies, REVOKE all incl. SELECT
   from `public`, `anon`, `authenticated` explicitly. Service-role only.
3. **Append-only by trigger, not by promise:** BEFORE UPDATE trigger
   permits ONLY the `consumed_at` column to change, and only NULL →
   NOT NULL (a stamp is set once, never edited, never cleared);
   BEFORE DELETE trigger RAISEs. Rows are history — both directions.
4. **ADR-007:** secrets never ride rows — legislated in ADR-015 and the
   table COMMENT. TWICE as load-bearing in v2: the Operator's reports
   live next to grants and keys, and its standing law (never echo
   secrets; silent success paths are correct) applies verbatim to every
   `from_lane` body. Content-inspection triggers are deliberately NOT
   attempted; the fence is the writer's law plus audit.

## R2 — ADR-015 (`docs/adr/ADR-015-relay-bus.md`)
Codify the KARAR draft plus the two rulings made since — three narrow,
symmetric carve-outs, each one box wide:
- **Architect carve-out:** INSERT authority on exactly `relay_inbox`,
  `direction='to_lane'`, any address. Repo-write stays ZERO. ADR-002/006
  preserved: not a governed-table write, fenced to one box.
- **Consumer carve-out:** AG lanes and the Operator gain UPDATE authority
  on exactly `relay_inbox.consumed_at`, only on `to_lane` rows addressed
  to their OWN `lane_addr`. One column of one operational.control table;
  consumption proof must come from the consumer or the channel cannot
  prove S63-1 delivery.
- **Operator reply carve-out (v2, owner-ruled S98):** the Operator gains
  INSERT authority on exactly `from_lane` + `lane_addr='operator'` rows —
  its narrative reports (G-gate outcomes, idempotence probes, S93-3
  full-disclosure lines) return through the organ instead of through the
  owner's clipboard. WHY ONLY THE OPERATOR: every AG has git, and a git
  report is versioned, diffable, and relay-audit-governed — a second
  carrier for the same fact would violate the one-carrier rule. The
  Operator is fenced OFF git by ADR-006; this box is its only honest
  return path. **Evidence hierarchy stated in the ADR:** a `from_lane`
  row is NARRATIVE, never proof — the Architect still measures every
  measurable claim directly against the DB (S63-1); the row supplements,
  the measurement decides.
- Rows append-only + immutable (trigger-enforced, R1); secrets forbidden
  (ADR-007); canonical artifact remains the versioned FILE — the inbox
  row carries a copy for transport, never the authoritative version.
- Two-way fence, named per direction: nobody but the Architect writes
  `to_lane`; nobody but the Operator writes `from_lane` (and CANNOT write
  it under any other address — DDL CHECK); AG lanes never INSERT at all;
  nobody DELETEs. Enforcement = ADR + trigger/CHECK + the R4 tests (the
  Architect's and Operator's MCP sessions are privileged, so the
  writer-identity half is LAW + audit, stated honestly as such — the
  KARAR's risk (a), now covering two writers).

## R3 — AG setup card (`.agents/relay-bus-setup.md`)
The ONE-TIME per-window installation instruction (the owner's LAST bulk
paste). TWO sections in one file — AG section and Operator section —
each executable by its window with Supabase MCP, project fence
`fjbrkimwvtpwoxhziidh` stated inline.
**AG section (`<MY-LANE>` ∈ AG-1..AG-4):**
1. At turn start: `select id, artifact_name, body from relay_inbox where
   direction='to_lane' and lane_addr='<MY-LANE>' and consumed_at is null
   order by created_at` (oldest first; read ALL unconsumed).
2. After reading each row: `update relay_inbox set consumed_at=now()
   where id='<id>'` — the stamp is the delivery receipt.
3. NEVER insert, never delete, never touch another lane's rows or any
   `from_lane` row, never echo row bodies into commits.
4. S93-3: every stamp is a state-changing call — report it.
**Operator section:**
1. Read own mail exactly as above with `lane_addr='operator'`.
2. Reply door: `insert into relay_inbox
   (direction, lane_addr, reply_to, artifact_name, body) values
   ('from_lane','operator','<card-id-or-null>','OPERATOR-REPORT-<PHASE>-v1',
   '<report>')` — after the work, never instead of it.
3. Secrets NEVER in `body` (ADR-007 verbatim); full-disclosure lines
   (S93-3) YES. Never UPDATE anything but own-mail `consumed_at`, never
   DELETE, never write `to_lane`.

## R4 — tests (`api/cwf/__tests__/relayBusMigration.test.ts` + verifyGrants)
All migration-text assertions run on COMMENT-STRIPPED SQL (S97-L3).
- Asserts on `20260813110000_relay_inbox.sql`: RLS enable present · the
  three explicit revokes present · the `lane_addr` CHECK enum exact · the
  `direction` CHECK enum exact · **the reply-authority CHECK present**
  (`direction='to_lane' OR lane_addr='operator'`) · the `reply_to`
  self-FK present · both triggers present (UPDATE-restrictor +
  DELETE-raise) · the COMMENT declares `operational.control`.
- Census both-directions: `DB_TABLES.RELAY_INBOX` +
  `TABLE_PERSISTENCE_CLASS` entry (missing entry fails compile — Gate A;
  assert the class value is `operational.control` so a wrong class also
  reds).
- `scripts/verifyGrants.ts` PROBES row for `relay_inbox`: anon UPDATE
  denied 42501. Probe column = `artifact_name` — deliberately NOT a
  CHECK-closed column (`lane_addr`/`direction`), so a constraint cannot
  fire before the privilege check and mask the PASS (the census lesson,
  verbatim).
- GATE-SELF-TEST (D-5) both directions: each migration-text assertion is
  proven RED-capable by a mutation shown in the report (e.g. drop one
  revoke line in a string copy → test reds; flip the reply-authority
  CHECK to allow `lane_addr='AG-1'` → test reds).

## FALSIFIERS
(a) A DELETE issued against a fixture applying the trigger DDL raises.
(b) An UPDATE touching `body` is refused; an UPDATE setting `consumed_at`
    NULL→now() succeeds; a second UPDATE moving a set `consumed_at` is
    refused. (Provable at migration-text level via trigger-function-body
    assertions if no local PG harness exists — state which level was used.)
(c) A `from_lane` row under any address other than `operator` violates
    the CHECK — provable at DDL-text level + the D-5 mutation above.
(d) Removing the `TABLE_PERSISTENCE_CLASS` entry breaks the build
    (compile-level Gate A) — demonstrated, not asserted.

## BIRTH PROOF (S93-1) — staged across the apply, named here; BOTH directions
The organ's first real measurement cannot precede the Operator apply
(ADR-005). Sequence, owned by the GO-TRAIN:
1. Operator applies `20260813110000`.
2. **Return direction proves itself first, on real work:** the Operator
   writes its OWN apply report as the organ's first `from_lane` row
   (`artifact_name='OPERATOR-REPORT-RELAY-BUS-1-v1'`) — the migration's
   application report arrives through the table the migration created.
   The Architect reads it and stamps `consumed_at`.
3. Outbound direction: Architect INSERTs one probe card
   (`to_lane`, `lane_addr='AG-1'`,
   `artifact_name='RELAY-BUS-BIRTH-PROBE-v1'`) → AG-1 reads it, stamps
   `consumed_at`, and reports the round-trip with row id + both
   timestamps in its next git report.
Until BOTH round-trips land, every Wave-5 relay stays DUAL-LINE (inbox
row + paste backup) — S63-1.

## DELIVERY (S91 completeness gate)
- Branch: `phase/relay-bus-1` — PUSH to origin.
- Open a PR against `master` so CI runs on the PR head (S37-2).
- Report: `docs/relay/PHASE-RELAY-BUS-1-report.md`.
- SEAL (S90-2, pre-ordered): `shared/dbConstants.ts` is drift-mapped —
  apply a PROVISIONAL seal isolated to `public/architecture/manifest.json`
  in its OWN commit, marked DROP-AT-MERGE by SHA; docVersion NOT bumped
  (the merge turn derives the next rev by reading master — S95-1).
- Wave-5 discipline: NO per-lane GO. Build, push, report, then WAIT for
  the single GO-TRAIN (which carries the merge message, the queue anchor,
  and the one Operator turn). Local full suite at the merge turn stays
  mandatory.
- Stop-and-ask on any fence conflict — a stop is the system working
  (S97 precedent, three for three).

<!-- END · PHASE-RELAY-BUS-1-v2 -->
